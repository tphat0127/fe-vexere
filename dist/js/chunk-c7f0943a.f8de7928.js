(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-c7f0943a"],{1608:function(e,t,n){"use strict";n.r(t);n("b0c0");var r=n("7a23");function c(e,t,n,c,o,a){var i=Object(r["resolveComponent"])("Loader"),u=Object(r["resolveComponent"])("EnvironmentOutlined"),l=Object(r["resolveComponent"])("a-descriptions-item"),s=Object(r["resolveComponent"])("a-descriptions"),b=Object(r["resolveComponent"])("a-row");return a.loading?(Object(r["openBlock"])(),Object(r["createBlock"])(i,{key:0})):(Object(r["openBlock"])(),Object(r["createBlock"])(b,{key:1,type:"flex",justify:"space-around",align:"middle"},{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(s,{bordered:""},{title:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(u,{style:{fontSize:"1.5em",color:"#08c"}},null,8,["style"]),Object(r["createTextVNode"])(" "+Object(r["toDisplayString"])(a.data.name),1)]})),default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(l,{label:"Địa chỉ"},{default:Object(r["withCtx"])((function(){return[Object(r["createTextVNode"])(Object(r["toDisplayString"])(a.data.address),1)]})),_:1}),Object(r["createVNode"])(l,{label:"Tỉnh thành"},{default:Object(r["withCtx"])((function(){return[Object(r["createTextVNode"])(Object(r["toDisplayString"])(a.data.province),1)]})),_:1})]})),_:1})]})),_:1}))}var o=n("ae8e"),a=n("3415"),i={components:{Loader:o["a"],EnvironmentOutlined:a["a"]},created:function(){var e=this.$route.params.stationId;this.$store.dispatch("fetchDetailStation",e)},computed:{loading:function(){return this.$store.state.station.loading},data:function(){return this.$store.state.station.data}}};i.render=c;t["default"]=i},3415:function(e,t,n){"use strict";var r=n("7a23"),c={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M854.6 289.1a362.49 362.49 0 00-79.9-115.7 370.83 370.83 0 00-118.2-77.8C610.7 76.6 562.1 67 512 67c-50.1 0-98.7 9.6-144.5 28.5-44.3 18.3-84 44.5-118.2 77.8A363.6 363.6 0 00169.4 289c-19.5 45-29.4 92.8-29.4 142 0 70.6 16.9 140.9 50.1 208.7 26.7 54.5 64 107.6 111 158.1 80.3 86.2 164.5 138.9 188.4 153a43.9 43.9 0 0022.4 6.1c7.8 0 15.5-2 22.4-6.1 23.9-14.1 108.1-66.8 188.4-153 47-50.4 84.3-103.6 111-158.1C867.1 572 884 501.8 884 431.1c0-49.2-9.9-97-29.4-142zM512 880.2c-65.9-41.9-300-207.8-300-449.1 0-77.9 31.1-151.1 87.6-206.3C356.3 169.5 431.7 139 512 139s155.7 30.5 212.4 85.9C780.9 280 812 353.2 812 431.1c0 241.3-234.1 407.2-300 449.1zm0-617.2c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm79.2 255.2A111.6 111.6 0 01512 551c-29.9 0-58-11.7-79.2-32.8A111.6 111.6 0 01400 439c0-29.9 11.7-58 32.8-79.2C454 338.6 482.1 327 512 327c29.9 0 58 11.6 79.2 32.8C612.4 381 624 409.1 624 439c0 29.9-11.6 58-32.8 79.2z"}}]},name:"environment",theme:"outlined"},o=c,a=n("b3f0");function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?Object(arguments[t]):{},r=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),r.forEach((function(t){u(e,t,n[t])}))}return e}function u(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var l=function(e,t){var n=i({},e,t.attrs);return r["createVNode"](a["a"],r["mergeProps"](n,{icon:o}),null)};l.displayName="EnvironmentOutlined",l.inheritAttrs=!1;t["a"]=l},ae8e:function(e,t,n){"use strict";var r=n("7a23");function c(e,t,n,c,o,a){var i=Object(r["resolveComponent"])("a-spin"),u=Object(r["resolveComponent"])("a-row");return Object(r["openBlock"])(),Object(r["createBlock"])(u,{type:"flex",justify:"center",align:"middle"},{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(i,{size:"large"})]})),_:1})}var o={};o.render=c;t["a"]=o},b0c0:function(e,t,n){var r=n("83ab"),c=n("9bf2").f,o=Function.prototype,a=o.toString,i=/^\s*function ([^ (]*)/,u="name";r&&!(u in o)&&c(o,u,{configurable:!0,get:function(){try{return a.call(this).match(i)[1]}catch(e){return""}}})}}]);
//# sourceMappingURL=chunk-c7f0943a.f8de7928.js.map