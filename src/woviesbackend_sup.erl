%%%-------------------------------------------------------------------
%% @doc woviesbackend top level supervisor.
%% @end
%%%-------------------------------------------------------------------

-module(woviesbackend_sup).

-behaviour(supervisor).

%% API
-export([start_link/0]).

%% Supervisor callbacks
-export([init/1]).

-include("dev.hrl").

-define(SERVER, ?MODULE).

%%====================================================================
%% API functions
%%====================================================================

start_link() ->
    case supervisor:start_link({local, ?SERVER}, ?MODULE, []) of
       {ok, Pid} -> {ok, Pid, []};
        Error -> Error
    end.
%%====================================================================
%% Supervisor callbacks
%%====================================================================

%% Child :: {Id,StartFunc,Restart,Shutdown,Type,Modules}
init([]) ->
    {ok, { {one_for_all, 20, 1}, []} }.
