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

function ITSALazyModelListAttrExtention() {}

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
        Y.log('getModelAttr', 'info', 'Itsa-LazyModelListAttr');
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
        var instance = this,
            modelIsLazy;

        Y.log('setModelAttr', 'info', 'Itsa-LazyModelListAttr');
        if (model) {
            modelIsLazy = !model.get || (Lang.type(model.get) !== 'function');
            if (modelIsLazy) {
                if (revive) {
                    if (revive) {
                        instance.revive(model);
                        model.set(name, value, options);
                        instance.free(model);
                    }
                    else {
                        model.set(name, value, options);
                    }
                }
                else {
                    model[name] = value;
                }
            }
            else {
                model.set(name, value, options);
            }
        }
    }

}, true);

Y.LazyModelList.ITSALazyModelListAttrExtention = ITSALazyModelListAttrExtention;

Y.Base.mix(Y.LazyModelList, [ITSALazyModelListAttrExtention]);

// -- Mixing extra Methods to Y.ScrollView -----------------------------------

function ITSAScrollViewModelListExtention() {}

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
        validator: function(v){ return (v instanceof Y.ModelList) || (v instanceof Y.LazyModelList) || (v === null);},
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
        validator: function(v){ return Lang.isBoolean(v);},
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
        validator: function(v){ return Lang.isFunction(v) || v === null; },
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
        validator: function(v) {return Lang.isBoolean(v);},
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
        validator: function(v) {return Lang.isBoolean(v);},
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
        validator: function(v) {return Lang.isBoolean(v);},
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
        validator: function(v){ return Lang.isBoolean(v);},
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
        validator: function(v){ return Lang.isFunction(v) || v === null; },
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
        validator: function(v){ return Lang.isFunction(v) || v === null; },
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
        validator: function(v){ return Lang.isFunction(v) || v === null; },
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
            return this.getModelAttr(model, 'clientId'); // default, so that there always is content. Best to be overwritten.
        },
        validator: function(v){ return Lang.isFunction(v) || v === null; },
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
        validator: function(v){ return Lang.isFunction(v) || v === null; },
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
        validator: function(v){ return Lang.isFunction(v) || v === null; },
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
        validator: function(v){ return Lang.isFunction(v) || v === null; },
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
        validator: function(v){ return Lang.isFunction(v) || v === null; },
        setter: '_setRenderGroupHeader3'
    }
};

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
        var instance = this;

        Y.log('initializer', 'info', 'Itsa-ScrollViewModelList');
        instance._viewId = Y.guid();
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
        var instance = this;

        Y.log('setWithoutRerender', 'info', 'Itsa-ScrollViewModelList');
        instance._rerenderAttributesOnChange = false;
        instance.set(name, val, opts);
        instance._rerenderAttributesOnChange = true;
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
     * external data-calls. It will prevent you from falling into endless expansion when the list is infinite. If not set this method will expand
     * from external data at the <b>max of 25 times by default</b> (which is quite a lot). If you are responsible for the external data and
     * it is limited, then you might choose to set this value that high to make sure all data is rendered in the scrollview.
     * @return {Y.Node} Li-Node that corresponds with the model.
     * @since 0.1
    */
    getNodeFromModel : function(model, maxExpansions) {
        var instance = this,
            modelClientId = instance.getModelAttr(model, 'clientId'),
            infiniteScrollPlugin = instance.hasPlugin('itssvinfinite'),
            maxLoop = maxExpansions || 25,
            i = 0,
            nodeFound = false, nodeList, findNode;

        Y.log('getNodeFromModel', 'info', 'Itsa-ScrollViewModelList');
        findNode = function(node) {
            var found = (node.getData('modelClientId') === modelClientId);
            if (found) {
                nodeFound = node;
            }
            return found;
        };
        do {
            nodeList = instance._viewNode.all('.itsa-scrollviewmodel');
            nodeList.some(findNode);
            i++;
//=============================================================================================================================
//
// NEED SOME WORK HERE: infiniteScrollPlugin.expandList IS ASYNCHROUS --> WE NEED PROMISES TO BE SURE IT HAS FINISHED HIS JOB
//
//=============================================================================================================================
        } while (!nodeFound && infiniteScrollPlugin && (i<maxLoop) && infiniteScrollPlugin.expandList());
        return nodeFound;
    },

    /**
     * Makes the Model scroll into the View (at the top).
     *
     * @method scrollIntoView
     * @param {Y.Model} that should be got view.
     * @private
     * @since 0.1
    */
    scrollIntoView : function(model) {
        var instance = this,
            boundingBox = instance.get('boundingBox'),
            axis = instance.get('axis'),
            yAxis = axis.y,
            viewNode = instance._viewNode,
            modelNode = model && instance.getNodeFromModel(model),
            infiniteScrollPlugin = instance.hasPlugin('itssvinfinite'),
            boundingBoxEdge, modelNodeEdge, currentOffset, maxOffset, newOffset;

        if (modelNode) {
            Y.log('scrollIntoView', 'info', 'Itsa-ScrollViewModelList');
            if (yAxis) {
                boundingBoxEdge = boundingBox.getY();
                modelNodeEdge = modelNode.getY();
                currentOffset = instance.get('scrollY');
                maxOffset = viewNode.get('offsetHeight') - boundingBox.get('offsetHeight');
            }
            else {
                boundingBoxEdge = boundingBox.getX();
                modelNodeEdge = modelNode.getX();
                currentOffset = instance.get('scrollX');
                maxOffset = viewNode.get('offsetWidth') - boundingBox.get('offsetWidth');
            }
            newOffset = Math.round(currentOffset + modelNodeEdge - boundingBoxEdge);
            // You might need to expand the list in case ITSAScrollViewInifiniteScroll is pluged-in AND maxOffset<newOffset
            // Only 1 time is needed: getNodeFromModel already has expanded a number of times to make the Node available
            if (infiniteScrollPlugin && (maxOffset<newOffset) && instance._moreItemsAvailable) {
//=============================================================================================================================
//
// NEED SOME WORK HERE: infiniteScrollPlugin.expandList IS ASYNCHROUS --> WE NEED PROMISES TO BE SURE IT HAS FINISHED HIS JOB
//
//=============================================================================================================================
                infiniteScrollPlugin.expandList();
                if (yAxis) {
                    maxOffset = viewNode.get('offsetHeight') - boundingBox.get('offsetHeight');
                }
                else {
                    maxOffset = viewNode.get('offsetWidth') - boundingBox.get('offsetWidth');
                }
            }
            if (yAxis) {
                instance.scrollTo(0, Math.min(newOffset, maxOffset));
            }
            else {
                instance.scrollTo(Math.min(newOffset, maxOffset), 0);
            }
        }
        else {
            Y.log('scrollIntoView --> no model', 'warn', 'Itsa-ScrollViewModelList');
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
        var instance = this,
            selected;

        Y.log('modelIsSelected', 'info', 'Itsa-ScrollViewModelList');
        if (Lang.isArray(model)) {
            YArray.some(
                model,
                function(onemodel) {
                    selected = instance._selectedModels[instance.getModelAttr(onemodel, 'clientId')];
                    return selected ? false : true;
                }
            );
        }
        else {
            selected = instance._selectedModels[instance.getModelAttr(model, 'clientId')];
        }
        return Lang.isValue(selected);
    },

    /**
     * Of all the supplied Models: sets the 'selected-status' in the ScrollView-instance to true
     *
     * @method selectModels
     * @param {Y.Model|Array} models Model or Array of Models to be checked. May also be items of a LazyModelList,
     * in which case it might not be a true Model, but an Object.
     * @param {boolean} [scrollIntoView] makes the first selected Model scroll into the View (at the top).
     * @since 0.1
    */
    selectModels : function(models, scrollIntoView) {
        var instance = this;

        Y.log('selectModels', 'info', 'Itsa-ScrollViewModelList');
        if (Lang.isArray(models)) {
            YArray.each(
                models,
                function(model) {
                    instance._selectModel(model, true);
                }
            );
            if (scrollIntoView && (models.length>0)) {
                instance.scrollIntoView(models[0]);
            }
        }
        else {
            instance._selectModel(models, true);
            if (scrollIntoView) {
                instance.scrollIntoView(models);
            }
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
        var instance = this;

        Y.log('unselectModels', 'info', 'Itsa-ScrollViewModelList');
        if (Lang.isArray(models)) {
            YArray.each(
                models,
                function(model) {
                    instance._selectModel(model, false);
                }
            );
        }
        else {
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
        var instance = this,
            contentBox = instance.get('contentBox');

        Y.log('clearSelectedModels', 'info', 'Itsa-ScrollViewModelList');
        contentBox.all('.'+SVML_SELECTED_CLASS).removeClass(SVML_SELECTED_CLASS);
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
        var instance = this,
            selected;

        Y.log('getSelectedModels', 'info', 'Itsa-ScrollViewModelList');
        if (!original) {
            selected = YObject.values(instance._selectedModels);
        }
        else {
            selected = [];
            YObject.each(
                instance._selectedModels,
                function(model) {
                    // if model.get('clientId') is defined in _originalModels, then it has an originalModel
                    var originalModel = instance._originalModels[instance.getModelAttr(model, 'clientId')];
                    if (!originalModel || (YArray.indexOf(selected, originalModel) === -1)) {
                        selected.push(originalModel || model);
                    }
                }
            );
        }
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
        Y.log('destructor', 'info', 'Itsa-ScrollViewModelList');
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
        Y.log('getModelAttr', 'info', 'Itsa-ScrollViewModelList');
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
        var instance = this,
            modelIsLazy, modelList;

        Y.log('_setModelAttr', 'info', 'Itsa-ScrollViewModelList');
        if (model) {
            modelIsLazy = !model.get || (Lang.type(model.get) !== 'function');
            if (modelIsLazy) {
                if (revive) {
                    modelList = instance.get('modelList');
                    if (instance._modelListIsLazy && revive) {
                        modelList.revive(model);
                    }
                    model.set(name, value, options);
                    if (instance._modelListIsLazy && revive) {
                        modelList.free(model);
                    }
                }
                else {
                    model[name] = value;
                }
            }
            else {
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
        var instance = this,
            modellist = instance.get('modelList');

        Y.log('destructor', 'info', 'Itsa-ScrollViewModelList');
        instance._clearEventhandlers();
        modellist.removeTarget(instance);
        if (instance._selectableModelEvent) {
            instance._selectableModelEvent.detach();
        }
        if (instance._clickModelEvent) {
            instance._clickModelEvent.detach();
        }
        if (instance._mouseDownModelEvent) {
            instance._mouseDownModelEvent.detach();
        }
        if (instance._mouseUpModelEvent) {
            instance._mouseUpModelEvent.detach();
        }
        if (instance._mouseenterModelEvent) {
            instance._mouseenterModelEvent.detach();
        }
        if (instance._mouseleaveModelEvent) {
            instance._mouseleaveModelEvent.detach();
        }
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
        var instance = this,
            modellist = instance.get('modelList'),
            viewNode;

        Y.log('_render', 'info', 'Itsa-ScrollViewModelList');
        instance._viewNode = viewNode = YNode.create(VIEW_TEMPLATE);
        viewNode.set('id', instance._viewId);
        instance._extraBindUI();
        if (modellist) {
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
        var instance = this,
            boundingBox = instance.get('boundingBox'),
            modellist = instance.get('modelList'),
            eventhandlers = instance._eventhandlers;

        Y.log('_extraBindUI', 'info', 'Itsa-ScrollViewModelList');
        // making models bubble up to the scrollview-instance:
        if (modellist) {
            modellist.addTarget(instance);
            boundingBox.addClass(SVML_CLASS);
        }
        // If the model gets swapped out, reset events and reset targets accordingly.
        eventhandlers.push(
            instance.after('modelListChange', function (ev) {
                var newmodellist = ev.newVal,
                    prevmodellist = ev.prevVal;
                if (prevmodellist) {
                    prevmodellist.removeTarget(instance);
                }
                if (newmodellist) {
                    newmodellist.addTarget(instance);
                    boundingBox.addClass(SVML_CLASS);
                    instance.renderView();
                }
                else {
                    boundingBox.removeClass(SVML_CLASS);
                    instance.get('contentBox').setHTML('');
                }
            })
        );
        // Re-render the view when a model is added to or removed from the modelList
        // because we made it bubble-up to the scrollview-instance, we attach the listener there.
        eventhandlers.push(
            instance.after('reset', instance._resetView, instance)
        );
        eventhandlers.push(
            instance.after('remove', instance._renderView, instance)
        );
        eventhandlers.push(
            instance.after('add', instance._renderViewCheckAppend, instance)
        );
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
        var instance = this;

        Y.log('_setModelList', 'info', 'Itsa-ScrollViewModelList');
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
        var instance = this;

        Y.log('_setNoDups', 'info', 'Itsa-ScrollViewModelList');
        if (instance._setNoDupsInitiated) {
            if (instance._rerenderAttributesOnChange) {
                instance._renderView({noDups: val});
            }
        }
        else {
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
        var instance = this;

        Y.log('_setViewFilter', 'info', 'Itsa-ScrollViewModelList');
        if (instance._setViewFilterInitiated) {
            if (instance._rerenderAttributesOnChange) {
                instance._renderView({viewFilter: val});
            }
        }
        else {
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
        var instance = this;

        Y.log('_setLastItemOnTop', 'info', 'Itsa-ScrollViewModelList');
        if (instance._setLastItemOnTopInitiated) {
            if (instance._rerenderAttributesOnChange) {
                instance._renderView({lastItemOnTop: val});
            }
        }
        else {
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
        var instance = this;

        Y.log('_setDupComparator', 'info', 'Itsa-ScrollViewModelList');
        if (instance._setDupComparatorInitiated) {
            if (instance._rerenderAttributesOnChange && instance.get('noDups')) {
                instance._renderView({dupComparator: val});
            }
        }
        else {
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
        var instance = this;

        Y.log('_setGroupHeader1', 'info', 'Itsa-ScrollViewModelList');
        if (instance._setGroupHeader1Initiated) {
            if (instance._rerenderAttributesOnChange) {
                instance._renderView({groupHeader1: val});
            }
        }
        else {
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
        var instance = this;

        Y.log('_setGroupHeader2', 'info', 'Itsa-ScrollViewModelList');
        if (instance._setGroupHeader2Initiated) {
            if (instance._rerenderAttributesOnChange) {
                instance._renderView({groupHeader2: val});
            }
        }
        else {
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
        var instance = this;

        Y.log('_setGroupHeader3', 'info', 'Itsa-ScrollViewModelList');
        if (instance._setGroupHeader3Initiated) {
            if (instance._rerenderAttributesOnChange) {
                instance._renderView({groupHeader3: val});
            }
        }
        else {
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
        var instance = this;

        Y.log('_setRenderGroupHeader1', 'info', 'Itsa-ScrollViewModelList');
        if (instance._setRenderGroupHeader1Initiated) {
            if (instance._rerenderAttributesOnChange) {
                instance._renderView({renderGroupHeader1: val});
            }
        }
        else {
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
        var instance = this;

        Y.log('_setRenderGroupHeader2', 'info', 'Itsa-ScrollViewModelList');
        if (instance._setRenderGroupHeader2Initiated) {
            if (instance._rerenderAttributesOnChange) {
                instance._renderView({renderGroupHeader2: val});
            }
        }
        else {
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
        var instance = this;

        Y.log('_setRenderGroupHeader3', 'info', 'Itsa-ScrollViewModelList');
        if (instance._setRenderGroupHeader3Initiated) {
            if (instance._rerenderAttributesOnChange) {
                instance._renderView({renderGroupHeader3: val});
            }
        }
        else {
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
        var instance = this;

        Y.log('_setRenderModel', 'info', 'Itsa-ScrollViewModelList');
        if (instance._setRenderModelInitiated) {
            if (instance._rerenderAttributesOnChange) {
                instance._renderView({renderModel: val});
            }
        }
        else {
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
        var instance = this;

        Y.log('_setModelsSelectable', 'info', 'Itsa-ScrollViewModelList');
        if ((val==='') || !val) {
            val = null;
        }
        else if (Lang.isBoolean(val)) {
            // val===true
            val = 'multi';
        }
        // At this point, val can have three states: null, 'single' and 'multi'
        instance._setSelectableEvents(val);
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
        var instance = this;

        Y.log('_setModelListStyled', 'info', 'Itsa-ScrollViewModelList');
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
        var instance = this,
            contentBox = instance.get('contentBox');

        Y.log('_setSelectableEvents', 'info', 'Itsa-ScrollViewModelList');
        instance.clearSelectedModels();
        if (val && !instance._selectableModelEvent) {
            instance._selectableModelEvent = contentBox.delegate(
                'click',
                Y.rbind(instance._handleModelSelectionChange, instance),
                function() {
                    // Only handle click-event when there was motion less than 'clickSensivity' pixels
                    var scrollingInAction = (Math.abs(instance.lastScrolledAmt) > instance.get('clickSensivity'));
                    return (!scrollingInAction && this.hasClass(MODEL_CLASS));
                }
            );
        }
        else if (!val && instance._selectableModelEvent) {
            instance._selectableModelEvent.detach();
            instance._selectableModelEvent = null;
        }
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
        var instance = this,
            contentBox = instance.get('contentBox');

        Y.log('_setClickEvents', 'info', 'Itsa-ScrollViewModelList');
        if (val && !instance._clickModelEvent) {
            /**
             * Is fired when the user positions the mouse over a Model.
             *
             * @event modelClick
             * @param {Y.Node} node the node that was clicked.
             * @param {Y.Model} model the model that was bound to the node.
             * @since 0.1
            **/
            instance._clickModelEvent = contentBox.delegate(
                'click',
                function(e) {
                    var node = e.currentTarget,
                        modelList = instance.get('modelList'),
                        modelClientId = node.getData('modelClientId'),
                        model = modelList && modelList.getByClientId(modelClientId);
                    instance.fire('modelClick', {node: node, model: model});
                },
                function() {
                    // Only handle click-event when there was motion less than 'clickSensivity' pixels
                    var scrollingInAction = (Math.abs(instance.lastScrolledAmt) > instance.get('clickSensivity'));
                    return (!scrollingInAction && this.hasClass(MODEL_CLASS));
                }
            );
        }
        else if (!val && instance._clickModelEvent) {
            instance._clickModelEvent.detach();
            instance._clickModelEvent = null;
        }
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
        var instance = this,
            contentBox = instance.get('contentBox');


        Y.log('_setMouseDownUpEvents', 'info', 'Itsa-ScrollViewModelList');
        if (val && !instance._mouseDownModelEvent) {
            /**
             * Is fired when the user positions the mouse over a Model.
             *
             * @event modelMouseDown
             * @param {Y.Node} node the node where the mousedown occurs.
             * @param {Y.Model} model the model that was bound to the node.
             * @since 0.1
            **/
            instance._mouseDownModelEvent = contentBox.delegate(
                'mousedown',
                function(e) {
                    var node = e.currentTarget,
                        modelList = instance.get('modelList'),
                        modelClientId = node.getData('modelClientId'),
                        model = modelList && modelList.getByClientId(modelClientId);
                    instance.fire('modelMouseDown', {node: node, model: model});
                },
                '.' + MODEL_CLASS
            );
        }
        else if (!val && instance._mouseDownModelEvent) {
            instance._mouseDownModelEvent.detach();
            instance._mouseDownModelEvent = null;
        }
        if (val && !instance._mouseUpModelEvent) {
            /**
             * Is fired when the user positions the mouse over a Model.
             *
             * @event modelMouseUp
             * @param {Y.Node} node the node where the mouseup occurs.
             * @param {Y.Model} model the model that was bound to the node.
             * @since 0.1
            **/
            instance._mouseUpModelEvent = contentBox.delegate(
                'mouseup',
                function(e) {
                    var node = e.currentTarget,
                        modelList = instance.get('modelList'),
                        modelClientId = node.getData('modelClientId'),
                        model = modelList && modelList.getByClientId(modelClientId);
                    instance.fire('modelMouseUp', {node: node, model: model});
                },
                '.' + MODEL_CLASS
            );
        }
        else if (!val && instance._mouseUpModelEvent) {
            instance._mouseUpModelEvent.detach();
            instance._mouseUpModelEvent = null;
        }
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
        var instance = this,
            contentBox = instance.get('contentBox');

        Y.log('_setHoverEvents', 'info', 'Itsa-ScrollViewModelList');
        if (val && !instance._mouseenterModelEvent) {
            /**
             * Is fired when the user positions the mouse over a Model.
             *
             * @event modelMouseEnter
             * @param {Y.Node} node the node on which the mouse entered.
             * @param {Y.Model} model the model that was bound to the node.
             * @since 0.1
            **/
            instance._mouseenterModelEvent = contentBox.delegate(
                'mouseenter',
                function(e) {
                    var node = e.currentTarget,
                        modelList = instance.get('modelList'),
                        modelClientId = node.getData('modelClientId'),
                        model = modelList && modelList.getByClientId(modelClientId);
                    instance.fire('modelMouseEnter', {node: node, model: model});
                },
                '.'+MODEL_CLASS
            );
        }
        else if (!val && instance._mouseenterModelEvent) {
            instance._mouseenterModelEvent.detach();
            instance._mouseenterModelEvent = null;
        }
        if (val && !instance._mouseleaveModelEvent) {
            /**
             * Is fired when the user positions the mouse outside a Model.
             *
             * @event modelMouseLeave
             * @param {Y.Node} node the node on which the mouse moved outwards off.
             * @param {Y.Model} model the model that was bound to the node.
             * @since 0.1
            **/
            instance._mouseleaveModelEvent = contentBox.delegate(
                'mouseleave',
                function(e) {
                    var node = e.currentTarget,
                        modelList = instance.get('modelList'),
                        modelClientId = node.getData('modelClientId'),
                        model = modelList && modelList.getByClientId(modelClientId);
                    instance.fire('modelMouseLeave', {node: node, model: model});
                },
                '.'+MODEL_CLASS
            );
        }
        else if (!val && instance._mouseleaveModelEvent) {
            instance._mouseleaveModelEvent.detach();
            instance._mouseleaveModelEvent = null;
        }
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

        Y.log('_handleModelSelectionChange', 'info', 'Itsa-ScrollViewModelList');
        modelPrevSelected = model && instance.modelIsSelected(model);
        // At this stage, 'modelsSelectable' is either 'single' or 'multi'
        if (singleSelectable || !ctrlClick) {
            instance.clearSelectedModels();
        }
        if (model) {
            if (shiftClick && instance._lastClickedModel) {
                multipleModels = [];
                newModelIndex = modelList.indexOf(model);
                prevModelIndex = modelList.indexOf(instance._lastClickedModel);
                startIndex = Math.min(newModelIndex, prevModelIndex);
                endIndex = Math.max(newModelIndex, prevModelIndex);
                for (i=startIndex; i<=endIndex; i++) {
                    nextModel = modelList.item(i);
                    if (!viewFilter || viewFilter(nextModel)) {
                        multipleModels.push(nextModel);
                    }
                }
                instance.selectModels(multipleModels);
            }
            else {
                if (modelPrevSelected) {
                    instance.unselectModels(model);
                }
                else {
                    instance.selectModels(model);
                }
                // store model because we need to know which model received the last click
                // We need to know in case of a future shift-click
                instance._lastClickedModel = modelPrevSelected ? null : model;
            }
            e.currentTarget.focus();
        }
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

        Y.log('_renderView', 'info', 'Itsa-ScrollViewModelList');
        dupAvailable = function(model) {
            var dupFound = false,
                modelComp = dupComparator(model);
            YArray.some(
                modelListItems,
                function(checkModel) {
                    if (checkModel===model) {return true;}
                    dupFound = (dupComparator(checkModel)===modelComp);
                    return dupFound;
                }
            );
            return dupFound;
        };
        if (!contentBox.one('#'+instance._viewId)) {
            contentBox.setHTML(viewNode);
            instance._set('srcNode', contentBox);
        }
        // if it finds out there is a 'modelconfig'-attribute, then we need to make extra steps:
        // we do not render the standard 'modelList', but we create a second modellist that might have more models: these
        // will be the models that are repeated due to a count-value or an enddate when duplicateWhenDurationCrossesMultipleDays is true.
        modelListItems = modelList._items.concat();
        modelListItemsLength = modelListItems.length;
        if (!infiniteView || forceRebuild) {
            viewNode.setHTML('');
            i = 0;
            batchSize = modelListItemsLength;
            instance._prevHeader1 = null;
            instance._prevHeader2 = null;
            instance._prevHeader3 = null;
            instance._even = false;
        }
        else {
            i = (instance._prevLastModelIndex || -1) + 1;
            batchSize = Math.min(instance.itssvinfinite.get('batchSize'), modelListItemsLength);
        }
        if (instance._generateAbberantModelList) {
            modelConfig = (setterAtrs && setterAtrs.modelConfig) || instance.get('modelConfig');
            if (modelConfig && modelConfig.date && (modelConfig.enddate || modelConfig.count)) {
                instance._generateAbberantModelList(infiniteView, forceRebuild);
                modelList = instance._abberantModelList;
                // reset next 2 items
                modelListItems = modelList._items.concat();
                modelListItemsLength = modelListItems.length;
            }
            else {
                // clear _abberantModelList to make sure in other methods the actual modelList (from attribute) will be used.
                instance._abberantModelList = null;
            }
        }
        else {
            // clear _abberantModelList to make sure in other methods the actual modelList (from attribute) will be used.
            instance._abberantModelList = null;
        }
        items = 0;
        while ((items<batchSize) && (i<modelListItemsLength)) {
            model = modelListItems[i];
            modelClientId = instance.getModelAttr(model, 'clientId');
            if ((!viewFilter || viewFilter(model)) &&
                (!noDups ||
                (!dupComparator && ((renderedModel = renderModel(model))!==prevRenderedModel)) ||
                (dupComparator && !dupAvailable(model)))
               ) {
                items++;
                modelNode = YNode.create(VIEW_MODEL_TEMPLATE);
                if (activeGroupHeader1) {
                    header1 = groupHeader1Func(model);
                    if (header1!==instance._prevHeader1) {
                        headerNode = YNode.create(VIEW_MODEL_TEMPLATE),
                        headerNode.addClass(GROUPHEADER_CLASS);
                        headerNode.addClass(GROUPHEADER1_CLASS);
                        if (instance._prevHeader1) {
                            headerNode.addClass(GROUPHEADER_SEQUEL_CLASS);
                        }
                        headerNode.setHTML(renderGroupHeader1(model));
                        viewNode.append(headerNode);
                        instance._prevHeader1 = header1;
                        instance._even = false;
                        // force to make a header2 insertion (when apriopriate)
                        instance._prevHeader2 = null;
                    }
                }
                if (activeGroupHeader2) {
                    header2 = groupHeader2Func(model);
                    if (header2!==instance._prevHeader2) {
                        headerNode = YNode.create(VIEW_MODEL_TEMPLATE),
                        headerNode.addClass(GROUPHEADER_CLASS);
                        headerNode.addClass(GROUPHEADER2_CLASS);
                        if (instance._prevHeader2) {
                            headerNode.addClass(GROUPHEADER_SEQUEL_CLASS);
                        }
                        headerNode.setHTML(renderGroupHeader2(model));
                        viewNode.append(headerNode);
                        instance._prevHeader2 = header2;
                        instance._even = false;
                        // force to make a header3 insertion (when apriopriate)
                        instance._prevHeader3 = null;
                    }
                }
                if (activeGroupHeader3) {
                    header3 = groupHeader3Func(model);
                    if (header3!==instance._prevHeader3) {
                        headerNode = YNode.create(VIEW_MODEL_TEMPLATE),
                        headerNode.addClass(GROUPHEADER_CLASS);
                        headerNode.addClass(GROUPHEADER3_CLASS);
                        if (instance._prevHeader3) {
                            headerNode.addClass(GROUPHEADER_SEQUEL_CLASS);
                        }
                        headerNode.setHTML(renderGroupHeader3(model));
                        viewNode.append(headerNode);
                        instance._prevHeader3 = header3;
                        instance._even = false;
                    }
                }
                modelNode.setData('modelClientId', modelClientId);
                modelNode.addClass(MODEL_CLASS);
                modelNode.addClass(modelClientId);
                modelNode.addClass(instance._even ? SVML_EVEN_CLASS : SVML_ODD_CLASS);
                modelNode.setHTML(renderedModel || renderModel(model));
                viewNode.append(modelNode);
                instance._even = !instance._even;
                if (noDups && !dupComparator) {
                    prevRenderedModel = renderedModel;
                }
            }
            i++;
        }
        // _prevLastModelIndex is needed by the plugin infinitescroll
        instance._prevLastModelIndex = i - 1;
        if (modelNode && lastItemOnTop && (!infiniteView || !instance._moreItemsAvailable)) {
            // need to add an extra empty LI-element that has the size of the view minus the last element
            // modelNode is the reference to the last element
            lastModelNode = modelNode;
            axis = instance.get('axis');
            xAxis = axis.x;
            yAxis = axis.y;
            boundingBox = instance.get('boundingBox'),
            modelNode = YNode.create(VIEW_EMPTY_ELEMENT_TEMPLATE),
            modelNode.addClass(EMPTY_ELEMENT_CLASS);
            offsetDirection = xAxis ? 'offsetWidth' : 'offsetHeight';
            viewsize = boundingBox.get(offsetDirection);
            elementsize = viewsize - lastModelNode.get(offsetDirection);
            lastModelNode = lastModelNode.previous();
            while (lastModelNode && lastModelNode.hasClass(GROUPHEADER_CLASS)) {
                // also decrease with the size of this LI-element
                elementsize -= lastModelNode.get(offsetDirection);
                lastModelNode = lastModelNode.previous();
            }
            modelNode.setStyle((xAxis ? 'width' : 'height'), elementsize+'px');
            if (elementsize>0) {
                viewNode.append(modelNode);
            }
        }
        // always syncUI() --> making scrollview 'know' how large the scrollable contentbox is
        instance.syncUI();
        if (infiniteView) {
            instance.itssvinfinite._checkExpansion();
        }
        /**
         * Fire an event, so that anyone who is terested in this point can hook in.
         *
         * @event modelListRender
         * @since 0.1
        **/
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
        Y.log('_resetView', 'info', 'Itsa-ScrollViewModelList');
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
        var instance = this,
            append = instance.hasPlugin('itssvinfinite');

        Y.log('_renderViewCheckAppend', 'info', 'Itsa-ScrollViewModelList');
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
        var instance = this,
            modellist = instance.get('modelList');

        Y.log('_renderModelOrView', 'info', 'Itsa-ScrollViewModelList');
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
        var instance = this,
            modelid = instance.getModelAttr(model, 'clientId'),
            contentBox = instance.get('contentBox'),
            modelnodes;

        if (modelid) {
            Y.log('_selectModel '+instance.getModelAttr(model, "clientId")+' new selectstatus: '+selectstatus, 'info', 'Itsa-ScrollViewModelList');
            // each modelid-class should be prenet only once
            modelnodes = contentBox.one('.'+modelid);
            if (modelnodes) {
                modelnodes.toggleClass(SVML_SELECTED_CLASS, selectstatus);
            }
            if (selectstatus) {
                instance._selectedModels[modelid] = model;
            }
            else {
                delete instance._selectedModels[modelid];
            }
        }
        else {
            Y.log('_selectModel --> no action taken: undefined Model', 'warn', 'Itsa-ScrollViewModelList');
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
        var instance = this,
            selectedModels, originalModels;

        Y.log('_fireSelectedModels', 'info', 'Itsa-ScrollViewModelList');
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
        selectedModels = instance.getSelectedModels();
        originalModels = instance._abberantModelList ? instance.getSelectedModels(true) : selectedModels;
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
        Y.log('_clearEventhandlers', 'info', 'DTColumnResize');
        YArray.each(
            this._eventhandlers,
            function(item){
                item.detach();
            }
        );
    }

}, true);

Y.ScrollView.ITSAScrollViewModelListExtention = ITSAScrollViewModelListExtention;

Y.Base.mix(Y.ScrollView, [ITSAScrollViewModelListExtention]);