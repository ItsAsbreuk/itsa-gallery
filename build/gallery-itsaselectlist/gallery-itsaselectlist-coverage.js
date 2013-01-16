if (typeof _yuitest_coverage == "undefined"){
    _yuitest_coverage = {};
    _yuitest_coverline = function(src, line){
        var coverage = _yuitest_coverage[src];
        if (!coverage.lines[line]){
            coverage.calledLines++;
        }
        coverage.lines[line]++;
    };
    _yuitest_coverfunc = function(src, name, line){
        var coverage = _yuitest_coverage[src],
            funcId = name + ":" + line;
        if (!coverage.functions[funcId]){
            coverage.calledFunctions++;
        }
        coverage.functions[funcId]++;
    };
}
_yuitest_coverage["build/gallery-itsaselectlist/gallery-itsaselectlist.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-itsaselectlist/gallery-itsaselectlist.js",
    code: []
};
_yuitest_coverage["build/gallery-itsaselectlist/gallery-itsaselectlist.js"].code=["YUI.add('gallery-itsaselectlist', function (Y, NAME) {","","'use strict';","","/**"," * The Itsa Selectlist module."," *"," * @module gallery-itsaselectlist"," */","","","/**"," *"," * @class ITSASelectlist"," * @extends Widget"," * @constructor"," *"," * <i>Copyright (c) 2012 Marco Asbreuk - http://theinternetwizard.net</i>"," * YUI BSD License - http://developer.yahoo.com/yui/license.html"," *","*/","","// Local constants","var Lang = Y.Lang,","    Node = Y.Node,","    IE = Y.UA.ie,","    ITSA_CLASSHIDDEN = 'itsa-hidden',","    ITSA_SHIM_TEMPLATE_TITLE = \"Selectlist Shim\",","    ITSA_SHIM_TEMPLATE = '<iframe frameborder=\"0\" tabindex=\"-1\" class=\"itsa-shim\" title=\"' + ITSA_SHIM_TEMPLATE_TITLE + '\" src=\"javascript:false;\"></iframe>',","    ITSA_SELECTEDMAIN_TEMPLATE = \"<span class='itsa-selectlist-selectedmain' unselectable='on'></span>\",","    ITSA_BUTTON_TEMPLATE = \"<button class='yui3-button'></button>\",","    ITSA_DOWNBUTTON_TEMPLATE = \"<span class='itsa-button-icon itsa-icon-selectdown'></span>\",","    ITSA_SELECTBOX_TEMPLATE = \"<div class='itsa-selectlist-basediv \" + ITSA_CLASSHIDDEN + \"'><div class='itsa-selectlist-scrolldiv'><ul class='itsa-selectlist-ullist'></ul></div></div>\";","","Y.ITSASelectList = Y.Base.create('itsaselectlist', Y.Widget, [], {","","","// -- Public Static Properties -------------------------------------------------","","/**"," * Reference to the editor's instance"," * @property buttonNode"," * @type Y.EditorBase instance"," */","","/**"," * Reference to the Y-instance of the host-editor"," * @private"," * @property _selectedMainItemNode"," * @type YUI-instance"," */","","/**"," * Reference to the editor's iframe-node"," * @private"," * @property _selectedItemClass"," * @type Y.Node"," */","","/**"," * Reference to the editor's container-node, in which the host-editor is rendered.<br>"," * This is in fact editorNode.get('parentNode')"," * @private"," * @property _itemsContainerNode"," * @type Y.Node"," */","","/**"," * Reference to the toolbar-node"," * @private"," * @property _itemValues"," * @type Y.Node"," */","","/**"," * Reference to the toolbar-node"," * @private"," * @property _syncWithinSetterItems"," * @type Y.Node"," */","","/**"," * arraylist of all created eventhandlers within bindUI(). Is used to cleanup during destruction."," * @private"," * @property _eventhandlers"," * @type Array"," */","","        buttonNode : null,","        _selectedMainItemNode : null,","        _selectedItemClass : null,","        _itemsContainerNode : null,","        _itemValues : null, // for internal use: listitems, transformed to String, so we can use selectItemByValue","        _syncWithinSetterItems : false, // no items.setter.syncUI during initializing","        _eventhandlers : [],","","","        /**","         * Sets up the selectlist during initialisation.","         *","         * @method initializer","         * @param {Object} config The config-object.","         * @protected","        */","        initializer : function(config) {","            var instance = this;","            instance._selectedItemClass = instance.get('hideSelected') ? ITSA_CLASSHIDDEN : 'itsa-selectlist-selected';","","        },","","        /**","         * Widget's renderUI-method. Creates the Selectlist in the DOM.","         *","         * @method renderUI ","        */","        renderUI : function() {","            var instance = this,","                boundingBox = instance.get('boundingBox'),","                className = instance.get('className'),","                iconClassName = instance.get('iconClassName'),","                buttonWidth = instance.get('buttonWidth'),","                listWidth = instance.get('listWidth'),","                btnSize = instance.get('btnSize'),","                items;","            if ((IE>0) && (IE<7)) {boundingBox.append(instance.SHIM_TEMPLATE);}","            instance.buttonNode = Y.Node.create(ITSA_BUTTON_TEMPLATE);","            boundingBox.append(instance.buttonNode);","            instance.buttonNode.setHTML(ITSA_DOWNBUTTON_TEMPLATE);","            instance._selectedMainItemNode = Y.Node.create(ITSA_SELECTEDMAIN_TEMPLATE);","            instance.buttonNode.append(instance._selectedMainItemNode);","            instance._itemsContainerNode = Y.Node.create(ITSA_SELECTBOX_TEMPLATE);","            instance.get('listAlignLeft') ? boundingBox.addClass('itsa-leftalign') : boundingBox.addClass('itsa-rightalign');","            if (className) {boundingBox.addClass(className);}","            if (iconClassName) {","                instance._selectedMainItemNode.addClass('itsa-button-icon');","                instance._selectedMainItemNode.addClass(iconClassName);","            }","            // must set minWidth instead of width in case of button: otherwise the 2 spans might be positioned underneath each other","            if (buttonWidth) {instance.buttonNode.setStyle('minWidth', buttonWidth+'px');}","            if (listWidth) {instance._itemsContainerNode.setStyle('width', listWidth+'px');}","            if (btnSize===1) {boundingBox.addClass('itsa-buttonsize-small');}","            else {if (btnSize===2) {boundingBox.addClass('itsa-buttonsize-medium');}}","            boundingBox.append(instance._itemsContainerNode);","        },","","        /**","         * Widget's bindUI-method. Binds onclick and clickoutside-events","         *","         * @method bindUI ","        */","        bindUI : function() {","            var instance = this,","                boundingBox = instance.get('boundingBox');","            instance._eventhandlers.push(","               boundingBox.on('click', instance._toggleListbox, instance)","            );","            instance._eventhandlers.push(","               boundingBox.on('clickoutside', instance.hideListbox, instance)","            );","            instance._eventhandlers.push(","               instance._itemsContainerNode.delegate('click', instance._itemClick, 'li', instance)","            );","            instance._eventhandlers.push(","               instance.on('disabledChange', instance._disabledChange, instance)","            );","        },","","        /**","         *  Widget's syncUI-method. Renders the selectlist items","         *","         * @method syncUI","        */","        syncUI : function() {","            var instance = this,","                items = instance.get('items'),","                defaultItem = instance.get('defaultItem'),","                ullist = instance._itemsContainerNode.one('.itsa-selectlist-ullist'),","                i, ","                item,","                itemText,","                isDefaultItem,","                defaultItemFound,","                newNode;","            ullist.setHTML(''); // clear content","            if (items.length>0) {","                for (i=0; i<items.length; i++) {","                    item = items[i];","                    itemText = Lang.isString(item) ? item : (item.text || '');","                    isDefaultItem = (itemText===defaultItem);","                    if (isDefaultItem) {defaultItemFound = true;}","                    newNode = Y.Node.create('<li' + ((isDefaultItem) ? ' class=\"' + instance._selectedItemClass + '\"' : '') + '>' + itemText +'</li>');","                    if (item.returnValue) {newNode.setData('returnValue', item.returnValue);}","                    ullist.append(newNode);","                }","                instance._selectedMainItemNode.setHTML((instance.get('selectionOnButton') && defaultItemFound) ? defaultItem : instance.get('defaultButtonText'));","            }","            instance._syncWithinSetterItems = true;","        },","","        /**","         * Internal function that will be called when a user changes the selected item","         *","         * @method _itemClick","         * @private","         * @param {EventFacade} e with e.currentTarget as the selected li-Node","         * @return {eventFacade} Fires a valueChange, or selectChange event.<br>","         * <i>- e.currentTarget: the selected li-Node<br>","         * <i>- e.value: returnvalue of the selected item<br>","         * <i>- e.index: index of the selected item</i>","         * ","        */","        _itemClick : function(e) {","            this._selectItem(e.currentTarget, true);","        },","","        /**","         * Selects the items at a specified index.<br>","         * When softMatch is set to true, the selected value will return to the default, even when there is no match.<br>","         * When softMatch is false, or not specified, there has to be a match in order to change.","         *","         * @method selectItem","         * @param {Int} index index to be selected","         * @param {Boolean} [softMatch] Optional. When set to true will always make a selectchange, even when the index is out of bound","         * @param {String} [softButtonText] Optional. Text to be appeared on the button in case softMatch is true and there is no match. When not specified, the attribute <i>defaultButtonText</i> will be used","         * @return {eventFacade} Fires a valueChange, NO selectChange event, because there is no userinteraction.<br>","         * <i>- e.currentTarget: the selected li-Node<br>","         * <i>- e.value: returnvalue of the selected item<br>","         * <i>- e.index: index of the selected item</i>","         * ","        */","        selectItem : function(index, softMatch, softButtonText) {","            var instance = this,","                nodelist = instance._itemsContainerNode.all('li');","            if (!instance.get('disabled')) {","                if ((index>=0) && (index<nodelist.size())) {instance._selectItem(nodelist.item(index));}","                else {","                    // no hit: return to default without selection in case of softMatch","                    if (softMatch) {","                        nodelist.removeClass(instance._selectedItemClass);","                        if (instance.get('selectionOnButton')) {instance._selectedMainItemNode.setHTML(softButtonText || instance.get('defaultButtonText'));}","                    }","                }","            }","        },","","        /**","         * Selects the items based on the listvalue.<br>","         * When softMatch is set to true, the selected value will return to the default, even when there is no match.<br>","         * When softMatch is false, or not specified, there has to be a match in order to change.","         *","         * @method selectItemByValue","         * @param {String} itemText listitem to be selected","         * @param {Boolean} [softMatch] Optional. When set to true will always make a selectchange, even when the listitem is not available","         * @param {Boolean} [defaultButtonText] Optional. Whether to use the attribute <i>defaultButtonText</i> in case softMatch is true and there is no match. When set to false, <i>itemText</i> will be used when there is no match.","         * @return {eventFacade} Fires a valueChange, NO selectChange event, because there is no userinteraction.<br>","         * <i>- e.currentTarget: the selected li-Node<br>","         * <i>- e.value: returnvalue of the selected item<br>","         * <i>- e.index: index of the selected item</i>","         *","        */","        selectItemByValue : function(itemText, softMatch, defaultButtonText) {","            // by returnvalue ","            var instance = this,","                index = Y.Array.indexOf(instance._itemValues, itemText.toString().toLowerCase());","            instance.selectItem(index, softMatch, defaultButtonText ? instance.get('defaultButtonText') : itemText);","        },","","        /**","         * Does the final itemselection based on the listnode.<br>","         * Will always fire a <b>valueChange event</b>.<br>","         * Will fire a <b>selectChange event</b> only when <i>userInteraction</i> is set to true. ","         *","         * @method _selectItem","         * @private","         * @param {Y.Node} node listitem to be selected","         * @param {Boolean} userInteraction Specifies whether the selection is made by userinteraction, or by functioncall.<br>","         * In case of userinteraction,  selectChange will also be fired.","         * @return {eventFacade} Not returnvalue, but event, fired by valueChange, or selectChange.<br>","         * <i>- e.currentTarget: the selected li-Node<br>","         * <i>- e.value: returnvalue of the selected item<br>","         * <i>- e.index: index of the selected item</i>","         *","        */","        _selectItem : function(node, userInteraction) {","            var instance = this,","                previousNode = instance._itemsContainerNode.one('li.'+instance._selectedItemClass),","                nodeHTML;","            if (!instance.get('disabled') && node && (node !== previousNode)) {","                if (previousNode) {previousNode.removeClass(instance._selectedItemClass);}","                node.addClass(instance._selectedItemClass);","                nodeHTML = node.getHTML();","                if (instance.get('selectionOnButton')) {instance._selectedMainItemNode.setHTML(nodeHTML);}","                /**","                 * In case of a valuechange, valueChange will be fired. ","                 * No matter whether the change is done by userinteraction, or by a functioncall like selectItem()","                 * @event valueChange","                 * @param {EventFacade} e Event object<br>","                 * <i>- e.element: the selected li-Node<br>","                 * <i>- e.value: returnvalue of the selected item<br>","                 * <i>- e.index: index of the selected item</i>","                */                ","                instance.fire('valueChange', {element: node, value: node.getData('returnValue') || nodeHTML, index: instance._indexOf(node)});","                /**","                 * In case of a valuechange <u>triggered by userinteraction</u>, selectChange will be fired. ","                 * This way you can use functioncalls like selectItem() and prevent double programmaction (which might occur when you listen to the valueChange event)","                 * @event selectChange","                 * @param {EventFacade} e Event object<br>","                 * <i>- e.element: the selected li-Node<br>","                 * <i>- e.value: returnvalue of the selected item<br>","                 * <i>- e.index: index of the selected item</i>","                */                ","                if (userInteraction) {instance.fire('selectChange', {element: node, value: node.getData('returnValue') || nodeHTML, index: instance._indexOf(node)});}","            }","        },","","        /**","         * Will hide the listitems.","         * Will also fire a <b>hide event</b>.<br>","         * @method hideListbox","         *","        */","        hideListbox : function() {","            var instance = this;","            if (!instance.get('disabled')) {","                /**","                 * In case the listbox is opened, hide-event will be fired. ","                 * @event hide","                 * @param {EventFacade} e Event object<br>","                */                ","                instance.fire('hide');","                instance._itemsContainerNode.toggleClass(ITSA_CLASSHIDDEN, true);","            }","        },","","        /**","         * Will show the listitems.","         * Will also fire a <b>show event</b>.<br>","         * @method showListbox","         *","        */","        showListbox : function() {","            var instance = this;","            if (!instance.get('disabled')) {","                /**","                 * In case the listbox is opened, show-event will be fired. ","                 * @event show","                 * @param {EventFacade} e Event object<br>","                */                ","                instance.fire('show');","                instance._itemsContainerNode.toggleClass(ITSA_CLASSHIDDEN, false);","            }","        },","","        /**","         * Toggles between shown/hidden listitems.","         *","         * @method _toggleListbox","         * @private","         *","        */","        _toggleListbox : function() {","            var instance = this;","            if (instance._itemsContainerNode.hasClass(ITSA_CLASSHIDDEN)) {instance.showListbox();}","            else {instance.hideListbox();}","        },","","        /**","         * Returns the actual selected listitemnode.<br>","         *","         * @method currentSelected","         * @return {Y.Node} the current selected listitemnode, or null if none is selected.","        */","        currentSelected : function() {","            return this._itemsContainerNode.one('li.'+this._selectedItemClass);","        },","","        /**","         * Returns the index of the actual selected listitemnode.<br>","         *","         * @method currentIndex","         * @return {Int} index of the current selected listitem, or -1 if none is selected.","         *","        */","        currentIndex : function() {","            return this._indexOf(this.currentSelected());","        },","","        /**","         * Returns the index of a listitemnode.<br>","         *","         * @method _indexOf","         * @private","         * @param {Y.Node} node the node to search for.","         * @return {Int} index of a listitem, or -1 if not present.","         *","        */","        _indexOf : function(node) {","            var nodelist = this._itemsContainerNode.one('.itsa-selectlist-ullist').all('li');","            return nodelist.indexOf(node);","        },","        ","        /**","         * Is called after a disabledchange. Does dis/enable the inner-button element<br>","         *","         * @method _disabledChange","         * @private","         * @param {eventFacade} e passed through by widget.disabledChange event","         *","        */","        _disabledChange : function(e) {","            var instance = this;","            instance.buttonNode.toggleClass('yui3-button-disabled', e.newVal);","            instance.hideListbox();","        },","","        /**","         * Cleaning up all eventhandlers created by bindUI(). Is called by the destructor.<br>","         *","         * @method _clearMemory","         * @private","         *","        */","        _clearMemory : function() {","            var instance = this;","            Y.Array.each(","                instance._eventhandlers,","                function(item, index, array){","                    item.detach();","                }    ","            );","        },","","        /**","         * Cleaning up.","         *","         * @protected","         * @method destructor","         *","        */","        destructor : function() {","            this._clearMemory();","        }","","    }, {","        ATTRS : {","","            /**","             * @description The size of the buttons<br>","             * Should be a value 1, 2 or 3 (the higher, the bigger the buttonsize)<br>","             * Default = 2","             * @attribute btnSize","             * @type int","            */","            btnSize : {","                value: 3,","                validator: function(val) {","                    return (Lang.isNumber(val) && (val>0) && (val<4));","                }","            },","","            /**","             * @description Defines the defaultbuttontext when a softMatch with no hit has taken place.<br>","             * See <i>selectItem()</i> how to use a softMatch.<br>","             * Default = 'choose...'","             * @attribute defaultButtonText","             * @type String Default='choose...'","            */","            defaultButtonText : {","                value: 'choose...',","                validator: function(val) {","                    return Y.Lang.isString(val);","                }","            },","","            /**","             * @description Defines the buttonWidth<br>","             * Default = null, which means automaticly sizeing.","             * @attribute buttonWidth","             * @type Int","            */","            buttonWidth: {","                value: null,","                validator: function(val) {","                    return (Y.Lang.isNumber(val) && (val>=0));","                }","            },","","            /**","             * @description Defines the width of the listbox.<br>","             * Default = null, which means automaticly sizeing.","             * @attribute listWidth","             * @type Int","            */","            listWidth: {","                value: null,","                validator: function(val) {","                    return (Y.Lang.isNumber(val) && (val>=0));","                }","            },","","            /**","             * @description Whether the listitems should be aligned left or right.","             * Default = true.","             * @attribute listAlignLeft","             * @type Boolean","            */","            listAlignLeft : {","                value: true,","                validator: function(val) {","                    return Y.Lang.isBoolean(val);","                }","            },","","            /**","             * @description Additional className that can be added to the boundingBox","             * @attribute className","             * @type String","            */","            className : {","                value: null,","                validator: function(val) {","                    return Y.Lang.isString(val);","                }","            },","","            /**","             * @description Additional className that can be added to the selected text on the Button","             * @attribute iconClassName","             * @type String","            */","            iconClassName : {","                value: null,","                validator: function(val) {","                    return Y.Lang.isString(val);","                }","            },","","            /**","             * @description Listitems in the selectbox","             * @attribute items","             * @type Array (String | Int | Object)  in case of Object, the object should have the fields: <i>o.text</i> and <i>o.returnValue</i>","            */","            items : {","                value: [],","                validator: function(val) {","                    return Y.Lang.isArray(val);","                },","                setter: function(val) {","                    var instance = this,","                        item,","                        i;","                    instance._itemValues = [];","                    for (i=0; i<val.length; i++) {","                        item = val[i];","                        // Make sure to fill the array with Strings. User might supply other types like numbers: you don't want to miss the hit when you search the array by value.","                        instance._itemValues.push(item.returnValue ? item.returnValue.toString().toLowerCase() : item.toString().toLowerCase());","                    }","                    // only call syncUI when items are change after rendering","                    if (this._syncWithinSetterItems) {this.syncUI();}","                    return val;","                }","            },","","            /**","             * @description The default listitem to be selected during rendering.<br>","             * Default = null","             * @attribute defaultItem","             * @type String","            */","            defaultItem : {","                value: null,","                validator: function(val) {","                    return Y.Lang.isString(val);","                }","            },","","            /**","             * @description Whether the selection should be displayed on the button.<br>","             * This is normal behaviour. Although in some cases you might not want this. For example when simulating a menubutton with static text and a dropdown with subbuttons<br>","             * Default = true<br>","             * When set to false, the buttontext will always remains the Attribute: <b>defaultButtonText</b>","             * @attribute selectionOnButton","             * @type Boolean","            */","            selectionOnButton : {","                value: true,","                validator: function(val) {","                    return Y.Lang.isBoolean(val);","                }","            },","","            /**","             * @description Determines whether to show the selected item in the selectlist, or if it should disappear from the selectlist when selected.<br>","             * Default = false.","             * @attribute hideSelected","             * @type Boolean","            */","            hideSelected : {","                value: false,","                validator: function(val) {","                    return Y.Lang.isBoolean(val);","                },","                setter: function(val) {","                    var instance = this;","                    instance._selectedItemClass = val ? ITSA_CLASSHIDDEN : 'itsa-selectlist-selected';","                    return val;","                }","            }","        },","","        HTML_PARSER: {","","            defaultItem: function (srcNode) {","                var options = srcNode.all('option'),","                    selected = null;","                options.each(","                    function(node, index, nodelist) {","                        if (!selected && (node.getAttribute('selected')==='selected')) {","                            selected = node.getHTML();","                        }","                    }","                );","                return selected; ","            },","","            items: function(srcNode) {","                var options = srcNode.all('option'),","                    allItems = [];","                options.each(","                    function(node, index, nodelist) {","                        allItems.push(","                            {","                                text: node.getHTML(),","                                returnValue: node.getAttribute('value') || node.getHTML()","                            }","                        );","                    }","                );","                return allItems;","            }","        }","","    }",");","","}, '@VERSION@', {","    \"supersedes\": [","        \"\"","    ],","    \"skinnable\": \"true\",","    \"requires\": [","        \"base-build\",","        \"widget\",","        \"node-base\",","        \"cssbutton\",","        \"event-base\",","        \"node-event-delegate\",","        \"event-outside\"","    ],","    \"optional\": [","        \"\"","    ]","});"];
_yuitest_coverage["build/gallery-itsaselectlist/gallery-itsaselectlist.js"].lines = {"1":0,"3":0,"24":0,"35":0,"106":0,"107":0,"117":0,"125":0,"126":0,"127":0,"128":0,"129":0,"130":0,"131":0,"132":0,"133":0,"134":0,"135":0,"136":0,"139":0,"140":0,"141":0,"143":0,"152":0,"154":0,"157":0,"160":0,"163":0,"174":0,"184":0,"185":0,"186":0,"187":0,"188":0,"189":0,"190":0,"191":0,"192":0,"193":0,"195":0,"197":0,"213":0,"232":0,"234":0,"235":0,"238":0,"239":0,"240":0,"263":0,"265":0,"285":0,"288":0,"289":0,"290":0,"291":0,"292":0,"302":0,"312":0,"323":0,"324":0,"330":0,"331":0,"342":0,"343":0,"349":0,"350":0,"362":0,"363":0,"374":0,"385":0,"398":0,"399":0,"411":0,"412":0,"413":0,"424":0,"425":0,"428":0,"441":0,"457":0,"471":0,"484":0,"497":0,"510":0,"522":0,"534":0,"546":0,"549":0,"552":0,"553":0,"554":0,"556":0,"559":0,"560":0,"573":0,"588":0,"601":0,"604":0,"605":0,"606":0,"614":0,"616":0,"618":0,"619":0,"623":0,"627":0,"629":0,"631":0,"639":0};
_yuitest_coverage["build/gallery-itsaselectlist/gallery-itsaselectlist.js"].functions = {"initializer:105":0,"renderUI:116":0,"bindUI:151":0,"syncUI:173":0,"_itemClick:212":0,"selectItem:231":0,"selectItemByValue:261":0,"_selectItem:284":0,"hideListbox:322":0,"showListbox:341":0,"_toggleListbox:361":0,"currentSelected:373":0,"currentIndex:384":0,"_indexOf:397":0,"_disabledChange:410":0,"(anonymous 2):427":0,"_clearMemory:423":0,"destructor:440":0,"validator:456":0,"validator:470":0,"validator:483":0,"validator:496":0,"validator:509":0,"validator:521":0,"validator:533":0,"validator:545":0,"setter:548":0,"validator:572":0,"validator:587":0,"validator:600":0,"setter:603":0,"(anonymous 3):617":0,"defaultItem:613":0,"(anonymous 4):630":0,"items:626":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-itsaselectlist/gallery-itsaselectlist.js"].coveredLines = 109;
_yuitest_coverage["build/gallery-itsaselectlist/gallery-itsaselectlist.js"].coveredFunctions = 36;
_yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 1);
YUI.add('gallery-itsaselectlist', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-itsaselectlist/gallery-itsaselectlist.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 3);
'use strict';

/**
 * The Itsa Selectlist module.
 *
 * @module gallery-itsaselectlist
 */


/**
 *
 * @class ITSASelectlist
 * @extends Widget
 * @constructor
 *
 * <i>Copyright (c) 2012 Marco Asbreuk - http://theinternetwizard.net</i>
 * YUI BSD License - http://developer.yahoo.com/yui/license.html
 *
*/

// Local constants
_yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 24);
var Lang = Y.Lang,
    Node = Y.Node,
    IE = Y.UA.ie,
    ITSA_CLASSHIDDEN = 'itsa-hidden',
    ITSA_SHIM_TEMPLATE_TITLE = "Selectlist Shim",
    ITSA_SHIM_TEMPLATE = '<iframe frameborder="0" tabindex="-1" class="itsa-shim" title="' + ITSA_SHIM_TEMPLATE_TITLE + '" src="javascript:false;"></iframe>',
    ITSA_SELECTEDMAIN_TEMPLATE = "<span class='itsa-selectlist-selectedmain' unselectable='on'></span>",
    ITSA_BUTTON_TEMPLATE = "<button class='yui3-button'></button>",
    ITSA_DOWNBUTTON_TEMPLATE = "<span class='itsa-button-icon itsa-icon-selectdown'></span>",
    ITSA_SELECTBOX_TEMPLATE = "<div class='itsa-selectlist-basediv " + ITSA_CLASSHIDDEN + "'><div class='itsa-selectlist-scrolldiv'><ul class='itsa-selectlist-ullist'></ul></div></div>";

_yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 35);
Y.ITSASelectList = Y.Base.create('itsaselectlist', Y.Widget, [], {


// -- Public Static Properties -------------------------------------------------

/**
 * Reference to the editor's instance
 * @property buttonNode
 * @type Y.EditorBase instance
 */

/**
 * Reference to the Y-instance of the host-editor
 * @private
 * @property _selectedMainItemNode
 * @type YUI-instance
 */

/**
 * Reference to the editor's iframe-node
 * @private
 * @property _selectedItemClass
 * @type Y.Node
 */

/**
 * Reference to the editor's container-node, in which the host-editor is rendered.<br>
 * This is in fact editorNode.get('parentNode')
 * @private
 * @property _itemsContainerNode
 * @type Y.Node
 */

/**
 * Reference to the toolbar-node
 * @private
 * @property _itemValues
 * @type Y.Node
 */

/**
 * Reference to the toolbar-node
 * @private
 * @property _syncWithinSetterItems
 * @type Y.Node
 */

/**
 * arraylist of all created eventhandlers within bindUI(). Is used to cleanup during destruction.
 * @private
 * @property _eventhandlers
 * @type Array
 */

        buttonNode : null,
        _selectedMainItemNode : null,
        _selectedItemClass : null,
        _itemsContainerNode : null,
        _itemValues : null, // for internal use: listitems, transformed to String, so we can use selectItemByValue
        _syncWithinSetterItems : false, // no items.setter.syncUI during initializing
        _eventhandlers : [],


        /**
         * Sets up the selectlist during initialisation.
         *
         * @method initializer
         * @param {Object} config The config-object.
         * @protected
        */
        initializer : function(config) {
            _yuitest_coverfunc("build/gallery-itsaselectlist/gallery-itsaselectlist.js", "initializer", 105);
_yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 106);
var instance = this;
            _yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 107);
instance._selectedItemClass = instance.get('hideSelected') ? ITSA_CLASSHIDDEN : 'itsa-selectlist-selected';

        },

        /**
         * Widget's renderUI-method. Creates the Selectlist in the DOM.
         *
         * @method renderUI 
        */
        renderUI : function() {
            _yuitest_coverfunc("build/gallery-itsaselectlist/gallery-itsaselectlist.js", "renderUI", 116);
_yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 117);
var instance = this,
                boundingBox = instance.get('boundingBox'),
                className = instance.get('className'),
                iconClassName = instance.get('iconClassName'),
                buttonWidth = instance.get('buttonWidth'),
                listWidth = instance.get('listWidth'),
                btnSize = instance.get('btnSize'),
                items;
            _yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 125);
if ((IE>0) && (IE<7)) {boundingBox.append(instance.SHIM_TEMPLATE);}
            _yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 126);
instance.buttonNode = Y.Node.create(ITSA_BUTTON_TEMPLATE);
            _yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 127);
boundingBox.append(instance.buttonNode);
            _yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 128);
instance.buttonNode.setHTML(ITSA_DOWNBUTTON_TEMPLATE);
            _yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 129);
instance._selectedMainItemNode = Y.Node.create(ITSA_SELECTEDMAIN_TEMPLATE);
            _yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 130);
instance.buttonNode.append(instance._selectedMainItemNode);
            _yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 131);
instance._itemsContainerNode = Y.Node.create(ITSA_SELECTBOX_TEMPLATE);
            _yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 132);
instance.get('listAlignLeft') ? boundingBox.addClass('itsa-leftalign') : boundingBox.addClass('itsa-rightalign');
            _yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 133);
if (className) {boundingBox.addClass(className);}
            _yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 134);
if (iconClassName) {
                _yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 135);
instance._selectedMainItemNode.addClass('itsa-button-icon');
                _yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 136);
instance._selectedMainItemNode.addClass(iconClassName);
            }
            // must set minWidth instead of width in case of button: otherwise the 2 spans might be positioned underneath each other
            _yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 139);
if (buttonWidth) {instance.buttonNode.setStyle('minWidth', buttonWidth+'px');}
            _yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 140);
if (listWidth) {instance._itemsContainerNode.setStyle('width', listWidth+'px');}
            _yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 141);
if (btnSize===1) {boundingBox.addClass('itsa-buttonsize-small');}
            else {if (btnSize===2) {boundingBox.addClass('itsa-buttonsize-medium');}}
            _yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 143);
boundingBox.append(instance._itemsContainerNode);
        },

        /**
         * Widget's bindUI-method. Binds onclick and clickoutside-events
         *
         * @method bindUI 
        */
        bindUI : function() {
            _yuitest_coverfunc("build/gallery-itsaselectlist/gallery-itsaselectlist.js", "bindUI", 151);
_yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 152);
var instance = this,
                boundingBox = instance.get('boundingBox');
            _yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 154);
instance._eventhandlers.push(
               boundingBox.on('click', instance._toggleListbox, instance)
            );
            _yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 157);
instance._eventhandlers.push(
               boundingBox.on('clickoutside', instance.hideListbox, instance)
            );
            _yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 160);
instance._eventhandlers.push(
               instance._itemsContainerNode.delegate('click', instance._itemClick, 'li', instance)
            );
            _yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 163);
instance._eventhandlers.push(
               instance.on('disabledChange', instance._disabledChange, instance)
            );
        },

        /**
         *  Widget's syncUI-method. Renders the selectlist items
         *
         * @method syncUI
        */
        syncUI : function() {
            _yuitest_coverfunc("build/gallery-itsaselectlist/gallery-itsaselectlist.js", "syncUI", 173);
_yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 174);
var instance = this,
                items = instance.get('items'),
                defaultItem = instance.get('defaultItem'),
                ullist = instance._itemsContainerNode.one('.itsa-selectlist-ullist'),
                i, 
                item,
                itemText,
                isDefaultItem,
                defaultItemFound,
                newNode;
            _yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 184);
ullist.setHTML(''); // clear content
            _yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 185);
if (items.length>0) {
                _yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 186);
for (i=0; i<items.length; i++) {
                    _yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 187);
item = items[i];
                    _yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 188);
itemText = Lang.isString(item) ? item : (item.text || '');
                    _yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 189);
isDefaultItem = (itemText===defaultItem);
                    _yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 190);
if (isDefaultItem) {defaultItemFound = true;}
                    _yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 191);
newNode = Y.Node.create('<li' + ((isDefaultItem) ? ' class="' + instance._selectedItemClass + '"' : '') + '>' + itemText +'</li>');
                    _yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 192);
if (item.returnValue) {newNode.setData('returnValue', item.returnValue);}
                    _yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 193);
ullist.append(newNode);
                }
                _yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 195);
instance._selectedMainItemNode.setHTML((instance.get('selectionOnButton') && defaultItemFound) ? defaultItem : instance.get('defaultButtonText'));
            }
            _yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 197);
instance._syncWithinSetterItems = true;
        },

        /**
         * Internal function that will be called when a user changes the selected item
         *
         * @method _itemClick
         * @private
         * @param {EventFacade} e with e.currentTarget as the selected li-Node
         * @return {eventFacade} Fires a valueChange, or selectChange event.<br>
         * <i>- e.currentTarget: the selected li-Node<br>
         * <i>- e.value: returnvalue of the selected item<br>
         * <i>- e.index: index of the selected item</i>
         * 
        */
        _itemClick : function(e) {
            _yuitest_coverfunc("build/gallery-itsaselectlist/gallery-itsaselectlist.js", "_itemClick", 212);
_yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 213);
this._selectItem(e.currentTarget, true);
        },

        /**
         * Selects the items at a specified index.<br>
         * When softMatch is set to true, the selected value will return to the default, even when there is no match.<br>
         * When softMatch is false, or not specified, there has to be a match in order to change.
         *
         * @method selectItem
         * @param {Int} index index to be selected
         * @param {Boolean} [softMatch] Optional. When set to true will always make a selectchange, even when the index is out of bound
         * @param {String} [softButtonText] Optional. Text to be appeared on the button in case softMatch is true and there is no match. When not specified, the attribute <i>defaultButtonText</i> will be used
         * @return {eventFacade} Fires a valueChange, NO selectChange event, because there is no userinteraction.<br>
         * <i>- e.currentTarget: the selected li-Node<br>
         * <i>- e.value: returnvalue of the selected item<br>
         * <i>- e.index: index of the selected item</i>
         * 
        */
        selectItem : function(index, softMatch, softButtonText) {
            _yuitest_coverfunc("build/gallery-itsaselectlist/gallery-itsaselectlist.js", "selectItem", 231);
_yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 232);
var instance = this,
                nodelist = instance._itemsContainerNode.all('li');
            _yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 234);
if (!instance.get('disabled')) {
                _yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 235);
if ((index>=0) && (index<nodelist.size())) {instance._selectItem(nodelist.item(index));}
                else {
                    // no hit: return to default without selection in case of softMatch
                    _yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 238);
if (softMatch) {
                        _yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 239);
nodelist.removeClass(instance._selectedItemClass);
                        _yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 240);
if (instance.get('selectionOnButton')) {instance._selectedMainItemNode.setHTML(softButtonText || instance.get('defaultButtonText'));}
                    }
                }
            }
        },

        /**
         * Selects the items based on the listvalue.<br>
         * When softMatch is set to true, the selected value will return to the default, even when there is no match.<br>
         * When softMatch is false, or not specified, there has to be a match in order to change.
         *
         * @method selectItemByValue
         * @param {String} itemText listitem to be selected
         * @param {Boolean} [softMatch] Optional. When set to true will always make a selectchange, even when the listitem is not available
         * @param {Boolean} [defaultButtonText] Optional. Whether to use the attribute <i>defaultButtonText</i> in case softMatch is true and there is no match. When set to false, <i>itemText</i> will be used when there is no match.
         * @return {eventFacade} Fires a valueChange, NO selectChange event, because there is no userinteraction.<br>
         * <i>- e.currentTarget: the selected li-Node<br>
         * <i>- e.value: returnvalue of the selected item<br>
         * <i>- e.index: index of the selected item</i>
         *
        */
        selectItemByValue : function(itemText, softMatch, defaultButtonText) {
            // by returnvalue 
            _yuitest_coverfunc("build/gallery-itsaselectlist/gallery-itsaselectlist.js", "selectItemByValue", 261);
_yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 263);
var instance = this,
                index = Y.Array.indexOf(instance._itemValues, itemText.toString().toLowerCase());
            _yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 265);
instance.selectItem(index, softMatch, defaultButtonText ? instance.get('defaultButtonText') : itemText);
        },

        /**
         * Does the final itemselection based on the listnode.<br>
         * Will always fire a <b>valueChange event</b>.<br>
         * Will fire a <b>selectChange event</b> only when <i>userInteraction</i> is set to true. 
         *
         * @method _selectItem
         * @private
         * @param {Y.Node} node listitem to be selected
         * @param {Boolean} userInteraction Specifies whether the selection is made by userinteraction, or by functioncall.<br>
         * In case of userinteraction,  selectChange will also be fired.
         * @return {eventFacade} Not returnvalue, but event, fired by valueChange, or selectChange.<br>
         * <i>- e.currentTarget: the selected li-Node<br>
         * <i>- e.value: returnvalue of the selected item<br>
         * <i>- e.index: index of the selected item</i>
         *
        */
        _selectItem : function(node, userInteraction) {
            _yuitest_coverfunc("build/gallery-itsaselectlist/gallery-itsaselectlist.js", "_selectItem", 284);
_yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 285);
var instance = this,
                previousNode = instance._itemsContainerNode.one('li.'+instance._selectedItemClass),
                nodeHTML;
            _yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 288);
if (!instance.get('disabled') && node && (node !== previousNode)) {
                _yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 289);
if (previousNode) {previousNode.removeClass(instance._selectedItemClass);}
                _yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 290);
node.addClass(instance._selectedItemClass);
                _yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 291);
nodeHTML = node.getHTML();
                _yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 292);
if (instance.get('selectionOnButton')) {instance._selectedMainItemNode.setHTML(nodeHTML);}
                /**
                 * In case of a valuechange, valueChange will be fired. 
                 * No matter whether the change is done by userinteraction, or by a functioncall like selectItem()
                 * @event valueChange
                 * @param {EventFacade} e Event object<br>
                 * <i>- e.element: the selected li-Node<br>
                 * <i>- e.value: returnvalue of the selected item<br>
                 * <i>- e.index: index of the selected item</i>
                */                
                _yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 302);
instance.fire('valueChange', {element: node, value: node.getData('returnValue') || nodeHTML, index: instance._indexOf(node)});
                /**
                 * In case of a valuechange <u>triggered by userinteraction</u>, selectChange will be fired. 
                 * This way you can use functioncalls like selectItem() and prevent double programmaction (which might occur when you listen to the valueChange event)
                 * @event selectChange
                 * @param {EventFacade} e Event object<br>
                 * <i>- e.element: the selected li-Node<br>
                 * <i>- e.value: returnvalue of the selected item<br>
                 * <i>- e.index: index of the selected item</i>
                */                
                _yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 312);
if (userInteraction) {instance.fire('selectChange', {element: node, value: node.getData('returnValue') || nodeHTML, index: instance._indexOf(node)});}
            }
        },

        /**
         * Will hide the listitems.
         * Will also fire a <b>hide event</b>.<br>
         * @method hideListbox
         *
        */
        hideListbox : function() {
            _yuitest_coverfunc("build/gallery-itsaselectlist/gallery-itsaselectlist.js", "hideListbox", 322);
_yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 323);
var instance = this;
            _yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 324);
if (!instance.get('disabled')) {
                /**
                 * In case the listbox is opened, hide-event will be fired. 
                 * @event hide
                 * @param {EventFacade} e Event object<br>
                */                
                _yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 330);
instance.fire('hide');
                _yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 331);
instance._itemsContainerNode.toggleClass(ITSA_CLASSHIDDEN, true);
            }
        },

        /**
         * Will show the listitems.
         * Will also fire a <b>show event</b>.<br>
         * @method showListbox
         *
        */
        showListbox : function() {
            _yuitest_coverfunc("build/gallery-itsaselectlist/gallery-itsaselectlist.js", "showListbox", 341);
_yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 342);
var instance = this;
            _yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 343);
if (!instance.get('disabled')) {
                /**
                 * In case the listbox is opened, show-event will be fired. 
                 * @event show
                 * @param {EventFacade} e Event object<br>
                */                
                _yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 349);
instance.fire('show');
                _yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 350);
instance._itemsContainerNode.toggleClass(ITSA_CLASSHIDDEN, false);
            }
        },

        /**
         * Toggles between shown/hidden listitems.
         *
         * @method _toggleListbox
         * @private
         *
        */
        _toggleListbox : function() {
            _yuitest_coverfunc("build/gallery-itsaselectlist/gallery-itsaselectlist.js", "_toggleListbox", 361);
_yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 362);
var instance = this;
            _yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 363);
if (instance._itemsContainerNode.hasClass(ITSA_CLASSHIDDEN)) {instance.showListbox();}
            else {instance.hideListbox();}
        },

        /**
         * Returns the actual selected listitemnode.<br>
         *
         * @method currentSelected
         * @return {Y.Node} the current selected listitemnode, or null if none is selected.
        */
        currentSelected : function() {
            _yuitest_coverfunc("build/gallery-itsaselectlist/gallery-itsaselectlist.js", "currentSelected", 373);
_yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 374);
return this._itemsContainerNode.one('li.'+this._selectedItemClass);
        },

        /**
         * Returns the index of the actual selected listitemnode.<br>
         *
         * @method currentIndex
         * @return {Int} index of the current selected listitem, or -1 if none is selected.
         *
        */
        currentIndex : function() {
            _yuitest_coverfunc("build/gallery-itsaselectlist/gallery-itsaselectlist.js", "currentIndex", 384);
_yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 385);
return this._indexOf(this.currentSelected());
        },

        /**
         * Returns the index of a listitemnode.<br>
         *
         * @method _indexOf
         * @private
         * @param {Y.Node} node the node to search for.
         * @return {Int} index of a listitem, or -1 if not present.
         *
        */
        _indexOf : function(node) {
            _yuitest_coverfunc("build/gallery-itsaselectlist/gallery-itsaselectlist.js", "_indexOf", 397);
_yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 398);
var nodelist = this._itemsContainerNode.one('.itsa-selectlist-ullist').all('li');
            _yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 399);
return nodelist.indexOf(node);
        },
        
        /**
         * Is called after a disabledchange. Does dis/enable the inner-button element<br>
         *
         * @method _disabledChange
         * @private
         * @param {eventFacade} e passed through by widget.disabledChange event
         *
        */
        _disabledChange : function(e) {
            _yuitest_coverfunc("build/gallery-itsaselectlist/gallery-itsaselectlist.js", "_disabledChange", 410);
_yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 411);
var instance = this;
            _yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 412);
instance.buttonNode.toggleClass('yui3-button-disabled', e.newVal);
            _yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 413);
instance.hideListbox();
        },

        /**
         * Cleaning up all eventhandlers created by bindUI(). Is called by the destructor.<br>
         *
         * @method _clearMemory
         * @private
         *
        */
        _clearMemory : function() {
            _yuitest_coverfunc("build/gallery-itsaselectlist/gallery-itsaselectlist.js", "_clearMemory", 423);
_yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 424);
var instance = this;
            _yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 425);
Y.Array.each(
                instance._eventhandlers,
                function(item, index, array){
                    _yuitest_coverfunc("build/gallery-itsaselectlist/gallery-itsaselectlist.js", "(anonymous 2)", 427);
_yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 428);
item.detach();
                }    
            );
        },

        /**
         * Cleaning up.
         *
         * @protected
         * @method destructor
         *
        */
        destructor : function() {
            _yuitest_coverfunc("build/gallery-itsaselectlist/gallery-itsaselectlist.js", "destructor", 440);
_yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 441);
this._clearMemory();
        }

    }, {
        ATTRS : {

            /**
             * @description The size of the buttons<br>
             * Should be a value 1, 2 or 3 (the higher, the bigger the buttonsize)<br>
             * Default = 2
             * @attribute btnSize
             * @type int
            */
            btnSize : {
                value: 3,
                validator: function(val) {
                    _yuitest_coverfunc("build/gallery-itsaselectlist/gallery-itsaselectlist.js", "validator", 456);
_yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 457);
return (Lang.isNumber(val) && (val>0) && (val<4));
                }
            },

            /**
             * @description Defines the defaultbuttontext when a softMatch with no hit has taken place.<br>
             * See <i>selectItem()</i> how to use a softMatch.<br>
             * Default = 'choose...'
             * @attribute defaultButtonText
             * @type String Default='choose...'
            */
            defaultButtonText : {
                value: 'choose...',
                validator: function(val) {
                    _yuitest_coverfunc("build/gallery-itsaselectlist/gallery-itsaselectlist.js", "validator", 470);
_yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 471);
return Y.Lang.isString(val);
                }
            },

            /**
             * @description Defines the buttonWidth<br>
             * Default = null, which means automaticly sizeing.
             * @attribute buttonWidth
             * @type Int
            */
            buttonWidth: {
                value: null,
                validator: function(val) {
                    _yuitest_coverfunc("build/gallery-itsaselectlist/gallery-itsaselectlist.js", "validator", 483);
_yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 484);
return (Y.Lang.isNumber(val) && (val>=0));
                }
            },

            /**
             * @description Defines the width of the listbox.<br>
             * Default = null, which means automaticly sizeing.
             * @attribute listWidth
             * @type Int
            */
            listWidth: {
                value: null,
                validator: function(val) {
                    _yuitest_coverfunc("build/gallery-itsaselectlist/gallery-itsaselectlist.js", "validator", 496);
_yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 497);
return (Y.Lang.isNumber(val) && (val>=0));
                }
            },

            /**
             * @description Whether the listitems should be aligned left or right.
             * Default = true.
             * @attribute listAlignLeft
             * @type Boolean
            */
            listAlignLeft : {
                value: true,
                validator: function(val) {
                    _yuitest_coverfunc("build/gallery-itsaselectlist/gallery-itsaselectlist.js", "validator", 509);
_yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 510);
return Y.Lang.isBoolean(val);
                }
            },

            /**
             * @description Additional className that can be added to the boundingBox
             * @attribute className
             * @type String
            */
            className : {
                value: null,
                validator: function(val) {
                    _yuitest_coverfunc("build/gallery-itsaselectlist/gallery-itsaselectlist.js", "validator", 521);
_yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 522);
return Y.Lang.isString(val);
                }
            },

            /**
             * @description Additional className that can be added to the selected text on the Button
             * @attribute iconClassName
             * @type String
            */
            iconClassName : {
                value: null,
                validator: function(val) {
                    _yuitest_coverfunc("build/gallery-itsaselectlist/gallery-itsaselectlist.js", "validator", 533);
_yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 534);
return Y.Lang.isString(val);
                }
            },

            /**
             * @description Listitems in the selectbox
             * @attribute items
             * @type Array (String | Int | Object)  in case of Object, the object should have the fields: <i>o.text</i> and <i>o.returnValue</i>
            */
            items : {
                value: [],
                validator: function(val) {
                    _yuitest_coverfunc("build/gallery-itsaselectlist/gallery-itsaselectlist.js", "validator", 545);
_yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 546);
return Y.Lang.isArray(val);
                },
                setter: function(val) {
                    _yuitest_coverfunc("build/gallery-itsaselectlist/gallery-itsaselectlist.js", "setter", 548);
_yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 549);
var instance = this,
                        item,
                        i;
                    _yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 552);
instance._itemValues = [];
                    _yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 553);
for (i=0; i<val.length; i++) {
                        _yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 554);
item = val[i];
                        // Make sure to fill the array with Strings. User might supply other types like numbers: you don't want to miss the hit when you search the array by value.
                        _yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 556);
instance._itemValues.push(item.returnValue ? item.returnValue.toString().toLowerCase() : item.toString().toLowerCase());
                    }
                    // only call syncUI when items are change after rendering
                    _yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 559);
if (this._syncWithinSetterItems) {this.syncUI();}
                    _yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 560);
return val;
                }
            },

            /**
             * @description The default listitem to be selected during rendering.<br>
             * Default = null
             * @attribute defaultItem
             * @type String
            */
            defaultItem : {
                value: null,
                validator: function(val) {
                    _yuitest_coverfunc("build/gallery-itsaselectlist/gallery-itsaselectlist.js", "validator", 572);
_yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 573);
return Y.Lang.isString(val);
                }
            },

            /**
             * @description Whether the selection should be displayed on the button.<br>
             * This is normal behaviour. Although in some cases you might not want this. For example when simulating a menubutton with static text and a dropdown with subbuttons<br>
             * Default = true<br>
             * When set to false, the buttontext will always remains the Attribute: <b>defaultButtonText</b>
             * @attribute selectionOnButton
             * @type Boolean
            */
            selectionOnButton : {
                value: true,
                validator: function(val) {
                    _yuitest_coverfunc("build/gallery-itsaselectlist/gallery-itsaselectlist.js", "validator", 587);
_yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 588);
return Y.Lang.isBoolean(val);
                }
            },

            /**
             * @description Determines whether to show the selected item in the selectlist, or if it should disappear from the selectlist when selected.<br>
             * Default = false.
             * @attribute hideSelected
             * @type Boolean
            */
            hideSelected : {
                value: false,
                validator: function(val) {
                    _yuitest_coverfunc("build/gallery-itsaselectlist/gallery-itsaselectlist.js", "validator", 600);
_yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 601);
return Y.Lang.isBoolean(val);
                },
                setter: function(val) {
                    _yuitest_coverfunc("build/gallery-itsaselectlist/gallery-itsaselectlist.js", "setter", 603);
_yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 604);
var instance = this;
                    _yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 605);
instance._selectedItemClass = val ? ITSA_CLASSHIDDEN : 'itsa-selectlist-selected';
                    _yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 606);
return val;
                }
            }
        },

        HTML_PARSER: {

            defaultItem: function (srcNode) {
                _yuitest_coverfunc("build/gallery-itsaselectlist/gallery-itsaselectlist.js", "defaultItem", 613);
_yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 614);
var options = srcNode.all('option'),
                    selected = null;
                _yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 616);
options.each(
                    function(node, index, nodelist) {
                        _yuitest_coverfunc("build/gallery-itsaselectlist/gallery-itsaselectlist.js", "(anonymous 3)", 617);
_yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 618);
if (!selected && (node.getAttribute('selected')==='selected')) {
                            _yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 619);
selected = node.getHTML();
                        }
                    }
                );
                _yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 623);
return selected; 
            },

            items: function(srcNode) {
                _yuitest_coverfunc("build/gallery-itsaselectlist/gallery-itsaselectlist.js", "items", 626);
_yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 627);
var options = srcNode.all('option'),
                    allItems = [];
                _yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 629);
options.each(
                    function(node, index, nodelist) {
                        _yuitest_coverfunc("build/gallery-itsaselectlist/gallery-itsaselectlist.js", "(anonymous 4)", 630);
_yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 631);
allItems.push(
                            {
                                text: node.getHTML(),
                                returnValue: node.getAttribute('value') || node.getHTML()
                            }
                        );
                    }
                );
                _yuitest_coverline("build/gallery-itsaselectlist/gallery-itsaselectlist.js", 639);
return allItems;
            }
        }

    }
);

}, '@VERSION@', {
    "supersedes": [
        ""
    ],
    "skinnable": "true",
    "requires": [
        "base-build",
        "widget",
        "node-base",
        "cssbutton",
        "event-base",
        "node-event-delegate",
        "event-outside"
    ],
    "optional": [
        ""
    ]
});
