YUI.add("gallery-itsaeditmodel",function(e,t){"use strict";var n=e.Array,r=e.ITSAFormElement,i="click",s="save",o="destroy",u="cancel",a="edit",f="submit",l="reset",c="date",h="time",p="picker",d="data",v="value",m="button",g="type",y=d+"-"+m+"sub"+g,b=d+"-"+m+g,w="focusnext",E="uichanged",S="uichanging",x=m+i,T=o+i,N=f+i,C=u+i,k=l+i,L=a+i,A=s+i,O=c+p+i,M=h+p+i,_=c+h+p+i;e.namespace("Plugin").ITSAEditModel=e.Base.create("itsaeditmodel",e.Model,[],{initializer:function(){var t=this;t._eventhandlers=[],t._UIelements={},t._needAutoSaved=!1,t._autoSaveTimer=null,t.publish(w,{defaultFn:e.bind(t.defFnFocusNext,t),emitFacade:!0}),t.publish(E,{defaultFn:e.bind(t.defFnUIChanged,t),emitFacade:!0}),t.publish(S,{defaultFn:e.bind(t.defFnUIChanging,t),emitFacade:!0}),t.publish(o,{defaultFn:e.bind(t._defFnDestroy,t),emitFacade:!0}),t.publish(f,{defaultFn:e.bind(t._defFnSubmit,t),emitFacade:!0}),t.publish(u,{defaultFn:e.bind(t._defFnCancel,t),emitFacade:!0}),t.publish(l,{defaultFn:e.bind(t._defFnReset,t),emitFacade:!0}),t.publish(s,{defaultFn:e.bind(t._defFnSave,t),emitFacade:!0}),t.publish(O,{defaultFn:e.bind(t._defFnChangeDate,t),emitFacade:!0}),t.publish(M,{defaultFn:e.bind(t._defFnChangeDate,t),emitFacade:!0}),t.publish(_,{defaultFn:e.bind(t._defFnChangeDate,t),emitFacade:!0}),t._bindUI()},defFnFocusNext:function(){},defFnUIChanged:function(){},defFnUIChanging:function(){},_defFnDestroy:function(){},_defFnEdit:function(){},_defFnSubmit:function(){},_defFnCancel:function(){},_defFnReset:function(){},_defFnSave:function(){},_defFnChangeDate:function(t){var n=t.target,r=t.type,i=t.buttonNode,s=e.ItsaDateTimePicker,o;r===O?o=e.bind(s.getDate,s):r===M?o=e.bind(s.getTime,s):r===_&&(o=e.bind(s.getDateTime,s)),o(t.value,t.uiElement.config).then(function(e){},function(){return!0}).then(function(){i&&i.focus()})},renderBtn:function(e,t){return this._renderBtn(e,t,m,!0)},_renderBtn:function(e,t,n,i){var s=this,o;return t||(t={}),e||(e=n),t.buttonText=e,t.data||(t.data=""),i&&(t.data+=" "+y+'="'+n+'"'),o=r.getElement(n,t),s._UIelements[o.nodeid]=o,o.html},renderCancelBtn:function(e,t){return this._renderBtn(e,t,u,!0)},renderDestroyBtn:function(e,t){return this._renderBtn(e,t,o,!0)},renderEditBtn:function(e,t){return this._renderBtn(e,t,a,!0)},renderResetBtn:function(e,t){return this._renderBtn(e,t,l)},renderSaveBtn:function(e,t){return this._renderBtn(e,t,s,!0)},renderSubmitBtn:function(e,t){return this._renderBtn(e,t,f)},destructor:function(){var e=this;e._autoSaveTimer&&e._autoSaveTimer.cancel(),e._fireEventTimer&&e._fireEventTimer.cancel(),e._clearEventhandlers(),e._UIelements={}},_bindUI:function(){var t=this,n=t._eventhandlers,r=e.one("body");n.push(r.delegate([O,M,_,x,A,T,L,C,N,k],function(e){var n=e.target,r=e.type,i={target:t,value:new Date(n.getAttribute(v)),uiElement:t._UIelements[n.get("id")],buttonNode:n,type:r};t.fire(r,i)},function(e,n){return t._UIelements[n.target.get("id")]}))},_clearEventhandlers:function(){n.each(this._eventhandlers,function(e){e.detach()})}},{ATTRS:{autosaveInterval:{value:30,validator:function(e){return typeof e=="number"&&e>0&&e<=3600},setter:function(t){var n=this,r=n.get("updateMode");n._autoSaveTimer&&n._autoSaveTimer.cancel(),r===2&&(n._autoSaveTimer=e.later(1e3*t,n,n._autoStore,null,!0))}},updateMode:{value:0,lazyAdd:!1,validator:function(e){return typeof e=="number"&&e>=0&&e<=3},setter:function(t){var n=this,r=n.get("autosaveInterval");t?n._autoSaveTimer=e.later(1e3*r,n,n._autoStore,null,!0):n._autoSaveTimer&&n._autoSaveTimer.cancel()}}}}),n.each([m,s,o,a,u],function(t){e.Event.define(t+i,{on:function(e,n,r){n._handle=e.on(i,function(e){var n=e.target;n.getAttribute(b)===m&&n.getAttribute(y)===t&&r.fire(e)})},detach:function(e,t){t._handle.detach()}})})},"@VERSION@",{requires:["yui-base","attribute-base","base-build","node-base","node-event-delegate","event-synthetic","plugin","pluginhost-base","lazy-model-list","event-valuechange","gallery-itsamodelsyncpromise","gallery-itsaformelement"]});
