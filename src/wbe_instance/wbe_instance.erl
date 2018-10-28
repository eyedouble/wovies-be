
-module(wbe_instance).

-behaviour(gen_server).

-include("../dev.hrl").

-export([
    get/1    
]).

-export([
    start_link/0
    ,init/1
    ,handle_call/3
    ,handle_cast/2
    ,terminate/2
    ,handle_info/2
]).

%
%   Instance
%
instance ( ) ->
    Instance = #{
        mode => getEnvVar ( mode )
        ,status => determine_status ( )
        ,port => getEnvVar ( port )
        ,tls_port => getEnvVar ( tls_port )        
        ,priv_path => code:priv_dir( woviesbackend )        
    }.
    
getEnvVar ( Var ) ->
    case application:get_env ( Var ) of
        {ok, Val} -> Val;
        _True -> undefined
    end.  

%
%   API
%
get ( Keys ) when is_list ( Keys ) andalso length ( Keys ) > 1 ->  
    case ?MODULE:get( lists:nth(1, Keys ) ) of 
        undefined -> undefined;
        Data -> recursive_get ( Data, lists:nthtail (1, Keys) )
    end;

get ( Key ) ->
    gen_server:call(?MODULE, {get, Key}).

set ( Key, Value ) ->
     gen_server:call(?MODULE, {set, Key, Value}).


%
%   PRIVATE
%
recursive_get ( Data, Keys ) when is_list ( Keys ) andalso length ( Keys ) > 1 ->    
    case maps:is_key ( lists:nth(1, Keys ), Data ) of 
        true -> recursive_get ( maps:get ( lists:nth(1, Keys ), Data ), lists:nthtail (1, Keys) );            
        false -> undefined
    end;
recursive_get ( Data, Keys ) when is_list ( Keys ) andalso length ( Keys ) =:= 1 ->   
    case maps:is_key ( lists:nth(1, Keys ), Data ) of
        true -> maps:get ( lists:nth(1, Keys ), Data );
        false -> undefined
    end.

determine_status ( ) -> 
    installed.

%
%   GEN SERV
%
start_link( ) ->    
    gen_server:start_link(?MODULE, [], []).

init(_Args) ->
    register ( ?MODULE, self() ),
    process_flag(trap_exit, true),
    ?PRINT ( atom_to_list ( ?MODULE ) ++ ":staring ..." ),


    Instance = instance ( ),   

    ?PRINT ( atom_to_list ( ?MODULE ) ++ ":up" ),
    ?PRINT ( wbe_instance_up ),  
    {ok, {self(), Instance }}.

handle_info ( {'EXIT', _Pid, _Reason }, State ) ->    
    handle_info ( stop, State);
    
handle_info ( stop, State ) ->  
    ?PRINT ( stop_recieved ),
    {stop, normal, State};

handle_info ( Msg, State ) ->
    ?PRINT ( Msg ),
    ?PRINT ( State ), 
    {noreply, State}.

terminate ( _Reason, _State ) ->
    cowboy:stop_listener( wbe_server_listener ),    
    ok.

% VAR GETTER
handle_call ( {get, Key}, _Origin, State ) ->
    {_Pid, Instance} = State, 
    case maps:is_key ( Key, Instance ) of
        true -> {reply, maps:get( Key, Instance ), State};
        false -> {reply, undefined, State}
    end;

handle_call ( {set, Key, Value}, _Origin, State ) ->
    {Pid, Instance} = State, 
    {reply, ok, {Pid, maps:put ( Key, Value, Instance )}}.   

handle_cast ( All, State ) -> 
    ?PRINT(All),
    {noreply, State}.