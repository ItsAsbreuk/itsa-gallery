YUI.add("gallery-itsadialog",function(e,t){"use strict";function l(){l.superclass.constructor.apply(this,arguments)}var n=e.Array,r=5e3,i="model",s="title",o="footer",u="info",a="warn",f="error";l.NAME="itsadialog",e.extend(l,e.ITSAMessageViewer),l.prototype.initializer=function(){var t=this;t._eventhandlers=[],e.later(r,t,t.renderPromise)},l.prototype.renderPromise=function(){var t=this;return t._renderPromise||(t._renderPromise=e.usePromise("gallery-itsaviewmodelpanel").then(e.bind(t._renderPanels,t)))},l.prototype._renderPanels=function(){var t={artist:"U2",country:"Ireland"},n="name: {artist}<br />country: {country}",r=this,s={visible:!1,centered:!0,modal:!0,dragable:!0,title:"sometitle",model:t,template:n},o=r._eventhandlers,l;l=r.panels={},l[u]=new e.ITSAViewModelPanel(s),l[a]=new e.ITSAViewModelPanel(s),l[f]=new e.ITSAViewModelPanel(s),o.push(l[u].on("*:hide",function(e){var t=e.target,n=t.get(i);n.resolvePromise()})),o.push(l[a].on("*:hide",function(e){var t=e.target,n=t.get(i);n.resolvePromise()})),o.push(l[f].on("*:hide",function(e){var t=e.target,n=t.get(i);n.resolvePromise()})),l[u].render(),l[a].render(),l[f].render(),l[u].set("title","newtitle")},l.prototype.viewMessage=function(e){var t=this;t.renderPromise().then(function(){var n=u,r=t.panels,i=r[n];r[u].hide(),r[a].hide(),r[f].hide(),i=r[n],i.set("template",e.get("message")),i.set(o+"Template",e.get(o)),console.log("checking 1 --> "+i.get(s)),console.log("checking 2 --> "+i.get(s)),console.log("checking 1 --> "+i.get(s)),i.show(),i.set("title","test2")})},l.prototype.destructor=function(){var e=this.panels;this._clearEventhandlers(),e[u].destroy(),e[a].destroy(),e[f].destroy()},l.prototype._clearEventhandlers=function(){var e=this;n.each(e._eventhandlers,function(e){e.detach()})},YUI.Env.ITSADialog=new l({handleAnonymous:!0})},"@VERSION@",{requires:["yui-base","promise","event-custom-base","yui-later","oop","gallery-itsamodulesloadedpromise","gallery-itsamessageviewer","gallery-itsaviewmodelpanel"]});
