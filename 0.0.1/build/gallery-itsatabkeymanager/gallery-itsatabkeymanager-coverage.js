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
_yuitest_coverage["build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js",
    code: []
};
_yuitest_coverage["build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js"].code=["YUI.add('gallery-itsatabkeymanager', function (Y, NAME) {","","'use strict';","//==============================================================================","//=============================================================================="," //","// WHILE THE SMUGMUG-FUCUSMANAGER IS NOT IN THE GALLREY, WE NEED TO DEFINE THOSE METHODS HERE","//","// SHOULD BE REMOVED ONCE THE SMUGMUG FOCUSMANAGER IS AVAILABLE IN THE GALLERY","//","//==============================================================================","//==============================================================================","function FocusManager() {","    FocusManager.superclass.constructor.apply(this, arguments);","}","","Y.extend(FocusManager, Y.Plugin.Base, {","","    keyCodeMap: {","        32: 'space',","        33: 'pgup',","        34: 'pgdown',","        35: 'end',","        36: 'home',","        37: 'left',","        38: 'up',","        39: 'right',","        40: 'down'","    },","","    preventDefaultMap: {","        down  : 1,","        end   : 1,","        home  : 1,","        left  : 1,","        pgdown: 1,","        pgup  : 1,","        right : 1,","        space : 1,","        up    : 1","    },","","    // -- Lifecycle ------------------------------------------------------------","    initializer: function (config) {","        this._host = config.host;","","        this._attachEvents();","        this.refresh();","    },","","    destructor: function () {","        this._detachEvents();","    },","","    // -- Public Methods -------------------------------------------------------","","    ascend: function () {","        var container = this._getActiveContainer(),","            host      = this._host,","            parentItem;","","        if (container === host) {","            return null;","        }","","        parentItem = container.ancestor(this.get('itemSelector'), false, function (node) {","            // Stop ascending if we reach the host.","            return node === host;","        });","","        this.set('activeItem', parentItem, {src: 'ascend'});","","        return parentItem;","    },","","    descend: function () {","        var activeItem                = this.get('activeItem'),","            anchoredContainerSelector = this.get('anchoredContainerSelector'),","            container;","","        if (!anchoredContainerSelector || !activeItem) {","            return null;","        }","","        container = activeItem.one(anchoredContainerSelector);","","        return container ? this.first({container: container}) : null;","    },","","    first: function (options) {","        options = options || {};","","        // Get the first item that isn't disabled.","        var container        = options.container || this.get('host'),","            disabledSelector = this.get('disabledSelector'),","            itemSelector     = this.get('itemSelector'),","            item             = container.one(this.get('anchoredItemSelector'));","","        while (item && disabledSelector && item.test(disabledSelector)) {","            item = item.next(itemSelector);","        }","","        if (!options.silent) {","            this.set('activeItem', item, {src: 'first'});","        }","","        return item;","    },","","    last: function (options) {","        options = options || {};","","        var container        = options.container || this._host,","            disabledSelector = this.get('disabledSelector'),","            items            = container.all(this.get('anchoredItemSelector')),","            item             = items.pop();","","        while (item && disabledSelector && item.test(disabledSelector)) {","            item = items.pop();","        }","","        if (!options.silent) {","            this.set('activeItem', item, {src: 'last'});","        }","","        return item;","    },","","    next: function (options) {","        options = options || {};","","        var activeItem = this.get('activeItem'),","            disabledSelector, itemSelector, nextItem;","","        if (!activeItem) {","            return null;","        }","","        disabledSelector = this.get('disabledSelector');","        itemSelector     = this.get('itemSelector');","        nextItem         = activeItem.next(itemSelector);","","        // Get the next sibling that matches the itemSelector and isn't","        // disabled.","        while (nextItem && disabledSelector && nextItem.test(disabledSelector)) {","            nextItem = nextItem.next(itemSelector);","        }","","        if (nextItem) {","            if (!options.silent) {","                this.set('activeItem', nextItem, {src: 'next'});","            }","        } else {","            // If there is no next sibling and the `circular` attribute is","            // truthy, then focus the first item in this container.","            if (this.get('circular')) {","                nextItem = this.first(Y.merge(options, {","                    container: this._getActiveContainer(activeItem)","                }));","            }","        }","","        return nextItem || activeItem;","    },","","    previous: function (options) {","        options = options || {};","","        var activeItem = this.get('activeItem'),","            disabledSelector, itemSelector, prevItem;","","        if (!activeItem) {","            return null;","        }","","        disabledSelector = this.get('disabledSelector');","        itemSelector     = this.get('itemSelector');","        prevItem         = activeItem.previous(itemSelector);","","        // Get the previous sibling that matches the itemSelector and isn't","        // disabled.","        while (prevItem && disabledSelector && prevItem.test(disabledSelector)) {","            prevItem = prevItem.previous(itemSelector);","        }","","        if (prevItem) {","            if (!options.silent) {","                this.set('activeItem', prevItem, {src: 'previous'});","            }","        } else {","            // If there is no previous sibling and the `circular` attribute is","            // truthy, then focus the last item in this container.","            prevItem = this.last(Y.merge(options, {","                container: this._getActiveContainer(activeItem)","            }));","        }","","        return prevItem || activeItem;","    },","","    refresh: function (container) {","        var activeItem       = this.get('activeItem'),","            disabledSelector = this.get('disabledSelector'),","            itemSelector     = this.get(container ? 'anchoredItemSelector' : 'itemSelector');","","        (container || this._host).all(itemSelector).each(function (node) {","            if (disabledSelector && node.test(disabledSelector)) {","                node.removeAttribute('tabIndex');","            } else {","                node.set('tabIndex', node === activeItem ? 0 : -1);","            }","        });","","        return this;","    },","","    _attachEvents: function () {","        var host = this._host;","","        this._events = [","            host.on('keydown', this._onKeyDown, this),","            host.after('blur', this._afterBlur, this),","            host.after('focus', this._afterFocus, this),","","            this.after({","                activeItemChange: this._afterActiveItemChange","            })","        ];","    },","","    _detachEvents: function () {","        new Y.EventHandle(this._events).detach();","    },","","    _getActiveContainer: function (activeItem) {","        var containerSelector = this.get('containerSelector'),","            host              = this._host,","            container;","","        if (!containerSelector) {","            return host;","        }","","        if (!activeItem) {","            activeItem = this.get('activeItem');","        }","","        if (!activeItem) {","            return host;","        }","","        container = activeItem.ancestor(containerSelector, false, function (node) {","            // Stop the search if we reach the host node.","            return node === host;","        });","","        return container || host;","    },","","    _getAnchoredContainerSelector: function (value) {","        if (value) {","            return value;","        }","","        var containerSelector = this.get('containerSelector');","","        if (containerSelector) {","            return '>' + containerSelector;","        }","","        return null;","    },","","    _getAnchoredItemSelector: function (value) {","        if (value) {","            return value;","        }","","        return '>' + this.get('itemSelector');","    },","","    // -- Protected Event Handlers ---------------------------------------------","","    _afterActiveItemChange: function (e) {","        var newVal  = e.newVal,","            prevVal = e.prevVal;","","        if (prevVal) {","            prevVal.set('tabIndex', -1);","        }","","        if (newVal) {","            newVal.set('tabIndex', 0);","","            if (this.get('focused')) {","                newVal.focus();","            }","        }","    },","","    _afterBlur: function () {","        this._set('focused', false);","    },","","    _afterFocus: function (e) {","        var target = e.target;","        this._set('focused', true);","        if (target !== this._host && target.test(this.get('itemSelector'))) {","            this.set('activeItem', target, {src: 'focus'});","        }","    },","","    _onKeyDown: function (e) {","        if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) {","            return;","        }","","        var key    = this.keyCodeMap[e.keyCode] || e.keyCode,","            keys   = this.get('keys'),","            action = keys[key] || keys[e.keyCode];","","        if (action) {","            if (this.preventDefaultMap[key]) {","                e.preventDefault();","            }","","            if (typeof action === 'string') {","                this[action].call(this);","            } else {","                action.call(this);","            }","        }","    }","}, {","    NAME: 'focusManager',","    NS  : 'focusManager',","","    ATTRS: {","        activeItem: {","            valueFn: function () {","                // TODO: Need to be smarter about choosing the default","                // activeItem. Old FocusManager defaults to the first item with","                // tabIndex === 0, if there is one.","                return this.first();","            }","        },","","        anchoredContainerSelector: {","            getter: '_getAnchoredContainerSelector'","        },","","        anchoredItemSelector: {","            getter: '_getAnchoredItemSelector'","        },","","        circular: {","            value: true","        },","","        containerSelector: {},","","        disabledSelector: {","            value: '[aria-disabled=\"true\"], [aria-hidden=\"true\"], [disabled]'","        },","","        focused: {","            readOnly: true,","            value   : false","        },","","        itemSelector: {","            value: '*'","        },","","        keys: {","            cloneDefaultValue: 'shallow',","","            value: {","                down : 'next',","                left : 'ascend',","                right: 'descend',","                up   : 'previous'","            }","        }","    }","});","","Y.namespace('Plugin').FocusManager = FocusManager;","//==============================================================================","//=============================================================================="," //","// END OF DEFINITION SMUGMUG FOCUSMANAGER","//","//==============================================================================","//==============================================================================","","/**"," * ITSAScrollViewKeyNav Plugin"," *"," *"," * Plugin that <b>extends gallery-sm-focusmanager</b> by navigate with TAB and Shift-TAB."," * The plugin needs to be done on a container-Node. By default focusing is done with nodes that have the class <b>'.focusable'</b>,"," * but this can be overruled with the attribite 'itemSelector'."," *"," *"," * @module gallery-itsatabkeymanager"," * @class ITSATabKeyManager"," * @extends Plugin.FocusManager"," * @constructor"," * @since 0.1"," *"," * <i>Copyright (c) 2013 Marco Asbreuk - http://itsasbreuk.nl</i>"," * YUI BSD License - http://developer.yahoo.com/yui/license.html"," *","*/","","// -- Public Static Properties -------------------------------------------------","","var YArray = Y.Array,","    DEFAULT_ITEM_SELECTOR = '.focusable',","    YUI_PRIMARYBUTTON_CLASS = 'yui3-button-primary',","    FORMELEMENT_CLASS = 'yui3-itsaformelement',","    ITSAFORMELEMENT_SELECTONFOCUS_CLASS = FORMELEMENT_CLASS + '-selectall',","    ITSAFORMELEMENT_FIRSTFOCUS_CLASS = FORMELEMENT_CLASS + '-firstfocus';","","","Y.namespace('Plugin').ITSATabKeyManager = Y.Base.create('itsatabkeymanager', Y.Plugin.FocusManager, [], {","","        /**","         * Sets up the toolbar during initialisation. Calls render() as soon as the hosts-editorframe is ready","         *","         * @method initializer","         * @protected","         * @since 0.1","         */","        initializer : function() {","            var instance = this,","                host;","","            /**","             * Internal list that holds event-references","             * @property _eventhandlers","             * @private","             * @type Array","             */","            instance._eventhandlers = [];","","            /**","             * The plugin's host, which should be a ScrollView-instance","             * @property host","             * @type Y.Node","             */","            instance.host = host = instance.get('host');","            instance._bindUI();","            instance.set('keys', {});","            instance.set('circular', true);","        },","","        /**","         * Cleans up bindings and removes plugin","         * @method destructor","         * @protected","         * @since 0.1","        */","        destructor : function() {","            this._clearEventhandlers();","        },","","        /**","         * Focuses and returns the first focusable item.","         *","         * @method first","         * @param {Object} [options] Options.","         *   @param {Node} [options.container] Descendant container to restrict the","         *       search to. Defaults to the host node.","         *   @param {Boolean} [options.silent=false] If `true`, the item will be","         *       returned, but will not become the active item.","         * @return {Node|null} Focused node, or `null` if there are no focusable items.","        **/","","        first: function (options) {","            options = options || {};","","            var instance         = this,","                container        = (options && options.container) || instance.host,","                disabledSelector = instance.get('disabledSelector'),","                itemSelector     = (options && options.selector) || instance.get('itemSelector'),","                item             = container.one(itemSelector),","                i                = 0,","                allItems;","","            while (item && disabledSelector && item.test(disabledSelector)) {","                allItems = allItems || container.all(itemSelector);","                item = (++i<allItems.size()) ? allItems.item(i) : null;","            }","            if (!options.silent) {","                instance.set('activeItem', item, {src: 'first'});","            }","            return item;","","        },","","        /**","         * Focus the initial node (first node that should be selected)","         *","         * @method focusInitialItem","         * @since 0.1","         *","        */","        focusInitialItem : function() {","            var instance = this,","                focusitem, widgetbd, widgetft;","","            focusitem = instance.first({selector: '.'+ITSAFORMELEMENT_FIRSTFOCUS_CLASS}) ||","                        instance.first({selector: '.'+YUI_PRIMARYBUTTON_CLASS}) ||","                        ((widgetbd=instance.host.one('.yui3-widget-bd')) ? instance.first({container: widgetbd}) : null) ||","                        ((widgetft=instance.host.one('.yui3-widget-ft')) ? instance.first({container: widgetft}) : null) ||","                        instance.first();","            if (focusitem) {","                focusitem.focus();","                instance._selectNode(focusitem);","            }","        },","","        /**","         * Focuses and returns the last focusable item.","         *","         * @method last","         * @param {Object} [options] Options.","         *     @param {Node} [options.container] Descendant container to restrict the","         *         search to. Defaults to the host node.","         *     @param {Boolean} [options.silent=false] If `true`, the item will be","         *         returned, but will not become the active item.","         * @return {Node|null} Focused node, or `null` if there are no focusable items.","        **/","        last: function (options) {","            var instance         = this,","                container        = (options && options.container) || instance.host,","                disabledSelector = instance.get('disabledSelector'),","                allItems         = container.all(instance.get('itemSelector')),","                i                = allItems.size() - 1,","                item             = allItems.pop();","","            options = options || {};","            while (item && disabledSelector && item.test(disabledSelector)) {","                item = (--i>=0) ? allItems.item(i) : null;","            }","","            if (!options.silent) {","                instance.set('activeItem', item, {src: 'last'});","            }","","            return item;","        },","","        /**","         * Focuses and returns the next focusable sibling of the current `activeItem`.","         *","         * If there is no focusable next sibling and the `circular` attribute is","        `* false`, the current `activeItem` will be returned.","         *","         * @method next","         * @param {Object} [options] Options.","         *     @param {Boolean} [options.silent=false] If `true`, the item will be","         *         returned, but will not become the active item.","         * @return {Node|null} Focused node, or `null` if there is no `activeItem`.","        **/","        next: function (options) {","            var instance         = this,","                container        = (options && options.container) || instance.host,","                activeItem       = instance.get('activeItem'),","                disabledSelector, nextItem, index, itemSize, allItems;","","            options = options || {};","            if (!activeItem) {","                return instance.first(options);","            }","            disabledSelector = instance.get('disabledSelector');","            allItems = container.all(instance.get('itemSelector'));","            itemSize = allItems.size();","            index = allItems.indexOf(activeItem);","            nextItem = (++index<itemSize) ? allItems.item(index) : null;","            // Get the next item that matches the itemSelector and isn't","            // disabled.","            while (nextItem && disabledSelector && nextItem.test(disabledSelector)) {","                nextItem = (++index<itemSize) ? allItems.item(index) : null;","            }","            if (nextItem) {","                if (!options.silent) {","                    this.set('activeItem', nextItem, {src: 'next'});","                }","            } else {","                // If there is no next item and the `circular` attribute is","                // truthy, then focus the first item in this container.","                if (this.get('circular')) {","                    nextItem = instance.first(options);","                }","            }","            return nextItem || activeItem;","        },","","        /**","         * Focuses and returns the previous focusable sibling of the current","         * `activeItem`.","         *","         * If there is no focusable previous sibling and the `circular` attribute is","         * `false`, the current `activeItem` will be returned.","         *","         * @method previous","         * @param {Object} [options] Options.","         *     @param {Boolean} [options.silent=false] If `true`, the item will be","         *         returned, but will not become the active item.","         * @return {Node|null} Focused node, or `null` if there is no `activeItem`.","        **/","        previous: function (options) {","            var instance         = this,","                container        = (options && options.container) || instance.host,","                activeItem       = instance.get('activeItem'),","                disabledSelector, prevItem, index, allItems;","","            options = options || {};","            if (!activeItem) {","                return instance.first(options);","            }","            disabledSelector = instance.get('disabledSelector');","            allItems = container.all(instance.get('itemSelector'));","            index = allItems.indexOf(activeItem);","            prevItem = (--index>=0) ? allItems.item(index) : null;","            // Get the next item that matches the itemSelector and isn't","            // disabled.","            while (prevItem && disabledSelector && prevItem.test(disabledSelector)) {","                prevItem = (--index>=0) ? allItems.item(index) : null;","            }","            if (prevItem) {","                if (!options.silent) {","                    this.set('activeItem', prevItem, {src: 'previous'});","                }","            } else {","                // If there is no next item and the `circular` attribute is","                // truthy, then focus the first item in this container.","                if (this.get('circular')) {","                    prevItem = instance.last(options);","                }","            }","            return prevItem || activeItem;","        },","","        /**","         * Sets the specified Node as the node that should retreive first focus.","         * (=first focus once the container gets focus and no element has focus yet)","         *","         * @method retreiveFocus","         * @param node {Y.Node|String} the Node that should gain first focus. Has to be inside the host (container) and focusable.","         * @since 0.1","        */","        setFirstFocus : function(node) {","            var instance = this,","                container = instance.host,","                nodeisfocusable;","","            if (typeof node === 'string') {","                node = Y.one(node);","            }","            nodeisfocusable = node && instance._nodeIsFocusable(node);","            if (nodeisfocusable) {","                container.all('.'+ITSAFORMELEMENT_FIRSTFOCUS_CLASS).removeClass(ITSAFORMELEMENT_FIRSTFOCUS_CLASS);","                node.addClass(ITSAFORMELEMENT_FIRSTFOCUS_CLASS);","            }","        },","","        /**","         * Makes the Node to be in a state that all text will be selected once the Node gets Focus. Enables or disables the state.","         * Be aware that this has only effect on Nodes of the type: <b>'input[type=text], input[type=password], textarea'</b>.","         *","         * @method setSelectText","         * @param select {Boolean} whether the 'selectall' option is active or not","         * @param [node] {Y.Node|String} the Node, Nodelist or Selector of the nodes to be set. Has to be inside the host (container) and focusable.","                  If undefined, than the new setting will be applyable to all focusable text-Nodes.","         * @since 0.1","        */","        setSelectText : function(select, node) {","            var instance = this,","                container = instance.host,","                nodeisfocusable, itemSelector, disabledSelector, allNodes;","","            if (typeof node === 'string') {","                node = Y.all(node);","            }","            if (node && (node instanceof Y.Node)) {","                // only 1 node needs to be set","                nodeisfocusable = instance._nodeIsFocusable(node);","                if (nodeisfocusable && node.test('input[type=text], input[type=password], textarea')) {","                    node.toggleClass(ITSAFORMELEMENT_SELECTONFOCUS_CLASS, select);","                }","            }","            else {","                allNodes = node || container.all(itemSelector);","                // allNodes need to be set --> this is a NodeList","                itemSelector = instance.get('itemSelector');","                disabledSelector = instance.get('disabledSelector');","                allNodes.each(","                    function(oneNode) {","                        if (oneNode.test('input[type=text], input[type=password], textarea') &&","                            (!disabledSelector || !oneNode.test(disabledSelector))) {","                            oneNode.toggleClass(ITSAFORMELEMENT_SELECTONFOCUS_CLASS, select);","                        }","                    }","                );","            }","        },","","        //===============================================================================================","        // private methods","        //===============================================================================================","","        /**","         * Binding events","         *","         * @method _bindUI","         * @private","         * @since 0.1","        */","        _bindUI : function() {","            var instance = this,","                host = instance.host;","","            instance._eventhandlers.push(","                host.on(","                    'keydown',","                    function(e) {","                        if (e.keyCode === 9) { // tab","                            e.preventDefault();","                            if (e.shiftKey) {","                                instance.previous();","                            }","                            else {","                                instance.next();","                            }","                        }","                    }","                )","            );","            instance._eventhandlers.push(","                host.after(","                    'click',","                    Y.rbind(instance._retreiveFocus, instance)","                )","            );","        },","","        /**","         * Cleaning up all eventlisteners","         *","         * @method _clearEventhandlers","         * @private","         * @since 0.1","         *","        */","        _clearEventhandlers : function() {","            YArray.each(","                this._eventhandlers,","                function(item){","                    item.detach();","                }","            );","        },","","        /**","         * Checks whether a node is focusable within the host-container.","         *","         * @method _nodeIsFocusable","         * @param node {Y.Node} the node to check if it's a focusable node within the host-container.","         * @private","         * @return {Boolean} focusable or not","         * @since 0.1","        */","        _nodeIsFocusable : function(node) {","            var instance            = this,","                container           = instance.host,","                disabledSelector    = instance.get('disabledSelector'),","                itemSelector        = instance.get('itemSelector'),","                nodeInsideContainer = node && container.contains(node),","                isFocusable;","","            isFocusable = (nodeInsideContainer && node.test(itemSelector) && (!disabledSelector || !node.test(disabledSelector)));","            return isFocusable;","        },","","        /**","         * Retreive the focus agian on the 'activeItem', or -when none- on the initial Item.","         * Is called when the host-node gets focus.","         *","         * @method _retreiveFocus","         * @private","         * @since 0.1","        */","        _retreiveFocus : function() {","            var instance   = this,","                activeItem = instance.get('activeItem');","","            if (activeItem) {","                activeItem.focus();","                instance._selectNode(activeItem);","            }","            else {","                instance.focusInitialItem();","            }","        },","","        /**","         * Selects the text inside the Node, or repositions the cursor to the end.","         *","         * @method _selectNode","         * @private","         * @since 0.1","         *","        */","        _selectNode : function(node) {","            if (node && node.test('input[type=text], input[type=password], textarea')) {","                if (node.hasClass(ITSAFORMELEMENT_SELECTONFOCUS_CLASS)) {","                    node.select();","                }","                else {","                    node.set('selectionStart', node.get('value').length);","                    // set 'scrollTop' high to make Chrome scroll the last character into view","                    node.set('scrollTop', 999999);","                }","            }","        }","","    }, {","        NS : 'itsatabkeymanager',","        ATTRS : {","            /**","             * Node that's currently either focused or focusable as part of the","             * document's tab flow. Overridden because we need a different valueFn.","             *","             * @attribute {Node|null} activeItem","            **/","            activeItem: {","                value: null,","                setter: function(val) {","                    this._selectNode(val);","                }","            },","            /**","             * Non-anchored CSS selector that matches item nodes that should be","             * focusable.","             *","             * @attribute {String} itemSelector","             * @default '.focusable'","            **/","            itemSelector: {","                value: DEFAULT_ITEM_SELECTOR,","                validator:  function(v) {","                    return typeof v === 'string';","                }","            }","        }","    }",");","","","}, '@VERSION@', {","    \"requires\": [","        \"yui-base\",","        \"oop\",","        \"base-base\",","        \"base-build\",","        \"event-custom\",","        \"plugin\",","        \"node-pluginhost\",","        \"event-focus\",","        \"selector-css3\"","    ]","});"];
_yuitest_coverage["build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js"].lines = {"1":0,"3":0,"13":0,"14":0,"17":0,"45":0,"47":0,"48":0,"52":0,"58":0,"62":0,"63":0,"66":0,"68":0,"71":0,"73":0,"77":0,"81":0,"82":0,"85":0,"87":0,"91":0,"94":0,"99":0,"100":0,"103":0,"104":0,"107":0,"111":0,"113":0,"118":0,"119":0,"122":0,"123":0,"126":0,"130":0,"132":0,"135":0,"136":0,"139":0,"140":0,"141":0,"145":0,"146":0,"149":0,"150":0,"151":0,"156":0,"157":0,"163":0,"167":0,"169":0,"172":0,"173":0,"176":0,"177":0,"178":0,"182":0,"183":0,"186":0,"187":0,"188":0,"193":0,"198":0,"202":0,"206":0,"207":0,"208":0,"210":0,"214":0,"218":0,"220":0,"232":0,"236":0,"240":0,"241":0,"244":0,"245":0,"248":0,"249":0,"252":0,"254":0,"257":0,"261":0,"262":0,"265":0,"267":0,"268":0,"271":0,"275":0,"276":0,"279":0,"285":0,"288":0,"289":0,"292":0,"293":0,"295":0,"296":0,"302":0,"306":0,"307":0,"308":0,"309":0,"314":0,"315":0,"318":0,"322":0,"323":0,"324":0,"327":0,"328":0,"330":0,"344":0,"388":0,"419":0,"427":0,"437":0,"446":0,"453":0,"454":0,"455":0,"456":0,"466":0,"482":0,"484":0,"492":0,"493":0,"494":0,"496":0,"497":0,"499":0,"511":0,"514":0,"519":0,"520":0,"521":0,"537":0,"544":0,"545":0,"546":0,"549":0,"550":0,"553":0,"569":0,"574":0,"575":0,"576":0,"578":0,"579":0,"580":0,"581":0,"582":0,"585":0,"586":0,"588":0,"589":0,"590":0,"595":0,"596":0,"599":0,"616":0,"621":0,"622":0,"623":0,"625":0,"626":0,"627":0,"628":0,"631":0,"632":0,"634":0,"635":0,"636":0,"641":0,"642":0,"645":0,"657":0,"661":0,"662":0,"664":0,"665":0,"666":0,"667":0,"682":0,"686":0,"687":0,"689":0,"691":0,"692":0,"693":0,"697":0,"699":0,"700":0,"701":0,"703":0,"705":0,"724":0,"727":0,"731":0,"732":0,"733":0,"734":0,"737":0,"743":0,"760":0,"763":0,"778":0,"785":0,"786":0,"798":0,"801":0,"802":0,"803":0,"806":0,"819":0,"820":0,"821":0,"824":0,"826":0,"843":0,"856":0};
_yuitest_coverage["build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js"].functions = {"FocusManager:13":0,"initializer:44":0,"destructor:51":0,"(anonymous 2):66":0,"ascend:57":0,"descend:76":0,"first:90":0,"last:110":0,"next:129":0,"previous:166":0,"(anonymous 3):206":0,"refresh:201":0,"_attachEvents:217":0,"_detachEvents:231":0,"(anonymous 4):252":0,"_getActiveContainer:235":0,"_getAnchoredContainerSelector:260":0,"_getAnchoredItemSelector:274":0,"_afterActiveItemChange:284":0,"_afterBlur:301":0,"_afterFocus:305":0,"_onKeyDown:313":0,"valueFn:340":0,"initializer:436":0,"destructor:465":0,"first:481":0,"focusInitialItem:510":0,"last:536":0,"next:568":0,"previous:615":0,"setFirstFocus:656":0,"(anonymous 5):702":0,"setSelectText:681":0,"(anonymous 6):730":0,"_bindUI:723":0,"(anonymous 7):762":0,"_clearEventhandlers:759":0,"_nodeIsFocusable:777":0,"_retreiveFocus:797":0,"_selectNode:818":0,"setter:842":0,"validator:855":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js"].coveredLines = 222;
_yuitest_coverage["build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js"].coveredFunctions = 43;
_yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 1);
YUI.add('gallery-itsatabkeymanager', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 3);
'use strict';
//==============================================================================
//==============================================================================
 //
// WHILE THE SMUGMUG-FUCUSMANAGER IS NOT IN THE GALLREY, WE NEED TO DEFINE THOSE METHODS HERE
//
// SHOULD BE REMOVED ONCE THE SMUGMUG FOCUSMANAGER IS AVAILABLE IN THE GALLERY
//
//==============================================================================
//==============================================================================
_yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 13);
function FocusManager() {
    _yuitest_coverfunc("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", "FocusManager", 13);
_yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 14);
FocusManager.superclass.constructor.apply(this, arguments);
}

_yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 17);
Y.extend(FocusManager, Y.Plugin.Base, {

    keyCodeMap: {
        32: 'space',
        33: 'pgup',
        34: 'pgdown',
        35: 'end',
        36: 'home',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    },

    preventDefaultMap: {
        down  : 1,
        end   : 1,
        home  : 1,
        left  : 1,
        pgdown: 1,
        pgup  : 1,
        right : 1,
        space : 1,
        up    : 1
    },

    // -- Lifecycle ------------------------------------------------------------
    initializer: function (config) {
        _yuitest_coverfunc("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", "initializer", 44);
_yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 45);
this._host = config.host;

        _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 47);
this._attachEvents();
        _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 48);
this.refresh();
    },

    destructor: function () {
        _yuitest_coverfunc("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", "destructor", 51);
_yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 52);
this._detachEvents();
    },

    // -- Public Methods -------------------------------------------------------

    ascend: function () {
        _yuitest_coverfunc("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", "ascend", 57);
_yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 58);
var container = this._getActiveContainer(),
            host      = this._host,
            parentItem;

        _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 62);
if (container === host) {
            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 63);
return null;
        }

        _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 66);
parentItem = container.ancestor(this.get('itemSelector'), false, function (node) {
            // Stop ascending if we reach the host.
            _yuitest_coverfunc("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", "(anonymous 2)", 66);
_yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 68);
return node === host;
        });

        _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 71);
this.set('activeItem', parentItem, {src: 'ascend'});

        _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 73);
return parentItem;
    },

    descend: function () {
        _yuitest_coverfunc("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", "descend", 76);
_yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 77);
var activeItem                = this.get('activeItem'),
            anchoredContainerSelector = this.get('anchoredContainerSelector'),
            container;

        _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 81);
if (!anchoredContainerSelector || !activeItem) {
            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 82);
return null;
        }

        _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 85);
container = activeItem.one(anchoredContainerSelector);

        _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 87);
return container ? this.first({container: container}) : null;
    },

    first: function (options) {
        _yuitest_coverfunc("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", "first", 90);
_yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 91);
options = options || {};

        // Get the first item that isn't disabled.
        _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 94);
var container        = options.container || this.get('host'),
            disabledSelector = this.get('disabledSelector'),
            itemSelector     = this.get('itemSelector'),
            item             = container.one(this.get('anchoredItemSelector'));

        _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 99);
while (item && disabledSelector && item.test(disabledSelector)) {
            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 100);
item = item.next(itemSelector);
        }

        _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 103);
if (!options.silent) {
            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 104);
this.set('activeItem', item, {src: 'first'});
        }

        _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 107);
return item;
    },

    last: function (options) {
        _yuitest_coverfunc("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", "last", 110);
_yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 111);
options = options || {};

        _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 113);
var container        = options.container || this._host,
            disabledSelector = this.get('disabledSelector'),
            items            = container.all(this.get('anchoredItemSelector')),
            item             = items.pop();

        _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 118);
while (item && disabledSelector && item.test(disabledSelector)) {
            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 119);
item = items.pop();
        }

        _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 122);
if (!options.silent) {
            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 123);
this.set('activeItem', item, {src: 'last'});
        }

        _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 126);
return item;
    },

    next: function (options) {
        _yuitest_coverfunc("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", "next", 129);
_yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 130);
options = options || {};

        _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 132);
var activeItem = this.get('activeItem'),
            disabledSelector, itemSelector, nextItem;

        _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 135);
if (!activeItem) {
            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 136);
return null;
        }

        _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 139);
disabledSelector = this.get('disabledSelector');
        _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 140);
itemSelector     = this.get('itemSelector');
        _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 141);
nextItem         = activeItem.next(itemSelector);

        // Get the next sibling that matches the itemSelector and isn't
        // disabled.
        _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 145);
while (nextItem && disabledSelector && nextItem.test(disabledSelector)) {
            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 146);
nextItem = nextItem.next(itemSelector);
        }

        _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 149);
if (nextItem) {
            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 150);
if (!options.silent) {
                _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 151);
this.set('activeItem', nextItem, {src: 'next'});
            }
        } else {
            // If there is no next sibling and the `circular` attribute is
            // truthy, then focus the first item in this container.
            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 156);
if (this.get('circular')) {
                _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 157);
nextItem = this.first(Y.merge(options, {
                    container: this._getActiveContainer(activeItem)
                }));
            }
        }

        _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 163);
return nextItem || activeItem;
    },

    previous: function (options) {
        _yuitest_coverfunc("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", "previous", 166);
_yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 167);
options = options || {};

        _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 169);
var activeItem = this.get('activeItem'),
            disabledSelector, itemSelector, prevItem;

        _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 172);
if (!activeItem) {
            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 173);
return null;
        }

        _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 176);
disabledSelector = this.get('disabledSelector');
        _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 177);
itemSelector     = this.get('itemSelector');
        _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 178);
prevItem         = activeItem.previous(itemSelector);

        // Get the previous sibling that matches the itemSelector and isn't
        // disabled.
        _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 182);
while (prevItem && disabledSelector && prevItem.test(disabledSelector)) {
            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 183);
prevItem = prevItem.previous(itemSelector);
        }

        _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 186);
if (prevItem) {
            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 187);
if (!options.silent) {
                _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 188);
this.set('activeItem', prevItem, {src: 'previous'});
            }
        } else {
            // If there is no previous sibling and the `circular` attribute is
            // truthy, then focus the last item in this container.
            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 193);
prevItem = this.last(Y.merge(options, {
                container: this._getActiveContainer(activeItem)
            }));
        }

        _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 198);
return prevItem || activeItem;
    },

    refresh: function (container) {
        _yuitest_coverfunc("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", "refresh", 201);
_yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 202);
var activeItem       = this.get('activeItem'),
            disabledSelector = this.get('disabledSelector'),
            itemSelector     = this.get(container ? 'anchoredItemSelector' : 'itemSelector');

        _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 206);
(container || this._host).all(itemSelector).each(function (node) {
            _yuitest_coverfunc("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", "(anonymous 3)", 206);
_yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 207);
if (disabledSelector && node.test(disabledSelector)) {
                _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 208);
node.removeAttribute('tabIndex');
            } else {
                _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 210);
node.set('tabIndex', node === activeItem ? 0 : -1);
            }
        });

        _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 214);
return this;
    },

    _attachEvents: function () {
        _yuitest_coverfunc("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", "_attachEvents", 217);
_yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 218);
var host = this._host;

        _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 220);
this._events = [
            host.on('keydown', this._onKeyDown, this),
            host.after('blur', this._afterBlur, this),
            host.after('focus', this._afterFocus, this),

            this.after({
                activeItemChange: this._afterActiveItemChange
            })
        ];
    },

    _detachEvents: function () {
        _yuitest_coverfunc("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", "_detachEvents", 231);
_yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 232);
new Y.EventHandle(this._events).detach();
    },

    _getActiveContainer: function (activeItem) {
        _yuitest_coverfunc("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", "_getActiveContainer", 235);
_yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 236);
var containerSelector = this.get('containerSelector'),
            host              = this._host,
            container;

        _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 240);
if (!containerSelector) {
            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 241);
return host;
        }

        _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 244);
if (!activeItem) {
            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 245);
activeItem = this.get('activeItem');
        }

        _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 248);
if (!activeItem) {
            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 249);
return host;
        }

        _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 252);
container = activeItem.ancestor(containerSelector, false, function (node) {
            // Stop the search if we reach the host node.
            _yuitest_coverfunc("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", "(anonymous 4)", 252);
_yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 254);
return node === host;
        });

        _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 257);
return container || host;
    },

    _getAnchoredContainerSelector: function (value) {
        _yuitest_coverfunc("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", "_getAnchoredContainerSelector", 260);
_yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 261);
if (value) {
            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 262);
return value;
        }

        _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 265);
var containerSelector = this.get('containerSelector');

        _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 267);
if (containerSelector) {
            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 268);
return '>' + containerSelector;
        }

        _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 271);
return null;
    },

    _getAnchoredItemSelector: function (value) {
        _yuitest_coverfunc("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", "_getAnchoredItemSelector", 274);
_yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 275);
if (value) {
            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 276);
return value;
        }

        _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 279);
return '>' + this.get('itemSelector');
    },

    // -- Protected Event Handlers ---------------------------------------------

    _afterActiveItemChange: function (e) {
        _yuitest_coverfunc("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", "_afterActiveItemChange", 284);
_yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 285);
var newVal  = e.newVal,
            prevVal = e.prevVal;

        _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 288);
if (prevVal) {
            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 289);
prevVal.set('tabIndex', -1);
        }

        _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 292);
if (newVal) {
            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 293);
newVal.set('tabIndex', 0);

            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 295);
if (this.get('focused')) {
                _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 296);
newVal.focus();
            }
        }
    },

    _afterBlur: function () {
        _yuitest_coverfunc("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", "_afterBlur", 301);
_yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 302);
this._set('focused', false);
    },

    _afterFocus: function (e) {
        _yuitest_coverfunc("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", "_afterFocus", 305);
_yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 306);
var target = e.target;
        _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 307);
this._set('focused', true);
        _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 308);
if (target !== this._host && target.test(this.get('itemSelector'))) {
            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 309);
this.set('activeItem', target, {src: 'focus'});
        }
    },

    _onKeyDown: function (e) {
        _yuitest_coverfunc("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", "_onKeyDown", 313);
_yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 314);
if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) {
            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 315);
return;
        }

        _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 318);
var key    = this.keyCodeMap[e.keyCode] || e.keyCode,
            keys   = this.get('keys'),
            action = keys[key] || keys[e.keyCode];

        _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 322);
if (action) {
            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 323);
if (this.preventDefaultMap[key]) {
                _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 324);
e.preventDefault();
            }

            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 327);
if (typeof action === 'string') {
                _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 328);
this[action].call(this);
            } else {
                _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 330);
action.call(this);
            }
        }
    }
}, {
    NAME: 'focusManager',
    NS  : 'focusManager',

    ATTRS: {
        activeItem: {
            valueFn: function () {
                // TODO: Need to be smarter about choosing the default
                // activeItem. Old FocusManager defaults to the first item with
                // tabIndex === 0, if there is one.
                _yuitest_coverfunc("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", "valueFn", 340);
_yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 344);
return this.first();
            }
        },

        anchoredContainerSelector: {
            getter: '_getAnchoredContainerSelector'
        },

        anchoredItemSelector: {
            getter: '_getAnchoredItemSelector'
        },

        circular: {
            value: true
        },

        containerSelector: {},

        disabledSelector: {
            value: '[aria-disabled="true"], [aria-hidden="true"], [disabled]'
        },

        focused: {
            readOnly: true,
            value   : false
        },

        itemSelector: {
            value: '*'
        },

        keys: {
            cloneDefaultValue: 'shallow',

            value: {
                down : 'next',
                left : 'ascend',
                right: 'descend',
                up   : 'previous'
            }
        }
    }
});

_yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 388);
Y.namespace('Plugin').FocusManager = FocusManager;
//==============================================================================
//==============================================================================
 //
// END OF DEFINITION SMUGMUG FOCUSMANAGER
//
//==============================================================================
//==============================================================================

/**
 * ITSAScrollViewKeyNav Plugin
 *
 *
 * Plugin that <b>extends gallery-sm-focusmanager</b> by navigate with TAB and Shift-TAB.
 * The plugin needs to be done on a container-Node. By default focusing is done with nodes that have the class <b>'.focusable'</b>,
 * but this can be overruled with the attribite 'itemSelector'.
 *
 *
 * @module gallery-itsatabkeymanager
 * @class ITSATabKeyManager
 * @extends Plugin.FocusManager
 * @constructor
 * @since 0.1
 *
 * <i>Copyright (c) 2013 Marco Asbreuk - http://itsasbreuk.nl</i>
 * YUI BSD License - http://developer.yahoo.com/yui/license.html
 *
*/

// -- Public Static Properties -------------------------------------------------

_yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 419);
var YArray = Y.Array,
    DEFAULT_ITEM_SELECTOR = '.focusable',
    YUI_PRIMARYBUTTON_CLASS = 'yui3-button-primary',
    FORMELEMENT_CLASS = 'yui3-itsaformelement',
    ITSAFORMELEMENT_SELECTONFOCUS_CLASS = FORMELEMENT_CLASS + '-selectall',
    ITSAFORMELEMENT_FIRSTFOCUS_CLASS = FORMELEMENT_CLASS + '-firstfocus';


_yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 427);
Y.namespace('Plugin').ITSATabKeyManager = Y.Base.create('itsatabkeymanager', Y.Plugin.FocusManager, [], {

        /**
         * Sets up the toolbar during initialisation. Calls render() as soon as the hosts-editorframe is ready
         *
         * @method initializer
         * @protected
         * @since 0.1
         */
        initializer : function() {
            _yuitest_coverfunc("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", "initializer", 436);
_yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 437);
var instance = this,
                host;

            /**
             * Internal list that holds event-references
             * @property _eventhandlers
             * @private
             * @type Array
             */
            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 446);
instance._eventhandlers = [];

            /**
             * The plugin's host, which should be a ScrollView-instance
             * @property host
             * @type Y.Node
             */
            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 453);
instance.host = host = instance.get('host');
            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 454);
instance._bindUI();
            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 455);
instance.set('keys', {});
            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 456);
instance.set('circular', true);
        },

        /**
         * Cleans up bindings and removes plugin
         * @method destructor
         * @protected
         * @since 0.1
        */
        destructor : function() {
            _yuitest_coverfunc("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", "destructor", 465);
_yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 466);
this._clearEventhandlers();
        },

        /**
         * Focuses and returns the first focusable item.
         *
         * @method first
         * @param {Object} [options] Options.
         *   @param {Node} [options.container] Descendant container to restrict the
         *       search to. Defaults to the host node.
         *   @param {Boolean} [options.silent=false] If `true`, the item will be
         *       returned, but will not become the active item.
         * @return {Node|null} Focused node, or `null` if there are no focusable items.
        **/

        first: function (options) {
            _yuitest_coverfunc("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", "first", 481);
_yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 482);
options = options || {};

            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 484);
var instance         = this,
                container        = (options && options.container) || instance.host,
                disabledSelector = instance.get('disabledSelector'),
                itemSelector     = (options && options.selector) || instance.get('itemSelector'),
                item             = container.one(itemSelector),
                i                = 0,
                allItems;

            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 492);
while (item && disabledSelector && item.test(disabledSelector)) {
                _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 493);
allItems = allItems || container.all(itemSelector);
                _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 494);
item = (++i<allItems.size()) ? allItems.item(i) : null;
            }
            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 496);
if (!options.silent) {
                _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 497);
instance.set('activeItem', item, {src: 'first'});
            }
            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 499);
return item;

        },

        /**
         * Focus the initial node (first node that should be selected)
         *
         * @method focusInitialItem
         * @since 0.1
         *
        */
        focusInitialItem : function() {
            _yuitest_coverfunc("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", "focusInitialItem", 510);
_yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 511);
var instance = this,
                focusitem, widgetbd, widgetft;

            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 514);
focusitem = instance.first({selector: '.'+ITSAFORMELEMENT_FIRSTFOCUS_CLASS}) ||
                        instance.first({selector: '.'+YUI_PRIMARYBUTTON_CLASS}) ||
                        ((widgetbd=instance.host.one('.yui3-widget-bd')) ? instance.first({container: widgetbd}) : null) ||
                        ((widgetft=instance.host.one('.yui3-widget-ft')) ? instance.first({container: widgetft}) : null) ||
                        instance.first();
            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 519);
if (focusitem) {
                _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 520);
focusitem.focus();
                _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 521);
instance._selectNode(focusitem);
            }
        },

        /**
         * Focuses and returns the last focusable item.
         *
         * @method last
         * @param {Object} [options] Options.
         *     @param {Node} [options.container] Descendant container to restrict the
         *         search to. Defaults to the host node.
         *     @param {Boolean} [options.silent=false] If `true`, the item will be
         *         returned, but will not become the active item.
         * @return {Node|null} Focused node, or `null` if there are no focusable items.
        **/
        last: function (options) {
            _yuitest_coverfunc("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", "last", 536);
_yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 537);
var instance         = this,
                container        = (options && options.container) || instance.host,
                disabledSelector = instance.get('disabledSelector'),
                allItems         = container.all(instance.get('itemSelector')),
                i                = allItems.size() - 1,
                item             = allItems.pop();

            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 544);
options = options || {};
            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 545);
while (item && disabledSelector && item.test(disabledSelector)) {
                _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 546);
item = (--i>=0) ? allItems.item(i) : null;
            }

            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 549);
if (!options.silent) {
                _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 550);
instance.set('activeItem', item, {src: 'last'});
            }

            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 553);
return item;
        },

        /**
         * Focuses and returns the next focusable sibling of the current `activeItem`.
         *
         * If there is no focusable next sibling and the `circular` attribute is
        `* false`, the current `activeItem` will be returned.
         *
         * @method next
         * @param {Object} [options] Options.
         *     @param {Boolean} [options.silent=false] If `true`, the item will be
         *         returned, but will not become the active item.
         * @return {Node|null} Focused node, or `null` if there is no `activeItem`.
        **/
        next: function (options) {
            _yuitest_coverfunc("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", "next", 568);
_yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 569);
var instance         = this,
                container        = (options && options.container) || instance.host,
                activeItem       = instance.get('activeItem'),
                disabledSelector, nextItem, index, itemSize, allItems;

            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 574);
options = options || {};
            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 575);
if (!activeItem) {
                _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 576);
return instance.first(options);
            }
            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 578);
disabledSelector = instance.get('disabledSelector');
            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 579);
allItems = container.all(instance.get('itemSelector'));
            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 580);
itemSize = allItems.size();
            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 581);
index = allItems.indexOf(activeItem);
            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 582);
nextItem = (++index<itemSize) ? allItems.item(index) : null;
            // Get the next item that matches the itemSelector and isn't
            // disabled.
            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 585);
while (nextItem && disabledSelector && nextItem.test(disabledSelector)) {
                _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 586);
nextItem = (++index<itemSize) ? allItems.item(index) : null;
            }
            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 588);
if (nextItem) {
                _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 589);
if (!options.silent) {
                    _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 590);
this.set('activeItem', nextItem, {src: 'next'});
                }
            } else {
                // If there is no next item and the `circular` attribute is
                // truthy, then focus the first item in this container.
                _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 595);
if (this.get('circular')) {
                    _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 596);
nextItem = instance.first(options);
                }
            }
            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 599);
return nextItem || activeItem;
        },

        /**
         * Focuses and returns the previous focusable sibling of the current
         * `activeItem`.
         *
         * If there is no focusable previous sibling and the `circular` attribute is
         * `false`, the current `activeItem` will be returned.
         *
         * @method previous
         * @param {Object} [options] Options.
         *     @param {Boolean} [options.silent=false] If `true`, the item will be
         *         returned, but will not become the active item.
         * @return {Node|null} Focused node, or `null` if there is no `activeItem`.
        **/
        previous: function (options) {
            _yuitest_coverfunc("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", "previous", 615);
_yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 616);
var instance         = this,
                container        = (options && options.container) || instance.host,
                activeItem       = instance.get('activeItem'),
                disabledSelector, prevItem, index, allItems;

            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 621);
options = options || {};
            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 622);
if (!activeItem) {
                _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 623);
return instance.first(options);
            }
            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 625);
disabledSelector = instance.get('disabledSelector');
            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 626);
allItems = container.all(instance.get('itemSelector'));
            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 627);
index = allItems.indexOf(activeItem);
            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 628);
prevItem = (--index>=0) ? allItems.item(index) : null;
            // Get the next item that matches the itemSelector and isn't
            // disabled.
            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 631);
while (prevItem && disabledSelector && prevItem.test(disabledSelector)) {
                _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 632);
prevItem = (--index>=0) ? allItems.item(index) : null;
            }
            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 634);
if (prevItem) {
                _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 635);
if (!options.silent) {
                    _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 636);
this.set('activeItem', prevItem, {src: 'previous'});
                }
            } else {
                // If there is no next item and the `circular` attribute is
                // truthy, then focus the first item in this container.
                _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 641);
if (this.get('circular')) {
                    _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 642);
prevItem = instance.last(options);
                }
            }
            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 645);
return prevItem || activeItem;
        },

        /**
         * Sets the specified Node as the node that should retreive first focus.
         * (=first focus once the container gets focus and no element has focus yet)
         *
         * @method retreiveFocus
         * @param node {Y.Node|String} the Node that should gain first focus. Has to be inside the host (container) and focusable.
         * @since 0.1
        */
        setFirstFocus : function(node) {
            _yuitest_coverfunc("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", "setFirstFocus", 656);
_yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 657);
var instance = this,
                container = instance.host,
                nodeisfocusable;

            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 661);
if (typeof node === 'string') {
                _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 662);
node = Y.one(node);
            }
            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 664);
nodeisfocusable = node && instance._nodeIsFocusable(node);
            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 665);
if (nodeisfocusable) {
                _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 666);
container.all('.'+ITSAFORMELEMENT_FIRSTFOCUS_CLASS).removeClass(ITSAFORMELEMENT_FIRSTFOCUS_CLASS);
                _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 667);
node.addClass(ITSAFORMELEMENT_FIRSTFOCUS_CLASS);
            }
        },

        /**
         * Makes the Node to be in a state that all text will be selected once the Node gets Focus. Enables or disables the state.
         * Be aware that this has only effect on Nodes of the type: <b>'input[type=text], input[type=password], textarea'</b>.
         *
         * @method setSelectText
         * @param select {Boolean} whether the 'selectall' option is active or not
         * @param [node] {Y.Node|String} the Node, Nodelist or Selector of the nodes to be set. Has to be inside the host (container) and focusable.
                  If undefined, than the new setting will be applyable to all focusable text-Nodes.
         * @since 0.1
        */
        setSelectText : function(select, node) {
            _yuitest_coverfunc("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", "setSelectText", 681);
_yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 682);
var instance = this,
                container = instance.host,
                nodeisfocusable, itemSelector, disabledSelector, allNodes;

            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 686);
if (typeof node === 'string') {
                _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 687);
node = Y.all(node);
            }
            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 689);
if (node && (node instanceof Y.Node)) {
                // only 1 node needs to be set
                _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 691);
nodeisfocusable = instance._nodeIsFocusable(node);
                _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 692);
if (nodeisfocusable && node.test('input[type=text], input[type=password], textarea')) {
                    _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 693);
node.toggleClass(ITSAFORMELEMENT_SELECTONFOCUS_CLASS, select);
                }
            }
            else {
                _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 697);
allNodes = node || container.all(itemSelector);
                // allNodes need to be set --> this is a NodeList
                _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 699);
itemSelector = instance.get('itemSelector');
                _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 700);
disabledSelector = instance.get('disabledSelector');
                _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 701);
allNodes.each(
                    function(oneNode) {
                        _yuitest_coverfunc("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", "(anonymous 5)", 702);
_yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 703);
if (oneNode.test('input[type=text], input[type=password], textarea') &&
                            (!disabledSelector || !oneNode.test(disabledSelector))) {
                            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 705);
oneNode.toggleClass(ITSAFORMELEMENT_SELECTONFOCUS_CLASS, select);
                        }
                    }
                );
            }
        },

        //===============================================================================================
        // private methods
        //===============================================================================================

        /**
         * Binding events
         *
         * @method _bindUI
         * @private
         * @since 0.1
        */
        _bindUI : function() {
            _yuitest_coverfunc("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", "_bindUI", 723);
_yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 724);
var instance = this,
                host = instance.host;

            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 727);
instance._eventhandlers.push(
                host.on(
                    'keydown',
                    function(e) {
                        _yuitest_coverfunc("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", "(anonymous 6)", 730);
_yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 731);
if (e.keyCode === 9) { // tab
                            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 732);
e.preventDefault();
                            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 733);
if (e.shiftKey) {
                                _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 734);
instance.previous();
                            }
                            else {
                                _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 737);
instance.next();
                            }
                        }
                    }
                )
            );
            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 743);
instance._eventhandlers.push(
                host.after(
                    'click',
                    Y.rbind(instance._retreiveFocus, instance)
                )
            );
        },

        /**
         * Cleaning up all eventlisteners
         *
         * @method _clearEventhandlers
         * @private
         * @since 0.1
         *
        */
        _clearEventhandlers : function() {
            _yuitest_coverfunc("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", "_clearEventhandlers", 759);
_yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 760);
YArray.each(
                this._eventhandlers,
                function(item){
                    _yuitest_coverfunc("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", "(anonymous 7)", 762);
_yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 763);
item.detach();
                }
            );
        },

        /**
         * Checks whether a node is focusable within the host-container.
         *
         * @method _nodeIsFocusable
         * @param node {Y.Node} the node to check if it's a focusable node within the host-container.
         * @private
         * @return {Boolean} focusable or not
         * @since 0.1
        */
        _nodeIsFocusable : function(node) {
            _yuitest_coverfunc("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", "_nodeIsFocusable", 777);
_yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 778);
var instance            = this,
                container           = instance.host,
                disabledSelector    = instance.get('disabledSelector'),
                itemSelector        = instance.get('itemSelector'),
                nodeInsideContainer = node && container.contains(node),
                isFocusable;

            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 785);
isFocusable = (nodeInsideContainer && node.test(itemSelector) && (!disabledSelector || !node.test(disabledSelector)));
            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 786);
return isFocusable;
        },

        /**
         * Retreive the focus agian on the 'activeItem', or -when none- on the initial Item.
         * Is called when the host-node gets focus.
         *
         * @method _retreiveFocus
         * @private
         * @since 0.1
        */
        _retreiveFocus : function() {
            _yuitest_coverfunc("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", "_retreiveFocus", 797);
_yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 798);
var instance   = this,
                activeItem = instance.get('activeItem');

            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 801);
if (activeItem) {
                _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 802);
activeItem.focus();
                _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 803);
instance._selectNode(activeItem);
            }
            else {
                _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 806);
instance.focusInitialItem();
            }
        },

        /**
         * Selects the text inside the Node, or repositions the cursor to the end.
         *
         * @method _selectNode
         * @private
         * @since 0.1
         *
        */
        _selectNode : function(node) {
            _yuitest_coverfunc("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", "_selectNode", 818);
_yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 819);
if (node && node.test('input[type=text], input[type=password], textarea')) {
                _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 820);
if (node.hasClass(ITSAFORMELEMENT_SELECTONFOCUS_CLASS)) {
                    _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 821);
node.select();
                }
                else {
                    _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 824);
node.set('selectionStart', node.get('value').length);
                    // set 'scrollTop' high to make Chrome scroll the last character into view
                    _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 826);
node.set('scrollTop', 999999);
                }
            }
        }

    }, {
        NS : 'itsatabkeymanager',
        ATTRS : {
            /**
             * Node that's currently either focused or focusable as part of the
             * document's tab flow. Overridden because we need a different valueFn.
             *
             * @attribute {Node|null} activeItem
            **/
            activeItem: {
                value: null,
                setter: function(val) {
                    _yuitest_coverfunc("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", "setter", 842);
_yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 843);
this._selectNode(val);
                }
            },
            /**
             * Non-anchored CSS selector that matches item nodes that should be
             * focusable.
             *
             * @attribute {String} itemSelector
             * @default '.focusable'
            **/
            itemSelector: {
                value: DEFAULT_ITEM_SELECTOR,
                validator:  function(v) {
                    _yuitest_coverfunc("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", "validator", 855);
_yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 856);
return typeof v === 'string';
                }
            }
        }
    }
);


}, '@VERSION@', {
    "requires": [
        "yui-base",
        "oop",
        "base-base",
        "base-build",
        "event-custom",
        "plugin",
        "node-pluginhost",
        "event-focus",
        "selector-css3"
    ]
});
