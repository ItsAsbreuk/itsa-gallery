YUI.add("gallery-itsamodellistviewextention",function(e,t){"use strict";function z(){}function W(){}function X(){}var n=e.Lang,r=e.Object,i=e.Array,s=e.Node,o=e.Template.Micro,u='<ul role="presentation"></ul>',a='<li role="presentation"></li>',f="<li>{content}</li>",l='<tr><td colspan="{cols}">{content}</td></tr>',c='<table role="presentation"></table>',h="<tbody></tbody>",p='<tr role="presentation"></tr>',d="<div>{loading}</div>",v="itsa-scrollview-fillelement",m="itsa-model",g=m+"-changed",y="itsa-modellistview",b=y+"-lastitem",w=y+"-noinitialitems",E=y+"-view-noinitialitems",S=y+"-noitems",x=y+"-view-noitems",T=m+"-focus",N=m+"-selected",C=m+"-even",k=m+"-odd",L=y+"-styled",A=y+"-groupheader",O=y+"-groupheader1",M=y+"-groupheader2",_=y+"-groupheader3",D=y+"-sequelgroupheader",P=y+"-unselectable",H=y+"-showloading",B="yui3-form",j="Loading...",F="No data to display",I="itsa-button-datetime",q="yui3-itsaformelement",R=q+"-inputbutton",U=function(e,t){return parseInt(e.getStyle(t),10)};e.mix(z.prototype,{getModelAttr:function(e,t){return e&&(e.get&&typeof e.get=="function"?e.get(t):e[t])},setModelAttr:function(e,t,n,r){var i=this,s,o;e&&(s=!e.get||typeof e.get!="function",s?(o=i.revive(e),e[t]=n,o&&(o.set(t,n,r),i.free(o))):e.set(t,n,r))},getModelToJSON:function(e){return e.get&&typeof e.get=="function"?e.toJSON():e},isModifiedModel:function(e){var t=!e.get||typeof e.get!="function";return this.isNewModel(e)||(t?e._changed:!r.isEmpty(e.changed))},isNewModel:function(e){return!n.isValue(this.getModelAttr(e,"id"))}},!0),e.ITSAModellistAttrExtention=z,e.Base.mix(e.ModelList,[z]),e.mix(W.prototype,{cleanup:function(){var t=this,n=e.Widget;n&&t.all(".yui3-widget").each(function(e){if(t.one("#"+e.get("id"))){var r=n.getByNode(e);r&&r.destroy(!0)}}),t.all("children").destroy(!0)}},!0),e.Node.ITSANodeCleanup=W,e.Base.mix(e.Node,[W]),X.ATTRS={modelList:{value:null,validator:function(e){return e===null||e.getByClientId||n.isArray(e)},setter:"_setModelList"},noDups:{value:!1,validator:function(e){return typeof e=="boolean"},setter:"_setNoDups"},listType:{value:"ul",validator:function(e){return e==="ul"||e==="table"},writeOnce:"initOnly"},limitModels:{value:0,validator:function(e){return typeof e=="number"},setter:"_setLimitModels"},viewFilter:{value:null,validator:function(e){return e===null||typeof e=="function"},setter:"_setViewFilter"},modelsSelectable:{value:null,lazyAdd:!1,validator:function(e){return e===null||e===""||typeof e=="boolean"||e==="single"||e==="multi"},setter:"_setModelsSel"},modelsUnselectable:{value:!1,validator:function(e){return typeof e=="boolean"}},modelListStyled:{value:!0,lazyAdd:!1,validator:function(e){return typeof e=="boolean"},setter:"_setModelListStyled"},clickSensivity:{value:2,validator:function(e){return typeof e=="number"&&e>=0&&e<11}},clickEvents:{value:!1,lazyAdd:!1,validator:function(e){return typeof e=="boolean"},setter:"_setClkEv"},dblclickEvents:{value:!1,lazyAdd:!1,validator:function(e){return typeof e=="boolean"},setter:"_setDblclkEv"},highlightAfterModelChange:{value:0,validator:function(e){return typeof e=="number"},setter:"_setMarkModelChange"},modelsIntoViewAfterAdd:{value:!1,validator:function(e){return typeof e=="number"&&e>=0&&e<=4},setter:"_setIntoViewAdded"},modelsIntoViewAfterChange:{value:!1,validator:function(e){return typeof e=="number"&&e>=0&&e<=2},setter:"_setIntoViewChanged"},mouseDownUpEvents:{value:!1,lazyAdd:!1,validator:function(e){return typeof e=="boolean"},setter:"_setMouseDnUpEv"},hoverEvents:{value:!1,lazyAdd:!1,validator:function(e){return typeof e=="boolean"},setter:"_setHoverEv"},groupHeader1:{value:null,validator:function(e){return e===null||typeof e=="string"},setter:"_setGrpH1"},groupHeader2:{value:null,validator:function(e){return e===null||typeof e=="string"},setter:"_setGrpH2"},groupHeader3:{value:null,validator:function(e){return e===null||typeof e=="string"},setter:"_setGrpH3"},modelTemplate:{value:"{clientId}",validator:function(e){return typeof e=="string"},setter:"_setModelTemplate"},classNameTemplate:{value:null,validator:function(e){return typeof e=="string"},setter:"_setClassNameTempl"},groupHeader1Template:{value:null,validator:function(e){return e===null||typeof e=="string"},setter:"_setGH1Templ"},groupHeader2Template:{value:null,validator:function(e){return e===null||typeof e=="string"},setter:"_setGH2Templ"},groupHeader3Template:{value:null,validator:function(e){return e===null||typeof e=="string"},setter:"_setGH3Templ"},dupComparator:{value:null,validator:function(e){return e===null||typeof e=="function"},setter:"_setDupComp"},showLoadMessage:{value:!1,validator:function(e){return typeof e=="boolean"}}},e.mix(X.prototype,{initializer:function(){var t=this;t.publish("modelListRender",{emitFacade:!0}),t._handlers=[],t._origModels=[],t._selModelEv=null,t._clkModelEv=null,t._dblclkModelEv=null,t._mouseentModelEv=null,t._mouseUpModelEv=null,t._mouseDnModelEv=null,t._mouseleaveModelEv=null,t._markModelChangeEv=null,t._markModelAddEv=null,t._modelInViewChanged=null,t._modelInViewAdded=null,t._selectedModels={},t._viewNode=null,t._viewId=e.guid(),t._currentViewPg=0,t._templFns=null,t._lastClkModel=null,t._abModelList=null,t._viewFilterInit=!1,t._grpH1Init=!1,t._grpH2Init=!1,t._grpH3Init=!1,t._gH1TemplateInit=!1,t._gH2TemplateInit=!1,t._gH3TemplateInit=!1,t._modelTemplateInit=!1,t._renderClassInit=!1,t._dupCompInit=!1,t._noDupsInit=!1,t._limModelsInit=!1,t._rerendAttrChg=!0,t._itmsAvail=!1,t._prevLastModelIndex=-1,t._listLazy=!1,t._prevH1=null,t._prevH2=null,t._prevH3=null,t._even=!1,t._microTemplateUsed=null},renderer:function(){var e=this;e.constructor.superclass.renderer.apply(e),e._render()},setWithoutRerender:function(e,t,n){var r=this;r._rerendAttrChg=!1,r.set(e,t,n),r._rerendAttrChg=!0},getNodeFromIndex:function(e,t){return this._getNodeFromModelOrIndex(null,e,t)},getNodeFromModel:function(e,t){return this._getNodeFromModelOrIndex(e,null,t)},saveScrollTo:function(){},scrollIntoView:function(){},modelIsSelected:
function(e){var t=this,r;return n.isArray(e)?i.some(e,function(e){return r=t._selectedModels[t.getModelAttr(e,"clientId")],r?!1:!0}):r=t._selectedModels[t.getModelAttr(e,"clientId")],n.isValue(r)},selectModels:function(e,t,r,s,o){var u=this,a=n.isArray(e),f=u.get("modelsSelectable")==="single",l,c;f&&u.clearSelectedModels(!0,!0),s||(c=u.get("contentBox"),l=c.all("."+N).size()),a&&!f?(i.each(e,function(e){u._selectModel(e,!0,o)}),t&&e.length>0&&u.scrollIntoView(e[0],r,o)):(a&&(e=e[0]),u._selectModel(e,!0,o),t&&u.scrollIntoView(e,r,o)),!s&&l!==c.all("."+N).size()&&u._fireSelectedModels()},unselectModels:function(e,t,r){var s=this,o,u;t||(u=s.get("contentBox"),o=u.all("."+N).size()),n.isArray(e)?i.each(e,function(e){s._selectModel(e,!1,null,r)}):s._selectModel(e,!1,null,r),!t&&o!==u.all("."+N).size()&&s._fireSelectedModels()},clearSelectedModels:function(e,t){var n=this,r=n.get("contentBox"),i,s,o,u,a,f,l;i=function(){s.each(function(e){e.blur()})},s=r.all("."+N),u=s.size()>0&&s.item(0),e?(i(),s.removeClass(N)):(o=s.size()>0,i(),s.removeClass(N),o&&n._fireSelectedModels()),n._selectedModels={},n.get("modelsUnselectable")&&u&&!t&&(a=u.getData("modelClientId"),l=n.getModelListInUse(),f=l.getByClientId(a),n.selectModels(f,!1,null,!0))},getSelectedModels:function(e){var t=this,n;return e?(n=[],r.each(t._selectedModels,function(e){var r=t._origModels[t.getModelAttr(e,"clientId")];(!r||i.indexOf(n,r)===-1)&&n.push(r||e)})):n=r.values(t._selectedModels),n},renderView:function(){this._renderView()},getModelListInUse:function(){return this._abModelList||this.get("modelList")},getModelFromNode:function(e){var t=this,n=t.get("modelList"),r=e.getData("modelClientId");return n&&n.getByClientId(r)},getModelAttr:function(e,t){return e&&(e.get&&typeof e.get=="function"?e.get(t):e[t])},setModelAttr:function(e,t,n,r){var i=this,s,o;e&&(i._listLazy?(s=i.get("modelList"),o=s.revive(e),e[t]=n,o&&(o.set(t,n,r),s.free(o))):e.set(t,n,r))},getModelToJSON:function(e){return e.get&&typeof e.get=="function"?e.toJSON():e},isModifiedModel:function(e){var t=this;return t.isNewModel(e)||(t._listLazy?e._changed:!r.isEmpty(e.changed))},isNewModel:function(e){return!n.isValue(this.getModelAttr(e,"id"))},destructor:function(){var e=this,t=e.get("modelList");e._clearEventhandlers(),t.removeTarget(e),e._selModelEv&&e._selModelEv.detach(),e._clkModelEv&&e._clkModelEv.detach(),e._dblclkModelEv&&e._dblclkModelEv.detach(),e._mouseDnModelEv&&e._mouseDnModelEv.detach(),e._mouseUpModelEv&&e._mouseUpModelEv.detach(),e._mouseentModelEv&&e._mouseentModelEv.detach(),e._mouseleaveModelEv&&e._mouseleaveModelEv.detach(),e._markModelChangeEv&&e._markModelChangeEv.detach(),e._markModelAddEv&&e._markModelAddEv.detach(),e._modelInViewChanged&&e._modelInViewChanged.detach(),e._modelInViewAdded&&e._modelInViewAdded.detach(),e._clearAbberantModelList(),e._viewNode.destroy(!0)},_render:function(){var e=this,t=e.get("modelList"),r=e.get("listType"),i=e.get("boundingBox"),o=e.get("contentBox"),a;o=o.one(".yui3-widget-bd")||o,o.setHTML(n.sub(d,{loading:j})),e._viewNode=a=s.create(r==="ul"?u:h),a.set("id",e._viewId),a.addClass(x).addClass(E),i.addClass(S).addClass(w),e.get("showLoadMessage")&&i.addClass(H),e._templFns=e._getAllTemplateFuncs(),e._extraBindUI(),t&&e._renderView(null,{incrementbuild:!0,initbuild:!0})},_focusModelNode:function(e){e&&(this._viewNode.all("."+T).removeClass(T),e.addClass(T),e.focus())},_getMaxPaginatorGotoIndex:function(e,t){var n=this,r=n.hasPlugin("pages"),i=n.getModelListInUse(),s=n.get("axis"),o=s.y,u=n.get("boundingBox").get(o?"offsetHeight":"offsetWidth"),a=0,f,l,c;if(r&&i.size()>0){f=n.getNodeFromIndex(Math.min(e,i.size()-1),t),o?l=f.get("offsetHeight")+U(f,"marginTop")+U(f,"marginBottom"):l=f.get("offsetWidth")+U(f,"marginLeft")+U(f,"marginRight"),c=n._viewNode.all(">li"),a=c.size();while(f&&--a>=0&&l<u)f=c.item(a),o?l+=f.get("offsetHeight")+U(f,"marginTop")+U(f,"marginBottom"):l+=f.get("offsetWidth")+U(f,"marginLeft")+U(f,"marginRight");l>=u&&a++}return a},_extraBindUI:function(){var t=this,n=t.get("boundingBox"),r=t.get("contentBox"),i=t.get("modelList"),s=t._handlers;i&&(i.addTarget(t),n.addClass(y)),s.push(t.after("modelListChange",function(e){var s=e.newVal,o=e.prevVal;i=s,o&&o.removeTarget(t),s?(s.addTarget(t),n.addClass(y),t._renderView(null,{incrementbuild:!o,initbuild:!o})):(n.removeClass(y),r.setHTML(""))})),s.push(n.delegate("click",function(){t._gesture=null},function(){var e=Math.abs(t.lastScrolledAmt)>t.get("clickSensivity");return!e})),s.push(t.after("*:change",function(n){var r=n.target;if(r instanceof e.Model){if(!n.fromEditModel||!t.itsacmtemplate||!t.itsacmtemplate.get("modelsEditable"))i&&i.comparator&&(i.sort(),t._listLazy&&i.free()),t._repositionModel(r);t.modelIsSelected(r)&&t._fireSelectedModels()}})),s.push(t.after("*:destroy",function(n){var r=n.target;r instanceof e.Model&&t.modelIsSelected(r)&&t._fireSelectedModels()})),s.push(r.delegate("click",function(e){Math.abs(t.lastScrolledAmt)>t.get("clickSensivity")&&(e.preventDefault(),e.stopImmediatePropagation())},function(){return this.test("input[type=button],button,a,.focusable,."+I+",."+R)})),s.push(n.delegate("mousedown",function(e){e.preventDefault()},function(){var e=this.get("tagName");return e==="A"||e==="IMG"})),s.push(t.after(["*:remove","*:add"],function(n){var r=n.target;r instanceof e.ModelList&&(t._listLazy&&r.free(),t._renderView())})),s.push(t.after(["*:reset"],function(n){n.target instanceof e.ModelList&&t._renderView(null,{keepstyles:!1,initbuild:!0})})),s.push(t.after(["itsamodellistviewextention:destroy","itsamodellistviewextention:pluggedin"],function(n){n.target instanceof e.ModelList&&t._renderView(null,{keepstyles:!1,initbuild:!0})})),t.get("highlightAfterModelChange"),t.get("modelsIntoViewAfterAdd"),t.get("modelsIntoViewAfterChange")},_setModelList:function(t){var r=this;return n.isArray(t)&&(t=new e.LazyModelList({items:t})),r._listLazy=t&&t.revive,r._itmsAvail=t&&t.size()>0,t},_setNoDups:function(e){var t=this;t._noDupsInit?
t._rerendAttrChg&&t._renderView({noDups:e}):t._noDupsInit=!0},_setLimitModels:function(e){var t=this;t._limModelsInit?t._rerendAttrChg&&t._renderView({limitModels:e}):t._limModelsInit=!0},_setViewFilter:function(e){var t=this;t._viewFilterInit?t._rerendAttrChg&&t._renderView({viewFilter:e}):t._viewFilterInit=!0},_setDupComp:function(e){var t=this;t._dupCompInit?t._rerendAttrChg&&t.get("noDups")&&t._renderView({dupComparator:e}):t._dupCompInit=!0},_setGrpH1:function(e){var t=this;t._grpH1Init?(t._templFns=t._getAllTemplateFuncs({groupHeader1:e}),t._rerendAttrChg&&t._renderView()):t._grpH1Init=!0},_setGrpH2:function(e){var t=this;t._grpH2Init?(t._templFns=t._getAllTemplateFuncs({groupHeader2:e}),t._rerendAttrChg&&t._renderView()):t._grpH2Init=!0},_setGrpH3:function(e){var t=this;t._grpH3Init?(t._templFns=t._getAllTemplateFuncs({groupHeader3:e}),t._rerendAttrChg&&t._renderView()):t._grpH3Init=!0},_setGH1Templ:function(e){var t=this;t._gH1TemplateInit?(t._templFns=t._getAllTemplateFuncs({groupHeader1Template:e}),t._rerendAttrChg&&t._renderView()):t._gH1TemplateInit=!0},_setGH2Templ:function(e){var t=this;t._gH2TemplateInit?(t._templFns=t._getAllTemplateFuncs({groupHeader2Template:e}),t._rerendAttrChg&&t._renderView()):t._gH2TemplateInit=!0},_setGH3Templ:function(e){var t=this;t._gH3TemplateInit?(t._templFns=t._getAllTemplateFuncs({groupHeader3Template:e}),t._rerendAttrChg&&t._renderView()):t._gH3TemplateInit=!0},_setModelTemplate:function(e){var t=this;t._modelTemplateInit?(t._templFns=t._getAllTemplateFuncs({template:e}),t._rerendAttrChg&&t._renderView()):t._modelTemplateInit=!0},_setClassNameTempl:function(e){var t=this;t._renderClassInit?(t._templFns=t._getAllTemplateFuncs({classNameTemplate:e}),t._rerendAttrChg&&t._renderView()):t._renderClassInit=!0},_setModelsSel:function(t){var r=this,i=r.get("contentBox");return t===""||!t?t=null:n.isBoolean(t)&&(t="multi"),e.UA.ie>0&&i.setAttribute("unselectable",t==="multi"?"on":""),i.toggleClass(P,t==="multi"),r._setSelectableEvents(t),t},_setModelListStyled:function(e){var t=this;t.get("boundingBox").toggleClass(L,e).toggleClass(B,e)},_setSelectableEvents:function(t){var n=this,r=n.get("contentBox");n.clearSelectedModels(),t&&!n._selModelEv?n._selModelEv=r.delegate("tap",e.rbind(n._handleModelSelectionChange,n),function(e,t){var n=t.target.test("input[type=button],button,a,.focusable,."+I+",."+R);return!n&&this.hasClass(m)}):!t&&n._selModelEv&&(n._selModelEv.detach(),n._selModelEv=null)},_setClkEv:function(e){var t=this,n=t.get("contentBox");e&&!t._clkModelEv?t._clkModelEv=n.delegate("tap",function(e){var n=e.currentTarget,r=t.getModelFromNode(n);t.fire("modelClick",{node:n,model:r})},function(e,t){var n=t.target.test("input[type=button],button,a,.focusable,."+I+",."+R);return!n&&this.hasClass(m)}):!e&&t._clkModelEv&&(t._clkModelEv.detach(),t._clkModelEv=null)},_setDblclkEv:function(e){var t=this,n=t.get("contentBox");e&&!t._dblclkModelEv?t._dblclkModelEv=n.delegate("dblclick",function(e){var n=e.currentTarget,r=t.getModelFromNode(n);t.fire("modelDblclick",{node:n,model:r})},"."+m):!e&&t._dblclkModelEv&&(t._dblclkModelEv.detach(),t._dblclkModelEv=null)},_setMarkModelChange:function(t){var n=this;t&&t>0&&!n._markModelChangeEv?n._markModelChangeEv=n.after("*:change",function(r){var i=r.target,s;i instanceof e.Model&&(!r.fromEditModel||!n.itsacmtemplate||!n.itsacmtemplate.get("modelsEditable"))&&(s=n.getNodeFromModel(i),s&&(s.addClass(g),e.later(t,n,function(){s&&s.removeClass(g)})))}):!t&&n._markModelChangeEv&&(n._markModelChangeEv.detach(),n._markModelChangeEv=null),t&&t>0&&!n._markModelAddEv?n._markModelAddEv=n.after("*:add",function(r){if(r.target instanceof e.ModelList){var i=n.getNodeFromIndex(r.index);i&&(i.addClass(g),e.later(t,n,function(){i&&i.removeClass(g)}))}}):!t&&n._markModelAddEv&&(n._markModelAddEv.detach(),n._markModelAddEv=null)},_setIntoViewAdded:function(t){var n=this;t>0&&!n._modelInViewAdded?n._modelInViewAdded=n.after("*:add",function(r){var i=n.itsacmtemplate,s=i&&i.get("newModelMode")===3;r.target instanceof e.ModelList&&n.scrollIntoView(r.index,{noFocus:!s,forceTop:t>2,editMode:s,showHeaders:t===2||t===4})}):t===0&&n._modelInViewAdded&&(n._modelInViewAdded.detach(),n._modelInViewAdded=null)},_setIntoViewChanged:function(t){var n=this;t>0&&!n._modelInViewChanged?n._modelInViewChanged=n.after("*:change",function(r){var i=r.target,s;i instanceof e.Model&&(s=n.getNodeFromModel(i),s&&n.scrollIntoView(s,{noFocus:!0,showHeaders:t===2}))}):t===0&&n._modelInViewChanged&&(n._modelInViewChanged.detach(),n._modelInViewChanged=null)},_setMouseDnUpEv:function(e){var t=this,n=t.get("contentBox");e&&!t._mouseDnModelEv?t._mouseDnModelEv=n.delegate("mousedown",function(e){var n=e.currentTarget,r=t.getModelFromNode(n);t.fire("modelMouseDown",{node:n,model:r})},"."+m):!e&&t._mouseDnModelEv&&(t._mouseDnModelEv.detach(),t._mouseDnModelEv=null),e&&!t._mouseUpModelEv?t._mouseUpModelEv=n.delegate("mouseup",function(e){var n=e.currentTarget,r=t.getModelFromNode(n);t.fire("modelMouseUp",{node:n,model:r})},"."+m):!e&&t._mouseUpModelEv&&(t._mouseUpModelEv.detach(),t._mouseUpModelEv=null)},_setHoverEv:function(e){var t=this,n=t.get("contentBox");e&&!t._mouseentModelEv?t._mouseentModelEv=n.delegate("mouseenter",function(e){var n=e.currentTarget,r=t.getModelFromNode(n);t.fire("modelMouseEnter",{node:n,model:r})},"."+m):!e&&t._mouseentModelEv&&(t._mouseentModelEv.detach(),t._mouseentModelEv=null),e&&!t._mouseleaveModelEv?t._mouseleaveModelEv=n.delegate("mouseleave",function(e){var n=e.currentTarget,r=t.getModelFromNode(n);t.fire("modelMouseLeave",{node:n,model:r})},"."+m):!e&&t._mouseleaveModelEv&&(t._mouseleaveModelEv.detach(),t._mouseleaveModelEv=null)},_handleModelSelectionChange:function(e){var t=this,n=e.currentTarget,r=t.getModelListInUse(),i=n.getData("modelClientId"),s=r&&r.getByClientId(i),o=t.get("modelsSelectable"),u=o==="single",a=e.shiftKey&&!u,f=e.metaKey||e.ctrlKey,l=t.get("viewFilter"),c,h,p,d,v,m,g,y,b,w;c=s&&t.modelIsSelected(s);if(s){if(
u||!f)t.get("modelsUnselectable")&&(b=t._viewNode.all("."+N),w=b.size()>0&&b.item(0)),t.clearSelectedModels(!0,!0);if(a&&t._lastClkModel){h=[],p=r.indexOf(s),d=r.indexOf(t._lastClkModel),v=Math.min(p,d),m=Math.max(p,d);for(g=v;g<=m;g++)y=r.item(g),(!l||l(y))&&h.push(y);t.selectModels(h,!1,null,!0)}else c&&!w?t.unselectModels(s,!0):t.selectModels(s,!1,null,!0),t._lastClkModel=c?null:s;t._focusModelNode(n)}t._fireSelectedModels()},_getAllTemplateFuncs:function(e){var t=this,r=t.itsacmtemplate,i=e&&e.template||t.get("modelTemplate"),s=e&&e.template||t.get("classNameTemplate"),u=e&&e.groupHeader1||t.get("groupHeader1"),a=e&&e.groupHeader2||t.get("groupHeader2"),f=e&&e.groupHeader3||t.get("groupHeader3"),l=e&&e.groupHeader1Template||t.get("groupHeader1Template")||u,c=e&&e.groupHeader2Template||t.get("groupHeader2Template")||a,h=e&&e.groupHeader3Template||t.get("groupHeader3Template")||f,p=s&&s.length>0,d=u&&u.length>0,v=a&&a.length>0,m=f&&f.length>0,g,y,b,w,E,S,x,T,N,C,k,L,A,O,M,_,D,P,H,B,j;return _=function(e){var t=/<%(.+)%>/;return t.test(e)},P=_(i),H=d&&_(l),B=v&&_(c),j=m&&_(h),t._microTemplateUsed=P||H||B||j,r?P?(y=o.compile(i),g=function(e){return r._getModelEngine(e,null,y)}):g=function(e){return r._getModelEngine(e,i)}:P?(y=o.compile(i),g=function(e){return y(t.getModelToJSON(e))}):g=function(e){return n.sub(i,t.getModelToJSON(e))},_(s)?(y=o.compile(s),D=function(e){return y(t.getModelToJSON(e))}):D=function(e){return n.sub(s,t.getModelToJSON(e))},d&&_(u)?(w=o.compile(u),b=function(e){return w(t.getModelToJSON(e))}):b=function(e){return n.sub(u,t.getModelToJSON(e))},v&&_(a)?(S=o.compile(a),E=function(e){return S(t.getModelToJSON(e))}):E=function(e){return n.sub(a,t.getModelToJSON(e))},m&&_(f)?(T=o.compile(f),x=function(e){return T(t.getModelToJSON(e))}):x=function(e){return n.sub(f,t.getModelToJSON(e))},H?(C=o.compile(l),N=function(e){return C(t.getModelToJSON(e))}):N=function(e){return n.sub(l,t.getModelToJSON(e))},B?(L=o.compile(c),k=function(e){return L(t.getModelToJSON(e))}):k=function(e){return n.sub(c,t.getModelToJSON(e))},j?(O=o.compile(h),A=function(e){return O(t.getModelToJSON(e))}):A=function(e){return n.sub(h,t.getModelToJSON(e))},M={template:g,classNameTemplate:D,groupH1:b,groupH2:E,groupH3:x,renderGH1:N,renderGH2:k,renderGH3:A,activeClass:p,activeGH1:d,activeGH2:v,activeGH3:m},M},_tryRenderModel:function(t,n,r,s,o,u,a){var f=this,l,c,h,p,d;return p=e.rbind(u,f),d=e.rbind(s,f),h=function(e){var t=!1,n=p(e);return i.some(r,function(r){return r===e?!0:(t=p(r)===n,t)}),t},c=(!s||d(t))&&(!o||!u&&(l=a.template(t))!==n||u&&!h(t)),c&&(l||a.template(t))},_clearAbberantModelList:function(){var e=this;e._abModelList&&e._abModelList.destroy(),e._abModelList=null},_renderView:function(e,t){var r=this,i=r._viewNode,o=r.get("contentBox"),a=r.get("modelList"),p=e&&e.noDups||r.get("noDups"),d=e&&e.dupComparator||r.get("dupComparator"),v=e&&e.viewFilter||r.get("viewFilter"),g=r.pages,y=e&&e.limitModels,C=y||r.get("limitModels"),k=r._templFns,L=e&&e.lastItemOnTop||r.get("lastItemOnTop"),A=r.itsainfiniteview,O=o.one(".yui3-widget-bd"),M,_,D,P,H,B,j,I,q,R,U,z,W,X,V,$,J,K,Q,G,Y,Z,et;t=t||{},t.page=t.page||r._currentViewPg,X=r._currentViewPg!==t.page,t.rebuild=X||(n.isBoolean(t.rebuild)?t.rebuild:!0),t.incrementbuild=n.isBoolean(t.incrementbuild)?t.incrementbuild:!t.rebuild,t.keepstyles=n.isBoolean(t.keepstyles)?t.keepstyles:!0,o.one("#"+r._viewId)||(r._set("srcNode",o),o=o.one(".yui3-widget-bd")||o,r.get("listType")==="ul"?O?r.set("bodyContent",i):o.setHTML(i):(O?r.set("bodyContent",c):o.setHTML(c),Z=o.one("table"),Z&&Z.append(i))),K=a._items.concat(),Y=K.length,t.rebuild?(V=t.page*C-1,r._prevH1=null,r._prevH2=null,r._prevH3=null,r._even=!1,A&&(r._itmsAvail=!0),r.get("boundingBox").addClass(S),i.addClass(x)):(i.all("."+b).removeClass(b),V=r._prevLastModelIndex||-1),t.incrementbuild||(W=s.create(r.get("listType")==="ul"?u:h)),r._generateAbberantModelList?(B=e&&e.modelConfig||r.get("modelConfig"),j=e&&e.splitDays||r.get("splitDays"),B&&B.date&&(j&&B.enddate||B.count)?(r._generateAbberantModelList(A,t.rebuild),a=r._abModelList,K=a._items.concat(),Y=K.length):r._clearAbberantModelList()):r._clearAbberantModelList(),U=C>0?Math.min(Y,(t.page+1)*C):Y,z=U<Y,G=0,Q=A?Math.min(r.itsainfiniteview.get("batchSize"),Y):Y,V>0&&r._removeEmptyItem();while(G<Q&&++V<U){J=K[V],q=r._tryRenderModel(J,R,K,v,p,d,k);if(q){G===0&&(r.get("boundingBox").removeClass(S),i.removeClass(x),t.initbuild&&(r.get("boundingBox").removeClass(w),i.removeClass(E))),G++,I=r._createModelNode(J,q);for($=0;$<I.length;$++)t.incrementbuild?i.append(I[$]):W.append(I[$]);r._even=!r._even,p&&!d&&(R=q)}}I&&I.length>0&&L===0&&I[I.length-1].addClass(b),r._prevLastModelIndex=V,t.incrementbuild||(t.keepstyles&&(D=function(e,t){var n;return t.some(function(t){var r=t.getData("modelClientId")===e;return r&&(n=t),r}),n},P=i.all("."+m),H=W.all("."+m),P.each(function(e){var t=e.hasClass(N),n=e.hasClass(T),r;if(t||n)r=D(e.getData("modelClientId"),H),r&&(r.toggleClass(N,t),r.toggleClass(T,n))})),r._microTemplateUsed&&i.cleanup(),O?r.set("bodyContent",W):i.replace(W),i=r._viewNode=W,W.set("id",r._viewId)),i.getHTML()===""&&(et=r.get("listType")==="ul"?f:l,i.setHTML(n.sub(et,{cols:1,content:F}))),I&&L>0&&(!A||!r._itmsAvail||z)&&r._addEmptyItem(I[I.length-1],L),r._currentViewPg=t.page,r.syncUI(),g&&(M=g.get("index"),_=i.get("children").size()-1,M>_&&g.set("index",_)),A&&A.checkExpansion(),r.fire("modelListRender")},_repositionModel:function(){this._renderView()},_createModelNode:function(t,n){var r=this,i=r.getModelAttr(t,"clientId"),o=[],u=r.itsacmtemplate,f=r.get("listType")==="ul"?a:p,l=s.create(f),c,h,d,v,g;return g=r._templFns,g.activeGH1&&(c=g.groupH1(t),c!==r._prevH1&&(v=s.create(f),v.addClass(A),v.addClass(O),r._prevH1&&v.addClass(D),v.setHTML(g.renderGH1(t)),o.push(v),r._prevH1=c,r._even=!1,r._prevH2=null)),g.activeGH2&&(h=g.groupH2(t),h!==r._prevH2&&(v=s.create(f),v.addClass(A),v.addClass(M),r._prevH2&&v.addClass(D),v.setHTML(g.renderGH2(t)),o.push(
v),r._prevH2=h,r._even=!1,r._prevH3=null)),g.activeGH3&&(d=g.groupH3(t),d!==r._prevH3&&(v=s.create(f),v.addClass(A),v.addClass(_),r._prevH3&&v.addClass(D),v.setHTML(g.renderGH3(t)),o.push(v),r._prevH3=d,r._even=!1)),l.setData("modelClientId",i),g.activeClass&&l.addClass(g.classNameTemplate(t)),l.addClass(m),l.addClass(i),l.addClass(r._even?C:k),u&&u._getMode(t)===3&&!l.itsatabkeymanager&&e.use("gallery-itsatabkeymanager",function(e){l.plug(e.Plugin.ITSATabKeyManager)}),l.setHTML(n||g.template(t)),o.push(l),o},_addEmptyItem:function(e,t){var r=this,i=r.get("axis"),o=i.y,u=r.get("boundingBox"),a=t||r.get("lastItemOnTop"),c=r._viewNode,h=r.get("listType")==="ul",p=h?f:l,d,g,y,b,w,E;r._removeEmptyItem(),e||(b=c.all("."+m),w=b.size(),w>0&&(e=b.item(w-1))),h||(E=e.all(">td").size()),p=n.sub(p,{cols:E,content:""}),d=s.create(p),d.addClass(v),g=u.get(o?"offsetHeight":"offsetWidth"),e&&(o?y=g-e.get("offsetHeight")-U(e,"marginTop")-U(e,"marginBottom"):y=g-e.get("offsetWidth")-U(e,"marginLeft")-U(e,"marginRight")),e=e&&e.previous();if(a===2)while(e&&e.hasClass(A))o?y-=e.get("offsetHeight")+U(e,"marginTop")+U(e,"marginBottom"):y-=e.get("offsetWidth")+U(e,"marginLeft")+U(e,"marginRight"),e=e.previous();d.setStyle(o?"height":"width",y+"px"),y>0&&c.append(d)},_removeEmptyItem:function(){var e=this,t;t=e._viewNode.one("."+v),t&&t.remove(!0)},_getNodeFromModelOrIndex:function(e,t,r){var i=this,s=i.hasPlugin("itsainfiniteview"),o=n.isNumber(r)?r:s&&s.get("maxExpansions")||0,u=0,a=!1,f,l,c;e&&(c=i.getModelAttr(e,"clientId")),l=function(n,r){var i=e?n.getData("modelClientId")===c:r===t;return i&&(a=n),i};do f=i._viewNode.all("."+m),f.some(l),u++;while(!a&&s&&u<o&&s.expandList());return a},_selectModel:function(e,t,n,i){var s=this,o=s.getModelAttr(e,"clientId"),u=s.get("contentBox"),a=!t&&s.get("modelsUnselectable")&&r.size(s._selectedModels)===1,f;o&&(!a||i)?(s.hasPlugin("itsainfiniteview")&&s._getNodeFromModelOrIndex(e,null,n),f=u.one("."+o),f&&(t||f.blur(),f.toggleClass(N,t)),t?s._selectedModels[o]=e:delete s._selectedModels[o]):!o},_fireSelectedModels:function(){var e=this,t,n;t=e.getSelectedModels(),n=e._abModelList?e.getSelectedModels(!0):t,e.fire("modelSelectionChange",{newModelSelection:t,originalModelSelection:n})},_clearEventhandlers:function(){i.each(this._handlers,function(e){e.detach()})}},!0),e.ITSAModellistViewExtention=X},"@VERSION@",{requires:["yui-base","node-base","node-style","node-event-delegate","base-build","base-base","widget-base","oop","yui-later","dom-screen","pluginhost-base","event-mouseenter","event-custom","model","model-list","lazy-model-list","template-base","template-micro","event-tap"],skinnable:!0});
