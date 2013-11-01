YUI.add("gallery-itsaviewmodelpanel",function(e,t){"use strict";var n,r=e.ITSAFormElement,i=e.Array,s=e.Lang,o=4e3,u="focusnext",a="id",f="contentBox",l="rendered",c="View",h="body"+c,p="footer",d=p+c,v="template",m=p+"Template",g="itsa-focused",y="editable",b="model",w="visible",E="Change",S="close",x="click",T=S+x,N="button",C=N+":hide",k="boolean",L="string",A="load",O="submit",M="delete",_="save",D="destroy",P="value",H="reset",B="itsatabkeymanager",j="noHideOnLoad",F="noHideOnReset",I="noHideOnSubmit",q="noHideOnSave",R="disabled",U="pure-"+N+"-"+R,z="validationerror",W="itsa-panelclosebtn",X={ok:!0,retry:!0,save:!0,submit:!0};n=e.ITSAViewModelPanel=e.Base.create("itsaviewmodelpanel",e.ITSAPanel,[],null,{ATTRS:{bodyView:{value:null,writeOnce:!0},closableByEscape:{value:!1,validator:function(e){return typeof e===k}},editable:{value:!1,validator:function(e){return typeof e===k}},footerTemplate:{value:null,validator:function(e){return typeof e===L}},footerView:{value:null,writeOnce:!0},headerView:{value:null,readOnly:!0},hideOnBtn:{value:!0,validator:function(e){return typeof e===k}},noHideOnLoad:{value:!0,validator:function(e){return typeof e===k}},noHideOnReset:{value:!0,validator:function(e){return typeof e===k}},noHideOnSave:{value:!1,validator:function(e){return typeof e===k}},noHideOnSubmit:{value:!1,validator:function(e){return typeof e===k}},model:{value:{},validator:function(t){return t===null||s.isObject(t)||typeof t===L||t instanceof e.Model}},template:{value:null,validator:function(e){return typeof e===L}}}}),n.prototype.initializer=function(){var t=this,n=t.get(b),r=t.get(m);t._eventhandlers=[],t._partOfMultiView=!0,t._set(h,new e.ITSAViewModel({model:n,template:t.get(v),editable:t.get(y),styled:!1,focusManaged:!1,partOfMultiView:!0})),r&&t._set(d,new e.ITSAViewModel({model:n,template:r,editable:!1,styled:!1,focusManaged:!1,partOfMultiView:!0}))},n.prototype.addCustomBtn=function(e,t,n){var r=this,i=r.get(h),s=r.get(d);i.addCustomBtn(e,t,n),s&&s.addCustomBtn(e,t,n)},n.prototype.addCustomBtns=function(e){var t=this;s.isArray(e)&&i.each(e,function(e){e.buttonId&&e.labelHTML&&t.addCustomBtn(e.buttonId,e.labelHTML,e.config)})},n.prototype.bindUI=function(){var t=this,i=t.get(f),s,l;n.superclass.bindUI.apply(t),s=t._eventhandlers,l=t.get(h),l.addTarget(t),s.push(t.after(y+E,function(e){l.set(y,e.newVal)})),s.push(t.after(w+E,function(n){var i=n.newVal,s;i||(t._pickerVis&&e.ItsaDateTimePicker.hide(!0),s=t.get(b),s.toJSONUI&&(r.tipsyOK._lastnode&&s._FORM_elements[r.tipsyOK._lastnode.get(a)]&&r.tipsyOK.hideTooltip(),r.tipsyInvalid._lastnode&&s._FORM_elements[r.tipsyInvalid._lastnode.get(a)]&&r.tipsyInvalid.hideTooltip()))})),s.push(t.after(b+E,function(e){var n=t.get(d);l.set(b,e.newVal),n&&n.set(b,e.newVal)})),s.push(t.after(v+E,function(e){l.set(v,e.newVal),i.pluginReady(B,o).then(function(e){e.refresh(i),i.hasClass(g)&&e.focusInitialItem()})})),s.push(l.on(u,function(e){if(e.target!==t){var n=u,r={type:n,model:t.get(b),modelEventFacade:e,target:t};t.fire(n,r)}})),s.push(t.after(["*:"+T,"*:"+N+S],function(e){t.fire(C,{buttonNode:e.target})})),s.push(t.after(["*:"+A,"*:"+H],function(n){var r=n.target;r instanceof e.Model&&t.get(w)&&i.pluginReady(B,o).then(function(e){r.enableUI(),i.hasClass(g)&&e.focusInitialItem()})})),s.push(t.on(m+E,function(n){var r=n.newVal,s=n.prevVal,u;r&&(s?t.get(d).set("template",r):(u=new e.ITSAViewModel({model:t.get(b),template:r,editable:!1,styled:!1,focusManaged:!1,partOfMultiView:!0}),t._set(d,u),t._renderFooter())),s&&!r&&t._set(d,null),i.pluginReady(B,o).then(function(e){e.refresh(i),i.hasClass(g)&&e.focusInitialItem()})})),s.push(t.after(["*:"+x],function(e){var n=e.buttonNode,r=n&&n.get(P);n&&t.get("hideOnBtn")&&r!==S&&(!t.get(F)||r!==H)&&(!t.get(j)||r!==A)&&(!t.get(I)||r!==O)&&(!t.get(q)||r!==_)&&t.fire(C,{buttonNode:n})})),s.push(t._header.delegate(x,function(e){var n=e.target,r=n.get(P),i=n.hasClass(W);!i&&t.get("hideOnBtn")&&r!==S&&(!t.get(F)||r!==H)&&(!t.get(j)||r!==A)&&(!t.get(I)||r!==O)&&(!t.get(q)||r!==_)&&t.fire(C,{buttonNode:n})},N)),s.push(t.on(C,function(e){var n=t.get(b),r=t.get(y),i=e.buttonNode,s=i.get(P),o=n.getUnvalidatedUI(),u={target:n,nodelist:o,src:e.type};X[s]&&r&&n&&n.toJSONUI&&!o.isEmpty()&&(e.preventDefault(),n.fire(z,u))})),s.push(t.on(["*:"+O,"*:"+_,"*:"+A,"*:"+D],function(n){var r=n.promise,s=n.target,u=n.type.split(":")[1],a=n.options||{},f=u===D&&(a.remove||a[M]),l;if(!f&&s instanceof e.Model){if(u===O||u===_)l=s.getAttrs(),s.UIToModel();t._lockedBefore=t._locked,t.lockPanel(!0),t._setSpin(u,!0),u===D||r.then(function(){(u===A||u===O||u===_)&&s.setResetAttrs()},function(){return(u===O||u===_)&&s.setAttrs(l,{fromInternal:!0}),!0}).then(function(){t._setSpin(u,!1),t._lockedBefore||t.unlockPanel(),i.hasClass(g)&&i.pluginReady(B,o).then(function(e){e.focusInitialItem()})})}})),s.push(t.on("*:datepickerclick",function(){t.lockPanel(),t._pickerVis=!0,t.once("*:"+u,function(){t._pickerVis=!1,t.unlockPanel()})}))},n.prototype.lockPanel=function(){var e=this,t=e.get(h),n=e.get(d);t.lockView(),n?n.lockView():e._footercont.all("button").addClass(U),arguments[0]||(e._locked=!0)},n.prototype.unlockPanel=function(){var e=this,t=e.get(h),n=e.get(d);t.unlockView(),n?n.unlockView():e._footercont.all("button").removeClass(U),e._locked=!1},n.prototype.removeButtonLabel=function(e){var t=this,n=t.get(h),r=t.get(d);n.removeButtonLabel(e),r&&r.removeButtonLabel(e)},n.prototype.removeCustomBtn=function(e){var t=this,n=t.get(h),r=t.get(d);n.removeCustomBtn(e),r&&r.removeCustomBtn(e)},n.prototype.removeHotKey=function(e){var t=this,n=t.get(h),r=t.get(d);n.removeHotKey(e),r&&r.removeHotKey(e)},n.prototype.setButtonLabel=function(e,t){var n=this,r=n.get(h),i=n.get(d);r.setButtonLabel(e,t),i&&i.setButtonLabel(e,t)},n.prototype.setButtonLabels=function(e){var t=this;s.isArray(e)&&i.each(e,function(e){e.buttonType&&e.labelHTML&&t.setButtonLabel(e.buttonType,e.labelHTML)})},n.prototype.setHotKey=function(e,t){var n=this,r=n.get(h),i=n.get(d);r.setHotKey
(e,t),i&&i.setHotKey(e,t)},n.prototype.setHotKeys=function(e){var t=this;s.isArray(e)&&i.each(e,function(e){e.buttonType&&e.hotkey&&t.setHotKey(e.buttonType,e.hotkey)})},n.prototype.syncUI=function(){var e=this,t=e.get(h),n=e.get(d);e.get(l)&&(t.render(),n&&n.render())},n.prototype.translate=function(t){return e.ITSAViewModel.translate(t)},n.translatePromise=function(t){return e.ITSAViewModel.translatePromise(t)},n.prototype.translatePromise=n.translatePromise,n.prototype.destructor=function(){var e=this,t=e.get(h),n=e.get(d);e._clearEventhandlers(),t.removeTarget(e),t&&t.destroy(),n&&n.destroy()},n.prototype._clearEventhandlers=function(){var e=this;i.each(e._eventhandlers,function(e){e.detach()})},n.prototype._setSpin=function(e,t){var n=this,r=n.get(f).all('[data-buttonsubtype="'+e+'"] i');r.toggleClass("itsaicon-form-loading",t),r.toggleClass("itsa-busy",t)}},"@VERSION@",{requires:["node-pluginhost","base-build","base-base","event-outside","model","gallery-itsapanel","gallery-itsaviewmodel","gallery-itsaformelement"]});
