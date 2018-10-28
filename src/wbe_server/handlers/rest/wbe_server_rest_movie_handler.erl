
-module(wbe_server_rest_movie_handler).

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

% GET Search
init ( Request=#{method := <<"GET">>, qs := Qs }, State ) when Qs =/= <<"">> ->
    Res = case wbe_client_tmdb:get_movies_search ( binary_to_list ( Qs ) ) of
        #{<<"page">> := _N, <<"results">> := Data } -> 
            {2000, Data};
        _True -> {3000, []}
    end,   
   
    ?common_handler:response ( Request, State, Res );

% GET Popular
init ( Request=#{method := <<"GET">>, bindings := #{ action := <<"popular">> }}, State ) ->    
    Res = case wbe_client_tmdb:get_movies_popular ( ) of
        #{<<"page">> := _N, <<"results">> := Data } -> 
            {2000, Data};
        _True -> {3000, []}
    end,
    ?common_handler:response ( Request, State, Res );

% GET by id
init ( Request=#{method := <<"GET">>, bindings := #{ action := Id }}, State ) ->    
    Res = case wbe_client_tmdb:get_movie ( binary_to_list ( Id ) ) of
        Data when is_map ( Data ) -> 
            {2000, Data};
        _True -> {3000, []}
    end,
    ?common_handler:response ( Request, State, Res ); 

init ( Request=#{ headers := #{ <<"authorization">> := _Token } }, State ) ->
    wbe_server_rest_common:auth_guard ( Request, State, fun ( Request1, State1, User ) ->
        init ( Request1, State1, User )
    end );  

init ( Request, State ) ->  
        ?common_handler:error ( Request, State ).

%
% Authenticated
%

init ( Request=#{bindings := Bindings }, State, _User ) -> 
    Request2 =  maps:put ( bindings, maps:put ( table, <<"movie">>, Bindings ), Request ),
    ?common_handler:init ( Request2, State ).
