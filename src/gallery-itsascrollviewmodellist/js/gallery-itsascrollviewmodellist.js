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
    MODEL_CLASS = 'itsa-scrollviewmodel',
    SVML_CLASS = 'itsa-scrollviewmodellist',
    SVML_SELECTED_CLASS = MODEL_CLASS + '-selected',
    SVML_EVEN_CLASS = MODEL_CLASS + '-even',
    SVML_ODD_CLASS = MODEL_CLASS + '-odd',
    SVML_STYLE_CLASS = SVML_CLASS + '-styled',
    GROUPHEADER1_CLASS = SVML_CLASS + '-groupheader1',
    GROUPHEADER2_CLASS = SVML_CLASS + '-groupheader2',
    GROUPHEADER3_CLASS = SVML_CLASS + '-groupheader3',
    GROUPHEADER_SEQUEL_CLASS = SVML_CLASS + '-sequelgroupheader';

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
        validator: function(v){ return (v instanceof Y.ModelList) || (v === null); }
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
     * Function which the developer might override with 'model' as first argument.
     * When defined, the ScrollView-instance will generate GroupHeaders (extra li-elements with class='itsa-scrollviewmodellist-groupheader1')
     * just above all models (li-elements) that encounter a change in the groupHeader1-value. If overriden: MUST return a valid value for all models.
     * <u>If you change this method after the scrollview-instance is rendered, you need to call renderView() to make the changes applied.</u>
     *
     * @method groupHeader1
     * @param {Y.Model} Model to be checked.
     * @return {String|Int|Boolean} Model-specific value on which base the module can determine to what groupHeader
     * the Model belongs.
     * @since 0.1
     */
    groupHeader1: {
        value: null,
        validator: function(v){ return Lang.isFunction(v) || v === null; },
        setter: '_setGroupHeader1'
    },

    /**
     * Function which the developer might override with 'model' as first argument.
     * When defined, the ScrollView-instance will generate GroupHeaders (extra li-elements with class='itsa-scrollviewmodellist-groupheader2')
     * just above all models (li-elements) that encounter a change in the groupHeader2-value. If overriden: MUST return a valid value for all models.
     * <u>If you change this method after the scrollview-instance is rendered, you need to call renderView() to make the changes applied.</u>
     *
     * @param {Y.Model} Model to be checked.
     * @return {String|Int|Boolean} Model-specific value on which base the module can determine to what groupHeader
     * @method groupHeader2
     * @since 0.1
     */
    groupHeader2: {
        value: null,
        validator: function(v){ return Lang.isFunction(v) || v === null; },
        setter: '_setGroupHeader2'
    },

    /**
     * Function which the developer might override with 'model' as first argument.
     * When defined, the ScrollView-instance will generate GroupHeaders (extra li-elements with class='itsa-scrollviewmodellist-groupheader3')
     * just above all models (li-elements) that encounter a change in the groupHeader3-value. If overriden: MUST return a valid value for all models.
     * <u>If you change this method after the scrollview-instance is rendered, you need to call renderView() to make the changes applied.</u>
     *
     * @param {Y.Model} Model to be checked.
     * @return {String|Int|Boolean} Model-specific value on which base the module can determine to what groupHeader
     * @method groupHeader3
     * @since 0.1
     */
    groupHeader3: {
        value: null,
        validator: function(v){ return Lang.isFunction(v) || v === null; },
        setter: '_setGroupHeader3'
    },

    /**
     * Method that is responsible for the rendering of all the Models. The developer should override this method in a way
     * that the rendering of the Models result in the content that is desired.
     * <u>If you change this method after the scrollview-instance is rendered, you need to call renderView() to make the changes applied.</u>
     *
     * @method renderModel
     * @param {Y.Model} model The Model which needs to be rendered.
     * return {String} Rendered Model-content
     * @since 0.1
     */
    renderModel: {
        value: function(model) {return model.get('clientId');}, // default, so that there always is content. Best to be overwritten.
        validator: function(v){ return Lang.isFunction(v) || v === null; },
        setter: '_setRenderModel'
    },

    /**
     * Method that is responsible for the rendering of groupHeader1. The developer may override this method, but can choose not to.
     * If not overriden, renderGroupHeader1 will render the same output as groupHeader1 returns (except that it's a String).
     * If the developer wants content other than groupHeader1 generates, he/she can override this method.
     * <u>If you change this method after the scrollview-instance is rendered, you need to call renderView() to make the changes applied.</u>
     *
     * @method renderGroupHeader1
     * @param {Y.Model} model The Model which needs to be rendered.
     * return {String} Rendered content of groupHeader1
     * @since 0.1
     */
    renderGroupHeader1: {
        value: null,
        validator: function(v){ return Lang.isFunction(v) || v === null; },
        setter: '_setRenderGroupHeader1'
    },

    /**
     * Method that is responsible for the rendering of groupHeader2. The developer may override this method, but can choose not to.
     * If not overriden, renderGroupHeader2 will render the same output as groupHeader2 returns (except that it's a String).
     * If the developer wants content other than groupHeader2 generates, he/she can override this method.
     * <u>If you change this method after the scrollview-instance is rendered, you need to call renderView() to make the changes applied.</u>
     *
     * @method renderGroupHeader2
     * @param {Y.Model} model The Model which needs to be rendered.
     * return {String} Rendered content of groupHeader2
     * @since 0.1
     */
    renderGroupHeader2: {
        value: null,
        validator: function(v){ return Lang.isFunction(v) || v === null; },
        setter: '_setRenderGroupHeader2'
    },

    /**
     * Method that is responsible for the rendering of groupHeader3. The developer may override this method, but can choose not to.
     * If not overriden, renderGroupHeader3 will render the same output as groupHeader3 returns (except that it's a String).
     * If the developer wants content other than groupHeader3 generates, he/she can override this method.
     * <u>If you change this method after the scrollview-instance is rendered, you need to call renderView() to make the changes applied.</u>
     *
     * @method renderGroupHeader3
     * @param {Y.Model} model The Model which needs to be rendered.
     * return {String} Rendered content of groupHeader3
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
    _setGroupHeader1Initiated : null,
    _setGroupHeader2Initiated : null,
    _setGroupHeader3Initiated : null,
    _setRenderGroupHeader1Initiated : null,
    _setRenderGroupHeader2Initiated : null,
    _setRenderGroupHeader3Initiated : null,
    _setRenderModelInitiated : null,

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
     * If the Model/Models has a 'selected-status' in the ScrollView-instance.
     *
     * @method modelIsSelected
     * @param {Y.Model|Array} model Model or Array of Models to be checked
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
                    selected = (onemodel instanceof Y.Model) && instance._selectedModels[onemodel.get('clientId')];
                    return selected ? false : true;
                }
            );
        }
        else {
            selected = (model instanceof Y.Model) && instance._selectedModels[model.get('clientId')];
        }
        return Lang.isValue(selected);
    },

    /**
     * Of all the supplied Models: sets the 'selected-status' in the ScrollView-instance to true
     *
     * @method selectModels
     * @param {Y.Model|Array} models Model or Array of Models to be checked
     * @since 0.1
    */
    selectModels : function(models) {
        var instance = this;

        Y.log('selectModels', 'info', 'Itsa-ScrollViewModelList');
        if (Lang.isArray(models)) {
            YArray.each(
                models,
                function(model) {
                    instance._selectModel(model, true);
                }
            );
        }
        else {
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
     * @return {Array} Array with all unique Models that are selected
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
                    var originalModel = instance._originalModels[model.get('clientId')];
                    if (!originalModel || (YArray.indexOf(selected, originalModel) === -1)) {
                        selected.push(originalModel || model);
                    }
                }
            );
        }
        return selected;
    },

    /**
     * Renderes the ModelList within _viewNode (which is inside the contentBox of the ScrollView-instance).
     * Does not need to be called standalone, because eventlisteners will sync automaticly on ModelList-changes.
     *
     * @method renderView
     * @private
     * @since 0.1
     *
    */
    renderView : function() {
        var instance = this,
            viewNode = instance._viewNode,
            contentBox = instance.get('contentBox'),
            modelList = instance.get('modelList'),
            viewFilter = instance.get('viewFilter'),
            firstModel = modelList && (modelList.size()>0) && modelList.item(0),
            renderModel = instance.get('renderModel'),
            groupHeader1Func = instance.get('groupHeader1'),
            groupHeader2Func = instance.get('groupHeader2'),
            groupHeader3Func = instance.get('groupHeader3'),
            activeGroupHeader1 = firstModel && groupHeader1Func && Lang.isValue(groupHeader1Func(firstModel)),
            activeGroupHeader2 = firstModel && groupHeader2Func && Lang.isValue(groupHeader2Func(firstModel)),
            activeGroupHeader3 = firstModel && groupHeader3Func && Lang.isValue(groupHeader3Func(firstModel)),
            renderGroupHeader1 = instance.get('renderGroupHeader1') || groupHeader1Func,
            renderGroupHeader2 = instance.get('renderGroupHeader2') || groupHeader2Func,
            renderGroupHeader3 = instance.get('renderGroupHeader3') || groupHeader3Func,
            even = false,
            header1, header2, header3, prevHeader1, prevHeader2, prevHeader3, modelconfig;

        Y.log('renderView', 'info', 'Itsa-ScrollViewModelList');
Y.log('renderView', 'warn', 'Itsa-ScrollViewModelList');
        if (!contentBox.one('#'+instance._viewId)) {
            contentBox.setHTML(viewNode);
            instance._set('srcNode', contentBox);
        }
        viewNode.setHTML('');
        // if it finds out there is a 'modelconfig'-attribute, then we need to make extra steps:
        // we do not render the standard 'modelList', but we create a second modellist that might have more models: these
        // will be the models that are repeated due to a count-value or an enddate when duplicateWhenDurationCrossesMultipleDays is true.
        if (instance._generateAbberantModelList) {
            modelconfig = instance.get('modelConfig');
            if (modelconfig && modelconfig.date && (modelconfig.enddate || modelconfig.count)) {
                instance._generateAbberantModelList();
                modelList = instance._abberantModelList;
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

        modelList.each(
            function(model) {
                var modelNode = YNode.create(VIEW_MODEL_TEMPLATE),
                    modelClientId = model.get('clientId'),
                    headerNode;
                if (!viewFilter || viewFilter(model)) {
                    if (activeGroupHeader1) {
                        header1 = groupHeader1Func(model);
                        if (header1!==prevHeader1) {
                            headerNode = YNode.create(VIEW_MODEL_TEMPLATE),
                            headerNode.addClass(GROUPHEADER1_CLASS);
                            if (prevHeader1) {
                                headerNode.addClass(GROUPHEADER_SEQUEL_CLASS);
                            }
                            headerNode.setHTML(renderGroupHeader1(model));
                            viewNode.append(headerNode);
                            prevHeader1 = header1;
                            even = false;
                            // force to make a header2 insertion (when apriopriate)
                            prevHeader2 = null;
                        }
                    }
                    if (activeGroupHeader2) {
                        header2 = groupHeader2Func(model);
                        if (header2!==prevHeader2) {
                            headerNode = YNode.create(VIEW_MODEL_TEMPLATE),
                            headerNode.addClass(GROUPHEADER2_CLASS);
                            if (prevHeader2) {
                                headerNode.addClass(GROUPHEADER_SEQUEL_CLASS);
                            }
                            headerNode.setHTML(renderGroupHeader2(model));
                            viewNode.append(headerNode);
                            prevHeader2 = header2;
                            even = false;
                            // force to make a header3 insertion (when apriopriate)
                            prevHeader3 = null;
                        }
                    }
                    if (activeGroupHeader3) {
                        header3 = groupHeader3Func(model);
                        if (header3!==prevHeader3) {
                            headerNode = YNode.create(VIEW_MODEL_TEMPLATE),
                            headerNode.addClass(GROUPHEADER3_CLASS);
                            if (prevHeader3) {
                                headerNode.addClass(GROUPHEADER_SEQUEL_CLASS);
                            }
                            headerNode.setHTML(renderGroupHeader3(model));
                            viewNode.append(headerNode);
                            prevHeader3 = header3;
                            even = false;
                        }
                    }
                    modelNode.setData('modelClientId', modelClientId);
                    modelNode.addClass(MODEL_CLASS);
                    modelNode.addClass(modelClientId);
                    modelNode.addClass(even ? SVML_EVEN_CLASS : SVML_ODD_CLASS);
                    modelNode.setHTML(renderModel(model));
                    viewNode.append(modelNode);
                    even = !even;
                }
            }
        );

        // always syncUI() --> making scrollview 'know' how large the scrollable contentbox is
        instance.syncUI();
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
            instance.after(['add', 'remove', 'reset'], instance.renderView, instance)
        );
        eventhandlers.push(
            instance.after('*:change', instance._renderModelOrView, instance)
        );
    },

    /**
     * Setter for attribute viewFilter. Will re-render the view when changed.
     *
     * @method _setViewFilter
     * @private
     * @since 0.1
     *
    */
    _setViewFilter : function() {
        var instance = this;

        Y.log('_setViewFilter', 'info', 'Itsa-ScrollViewModelList');
        if (instance._setViewFilterInitiated) {
            instance.renderView();
        }
        else {
            instance._setViewFilterInitiated = true;
        }
    },

    /**
     * Setter for attribute groupHeader1. Will re-render the view when changed.
     *
     * @method _setGroupHeader1
     * @private
     * @since 0.1
     *
    */
    _setGroupHeader1 : function() {
        var instance = this;

        Y.log('_setGroupHeader1', 'info', 'Itsa-ScrollViewModelList');
        if (instance._setGroupHeader1Initiated) {
            instance.renderView();
        }
        else {
            instance._setGroupHeader1Initiated = true;
        }
    },

    /**
     * Setter for attribute groupHeader2. Will re-render the view when changed.
     *
     * @method _setGroupHeader2
     * @private
     * @since 0.1
     *
    */
    _setGroupHeader2 : function() {
        var instance = this;

        Y.log('_setGroupHeader2', 'info', 'Itsa-ScrollViewModelList');
        if (instance._setGroupHeader2Initiated) {
            instance.renderView();
        }
        else {
            instance._setGroupHeader2Initiated = true;
        }
    },

    /**
     * Setter for attribute groupHeader3. Will re-render the view when changed.
     *
     * @method _setGroupHeader3
     * @private
     * @since 0.1
     *
    */
    _setGroupHeader3 : function() {
        var instance = this;

        Y.log('_setGroupHeader3', 'info', 'Itsa-ScrollViewModelList');
        if (instance._setGroupHeader3Initiated) {
            instance.renderView();
        }
        else {
            instance._setGroupHeader3Initiated = true;
        }
    },

    /**
     * Setter for attribute renderGroupHeader1. Will re-render the view when changed.
     *
     * @method _setRenderGroupHeader1
     * @private
     * @since 0.1
     *
    */
    _setRenderGroupHeader1 : function() {
        var instance = this;

        Y.log('_setRenderGroupHeader1', 'info', 'Itsa-ScrollViewModelList');
        if (instance._setRenderGroupHeader1Initiated) {
            instance.renderView();
        }
        else {
            instance._setRenderGroupHeader1Initiated = true;
        }
    },

    /**
     * Setter for attribute renderGroupHeader2. Will re-render the view when changed.
     *
     * @method _setRenderGroupHeader2
     * @private
     * @since 0.1
     *
    */
    _setRenderGroupHeader2 : function() {
        var instance = this;

        Y.log('_setRenderGroupHeader2', 'info', 'Itsa-ScrollViewModelList');
        if (instance._setRenderGroupHeader2Initiated) {
            instance.renderView();
        }
        else {
            instance._setRenderGroupHeader2Initiated = true;
        }
    },

    /**
     * Setter for attribute renderGroupHeader3. Will re-render the view when changed.
     *
     * @method _setRenderGroupHeader3
     * @private
     * @since 0.1
     *
    */
    _setRenderGroupHeader3 : function() {
        var instance = this;

        Y.log('_setRenderGroupHeader3', 'info', 'Itsa-ScrollViewModelList');
        if (instance._setRenderGroupHeader3Initiated) {
            instance.renderView();
        }
        else {
            instance._setRenderGroupHeader3Initiated = true;
        }
    },

    /**
     * Setter for attribute renderModel. Will re-render the view when changed.
     *
     * @method _setRenderModel
     * @private
     * @since 0.1
     *
    */
    _setRenderModel : function() {
        var instance = this;

        Y.log('_setRenderModel', 'info', 'Itsa-ScrollViewModelList');
        if (instance._setRenderModelInitiated) {
            instance.renderView();
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
            modelPrevSelected, multipleModels, newModelIndex, prevModelIndex, startIndex, endIndex, i;

        Y.log('_handleModelSelectionChange', 'info', 'Itsa-ScrollViewModelList');
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
                    multipleModels.push(modelList.item(i));
                }
                instance.selectModels(multipleModels);
            }
            else {
                modelPrevSelected = instance.modelIsSelected(model);
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
        }
        instance._fireSelectedModels();
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
        instance.renderView();
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
            modelid = (model instanceof Y.Model) && model.get('clientId'),
            contentBox = instance.get('contentBox'),
            modelnodes;

        if (modelid) {
            Y.log('_selectModel '+model.get("clientId")+' new selectstatus: '+selectstatus, 'info', 'Itsa-ScrollViewModelList');
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