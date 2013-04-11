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
    DATETIMEPICKER_CLICK = 'editmodel:datetimepickerclick',
    ITSABUTTON_DATETIME_CLASS = 'itsa-button-datetime',
    ITSAFORMELEMENT_DATE_CLASS = 'itsa-datetimepicker-icondate',
    ITSAFORMELEMENT_TIME_CLASS = 'itsa-datetimepicker-icontime',
    ITSAFORMELEMENT_DATETIME_CLASS = 'itsa-datetimepicker-icondatetime',
    FORMELEMENT_CLASS = 'yui3-itsaformelement',
    ITSAFORMELEMENT_BUTTONTYPE_CLASS = FORMELEMENT_CLASS + '-inputbutton',
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
      * Event fired a normal button (elementtype) is clicked.
      * defaultFunction = calling then model's sync method with action=reset
      * @event buttonclick
      * @param e {EventFacade} Event Facade including:
      * @param e.button {Y.Node} The Button-Node that was clicked
      * @param e.property {String} The property-name of the Object (or the Model's attribute-name)
      * @param [e.model] {Y.Model} This modelinstance. In case of an object, this value might be undefined,
      *        unless the attribute 'lazyModellist' is defined. In that case the Model can be revived.
    **/
    EVT_BUTTON_CLICK = 'buttonclick',
   /**
     * Fired when an error occurs, such as when an attribute (or property) doesn't validate or when
     * the sync layer submit-function returns an error.
     * @event error
     * @param {Any} error Error message.
     * @param {String} src Source of the error. May be one of the following (or any
     *                     custom error source defined by a Model subclass):
     *
     * `submit`: An error submitting the model from within a sync layer.
     *
     * `attributevalidation`: An error validating an attribute (or property). The attribute (or objectproperty)
     *                        that failed validation will be provided as the `attribute` property on the event facade.
     *
     * @param {String} attribute The attribute/property that failed validation.
     * @param {String} validationerror The errormessage in case of attribute-validation error.
    **/
    EVT_ERROR = 'error',
   /**
     * Fired after model is submitted from the sync layer.
     * @event submit
     * @param {Object} [options] The options=object that was passed to the sync-layer, if there was one.
     * @param {Object} [parsed] The parsed version of the sync layer's response to the submit-request, if there was a response.
     * @param {any} [response] The sync layer's raw, unparsed response to the submit-request, if there was one.
     * @since 0.1
    **/
    EVT_SUBMIT = 'submit';

Y.namespace('Plugin').ITSAEditModel = Y.Base.create('itsaeditmodel', Y.Plugin.Base, [], {

        host : null,
        _eventhandlers : [],
        _itsaformelement : null,
        _hostIsModel : null,
        _originalObject : {},
        // internal backup of all property-configs
        _configAttrs : {},

        /**
         * Sets up the toolbar during initialisation. Calls render() as soon as the hosts-editorframe is ready
         *
         * @method initializer
         * @protected
         * @since 0.1
         */
        initializer : function() {
            var instance = this,
                host, hostIsModel;

            Y.log('initializer', 'info', 'Itsa-EditModel');
            host = instance.host = instance.get('host');
            hostIsModel = instance._hostIsModel = host.get && (typeof host.get === 'function');
            if (!hostIsModel) {
                // backup objectproperties so we can reset
                instance._originalObject = Y.merge(host);
            }
            instance._itsaformelement = new Y.ITSAFormElement();

            /**
              * Event fired the submitbutton is clicked.
              * defaultFunction = calling then model's sync method with action=submit
              * @event submitclick
              * @param e {EventFacade} Event Facade including:
              * @param e.button {Y.Node} The Button-Node that was clicked
              * @param e.property {String} The property-name of the Object (or the Model's attribute-name)
              * @param [e.model] {Y.Model} This modelinstance. In case of an object, this value might be undefined,
              *        unless the attribute 'lazyModellist' is defined. In that case the Model can be revived.
            **/
            host.publish(
                EVT_SUBMIT_CLICK,
                {
                    defaultFn: instance._defSubmitFn,
                    context: instance
                }
            );
            /**
              * Event fired the resetbutton is clicked.
              * defaultFunction = calling then model's sync method with action=reset
              * @event resetclick
              * @param e {EventFacade} Event Facade including:
              * @param e.button {Y.Node} The Button-Node that was clicked
              * @param e.property {String} The property-name of the Object (or the Model's attribute-name)
              * @param [e.model] {Y.Model} This modelinstance. In case of an object, this value might be undefined,
              *        unless the attribute 'lazyModellist' is defined. In that case the Model can be revived.
            **/
            host.publish(
                EVT_RESET_CLICK,
                {
                    defaultFn: instance._defResetFn,
                    context: instance
                }
            );
            /**
              * Event fired the savebutton is clicked.
              * defaultFunction = calling then model's sync method with action=submit
              * @event saveclick
              * @param e {EventFacade} Event Facade including:
              * @param e.button {Y.Node} The Button-Node that was clicked
              * @param e.property {String} The property-name of the Object (or the Model's attribute-name)
              * @param [e.model] {Y.Model} This modelinstance. In case of an object, this value might be undefined,
              *        unless the attribute 'lazyModellist' is defined. In that case the Model can be revived.
            **/
            host.publish(
                EVT_SAVE_CLICK,
                {
                    defaultFn: instance._defSaveFn,
                    context: instance
                }
            );
            /**
              * Event fired the destroybutton is clicked.
              * defaultFunction = calling then model's sync method with action=submit
              * @event destroyclick
              * @param e {EventFacade} Event Facade including:
              * @param e.button {Y.Node} The Button-Node that was clicked
              * @param e.property {String} The property-name of the Object (or the Model's attribute-name)
              * @param [e.model] {Y.Model} This modelinstance. In case of an object, this value might be undefined,
              *        unless the attribute 'lazyModellist' is defined. In that case the Model can be revived.
            **/
            host.publish(
                EVT_DESTROY_CLICK,
                {
                    defaultFn: instance._defDestroyFn,
                    context: instance
                }
            );
            instance._bindUI();
        },

        /**
         * Renderes the property into a formelement. Best you specify 'config', so the renderer knows at least its type.
         * Should you ommit 'config' then the renderer will try to find out the type automaticly.
         *
         * @method getFormelement
         * @param propertyName {String} the property (or attribute in case of Model) which should be rendered to a formelement
         * @param config {String} config that is passed through to ItsaFormElement
         * @param config.type {String} Property-type --> see ItsaFormElement for the attribute 'type' for further information.
         * @param config.keyValidation {Function} Validation during every keypress.
         * @param config.validation {Function} Validation after changing the value (onblur). The function should return true or false.
         * @param config.validationMessage {String} The message that will be returned on a validationerror.
         * @param config.autoCorrection {Function} If set, inputvalue will be replaced by the returnvalue of this function.
         * @param config.className {String} Additional className that is passed on the value, during rendering.
         * @param config.dateFormat {String} To format a Date-value.
         * @param config.initialFocus {Boolean} Whether this element should have the initial focus.
         * @param config.selectOnFocus {Boolean} Whether this element should completely be selected when it gets focus.
         * @param config.widgetConfig {Object} Config that will be added to the underlying widget (in case of Date/Time values).
         * @return {String} property (or attributes), rendered as a form-element. The rendered String should be added to the DOM yourself.
         * @since 0.1
         */
        getFormelement : function(propertyName, config) {
            var instance = this,
                useConfig = Y.merge(DEFAULTCONFIG, config || {}, {name: propertyName, value: instance._getProperty(propertyName)}),
                renderedFormElement;

            Y.log('getFormelement', 'info', 'Itsa-EditModel');
            instance._configAttrs[propertyName] = useConfig;
            renderedFormElement = instance._itsaformelement.render(useConfig);
            // after rendering we are sure definitely sure what type we have (even if not specified)
            if (instance._isDateTimeType(useConfig.type)) {
                Y.use('gallery-itsadatetimepicker');
            }
            return renderedFormElement;
        },

        /**
         * Renderes a copy of all object's properties, or in case of a Model, its attributes.
         * Should you ommit 'configAttrs' then the renderer will try to find out the types automaticly.
         *
         * @method toJSON
         * @param [configAttrs] {Object} Every property of the host object/model can be defined as a property of configAttrs as well.
         * The value should be an object as well: the config of the property that is passed to the ITSAFormElement.
         * @param [configAttrs.hostProperty1] {Object} config of hostProperty1 (as example, you should use a real property here)
         * @param [configAttrs.hostProperty2] {Object} config of hostProperty2 (as example, you should use a real property here)
         * @param [configAttrs.hostProperty3] {Object} config of hostProperty3 (as example, you should use a real property here)
         * @return {Object} Copy of the host's objects or model's attributes, rendered as form-elements.
         * The rendered String should be added to the DOM yourself.
         * @since 0.1
         */
        toJSON : function(configAttrs) {
            var instance = this,
                host = instance.host,
                allproperties, useConfig;

            Y.log('toJSON', 'info', 'Itsa-EditModel');
            allproperties = Y.merge(instance._hostIsModel ? host.getAttrs() : host);
            // now modify all the property-values into formelements
            YObject.each(
                allproperties,
                function(value, key, object) {
                    useConfig = Y.merge(DEFAULTCONFIG, (configAttrs && configAttrs[key]) || {}, {name: key, value: value});
                    configAttrs[key].name = key;
                    configAttrs[key].value = value;
                    object[key] = instance._itsaformelement.render(useConfig);
                }
            );
            instance._configAttrs = configAttrs;
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
            instance._clearEventhandlers();
            instance._itsaformelement.destroy();
        },

        //===============================================================================================
        // private methods
        //===============================================================================================

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

            eventhandlers.push(
                Y.on(
                    DATETIMEPICKER_CLICK,
                    function(e) {
                        var button = e.button,
                            span = button.one('span'),
                            valuespan = button.previous('span'),
                            picker = Y.ItsaDateTimePicker,
                            propertyName = GET_PROPERTY_FROM_CLASS(valuespan.getAttribute('class')),
                            propertyconfig = instance._configAttrs[propertyName],
                            value = instance._getProperty(propertyName),
                            widgetconfig = (propertyconfig && propertyconfig.widgetConfig) || {},
                            promise;
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
                                instance._setProperty(propertyName, newdate);
                                // because _setProperty setts the attribute with {fromEditModel: true},
                                // the view does not re-render. We change the fieldvalue ourselves
                                // first ask for ITSAFormElement how the render will look like
                                // then axtract the value from within
                                newRenderedElement = instance.getFormelement(propertyName, propertyconfig);
                                valuespan.setHTML(instance._getDateTimeValueFromRender(newRenderedElement));
                            }
                        );
                    }
                )
            );
            eventhandlers.push(
                Y.on(
                    [EVT_RESET_CLICK, EVT_SUBMIT_CLICK, EVT_SAVE_CLICK, EVT_BUTTON_CLICK, EVT_DESTROY_CLICK],
                    function(e) {
                        // stop the original event to prevent double events
                        e.halt();
                        // make the host fire the event
                        instance._fireModelEvent(e.type, e);
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
         * @method _defDestroyFn
         * @protected
        */
        _defDestroyFn : function() {
            this._syncModel('destroy');
        },

        /**
         * The default submitFunction of the 'resetbutton'-event. Will call the server with all Model's properties.
         * @method _defResetFn
         * @protected
        */
        _defResetFn : function() {
            var instance = this,
                canSync = instance._hostIsModel,
                host = instance.host,
                model, lazymodellist;

            if (canSync) {
                model = host;
            }
            else {
                lazymodellist = instance.get('lazymodellist');
                model = lazymodellist && lazymodellist.revive(host);
            }
            if (model) {
                Y.log('_defResetFn will reset the Modeldata', 'info', 'Itsa-EditModel');
                model.reset();
            }
            else {
                Y.log('_defResetFn will reset the Objectdata', 'info', 'Itsa-EditModel');
                instance.host = Y.merge(instance._originalObject);
            }
        },

        /**
         * The default submitFunction of the 'savebutton'-event. Will call the server with all Model's properties.
         * @method _defSaveFn
         * @protected
        */
        _defSaveFn : function() {
            this._syncModel('save');
        },

        /**
         * The default submitFunction of the 'submitbutton'-event. Will call the server with all Model's properties.
         * @method _defSubmitFn
         * @protected
        */
        _defSubmitFn : function() {
            this._syncModel('submit');
        },

        /**
         * Returns the value of a property (or in case of Model, the attribute). Regardless which type the host is.
         *
         * @method _fireModelEvent
         * @param propertyName {String} Propertyname or -in case od Model- attribute-name.
         * @return {Any} Attribute value, or `undefined` if the attribute doesn't exist, or 'null' if no model is passed.
         * @since 0.1
         *
        */
        _fireModelEvent: function(eventName, eventPayload) {
            var instance = this,
                host = this.host,
                revivedModel, lazymodellist;

            Y.log('_fireModelEvent', 'info', 'Itsa-EditModel');
            if (!this._hostIsModel) {
                lazymodellist = instance.get('lazymodellist');
                revivedModel = lazymodellist && lazymodellist.revive(host);
                if (revivedModel) {
                    // set Attribute with option: '{fromEditModel: true}' --> now the view knows it must not re-render
                    eventPayload.model = revivedModel;
                    revivedModel.fire(eventName, eventPayload);
                    lazymodellist.free(revivedModel);
                }
                else {
                    // re-fire to Y, without model-property
                    Y.fire(eventName, eventPayload);
                }
            }
            else {
                eventPayload.model = host;
                host.fire(eventName, eventPayload);
            }
        },

        _getDateTimeValueFromRender : function(renderedElement) {
            var regexp = /<span[^>]+>([^<]*)</;

            Y.log('_getDateTimeValueFromRender', 'info', 'Itsa-EditModel');
            return regexp.test(renderedElement) ? RegExp.$1 : '';
        },

        /**
         * Returns the value of a property (or in case of Model, the attribute). Regardless which type the host is.
         *
         * @method _getProperty
         * @param propertyName {String} Propertyname or -in case od Model- attribute-name.
         * @return {Any} Attribute value, or `undefined` if the attribute doesn't exist, or 'null' if no model is passed.
         * @since 0.1
         *
        */
        _getProperty: function(propertyName) {
            var host = this.host;

            Y.log('_getProperty', 'info', 'Itsa-EditModel');
            return propertyName && (this._hostIsModel ? host.get(propertyName) : host[propertyName]);
        },

        _isDateTimeType : function(type) {
            Y.log('_isDateTime', 'info', 'Itsa-EditModel');
            return (type==='date') || (type==='time') || (type==='datetime');
        },

        /**
         * Returns the value of a property (or in case of Model, the attribute). Regardless which type the host is.
         *
         * @method _setProperty
         * @param propertyName {String} Propertyname or -in case od Model- attribute-name.
         * @return {Any} Attribute value, or `undefined` if the attribute doesn't exist, or 'null' if no model is passed.
         * @since 0.1
         *
        */
        _setProperty: function(propertyName, value) {
            var instance = this,
                host = instance.host,
                revivedModel, lazymodellist, propertyconfig;

            Y.log('_getModelAttr', 'info', 'Itsa-EditModel');
            propertyconfig = instance._configAttrs[propertyName];
            if (propertyconfig) {
                propertyconfig.value = value;
            }
            if (!this._hostIsModel) {
                lazymodellist = instance.get('lazymodellist');
                revivedModel = lazymodellist && lazymodellist.revive(host);
                if (revivedModel) {
                    // set Attribute with option: '{fromEditModel: true}' --> now the view knows it must not re-render
                    revivedModel.set(propertyName, value, {fromEditModel: true});
                    lazymodellist.free(revivedModel);
                }
                else {
                    host[propertyName] = value;
                }
            }
            else {
                // set Attribute with option: '{fromEditModel: true}' --> now the view knows it must not re-render
                host.set(propertyName, value, {fromEditModel: true});
            }
        },

        /**
         * The default submitFunction of the 'submitbutton'-event. Will call the server with all Model's properties.
         * @method _defSubmitFn
         * @protected
        */
        _syncModel : function(action) {
            var instance = this,
                canSync = instance._hostIsModel,
                host = instance.host,
                model, destroyOptions, lazymodellist, syncOptions, syncCallbacks;

            if (canSync) {
                model = host;
            }
            else {
                lazymodellist = instance.get('lazymodellist');
                model = lazymodellist && lazymodellist.revive(host);
            }
            if (model && model.sync) {
                Y.log('_syncModel will sync with action: '+action, 'info', 'Itsa-EditModel');
                syncOptions = instance.get('syncOptions');
                syncCallbacks = instance.get('syncCallbacks');
                if (action==='destroy') {
                    destroyOptions = syncOptions.destroy;
                    destroyOptions.remove = true;
                    model.destroy(destroyOptions, syncCallbacks.destroy);
                }
                else {
                    model.sync(action, syncOptions[action] , syncCallbacks[action]);
                }
            }
            else {
                if (action==='destroy') {
                    Y.log('_syncModel will destroy object withou syncing', 'info', 'Itsa-EditModel');
                    instance.host = {};
                    // can we let the object fire a destroy-event???
                    // instance.host.fire(EVT_DESTROY);
                }
                else {
                    Y.log('_syncModel cannot sync '+action+' --> host is object instead of Model and cannot be revived!', 'warn', 'Itsa-EditModel');
                }
            }
        }

    }, {
        NS : 'itsaeditmodel',
        ATTRS : {
            /**
             * If the host is part of a LazyModelList, then you need to define it here.
             * By doing so, you will be sure that changes to the host will be fired by reviving the object.
             * @attribute lazyModellist
             * @type LazyModelList
             * @default null
             * @since 0.1
            */
            lazyModellist : {
                value: null,
                validator: function(val) {
                    return (typeof val === Y.LazyModelList);
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
             * Object with the properties: <b>destroy</b>, <b>save</b> and <b>submit</b>. For every property you might want to
             * specify the options-object that will be passed through to the sync- or destroy-method. The destroymethod will
             * <i>always</i> be called with 'remove=true', in order to call the sync-method.
             * @attribute updateMode
             * @type Int
             * @default 0
             * @since 0.1
            */
            updateMode : {
                value: 0,
                validator: function(val) {
                    return ((typeof val === 'number') && (val>=0) && (val<=3));
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
            // stop the original event to prevent double events
            e.halt();
            Y.use('gallery-itsadatetimepicker', function(Y) {
                e.type = DATETIMEPICKER_CLICK;
                Y.fire(DATETIMEPICKER_CLICK, e);
            });
        },
        '.'+ITSABUTTON_DATETIME_CLASS
    );
    body.delegate(
        'click',
        function(e) {
            var button = e.currentTarget,
                classNames = button.getAttribute('class');
            // stop the original event to prevent double events
            e.halt();
            e.button = button;
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