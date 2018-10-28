(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{303:function(e,t,a){e.exports=a(612)},329:function(e,t){},331:function(e,t){},369:function(e,t){},370:function(e,t){},429:function(e,t,a){},527:function(e,t,a){},565:function(e,t,a){},568:function(e,t,a){},575:function(e,t,a){},577:function(e,t,a){},579:function(e,t,a){},581:function(e,t,a){},583:function(e,t,a){},585:function(e,t,a){},587:function(e,t,a){},589:function(e,t,a){},595:function(e,t,a){},612:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(29),i=a.n(o),c=a(615),l=a(32),s=a(67);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var u=a(617),m=a(614),p=a(616),h=a(11),d=a(25),v=a(13),f=a(12),g=a(14),b=a(92),w=a.n(b),E=a(227),k=a.n(E),C=a(228),y=a.n(C),O=function(){function e(){Object(h.a)(this,e)}return Object(d.a)(e,null,[{key:"isAuthenticated",value:function(){return!!this.getUser()}},{key:"getUser",value:function(){return this.decodeToken(this.readToken())}},{key:"login",value:function(e,t){var a=this;return new Promise(function(n,r){(new j).post("auth/login",{username:e,password:t}).then(function(e){return e.ok&&a.writeToken(e.data)?n(a.decodeToken(e.data)):r()})})}},{key:"register",value:function(e,t,a,n){return new Promise(function(r,o){(new j).post("auth/register",{id:e,password:t,firstname:a,surname:n}).then(function(e){return e.ok?r(e.data):o()})})}},{key:"logout",value:function(){return sessionStorage.removeItem("auth")}},{key:"decodeToken",value:function(e){var t=y.a.decode(e);return t&&t.exp>Math.floor(Date.now()/1e3)?t:null}},{key:"writeToken",value:function(e){return this.decodeToken(e)?(sessionStorage.setItem("auth",e),sessionStorage.getItem("auth")):null}},{key:"readToken",value:function(){return sessionStorage.getItem("auth")}}]),e}(),j=function e(){var t;Object(h.a)(this,e),t=window.location.protocol+"//"+window.location.host+"/api/";var a=k.a.create({baseURL:t,timeout:6e3});return a.interceptors.request.use(function(e){return O.isAuthenticated()&&(e.headers.Authorization=O.readToken()),e},function(e){return Promise.reject(e)}),a.interceptors.response.use(function(e){return"undefined"!==typeof e.headers.authorization&&O.writeToken(e.headers.authorization),e.data},function(e){return window.dispatchEvent(new CustomEvent("AppSnackbar",{detail:{message:"Network error, your connection may be unstable.",action:"ok"}})),Promise.reject(e)}),a},_=function(){function e(){Object(h.a)(this,e)}return Object(d.a)(e,null,[{key:"get",value:function(){return new Promise(function(e,t){(new j).get("watchlater").then(function(a){return a.ok?e(a.data.list):t()})})}},{key:"getAggerated",value:function(){return new Promise(function(e,t){(new j).get("watchlater/aggregated").then(function(a){return a.ok?e(a.data):t()})})}},{key:"add",value:function(e){return new Promise(function(t,a){(new j).post("watchlater/"+e,{}).then(function(e){return e.ok?t(e.data):a()})})}},{key:"remove",value:function(e){return new Promise(function(t,a){(new j).delete("watchlater/"+e,{}).then(function(e){return e.ok?t(e.data):a()})})}},{key:"swap",value:function(e,t){return new Promise(function(a,n){(new j).put("watchlater/swap",{from:e,to:t}).then(function(e){return e.ok?a(e.data):n()})})}}]),e}(),M=a(613),S=a(618),N=a(90),A=a.n(N),P=a(91),T=a.n(P),L=a(40),U=a.n(L),x=a(35),q=a.n(x),z=a(230),D=a.n(z),B=a(231),F=a.n(B),I=a(232),R=a.n(I),V=a(23),W=a(54),H=a.n(W),J=a(88),Y=a.n(J),$=(a(429),function(e){function t(){var e,a;Object(h.a)(this,t);for(var n=arguments.length,o=new Array(n),i=0;i<n;i++)o[i]=arguments[i];return(a=Object(v.a)(this,(e=Object(f.a)(t)).call.apply(e,[this].concat(o)))).state={menuEl:null,user:O.getUser().data},a.render=function(){var e=a.state.user;return r.a.createElement(Y.a,{id:"menu-appbar",anchorEl:a.props.target,anchorOrigin:{vertical:"top",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"right"},open:a.props.open,onClose:a.props.onClose},r.a.createElement(H.a,{onClick:function(){return a.props.onClose({navigate:"/user/account"})}},e.firstname," ",e.surname),r.a.createElement(H.a,{onClick:function(){return a.props.onClose({navigate:"/watch-later/my-list"})}},"Watch later list"),r.a.createElement(H.a,{onClick:function(){return a.props.onClose({navigate:"/user/logout"})}},"Logout"))},a}return Object(g.a)(t,e),t}(n.Component)),G=(a(527),function(e){function t(){var e,a;Object(h.a)(this,t);for(var n=arguments.length,o=new Array(n),i=0;i<n;i++)o[i]=arguments[i];return(a=Object(v.a)(this,(e=Object(f.a)(t)).call.apply(e,[this].concat(o)))).state={auth:O.isAuthenticated(),appMenuTarget:null,appUserMenuTarget:null},a.handleAppUserMenu=function(e){a.setState({appUserMenuTarget:e.currentTarget})},a.handlePrimaryButton=function(e){a.props.back&&a.props.history.goBack()},a.handleAppUserMenuClose=function(e){"undefined"!==typeof e.navigate&&a.props.history.push(e.navigate),a.setState({appUserMenuTarget:null})},a.render=function(){var e=a.state,t=e.auth,n=e.appMenuTarget,o=e.appUserMenuTarget,i=Boolean(o);return r.a.createElement("div",null,r.a.createElement(A.a,{className:"app-menu-bar",position:"fixed"},r.a.createElement(T.a,{className:"__toolbar"},r.a.createElement("div",{className:"__left"},r.a.createElement(q.a,{"aria-owns":n?"menu-appbar":null,"aria-haspopup":"true",onClick:a.handlePrimaryButton,color:"inherit"},a.props.back&&r.a.createElement(D.a,null),!a.props.back&&r.a.createElement(F.a,null)),r.a.createElement(U.a,{variant:"h6",color:"inherit"},a.props.title)),r.a.createElement("div",{className:"__right"},t&&r.a.createElement(r.a.Fragment,null,r.a.createElement(q.a,{"aria-owns":o?"menu-appbar":null,"aria-haspopup":"true",onClick:a.handleAppUserMenu,color:"inherit"},r.a.createElement(R.a,null)),r.a.createElement($,{target:a.state.appUserMenuTarget,open:i,onClose:a.handleAppUserMenuClose})),!t&&r.a.createElement(M.a,{to:"/user/login"},r.a.createElement(V.a,{variant:"outlined"},"Sign in"))))))},a}return Object(g.a)(t,e),t}(r.a.Component)),K=Object(S.a)(G),Q=a(93),X=a.n(Q),Z=(a(565),function(e){function t(){var e,a;Object(h.a)(this,t);for(var n=arguments.length,o=new Array(n),i=0;i<n;i++)o[i]=arguments[i];return(a=Object(v.a)(this,(e=Object(f.a)(t)).call.apply(e,[this].concat(o)))).render=function(){return r.a.createElement("div",{className:"app-spinner"},r.a.createElement(X.a,{color:"primary",size:50,thickness:1}))},a}return Object(g.a)(t,e),t}(n.Component)),ee=a(94),te=a.n(ee),ae=a(95),ne=a.n(ae),re=a(98),oe=a.n(re),ie=a(97),ce=a.n(ie),le=a(96),se=a.n(le),ue=a(44),me=a.n(ue),pe=a(235),he=a.n(pe),de=a(233),ve=a.n(de),fe=a(234),ge=a.n(fe),be=(a(568),function(e){function t(){var e,a;Object(h.a)(this,t);for(var n=arguments.length,o=new Array(n),i=0;i<n;i++)o[i]=arguments[i];return(a=Object(v.a)(this,(e=Object(f.a)(t)).call.apply(e,[this].concat(o)))).render=function(){return r.a.createElement(te.a,{className:"movies__card"},a.props.watchLater&&r.a.createElement("span",{className:"--number"},a.props.number+""),r.a.createElement(ne.a,{onClick:function(){return a.props.clickCallback({action:"open",detail:a.props.id})}},r.a.createElement(se.a,{component:"img",alt:a.props.title,className:"__media",height:"140",image:"https://image.tmdb.org/t/p/w500"+(a.props.backdrop?a.props.backdrop:a.props.poster),title:a.props.title}),r.a.createElement(ce.a,null,r.a.createElement(U.a,{gutterBottom:!0,variant:"h5",component:"h2"},a.props.title),r.a.createElement(U.a,{component:"p",className:"__copy"},a.props.copy))),r.a.createElement(oe.a,null,!a.props.watchLater&&r.a.createElement(me.a,{size:"small",color:"primary",onClick:function(){return a.props.clickCallback({action:"add_to_watchlater",detail:a.props.id})}},"Add to watch later"),a.props.watchLater&&r.a.createElement(r.a.Fragment,null,!a.props.first&&r.a.createElement(q.a,{"aria-label":"Move up",onClick:function(){return a.props.clickCallback({action:"move_up_watchlater",detail:a.props.number})}},r.a.createElement(ve.a,null)),!a.props.last&&r.a.createElement(q.a,{"aria-label":"Move down",onClick:function(){return a.props.clickCallback({action:"move_down_watchlater",detail:a.props.number})}},r.a.createElement(ge.a,null)),r.a.createElement(q.a,{"aria-label":"Delete",onClick:function(){return a.props.clickCallback({action:"remove_watchlater",detail:a.props.id})}},r.a.createElement(he.a,null)))))},a}return Object(g.a)(t,e),t}(n.Component)),we=(a(575),function(e){function t(e){var a;return Object(h.a)(this,t),(a=Object(v.a)(this,Object(f.a)(t).call(this))).State={},a}return Object(g.a)(t,e),Object(d.a)(t,[{key:"render",value:function(){var e=this;return this.props.movies.map(function(t,a){return r.a.createElement(be,{key:a,number:a+1,first:0===a,last:a+1===e.props.movies.length,id:t.id,title:t.title,copy:t.overview,backdrop:t.backdrop_path,poster:t.poster_path,clickCallback:e.props.clickCallback,watchLater:e.props.watchLater})})}}]),t}(n.Component)),Ee=(a(577),function(e){function t(){var e,a;Object(h.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(v.a)(this,(e=Object(f.a)(t)).call.apply(e,[this].concat(r)))).state={movies:null,search:"",searching:!1,httpClient:new j},a.componentDidMount=function(){a._fetchMovies().then(function(e){a.setState({movies:e.data})})},a.handleClick=function(e){return"open"===e.action?a.props.history.push("/movie/"+e.detail):"add_to_watchlater"===e.action?_.add(e.detail).then(function(e){window.dispatchEvent(new CustomEvent("AppSnackbar",{detail:{message:"Movie added to your watch later list.",action:"ok"}}))}):void 0},a.handleSearch=function(e){if(e.target.value.length<1)return a._fetchMovies().then(function(e){a.setState({search:"",searching:!1,movies:e.data})});a.setState({search:e.target.value,searching:!0}),a._searchMovies(e.target.value).then(function(e){return e.ok&&a.setState({movies:e.data}),a.setState({searching:!1})},function(e){return a.setState({searching:!1})})},a._fetchMovies=function(){return a.state.httpClient.get("movie/popular")},a._searchMovies=function(e){return a.state.httpClient.get("movie/search?query="+e)},a}return Object(g.a)(t,e),Object(d.a)(t,[{key:"render",value:function(){var e;return e=null===this.state.movies||this.state.searching?r.a.createElement(Z,null):r.a.createElement(r.a.Fragment,null,r.a.createElement("section",null,this.state.search.length>0&&r.a.createElement("h1",null,"Results for '",this.state.search,"'"),!this.state.search.length>0&&r.a.createElement("h1",null,"Popular right now"),r.a.createElement(we,{movies:this.state.movies,clickCallback:this.handleClick}))),r.a.createElement("div",{className:"movies"},r.a.createElement(K,{title:"Movies"}),r.a.createElement("main",null,r.a.createElement("section",null,r.a.createElement("h1",null,"Search"),r.a.createElement("form",{className:"__search",noValidate:!0,autoComplete:"off",onSubmit:this.handleSearch},r.a.createElement(w.a,{id:"outlined-search",label:"Search for movies",type:"search",value:this.state.search,onChange:this.handleSearch,className:"__input",margin:"normal",variant:"outlined"}))),e))}}]),t}(n.Component)),ke=(a(579),function(e){function t(){return Object(h.a)(this,t),Object(v.a)(this,Object(f.a)(t).apply(this,arguments))}return Object(g.a)(t,e),Object(d.a)(t,[{key:"render",value:function(){return r.a.createElement("section",{className:"movie-artwork",style:{backgroundImage:"url("+this.props.src+")"}},r.a.createElement("h1",{className:"__title"},this.props.title))}}]),t}(n.Component)),Ce=a(236),ye=a.n(Ce),Oe=a(237),je=a.n(Oe),_e=a(238),Me=a.n(_e),Se=(a(581),function(e){function t(){return Object(h.a)(this,t),Object(v.a)(this,Object(f.a)(t).apply(this,arguments))}return Object(g.a)(t,e),Object(d.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("section",{className:"movie-details"},r.a.createElement("h2",null,this.props.subtitle),r.a.createElement("span",{className:"__chips"},r.a.createElement(V.b,{label:this.props.vote_average,icon:r.a.createElement(ye.a,null),variant:"outlined"}),r.a.createElement(V.b,{label:this.props.runtime+" m",icon:r.a.createElement(je.a,null),variant:"outlined"}),this.props.genres.map(function(e,t){return r.a.createElement(V.b,{label:e.name,key:t,variant:"outlined"})})),r.a.createElement("p",{className:"__copy"},this.props.copy),r.a.createElement(V.a,{variant:"outlined",onClick:function(){return e.props.clickCallback({action:"add_to_watchlater",detail:e.props.id})}},"Add to watch later\xa0",r.a.createElement(Me.a,null)))}}]),t}(n.Component)),Ne=(a(583),function(e){function t(e){var a;return Object(h.a)(this,t),(a=Object(v.a)(this,Object(f.a)(t).call(this))).state={movie:null,id:null},a.componentDidMount=function(){a._fetchMovie(a.state.id).then(function(e){a.setState({movie:e.data})})},a.handleClick=function(e){if("add_to_watchlater"===e.action)return _.add(e.detail).then(function(e){window.dispatchEvent(new CustomEvent("AppSnackbar",{detail:{message:"Movie added to your watch later list.",action:"ok"}}))})},a.render=function(){var e;return e=null===a.state.movie?r.a.createElement(r.a.Fragment,null,r.a.createElement(K,{title:"Movie"}),r.a.createElement(Z,null)):r.a.createElement(r.a.Fragment,null,r.a.createElement(K,{title:a.state.movie.title,back:!0}),r.a.createElement("main",null,r.a.createElement(ke,{className:"__artwork",title:a.state.movie.title,src:"https://image.tmdb.org/t/p/original"+a.state.movie.poster_path}),r.a.createElement(Se,{className:"__details",id:a.state.movie.id,subtitle:a.state.movie.tagline,copy:a.state.movie.overview,vote_average:a.state.movie.vote_average,runtime:a.state.movie.runtime,genres:a.state.movie.genres,clickCallback:a.handleClick}))),r.a.createElement("div",{className:"movie"},e)},a._fetchMovie=function(e){return(new j).get("movie/"+e)},"undefined"!==typeof e.match.params.id&&(a.state.id=e.match.params.id),a}return Object(g.a)(t,e),t}(n.Component)),Ae=(a(585),function(e){function t(){var e,a;Object(h.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(v.a)(this,(e=Object(f.a)(t)).call.apply(e,[this].concat(r)))).state={movies:null,order:null,user:O.getUser().data,httpClient:new j},a.componentDidMount=function(){a.loadList()},a.handleClick=function(e){"open"===e.action&&a.props.history.push("/movie/"+e.detail),"move_up_watchlater"===e.action&&_.swap(e.detail,e.detail-1).then(function(e){a.emitMessage("Movie moved up in list."),a.loadList()}),"move_down_watchlater"===e.action&&_.swap(e.detail,e.detail+1).then(function(e){a.emitMessage("Movie moved down in list."),a.loadList()}),"remove_watchlater"===e.action&&_.remove(e.detail).then(function(e){a.emitMessage("Movie is removed from list."),a.loadList()})},a.loadList=function(){_.getAggerated().then(function(e){var t=e.order.map(function(t){return e.data[t]});a.setState({movies:t})})},a.emitMessage=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"ok";window.dispatchEvent(new CustomEvent("AppSnackbar",{detail:{message:e,action:t}}))},a._fetchMovies=function(){return a.state.httpClient.get("movie/popular")},a._searchMovies=function(e){return a.state.httpClient.get("movie/search?query="+e)},a}return Object(g.a)(t,e),Object(d.a)(t,[{key:"render",value:function(){var e;return e=null===this.state.movies||this.state.searching?r.a.createElement(Z,null):r.a.createElement(r.a.Fragment,null,r.a.createElement("section",null,r.a.createElement("h1",null,"Hi ",this.state.user.firstname,", this is your watch later list"),r.a.createElement(we,{movies:this.state.movies,clickCallback:this.handleClick,watchLater:!0}))),r.a.createElement("div",{className:"movies"},r.a.createElement(K,{title:"Movies",back:!0}),r.a.createElement("main",null,e))}}]),t}(n.Component)),Pe=(a(587),function(e){function t(){var e,a;Object(h.a)(this,t);for(var n=arguments.length,o=new Array(n),i=0;i<n;i++)o[i]=arguments[i];return(a=Object(v.a)(this,(e=Object(f.a)(t)).call.apply(e,[this].concat(o)))).state={username:"",password:""},a.handleChange=function(e){var t={};t[e.target.name]=e.target.value,a.setState(t)},a.handleSubmit=function(e){e.preventDefault();var t=function(e,t){return window.dispatchEvent(new CustomEvent("AppSnackbar",{detail:{message:e,action:t}}))};return a.state.username.length<3?t("Please provide a username","ok"):a.state.password.length<3?t("Please provide a password","ok"):void O.login(a.state.username,a.state.password).then(function(e){return a.props.history.push("/"),t("Welcome back!","ok")},function(e){return console.log(e),t("The credentials you entered are invalid","ok")})},a.handleCreateAccount=function(){a.props.history.push("/user/register")},a.render=function(){return r.a.createElement("div",{className:"login"},r.a.createElement(K,{title:"Sign in",back:!0}),r.a.createElement("form",{className:"__form",noValidate:!0,autoComplete:"off",onSubmit:a.handleSubmit},r.a.createElement(V.c,{name:"username",label:"Username or email",className:"",value:a.state.username,onChange:a.handleChange,margin:"normal",variant:"outlined",required:!0}),r.a.createElement(V.c,{name:"password",label:"Password",className:"",value:a.state.password,onChange:a.handleChange,margin:"normal",variant:"outlined",type:"password",required:!0}),r.a.createElement(V.a,{type:"submit",variant:"outlined",className:"submit"},"Sign in"),r.a.createElement(V.a,{size:"small",onClick:a.handleCreateAccount},"Create an account")))},a}return Object(g.a)(t,e),t}(n.Component)),Te=function(e){function t(e){var a;return Object(h.a)(this,t),a=Object(v.a)(this,Object(f.a)(t).call(this)),O.logout(),e.history.push("/"),window.dispatchEvent(new CustomEvent("AppSnackbar",{detail:{message:"You have been logged out.",action:"ok"}})),a}return Object(g.a)(t,e),Object(d.a)(t,[{key:"render",value:function(){return r.a.createElement("p",null,"Logging out ...")}}]),t}(n.Component),Le=(a(589),function(e){function t(){var e,a;Object(h.a)(this,t);for(var n=arguments.length,o=new Array(n),i=0;i<n;i++)o[i]=arguments[i];return(a=Object(v.a)(this,(e=Object(f.a)(t)).call.apply(e,[this].concat(o)))).state={firstname:"",surname:"",username:"",password:"",password2:""},a.handleChange=function(e){var t={};t[e.target.name]=e.target.value,a.setState(t)},a.handleSubmit=function(e){e.preventDefault();var t=function(e,t){return window.dispatchEvent(new CustomEvent("AppSnackbar",{detail:{message:e,action:t}}))};return Object.keys(a.state).reduce(function(e,t){return e||a.state[t].length<3},!1)?t("Please fill out all fields","ok"):a.state.password!==a.state.password2?t("Passwords do not match each other","ok"):void O.register(a.state.username,a.state.password,a.state.firstname,a.state.surname).then(function(e){return a.props.history.push("/user/login"),t("Thanks for registering ".concat(a.state.firstname,". Please login with your email and password."),"ok")},function(e){return t("Could not register, your email may already exist.","ok")})},a.handleCreateAccount=function(){return a.props.history.push("/user/register")},a.render=function(){return r.a.createElement("div",{className:"login"},r.a.createElement(K,{title:"Register",back:!0}),r.a.createElement("form",{className:"__form",noValidate:!0,autoComplete:"off",onSubmit:a.handleSubmit},r.a.createElement(V.c,{name:"firstname",label:"First Name",className:"",value:a.state.firstname,onChange:a.handleChange,margin:"normal",variant:"outlined",required:!0}),r.a.createElement(V.c,{name:"surname",label:"Surname",className:"",value:a.state.surname,onChange:a.handleChange,margin:"normal",variant:"outlined",required:!0}),r.a.createElement(V.c,{name:"username",label:"Email",className:"",value:a.state.username,onChange:a.handleChange,margin:"normal",variant:"outlined",required:!0}),r.a.createElement(V.c,{name:"password",label:"Password",className:"",value:a.state.password,onChange:a.handleChange,margin:"normal",variant:"outlined",type:"password",required:!0}),r.a.createElement(V.c,{name:"password2",label:"Repeat Password",className:"",value:a.state.password2,onChange:a.handleChange,margin:"normal",variant:"outlined",type:"password",required:!0}),r.a.createElement(V.a,{type:"submit",variant:"outlined",className:"submit"},"Register")))},a}return Object(g.a)(t,e),t}(n.Component)),Ue=a(240),xe=function(e){var t=e.component,a=Object(Ue.a)(e,["component"]);return r.a.createElement(m.a,Object.assign({},a,{render:function(e){return O.isAuthenticated()?r.a.createElement(t,e):r.a.createElement(p.a,{to:"/user/login"})}}))},qe=function(){return r.a.createElement(u.a,null,r.a.createElement(m.a,{exact:!0,path:"/",component:Ee}),r.a.createElement(m.a,{exact:!0,path:"/movie/:id",component:Ne}),r.a.createElement(xe,{exact:!0,path:"/watch-later/:id",component:Ae}),r.a.createElement(m.a,{exact:!0,path:"/user/login",component:Pe}),r.a.createElement(m.a,{exact:!0,path:"/user/register",component:Le}),r.a.createElement(xe,{exact:!0,path:"/user/logout",component:Te}),r.a.createElement(p.a,{from:"*",to:"/"}))},ze=a(99),De=a.n(ze),Be=a(239),Fe=a.n(Be),Ie=function(e){function t(){var e,a;Object(h.a)(this,t);for(var n=arguments.length,o=new Array(n),i=0;i<n;i++)o[i]=arguments[i];return(a=Object(v.a)(this,(e=Object(f.a)(t)).call.apply(e,[this].concat(o)))).state={open:!1,message:"",action:""},a.componentDidMount=function(){window.addEventListener("AppSnackbar",a.handleMessage)},a.handleMessage=function(e){a.state.open&&a.handleClose(null,"new msg"),a.setState({open:!0,message:e.detail.message,action:e.detail.action})},a.handleClose=function(e,t){"clickaway"!==t&&a.setState({open:!1,message:"",action:""})},a.render=function(){return r.a.createElement("div",null,r.a.createElement(De.a,{anchorOrigin:{vertical:"bottom",horizontal:"center"},open:a.state.open,autoHideDuration:6e3,onClose:a.handleClose,ContentProps:{"aria-describedby":"message-id"},message:r.a.createElement("span",{id:"message-id"},a.state.message),action:[r.a.createElement(me.a,{key:"{this.state.action}",color:"secondary",size:"small",onClick:a.handleClose},a.state.action),r.a.createElement(q.a,{key:"close","aria-label":"Close",color:"inherit",onClick:a.handleClose},r.a.createElement(Fe.a,null))]}))},a}return Object(g.a)(t,e),t}(r.a.Component),Re=(a(595),Object(l.createMuiTheme)({palette:{type:"dark",primary:s.cyan,secondary:s.deepPurple},typography:{useNextVariants:!0}}));i.a.render(r.a.createElement(l.MuiThemeProvider,{theme:Re},r.a.createElement(c.a,null,r.a.createElement("div",null,qe())),r.a.createElement(Ie,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[303,2,1]]]);
//# sourceMappingURL=main.ce8c46bd.chunk.js.map