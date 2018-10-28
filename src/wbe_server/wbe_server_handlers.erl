
-module(wbe_server_handlers).

-include("../dev.hrl").

-export([
    make/0
]).


make ( ) ->  
    lists:flatten ( [ 
        make ( system )                
    ] ).

make ( system ) ->
    [   
        {"/api/movie/[:action]", wbe_server_rest_movie_handler, [] }  
        ,{"/api/watchlater/[:action]", wbe_server_rest_watchlater_handler, [] }  
        ,{"/api/auth/register", wbe_server_rest_register_handler, [] }  
        ,{"/api/auth/[:action]", erlstore_interface_http_auth_handler, [] } 
        ,{"/api/:table", erlstore_interface_http_common_handler, [] }        
        ,{"/api/:table/:id", erlstore_interface_http_common_handler, [] }
        ,{"/static/[...]", cowboy_static, {priv_dir, woviesbackend, "system/www/wbe/static", [{mimetypes, cow_mimetypes, web}] } }                     
        ,{"/[...]", cowboy_static, {priv_file, woviesbackend, "system/www/wbe/index.html", [{mimetypes, {<<"text">>, <<"html">>, []}}]} }            
    ].
