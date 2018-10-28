
-module(wbe_server_rest_watchlater_handler).

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

init ( Request=#{ headers := #{ <<"authorization">> := _Token } }, State ) ->
    wbe_server_rest_common:auth_guard ( Request, State, fun ( Request1, State1, User ) ->
        init ( Request1, State1, User )
    end );  

init ( Request, State ) ->  
    ?common_handler:error ( Request, State ).

%
% Authenticated
%

% Swap two items
init ( Request=#{method := <<"PUT">>, bindings := #{ action := <<"swap">> }}, State, User ) ->   
    {ok, Body, _Req } = cowboy_req:read_body( Request ),
    #{<<"from">> := From, <<"to">> := To} = jsone:decode ( Body ), 
    {2000, Obj=#{<<"list">> := List}} = erlstore_persistence:get ( watchlater, maps:get ( <<"watchlater">>, User ) ),

    Swap = fun ( S1, S2, SwapList ) -> 
        {SwapList2,[F|SwapList3]} = lists:split(S1-1,SwapList),
        LT = SwapList2++[lists:nth(S2,SwapList)|SwapList3],
        {SwapList4,[_|SwapList5]} = lists:split(S2-1,LT),
        SwapList4++[F|SwapList5]
    end,
    
    List2 = Swap ( From, To, List ),
    Res = erlstore_persistence:update ( watchlater, maps:update ( <<"list">>, List2, Obj ) ),    
    ?common_handler:response ( Request, State, Res );

% Add item to list
init ( Request=#{method := <<"POST">>, bindings := #{ action := MovieId }}, State, User ) ->   
    {2000, Obj=#{<<"list">> := List}} = erlstore_persistence:get ( watchlater, maps:get ( <<"watchlater">>, User ) ),
    List2 = lists:concat ( [List, [MovieId]] ),
    
    %   Sets removes duplicates
    List3 = sets:to_list ( sets:from_list ( List2 ) ),

    Obj2 = maps:update ( <<"list">>, List3, Obj ),
    Res = erlstore_persistence:update ( watchlater, Obj2, User ),    
    ?common_handler:response ( Request, State, Res );

% Remove item from list
init ( Request=#{method := <<"DELETE">>, bindings := #{ action := MovieId }}, State, User ) ->   
    {2000, Obj=#{<<"list">> := List}} = erlstore_persistence:get ( watchlater, maps:get ( <<"watchlater">>, User ) ),
    List2 = [X || X <- List, X =/= MovieId],
    Obj2 = maps:update ( <<"list">>, List2, Obj ),
    Res = erlstore_persistence:update ( watchlater, Obj2, User ),    
    ?common_handler:response ( Request, State, Res );

% Get aggregated watchlaterlist
init ( Request=#{method := <<"GET">>, bindings := #{ action := <<"aggregated">> }}, State, User ) ->   
    {2000, #{<<"list">> :=List}} = erlstore_persistence:get ( watchlater, maps:get ( <<"watchlater">>, User ) ),
    Res = wbe_client_tmdb:aggegrate_movies_by_id ( List ),
    ?common_handler:response ( Request, State, {2000, Res} );

% Get watchlater document
init ( Request=#{method := <<"GET">>}, State, User ) ->   
    Res = erlstore_persistence:get ( watchlater, maps:get ( <<"watchlater">>, User ) ),    
    ?common_handler:response ( Request, State, Res ).
