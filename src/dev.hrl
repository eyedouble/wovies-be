
-define(PRINT(Var), io:format("DEBUG: ~p:~p - ~p~n~n ~p~n~n", [?MODULE, ?LINE, ??Var, Var])).

-define ( loginfo ( Module, Msg), logger:notice( atom_to_list ( Module ) ++ ": " ++ Msg ) ).
-define ( lognotice ( Module, Msg), logger:notice( atom_to_list ( Module ) ++ ": " ++ Msg ) ).
-define ( logerror ( Module, Msg), logger:error( atom_to_list ( Module ) ++ ": " ++ Msg ) ).


