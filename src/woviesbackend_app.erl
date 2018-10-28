%%%-------------------------------------------------------------------
%% @doc woviesbackend public API
%% @end
%%%-------------------------------------------------------------------

-module(woviesbackend_app).

-behaviour(application).

-export([
    start/2
    ,stop/1
]).

-include("dev.hrl").

%%====================================================================
%% API
%%====================================================================

start(_StartType, _StartArgs) ->
    Response = woviesbackend_sup:start_link(),

    boot_persistence ( ),
    initialise ( ),

    start ( instance ), 
    start ( server ), 

    Response.

%%--------------------------------------------------------------------
stop(_State) ->
    ok.

%%====================================================================
%% Internal functions
%%====================================================================

start ( instance ) ->
    supervisor:start_child( woviesbackend_sup, 
        {wbe_instance, {wbe_instance, start_link, [ ]}, 
            permanent, brutal_kill, worker, [wbe_instance]} 
    );

start ( server ) ->
    supervisor:start_child( woviesbackend_sup, 
        {wbe_server, {wbe_server, start_link, [ ]}, 
            permanent, 10, worker, [wbe_server]} 
    ).

boot_persistence ( ) ->
    erlstore:boot ( code:priv_dir( woviesbackend ) ++ "/data/db" ),
    erlstore_persistence:createTable ( domains ),
    erlstore_persistence:createTable ( users ),
    erlstore_persistence:createTable ( watchlater ).  

initialise ( ) ->
    Res = case erlstore_persistence:getAll ( users ) of
        {2000, []} ->
            {2000, #{ <<"id">> := DomainId }} = erlstore_persistence:createDomain ( #{ <<"name">> => <<"default">>,
            <<"groups">> => [ <<"admins">>, <<"users">> ] } ),

            Salt = erlstore_utils:uuid ( ),
            Hash = erlstore_interface_auth:password ( hash, <<"admin">>, Salt ),
           
            {2000, User} = erlstore_persistence:createUser ( #{
                <<"id">> => <<"admin">>               
                ,<<"password">> => Hash
                ,<<"domain">> => <<DomainId/binary, ":0">>
                ,<<"salt">> => Salt      
                ,<<"firstname">> => <<"John">>
                ,<<"surname">> => <<"Doe">>          
            } ),

            {2000, #{<<"id">> := WatchLaterId}} = erlstore_persistence:create ( watchlater, #{<<"list">> => []}, User ),          
            R = erlstore_persistence:update ( users, maps:put ( <<"watchlater">>, WatchLaterId, User ), User ),

            {2000, done};       
        _Else ->
            {4000, false}
    end.