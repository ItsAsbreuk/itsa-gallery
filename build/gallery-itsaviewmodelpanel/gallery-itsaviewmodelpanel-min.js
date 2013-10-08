YUI.add("gallery-itsaviewmodelpanel",function(e,t){"use strict";var n,r=e.ITSAFormElement,i=e.Array,s=e.Lang,o="id",u="destroyed",a="contentBox",f="rendered",l="gallery-",c="View",h="body"+c,p="footer",d=p+c,v="template",m=p+"Template",g="itsa-focused",y="editable",b="model",w="focused",E="visible",S="Change",x="close",T="click",N=x+T,C="button",k=C+":hide",L="boolean",A="string",O="load",M="submit",_="delete",D="save",P="destroy",H="value",B="reset",j="focusManaged",F="itsatabkeymanager",I="noHideOnLoad",q="noHideOnReset",R="disabled",U="pure-"+C+"-"+R,z="focusnext",W={ok:!0,retry:!0,save:!0,submit:!0};n=e.ITSAViewModelPanel=e.Base.create("itsaviewmodelpanel",e.ITSAPanel,[],null,{ATTRS:{bodyView:{value:null,writeOnce:!0},editable:{value:!1,validator:function(e){return typeof e===L}},focusManaged:{value:!0,validator:function(e){return typeof e===L}},footerTemplate:{value:null,validator:function(e){return typeof e===A}},footerView:{value:null,writeOnce:!0},headerView:{value:null,readOnly:!0},hideOnBtn:{value:!0,validator:function(e){return typeof e===L}},noHideOnLoad:{value:!0,validator:function(e){return typeof e===L}},noHideOnReset:{value:!0,validator:function(e){return typeof e===L}},model:{value:{},validator:function(t){return t===null||s.isObject(t)||typeof t===A||t instanceof e.Model}},template:{value:null,validator:function(e){return typeof e===A}}}}),n.prototype.initializer=function(){var t=this,n=t.get(b),r=t.get(m);t._eventhandlers=[],t._set(h,new e.ITSAViewModel({model:n,template:t.get(v),editable:t.get(y),styled:!1,focusManaged:!1,partOfMultiView:!0})),r&&t._set(d,new e.ITSAViewModel({model:n,template:r,editable:!1,styled:!1,focusManaged:!1,partOfMultiView:!0})),t.publish(z,{defaultFn:e.bind(t._defFn_focusnext,t),emitFacade:!0}),t.get(E)&&t.get(y)&&t.get(a).addClass(g)},n.prototype.addCustomBtn=function(e,t,n){var r=this,i=r.get(h),s=r.get(d);i.addCustomBtn(e,t,n),s&&s.addCustomBtn(e,t,n)},n.prototype.bindUI=function(){var t=this,i=t.get(a),s,u;n.superclass.bindUI.apply(t),s=t._eventhandlers,u=t.get(h),u.addTarget(t),t._setFocusManager(t.get(j)),s.push(t.after(y+S,function(e){t.get(h).set(y,e.newVal),t.get(a).toggleClass(g,e.newVal&&t.get(E))})),s.push(t.after(E+S,function(n){var i=n.newVal,s;i||(t._pickerVis&&e.ItsaDateTimePicker.hide(!0),s=t.get(b),s.toJSONUI&&(r.tipsyOK._lastnode&&s._FORM_elements[r.tipsyOK._lastnode.get(o)]&&r.tipsyOK.hideTooltip(),r.tipsyInvalid._lastnode&&s._FORM_elements[r.tipsyInvalid._lastnode.get(o)]&&r.tipsyInvalid.hideTooltip())),t.get(a).toggleClass(g,i&&t.get(y))})),s.push(t.after(b+S,function(e){var n=t.get(d);t.get(h).set(b,e.newVal),n&&n.set(b,e.newVal)})),s.push(t.after(v+S,function(e){t.get(h).set(v,e.newVal)})),s.push(t.after("*:viewrendered",function(){e.later(250,null,function(){var e=i.itsatabkeymanager;e&&(e.refresh(i),t.get(E)&&!t._locked&&e.focusInitialItem())})})),s.push(t.after(j+S,function(e){t._setFocusManager(e.newVal)})),s.push(u.on(z,function(e){if(e.target!==t){var n=z,r={type:n,model:t.get(b),modelEventFacade:e,target:t};t.fire(n,r)}})),s.push(t.after(["*:"+N,"*:"+C+x],function(e){t.fire(k,{buttonNode:e.target})})),s.push(t.after(w+S,function(e){var n=i.itsatabkeymanager,r=e.newVal&&t.get(E)&&t.get(y);t.get(a).toggleClass(g,r),r&&n&&n._retreiveFocus()})),s.push(t.after(["*:"+O,"*:"+B],function(n){var r=i.itsatabkeymanager,s=n.target;s instanceof e.Model&&r&&t.get(E)&&(s.enableUI(),r.focusInitialItem())})),s.push(t.after(m+S,function(n){var r=n.newVal,i=n.prevVal,s;r&&!i&&(s=new e.ITSAViewModel({model:t.get(b),template:r,editable:!1,styled:!1,focusManaged:!1,partOfMultiView:!0}),t._set(d,s),t._renderFooter()),i&&!r&&i.destroy()&&t._set(d,null)})),s.push(t.after(["*:"+T],function(e){var n=e.buttonNode,r=n&&n.get(H);n&&t.get("hideOnBtn")&&r!==x&&(!t.get(q)||r!==B)&&(!t.get(I)||r!==O)&&t.fire(k,{buttonNode:n})})),s.push(t._header.delegate(T,function(e){var n=e.target,r=n.get(H);t.get("hideOnBtn")&&r!==x&&(!t.get(q)||r!==B)&&(!t.get(I)||r!==O)&&t.fire(k,{buttonNode:n})},C)),s.push(t.on(k,function(e){var n=t.get(b),r=t.get(y),i=e.buttonNode,s=i.get(H);W[s]&&r&&n&&n.toJSONUI&&!n.validated()&&e.preventDefault()})),s.push(t.on(["*:"+M,"*:"+D,"*:"+O,"*:"+P],function(n){var r=n.promise,s=n.target,o=n.type.split(":")[1],u=n.options,a=o===P&&(u.remove||u[_]),f;if(!a&&s instanceof e.Model){if(o===M||o===D)f=s.getAttrs(),s.UIToModel();t._lockedBefore=t._locked,t.lockPanel(!0),t._setSpin(o,!0),o===P||r.then(function(){(o===O||o===M||o===D)&&s.setResetAttrs()},function(){return(o===M||o===D)&&s.setAttrs(f,{fromInternal:!0}),!0}).then(function(){var e=i.itsatabkeymanager;t._setSpin(o,!1),t._lockedBefore||t.unlockPanel(),e&&e.focusInitialItem()})}})),s.push(t.on("*:datepickerclick",function(){t.lockPanel(),t._pickerVis=!0,t.once("*:"+z,function(){t._pickerVis=!1,t.unlockPanel()})}))},n.prototype.lockPanel=function(){var e=this,t=e.get(h),n=e.get(d);t.lockView(),n?n.lockView():e._footercont.all("button").addClass(U),arguments[0]||(e._locked=!0)},n.prototype.unlockPanel=function(){var e=this,t=e.get(h),n=e.get(d);t.unlockView(),n?n.unlockView():e._footercont.all("button").removeClass(U),e._locked=!1},n.prototype.removeButtonLabel=function(e){var t=this,n=t.get(h),r=t.get(d);n.removeButtonLabel(e),r&&r.removeButtonLabel(e)},n.prototype.removeCustomBtn=function(e){var t=this,n=t.get(h),r=t.get(d);n.removeCustomBtn(e),r&&r.removeCustomBtn(e)},n.prototype.removeHotKey=function(e){var t=this,n=t.get(h),r=t.get(d);n.removeHotKey(e),r&&r.removeHotKey(e)},n.prototype.setButtonLabel=function(e,t){var n=this,r=n.get(h),i=n.get(d);r.setButtonLabel(e,t),i&&i.setButtonLabel(e,t)},n.prototype.setHotKey=function(e,t){var n=this,r=n.get(h),i=n.get(d);r.setHotKey(e,t),i&&i.setHotKey(e,t)},n.prototype.syncUI=function(){var e=this,t=e.get(h),n=e.get(d);e.get(f)&&(t.render(),n&&n.render())},n.prototype.translate=function(e){return this.get(h).translate(e)},n.prototype.destructor=function(){var e=this,t=e.get(a),n=e.get(h),r=e.get(d);e._clearEventhandlers(),n.removeTarget
(e),t.hasPlugin(F)&&t.unplug(F),n&&n.destroy(),r&&r.destroy()},n.prototype._clearEventhandlers=function(){var e=this;i.each(e._eventhandlers,function(e){e.detach()})},n.prototype._defFn_focusnext=function(){var e=this,t=e.get(a).itsatabkeymanager;t&&t.next()},n.prototype._setFocusManager=function(t){var n=this,r=n.get(a),i=r.itsatabkeymanager;t?e.use(l+F,function(){n.get(u)||(i?i.refresh(r):(r.plug(e.Plugin.ITSATabKeyManager),i=r.itsatabkeymanager),r.hasClass(g)&&i.focusInitialItem())}):i&&r.unplug(F)},n.prototype._setSpin=function(e,t){var n=this,r=n.get(a).all('[data-buttonsubtype="'+e+'"] i');r.toggleClass("itsaicon-form-loading",t),r.toggleClass("itsa-busy",t)}},"@VERSION@",{requires:["node-pluginhost","base-build","base-base","event-outside","model","gallery-itsapanel","gallery-itsaviewmodel","gallery-itsaformelement"]});
