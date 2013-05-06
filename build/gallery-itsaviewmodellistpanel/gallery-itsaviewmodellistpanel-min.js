YUI.add("gallery-itsaviewmodellistpanel",function(e,t){var n=e.ClassNameManager.getClassName,r="yui3-itsaformelement",i="focusable",s="closeclick",o="addclick";e.ITSAViewModellistPanel=e.Base.create("itsaviewmodellistpanel",e.ITSAViewModellist,[e.WidgetPosition,e.WidgetStdMod,e.WidgetAutohide,e.WidgetButtons,e.WidgetModality,e.WidgetPositionAlign,e.WidgetPositionConstrain,e.WidgetStack],{initializer:function(){var e=this;e.set("bodyContent","")},renderer:function(){var e=this;e.constructor.superclass.constructor.superclass.renderer.apply(e),e._render()},_extraBindUI:function(){var t=this,n=t._handlers,r=t.get("staticPosition"),i=t.get("boundingBox"),s;t.constructor.superclass._extraBindUI.call(t),r&&i.addClass("itsa-staticposition"),t.get("dragable")&&!r&&(s=t.getStdModNode(e.WidgetStdMod.HEADER),e.use("dd-plugin",function(e){i.plug(e.Plugin.Drag),s&&i.dd.addHandle(".yui3-widget-hd")})),n.push(t.after("staticPositionChange",function(e){var t=e.newVal;i.toggleClass("itsa-staticposition",t)})),n.push(t.after("dragableChange",function(n){var r=n.newVal;r&&!t.get("staticPosition")?(s=t.getStdModNode(e.WidgetStdMod.HEADER),e.use("dd-plugin",function(e){i.plug(e.Plugin.Drag),s&&i.dd.addHandle(".yui3-widget-hd")})):i.unplug("dd")}))},_addModel:function(){var e=this,t=e.get("modelList"),n,r,i;t&&(n=e.model,r=new n,i={model:r},t.add(r),t.fire(o,i))},_closeList:function(){var e=this;e.hide(),e.fire(s)},_getViewContainer:function(){return this.getStdModNode(e.WidgetStdMod.BODY)},_widgetRenderer:function(){var e=this;e.constructor.superclass.constructor.superclass.renderer.apply(e)},_setZIndex:function(e){return typeof e=="string"&&(e=parseInt(e,10)),typeof e!="number"&&(e=1),e<1&&(e=1),e},_uiSetXY:function(e){var t=this;t.get("staticPosition")||t._posNode.setXY(e)},BUTTONS:{add:{label:"Add",action:"_addModel",section:"header",template:'<button type="button" />',classNames:[r+"-add",i]},close:{label:"Close",action:"_closeList",section:"header",template:'<button type="button" />',classNames:n("button","close")}}},{ATTRS:{buttons:{value:["close"]},dragable:{value:!1,validator:function(e){return typeof e=="boolean"}},title:{value:null,lazyAdd:!1,validator:function(e){return typeof e=="string"},setter:function(e){this.set("headerContent",e)}},statusText:{value:null,lazyAdd:!1,validator:function(e){return typeof e=="string"},setter:function(e){this.set("footerContent",e)}},staticPosition:{value:!1,validator:function(e){return typeof e=="boolean"}},zIndex:{value:1,setter:"_setZIndex"}}})},"@VERSION@",{requires:["base-build","classnamemanager","gallery-itsaviewmodellist","widget-autohide","widget-buttons","widget-modality","widget-position","widget-position-align","widget-position-constrain","widget-stack","widget-stdmod"],skinnable:!0});
