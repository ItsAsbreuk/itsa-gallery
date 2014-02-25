YUI.add("gallery-itsaformmodel",function(e,t){"use strict";var n=e.Array,r=e.Object,i=e.Node,s=e.Lang,o=e.Intl,u=e.ITSAFormElement,a="notification",f="datachanged",l="wantreload",c="noreloadmsg",h="UNDEFINED FORM-ELEMENT",p="inputrequired",d="itsa-invisible",v='<span style="background-color:F00; color:#FFF">DUPLICATED FORMELEMENT is not allowed</span>',m=5e3,g=1728e5,y=864e5,b="true",w="disabled",E="was-"+w,S=w+"-checked",x="button",T="pure-"+x+"-"+w,N="-before",C='span[data-for="',k="slider",L="editorBase",A="itsabutton-asktoclick",O="onenter",M="submit"+O,_="primarybtn"+O,D="data-",P=D+M,H=D+_,B=D+"focusnext"+O,j={button:!0,destroy:!0,remove:!0,reset:!0,save:!0,submit:!0,load:!0},F="gallery-itsa",I=F+"formmodel",q="function",R="renderpromise",U="click",z="save",W="load",X="destroy",V="remove",$="Promise",J="submit",K="date",Q="time",G=K+Q,Y="number",Z="string",et="boolean",tt="picker",nt="error",rt="data",it="value",st="type",ot=rt+"-"+x+"sub"+st,ut=rt+"-"+x+st,at=rt+"-modelattribute",ft="id",lt=rt+"-content",ct={text:!0,number:!0,password:!0,email:!0,url:!0},ht="reset",pt="focusnext",dt="validationerror",vt="uichanged",mt=x+":"+U,gt=X+":"+U,yt=V+":"+U,bt=J+":"+U,wt=ht+":"+U,Et=z+":"+U,St=W+":"+U,xt=K+tt+U,Tt=Q+tt+U,Nt=K+Q+tt+U,Ct=function(t){if(typeof t=="string")try{return e.JSON.parse(t)}catch(n){return this.fire(nt,{error:n,response:t,src:"parse"}),{}}return t||{}},kt="broadcast",Lt="published",At={readOnly:1,writeOnce:1,getter:1,broadcast:1,formtype:1,formconfig:1},Ot=e.ITSAFormModel=e.Base.create("itsaformmodel",e.Model,[],{},{_ATTR_CFG:["formtype","formconfig","validationerror"]});Ot.prototype._widgetValueFields={},Ot.prototype._allowedFormTypes={text:!0,number:!0,password:!0,textarea:!0,checkbox:!0,date:!0,time:!0,datetime:!0,email:!0,url:!0,plain:!0},Ot.prototype._dateTimeTypes={date:!0,time:!0,datetime:!0},Ot.prototype._datePickerClicks={datepickerclick:!0,timepickerclick:!0,datetimepickerclick:!0},Ot.prototype.initializer=function(){var t=this;t._eventhandlers=[],t._FORM_elements={},t._ATTRS_nodes={},t._knownNodeIds={},t._lifeUpdate=!1,t._intl=o.get(I),t._renderBtnFns={button:t.renderBtn,destroy:t.renderDestroyBtn,remove:t.renderRemoveBtn,reset:t.renderResetBtn,save:t.renderSaveBtn,load:t.renderLoadBtn,submit:t.renderSubmitBtn},t.publish(vt,{defaultFn:e.bind(t._defFn_uichanged,t),emitFacade:!0}),t.publish(gt,{defaultFn:e.bind(t.destroy,t),emitFacade:!0}),t.publish(yt,{defaultFn:e.bind(t.destroy,t,{remove:!0,fromInternal:!0}),emitFacade:!0}),t.publish(bt,{defaultFn:e.bind(t.submit,t,{fromInternal:!0}),emitFacade:!0}),t.publish(wt,{defaultFn:function(){t.reset()},emitFacade:!0}),t.publish(Et,{defaultFn:e.bind(t.save,t,{fromInternal:!0}),emitFacade:!0}),t.publish(St,{defaultFn:e.bind(t.load,t,{fromInternal:!0}),emitFacade:!0}),t.publish(xt,{defaultFn:e.bind(t._defFn_changedate,t),emitFacade:!0}),t.publish(Tt,{defaultFn:e.bind(t._defFn_changedate,t),emitFacade:!0}),t.publish(Nt,{defaultFn:e.bind(t._defFn_changedate,t),emitFacade:!0}),t._bindUI(),t._gcTimer=e.later(y,t,t._garbageCollect,null,!0)},Ot.prototype.crossValidation=function(){},Ot.prototype.disableUI=function(){var t=this,n=t._FORM_elements;r.each(n,function(t,n){var r=e.one("#"+n),i=t.widget,s,o,u,a;if(r){if(i){o=i.get(w)&&!r.getData(S);if(!o){try{t.type.NAME===L?i.hide():i.disable()}catch(f){}t.type.NAME===k&&(u=e.one(C+n+'"]'),u&&u.setAttribute(w,w))}}else s=r.get("tagName")==="BUTTON"&&r.getAttribute(st)===x,a=r.getAttribute("data-datetimepicker")===b,o=r.get(w)&&!r.getData(S),s&&(o=o||r.hasClass(T)&&!r.getData(S),o||r.addClass(T)),o||r.setAttribute(w,w),r.setData(E,o),a&&(u=e.one(C+n+'"]'),u&&u.setAttribute(w,w));r.setData(S,!0),o&&r.setData(N,!0)}})},Ot.prototype.cleanup=function(e){var t=this;e?t._cleanupContainer(e):t._cleanup()},Ot.prototype.enableUI=function(){var t=this,n=t._FORM_elements;r.each(n,function(t,n){var r=e.one("#"+n),i=t.widget,s,o,u,a;r&&(o=r.getData(N),o?r.clearData(N):i?(t.type.NAME===L?i.show():i.enable(),t.type.NAME===k&&(u=e.one(C+n+'"]'),u&&u.removeAttribute(w))):(s=r.get("tagName")==="BUTTON"&&r.getAttribute(st)===x,a=r.getAttribute("data-datetimepicker")===b,r.getData(E)||(r.removeAttribute(w),s&&r.removeClass(T)),r.clearData(E),a&&(u=e.one(C+n+'"]'),u&&u.removeAttribute(w))),r.clearData(S))})},Ot.prototype.getCurrentFormElement=function(e){return this.getCurrentFormElements(e)[0]||null},Ot.prototype.getCurrentFormElements=function(t){var i=this,s=i._ATTRS_nodes[t],o=[],u;return s?n.each(s,function(t){var n=e.one("#"+t);n&&(u=i._FORM_elements[t],u.node=n,o.push(u))}):r.each(i._FORM_elements,function(n){var r=e.one("#"+n.nodeid);r&&r.getAttribute("name")===t&&(n.node=r,o.push(n))}),o},Ot.prototype.getUI=function(t){var n=this,r,i,o,u,a,f,l,c;return u=n._ATTRS_nodes[t],o=u&&u.length>0&&u[0],i=n._FORM_elements,r=o&&i[o],r&&(a=e.one("#"+o))&&a.getAttribute(at)&&(l=r.widget,c=r.type,f=l?n._getWidgetValue(l,c):a.get(it),s.isValue(f)&&(n._dateTimeTypes[c]&&(f=new Date(parseInt(f,10))),c===Y&&(f=r.config.digits?parseFloat(f):parseInt(f,10)))),f},Ot.prototype.getUnvalidatedUI=function(){var t=this,i,o,u,a=[];return r.each(this._FORM_elements,function(n){n.widget||(i=e.one("#"+n.nodeid),i&&i.get("tagName")!=="BUTTON"&&(o=t._validValue(i,n,n.name,i.get(it)),t._setNodeValidation(i,o),o||a.push(i)))}),u=t.crossValidation(),s.isArray(u)&&u.length>0&&n.each(u,function(r){var i=r.attribute,s=i&&t._ATTRS_nodes[i];s&&n.each(s,function(n){var i=e.one("#"+n),s=r.validationerror,o;i&&(o=typeof s===Z?s:null,t._setNodeValidation(i,!1,o),a.push(i))})}),new e.NodeList(a)},Ot.prototype.modifyAttr=function(e,t){var n=this,r,i;if(n.attrAdded(e)){n._isLazyAttr(e)&&n._addLazyAttr(e),i=n._state;for(r in t)At[r]&&t.hasOwnProperty(r)&&(i.add(e,r,t[r]),r===kt&&i.remove(e,Lt))}},Ot.prototype[V]=function(){this.fire(V)},Ot.prototype.renderBtn=function(e,t){return this._renderBtn(e,t,x)},Ot.prototype.renderDestroyBtn=function(e,t){return this._renderBtn(e,t,X)},Ot.prototype.renderLoadBtn=function(e,t){return this._renderBtn(
e,t,W)},Ot.prototype.renderRemoveBtn=function(e,t){return this._renderBtn(e,t,V)},Ot.prototype.renderResetBtn=function(e,t){return this._renderBtn(e,t,ht)},Ot.prototype.renderSaveBtn=function(e,t){return this._renderBtn(e,t,z)},Ot.prototype.renderSubmitBtn=function(e,t){return this._renderBtn(e,t,J)},Ot.prototype.renderFormElement=function(t){var r=this,s=r._knownNodeIds,o,a,f,l,c,p,g,y,b,w,E,S,x,T;return o=r._FORM_elements,a=r._ATTRS_nodes,f=r.get(t),l=r._getAttrCfg(t),g=l.formtype||"text",S=typeof g===q&&g.NAME,S||r._allowedFormTypes[g]?(y=l.formconfig||{},y.value=f,S&&(b=r._getWidgetValueField(g),y.widgetconfig||(y.widgetconfig={}),x=typeof b!==Z,x?n.each(b,function(e){y.widgetconfig[e]=f}):y.widgetconfig[b]=f),y.modelattribute=!0,y.name=t,y.tooltipinvalid=l.validationerror,y.removerequired=!0,delete y.pattern,y.removepattern=!0,y.hideatstartup=!0,c=u.getElement(g,y),w=c.nodeid,o[w]=c,a[t]||(a[t]=[]),a[t].push(w),E=c.widget,E?(E.addTarget(r),T=g.NAME===L,e.use(T?F+"editor"+R:F+"widget"+R,function(){E.renderPromise().then(function(){var t=e.one("#"+w);E.addTarget(r),s[w]?t.insert(v,"replace"):(s[w]=!0,T&&t.removeClass(d),r._modelToUI(w),!T&&t.removeClass(d))})}),x?n.each(b,function(t){r._eventhandlers.push(E.after(t+"Change",function(t){var n=vt,i;t.fromInternal||(i={target:r,value:t.newVal,formElement:c,node:e.one("#"+w),nodeid:w,type:n},r.fire(n,i))}))}):r._eventhandlers.push(E.after(b+"Change",function(t){var n=vt,i;t.fromInternal||(i={target:r,value:t.newVal,formElement:c,node:e.one("#"+w),nodeid:w,type:n},r.fire(n,i))}))):i.availablePromise("#"+w,m).then(function(t){s[w]?t.insert(v,"replace"):(s[w]=!0,r._modelToUI(w),t.removeClass(d),r._dateTimeTypes[g]&&(t=e.one('span.formatvalue[data-for="'+w+'"]'),t&&t.removeClass(d)))},function(e){}),p=c.html,c.widget&&c.widget.addTarget(r)):p=h,p},Ot.prototype.reset=function(){var e=this,t;e._internalChange=!0,Ot.superclass.reset.apply(e,arguments),arguments.length===0&&(e._internalChange=null,e._modelToUI(),e._removeValidation(),t={type:ht,target:e},e.fire(ht,t))},Ot.prototype.setLifeUpdate=function(e){var t=this;return typeof e===et&&(t._lifeUpdate=e),t},Ot.prototype.setResetAttrs=function(){var e=this,t=e.getAttrs();delete t.clientId,delete t.destroyed,delete t.initialized,e.idAttribute!==ft&&delete t.id,r.each(t,function(t,n){t&&e._state.add(n,"initValue",t)})},Ot.setWidgetValueField=function(e,t){this._widgetValueFields[e]=t},Ot.prototype.setWidgetValueField=Ot.setWidgetValueField,Ot.prototype[J]=function(e,t){var n=this,r;return(r=n.submitPromise(e))&&t&&r.then(function(e){t(null,e)},function(e){t(e)}),n},Ot.prototype[J+$]=function(e){return this._createPromise(J,e)},Ot.prototype.toJSONUI=function(e,t){var i=this,o={},u=i.getAttrs(),a=i._renderBtnFns,f,l,c,h,p,d,v,m;return delete u.clientId,delete u.destroyed,delete u.initialized,i.idAttribute!==ft&&delete u.id,r.each(u,function(e,n){t&&(d=new RegExp("{"+n+"}"),v=new RegExp("<%==? (data|this)."+n+" %>"),m=d.test(t)||v.test(t)),(!t||m)&&(o[n]=i.renderFormElement(n))}),s.isObject(e)?(f=e.propertykey,l=e.type,c=e.labelHTML,h=e.config,f&&l&&a[l]&&(o[f]=a[l].call(i,c,h))):s.isArray(e)&&n.each(e,function(e){f=e.propertykey,l=e.type,c=e.labelHTML,h=e.config,f&&l&&a[l]&&(o[f]=a[l].call(i,c,h))}),p=i.toJSON(),r.each(p,function(e,t){o["_"+t]=e}),o},Ot.prototype.UIToModel=function(t){var i=this,o,u,a,f,l,c,h,p;return u=i._FORM_elements,o=t&&u[t],o&&(f=e.one("#"+t))&&f.getAttribute(at)?(h=o.widget,p=o.type,l=h?i._getWidgetValue(h,p):f.get(it),c=o.name,s.isValue(l)&&(a={formelement:!0},i._dateTimeTypes[p]&&(l=new Date(parseInt(l,10))),p===Y&&(l=o.config.digits?parseFloat(l):parseInt(l,10)),i.set(c,l,a))):t||r.each(i._ATTRS_nodes,function(e){n.each(e,function(e){i.UIToModel(e)})}),i},Ot.prototype.translate=function(e){return this._intl[e]||e},Ot.translatePromise=function(t){return e.usePromise("intl").then(function(){var e=o.get(I);return e[t]||t},function(){return t})},Ot.prototype.translatePromise=Ot.translatePromise,Ot.prototype.validated=function(){return this.getUnvalidatedUI().size()===0},Ot.prototype.destructor=function(){var e=this;e._clearEventhandlers(),e._removeTargets(),e.cleanup(),e._widgetValueFields={},e._gcTimer.cancel()},e.Node.prototype.displayInDoc=function(){var e=this,t=e.inDoc();while(e&&t)t=e.getStyle("display")!=="none",t&&(e=e.get("parentNode"));return t},Ot.prototype._bindUI=function(){var t=this,n=t._eventhandlers,i=e.one("body");n.push(i.delegate([xt,Tt,Nt,mt,St,Et,gt,yt,bt,wt],function(e){var n=e.type,r=e.target,i=t._FORM_elements[r.get(ft)],s,o,u;i&&(e.preventDefault(),o=r.getAttribute(it),t._datePickerClicks[n]&&(u=new Date,u.setTime(parseInt(o,10)),o=u),s={target:t,value:o,formElement:t._FORM_elements[r.get(ft)],buttonNode:r,type:n},t.fire(n,s))})),n.push(i.delegate("valuechange",function(e){var n=e.target,r=vt,i={target:t,value:n.get(it),formElement:t._FORM_elements[n.get(ft)],node:n,nodeid:n.get(ft),type:r};t.fire(r,i)},function(e,n){return n&&n.target&&t._FORM_elements[n.target.get(ft)]})),n.push(t.after("*:change",function(n){var i=n.changed,s=!1;!t._internalChange&&!n.formelement&&!n.fromInternal?(r.some(i,function(e,n){return s=t._ATTRS_nodes[n],s}),s&&e.use(F+"dialog",function(){var n=t._intl;t._lifeUpdate?e.confirm(n[a],n[f]+".<br />"+n[l]+"? ("+n[c]+").").then(e.bind(t._modelToUI,t,null),e.bind(t.UIToModel,t,null)):e.confirm(n[a],n[f]+".<br />"+n[l]+"?").then(e.bind(t._modelToUI,t,null))})):n.fromInternal&&t._modelToUI()})),n.push(i.delegate("keydown",function(e){e.halt();var n=e.target,r=n.getAttribute(P)==="true",i=n.getAttribute(H)==="true",s,o,u;i&&(u=t._findPrimaryBtnNode())?u.simulate(U):r?t.submit({fromInternal:!0}):(s=pt,o={target:e.target,type:s},t.fire(s,o))},function(e,n){var r=n.target,i=t._FORM_elements[r.get(ft)];return i&&n.keyCode===13&&(ct[i.type]||r.getAttribute(P)==="true"||r.getAttribute(H)==="true"||r.getAttribute(B)==="true")})),n.push(t.on([Et,bt],function(e){var n;n=t.getUnvalidatedUI(),n.isEmpty()?t.UIToModel():(e.preventDefault(),t.fire
(dt,{target:t,nodelist:n,src:e.type}))})),n.push(e.Intl.on("intl:langChange",function(){t._intl=e.Intl.get(I)})),n.push(e.on(A,function(e){var n=e.buttonNode,r;t._FORM_elements[n.get("id")]&&(r=n.get("value"),t.fire((j[r]?r:x)+":click",{buttonNode:n,value:r}))}))},Ot.prototype._cleanup=function(){var t=this,r=t.getCurrentFormElements(),i;n.each(r,function(t){t.widget&&t.widget.destroy(!0),i=e.one("#"+t.nodeid),i&&(i.get("childNodes").destroy(!0),i.remove(!0))}),t._FORM_elements={},t._ATTRS_nodes={},t._knownNodeIds={}},Ot.prototype._cleanupContainer=function(e){var t=this,i=t._ATTRS_nodes,s=t._FORM_elements,o=t._knownNodeIds,u=[],a,f,l,c;r.each(o,function(t,n){f=s[n],a=e.one("#"+n),a&&(f.widget&&f.widget.destroy(!0),a.get("childNodes").destroy(!0),a.remove(!0),delete s[n],l=f.name,c=i[l].indexOf(n),c&&i[l].splice(c,1),u.push(n))}),n.each(u,function(e){delete o[e]})},Ot.prototype._clearEventhandlers=function(){n.each(this._eventhandlers,function(e){e.detach()})},Ot.prototype._defFn_changedate=function(t){var n=t.target,r=t.type,i=t.buttonNode,o=e.ItsaDateTimePicker,u=t.formElement,a=s.isDate(t.value)?t.value:new Date,f,l,c;r===xt?f=e.bind(o.getDate,o):r===Tt?f=e.bind(o.getTime,o):r===Nt&&(f=e.bind(o.getDateTime,o)),f(new Date(a),{alignToNode:i,modal:!0,forceSelectdate:!1}).then(function(e){l=u.config.format,n._updateDateTimeUI(u.name,e,r,l),n._lifeUpdate&&n.UIToModel(i.get(ft))},function(){return!0}).then(function(){var e=pt,t={target:i,type:e};if(i){i.removeAttribute(lt);try{i.focus()}catch(r){}c=i.getAttribute(rt+"-contentvalid"),c&&i.setAttribute(lt,c)}n.fire(e,t)})},Ot.prototype["_defFn_"+J]=function(e){var t=this,n=e.options,i=e.promiseReject,s,o,u,a={options:n};return t._validate(t.toJSON(),function(f){f?(a.error=f,a.src=J,t._lazyFireErrorEvent(a),i(new Error(f))):(s=function(e){a.error=e,a.src=J,t._lazyFireErrorEvent(a),i(new Error(e))},o=function(i){var s;e.response=i,s=Ct(i),s.responseText&&(s=s.responseText),r.keys(s).length>0&&(e.parsed=s,t.setAttrs(s,(n.fromInternal=!0)&&n)),t.changed={},e.promiseResolve(i)},(u=t.getUnvalidatedUI())&&u.isEmpty()?t.syncPromise?t._syncTimeoutPromise(J,n).then(o,s):t.sync(J,n,function(e,t){e?s(e):o(t)}):(s(t._intl.unvalidated),t.fire(dt,{target:t,nodelist:u,src:J})))}),e.promise},Ot.prototype._defFn_uichanged=function(e){var t=this,r=e.formElement,i=r.name,s=r.type,o=e.value,u,a,f;r.widget?(f=this._getWidgetValueField(s),typeof f===Z?t._updateSimularWidgetUI(e.nodeid,i,f,o):n.each(f,function(n){t._updateSimularWidgetUI(e.nodeid,i,n,o,!0)})):(u=e.node,a=t._validValue(u,r,i,o),t._updateSimularUI(u,i,o,a),t._lifeUpdate&&a&&t.UIToModel(u.get(ft)))},Ot.prototype._findPrimaryBtnNode=function(){var t=this._FORM_elements,n;return r.some(t,function(t,r){var i=t.config.primary,s=typeof i===et&&i;return n=s&&e.one("#"+r),n}),n},Ot.prototype._garbageCollect=function(){var t=this,i=(new Date).getTime(),s=t._ATTRS_nodes,o=t._FORM_elements,u=t._knownNodeIds,a=[],f,l,c,h;i-=g,r.each(u,function(t,r,u){typeof t===et?e.one("#"+r)||(u[r]=(new Date).getTime()):t<i&&(c=o[r],h=c.name,f=s[h],l=f&&n.indexOf(f,r),delete o[r],l>0&&f.splice(l,1),a.push(r))}),n.each(a,function(e){delete u[e]})},Ot.prototype._getWidgetValue=function(e,t){if(e&&t.NAME===L&&e.itsatoolbar)return e.itsatoolbar.getContent();var n=this._getWidgetValueField(t);return e&&e.get(typeof n===Z?n:n[0])},Ot.prototype._getWidgetValueField=function(e){var t=typeof e===q&&e.NAME;return t&&this._widgetValueFields[e.NAME]||it},Ot.prototype._modelToUI=function(t){var n=this,i,s,o,u,a,f,l,c,h;s=n._FORM_elements,i=t&&s[t],i&&(o=e.one("#"+t))&&o.getAttribute(at)?(f=i.widget,a=i.name,u=n.get(a,u)||"",f?(h=this._getWidgetValueField(i.type),f.set(typeof h===Z?h:h[0],u,{fromInternal:!0})):(l=i.type,n._dateTimeTypes[l]?(c=i.config.format,n._updateDateTimeUI(i.name,u,l,c)):o.set(it,u))):t||r.each(n._FORM_elements,function(e,t){n._modelToUI(t)})},Ot.prototype._removeTargets=function(){var e=this;r.each(e._FORM_elements,function(t){var n=t.widget;n&&n.removeTarget(e)})},Ot.prototype._removeValidation=function(){var t=this;r.each(t._FORM_elements,function(n){var r=e.one("#"+n.nodeid);r&&t._setNodeValidation(r,!0)})},Ot.prototype._renderBtn=function(e,t,n){var r=this,s=r._FORM_elements,o=r._knownNodeIds,a,f;return t||(t={}),n||(n=x),e||(e=n),t[rt]||(t[rt]=""),t[it]||(t[it]=n),t[rt]+=" "+ot+'="'+n+'"',t.buttontype=x,t.labelHTML=e,a=u.getElement(x,t),f=a.nodeid,s[f]=a,i.availablePromise("#"+f,m).then(function(e){o[f]?e.insert(v,"replace"):o[f]=!0}),a.html},Ot.prototype._updateDateTimeUI=function(t,r,i,o){var u=this,a=u._ATTRS_nodes[t];a&&(o||(i===K?o="%x":i===Q?o="%X":o="%x %X"),n.each(a,function(t){var n=e.one("#"+t),i=e.one('span[data-for="'+t+'"]'),u=s.isDate(r);u&&n&&n.set(it,r.getTime()),i&&i.set("text",u?e.Date.format(r,{format:o}):"invalid Date: "+r)}))},Ot.prototype._updateSimularUI=function(t,r,i,s){var o=this,u=o._ATTRS_nodes[r];u&&n.each(u,function(n){var r=e.one("#"+n);r&&(r!==t&&r.set(it,i),o._setNodeValidation(r,s))})},Ot.prototype._setNodeValidation=function(e,t,n){var r;e.setAttribute(rt+"-valid",t),r=n||e.getAttribute(lt+(t?"valid":"invalid")),!t&&!n&&r===""&&(r=this._intl[p]),r?e.setAttribute(lt,r):e.removeAttribute(lt)},Ot.prototype._updateSimularWidgetUI=function(t,r,i,s,o){var u=this,a=u._ATTRS_nodes[r],f,l;a&&n.each(a,function(n){f=u._FORM_elements[n],l=f&&f.widget,(n!==t||o)&&l&&l.set(i,s);if(l&&f.type.NAME===k){var r=e.one('span[data-for="'+n+'"]');r&&r.set("text",s)}}),u._lifeUpdate&&u.UIToModel(t)},Ot.prototype._validValue=function(e,t,n,r){var i=this,s=t.type,o=s===K||s===Q||s===G||s==="checkbox",u,a,f,l,c,h,p,d,v,m;return o||(u=i._getAttrCfg(n),d=u.formconfig,p=d&&d.required,h=typeof p===et&&p||s==="password",v=r===""&&!h,v||(a=u.validator,f=e.getAttribute(rt+"-pattern"),l=!a||a(s===Y?t.config.digits?parseFloat(r):parseInt(r,10):r),typeof l===et||(l=!1),c=!f||(new RegExp(f,"i")).test(r),m=r!==""||!h)),o||v||l&&c&&m},Ot.prototype._widgetValueFields.itsacheckbox="checked",Ot.prototype._widgetValueFields
.itsacheckboxgroup="checked",Ot.prototype._widgetValueFields.toggleButton=["checked","pressed"],Ot.prototype._widgetValueFields.editorBase="content",n.each([x,z,X,V,W],function(t){var n={on:function(e,n,r){n._handle=e.on(U,function(e){var n=e.target;n&&n.get("tagName")!=="BUTTON"&&(n=n.get("parentNode"),e.target=n),n&&n.getAttribute(ut)===x&&n.getAttribute(ot)===t&&r.fire(e)})},detach:function(e,t){t._handle.detach()}};n.delegate=n.on,n.detachDelegate=n.detach,e.Event.define(t+":"+U,n)})},"@VERSION@",{requires:["yui-base","event-valuechange","intl","base-base","attribute-base","attribute-extras","base-build","selector-css2","model","datatype-date-format","node-base","node-style","node-core","oop","yui-later","node-event-delegate","node-event-simulate","event-synthetic","event-base","event-custom-base","event-custom","json-parse","gallery-itsanodepromise","gallery-itsamodulesloadedpromise","gallery-itsadatetimepicker","gallery-itsamodelsyncpromise","gallery-itsaformelement"],lang:["ar","bg","bs","cs","da","de","en","es","fa","fi","fr","he","hi","hr","hu","it","ja","nb","nl","pl","pt","ru","sk","sr","sv","uk","zh"]});
