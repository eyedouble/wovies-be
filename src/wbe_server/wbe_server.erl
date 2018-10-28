
-module(wbe_server).

-behaviour(gen_server).

-include("../dev.hrl").

-export([
    start_link/0
    ,init/1
    ,handle_call/3
    ,handle_cast/2
    ,terminate/2
    ,handle_info/2
]).

start_link( ) ->   
    gen_server:start_link({local, ?MODULE}, ?MODULE, [], []).

init(_Args) ->  
    process_flag(trap_exit, true),
    
    case ranch_sup:start_link ( ) of
        {ok, RanchPid} -> RanchPid;
        {error,{already_started, RanchPid}} -> RanchPid
    end, 
    link ( RanchPid ),    

    case cowboy_sup:start_link ( ) of
        {ok, CowboyPid} -> CowboyPid;
        {error,{already_started, CowboyPid}} -> CowboyPid
    end,     
    link ( CowboyPid ), 
    Dispatch = cowboy_router:compile([
        {'_', wbe_server_handlers:make ( ) }            
    ]), 
   
    StartClear = cowboy:start_clear(wbe_server_listener,
        [{port, wbe_instance:get(port)}],
        #{
            env => #{dispatch => Dispatch}
        }
    ),

    Pid = case StartClear of
        {error,{already_started,_Pid}} -> self() ! stop;
        {ok, StartClearPid} -> StartClearPid
    end,   
    file:delete ( ".wbereload" ),
    {ok, {Pid, wbe_server_listener}}.


handle_info ( {'EXIT', _Pid, Reason }, State ) ->
    cowboy:stop_listener( wbe_server_listener ),    
    handle_info ( stop, State);
    
handle_info ( stop, State ) ->  
    cowboy:stop_listener( wbe_server_listener ),
    {stop, normal, State};

handle_info ( Msg, State ) ->
    {noreply, State}.


terminate ( Reason, _State ) ->
    cowboy:stop_listener( wbe_server_listener ),     
    ok.

handle_call ( A, B, C ) ->  
    ok.

handle_cast ( All, State ) ->
    {noreply, State}.
