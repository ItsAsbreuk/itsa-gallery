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
_yuitest_coverage["/build/gallery-itsaselectlist/gallery-itsaselectlist.js"].code=["YUI.add('gallery-itsaselectlist', function(Y) {","","'use strict';","","/*!"," * Editor Toolbar Plugin"," * "," *"," * @class ITSAToolbar"," * @constructor"," *"," * <i>Copyright (c) 2012 Marco Asbreuk - http://theinternetwizard.net</i>"," * YUI BSD License - http://developer.yahoo.com/yui/license.html"," *","*/","","// Local constants","var Lang = Y.Lang,","    Node = Y.Node,","    IE = Y.UA.ie,","    ITSA_CLASSHIDDEN = 'itsa-hidden',","    ITSA_SHIM_TEMPLATE_TITLE = \"Selectlist Shim\",","    ITSA_SHIM_TEMPLATE = '<iframe frameborder=\"0\" tabindex=\"-1\" class=\"itsa-shim\" title=\"' + ITSA_SHIM_TEMPLATE_TITLE + '\" src=\"javascript:false;\"></iframe>',","    ITSA_SELECTEDMAIN_TEMPLATE = \"<span class='itsa-selectlist-selectedmain' unselectable='on'></span>\",","    ITSA_BUTTON_TEMPLATE = \"<button class='yui3-button'></button>\",","    ITSA_DOWNBUTTON_TEMPLATE = \"<span class='itsa-button-icon itsa-icon-selectdown'></span>\",","    ITSA_SELECTBOX_TEMPLATE = \"<div class='itsa-selectlist-basediv \" + ITSA_CLASSHIDDEN + \"'><div class='itsa-selectlist-scrolldiv'><ul class='itsa-selectlist-ullist'></ul></div></div>\";","","Y.ITSASelectList = Y.Base.create('itsaselectlist', Y.Widget, [], {","","","// -- Public Static Properties -------------------------------------------------","","/**"," * Reference to the editor's instance"," * @property buttonNode"," * @type Y.EditorBase instance"," */","","/**"," * Reference to the Y-instance of the host-editor"," * @private"," * @property _selectedMainItemNode"," * @type YUI-instance"," */","","/**"," * Reference to the editor's iframe-node"," * @private"," * @property _selectedItemClass"," * @type Y.Node"," */","","/**"," * Reference to the editor's container-node, in which the host-editor is rendered.<br>"," * This is in fact editorNode.get('parentNode')"," * @private"," * @property _itemsContainerNode"," * @type Y.Node"," */","","/**"," * Reference to the toolbar-node"," * @private"," * @property _itemValues"," * @type Y.Node"," */","","/**"," * Reference to the toolbar-node"," * @private"," * @property _syncWithinSetterItems"," * @type Y.Node"," */","","        buttonNode : null,","        _selectedMainItemNode : null,","        _selectedItemClass : null,","        _itemsContainerNode : null,","        _itemValues : null, // for internal use: listitems, transformed to String, so we can use selectItemByValue","        _syncWithinSetterItems : false, // no items.setter.syncUI during initializing","","","        /**","         * Sets up the selectlist during initialisation.","         *","         * @method initializer","         * @param {Object} config The config-object.","         * @protected","        */","        initializer : function(config) {","            var instance = this;","            instance._selectedItemClass = instance.get('hideSelected') ? ITSA_CLASSHIDDEN : 'itsa-selectlist-selected';","        },","","        /**","         * Widget's renderUI-method. Creates the Selectlist in the DOM.","         *","         * @method renderUI ","        */","        renderUI : function() {","            var instance = this,","                contentBox = instance.get('contentBox'), ","                boundingBox = instance.get('boundingBox'),","                className = instance.get('className'),","                iconClassName = instance.get('iconClassName'),","                buttonWidth = instance.get('buttonWidth'),","                listWidth = instance.get('listWidth'),","                btnSize = instance.get('btnSize'),","                items;","            if ((IE>0) && (IE<7)) {boundingBox.append(instance.SHIM_TEMPLATE);}","            instance.buttonNode = Y.Node.create(ITSA_BUTTON_TEMPLATE);","            contentBox.append(instance.buttonNode);","            instance.buttonNode.setHTML(ITSA_DOWNBUTTON_TEMPLATE);","            instance._selectedMainItemNode = Y.Node.create(ITSA_SELECTEDMAIN_TEMPLATE);","            instance.buttonNode.append(instance._selectedMainItemNode);","            instance._itemsContainerNode = Y.Node.create(ITSA_SELECTBOX_TEMPLATE);","            instance.get('listAlignLeft') ? boundingBox.addClass('itsa-leftalign') : boundingBox.addClass('itsa-rightalign');","            if (className) {boundingBox.addClass(className);}","            if (iconClassName) {","                instance._selectedMainItemNode.addClass('itsa-button-icon');","                instance._selectedMainItemNode.addClass(iconClassName);","            }","            // must set minWidth instead of width in case of button: otherwise the 2 spans might be positioned underneath each other","            if (buttonWidth) {instance.buttonNode.setStyle('minWidth', buttonWidth+'px');}","            if (listWidth) {instance._itemsContainerNode.setStyle('width', listWidth+'px');}","            if (btnSize===1) {boundingBox.addClass('itsa-buttonsize-small');}","            else {if (btnSize===2) {boundingBox.addClass('itsa-buttonsize-medium');}}","            contentBox.append(instance._itemsContainerNode);","        },","","        /**","         * Widget's bindUI-method. Binds onclick and clickoutside-events","         *","         * @method bindUI ","        */","        bindUI : function() {","            var instance = this,","                boundingBox = instance.get('boundingBox');","            boundingBox.on('click', instance._toggleListbox, instance);","            boundingBox.on('clickoutside', instance.hideListbox, instance);","            instance._itemsContainerNode.delegate('click', instance._itemClick, 'li', instance);","        },","","        /**","         *  Widget's syncUI-method. Renders the selectlist items","         *","         * @method syncUI","        */","        syncUI : function() {","            var instance = this,","                contentBox = instance.get('contentBox'),","                items = instance.get('items'),","                defaultItem = instance.get('defaultItem'),","                ullist = instance._itemsContainerNode.one('.itsa-selectlist-ullist'),","                i, ","                item,","                itemText,","                isDefaultItem,","                defaultItemFound,","                newNode;","            ullist.setHTML(''); // clear content","            if (items.length>0) {","                for (i=0; i<items.length; i++) {","                    item = items[i];","                    itemText = Lang.isString(item) ? itemText = item : itemText = item.text;","                    isDefaultItem = (itemText===defaultItem);","                    if (isDefaultItem) {defaultItemFound = true;}","                    newNode = Y.Node.create('<li' + ((isDefaultItem) ? ' class=\"' + instance._selectedItemClass + '\"' : '') + '>' + itemText +'</li>');","                    if (item.returnValue) {newNode.setData('returnValue', item.returnValue);}","                    ullist.append(newNode);","                }","                instance._selectedMainItemNode.setHTML(defaultItemFound ? defaultItem : instance.get('defaultButtonText'));","            }","            instance._syncWithinSetterItems = true;","        },","","        /**","         * Internal function that will be called when a user changes the selected item","         *","         * @method _itemClick","         * @private","         * @param {EventFacade} e","         * ","        */","        _itemClick : function(e) {","            this._selectItem(e.currentTarget, true);","        },","","        /**","         * Selects the items at a specified index.<br>","         * When softMatch is set to true, the selected value will return to the default, even when there is no match.<br>","         * When softMatch is false, or not specified, there has to be a match in order to change.","         *","         * @method selectItem","         * @param {Int} index index to be selected","         * @param {Boolean} softMatch when set to true will always make a selectchange, even when the index is out of bound","         * @param {String} softButtonText Text to be appeared on the button in case softMatch is true and there is no match. When not specified, the attribute <i>defaultButtonText</i> will be used","         * @return {eventFacade} Not returnvalue, but event, fired by valueChange, or selectChange.<br>","         * <i>- e.currentTarget: the selected li-Node<br>","         * <i>- e.value: returnvalue of the selected item<br>","         * <i>- e.index: index of the selected item</i>","         * ","        */","        selectItem : function(index, softMatch, softButtonText) {","            var instance = this,","                nodelist = instance._itemsContainerNode.all('li');","            if ((index>=0) && (index<nodelist.size())) {instance._selectItem(nodelist.item(index));}","            else {","                // no hit: return to default without selection in case of softMatch","                if (softMatch) {","                    nodelist.removeClass(instance._selectedItemClass);","                    instance._selectedMainItemNode.setHTML(softButtonText ? softButtonText : instance.get('defaultButtonText'));","                }","            }","        },","","        /**","         * Selects the items based on the listvalue.<br>","         * When softMatch is set to true, the selected value will return to the default, even when there is no match.<br>","         * When softMatch is false, or not specified, there has to be a match in order to change.","         *","         * @method selectItemByValue","         * @param {String} itemText listitem to be selected","         * @param {Boolean} softMatch when set to true will always make a selectchange, even when the listitem is not available","         * @param {Boolean} defaultButtonText Whether to use the attribute <i>defaultButtonText</i> in case softMatch is true and there is no match. When set to false, <i>itemText</i> will be used when there is no match.","         * @return {eventFacade} Not returnvalue, but event, fired by valueChange, or selectChange.<br>","         * <i>- e.currentTarget: the selected li-Node<br>","         * <i>- e.value: returnvalue of the selected item<br>","         * <i>- e.index: index of the selected item</i>","         *","        */","        selectItemByValue : function(itemText, softMatch, defaultButtonText) {","            // by returnvalue ","            var instance = this,","                index = Y.Array.indexOf(instance._itemValues, itemText.toString().toLowerCase());","            instance.selectItem(index, softMatch, defaultButtonText ? instance.get('defaultButtonText') : itemText);","        },","","        /**","         * Does the final itemselection based on the listnode.<br>","         * Will always fire a <b>valueChange event</b>.<br>","         * Will fire a <b>selectChange event</b> only when <i>userInteraction</i> is set to true. ","         *","         * @method _selectItem","         * @private","         * @param {Y.Node} node listitem to be selected","         * @param {Boolean} userInteraction Specifies whether the selection is made by userinteraction, or by functioncall.<br>","         * In case of userinteraction,  selectChange will also be fired.","         * @return {eventFacade} Not returnvalue, but event, fired by valueChange, or selectChange.<br>","         * <i>- e.currentTarget: the selected li-Node<br>","         * <i>- e.value: returnvalue of the selected item<br>","         * <i>- e.index: index of the selected item</i>","         *","        */","        _selectItem : function(node, userInteraction) {","            var instance = this,","                previousNode = instance._itemsContainerNode.one('li.'+instance._selectedItemClass),","                nodeHTML;","            if (node && (node !== previousNode)) {","                if (previousNode) {previousNode.removeClass(instance._selectedItemClass);}","                node.addClass(instance._selectedItemClass);","                nodeHTML = node.getHTML();","                instance._selectedMainItemNode.setHTML(nodeHTML);","                instance.buttonNode.fire('valueChange', {currentTarget: instance, value: node.getData('returnValue') || nodeHTML, index: instance._indexOf(node)});","                if (userInteraction) {instance.buttonNode.fire('selectChange', {currentTarget: instance, value: node.getData('returnValue') || nodeHTML, index: instance._indexOf(node)});}","            }","        },","","        /**","         * Will hide the listitems.","         * @method hideListbox","         *","        */","        hideListbox : function() {","            this._itemsContainerNode.toggleClass(ITSA_CLASSHIDDEN, true);","        },","","        /**","         * Will show the listitems.","         * @method showListbox","         *","        */","        showListbox : function() {","            this._itemsContainerNode.toggleClass(ITSA_CLASSHIDDEN, false);","        },","","        /**","         * Toggles between shown/hidden listitems.","         *","         * @method _toggleListbox","         * @private","         *","        */","        _toggleListbox : function() {","            this._itemsContainerNode.toggleClass(ITSA_CLASSHIDDEN);","        },","","        /**","         * Returns the actual selected listitemnode.<br>","         *","         * @method currentSelected","         * @return {Y.Node} the current selected listitemnode, or null if none is selected.","        */","        currentSelected : function() {","            return this._itemsContainerNode.one('li.'+this._selectedItemClass);","        },","","        /**","         * Returns the index of the actual selected listitemnode.<br>","         *","         * @method currentIndex","         * @return {Int} index of the current selected listitem, or -1 if none is selected.","         *","        */","        currentIndex : function() {","            return this._indexOf(this.currentSelected());","        },","","        /**","         * Returns the index of a listitemnode.<br>","         *","         * @method _indexOf","         * @private","         * @param {Y.Node} node the node to search for.","         * @return {Int} index of a listitem, or -1 if not present.","         *","        */","        _indexOf : function(node) {","            var nodelist = this._itemsContainerNode.one('.itsa-selectlist-ullist').all('li');","            return nodelist.indexOf(node);","        },","","        /**","         * Cleaning up.","         *","         * @protected","         * @method destructor","         *","        */","        destructor : function() {","            // I don't quite understand: If I'm right then Widget's standard destructor cannot do a deep-destroy to clean up","            this.get('contentBox').empty();","        }","","    }, {","        ATTRS : {","","            /**","             * @description The size of the buttons<br>","             * Should be a value 1, 2 or 3 (the higher, the bigger the buttonsize)<br>","             * Default = 2","             * @attribute btnSize","             * @type int","            */","            btnSize : {","                value: 3,","                validator: function(val) {","                    return (Lang.isNumber(val) && (val>0) && (val<4));","                }","            },","","            /**","             * @description Defines the defaultbuttontext when a softMatch with no hit has taken place.<br>","             * See <i>selectItem()</i> how to use a softMatch.<br>","             * Default = 'choose...'","             * @attribute defaultButtonText","             * @type String Default='choose...'","            */","            defaultButtonText : {","                value: 'choose...',","                validator: function(val) {","                    return Y.Lang.isString(val);","                }","            },","","            /**","             * @description Defines the buttonWidth<br>","             * Default = null, which means automaticly sizeing.","             * @attribute buttonWidth","             * @type Int","            */","            buttonWidth: {","                value: null,","                validator: function(val) {","                    return (Y.Lang.isNumber(val) && (val>=0));","                }","            },","","            /**","             * @description Defines the width of the listbox.<br>","             * Default = null, which means automaticly sizeing.","             * @attribute listWidth","             * @type Int","            */","            listWidth: {","                value: null,","                validator: function(val) {","                    return (Y.Lang.isNumber(val) && (val>=0));","                }","            },","","            /**","             * @description Whether the listitems should be aligned left or right.","             * Default = true.","             * @attribute listAlignLeft","             * @type Boolean","            */","            listAlignLeft : {","                value: true,","                validator: function(val) {","                    return Y.Lang.isBoolean(val);","                }","            },","","            /**","             * @description Additional className that can be added to the boundingBox","             * @attribute className","             * @type String","            */","            className : {","                value: null,","                validator: function(val) {","                    return Y.Lang.isString(val);","                }","            },","","            /**","             * @description Additional className that can be added to the selected text on the Button","             * @attribute iconClassName","             * @type String","            */","            iconClassName : {","                value: null,","                validator: function(val) {","                    return Y.Lang.isString(val);","                }","            },","","            /**","             * @description Listitems in the selectbox","             * @attribute items","             * @type Array of (String or Int)","            */","            items : {","                value: [],","                validator: function(val) {","                    return Y.Lang.isArray(val);","                },","                setter: function(val) {","                    var instance = this,","                        transformHandlebars = Lang.isString(instance.get('handleBars')),","                        item,","                        i;","                    instance._itemValues = [];","                    for (i=0; i<val.length; i++) {","                        item = val[i];","                        // Make sure to fill the array with Strings. User might supply other types like numbers: you don't want to miss the hit when you search the array by value.","                        instance._itemValues.push(item.returnValue ? item.returnValue.toString().toLowerCase() : item.toString().toLowerCase());","                    }","                    // only call syncUI when items are change after rendering","                    if (this._syncWithinSetterItems) {this.syncUI();}","                    return val;","                }","            },","","            /**","             * @description The default listitem to be selected during rendering.<br>","             * Default = null","             * @attribute defaultItem","             * @type String","            */","            defaultItem : {","                value: null,","                validator: function(val) {","                    return Y.Lang.isString(val);","                }","            },","","            /**","             * @description Determines whether to show the selected item in the selectlist, or if it should disappear from the selectlist when selected.<br>","             * Default = false.","             * @attribute hideSelected","             * @type Boolean","            */","            hideSelected : {","                value: false,","                validator: function(val) {","                    return Y.Lang.isBoolean(val);","                },","                setter: function(val) {","                    var instance = this;","                    instance._selectedItemClass = val ? ITSA_CLASSHIDDEN : 'itsa-selectlist-selected';","                    return val;","                }","            }","        }","    }",");","","","}, '@VERSION@' ,{requires:['widget-base', 'node-base', 'event-base', 'event-delegate', 'event-outside', 'event-custom'], skinnable:true});"];
_yuitest_coverage["/build/gallery-itsaselectlist/gallery-itsaselectlist.js"].lines = {"1":0,"3":0,"18":0,"29":0,"92":0,"93":0,"102":0,"111":0,"112":0,"113":0,"114":0,"115":0,"116":0,"117":0,"118":0,"119":0,"120":0,"121":0,"122":0,"125":0,"126":0,"127":0,"129":0,"138":0,"140":0,"141":0,"142":0,"151":0,"162":0,"163":0,"164":0,"165":0,"166":0,"167":0,"168":0,"169":0,"170":0,"171":0,"173":0,"175":0,"187":0,"206":0,"208":0,"211":0,"212":0,"213":0,"235":0,"237":0,"257":0,"260":0,"261":0,"262":0,"263":0,"264":0,"265":0,"266":0,"276":0,"285":0,"296":0,"306":0,"317":0,"330":0,"331":0,"343":0,"359":0,"373":0,"386":0,"399":0,"412":0,"424":0,"436":0,"448":0,"451":0,"455":0,"456":0,"457":0,"459":0,"462":0,"463":0,"476":0,"489":0,"492":0,"493":0,"494":0};
_yuitest_coverage["/build/gallery-itsaselectlist/gallery-itsaselectlist.js"].functions = {"initializer:91":0,"renderUI:101":0,"bindUI:137":0,"syncUI:150":0,"_itemClick:186":0,"selectItem:205":0,"selectItemByValue:233":0,"_selectItem:256":0,"hideListbox:275":0,"showListbox:284":0,"_toggleListbox:295":0,"currentSelected:305":0,"currentIndex:316":0,"_indexOf:329":0,"destructor:341":0,"validator:358":0,"validator:372":0,"validator:385":0,"validator:398":0,"validator:411":0,"validator:423":0,"validator:435":0,"validator:447":0,"setter:450":0,"validator:475":0,"validator:488":0,"setter:491":0,"(anonymous 1):1":0};
_yuitest_coverage["/build/gallery-itsaselectlist/gallery-itsaselectlist.js"].coveredLines = 84;
_yuitest_coverage["/build/gallery-itsaselectlist/gallery-itsaselectlist.js"].coveredFunctions = 28;
_yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 1);
YUI.add('gallery-itsaselectlist', function(Y) {

_yuitest_coverfunc("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", "(anonymous 1)", 1);
_yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 3);
'use strict';

/*!
 * Editor Toolbar Plugin
 * 
 *
 * @class ITSAToolbar
 * @constructor
 *
 * <i>Copyright (c) 2012 Marco Asbreuk - http://theinternetwizard.net</i>
 * YUI BSD License - http://developer.yahoo.com/yui/license.html
 *
*/

// Local constants
_yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 18);
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

_yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 29);
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
            _yuitest_coverfunc("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", "initializer", 91);
_yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 92);
var instance = this;
            _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 93);
instance._selectedItemClass = instance.get('hideSelected') ? ITSA_CLASSHIDDEN : 'itsa-selectlist-selected';
        },

        /**
         * Widget's renderUI-method. Creates the Selectlist in the DOM.
         *
         * @method renderUI 
        */
        renderUI : function() {
            _yuitest_coverfunc("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", "renderUI", 101);
_yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 102);
var instance = this,
                contentBox = instance.get('contentBox'), 
                boundingBox = instance.get('boundingBox'),
                className = instance.get('className'),
                iconClassName = instance.get('iconClassName'),
                buttonWidth = instance.get('buttonWidth'),
                listWidth = instance.get('listWidth'),
                btnSize = instance.get('btnSize'),
                items;
            _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 111);
if ((IE>0) && (IE<7)) {boundingBox.append(instance.SHIM_TEMPLATE);}
            _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 112);
instance.buttonNode = Y.Node.create(ITSA_BUTTON_TEMPLATE);
            _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 113);
contentBox.append(instance.buttonNode);
            _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 114);
instance.buttonNode.setHTML(ITSA_DOWNBUTTON_TEMPLATE);
            _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 115);
instance._selectedMainItemNode = Y.Node.create(ITSA_SELECTEDMAIN_TEMPLATE);
            _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 116);
instance.buttonNode.append(instance._selectedMainItemNode);
            _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 117);
instance._itemsContainerNode = Y.Node.create(ITSA_SELECTBOX_TEMPLATE);
            _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 118);
instance.get('listAlignLeft') ? boundingBox.addClass('itsa-leftalign') : boundingBox.addClass('itsa-rightalign');
            _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 119);
if (className) {boundingBox.addClass(className);}
            _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 120);
if (iconClassName) {
                _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 121);
instance._selectedMainItemNode.addClass('itsa-button-icon');
                _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 122);
instance._selectedMainItemNode.addClass(iconClassName);
            }
            // must set minWidth instead of width in case of button: otherwise the 2 spans might be positioned underneath each other
            _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 125);
if (buttonWidth) {instance.buttonNode.setStyle('minWidth', buttonWidth+'px');}
            _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 126);
if (listWidth) {instance._itemsContainerNode.setStyle('width', listWidth+'px');}
            _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 127);
if (btnSize===1) {boundingBox.addClass('itsa-buttonsize-small');}
            else {if (btnSize===2) {boundingBox.addClass('itsa-buttonsize-medium');}}
            _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 129);
contentBox.append(instance._itemsContainerNode);
        },

        /**
         * Widget's bindUI-method. Binds onclick and clickoutside-events
         *
         * @method bindUI 
        */
        bindUI : function() {
            _yuitest_coverfunc("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", "bindUI", 137);
_yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 138);
var instance = this,
                boundingBox = instance.get('boundingBox');
            _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 140);
boundingBox.on('click', instance._toggleListbox, instance);
            _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 141);
boundingBox.on('clickoutside', instance.hideListbox, instance);
            _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 142);
instance._itemsContainerNode.delegate('click', instance._itemClick, 'li', instance);
        },

        /**
         *  Widget's syncUI-method. Renders the selectlist items
         *
         * @method syncUI
        */
        syncUI : function() {
            _yuitest_coverfunc("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", "syncUI", 150);
_yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 151);
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
            _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 162);
ullist.setHTML(''); // clear content
            _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 163);
if (items.length>0) {
                _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 164);
for (i=0; i<items.length; i++) {
                    _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 165);
item = items[i];
                    _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 166);
itemText = Lang.isString(item) ? itemText = item : itemText = item.text;
                    _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 167);
isDefaultItem = (itemText===defaultItem);
                    _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 168);
if (isDefaultItem) {defaultItemFound = true;}
                    _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 169);
newNode = Y.Node.create('<li' + ((isDefaultItem) ? ' class="' + instance._selectedItemClass + '"' : '') + '>' + itemText +'</li>');
                    _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 170);
if (item.returnValue) {newNode.setData('returnValue', item.returnValue);}
                    _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 171);
ullist.append(newNode);
                }
                _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 173);
instance._selectedMainItemNode.setHTML(defaultItemFound ? defaultItem : instance.get('defaultButtonText'));
            }
            _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 175);
instance._syncWithinSetterItems = true;
        },

        /**
         * Internal function that will be called when a user changes the selected item
         *
         * @method _itemClick
         * @private
         * @param {EventFacade} e
         * 
        */
        _itemClick : function(e) {
            _yuitest_coverfunc("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", "_itemClick", 186);
_yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 187);
this._selectItem(e.currentTarget, true);
        },

        /**
         * Selects the items at a specified index.<br>
         * When softMatch is set to true, the selected value will return to the default, even when there is no match.<br>
         * When softMatch is false, or not specified, there has to be a match in order to change.
         *
         * @method selectItem
         * @param {Int} index index to be selected
         * @param {Boolean} softMatch when set to true will always make a selectchange, even when the index is out of bound
         * @param {String} softButtonText Text to be appeared on the button in case softMatch is true and there is no match. When not specified, the attribute <i>defaultButtonText</i> will be used
         * @return {eventFacade} Not returnvalue, but event, fired by valueChange, or selectChange.<br>
         * <i>- e.currentTarget: the selected li-Node<br>
         * <i>- e.value: returnvalue of the selected item<br>
         * <i>- e.index: index of the selected item</i>
         * 
        */
        selectItem : function(index, softMatch, softButtonText) {
            _yuitest_coverfunc("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", "selectItem", 205);
_yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 206);
var instance = this,
                nodelist = instance._itemsContainerNode.all('li');
            _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 208);
if ((index>=0) && (index<nodelist.size())) {instance._selectItem(nodelist.item(index));}
            else {
                // no hit: return to default without selection in case of softMatch
                _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 211);
if (softMatch) {
                    _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 212);
nodelist.removeClass(instance._selectedItemClass);
                    _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 213);
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
         * @param {Boolean} softMatch when set to true will always make a selectchange, even when the listitem is not available
         * @param {Boolean} defaultButtonText Whether to use the attribute <i>defaultButtonText</i> in case softMatch is true and there is no match. When set to false, <i>itemText</i> will be used when there is no match.
         * @return {eventFacade} Not returnvalue, but event, fired by valueChange, or selectChange.<br>
         * <i>- e.currentTarget: the selected li-Node<br>
         * <i>- e.value: returnvalue of the selected item<br>
         * <i>- e.index: index of the selected item</i>
         *
        */
        selectItemByValue : function(itemText, softMatch, defaultButtonText) {
            // by returnvalue 
            _yuitest_coverfunc("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", "selectItemByValue", 233);
_yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 235);
var instance = this,
                index = Y.Array.indexOf(instance._itemValues, itemText.toString().toLowerCase());
            _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 237);
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
            _yuitest_coverfunc("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", "_selectItem", 256);
_yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 257);
var instance = this,
                previousNode = instance._itemsContainerNode.one('li.'+instance._selectedItemClass),
                nodeHTML;
            _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 260);
if (node && (node !== previousNode)) {
                _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 261);
if (previousNode) {previousNode.removeClass(instance._selectedItemClass);}
                _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 262);
node.addClass(instance._selectedItemClass);
                _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 263);
nodeHTML = node.getHTML();
                _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 264);
instance._selectedMainItemNode.setHTML(nodeHTML);
                _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 265);
instance.buttonNode.fire('valueChange', {currentTarget: instance, value: node.getData('returnValue') || nodeHTML, index: instance._indexOf(node)});
                _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 266);
if (userInteraction) {instance.buttonNode.fire('selectChange', {currentTarget: instance, value: node.getData('returnValue') || nodeHTML, index: instance._indexOf(node)});}
            }
        },

        /**
         * Will hide the listitems.
         * @method hideListbox
         *
        */
        hideListbox : function() {
            _yuitest_coverfunc("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", "hideListbox", 275);
_yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 276);
this._itemsContainerNode.toggleClass(ITSA_CLASSHIDDEN, true);
        },

        /**
         * Will show the listitems.
         * @method showListbox
         *
        */
        showListbox : function() {
            _yuitest_coverfunc("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", "showListbox", 284);
_yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 285);
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
            _yuitest_coverfunc("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", "_toggleListbox", 295);
_yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 296);
this._itemsContainerNode.toggleClass(ITSA_CLASSHIDDEN);
        },

        /**
         * Returns the actual selected listitemnode.<br>
         *
         * @method currentSelected
         * @return {Y.Node} the current selected listitemnode, or null if none is selected.
        */
        currentSelected : function() {
            _yuitest_coverfunc("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", "currentSelected", 305);
_yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 306);
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
            _yuitest_coverfunc("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", "currentIndex", 316);
_yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 317);
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
            _yuitest_coverfunc("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", "_indexOf", 329);
_yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 330);
var nodelist = this._itemsContainerNode.one('.itsa-selectlist-ullist').all('li');
            _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 331);
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
            _yuitest_coverfunc("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", "destructor", 341);
_yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 343);
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
                    _yuitest_coverfunc("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", "validator", 358);
_yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 359);
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
                    _yuitest_coverfunc("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", "validator", 372);
_yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 373);
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
                    _yuitest_coverfunc("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", "validator", 385);
_yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 386);
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
                    _yuitest_coverfunc("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", "validator", 398);
_yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 399);
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
                    _yuitest_coverfunc("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", "validator", 411);
_yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 412);
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
                    _yuitest_coverfunc("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", "validator", 423);
_yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 424);
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
                    _yuitest_coverfunc("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", "validator", 435);
_yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 436);
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
                    _yuitest_coverfunc("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", "validator", 447);
_yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 448);
return Y.Lang.isArray(val);
                },
                setter: function(val) {
                    _yuitest_coverfunc("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", "setter", 450);
_yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 451);
var instance = this,
                        transformHandlebars = Lang.isString(instance.get('handleBars')),
                        item,
                        i;
                    _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 455);
instance._itemValues = [];
                    _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 456);
for (i=0; i<val.length; i++) {
                        _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 457);
item = val[i];
                        // Make sure to fill the array with Strings. User might supply other types like numbers: you don't want to miss the hit when you search the array by value.
                        _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 459);
instance._itemValues.push(item.returnValue ? item.returnValue.toString().toLowerCase() : item.toString().toLowerCase());
                    }
                    // only call syncUI when items are change after rendering
                    _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 462);
if (this._syncWithinSetterItems) {this.syncUI();}
                    _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 463);
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
                    _yuitest_coverfunc("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", "validator", 475);
_yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 476);
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
                    _yuitest_coverfunc("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", "validator", 488);
_yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 489);
return Y.Lang.isBoolean(val);
                },
                setter: function(val) {
                    _yuitest_coverfunc("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", "setter", 491);
_yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 492);
var instance = this;
                    _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 493);
instance._selectedItemClass = val ? ITSA_CLASSHIDDEN : 'itsa-selectlist-selected';
                    _yuitest_coverline("/build/gallery-itsaselectlist/gallery-itsaselectlist.js", 494);
return val;
                }
            }
        }
    }
);


}, '@VERSION@' ,{requires:['widget-base', 'node-base', 'event-base', 'event-delegate', 'event-outside', 'event-custom'], skinnable:true});
