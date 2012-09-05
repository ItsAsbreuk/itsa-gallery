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
_yuitest_coverage["/build/gallery-itsaselectlist/gallery-itsaselectlist.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "/build/gallery-itsaselectlist/gallery-itsaselectlist.js",
    code: []
};
_yuitest_coverage["/build/gallery-itsaselectlist/gallery-itsaselectlist.js"].code=["YUI.add('gallery-itsaselectlist', function(Y) {","","'use strict';","","/**"," * The Itsa Selectlist module."," *"," * @module itsa-selectlist"," */","","","/**"," *"," * @class ITSASelectlist"," * @constructor"," *"," * <i>Copyright (c) 2012 Marco Asbreuk - http://theinternetwizard.net</i>"," * YUI BSD License - http://developer.yahoo.com/yui/license.html"," *","*/","","// Local constants","var Lang = Y.Lang,","    Node = Y.Node,","    IE = Y.UA.ie,","    ITSA_CLASSHIDDEN = 'itsa-hidden',","    ITSA_SHIM_TEMPLATE_TITLE = \"Selectlist Shim\",","    ITSA_SHIM_TEMPLATE = '<iframe frameborder=\"0\" tabindex=\"-1\" class=\"itsa-shim\" title=\"' + ITSA_SHIM_TEMPLATE_TITLE + '\" src=\"javascript:false;\"></iframe>',","    ITSA_SELECTEDMAIN_TEMPLATE = \"<span class='itsa-selectlist-selectedmain' unselectable='on'></span>\",","    ITSA_BUTTON_TEMPLATE = \"<button class='yui3-button'></button>\",","    ITSA_DOWNBUTTON_TEMPLATE = \"<span class='itsa-button-icon itsa-icon-selectdown'></span>\",","    ITSA_SELECTBOX_TEMPLATE = \"<div class='itsa-selectlist-basediv \" + ITSA_CLASSHIDDEN + \"'><div class='itsa-selectlist-scrolldiv'><ul class='itsa-selectlist-ullist'></ul></div></div>\";","","Y.ITSASelectList = Y.Base.create('itsaselectlist', Y.Widget, [], {","","","// -- Public Static Properties -------------------------------------------------","","/**"," * Reference to the editor's instance"," * @property buttonNode"," * @type Y.EditorBase instance"," */","","/**"," * Reference to the Y-instance of the host-editor"," * @private"," * @property _selectedMainItemNode"," * @type YUI-instance"," */","","/**"," * Reference to the editor's iframe-node"," * @private"," * @property _selectedItemClass"," * @type Y.Node"," */","","/**"," * Reference to the editor's container-node, in which the host-editor is rendered.<br>"," * This is in fact editorNode.get('parentNode')"," * @private"," * @property _itemsContainerNode"," * @type Y.Node"," */","","/**"," * Reference to the toolbar-node"," * @private"," * @property _itemValues"," * @type Y.Node"," */","","/**"," * Reference to the toolbar-node"," * @private"," * @property _syncWithinSetterItems"," * @type Y.Node"," */","","        buttonNode : null,","        _selectedMainItemNode : null,","        _selectedItemClass : null,","        _itemsContainerNode : null,","        _itemValues : null, // for internal use: listitems, transformed to String, so we can use selectItemByValue","        _syncWithinSetterItems : false, // no items.setter.syncUI during initializing","","","        /**","         * Sets up the selectlist during initialisation.","         *","         * @method initializer","         * @param {Object} config The config-object.","         * @protected","        */","        initializer : function(config) {","            var instance = this;","            instance._selectedItemClass = instance.get('hideSelected') ? ITSA_CLASSHIDDEN : 'itsa-selectlist-selected';","        },","","        /**","         * Widget's renderUI-method. Creates the Selectlist in the DOM.","         *","         * @method renderUI ","        */","        renderUI : function() {","            var instance = this,","                contentBox = instance.get('contentBox'), ","                boundingBox = instance.get('boundingBox'),","                className = instance.get('className'),","                iconClassName = instance.get('iconClassName'),","                buttonWidth = instance.get('buttonWidth'),","                listWidth = instance.get('listWidth'),","                btnSize = instance.get('btnSize'),","                items;","            if ((IE>0) && (IE<7)) {boundingBox.append(instance.SHIM_TEMPLATE);}","            instance.buttonNode = Y.Node.create(ITSA_BUTTON_TEMPLATE);","            contentBox.append(instance.buttonNode);","            instance.buttonNode.setHTML(ITSA_DOWNBUTTON_TEMPLATE);","            instance._selectedMainItemNode = Y.Node.create(ITSA_SELECTEDMAIN_TEMPLATE);","            instance.buttonNode.append(instance._selectedMainItemNode);","            instance._itemsContainerNode = Y.Node.create(ITSA_SELECTBOX_TEMPLATE);","            instance.get('listAlignLeft') ? boundingBox.addClass('itsa-leftalign') : boundingBox.addClass('itsa-rightalign');","            if (className) {boundingBox.addClass(className);}","            if (iconClassName) {","                instance._selectedMainItemNode.addClass('itsa-button-icon');","                instance._selectedMainItemNode.addClass(iconClassName);","            }","            // must set minWidth instead of width in case of button: otherwise the 2 spans might be positioned underneath each other","            if (buttonWidth) {instance.buttonNode.setStyle('minWidth', buttonWidth+'px');}","            if (listWidth) {instance._itemsContainerNode.setStyle('width', listWidth+'px');}","            if (btnSize===1) {boundingBox.addClass('itsa-buttonsize-small');}","            else {if (btnSize===2) {boundingBox.addClass('itsa-buttonsize-medium');}}","            contentBox.append(instance._itemsContainerNode);","        },","","        /**","         * Widget's bindUI-method. Binds onclick and clickoutside-events","         *","         * @method bindUI ","        */","        bindUI : function() {","            var instance = this,","                boundingBox = instance.get('boundingBox');","            boundingBox.on('click', instance._toggleListbox, instance);","            boundingBox.on('clickoutside', instance.hideListbox, instance);","            instance._itemsContainerNode.delegate('click', instance._itemClick, 'li', instance);","        },","","        /**","         *  Widget's syncUI-method. Renders the selectlist items","         *","         * @method syncUI","        */","        syncUI : function() {","            var instance = this,","                contentBox = instance.get('contentBox'),","                items = instance.get('items'),","                defaultItem = instance.get('defaultItem'),","                ullist = instance._itemsContainerNode.one('.itsa-selectlist-ullist'),","                i, ","                item,","                itemText,","                isDefaultItem,","                defaultItemFound,","                newNode;","            ullist.setHTML(''); // clear content","            if (items.length>0) {","                for (i=0; i<items.length; i++) {","                    item = items[i];","                    itemText = Lang.isString(item) ? itemText = item : itemText = item.text;","                    isDefaultItem = (itemText===defaultItem);","                    if (isDefaultItem) {defaultItemFound = true;}","                    newNode = Y.Node.create('<li' + ((isDefaultItem) ? ' class=\"' + instance._selectedItemClass + '\"' : '') + '>' + itemText +'</li>');","                    if (item.returnValue) {newNode.setData('returnValue', item.returnValue);}","                    ullist.append(newNode);","                }","                instance._selectedMainItemNode.setHTML(defaultItemFound ? defaultItem : instance.get('defaultButtonText'));","            }","            instance._syncWithinSetterItems = true;","        },","","        /**","         * Internal function that will be called when a user changes the selected item","         *","         * @method _itemClick","         * @private","         * @param {EventFacade} e with e.currentTarget as the selected li-Node","         * @return {eventFacade} Fires a valueChange, or selectChange event.<br>","         * <i>- e.currentTarget: the selected li-Node<br>","         * <i>- e.value: returnvalue of the selected item<br>","         * <i>- e.index: index of the selected item</i>","         * ","        */","        _itemClick : function(e) {","            this._selectItem(e.currentTarget, true);","        },","","        /**","         * Selects the items at a specified index.<br>","         * When softMatch is set to true, the selected value will return to the default, even when there is no match.<br>","         * When softMatch is false, or not specified, there has to be a match in order to change.","         *","         * @method selectItem","         * @param {Int} index index to be selected","         * @param {Boolean} [softMatch] Optional. When set to true will always make a selectchange, even when the index is out of bound","         * @param {String} [softButtonText] Optional. Text to be appeared on the button in case softMatch is true and there is no match. When not specified, the attribute <i>defaultButtonText</i> will be used","         * @return {eventFacade} Fires a valueChange, NO selectChange event, because there is no userinteraction.<br>","         * <i>- e.currentTarget: the selected li-Node<br>","         * <i>- e.value: returnvalue of the selected item<br>","         * <i>- e.index: index of the selected item</i>","         * ","        */","        selectItem : function(index, softMatch, softButtonText) {","            var instance = this,","                nodelist = instance._itemsContainerNode.all('li');","            if ((index>=0) && (index<nodelist.size())) {instance._selectItem(nodelist.item(index));}","            else {","                // no hit: return to default without selection in case of softMatch","                if (softMatch) {","                    nodelist.removeClass(instance._selectedItemClass);","                    instance._selectedMainItemNode.setHTML(softButtonText ? softButtonText : instance.get('defaultButtonText'));","                }","            }","        },","","        /**","         * Selects the items based on the listvalue.<br>","         * When softMatch is set to true, the selected value will return to the default, even when there is no match.<br>","         * When softMatch is false, or not specified, there has to be a match in order to change.","         *","         * @method selectItemByValue","         * @param {String} itemText listitem to be selected","         * @param {Boolean} [softMatch] Optional. When set to true will always make a selectchange, even when the listitem is not available","         * @param {Boolean} [defaultButtonText] Optional. Whether to use the attribute <i>defaultButtonText</i> in case softMatch is true and there is no match. When set to false, <i>itemText</i> will be used when there is no match.","         * @return {eventFacade} Fires a valueChange, NO selectChange event, because there is no userinteraction.<br>","         * <i>- e.currentTarget: the selected li-Node<br>","         * <i>- e.value: returnvalue of the selected item<br>","         * <i>- e.index: index of the selected item</i>","         *","        */","        selectItemByValue : function(itemText, softMatch, defaultButtonText) {","            // by returnvalue ","            var instance = this,","                index = Y.Array.indexOf(instance._itemValues, itemText.toString().toLowerCase());","            instance.selectItem(index, softMatch, defaultButtonText ? instance.get('defaultButtonText') : itemText);","        },","","        /**","         * Does the final itemselection based on the listnode.<br>","         * Will always fire a <b>valueChange event</b>.<br>","         * Will fire a <b>selectChange event</b> only when <i>userInteraction</i> is set to true. ","         *","         * @method _selectItem","         * @private","         * @param {Y.Node} node listitem to be selected","         * @param {Boolean} userInteraction Specifies whether the selection is made by userinteraction, or by functioncall.<br>","         * In case of userinteraction,  selectChange will also be fired.","         * @return {eventFacade} Not returnvalue, but event, fired by valueChange, or selectChange.<br>","         * <i>- e.currentTarget: the selected li-Node<br>","         * <i>- e.value: returnvalue of the selected item<br>","         * <i>- e.index: index of the selected item</i>","         *","        */","        _selectItem : function(node, userInteraction) {","            var instance = this,","                previousNode = instance._itemsContainerNode.one('li.'+instance._selectedItemClass),","                nodeHTML;","            if (node && (node !== previousNode)) {","                if (previousNode) {previousNode.removeClass(instance._selectedItemClass);}","                node.addClass(instance._selectedItemClass);","                nodeHTML = node.getHTML();","                instance._selectedMainItemNode.setHTML(nodeHTML);","                /**","                 * In case of a valuechange, valueChange will be fired. ","                 * No matter whether the change is done by userinteraction, or by a functioncall like selectItem()","                 * @event valueChange","                 * @param {EventFacade} e Event object","                */                ","                instance.fire('valueChange', {currentTarget: instance, value: node.getData('returnValue') || nodeHTML, index: instance._indexOf(node)});","                /**","                 * In case of a valuechange <u>triggered by userinteraction</u>, selectChange will be fired. ","                 * This way you can use functioncalls like selectItem() and prevent double programmaction (which might occur when you listen to the valueChange event)","                 * @event selectChange","                 * @param {EventFacade} e Event object","                */                ","                if (userInteraction) {instance.fire('selectChange', {currentTarget: instance, value: node.getData('returnValue') || nodeHTML, index: instance._indexOf(node)});}","            }","        },","","        /**","         * Will hide the listitems.","         * @method hideListbox","         *","        */","        hideListbox : function() {","            this._itemsContainerNode.toggleClass(ITSA_CLASSHIDDEN, true);","        },","","        /**","         * Will show the listitems.","         * @method showListbox","         *","        */","        showListbox : function() {","            this._itemsContainerNode.toggleClass(ITSA_CLASSHIDDEN, false);","        },","","        /**","         * Toggles between shown/hidden listitems.","         *","         * @method _toggleListbox","         * @private","         *","        */","        _toggleListbox : function() {","            this._itemsContainerNode.toggleClass(ITSA_CLASSHIDDEN);","        },","","        /**","         * Returns the actual selected listitemnode.<br>","         *","         * @method currentSelected","         * @return {Y.Node} the current selected listitemnode, or null if none is selected.","        */","        currentSelected : function() {","            return this._itemsContainerNode.one('li.'+this._selectedItemClass);","        },","","        /**","         * Returns the index of the actual selected listitemnode.<br>","         *","         * @method currentIndex","         * @return {Int} index of the current selected listitem, or -1 if none is selected.","         *","        */","        currentIndex : function() {","            return this._indexOf(this.currentSelected());","        },","","        /**","         * Returns the index of a listitemnode.<br>","         *","         * @method _indexOf","         * @private","         * @param {Y.Node} node the node to search for.","         * @return {Int} index of a listitem, or -1 if not present.","         *","        */","        _indexOf : function(node) {","            var nodelist = this._itemsContainerNode.one('.itsa-selectlist-ullist').all('li');","            return nodelist.indexOf(node);","        },","","        /**","         * Cleaning up.","         *","         * @protected","         * @method destructor","         *","        */","        destructor : function() {","            // I don't quite understand: If I'm right then Widget's standard destructor cannot do a deep-destroy to clean up","            this.get('contentBox').empty();","        }","","    }, {","        ATTRS : {","","            /**","             * @description The size of the buttons<br>","             * Should be a value 1, 2 or 3 (the higher, the bigger the buttonsize)<br>","             * Default = 2","             * @attribute btnSize","             * @type int","            */","            btnSize : {","                value: 3,","                validator: function(val) {","                    return (Lang.isNumber(val) && (val>0) && (val<4));","                }","            },","","            /**","             * @description Defines the defaultbuttontext when a softMatch with no hit has taken place.<br>","             * See <i>selectItem()</i> how to use a softMatch.<br>","             * Default = 'choose...'","             * @attribute defaultButtonText","             * @type String Default='choose...'","            */","            defaultButtonText : {","                value: 'choose...',","                validator: function(val) {","                    return Y.Lang.isString(val);","                }","            },","","            /**","             * @description Defines the buttonWidth<br>","             * Default = null, which means automaticly sizeing.","             * @attribute buttonWidth","             * @type Int","            */","            buttonWidth: {","                value: null,","                validator: function(val) {","                    return (Y.Lang.isNumber(val) && (val>=0));","                }","            },","","            /**","             * @description Defines the width of the listbox.<br>","             * Default = null, which means automaticly sizeing.","             * @attribute listWidth","             * @type Int","            */","            listWidth: {","                value: null,","                validator: function(val) {","                    return (Y.Lang.isNumber(val) && (val>=0));","                }","            },","","            /**","             * @description Whether the listitems should be aligned left or right.","             * Default = true.","             * @attribute listAlignLeft","             * @type Boolean","            */","            listAlignLeft : {","                value: true,","                validator: function(val) {","                    return Y.Lang.isBoolean(val);","                }","            },","","            /**","             * @description Additional className that can be added to the boundingBox","             * @attribute className","             * @type String","            */","            className : {","                value: null,","                validator: function(val) {","                    return Y.Lang.isString(val);","                }","            },","","            /**","             * @description Additional className that can be added to the selected text on the Button","             * @attribute iconClassName","             * @type String","            */","            iconClassName : {","                value: null,","                validator: function(val) {","                    return Y.Lang.isString(val);","                }","            },","","            /**","             * @description Listitems in the selectbox","             * @attribute items","             * @type Array of (String or Int)","            */","            items : {","                value: [],","                validator: function(val) {","                    return Y.Lang.isArray(val);","                },","                setter: function(val) {","                    var instance = this,","                        transformHandlebars = Lang.isString(instance.get('handleBars')),","                        item,","                        i;","                    instance._itemValues = [];","                    for (i=0; i<val.length; i++) {","                        item = val[i];","                        // Make sure to fill the array with Strings. User might supply other types like numbers: you don't want to miss the hit when you search the array by value.","                        instance._itemValues.push(item.returnValue ? item.returnValue.toString().toLowerCase() : item.toString().toLowerCase());","                    }","                    // only call syncUI when items are change after rendering","                    if (this._syncWithinSetterItems) {this.syncUI();}","                    return val;","                }","            },","","            /**","             * @description The default listitem to be selected during rendering.<br>","             * Default = null","             * @attribute defaultItem","             * @type String","            */","            defaultItem : {","                value: null,","                validator: function(val) {","                    return Y.Lang.isString(val);","                }","            },","","            /**","             * @description Determines whether to show the selected item in the selectlist, or if it should disappear from the selectlist when selected.<br>","             * Default = false.","             * @attribute hideSelected","             * @type Boolean","            */","            hideSelected : {","                value: false,","                validator: function(val) {","                    return Y.Lang.isBoolean(val);","                },","                setter: function(val) {","                    var instance = this;","                    instance._selectedItemClass = val ? ITSA_CLASSHIDDEN : 'itsa-selectlist-selected';","                    return val;","                }","            }","        }","    }",");","","","}, '@VERSION@' ,{requires:['widget-base', 'node-base', 'event-base', 'event-delegate', 'event-outside', 'event-custom'], skinnable:true});"];
_yuitest_coverage["/build/gallery-itsaselectlist/gallery-itsaselectlist.js"].lines = {"1":0,"3":0,"23":0,"34":0,"97":0,"98":0,"107":0,"116":0,"117":0,"118":0,"119":0,"120":0,"121":0,"122":0,"123":0,"124":0,"125":0,"126":0,"127":0,"130":0,"131":0,"132":0,"134":0,"143":0,"145":0,"146":0,"147":0,"156":0,"167":0,"168":0,"169":0,"170":0,"171":0,"172":0,"173":0,"174":0,"175":0,"176":0,"178":0,"180":0,"196":0,"215":0,"217":0,"220":0,"221":0,"222":0,"244":0,"246":0,"266":0,"269":0,"270":0,"271":0,"272":0,"273":0,"280":0,"287":0,"297":0,"306":0,"317":0,"327":0,"338":0,"351":0,"352":0,"364":0,"380":0,"394":0,"407":0,"420":0,"433":0,"445":0,"457":0,"469":0,"472":0,"476":0,"477":0,"478":0,"480":0,"483":0,"484":0,"497":0,"510":0,"513":0,"514":0,"515":0};
_yuitest_coverage["/build/gallery-itsaselectlist/gallery-itsaselectlist.js"].functions = {"initializer:96":0,"renderUI:106":0,"bindUI:142":0,"syncUI:155":0,"_itemClick:195":0,"selectItem:214":0,"selectItemByValue:242":0,"_selectItem:265":0,"hideListbox:296":0,"showListbox:305":0,"_toggleListbox:316":0,"currentSelected:326":0,"currentIndex:337":0,"_indexOf:350":0,"destructor:362":0,"validator:379":0,"validator:393":0,"validator:406":0,"validator:419":0,"validator:432":0,"validator:444":0,"validator:456":0,"validator:468":0,"setter:471":0,"validator:496":0,"validator:509":0,"setter:512":0,"(anonymous 1):1":0};
_yuitest_coverage["/build/gallery-itsaselectlist/gallery-itsaselectlist.js"].coveredLines = 84;
_yuitest_coverage["/build/gallery-itsaselectlist/gallery-itsaselectlist.js"].coveredFunctions = 28;
_yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 1);
YUI.add('gallery-itsaselectlist', function(Y) {

_yuitest_coverfunc("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", "(anonymous 1)", 1);
_yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 3);
'use strict';

/**
 * The Itsa Selectlist module.
 *
 * @module itsa-selectlist
 */


/**
 *
 * @class ITSASelectlist
 * @constructor
 *
 * <i>Copyright (c) 2012 Marco Asbreuk - http://theinternetwizard.net</i>
 * YUI BSD License - http://developer.yahoo.com/yui/license.html
 *
*/

// Local constants
_yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 23);
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

_yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 34);
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

        buttonNode : null,
        _selectedMainItemNode : null,
        _selectedItemClass : null,
        _itemsContainerNode : null,
        _itemValues : null, // for internal use: listitems, transformed to String, so we can use selectItemByValue
        _syncWithinSetterItems : false, // no items.setter.syncUI during initializing


        /**
         * Sets up the selectlist during initialisation.
         *
         * @method initializer
         * @param {Object} config The config-object.
         * @protected
        */
        initializer : function(config) {
            _yuitest_coverfunc("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", "initializer", 96);
_yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 97);
var instance = this;
            _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 98);
instance._selectedItemClass = instance.get('hideSelected') ? ITSA_CLASSHIDDEN : 'itsa-selectlist-selected';
        },

        /**
         * Widget's renderUI-method. Creates the Selectlist in the DOM.
         *
         * @method renderUI 
        */
        renderUI : function() {
            _yuitest_coverfunc("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", "renderUI", 106);
_yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 107);
var instance = this,
                contentBox = instance.get('contentBox'), 
                boundingBox = instance.get('boundingBox'),
                className = instance.get('className'),
                iconClassName = instance.get('iconClassName'),
                buttonWidth = instance.get('buttonWidth'),
                listWidth = instance.get('listWidth'),
                btnSize = instance.get('btnSize'),
                items;
            _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 116);
if ((IE>0) && (IE<7)) {boundingBox.append(instance.SHIM_TEMPLATE);}
            _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 117);
instance.buttonNode = Y.Node.create(ITSA_BUTTON_TEMPLATE);
            _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 118);
contentBox.append(instance.buttonNode);
            _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 119);
instance.buttonNode.setHTML(ITSA_DOWNBUTTON_TEMPLATE);
            _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 120);
instance._selectedMainItemNode = Y.Node.create(ITSA_SELECTEDMAIN_TEMPLATE);
            _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 121);
instance.buttonNode.append(instance._selectedMainItemNode);
            _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 122);
instance._itemsContainerNode = Y.Node.create(ITSA_SELECTBOX_TEMPLATE);
            _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 123);
instance.get('listAlignLeft') ? boundingBox.addClass('itsa-leftalign') : boundingBox.addClass('itsa-rightalign');
            _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 124);
if (className) {boundingBox.addClass(className);}
            _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 125);
if (iconClassName) {
                _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 126);
instance._selectedMainItemNode.addClass('itsa-button-icon');
                _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 127);
instance._selectedMainItemNode.addClass(iconClassName);
            }
            // must set minWidth instead of width in case of button: otherwise the 2 spans might be positioned underneath each other
            _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 130);
if (buttonWidth) {instance.buttonNode.setStyle('minWidth', buttonWidth+'px');}
            _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 131);
if (listWidth) {instance._itemsContainerNode.setStyle('width', listWidth+'px');}
            _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 132);
if (btnSize===1) {boundingBox.addClass('itsa-buttonsize-small');}
            else {if (btnSize===2) {boundingBox.addClass('itsa-buttonsize-medium');}}
            _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 134);
contentBox.append(instance._itemsContainerNode);
        },

        /**
         * Widget's bindUI-method. Binds onclick and clickoutside-events
         *
         * @method bindUI 
        */
        bindUI : function() {
            _yuitest_coverfunc("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", "bindUI", 142);
_yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 143);
var instance = this,
                boundingBox = instance.get('boundingBox');
            _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 145);
boundingBox.on('click', instance._toggleListbox, instance);
            _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 146);
boundingBox.on('clickoutside', instance.hideListbox, instance);
            _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 147);
instance._itemsContainerNode.delegate('click', instance._itemClick, 'li', instance);
        },

        /**
         *  Widget's syncUI-method. Renders the selectlist items
         *
         * @method syncUI
        */
        syncUI : function() {
            _yuitest_coverfunc("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", "syncUI", 155);
_yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 156);
var instance = this,
                contentBox = instance.get('contentBox'),
                items = instance.get('items'),
                defaultItem = instance.get('defaultItem'),
                ullist = instance._itemsContainerNode.one('.itsa-selectlist-ullist'),
                i, 
                item,
                itemText,
                isDefaultItem,
                defaultItemFound,
                newNode;
            _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 167);
ullist.setHTML(''); // clear content
            _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 168);
if (items.length>0) {
                _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 169);
for (i=0; i<items.length; i++) {
                    _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 170);
item = items[i];
                    _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 171);
itemText = Lang.isString(item) ? itemText = item : itemText = item.text;
                    _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 172);
isDefaultItem = (itemText===defaultItem);
                    _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 173);
if (isDefaultItem) {defaultItemFound = true;}
                    _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 174);
newNode = Y.Node.create('<li' + ((isDefaultItem) ? ' class="' + instance._selectedItemClass + '"' : '') + '>' + itemText +'</li>');
                    _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 175);
if (item.returnValue) {newNode.setData('returnValue', item.returnValue);}
                    _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 176);
ullist.append(newNode);
                }
                _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 178);
instance._selectedMainItemNode.setHTML(defaultItemFound ? defaultItem : instance.get('defaultButtonText'));
            }
            _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 180);
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
            _yuitest_coverfunc("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", "_itemClick", 195);
_yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 196);
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
            _yuitest_coverfunc("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", "selectItem", 214);
_yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 215);
var instance = this,
                nodelist = instance._itemsContainerNode.all('li');
            _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 217);
if ((index>=0) && (index<nodelist.size())) {instance._selectItem(nodelist.item(index));}
            else {
                // no hit: return to default without selection in case of softMatch
                _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 220);
if (softMatch) {
                    _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 221);
nodelist.removeClass(instance._selectedItemClass);
                    _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 222);
instance._selectedMainItemNode.setHTML(softButtonText ? softButtonText : instance.get('defaultButtonText'));
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
            _yuitest_coverfunc("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", "selectItemByValue", 242);
_yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 244);
var instance = this,
                index = Y.Array.indexOf(instance._itemValues, itemText.toString().toLowerCase());
            _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 246);
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
            _yuitest_coverfunc("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", "_selectItem", 265);
_yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 266);
var instance = this,
                previousNode = instance._itemsContainerNode.one('li.'+instance._selectedItemClass),
                nodeHTML;
            _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 269);
if (node && (node !== previousNode)) {
                _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 270);
if (previousNode) {previousNode.removeClass(instance._selectedItemClass);}
                _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 271);
node.addClass(instance._selectedItemClass);
                _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 272);
nodeHTML = node.getHTML();
                _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 273);
instance._selectedMainItemNode.setHTML(nodeHTML);
                /**
                 * In case of a valuechange, valueChange will be fired. 
                 * No matter whether the change is done by userinteraction, or by a functioncall like selectItem()
                 * @event valueChange
                 * @param {EventFacade} e Event object
                */                
                _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 280);
instance.fire('valueChange', {currentTarget: instance, value: node.getData('returnValue') || nodeHTML, index: instance._indexOf(node)});
                /**
                 * In case of a valuechange <u>triggered by userinteraction</u>, selectChange will be fired. 
                 * This way you can use functioncalls like selectItem() and prevent double programmaction (which might occur when you listen to the valueChange event)
                 * @event selectChange
                 * @param {EventFacade} e Event object
                */                
                _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 287);
if (userInteraction) {instance.fire('selectChange', {currentTarget: instance, value: node.getData('returnValue') || nodeHTML, index: instance._indexOf(node)});}
            }
        },

        /**
         * Will hide the listitems.
         * @method hideListbox
         *
        */
        hideListbox : function() {
            _yuitest_coverfunc("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", "hideListbox", 296);
_yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 297);
this._itemsContainerNode.toggleClass(ITSA_CLASSHIDDEN, true);
        },

        /**
         * Will show the listitems.
         * @method showListbox
         *
        */
        showListbox : function() {
            _yuitest_coverfunc("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", "showListbox", 305);
_yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 306);
this._itemsContainerNode.toggleClass(ITSA_CLASSHIDDEN, false);
        },

        /**
         * Toggles between shown/hidden listitems.
         *
         * @method _toggleListbox
         * @private
         *
        */
        _toggleListbox : function() {
            _yuitest_coverfunc("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", "_toggleListbox", 316);
_yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 317);
this._itemsContainerNode.toggleClass(ITSA_CLASSHIDDEN);
        },

        /**
         * Returns the actual selected listitemnode.<br>
         *
         * @method currentSelected
         * @return {Y.Node} the current selected listitemnode, or null if none is selected.
        */
        currentSelected : function() {
            _yuitest_coverfunc("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", "currentSelected", 326);
_yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 327);
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
            _yuitest_coverfunc("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", "currentIndex", 337);
_yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 338);
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
            _yuitest_coverfunc("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", "_indexOf", 350);
_yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 351);
var nodelist = this._itemsContainerNode.one('.itsa-selectlist-ullist').all('li');
            _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 352);
return nodelist.indexOf(node);
        },

        /**
         * Cleaning up.
         *
         * @protected
         * @method destructor
         *
        */
        destructor : function() {
            // I don't quite understand: If I'm right then Widget's standard destructor cannot do a deep-destroy to clean up
            _yuitest_coverfunc("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", "destructor", 362);
_yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 364);
this.get('contentBox').empty();
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
                    _yuitest_coverfunc("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", "validator", 379);
_yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 380);
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
                    _yuitest_coverfunc("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", "validator", 393);
_yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 394);
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
                    _yuitest_coverfunc("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", "validator", 406);
_yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 407);
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
                    _yuitest_coverfunc("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", "validator", 419);
_yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 420);
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
                    _yuitest_coverfunc("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", "validator", 432);
_yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 433);
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
                    _yuitest_coverfunc("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", "validator", 444);
_yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 445);
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
                    _yuitest_coverfunc("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", "validator", 456);
_yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 457);
return Y.Lang.isString(val);
                }
            },

            /**
             * @description Listitems in the selectbox
             * @attribute items
             * @type Array of (String or Int)
            */
            items : {
                value: [],
                validator: function(val) {
                    _yuitest_coverfunc("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", "validator", 468);
_yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 469);
return Y.Lang.isArray(val);
                },
                setter: function(val) {
                    _yuitest_coverfunc("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", "setter", 471);
_yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 472);
var instance = this,
                        transformHandlebars = Lang.isString(instance.get('handleBars')),
                        item,
                        i;
                    _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 476);
instance._itemValues = [];
                    _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 477);
for (i=0; i<val.length; i++) {
                        _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 478);
item = val[i];
                        // Make sure to fill the array with Strings. User might supply other types like numbers: you don't want to miss the hit when you search the array by value.
                        _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 480);
instance._itemValues.push(item.returnValue ? item.returnValue.toString().toLowerCase() : item.toString().toLowerCase());
                    }
                    // only call syncUI when items are change after rendering
                    _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 483);
if (this._syncWithinSetterItems) {this.syncUI();}
                    _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 484);
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
                    _yuitest_coverfunc("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", "validator", 496);
_yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 497);
return Y.Lang.isString(val);
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
                    _yuitest_coverfunc("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", "validator", 509);
_yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 510);
return Y.Lang.isBoolean(val);
                },
                setter: function(val) {
                    _yuitest_coverfunc("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", "setter", 512);
_yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 513);
var instance = this;
                    _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 514);
instance._selectedItemClass = val ? ITSA_CLASSHIDDEN : 'itsa-selectlist-selected';
                    _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 515);
return val;
                }
            }
        }
    }
);


}, '@VERSION@' ,{requires:['widget-base', 'node-base', 'event-base', 'event-delegate', 'event-outside', 'event-custom'], skinnable:true});
