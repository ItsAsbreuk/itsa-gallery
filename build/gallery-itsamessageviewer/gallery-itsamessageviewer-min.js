YUI.add("gallery-itsamessageviewer",function(e,t){"use strict";function z(){z.superclass.constructor.apply(this,arguments)}var n=e.Array,r=e.ITSAMessageController,i="essage",s="m"+i,o="modelsync",u="status",a="mail",f=5e3,l="_processing",c="error",h="warn",p="info",d="level",v="target",m="_suspended",g="new"+s,y="destroyed",b="priority",w="levelclear",E="timeoutResolve",S="timeoutReject",x="get",T="show",N="remove",C="Confirmation",k=x+"Retry"+C,L=x+C,A=x+"Input",O=x+"Number",M=x+"E"+a,_=x+"URL",D=T+"M"+i,P=T+"Warning",H=T+"Error",B="Status",j=T+B,F=N+B,I="_",q=I+u+"M"+i,R="itsadialog",U={info:!0,warn:!0,error:!0};z.NAME="itsamessageviewer",e.extend(z,e.Base),z.prototype.initializer=function(){var t=this;t.simpleMessages=!1,t.statusMessages=!0,t._lastMessage={},t._viewName=e.guid(),r.addTarget(t),e.later(f,e,e.usePromise,["gallerycss-itsa-base","gallerycss-itsa-animatespin","gallerycss-itsa-form"]),t._processQueue(p),t._processQueue(h),t._processQueue(c)},z.prototype.countMessages=function(e,t){var i=this,s=r.queue,a=i._viewName,f=i.simpleMessages,m=0,g,y,b,w,E,S,x;return w=function(t){var i=0,c=r._targets[t]===a,h=r._simpleTargets[t]===a,p=r._targets[u]===a,m=r._targets[o]===a;return n.each(s,function(n){y=n._simpleMessage,E=n.source,x=n[v]&&n[v]._viewName,S=h&&!n[q]||n[q]&&(p&&E!==o||m&&E===o),g=x===a&&(!f||y)||!x&&(y?S:c),b=g&&n[d]===t&&(e||!n[l]),b&&i++}),i},(t===p||!t)&&(m+=w(p)),(t===h||!t)&&(m+=w(h)),(t===c||!t)&&(m+=w(c)),m},z.prototype.handleLevel=function(e){var t=this._viewName;U[e]&&(r._simpleTargets[e]=t,this.simpleMessages||(r._targets[e]=t))},z.prototype.handleStatus=function(){r._targets[u]=this._viewName},z.prototype.handleModelSync=function(){r._targets[o]=this._viewName,r._setupModelSyncListeners()},z.prototype.resurrect=function(){},z.prototype[D]=function(e,t,n){var i=r._retrieveParams(e,t,n);return i.config.target=this,r[I+D](i.title,i.message,i.config)},z.prototype[P]=function(e,t,n){var i=r._retrieveParams(e,t,n);return i.config.target=this,r[I+P](i.title,i.message,i.config)},z.prototype[H]=function(e,t,n){var i=r._retrieveParams(e,t,n);return i.config.target=this,r[I+H](i.title,i.message,i.config)},z.prototype[j]=function(e,t){var n=r._retrieveParams(null,e,t);return n.config.target=this,r[I+j](n.message,n.config)},z.prototype[F]=function(e){r[I+F](e)},z.prototype.suspend=function(){},z.prototype.viewMessage=function(){},z.prototype.destructor=function(){var e=this,t=e._viewName,n=r._targets,i=r._simpleTargets;r.removeTarget(e),n[p]===t&&(n[p]=R),n[h]===t&&(n[h]=R),n[c]===t&&(n[c]=R),i[p]===t&&(i[p]=R),i[h]===t&&(i[h]=R),i[c]===t&&(i[c]=R),e._lastMessage={}},z.prototype._nextMessagePromise=function(t){var i=this;return r.isReady().then(function(){return new e.Promise(function(s,a){var f=r.queue,E=i._viewName,S=i.simpleMessages,x=r._targets[t]===E,T=r._simpleTargets[t]===E,N=r._targets[u]===E,C=r._targets[o]===E,k,L,A,O,M,_,D,P,H;i.get(y)&&a(),n.some(f,function(e){return _=e._simpleMessage,D=e.source,H=e[v]&&e[v]._viewName,P=T&&!e[q]||e[q]&&(N&&D!==o||C&&D===o),M=H===E&&(!S||_)||!H&&(_?P:x),k=M&&e[d]===t&&e[b]&&!e[l]&&e,k}),k||n.some(f,function(e){return _=e._simpleMessage,D=e.source,H=e[v]&&e[v]._viewName,P=T&&!e[q]||e[q]&&(N&&D!==o||C&&D===o),M=H===E&&(!S||_)||!H&&(_?P:x),k=M&&e[d]===t&&!e[b]&&!e[l]&&e,k}),k?(i._lastMessage[t]=k,(A=i._lastMessage[p])&&(t!==p||i._lastMessage[h]||i._lastMessage[c])&&(A[m]=!0)&&i._suspend(A),(A=i._lastMessage[h])&&(t===c||i._lastMessage[c])&&(A[m]=!0)&&i._suspend(A),s(k)):(t===c?A=i._lastMessage[h]||i._lastMessage[p]:t===h&&!i._lastMessage[c]&&(A=i._lastMessage[p]),A&&A[m]&&(A[m]=!1,i._resurrect(A)),i._lastMessage[t]=null,t!==p&&i.fire(w),O=i.once("destroy",a),L=e.after(g,function(e){var n=e.itsamessage;_=n._simpleMessage,D=n.source,H=n[v]&&n[v]._viewName,P=T&&!n[q]||n[q]&&(N&&D!==o||C&&D===o),M=H===E&&(!S||_)||!H&&(_?P:x),M&&n[d]===t&&(L.detach(),O.detach(),i._lastMessage[t]=n,(A=i._lastMessage[p])&&(t!==p||i._lastMessage[h]||i._lastMessage[c])&&(A[m]=!0)&&i._suspend(A),(A=i._lastMessage[h])&&(t===c||i._lastMessage[c])&&(A[m]=!0)&&i._suspend(A),s(n))}))})}).then(function(n){var r=t===c||!i._lastMessage[c]&&(t===h||!i._lastMessage[h]);return r?n:new e.Promise(function(e){var s=i.on(w,function(){r=!i._lastMessage[c]&&(t===h||!i._lastMessage[h]),r&&s.detach()&&e(n)})})})},z.prototype._processQueue=function(e){var t=this,n,r;n=function(){return t._nextMessagePromise(e).then(function(e){return e[l]=!0,(e[E]||e[S])&&e._startTimer(),t._viewMessage(e)}).then(null,function(e){})},r=function(){return t.get(y)||n().then(r,r)},r()},z.prototype._resurrect=function(e){var t=this;e.get(y)||((e[E]||e[S])&&e._startTimer(),r.sound(e),t.resurrect(e))},z.prototype._suspend=function(e){var t=this;(e[E]||e[S])&&e._stopTimer(),t.suspend(e)},z.prototype._viewMessage=function(e){return r.sound(e),this.viewMessage(e)},e.ITSAMessageViewer=z,e[k]=e.bind(r[I+k],r),e.confirm=e[L]=e.bind(r[I+L],r),e[_]=e.bind(r[I+_],r),e[M]=e.bind(r[I+M],r),e.prompt=e[A]=e.bind(r[I+A],r),e[O]=e.bind(r[I+O],r),e[F]=e.bind(r[I+F],r),e[D]=e.bind(r[I+D],r),e.alert=e[P]=e.bind(r[I+P],r),e[H]=e.bind(r[I+H],r),e[j]=e.bind(r[I+j],r)},"@VERSION@",{requires:["yui-base","base-base","yui-later","timers","promise","gallery-itsamodulesloadedpromise","gallery-itsamessagecontroller"]});
