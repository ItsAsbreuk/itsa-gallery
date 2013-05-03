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
_yuitest_coverage["build/gallery-itsaeditmodel/gallery-itsaeditmodel.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-itsaeditmodel/gallery-itsaeditmodel.js",
    code: []
};
_yuitest_coverage["build/gallery-itsaeditmodel/gallery-itsaeditmodel.js"].code=["YUI.add('gallery-itsaeditmodel', function (Y, NAME) {","","'use strict';","","/**"," * ITSAEditModel Plugin"," *"," *"," * Plugin for Y.Model that extends Y.Model-instances into having editable properties."," * After pluged-in, Each property can be rendered into a form-element by using: <i>yourModel.itsaeditmodel.formelement()</i>"," * You can also retreive a copy of the model's attributes with: <i>yourModel.itsaeditmodel.toJSON()</i>"," *"," * Use the attribute 'template' to specify how the rendering will look like."," *"," *"," * @module gallery-itsaeditmodel"," * @class ITSAEditModel"," * @extends Plugin.Base"," * @constructor"," * @since 0.1"," *"," * <i>Copyright (c) 2013 Marco Asbreuk - http://itsasbreuk.nl</i>"," * YUI BSD License - http://developer.yahoo.com/yui/license.html"," *","*/","","var body = Y.one('body'),","    Lang = Y.Lang,","    YArray = Y.Array,","    YObject = Y.Object,","    UNDEFINED_VALUE = 'undefined value',","    MESSAGE_WARN_MODELCHANGED = 'The data you are editing has been changed from outside the form. '+","                                'If you save your data, then these former changed will be overridden.',","    EVT_DATETIMEPICKER_CLICK = 'datetimepickerclick',","    ITSABUTTON_DATETIME_CLASS = 'itsa-button-datetime',","    ITSAFORMELEMENT_DATE_CLASS = 'itsa-datetimepicker-icondate',","    ITSAFORMELEMENT_TIME_CLASS = 'itsa-datetimepicker-icontime',","    ITSAFORMELEMENT_DATETIME_CLASS = 'itsa-datetimepicker-icondatetime',","    FORMELEMENT_CLASS = 'yui3-itsaformelement',","    ITSAFORMELEMENT_BUTTONTYPE_CLASS = FORMELEMENT_CLASS + '-button',","    ITSAFORMELEMENT_LIFECHANGE_CLASS = FORMELEMENT_CLASS + '-lifechange',","    ITSAFORMELEMENT_CHANGED_CLASS = FORMELEMENT_CLASS + '-changed',","    ITSAFORMELEMENT_ENTERNEXTFIELD_CLASS = FORMELEMENT_CLASS + '-enternextfield',","    BUTTON_BUTTON_CLASS = FORMELEMENT_CLASS + '-button',","    ADD_BUTTON_CLASS = FORMELEMENT_CLASS + '-add',","    SUBMIT_BUTTON_CLASS = FORMELEMENT_CLASS + '-submit',","    RESET_BUTTON_CLASS = FORMELEMENT_CLASS + '-reset',","    SAVE_BUTTON_CLASS = FORMELEMENT_CLASS + '-save',","    DESTROY_BUTTON_CLASS = FORMELEMENT_CLASS + '-destroy',","    DEFAULTCONFIG = {","        name : 'undefined-name',","        type : '',","        value : '',","        keyValidation : null,","        validation : null,","        validationMessage : '',","        autoCorrection : null,","        className : null,","        dateFormat : null,","        initialFocus : false,","        selectOnFocus : false,","        widgetConfig : {}","    },","    GET_PROPERTY_FROM_CLASS = function(className) {","        var regexp = /yui3-itsaformelement-property-(\\w+)/;","","        return regexp.test(className) ? RegExp.$1 : null;","    },","    EVT_INTERNAL = 'internal',","    // next five events are declared within the initialiser:","    EVT_SUBMIT_CLICK = 'submitclick',","    EVT_ADD_CLICK = 'addclick',","    EVT_SAVE_CLICK = 'saveclick',","    EVT_RESET_CLICK = 'resetclick',","    EVT_DESTROY_CLICK = 'destroyclick',","","","","   /**","     * Fired to be caught by ItsaDialog. This event occurs when there is a warning (for example Model changed outside the editview).","     * @event focusnext","     * @param e {EventFacade} Event Facade including:","     * @param e.message {String} The warningmessage.","     * @since 0.1","    **/","    EVT_FOCUS_NEXT = 'focusnext',","   /**","     * Fired to be caught by ItsaDialog. This event occurs when there is a warning (for example Model changed outside the editview).","     * @event dialog:warn","     * @param e {EventFacade} Event Facade including:","     * @param e.message {String} The warningmessage.","     * @since 0.1","    **/","    EVT_DIALOG_WARN = 'dialog:warn',","    /**","      * Event fired after an input-elements value is changed.","      * @event inputchange","      * @param e {EventFacade} Event Facade including:","      * @param e.inputNode {Y.Node} The Input-Node that was clicked","      * @param e.elementId {String} Id of the Node that chancged value.","      * @param e.property {String} The property-name of the Object (or the Model's attribute-name)","    **/","    EVT_INPUT_CHANGE = 'inputchange',","    /**","      * Event fired when an input-elements value is changed (life, without blurring): valuechange.","      * @event inputvaluechange","      * @param e {EventFacade} Event Facade including:","      * @param e.inputNode {Y.Node} The Input-Node that was clicked","      * @param e.elementId {String} Id of the Node that chancged value.","      * @param e.property {String} The property-name of the Object (or the Model's attribute-name)","    **/","    EVT_VALUE_CHANGE = 'inputvaluechange',","    /**","      * Event fired when a normal button (elementtype) is clicked.","      * @event buttonclick","      * @param e {EventFacade} Event Facade including:","      * @param e.buttonNode {Y.Node} The Button-Node that was clicked","      * @param e.property {String} The property-name of the Object (or the Model's attribute-name)","      * @param [e.model] {Y.Model} This modelinstance.","    **/","    EVT_BUTTON_CLICK = 'buttonclick',","   /**","     * Fired after the plugin is pluggedin and ready to be referenced by the host. This is LATER than after the 'init'-event,","     * because the latter will be fired before the namespace Model.itsaeditmodel exists.","     * @event pluggedin","     * @since 0.1","    **/","    EVT_PLUGGEDIN = 'pluggedin';","","Y.namespace('Plugin').ITSAEditModel = Y.Base.create('itsaeditmodel', Y.Plugin.Base, [], {","","        /**","         * Sets up the toolbar during initialisation. Calls render() as soon as the hosts-editorframe is ready","         *","         * @method initializer","         * @protected","         * @since 0.1","         */","        initializer : function() {","            var instance = this,","                host;","","           // -- Public Properties -------------------------------------------------","","           /**","            * The plugin's host, which should be a Model-instance (or descendent)","            * @property host","            * @default host-instance","            * @type Y.Model","            */","            instance.host = instance.get('host');","","           /**","            * Internal list that holds event-references","            * @property _eventhandlers","            * @default []","            * @private","            * @type Array","            */","            instance._eventhandlers = [];","","           /**","            * An instance of Y.ITSAFormElement that is used to generate the form-html of the elements.","            * @property _itsaformelement","            * @default null","            * @private","            * @type Y.ITSAFormElement-instance","            */","            instance._itsaformelement = null;","","           /**","            * internal backup of all property-configs","            * @property _configAttrs","            * @default {}","            * @private","            * @type Object","            */","            instance._configAttrs = {};","","           /**","            * internal backup of all rendered node-id's","            * @property _elementIds","            * @default {}","            * @private","            * @type Object","            */","            instance._elementIds = {};","","           /**","            * internal flag that tells whether automaicly saving needs to happen in case properties have changed","            * @property _needAutoSaved","            * @default false","            * @private","            * @type Boolean","            */","            instance._needAutoSaved = false;","","           /**","            * Internal reference to Y.later timerobject for autosaving","            * @property _autoSaveTimer","            * @default null","            * @private","            * @type timer-Object","            */","            instance._autoSaveTimer = null;","","           /**","            * Internal reference to Y.later timerobject that is used to fire a 'pluggedin'-event once 'itsaeditmodel' is available on the host.","            * @property _fireEventTimer","            * @default null","            * @private","            * @type timer-Object","            */","            instance._fireEventTimer = null;","","            host = instance.host;","            instance._itsaformelement = new Y.ITSAFormElement();","            /**","              * Event fired when the submitbutton is clicked.","              * defaultFunction = calling then model's sync method with action=submit","              * @event submitclick","              * @param e {EventFacade} Event Facade including:","              * @param e.currentTarget {Y.Node} The Button-Node that was clicked","              * @param e.property {String} The property-name of the Object (or the Model's attribute-name)","            **/","            host.publish(","                EVT_SUBMIT_CLICK,","                {","                    defaultFn: Y.rbind(instance._defPluginSubmitFn, instance),","                    emitFacade: true","                }","            );","            /**","              * Event fired when the addbutton is clicked.","              * defaultFunction = calling then model's sync method with action=reset","              * @event addclick","              * @param e {EventFacade} Event Facade including:","              * @param e.newModel {Y.Model} The new model-instance.","              * @param e.currentTarget {Y.Node} The Button-Node that was clicked","              * @param e.property {String} The property-name of the Object (or the Model's attribute-name)","            **/","            host.publish(","                EVT_ADD_CLICK,","                {","                    defaultFn: Y.rbind(instance._defPluginAddFn, instance),","                    emitFacade: true","                }","            );","            /**","              * Event fired when the resetbutton is clicked.","              * defaultFunction = calling then model's sync method with action=reset","              * @event resetclick","              * @param e {EventFacade} Event Facade including:","              * @param e.currentTarget {Y.Node} The Button-Node that was clicked","              * @param e.property {String} The property-name of the Object (or the Model's attribute-name)","            **/","            host.publish(","                EVT_RESET_CLICK,","                {","                    defaultFn: Y.rbind(instance._defPluginResetFn, instance),","                    emitFacade: true","                }","            );","            /**","              * Event fired when the savebutton is clicked.","              * defaultFunction = calling then model's sync method with action=submit","              * @event saveclick","              * @param e {EventFacade} Event Facade including:","              * @param e.currentTarget {Y.Node} The Button-Node that was clicked","              * @param e.property {String} The property-name of the Object (or the Model's attribute-name)","            **/","            host.publish(","                EVT_SAVE_CLICK,","                {","                    defaultFn: Y.rbind(instance._defPluginSaveFn, instance),","                    emitFacade: true","                }","            );","            /**","              * Event fired when the destroybutton is clicked.","              * defaultFunction = calling then model's sync method with action=submit","              * @event destroyclick","              * @param e {EventFacade} Event Facade including:","              * @param e.currentTarget {Y.Node} The Button-Node that was clicked","              * @param e.property {String} The property-name of the Object (or the Model's attribute-name)","            **/","            host.publish(","                EVT_DESTROY_CLICK,","                {","                    // DO NOT use _defDestroyFn --> this is used by the model itself and would make _defDestroyFn of the model","                    // to be excecuted when the plugin is unplugged (!????)","                    defaultFn: Y.rbind(instance._defPluginDestroyFn, instance),","                    emitFacade: true","                }","            );","            instance._bindUI();","            instance.addTarget(host);","            // now a VERY tricky one...","            // We need to fire an event that tells the plugin is pluged in, but it seemed that when listening in the host,","            // host.itsaeditmodel will be read imediately after the event fired --> this seems to be BEFORE the event is registred!!!","            // So, we wait until the real registering is finished and THEN fire the event!","            instance._fireEventTimer = Y.later(","                50,","                instance,","                function() {","                    if (host.itsaeditmodel) {","                        instance._fireEventTimer.cancel();","                        instance.fire(EVT_PLUGGEDIN);","                    }","                },","                null,","                true","            );","        },","","        /**","         * Renderes a button to a formelement. You must specify 'config', so the renderer knows at least its type.","         *","         * @method getButton","         * @param buttonText {String} Text on the button.","         * @param config {String} config that is passed through to ItsaFormElement","         * @param config.type {String} Property-type --> see ItsaFormElement for the attribute 'type' for further information.","         * @param [config.className] {String} Additional className that is passed on the value, during rendering.","         * @param [config.initialFocus] {Boolean} Whether this element should have the initial focus.","         * @param [config.selectOnFocus] {Boolean} Whether this element should completely be selected when it gets focus.","         * @return {String} property (or attributes), rendered as a form-element. The rendered String should be added to the DOM yourself.","         * @since 0.1","         */","        getButton : function(buttonText, config) {","            var instance = this,","                value = buttonText,","                name = buttonText.replace(/ /g,'_'),","                useConfig = Y.merge(DEFAULTCONFIG, config || {}, {name: name, value: value}),","                type = useConfig.type,","                renderedFormElement, nodeId;","","            if (name && config && ((type==='button') || (type==='reset') || (type==='submit') || (type==='save') || (type==='destroy'))) {","                instance._configAttrs[name] = useConfig;","                if (!instance._elementIds[name]) {","                    instance._elementIds[name] = Y.guid();","                }","                nodeId = instance._elementIds[name];","                renderedFormElement = instance._itsaformelement.render(useConfig, nodeId);","                // after rendering we are sure definitely sure what type we have (even if not specified)","                if (instance._isDateTimeType(useConfig.type)) {","                    Y.use('gallery-itsadatetimepicker');","                }","            }","            else {","                renderedFormElement = '';","            }","            return renderedFormElement;","        },","","        /**","         * Renderes the property (Model's attribute) into a formelement. You must specify 'config', so the renderer knows at least its type.","         * Only call this method for existing attributes. If you need buttons, you can use 'getButton'.","         *","         * @method getElement","         * @param propertyName {String} the property (or attribute in case of Model) which should be rendered to a formelement","         * @param config {String} config that is passed through to ItsaFormElement","         * @param config.type {String} Property-type --> see ItsaFormElement for the attribute 'type' for further information.","         * @param [config.keyValidation] {Function} Validation during every keypress.","         * @param [config.validation] {Function} Validation after changing the value (onblur). The function should return true or false.","         * @param [config.validationMessage] {String} The message that will be returned on a validationerror.","         * @param [config.autoCorrection] {Function} If set, inputvalue will be replaced by the returnvalue of this function.","         * @param [config.className] {String} Additional className that is passed on the value, during rendering.","         * @param [config.dateFormat] {String} To format a Date-value.","         * @param [config.initialFocus] {Boolean} Whether this element should have the initial focus.","         * @param [config.selectOnFocus] {Boolean} Whether this element should completely be selected when it gets focus.","         * @param [config.widgetConfig] {Object} Config that will be added to the underlying widget (in case of Date/Time values).","         * @param [predefValue] {Any} In case you don't want the current value, but need a rendered String based on a different predefined value.","         * @return {String} property (or attributes), rendered as a form-element. The rendered String should be added to the DOM yourself.","         * @since 0.1","         */","        getElement : function(propertyName, config, predefValue) {","            var instance = this,","                value = predefValue || instance.host.get(propertyName),","                useConfig = Y.merge(DEFAULTCONFIG, config || {}, {name: propertyName, value: value}),","                renderedFormElement, nodeId;","","            if (propertyName && config) {","                instance._configAttrs[propertyName] = useConfig;","                if (!instance._elementIds[propertyName]) {","                    instance._elementIds[propertyName] = Y.guid();","                }","                nodeId = instance._elementIds[propertyName];","                renderedFormElement = instance._itsaformelement.render(useConfig, nodeId);","                // after rendering we are sure definitely sure what type we have (even if not specified)","                if (instance._isDateTimeType(useConfig.type)) {","                    Y.use('gallery-itsadatetimepicker');","                }","            }","            else {","                renderedFormElement = '';","            }","            return renderedFormElement;","        },","","       /**","        * Saves the editable field to the model and saves the model to the server.","        * It is actually the same method as savePromise (gallery-itsamodelsyncpromise), with","        * the exception that the editable fields are first synced to the model.","        *","        * This method delegates to the `sync()` method to perform the actual save","        * operation, which is an asynchronous action. Specify a _callback_ function to","        * be notified of success or failure.","        *","        * A successful save operation will fire a `save` event, while an unsuccessful","        * save operation will fire an `error` event with the `src` value \"save\".","        *","        * If the save operation succeeds and one or more of the attributes returned in","        * the server's response differ from this model's current attributes, a","        * `change` event will be fired.","        *","        * @method savePromise","        * @param {Object} [options] Options to be passed to `sync()` and to `set()`","        *     when setting synced attributes. It's up to the custom sync implementation","        *     to determine what options it supports or requires, if any.","        *  @param {Function} [callback] Called when the sync operation finishes.","        *     @param {Error|null} callback.err If an error occurred or validation","        *     failed, this parameter will contain the error. If the sync operation","        *     succeeded, _err_ will be `null`.","        *     @param {Any} callback.response The server's response. This value will","        *     be passed to the `parse()` method, which is expected to parse it and","        *     return an attribute hash.","        * @return {Y.Promise} promised response --> resolve(response, options) OR reject(reason).","        **/","        savePromise : function(options) {","            var instance = this,","                updateMode = instance.get('updateMode');","","            instance._needAutoSaved = false;","            if (updateMode!==3) {","                instance._editFieldsToModel();","            }","            return instance.host.savePromise(options);","        },","","       /**","         * Saves the editable field to the model and submits the model to the server.","         * It is actually the same method as submitPromise (gallery-itsamodelsyncpromise), with","         * the exception that the editable fields are first synced to the model.","         *","         * This method delegates to the `sync()` method to perform the actual submit","         * operation, which is Y.Promise. Read the Promise.then() and look for resolve(response, options) OR reject(reason).","         *","         * A successful submit-operation will also fire a `submit` event, while an unsuccessful","         * submit operation will fire an `error` event with the `src` value \"submit\".","         *","         * <b>CAUTION</b> The sync-method MUST call its callback-function to make the promised resolved.","         * @method submitPromise","         * @param {Object} [options] Options to be passed to `sync()`. It's up to the custom sync","         *                 implementation to determine what options it supports or requires, if any.","         * @return {Y.Promise} promised response --> resolve(response, options) OR reject(reason).","        **/","        submitPromise: function(options) {","            var instance = this,","                updateMode = instance.get('updateMode');","","            instance._needAutoSaved = false;","            if (updateMode!==3) {","                instance._editFieldsToModel();","            }","            return instance.host.submitPromise(options);","        },","","        /**","         * Renderes a copy of all Model's attributes.","         * Should you omit 'configAttrs' then the renderer will try to find out the types automaticly.","         *","         * @method toJSON","         * @param configAttrs {Object} Every property of the host object/model can be defined as a property of configAttrs as well.","         * The value should also be an object: the config of the property that is passed to the ITSAFormElement.","         * @param configAttrs.hostProperty1 {Object} config of hostProperty1 (as example, you should use a real property here)","         * @param [configAttrs.hostProperty2] {Object} config of hostProperty2 (as example, you should use a real property here)","         * @param [configAttrs.hostProperty3] {Object} config of hostProperty3 (as example, you should use a real property here)","         * @return {Object} Copy of the host's objects or model's attributes, rendered as form-elements.","         * The rendered String should be added to the DOM yourself.","         * @since 0.1","         */","        toJSON : function(configAttrs) {","            var instance = this,","                host = instance.host,","                allproperties, useConfig, nodeId, mergedConfigAttrs;","","            if (configAttrs) {","                // we NEED to use clone() and NOT merge()","                // In case of more simultanious instances, they must not have the same source or they would interfere","                mergedConfigAttrs = Y.clone(configAttrs);","                allproperties = Y.merge(host.getAttrs());","                // now modify all the property-values into formelements","                YObject.each(","                    allproperties,","                    function(value, key, object) {","                        useConfig = Y.merge(DEFAULTCONFIG, (mergedConfigAttrs && mergedConfigAttrs[key]) || {}, {name: key, value: value});","                        if (mergedConfigAttrs[key]) {","                            mergedConfigAttrs[key].name = key;","                            mergedConfigAttrs[key].value = value;","                            if (!instance._elementIds[key]) {","                                instance._elementIds[key] = Y.guid();","                            }","                            nodeId = instance._elementIds[key];","                            object[key] = instance._itsaformelement.render(useConfig, nodeId);","                        }","                        else {","                            delete object[key];","                        }","                    }","                );","                // Next, we need to look for buttons tht are not part of the attributes","                YObject.each(","                    mergedConfigAttrs,","                    function(config, key) {","                        var type = config.type;","                        if ((type==='button') || (type==='reset') || (type==='submit') || (type==='save') || (type==='destroy')) {","                            useConfig = Y.merge(DEFAULTCONFIG, config, {name: key, value: config.buttonText || UNDEFINED_VALUE});","                            if (!instance._elementIds[key]) {","                                instance._elementIds[key] = Y.guid();","                            }","                            nodeId = instance._elementIds[key];","                            allproperties[key] = instance._itsaformelement.render(useConfig, nodeId);","                        }","                    }","                );","                instance._configAttrs = mergedConfigAttrs;","            }","            else {","                allproperties = '';","                instance._configAttrs = {};","            }","            return allproperties;","        },","","        /**","         * Cleans up bindings and removes plugin","         * @method destructor","         * @protected","         * @since 0.1","        */","        destructor : function() {","            var instance = this;","            if (instance._autoSaveTimer) {","                instance._autoSaveTimer.cancel();","            }","            instance._clearEventhandlers();","            instance._itsaformelement.destroy();","            instance._configAttrs = {};","            instance._elementIds = {};","            instance.removeTarget(instance.host);","        },","","        //===============================================================================================","        // private methods","        //===============================================================================================","","        /**","         * Autostorefunction that is called by timerinterval 'autosaveInterval' in case 'updateMode'===2","         * @method _autoStore","         * @protected","        */","        _autoStore : function() {","            var instance = this;","","            if (instance._needAutoSaved) {","                instance._editFieldsToModel();","                instance._needAutoSaved = false;","            }","        },","","        /**","         * Setting up eventlisteners","         *","         * @method _bindUI","         * @private","         * @since 0.1","         *","        */","        _bindUI : function() {","            var instance = this,","                eventhandlers = instance._eventhandlers;","","            eventhandlers.push(","                Y.on(","                    EVT_DATETIMEPICKER_CLICK,","                    function(e) {","                        var button = e.buttonNode,","                            span = button.one('span'),","                            valuespan = button.previous('span'),","                            picker = Y.ItsaDateTimePicker,","                            propertyName = e.property,","                            propertyconfig = instance._configAttrs[propertyName],","                            value = instance.host.get(propertyName),","                            widgetconfig = (propertyconfig && propertyconfig.widgetConfig) || {},","                            promise;","                        if (e.elementId===instance._elementIds[propertyName]) {","                            if (span.hasClass(ITSAFORMELEMENT_DATE_CLASS)) {","                                promise = Y.rbind(picker.getDate, picker);","                            }","                            else if (span.hasClass(ITSAFORMELEMENT_TIME_CLASS)) {","                                promise = Y.rbind(picker.getTime, picker);","                            }","                            else if (span.hasClass(ITSAFORMELEMENT_DATETIME_CLASS)) {","                                promise = Y.rbind(picker.getDateTime, picker);","                            }","                            widgetconfig.alignToNode = button;","                            promise(value, widgetconfig).then(","                                function(newdate) {","                                    var newRenderedElement;","                                    instance._storeProperty(valuespan, propertyName, newdate, true);","                                    // because _setProperty setts the attribute with {fromEditModel: true},","                                    // the view does not re-render. We change the fieldvalue ourselves","                                    // first ask for ITSAFormElement how the render will look like","                                    // then axtract the value from within","                                    newRenderedElement = instance.getElement(propertyName, propertyconfig, propertyconfig.value);","                                    valuespan.setHTML(instance._getDateTimeValueFromRender(newRenderedElement));","                                    button.focus();","                                },","                                function() {","                                    // be carefull: button might not exist anymore, when the view is rerendered and making the promise to be rejected!","                                    if (button) {","                                        button.focus();","                                    }","                                }","                            );","                        }","                    }","                )","            );","            eventhandlers.push(","                Y.on(","                    [EVT_INTERNAL+EVT_RESET_CLICK, EVT_INTERNAL+EVT_SUBMIT_CLICK, EVT_INTERNAL+EVT_SAVE_CLICK, EVT_INTERNAL+EVT_BUTTON_CLICK,","                                                                              EVT_INTERNAL+EVT_ADD_CLICK, EVT_INTERNAL+EVT_DESTROY_CLICK],","                    function(e) {","                        if ((e.elementId===instance._elementIds[e.property])) {","                            // stop the original event to prevent double events","                            e.halt();","                            // make the host fire the event","                            var payload = {type: e.type};","                            Y.rbind(instance._fireModelEvent, instance, e.type, payload)();","                        }","                    }","                )","            );","            eventhandlers.push(","                Y.on(","                    EVT_FOCUS_NEXT,","                    function(e) {","                        if (e.elementId===instance._elementIds[e.property]) {","                            // stop the original event to prevent double events","                            e.halt();","                            // make the host fire the event","                            instance.fire(EVT_FOCUS_NEXT, e);","                        }","                    }","                )","            );","            eventhandlers.push(","                Y.on(","                    EVT_VALUE_CHANGE,","                    function(e) {","                        if (e.elementId===instance._elementIds[e.property]) {","                            instance._storeProperty(e.inputNode, e.property, e.inputNode.get('value'));","                        }","                    }","                )","            );","            eventhandlers.push(","                Y.on(","                    EVT_INPUT_CHANGE,","                    function(e) {","                        if (e.elementId===instance._elementIds[e.property]) {","                            instance._storeProperty(e.inputNode, e.property, e.inputNode.get('value'), true);","                        }","                    }","                )","            );","            //============================================================================================","            // if the model gets changed and it wasn't this module, than fire an event.","            // So the developer can use this to listen for these changes and react on them","            instance.host.on(","                'model:change',","                function() {","                    Y.fire(EVT_DIALOG_WARN, {message: MESSAGE_WARN_MODELCHANGED});","                }","            );","            //============================================================================================","","","        },","","        /**","         * Cleaning up all eventlisteners","         *","         * @method _clearEventhandlers","         * @private","         * @since 0.1","         *","        */","        _clearEventhandlers : function() {","            YArray.each(","                this._eventhandlers,","                function(item){","                    item.detach();","                }","            );","        },","","        /**","         * The default destroyFunction of the 'destroyclick'-event. Will call the server with all Model's properties.","         * @method _defPluginDestroyFn","         * @protected","        */","        _defPluginDestroyFn : function() {","            var instance = this;","            //    syncOptions = instance.get('syncOptions'),","            //    options;","","            instance._needAutoSaved = false;","            // I would love to have the next method here: because the could be prevented this way (as part of defaultFunc)","            // However, within the defaultFunc, it seems we cannot augment the eventFacade... ); --> https://github.com/yui/yui3/issues/685","            // That's why the functions are transported to the method '_fireModelEvent'","","            // options = Y.merge({remove: true}, syncOptions.destroy || {}});","            // e.promise = instance.host.destroyPromise(options);","        },","","        /**","         * The default addFunction of the 'addclick'-event. Will call the server with all Model's properties.","         * @method _defPluginAddFn","         * @protected","        */","        _defPluginAddFn : function() {","            var instance = this;","","            instance._needAutoSaved = false;","            // no sync('create') --> leave this to the view","        },","","        /**","         * The default submitFunction of the 'resetclick'-event. Will call the server with all Model's properties.","         * @method _defPluginResetFn","         * @protected","        */","        _defPluginResetFn : function() {","            var instance = this;","","            instance._needAutoSaved = false;","            // no sync('reset') --> leave this to the view","        },","","        /**","         * The default submitFunction of the 'submitclick'-event. Will call the server with all Model's properties.","         * @method _defPluginSubmitFn","         * @protected","        */","        _defPluginSubmitFn : function() {","            // Within the defaultFunc, it seems we cannot augment the eventFacade... );","            this._defStoreFn('submit');","        },","","        /**","         * Saves all editable properties to the Model and calls the models synclayer.","         * @method _defSaveFn","         * @protected","        */","        _defPluginSaveFn : function() {","            // Within the defaultFunc, it seems we cannot augment the eventFacade... );","","            this._defStoreFn('save');","        },","","        /**","         * Function that is used by save and _defPluginSubmitFn to store the modelvalues.","         * @method _defStoreFn","         * @param mode {String} type of update","         * @protected","        */","        _defStoreFn : function() {","            var instance = this,","                updateMode = instance.get('updateMode');","//                syncOptions, options;","","            instance._needAutoSaved = false;","            if (updateMode!==3) {","                instance._editFieldsToModel();","            }","            // I would love to have the next methods here: because the could be prevented this way (as part of defaultFunc)","            // However, within the defaultFunc, it seems we cannot augment the eventFacade... ); --> https://github.com/yui/yui3/issues/685","            // That's why the functions are transported to the method '_fireModelEvent'","/*","            if (mode === 'save') {","                syncOptions = instance.get('syncOptions');","                options = syncOptions[mode] || {};","                e.promise = instance.host.savePromise(options);","            }","            else if (mode === 'submit') {","                syncOptions = instance.get('syncOptions');","                options = syncOptions[mode] || {};","                e.promise = instance.host.submitPromise(options);","            }","*/","        },","","        /**","         * Transports the formelement-values to the model or object","         *","         * @method _editFieldsToModel","         * @private","         * @since 0.1","         *","        */","        _editFieldsToModel: function() {","            var instance = this,","                configAttrs = instance._configAttrs,","                newModelAttrs = {};","","            YObject.each(","                configAttrs,","                function(propertyvalue, property) {","                    newModelAttrs[property] = propertyvalue.value;","                }","            );","            instance._setProperty(null, newModelAttrs);","        },","","        /**","         * Lets the host-model fire an model:eventName event","         *","         * @method _fireModelEvent","         * @param eventName {String} event to be fired (model:eventName)","         * @param eventPayLoad {eventTarget} payload","         * @private","         * @since 0.1","         *","        */","        _fireModelEvent: function(eventName, eventPayload) {","            var instance = this,","                host = instance.host,","                ModelClass, modelAttrs, currentConfig, newModel, syncOptions, options;","","            eventPayload.target = host;","            if (eventName === EVT_ADD_CLICK) {","                ModelClass = instance.get('newModelClass');","                modelAttrs = Y.clone(instance.get('newModelDefinition'));","                newModel = new ModelClass(modelAttrs);","                // now reattach the synclayer","                newModel.sync = host.sync;","                currentConfig = Y.clone(instance.getAttrs());","                newModel.plug(Y.Plugin.ITSAEditModel, currentConfig);","                eventPayload.newModel = newModel;","            }","            // I would love to have the next methods inside _defStoreFn: because the could be prevented this way (as part of defaultFunc)","            // However, within the defaultFunc, it seems we cannot augment the eventFacade... ); --> https://github.com/yui/yui3/issues/685","            // That's why the functions are transported to here","            if (eventName === EVT_SAVE_CLICK) {","                syncOptions = instance.get('syncOptions');","                options = syncOptions.save || {};","                eventPayload.promise = instance.host.savePromise(options);","            }","            else if (eventName === EVT_SUBMIT_CLICK) {","                syncOptions = instance.get('syncOptions');","                options = syncOptions.submit || {};","                eventPayload.promise = instance.host.submitPromise(options);","            }","            else if (eventName === EVT_DESTROY_CLICK) {","                syncOptions = instance.get('syncOptions');","                options = Y.merge({remove: true}, syncOptions.destroy || {});","                eventPayload.promise = instance.host.destroyPromise(options);","            }","            host.fire(eventName, eventPayload);","        },","","        /**","         * Extracts the date-time value from the rendered Date-time String.","         *","         * @method _getDateTimeValueFromRender","         * @param renderedElement {String} The rendered elementstring from which the info needs to be extracted","         * @return {Any} Attribute value, or `undefined` if the attribute doesn't exist, or 'null' if no model is passed.","         * @private","         * @since 0.1","         *","        */","        _getDateTimeValueFromRender : function(renderedElement) {","            var regexp = /<span[^>]+>([^<]*)</;","","            return regexp.test(renderedElement) ? RegExp.$1 : '';","        },","","        /**","         * Check if the property-type is a date, time or datetime type.","         *","         * @method _isDateTimeType","         * @param type {String} propertytype to check","         * @return {Boolean} whether the type is a date-time type","         * @private","         * @since 0.1","         *","        */","        _isDateTimeType : function(type) {","            return (type==='date') || (type==='time') || (type==='datetime');","        },","","        /**","         * Sets the value of a property (or in case of Model, the attribute). Regardless which type the host is.","         * In case","         *","         * @method _setProperty","         * @param [propertyName] {String} Propertyname or -in case or Model- attribute-name. If set to 'null' then all attributes are set.","                  In tha case 'value' should be a hash containing properties and values, which can be passed through to 'Model.setAttrs()'","         * @param value {Any} The new value to be set.","         * @private","         * @since 0.1","         *","        */","        _setProperty: function(propertyName, value) {","            var instance = this,","                host = instance.host,","                options = {fromEditModel: true}, // set Attribute with option: '{fromEditModel: true}' --> now the view knows it must not re-render.","                propertyconfig;","","            propertyconfig = instance._configAttrs[propertyName];","            if (propertyconfig) {","                propertyconfig.value = value;","            }","            if (propertyName) {","                host.set(propertyName, value, options);","            }","            else {","                host.setAttrs(value, options);","            }","        },","","        /**","         * Saves the value of a property (or in case of Model, the attribute). Regardless which type the host is.","         * It will <store> the value. It might be set to the Model, but that deppends on the value of 'updateMode'.","         * In order to do that it might call _setProperty.","         *","         * @method _storeProperty","         * @param node {Y.Node} node that holds the formelement that was changed.","         * @param propertyName {String} Propertyname or -in case or Model- attribute-name.","         * @param value {Any} The new value to be set.","         * @param finished {Boolean} Whether the final value is reached. Some types (like text) can store before they reach","                  their final value.","         * @private","         * @since 0.1","         *","        */","        _storeProperty: function(node, propertyName, value, finished) {","            var instance = this,","                updateMode = instance.get('updateMode'),","                isObject = Lang.isObject(value),","                payload = {","                    node: node,","                    property: propertyName,","                    newVal: (isObject ? Y.merge(value) : value),","                    finished: finished","                },","                propertyconfig, setProperty, attributevalue;","","            propertyconfig = instance._configAttrs[propertyName];","            if (propertyconfig) {","                payload.prevValue = isObject ? Y.merge(propertyconfig.value) : propertyconfig.value;","                propertyconfig.value = value;","            }","            else {","                attributevalue = instance.host.get(propertyName);","                payload.prevValue = isObject ? Y.merge(attributevalue) : attributevalue;","            }","            setProperty = ((updateMode===3) || ((updateMode===1) && finished));","            if (setProperty) {","                instance._setProperty(propertyName, value);","            }","            else {","                node.addClass(ITSAFORMELEMENT_CHANGED_CLASS);","                if (updateMode===2) {","                    instance._needAutoSaved = true;","                }","            }","            /**","              * Event fired when a property changed during editing. This is regardless of whether the property is changed.","              * Using these events will help you -for instance- with hiding formelements based on property-values.<br />","              * The evennames consist of the propertyname+'Change'.","              * @event propertynameChange","              * @param e {EventFacade} Event Facade including:","              * @param e.node {Y.Node} The Node that was changed","              * @param e.property {String} The Model's attribute-name that was changed.","              * @param e.newVal {Any} The new value","              * @param e.newVal {Any} The previous value","              * @param e.finished {Boolean} Whether the attribute finished changing. Some attributes (input, textarea's) can fire","              *        this event during editing while still busy (not blurring): they have finished set to false.","            **/","            instance.fire(propertyName+'Change', payload);","        }","","    }, {","        NS : 'itsaeditmodel',","        ATTRS : {","            /**","             * Sets the interval to do an 'autosave' during editing input/textfields.","             * Only applies in situations where the attribute 'updateMode'===2. Value should be in <b>seconds</b> between 1-3600.","             * @attribute autosaveInterval","             * @type Int","             * @default 30","             * @since 0.1","            */","            autosaveInterval : {","                value: 30,","                validator: function(val) {","                    return ((typeof val === 'number') && (val>0) && (val<=3600));","                },","                setter: function(val) {","                    var instance = this,","                        updateMode = instance.get('updateMode');","                    if (instance._autoSaveTimer) {","                        instance._autoSaveTimer.cancel();","                    }","                    if (updateMode===2) {","                        instance._autoSaveTimer = Y.later(","                            1000*val,","                            instance,","                            instance._autoStore,","                            null,","                            true","                        );","                    }","                }","            },","            /**","             * Every property of the object/model you want to edit, should be defined as a property of configAttrs.","             * Every property-definition is an object: the config of the property that is passed to the ITSAFormElement.<br />","             * Example: <br />","             * editmodelConfigAttrs.property1 = {Object} config of property1 (as example, you should use a real property here)<br />","             * editmodelConfigAttrs.property2 = {Object} config of property2 (as example, you should use a real property here)<br />","             * editmodelConfigAttrs.property3 = {Object} config of property3 (as example, you should use a real property here)<br />","             *","             * @attribute editmodelConfigAttrs","             * @type {Object}","             * @default {}","             * @since 0.1","             */","            editmodelConfigAttrs: {","                value: {},","                validator: function(v){","                    return Lang.isObject(v);","                }","            },","            /**","             * Object with the properties: <b>destroy</b>, <b>save</b> and <b>submit</b>. For every property you might want to","             * specify the options-object that will be passed through to the sync- or destroy-method. The destroymethod will","             * <i>always</i> be called with 'remove=true', in order to call the sync-method.","             * @attribute syncOptions","             * @type Object","             * @default {}","             * @since 0.1","            */","            syncOptions : {","                value: {},","                validator: function(val) {","                    return Lang.isObject(val);","                }","            },","            /**","             * Specifies how <b>new models</b> will look like. When creating new Models, they get cloned from this object.","             * @attribute newModelDefinition","             * @type Object","             * @default {}","             * @since 0.1","            */","            newModelDefinition : {","                value: {},","                validator: function(val) {","                    return (Lang.isObject(val));","                }","            },","            /**","             * Specifies the Class of new created Models (that is, when a model:addclick event occurs).","             * @attribute newModelClass","             * @type Model","             * @default Y.Model","             * @since 0.1","            */","            newModelClass : {","                value: Y.Model","            },","            /**","             * Template of how to render the model in the view. You can <b>only use Y.Lang.sub templates</b> where the attribute/properties","             * should be specified between brackets. Example: 'Name: {firstname} {lastname}'.<br />","             * Or you can use Y.Template.Micro: 'Name: <%= data.firstname + \" \" + data.lastename %>'","             * @attribute template","             * @type String","             * @default null","             * @since 0.1","            */","            template : {","                value: null,","                validator: function(val) {","                    return (typeof val==='string');","                }","            },","            /**","             * When to update the edited value to the Model. You can use 4 states:<br /><br />","             * 0 = only on Model.save <i>(or when dave-button is pressed)</i><br />","             * 1 = after the attribute finished updating <i>in case of textfields: when blurring</i><br />","             * 2 = autosave, based on the interval defined with attribute 'autosaveInterval'<br />","             * 3 = life, immediate updates <i>in case of textfields: after every valueChange</i><br /><br />","             * @attribute updateMode","             * @type Int","             * @default 0","             * @since 0.1","            */","            updateMode : {","                value: 0,","                lazyAdd: false, // in case of value","                validator: function(val) {","                    return ((typeof val === 'number') && (val>=0) && (val<=3));","                },","                setter: function(val) {","                    var instance = this,","                        autosaveInterval = instance.get('autosaveInterval');","                    if (val) {","                        instance._autoSaveTimer = Y.later(","                            1000*autosaveInterval,","                            instance,","                            instance._autoStore,","                            null,","                            true","                        );","                    }","                    else {","                        if (instance._autoSaveTimer) {","                            instance._autoSaveTimer.cancel();","                        }","                    }","                }","            }","        }","    }",");","","//===================================================================","// adding plug and unplug features to Y.Model:","Y.augment(Y.Model, Y.Plugin.Host);","","// now we need to set global eventhandlers, but only once.","// unfortunatly they need to keep in memory, even when unplugged.","// however: they only get there once, so no memoryleaks","  body.delegate(","      'click',","      function(e) {","          var button = e.currentTarget,","              span = button.previous('span');","          // stop the original event to prevent double events","          e.halt();","          // set the focus manually. This will cause the View to be focussed as well --> now the focusmanager works for this View-instance","          button.focus();","          Y.use('gallery-itsadatetimepicker', function(Y) {","              e.elementId = span.get('id');","              e.type = EVT_DATETIMEPICKER_CLICK;","              e.buttonNode = button;","              e.property = GET_PROPERTY_FROM_CLASS(span.getAttribute('class'));","              Y.fire(EVT_DATETIMEPICKER_CLICK, e);","          });","      },","      '.'+ITSABUTTON_DATETIME_CLASS","  );","  body.delegate(","      'valuechange',","      function(e) {","          var inputnode = e.currentTarget;","          // seems that e.halt() cannot be called here ???","          e.elementId = inputnode.get('id');","          e.inputNode = inputnode;","          e.property = GET_PROPERTY_FROM_CLASS(inputnode.getAttribute('class'));","          e.type = EVT_VALUE_CHANGE;","          Y.fire(EVT_VALUE_CHANGE, e);","      },","      '.'+ITSAFORMELEMENT_LIFECHANGE_CLASS","  );","  body.delegate(","      'change',","      function(e) {","          var inputnode = e.currentTarget;","          // seems that e.halt() cannot be called here ???","          e.elementId = inputnode.get('id');","          e.inputNode = inputnode;","          e.property = GET_PROPERTY_FROM_CLASS(inputnode.getAttribute('class'));","          e.type = EVT_INPUT_CHANGE;","          Y.fire(EVT_INPUT_CHANGE, e);","      },","      '.'+ITSAFORMELEMENT_LIFECHANGE_CLASS","  );","  body.delegate(","      'keypress',","      function(e) {","          if (e.keyCode===13) {","              // stop the original event to prevent double events","              e.halt();","              var inputnode = e.currentTarget;","              // seems that e.halt() cannot be called here ???","              e.elementId = inputnode.get('id');","              e.inputNode = inputnode;","              e.property = GET_PROPERTY_FROM_CLASS(inputnode.getAttribute('class'));","              e.type = EVT_FOCUS_NEXT;","              Y.fire(EVT_FOCUS_NEXT, e);","          }","      },","      '.'+ITSAFORMELEMENT_ENTERNEXTFIELD_CLASS","  );","  body.delegate(","      'click',","      function(e) {","          var button = e.currentTarget,","              classNames = button.getAttribute('class');","          // stop the original event to prevent double events","          e.halt();","          // set the focus manually. This will cause the View to be focussed as well --> now the focusmanager works for this View-instance","          button.focus();","          e.elementId = button.get('id');","          e.buttonNode = button;","          e.property = GET_PROPERTY_FROM_CLASS(button.getAttribute('class'));","          if (classNames.indexOf(SUBMIT_BUTTON_CLASS) !== -1) {","              e.type = EVT_SUBMIT_CLICK;","              Y.fire(EVT_INTERNAL+EVT_SUBMIT_CLICK, e);","          }","          else if (classNames.indexOf(RESET_BUTTON_CLASS) !== -1) {","              e.type = EVT_RESET_CLICK;","              Y.fire(EVT_INTERNAL+EVT_RESET_CLICK, e);","          }","          else if (classNames.indexOf(SAVE_BUTTON_CLASS) !== -1) {","              e.type = EVT_SAVE_CLICK;","              Y.fire(EVT_INTERNAL+EVT_SAVE_CLICK, e);","          }","          else if (classNames.indexOf(DESTROY_BUTTON_CLASS) !== -1) {","              e.type = EVT_DESTROY_CLICK;","              Y.fire(EVT_INTERNAL+EVT_DESTROY_CLICK, e);","          }","          else if (classNames.indexOf(ADD_BUTTON_CLASS) !== -1) {","              e.type = EVT_ADD_CLICK;","              Y.fire(EVT_INTERNAL+EVT_ADD_CLICK, e);","          }","          else if (classNames.indexOf(BUTTON_BUTTON_CLASS) !== -1) {","              // check this one as the last one: the others ALL have this class as well","              e.type = EVT_BUTTON_CLICK;","              Y.fire(EVT_INTERNAL+EVT_BUTTON_CLICK, e);","          }","      },","      '.'+ITSAFORMELEMENT_BUTTONTYPE_CLASS","  );","","}, '@VERSION@', {","    \"requires\": [","        \"yui-base\",","        \"base-build\",","        \"node-base\",","        \"node-event-delegate\",","        \"plugin\",","        \"pluginhost-base\",","        \"lazy-model-list\",","        \"event-valuechange\",","        \"gallery-itsamodelsyncpromise\",","        \"gallery-itsaformelement\"","    ]","});"];
_yuitest_coverage["build/gallery-itsaeditmodel/gallery-itsaeditmodel.js"].lines = {"1":0,"3":0,"27":0,"65":0,"67":0,"130":0,"140":0,"151":0,"160":0,"169":0,"178":0,"187":0,"196":0,"205":0,"214":0,"216":0,"217":0,"226":0,"242":0,"257":0,"272":0,"287":0,"296":0,"297":0,"302":0,"306":0,"307":0,"308":0,"330":0,"337":0,"338":0,"339":0,"340":0,"342":0,"343":0,"345":0,"346":0,"350":0,"352":0,"377":0,"382":0,"383":0,"384":0,"385":0,"387":0,"388":0,"390":0,"391":0,"395":0,"397":0,"430":0,"433":0,"434":0,"435":0,"437":0,"458":0,"461":0,"462":0,"463":0,"465":0,"483":0,"487":0,"490":0,"491":0,"493":0,"496":0,"497":0,"498":0,"499":0,"500":0,"501":0,"503":0,"504":0,"507":0,"512":0,"515":0,"516":0,"517":0,"518":0,"519":0,"521":0,"522":0,"526":0,"529":0,"530":0,"532":0,"542":0,"543":0,"544":0,"546":0,"547":0,"548":0,"549":0,"550":0,"563":0,"565":0,"566":0,"567":0,"580":0,"583":0,"587":0,"596":0,"597":0,"598":0,"600":0,"601":0,"603":0,"604":0,"606":0,"607":0,"609":0,"610":0,"615":0,"616":0,"617":0,"621":0,"622":0,"630":0,"635":0,"637":0,"639":0,"640":0,"645":0,"649":0,"651":0,"653":0,"658":0,"662":0,"663":0,"668":0,"672":0,"673":0,"681":0,"684":0,"701":0,"704":0,"715":0,"719":0,"734":0,"736":0,"746":0,"748":0,"759":0,"770":0,"780":0,"784":0,"785":0,"786":0,"814":0,"818":0,"821":0,"824":0,"838":0,"842":0,"843":0,"844":0,"845":0,"846":0,"848":0,"849":0,"850":0,"851":0,"856":0,"857":0,"858":0,"859":0,"861":0,"862":0,"863":0,"864":0,"866":0,"867":0,"868":0,"869":0,"871":0,"885":0,"887":0,"901":0,"917":0,"922":0,"923":0,"924":0,"926":0,"927":0,"930":0,"950":0,"961":0,"962":0,"963":0,"964":0,"967":0,"968":0,"970":0,"971":0,"972":0,"975":0,"976":0,"977":0,"993":0,"1010":0,"1013":0,"1015":0,"1016":0,"1018":0,"1019":0,"1045":0,"1060":0,"1073":0,"1098":0,"1116":0,"1119":0,"1121":0,"1122":0,"1131":0,"1132":0,"1143":0,"1148":0,"1151":0,"1154":0,"1156":0,"1157":0,"1158":0,"1159":0,"1160":0,"1161":0,"1162":0,"1167":0,"1170":0,"1172":0,"1173":0,"1174":0,"1175":0,"1176":0,"1180":0,"1183":0,"1185":0,"1186":0,"1187":0,"1188":0,"1189":0,"1193":0,"1196":0,"1198":0,"1199":0,"1201":0,"1202":0,"1203":0,"1204":0,"1205":0,"1210":0,"1213":0,"1216":0,"1218":0,"1219":0,"1220":0,"1221":0,"1222":0,"1223":0,"1224":0,"1226":0,"1227":0,"1228":0,"1230":0,"1231":0,"1232":0,"1234":0,"1235":0,"1236":0,"1238":0,"1239":0,"1240":0,"1242":0,"1244":0,"1245":0};
_yuitest_coverage["build/gallery-itsaeditmodel/gallery-itsaeditmodel.js"].functions = {"GET_PROPERTY_FROM_CLASS:64":0,"(anonymous 2):305":0,"initializer:139":0,"getButton:329":0,"getElement:376":0,"savePromise:429":0,"submitPromise:457":0,"(anonymous 3):495":0,"(anonymous 4):514":0,"toJSON:482":0,"destructor:541":0,"_autoStore:562":0,"(anonymous 6):608":0,"(anonymous 7):619":0,"(anonymous 5):586":0,"(anonymous 8):634":0,"(anonymous 9):648":0,"(anonymous 10):661":0,"(anonymous 11):671":0,"(anonymous 12):683":0,"_bindUI:579":0,"(anonymous 13):703":0,"_clearEventhandlers:700":0,"_defPluginDestroyFn:714":0,"_defPluginAddFn:733":0,"_defPluginResetFn:745":0,"_defPluginSubmitFn:757":0,"_defPluginSaveFn:767":0,"_defStoreFn:779":0,"(anonymous 14):820":0,"_editFieldsToModel:813":0,"_fireModelEvent:837":0,"_getDateTimeValueFromRender:884":0,"_isDateTimeType:900":0,"_setProperty:916":0,"_storeProperty:949":0,"validator:1009":0,"setter:1012":0,"validator:1044":0,"validator:1059":0,"validator:1072":0,"validator:1097":0,"validator:1115":0,"setter:1118":0,"(anonymous 16):1157":0,"(anonymous 15):1150":0,"(anonymous 17):1169":0,"(anonymous 18):1182":0,"(anonymous 19):1195":0,"(anonymous 20):1212":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-itsaeditmodel/gallery-itsaeditmodel.js"].coveredLines = 274;
_yuitest_coverage["build/gallery-itsaeditmodel/gallery-itsaeditmodel.js"].coveredFunctions = 51;
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1);
YUI.add('gallery-itsaeditmodel', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 3);
'use strict';

/**
 * ITSAEditModel Plugin
 *
 *
 * Plugin for Y.Model that extends Y.Model-instances into having editable properties.
 * After pluged-in, Each property can be rendered into a form-element by using: <i>yourModel.itsaeditmodel.formelement()</i>
 * You can also retreive a copy of the model's attributes with: <i>yourModel.itsaeditmodel.toJSON()</i>
 *
 * Use the attribute 'template' to specify how the rendering will look like.
 *
 *
 * @module gallery-itsaeditmodel
 * @class ITSAEditModel
 * @extends Plugin.Base
 * @constructor
 * @since 0.1
 *
 * <i>Copyright (c) 2013 Marco Asbreuk - http://itsasbreuk.nl</i>
 * YUI BSD License - http://developer.yahoo.com/yui/license.html
 *
*/

_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 27);
var body = Y.one('body'),
    Lang = Y.Lang,
    YArray = Y.Array,
    YObject = Y.Object,
    UNDEFINED_VALUE = 'undefined value',
    MESSAGE_WARN_MODELCHANGED = 'The data you are editing has been changed from outside the form. '+
                                'If you save your data, then these former changed will be overridden.',
    EVT_DATETIMEPICKER_CLICK = 'datetimepickerclick',
    ITSABUTTON_DATETIME_CLASS = 'itsa-button-datetime',
    ITSAFORMELEMENT_DATE_CLASS = 'itsa-datetimepicker-icondate',
    ITSAFORMELEMENT_TIME_CLASS = 'itsa-datetimepicker-icontime',
    ITSAFORMELEMENT_DATETIME_CLASS = 'itsa-datetimepicker-icondatetime',
    FORMELEMENT_CLASS = 'yui3-itsaformelement',
    ITSAFORMELEMENT_BUTTONTYPE_CLASS = FORMELEMENT_CLASS + '-button',
    ITSAFORMELEMENT_LIFECHANGE_CLASS = FORMELEMENT_CLASS + '-lifechange',
    ITSAFORMELEMENT_CHANGED_CLASS = FORMELEMENT_CLASS + '-changed',
    ITSAFORMELEMENT_ENTERNEXTFIELD_CLASS = FORMELEMENT_CLASS + '-enternextfield',
    BUTTON_BUTTON_CLASS = FORMELEMENT_CLASS + '-button',
    ADD_BUTTON_CLASS = FORMELEMENT_CLASS + '-add',
    SUBMIT_BUTTON_CLASS = FORMELEMENT_CLASS + '-submit',
    RESET_BUTTON_CLASS = FORMELEMENT_CLASS + '-reset',
    SAVE_BUTTON_CLASS = FORMELEMENT_CLASS + '-save',
    DESTROY_BUTTON_CLASS = FORMELEMENT_CLASS + '-destroy',
    DEFAULTCONFIG = {
        name : 'undefined-name',
        type : '',
        value : '',
        keyValidation : null,
        validation : null,
        validationMessage : '',
        autoCorrection : null,
        className : null,
        dateFormat : null,
        initialFocus : false,
        selectOnFocus : false,
        widgetConfig : {}
    },
    GET_PROPERTY_FROM_CLASS = function(className) {
        _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "GET_PROPERTY_FROM_CLASS", 64);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 65);
var regexp = /yui3-itsaformelement-property-(\w+)/;

        _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 67);
return regexp.test(className) ? RegExp.$1 : null;
    },
    EVT_INTERNAL = 'internal',
    // next five events are declared within the initialiser:
    EVT_SUBMIT_CLICK = 'submitclick',
    EVT_ADD_CLICK = 'addclick',
    EVT_SAVE_CLICK = 'saveclick',
    EVT_RESET_CLICK = 'resetclick',
    EVT_DESTROY_CLICK = 'destroyclick',



   /**
     * Fired to be caught by ItsaDialog. This event occurs when there is a warning (for example Model changed outside the editview).
     * @event focusnext
     * @param e {EventFacade} Event Facade including:
     * @param e.message {String} The warningmessage.
     * @since 0.1
    **/
    EVT_FOCUS_NEXT = 'focusnext',
   /**
     * Fired to be caught by ItsaDialog. This event occurs when there is a warning (for example Model changed outside the editview).
     * @event dialog:warn
     * @param e {EventFacade} Event Facade including:
     * @param e.message {String} The warningmessage.
     * @since 0.1
    **/
    EVT_DIALOG_WARN = 'dialog:warn',
    /**
      * Event fired after an input-elements value is changed.
      * @event inputchange
      * @param e {EventFacade} Event Facade including:
      * @param e.inputNode {Y.Node} The Input-Node that was clicked
      * @param e.elementId {String} Id of the Node that chancged value.
      * @param e.property {String} The property-name of the Object (or the Model's attribute-name)
    **/
    EVT_INPUT_CHANGE = 'inputchange',
    /**
      * Event fired when an input-elements value is changed (life, without blurring): valuechange.
      * @event inputvaluechange
      * @param e {EventFacade} Event Facade including:
      * @param e.inputNode {Y.Node} The Input-Node that was clicked
      * @param e.elementId {String} Id of the Node that chancged value.
      * @param e.property {String} The property-name of the Object (or the Model's attribute-name)
    **/
    EVT_VALUE_CHANGE = 'inputvaluechange',
    /**
      * Event fired when a normal button (elementtype) is clicked.
      * @event buttonclick
      * @param e {EventFacade} Event Facade including:
      * @param e.buttonNode {Y.Node} The Button-Node that was clicked
      * @param e.property {String} The property-name of the Object (or the Model's attribute-name)
      * @param [e.model] {Y.Model} This modelinstance.
    **/
    EVT_BUTTON_CLICK = 'buttonclick',
   /**
     * Fired after the plugin is pluggedin and ready to be referenced by the host. This is LATER than after the 'init'-event,
     * because the latter will be fired before the namespace Model.itsaeditmodel exists.
     * @event pluggedin
     * @since 0.1
    **/
    EVT_PLUGGEDIN = 'pluggedin';

_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 130);
Y.namespace('Plugin').ITSAEditModel = Y.Base.create('itsaeditmodel', Y.Plugin.Base, [], {

        /**
         * Sets up the toolbar during initialisation. Calls render() as soon as the hosts-editorframe is ready
         *
         * @method initializer
         * @protected
         * @since 0.1
         */
        initializer : function() {
            _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "initializer", 139);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 140);
var instance = this,
                host;

           // -- Public Properties -------------------------------------------------

           /**
            * The plugin's host, which should be a Model-instance (or descendent)
            * @property host
            * @default host-instance
            * @type Y.Model
            */
            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 151);
instance.host = instance.get('host');

           /**
            * Internal list that holds event-references
            * @property _eventhandlers
            * @default []
            * @private
            * @type Array
            */
            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 160);
instance._eventhandlers = [];

           /**
            * An instance of Y.ITSAFormElement that is used to generate the form-html of the elements.
            * @property _itsaformelement
            * @default null
            * @private
            * @type Y.ITSAFormElement-instance
            */
            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 169);
instance._itsaformelement = null;

           /**
            * internal backup of all property-configs
            * @property _configAttrs
            * @default {}
            * @private
            * @type Object
            */
            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 178);
instance._configAttrs = {};

           /**
            * internal backup of all rendered node-id's
            * @property _elementIds
            * @default {}
            * @private
            * @type Object
            */
            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 187);
instance._elementIds = {};

           /**
            * internal flag that tells whether automaicly saving needs to happen in case properties have changed
            * @property _needAutoSaved
            * @default false
            * @private
            * @type Boolean
            */
            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 196);
instance._needAutoSaved = false;

           /**
            * Internal reference to Y.later timerobject for autosaving
            * @property _autoSaveTimer
            * @default null
            * @private
            * @type timer-Object
            */
            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 205);
instance._autoSaveTimer = null;

           /**
            * Internal reference to Y.later timerobject that is used to fire a 'pluggedin'-event once 'itsaeditmodel' is available on the host.
            * @property _fireEventTimer
            * @default null
            * @private
            * @type timer-Object
            */
            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 214);
instance._fireEventTimer = null;

            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 216);
host = instance.host;
            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 217);
instance._itsaformelement = new Y.ITSAFormElement();
            /**
              * Event fired when the submitbutton is clicked.
              * defaultFunction = calling then model's sync method with action=submit
              * @event submitclick
              * @param e {EventFacade} Event Facade including:
              * @param e.currentTarget {Y.Node} The Button-Node that was clicked
              * @param e.property {String} The property-name of the Object (or the Model's attribute-name)
            **/
            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 226);
host.publish(
                EVT_SUBMIT_CLICK,
                {
                    defaultFn: Y.rbind(instance._defPluginSubmitFn, instance),
                    emitFacade: true
                }
            );
            /**
              * Event fired when the addbutton is clicked.
              * defaultFunction = calling then model's sync method with action=reset
              * @event addclick
              * @param e {EventFacade} Event Facade including:
              * @param e.newModel {Y.Model} The new model-instance.
              * @param e.currentTarget {Y.Node} The Button-Node that was clicked
              * @param e.property {String} The property-name of the Object (or the Model's attribute-name)
            **/
            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 242);
host.publish(
                EVT_ADD_CLICK,
                {
                    defaultFn: Y.rbind(instance._defPluginAddFn, instance),
                    emitFacade: true
                }
            );
            /**
              * Event fired when the resetbutton is clicked.
              * defaultFunction = calling then model's sync method with action=reset
              * @event resetclick
              * @param e {EventFacade} Event Facade including:
              * @param e.currentTarget {Y.Node} The Button-Node that was clicked
              * @param e.property {String} The property-name of the Object (or the Model's attribute-name)
            **/
            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 257);
host.publish(
                EVT_RESET_CLICK,
                {
                    defaultFn: Y.rbind(instance._defPluginResetFn, instance),
                    emitFacade: true
                }
            );
            /**
              * Event fired when the savebutton is clicked.
              * defaultFunction = calling then model's sync method with action=submit
              * @event saveclick
              * @param e {EventFacade} Event Facade including:
              * @param e.currentTarget {Y.Node} The Button-Node that was clicked
              * @param e.property {String} The property-name of the Object (or the Model's attribute-name)
            **/
            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 272);
host.publish(
                EVT_SAVE_CLICK,
                {
                    defaultFn: Y.rbind(instance._defPluginSaveFn, instance),
                    emitFacade: true
                }
            );
            /**
              * Event fired when the destroybutton is clicked.
              * defaultFunction = calling then model's sync method with action=submit
              * @event destroyclick
              * @param e {EventFacade} Event Facade including:
              * @param e.currentTarget {Y.Node} The Button-Node that was clicked
              * @param e.property {String} The property-name of the Object (or the Model's attribute-name)
            **/
            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 287);
host.publish(
                EVT_DESTROY_CLICK,
                {
                    // DO NOT use _defDestroyFn --> this is used by the model itself and would make _defDestroyFn of the model
                    // to be excecuted when the plugin is unplugged (!????)
                    defaultFn: Y.rbind(instance._defPluginDestroyFn, instance),
                    emitFacade: true
                }
            );
            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 296);
instance._bindUI();
            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 297);
instance.addTarget(host);
            // now a VERY tricky one...
            // We need to fire an event that tells the plugin is pluged in, but it seemed that when listening in the host,
            // host.itsaeditmodel will be read imediately after the event fired --> this seems to be BEFORE the event is registred!!!
            // So, we wait until the real registering is finished and THEN fire the event!
            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 302);
instance._fireEventTimer = Y.later(
                50,
                instance,
                function() {
                    _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "(anonymous 2)", 305);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 306);
if (host.itsaeditmodel) {
                        _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 307);
instance._fireEventTimer.cancel();
                        _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 308);
instance.fire(EVT_PLUGGEDIN);
                    }
                },
                null,
                true
            );
        },

        /**
         * Renderes a button to a formelement. You must specify 'config', so the renderer knows at least its type.
         *
         * @method getButton
         * @param buttonText {String} Text on the button.
         * @param config {String} config that is passed through to ItsaFormElement
         * @param config.type {String} Property-type --> see ItsaFormElement for the attribute 'type' for further information.
         * @param [config.className] {String} Additional className that is passed on the value, during rendering.
         * @param [config.initialFocus] {Boolean} Whether this element should have the initial focus.
         * @param [config.selectOnFocus] {Boolean} Whether this element should completely be selected when it gets focus.
         * @return {String} property (or attributes), rendered as a form-element. The rendered String should be added to the DOM yourself.
         * @since 0.1
         */
        getButton : function(buttonText, config) {
            _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "getButton", 329);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 330);
var instance = this,
                value = buttonText,
                name = buttonText.replace(/ /g,'_'),
                useConfig = Y.merge(DEFAULTCONFIG, config || {}, {name: name, value: value}),
                type = useConfig.type,
                renderedFormElement, nodeId;

            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 337);
if (name && config && ((type==='button') || (type==='reset') || (type==='submit') || (type==='save') || (type==='destroy'))) {
                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 338);
instance._configAttrs[name] = useConfig;
                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 339);
if (!instance._elementIds[name]) {
                    _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 340);
instance._elementIds[name] = Y.guid();
                }
                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 342);
nodeId = instance._elementIds[name];
                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 343);
renderedFormElement = instance._itsaformelement.render(useConfig, nodeId);
                // after rendering we are sure definitely sure what type we have (even if not specified)
                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 345);
if (instance._isDateTimeType(useConfig.type)) {
                    _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 346);
Y.use('gallery-itsadatetimepicker');
                }
            }
            else {
                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 350);
renderedFormElement = '';
            }
            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 352);
return renderedFormElement;
        },

        /**
         * Renderes the property (Model's attribute) into a formelement. You must specify 'config', so the renderer knows at least its type.
         * Only call this method for existing attributes. If you need buttons, you can use 'getButton'.
         *
         * @method getElement
         * @param propertyName {String} the property (or attribute in case of Model) which should be rendered to a formelement
         * @param config {String} config that is passed through to ItsaFormElement
         * @param config.type {String} Property-type --> see ItsaFormElement for the attribute 'type' for further information.
         * @param [config.keyValidation] {Function} Validation during every keypress.
         * @param [config.validation] {Function} Validation after changing the value (onblur). The function should return true or false.
         * @param [config.validationMessage] {String} The message that will be returned on a validationerror.
         * @param [config.autoCorrection] {Function} If set, inputvalue will be replaced by the returnvalue of this function.
         * @param [config.className] {String} Additional className that is passed on the value, during rendering.
         * @param [config.dateFormat] {String} To format a Date-value.
         * @param [config.initialFocus] {Boolean} Whether this element should have the initial focus.
         * @param [config.selectOnFocus] {Boolean} Whether this element should completely be selected when it gets focus.
         * @param [config.widgetConfig] {Object} Config that will be added to the underlying widget (in case of Date/Time values).
         * @param [predefValue] {Any} In case you don't want the current value, but need a rendered String based on a different predefined value.
         * @return {String} property (or attributes), rendered as a form-element. The rendered String should be added to the DOM yourself.
         * @since 0.1
         */
        getElement : function(propertyName, config, predefValue) {
            _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "getElement", 376);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 377);
var instance = this,
                value = predefValue || instance.host.get(propertyName),
                useConfig = Y.merge(DEFAULTCONFIG, config || {}, {name: propertyName, value: value}),
                renderedFormElement, nodeId;

            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 382);
if (propertyName && config) {
                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 383);
instance._configAttrs[propertyName] = useConfig;
                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 384);
if (!instance._elementIds[propertyName]) {
                    _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 385);
instance._elementIds[propertyName] = Y.guid();
                }
                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 387);
nodeId = instance._elementIds[propertyName];
                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 388);
renderedFormElement = instance._itsaformelement.render(useConfig, nodeId);
                // after rendering we are sure definitely sure what type we have (even if not specified)
                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 390);
if (instance._isDateTimeType(useConfig.type)) {
                    _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 391);
Y.use('gallery-itsadatetimepicker');
                }
            }
            else {
                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 395);
renderedFormElement = '';
            }
            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 397);
return renderedFormElement;
        },

       /**
        * Saves the editable field to the model and saves the model to the server.
        * It is actually the same method as savePromise (gallery-itsamodelsyncpromise), with
        * the exception that the editable fields are first synced to the model.
        *
        * This method delegates to the `sync()` method to perform the actual save
        * operation, which is an asynchronous action. Specify a _callback_ function to
        * be notified of success or failure.
        *
        * A successful save operation will fire a `save` event, while an unsuccessful
        * save operation will fire an `error` event with the `src` value "save".
        *
        * If the save operation succeeds and one or more of the attributes returned in
        * the server's response differ from this model's current attributes, a
        * `change` event will be fired.
        *
        * @method savePromise
        * @param {Object} [options] Options to be passed to `sync()` and to `set()`
        *     when setting synced attributes. It's up to the custom sync implementation
        *     to determine what options it supports or requires, if any.
        *  @param {Function} [callback] Called when the sync operation finishes.
        *     @param {Error|null} callback.err If an error occurred or validation
        *     failed, this parameter will contain the error. If the sync operation
        *     succeeded, _err_ will be `null`.
        *     @param {Any} callback.response The server's response. This value will
        *     be passed to the `parse()` method, which is expected to parse it and
        *     return an attribute hash.
        * @return {Y.Promise} promised response --> resolve(response, options) OR reject(reason).
        **/
        savePromise : function(options) {
            _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "savePromise", 429);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 430);
var instance = this,
                updateMode = instance.get('updateMode');

            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 433);
instance._needAutoSaved = false;
            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 434);
if (updateMode!==3) {
                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 435);
instance._editFieldsToModel();
            }
            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 437);
return instance.host.savePromise(options);
        },

       /**
         * Saves the editable field to the model and submits the model to the server.
         * It is actually the same method as submitPromise (gallery-itsamodelsyncpromise), with
         * the exception that the editable fields are first synced to the model.
         *
         * This method delegates to the `sync()` method to perform the actual submit
         * operation, which is Y.Promise. Read the Promise.then() and look for resolve(response, options) OR reject(reason).
         *
         * A successful submit-operation will also fire a `submit` event, while an unsuccessful
         * submit operation will fire an `error` event with the `src` value "submit".
         *
         * <b>CAUTION</b> The sync-method MUST call its callback-function to make the promised resolved.
         * @method submitPromise
         * @param {Object} [options] Options to be passed to `sync()`. It's up to the custom sync
         *                 implementation to determine what options it supports or requires, if any.
         * @return {Y.Promise} promised response --> resolve(response, options) OR reject(reason).
        **/
        submitPromise: function(options) {
            _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "submitPromise", 457);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 458);
var instance = this,
                updateMode = instance.get('updateMode');

            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 461);
instance._needAutoSaved = false;
            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 462);
if (updateMode!==3) {
                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 463);
instance._editFieldsToModel();
            }
            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 465);
return instance.host.submitPromise(options);
        },

        /**
         * Renderes a copy of all Model's attributes.
         * Should you omit 'configAttrs' then the renderer will try to find out the types automaticly.
         *
         * @method toJSON
         * @param configAttrs {Object} Every property of the host object/model can be defined as a property of configAttrs as well.
         * The value should also be an object: the config of the property that is passed to the ITSAFormElement.
         * @param configAttrs.hostProperty1 {Object} config of hostProperty1 (as example, you should use a real property here)
         * @param [configAttrs.hostProperty2] {Object} config of hostProperty2 (as example, you should use a real property here)
         * @param [configAttrs.hostProperty3] {Object} config of hostProperty3 (as example, you should use a real property here)
         * @return {Object} Copy of the host's objects or model's attributes, rendered as form-elements.
         * The rendered String should be added to the DOM yourself.
         * @since 0.1
         */
        toJSON : function(configAttrs) {
            _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "toJSON", 482);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 483);
var instance = this,
                host = instance.host,
                allproperties, useConfig, nodeId, mergedConfigAttrs;

            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 487);
if (configAttrs) {
                // we NEED to use clone() and NOT merge()
                // In case of more simultanious instances, they must not have the same source or they would interfere
                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 490);
mergedConfigAttrs = Y.clone(configAttrs);
                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 491);
allproperties = Y.merge(host.getAttrs());
                // now modify all the property-values into formelements
                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 493);
YObject.each(
                    allproperties,
                    function(value, key, object) {
                        _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "(anonymous 3)", 495);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 496);
useConfig = Y.merge(DEFAULTCONFIG, (mergedConfigAttrs && mergedConfigAttrs[key]) || {}, {name: key, value: value});
                        _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 497);
if (mergedConfigAttrs[key]) {
                            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 498);
mergedConfigAttrs[key].name = key;
                            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 499);
mergedConfigAttrs[key].value = value;
                            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 500);
if (!instance._elementIds[key]) {
                                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 501);
instance._elementIds[key] = Y.guid();
                            }
                            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 503);
nodeId = instance._elementIds[key];
                            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 504);
object[key] = instance._itsaformelement.render(useConfig, nodeId);
                        }
                        else {
                            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 507);
delete object[key];
                        }
                    }
                );
                // Next, we need to look for buttons tht are not part of the attributes
                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 512);
YObject.each(
                    mergedConfigAttrs,
                    function(config, key) {
                        _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "(anonymous 4)", 514);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 515);
var type = config.type;
                        _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 516);
if ((type==='button') || (type==='reset') || (type==='submit') || (type==='save') || (type==='destroy')) {
                            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 517);
useConfig = Y.merge(DEFAULTCONFIG, config, {name: key, value: config.buttonText || UNDEFINED_VALUE});
                            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 518);
if (!instance._elementIds[key]) {
                                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 519);
instance._elementIds[key] = Y.guid();
                            }
                            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 521);
nodeId = instance._elementIds[key];
                            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 522);
allproperties[key] = instance._itsaformelement.render(useConfig, nodeId);
                        }
                    }
                );
                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 526);
instance._configAttrs = mergedConfigAttrs;
            }
            else {
                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 529);
allproperties = '';
                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 530);
instance._configAttrs = {};
            }
            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 532);
return allproperties;
        },

        /**
         * Cleans up bindings and removes plugin
         * @method destructor
         * @protected
         * @since 0.1
        */
        destructor : function() {
            _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "destructor", 541);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 542);
var instance = this;
            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 543);
if (instance._autoSaveTimer) {
                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 544);
instance._autoSaveTimer.cancel();
            }
            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 546);
instance._clearEventhandlers();
            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 547);
instance._itsaformelement.destroy();
            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 548);
instance._configAttrs = {};
            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 549);
instance._elementIds = {};
            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 550);
instance.removeTarget(instance.host);
        },

        //===============================================================================================
        // private methods
        //===============================================================================================

        /**
         * Autostorefunction that is called by timerinterval 'autosaveInterval' in case 'updateMode'===2
         * @method _autoStore
         * @protected
        */
        _autoStore : function() {
            _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "_autoStore", 562);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 563);
var instance = this;

            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 565);
if (instance._needAutoSaved) {
                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 566);
instance._editFieldsToModel();
                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 567);
instance._needAutoSaved = false;
            }
        },

        /**
         * Setting up eventlisteners
         *
         * @method _bindUI
         * @private
         * @since 0.1
         *
        */
        _bindUI : function() {
            _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "_bindUI", 579);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 580);
var instance = this,
                eventhandlers = instance._eventhandlers;

            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 583);
eventhandlers.push(
                Y.on(
                    EVT_DATETIMEPICKER_CLICK,
                    function(e) {
                        _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "(anonymous 5)", 586);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 587);
var button = e.buttonNode,
                            span = button.one('span'),
                            valuespan = button.previous('span'),
                            picker = Y.ItsaDateTimePicker,
                            propertyName = e.property,
                            propertyconfig = instance._configAttrs[propertyName],
                            value = instance.host.get(propertyName),
                            widgetconfig = (propertyconfig && propertyconfig.widgetConfig) || {},
                            promise;
                        _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 596);
if (e.elementId===instance._elementIds[propertyName]) {
                            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 597);
if (span.hasClass(ITSAFORMELEMENT_DATE_CLASS)) {
                                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 598);
promise = Y.rbind(picker.getDate, picker);
                            }
                            else {_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 600);
if (span.hasClass(ITSAFORMELEMENT_TIME_CLASS)) {
                                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 601);
promise = Y.rbind(picker.getTime, picker);
                            }
                            else {_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 603);
if (span.hasClass(ITSAFORMELEMENT_DATETIME_CLASS)) {
                                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 604);
promise = Y.rbind(picker.getDateTime, picker);
                            }}}
                            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 606);
widgetconfig.alignToNode = button;
                            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 607);
promise(value, widgetconfig).then(
                                function(newdate) {
                                    _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "(anonymous 6)", 608);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 609);
var newRenderedElement;
                                    _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 610);
instance._storeProperty(valuespan, propertyName, newdate, true);
                                    // because _setProperty setts the attribute with {fromEditModel: true},
                                    // the view does not re-render. We change the fieldvalue ourselves
                                    // first ask for ITSAFormElement how the render will look like
                                    // then axtract the value from within
                                    _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 615);
newRenderedElement = instance.getElement(propertyName, propertyconfig, propertyconfig.value);
                                    _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 616);
valuespan.setHTML(instance._getDateTimeValueFromRender(newRenderedElement));
                                    _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 617);
button.focus();
                                },
                                function() {
                                    // be carefull: button might not exist anymore, when the view is rerendered and making the promise to be rejected!
                                    _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "(anonymous 7)", 619);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 621);
if (button) {
                                        _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 622);
button.focus();
                                    }
                                }
                            );
                        }
                    }
                )
            );
            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 630);
eventhandlers.push(
                Y.on(
                    [EVT_INTERNAL+EVT_RESET_CLICK, EVT_INTERNAL+EVT_SUBMIT_CLICK, EVT_INTERNAL+EVT_SAVE_CLICK, EVT_INTERNAL+EVT_BUTTON_CLICK,
                                                                              EVT_INTERNAL+EVT_ADD_CLICK, EVT_INTERNAL+EVT_DESTROY_CLICK],
                    function(e) {
                        _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "(anonymous 8)", 634);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 635);
if ((e.elementId===instance._elementIds[e.property])) {
                            // stop the original event to prevent double events
                            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 637);
e.halt();
                            // make the host fire the event
                            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 639);
var payload = {type: e.type};
                            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 640);
Y.rbind(instance._fireModelEvent, instance, e.type, payload)();
                        }
                    }
                )
            );
            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 645);
eventhandlers.push(
                Y.on(
                    EVT_FOCUS_NEXT,
                    function(e) {
                        _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "(anonymous 9)", 648);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 649);
if (e.elementId===instance._elementIds[e.property]) {
                            // stop the original event to prevent double events
                            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 651);
e.halt();
                            // make the host fire the event
                            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 653);
instance.fire(EVT_FOCUS_NEXT, e);
                        }
                    }
                )
            );
            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 658);
eventhandlers.push(
                Y.on(
                    EVT_VALUE_CHANGE,
                    function(e) {
                        _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "(anonymous 10)", 661);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 662);
if (e.elementId===instance._elementIds[e.property]) {
                            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 663);
instance._storeProperty(e.inputNode, e.property, e.inputNode.get('value'));
                        }
                    }
                )
            );
            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 668);
eventhandlers.push(
                Y.on(
                    EVT_INPUT_CHANGE,
                    function(e) {
                        _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "(anonymous 11)", 671);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 672);
if (e.elementId===instance._elementIds[e.property]) {
                            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 673);
instance._storeProperty(e.inputNode, e.property, e.inputNode.get('value'), true);
                        }
                    }
                )
            );
            //============================================================================================
            // if the model gets changed and it wasn't this module, than fire an event.
            // So the developer can use this to listen for these changes and react on them
            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 681);
instance.host.on(
                'model:change',
                function() {
                    _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "(anonymous 12)", 683);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 684);
Y.fire(EVT_DIALOG_WARN, {message: MESSAGE_WARN_MODELCHANGED});
                }
            );
            //============================================================================================


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
            _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "_clearEventhandlers", 700);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 701);
YArray.each(
                this._eventhandlers,
                function(item){
                    _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "(anonymous 13)", 703);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 704);
item.detach();
                }
            );
        },

        /**
         * The default destroyFunction of the 'destroyclick'-event. Will call the server with all Model's properties.
         * @method _defPluginDestroyFn
         * @protected
        */
        _defPluginDestroyFn : function() {
            _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "_defPluginDestroyFn", 714);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 715);
var instance = this;
            //    syncOptions = instance.get('syncOptions'),
            //    options;

            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 719);
instance._needAutoSaved = false;
            // I would love to have the next method here: because the could be prevented this way (as part of defaultFunc)
            // However, within the defaultFunc, it seems we cannot augment the eventFacade... ); --> https://github.com/yui/yui3/issues/685
            // That's why the functions are transported to the method '_fireModelEvent'

            // options = Y.merge({remove: true}, syncOptions.destroy || {}});
            // e.promise = instance.host.destroyPromise(options);
        },

        /**
         * The default addFunction of the 'addclick'-event. Will call the server with all Model's properties.
         * @method _defPluginAddFn
         * @protected
        */
        _defPluginAddFn : function() {
            _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "_defPluginAddFn", 733);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 734);
var instance = this;

            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 736);
instance._needAutoSaved = false;
            // no sync('create') --> leave this to the view
        },

        /**
         * The default submitFunction of the 'resetclick'-event. Will call the server with all Model's properties.
         * @method _defPluginResetFn
         * @protected
        */
        _defPluginResetFn : function() {
            _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "_defPluginResetFn", 745);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 746);
var instance = this;

            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 748);
instance._needAutoSaved = false;
            // no sync('reset') --> leave this to the view
        },

        /**
         * The default submitFunction of the 'submitclick'-event. Will call the server with all Model's properties.
         * @method _defPluginSubmitFn
         * @protected
        */
        _defPluginSubmitFn : function() {
            // Within the defaultFunc, it seems we cannot augment the eventFacade... );
            _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "_defPluginSubmitFn", 757);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 759);
this._defStoreFn('submit');
        },

        /**
         * Saves all editable properties to the Model and calls the models synclayer.
         * @method _defSaveFn
         * @protected
        */
        _defPluginSaveFn : function() {
            // Within the defaultFunc, it seems we cannot augment the eventFacade... );

            _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "_defPluginSaveFn", 767);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 770);
this._defStoreFn('save');
        },

        /**
         * Function that is used by save and _defPluginSubmitFn to store the modelvalues.
         * @method _defStoreFn
         * @param mode {String} type of update
         * @protected
        */
        _defStoreFn : function() {
            _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "_defStoreFn", 779);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 780);
var instance = this,
                updateMode = instance.get('updateMode');
//                syncOptions, options;

            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 784);
instance._needAutoSaved = false;
            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 785);
if (updateMode!==3) {
                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 786);
instance._editFieldsToModel();
            }
            // I would love to have the next methods here: because the could be prevented this way (as part of defaultFunc)
            // However, within the defaultFunc, it seems we cannot augment the eventFacade... ); --> https://github.com/yui/yui3/issues/685
            // That's why the functions are transported to the method '_fireModelEvent'
/*
            if (mode === 'save') {
                syncOptions = instance.get('syncOptions');
                options = syncOptions[mode] || {};
                e.promise = instance.host.savePromise(options);
            }
            else if (mode === 'submit') {
                syncOptions = instance.get('syncOptions');
                options = syncOptions[mode] || {};
                e.promise = instance.host.submitPromise(options);
            }
*/
        },

        /**
         * Transports the formelement-values to the model or object
         *
         * @method _editFieldsToModel
         * @private
         * @since 0.1
         *
        */
        _editFieldsToModel: function() {
            _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "_editFieldsToModel", 813);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 814);
var instance = this,
                configAttrs = instance._configAttrs,
                newModelAttrs = {};

            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 818);
YObject.each(
                configAttrs,
                function(propertyvalue, property) {
                    _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "(anonymous 14)", 820);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 821);
newModelAttrs[property] = propertyvalue.value;
                }
            );
            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 824);
instance._setProperty(null, newModelAttrs);
        },

        /**
         * Lets the host-model fire an model:eventName event
         *
         * @method _fireModelEvent
         * @param eventName {String} event to be fired (model:eventName)
         * @param eventPayLoad {eventTarget} payload
         * @private
         * @since 0.1
         *
        */
        _fireModelEvent: function(eventName, eventPayload) {
            _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "_fireModelEvent", 837);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 838);
var instance = this,
                host = instance.host,
                ModelClass, modelAttrs, currentConfig, newModel, syncOptions, options;

            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 842);
eventPayload.target = host;
            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 843);
if (eventName === EVT_ADD_CLICK) {
                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 844);
ModelClass = instance.get('newModelClass');
                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 845);
modelAttrs = Y.clone(instance.get('newModelDefinition'));
                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 846);
newModel = new ModelClass(modelAttrs);
                // now reattach the synclayer
                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 848);
newModel.sync = host.sync;
                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 849);
currentConfig = Y.clone(instance.getAttrs());
                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 850);
newModel.plug(Y.Plugin.ITSAEditModel, currentConfig);
                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 851);
eventPayload.newModel = newModel;
            }
            // I would love to have the next methods inside _defStoreFn: because the could be prevented this way (as part of defaultFunc)
            // However, within the defaultFunc, it seems we cannot augment the eventFacade... ); --> https://github.com/yui/yui3/issues/685
            // That's why the functions are transported to here
            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 856);
if (eventName === EVT_SAVE_CLICK) {
                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 857);
syncOptions = instance.get('syncOptions');
                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 858);
options = syncOptions.save || {};
                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 859);
eventPayload.promise = instance.host.savePromise(options);
            }
            else {_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 861);
if (eventName === EVT_SUBMIT_CLICK) {
                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 862);
syncOptions = instance.get('syncOptions');
                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 863);
options = syncOptions.submit || {};
                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 864);
eventPayload.promise = instance.host.submitPromise(options);
            }
            else {_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 866);
if (eventName === EVT_DESTROY_CLICK) {
                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 867);
syncOptions = instance.get('syncOptions');
                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 868);
options = Y.merge({remove: true}, syncOptions.destroy || {});
                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 869);
eventPayload.promise = instance.host.destroyPromise(options);
            }}}
            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 871);
host.fire(eventName, eventPayload);
        },

        /**
         * Extracts the date-time value from the rendered Date-time String.
         *
         * @method _getDateTimeValueFromRender
         * @param renderedElement {String} The rendered elementstring from which the info needs to be extracted
         * @return {Any} Attribute value, or `undefined` if the attribute doesn't exist, or 'null' if no model is passed.
         * @private
         * @since 0.1
         *
        */
        _getDateTimeValueFromRender : function(renderedElement) {
            _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "_getDateTimeValueFromRender", 884);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 885);
var regexp = /<span[^>]+>([^<]*)</;

            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 887);
return regexp.test(renderedElement) ? RegExp.$1 : '';
        },

        /**
         * Check if the property-type is a date, time or datetime type.
         *
         * @method _isDateTimeType
         * @param type {String} propertytype to check
         * @return {Boolean} whether the type is a date-time type
         * @private
         * @since 0.1
         *
        */
        _isDateTimeType : function(type) {
            _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "_isDateTimeType", 900);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 901);
return (type==='date') || (type==='time') || (type==='datetime');
        },

        /**
         * Sets the value of a property (or in case of Model, the attribute). Regardless which type the host is.
         * In case
         *
         * @method _setProperty
         * @param [propertyName] {String} Propertyname or -in case or Model- attribute-name. If set to 'null' then all attributes are set.
                  In tha case 'value' should be a hash containing properties and values, which can be passed through to 'Model.setAttrs()'
         * @param value {Any} The new value to be set.
         * @private
         * @since 0.1
         *
        */
        _setProperty: function(propertyName, value) {
            _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "_setProperty", 916);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 917);
var instance = this,
                host = instance.host,
                options = {fromEditModel: true}, // set Attribute with option: '{fromEditModel: true}' --> now the view knows it must not re-render.
                propertyconfig;

            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 922);
propertyconfig = instance._configAttrs[propertyName];
            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 923);
if (propertyconfig) {
                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 924);
propertyconfig.value = value;
            }
            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 926);
if (propertyName) {
                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 927);
host.set(propertyName, value, options);
            }
            else {
                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 930);
host.setAttrs(value, options);
            }
        },

        /**
         * Saves the value of a property (or in case of Model, the attribute). Regardless which type the host is.
         * It will <store> the value. It might be set to the Model, but that deppends on the value of 'updateMode'.
         * In order to do that it might call _setProperty.
         *
         * @method _storeProperty
         * @param node {Y.Node} node that holds the formelement that was changed.
         * @param propertyName {String} Propertyname or -in case or Model- attribute-name.
         * @param value {Any} The new value to be set.
         * @param finished {Boolean} Whether the final value is reached. Some types (like text) can store before they reach
                  their final value.
         * @private
         * @since 0.1
         *
        */
        _storeProperty: function(node, propertyName, value, finished) {
            _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "_storeProperty", 949);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 950);
var instance = this,
                updateMode = instance.get('updateMode'),
                isObject = Lang.isObject(value),
                payload = {
                    node: node,
                    property: propertyName,
                    newVal: (isObject ? Y.merge(value) : value),
                    finished: finished
                },
                propertyconfig, setProperty, attributevalue;

            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 961);
propertyconfig = instance._configAttrs[propertyName];
            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 962);
if (propertyconfig) {
                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 963);
payload.prevValue = isObject ? Y.merge(propertyconfig.value) : propertyconfig.value;
                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 964);
propertyconfig.value = value;
            }
            else {
                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 967);
attributevalue = instance.host.get(propertyName);
                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 968);
payload.prevValue = isObject ? Y.merge(attributevalue) : attributevalue;
            }
            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 970);
setProperty = ((updateMode===3) || ((updateMode===1) && finished));
            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 971);
if (setProperty) {
                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 972);
instance._setProperty(propertyName, value);
            }
            else {
                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 975);
node.addClass(ITSAFORMELEMENT_CHANGED_CLASS);
                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 976);
if (updateMode===2) {
                    _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 977);
instance._needAutoSaved = true;
                }
            }
            /**
              * Event fired when a property changed during editing. This is regardless of whether the property is changed.
              * Using these events will help you -for instance- with hiding formelements based on property-values.<br />
              * The evennames consist of the propertyname+'Change'.
              * @event propertynameChange
              * @param e {EventFacade} Event Facade including:
              * @param e.node {Y.Node} The Node that was changed
              * @param e.property {String} The Model's attribute-name that was changed.
              * @param e.newVal {Any} The new value
              * @param e.newVal {Any} The previous value
              * @param e.finished {Boolean} Whether the attribute finished changing. Some attributes (input, textarea's) can fire
              *        this event during editing while still busy (not blurring): they have finished set to false.
            **/
            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 993);
instance.fire(propertyName+'Change', payload);
        }

    }, {
        NS : 'itsaeditmodel',
        ATTRS : {
            /**
             * Sets the interval to do an 'autosave' during editing input/textfields.
             * Only applies in situations where the attribute 'updateMode'===2. Value should be in <b>seconds</b> between 1-3600.
             * @attribute autosaveInterval
             * @type Int
             * @default 30
             * @since 0.1
            */
            autosaveInterval : {
                value: 30,
                validator: function(val) {
                    _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "validator", 1009);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1010);
return ((typeof val === 'number') && (val>0) && (val<=3600));
                },
                setter: function(val) {
                    _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "setter", 1012);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1013);
var instance = this,
                        updateMode = instance.get('updateMode');
                    _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1015);
if (instance._autoSaveTimer) {
                        _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1016);
instance._autoSaveTimer.cancel();
                    }
                    _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1018);
if (updateMode===2) {
                        _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1019);
instance._autoSaveTimer = Y.later(
                            1000*val,
                            instance,
                            instance._autoStore,
                            null,
                            true
                        );
                    }
                }
            },
            /**
             * Every property of the object/model you want to edit, should be defined as a property of configAttrs.
             * Every property-definition is an object: the config of the property that is passed to the ITSAFormElement.<br />
             * Example: <br />
             * editmodelConfigAttrs.property1 = {Object} config of property1 (as example, you should use a real property here)<br />
             * editmodelConfigAttrs.property2 = {Object} config of property2 (as example, you should use a real property here)<br />
             * editmodelConfigAttrs.property3 = {Object} config of property3 (as example, you should use a real property here)<br />
             *
             * @attribute editmodelConfigAttrs
             * @type {Object}
             * @default {}
             * @since 0.1
             */
            editmodelConfigAttrs: {
                value: {},
                validator: function(v){
                    _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "validator", 1044);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1045);
return Lang.isObject(v);
                }
            },
            /**
             * Object with the properties: <b>destroy</b>, <b>save</b> and <b>submit</b>. For every property you might want to
             * specify the options-object that will be passed through to the sync- or destroy-method. The destroymethod will
             * <i>always</i> be called with 'remove=true', in order to call the sync-method.
             * @attribute syncOptions
             * @type Object
             * @default {}
             * @since 0.1
            */
            syncOptions : {
                value: {},
                validator: function(val) {
                    _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "validator", 1059);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1060);
return Lang.isObject(val);
                }
            },
            /**
             * Specifies how <b>new models</b> will look like. When creating new Models, they get cloned from this object.
             * @attribute newModelDefinition
             * @type Object
             * @default {}
             * @since 0.1
            */
            newModelDefinition : {
                value: {},
                validator: function(val) {
                    _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "validator", 1072);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1073);
return (Lang.isObject(val));
                }
            },
            /**
             * Specifies the Class of new created Models (that is, when a model:addclick event occurs).
             * @attribute newModelClass
             * @type Model
             * @default Y.Model
             * @since 0.1
            */
            newModelClass : {
                value: Y.Model
            },
            /**
             * Template of how to render the model in the view. You can <b>only use Y.Lang.sub templates</b> where the attribute/properties
             * should be specified between brackets. Example: 'Name: {firstname} {lastname}'.<br />
             * Or you can use Y.Template.Micro: 'Name: <%= data.firstname + " " + data.lastename %>'
             * @attribute template
             * @type String
             * @default null
             * @since 0.1
            */
            template : {
                value: null,
                validator: function(val) {
                    _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "validator", 1097);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1098);
return (typeof val==='string');
                }
            },
            /**
             * When to update the edited value to the Model. You can use 4 states:<br /><br />
             * 0 = only on Model.save <i>(or when dave-button is pressed)</i><br />
             * 1 = after the attribute finished updating <i>in case of textfields: when blurring</i><br />
             * 2 = autosave, based on the interval defined with attribute 'autosaveInterval'<br />
             * 3 = life, immediate updates <i>in case of textfields: after every valueChange</i><br /><br />
             * @attribute updateMode
             * @type Int
             * @default 0
             * @since 0.1
            */
            updateMode : {
                value: 0,
                lazyAdd: false, // in case of value
                validator: function(val) {
                    _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "validator", 1115);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1116);
return ((typeof val === 'number') && (val>=0) && (val<=3));
                },
                setter: function(val) {
                    _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "setter", 1118);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1119);
var instance = this,
                        autosaveInterval = instance.get('autosaveInterval');
                    _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1121);
if (val) {
                        _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1122);
instance._autoSaveTimer = Y.later(
                            1000*autosaveInterval,
                            instance,
                            instance._autoStore,
                            null,
                            true
                        );
                    }
                    else {
                        _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1131);
if (instance._autoSaveTimer) {
                            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1132);
instance._autoSaveTimer.cancel();
                        }
                    }
                }
            }
        }
    }
);

//===================================================================
// adding plug and unplug features to Y.Model:
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1143);
Y.augment(Y.Model, Y.Plugin.Host);

// now we need to set global eventhandlers, but only once.
// unfortunatly they need to keep in memory, even when unplugged.
// however: they only get there once, so no memoryleaks
  _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1148);
body.delegate(
      'click',
      function(e) {
          _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "(anonymous 15)", 1150);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1151);
var button = e.currentTarget,
              span = button.previous('span');
          // stop the original event to prevent double events
          _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1154);
e.halt();
          // set the focus manually. This will cause the View to be focussed as well --> now the focusmanager works for this View-instance
          _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1156);
button.focus();
          _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1157);
Y.use('gallery-itsadatetimepicker', function(Y) {
              _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "(anonymous 16)", 1157);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1158);
e.elementId = span.get('id');
              _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1159);
e.type = EVT_DATETIMEPICKER_CLICK;
              _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1160);
e.buttonNode = button;
              _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1161);
e.property = GET_PROPERTY_FROM_CLASS(span.getAttribute('class'));
              _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1162);
Y.fire(EVT_DATETIMEPICKER_CLICK, e);
          });
      },
      '.'+ITSABUTTON_DATETIME_CLASS
  );
  _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1167);
body.delegate(
      'valuechange',
      function(e) {
          _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "(anonymous 17)", 1169);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1170);
var inputnode = e.currentTarget;
          // seems that e.halt() cannot be called here ???
          _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1172);
e.elementId = inputnode.get('id');
          _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1173);
e.inputNode = inputnode;
          _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1174);
e.property = GET_PROPERTY_FROM_CLASS(inputnode.getAttribute('class'));
          _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1175);
e.type = EVT_VALUE_CHANGE;
          _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1176);
Y.fire(EVT_VALUE_CHANGE, e);
      },
      '.'+ITSAFORMELEMENT_LIFECHANGE_CLASS
  );
  _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1180);
body.delegate(
      'change',
      function(e) {
          _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "(anonymous 18)", 1182);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1183);
var inputnode = e.currentTarget;
          // seems that e.halt() cannot be called here ???
          _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1185);
e.elementId = inputnode.get('id');
          _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1186);
e.inputNode = inputnode;
          _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1187);
e.property = GET_PROPERTY_FROM_CLASS(inputnode.getAttribute('class'));
          _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1188);
e.type = EVT_INPUT_CHANGE;
          _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1189);
Y.fire(EVT_INPUT_CHANGE, e);
      },
      '.'+ITSAFORMELEMENT_LIFECHANGE_CLASS
  );
  _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1193);
body.delegate(
      'keypress',
      function(e) {
          _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "(anonymous 19)", 1195);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1196);
if (e.keyCode===13) {
              // stop the original event to prevent double events
              _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1198);
e.halt();
              _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1199);
var inputnode = e.currentTarget;
              // seems that e.halt() cannot be called here ???
              _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1201);
e.elementId = inputnode.get('id');
              _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1202);
e.inputNode = inputnode;
              _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1203);
e.property = GET_PROPERTY_FROM_CLASS(inputnode.getAttribute('class'));
              _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1204);
e.type = EVT_FOCUS_NEXT;
              _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1205);
Y.fire(EVT_FOCUS_NEXT, e);
          }
      },
      '.'+ITSAFORMELEMENT_ENTERNEXTFIELD_CLASS
  );
  _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1210);
body.delegate(
      'click',
      function(e) {
          _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "(anonymous 20)", 1212);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1213);
var button = e.currentTarget,
              classNames = button.getAttribute('class');
          // stop the original event to prevent double events
          _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1216);
e.halt();
          // set the focus manually. This will cause the View to be focussed as well --> now the focusmanager works for this View-instance
          _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1218);
button.focus();
          _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1219);
e.elementId = button.get('id');
          _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1220);
e.buttonNode = button;
          _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1221);
e.property = GET_PROPERTY_FROM_CLASS(button.getAttribute('class'));
          _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1222);
if (classNames.indexOf(SUBMIT_BUTTON_CLASS) !== -1) {
              _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1223);
e.type = EVT_SUBMIT_CLICK;
              _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1224);
Y.fire(EVT_INTERNAL+EVT_SUBMIT_CLICK, e);
          }
          else {_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1226);
if (classNames.indexOf(RESET_BUTTON_CLASS) !== -1) {
              _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1227);
e.type = EVT_RESET_CLICK;
              _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1228);
Y.fire(EVT_INTERNAL+EVT_RESET_CLICK, e);
          }
          else {_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1230);
if (classNames.indexOf(SAVE_BUTTON_CLASS) !== -1) {
              _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1231);
e.type = EVT_SAVE_CLICK;
              _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1232);
Y.fire(EVT_INTERNAL+EVT_SAVE_CLICK, e);
          }
          else {_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1234);
if (classNames.indexOf(DESTROY_BUTTON_CLASS) !== -1) {
              _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1235);
e.type = EVT_DESTROY_CLICK;
              _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1236);
Y.fire(EVT_INTERNAL+EVT_DESTROY_CLICK, e);
          }
          else {_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1238);
if (classNames.indexOf(ADD_BUTTON_CLASS) !== -1) {
              _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1239);
e.type = EVT_ADD_CLICK;
              _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1240);
Y.fire(EVT_INTERNAL+EVT_ADD_CLICK, e);
          }
          else {_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1242);
if (classNames.indexOf(BUTTON_BUTTON_CLASS) !== -1) {
              // check this one as the last one: the others ALL have this class as well
              _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1244);
e.type = EVT_BUTTON_CLICK;
              _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1245);
Y.fire(EVT_INTERNAL+EVT_BUTTON_CLICK, e);
          }}}}}}
      },
      '.'+ITSAFORMELEMENT_BUTTONTYPE_CLASS
  );

}, '@VERSION@', {
    "requires": [
        "yui-base",
        "base-build",
        "node-base",
        "node-event-delegate",
        "plugin",
        "pluginhost-base",
        "lazy-model-list",
        "event-valuechange",
        "gallery-itsamodelsyncpromise",
        "gallery-itsaformelement"
    ]
});
