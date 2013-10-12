YUI.add("gallery-itsamessagecontroller",function(e,t){"use strict";function B(){B.superclass.constructor.apply(this,arguments)}var n,r,i=e.Array,s="application",o="error",u="info",a="warn",f="essage",l="m"+f,c=5e3,h="_pub_",p="new"+l,d=h+p,v=p+"_added",m=h+v,g="gallery-itsamessage",y="get",b="show",w="Date",E="Time",S="Confirmation",x=y+"Retry"+S,T=y+S,N=y+"Input",C=y+"Number",k=y+w,L=y+E,A=k+E,O=b+"M"+f,M=b+"Warning",_=b+"Error",D=b+"Status",P="_",H="base-build";B.NAME="itsamessagecontroller",e.extend(B,e.Base),B.prototype.initializer=function(){var t=this;t.queue=[],e.later(c,t,t.readyPromise)},B.prototype.readyPromise=function(){var t=this;return t._readyPromise||(t._readyPromise=e.usePromise(g))},B.prototype[P+x]=function(e,t,n){return this._queueMessage(e,t,n,"{btn_abort}{btn_ignore}{btn_retry}","btn_retry","btn_abort",x,u)},B.prototype[P+T]=function(e,t,n){return this._queueMessage(e,t,n,"{btn_no}{btn_yes}","btn_yes","btn_no",T,u)},B.prototype[P+N]=function(t,n,i){console.log("_getInput");var s=this,o=typeof n=="string";return o||(i=n,n=t,t=null),s.readyPromise().then(function(){return e.usePromise(H)}).then(function(){return console.log("_getInput continue"),r||(r=e.Base.create("itsamessageinput",e.ITSAMessage,[],{},{ATTRS:{input:{formtype:"number",formconfig:i.formconfig}}})),n+='<form class="pure-form"><fieldset><div class="pure-control-group">{input}</div></fieldset></form>',s._queueMessage(t,n,i,"{btn_cancel}{btn_ok}","btn_ok","btn_cancel",N,u,r)})},B.prototype[P+C]=function(e,t,n){return this._queueMessage(e,t,n,"{btn_cancel}{btn_ok}","btn_ok","btn_cancel",C,u)},B.prototype[P+k]=function(e,t,n){return this._queueMessage(e,t,n,"{btn_cancel}{btn_ok}","btn_ok","btn_cancel",k,u)},B.prototype[P+L]=function(e,t,n){return this._queueMessage(e,t,n,"{btn_cancel}{btn_ok}","btn_ok","btn_cancel",L,u)},B.prototype[P+A]=function(e,t,n){return this._queueMessage(e,t,n,"{btn_cancel}{btn_ok}","btn_ok","btn_cancel",A,u)},B.prototype[P+O]=function(e,t,n){return this._queueMessage(e,t,n,"{btn_ok}","btn_ok",null,O,u)},B.prototype[P+M]=function(e,t,n){return this._queueMessage(e,t,n,"{btn_ok}","btn_ok",null,M,a)},B.prototype[P+_]=function(e,t,n){return this._queueMessage(e,t,n,"{btn_ok}","btn_ok",null,_,o)},B.prototype[P+D]=function(t,n,r){var i=this,o=typeof n=="string",a;return o||(r=n,n=t,t=null),a=e.merge(r,{title:t,message:n,footer:null,noButtons:!0,source:s,type:D,level:u}),i.readyPromise().then(function(){var t=new e.ITSAMessage(a);return i.queueMessage(t),t})},B.prototype.queueMessage=function(t){console.log("queueMessage "+t.get("message"));var n=this,r=t.get("autoDestroy"),i,s,o;return i=new e.Promise(function(e,t){s=e,o=t}),t||(t={}),t.promise=i,t.resolvePromise=s,t.rejectPromise=o,t.setLifeUpdate(!0),n[d]||(n[d]=e._publishAsync(p,{defaultTargetOnly:!0,emitFacade:!0,broadcast:2,defaultFn:e.rbind(n._defQueueFn,n),preventedFn:n._prevDefFn})),r>0&&t.promise.then(e.bind(n._autoDestroyMsg,n,t,r),e.bind(n._autoDestroyMsg,n,t,r)),e.fire(p,{model:t}),console.log("fireing "+p),i},B.prototype.destructor=function(){var t=this,n=t.queue;t.removeTarget(e),i.each(n,function(e){e.destroy()}),n.length=0},B.prototype._autoDestroyMsg=function(t,n){e.later(n,null,function(){console.log("DESTROYING "+t.get("title")),t.destroy(),t=null})},B.prototype._prevDefFn=function(e){e.message.promiseReject(new Error("preventDefaulted"))},B.prototype._defQueueFn=function(t){console.log("_defQueueFn "+t.model.get("message"));var n=this,r=t.model,i=n.queue;return i.push(r),n[m]||(n[m]=e.publish(v,{defaultTargetOnly:!0,broadcast:2,emitFacade:!0})),console.log("fireing "+v),e.fire(v,{model:r}),r.promise.then(null,function(){return!0}).then(function(){var e=i.indexOf(r);e>-1&&i.splice(e,1)})},B.prototype._queueMessage=function(t,n,r,i,o,u,a,f,l){console.log("_queueMessage "+t);var c=this,h=typeof n=="string",p,d;return h||(r=n,n=t,t=null),d=r&&typeof r.imageButtons=="boolean"&&r.imageButtons,d&&(i=i.replace(/\{btn_/g,"{imgbtn_"),o&&(o=o.replace(/btn_/g,"imgbtn_"))),p=e.merge(r,{title:t,message:n,footer:i,source:s,primaryButton:o,rejectButton:u,type:a,level:f}),r.level&&(p.level=r.level),r.primaryButton&&(p.primaryButton=r.primaryButton),p.level||(p.level=r.type),c.readyPromise().then(function(){return c.queueMessage(l?new l(p):new e.ITSAMessage(p))})},e._publishAsync=function(t,n){var r=this,i=this.publish(t,n);i._firing=new e.Promise(function(e){e()}),i.fire=function(t){var n=e.Array(arguments,0,!0),s={id:i.id,next:i,silent:i.silent,stopped:0,prevented:0,bubbling:null,type:i.type,defaultTargetOnly:i.defaultTargetOnly},o;i._firing=i._firing.then(function(){i.details=n;var e=i._subscribers,u=[],a,f,l;u.push.apply(u,t),a=i._createFacade(u),a.target=a.target||r;if(e)for(f=0,l=e.length;f<l;++f)try{e[f].fn.call(e[f].context,a)}catch(c){}return i.bubbles&&!i.stopped&&(r.bubble(i,n,null,s),a.prevented=Math.max(a.prevented,s.prevented)),a.prevented?i.preventedFn.call(r,a).then(null,function(e){return!1}):i.defaultFn.call(r,a).then(function(){e=i._afters;if(e)for(f=0,l=e.length;f<l;++f)try{e[f].fn.call(e[f].context,a)}catch(t){}if(s.afterQueue)while(o=s.afterQueue.last())o()}).then(null,function(e){return!1})})},i._fire=function(e){return i.fire(e[0])}},e.Global.ITSAMessageController||(e.Global.ITSAMessageController=new B),n=e.ITSAMessageController=e.Global.ITSAMessageController,e[x]=e.bind(n[P+x],n),e[N]=e.bind(n[P+N],n),e[C]=e.bind(n[P+C],n),e[k]=e.bind(n[P+k],n),e[L]=e.bind(n[P+L],n),e[A]=e.bind(n[P+A],n),e[O]=e.bind(n[P+O],n),e[M]=e.bind(n[P+M],n),e[_]=e.bind(n[P+_],n),e[D]=e.bind(n[P+D],n)},"@VERSION@",{requires:["yui-base","oop","base-base","event-custom-complex","promise","gallery-itsamodulesloadedpromise"]});
