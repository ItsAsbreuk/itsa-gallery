YUI.add("gallery-itsaselectlist",function(e,t){"use strict";var n=e.Lang,r=e.UA.ie,i="itsa-hidden",s="Selectlist Shim",o='<iframe frameborder="0" tabindex="-1" class="itsa-shim" title="'+s+'" src="javascript:false;"></iframe>',u="<span class='itsa-selectlist-selectedmain' unselectable='on'></span>",a="<button class='yui3-button'></button>",f="<span class='itsa-button-icon itsa-icon-selectdown'></span>",l="<div class='itsa-selectlist-basediv "+i+"'><div class='itsa-selectlist-scrolldiv'>"+"<ul class='itsa-selectlist-ullist'></ul></div></div>";e.ITSASelectList=e.Base.create("itsaselectlist",e.Widget,[],{buttonNode:null,_selectedMainItemNode:null,_selectedItemClass:null,_itemsContainerNode:null,_itemValues:null,_syncWithinSetterItems:!1,_eventhandlers:[],initializer:function(){var e=this;e._selectedItemClass=e.get("hideSelected")?i:"itsa-selectlist-selected"},renderUI:function(){var t=this,n=t.get("boundingBox"),i=t.get("className"),s=t.get("iconClassName"),c=t.get("buttonWidth"),h=t.get("listWidth"),p=t.get("btnSize");r>0&&r<7&&n.append(o),t.buttonNode=e.Node.create(a),n.append(t.buttonNode),t.buttonNode.setHTML(f),t._selectedMainItemNode=e.Node.create(u),t.buttonNode.append(t._selectedMainItemNode),t._itemsContainerNode=e.Node.create(l),n.addClass("itsa-"+(t.get("listAlignLeft")?"left":"right")+"align"),i&&n.addClass(i),s&&(t._selectedMainItemNode.addClass("itsa-button-icon"),t._selectedMainItemNode.addClass(s)),c&&t.buttonNode.setStyle("minWidth",c+"px"),h&&t._itemsContainerNode.setStyle("width",h+"px"),p===1?n.addClass("itsa-buttonsize-small"):p===2&&n.addClass("itsa-buttonsize-medium"),n.append(t._itemsContainerNode)},bindUI:function(){var e=this,t=e.get("boundingBox");e._eventhandlers.push(t.on("click",e._toggleListbox,e)),e._eventhandlers.push(t.on("clickoutside",e.hideListbox,e)),e._eventhandlers.push(e._itemsContainerNode.delegate("click",e._itemClick,"li",e)),e._eventhandlers.push(e.on("disabledChange",e._disabledChange,e))},syncUI:function(){var t=this,r=t.get("items"),i=t.get("defaultItem"),s=t._itemsContainerNode.one(".itsa-selectlist-ullist"),o,u,a=t.get("index"),f,l,c,h;s.setHTML("");if(r.length>0){for(o=0;o<r.length;o++){u=r[o],f=n.isString(u)?u:u.text||"",l=f===i;if(l||a===o)c=!0,a===o&&(i=f),t.set("index",o,{silent:!0});h=e.Node.create("<li"+(l?' class="'+t._selectedItemClass+'"':"")+">"+f+"</li>"),u.returnValue&&h.setData("returnValue",u.returnValue),s.append(h)}t._selectedMainItemNode.setHTML(t.get("selectionOnButton")&&c?i:t.get("defaultButtonText"))}t._syncWithinSetterItems=!0},_itemClick:function(e){this._selectItem(e.currentTarget,!0)},selectItem:function(e,t,n,r){var i=this,s=i._itemsContainerNode.all("li");i.get("disabled")||(e>=0&&e<s.size()?i._selectItem(s.item(e),null,r):t&&(s.removeClass(i._selectedItemClass),i.get("selectionOnButton")&&i._selectedMainItemNode.setHTML(n||i.get("defaultButtonText"))))},selectItemByValue:function(t,n,r){var i=this,s=e.Array.indexOf(i._itemValues,t.toString().toLowerCase());i.selectItem(s,n,r?i.get("defaultButtonText"):t)},_selectItem:function(e,t,n){var r=this,i=r._itemsContainerNode.one("li."+r._selectedItemClass),s=r.get("selectionOnButton"),o,u;!r.get("disabled")&&e&&(e!==i||!s)&&(i&&i.removeClass(r._selectedItemClass),o=e.getHTML(),s&&(e.addClass(r._selectedItemClass),r._selectedMainItemNode.setHTML(o)),u=r._indexOf(e),r.fire("valueChange",{element:e,value:e.getData("returnValue")||o,index:r._indexOf(e)}),t&&r.fire("selectChange",{element:e,value:e.getData("returnValue")||o,index:r._indexOf(e)}),n||!s||r.set("index",u,{silent:!0}))},hideListbox:function(){var e=this;e.get("disabled")||(e.fire("hide"),e._itemsContainerNode.toggleClass(i,!0))},showListbox:function(){var e=this;e.get("disabled")||(e.fire("show"),e._itemsContainerNode.toggleClass(i,!1))},_toggleListbox:function(){var e=this;e._itemsContainerNode.hasClass(i)?e.showListbox():e.hideListbox()},currentSelected:function(){return this._itemsContainerNode.one("li."+this._selectedItemClass)},currentIndex:function(){return this.get("index")},_indexOf:function(e){var t=this._itemsContainerNode.one(".itsa-selectlist-ullist").all("li");return t.indexOf(e)},_disabledChange:function(e){var t=this;t.buttonNode.toggleClass("yui3-button-disabled",e.newVal),t.hideListbox()},_clearMemory:function(){var t=this;e.Array.each(t._eventhandlers,function(e){e.detach()})},destructor:function(){this._clearMemory()}},{ATTRS:{btnSize:{value:3,validator:function(e){return n.isNumber(e)&&e>0&&e<4}},defaultButtonText:{value:"choose...",validator:function(t){return e.Lang.isString(t)}},buttonWidth:{value:null,validator:function(t){return e.Lang.isNumber(t)&&t>=0}},listWidth:{value:null,validator:function(t){return e.Lang.isNumber(t)&&t>=0}},listAlignLeft:{value:!0,validator:function(t){return e.Lang.isBoolean(t)}},className:{value:null,validator:function(t){return e.Lang.isString(t)}},iconClassName:{value:null,validator:function(t){return e.Lang.isString(t)}},items:{value:[],validator:function(t){return e.Lang.isArray(t)},setter:function(e){var t=this,n,r;t._itemValues=[];for(r=0;r<e.length;r++)n=e[r],t._itemValues.push(n.returnValue?n.returnValue.toString().toLowerCase():n.toString().toLowerCase());return this._syncWithinSetterItems&&this.syncUI(),e}},defaultItem:{value:null,validator:function(t){return e.Lang.isString(t)}},index:{value:null,validator:function(e){return typeof e=="number"},setter:function(e){return this.selectItem(e,null,null,!0),e}},selectionOnButton:{value:!0,validator:function(t){return e.Lang.isBoolean(t)}},hideSelected:{value:!1,validator:function(t){return e.Lang.isBoolean(t)},setter:function(e){var t=this;return t._selectedItemClass=e?i:"itsa-selectlist-selected",e}}},HTML_PARSER:{defaultItem:function(e){var t=e.all("option"),n=null;return t.each(function(e){!n&&e.getAttribute("selected")==="selected"&&(n=e.getHTML())}),n},items:function(e){var t=e.all("option"),n=[];return t.each(function(e){n.push({text:e.getHTML(),returnValue:e.getAttribute("value")||e.getHTML()})}),n}}}
)},"@VERSION@",{requires:["yui-base","base-build","node-style","base-base","widget","node-base","cssbutton","event-base","node-event-delegate","event-outside"],skinnable:!0});
