YUI.add('gallery-itsachangemodeltemplate', function (Y, NAME) {

'use strict';

/**
 * Plugin Y.Plugin.ChangeModelTemplate
 *
 * Plugin for ITSAViewModellist and ITSAScrollViewModellist that makes it possible to toggle templates per model.
 * This might be useful if your (scroll)viewModellist has many rendered models, where you need to toggle
 * some of them. There are three different states:
 *
 * 1) Original Template (standard defined by the host)
 * 2) 'secondTemplate' (can be set up within this plugin: for example to define an 'extended' view for the Models)
 * 3) 'editTemplate' (can be set up within this plugin: to edit the Models)
 *
 * Be aware that 'secondTemplate' and 'editTemplate' are used for rendering all Models.
 *
 * To make the models editable, this plugin uses gallery-itsaeditmodel under the hood. The attribute 'configForEditModel' is passed
 * through to Y.Plugin.ITSAEditModel.
 *
 * @module gallery-itsachangemodeltemplate
 * @class ITSAChangeModelTemplate
 * @constructor
 * @since 0.1
 *
 * <i>Copyright (c) 2013 Marco Asbreuk - http://itsasbreuk.nl</i>
 * YUI BSD License - http://developer.yahoo.com/yui/license.html
 *
*/

var Lang = Y.Lang,
    YArray = Y.Array,
    FORMELEMENT_CLASS = 'yui3-itsaformelement',
    ITSAFORMELEMENT_CHANGED_CLASS = FORMELEMENT_CLASS + '-changed',
    ERROR_MESSAGE_NOTEMPLATE = 'Attribute editTemplate is undefined',
    ISMICROTEMPLATE = function(template) {
        var microTemplateRegExp = /<%(.+)%>/;
        return microTemplateRegExp.test(template);
    };

Y.namespace('Plugin').ITSAChangeModelTemplate = Y.Base.create('itsachangemodeltemplate', Y.Plugin.Base, [], {

        host : null,

        /**
         * Internal reference to the compiled alternate template.
         * @property _secondTempl
         * @private
         * @default null
         * @type Function
        */
        _secondTempl : null,

        /**
         * Internal flag to state whether the alternate template is of the type Y.Template.Micro
         * @property _secondTemplIsMicro
         * @private
         * @default null
         * @type Boolean
        */
        _secondTemplIsMicro : null,


        /**
         * Internal reference to the compiled edit template.
         * @property _editTempl
         * @private
         * @default null
         * @type Function
        */
        _editTempl : null,

        /**
         * Internal flag to state is the edittemplate is a microtemplate
         * @property _editTemplIsMicro
         * @private
         * @default null
         * @type Boolean
        */
        _editTemplIsMicro : null,

        /**
         * Internal backuplist of the Models attributes, used when the editdata needs to be reset.
         * @property _initialEditAttrs
         * @private
         * @default {}
         * @type Object
        */
        _initialEditAttrs : {},

        /**
         * Internal backuplist to keep track of which models live in the state of the secondTemplate
         * @property _secondModels
         * @private
         * @default {}
         * @type Object
        */
        _secondModels : {},

        /**
         * Internal backuplist to keep track of which models live in the state of the editTemplate
         * @property _editModels
         * @private
         * @default {}
         * @type Object
        */
        _editModels : {},

        /**
         * Internal backuplist to keep track of the previous Mode of the Models, to enable restore the template to previous state.
         * @property _prevMode
         * @private
         * @default {}
         * @type Object
        */
        _prevMode : {},

        /**
         * Internal list of all eventhandlers bound by this widget.
         * @property _eventhandlers
         * @private
         * @default []
         * @type Array
        */
        _eventhandlers : [],

        /**
         * Internal flag that tells whether -in editMode- the user has changed the content of a Model. This way the module knows it
         * doesn't need to do a thorough re-render of the list.
         * @property _currentModelHasChanged
         * @private
         * @default false
         * @type Boolean
        */
        _currentModelHasChanged : false,

        /**
         * Internal backuplist of the Models previous 'comparator-result', used determine if the comparators-value has changed after
         * the models has been edited.  This way the module knows it doesn't need to do a thorough re-render of the list.
         * @property _prevComparator
         * @private
         * @default {}
         * @type Object
        */
        _prevComparator : {},


        /**
         * Sets up the toolbar during initialisation. Calls render() as soon as the hosts-editorframe is ready
         *
         * @method initializer
         * @protected
         * @since 0.1
         */
        initializer : function() {
            var instance = this,
                host;

            instance.host = host = instance.get('host');
            instance._bindUI();
        },

        /**
         * Re-renderes the Model -inside the ViewList- with its original template (defined by the host).
         * @method setModelToOriginalTemplate
         * @param model {Y.Model | Object} The item from the modellist. May be a Model, or an Object - in case of LazyModelList
         * @since 0.1
        */
        setModelToOriginalTemplate: function(model) {
            var instance = this,
                host = instance.host,
                clientId = host.getModelAttr(model, 'clientId'),
                modellist = host.get('modelList'),
                comparator = modellist && Y.bind(modellist.comparator, modellist),
                currentMode;

            currentMode = instance._getMode(model);
            if (currentMode !== 1) {
                instance._prevMode[clientId] = instance._getMode(model);
                delete instance._secondModels[clientId];
                delete instance._initialEditAttrs[clientId];
                if (instance._editModels[clientId]) {
                    instance._unplugITSAEditModel(model, clientId);
                }
                if (instance._currentModelHasChanged && comparator && (instance._prevComparator[clientId]!==comparator(model))) {
                    modellist.sort();
                    //====================================================
                    //
                    // Next is a bugfix for LazyModelList --> see issue https://github.com/yui/yui3/issues/634
                    // As soon as issue is resolved, remove modellist.free() command
                    //
                    if (host._listLazy) {
                        modellist.free();
                    }
                    //======================================================
                    host._repositionModel(model);
                }
                else {
                    instance._renderOriginalTemplate(model);
                }
                delete instance._prevComparator[clientId];
                instance._currentModelHasChanged = false;
            }
            else {
            }
        },

        /**
         * Re-renderes the Model -inside the ViewList- with its second template (defined by 'secondTemplate').
         * @method setModelToSecondTemplate
         * @param model {Y.Model | Object} The item from the modellist. May be a Model, or an Object - in case of LazyModelList
         * @since 0.1
        */
        setModelToSecondTemplate: function(model) {
            var instance = this,
                host = instance.host,
                clientId = host.getModelAttr(model, 'clientId'),
                modellist = host.get('modelList'),
                comparator = modellist && Y.bind(modellist.comparator, modellist),
                currentMode;

            currentMode = instance._getMode(model);
            if (currentMode !== 2) {
                delete instance._initialEditAttrs[clientId];
                instance._prevMode[clientId] = instance._getMode(model);
                instance._secondModels[clientId] = true;
                if (instance._editModels[clientId]) {
                    instance._unplugITSAEditModel(model, clientId);
                }
                if (instance._currentModelHasChanged && comparator && (instance._prevComparator[clientId]!==comparator(model))) {
                    modellist.sort();
                    //====================================================
                    //
                    // Next is a bugfix for LazyModelList --> see issue https://github.com/yui/yui3/issues/634
                    // As soon as issue is resolved, remove modellist.free() command
                    //
                    if (host._listLazy) {
                        modellist.free();
                    }
                    //======================================================
                    host._renderView();
                }
                else {
                    instance._renderSecondTemplate(model);
                }
                delete instance._prevComparator[clientId];
                instance._currentModelHasChanged = false;
            }
            else {
            }
        },

        /**
         * Re-renderes the Model -inside the ViewList- with its editable template (defined by 'editTemplate').
         * @method setModelToEditTemplate
         * @param model {Y.Model | Object} The item from the modellist. May be a Model, or an Object - in case of LazyModelList
         * @since 0.1
        */
        setModelToEditTemplate: function(model) {
            var instance = this,
                host = instance.host,
                modellist = host.get('modelList'),
                comparator = modellist && Y.bind(modellist.comparator, modellist),
                clientId = host.getModelAttr(model, 'clientId'),
                currentMode;

            currentMode = instance._getMode(model);
            if (currentMode !== 3) {
                instance._currentModelHasChanged = false;
                instance._prevComparator[clientId] = comparator && comparator(model);
                instance._prevMode[clientId] = currentMode;
                instance._editModels[clientId] = true;
                delete instance._secondModels[clientId];
                instance._renderEditTemplate(model);
            }
            else {
            }
        },

        /**
         * Re-renderes the Model -inside the ViewList- with its previous template, performing a reverse-rendering. Only the template is
         * restored, thus, if the Model's content is changed, you will see the new Model's content.
         * @method restoreTemplate
         * @param model {Y.Model | Object} The item from the modellist. May be a Model, or an Object - in case of LazyModelList
         * @since 0.1
        */
        restoreTemplate : function(model) {
            var instance = this,
                clientId = instance.host.getModelAttr(model, 'clientId'),
                mode = instance._prevMode[clientId] || 1;

            switch (mode) {
                case 1: instance.setModelToOriginalTemplate(model);
                break;
                case 2: instance.setModelToSecondTemplate(model);
                break;
                case 3: instance.setModelToEditTemplate(model);
                break;
            }
        },

        /**
         * Cleans up bindings and removes plugin
         * @method destructor
         * @protected
         * @since 0.1
        */
        destructor : function() {
            var instance = this;

            instance._clearEventhandlers();
            instance._initialEditAttrs = {};
            instance._secondModels = {};
            instance._editModels = {};
            instance._prevMode = {};
            instance._prevComparator = {};
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
            var instance = this,
                host = instance.host,
                boundingBox = host.get('boundingBox'),
                eventhandlers = instance._eventhandlers;

            eventhandlers.push(
                boundingBox.delegate(
                    'click',
                    function(e) {
                        var modelNode = e.currentTarget,
                            itsatabkeymanager = modelNode.itsatabkeymanager;
                        if (itsatabkeymanager) {
                            itsatabkeymanager.retreiveFocus();
                            // this will automaticly focus the host=view-instance
                        }
                    },
                    '.itsa-model'
                )
            );
            eventhandlers.push(
                host.after(
                    'itsaeditmodel:focusnext',
                    function(e) {
                        var inputnode = e.inputNode,
                            modelnode = inputnode.get('parentNode'),
                            itsatabkeymanager;
                        while (modelnode && !modelnode.hasClass('itsa-model')) {
                            modelnode = modelnode.get('parentNode');
                        }
                        if (modelnode) {
                            itsatabkeymanager = modelnode.itsatabkeymanager;
                            if (itsatabkeymanager && modelnode.hasClass('itsa-model-focus')) {
                                itsatabkeymanager.next();
                            }
                            else {
                            }
                        }
                        else {
                        }
                    }
                )
            );
            eventhandlers.push(
                host.after(
                    'model:resetclick',
                    function(e) {
                        var model = e.target, // NOT e.currentTarget: that is the (scroll)View-instance (?)
                            options = {fromEditModel: true}, // set Attribute with option: '{fromEditModel: true}'
                                                             // --> now the view knows it must not re-render.
                            initialEditAttrs = instance._initialEditAttrs[model.get('clientId')],
                            buttonNode;
                        if (initialEditAttrs) {
                            model.setAttrs(initialEditAttrs, options);
                            if (instance._getMode(model)===3) {
                                instance.setModelToEditTemplate(model);
                                buttonNode = Y.one('#'+e.elementId);
                                if (buttonNode) {
                                    buttonNode.focus();
                                }
                            }
                            if (host.modelIsSelected(model)) {
                                host._fireSelectedModels();
                            }
                        }
                    }
                )
            );
            eventhandlers.push(
                host.after(
                    ['itsaeditmodel:editmodelConfigAttrsChange', 'itsaeditmodel:templateChange'],
                    function() {
                        if (instance.get('modelsEditable')) {
                            host._renderView(null, null);
                        }
                    }
                )
            );
            eventhandlers.push(
                instance.after(
                    'modelsEditableChange',
                    Y.bind(host._renderView, host, null, null)
                )
            );
            eventhandlers.push(
                instance.after(
                    'editmodelConfigAttrsChange',
                    function() {
                        // force recompiling of the editrenderer on next rendercall:
                        instance._editTempl = null;
                    }
                )
            );
            eventhandlers.push(
                host.after(
                    'model:change',
                    function(e) {
                        var model = e.target, // NOT e.currentTarget: that is the (scroll)View-instance (?)
                            modelNode;
                        if (instance._getMode(model)===3) {
                            instance._currentModelHasChanged = true;
                            modelNode = host.getNodeFromModel(model, 0);
                            modelNode.all('.'+ITSAFORMELEMENT_CHANGED_CLASS).removeClass(ITSAFORMELEMENT_CHANGED_CLASS);

                        }
                    }
                )
            );
            eventhandlers.push(
                host.on(
                    'model:destroy',
                    function(e) {
                        var model = e.target; // NOT e.currentTarget: that is the (scroll)View-instance (?)
                        delete instance._editModels[model.get('clientId')];
                        if (host.modelIsSelected(model)) {
                            host.unselectModels(model, false, true); // will fire an event itself
                        }
                    }
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
            YArray.each(
                this._eventhandlers,
                function(item){
                    item.detach();
                }
            );
        },

        /**
         * Returns the current 'Mode' of the Models rendering. Meaning: what Template is currently being used. This might be:<br />
         * 1: original template<br />
         * 2: secondTemplate<br />
         * 3: editTemplate<br />
         *
         * @method _getMode
         * @private
         * @param model {Y.Model | Object} The item from the modellist. May be a Model, or an Object - in case of LazyModelList
         * @since 0.1
         *
        */
        _getMode : function(model) {
            var instance = this,
                modelsEditable = instance.get('modelsEditable'),
                clientId = instance.host.getModelAttr(model, 'clientId'),
                mode = 1;

            if (instance._secondModels[clientId]) {
                mode = 2;
            }
            if (modelsEditable && instance._editModels[clientId]) {
                mode = 3;
            }
            return mode;
        },

        /**
         * Returns the active modelengine that is used by the specified Model.<br />
         * <i>This method is not used internally, but is called by ITSAScrollViewModellist and ITSAViewModellist</i>
         * @method _getModelEngine
         * @param model {Y.Model|Object} The item from the modellist. May be a Model, or an Object - in case of LazyModelList
         * @param modelTemplate {String} The 'modelTemplate' used by the host
         * @param compiledModelEngine {Function} Host's compiled 'modelTemplate', compiled using Y.Template.Micro
         * @private
         * @protected
         * @since 0.1
         *
        */
        _getModelEngine : function(model, modelTemplate, compiledModelEngine) {
            var instance = this,
                host = instance.host,
                modus = instance._getMode(model),
                modelJSON, engine;

            switch (modus) {
                case 1: // default: the standard modelTemplate
                    modelJSON = host.getModelToJSON(model);
                    engine = compiledModelEngine ? compiledModelEngine(modelJSON) : Lang.sub(modelTemplate, modelJSON);
                break;
                case 2: // secondTemplate
                    engine = instance._altTempl(model);
                break;
                case 3: // editTemplate
                    engine = instance._editTempl(model);
                break;
            }
            return engine;
        },

        /**
         * Re-renderes the Model with the editTemplate inside the ViewList.
         *
         * @method _renderEditTemplate
         * @private
         * @param model {Y.Model | Object} The item from the modellist. May be a Model, or an Object - in case of LazyModelList
         * @since 0.1
         *
        */
        _renderEditTemplate: function(model) {
            var instance = this,
                host = instance.host,
                modelNode, modelInstance, revivedModel, usemodel;

            modelNode = (Lang.isNumber(model) ? host.getNodeFromIndex(model, 0) : host.getNodeFromModel(model, 0));
            if (modelNode) {
                if (ISMICROTEMPLATE(instance.get('template')) || (instance._secondTempl && instance._secondTemplIsMicro)) {
                    modelNode.cleanup();
                }
                Y.use('gallery-itsatabkeymanager', function(Y) {
                    modelNode.plug(Y.Plugin.ITSATabKeyManager);
                });
                // IMPORTANT: model could be an object in case of LazyModelList
                // we need to revive it first
                modelInstance = model.get && (typeof model.get === 'function');
                if (!modelInstance && host._listLazy) {
                    revivedModel = host.get('modelList').revive(model);
                }
                usemodel = revivedModel || model;
                instance._initialEditAttrs[usemodel.get('clientId')] = usemodel.getAttrs();
                if (!usemodel.itsaeditmodel) {
                    Y.use('gallery-itsaeditmodel', function(Y) {
                        usemodel.plug(Y.Plugin.ITSAEditModel, instance.get('configForEditModel'));
                        if (!instance._editTempl) {
                            instance._setEditTemplate(instance.get('editTemplate') || usemodel.itsaeditmodel.get('template')
                                                                                   || ERROR_MESSAGE_NOTEMPLATE);
                        }
                        modelNode.setHTML(instance._editTempl(usemodel));
                    });
                }
                else {
                    if (!instance._editTempl) {
                        instance._setEditTemplate(instance.get('editTemplate') || usemodel.itsaeditmodel.get('template')
                                                                               || ERROR_MESSAGE_NOTEMPLATE);
                    }
                    modelNode.setHTML(instance._editTempl(usemodel));
                }
            }
            else {
            }
        },

        /**
         * Re-renderes the Model with the secondTemplate inside the ViewList.
         *
         * @method _renderSecondTemplate
         * @private
         * @param model {Y.Model | Object} The item from the modellist. May be a Model, or an Object - in case of LazyModelList
         * @since 0.1
         *
        */
        _renderSecondTemplate: function(model) {
            var instance = this,
                host = instance.host,
                alternateTemplate = instance._secondTempl || host._templFns.template,
                modelNode;

            modelNode = (Lang.isNumber(model) ? host.getNodeFromIndex(model, 0) : host.getNodeFromModel(model, 0));
            if (modelNode && alternateTemplate) {
                if (ISMICROTEMPLATE(instance.get('template')) || model.itsaeditmodel) {
                    modelNode.cleanup();
                }
                modelNode.setHTML(alternateTemplate(model));
            }
            else {
            }
        },

        /**
         * Re-renderes the Model with the original template inside the ViewList.
         *
         * @method _renderOriginalTemplate
         * @private
         * @param model {Y.Model | Object} The item from the modellist. May be a Model, or an Object - in case of LazyModelList
         * @since 0.1
         *
        */
        _renderOriginalTemplate: function(model) {
            var instance = this,
                host = instance.host,
                modelNode;

            modelNode = (Lang.isNumber(model) ? host.getNodeFromIndex(model, 0) : host.getNodeFromModel(model, 0));
            if (modelNode) {
                if ((instance._secondTempl && instance._secondTemplIsMicro) || model.itsaeditmodel) {
                    modelNode.cleanup();
                }
                // delete objectproperty from instance._secondModelsBEFORE calling host._templFns.template,
                // for the latter depends on whether the definition is there.
                modelNode.setHTML(host._templFns.template(model));
            }
            else {
            }
        },

        /**
         * compiled the editTemplate into private variable _editTempl()
         *
         * @method _setEditTemplate
         * @param template {String} The new secondTemplate to be used. Must be of type Y.Lang.sub() or Y.Template.Micro()
         * @private
         * @since 0.1
         *
        */
        _setEditTemplate: function(template) {
            var instance = this,
                host = instance.host,
                compiledModelEngine, editTemplateIsMicro;

            if (!template || (template==='')) {
                instance._editTempl = host._templFns.template;
            }
            else {
                editTemplateIsMicro = instance._editTemplIsMicro = ISMICROTEMPLATE(template);
                if (editTemplateIsMicro) {
                    compiledModelEngine = Y.TemplateMicro.compile(template);
                    instance._editTempl = function(model) {
                        var modelInstance = model.get && (model.get === 'function');
                        if (!modelInstance && host._listLazy) {
                            model = host.get('modelList').revive(model);
                            if (!model.itsaeditmodel) {
                                model.plug(Y.Plugin.ITSAEditModel, instance.get('configForEditModel'));
                            }
                        }
                        return compiledModelEngine(model.itsaeditmodel.toJSON(instance.get('editmodelConfigAttrs')
                               || model.itsaeditmodel.get('editmodelConfigAttrs')));
                    };
                }
                else {
                    instance._editTempl = function(model) {
                        var modelInstance = model.get && (model.get === 'function');
                        if (!modelInstance && host._listLazy) {
                            model = host.get('modelList').revive(model);
                            if (!modelInstance && host._listLazy) {
                                model.plug(Y.Plugin.ITSAEditModel, instance.get('configForEditModel'));
                            }
                        }
                        return Lang.sub(template, model.itsaeditmodel.toJSON(instance.get('editmodelConfigAttrs')
                               || model.itsaeditmodel.get('editmodelConfigAttrs')));
                    };
                }
            }
        },

        /**
         * compiled the secondTemplate into private variable _secondTempl()
         *
         * @method _setSecondTemplate
         * @param template {String} The new secondTemplate to be used. Must be of type Y.Lang.sub() or Y.Template.Micro()
         * @private
         * @since 0.1
         *
        */
        _setSecondTemplate: function(val) {
            var instance = this,
                host = instance.host,
                compiledModelEngine, alternateTemplateIsMicro;

            if (!val || (val==='')) {
                instance._secondTempl = null;
            }
            else {
                alternateTemplateIsMicro = instance._secondTemplIsMicro = ISMICROTEMPLATE(val);
                if (alternateTemplateIsMicro) {
                    compiledModelEngine = Y.TemplateMicro.compile(val);
                    instance._secondTempl = function(model) {
                        return compiledModelEngine(host.getModelToJSON(model));
                    };
                }
                else {
                    instance._secondTempl = function(model) {
                        return Lang.sub(val, host.getModelToJSON(model));
                    };
                }
            }
        },

        /**
         * Unplugs both Y.Plugin.ITSAEditModel as well as Y.Plugin.ITSATabKeyManager from the model.
         *
         * @method _unplugITSAEditModel
         * @param template {String} The new secondTemplate to be used. Must be of type Y.Lang.sub() or Y.Template.Micro()
         * @param model {Y.Model || Object} The model (or revived model) from the modellist/lazymodellist.
         * @param cliendId {Int} Model's clientId
         * @private
         * @since 0.1
         *
        */
        _unplugITSAEditModel : function(model, clientId) {
            var instance = this,
                host = instance.host,
                modelInstance, modelNode;

            // IMPORTANT: model could be an object in case of LazyModelList
            // we need to revive it first
            modelInstance = model.get && (typeof model.get === 'function');
            if (!modelInstance && host._listLazy) {
                model = host.get('modelList').revive(model);
            }
            if (model.unplug) {
                model.unplug('itsaeditmodel');
            }
            delete instance._editModels[clientId];
            modelNode = (Lang.isNumber(model) ? host.getNodeFromIndex(model, 0) : host.getNodeFromModel(model, 0));
            if (modelNode) {
                modelNode.unplug('itsatabkeymanager');
            }
        }

    }, {
        NS : 'itsacmtemplate',
        ATTRS : {

            /**
             * The editmodelConfigAttrs to be used in the editable mode. See Y.Plugin.ITSAEditModel (gallery-itsaeditmodel)
             * for further specifications. If this attribute is empty, the plugin will search for 'configForEditModel.editmodelConfigAttrs',
             * which might as well define the config. However, it is preferable to define the configAttrs directly within 'editmodelConfigAttrs',
             * because through this attribute are able to change the configAttrs later on. (The one within 'configForEditModel.editmodelConfigAttrs'
             * is only read during initialisation).
             *
             * @attribute editmodelConfigAttrs
             * @type {Object}
             * @default false
             * @since 0.1
             */
            editmodelConfigAttrs: {
                value: {},
                validator: function(v){
                    return Lang.isObject(v);
                }
            },

            /**
             * The <b>config</b> that is passed through directly into Y.Plugin.ITSAEditModel. Event though you can define
             * 'configForEditModel.template' and 'configForEditModel.editmodelConfigAttrs', the referred way for those to properties
             * is to set them directly within this wplugin-level (see 'editTemplate' and 'editmodelConfigAttrs' for the why).
             *
             * @attribute configForEditModel
             * @type {Boolean}
             * @default false
             * @since 0.1
             */
            configForEditModel: {
                value: null,
                validator: function(v){
                    return Lang.isObject(v);
                }
            },

            /**
             * The template to be used in the editable mode. Use either Y.Lang.sub or Y.Template.Micor syntax. If this attribute is empty,
             * the plugin will search for 'configForEditModel.template', which might as well define the editTemplate. However, it is preferable
             * to define the editable template directly within 'editTemplate', because through this attribute are able to change the
             * editable-template later on. (The one within 'configForEditModel.editTemplate' is only read during initialisation).
             *
             * @attribute editTemplate
             * @type {Boolean}
             * @default false
             * @since 0.1
             */
            editTemplate: {
                value: null,
                validator: function(v){
                    return (typeof v === 'string');
                },
                setter: '_setEditTemplate'
            },

            /**
             * Makes the View to render the editable-version of the Model. Only when the Model has <b>Y.Plugin.ITSAEditModel</b> plugged in.
             *
             * @attribute modelsEditable
             * @type {Boolean}
             * @default false
             * @since 0.1
             */
            modelsEditable: {
                value: false,
                lazyAdd: false,
                validator: function(v){
                    return Lang.isBoolean(v);
                }
            },

            /**
             * Defines the template to be used as 'secondTemplate'. Will be used for all Models that are rendered by setModelToSecondTemplate()
             *
             * @attribute secondTemplate
             * @type {Boolean}
             * @default false
             * @since 0.1
             */
            secondTemplate: {
                value: null,
                validator: function(v){
                    return (typeof v === 'string');
                },
                setter: '_setSecondTemplate'
            }

        }
    }
);

}, '@VERSION@', {
    "requires": [
        "yui-base",
        "node-core",
        "base-base",
        "base-build",
        "plugin-base",
        "pluginhost-base",
        "oop",
        "template-micro"
    ]
});