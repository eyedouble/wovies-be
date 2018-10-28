
-module(wbe_server_rest_register_handler).

-behaviour(cowboy_handler).

-include ( "../../../dev.hrl" ).

-define(common_handler, erlstore_interface_http_common_handler).

-export([
    init/2
]).

%
% Unauthenticated
%
init ( Request=#{method := <<"OPTIONS">>}, State ) ->    
    wbe_server_rest_common:options ( Request, State );

init ( Request=#{method := <<"POST">>}, State ) ->    
    {ok, Body, _Req } = cowboy_req:read_body( Request ),
    User = jsone:decode ( Body ),   

    {2000, Domains} = erlstore_persistence:getAll ( domains ),
    DomainId = maps:get ( <<"id">>, lists:nth ( 1, Domains ) ),   

    Salt = erlstore_utils:uuid ( ),
    Hash = erlstore_interface_auth:password ( hash, maps:get ( <<"password">>, User ), Salt ),
    
    Res = case erlstore_persistence:createUser ( User#{                
        <<"password">> := Hash,
        <<"domain">> => <<DomainId/binary, ":1">>,                
        <<"salt">> => Salt                
    } ) of
        {2000, User1} ->
            {2000, #{<<"id">> := WatchLaterId}} = erlstore_persistence:create ( watchlater, #{<<"list">> => []}, User1 ),          
            erlstore_persistence:update ( users, maps:put ( <<"watchlater">>, WatchLaterId, User1 ), User1 ),            
            {2000, User1};
        _True ->        
            {3000, <<"Could not create user">>}
    end, 

    ?common_handler:response ( Request, State, Res ).
