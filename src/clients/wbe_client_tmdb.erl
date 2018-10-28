
-module(wbe_client_tmdb).

-include("../dev.hrl").

-define(BASEURL, "https://api.themoviedb.org/3").
-define(APIKEY, "api_key=7e719bfe3cd3786ebf0a05d3b138853d"). %?api_key=
-define(IMGURL, "https://image.tmdb.org/t/p"). % /w500

-export([
    get_movies_popular/0
    ,get_movies_search/1
    ,get_movie/1
    ,aggegrate_movies_by_id/1
]).


get_movies_popular ( ) -> 
    application:ensure_all_started(hackney),
    {ok, StatusCode, RespHeaders, ClientRef} = hackney:get( 
        list_to_binary ( ?BASEURL ++ "/movie/popular?" ++ ?APIKEY), [], <<>>, []
    ),
    {ok, Body} = hackney:body ( ClientRef ),
    jsone:decode ( Body ).

get_movies_search ( Query ) -> 
    application:ensure_all_started(hackney),
    {ok, StatusCode, RespHeaders, ClientRef} = hackney:get( 
        list_to_binary ( ?BASEURL ++ "/search/movie?" ++ Query ++ "&" ++ ?APIKEY), [], <<>>, []
    ),
    {ok, Body} = hackney:body ( ClientRef ),
    jsone:decode ( Body ).

get_movie ( Id ) -> 
    application:ensure_all_started(hackney),
    {ok, StatusCode, RespHeaders, ClientRef} = hackney:get( 
        list_to_binary ( ?BASEURL ++ "/movie/" ++ Id ++ "?"  ++ ?APIKEY), [], <<>>, []
    ),
    {ok, Body} = hackney:body ( ClientRef ),   
    jsone:decode ( Body ).

%
% Concurrent movie data aggeration
%
aggegrate_movies_by_id ( List ) when is_list ( List )->
    lists:map ( fun ( A ) -> 
        spawn ( ?MODULE, aggegrate_movies_by_id, [{self(), A}] )
    end, List ),
    Data = aggegrate_movies_by_id ( {listen, #{}, length ( List ) } ),
    #{<<"order">> => List, <<"data">> => Data};

aggegrate_movies_by_id ( {Pid, Id} ) when is_pid ( Pid ) ->
    application:ensure_all_started(hackney),
    {ok, StatusCode, RespHeaders, ClientRef} = hackney:get( 
        list_to_binary ( ?BASEURL ++ "/movie/" ++ binary_to_list ( Id ) ++ "?"  ++ ?APIKEY), [], <<>>, []
    ),
    {ok, Body} = hackney:body ( ClientRef ),    
    Pid ! {Id, jsone:decode ( Body )};

aggegrate_movies_by_id ( {listen, State, ListLength} ) ->    
    case maps:size ( State ) < ListLength of
        true -> 
            receive 
                {_Pid, Data} -> aggegrate_movies_by_id ( {listen, maps:put ( list_to_binary ( integer_to_list ( maps:get ( <<"id">>, Data ) ) ), Data, State ), ListLength} )
            end;
        false -> State
    end.
