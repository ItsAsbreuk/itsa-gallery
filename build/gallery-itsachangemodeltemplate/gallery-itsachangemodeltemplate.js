YUI.add('gallery-itsachangemodeltemplate', function (Y, NAME) {

'use strict';

/**
 * Plugin Y.Plugin.ChangeModelTemplate
 *
 * Plugin for ITSAViewModellist and ITSAScrollViewModellist that makes it possible to toggle templates per model.
 * This might be useful if your (scroll)viewModellist has many rendered models, where you need to toggle
 * some of them. There are three different states:
 *
 * 1) 'originalTemplate' (standard defined by the host)
 * 2) 'secondTemplate' (can be set up within this plugin: for example to define an 'extended' view for the Models)
 * 3) 'editTemplate' (can be set up within this plugin: to edit the Models)
 *
 * Be aware that 'secondTemplate' and 'editTemplate' are used for rendering all Models.
 *
 * To make the models editable, this plugin uses gallery-itsaeditmodel under the hood. The attribute 'configForEditModel' is passed
 * through to Y.Plugin.ITSAEditModel. Should you use a LazyModelList, then the editable Object is revived into a Model. For performancereason,
 * the revived models will not be freed: you may want to do this yourself.
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
    YTemplateMicro = Y.Template.Micro,
    FORMELEMENT_CLASS = 'yui3-itsaformelement',
    ITSAFORMELEMENT_CHANGED_CLASS = FORMELEMENT_CLASS + '-changed',
    FORMELEMENT_BUTTON_ORIGINALTEMPLATE = 'originaltemplate',
    FORMELEMENT_BUTTON_SECONDTEMPLATE = 'secondtemplate',
    FORMELEMENT_BUTTON_EDITTEMPLATE = 'edittemplate',
    MODEL_CLASS = 'itsa-model',
    ERROR_MESSAGE_NOTEMPLATE = 'Error: Attribute editTemplate is undefined',
    ERROR_MESSAGE_LOAD_ITSA_EDITMODEL_MODULE = 'Error: gallery-itsaeditmodel should be loaded in the loader',
    ISMICROTEMPLATE = function(template) {
        var microTemplateRegExp = /<%(.+)%>/;
        return microTemplateRegExp.test(template);
    },
   /**
     * Fired after the plugin is pluggedin and ready to be referenced by the host. This is LATER than after the 'init'-event,
     * because the latter will be fired before the namespace Model.itsaeditmodel exists.
     * @event pluggedin
     * @since 0.1
    **/
    EVT_PLUGGEDIN = 'pluggedin',
   /**
     * Fired after the plugin is pluggedin and ready to be referenced by the host. This is LATER than after the 'init'-event,
     * because the latter will be fired before the namespace Model.itsaeditmodel exists.
     * @event templateChange
     * @param e {EventFacade} Event Facade including:
     * @param e.prevVal {String} the name of the previous template: 'originalTemplate' or 'secondTemplate' or 'editTemplate'
     * @param e.newVal {String} the name of the new template: 'originalTemplate' or 'secondTemplate' or 'editTemplate'
     * @since 0.1
    **/
    EVT_TEMPLATECHANGE = 'templateChange',
    NAME_ORIGINAL_TEMPLATE = 'originalTemplate',
    NAME_SECOND_TEMPLATE = 'secondTemplate',
    NAME_EDIT_TEMPLATE = 'editTemplate';

Y.namespace('Plugin').ITSAChangeModelTemplate = Y.Base.create('itsachangemodeltemplate', Y.Plugin.Base, [], {

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


            /**
             * Reference to the plugins host.
             * @property host
             * @default plugins host
             * @type Object
            */
            host = instance.host = instance.get('host');

            /**
             * Internal reference to the compiled alternate template.
             * @property _secondTempl
             * @private
             * @default null
             * @type Function
            */
            instance._secondTempl = null;

            /**
             * Internal flag to state whether the alternate template is of the type Y.Template.Micro
             * @property _secondTemplIsMicro
             * @private
             * @default null
             * @type Boolean
            */
            instance._secondTemplIsMicro = null;


            /**
             * Internal reference to the compiled edit template.
             * @property _editTempl
             * @private
             * @default null
             * @type Function
            */
            instance._editTempl = null;

            /**
             * Internal flag to state is the edittemplate is a microtemplate
             * @property _editTemplIsMicro
             * @private
             * @default null
             * @type Boolean
            */
            instance._editTemplIsMicro = null;

            /**
             * Internal backuplist of the Models attributes, used when the editdata needs to be reset.
             * @property _initialEditAttrs
             * @private
             * @default {}
             * @type Object
            */
            instance._initialEditAttrs = {};

            /**
             * Internal backuplist to keep track of which models live in the state of the secondTemplate
             * @property _secondModels
             * @private
             * @default {}
             * @type Object
            */
            instance._secondModels = {};

            /**
             * Internal backuplist to keep track of which models live in the state of the editTemplate
             * @property _editModels
             * @private
             * @default {}
             * @type Object
            */
            instance._editModels = {};

            /**
             * Internal backuplist to keep track of the previous Mode of the Models, to enable restore the template to previous state.
             * @property _prevMode
             * @private
             * @default {}
             * @type Object
            */
            instance._prevMode = {};

            /**
             * Internal list of all eventhandlers bound by this widget.
             * @property _eventhandlers
             * @private
             * @default []
             * @type Array
            */
            instance._eventhandlers = [];

            /**
             * Internal flag-list that tells whether -in editMode- the user has changed the content of each Model. This way the module knows it
             * doesn't need to do a thorough re-render of the list.
             * @property _currentModelHasChanged
             * @private
             * @default {}
             * @type Object
            */
            instance._currentModelHasChanged = {};

            /**
             * Internal flag-list that tells whether new Models may change their template. New Models would go to their 'newModelMode' by default,
             * but when clicked on 'close' or 'save' they must be able to go to the originalTemplate, even if they don't have an id yet.
             * @property _newModelCanChangeTemplate
             * @private
             * @default {}
             * @type Object
            */
            instance._newModelCanChangeTemplate = {};

           /**
            * Internal reference to Y.later timerobject that is used to fire a 'pluggedin'-event once 'itsaeditmodel' is available on the host.
            * @property _fireEventTimer
            * @default null
            * @private
            * @type timer-Object
            */
            instance._fireEventTimer = null;

            /**
             * Internal backuplist of the Models previous 'comparator-result', used determine if the comparators-value has changed after
             * the models has been edited.  This way the module knows it doesn't need to do a thorough re-render of the list.
             * @property _prevComparator
             * @private
             * @default {}
             * @type Object
            */
            instance._prevComparator = {};

            instance._bindUI();

            // now a VERY tricky one...
            // We need to fire an event that tells the plugin is pluged in, but it seemed that when listening in the host,
            // host.itsacmtemplate will be read immediately after the event fired --> this seems to be BEFORE the event is registred!!!
            // So, we wait until the real registering is finished and THEN fire the event!
            instance._fireEventTimer = Y.later(
                50,
                instance,
                function() {
                    if (host.itsacmtemplate) {
                        instance._fireEventTimer.cancel();
                        instance.fire(EVT_PLUGGEDIN);
                    }
                },
                null,
                true
            );
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
                comparator = modellist && modellist.comparator,
                currentMode, prevTemplateName;

            currentMode = instance._getMode(model);
            if (currentMode !== 1) {
                prevTemplateName = (currentMode === 2) ? NAME_SECOND_TEMPLATE : NAME_EDIT_TEMPLATE;
                instance._prevMode[clientId] = instance._getMode(model);
                delete instance._secondModels[clientId];
                delete instance._initialEditAttrs[clientId];
                delete instance._editModels[clientId];
                if (instance._currentModelHasChanged[clientId] && comparator &&
                   (instance._prevComparator[clientId]!==instance._getComparator(modellist, comparator, model))) {
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
                delete instance._currentModelHasChanged[clientId];
                host.fire(EVT_TEMPLATECHANGE, {prevVal: prevTemplateName, newVal: NAME_ORIGINAL_TEMPLATE});
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
                comparator = modellist && modellist.comparator && Y.bind(modellist.comparator, modellist),
                currentMode, prevTemplateName;

            currentMode = instance._getMode(model);
            if (currentMode !== 2) {
                prevTemplateName = (currentMode === 1) ? NAME_ORIGINAL_TEMPLATE : NAME_EDIT_TEMPLATE;
                delete instance._initialEditAttrs[clientId];
                instance._prevMode[clientId] = instance._getMode(model);
                instance._secondModels[clientId] = true;
                delete instance._editModels[clientId];
                if (instance._currentModelHasChanged[clientId] && comparator &&
                   (instance._prevComparator[clientId]!==instance._getComparator(modellist, comparator, model))) {
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
                delete instance._currentModelHasChanged[clientId];
                host.fire(EVT_TEMPLATECHANGE, {prevVal: prevTemplateName, newVal: NAME_SECOND_TEMPLATE});
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
                comparator = modellist && modellist.comparator && Y.bind(modellist.comparator, modellist),
                clientId = host.getModelAttr(model, 'clientId'),
                currentMode, prevTemplateName;
            if (instance.get('modelsEditable')) {
                currentMode = instance._getMode(model);
                if (currentMode !== 3) {
                    prevTemplateName = (currentMode === 1) ? NAME_ORIGINAL_TEMPLATE : NAME_SECOND_TEMPLATE;
                    delete instance._currentModelHasChanged[clientId];
                    instance._prevComparator[clientId] = comparator && instance._getComparator(modellist, comparator, model);
                    instance._prevMode[clientId] = currentMode;
                    instance._editModels[clientId] = true;
                    delete instance._secondModels[clientId];
                    instance._renderEditTemplate(
                        model,
                        function() {
                            var modelNode = (Lang.isNumber(model) ? host.getNodeFromIndex(model, 0) : host.getNodeFromModel(model, 0));
                            if (modelNode && modelNode.itsatabkeymanager) {
                                modelNode.itsatabkeymanager.focusInitialItem();
                            }
                        }
                    );
                    host.fire(EVT_TEMPLATECHANGE, {prevVal: prevTemplateName, newVal: NAME_EDIT_TEMPLATE});
                }
                else {
                }
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
                host = instance.host,
                clientId = host.getModelAttr(model, 'clientId'),
                mode = instance._prevMode[clientId] || 1;

            // In case of new Models, we need to prevent ever falling into the 'newModelMode':
            if (host.isNewModel(model)) {
                instance._newModelCanChangeTemplate[clientId] = true;
            }
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

            if (instance._fireEventTimer) {
                instance._fireEventTimer.cancel();
            }
            instance._clearEventhandlers();
            instance._initialEditAttrs = {};
            instance._secondModels = {};
            instance._editModels = {};
            instance._prevMode = {};
            instance._prevComparator = {};
            instance._currentModelHasChanged = {};
            instance._newModelCanChangeTemplate = {};
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
                eventhandlers = instance._eventhandlers;

            eventhandlers.push(
                host.after(
                    'itsaeditmodel:focusnext',
                    function(e) {
                        var model = e.target.get('host'),
                            modelnode = host.getNodeFromModel(model),
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
                    '*:resetclick',
                    function(e) {
                        var model = e.target, // NOT e.currentTarget: that is the (scroll)View-instance (?)
                            options = {fromEditModel: true}, // set Attribute with option: '{fromEditModel: true}'
                                                             // --> now the view knows it must not re-render completely.
                                                             // however, we MUST re-render the only item.
                            initialEditAttrs;
                        if (model instanceof Y.Model) {
                            initialEditAttrs = instance._initialEditAttrs[model.get('clientId')];
                            if (initialEditAttrs) {
                                model.setAttrs(initialEditAttrs, options);
                                if (instance._getMode(model)===3) {
                                    instance._renderEditTemplate(
                                        model,
                                        function() {
                                            var modelNode = (Lang.isNumber(model) ? host.getNodeFromIndex(model,0) : host.getNodeFromModel(model,0));
                                            if (modelNode && modelNode.itsatabkeymanager) {
                                                modelNode.itsatabkeymanager.focusInitialItem();
                                            }
                                        }
                                    );
                                }
                                if (host.modelIsSelected(model)) {
                                    host._fireSelectedModels();
                                }
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
                host.after(
                    '*:submitclick',
                    function(e) {
                        var model = e.target;
                        if (model instanceof Y.Model) {
                            if (instance.get('restoreOnSubmit')) {
                                instance.restoreTemplate(model);
                            }
                        }
                    }
                )
            );
            eventhandlers.push(
                host.after(
                    '*:saveclick',
                    function(e) {
                        var model = e.target;
                        if (model instanceof Y.Model) {
                            if (instance.get('restoreOnSave')) {
                                instance.restoreTemplate(model);
                            }
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
                    '*:change',
                    function(e) {
                        var model = e.target, // NOT e.currentTarget: that is the (scroll)View-instance (?)
                            modelNode, clientId;
                        if ((model instanceof Y.Model) && (instance._getMode(model)===3)) {
                            clientId = host.getModelAttr(model, 'clientId');
                            instance._currentModelHasChanged[clientId] = true;
                            modelNode = host.getNodeFromModel(model, 0);
                            modelNode.all('.'+ITSAFORMELEMENT_CHANGED_CLASS).removeClass(ITSAFORMELEMENT_CHANGED_CLASS);
                        }
                    }
                )
            );
            eventhandlers.push(
                host.on(
                    '*:destroy',
                    function(e) {
                        var model = e.target; // NOT e.currentTarget: that is the (scroll)View-instance (?)
                        if (model instanceof Y.Model) {
                            delete instance._editModels[model.get('clientId')];
                            if (host.modelIsSelected(model)) {
                                host.unselectModels(model, false, true); // will fire an event itself
                            }
                        }
                    }
                )
            );
            eventhandlers.push(
                host.on(
                    'itsaeditmodel:destroy',
                    function(e) {
                        var model = e.target.get('host');
                        instance.restoreTemplate(model);
                    }
                )
            );
            eventhandlers.push(
                host.get('boundingBox').delegate(
                    'click',
                    function(e) {
                        var button = e.currentTarget,
                            isOriginalTemplate = button.hasClass(FORMELEMENT_BUTTON_ORIGINALTEMPLATE),
                            isSecondTemplate = button.hasClass(FORMELEMENT_BUTTON_SECONDTEMPLATE),
                            isEditTemplate = button.hasClass(FORMELEMENT_BUTTON_EDITTEMPLATE),
                            node, model;
                        if (isOriginalTemplate || isSecondTemplate || isEditTemplate) {
                            if (button.get('tagName')==='A') {
                                e.preventDefault();
                            }
                            node = button.get('parentNode');
                            while (node && !node.hasClass(MODEL_CLASS)) {
                                node = node.get('parentNode');
                            }
                            if (node) {
                                // modelnode found
                                model = host.getModelFromNode(node);
                                if (isOriginalTemplate) {
                                    instance.setModelToOriginalTemplate(model);
                                }
                                else if (isSecondTemplate) {
                                    instance.setModelToSecondTemplate(model);
                                }
                                else if (isEditTemplate) {
                                    instance.setModelToEditTemplate(model);
                                }
                            }
                        }
                    },
                    'button, a'
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
         * Gets the comparator-result of a Modelinstance. Because you might face a LazyModelList with a revived model, you need to
         * excecute 'comparator' with the object in those cases. This Method will take care of a correct calculation of the comparator
         * in all cases.
         * @method _getComparator
         * @param modellist {Y.ModelList|Y.LazyModelList} host's (lazy)modellist
         * @param comparator {Function} host's comparator
         * @param model {Y.Model | Object} The item from the modellist. May be a Model, or an Object - in case of LazyModelList
         * @private
         * @since 0.1
        */
        _getComparator : function(modellist, comparator, model) {
            var instance = this,
                host = instance.host,
                objectFromList;

            if (model) {
                if (host._listLazy && model.get && (typeof model.get === 'function')) {
                    // caution: the revived models might be freed while 'model' is the previous revived model!
                    // indexOf doesn't work then. We need to search by clientId.
                    objectFromList = modellist.getByClientId(model.get('clientId'));
                }
                return comparator(objectFromList || model);
            }
            else {
                return 0;
            }
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
                secondTemplate = instance.get('secondTemplate'),
                editTemplate = instance.get('editTemplate'),
                host = instance.host,
                clientId = host.getModelAttr(model, 'clientId'),
                mode = 1,
                newModelMode, modelInstance, usemodel, revivedModel;
            if (secondTemplate && instance._secondModels[clientId]) {
                mode = 2;
            }
            else if (modelsEditable && editTemplate && instance._editModels[clientId]) {
                mode = 3;
            }
            else if (host.isNewModel(model) && !instance._newModelCanChangeTemplate[clientId]) {
                newModelMode = instance.get('newModelMode');
                if ((newModelMode === 2) && secondTemplate) {
                    mode = 2;
                    instance._secondModels[clientId] = true;
                }
                else if ((newModelMode === 3) && modelsEditable && editTemplate) {
                    mode = 3;
                    // Also: we might need to plugin ItsaEditModel
                    // IMPORTANT: model could be an object in case of LazyModelList
                    // we need to revive it first
                    modelInstance = model.get && (typeof model.get === 'function');
                    if (!modelInstance && host._listLazy) {
                        revivedModel = host.get('modelList').revive(model);
                    }
                    usemodel = revivedModel || model;
                    instance._initialEditAttrs[clientId] = usemodel.getAttrs();
                    if (!usemodel.itsaeditmodel) {
                        Y.use('gallery-itsaeditmodel', function(Y) {
                            usemodel.plug(Y.Plugin.ITSAEditModel, instance.get('configForEditModel'));
                            if (!instance._editTempl) {
                                instance._setEditTemplate(instance.get('editTemplate') || usemodel.itsaeditmodel.get('template') ||
                                                                                          ERROR_MESSAGE_NOTEMPLATE);
                            }
                        });
                    }
                    instance._editModels[clientId] = true;
                }
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
                    engine = instance._secondTempl(model);
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
         * @param callback {Function} callbackfunction to be executed once renerding is finished
         * @since 0.1
         *
        */
        _renderEditTemplate: function(model, callback) {
            var instance = this,
                host = instance.host,
                modelNode, modelInstance, revivedModel, usemodel;

            modelNode = (Lang.isNumber(model) ? host.getNodeFromIndex(model, 0) : host.getNodeFromModel(model, 0));
            if (modelNode) {
                if (ISMICROTEMPLATE(instance.get('template')) || (instance._secondTempl && instance._secondTemplIsMicro)) {
                    modelNode.cleanup();
                }
                Y.use('gallery-itsatabkeymanager', function(Y) {
                    if (!modelNode.itsatabkeymanager) {
                        modelNode.plug(Y.Plugin.ITSATabKeyManager);
                    }
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
                                instance._setEditTemplate(instance.get('editTemplate') || usemodel.itsaeditmodel.get('template') ||
                                                                                          ERROR_MESSAGE_NOTEMPLATE);
                            }
                            modelNode.setHTML(instance._editTempl(usemodel));
                            if (typeof callback === 'function') {
                                callback();
                            }
                        });
                    }
                    else {
                        if (!instance._editTempl) {
                            instance._setEditTemplate(instance.get('editTemplate') || usemodel.itsaeditmodel.get('template') ||
                                                                                      ERROR_MESSAGE_NOTEMPLATE);
                        }
                        modelNode.setHTML(instance._editTempl(usemodel));
                        if (typeof callback === 'function') {
                            callback();
                        }
                    }
                });
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
                    compiledModelEngine = YTemplateMicro.compile(template);
                    instance._editTempl = function(model) {
                        var modelInstance, usemodel, revivedModel;
                        modelInstance = model.get && (typeof model.get === 'function');
                        if (!modelInstance && host._listLazy) {
                            revivedModel = host.get('modelList').revive(model);
                        }
                        usemodel = revivedModel || model;
                        if (!usemodel.itsaeditmodel) {
                            Y.use('gallery-itsaeditmodel', function(Y) {
                                usemodel.plug(Y.Plugin.ITSAEditModel, instance.get('configForEditModel'));
                            });
                        }
                        return usemodel.itsaeditmodel ?
                               compiledModelEngine(usemodel.itsaeditmodel.toJSON(instance.get('editmodelConfigAttrs') ||
                               usemodel.itsaeditmodel.get('editmodelConfigAttrs'))) :
                               ERROR_MESSAGE_LOAD_ITSA_EDITMODEL_MODULE;
                    };
                }
                else {
                    instance._editTempl = function(model) {
                        var modelInstance, usemodel, revivedModel;
                        modelInstance = model.get && (typeof model.get === 'function');
                        if (!modelInstance && host._listLazy) {
                            revivedModel = host.get('modelList').revive(model);
                        }
                        usemodel = revivedModel || model;
                        if (!usemodel.itsaeditmodel) {
                            Y.use('gallery-itsaeditmodel', function(Y) {
                                usemodel.plug(Y.Plugin.ITSAEditModel, instance.get('configForEditModel'));
                            });
                        }
                        return usemodel.itsaeditmodel ?
                               Lang.sub(template, usemodel.itsaeditmodel.toJSON(instance.get('editmodelConfigAttrs') ||
                               usemodel.itsaeditmodel.get('editmodelConfigAttrs'))) :
                               ERROR_MESSAGE_LOAD_ITSA_EDITMODEL_MODULE;
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
                    compiledModelEngine = YTemplateMicro.compile(val);
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
             * Makes the View able to render the editable-version of the Model. By setting to false, you can make a controller to
             * disable the edit-functionality of the whole host-list.
             *
             * @attribute modelsEditable
             * @type {Boolean}
             * @default true
             * @since 0.1
             */
            modelsEditable: {
                value: true,
                lazyAdd: false,
                validator: function(v){
                    return Lang.isBoolean(v);
                }
            },

            /**
             * In what mode 'new' Models will be rendered. This mode should be posible (secondTemplate or editTemplate defined). If not,
             * the default template will be the render-template.<br />
             * 1: original template<br />
             * 2: secondTemplate<br />
             * 3: editTemplate
             *
             * @attribute newModelMode
             * @type {Int}
             * @default 1
             * @since 0.1
             */
            newModelMode: {
                value: 1,
                validator: function(v){
                    return ((typeof v === 'number') && (v>0) && (v<4));
                }
            },

            /**
             * Will resyore the template to its previous form n a save-click.
             *
             * @attribute restoreOnSave
             * @type {Boolean}
             * @default true
             * @since 0.1
             */
            restoreOnSave: {
                value: true,
                validator: function(v){
                    return Lang.isBoolean(v);
                }
            },

            /**
             * Will resyore the template to its previous form n a submit-click.
             *
             * @attribute restoreOnSubmit
             * @type {Boolean}
             * @default true
             * @since 0.1
             */
            restoreOnSubmit: {
                value: true,
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
        "node-event-delegate",
        "base-base",
        "base-build",
        "model",
        "plugin",
        "pluginhost-base",
        "oop",
        "template-micro"
    ]
});
