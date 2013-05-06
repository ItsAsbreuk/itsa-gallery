YUI.add("gallery-itsaviewmodel",function(e,t){"use strict";function l(){}var n=e.Lang,r=e.Array,i=e.Template.Micro,s="Error: template is undefined",o="itsa-modelview-styled",u="yui3-form",a="yui3-itsaformelement",f=a+"-changed";e.mix(l.prototype,{cleanupWidgets:function(t){var n=this,r=e.Widget;r&&n.all(".yui3-widget").each(function(e){if(n.one("#"+e.get("id"))){var i=r.getByNode(e);i&&i.destroy(t)}})},cleanup:function(){var e=this;e.cleanupWidgets(!0),e.empty()}},!0),e.Node.ITSANodeCleanup=l,e.Base.mix(e.Node,[l]),e.ITSAViewModel=e.Base.create("itsaviewmodel",e.Widget,[],{initializer:function(){var e=this;e.view=null,e._isMicroTemplate=null,e._modelRenderer=null,e._eventhandlers=[],e._initialEditAttrs=null,e._textTemplate=null},renderer:function(){var t=this,n=t.get("boundingBox"),r=t.get("model"),i=t.get("modelEditable"),s=i&&r.itsaeditmodel,o=n.one(".yui3-widget-bd");(s||o)&&!n.itsatabkeymanager?e.use("gallery-itsatabkeymanager",function(e){n.plug(e.Plugin.ITSATabKeyManager),t._renderFurther(n,r,s)}):t._renderFurther(n,r,s)},_renderFurther:function(t,n,r){var i=this,s=i.get("events"),a=r?n.itsaeditmodel.get("template"):i.get("template"),f=i.get("styled"),l;f&&t.addClass(o).addClass(u),i._widgetRenderer(),l=i.view=new e.View({container:i._getViewContainer(),model:n}),l.events=s,l.template=a,i._setTemplateRenderer(a,r),l.render=e.rbind(i._viewRenderer,i),n&&n.addTarget&&n.addTarget(l),l.addTarget(i),i._bindViewUI(),i.view.render()},_getViewContainer:function(){return this.get("contentBox")},_widgetRenderer:function(){var e=this;e.constructor.superclass.renderer.apply(e)},bindUI:function(){var e=this,t=e._eventhandlers,n=e.get("boundingBox");t.push(e.after("styledChange",function(e){n.toggleClass(o,e.newVal).toggleClass(u,e.newVal)}))},_bindViewUI:function(){var t=this,n=t.get("boundingBox"),r=t.get("model"),i=t._eventhandlers,s=n.itsatabkeymanager,o=t.view;i.push(t.after("modelChange",function(e){var n=e.prevVal,i=e.newVal;n&&n.removeTarget&&n.removeTarget(o),i&&i.addTarget&&i.addTarget(o),o.set("model",i),r=t.get("model"),o.render()})),i.push(t.after("templateChange",function(e){var n=e.newVal,i=t.get("modelEditable");if(!i||r&&!r.itsaeditmodel)o.template=n,t._setTemplateRenderer(n,!1),o.render()})),i.push(o.after("itsaeditmodel:templateChange",function(e){var n=e.newVal,i=t.get("modelEditable");i&&r&&r.itsaeditmodel&&(o.template=n,t._setTemplateRenderer(n,!0),o.render())})),i.push(o.after("*:resetclick",function(n){var r=n.target,i={fromEditModel:!0};r instanceof e.Model&&(r.setAttrs(t._initialEditAttrs,i),o.render(),s&&s.focusInitialItem())})),i.push(o.after("*:addclick",function(n){if(n.target instanceof e.Model){var r=n.newModel;r&&t.set("model",r)}})),i.push(t.after("modelEditableChange",function(e){var n=e.newVal,i;r&&r.itsaeditmodel&&(i=n?r.itsaeditmodel.get("template"):t.get("template"),o.template=i,t._setTemplateRenderer(i,n),o.render())})),i.push(t.after("itsaeditmodel:editmodelConfigAttrsChange",function(){r.itsaeditmodel&&t.get("modelEditable")&&o.render()})),i.push(o.after("itsaeditmodel:destroy",function(){if(t.get("modelEditable")){var e=t.get("template");o.template=e,t._setTemplateRenderer(e,!1),o.render()}})),i.push(o.after("itsaeditmodel:pluggedin",function(){e.use("gallery-itsatabkeymanager",function(e){n.itsatabkeymanager||n.plug(e.Plugin.ITSATabKeyManager);if(t.get("modelEditable")){var i=r.itsaeditmodel.get("template");o.template=i,t._setTemplateRenderer(i,!0),o.render()}})})),i.push(o.after("itsaeditmodel:focusnext",function(){var e=n.itsatabkeymanager;e&&t.get("focused")&&e.next()})),i.push(t.after("eventsChange",function(e){o.events=e.newVal})),i.push(o.after("*:change",function(n){n.target instanceof e.Model&&(!t.get("modelEditable")||!r.itsaeditmodel?o.render(!1):o.get("container").all("."+f).removeClass(f))})),i.push(o.after("*:destroy",function(t){t.target instanceof e.Model&&o.render(!0)}))},getModelToJSON:function(e){return e.get&&n.type(e.get)==="function"?e.toJSON():e},destructor:function(){var e=this,t=e.view,n=e.get("model"),r=e.get("boundingBox");n&&n.removeTarget(t),t.removeTarget(e),e._clearEventhandlers(),e.view.destroy(),r.hasPlugin("itsatabkeymanager")&&r.unplug("itsatabkeymanager")},_setTemplateRenderer:function(e,t){var r=this,s,o,u;s=function(){var t=/<%(.+)%>/;return t.test(e)},o=r._isMicroTemplate=s(),o?(u=i.compile(e),r._modelRenderer=function(e){var n=t?e.itsaeditmodel.toJSON(e.itsaeditmodel.get("editmodelConfigAttrs")):r.getModelToJSON(e);return u(n)}):r._modelRenderer=function(i){var s=t?i.itsaeditmodel.toJSON(i.itsaeditmodel.get("editmodelConfigAttrs")):r.getModelToJSON(i);return n.sub(e,s)}},_viewRenderer:function(t){var n=this,r=n.get("boundingBox"),i=r.itsatabkeymanager,s=n.view,o=s.get("container"),u=s.get("model"),a=u&&u.itsaeditmodel&&n.get("modelEditable"),f=e.Global.ItsaDateTimePicker,l=t||!u?"":n._modelRenderer(u);if(a||n._isMicroTemplate)a&&(n._initialEditAttrs=u.getAttrs()),o.cleanupWidgets(!0);return o.setHTML(l),i&&(i.refresh(r),n.get("focused")&&i.focusInitialItem()),f&&f.panel.get("visible")&&f.hide(!0),n},_clearEventhandlers:function(){r.each(this._eventhandlers,function(e){e.detach()})},_setModel:function(e){var t=this,n=t.view,r,i,s;typeof e=="string"?(r=!t._textTemplate,t._textTemplate=e,e={}):(r=t._textTemplate,t._textTemplate=null);if(r&&n){i=t.get("modelEditable");if(!i||e&&!e.itsaeditmodel)s=t.get("template"),n.template=s,t._setTemplateRenderer(s,!1)}return e}},{ATTRS:{events:{value:{},validator:function(e){return n.isObject(e)}},modelEditable:{value:!1,lazyAdd:!1,validator:function(e){return n.isBoolean(e)}},model:{value:null,validator:function(e){return e===null||n.isObject(e)||typeof e=="string"||e.get&&typeof e.get=="function"&&e.get("clientId")},setter:"_setModel"},styled:{value:!0,validator:function(e){return n.isBoolean(e)}},template:{value:s,validator:function(e){return n.isString(e)},getter:function(e){return this._textTemplate||e}}}})},"@VERSION@",{requires:["base-build","widget","view","template-micro","model"
,"pluginhost-base"],skinnable:!0});
