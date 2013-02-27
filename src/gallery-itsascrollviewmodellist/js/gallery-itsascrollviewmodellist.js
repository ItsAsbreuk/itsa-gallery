'use strict';

/**
 * ScrollView ModelList Plugin
 *
 *
 * Adds an Y.ModelList to a ScrollView instance, where the Models are rendered in a Y.View,
 * which results in an ul-list with Models.
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
    SVML_CLASS = 'itsa-scrollviewmodellist',
    SVML_SELECTED_CLASS = SVML_CLASS + '-selected',
    SVML_EVEN_CLASS = SVML_CLASS + '-even',
    SVML_ODD_CLASS = SVML_CLASS + '-odd',
    SVML_GROUPHEADER1_CLASS = SVML_CLASS + '-groupheader1',
    SVML_GROUPHEADER2_CLASS = SVML_CLASS + '-groupheader2',
    SVML_GROUPHEADER3_CLASS = SVML_CLASS + '-groupheader3';

// -- Mixing extra Methods to Y.ScrollView -----------------------------------

if (!Y.ScrollView.ITSAScrollViewModelListExtention) {
    function ITSAScrollViewModelListExtention() {}

    Y.mix(ITSAScrollViewModelListExtention.prototype, {

        /**
         * Initialisation of the Plugin
         *
         * @method renderModel
         * @since 3.8.1
         */
        renderModel: function () {
            var instance = this;

            Y.log('renderModel', 'info', 'Itsa-CalendarMarkedDatesExtention');
            return model.get('clientId'); // default, so that there always is content. Best to be overwritten.
        },

        /**
         * Initialisation of the Plugin
         *
         * @method groupHeader1
         * @param {Y.Model} Model to be checked.
         * @return {String|Int|Boolean} Model-specific value on which base the module can determine to what groupHeader
         * the Model belongs.
         * @since 3.8.1
         */
        groupHeader1: function (model) {
            var instance = this;

            Y.log('groupHeader1', 'info', 'Itsa-CalendarMarkedDatesExtention');
            return null;
        },

        /**
         * Initialisation of the Plugin
         *
         * @param {Y.Model} Model to be checked.
         * @return {String|Int|Boolean} Model-specific value on which base the module can determine to what groupHeader
         * @method groupHeader2
         * @since 3.8.1
         */
        groupHeader2: function (model) {
            var instance = this;

            Y.log('groupHeader2', 'info', 'Itsa-CalendarMarkedDatesExtention');
            return null;
        },

        /**
         * Initialisation of the Plugin
         *
         * @param {Y.Model} Model to be checked.
         * @return {String|Int|Boolean} Model-specific value on which base the module can determine to what groupHeader
         * @method groupHeader3
         * @since 3.8.1
         */
        groupHeader3: function (model) {
            var instance = this;

            Y.log('groupHeader3', 'info', 'Itsa-ScrollViewModelListExtention');
            return null;
        }

    }, true);

    Y.ScrollView.ITSAScrollViewModelListExtention = ITSAScrollViewModelListExtention;

    Y.Base.mix(Y.ScrollView, [ITSAScrollViewModelListExtention]);
}

// -- Public Static Properties -------------------------------------------------

/**
 * Internal list that holds event-references
 * @property _eventhandlers
 * @private
 * @type Array
 */

Y.namespace('Plugin').ITSAScrollViewModelList = Y.Base.create('itsascrollviewmodellist', Y.Plugin.Base, [], {

        scrollview : null,
        _eventhandlers : [],
        _selectedModels = {},

        /**
         * Initialisation of the Plugin
         *
         * @method initializer
         * @protected
         * @since 0.1
         */
        initializer : function() {
            var instance = this,
                scrollview;

            Y.log('destructor', 'info', 'Itsa-ScrollViewModelList');
            instance.scrollview = scrollview = instance.get('host');
            if (scrollview.get('rendered')) {
                instance._render();
            }
            else {
                instance.afterHostEvent('render', instance._render, instance);
            }
        },

        /**
         * If the Model has a 'selected-status' in the ScrollView-instance.
         *
         * @method modelsAreSelected
         * @param {Y.Model|Array} models Model or Array of Models to be checked
         * @return {Boolean} whether the Model (or all Models) have a 'selected-status'
         * @since 3.8.1
        */
        modelsAreSelected : function(models) {
            var instance = this,
                selected;

            Y.log('modelIsSelected', 'info', 'Itsa-ScrollViewModelList');
            if (Lang.isArray(models)) {
                YArray.some(
                    models,
                    function(model) {
                        selected = (model instanceof Y.Model) && instance._selectedModels[model.get('clientId')];
                        return selected ? false : true;
                    }
                );
            }
            else {
                selected = (models instanceof Y.Model) && instance._selectedModels[models.get('clientId')];
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
                    Y.bind(instance._selectModel, instance, true)
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
            var instance = this,
                scrollview = instance.scrollview;

            Y.log('unselectModels', 'info', 'Itsa-ScrollViewModelList');
            if (Lang.isArray(models)) {
                YArray.each(
                    models,
                    Y.bind(instance._selectModel, instance, false)
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
            var instance = this,
                scrollview = instance.scrollview;

            Y.log('clearSelectedModels', 'info', 'ITSAScrollViewModelList');
            instance.view.get('container').all('.'+SVML_SELECTED_CLASS).removeClass(SVML_SELECTED_CLASS);
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
        }

        /**
         * Cleans up bindings and removes plugin
         * @method destructor
         * @protected
         * @since 3.8.1
        */
        destructor : function() {
            var instance = this,
                scrollview = instance.scrollview;

            Y.log('destructor', 'info', 'Itsa-ScrollViewModelList');
            instance._clearEventhandlers();
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
                scrollview = instance.scrollview;

            Y.log('_render', 'info', 'Itsa-ScrollViewModelList');
            instance._bindUI();
            instance.syncUI();
        },

        /**
         * Binding events
         *
         * @method _bindUI
         * @private
         * @since 3.8.1
        */
        _bindUI : function() {
            var instance = this,
                scrollview = instance.scrollview,
                eventhandlers = instance._eventhandlers;

            Y.log('_bindUI', 'info', 'Itsa-ScrollViewModelList');
        },

        /**
         * Syncs the ModelList with the ScrollView-instance.
         * Does not need to be called standalone, because eventlisteners will sync automaticly on ModelList-changes.
         *
         * @method _syncUI
         * @private
         * @since 3.8.1
         *
        */
        _syncUI : function() {
            var instance = this,
                scrollview = instance.scrollview;

            Y.log('_syncUI', 'info', 'Itsa-ScrollViewModelList');
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
                Y.log('_selectModel', 'info', 'Itsa-ScrollViewModelList');
                // Because Models can have repeated rferences, we don't look for one instance, but for a nodelist
                modelnodes = instance.view.get('container').all('.'+modelid);
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
         * Resyncing the View after a ModelList-change
         *
         * @method _setModelList
         * @private
         * @protected
         * @since 3.8.1
         */
        _setModelList : function() {
            var instance = this;

            Y.log('_setModelList', 'info', 'Itsa-ScrollViewModelList');
            if (instance.scrollview.get('rendered')) {
                instance._syncUI();
            }
            else {
                instance.afterHostEvent('render', instance._syncUI, instance);
            }
        },


    }, {
        NS : 'itsasvmodellist',
        ATTRS : {

          /**
           * The ModelList that is 'attached' to the Calendar, resulting in highlighted dates for each Model
           * that has a 'Date-match'. For more info how a 'Date-match' is achieved: see the attribute modelConfig.
           * @attribute modelList
           * @type {ModelList}
           * @default null
           * @since 3.8.1
           */
            modelList: {
                value: null,
                validator: function(v){ return (v instanceof Y.ModelList) || (v === null); },
                setter: '_setModelList'
            },

            /**
             * @description Width of the area where you can resize in touchdevices.<br>
             * The value corresponds with an area that overlaps 2 columns (50% each)<br>
             * Has the same purpose as resizeMargin, only resizeMargin will be used on non-mobile devices<br>
             * While resizeMarginTouchDevice will be used on mobile devices<br>
             * minimum value = 2<br>
             * maximum value = 60
             * @default null
             * @attribute modelsSelectable
             * @type int
             * @since 0.1
            */
            modelsSelectable: {
                value: null,
                validator:  function(val) {
                    return ((v==='') || (v===null) || (v===true) || (v===false) || (v==='single') || (v==='multi'));
                }
            }

        }
    }
);