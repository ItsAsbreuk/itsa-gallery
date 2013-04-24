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
_yuitest_coverage["build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js"].code=["YUI.add('gallery-itsachangemodeltemplate', function (Y, NAME) {","","'use strict';","","/**"," * Plugin Y.Plugin.ChangeModelTemplate"," *"," * Plugin for ITSAViewModellist and ITSAScrollViewModellist that makes it possible to toggle templates per model."," * This might be useful if your (scroll)viewModellist has many rendered models, where you need to toggle"," * some of them. There are three different states:"," *"," * 1) Original Template (standard defined by the host)"," * 2) 'secondTemplate' (can be set up within this plugin: for example to define an 'extended' view for the Models)"," * 3) 'editTemplate' (can be set up within this plugin: to edit the Models)"," *"," * Be aware that 'secondTemplate' and 'editTemplate' are used for rendering all Models."," *"," * To make the models editable, this plugin uses gallery-itsaeditmodel under the hood. The attribute 'configForEditModel' is passed"," * through to Y.Plugin.ITSAEditModel. Should you use a LazyModelList, then the editable Object is revived into a Model. For performancereason,"," * the revived models will not be freed: you may want to do this yourself."," *"," * @module gallery-itsachangemodeltemplate"," * @class ITSAChangeModelTemplate"," * @constructor"," * @since 0.1"," *"," * <i>Copyright (c) 2013 Marco Asbreuk - http://itsasbreuk.nl</i>"," * YUI BSD License - http://developer.yahoo.com/yui/license.html"," *","*/","","var Lang = Y.Lang,","    YArray = Y.Array,","    FORMELEMENT_CLASS = 'yui3-itsaformelement',","    ITSAFORMELEMENT_CHANGED_CLASS = FORMELEMENT_CLASS + '-changed',","    ERROR_MESSAGE_NOTEMPLATE = 'Attribute editTemplate is undefined',","    ISMICROTEMPLATE = function(template) {","        var microTemplateRegExp = /<%(.+)%>/;","        return microTemplateRegExp.test(template);","    };","","Y.namespace('Plugin').ITSAChangeModelTemplate = Y.Base.create('itsachangemodeltemplate', Y.Plugin.Base, [], {","","        host : null,","","        /**","         * Internal reference to the compiled alternate template.","         * @property _secondTempl","         * @private","         * @default null","         * @type Function","        */","        _secondTempl : null,","","        /**","         * Internal flag to state whether the alternate template is of the type Y.Template.Micro","         * @property _secondTemplIsMicro","         * @private","         * @default null","         * @type Boolean","        */","        _secondTemplIsMicro : null,","","","        /**","         * Internal reference to the compiled edit template.","         * @property _editTempl","         * @private","         * @default null","         * @type Function","        */","        _editTempl : null,","","        /**","         * Internal flag to state is the edittemplate is a microtemplate","         * @property _editTemplIsMicro","         * @private","         * @default null","         * @type Boolean","        */","        _editTemplIsMicro : null,","","        /**","         * Internal backuplist of the Models attributes, used when the editdata needs to be reset.","         * @property _initialEditAttrs","         * @private","         * @default {}","         * @type Object","        */","        _initialEditAttrs : {},","","        /**","         * Internal backuplist to keep track of which models live in the state of the secondTemplate","         * @property _secondModels","         * @private","         * @default {}","         * @type Object","        */","        _secondModels : {},","","        /**","         * Internal backuplist to keep track of which models live in the state of the editTemplate","         * @property _editModels","         * @private","         * @default {}","         * @type Object","        */","        _editModels : {},","","        /**","         * Internal backuplist to keep track of the previous Mode of the Models, to enable restore the template to previous state.","         * @property _prevMode","         * @private","         * @default {}","         * @type Object","        */","        _prevMode : {},","","        /**","         * Internal list of all eventhandlers bound by this widget.","         * @property _eventhandlers","         * @private","         * @default []","         * @type Array","        */","        _eventhandlers : [],","","        /**","         * Internal flag that tells whether -in editMode- the user has changed the content of a Model. This way the module knows it","         * doesn't need to do a thorough re-render of the list.","         * @property _currentModelHasChanged","         * @private","         * @default false","         * @type Boolean","        */","        _currentModelHasChanged : false,","","        /**","         * Internal backuplist of the Models previous 'comparator-result', used determine if the comparators-value has changed after","         * the models has been edited.  This way the module knows it doesn't need to do a thorough re-render of the list.","         * @property _prevComparator","         * @private","         * @default {}","         * @type Object","        */","        _prevComparator : {},","","","        /**","         * Sets up the toolbar during initialisation. Calls render() as soon as the hosts-editorframe is ready","         *","         * @method initializer","         * @protected","         * @since 0.1","         */","        initializer : function() {","            var instance = this,","                host;","","            instance.host = host = instance.get('host');","            instance._bindUI();","        },","","        /**","         * Re-renderes the Model -inside the ViewList- with its original template (defined by the host).","         * @method setModelToOriginalTemplate","         * @param model {Y.Model | Object} The item from the modellist. May be a Model, or an Object - in case of LazyModelList","         * @since 0.1","        */","        setModelToOriginalTemplate: function(model) {","            var instance = this,","                host = instance.host,","                clientId = host.getModelAttr(model, 'clientId'),","                modellist = host.get('modelList'),","                comparator = modellist && modellist.comparator,","                currentMode;","","            currentMode = instance._getMode(model);","            if (currentMode !== 1) {","                instance._prevMode[clientId] = instance._getMode(model);","                delete instance._secondModels[clientId];","                delete instance._initialEditAttrs[clientId];","                if (instance._editModels[clientId]) {","                    instance._unplugITSAEditModel(model, clientId);","                }","                if (instance._currentModelHasChanged && comparator &&","                   (instance._prevComparator[clientId]!==instance._getComparator(modellist, comparator, model))) {","                    modellist.sort();","                    //====================================================","                    //","                    // Next is a bugfix for LazyModelList --> see issue https://github.com/yui/yui3/issues/634","                    // As soon as issue is resolved, remove modellist.free() command","                    //","                    if (host._listLazy) {","                        modellist.free();","                    }","                    //======================================================","                    host._repositionModel(model);","                }","                else {","                    instance._renderOriginalTemplate(model);","                }","                delete instance._prevComparator[clientId];","                instance._currentModelHasChanged = false;","            }","            else {","            }","        },","","        /**","         * Re-renderes the Model -inside the ViewList- with its second template (defined by 'secondTemplate').","         * @method setModelToSecondTemplate","         * @param model {Y.Model | Object} The item from the modellist. May be a Model, or an Object - in case of LazyModelList","         * @since 0.1","        */","        setModelToSecondTemplate: function(model) {","            var instance = this,","                host = instance.host,","                clientId = host.getModelAttr(model, 'clientId'),","                modellist = host.get('modelList'),","                comparator = modellist && Y.bind(modellist.comparator, modellist),","                currentMode;","","            currentMode = instance._getMode(model);","            if (currentMode !== 2) {","                delete instance._initialEditAttrs[clientId];","                instance._prevMode[clientId] = instance._getMode(model);","                instance._secondModels[clientId] = true;","                if (instance._editModels[clientId]) {","                    instance._unplugITSAEditModel(model, clientId);","                }","                if (instance._currentModelHasChanged && comparator &&","                   (instance._prevComparator[clientId]!==instance._getComparator(modellist, comparator, model))) {","                    modellist.sort();","                    //====================================================","                    //","                    // Next is a bugfix for LazyModelList --> see issue https://github.com/yui/yui3/issues/634","                    // As soon as issue is resolved, remove modellist.free() command","                    //","                    if (host._listLazy) {","                        modellist.free();","                    }","                    //======================================================","                    host._renderView();","                }","                else {","                    instance._renderSecondTemplate(model);","                }","                delete instance._prevComparator[clientId];","                instance._currentModelHasChanged = false;","            }","            else {","            }","        },","","        /**","         * Re-renderes the Model -inside the ViewList- with its editable template (defined by 'editTemplate').","         * @method setModelToEditTemplate","         * @param model {Y.Model | Object} The item from the modellist. May be a Model, or an Object - in case of LazyModelList","         * @since 0.1","        */","        setModelToEditTemplate: function(model) {","            var instance = this,","                host = instance.host,","                modellist = host.get('modelList'),","                comparator = modellist && Y.bind(modellist.comparator, modellist),","                clientId = host.getModelAttr(model, 'clientId'),","                currentMode;","","            if (instance.get('modelsEditable')) {","                currentMode = instance._getMode(model);","                if (currentMode !== 3) {","                    instance._currentModelHasChanged = false;","                    instance._prevComparator[clientId] = comparator && instance._getComparator(modellist, comparator, model);","                    instance._prevMode[clientId] = currentMode;","                    instance._editModels[clientId] = true;","                    delete instance._secondModels[clientId];","                    instance._renderEditTemplate(","                        model,","                        function() {","                            var modelNode = (Lang.isNumber(model) ? host.getNodeFromIndex(model, 0) : host.getNodeFromModel(model, 0));","                            if (modelNode && modelNode.itsatabkeymanager) {","                                modelNode.itsatabkeymanager.focusInitialItem();","                            }","                        }","                    );","                }","                else {","                }","            }","            else {","            }","        },","","        /**","         * Re-renderes the Model -inside the ViewList- with its previous template, performing a reverse-rendering. Only the template is","         * restored, thus, if the Model's content is changed, you will see the new Model's content.","         * @method restoreTemplate","         * @param model {Y.Model | Object} The item from the modellist. May be a Model, or an Object - in case of LazyModelList","         * @since 0.1","        */","        restoreTemplate : function(model) {","            var instance = this,","                clientId = instance.host.getModelAttr(model, 'clientId'),","                mode = instance._prevMode[clientId] || 1;","","            switch (mode) {","                case 1: instance.setModelToOriginalTemplate(model);","                break;","                case 2: instance.setModelToSecondTemplate(model);","                break;","                case 3: instance.setModelToEditTemplate(model);","                break;","            }","        },","","        /**","         * Cleans up bindings and removes plugin","         * @method destructor","         * @protected","         * @since 0.1","        */","        destructor : function() {","            var instance = this;","","            instance._clearEventhandlers();","            instance._initialEditAttrs = {};","            instance._secondModels = {};","            instance._editModels = {};","            instance._prevMode = {};","            instance._prevComparator = {};","        },","","        //===============================================================================================","        // private methods","        //===============================================================================================","","        /**","         * Binding events","         *","         * @method _bindUI","         * @private","         * @since 0.1","        */","        _bindUI : function() {","            var instance = this,","                host = instance.host,","                eventhandlers = instance._eventhandlers;","","            eventhandlers.push(","                host.after(","                    'itsaeditmodel:focusnext',","                    function(e) {","                        var inputnode = e.inputNode,","                            modelnode = inputnode.get('parentNode'),","                            itsatabkeymanager;","                        while (modelnode && !modelnode.hasClass('itsa-model')) {","                            modelnode = modelnode.get('parentNode');","                        }","                        if (modelnode) {","                            itsatabkeymanager = modelnode.itsatabkeymanager;","                            if (itsatabkeymanager && modelnode.hasClass('itsa-model-focus')) {","                                itsatabkeymanager.next();","                            }","                            else {","                            }","                        }","                        else {","                        }","                    }","                )","            );","            eventhandlers.push(","                host.after(","                    'model:resetclick',","                    function(e) {","                        var model = e.target, // NOT e.currentTarget: that is the (scroll)View-instance (?)","                            options = {fromEditModel: true}, // set Attribute with option: '{fromEditModel: true}'","                                                             // --> now the view knows it must not re-render completely.","                                                             // however, we MUST re-render the only item.","                            initialEditAttrs = instance._initialEditAttrs[model.get('clientId')];","                        if (initialEditAttrs) {","                            model.setAttrs(initialEditAttrs, options);","                            if (instance._getMode(model)===3) {","                                instance._renderEditTemplate(","                                    model,","                                    function() {","                                        var modelNode = (Lang.isNumber(model) ? host.getNodeFromIndex(model, 0) : host.getNodeFromModel(model, 0));","                                        if (modelNode && modelNode.itsatabkeymanager) {","                                            modelNode.itsatabkeymanager.focusInitialItem();","                                        }","                                    }","                                );","                            }","                            if (host.modelIsSelected(model)) {","                                host._fireSelectedModels();","                            }","                        }","                    }","                )","            );","            eventhandlers.push(","                host.after(","                    ['itsaeditmodel:editmodelConfigAttrsChange', 'itsaeditmodel:templateChange'],","                    function() {","                        if (instance.get('modelsEditable')) {","                            host._renderView(null, null);","                        }","                    }","                )","            );","            eventhandlers.push(","                instance.after(","                    'modelsEditableChange',","                    Y.bind(host._renderView, host, null, null)","                )","            );","            eventhandlers.push(","                instance.after(","                    'editmodelConfigAttrsChange',","                    function() {","                        // force recompiling of the editrenderer on next rendercall:","                        instance._editTempl = null;","                    }","                )","            );","            eventhandlers.push(","                host.after(","                    'model:change',","                    function(e) {","                        var model = e.target, // NOT e.currentTarget: that is the (scroll)View-instance (?)","                            modelNode;","                        if (instance._getMode(model)===3) {","                            instance._currentModelHasChanged = true;","                            modelNode = host.getNodeFromModel(model, 0);","                            modelNode.all('.'+ITSAFORMELEMENT_CHANGED_CLASS).removeClass(ITSAFORMELEMENT_CHANGED_CLASS);","","                        }","                    }","                )","            );","            eventhandlers.push(","                host.on(","                    'model:destroy',","                    function(e) {","                        var model = e.target; // NOT e.currentTarget: that is the (scroll)View-instance (?)","                        delete instance._editModels[model.get('clientId')];","                        if (host.modelIsSelected(model)) {","                            host.unselectModels(model, false, true); // will fire an event itself","                        }","                    }","                )","            );","        },","","        /**","         * Cleaning up all eventlisteners","         *","         * @method _clearEventhandlers","         * @private","         * @since 0.1","         *","        */","        _clearEventhandlers : function() {","            YArray.each(","                this._eventhandlers,","                function(item){","                    item.detach();","                }","            );","        },","","        /**","         * Gets the comparator-result of a Modelinstance. Because you might face a LazyModelList with a revived model, you need to","         * excecute 'comparator' with the object in those cases. This Method will take care of a correct calculation of the comparator","         * in all cases.","         * @method _getComparator","         * @param modellist {Y.ModelList|Y.LazyModelList} host's (lazy)modellist","         * @param comparator {Function} host's comparator","         * @param model {Y.Model | Object} The item from the modellist. May be a Model, or an Object - in case of LazyModelList","         * @private","         * @since 0.1","        */","        _getComparator : function(modellist, comparator, model) {","            var instance = this,","                host = instance.host,","                item, usemodel;","","            if (host._listLazy && model.get && (typeof model.get === 'function')) {","                // need to retreive the object instead!","                item = modellist.indexOf(model);","                usemodel = modellist.item(item);","            }","            else {","                usemodel = model;","            }","            return comparator(usemodel);","        },","","        /**","         * Returns the current 'Mode' of the Models rendering. Meaning: what Template is currently being used. This might be:<br />","         * 1: original template<br />","         * 2: secondTemplate<br />","         * 3: editTemplate<br />","         *","         * @method _getMode","         * @private","         * @param model {Y.Model | Object} The item from the modellist. May be a Model, or an Object - in case of LazyModelList","         * @since 0.1","         *","        */","        _getMode : function(model) {","            var instance = this,","                modelsEditable = instance.get('modelsEditable'),","                clientId = instance.host.getModelAttr(model, 'clientId'),","                mode = 1;","","            if (instance._secondModels[clientId]) {","                mode = 2;","            }","            if (modelsEditable && instance._editModels[clientId]) {","                mode = 3;","            }","            return mode;","        },","","        /**","         * Returns the active modelengine that is used by the specified Model.<br />","         * <i>This method is not used internally, but is called by ITSAScrollViewModellist and ITSAViewModellist</i>","         * @method _getModelEngine","         * @param model {Y.Model|Object} The item from the modellist. May be a Model, or an Object - in case of LazyModelList","         * @param modelTemplate {String} The 'modelTemplate' used by the host","         * @param compiledModelEngine {Function} Host's compiled 'modelTemplate', compiled using Y.Template.Micro","         * @private","         * @protected","         * @since 0.1","         *","        */","        _getModelEngine : function(model, modelTemplate, compiledModelEngine) {","            var instance = this,","                host = instance.host,","                modus = instance._getMode(model),","                modelJSON, engine;","","            switch (modus) {","                case 1: // default: the standard modelTemplate","                    modelJSON = host.getModelToJSON(model);","                    engine = compiledModelEngine ? compiledModelEngine(modelJSON) : Lang.sub(modelTemplate, modelJSON);","                break;","                case 2: // secondTemplate","                    engine = instance._altTempl(model);","                break;","                case 3: // editTemplate","                    engine = instance._editTempl(model);","                break;","            }","            return engine;","        },","","        /**","         * Re-renderes the Model with the editTemplate inside the ViewList.","         *","         * @method _renderEditTemplate","         * @private","         * @param model {Y.Model | Object} The item from the modellist. May be a Model, or an Object - in case of LazyModelList","         * @param callback {Function} callbackfunction to be executed once renerding is finished","         * @since 0.1","         *","        */","        _renderEditTemplate: function(model, callback) {","            var instance = this,","                host = instance.host,","                modelNode, modelInstance, revivedModel, usemodel;","","            modelNode = (Lang.isNumber(model) ? host.getNodeFromIndex(model, 0) : host.getNodeFromModel(model, 0));","            if (modelNode) {","                if (ISMICROTEMPLATE(instance.get('template')) || (instance._secondTempl && instance._secondTemplIsMicro)) {","                    modelNode.cleanup();","                }","                Y.use('gallery-itsatabkeymanager', function(Y) {","                    if (!modelNode.itsatabkeymanager) {","                        modelNode.plug(Y.Plugin.ITSATabKeyManager);","                    }","                    // IMPORTANT: model could be an object in case of LazyModelList","                    // we need to revive it first","                    modelInstance = model.get && (typeof model.get === 'function');","                    if (!modelInstance && host._listLazy) {","                        revivedModel = host.get('modelList').revive(model);","                    }","                    usemodel = revivedModel || model;","                    instance._initialEditAttrs[usemodel.get('clientId')] = usemodel.getAttrs();","                    if (!usemodel.itsaeditmodel) {","                        Y.use('gallery-itsaeditmodel', function(Y) {","                            usemodel.plug(Y.Plugin.ITSAEditModel, instance.get('configForEditModel'));","                            if (!instance._editTempl) {","                                instance._setEditTemplate(instance.get('editTemplate') || usemodel.itsaeditmodel.get('template')","                                                                                       || ERROR_MESSAGE_NOTEMPLATE);","                            }","                            modelNode.setHTML(instance._editTempl(usemodel));","                            if (typeof callback === 'function') {","                                callback();","                            }","                        });","                    }","                    else {","                        if (!instance._editTempl) {","                            instance._setEditTemplate(instance.get('editTemplate') || usemodel.itsaeditmodel.get('template')","                                                                                   || ERROR_MESSAGE_NOTEMPLATE);","                        }","                        modelNode.setHTML(instance._editTempl(usemodel));","                        if (typeof callback === 'function') {","                            callback();","                        }","                    }","                });","            }","            else {","            }","        },","","        /**","         * Re-renderes the Model with the secondTemplate inside the ViewList.","         *","         * @method _renderSecondTemplate","         * @private","         * @param model {Y.Model | Object} The item from the modellist. May be a Model, or an Object - in case of LazyModelList","         * @since 0.1","         *","        */","        _renderSecondTemplate: function(model) {","            var instance = this,","                host = instance.host,","                alternateTemplate = instance._secondTempl || host._templFns.template,","                modelNode;","","            modelNode = (Lang.isNumber(model) ? host.getNodeFromIndex(model, 0) : host.getNodeFromModel(model, 0));","            if (modelNode && alternateTemplate) {","                if (ISMICROTEMPLATE(instance.get('template')) || model.itsaeditmodel) {","                    modelNode.cleanup();","                }","                modelNode.setHTML(alternateTemplate(model));","            }","            else {","            }","        },","","        /**","         * Re-renderes the Model with the original template inside the ViewList.","         *","         * @method _renderOriginalTemplate","         * @private","         * @param model {Y.Model | Object} The item from the modellist. May be a Model, or an Object - in case of LazyModelList","         * @since 0.1","         *","        */","        _renderOriginalTemplate: function(model) {","            var instance = this,","                host = instance.host,","                modelNode;","","            modelNode = (Lang.isNumber(model) ? host.getNodeFromIndex(model, 0) : host.getNodeFromModel(model, 0));","            if (modelNode) {","                if ((instance._secondTempl && instance._secondTemplIsMicro) || model.itsaeditmodel) {","                    modelNode.cleanup();","                }","                // delete objectproperty from instance._secondModelsBEFORE calling host._templFns.template,","                // for the latter depends on whether the definition is there.","                modelNode.setHTML(host._templFns.template(model));","            }","            else {","            }","        },","","        /**","         * compiled the editTemplate into private variable _editTempl()","         *","         * @method _setEditTemplate","         * @param template {String} The new secondTemplate to be used. Must be of type Y.Lang.sub() or Y.Template.Micro()","         * @private","         * @since 0.1","         *","        */","        _setEditTemplate: function(template) {","            var instance = this,","                host = instance.host,","                compiledModelEngine, editTemplateIsMicro;","","            if (!template || (template==='')) {","                instance._editTempl = host._templFns.template;","            }","            else {","                editTemplateIsMicro = instance._editTemplIsMicro = ISMICROTEMPLATE(template);","                if (editTemplateIsMicro) {","                    compiledModelEngine = Y.TemplateMicro.compile(template);","                    instance._editTempl = function(model) {","                        var modelInstance = model.get && (model.get === 'function');","                        if (!modelInstance && host._listLazy) {","                            model = host.get('modelList').revive(model);","                            if (!model.itsaeditmodel) {","                                model.plug(Y.Plugin.ITSAEditModel, instance.get('configForEditModel'));","                            }","                        }","                        return compiledModelEngine(model.itsaeditmodel.toJSON(instance.get('editmodelConfigAttrs')","                               || model.itsaeditmodel.get('editmodelConfigAttrs')));","                    };","                }","                else {","                    instance._editTempl = function(model) {","                        var modelInstance = model.get && (model.get === 'function');","                        if (!modelInstance && host._listLazy) {","                            model = host.get('modelList').revive(model);","                            if (!modelInstance && host._listLazy) {","                                model.plug(Y.Plugin.ITSAEditModel, instance.get('configForEditModel'));","                            }","                        }","                        return Lang.sub(template, model.itsaeditmodel.toJSON(instance.get('editmodelConfigAttrs')","                               || model.itsaeditmodel.get('editmodelConfigAttrs')));","                    };","                }","            }","        },","","        /**","         * compiled the secondTemplate into private variable _secondTempl()","         *","         * @method _setSecondTemplate","         * @param template {String} The new secondTemplate to be used. Must be of type Y.Lang.sub() or Y.Template.Micro()","         * @private","         * @since 0.1","         *","        */","        _setSecondTemplate: function(val) {","            var instance = this,","                host = instance.host,","                compiledModelEngine, alternateTemplateIsMicro;","","            if (!val || (val==='')) {","                instance._secondTempl = null;","            }","            else {","                alternateTemplateIsMicro = instance._secondTemplIsMicro = ISMICROTEMPLATE(val);","                if (alternateTemplateIsMicro) {","                    compiledModelEngine = Y.TemplateMicro.compile(val);","                    instance._secondTempl = function(model) {","                        return compiledModelEngine(host.getModelToJSON(model));","                    };","                }","                else {","                    instance._secondTempl = function(model) {","                        return Lang.sub(val, host.getModelToJSON(model));","                    };","                }","            }","        },","","        /**","         * Unplugs both Y.Plugin.ITSAEditModel as well as Y.Plugin.ITSATabKeyManager from the model.","         *","         * @method _unplugITSAEditModel","         * @param template {String} The new secondTemplate to be used. Must be of type Y.Lang.sub() or Y.Template.Micro()","         * @param model {Y.Model || Object} The model (or revived model) from the modellist/lazymodellist.","         * @param cliendId {Int} Model's clientId","         * @private","         * @since 0.1","         *","        */","        _unplugITSAEditModel : function(model, clientId) {","            var instance = this,","                host = instance.host,","                modelInstance, modelNode;","","            // IMPORTANT: model could be an object in case of LazyModelList","            // we need to revive it first","            modelInstance = model.get && (typeof model.get === 'function');","            if (!modelInstance && host._listLazy) {","                model = host.get('modelList').revive(model);","            }","            if (model.unplug) {","                model.unplug('itsaeditmodel');","            }","            delete instance._editModels[clientId];","            modelNode = (Lang.isNumber(model) ? host.getNodeFromIndex(model, 0) : host.getNodeFromModel(model, 0));","            if (modelNode) {","                modelNode.unplug('itsatabkeymanager');","            }","        }","","    }, {","        NS : 'itsacmtemplate',","        ATTRS : {","","            /**","             * The editmodelConfigAttrs to be used in the editable mode. See Y.Plugin.ITSAEditModel (gallery-itsaeditmodel)","             * for further specifications. If this attribute is empty, the plugin will search for 'configForEditModel.editmodelConfigAttrs',","             * which might as well define the config. However, it is preferable to define the configAttrs directly within 'editmodelConfigAttrs',","             * because through this attribute are able to change the configAttrs later on. (The one within 'configForEditModel.editmodelConfigAttrs'","             * is only read during initialisation).","             *","             * @attribute editmodelConfigAttrs","             * @type {Object}","             * @default false","             * @since 0.1","             */","            editmodelConfigAttrs: {","                value: {},","                validator: function(v){","                    return Lang.isObject(v);","                }","            },","","            /**","             * The <b>config</b> that is passed through directly into Y.Plugin.ITSAEditModel. Event though you can define","             * 'configForEditModel.template' and 'configForEditModel.editmodelConfigAttrs', the referred way for those to properties","             * is to set them directly within this wplugin-level (see 'editTemplate' and 'editmodelConfigAttrs' for the why).","             *","             * @attribute configForEditModel","             * @type {Boolean}","             * @default false","             * @since 0.1","             */","            configForEditModel: {","                value: null,","                validator: function(v){","                    return Lang.isObject(v);","                }","            },","","            /**","             * The template to be used in the editable mode. Use either Y.Lang.sub or Y.Template.Micor syntax. If this attribute is empty,","             * the plugin will search for 'configForEditModel.template', which might as well define the editTemplate. However, it is preferable","             * to define the editable template directly within 'editTemplate', because through this attribute are able to change the","             * editable-template later on. (The one within 'configForEditModel.editTemplate' is only read during initialisation).","             *","             * @attribute editTemplate","             * @type {Boolean}","             * @default false","             * @since 0.1","             */","            editTemplate: {","                value: null,","                validator: function(v){","                    return (typeof v === 'string');","                },","                setter: '_setEditTemplate'","            },","","            /**","             * Makes the View able to render the editable-version of the Model. By setting to false, you can make a controller to","             * disable the edit-functionality of the whole host-list.","             *","             * @attribute modelsEditable","             * @type {Boolean}","             * @default true","             * @since 0.1","             */","            modelsEditable: {","                value: true,","                lazyAdd: false,","                validator: function(v){","                    return Lang.isBoolean(v);","                }","            },","","            /**","             * Defines the template to be used as 'secondTemplate'. Will be used for all Models that are rendered by setModelToSecondTemplate()","             *","             * @attribute secondTemplate","             * @type {Boolean}","             * @default false","             * @since 0.1","             */","            secondTemplate: {","                value: null,","                validator: function(v){","                    return (typeof v === 'string');","                },","                setter: '_setSecondTemplate'","            }","","        }","    }",");","","","}, '@VERSION@', {","    \"requires\": [","        \"yui-base\",","        \"node-core\",","        \"base-base\",","        \"base-build\",","        \"plugin\",","        \"pluginhost-base\",","        \"oop\",","        \"template-micro\"","    ]","});"];
_yuitest_coverage["build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js"].lines = {"1":0,"3":0,"32":0,"38":0,"39":0,"42":0,"157":0,"160":0,"161":0,"171":0,"178":0,"179":0,"180":0,"181":0,"182":0,"183":0,"184":0,"186":0,"188":0,"194":0,"195":0,"198":0,"201":0,"203":0,"204":0,"217":0,"224":0,"225":0,"226":0,"227":0,"228":0,"229":0,"230":0,"232":0,"234":0,"240":0,"241":0,"244":0,"247":0,"249":0,"250":0,"263":0,"270":0,"271":0,"272":0,"273":0,"274":0,"275":0,"276":0,"277":0,"278":0,"281":0,"282":0,"283":0,"303":0,"307":0,"308":0,"309":0,"310":0,"311":0,"312":0,"313":0,"324":0,"326":0,"327":0,"328":0,"329":0,"330":0,"331":0,"346":0,"350":0,"354":0,"357":0,"358":0,"360":0,"361":0,"362":0,"363":0,"373":0,"377":0,"382":0,"383":0,"384":0,"385":0,"388":0,"389":0,"390":0,"395":0,"396":0,"402":0,"406":0,"407":0,"412":0,"418":0,"423":0,"427":0,"431":0,"433":0,"434":0,"435":0,"436":0,"442":0,"446":0,"447":0,"448":0,"449":0,"465":0,"468":0,"485":0,"489":0,"491":0,"492":0,"495":0,"497":0,"513":0,"518":0,"519":0,"521":0,"522":0,"524":0,"540":0,"545":0,"547":0,"548":0,"549":0,"551":0,"552":0,"554":0,"555":0,"557":0,"571":0,"575":0,"576":0,"577":0,"578":0,"580":0,"581":0,"582":0,"586":0,"587":0,"588":0,"590":0,"591":0,"592":0,"593":0,"594":0,"595":0,"596":0,"599":0,"600":0,"601":0,"606":0,"607":0,"610":0,"611":0,"612":0,"631":0,"636":0,"637":0,"638":0,"639":0,"641":0,"657":0,"661":0,"662":0,"663":0,"664":0,"668":0,"684":0,"688":0,"689":0,"692":0,"693":0,"694":0,"695":0,"696":0,"697":0,"698":0,"699":0,"700":0,"703":0,"708":0,"709":0,"710":0,"711":0,"712":0,"713":0,"716":0,"733":0,"737":0,"738":0,"741":0,"742":0,"743":0,"744":0,"745":0,"749":0,"750":0,"768":0,"774":0,"775":0,"776":0,"778":0,"779":0,"781":0,"782":0,"783":0,"784":0,"807":0,"824":0,"842":0,"860":0,"875":0};
_yuitest_coverage["build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js"].functions = {"ISMICROTEMPLATE:37":0,"initializer:156":0,"setModelToOriginalTemplate:170":0,"setModelToSecondTemplate:216":0,"(anonymous 2):280":0,"setModelToEditTemplate:262":0,"restoreTemplate:302":0,"destructor:323":0,"(anonymous 3):353":0,"(anonymous 5):387":0,"(anonymous 4):376":0,"(anonymous 6):405":0,"(anonymous 7):421":0,"(anonymous 8):430":0,"(anonymous 9):445":0,"_bindUI:345":0,"(anonymous 10):467":0,"_clearEventhandlers:464":0,"_getComparator:484":0,"_getMode:512":0,"_getModelEngine:539":0,"(anonymous 12):593":0,"(anonymous 11):580":0,"_renderEditTemplate:570":0,"_renderSecondTemplate:630":0,"_renderOriginalTemplate:656":0,"_editTempl:695":0,"_editTempl:708":0,"_setEditTemplate:683":0,"_secondTempl:744":0,"_secondTempl:749":0,"_setSecondTemplate:732":0,"_unplugITSAEditModel:767":0,"validator:806":0,"validator:823":0,"validator:841":0,"validator:859":0,"validator:874":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js"].coveredLines = 213;
_yuitest_coverage["build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js"].coveredFunctions = 39;
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
            _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "initializer", 156);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 157);
var instance = this,
                host;

            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 160);
instance.host = host = instance.get('host');
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 161);
instance._bindUI();
        },

        /**
         * Re-renderes the Model -inside the ViewList- with its original template (defined by the host).
         * @method setModelToOriginalTemplate
         * @param model {Y.Model | Object} The item from the modellist. May be a Model, or an Object - in case of LazyModelList
         * @since 0.1
        */
        setModelToOriginalTemplate: function(model) {
            _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "setModelToOriginalTemplate", 170);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 171);
var instance = this,
                host = instance.host,
                clientId = host.getModelAttr(model, 'clientId'),
                modellist = host.get('modelList'),
                comparator = modellist && modellist.comparator,
                currentMode;

            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 178);
currentMode = instance._getMode(model);
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 179);
if (currentMode !== 1) {
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 180);
instance._prevMode[clientId] = instance._getMode(model);
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 181);
delete instance._secondModels[clientId];
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 182);
delete instance._initialEditAttrs[clientId];
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 183);
if (instance._editModels[clientId]) {
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 184);
instance._unplugITSAEditModel(model, clientId);
                }
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 186);
if (instance._currentModelHasChanged && comparator &&
                   (instance._prevComparator[clientId]!==instance._getComparator(modellist, comparator, model))) {
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 188);
modellist.sort();
                    //====================================================
                    //
                    // Next is a bugfix for LazyModelList --> see issue https://github.com/yui/yui3/issues/634
                    // As soon as issue is resolved, remove modellist.free() command
                    //
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 194);
if (host._listLazy) {
                        _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 195);
modellist.free();
                    }
                    //======================================================
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 198);
host._repositionModel(model);
                }
                else {
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 201);
instance._renderOriginalTemplate(model);
                }
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 203);
delete instance._prevComparator[clientId];
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 204);
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
            _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "setModelToSecondTemplate", 216);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 217);
var instance = this,
                host = instance.host,
                clientId = host.getModelAttr(model, 'clientId'),
                modellist = host.get('modelList'),
                comparator = modellist && Y.bind(modellist.comparator, modellist),
                currentMode;

            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 224);
currentMode = instance._getMode(model);
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 225);
if (currentMode !== 2) {
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 226);
delete instance._initialEditAttrs[clientId];
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 227);
instance._prevMode[clientId] = instance._getMode(model);
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 228);
instance._secondModels[clientId] = true;
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 229);
if (instance._editModels[clientId]) {
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 230);
instance._unplugITSAEditModel(model, clientId);
                }
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 232);
if (instance._currentModelHasChanged && comparator &&
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
            _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "setModelToEditTemplate", 262);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 263);
var instance = this,
                host = instance.host,
                modellist = host.get('modelList'),
                comparator = modellist && Y.bind(modellist.comparator, modellist),
                clientId = host.getModelAttr(model, 'clientId'),
                currentMode;

            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 270);
if (instance.get('modelsEditable')) {
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 271);
currentMode = instance._getMode(model);
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 272);
if (currentMode !== 3) {
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 273);
instance._currentModelHasChanged = false;
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 274);
instance._prevComparator[clientId] = comparator && instance._getComparator(modellist, comparator, model);
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 275);
instance._prevMode[clientId] = currentMode;
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 276);
instance._editModels[clientId] = true;
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 277);
delete instance._secondModels[clientId];
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 278);
instance._renderEditTemplate(
                        model,
                        function() {
                            _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "(anonymous 2)", 280);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 281);
var modelNode = (Lang.isNumber(model) ? host.getNodeFromIndex(model, 0) : host.getNodeFromModel(model, 0));
                            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 282);
if (modelNode && modelNode.itsatabkeymanager) {
                                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 283);
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
            _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "restoreTemplate", 302);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 303);
var instance = this,
                clientId = instance.host.getModelAttr(model, 'clientId'),
                mode = instance._prevMode[clientId] || 1;

            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 307);
switch (mode) {
                case 1: _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 308);
instance.setModelToOriginalTemplate(model);
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 309);
break;
                case 2: _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 310);
instance.setModelToSecondTemplate(model);
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 311);
break;
                case 3: _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 312);
instance.setModelToEditTemplate(model);
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 313);
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
            _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "destructor", 323);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 324);
var instance = this;

            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 326);
instance._clearEventhandlers();
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 327);
instance._initialEditAttrs = {};
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 328);
instance._secondModels = {};
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 329);
instance._editModels = {};
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 330);
instance._prevMode = {};
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 331);
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
                            modelNode;
                        _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 433);
if (instance._getMode(model)===3) {
                            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 434);
instance._currentModelHasChanged = true;
                            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 435);
modelNode = host.getNodeFromModel(model, 0);
                            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 436);
modelNode.all('.'+ITSAFORMELEMENT_CHANGED_CLASS).removeClass(ITSAFORMELEMENT_CHANGED_CLASS);

                        }
                    }
                )
            );
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 442);
eventhandlers.push(
                host.on(
                    'model:destroy',
                    function(e) {
                        _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "(anonymous 9)", 445);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 446);
var model = e.target; // NOT e.currentTarget: that is the (scroll)View-instance (?)
                        _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 447);
delete instance._editModels[model.get('clientId')];
                        _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 448);
if (host.modelIsSelected(model)) {
                            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 449);
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
            _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "_clearEventhandlers", 464);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 465);
YArray.each(
                this._eventhandlers,
                function(item){
                    _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "(anonymous 10)", 467);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 468);
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
            _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "_getComparator", 484);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 485);
var instance = this,
                host = instance.host,
                item, usemodel;

            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 489);
if (host._listLazy && model.get && (typeof model.get === 'function')) {
                // need to retreive the object instead!
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 491);
item = modellist.indexOf(model);
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 492);
usemodel = modellist.item(item);
            }
            else {
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 495);
usemodel = model;
            }
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 497);
return comparator(usemodel);
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
            _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "_getMode", 512);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 513);
var instance = this,
                modelsEditable = instance.get('modelsEditable'),
                clientId = instance.host.getModelAttr(model, 'clientId'),
                mode = 1;

            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 518);
if (instance._secondModels[clientId]) {
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 519);
mode = 2;
            }
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 521);
if (modelsEditable && instance._editModels[clientId]) {
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 522);
mode = 3;
            }
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 524);
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
            _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "_getModelEngine", 539);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 540);
var instance = this,
                host = instance.host,
                modus = instance._getMode(model),
                modelJSON, engine;

            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 545);
switch (modus) {
                case 1: // default: the standard modelTemplate
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 547);
modelJSON = host.getModelToJSON(model);
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 548);
engine = compiledModelEngine ? compiledModelEngine(modelJSON) : Lang.sub(modelTemplate, modelJSON);
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 549);
break;
                case 2: // secondTemplate
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 551);
engine = instance._altTempl(model);
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 552);
break;
                case 3: // editTemplate
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 554);
engine = instance._editTempl(model);
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 555);
break;
            }
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 557);
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
            _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "_renderEditTemplate", 570);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 571);
var instance = this,
                host = instance.host,
                modelNode, modelInstance, revivedModel, usemodel;

            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 575);
modelNode = (Lang.isNumber(model) ? host.getNodeFromIndex(model, 0) : host.getNodeFromModel(model, 0));
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 576);
if (modelNode) {
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 577);
if (ISMICROTEMPLATE(instance.get('template')) || (instance._secondTempl && instance._secondTemplIsMicro)) {
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 578);
modelNode.cleanup();
                }
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 580);
Y.use('gallery-itsatabkeymanager', function(Y) {
                    _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "(anonymous 11)", 580);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 581);
if (!modelNode.itsatabkeymanager) {
                        _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 582);
modelNode.plug(Y.Plugin.ITSATabKeyManager);
                    }
                    // IMPORTANT: model could be an object in case of LazyModelList
                    // we need to revive it first
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 586);
modelInstance = model.get && (typeof model.get === 'function');
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 587);
if (!modelInstance && host._listLazy) {
                        _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 588);
revivedModel = host.get('modelList').revive(model);
                    }
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 590);
usemodel = revivedModel || model;
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 591);
instance._initialEditAttrs[usemodel.get('clientId')] = usemodel.getAttrs();
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 592);
if (!usemodel.itsaeditmodel) {
                        _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 593);
Y.use('gallery-itsaeditmodel', function(Y) {
                            _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "(anonymous 12)", 593);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 594);
usemodel.plug(Y.Plugin.ITSAEditModel, instance.get('configForEditModel'));
                            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 595);
if (!instance._editTempl) {
                                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 596);
instance._setEditTemplate(instance.get('editTemplate') || usemodel.itsaeditmodel.get('template')
                                                                                       || ERROR_MESSAGE_NOTEMPLATE);
                            }
                            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 599);
modelNode.setHTML(instance._editTempl(usemodel));
                            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 600);
if (typeof callback === 'function') {
                                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 601);
callback();
                            }
                        });
                    }
                    else {
                        _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 606);
if (!instance._editTempl) {
                            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 607);
instance._setEditTemplate(instance.get('editTemplate') || usemodel.itsaeditmodel.get('template')
                                                                                   || ERROR_MESSAGE_NOTEMPLATE);
                        }
                        _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 610);
modelNode.setHTML(instance._editTempl(usemodel));
                        _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 611);
if (typeof callback === 'function') {
                            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 612);
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
            _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "_renderSecondTemplate", 630);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 631);
var instance = this,
                host = instance.host,
                alternateTemplate = instance._secondTempl || host._templFns.template,
                modelNode;

            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 636);
modelNode = (Lang.isNumber(model) ? host.getNodeFromIndex(model, 0) : host.getNodeFromModel(model, 0));
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 637);
if (modelNode && alternateTemplate) {
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 638);
if (ISMICROTEMPLATE(instance.get('template')) || model.itsaeditmodel) {
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 639);
modelNode.cleanup();
                }
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 641);
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
            _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "_renderOriginalTemplate", 656);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 657);
var instance = this,
                host = instance.host,
                modelNode;

            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 661);
modelNode = (Lang.isNumber(model) ? host.getNodeFromIndex(model, 0) : host.getNodeFromModel(model, 0));
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 662);
if (modelNode) {
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 663);
if ((instance._secondTempl && instance._secondTemplIsMicro) || model.itsaeditmodel) {
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 664);
modelNode.cleanup();
                }
                // delete objectproperty from instance._secondModelsBEFORE calling host._templFns.template,
                // for the latter depends on whether the definition is there.
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 668);
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
            _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "_setEditTemplate", 683);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 684);
var instance = this,
                host = instance.host,
                compiledModelEngine, editTemplateIsMicro;

            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 688);
if (!template || (template==='')) {
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 689);
instance._editTempl = host._templFns.template;
            }
            else {
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 692);
editTemplateIsMicro = instance._editTemplIsMicro = ISMICROTEMPLATE(template);
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 693);
if (editTemplateIsMicro) {
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 694);
compiledModelEngine = Y.TemplateMicro.compile(template);
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 695);
instance._editTempl = function(model) {
                        _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "_editTempl", 695);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 696);
var modelInstance = model.get && (model.get === 'function');
                        _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 697);
if (!modelInstance && host._listLazy) {
                            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 698);
model = host.get('modelList').revive(model);
                            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 699);
if (!model.itsaeditmodel) {
                                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 700);
model.plug(Y.Plugin.ITSAEditModel, instance.get('configForEditModel'));
                            }
                        }
                        _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 703);
return compiledModelEngine(model.itsaeditmodel.toJSON(instance.get('editmodelConfigAttrs')
                               || model.itsaeditmodel.get('editmodelConfigAttrs')));
                    };
                }
                else {
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 708);
instance._editTempl = function(model) {
                        _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "_editTempl", 708);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 709);
var modelInstance = model.get && (model.get === 'function');
                        _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 710);
if (!modelInstance && host._listLazy) {
                            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 711);
model = host.get('modelList').revive(model);
                            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 712);
if (!modelInstance && host._listLazy) {
                                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 713);
model.plug(Y.Plugin.ITSAEditModel, instance.get('configForEditModel'));
                            }
                        }
                        _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 716);
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
            _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "_setSecondTemplate", 732);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 733);
var instance = this,
                host = instance.host,
                compiledModelEngine, alternateTemplateIsMicro;

            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 737);
if (!val || (val==='')) {
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 738);
instance._secondTempl = null;
            }
            else {
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 741);
alternateTemplateIsMicro = instance._secondTemplIsMicro = ISMICROTEMPLATE(val);
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 742);
if (alternateTemplateIsMicro) {
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 743);
compiledModelEngine = Y.TemplateMicro.compile(val);
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 744);
instance._secondTempl = function(model) {
                        _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "_secondTempl", 744);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 745);
return compiledModelEngine(host.getModelToJSON(model));
                    };
                }
                else {
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 749);
instance._secondTempl = function(model) {
                        _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "_secondTempl", 749);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 750);
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
            _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "_unplugITSAEditModel", 767);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 768);
var instance = this,
                host = instance.host,
                modelInstance, modelNode;

            // IMPORTANT: model could be an object in case of LazyModelList
            // we need to revive it first
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 774);
modelInstance = model.get && (typeof model.get === 'function');
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 775);
if (!modelInstance && host._listLazy) {
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 776);
model = host.get('modelList').revive(model);
            }
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 778);
if (model.unplug) {
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 779);
model.unplug('itsaeditmodel');
            }
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 781);
delete instance._editModels[clientId];
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 782);
modelNode = (Lang.isNumber(model) ? host.getNodeFromIndex(model, 0) : host.getNodeFromModel(model, 0));
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 783);
if (modelNode) {
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 784);
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
                    _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "validator", 806);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 807);
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
                    _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "validator", 823);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 824);
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
                    _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "validator", 841);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 842);
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
                    _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "validator", 859);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 860);
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
                    _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "validator", 874);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 875);
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
