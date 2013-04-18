'use strict';

/**
 * Plugin Y.Plugin.ChangeModelTemplate
 *
 * Extention to ITSAModellistViewExtention that makes it possible to toggle templates per model.
 * This might be useful if your (scroll)viewModellist has many rendered models, where you need to toggle
 * some of them. For instance: to transform from a 'normal'-state into 'editable'-state.
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
    ISMICROTEMPLATE = function(template) {
        var microTemplateRegExp = /<%(.+)%>/;
        return microTemplateRegExp.test(template);
    };

Y.namespace('Plugin').ITSAChangeModelTemplate = Y.Base.create('itsachangemodeltemplate', Y.Plugin.Base, [], {

        /**
         * Internal reference to the compiled alternate template.
         * @property _altTempl
         * @private
         * @default null
         * @type Function
        */
        _altTempl : null,

        /**
         * Internal flag to state whether the alternate template is of the type Y.Template.Micro
         * @property _altTemplIsMicro
         * @private
         * @default null
         * @type Boolean
        */
        _altTemplIsMicro : null,


        _editTempl : null,

        _editTemplIsMicro : null,

        _initialEditAttrs : null,

        _alternateModels : {},

        _editModels : {},

        _prevMode : {},

        _eventhandlers : [],

        host : null,

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

            Y.log('initializer', 'info', 'Itsa-ChangeModelTemplate');
            instance.host = host = instance.get('host');
            instance._bindUI();
        },

        /**
         * Cleans up bindings and removes plugin
         * @method destructor
         * @param model {Y.Model}
         * @param [save] {Boolean} in case you came from EditTemplate: save the changes (if present)
         * @since 0.1
        */
        setModelToOriginalTemplate: function(model, save) {
            var instance = this,
                clientId = instance.host.getModelAttr(model, 'clientId'),
                currentMode;

            currentMode = instance._getMode(model);
            if (currentMode !== 1) {
                Y.log('setModelToOriginalTemplate', 'info', 'Itsa-ChangeModelTemplate');
                if ((instance._getMode(model)===3) && save) {
                    model.itsaeditmodel.save();
                }
                instance._prevMode[clientId] = instance._getMode(model);
                delete instance._alternateModels[clientId];
                if (instance._editModels[clientId]) {
                    instance._unplugItsaeditmodel(model, clientId);
                }
                instance._renderOriginalTemplate(model);
            }
            else {
                Y.log('setModelToOriginalTemplate will not proceed: already original template', 'info', 'Itsa-ChangeModelTemplate');
            }
        },

        /**
         * Cleans up bindings and removes plugin
         * @method destructor
         * @param model {Y.Model}
         * @param [save] {Boolean} in case you came from EditTemplate: save the changes (if present)
         * @since 0.1
        */
        setModelToSecondTemplate: function(model, save) {
            var instance = this,
                clientId = instance.host.getModelAttr(model, 'clientId'),
                currentMode;

            currentMode = instance._getMode(model);
            if (currentMode !== 2) {
                Y.log('setModelToSecondTemplate', 'info', 'Itsa-ChangeModelTemplate');
                if ((instance._getMode(model)===3) && save) {
                    model.itsaeditmodel.save();
                }
                instance._prevMode[clientId] = instance._getMode(model);
                instance._alternateModels[clientId] = true;
                if (instance._editModels[clientId]) {
                    instance._unplugItsaeditmodel(model, clientId);
                }
                instance._renderSecondTemplate(model);
            }
            else {
                Y.log('setModelToSecondTemplate will not proceed: already original template', 'info', 'Itsa-ChangeModelTemplate');
            }
        },

        setModelToEditTemplate: function(model) {
            var instance = this,
                clientId = instance.host.getModelAttr(model, 'clientId'),
                currentMode;

            currentMode = instance._getMode(model);
            if (currentMode !== 3) {
                Y.log('setModelToEditTemplate', 'info', 'Itsa-ChangeModelTemplate');
                instance._prevMode[clientId] = currentMode;
                instance._editModels[clientId] = true;
                delete instance._alternateModels[clientId];
                instance._renderEditTemplate(model);
            }
            else {
                Y.log('setModelToEditTemplate will not proceed: already original template', 'info', 'Itsa-ChangeModelTemplate');
            }
        },

        /**
         * Cleans up bindings and removes plugin
         * @method destructor
         * @param model {Y.Model}
         * @param [save] {Boolean} in case you came from EditTemplate: save the changes (if present)
         * @since 0.1
        */
        restoreTemplate : function(model, save) {
            var instance = this,
                clientId = instance.host.getModelAttr(model, 'clientId'),
                mode = instance._prevMode[clientId] || 1;

            Y.log('restoreTemplate restore to mode '+mode, 'info', 'Itsa-ChangeModelTemplate');
            switch (mode) {
                case 1: instance.setModelToOriginalTemplate(model, save);
                break;
                case 2: instance.setModelToSecondTemplate(model, save);
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
            Y.log('destructor', 'info', 'Itsa-ChangeModelTemplate');
            this._clearEventhandlers();
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

            Y.log('_bindUI', 'info', 'Itsa-ChangeModelTemplate');
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
                                Y.log('focus to next field', 'info', 'Itsa-ViewModel');
                                itsatabkeymanager.next();
                            }
                            else {
                                Y.log('No focus to next field: Y.Plugin.ITSATabKeyManager not plugged in', 'info', 'Itsa-ViewModel');
                            }
                        }
                        else {
                            Y.log('No focus to next field: modelnode not found', 'info', 'Itsa-ViewModel');
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
                            buttonNode;
                        model.setAttrs(instance._initialEditAttrs, options);
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
                host.after(
                    'model:change',
                    function(e) {
                        var model = e.target, // NOT e.currentTarget: that is the (scroll)View-instance (?)
                            modelNode;
                        if (instance._getMode(model)===3) {
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
            Y.log('_clearEventhandlers', 'info', 'Itsa-ChangeModelTemplate');
            YArray.each(
                this._eventhandlers,
                function(item){
                    item.detach();
                }
            );
        },

        _getMode : function(model) {
            var instance = this,
                modelsEditable = instance.get('modelsEditable'),
                clientId = instance.host.getModelAttr(model, 'clientId'),
                mode = 1;

            Y.log('_getMode', 'info', 'Itsa-ChangeModelTemplate');
            if (instance._alternateModels[clientId]) {
                mode = 2;
            }
            if (modelsEditable && instance._editModels[clientId]) {
                mode = 3;
            }
            return mode;
        },

        _getModelEngine : function(model, modelTemplate, compiledModelEngine) {
            var instance = this,
                host = instance.host,
                modus = instance._getMode(model),
                modelJSON, engine;

            Y.log('_getModelEngine', 'info', 'Itsa-ModellistViewExtention');
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
         * Changes the template that is used for rendering this model to its second-version -defined with 'setSecondTemplate'.
         * Will do a re-render for only the modelnode that was bound to the model.
         *
         * @method renderSecondTemplate
         * @param {Y.Model|Int} model Model-instance or index of the model-instance in the scrollview.
         * @since 0.1
         *
        */
        _renderEditTemplate: function(model) {
            var instance = this,
                host = instance.host,
                modelNode, modelInstance, revivedModel, usemodel, modelList;

            Y.log('_renderEditTemplate', 'info', 'Itsa-ChangeModelTemplate');
            modelNode = (Lang.isNumber(model) ? host.getNodeFromIndex(model, 0) : host.getNodeFromModel(model, 0));
            if (modelNode) {
                if (ISMICROTEMPLATE(instance.get('template')) || (instance._altTempl && instance._altTemplIsMicro)) {
                    modelNode.cleanup();
                }
                Y.use('gallery-itsatabkeymanager', function(Y) {
                    modelNode.plug(Y.Plugin.ITSATabKeyManager);
                });
                // IMPORTANT: model could be an object in case of LazyModelList
                // we need to revive it first
                modelInstance = model.get && (typeof model.get === 'function');
                if (!modelInstance) {
                    modelList = host.get('modelList');
                    revivedModel = modelList.revive(model);
                }
                usemodel = revivedModel || model;
                instance._initialEditAttrs = usemodel.getAttrs();
                if (!usemodel.itsaeditmodel) {
                    Y.use('gallery-itsaeditmodel', function(Y) {
                        usemodel.plug(Y.Plugin.ITSAEditModel, instance.get('editmodelConfig'));
                        if (!instance._editTempl) {
                            instance._setEditTemplate(usemodel.itsaeditmodel.get('template'));
                        }
                        modelNode.setHTML(instance._editTempl(usemodel));
                    });
                }
                else {
                    modelNode.setHTML(instance._editTempl(usemodel));
                }
            }
            else {
                Y.log('_renderEditTemplate could not proceed: no valid model found', 'warn', 'Itsa-ChangeModelTemplate');
            }
        },

        /**
         * Changes the template that is used for rendering this model to its second-version -defined with 'setSecondTemplate'.
         * Will do a re-render for only the modelnode that was bound to the model.
         *
         * @method _renderSecondTemplate
         * @param {Y.Model|Int} model Model-instance or index of the model-instance in the scrollview.
         * @private
         * @since 0.1
         *
        */
        _renderSecondTemplate: function(model) {
            var instance = this,
                host = instance.host,
                alternateTemplate = instance._altTempl || host._templFns.template,
                modelNode;

            Y.log('_renderSecondTemplate', 'info', 'Itsa-ChangeModelTemplate');
            modelNode = (Lang.isNumber(model) ? host.getNodeFromIndex(model, 0) : host.getNodeFromModel(model, 0));
            if (modelNode && alternateTemplate) {
                if (ISMICROTEMPLATE(instance.get('template')) || model.itsaeditmodel) {
                    modelNode.cleanup();
                }
                modelNode.setHTML(alternateTemplate(model));
            }
            else {
                Y.log('_renderSecondTemplate could not proceed: no valid model found', 'warn', 'Itsa-ChangeModelTemplate');
            }
        },

        /**
         * Restores the standard-template that is used for rendering this model. Will do a re-render for only the modelnode
         * that was bound to the model. Restoring is useful after changing the template.
         *
         * @method _renderOriginalTemplate
         * @param {Y.Model|Int} model Model-instance or index of the model-instance in the scrollview.
         * @since 0.1
         *
        */
        _renderOriginalTemplate: function(model) {
            var instance = this,
                host = instance.host,
                modelNode;

            Y.log('_renderOriginalTemplate', 'info', 'Itsa-ChangeModelTemplate');
            modelNode = (Lang.isNumber(model) ? host.getNodeFromIndex(model, 0) : host.getNodeFromModel(model, 0));
            if (modelNode) {
                if ((instance._altTempl && instance._altTemplIsMicro) || model.itsaeditmodel) {
                    modelNode.cleanup();
                }
                // delete objectproperty from instance._alternateModelsBEFORE calling host._templFns.template,
                // for the latter depends on whether the definition is there.
                modelNode.setHTML(host._templFns.template(model));
            }
            else {
                Y.log('_renderOriginalTemplate could not proceed: no valid model found', 'warn', 'Itsa-ChangeModelTemplate');
            }
        },

        /**
         * Set the alternate template that will be used when changing the template.
         *
         * @method setSecondTemplate
         * @param {String} template The new template to be used. Must be of type Y.Lang.sub() or Y.Template.Micro()
         * @since 0.1
         *
        */
        _setEditTemplate: function(template) {
            var instance = this,
                compiledModelEngine, editTemplateIsMicro;

            Y.log('_setEditTemplate', 'info', 'Itsa-ChangeModelTemplate');
            if (!template || (template==='')) {
                instance._editTempl = instance.host._templFns.template;
            }
            else {
                editTemplateIsMicro = instance._editTemplIsMicro = ISMICROTEMPLATE(template);
                if (editTemplateIsMicro) {
                    compiledModelEngine = Y.TemplateMicro.compile(template);
                    instance._editTempl = function(model) {
                        return compiledModelEngine(model.itsaeditmodel.toJSON(model.itsaeditmodel.get('editmodelConfigAttrs')));
                    };
                }
                else {
                    instance._editTempl = function(model) {
                        return Lang.sub(template, model.itsaeditmodel.toJSON(model.itsaeditmodel.get('editmodelConfigAttrs')));
                    };
                }
            }
        },

        /**
         * Setter for 'secondTemplate', the alternate template that will be used when changing the template.
         *
         * @method _setSecondTemplate
         * @param val {String} The new template to be used.
         * @since 0.1
         *
        */
        _setSecondTemplate: function(val) {
            var instance = this,
                host = instance.host,
                compiledModelEngine, alternateTemplateIsMicro;

            Y.log('_setSecondTemplate', 'info', 'Itsa-ChangeModelTemplate');
            if (!val || (val==='')) {
                instance._altTempl = null;
            }
            else {
                alternateTemplateIsMicro = instance._altTemplIsMicro = ISMICROTEMPLATE(val);
                if (alternateTemplateIsMicro) {
                    compiledModelEngine = Y.TemplateMicro.compile(val);
                    instance._altTempl = function(model) {
                        return compiledModelEngine(host.getModelToJSON(model));
                    };
                }
                else {
                    instance._altTempl = function(model) {
                        return Lang.sub(val, host.getModelToJSON(model));
                    };
                }
            }
        },

        _unplugItsaeditmodel : function(model, clientId) {
            var instance = this,
                host = instance.host,
                modelInstance, modelNode;

            Y.log('_unplugItsaeditmodel', 'info', 'Itsa-ChangeModelTemplate');
            // IMPORTANT: model could be an object in case of LazyModelList
            // we need to revive it first
            modelInstance = model.unplug && (typeof model.unplug === 'function');
            if (modelInstance) {
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

            editmodelConfig: {
                value: null,
                validator: function(v){
                    return Lang.isObject(v);
                }
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
             * Makes the View to render the editable-version of the Model. Only when the Model has <b>Y.Plugin.ITSAEditModel</b> plugged in.
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