YUI.add("gallery-itsaviewmodel",function(e,t){"use strict";function Qt(){}var n,r=4e3,i=e.Lang,s=e.Array,o=e.Object,u=e.Intl,a="pure-form",f=a+" "+a+"-aligned",l="itsabutton-iconleft",c='<i class="itsaicon-form-{type}"></i>',h=e.Template.Micro,p="FORM",d="Change",v="tagName",m="gallery-",g="itsaviewmodel",y="itsa-focused",b="styled",w="button",E="model",S="Save",x="Submit",T="Load",N="Destroy",C="Reset",k="Promise",L="destroyed",A="delete",O="_defFn_",M="boolean",_="string",D="editable",P="container",H="_defPrevFn_",B="itsatabkeymanager",j="focusManaged",F="disabled",I="pure-"+w+"-"+F,q={button:!0,destroy:!0,remove:!0,reset:!0,save:!0,submit:!0,load:!0},R={btn_abort:!0,btn_cancel:!0,btn_close:!0,btn_destroy:!0,btn_ignore:!0,btn_load:!0,btn_no:!0,btn_ok:!0,btn_remove:!0,btn_reset:!0,btn_retry:!0,btn_save:!0,btn_submit:!0,btn_yes:!0,imgbtn_abort:!0,imgbtn_cancel:!0,imgbtn_close:!0,imgbtn_destroy:!0,imgbtn_ignore:!0,imgbtn_load:!0,imgbtn_no:!0,imgbtn_ok:!0,imgbtn_remove:!0,imgbtn_reset:!0,imgbtn_retry:!0,imgbtn_save:!0,imgbtn_submit:!0,imgbtn_yes:!0,spinbtn_load:!0,spinbtn_remove:!0,spinbtn_save:!0,spinbtn_submit:!0},U="destroy",z="remove",W="load",X="reset",V="save",$="submit",J="click",K=J+"outside",Q="abort",G="cancel",Y="close",Z="ignore",et="no",tt="ok",nt="retry",rt="yes",it="btn_",st=it+Q,ot=it+G,ut=it+Y,at=it+U,ft=it+Z,lt=it+W,ct=it+et,ht=it+tt,pt=it+z,dt=it+X,vt=it+nt,mt=it+V,gt=it+$,yt=it+rt,bt="img",wt=bt+st,Et=bt+ot,St=bt+ut,xt=bt+at,Tt=bt+ft,Nt=bt+lt,Ct=bt+ct,kt=bt+ht,Lt=bt+pt,At=bt+dt,Ot=bt+vt,Mt=bt+mt,_t=bt+gt,Dt=bt+yt,Pt="spin",Ht=Pt+lt,Bt=Pt+pt,jt=Pt+mt,Ft=Pt+gt,It="focusnext",qt="validationerror",Rt="uichanged",Ut=w+J,zt=w+Y,Wt=U+J,Xt=z+J,Vt=W+J,$t=$+J,Jt=X+J,Kt=V+J;e.mix(Qt.prototype,{cleanupWidgets:function(t){var n=this,r=e.Widget;r&&n.all(".yui3-widget").each(function(e){if(n.one("#"+e.get("id"))){var i=r.getByNode(e);i&&i.destroy(t)}})},cleanup:function(){var e=this;e.cleanupWidgets(!0),e.empty()}},!0),e.Node.ITSANodeCleanup=Qt,e.Base.mix(e.Node,[Qt]),n=e.ITSAViewModel=e.Base.create(g,e.View,[],{},{ATTRS:{editable:{value:!1,validator:function(e){return typeof e===M},getter:function(e){var t=this.get(E);return e&&t&&t.toJSONUI}},focusManaged:{value:!0,validator:function(e){return typeof e===M}},model:{value:{},validator:function(t){return t===null||i.isObject(t)||typeof t===_||t instanceof e.Model},setter:"_setModel"},partOfMultiView:{value:!1,initOnly:!0,validator:function(e){return typeof e===M}},styled:{value:!0,validator:function(e){return typeof e===M}},template:{value:null,validator:function(e){return typeof e===_},getter:function(e){var t=this;return t._textTemplate||(e===null?t.warnNoTemplate?t._intl.undefined_template:"":e)}}}}),n.prototype._formcss_loaded=!1,n.prototype.initializer=function(){var t=this,n=t.get(E);t._intl=u.get(m+g),t.warnNoTemplate=!0,s.each([Wt,Xt,Jt,Kt,$t,Ut,Vt,Rt],function(n){t[H+n]=function(e){e.modelEventFacade.preventDefault()},t.publish(n,{preventedFn:e.bind(t[H+n],t),emitFacade:!0})}),t.publish(It,{defaultFn:e.bind(t[O+It],t),emitFacade:!0}),t.publish(qt,{defaultFn:e.bind(t[O+qt],t),preventedFn:e.bind(t[H+qt],t),emitFacade:!0}),t._eventhandlers=[],t._contIsForm=t.get(P).get(v)===p,t._setTemplateRenderer(t.get(D)),n&&n.addTarget&&n.addTarget(t),t._customBtns={},t._hotkeys={},t._customBtnLabels={},t._createButtons()},n.prototype.addCustomBtn=function(e,t,n){var r=this;R[e]||(r._customBtns[e]={config:n,labelHTML:t||e})},n.prototype.addCustomBtns=function(e){var t=this;i.isArray(e)&&s.each(e,function(e){e.buttonId&&e.labelHTML&&t.addCustomBtn(e.buttonId,e.labelHTML,e.config)})},n.prototype.blur=function(){this.get("container").removeClass(y)},n.prototype.focus=function(){var e=this.get("container");e.addClass(y),e.pluginReady(B,r).then(function(e){e._retreiveFocus()})},n.prototype.lockView=function(){var e=this,t=e.get(E),n=e.get(D)&&t&&t.toJSONUI;n?t.disableUI():e.get("container").all("button").addClass(I),e._locked=!0},n.prototype.removeButtonLabel=function(e){var t=this;e?delete t._customBtnLabels[e]:t._customBtnLabels={}},n.prototype.removeCustomBtn=function(e){var t=this;delete this._customBtns[e],e?delete t._customBtns[e]:t._customBtns={}},n.prototype.removeHotKey=function(e){var t=this;e?delete t._hotkeys[e]:t._hotkeys={},t._createButtons()},n.prototype.removePrimaryButton=function(){var e=this,t=e._buttons;s.each(t,function(e){e.config.primary=!1})},n.prototype.render=function(t){var n=this,r=n.get(P),i=n.get(E),s=n.get(D),o=e.Global.ItsaDateTimePicker,u=t||!i?"":n._modelRenderer(i);if(s||n._isMicroTemplate)s&&(n._initialEditAttrs=i.getAttrs()),r.cleanupWidgets(!0);return n._rendered||(r.inDoc()||e.one("body").append(r),r.addClass(g),r.toggleClass(g+"-"+b,n.get(b)),n._bindUI()),n._rendered=!0,u.length>0&&s&&n._viewNeedsForm&&(u='<form class="'+f+'">'+u+"</form>"),r.setHTML(u),n._setFocusManager(s&&n.get(j)),o&&o.panel.get("visible")&&o.hide(!0),n.fire("viewrendered",{target:n}),n},n.prototype.setButtonLabel=function(e,t){var n=this;R[e]&&typeof t===_&&t.length>0&&(n._customBtnLabels[e]=t)},n.prototype.setButtonLabels=function(e){var t=this;i.isArray(e)&&s.each(e,function(e){e.buttonType&&e.labelHTML&&t.setButtonLabel(e.buttonType,e.labelHTML)})},n.prototype.setHotKey=function(e,t){var n=this;R[e]&&(typeof t===_||i.isObject(t))&&(n._hotkeys[e]=t)&&n._createButtons()},n.prototype.setHotKeys=function(e){var t=this;i.isArray(e)&&s.each(e,function(e){e.buttonType&&e.hotkey&&t.setHotKey(e.buttonType,e.hotkey)})},n.prototype.setPrimaryButton=function(e){var t=this,n=t._buttons;R[e]&&s.each(n,function(t){t.config.primary=t.propertykey===e})},n.prototype.toJSON=function(){var t=this.get(E);return t instanceof e.Model?t.toJSON():t},n.prototype.translate=function(e){return this._intl[e]||e},n.translatePromise=function(t){return e.usePromise("intl").then(function(){var e=u.get(m+g);return e[t]||t},function(){return t})},n.prototype.translatePromise=n.translatePromise,n.prototype.unlockView=function(){var e=this,t=e.get(E),n=e.get(D)&&t&&t.toJSONUI
;n?t.enableUI():e.get("container").all("button").removeClass(I),e._locked=!1},n.prototype.destructor=function(){var e=this,t=e.get(E),n=e.get(P);t&&t.removeTarget&&t.removeTarget(e),e._clearEventhandlers(),e._customBtns={},e._customBtnLabels={},e._hotkeys={},n.hasPlugin(B)&&n.unplug(B)},n.prototype._bindUI=function(){var t=this,n=t.get(P),i=t._eventhandlers;i.push(t.after("model"+d,function(e){var n=e.prevVal,r=e.newVal,i=n&&n.toJSONUI,s=r&&r.toJSONUI;n&&n.removeTarget&&n.removeTarget(t),r&&r.addTarget&&r.addTarget(t),i!==s&&t._setTemplateRenderer(s&&t.get(D)),t.render()})),i.push(t.after("template"+d,function(){t._setTemplateRenderer(t.get(D)),t.render()})),i.push(t.after(X,function(){t._isMicroTemplate?t.render():n.pluginReady(B,r).then(function(e){e.focusInitialItem()})})),i.push(t.after("editable"+d,function(e){var n=e.newVal,r=t.get(E);r&&r.toJSONUI&&(t._setTemplateRenderer(n),t.render())})),i.push(t.after("*:change",function(n){n.target instanceof e.Model&&!t.get(D)&&t.render()})),t.get("partOfMultiView")||i.push(t.on("*:datepickerclick",function(){t.lockView(),t.once("*:"+It,function(){t.unlockView()})})),t.get("partOfMultiView")||i.push(t.on(["*:"+$,"*:"+V,"*:"+W,"*:"+U],function(i){var s=i.promise,o=i.target,u=i.type.split(":")[1],a=i.options,f=u===U&&(a.remove||a[A]),l;if(!f&&o instanceof e.Model){t._lockedBefore=t._locked,t.lockView();if(u===$||u===V)l=o.getAttrs(),o.UIToModel();t._setSpin(u,!0),u===U||s.then(function(){(u===W||u===$||u===V)&&o.setResetAttrs()},function(){return(u===$||u===V)&&o.setAttrs(l,{fromInternal:!0}),!0}).then(function(){t._setSpin(u,!1),t._lockedBefore||t.unlockView(),n.pluginReady(B,r).then(function(e){e.focusInitialItem()})})}})),i.push(t.after("*:destroy",function(e){e.target!==t&&t.render(!0)})),i.push(t.after(P+d,function(e){t._contIsForm=e.newVal.get(v)===p})),i.push(n.after(J,function(){n.addClass(y)})),i.push(n.after(K,function(){n.removeClass(y)})),i.push(e.Intl.after("intl:lang"+d,function(){t._intl=e.Intl.get(m+g),t.render()})),i.push(t.after(b+d,function(e){n.toggleClass(g+"-"+b,e.newVal)})),i.push(t.after(j+d,function(e){t._setFocusManager(e.newVal)})),s.each([J,qt,Rt,It],function(e){i.push(t.on("*:"+e,function(n){var r=!0,i=e,s,o;n.target!==t&&(e===J&&(o=n.type.split(":")[0],q[o]?i=o+e:r=!1),s={type:i,model:t.get(E),modelEventFacade:n,target:t,value:n.value,node:n.node,nodeid:n.nodeid,nodelist:n.nodelist,formElement:n.formElement},r&&(t.fire(i,s),i===Ut&&n.value===Y&&(s.type=i=zt,t.fire(i,s))))}))})},s.each([S,x,T,N,C],function(t){n.prototype[E+t]=function(){var n=this,r=n.get(E);r instanceof e.Model&&!r.get(L)&&r[O+t]&&r[O+t]()}}),s.each([S,x,T,N],function(t){n.prototype[E+t+k]=function(){var n=this,r=n.get(E),i=t.toLowerCase();return r instanceof e.Model&&!r.get(L)&&r[i+k]||null}}),n.prototype._clearEventhandlers=function(){s.each(this._eventhandlers,function(e){e.detach()})},n.prototype._createButtons=function(){var e=this,t=e._customBtnLabels,n=e._hotkeys;e._buttons=[{propertykey:st,type:w,config:{value:Q,hotkey:n[st]},labelHTML:function(){return t[st]?i.sub(t[st],{label:e._intl[Q]}):e._intl[Q]}},{propertykey:ot,type:w,config:{value:G,hotkey:n[ot]},labelHTML:function(){return t[ot]?i.sub(t[ot],{label:e._intl[G]}):e._intl[G]}},{propertykey:ut,type:w,config:{value:Y,hotkey:n[ut]},labelHTML:function(){return t[ut]?i.sub(t[ut],{label:e._intl[Y]}):e._intl[Y]}},{propertykey:at,type:U,config:{value:U,hotkey:n[at]},labelHTML:function(){return t[at]?i.sub(t[at],{label:e._intl[U]}):e._intl[U]}},{propertykey:ft,type:w,config:{value:Z,hotkey:n[ft]},labelHTML:function(){return t[ft]?i.sub(t[ft],{label:e._intl[Z]}):e._intl[Z]}},{propertykey:lt,type:W,config:{value:W,hotkey:n[lt]},labelHTML:function(){return t[lt]?i.sub(t[lt],{label:e._intl[W]}):e._intl[W]}},{propertykey:ct,type:w,config:{value:et,hotkey:n[ct]},labelHTML:function(){return t[ct]?i.sub(t[ct],{label:e._intl[et]}):e._intl[et]}},{propertykey:ht,type:w,config:{value:tt,hotkey:n[ht]},labelHTML:function(){return t[ht]?i.sub(t[ht],{label:e._intl[tt]}):e._intl[tt]}},{propertykey:pt,type:z,config:{value:z,hotkey:n[pt]},labelHTML:function(){return t[pt]?i.sub(t[pt],{label:e._intl[z]}):e._intl[z]}},{propertykey:dt,type:X,config:{value:X,hotkey:n[dt]},labelHTML:function(){return t[dt]?i.sub(t[dt],{label:e._intl[X]}):e._intl[X]}},{propertykey:vt,type:w,config:{value:nt,hotkey:n[vt]},labelHTML:function(){return t[vt]?i.sub(t[vt],{label:e._intl[nt]}):e._intl[nt]}},{propertykey:mt,type:V,config:{value:V,hotkey:n[mt]},labelHTML:function(){return t[mt]?i.sub(t[mt],{label:e._intl[V]}):e._intl[V]}},{propertykey:gt,type:$,config:{value:$,hotkey:n[gt]},labelHTML:function(){return t[gt]?i.sub(t[gt],{label:e._intl[$]}):e._intl[$]}},{propertykey:yt,type:w,config:{value:rt,hotkey:n[yt]},labelHTML:function(){return t[yt]?i.sub(t[yt],{label:e._intl[rt]}):e._intl[rt]}},{propertykey:wt,type:w,config:{classname:l,value:Q,hotkey:n[wt]},labelHTML:function(){return t[wt]?i.sub(t[wt],{label:e._intl[Q]}):i.sub(c,{type:Q})+e._intl[Q]}},{propertykey:Et,type:w,config:{classname:l,value:G,hotkey:n[Et]},labelHTML:function(){return t[Et]?i.sub(t[Et],{label:e._intl[G]}):i.sub(c,{type:G})+e._intl[G]}},{propertykey:St,type:w,config:{classname:l,value:Y,hotkey:n[St]},labelHTML:function(){return t[St]?i.sub(t[St],{label:e._intl[Y]}):i.sub(c,{type:G})+e._intl[Y]}},{propertykey:xt,type:U,config:{classname:l,value:U,hotkey:n[xt]},labelHTML:function(){return t[xt]?i.sub(t[xt],{label:e._intl[U]}):i.sub(c,{type:U})+e._intl[U]}},{propertykey:Tt,type:w,config:{classname:l,value:Z,hotkey:n[Tt]},labelHTML:function(){return t[Tt]?i.sub(t[Tt],{label:e._intl[Z]}):i.sub(c,{type:Z})+e._intl[Z]}},{propertykey:Nt,type:W,config:{classname:l,value:W,hotkey:n[Nt]},labelHTML:function(){return t[Nt]?i.sub(t[Nt],{label:e._intl[W]}):i.sub(c,{type:W})+e._intl[W]}},{propertykey:Ct,type:w,config:{classname:l,value:et,hotkey:n[Ct]},labelHTML:function(){return t[Ct]?i.sub(t[Ct],{label:e._intl[et]}):i.sub(c,{type:et})+e._intl[et]}},{propertykey:kt,type:w,config
:{classname:l,value:tt,hotkey:n[kt]},labelHTML:function(){return t[kt]?i.sub(t[kt],{label:e._intl[tt]}):i.sub(c,{type:tt})+e._intl[tt]}},{propertykey:Lt,type:z,config:{classname:l,value:z,hotkey:n[Lt]},labelHTML:function(){return t[Lt]?i.sub(t[Lt],{label:e._intl[z]}):i.sub(c,{type:z})+e._intl[z]}},{propertykey:At,type:X,config:{classname:l,value:X,hotkey:n[At]},labelHTML:function(){return t[At]?i.sub(t[At],{label:e._intl[X]}):i.sub(c,{type:X})+e._intl[X]}},{propertykey:Ot,type:w,config:{classname:l,value:nt,hotkey:n[Ot]},labelHTML:function(){return t[Ot]?i.sub(t[Ot],{label:e._intl[nt]}):i.sub(c,{type:nt})+e._intl[nt]}},{propertykey:Mt,type:V,config:{classname:l,value:V,hotkey:n[Mt]},labelHTML:function(){return t[Mt]?i.sub(t[Mt],{label:e._intl[V]}):i.sub(c,{type:V})+e._intl[V]}},{propertykey:_t,type:$,config:{classname:l,value:$,hotkey:n[_t]},labelHTML:function(){return t[_t]?i.sub(t[_t],{label:e._intl[$]}):i.sub(c,{type:$})+e._intl[$]}},{propertykey:Dt,type:w,config:{classname:l,value:rt,hotkey:n[Dt]},labelHTML:function(){return t[Dt]?i.sub(t[Dt],{label:e._intl[rt]}):i.sub(c,{type:rt})+e._intl[rt]}},{propertykey:Ht,type:W,config:{spinbusy:!0,classname:l,value:W,hotkey:n[Ht]},labelHTML:function(){return t[Ht]?i.sub(t[Ht],{label:e._intl[W]}):i.sub(c,{type:W})+e._intl[W]}},{propertykey:Bt,type:z,config:{spinbusy:!0,classname:l,value:z,hotkey:n[Bt]},labelHTML:function(){return t[Bt]?i.sub(t[Bt],{label:e._intl[z]}):i.sub(c,{type:z})+e._intl[z]}},{propertykey:jt,type:V,config:{spinbusy:!0,classname:l,value:V,hotkey:n[jt]},labelHTML:function(){return t[jt]?i.sub(t[jt],{label:e._intl[V]}):i.sub(c,{type:V})+e._intl[V]}},{propertykey:Ft,type:$,config:{spinbusy:!0,classname:l,value:$,hotkey:n[Ft]},labelHTML:function(){return t[Ft]?i.sub(t[Ft],{label:e._intl[$]}):i.sub(c,{type:$})+e._intl[$]}}]},n.prototype[O+It]=function(){var e=this,t=e.get(P);t.hasClass(y)&&t.pluginReady(B,r).then(function(e){e.next()},function(){})},n.prototype[H+qt]=function(e){e.modelEventFacade.preventDefault()},n.prototype[O+qt]=function(t){var n=t.nodelist.item(0);n&&(n.getDOMNode()===e.config.doc.activeElement?e.ITSAFormElement.tipsyInvalid._handleDelegateStart({currentTarget:n}):n.focus(),n.scrollIntoView())},n.prototype._setFocusManager=function(t){var n=this,r=n.get(P),i=r.itsatabkeymanager;t?e.use(m+B,function(){n.get(L)||(i?i.refresh(r):(r.plug(e.Plugin.ITSATabKeyManager),i=r.itsatabkeymanager,n.addTarget(i)),r.hasClass(y)&&i.focusInitialItem())}):i&&r.unplug(B)},n.prototype._setModel=function(t){var n=this;return typeof t===_?(n._textTemplate=t,t={}):n._textTemplate=null,!n._formcss_loaded&&t&&t.toJSONUI&&(n._formcss_loaded=!0,e.use("gallerycss-itsa-form")),t},n.prototype._setSpin=function(e,t){var n=this,r=n.get("container").all('[data-buttonsubtype="'+e+'"] i');r.toggleClass("itsaicon-form-loading",t),r.toggleClass("itsa-busy",t)},n.prototype._setTemplateRenderer=function(e){var t=this,n=t.get("template"),r,u,a,f;r=function(){var e=/<%(.+)%>/;return e.test(n)},f=function(e,n){var r,i,u,a;s.each(t._buttons,function(t){r=t.propertykey,i=t.type,u=t.labelHTML(),a=t.config,e[r]=n._renderBtnFns[i].call(n,u,a)}),o.each(t._customBtns,function(t,r){u=t.labelHTML,a=t.config,e[r]=n._renderBtnFns[w].call(n,u,a)})},u=t._isMicroTemplate=r(),u?(a=h.compile(n),t._modelRenderer=function(n){var r=e?n.toJSONUI():t.toJSON();return n.toJSONUI&&f(r,n),a(r)}):t._modelRenderer=function(r){var s=e?r.toJSONUI():t.toJSON();return r.toJSONUI&&f(s,r),i.sub(n,s)},t._viewNeedsForm=!t._contIsForm&&!/<form([^>]*)>/.test(n)}},"@VERSION@",{requires:["gallery-itsapluginpromise","intl","base-base","base-build","view","widget-base","template-base","template-micro","model","node-style","event-custom","event-outside","event-custom-base","oop","pluginhost-base","gallery-itsamodulesloadedpromise","gallerycss-itsa-base"],lang:["ar","bg","bs","cs","da","de","en","es","fa","fi","fr","he","hi","hr","hu","it","ja","nb","nl","pl","pt","ru","sk","sr","sv","uk","zh"],skinnable:!0});
