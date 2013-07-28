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
_yuitest_coverage["build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js",
    code: []
};
_yuitest_coverage["build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js"].code=["YUI.add('gallery-itsachangemodeltemplate', function (Y, NAME) {","","'use strict';","","/**"," * Plugin Y.Plugin.ChangeModelTemplate"," *"," * Plugin for ITSAViewModellist and ITSAScrollViewModellist that makes it possible to toggle templates per model."," * This might be useful if your (scroll)viewModellist has many rendered models, where you need to toggle"," * some of them. There are three different states:"," *"," * 1) Original Template (standard defined by the host)"," * 2) 'secondTemplate' (can be set up within this plugin: for example to define an 'extended' view for the Models)"," * 3) 'editTemplate' (can be set up within this plugin: to edit the Models)"," *"," * Be aware that 'secondTemplate' and 'editTemplate' are used for rendering all Models."," *"," * To make the models editable, this plugin uses gallery-itsaeditmodel under the hood. The attribute 'configForEditModel' is passed"," * through to Y.Plugin.ITSAEditModel. Should you use a LazyModelList, then the editable Object is revived into a Model. For performancereason,"," * the revived models will not be freed: you may want to do this yourself."," *"," * @module gallery-itsachangemodeltemplate"," * @class ITSAChangeModelTemplate"," * @constructor"," * @since 0.1"," *"," * <i>Copyright (c) 2013 Marco Asbreuk - http://itsasbreuk.nl</i>"," * YUI BSD License - http://developer.yahoo.com/yui/license.html"," *","*/","","var Lang = Y.Lang,","    YArray = Y.Array,","    FORMELEMENT_CLASS = 'yui3-itsaformelement',","    ITSAFORMELEMENT_CHANGED_CLASS = FORMELEMENT_CLASS + '-changed',","    FORMELEMENT_BUTTON_ORIGINALTEMPLATE = 'originaltemplate',","    FORMELEMENT_BUTTON_SECONDTEMPLATE = 'secondtemplate',","    FORMELEMENT_BUTTON_EDITTEMPLATE = 'edittemplate',","    MODEL_CLASS = 'itsa-model',","    ERROR_MESSAGE_NOTEMPLATE = 'Error: Attribute editTemplate is undefined',","    ERROR_MESSAGE_LOAD_ITSA_EDITMODEL_MODULE = 'Error: gallery-itsaeditmodel should be loaded in the loader',","    ISMICROTEMPLATE = function(template) {","        var microTemplateRegExp = /<%(.+)%>/;","        return microTemplateRegExp.test(template);","    },","   /**","     * Fired after the plugin is pluggedin and ready to be referenced by the host. This is LATER than after the 'init'-event,","     * because the latter will be fired before the namespace Model.itsaeditmodel exists.","     * @event pluggedin","     * @since 0.1","    **/","    EVT_PLUGGEDIN = 'pluggedin';","","Y.namespace('Plugin').ITSAChangeModelTemplate = Y.Base.create('itsachangemodeltemplate', Y.Plugin.Base, [], {","","        /**","         * Sets up the toolbar during initialisation. Calls render() as soon as the hosts-editorframe is ready","         *","         * @method initializer","         * @protected","         * @since 0.1","         */","        initializer : function() {","            var instance = this,","                host;","","","            /**","             * Reference to the plugins host.","             * @property host","             * @default plugins host","             * @type Object","            */","            host = instance.host = instance.get('host');","","            /**","             * Internal reference to the compiled alternate template.","             * @property _secondTempl","             * @private","             * @default null","             * @type Function","            */","            instance._secondTempl = null;","","            /**","             * Internal flag to state whether the alternate template is of the type Y.Template.Micro","             * @property _secondTemplIsMicro","             * @private","             * @default null","             * @type Boolean","            */","            instance._secondTemplIsMicro = null;","","","            /**","             * Internal reference to the compiled edit template.","             * @property _editTempl","             * @private","             * @default null","             * @type Function","            */","            instance._editTempl = null;","","            /**","             * Internal flag to state is the edittemplate is a microtemplate","             * @property _editTemplIsMicro","             * @private","             * @default null","             * @type Boolean","            */","            instance._editTemplIsMicro = null;","","            /**","             * Internal backuplist of the Models attributes, used when the editdata needs to be reset.","             * @property _initialEditAttrs","             * @private","             * @default {}","             * @type Object","            */","            instance._initialEditAttrs = {};","","            /**","             * Internal backuplist to keep track of which models live in the state of the secondTemplate","             * @property _secondModels","             * @private","             * @default {}","             * @type Object","            */","            instance._secondModels = {};","","            /**","             * Internal backuplist to keep track of which models live in the state of the editTemplate","             * @property _editModels","             * @private","             * @default {}","             * @type Object","            */","            instance._editModels = {};","","            /**","             * Internal backuplist to keep track of the previous Mode of the Models, to enable restore the template to previous state.","             * @property _prevMode","             * @private","             * @default {}","             * @type Object","            */","            instance._prevMode = {};","","            /**","             * Internal list of all eventhandlers bound by this widget.","             * @property _eventhandlers","             * @private","             * @default []","             * @type Array","            */","            instance._eventhandlers = [];","","            /**","             * Internal flag-list that tells whether -in editMode- the user has changed the content of each Model. This way the module knows it","             * doesn't need to do a thorough re-render of the list.","             * @property _currentModelHasChanged","             * @private","             * @default {}","             * @type Object","            */","            instance._currentModelHasChanged = {};","","            /**","             * Internal flag-list that tells whether new Models may change their template. New Models would go to their 'newModelMode' by default,","             * but when clicked on 'close' or 'save' they must be able to go to the originalTemplate, even if they don't have an id yet.","             * @property _newModelCanChangeTemplate","             * @private","             * @default {}","             * @type Object","            */","            instance._newModelCanChangeTemplate = {};","","           /**","            * Internal reference to Y.later timerobject that is used to fire a 'pluggedin'-event once 'itsaeditmodel' is available on the host.","            * @property _fireEventTimer","            * @default null","            * @private","            * @type timer-Object","            */","            instance._fireEventTimer = null;","","            /**","             * Internal backuplist of the Models previous 'comparator-result', used determine if the comparators-value has changed after","             * the models has been edited.  This way the module knows it doesn't need to do a thorough re-render of the list.","             * @property _prevComparator","             * @private","             * @default {}","             * @type Object","            */","            instance._prevComparator = {};","","            instance._bindUI();","","            // now a VERY tricky one...","            // We need to fire an event that tells the plugin is pluged in, but it seemed that when listening in the host,","            // host.itsacmtemplate will be read immediately after the event fired --> this seems to be BEFORE the event is registred!!!","            // So, we wait until the real registering is finished and THEN fire the event!","            instance._fireEventTimer = Y.later(","                50,","                instance,","                function() {","                    if (host.itsacmtemplate) {","                        instance._fireEventTimer.cancel();","                        instance.fire(EVT_PLUGGEDIN);","                    }","                },","                null,","                true","            );","        },","","        /**","         * Re-renderes the Model -inside the ViewList- with its original template (defined by the host).","         * @method setModelToOriginalTemplate","         * @param model {Y.Model | Object} The item from the modellist. May be a Model, or an Object - in case of LazyModelList","         * @since 0.1","        */","        setModelToOriginalTemplate: function(model) {","            var instance = this,","                host = instance.host,","                clientId = host.getModelAttr(model, 'clientId'),","                modellist = host.get('modelList'),","                comparator = modellist && modellist.comparator,","                currentMode;","","            currentMode = instance._getMode(model);","            if (currentMode !== 1) {","                instance._prevMode[clientId] = instance._getMode(model);","                delete instance._secondModels[clientId];","                delete instance._initialEditAttrs[clientId];","                delete instance._editModels[clientId];","                if (instance._currentModelHasChanged[clientId] && comparator &&","                   (instance._prevComparator[clientId]!==instance._getComparator(modellist, comparator, model))) {","                    modellist.sort();","                    //====================================================","                    //","                    // Next is a bugfix for LazyModelList --> see issue https://github.com/yui/yui3/issues/634","                    // As soon as issue is resolved, remove modellist.free() command","                    //","                    if (host._listLazy) {","                        modellist.free();","                    }","                    //======================================================","                    host._repositionModel(model);","                }","                else {","                    instance._renderOriginalTemplate(model);","                }","                delete instance._prevComparator[clientId];","                delete instance._currentModelHasChanged[clientId];","            }","            else {","            }","        },","","        /**","         * Re-renderes the Model -inside the ViewList- with its second template (defined by 'secondTemplate').","         * @method setModelToSecondTemplate","         * @param model {Y.Model | Object} The item from the modellist. May be a Model, or an Object - in case of LazyModelList","         * @since 0.1","        */","        setModelToSecondTemplate: function(model) {","            var instance = this,","                host = instance.host,","                clientId = host.getModelAttr(model, 'clientId'),","                modellist = host.get('modelList'),","                comparator = modellist && Y.bind(modellist.comparator, modellist),","                currentMode;","","            currentMode = instance._getMode(model);","            if (currentMode !== 2) {","                delete instance._initialEditAttrs[clientId];","                instance._prevMode[clientId] = instance._getMode(model);","                instance._secondModels[clientId] = true;","                delete instance._editModels[clientId];","                if (instance._currentModelHasChanged[clientId] && comparator &&","                   (instance._prevComparator[clientId]!==instance._getComparator(modellist, comparator, model))) {","                    modellist.sort();","                    //====================================================","                    //","                    // Next is a bugfix for LazyModelList --> see issue https://github.com/yui/yui3/issues/634","                    // As soon as issue is resolved, remove modellist.free() command","                    //","                    if (host._listLazy) {","                        modellist.free();","                    }","                    //======================================================","                    host._renderView();","                }","                else {","                    instance._renderSecondTemplate(model);","                }","                delete instance._prevComparator[clientId];","                delete instance._currentModelHasChanged[clientId];","            }","            else {","            }","        },","","        /**","         * Re-renderes the Model -inside the ViewList- with its editable template (defined by 'editTemplate').","         * @method setModelToEditTemplate","         * @param model {Y.Model | Object} The item from the modellist. May be a Model, or an Object - in case of LazyModelList","         * @since 0.1","        */","        setModelToEditTemplate: function(model) {","            var instance = this,","                host = instance.host,","                modellist = host.get('modelList'),","                comparator = modellist && Y.bind(modellist.comparator, modellist),","                clientId = host.getModelAttr(model, 'clientId'),","                currentMode;","            if (instance.get('modelsEditable')) {","                currentMode = instance._getMode(model);","                if (currentMode !== 3) {","                    delete instance._currentModelHasChanged[clientId];","                    instance._prevComparator[clientId] = comparator && instance._getComparator(modellist, comparator, model);","                    instance._prevMode[clientId] = currentMode;","                    instance._editModels[clientId] = true;","                    delete instance._secondModels[clientId];","                    instance._renderEditTemplate(","                        model,","                        function() {","                            var modelNode = (Lang.isNumber(model) ? host.getNodeFromIndex(model, 0) : host.getNodeFromModel(model, 0));","                            if (modelNode && modelNode.itsatabkeymanager) {","                                modelNode.itsatabkeymanager.focusInitialItem();","                            }","                        }","                    );","                }","                else {","                }","            }","            else {","            }","        },","","        /**","         * Re-renderes the Model -inside the ViewList- with its previous template, performing a reverse-rendering. Only the template is","         * restored, thus, if the Model's content is changed, you will see the new Model's content.","         * @method restoreTemplate","         * @param model {Y.Model | Object} The item from the modellist. May be a Model, or an Object - in case of LazyModelList","         * @since 0.1","        */","        restoreTemplate : function(model) {","            var instance = this,","                host = instance.host,","                clientId = host.getModelAttr(model, 'clientId'),","                mode = instance._prevMode[clientId] || 1;","","            // In case of new Models, we need to prevent ever falling into the 'newModelMode':","            if (host.isNewModel(model)) {","                instance._newModelCanChangeTemplate[clientId] = true;","            }","            switch (mode) {","                case 1: instance.setModelToOriginalTemplate(model);","                break;","                case 2: instance.setModelToSecondTemplate(model);","                break;","                case 3: instance.setModelToEditTemplate(model);","                break;","            }","        },","","        /**","         * Cleans up bindings and removes plugin","         * @method destructor","         * @protected","         * @since 0.1","        */","        destructor : function() {","            var instance = this;","","            if (instance._fireEventTimer) {","                instance._fireEventTimer.cancel();","            }","            instance._clearEventhandlers();","            instance._initialEditAttrs = {};","            instance._secondModels = {};","            instance._editModels = {};","            instance._prevMode = {};","            instance._prevComparator = {};","            instance._currentModelHasChanged = {};","            instance._newModelCanChangeTemplate = {};","        },","","        //===============================================================================================","        // private methods","        //===============================================================================================","","        /**","         * Binding events","         *","         * @method _bindUI","         * @private","         * @since 0.1","        */","        _bindUI : function() {","            var instance = this,","                host = instance.host,","                eventhandlers = instance._eventhandlers;","","            eventhandlers.push(","                host.after(","                    'itsaeditmodel:focusnext',","                    function(e) {","                        var model = e.target.get('host'),","                            modelnode = host.getNodeFromModel(model),","                            itsatabkeymanager;","                        while (modelnode && !modelnode.hasClass('itsa-model')) {","                            modelnode = modelnode.get('parentNode');","                        }","                        if (modelnode) {","                            itsatabkeymanager = modelnode.itsatabkeymanager;","                            if (itsatabkeymanager && modelnode.hasClass('itsa-model-focus')) {","                                itsatabkeymanager.next();","                            }","                            else {","                            }","                        }","                        else {","                        }","                    }","                )","            );","            eventhandlers.push(","                host.after(","                    '*:resetclick',","                    function(e) {","                        var model = e.target, // NOT e.currentTarget: that is the (scroll)View-instance (?)","                            options = {fromEditModel: true}, // set Attribute with option: '{fromEditModel: true}'","                                                             // --> now the view knows it must not re-render completely.","                                                             // however, we MUST re-render the only item.","                            initialEditAttrs;","                        if (model instanceof Y.Model) {","                            initialEditAttrs = instance._initialEditAttrs[model.get('clientId')];","                            if (initialEditAttrs) {","                                model.setAttrs(initialEditAttrs, options);","                                if (instance._getMode(model)===3) {","                                    instance._renderEditTemplate(","                                        model,","                                        function() {","                                            var modelNode = (Lang.isNumber(model) ? host.getNodeFromIndex(model,0) : host.getNodeFromModel(model,0));","                                            if (modelNode && modelNode.itsatabkeymanager) {","                                                modelNode.itsatabkeymanager.focusInitialItem();","                                            }","                                        }","                                    );","                                }","                                if (host.modelIsSelected(model)) {","                                    host._fireSelectedModels();","                                }","                            }","                        }","                    }","                )","            );","            eventhandlers.push(","                host.after(","                    ['itsaeditmodel:editmodelConfigAttrsChange', 'itsaeditmodel:templateChange'],","                    function() {","                        if (instance.get('modelsEditable')) {","                            host._renderView(null, null);","                        }","                    }","                )","            );","            eventhandlers.push(","                host.after(","                    '*:submitclick',","                    function(e) {","                        var model = e.target;","                        if (model instanceof Y.Model) {","                            if (instance.get('restoreOnSubmit')) {","                                instance.restoreTemplate(model);","                            }","                        }","                    }","                )","            );","            eventhandlers.push(","                host.after(","                    '*:saveclick',","                    function(e) {","                        var model = e.target;","                        if (model instanceof Y.Model) {","                            if (instance.get('restoreOnSave')) {","                                instance.restoreTemplate(model);","                            }","                        }","                    }","                )","            );","            eventhandlers.push(","                instance.after(","                    'modelsEditableChange',","                    Y.bind(host._renderView, host, null, null)","                )","            );","            eventhandlers.push(","                instance.after(","                    'editmodelConfigAttrsChange',","                    function() {","                        // force recompiling of the editrenderer on next rendercall:","                        instance._editTempl = null;","                    }","                )","            );","            eventhandlers.push(","                host.after(","                    '*:change',","                    function(e) {","                        var model = e.target, // NOT e.currentTarget: that is the (scroll)View-instance (?)","                            modelNode, clientId;","                        if ((model instanceof Y.Model) && (instance._getMode(model)===3)) {","                            clientId = host.getModelAttr(model, 'clientId');","                            instance._currentModelHasChanged[clientId] = true;","                            modelNode = host.getNodeFromModel(model, 0);","                            modelNode.all('.'+ITSAFORMELEMENT_CHANGED_CLASS).removeClass(ITSAFORMELEMENT_CHANGED_CLASS);","                        }","                    }","                )","            );","            eventhandlers.push(","                host.on(","                    '*:destroy',","                    function(e) {","                        var model = e.target; // NOT e.currentTarget: that is the (scroll)View-instance (?)","                        if (model instanceof Y.Model) {","                            delete instance._editModels[model.get('clientId')];","                            if (host.modelIsSelected(model)) {","                                host.unselectModels(model, false, true); // will fire an event itself","                            }","                        }","                    }","                )","            );","            eventhandlers.push(","                host.on(","                    'itsaeditmodel:destroy',","                    function(e) {","                        var model = e.target.get('host');","                        instance.restoreTemplate(model);","                    }","                )","            );","            eventhandlers.push(","                host.get('boundingBox').delegate(","                    'click',","                    function(e) {","                        var button = e.currentTarget,","                            isOriginalTemplate = button.hasClass(FORMELEMENT_BUTTON_ORIGINALTEMPLATE),","                            isSecondTemplate = button.hasClass(FORMELEMENT_BUTTON_SECONDTEMPLATE),","                            isEditTemplate = button.hasClass(FORMELEMENT_BUTTON_EDITTEMPLATE),","                            node, model;","","                        if (isOriginalTemplate || isSecondTemplate || isEditTemplate) {","                            node = button.get('parentNode');","                            while (node && !node.hasClass(MODEL_CLASS)) {","                                node = button.get('parentNode');","                            }","                            if (node) {","                                // modelnode found","                                model = host.getModelFromNode(node);","                                if (isOriginalTemplate) {","                                    instance.setModelToOriginalTemplate(model);","                                }","                                else if (isSecondTemplate) {","                                    instance.setModelToSecondTemplate(model);","                                }","                                else if (isEditTemplate) {","                                    instance.setModelToEditTemplate(model);","                                }","                            }","                        }","                    },","                    'button'","                )","            );","        },","","        /**","         * Cleaning up all eventlisteners","         *","         * @method _clearEventhandlers","         * @private","         * @since 0.1","         *","        */","        _clearEventhandlers : function() {","            YArray.each(","                this._eventhandlers,","                function(item){","                    item.detach();","                }","            );","        },","","        /**","         * Gets the comparator-result of a Modelinstance. Because you might face a LazyModelList with a revived model, you need to","         * excecute 'comparator' with the object in those cases. This Method will take care of a correct calculation of the comparator","         * in all cases.","         * @method _getComparator","         * @param modellist {Y.ModelList|Y.LazyModelList} host's (lazy)modellist","         * @param comparator {Function} host's comparator","         * @param model {Y.Model | Object} The item from the modellist. May be a Model, or an Object - in case of LazyModelList","         * @private","         * @since 0.1","        */","        _getComparator : function(modellist, comparator, model) {","            var instance = this,","                host = instance.host,","                objectFromList;","","            if (model) {","                if (host._listLazy && model.get && (typeof model.get === 'function')) {","                    // caution: the revived models might be freed while 'model' is the previous revived model!","                    // indexOf doesn't work then. We need to search by clientId.","                    objectFromList = modellist.getByClientId(model.get('clientId'));","                }","                return comparator(objectFromList || model);","            }","            else {","                return 0;","            }","        },","","        /**","         * Returns the current 'Mode' of the Models rendering. Meaning: what Template is currently being used. This might be:<br />","         * 1: original template<br />","         * 2: secondTemplate<br />","         * 3: editTemplate<br />","         *","         * @method _getMode","         * @private","         * @param model {Y.Model | Object} The item from the modellist. May be a Model, or an Object - in case of LazyModelList","         * @since 0.1","         *","        */","        _getMode : function(model) {","","            var instance = this,","                modelsEditable = instance.get('modelsEditable'),","                secondTemplate = instance.get('secondTemplate'),","                editTemplate = instance.get('editTemplate'),","                host = instance.host,","                clientId = host.getModelAttr(model, 'clientId'),","                mode = 1,","                newModelMode, modelInstance, usemodel, revivedModel;","            if (secondTemplate && instance._secondModels[clientId]) {","                mode = 2;","            }","            else if (modelsEditable && editTemplate && instance._editModels[clientId]) {","                mode = 3;","            }","            else if (host.isNewModel(model) && !instance._newModelCanChangeTemplate[clientId]) {","                newModelMode = instance.get('newModelMode');","                if ((newModelMode === 2) && secondTemplate) {","                    mode = 2;","                    instance._secondModels[clientId] = true;","                }","                else if ((newModelMode === 3) && modelsEditable && editTemplate) {","                    mode = 3;","                    // Also: we might need to plugin ItsaEditModel","                    // IMPORTANT: model could be an object in case of LazyModelList","                    // we need to revive it first","                    modelInstance = model.get && (typeof model.get === 'function');","                    if (!modelInstance && host._listLazy) {","                        revivedModel = host.get('modelList').revive(model);","                    }","                    usemodel = revivedModel || model;","                    instance._initialEditAttrs[clientId] = usemodel.getAttrs();","                    if (!usemodel.itsaeditmodel) {","                        Y.use('gallery-itsaeditmodel', function(Y) {","                            usemodel.plug(Y.Plugin.ITSAEditModel, instance.get('configForEditModel'));","                            if (!instance._editTempl) {","                                instance._setEditTemplate(instance.get('editTemplate') || usemodel.itsaeditmodel.get('template') ||","                                                                                          ERROR_MESSAGE_NOTEMPLATE);","                            }","                        });","                    }","                    instance._editModels[clientId] = true;","                }","            }","            return mode;","        },","","        /**","         * Returns the active modelengine that is used by the specified Model.<br />","         * <i>This method is not used internally, but is called by ITSAScrollViewModellist and ITSAViewModellist</i>","         * @method _getModelEngine","         * @param model {Y.Model|Object} The item from the modellist. May be a Model, or an Object - in case of LazyModelList","         * @param modelTemplate {String} The 'modelTemplate' used by the host","         * @param compiledModelEngine {Function} Host's compiled 'modelTemplate', compiled using Y.Template.Micro","         * @private","         * @protected","         * @since 0.1","         *","        */","        _getModelEngine : function(model, modelTemplate, compiledModelEngine) {","            var instance = this,","                host = instance.host,","                modus = instance._getMode(model),","                modelJSON, engine;","","            switch (modus) {","                case 1: // default: the standard modelTemplate","                    modelJSON = host.getModelToJSON(model);","                    engine = compiledModelEngine ? compiledModelEngine(modelJSON) : Lang.sub(modelTemplate, modelJSON);","                break;","                case 2: // secondTemplate","                    engine = instance._altTempl(model);","                break;","                case 3: // editTemplate","                    engine = instance._editTempl(model);","                break;","            }","            return engine;","        },","","        /**","         * Re-renderes the Model with the editTemplate inside the ViewList.","         *","         * @method _renderEditTemplate","         * @private","         * @param model {Y.Model | Object} The item from the modellist. May be a Model, or an Object - in case of LazyModelList","         * @param callback {Function} callbackfunction to be executed once renerding is finished","         * @since 0.1","         *","        */","        _renderEditTemplate: function(model, callback) {","            var instance = this,","                host = instance.host,","                modelNode, modelInstance, revivedModel, usemodel;","","            modelNode = (Lang.isNumber(model) ? host.getNodeFromIndex(model, 0) : host.getNodeFromModel(model, 0));","            if (modelNode) {","                if (ISMICROTEMPLATE(instance.get('template')) || (instance._secondTempl && instance._secondTemplIsMicro)) {","                    modelNode.cleanup();","                }","                Y.use('gallery-itsatabkeymanager', function(Y) {","                    if (!modelNode.itsatabkeymanager) {","                        modelNode.plug(Y.Plugin.ITSATabKeyManager);","                    }","                    // IMPORTANT: model could be an object in case of LazyModelList","                    // we need to revive it first","                    modelInstance = model.get && (typeof model.get === 'function');","                    if (!modelInstance && host._listLazy) {","                        revivedModel = host.get('modelList').revive(model);","                    }","                    usemodel = revivedModel || model;","                    instance._initialEditAttrs[usemodel.get('clientId')] = usemodel.getAttrs();","                    if (!usemodel.itsaeditmodel) {","                        Y.use('gallery-itsaeditmodel', function(Y) {","                            usemodel.plug(Y.Plugin.ITSAEditModel, instance.get('configForEditModel'));","                            if (!instance._editTempl) {","                                instance._setEditTemplate(instance.get('editTemplate') || usemodel.itsaeditmodel.get('template') ||","                                                                                          ERROR_MESSAGE_NOTEMPLATE);","                            }","                            modelNode.setHTML(instance._editTempl(usemodel));","                            if (typeof callback === 'function') {","                                callback();","                            }","                        });","                    }","                    else {","                        if (!instance._editTempl) {","                            instance._setEditTemplate(instance.get('editTemplate') || usemodel.itsaeditmodel.get('template') ||","                                                                                      ERROR_MESSAGE_NOTEMPLATE);","                        }","                        modelNode.setHTML(instance._editTempl(usemodel));","                        if (typeof callback === 'function') {","                            callback();","                        }","                    }","                });","            }","            else {","            }","        },","","        /**","         * Re-renderes the Model with the secondTemplate inside the ViewList.","         *","         * @method _renderSecondTemplate","         * @private","         * @param model {Y.Model | Object} The item from the modellist. May be a Model, or an Object - in case of LazyModelList","         * @since 0.1","         *","        */","        _renderSecondTemplate: function(model) {","            var instance = this,","                host = instance.host,","                alternateTemplate = instance._secondTempl || host._templFns.template,","                modelNode;","","            modelNode = (Lang.isNumber(model) ? host.getNodeFromIndex(model, 0) : host.getNodeFromModel(model, 0));","            if (modelNode && alternateTemplate) {","                if (ISMICROTEMPLATE(instance.get('template')) || model.itsaeditmodel) {","                    modelNode.cleanup();","                }","                modelNode.setHTML(alternateTemplate(model));","            }","            else {","            }","        },","","        /**","         * Re-renderes the Model with the original template inside the ViewList.","         *","         * @method _renderOriginalTemplate","         * @private","         * @param model {Y.Model | Object} The item from the modellist. May be a Model, or an Object - in case of LazyModelList","         * @since 0.1","         *","        */","        _renderOriginalTemplate: function(model) {","            var instance = this,","                host = instance.host,","                modelNode;","","            modelNode = (Lang.isNumber(model) ? host.getNodeFromIndex(model, 0) : host.getNodeFromModel(model, 0));","            if (modelNode) {","                if ((instance._secondTempl && instance._secondTemplIsMicro) || model.itsaeditmodel) {","                    modelNode.cleanup();","                }","                // delete objectproperty from instance._secondModelsBEFORE calling host._templFns.template,","                // for the latter depends on whether the definition is there.","                modelNode.setHTML(host._templFns.template(model));","            }","            else {","            }","        },","","        /**","         * compiled the editTemplate into private variable _editTempl()","         *","         * @method _setEditTemplate","         * @param template {String} The new secondTemplate to be used. Must be of type Y.Lang.sub() or Y.Template.Micro()","         * @private","         * @since 0.1","         *","        */","        _setEditTemplate: function(template) {","            var instance = this,","                host = instance.host,","                compiledModelEngine, editTemplateIsMicro;","","            if (!template || (template==='')) {","                instance._editTempl = host._templFns.template;","            }","            else {","                editTemplateIsMicro = instance._editTemplIsMicro = ISMICROTEMPLATE(template);","                if (editTemplateIsMicro) {","                    compiledModelEngine = Y.TemplateMicro.compile(template);","                    instance._editTempl = function(model) {","                        var modelInstance, usemodel, revivedModel;","                        modelInstance = model.get && (typeof model.get === 'function');","                        if (!modelInstance && host._listLazy) {","                            revivedModel = host.get('modelList').revive(model);","                        }","                        usemodel = revivedModel || model;","                        if (!usemodel.itsaeditmodel) {","                            Y.use('gallery-itsaeditmodel', function(Y) {","                                usemodel.plug(Y.Plugin.ITSAEditModel, instance.get('configForEditModel'));","                            });","                        }","                        return usemodel.itsaeditmodel ?","                               compiledModelEngine(usemodel.itsaeditmodel.toJSON(instance.get('editmodelConfigAttrs') ||","                               usemodel.itsaeditmodel.get('editmodelConfigAttrs'))) :","                               ERROR_MESSAGE_LOAD_ITSA_EDITMODEL_MODULE;","                    };","                }","                else {","                    instance._editTempl = function(model) {","                        var modelInstance, usemodel, revivedModel;","                        modelInstance = model.get && (typeof model.get === 'function');","                        if (!modelInstance && host._listLazy) {","                            revivedModel = host.get('modelList').revive(model);","                        }","                        usemodel = revivedModel || model;","                        if (!usemodel.itsaeditmodel) {","                            Y.use('gallery-itsaeditmodel', function(Y) {","                                usemodel.plug(Y.Plugin.ITSAEditModel, instance.get('configForEditModel'));","                            });","                        }","                        return usemodel.itsaeditmodel ?","                               Lang.sub(template, usemodel.itsaeditmodel.toJSON(instance.get('editmodelConfigAttrs') ||","                               usemodel.itsaeditmodel.get('editmodelConfigAttrs'))) :","                               ERROR_MESSAGE_LOAD_ITSA_EDITMODEL_MODULE;","                    };","                }","            }","        },","","        /**","         * compiled the secondTemplate into private variable _secondTempl()","         *","         * @method _setSecondTemplate","         * @param template {String} The new secondTemplate to be used. Must be of type Y.Lang.sub() or Y.Template.Micro()","         * @private","         * @since 0.1","         *","        */","        _setSecondTemplate: function(val) {","            var instance = this,","                host = instance.host,","                compiledModelEngine, alternateTemplateIsMicro;","","            if (!val || (val==='')) {","                instance._secondTempl = null;","            }","            else {","                alternateTemplateIsMicro = instance._secondTemplIsMicro = ISMICROTEMPLATE(val);","                if (alternateTemplateIsMicro) {","                    compiledModelEngine = Y.TemplateMicro.compile(val);","                    instance._secondTempl = function(model) {","                        return compiledModelEngine(host.getModelToJSON(model));","                    };","                }","                else {","                    instance._secondTempl = function(model) {","                        return Lang.sub(val, host.getModelToJSON(model));","                    };","                }","            }","        }","","    }, {","        NS : 'itsacmtemplate',","        ATTRS : {","","            /**","             * The editmodelConfigAttrs to be used in the editable mode. See Y.Plugin.ITSAEditModel (gallery-itsaeditmodel)","             * for further specifications. If this attribute is empty, the plugin will search for 'configForEditModel.editmodelConfigAttrs',","             * which might as well define the config. However, it is preferable to define the configAttrs directly within 'editmodelConfigAttrs',","             * because through this attribute are able to change the configAttrs later on. (The one within 'configForEditModel.editmodelConfigAttrs'","             * is only read during initialisation).","             *","             * @attribute editmodelConfigAttrs","             * @type {Object}","             * @default false","             * @since 0.1","             */","            editmodelConfigAttrs: {","                value: {},","                validator: function(v){","                    return Lang.isObject(v);","                }","            },","","            /**","             * The <b>config</b> that is passed through directly into Y.Plugin.ITSAEditModel. Event though you can define","             * 'configForEditModel.template' and 'configForEditModel.editmodelConfigAttrs', the referred way for those to properties","             * is to set them directly within this wplugin-level (see 'editTemplate' and 'editmodelConfigAttrs' for the why).","             *","             * @attribute configForEditModel","             * @type {Boolean}","             * @default false","             * @since 0.1","             */","            configForEditModel: {","                value: null,","                validator: function(v){","                    return Lang.isObject(v);","                }","            },","","            /**","             * The template to be used in the editable mode. Use either Y.Lang.sub or Y.Template.Micor syntax. If this attribute is empty,","             * the plugin will search for 'configForEditModel.template', which might as well define the editTemplate. However, it is preferable","             * to define the editable template directly within 'editTemplate', because through this attribute are able to change the","             * editable-template later on. (The one within 'configForEditModel.editTemplate' is only read during initialisation).","             *","             * @attribute editTemplate","             * @type {Boolean}","             * @default false","             * @since 0.1","             */","            editTemplate: {","                value: null,","                validator: function(v){","                    return (typeof v === 'string');","                },","                setter: '_setEditTemplate'","            },","","            /**","             * Makes the View able to render the editable-version of the Model. By setting to false, you can make a controller to","             * disable the edit-functionality of the whole host-list.","             *","             * @attribute modelsEditable","             * @type {Boolean}","             * @default true","             * @since 0.1","             */","            modelsEditable: {","                value: true,","                lazyAdd: false,","                validator: function(v){","                    return Lang.isBoolean(v);","                }","            },","","            /**","             * In what mode 'new' Models will be rendered. This mode should be posible (secondTemplate or editTemplate defined). If not,","             * the default template will be the render-template.<br />","             * 1: original template<br />","             * 2: secondTemplate<br />","             * 3: editTemplate","             *","             * @attribute newModelMode","             * @type {Int}","             * @default 1","             * @since 0.1","             */","            newModelMode: {","                value: 1,","                validator: function(v){","                    return ((typeof v === 'number') && (v>0) && (v<4));","                }","            },","","            /**","             * Will resyore the template to its previous form n a save-click.","             *","             * @attribute restoreOnSave","             * @type {Boolean}","             * @default true","             * @since 0.1","             */","            restoreOnSave: {","                value: true,","                validator: function(v){","                    return Lang.isBoolean(v);","                }","            },","","            /**","             * Will resyore the template to its previous form n a submit-click.","             *","             * @attribute restoreOnSubmit","             * @type {Boolean}","             * @default true","             * @since 0.1","             */","            restoreOnSubmit: {","                value: true,","                validator: function(v){","                    return Lang.isBoolean(v);","                }","            },","","            /**","             * Defines the template to be used as 'secondTemplate'. Will be used for all Models that are rendered by setModelToSecondTemplate()","             *","             * @attribute secondTemplate","             * @type {Boolean}","             * @default false","             * @since 0.1","             */","            secondTemplate: {","                value: null,","                validator: function(v){","                    return (typeof v === 'string');","                },","                setter: '_setSecondTemplate'","            }","","        }","    }",");","","}, '@VERSION@', {","    \"requires\": [","        \"yui-base\",","        \"node-core\",","        \"node-event-delegate\",","        \"base-base\",","        \"base-build\",","        \"model\",","        \"plugin\",","        \"pluginhost-base\",","        \"oop\",","        \"template-micro\"","    ]","});"];
_yuitest_coverage["build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js"].lines = {"1":0,"3":0,"32":0,"43":0,"44":0,"54":0,"64":0,"74":0,"83":0,"92":0,"102":0,"111":0,"120":0,"129":0,"138":0,"147":0,"156":0,"166":0,"176":0,"185":0,"195":0,"197":0,"203":0,"207":0,"208":0,"209":0,"224":0,"231":0,"232":0,"233":0,"234":0,"235":0,"236":0,"237":0,"239":0,"245":0,"246":0,"249":0,"252":0,"254":0,"255":0,"268":0,"275":0,"276":0,"277":0,"278":0,"279":0,"280":0,"281":0,"283":0,"289":0,"290":0,"293":0,"296":0,"298":0,"299":0,"312":0,"318":0,"319":0,"320":0,"321":0,"322":0,"323":0,"324":0,"325":0,"326":0,"329":0,"330":0,"331":0,"351":0,"357":0,"358":0,"360":0,"361":0,"362":0,"363":0,"364":0,"365":0,"366":0,"377":0,"379":0,"380":0,"382":0,"383":0,"384":0,"385":0,"386":0,"387":0,"388":0,"389":0,"404":0,"408":0,"412":0,"415":0,"416":0,"418":0,"419":0,"420":0,"421":0,"431":0,"435":0,"440":0,"441":0,"442":0,"443":0,"444":0,"445":0,"448":0,"449":0,"450":0,"455":0,"456":0,"463":0,"467":0,"468":0,"473":0,"477":0,"478":0,"479":0,"480":0,"486":0,"490":0,"491":0,"492":0,"493":0,"499":0,"505":0,"510":0,"514":0,"518":0,"520":0,"521":0,"522":0,"523":0,"524":0,"529":0,"533":0,"534":0,"535":0,"536":0,"537":0,"543":0,"547":0,"548":0,"552":0,"556":0,"562":0,"563":0,"564":0,"565":0,"567":0,"569":0,"570":0,"571":0,"573":0,"574":0,"576":0,"577":0,"596":0,"599":0,"616":0,"620":0,"621":0,"624":0,"626":0,"629":0,"647":0,"655":0,"656":0,"658":0,"659":0,"661":0,"662":0,"663":0,"664":0,"665":0,"667":0,"668":0,"672":0,"673":0,"674":0,"676":0,"677":0,"678":0,"679":0,"680":0,"681":0,"682":0,"687":0,"690":0,"706":0,"711":0,"713":0,"714":0,"715":0,"717":0,"718":0,"720":0,"721":0,"723":0,"737":0,"741":0,"742":0,"743":0,"744":0,"746":0,"747":0,"748":0,"752":0,"753":0,"754":0,"756":0,"757":0,"758":0,"759":0,"760":0,"761":0,"762":0,"765":0,"766":0,"767":0,"772":0,"773":0,"776":0,"777":0,"778":0,"797":0,"802":0,"803":0,"804":0,"805":0,"807":0,"823":0,"827":0,"828":0,"829":0,"830":0,"834":0,"850":0,"854":0,"855":0,"858":0,"859":0,"860":0,"861":0,"862":0,"863":0,"864":0,"865":0,"867":0,"868":0,"869":0,"870":0,"873":0,"880":0,"881":0,"882":0,"883":0,"884":0,"886":0,"887":0,"888":0,"889":0,"892":0,"911":0,"915":0,"916":0,"919":0,"920":0,"921":0,"922":0,"923":0,"927":0,"928":0,"953":0,"970":0,"988":0,"1006":0,"1025":0,"1040":0,"1055":0,"1070":0};
_yuitest_coverage["build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js"].functions = {"ISMICROTEMPLATE:42":0,"(anonymous 2):206":0,"initializer:63":0,"setModelToOriginalTemplate:223":0,"setModelToSecondTemplate:267":0,"(anonymous 3):328":0,"setModelToEditTemplate:311":0,"restoreTemplate:350":0,"destructor:376":0,"(anonymous 4):411":0,"(anonymous 6):447":0,"(anonymous 5):434":0,"(anonymous 7):466":0,"(anonymous 8):476":0,"(anonymous 9):489":0,"(anonymous 10):508":0,"(anonymous 11):517":0,"(anonymous 12):532":0,"(anonymous 13):546":0,"(anonymous 14):555":0,"_bindUI:403":0,"(anonymous 15):598":0,"_clearEventhandlers:595":0,"_getComparator:615":0,"(anonymous 16):679":0,"_getMode:645":0,"_getModelEngine:705":0,"(anonymous 18):759":0,"(anonymous 17):746":0,"_renderEditTemplate:736":0,"_renderSecondTemplate:796":0,"_renderOriginalTemplate:822":0,"(anonymous 19):869":0,"_editTempl:861":0,"(anonymous 20):888":0,"_editTempl:880":0,"_setEditTemplate:849":0,"_secondTempl:922":0,"_secondTempl:927":0,"_setSecondTemplate:910":0,"validator:952":0,"validator:969":0,"validator:987":0,"validator:1005":0,"validator:1024":0,"validator:1039":0,"validator:1054":0,"validator:1069":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js"].coveredLines = 282;
_yuitest_coverage["build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js"].coveredFunctions = 49;
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 1);
YUI.add('gallery-itsachangemodeltemplate', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 3);
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

_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 32);
var Lang = Y.Lang,
    YArray = Y.Array,
    FORMELEMENT_CLASS = 'yui3-itsaformelement',
    ITSAFORMELEMENT_CHANGED_CLASS = FORMELEMENT_CLASS + '-changed',
    FORMELEMENT_BUTTON_ORIGINALTEMPLATE = 'originaltemplate',
    FORMELEMENT_BUTTON_SECONDTEMPLATE = 'secondtemplate',
    FORMELEMENT_BUTTON_EDITTEMPLATE = 'edittemplate',
    MODEL_CLASS = 'itsa-model',
    ERROR_MESSAGE_NOTEMPLATE = 'Error: Attribute editTemplate is undefined',
    ERROR_MESSAGE_LOAD_ITSA_EDITMODEL_MODULE = 'Error: gallery-itsaeditmodel should be loaded in the loader',
    ISMICROTEMPLATE = function(template) {
        _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "ISMICROTEMPLATE", 42);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 43);
var microTemplateRegExp = /<%(.+)%>/;
        _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 44);
return microTemplateRegExp.test(template);
    },
   /**
     * Fired after the plugin is pluggedin and ready to be referenced by the host. This is LATER than after the 'init'-event,
     * because the latter will be fired before the namespace Model.itsaeditmodel exists.
     * @event pluggedin
     * @since 0.1
    **/
    EVT_PLUGGEDIN = 'pluggedin';

_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 54);
Y.namespace('Plugin').ITSAChangeModelTemplate = Y.Base.create('itsachangemodeltemplate', Y.Plugin.Base, [], {

        /**
         * Sets up the toolbar during initialisation. Calls render() as soon as the hosts-editorframe is ready
         *
         * @method initializer
         * @protected
         * @since 0.1
         */
        initializer : function() {
            _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "initializer", 63);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 64);
var instance = this,
                host;


            /**
             * Reference to the plugins host.
             * @property host
             * @default plugins host
             * @type Object
            */
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 74);
host = instance.host = instance.get('host');

            /**
             * Internal reference to the compiled alternate template.
             * @property _secondTempl
             * @private
             * @default null
             * @type Function
            */
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 83);
instance._secondTempl = null;

            /**
             * Internal flag to state whether the alternate template is of the type Y.Template.Micro
             * @property _secondTemplIsMicro
             * @private
             * @default null
             * @type Boolean
            */
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 92);
instance._secondTemplIsMicro = null;


            /**
             * Internal reference to the compiled edit template.
             * @property _editTempl
             * @private
             * @default null
             * @type Function
            */
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 102);
instance._editTempl = null;

            /**
             * Internal flag to state is the edittemplate is a microtemplate
             * @property _editTemplIsMicro
             * @private
             * @default null
             * @type Boolean
            */
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 111);
instance._editTemplIsMicro = null;

            /**
             * Internal backuplist of the Models attributes, used when the editdata needs to be reset.
             * @property _initialEditAttrs
             * @private
             * @default {}
             * @type Object
            */
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 120);
instance._initialEditAttrs = {};

            /**
             * Internal backuplist to keep track of which models live in the state of the secondTemplate
             * @property _secondModels
             * @private
             * @default {}
             * @type Object
            */
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 129);
instance._secondModels = {};

            /**
             * Internal backuplist to keep track of which models live in the state of the editTemplate
             * @property _editModels
             * @private
             * @default {}
             * @type Object
            */
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 138);
instance._editModels = {};

            /**
             * Internal backuplist to keep track of the previous Mode of the Models, to enable restore the template to previous state.
             * @property _prevMode
             * @private
             * @default {}
             * @type Object
            */
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 147);
instance._prevMode = {};

            /**
             * Internal list of all eventhandlers bound by this widget.
             * @property _eventhandlers
             * @private
             * @default []
             * @type Array
            */
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 156);
instance._eventhandlers = [];

            /**
             * Internal flag-list that tells whether -in editMode- the user has changed the content of each Model. This way the module knows it
             * doesn't need to do a thorough re-render of the list.
             * @property _currentModelHasChanged
             * @private
             * @default {}
             * @type Object
            */
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 166);
instance._currentModelHasChanged = {};

            /**
             * Internal flag-list that tells whether new Models may change their template. New Models would go to their 'newModelMode' by default,
             * but when clicked on 'close' or 'save' they must be able to go to the originalTemplate, even if they don't have an id yet.
             * @property _newModelCanChangeTemplate
             * @private
             * @default {}
             * @type Object
            */
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 176);
instance._newModelCanChangeTemplate = {};

           /**
            * Internal reference to Y.later timerobject that is used to fire a 'pluggedin'-event once 'itsaeditmodel' is available on the host.
            * @property _fireEventTimer
            * @default null
            * @private
            * @type timer-Object
            */
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 185);
instance._fireEventTimer = null;

            /**
             * Internal backuplist of the Models previous 'comparator-result', used determine if the comparators-value has changed after
             * the models has been edited.  This way the module knows it doesn't need to do a thorough re-render of the list.
             * @property _prevComparator
             * @private
             * @default {}
             * @type Object
            */
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 195);
instance._prevComparator = {};

            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 197);
instance._bindUI();

            // now a VERY tricky one...
            // We need to fire an event that tells the plugin is pluged in, but it seemed that when listening in the host,
            // host.itsacmtemplate will be read immediately after the event fired --> this seems to be BEFORE the event is registred!!!
            // So, we wait until the real registering is finished and THEN fire the event!
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 203);
instance._fireEventTimer = Y.later(
                50,
                instance,
                function() {
                    _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "(anonymous 2)", 206);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 207);
if (host.itsacmtemplate) {
                        _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 208);
instance._fireEventTimer.cancel();
                        _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 209);
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
            _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "setModelToOriginalTemplate", 223);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 224);
var instance = this,
                host = instance.host,
                clientId = host.getModelAttr(model, 'clientId'),
                modellist = host.get('modelList'),
                comparator = modellist && modellist.comparator,
                currentMode;

            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 231);
currentMode = instance._getMode(model);
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 232);
if (currentMode !== 1) {
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 233);
instance._prevMode[clientId] = instance._getMode(model);
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 234);
delete instance._secondModels[clientId];
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 235);
delete instance._initialEditAttrs[clientId];
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 236);
delete instance._editModels[clientId];
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 237);
if (instance._currentModelHasChanged[clientId] && comparator &&
                   (instance._prevComparator[clientId]!==instance._getComparator(modellist, comparator, model))) {
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 239);
modellist.sort();
                    //====================================================
                    //
                    // Next is a bugfix for LazyModelList --> see issue https://github.com/yui/yui3/issues/634
                    // As soon as issue is resolved, remove modellist.free() command
                    //
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 245);
if (host._listLazy) {
                        _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 246);
modellist.free();
                    }
                    //======================================================
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 249);
host._repositionModel(model);
                }
                else {
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 252);
instance._renderOriginalTemplate(model);
                }
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 254);
delete instance._prevComparator[clientId];
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 255);
delete instance._currentModelHasChanged[clientId];
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
            _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "setModelToSecondTemplate", 267);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 268);
var instance = this,
                host = instance.host,
                clientId = host.getModelAttr(model, 'clientId'),
                modellist = host.get('modelList'),
                comparator = modellist && Y.bind(modellist.comparator, modellist),
                currentMode;

            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 275);
currentMode = instance._getMode(model);
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 276);
if (currentMode !== 2) {
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 277);
delete instance._initialEditAttrs[clientId];
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 278);
instance._prevMode[clientId] = instance._getMode(model);
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 279);
instance._secondModels[clientId] = true;
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 280);
delete instance._editModels[clientId];
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 281);
if (instance._currentModelHasChanged[clientId] && comparator &&
                   (instance._prevComparator[clientId]!==instance._getComparator(modellist, comparator, model))) {
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 283);
modellist.sort();
                    //====================================================
                    //
                    // Next is a bugfix for LazyModelList --> see issue https://github.com/yui/yui3/issues/634
                    // As soon as issue is resolved, remove modellist.free() command
                    //
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 289);
if (host._listLazy) {
                        _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 290);
modellist.free();
                    }
                    //======================================================
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 293);
host._renderView();
                }
                else {
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 296);
instance._renderSecondTemplate(model);
                }
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 298);
delete instance._prevComparator[clientId];
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 299);
delete instance._currentModelHasChanged[clientId];
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
            _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "setModelToEditTemplate", 311);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 312);
var instance = this,
                host = instance.host,
                modellist = host.get('modelList'),
                comparator = modellist && Y.bind(modellist.comparator, modellist),
                clientId = host.getModelAttr(model, 'clientId'),
                currentMode;
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 318);
if (instance.get('modelsEditable')) {
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 319);
currentMode = instance._getMode(model);
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 320);
if (currentMode !== 3) {
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 321);
delete instance._currentModelHasChanged[clientId];
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 322);
instance._prevComparator[clientId] = comparator && instance._getComparator(modellist, comparator, model);
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 323);
instance._prevMode[clientId] = currentMode;
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 324);
instance._editModels[clientId] = true;
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 325);
delete instance._secondModels[clientId];
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 326);
instance._renderEditTemplate(
                        model,
                        function() {
                            _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "(anonymous 3)", 328);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 329);
var modelNode = (Lang.isNumber(model) ? host.getNodeFromIndex(model, 0) : host.getNodeFromModel(model, 0));
                            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 330);
if (modelNode && modelNode.itsatabkeymanager) {
                                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 331);
modelNode.itsatabkeymanager.focusInitialItem();
                            }
                        }
                    );
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
            _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "restoreTemplate", 350);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 351);
var instance = this,
                host = instance.host,
                clientId = host.getModelAttr(model, 'clientId'),
                mode = instance._prevMode[clientId] || 1;

            // In case of new Models, we need to prevent ever falling into the 'newModelMode':
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 357);
if (host.isNewModel(model)) {
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 358);
instance._newModelCanChangeTemplate[clientId] = true;
            }
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 360);
switch (mode) {
                case 1: _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 361);
instance.setModelToOriginalTemplate(model);
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 362);
break;
                case 2: _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 363);
instance.setModelToSecondTemplate(model);
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 364);
break;
                case 3: _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 365);
instance.setModelToEditTemplate(model);
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 366);
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
            _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "destructor", 376);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 377);
var instance = this;

            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 379);
if (instance._fireEventTimer) {
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 380);
instance._fireEventTimer.cancel();
            }
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 382);
instance._clearEventhandlers();
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 383);
instance._initialEditAttrs = {};
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 384);
instance._secondModels = {};
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 385);
instance._editModels = {};
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 386);
instance._prevMode = {};
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 387);
instance._prevComparator = {};
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 388);
instance._currentModelHasChanged = {};
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 389);
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
            _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "_bindUI", 403);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 404);
var instance = this,
                host = instance.host,
                eventhandlers = instance._eventhandlers;

            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 408);
eventhandlers.push(
                host.after(
                    'itsaeditmodel:focusnext',
                    function(e) {
                        _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "(anonymous 4)", 411);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 412);
var model = e.target.get('host'),
                            modelnode = host.getNodeFromModel(model),
                            itsatabkeymanager;
                        _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 415);
while (modelnode && !modelnode.hasClass('itsa-model')) {
                            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 416);
modelnode = modelnode.get('parentNode');
                        }
                        _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 418);
if (modelnode) {
                            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 419);
itsatabkeymanager = modelnode.itsatabkeymanager;
                            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 420);
if (itsatabkeymanager && modelnode.hasClass('itsa-model-focus')) {
                                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 421);
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
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 431);
eventhandlers.push(
                host.after(
                    '*:resetclick',
                    function(e) {
                        _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "(anonymous 5)", 434);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 435);
var model = e.target, // NOT e.currentTarget: that is the (scroll)View-instance (?)
                            options = {fromEditModel: true}, // set Attribute with option: '{fromEditModel: true}'
                                                             // --> now the view knows it must not re-render completely.
                                                             // however, we MUST re-render the only item.
                            initialEditAttrs;
                        _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 440);
if (model instanceof Y.Model) {
                            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 441);
initialEditAttrs = instance._initialEditAttrs[model.get('clientId')];
                            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 442);
if (initialEditAttrs) {
                                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 443);
model.setAttrs(initialEditAttrs, options);
                                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 444);
if (instance._getMode(model)===3) {
                                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 445);
instance._renderEditTemplate(
                                        model,
                                        function() {
                                            _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "(anonymous 6)", 447);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 448);
var modelNode = (Lang.isNumber(model) ? host.getNodeFromIndex(model,0) : host.getNodeFromModel(model,0));
                                            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 449);
if (modelNode && modelNode.itsatabkeymanager) {
                                                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 450);
modelNode.itsatabkeymanager.focusInitialItem();
                                            }
                                        }
                                    );
                                }
                                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 455);
if (host.modelIsSelected(model)) {
                                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 456);
host._fireSelectedModels();
                                }
                            }
                        }
                    }
                )
            );
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 463);
eventhandlers.push(
                host.after(
                    ['itsaeditmodel:editmodelConfigAttrsChange', 'itsaeditmodel:templateChange'],
                    function() {
                        _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "(anonymous 7)", 466);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 467);
if (instance.get('modelsEditable')) {
                            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 468);
host._renderView(null, null);
                        }
                    }
                )
            );
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 473);
eventhandlers.push(
                host.after(
                    '*:submitclick',
                    function(e) {
                        _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "(anonymous 8)", 476);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 477);
var model = e.target;
                        _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 478);
if (model instanceof Y.Model) {
                            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 479);
if (instance.get('restoreOnSubmit')) {
                                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 480);
instance.restoreTemplate(model);
                            }
                        }
                    }
                )
            );
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 486);
eventhandlers.push(
                host.after(
                    '*:saveclick',
                    function(e) {
                        _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "(anonymous 9)", 489);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 490);
var model = e.target;
                        _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 491);
if (model instanceof Y.Model) {
                            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 492);
if (instance.get('restoreOnSave')) {
                                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 493);
instance.restoreTemplate(model);
                            }
                        }
                    }
                )
            );
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 499);
eventhandlers.push(
                instance.after(
                    'modelsEditableChange',
                    Y.bind(host._renderView, host, null, null)
                )
            );
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 505);
eventhandlers.push(
                instance.after(
                    'editmodelConfigAttrsChange',
                    function() {
                        // force recompiling of the editrenderer on next rendercall:
                        _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "(anonymous 10)", 508);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 510);
instance._editTempl = null;
                    }
                )
            );
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 514);
eventhandlers.push(
                host.after(
                    '*:change',
                    function(e) {
                        _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "(anonymous 11)", 517);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 518);
var model = e.target, // NOT e.currentTarget: that is the (scroll)View-instance (?)
                            modelNode, clientId;
                        _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 520);
if ((model instanceof Y.Model) && (instance._getMode(model)===3)) {
                            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 521);
clientId = host.getModelAttr(model, 'clientId');
                            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 522);
instance._currentModelHasChanged[clientId] = true;
                            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 523);
modelNode = host.getNodeFromModel(model, 0);
                            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 524);
modelNode.all('.'+ITSAFORMELEMENT_CHANGED_CLASS).removeClass(ITSAFORMELEMENT_CHANGED_CLASS);
                        }
                    }
                )
            );
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 529);
eventhandlers.push(
                host.on(
                    '*:destroy',
                    function(e) {
                        _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "(anonymous 12)", 532);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 533);
var model = e.target; // NOT e.currentTarget: that is the (scroll)View-instance (?)
                        _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 534);
if (model instanceof Y.Model) {
                            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 535);
delete instance._editModels[model.get('clientId')];
                            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 536);
if (host.modelIsSelected(model)) {
                                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 537);
host.unselectModels(model, false, true); // will fire an event itself
                            }
                        }
                    }
                )
            );
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 543);
eventhandlers.push(
                host.on(
                    'itsaeditmodel:destroy',
                    function(e) {
                        _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "(anonymous 13)", 546);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 547);
var model = e.target.get('host');
                        _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 548);
instance.restoreTemplate(model);
                    }
                )
            );
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 552);
eventhandlers.push(
                host.get('boundingBox').delegate(
                    'click',
                    function(e) {
                        _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "(anonymous 14)", 555);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 556);
var button = e.currentTarget,
                            isOriginalTemplate = button.hasClass(FORMELEMENT_BUTTON_ORIGINALTEMPLATE),
                            isSecondTemplate = button.hasClass(FORMELEMENT_BUTTON_SECONDTEMPLATE),
                            isEditTemplate = button.hasClass(FORMELEMENT_BUTTON_EDITTEMPLATE),
                            node, model;

                        _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 562);
if (isOriginalTemplate || isSecondTemplate || isEditTemplate) {
                            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 563);
node = button.get('parentNode');
                            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 564);
while (node && !node.hasClass(MODEL_CLASS)) {
                                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 565);
node = button.get('parentNode');
                            }
                            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 567);
if (node) {
                                // modelnode found
                                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 569);
model = host.getModelFromNode(node);
                                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 570);
if (isOriginalTemplate) {
                                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 571);
instance.setModelToOriginalTemplate(model);
                                }
                                else {_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 573);
if (isSecondTemplate) {
                                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 574);
instance.setModelToSecondTemplate(model);
                                }
                                else {_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 576);
if (isEditTemplate) {
                                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 577);
instance.setModelToEditTemplate(model);
                                }}}
                            }
                        }
                    },
                    'button'
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
            _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "_clearEventhandlers", 595);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 596);
YArray.each(
                this._eventhandlers,
                function(item){
                    _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "(anonymous 15)", 598);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 599);
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
            _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "_getComparator", 615);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 616);
var instance = this,
                host = instance.host,
                objectFromList;

            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 620);
if (model) {
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 621);
if (host._listLazy && model.get && (typeof model.get === 'function')) {
                    // caution: the revived models might be freed while 'model' is the previous revived model!
                    // indexOf doesn't work then. We need to search by clientId.
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 624);
objectFromList = modellist.getByClientId(model.get('clientId'));
                }
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 626);
return comparator(objectFromList || model);
            }
            else {
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 629);
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

            _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "_getMode", 645);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 647);
var instance = this,
                modelsEditable = instance.get('modelsEditable'),
                secondTemplate = instance.get('secondTemplate'),
                editTemplate = instance.get('editTemplate'),
                host = instance.host,
                clientId = host.getModelAttr(model, 'clientId'),
                mode = 1,
                newModelMode, modelInstance, usemodel, revivedModel;
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 655);
if (secondTemplate && instance._secondModels[clientId]) {
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 656);
mode = 2;
            }
            else {_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 658);
if (modelsEditable && editTemplate && instance._editModels[clientId]) {
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 659);
mode = 3;
            }
            else {_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 661);
if (host.isNewModel(model) && !instance._newModelCanChangeTemplate[clientId]) {
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 662);
newModelMode = instance.get('newModelMode');
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 663);
if ((newModelMode === 2) && secondTemplate) {
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 664);
mode = 2;
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 665);
instance._secondModels[clientId] = true;
                }
                else {_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 667);
if ((newModelMode === 3) && modelsEditable && editTemplate) {
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 668);
mode = 3;
                    // Also: we might need to plugin ItsaEditModel
                    // IMPORTANT: model could be an object in case of LazyModelList
                    // we need to revive it first
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 672);
modelInstance = model.get && (typeof model.get === 'function');
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 673);
if (!modelInstance && host._listLazy) {
                        _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 674);
revivedModel = host.get('modelList').revive(model);
                    }
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 676);
usemodel = revivedModel || model;
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 677);
instance._initialEditAttrs[clientId] = usemodel.getAttrs();
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 678);
if (!usemodel.itsaeditmodel) {
                        _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 679);
Y.use('gallery-itsaeditmodel', function(Y) {
                            _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "(anonymous 16)", 679);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 680);
usemodel.plug(Y.Plugin.ITSAEditModel, instance.get('configForEditModel'));
                            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 681);
if (!instance._editTempl) {
                                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 682);
instance._setEditTemplate(instance.get('editTemplate') || usemodel.itsaeditmodel.get('template') ||
                                                                                          ERROR_MESSAGE_NOTEMPLATE);
                            }
                        });
                    }
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 687);
instance._editModels[clientId] = true;
                }}
            }}}
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 690);
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
            _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "_getModelEngine", 705);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 706);
var instance = this,
                host = instance.host,
                modus = instance._getMode(model),
                modelJSON, engine;

            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 711);
switch (modus) {
                case 1: // default: the standard modelTemplate
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 713);
modelJSON = host.getModelToJSON(model);
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 714);
engine = compiledModelEngine ? compiledModelEngine(modelJSON) : Lang.sub(modelTemplate, modelJSON);
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 715);
break;
                case 2: // secondTemplate
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 717);
engine = instance._altTempl(model);
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 718);
break;
                case 3: // editTemplate
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 720);
engine = instance._editTempl(model);
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 721);
break;
            }
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 723);
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
            _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "_renderEditTemplate", 736);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 737);
var instance = this,
                host = instance.host,
                modelNode, modelInstance, revivedModel, usemodel;

            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 741);
modelNode = (Lang.isNumber(model) ? host.getNodeFromIndex(model, 0) : host.getNodeFromModel(model, 0));
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 742);
if (modelNode) {
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 743);
if (ISMICROTEMPLATE(instance.get('template')) || (instance._secondTempl && instance._secondTemplIsMicro)) {
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 744);
modelNode.cleanup();
                }
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 746);
Y.use('gallery-itsatabkeymanager', function(Y) {
                    _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "(anonymous 17)", 746);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 747);
if (!modelNode.itsatabkeymanager) {
                        _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 748);
modelNode.plug(Y.Plugin.ITSATabKeyManager);
                    }
                    // IMPORTANT: model could be an object in case of LazyModelList
                    // we need to revive it first
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 752);
modelInstance = model.get && (typeof model.get === 'function');
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 753);
if (!modelInstance && host._listLazy) {
                        _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 754);
revivedModel = host.get('modelList').revive(model);
                    }
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 756);
usemodel = revivedModel || model;
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 757);
instance._initialEditAttrs[usemodel.get('clientId')] = usemodel.getAttrs();
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 758);
if (!usemodel.itsaeditmodel) {
                        _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 759);
Y.use('gallery-itsaeditmodel', function(Y) {
                            _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "(anonymous 18)", 759);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 760);
usemodel.plug(Y.Plugin.ITSAEditModel, instance.get('configForEditModel'));
                            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 761);
if (!instance._editTempl) {
                                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 762);
instance._setEditTemplate(instance.get('editTemplate') || usemodel.itsaeditmodel.get('template') ||
                                                                                          ERROR_MESSAGE_NOTEMPLATE);
                            }
                            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 765);
modelNode.setHTML(instance._editTempl(usemodel));
                            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 766);
if (typeof callback === 'function') {
                                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 767);
callback();
                            }
                        });
                    }
                    else {
                        _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 772);
if (!instance._editTempl) {
                            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 773);
instance._setEditTemplate(instance.get('editTemplate') || usemodel.itsaeditmodel.get('template') ||
                                                                                      ERROR_MESSAGE_NOTEMPLATE);
                        }
                        _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 776);
modelNode.setHTML(instance._editTempl(usemodel));
                        _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 777);
if (typeof callback === 'function') {
                            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 778);
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
            _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "_renderSecondTemplate", 796);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 797);
var instance = this,
                host = instance.host,
                alternateTemplate = instance._secondTempl || host._templFns.template,
                modelNode;

            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 802);
modelNode = (Lang.isNumber(model) ? host.getNodeFromIndex(model, 0) : host.getNodeFromModel(model, 0));
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 803);
if (modelNode && alternateTemplate) {
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 804);
if (ISMICROTEMPLATE(instance.get('template')) || model.itsaeditmodel) {
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 805);
modelNode.cleanup();
                }
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 807);
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
            _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "_renderOriginalTemplate", 822);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 823);
var instance = this,
                host = instance.host,
                modelNode;

            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 827);
modelNode = (Lang.isNumber(model) ? host.getNodeFromIndex(model, 0) : host.getNodeFromModel(model, 0));
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 828);
if (modelNode) {
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 829);
if ((instance._secondTempl && instance._secondTemplIsMicro) || model.itsaeditmodel) {
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 830);
modelNode.cleanup();
                }
                // delete objectproperty from instance._secondModelsBEFORE calling host._templFns.template,
                // for the latter depends on whether the definition is there.
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 834);
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
            _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "_setEditTemplate", 849);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 850);
var instance = this,
                host = instance.host,
                compiledModelEngine, editTemplateIsMicro;

            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 854);
if (!template || (template==='')) {
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 855);
instance._editTempl = host._templFns.template;
            }
            else {
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 858);
editTemplateIsMicro = instance._editTemplIsMicro = ISMICROTEMPLATE(template);
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 859);
if (editTemplateIsMicro) {
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 860);
compiledModelEngine = Y.TemplateMicro.compile(template);
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 861);
instance._editTempl = function(model) {
                        _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "_editTempl", 861);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 862);
var modelInstance, usemodel, revivedModel;
                        _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 863);
modelInstance = model.get && (typeof model.get === 'function');
                        _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 864);
if (!modelInstance && host._listLazy) {
                            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 865);
revivedModel = host.get('modelList').revive(model);
                        }
                        _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 867);
usemodel = revivedModel || model;
                        _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 868);
if (!usemodel.itsaeditmodel) {
                            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 869);
Y.use('gallery-itsaeditmodel', function(Y) {
                                _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "(anonymous 19)", 869);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 870);
usemodel.plug(Y.Plugin.ITSAEditModel, instance.get('configForEditModel'));
                            });
                        }
                        _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 873);
return usemodel.itsaeditmodel ?
                               compiledModelEngine(usemodel.itsaeditmodel.toJSON(instance.get('editmodelConfigAttrs') ||
                               usemodel.itsaeditmodel.get('editmodelConfigAttrs'))) :
                               ERROR_MESSAGE_LOAD_ITSA_EDITMODEL_MODULE;
                    };
                }
                else {
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 880);
instance._editTempl = function(model) {
                        _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "_editTempl", 880);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 881);
var modelInstance, usemodel, revivedModel;
                        _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 882);
modelInstance = model.get && (typeof model.get === 'function');
                        _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 883);
if (!modelInstance && host._listLazy) {
                            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 884);
revivedModel = host.get('modelList').revive(model);
                        }
                        _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 886);
usemodel = revivedModel || model;
                        _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 887);
if (!usemodel.itsaeditmodel) {
                            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 888);
Y.use('gallery-itsaeditmodel', function(Y) {
                                _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "(anonymous 20)", 888);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 889);
usemodel.plug(Y.Plugin.ITSAEditModel, instance.get('configForEditModel'));
                            });
                        }
                        _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 892);
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
            _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "_setSecondTemplate", 910);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 911);
var instance = this,
                host = instance.host,
                compiledModelEngine, alternateTemplateIsMicro;

            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 915);
if (!val || (val==='')) {
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 916);
instance._secondTempl = null;
            }
            else {
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 919);
alternateTemplateIsMicro = instance._secondTemplIsMicro = ISMICROTEMPLATE(val);
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 920);
if (alternateTemplateIsMicro) {
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 921);
compiledModelEngine = Y.TemplateMicro.compile(val);
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 922);
instance._secondTempl = function(model) {
                        _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "_secondTempl", 922);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 923);
return compiledModelEngine(host.getModelToJSON(model));
                    };
                }
                else {
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 927);
instance._secondTempl = function(model) {
                        _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "_secondTempl", 927);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 928);
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
                    _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "validator", 952);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 953);
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
                    _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "validator", 969);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 970);
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
                    _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "validator", 987);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 988);
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
                    _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "validator", 1005);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 1006);
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
                    _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "validator", 1024);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 1025);
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
                    _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "validator", 1039);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 1040);
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
                    _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "validator", 1054);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 1055);
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
                    _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "validator", 1069);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 1070);
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
