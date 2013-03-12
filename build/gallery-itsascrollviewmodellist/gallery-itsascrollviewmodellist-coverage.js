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
_yuitest_coverage["build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js"].code=["YUI.add('gallery-itsascrollviewmodellist', function (Y, NAME) {","","'use strict';","","/**"," * ScrollView ModelList Extention"," *"," *"," * Adds an Y.ModelList to a ScrollView instance, where the Models are rendered inside an unsorted-list"," * lies within the scrollview's-contentBox. This results in an ul-list with Models."," *"," * Caution: you MUST set the axis-atribute before rendering! Because the content is empty at start, scrollview"," * would otherwise fail autofind the value of axis."," *"," * @module gallery-itsscrollviewmodellist"," * @class ITSAScrollViewModelList"," * @constructor"," * @since 0.1"," *"," * <i>Copyright (c) 2013 Marco Asbreuk - http://itsasbreuk.nl</i>"," * YUI BSD License - http://developer.yahoo.com/yui/license.html"," *","*/","","var Lang = Y.Lang,","    YObject = Y.Object,","    YArray = Y.Array,","    YNode = Y.Node,","    VIEW_TEMPLATE = '<ul role=\"presentation\"></ul>',","    VIEW_MODEL_TEMPLATE = '<li role=\"presentation\"></li>',","    VIEW_EMPTY_ELEMENT_TEMPLATE = '<li></li>',","    EMPTY_ELEMENT_CLASS = 'itsa-scrollview-fillelement',","    MODEL_CLASS = 'itsa-scrollviewmodel',","    SVML_CLASS = 'itsa-scrollviewmodellist',","    SVML_SELECTED_CLASS = MODEL_CLASS + '-selected',","    SVML_EVEN_CLASS = MODEL_CLASS + '-even',","    SVML_ODD_CLASS = MODEL_CLASS + '-odd',","    SVML_STYLE_CLASS = SVML_CLASS + '-styled',","    GROUPHEADER_CLASS = SVML_CLASS + '-groupheader',","    GROUPHEADER1_CLASS = SVML_CLASS + '-groupheader1',","    GROUPHEADER2_CLASS = SVML_CLASS + '-groupheader2',","    GROUPHEADER3_CLASS = SVML_CLASS + '-groupheader3',","    GROUPHEADER_SEQUEL_CLASS = SVML_CLASS + '-sequelgroupheader';","","","// -- First: extend Y.LazyModelList with 2 sugar methods for set- and get- attributes --------------------------","","function ITSALazyModelListAttrExtention() {}","","Y.mix(ITSALazyModelListAttrExtention.prototype, {","","    /**","     * Gets an attribute-value from a Model OR object. Depends on the state (Lazy or not).","     * Will always work, whether an Y.ModelList or Y.LazyModelList is attached.","     *","     * @method getModelAttr","     * @param {Y.Model} model the model (or extended class) from which the attribute has to be read.","     * @param {String} name Attribute name or object property path.","     * @return {Any} Attribute value, or `undefined` if the attribute doesn't exist, or 'null' if no model is passed.","     * @since 0.1","     *","    */","    getModelAttr: function(model, name) {","        return model && ((model.get && (Lang.type(model.get) === 'function')) ? model.get(name) : model[name]);","    },","","    /**","     * Sets an attribute-value of a Model OR object. Depends on the state (Lazy or not).","     * Will always work, whether an Y.ModelList or Y.LazyModelList is attached.","     * If you want to be sure the Model fires an attributeChange-event, then set 'revive' true. This way","     * lazy-Models will become true Models and fire an attributeChange-event. When the attibute was lazy before,","     * it will return lazy afterwards.","     *","     * @method _setModelAttr","     * @param {Y.Model} model the model (or extended class) from which the attribute has to be read.","     * @param {Boolean} revive Whether to force a lazy-model to revive (when lazy before: will be lazy afterwards)","     * @param {String} name Attribute name or object property path.","     * @param {any} value Value to set.","     * @param {Object} [options] Data to be mixed into the event facade of the `change` event(s) for these attributes.","     * In case of Lazy-Model, this only has effect when 'revive' is true.","     *    @param {Boolean} [options.silent=false] If `true`, no `change` event will be fired.","     * @since 0.1","     *","    */","    setModelAttr: function(model, revive, name, value, options) {","        var instance = this,","            modelIsLazy;","","        if (model) {","            modelIsLazy = !model.get || (Lang.type(model.get) !== 'function');","            if (modelIsLazy) {","                if (revive) {","                    if (revive) {","                        instance.revive(model);","                        model.set(name, value, options);","                        instance.free(model);","                    }","                    else {","                        model.set(name, value, options);","                    }","                }","                else {","                    model[name] = value;","                }","            }","            else {","                model.set(name, value, options);","            }","        }","    }","","}, true);","","Y.LazyModelList.ITSALazyModelListAttrExtention = ITSALazyModelListAttrExtention;","","Y.Base.mix(Y.LazyModelList, [ITSALazyModelListAttrExtention]);","","// -- Mixing extra Methods to Y.ScrollView -----------------------------------","","function ITSAScrollViewModelListExtention() {}","","ITSAScrollViewModelListExtention.ATTRS = {","","   /**","    * The ModelList that is 'attached' to the Calendar, resulting in highlighted dates for each Model","    * that has a 'Date-match'. For more info how a 'Date-match' is achieved: see the attribute modelConfig.","    *","    * @attribute modelList","    * @type {ModelList}","    * @default null","    * @since 0.1","    */","    modelList: {","        value: null,","        validator: function(v){ return (v instanceof Y.ModelList) || (v instanceof Y.LazyModelList) || (v === null);},","        setter: '_setModelList'","    },","","   /**","    * Whether duplicate values (rendered by the attributefunction 'renderModel') are possible.","    * By default, this will be compared with the previous rendered Model.","    * If you want a more sophisticated dup-check, the set the dupComparator-attribute. But be careful: the dupComparator","    * has a significant performance-hit.","    * <u>If you set this attribute after the scrollview-instance is rendered, the scrollview-instance will be re-rendered.</u>","    *","    * @attribute noDups","    * @type {Boolean}","    * @default false","    * @since 0.1","    */","    noDups: {","        value: false,","        validator: function(v){ return Lang.isBoolean(v);},","        setter: '_setNoDups'","    },","","    /**","     * Function that can filter the modellist, in a way that only specific models are rendered.","     * The function must look like: <b>function(model)</b> and must return true or false (which the developer","     * can determine based on the model that is passed).","     *","     * For example: function(model) {return model.get('country')==='US';}","     *","     * @attribute viewFilter","     * @type {Function} The function must look like: <b>function(model)</b>","     * @default null","     * @since 0.1","     */","    viewFilter: {","        value: null,","        validator: function(v){ return Lang.isFunction(v) || v === null; },","        setter: '_setViewFilter'","    },","","   /**","    * Whether the Models can be selected (resulting in a 'modelSelectionChange'-event)","    * Posible values are: <b>null</b>, <b>''</b>, <b>true</b>, <b>false</b>, <b>single</b>, <b>multi</b>","    * The value true equals 'multi'","    *","    * @default true","    * @attribute modelsSelectable","    * @type {Boolean|String|null}","    * @since 0.1","    */","    modelsSelectable: {","        value: null,","        lazyAdd: false,","        validator:  function(v) {","            return ((v==='') || (v===null) || (v===true) || (v===false) || (v==='single') || (v==='multi'));","        },","        setter: '_setModelsSelectable'","    },","","   /**","    * Whether the Models is styled using the css of this module.","    * In fact, just the classname 'itsa-scrollviewmodellist-styled' is added to the boundingBox","    * and the css-rules do all the rest. The developer may override these rules, or set this value to false","    * while creatiung their own css. In the latter case it is advisable to take a look at all the css-rules","    * that are supplied by this module. In either cases, the modelList (is available) will add classes to all li-elements","    * thus the developer can style it at own will.","    *","    * @default false","    * @attribute modelListStyled","    * @type {Boolean}","    * @since 0.1","    */","    modelListStyled: {","        value: false,","        lazyAdd: false,","        validator:  function(v) {","            return Lang.isBoolean(v);","        },","        setter: '_setModelListStyled'","    },","","   /**","    * Sets the sensibility when clicking on a model.","    * This prevents a click-event when the user actually scrolls the scrollview instead of selecting an item","    * The number represents the amount of pixels that the scrollview-instance can shift a bit during a click","    * while still firing a click-event. Above this limit, the scrollviewinstance will assume movement and does not fire","    * a click-event.","    *","    * @default 2","    * @attribute clickSensivity","    * @type int","    * @since 0.1","    */","    clickSensivity: {","        value: 2,","        validator:  function(v) {","            return (Lang.isNumber(v) && (v>=0) && (v<11));","        }","    },","","   /**","    * Whether an event is fired when a Model catches a mouse-click.","    * When set to true, the events 'modelClicked' is fired when clicking on the Models.","    * Click-events <b>do have a correction</b> when the user actually scrolls instead of clicking a Model-item.","    * See the attribute clickSensivity for more details.","    *","    * @attribute clickEvents","    * @type {Boolean}","    * @default false","    * @since 0.1","    */","    clickEvents: {","        value: false,","        lazyAdd: false,","        validator: function(v) {return Lang.isBoolean(v);},","        setter: '_setClickEvents'","    },","","   /**","    * Whether an event is fired when a Model catches a mousedown or mouseup event.","    * When set to true, the events 'modelMouseDown' and 'modelMouseUp' are fired when mousedown or mouseup","    * happens on the Models. These events <b>do not have a correction</b> when the user actually scrolls instead of clicking a Model-item.","    * This means they are fired no matter if scrolling is busy or not.","    *","    * @attribute mouseDownUpEvents","    * @type {Boolean}","    * @default false","    * @since 0.1","    */","    mouseDownUpEvents: {","        value: false,","        lazyAdd: false,","        validator: function(v) {return Lang.isBoolean(v);},","        setter: '_setMouseDownUpEvents'","    },","","   /**","    * Whether an event is fired when a Model catches a mouse-enter or mouseleave.","    * When set to true, the events 'modelMouseEnter' and 'modelMouseLeave' are fired when moving the mouse over the Models.","    *","    * @attribute hoverEvents","    * @type {Boolean}","    * @default false","    * @since 0.1","    */","    hoverEvents: {","        value: false,","        lazyAdd: false,","        validator: function(v) {return Lang.isBoolean(v);},","        setter: '_setHoverEvents'","    },","","    /**","     * If set true, the last element will not be bounced to the bottm/right edge, but to the top/left edge.","     *","     * @method lastItemOnTop","     * @return {String|Int|Boolean} Model-specific value on which base the module can determine to what groupHeader","     * the Model belongs.","     * @since 0.1","     */","    lastItemOnTop: {","        value: null,","        validator: function(v){ return Lang.isBoolean(v);},","        setter: '_setLastItemOnTop'","    },","","    /**","     * When defined, the ScrollView-instance will generate GroupHeaders (extra li-elements with class='itsa-scrollviewmodellist-groupheader1')","     * just above all models (li-elements) whom encounter a change in the groupHeader1-value.","     * The attribute MUST be a function like this: <b>function(model) {return ...)}</b> and MUST return a {String|Int|Boolean} value for all models.","     * <u>If you set this attribute after the scrollview-instance is rendered, the scrollview-instance will be re-rendered.</u>","     *","     * @attribute groupHeader1","     * @type {Function}","     * @default null","     * @since 0.1","     */","    groupHeader1: {","        value: null,","        validator: function(v){ return Lang.isFunction(v) || v === null; },","        setter: '_setGroupHeader1'","    },","","    /**","     * When defined, the ScrollView-instance will generate GroupHeaders (extra li-elements with class='itsa-scrollviewmodellist-groupheader1')","     * just above all models (li-elements) whom encounter a change in the groupHeader2-value.","     * The attribute MUST be a function like this: <b>function(model) {return ...)}</b> and MUST return a {String|Int|Boolean} value for all models.","     * <u>If you set this attribute after the scrollview-instance is rendered, the scrollview-instance will be re-rendered.</u>","     *","     * @attribute groupHeader2","     * @type {Function}","     * @default null","     * @since 0.1","     */","    groupHeader2: {","        value: null,","        validator: function(v){ return Lang.isFunction(v) || v === null; },","        setter: '_setGroupHeader2'","    },","","    /**","     * When defined, the ScrollView-instance will generate GroupHeaders (extra li-elements with class='itsa-scrollviewmodellist-groupheader1')","     * just above all models (li-elements) whom encounter a change in the groupHeader3-value.","     * The attribute MUST be a function like this: <b>function(model) {return ...)}</b> and MUST return a {String|Int|Boolean} value for all models.","     * <u>If you set this attribute after the scrollview-instance is rendered, the scrollview-instance will be re-rendered.</u>","     *","     * @attribute groupHeader3","     * @type {Function}","     * @default null","     * @since 0.1","     */","    groupHeader3: {","        value: null,","        validator: function(v){ return Lang.isFunction(v) || v === null; },","        setter: '_setGroupHeader3'","    },","","    /**","     * Attribute that is responsible for the rendering of all the Models. The developer is advised to override this attribute in a way","     * that the rendering of the Models result in the content that is desired.","     * The attribute MUST be a function like this: <b>function(model) {return ...)}</b> and MUST return a {String} value for all models.","     * <u>If you set this attribute after the scrollview-instance is rendered, the scrollview-instance will be re-rendered.</u>","     *","     * @attribute renderGroupHeader1","     * @type {Function}","     * @default null","     * @since 0.1","     */","    renderModel: {","        value: function(model) {","            return this.getModelAttr(model, 'clientId'); // default, so that there always is content. Best to be overwritten.","        },","        validator: function(v){ return Lang.isFunction(v) || v === null; },","        setter: '_setRenderModel'","    },","","    /**","     * Attribute that identifies duplicate Models.","     * By default, this function is 'null', meaning that Models will be compared with the previous rendered Model to see if they are dups.","     * (based on the value of 'renderModel').","     * If Set the dupComparator-attribute, you can have a more sophisticated dup-check which will loop through all the Models. Thus be careful:","     * the dupComparator has a significant performance-hit.","     * <u>If you set this attribute after the scrollview-instance is rendered, the scrollview-instance will be re-rendered","     * (only is 'noDups'===true).</u>","     *","     * @attribute dupComparator","     * @type {Function}","     * @default null","     * @since 0.1","     */","    dupComparator: {","        value: null,","        validator: function(v){ return Lang.isFunction(v) || v === null; },","        setter: '_setDupComparator'","    },","","    /**","     * Determines how the rendering of groupHeader1 takes place. The developer may set this method, but can choose not to.","     * If not overriden, renderGroupHeader1 will render the same as the attribute 'groupHeader1' (except that it's a String).","     * If the developer wants content other than groupHeader1 generates, he/she can override this method.","     * The attribute MUST be a function like this: <b>function(model) {return ...)}</b> and MUST return a {String} value for all models.","     * <u>If you change this method after the scrollview-instance is rendered, you need to call renderView() to make the changes applied.</u>","     *","     * @attribute renderGroupHeader1","     * @type {Function}","     * @default null","     * @since 0.1","     */","    renderGroupHeader1: {","        value: null,","        validator: function(v){ return Lang.isFunction(v) || v === null; },","        setter: '_setRenderGroupHeader1'","    },","","    /**","     * Determines how the rendering of groupHeader2 takes place. The developer may set this method, but can choose not to.","     * If not overriden, renderGroupHeader2 will render the same as the attribute 'groupHeader2' (except that it's a String).","     * If the developer wants content other than groupHeader2 generates, he/she can override this method.","     * The attribute MUST be a function like this: <b>function(model) {return ...)}</b> and MUST return a {String} value for all models.","     * <u>If you change this method after the scrollview-instance is rendered, you need to call renderView() to make the changes applied.</u>","     *","     * @attribute renderGroupHeader2","     * @type {Function}","     * @default null","     * @since 0.1","     */","    renderGroupHeader2: {","        value: null,","        validator: function(v){ return Lang.isFunction(v) || v === null; },","        setter: '_setRenderGroupHeader2'","    },","","    /**","     * Determines how the rendering of groupHeader3 takes place. The developer may set this method, but can choose not to.","     * If not overriden, renderGroupHeader3 will render the same as the attribute 'groupHeader3' (except that it's a String).","     * If the developer wants content other than groupHeader3 generates, he/she can override this method.","     * The attribute MUST be a function like this: <b>function(model) {return ...)}</b> and MUST return a {String} value for all models.","     * <u>If you change this method after the scrollview-instance is rendered, you need to call renderView() to make the changes applied.</u>","     *","     * @attribute renderGroupHeader3","     * @type {Function}","     * @default null","     * @since 0.1","     */","    renderGroupHeader3: {","        value: null,","        validator: function(v){ return Lang.isFunction(v) || v === null; },","        setter: '_setRenderGroupHeader3'","    }","};","","Y.mix(ITSAScrollViewModelListExtention.prototype, {","","// -- Public Static Properties -------------------------------------------------","","/**"," * Internal list that holds event-references"," * @property _eventhandlers"," * @private"," * @type Array"," */","","    _eventhandlers : [],","    _originalModels : [],","    _selectableModelEvent : null,","    _clickModelEvent : null,","    _mouseenterModelEvent : null,","    _mouseUpModelEvent : null,","    _mouseDownModelEvent : null,","    _mouseleaveModelEvent : null,","    _selectedModels : {},","    _viewNode : null,","    _viewId : null,","    _lastClickedModel : null,","    _abberantModelList : null,","    _setViewFilterInitiated : null,","    _setLastItemOnTopInitiated : null,","    _setGroupHeader1Initiated : null,","    _setGroupHeader2Initiated : null,","    _setGroupHeader3Initiated : null,","    _setRenderGroupHeader1Initiated : null,","    _setRenderGroupHeader2Initiated : null,","    _setRenderGroupHeader3Initiated : null,","    _setRenderModelInitiated : null,","    _setDupComparatorInitiated : null,","    _setNoDupsInitiated : null,","    _rerenderAttributesOnChange : true,","    _moreItemsAvailable : true, // must initially be set true","    _prevLastModelIndex : null,","    _modelListIsLazy : false,","    _prevHeader1 : null,","    _prevHeader2 : null,","    _prevHeader3 : null,","    _even : false,","","    /**","     * Initialisation of the Plugin","     *","     * @method initializer","     * @protected","     * @since 0.1","     */","    initializer : function() {","        var instance = this;","","        instance._viewId = Y.guid();","        instance._eventhandlers.push(","            instance.after(","                'render',","                instance._render,","                instance","            )","        );","    },","","    /**","     * Sets an attribute, but in a way that there will be no rerendering of the view.","     * This is handy if you want to change multplie attributes where you only want the view to be re-rendered after the","     * last attributes is set, instead of every time after eacht attribute-change.","     *","     * @method setWithoutRerender","     * @param {String} name The name of the attribute. If the","     * current value of the attribute is an Object, dot notation can be used","     * to set the value of a property within the object (e.g. <code>set(\"x.y.z\", 5)</code>).","     * @param {Any} value The value to set the attribute to.","     * @param {Object} [opts] Optional data providing the circumstances for the change.","     * @since 0.1","    */","    setWithoutRerender : function(name, val, opts) {","        var instance = this;","","        instance._rerenderAttributesOnChange = false;","        instance.set(name, val, opts);","        instance._rerenderAttributesOnChange = true;","    },","","    /**","     * If the Model/Models has a 'selected-status' in the ScrollView-instance.","     *","     * @method modelIsSelected","     * @param {Y.Model|Array} model Model or Array of Models to be checked. May also be items of a LazyModelList,","     * in which case it might not be a true Model, but an Object.","     * @return {Boolean} whether the Model (or all Models) have a 'selected-status'","     * @since 0.1","    */","    modelIsSelected : function(model) {","        var instance = this,","            selected;","","        if (Lang.isArray(model)) {","            YArray.some(","                model,","                function(onemodel) {","                    selected = instance._selectedModels[instance.getModelAttr(onemodel, 'clientId')];","                    return selected ? false : true;","                }","            );","        }","        else {","            selected = instance._selectedModels[instance.getModelAttr(model, 'clientId')];","        }","        return Lang.isValue(selected);","    },","","    /**","     * Of all the supplied Models: sets the 'selected-status' in the ScrollView-instance to true","     *","     * @method selectModels","     * @param {Y.Model|Array} models Model or Array of Models to be checked. May also be items of a LazyModelList,","     * in which case it might not be a true Model, but an Object.","     * @since 0.1","    */","    selectModels : function(models) {","        var instance = this;","","        if (Lang.isArray(models)) {","            YArray.each(","                models,","                function(model) {","                    instance._selectModel(model, true);","                }","            );","        }","        else {","            instance._selectModel(models, true);","        }","    },","","    /**","     * Of all the supplied Models: sets the 'selected-status' in the ScrollView-instance to true","     *","     * @method unselectModels","     * @param {Y.Model|Array} models Model or Array of Models to be checked","     * @since 0.1","    */","    unselectModels : function(models) {","        var instance = this;","","        if (Lang.isArray(models)) {","            YArray.each(","                models,","                function(model) {","                    instance._selectModel(model, false);","                }","            );","        }","        else {","            instance._selectModel(models, false);","        }","    },","","    /**","     * Of all the selected Models: sets the 'selected-status' in the ScrollView-instance to false","     *","     * @method clearSelectedModels","     * @since 0.1","    */","    clearSelectedModels : function() {","        var instance = this,","            contentBox = instance.get('contentBox');","","        contentBox.all('.'+SVML_SELECTED_CLASS).removeClass(SVML_SELECTED_CLASS);","        instance._selectedModels = {};","    },","","    /**","     * Returns an Array with the Models that have the 'selected-status' in the ScrollView-instance set to true","     *","     * @method getSelectedModels","     * @param {Boolean} original If set to true: the original Models will be returned (unique). If false (or undefined)<br>","     * then -in case of repeated Models (see attribute 'modelConfig')- the subModel (dup or splitted) will be returned. In the","     * latter case, you have full control of the exact item that was selected.","     * @return {Array} Array with all unique Models that are selected. In case of LazyModelList, it might be Objects instead of Models.","     * @since 0.1","     */","    getSelectedModels : function(original) {","        var instance = this,","            selected;","","        if (!original) {","            selected = YObject.values(instance._selectedModels);","        }","        else {","            selected = [];","            YObject.each(","                instance._selectedModels,","                function(model) {","                    // if model.get('clientId') is defined in _originalModels, then it has an originalModel","                    var originalModel = instance._originalModels[instance.getModelAttr(model, 'clientId')];","                    if (!originalModel || (YArray.indexOf(selected, originalModel) === -1)) {","                        selected.push(originalModel || model);","                    }","                }","            );","        }","        return selected;","    },","","    /**","     * Renders the ModelList within _viewNode (which is inside the contentBox of the ScrollView-instance).","     * Call this method, when the ModelList.comapator changes, or when you are using LazyModelList and an item (Model or object) changes.","     * Is called automaticly on 'add', 'remove' and 'reset' events of the (Lazy)ModelList. And in case of ModelList:","     * also on *:change-events of a Model (but only when the Models-position changes or its groupHeaders)","     *","     * @method renderView","     * @since 0.1","     *","    */","    renderView : function() {","        this._renderView();","    },","","    /**","     * Gets an attribute-value from a Model OR object. Depends on the state (Lazy or not).","     * Will always work, whether an Y.ModelList or Y.LazyModelList is attached.","     *","     * @method getModelAttr","     * @param {Y.Model} model the model (or extended class) from which the attribute has to be read.","     * @param {String} name Attribute name or object property path.","     * @return {Any} Attribute value, or `undefined` if the attribute doesn't exist, or 'null' if no model is passed.","     * @since 0.1","     *","    */","    getModelAttr: function(model, name) {","        return model && ((model.get && (Lang.type(model.get) === 'function')) ? model.get(name) : model[name]);","    },","","    /**","     * Sets an attribute-value of a Model OR object. Depends on the state (Lazy or not).","     * Will always work, whether an Y.ModelList or Y.LazyModelList is attached.","     * If you want to be sure the Model fires an attributeChange-event, then set 'revive' true. This way","     * lazy-Models will become true Models and fire an attributeChange-event. When the attibute was lazy before,","     * it will return lazy afterwards.","     *","     * @method setModelAttr","     * @param {Y.Model} model the model (or extended class) from which the attribute has to be read.","     * @param {Boolean} revive Whether to force a lazy-model to revive (when lazy before: will be lazy afterwards)","     * @param {String} name Attribute name or object property path.","     * @param {any} value Value to set.","     * @param {Object} [options] Data to be mixed into the event facade of the `change` event(s) for these attributes.","     * In case of Lazy-Model, this only has effect when 'revive' is true.","     *    @param {Boolean} [options.silent=false] If `true`, no `change` event will be fired.","     * @since 0.1","     *","    */","    setModelAttr: function(model, revive, name, value, options) {","        var instance = this,","            modelIsLazy, modelList;","","        if (model) {","            modelIsLazy = !model.get || (Lang.type(model.get) !== 'function');","            if (modelIsLazy) {","                if (revive) {","                    modelList = instance.get('modelList');","                    if (instance._modelListIsLazy && revive) {","                        modelList.revive(model);","                    }","                    model.set(name, value, options);","                    if (instance._modelListIsLazy && revive) {","                        modelList.free(model);","                    }","                }","                else {","                    model[name] = value;","                }","            }","            else {","                model.set(name, value, options);","            }","        }","    },","","    /**","     * Cleans up bindings and removes plugin","     * @method destructor","     * @protected","     * @since 0.1","    */","    destructor : function() {","        var instance = this,","            modellist = instance.get('modelList');","","        instance._clearEventhandlers();","        modellist.removeTarget(instance);","        if (instance._selectableModelEvent) {","            instance._selectableModelEvent.detach();","        }","        if (instance._clickModelEvent) {","            instance._clickModelEvent.detach();","        }","        if (instance._mouseDownModelEvent) {","            instance._mouseDownModelEvent.detach();","        }","        if (instance._mouseUpModelEvent) {","            instance._mouseUpModelEvent.detach();","        }","        if (instance._mouseenterModelEvent) {","            instance._mouseenterModelEvent.detach();","        }","        if (instance._mouseleaveModelEvent) {","            instance._mouseleaveModelEvent.detach();","        }","        instance._viewNode.destroy(true);","    },","","    //===============================================================================================","    // private methods","    //===============================================================================================","","    /**","     * Does the rendering stuff, is called after the ScrollView-instance itself is rendered.","     *","     * @method _render","     * @private","     * @since 0.1","     *","    */","    _render: function() {","        var instance = this,","            modellist = instance.get('modelList'),","            viewNode;","","        instance._viewNode = viewNode = YNode.create(VIEW_TEMPLATE);","        viewNode.set('id', instance._viewId);","        instance._extraBindUI();","        if (modellist) {","            instance.renderView();","        }","    },","","    /**","     * Binding all events we need to make ModelList work with the ScrollView-instance","     *","     * @method _extraBindUI","     * @private","     * @since 0.1","    */","    _extraBindUI : function() {","        var instance = this,","            boundingBox = instance.get('boundingBox'),","            modellist = instance.get('modelList'),","            eventhandlers = instance._eventhandlers;","","        // making models bubble up to the scrollview-instance:","        if (modellist) {","            modellist.addTarget(instance);","            boundingBox.addClass(SVML_CLASS);","        }","        // If the model gets swapped out, reset events and reset targets accordingly.","        eventhandlers.push(","            instance.after('modelListChange', function (ev) {","                var newmodellist = ev.newVal,","                    prevmodellist = ev.prevVal;","                if (prevmodellist) {","                    prevmodellist.removeTarget(instance);","                }","                if (newmodellist) {","                    newmodellist.addTarget(instance);","                    boundingBox.addClass(SVML_CLASS);","                    instance.renderView();","                }","                else {","                    boundingBox.removeClass(SVML_CLASS);","                    instance.get('contentBox').setHTML('');","                }","            })","        );","        // Re-render the view when a model is added to or removed from the modelList","        // because we made it bubble-up to the scrollview-instance, we attach the listener there.","        eventhandlers.push(","            instance.after('reset', instance._resetView, instance)","        );","        eventhandlers.push(","            instance.after('remove', instance._renderView, instance)","        );","        eventhandlers.push(","            instance.after('add', instance._renderViewCheckAppend, instance)","        );","        eventhandlers.push(","            instance.after('*:change', instance._renderModelOrView, instance)","        );","    },","","    /**","     * Setter for attribute modelList. Stores whether a Y.ModelList, or a Y.LazyModelList is set.","     *","     * @method _setModelList","     * @param {Object} val the new set value for this attribute","     * @private","     * @since 0.1","     *","    */","    _setModelList : function(val) {","        var instance = this;","","        instance._modelListIsLazy = (val instanceof Y.LazyModelList);","    },","","    /**","     * Setter for attribute noDups. Will re-render the view when changed UNLESS it is called from setWithoutRerender().","     *","     * @method _setNoDups","     * @param {Function} val the new set value for this attribute","     * @private","     * @since 0.1","     *","    */","    _setNoDups : function(val) {","        var instance = this;","","        if (instance._setNoDupsInitiated) {","            if (instance._rerenderAttributesOnChange) {","                instance._renderView({noDups: val});","            }","        }","        else {","            instance._setNoDupsInitiated = true;","        }","    },","","    /**","     * Setter for attribute viewFilter. Will re-render the view when changed UNLESS it is called from setWithoutRerender().","     *","     * @method _setViewFilter","     * @param {Function} val the new set value for this attribute","     * @private","     * @since 0.1","     *","    */","    _setViewFilter : function(val) {","        var instance = this;","","        if (instance._setViewFilterInitiated) {","            if (instance._rerenderAttributesOnChange) {","                instance._renderView({viewFilter: val});","            }","        }","        else {","            instance._setViewFilterInitiated = true;","        }","    },","","    /**","     * Setter for attribute lastItemOnTop. Will re-render the view when changed UNLESS it is called from setWithoutRerender().","     *","     * @method _setLastItemOnTop","     * @param {Boolean} val the new set value for this attribute","     * @private","     * @since 0.1","     *","    */","    _setLastItemOnTop : function(val) {","        var instance = this;","","        if (instance._setLastItemOnTopInitiated) {","            if (instance._rerenderAttributesOnChange) {","                instance._renderView({lastItemOnTop: val});","            }","        }","        else {","            instance._setLastItemOnTopInitiated = true;","        }","    },","","","    /**","     * Setter for attribute groupHeader1. Will re-render the view when changed UNLESS it is called from setWithoutRerender().","     *","     * @method _setDupComparator","     * @param {Function} val the new set value for this attribute","     * @private","     * @since 0.1","     *","    */","    _setDupComparator : function(val) {","        var instance = this;","","        if (instance._setDupComparatorInitiated) {","            if (instance._rerenderAttributesOnChange && instance.get('noDups')) {","                instance._renderView({dupComparator: val});","            }","        }","        else {","            instance._setDupComparatorInitiated = true;","        }","    },","","    /**","     * Setter for attribute groupHeader1. Will re-render the view when changed UNLESS it is called from setWithoutRerender().","     *","     * @method _setGroupHeader1","     * @param {Function} val the new set value for this attribute","     * @private","     * @since 0.1","     *","    */","    _setGroupHeader1 : function(val) {","        var instance = this;","","        if (instance._setGroupHeader1Initiated) {","            if (instance._rerenderAttributesOnChange) {","                instance._renderView({groupHeader1: val});","            }","        }","        else {","            instance._setGroupHeader1Initiated = true;","        }","    },","","    /**","     * Setter for attribute groupHeader2. Will re-render the view when changed UNLESS it is called from setWithoutRerender().","     *","     * @method _setGroupHeader2","     * @param {Function} val the new set value for this attribute","     * @private","     * @since 0.1","     *","    */","    _setGroupHeader2 : function(val) {","        var instance = this;","","        if (instance._setGroupHeader2Initiated) {","            if (instance._rerenderAttributesOnChange) {","                instance._renderView({groupHeader2: val});","            }","        }","        else {","            instance._setGroupHeader2Initiated = true;","        }","    },","","    /**","     * Setter for attribute groupHeader3. Will re-render the view when changed UNLESS it is called from setWithoutRerender().","     *","     * @method _setGroupHeader3","     * @param {Function} val the new set value for this attribute","     * @private","     * @since 0.1","     *","    */","    _setGroupHeader3 : function(val) {","        var instance = this;","","        if (instance._setGroupHeader3Initiated) {","            if (instance._rerenderAttributesOnChange) {","                instance._renderView({groupHeader3: val});","            }","        }","        else {","            instance._setGroupHeader3Initiated = true;","        }","    },","","    /**","     * Setter for attribute renderGroupHeader1. Will re-render the view when changed UNLESS it is called from setWithoutRerender().","     *","     * @method _setRenderGroupHeader1","     * @param {Function} val the new set value for this attribute","     * @private","     * @since 0.1","     *","    */","    _setRenderGroupHeader1 : function(val) {","        var instance = this;","","        if (instance._setRenderGroupHeader1Initiated) {","            if (instance._rerenderAttributesOnChange) {","                instance._renderView({renderGroupHeader1: val});","            }","        }","        else {","            instance._setRenderGroupHeader1Initiated = true;","        }","    },","","    /**","     * Setter for attribute renderGroupHeader2. Will re-render the view when changed UNLESS it is called from setWithoutRerender().","     *","     * @method _setRenderGroupHeader2","     * @param {Function} val the new set value for this attribute","     * @private","     * @since 0.1","     *","    */","    _setRenderGroupHeader2 : function(val) {","        var instance = this;","","        if (instance._setRenderGroupHeader2Initiated) {","            if (instance._rerenderAttributesOnChange) {","                instance._renderView({renderGroupHeader2: val});","            }","        }","        else {","            instance._setRenderGroupHeader2Initiated = true;","        }","    },","","    /**","     * Setter for attribute renderGroupHeader3. Will re-render the view when changed UNLESS it is called from setWithoutRerender().","     *","     * @method _setRenderGroupHeader3","     * @param {Function} val the new set value for this attribute","     * @private","     * @since 0.1","     *","    */","    _setRenderGroupHeader3 : function(val) {","        var instance = this;","","        if (instance._setRenderGroupHeader3Initiated) {","            if (instance._rerenderAttributesOnChange) {","                instance._renderView({renderGroupHeader3: val});","            }","        }","        else {","            instance._setRenderGroupHeader3Initiated = true;","        }","    },","","    /**","     * Setter for attribute renderModel. Will re-render the view when changed UNLESS it is called from setWithoutRerender().","     *","     * @method _setRenderModel","     * @param {Function} val the new set value for this attribute","     * @private","     * @since 0.1","     *","    */","    _setRenderModel : function(val) {","        var instance = this;","","        if (instance._setRenderModelInitiated) {","            if (instance._rerenderAttributesOnChange) {","                instance._renderView({renderModel: val});","            }","        }","        else {","            instance._setRenderModelInitiated = true;","        }","    },","","    /**","     * Setter for attribute modelsSelectable. Transforms val into three posible states: null, 'single' and 'multi'","     * Also resets _selectableModelEvent.","     *","     * @method _setModelsSelectable","     * @param {Boolean|String|null} val","     * @private","     * @since 0.1","     *","    */","    _setModelsSelectable : function(val) {","        var instance = this;","","        if ((val==='') || !val) {","            val = null;","        }","        else if (Lang.isBoolean(val)) {","            // val===true","            val = 'multi';","        }","        // At this point, val can have three states: null, 'single' and 'multi'","        instance._setSelectableEvents(val);","        return val;","    },","","    /**","     * Setter for attribute modelListStyled. Adds or removes the class 'itsa-scrollviewmodellist-styled' to the boundingBox.","     *","     * @method _setModelListStyled","     * @param {Boolean} val","     * @private","     * @since 0.1","     *","    */","    _setModelListStyled : function(val) {","        var instance = this;","","        instance.get('boundingBox').toggleClass(SVML_STYLE_CLASS, val);","    },","","    /**","     * Sets or removes selectable click-events when the mouse clicks on a Model.","     *","     * @method _setSelectableEvents","     * @param {Boolean} val","     * @private","     * @since 0.1","     *","    */","    _setSelectableEvents : function(val) {","        var instance = this,","            contentBox = instance.get('contentBox');","","        instance.clearSelectedModels();","        if (val && !instance._selectableModelEvent) {","            instance._selectableModelEvent = contentBox.delegate(","                'click',","                Y.rbind(instance._handleModelSelectionChange, instance),","                function() {","                    // Only handle click-event when there was motion less than 'clickSensivity' pixels","                    var scrollingInAction = (Math.abs(instance.lastScrolledAmt) > instance.get('clickSensivity'));","                    return (!scrollingInAction && this.hasClass(MODEL_CLASS));","                }","            );","        }","        else if (!val && instance._selectableModelEvent) {","            instance._selectableModelEvent.detach();","            instance._selectableModelEvent = null;","        }","    },","","    /**","     * Sets or removes click-events when the mouse clicks on a Model.","     *","     * @method _setClickEvents","     * @param {Boolean} val","     * @private","     * @since 0.1","     *","    */","    _setClickEvents : function(val) {","        var instance = this,","            contentBox = instance.get('contentBox');","","        if (val && !instance._clickModelEvent) {","            /**","             * Is fired when the user positions the mouse over a Model.","             *","             * @event modelClick","             * @param {Y.Node} node the node that was clicked.","             * @param {Y.Model} model the model that was bound to the node.","             * @since 0.1","            **/","            instance._clickModelEvent = contentBox.delegate(","                'click',","                function(e) {","                    var node = e.currentTarget,","                        modelList = instance.get('modelList'),","                        modelClientId = node.getData('modelClientId'),","                        model = modelList && modelList.getByClientId(modelClientId);","                    instance.fire('modelClick', {node: node, model: model});","                },","                function() {","                    // Only handle click-event when there was motion less than 'clickSensivity' pixels","                    var scrollingInAction = (Math.abs(instance.lastScrolledAmt) > instance.get('clickSensivity'));","                    return (!scrollingInAction && this.hasClass(MODEL_CLASS));","                }","            );","        }","        else if (!val && instance._clickModelEvent) {","            instance._clickModelEvent.detach();","            instance._clickModelEvent = null;","        }","    },","","    /**","     * Sets or removes mousedown- and mouseup-events when the mouse goes down/up on a Model.","     *","     * @method _setMouseDownUpEvents","     * @param {Boolean} val","     * @private","     * @since 0.1","     *","    */","    _setMouseDownUpEvents : function(val) {","        var instance = this,","            contentBox = instance.get('contentBox');","","","        if (val && !instance._mouseDownModelEvent) {","            /**","             * Is fired when the user positions the mouse over a Model.","             *","             * @event modelMouseDown","             * @param {Y.Node} node the node where the mousedown occurs.","             * @param {Y.Model} model the model that was bound to the node.","             * @since 0.1","            **/","            instance._mouseDownModelEvent = contentBox.delegate(","                'mousedown',","                function(e) {","                    var node = e.currentTarget,","                        modelList = instance.get('modelList'),","                        modelClientId = node.getData('modelClientId'),","                        model = modelList && modelList.getByClientId(modelClientId);","                    instance.fire('modelMouseDown', {node: node, model: model});","                },","                '.' + MODEL_CLASS","            );","        }","        else if (!val && instance._mouseDownModelEvent) {","            instance._mouseDownModelEvent.detach();","            instance._mouseDownModelEvent = null;","        }","        if (val && !instance._mouseUpModelEvent) {","            /**","             * Is fired when the user positions the mouse over a Model.","             *","             * @event modelMouseUp","             * @param {Y.Node} node the node where the mouseup occurs.","             * @param {Y.Model} model the model that was bound to the node.","             * @since 0.1","            **/","            instance._mouseUpModelEvent = contentBox.delegate(","                'mouseup',","                function(e) {","                    var node = e.currentTarget,","                        modelList = instance.get('modelList'),","                        modelClientId = node.getData('modelClientId'),","                        model = modelList && modelList.getByClientId(modelClientId);","                    instance.fire('modelMouseUp', {node: node, model: model});","                },","                '.' + MODEL_CLASS","            );","        }","        else if (!val && instance._mouseUpModelEvent) {","            instance._mouseUpModelEvent.detach();","            instance._mouseUpModelEvent = null;","        }","    },","","    /**","     * Sets or removes mouseenter and mouseleave events when the mouse gets over the Models.","     *","     * @method _setHoverEvents","     * @param {Boolean} val","     * @private","     * @since 0.1","     *","    */","    _setHoverEvents : function(val) {","        var instance = this,","            contentBox = instance.get('contentBox');","","        if (val && !instance._mouseenterModelEvent) {","            /**","             * Is fired when the user positions the mouse over a Model.","             *","             * @event modelMouseEnter","             * @param {Y.Node} node the node on which the mouse entered.","             * @param {Y.Model} model the model that was bound to the node.","             * @since 0.1","            **/","            instance._mouseenterModelEvent = contentBox.delegate(","                'mouseenter',","                function(e) {","                    var node = e.currentTarget,","                        modelList = instance.get('modelList'),","                        modelClientId = node.getData('modelClientId'),","                        model = modelList && modelList.getByClientId(modelClientId);","                    instance.fire('modelMouseEnter', {node: node, model: model});","                },","                '.'+MODEL_CLASS","            );","        }","        else if (!val && instance._mouseenterModelEvent) {","            instance._mouseenterModelEvent.detach();","            instance._mouseenterModelEvent = null;","        }","        if (val && !instance._mouseleaveModelEvent) {","            /**","             * Is fired when the user positions the mouse outside a Model.","             *","             * @event modelMouseLeave","             * @param {Y.Node} node the node on which the mouse moved outwards off.","             * @param {Y.Model} model the model that was bound to the node.","             * @since 0.1","            **/","            instance._mouseleaveModelEvent = contentBox.delegate(","                'mouseleave',","                function(e) {","                    var node = e.currentTarget,","                        modelList = instance.get('modelList'),","                        modelClientId = node.getData('modelClientId'),","                        model = modelList && modelList.getByClientId(modelClientId);","                    instance.fire('modelMouseLeave', {node: node, model: model});","                },","                '.'+MODEL_CLASS","            );","        }","        else if (!val && instance._mouseleaveModelEvent) {","            instance._mouseleaveModelEvent.detach();","            instance._mouseleaveModelEvent = null;","        }","    },","","    /**","     * Updates the styles of the selected Models and fires a 'modelSelectionChange'-event.","     *","     * @method _handleModelSelectionChange","     * @param {eventTarget} [e] The eventTarget after a selectionChange","     * @private","     * @since 0.1","     */","    _handleModelSelectionChange : function(e) {","        var instance = this,","            modelNode = e.currentTarget,","            // first check _abberantModelList --> this might be available and it will overrule this.get('modelList')","            modelList = instance._abberantModelList || instance.get('modelList'),","            modelClientId = modelNode.getData('modelClientId'),","","            model = modelList && modelList.getByClientId(modelClientId),","","            modelsSelectable = instance.get('modelsSelectable'),","            singleSelectable = (modelsSelectable==='single'),","            shiftClick = e.shiftKey && !singleSelectable,","            ctrlClick = (e.metaKey || e.ctrlKey),","            viewFilter = instance.get('viewFilter'),","            modelPrevSelected, multipleModels, newModelIndex, prevModelIndex, startIndex, endIndex, i, nextModel;","","        modelPrevSelected = model && instance.modelIsSelected(model);","        // At this stage, 'modelsSelectable' is either 'single' or 'multi'","        if (singleSelectable || !ctrlClick) {","            instance.clearSelectedModels();","        }","        if (model) {","            if (shiftClick && instance._lastClickedModel) {","                multipleModels = [];","                newModelIndex = modelList.indexOf(model);","                prevModelIndex = modelList.indexOf(instance._lastClickedModel);","                startIndex = Math.min(newModelIndex, prevModelIndex);","                endIndex = Math.max(newModelIndex, prevModelIndex);","                for (i=startIndex; i<=endIndex; i++) {","                    nextModel = modelList.item(i);","                    if (!viewFilter || viewFilter(nextModel)) {","                        multipleModels.push(nextModel);","                    }","                }","                instance.selectModels(multipleModels);","            }","            else {","                if (modelPrevSelected) {","                    instance.unselectModels(model);","                }","                else {","                    instance.selectModels(model);","                }","                // store model because we need to know which model received the last click","                // We need to know in case of a future shift-click","                instance._lastClickedModel = modelPrevSelected ? null : model;","            }","            e.currentTarget.focus();","        }","        instance._fireSelectedModels();","    },","","    /**","     * Renders the ModelList within _viewNode (which is inside the contentBox of the ScrollView-instance).","     * Does not need to be called standalone, because eventlisteners will sync automaticly on ModelList-changes.","     *","     * @method _renderView","     * @param {Object} [setterAtrs] Definition of fields which called this method internally. Only for internal use within some attribute-setters.","     * @param {Boolean} [forceRebuild] Forces the list to be cleared and rebuild from the ground up.","     * @private","     * @since 0.1","     *","    */","    _renderView : function(setterAtrs, forceRebuild) {","        var instance = this,","            viewNode = instance._viewNode,","            contentBox = instance.get('contentBox'),","            modelList = instance.get('modelList'),","            firstModel = modelList && (modelList.size()>0) && modelList.item(0),","            noDups = (setterAtrs && setterAtrs.noDups) || instance.get('noDups'),","            dupComparator = (setterAtrs && setterAtrs.dupComparator) || instance.get('dupComparator'),","            viewFilter = (setterAtrs && setterAtrs.viewFilter) || instance.get('viewFilter'),","            renderModel = (setterAtrs && setterAtrs.renderModel) || instance.get('renderModel'),","            groupHeader1Func = (setterAtrs && setterAtrs.groupHeader1) || instance.get('groupHeader1'),","            groupHeader2Func = (setterAtrs && setterAtrs.groupHeader2) || instance.get('groupHeader2'),","            groupHeader3Func = (setterAtrs && setterAtrs.groupHeader3) || instance.get('groupHeader3'),","            renderGroupHeader1 = (setterAtrs && setterAtrs.renderGroupHeader1) || instance.get('renderGroupHeader1') || groupHeader1Func,","            renderGroupHeader2 = (setterAtrs && setterAtrs.renderGroupHeader2) || instance.get('renderGroupHeader2') || groupHeader2Func,","            renderGroupHeader3 = (setterAtrs && setterAtrs.renderGroupHeader3) || instance.get('renderGroupHeader3') || groupHeader3Func,","            lastItemOnTop = (setterAtrs && setterAtrs.lastItemOnTop) || instance.get('lastItemOnTop'),","            activeGroupHeader1 = firstModel && groupHeader1Func && Lang.isValue(groupHeader1Func(firstModel)),","            activeGroupHeader2 = firstModel && groupHeader2Func && Lang.isValue(groupHeader2Func(firstModel)),","            activeGroupHeader3 = firstModel && groupHeader3Func && Lang.isValue(groupHeader3Func(firstModel)),","            infiniteView = instance.hasPlugin('itssvinfinite'),","            header1, header2, header3, modelConfig, modelNode,","            axis, xAxis, yAxis, boundingBox, viewsize, elementsize, lastModelNode, offsetDirection, renderedModel, prevRenderedModel,","            modelClientId, headerNode, i, model, modelListItems, batchSize, items, modelListItemsLength, dupAvailable;","","        dupAvailable = function(model) {","            var dupFound = false,","                modelComp = dupComparator(model);","            YArray.some(","                modelListItems,","                function(checkModel) {","                    if (checkModel===model) {return true;}","                    dupFound = (dupComparator(checkModel)===modelComp);","                    return dupFound;","                }","            );","            return dupFound;","        };","        if (!contentBox.one('#'+instance._viewId)) {","            contentBox.setHTML(viewNode);","            instance._set('srcNode', contentBox);","        }","        // if it finds out there is a 'modelconfig'-attribute, then we need to make extra steps:","        // we do not render the standard 'modelList', but we create a second modellist that might have more models: these","        // will be the models that are repeated due to a count-value or an enddate when duplicateWhenDurationCrossesMultipleDays is true.","        modelListItems = modelList._items.concat();","        modelListItemsLength = modelListItems.length;","        if (!infiniteView || forceRebuild) {","            viewNode.setHTML('');","            i = 0;","            batchSize = modelListItemsLength;","            instance._prevHeader1 = null;","            instance._prevHeader2 = null;","            instance._prevHeader3 = null;","            instance._even = false;","        }","        else {","            i = (instance._prevLastModelIndex || -1) + 1;","            batchSize = Math.min(instance.itssvinfinite.get('batchSize'), modelListItemsLength);","        }","        if (instance._generateAbberantModelList) {","            modelConfig = (setterAtrs && setterAtrs.modelConfig) || instance.get('modelConfig');","            if (modelConfig && modelConfig.date && (modelConfig.enddate || modelConfig.count)) {","                instance._generateAbberantModelList(infiniteView, forceRebuild);","                modelList = instance._abberantModelList;","                // reset next 2 items","                modelListItems = modelList._items.concat();","                modelListItemsLength = modelListItems.length;","            }","            else {","                // clear _abberantModelList to make sure in other methods the actual modelList (from attribute) will be used.","                instance._abberantModelList = null;","            }","        }","        else {","            // clear _abberantModelList to make sure in other methods the actual modelList (from attribute) will be used.","            instance._abberantModelList = null;","        }","        items = 0;","        while ((items<batchSize) && (i<modelListItemsLength)) {","            model = modelListItems[i];","            modelClientId = instance.getModelAttr(model, 'clientId');","            if ((!viewFilter || viewFilter(model)) &&","                (!noDups ||","                (!dupComparator && ((renderedModel = renderModel(model))!==prevRenderedModel)) ||","                (dupComparator && !dupAvailable(model)))","               ) {","                items++;","                modelNode = YNode.create(VIEW_MODEL_TEMPLATE);","                if (activeGroupHeader1) {","                    header1 = groupHeader1Func(model);","                    if (header1!==instance._prevHeader1) {","                        headerNode = YNode.create(VIEW_MODEL_TEMPLATE),","                        headerNode.addClass(GROUPHEADER_CLASS);","                        headerNode.addClass(GROUPHEADER1_CLASS);","                        if (instance._prevHeader1) {","                            headerNode.addClass(GROUPHEADER_SEQUEL_CLASS);","                        }","                        headerNode.setHTML(renderGroupHeader1(model));","                        viewNode.append(headerNode);","                        instance._prevHeader1 = header1;","                        instance._even = false;","                        // force to make a header2 insertion (when apriopriate)","                        instance._prevHeader2 = null;","                    }","                }","                if (activeGroupHeader2) {","                    header2 = groupHeader2Func(model);","                    if (header2!==instance._prevHeader2) {","                        headerNode = YNode.create(VIEW_MODEL_TEMPLATE),","                        headerNode.addClass(GROUPHEADER_CLASS);","                        headerNode.addClass(GROUPHEADER2_CLASS);","                        if (instance._prevHeader2) {","                            headerNode.addClass(GROUPHEADER_SEQUEL_CLASS);","                        }","                        headerNode.setHTML(renderGroupHeader2(model));","                        viewNode.append(headerNode);","                        instance._prevHeader2 = header2;","                        instance._even = false;","                        // force to make a header3 insertion (when apriopriate)","                        instance._prevHeader3 = null;","                    }","                }","                if (activeGroupHeader3) {","                    header3 = groupHeader3Func(model);","                    if (header3!==instance._prevHeader3) {","                        headerNode = YNode.create(VIEW_MODEL_TEMPLATE),","                        headerNode.addClass(GROUPHEADER_CLASS);","                        headerNode.addClass(GROUPHEADER3_CLASS);","                        if (instance._prevHeader3) {","                            headerNode.addClass(GROUPHEADER_SEQUEL_CLASS);","                        }","                        headerNode.setHTML(renderGroupHeader3(model));","                        viewNode.append(headerNode);","                        instance._prevHeader3 = header3;","                        instance._even = false;","                    }","                }","                modelNode.setData('modelClientId', modelClientId);","                modelNode.addClass(MODEL_CLASS);","                modelNode.addClass(modelClientId);","                modelNode.addClass(instance._even ? SVML_EVEN_CLASS : SVML_ODD_CLASS);","                modelNode.setHTML(renderedModel || renderModel(model));","                viewNode.append(modelNode);","                instance._even = !instance._even;","                if (noDups && !dupComparator) {","                    prevRenderedModel = renderedModel;","                }","            }","            i++;","        }","        // _prevLastModelIndex is needed by the plugin infinitescroll","        instance._prevLastModelIndex = i - 1;","        if (modelNode && lastItemOnTop && (!infiniteView || !instance._moreItemsAvailable)) {","            // need to add an extra empty LI-element that has the size of the view minus the last element","            // modelNode is the reference to the last element","            lastModelNode = modelNode;","            axis = instance.get('axis');","            xAxis = axis.x;","            yAxis = axis.y;","            boundingBox = instance.get('boundingBox'),","            modelNode = YNode.create(VIEW_EMPTY_ELEMENT_TEMPLATE),","            modelNode.addClass(EMPTY_ELEMENT_CLASS);","            offsetDirection = xAxis ? 'offsetWidth' : 'offsetHeight';","            viewsize = boundingBox.get(offsetDirection);","            elementsize = viewsize - lastModelNode.get(offsetDirection);","            lastModelNode = lastModelNode.previous();","            while (lastModelNode && lastModelNode.hasClass(GROUPHEADER_CLASS)) {","                // also decrease with the size of this LI-element","                elementsize -= lastModelNode.get(offsetDirection);","                lastModelNode = lastModelNode.previous();","            }","            modelNode.setStyle((xAxis ? 'width' : 'height'), elementsize+'px');","            if (elementsize>0) {","                viewNode.append(modelNode);","            }","        }","        // always syncUI() --> making scrollview 'know' how large the scrollable contentbox is","        instance.syncUI();","        if (infiniteView) {","            instance.itssvinfinite._checkExpansion();","        }","        /**","         * Fire an event, so that anyone who is terested in this point can hook in.","         *","         * @event modelListRender","         * @since 0.1","        **/","        instance.fire('modelListRender');","    },","","    /**","     * Re-renders the ModelList within _viewNode and forces a complete new rebuild.","     *","     * @method _resetView","     * @private","     * @since 0.1","     *","    */","    _resetView : function() {","        this._resetView(null, true);","    },","","","    /**","     * Will render the view, but first checks whether the current View needs to be cleared, oor the new models need to be appended.","     * This module will assume ONLY to append if <i>ITSAScrollViewInifiniteScroll</i> is pluged in.","     *","     * @method _renderViewCheckAppend","     * @param {EventTarget} e","     * @private","     * @since 0.1","     *","    */","    _renderViewCheckAppend : function(e) {","        var instance = this,","            append = instance.hasPlugin('itssvinfinite');","","        instance._renderView(null, append);","    },","","    /**","     * Checks if there is a need to re-render the _viewNode whenever the data of one of the models in the modellist changes.","     * In case the position of the Model doesn't change, we can just rerender the Model. Otherwise rerender the whole _viewNode","     *","     * @method _renderModelOrView","     * @param {EventTarget} e","     * @private","     * @since 0.1","     *","    */","    _renderModelOrView : function(e) {","        var instance = this,","            modellist = instance.get('modelList');","","        instance._renderView();","    },","","    /**","     * Of this Model: sets the 'selected-status' in the ScrollView-instance to true","     *","     * @method _selectModel","     * @param {Y.Model|Array} model Model or Array of Models to be checked","     * @param {Boolean} selectstatus whether the new status is true or false","     * @private","     * @since 0.1","    */","    _selectModel : function(model, selectstatus) {","        var instance = this,","            modelid = instance.getModelAttr(model, 'clientId'),","            contentBox = instance.get('contentBox'),","            modelnodes;","","        if (modelid) {","            // each modelid-class should be prenet only once","            modelnodes = contentBox.one('.'+modelid);","            if (modelnodes) {","                modelnodes.toggleClass(SVML_SELECTED_CLASS, selectstatus);","            }","            if (selectstatus) {","                instance._selectedModels[modelid] = model;","            }","            else {","                delete instance._selectedModels[modelid];","            }","        }","        else {","        }","    },","","    /**","     * A utility method that fires the selected Models.","     *","     * @method _fireSelectedModels","     * @private","     * @since 0.1","     */","    _fireSelectedModels : function () {","        var instance = this,","            selectedModels, originalModels;","","        /**","         * Is fired when the user changes the modelselection. In case multiple Models are selected and the same Model is","         * more than once (in case of repeating Models), the Model is only once in the resultarray.","         * Meaning: only original unique Models are returned.","         *","         * @event modelSelectionChange","         * @param {Array} newModelSelection contains [Model] with all modelList's Models that are selected:<br>","         * -in case of repeated Models (see attribute 'modelConfig')- the subModel (dup or splitted) will be returned.","         * @param {Array} originalModelSelection contains [Model] with all modelList's unique original Models that are selected.","         * @since 0.1","        **/","        selectedModels = instance.getSelectedModels();","        originalModels = instance._abberantModelList ? instance.getSelectedModels(true) : selectedModels;","        instance.fire(","            'modelSelectionChange',","            {","                newModelSelection: selectedModels,","                originalModelSelection: originalModels","            }","        );","    },","","    /**","     * Cleaning up all eventlisteners","     *","     * @method _clearEventhandlers","     * @private","     * @since 0.1","     *","    */","    _clearEventhandlers : function() {","        YArray.each(","            this._eventhandlers,","            function(item){","                item.detach();","            }","        );","    }","","}, true);","","Y.ScrollView.ITSAScrollViewModelListExtention = ITSAScrollViewModelListExtention;","","Y.Base.mix(Y.ScrollView, [ITSAScrollViewModelListExtention]);","","}, '@VERSION@', {","    \"requires\": [","        \"base-build\",","        \"node-base\",","        \"node-event-delegate\",","        \"pluginhost-base\",","        \"event-mouseenter\",","        \"event-custom\",","        \"model\",","        \"model-list\",","        \"lazy-model-list\"","    ],","    \"skinnable\": true","});"];
_yuitest_coverage["build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js"].lines = {"1":0,"3":0,"25":0,"48":0,"50":0,"64":0,"86":0,"89":0,"90":0,"91":0,"92":0,"93":0,"94":0,"95":0,"96":0,"99":0,"103":0,"107":0,"114":0,"116":0,"120":0,"122":0,"135":0,"153":0,"171":0,"189":0,"211":0,"231":0,"249":0,"267":0,"283":0,"297":0,"314":0,"331":0,"348":0,"365":0,"367":0,"387":0,"405":0,"423":0,"441":0,"446":0,"498":0,"500":0,"501":0,"524":0,"526":0,"527":0,"528":0,"541":0,"544":0,"545":0,"548":0,"549":0,"554":0,"556":0,"568":0,"570":0,"571":0,"574":0,"579":0,"591":0,"593":0,"594":0,"597":0,"602":0,"613":0,"616":0,"617":0,"631":0,"634":0,"635":0,"638":0,"639":0,"643":0,"644":0,"645":0,"650":0,"664":0,"679":0,"701":0,"704":0,"705":0,"706":0,"707":0,"708":0,"709":0,"710":0,"712":0,"713":0,"714":0,"718":0,"722":0,"734":0,"737":0,"738":0,"739":0,"740":0,"742":0,"743":0,"745":0,"746":0,"748":0,"749":0,"751":0,"752":0,"754":0,"755":0,"757":0,"773":0,"777":0,"778":0,"779":0,"780":0,"781":0,"793":0,"799":0,"800":0,"801":0,"804":0,"806":0,"808":0,"809":0,"811":0,"812":0,"813":0,"814":0,"817":0,"818":0,"824":0,"827":0,"830":0,"833":0,"848":0,"850":0,"863":0,"865":0,"866":0,"867":0,"871":0,"885":0,"887":0,"888":0,"889":0,"893":0,"907":0,"909":0,"910":0,"911":0,"915":0,"930":0,"932":0,"933":0,"934":0,"938":0,"952":0,"954":0,"955":0,"956":0,"960":0,"974":0,"976":0,"977":0,"978":0,"982":0,"996":0,"998":0,"999":0,"1000":0,"1004":0,"1018":0,"1020":0,"1021":0,"1022":0,"1026":0,"1040":0,"1042":0,"1043":0,"1044":0,"1048":0,"1062":0,"1064":0,"1065":0,"1066":0,"1070":0,"1084":0,"1086":0,"1087":0,"1088":0,"1092":0,"1107":0,"1109":0,"1110":0,"1112":0,"1114":0,"1117":0,"1118":0,"1131":0,"1133":0,"1146":0,"1149":0,"1150":0,"1151":0,"1156":0,"1157":0,"1161":0,"1162":0,"1163":0,"1177":0,"1180":0,"1189":0,"1192":0,"1196":0,"1200":0,"1201":0,"1205":0,"1206":0,"1207":0,"1221":0,"1225":0,"1234":0,"1237":0,"1241":0,"1246":0,"1247":0,"1248":0,"1250":0,"1259":0,"1262":0,"1266":0,"1271":0,"1272":0,"1273":0,"1287":0,"1290":0,"1299":0,"1302":0,"1306":0,"1311":0,"1312":0,"1313":0,"1315":0,"1324":0,"1327":0,"1331":0,"1336":0,"1337":0,"1338":0,"1351":0,"1366":0,"1368":0,"1369":0,"1371":0,"1372":0,"1373":0,"1374":0,"1375":0,"1376":0,"1377":0,"1378":0,"1379":0,"1380":0,"1381":0,"1384":0,"1387":0,"1388":0,"1391":0,"1395":0,"1397":0,"1399":0,"1414":0,"1438":0,"1439":0,"1441":0,"1444":0,"1445":0,"1446":0,"1449":0,"1451":0,"1452":0,"1453":0,"1458":0,"1459":0,"1460":0,"1461":0,"1462":0,"1463":0,"1464":0,"1465":0,"1466":0,"1467":0,"1470":0,"1471":0,"1473":0,"1474":0,"1475":0,"1476":0,"1477":0,"1479":0,"1480":0,"1484":0,"1489":0,"1491":0,"1492":0,"1493":0,"1494":0,"1495":0,"1500":0,"1501":0,"1502":0,"1503":0,"1504":0,"1505":0,"1507":0,"1508":0,"1509":0,"1511":0,"1512":0,"1513":0,"1514":0,"1516":0,"1519":0,"1520":0,"1521":0,"1522":0,"1524":0,"1525":0,"1526":0,"1528":0,"1529":0,"1530":0,"1531":0,"1533":0,"1536":0,"1537":0,"1538":0,"1539":0,"1541":0,"1542":0,"1543":0,"1545":0,"1546":0,"1547":0,"1548":0,"1551":0,"1552":0,"1553":0,"1554":0,"1555":0,"1556":0,"1557":0,"1558":0,"1559":0,"1562":0,"1565":0,"1566":0,"1569":0,"1570":0,"1571":0,"1572":0,"1573":0,"1576":0,"1577":0,"1578":0,"1579":0,"1580":0,"1582":0,"1583":0,"1585":0,"1586":0,"1587":0,"1591":0,"1592":0,"1593":0,"1601":0,"1613":0,"1628":0,"1631":0,"1645":0,"1648":0,"1661":0,"1666":0,"1668":0,"1669":0,"1670":0,"1672":0,"1673":0,"1676":0,"1691":0,"1705":0,"1706":0,"1707":0,"1725":0,"1728":0,"1735":0,"1737":0};
_yuitest_coverage["build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js"].functions = {"ITSALazyModelListAttrExtention:48":0,"getModelAttr:63":0,"setModelAttr:85":0,"ITSAScrollViewModelListExtention:120":0,"validator:135":0,"validator:153":0,"validator:171":0,"validator:188":0,"validator:210":0,"validator:230":0,"validator:249":0,"validator:267":0,"validator:283":0,"validator:297":0,"validator:314":0,"validator:331":0,"validator:348":0,"value:364":0,"validator:367":0,"validator:387":0,"validator:405":0,"validator:423":0,"validator:441":0,"initializer:497":0,"setWithoutRerender:523":0,"(anonymous 2):547":0,"modelIsSelected:540":0,"(anonymous 3):573":0,"selectModels:567":0,"(anonymous 4):596":0,"unselectModels:590":0,"clearSelectedModels:612":0,"(anonymous 5):641":0,"getSelectedModels:630":0,"renderView:663":0,"getModelAttr:678":0,"setModelAttr:700":0,"destructor:733":0,"_render:772":0,"(anonymous 6):805":0,"_extraBindUI:792":0,"_setModelList:847":0,"_setNoDups:862":0,"_setViewFilter:884":0,"_setLastItemOnTop:906":0,"_setDupComparator:929":0,"_setGroupHeader1:951":0,"_setGroupHeader2:973":0,"_setGroupHeader3:995":0,"_setRenderGroupHeader1:1017":0,"_setRenderGroupHeader2:1039":0,"_setRenderGroupHeader3:1061":0,"_setRenderModel:1083":0,"_setModelsSelectable:1106":0,"_setModelListStyled:1130":0,"(anonymous 7):1154":0,"_setSelectableEvents:1145":0,"(anonymous 8):1191":0,"(anonymous 9):1198":0,"_setClickEvents:1176":0,"(anonymous 10):1236":0,"(anonymous 11):1261":0,"_setMouseDownUpEvents:1220":0,"(anonymous 12):1301":0,"(anonymous 13):1326":0,"_setHoverEvents:1286":0,"_handleModelSelectionChange:1350":0,"(anonymous 14):1443":0,"dupAvailable:1438":0,"_renderView:1413":0,"_resetView:1612":0,"_renderViewCheckAppend:1627":0,"_renderModelOrView:1644":0,"_selectModel:1660":0,"_fireSelectedModels:1690":0,"(anonymous 15):1727":0,"_clearEventhandlers:1724":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js"].coveredLines = 396;
_yuitest_coverage["build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js"].coveredFunctions = 78;
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
    SVML_SELECTED_CLASS = MODEL_CLASS + '-selected',
    SVML_EVEN_CLASS = MODEL_CLASS + '-even',
    SVML_ODD_CLASS = MODEL_CLASS + '-odd',
    SVML_STYLE_CLASS = SVML_CLASS + '-styled',
    GROUPHEADER_CLASS = SVML_CLASS + '-groupheader',
    GROUPHEADER1_CLASS = SVML_CLASS + '-groupheader1',
    GROUPHEADER2_CLASS = SVML_CLASS + '-groupheader2',
    GROUPHEADER3_CLASS = SVML_CLASS + '-groupheader3',
    GROUPHEADER_SEQUEL_CLASS = SVML_CLASS + '-sequelgroupheader';


// -- First: extend Y.LazyModelList with 2 sugar methods for set- and get- attributes --------------------------

_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 48);
function ITSALazyModelListAttrExtention() {}

_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 50);
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
        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "getModelAttr", 63);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 64);
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
        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "setModelAttr", 85);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 86);
var instance = this,
            modelIsLazy;

        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 89);
if (model) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 90);
modelIsLazy = !model.get || (Lang.type(model.get) !== 'function');
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 91);
if (modelIsLazy) {
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 92);
if (revive) {
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 93);
if (revive) {
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 94);
instance.revive(model);
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 95);
model.set(name, value, options);
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 96);
instance.free(model);
                    }
                    else {
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 99);
model.set(name, value, options);
                    }
                }
                else {
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 103);
model[name] = value;
                }
            }
            else {
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 107);
model.set(name, value, options);
            }
        }
    }

}, true);

_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 114);
Y.LazyModelList.ITSALazyModelListAttrExtention = ITSALazyModelListAttrExtention;

_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 116);
Y.Base.mix(Y.LazyModelList, [ITSALazyModelListAttrExtention]);

// -- Mixing extra Methods to Y.ScrollView -----------------------------------

_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 120);
function ITSAScrollViewModelListExtention() {}

_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 122);
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
        validator: function(v){ _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "validator", 135);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 135);
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
        validator: function(v){ _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "validator", 153);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 153);
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
        validator: function(v){ _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "validator", 171);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 171);
return Lang.isFunction(v) || v === null; },
        setter: '_setViewFilter'
    },

   /**
    * Whether the Models can be selected (resulting in a 'modelSelectionChange'-event)
    * Posible values are: <b>null</b>, <b>''</b>, <b>true</b>, <b>false</b>, <b>single</b>, <b>multi</b>
    * The value true equals 'multi'
    *
    * @default true
    * @attribute modelsSelectable
    * @type {Boolean|String|null}
    * @since 0.1
    */
    modelsSelectable: {
        value: null,
        lazyAdd: false,
        validator:  function(v) {
            _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "validator", 188);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 189);
return ((v==='') || (v===null) || (v===true) || (v===false) || (v==='single') || (v==='multi'));
        },
        setter: '_setModelsSelectable'
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
            _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "validator", 210);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 211);
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
            _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "validator", 230);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 231);
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
        validator: function(v) {_yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "validator", 249);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 249);
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
        validator: function(v) {_yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "validator", 267);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 267);
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
        validator: function(v) {_yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "validator", 283);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 283);
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
        validator: function(v){ _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "validator", 297);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 297);
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
        validator: function(v){ _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "validator", 314);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 314);
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
        validator: function(v){ _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "validator", 331);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 331);
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
        validator: function(v){ _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "validator", 348);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 348);
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
            _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "value", 364);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 365);
return this.getModelAttr(model, 'clientId'); // default, so that there always is content. Best to be overwritten.
        },
        validator: function(v){ _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "validator", 367);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 367);
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
        validator: function(v){ _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "validator", 387);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 387);
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
        validator: function(v){ _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "validator", 405);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 405);
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
        validator: function(v){ _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "validator", 423);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 423);
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
        validator: function(v){ _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "validator", 441);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 441);
return Lang.isFunction(v) || v === null; },
        setter: '_setRenderGroupHeader3'
    }
};

_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 446);
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
        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "initializer", 497);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 498);
var instance = this;

        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 500);
instance._viewId = Y.guid();
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 501);
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
        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "setWithoutRerender", 523);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 524);
var instance = this;

        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 526);
instance._rerenderAttributesOnChange = false;
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 527);
instance.set(name, val, opts);
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 528);
instance._rerenderAttributesOnChange = true;
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
        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "modelIsSelected", 540);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 541);
var instance = this,
            selected;

        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 544);
if (Lang.isArray(model)) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 545);
YArray.some(
                model,
                function(onemodel) {
                    _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "(anonymous 2)", 547);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 548);
selected = instance._selectedModels[instance.getModelAttr(onemodel, 'clientId')];
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 549);
return selected ? false : true;
                }
            );
        }
        else {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 554);
selected = instance._selectedModels[instance.getModelAttr(model, 'clientId')];
        }
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 556);
return Lang.isValue(selected);
    },

    /**
     * Of all the supplied Models: sets the 'selected-status' in the ScrollView-instance to true
     *
     * @method selectModels
     * @param {Y.Model|Array} models Model or Array of Models to be checked. May also be items of a LazyModelList,
     * in which case it might not be a true Model, but an Object.
     * @since 0.1
    */
    selectModels : function(models) {
        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "selectModels", 567);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 568);
var instance = this;

        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 570);
if (Lang.isArray(models)) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 571);
YArray.each(
                models,
                function(model) {
                    _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "(anonymous 3)", 573);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 574);
instance._selectModel(model, true);
                }
            );
        }
        else {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 579);
instance._selectModel(models, true);
        }
    },

    /**
     * Of all the supplied Models: sets the 'selected-status' in the ScrollView-instance to true
     *
     * @method unselectModels
     * @param {Y.Model|Array} models Model or Array of Models to be checked
     * @since 0.1
    */
    unselectModels : function(models) {
        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "unselectModels", 590);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 591);
var instance = this;

        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 593);
if (Lang.isArray(models)) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 594);
YArray.each(
                models,
                function(model) {
                    _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "(anonymous 4)", 596);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 597);
instance._selectModel(model, false);
                }
            );
        }
        else {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 602);
instance._selectModel(models, false);
        }
    },

    /**
     * Of all the selected Models: sets the 'selected-status' in the ScrollView-instance to false
     *
     * @method clearSelectedModels
     * @since 0.1
    */
    clearSelectedModels : function() {
        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "clearSelectedModels", 612);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 613);
var instance = this,
            contentBox = instance.get('contentBox');

        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 616);
contentBox.all('.'+SVML_SELECTED_CLASS).removeClass(SVML_SELECTED_CLASS);
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 617);
instance._selectedModels = {};
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
        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "getSelectedModels", 630);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 631);
var instance = this,
            selected;

        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 634);
if (!original) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 635);
selected = YObject.values(instance._selectedModels);
        }
        else {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 638);
selected = [];
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 639);
YObject.each(
                instance._selectedModels,
                function(model) {
                    // if model.get('clientId') is defined in _originalModels, then it has an originalModel
                    _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "(anonymous 5)", 641);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 643);
var originalModel = instance._originalModels[instance.getModelAttr(model, 'clientId')];
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 644);
if (!originalModel || (YArray.indexOf(selected, originalModel) === -1)) {
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 645);
selected.push(originalModel || model);
                    }
                }
            );
        }
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 650);
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
        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "renderView", 663);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 664);
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
        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "getModelAttr", 678);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 679);
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
        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "setModelAttr", 700);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 701);
var instance = this,
            modelIsLazy, modelList;

        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 704);
if (model) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 705);
modelIsLazy = !model.get || (Lang.type(model.get) !== 'function');
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 706);
if (modelIsLazy) {
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 707);
if (revive) {
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 708);
modelList = instance.get('modelList');
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 709);
if (instance._modelListIsLazy && revive) {
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 710);
modelList.revive(model);
                    }
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 712);
model.set(name, value, options);
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 713);
if (instance._modelListIsLazy && revive) {
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 714);
modelList.free(model);
                    }
                }
                else {
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 718);
model[name] = value;
                }
            }
            else {
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 722);
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
        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "destructor", 733);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 734);
var instance = this,
            modellist = instance.get('modelList');

        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 737);
instance._clearEventhandlers();
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 738);
modellist.removeTarget(instance);
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 739);
if (instance._selectableModelEvent) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 740);
instance._selectableModelEvent.detach();
        }
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 742);
if (instance._clickModelEvent) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 743);
instance._clickModelEvent.detach();
        }
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 745);
if (instance._mouseDownModelEvent) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 746);
instance._mouseDownModelEvent.detach();
        }
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 748);
if (instance._mouseUpModelEvent) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 749);
instance._mouseUpModelEvent.detach();
        }
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 751);
if (instance._mouseenterModelEvent) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 752);
instance._mouseenterModelEvent.detach();
        }
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 754);
if (instance._mouseleaveModelEvent) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 755);
instance._mouseleaveModelEvent.detach();
        }
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 757);
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
        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "_render", 772);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 773);
var instance = this,
            modellist = instance.get('modelList'),
            viewNode;

        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 777);
instance._viewNode = viewNode = YNode.create(VIEW_TEMPLATE);
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 778);
viewNode.set('id', instance._viewId);
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 779);
instance._extraBindUI();
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 780);
if (modellist) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 781);
instance.renderView();
        }
    },

    /**
     * Binding all events we need to make ModelList work with the ScrollView-instance
     *
     * @method _extraBindUI
     * @private
     * @since 0.1
    */
    _extraBindUI : function() {
        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "_extraBindUI", 792);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 793);
var instance = this,
            boundingBox = instance.get('boundingBox'),
            modellist = instance.get('modelList'),
            eventhandlers = instance._eventhandlers;

        // making models bubble up to the scrollview-instance:
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 799);
if (modellist) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 800);
modellist.addTarget(instance);
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 801);
boundingBox.addClass(SVML_CLASS);
        }
        // If the model gets swapped out, reset events and reset targets accordingly.
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 804);
eventhandlers.push(
            instance.after('modelListChange', function (ev) {
                _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "(anonymous 6)", 805);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 806);
var newmodellist = ev.newVal,
                    prevmodellist = ev.prevVal;
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 808);
if (prevmodellist) {
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 809);
prevmodellist.removeTarget(instance);
                }
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 811);
if (newmodellist) {
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 812);
newmodellist.addTarget(instance);
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 813);
boundingBox.addClass(SVML_CLASS);
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 814);
instance.renderView();
                }
                else {
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 817);
boundingBox.removeClass(SVML_CLASS);
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 818);
instance.get('contentBox').setHTML('');
                }
            })
        );
        // Re-render the view when a model is added to or removed from the modelList
        // because we made it bubble-up to the scrollview-instance, we attach the listener there.
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 824);
eventhandlers.push(
            instance.after('reset', instance._resetView, instance)
        );
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 827);
eventhandlers.push(
            instance.after('remove', instance._renderView, instance)
        );
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 830);
eventhandlers.push(
            instance.after('add', instance._renderViewCheckAppend, instance)
        );
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 833);
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
        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "_setModelList", 847);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 848);
var instance = this;

        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 850);
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
        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "_setNoDups", 862);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 863);
var instance = this;

        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 865);
if (instance._setNoDupsInitiated) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 866);
if (instance._rerenderAttributesOnChange) {
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 867);
instance._renderView({noDups: val});
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 871);
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
        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "_setViewFilter", 884);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 885);
var instance = this;

        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 887);
if (instance._setViewFilterInitiated) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 888);
if (instance._rerenderAttributesOnChange) {
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 889);
instance._renderView({viewFilter: val});
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 893);
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
        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "_setLastItemOnTop", 906);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 907);
var instance = this;

        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 909);
if (instance._setLastItemOnTopInitiated) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 910);
if (instance._rerenderAttributesOnChange) {
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 911);
instance._renderView({lastItemOnTop: val});
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 915);
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
        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "_setDupComparator", 929);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 930);
var instance = this;

        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 932);
if (instance._setDupComparatorInitiated) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 933);
if (instance._rerenderAttributesOnChange && instance.get('noDups')) {
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 934);
instance._renderView({dupComparator: val});
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 938);
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
        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "_setGroupHeader1", 951);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 952);
var instance = this;

        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 954);
if (instance._setGroupHeader1Initiated) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 955);
if (instance._rerenderAttributesOnChange) {
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 956);
instance._renderView({groupHeader1: val});
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 960);
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
        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "_setGroupHeader2", 973);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 974);
var instance = this;

        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 976);
if (instance._setGroupHeader2Initiated) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 977);
if (instance._rerenderAttributesOnChange) {
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 978);
instance._renderView({groupHeader2: val});
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 982);
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
        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "_setGroupHeader3", 995);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 996);
var instance = this;

        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 998);
if (instance._setGroupHeader3Initiated) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 999);
if (instance._rerenderAttributesOnChange) {
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1000);
instance._renderView({groupHeader3: val});
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1004);
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
        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "_setRenderGroupHeader1", 1017);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1018);
var instance = this;

        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1020);
if (instance._setRenderGroupHeader1Initiated) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1021);
if (instance._rerenderAttributesOnChange) {
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1022);
instance._renderView({renderGroupHeader1: val});
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1026);
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
        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "_setRenderGroupHeader2", 1039);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1040);
var instance = this;

        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1042);
if (instance._setRenderGroupHeader2Initiated) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1043);
if (instance._rerenderAttributesOnChange) {
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1044);
instance._renderView({renderGroupHeader2: val});
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1048);
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
        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "_setRenderGroupHeader3", 1061);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1062);
var instance = this;

        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1064);
if (instance._setRenderGroupHeader3Initiated) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1065);
if (instance._rerenderAttributesOnChange) {
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1066);
instance._renderView({renderGroupHeader3: val});
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1070);
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
        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "_setRenderModel", 1083);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1084);
var instance = this;

        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1086);
if (instance._setRenderModelInitiated) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1087);
if (instance._rerenderAttributesOnChange) {
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1088);
instance._renderView({renderModel: val});
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1092);
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
        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "_setModelsSelectable", 1106);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1107);
var instance = this;

        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1109);
if ((val==='') || !val) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1110);
val = null;
        }
        else {_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1112);
if (Lang.isBoolean(val)) {
            // val===true
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1114);
val = 'multi';
        }}
        // At this point, val can have three states: null, 'single' and 'multi'
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1117);
instance._setSelectableEvents(val);
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1118);
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
        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "_setModelListStyled", 1130);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1131);
var instance = this;

        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1133);
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
        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "_setSelectableEvents", 1145);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1146);
var instance = this,
            contentBox = instance.get('contentBox');

        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1149);
instance.clearSelectedModels();
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1150);
if (val && !instance._selectableModelEvent) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1151);
instance._selectableModelEvent = contentBox.delegate(
                'click',
                Y.rbind(instance._handleModelSelectionChange, instance),
                function() {
                    // Only handle click-event when there was motion less than 'clickSensivity' pixels
                    _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "(anonymous 7)", 1154);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1156);
var scrollingInAction = (Math.abs(instance.lastScrolledAmt) > instance.get('clickSensivity'));
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1157);
return (!scrollingInAction && this.hasClass(MODEL_CLASS));
                }
            );
        }
        else {_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1161);
if (!val && instance._selectableModelEvent) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1162);
instance._selectableModelEvent.detach();
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1163);
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
        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "_setClickEvents", 1176);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1177);
var instance = this,
            contentBox = instance.get('contentBox');

        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1180);
if (val && !instance._clickModelEvent) {
            /**
             * Is fired when the user positions the mouse over a Model.
             *
             * @event modelClick
             * @param {Y.Node} node the node that was clicked.
             * @param {Y.Model} model the model that was bound to the node.
             * @since 0.1
            **/
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1189);
instance._clickModelEvent = contentBox.delegate(
                'click',
                function(e) {
                    _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "(anonymous 8)", 1191);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1192);
var node = e.currentTarget,
                        modelList = instance.get('modelList'),
                        modelClientId = node.getData('modelClientId'),
                        model = modelList && modelList.getByClientId(modelClientId);
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1196);
instance.fire('modelClick', {node: node, model: model});
                },
                function() {
                    // Only handle click-event when there was motion less than 'clickSensivity' pixels
                    _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "(anonymous 9)", 1198);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1200);
var scrollingInAction = (Math.abs(instance.lastScrolledAmt) > instance.get('clickSensivity'));
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1201);
return (!scrollingInAction && this.hasClass(MODEL_CLASS));
                }
            );
        }
        else {_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1205);
if (!val && instance._clickModelEvent) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1206);
instance._clickModelEvent.detach();
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1207);
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
        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "_setMouseDownUpEvents", 1220);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1221);
var instance = this,
            contentBox = instance.get('contentBox');


        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1225);
if (val && !instance._mouseDownModelEvent) {
            /**
             * Is fired when the user positions the mouse over a Model.
             *
             * @event modelMouseDown
             * @param {Y.Node} node the node where the mousedown occurs.
             * @param {Y.Model} model the model that was bound to the node.
             * @since 0.1
            **/
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1234);
instance._mouseDownModelEvent = contentBox.delegate(
                'mousedown',
                function(e) {
                    _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "(anonymous 10)", 1236);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1237);
var node = e.currentTarget,
                        modelList = instance.get('modelList'),
                        modelClientId = node.getData('modelClientId'),
                        model = modelList && modelList.getByClientId(modelClientId);
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1241);
instance.fire('modelMouseDown', {node: node, model: model});
                },
                '.' + MODEL_CLASS
            );
        }
        else {_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1246);
if (!val && instance._mouseDownModelEvent) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1247);
instance._mouseDownModelEvent.detach();
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1248);
instance._mouseDownModelEvent = null;
        }}
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1250);
if (val && !instance._mouseUpModelEvent) {
            /**
             * Is fired when the user positions the mouse over a Model.
             *
             * @event modelMouseUp
             * @param {Y.Node} node the node where the mouseup occurs.
             * @param {Y.Model} model the model that was bound to the node.
             * @since 0.1
            **/
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1259);
instance._mouseUpModelEvent = contentBox.delegate(
                'mouseup',
                function(e) {
                    _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "(anonymous 11)", 1261);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1262);
var node = e.currentTarget,
                        modelList = instance.get('modelList'),
                        modelClientId = node.getData('modelClientId'),
                        model = modelList && modelList.getByClientId(modelClientId);
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1266);
instance.fire('modelMouseUp', {node: node, model: model});
                },
                '.' + MODEL_CLASS
            );
        }
        else {_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1271);
if (!val && instance._mouseUpModelEvent) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1272);
instance._mouseUpModelEvent.detach();
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1273);
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
        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "_setHoverEvents", 1286);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1287);
var instance = this,
            contentBox = instance.get('contentBox');

        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1290);
if (val && !instance._mouseenterModelEvent) {
            /**
             * Is fired when the user positions the mouse over a Model.
             *
             * @event modelMouseEnter
             * @param {Y.Node} node the node on which the mouse entered.
             * @param {Y.Model} model the model that was bound to the node.
             * @since 0.1
            **/
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1299);
instance._mouseenterModelEvent = contentBox.delegate(
                'mouseenter',
                function(e) {
                    _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "(anonymous 12)", 1301);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1302);
var node = e.currentTarget,
                        modelList = instance.get('modelList'),
                        modelClientId = node.getData('modelClientId'),
                        model = modelList && modelList.getByClientId(modelClientId);
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1306);
instance.fire('modelMouseEnter', {node: node, model: model});
                },
                '.'+MODEL_CLASS
            );
        }
        else {_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1311);
if (!val && instance._mouseenterModelEvent) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1312);
instance._mouseenterModelEvent.detach();
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1313);
instance._mouseenterModelEvent = null;
        }}
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1315);
if (val && !instance._mouseleaveModelEvent) {
            /**
             * Is fired when the user positions the mouse outside a Model.
             *
             * @event modelMouseLeave
             * @param {Y.Node} node the node on which the mouse moved outwards off.
             * @param {Y.Model} model the model that was bound to the node.
             * @since 0.1
            **/
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1324);
instance._mouseleaveModelEvent = contentBox.delegate(
                'mouseleave',
                function(e) {
                    _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "(anonymous 13)", 1326);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1327);
var node = e.currentTarget,
                        modelList = instance.get('modelList'),
                        modelClientId = node.getData('modelClientId'),
                        model = modelList && modelList.getByClientId(modelClientId);
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1331);
instance.fire('modelMouseLeave', {node: node, model: model});
                },
                '.'+MODEL_CLASS
            );
        }
        else {_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1336);
if (!val && instance._mouseleaveModelEvent) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1337);
instance._mouseleaveModelEvent.detach();
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1338);
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
        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "_handleModelSelectionChange", 1350);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1351);
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
            modelPrevSelected, multipleModels, newModelIndex, prevModelIndex, startIndex, endIndex, i, nextModel;

        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1366);
modelPrevSelected = model && instance.modelIsSelected(model);
        // At this stage, 'modelsSelectable' is either 'single' or 'multi'
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1368);
if (singleSelectable || !ctrlClick) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1369);
instance.clearSelectedModels();
        }
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1371);
if (model) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1372);
if (shiftClick && instance._lastClickedModel) {
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1373);
multipleModels = [];
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1374);
newModelIndex = modelList.indexOf(model);
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1375);
prevModelIndex = modelList.indexOf(instance._lastClickedModel);
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1376);
startIndex = Math.min(newModelIndex, prevModelIndex);
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1377);
endIndex = Math.max(newModelIndex, prevModelIndex);
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1378);
for (i=startIndex; i<=endIndex; i++) {
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1379);
nextModel = modelList.item(i);
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1380);
if (!viewFilter || viewFilter(nextModel)) {
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1381);
multipleModels.push(nextModel);
                    }
                }
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1384);
instance.selectModels(multipleModels);
            }
            else {
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1387);
if (modelPrevSelected) {
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1388);
instance.unselectModels(model);
                }
                else {
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1391);
instance.selectModels(model);
                }
                // store model because we need to know which model received the last click
                // We need to know in case of a future shift-click
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1395);
instance._lastClickedModel = modelPrevSelected ? null : model;
            }
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1397);
e.currentTarget.focus();
        }
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1399);
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
        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "_renderView", 1413);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1414);
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
            infiniteView = instance.hasPlugin('itssvinfinite'),
            header1, header2, header3, modelConfig, modelNode,
            axis, xAxis, yAxis, boundingBox, viewsize, elementsize, lastModelNode, offsetDirection, renderedModel, prevRenderedModel,
            modelClientId, headerNode, i, model, modelListItems, batchSize, items, modelListItemsLength, dupAvailable;

        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1438);
dupAvailable = function(model) {
            _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "dupAvailable", 1438);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1439);
var dupFound = false,
                modelComp = dupComparator(model);
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1441);
YArray.some(
                modelListItems,
                function(checkModel) {
                    _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "(anonymous 14)", 1443);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1444);
if (checkModel===model) {return true;}
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1445);
dupFound = (dupComparator(checkModel)===modelComp);
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1446);
return dupFound;
                }
            );
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1449);
return dupFound;
        };
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1451);
if (!contentBox.one('#'+instance._viewId)) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1452);
contentBox.setHTML(viewNode);
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1453);
instance._set('srcNode', contentBox);
        }
        // if it finds out there is a 'modelconfig'-attribute, then we need to make extra steps:
        // we do not render the standard 'modelList', but we create a second modellist that might have more models: these
        // will be the models that are repeated due to a count-value or an enddate when duplicateWhenDurationCrossesMultipleDays is true.
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1458);
modelListItems = modelList._items.concat();
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1459);
modelListItemsLength = modelListItems.length;
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1460);
if (!infiniteView || forceRebuild) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1461);
viewNode.setHTML('');
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1462);
i = 0;
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1463);
batchSize = modelListItemsLength;
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1464);
instance._prevHeader1 = null;
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1465);
instance._prevHeader2 = null;
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1466);
instance._prevHeader3 = null;
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1467);
instance._even = false;
        }
        else {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1470);
i = (instance._prevLastModelIndex || -1) + 1;
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1471);
batchSize = Math.min(instance.itssvinfinite.get('batchSize'), modelListItemsLength);
        }
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1473);
if (instance._generateAbberantModelList) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1474);
modelConfig = (setterAtrs && setterAtrs.modelConfig) || instance.get('modelConfig');
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1475);
if (modelConfig && modelConfig.date && (modelConfig.enddate || modelConfig.count)) {
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1476);
instance._generateAbberantModelList(infiniteView, forceRebuild);
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1477);
modelList = instance._abberantModelList;
                // reset next 2 items
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1479);
modelListItems = modelList._items.concat();
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1480);
modelListItemsLength = modelListItems.length;
            }
            else {
                // clear _abberantModelList to make sure in other methods the actual modelList (from attribute) will be used.
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1484);
instance._abberantModelList = null;
            }
        }
        else {
            // clear _abberantModelList to make sure in other methods the actual modelList (from attribute) will be used.
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1489);
instance._abberantModelList = null;
        }
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1491);
items = 0;
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1492);
while ((items<batchSize) && (i<modelListItemsLength)) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1493);
model = modelListItems[i];
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1494);
modelClientId = instance.getModelAttr(model, 'clientId');
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1495);
if ((!viewFilter || viewFilter(model)) &&
                (!noDups ||
                (!dupComparator && ((renderedModel = renderModel(model))!==prevRenderedModel)) ||
                (dupComparator && !dupAvailable(model)))
               ) {
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1500);
items++;
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1501);
modelNode = YNode.create(VIEW_MODEL_TEMPLATE);
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1502);
if (activeGroupHeader1) {
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1503);
header1 = groupHeader1Func(model);
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1504);
if (header1!==instance._prevHeader1) {
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1505);
headerNode = YNode.create(VIEW_MODEL_TEMPLATE),
                        headerNode.addClass(GROUPHEADER_CLASS);
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1507);
headerNode.addClass(GROUPHEADER1_CLASS);
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1508);
if (instance._prevHeader1) {
                            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1509);
headerNode.addClass(GROUPHEADER_SEQUEL_CLASS);
                        }
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1511);
headerNode.setHTML(renderGroupHeader1(model));
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1512);
viewNode.append(headerNode);
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1513);
instance._prevHeader1 = header1;
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1514);
instance._even = false;
                        // force to make a header2 insertion (when apriopriate)
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1516);
instance._prevHeader2 = null;
                    }
                }
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1519);
if (activeGroupHeader2) {
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1520);
header2 = groupHeader2Func(model);
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1521);
if (header2!==instance._prevHeader2) {
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1522);
headerNode = YNode.create(VIEW_MODEL_TEMPLATE),
                        headerNode.addClass(GROUPHEADER_CLASS);
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1524);
headerNode.addClass(GROUPHEADER2_CLASS);
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1525);
if (instance._prevHeader2) {
                            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1526);
headerNode.addClass(GROUPHEADER_SEQUEL_CLASS);
                        }
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1528);
headerNode.setHTML(renderGroupHeader2(model));
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1529);
viewNode.append(headerNode);
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1530);
instance._prevHeader2 = header2;
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1531);
instance._even = false;
                        // force to make a header3 insertion (when apriopriate)
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1533);
instance._prevHeader3 = null;
                    }
                }
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1536);
if (activeGroupHeader3) {
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1537);
header3 = groupHeader3Func(model);
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1538);
if (header3!==instance._prevHeader3) {
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1539);
headerNode = YNode.create(VIEW_MODEL_TEMPLATE),
                        headerNode.addClass(GROUPHEADER_CLASS);
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1541);
headerNode.addClass(GROUPHEADER3_CLASS);
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1542);
if (instance._prevHeader3) {
                            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1543);
headerNode.addClass(GROUPHEADER_SEQUEL_CLASS);
                        }
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1545);
headerNode.setHTML(renderGroupHeader3(model));
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1546);
viewNode.append(headerNode);
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1547);
instance._prevHeader3 = header3;
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1548);
instance._even = false;
                    }
                }
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1551);
modelNode.setData('modelClientId', modelClientId);
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1552);
modelNode.addClass(MODEL_CLASS);
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1553);
modelNode.addClass(modelClientId);
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1554);
modelNode.addClass(instance._even ? SVML_EVEN_CLASS : SVML_ODD_CLASS);
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1555);
modelNode.setHTML(renderedModel || renderModel(model));
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1556);
viewNode.append(modelNode);
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1557);
instance._even = !instance._even;
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1558);
if (noDups && !dupComparator) {
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1559);
prevRenderedModel = renderedModel;
                }
            }
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1562);
i++;
        }
        // _prevLastModelIndex is needed by the plugin infinitescroll
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1565);
instance._prevLastModelIndex = i - 1;
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1566);
if (modelNode && lastItemOnTop && (!infiniteView || !instance._moreItemsAvailable)) {
            // need to add an extra empty LI-element that has the size of the view minus the last element
            // modelNode is the reference to the last element
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1569);
lastModelNode = modelNode;
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1570);
axis = instance.get('axis');
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1571);
xAxis = axis.x;
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1572);
yAxis = axis.y;
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1573);
boundingBox = instance.get('boundingBox'),
            modelNode = YNode.create(VIEW_EMPTY_ELEMENT_TEMPLATE),
            modelNode.addClass(EMPTY_ELEMENT_CLASS);
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1576);
offsetDirection = xAxis ? 'offsetWidth' : 'offsetHeight';
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1577);
viewsize = boundingBox.get(offsetDirection);
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1578);
elementsize = viewsize - lastModelNode.get(offsetDirection);
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1579);
lastModelNode = lastModelNode.previous();
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1580);
while (lastModelNode && lastModelNode.hasClass(GROUPHEADER_CLASS)) {
                // also decrease with the size of this LI-element
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1582);
elementsize -= lastModelNode.get(offsetDirection);
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1583);
lastModelNode = lastModelNode.previous();
            }
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1585);
modelNode.setStyle((xAxis ? 'width' : 'height'), elementsize+'px');
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1586);
if (elementsize>0) {
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1587);
viewNode.append(modelNode);
            }
        }
        // always syncUI() --> making scrollview 'know' how large the scrollable contentbox is
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1591);
instance.syncUI();
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1592);
if (infiniteView) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1593);
instance.itssvinfinite._checkExpansion();
        }
        /**
         * Fire an event, so that anyone who is terested in this point can hook in.
         *
         * @event modelListRender
         * @since 0.1
        **/
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1601);
instance.fire('modelListRender');
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
        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "_resetView", 1612);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1613);
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
        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "_renderViewCheckAppend", 1627);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1628);
var instance = this,
            append = instance.hasPlugin('itssvinfinite');

        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1631);
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
        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "_renderModelOrView", 1644);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1645);
var instance = this,
            modellist = instance.get('modelList');

        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1648);
instance._renderView();
    },

    /**
     * Of this Model: sets the 'selected-status' in the ScrollView-instance to true
     *
     * @method _selectModel
     * @param {Y.Model|Array} model Model or Array of Models to be checked
     * @param {Boolean} selectstatus whether the new status is true or false
     * @private
     * @since 0.1
    */
    _selectModel : function(model, selectstatus) {
        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "_selectModel", 1660);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1661);
var instance = this,
            modelid = instance.getModelAttr(model, 'clientId'),
            contentBox = instance.get('contentBox'),
            modelnodes;

        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1666);
if (modelid) {
            // each modelid-class should be prenet only once
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1668);
modelnodes = contentBox.one('.'+modelid);
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1669);
if (modelnodes) {
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1670);
modelnodes.toggleClass(SVML_SELECTED_CLASS, selectstatus);
            }
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1672);
if (selectstatus) {
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1673);
instance._selectedModels[modelid] = model;
            }
            else {
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1676);
delete instance._selectedModels[modelid];
            }
        }
        else {
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
        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "_fireSelectedModels", 1690);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1691);
var instance = this,
            selectedModels, originalModels;

        /**
         * Is fired when the user changes the modelselection. In case multiple Models are selected and the same Model is
         * more than once (in case of repeating Models), the Model is only once in the resultarray.
         * Meaning: only original unique Models are returned.
         *
         * @event modelSelectionChange
         * @param {Array} newModelSelection contains [Model] with all modelList's Models that are selected:<br>
         * -in case of repeated Models (see attribute 'modelConfig')- the subModel (dup or splitted) will be returned.
         * @param {Array} originalModelSelection contains [Model] with all modelList's unique original Models that are selected.
         * @since 0.1
        **/
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1705);
selectedModels = instance.getSelectedModels();
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1706);
originalModels = instance._abberantModelList ? instance.getSelectedModels(true) : selectedModels;
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1707);
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
        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "_clearEventhandlers", 1724);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1725);
YArray.each(
            this._eventhandlers,
            function(item){
                _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "(anonymous 15)", 1727);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1728);
item.detach();
            }
        );
    }

}, true);

_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1735);
Y.ScrollView.ITSAScrollViewModelListExtention = ITSAScrollViewModelListExtention;

_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1737);
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
