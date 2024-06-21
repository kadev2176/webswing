var y=Object.defineProperty;var I=(d,e,n)=>e in d?y(d,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):d[e]=n;var o=(d,e,n)=>(I(d,typeof e!="symbol"?e+"":e,n),n);import"./webswing-webcomponents-e5184f77.js";import{d as S,g as C}from"./utils-09aa2f1a.js";class v{constructor(e){o(this,"parent");o(this,"args");o(this,"connectionUrl");o(this,"elementSelectedTab");o(this,"elementIntro");o(this,"elementToast");o(this,"elementTabs");o(this,"elementCreateForm");o(this,"elementEditForm");o(this,"elementModalEditItem");o(this,"elementModalCreateItem");o(this,"elementWebswingRoot");o(this,"_webswingInstance");o(this,"getServerUrl",()=>{const e=window.location.href;return e.substring(0,e.indexOf("/migration-examples"))+"/migration-examples"});o(this,"webswingInit",e=>{S.getWebswingApi(this.connectionUrl).then(n=>{this.webswingInstance=n.bootstrap(this.elementWebswingRoot,{connectionUrl:this.connectionUrl,autoStart:!1,args:this.args,debugPort:Number(C("debugPort")),compositingWindowsListener:{windowOpened:t=>{var h,i;if(t.htmlWindow&&t.name=="map"&&((h=t.element)==null?void 0:h.children.length)==0){var s=document.createElement("ws-map");s.style.backgroundColor="#dff6ff",s.style.border="1px solid #00a0db",s.style.display="block",s.style.width="100%",s.style.height="100%",t.element.style.padding="0.5rem",t.element.appendChild(s),s.addEventListener("click",r=>{const l=r.composedPath()[0].getAttribute("data-name");l&&t.performAction({actionName:"filterString",data:l})}),t.handleActionEvent=(r,l)=>{var c;r==="updateMapSelection"&&((c=document.querySelector("ws-map"))==null||c.setAttribute("active",String(l)))}}else if(t.htmlWindow&&t.name=="youtubeIframe"&&((i=t.element)==null?void 0:i.children.length)==0){var a=document.createElement("iframe");a.src="https://www.youtube.com/embed/rBHBlICJMcU",a.width="100%",a.height="400",a.setAttribute("frameborder","0"),a.setAttribute("allow","accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"),t.element.appendChild(a),t.element.style.overflow="hidden",t.element.style.margin="10px auto"}},windowOpening:t=>{},windowClosing:(t,s)=>{t.name=="youtubeIframe"&&s.preventDefault(),t.name=="map"&&s.preventDefault()},windowClosed:t=>{}},onReady:()=>{var t;this.elementWebswingRoot.classList.add("authenticated"),(t=this.webswingInstance)==null||t.start()},onStart:()=>{e&&e()}},t=>{t.services.dialog.content.continueOldSessionDialog=null,t.services.base.handleActionEvent=(s,a)=>{var h;if(s==="initialize"&&((h=this.webswingInstance)==null||h.performAction({actionName:"switchStage",data:"3"})),s==="clickedAddButton"){const i=this.elementModalCreateItem,r=this.elementCreateForm,l=this.elementToast;if(i.header="Create Nobel prize winner record",i.show=!0,a){const{categoryList:b,countryList:m}=JSON.parse(a);r.categories=b,r.countries=m}const c=b=>{var m;if(i.removeEventListener("close",c),b.detail==="ok"){const w=JSON.stringify(r.data);(m=this.webswingInstance)==null||m.performAction({actionName:"createItem",data:w}),l.show("Record has been created sucessfuly")}};i.addEventListener("close",c)}if(s==="editWinner"){const i=this.elementModalEditItem,r=this.elementEditForm,l=this.elementToast;if(i.header="Edit Nobel prize winner record",i.show=!0,a){const{categoryList:c,countryList:b,nobelPrizeWinner:m,row:w}=JSON.parse(a);r.categories=c,r.countries=b,r.data=m;const u=p=>{var g;if(i.removeEventListener("close",u),p.detail==="ok"){r.data.row=w;const f=JSON.stringify(r.data);(g=this.webswingInstance)==null||g.performAction({actionName:"editItem",data:f}),l.show("Record has been updated sucessfuly")}};i.addEventListener("close",u)}}if(s==="openWinnerTab"){const i=JSON.parse(a);this.createDetailClosableTab(i)}}})}).catch(n=>{console.error(n)})});this.parent=e,this.args="",this.connectionUrl=this.getServerUrl(),this.elementSelectedTab=e.querySelector('ws-tab[selected="true"]'),this.elementIntro=e.querySelector("ws-intro"),this.elementToast=e.querySelector("ws-toast"),this.elementTabs=e.querySelector("ws-tabs"),this.elementCreateForm=e.querySelector('ws-detail-form[data-id="createForm"]'),this.elementEditForm=e.querySelector('ws-detail-form[data-id="editForm"]'),this.elementModalEditItem=e.querySelector('ws-modal[data-id="editRecord"]'),this.elementModalCreateItem=e.querySelector('ws-modal[data-id="createRecord"]'),this.elementWebswingRoot=e.querySelector('[data-id="webswing-table"]'),this.webswingInit(),this.uiIntro()}get webswingInstance(){return this._webswingInstance}set webswingInstance(e){this._webswingInstance=e}createDetailClosableTab(e){const n=document.createElement("ws-tab"),t=document.createElement("ws-detail-form"),s=this.elementTabs;n.label=e.name,this.elementTabs.appendChild(n),n.appendChild(t),s.selectTab(n),n.closable=!0,t.data=e,t.readonly=!0}uiIntro(){this.elementIntro.addEventListener("introClick",()=>{const e=this.elementTabs,n=this.parent.querySelectorAll("ws-tab")[1];e.selectTab(n)})}}new v(document.body);
//# sourceMappingURL=stage3-e4e933f6.js.map
