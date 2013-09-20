YUI.add("gallery-itsaviewmodelpanel",function(e,t){"use strict";var n,r=e.Lang,i="destroyed",s="contentBox",o="gallery-",u="View",a="body"+u,f="footer",l=f+u,c="template",h=f+"Template",p="itsa-focused",d="editable",v="model",m="focused",g="visible",y="Change",b="close",w="click",E=b+w,S="button",x=S+":hide",T="boolean",N="string",C="load",k="value",L="reset",A="focusManaged",O="itsatabkeymanager",M="noHideOnLoad",_="noHideOnReset",D="focusnext",P={ok:!0,retry:!0,save:!0,submit:!0};n=e.ITSAViewModelPanel=e.Base.create("itsaviewmodelpanel",e.ITSAPanel,[],null,{ATTRS:{bodyView:{value:null,writeOnce:!0},editable:{value:!1,validator:function(e){return typeof e===T}},focusManaged:{value:!0,validator:function(e){return typeof e===T}},footerTemplate:{value:null,validator:function(e){return typeof e===N}},footerView:{value:null,writeOnce:!0},headerView:{value:null,readOnly:!0},hideOnBtnFooter:{value:!0,validator:function(e){return typeof e===T}},hideOnBtnHeader:{value:!1,validator:function(e){return typeof e===T}},noHideOnLoad:{value:!0,validator:function(e){return typeof e===T}},noHideOnReset:{value:!0,validator:function(e){return typeof e===T}},model:{value:{},validator:function(t){return t===null||r.isObject(t)||typeof t===N||t instanceof e.Model}},template:{value:null,validator:function(e){return typeof e===N}}}}),n.prototype.initializer=function(){var t=this,n=t.get(v),r=t.get(h);t._eventhandlers=[],t._set(a,new e.ITSAViewModel({model:n,template:t.get(c),editable:t.get(d),styled:!1,focusManaged:!1})),r&&t._set(l,new e.ITSAViewModel({model:n,template:r,editable:!1,styled:!1,focusManaged:!1})),t.publish(D,{defaultFn:e.bind(t._defFn_focusnext,t),emitFacade:!0}),t.get(g)&&t.get(s).addClass(p)},n.prototype.addCustomBtn=function(e,t,n){var r=this,i=r.get(a),s=r.get(l);i.addCustomBtn(e,t,n),s&&s.addCustomBtn(e,t,n)},n.prototype.bindUI=function(){var t=this,n=t.get(s),r,i,o;t.constructor.superclass.bindUI.apply(t),r=t._eventhandlers,i=t.get(a),o=t.get(l),t._setFocusManager(t.get(A)),r.push(t.after(d+y,function(e){i.set(d,e.newVal)})),r.push(t.after(h+y,function(e){o.set(c,e.newVal)})),r.push(t.after(v+y,function(e){i.set(v,e.newVal),o.set(v,e.newVal)})),r.push(t.after(c+y,function(e){i.set(c,e.newVal)})),r.push(t.after(A+y,function(e){t._setFocusManager(e.newVal)})),r.push(i.on(D,function(e){if(e.target!==t){var n=D,r={type:n,model:t.get(v),modelEventFacade:e,target:t};t.fire(n,r)}})),r.push(t.after("*:"+E,function(e){t.fire(x,{buttonNode:e.target})})),r.push(t.after(m+y,function(e){var r=n.itsatabkeymanager;t.get(s).toggleClass(p,e.newVal),e.newVal&&r&&r._retreiveFocus()})),r.push(t.after(["*:modelload","*:modelreset"],function(e){var r=n.itsatabkeymanager;r&&t.get(g)&&(e.model.enableUI(),r.focusInitialItem())})),r.push(t.after(h+y,function(n){var r=n.newVal,i=n.prevVal;r&&!i&&t._set(l,new e.ITSAViewModel({model:t.get(v),template:r,editable:!1,styled:!1,focusManaged:!1})),i&&!r&&i.destroy()&&t._set(l,null)})),r.push(t._footer.delegate(w,function(e){var n=e.target,r=n.get(k);t.get("hideOnBtnFooter")&&r!==b&&(!t.get(_)||r!==L)&&(!t.get(M)||r!==C)&&t.fire(x,{buttonNode:n})},S)),r.push(t._header.delegate(w,function(e){var n=e.target,r=n.get(k);t.get("hideOnBtnHeader")&&r!==b&&(!t.get(_)||r!==L)&&(!t.get(M)||r!==C)&&t.fire(x,{buttonNode:n})},S)),r.push(t.on(x,function(e){var n=t.get(v),r=t.get(d),i=e.buttonNode,s=i.get(k);P[s]&&r&&n&&n.toJSONUI&&!n.validated()&&e.preventDefault()}))},n.prototype.removeButtonLabel=function(e){var t=this,n=t.get(a),r=t.get(l);n.removeButtonLabel(e),r&&r.removeButtonLabel(e)},n.prototype.removeCustomBtn=function(e){var t=this,n=t.get(a),r=t.get(l);n.removeCustomBtn(e),r&&r.removeCustomBtn(e)},n.prototype.removeHotKey=function(e){var t=this,n=t.get(a),r=t.get(l);n.removeHotKey(e),r&&r.removeHotKey(e)},n.prototype.setButtonLabel=function(e,t){var n=this,r=n.get(a),i=n.get(l);r.setButtonLabel(e,t),i&&i.setButtonLabel(e,t)},n.prototype.setHotKey=function(e,t){var n=this,r=n.get(a),i=n.get(l);r.setHotKey(e,t),i&&i.setHotKey(e,t)},n.prototype.translate=function(e){return this.get(a).translate(e)},n.prototype.destructor=function(){var e=this,t=e.get(s),n=e.get(a),r=e.get(l);e._clearEventhandlers(),t.hasPlugin(O)&&t.unplug(O),n&&n.destroy(),r&&r.destroy()},n.prototype._defFn_focusnext=function(){var e=this,t=e.get(s).itsatabkeymanager;t&&t.next()},n.prototype._setFocusManager=function(t){var n=this,r=n.get(s),u=r.itsatabkeymanager;t?e.use(o+O,function(){n.get(i)||(u?u.refresh(r):(r.plug(e.Plugin.ITSATabKeyManager),u=r.itsatabkeymanager),r.hasClass(p)&&u.focusInitialItem())}):u&&r.unplug(O)}},"@VERSION@",{requires:["node-pluginhost","base-build","base-base","event-outside","model","gallery-itsapanel","gallery-itsaviewmodel"]});
