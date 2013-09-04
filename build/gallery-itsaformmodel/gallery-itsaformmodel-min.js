YUI.add("gallery-itsaformmodel",function(e,t){"use strict";var n=e.Array,r=e.Object,i=e.Node,s=e.Lang,o=e.ITSAFormElement,u="Notification:",a="Data has been changed outside the form.<br />Load it into the form? (if not, then the data will be reset to the current form-values)",f="Data has been changed outside the form.<br />Load it into the form?",l="UNDEFINED FORM-ELEMENT",c="itsa-invisible",h='<span style="background-color:F00; color:#FFF">DUPLICATED FORMELEMENT is not allowed</span>',p=1e4,d=1728e5,v=864e5,m="gallery-itsa",g="function",y="renderpromise",b="click",w="save",E="load",S="destroy",x="remove",T="submit",N="date",C="time",k=N+C,L="number",A="string",O="boolean",M="picker",_="data",D="value",P="button",H="type",B=_+"-"+P+"sub"+H,j=_+"-"+P+H,F=_+"-modelattribute",I="id",q=_+"-content",R="cancel",U="reset",z="focusnext",W="validationerror",X="uichanged",V=P+b,$=S+b,J=x+b,K=T+b,Q=R+b,G=U+b,Y=w+b,Z=E+b,et=N+M+b,tt=C+M+b,nt=N+C+M+b,rt=e.ITSAFormModel=e.Base.create("itsaformmodel",e.Model,[],{},{_ATTR_CFG:["formtype","formconfig","validationerror"]});rt.prototype._widgetValueFields={},rt.prototype._allowedFormTypes={text:!0,number:!0,password:!0,textarea:!0,checkbox:!0,date:!0,time:!0,datetime:!0,email:!0,url:!0,plain:!0},rt.prototype._dateTimeTypes={date:!0,time:!0,datetime:!0},rt.prototype._datePickerClicks={datepickerclick:!0,timepickerclick:!0,datetimepickerclick:!0},rt.prototype.initializer=function(){var t=this;t._eventhandlers=[],t._FORM_elements={},t._ATTRS_nodes={},t._knownNodeIds={},t._lifeUpdate=!1,t._focusNextElements={text:!0,number:!0,password:!0,textarea:!0,email:!0,url:!0},t._renderBtnFns={button:t.renderBtn,cancel:t.renderCancelBtn,destroy:t.renderDestroyBtn,remove:t.renderRemoveBtn,reset:t.renderResetBtn,save:t.renderSaveBtn,load:t.renderLoadBtn,submit:t.renderSubmitBtn},t.publish(X,{defaultFn:e.bind(t._defFn_uichanged,t),emitFacade:!0}),t.publish($,{defaultFn:e.bind(t._defFn_destroy,t),emitFacade:!0}),t.publish(J,{defaultFn:e.bind(t._defFn_remove,t),emitFacade:!0}),t.publish(K,{defaultFn:e.bind(t._defFn_submit,t),emitFacade:!0}),t.publish(Q,{defaultFn:e.bind(t._defFn_cancel,t),emitFacade:!0}),t.publish(G,{defaultFn:e.bind(t._defFn_reset,t),emitFacade:!0}),t.publish(Y,{defaultFn:e.bind(t._defFn_save,t),emitFacade:!0}),t.publish(Z,{defaultFn:e.bind(t._defFn_load,t),emitFacade:!0}),t.publish(et,{defaultFn:e.bind(t._defFn_changedate,t),emitFacade:!0}),t.publish(tt,{defaultFn:e.bind(t._defFn_changedate,t),emitFacade:!0}),t.publish(nt,{defaultFn:e.bind(t._defFn_changedate,t),emitFacade:!0}),t._bindUI(),t._gcTimer=e.later(v,t,t._garbageCollect,null,!0)},rt.prototype[R]=function(){this.fire(R)},rt.prototype.crossValidation=function(){},rt.prototype.getCurrentFormElement=function(e){return this.getCurrentFormElements(e)[0]||null},rt.prototype.getCurrentFormElements=function(t){var i=this,s=i._ATTRS_nodes[t],o=[],u;return s?n.each(s,function(t){var n=e.one("#"+t);n&&(u=i._FORM_elements[t],u.node=n,o.push(u))}):r.each(i._FORM_elements,function(n){var r=e.one("#"+n.nodeid);r&&r.getAttribute("name")===t&&(n.node=r,o.push(n))}),o},rt.prototype.getUI=function(t){var n=this,r,i,o,u,a,f,l,c;return u=n._ATTRS_nodes[t],o=u&&u.length>0&&u[0],i=n._FORM_elements,r=o&&i[o],r&&(a=e.one("#"+o))&&a.getAttribute(F)&&(l=r.widget,c=r.type,f=l?n._getWidgetValue(l,c):a.get(D),s.isValue(f)&&(n._dateTimeTypes[c]&&(f=new Date(parseInt(f,10))),c===L&&(f=r.config.digits?parseFloat(f):parseInt(f,10)))),f},rt.prototype.getUnvalidatedUI=function(){var t=this,i,o,u,a=[];return r.each(this._FORM_elements,function(n){n.widget||(i=e.one("#"+n.nodeid),i&&(o=t._validValue(i,n,n.name,i.get(D)),t._setNodeValidation(i,o),o||a.push(i)))}),u=t.crossValidation(),s.isArray(u)&&u.length>0&&n.each(u,function(r){var i=r.attribute,s=i&&t._ATTRS_nodes[i];s&&n.each(s,function(n){var i=e.one("#"+n),s=r.validationerror,o;i&&(o=typeof s===A?s:null,t._setNodeValidation(i,!1,o),a.push(i))})}),new e.NodeList(a)},rt.prototype[x]=function(){this.fire(x)},rt.prototype.renderBtn=function(e,t){return this._renderBtn(e,t,P)},rt.prototype.renderCancelBtn=function(e,t){return this._renderBtn(e,t,R)},rt.prototype.renderDestroyBtn=function(e,t){return this._renderBtn(e,t,S)},rt.prototype.renderLoadBtn=function(e,t){return this._renderBtn(e,t,E)},rt.prototype.renderRemoveBtn=function(e,t){return this._renderBtn(e,t,x)},rt.prototype.renderResetBtn=function(e,t){return this._renderBtn(e,t,U)},rt.prototype.renderSaveBtn=function(e,t){return this._renderBtn(e,t,w)},rt.prototype.renderSubmitBtn=function(e,t){return this._renderBtn(e,t,T)},rt.prototype.renderFormElement=function(t){var r=this,s=r._knownNodeIds,u,a,f,d,v,b,w,E,S,x,T,N,C,k;return u=r._FORM_elements,a=r._ATTRS_nodes,f=r.get(t),d=r._getAttrCfg(t),w=d.formtype||"text",N=typeof w===g&&w.NAME,N||r._allowedFormTypes[w]?(E=d.formconfig||{},E.value=f,N&&(S=r._getWidgetValueField(w),E.widgetconfig||(E.widgetconfig={}),C=typeof S!==A,C?n.each(S,function(e){E.widgetconfig[e]=f}):E.widgetconfig[S]=f),E.modelattribute=!0,E.name=t,E.tooltipinvalid=d.validationerror,E.removerequired=!0,delete E.pattern,E.removepattern=!0,E.hideatstartup=!0,v=o.getElement(w,E),x=v.nodeid,u[x]=v,a[t]||(a[t]=[]),a[t].push(x),T=v.widget,T?(k=w.NAME==="editorBase",e.use(k?m+"editor"+y:m+"widget"+y,function(){T.renderPromise().then(function(){var t=e.one("#"+x);s[x]?t.insert(h,"replace"):(s[x]=!0,k&&t.removeClass(c),r._modelToUI(x),!k&&t.removeClass(c))})}),C?n.each(S,function(t){r._eventhandlers.push(T.after(t+"Change",function(t){var n=X,i={target:r,value:t.newVal,formElement:v,node:e.one("#"+x),nodeid:x,type:n};r.fire(n,i)}))}):r._eventhandlers.push(T.after(S+"Change",function(t){var n=X,i={target:r,value:t.newVal,formElement:v,node:e.one("#"+x),nodeid:x,type:n};r.fire(n,i)}))):i.availablePromise("#"+x,p).then(function(t){s[x]?t.insert(h,"replace"):(s[x]=!0,r._modelToUI(x),t.removeClass(c),r._dateTimeTypes[w]&&(t=e.one('span.formatvalue[data-for="'+x+'"]'),t&&t.removeClass(c)))},function(e){}),b=v.html,v.widget&&v
.widget.addTarget(r)):b=l,b},rt.prototype.reset=function(){var e=this,t;e._internalChange=!0,e.constructor.superclass.constructor.superclass.reset.apply(e,arguments),arguments.length===0&&(e._internalChange=null,e._modelToUI(),e._removeValidation(),t={type:U,target:e},e.fire(U,t))},rt.prototype.setLifeUpdate=function(e){var t=this;return typeof e===O&&(t._lifeUpdate=e),t},rt.prototype.setResetAttrs=function(){var e=this,t=e.getAttrs();delete t.clientId,delete t.destroyed,delete t.initialized,e.idAttribute!==I&&delete t.id,r.each(t,function(t,n){t&&e._state.add(n,"initValue",t)})},rt.prototype.setWidgetValueField=function(e,t){this._widgetValueFields[e]=t},rt.prototype[T]=function(){this.fire(T)},rt.prototype.toJSONUI=function(t){var i=this,o={},u=i.getAttrs(),a=i._renderBtnFns,f,l,c,h;return delete u.clientId,delete u.destroyed,delete u.initialized,i.idAttribute!==I&&delete u.id,r.each(u,function(e,t){o[t]=i.renderFormElement(t)}),s.isObject(t)?(f=t.propertykey,l=t.type,c=t.labelHTML,h=t.config,f&&l&&a[l]&&(o[f]=e.bind(a[l],i,c,h)())):s.isArray(t)&&n.each(t,function(t){f=t.propertykey,l=t.type,c=t.labelHTML,h=t.config,f&&l&&a[l]&&(o[f]=e.bind(a[l],i,c,h)())}),o},rt.prototype.UIToModel=function(t){var n=this,i,o,u,a,f,l,c,h;o=n._FORM_elements,i=t&&o[t],i&&(a=e.one("#"+t))&&a.getAttribute(F)?(c=i.widget,h=i.type,f=c?n._getWidgetValue(c,h):a.get(D),l=i.name,s.isValue(f)&&(u={formelement:!0},n._dateTimeTypes[h]&&(f=new Date(parseInt(f,10))),h===L&&(f=i.config.digits?parseFloat(f):parseInt(f,10)),n.set(l,f,u))):t||r.each(n._FORM_elements,function(e,t){n.UIToModel(t)})},rt.prototype.destructor=function(){var e=this;e._clearEventhandlers(),e._removeTargets(),e._FORM_elements={},e._ATTRS_nodes={},e._focusNextElements={},e._widgetValueFields={},e._knownNodeIds={},e._gcTimer.cancel()},rt.prototype._bindUI=function(){var t=this,n=t._eventhandlers,r=e.one("body");n.push(r.delegate([et,tt,nt,V,Z,Y,$,J,Q,K,G],function(e){var n=e.type,r=e.target,i,s,o;t._FORM_elements[r.get(I)]&&(e.preventDefault(),s=r.getAttribute(D),t._datePickerClicks[n]&&(o=new Date,o.setTime(parseInt(s,10)),s=o),i={target:t,value:s,formElement:t._FORM_elements[r.get(I)],buttonNode:r,type:n},t.fire(n,i))})),n.push(r.delegate("click",function(e){e.preventDefault()},".itsa-widget-parent")),n.push(r.delegate("valuechange",function(e){var n=e.target,r=X,i={target:t,value:n.get(D),formElement:t._FORM_elements[n.get(I)],node:n,nodeid:n.get(I),type:r};t.fire(r,i)},function(e,n){return n&&n.ratget&&t._FORM_elements[n.target.get(I)]})),n.push(t.after("*:change",function(n){!t._internalChange&&!n.formelement&&!n.fromInternal?e.use(m+"dialog",function(){t._lifeUpdate?e.confirm(u,a).then(e.bind(t._modelToUI,t,null),e.bind(t.UIToModel,t,null)):e.confirm(u,f).then(e.bind(t._modelToUI,t,null))}):n.fromInternal&&t._modelToUI()})),n.push(r.delegate("keypress",function(e){e.halt();var n=z,r={target:e.target,type:n};t.fire(n,r)},function(e,n){var r=t._FORM_elements[n.target.get(I)];return r&&n.keyCode===13&&t._focusNextElements[r.type]}))},rt.prototype._clearEventhandlers=function(){n.each(this._eventhandlers,function(e){e.detach()})},rt.prototype._defFn_cancel=function(){var e=this,t={type:R,target:e};e.fire(R,t),this.reset()},rt.prototype._defFn_destroy=function(){this.destroyPromise()},rt.prototype._defFn_changedate=function(t){e.use(m+"datetimepicker",function(){var n=t.target,r=t.type,i=t.buttonNode,o=e.ItsaDateTimePicker,u=t.formElement,a=s.isDate(t.value)?t.value:new Date,f,l,c;r===et?f=e.bind(o.getDate,o):r===tt?f=e.bind(o.getTime,o):r===nt&&(f=e.bind(o.getDateTime,o)),f(new Date(a),{alignToNode:i,modal:!0,forceSelectdate:!1}).then(function(e){l=u.config.format,n._updateDateTimeUI(u.name,e,r,l),n._lifeUpdate&&n.UIToModel(i.get(I))},function(){return!0}).then(function(){var e=z,t={target:i,type:e};i&&(i.removeAttribute(q),i.focus(),c=i.getAttribute(_+"-contentvalid"),c&&i.setAttribute(q,c)),n.fire(e,t)})})},rt.prototype._defFn_remove=function(){this.destroyPromise({remove:!0})},rt.prototype._defFn_reset=function(){var e=this;e.reset()},rt.prototype._defFn_save=function(){var e=this,t,n;n=e.getUnvalidatedUI(),n.isEmpty()?(t=e.getAttrs(),e.UIToModel(),e.savePromise().then(function(){e.setResetAttrs()},function(){e.setAttrs(t),e._modelToUI()})):e.fire(W,{nodelist:n})},rt.prototype._defFn_submit=function(){var e=this,t,n;n=e.getUnvalidatedUI(),n.isEmpty()?(t=e.getAttrs(),e.UIToModel(),e.submitPromise().then(null,function(){e.setAttrs(t),e._modelToUI()})):e.fire(W,{nodelist:n})},rt.prototype._defFn_load=function(){var t=this;t.loadPromise({fromInternal:!0}).then(e.bind(t.setResetAttrs,t))},rt.prototype._defFn_uichanged=function(e){var t=this,r=e.formElement,i=r.name,s=r.type,o=e.value,u,a,f;r.widget?(f=this._getWidgetValueField(s),typeof f===A?t._updateSimularWidgetUI(e.nodeid,i,f,o):n.each(f,function(n){t._updateSimularWidgetUI(e.nodeid,i,n,o,!0)})):(u=e.node,a=t._validValue(u,r,i,o),t._updateSimularUI(u,i,o,a),t._lifeUpdate&&a&&t.UIToModel(u.get(I)))},rt.prototype._garbageCollect=function(){var t=this,i=(new Date).getTime(),s=t._ATTRS_nodes,o=t._FORM_elements,u=t._knownNodeIds,a=[],f,l,c,h;i-=d,r.each(u,function(t,r,u){typeof t===O?e.one("#"+r)||(u[r]=(new Date).getTime()):t<i&&(c=o[r],h=c.name,f=s[h],l=f&&n.indexOf(f,r),delete o[r],l>0&&f.splice(l,1),a.push(r))}),n.each(a,function(e){delete u[e]})},rt.prototype._getWidgetValue=function(e,t){var n=this._getWidgetValueField(t);return e&&e.get(typeof n===A?n:n[0])},rt.prototype._getWidgetValueField=function(e){var t=typeof e===g&&e.NAME;return t&&this._widgetValueFields[e.NAME]||D},rt.prototype._modelToUI=function(t){var n=this,i,s,o,u,a,f,l,c,h;s=n._FORM_elements,i=t&&s[t],i&&(o=e.one("#"+t))&&o.getAttribute(F)?(f=i.widget,a=i.name,u=n.get(a,u)||"",f?(h=this._getWidgetValueField(i.type),f.set(typeof h===A?h:h[0],u)):(l=i.type,n._dateTimeTypes[l]?(c=i.config.format,n._updateDateTimeUI(i.name,u,l,c)):o.set(D,u))):t||r.each(n._FORM_elements,function(e,t){n._modelToUI(t)})},rt.prototype._removeTargets=
function(){var e=this;r.each(e._FORM_elements,function(t){var n=t.widget;n&&n.removeTarget(e)})},rt.prototype._removeValidation=function(){var t=this;r.each(t._FORM_elements,function(n){var r=e.one("#"+n.nodeid);r&&t._setNodeValidation(r,!0)})},rt.prototype._renderBtn=function(e,t,n){var r=this,s=r._FORM_elements,u=r._knownNodeIds,a,f;return t||(t={}),n||(n=P),e||(e=n),t[_]||(t[_]=""),t[_]+=" "+B+'="'+n+'"',t.buttontype=P,t.labelHTML=e,a=o.getElement(P,t),f=a.nodeid,s[f]=a,i.availablePromise("#"+f).then(function(e){u[f]?e.insert(h,"replace"):u[f]=!0}),a.html},rt.prototype._updateDateTimeUI=function(t,r,i,o){var u=this,a=u._ATTRS_nodes[t];a&&(o||(i===N?o="%x":i===C?o="%X":o="%x %X"),n.each(a,function(t){var n=e.one("#"+t),i=e.one('span[data-for="'+t+'"]'),u=s.isDate(r);u&&n&&n.set(D,r.getTime()),i&&i.set("text",u?e.Date.format(r,{format:o}):"invalid Date: "+r)}))},rt.prototype._updateSimularUI=function(t,r,i,s){var o=this,u=o._ATTRS_nodes[r];u&&n.each(u,function(n){var r=e.one("#"+n);r&&(r!==t&&r.set(D,i),o._setNodeValidation(r,s))})},rt.prototype._setNodeValidation=function(e,t,n){var r;e.setAttribute(_+"-valid",t),r=n||e.getAttribute(q+(t?"valid":"invalid")),r?e.setAttribute(q,r):e.removeAttribute(q)},rt.prototype._updateSimularWidgetUI=function(t,r,i,s,o){var u=this,a=u._ATTRS_nodes[r],f,l;a&&n.each(a,function(n){f=u._FORM_elements[n],l=f&&f.widget,(n!==t||o)&&l&&l.set(i,s);if(l&&l.getClassName()==="yui3-slider"){var r=e.one('span[data-for="'+n+'"]');r&&r.set("text",s)}}),u._lifeUpdate&&u.UIToModel(t)},rt.prototype._validValue=function(e,t,n,r){var i=this,s=t.type,o=s===N||s===C||s===k||s==="checkbox",u,a,f,l,c,h,p,d,v,m;return o||(u=i._getAttrCfg(n),d=u.formconfig,p=d&&d.required,h=typeof p===O&&p||s==="password",v=r===""&&!h,v||(a=u.validator,f=e.getAttribute(_+"-pattern"),l=!a||a(s===L?t.config.digits?parseFloat(r):parseInt(r,10):r),c=!f||(new RegExp(f,"i")).test(r),m=r!==""||!h)),o||v||l&&c&&m},rt.prototype._widgetValueFields.itsacheckbox="checked",rt.prototype._widgetValueFields.itsaselectlist="index",rt.prototype._widgetValueFields.toggleButton=["checked","pressed"],rt.prototype._widgetValueFields.editorBase="content",n.each([P,w,S,x,R,E],function(t){var n={on:function(e,n,r){n._handle=e.on(b,function(e){var n=e.target;n&&n.get("tagName")!=="BUTTON"&&(n=n.get("parentNode"),e.target=n),n&&n.getAttribute(j)===P&&n.getAttribute(B)===t&&r.fire(e)})},detach:function(e,t){t._handle.detach()}};n.delegate=n.on,n.detachDelegate=n.detach,e.Event.define(t+b,n)})},"@VERSION@",{requires:["yui-base","base-base","attribute-base","base-build","model","datatype-date-format","node-base","node-core","oop","node-event-delegate","event-synthetic","event-valuechange","event-base","event-custom","gallery-itsanodepromise","gallery-itsamodelsyncpromise","gallery-itsaformelement"]});
