class PJAX{constructor(e,t){this.isSupported()||(this.isDisabled=!0),this.srcElements=this.toDOM(e),this.hostname=window.location.hostname,"string"!=typeof t?(this.container=t,this.containerID=this.container.getAttribute("ID")):(this.containerID=t,this.container=this.toDOM(t)),this.stack=[],this.uid="uid",this.isDisabled=!1,this.middlewares=[],this.setupEvents(this.srcElements)}setupEvents(e){for(const t of e){let e=t.getAttribute("href");this.isInternal(t)&&t.addEventListener("click",t=>{if(this.isDisabled)return;t.preventDefault();const s={meta:{uid:this.uid},request:{url:e,headers:{"X-PJAX":"TRUE"}}};this.useMiddlewares(s)})}}useMiddlewares(e){for(const t of this.middlewares)e=t(e)}request(e){if(!e.request.url)throw Error("PJAX.request: request url not found!");return e.request.headers=new Headers(e.request.headers),e.request._request=new Request(e.request.url,e.request),e.response=fetch(e.request._request),e}parse(e){if(!e.response)throw Error("PJAX.parse: context.response is false or not found!");let t=new DOMParser;return e.dom=t.parseFromString(e.response.text(),"text/html"),e}mount(e){if(!e.dom)throw Error("PJAX.mount: context.dom not found!");let t=e.dom.querySelector(this.containerID);return this.container.innerHTML=t.innerHTML,e}isInternal(e){return console.log(e.host),e.host===window.location.host}use(e){return this.middlewares.push(e),this}toDOM(e){return e instanceof NodeList?e:e instanceof Element?[e]:"string"==typeof e?document.querySelectorAll(e):void console.error("PJAX.toDOM: selector should be a DOM element or string")}isSupported(){return history&&history.pushState}}