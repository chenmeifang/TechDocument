(()=>{"use strict";var e,n={742:(e,n,t)=>{var r=t(471),o=t(866),i=t(820),l=t(794);function c(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){var t=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=t){var r,o,i,l,c=[],a=!0,u=!1;try{if(i=(t=t.call(e)).next,0===n){if(Object(t)!==t)return;a=!1}else for(;!(a=(r=i.call(t)).done)&&(c.push(r.value),c.length!==n);a=!0);}catch(e){u=!0,o=e}finally{try{if(!a&&null!=t.return&&(l=t.return(),Object(l)!==l))return}finally{if(u)throw o}}return c}}(e,n)||function(e,n){if(e){if("string"==typeof e)return a(e,n);var t={}.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?a(e,n):void 0}}(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function a(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,r=Array(n);t<n;t++)r[t]=e[t];return r}const u=function(){var e=c((0,r.useState)(""),2),n=e[0],t=e[1],o=c((0,r.useState)(""),2),a=o[0],u=o[1],s=(0,i.W6)();return r.createElement(r.Fragment,null,r.createElement("div",null,"登录页面"),r.createElement("label",null,"用户名："),r.createElement("input",{type:"text",value:n,onChange:function(e){t(e.target.value)}}),r.createElement("br",null),r.createElement("label",null,"密码："),r.createElement("input",{type:"password",value:a,onChange:function(e){u(e.target.value)}}),r.createElement("br",null),r.createElement("button",{onClick:function(){l.http.post("/users/login",{username:n,pwd:a}).then((function(e){if(console.log(e),200==e.data.code){var n=e.data.token;document.cookie="".concat(n),s.replace("/fileList")}else alert("Invalid credentials")})).catch((function(e){console.log(e)}))}},"登录"))};var s=t(30),d=t(984),f=t.n(d),p=t(954),g=t(94),h=t(579),v=t(47),m=t(72),y=t.n(m),b=t(825),A=t.n(b),x=t(659),E=t.n(x),M=t(56),w=t.n(M),j=t(540),C=t.n(j),O=t(113),k=t.n(O),S=t(995),T={};function B(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,r=Array(n);t<n;t++)r[t]=e[t];return r}T.styleTagTransform=k(),T.setAttributes=w(),T.insert=E().bind(null,"head"),T.domAPI=A(),T.insertStyleElement=C(),y()(S.A,T),S.A&&S.A.locals&&S.A.locals;const I=function(){var e,n,t,o=(0,r.useRef)(null),i=(n=(0,r.useState)([]),t=2,function(e){if(Array.isArray(e))return e}(n)||function(e,n){var t=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=t){var r,o,i,l,c=[],a=!0,u=!1;try{if(i=(t=t.call(e)).next,0===n){if(Object(t)!==t)return;a=!1}else for(;!(a=(r=i.call(t)).done)&&(c.push(r.value),c.length!==n);a=!0);}catch(e){u=!0,o=e}finally{try{if(!a&&null!=t.return&&(l=t.return(),Object(l)!==l))return}finally{if(u)throw o}}return c}}(n,t)||function(e,n){if(e){if("string"==typeof e)return B(e,n);var t={}.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?B(e,n):void 0}}(n,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),l=(i[0],i[1],(null==o||null===(e=o.current)||void 0===e?void 0:e.innerHTML)||""),c=new(f());(0,r.useEffect)((function(){p.default.on("connect",(function(){console.log("client connect",p.default.id)})),p.default.on("edit",(function(e){o.current.innerHTML=(0,h.receiveMessage)(e[0],o.current.innerHTML)}))}));var a=function(e){var n=0;console.log("caretOffset:",n);var t=e.target.ownerDocument.defaultView.getSelection();return t.rangeCount&&(t.getRangeAt(0),n=t.focusOffset),n};return r.createElement("div",null,"查看文件",r.createElement("button",{onClick:function(){o.current.innerHTML=(0,v.undo)(o.current.innerHTML)}},"undo"),r.createElement("div",{contentEditable:!0,onInput:function(e){console.log("编辑了，需要发消息出去:",e.target.innerHTML);var n=c.diff_main(l,e.target.innerHTML);l=e.target.innerHTML;var t=(0,g.createInsertTextActPair)(a(e)-1,1,n[n.length-1][1]),r={msg:t.act,rMsg:t.rAct};(0,g.sendMsg)([r])},className:"editor",ref:o,onMouseUp:a}))},L=function(){return r.createElement(o.BrowserRouter,null,r.createElement(i.qh,{path:"/login",component:u}),r.createElement(i.qh,{path:"/fileList",component:s.A}),r.createElement(i.qh,{path:"/fileEdit",component:I}))};t(723).createRoot(document.getElementById("root")).render(r.createElement(L,null))},954:(e,n,t)=>{t.r(n),t.d(n,{default:()=>r});const r=(0,t(888).Ay)("http://localhost:4000")},794:(e,n,t)=>{t.r(n),t.d(n,{http:()=>r});var r=t(569).A.create({baseURL:"http://localhost:3000",withCredentials:!0});r.interceptors.request.use((function(e){return console.log("config:",e),e.headers.setAuthorization(document.cookie),e}),(function(e){return Promise.reject(e)}))},995:(e,n,t)=>{t.d(n,{A:()=>c});var r=t(963),o=t.n(r),i=t(89),l=t.n(i)()(o());l.push([e.id,"/* 需要在webpack中配置css相关的loader */\n.editor {\n  border: 1px solid red;\n  padding: 10px;\n  height: 400px;\n  width: 400px;\n  /* min-height: 200px; */\n  margin-top: 10px;\n}\n","",{version:3,sources:["webpack://./src/pages/FileEdit/index.css"],names:[],mappings:"AAAA,8BAA8B;AAC9B;EACE,qBAAqB;EACrB,aAAa;EACb,aAAa;EACb,YAAY;EACZ,uBAAuB;EACvB,gBAAgB;AAClB",sourcesContent:["/* 需要在webpack中配置css相关的loader */\r\n.editor {\r\n  border: 1px solid red;\r\n  padding: 10px;\r\n  height: 400px;\r\n  width: 400px;\r\n  /* min-height: 200px; */\r\n  margin-top: 10px;\r\n}\r\n"],sourceRoot:""}]);const c=l},94:(e,n,t)=>{Object.defineProperty(n,"__esModule",{value:!0}),n.createInsertTextActPair=n.sendMsg=n.sendOutMsgWithoutDealUndoRedo=void 0;var r=t(954),o=t(47),i={msg:[],rMsg:[]},l=function(e,n){r.default.emit("edit",e),(0,o.addUndo)(e,n)};n.sendOutMsgWithoutDealUndoRedo=function(e){r.default.emit("edit",e)},n.sendMsg=function(e){for(var n=[],t=[],r=0;r<e.length;r++){var o=e[r].msg,c=e[r].rMsg;n.push(o),t.push(c)}!function(e){if("insert"===e[0].type)return!0}(n)?l(n,t):function(e,n){var t,r,o=e[0];i.msg.length?(t=o,r=i.msg[0],t.idx===r.idx+r.len&&(r.len+=t.len,r.cnt+=t.cnt)):(i.msg=e,i.rMsg=n,setTimeout((function(){l(i.msg,i.rMsg),i={msg:[],rMsg:[]}}),5e3))}(n,t)},n.createInsertTextActPair=function(e,n,t){return{act:c(e,n,t),rAct:a(e,n,t)}};var c=function(e,n,t){return{idx:e,len:n,type:"insert",cnt:t}},a=function(e,n,t){return{idx:e,len:n,type:"delete",cnt:t}}},579:(e,n)=>{Object.defineProperty(n,"__esModule",{value:!0}),n.receiveMessage=void 0,n.receiveMessage=function(e,n){return t(e,n)};var t=function(e,n){var t="";return"insert"===e.type?t=n.slice(0,e.idx)+e.cnt+n.slice(e.idx):"delete"===e.type&&(t=n.slice(0,e.idx)+n.slice(e.idx+e.len)),t}},30:(e,n,t)=>{var r=t(671),o=(t(471),t(471)),i=t(866),l=t(794);n.A=function(){var e=(0,o.useState)([]),n=e[0],t=e[1],c=(0,o.useRef)(),a=(0,o.useRef)(),u=(0,i.useHistory)();(0,o.useEffect)((function(){l.http.get("/file/myList").then((function(e){console.log("res:",e),console.log("document.cookie:",document.cookie),200===e.data.code?t(e.data.data):u.replace("/login")})).catch((function(e){console.log("err:",e)}))}),[]);var s=function(){window.open("/fileEdit")},d=function(e){e?a.current.click():c.current.click()};return(0,r.jsxs)("div",{children:[(0,r.jsx)("button",{onClick:function(){fetch("http://localhost:3000/file/image.jpg",{headers:{}}).then((function(e){console.log("图片请求：",e)}))},children:"发送一个静态文件请求"}),(0,r.jsx)("button",{onClick:function(){l.http.get("/file/myList").then((function(e){console.log("res:",e)})).catch((function(e){console.log("err:",e)}))},children:"fileList请求"}),(0,r.jsx)("button",{onClick:function(){l.http.post("/file/addFile").then((function(e){console.log("res:",e)})).catch((function(e){console.log("err:",e)}))},children:"新建一个文件"}),(0,r.jsx)("button",{onClick:function(){d(!1)},children:"上传一个文件"}),(0,r.jsx)("button",{onClick:function(){d(!0)},children:"分片上传一个文件"}),(0,r.jsx)("input",{type:"file",ref:c,onChange:function(e){!function(e){var n=new FormData;n.append("file",e),console.log("开始上传文档：",new Date),l.http.post("/file/upload",n).then((function(e){console.log("文件上传的结果res:",e),console.log("文档上传结束：",new Date)})).catch((function(e){console.log("文件上传的结果err:",e)}))}(e.target.files[0])}}),(0,r.jsx)("input",{type:"file",ref:a,onChange:function(e){!function(e){console.log("开始分片上传文档：",new Date);for(var n=419430400,t=Math.ceil(e.size/n),r=[],o=function(n,t,r){var o=new FormData;return o.append("file",n,e.name),o.append("chunkNumber",t),o.append("totalChunks",r),l.http.post("/file/upload2",o)},i=0;i<e.size;i+=n){var c=Math.min(i+n,e.size),a=e.slice(i,c),u=i/n+1;r.push(o(a,u,t))}Promise.all(r).then((function(e){console.log("文件分片上传的结果：",e),console.log("文档分片上传结束：",new Date)}))}(e.target.files[0])}}),n.map((function(e){return(0,r.jsx)("div",{onClick:s,children:e.title},e.docId)}))]})}},47:(e,n,t)=>{Object.defineProperty(n,"__esModule",{value:!0}),n.undo=n.addUndo=void 0;var r=t(94),o=t(579),i=[],l=0;n.undo=function(e){var n=i[l];l--;var t=null==n?void 0:n.undo,c=(0,o.receiveMessage)(t[0],e);return(0,r.sendOutMsgWithoutDealUndoRedo)(t),c},n.addUndo=function(e,n){var t={undo:[],redo:[]};t.undo=n,t.redo=e,i.push(t),l=i.length-1}}},t={};function r(e){var o=t[e];if(void 0!==o)return o.exports;var i=t[e]={id:e,exports:{}};return n[e](i,i.exports,r),i.exports}r.m=n,e=[],r.O=(n,t,o,i)=>{if(!t){var l=1/0;for(s=0;s<e.length;s++){for(var[t,o,i]=e[s],c=!0,a=0;a<t.length;a++)(!1&i||l>=i)&&Object.keys(r.O).every((e=>r.O[e](t[a])))?t.splice(a--,1):(c=!1,i<l&&(l=i));if(c){e.splice(s--,1);var u=o();void 0!==u&&(n=u)}}return n}i=i||0;for(var s=e.length;s>0&&e[s-1][2]>i;s--)e[s]=e[s-1];e[s]=[t,o,i]},r.n=e=>{var n=e&&e.__esModule?()=>e.default:()=>e;return r.d(n,{a:n}),n},r.d=(e,n)=>{for(var t in n)r.o(n,t)&&!r.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:n[t]})},r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),r.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e={792:0};r.O.j=n=>0===e[n];var n=(n,t)=>{var o,i,[l,c,a]=t,u=0;if(l.some((n=>0!==e[n]))){for(o in c)r.o(c,o)&&(r.m[o]=c[o]);if(a)var s=a(r)}for(n&&n(t);u<l.length;u++)i=l[u],r.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return r.O(s)},t=self.webpackChunkmyreactapp=self.webpackChunkmyreactapp||[];t.forEach(n.bind(null,0)),t.push=n.bind(null,t.push.bind(t))})(),r.nc=void 0;var o=r.O(void 0,[415],(()=>r(742)));o=r.O(o)})();
//# sourceMappingURL=main.7205bb362a.js.map