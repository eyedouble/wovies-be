
-module ( wbe_server_rest_common ).

-include ( "../../../dev.hrl" ).

-define(common_handler, erlstore_interface_http_common_handler).
-export([
    options/2
    ,auth_guard/3
    ,paginate_list/3
]).

options ( Request=#{method := <<"OPTIONS">>}, State ) ->    
    ?common_handler:options ( Request, State ).


auth_guard ( Request=#{ headers := #{ <<"authorization">> := Token } }, State, Callback ) ->
    case erlstore_interface_auth:token ( decode, Token, <<"secretkey">> ) of 
        {error, expired} ->            
            erlstore_interface_http_json_response:respond ( Request, State, {5002, Token}, 401);
        {error, invalid_token} ->            
            erlstore_interface_http_json_response:respond ( Request, State, {5001, Token}, 401);
        {ok, #{ <<"data">> := User, <<"exp">> := ExpiryTime } } ->            
            case ExpiryTime - erlstore_utils:unixtime() of 
                TimeLeft when TimeLeft < 300 ->
                    Callback ( 
                            cowboy_req:set_resp_header(<<"Authorization">>,erlstore_interface_auth:token ( generate, User, <<"secretkey">>, 900 ), Request ),
                            State, User 
                        );
                _True ->
                    Callback ( Request, State, User )
            end  
    end.


paginate_list ( Data, Page, Pagesize ) ->    
    case is_list ( Data ) of
        false -> Data;
        true -> 
            DatasetLength = length ( Data ), 
            Start = case Page of
                1 -> 1;
                _True -> case Page > ( DatasetLength div Pagesize ) of
                    true ->                        
                        ( DatasetLength - ( DatasetLength rem Pagesize ) ) + 1;
                    false ->                        
                        ( Pagesize * ( Page - 1 ) ) + 1
                end
            end,
            #{ 
                <<"total_length">> => DatasetLength,
                <<"result_set">> => lists:sublist ( Data, Start, Pagesize )
            }
    end. 
