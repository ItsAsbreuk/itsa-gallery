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
_yuitest_coverage["build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js",
    code: []
};
_yuitest_coverage["build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js"].code=["YUI.add('gallery-itsascrollviewmodellist', function (Y, NAME) {","","'use strict';","","/**"," * ScrollView ModelList Extention"," *"," *"," * Adds an Y.ModelList to a ScrollView instance, where the Models are rendered inside an unsorted-list"," * lies within the scrollview's-contentBox. This results in an ul-list with Models."," *"," * Caution: you MUST set the axis-atribute before rendering! Because the content is empty at start, scrollview"," * would otherwise fail autofind the value of axis."," *"," * @module gallery-itsscrollviewmodellist"," * @class ITSAScrollViewModelList"," * @constructor"," * @since 0.1"," *"," * <i>Copyright (c) 2013 Marco Asbreuk - http://itsasbreuk.nl</i>"," * YUI BSD License - http://developer.yahoo.com/yui/license.html"," *","*/","","var Lang = Y.Lang,","    YObject = Y.Object,","    YArray = Y.Array,","    YNode = Y.Node,","    VIEW_TEMPLATE = '<ul role=\"presentation\"></ul>',","    VIEW_MODEL_TEMPLATE = '<li role=\"presentation\"></li>',","    VIEW_EMPTY_ELEMENT_TEMPLATE = '<li></li>',","    EMPTY_ELEMENT_CLASS = 'itsa-scrollview-fillelement',","    MODEL_CLASS = 'itsa-scrollviewmodel',","    SVML_CLASS = 'itsa-scrollviewmodellist',","    SVML_FOCUS_CLASS = MODEL_CLASS + '-focus',","    SVML_SELECTED_CLASS = MODEL_CLASS + '-selected',","    SVML_EVEN_CLASS = MODEL_CLASS + '-even',","    SVML_ODD_CLASS = MODEL_CLASS + '-odd',","    SVML_STYLE_CLASS = SVML_CLASS + '-styled',","    GROUPHEADER_CLASS = SVML_CLASS + '-groupheader',","    GROUPHEADER1_CLASS = SVML_CLASS + '-groupheader1',","    GROUPHEADER2_CLASS = SVML_CLASS + '-groupheader2',","    GROUPHEADER3_CLASS = SVML_CLASS + '-groupheader3',","    GROUPHEADER_SEQUEL_CLASS = SVML_CLASS + '-sequelgroupheader',","    GETSTYLE = function(node, style) {","        return parseInt(node.getStyle(style), 10);","    };","","","// -- First: extend Y.LazyModelList with 2 sugar methods for set- and get- attributes --------------------------","","function ITSALazyModelListAttrExtention() {}","","Y.mix(ITSALazyModelListAttrExtention.prototype, {","","    /**","     * Gets an attribute-value from a Model OR object. Depends on the state (Lazy or not).","     * Will always work, whether an Y.ModelList or Y.LazyModelList is attached.","     *","     * @method getModelAttr","     * @param {Y.Model} model the model (or extended class) from which the attribute has to be read.","     * @param {String} name Attribute name or object property path.","     * @return {Any} Attribute value, or `undefined` if the attribute doesn't exist, or 'null' if no model is passed.","     * @since 0.1","     *","    */","    getModelAttr: function(model, name) {","        return model && ((model.get && (Lang.type(model.get) === 'function')) ? model.get(name) : model[name]);","    },","","    /**","     * Sets an attribute-value of a Model OR object. Depends on the state (Lazy or not).","     * Will always work, whether an Y.ModelList or Y.LazyModelList is attached.","     * If you want to be sure the Model fires an attributeChange-event, then set 'revive' true. This way","     * lazy-Models will become true Models and fire an attributeChange-event. When the attibute was lazy before,","     * it will return lazy afterwards.","     *","     * @method _setModelAttr","     * @param {Y.Model} model the model (or extended class) from which the attribute has to be read.","     * @param {Boolean} revive Whether to force a lazy-model to revive (when lazy before: will be lazy afterwards)","     * @param {String} name Attribute name or object property path.","     * @param {any} value Value to set.","     * @param {Object} [options] Data to be mixed into the event facade of the `change` event(s) for these attributes.","     * In case of Lazy-Model, this only has effect when 'revive' is true.","     *    @param {Boolean} [options.silent=false] If `true`, no `change` event will be fired.","     * @since 0.1","     *","    */","    setModelAttr: function(model, revive, name, value, options) {","        var instance = this,","            modelIsLazy;","","        if (model) {","            modelIsLazy = !model.get || (Lang.type(model.get) !== 'function');","            if (modelIsLazy) {","                if (revive) {","                    if (revive) {","                        instance.revive(model);","                        model.set(name, value, options);","                        instance.free(model);","                    }","                    else {","                        model.set(name, value, options);","                    }","                }","                else {","                    model[name] = value;","                }","            }","            else {","                model.set(name, value, options);","            }","        }","    }","","}, true);","","Y.LazyModelList.ITSALazyModelListAttrExtention = ITSALazyModelListAttrExtention;","","Y.Base.mix(Y.LazyModelList, [ITSALazyModelListAttrExtention]);","","// -- Mixing extra Methods to Y.ScrollView -----------------------------------","","function ITSAScrollViewModelListExtention() {}","","ITSAScrollViewModelListExtention.ATTRS = {","","   /**","    * The ModelList that is 'attached' to the Calendar, resulting in highlighted dates for each Model","    * that has a 'Date-match'. For more info how a 'Date-match' is achieved: see the attribute modelConfig.","    *","    * @attribute modelList","    * @type {ModelList}","    * @default null","    * @since 0.1","    */","    modelList: {","        value: null,","        validator: function(v){ return (v instanceof Y.ModelList) || (v instanceof Y.LazyModelList) || (v === null);},","        setter: '_setModelList'","    },","","   /**","    * Whether duplicate values (rendered by the attributefunction 'renderModel') are possible.","    * By default, this will be compared with the previous rendered Model.","    * If you want a more sophisticated dup-check, the set the dupComparator-attribute. But be careful: the dupComparator","    * has a significant performance-hit.","    * <u>If you set this attribute after the scrollview-instance is rendered, the scrollview-instance will be re-rendered.</u>","    *","    * @attribute noDups","    * @type {Boolean}","    * @default false","    * @since 0.1","    */","    noDups: {","        value: false,","        validator: function(v){ return Lang.isBoolean(v);},","        setter: '_setNoDups'","    },","","    /**","     * Function that can filter the modellist, in a way that only specific models are rendered.","     * The function must look like: <b>function(model)</b> and must return true or false (which the developer","     * can determine based on the model that is passed).","     *","     * For example: function(model) {return model.get('country')==='US';}","     *","     * @attribute viewFilter","     * @type {Function} The function must look like: <b>function(model)</b>","     * @default null","     * @since 0.1","     */","    viewFilter: {","        value: null,","        validator: function(v){ return Lang.isFunction(v) || v === null; },","        setter: '_setViewFilter'","    },","","   /**","    * Whether the Models can be selected (resulting in a 'modelSelectionChange'-event)","    * Posible values are: <b>null</b>, <b>''</b>, <b>true</b>, <b>false</b>, <b>single</b>, <b>multi</b>","    * The value true equals 'multi', 'null' or '' equals false.","    *","    * @default false","    * @attribute modelsSelectable","    * @type {Boolean|String|null}","    * @since 0.1","    */","    modelsSelectable: {","        value: false,","        lazyAdd: false,","        validator:  function(v) {","            return ((v==='') || (v===null) || Lang.isBoolean(v) || (v==='single') || (v==='multi'));","        },","        setter: '_setModelsSelectable'","    },","","   /**","    * If set, then there ALWAYS REMAINS 1 Model selected.","    * <i>Only accounts when 'modelsSelectable' is active.","    *","    * @default true","    * @attribute modelsUnselectable","    * @type {Boolean}","    * @since 0.1","    */","    modelsUnselectable: {","        value: false,","        validator:  function(v) {","            return Lang.isBoolean(v);","        }","    },","","   /**","    * Whether the Models is styled using the css of this module.","    * In fact, just the classname 'itsa-scrollviewmodellist-styled' is added to the boundingBox","    * and the css-rules do all the rest. The developer may override these rules, or set this value to false","    * while creatiung their own css. In the latter case it is advisable to take a look at all the css-rules","    * that are supplied by this module. In either cases, the modelList (is available) will add classes to all li-elements","    * thus the developer can style it at own will.","    *","    * @default false","    * @attribute modelListStyled","    * @type {Boolean}","    * @since 0.1","    */","    modelListStyled: {","        value: false,","        lazyAdd: false,","        validator:  function(v) {","            return Lang.isBoolean(v);","        },","        setter: '_setModelListStyled'","    },","","   /**","    * Sets the sensibility when clicking on a model.","    * This prevents a click-event when the user actually scrolls the scrollview instead of selecting an item","    * The number represents the amount of pixels that the scrollview-instance can shift a bit during a click","    * while still firing a click-event. Above this limit, the scrollviewinstance will assume movement and does not fire","    * a click-event.","    *","    * @default 2","    * @attribute clickSensivity","    * @type int","    * @since 0.1","    */","    clickSensivity: {","        value: 2,","        validator:  function(v) {","            return (Lang.isNumber(v) && (v>=0) && (v<11));","        }","    },","","   /**","    * Whether an event is fired when a Model catches a mouse-click.","    * When set to true, the events 'modelClicked' is fired when clicking on the Models.","    * Click-events <b>do have a correction</b> when the user actually scrolls instead of clicking a Model-item.","    * See the attribute clickSensivity for more details.","    *","    * @attribute clickEvents","    * @type {Boolean}","    * @default false","    * @since 0.1","    */","    clickEvents: {","        value: false,","        lazyAdd: false,","        validator: function(v) {return Lang.isBoolean(v);},","        setter: '_setClickEvents'","    },","","   /**","    * Whether an event is fired when a Model catches a mousedown or mouseup event.","    * When set to true, the events 'modelMouseDown' and 'modelMouseUp' are fired when mousedown or mouseup","    * happens on the Models. These events <b>do not have a correction</b> when the user actually scrolls instead of clicking a Model-item.","    * This means they are fired no matter if scrolling is busy or not.","    *","    * @attribute mouseDownUpEvents","    * @type {Boolean}","    * @default false","    * @since 0.1","    */","    mouseDownUpEvents: {","        value: false,","        lazyAdd: false,","        validator: function(v) {return Lang.isBoolean(v);},","        setter: '_setMouseDownUpEvents'","    },","","   /**","    * Whether an event is fired when a Model catches a mouse-enter or mouseleave.","    * When set to true, the events 'modelMouseEnter' and 'modelMouseLeave' are fired when moving the mouse over the Models.","    *","    * @attribute hoverEvents","    * @type {Boolean}","    * @default false","    * @since 0.1","    */","    hoverEvents: {","        value: false,","        lazyAdd: false,","        validator: function(v) {return Lang.isBoolean(v);},","        setter: '_setHoverEvents'","    },","","    /**","     * If set true, the last element will not be bounced to the bottm/right edge, but to the top/left edge.","     *","     * @method lastItemOnTop","     * @return {String|Int|Boolean} Model-specific value on which base the module can determine to what groupHeader","     * the Model belongs.","     * @since 0.1","     */","    lastItemOnTop: {","        value: null,","        validator: function(v){ return Lang.isBoolean(v);},","        setter: '_setLastItemOnTop'","    },","","    /**","     * When defined, the ScrollView-instance will generate GroupHeaders (extra li-elements with class='itsa-scrollviewmodellist-groupheader1')","     * just above all models (li-elements) whom encounter a change in the groupHeader1-value.","     * The attribute MUST be a function like this: <b>function(model) {return ...)}</b> and MUST return a {String|Int|Boolean} value for all models.","     * <u>If you set this attribute after the scrollview-instance is rendered, the scrollview-instance will be re-rendered.</u>","     *","     * @attribute groupHeader1","     * @type {Function}","     * @default null","     * @since 0.1","     */","    groupHeader1: {","        value: null,","        validator: function(v){ return Lang.isFunction(v) || v === null; },","        setter: '_setGroupHeader1'","    },","","    /**","     * When defined, the ScrollView-instance will generate GroupHeaders (extra li-elements with class='itsa-scrollviewmodellist-groupheader1')","     * just above all models (li-elements) whom encounter a change in the groupHeader2-value.","     * The attribute MUST be a function like this: <b>function(model) {return ...)}</b> and MUST return a {String|Int|Boolean} value for all models.","     * <u>If you set this attribute after the scrollview-instance is rendered, the scrollview-instance will be re-rendered.</u>","     *","     * @attribute groupHeader2","     * @type {Function}","     * @default null","     * @since 0.1","     */","    groupHeader2: {","        value: null,","        validator: function(v){ return Lang.isFunction(v) || v === null; },","        setter: '_setGroupHeader2'","    },","","    /**","     * When defined, the ScrollView-instance will generate GroupHeaders (extra li-elements with class='itsa-scrollviewmodellist-groupheader1')","     * just above all models (li-elements) whom encounter a change in the groupHeader3-value.","     * The attribute MUST be a function like this: <b>function(model) {return ...)}</b> and MUST return a {String|Int|Boolean} value for all models.","     * <u>If you set this attribute after the scrollview-instance is rendered, the scrollview-instance will be re-rendered.</u>","     *","     * @attribute groupHeader3","     * @type {Function}","     * @default null","     * @since 0.1","     */","    groupHeader3: {","        value: null,","        validator: function(v){ return Lang.isFunction(v) || v === null; },","        setter: '_setGroupHeader3'","    },","","    /**","     * Attribute that is responsible for the rendering of all the Models. The developer is advised to override this attribute in a way","     * that the rendering of the Models result in the content that is desired.","     * The attribute MUST be a function like this: <b>function(model) {return ...)}</b> and MUST return a {String} value for all models.","     * <u>If you set this attribute after the scrollview-instance is rendered, the scrollview-instance will be re-rendered.</u>","     *","     * @attribute renderGroupHeader1","     * @type {Function}","     * @default null","     * @since 0.1","     */","    renderModel: {","        value: function(model) {","            return this.getModelAttr(model, 'clientId'); // default, so that there always is content. Best to be overwritten.","        },","        validator: function(v){ return Lang.isFunction(v) || v === null; },","        setter: '_setRenderModel'","    },","","    /**","     * Attribute that identifies duplicate Models.","     * By default, this function is 'null', meaning that Models will be compared with the previous rendered Model to see if they are dups.","     * (based on the value of 'renderModel').","     * If Set the dupComparator-attribute, you can have a more sophisticated dup-check which will loop through all the Models. Thus be careful:","     * the dupComparator has a significant performance-hit.","     * <u>If you set this attribute after the scrollview-instance is rendered, the scrollview-instance will be re-rendered","     * (only is 'noDups'===true).</u>","     *","     * @attribute dupComparator","     * @type {Function}","     * @default null","     * @since 0.1","     */","    dupComparator: {","        value: null,","        validator: function(v){ return Lang.isFunction(v) || v === null; },","        setter: '_setDupComparator'","    },","","    /**","     * Determines how the rendering of groupHeader1 takes place. The developer may set this method, but can choose not to.","     * If not overriden, renderGroupHeader1 will render the same as the attribute 'groupHeader1' (except that it's a String).","     * If the developer wants content other than groupHeader1 generates, he/she can override this method.","     * The attribute MUST be a function like this: <b>function(model) {return ...)}</b> and MUST return a {String} value for all models.","     * <u>If you change this method after the scrollview-instance is rendered, you need to call renderView() to make the changes applied.</u>","     *","     * @attribute renderGroupHeader1","     * @type {Function}","     * @default null","     * @since 0.1","     */","    renderGroupHeader1: {","        value: null,","        validator: function(v){ return Lang.isFunction(v) || v === null; },","        setter: '_setRenderGroupHeader1'","    },","","    /**","     * Determines how the rendering of groupHeader2 takes place. The developer may set this method, but can choose not to.","     * If not overriden, renderGroupHeader2 will render the same as the attribute 'groupHeader2' (except that it's a String).","     * If the developer wants content other than groupHeader2 generates, he/she can override this method.","     * The attribute MUST be a function like this: <b>function(model) {return ...)}</b> and MUST return a {String} value for all models.","     * <u>If you change this method after the scrollview-instance is rendered, you need to call renderView() to make the changes applied.</u>","     *","     * @attribute renderGroupHeader2","     * @type {Function}","     * @default null","     * @since 0.1","     */","    renderGroupHeader2: {","        value: null,","        validator: function(v){ return Lang.isFunction(v) || v === null; },","        setter: '_setRenderGroupHeader2'","    },","","    /**","     * Determines how the rendering of groupHeader3 takes place. The developer may set this method, but can choose not to.","     * If not overriden, renderGroupHeader3 will render the same as the attribute 'groupHeader3' (except that it's a String).","     * If the developer wants content other than groupHeader3 generates, he/she can override this method.","     * The attribute MUST be a function like this: <b>function(model) {return ...)}</b> and MUST return a {String} value for all models.","     * <u>If you change this method after the scrollview-instance is rendered, you need to call renderView() to make the changes applied.</u>","     *","     * @attribute renderGroupHeader3","     * @type {Function}","     * @default null","     * @since 0.1","     */","    renderGroupHeader3: {","        value: null,","        validator: function(v){ return Lang.isFunction(v) || v === null; },","        setter: '_setRenderGroupHeader3'","    }","};","","Y.mix(ITSAScrollViewModelListExtention.prototype, {","","// -- Public Static Properties -------------------------------------------------","","/**"," * Internal list that holds event-references"," * @property _eventhandlers"," * @private"," * @type Array"," */","","    _eventhandlers : [],","    _originalModels : [],","    _selectableModelEvent : null,","    _clickModelEvent : null,","    _mouseenterModelEvent : null,","    _mouseUpModelEvent : null,","    _mouseDownModelEvent : null,","    _mouseleaveModelEvent : null,","    _selectedModels : {},","    _viewNode : null,","    _viewId : null,","    _lastClickedModel : null,","    _abberantModelList : null,","    _setViewFilterInitiated : null,","    _setLastItemOnTopInitiated : null,","    _setGroupHeader1Initiated : null,","    _setGroupHeader2Initiated : null,","    _setGroupHeader3Initiated : null,","    _setRenderGroupHeader1Initiated : null,","    _setRenderGroupHeader2Initiated : null,","    _setRenderGroupHeader3Initiated : null,","    _setRenderModelInitiated : null,","    _setDupComparatorInitiated : null,","    _setNoDupsInitiated : null,","    _rerenderAttributesOnChange : true,","    _moreItemsAvailable : true, // must initially be set true","    _prevLastModelIndex : null,","    _modelListIsLazy : false,","    _prevHeader1 : null,","    _prevHeader2 : null,","    _prevHeader3 : null,","    _even : false,","","    /**","     * Initialisation of the Plugin","     *","     * @method initializer","     * @protected","     * @since 0.1","     */","    initializer : function() {","        var instance = this;","","        instance._viewId = Y.guid();","        instance._eventhandlers.push(","            instance.after(","                'render',","                instance._render,","                instance","            )","        );","    },","","    /**","     * Sets an attribute, but in a way that there will be no rerendering of the view.","     * This is handy if you want to change multplie attributes where you only want the view to be re-rendered after the","     * last attributes is set, instead of every time after eacht attribute-change.","     *","     * @method setWithoutRerender","     * @param {String} name The name of the attribute. If the","     * current value of the attribute is an Object, dot notation can be used","     * to set the value of a property within the object (e.g. <code>set(\"x.y.z\", 5)</code>).","     * @param {Any} value The value to set the attribute to.","     * @param {Object} [opts] Optional data providing the circumstances for the change.","     * @since 0.1","    */","    setWithoutRerender : function(name, val, opts) {","        var instance = this;","","        instance._rerenderAttributesOnChange = false;","        instance.set(name, val, opts);","        instance._rerenderAttributesOnChange = true;","    },","","    /**","     * Retreives the Li-Node given the index from the ModelList.","     * <u>Be careful if you use the plugin ITSAScrollViewInifiniteScroll:</u> to get the Node, there might be a lot of","     * list-expansions triggered. Be sure that expansions from external data does end, otherwise it will overload the browser.","     * That's why the second param is needed.","     *","     * @method getNodeFromIndex","     * @param {Int} index Index of item in the modelList.","     * @param {Int} [maxExpansions] Only needed when you use the plugin <b>ITSAScrollViewInifiniteScroll</b>. Use this value to limit","     * expansion data-calls. It will prevent you from falling into endless expansion when the list is infinite. If not set this method will expand","     * at the <b>max of ITSAScrollViewInifiniteScroll.get('maxExpansions') times by default</b>. If you are responsible for the external data and","     * that data is limited, you might choose to set this value that high to make sure all data is rendered in the scrollview.","     * @return {Y.Node} Li-Node that corresponds with the model.","     * @since 0.1","    */","    getNodeFromIndex : function(index, maxExpansions) {","//=============================================================================================================================","//","// NEED SOME WORK HERE: MIGHT BE ASYNCHROUS --> WE NEED TO RETURN A PROMISE","//","//=============================================================================================================================","        return this._getNodeFromModelOrIndex(null, index, maxExpansions);","    },","","    /**","     * Retreives the Li-Node given a Model from the ModelList.","     * <u>Be careful if you use the plugin ITSAScrollViewInifiniteScroll:</u> to get the Node, there might be a lot of","     * list-expansions triggered. Be sure that expansions from external data does end, otherwise it will overload the browser.","     * That's why the second param is needed.","     *","     * @method getNodeFromModel","     * @param {Y.Model} model List-item from the modelList. In case of a LazyModelList, this might be an object.","     * @param {Int} [maxExpansions] Only needed when you use the plugin <b>ITSAScrollViewInifiniteScroll</b>. Use this value to limit","     * expansion data-calls. It will prevent you from falling into endless expansion when the list is infinite. If not set this method will expand","     * at the <b>max of ITSAScrollViewInifiniteScroll.get('maxExpansions') times by default</b>. If you are responsible for the external data and","     * that data is limited, you might choose to set this value that high to make sure all data is rendered in the scrollview.","     * @return {Y.Node} Li-Node that corresponds with the model.","     * @since 0.1","    */","    getNodeFromModel : function(model, maxExpansions) {","//=============================================================================================================================","//","// NEED SOME WORK HERE: MIGHT BE ASYNCHROUS --> WE NEED TO RETURN A PROMISE","//","//=============================================================================================================================","        return this._getNodeFromModelOrIndex(model, null, maxExpansions);","    },","","    /**","     * Equals scrollview.scrollTo, but makes sure we keep between the correct boundaries.","     *","     * @method saveScrollTo","     * @param x {Int} The x-position to scroll to. (null for no movement)","     * @param y {Int} The y-position to scroll to. (null for no movement)","     * @since 0.1","     *","    */","    saveScrollTo : function(x, y) {","        var instance = this,","            boundingBox = instance.get('boundingBox'),","            viewNode = instance._viewNode,","            max;","","        if (x) {","            x = Math.max(0, x);","            max = viewNode.get('offsetWidth') - boundingBox.get('offsetWidth');","            x = Math.min(x, max);","        }","        if (y) {","            y = Math.max(0, y);","            max = viewNode.get('offsetHeight') - boundingBox.get('offsetHeight');","            y = Math.min(y, max);","        }","        instance.scrollTo(x, y);","    },","","    /**","     * Makes the Model scroll into the View. Items that are already in the view: no scroll appears. Items that are above: will appear","     * on top. Items that are after the view: will appear on bottom.","     * <u>Be careful if you use the plugin ITSAScrollViewInifiniteScroll:</u> to get the Node, there might be a lot of","     * list-expansions triggered. Be sure that expansions from external data does end, otherwise it will overload the browser.","     * That's why the second param is needed.","     *","     * @method scrollIntoView","     * @param {Y.Model|Int} modelOrIndex Y.Model or index that should be into view.","     * @param {Object} [options] To force the 'scrollIntoView' to scroll on top or on bottom of the view.","     *     @param {Boolean} [options.forceTop=false] if 'true', the (first) selected item will always be positioned on top.","     *     @param {Boolean} [options.forceBottom=false] if 'true', the (first) selected item will always be positioned on bottom.","     * @param {Int} [maxExpansions] Only needed when you use the plugin <b>ITSAScrollViewInifiniteScroll</b>. Use this value to limit","     * external data-calls. It will prevent you from falling into endless expansion when the list is infinite. If not set this method will expand","     * from external data at the <b>max of 25 times by default</b> (which is quite a lot). If you are responsible for the external data and","     * it is limited, then you might choose to set this value that high to make sure all data is rendered in the scrollview.","     * @since 0.1","    */","    scrollIntoView : function(modelOrIndex, options, maxExpansions) {","//=============================================================================================================================","//","// NEED SOME WORK HERE: MIGHT BE ASYNCHROUS --> WE NEED TO RETURN A PROMISE","//","//=============================================================================================================================","        var instance = this,","            boundingBox = instance.get('boundingBox'),","            axis = instance.get('axis'),","            yAxis = axis.y,","            boundingBoxSize = yAxis ? boundingBox.get('offsetHeight') : boundingBox.get('offsetWidth'),","            boundingBoxEdge = yAxis ? boundingBox.getY() : boundingBox.getX(),","            viewNode = instance._viewNode,","            infiniteScrollPlugin = instance.itssvinfinite,","            paginatorPlugin = instance.pages,","            modelNodeEdge, currentOffset, maxOffset, newOffset, modelNode, liElements, getNodePosition,","            onTop, nodePosition, modelNodeSize, corrected;","","        getNodePosition = function(node) {","            // returns -1 if (partial) before viewNode","            // returns 0 if inside viewNode","            // returns 1 if (partial) after viewNode","            var nodeLowerEdge = yAxis ? node.getY() : node.getX(),","                nodeUpperEdge;","            if (yAxis) {","                nodeUpperEdge = nodeLowerEdge + node.get('offsetHeight') + GETSTYLE(node, 'marginTop') + GETSTYLE(node, 'marginBottom');","            }","            else {","                nodeUpperEdge = nodeLowerEdge + node.get('offsetWidth') + GETSTYLE(node, 'marginLeft') + GETSTYLE(node, 'marginRight');","            }","","            if ((nodeLowerEdge<boundingBoxEdge) || (options && Lang.isBoolean(options.forceTop) && options.forceTop)) {","                return -1;","            }","            else if ((nodeUpperEdge>(boundingBoxEdge+boundingBoxSize)) || (options && Lang.isBoolean(options.forceBottom) && options.forceBottom)) {","                return 1;","            }","            else {","                return 0;","            }","        };","        if (Lang.isNumber(modelOrIndex)) {","            modelNode = instance.getNodeFromIndex(modelOrIndex, maxExpansions);","            nodePosition = getNodePosition(modelNode);","            if (paginatorPlugin && (nodePosition!==0)) {","                // increase the modelIndex --> paginator is pased on all LI's, not just the Models","                liElements = viewNode.all('li');","                liElements.some(","                    function(node, index) {","                        if (!node.hasClass(MODEL_CLASS)) {","                            modelOrIndex++;","                        }","                        return index===modelOrIndex;","                    }","                );","            }","        }","        else {","            modelNode = modelOrIndex && instance.getNodeFromModel(modelOrIndex, maxExpansions);","            nodePosition = getNodePosition(modelNode);","            if (paginatorPlugin && (nodePosition!==0)) {","                // transform model to an index","                liElements = viewNode.all('li');","                modelOrIndex = 0;","                liElements.some(","                    function(node, index) {","                        var found = (node===modelNode);","                        if (found) {","                            modelOrIndex = index;","                        }","                        return found;","                    }","                );","            }","        }","        instance._focusModelNode(modelNode);","        if ((modelNode) && (nodePosition!==0)) {","            onTop = (nodePosition===-1);","            if (yAxis) {","                modelNodeEdge = modelNode.getY();","                currentOffset = instance.get('scrollY');","                modelNodeSize = modelNode.get('offsetHeight') + GETSTYLE(modelNode, 'marginTop') + GETSTYLE(modelNode, 'marginBottom');","                maxOffset = viewNode.get('offsetHeight') - boundingBoxSize;","            }","            else {","                modelNodeEdge = modelNode.getX();","                currentOffset = instance.get('scrollX');","                modelNodeSize = modelNode.get('offsetWidth') + GETSTYLE(modelNode, 'marginLeft') + GETSTYLE(modelNode, 'marginRight');","                maxOffset = viewNode.get('offsetWidth') - boundingBoxSize;","            }","            // You might need to expand the list in case ITSAScrollViewInifiniteScroll is pluged-in AND maxOffset<newOffset","            // Only 1 time is needed: getNodeFromModel already has expanded a number of times to make the Node available","            if (infiniteScrollPlugin && !onTop) {","//=============================================================================================================================","//","// NEED SOME WORK HERE: infiniteScrollPlugin.expandList IS ASYNCHROUS --> WE NEED PROMISES TO BE SURE IT HAS FINISHED HIS JOB","//","//=============================================================================================================================","                infiniteScrollPlugin.checkExpansion();","            }","            if (paginatorPlugin) {","                if (!onTop) {","                    while ((modelNodeSize<boundingBoxSize) && (modelOrIndex>0)) {","                        corrected = true;","                        modelOrIndex--;","                        modelNode = modelNode.previous('li');","                        if (yAxis) {","                            modelNodeSize += modelNode.get('offsetHeight') + GETSTYLE(modelNode, 'marginTop') + GETSTYLE(modelNode, 'marginBottom');","                        }","                        else {","                            modelNodeSize += modelNode.get('offsetWidth') + GETSTYLE(modelNode, 'marginLeft') + GETSTYLE(modelNode, 'marginRight');","                        }","                    }","                    if (corrected) {","                        modelOrIndex++;","                    }","                    modelOrIndex = Math.min(modelOrIndex, instance._getMaxPaginatorGotoIndex(modelOrIndex, maxExpansions));","                }","                paginatorPlugin.scrollToIndex(modelOrIndex);","            }","            else {","                newOffset = Math.round(currentOffset + modelNodeEdge - boundingBoxEdge - (onTop ? 0 : (boundingBoxSize-modelNodeSize)));","                if (yAxis) {","                    instance.saveScrollTo(null, newOffset);","                }","                else {","                    instance.saveScrollTo(newOffset, null);","                }","            }","        }","        else {","            if (!modelNode) {","            }","            else {","            }","        }","    },","","    /**","     * If the Model/Models has a 'selected-status' in the ScrollView-instance.","     *","     * @method modelIsSelected","     * @param {Y.Model|Array} model Model or Array of Models to be checked. May also be items of a LazyModelList,","     * in which case it might not be a true Model, but an Object.","     * @return {Boolean} whether the Model (or all Models) have a 'selected-status'","     * @since 0.1","    */","    modelIsSelected : function(model) {","        var instance = this,","            selected;","","        if (Lang.isArray(model)) {","            YArray.some(","                model,","                function(onemodel) {","                    selected = instance._selectedModels[instance.getModelAttr(onemodel, 'clientId')];","                    return selected ? false : true;","                }","            );","        }","        else {","            selected = instance._selectedModels[instance.getModelAttr(model, 'clientId')];","        }","        return Lang.isValue(selected);","    },","","    /**","     * Of all the supplied Models: sets the 'selected-status' in the ScrollView-instance to true","     *","     * @method selectModels","     * @param {Y.Model|Array} models Model or Array of Models to be checked. May also be items of a LazyModelList,","     * in which case it might not be a true Model, but an Object.","     * @param {boolean} [scrollIntoView] makes the first selected Model scroll into the View (at the top).","     * @param {Object} [options] To force the 'scrollIntoView' to scroll on top or on bottom of the view.","     *     @param {Boolean} [options.forceTop=false] if 'true', the (first) selected item will always be positioned on top.","     *     @param {Boolean} [options.forceBottom=false] if 'true', the (first) selected item will always be positioned on bottom.","     * @param {boolean} [silent] set true if you don't want a 'modelSelectionChange'-event to be fired.","     * @param {Int} [maxExpansions] Only needed when you use the plugin <b>ITSAScrollViewInifiniteScroll</b>. Use this value to limit","     * expansion data-calls. It will prevent you from falling into endless expansion when the list is infinite. If not set this method will expand","     * at the <b>max of ITSAScrollViewInifiniteScroll.get('maxExpansions') times by default</b>. If you are responsible for the external data and","     * that data is limited, you might choose to set this value that high to make sure all data is rendered in the scrollview.","     * @since 0.1","    */","    selectModels : function(models, scrollIntoView, options, silent, maxExpansions) {","//=============================================================================================================================","//","// NEED SOME WORK HERE: MIGHT BE ASYNCHROUS --> WE NEED TO RETURN A PROMISE","//","//=============================================================================================================================","        var instance = this,","            isArray = Lang.isArray(models),","            singleSelectable = (instance.get('modelsSelectable')==='single'),","            prevSize, contentBox;","","        if (singleSelectable) {","            instance.clearSelectedModels(true, true);","        }","        if (!silent) {","            contentBox = instance.get('contentBox');","            prevSize = contentBox.all('.'+SVML_SELECTED_CLASS).size();","        }","","        if (isArray && !singleSelectable) {","            YArray.each(","                models,","                function(model) {","                    instance._selectModel(model, true, maxExpansions);","                }","            );","            if (scrollIntoView && (models.length>0)) {","                instance.scrollIntoView(models[0], options, maxExpansions);","            }","        }","        else {","            if (isArray) {","                models = models[0];","            }","            instance._selectModel(models, true, maxExpansions);","            if (scrollIntoView) {","                instance.scrollIntoView(models, options, maxExpansions);","            }","        }","        if (!silent && (prevSize!==contentBox.all('.'+SVML_SELECTED_CLASS).size())) {","            instance._fireSelectedModels();","        }","    },","","    /**","     * Of all the supplied Models: sets the 'selected-status' in the ScrollView-instance to true","     *","     * @method unselectModels","     * @param {Y.Model|Array} models Model or Array of Models to be checked","     * @param {boolean} [silent] set true if you don't want a 'modelSelectionChange'-event to be fired.","     * @since 0.1","    */","    unselectModels : function(models, silent) {","        var instance = this,","            prevSize, contentBox;","","        if (!silent) {","            contentBox = instance.get('contentBox');","            prevSize = contentBox.all('.'+SVML_SELECTED_CLASS).size();","        }","        if (Lang.isArray(models)) {","            YArray.each(","                models,","                function(model) {","                    instance._selectModel(model, false);","                }","            );","        }","        else {","            instance._selectModel(models, false);","        }","        if (!silent && (prevSize!==contentBox.all('.'+SVML_SELECTED_CLASS).size())) {","            instance._fireSelectedModels();","        }","    },","","    /**","     * Of all the selected Models: sets the 'selected-status' in the ScrollView-instance to false","     *","     * @method clearSelectedModels","     * @param {boolean} [silent] set true if you don't want a 'modelSelectionChange'-event to be fired.","     * @param {boolean} [force] set true if you want to force unselect all models, even if the attribute 'modelsUnselectable' is true.","     * @since 0.1","    */","    clearSelectedModels : function(silent, force) {","        var instance = this,","            contentBox = instance.get('contentBox'),","            currentSelected, fireEvent, firstSelected, clientId, model, modelList;","","        currentSelected = contentBox.all('.'+SVML_SELECTED_CLASS);","        firstSelected = (currentSelected.size()>0) && currentSelected.item(0);","        if (silent) {","            currentSelected.removeClass(SVML_SELECTED_CLASS);","        }","        else {","            fireEvent = (currentSelected.size()>0);","            currentSelected.removeClass(SVML_SELECTED_CLASS);","            if (fireEvent) {","                instance._fireSelectedModels();","            }","        }","        instance._selectedModels = {};","        if (instance.get('modelsUnselectable') && firstSelected && !force) {","            clientId = firstSelected.getData('modelClientId');","            modelList = instance._abberantModelList || instance.get('modelList');","            model = modelList.getByClientId(clientId);","            instance.selectModels(model, false, null, true);","        }","    },","","    /**","     * Returns an Array with the Models that have the 'selected-status' in the ScrollView-instance set to true","     *","     * @method getSelectedModels","     * @param {Boolean} original If set to true: the original Models will be returned (unique). If false (or undefined)<br>","     * then -in case of repeated Models (see attribute 'modelConfig')- the subModel (dup or splitted) will be returned. In the","     * latter case, you have full control of the exact item that was selected.","     * @return {Array} Array with all unique Models that are selected. In case of LazyModelList, it might be Objects instead of Models.","     * @since 0.1","     */","    getSelectedModels : function(original) {","        var instance = this,","            selected;","","        if (!original) {","            selected = YObject.values(instance._selectedModels);","        }","        else {","            selected = [];","            YObject.each(","                instance._selectedModels,","                function(model) {","                    // if model.get('clientId') is defined in _originalModels, then it has an originalModel","                    var originalModel = instance._originalModels[instance.getModelAttr(model, 'clientId')];","                    if (!originalModel || (YArray.indexOf(selected, originalModel) === -1)) {","                        selected.push(originalModel || model);","                    }","                }","            );","        }","        return selected;","    },","","    /**","     * Renders the ModelList within _viewNode (which is inside the contentBox of the ScrollView-instance).","     * Call this method, when the ModelList.comapator changes, or when you are using LazyModelList and an item (Model or object) changes.","     * Is called automaticly on 'add', 'remove' and 'reset' events of the (Lazy)ModelList. And in case of ModelList:","     * also on *:change-events of a Model (but only when the Models-position changes or its groupHeaders)","     *","     * @method renderView","     * @since 0.1","     *","    */","    renderView : function() {","        this._renderView();","    },","","    /**","     * Gets an attribute-value from a Model OR object. Depends on the state (Lazy or not).","     * Will always work, whether an Y.ModelList or Y.LazyModelList is attached.","     *","     * @method getModelAttr","     * @param {Y.Model} model the model (or extended class) from which the attribute has to be read.","     * @param {String} name Attribute name or object property path.","     * @return {Any} Attribute value, or `undefined` if the attribute doesn't exist, or 'null' if no model is passed.","     * @since 0.1","     *","    */","    getModelAttr: function(model, name) {","        return model && ((model.get && (Lang.type(model.get) === 'function')) ? model.get(name) : model[name]);","    },","","    /**","     * Sets an attribute-value of a Model OR object. Depends on the state (Lazy or not).","     * Will always work, whether an Y.ModelList or Y.LazyModelList is attached.","     * If you want to be sure the Model fires an attributeChange-event, then set 'revive' true. This way","     * lazy-Models will become true Models and fire an attributeChange-event. When the attibute was lazy before,","     * it will return lazy afterwards.","     *","     * @method setModelAttr","     * @param {Y.Model} model the model (or extended class) from which the attribute has to be read.","     * @param {Boolean} revive Whether to force a lazy-model to revive (when lazy before: will be lazy afterwards)","     * @param {String} name Attribute name or object property path.","     * @param {any} value Value to set.","     * @param {Object} [options] Data to be mixed into the event facade of the `change` event(s) for these attributes.","     * In case of Lazy-Model, this only has effect when 'revive' is true.","     *    @param {Boolean} [options.silent=false] If `true`, no `change` event will be fired.","     * @since 0.1","     *","    */","    setModelAttr: function(model, revive, name, value, options) {","        var instance = this,","            modelIsLazy, modelList;","","        if (model) {","            modelIsLazy = !model.get || (Lang.type(model.get) !== 'function');","            if (modelIsLazy) {","                if (revive) {","                    modelList = instance.get('modelList');","                    if (instance._modelListIsLazy && revive) {","                        modelList.revive(model);","                    }","                    model.set(name, value, options);","                    if (instance._modelListIsLazy && revive) {","                        modelList.free(model);","                    }","                }","                else {","                    model[name] = value;","                }","            }","            else {","                model.set(name, value, options);","            }","        }","    },","","    /**","     * Cleans up bindings and removes plugin","     * @method destructor","     * @protected","     * @since 0.1","    */","    destructor : function() {","        var instance = this,","            modellist = instance.get('modelList');","","        instance._clearEventhandlers();","        modellist.removeTarget(instance);","        if (instance._selectableModelEvent) {","            instance._selectableModelEvent.detach();","        }","        if (instance._clickModelEvent) {","            instance._clickModelEvent.detach();","        }","        if (instance._mouseDownModelEvent) {","            instance._mouseDownModelEvent.detach();","        }","        if (instance._mouseUpModelEvent) {","            instance._mouseUpModelEvent.detach();","        }","        if (instance._mouseenterModelEvent) {","            instance._mouseenterModelEvent.detach();","        }","        if (instance._mouseleaveModelEvent) {","            instance._mouseleaveModelEvent.detach();","        }","        instance._viewNode.destroy(true);","    },","","    //===============================================================================================","    // private methods","    //===============================================================================================","","    /**","     * Does the rendering stuff, is called after the ScrollView-instance itself is rendered.","     *","     * @method _render","     * @private","     * @since 0.1","     *","    */","    _render: function() {","        var instance = this,","            modellist = instance.get('modelList'),","            viewNode;","","        instance._viewNode = viewNode = YNode.create(VIEW_TEMPLATE);","        viewNode.set('id', instance._viewId);","        instance._extraBindUI();","        if (modellist) {","            instance._renderView(null, true);","        }","    },","","    /**","     * Focusses the modelNode and adds the className 'itsa-scrollviewmodel-focus'.","     * Previous focussed Node will be unmarked.","     *","     * @method _focusModelNode","     * @param {Y.Node} modelNode the ModelNode that should gain focus.","     * @private","     * @since 0.1","     *","    */","    _focusModelNode: function(modelNode) {","        if (modelNode) {","            this._viewNode.all('.'+SVML_FOCUS_CLASS).removeClass(SVML_FOCUS_CLASS);","            modelNode.addClass(SVML_FOCUS_CLASS);","            modelNode.focus();","        }","    },","","    /**","     * Returns the maximum PaginatorIndex that should be called. This is <b>lower</b> than the list-size, because","     * it is the uppermost item on the last page. This is handy, because scrollview.pages.scrollToIndex(lastitem)","     * bumbs too much.","     * <u>Be careful if you use the plugin ITSAScrollViewInifiniteScroll:</u> to get the last Node, there might be a lot of","     * list-expansions triggered. Be sure that expansions from external data does end, otherwise it will overload the browser.","     * That's why the param is needed.","     *","     * @method _getMaxPaginatorGotoIndex","     * @param {Int} searchedIndex index that needs to besearched for. This will prevent a complete rendering of all items when not needed.","     * This only applies when the ITSAScrollViewInifiniteScroll is plugged in.","     * @param {Int} [maxExpansions] Only needed when you use the plugin <b>ITSAScrollViewInifiniteScroll</b>. Use this value to limit","     * expansion data-calls. It will prevent you from falling into endless expansion when the list is infinite. If not set this method will expand","     * at the <b>max of ITSAScrollViewInifiniteScroll.get('maxExpansions') times by default</b>. If you are responsible for the external data and","     * that data is limited, you might choose to set this value that high to make sure all data is rendered in the scrollview.","     * @return {Int} maximum PaginatorIndex that should be called.","     * @private","     * @since 0.1","     *","    */","    _getMaxPaginatorGotoIndex : function(searchedIndex, maxExpansions) {","//=============================================================================================================================","//","// NEED SOME WORK HERE: MIGHT BE ASYNCHROUS --> WE NEED TO RETURN A PROMISE","//","//=============================================================================================================================","        var instance = this,","            paginator = instance.hasPlugin('pages'),","            modelList = instance._abberantModelList || instance.get('modelList'),","            axis = instance.get('axis'),","            yAxis = axis.y,","            boundingSize = instance.get('boundingBox').get(yAxis ? 'offsetHeight' : 'offsetWidth'),","            i = 0,","            lastNode, size, liElements;","","        if (paginator && (modelList.size()>0)) {","            lastNode = instance.getNodeFromIndex(Math.min(searchedIndex, modelList.size()-1), maxExpansions);","            if (yAxis) {","                size = lastNode.get('offsetHeight') + GETSTYLE(lastNode, 'marginTop') + GETSTYLE(lastNode, 'marginBottom');","            }","            else {","                size = lastNode.get('offsetWidth') + GETSTYLE(lastNode, 'marginLeft') + GETSTYLE(lastNode, 'marginRight');","            }","            liElements = instance._viewNode.all('li');","            i = liElements.size();","            while (lastNode && (--i>=0) && (size<boundingSize)) {","                lastNode = liElements.item(i);","                if (yAxis) {","                    size += lastNode.get('offsetHeight') + GETSTYLE(lastNode, 'marginTop') + GETSTYLE(lastNode, 'marginBottom');","                }","                else {","                    size += lastNode.get('offsetWidth') + GETSTYLE(lastNode, 'marginLeft') + GETSTYLE(lastNode, 'marginRight');","                }","            }","            if (size>=boundingSize) {i++;}","        }","        return i;","    },","","    /**","     * Binding all events we need to make ModelList work with the ScrollView-instance","     *","     * @method _extraBindUI","     * @private","     * @since 0.1","    */","    _extraBindUI : function() {","        var instance = this,","            boundingBox = instance.get('boundingBox'),","            modellist = instance.get('modelList'),","            eventhandlers = instance._eventhandlers;","","        // making models bubble up to the scrollview-instance:","        if (modellist) {","            modellist.addTarget(instance);","            boundingBox.addClass(SVML_CLASS);","        }","        // If the model gets swapped out, reset events and reset targets accordingly.","        eventhandlers.push(","            instance.after('modelListChange', function (ev) {","                var newmodellist = ev.newVal,","                    prevmodellist = ev.prevVal;","                if (prevmodellist) {","                    prevmodellist.removeTarget(instance);","                }","                if (newmodellist) {","                    newmodellist.addTarget(instance);","                    boundingBox.addClass(SVML_CLASS);","                    instance.renderView();","                }","                else {","                    boundingBox.removeClass(SVML_CLASS);","                    instance.get('contentBox').setHTML('');","                }","            })","        );","        // This was a though one!!","        // When paginator is plugged in, the scrollview-instance will make instance._gesture to become not null","        // when clicking without movement. This would lead th ePaginatorPlugin to make y-movement=null within pages._afterHostGestureMoveEnd()","        // Thus, we need to reset _gesture when click without movement","        eventhandlers.push(","            boundingBox.delegate(","                'click',","                function() {","                    instance._gesture = null;","                },","                function() {","                    // Only handle click-event when there was motion less than 'clickSensivity' pixels","                    var scrollingInAction = (Math.abs(instance.lastScrolledAmt) > instance.get('clickSensivity'));","                    return (!scrollingInAction);","                }","            )","        );","        // Re-render the view when a model is added to or removed from the modelList","        // because we made it bubble-up to the scrollview-instance, we attach the listener there.","        eventhandlers.push(","            instance.after('reset', instance._resetView, instance)","        );","        eventhandlers.push(","            instance.after('remove', instance._renderView, instance)","        );","        eventhandlers.push(","            instance.after('add', instance._renderViewCheckAppend, instance)","        );","        eventhandlers.push(","            instance.after('*:change', instance._renderModelOrView, instance)","        );","    },","","    /**","     * Setter for attribute modelList. Stores whether a Y.ModelList, or a Y.LazyModelList is set.","     *","     * @method _setModelList","     * @param {Object} val the new set value for this attribute","     * @private","     * @since 0.1","     *","    */","    _setModelList : function(val) {","        var instance = this;","","        instance._modelListIsLazy = (val instanceof Y.LazyModelList);","    },","","    /**","     * Setter for attribute noDups. Will re-render the view when changed UNLESS it is called from setWithoutRerender().","     *","     * @method _setNoDups","     * @param {Function} val the new set value for this attribute","     * @private","     * @since 0.1","     *","    */","    _setNoDups : function(val) {","        var instance = this;","","        if (instance._setNoDupsInitiated) {","            if (instance._rerenderAttributesOnChange) {","                instance._renderView({noDups: val});","            }","        }","        else {","            instance._setNoDupsInitiated = true;","        }","    },","","    /**","     * Setter for attribute viewFilter. Will re-render the view when changed UNLESS it is called from setWithoutRerender().","     *","     * @method _setViewFilter","     * @param {Function} val the new set value for this attribute","     * @private","     * @since 0.1","     *","    */","    _setViewFilter : function(val) {","        var instance = this;","","        if (instance._setViewFilterInitiated) {","            if (instance._rerenderAttributesOnChange) {","                instance._renderView({viewFilter: val});","            }","        }","        else {","            instance._setViewFilterInitiated = true;","        }","    },","","    /**","     * Setter for attribute lastItemOnTop. Will re-render the view when changed UNLESS it is called from setWithoutRerender().","     *","     * @method _setLastItemOnTop","     * @param {Boolean} val the new set value for this attribute","     * @private","     * @since 0.1","     *","    */","    _setLastItemOnTop : function(val) {","        var instance = this;","","        if (instance._setLastItemOnTopInitiated) {","            if (instance._rerenderAttributesOnChange) {","                instance._renderView({lastItemOnTop: val});","            }","        }","        else {","            instance._setLastItemOnTopInitiated = true;","        }","    },","","","    /**","     * Setter for attribute groupHeader1. Will re-render the view when changed UNLESS it is called from setWithoutRerender().","     *","     * @method _setDupComparator","     * @param {Function} val the new set value for this attribute","     * @private","     * @since 0.1","     *","    */","    _setDupComparator : function(val) {","        var instance = this;","","        if (instance._setDupComparatorInitiated) {","            if (instance._rerenderAttributesOnChange && instance.get('noDups')) {","                instance._renderView({dupComparator: val});","            }","        }","        else {","            instance._setDupComparatorInitiated = true;","        }","    },","","    /**","     * Setter for attribute groupHeader1. Will re-render the view when changed UNLESS it is called from setWithoutRerender().","     *","     * @method _setGroupHeader1","     * @param {Function} val the new set value for this attribute","     * @private","     * @since 0.1","     *","    */","    _setGroupHeader1 : function(val) {","        var instance = this;","","        if (instance._setGroupHeader1Initiated) {","            if (instance._rerenderAttributesOnChange) {","                instance._renderView({groupHeader1: val});","            }","        }","        else {","            instance._setGroupHeader1Initiated = true;","        }","    },","","    /**","     * Setter for attribute groupHeader2. Will re-render the view when changed UNLESS it is called from setWithoutRerender().","     *","     * @method _setGroupHeader2","     * @param {Function} val the new set value for this attribute","     * @private","     * @since 0.1","     *","    */","    _setGroupHeader2 : function(val) {","        var instance = this;","","        if (instance._setGroupHeader2Initiated) {","            if (instance._rerenderAttributesOnChange) {","                instance._renderView({groupHeader2: val});","            }","        }","        else {","            instance._setGroupHeader2Initiated = true;","        }","    },","","    /**","     * Setter for attribute groupHeader3. Will re-render the view when changed UNLESS it is called from setWithoutRerender().","     *","     * @method _setGroupHeader3","     * @param {Function} val the new set value for this attribute","     * @private","     * @since 0.1","     *","    */","    _setGroupHeader3 : function(val) {","        var instance = this;","","        if (instance._setGroupHeader3Initiated) {","            if (instance._rerenderAttributesOnChange) {","                instance._renderView({groupHeader3: val});","            }","        }","        else {","            instance._setGroupHeader3Initiated = true;","        }","    },","","    /**","     * Setter for attribute renderGroupHeader1. Will re-render the view when changed UNLESS it is called from setWithoutRerender().","     *","     * @method _setRenderGroupHeader1","     * @param {Function} val the new set value for this attribute","     * @private","     * @since 0.1","     *","    */","    _setRenderGroupHeader1 : function(val) {","        var instance = this;","","        if (instance._setRenderGroupHeader1Initiated) {","            if (instance._rerenderAttributesOnChange) {","                instance._renderView({renderGroupHeader1: val});","            }","        }","        else {","            instance._setRenderGroupHeader1Initiated = true;","        }","    },","","    /**","     * Setter for attribute renderGroupHeader2. Will re-render the view when changed UNLESS it is called from setWithoutRerender().","     *","     * @method _setRenderGroupHeader2","     * @param {Function} val the new set value for this attribute","     * @private","     * @since 0.1","     *","    */","    _setRenderGroupHeader2 : function(val) {","        var instance = this;","","        if (instance._setRenderGroupHeader2Initiated) {","            if (instance._rerenderAttributesOnChange) {","                instance._renderView({renderGroupHeader2: val});","            }","        }","        else {","            instance._setRenderGroupHeader2Initiated = true;","        }","    },","","    /**","     * Setter for attribute renderGroupHeader3. Will re-render the view when changed UNLESS it is called from setWithoutRerender().","     *","     * @method _setRenderGroupHeader3","     * @param {Function} val the new set value for this attribute","     * @private","     * @since 0.1","     *","    */","    _setRenderGroupHeader3 : function(val) {","        var instance = this;","","        if (instance._setRenderGroupHeader3Initiated) {","            if (instance._rerenderAttributesOnChange) {","                instance._renderView({renderGroupHeader3: val});","            }","        }","        else {","            instance._setRenderGroupHeader3Initiated = true;","        }","    },","","    /**","     * Setter for attribute renderModel. Will re-render the view when changed UNLESS it is called from setWithoutRerender().","     *","     * @method _setRenderModel","     * @param {Function} val the new set value for this attribute","     * @private","     * @since 0.1","     *","    */","    _setRenderModel : function(val) {","        var instance = this;","","        if (instance._setRenderModelInitiated) {","            if (instance._rerenderAttributesOnChange) {","                instance._renderView({renderModel: val});","            }","        }","        else {","            instance._setRenderModelInitiated = true;","        }","    },","","    /**","     * Setter for attribute modelsSelectable. Transforms val into three posible states: null, 'single' and 'multi'","     * Also resets _selectableModelEvent.","     *","     * @method _setModelsSelectable","     * @param {Boolean|String|null} val","     * @private","     * @since 0.1","     *","    */","    _setModelsSelectable : function(val) {","        var instance = this;","","        if ((val==='') || !val) {","            val = null;","        }","        else if (Lang.isBoolean(val)) {","            // val===true","            val = 'multi';","        }","        // At this point, val can have three states: null, 'single' and 'multi'","        instance._setSelectableEvents(val);","        return val;","    },","","    /**","     * Setter for attribute modelListStyled. Adds or removes the class 'itsa-scrollviewmodellist-styled' to the boundingBox.","     *","     * @method _setModelListStyled","     * @param {Boolean} val","     * @private","     * @since 0.1","     *","    */","    _setModelListStyled : function(val) {","        var instance = this;","","        instance.get('boundingBox').toggleClass(SVML_STYLE_CLASS, val);","    },","","    /**","     * Sets or removes selectable click-events when the mouse clicks on a Model.","     *","     * @method _setSelectableEvents","     * @param {Boolean} val","     * @private","     * @since 0.1","     *","    */","    _setSelectableEvents : function(val) {","        var instance = this,","            contentBox = instance.get('contentBox');","","        instance.clearSelectedModels();","        if (val && !instance._selectableModelEvent) {","            instance._selectableModelEvent = contentBox.delegate(","                'click',","                Y.rbind(instance._handleModelSelectionChange, instance),","                function() {","                    // Only handle click-event when there was motion less than 'clickSensivity' pixels","                    var scrollingInAction = (Math.abs(instance.lastScrolledAmt) > instance.get('clickSensivity'));","                    return (!scrollingInAction && this.hasClass(MODEL_CLASS));","                }","            );","        }","        else if (!val && instance._selectableModelEvent) {","            instance._selectableModelEvent.detach();","            instance._selectableModelEvent = null;","        }","    },","","    /**","     * Sets or removes click-events when the mouse clicks on a Model.","     *","     * @method _setClickEvents","     * @param {Boolean} val","     * @private","     * @since 0.1","     *","    */","    _setClickEvents : function(val) {","        var instance = this,","            contentBox = instance.get('contentBox');","","        if (val && !instance._clickModelEvent) {","            /**","             * Is fired when the user positions the mouse over a Model.","             *","             * @event modelClick","             * @param {Y.Node} node the node that was clicked.","             * @param {Y.Model} model the model that was bound to the node.","             * @since 0.1","            **/","            instance._clickModelEvent = contentBox.delegate(","                'click',","                function(e) {","                    var node = e.currentTarget,","                        modelList = instance.get('modelList'),","                        modelClientId = node.getData('modelClientId'),","                        model = modelList && modelList.getByClientId(modelClientId);","                    instance.fire('modelClick', {node: node, model: model});","                },","                function() {","                    // Only handle click-event when there was motion less than 'clickSensivity' pixels","                    var scrollingInAction = (Math.abs(instance.lastScrolledAmt) > instance.get('clickSensivity'));","                    return (!scrollingInAction && this.hasClass(MODEL_CLASS));","                }","            );","        }","        else if (!val && instance._clickModelEvent) {","            instance._clickModelEvent.detach();","            instance._clickModelEvent = null;","        }","    },","","    /**","     * Sets or removes mousedown- and mouseup-events when the mouse goes down/up on a Model.","     *","     * @method _setMouseDownUpEvents","     * @param {Boolean} val","     * @private","     * @since 0.1","     *","    */","    _setMouseDownUpEvents : function(val) {","        var instance = this,","            contentBox = instance.get('contentBox');","","","        if (val && !instance._mouseDownModelEvent) {","            /**","             * Is fired when the user positions the mouse over a Model.","             *","             * @event modelMouseDown","             * @param {Y.Node} node the node where the mousedown occurs.","             * @param {Y.Model} model the model that was bound to the node.","             * @since 0.1","            **/","            instance._mouseDownModelEvent = contentBox.delegate(","                'mousedown',","                function(e) {","                    var node = e.currentTarget,","                        modelList = instance.get('modelList'),","                        modelClientId = node.getData('modelClientId'),","                        model = modelList && modelList.getByClientId(modelClientId);","                    instance.fire('modelMouseDown', {node: node, model: model});","                },","                '.' + MODEL_CLASS","            );","        }","        else if (!val && instance._mouseDownModelEvent) {","            instance._mouseDownModelEvent.detach();","            instance._mouseDownModelEvent = null;","        }","        if (val && !instance._mouseUpModelEvent) {","            /**","             * Is fired when the user positions the mouse over a Model.","             *","             * @event modelMouseUp","             * @param {Y.Node} node the node where the mouseup occurs.","             * @param {Y.Model} model the model that was bound to the node.","             * @since 0.1","            **/","            instance._mouseUpModelEvent = contentBox.delegate(","                'mouseup',","                function(e) {","                    var node = e.currentTarget,","                        modelList = instance.get('modelList'),","                        modelClientId = node.getData('modelClientId'),","                        model = modelList && modelList.getByClientId(modelClientId);","                    instance.fire('modelMouseUp', {node: node, model: model});","                },","                '.' + MODEL_CLASS","            );","        }","        else if (!val && instance._mouseUpModelEvent) {","            instance._mouseUpModelEvent.detach();","            instance._mouseUpModelEvent = null;","        }","    },","","    /**","     * Sets or removes mouseenter and mouseleave events when the mouse gets over the Models.","     *","     * @method _setHoverEvents","     * @param {Boolean} val","     * @private","     * @since 0.1","     *","    */","    _setHoverEvents : function(val) {","        var instance = this,","            contentBox = instance.get('contentBox');","","        if (val && !instance._mouseenterModelEvent) {","            /**","             * Is fired when the user positions the mouse over a Model.","             *","             * @event modelMouseEnter","             * @param {Y.Node} node the node on which the mouse entered.","             * @param {Y.Model} model the model that was bound to the node.","             * @since 0.1","            **/","            instance._mouseenterModelEvent = contentBox.delegate(","                'mouseenter',","                function(e) {","                    var node = e.currentTarget,","                        modelList = instance.get('modelList'),","                        modelClientId = node.getData('modelClientId'),","                        model = modelList && modelList.getByClientId(modelClientId);","                    instance.fire('modelMouseEnter', {node: node, model: model});","                },","                '.'+MODEL_CLASS","            );","        }","        else if (!val && instance._mouseenterModelEvent) {","            instance._mouseenterModelEvent.detach();","            instance._mouseenterModelEvent = null;","        }","        if (val && !instance._mouseleaveModelEvent) {","            /**","             * Is fired when the user positions the mouse outside a Model.","             *","             * @event modelMouseLeave","             * @param {Y.Node} node the node on which the mouse moved outwards off.","             * @param {Y.Model} model the model that was bound to the node.","             * @since 0.1","            **/","            instance._mouseleaveModelEvent = contentBox.delegate(","                'mouseleave',","                function(e) {","                    var node = e.currentTarget,","                        modelList = instance.get('modelList'),","                        modelClientId = node.getData('modelClientId'),","                        model = modelList && modelList.getByClientId(modelClientId);","                    instance.fire('modelMouseLeave', {node: node, model: model});","                },","                '.'+MODEL_CLASS","            );","        }","        else if (!val && instance._mouseleaveModelEvent) {","            instance._mouseleaveModelEvent.detach();","            instance._mouseleaveModelEvent = null;","        }","    },","","    /**","     * Updates the styles of the selected Models and fires a 'modelSelectionChange'-event.","     *","     * @method _handleModelSelectionChange","     * @param {eventTarget} [e] The eventTarget after a selectionChange","     * @private","     * @since 0.1","     */","    _handleModelSelectionChange : function(e) {","        var instance = this,","            modelNode = e.currentTarget,","            // first check _abberantModelList --> this might be available and it will overrule this.get('modelList')","            modelList = instance._abberantModelList || instance.get('modelList'),","            modelClientId = modelNode.getData('modelClientId'),","            model = modelList && modelList.getByClientId(modelClientId),","            modelsSelectable = instance.get('modelsSelectable'),","            singleSelectable = (modelsSelectable==='single'),","            shiftClick = e.shiftKey && !singleSelectable,","            ctrlClick = (e.metaKey || e.ctrlKey),","            viewFilter = instance.get('viewFilter'),","            modelPrevSelected, multipleModels, newModelIndex, prevModelIndex, startIndex, endIndex, i, nextModel,","            currentSelected, firstItemSelected;","","        modelPrevSelected = model && instance.modelIsSelected(model);","        if (model) {","            // At this stage, 'modelsSelectable' is either 'single' or 'multi'","            if (singleSelectable || !ctrlClick) {","                if (instance.get('modelsUnselectable')) {","                    currentSelected = instance._viewNode.all('.'+SVML_SELECTED_CLASS);","                    firstItemSelected = (currentSelected.size()>0) && currentSelected.item(0);","                }","                instance.clearSelectedModels(true, true);","            }","            if (shiftClick && instance._lastClickedModel) {","                multipleModels = [];","                newModelIndex = modelList.indexOf(model);","                prevModelIndex = modelList.indexOf(instance._lastClickedModel);","                startIndex = Math.min(newModelIndex, prevModelIndex);","                endIndex = Math.max(newModelIndex, prevModelIndex);","                for (i=startIndex; i<=endIndex; i++) {","                    nextModel = modelList.item(i);","                    if (!viewFilter || viewFilter(nextModel)) {","                        multipleModels.push(nextModel);","                    }","                }","                instance.selectModels(multipleModels, false, null, true);","            }","            else {","                if (modelPrevSelected && !firstItemSelected) {","                    instance.unselectModels(model, true);","                }","                else {","                    instance.selectModels(model, false, null, true);","                }","                // store model because we need to know which model received the last click","                // We need to know in case of a future shift-click","                instance._lastClickedModel = modelPrevSelected ? null : model;","            }","            instance._focusModelNode(modelNode);","        }","        instance._fireSelectedModels();","    },","","    /**","     * Renders the ModelList within _viewNode (which is inside the contentBox of the ScrollView-instance).","     * Does not need to be called standalone, because eventlisteners will sync automaticly on ModelList-changes.","     *","     * @method _renderView","     * @param {Object} [setterAtrs] Definition of fields which called this method internally. Only for internal use within some attribute-setters.","     * @param {Boolean} [forceRebuild] Forces the list to be cleared and rebuild from the ground up.","     * @private","     * @since 0.1","     *","    */","    _renderView : function(setterAtrs, forceRebuild) {","        var instance = this,","            viewNode = instance._viewNode,","            contentBox = instance.get('contentBox'),","            modelList = instance.get('modelList'),","            firstModel = modelList && (modelList.size()>0) && modelList.item(0),","            noDups = (setterAtrs && setterAtrs.noDups) || instance.get('noDups'),","            dupComparator = (setterAtrs && setterAtrs.dupComparator) || instance.get('dupComparator'),","            viewFilter = (setterAtrs && setterAtrs.viewFilter) || instance.get('viewFilter'),","            renderModel = (setterAtrs && setterAtrs.renderModel) || instance.get('renderModel'),","            groupHeader1Func = (setterAtrs && setterAtrs.groupHeader1) || instance.get('groupHeader1'),","            groupHeader2Func = (setterAtrs && setterAtrs.groupHeader2) || instance.get('groupHeader2'),","            groupHeader3Func = (setterAtrs && setterAtrs.groupHeader3) || instance.get('groupHeader3'),","            renderGroupHeader1 = (setterAtrs && setterAtrs.renderGroupHeader1) || instance.get('renderGroupHeader1') || groupHeader1Func,","            renderGroupHeader2 = (setterAtrs && setterAtrs.renderGroupHeader2) || instance.get('renderGroupHeader2') || groupHeader2Func,","            renderGroupHeader3 = (setterAtrs && setterAtrs.renderGroupHeader3) || instance.get('renderGroupHeader3') || groupHeader3Func,","            lastItemOnTop = (setterAtrs && setterAtrs.lastItemOnTop) || instance.get('lastItemOnTop'),","            activeGroupHeader1 = firstModel && groupHeader1Func && Lang.isValue(groupHeader1Func(firstModel)),","            activeGroupHeader2 = firstModel && groupHeader2Func && Lang.isValue(groupHeader2Func(firstModel)),","            activeGroupHeader3 = firstModel && groupHeader3Func && Lang.isValue(groupHeader3Func(firstModel)),","            infiniteView = instance.itssvinfinite,","            header1, header2, header3, modelConfig, modelNode,","            axis, xAxis, yAxis, boundingBox, viewsize, elementsize, lastModelNode, renderedModel, prevRenderedModel,","            modelClientId, headerNode, i, model, modelListItems, batchSize, items, modelListItemsLength, dupAvailable;","","        dupAvailable = function(model) {","            var dupFound = false,","                modelComp = dupComparator(model);","            YArray.some(","                modelListItems,","                function(checkModel) {","                    if (checkModel===model) {return true;}","                    dupFound = (dupComparator(checkModel)===modelComp);","                    return dupFound;","                }","            );","            return dupFound;","        };","        if (!contentBox.one('#'+instance._viewId)) {","            contentBox.setHTML(viewNode);","            instance._set('srcNode', contentBox);","        }","        // if it finds out there is a 'modelconfig'-attribute, then we need to make extra steps:","        // we do not render the standard 'modelList', but we create a second modellist that might have more models: these","        // will be the models that are repeated due to a count-value or an enddate when duplicateWhenDurationCrossesMultipleDays is true.","        modelListItems = modelList._items.concat();","        modelListItemsLength = modelListItems.length;","        if (!infiniteView || forceRebuild) {","            viewNode.setHTML('');","            i = 0;","            batchSize = modelListItemsLength;","            instance._prevHeader1 = null;","            instance._prevHeader2 = null;","            instance._prevHeader3 = null;","            instance._even = false;","            if (infiniteView) {","                instance._moreItemsAvailable = true;","            }","        }","        else {","            i = (instance._prevLastModelIndex || -1) + 1;","        }","        if (infiniteView) {","            batchSize = Math.min(instance.itssvinfinite.get('batchSize'), modelListItemsLength);","        }","        if (instance._generateAbberantModelList) {","            modelConfig = (setterAtrs && setterAtrs.modelConfig) || instance.get('modelConfig');","            if (modelConfig && modelConfig.date && (modelConfig.enddate || modelConfig.count)) {","                instance._generateAbberantModelList(infiniteView, forceRebuild);","                modelList = instance._abberantModelList;","                // reset next 2 items","                modelListItems = modelList._items.concat();","                modelListItemsLength = modelListItems.length;","            }","            else {","                // clear _abberantModelList to make sure in other methods the actual modelList (from attribute) will be used.","                instance._abberantModelList = null;","            }","        }","        else {","            // clear _abberantModelList to make sure in other methods the actual modelList (from attribute) will be used.","            instance._abberantModelList = null;","        }","        items = 0;","        while ((items<batchSize) && (i<modelListItemsLength)) {","            model = modelListItems[i];","            modelClientId = instance.getModelAttr(model, 'clientId');","            if ((!viewFilter || viewFilter(model)) &&","                (!noDups ||","                (!dupComparator && ((renderedModel = renderModel(model))!==prevRenderedModel)) ||","                (dupComparator && !dupAvailable(model)))","               ) {","                items++;","                modelNode = YNode.create(VIEW_MODEL_TEMPLATE);","                if (activeGroupHeader1) {","                    header1 = groupHeader1Func(model);","                    if (header1!==instance._prevHeader1) {","                        headerNode = YNode.create(VIEW_MODEL_TEMPLATE),","                        headerNode.addClass(GROUPHEADER_CLASS);","                        headerNode.addClass(GROUPHEADER1_CLASS);","                        if (instance._prevHeader1) {","                            headerNode.addClass(GROUPHEADER_SEQUEL_CLASS);","                        }","                        headerNode.setHTML(renderGroupHeader1(model));","                        viewNode.append(headerNode);","                        instance._prevHeader1 = header1;","                        instance._even = false;","                        // force to make a header2 insertion (when apriopriate)","                        instance._prevHeader2 = null;","                    }","                }","                if (activeGroupHeader2) {","                    header2 = groupHeader2Func(model);","                    if (header2!==instance._prevHeader2) {","                        headerNode = YNode.create(VIEW_MODEL_TEMPLATE),","                        headerNode.addClass(GROUPHEADER_CLASS);","                        headerNode.addClass(GROUPHEADER2_CLASS);","                        if (instance._prevHeader2) {","                            headerNode.addClass(GROUPHEADER_SEQUEL_CLASS);","                        }","                        headerNode.setHTML(renderGroupHeader2(model));","                        viewNode.append(headerNode);","                        instance._prevHeader2 = header2;","                        instance._even = false;","                        // force to make a header3 insertion (when apriopriate)","                        instance._prevHeader3 = null;","                    }","                }","                if (activeGroupHeader3) {","                    header3 = groupHeader3Func(model);","                    if (header3!==instance._prevHeader3) {","                        headerNode = YNode.create(VIEW_MODEL_TEMPLATE),","                        headerNode.addClass(GROUPHEADER_CLASS);","                        headerNode.addClass(GROUPHEADER3_CLASS);","                        if (instance._prevHeader3) {","                            headerNode.addClass(GROUPHEADER_SEQUEL_CLASS);","                        }","                        headerNode.setHTML(renderGroupHeader3(model));","                        viewNode.append(headerNode);","                        instance._prevHeader3 = header3;","                        instance._even = false;","                    }","                }","                modelNode.setData('modelClientId', modelClientId);","                modelNode.addClass(MODEL_CLASS);","                modelNode.addClass(modelClientId);","                modelNode.addClass(instance._even ? SVML_EVEN_CLASS : SVML_ODD_CLASS);","                modelNode.setHTML(renderedModel || renderModel(model));","                viewNode.append(modelNode);","                instance._even = !instance._even;","                if (noDups && !dupComparator) {","                    prevRenderedModel = renderedModel;","                }","            }","            i++;","        }","        // _prevLastModelIndex is needed by the plugin infinitescroll","        instance._prevLastModelIndex = i - 1;","        if (modelNode && lastItemOnTop && (!infiniteView || !instance._moreItemsAvailable)) {","            // need to add an extra empty LI-element that has the size of the view minus the last element","            // modelNode is the reference to the last element","            lastModelNode = modelNode;","            axis = instance.get('axis');","            xAxis = axis.x;","            yAxis = axis.y;","            boundingBox = instance.get('boundingBox'),","            modelNode = YNode.create(VIEW_EMPTY_ELEMENT_TEMPLATE),","            modelNode.addClass(EMPTY_ELEMENT_CLASS);","            viewsize = boundingBox.get(xAxis ? 'offsetWidth' : 'offsetHeight');","            if (yAxis) {","                elementsize = viewsize-lastModelNode.get('offsetHeight')-GETSTYLE(lastModelNode,'marginTop')-GETSTYLE(lastModelNode,'marginBottom');","            }","            else {","                elementsize = viewsize-lastModelNode.get('offsetWidth')-GETSTYLE(lastModelNode,'marginLeft')-GETSTYLE(lastModelNode,'marginRight');","            }","            lastModelNode = lastModelNode.previous();","            while (lastModelNode && lastModelNode.hasClass(GROUPHEADER_CLASS)) {","                // also decrease with the size of this LI-element","                if (yAxis) {","                    elementsize -= (lastModelNode.get('offsetHeight')+GETSTYLE(lastModelNode,'marginTop')+GETSTYLE(lastModelNode,'marginBottom'));","                }","                else {","                    elementsize -= (lastModelNode.get('offsetWidth')+GETSTYLE(lastModelNode,'marginLeft')+GETSTYLE(lastModelNode,'marginRight'));","                }","                lastModelNode = lastModelNode.previous();","            }","            modelNode.setStyle((xAxis ? 'width' : 'height'), elementsize+'px');","            if (elementsize>0) {","                viewNode.append(modelNode);","            }","        }","        // always syncUI() --> making scrollview 'know' how large the scrollable contentbox is","        instance.syncUI();","        if (infiniteView) {","            infiniteView.checkExpansion();","        }","        /**","         * Fire an event, so that anyone who is terested in this point can hook in.","         *","         * @event modelListRender","         * @since 0.1","        **/","        instance.fire('modelListRender');","    },","","    /**","     * Retreives the Li-Node given a Model from the ModelList, or the index,","     * <u>Be careful if you use the plugin ITSAScrollViewInifiniteScroll:</u> to get the Node, there might be a lot of","     * list-expansions triggered. Be sure that expansions from external data does end, otherwise it will overload the browser.","     * That's why the second param is needed.","     *","     * @method _getNodeFromModelOrIndex","     * @param {Y.Model} [model] List-item from the modelList. In case of a LazyModelList, this might be an object.","     * @param {Int} [index] Index of item in the modelList.","     * @param {Int} [maxExpansions] Only needed when you use the plugin <b>ITSAScrollViewInifiniteScroll</b>. Use this value to limit","     * expansion data-calls. It will prevent you from falling into endless expansion when the list is infinite. If not set this method will expand","     * at the <b>max of ITSAScrollViewInifiniteScroll.get('maxExpansions') times by default</b>. If you are responsible for the external data and","     * that data is limited, you might choose to set this value that high to make sure all data is rendered in the scrollview.","     * @return {Y.Node} Li-Node that corresponds with the model.","     * @since 0.1","    */","    _getNodeFromModelOrIndex : function(model, index, maxExpansions) {","//=============================================================================================================================","//","// NEED SOME WORK HERE: MIGHT BE ASYNCHROUS --> WE NEED TO RETURN A PROMISE","//","//=============================================================================================================================","        var instance = this,","            infiniteScrollPlugin = instance.hasPlugin('itssvinfinite'),","            maxLoop = Lang.isNumber(maxExpansions) ? maxExpansions : ((infiniteScrollPlugin && infiniteScrollPlugin.get('maxExpansions')) || 0),","            i = 0,","            nodeFound = false,","            nodeList, findNode, modelClientId;","","        if (model) {","            modelClientId = instance.getModelAttr(model, 'clientId');","        }","        findNode = function(node, loopindex) {","            var found = model ? (node.getData('modelClientId') === modelClientId) : (loopindex===index);","            if (found) {","                nodeFound = node;","            }","            return found;","        };","        do {","","","            nodeList = instance._viewNode.all('.itsa-scrollviewmodel');","            nodeList.some(findNode);","            i++;","//=============================================================================================================================","//","// NEED SOME WORK HERE: infiniteScrollPlugin.expandList IS ASYNCHROUS --> WE NEED PROMISES TO BE SURE IT HAS FINISHED HIS JOB","//","//=============================================================================================================================","        } while (!nodeFound && infiniteScrollPlugin && (i<maxLoop) && infiniteScrollPlugin.expandList());","        return nodeFound;","    },","","    /**","     * Re-renders the ModelList within _viewNode and forces a complete new rebuild.","     *","     * @method _resetView","     * @private","     * @since 0.1","     *","    */","    _resetView : function() {","        this._resetView(null, true);","    },","","","    /**","     * Will render the view, but first checks whether the current View needs to be cleared, oor the new models need to be appended.","     * This module will assume ONLY to append if <i>ITSAScrollViewInifiniteScroll</i> is pluged in.","     *","     * @method _renderViewCheckAppend","     * @param {EventTarget} e","     * @private","     * @since 0.1","     *","    */","    _renderViewCheckAppend : function(e) {","        var instance = this,","            append = instance.hasPlugin('itssvinfinite');","","        instance._renderView(null, append);","    },","","    /**","     * Checks if there is a need to re-render the _viewNode whenever the data of one of the models in the modellist changes.","     * In case the position of the Model doesn't change, we can just rerender the Model. Otherwise rerender the whole _viewNode","     *","     * @method _renderModelOrView","     * @param {EventTarget} e","     * @private","     * @since 0.1","     *","    */","    _renderModelOrView : function(e) {","        var instance = this,","            modellist = instance.get('modelList');","","        instance._renderView();","    },","","    /**","     * Of this Model: sets the 'selected-status' in the ScrollView-instance to true","     *","     * @method _selectModel","     * @param {Y.Model|Array} model Model or Array of Models to be checked","     * @param {Boolean} selectstatus whether the new status is true or false","     * @param {Int} [maxExpansions] Only needed when you use the plugin <b>ITSAScrollViewInifiniteScroll</b>. Use this value to limit","     * expansion data-calls. It will prevent you from falling into endless expansion when the list is infinite. If not set this method will expand","     * at the <b>max of ITSAScrollViewInifiniteScroll.get('maxExpansions') times by default</b>. If you are responsible for the external data and","     * that data is limited, you might choose to set this value that high to make sure all data is rendered in the scrollview.","     * @private","     * @since 0.1","    */","    _selectModel : function(model, selectstatus, maxExpansions) {","//=============================================================================================================================","//","// NEED SOME WORK HERE: MIGHT BE ASYNCHROUS --> WE NEED TO RETURN A PROMISE","//","//=============================================================================================================================","        var instance = this,","            modelid = instance.getModelAttr(model, 'clientId'),","            contentBox = instance.get('contentBox'),","            itemUnselectable = (!selectstatus && instance.get('modelsUnselectable') && (YObject.size(instance._selectedModels)===1)),","            modelnodes;","","        if (modelid && !itemUnselectable) {","            if (instance.hasPlugin('itssvinfinite')) {","                // make sure the node is rendered","                instance._getNodeFromModelOrIndex(model, null, maxExpansions);","            }","            // each modelid-class should be present only once","            modelnodes = contentBox.one('.'+modelid);","            if (modelnodes) {","                modelnodes.toggleClass(SVML_SELECTED_CLASS, selectstatus);","            }","            if (selectstatus) {","                instance._selectedModels[modelid] = model;","            }","            else {","                delete instance._selectedModels[modelid];","            }","        }","        else {","            if (!modelid) {","            }","            else {","            }","        }","    },","","    /**","     * A utility method that fires the selected Models.","     *","     * @method _fireSelectedModels","     * @private","     * @since 0.1","     */","    _fireSelectedModels : function () {","        var instance = this,","            selectedModels, originalModels;","","        /**","         * Is fired when the user changes the modelselection. In case multiple Models are selected and the same Model is","         * more than once (in case of repeating Models), the Model is only once in the resultarray.","         * Meaning: only original unique Models are returned.","         *","         * @event modelSelectionChange","         * @param {Array} newModelSelection contains [Model] with all modelList's Models that are selected:<br>","         * -in case of repeated Models (see attribute 'modelConfig')- the subModel (dup or splitted) will be returned. This subModel","         * <b>is not part</b> of the original ModelList.","         * @param {Array} originalModelSelection contains [Model] with all modelList's unique original Models that are selected.","         * These models also exists in the original ModelList.","         * @since 0.1","        **/","        selectedModels = instance.getSelectedModels();","        originalModels = instance._abberantModelList ? instance.getSelectedModels(true) : selectedModels;","        instance.fire(","            'modelSelectionChange',","            {","                newModelSelection: selectedModels,","                originalModelSelection: originalModels","            }","        );","    },","","    /**","     * Cleaning up all eventlisteners","     *","     * @method _clearEventhandlers","     * @private","     * @since 0.1","     *","    */","    _clearEventhandlers : function() {","        YArray.each(","            this._eventhandlers,","            function(item){","                item.detach();","            }","        );","    }","","}, true);","","Y.ScrollView.ITSAScrollViewModelListExtention = ITSAScrollViewModelListExtention;","","Y.Base.mix(Y.ScrollView, [ITSAScrollViewModelListExtention]);","","}, '@VERSION@', {","    \"requires\": [","        \"base-build\",","        \"node-base\",","        \"node-event-delegate\",","        \"pluginhost-base\",","        \"event-mouseenter\",","        \"event-custom\",","        \"model\",","        \"model-list\",","        \"lazy-model-list\"","    ],","    \"skinnable\": true","});"];
_yuitest_coverage["build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js"].lines = {"1":0,"3":0,"25":0,"46":0,"52":0,"54":0,"68":0,"90":0,"93":0,"94":0,"95":0,"96":0,"97":0,"98":0,"99":0,"100":0,"103":0,"107":0,"111":0,"118":0,"120":0,"124":0,"126":0,"139":0,"157":0,"175":0,"193":0,"210":0,"231":0,"251":0,"269":0,"287":0,"303":0,"317":0,"334":0,"351":0,"368":0,"385":0,"387":0,"407":0,"425":0,"443":0,"461":0,"466":0,"518":0,"520":0,"521":0,"544":0,"546":0,"547":0,"548":0,"572":0,"596":0,"609":0,"614":0,"615":0,"616":0,"617":0,"619":0,"620":0,"621":0,"622":0,"624":0,"651":0,"663":0,"667":0,"669":0,"670":0,"673":0,"676":0,"677":0,"679":0,"680":0,"683":0,"686":0,"687":0,"688":0,"689":0,"691":0,"692":0,"694":0,"695":0,"697":0,"703":0,"704":0,"705":0,"707":0,"708":0,"709":0,"711":0,"712":0,"713":0,"715":0,"720":0,"721":0,"722":0,"723":0,"724":0,"725":0,"726":0,"727":0,"730":0,"731":0,"732":0,"733":0,"737":0,"743":0,"745":0,"746":0,"747":0,"748":0,"749":0,"750":0,"751":0,"752":0,"755":0,"758":0,"759":0,"761":0,"763":0,"766":0,"767":0,"768":0,"771":0,"776":0,"793":0,"796":0,"797":0,"800":0,"801":0,"806":0,"808":0,"834":0,"839":0,"840":0,"842":0,"843":0,"844":0,"847":0,"848":0,"851":0,"854":0,"855":0,"859":0,"860":0,"862":0,"863":0,"864":0,"867":0,"868":0,"881":0,"884":0,"885":0,"886":0,"888":0,"889":0,"892":0,"897":0,"899":0,"900":0,"913":0,"917":0,"918":0,"919":0,"920":0,"923":0,"924":0,"925":0,"926":0,"929":0,"930":0,"931":0,"932":0,"933":0,"934":0,"949":0,"952":0,"953":0,"956":0,"957":0,"961":0,"962":0,"963":0,"968":0,"982":0,"997":0,"1019":0,"1022":0,"1023":0,"1024":0,"1025":0,"1026":0,"1027":0,"1028":0,"1030":0,"1031":0,"1032":0,"1036":0,"1040":0,"1052":0,"1055":0,"1056":0,"1057":0,"1058":0,"1060":0,"1061":0,"1063":0,"1064":0,"1066":0,"1067":0,"1069":0,"1070":0,"1072":0,"1073":0,"1075":0,"1091":0,"1095":0,"1096":0,"1097":0,"1098":0,"1099":0,"1114":0,"1115":0,"1116":0,"1117":0,"1147":0,"1156":0,"1157":0,"1158":0,"1159":0,"1162":0,"1164":0,"1165":0,"1166":0,"1167":0,"1168":0,"1169":0,"1172":0,"1175":0,"1177":0,"1188":0,"1194":0,"1195":0,"1196":0,"1199":0,"1201":0,"1203":0,"1204":0,"1206":0,"1207":0,"1208":0,"1209":0,"1212":0,"1213":0,"1221":0,"1225":0,"1229":0,"1230":0,"1236":0,"1239":0,"1242":0,"1245":0,"1260":0,"1262":0,"1275":0,"1277":0,"1278":0,"1279":0,"1283":0,"1297":0,"1299":0,"1300":0,"1301":0,"1305":0,"1319":0,"1321":0,"1322":0,"1323":0,"1327":0,"1342":0,"1344":0,"1345":0,"1346":0,"1350":0,"1364":0,"1366":0,"1367":0,"1368":0,"1372":0,"1386":0,"1388":0,"1389":0,"1390":0,"1394":0,"1408":0,"1410":0,"1411":0,"1412":0,"1416":0,"1430":0,"1432":0,"1433":0,"1434":0,"1438":0,"1452":0,"1454":0,"1455":0,"1456":0,"1460":0,"1474":0,"1476":0,"1477":0,"1478":0,"1482":0,"1496":0,"1498":0,"1499":0,"1500":0,"1504":0,"1519":0,"1521":0,"1522":0,"1524":0,"1526":0,"1529":0,"1530":0,"1543":0,"1545":0,"1558":0,"1561":0,"1562":0,"1563":0,"1568":0,"1569":0,"1573":0,"1574":0,"1575":0,"1589":0,"1592":0,"1601":0,"1604":0,"1608":0,"1612":0,"1613":0,"1617":0,"1618":0,"1619":0,"1633":0,"1637":0,"1646":0,"1649":0,"1653":0,"1658":0,"1659":0,"1660":0,"1662":0,"1671":0,"1674":0,"1678":0,"1683":0,"1684":0,"1685":0,"1699":0,"1702":0,"1711":0,"1714":0,"1718":0,"1723":0,"1724":0,"1725":0,"1727":0,"1736":0,"1739":0,"1743":0,"1748":0,"1749":0,"1750":0,"1763":0,"1777":0,"1778":0,"1780":0,"1781":0,"1782":0,"1783":0,"1785":0,"1787":0,"1788":0,"1789":0,"1790":0,"1791":0,"1792":0,"1793":0,"1794":0,"1795":0,"1796":0,"1799":0,"1802":0,"1803":0,"1806":0,"1810":0,"1812":0,"1814":0,"1829":0,"1853":0,"1854":0,"1856":0,"1859":0,"1860":0,"1861":0,"1864":0,"1866":0,"1867":0,"1868":0,"1873":0,"1874":0,"1875":0,"1876":0,"1877":0,"1878":0,"1879":0,"1880":0,"1881":0,"1882":0,"1883":0,"1884":0,"1888":0,"1890":0,"1891":0,"1893":0,"1894":0,"1895":0,"1896":0,"1897":0,"1899":0,"1900":0,"1904":0,"1909":0,"1911":0,"1912":0,"1913":0,"1914":0,"1915":0,"1920":0,"1921":0,"1922":0,"1923":0,"1924":0,"1925":0,"1927":0,"1928":0,"1929":0,"1931":0,"1932":0,"1933":0,"1934":0,"1936":0,"1939":0,"1940":0,"1941":0,"1942":0,"1944":0,"1945":0,"1946":0,"1948":0,"1949":0,"1950":0,"1951":0,"1953":0,"1956":0,"1957":0,"1958":0,"1959":0,"1961":0,"1962":0,"1963":0,"1965":0,"1966":0,"1967":0,"1968":0,"1971":0,"1972":0,"1973":0,"1974":0,"1975":0,"1976":0,"1977":0,"1978":0,"1979":0,"1982":0,"1985":0,"1986":0,"1989":0,"1990":0,"1991":0,"1992":0,"1993":0,"1996":0,"1997":0,"1998":0,"2001":0,"2003":0,"2004":0,"2006":0,"2007":0,"2010":0,"2012":0,"2014":0,"2015":0,"2016":0,"2020":0,"2021":0,"2022":0,"2030":0,"2055":0,"2062":0,"2063":0,"2065":0,"2066":0,"2067":0,"2068":0,"2070":0,"2072":0,"2075":0,"2076":0,"2077":0,"2084":0,"2096":0,"2111":0,"2114":0,"2128":0,"2131":0,"2153":0,"2159":0,"2160":0,"2162":0,"2165":0,"2166":0,"2167":0,"2169":0,"2170":0,"2173":0,"2177":0,"2192":0,"2208":0,"2209":0,"2210":0,"2228":0,"2231":0,"2238":0,"2240":0};
_yuitest_coverage["build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js"].functions = {"GETSTYLE:45":0,"ITSALazyModelListAttrExtention:52":0,"getModelAttr:67":0,"setModelAttr:89":0,"ITSAScrollViewModelListExtention:124":0,"validator:139":0,"validator:157":0,"validator:175":0,"validator:192":0,"validator:209":0,"validator:230":0,"validator:250":0,"validator:269":0,"validator:287":0,"validator:303":0,"validator:317":0,"validator:334":0,"validator:351":0,"validator:368":0,"value:384":0,"validator:387":0,"validator:407":0,"validator:425":0,"validator:443":0,"validator:461":0,"initializer:517":0,"setWithoutRerender:543":0,"getNodeFromIndex:566":0,"getNodeFromModel:590":0,"saveScrollTo:608":0,"getNodePosition:663":0,"(anonymous 2):693":0,"(anonymous 3):710":0,"scrollIntoView:645":0,"(anonymous 4):799":0,"modelIsSelected:792":0,"(anonymous 5):850":0,"selectModels:828":0,"(anonymous 6):891":0,"unselectModels:880":0,"clearSelectedModels:912":0,"(anonymous 7):959":0,"getSelectedModels:948":0,"renderView:981":0,"getModelAttr:996":0,"setModelAttr:1018":0,"destructor:1051":0,"_render:1090":0,"_focusModelNode:1113":0,"_getMaxPaginatorGotoIndex:1141":0,"(anonymous 8):1200":0,"(anonymous 9):1224":0,"(anonymous 10):1227":0,"_extraBindUI:1187":0,"_setModelList:1259":0,"_setNoDups:1274":0,"_setViewFilter:1296":0,"_setLastItemOnTop:1318":0,"_setDupComparator:1341":0,"_setGroupHeader1:1363":0,"_setGroupHeader2:1385":0,"_setGroupHeader3:1407":0,"_setRenderGroupHeader1:1429":0,"_setRenderGroupHeader2:1451":0,"_setRenderGroupHeader3:1473":0,"_setRenderModel:1495":0,"_setModelsSelectable:1518":0,"_setModelListStyled:1542":0,"(anonymous 11):1566":0,"_setSelectableEvents:1557":0,"(anonymous 12):1603":0,"(anonymous 13):1610":0,"_setClickEvents:1588":0,"(anonymous 14):1648":0,"(anonymous 15):1673":0,"_setMouseDownUpEvents:1632":0,"(anonymous 16):1713":0,"(anonymous 17):1738":0,"_setHoverEvents:1698":0,"_handleModelSelectionChange:1762":0,"(anonymous 18):1858":0,"dupAvailable:1853":0,"_renderView:1828":0,"findNode:2065":0,"_getNodeFromModelOrIndex:2049":0,"_resetView:2095":0,"_renderViewCheckAppend:2110":0,"_renderModelOrView:2127":0,"_selectModel:2147":0,"_fireSelectedModels:2191":0,"(anonymous 19):2230":0,"_clearEventhandlers:2227":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js"].coveredLines = 550;
_yuitest_coverage["build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js"].coveredFunctions = 93;
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1);
YUI.add('gallery-itsascrollviewmodellist', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 3);
'use strict';

/**
 * ScrollView ModelList Extention
 *
 *
 * Adds an Y.ModelList to a ScrollView instance, where the Models are rendered inside an unsorted-list
 * lies within the scrollview's-contentBox. This results in an ul-list with Models.
 *
 * Caution: you MUST set the axis-atribute before rendering! Because the content is empty at start, scrollview
 * would otherwise fail autofind the value of axis.
 *
 * @module gallery-itsscrollviewmodellist
 * @class ITSAScrollViewModelList
 * @constructor
 * @since 0.1
 *
 * <i>Copyright (c) 2013 Marco Asbreuk - http://itsasbreuk.nl</i>
 * YUI BSD License - http://developer.yahoo.com/yui/license.html
 *
*/

_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 25);
var Lang = Y.Lang,
    YObject = Y.Object,
    YArray = Y.Array,
    YNode = Y.Node,
    VIEW_TEMPLATE = '<ul role="presentation"></ul>',
    VIEW_MODEL_TEMPLATE = '<li role="presentation"></li>',
    VIEW_EMPTY_ELEMENT_TEMPLATE = '<li></li>',
    EMPTY_ELEMENT_CLASS = 'itsa-scrollview-fillelement',
    MODEL_CLASS = 'itsa-scrollviewmodel',
    SVML_CLASS = 'itsa-scrollviewmodellist',
    SVML_FOCUS_CLASS = MODEL_CLASS + '-focus',
    SVML_SELECTED_CLASS = MODEL_CLASS + '-selected',
    SVML_EVEN_CLASS = MODEL_CLASS + '-even',
    SVML_ODD_CLASS = MODEL_CLASS + '-odd',
    SVML_STYLE_CLASS = SVML_CLASS + '-styled',
    GROUPHEADER_CLASS = SVML_CLASS + '-groupheader',
    GROUPHEADER1_CLASS = SVML_CLASS + '-groupheader1',
    GROUPHEADER2_CLASS = SVML_CLASS + '-groupheader2',
    GROUPHEADER3_CLASS = SVML_CLASS + '-groupheader3',
    GROUPHEADER_SEQUEL_CLASS = SVML_CLASS + '-sequelgroupheader',
    GETSTYLE = function(node, style) {
        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "GETSTYLE", 45);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 46);
return parseInt(node.getStyle(style), 10);
    };


// -- First: extend Y.LazyModelList with 2 sugar methods for set- and get- attributes --------------------------

_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 52);
function ITSALazyModelListAttrExtention() {}

_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 54);
Y.mix(ITSALazyModelListAttrExtention.prototype, {

    /**
     * Gets an attribute-value from a Model OR object. Depends on the state (Lazy or not).
     * Will always work, whether an Y.ModelList or Y.LazyModelList is attached.
     *
     * @method getModelAttr
     * @param {Y.Model} model the model (or extended class) from which the attribute has to be read.
     * @param {String} name Attribute name or object property path.
     * @return {Any} Attribute value, or `undefined` if the attribute doesn't exist, or 'null' if no model is passed.
     * @since 0.1
     *
    */
    getModelAttr: function(model, name) {
        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "getModelAttr", 67);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 68);
return model && ((model.get && (Lang.type(model.get) === 'function')) ? model.get(name) : model[name]);
    },

    /**
     * Sets an attribute-value of a Model OR object. Depends on the state (Lazy or not).
     * Will always work, whether an Y.ModelList or Y.LazyModelList is attached.
     * If you want to be sure the Model fires an attributeChange-event, then set 'revive' true. This way
     * lazy-Models will become true Models and fire an attributeChange-event. When the attibute was lazy before,
     * it will return lazy afterwards.
     *
     * @method _setModelAttr
     * @param {Y.Model} model the model (or extended class) from which the attribute has to be read.
     * @param {Boolean} revive Whether to force a lazy-model to revive (when lazy before: will be lazy afterwards)
     * @param {String} name Attribute name or object property path.
     * @param {any} value Value to set.
     * @param {Object} [options] Data to be mixed into the event facade of the `change` event(s) for these attributes.
     * In case of Lazy-Model, this only has effect when 'revive' is true.
     *    @param {Boolean} [options.silent=false] If `true`, no `change` event will be fired.
     * @since 0.1
     *
    */
    setModelAttr: function(model, revive, name, value, options) {
        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "setModelAttr", 89);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 90);
var instance = this,
            modelIsLazy;

        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 93);
if (model) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 94);
modelIsLazy = !model.get || (Lang.type(model.get) !== 'function');
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 95);
if (modelIsLazy) {
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 96);
if (revive) {
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 97);
if (revive) {
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 98);
instance.revive(model);
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 99);
model.set(name, value, options);
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 100);
instance.free(model);
                    }
                    else {
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 103);
model.set(name, value, options);
                    }
                }
                else {
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 107);
model[name] = value;
                }
            }
            else {
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 111);
model.set(name, value, options);
            }
        }
    }

}, true);

_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 118);
Y.LazyModelList.ITSALazyModelListAttrExtention = ITSALazyModelListAttrExtention;

_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 120);
Y.Base.mix(Y.LazyModelList, [ITSALazyModelListAttrExtention]);

// -- Mixing extra Methods to Y.ScrollView -----------------------------------

_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 124);
function ITSAScrollViewModelListExtention() {}

_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 126);
ITSAScrollViewModelListExtention.ATTRS = {

   /**
    * The ModelList that is 'attached' to the Calendar, resulting in highlighted dates for each Model
    * that has a 'Date-match'. For more info how a 'Date-match' is achieved: see the attribute modelConfig.
    *
    * @attribute modelList
    * @type {ModelList}
    * @default null
    * @since 0.1
    */
    modelList: {
        value: null,
        validator: function(v){ _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "validator", 139);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 139);
return (v instanceof Y.ModelList) || (v instanceof Y.LazyModelList) || (v === null);},
        setter: '_setModelList'
    },

   /**
    * Whether duplicate values (rendered by the attributefunction 'renderModel') are possible.
    * By default, this will be compared with the previous rendered Model.
    * If you want a more sophisticated dup-check, the set the dupComparator-attribute. But be careful: the dupComparator
    * has a significant performance-hit.
    * <u>If you set this attribute after the scrollview-instance is rendered, the scrollview-instance will be re-rendered.</u>
    *
    * @attribute noDups
    * @type {Boolean}
    * @default false
    * @since 0.1
    */
    noDups: {
        value: false,
        validator: function(v){ _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "validator", 157);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 157);
return Lang.isBoolean(v);},
        setter: '_setNoDups'
    },

    /**
     * Function that can filter the modellist, in a way that only specific models are rendered.
     * The function must look like: <b>function(model)</b> and must return true or false (which the developer
     * can determine based on the model that is passed).
     *
     * For example: function(model) {return model.get('country')==='US';}
     *
     * @attribute viewFilter
     * @type {Function} The function must look like: <b>function(model)</b>
     * @default null
     * @since 0.1
     */
    viewFilter: {
        value: null,
        validator: function(v){ _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "validator", 175);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 175);
return Lang.isFunction(v) || v === null; },
        setter: '_setViewFilter'
    },

   /**
    * Whether the Models can be selected (resulting in a 'modelSelectionChange'-event)
    * Posible values are: <b>null</b>, <b>''</b>, <b>true</b>, <b>false</b>, <b>single</b>, <b>multi</b>
    * The value true equals 'multi', 'null' or '' equals false.
    *
    * @default false
    * @attribute modelsSelectable
    * @type {Boolean|String|null}
    * @since 0.1
    */
    modelsSelectable: {
        value: false,
        lazyAdd: false,
        validator:  function(v) {
            _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "validator", 192);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 193);
return ((v==='') || (v===null) || Lang.isBoolean(v) || (v==='single') || (v==='multi'));
        },
        setter: '_setModelsSelectable'
    },

   /**
    * If set, then there ALWAYS REMAINS 1 Model selected.
    * <i>Only accounts when 'modelsSelectable' is active.
    *
    * @default true
    * @attribute modelsUnselectable
    * @type {Boolean}
    * @since 0.1
    */
    modelsUnselectable: {
        value: false,
        validator:  function(v) {
            _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "validator", 209);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 210);
return Lang.isBoolean(v);
        }
    },

   /**
    * Whether the Models is styled using the css of this module.
    * In fact, just the classname 'itsa-scrollviewmodellist-styled' is added to the boundingBox
    * and the css-rules do all the rest. The developer may override these rules, or set this value to false
    * while creatiung their own css. In the latter case it is advisable to take a look at all the css-rules
    * that are supplied by this module. In either cases, the modelList (is available) will add classes to all li-elements
    * thus the developer can style it at own will.
    *
    * @default false
    * @attribute modelListStyled
    * @type {Boolean}
    * @since 0.1
    */
    modelListStyled: {
        value: false,
        lazyAdd: false,
        validator:  function(v) {
            _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "validator", 230);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 231);
return Lang.isBoolean(v);
        },
        setter: '_setModelListStyled'
    },

   /**
    * Sets the sensibility when clicking on a model.
    * This prevents a click-event when the user actually scrolls the scrollview instead of selecting an item
    * The number represents the amount of pixels that the scrollview-instance can shift a bit during a click
    * while still firing a click-event. Above this limit, the scrollviewinstance will assume movement and does not fire
    * a click-event.
    *
    * @default 2
    * @attribute clickSensivity
    * @type int
    * @since 0.1
    */
    clickSensivity: {
        value: 2,
        validator:  function(v) {
            _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "validator", 250);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 251);
return (Lang.isNumber(v) && (v>=0) && (v<11));
        }
    },

   /**
    * Whether an event is fired when a Model catches a mouse-click.
    * When set to true, the events 'modelClicked' is fired when clicking on the Models.
    * Click-events <b>do have a correction</b> when the user actually scrolls instead of clicking a Model-item.
    * See the attribute clickSensivity for more details.
    *
    * @attribute clickEvents
    * @type {Boolean}
    * @default false
    * @since 0.1
    */
    clickEvents: {
        value: false,
        lazyAdd: false,
        validator: function(v) {_yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "validator", 269);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 269);
return Lang.isBoolean(v);},
        setter: '_setClickEvents'
    },

   /**
    * Whether an event is fired when a Model catches a mousedown or mouseup event.
    * When set to true, the events 'modelMouseDown' and 'modelMouseUp' are fired when mousedown or mouseup
    * happens on the Models. These events <b>do not have a correction</b> when the user actually scrolls instead of clicking a Model-item.
    * This means they are fired no matter if scrolling is busy or not.
    *
    * @attribute mouseDownUpEvents
    * @type {Boolean}
    * @default false
    * @since 0.1
    */
    mouseDownUpEvents: {
        value: false,
        lazyAdd: false,
        validator: function(v) {_yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "validator", 287);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 287);
return Lang.isBoolean(v);},
        setter: '_setMouseDownUpEvents'
    },

   /**
    * Whether an event is fired when a Model catches a mouse-enter or mouseleave.
    * When set to true, the events 'modelMouseEnter' and 'modelMouseLeave' are fired when moving the mouse over the Models.
    *
    * @attribute hoverEvents
    * @type {Boolean}
    * @default false
    * @since 0.1
    */
    hoverEvents: {
        value: false,
        lazyAdd: false,
        validator: function(v) {_yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "validator", 303);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 303);
return Lang.isBoolean(v);},
        setter: '_setHoverEvents'
    },

    /**
     * If set true, the last element will not be bounced to the bottm/right edge, but to the top/left edge.
     *
     * @method lastItemOnTop
     * @return {String|Int|Boolean} Model-specific value on which base the module can determine to what groupHeader
     * the Model belongs.
     * @since 0.1
     */
    lastItemOnTop: {
        value: null,
        validator: function(v){ _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "validator", 317);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 317);
return Lang.isBoolean(v);},
        setter: '_setLastItemOnTop'
    },

    /**
     * When defined, the ScrollView-instance will generate GroupHeaders (extra li-elements with class='itsa-scrollviewmodellist-groupheader1')
     * just above all models (li-elements) whom encounter a change in the groupHeader1-value.
     * The attribute MUST be a function like this: <b>function(model) {return ...)}</b> and MUST return a {String|Int|Boolean} value for all models.
     * <u>If you set this attribute after the scrollview-instance is rendered, the scrollview-instance will be re-rendered.</u>
     *
     * @attribute groupHeader1
     * @type {Function}
     * @default null
     * @since 0.1
     */
    groupHeader1: {
        value: null,
        validator: function(v){ _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "validator", 334);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 334);
return Lang.isFunction(v) || v === null; },
        setter: '_setGroupHeader1'
    },

    /**
     * When defined, the ScrollView-instance will generate GroupHeaders (extra li-elements with class='itsa-scrollviewmodellist-groupheader1')
     * just above all models (li-elements) whom encounter a change in the groupHeader2-value.
     * The attribute MUST be a function like this: <b>function(model) {return ...)}</b> and MUST return a {String|Int|Boolean} value for all models.
     * <u>If you set this attribute after the scrollview-instance is rendered, the scrollview-instance will be re-rendered.</u>
     *
     * @attribute groupHeader2
     * @type {Function}
     * @default null
     * @since 0.1
     */
    groupHeader2: {
        value: null,
        validator: function(v){ _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "validator", 351);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 351);
return Lang.isFunction(v) || v === null; },
        setter: '_setGroupHeader2'
    },

    /**
     * When defined, the ScrollView-instance will generate GroupHeaders (extra li-elements with class='itsa-scrollviewmodellist-groupheader1')
     * just above all models (li-elements) whom encounter a change in the groupHeader3-value.
     * The attribute MUST be a function like this: <b>function(model) {return ...)}</b> and MUST return a {String|Int|Boolean} value for all models.
     * <u>If you set this attribute after the scrollview-instance is rendered, the scrollview-instance will be re-rendered.</u>
     *
     * @attribute groupHeader3
     * @type {Function}
     * @default null
     * @since 0.1
     */
    groupHeader3: {
        value: null,
        validator: function(v){ _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "validator", 368);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 368);
return Lang.isFunction(v) || v === null; },
        setter: '_setGroupHeader3'
    },

    /**
     * Attribute that is responsible for the rendering of all the Models. The developer is advised to override this attribute in a way
     * that the rendering of the Models result in the content that is desired.
     * The attribute MUST be a function like this: <b>function(model) {return ...)}</b> and MUST return a {String} value for all models.
     * <u>If you set this attribute after the scrollview-instance is rendered, the scrollview-instance will be re-rendered.</u>
     *
     * @attribute renderGroupHeader1
     * @type {Function}
     * @default null
     * @since 0.1
     */
    renderModel: {
        value: function(model) {
            _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "value", 384);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 385);
return this.getModelAttr(model, 'clientId'); // default, so that there always is content. Best to be overwritten.
        },
        validator: function(v){ _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "validator", 387);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 387);
return Lang.isFunction(v) || v === null; },
        setter: '_setRenderModel'
    },

    /**
     * Attribute that identifies duplicate Models.
     * By default, this function is 'null', meaning that Models will be compared with the previous rendered Model to see if they are dups.
     * (based on the value of 'renderModel').
     * If Set the dupComparator-attribute, you can have a more sophisticated dup-check which will loop through all the Models. Thus be careful:
     * the dupComparator has a significant performance-hit.
     * <u>If you set this attribute after the scrollview-instance is rendered, the scrollview-instance will be re-rendered
     * (only is 'noDups'===true).</u>
     *
     * @attribute dupComparator
     * @type {Function}
     * @default null
     * @since 0.1
     */
    dupComparator: {
        value: null,
        validator: function(v){ _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "validator", 407);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 407);
return Lang.isFunction(v) || v === null; },
        setter: '_setDupComparator'
    },

    /**
     * Determines how the rendering of groupHeader1 takes place. The developer may set this method, but can choose not to.
     * If not overriden, renderGroupHeader1 will render the same as the attribute 'groupHeader1' (except that it's a String).
     * If the developer wants content other than groupHeader1 generates, he/she can override this method.
     * The attribute MUST be a function like this: <b>function(model) {return ...)}</b> and MUST return a {String} value for all models.
     * <u>If you change this method after the scrollview-instance is rendered, you need to call renderView() to make the changes applied.</u>
     *
     * @attribute renderGroupHeader1
     * @type {Function}
     * @default null
     * @since 0.1
     */
    renderGroupHeader1: {
        value: null,
        validator: function(v){ _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "validator", 425);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 425);
return Lang.isFunction(v) || v === null; },
        setter: '_setRenderGroupHeader1'
    },

    /**
     * Determines how the rendering of groupHeader2 takes place. The developer may set this method, but can choose not to.
     * If not overriden, renderGroupHeader2 will render the same as the attribute 'groupHeader2' (except that it's a String).
     * If the developer wants content other than groupHeader2 generates, he/she can override this method.
     * The attribute MUST be a function like this: <b>function(model) {return ...)}</b> and MUST return a {String} value for all models.
     * <u>If you change this method after the scrollview-instance is rendered, you need to call renderView() to make the changes applied.</u>
     *
     * @attribute renderGroupHeader2
     * @type {Function}
     * @default null
     * @since 0.1
     */
    renderGroupHeader2: {
        value: null,
        validator: function(v){ _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "validator", 443);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 443);
return Lang.isFunction(v) || v === null; },
        setter: '_setRenderGroupHeader2'
    },

    /**
     * Determines how the rendering of groupHeader3 takes place. The developer may set this method, but can choose not to.
     * If not overriden, renderGroupHeader3 will render the same as the attribute 'groupHeader3' (except that it's a String).
     * If the developer wants content other than groupHeader3 generates, he/she can override this method.
     * The attribute MUST be a function like this: <b>function(model) {return ...)}</b> and MUST return a {String} value for all models.
     * <u>If you change this method after the scrollview-instance is rendered, you need to call renderView() to make the changes applied.</u>
     *
     * @attribute renderGroupHeader3
     * @type {Function}
     * @default null
     * @since 0.1
     */
    renderGroupHeader3: {
        value: null,
        validator: function(v){ _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "validator", 461);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 461);
return Lang.isFunction(v) || v === null; },
        setter: '_setRenderGroupHeader3'
    }
};

_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 466);
Y.mix(ITSAScrollViewModelListExtention.prototype, {

// -- Public Static Properties -------------------------------------------------

/**
 * Internal list that holds event-references
 * @property _eventhandlers
 * @private
 * @type Array
 */

    _eventhandlers : [],
    _originalModels : [],
    _selectableModelEvent : null,
    _clickModelEvent : null,
    _mouseenterModelEvent : null,
    _mouseUpModelEvent : null,
    _mouseDownModelEvent : null,
    _mouseleaveModelEvent : null,
    _selectedModels : {},
    _viewNode : null,
    _viewId : null,
    _lastClickedModel : null,
    _abberantModelList : null,
    _setViewFilterInitiated : null,
    _setLastItemOnTopInitiated : null,
    _setGroupHeader1Initiated : null,
    _setGroupHeader2Initiated : null,
    _setGroupHeader3Initiated : null,
    _setRenderGroupHeader1Initiated : null,
    _setRenderGroupHeader2Initiated : null,
    _setRenderGroupHeader3Initiated : null,
    _setRenderModelInitiated : null,
    _setDupComparatorInitiated : null,
    _setNoDupsInitiated : null,
    _rerenderAttributesOnChange : true,
    _moreItemsAvailable : true, // must initially be set true
    _prevLastModelIndex : null,
    _modelListIsLazy : false,
    _prevHeader1 : null,
    _prevHeader2 : null,
    _prevHeader3 : null,
    _even : false,

    /**
     * Initialisation of the Plugin
     *
     * @method initializer
     * @protected
     * @since 0.1
     */
    initializer : function() {
        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "initializer", 517);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 518);
var instance = this;

        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 520);
instance._viewId = Y.guid();
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 521);
instance._eventhandlers.push(
            instance.after(
                'render',
                instance._render,
                instance
            )
        );
    },

    /**
     * Sets an attribute, but in a way that there will be no rerendering of the view.
     * This is handy if you want to change multplie attributes where you only want the view to be re-rendered after the
     * last attributes is set, instead of every time after eacht attribute-change.
     *
     * @method setWithoutRerender
     * @param {String} name The name of the attribute. If the
     * current value of the attribute is an Object, dot notation can be used
     * to set the value of a property within the object (e.g. <code>set("x.y.z", 5)</code>).
     * @param {Any} value The value to set the attribute to.
     * @param {Object} [opts] Optional data providing the circumstances for the change.
     * @since 0.1
    */
    setWithoutRerender : function(name, val, opts) {
        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "setWithoutRerender", 543);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 544);
var instance = this;

        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 546);
instance._rerenderAttributesOnChange = false;
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 547);
instance.set(name, val, opts);
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 548);
instance._rerenderAttributesOnChange = true;
    },

    /**
     * Retreives the Li-Node given the index from the ModelList.
     * <u>Be careful if you use the plugin ITSAScrollViewInifiniteScroll:</u> to get the Node, there might be a lot of
     * list-expansions triggered. Be sure that expansions from external data does end, otherwise it will overload the browser.
     * That's why the second param is needed.
     *
     * @method getNodeFromIndex
     * @param {Int} index Index of item in the modelList.
     * @param {Int} [maxExpansions] Only needed when you use the plugin <b>ITSAScrollViewInifiniteScroll</b>. Use this value to limit
     * expansion data-calls. It will prevent you from falling into endless expansion when the list is infinite. If not set this method will expand
     * at the <b>max of ITSAScrollViewInifiniteScroll.get('maxExpansions') times by default</b>. If you are responsible for the external data and
     * that data is limited, you might choose to set this value that high to make sure all data is rendered in the scrollview.
     * @return {Y.Node} Li-Node that corresponds with the model.
     * @since 0.1
    */
    getNodeFromIndex : function(index, maxExpansions) {
//=============================================================================================================================
//
// NEED SOME WORK HERE: MIGHT BE ASYNCHROUS --> WE NEED TO RETURN A PROMISE
//
//=============================================================================================================================
        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "getNodeFromIndex", 566);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 572);
return this._getNodeFromModelOrIndex(null, index, maxExpansions);
    },

    /**
     * Retreives the Li-Node given a Model from the ModelList.
     * <u>Be careful if you use the plugin ITSAScrollViewInifiniteScroll:</u> to get the Node, there might be a lot of
     * list-expansions triggered. Be sure that expansions from external data does end, otherwise it will overload the browser.
     * That's why the second param is needed.
     *
     * @method getNodeFromModel
     * @param {Y.Model} model List-item from the modelList. In case of a LazyModelList, this might be an object.
     * @param {Int} [maxExpansions] Only needed when you use the plugin <b>ITSAScrollViewInifiniteScroll</b>. Use this value to limit
     * expansion data-calls. It will prevent you from falling into endless expansion when the list is infinite. If not set this method will expand
     * at the <b>max of ITSAScrollViewInifiniteScroll.get('maxExpansions') times by default</b>. If you are responsible for the external data and
     * that data is limited, you might choose to set this value that high to make sure all data is rendered in the scrollview.
     * @return {Y.Node} Li-Node that corresponds with the model.
     * @since 0.1
    */
    getNodeFromModel : function(model, maxExpansions) {
//=============================================================================================================================
//
// NEED SOME WORK HERE: MIGHT BE ASYNCHROUS --> WE NEED TO RETURN A PROMISE
//
//=============================================================================================================================
        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "getNodeFromModel", 590);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 596);
return this._getNodeFromModelOrIndex(model, null, maxExpansions);
    },

    /**
     * Equals scrollview.scrollTo, but makes sure we keep between the correct boundaries.
     *
     * @method saveScrollTo
     * @param x {Int} The x-position to scroll to. (null for no movement)
     * @param y {Int} The y-position to scroll to. (null for no movement)
     * @since 0.1
     *
    */
    saveScrollTo : function(x, y) {
        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "saveScrollTo", 608);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 609);
var instance = this,
            boundingBox = instance.get('boundingBox'),
            viewNode = instance._viewNode,
            max;

        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 614);
if (x) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 615);
x = Math.max(0, x);
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 616);
max = viewNode.get('offsetWidth') - boundingBox.get('offsetWidth');
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 617);
x = Math.min(x, max);
        }
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 619);
if (y) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 620);
y = Math.max(0, y);
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 621);
max = viewNode.get('offsetHeight') - boundingBox.get('offsetHeight');
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 622);
y = Math.min(y, max);
        }
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 624);
instance.scrollTo(x, y);
    },

    /**
     * Makes the Model scroll into the View. Items that are already in the view: no scroll appears. Items that are above: will appear
     * on top. Items that are after the view: will appear on bottom.
     * <u>Be careful if you use the plugin ITSAScrollViewInifiniteScroll:</u> to get the Node, there might be a lot of
     * list-expansions triggered. Be sure that expansions from external data does end, otherwise it will overload the browser.
     * That's why the second param is needed.
     *
     * @method scrollIntoView
     * @param {Y.Model|Int} modelOrIndex Y.Model or index that should be into view.
     * @param {Object} [options] To force the 'scrollIntoView' to scroll on top or on bottom of the view.
     *     @param {Boolean} [options.forceTop=false] if 'true', the (first) selected item will always be positioned on top.
     *     @param {Boolean} [options.forceBottom=false] if 'true', the (first) selected item will always be positioned on bottom.
     * @param {Int} [maxExpansions] Only needed when you use the plugin <b>ITSAScrollViewInifiniteScroll</b>. Use this value to limit
     * external data-calls. It will prevent you from falling into endless expansion when the list is infinite. If not set this method will expand
     * from external data at the <b>max of 25 times by default</b> (which is quite a lot). If you are responsible for the external data and
     * it is limited, then you might choose to set this value that high to make sure all data is rendered in the scrollview.
     * @since 0.1
    */
    scrollIntoView : function(modelOrIndex, options, maxExpansions) {
//=============================================================================================================================
//
// NEED SOME WORK HERE: MIGHT BE ASYNCHROUS --> WE NEED TO RETURN A PROMISE
//
//=============================================================================================================================
        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "scrollIntoView", 645);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 651);
var instance = this,
            boundingBox = instance.get('boundingBox'),
            axis = instance.get('axis'),
            yAxis = axis.y,
            boundingBoxSize = yAxis ? boundingBox.get('offsetHeight') : boundingBox.get('offsetWidth'),
            boundingBoxEdge = yAxis ? boundingBox.getY() : boundingBox.getX(),
            viewNode = instance._viewNode,
            infiniteScrollPlugin = instance.itssvinfinite,
            paginatorPlugin = instance.pages,
            modelNodeEdge, currentOffset, maxOffset, newOffset, modelNode, liElements, getNodePosition,
            onTop, nodePosition, modelNodeSize, corrected;

        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 663);
getNodePosition = function(node) {
            // returns -1 if (partial) before viewNode
            // returns 0 if inside viewNode
            // returns 1 if (partial) after viewNode
            _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "getNodePosition", 663);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 667);
var nodeLowerEdge = yAxis ? node.getY() : node.getX(),
                nodeUpperEdge;
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 669);
if (yAxis) {
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 670);
nodeUpperEdge = nodeLowerEdge + node.get('offsetHeight') + GETSTYLE(node, 'marginTop') + GETSTYLE(node, 'marginBottom');
            }
            else {
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 673);
nodeUpperEdge = nodeLowerEdge + node.get('offsetWidth') + GETSTYLE(node, 'marginLeft') + GETSTYLE(node, 'marginRight');
            }

            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 676);
if ((nodeLowerEdge<boundingBoxEdge) || (options && Lang.isBoolean(options.forceTop) && options.forceTop)) {
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 677);
return -1;
            }
            else {_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 679);
if ((nodeUpperEdge>(boundingBoxEdge+boundingBoxSize)) || (options && Lang.isBoolean(options.forceBottom) && options.forceBottom)) {
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 680);
return 1;
            }
            else {
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 683);
return 0;
            }}
        };
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 686);
if (Lang.isNumber(modelOrIndex)) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 687);
modelNode = instance.getNodeFromIndex(modelOrIndex, maxExpansions);
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 688);
nodePosition = getNodePosition(modelNode);
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 689);
if (paginatorPlugin && (nodePosition!==0)) {
                // increase the modelIndex --> paginator is pased on all LI's, not just the Models
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 691);
liElements = viewNode.all('li');
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 692);
liElements.some(
                    function(node, index) {
                        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "(anonymous 2)", 693);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 694);
if (!node.hasClass(MODEL_CLASS)) {
                            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 695);
modelOrIndex++;
                        }
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 697);
return index===modelOrIndex;
                    }
                );
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 703);
modelNode = modelOrIndex && instance.getNodeFromModel(modelOrIndex, maxExpansions);
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 704);
nodePosition = getNodePosition(modelNode);
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 705);
if (paginatorPlugin && (nodePosition!==0)) {
                // transform model to an index
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 707);
liElements = viewNode.all('li');
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 708);
modelOrIndex = 0;
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 709);
liElements.some(
                    function(node, index) {
                        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "(anonymous 3)", 710);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 711);
var found = (node===modelNode);
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 712);
if (found) {
                            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 713);
modelOrIndex = index;
                        }
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 715);
return found;
                    }
                );
            }
        }
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 720);
instance._focusModelNode(modelNode);
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 721);
if ((modelNode) && (nodePosition!==0)) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 722);
onTop = (nodePosition===-1);
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 723);
if (yAxis) {
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 724);
modelNodeEdge = modelNode.getY();
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 725);
currentOffset = instance.get('scrollY');
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 726);
modelNodeSize = modelNode.get('offsetHeight') + GETSTYLE(modelNode, 'marginTop') + GETSTYLE(modelNode, 'marginBottom');
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 727);
maxOffset = viewNode.get('offsetHeight') - boundingBoxSize;
            }
            else {
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 730);
modelNodeEdge = modelNode.getX();
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 731);
currentOffset = instance.get('scrollX');
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 732);
modelNodeSize = modelNode.get('offsetWidth') + GETSTYLE(modelNode, 'marginLeft') + GETSTYLE(modelNode, 'marginRight');
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 733);
maxOffset = viewNode.get('offsetWidth') - boundingBoxSize;
            }
            // You might need to expand the list in case ITSAScrollViewInifiniteScroll is pluged-in AND maxOffset<newOffset
            // Only 1 time is needed: getNodeFromModel already has expanded a number of times to make the Node available
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 737);
if (infiniteScrollPlugin && !onTop) {
//=============================================================================================================================
//
// NEED SOME WORK HERE: infiniteScrollPlugin.expandList IS ASYNCHROUS --> WE NEED PROMISES TO BE SURE IT HAS FINISHED HIS JOB
//
//=============================================================================================================================
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 743);
infiniteScrollPlugin.checkExpansion();
            }
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 745);
if (paginatorPlugin) {
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 746);
if (!onTop) {
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 747);
while ((modelNodeSize<boundingBoxSize) && (modelOrIndex>0)) {
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 748);
corrected = true;
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 749);
modelOrIndex--;
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 750);
modelNode = modelNode.previous('li');
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 751);
if (yAxis) {
                            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 752);
modelNodeSize += modelNode.get('offsetHeight') + GETSTYLE(modelNode, 'marginTop') + GETSTYLE(modelNode, 'marginBottom');
                        }
                        else {
                            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 755);
modelNodeSize += modelNode.get('offsetWidth') + GETSTYLE(modelNode, 'marginLeft') + GETSTYLE(modelNode, 'marginRight');
                        }
                    }
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 758);
if (corrected) {
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 759);
modelOrIndex++;
                    }
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 761);
modelOrIndex = Math.min(modelOrIndex, instance._getMaxPaginatorGotoIndex(modelOrIndex, maxExpansions));
                }
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 763);
paginatorPlugin.scrollToIndex(modelOrIndex);
            }
            else {
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 766);
newOffset = Math.round(currentOffset + modelNodeEdge - boundingBoxEdge - (onTop ? 0 : (boundingBoxSize-modelNodeSize)));
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 767);
if (yAxis) {
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 768);
instance.saveScrollTo(null, newOffset);
                }
                else {
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 771);
instance.saveScrollTo(newOffset, null);
                }
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 776);
if (!modelNode) {
            }
            else {
            }
        }
    },

    /**
     * If the Model/Models has a 'selected-status' in the ScrollView-instance.
     *
     * @method modelIsSelected
     * @param {Y.Model|Array} model Model or Array of Models to be checked. May also be items of a LazyModelList,
     * in which case it might not be a true Model, but an Object.
     * @return {Boolean} whether the Model (or all Models) have a 'selected-status'
     * @since 0.1
    */
    modelIsSelected : function(model) {
        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "modelIsSelected", 792);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 793);
var instance = this,
            selected;

        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 796);
if (Lang.isArray(model)) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 797);
YArray.some(
                model,
                function(onemodel) {
                    _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "(anonymous 4)", 799);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 800);
selected = instance._selectedModels[instance.getModelAttr(onemodel, 'clientId')];
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 801);
return selected ? false : true;
                }
            );
        }
        else {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 806);
selected = instance._selectedModels[instance.getModelAttr(model, 'clientId')];
        }
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 808);
return Lang.isValue(selected);
    },

    /**
     * Of all the supplied Models: sets the 'selected-status' in the ScrollView-instance to true
     *
     * @method selectModels
     * @param {Y.Model|Array} models Model or Array of Models to be checked. May also be items of a LazyModelList,
     * in which case it might not be a true Model, but an Object.
     * @param {boolean} [scrollIntoView] makes the first selected Model scroll into the View (at the top).
     * @param {Object} [options] To force the 'scrollIntoView' to scroll on top or on bottom of the view.
     *     @param {Boolean} [options.forceTop=false] if 'true', the (first) selected item will always be positioned on top.
     *     @param {Boolean} [options.forceBottom=false] if 'true', the (first) selected item will always be positioned on bottom.
     * @param {boolean} [silent] set true if you don't want a 'modelSelectionChange'-event to be fired.
     * @param {Int} [maxExpansions] Only needed when you use the plugin <b>ITSAScrollViewInifiniteScroll</b>. Use this value to limit
     * expansion data-calls. It will prevent you from falling into endless expansion when the list is infinite. If not set this method will expand
     * at the <b>max of ITSAScrollViewInifiniteScroll.get('maxExpansions') times by default</b>. If you are responsible for the external data and
     * that data is limited, you might choose to set this value that high to make sure all data is rendered in the scrollview.
     * @since 0.1
    */
    selectModels : function(models, scrollIntoView, options, silent, maxExpansions) {
//=============================================================================================================================
//
// NEED SOME WORK HERE: MIGHT BE ASYNCHROUS --> WE NEED TO RETURN A PROMISE
//
//=============================================================================================================================
        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "selectModels", 828);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 834);
var instance = this,
            isArray = Lang.isArray(models),
            singleSelectable = (instance.get('modelsSelectable')==='single'),
            prevSize, contentBox;

        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 839);
if (singleSelectable) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 840);
instance.clearSelectedModels(true, true);
        }
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 842);
if (!silent) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 843);
contentBox = instance.get('contentBox');
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 844);
prevSize = contentBox.all('.'+SVML_SELECTED_CLASS).size();
        }

        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 847);
if (isArray && !singleSelectable) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 848);
YArray.each(
                models,
                function(model) {
                    _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "(anonymous 5)", 850);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 851);
instance._selectModel(model, true, maxExpansions);
                }
            );
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 854);
if (scrollIntoView && (models.length>0)) {
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 855);
instance.scrollIntoView(models[0], options, maxExpansions);
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 859);
if (isArray) {
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 860);
models = models[0];
            }
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 862);
instance._selectModel(models, true, maxExpansions);
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 863);
if (scrollIntoView) {
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 864);
instance.scrollIntoView(models, options, maxExpansions);
            }
        }
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 867);
if (!silent && (prevSize!==contentBox.all('.'+SVML_SELECTED_CLASS).size())) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 868);
instance._fireSelectedModels();
        }
    },

    /**
     * Of all the supplied Models: sets the 'selected-status' in the ScrollView-instance to true
     *
     * @method unselectModels
     * @param {Y.Model|Array} models Model or Array of Models to be checked
     * @param {boolean} [silent] set true if you don't want a 'modelSelectionChange'-event to be fired.
     * @since 0.1
    */
    unselectModels : function(models, silent) {
        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "unselectModels", 880);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 881);
var instance = this,
            prevSize, contentBox;

        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 884);
if (!silent) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 885);
contentBox = instance.get('contentBox');
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 886);
prevSize = contentBox.all('.'+SVML_SELECTED_CLASS).size();
        }
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 888);
if (Lang.isArray(models)) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 889);
YArray.each(
                models,
                function(model) {
                    _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "(anonymous 6)", 891);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 892);
instance._selectModel(model, false);
                }
            );
        }
        else {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 897);
instance._selectModel(models, false);
        }
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 899);
if (!silent && (prevSize!==contentBox.all('.'+SVML_SELECTED_CLASS).size())) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 900);
instance._fireSelectedModels();
        }
    },

    /**
     * Of all the selected Models: sets the 'selected-status' in the ScrollView-instance to false
     *
     * @method clearSelectedModels
     * @param {boolean} [silent] set true if you don't want a 'modelSelectionChange'-event to be fired.
     * @param {boolean} [force] set true if you want to force unselect all models, even if the attribute 'modelsUnselectable' is true.
     * @since 0.1
    */
    clearSelectedModels : function(silent, force) {
        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "clearSelectedModels", 912);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 913);
var instance = this,
            contentBox = instance.get('contentBox'),
            currentSelected, fireEvent, firstSelected, clientId, model, modelList;

        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 917);
currentSelected = contentBox.all('.'+SVML_SELECTED_CLASS);
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 918);
firstSelected = (currentSelected.size()>0) && currentSelected.item(0);
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 919);
if (silent) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 920);
currentSelected.removeClass(SVML_SELECTED_CLASS);
        }
        else {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 923);
fireEvent = (currentSelected.size()>0);
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 924);
currentSelected.removeClass(SVML_SELECTED_CLASS);
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 925);
if (fireEvent) {
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 926);
instance._fireSelectedModels();
            }
        }
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 929);
instance._selectedModels = {};
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 930);
if (instance.get('modelsUnselectable') && firstSelected && !force) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 931);
clientId = firstSelected.getData('modelClientId');
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 932);
modelList = instance._abberantModelList || instance.get('modelList');
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 933);
model = modelList.getByClientId(clientId);
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 934);
instance.selectModels(model, false, null, true);
        }
    },

    /**
     * Returns an Array with the Models that have the 'selected-status' in the ScrollView-instance set to true
     *
     * @method getSelectedModels
     * @param {Boolean} original If set to true: the original Models will be returned (unique). If false (or undefined)<br>
     * then -in case of repeated Models (see attribute 'modelConfig')- the subModel (dup or splitted) will be returned. In the
     * latter case, you have full control of the exact item that was selected.
     * @return {Array} Array with all unique Models that are selected. In case of LazyModelList, it might be Objects instead of Models.
     * @since 0.1
     */
    getSelectedModels : function(original) {
        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "getSelectedModels", 948);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 949);
var instance = this,
            selected;

        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 952);
if (!original) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 953);
selected = YObject.values(instance._selectedModels);
        }
        else {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 956);
selected = [];
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 957);
YObject.each(
                instance._selectedModels,
                function(model) {
                    // if model.get('clientId') is defined in _originalModels, then it has an originalModel
                    _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "(anonymous 7)", 959);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 961);
var originalModel = instance._originalModels[instance.getModelAttr(model, 'clientId')];
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 962);
if (!originalModel || (YArray.indexOf(selected, originalModel) === -1)) {
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 963);
selected.push(originalModel || model);
                    }
                }
            );
        }
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 968);
return selected;
    },

    /**
     * Renders the ModelList within _viewNode (which is inside the contentBox of the ScrollView-instance).
     * Call this method, when the ModelList.comapator changes, or when you are using LazyModelList and an item (Model or object) changes.
     * Is called automaticly on 'add', 'remove' and 'reset' events of the (Lazy)ModelList. And in case of ModelList:
     * also on *:change-events of a Model (but only when the Models-position changes or its groupHeaders)
     *
     * @method renderView
     * @since 0.1
     *
    */
    renderView : function() {
        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "renderView", 981);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 982);
this._renderView();
    },

    /**
     * Gets an attribute-value from a Model OR object. Depends on the state (Lazy or not).
     * Will always work, whether an Y.ModelList or Y.LazyModelList is attached.
     *
     * @method getModelAttr
     * @param {Y.Model} model the model (or extended class) from which the attribute has to be read.
     * @param {String} name Attribute name or object property path.
     * @return {Any} Attribute value, or `undefined` if the attribute doesn't exist, or 'null' if no model is passed.
     * @since 0.1
     *
    */
    getModelAttr: function(model, name) {
        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "getModelAttr", 996);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 997);
return model && ((model.get && (Lang.type(model.get) === 'function')) ? model.get(name) : model[name]);
    },

    /**
     * Sets an attribute-value of a Model OR object. Depends on the state (Lazy or not).
     * Will always work, whether an Y.ModelList or Y.LazyModelList is attached.
     * If you want to be sure the Model fires an attributeChange-event, then set 'revive' true. This way
     * lazy-Models will become true Models and fire an attributeChange-event. When the attibute was lazy before,
     * it will return lazy afterwards.
     *
     * @method setModelAttr
     * @param {Y.Model} model the model (or extended class) from which the attribute has to be read.
     * @param {Boolean} revive Whether to force a lazy-model to revive (when lazy before: will be lazy afterwards)
     * @param {String} name Attribute name or object property path.
     * @param {any} value Value to set.
     * @param {Object} [options] Data to be mixed into the event facade of the `change` event(s) for these attributes.
     * In case of Lazy-Model, this only has effect when 'revive' is true.
     *    @param {Boolean} [options.silent=false] If `true`, no `change` event will be fired.
     * @since 0.1
     *
    */
    setModelAttr: function(model, revive, name, value, options) {
        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "setModelAttr", 1018);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1019);
var instance = this,
            modelIsLazy, modelList;

        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1022);
if (model) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1023);
modelIsLazy = !model.get || (Lang.type(model.get) !== 'function');
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1024);
if (modelIsLazy) {
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1025);
if (revive) {
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1026);
modelList = instance.get('modelList');
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1027);
if (instance._modelListIsLazy && revive) {
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1028);
modelList.revive(model);
                    }
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1030);
model.set(name, value, options);
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1031);
if (instance._modelListIsLazy && revive) {
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1032);
modelList.free(model);
                    }
                }
                else {
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1036);
model[name] = value;
                }
            }
            else {
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1040);
model.set(name, value, options);
            }
        }
    },

    /**
     * Cleans up bindings and removes plugin
     * @method destructor
     * @protected
     * @since 0.1
    */
    destructor : function() {
        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "destructor", 1051);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1052);
var instance = this,
            modellist = instance.get('modelList');

        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1055);
instance._clearEventhandlers();
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1056);
modellist.removeTarget(instance);
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1057);
if (instance._selectableModelEvent) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1058);
instance._selectableModelEvent.detach();
        }
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1060);
if (instance._clickModelEvent) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1061);
instance._clickModelEvent.detach();
        }
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1063);
if (instance._mouseDownModelEvent) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1064);
instance._mouseDownModelEvent.detach();
        }
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1066);
if (instance._mouseUpModelEvent) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1067);
instance._mouseUpModelEvent.detach();
        }
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1069);
if (instance._mouseenterModelEvent) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1070);
instance._mouseenterModelEvent.detach();
        }
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1072);
if (instance._mouseleaveModelEvent) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1073);
instance._mouseleaveModelEvent.detach();
        }
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1075);
instance._viewNode.destroy(true);
    },

    //===============================================================================================
    // private methods
    //===============================================================================================

    /**
     * Does the rendering stuff, is called after the ScrollView-instance itself is rendered.
     *
     * @method _render
     * @private
     * @since 0.1
     *
    */
    _render: function() {
        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "_render", 1090);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1091);
var instance = this,
            modellist = instance.get('modelList'),
            viewNode;

        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1095);
instance._viewNode = viewNode = YNode.create(VIEW_TEMPLATE);
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1096);
viewNode.set('id', instance._viewId);
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1097);
instance._extraBindUI();
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1098);
if (modellist) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1099);
instance._renderView(null, true);
        }
    },

    /**
     * Focusses the modelNode and adds the className 'itsa-scrollviewmodel-focus'.
     * Previous focussed Node will be unmarked.
     *
     * @method _focusModelNode
     * @param {Y.Node} modelNode the ModelNode that should gain focus.
     * @private
     * @since 0.1
     *
    */
    _focusModelNode: function(modelNode) {
        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "_focusModelNode", 1113);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1114);
if (modelNode) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1115);
this._viewNode.all('.'+SVML_FOCUS_CLASS).removeClass(SVML_FOCUS_CLASS);
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1116);
modelNode.addClass(SVML_FOCUS_CLASS);
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1117);
modelNode.focus();
        }
    },

    /**
     * Returns the maximum PaginatorIndex that should be called. This is <b>lower</b> than the list-size, because
     * it is the uppermost item on the last page. This is handy, because scrollview.pages.scrollToIndex(lastitem)
     * bumbs too much.
     * <u>Be careful if you use the plugin ITSAScrollViewInifiniteScroll:</u> to get the last Node, there might be a lot of
     * list-expansions triggered. Be sure that expansions from external data does end, otherwise it will overload the browser.
     * That's why the param is needed.
     *
     * @method _getMaxPaginatorGotoIndex
     * @param {Int} searchedIndex index that needs to besearched for. This will prevent a complete rendering of all items when not needed.
     * This only applies when the ITSAScrollViewInifiniteScroll is plugged in.
     * @param {Int} [maxExpansions] Only needed when you use the plugin <b>ITSAScrollViewInifiniteScroll</b>. Use this value to limit
     * expansion data-calls. It will prevent you from falling into endless expansion when the list is infinite. If not set this method will expand
     * at the <b>max of ITSAScrollViewInifiniteScroll.get('maxExpansions') times by default</b>. If you are responsible for the external data and
     * that data is limited, you might choose to set this value that high to make sure all data is rendered in the scrollview.
     * @return {Int} maximum PaginatorIndex that should be called.
     * @private
     * @since 0.1
     *
    */
    _getMaxPaginatorGotoIndex : function(searchedIndex, maxExpansions) {
//=============================================================================================================================
//
// NEED SOME WORK HERE: MIGHT BE ASYNCHROUS --> WE NEED TO RETURN A PROMISE
//
//=============================================================================================================================
        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "_getMaxPaginatorGotoIndex", 1141);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1147);
var instance = this,
            paginator = instance.hasPlugin('pages'),
            modelList = instance._abberantModelList || instance.get('modelList'),
            axis = instance.get('axis'),
            yAxis = axis.y,
            boundingSize = instance.get('boundingBox').get(yAxis ? 'offsetHeight' : 'offsetWidth'),
            i = 0,
            lastNode, size, liElements;

        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1156);
if (paginator && (modelList.size()>0)) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1157);
lastNode = instance.getNodeFromIndex(Math.min(searchedIndex, modelList.size()-1), maxExpansions);
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1158);
if (yAxis) {
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1159);
size = lastNode.get('offsetHeight') + GETSTYLE(lastNode, 'marginTop') + GETSTYLE(lastNode, 'marginBottom');
            }
            else {
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1162);
size = lastNode.get('offsetWidth') + GETSTYLE(lastNode, 'marginLeft') + GETSTYLE(lastNode, 'marginRight');
            }
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1164);
liElements = instance._viewNode.all('li');
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1165);
i = liElements.size();
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1166);
while (lastNode && (--i>=0) && (size<boundingSize)) {
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1167);
lastNode = liElements.item(i);
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1168);
if (yAxis) {
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1169);
size += lastNode.get('offsetHeight') + GETSTYLE(lastNode, 'marginTop') + GETSTYLE(lastNode, 'marginBottom');
                }
                else {
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1172);
size += lastNode.get('offsetWidth') + GETSTYLE(lastNode, 'marginLeft') + GETSTYLE(lastNode, 'marginRight');
                }
            }
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1175);
if (size>=boundingSize) {i++;}
        }
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1177);
return i;
    },

    /**
     * Binding all events we need to make ModelList work with the ScrollView-instance
     *
     * @method _extraBindUI
     * @private
     * @since 0.1
    */
    _extraBindUI : function() {
        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "_extraBindUI", 1187);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1188);
var instance = this,
            boundingBox = instance.get('boundingBox'),
            modellist = instance.get('modelList'),
            eventhandlers = instance._eventhandlers;

        // making models bubble up to the scrollview-instance:
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1194);
if (modellist) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1195);
modellist.addTarget(instance);
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1196);
boundingBox.addClass(SVML_CLASS);
        }
        // If the model gets swapped out, reset events and reset targets accordingly.
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1199);
eventhandlers.push(
            instance.after('modelListChange', function (ev) {
                _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "(anonymous 8)", 1200);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1201);
var newmodellist = ev.newVal,
                    prevmodellist = ev.prevVal;
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1203);
if (prevmodellist) {
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1204);
prevmodellist.removeTarget(instance);
                }
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1206);
if (newmodellist) {
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1207);
newmodellist.addTarget(instance);
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1208);
boundingBox.addClass(SVML_CLASS);
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1209);
instance.renderView();
                }
                else {
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1212);
boundingBox.removeClass(SVML_CLASS);
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1213);
instance.get('contentBox').setHTML('');
                }
            })
        );
        // This was a though one!!
        // When paginator is plugged in, the scrollview-instance will make instance._gesture to become not null
        // when clicking without movement. This would lead th ePaginatorPlugin to make y-movement=null within pages._afterHostGestureMoveEnd()
        // Thus, we need to reset _gesture when click without movement
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1221);
eventhandlers.push(
            boundingBox.delegate(
                'click',
                function() {
                    _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "(anonymous 9)", 1224);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1225);
instance._gesture = null;
                },
                function() {
                    // Only handle click-event when there was motion less than 'clickSensivity' pixels
                    _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "(anonymous 10)", 1227);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1229);
var scrollingInAction = (Math.abs(instance.lastScrolledAmt) > instance.get('clickSensivity'));
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1230);
return (!scrollingInAction);
                }
            )
        );
        // Re-render the view when a model is added to or removed from the modelList
        // because we made it bubble-up to the scrollview-instance, we attach the listener there.
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1236);
eventhandlers.push(
            instance.after('reset', instance._resetView, instance)
        );
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1239);
eventhandlers.push(
            instance.after('remove', instance._renderView, instance)
        );
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1242);
eventhandlers.push(
            instance.after('add', instance._renderViewCheckAppend, instance)
        );
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1245);
eventhandlers.push(
            instance.after('*:change', instance._renderModelOrView, instance)
        );
    },

    /**
     * Setter for attribute modelList. Stores whether a Y.ModelList, or a Y.LazyModelList is set.
     *
     * @method _setModelList
     * @param {Object} val the new set value for this attribute
     * @private
     * @since 0.1
     *
    */
    _setModelList : function(val) {
        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "_setModelList", 1259);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1260);
var instance = this;

        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1262);
instance._modelListIsLazy = (val instanceof Y.LazyModelList);
    },

    /**
     * Setter for attribute noDups. Will re-render the view when changed UNLESS it is called from setWithoutRerender().
     *
     * @method _setNoDups
     * @param {Function} val the new set value for this attribute
     * @private
     * @since 0.1
     *
    */
    _setNoDups : function(val) {
        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "_setNoDups", 1274);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1275);
var instance = this;

        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1277);
if (instance._setNoDupsInitiated) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1278);
if (instance._rerenderAttributesOnChange) {
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1279);
instance._renderView({noDups: val});
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1283);
instance._setNoDupsInitiated = true;
        }
    },

    /**
     * Setter for attribute viewFilter. Will re-render the view when changed UNLESS it is called from setWithoutRerender().
     *
     * @method _setViewFilter
     * @param {Function} val the new set value for this attribute
     * @private
     * @since 0.1
     *
    */
    _setViewFilter : function(val) {
        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "_setViewFilter", 1296);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1297);
var instance = this;

        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1299);
if (instance._setViewFilterInitiated) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1300);
if (instance._rerenderAttributesOnChange) {
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1301);
instance._renderView({viewFilter: val});
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1305);
instance._setViewFilterInitiated = true;
        }
    },

    /**
     * Setter for attribute lastItemOnTop. Will re-render the view when changed UNLESS it is called from setWithoutRerender().
     *
     * @method _setLastItemOnTop
     * @param {Boolean} val the new set value for this attribute
     * @private
     * @since 0.1
     *
    */
    _setLastItemOnTop : function(val) {
        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "_setLastItemOnTop", 1318);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1319);
var instance = this;

        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1321);
if (instance._setLastItemOnTopInitiated) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1322);
if (instance._rerenderAttributesOnChange) {
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1323);
instance._renderView({lastItemOnTop: val});
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1327);
instance._setLastItemOnTopInitiated = true;
        }
    },


    /**
     * Setter for attribute groupHeader1. Will re-render the view when changed UNLESS it is called from setWithoutRerender().
     *
     * @method _setDupComparator
     * @param {Function} val the new set value for this attribute
     * @private
     * @since 0.1
     *
    */
    _setDupComparator : function(val) {
        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "_setDupComparator", 1341);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1342);
var instance = this;

        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1344);
if (instance._setDupComparatorInitiated) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1345);
if (instance._rerenderAttributesOnChange && instance.get('noDups')) {
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1346);
instance._renderView({dupComparator: val});
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1350);
instance._setDupComparatorInitiated = true;
        }
    },

    /**
     * Setter for attribute groupHeader1. Will re-render the view when changed UNLESS it is called from setWithoutRerender().
     *
     * @method _setGroupHeader1
     * @param {Function} val the new set value for this attribute
     * @private
     * @since 0.1
     *
    */
    _setGroupHeader1 : function(val) {
        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "_setGroupHeader1", 1363);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1364);
var instance = this;

        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1366);
if (instance._setGroupHeader1Initiated) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1367);
if (instance._rerenderAttributesOnChange) {
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1368);
instance._renderView({groupHeader1: val});
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1372);
instance._setGroupHeader1Initiated = true;
        }
    },

    /**
     * Setter for attribute groupHeader2. Will re-render the view when changed UNLESS it is called from setWithoutRerender().
     *
     * @method _setGroupHeader2
     * @param {Function} val the new set value for this attribute
     * @private
     * @since 0.1
     *
    */
    _setGroupHeader2 : function(val) {
        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "_setGroupHeader2", 1385);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1386);
var instance = this;

        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1388);
if (instance._setGroupHeader2Initiated) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1389);
if (instance._rerenderAttributesOnChange) {
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1390);
instance._renderView({groupHeader2: val});
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1394);
instance._setGroupHeader2Initiated = true;
        }
    },

    /**
     * Setter for attribute groupHeader3. Will re-render the view when changed UNLESS it is called from setWithoutRerender().
     *
     * @method _setGroupHeader3
     * @param {Function} val the new set value for this attribute
     * @private
     * @since 0.1
     *
    */
    _setGroupHeader3 : function(val) {
        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "_setGroupHeader3", 1407);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1408);
var instance = this;

        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1410);
if (instance._setGroupHeader3Initiated) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1411);
if (instance._rerenderAttributesOnChange) {
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1412);
instance._renderView({groupHeader3: val});
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1416);
instance._setGroupHeader3Initiated = true;
        }
    },

    /**
     * Setter for attribute renderGroupHeader1. Will re-render the view when changed UNLESS it is called from setWithoutRerender().
     *
     * @method _setRenderGroupHeader1
     * @param {Function} val the new set value for this attribute
     * @private
     * @since 0.1
     *
    */
    _setRenderGroupHeader1 : function(val) {
        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "_setRenderGroupHeader1", 1429);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1430);
var instance = this;

        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1432);
if (instance._setRenderGroupHeader1Initiated) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1433);
if (instance._rerenderAttributesOnChange) {
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1434);
instance._renderView({renderGroupHeader1: val});
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1438);
instance._setRenderGroupHeader1Initiated = true;
        }
    },

    /**
     * Setter for attribute renderGroupHeader2. Will re-render the view when changed UNLESS it is called from setWithoutRerender().
     *
     * @method _setRenderGroupHeader2
     * @param {Function} val the new set value for this attribute
     * @private
     * @since 0.1
     *
    */
    _setRenderGroupHeader2 : function(val) {
        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "_setRenderGroupHeader2", 1451);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1452);
var instance = this;

        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1454);
if (instance._setRenderGroupHeader2Initiated) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1455);
if (instance._rerenderAttributesOnChange) {
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1456);
instance._renderView({renderGroupHeader2: val});
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1460);
instance._setRenderGroupHeader2Initiated = true;
        }
    },

    /**
     * Setter for attribute renderGroupHeader3. Will re-render the view when changed UNLESS it is called from setWithoutRerender().
     *
     * @method _setRenderGroupHeader3
     * @param {Function} val the new set value for this attribute
     * @private
     * @since 0.1
     *
    */
    _setRenderGroupHeader3 : function(val) {
        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "_setRenderGroupHeader3", 1473);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1474);
var instance = this;

        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1476);
if (instance._setRenderGroupHeader3Initiated) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1477);
if (instance._rerenderAttributesOnChange) {
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1478);
instance._renderView({renderGroupHeader3: val});
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1482);
instance._setRenderGroupHeader3Initiated = true;
        }
    },

    /**
     * Setter for attribute renderModel. Will re-render the view when changed UNLESS it is called from setWithoutRerender().
     *
     * @method _setRenderModel
     * @param {Function} val the new set value for this attribute
     * @private
     * @since 0.1
     *
    */
    _setRenderModel : function(val) {
        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "_setRenderModel", 1495);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1496);
var instance = this;

        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1498);
if (instance._setRenderModelInitiated) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1499);
if (instance._rerenderAttributesOnChange) {
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1500);
instance._renderView({renderModel: val});
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1504);
instance._setRenderModelInitiated = true;
        }
    },

    /**
     * Setter for attribute modelsSelectable. Transforms val into three posible states: null, 'single' and 'multi'
     * Also resets _selectableModelEvent.
     *
     * @method _setModelsSelectable
     * @param {Boolean|String|null} val
     * @private
     * @since 0.1
     *
    */
    _setModelsSelectable : function(val) {
        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "_setModelsSelectable", 1518);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1519);
var instance = this;

        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1521);
if ((val==='') || !val) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1522);
val = null;
        }
        else {_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1524);
if (Lang.isBoolean(val)) {
            // val===true
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1526);
val = 'multi';
        }}
        // At this point, val can have three states: null, 'single' and 'multi'
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1529);
instance._setSelectableEvents(val);
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1530);
return val;
    },

    /**
     * Setter for attribute modelListStyled. Adds or removes the class 'itsa-scrollviewmodellist-styled' to the boundingBox.
     *
     * @method _setModelListStyled
     * @param {Boolean} val
     * @private
     * @since 0.1
     *
    */
    _setModelListStyled : function(val) {
        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "_setModelListStyled", 1542);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1543);
var instance = this;

        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1545);
instance.get('boundingBox').toggleClass(SVML_STYLE_CLASS, val);
    },

    /**
     * Sets or removes selectable click-events when the mouse clicks on a Model.
     *
     * @method _setSelectableEvents
     * @param {Boolean} val
     * @private
     * @since 0.1
     *
    */
    _setSelectableEvents : function(val) {
        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "_setSelectableEvents", 1557);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1558);
var instance = this,
            contentBox = instance.get('contentBox');

        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1561);
instance.clearSelectedModels();
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1562);
if (val && !instance._selectableModelEvent) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1563);
instance._selectableModelEvent = contentBox.delegate(
                'click',
                Y.rbind(instance._handleModelSelectionChange, instance),
                function() {
                    // Only handle click-event when there was motion less than 'clickSensivity' pixels
                    _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "(anonymous 11)", 1566);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1568);
var scrollingInAction = (Math.abs(instance.lastScrolledAmt) > instance.get('clickSensivity'));
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1569);
return (!scrollingInAction && this.hasClass(MODEL_CLASS));
                }
            );
        }
        else {_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1573);
if (!val && instance._selectableModelEvent) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1574);
instance._selectableModelEvent.detach();
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1575);
instance._selectableModelEvent = null;
        }}
    },

    /**
     * Sets or removes click-events when the mouse clicks on a Model.
     *
     * @method _setClickEvents
     * @param {Boolean} val
     * @private
     * @since 0.1
     *
    */
    _setClickEvents : function(val) {
        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "_setClickEvents", 1588);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1589);
var instance = this,
            contentBox = instance.get('contentBox');

        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1592);
if (val && !instance._clickModelEvent) {
            /**
             * Is fired when the user positions the mouse over a Model.
             *
             * @event modelClick
             * @param {Y.Node} node the node that was clicked.
             * @param {Y.Model} model the model that was bound to the node.
             * @since 0.1
            **/
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1601);
instance._clickModelEvent = contentBox.delegate(
                'click',
                function(e) {
                    _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "(anonymous 12)", 1603);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1604);
var node = e.currentTarget,
                        modelList = instance.get('modelList'),
                        modelClientId = node.getData('modelClientId'),
                        model = modelList && modelList.getByClientId(modelClientId);
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1608);
instance.fire('modelClick', {node: node, model: model});
                },
                function() {
                    // Only handle click-event when there was motion less than 'clickSensivity' pixels
                    _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "(anonymous 13)", 1610);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1612);
var scrollingInAction = (Math.abs(instance.lastScrolledAmt) > instance.get('clickSensivity'));
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1613);
return (!scrollingInAction && this.hasClass(MODEL_CLASS));
                }
            );
        }
        else {_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1617);
if (!val && instance._clickModelEvent) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1618);
instance._clickModelEvent.detach();
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1619);
instance._clickModelEvent = null;
        }}
    },

    /**
     * Sets or removes mousedown- and mouseup-events when the mouse goes down/up on a Model.
     *
     * @method _setMouseDownUpEvents
     * @param {Boolean} val
     * @private
     * @since 0.1
     *
    */
    _setMouseDownUpEvents : function(val) {
        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "_setMouseDownUpEvents", 1632);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1633);
var instance = this,
            contentBox = instance.get('contentBox');


        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1637);
if (val && !instance._mouseDownModelEvent) {
            /**
             * Is fired when the user positions the mouse over a Model.
             *
             * @event modelMouseDown
             * @param {Y.Node} node the node where the mousedown occurs.
             * @param {Y.Model} model the model that was bound to the node.
             * @since 0.1
            **/
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1646);
instance._mouseDownModelEvent = contentBox.delegate(
                'mousedown',
                function(e) {
                    _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "(anonymous 14)", 1648);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1649);
var node = e.currentTarget,
                        modelList = instance.get('modelList'),
                        modelClientId = node.getData('modelClientId'),
                        model = modelList && modelList.getByClientId(modelClientId);
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1653);
instance.fire('modelMouseDown', {node: node, model: model});
                },
                '.' + MODEL_CLASS
            );
        }
        else {_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1658);
if (!val && instance._mouseDownModelEvent) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1659);
instance._mouseDownModelEvent.detach();
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1660);
instance._mouseDownModelEvent = null;
        }}
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1662);
if (val && !instance._mouseUpModelEvent) {
            /**
             * Is fired when the user positions the mouse over a Model.
             *
             * @event modelMouseUp
             * @param {Y.Node} node the node where the mouseup occurs.
             * @param {Y.Model} model the model that was bound to the node.
             * @since 0.1
            **/
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1671);
instance._mouseUpModelEvent = contentBox.delegate(
                'mouseup',
                function(e) {
                    _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "(anonymous 15)", 1673);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1674);
var node = e.currentTarget,
                        modelList = instance.get('modelList'),
                        modelClientId = node.getData('modelClientId'),
                        model = modelList && modelList.getByClientId(modelClientId);
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1678);
instance.fire('modelMouseUp', {node: node, model: model});
                },
                '.' + MODEL_CLASS
            );
        }
        else {_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1683);
if (!val && instance._mouseUpModelEvent) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1684);
instance._mouseUpModelEvent.detach();
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1685);
instance._mouseUpModelEvent = null;
        }}
    },

    /**
     * Sets or removes mouseenter and mouseleave events when the mouse gets over the Models.
     *
     * @method _setHoverEvents
     * @param {Boolean} val
     * @private
     * @since 0.1
     *
    */
    _setHoverEvents : function(val) {
        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "_setHoverEvents", 1698);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1699);
var instance = this,
            contentBox = instance.get('contentBox');

        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1702);
if (val && !instance._mouseenterModelEvent) {
            /**
             * Is fired when the user positions the mouse over a Model.
             *
             * @event modelMouseEnter
             * @param {Y.Node} node the node on which the mouse entered.
             * @param {Y.Model} model the model that was bound to the node.
             * @since 0.1
            **/
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1711);
instance._mouseenterModelEvent = contentBox.delegate(
                'mouseenter',
                function(e) {
                    _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "(anonymous 16)", 1713);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1714);
var node = e.currentTarget,
                        modelList = instance.get('modelList'),
                        modelClientId = node.getData('modelClientId'),
                        model = modelList && modelList.getByClientId(modelClientId);
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1718);
instance.fire('modelMouseEnter', {node: node, model: model});
                },
                '.'+MODEL_CLASS
            );
        }
        else {_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1723);
if (!val && instance._mouseenterModelEvent) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1724);
instance._mouseenterModelEvent.detach();
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1725);
instance._mouseenterModelEvent = null;
        }}
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1727);
if (val && !instance._mouseleaveModelEvent) {
            /**
             * Is fired when the user positions the mouse outside a Model.
             *
             * @event modelMouseLeave
             * @param {Y.Node} node the node on which the mouse moved outwards off.
             * @param {Y.Model} model the model that was bound to the node.
             * @since 0.1
            **/
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1736);
instance._mouseleaveModelEvent = contentBox.delegate(
                'mouseleave',
                function(e) {
                    _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "(anonymous 17)", 1738);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1739);
var node = e.currentTarget,
                        modelList = instance.get('modelList'),
                        modelClientId = node.getData('modelClientId'),
                        model = modelList && modelList.getByClientId(modelClientId);
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1743);
instance.fire('modelMouseLeave', {node: node, model: model});
                },
                '.'+MODEL_CLASS
            );
        }
        else {_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1748);
if (!val && instance._mouseleaveModelEvent) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1749);
instance._mouseleaveModelEvent.detach();
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1750);
instance._mouseleaveModelEvent = null;
        }}
    },

    /**
     * Updates the styles of the selected Models and fires a 'modelSelectionChange'-event.
     *
     * @method _handleModelSelectionChange
     * @param {eventTarget} [e] The eventTarget after a selectionChange
     * @private
     * @since 0.1
     */
    _handleModelSelectionChange : function(e) {
        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "_handleModelSelectionChange", 1762);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1763);
var instance = this,
            modelNode = e.currentTarget,
            // first check _abberantModelList --> this might be available and it will overrule this.get('modelList')
            modelList = instance._abberantModelList || instance.get('modelList'),
            modelClientId = modelNode.getData('modelClientId'),
            model = modelList && modelList.getByClientId(modelClientId),
            modelsSelectable = instance.get('modelsSelectable'),
            singleSelectable = (modelsSelectable==='single'),
            shiftClick = e.shiftKey && !singleSelectable,
            ctrlClick = (e.metaKey || e.ctrlKey),
            viewFilter = instance.get('viewFilter'),
            modelPrevSelected, multipleModels, newModelIndex, prevModelIndex, startIndex, endIndex, i, nextModel,
            currentSelected, firstItemSelected;

        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1777);
modelPrevSelected = model && instance.modelIsSelected(model);
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1778);
if (model) {
            // At this stage, 'modelsSelectable' is either 'single' or 'multi'
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1780);
if (singleSelectable || !ctrlClick) {
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1781);
if (instance.get('modelsUnselectable')) {
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1782);
currentSelected = instance._viewNode.all('.'+SVML_SELECTED_CLASS);
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1783);
firstItemSelected = (currentSelected.size()>0) && currentSelected.item(0);
                }
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1785);
instance.clearSelectedModels(true, true);
            }
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1787);
if (shiftClick && instance._lastClickedModel) {
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1788);
multipleModels = [];
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1789);
newModelIndex = modelList.indexOf(model);
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1790);
prevModelIndex = modelList.indexOf(instance._lastClickedModel);
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1791);
startIndex = Math.min(newModelIndex, prevModelIndex);
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1792);
endIndex = Math.max(newModelIndex, prevModelIndex);
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1793);
for (i=startIndex; i<=endIndex; i++) {
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1794);
nextModel = modelList.item(i);
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1795);
if (!viewFilter || viewFilter(nextModel)) {
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1796);
multipleModels.push(nextModel);
                    }
                }
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1799);
instance.selectModels(multipleModels, false, null, true);
            }
            else {
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1802);
if (modelPrevSelected && !firstItemSelected) {
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1803);
instance.unselectModels(model, true);
                }
                else {
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1806);
instance.selectModels(model, false, null, true);
                }
                // store model because we need to know which model received the last click
                // We need to know in case of a future shift-click
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1810);
instance._lastClickedModel = modelPrevSelected ? null : model;
            }
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1812);
instance._focusModelNode(modelNode);
        }
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1814);
instance._fireSelectedModels();
    },

    /**
     * Renders the ModelList within _viewNode (which is inside the contentBox of the ScrollView-instance).
     * Does not need to be called standalone, because eventlisteners will sync automaticly on ModelList-changes.
     *
     * @method _renderView
     * @param {Object} [setterAtrs] Definition of fields which called this method internally. Only for internal use within some attribute-setters.
     * @param {Boolean} [forceRebuild] Forces the list to be cleared and rebuild from the ground up.
     * @private
     * @since 0.1
     *
    */
    _renderView : function(setterAtrs, forceRebuild) {
        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "_renderView", 1828);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1829);
var instance = this,
            viewNode = instance._viewNode,
            contentBox = instance.get('contentBox'),
            modelList = instance.get('modelList'),
            firstModel = modelList && (modelList.size()>0) && modelList.item(0),
            noDups = (setterAtrs && setterAtrs.noDups) || instance.get('noDups'),
            dupComparator = (setterAtrs && setterAtrs.dupComparator) || instance.get('dupComparator'),
            viewFilter = (setterAtrs && setterAtrs.viewFilter) || instance.get('viewFilter'),
            renderModel = (setterAtrs && setterAtrs.renderModel) || instance.get('renderModel'),
            groupHeader1Func = (setterAtrs && setterAtrs.groupHeader1) || instance.get('groupHeader1'),
            groupHeader2Func = (setterAtrs && setterAtrs.groupHeader2) || instance.get('groupHeader2'),
            groupHeader3Func = (setterAtrs && setterAtrs.groupHeader3) || instance.get('groupHeader3'),
            renderGroupHeader1 = (setterAtrs && setterAtrs.renderGroupHeader1) || instance.get('renderGroupHeader1') || groupHeader1Func,
            renderGroupHeader2 = (setterAtrs && setterAtrs.renderGroupHeader2) || instance.get('renderGroupHeader2') || groupHeader2Func,
            renderGroupHeader3 = (setterAtrs && setterAtrs.renderGroupHeader3) || instance.get('renderGroupHeader3') || groupHeader3Func,
            lastItemOnTop = (setterAtrs && setterAtrs.lastItemOnTop) || instance.get('lastItemOnTop'),
            activeGroupHeader1 = firstModel && groupHeader1Func && Lang.isValue(groupHeader1Func(firstModel)),
            activeGroupHeader2 = firstModel && groupHeader2Func && Lang.isValue(groupHeader2Func(firstModel)),
            activeGroupHeader3 = firstModel && groupHeader3Func && Lang.isValue(groupHeader3Func(firstModel)),
            infiniteView = instance.itssvinfinite,
            header1, header2, header3, modelConfig, modelNode,
            axis, xAxis, yAxis, boundingBox, viewsize, elementsize, lastModelNode, renderedModel, prevRenderedModel,
            modelClientId, headerNode, i, model, modelListItems, batchSize, items, modelListItemsLength, dupAvailable;

        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1853);
dupAvailable = function(model) {
            _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "dupAvailable", 1853);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1854);
var dupFound = false,
                modelComp = dupComparator(model);
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1856);
YArray.some(
                modelListItems,
                function(checkModel) {
                    _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "(anonymous 18)", 1858);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1859);
if (checkModel===model) {return true;}
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1860);
dupFound = (dupComparator(checkModel)===modelComp);
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1861);
return dupFound;
                }
            );
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1864);
return dupFound;
        };
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1866);
if (!contentBox.one('#'+instance._viewId)) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1867);
contentBox.setHTML(viewNode);
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1868);
instance._set('srcNode', contentBox);
        }
        // if it finds out there is a 'modelconfig'-attribute, then we need to make extra steps:
        // we do not render the standard 'modelList', but we create a second modellist that might have more models: these
        // will be the models that are repeated due to a count-value or an enddate when duplicateWhenDurationCrossesMultipleDays is true.
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1873);
modelListItems = modelList._items.concat();
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1874);
modelListItemsLength = modelListItems.length;
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1875);
if (!infiniteView || forceRebuild) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1876);
viewNode.setHTML('');
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1877);
i = 0;
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1878);
batchSize = modelListItemsLength;
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1879);
instance._prevHeader1 = null;
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1880);
instance._prevHeader2 = null;
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1881);
instance._prevHeader3 = null;
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1882);
instance._even = false;
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1883);
if (infiniteView) {
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1884);
instance._moreItemsAvailable = true;
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1888);
i = (instance._prevLastModelIndex || -1) + 1;
        }
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1890);
if (infiniteView) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1891);
batchSize = Math.min(instance.itssvinfinite.get('batchSize'), modelListItemsLength);
        }
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1893);
if (instance._generateAbberantModelList) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1894);
modelConfig = (setterAtrs && setterAtrs.modelConfig) || instance.get('modelConfig');
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1895);
if (modelConfig && modelConfig.date && (modelConfig.enddate || modelConfig.count)) {
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1896);
instance._generateAbberantModelList(infiniteView, forceRebuild);
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1897);
modelList = instance._abberantModelList;
                // reset next 2 items
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1899);
modelListItems = modelList._items.concat();
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1900);
modelListItemsLength = modelListItems.length;
            }
            else {
                // clear _abberantModelList to make sure in other methods the actual modelList (from attribute) will be used.
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1904);
instance._abberantModelList = null;
            }
        }
        else {
            // clear _abberantModelList to make sure in other methods the actual modelList (from attribute) will be used.
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1909);
instance._abberantModelList = null;
        }
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1911);
items = 0;
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1912);
while ((items<batchSize) && (i<modelListItemsLength)) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1913);
model = modelListItems[i];
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1914);
modelClientId = instance.getModelAttr(model, 'clientId');
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1915);
if ((!viewFilter || viewFilter(model)) &&
                (!noDups ||
                (!dupComparator && ((renderedModel = renderModel(model))!==prevRenderedModel)) ||
                (dupComparator && !dupAvailable(model)))
               ) {
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1920);
items++;
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1921);
modelNode = YNode.create(VIEW_MODEL_TEMPLATE);
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1922);
if (activeGroupHeader1) {
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1923);
header1 = groupHeader1Func(model);
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1924);
if (header1!==instance._prevHeader1) {
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1925);
headerNode = YNode.create(VIEW_MODEL_TEMPLATE),
                        headerNode.addClass(GROUPHEADER_CLASS);
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1927);
headerNode.addClass(GROUPHEADER1_CLASS);
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1928);
if (instance._prevHeader1) {
                            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1929);
headerNode.addClass(GROUPHEADER_SEQUEL_CLASS);
                        }
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1931);
headerNode.setHTML(renderGroupHeader1(model));
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1932);
viewNode.append(headerNode);
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1933);
instance._prevHeader1 = header1;
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1934);
instance._even = false;
                        // force to make a header2 insertion (when apriopriate)
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1936);
instance._prevHeader2 = null;
                    }
                }
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1939);
if (activeGroupHeader2) {
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1940);
header2 = groupHeader2Func(model);
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1941);
if (header2!==instance._prevHeader2) {
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1942);
headerNode = YNode.create(VIEW_MODEL_TEMPLATE),
                        headerNode.addClass(GROUPHEADER_CLASS);
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1944);
headerNode.addClass(GROUPHEADER2_CLASS);
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1945);
if (instance._prevHeader2) {
                            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1946);
headerNode.addClass(GROUPHEADER_SEQUEL_CLASS);
                        }
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1948);
headerNode.setHTML(renderGroupHeader2(model));
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1949);
viewNode.append(headerNode);
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1950);
instance._prevHeader2 = header2;
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1951);
instance._even = false;
                        // force to make a header3 insertion (when apriopriate)
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1953);
instance._prevHeader3 = null;
                    }
                }
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1956);
if (activeGroupHeader3) {
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1957);
header3 = groupHeader3Func(model);
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1958);
if (header3!==instance._prevHeader3) {
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1959);
headerNode = YNode.create(VIEW_MODEL_TEMPLATE),
                        headerNode.addClass(GROUPHEADER_CLASS);
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1961);
headerNode.addClass(GROUPHEADER3_CLASS);
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1962);
if (instance._prevHeader3) {
                            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1963);
headerNode.addClass(GROUPHEADER_SEQUEL_CLASS);
                        }
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1965);
headerNode.setHTML(renderGroupHeader3(model));
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1966);
viewNode.append(headerNode);
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1967);
instance._prevHeader3 = header3;
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1968);
instance._even = false;
                    }
                }
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1971);
modelNode.setData('modelClientId', modelClientId);
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1972);
modelNode.addClass(MODEL_CLASS);
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1973);
modelNode.addClass(modelClientId);
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1974);
modelNode.addClass(instance._even ? SVML_EVEN_CLASS : SVML_ODD_CLASS);
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1975);
modelNode.setHTML(renderedModel || renderModel(model));
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1976);
viewNode.append(modelNode);
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1977);
instance._even = !instance._even;
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1978);
if (noDups && !dupComparator) {
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1979);
prevRenderedModel = renderedModel;
                }
            }
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1982);
i++;
        }
        // _prevLastModelIndex is needed by the plugin infinitescroll
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1985);
instance._prevLastModelIndex = i - 1;
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1986);
if (modelNode && lastItemOnTop && (!infiniteView || !instance._moreItemsAvailable)) {
            // need to add an extra empty LI-element that has the size of the view minus the last element
            // modelNode is the reference to the last element
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1989);
lastModelNode = modelNode;
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1990);
axis = instance.get('axis');
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1991);
xAxis = axis.x;
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1992);
yAxis = axis.y;
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1993);
boundingBox = instance.get('boundingBox'),
            modelNode = YNode.create(VIEW_EMPTY_ELEMENT_TEMPLATE),
            modelNode.addClass(EMPTY_ELEMENT_CLASS);
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1996);
viewsize = boundingBox.get(xAxis ? 'offsetWidth' : 'offsetHeight');
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1997);
if (yAxis) {
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1998);
elementsize = viewsize-lastModelNode.get('offsetHeight')-GETSTYLE(lastModelNode,'marginTop')-GETSTYLE(lastModelNode,'marginBottom');
            }
            else {
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 2001);
elementsize = viewsize-lastModelNode.get('offsetWidth')-GETSTYLE(lastModelNode,'marginLeft')-GETSTYLE(lastModelNode,'marginRight');
            }
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 2003);
lastModelNode = lastModelNode.previous();
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 2004);
while (lastModelNode && lastModelNode.hasClass(GROUPHEADER_CLASS)) {
                // also decrease with the size of this LI-element
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 2006);
if (yAxis) {
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 2007);
elementsize -= (lastModelNode.get('offsetHeight')+GETSTYLE(lastModelNode,'marginTop')+GETSTYLE(lastModelNode,'marginBottom'));
                }
                else {
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 2010);
elementsize -= (lastModelNode.get('offsetWidth')+GETSTYLE(lastModelNode,'marginLeft')+GETSTYLE(lastModelNode,'marginRight'));
                }
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 2012);
lastModelNode = lastModelNode.previous();
            }
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 2014);
modelNode.setStyle((xAxis ? 'width' : 'height'), elementsize+'px');
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 2015);
if (elementsize>0) {
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 2016);
viewNode.append(modelNode);
            }
        }
        // always syncUI() --> making scrollview 'know' how large the scrollable contentbox is
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 2020);
instance.syncUI();
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 2021);
if (infiniteView) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 2022);
infiniteView.checkExpansion();
        }
        /**
         * Fire an event, so that anyone who is terested in this point can hook in.
         *
         * @event modelListRender
         * @since 0.1
        **/
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 2030);
instance.fire('modelListRender');
    },

    /**
     * Retreives the Li-Node given a Model from the ModelList, or the index,
     * <u>Be careful if you use the plugin ITSAScrollViewInifiniteScroll:</u> to get the Node, there might be a lot of
     * list-expansions triggered. Be sure that expansions from external data does end, otherwise it will overload the browser.
     * That's why the second param is needed.
     *
     * @method _getNodeFromModelOrIndex
     * @param {Y.Model} [model] List-item from the modelList. In case of a LazyModelList, this might be an object.
     * @param {Int} [index] Index of item in the modelList.
     * @param {Int} [maxExpansions] Only needed when you use the plugin <b>ITSAScrollViewInifiniteScroll</b>. Use this value to limit
     * expansion data-calls. It will prevent you from falling into endless expansion when the list is infinite. If not set this method will expand
     * at the <b>max of ITSAScrollViewInifiniteScroll.get('maxExpansions') times by default</b>. If you are responsible for the external data and
     * that data is limited, you might choose to set this value that high to make sure all data is rendered in the scrollview.
     * @return {Y.Node} Li-Node that corresponds with the model.
     * @since 0.1
    */
    _getNodeFromModelOrIndex : function(model, index, maxExpansions) {
//=============================================================================================================================
//
// NEED SOME WORK HERE: MIGHT BE ASYNCHROUS --> WE NEED TO RETURN A PROMISE
//
//=============================================================================================================================
        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "_getNodeFromModelOrIndex", 2049);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 2055);
var instance = this,
            infiniteScrollPlugin = instance.hasPlugin('itssvinfinite'),
            maxLoop = Lang.isNumber(maxExpansions) ? maxExpansions : ((infiniteScrollPlugin && infiniteScrollPlugin.get('maxExpansions')) || 0),
            i = 0,
            nodeFound = false,
            nodeList, findNode, modelClientId;

        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 2062);
if (model) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 2063);
modelClientId = instance.getModelAttr(model, 'clientId');
        }
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 2065);
findNode = function(node, loopindex) {
            _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "findNode", 2065);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 2066);
var found = model ? (node.getData('modelClientId') === modelClientId) : (loopindex===index);
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 2067);
if (found) {
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 2068);
nodeFound = node;
            }
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 2070);
return found;
        };
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 2072);
do {


            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 2075);
nodeList = instance._viewNode.all('.itsa-scrollviewmodel');
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 2076);
nodeList.some(findNode);
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 2077);
i++;
//=============================================================================================================================
//
// NEED SOME WORK HERE: infiniteScrollPlugin.expandList IS ASYNCHROUS --> WE NEED PROMISES TO BE SURE IT HAS FINISHED HIS JOB
//
//=============================================================================================================================
        }while (!nodeFound && infiniteScrollPlugin && (i<maxLoop) && infiniteScrollPlugin.expandList());
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 2084);
return nodeFound;
    },

    /**
     * Re-renders the ModelList within _viewNode and forces a complete new rebuild.
     *
     * @method _resetView
     * @private
     * @since 0.1
     *
    */
    _resetView : function() {
        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "_resetView", 2095);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 2096);
this._resetView(null, true);
    },


    /**
     * Will render the view, but first checks whether the current View needs to be cleared, oor the new models need to be appended.
     * This module will assume ONLY to append if <i>ITSAScrollViewInifiniteScroll</i> is pluged in.
     *
     * @method _renderViewCheckAppend
     * @param {EventTarget} e
     * @private
     * @since 0.1
     *
    */
    _renderViewCheckAppend : function(e) {
        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "_renderViewCheckAppend", 2110);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 2111);
var instance = this,
            append = instance.hasPlugin('itssvinfinite');

        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 2114);
instance._renderView(null, append);
    },

    /**
     * Checks if there is a need to re-render the _viewNode whenever the data of one of the models in the modellist changes.
     * In case the position of the Model doesn't change, we can just rerender the Model. Otherwise rerender the whole _viewNode
     *
     * @method _renderModelOrView
     * @param {EventTarget} e
     * @private
     * @since 0.1
     *
    */
    _renderModelOrView : function(e) {
        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "_renderModelOrView", 2127);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 2128);
var instance = this,
            modellist = instance.get('modelList');

        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 2131);
instance._renderView();
    },

    /**
     * Of this Model: sets the 'selected-status' in the ScrollView-instance to true
     *
     * @method _selectModel
     * @param {Y.Model|Array} model Model or Array of Models to be checked
     * @param {Boolean} selectstatus whether the new status is true or false
     * @param {Int} [maxExpansions] Only needed when you use the plugin <b>ITSAScrollViewInifiniteScroll</b>. Use this value to limit
     * expansion data-calls. It will prevent you from falling into endless expansion when the list is infinite. If not set this method will expand
     * at the <b>max of ITSAScrollViewInifiniteScroll.get('maxExpansions') times by default</b>. If you are responsible for the external data and
     * that data is limited, you might choose to set this value that high to make sure all data is rendered in the scrollview.
     * @private
     * @since 0.1
    */
    _selectModel : function(model, selectstatus, maxExpansions) {
//=============================================================================================================================
//
// NEED SOME WORK HERE: MIGHT BE ASYNCHROUS --> WE NEED TO RETURN A PROMISE
//
//=============================================================================================================================
        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "_selectModel", 2147);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 2153);
var instance = this,
            modelid = instance.getModelAttr(model, 'clientId'),
            contentBox = instance.get('contentBox'),
            itemUnselectable = (!selectstatus && instance.get('modelsUnselectable') && (YObject.size(instance._selectedModels)===1)),
            modelnodes;

        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 2159);
if (modelid && !itemUnselectable) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 2160);
if (instance.hasPlugin('itssvinfinite')) {
                // make sure the node is rendered
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 2162);
instance._getNodeFromModelOrIndex(model, null, maxExpansions);
            }
            // each modelid-class should be present only once
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 2165);
modelnodes = contentBox.one('.'+modelid);
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 2166);
if (modelnodes) {
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 2167);
modelnodes.toggleClass(SVML_SELECTED_CLASS, selectstatus);
            }
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 2169);
if (selectstatus) {
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 2170);
instance._selectedModels[modelid] = model;
            }
            else {
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 2173);
delete instance._selectedModels[modelid];
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 2177);
if (!modelid) {
            }
            else {
            }
        }
    },

    /**
     * A utility method that fires the selected Models.
     *
     * @method _fireSelectedModels
     * @private
     * @since 0.1
     */
    _fireSelectedModels : function () {
        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "_fireSelectedModels", 2191);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 2192);
var instance = this,
            selectedModels, originalModels;

        /**
         * Is fired when the user changes the modelselection. In case multiple Models are selected and the same Model is
         * more than once (in case of repeating Models), the Model is only once in the resultarray.
         * Meaning: only original unique Models are returned.
         *
         * @event modelSelectionChange
         * @param {Array} newModelSelection contains [Model] with all modelList's Models that are selected:<br>
         * -in case of repeated Models (see attribute 'modelConfig')- the subModel (dup or splitted) will be returned. This subModel
         * <b>is not part</b> of the original ModelList.
         * @param {Array} originalModelSelection contains [Model] with all modelList's unique original Models that are selected.
         * These models also exists in the original ModelList.
         * @since 0.1
        **/
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 2208);
selectedModels = instance.getSelectedModels();
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 2209);
originalModels = instance._abberantModelList ? instance.getSelectedModels(true) : selectedModels;
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 2210);
instance.fire(
            'modelSelectionChange',
            {
                newModelSelection: selectedModels,
                originalModelSelection: originalModels
            }
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
        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "_clearEventhandlers", 2227);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 2228);
YArray.each(
            this._eventhandlers,
            function(item){
                _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "(anonymous 19)", 2230);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 2231);
item.detach();
            }
        );
    }

}, true);

_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 2238);
Y.ScrollView.ITSAScrollViewModelListExtention = ITSAScrollViewModelListExtention;

_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 2240);
Y.Base.mix(Y.ScrollView, [ITSAScrollViewModelListExtention]);

}, '@VERSION@', {
    "requires": [
        "base-build",
        "node-base",
        "node-event-delegate",
        "pluginhost-base",
        "event-mouseenter",
        "event-custom",
        "model",
        "model-list",
        "lazy-model-list"
    ],
    "skinnable": true
});
