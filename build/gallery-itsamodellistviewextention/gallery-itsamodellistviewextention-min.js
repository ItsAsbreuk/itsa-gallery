YUI.add("gallery-itsamodellistviewextention",function(e,t){"use strict";function W(){}function X(){}function V(){}var n=e.Lang,r=e.Object,i=e.Array,s=e.Node,o=e.Template.Micro,u="widget-ready",a='<ul role="presentation"></ul>',f='<li role="presentation"></li>',l="<li>{content}</li>",c='<tr><td colspan="{cols}">{content}</td></tr>',h='<table role="presentation"></table>',p="<tbody></tbody>",d='<tr role="presentation"></tr>',v="<div>{loading}</div>",m="itsa-scrollview-fillelement",g="itsa-model",y=g+"-changed",b="itsa-modellistview",w=b+"-lastitem",E=b+"-noinitialitems",S=b+"-view-noinitialitems",x=b+"-noitems",T=b+"-view-noitems",N=g+"-focus",C=g+"-selected",k=g+"-even",L=g+"-odd",A=b+"-styled",O=b+"-groupheader",M=b+"-groupheader1",_=b+"-groupheader2",D=b+"-groupheader3",P=b+"-sequelgroupheader",H=b+"-unselectable",B=b+"-showloading",j="yui3-form",F="Loading...",I="No data to display",q="itsa-button-datetime",R="yui3-itsaformelement",U=R+"-inputbutton",z=function(e,t){return parseInt(e.getStyle(t),10)};e.mix(W.prototype,{getModelAttr:function(e,t){return e&&(e.get&&typeof e.get=="function"?e.get(t):e[t])},setModelAttr:function(e,t,n,r){var i=this,s,o;e&&(s=!e.get||typeof e.get!="function",s?(o=i.revive(e),e[t]=n,o&&(o.set(t,n,r),i.free(o))):e.set(t,n,r))},getModelToJSON:function(e){return e.get&&typeof e.get=="function"?e.toJSON():e},isModifiedModel:function(e){var t=!e.get||typeof e.get!="function";return this.isNewModel(e)||(t?e._changed:!r.isEmpty(e.changed))},isNewModel:function(e){return!n.isValue(this.getModelAttr(e,"id"))}},!0),e.ITSAModellistAttrExtention=W,e.Base.mix(e.ModelList,[W]),e.mix(X.prototype,{cleanup:function(){var t=this,n=e.Widget;n&&t.all(".yui3-widget").each(function(e){if(t.one("#"+e.get("id"))){var r=n.getByNode(e);r&&r.destroy(!0)}}),t.all("children").destroy(!0)}},!0),e.Node.ITSANodeCleanup=X,e.Base.mix(e.Node,[X]),V.ATTRS={modelList:{value:null,validator:function(e){return e===null||e.getByClientId||n.isArray(e)},setter:"_setModelList"},noDups:{value:!1,validator:function(e){return typeof e=="boolean"},setter:"_setNoDups"},listType:{value:"ul",validator:function(e){return e==="ul"||e==="table"},writeOnce:"initOnly"},limitModels:{value:0,validator:function(e){return typeof e=="number"},setter:"_setLimitModels"},viewFilter:{value:null,validator:function(e){return e===null||typeof e=="function"},setter:"_setViewFilter"},modelsSelectable:{value:null,lazyAdd:!1,validator:function(e){return e===null||e===""||typeof e=="boolean"||e==="single"||e==="multi"},setter:"_setModelsSel"},modelsUnselectable:{value:!1,validator:function(e){return typeof e=="boolean"}},modelListStyled:{value:!0,lazyAdd:!1,validator:function(e){return typeof e=="boolean"},setter:"_setModelListStyled"},clickSensivity:{value:2,validator:function(e){return typeof e=="number"&&e>=0&&e<11}},clickEvents:{value:!1,lazyAdd:!1,validator:function(e){return typeof e=="boolean"},setter:"_setClkEv"},dblclickEvents:{value:!1,lazyAdd:!1,validator:function(e){return typeof e=="boolean"},setter:"_setDblclkEv"},highlightAfterModelChange:{value:0,validator:function(e){return typeof e=="number"},setter:"_setMarkModelChange"},modelsIntoViewAfterAdd:{value:!1,validator:function(e){return typeof e=="number"&&e>=0&&e<=4},setter:"_setIntoViewAdded"},modelsIntoViewAfterChange:{value:!1,validator:function(e){return typeof e=="number"&&e>=0&&e<=2},setter:"_setIntoViewChanged"},mouseDownUpEvents:{value:!1,lazyAdd:!1,validator:function(e){return typeof e=="boolean"},setter:"_setMouseDnUpEv"},hoverEvents:{value:!1,lazyAdd:!1,validator:function(e){return typeof e=="boolean"},setter:"_setHoverEv"},groupHeader1:{value:null,validator:function(e){return e===null||typeof e=="string"},setter:"_setGrpH1"},groupHeader2:{value:null,validator:function(e){return e===null||typeof e=="string"},setter:"_setGrpH2"},groupHeader3:{value:null,validator:function(e){return e===null||typeof e=="string"},setter:"_setGrpH3"},modelTemplate:{value:"{clientId}",validator:function(e){return typeof e=="string"},setter:"_setModelTemplate"},classNameTemplate:{value:null,validator:function(e){return typeof e=="string"},setter:"_setClassNameTempl"},groupHeader1Template:{value:null,validator:function(e){return e===null||typeof e=="string"},setter:"_setGH1Templ"},groupHeader2Template:{value:null,validator:function(e){return e===null||typeof e=="string"},setter:"_setGH2Templ"},groupHeader3Template:{value:null,validator:function(e){return e===null||typeof e=="string"},setter:"_setGH3Templ"},dupComparator:{value:null,validator:function(e){return e===null||typeof e=="function"},setter:"_setDupComp"},showLoadMessage:{value:!1,validator:function(e){return typeof e=="boolean"}}},e.mix(V.prototype,{initializer:function(){var t=this;t.publish("modelListRender",{emitFacade:!0}),t._handlers=[],t._origModels=[],t._selectedModels={},t._viewId=e.guid(),t._currentViewPg=0,t._viewFilterInit=!1,t._grpH1Init=!1,t._grpH2Init=!1,t._grpH3Init=!1,t._gH1TemplateInit=!1,t._gH2TemplateInit=!1,t._gH3TemplateInit=!1,t._modelTemplateInit=!1,t._renderClassInit=!1,t._dupCompInit=!1,t._noDupsInit=!1,t._limModelsInit=!1,t._rerendAttrChg=!0,t._itmsAvail=!1,t._prevLastModelIndex=-1,t._listLazy=!1,t._even=!1,t.renderPromise().then(e.bind(t._render,t))},promiseBeforeReady:function(t){var n=this,r=t||2e4;return new e.Promise(function(t,i){var s=n.once(u,t);n._ready&&(s.detach(),t()),e.later(r,null,function(){s.detach(),i(new Error("Timeout: widget not ready within "+r+" miliseconds"))})})},setWithoutRerender:function(e,t,n){var r=this;r._rerendAttrChg=!1,r.set(e,t,n),r._rerendAttrChg=!0},getNodeFromIndex:function(e,t){return this._getNodeFromModelOrIndex(null,e,t)},getNodeFromModel:function(e,t){return this._getNodeFromModelOrIndex(e,null,t)},saveScrollTo:function(){},scrollIntoView:function(){},modelIsSelected:function(e){var t=this,r;return n.isArray(e)?i.some(e,function(e){return r=t._selectedModels[t.getModelAttr(e,"clientId")],r?!1:!0}):r=t._selectedModels[t.getModelAttr(e,"clientId")],n.isValue
(r)},selectModels:function(e,t,r,s,o){var u=this,a=n.isArray(e),f=u.get("modelsSelectable")==="single",l,c;f&&u.clearSelectedModels(!0,!0),s||(c=u.get("contentBox"),l=c.all("."+C).size()),a&&!f?(i.each(e,function(e){u._selectModel(e,!0,o)}),t&&e.length>0&&u.scrollIntoView(e[0],r,o)):(a&&(e=e[0]),u._selectModel(e,!0,o),t&&u.scrollIntoView(e,r,o)),!s&&l!==c.all("."+C).size()&&u._fireSelectedModels()},unselectModels:function(e,t,r){var s=this,o,u;t||(u=s.get("contentBox"),o=u.all("."+C).size()),n.isArray(e)?i.each(e,function(e){s._selectModel(e,!1,null,r)}):s._selectModel(e,!1,null,r),!t&&o!==u.all("."+C).size()&&s._fireSelectedModels()},clearSelectedModels:function(e,t){var n=this,r=n.get("contentBox"),i,s,o,u,a,f,l;i=function(){s.each(function(e){e.blur()})},s=r.all("."+C),u=s.size()>0&&s.item(0),e?(i(),s.removeClass(C)):(o=s.size()>0,i(),s.removeClass(C),o&&n._fireSelectedModels()),n._selectedModels={},n.get("modelsUnselectable")&&u&&!t&&(a=u.getData("modelClientId"),l=n.getModelListInUse(),f=l.getByClientId(a),n.selectModels(f,!1,null,!0))},getSelectedModels:function(e){var t=this,n;return e?(n=[],r.each(t._selectedModels,function(e){var r=t._origModels[t.getModelAttr(e,"clientId")];(!r||i.indexOf(n,r)===-1)&&n.push(r||e)})):n=r.values(t._selectedModels),n},renderView:function(){this._renderView()},getModelListInUse:function(){return this._abModelList||this.get("modelList")},getModelFromNode:function(e){var t=this,n=t.get("modelList"),r=e.getData("modelClientId");return n&&n.getByClientId(r)},getModelAttr:function(e,t){return e&&(e.get&&typeof e.get=="function"?e.get(t):e[t])},setModelAttr:function(e,t,n,r){var i=this,s,o;e&&(i._listLazy?(s=i.get("modelList"),o=s.revive(e),e[t]=n,o&&(o.set(t,n,r),s.free(o))):e.set(t,n,r))},getModelToJSON:function(e){return e.get&&typeof e.get=="function"?e.toJSON():e},isModifiedModel:function(e){var t=this;return t.isNewModel(e)||(t._listLazy?e._changed:!r.isEmpty(e.changed))},isNewModel:function(e){return!n.isValue(this.getModelAttr(e,"id"))},destructor:function(){var e=this,t=e.get("modelList");e._clearEventhandlers(),t.removeTarget(e),e._selModelEv&&e._selModelEv.detach(),e._clkModelEv&&e._clkModelEv.detach(),e._dblclkModelEv&&e._dblclkModelEv.detach(),e._mouseDnModelEv&&e._mouseDnModelEv.detach(),e._mouseUpModelEv&&e._mouseUpModelEv.detach(),e._mouseentModelEv&&e._mouseentModelEv.detach(),e._mouseleaveModelEv&&e._mouseleaveModelEv.detach(),e._markModelChangeEv&&e._markModelChangeEv.detach(),e._markModelAddEv&&e._markModelAddEv.detach(),e._modelInViewChanged&&e._modelInViewChanged.detach(),e._modelInViewAdded&&e._modelInViewAdded.detach(),e._clearAbberantModelList(),e._viewNode.destroy(!0)},_render:function(){var e=this,t=e.get("modelList"),r=e.get("listType"),i=e.get("boundingBox"),o=e.get("contentBox"),f;o=o.one(".yui3-widget-bd")||o,o.setHTML(n.sub(v,{loading:F})),e._viewNode=f=s.create(r==="ul"?a:p),f.set("id",e._viewId),f.addClass(T).addClass(S),i.addClass(x).addClass(E),e.get("showLoadMessage")&&i.addClass(B),e._templFns=e._getAllTemplateFuncs(),e._extraBindUI(),t&&e._renderView(null,{incrementbuild:!0,initbuild:!0}),e._ready=!0,e.fire(u)},_focusModelNode:function(e){e&&(this._viewNode.all("."+N).removeClass(N),e.addClass(N),e.focus())},_getMaxPaginatorGotoIndex:function(e,t){var n=this,r=n.hasPlugin("pages"),i=n.getModelListInUse(),s=n.get("axis"),o=s.y,u=n.get("boundingBox").get(o?"offsetHeight":"offsetWidth"),a=0,f,l,c;if(r&&i.size()>0){f=n.getNodeFromIndex(Math.min(e,i.size()-1),t),o?l=f.get("offsetHeight")+z(f,"marginTop")+z(f,"marginBottom"):l=f.get("offsetWidth")+z(f,"marginLeft")+z(f,"marginRight"),c=n._viewNode.all(">li"),a=c.size();while(f&&--a>=0&&l<u)f=c.item(a),o?l+=f.get("offsetHeight")+z(f,"marginTop")+z(f,"marginBottom"):l+=f.get("offsetWidth")+z(f,"marginLeft")+z(f,"marginRight");l>=u&&a++}return a},_extraBindUI:function(){var t=this,n=t.get("boundingBox"),i=t.get("contentBox"),s=t.get("modelList"),o=t._handlers;s&&(s.addTarget(t),n.addClass(b)),o.push(t.after("modelListChange",function(e){var r=e.newVal,o=e.prevVal;s=r,o&&o.removeTarget(t),r?(r.addTarget(t),n.addClass(b),t._renderView(null,{incrementbuild:!o,initbuild:!o})):(n.removeClass(b),i.setHTML(""))})),o.push(n.delegate("click",function(){t._gesture=null},function(){var e=Math.abs(t.lastScrolledAmt)>t.get("clickSensivity");return!e})),o.push(t.after("*:change",function(n){var i=n.target,o;if(i instanceof e.Model){r.some(n.changed,function(t){return o=e.JSON.stringify(t.newVal)!==e.JSON.stringify(t.prevVal),o});if(o){if(!n.fromEditModel||!t.itsacmtemplate||!t.itsacmtemplate.get("modelsEditable"))s&&s.comparator&&(s.sort(),t._listLazy&&s.free()),t._repositionModel(i);t.modelIsSelected(i)&&t._fireSelectedModels({modelChanged:!0})}}})),o.push(t.after("*:destroy",function(n){var r=n.target;r instanceof e.Model&&t.modelIsSelected(r)&&t._fireSelectedModels()})),o.push(i.delegate("click",function(e){Math.abs(t.lastScrolledAmt)>t.get("clickSensivity")&&(e.preventDefault(),e.stopImmediatePropagation())},function(){return this.test("input[type=button],button,a,.focusable,."+q+",."+U)})),o.push(n.delegate("mousedown",function(e){e.preventDefault()},function(){var e=this.get("tagName");return e==="A"||e==="IMG"})),o.push(t.after(["*:remove","*:add"],function(n){var r=n.target;r instanceof e.ModelList&&(t._listLazy&&r.free(),t._renderView(null,{keepstyles:!1,initbuild:!0}))})),o.push(t.after(["*:reset"],function(n){n.target instanceof e.ModelList&&t._renderView(null,{keepstyles:!0,initbuild:!0})})),o.push(t.after(["itsamodellistviewextention:destroy","itsamodellistviewextention:pluggedin"],function(n){n.target instanceof e.ModelList&&t._renderView(null,{keepstyles:!1,initbuild:!0})})),t.get("highlightAfterModelChange"),t.get("modelsIntoViewAfterAdd"),t.get("modelsIntoViewAfterChange")},_setModelList:function(t){var r=this;return n.isArray(t)&&(t=new e.LazyModelList({items:t})),r._listLazy=t&&t.revive,r._itmsAvail=t&&t.size()>0,t},_setNoDups:function(e){var t=this;t._noDupsInit?t._rerendAttrChg&&
t._renderView({noDups:e}):t._noDupsInit=!0},_setLimitModels:function(e){var t=this;t._limModelsInit?t._rerendAttrChg&&t._renderView({limitModels:e}):t._limModelsInit=!0},_setViewFilter:function(e){var t=this;t._viewFilterInit?t._rerendAttrChg&&t._renderView({viewFilter:e}):t._viewFilterInit=!0},_setDupComp:function(e){var t=this;t._dupCompInit?t._rerendAttrChg&&t.get("noDups")&&t._renderView({dupComparator:e}):t._dupCompInit=!0},_setGrpH1:function(e){var t=this;t._grpH1Init?(t._templFns=t._getAllTemplateFuncs({groupHeader1:e}),t._rerendAttrChg&&t._renderView()):t._grpH1Init=!0},_setGrpH2:function(e){var t=this;t._grpH2Init?(t._templFns=t._getAllTemplateFuncs({groupHeader2:e}),t._rerendAttrChg&&t._renderView()):t._grpH2Init=!0},_setGrpH3:function(e){var t=this;t._grpH3Init?(t._templFns=t._getAllTemplateFuncs({groupHeader3:e}),t._rerendAttrChg&&t._renderView()):t._grpH3Init=!0},_setGH1Templ:function(e){var t=this;t._gH1TemplateInit?(t._templFns=t._getAllTemplateFuncs({groupHeader1Template:e}),t._rerendAttrChg&&t._renderView()):t._gH1TemplateInit=!0},_setGH2Templ:function(e){var t=this;t._gH2TemplateInit?(t._templFns=t._getAllTemplateFuncs({groupHeader2Template:e}),t._rerendAttrChg&&t._renderView()):t._gH2TemplateInit=!0},_setGH3Templ:function(e){var t=this;t._gH3TemplateInit?(t._templFns=t._getAllTemplateFuncs({groupHeader3Template:e}),t._rerendAttrChg&&t._renderView()):t._gH3TemplateInit=!0},_setModelTemplate:function(e){var t=this;t._modelTemplateInit?(t._templFns=t._getAllTemplateFuncs({template:e}),t._rerendAttrChg&&t._renderView()):t._modelTemplateInit=!0},_setClassNameTempl:function(e){var t=this;t._renderClassInit?(t._templFns=t._getAllTemplateFuncs({classNameTemplate:e}),t._rerendAttrChg&&t._renderView()):t._renderClassInit=!0},_setModelsSel:function(t){var r=this,i=r.get("contentBox");return t===""||!t?t=null:n.isBoolean(t)&&(t="multi"),e.UA.ie>0&&i.setAttribute("unselectable",t==="multi"?"on":""),i.toggleClass(H,t==="multi"),r._setSelectableEvents(t),t},_setModelListStyled:function(e){var t=this;t.get("boundingBox").toggleClass(A,e).toggleClass(j,e)},_setSelectableEvents:function(t){var n=this,r=n.get("contentBox");n.clearSelectedModels(),t&&!n._selModelEv?n._selModelEv=r.delegate("tap",e.rbind(n._handleModelSelectionChange,n),function(e,t){var n=t.target.test("input[type=button],button,a,.focusable,."+q+",."+U);return!n&&this.hasClass(g)}):!t&&n._selModelEv&&(n._selModelEv.detach(),n._selModelEv=null)},_setClkEv:function(e){var t=this,n=t.get("contentBox");e&&!t._clkModelEv?t._clkModelEv=n.delegate("tap",function(e){var n=e.currentTarget,r=t.getModelFromNode(n);t.fire("modelClick",{node:n,model:r})},function(e,t){var n=t.target.test("input[type=button],button,a,.focusable,."+q+",."+U);return!n&&this.hasClass(g)}):!e&&t._clkModelEv&&(t._clkModelEv.detach(),t._clkModelEv=null)},_setDblclkEv:function(e){var t=this,n=t.get("contentBox");e&&!t._dblclkModelEv?t._dblclkModelEv=n.delegate("dblclick",function(e){var n=e.currentTarget,r=t.getModelFromNode(n);t.fire("modelDblclick",{node:n,model:r})},"."+g):!e&&t._dblclkModelEv&&(t._dblclkModelEv.detach(),t._dblclkModelEv=null)},_setMarkModelChange:function(t){var n=this;t&&t>0&&!n._markModelChangeEv?n._markModelChangeEv=n.after("*:change",function(r){var i=r.target,s;i instanceof e.Model&&(!r.fromEditModel||!n.itsacmtemplate||!n.itsacmtemplate.get("modelsEditable"))&&(s=n.getNodeFromModel(i),s&&(s.addClass(y),e.later(t,n,function(){s&&s.removeClass(y)})))}):!t&&n._markModelChangeEv&&(n._markModelChangeEv.detach(),n._markModelChangeEv=null),t&&t>0&&!n._markModelAddEv?n._markModelAddEv=n.after("*:add",function(r){if(r.target instanceof e.ModelList){var i=n.getNodeFromIndex(r.index);i&&(i.addClass(y),e.later(t,n,function(){i&&i.removeClass(y)}))}}):!t&&n._markModelAddEv&&(n._markModelAddEv.detach(),n._markModelAddEv=null)},_setIntoViewAdded:function(t){var n=this;t>0&&!n._modelInViewAdded?n._modelInViewAdded=n.after("*:add",function(r){var i=n.itsacmtemplate,s=i&&i.get("newModelMode")===3;r.target instanceof e.ModelList&&n.scrollIntoView(r.index,{noFocus:!s,forceTop:t>2,editMode:s,showHeaders:t===2||t===4})}):t===0&&n._modelInViewAdded&&(n._modelInViewAdded.detach(),n._modelInViewAdded=null)},_setIntoViewChanged:function(t){var n=this;t>0&&!n._modelInViewChanged?n._modelInViewChanged=n.after("*:change",function(r){var i=r.target,s;i instanceof e.Model&&(s=n.getNodeFromModel(i),s&&n.scrollIntoView(s,{noFocus:!0,showHeaders:t===2}))}):t===0&&n._modelInViewChanged&&(n._modelInViewChanged.detach(),n._modelInViewChanged=null)},_setMouseDnUpEv:function(e){var t=this,n=t.get("contentBox");e&&!t._mouseDnModelEv?t._mouseDnModelEv=n.delegate("mousedown",function(e){var n=e.currentTarget,r=t.getModelFromNode(n);t.fire("modelMouseDown",{node:n,model:r})},"."+g):!e&&t._mouseDnModelEv&&(t._mouseDnModelEv.detach(),t._mouseDnModelEv=null),e&&!t._mouseUpModelEv?t._mouseUpModelEv=n.delegate("mouseup",function(e){var n=e.currentTarget,r=t.getModelFromNode(n);t.fire("modelMouseUp",{node:n,model:r})},"."+g):!e&&t._mouseUpModelEv&&(t._mouseUpModelEv.detach(),t._mouseUpModelEv=null)},_setHoverEv:function(e){var t=this,n=t.get("contentBox");e&&!t._mouseentModelEv?t._mouseentModelEv=n.delegate("mouseenter",function(e){var n=e.currentTarget,r=t.getModelFromNode(n);t.fire("modelMouseEnter",{node:n,model:r})},"."+g):!e&&t._mouseentModelEv&&(t._mouseentModelEv.detach(),t._mouseentModelEv=null),e&&!t._mouseleaveModelEv?t._mouseleaveModelEv=n.delegate("mouseleave",function(e){var n=e.currentTarget,r=t.getModelFromNode(n);t.fire("modelMouseLeave",{node:n,model:r})},"."+g):!e&&t._mouseleaveModelEv&&(t._mouseleaveModelEv.detach(),t._mouseleaveModelEv=null)},_handleModelSelectionChange:function(e){var t=this,n=e.currentTarget,r=t.getModelListInUse(),i=n.getData("modelClientId"),s=r&&r.getByClientId(i),o=t.get("modelsSelectable"),u=o==="single",a=e.shiftKey&&!u,f=e.metaKey||e.ctrlKey,l=t.get("viewFilter"),c,h,p,d,v,m,g,y,b,w;c=s&&t.modelIsSelected(s);if(s){if(u||!f)t.get("modelsUnselectable"
)&&(b=t._viewNode.all("."+C),w=b.size()>0&&b.item(0)),t.clearSelectedModels(!0,!0);if(a&&t._lastClkModel){h=[],p=r.indexOf(s),d=r.indexOf(t._lastClkModel),v=Math.min(p,d),m=Math.max(p,d);for(g=v;g<=m;g++)y=r.item(g),(!l||l(y))&&h.push(y);t.selectModels(h,!1,null,!0)}else c&&!w?t.unselectModels(s,!0):t.selectModels(s,!1,null,!0),t._lastClkModel=c?null:s;t._focusModelNode(n)}t._fireSelectedModels()},_getAllTemplateFuncs:function(e){var t=this,r=t.itsacmtemplate,i=e&&e.template||t.get("modelTemplate"),s=e&&e.template||t.get("classNameTemplate"),u=e&&e.groupHeader1||t.get("groupHeader1"),a=e&&e.groupHeader2||t.get("groupHeader2"),f=e&&e.groupHeader3||t.get("groupHeader3"),l=e&&e.groupHeader1Template||t.get("groupHeader1Template")||u,c=e&&e.groupHeader2Template||t.get("groupHeader2Template")||a,h=e&&e.groupHeader3Template||t.get("groupHeader3Template")||f,p=s&&s.length>0,d=u&&u.length>0,v=a&&a.length>0,m=f&&f.length>0,g,y,b,w,E,S,x,T,N,C,k,L,A,O,M,_,D,P,H,B,j;return _=function(e){var t=/<%(.+)%>/;return t.test(e)},P=_(i),H=d&&_(l),B=v&&_(c),j=m&&_(h),t._microTemplateUsed=P||H||B||j,r?P?(y=o.compile(i),g=function(e){return r._getModelEngine(e,null,y)}):g=function(e){return r._getModelEngine(e,i)}:P?(y=o.compile(i),g=function(e){return y(t.getModelToJSON(e))}):g=function(e){return n.sub(i,t.getModelToJSON(e))},_(s)?(y=o.compile(s),D=function(e){return y(t.getModelToJSON(e))}):D=function(e){return n.sub(s,t.getModelToJSON(e))},d&&_(u)?(w=o.compile(u),b=function(e){return w(t.getModelToJSON(e))}):b=function(e){return n.sub(u,t.getModelToJSON(e))},v&&_(a)?(S=o.compile(a),E=function(e){return S(t.getModelToJSON(e))}):E=function(e){return n.sub(a,t.getModelToJSON(e))},m&&_(f)?(T=o.compile(f),x=function(e){return T(t.getModelToJSON(e))}):x=function(e){return n.sub(f,t.getModelToJSON(e))},H?(C=o.compile(l),N=function(e){return C(t.getModelToJSON(e))}):N=function(e){return n.sub(l,t.getModelToJSON(e))},B?(L=o.compile(c),k=function(e){return L(t.getModelToJSON(e))}):k=function(e){return n.sub(c,t.getModelToJSON(e))},j?(O=o.compile(h),A=function(e){return O(t.getModelToJSON(e))}):A=function(e){return n.sub(h,t.getModelToJSON(e))},M={template:g,classNameTemplate:D,groupH1:b,groupH2:E,groupH3:x,renderGH1:N,renderGH2:k,renderGH3:A,activeClass:p,activeGH1:d,activeGH2:v,activeGH3:m},M},_tryRenderModel:function(t,n,r,s,o,u,a){var f=this,l,c,h,p,d;return p=e.rbind(u,f),d=e.rbind(s,f),h=function(e){var t=!1,n=p(e);return i.some(r,function(r){return r===e?!0:(t=p(r)===n,t)}),t},c=(!s||d(t))&&(!o||!u&&(l=a.template(t))!==n||u&&!h(t)),c&&(l||a.template(t))},_clearAbberantModelList:function(){var e=this;e._abModelList&&e._abModelList.destroy(),e._abModelList=null},_renderView:function(e,t){var r=this,i=r._viewNode,o=r.get("contentBox"),u=r.get("modelList"),f=e&&e.noDups||r.get("noDups"),d=e&&e.dupComparator||r.get("dupComparator"),v=e&&e.viewFilter||r.get("viewFilter"),m=r.pages,y=e&&e.limitModels,b=y||r.get("limitModels"),k=r._templFns,L=e&&e.lastItemOnTop||r.get("lastItemOnTop"),A=r.itsainfiniteview,O=o.one(".yui3-widget-bd"),M,_,D,P,H,B,j,F,q,R,U,z,W,X,V,$,J,K,Q,G,Y,Z,et;t=t||{},t.page=t.page||r._currentViewPg,X=r._currentViewPg!==t.page,t.rebuild=X||(n.isBoolean(t.rebuild)?t.rebuild:!0),t.incrementbuild=n.isBoolean(t.incrementbuild)?t.incrementbuild:!t.rebuild,t.keepstyles=n.isBoolean(t.keepstyles)?t.keepstyles:!0,o.one("#"+r._viewId)||(r._set("srcNode",o),o=o.one(".yui3-widget-bd")||o,r.get("listType")==="ul"?O?r.set("bodyContent",i):o.setHTML(i):(O?r.set("bodyContent",h):o.setHTML(h),Z=o.one("table"),Z&&Z.append(i))),K=u._items.concat(),Y=K.length,t.rebuild?(V=t.page*b-1,r._prevH1=null,r._prevH2=null,r._prevH3=null,r._even=!1,A&&(r._itmsAvail=!0),r.get("boundingBox").addClass(x),i.addClass(T)):(i.all("."+w).removeClass(w),V=r._prevLastModelIndex||-1),t.incrementbuild||(W=s.create(r.get("listType")==="ul"?a:p)),r._generateAbberantModelList?(B=e&&e.modelConfig||r.get("modelConfig"),j=e&&e.splitDays||r.get("splitDays"),B&&B.date&&(j&&B.enddate||B.count)?(r._generateAbberantModelList(A,t.rebuild),u=r._abModelList,K=u._items.concat(),Y=K.length):r._clearAbberantModelList()):r._clearAbberantModelList(),U=b>0?Math.min(Y,(t.page+1)*b):Y,z=U<Y,G=0,Q=A?Math.min(r.itsainfiniteview.get("batchSize"),Y):Y,V>0&&r._removeEmptyItem();while(G<Q&&++V<U){J=K[V],q=r._tryRenderModel(J,R,K,v,f,d,k);if(q){G===0&&(r.get("boundingBox").removeClass(x),i.removeClass(T),t.initbuild&&(r.get("boundingBox").removeClass(E),i.removeClass(S))),G++,F=r._createModelNode(J,q,u);for($=0;$<F.length;$++)t.incrementbuild?i.append(F[$]):W.append(F[$]);r._even=!r._even,f&&!d&&(R=q)}}F&&F.length>0&&L===0&&F[F.length-1].addClass(w),r._prevLastModelIndex=V,t.incrementbuild||(t.keepstyles&&(D=function(e,t){var n;return t.some(function(t){var r=t.getData("modelClientId")===e;return r&&(n=t),r}),n},P=i.all("."+g),H=W.all("."+g),P.each(function(e){var t=e.hasClass(C),n=e.hasClass(N),r;if(t||n)r=D(e.getData("modelClientId"),H),r&&(r.toggleClass(C,t),r.toggleClass(N,n))})),r._microTemplateUsed&&i.cleanup(),O?r.set("bodyContent",W):i.replace(W),i=r._viewNode=W,W.set("id",r._viewId)),i.getHTML()===""&&(et=r.get("listType")==="ul"?l:c,i.setHTML(n.sub(et,{cols:1,content:I}))),F&&L>0&&(!A||!r._itmsAvail||z)&&r._addEmptyItem(F[F.length-1],L),r._currentViewPg=t.page,r.syncUI(),m&&(M=m.get("index"),_=i.get("children").size()-1,M>_&&m.set("index",_)),A&&A.checkExpansion(),r.fire("modelListRender")},_repositionModel:function(){this._renderView()},_createModelNode:function(t,n,r){var i=this,o=i.getModelAttr(t,"clientId"),u=[],a=i.itsacmtemplate,l=i.get("listType")==="ul"?f:d,c=s.create(l),h,p,v,m,y;return y=i._templFns,y.activeGH1&&(h=y.groupH1(t),h!==i._prevH1&&(m=s.create(l),m.addClass(O),m.addClass(M),i._prevH1&&m.addClass(P),m.setHTML(y.renderGH1(t)),u.push(m),i._prevH1=h,i._even=!1,i._prevH2=null)),y.activeGH2&&(p=y.groupH2(t),p!==i._prevH2&&(m=s.create(l),m.addClass(O),m.addClass(_),i._prevH2&&m.addClass(P),m.setHTML(y.renderGH2(t)),u.push(m),i._prevH2=p,i._even=!1,i.
_prevH3=null)),y.activeGH3&&(v=y.groupH3(t),v!==i._prevH3&&(m=s.create(l),m.addClass(O),m.addClass(D),i._prevH3&&m.addClass(P),m.setHTML(y.renderGH3(t)),u.push(m),i._prevH3=v,i._even=!1)),c.setData("modelClientId",o),y.activeClass&&c.addClass(y.classNameTemplate(t)),c.addClass(g),c.addClass(o),c.addClass(i._even?k:L),typeof r.classnameRenderer=="function"&&c.addClass(r.classnameRenderer(t)),a&&a._getMode(t)===3&&!c.itsatabkeymanager&&e.use("gallery-itsatabkeymanager",function(e){c.plug(e.Plugin.ITSATabKeyManager)}),c.setHTML(n||y.template(t)),u.push(c),u},_addEmptyItem:function(e,t){var r=this,i=r.get("axis"),o=i.y,u=r.get("boundingBox"),a=t||r.get("lastItemOnTop"),f=r._viewNode,h=r.get("listType")==="ul",p=h?l:c,d,v,y,b,w,E;r._removeEmptyItem(),e||(b=f.all("."+g),w=b.size(),w>0&&(e=b.item(w-1))),h||(E=e.all(">td").size()),p=n.sub(p,{cols:E,content:""}),d=s.create(p),d.addClass(m),v=u.get(o?"offsetHeight":"offsetWidth"),e&&(o?y=v-e.get("offsetHeight")-z(e,"marginTop")-z(e,"marginBottom"):y=v-e.get("offsetWidth")-z(e,"marginLeft")-z(e,"marginRight")),e=e&&e.previous();if(a===2)while(e&&e.hasClass(O))o?y-=e.get("offsetHeight")+z(e,"marginTop")+z(e,"marginBottom"):y-=e.get("offsetWidth")+z(e,"marginLeft")+z(e,"marginRight"),e=e.previous();d.setStyle(o?"height":"width",y+"px"),y>0&&f.append(d)},_removeEmptyItem:function(){var e=this,t;t=e._viewNode.one("."+m),t&&t.remove(!0)},_getNodeFromModelOrIndex:function(e,t,r){var i=this,s=i.hasPlugin("itsainfiniteview"),o=n.isNumber(r)?r:s&&s.get("maxExpansions")||0,u=0,a=!1,f,l,c;e&&(c=i.getModelAttr(e,"clientId")),l=function(n,r){var i=e?n.getData("modelClientId")===c:r===t;return i&&(a=n),i};do f=i._viewNode.all("."+g),f.some(l),u++;while(!a&&s&&u<o&&s.expandList());return a},_selectModel:function(e,t,n,i){var s=this,o=s.getModelAttr(e,"clientId"),u=s.get("contentBox"),a=!t&&s.get("modelsUnselectable")&&r.size(s._selectedModels)===1,f;o&&(!a||i)?(s.hasPlugin("itsainfiniteview")&&s._getNodeFromModelOrIndex(e,null,n),f=u.one("."+o),f&&(t||f.blur(),f.toggleClass(C,t)),t?s._selectedModels[o]=e:delete s._selectedModels[o]):!o},_fireSelectedModels:function(t){var n=this,r,i;t||(t={}),r=n.getSelectedModels(),i=n._abModelList?n.getSelectedModels(!0):r,n.fire("modelSelectionChange",e.merge(t,{newModelSelection:r,originalModelSelection:i}))},_clearEventhandlers:function(){i.each(this._handlers,function(e){e.detach()})}},!0),e.ITSAModellistViewExtention=V},"@VERSION@",{requires:["yui-base","node-base","node-style","node-event-delegate","base-build","base-base","widget-base","oop","yui-later","dom-screen","pluginhost-base","event-mouseenter","event-custom","model","model-list","lazy-model-list","json-stringify","template-base","template-micro","event-tap","gallery-itsawidgetrenderpromise"],skinnable:!0});
