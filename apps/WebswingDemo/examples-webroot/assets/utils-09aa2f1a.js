var A={},d={};Object.defineProperty(d,"__esModule",{value:!0});d.getWebswingApiFactory=d.getWebswingApi=void 0;const l=new Map,c=(Math.random()+1).toString(36).substring(7),b=self.__webswing_api_module__=self.__webswing_api_module__||{api:{}},g=b.api=b.api||{};function _(e,i){return f(e).then(r=>r.createWebswingApi(i))}d.getWebswingApi=_;function f(e){return e=h(e),W(e).then(i=>g[i]?g[i](e):new Promise((r,n)=>{const t=e+"javascript/webswing-embed.js?version="+i;y(t,s=>{v(s)?s.type==="error"?n("Failed to load script at "+t):g[i]?r(g[i](e)):n("Failed to load webswingApi due to unexpected or missing version. Expected version["+i+"], loaded versions ["+Object.keys(g).join(",")+"]"):n("Failed to load "+e+"/javascript/webswing-embed.js due to "+s)},i)}))}d.getWebswingApiFactory=f;function h(e){return e.endsWith("/")?e:e+"/"}function W(e){var i=e+"rest/version";return fetch(i).then(r=>r.text()).catch(r=>(console.error("Failed to resolve version from url "+i),"undefined"))}function v(e){return e.type!==void 0}const y=(e,i,r)=>{const n=l.get(e);if(n!=null){n.push(i);return}let t,s=!1;if(r!==void 0){let u=document.getElementsByTagName("script");for(let a=0;a<u.length;a++){let o=u[a];if(o.getAttribute("src")==e||o.getAttribute("data-webswing-script")==c+r){t=o;break}}}t||(s=!0,t=document.createElement("script"),t.setAttribute("data-webswing-script",c+r),t.src=e),l.set(e,[i]);var p=(u,a)=>{if(t){t.onerror=t.onload=null,clearTimeout(w);var o=l.get(e);if(l.delete(e),t.parentNode&&t.parentNode.removeChild(t),o&&o.forEach(m=>m(a)),u)return u.apply(t,a)}},w=setTimeout(p.bind(t,null,"timeout"),12e4);t.onerror=p.bind(t,t.onerror),t.onload=p.bind(t,t.onload),s&&document.head.appendChild(t)};(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.getWebswingApiFactory=e.getWebswingApi=void 0;var i=d;Object.defineProperty(e,"getWebswingApi",{enumerable:!0,get:function(){return i.getWebswingApi}}),Object.defineProperty(e,"getWebswingApiFactory",{enumerable:!0,get:function(){return i.getWebswingApiFactory}})})(A);const F=e=>{e=e.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");var i=new RegExp("[\\?&]"+e+"=([^&#]*)").exec(location.href);return i==null?null:decodeURIComponent(i[1])};export{A as d,F as g};
//# sourceMappingURL=utils-09aa2f1a.js.map