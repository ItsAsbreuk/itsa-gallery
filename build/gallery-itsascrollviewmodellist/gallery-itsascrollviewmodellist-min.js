YUI.add("gallery-itsascrollviewmodellist",function(e,t){"use strict";function x(){}function T(){}var n=e.Lang,r=e.Object,i=e.Array,s=e.Node,o='<ul role="presentation"></ul>',u='<li role="presentation"></li>',a="<li></li>",f="itsa-scrollview-fillelement",l="itsa-scrollviewmodel",c="itsa-scrollviewmodellist",h=l+"-focus",p=l+"-selected",d=l+"-even",v=l+"-odd",m=c+"-styled",g=c+"-groupheader",y=c+"-groupheader1",b=c+"-groupheader2",w=c+"-groupheader3",E=c+"-sequelgroupheader",S=function(e,t){return parseInt(e.getStyle(t),10)};e.mix(x.prototype,{getModelAttr:function(e,t){return e&&(e.get&&n.type(e.get)==="function"?e.get(t):e[t])},setModelAttr:function(e,t,r,i,s){var o=this,u;e&&(u=!e.get||n.type(e.get)!=="function",u?t?t?(o.revive(e),e.set(r,i,s),o.free(e)):e.set(r,i,s):e[r]=i:e.set(r,i,s))}},!0),e.LazyModelList.ITSALazyModelListAttrExtention=x,e.Base.mix(e.LazyModelList,[x]),T.ATTRS={modelList:{value:null,validator:function(t){return t instanceof e.ModelList||t instanceof e.LazyModelList||t===null},setter:"_setModelList"},noDups:{value:!1,validator:function(e){return n.isBoolean(e)},setter:"_setNoDups"},viewFilter:{value:null,validator:function(e){return n.isFunction(e)||e===null},setter:"_setViewFilter"},modelsSelectable:{value:!1,lazyAdd:!1,validator:function(e){return e===""||e===null||n.isBoolean(e)||e==="single"||e==="multi"},setter:"_setModelsSelectable"},modelsUnselectable:{value:!1,validator:function(e){return n.isBoolean(e)}},modelListStyled:{value:!1,lazyAdd:!1,validator:function(e){return n.isBoolean(e)},setter:"_setModelListStyled"},clickSensivity:{value:2,validator:function(e){return n.isNumber(e)&&e>=0&&e<11}},clickEvents:{value:!1,lazyAdd:!1,validator:function(e){return n.isBoolean(e)},setter:"_setClickEvents"},mouseDownUpEvents:{value:!1,lazyAdd:!1,validator:function(e){return n.isBoolean(e)},setter:"_setMouseDownUpEvents"},hoverEvents:{value:!1,lazyAdd:!1,validator:function(e){return n.isBoolean(e)},setter:"_setHoverEvents"},lastItemOnTop:{value:null,validator:function(e){return n.isBoolean(e)},setter:"_setLastItemOnTop"},groupHeader1:{value:null,validator:function(e){return n.isFunction(e)||e===null},setter:"_setGroupHeader1"},groupHeader2:{value:null,validator:function(e){return n.isFunction(e)||e===null},setter:"_setGroupHeader2"},groupHeader3:{value:null,validator:function(e){return n.isFunction(e)||e===null},setter:"_setGroupHeader3"},renderModel:{value:function(e){return this.getModelAttr(e,"clientId")},validator:function(e){return n.isFunction(e)||e===null},setter:"_setRenderModel"},dupComparator:{value:null,validator:function(e){return n.isFunction(e)||e===null},setter:"_setDupComparator"},renderGroupHeader1:{value:null,validator:function(e){return n.isFunction(e)||e===null},setter:"_setRenderGroupHeader1"},renderGroupHeader2:{value:null,validator:function(e){return n.isFunction(e)||e===null},setter:"_setRenderGroupHeader2"},renderGroupHeader3:{value:null,validator:function(e){return n.isFunction(e)||e===null},setter:"_setRenderGroupHeader3"}},e.mix(T.prototype,{_eventhandlers:[],_originalModels:[],_selectableModelEvent:null,_clickModelEvent:null,_mouseenterModelEvent:null,_mouseUpModelEvent:null,_mouseDownModelEvent:null,_mouseleaveModelEvent:null,_selectedModels:{},_viewNode:null,_viewId:null,_lastClickedModel:null,_abberantModelList:null,_setViewFilterInitiated:null,_setLastItemOnTopInitiated:null,_setGroupHeader1Initiated:null,_setGroupHeader2Initiated:null,_setGroupHeader3Initiated:null,_setRenderGroupHeader1Initiated:null,_setRenderGroupHeader2Initiated:null,_setRenderGroupHeader3Initiated:null,_setRenderModelInitiated:null,_setDupComparatorInitiated:null,_setNoDupsInitiated:null,_rerenderAttributesOnChange:!0,_moreItemsAvailable:!0,_prevLastModelIndex:null,_modelListIsLazy:!1,_prevHeader1:null,_prevHeader2:null,_prevHeader3:null,_even:!1,initializer:function(){var t=this;t._viewId=e.guid(),t._eventhandlers.push(t.after("render",t._render,t))},setWithoutRerender:function(e,t,n){var r=this;r._rerenderAttributesOnChange=!1,r.set(e,t,n),r._rerenderAttributesOnChange=!0},getNodeFromIndex:function(e,t){return this._getNodeFromModelOrIndex(null,e,t)},getNodeFromModel:function(e,t){return this._getNodeFromModelOrIndex(e,null,t)},saveScrollTo:function(e,t){var n=this,r=n.get("boundingBox"),i=n._viewNode,s;e&&(e=Math.max(0,e),s=i.get("offsetWidth")-r.get("offsetWidth"),e=Math.min(e,s)),t&&(t=Math.max(0,t),s=i.get("offsetHeight")-r.get("offsetHeight"),t=Math.min(t,s)),n.scrollTo(e,t)},scrollIntoView:function(e,t,r){var i=this,s=i.get("boundingBox"),o=i.get("axis"),u=o.y,a=u?s.get("offsetHeight"):s.get("offsetWidth"),f=u?s.getY():s.getX(),c=i._viewNode,h=i.itssvinfinite,p=i.pages,d,v,m,g,y,b,w,E,x,T,N;w=function(e){var r=u?e.getY():e.getX(),i;return u?i=r+e.get("offsetHeight")+S(e,"marginTop")+S(e,"marginBottom"):i=r+e.get("offsetWidth")+S(e,"marginLeft")+S(e,"marginRight"),r<f||t&&n.isBoolean(t.forceTop)&&t.forceTop?-1:i>f+a||t&&n.isBoolean(t.forceBottom)&&t.forceBottom?1:0},n.isNumber(e)?(y=i.getNodeFromIndex(e,r),x=w(y),p&&x!==0&&(b=c.all("li"),b.some(function(t,n){return t.hasClass(l)||e++,n===e}))):(y=e&&i.getNodeFromModel(e,r),x=w(y),p&&x!==0&&(b=c.all("li"),e=0,b.some(function(t,n){var r=t===y;return r&&(e=n),r}))),i._focusModelNode(y);if(y&&x!==0){E=x===-1,u?(d=y.getY(),v=i.get("scrollY"),T=y.get("offsetHeight")+S(y,"marginTop")+S(y,"marginBottom"),m=c.get("offsetHeight")-a):(d=y.getX(),v=i.get("scrollX"),T=y.get("offsetWidth")+S(y,"marginLeft")+S(y,"marginRight"),m=c.get("offsetWidth")-a),h&&!E&&h.checkExpansion();if(p){if(!E){while(T<a&&e>0)N=!0,e--,y=y.previous("li"),u?T+=y.get("offsetHeight")+S(y,"marginTop")+S(y,"marginBottom"):T+=y.get("offsetWidth")+S(y,"marginLeft")+S(y,"marginRight");N&&e++,e=Math.min(e,i._getMaxPaginatorGotoIndex(e,r))}p.scrollToIndex(e)}else g=Math.round(v+d-f-(E?0:a-T)),u?i.saveScrollTo(null,g):i.saveScrollTo(g,null)}else!y},modelIsSelected:function(e){var t=this,r;return n.isArray(e)?i.some(e,function(e){return r=t._selectedModels[t
.getModelAttr(e,"clientId")],r?!1:!0}):r=t._selectedModels[t.getModelAttr(e,"clientId")],n.isValue(r)},selectModels:function(e,t,r,s,o){var u=this,a=n.isArray(e),f=u.get("modelsSelectable")==="single",l,c;f&&u.clearSelectedModels(!0,!0),s||(c=u.get("contentBox"),l=c.all("."+p).size()),a&&!f?(i.each(e,function(e){u._selectModel(e,!0,o)}),t&&e.length>0&&u.scrollIntoView(e[0],r,o)):(a&&(e=e[0]),u._selectModel(e,!0,o),t&&u.scrollIntoView(e,r,o)),!s&&l!==c.all("."+p).size()&&u._fireSelectedModels()},unselectModels:function(e,t){var r=this,s,o;t||(o=r.get("contentBox"),s=o.all("."+p).size()),n.isArray(e)?i.each(e,function(e){r._selectModel(e,!1)}):r._selectModel(e,!1),!t&&s!==o.all("."+p).size()&&r._fireSelectedModels()},clearSelectedModels:function(e,t){var n=this,r=n.get("contentBox"),i,s,o,u,a,f;i=r.all("."+p),o=i.size()>0&&i.item(0),e?i.removeClass(p):(s=i.size()>0,i.removeClass(p),s&&n._fireSelectedModels()),n._selectedModels={},n.get("modelsUnselectable")&&o&&!t&&(u=o.getData("modelClientId"),f=n._abberantModelList||n.get("modelList"),a=f.getByClientId(u),n.selectModels(a,!1,null,!0))},getSelectedModels:function(e){var t=this,n;return e?(n=[],r.each(t._selectedModels,function(e){var r=t._originalModels[t.getModelAttr(e,"clientId")];(!r||i.indexOf(n,r)===-1)&&n.push(r||e)})):n=r.values(t._selectedModels),n},renderView:function(){this._renderView()},getModelAttr:function(e,t){return e&&(e.get&&n.type(e.get)==="function"?e.get(t):e[t])},setModelAttr:function(e,t,r,i,s){var o=this,u,a;e&&(u=!e.get||n.type(e.get)!=="function",u?t?(a=o.get("modelList"),o._modelListIsLazy&&t&&a.revive(e),e.set(r,i,s),o._modelListIsLazy&&t&&a.free(e)):e[r]=i:e.set(r,i,s))},destructor:function(){var e=this,t=e.get("modelList");e._clearEventhandlers(),t.removeTarget(e),e._selectableModelEvent&&e._selectableModelEvent.detach(),e._clickModelEvent&&e._clickModelEvent.detach(),e._mouseDownModelEvent&&e._mouseDownModelEvent.detach(),e._mouseUpModelEvent&&e._mouseUpModelEvent.detach(),e._mouseenterModelEvent&&e._mouseenterModelEvent.detach(),e._mouseleaveModelEvent&&e._mouseleaveModelEvent.detach(),e._viewNode.destroy(!0)},_render:function(){var e=this,t=e.get("modelList"),n;e._viewNode=n=s.create(o),n.set("id",e._viewId),e._extraBindUI(),t&&e._renderView(null,!0)},_focusModelNode:function(e){e&&(this._viewNode.all("."+h).removeClass(h),e.addClass(h),e.focus())},_getMaxPaginatorGotoIndex:function(e,t){var n=this,r=n.hasPlugin("pages"),i=n._abberantModelList||n.get("modelList"),s=n.get("axis"),o=s.y,u=n.get("boundingBox").get(o?"offsetHeight":"offsetWidth"),a=0,f,l,c;if(r&&i.size()>0){f=n.getNodeFromIndex(Math.min(e,i.size()-1),t),o?l=f.get("offsetHeight")+S(f,"marginTop")+S(f,"marginBottom"):l=f.get("offsetWidth")+S(f,"marginLeft")+S(f,"marginRight"),c=n._viewNode.all("li"),a=c.size();while(f&&--a>=0&&l<u)f=c.item(a),o?l+=f.get("offsetHeight")+S(f,"marginTop")+S(f,"marginBottom"):l+=f.get("offsetWidth")+S(f,"marginLeft")+S(f,"marginRight");l>=u&&a++}return a},_extraBindUI:function(){var e=this,t=e.get("boundingBox"),n=e.get("modelList"),r=e._eventhandlers;n&&(n.addTarget(e),t.addClass(c)),r.push(e.after("modelListChange",function(n){var r=n.newVal,i=n.prevVal;i&&i.removeTarget(e),r?(r.addTarget(e),t.addClass(c),e.renderView()):(t.removeClass(c),e.get("contentBox").setHTML(""))})),r.push(t.delegate("click",function(){e._gesture=null},function(){var t=Math.abs(e.lastScrolledAmt)>e.get("clickSensivity");return!t})),r.push(e.after("reset",e._resetView,e)),r.push(e.after("remove",e._renderView,e)),r.push(e.after("add",e._renderViewCheckAppend,e)),r.push(e.after("*:change",e._renderModelOrView,e))},_setModelList:function(t){var n=this;n._modelListIsLazy=t instanceof e.LazyModelList},_setNoDups:function(e){var t=this;t._setNoDupsInitiated?t._rerenderAttributesOnChange&&t._renderView({noDups:e}):t._setNoDupsInitiated=!0},_setViewFilter:function(e){var t=this;t._setViewFilterInitiated?t._rerenderAttributesOnChange&&t._renderView({viewFilter:e}):t._setViewFilterInitiated=!0},_setLastItemOnTop:function(e){var t=this;t._setLastItemOnTopInitiated?t._rerenderAttributesOnChange&&t._renderView({lastItemOnTop:e}):t._setLastItemOnTopInitiated=!0},_setDupComparator:function(e){var t=this;t._setDupComparatorInitiated?t._rerenderAttributesOnChange&&t.get("noDups")&&t._renderView({dupComparator:e}):t._setDupComparatorInitiated=!0},_setGroupHeader1:function(e){var t=this;t._setGroupHeader1Initiated?t._rerenderAttributesOnChange&&t._renderView({groupHeader1:e}):t._setGroupHeader1Initiated=!0},_setGroupHeader2:function(e){var t=this;t._setGroupHeader2Initiated?t._rerenderAttributesOnChange&&t._renderView({groupHeader2:e}):t._setGroupHeader2Initiated=!0},_setGroupHeader3:function(e){var t=this;t._setGroupHeader3Initiated?t._rerenderAttributesOnChange&&t._renderView({groupHeader3:e}):t._setGroupHeader3Initiated=!0},_setRenderGroupHeader1:function(e){var t=this;t._setRenderGroupHeader1Initiated?t._rerenderAttributesOnChange&&t._renderView({renderGroupHeader1:e}):t._setRenderGroupHeader1Initiated=!0},_setRenderGroupHeader2:function(e){var t=this;t._setRenderGroupHeader2Initiated?t._rerenderAttributesOnChange&&t._renderView({renderGroupHeader2:e}):t._setRenderGroupHeader2Initiated=!0},_setRenderGroupHeader3:function(e){var t=this;t._setRenderGroupHeader3Initiated?t._rerenderAttributesOnChange&&t._renderView({renderGroupHeader3:e}):t._setRenderGroupHeader3Initiated=!0},_setRenderModel:function(e){var t=this;t._setRenderModelInitiated?t._rerenderAttributesOnChange&&t._renderView({renderModel:e}):t._setRenderModelInitiated=!0},_setModelsSelectable:function(e){var t=this;return e===""||!e?e=null:n.isBoolean(e)&&(e="multi"),t._setSelectableEvents(e),e},_setModelListStyled:function(e){var t=this;t.get("boundingBox").toggleClass(m,e)},_setSelectableEvents:function(t){var n=this,r=n.get("contentBox");n.clearSelectedModels(),t&&!n._selectableModelEvent?n._selectableModelEvent=r.delegate("click",e.rbind(n._handleModelSelectionChange,n),function(){var e=Math.abs
(n.lastScrolledAmt)>n.get("clickSensivity");return!e&&this.hasClass(l)}):!t&&n._selectableModelEvent&&(n._selectableModelEvent.detach(),n._selectableModelEvent=null)},_setClickEvents:function(e){var t=this,n=t.get("contentBox");e&&!t._clickModelEvent?t._clickModelEvent=n.delegate("click",function(e){var n=e.currentTarget,r=t.get("modelList"),i=n.getData("modelClientId"),s=r&&r.getByClientId(i);t.fire("modelClick",{node:n,model:s})},function(){var e=Math.abs(t.lastScrolledAmt)>t.get("clickSensivity");return!e&&this.hasClass(l)}):!e&&t._clickModelEvent&&(t._clickModelEvent.detach(),t._clickModelEvent=null)},_setMouseDownUpEvents:function(e){var t=this,n=t.get("contentBox");e&&!t._mouseDownModelEvent?t._mouseDownModelEvent=n.delegate("mousedown",function(e){var n=e.currentTarget,r=t.get("modelList"),i=n.getData("modelClientId"),s=r&&r.getByClientId(i);t.fire("modelMouseDown",{node:n,model:s})},"."+l):!e&&t._mouseDownModelEvent&&(t._mouseDownModelEvent.detach(),t._mouseDownModelEvent=null),e&&!t._mouseUpModelEvent?t._mouseUpModelEvent=n.delegate("mouseup",function(e){var n=e.currentTarget,r=t.get("modelList"),i=n.getData("modelClientId"),s=r&&r.getByClientId(i);t.fire("modelMouseUp",{node:n,model:s})},"."+l):!e&&t._mouseUpModelEvent&&(t._mouseUpModelEvent.detach(),t._mouseUpModelEvent=null)},_setHoverEvents:function(e){var t=this,n=t.get("contentBox");e&&!t._mouseenterModelEvent?t._mouseenterModelEvent=n.delegate("mouseenter",function(e){var n=e.currentTarget,r=t.get("modelList"),i=n.getData("modelClientId"),s=r&&r.getByClientId(i);t.fire("modelMouseEnter",{node:n,model:s})},"."+l):!e&&t._mouseenterModelEvent&&(t._mouseenterModelEvent.detach(),t._mouseenterModelEvent=null),e&&!t._mouseleaveModelEvent?t._mouseleaveModelEvent=n.delegate("mouseleave",function(e){var n=e.currentTarget,r=t.get("modelList"),i=n.getData("modelClientId"),s=r&&r.getByClientId(i);t.fire("modelMouseLeave",{node:n,model:s})},"."+l):!e&&t._mouseleaveModelEvent&&(t._mouseleaveModelEvent.detach(),t._mouseleaveModelEvent=null)},_handleModelSelectionChange:function(e){var t=this,n=e.currentTarget,r=t._abberantModelList||t.get("modelList"),i=n.getData("modelClientId"),s=r&&r.getByClientId(i),o=t.get("modelsSelectable"),u=o==="single",a=e.shiftKey&&!u,f=e.metaKey||e.ctrlKey,l=t.get("viewFilter"),c,h,d,v,m,g,y,b,w,E;c=s&&t.modelIsSelected(s);if(s){if(u||!f)t.get("modelsUnselectable")&&(w=t._viewNode.all("."+p),E=w.size()>0&&w.item(0)),t.clearSelectedModels(!0,!0);if(a&&t._lastClickedModel){h=[],d=r.indexOf(s),v=r.indexOf(t._lastClickedModel),m=Math.min(d,v),g=Math.max(d,v);for(y=m;y<=g;y++)b=r.item(y),(!l||l(b))&&h.push(b);t.selectModels(h,!1,null,!0)}else c&&!E?t.unselectModels(s,!0):t.selectModels(s,!1,null,!0),t._lastClickedModel=c?null:s;t._focusModelNode(n)}t._fireSelectedModels()},_renderView:function(e,t){var r=this,o=r._viewNode,c=r.get("contentBox"),h=r.get("modelList"),p=h&&h.size()>0&&h.item(0),m=e&&e.noDups||r.get("noDups"),x=e&&e.dupComparator||r.get("dupComparator"),T=e&&e.viewFilter||r.get("viewFilter"),N=e&&e.renderModel||r.get("renderModel"),C=e&&e.groupHeader1||r.get("groupHeader1"),k=e&&e.groupHeader2||r.get("groupHeader2"),L=e&&e.groupHeader3||r.get("groupHeader3"),A=e&&e.renderGroupHeader1||r.get("renderGroupHeader1")||C,O=e&&e.renderGroupHeader2||r.get("renderGroupHeader2")||k,M=e&&e.renderGroupHeader3||r.get("renderGroupHeader3")||L,_=e&&e.lastItemOnTop||r.get("lastItemOnTop"),D=p&&C&&n.isValue(C(p)),P=p&&k&&n.isValue(k(p)),H=p&&L&&n.isValue(L(p)),B=r.itssvinfinite,j,F,I,q,R,U,z,W,X,V,$,J,K,Q,G,Y,Z,et,tt,nt,rt,it,st;st=function(e){var t=!1,n=x(e);return i.some(tt,function(r){return r===e?!0:(t=x(r)===n,t)}),t},c.one("#"+r._viewId)||(c.setHTML(o),r._set("srcNode",c)),tt=h._items.concat(),it=tt.length,!B||t?(o.setHTML(""),Z=0,nt=it,r._prevHeader1=null,r._prevHeader2=null,r._prevHeader3=null,r._even=!1,B&&(r._moreItemsAvailable=!0)):Z=(r._prevLastModelIndex||-1)+1,B&&(nt=Math.min(r.itssvinfinite.get("batchSize"),it)),r._generateAbberantModelList?(q=e&&e.modelConfig||r.get("modelConfig"),q&&q.date&&(q.enddate||q.count)?(r._generateAbberantModelList(B,t),h=r._abberantModelList,tt=h._items.concat(),it=tt.length):r._abberantModelList=null):r._abberantModelList=null,rt=0;while(rt<nt&&Z<it)et=tt[Z],G=r.getModelAttr(et,"clientId"),(!T||T(et))&&(!m||!x&&(K=N(et))!==Q||x&&!st(et))&&(rt++,R=s.create(u),D&&(j=C(et),j!==r._prevHeader1&&(Y=s.create(u),Y.addClass(g),Y.addClass(y),r._prevHeader1&&Y.addClass(E),Y.setHTML(A(et)),o.append(Y),r._prevHeader1=j,r._even=!1,r._prevHeader2=null)),P&&(F=k(et),F!==r._prevHeader2&&(Y=s.create(u),Y.addClass(g),Y.addClass(b),r._prevHeader2&&Y.addClass(E),Y.setHTML(O(et)),o.append(Y),r._prevHeader2=F,r._even=!1,r._prevHeader3=null)),H&&(I=L(et),I!==r._prevHeader3&&(Y=s.create(u),Y.addClass(g),Y.addClass(w),r._prevHeader3&&Y.addClass(E),Y.setHTML(M(et)),o.append(Y),r._prevHeader3=I,r._even=!1)),R.setData("modelClientId",G),R.addClass(l),R.addClass(G),R.addClass(r._even?d:v),R.setHTML(K||N(et)),o.append(R),r._even=!r._even,m&&!x&&(Q=K)),Z++;r._prevLastModelIndex=Z-1;if(R&&_&&(!B||!r._moreItemsAvailable)){J=R,U=r.get("axis"),z=U.x,W=U.y,X=r.get("boundingBox"),R=s.create(a),R.addClass(f),V=X.get(z?"offsetWidth":"offsetHeight"),W?$=V-J.get("offsetHeight")-S(J,"marginTop")-S(J,"marginBottom"):$=V-J.get("offsetWidth")-S(J,"marginLeft")-S(J,"marginRight"),J=J.previous();while(J&&J.hasClass(g))W?$-=J.get("offsetHeight")+S(J,"marginTop")+S(J,"marginBottom"):$-=J.get("offsetWidth")+S(J,"marginLeft")+S(J,"marginRight"),J=J.previous();R.setStyle(z?"width":"height",$+"px"),$>0&&o.append(R)}r.syncUI(),B&&B.checkExpansion(),r.fire("modelListRender")},_getNodeFromModelOrIndex:function(e,t,r){var i=this,s=i.hasPlugin("itssvinfinite"),o=n.isNumber(r)?r:s&&s.get("maxExpansions")||0,u=0,a=!1,f,l,c;e&&(c=i.getModelAttr(e,"clientId")),l=function(n,r){var i=e?n.getData("modelClientId")===c:r===t;return i&&(a=n),i};do f=i._viewNode.all(".itsa-scrollviewmodel"),f.some(l),u++;while(!a&&s&&u<o&&s.expandList());return a
},_resetView:function(){this._resetView(null,!0)},_renderViewCheckAppend:function(e){var t=this,n=t.hasPlugin("itssvinfinite");t._renderView(null,n)},_renderModelOrView:function(e){var t=this,n=t.get("modelList");t._renderView()},_selectModel:function(e,t,n){var i=this,s=i.getModelAttr(e,"clientId"),o=i.get("contentBox"),u=!t&&i.get("modelsUnselectable")&&r.size(i._selectedModels)===1,a;s&&!u?(i.hasPlugin("itssvinfinite")&&i._getNodeFromModelOrIndex(e,null,n),a=o.one("."+s),a&&a.toggleClass(p,t),t?i._selectedModels[s]=e:delete i._selectedModels[s]):!s},_fireSelectedModels:function(){var e=this,t,n;t=e.getSelectedModels(),n=e._abberantModelList?e.getSelectedModels(!0):t,e.fire("modelSelectionChange",{newModelSelection:t,originalModelSelection:n})},_clearEventhandlers:function(){i.each(this._eventhandlers,function(e){e.detach()})}},!0),e.ScrollView.ITSAScrollViewModelListExtention=T,e.Base.mix(e.ScrollView,[T])},"@VERSION@",{requires:["base-build","node-base","node-event-delegate","pluginhost-base","event-mouseenter","event-custom","model","model-list","lazy-model-list"],skinnable:!0});
