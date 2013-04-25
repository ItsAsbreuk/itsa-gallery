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
_yuitest_coverage["build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js"].code=["YUI.add('gallery-itsachangemodeltemplate', function (Y, NAME) {","","'use strict';","","/**"," * Plugin Y.Plugin.ChangeModelTemplate"," *"," * Plugin for ITSAViewModellist and ITSAScrollViewModellist that makes it possible to toggle templates per model."," * This might be useful if your (scroll)viewModellist has many rendered models, where you need to toggle"," * some of them. There are three different states:"," *"," * 1) Original Template (standard defined by the host)"," * 2) 'secondTemplate' (can be set up within this plugin: for example to define an 'extended' view for the Models)"," * 3) 'editTemplate' (can be set up within this plugin: to edit the Models)"," *"," * Be aware that 'secondTemplate' and 'editTemplate' are used for rendering all Models."," *"," * To make the models editable, this plugin uses gallery-itsaeditmodel under the hood. The attribute 'configForEditModel' is passed"," * through to Y.Plugin.ITSAEditModel. Should you use a LazyModelList, then the editable Object is revived into a Model. For performancereason,"," * the revived models will not be freed: you may want to do this yourself."," *"," * @module gallery-itsachangemodeltemplate"," * @class ITSAChangeModelTemplate"," * @constructor"," * @since 0.1"," *"," * <i>Copyright (c) 2013 Marco Asbreuk - http://itsasbreuk.nl</i>"," * YUI BSD License - http://developer.yahoo.com/yui/license.html"," *","*/","","var Lang = Y.Lang,","    YArray = Y.Array,","    FORMELEMENT_CLASS = 'yui3-itsaformelement',","    ITSAFORMELEMENT_CHANGED_CLASS = FORMELEMENT_CLASS + '-changed',","    ERROR_MESSAGE_NOTEMPLATE = 'Attribute editTemplate is undefined',","    ISMICROTEMPLATE = function(template) {","        var microTemplateRegExp = /<%(.+)%>/;","        return microTemplateRegExp.test(template);","    };","","Y.namespace('Plugin').ITSAChangeModelTemplate = Y.Base.create('itsachangemodeltemplate', Y.Plugin.Base, [], {","","        /**","         * Sets up the toolbar during initialisation. Calls render() as soon as the hosts-editorframe is ready","         *","         * @method initializer","         * @protected","         * @since 0.1","         */","        initializer : function() {","            var instance = this;","","","            /**","             * Reference to the plugins host.","             * @property host","             * @default plugins host","             * @type Object","            */","            instance.host = instance.get('host');","","            /**","             * Internal reference to the compiled alternate template.","             * @property _secondTempl","             * @private","             * @default null","             * @type Function","            */","            instance._secondTempl = null;","","            /**","             * Internal flag to state whether the alternate template is of the type Y.Template.Micro","             * @property _secondTemplIsMicro","             * @private","             * @default null","             * @type Boolean","            */","            instance._secondTemplIsMicro = null;","","","            /**","             * Internal reference to the compiled edit template.","             * @property _editTempl","             * @private","             * @default null","             * @type Function","            */","            instance._editTempl = null;","","            /**","             * Internal flag to state is the edittemplate is a microtemplate","             * @property _editTemplIsMicro","             * @private","             * @default null","             * @type Boolean","            */","            instance._editTemplIsMicro = null;","","            /**","             * Internal backuplist of the Models attributes, used when the editdata needs to be reset.","             * @property _initialEditAttrs","             * @private","             * @default {}","             * @type Object","            */","            instance._initialEditAttrs = {};","","            /**","             * Internal backuplist to keep track of which models live in the state of the secondTemplate","             * @property _secondModels","             * @private","             * @default {}","             * @type Object","            */","            instance._secondModels = {};","","            /**","             * Internal backuplist to keep track of which models live in the state of the editTemplate","             * @property _editModels","             * @private","             * @default {}","             * @type Object","            */","            instance._editModels = {};","","            /**","             * Internal backuplist to keep track of the previous Mode of the Models, to enable restore the template to previous state.","             * @property _prevMode","             * @private","             * @default {}","             * @type Object","            */","            instance._prevMode = {};","","            /**","             * Internal list of all eventhandlers bound by this widget.","             * @property _eventhandlers","             * @private","             * @default []","             * @type Array","            */","            instance._eventhandlers = [];","","            /**","             * Internal flag-list that tells whether -in editMode- the user has changed the content of each Model. This way the module knows it","             * doesn't need to do a thorough re-render of the list.","             * @property _currentModelHasChanged","             * @private","             * @default false","             * @type Object","            */","            instance._currentModelHasChanged = {};","","            /**","             * Internal backuplist of the Models previous 'comparator-result', used determine if the comparators-value has changed after","             * the models has been edited.  This way the module knows it doesn't need to do a thorough re-render of the list.","             * @property _prevComparator","             * @private","             * @default {}","             * @type Object","            */","            instance._prevComparator = {};","","            instance._bindUI();","        },","","        /**","         * Re-renderes the Model -inside the ViewList- with its original template (defined by the host).","         * @method setModelToOriginalTemplate","         * @param model {Y.Model | Object} The item from the modellist. May be a Model, or an Object - in case of LazyModelList","         * @since 0.1","        */","        setModelToOriginalTemplate: function(model) {","            var instance = this,","                host = instance.host,","                clientId = host.getModelAttr(model, 'clientId'),","                modellist = host.get('modelList'),","                comparator = modellist && modellist.comparator,","                currentMode;","","            currentMode = instance._getMode(model);","            if (currentMode !== 1) {","                instance._prevMode[clientId] = instance._getMode(model);","                delete instance._secondModels[clientId];","                delete instance._initialEditAttrs[clientId];","                delete instance._editModels[clientId];","                if (instance._currentModelHasChanged[clientId] && comparator &&","                   (instance._prevComparator[clientId]!==instance._getComparator(modellist, comparator, model))) {","                    modellist.sort();","                    //====================================================","                    //","                    // Next is a bugfix for LazyModelList --> see issue https://github.com/yui/yui3/issues/634","                    // As soon as issue is resolved, remove modellist.free() command","                    //","                    if (host._listLazy) {","                        modellist.free();","                    }","                    //======================================================","                    host._repositionModel(model);","                }","                else {","                    instance._renderOriginalTemplate(model);","                }","                delete instance._prevComparator[clientId];","                delete instance._currentModelHasChanged[clientId];","            }","            else {","            }","        },","","        /**","         * Re-renderes the Model -inside the ViewList- with its second template (defined by 'secondTemplate').","         * @method setModelToSecondTemplate","         * @param model {Y.Model | Object} The item from the modellist. May be a Model, or an Object - in case of LazyModelList","         * @since 0.1","        */","        setModelToSecondTemplate: function(model) {","            var instance = this,","                host = instance.host,","                clientId = host.getModelAttr(model, 'clientId'),","                modellist = host.get('modelList'),","                comparator = modellist && Y.bind(modellist.comparator, modellist),","                currentMode;","","            currentMode = instance._getMode(model);","            if (currentMode !== 2) {","                delete instance._initialEditAttrs[clientId];","                instance._prevMode[clientId] = instance._getMode(model);","                instance._secondModels[clientId] = true;","                delete instance._editModels[clientId];","                if (instance._currentModelHasChanged[clientId] && comparator &&","                   (instance._prevComparator[clientId]!==instance._getComparator(modellist, comparator, model))) {","                    modellist.sort();","                    //====================================================","                    //","                    // Next is a bugfix for LazyModelList --> see issue https://github.com/yui/yui3/issues/634","                    // As soon as issue is resolved, remove modellist.free() command","                    //","                    if (host._listLazy) {","                        modellist.free();","                    }","                    //======================================================","                    host._renderView();","                }","                else {","                    instance._renderSecondTemplate(model);","                }","                delete instance._prevComparator[clientId];","                delete instance._currentModelHasChanged[clientId];","            }","            else {","            }","        },","","        /**","         * Re-renderes the Model -inside the ViewList- with its editable template (defined by 'editTemplate').","         * @method setModelToEditTemplate","         * @param model {Y.Model | Object} The item from the modellist. May be a Model, or an Object - in case of LazyModelList","         * @since 0.1","        */","        setModelToEditTemplate: function(model) {","            var instance = this,","                host = instance.host,","                modellist = host.get('modelList'),","                comparator = modellist && Y.bind(modellist.comparator, modellist),","                clientId = host.getModelAttr(model, 'clientId'),","                currentMode;","            if (instance.get('modelsEditable')) {","                currentMode = instance._getMode(model);","                if (currentMode !== 3) {","                    delete instance._currentModelHasChanged[clientId];","                    instance._prevComparator[clientId] = comparator && instance._getComparator(modellist, comparator, model);","                    instance._prevMode[clientId] = currentMode;","                    instance._editModels[clientId] = true;","                    delete instance._secondModels[clientId];","                    instance._renderEditTemplate(","                        model,","                        function() {","                            var modelNode = (Lang.isNumber(model) ? host.getNodeFromIndex(model, 0) : host.getNodeFromModel(model, 0));","                            if (modelNode && modelNode.itsatabkeymanager) {","                                modelNode.itsatabkeymanager.focusInitialItem();","                            }","                        }","                    );","                }","                else {","                }","            }","            else {","            }","        },","","        /**","         * Re-renderes the Model -inside the ViewList- with its previous template, performing a reverse-rendering. Only the template is","         * restored, thus, if the Model's content is changed, you will see the new Model's content.","         * @method restoreTemplate","         * @param model {Y.Model | Object} The item from the modellist. May be a Model, or an Object - in case of LazyModelList","         * @since 0.1","        */","        restoreTemplate : function(model) {","            var instance = this,","                clientId = instance.host.getModelAttr(model, 'clientId'),","                mode = instance._prevMode[clientId] || 1;","","            switch (mode) {","                case 1: instance.setModelToOriginalTemplate(model);","                break;","                case 2: instance.setModelToSecondTemplate(model);","                break;","                case 3: instance.setModelToEditTemplate(model);","                break;","            }","        },","","        /**","         * Cleans up bindings and removes plugin","         * @method destructor","         * @protected","         * @since 0.1","        */","        destructor : function() {","            var instance = this;","","            instance._clearEventhandlers();","            instance._initialEditAttrs = {};","            instance._secondModels = {};","            instance._editModels = {};","            instance._prevMode = {};","            instance._prevComparator = {};","            instance._currentModelHasChanged = {};","        },","","        //===============================================================================================","        // private methods","        //===============================================================================================","","        /**","         * Binding events","         *","         * @method _bindUI","         * @private","         * @since 0.1","        */","        _bindUI : function() {","            var instance = this,","                host = instance.host,","                eventhandlers = instance._eventhandlers;","","            eventhandlers.push(","                host.after(","                    'itsaeditmodel:focusnext',","                    function(e) {","                        var inputnode = e.inputNode,","                            modelnode = inputnode.get('parentNode'),","                            itsatabkeymanager;","                        while (modelnode && !modelnode.hasClass('itsa-model')) {","                            modelnode = modelnode.get('parentNode');","                        }","                        if (modelnode) {","                            itsatabkeymanager = modelnode.itsatabkeymanager;","                            if (itsatabkeymanager && modelnode.hasClass('itsa-model-focus')) {","                                itsatabkeymanager.next();","                            }","                            else {","                            }","                        }","                        else {","                        }","                    }","                )","            );","            eventhandlers.push(","                host.after(","                    'model:resetclick',","                    function(e) {","                        var model = e.target, // NOT e.currentTarget: that is the (scroll)View-instance (?)","                            options = {fromEditModel: true}, // set Attribute with option: '{fromEditModel: true}'","                                                             // --> now the view knows it must not re-render completely.","                                                             // however, we MUST re-render the only item.","                            initialEditAttrs = instance._initialEditAttrs[model.get('clientId')];","                        if (initialEditAttrs) {","                            model.setAttrs(initialEditAttrs, options);","                            if (instance._getMode(model)===3) {","                                instance._renderEditTemplate(","                                    model,","                                    function() {","                                        var modelNode = (Lang.isNumber(model) ? host.getNodeFromIndex(model, 0) : host.getNodeFromModel(model, 0));","                                        if (modelNode && modelNode.itsatabkeymanager) {","                                            modelNode.itsatabkeymanager.focusInitialItem();","                                        }","                                    }","                                );","                            }","                            if (host.modelIsSelected(model)) {","                                host._fireSelectedModels();","                            }","                        }","                    }","                )","            );","            eventhandlers.push(","                host.after(","                    ['itsaeditmodel:editmodelConfigAttrsChange', 'itsaeditmodel:templateChange'],","                    function() {","                        if (instance.get('modelsEditable')) {","                            host._renderView(null, null);","                        }","                    }","                )","            );","            eventhandlers.push(","                instance.after(","                    'modelsEditableChange',","                    Y.bind(host._renderView, host, null, null)","                )","            );","            eventhandlers.push(","                instance.after(","                    'editmodelConfigAttrsChange',","                    function() {","                        // force recompiling of the editrenderer on next rendercall:","                        instance._editTempl = null;","                    }","                )","            );","            eventhandlers.push(","                host.after(","                    'model:change',","                    function(e) {","                        var model = e.target, // NOT e.currentTarget: that is the (scroll)View-instance (?)","                            modelNode, clientId;","                        if (instance._getMode(model)===3) {","                            clientId = host.getModelAttr(model, 'clientId');","                            instance._currentModelHasChanged[clientId] = true;","                            modelNode = host.getNodeFromModel(model, 0);","                            modelNode.all('.'+ITSAFORMELEMENT_CHANGED_CLASS).removeClass(ITSAFORMELEMENT_CHANGED_CLASS);","","                        }","                    }","                )","            );","            eventhandlers.push(","                host.on(","                    'model:destroy',","                    function(e) {","                        var model = e.target; // NOT e.currentTarget: that is the (scroll)View-instance (?)","                        delete instance._editModels[model.get('clientId')];","                        if (host.modelIsSelected(model)) {","                            host.unselectModels(model, false, true); // will fire an event itself","                        }","                    }","                )","            );","        },","","        /**","         * Cleaning up all eventlisteners","         *","         * @method _clearEventhandlers","         * @private","         * @since 0.1","         *","        */","        _clearEventhandlers : function() {","            YArray.each(","                this._eventhandlers,","                function(item){","                    item.detach();","                }","            );","        },","","        /**","         * Gets the comparator-result of a Modelinstance. Because you might face a LazyModelList with a revived model, you need to","         * excecute 'comparator' with the object in those cases. This Method will take care of a correct calculation of the comparator","         * in all cases.","         * @method _getComparator","         * @param modellist {Y.ModelList|Y.LazyModelList} host's (lazy)modellist","         * @param comparator {Function} host's comparator","         * @param model {Y.Model | Object} The item from the modellist. May be a Model, or an Object - in case of LazyModelList","         * @private","         * @since 0.1","        */","        _getComparator : function(modellist, comparator, model) {","            var instance = this,","                host = instance.host,","                objectFromList;","","            if (model) {","                if (host._listLazy && model.get && (typeof model.get === 'function')) {","                    // caution: the revived models might be freed while 'model' is the previous revived model!","                    // indexOf doesn't work then. We need to search by clientId.","                    objectFromList = modellist.getByClientId(model.get('clientId'));","                }","                return comparator(objectFromList || model);","            }","            else {","                return 0;","            }","        },","","        /**","         * Returns the current 'Mode' of the Models rendering. Meaning: what Template is currently being used. This might be:<br />","         * 1: original template<br />","         * 2: secondTemplate<br />","         * 3: editTemplate<br />","         *","         * @method _getMode","         * @private","         * @param model {Y.Model | Object} The item from the modellist. May be a Model, or an Object - in case of LazyModelList","         * @since 0.1","         *","        */","        _getMode : function(model) {","            var instance = this,","                modelsEditable = instance.get('modelsEditable'),","                clientId = instance.host.getModelAttr(model, 'clientId'),","                mode = 1;","","            if (instance._secondModels[clientId]) {","                mode = 2;","            }","            if (modelsEditable && instance._editModels[clientId]) {","                mode = 3;","            }","            return mode;","        },","","        /**","         * Returns the active modelengine that is used by the specified Model.<br />","         * <i>This method is not used internally, but is called by ITSAScrollViewModellist and ITSAViewModellist</i>","         * @method _getModelEngine","         * @param model {Y.Model|Object} The item from the modellist. May be a Model, or an Object - in case of LazyModelList","         * @param modelTemplate {String} The 'modelTemplate' used by the host","         * @param compiledModelEngine {Function} Host's compiled 'modelTemplate', compiled using Y.Template.Micro","         * @private","         * @protected","         * @since 0.1","         *","        */","        _getModelEngine : function(model, modelTemplate, compiledModelEngine) {","            var instance = this,","                host = instance.host,","                modus = instance._getMode(model),","                modelJSON, engine;","","            switch (modus) {","                case 1: // default: the standard modelTemplate","                    modelJSON = host.getModelToJSON(model);","                    engine = compiledModelEngine ? compiledModelEngine(modelJSON) : Lang.sub(modelTemplate, modelJSON);","                break;","                case 2: // secondTemplate","                    engine = instance._altTempl(model);","                break;","                case 3: // editTemplate","                    engine = instance._editTempl(model);","                break;","            }","            return engine;","        },","","        /**","         * Re-renderes the Model with the editTemplate inside the ViewList.","         *","         * @method _renderEditTemplate","         * @private","         * @param model {Y.Model | Object} The item from the modellist. May be a Model, or an Object - in case of LazyModelList","         * @param callback {Function} callbackfunction to be executed once renerding is finished","         * @since 0.1","         *","        */","        _renderEditTemplate: function(model, callback) {","            var instance = this,","                host = instance.host,","                modelNode, modelInstance, revivedModel, usemodel;","","            modelNode = (Lang.isNumber(model) ? host.getNodeFromIndex(model, 0) : host.getNodeFromModel(model, 0));","            if (modelNode) {","                if (ISMICROTEMPLATE(instance.get('template')) || (instance._secondTempl && instance._secondTemplIsMicro)) {","                    modelNode.cleanup();","                }","                Y.use('gallery-itsatabkeymanager', function(Y) {","                    if (!modelNode.itsatabkeymanager) {","                        modelNode.plug(Y.Plugin.ITSATabKeyManager);","                    }","                    // IMPORTANT: model could be an object in case of LazyModelList","                    // we need to revive it first","                    modelInstance = model.get && (typeof model.get === 'function');","                    if (!modelInstance && host._listLazy) {","                        revivedModel = host.get('modelList').revive(model);","                    }","                    usemodel = revivedModel || model;","                    instance._initialEditAttrs[usemodel.get('clientId')] = usemodel.getAttrs();","                    if (!usemodel.itsaeditmodel) {","                        Y.use('gallery-itsaeditmodel', function(Y) {","                            usemodel.plug(Y.Plugin.ITSAEditModel, instance.get('configForEditModel'));","                            if (!instance._editTempl) {","                                instance._setEditTemplate(instance.get('editTemplate') || usemodel.itsaeditmodel.get('template')","                                                                                       || ERROR_MESSAGE_NOTEMPLATE);","                            }","                            modelNode.setHTML(instance._editTempl(usemodel));","                            if (typeof callback === 'function') {","                                callback();","                            }","                        });","                    }","                    else {","                        if (!instance._editTempl) {","                            instance._setEditTemplate(instance.get('editTemplate') || usemodel.itsaeditmodel.get('template')","                                                                                   || ERROR_MESSAGE_NOTEMPLATE);","                        }","                        modelNode.setHTML(instance._editTempl(usemodel));","                        if (typeof callback === 'function') {","                            callback();","                        }","                    }","                });","            }","            else {","            }","        },","","        /**","         * Re-renderes the Model with the secondTemplate inside the ViewList.","         *","         * @method _renderSecondTemplate","         * @private","         * @param model {Y.Model | Object} The item from the modellist. May be a Model, or an Object - in case of LazyModelList","         * @since 0.1","         *","        */","        _renderSecondTemplate: function(model) {","            var instance = this,","                host = instance.host,","                alternateTemplate = instance._secondTempl || host._templFns.template,","                modelNode;","","            modelNode = (Lang.isNumber(model) ? host.getNodeFromIndex(model, 0) : host.getNodeFromModel(model, 0));","            if (modelNode && alternateTemplate) {","                if (ISMICROTEMPLATE(instance.get('template')) || model.itsaeditmodel) {","                    modelNode.cleanup();","                }","                modelNode.setHTML(alternateTemplate(model));","            }","            else {","            }","        },","","        /**","         * Re-renderes the Model with the original template inside the ViewList.","         *","         * @method _renderOriginalTemplate","         * @private","         * @param model {Y.Model | Object} The item from the modellist. May be a Model, or an Object - in case of LazyModelList","         * @since 0.1","         *","        */","        _renderOriginalTemplate: function(model) {","            var instance = this,","                host = instance.host,","                modelNode;","","            modelNode = (Lang.isNumber(model) ? host.getNodeFromIndex(model, 0) : host.getNodeFromModel(model, 0));","            if (modelNode) {","                if ((instance._secondTempl && instance._secondTemplIsMicro) || model.itsaeditmodel) {","                    modelNode.cleanup();","                }","                // delete objectproperty from instance._secondModelsBEFORE calling host._templFns.template,","                // for the latter depends on whether the definition is there.","                modelNode.setHTML(host._templFns.template(model));","            }","            else {","            }","        },","","        /**","         * compiled the editTemplate into private variable _editTempl()","         *","         * @method _setEditTemplate","         * @param template {String} The new secondTemplate to be used. Must be of type Y.Lang.sub() or Y.Template.Micro()","         * @private","         * @since 0.1","         *","        */","        _setEditTemplate: function(template) {","            var instance = this,","                host = instance.host,","                compiledModelEngine, editTemplateIsMicro;","","            if (!template || (template==='')) {","                instance._editTempl = host._templFns.template;","            }","            else {","                editTemplateIsMicro = instance._editTemplIsMicro = ISMICROTEMPLATE(template);","                if (editTemplateIsMicro) {","                    compiledModelEngine = Y.TemplateMicro.compile(template);","                    instance._editTempl = function(model) {","                        var modelInstance = model.get && (model.get === 'function'),","                            usemodel, revivedmodel;","                        if (!modelInstance && host._listLazy) {","                            revivedmodel = host.get('modelList').revive(model);","                            if (!revivedmodel.itsaeditmodel) {","                                revivedmodel.plug(Y.Plugin.ITSAEditModel, instance.get('configForEditModel'));","                            }","                        }","                        usemodel = revivedmodel || model;","                        return compiledModelEngine(usemodel.itsaeditmodel.toJSON(instance.get('editmodelConfigAttrs')","                               || usemodel.itsaeditmodel.get('editmodelConfigAttrs')));","                    };","                }","                else {","                    instance._editTempl = function(model) {","                        var modelInstance = model.get && (model.get === 'function'),","                            usemodel, revivedmodel;","                        if (!modelInstance && host._listLazy) {","                            revivedmodel = host.get('modelList').revive(model);","                            if (!revivedmodel.itsaeditmodel) {","                                revivedmodel.plug(Y.Plugin.ITSAEditModel, instance.get('configForEditModel'));","                            }","                        }","                        usemodel = revivedmodel || model;","                        return Lang.sub(template, usemodel.itsaeditmodel.toJSON(instance.get('editmodelConfigAttrs')","                               || usemodel.itsaeditmodel.get('editmodelConfigAttrs')));","                    };","                }","            }","        },","","        /**","         * compiled the secondTemplate into private variable _secondTempl()","         *","         * @method _setSecondTemplate","         * @param template {String} The new secondTemplate to be used. Must be of type Y.Lang.sub() or Y.Template.Micro()","         * @private","         * @since 0.1","         *","        */","        _setSecondTemplate: function(val) {","            var instance = this,","                host = instance.host,","                compiledModelEngine, alternateTemplateIsMicro;","","            if (!val || (val==='')) {","                instance._secondTempl = null;","            }","            else {","                alternateTemplateIsMicro = instance._secondTemplIsMicro = ISMICROTEMPLATE(val);","                if (alternateTemplateIsMicro) {","                    compiledModelEngine = Y.TemplateMicro.compile(val);","                    instance._secondTempl = function(model) {","                        return compiledModelEngine(host.getModelToJSON(model));","                    };","                }","                else {","                    instance._secondTempl = function(model) {","                        return Lang.sub(val, host.getModelToJSON(model));","                    };","                }","            }","        }","","    }, {","        NS : 'itsacmtemplate',","        ATTRS : {","","            /**","             * The editmodelConfigAttrs to be used in the editable mode. See Y.Plugin.ITSAEditModel (gallery-itsaeditmodel)","             * for further specifications. If this attribute is empty, the plugin will search for 'configForEditModel.editmodelConfigAttrs',","             * which might as well define the config. However, it is preferable to define the configAttrs directly within 'editmodelConfigAttrs',","             * because through this attribute are able to change the configAttrs later on. (The one within 'configForEditModel.editmodelConfigAttrs'","             * is only read during initialisation).","             *","             * @attribute editmodelConfigAttrs","             * @type {Object}","             * @default false","             * @since 0.1","             */","            editmodelConfigAttrs: {","                value: {},","                validator: function(v){","                    return Lang.isObject(v);","                }","            },","","            /**","             * The <b>config</b> that is passed through directly into Y.Plugin.ITSAEditModel. Event though you can define","             * 'configForEditModel.template' and 'configForEditModel.editmodelConfigAttrs', the referred way for those to properties","             * is to set them directly within this wplugin-level (see 'editTemplate' and 'editmodelConfigAttrs' for the why).","             *","             * @attribute configForEditModel","             * @type {Boolean}","             * @default false","             * @since 0.1","             */","            configForEditModel: {","                value: null,","                validator: function(v){","                    return Lang.isObject(v);","                }","            },","","            /**","             * The template to be used in the editable mode. Use either Y.Lang.sub or Y.Template.Micor syntax. If this attribute is empty,","             * the plugin will search for 'configForEditModel.template', which might as well define the editTemplate. However, it is preferable","             * to define the editable template directly within 'editTemplate', because through this attribute are able to change the","             * editable-template later on. (The one within 'configForEditModel.editTemplate' is only read during initialisation).","             *","             * @attribute editTemplate","             * @type {Boolean}","             * @default false","             * @since 0.1","             */","            editTemplate: {","                value: null,","                validator: function(v){","                    return (typeof v === 'string');","                },","                setter: '_setEditTemplate'","            },","","            /**","             * Makes the View able to render the editable-version of the Model. By setting to false, you can make a controller to","             * disable the edit-functionality of the whole host-list.","             *","             * @attribute modelsEditable","             * @type {Boolean}","             * @default true","             * @since 0.1","             */","            modelsEditable: {","                value: true,","                lazyAdd: false,","                validator: function(v){","                    return Lang.isBoolean(v);","                }","            },","","            /**","             * Defines the template to be used as 'secondTemplate'. Will be used for all Models that are rendered by setModelToSecondTemplate()","             *","             * @attribute secondTemplate","             * @type {Boolean}","             * @default false","             * @since 0.1","             */","            secondTemplate: {","                value: null,","                validator: function(v){","                    return (typeof v === 'string');","                },","                setter: '_setSecondTemplate'","            }","","        }","    }",");","","}, '@VERSION@', {","    \"requires\": [","        \"yui-base\",","        \"node-core\",","        \"base-base\",","        \"base-build\",","        \"plugin\",","        \"pluginhost-base\",","        \"oop\",","        \"template-micro\"","    ]","});"];
_yuitest_coverage["build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js"].lines = {"1":0,"3":0,"32":0,"38":0,"39":0,"42":0,"52":0,"61":0,"70":0,"79":0,"89":0,"98":0,"107":0,"116":0,"125":0,"134":0,"143":0,"153":0,"163":0,"165":0,"175":0,"182":0,"183":0,"184":0,"185":0,"186":0,"187":0,"188":0,"190":0,"196":0,"197":0,"200":0,"203":0,"205":0,"206":0,"219":0,"226":0,"227":0,"228":0,"229":0,"230":0,"231":0,"232":0,"234":0,"240":0,"241":0,"244":0,"247":0,"249":0,"250":0,"263":0,"269":0,"270":0,"271":0,"272":0,"273":0,"274":0,"275":0,"276":0,"277":0,"280":0,"281":0,"282":0,"302":0,"306":0,"307":0,"308":0,"309":0,"310":0,"311":0,"312":0,"323":0,"325":0,"326":0,"327":0,"328":0,"329":0,"330":0,"331":0,"346":0,"350":0,"354":0,"357":0,"358":0,"360":0,"361":0,"362":0,"363":0,"373":0,"377":0,"382":0,"383":0,"384":0,"385":0,"388":0,"389":0,"390":0,"395":0,"396":0,"402":0,"406":0,"407":0,"412":0,"418":0,"423":0,"427":0,"431":0,"433":0,"434":0,"435":0,"436":0,"437":0,"443":0,"447":0,"448":0,"449":0,"450":0,"466":0,"469":0,"486":0,"490":0,"491":0,"494":0,"496":0,"499":0,"516":0,"521":0,"522":0,"524":0,"525":0,"527":0,"543":0,"548":0,"550":0,"551":0,"552":0,"554":0,"555":0,"557":0,"558":0,"560":0,"574":0,"578":0,"579":0,"580":0,"581":0,"583":0,"584":0,"585":0,"589":0,"590":0,"591":0,"593":0,"594":0,"595":0,"596":0,"597":0,"598":0,"599":0,"602":0,"603":0,"604":0,"609":0,"610":0,"613":0,"614":0,"615":0,"634":0,"639":0,"640":0,"641":0,"642":0,"644":0,"660":0,"664":0,"665":0,"666":0,"667":0,"671":0,"687":0,"691":0,"692":0,"695":0,"696":0,"697":0,"698":0,"699":0,"701":0,"702":0,"703":0,"704":0,"707":0,"708":0,"713":0,"714":0,"716":0,"717":0,"718":0,"719":0,"722":0,"723":0,"740":0,"744":0,"745":0,"748":0,"749":0,"750":0,"751":0,"752":0,"756":0,"757":0,"782":0,"799":0,"817":0,"835":0,"850":0};
_yuitest_coverage["build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js"].functions = {"ISMICROTEMPLATE:37":0,"initializer:51":0,"setModelToOriginalTemplate:174":0,"setModelToSecondTemplate:218":0,"(anonymous 2):279":0,"setModelToEditTemplate:262":0,"restoreTemplate:301":0,"destructor:322":0,"(anonymous 3):353":0,"(anonymous 5):387":0,"(anonymous 4):376":0,"(anonymous 6):405":0,"(anonymous 7):421":0,"(anonymous 8):430":0,"(anonymous 9):446":0,"_bindUI:345":0,"(anonymous 10):468":0,"_clearEventhandlers:465":0,"_getComparator:485":0,"_getMode:515":0,"_getModelEngine:542":0,"(anonymous 12):596":0,"(anonymous 11):583":0,"_renderEditTemplate:573":0,"_renderSecondTemplate:633":0,"_renderOriginalTemplate:659":0,"_editTempl:698":0,"_editTempl:713":0,"_setEditTemplate:686":0,"_secondTempl:751":0,"_secondTempl:756":0,"_setSecondTemplate:739":0,"validator:781":0,"validator:798":0,"validator:816":0,"validator:834":0,"validator:849":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js"].coveredLines = 216;
_yuitest_coverage["build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js"].coveredFunctions = 38;
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
    ERROR_MESSAGE_NOTEMPLATE = 'Attribute editTemplate is undefined',
    ISMICROTEMPLATE = function(template) {
        _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "ISMICROTEMPLATE", 37);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 38);
var microTemplateRegExp = /<%(.+)%>/;
        _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 39);
return microTemplateRegExp.test(template);
    };

_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 42);
Y.namespace('Plugin').ITSAChangeModelTemplate = Y.Base.create('itsachangemodeltemplate', Y.Plugin.Base, [], {

        /**
         * Sets up the toolbar during initialisation. Calls render() as soon as the hosts-editorframe is ready
         *
         * @method initializer
         * @protected
         * @since 0.1
         */
        initializer : function() {
            _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "initializer", 51);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 52);
var instance = this;


            /**
             * Reference to the plugins host.
             * @property host
             * @default plugins host
             * @type Object
            */
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 61);
instance.host = instance.get('host');

            /**
             * Internal reference to the compiled alternate template.
             * @property _secondTempl
             * @private
             * @default null
             * @type Function
            */
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 70);
instance._secondTempl = null;

            /**
             * Internal flag to state whether the alternate template is of the type Y.Template.Micro
             * @property _secondTemplIsMicro
             * @private
             * @default null
             * @type Boolean
            */
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 79);
instance._secondTemplIsMicro = null;


            /**
             * Internal reference to the compiled edit template.
             * @property _editTempl
             * @private
             * @default null
             * @type Function
            */
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 89);
instance._editTempl = null;

            /**
             * Internal flag to state is the edittemplate is a microtemplate
             * @property _editTemplIsMicro
             * @private
             * @default null
             * @type Boolean
            */
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 98);
instance._editTemplIsMicro = null;

            /**
             * Internal backuplist of the Models attributes, used when the editdata needs to be reset.
             * @property _initialEditAttrs
             * @private
             * @default {}
             * @type Object
            */
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 107);
instance._initialEditAttrs = {};

            /**
             * Internal backuplist to keep track of which models live in the state of the secondTemplate
             * @property _secondModels
             * @private
             * @default {}
             * @type Object
            */
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 116);
instance._secondModels = {};

            /**
             * Internal backuplist to keep track of which models live in the state of the editTemplate
             * @property _editModels
             * @private
             * @default {}
             * @type Object
            */
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 125);
instance._editModels = {};

            /**
             * Internal backuplist to keep track of the previous Mode of the Models, to enable restore the template to previous state.
             * @property _prevMode
             * @private
             * @default {}
             * @type Object
            */
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 134);
instance._prevMode = {};

            /**
             * Internal list of all eventhandlers bound by this widget.
             * @property _eventhandlers
             * @private
             * @default []
             * @type Array
            */
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 143);
instance._eventhandlers = [];

            /**
             * Internal flag-list that tells whether -in editMode- the user has changed the content of each Model. This way the module knows it
             * doesn't need to do a thorough re-render of the list.
             * @property _currentModelHasChanged
             * @private
             * @default false
             * @type Object
            */
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 153);
instance._currentModelHasChanged = {};

            /**
             * Internal backuplist of the Models previous 'comparator-result', used determine if the comparators-value has changed after
             * the models has been edited.  This way the module knows it doesn't need to do a thorough re-render of the list.
             * @property _prevComparator
             * @private
             * @default {}
             * @type Object
            */
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 163);
instance._prevComparator = {};

            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 165);
instance._bindUI();
        },

        /**
         * Re-renderes the Model -inside the ViewList- with its original template (defined by the host).
         * @method setModelToOriginalTemplate
         * @param model {Y.Model | Object} The item from the modellist. May be a Model, or an Object - in case of LazyModelList
         * @since 0.1
        */
        setModelToOriginalTemplate: function(model) {
            _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "setModelToOriginalTemplate", 174);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 175);
var instance = this,
                host = instance.host,
                clientId = host.getModelAttr(model, 'clientId'),
                modellist = host.get('modelList'),
                comparator = modellist && modellist.comparator,
                currentMode;

            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 182);
currentMode = instance._getMode(model);
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 183);
if (currentMode !== 1) {
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 184);
instance._prevMode[clientId] = instance._getMode(model);
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 185);
delete instance._secondModels[clientId];
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 186);
delete instance._initialEditAttrs[clientId];
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 187);
delete instance._editModels[clientId];
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 188);
if (instance._currentModelHasChanged[clientId] && comparator &&
                   (instance._prevComparator[clientId]!==instance._getComparator(modellist, comparator, model))) {
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 190);
modellist.sort();
                    //====================================================
                    //
                    // Next is a bugfix for LazyModelList --> see issue https://github.com/yui/yui3/issues/634
                    // As soon as issue is resolved, remove modellist.free() command
                    //
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 196);
if (host._listLazy) {
                        _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 197);
modellist.free();
                    }
                    //======================================================
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 200);
host._repositionModel(model);
                }
                else {
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 203);
instance._renderOriginalTemplate(model);
                }
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 205);
delete instance._prevComparator[clientId];
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 206);
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
            _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "setModelToSecondTemplate", 218);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 219);
var instance = this,
                host = instance.host,
                clientId = host.getModelAttr(model, 'clientId'),
                modellist = host.get('modelList'),
                comparator = modellist && Y.bind(modellist.comparator, modellist),
                currentMode;

            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 226);
currentMode = instance._getMode(model);
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 227);
if (currentMode !== 2) {
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 228);
delete instance._initialEditAttrs[clientId];
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 229);
instance._prevMode[clientId] = instance._getMode(model);
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 230);
instance._secondModels[clientId] = true;
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 231);
delete instance._editModels[clientId];
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 232);
if (instance._currentModelHasChanged[clientId] && comparator &&
                   (instance._prevComparator[clientId]!==instance._getComparator(modellist, comparator, model))) {
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 234);
modellist.sort();
                    //====================================================
                    //
                    // Next is a bugfix for LazyModelList --> see issue https://github.com/yui/yui3/issues/634
                    // As soon as issue is resolved, remove modellist.free() command
                    //
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 240);
if (host._listLazy) {
                        _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 241);
modellist.free();
                    }
                    //======================================================
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 244);
host._renderView();
                }
                else {
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 247);
instance._renderSecondTemplate(model);
                }
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 249);
delete instance._prevComparator[clientId];
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 250);
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
            _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "setModelToEditTemplate", 262);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 263);
var instance = this,
                host = instance.host,
                modellist = host.get('modelList'),
                comparator = modellist && Y.bind(modellist.comparator, modellist),
                clientId = host.getModelAttr(model, 'clientId'),
                currentMode;
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 269);
if (instance.get('modelsEditable')) {
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 270);
currentMode = instance._getMode(model);
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 271);
if (currentMode !== 3) {
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 272);
delete instance._currentModelHasChanged[clientId];
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 273);
instance._prevComparator[clientId] = comparator && instance._getComparator(modellist, comparator, model);
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 274);
instance._prevMode[clientId] = currentMode;
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 275);
instance._editModels[clientId] = true;
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 276);
delete instance._secondModels[clientId];
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 277);
instance._renderEditTemplate(
                        model,
                        function() {
                            _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "(anonymous 2)", 279);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 280);
var modelNode = (Lang.isNumber(model) ? host.getNodeFromIndex(model, 0) : host.getNodeFromModel(model, 0));
                            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 281);
if (modelNode && modelNode.itsatabkeymanager) {
                                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 282);
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
            _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "restoreTemplate", 301);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 302);
var instance = this,
                clientId = instance.host.getModelAttr(model, 'clientId'),
                mode = instance._prevMode[clientId] || 1;

            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 306);
switch (mode) {
                case 1: _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 307);
instance.setModelToOriginalTemplate(model);
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 308);
break;
                case 2: _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 309);
instance.setModelToSecondTemplate(model);
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 310);
break;
                case 3: _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 311);
instance.setModelToEditTemplate(model);
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 312);
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
            _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "destructor", 322);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 323);
var instance = this;

            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 325);
instance._clearEventhandlers();
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 326);
instance._initialEditAttrs = {};
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 327);
instance._secondModels = {};
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 328);
instance._editModels = {};
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 329);
instance._prevMode = {};
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 330);
instance._prevComparator = {};
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 331);
instance._currentModelHasChanged = {};
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
            _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "_bindUI", 345);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 346);
var instance = this,
                host = instance.host,
                eventhandlers = instance._eventhandlers;

            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 350);
eventhandlers.push(
                host.after(
                    'itsaeditmodel:focusnext',
                    function(e) {
                        _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "(anonymous 3)", 353);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 354);
var inputnode = e.inputNode,
                            modelnode = inputnode.get('parentNode'),
                            itsatabkeymanager;
                        _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 357);
while (modelnode && !modelnode.hasClass('itsa-model')) {
                            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 358);
modelnode = modelnode.get('parentNode');
                        }
                        _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 360);
if (modelnode) {
                            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 361);
itsatabkeymanager = modelnode.itsatabkeymanager;
                            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 362);
if (itsatabkeymanager && modelnode.hasClass('itsa-model-focus')) {
                                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 363);
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
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 373);
eventhandlers.push(
                host.after(
                    'model:resetclick',
                    function(e) {
                        _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "(anonymous 4)", 376);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 377);
var model = e.target, // NOT e.currentTarget: that is the (scroll)View-instance (?)
                            options = {fromEditModel: true}, // set Attribute with option: '{fromEditModel: true}'
                                                             // --> now the view knows it must not re-render completely.
                                                             // however, we MUST re-render the only item.
                            initialEditAttrs = instance._initialEditAttrs[model.get('clientId')];
                        _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 382);
if (initialEditAttrs) {
                            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 383);
model.setAttrs(initialEditAttrs, options);
                            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 384);
if (instance._getMode(model)===3) {
                                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 385);
instance._renderEditTemplate(
                                    model,
                                    function() {
                                        _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "(anonymous 5)", 387);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 388);
var modelNode = (Lang.isNumber(model) ? host.getNodeFromIndex(model, 0) : host.getNodeFromModel(model, 0));
                                        _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 389);
if (modelNode && modelNode.itsatabkeymanager) {
                                            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 390);
modelNode.itsatabkeymanager.focusInitialItem();
                                        }
                                    }
                                );
                            }
                            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 395);
if (host.modelIsSelected(model)) {
                                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 396);
host._fireSelectedModels();
                            }
                        }
                    }
                )
            );
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 402);
eventhandlers.push(
                host.after(
                    ['itsaeditmodel:editmodelConfigAttrsChange', 'itsaeditmodel:templateChange'],
                    function() {
                        _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "(anonymous 6)", 405);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 406);
if (instance.get('modelsEditable')) {
                            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 407);
host._renderView(null, null);
                        }
                    }
                )
            );
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 412);
eventhandlers.push(
                instance.after(
                    'modelsEditableChange',
                    Y.bind(host._renderView, host, null, null)
                )
            );
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 418);
eventhandlers.push(
                instance.after(
                    'editmodelConfigAttrsChange',
                    function() {
                        // force recompiling of the editrenderer on next rendercall:
                        _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "(anonymous 7)", 421);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 423);
instance._editTempl = null;
                    }
                )
            );
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 427);
eventhandlers.push(
                host.after(
                    'model:change',
                    function(e) {
                        _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "(anonymous 8)", 430);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 431);
var model = e.target, // NOT e.currentTarget: that is the (scroll)View-instance (?)
                            modelNode, clientId;
                        _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 433);
if (instance._getMode(model)===3) {
                            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 434);
clientId = host.getModelAttr(model, 'clientId');
                            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 435);
instance._currentModelHasChanged[clientId] = true;
                            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 436);
modelNode = host.getNodeFromModel(model, 0);
                            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 437);
modelNode.all('.'+ITSAFORMELEMENT_CHANGED_CLASS).removeClass(ITSAFORMELEMENT_CHANGED_CLASS);

                        }
                    }
                )
            );
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 443);
eventhandlers.push(
                host.on(
                    'model:destroy',
                    function(e) {
                        _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "(anonymous 9)", 446);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 447);
var model = e.target; // NOT e.currentTarget: that is the (scroll)View-instance (?)
                        _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 448);
delete instance._editModels[model.get('clientId')];
                        _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 449);
if (host.modelIsSelected(model)) {
                            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 450);
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
            _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "_clearEventhandlers", 465);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 466);
YArray.each(
                this._eventhandlers,
                function(item){
                    _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "(anonymous 10)", 468);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 469);
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
            _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "_getComparator", 485);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 486);
var instance = this,
                host = instance.host,
                objectFromList;

            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 490);
if (model) {
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 491);
if (host._listLazy && model.get && (typeof model.get === 'function')) {
                    // caution: the revived models might be freed while 'model' is the previous revived model!
                    // indexOf doesn't work then. We need to search by clientId.
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 494);
objectFromList = modellist.getByClientId(model.get('clientId'));
                }
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 496);
return comparator(objectFromList || model);
            }
            else {
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 499);
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
            _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "_getMode", 515);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 516);
var instance = this,
                modelsEditable = instance.get('modelsEditable'),
                clientId = instance.host.getModelAttr(model, 'clientId'),
                mode = 1;

            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 521);
if (instance._secondModels[clientId]) {
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 522);
mode = 2;
            }
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 524);
if (modelsEditable && instance._editModels[clientId]) {
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 525);
mode = 3;
            }
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 527);
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
            _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "_getModelEngine", 542);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 543);
var instance = this,
                host = instance.host,
                modus = instance._getMode(model),
                modelJSON, engine;

            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 548);
switch (modus) {
                case 1: // default: the standard modelTemplate
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 550);
modelJSON = host.getModelToJSON(model);
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 551);
engine = compiledModelEngine ? compiledModelEngine(modelJSON) : Lang.sub(modelTemplate, modelJSON);
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 552);
break;
                case 2: // secondTemplate
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 554);
engine = instance._altTempl(model);
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 555);
break;
                case 3: // editTemplate
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 557);
engine = instance._editTempl(model);
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 558);
break;
            }
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 560);
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
            _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "_renderEditTemplate", 573);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 574);
var instance = this,
                host = instance.host,
                modelNode, modelInstance, revivedModel, usemodel;

            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 578);
modelNode = (Lang.isNumber(model) ? host.getNodeFromIndex(model, 0) : host.getNodeFromModel(model, 0));
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 579);
if (modelNode) {
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 580);
if (ISMICROTEMPLATE(instance.get('template')) || (instance._secondTempl && instance._secondTemplIsMicro)) {
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 581);
modelNode.cleanup();
                }
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 583);
Y.use('gallery-itsatabkeymanager', function(Y) {
                    _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "(anonymous 11)", 583);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 584);
if (!modelNode.itsatabkeymanager) {
                        _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 585);
modelNode.plug(Y.Plugin.ITSATabKeyManager);
                    }
                    // IMPORTANT: model could be an object in case of LazyModelList
                    // we need to revive it first
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 589);
modelInstance = model.get && (typeof model.get === 'function');
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 590);
if (!modelInstance && host._listLazy) {
                        _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 591);
revivedModel = host.get('modelList').revive(model);
                    }
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 593);
usemodel = revivedModel || model;
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 594);
instance._initialEditAttrs[usemodel.get('clientId')] = usemodel.getAttrs();
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 595);
if (!usemodel.itsaeditmodel) {
                        _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 596);
Y.use('gallery-itsaeditmodel', function(Y) {
                            _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "(anonymous 12)", 596);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 597);
usemodel.plug(Y.Plugin.ITSAEditModel, instance.get('configForEditModel'));
                            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 598);
if (!instance._editTempl) {
                                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 599);
instance._setEditTemplate(instance.get('editTemplate') || usemodel.itsaeditmodel.get('template')
                                                                                       || ERROR_MESSAGE_NOTEMPLATE);
                            }
                            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 602);
modelNode.setHTML(instance._editTempl(usemodel));
                            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 603);
if (typeof callback === 'function') {
                                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 604);
callback();
                            }
                        });
                    }
                    else {
                        _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 609);
if (!instance._editTempl) {
                            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 610);
instance._setEditTemplate(instance.get('editTemplate') || usemodel.itsaeditmodel.get('template')
                                                                                   || ERROR_MESSAGE_NOTEMPLATE);
                        }
                        _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 613);
modelNode.setHTML(instance._editTempl(usemodel));
                        _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 614);
if (typeof callback === 'function') {
                            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 615);
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
            _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "_renderSecondTemplate", 633);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 634);
var instance = this,
                host = instance.host,
                alternateTemplate = instance._secondTempl || host._templFns.template,
                modelNode;

            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 639);
modelNode = (Lang.isNumber(model) ? host.getNodeFromIndex(model, 0) : host.getNodeFromModel(model, 0));
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 640);
if (modelNode && alternateTemplate) {
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 641);
if (ISMICROTEMPLATE(instance.get('template')) || model.itsaeditmodel) {
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 642);
modelNode.cleanup();
                }
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 644);
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
            _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "_renderOriginalTemplate", 659);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 660);
var instance = this,
                host = instance.host,
                modelNode;

            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 664);
modelNode = (Lang.isNumber(model) ? host.getNodeFromIndex(model, 0) : host.getNodeFromModel(model, 0));
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 665);
if (modelNode) {
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 666);
if ((instance._secondTempl && instance._secondTemplIsMicro) || model.itsaeditmodel) {
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 667);
modelNode.cleanup();
                }
                // delete objectproperty from instance._secondModelsBEFORE calling host._templFns.template,
                // for the latter depends on whether the definition is there.
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 671);
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
            _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "_setEditTemplate", 686);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 687);
var instance = this,
                host = instance.host,
                compiledModelEngine, editTemplateIsMicro;

            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 691);
if (!template || (template==='')) {
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 692);
instance._editTempl = host._templFns.template;
            }
            else {
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 695);
editTemplateIsMicro = instance._editTemplIsMicro = ISMICROTEMPLATE(template);
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 696);
if (editTemplateIsMicro) {
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 697);
compiledModelEngine = Y.TemplateMicro.compile(template);
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 698);
instance._editTempl = function(model) {
                        _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "_editTempl", 698);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 699);
var modelInstance = model.get && (model.get === 'function'),
                            usemodel, revivedmodel;
                        _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 701);
if (!modelInstance && host._listLazy) {
                            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 702);
revivedmodel = host.get('modelList').revive(model);
                            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 703);
if (!revivedmodel.itsaeditmodel) {
                                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 704);
revivedmodel.plug(Y.Plugin.ITSAEditModel, instance.get('configForEditModel'));
                            }
                        }
                        _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 707);
usemodel = revivedmodel || model;
                        _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 708);
return compiledModelEngine(usemodel.itsaeditmodel.toJSON(instance.get('editmodelConfigAttrs')
                               || usemodel.itsaeditmodel.get('editmodelConfigAttrs')));
                    };
                }
                else {
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 713);
instance._editTempl = function(model) {
                        _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "_editTempl", 713);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 714);
var modelInstance = model.get && (model.get === 'function'),
                            usemodel, revivedmodel;
                        _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 716);
if (!modelInstance && host._listLazy) {
                            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 717);
revivedmodel = host.get('modelList').revive(model);
                            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 718);
if (!revivedmodel.itsaeditmodel) {
                                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 719);
revivedmodel.plug(Y.Plugin.ITSAEditModel, instance.get('configForEditModel'));
                            }
                        }
                        _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 722);
usemodel = revivedmodel || model;
                        _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 723);
return Lang.sub(template, usemodel.itsaeditmodel.toJSON(instance.get('editmodelConfigAttrs')
                               || usemodel.itsaeditmodel.get('editmodelConfigAttrs')));
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
            _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "_setSecondTemplate", 739);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 740);
var instance = this,
                host = instance.host,
                compiledModelEngine, alternateTemplateIsMicro;

            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 744);
if (!val || (val==='')) {
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 745);
instance._secondTempl = null;
            }
            else {
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 748);
alternateTemplateIsMicro = instance._secondTemplIsMicro = ISMICROTEMPLATE(val);
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 749);
if (alternateTemplateIsMicro) {
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 750);
compiledModelEngine = Y.TemplateMicro.compile(val);
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 751);
instance._secondTempl = function(model) {
                        _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "_secondTempl", 751);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 752);
return compiledModelEngine(host.getModelToJSON(model));
                    };
                }
                else {
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 756);
instance._secondTempl = function(model) {
                        _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "_secondTempl", 756);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 757);
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
                    _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "validator", 781);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 782);
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
                    _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "validator", 798);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 799);
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
                    _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "validator", 816);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 817);
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
                    _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "validator", 834);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 835);
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
                    _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "validator", 849);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 850);
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
        "plugin",
        "pluginhost-base",
        "oop",
        "template-micro"
    ]
});
