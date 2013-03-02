'use strict';

/**
 * ScrollView ModelList Extention
 *
 *
 * Adds an Y.ModelList to a ScrollView instance, where the Models are rendered inside an unsorted-list
 * lies within the scrollview's-contentBox. Thisresults in an ul-list with Models.
 *
 * @module gallery-itsscrollviewmodellist
 * @class ITSAScrollViewModelList
 * @extends Plugin.Base
 * @constructor
 * @since 3.8.1
 *
 * <i>Copyright (c) 2013 Marco Asbreuk - http://itsasbreuk.nl</i>
 * YUI BSD License - http://developer.yahoo.com/yui/license.html
 *
*/

var Lang = Y.Lang,
    YObject = Y.Object,
    YArray = Y.Array,
    YNode = Y.Node,
    VIEW_TEMPLATE = '<ul></ul>',
    VIEW_MODEL_TEMPLATE = '<li></li>',
    MODEL_CLASS = 'itsa-scrollviewmodel',
    SVML_CLASS = 'itsa-scrollviewmodellist',
    SVML_SELECTED_CLASS = MODEL_CLASS + '-selected',
    SVML_EVEN_CLASS = MODEL_CLASS + '-even',
    SVML_ODD_CLASS = MODEL_CLASS + '-odd',
    GROUPHEADER1_CLASS = SVML_CLASS + '-groupheader1',
    GROUPHEADER2_CLASS = SVML_CLASS + '-groupheader2',
    GROUPHEADER3_CLASS = SVML_CLASS + '-groupheader3';

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
            * @since 3.8.1
            */
            modelList: {
                value: null,
                validator: function(v){ return (v instanceof Y.ModelList) || (v === null); }
            },

           /**
            * Whether the Models can be selected (resulting in a 'modelSelectionChange'-event)
            * Posible values are: <b>null</b>, <b>''</b>, <b>true</b>, <b>false</b>, <b>single</b>, <b>multi</b>
            * The value true equals 'multi'
            *
            * @default true
            * @attribute modelsSelectable
            * @type int
            * @since 0.1
            */
            modelsSelectable: {
                value: null,
                validator:  function(v) {
                    return ((v==='') || (v===null) || (v===true) || (v===false) || (v==='single') || (v==='multi'));
                },
                setter: '_setModelsSelectable'
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
            * @since 3.8.1
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
            *
            * @attribute clickEvents
            * @type {Boolean}
            * @default false
            * @since 3.8.1
            */
            clickEvents: {
                value: false,
                validator: function(v) {return Lang.isBoolean(v);},
                setter: '_setClickEvents'
            },

           /**
            * Whether an event is fired when a Model catches a mouse-enter or mouseleave.
            * When set to true, the events 'modelMouseEnter' and 'modelMouseLeave' are fired when moving the mouse over the Models.
            *
            * @attribute hoverEvents
            * @type {Boolean}
            * @default false
            * @since 3.8.1
            */
            hoverEvents: {
                value: false,
                validator: function(v) {return Lang.isBoolean(v);},
                setter: '_setHoverEvents'
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
    _selectableModelEvent : null,
    _clickModelEvent : null,
    _mouseenterModelEvent : null,
    _mouseleaveModelEvent : null,
    _selectedModels : {},
    _viewNode : null,
    _viewId : null,
    _lastClickedModel : null,

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
     * Function which the developer might override with 'model' as first argument.
     * When defined, the ScrollView-instance will generate GroupHeaders (extra li-elements with class='itsa-scrollviewmodellist-groupheader1')
     * just above all models (li-elements) that encounter a change in the groupHeader1-value. If overriden: MUST return a valid value for all models.
     *
     * @method groupHeader1
     * @param {Y.Model} Model to be checked.
     * @return {String|Int|Boolean} Model-specific value on which base the module can determine to what groupHeader
     * the Model belongs.
     * @since 3.8.1
     */
    groupHeader1: function () {
        Y.log('groupHeader1', 'info', 'Itsa-ScrollViewModelList');
        // defaults to null --> developer might override this method with 'model' as first argument
        return null;
    },

    /**
     * Function which the developer might override with 'model' as first argument.
     * When defined, the ScrollView-instance will generate GroupHeaders (extra li-elements with class='itsa-scrollviewmodellist-groupheader2')
     * just above all models (li-elements) that encounter a change in the groupHeader2-value. If overriden: MUST return a valid value for all models.
     *
     * @param {Y.Model} Model to be checked.
     * @return {String|Int|Boolean} Model-specific value on which base the module can determine to what groupHeader
     * @method groupHeader2
     * @since 3.8.1
     */
    groupHeader2: function () {
        Y.log('groupHeader2', 'info', 'Itsa-ScrollViewModelList');
        // defaults to null --> developer might override this method with 'model' as first argument
        return null;
    },

    /**
     * Function which the developer might override with 'model' as first argument.
     * When defined, the ScrollView-instance will generate GroupHeaders (extra li-elements with class='itsa-scrollviewmodellist-groupheader3')
     * just above all models (li-elements) that encounter a change in the groupHeader3-value. If overriden: MUST return a valid value for all models.
     *
     * @param {Y.Model} Model to be checked.
     * @return {String|Int|Boolean} Model-specific value on which base the module can determine to what groupHeader
     * @method groupHeader3
     * @since 3.8.1
     */
    groupHeader3: function () {
        Y.log('groupHeader3', 'info', 'Itsa-ScrollViewModelList');
        // defaults to null --> developer might override this method with 'model' as first argument
        return null;
    },

    /**
     * Method that is responsible for the rendering of all the Models. The developer should override this method in a way
     * that the rendering of the Models result in the content that is desired.
     *
     * @method renderModel
     * @param {Y.Model} model The Model which needs to be rendered.
     * return {String} Rendered Model-content
     * @since 3.8.1
     */
    renderModel: function (model) {
        Y.log('yourScrollView.renderModel() should be overrriden if you want custom Modelrendering', 'warn', 'Itsa-ScrollViewModelList');
        return model.get('clientId'); // default, so that there always is content. Best to be overwritten.
    },

    /**
     * Method that is responsible for the rendering of groupHeader1. The developer may override this method, but can choose not to.
     * If not overriden, renderGroupHeader1 will render the same output as groupHeader1 returns (except that it's a String).
     * If the developer wants content other than groupHeader1 generates, he/she can override this method.
     *
     * @method renderGroupHeader1
     * @param {Y.Model} model The Model which needs to be rendered.
     * return {String} Rendered content of groupHeader1
     * @since 3.8.1
     */
    renderGroupHeader1: function (model) {
        Y.log('yourScrollView.renderGroupHeader1() can be overrriden if you want custom groupHeader1 content', 'info', 'Itsa-ScrollViewModelList');
        // defaults to groupHeader1() --> developer might override this method
        return this.groupHeader1(model); // default
    },

    /**
     * Method that is responsible for the rendering of groupHeader2. The developer may override this method, but can choose not to.
     * If not overriden, renderGroupHeader2 will render the same output as groupHeader2 returns (except that it's a String).
     * If the developer wants content other than groupHeader2 generates, he/she can override this method.
     *
     * @method renderGroupHeader2
     * @param {Y.Model} model The Model which needs to be rendered.
     * return {String} Rendered content of groupHeader2
     * @since 3.8.1
     */
    renderGroupHeader2: function (model) {
        Y.log('yourScrollView.renderGroupHeader2() can be overrriden if you want custom groupHeader1 content', 'info', 'Itsa-ScrollViewModelList');
        // defaults to groupHeader2() --> developer might override this method
        return this.groupHeader2(model); // default
    },

    /**
     * Method that is responsible for the rendering of groupHeader3. The developer may override this method, but can choose not to.
     * If not overriden, renderGroupHeader3 will render the same output as groupHeader3 returns (except that it's a String).
     * If the developer wants content other than groupHeader3 generates, he/she can override this method.
     *
     * @method renderGroupHeader3
     * @param {Y.Model} model The Model which needs to be rendered.
     * return {String} Rendered content of groupHeader3
     * @since 3.8.1
     */
    renderGroupHeader3: function (model) {
        Y.log('yourScrollView.renderGroupHeader2() can be overrriden if you want custom groupHeader1 content', 'info', 'Itsa-ScrollViewModelList');
        // defaults to groupHeader3() --> developer might override this method
        return this.groupHeader3(model); // default
    },

    /**
     * If the Model/Models has a 'selected-status' in the ScrollView-instance.
     *
     * @method modelIsSelected
     * @param {Y.Model|Array} model Model or Array of Models to be checked
     * @return {Boolean} whether the Model (or all Models) have a 'selected-status'
     * @since 3.8.1
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
     * @since 3.8.1
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
     * @since 3.8.1
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
     * @since 3.8.1
    */
    clearSelectedModels : function() {
        var instance = this;

        Y.log('clearSelectedModels', 'info', 'Itsa-ScrollViewModelList');
        instance._viewNode.all('.'+SVML_SELECTED_CLASS).removeClass(SVML_SELECTED_CLASS);
        instance._selectedModels = {};
    },

    /**
     * Returns an Array with the Models that have the 'selected-status' in the ScrollView-instance set to true
     *
     * @method getSelectedModels
     * @return {Array} Array with all unique Models that are selected
     * @since 3.8.1
     */
    getSelectedModels : function() {
        var instance = this;

        Y.log('getSelectedModels', 'info', 'Itsa-ScrollViewModelList');
        return YObject.values(instance._selectedModels);
    },

    /**
     * Cleans up bindings and removes plugin
     * @method destructor
     * @protected
     * @since 3.8.1
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
     * @since 3.8.1
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
            instance._renderView();
        }
    },

    /**
     * Binding all events we need to make ModelList work with the ScrollView-instance
     *
     * @method _extraBindUI
     * @private
     * @since 3.8.1
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
                    instance._renderView();
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
            instance.after(['add', 'remove', 'reset'], instance._renderView, instance)
        );
        eventhandlers.push(
            instance.after('*:change', instance._renderModelOrView, instance)
        );
        // Next: Handle clicking on Models by select them en fire a 'modelSelectionChange'-event
        eventhandlers.push(
            instance._viewNode.delegate(
                'click',
                Y.rbind(instance._handleModelSelectionChange, instance),
                function() {
                    // Only handle click-event when there was motion less than 'clickSensivity' pixels
                    var scrollingInAction = (Math.abs(instance.lastScrolledAmt) > instance.get('clickSensivity'));
                    return (!scrollingInAction && this.hasClass(MODEL_CLASS));
                }
            )
        );
    },

    /**
     * Setter for attribute modelsSelectable. Transforms val into three posible states: null, 'single' and 'multi'
     * Also resets _selectableModelEvent.
     *
     * @method _setModelsSelectable
     * @param {Boolean|String|null} val
     * @private
     * @since 3.8.1
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
     * Sets or removes selectable click-events when the mouse clicks on a Model.
     *
     * @method _setSelectableEvents
     * @param {Boolean} val
     * @private
     * @since 3.8.1
     *
    */
    _setSelectableEvents : function(val) {
        var instance = this;

        Y.log('_setSelectableEvents', 'info', 'Itsa-ScrollViewModelList');
        instance.clearSelectedModels();
        if (val && !instance._selectableModelEvent) {
            instance._selectableModelEvent = instance._viewNode.delegate(
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
     * @since 3.8.1
     *
    */
    _setClickEvents : function(val) {
        var instance = this;

        Y.log('_setClickEvents', 'info', 'Itsa-ScrollViewModelList');
        if (val && !instance._clickModelEvent) {
            /**
             * Is fired when the user positions the mouse over a Model.
             *
             * @event modelClick
             * @param {Y.Node} node the node that was clicked.
             * @param {Y.Model} model the model that was bound to the node.
             * @since 3.8.1
            **/
            instance._clickModelEvent = instance._viewNode.delegate(
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
     * Sets or removes mouseenter and mouseleave events when the mouse gets over the Models.
     *
     * @method _setHoverEvents
     * @param {Boolean} val
     * @private
     * @since 3.8.1
     *
    */
    _setHoverEvents : function(val) {
        var instance = this,
            viewNode = instance._viewNode;

        Y.log('_setHoverEvents', 'info', 'Itsa-ScrollViewModelList');
        if (val && !instance._mouseenterModelEvent) {
            /**
             * Is fired when the user positions the mouse over a Model.
             *
             * @event modelMouseEnter
             * @param {Y.Node} node the node on which the mouse entered.
             * @param {Y.Model} model the model that was bound to the node.
             * @since 3.8.1
            **/
            instance._mouseenterModelEvent = viewNode.delegate(
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
             * @since 3.8.1
            **/
            instance._mouseleaveModelEvent = viewNode.delegate(
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

    _handleModelSelectionChange : function(e) {
        var instance = this,
            modelNode = e.currentTarget,
            modelList = instance.get('modelList'),
            modelClientId = modelNode.getData('modelClientId'),
            model = modelList && modelList.getByClientId(modelClientId),
            modelsSelectable = instance.get('modelsSelectable'),
            shiftClick = e.shiftKey,
            ctrlClick = (e.metaKey || e.ctrlKey),
            modelPrevSelected, multipleModels, newModelIndex, prevModelIndex, startIndex, endIndex, i;

        Y.log('_handleModelSelectionChange', 'info', 'Itsa-ScrollViewModelList');
        // At this stage, 'modelsSelectable' is either 'single' or 'multi'
        if ((modelsSelectable==='single') || !ctrlClick) {
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
     * @since 3.8.1
     *
    */
    _renderModelOrView : function(e) {
        var instance = this,
            modellist = instance.get('modelList');

        Y.log('_renderModelOrView', 'info', 'Itsa-ScrollViewModelList');
        instance._renderView();
    },

    /**
     * Renderes the ModelList within _viewNode (which is inside the contentBox of the ScrollView-instance).
     * Does not need to be called standalone, because eventlisteners will sync automaticly on ModelList-changes.
     *
     * @method _renderView
     * @private
     * @since 3.8.1
     *
    */
    _renderView : function() {
        var instance = this,
            viewNode = instance._viewNode,
            contentBox = instance.get('contentBox'),
            modellist = instance.get('modelList'),
            firstModel = modellist && (modellist.size()>0) && modellist.item(0),
            activeGroupHeader1 = firstModel && Lang.isValue(instance.groupHeader1(firstModel)),
            activeGroupHeader2 = firstModel && Lang.isValue(instance.groupHeader2(firstModel)),
            activeGroupHeader3 = firstModel && Lang.isValue(instance.groupHeader3(firstModel)),
            //=====================================================================================================
            // next 5 params we need because of a bugfix in scrollview --> see at end of this method
            scrollDims, width, height, scrollWidth, scrollHeight,
            //=====================================================================================================
            even = false,
            header1, header2, header3, prevHeader1, prevHeader2, prevHeader3;

        Y.log('_renderView', 'info', 'Itsa-ScrollViewModelList');
        if (!contentBox.one('#'+instance._viewId)) {
            contentBox.setHTML(viewNode);
            instance.set('srcNode', contentBox);
        }
        viewNode.setHTML('');
        modellist.each(
            function(model) {
                var modelNode = YNode.create(VIEW_MODEL_TEMPLATE),
                    modelClientId = model.get('clientId'),
                    headerNode;
                if (activeGroupHeader1) {
                    header1 = instance.groupHeader1(model);
                    if (header1!==prevHeader1) {
                        headerNode = YNode.create(VIEW_MODEL_TEMPLATE),
                        modelNode.addClass(GROUPHEADER1_CLASS);
                        modelNode.setHTML(instance.renderGroupHeader1(model));
                        viewNode.append(headerNode);
                        prevHeader1 = header1;
                        even = false;
                        // force to make a header2 insertion (when apriopriate)
                        prevHeader2 = null;
                    }
                }
                if (activeGroupHeader2) {
                    header2 = instance.groupHeader2(model);
                    if (header2!==prevHeader2) {
                        headerNode = YNode.create(VIEW_MODEL_TEMPLATE),
                        modelNode.addClass(GROUPHEADER2_CLASS);
                        modelNode.setHTML(instance.renderGroupHeader2(model));
                        viewNode.append(headerNode);
                        prevHeader2 = header2;
                        even = false;
                        // force to make a header3 insertion (when apriopriate)
                        prevHeader3 = null;
                    }
                }
                if (activeGroupHeader3) {
                    header3 = instance.groupHeader3(model);
                    if (header3!==prevHeader3) {
                        headerNode = YNode.create(VIEW_MODEL_TEMPLATE),
                        modelNode.addClass(GROUPHEADER3_CLASS);
                        modelNode.setHTML(instance.renderGroupHeader3(model));
                        viewNode.append(headerNode);
                        prevHeader3 = header3;
                        even = false;
                    }
                }
                modelNode.setData('modelClientId', modelClientId);
                modelNode.addClass(MODEL_CLASS);
                modelNode.addClass(modelClientId);
                modelNode.addClass(even ? SVML_EVEN_CLASS : SVML_ODD_CLASS);
                modelNode.setHTML(instance.renderModel(model));
                viewNode.append(modelNode);
                even = !even;
            }
        );

        //=====================================================================================================
        // next comes a bugfix for scrollview.
        // the code may remain: it will not hurt.
        // on the other hand: as soon as ticket http://yuilibrary.com/projects/yui3/ticket/2533135 is resolved,
        // the code can be removed.
        if (!instance._cAxis || (!instance._cAxis.x && !instance._cAxis.y)) {
            scrollDims = instance._getScrollDims();
            width = scrollDims.offsetWidth;
            height = scrollDims.offsetHeight;
            scrollWidth = scrollDims.scrollWidth;
            scrollHeight = scrollDims.scrollHeight;
            instance._cAxis = {
                x: (scrollWidth > width),
                y: (scrollHeight > height)
            };
            // _set allows setting writeOnce attributes
            instance._set('axis', instance._cAxis);
        }
        //=====================================================================================================

        // always syncUI() --> making scrollview 'know' how large the scrollable contentbox is
        instance.syncUI();
    },

    /**
     * Of this Model: sets the 'selected-status' in the ScrollView-instance to true
     *
     * @method _selectModel
     * @param {Y.Model|Array} model Model or Array of Models to be checked
     * @param {Boolean} selectstatus whether the new status is true or false
     * @private
     * @since 3.8.1
    */
    _selectModel : function(model, selectstatus) {
        var instance = this,
            modelid = (model instanceof Y.Model) && model.get('clientId'),
            modelnodes;

        if (modelid) {
            Y.log('_selectModel '+model.get("clientId")+' new selectstatus: '+selectstatus, 'info', 'Itsa-ScrollViewModelList');
            // Because Models can have repeated rferences, we don't look for one instance, but for a nodelist
            modelnodes = instance._viewNode.all('.'+modelid);
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
     * @since 3.8.1
     */
    _fireSelectedModels : function () {
        var instance = this;

        Y.log('_fireSelectedModels', 'info', 'Itsa-ScrollViewModelList');
        /**
         * Is fired when the user changes the modelselection. In case multiple Models are selected and the same Model is
         * more than once (in case of repeating Dates), the Model is only once in the resultarray. Meaning: only unique Models are returned.
         * @event modelSelectionChange
         * @param {Array} newModelSelection contains [Model] with all modelList's unique Models that are selected
         * @since 3.8.1
        **/
        instance.fire("modelSelectionChange", {newModelSelection: instance.getSelectedModels()});
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

}, false);

Y.ScrollView.ITSAScrollViewModelListExtention = ITSAScrollViewModelListExtention;

Y.Base.mix(Y.ScrollView, [ITSAScrollViewModelListExtention]);