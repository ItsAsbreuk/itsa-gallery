YUI.add("gallery-itsaeditmodel",function(e,t){"use strict";var n=e.one("body"),r=e.Lang,i=e.Array,s=e.Object,o=e.ITSAFormElement,u="The data you are editing has been changed from outside the form. If you save your data, then these former changed will be overridden.",a="datetimepickerclick",f="itsa-button-datetime",l="itsa-datetimepicker-icondate",c="itsa-datetimepicker-icontime",h="itsa-datetimepicker-icondatetime",p="yui3-itsaformelement",d=p+"-button",v=p+"-lifechange",m=p+"-changed",g=p+"-enternextfield",y=p+"-checkbox",b=p+"-button",w=p+"-add",E=p+"-submit",S=p+"-reset",x=p+"-save",T=p+"-destroy",N=p+"-stopedit",C=function(e){var t=/yui3-itsaformelement-property-(\w+)/;return t.test(e)?RegExp.$1:null},k="internal",L="submitclick",A="addclick",O="saveclick",M="resetclick",_="destroyclick",D="stopeditclick",P="focusnext",H="dialog:warn",B="inputchange",j="inputvaluechange",F="buttonclick",I="pluggedin";e.namespace("Plugin").ITSAEditModel=e.Base.create("itsaeditmodel",e.Plugin.Base,[],{initializer:function(){var t=this,n;t.host=t.get("host"),t._eventhandlers=[],t._UIelements={},t._needAutoSaved=!1,t._autoSaveTimer=null,t._fireEventTimer=null,n=t.host,n.publish(L,{defaultFn:e.rbind(t._defPluginSubmitFn,t),emitFacade:!0}),n.publish(A,{defaultFn:e.rbind(t._defPluginAddFn,t),emitFacade:!0}),n.publish(M,{defaultFn:e.rbind(t._defPluginResetFn,t),emitFacade:!0}),n.publish(O,{defaultFn:e.rbind(t._defPluginSaveFn,t),emitFacade:!0}),n.publish(_,{defaultFn:e.rbind(t._defPluginDestroyFn,t),emitFacade:!0}),n.publish(D,{defaultFn:e.rbind(t._defPluginStopEditFn,t),emitFacade:!0}),t._bindUI(),t.addTarget(n),t._fireEventTimer=e.later(50,t,function(){n.itsaeditmodel&&(t._fireEventTimer.cancel(),t.fire(I))},null,!0)},getButton:function(t,n){var r=this,i=t,s=n&&n.type,u,a,f,l;return!t||s!=="button"&&s!=="reset"&&s!=="submit"&&s!=="save"&&s!=="destroy"&&s!=="stopedit"?u="":(l=t.replace(/ /g,"_"),r._UIelements[l]||(r._UIelements[l]={nodeid:e.guid()}),a=r._UIelements[l],f=a.config=e.merge(n),a.type=a.config.type,f.name=l,f.value=i,u=a.html=o.getElement(a.type,a.config,a.nodeid).html,r._isDateTimeType(s)&&e.use("gallery-itsadatetimepicker")),u},getElement:function(t,n){var r=this,i,s,u,a,f;return t&&n?(r._UIelements[t]||(r._UIelements[t]={nodeid:e.guid()}),u=r._UIelements[t],f=u.config=e.merge(n),u.type=f.type,a=r._getWidgetValueField(u.type),u.value=f[a]=f.differentValue||r.host.get(t),i=o.getElement(u.type,f,u.nodeid),s=u.html=i.html,u.widget=i.widget,r._isDateTimeType(u.type)&&e.use("gallery-itsadatetimepicker")):s="",s},getGeneratedUIelement:function(e){return this._UIelements[e]},savePromise:function(e){var t=this,n=t.get("updateMode");return t._needAutoSaved=!1,n!==3&&t._editFieldsToModel(),t.host.savePromise(e)},submitPromise:function(e){var t=this,n=t.get("updateMode");return t._needAutoSaved=!1,n!==3&&t._editFieldsToModel(),t.host.submitPromise(e)},toJSON:function(t){var n=this,r=n.host,i,u,a,f;return t?(u=e.clone(t),i=e.merge(r.getAttrs()),s.each(i,function(t,r,i){var s=u[r],l;s?(n._UIelements[r]||(n._UIelements[r]={nodeid:e.guid()}),a=n._UIelements[r],a.config=s,a.type=s.type,f=n._getWidgetValueField(a.type),a.value=s[f]=s.differentValue||t,l=o.getElement(a.type,s,a.nodeid),a.widget=l.widget,i[r]=a.html=l.html):delete i[r]}),s.each(u,function(t,r){var s=t.type,u,f,l;if(s==="button"||s==="reset"||s==="submit"||s==="save"||s==="destroy"||s==="stopedit")n._UIelements[l]||(n._UIelements[l]={nodeid:e.guid()}),a=n._UIelements[l],f=t.buttonText||s,l=f.replace(/ /g,"_"),t.name=l,t.value=f,a.type=t.type,a.config=t,a.type=t.type,u=o.getElement(a.type,a.config,a.nodeid),a.widget=u.widget,i[r]=a.html=u.html})):i={},i},destructor:function(){var e=this;e._autoSaveTimer&&e._autoSaveTimer.cancel(),e._fireEventTimer&&e._fireEventTimer.cancel(),e._clearEventhandlers(),e._itsaformelement.destroy(),e._UIelements={},e.removeTarget(e.host)},_autoStore:function(){var e=this;e._needAutoSaved&&(e._editFieldsToModel(),e._needAutoSaved=!1)},_bindUI:function(){var t=this,n=t._eventhandlers;n.push(e.on(a,function(n){var r=n.buttonNode,i=r.one("span"),s=r.previous("span"),o=e.ItsaDateTimePicker,u=n.property,a=t._UIelements[u],f=t.host.get(u),p=a&&a.widgetConfig||{},d;console.log("clicked datetime fase 1 property "+u+"| "+n.elementId+" | "+a.nodeid),a&&n.elementId===a.nodeid&&(console.log("clicked datetime fase 2"),i.hasClass(l)?d=e.rbind(o.getDate,o):i.hasClass(c)?d=e.rbind(o.getTime,o):i.hasClass(h)&&(d=e.rbind(o.getDateTime,o)),p.alignToNode=r,d(f,p).then(function(e){var n;t._storeProperty(s,o,u,e,!0),n=t.getElement(u,a,a.value),s.setHTML(t._getDateTimeValueFromRender(n)),r.focus()},function(){r&&r.focus()}))})),n.push(e.on([k+M,k+L,k+O,k+F,k+A,k+_,k+D],function(n){var r=t._UIelements[n.property],i;r&&n.elementId===r.nodeid&&(n.halt(),i={type:n.type},e.rbind(t._fireModelEvent,t,n.type,i)())})),n.push(e.on(P,function(e){var n=t._UIelements[e.property];n&&e.elementId===n.nodeid&&(e.halt(),t.fire(P,e))})),n.push(e.on(j,function(e){var n=t._UIelements[e.property];n&&e.elementId===n.nodeid&&t._storeProperty(e.inputNode,e.widget,e.property,e.inputNode.get("value"))})),n.push(e.on(B,function(e){var n=t._UIelements[e.property];n&&e.elementId===n.nodeid&&t._storeProperty(e.inputNode,null,e.property,e.inputNode.get("value"),!0)})),t.host.on("*:change",function(t){t.target instanceof e.Model&&e.fire(H,{message:u})})},_clearEventhandlers:function(){i.each(this._eventhandlers,function(e){e.detach()})},_defPluginDestroyFn:function(){var e=this;e._needAutoSaved=!1},_defPluginStopEditFn:function(){var e=this;e._needAutoSaved=!1,e.host.unplug("itsaeditmodel")},_defPluginAddFn:function(){var e=this;e._needAutoSaved=!1},_defPluginResetFn:function(){var e=this;e._needAutoSaved=!1},_defPluginSubmitFn:function(){this._defStoreFn("submit")},_defPluginSaveFn:function(){this._defStoreFn("save")},_defStoreFn:function(){var e=this,t=e.get("updateMode");e._needAutoSaved=!1,t!==3&&e._editFieldsToModel()},_editFieldsToModel:function(){var e=this,t={};s.each
(e._UIelements,function(e,n){t[n]=e.value}),e._setProperty(null,t)},_getWidgetValueField:function(e){var t=typeof e=="function"&&e.prototype.BOUNDING_TEMPLATE,n,r;return t&&(n=e.NAME,n==="itsacheckbox"&&(r="checked")),r||"value"},_fireModelEvent:function(t,n){var r=this,i=r.host,s,o,u,a,f;n.target=i,t===A&&(s=r.get("newModelClass"),u=new s,o=e.clone(r.getAttrs()),u.plug(e.Plugin.ITSAEditModel,o),n.newModel=u),t===O?(a=r.get("syncOptions"),f=a.save||{},n.promise=r.host.savePromise(f)):t===L?(a=r.get("syncOptions"),f=a.submit||{},n.promise=r.host.submitPromise(f)):t===_&&(a=r.get("syncOptions"),f=e.merge({remove:!0},a.destroy||{}),n.promise=r.host.destroyPromise(f)),i.fire(t,n)},_getDateTimeValueFromRender:function(e){var t=/<span[^>]+>([^<]*)</;return t.test(e)?RegExp.$1:""},_isDateTimeType:function(e){return e==="date"||e==="time"||e==="datetime"},_setProperty:function(e,t){var n=this,r=n.host,i={fromEditModel:!0},s;s=n._UIelements[e],s&&(s.value=t),e?r.set(e,t,i):r.setAttrs(t,i)},_storeProperty:function(t,n,i,s,o){var u=this,a=u.get("updateMode"),f=r.isObject(s),l={node:t,widget:n,property:i,newVal:f?e.merge(s):s,finished:o},c,h,p;c=u._UIelements[i],c?(l.prevValue=f?e.merge(c.value):c.value,c.value=s):(p=u.host.get(i),l.prevValue=f?e.merge(p):p),h=a===3||a===1&&o,h?u._setProperty(i,s):(t.addClass(m),a===2&&(u._needAutoSaved=!0)),u.fire(i+"Change",l)}},{NS:"itsaeditmodel",ATTRS:{autosaveInterval:{value:30,validator:function(e){return typeof e=="number"&&e>0&&e<=3600},setter:function(t){var n=this,r=n.get("updateMode");n._autoSaveTimer&&n._autoSaveTimer.cancel(),r===2&&(n._autoSaveTimer=e.later(1e3*t,n,n._autoStore,null,!0))}},syncOptions:{value:{},validator:function(e){return r.isObject(e)}},newModelClass:{value:e.Model},xtemplate:{value:null,validator:function(e){return typeof e=="string"}},updateMode:{value:0,lazyAdd:!1,validator:function(e){return typeof e=="number"&&e>=0&&e<=3},setter:function(t){var n=this,r=n.get("autosaveInterval");t?n._autoSaveTimer=e.later(1e3*r,n,n._autoStore,null,!0):n._autoSaveTimer&&n._autoSaveTimer.cancel()}}}}),e.augment(e.Model,e.Plugin.Host),n.delegate("click",function(t){var n=t.currentTarget,r=n.previous("span");t.halt(),n.focus(),e.use("gallery-itsadatetimepicker",function(e){t.elementId=r.get("id"),t.type=a,t.buttonNode=n,t.property=C(r.getAttribute("class")),e.fire(a,t)})},"."+f),n.delegate("valuechange",function(t){var n=t.currentTarget;t.elementId=n.get("id"),t.inputNode=n,t.property=C(n.getAttribute("class")),t.type=j,e.fire(j,t)},"."+v),n.delegate("change",function(t){var n=t.currentTarget;t.elementId=n.get("id"),t.inputNode=n,t.property=C(n.getAttribute("class")),t.type=B,e.fire(B,t)},"."+v),e.delegate("valuechange",function(t){var n=t.currentTarget,r=n.get("boundingBox");t.elementId=r.get("id"),t.widget=n,t.property=C(r.getAttribute("class")),t.type=j,e.fire(j,t)},"."+y),n.delegate("keypress",function(t){if(t.keyCode===13){t.halt();var n=t.currentTarget;t.elementId=n.get("id"),t.inputNode=n,t.property=C(n.getAttribute("class")),t.type=P,e.fire(P,t)}},"."+g),n.delegate("click",function(t){var n=t.currentTarget,r=n.getAttribute("class");t.halt(),n.focus(),t.elementId=n.get("id"),t.buttonNode=n,t.property=C(n.getAttribute("class")),r.indexOf(E)!==-1?(t.type=L,e.fire(k+L,t)):r.indexOf(S)!==-1?(t.type=M,e.fire(k+M,t)):r.indexOf(x)!==-1?(t.type=O,e.fire(k+O,t)):r.indexOf(T)!==-1?(t.type=_,e.fire(k+_,t)):r.indexOf(N)!==-1?(t.type=D,e.fire(k+D,t)):r.indexOf(w)!==-1?(t.type=A,e.fire(k+A,t)):r.indexOf(b)!==-1&&(t.type=F,e.fire(k+F,t))},"."+d)},"@VERSION@",{requires:["yui-base","base-build","node-base","node-event-delegate","plugin","pluginhost-base","lazy-model-list","event-valuechange","gallery-itsamodelsyncpromise","gallery-itsaformelement"]});
