YUI.add("gallery-itsamessageviewer",function(e,t){"use strict";function p(){p.superclass.constructor.apply(this,arguments)}var n=e.Array,r="message",i=5e3,s="new"+r,o="processing",u="error",a="warn",f="info",l="level",c="suspended",h=s+"_added";p.NAME="itsamessageviewer",e.extend(p,e.Base,{},{NAME:"itsamessageviewer",ATTRS:{handleAnonymous:{value:!1,validator:function(e){return typeof e=="boolean"}},interrupt:{value:!0,validator:function(e){return typeof e=="boolean"}}}}),p.prototype.initializer=function(){var t=this;e.ITSAMessageController.addTarget(t),e.later(i,e,e.usePromise,"gallerycss-itsa-form"),e.soon(e.bind(t._processQueue,t)),t.get("interrupt")&&(t.interruptHandler=e.on(h,function(e){var n=e.model,r=t._lastMessage,i=n.get(l),s=r&&r.get(l);s&&s!==i&&(i===u||s===f)&&(console.log("going to interupt "+s),r._set(c,!0),t.suspend(s),t._lastMessage=n,t._processQueue())}))},p.prototype._processQueue=function(t){var n=this,r,i,s;console.log("_processQueue started"),r=function(){return console.log("handlePromise"),n._nextMessagePromise().then(function(e){console.log("handlePromise of message "+e.get("title"));if(e.get(c))throw e._set(c,!1),n.resurrect(e.get(l)),new Error("promiseloop ended because of resurrection");return e._set(o,!0),n.viewMessage(e)})},i=function(){return r().then(i)},s=function(t){var n=new e.Promise(function(e){e(t)});return n.then(i)},t?s(t):i(t)},p.prototype.viewMessage=function(){console.log("viewMessage itsamessageviewer")},p.prototype.suspend=function(){},p.prototype.resurrect=function(){},p.prototype._nextMessagePromise=function(){var t=this,r=e.ITSAMessageController;return r.readyPromise().then(function(){return new e.Promise(function(i,s){t.get("destroyed")&&s(),t.once("destroy",s);var f=r.queue,p=t.get("handleAnonymous"),d=t.constructor.NAME,v,m;n.some(f,function(e){return v=(p||e.target===d)&&e.get(l)===u&&(!e.get(o)||e.get(c))&&e,v}),v||n.some(f,function(e){return v=(p||e.target===d)&&e.get(l)===a&&(!e.get(o)||e.get(c))&&e,v}),v||n.some(f,function(e){return v=(p||e.target===d)&&(!e.get(o)||e.get(c))&&e,v}),v?(t._lastMessage=v)&&i(v):m=e.on(h,function(e){console.log("event caught: "+e.type);var n=e.model;if(p||n.target===d)console.log("event HANDLED!"),t._lastMessage=n,i(n),m.detach()})})})},p.prototype.destructor=function(){var t=this;e.ITSAMessageController.removeTarget(t),t.interruptHandler&&t.interruptHandler.detach()},e.ITSAMessageViewer=p},"@VERSION@",{requires:["yui-base","yui-later","timers","promise","gallery-itsamodulesloadedpromise","gallery-itsamessagecontroller"]});