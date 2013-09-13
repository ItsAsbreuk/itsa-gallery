YUI.add("gallery-itsaformmodel",function(e,t){"use strict";var n=e.Array,r=e.Object,i=e.Node,s=e.Lang,o=e.ITSAFormElement,u="Notification:",a="Data has been changed outside the form.<br />Load it into the form? (if not, then the data will be reset to the current form-values)",f="Data has been changed outside the form.<br />Load it into the form?",l="UNDEFINED FORM-ELEMENT",c="itsa-invisible",h='<span style="background-color:F00; color:#FFF">DUPLICATED FORMELEMENT is not allowed</span>',p=1e4,d=1728e5,v=864e5,m="true",g='i[class^="itsaicon-"], i[class*=" itsaicon-"]',y="itsa-busy",b="itsaicon-form-loading",w="data-spinbusy",E="disabled",S="was-"+E,x="button",T="pure-"+x+"-"+E,N="-before",C='span[data-for="',k="yui3-slider",L="itsabutton-asktoclick",A={button:!0,destroy:!0,remove:!0,reset:!0,save:!0,submit:!0,load:!0},O="gallery-itsa",M="function",_="renderpromise",D="click",P="save",H="load",B="destroy",j="remove",F="submit",I="date",q="time",R=I+q,U="number",z="string",W="boolean",X="picker",V="data",$="value",J="type",K=V+"-"+x+"sub"+J,Q=V+"-"+x+J,G=V+"-modelattribute",Y="id",Z=V+"-content",et={text:!0,number:!0,password:!0,textarea:!0,email:!0,url:!0},tt="reset",nt="focusnext",rt="validationerror",it="uichanged",st=x+":"+D,ot=B+":"+D,ut=j+":"+D,at=F+":"+D,ft=tt+":"+D,lt=P+":"+D,ct=H+":"+D,ht=I+X+D,pt=q+X+D,dt=I+q+X+D,vt=e.ITSAFormModel=e.Base.create("itsaformmodel",e.Model,[],{},{_ATTR_CFG:["formtype","formconfig","validationerror"]});vt.prototype._widgetValueFields={},vt.prototype._allowedFormTypes={text:!0,number:!0,password:!0,textarea:!0,checkbox:!0,date:!0,time:!0,datetime:!0,email:!0,url:!0,plain:!0},vt.prototype._dateTimeTypes={date:!0,time:!0,datetime:!0},vt.prototype._datePickerClicks={datepickerclick:!0,timepickerclick:!0,datetimepickerclick:!0},vt.prototype.initializer=function(){var t=this;t._eventhandlers=[],t._FORM_elements={},t._ATTRS_nodes={},t._knownNodeIds={},t._lifeUpdate=!1,t._renderBtnFns={button:t.renderBtn,destroy:t.renderDestroyBtn,remove:t.renderRemoveBtn,reset:t.renderResetBtn,save:t.renderSaveBtn,load:t.renderLoadBtn,submit:t.renderSubmitBtn},t.publish(it,{defaultFn:e.bind(t._defFn_uichanged,t),emitFacade:!0}),t.publish(ot,{defaultFn:e.bind(t._defFn_destroy,t),emitFacade:!0}),t.publish(ut,{defaultFn:e.bind(t._defFn_remove,t),emitFacade:!0}),t.publish(at,{defaultFn:e.bind(t._defFn_submit,t),emitFacade:!0}),t.publish(ft,{defaultFn:e.bind(t._defFn_reset,t),emitFacade:!0}),t.publish(lt,{defaultFn:e.bind(t._defFn_save,t),emitFacade:!0}),t.publish(ct,{defaultFn:e.bind(t._defFn_load,t),emitFacade:!0}),t.publish(ht,{defaultFn:e.bind(t._defFn_changedate,t),emitFacade:!0}),t.publish(pt,{defaultFn:e.bind(t._defFn_changedate,t),emitFacade:!0}),t.publish(dt,{defaultFn:e.bind(t._defFn_changedate,t),emitFacade:!0}),t._bindUI(),t._gcTimer=e.later(v,t,t._garbageCollect,null,!0)},vt.prototype.crossValidation=function(){},vt.prototype.disableUI=function(){var t=this,n=t._FORM_elements;r.each(n,function(t,n){var r=e.one("#"+n),i=t.widget,s,o,u,a;r&&(i?(o=i.get(E),o||(i.disable(),i.getClassName()===k&&(u=e.one(C+n+'"]'),u&&u.setAttribute(E,E)))):(s=r.get("tagName")==="BUTTON"&&r.getAttribute(J)===x,a=r.getAttribute("data-datetimepicker")===m,o=r.get(E),s&&(o=o||r.hasClass(T),o||r.addClass(T)),o||r.setAttribute(E,E),r.setData(S,o),a&&(u=e.one(C+n+'"]'),u&&u.setAttribute(E,E))),o&&r.setData(N,!0))})},vt.prototype.enableUI=function(){var t=this,n=t._FORM_elements;r.each(n,function(t,n){var r=e.one("#"+n),i=t.widget,s,o,u,a;r&&(o=r.getData(N),o?r.clearData(N):i?(i.enable(),i.getClassName()===k&&(u=e.one(C+n+'"]'),u&&u.removeAttribute(E))):(s=r.get("tagName")==="BUTTON"&&r.getAttribute(J)===x,a=r.getAttribute("data-datetimepicker")===m,r.getData(S)||(r.removeAttribute(E),s&&r.removeClass(T)),r.clearData(S),a&&(u=e.one(C+n+'"]'),u&&u.removeAttribute(E))))})},vt.prototype.getCurrentFormElement=function(e){return this.getCurrentFormElements(e)[0]||null},vt.prototype.getCurrentFormElements=function(t){var i=this,s=i._ATTRS_nodes[t],o=[],u;return s?n.each(s,function(t){var n=e.one("#"+t);n&&(u=i._FORM_elements[t],u.node=n,o.push(u))}):r.each(i._FORM_elements,function(n){var r=e.one("#"+n.nodeid);r&&r.getAttribute("name")===t&&(n.node=r,o.push(n))}),o},vt.prototype.getUI=function(t){var n=this,r,i,o,u,a,f,l,c;return u=n._ATTRS_nodes[t],o=u&&u.length>0&&u[0],i=n._FORM_elements,r=o&&i[o],r&&(a=e.one("#"+o))&&a.getAttribute(G)&&(l=r.widget,c=r.type,f=l?n._getWidgetValue(l,c):a.get($),s.isValue(f)&&(n._dateTimeTypes[c]&&(f=new Date(parseInt(f,10))),c===U&&(f=r.config.digits?parseFloat(f):parseInt(f,10)))),f},vt.prototype.getUnvalidatedUI=function(){var t=this,i,o,u,a=[];return r.each(this._FORM_elements,function(n){n.widget||(i=e.one("#"+n.nodeid),i&&(o=t._validValue(i,n,n.name,i.get($)),t._setNodeValidation(i,o),o||a.push(i)))}),u=t.crossValidation(),s.isArray(u)&&u.length>0&&n.each(u,function(r){var i=r.attribute,s=i&&t._ATTRS_nodes[i];s&&n.each(s,function(n){var i=e.one("#"+n),s=r.validationerror,o;i&&(o=typeof s===z?s:null,t._setNodeValidation(i,!1,o),a.push(i))})}),new e.NodeList(a)},vt.prototype[j]=function(){this.fire(j)},vt.prototype.renderBtn=function(e,t){return this._renderBtn(e,t,x)},vt.prototype.renderDestroyBtn=function(e,t){return this._renderBtn(e,t,B)},vt.prototype.renderLoadBtn=function(e,t){return this._renderBtn(e,t,H)},vt.prototype.renderRemoveBtn=function(e,t){return this._renderBtn(e,t,j)},vt.prototype.renderResetBtn=function(e,t){return this._renderBtn(e,t,tt)},vt.prototype.renderSaveBtn=function(e,t){return this._renderBtn(e,t,P)},vt.prototype.renderSubmitBtn=function(e,t){return this._renderBtn(e,t,F)},vt.prototype.renderFormElement=function(t){var r=this,s=r._knownNodeIds,u,a,f,d,v,m,g,y,b,w,E,S,x,T;return u=r._FORM_elements,a=r._ATTRS_nodes,f=r.get(t),d=r._getAttrCfg(t),g=d.formtype||"text",S=typeof g===M&&g.NAME,S||r._allowedFormTypes[g]?(y=d.formconfig||{},y.value=f,S&&(b=r._getWidgetValueField(g),y.widgetconfig||(y.widgetconfig={}),x=typeof b!==z,x?n.each(b,function(
e){y.widgetconfig[e]=f}):y.widgetconfig[b]=f),y.modelattribute=!0,y.name=t,y.tooltipinvalid=d.validationerror,y.removerequired=!0,delete y.pattern,y.removepattern=!0,y.hideatstartup=!0,v=o.getElement(g,y),w=v.nodeid,u[w]=v,a[t]||(a[t]=[]),a[t].push(w),E=v.widget,E?(T=g.NAME==="editorBase",e.use(T?O+"editor"+_:O+"widget"+_,function(){E.renderPromise().then(function(){var t=e.one("#"+w);s[w]?t.insert(h,"replace"):(s[w]=!0,T&&t.removeClass(c),r._modelToUI(w),!T&&t.removeClass(c))})}),x?n.each(b,function(t){r._eventhandlers.push(E.after(t+"Change",function(t){var n=it,i={target:r,value:t.newVal,formElement:v,node:e.one("#"+w),nodeid:w,type:n};r.fire(n,i)}))}):r._eventhandlers.push(E.after(b+"Change",function(t){var n=it,i={target:r,value:t.newVal,formElement:v,node:e.one("#"+w),nodeid:w,type:n};r.fire(n,i)}))):i.availablePromise("#"+w,p).then(function(t){s[w]?t.insert(h,"replace"):(s[w]=!0,r._modelToUI(w),t.removeClass(c),r._dateTimeTypes[g]&&(t=e.one('span.formatvalue[data-for="'+w+'"]'),t&&t.removeClass(c)))},function(e){}),m=v.html,v.widget&&v.widget.addTarget(r)):m=l,m},vt.prototype.reset=function(){var e=this,t;e._internalChange=!0,e.constructor.superclass.constructor.superclass.reset.apply(e,arguments),arguments.length===0&&(e._internalChange=null,e._modelToUI(),e._removeValidation(),t={type:tt,target:e},e.fire(tt,t))},vt.prototype.setLifeUpdate=function(e){var t=this;return typeof e===W&&(t._lifeUpdate=e),t},vt.prototype.setResetAttrs=function(){var e=this,t=e.getAttrs();delete t.clientId,delete t.destroyed,delete t.initialized,e.idAttribute!==Y&&delete t.id,r.each(t,function(t,n){t&&e._state.add(n,"initValue",t)})},vt.prototype.setWidgetValueField=function(e,t){this._widgetValueFields[e]=t},vt.prototype[F]=function(){this.fire(F)},vt.prototype.toJSONUI=function(t){var i=this,o={},u=i.getAttrs(),a=i._renderBtnFns,f,l,c,h;return delete u.clientId,delete u.destroyed,delete u.initialized,i.idAttribute!==Y&&delete u.id,r.each(u,function(e,t){o[t]=i.renderFormElement(t)}),s.isObject(t)?(f=t.propertykey,l=t.type,c=t.labelHTML,h=t.config,f&&l&&a[l]&&(o[f]=e.bind(a[l],i,c,h)())):s.isArray(t)&&n.each(t,function(t){f=t.propertykey,l=t.type,c=t.labelHTML,h=t.config,f&&l&&a[l]&&(o[f]=e.bind(a[l],i,c,h)())}),o},vt.prototype.UIToModel=function(t){var n=this,i,o,u,a,f,l,c,h;o=n._FORM_elements,i=t&&o[t],i&&(a=e.one("#"+t))&&a.getAttribute(G)?(c=i.widget,h=i.type,f=c?n._getWidgetValue(c,h):a.get($),l=i.name,s.isValue(f)&&(u={formelement:!0},n._dateTimeTypes[h]&&(f=new Date(parseInt(f,10))),h===U&&(f=i.config.digits?parseFloat(f):parseInt(f,10)),n.set(l,f,u))):t||r.each(n._FORM_elements,function(e,t){n.UIToModel(t)})},vt.prototype.destructor=function(){var e=this;e._clearEventhandlers(),e._removeTargets(),e._FORM_elements={},e._ATTRS_nodes={},e._widgetValueFields={},e._knownNodeIds={},e._gcTimer.cancel()},vt.prototype._bindUI=function(){var t=this,n=t._eventhandlers,r=e.one("body");n.push(r.delegate([ht,pt,dt,st,ct,lt,ot,ut,at,ft],function(e){var n=e.type,r=e.target,i,s,o;t._FORM_elements[r.get(Y)]&&(e.preventDefault(),s=r.getAttribute($),t._datePickerClicks[n]&&(o=new Date,o.setTime(parseInt(s,10)),s=o),i={target:t,value:s,formElement:t._FORM_elements[r.get(Y)],buttonNode:r,type:n},t.fire(n,i))})),n.push(r.delegate("click",function(e){e.preventDefault()},".itsa-widget-parent")),n.push(r.delegate("valuechange",function(e){var n=e.target,r=it,i={target:t,value:n.get($),formElement:t._FORM_elements[n.get(Y)],node:n,nodeid:n.get(Y),type:r};t.fire(r,i)},function(e,n){return n&&n.target&&t._FORM_elements[n.target.get(Y)]})),n.push(t.after("*:change",function(n){!t._internalChange&&!n.formelement&&!n.fromInternal?e.use(O+"dialog",function(){t._lifeUpdate?e.confirm(u,a).then(e.bind(t._modelToUI,t,null),e.bind(t.UIToModel,t,null)):e.confirm(u,f).then(e.bind(t._modelToUI,t,null))}):n.fromInternal&&t._modelToUI()})),n.push(r.delegate("keypress",function(e){var n=nt,r={target:e.target,type:n};t.fire(n,r)},function(e,n){var r=t._FORM_elements[n.target.get(Y)];return r&&n.keyCode===13&&et[r.type]})),n.push(e.on(L,function(e){var n=e.buttonNode,r;t._FORM_elements[n.get("id")]&&(r=n.get("value"),t.fire((A[r]?r:x)+":click",{buttonNode:n,value:r}))}))},vt.prototype._clearEventhandlers=function(){n.each(this._eventhandlers,function(e){e.detach()})},vt.prototype._defFn_destroy=function(){this.destroyPromise()},vt.prototype._defFn_changedate=function(t){e.use(O+"datetimepicker",function(){var n=t.target,r=t.type,i=t.buttonNode,o=e.ItsaDateTimePicker,u=t.formElement,a=s.isDate(t.value)?t.value:new Date,f,l,c;r===ht?f=e.bind(o.getDate,o):r===pt?f=e.bind(o.getTime,o):r===dt&&(f=e.bind(o.getDateTime,o)),f(new Date(a),{alignToNode:i,modal:!0,forceSelectdate:!1}).then(function(e){l=u.config.format,n._updateDateTimeUI(u.name,e,r,l),n._lifeUpdate&&n.UIToModel(i.get(Y))},function(){return!0}).then(function(){var e=nt,t={target:i,type:e};i&&(i.removeAttribute(Z),i.focus(),c=i.getAttribute(V+"-contentvalid"),c&&i.setAttribute(Z,c)),n.fire(e,t)})})},vt.prototype._defFn_load=function(t){var n=this,r=t.buttonNode,i=r.one(g),s=i&&t.buttonNode.getAttribute(w)===m;n.disableUI(),s&&i.addClass(y).addClass(b),n.loadPromise({fromInternal:!0}).then(function(){n.setResetAttrs(),r=e.one("#"+r.get("id")),r&&(s&&i.removeClass(y).removeClass(b),n.enableUI())},function(){r=e.one("#"+r.get("id")),r&&(s&&i.removeClass(y).removeClass(b),n.enableUI())})},vt.prototype._defFn_remove=function(t){var n=this,r=t.buttonNode,i=r.one(g),s=i&&t.buttonNode.getAttribute(w)===m;n.disableUI(),s&&i.addClass(y).addClass(b),n.destroyPromise({remove:!0}).then(function(){r=e.one("#"+r.get("id")),r&&(s&&i.removeClass(y).removeClass(b),n.enableUI())},function(){r=e.one("#"+r.get("id")),r&&(s&&i.removeClass(y).removeClass(b),n.enableUI())})},vt.prototype._defFn_reset=function(){var e=this;e.reset()},vt.prototype._defFn_save=function(t){var n=this,r=t.buttonNode,i=r.one(g),s=i&&t.buttonNode.getAttribute(w)===m,o,u;u=n.getUnvalidatedUI(),u.isEmpty()?(n.disableUI(),s&&i.addClass
(y).addClass(b),o=n.getAttrs(),n.UIToModel(),n.savePromise().then(function(){n.setResetAttrs(),r=e.one("#"+r.get("id")),r&&(s&&i.removeClass(y).removeClass(b),n.enableUI())},function(){n.setAttrs(o),r=e.one("#"+r.get("id")),r&&(n._modelToUI(),s&&i.removeClass(y).removeClass(b),n.enableUI())})):n.fire(rt,{nodelist:u})},vt.prototype._defFn_submit=function(t){var n=this,r=t.buttonNode,i=r.one(g),s=i&&t.buttonNode.getAttribute(w)===m,o,u;u=n.getUnvalidatedUI(),u.isEmpty()?(n.disableUI(),s&&i.addClass(y).addClass(b),o=n.getAttrs(),n.UIToModel(),n.submitPromise().then(function(){r=e.one("#"+r.get("id")),r&&(s&&i.removeClass(y).removeClass(b),n.enableUI())},function(){n.setAttrs(o),r=e.one("#"+r.get("id")),r&&(n._modelToUI(),s&&i.removeClass(y).removeClass(b),n.enableUI())})):n.fire(rt,{nodelist:u})},vt.prototype._defFn_uichanged=function(e){var t=this,r=e.formElement,i=r.name,s=r.type,o=e.value,u,a,f;r.widget?(f=this._getWidgetValueField(s),typeof f===z?t._updateSimularWidgetUI(e.nodeid,i,f,o):n.each(f,function(n){t._updateSimularWidgetUI(e.nodeid,i,n,o,!0)})):(u=e.node,a=t._validValue(u,r,i,o),t._updateSimularUI(u,i,o,a),t._lifeUpdate&&a&&t.UIToModel(u.get(Y)))},vt.prototype._garbageCollect=function(){var t=this,i=(new Date).getTime(),s=t._ATTRS_nodes,o=t._FORM_elements,u=t._knownNodeIds,a=[],f,l,c,h;i-=d,r.each(u,function(t,r,u){typeof t===W?e.one("#"+r)||(u[r]=(new Date).getTime()):t<i&&(c=o[r],h=c.name,f=s[h],l=f&&n.indexOf(f,r),delete o[r],l>0&&f.splice(l,1),a.push(r))}),n.each(a,function(e){delete u[e]})},vt.prototype._getWidgetValue=function(e,t){var n=this._getWidgetValueField(t);return e&&e.get(typeof n===z?n:n[0])},vt.prototype._getWidgetValueField=function(e){var t=typeof e===M&&e.NAME;return t&&this._widgetValueFields[e.NAME]||$},vt.prototype._modelToUI=function(t){var n=this,i,s,o,u,a,f,l,c,h;s=n._FORM_elements,i=t&&s[t],i&&(o=e.one("#"+t))&&o.getAttribute(G)?(f=i.widget,a=i.name,u=n.get(a,u)||"",f?(h=this._getWidgetValueField(i.type),f.set(typeof h===z?h:h[0],u)):(l=i.type,n._dateTimeTypes[l]?(c=i.config.format,n._updateDateTimeUI(i.name,u,l,c)):o.set($,u))):t||r.each(n._FORM_elements,function(e,t){n._modelToUI(t)})},vt.prototype._removeTargets=function(){var e=this;r.each(e._FORM_elements,function(t){var n=t.widget;n&&n.removeTarget(e)})},vt.prototype._removeValidation=function(){var t=this;r.each(t._FORM_elements,function(n){var r=e.one("#"+n.nodeid);r&&t._setNodeValidation(r,!0)})},vt.prototype._renderBtn=function(e,t,n){var r=this,s=r._FORM_elements,u=r._knownNodeIds,a,f;return t||(t={}),n||(n=x),e||(e=n),t[V]||(t[V]=""),t[$]||(t[$]=n),t[V]+=" "+K+'="'+n+'"',t.buttontype=x,t.labelHTML=e,a=o.getElement(x,t),f=a.nodeid,s[f]=a,i.availablePromise("#"+f).then(function(e){u[f]?e.insert(h,"replace"):u[f]=!0}),a.html},vt.prototype._updateDateTimeUI=function(t,r,i,o){var u=this,a=u._ATTRS_nodes[t];a&&(o||(i===I?o="%x":i===q?o="%X":o="%x %X"),n.each(a,function(t){var n=e.one("#"+t),i=e.one('span[data-for="'+t+'"]'),u=s.isDate(r);u&&n&&n.set($,r.getTime()),i&&i.set("text",u?e.Date.format(r,{format:o}):"invalid Date: "+r)}))},vt.prototype._updateSimularUI=function(t,r,i,s){var o=this,u=o._ATTRS_nodes[r];u&&n.each(u,function(n){var r=e.one("#"+n);r&&(r!==t&&r.set($,i),o._setNodeValidation(r,s))})},vt.prototype._setNodeValidation=function(e,t,n){var r;e.setAttribute(V+"-valid",t),r=n||e.getAttribute(Z+(t?"valid":"invalid")),r?e.setAttribute(Z,r):e.removeAttribute(Z)},vt.prototype._updateSimularWidgetUI=function(t,r,i,s,o){var u=this,a=u._ATTRS_nodes[r],f,l;a&&n.each(a,function(n){f=u._FORM_elements[n],l=f&&f.widget,(n!==t||o)&&l&&l.set(i,s);if(l&&l.getClassName()===k){var r=e.one('span[data-for="'+n+'"]');r&&r.set("text",s)}}),u._lifeUpdate&&u.UIToModel(t)},vt.prototype._validValue=function(e,t,n,r){var i=this,s=t.type,o=s===I||s===q||s===R||s==="checkbox",u,a,f,l,c,h,p,d,v,m;return o||(u=i._getAttrCfg(n),d=u.formconfig,p=d&&d.required,h=typeof p===W&&p||s==="password",v=r===""&&!h,v||(a=u.validator,f=e.getAttribute(V+"-pattern"),l=!a||a(s===U?t.config.digits?parseFloat(r):parseInt(r,10):r),c=!f||(new RegExp(f,"i")).test(r),m=r!==""||!h)),o||v||l&&c&&m},vt.prototype._widgetValueFields.itsacheckbox="checked",vt.prototype._widgetValueFields.itsaselectlist="index",vt.prototype._widgetValueFields.toggleButton=["checked","pressed"],vt.prototype._widgetValueFields.editorBase="content",n.each([x,P,B,j,H],function(t){var n={on:function(e,n,r){n._handle=e.on(D,function(e){var n=e.target;n&&n.get("tagName")!=="BUTTON"&&(n=n.get("parentNode"),e.target=n),n&&n.getAttribute(Q)===x&&n.getAttribute(K)===t&&r.fire(e)})},detach:function(e,t){t._handle.detach()}};n.delegate=n.on,n.detachDelegate=n.detach,e.Event.define(t+":"+D,n)})},"@VERSION@",{requires:["yui-base","base-base","attribute-base","base-build","selector-css2","model","datatype-date-format","node-base","node-style","node-core","oop","yui-later","node-event-delegate","event-valuechange","event-synthetic","event-base","event-custom","gallery-itsanodepromise","gallery-itsamodelsyncpromise","gallery-itsaformelement"]});
