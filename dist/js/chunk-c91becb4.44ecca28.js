(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-c91becb4"],{"96d9":function(e,t,n){"use strict";var o=n("7a23"),c={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"}},{tag:"path",attrs:{d:"M464 688a48 48 0 1096 0 48 48 0 10-96 0zm24-112h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8z"}}]},name:"exclamation-circle",theme:"outlined"},r=c,a=n("b3f0");function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?Object(arguments[t]):{},o=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),o.forEach((function(t){d(e,t,n[t])}))}return e}function d(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var s=function(e,t){var n=i({},e,t.attrs);return o["createVNode"](a["a"],o["mergeProps"](n,{icon:r}),null)};s.displayName="ExclamationCircleOutlined",s.inheritAttrs=!1;t["a"]=s},f7ec:function(e,t,n){"use strict";n.r(t);var o=n("7a23"),c=Object(o["createTextVNode"])("Create new station"),r=Object(o["createTextVNode"])("Delete"),a=Object(o["createTextVNode"])("Edit");function i(e,t,n,i,d,s){var u=Object(o["resolveComponent"])("a-button"),l=Object(o["resolveComponent"])("router-link"),b=Object(o["resolveComponent"])("a-divider"),f=Object(o["resolveComponent"])("a-table");return Object(o["openBlock"])(),Object(o["createBlock"])(o["Fragment"],null,[Object(o["createVNode"])(l,{to:"/admin/stations/create"},{default:Object(o["withCtx"])((function(){return[Object(o["createVNode"])(u,{type:"link"},{default:Object(o["withCtx"])((function(){return[c]})),_:1})]})),_:1}),Object(o["createVNode"])(f,{span:"4",columns:s.columns,"data-source":s.data,loading:e.$store.state.modules.loading,rowKey:function(e){return e._id}},{action:Object(o["withCtx"])((function(e){var t=e.record;return[Object(o["createVNode"])(u,{type:"danger",onClick:function(e){return s.showConfirm(t._id)}},{default:Object(o["withCtx"])((function(){return[r]})),_:2},1032,["onClick"]),Object(o["createVNode"])(b,{type:"vertical"}),Object(o["createVNode"])(l,{to:"/admin/stations/".concat(t._id,"/edit")},{default:Object(o["withCtx"])((function(){return[Object(o["createVNode"])(u,null,{default:Object(o["withCtx"])((function(){return[a]})),_:1})]})),_:2},1032,["to"])]})),_:1},8,["columns","data-source","loading","rowKey"])],64)}var d=n("0618"),s=n("ed3b"),u=n("96d9"),l={created:function(){this.$store.dispatch(d["b"])},methods:{showConfirm:function(e){var t=this;s["a"].confirm({title:"Do you want to delete these items?",content:e,okText:"Delete",icon:Object(o["createVNode"])(u["a"]),onOk:function(){t.$store.dispatch("actFetchDeleteStation",e)},onCancel:function(){}})}},computed:{data:function(){return this.$store.state.modules.data},columns:function(){return[{title:"Name",dataIndex:"name",key:"name",slots:{customRender:"name"}},{title:"Province",dataIndex:"province",key:"province",slots:{customRender:"province"}},{title:"Address",dataIndex:"address",key:"address",ellipsis:!0},{title:"Action",dataIndex:"action",key:"action",slots:{customRender:"action"}}]}}};l.render=i;t["default"]=l}}]);
//# sourceMappingURL=chunk-c91becb4.44ecca28.js.map