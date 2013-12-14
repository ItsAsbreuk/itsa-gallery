YUI.add("gallery-itsaviewmodel",function(e,t){"use strict";function wn(){}var n,r=4e3,i=e.Lang,s=e.Array,o=e.Object,u=e.Intl,a="itsa",f=a+"-",l="pure-form",c=l+" "+l+"-aligned",h=a+"button-iconleft",p='<i class="itsaicon-form-{type}"></i>',d=e.Template.Micro,v="FORM",m="template",g="Change",y="tagName",b="gallery-",w=a+"viewmodel",E=f+"focused",S="styled",x="button",T="model",N="Save",C="Submit",k="Load",L="Destroy",A="Reset",O="Promise",M="destroyed",_="delete",D="_defFn_",P="status",H=P+"bar",B=P+"Bar",j="boolean",F="string",I="editable",q="container",R="viewrendered",U="_defPrevFn_",z=a+"tabkeymanager",W="focusManaged",X="disabled",V="data-itsa"+H,$="pure-"+x+"-"+X,J={button:!0,destroy:!0,remove:!0,reset:!0,save:!0,submit:!0,load:!0},K={btn_abort:!0,btn_cancel:!0,btn_close:!0,btn_destroy:!0,btn_ignore:!0,btn_load:!0,btn_no:!0,btn_ok:!0,btn_remove:!0,btn_reset:!0,btn_retry:!0,btn_save:!0,btn_submit:!0,btn_yes:!0,imgbtn_abort:!0,imgbtn_cancel:!0,imgbtn_close:!0,imgbtn_destroy:!0,imgbtn_ignore:!0,imgbtn_load:!0,imgbtn_no:!0,imgbtn_ok:!0,imgbtn_remove:!0,imgbtn_reset:!0,imgbtn_retry:!0,imgbtn_save:!0,imgbtn_submit:!0,imgbtn_yes:!0,spinbtn_load:!0,spinbtn_remove:!0,spinbtn_save:!0,spinbtn_submit:!0},Q="destroy",G="remove",Y="load",Z="reset",et="save",tt="submit",nt="click",rt=nt+"outside",it="abort",st="cancel",ot="close",ut="ignore",at="no",ft="ok",lt="retry",ct="yes",ht="btn_",pt=ht+it,dt=ht+st,vt=ht+ot,mt=ht+Q,gt=ht+ut,yt=ht+Y,bt=ht+at,wt=ht+ft,Et=ht+G,St=ht+Z,xt=ht+lt,Tt=ht+et,Nt=ht+tt,Ct=ht+ct,kt="img",Lt=kt+pt,At=kt+dt,Ot=kt+vt,Mt=kt+mt,_t=kt+gt,Dt=kt+yt,Pt=kt+bt,Ht=kt+wt,Bt=kt+Et,jt=kt+St,Ft=kt+xt,It=kt+Tt,qt=kt+Nt,Rt=kt+Ct,Ut="spin",zt=Ut+yt,Wt=Ut+Et,Xt=Ut+Tt,Vt=Ut+Nt,$t="uppercase",Jt="lowercase",Kt="capitalize",Qt=f+x+"-",Gt=Qt+$t,Yt=Qt+Jt,Zt=Qt+Kt,en=x+"Transform",tn=b+a+H,nn=b+a+T+"syncpromise",rn="itsaview-",sn=rn+H,on="</div>",un='<div class="'+sn+'">'+on,an='<div class="'+rn+'wrapper">',fn="focusnext",ln="validationerror",cn="uichanged",hn=x+nt,pn=x+ot,dn=Q+nt,vn=G+nt,mn=Y+nt,gn=tt+nt,yn=Z+nt,bn=et+nt;e.mix(wn.prototype,{cleanupWidgets:function(t){var n=this,r=e.Widget;r&&n.all(".yui3-widget").each(function(e){if(n.one("#"+e.get("id"))){var i=r.getByNode(e);i&&i.destroy(t)}})},cleanup:function(e){var t=this;e&&t.cleanupWidgets(!0),t.get("childNodes").destroy(!0)}},!0),e.Node.ITSANodeCleanup=wn,e.Base.mix(e.Node,[wn]),n=e.ITSAViewModel=e.Base.create(w,e.View,[],{},{ATTRS:{buttonTransform:{value:null,validator:function(e){return e===null||e===$t||e===Jt||e===Kt}},editable:{value:!1,validator:function(e){return typeof e===j},getter:function(e){var t=this.get(T);return e&&t&&t.toJSONUI}},focusManaged:{value:!0,validator:function(e){return typeof e===j}},model:{value:{},validator:function(t){return t===null||i.isObject(t)||typeof t===F||t instanceof e.Model},setter:"_setModel"},partOfMultiView:{value:!1,initOnly:!0,validator:function(e){return typeof e===j}},statusBar:{value:!1,validator:function(e){return typeof e===j}},styled:{value:!0,validator:function(e){return typeof e===j}},template:{value:null,validator:function(e){return typeof e===F},getter:function(e){var t=this;return t._textTemplate||(e===null?t.warnNoTemplate?t._intl.undefined_template:"":e)}}}}),n.prototype._formcss_loaded=!1,n.prototype.initializer=function(){var t=this,n=t.get(T),r;r=t._renderPromise=new e.Promise(function(e){t._renderPromiseResolve=e}),t._intl=u.get(b+w),t.warnNoTemplate=!0,s.each([dn,vn,yn,bn,gn,hn,mn,cn],function(n){t[U+n]=function(e){e.modelEventFacade.preventDefault()},t.publish(n,{preventedFn:e.bind(t[U+n],t),emitFacade:!0})}),t.publish(fn,{defaultFn:e.bind(t[D+fn],t),emitFacade:!0}),t.publish(ln,{defaultFn:e.bind(t[D+ln],t),preventedFn:e.bind(t[U+ln],t),emitFacade:!0}),t._eventhandlers=[],t._contIsForm=t.get(q).get(y)===v,n&&n.addTarget&&n.addTarget(t),n&&t.get(m)&&t._setTemplateRenderer(),t._customBtns={},t._hotkeys={},t._customBtnLabels={},t._createButtons()},n.prototype.addCustomBtn=function(e,t,n){var r=this;K[e]||(r._customBtns[e]={config:n,labelHTML:t||e})},n.prototype.addCustomBtns=function(e){var t=this;i.isArray(e)&&s.each(e,function(e){e.buttonId&&e.labelHTML&&t.addCustomBtn(e.buttonId,e.labelHTML,e.config)})},n.prototype.addMessageTarget=function(e){var t=this.get(T);t&&t.addMessageTarget&&t.addMessageTarget(e)},n.prototype.blur=function(){this.get(q).removeClass(E)},n.prototype.focus=function(){var e=this,t=e.get(q);e.isRendered().then(function(){t.addClass(E),t.pluginReady(z,r).then(function(e){e._retrieveFocus()})})},n.prototype.focusInitialItem=function(){var e=this,t=e.get(q);return t.pluginReady(z,r).then(function(e){t.addClass(E),e.focusInitialItem()})},n.prototype.isRendered=function(){return this._renderPromise},n.prototype.lockView=function(){var e=this,t=e.get(T),n=arguments[0],r=e.get(I)&&t&&t.toJSONUI;r?t.disableUI():e.get(q).all("button").addClass($),n||(e._locked=!0)},n.prototype.removeButtonLabel=function(e){var t=this;e?delete t._customBtnLabels[e]:t._customBtnLabels={}},n.prototype.removeCustomBtn=function(e){var t=this;delete this._customBtns[e],e?delete t._customBtns[e]:t._customBtns={}},n.prototype.removeHotKey=function(e){var t=this;e?delete t._hotkeys[e]:t._hotkeys={},t._createButtons()},n.prototype.removeMessageTarget=function(){var e=this.get(T);e&&e.removeMessageTarget&&e.removeMessageTarget()},n.prototype.removePrimaryButton=function(){var e=this,t=e._buttons;s.each(t,function(e){e.config.primary=!1})},n.prototype.render=function(t,n){var r=this,i=r.get(q),s=r.get(T),o=r.get(I),u=r.get(B),a=r._itsastatusbar,f=e.Global.ItsaDateTimePicker,l=t||!s?"":r._modelRenderer(s),h;return n&&!r.get("partOfMultiView")&&s&&s.toJSONUI&&s.cleanup(),o||r._isMicroTemplate?(o&&(r._initialEditAttrs=s.getAttrs()),i.cleanup(r._rendered)):(!n||!r.get("partOfMultiView"))&&i.cleanup(!1),r._rendered||(i.inDoc()||(r._newContainer=!0)&&e.one("body").append(i),i.addClass(w),i.toggleClass(w+"-"+S,r.get(S)),r._setButtonTransform(r.get(en)),r._bindUI()),r._rendered=!0,l.length>0&&o&&r.
_viewNeedsForm&&(l=(u?an:"")+'<form class="'+c+'">'+l+"</form>"+(u?on:"")),u&&(a||(l+=un)),i.setHTML(l),u?(i.setAttribute(V,"true"),a?i.append(a.get("parentNode")):e.usePromise(tn).then(function(){var t=i.one("."+sn);a=r._itsastatusbar=new e.ITSAStatusbar({parentNode:t}),r._viewName=a._viewName,s&&e.batch(e.usePromise(nn),a.isReady()).then(function(){s.addMessageTarget(r._itsastatusbar)}),r._repositionStatusbar()})):(i.removeAttribute(V),r._viewName=null),h=o&&r.get(W),r._setFocusManager(h),h?e.usePromise(b+z).then(function(){r._renderPromiseResolve(),r.fire(R,{target:r})}):(r._renderPromiseResolve(),r.fire(R,{target:r})),f&&f.panel.get("visible")&&f.hide(!0),r},n.prototype.setButtonLabel=function(e,t){var n=this;K[e]&&typeof t===F&&t.length>0&&(n._customBtnLabels[e]=t)},n.prototype.setButtonLabels=function(e){var t=this;i.isArray(e)&&s.each(e,function(e){e.buttonType&&e.labelHTML&&t.setButtonLabel(e.buttonType,e.labelHTML)})},n.prototype.setHotKey=function(e,t){var n=this;K[e]&&(typeof t===F||i.isObject(t))&&(n._hotkeys[e]=t)&&n._createButtons()},n.prototype.setHotKeys=function(e){var t=this;i.isArray(e)&&s.each(e,function(e){e.buttonType&&e.hotkey&&t.setHotKey(e.buttonType,e.hotkey)})},n.prototype.setPrimaryButton=function(e){var t=this,n=t._buttons;K[e]&&s.each(n,function(t){t.config.primary=t.propertykey===e})},n.prototype.toJSON=function(){var t=this.get(T);return t instanceof e.Model?t.toJSON():t},n.prototype.translate=function(e){return this._intl[e]||e},n.translatePromise=function(t){return e.usePromise("intl").then(function(){var e=u.get(b+w);return e[t]||t},function(){return t})},n.prototype.translatePromise=n.translatePromise,n.prototype.unlockView=function(){var e=this,t=e.get(T),n=e.get(I)&&t&&t.toJSONUI;n?t.enableUI():e.get(q).all("button").removeClass($),e._locked=!1},n.prototype.destructor=function(){var e=this,t=e.get(T),n=e._itsastatusbar,r=e.get(q);t&&t.removeTarget&&t.removeTarget(e),e._itsastatusbar=null,n&&(t&&t.removeMessageTarget(n),n.destroy()),e._clearEventhandlers(),e._customBtns={},e._customBtnLabels={},e._hotkeys={},r.empty(),e._newContainer?r.remove(!0):(r.removeClass(w+"-"+S),r.destroy(!0))},n.prototype._bindUI=function(){var t=this,n=t.get(q),i=t._eventhandlers;i.push(t.after(T+g,function(n){var r=n.prevVal,i=n.newVal,s=r&&r.toJSONUI,o=i&&i.toJSONUI,u=t.get(B);r&&(r.removeTarget&&r.removeTarget(t),u&&r.removeMessageTarget(t._itsastatusbar)),i&&(i.addTarget&&i.addTarget(t),u&&e.usePromise(nn).then(function(){i.addMessageTarget(t._itsastatusbar)})),s!==o&&o&&t.get(m)&&t._setTemplateRenderer(),t.render()})),i.push(t.after(m+g,function(){t.get(T)&&(t._setTemplateRenderer(),t.render())})),i.push(t.after(B+g,e.bind(t.render,t))),i.push(t.after("*:"+Z,function(){t._isMicroTemplate?t.render():n.pluginReady(z,r).then(function(e){e.focusInitialItem()})})),i.push(t.after(I+g,function(){var e=t.get(T);t.get(m)&&e&&e.toJSONUI&&(t._setTemplateRenderer(),t.render())})),i.push(t.after("*:change",function(n){n.target instanceof e.Model&&!t.get(I)&&t.render(!1,!0)})),t.get("partOfMultiView")||i.push(t.on("*:datepickerclick",function(){t.lockView(),t.once("*:"+fn,function(){t.unlockView()})})),t.get("partOfMultiView")||i.push(t.on("*:"+Z,e.bind(t._disableSaveBtns,t))),t.get("partOfMultiView")||i.push(t.on(["*:"+tt,"*:"+et,"*:"+Y,"*:"+Q],function(i){var s=i.promise,o=i.target,u=i.type.split(":")[1],a=i.options,f=e.ITSAMessageController,l=o._itsamessageListener||f&&f._targets[T+"sync"],c=u===Q&&a&&(a.remove||a[_]),h;if(!c&&o instanceof e.Model&&(u!==et||o.isModified())){t._lockedBefore=t._locked,t.lockView(!0);if(u===tt||u===et)h=o.getAttrs(),o.UIToModel();l||t._setSpin(u,!0),u===Q||s.then(function(){(u===Y||u===tt||u===et)&&o.setResetAttrs()},function(){return(u===tt||u===et)&&o.setAttrs(h,{fromInternal:!0}),!0}).then(function(){l||t._setSpin(u,!1),t._lockedBefore||t.unlockView(),u===tt||t._disableSaveBtns(),n.pluginReady(z,r).then(function(e){e.focusInitialItem()})})}else u===et&&t._disableSaveBtns()})),i.push(t.after("*:destroy",function(n){n.target instanceof e.Model&&t.render(!0)})),i.push(t.after(q+g,function(e){t._contIsForm=e.newVal.get(y)===v})),i.push(n.after(nt,function(){n.addClass(E)})),i.push(n.after(rt,function(){n.removeClass(E)})),i.push(e.Intl.after("intl:lang"+g,function(){t._intl=e.Intl.get(b+w),t.render()})),i.push(t.after(S+g,function(e){n.toggleClass(w+"-"+S,e.newVal)})),i.push(t.after(W+g,function(e){t._setFocusManager(e.newVal)})),i.push(t.after(en+g,function(e){t._setButtonTransform(e.newVal)})),i.push(t.after(cn,e.bind(t._enableSaveBtns,t))),s.each([nt,ln,cn,fn],function(e){i.push(t.on("*:"+e,function(n){var r=!0,i=e,s,o;n.target!==t&&n.currentTarget===t&&(e===nt&&(o=n.type.split(":")[0],J[o]?i=o+e:r=!1),s={type:i,model:t.get(T),modelEventFacade:n,target:t,value:n.value,node:n.node,nodeid:n.nodeid,nodelist:n.nodelist,formElement:n.formElement},r&&(t.fire(i,s),i===hn&&n.value===ot&&(s.type=i=pn,t.fire(i,s))))}))})},s.each([N,C,k,L,A],function(t){n.prototype[T+t]=function(){var n=this,r=n.get(T);r instanceof e.Model&&!r.get(M)&&r[D+t]&&r[D+t]()}}),s.each([N,C,k,L],function(t){n.prototype[T+t+O]=function(){var n=this,r=n.get(T),i=t.toLowerCase();return r instanceof e.Model&&!r.get(M)&&r[i+O]||null}}),n.prototype._clearEventhandlers=function(){s.each(this._eventhandlers,function(e){e.detach()})},n.prototype._createButtons=function(){var e=this,t=e._customBtnLabels,n=e._hotkeys;e._buttons=[{propertykey:pt,type:x,config:{value:it,hotkey:n[pt]},labelHTML:function(){return t[pt]?i.sub(t[pt],{label:e._intl[it]}):e._intl[it]}},{propertykey:dt,type:x,config:{value:st,hotkey:n[dt]},labelHTML:function(){return t[dt]?i.sub(t[dt],{label:e._intl[st]}):e._intl[st]}},{propertykey:vt,type:x,config:{value:ot,hotkey:n[vt]},labelHTML:function(){return t[vt]?i.sub(t[vt],{label:e._intl[ot]}):e._intl[ot]}},{propertykey:mt,type:Q,config:{value:Q,hotkey:n[mt]},labelHTML:function(){return t[mt]?i.sub(t[mt],{label:e._intl[Q]}):e._intl[Q]}},{propertykey:gt,type:x,config:{value:ut,
hotkey:n[gt]},labelHTML:function(){return t[gt]?i.sub(t[gt],{label:e._intl[ut]}):e._intl[ut]}},{propertykey:yt,type:Y,config:{value:Y,hotkey:n[yt]},labelHTML:function(){return t[yt]?i.sub(t[yt],{label:e._intl[Y]}):e._intl[Y]}},{propertykey:bt,type:x,config:{value:at,hotkey:n[bt]},labelHTML:function(){return t[bt]?i.sub(t[bt],{label:e._intl[at]}):e._intl[at]}},{propertykey:wt,type:x,config:{value:ft,hotkey:n[wt]},labelHTML:function(){return t[wt]?i.sub(t[wt],{label:e._intl[ft]}):e._intl[ft]}},{propertykey:Et,type:G,config:{value:G,hotkey:n[Et]},labelHTML:function(){return t[Et]?i.sub(t[Et],{label:e._intl[G]}):e._intl[G]}},{propertykey:St,type:Z,config:{value:Z,hotkey:n[St]},labelHTML:function(){return t[St]?i.sub(t[St],{label:e._intl[Z]}):e._intl[Z]}},{propertykey:xt,type:x,config:{value:lt,hotkey:n[xt]},labelHTML:function(){return t[xt]?i.sub(t[xt],{label:e._intl[lt]}):e._intl[lt]}},{propertykey:Tt,type:et,config:{classname:$,value:et,hotkey:n[Tt]},labelHTML:function(){return t[Tt]?i.sub(t[Tt],{label:e._intl[et]}):e._intl[et]}},{propertykey:Nt,type:tt,config:{value:tt,hotkey:n[Nt]},labelHTML:function(){return t[Nt]?i.sub(t[Nt],{label:e._intl[tt]}):e._intl[tt]}},{propertykey:Ct,type:x,config:{value:ct,hotkey:n[Ct]},labelHTML:function(){return t[Ct]?i.sub(t[Ct],{label:e._intl[ct]}):e._intl[ct]}},{propertykey:Lt,type:x,config:{classname:h,value:it,hotkey:n[Lt]},labelHTML:function(){return t[Lt]?i.sub(t[Lt],{label:e._intl[it]}):i.sub(p,{type:it})+e._intl[it]}},{propertykey:At,type:x,config:{classname:h,value:st,hotkey:n[At]},labelHTML:function(){return t[At]?i.sub(t[At],{label:e._intl[st]}):i.sub(p,{type:st})+e._intl[st]}},{propertykey:Ot,type:x,config:{classname:h,value:ot,hotkey:n[Ot]},labelHTML:function(){return t[Ot]?i.sub(t[Ot],{label:e._intl[ot]}):i.sub(p,{type:st})+e._intl[ot]}},{propertykey:Mt,type:Q,config:{classname:h,value:Q,hotkey:n[Mt]},labelHTML:function(){return t[Mt]?i.sub(t[Mt],{label:e._intl[Q]}):i.sub(p,{type:Q})+e._intl[Q]}},{propertykey:_t,type:x,config:{classname:h,value:ut,hotkey:n[_t]},labelHTML:function(){return t[_t]?i.sub(t[_t],{label:e._intl[ut]}):i.sub(p,{type:ut})+e._intl[ut]}},{propertykey:Dt,type:Y,config:{classname:h,value:Y,hotkey:n[Dt]},labelHTML:function(){return t[Dt]?i.sub(t[Dt],{label:e._intl[Y]}):i.sub(p,{type:Y})+e._intl[Y]}},{propertykey:Pt,type:x,config:{classname:h,value:at,hotkey:n[Pt]},labelHTML:function(){return t[Pt]?i.sub(t[Pt],{label:e._intl[at]}):i.sub(p,{type:at})+e._intl[at]}},{propertykey:Ht,type:x,config:{classname:h,value:ft,hotkey:n[Ht]},labelHTML:function(){return t[Ht]?i.sub(t[Ht],{label:e._intl[ft]}):i.sub(p,{type:ft})+e._intl[ft]}},{propertykey:Bt,type:G,config:{classname:h,value:G,hotkey:n[Bt]},labelHTML:function(){return t[Bt]?i.sub(t[Bt],{label:e._intl[G]}):i.sub(p,{type:G})+e._intl[G]}},{propertykey:jt,type:Z,config:{classname:h,value:Z,hotkey:n[jt]},labelHTML:function(){return t[jt]?i.sub(t[jt],{label:e._intl[Z]}):i.sub(p,{type:Z})+e._intl[Z]}},{propertykey:Ft,type:x,config:{classname:h,value:lt,hotkey:n[Ft]},labelHTML:function(){return t[Ft]?i.sub(t[Ft],{label:e._intl[lt]}):i.sub(p,{type:lt})+e._intl[lt]}},{propertykey:It,type:et,config:{classname:$+" "+h,value:et,hotkey:n[It]},labelHTML:function(){return t[It]?i.sub(t[It],{label:e._intl[et]}):i.sub(p,{type:et})+e._intl[et]}},{propertykey:qt,type:tt,config:{classname:h,value:tt,hotkey:n[qt]},labelHTML:function(){return t[qt]?i.sub(t[qt],{label:e._intl[tt]}):i.sub(p,{type:tt})+e._intl[tt]}},{propertykey:Rt,type:x,config:{classname:h,value:ct,hotkey:n[Rt]},labelHTML:function(){return t[Rt]?i.sub(t[Rt],{label:e._intl[ct]}):i.sub(p,{type:ct})+e._intl[ct]}},{propertykey:zt,type:Y,config:{spinbusy:!0,classname:h,value:Y,hotkey:n[zt]},labelHTML:function(){return t[zt]?i.sub(t[zt],{label:e._intl[Y]}):i.sub(p,{type:Y})+e._intl[Y]}},{propertykey:Wt,type:G,config:{spinbusy:!0,classname:h,value:G,hotkey:n[Wt]},labelHTML:function(){return t[Wt]?i.sub(t[Wt],{label:e._intl[G]}):i.sub(p,{type:G})+e._intl[G]}},{propertykey:Xt,type:et,config:{spinbusy:!0,classname:$+" "+h,value:et,hotkey:n[Xt]},labelHTML:function(){return t[Xt]?i.sub(t[Xt],{label:e._intl[et]}):i.sub(p,{type:et})+e._intl[et]}},{propertykey:Vt,type:tt,config:{spinbusy:!0,classname:h,value:tt,hotkey:n[Vt]},labelHTML:function(){return t[Vt]?i.sub(t[Vt],{label:e._intl[tt]}):i.sub(p,{type:tt})+e._intl[tt]}}]},n.prototype[D+fn]=function(){var e=this,t=e.get(q);t.hasClass(E)&&t.pluginReady(z,r).then(function(e){e.next()},function(){})},n.prototype[U+ln]=function(e){e.modelEventFacade.preventDefault()},n.prototype[D+ln]=function(t){var n=t.nodelist&&t.nodelist.item(0);n&&(n.getDOMNode()===e.config.doc.activeElement?e.ITSAFormElement.tipsyInvalid._handleDelegateStart({currentTarget:n}):n.focus(),n.scrollIntoView())},n.prototype._disableSaveBtns=function(){var e=this,t=e.get(q).all('button[data-buttonsubtype="save"]');t.addClass($)},n.prototype._enableSaveBtns=function(){var e=this,t=e.get(q).all('button[data-buttonsubtype="save"]');t.removeClass($)},n.prototype._setButtonTransform=function(e){var t=this.get(q);t.toggleClass(Gt,e===$t),t.toggleClass(Yt,e===Jt),t.toggleClass(Zt,e===Kt)},n.prototype._setFocusManager=function(t){var n=this,r=n.get(q),i=r.itsatabkeymanager;t?e.use(b+z,function(){n.get(M)||(i?i.refresh(r):(r.plug(e.Plugin.ITSATabKeyManager),i=r.itsatabkeymanager,n.addTarget(i)),r.hasClass(E)&&r.itsatabkeymanager.focusInitialItem())}):i&&n.removeTarget(i)&&r.unplug(z)},n.prototype._setModel=function(t){var n=this;return typeof t===F?(n._textTemplate=t,t={}):n._textTemplate=null,!n._formcss_loaded&&t&&t.toJSONUI&&(n._formcss_loaded=!0,e.use("gallerycss-itsa-form")),t},n.prototype._setSpin=function(e,t){var n=this,r=n.get(q).all('[data-buttonsubtype="'+e+'"] i');r.toggleClass("itsaicon-form-loading",t),r.toggleClass("itsa-busy",t)},n.prototype._setTemplateRenderer=function(){var e=this,t=e.get(m),n=e.get(I),r,u,a,f;r=function(){var e=/<%(.+)%>/;return e.test(t)},f=function(n,r){var i,u,a,f,l;s.each(e._buttons,function(e){i=e.propertykey
,l=new RegExp("{"+i+"}"),l.test(t)&&(u=e.type,a=e.labelHTML(),f=e.config,n[i]=r._renderBtnFns[u]&&r._renderBtnFns[u].call(r,a,f))}),o.each(e._customBtns,function(e,i){l=new RegExp("{"+i+"}"),l.test(t)&&(a=e.labelHTML,f=e.config,n[i]=r._renderBtnFns[x]&&r._renderBtnFns[x].call(r,a,f))})},u=e._isMicroTemplate=r(),u?(a=d.compile(t),e._modelRenderer=function(r){var i=n?r.toJSONUI(null,t):e.toJSON();return r.toJSONUI&&f(i,r),a(i)}):e._modelRenderer=function(r){var s=n?r.toJSONUI(null,t):e.toJSON();return r.toJSONUI&&f(s,r),i.sub(t,s)},e._viewNeedsForm=!e._contIsForm&&!/<form([^>]*)>/.test(t)}},"@VERSION@",{requires:["yui-base","gallery-itsapluginpromise","intl","base-base","base-build","view","widget-base","template-base","template-micro","model","node-style","event-custom","event-outside","event-custom-base","oop","promise","pluginhost-base","gallery-itsamodulesloadedpromise","gallerycss-itsa-base"],lang:["ar","bg","bs","cs","da","de","en","es","fa","fi","fr","he","hi","hr","hu","it","ja","nb","nl","pl","pt","ru","sk","sr","sv","uk","zh"],skinnable:!0});
