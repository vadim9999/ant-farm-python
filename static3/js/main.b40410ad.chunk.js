(this["webpackJsonpant-farm-react"]=this["webpackJsonpant-farm-react"]||[]).push([[0],{204:function(e,t,c){},227:function(e,t,c){"use strict";c.r(t);var n,i=c(0),r=c.n(i),a=c(229),s=c(232),l=c(122),j=c(18),d=c(234),o=c(230),u=c(231),b=c(55),x=c(6),h=o.a.Option,O=function(){return Object(x.jsxs)("div",{children:[Object(x.jsx)(u.a,{placeholder:"\u0406\u043c'\u044f \u0432\u0456\u0434\u0435\u043e\u0444\u0430\u0439\u043b\u0443",style:{width:400}}),Object(x.jsxs)(o.a,{defaultValue:"854x480",style:{width:120},children:[Object(x.jsx)(h,{value:"1280x720",children:"1280x720"}),Object(x.jsx)(h,{value:"854x480",children:"854x480"}),Object(x.jsx)(h,{value:"426x240",children:"426x240"})]}),Object(x.jsx)(b.a,{type:"primary",icon:Object(x.jsx)(d.a,{}),size:"large",children:"\u0421\u0442\u0432\u043e\u0440\u0438\u0442\u0438 \u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u043d\u044f"})]})},m=c(235),v=c(236),p=o.a.Option,g=function(){return Object(x.jsxs)("div",{children:[Object(x.jsx)(b.a,{type:"primary",icon:Object(x.jsx)(m.a,{}),size:"large",children:"\u041f\u043e\u0447\u0430\u0442\u0438 \u0442\u0440\u0430\u043d\u0441\u043b\u044f\u0446\u0456\u044e"}),Object(x.jsx)(b.a,{type:"primary",danger:!0,icon:Object(x.jsx)(v.a,{}),size:"large",disabled:!0,children:"\u0417\u0443\u043f\u0438\u043d\u0438\u0442\u0438 \u0442\u0440\u0430\u043d\u0441\u043b\u044f\u0446\u0456\u044e"}),Object(x.jsxs)(o.a,{defaultValue:"480",style:{width:120},children:[Object(x.jsx)(p,{value:"720",children:"740"}),Object(x.jsx)(p,{value:"480",children:"480"}),Object(x.jsx)(p,{value:"240",children:"240"})]})]})},y=c(94),f=c(125),w=c(233),k=c(237),I=c(238),S=(c(204),c(92)),C=c.n(S),z="http://raspberrypi.local",P=function(e){return e.replace("?id=","")};!function(e){e.Q720="1280x720",e.Q480="854x480",e.Q240="426x240"}(n||(n={}));var F=function(){var e=Object(j.f)(),t=(Object(j.f)(),Object(i.useReducer)((function(e,t){return Object(y.a)(Object(y.a)({},e),t)}),{imageUrl:"",isStartedPreview:!1,currentResolution:n.Q480})),c=Object(f.a)(t,2),r=c[0],a=c[1];console.log("location",P(e.search));var l=P(e.search),d=function(e){var t=e.resolution;return function(){(function(e){var t=e.userId,c=e.resolution;return C.a.post("".concat(z,"/start?id=").concat(t),c,{headers:{"Content-Type":"text/plain"}})})({userId:l,resolution:t}).then((function(){var e="".concat(z,"/stream.mjpg?id=").concat(l);a({imageUrl:e,isStartedPreview:!0})}))}},o=function(){return function(e){var t=e.userId;return C.a.get("".concat(z,"/stop?id=").concat(t))}({userId:l}).then((function(){a({imageUrl:"",isStartedPreview:!1})}))},u=Object(x.jsxs)(s.a,{selectedKeys:[r.currentResolution],onClick:function(e){r.isStartedPreview&&o().then((function(){setTimeout((function(){d({resolution:e.key})()}),1e3)})),console.log("e",e.key),a({currentResolution:e.key})},children:[Object(x.jsx)(s.a.Item,{children:"720 HD"},n.Q720),Object(x.jsx)(s.a.Item,{children:"480"},n.Q480),Object(x.jsx)(s.a.Item,{children:"240"},n.Q240)]});return Object(x.jsx)("div",{className:"videoPlayer",children:Object(x.jsxs)("div",{id:"fullScreen",children:[r.imageUrl&&Object(x.jsx)("img",{id:"badge",src:r.imageUrl,width:"640",height:"480",alt:"Video"}),Object(x.jsxs)("div",{className:"controls",children:[Object(x.jsxs)("div",{children:[Object(x.jsx)(b.a,{type:"primary",icon:Object(x.jsx)(m.a,{}),size:"large",onClick:d({resolution:r.currentResolution}),disabled:r.isStartedPreview}),Object(x.jsx)(b.a,{type:"primary",danger:!0,icon:Object(x.jsx)(v.a,{}),size:"large",onClick:o,disabled:!r.isStartedPreview})]}),Object(x.jsxs)("div",{children:[Object(x.jsx)(w.a,{overlay:u,trigger:["click"],placement:"topCenter",children:Object(x.jsx)(b.a,{type:"primary",icon:Object(x.jsx)(k.a,{}),size:"large"})}),Object(x.jsx)(b.a,{type:"primary",icon:Object(x.jsx)(I.a,{}),size:"large",onClick:function(){var e,t=document.getElementById("fullScreen");if(null===t||void 0===t||t.webkitRequestFullScreen(),null===(e=document)||void 0===e?void 0:e.webkitFullscreenElement){document.webkitCancelFullScreen();var c=document.getElementById("badge");null===c||void 0===c||c.setAttribute("width","640"),null===c||void 0===c||c.setAttribute("height","480")}else{null===t||void 0===t||t.webkitRequestFullScreen();var n=document.getElementById("badge");null===n||void 0===n||n.setAttribute("width","100%"),null===n||void 0===n||n.setAttribute("height","100%")}}})]})]})]})})},N=o.a.Option,Q=function(){return Object(x.jsxs)("div",{children:[Object(x.jsx)(u.a,{placeholder:"\u0406\u043c'\u044f \u0432\u0456\u0434\u0435\u043e\u0444\u0430\u0439\u043b\u0443",style:{width:400}}),Object(x.jsxs)(o.a,{defaultValue:"480",style:{width:120},children:[Object(x.jsx)(N,{value:"720",children:"740"}),Object(x.jsx)(N,{value:"480",children:"480"}),Object(x.jsx)(N,{value:"240",children:"240"})]}),Object(x.jsx)(b.a,{type:"primary",icon:Object(x.jsx)(m.a,{}),size:"large",children:"\u041f\u043e\u0447\u0430\u0442\u0438 \u0437\u0430\u043f\u0438\u0441"}),Object(x.jsx)(b.a,{type:"primary",danger:!0,icon:Object(x.jsx)(v.a,{}),size:"large",disabled:!0,children:"\u0417\u0443\u043f\u0438\u043d\u0438\u0442\u0438 \u0437\u0430\u043f\u0438\u0441"})]})},R=function(){return Object(x.jsxs)("div",{children:[Object(x.jsx)(F,{}),Object(x.jsx)(g,{}),Object(x.jsx)(Q,{}),Object(x.jsx)(O,{})]})},B=function(){return Object(x.jsx)(l.a,{children:Object(x.jsx)(j.c,{children:Object(x.jsx)(j.a,{exact:!0,path:"/index.html",children:Object(x.jsx)(R,{})})})})},E=(c(226),a.a.Header),U=a.a.Sider,A=a.a.Content,T=function(){return Object(x.jsxs)(a.a,{children:[Object(x.jsxs)(E,{className:"header",children:[Object(x.jsx)("div",{className:"logo"}),"Header"]}),Object(x.jsxs)(a.a,{className:"site-layout",children:[Object(x.jsx)(U,{width:200,className:"site-layout-background",style:{overflow:"auto",height:"calc(100vh - 64px)",position:"fixed",bottom:0,left:0},children:Object(x.jsxs)(s.a,{mode:"inline",defaultSelectedKeys:["1"],defaultOpenKeys:["sub1"],children:[Object(x.jsx)(s.a.Item,{children:"\u041c\u043e\u043d\u0456\u0442\u043e\u0440\u0438\u043d\u0433"},"1"),Object(x.jsx)(s.a.Item,{children:"\u0412\u0456\u0434\u0435\u043e\u0442\u0440\u0430\u043d\u0441\u043b\u044f\u0446\u0456\u044f"},"2"),Object(x.jsx)(s.a.Item,{children:"\u041c\u0435\u0434\u0456\u0430\u0444\u0430\u0439\u043b\u0438"},"3"),Object(x.jsx)(s.a.Item,{children:"\u041d\u0430\u043b\u0430\u0448\u0442\u0443\u0432\u0430\u043d\u043d\u044f"},"4")]})}),Object(x.jsx)(a.a,{style:{padding:"0 24px 24px",marginLeft:"200px"},children:Object(x.jsx)(A,{className:"site-layout-background",style:{padding:24,margin:0},children:Object(x.jsx)(B,{})})})]})]})},V=c(29),H=function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,239)).then((function(t){var c=t.getCLS,n=t.getFID,i=t.getFCP,r=t.getLCP,a=t.getTTFB;c(e),n(e),i(e),r(e),a(e)}))};c.n(V).a.render(Object(x.jsx)(r.a.StrictMode,{children:Object(x.jsx)(T,{})}),document.getElementById("root")),H()}},[[227,1,2]]]);
//# sourceMappingURL=main.b40410ad.chunk.js.map