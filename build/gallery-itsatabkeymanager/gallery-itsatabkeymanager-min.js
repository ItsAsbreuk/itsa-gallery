YUI.add("gallery-itsatabkeymanager",function(e,t){"use strict";function n(){n.superclass.constructor.apply(this,arguments)}e.extend(n,e.Plugin.Base,{keyCodeMap:{32:"space",33:"pgup",34:"pgdown",35:"end",36:"home",37:"left",38:"up",39:"right",40:"down"},preventDefaultMap:{down:1,end:1,home:1,left:1,pgdown:1,pgup:1,right:1,space:1,up:1},initializer:function(e){this._host=e.host,this._attachEvents(),this.refresh()},destructor:function(){this._detachEvents()},ascend:function(){var e=this._getActiveContainer(),t=this._host,n;return e===t?null:(n=e.ancestor(this.get("itemSelector"),!1,function(e){return e===t}),this.set("activeItem",n,{src:"ascend"}),n)},descend:function(){var e=this.get("activeItem"),t=this.get("anchoredContainerSelector"),n;return!t||!e?null:(n=e.one(t),n?this.first({container:n}):null)},first:function(e){e=e||{};var t=e.container||this.get("host"),n=this.get("disabledSelector"),r=this.get("itemSelector"),i=t.one(this.get("anchoredItemSelector"));while(i&&n&&i.test(n))i=i.next(r);return e.silent||this.set("activeItem",i,{src:"first"}),i},last:function(e){e=e||{};var t=e.container||this._host,n=this.get("disabledSelector"),r=t.all(this.get("anchoredItemSelector")),i=r.pop();while(i&&n&&i.test(n))i=r.pop();return e.silent||this.set("activeItem",i,{src:"last"}),i},next:function(t){t=t||{};var n=this.get("activeItem"),r,i,s;if(!n)return null;r=this.get("disabledSelector"),i=this.get("itemSelector"),s=n.next(i);while(s&&r&&s.test(r))s=s.next(i);return s?t.silent||this.set("activeItem",s,{src:"next"}):this.get("circular")&&(s=this.first(e.merge(t,{container:this._getActiveContainer(n)}))),s||n},previous:function(t){t=t||{};var n=this.get("activeItem"),r,i,s;if(!n)return null;r=this.get("disabledSelector"),i=this.get("itemSelector"),s=n.previous(i);while(s&&r&&s.test(r))s=s.previous(i);return s?t.silent||this.set("activeItem",s,{src:"previous"}):s=this.last(e.merge(t,{container:this._getActiveContainer(n)})),s||n},refresh:function(e){var t=this.get("activeItem"),n=this.get("disabledSelector"),r=this.get(e?"anchoredItemSelector":"itemSelector");return(e||this._host).all(r).each(function(e){n&&e.test(n)?e.removeAttribute("tabIndex"):e.set("tabIndex",e===t?0:-1)}),this},_attachEvents:function(){var e=this._host;this._events=[e.on("keydown",this._onKeyDown,this),e.after("blur",this._afterBlur,this),e.after("focus",this._afterFocus,this),this.after({activeItemChange:this._afterActiveItemChange})]},_detachEvents:function(){(new e.EventHandle(this._events)).detach()},_getActiveContainer:function(e){var t=this.get("containerSelector"),n=this._host,r;return t?(e||(e=this.get("activeItem")),e?(r=e.ancestor(t,!1,function(e){return e===n}),r||n):n):n},_getAnchoredContainerSelector:function(e){if(e)return e;var t=this.get("containerSelector");return t?">"+t:null},_getAnchoredItemSelector:function(e){return e?e:">"+this.get("itemSelector")},_afterActiveItemChange:function(e){var t=e.newVal,n=e.prevVal;n&&n.set("tabIndex",-1),t&&(t.set("tabIndex",0),this.get("focused")&&t.focus())},_afterBlur:function(){this._set("focused",!1)},_afterFocus:function(e){var t=e.target;this._set("focused",!0),t!==this._host&&t.test(this.get("itemSelector"))&&this.set("activeItem",t,{src:"focus"})},_onKeyDown:function(e){if(e.altKey||e.ctrlKey||e.metaKey||e.shiftKey)return;var t=this.keyCodeMap[e.keyCode]||e.keyCode,n=this.get("keys"),r=n[t]||n[e.keyCode];r&&(this.preventDefaultMap[t]&&e.preventDefault(),typeof r=="string"?this[r].call(this):r.call(this))}},{NAME:"focusManager",NS:"focusManager",ATTRS:{activeItem:{valueFn:function(){return this.first()}},anchoredContainerSelector:{getter:"_getAnchoredContainerSelector"},anchoredItemSelector:{getter:"_getAnchoredItemSelector"},circular:{value:!0},containerSelector:{},disabledSelector:{value:'[aria-disabled="true"], [aria-hidden="true"], [disabled]'},focused:{readOnly:!0,value:!1},itemSelector:{value:"*"},keys:{cloneDefaultValue:"shallow",value:{down:"next",left:"ascend",right:"descend",up:"previous"}}}}),e.namespace("Plugin").FocusManager=n;var r=e.Array,i=".focusable",s="yui3-itsaformelement",o=s+"-input",u=s+"-password",a=s+"-textarea",f=s+"-selectall",l=s+"-firstfocus";e.namespace("Plugin").ITSATabKeyManager=e.Base.create("itsatabkeymanager",e.Plugin.FocusManager,[],{_eventhandlers:[],host:null,initializer:function(){var e=this,t;e.host=t=e.get("host"),e._bindUI(),e.set("keys",{}),e.set("circular",!0)},destructor:function(){this._clearEventhandlers()},first:function(e){e=e||{};var t=this,n=t.get("host"),r=t.get("disabledSelector"),i=e.selector||t.get("itemSelector"),s=n.one(i),o=0,u;while(s&&r&&s.test(r))u=u||n.all(i),s=++o<u.size()?u.item(o):null;return e.silent||t.set("activeItem",s,{src:"first"}),s},focusInitialItem:function(){var e=this,t;t=e.first({selector:"."+l})||e.first(),t&&(t.focus(),e._selectNode(t))},last:function(e){var t=this,n=t._host,r=t.get("disabledSelector"),i=n.all(t.get("itemSelector")),s=i.size()-1,o=i.pop();e=e||{};while(o&&r&&o.test(r))o=--s>=0?i.item(s):null;return e.silent||t.set("activeItem",o,{src:"last"}),o},next:function(e){var t=this,n=t._host,r=t.get("activeItem"),i,s,o,u,a;e=e||{};if(!r)return t.first(e);i=t.get("disabledSelector"),a=n.all(t.get("itemSelector")),u=a.size(),o=a.indexOf(r),s=++o<u?a.item(o):null;while(s&&i&&s.test(i))s=++o<u?a.item(o):null;return s?e.silent||this.set("activeItem",s,{src:"next"}):this.get("circular")&&(s=t.first(e)),s||r},previous:function(e){var t=this,n=t._host,r=t.get("activeItem"),i,s,o,u;e=e||{};if(!r)return t.first(e);i=t.get("disabledSelector"),u=n.all(t.get("itemSelector")),o=u.indexOf(r),s=--o>=0?u.item(o):null;while(s&&i&&s.test(i))s=--o>=0?u.item(o):null;return s?e.silent||this.set("activeItem",s,{src:"previous"}):this.get("circular")&&(s=t.last(e)),s||r},retreiveFocus:function(){var e=this,t=e._host,n=e.get("activeItem");t.focus&&t.focus(),n?(n.focus(),e._selectNode(n)):e.focusInitialItem()},setFirstFocus:function(e){var t=this,n=t.get("host"),r=t._nodeIsFocusable(e);r&&(n.all("."+l).removeClass
(l),e.addClass(l))},setSelectText:function(e,t){var n=this,r=n.get("host"),i,s,o,u;t?(i=n._nodeIsFocusable(t),i&&t.test("input[type=text], input[type=password], textarea")&&t.toggleClass(f,e)):(s=n.get("itemSelector"),o=n.get("disabledSelector"),u=r.all(s),u.each(function(t){t.test("input[type=text], input[type=password], textarea")&&(!o||!t.test(o))&&t.toggleClass(f,e)}))},_bindUI:function(){var e=this;e._eventhandlers.push(e.host.on("keydown",function(t){t.keyCode===9&&(t.preventDefault(),t.shiftKey?e.previous():e.next())}))},_clearEventhandlers:function(){r.each(this._eventhandlers,function(e){e.detach()})},_nodeIsFocusable:function(e){var t=this,n=t.get("host"),r=t.get("disabledSelector"),i=t.get("itemSelector"),s=e&&n.one(e),o;return o=s&&s.test(i)&&(!r||!s.test(r)),o},_selectNode:function(e){e&&e.test("."+o,"."+u,"."+a)&&(e.hasClass(f)?e.select():(e.set("selectionStart",e.get("value").length),e.set("scrollTop",999999)))}},{NS:"itsatabkeymanager",ATTRS:{activeItem:{value:null,setter:function(e){this._selectNode(e)}},itemSelector:{value:i,validator:function(e){return typeof e=="string"}}}})},"@VERSION@",{requires:["yui-base","oop","base-base","base-build","event-custom","plugin","node-pluginhost","event-focus","selector-css3"]});