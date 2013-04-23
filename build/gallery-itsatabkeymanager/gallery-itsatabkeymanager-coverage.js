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
_yuitest_coverage["build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js"].code=["YUI.add('gallery-itsatabkeymanager', function (Y, NAME) {","","'use strict';","//==============================================================================","//=============================================================================="," //","// WHILE THE SMUGMUG-FUCUSMANAGER IS NOT IN THE GALLREY, WE NEED TO DEFINE THOSE METHODS HERE","//","// SHOULD BE REMOVED ONCE THE SMUGMUG FOCUSMANAGER IS AVAILABLE IN THE GALLERY","//","//==============================================================================","//==============================================================================","function FocusManager() {","    FocusManager.superclass.constructor.apply(this, arguments);","}","","Y.extend(FocusManager, Y.Plugin.Base, {","","    keyCodeMap: {","        32: 'space',","        33: 'pgup',","        34: 'pgdown',","        35: 'end',","        36: 'home',","        37: 'left',","        38: 'up',","        39: 'right',","        40: 'down'","    },","","    preventDefaultMap: {","        down  : 1,","        end   : 1,","        home  : 1,","        left  : 1,","        pgdown: 1,","        pgup  : 1,","        right : 1,","        space : 1,","        up    : 1","    },","","    // -- Lifecycle ------------------------------------------------------------","    initializer: function (config) {","        this._host = config.host;","","        this._attachEvents();","        this.refresh();","    },","","    destructor: function () {","        this._detachEvents();","    },","","    // -- Public Methods -------------------------------------------------------","","    ascend: function () {","        var container = this._getActiveContainer(),","            host      = this._host,","            parentItem;","","        if (container === host) {","            return null;","        }","","        parentItem = container.ancestor(this.get('itemSelector'), false, function (node) {","            // Stop ascending if we reach the host.","            return node === host;","        });","","        this.set('activeItem', parentItem, {src: 'ascend'});","","        return parentItem;","    },","","    descend: function () {","        var activeItem                = this.get('activeItem'),","            anchoredContainerSelector = this.get('anchoredContainerSelector'),","            container;","","        if (!anchoredContainerSelector || !activeItem) {","            return null;","        }","","        container = activeItem.one(anchoredContainerSelector);","","        return container ? this.first({container: container}) : null;","    },","","    first: function (options) {","        options = options || {};","","        // Get the first item that isn't disabled.","        var container        = options.container || this.get('host'),","            disabledSelector = this.get('disabledSelector'),","            itemSelector     = this.get('itemSelector'),","            item             = container.one(this.get('anchoredItemSelector'));","","        while (item && disabledSelector && item.test(disabledSelector)) {","            item = item.next(itemSelector);","        }","","        if (!options.silent) {","            this.set('activeItem', item, {src: 'first'});","        }","","        return item;","    },","","    last: function (options) {","        options = options || {};","","        var container        = options.container || this._host,","            disabledSelector = this.get('disabledSelector'),","            items            = container.all(this.get('anchoredItemSelector')),","            item             = items.pop();","","        while (item && disabledSelector && item.test(disabledSelector)) {","            item = items.pop();","        }","","        if (!options.silent) {","            this.set('activeItem', item, {src: 'last'});","        }","","        return item;","    },","","    next: function (options) {","        options = options || {};","","        var activeItem = this.get('activeItem'),","            disabledSelector, itemSelector, nextItem;","","        if (!activeItem) {","            return null;","        }","","        disabledSelector = this.get('disabledSelector');","        itemSelector     = this.get('itemSelector');","        nextItem         = activeItem.next(itemSelector);","","        // Get the next sibling that matches the itemSelector and isn't","        // disabled.","        while (nextItem && disabledSelector && nextItem.test(disabledSelector)) {","            nextItem = nextItem.next(itemSelector);","        }","","        if (nextItem) {","            if (!options.silent) {","                this.set('activeItem', nextItem, {src: 'next'});","            }","        } else {","            // If there is no next sibling and the `circular` attribute is","            // truthy, then focus the first item in this container.","            if (this.get('circular')) {","                nextItem = this.first(Y.merge(options, {","                    container: this._getActiveContainer(activeItem)","                }));","            }","        }","","        return nextItem || activeItem;","    },","","    previous: function (options) {","        options = options || {};","","        var activeItem = this.get('activeItem'),","            disabledSelector, itemSelector, prevItem;","","        if (!activeItem) {","            return null;","        }","","        disabledSelector = this.get('disabledSelector');","        itemSelector     = this.get('itemSelector');","        prevItem         = activeItem.previous(itemSelector);","","        // Get the previous sibling that matches the itemSelector and isn't","        // disabled.","        while (prevItem && disabledSelector && prevItem.test(disabledSelector)) {","            prevItem = prevItem.previous(itemSelector);","        }","","        if (prevItem) {","            if (!options.silent) {","                this.set('activeItem', prevItem, {src: 'previous'});","            }","        } else {","            // If there is no previous sibling and the `circular` attribute is","            // truthy, then focus the last item in this container.","            prevItem = this.last(Y.merge(options, {","                container: this._getActiveContainer(activeItem)","            }));","        }","","        return prevItem || activeItem;","    },","","    refresh: function (container) {","        var activeItem       = this.get('activeItem'),","            disabledSelector = this.get('disabledSelector'),","            itemSelector     = this.get(container ? 'anchoredItemSelector' : 'itemSelector');","","        (container || this._host).all(itemSelector).each(function (node) {","            if (disabledSelector && node.test(disabledSelector)) {","                node.removeAttribute('tabIndex');","            } else {","                node.set('tabIndex', node === activeItem ? 0 : -1);","            }","        });","","        return this;","    },","","    _attachEvents: function () {","        var host = this._host;","","        this._events = [","            host.on('keydown', this._onKeyDown, this),","            host.after('blur', this._afterBlur, this),","            host.after('focus', this._afterFocus, this),","","            this.after({","                activeItemChange: this._afterActiveItemChange","            })","        ];","    },","","    _detachEvents: function () {","        new Y.EventHandle(this._events).detach();","    },","","    _getActiveContainer: function (activeItem) {","        var containerSelector = this.get('containerSelector'),","            host              = this._host,","            container;","","        if (!containerSelector) {","            return host;","        }","","        if (!activeItem) {","            activeItem = this.get('activeItem');","        }","","        if (!activeItem) {","            return host;","        }","","        container = activeItem.ancestor(containerSelector, false, function (node) {","            // Stop the search if we reach the host node.","            return node === host;","        });","","        return container || host;","    },","","    _getAnchoredContainerSelector: function (value) {","        if (value) {","            return value;","        }","","        var containerSelector = this.get('containerSelector');","","        if (containerSelector) {","            return '>' + containerSelector;","        }","","        return null;","    },","","    _getAnchoredItemSelector: function (value) {","        if (value) {","            return value;","        }","","        return '>' + this.get('itemSelector');","    },","","    // -- Protected Event Handlers ---------------------------------------------","","    _afterActiveItemChange: function (e) {","        var newVal  = e.newVal,","            prevVal = e.prevVal;","","        if (prevVal) {","            prevVal.set('tabIndex', -1);","        }","","        if (newVal) {","            newVal.set('tabIndex', 0);","","            if (this.get('focused')) {","                newVal.focus();","            }","        }","    },","","    _afterBlur: function () {","        this._set('focused', false);","    },","","    _afterFocus: function (e) {","        var target = e.target;","        this._set('focused', true);","        if (target !== this._host && target.test(this.get('itemSelector'))) {","            this.set('activeItem', target, {src: 'focus'});","        }","    },","","    _onKeyDown: function (e) {","        if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) {","            return;","        }","","        var key    = this.keyCodeMap[e.keyCode] || e.keyCode,","            keys   = this.get('keys'),","            action = keys[key] || keys[e.keyCode];","","        if (action) {","            if (this.preventDefaultMap[key]) {","                e.preventDefault();","            }","","            if (typeof action === 'string') {","                this[action].call(this);","            } else {","                action.call(this);","            }","        }","    }","}, {","    NAME: 'focusManager',","    NS  : 'focusManager',","","    ATTRS: {","        activeItem: {","            valueFn: function () {","                // TODO: Need to be smarter about choosing the default","                // activeItem. Old FocusManager defaults to the first item with","                // tabIndex === 0, if there is one.","                return this.first();","            }","        },","","        anchoredContainerSelector: {","            getter: '_getAnchoredContainerSelector'","        },","","        anchoredItemSelector: {","            getter: '_getAnchoredItemSelector'","        },","","        circular: {","            value: true","        },","","        containerSelector: {},","","        disabledSelector: {","            value: '[aria-disabled=\"true\"], [aria-hidden=\"true\"], [disabled]'","        },","","        focused: {","            readOnly: true,","            value   : false","        },","","        itemSelector: {","            value: '*'","        },","","        keys: {","            cloneDefaultValue: 'shallow',","","            value: {","                down : 'next',","                left : 'ascend',","                right: 'descend',","                up   : 'previous'","            }","        }","    }","});","","Y.namespace('Plugin').FocusManager = FocusManager;","//==============================================================================","//=============================================================================="," //","// END OF DEFINITION SMUGMUG FOCUSMANAGER","//","//==============================================================================","//==============================================================================","","/**"," * ITSAScrollViewKeyNav Plugin"," *"," *"," * Plugin that enables scrollview-navigation with keys."," *"," * In order to response to key-events, the scrollview-instance needs to have focus. This can be set either by myScrollView.focus() -or blur()-"," * or by setting the attribute 'initialFocus' to true. The plugin also works when Plugin.ScrollViewPaginator is plugged-in. The behaviour will be"," * different, because the scrolling is paginated in that case."," *"," *"," * If this plugin is plugged into a Y.ITSAScrollViewModellist-instance, then the keynavigation will scroll through the items in case"," * the attribute 'modelsSelectable' is set to true."," *"," *"," * @module gallery-itsascrollviewkeynav"," * @class ITSAScrollViewKeyNav"," * @extends Plugin.Base"," * @constructor"," * @since 0.1"," *"," * <i>Copyright (c) 2013 Marco Asbreuk - http://itsasbreuk.nl</i>"," * YUI BSD License - http://developer.yahoo.com/yui/license.html"," *","*/","","// -- Public Static Properties -------------------------------------------------","","/**"," * Internal list that holds event-references"," * @property _eventhandlers"," * @private"," * @type Array"," */","","/**"," * The plugin's host, which should be a ScrollView-instance"," * @property host"," * @type ScrollView-instance"," */","","var YArray = Y.Array,","    DEFAULT_ITEM_SELECTOR = '.focusable',","    FORMELEMENT_CLASS = 'yui3-itsaformelement',","    ITSAFORMELEMENT_SELECTONFOCUS_CLASS = FORMELEMENT_CLASS + '-selectall',","    ITSAFORMELEMENT_FIRSTFOCUS_CLASS = FORMELEMENT_CLASS + '-firstfocus';","","","Y.namespace('Plugin').ITSATabKeyManager = Y.Base.create('itsatabkeymanager', Y.Plugin.FocusManager, [], {","","        /**","         * Internal list that holds event-references","         * @property _eventhandlers","         * @private","         * @type Array","         */","        _eventhandlers : [],","","        /**","         * The plugin's host, which should be a ScrollView-instance","         * @property host","         * @type Y.Node","         */","        host : null,","","        /**","         * Sets up the toolbar during initialisation. Calls render() as soon as the hosts-editorframe is ready","         *","         * @method initializer","         * @protected","         * @since 0.1","         */","        initializer : function() {","            var instance = this,","                host;","","            instance.host = host = instance.get('host');","            instance._bindUI();","            instance.set('keys', {});","            instance.set('circular', true);","        },","","        /**","         * Cleans up bindings and removes plugin","         * @method destructor","         * @protected","         * @since 0.1","        */","        destructor : function() {","            this._clearEventhandlers();","        },","","        /**","         * Focuses and returns the first focusable item.","         *","         * @method first","         * @param {Object} [options] Options.","         *   @param {Node} [options.container] Descendant container to restrict the","         *       search to. Defaults to the host node.","         *   @param {Boolean} [options.silent=false] If `true`, the item will be","         *       returned, but will not become the active item.","         * @return {Node|null} Focused node, or `null` if there are no focusable items.","        **/","","        first: function (options) {","            options = options || {};","","            var instance         = this,","                container        = instance.get('host'),","                disabledSelector = instance.get('disabledSelector'),","                itemSelector     = options.selector || instance.get('itemSelector'),","                item             = container.one(itemSelector),","                i                = 0,","                allItems;","","            while (item && disabledSelector && item.test(disabledSelector)) {","                allItems = allItems || container.all(itemSelector);","                item = (++i<allItems.size()) ? allItems.item(i) : null;","            }","            if (!options.silent) {","                instance.set('activeItem', item, {src: 'first'});","            }","            return item;","","        },","","        /**","         * Focus the initial node (first node that should be selected)","         *","         * @method focusInitialItem","         * @since 0.1","         *","        */","        focusInitialItem : function() {","            var instance = this,","                focusitem;","","            focusitem = instance.first({selector: '.'+ITSAFORMELEMENT_FIRSTFOCUS_CLASS}) || instance.first();","            if (focusitem) {","                focusitem.focus();","                instance._selectNode(focusitem);","            }","        },","","        /**","         * Focuses and returns the last focusable item.","         *","         * @method last","         * @param {Object} [options] Options.","         *     @param {Node} [options.container] Descendant container to restrict the","         *         search to. Defaults to the host node.","         *     @param {Boolean} [options.silent=false] If `true`, the item will be","         *         returned, but will not become the active item.","         * @return {Node|null} Focused node, or `null` if there are no focusable items.","        **/","        last: function (options) {","            var instance         = this,","                container        = instance._host,","                disabledSelector = instance.get('disabledSelector'),","                allItems         = container.all(instance.get('itemSelector')),","                i                = allItems.size() - 1,","                item             = allItems.pop();","","            options = options || {};","            while (item && disabledSelector && item.test(disabledSelector)) {","                item = (--i>=0) ? allItems.item(i) : null;","            }","","            if (!options.silent) {","                instance.set('activeItem', item, {src: 'last'});","            }","","            return item;","        },","","        /**","         * Focuses and returns the next focusable sibling of the current `activeItem`.","         *","         * If there is no focusable next sibling and the `circular` attribute is","        `* false`, the current `activeItem` will be returned.","         *","         * @method next","         * @param {Object} [options] Options.","         *     @param {Boolean} [options.silent=false] If `true`, the item will be","         *         returned, but will not become the active item.","         * @return {Node|null} Focused node, or `null` if there is no `activeItem`.","        **/","        next: function (options) {","            var instance         = this,","                container        = instance._host,","                activeItem       = instance.get('activeItem'),","                disabledSelector, nextItem, index, itemSize, allItems;","","            options = options || {};","            if (!activeItem) {","                return instance.first(options);","            }","            disabledSelector = instance.get('disabledSelector');","            allItems = container.all(instance.get('itemSelector'));","            itemSize = allItems.size();","            index = allItems.indexOf(activeItem);","            nextItem = (++index<itemSize) ? allItems.item(index) : null;","            // Get the next item that matches the itemSelector and isn't","            // disabled.","            while (nextItem && disabledSelector && nextItem.test(disabledSelector)) {","                nextItem = (++index<itemSize) ? allItems.item(index) : null;","            }","            if (nextItem) {","                if (!options.silent) {","                    this.set('activeItem', nextItem, {src: 'next'});","                }","            } else {","                // If there is no next item and the `circular` attribute is","                // truthy, then focus the first item in this container.","                if (this.get('circular')) {","                    nextItem = instance.first(options);","                }","            }","            return nextItem || activeItem;","        },","","        /**","         * Focuses and returns the previous focusable sibling of the current","         * `activeItem`.","         *","         * If there is no focusable previous sibling and the `circular` attribute is","         * `false`, the current `activeItem` will be returned.","         *","         * @method previous","         * @param {Object} [options] Options.","         *     @param {Boolean} [options.silent=false] If `true`, the item will be","         *         returned, but will not become the active item.","         * @return {Node|null} Focused node, or `null` if there is no `activeItem`.","        **/","        previous: function (options) {","            var instance         = this,","                container        = instance._host,","                activeItem       = instance.get('activeItem'),","                disabledSelector, prevItem, index, allItems;","","            options = options || {};","            if (!activeItem) {","                return instance.first(options);","            }","            disabledSelector = instance.get('disabledSelector');","            allItems = container.all(instance.get('itemSelector'));","            index = allItems.indexOf(activeItem);","            prevItem = (--index>=0) ? allItems.item(index) : null;","            // Get the next item that matches the itemSelector and isn't","            // disabled.","            while (prevItem && disabledSelector && prevItem.test(disabledSelector)) {","                prevItem = (--index>=0) ? allItems.item(index) : null;","            }","            if (prevItem) {","                if (!options.silent) {","                    this.set('activeItem', prevItem, {src: 'previous'});","                }","            } else {","                // If there is no next item and the `circular` attribute is","                // truthy, then focus the first item in this container.","                if (this.get('circular')) {","                    prevItem = instance.last(options);","                }","            }","            return prevItem || activeItem;","        },","","        /**","         * Sets the specified Node as the node that should retreive first focus.","         * (=first focus once the container gets focus and no element has focus yet)","         *","         * @method retreiveFocus","         * @param node {Y.Node|String} the Node that should gain first focus. Has to be inside the host (container) and focusable.","         * @since 0.1","        */","        setFirstFocus : function(node) {","            var instance = this,","                container = instance.get('host'),","                nodeisfocusable;","","            if (typeof node === 'string') {","                node = Y.one(node);","            }","            nodeisfocusable = node && instance._nodeIsFocusable(node);","            if (nodeisfocusable) {","                container.all('.'+ITSAFORMELEMENT_FIRSTFOCUS_CLASS).removeClass(ITSAFORMELEMENT_FIRSTFOCUS_CLASS);","                node.addClass(ITSAFORMELEMENT_FIRSTFOCUS_CLASS);","            }","        },","","        /**","         * Makes the Node to be in a state that all text will be selected once the Node gets Focus. Enables or disables the state.","         * Be aware that this has only effect on Nodes of the type: <b>'input[type=text], input[type=password], textarea'</b>.","         *","         * @method setSelectText","         * @param select {Boolean} whether the 'selectall' option is active or not","         * @param [node] {Y.Node|String} the Node, Nodelist or Selector of the nodes to be set. Has to be inside the host (container) and focusable.","                  If undefined, than the new setting will be applyable to all focusable text-Nodes.","         * @since 0.1","        */","        setSelectText : function(select, node) {","            var instance = this,","                container = instance.get('host'),","                nodeisfocusable, itemSelector, disabledSelector, allNodes;","","            if (typeof node === 'string') {","                node = Y.all(node);","            }","            if (node && (node instanceof Y.Node)) {","                // only 1 node needs to be set","                nodeisfocusable = instance._nodeIsFocusable(node);","                if (nodeisfocusable && node.test('input[type=text], input[type=password], textarea')) {","                    node.toggleClass(ITSAFORMELEMENT_SELECTONFOCUS_CLASS, select);","                }","            }","            else {","                allNodes = node || container.all(itemSelector);","                // allNodes need to be set --> this is a NodeList","                itemSelector = instance.get('itemSelector');","                disabledSelector = instance.get('disabledSelector');","                allNodes.each(","                    function(oneNode) {","                        if (oneNode.test('input[type=text], input[type=password], textarea')","                            && (!disabledSelector || !oneNode.test(disabledSelector))) {","                            oneNode.toggleClass(ITSAFORMELEMENT_SELECTONFOCUS_CLASS, select);","                        }","                    }","                );","            }","        },","","        //===============================================================================================","        // private methods","        //===============================================================================================","","        /**","         * Binding events","         *","         * @method _bindUI","         * @private","         * @since 0.1","        */","        _bindUI : function() {","            var instance = this,","                host = instance.host;","","            instance._eventhandlers.push(","                host.on(","                    'keydown',","                    function(e) {","                        if (e.keyCode === 9) { // tab","                            e.preventDefault();","                            if (e.shiftKey) {","                                instance.previous();","                            }","                            else {","                                instance.next();","                            }","                        }","                    }","                )","            );","            instance._eventhandlers.push(","                host.after(","                    'click',","                    Y.rbind(instance._retreiveFocus, instance)","                )","            );","        },","","        /**","         * Cleaning up all eventlisteners","         *","         * @method _clearEventhandlers","         * @private","         * @since 0.1","         *","        */","        _clearEventhandlers : function() {","            YArray.each(","                this._eventhandlers,","                function(item){","                    item.detach();","                }","            );","        },","","        /**","         * Checks whether a node is focusable within the host-container.","         *","         * @method _nodeIsFocusable","         * @param node {Y.Node} the node to check if it's a focusable node within the host-container.","         * @return {Boolean} focusable or not","         * @since 0.1","        */","        _nodeIsFocusable : function(node) {","            var instance            = this,","                container           = instance.get('host'),","                disabledSelector    = instance.get('disabledSelector'),","                itemSelector        = instance.get('itemSelector'),","                nodeInsideContainer = node && container.contains(node),","                isFocusable;","","            isFocusable = (nodeInsideContainer && node.test(itemSelector) && (!disabledSelector || !node.test(disabledSelector)));","            return isFocusable;","        },","","        /**","         * Retreive the focus agian on the 'activeItem', or -when none- on the initial Item.","         * Is called when the host-node gets focus.","         *","         * @method _retreiveFocus","         * @private","         * @since 0.1","        */","        _retreiveFocus : function() {","            var instance   = this,","                activeItem = instance.get('activeItem');","","            if (activeItem) {","                activeItem.focus();","                instance._selectNode(activeItem);","            }","            else {","                instance.focusInitialItem();","            }","        },","","        /**","         * Selects the text inside the Node, or repositions the cursor to the end.","         *","         * @method _selectNode","         * @private","         * @since 0.1","         *","        */","        _selectNode : function(node) {","            if (node && node.test('input[type=text], input[type=password], textarea')) {","                if (node.hasClass(ITSAFORMELEMENT_SELECTONFOCUS_CLASS)) {","                    node.select();","                }","                else {","                    node.set('selectionStart', node.get('value').length);","                    // set 'scrollTop' high to make Chrome scroll the last character into view","                    node.set('scrollTop', 999999);","                }","            }","        }","","    }, {","        NS : 'itsatabkeymanager',","        ATTRS : {","            /**","             * Node that's currently either focused or focusable as part of the","             * document's tab flow. Overridden because we need a different valueFn.","             *","             * @attribute {Node|null} activeItem","            **/","            activeItem: {","                value: null,","                setter: function(val) {","                    this._selectNode(val);","                }","            },","            /**","             * Non-anchored CSS selector that matches item nodes that should be","             * focusable.","             *","             * @attribute {String} itemSelector","             * @default '.focusable'","            **/","            itemSelector: {","                value: DEFAULT_ITEM_SELECTOR,","                validator:  function(v) {","                    return typeof v === 'string';","                }","            }","        }","    }",");","","}, '@VERSION@', {","    \"requires\": [","        \"yui-base\",","        \"oop\",","        \"base-base\",","        \"base-build\",","        \"event-custom\",","        \"plugin\",","        \"node-pluginhost\",","        \"event-focus\",","        \"selector-css3\"","    ]","});"];
_yuitest_coverage["build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js"].lines = {"1":0,"3":0,"13":0,"14":0,"17":0,"45":0,"47":0,"48":0,"52":0,"58":0,"62":0,"63":0,"66":0,"68":0,"71":0,"73":0,"77":0,"81":0,"82":0,"85":0,"87":0,"91":0,"94":0,"99":0,"100":0,"103":0,"104":0,"107":0,"111":0,"113":0,"118":0,"119":0,"122":0,"123":0,"126":0,"130":0,"132":0,"135":0,"136":0,"139":0,"140":0,"141":0,"145":0,"146":0,"149":0,"150":0,"151":0,"156":0,"157":0,"163":0,"167":0,"169":0,"172":0,"173":0,"176":0,"177":0,"178":0,"182":0,"183":0,"186":0,"187":0,"188":0,"193":0,"198":0,"202":0,"206":0,"207":0,"208":0,"210":0,"214":0,"218":0,"220":0,"232":0,"236":0,"240":0,"241":0,"244":0,"245":0,"248":0,"249":0,"252":0,"254":0,"257":0,"261":0,"262":0,"265":0,"267":0,"268":0,"271":0,"275":0,"276":0,"279":0,"285":0,"288":0,"289":0,"292":0,"293":0,"295":0,"296":0,"302":0,"306":0,"307":0,"308":0,"309":0,"314":0,"315":0,"318":0,"322":0,"323":0,"324":0,"327":0,"328":0,"330":0,"344":0,"388":0,"438":0,"445":0,"470":0,"473":0,"474":0,"475":0,"476":0,"486":0,"502":0,"504":0,"512":0,"513":0,"514":0,"516":0,"517":0,"519":0,"531":0,"534":0,"535":0,"536":0,"537":0,"553":0,"560":0,"561":0,"562":0,"565":0,"566":0,"569":0,"585":0,"590":0,"591":0,"592":0,"594":0,"595":0,"596":0,"597":0,"598":0,"601":0,"602":0,"604":0,"605":0,"606":0,"611":0,"612":0,"615":0,"632":0,"637":0,"638":0,"639":0,"641":0,"642":0,"643":0,"644":0,"647":0,"648":0,"650":0,"651":0,"652":0,"657":0,"658":0,"661":0,"673":0,"677":0,"678":0,"680":0,"681":0,"682":0,"683":0,"698":0,"702":0,"703":0,"705":0,"707":0,"708":0,"709":0,"713":0,"715":0,"716":0,"717":0,"719":0,"721":0,"740":0,"743":0,"747":0,"748":0,"749":0,"750":0,"753":0,"759":0,"776":0,"779":0,"793":0,"800":0,"801":0,"813":0,"816":0,"817":0,"818":0,"821":0,"834":0,"835":0,"836":0,"839":0,"841":0,"858":0,"871":0};
_yuitest_coverage["build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js"].functions = {"FocusManager:13":0,"initializer:44":0,"destructor:51":0,"(anonymous 2):66":0,"ascend:57":0,"descend:76":0,"first:90":0,"last:110":0,"next:129":0,"previous:166":0,"(anonymous 3):206":0,"refresh:201":0,"_attachEvents:217":0,"_detachEvents:231":0,"(anonymous 4):252":0,"_getActiveContainer:235":0,"_getAnchoredContainerSelector:260":0,"_getAnchoredItemSelector:274":0,"_afterActiveItemChange:284":0,"_afterBlur:301":0,"_afterFocus:305":0,"_onKeyDown:313":0,"valueFn:340":0,"initializer:469":0,"destructor:485":0,"first:501":0,"focusInitialItem:530":0,"last:552":0,"next:584":0,"previous:631":0,"setFirstFocus:672":0,"(anonymous 5):718":0,"setSelectText:697":0,"(anonymous 6):746":0,"_bindUI:739":0,"(anonymous 7):778":0,"_clearEventhandlers:775":0,"_nodeIsFocusable:792":0,"_retreiveFocus:812":0,"_selectNode:833":0,"setter:857":0,"validator:870":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js"].coveredLines = 221;
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
 * Plugin that enables scrollview-navigation with keys.
 *
 * In order to response to key-events, the scrollview-instance needs to have focus. This can be set either by myScrollView.focus() -or blur()-
 * or by setting the attribute 'initialFocus' to true. The plugin also works when Plugin.ScrollViewPaginator is plugged-in. The behaviour will be
 * different, because the scrolling is paginated in that case.
 *
 *
 * If this plugin is plugged into a Y.ITSAScrollViewModellist-instance, then the keynavigation will scroll through the items in case
 * the attribute 'modelsSelectable' is set to true.
 *
 *
 * @module gallery-itsascrollviewkeynav
 * @class ITSAScrollViewKeyNav
 * @extends Plugin.Base
 * @constructor
 * @since 0.1
 *
 * <i>Copyright (c) 2013 Marco Asbreuk - http://itsasbreuk.nl</i>
 * YUI BSD License - http://developer.yahoo.com/yui/license.html
 *
*/

// -- Public Static Properties -------------------------------------------------

/**
 * Internal list that holds event-references
 * @property _eventhandlers
 * @private
 * @type Array
 */

/**
 * The plugin's host, which should be a ScrollView-instance
 * @property host
 * @type ScrollView-instance
 */

_yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 438);
var YArray = Y.Array,
    DEFAULT_ITEM_SELECTOR = '.focusable',
    FORMELEMENT_CLASS = 'yui3-itsaformelement',
    ITSAFORMELEMENT_SELECTONFOCUS_CLASS = FORMELEMENT_CLASS + '-selectall',
    ITSAFORMELEMENT_FIRSTFOCUS_CLASS = FORMELEMENT_CLASS + '-firstfocus';


_yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 445);
Y.namespace('Plugin').ITSATabKeyManager = Y.Base.create('itsatabkeymanager', Y.Plugin.FocusManager, [], {

        /**
         * Internal list that holds event-references
         * @property _eventhandlers
         * @private
         * @type Array
         */
        _eventhandlers : [],

        /**
         * The plugin's host, which should be a ScrollView-instance
         * @property host
         * @type Y.Node
         */
        host : null,

        /**
         * Sets up the toolbar during initialisation. Calls render() as soon as the hosts-editorframe is ready
         *
         * @method initializer
         * @protected
         * @since 0.1
         */
        initializer : function() {
            _yuitest_coverfunc("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", "initializer", 469);
_yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 470);
var instance = this,
                host;

            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 473);
instance.host = host = instance.get('host');
            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 474);
instance._bindUI();
            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 475);
instance.set('keys', {});
            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 476);
instance.set('circular', true);
        },

        /**
         * Cleans up bindings and removes plugin
         * @method destructor
         * @protected
         * @since 0.1
        */
        destructor : function() {
            _yuitest_coverfunc("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", "destructor", 485);
_yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 486);
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
            _yuitest_coverfunc("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", "first", 501);
_yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 502);
options = options || {};

            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 504);
var instance         = this,
                container        = instance.get('host'),
                disabledSelector = instance.get('disabledSelector'),
                itemSelector     = options.selector || instance.get('itemSelector'),
                item             = container.one(itemSelector),
                i                = 0,
                allItems;

            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 512);
while (item && disabledSelector && item.test(disabledSelector)) {
                _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 513);
allItems = allItems || container.all(itemSelector);
                _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 514);
item = (++i<allItems.size()) ? allItems.item(i) : null;
            }
            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 516);
if (!options.silent) {
                _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 517);
instance.set('activeItem', item, {src: 'first'});
            }
            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 519);
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
            _yuitest_coverfunc("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", "focusInitialItem", 530);
_yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 531);
var instance = this,
                focusitem;

            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 534);
focusitem = instance.first({selector: '.'+ITSAFORMELEMENT_FIRSTFOCUS_CLASS}) || instance.first();
            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 535);
if (focusitem) {
                _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 536);
focusitem.focus();
                _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 537);
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
            _yuitest_coverfunc("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", "last", 552);
_yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 553);
var instance         = this,
                container        = instance._host,
                disabledSelector = instance.get('disabledSelector'),
                allItems         = container.all(instance.get('itemSelector')),
                i                = allItems.size() - 1,
                item             = allItems.pop();

            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 560);
options = options || {};
            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 561);
while (item && disabledSelector && item.test(disabledSelector)) {
                _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 562);
item = (--i>=0) ? allItems.item(i) : null;
            }

            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 565);
if (!options.silent) {
                _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 566);
instance.set('activeItem', item, {src: 'last'});
            }

            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 569);
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
            _yuitest_coverfunc("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", "next", 584);
_yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 585);
var instance         = this,
                container        = instance._host,
                activeItem       = instance.get('activeItem'),
                disabledSelector, nextItem, index, itemSize, allItems;

            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 590);
options = options || {};
            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 591);
if (!activeItem) {
                _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 592);
return instance.first(options);
            }
            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 594);
disabledSelector = instance.get('disabledSelector');
            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 595);
allItems = container.all(instance.get('itemSelector'));
            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 596);
itemSize = allItems.size();
            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 597);
index = allItems.indexOf(activeItem);
            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 598);
nextItem = (++index<itemSize) ? allItems.item(index) : null;
            // Get the next item that matches the itemSelector and isn't
            // disabled.
            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 601);
while (nextItem && disabledSelector && nextItem.test(disabledSelector)) {
                _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 602);
nextItem = (++index<itemSize) ? allItems.item(index) : null;
            }
            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 604);
if (nextItem) {
                _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 605);
if (!options.silent) {
                    _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 606);
this.set('activeItem', nextItem, {src: 'next'});
                }
            } else {
                // If there is no next item and the `circular` attribute is
                // truthy, then focus the first item in this container.
                _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 611);
if (this.get('circular')) {
                    _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 612);
nextItem = instance.first(options);
                }
            }
            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 615);
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
            _yuitest_coverfunc("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", "previous", 631);
_yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 632);
var instance         = this,
                container        = instance._host,
                activeItem       = instance.get('activeItem'),
                disabledSelector, prevItem, index, allItems;

            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 637);
options = options || {};
            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 638);
if (!activeItem) {
                _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 639);
return instance.first(options);
            }
            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 641);
disabledSelector = instance.get('disabledSelector');
            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 642);
allItems = container.all(instance.get('itemSelector'));
            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 643);
index = allItems.indexOf(activeItem);
            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 644);
prevItem = (--index>=0) ? allItems.item(index) : null;
            // Get the next item that matches the itemSelector and isn't
            // disabled.
            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 647);
while (prevItem && disabledSelector && prevItem.test(disabledSelector)) {
                _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 648);
prevItem = (--index>=0) ? allItems.item(index) : null;
            }
            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 650);
if (prevItem) {
                _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 651);
if (!options.silent) {
                    _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 652);
this.set('activeItem', prevItem, {src: 'previous'});
                }
            } else {
                // If there is no next item and the `circular` attribute is
                // truthy, then focus the first item in this container.
                _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 657);
if (this.get('circular')) {
                    _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 658);
prevItem = instance.last(options);
                }
            }
            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 661);
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
            _yuitest_coverfunc("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", "setFirstFocus", 672);
_yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 673);
var instance = this,
                container = instance.get('host'),
                nodeisfocusable;

            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 677);
if (typeof node === 'string') {
                _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 678);
node = Y.one(node);
            }
            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 680);
nodeisfocusable = node && instance._nodeIsFocusable(node);
            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 681);
if (nodeisfocusable) {
                _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 682);
container.all('.'+ITSAFORMELEMENT_FIRSTFOCUS_CLASS).removeClass(ITSAFORMELEMENT_FIRSTFOCUS_CLASS);
                _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 683);
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
            _yuitest_coverfunc("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", "setSelectText", 697);
_yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 698);
var instance = this,
                container = instance.get('host'),
                nodeisfocusable, itemSelector, disabledSelector, allNodes;

            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 702);
if (typeof node === 'string') {
                _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 703);
node = Y.all(node);
            }
            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 705);
if (node && (node instanceof Y.Node)) {
                // only 1 node needs to be set
                _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 707);
nodeisfocusable = instance._nodeIsFocusable(node);
                _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 708);
if (nodeisfocusable && node.test('input[type=text], input[type=password], textarea')) {
                    _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 709);
node.toggleClass(ITSAFORMELEMENT_SELECTONFOCUS_CLASS, select);
                }
            }
            else {
                _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 713);
allNodes = node || container.all(itemSelector);
                // allNodes need to be set --> this is a NodeList
                _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 715);
itemSelector = instance.get('itemSelector');
                _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 716);
disabledSelector = instance.get('disabledSelector');
                _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 717);
allNodes.each(
                    function(oneNode) {
                        _yuitest_coverfunc("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", "(anonymous 5)", 718);
_yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 719);
if (oneNode.test('input[type=text], input[type=password], textarea')
                            && (!disabledSelector || !oneNode.test(disabledSelector))) {
                            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 721);
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
            _yuitest_coverfunc("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", "_bindUI", 739);
_yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 740);
var instance = this,
                host = instance.host;

            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 743);
instance._eventhandlers.push(
                host.on(
                    'keydown',
                    function(e) {
                        _yuitest_coverfunc("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", "(anonymous 6)", 746);
_yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 747);
if (e.keyCode === 9) { // tab
                            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 748);
e.preventDefault();
                            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 749);
if (e.shiftKey) {
                                _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 750);
instance.previous();
                            }
                            else {
                                _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 753);
instance.next();
                            }
                        }
                    }
                )
            );
            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 759);
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
            _yuitest_coverfunc("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", "_clearEventhandlers", 775);
_yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 776);
YArray.each(
                this._eventhandlers,
                function(item){
                    _yuitest_coverfunc("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", "(anonymous 7)", 778);
_yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 779);
item.detach();
                }
            );
        },

        /**
         * Checks whether a node is focusable within the host-container.
         *
         * @method _nodeIsFocusable
         * @param node {Y.Node} the node to check if it's a focusable node within the host-container.
         * @return {Boolean} focusable or not
         * @since 0.1
        */
        _nodeIsFocusable : function(node) {
            _yuitest_coverfunc("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", "_nodeIsFocusable", 792);
_yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 793);
var instance            = this,
                container           = instance.get('host'),
                disabledSelector    = instance.get('disabledSelector'),
                itemSelector        = instance.get('itemSelector'),
                nodeInsideContainer = node && container.contains(node),
                isFocusable;

            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 800);
isFocusable = (nodeInsideContainer && node.test(itemSelector) && (!disabledSelector || !node.test(disabledSelector)));
            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 801);
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
            _yuitest_coverfunc("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", "_retreiveFocus", 812);
_yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 813);
var instance   = this,
                activeItem = instance.get('activeItem');

            _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 816);
if (activeItem) {
                _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 817);
activeItem.focus();
                _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 818);
instance._selectNode(activeItem);
            }
            else {
                _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 821);
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
            _yuitest_coverfunc("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", "_selectNode", 833);
_yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 834);
if (node && node.test('input[type=text], input[type=password], textarea')) {
                _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 835);
if (node.hasClass(ITSAFORMELEMENT_SELECTONFOCUS_CLASS)) {
                    _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 836);
node.select();
                }
                else {
                    _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 839);
node.set('selectionStart', node.get('value').length);
                    // set 'scrollTop' high to make Chrome scroll the last character into view
                    _yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 841);
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
                    _yuitest_coverfunc("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", "setter", 857);
_yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 858);
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
                    _yuitest_coverfunc("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", "validator", 870);
_yuitest_coverline("build/gallery-itsatabkeymanager/gallery-itsatabkeymanager.js", 871);
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
