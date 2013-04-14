'use strict';

/**
 * ITSAEditModel Plugin
 *
 *
 * Plugin that extends Y.Model-instances (or plain objects) into having editable properties.
 * After pluged-in, Each property can be rendered into a form-element by using: <b>yourModelOrObject.itsaeditmodel.formelement()</b>
 * You can also retreive a copy of the model's (or object's) attributes with: <b>yourModelOrObject.itsaeditmodel.toJSON()</b>
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

// -- Public Static Properties -------------------------------------------------

/**
 * Internal list that holds event-references
 * @property _eventhandlers
 * @private
 * @type Array
 */

/**
 * The plugin's host, which should be a ScrollView-instance
 * @property host
 * @type ScrollView-instance
 */


var Lang = Y.Lang,
    YArray = Y.Array,
    YObject = Y.Object,
    MESSAGE_WARN_MODELCHANGED = 'The data you are editing has been changed from outside the form. '+
                                'If you save your data, then these former changed will be overridden.',
    EVT_DATETIMEPICKER_CLICK = 'editmodel:datetimepickerclick',
    ITSABUTTON_DATETIME_CLASS = 'itsa-button-datetime',
    ITSAFORMELEMENT_DATE_CLASS = 'itsa-datetimepicker-icondate',
    ITSAFORMELEMENT_TIME_CLASS = 'itsa-datetimepicker-icontime',
    ITSAFORMELEMENT_DATETIME_CLASS = 'itsa-datetimepicker-icondatetime',
    FORMELEMENT_CLASS = 'yui3-itsaformelement',
    ITSAFORMELEMENT_BUTTONTYPE_CLASS = FORMELEMENT_CLASS + '-inputbutton',
    ITSAFORMELEMENT_LIFECHANGE_CLASS = FORMELEMENT_CLASS + '-lifechange',
    ITSAFORMELEMENT_CHANGED_CLASS = FORMELEMENT_CLASS + '-changed',
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
        var regexp = /yui3-itsaformelement-property-(\w+)/;

        Y.log('_clearEventhandlers', 'info', 'Itsa-EditModel');
        return regexp.test(className) ? RegExp.$1 : null;
    },
    // next four events are declared within the initialiser:
    EVT_SUBMIT_CLICK = 'submitclick',
    EVT_SAVE_CLICK = 'saveclick',
    EVT_RESET_CLICK = 'resetclick',
    EVT_DESTROY_CLICK = 'destroyclick',
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
      * defaultFunction = calling then model's sync method with action=reset
      * @event buttonclick
      * @param e {EventFacade} Event Facade including:
      * @param e.buttonNode {Y.Node} The Button-Node that was clicked
      * @param e.property {String} The property-name of the Object (or the Model's attribute-name)
      * @param [e.model] {Y.Model} This modelinstance.
    **/
    EVT_BUTTON_CLICK = 'buttonclick',
   /**
     * Fired when an error occurs, such as when an attribute (or property) doesn't validate or when
     * the sync layer submit-function returns an error.
     * @event error
     * @param e {EventFacade} Event Facade including:
     * @param e.error {any} Error message.
     * @param e.src {String} Source of the error. May be one of the following (or any
     *                     custom error source defined by a Model subclass):
     *
     * `submit`: An error submitting the model from within a sync layer.
     *
     * `attributevalidation`: An error validating an attribute (or property). The attribute (or objectproperty)
     *                        that failed validation will be provided as the `attribute` property on the event facade.
     *
     * @param e.attribute {String} The attribute/property that failed validation.
     * @param e.validationerror {String} The errormessage in case of attribute-validation error.
    **/
    EVT_ERROR = 'error',
   /**
     * Fired after model is submitted from the sync layer.
     * @event submit
     * @param e {EventFacade} Event Facade including:
     * @param [e.options] {Object} The options=object that was passed to the sync-layer, if there was one.
     * @param [e.parsed] {Object} The parsed version of the sync layer's response to the submit-request, if there was a response.
     * @param [e.response] {any} The sync layer's raw, unparsed response to the submit-request, if there was one.
     * @since 0.1
    **/
    EVT_SUBMIT = 'submit',
   /**
     * Fired after the plugin is pluggedin and ready to be referenced by the host. This is LATER than after the 'init'-event,
     * because the latter will be fired before the namespace Model.itsaeditmodel exists.
     * @event pluggedin
     * @since 0.1
    **/
    EVT_PLUGGEDIN = 'pluggedin';

Y.namespace('Plugin').ITSAEditModel = Y.Base.create('itsaeditmodel', Y.Plugin.Base, [], {

        host : null,
        _eventhandlers : [],
        _itsaformelement : null,
        _originalObject : {},
        // internal backup of all property-configs
        _configAttrs : {},
        // internal backup of all rendered node-id's
        _elementIds : {},
        // internal flag that tells whether automaicly saving needs to happen in case properties have changed
        _needAutoSaved : false,
        _autoSaveTimer : null,
        _fireEventTimer : null,

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

            Y.log('initializer', 'info', 'Itsa-EditModel');
            host = instance.host = instance.get('host');
            if (instance.get('template') === null) {
                Y.log('You should add a template-attribute to Y.plugin.ITSAEditModel, or Views will render empty!', 'warn', 'Itsa-EditModel');
            }
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
            host.publish(
                EVT_SAVE_CLICK,
                {
                    defaultFn: Y.rbind(instance._defPluginSaveFn, instance)
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
            host.publish(
                EVT_DESTROY_CLICK,
                {
                    // DO NOT use _defDestroyFn --> this is used by the model itself and would make _defDestroyFn of the model
                    // to be excecuted when the plugin is unplugged (!????)
                    defaultFn: Y.rbind(instance._defPluginDestroyFn, instance)
                }
            );
            instance._bindUI();
            instance.addTarget(host);
            // now a VERY tricky one...
            // We need to fire an event that tells the plugin is pluged in, but it seemed that when listening in the host,
            // host.itsaeditmodel will be read imediately after the event fired --> this seems to be BEFORE the event is registred!!!
            // So, we wait until the real registering is finished and THEN fire the event!
            instance._fireEventTimer = Y.later(
                50,
                instance,
                function() {
                    if (host.itsaeditmodel) {
                        instance._fireEventTimer.cancel();
                        instance.fire(EVT_PLUGGEDIN);
                    }
                },
                null,
                true
            );
        },

        /**
         * Renderes the property into a formelement. Best you specify 'config', so the renderer knows at least its type.
         * Should you ommit 'config' then the renderer will try to find out the type automaticly.
         *
         * @method getFormelement
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
        getFormelement : function(propertyName, config, predefValue) {
            var instance = this,
                value = predefValue || instance.host.get(propertyName),
                useConfig = Y.merge(DEFAULTCONFIG, config || {}, {name: propertyName, value: value}),
                renderedFormElement, nodeId;

            Y.log('getFormelement', 'info', 'Itsa-EditModel');
            if (config) {
                instance._configAttrs[propertyName] = useConfig;
                if (!instance._elementIds[propertyName]) {
                    instance._elementIds[propertyName] = Y.guid();
                }
                nodeId = instance._elementIds[propertyName];
                renderedFormElement = instance._itsaformelement.render(useConfig, nodeId);
                // after rendering we are sure definitely sure what type we have (even if not specified)
                if (instance._isDateTimeType(useConfig.type)) {
                    Y.use('gallery-itsadatetimepicker');
                }
            }
            else {
                renderedFormElement = '';
            }
            return renderedFormElement;
        },

        /**
         * Renderes a copy of all object's properties, or in case of a Model, its attributes.
         * Should you ommit 'configAttrs' then the renderer will try to find out the types automaticly.
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
            var instance = this,
                host = instance.host,
                allproperties, useConfig, nodeId;

            Y.log('toJSON', 'info', 'Itsa-EditModel');
            if (configAttrs) {
                allproperties = Y.merge(host.getAttrs());
                // now modify all the property-values into formelements
                YObject.each(
                    allproperties,
                    function(value, key, object) {
                        useConfig = Y.merge(DEFAULTCONFIG, (configAttrs && configAttrs[key]) || {}, {name: key, value: value});
                        if (configAttrs[key]) {
                            configAttrs[key].name = key;
                            configAttrs[key].value = value;
                            if (!instance._elementIds[key]) {
                                instance._elementIds[key] = Y.guid();
                            }
                            nodeId = instance._elementIds[key];
                            object[key] = instance._itsaformelement.render(useConfig, nodeId);
                        }
                        else {
                            delete object[key];
                        }
                    }
                );
            }
            else {
                allproperties = '';
            }
            instance._configAttrs = configAttrs;
            return allproperties;
        },

        /**
         * Cleans up bindings and removes plugin
         * @method destructor
         * @protected
         * @since 0.1
        */
        destructor : function() {
            var instance = this;
            Y.log('destructor', 'info', 'Itsa-EditModel');
            if (instance._autoSaveTimer) {
                instance._autoSaveTimer.cancel();
            }
            instance._clearEventhandlers();
            instance._itsaformelement.destroy();
            instance._originalObject = {};
            instance._configAttrs = {};
            instance._elementIds = {};
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
            var instance = this;

            Y.log('_autoStore', 'info', 'Itsa-EditModel');
            if (instance._needAutoSaved) {
                instance._editFieldsToModel();
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
            var instance = this,
                eventhandlers = instance._eventhandlers;

            Y.log('_bindUI', 'info', 'Itsa-EditModel');
            eventhandlers.push(
                Y.on(
                    EVT_DATETIMEPICKER_CLICK,
                    function(e) {
                        var button = e.buttonNode,
                            span = button.one('span'),
                            valuespan = button.previous('span'),
                            picker = Y.ItsaDateTimePicker,
                            propertyName = e.property,
                            propertyconfig = instance._configAttrs[propertyName],
                            value = instance.host.get(propertyName),
                            widgetconfig = (propertyconfig && propertyconfig.widgetConfig) || {},
                            promise;
                        if (e.elementId===instance._elementIds[propertyName]) {
                            if (span.hasClass(ITSAFORMELEMENT_DATE_CLASS)) {
                                promise = Y.rbind(picker.getDate, picker);
                            }
                            else if (span.hasClass(ITSAFORMELEMENT_TIME_CLASS)) {
                                promise = Y.rbind(picker.getTime, picker);
                            }
                            else if (span.hasClass(ITSAFORMELEMENT_DATETIME_CLASS)) {
                                promise = Y.rbind(picker.getDateTime, picker);
                            }
                            widgetconfig.alignToNode = button;
                            promise(value, widgetconfig).then(
                                function(newdate) {
                                    var newRenderedElement;
                                    instance._storeProperty(valuespan, propertyName, newdate, true);
                                    // because _setProperty setts the attribute with {fromEditModel: true},
                                    // the view does not re-render. We change the fieldvalue ourselves
                                    // first ask for ITSAFormElement how the render will look like
                                    // then axtract the value from within
                                    newRenderedElement = instance.getFormelement(propertyName, propertyconfig, propertyconfig.value);
                                    valuespan.setHTML(instance._getDateTimeValueFromRender(newRenderedElement));
                                    button.focus();
                                },
                                function() {
                                    button.focus();
                                }
                            );
                        }
                    }
                )
            );
            eventhandlers.push(
                Y.on(
                    [EVT_RESET_CLICK, EVT_SUBMIT_CLICK, EVT_SAVE_CLICK, EVT_BUTTON_CLICK, EVT_DESTROY_CLICK],
                    function(e) {
                        if (e.elementId===instance._elementIds[e.property]) {
                            // stop the original event to prevent double events
                            e.halt();
                            // make the host fire the event
                            instance._fireModelEvent(e.type, e);
                        }
                    }
                )
            );
            eventhandlers.push(
                Y.on(
                    EVT_VALUE_CHANGE,
                    function(e) {
                        if (e.elementId===instance._elementIds[e.property]) {
                            instance._storeProperty(e.inputNode, e.property, e.inputNode.get('value'));
                        }
                    }
                )
            );
            eventhandlers.push(
                Y.on(
                    EVT_INPUT_CHANGE,
                    function(e) {
                        if (e.elementId===instance._elementIds[e.property]) {
                            instance._storeProperty(e.inputNode, e.property, e.inputNode.get('value'), true);
                        }
                    }
                )
            );
            //============================================================================================
            // if the model gets changed and it wasn't this module, than fire an event.
            // So the developer can use this to listen for these changes and rect on them
            instance.host.on(
                '*:change',
                function() {
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
            Y.log('_clearEventhandlers', 'info', 'Itsa-EditModel');
            YArray.each(
                this._eventhandlers,
                function(item){
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
            var instance = this;

            Y.log('_defPluginDestroyFn', 'info', 'Itsa-EditModel');
            instance._needAutoSaved = false;
            instance._syncModel('destroy');
        },

        /**
         * The default submitFunction of the 'resetbutton'-event. Will call the server with all Model's properties.
         * @method _defPluginResetFn
         * @protected
        */
        _defPluginResetFn : function() {
            var instance = this;

            Y.log('_defPluginResetFn will reset the Modeldata', 'info', 'Itsa-EditModel');
            instance._needAutoSaved = false;
            instance.host.reset();
        },

        /**
         * The default submitFunction of the 'savebutton'-event. Will call the server with all Model's properties.
         * @method _defPluginSaveFn
         * @protected
        */
        _defPluginSaveFn : function() {
            Y.log('_defPluginSaveFn', 'info', 'Itsa-EditModel');
            this._defStoreFn('save');
        },

        /**
         * Function that is used by _defPluginSaveFn and _defPluginSubmitFn to store the modelvalues.
         * @method _defPluginSaveFn
         * @protected
        */
        _defStoreFn : function(mode) {
            var instance = this,
                updateMode = instance.get('updateMode');

            Y.log('_defStoreFn', 'info', 'Itsa-EditModel');
            instance._needAutoSaved = false;
            if (updateMode!==3) {
                instance._editFieldsToModel();
            }
            instance._syncModel(mode);
        },

        /**
         * The default submitFunction of the 'submitbutton'-event. Will call the server with all Model's properties.
         * @method _defPluginSubmitFn
         * @protected
        */
        _defPluginSubmitFn : function() {
            Y.log('_defPluginSubmitFn', 'info', 'Itsa-EditModel');
            this._defStoreFn('submit');
        },

        /**
         * Transports the formelement-values to the model or object
         *
         * @method _editFieldsToModel
         * @since 0.1
         *
        */
        _editFieldsToModel: function() {
            var instance = this,
                configAttrs = instance._configAttrs,
                newModelAttrs = {};

            Y.log('_editFieldsToModel', 'info', 'Itsa-EditModel');
            YObject.each(
                configAttrs,
                function(propertyvalue, property) {
                    newModelAttrs[property] = propertyvalue.value;
                }
            );
            instance._setProperty(null, newModelAttrs);
        },

        /**
         * Returns the value of a property (or in case of Model, the attribute). Regardless which type the host is.
         *
         * @method _fireModelEvent
         * @param propertyName {String} Propertyname or -in case or Model- attribute-name.
         * @return {Any} Attribute value, or `undefined` if the attribute doesn't exist, or 'null' if no model is passed.
         * @since 0.1
         *
        */
        _fireModelEvent: function(eventName, eventPayload) {
            var host = this.host;

            Y.log('_fireModelEvent', 'info', 'Itsa-EditModel');
            eventPayload.model = host;
            host.fire(eventName, eventPayload);
        },

        _getDateTimeValueFromRender : function(renderedElement) {
            var regexp = /<span[^>]+>([^<]*)</;

            Y.log('_getDateTimeValueFromRender', 'info', 'Itsa-EditModel');
            return regexp.test(renderedElement) ? RegExp.$1 : '';
        },

        _isDateTimeType : function(type) {
            Y.log('_isDateTime', 'info', 'Itsa-EditModel');
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
         * @since 0.1
         *
        */
        _setProperty: function(propertyName, value) {
            var instance = this,
                host = instance.host,
                options = {fromEditModel: true}, // set Attribute with option: '{fromEditModel: true}' --> now the view knows it must not re-render.
                propertyconfig;

            Y.log('_setProperty', 'info', 'Itsa-EditModel');
            propertyconfig = instance._configAttrs[propertyName];
            if (propertyconfig) {
                propertyconfig.value = value;
            }
            if (propertyName) {
                host.set(propertyName, value, options);
            }
            else {
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
         * @since 0.1
         *
        */
        _storeProperty: function(node, propertyName, value, finished) {
            var instance = this,
                updateMode = instance.get('updateMode'),
                propertyconfig, setProperty;

            Y.log('_storeProperty', 'info', 'Itsa-EditModel');
            propertyconfig = instance._configAttrs[propertyName];
            if (propertyconfig) {
                propertyconfig.value = value;
            }
            setProperty = ((updateMode===3) || ((updateMode===1) && finished));
            if (setProperty) {
                instance._setProperty(propertyName, value);
            }
            else {
                node.addClass(ITSAFORMELEMENT_CHANGED_CLASS);
                if (updateMode===2) {
                    instance._needAutoSaved = true;
                }
            }
        },

        /**
         * The default submitFunction of the 'submitbutton'-event. Will call the server with all Model's properties.
         * @method _defPluginSubmitFn
         * @protected
        */
        _syncModel : function(action) {
            var instance = this,
                host = instance.host,
                destroyOptions, syncOptions, syncCallbacks;

            Y.log('_syncModel will sync with action: '+action, 'info', 'Itsa-EditModel');
            syncOptions = instance.get('syncOptions');
            syncCallbacks = instance.get('syncCallbacks');
            if (action==='destroy') {
                destroyOptions = syncOptions.destroy || {};
                destroyOptions.remove = true;
                host.destroy(destroyOptions, syncCallbacks.destroy);
            }
            else {
                host.sync(action, syncOptions[action] , syncCallbacks[action]);
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
                    return ((typeof val === 'number') && (val>0) && (val<=3600));
                },
                setter: function(val) {
                    Y.log('autosaveInterval setter: '+val, 'info', 'Itsa-EditModel');
                    var instance = this,
                        updateMode = instance.get('updateMode');
                    if (instance._autoSaveTimer) {
                        instance._autoSaveTimer.cancel();
                    }
                    if (updateMode===2) {
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
                    return Lang.isObject(val);
                }
            },
            /**
             * Object with the properties: <b>destroy</b>, <b>save</b> and <b>submit</b>. For every property you might want to
             * specify the options-object that will be passed through to the sync- or destroy-method. The destroymethod will
             * <i>always</i> be called with 'remove=true', in order to call the sync-method.
             * @attribute syncCallbacks
             * @type Object
             * @default {}
             * @since 0.1
            */
            syncOptions : {
                value: {},
                validator: function(val) {
                    return Lang.isObject(val);
                }
            },
            /**
             * Template of how to render the model in the view. You can <b>only use Y.Lang.sub templates</b> where the attribute/properties
             * should be specified between brackets. Example: 'Name: {firstname} {lastname}'.
             * @attribute template
             * @type String
             * @default null
             * @since 0.1
            */
            template : {
                value: null,
                validator: function(val) {
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
                    return ((typeof val === 'number') && (val>=0) && (val<=3));
                },
                setter: function(val) {
                    Y.log('updateMode setter: '+val, 'info', 'Itsa-EditModel');
                    var instance = this,
                        autosaveInterval = instance.get('autosaveInterval');
                    if (val) {
                        instance._autoSaveTimer = Y.later(
                            1000*autosaveInterval,
                            instance,
                            instance._autoStore,
                            null,
                            true
                        );
                    }
                    else {
                        if (instance._autoSaveTimer) {
                            instance._autoSaveTimer.cancel();
                        }
                    }
                }
            }
        }
    }
);

// now we need to set global eventhandlers, but only once.
// unfortunatly they need to keep in memory, even when unplugged.
// however: they only get there once, so no memoryleaks
function ITSAEditModelExtention() {}
if (!Y.Global.ITSAEditModelInstalled) {
    Y.Global.ITSAEditModelInstalled = true;
    // -- Mixing extra Methods to Y.Model -----------------------------------
    Y.mix(ITSAEditModelExtention.prototype, {
       /**
         * Submits this model to the server.
         *
         * This method delegates to the `sync()` method to perform the actual submit
         * operation, which is an asynchronous action. Specify a _callback_ function to
         * be notified of success or failure.
         *
         * A successful submit-operation will fire a `submit` event, while an unsuccessful
         * submit operation will fire an `error` event with the `src` value "submit".
         *
         * @method submit
         * @param {Object} [options] Options to be passed to `sync()`. It's up to the custom sync
         *                 implementation to determine what options it supports or requires, if any.
         * @param {callback} [callback] Called when the sync operation finishes.
         * @param {Error|null} callback.err If an error occurred, this parameter will
         *                     contain the error. If the sync operation succeeded, _err_ will be `null`.
         * @param {Any} callback.response The server's response. This value is set within e.response of the 'submit' event.
         *              This value will also  be tried to parse using Y.JSON.parse method. If this succeeds, the eventFacade of the 'submit'
         *              will have the parsed value set within a.parse.
         * @chainable
        **/
        submit: function (options, callback) {
            var self = this;

            // Allow callback as only arg.
            if (typeof options === 'function') {
                callback = options;
                options  = {};
            }
            options = options || {};
            self.sync('submit', options, function (err, response) {
                var facade = {
                        options : options,
                        response: response
                    };
                if (err) {
                    facade.error = err;
                    facade.src   = 'submit';
                    self.fire(EVT_ERROR, facade);
                }
                else {
                    // Lazy publish.
                    if (!self._submitEvent) {
                        self._submitEvent = self.publish(EVT_SUBMIT, {
                            preventable: false
                        });
                    }
                    try {
                       facade.parsed = Y.JSON.parse(response);
                    } catch (ex) {}
                    self.fire(EVT_SUBMIT, facade);
                }
                if (callback) {
                    callback.apply(null, arguments);
                }
            });
            return self;
        }
    }, true);
    Y.ITSAEditModelExtention = ITSAEditModelExtention;
    Y.Base.mix(Y.Model, [ITSAEditModelExtention]);
    //===============================================================================================
    var body = Y.one('body');
    body.delegate(
        'click',
        function(e) {
            var button = e.currentTarget,
                span = button.previous('span');
            // stop the original event to prevent double events
            e.halt();
            // set the focus manually. This will cause the View to be focussed as well --> now the focusmanager works for this View-instance
            button.focus();
            Y.use('gallery-itsadatetimepicker', function(Y) {
                e.elementId = span.get('id');
                e.type = EVT_DATETIMEPICKER_CLICK;
                e.buttonNode = button;
                e.property = GET_PROPERTY_FROM_CLASS(span.getAttribute('class'));
                Y.fire(EVT_DATETIMEPICKER_CLICK, e);
            });
        },
        '.'+ITSABUTTON_DATETIME_CLASS
    );
    body.delegate(
        'valuechange',
        function(e) {
            var inputnode = e.currentTarget;
            // seems that e.halt() cannot be called here ???
            e.elementId = inputnode.get('id');
            e.inputNode = inputnode;
            e.property = GET_PROPERTY_FROM_CLASS(inputnode.getAttribute('class'));
            e.type = EVT_VALUE_CHANGE;
            Y.fire(EVT_VALUE_CHANGE, e);
        },
        '.'+ITSAFORMELEMENT_LIFECHANGE_CLASS
    );
    body.delegate(
        'change',
        function(e) {
            var inputnode = e.currentTarget;
            // seems that e.halt() cannot be called here ???
            e.elementId = inputnode.get('id');
            e.inputNode = inputnode;
            e.property = GET_PROPERTY_FROM_CLASS(inputnode.getAttribute('class'));
            e.type = EVT_INPUT_CHANGE;
            Y.fire(EVT_INPUT_CHANGE, e);
        },
        '.'+ITSAFORMELEMENT_LIFECHANGE_CLASS
    );
    body.delegate(
        'click',
        function(e) {
            var button = e.currentTarget,
                classNames = button.getAttribute('class');
            // stop the original event to prevent double events
            e.halt();
            // set the focus manually. This will cause the View to be focussed as well --> now the focusmanager works for this View-instance
            button.focus();
            e.elementId = button.get('id');
            e.buttonNode = button;
            e.property = GET_PROPERTY_FROM_CLASS(button.getAttribute('class'));
            if (classNames.indexOf(SUBMIT_BUTTON_CLASS) !== -1) {
                e.type = EVT_SUBMIT_CLICK;
                Y.fire(EVT_SUBMIT_CLICK, e);
            }
            else if (classNames.indexOf(BUTTON_BUTTON_CLASS) !== -1) {
                e.type = EVT_BUTTON_CLICK;
                Y.fire(EVT_BUTTON_CLICK, e);
            }
            else if (classNames.indexOf(RESET_BUTTON_CLASS) !== -1) {
                e.type = EVT_RESET_CLICK;
                Y.fire(EVT_RESET_CLICK, e);
            }
            else if (classNames.indexOf(SAVE_BUTTON_CLASS) !== -1) {
                e.type = EVT_SAVE_CLICK;
                Y.fire(EVT_SAVE_CLICK, e);
            }
            else if (classNames.indexOf(DESTROY_BUTTON_CLASS) !== -1) {
                e.type = EVT_DESTROY_CLICK;
                Y.fire(EVT_DESTROY_CLICK, e);
            }
        },
        '.'+ITSAFORMELEMENT_BUTTONTYPE_CLASS
    );
}