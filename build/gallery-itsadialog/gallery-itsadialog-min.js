YUI.add("gallery-itsadialog",function(e,t){"use strict";function h(){h.superclass.constructor.apply(this,arguments)}var n=e.Array,r=e.Lang,i=5e3,s="model",o="title",u="footer",a="info",f="warn",l="error",c="value";h.NAME="itsadialog",e.extend(h,e.ITSAMessageViewer),h.prototype.initializer=function(){var t=this;t._eventhandlers=[],e.later(i,t,t.renderPromise)},h.prototype.renderPromise=function(){var t=this;return t._renderPromise||(t._renderPromise=e.usePromise("gallery-itsaviewmodelpanel").then(e.bind(t._renderPanels,t)))},h.prototype._renderPanels=function(){var t=this,n={visible:!1,centered:!0,modal:!0,minWidth:200,dragable:!0},r=t._eventhandlers,i;i=t.panels={},i[a]=new e.ITSAViewModelPanel(n),i[f]=new e.ITSAViewModelPanel(n),i[l]=new e.ITSAViewModelPanel(n),r.push(i[a].on("*:hide",function(e){var t=e.target,n=t.get(s),r=e.buttonNode,i=r&&r.get(c),o=n.get("rejectButton"),u=o&&(new RegExp("btn_"+i+"$")).test(o);u?n.rejectPromise(i):n.resolvePromise(i)})),r.push(i[f].on("*:hide",function(e){var t=e.target,n=t.get(s),r=e.buttonNode,i=r&&r.get(c),o=n.get("rejectButton"),u=o&&(new RegExp("btn_"+i+"$")).test(o);u?n.rejectPromise(i):n.resolvePromise(i)})),r.push(i[l].on("*:hide",function(e){var t=e.target,n=t.get(s),r=e.buttonNode,i=r&&r.get(c),o=n.get("rejectButton"),u=o&&(new RegExp("btn_"+i+"$")).test(o);u?n.rejectPromise(i):n.resolvePromise(i)})),i[a].render(),i[f].render(),i[l].render()},h.prototype.viewMessage=function(t){var n=this;return n.renderPromise().then(function(){return new e.Promise(function(i){var c=t.get("level"),h=t.get("primaryButton"),p=n.panels,d=p[c],v=t.get("noButtons"),m=t.get(u),g=/btn_/.test(m),y,b;p[a].hide(),p[f].hide(),console.log("check noButtons "+v),console.log("GOING TO HIDE ALL PANELS "+t.get("title")+" needs to show"),p[l].hide(),d=p[c],d.set(o+"Right",g||v?"":null),d.set("template",t.get("message")),d.set(u+"Template",v?null:m),!v&&m&&r.isValue(h)&&(y=d.get("footerView"),b=typeof h=="boolean"&&!h,b?y.removePrimaryButton():y.setPrimaryButton(h)),d.set(s,t),d.set(o,t.get(o)),t.promise.then(e.bind(i,null,t),e.bind(i,null,t)),console.log("SHOWING PANEL "+c),d.show(),console.log("PANEL "+c+" is shown "+d.get("visible")),e.later(5e3,null,function(){console.log("RETRY PANEL "+c+" is shown "+d.get("visible"))})})})},h.prototype.resurrect=function(e){var t=this;t.renderPromise().then(function(){var n=t.panels[e];n&&n.show()})},h.prototype.destructor=function(){var e=this.panels;this._clearEventhandlers(),e[a].destroy(),e[f].destroy(),e[l].destroy()},h.prototype._clearEventhandlers=function(){var e=this;n.each(e._eventhandlers,function(e){e.detach()})},e.Global.ITSADialog||(e.Global.ITSADialog=new h({handleAnonymous:!0})),e.ITSADialog=e.Global.ITSADialog},"@VERSION@",{requires:["yui-base","promise","event-custom-base","yui-later","oop","gallery-itsaviewmodelpanel","gallery-itsamodulesloadedpromise","gallery-itsamessageviewer"]});
