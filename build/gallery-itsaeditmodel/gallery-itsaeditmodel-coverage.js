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
_yuitest_coverage["build/gallery-itsaeditmodel/gallery-itsaeditmodel.js"].code=["YUI.add('gallery-itsaeditmodel', function (Y, NAME) {","","'use strict';","","/**"," * ITSAEditModel Plugin"," *"," *"," * Plugin for Y.Model that extends Y.Model-instances into having editable properties."," * After pluged-in, Each property can be rendered into a form-element by using: <i>yourModel.itsaeditmodel.formelement()</i>"," * You can also retreive a copy of the model's attributes with: <i>yourModel.itsaeditmodel.toJSON()</i>"," *"," * Use the attribute 'template' to specify how the rendering will look like."," *"," *"," * @module gallery-itsaeditmodel"," * @class ITSAEditModel"," * @extends Plugin.Base"," * @constructor"," * @since 0.1"," *"," * <i>Copyright (c) 2013 Marco Asbreuk - http://itsasbreuk.nl</i>"," * YUI BSD License - http://developer.yahoo.com/yui/license.html"," *","*/","","var body = Y.one('body'),","    Lang = Y.Lang,","    YArray = Y.Array,","    YObject = Y.Object,","    UNDEFINED_VALUE = 'undefined value',","    MESSAGE_WARN_MODELCHANGED = 'The data you are editing has been changed from outside the form. '+","                                'If you save your data, then these former changed will be overridden.',","    EVT_DATETIMEPICKER_CLICK = 'datetimepickerclick',","    ITSABUTTON_DATETIME_CLASS = 'itsa-button-datetime',","    ITSAFORMELEMENT_DATE_CLASS = 'itsa-datetimepicker-icondate',","    ITSAFORMELEMENT_TIME_CLASS = 'itsa-datetimepicker-icontime',","    ITSAFORMELEMENT_DATETIME_CLASS = 'itsa-datetimepicker-icondatetime',","    FORMELEMENT_CLASS = 'yui3-itsaformelement',","    ITSAFORMELEMENT_BUTTONTYPE_CLASS = FORMELEMENT_CLASS + '-inputbutton',","    ITSAFORMELEMENT_LIFECHANGE_CLASS = FORMELEMENT_CLASS + '-lifechange',","    ITSAFORMELEMENT_CHANGED_CLASS = FORMELEMENT_CLASS + '-changed',","    ITSAFORMELEMENT_ENTERNEXTFIELD_CLASS = FORMELEMENT_CLASS + '-enternextfield',","    BUTTON_BUTTON_CLASS = FORMELEMENT_CLASS + '-button',","    SUBMIT_BUTTON_CLASS = FORMELEMENT_CLASS + '-submit',","    RESET_BUTTON_CLASS = FORMELEMENT_CLASS + '-reset',","    SAVE_BUTTON_CLASS = FORMELEMENT_CLASS + '-save',","    DESTROY_BUTTON_CLASS = FORMELEMENT_CLASS + '-destroy',","    DEFAULTCONFIG = {","        name : 'undefined-name',","        type : '',","        value : '',","        keyValidation : null,","        validation : null,","        validationMessage : '',","        autoCorrection : null,","        className : null,","        dateFormat : null,","        initialFocus : false,","        selectOnFocus : false,","        widgetConfig : {}","    },","    GET_PROPERTY_FROM_CLASS = function(className) {","        var regexp = /yui3-itsaformelement-property-(\\w+)/;","","        return regexp.test(className) ? RegExp.$1 : null;","    },","    EVT_INTERNAL = 'internal',","    // next four events are declared within the initialiser:","    EVT_SUBMIT_CLICK = 'submitclick',","    EVT_SAVE_CLICK = 'saveclick',","    EVT_RESET_CLICK = 'resetclick',","    EVT_DESTROY_CLICK = 'destroyclick',","","","","   /**","     * Fired to be caught by ItsaDialog. This event occurs when there is a warning (for example Model changed outside the editview).","     * @event focusnext","     * @param e {EventFacade} Event Facade including:","     * @param e.message {String} The warningmessage.","     * @since 0.1","    **/","    EVT_FOCUS_NEXT = 'focusnext',","   /**","     * Fired to be caught by ItsaDialog. This event occurs when there is a warning (for example Model changed outside the editview).","     * @event dialog:warn","     * @param e {EventFacade} Event Facade including:","     * @param e.message {String} The warningmessage.","     * @since 0.1","    **/","    EVT_DIALOG_WARN = 'dialog:warn',","    /**","      * Event fired after an input-elements value is changed.","      * @event inputchange","      * @param e {EventFacade} Event Facade including:","      * @param e.inputNode {Y.Node} The Input-Node that was clicked","      * @param e.elementId {String} Id of the Node that chancged value.","      * @param e.property {String} The property-name of the Object (or the Model's attribute-name)","    **/","    EVT_INPUT_CHANGE = 'inputchange',","    /**","      * Event fired when an input-elements value is changed (life, without blurring): valuechange.","      * @event inputvaluechange","      * @param e {EventFacade} Event Facade including:","      * @param e.inputNode {Y.Node} The Input-Node that was clicked","      * @param e.elementId {String} Id of the Node that chancged value.","      * @param e.property {String} The property-name of the Object (or the Model's attribute-name)","    **/","    EVT_VALUE_CHANGE = 'inputvaluechange',","    /**","      * Event fired when a normal button (elementtype) is clicked.","      * @event inputbuttonclick","      * @param e {EventFacade} Event Facade including:","      * @param e.buttonNode {Y.Node} The Button-Node that was clicked","      * @param e.property {String} The property-name of the Object (or the Model's attribute-name)","      * @param [e.model] {Y.Model} This modelinstance.","    **/","    EVT_BUTTON_CLICK = 'inputbuttonclick',","   /**","     * Fired after the plugin is pluggedin and ready to be referenced by the host. This is LATER than after the 'init'-event,","     * because the latter will be fired before the namespace Model.itsaeditmodel exists.","     * @event pluggedin","     * @since 0.1","    **/","    EVT_PLUGGEDIN = 'pluggedin';","","Y.namespace('Plugin').ITSAEditModel = Y.Base.create('itsaeditmodel', Y.Plugin.Base, [], {","","        /**","         * Sets up the toolbar during initialisation. Calls render() as soon as the hosts-editorframe is ready","         *","         * @method initializer","         * @protected","         * @since 0.1","         */","        initializer : function() {","            var instance = this,","                host;","","           // -- Public Properties -------------------------------------------------","","           /**","            * The plugin's host, which should be a Model-instance (or descendent)","            * @property host","            * @default host-instance","            * @type Y.Model","            */","            instance.host = instance.get('host');","","           /**","            * Internal list that holds event-references","            * @property _eventhandlers","            * @default []","            * @private","            * @type Array","            */","            instance._eventhandlers = [];","","           /**","            * An instance of Y.ITSAFormElement that is used to generate the form-html of the elements.","            * @property _itsaformelement","            * @default null","            * @private","            * @type Y.ITSAFormElement-instance","            */","            instance._itsaformelement = null;","","           /**","            * internal backup of all property-configs","            * @property _configAttrs","            * @default {}","            * @private","            * @type Object","            */","            instance._configAttrs = {};","","           /**","            * internal backup of all rendered node-id's","            * @property _elementIds","            * @default {}","            * @private","            * @type Object","            */","            instance._elementIds = {};","","           /**","            * internal flag that tells whether automaicly saving needs to happen in case properties have changed","            * @property _needAutoSaved","            * @default false","            * @private","            * @type Boolean","            */","            instance._needAutoSaved = false;","","           /**","            * Internal reference to Y.later timerobject for autosaving","            * @property _autoSaveTimer","            * @default null","            * @private","            * @type timer-Object","            */","            instance._autoSaveTimer = null;","","           /**","            * Internal reference to Y.later timerobject that is used to fire a 'pluggedin'-event once 'itsaeditmodel' is available on the host.","            * @property _fireEventTimer","            * @default null","            * @private","            * @type timer-Object","            */","            instance._fireEventTimer = null;","","            host = instance.host;","            instance._itsaformelement = new Y.ITSAFormElement();","            /**","              * Event fired the submitbutton is clicked.","              * defaultFunction = calling then model's sync method with action=submit","              * @event submitclick","              * @param e {EventFacade} Event Facade including:","              * @param e.currentTarget {Y.Node} The Button-Node that was clicked","              * @param e.property {String} The property-name of the Object (or the Model's attribute-name)","              * @param [e.model] {Y.Model} This modelinstance.","            **/","            host.publish(","                EVT_SUBMIT_CLICK,","                {","                    defaultFn: Y.rbind(instance._defPluginSubmitFn, instance)","                }","            );","            /**","              * Event fired the resetbutton is clicked.","              * defaultFunction = calling then model's sync method with action=reset","              * @event resetclick","              * @param e {EventFacade} Event Facade including:","              * @param e.currentTarget {Y.Node} The Button-Node that was clicked","              * @param e.property {String} The property-name of the Object (or the Model's attribute-name)","              * @param [e.model] {Y.Model} This modelinstance.","            **/","            host.publish(","                EVT_RESET_CLICK,","                {","                    defaultFn: Y.rbind(instance._defPluginResetFn, instance)","                }","            );","            /**","              * Event fired the savebutton is clicked.","              * defaultFunction = calling then model's sync method with action=submit","              * @event saveclick","              * @param e {EventFacade} Event Facade including:","              * @param e.currentTarget {Y.Node} The Button-Node that was clicked","              * @param e.property {String} The property-name of the Object (or the Model's attribute-name)","              * @param [e.model] {Y.Model} This modelinstance.","            **/","            host.publish(","                EVT_SAVE_CLICK,","                {","                    defaultFn: Y.rbind(instance._defSaveFn, instance)","                }","            );","            /**","              * Event fired the destroybutton is clicked.","              * defaultFunction = calling then model's sync method with action=submit","              * @event destroyclick","              * @param e {EventFacade} Event Facade including:","              * @param e.currentTarget {Y.Node} The Button-Node that was clicked","              * @param e.property {String} The property-name of the Object (or the Model's attribute-name)","              * @param [e.model] {Y.Model} This modelinstance.","            **/","            host.publish(","                EVT_DESTROY_CLICK,","                {","                    // DO NOT use _defDestroyFn --> this is used by the model itself and would make _defDestroyFn of the model","                    // to be excecuted when the plugin is unplugged (!????)","                    defaultFn: Y.rbind(instance._defPluginDestroyFn, instance)","                }","            );","            instance._bindUI();","            instance.addTarget(host);","            // now a VERY tricky one...","            // We need to fire an event that tells the plugin is pluged in, but it seemed that when listening in the host,","            // host.itsaeditmodel will be read imediately after the event fired --> this seems to be BEFORE the event is registred!!!","            // So, we wait until the real registering is finished and THEN fire the event!","            instance._fireEventTimer = Y.later(","                50,","                instance,","                function() {","                    if (host.itsaeditmodel) {","                        instance._fireEventTimer.cancel();","                        instance.fire(EVT_PLUGGEDIN);","                    }","                },","                null,","                true","            );","        },","","        /**","         * Renderes a button to a formelement. You must specify 'config', so the renderer knows at least its type.","         *","         * @method getButton","         * @param buttonText {String} Text on the button.","         * @param config {String} config that is passed through to ItsaFormElement","         * @param config.type {String} Property-type --> see ItsaFormElement for the attribute 'type' for further information.","         * @param [config.className] {String} Additional className that is passed on the value, during rendering.","         * @param [config.initialFocus] {Boolean} Whether this element should have the initial focus.","         * @param [config.selectOnFocus] {Boolean} Whether this element should completely be selected when it gets focus.","         * @return {String} property (or attributes), rendered as a form-element. The rendered String should be added to the DOM yourself.","         * @since 0.1","         */","        getButton : function(buttonText, config) {","            var instance = this,","                value = buttonText,","                name = buttonText.replace(/ /g,'_'),","                useConfig = Y.merge(DEFAULTCONFIG, config || {}, {name: name, value: value}),","                type = useConfig.type,","                renderedFormElement, nodeId;","","            if (name && config && ((type==='button') || (type==='reset') || (type==='submit') || (type==='save') || (type==='destroy'))) {","                instance._configAttrs[name] = useConfig;","                if (!instance._elementIds[name]) {","                    instance._elementIds[name] = Y.guid();","                }","                nodeId = instance._elementIds[name];","                renderedFormElement = instance._itsaformelement.render(useConfig, nodeId);","                // after rendering we are sure definitely sure what type we have (even if not specified)","                if (instance._isDateTimeType(useConfig.type)) {","                    Y.use('gallery-itsadatetimepicker');","                }","            }","            else {","                renderedFormElement = '';","            }","            return renderedFormElement;","        },","","        /**","         * Renderes the property (Model's attribute) into a formelement. You must specify 'config', so the renderer knows at least its type.","         * Only call this method for existing attributes. If you need buttons, you can use 'getButton'.","         *","         * @method getElement","         * @param propertyName {String} the property (or attribute in case of Model) which should be rendered to a formelement","         * @param config {String} config that is passed through to ItsaFormElement","         * @param config.type {String} Property-type --> see ItsaFormElement for the attribute 'type' for further information.","         * @param [config.keyValidation] {Function} Validation during every keypress.","         * @param [config.validation] {Function} Validation after changing the value (onblur). The function should return true or false.","         * @param [config.validationMessage] {String} The message that will be returned on a validationerror.","         * @param [config.autoCorrection] {Function} If set, inputvalue will be replaced by the returnvalue of this function.","         * @param [config.className] {String} Additional className that is passed on the value, during rendering.","         * @param [config.dateFormat] {String} To format a Date-value.","         * @param [config.initialFocus] {Boolean} Whether this element should have the initial focus.","         * @param [config.selectOnFocus] {Boolean} Whether this element should completely be selected when it gets focus.","         * @param [config.widgetConfig] {Object} Config that will be added to the underlying widget (in case of Date/Time values).","         * @param [predefValue] {Any} In case you don't want the current value, but need a rendered String based on a different predefined value.","         * @return {String} property (or attributes), rendered as a form-element. The rendered String should be added to the DOM yourself.","         * @since 0.1","         */","        getElement : function(propertyName, config, predefValue) {","            var instance = this,","                value = predefValue || instance.host.get(propertyName),","                useConfig = Y.merge(DEFAULTCONFIG, config || {}, {name: propertyName, value: value}),","                renderedFormElement, nodeId;","","            if (propertyName && config) {","                instance._configAttrs[propertyName] = useConfig;","                if (!instance._elementIds[propertyName]) {","                    instance._elementIds[propertyName] = Y.guid();","                }","                nodeId = instance._elementIds[propertyName];","                renderedFormElement = instance._itsaformelement.render(useConfig, nodeId);","                // after rendering we are sure definitely sure what type we have (even if not specified)","                if (instance._isDateTimeType(useConfig.type)) {","                    Y.use('gallery-itsadatetimepicker');","                }","            }","            else {","                renderedFormElement = '';","            }","            return renderedFormElement;","        },","","       /**","        * Saves the editable field to the model and saves the model to the server.","        * It is actually the same method as savePromise (gallery-itsamodelsyncpromise), with","        * the exception that the editable fields are first synced to the model.","        *","        * This method delegates to the `sync()` method to perform the actual save","        * operation, which is an asynchronous action. Specify a _callback_ function to","        * be notified of success or failure.","        *","        * A successful save operation will fire a `save` event, while an unsuccessful","        * save operation will fire an `error` event with the `src` value \"save\".","        *","        * If the save operation succeeds and one or more of the attributes returned in","        * the server's response differ from this model's current attributes, a","        * `change` event will be fired.","        *","        * @method savePromise","        * @param {Object} [options] Options to be passed to `sync()` and to `set()`","        *     when setting synced attributes. It's up to the custom sync implementation","        *     to determine what options it supports or requires, if any.","        *  @param {Function} [callback] Called when the sync operation finishes.","        *     @param {Error|null} callback.err If an error occurred or validation","        *     failed, this parameter will contain the error. If the sync operation","        *     succeeded, _err_ will be `null`.","        *     @param {Any} callback.response The server's response. This value will","        *     be passed to the `parse()` method, which is expected to parse it and","        *     return an attribute hash.","        * @param {Int} [timeout] when no response within this timesetting, then the Promise will be rejected. When not specified,","        *              a timeout of 60000 (1 minute) is taken. We need this, because we need to be sure the sync-functions has a callback.","        *              without a callback the promise would never be resolved. This is now caught with the timeout.","        * @return {Y.Promise} promised response --> resolve(response, options) OR reject(reason).","        **/","        savePromise : function(options, timeout) {","            var instance = this,","                updateMode = instance.get('updateMode');","","            instance._needAutoSaved = false;","            if (updateMode!==3) {","                instance._editFieldsToModel();","            }","            return instance.host.savePromise(options, timeout);","        },","","       /**","         * Saves the editable field to the model and submits the model to the server.","         * It is actually the same method as submitPromise (gallery-itsamodelsyncpromise), with","         * the exception that the editable fields are first synced to the model.","         *","         * This method delegates to the `sync()` method to perform the actual submit","         * operation, which is Y.Promise. Read the Promise.then() and look for resolve(response, options) OR reject(reason).","         *","         * A successful submit-operation will also fire a `submit` event, while an unsuccessful","         * submit operation will fire an `error` event with the `src` value \"submit\".","         *","         * <b>CAUTION</b> The sync-method MUST call its callback-function to make the promised resolved. If there is no callback-function","         * then the promise will be rejected after a timeout. When timeout is not specified,","         * @method submitPromise","         * @param {Object} [options] Options to be passed to `sync()`. It's up to the custom sync","         *                 implementation to determine what options it supports or requires, if any.","         * @param {Int} [timeout] when no response within this timesetting, then the Promise will be rejected. When not specified,","         *              a timeout of 60000 (1 minute) is taken. We need this, because we need to be sure the sync-functions has a callback.","         *              without a callback the promise would never be resolved. This is now caught with the timeout.","         * @return {Y.Promise} promised response --> resolve(response, options) OR reject(reason).","        **/","        submitPromise: function(options, timeout) {","            var instance = this,","                updateMode = instance.get('updateMode');","","            instance._needAutoSaved = false;","            if (updateMode!==3) {","                instance._editFieldsToModel();","            }","            return instance.host.submitPromise(options, timeout);","        },","","        /**","         * Renderes a copy of all Model's attributes.","         * Should you omit 'configAttrs' then the renderer will try to find out the types automaticly.","         *","         * @method toJSON","         * @param configAttrs {Object} Every property of the host object/model can be defined as a property of configAttrs as well.","         * The value should also be an object: the config of the property that is passed to the ITSAFormElement.","         * @param configAttrs.hostProperty1 {Object} config of hostProperty1 (as example, you should use a real property here)","         * @param [configAttrs.hostProperty2] {Object} config of hostProperty2 (as example, you should use a real property here)","         * @param [configAttrs.hostProperty3] {Object} config of hostProperty3 (as example, you should use a real property here)","         * @return {Object} Copy of the host's objects or model's attributes, rendered as form-elements.","         * The rendered String should be added to the DOM yourself.","         * @since 0.1","         */","        toJSON : function(configAttrs) {","            var instance = this,","                host = instance.host,","                allproperties, useConfig, nodeId, mergedConfigAttrs;","","            if (configAttrs) {","                // we NEED to use clone() and NOT merge()","                // In case of more simultanious instances, they must not have the same source or they would interfere","                mergedConfigAttrs = Y.clone(configAttrs);","                allproperties = Y.merge(host.getAttrs());","                // now modify all the property-values into formelements","                YObject.each(","                    allproperties,","                    function(value, key, object) {","                        useConfig = Y.merge(DEFAULTCONFIG, (mergedConfigAttrs && mergedConfigAttrs[key]) || {}, {name: key, value: value});","                        if (mergedConfigAttrs[key]) {","                            mergedConfigAttrs[key].name = key;","                            mergedConfigAttrs[key].value = value;","                            if (!instance._elementIds[key]) {","                                instance._elementIds[key] = Y.guid();","                            }","                            nodeId = instance._elementIds[key];","                            object[key] = instance._itsaformelement.render(useConfig, nodeId);","                        }","                        else {","                            delete object[key];","                        }","                    }","                );","                // Next, we need to look for buttons tht are not part of the attributes","                YObject.each(","                    mergedConfigAttrs,","                    function(config, key) {","                        var type = config.type;","                        if ((type==='button') || (type==='reset') || (type==='submit') || (type==='save') || (type==='destroy')) {","                            useConfig = Y.merge(DEFAULTCONFIG, config, {name: key, value: config.buttonText || UNDEFINED_VALUE});","                            if (!instance._elementIds[key]) {","                                instance._elementIds[key] = Y.guid();","                            }","                            nodeId = instance._elementIds[key];","                            allproperties[key] = instance._itsaformelement.render(useConfig, nodeId);","                        }","                    }","                );","                instance._configAttrs = mergedConfigAttrs;","            }","            else {","                allproperties = '';","                instance._configAttrs = {};","            }","            return allproperties;","        },","","        /**","         * Cleans up bindings and removes plugin","         * @method destructor","         * @protected","         * @since 0.1","        */","        destructor : function() {","            var instance = this;","            if (instance._autoSaveTimer) {","                instance._autoSaveTimer.cancel();","            }","            instance._clearEventhandlers();","            instance._itsaformelement.destroy();","            instance._configAttrs = {};","            instance._elementIds = {};","            instance.removeTarget(instance.host);","        },","","        //===============================================================================================","        // private methods","        //===============================================================================================","","        /**","         * Autostorefunction that is called by timerinterval 'autosaveInterval' in case 'updateMode'===2","         * @method _autoStore","         * @protected","        */","        _autoStore : function() {","            var instance = this;","","            if (instance._needAutoSaved) {","                instance._editFieldsToModel();","                instance._needAutoSaved = false;","            }","        },","","        /**","         * Setting up eventlisteners","         *","         * @method _bindUI","         * @private","         * @since 0.1","         *","        */","        _bindUI : function() {","            var instance = this,","                eventhandlers = instance._eventhandlers;","","            eventhandlers.push(","                Y.on(","                    EVT_DATETIMEPICKER_CLICK,","                    function(e) {","                        var button = e.buttonNode,","                            span = button.one('span'),","                            valuespan = button.previous('span'),","                            picker = Y.ItsaDateTimePicker,","                            propertyName = e.property,","                            propertyconfig = instance._configAttrs[propertyName],","                            value = instance.host.get(propertyName),","                            widgetconfig = (propertyconfig && propertyconfig.widgetConfig) || {},","                            promise;","                        if (e.elementId===instance._elementIds[propertyName]) {","                            if (span.hasClass(ITSAFORMELEMENT_DATE_CLASS)) {","                                promise = Y.rbind(picker.getDate, picker);","                            }","                            else if (span.hasClass(ITSAFORMELEMENT_TIME_CLASS)) {","                                promise = Y.rbind(picker.getTime, picker);","                            }","                            else if (span.hasClass(ITSAFORMELEMENT_DATETIME_CLASS)) {","                                promise = Y.rbind(picker.getDateTime, picker);","                            }","                            widgetconfig.alignToNode = button;","                            promise(value, widgetconfig).then(","                                function(newdate) {","                                    var newRenderedElement;","                                    instance._storeProperty(valuespan, propertyName, newdate, true);","                                    // because _setProperty setts the attribute with {fromEditModel: true},","                                    // the view does not re-render. We change the fieldvalue ourselves","                                    // first ask for ITSAFormElement how the render will look like","                                    // then axtract the value from within","                                    newRenderedElement = instance.getElement(propertyName, propertyconfig, propertyconfig.value);","                                    valuespan.setHTML(instance._getDateTimeValueFromRender(newRenderedElement));","                                    button.focus();","                                },","                                function() {","                                    // be carefull: button might not exist anymore, when the view is rerendered and making the promise to be rejected!","                                    if (button) {","                                        button.focus();","                                    }","                                }","                            );","                        }","                    }","                )","            );","            eventhandlers.push(","                Y.on(","                    [EVT_INTERNAL+EVT_RESET_CLICK, EVT_INTERNAL+EVT_SUBMIT_CLICK, EVT_INTERNAL+EVT_SAVE_CLICK, EVT_INTERNAL+EVT_BUTTON_CLICK,","                                                                                                              EVT_INTERNAL+EVT_DESTROY_CLICK],","                    function(e) {","                        if ((e.elementId===instance._elementIds[e.property])) {","                            // stop the original event to prevent double events","                            e.halt();","                            // make the host fire the event","                            instance._fireModelEvent(e.type, e);","                        }","                    }","                )","            );","            eventhandlers.push(","                Y.on(","                    EVT_FOCUS_NEXT,","                    function(e) {","                        if (e.elementId===instance._elementIds[e.property]) {","                            // stop the original event to prevent double events","                            e.halt();","                            // make the host fire the event","                            instance.fire(EVT_FOCUS_NEXT, e);","                        }","                    }","                )","            );","            eventhandlers.push(","                Y.on(","                    EVT_VALUE_CHANGE,","                    function(e) {","                        if (e.elementId===instance._elementIds[e.property]) {","                            instance._storeProperty(e.inputNode, e.property, e.inputNode.get('value'));","                        }","                    }","                )","            );","            eventhandlers.push(","                Y.on(","                    EVT_INPUT_CHANGE,","                    function(e) {","                        if (e.elementId===instance._elementIds[e.property]) {","                            instance._storeProperty(e.inputNode, e.property, e.inputNode.get('value'), true);","                        }","                    }","                )","            );","            //============================================================================================","            // if the model gets changed and it wasn't this module, than fire an event.","            // So the developer can use this to listen for these changes and react on them","            instance.host.on(","                'model:change',","                function() {","                    Y.fire(EVT_DIALOG_WARN, {message: MESSAGE_WARN_MODELCHANGED});","                }","            );","            //============================================================================================","","","        },","","        /**","         * Cleaning up all eventlisteners","         *","         * @method _clearEventhandlers","         * @private","         * @since 0.1","         *","        */","        _clearEventhandlers : function() {","            YArray.each(","                this._eventhandlers,","                function(item){","                    item.detach();","                }","            );","        },","","        /**","         * The default destroyFunction of the 'destroybutton'-event. Will call the server with all Model's properties.","         * @method _defPluginDestroyFn","         * @protected","        */","        _defPluginDestroyFn : function() {","            var instance = this;","","            instance._needAutoSaved = false;","            instance._syncModel('destroy');","        },","","        /**","         * The default submitFunction of the 'resetbutton'-event. Will call the server with all Model's properties.","         * @method _defPluginResetFn","         * @protected","        */","        _defPluginResetFn : function() {","            var instance = this;","","            instance._needAutoSaved = false;","        },","","        /**","         * The default submitFunction of the 'submitbutton'-event. Will call the server with all Model's properties.","         * @method _defPluginSubmitFn","         * @protected","        */","        _defPluginSubmitFn : function() {","            this._defStoreFn('submit');","        },","","        /**","         * Saves all editable properties to the Model and calls the models synclayer.","         * @method _defSaveFn","         * @protected","        */","        _defSaveFn : function() {","            this._defStoreFn('save');","        },","","        /**","         * Function that is used by save and _defPluginSubmitFn to store the modelvalues.","         * @method _defStoreFn","         * @param mode {String} type of update","         * @protected","        */","        _defStoreFn : function(mode) {","            var instance = this,","                updateMode = instance.get('updateMode');","","            instance._needAutoSaved = false;","            if (updateMode!==3) {","                instance._editFieldsToModel();","            }","            instance._syncModel(mode);","        },","","        /**","         * Transports the formelement-values to the model or object","         *","         * @method _editFieldsToModel","         * @private","         * @since 0.1","         *","        */","        _editFieldsToModel: function() {","            var instance = this,","                configAttrs = instance._configAttrs,","                newModelAttrs = {};","","            YObject.each(","                configAttrs,","                function(propertyvalue, property) {","                    newModelAttrs[property] = propertyvalue.value;","                }","            );","            instance._setProperty(null, newModelAttrs);","        },","","        /**","         * Lets the host-model fire an model:eventName event","         *","         * @method _fireModelEvent","         * @param eventName {String} event to be fired (model:eventName)","         * @param eventPayLoad {eventTarget} payload","         * @private","         * @since 0.1","         *","        */","        _fireModelEvent: function(eventName, eventPayload) {","            var host = this.host;","","            eventPayload.target = host;","            host.fire(eventName, eventPayload);","        },","","        /**","         * Extracts the date-time value from the rendered Date-time String.","         *","         * @method _getDateTimeValueFromRender","         * @param renderedElement {String} The rendered elementstring from which the info needs to be extracted","         * @return {Any} Attribute value, or `undefined` if the attribute doesn't exist, or 'null' if no model is passed.","         * @private","         * @since 0.1","         *","        */","        _getDateTimeValueFromRender : function(renderedElement) {","            var regexp = /<span[^>]+>([^<]*)</;","","            return regexp.test(renderedElement) ? RegExp.$1 : '';","        },","","        /**","         * Check if the property-type is a date, time or datetime type.","         *","         * @method _isDateTimeType","         * @param type {String} propertytype to check","         * @return {Boolean} whether the type is a date-time type","         * @private","         * @since 0.1","         *","        */","        _isDateTimeType : function(type) {","            return (type==='date') || (type==='time') || (type==='datetime');","        },","","        /**","         * Sets the value of a property (or in case of Model, the attribute). Regardless which type the host is.","         * In case","         *","         * @method _setProperty","         * @param [propertyName] {String} Propertyname or -in case or Model- attribute-name. If set to 'null' then all attributes are set.","                  In tha case 'value' should be a hash containing properties and values, which can be passed through to 'Model.setAttrs()'","         * @param value {Any} The new value to be set.","         * @private","         * @since 0.1","         *","        */","        _setProperty: function(propertyName, value) {","            var instance = this,","                host = instance.host,","                options = {fromEditModel: true}, // set Attribute with option: '{fromEditModel: true}' --> now the view knows it must not re-render.","                propertyconfig;","","            propertyconfig = instance._configAttrs[propertyName];","            if (propertyconfig) {","                propertyconfig.value = value;","            }","            if (propertyName) {","                host.set(propertyName, value, options);","            }","            else {","                host.setAttrs(value, options);","            }","        },","","        /**","         * Saves the value of a property (or in case of Model, the attribute). Regardless which type the host is.","         * It will <store> the value. It might be set to the Model, but that deppends on the value of 'updateMode'.","         * In order to do that it might call _setProperty.","         *","         * @method _storeProperty","         * @param node {Y.Node} node that holds the formelement that was changed.","         * @param propertyName {String} Propertyname or -in case or Model- attribute-name.","         * @param value {Any} The new value to be set.","         * @param finished {Boolean} Whether the final value is reached. Some types (like text) can store before they reach","                  their final value.","         * @private","         * @since 0.1","         *","        */","        _storeProperty: function(node, propertyName, value, finished) {","            var instance = this,","                updateMode = instance.get('updateMode'),","                isObject = Lang.isObject(value),","                payload = {","                    node: node,","                    property: propertyName,","                    newVal: (isObject ? Y.merge(value) : value),","                    finished: finished","                },","                propertyconfig, setProperty, attributevalue;","","            propertyconfig = instance._configAttrs[propertyName];","            if (propertyconfig) {","                payload.prevValue = isObject ? Y.merge(propertyconfig.value) : propertyconfig.value;","                propertyconfig.value = value;","            }","            else {","                attributevalue = instance.host.get(propertyName);","                payload.prevValue = isObject ? Y.merge(attributevalue) : attributevalue;","            }","            setProperty = ((updateMode===3) || ((updateMode===1) && finished));","            if (setProperty) {","                instance._setProperty(propertyName, value);","            }","            else {","                node.addClass(ITSAFORMELEMENT_CHANGED_CLASS);","                if (updateMode===2) {","                    instance._needAutoSaved = true;","                }","            }","            /**","              * Event fired when a property changed during editing. This is regardless of whether the property is changed.","              * Using these events will help you -for instance- with hiding formelements based on property-values.<br />","              * The evennames consist of the propertyname+'Change'.","              * @event propertynameChange","              * @param e {EventFacade} Event Facade including:","              * @param e.node {Y.Node} The Node that was changed","              * @param e.property {String} The Model's attribute-name that was changed.","              * @param e.newVal {Any} The new value","              * @param e.newVal {Any} The previous value","              * @param e.finished {Boolean} Whether the attribute finished changing. Some attributes (input, textarea's) can fire","              *        this event during editing while still busy (not blurring): they have finished set to false.","            **/","            instance.fire(propertyName+'Change', payload);","        },","","        /**","         * The default submitFunction of the 'submitbutton'-event. Will call the server with all Model's properties.","         * @method _defPluginSubmitFn","         * @protected","        */","        _syncModel : function(action) {","            var instance = this,","                host = instance.host,","                destroyOptions, syncOptions, syncCallbacks;","","            syncOptions = instance.get('syncOptions');","            syncCallbacks = instance.get('syncCallbacks');","            if (action==='destroy') {","                destroyOptions = syncOptions.destroy || {};","                destroyOptions.remove = true;","                host.destroy(destroyOptions, syncCallbacks.destroy);","            }","            else {","                host.sync(action, syncOptions[action], syncCallbacks[action]);","            }","       }","","    }, {","        NS : 'itsaeditmodel',","        ATTRS : {","            /**","             * Sets the interval to do an 'autosave' during editing input/textfields.","             * Only applies in situations where the attribute 'updateMode'===2. Value should be in <b>seconds</b> between 1-3600.","             * @attribute autosaveInterval","             * @type Int","             * @default 30","             * @since 0.1","            */","            autosaveInterval : {","                value: 30,","                validator: function(val) {","                    return ((typeof val === 'number') && (val>0) && (val<=3600));","                },","                setter: function(val) {","                    var instance = this,","                        updateMode = instance.get('updateMode');","                    if (instance._autoSaveTimer) {","                        instance._autoSaveTimer.cancel();","                    }","                    if (updateMode===2) {","                        instance._autoSaveTimer = Y.later(","                            1000*val,","                            instance,","                            instance._autoStore,","                            null,","                            true","                        );","                    }","                }","            },","            /**","             * Every property of the object/model you want to edit, should be defined as a property of configAttrs.","             * Every property-definition is an object: the config of the property that is passed to the ITSAFormElement.<br />","             * Example: <br />","             * editmodelConfigAttrs.property1 = {Object} config of property1 (as example, you should use a real property here)<br />","             * editmodelConfigAttrs.property2 = {Object} config of property2 (as example, you should use a real property here)<br />","             * editmodelConfigAttrs.property3 = {Object} config of property3 (as example, you should use a real property here)<br />","             *","             * @attribute editmodelConfigAttrs","             * @type {Object}","             * @default {}","             * @since 0.1","             */","            editmodelConfigAttrs: {","                value: {},","                validator: function(v){","                    return Lang.isObject(v);","                }","            },","            /**","             * Object with the properties: <b>destroy</b>, <b>save</b> and <b>submit</b>. For every property you might want to","             * specify a callbackFunction.","             * @attribute syncCallbacks","             * @type Object","             * @default {}","             * @since 0.1","            */","            syncCallbacks : {","                value: {},","                validator: function(val) {","                    return Lang.isObject(val);","                }","            },","            /**","             * Object with the properties: <b>destroy</b>, <b>save</b> and <b>submit</b>. For every property you might want to","             * specify the options-object that will be passed through to the sync- or destroy-method. The destroymethod will","             * <i>always</i> be called with 'remove=true', in order to call the sync-method.","             * @attribute syncOptions","             * @type Object","             * @default {}","             * @since 0.1","            */","            syncOptions : {","                value: {},","                validator: function(val) {","                    return Lang.isObject(val);","                }","            },","            /**","             * Template of how to render the model in the view. You can <b>only use Y.Lang.sub templates</b> where the attribute/properties","             * should be specified between brackets. Example: 'Name: {firstname} {lastname}'.<br />","             * Or you can use Y.Template.Micro: 'Name: <%= data.firstname + \" \" + data.lastename %>'","             * @attribute template","             * @type String","             * @default null","             * @since 0.1","            */","            template : {","                value: null,","                validator: function(val) {","                    return (typeof val==='string');","                }","            },","            /**","             * When to update the edited value to the Model. You can use 4 states:<br /><br />","             * 0 = only on Model.save <i>(or when dave-button is pressed)</i><br />","             * 1 = after the attribute finished updating <i>in case of textfields: when blurring</i><br />","             * 2 = autosave, based on the interval defined with attribute 'autosaveInterval'<br />","             * 3 = life, immediate updates <i>in case of textfields: after every valueChange</i><br /><br />","             * @attribute updateMode","             * @type Int","             * @default 0","             * @since 0.1","            */","            updateMode : {","                value: 0,","                lazyAdd: false, // in case of value","                validator: function(val) {","                    return ((typeof val === 'number') && (val>=0) && (val<=3));","                },","                setter: function(val) {","                    var instance = this,","                        autosaveInterval = instance.get('autosaveInterval');","                    if (val) {","                        instance._autoSaveTimer = Y.later(","                            1000*autosaveInterval,","                            instance,","                            instance._autoStore,","                            null,","                            true","                        );","                    }","                    else {","                        if (instance._autoSaveTimer) {","                            instance._autoSaveTimer.cancel();","                        }","                    }","                }","            }","        }","    }",");","","//===================================================================","// adding plug and unplug features to Y.Model:","Y.augment(Y.Model, Y.Plugin.Host);","","// now we need to set global eventhandlers, but only once.","// unfortunatly they need to keep in memory, even when unplugged.","// however: they only get there once, so no memoryleaks","  body.delegate(","      'click',","      function(e) {","          var button = e.currentTarget,","              span = button.previous('span');","          // stop the original event to prevent double events","          e.halt();","          // set the focus manually. This will cause the View to be focussed as well --> now the focusmanager works for this View-instance","          button.focus();","          Y.use('gallery-itsadatetimepicker', function(Y) {","              e.elementId = span.get('id');","              e.type = EVT_DATETIMEPICKER_CLICK;","              e.buttonNode = button;","              e.property = GET_PROPERTY_FROM_CLASS(span.getAttribute('class'));","              Y.fire(EVT_DATETIMEPICKER_CLICK, e);","          });","      },","      '.'+ITSABUTTON_DATETIME_CLASS","  );","  body.delegate(","      'valuechange',","      function(e) {","          var inputnode = e.currentTarget;","          // seems that e.halt() cannot be called here ???","          e.elementId = inputnode.get('id');","          e.inputNode = inputnode;","          e.property = GET_PROPERTY_FROM_CLASS(inputnode.getAttribute('class'));","          e.type = EVT_VALUE_CHANGE;","          Y.fire(EVT_VALUE_CHANGE, e);","      },","      '.'+ITSAFORMELEMENT_LIFECHANGE_CLASS","  );","  body.delegate(","      'change',","      function(e) {","          var inputnode = e.currentTarget;","          // seems that e.halt() cannot be called here ???","          e.elementId = inputnode.get('id');","          e.inputNode = inputnode;","          e.property = GET_PROPERTY_FROM_CLASS(inputnode.getAttribute('class'));","          e.type = EVT_INPUT_CHANGE;","          Y.fire(EVT_INPUT_CHANGE, e);","      },","      '.'+ITSAFORMELEMENT_LIFECHANGE_CLASS","  );","  body.delegate(","      'keypress',","      function(e) {","          if (e.keyCode===13) {","              // stop the original event to prevent double events","              e.halt();","              var inputnode = e.currentTarget;","              // seems that e.halt() cannot be called here ???","              e.elementId = inputnode.get('id');","              e.inputNode = inputnode;","              e.property = GET_PROPERTY_FROM_CLASS(inputnode.getAttribute('class'));","              e.type = EVT_FOCUS_NEXT;","              Y.fire(EVT_FOCUS_NEXT, e);","          }","      },","      '.'+ITSAFORMELEMENT_ENTERNEXTFIELD_CLASS","  );","  body.delegate(","      'click',","      function(e) {","          var button = e.currentTarget,","              classNames = button.getAttribute('class');","          // stop the original event to prevent double events","          e.halt();","          // set the focus manually. This will cause the View to be focussed as well --> now the focusmanager works for this View-instance","          button.focus();","          e.elementId = button.get('id');","          e.buttonNode = button;","          e.property = GET_PROPERTY_FROM_CLASS(button.getAttribute('class'));","          if (classNames.indexOf(SUBMIT_BUTTON_CLASS) !== -1) {","              e.type = EVT_SUBMIT_CLICK;","              Y.fire(EVT_INTERNAL+EVT_SUBMIT_CLICK, e);","          }","          else if (classNames.indexOf(BUTTON_BUTTON_CLASS) !== -1) {","              e.type = EVT_BUTTON_CLICK;","              Y.fire(EVT_INTERNAL+EVT_BUTTON_CLICK, e);","          }","          else if (classNames.indexOf(RESET_BUTTON_CLASS) !== -1) {","              e.type = EVT_RESET_CLICK;","              Y.fire(EVT_INTERNAL+EVT_RESET_CLICK, e);","          }","          else if (classNames.indexOf(SAVE_BUTTON_CLASS) !== -1) {","              e.type = EVT_SAVE_CLICK;","              Y.fire(EVT_INTERNAL+EVT_SAVE_CLICK, e);","          }","          else if (classNames.indexOf(DESTROY_BUTTON_CLASS) !== -1) {","              e.type = EVT_DESTROY_CLICK;","              Y.fire(EVT_INTERNAL+EVT_DESTROY_CLICK, e);","          }","      },","      '.'+ITSAFORMELEMENT_BUTTONTYPE_CLASS","  );","","}, '@VERSION@', {","    \"requires\": [","        \"yui-base\",","        \"base-build\",","        \"node-base\",","        \"node-event-delegate\",","        \"plugin\",","        \"pluginhost-base\",","        \"lazy-model-list\",","        \"event-valuechange\",","        \"gallery-itsamodelsyncpromise\",","        \"gallery-itsaformelement\"","    ]","});"];
_yuitest_coverage["build/gallery-itsaeditmodel/gallery-itsaeditmodel.js"].lines = {"1":0,"3":0,"27":0,"64":0,"66":0,"128":0,"138":0,"149":0,"158":0,"167":0,"176":0,"185":0,"194":0,"203":0,"212":0,"214":0,"215":0,"225":0,"240":0,"255":0,"270":0,"278":0,"279":0,"284":0,"288":0,"289":0,"290":0,"312":0,"319":0,"320":0,"321":0,"322":0,"324":0,"325":0,"327":0,"328":0,"332":0,"334":0,"359":0,"364":0,"365":0,"366":0,"367":0,"369":0,"370":0,"372":0,"373":0,"377":0,"379":0,"415":0,"418":0,"419":0,"420":0,"422":0,"447":0,"450":0,"451":0,"452":0,"454":0,"472":0,"476":0,"479":0,"480":0,"482":0,"485":0,"486":0,"487":0,"488":0,"489":0,"490":0,"492":0,"493":0,"496":0,"501":0,"504":0,"505":0,"506":0,"507":0,"508":0,"510":0,"511":0,"515":0,"518":0,"519":0,"521":0,"531":0,"532":0,"533":0,"535":0,"536":0,"537":0,"538":0,"539":0,"552":0,"554":0,"555":0,"556":0,"569":0,"572":0,"576":0,"585":0,"586":0,"587":0,"589":0,"590":0,"592":0,"593":0,"595":0,"596":0,"598":0,"599":0,"604":0,"605":0,"606":0,"610":0,"611":0,"619":0,"624":0,"626":0,"628":0,"633":0,"637":0,"639":0,"641":0,"646":0,"650":0,"651":0,"656":0,"660":0,"661":0,"669":0,"672":0,"689":0,"692":0,"703":0,"705":0,"706":0,"715":0,"717":0,"726":0,"735":0,"745":0,"748":0,"749":0,"750":0,"752":0,"764":0,"768":0,"771":0,"774":0,"788":0,"790":0,"791":0,"805":0,"807":0,"821":0,"837":0,"842":0,"843":0,"844":0,"846":0,"847":0,"850":0,"870":0,"881":0,"882":0,"883":0,"884":0,"887":0,"888":0,"890":0,"891":0,"892":0,"895":0,"896":0,"897":0,"913":0,"922":0,"926":0,"927":0,"928":0,"929":0,"930":0,"931":0,"934":0,"952":0,"955":0,"957":0,"958":0,"960":0,"961":0,"987":0,"1001":0,"1016":0,"1031":0,"1049":0,"1052":0,"1054":0,"1055":0,"1064":0,"1065":0,"1076":0,"1081":0,"1084":0,"1087":0,"1089":0,"1090":0,"1091":0,"1092":0,"1093":0,"1094":0,"1095":0,"1100":0,"1103":0,"1105":0,"1106":0,"1107":0,"1108":0,"1109":0,"1113":0,"1116":0,"1118":0,"1119":0,"1120":0,"1121":0,"1122":0,"1126":0,"1129":0,"1131":0,"1132":0,"1134":0,"1135":0,"1136":0,"1137":0,"1138":0,"1143":0,"1146":0,"1149":0,"1151":0,"1152":0,"1153":0,"1154":0,"1155":0,"1156":0,"1157":0,"1159":0,"1160":0,"1161":0,"1163":0,"1164":0,"1165":0,"1167":0,"1168":0,"1169":0,"1171":0,"1172":0,"1173":0};
_yuitest_coverage["build/gallery-itsaeditmodel/gallery-itsaeditmodel.js"].functions = {"GET_PROPERTY_FROM_CLASS:63":0,"(anonymous 2):287":0,"initializer:137":0,"getButton:311":0,"getElement:358":0,"savePromise:414":0,"submitPromise:446":0,"(anonymous 3):484":0,"(anonymous 4):503":0,"toJSON:471":0,"destructor:530":0,"_autoStore:551":0,"(anonymous 6):597":0,"(anonymous 7):608":0,"(anonymous 5):575":0,"(anonymous 8):623":0,"(anonymous 9):636":0,"(anonymous 10):649":0,"(anonymous 11):659":0,"(anonymous 12):671":0,"_bindUI:568":0,"(anonymous 13):691":0,"_clearEventhandlers:688":0,"_defPluginDestroyFn:702":0,"_defPluginResetFn:714":0,"_defPluginSubmitFn:725":0,"_defSaveFn:734":0,"_defStoreFn:744":0,"(anonymous 14):770":0,"_editFieldsToModel:763":0,"_fireModelEvent:787":0,"_getDateTimeValueFromRender:804":0,"_isDateTimeType:820":0,"_setProperty:836":0,"_storeProperty:869":0,"_syncModel:921":0,"validator:951":0,"setter:954":0,"validator:986":0,"validator:1000":0,"validator:1015":0,"validator:1030":0,"validator:1048":0,"setter:1051":0,"(anonymous 16):1090":0,"(anonymous 15):1083":0,"(anonymous 17):1102":0,"(anonymous 18):1115":0,"(anonymous 19):1128":0,"(anonymous 20):1145":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-itsaeditmodel/gallery-itsaeditmodel.js"].coveredLines = 257;
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
    ITSAFORMELEMENT_BUTTONTYPE_CLASS = FORMELEMENT_CLASS + '-inputbutton',
    ITSAFORMELEMENT_LIFECHANGE_CLASS = FORMELEMENT_CLASS + '-lifechange',
    ITSAFORMELEMENT_CHANGED_CLASS = FORMELEMENT_CLASS + '-changed',
    ITSAFORMELEMENT_ENTERNEXTFIELD_CLASS = FORMELEMENT_CLASS + '-enternextfield',
    BUTTON_BUTTON_CLASS = FORMELEMENT_CLASS + '-button',
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
        _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "GET_PROPERTY_FROM_CLASS", 63);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 64);
var regexp = /yui3-itsaformelement-property-(\w+)/;

        _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 66);
return regexp.test(className) ? RegExp.$1 : null;
    },
    EVT_INTERNAL = 'internal',
    // next four events are declared within the initialiser:
    EVT_SUBMIT_CLICK = 'submitclick',
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
      * @event inputbuttonclick
      * @param e {EventFacade} Event Facade including:
      * @param e.buttonNode {Y.Node} The Button-Node that was clicked
      * @param e.property {String} The property-name of the Object (or the Model's attribute-name)
      * @param [e.model] {Y.Model} This modelinstance.
    **/
    EVT_BUTTON_CLICK = 'inputbuttonclick',
   /**
     * Fired after the plugin is pluggedin and ready to be referenced by the host. This is LATER than after the 'init'-event,
     * because the latter will be fired before the namespace Model.itsaeditmodel exists.
     * @event pluggedin
     * @since 0.1
    **/
    EVT_PLUGGEDIN = 'pluggedin';

_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 128);
Y.namespace('Plugin').ITSAEditModel = Y.Base.create('itsaeditmodel', Y.Plugin.Base, [], {

        /**
         * Sets up the toolbar during initialisation. Calls render() as soon as the hosts-editorframe is ready
         *
         * @method initializer
         * @protected
         * @since 0.1
         */
        initializer : function() {
            _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "initializer", 137);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 138);
var instance = this,
                host;

           // -- Public Properties -------------------------------------------------

           /**
            * The plugin's host, which should be a Model-instance (or descendent)
            * @property host
            * @default host-instance
            * @type Y.Model
            */
            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 149);
instance.host = instance.get('host');

           /**
            * Internal list that holds event-references
            * @property _eventhandlers
            * @default []
            * @private
            * @type Array
            */
            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 158);
instance._eventhandlers = [];

           /**
            * An instance of Y.ITSAFormElement that is used to generate the form-html of the elements.
            * @property _itsaformelement
            * @default null
            * @private
            * @type Y.ITSAFormElement-instance
            */
            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 167);
instance._itsaformelement = null;

           /**
            * internal backup of all property-configs
            * @property _configAttrs
            * @default {}
            * @private
            * @type Object
            */
            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 176);
instance._configAttrs = {};

           /**
            * internal backup of all rendered node-id's
            * @property _elementIds
            * @default {}
            * @private
            * @type Object
            */
            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 185);
instance._elementIds = {};

           /**
            * internal flag that tells whether automaicly saving needs to happen in case properties have changed
            * @property _needAutoSaved
            * @default false
            * @private
            * @type Boolean
            */
            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 194);
instance._needAutoSaved = false;

           /**
            * Internal reference to Y.later timerobject for autosaving
            * @property _autoSaveTimer
            * @default null
            * @private
            * @type timer-Object
            */
            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 203);
instance._autoSaveTimer = null;

           /**
            * Internal reference to Y.later timerobject that is used to fire a 'pluggedin'-event once 'itsaeditmodel' is available on the host.
            * @property _fireEventTimer
            * @default null
            * @private
            * @type timer-Object
            */
            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 212);
instance._fireEventTimer = null;

            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 214);
host = instance.host;
            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 215);
instance._itsaformelement = new Y.ITSAFormElement();
            /**
              * Event fired the submitbutton is clicked.
              * defaultFunction = calling then model's sync method with action=submit
              * @event submitclick
              * @param e {EventFacade} Event Facade including:
              * @param e.currentTarget {Y.Node} The Button-Node that was clicked
              * @param e.property {String} The property-name of the Object (or the Model's attribute-name)
              * @param [e.model] {Y.Model} This modelinstance.
            **/
            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 225);
host.publish(
                EVT_SUBMIT_CLICK,
                {
                    defaultFn: Y.rbind(instance._defPluginSubmitFn, instance)
                }
            );
            /**
              * Event fired the resetbutton is clicked.
              * defaultFunction = calling then model's sync method with action=reset
              * @event resetclick
              * @param e {EventFacade} Event Facade including:
              * @param e.currentTarget {Y.Node} The Button-Node that was clicked
              * @param e.property {String} The property-name of the Object (or the Model's attribute-name)
              * @param [e.model] {Y.Model} This modelinstance.
            **/
            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 240);
host.publish(
                EVT_RESET_CLICK,
                {
                    defaultFn: Y.rbind(instance._defPluginResetFn, instance)
                }
            );
            /**
              * Event fired the savebutton is clicked.
              * defaultFunction = calling then model's sync method with action=submit
              * @event saveclick
              * @param e {EventFacade} Event Facade including:
              * @param e.currentTarget {Y.Node} The Button-Node that was clicked
              * @param e.property {String} The property-name of the Object (or the Model's attribute-name)
              * @param [e.model] {Y.Model} This modelinstance.
            **/
            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 255);
host.publish(
                EVT_SAVE_CLICK,
                {
                    defaultFn: Y.rbind(instance._defSaveFn, instance)
                }
            );
            /**
              * Event fired the destroybutton is clicked.
              * defaultFunction = calling then model's sync method with action=submit
              * @event destroyclick
              * @param e {EventFacade} Event Facade including:
              * @param e.currentTarget {Y.Node} The Button-Node that was clicked
              * @param e.property {String} The property-name of the Object (or the Model's attribute-name)
              * @param [e.model] {Y.Model} This modelinstance.
            **/
            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 270);
host.publish(
                EVT_DESTROY_CLICK,
                {
                    // DO NOT use _defDestroyFn --> this is used by the model itself and would make _defDestroyFn of the model
                    // to be excecuted when the plugin is unplugged (!????)
                    defaultFn: Y.rbind(instance._defPluginDestroyFn, instance)
                }
            );
            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 278);
instance._bindUI();
            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 279);
instance.addTarget(host);
            // now a VERY tricky one...
            // We need to fire an event that tells the plugin is pluged in, but it seemed that when listening in the host,
            // host.itsaeditmodel will be read imediately after the event fired --> this seems to be BEFORE the event is registred!!!
            // So, we wait until the real registering is finished and THEN fire the event!
            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 284);
instance._fireEventTimer = Y.later(
                50,
                instance,
                function() {
                    _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "(anonymous 2)", 287);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 288);
if (host.itsaeditmodel) {
                        _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 289);
instance._fireEventTimer.cancel();
                        _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 290);
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
            _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "getButton", 311);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 312);
var instance = this,
                value = buttonText,
                name = buttonText.replace(/ /g,'_'),
                useConfig = Y.merge(DEFAULTCONFIG, config || {}, {name: name, value: value}),
                type = useConfig.type,
                renderedFormElement, nodeId;

            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 319);
if (name && config && ((type==='button') || (type==='reset') || (type==='submit') || (type==='save') || (type==='destroy'))) {
                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 320);
instance._configAttrs[name] = useConfig;
                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 321);
if (!instance._elementIds[name]) {
                    _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 322);
instance._elementIds[name] = Y.guid();
                }
                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 324);
nodeId = instance._elementIds[name];
                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 325);
renderedFormElement = instance._itsaformelement.render(useConfig, nodeId);
                // after rendering we are sure definitely sure what type we have (even if not specified)
                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 327);
if (instance._isDateTimeType(useConfig.type)) {
                    _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 328);
Y.use('gallery-itsadatetimepicker');
                }
            }
            else {
                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 332);
renderedFormElement = '';
            }
            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 334);
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
            _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "getElement", 358);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 359);
var instance = this,
                value = predefValue || instance.host.get(propertyName),
                useConfig = Y.merge(DEFAULTCONFIG, config || {}, {name: propertyName, value: value}),
                renderedFormElement, nodeId;

            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 364);
if (propertyName && config) {
                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 365);
instance._configAttrs[propertyName] = useConfig;
                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 366);
if (!instance._elementIds[propertyName]) {
                    _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 367);
instance._elementIds[propertyName] = Y.guid();
                }
                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 369);
nodeId = instance._elementIds[propertyName];
                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 370);
renderedFormElement = instance._itsaformelement.render(useConfig, nodeId);
                // after rendering we are sure definitely sure what type we have (even if not specified)
                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 372);
if (instance._isDateTimeType(useConfig.type)) {
                    _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 373);
Y.use('gallery-itsadatetimepicker');
                }
            }
            else {
                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 377);
renderedFormElement = '';
            }
            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 379);
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
        * @param {Int} [timeout] when no response within this timesetting, then the Promise will be rejected. When not specified,
        *              a timeout of 60000 (1 minute) is taken. We need this, because we need to be sure the sync-functions has a callback.
        *              without a callback the promise would never be resolved. This is now caught with the timeout.
        * @return {Y.Promise} promised response --> resolve(response, options) OR reject(reason).
        **/
        savePromise : function(options, timeout) {
            _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "savePromise", 414);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 415);
var instance = this,
                updateMode = instance.get('updateMode');

            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 418);
instance._needAutoSaved = false;
            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 419);
if (updateMode!==3) {
                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 420);
instance._editFieldsToModel();
            }
            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 422);
return instance.host.savePromise(options, timeout);
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
         * <b>CAUTION</b> The sync-method MUST call its callback-function to make the promised resolved. If there is no callback-function
         * then the promise will be rejected after a timeout. When timeout is not specified,
         * @method submitPromise
         * @param {Object} [options] Options to be passed to `sync()`. It's up to the custom sync
         *                 implementation to determine what options it supports or requires, if any.
         * @param {Int} [timeout] when no response within this timesetting, then the Promise will be rejected. When not specified,
         *              a timeout of 60000 (1 minute) is taken. We need this, because we need to be sure the sync-functions has a callback.
         *              without a callback the promise would never be resolved. This is now caught with the timeout.
         * @return {Y.Promise} promised response --> resolve(response, options) OR reject(reason).
        **/
        submitPromise: function(options, timeout) {
            _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "submitPromise", 446);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 447);
var instance = this,
                updateMode = instance.get('updateMode');

            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 450);
instance._needAutoSaved = false;
            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 451);
if (updateMode!==3) {
                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 452);
instance._editFieldsToModel();
            }
            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 454);
return instance.host.submitPromise(options, timeout);
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
            _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "toJSON", 471);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 472);
var instance = this,
                host = instance.host,
                allproperties, useConfig, nodeId, mergedConfigAttrs;

            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 476);
if (configAttrs) {
                // we NEED to use clone() and NOT merge()
                // In case of more simultanious instances, they must not have the same source or they would interfere
                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 479);
mergedConfigAttrs = Y.clone(configAttrs);
                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 480);
allproperties = Y.merge(host.getAttrs());
                // now modify all the property-values into formelements
                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 482);
YObject.each(
                    allproperties,
                    function(value, key, object) {
                        _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "(anonymous 3)", 484);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 485);
useConfig = Y.merge(DEFAULTCONFIG, (mergedConfigAttrs && mergedConfigAttrs[key]) || {}, {name: key, value: value});
                        _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 486);
if (mergedConfigAttrs[key]) {
                            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 487);
mergedConfigAttrs[key].name = key;
                            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 488);
mergedConfigAttrs[key].value = value;
                            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 489);
if (!instance._elementIds[key]) {
                                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 490);
instance._elementIds[key] = Y.guid();
                            }
                            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 492);
nodeId = instance._elementIds[key];
                            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 493);
object[key] = instance._itsaformelement.render(useConfig, nodeId);
                        }
                        else {
                            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 496);
delete object[key];
                        }
                    }
                );
                // Next, we need to look for buttons tht are not part of the attributes
                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 501);
YObject.each(
                    mergedConfigAttrs,
                    function(config, key) {
                        _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "(anonymous 4)", 503);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 504);
var type = config.type;
                        _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 505);
if ((type==='button') || (type==='reset') || (type==='submit') || (type==='save') || (type==='destroy')) {
                            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 506);
useConfig = Y.merge(DEFAULTCONFIG, config, {name: key, value: config.buttonText || UNDEFINED_VALUE});
                            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 507);
if (!instance._elementIds[key]) {
                                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 508);
instance._elementIds[key] = Y.guid();
                            }
                            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 510);
nodeId = instance._elementIds[key];
                            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 511);
allproperties[key] = instance._itsaformelement.render(useConfig, nodeId);
                        }
                    }
                );
                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 515);
instance._configAttrs = mergedConfigAttrs;
            }
            else {
                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 518);
allproperties = '';
                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 519);
instance._configAttrs = {};
            }
            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 521);
return allproperties;
        },

        /**
         * Cleans up bindings and removes plugin
         * @method destructor
         * @protected
         * @since 0.1
        */
        destructor : function() {
            _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "destructor", 530);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 531);
var instance = this;
            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 532);
if (instance._autoSaveTimer) {
                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 533);
instance._autoSaveTimer.cancel();
            }
            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 535);
instance._clearEventhandlers();
            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 536);
instance._itsaformelement.destroy();
            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 537);
instance._configAttrs = {};
            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 538);
instance._elementIds = {};
            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 539);
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
            _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "_autoStore", 551);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 552);
var instance = this;

            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 554);
if (instance._needAutoSaved) {
                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 555);
instance._editFieldsToModel();
                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 556);
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
            _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "_bindUI", 568);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 569);
var instance = this,
                eventhandlers = instance._eventhandlers;

            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 572);
eventhandlers.push(
                Y.on(
                    EVT_DATETIMEPICKER_CLICK,
                    function(e) {
                        _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "(anonymous 5)", 575);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 576);
var button = e.buttonNode,
                            span = button.one('span'),
                            valuespan = button.previous('span'),
                            picker = Y.ItsaDateTimePicker,
                            propertyName = e.property,
                            propertyconfig = instance._configAttrs[propertyName],
                            value = instance.host.get(propertyName),
                            widgetconfig = (propertyconfig && propertyconfig.widgetConfig) || {},
                            promise;
                        _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 585);
if (e.elementId===instance._elementIds[propertyName]) {
                            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 586);
if (span.hasClass(ITSAFORMELEMENT_DATE_CLASS)) {
                                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 587);
promise = Y.rbind(picker.getDate, picker);
                            }
                            else {_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 589);
if (span.hasClass(ITSAFORMELEMENT_TIME_CLASS)) {
                                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 590);
promise = Y.rbind(picker.getTime, picker);
                            }
                            else {_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 592);
if (span.hasClass(ITSAFORMELEMENT_DATETIME_CLASS)) {
                                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 593);
promise = Y.rbind(picker.getDateTime, picker);
                            }}}
                            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 595);
widgetconfig.alignToNode = button;
                            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 596);
promise(value, widgetconfig).then(
                                function(newdate) {
                                    _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "(anonymous 6)", 597);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 598);
var newRenderedElement;
                                    _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 599);
instance._storeProperty(valuespan, propertyName, newdate, true);
                                    // because _setProperty setts the attribute with {fromEditModel: true},
                                    // the view does not re-render. We change the fieldvalue ourselves
                                    // first ask for ITSAFormElement how the render will look like
                                    // then axtract the value from within
                                    _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 604);
newRenderedElement = instance.getElement(propertyName, propertyconfig, propertyconfig.value);
                                    _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 605);
valuespan.setHTML(instance._getDateTimeValueFromRender(newRenderedElement));
                                    _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 606);
button.focus();
                                },
                                function() {
                                    // be carefull: button might not exist anymore, when the view is rerendered and making the promise to be rejected!
                                    _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "(anonymous 7)", 608);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 610);
if (button) {
                                        _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 611);
button.focus();
                                    }
                                }
                            );
                        }
                    }
                )
            );
            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 619);
eventhandlers.push(
                Y.on(
                    [EVT_INTERNAL+EVT_RESET_CLICK, EVT_INTERNAL+EVT_SUBMIT_CLICK, EVT_INTERNAL+EVT_SAVE_CLICK, EVT_INTERNAL+EVT_BUTTON_CLICK,
                                                                                                              EVT_INTERNAL+EVT_DESTROY_CLICK],
                    function(e) {
                        _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "(anonymous 8)", 623);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 624);
if ((e.elementId===instance._elementIds[e.property])) {
                            // stop the original event to prevent double events
                            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 626);
e.halt();
                            // make the host fire the event
                            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 628);
instance._fireModelEvent(e.type, e);
                        }
                    }
                )
            );
            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 633);
eventhandlers.push(
                Y.on(
                    EVT_FOCUS_NEXT,
                    function(e) {
                        _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "(anonymous 9)", 636);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 637);
if (e.elementId===instance._elementIds[e.property]) {
                            // stop the original event to prevent double events
                            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 639);
e.halt();
                            // make the host fire the event
                            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 641);
instance.fire(EVT_FOCUS_NEXT, e);
                        }
                    }
                )
            );
            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 646);
eventhandlers.push(
                Y.on(
                    EVT_VALUE_CHANGE,
                    function(e) {
                        _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "(anonymous 10)", 649);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 650);
if (e.elementId===instance._elementIds[e.property]) {
                            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 651);
instance._storeProperty(e.inputNode, e.property, e.inputNode.get('value'));
                        }
                    }
                )
            );
            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 656);
eventhandlers.push(
                Y.on(
                    EVT_INPUT_CHANGE,
                    function(e) {
                        _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "(anonymous 11)", 659);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 660);
if (e.elementId===instance._elementIds[e.property]) {
                            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 661);
instance._storeProperty(e.inputNode, e.property, e.inputNode.get('value'), true);
                        }
                    }
                )
            );
            //============================================================================================
            // if the model gets changed and it wasn't this module, than fire an event.
            // So the developer can use this to listen for these changes and react on them
            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 669);
instance.host.on(
                'model:change',
                function() {
                    _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "(anonymous 12)", 671);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 672);
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
            _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "_clearEventhandlers", 688);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 689);
YArray.each(
                this._eventhandlers,
                function(item){
                    _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "(anonymous 13)", 691);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 692);
item.detach();
                }
            );
        },

        /**
         * The default destroyFunction of the 'destroybutton'-event. Will call the server with all Model's properties.
         * @method _defPluginDestroyFn
         * @protected
        */
        _defPluginDestroyFn : function() {
            _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "_defPluginDestroyFn", 702);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 703);
var instance = this;

            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 705);
instance._needAutoSaved = false;
            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 706);
instance._syncModel('destroy');
        },

        /**
         * The default submitFunction of the 'resetbutton'-event. Will call the server with all Model's properties.
         * @method _defPluginResetFn
         * @protected
        */
        _defPluginResetFn : function() {
            _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "_defPluginResetFn", 714);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 715);
var instance = this;

            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 717);
instance._needAutoSaved = false;
        },

        /**
         * The default submitFunction of the 'submitbutton'-event. Will call the server with all Model's properties.
         * @method _defPluginSubmitFn
         * @protected
        */
        _defPluginSubmitFn : function() {
            _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "_defPluginSubmitFn", 725);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 726);
this._defStoreFn('submit');
        },

        /**
         * Saves all editable properties to the Model and calls the models synclayer.
         * @method _defSaveFn
         * @protected
        */
        _defSaveFn : function() {
            _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "_defSaveFn", 734);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 735);
this._defStoreFn('save');
        },

        /**
         * Function that is used by save and _defPluginSubmitFn to store the modelvalues.
         * @method _defStoreFn
         * @param mode {String} type of update
         * @protected
        */
        _defStoreFn : function(mode) {
            _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "_defStoreFn", 744);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 745);
var instance = this,
                updateMode = instance.get('updateMode');

            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 748);
instance._needAutoSaved = false;
            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 749);
if (updateMode!==3) {
                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 750);
instance._editFieldsToModel();
            }
            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 752);
instance._syncModel(mode);
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
            _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "_editFieldsToModel", 763);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 764);
var instance = this,
                configAttrs = instance._configAttrs,
                newModelAttrs = {};

            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 768);
YObject.each(
                configAttrs,
                function(propertyvalue, property) {
                    _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "(anonymous 14)", 770);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 771);
newModelAttrs[property] = propertyvalue.value;
                }
            );
            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 774);
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
            _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "_fireModelEvent", 787);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 788);
var host = this.host;

            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 790);
eventPayload.target = host;
            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 791);
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
            _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "_getDateTimeValueFromRender", 804);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 805);
var regexp = /<span[^>]+>([^<]*)</;

            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 807);
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
            _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "_isDateTimeType", 820);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 821);
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
            _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "_setProperty", 836);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 837);
var instance = this,
                host = instance.host,
                options = {fromEditModel: true}, // set Attribute with option: '{fromEditModel: true}' --> now the view knows it must not re-render.
                propertyconfig;

            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 842);
propertyconfig = instance._configAttrs[propertyName];
            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 843);
if (propertyconfig) {
                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 844);
propertyconfig.value = value;
            }
            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 846);
if (propertyName) {
                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 847);
host.set(propertyName, value, options);
            }
            else {
                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 850);
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
            _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "_storeProperty", 869);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 870);
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

            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 881);
propertyconfig = instance._configAttrs[propertyName];
            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 882);
if (propertyconfig) {
                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 883);
payload.prevValue = isObject ? Y.merge(propertyconfig.value) : propertyconfig.value;
                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 884);
propertyconfig.value = value;
            }
            else {
                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 887);
attributevalue = instance.host.get(propertyName);
                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 888);
payload.prevValue = isObject ? Y.merge(attributevalue) : attributevalue;
            }
            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 890);
setProperty = ((updateMode===3) || ((updateMode===1) && finished));
            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 891);
if (setProperty) {
                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 892);
instance._setProperty(propertyName, value);
            }
            else {
                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 895);
node.addClass(ITSAFORMELEMENT_CHANGED_CLASS);
                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 896);
if (updateMode===2) {
                    _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 897);
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
            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 913);
instance.fire(propertyName+'Change', payload);
        },

        /**
         * The default submitFunction of the 'submitbutton'-event. Will call the server with all Model's properties.
         * @method _defPluginSubmitFn
         * @protected
        */
        _syncModel : function(action) {
            _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "_syncModel", 921);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 922);
var instance = this,
                host = instance.host,
                destroyOptions, syncOptions, syncCallbacks;

            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 926);
syncOptions = instance.get('syncOptions');
            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 927);
syncCallbacks = instance.get('syncCallbacks');
            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 928);
if (action==='destroy') {
                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 929);
destroyOptions = syncOptions.destroy || {};
                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 930);
destroyOptions.remove = true;
                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 931);
host.destroy(destroyOptions, syncCallbacks.destroy);
            }
            else {
                _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 934);
host.sync(action, syncOptions[action], syncCallbacks[action]);
            }
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
                    _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "validator", 951);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 952);
return ((typeof val === 'number') && (val>0) && (val<=3600));
                },
                setter: function(val) {
                    _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "setter", 954);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 955);
var instance = this,
                        updateMode = instance.get('updateMode');
                    _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 957);
if (instance._autoSaveTimer) {
                        _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 958);
instance._autoSaveTimer.cancel();
                    }
                    _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 960);
if (updateMode===2) {
                        _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 961);
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
                    _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "validator", 986);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 987);
return Lang.isObject(v);
                }
            },
            /**
             * Object with the properties: <b>destroy</b>, <b>save</b> and <b>submit</b>. For every property you might want to
             * specify a callbackFunction.
             * @attribute syncCallbacks
             * @type Object
             * @default {}
             * @since 0.1
            */
            syncCallbacks : {
                value: {},
                validator: function(val) {
                    _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "validator", 1000);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1001);
return Lang.isObject(val);
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
                    _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "validator", 1015);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1016);
return Lang.isObject(val);
                }
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
                    _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "validator", 1030);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1031);
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
                    _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "validator", 1048);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1049);
return ((typeof val === 'number') && (val>=0) && (val<=3));
                },
                setter: function(val) {
                    _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "setter", 1051);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1052);
var instance = this,
                        autosaveInterval = instance.get('autosaveInterval');
                    _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1054);
if (val) {
                        _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1055);
instance._autoSaveTimer = Y.later(
                            1000*autosaveInterval,
                            instance,
                            instance._autoStore,
                            null,
                            true
                        );
                    }
                    else {
                        _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1064);
if (instance._autoSaveTimer) {
                            _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1065);
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
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1076);
Y.augment(Y.Model, Y.Plugin.Host);

// now we need to set global eventhandlers, but only once.
// unfortunatly they need to keep in memory, even when unplugged.
// however: they only get there once, so no memoryleaks
  _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1081);
body.delegate(
      'click',
      function(e) {
          _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "(anonymous 15)", 1083);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1084);
var button = e.currentTarget,
              span = button.previous('span');
          // stop the original event to prevent double events
          _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1087);
e.halt();
          // set the focus manually. This will cause the View to be focussed as well --> now the focusmanager works for this View-instance
          _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1089);
button.focus();
          _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1090);
Y.use('gallery-itsadatetimepicker', function(Y) {
              _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "(anonymous 16)", 1090);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1091);
e.elementId = span.get('id');
              _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1092);
e.type = EVT_DATETIMEPICKER_CLICK;
              _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1093);
e.buttonNode = button;
              _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1094);
e.property = GET_PROPERTY_FROM_CLASS(span.getAttribute('class'));
              _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1095);
Y.fire(EVT_DATETIMEPICKER_CLICK, e);
          });
      },
      '.'+ITSABUTTON_DATETIME_CLASS
  );
  _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1100);
body.delegate(
      'valuechange',
      function(e) {
          _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "(anonymous 17)", 1102);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1103);
var inputnode = e.currentTarget;
          // seems that e.halt() cannot be called here ???
          _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1105);
e.elementId = inputnode.get('id');
          _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1106);
e.inputNode = inputnode;
          _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1107);
e.property = GET_PROPERTY_FROM_CLASS(inputnode.getAttribute('class'));
          _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1108);
e.type = EVT_VALUE_CHANGE;
          _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1109);
Y.fire(EVT_VALUE_CHANGE, e);
      },
      '.'+ITSAFORMELEMENT_LIFECHANGE_CLASS
  );
  _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1113);
body.delegate(
      'change',
      function(e) {
          _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "(anonymous 18)", 1115);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1116);
var inputnode = e.currentTarget;
          // seems that e.halt() cannot be called here ???
          _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1118);
e.elementId = inputnode.get('id');
          _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1119);
e.inputNode = inputnode;
          _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1120);
e.property = GET_PROPERTY_FROM_CLASS(inputnode.getAttribute('class'));
          _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1121);
e.type = EVT_INPUT_CHANGE;
          _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1122);
Y.fire(EVT_INPUT_CHANGE, e);
      },
      '.'+ITSAFORMELEMENT_LIFECHANGE_CLASS
  );
  _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1126);
body.delegate(
      'keypress',
      function(e) {
          _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "(anonymous 19)", 1128);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1129);
if (e.keyCode===13) {
              // stop the original event to prevent double events
              _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1131);
e.halt();
              _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1132);
var inputnode = e.currentTarget;
              // seems that e.halt() cannot be called here ???
              _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1134);
e.elementId = inputnode.get('id');
              _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1135);
e.inputNode = inputnode;
              _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1136);
e.property = GET_PROPERTY_FROM_CLASS(inputnode.getAttribute('class'));
              _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1137);
e.type = EVT_FOCUS_NEXT;
              _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1138);
Y.fire(EVT_FOCUS_NEXT, e);
          }
      },
      '.'+ITSAFORMELEMENT_ENTERNEXTFIELD_CLASS
  );
  _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1143);
body.delegate(
      'click',
      function(e) {
          _yuitest_coverfunc("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", "(anonymous 20)", 1145);
_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1146);
var button = e.currentTarget,
              classNames = button.getAttribute('class');
          // stop the original event to prevent double events
          _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1149);
e.halt();
          // set the focus manually. This will cause the View to be focussed as well --> now the focusmanager works for this View-instance
          _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1151);
button.focus();
          _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1152);
e.elementId = button.get('id');
          _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1153);
e.buttonNode = button;
          _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1154);
e.property = GET_PROPERTY_FROM_CLASS(button.getAttribute('class'));
          _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1155);
if (classNames.indexOf(SUBMIT_BUTTON_CLASS) !== -1) {
              _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1156);
e.type = EVT_SUBMIT_CLICK;
              _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1157);
Y.fire(EVT_INTERNAL+EVT_SUBMIT_CLICK, e);
          }
          else {_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1159);
if (classNames.indexOf(BUTTON_BUTTON_CLASS) !== -1) {
              _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1160);
e.type = EVT_BUTTON_CLICK;
              _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1161);
Y.fire(EVT_INTERNAL+EVT_BUTTON_CLICK, e);
          }
          else {_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1163);
if (classNames.indexOf(RESET_BUTTON_CLASS) !== -1) {
              _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1164);
e.type = EVT_RESET_CLICK;
              _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1165);
Y.fire(EVT_INTERNAL+EVT_RESET_CLICK, e);
          }
          else {_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1167);
if (classNames.indexOf(SAVE_BUTTON_CLASS) !== -1) {
              _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1168);
e.type = EVT_SAVE_CLICK;
              _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1169);
Y.fire(EVT_INTERNAL+EVT_SAVE_CLICK, e);
          }
          else {_yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1171);
if (classNames.indexOf(DESTROY_BUTTON_CLASS) !== -1) {
              _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1172);
e.type = EVT_DESTROY_CLICK;
              _yuitest_coverline("build/gallery-itsaeditmodel/gallery-itsaeditmodel.js", 1173);
Y.fire(EVT_INTERNAL+EVT_DESTROY_CLICK, e);
          }}}}}
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
