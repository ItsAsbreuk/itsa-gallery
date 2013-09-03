YUI.add("gallery-itsaviewmodel",function(e,t){"use strict";function o(){}var n=e.Lang,r=e.Array,i=e.Template.Micro,s="Error: template is undefined";e.mix(o.prototype,{cleanupWidgets:function(t){var n=this,r=e.Widget;r&&n.all(".yui3-widget").each(function(e){if(n.one("#"+e.get("id"))){var i=r.getByNode(e);i&&i.destroy(t)}})},cleanup:function(){var e=this;e.cleanupWidgets(!0),e.empty()}},!0),e.Node.ITSANodeCleanup=o,e.Base.mix(e.Node,[o]),e.ITSAViewModel=e.Base.create("itsaviewmodel",e.View,[],{initializer:function(){var e=this,t=e.get("model");e._isMicroTemplate=null,e._modelRenderer=null,e._eventhandlers=[],e._textTemplate=null,e._setTemplateRenderer(e.get("editable")),t&&t.addTarget&&t.addTarget(e)},_bindUI:function(){var t=this,n=t.get("container"),r=t._eventhandlers;r.push(t.after("modelChange",function(e){var n=e.prevVal,r=e.newVal,i=n&&n.toJSONUI,s=r&&r.toJSONUI;n&&n.removeTarget&&n.removeTarget(t),r&&r.addTarget&&r.addTarget(t),i!==s&&t._setTemplateRenderer(t.get("template"),s&&t.get("editable")),t.render()})),r.push(t.after("templateChange",function(){t._setTemplateRenderer(t.get("editable")),t.render()})),r.push(t.after("*:resetclick",function(){var e=n.itsatabkeymanager;t._isMicroTemplate&&t.render(),e&&e.focusInitialItem()})),r.push(t.after("editableChange",function(e){var n=e.newVal,r=t.get("model");r&&r.toJSONUI&&(t._setTemplateRenderer(n),t.render())})),r.push(t.after("*:focusnext",function(){var e=n.itsatabkeymanager;e&&t.get("focused")&&e.next()})),r.push(t.after("*:change",function(n){n.target instanceof e.Model&&!t.get("editable")&&t.render()})),r.push(t.after("*:destroy",function(n){n.target instanceof e.Model&&t.render(!0)}))},getModelToJSON:function(e){return e.get&&n.type(e.get)==="function"?e.toJSON():e},render:function(t){var n=this,r=n.get("container"),i=r.itsatabkeymanager,s=n.get("model"),o=n.get("editable"),u=e.Global.ItsaDateTimePicker,a=t||!s?"":n._modelRenderer(s);if(o||n._isMicroTemplate)o&&(n._initialEditAttrs=s.getAttrs()),r.cleanupWidgets(!0);return n._rendered||(r.inDoc()||e.one("body").append(r),r.addClass("itsa-viewmodel"),n._bindUI()),n._rendered=!0,r.setHTML(a),o&&e.use("gallery-itsatabkeymanager",function(){i?i.refresh(r):(r.plug(e.Plugin.ITSATabKeyManager),i=r.itsatabkeymanager),n.get("focused")&&i.focusInitialItem()}),u&&u.panel.get("visible")&&u.hide(!0),n.fire("viewrendered",{target:n}),n},destructor:function(){var e=this,t=e.get("model"),n=e.get("container");t&&t.removeTarget&&t.removeTarget(e),e._clearEventhandlers(),n.hasPlugin("itsatabkeymanager")&&n.unplug("itsatabkeymanager")},_setTemplateRenderer:function(e){var t=this,r=t.get("template"),s,o,u;s=function(){var e=/<%(.+)%>/;return e.test(r)},o=t._isMicroTemplate=s(),o?(u=i.compile(r),t._modelRenderer=function(n){var r=e?n.toJSONUI():t.getModelToJSON(n);return u(r)}):t._modelRenderer=function(i){var s=e?i.toJSONUI():t.getModelToJSON(i);return n.sub(r,s)}},_clearEventhandlers:function(){r.each(this._eventhandlers,function(e){e.detach()})},_setModel:function(e){var t=this;return typeof e=="string"?(t._textTemplate=e,e={}):t._textTemplate=null,e}},{ATTRS:{events:{value:{},validator:function(e){return n.isObject(e)}},editable:{value:!1,lazyAdd:!1,validator:function(e){return typeof e=="boolean"},getter:function(e){var t=this.get("model");return e&&t&&t.toJSONUI}},model:{value:null,validator:function(e){return e===null||n.isObject(e)||typeof e=="string"||e.get&&typeof e.get=="function"&&e.get("clientId")},setter:"_setModel"},template:{value:s,validator:function(e){return typeof e=="string"},getter:function(e){return this._textTemplate||e}}}})},"@VERSION@",{requires:["base-build","widget","view","template-micro","model","pluginhost-base"],skinnable:!0});
