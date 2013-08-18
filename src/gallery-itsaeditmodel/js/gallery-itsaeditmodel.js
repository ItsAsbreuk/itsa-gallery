'use strict';

/**
 *
 * Extends Y.Model by adding methods through which they can create editable form-elements, which represent and are bound to the propery-value.
 * This model is for defining the UI-structure for all Model's properties and for firing model-events for
 * Y.ITSAEditModel does not rendering to the dom itself. That needs to be done by an Y.View-instance, like Y.ITSAViewModel.
 *
 * @module gallery-itsaeditmodel
 * @class ITSAEditModel
 * @extends Model
 * @constructor
 * @since 0.1
 *
 * <i>Copyright (c) 2013 Marco Asbreuk - http://itsasbreuk.nl</i>
 * YUI BSD License - http://developer.yahoo.com/yui/license.html
 *
*/

var YArray = Y.Array,
    ITSAFormElement = Y.ITSAFormElement,

    CLICK = 'click',
    SAVE = 'save',
    DESTROY = 'destroy',
    CANCEL = 'cancel',
    EDIT = 'edit',
    SUBMIT = 'submit',
    RESET = 'reset',

    DATE = 'date',
    TIME = 'time',
    PICKER = 'picker',

    DATA = 'data',
    VALUE = 'value',
    BUTTON = 'button',
    TYPE = 'type',
    DATA_BUTTON_SUBTYPE = DATA+'-'+BUTTON+'sub'+TYPE,
    DATA_BUTTON_TYPE = DATA+'-'+BUTTON+TYPE,

    /**
      * Fired by input-elements that can force a 'focusnext' when they detect an enter-key.
      * The defaultfunction: defFnFocusNext() is empty by default, but can be overridden.
      * This function always will be executed, unless the event is preventDefaulted or halted.
      *
      * @event focusnext
      * @param e {EventFacade} Event Facade including:
      * @param e.message {String} The warningmessage.
      * @since 0.1
    **/
    FOCUS_NEXT = 'focusnext',

    /**
      * Event fired after an input-elements value is changed.
      * The defaultfunction: defFnUIChanged() is empty by default, but can be overridden.
      * This function always will be executed, unless the event is preventDefaulted or halted.
      *
      * @event uichanged
      * @param e {EventFacade} Event Facade including:
      * @param e.inputNode {Y.Node} The Input-Node that was clicked
      * @param e.elementId {String} Id of the Node that changed value.
      * @param e.property {String} The property-name of the Object (or the Model's attribute-name)
      * @param e.uiElement {Object} reference to the UI-element
      *
    **/
    UI_CHANGED = 'uichanged',

    /**
      * Event fired when an input-elements value is changed (life, without blurring): valuechange.
      * The defaultfunction: defFnUIChanging() is empty by default, but can be overridden.
      * This function always will be executed, unless the event is preventDefaulted or halted.
      *
      * @event uichanging
      * @param e {EventFacade} Event Facade including:
      * @param e.inputNode {Y.Node} The Input-Node that was clicked
      * @param e.elementId {String} Id of the Node that chancged value.
      * @param e.property {String} The property-name of the Object (or the Model's attribute-name)
      * @param e.uiElement {Object} reference to the UI-element
      *
    **/
    UI_CHANGING = 'uichanging',

    /**
      * Fired when a button -rendered by this modelinstance using renderBtn()- is clicked.
      * No defaultFunction, so listen to the 'on' and 'after' event are the same.
      *
      * @event buttonclick
      * @param e {EventFacade} Event Facade including:
      * @param e.target {Y.ITSAEditModel} The ITSAEditModel-instance
      * @param e.buttonNode {Y.Node} reference to the buttonnode
      * @param e.uiElement {Object} reference to the UI-element
      *
    **/
    BUTTON_CLICK = BUTTON+CLICK,

    /**
      * Fired when a button -rendered by this modelinstance using renderDestroyBtn()- is clicked.
      * The defaultfunction: _defFnDestroy() always will be executed, unless the event is preventDefaulted or halted.
      *
      * @event destroyclick
      * @param e {EventFacade} Event Facade including:
      * @param e.target {Y.ITSAEditModel} The ITSAEditModel-instance
      * @param e.value {Any} Should be used to identify the button --> defined during rendering: is either config.value or buttonText
      * @param e.buttonNode {Y.Node} reference to the buttonnode
      * @param e.uiElement {Object} reference to the UI-element
      *
    **/
    DESTROY_CLICK = DESTROY+CLICK,

    /**
      * Fired when a button -rendered by this modelinstance using renderSubmitBtn()- is clicked.
      * The defaultfunction: _defFnSubmit() always will be executed, unless the event is preventDefaulted or halted.
      *
      * @event submitclick
      * @param e {EventFacade} Event Facade including:
      * @param e.target {Y.ITSAEditModel} The ITSAEditModel-instance
      * @param e.value {Any} Could be used to identify the button --> defined during rendering by config.value
      * @param e.buttonNode {Y.Node} reference to the buttonnode
      * @param e.uiElement {Object} reference to the UI-element
      *
    **/
    SUBMIT_CLICK = SUBMIT+CLICK,

    /**
      * Fired when a button -rendered by this modelinstance using renderCancelBtn()- is clicked.
      * The defaultfunction: _defFnCancel() always will be executed, unless the event is preventDefaulted or halted.
      *
      * @event cancelclick
      * @param e {EventFacade} Event Facade including:
      * @param e.target {Y.ITSAEditModel} The ITSAEditModel-instance
      * @param e.value {Any} Could be used to identify the button --> defined during rendering by config.value
      * @param e.buttonNode {Y.Node} reference to the buttonnode
      * @param e.uiElement {Object} reference to the UI-element
      *
    **/
    CANCEL_CLICK = CANCEL+CLICK,

    /**
      * Fired when a button -rendered by this modelinstance using renderResetBtn()- is clicked.
      * The defaultfunction: _defFnReset() always will be executed, unless the event is preventDefaulted or halted.
      *
      * @event resetclick
      * @param e {EventFacade} Event Facade including:
      * @param e.target {Y.ITSAEditModel} The ITSAEditModel-instance
      * @param e.value {Any} Could be used to identify the button --> defined during rendering by config.value
      * @param e.buttonNode {Y.Node} reference to the buttonnode
      * @param e.uiElement {Object} reference to the UI-element
      *
    **/
    RESET_CLICK = RESET+CLICK,

    /**
      * Fired when a button -rendered by this modelinstance using renderEditBtn()- is clicked.
      * The defaultfunction: _defFnEdit() always will be executed, unless the event is preventDefaulted or halted.
      *
      * @event editclick
      * @param e {EventFacade} Event Facade including:
      * @param e.target {Y.ITSAEditModel} The ITSAEditModel-instance
      * @param e.value {Any} Could be used to identify the button --> defined during rendering by config.value
      * @param e.buttonNode {Y.Node} reference to the buttonnode
      * @param e.uiElement {Object} reference to the UI-element
      *
    **/
    EDIT_CLICK = EDIT+CLICK,

    /**
      * Fired when a button -rendered by this modelinstance using renderSaveBtn()- is clicked.
      * The defaultfunction: _defFnSave() always will be executed, unless the event is preventDefaulted or halted.
      *
      * @event saveclick
      * @param e {EventFacade} Event Facade including:
      * @param e.target {Y.ITSAEditModel} The ITSAEditModel-instance
      * @param e.value {Any} Could be used to identify the button --> defined during rendering by config.value
      * @param e.buttonNode {Y.Node} reference to the buttonnode
      * @param e.uiElement {Object} reference to the UI-element
      *
    **/
    SAVE_CLICK = SAVE+CLICK,

    /**
      * Fired when a datepickerbutton -rendered by this modelinstance- is clicked.
      * The defaultfunction: _defFnChangeDate() always will be executed, unless the event is preventDefaulted or halted.
      *
      * @event datepickerclick
      * @param e {EventFacade} Event Facade including:
      * @param e.target {Y.ITSAEditModel} The ITSAEditModel-instance
      * @param e.value {Date} current value of the property
      * @param e.buttonNode {Y.Node} reference to the buttonnode
      * @param e.uiElement {Object} reference to the UI-element
      *
    **/
    DATEPICKER_CLICK = DATE+PICKER+CLICK,

    /**
      * Fired when a timepickerbutton -rendered by this modelinstance- is clicked.
      * The defaultfunction: _defFnChangeDate() always will be executed, unless the event is preventDefaulted or halted.
      *
      * @event timepickerclick
      * @param e {EventFacade} Event Facade including:
      * @param e.target {Y.ITSAEditModel} The ITSAEditModel-instance
      * @param e.value {Date} current value of the property
      * @param e.buttonNode {Y.Node} reference to the buttonnode
      * @param e.uiElement {Object} reference to the UI-element
      *
    **/
    TIMEPICKER_CLICK = TIME+PICKER+CLICK,

    /**
      * Fired when a datetimepickerbutton -rendered by this modelinstance- is clicked.
      * The defaultfunction: _defFnChangeDate() always will be executed, unless the event is preventDefaulted or halted.
      *
      * @event datetimepickerclick
      * @param e {EventFacade} Event Facade including:
      * @param e.target {Y.ITSAEditModel} The ITSAEditModel-instance
      * @param e.value {Date} current value of the property
      * @param e.buttonNode {Y.Node} reference to the buttonnode
      * @param e.uiElement {Object} reference to the UI-element
      *
    **/
    DATETIMEPICKER_CLICK = DATE+TIME+PICKER+CLICK;

Y.namespace('Plugin').ITSAEditModel = Y.Base.create('itsaeditmodel', Y.Model, [], {

        /**
         * Sets up the toolbar during initialisation. Calls render() as soon as the hosts-editorframe is ready
         *
         * @method initializer
         * @protected
         * @since 0.1
         */
        initializer : function() {
            var instance = this;

            Y.log('initializer', 'info', 'Itsa-EditModel');
           // -- Public Properties -------------------------------------------------

           /**
            * Internal list that holds event-references
            * @property _eventhandlers
            * @default []
            * @private
            * @type Array
            */
            instance._eventhandlers = [];

           /**
            * internal backup of all property-configs
            * @property _UIelements
            * @default {}
            * @private
            * @type Object
            */
            instance._UIelements = {};

           /**
            * internal flag that tells whether automaicly saving needs to happen in case properties have changed
            * @property _needAutoSaved
            * @default false
            * @private
            * @type Boolean
            */
            instance._needAutoSaved = false;

           /**
            * Internal reference to Y.later timerobject for autosaving
            * @property _autoSaveTimer
            * @default null
            * @private
            * @type timer-Object
            */
            instance._autoSaveTimer = null;

            instance.publish(
                FOCUS_NEXT,
                {
                    defaultFn: Y.bind(instance.defFnFocusNext, instance),
                    emitFacade: true
                }
            );
            instance.publish(
                UI_CHANGED,
                {
                    defaultFn: Y.bind(instance.defFnUIChanged, instance),
                    emitFacade: true
                }
            );
            instance.publish(
                UI_CHANGING,
                {
                    defaultFn: Y.bind(instance.defFnUIChanging, instance),
                    emitFacade: true
                }
            );
            instance.publish(
                DESTROY,
                {
                    defaultFn: Y.bind(instance._defFnDestroy, instance),
                    emitFacade: true
                }
            );
            instance.publish(
                SUBMIT,
                {
                    defaultFn: Y.bind(instance._defFnSubmit, instance),
                    emitFacade: true
                }
            );
            instance.publish(
                CANCEL,
                {
                    defaultFn: Y.bind(instance._defFnCancel, instance),
                    emitFacade: true
                }
            );
            instance.publish(
                RESET,
                {
                    defaultFn: Y.bind(instance._defFnReset, instance),
                    emitFacade: true
                }
            );
            instance.publish(
                SAVE,
                {
                    defaultFn: Y.bind(instance._defFnSave, instance),
                    emitFacade: true
                }
            );
            instance.publish(
                DATEPICKER_CLICK,
                {
                    defaultFn: Y.bind(instance._defFnChangeDate, instance),
                    emitFacade: true
                }
            );
            instance.publish(
                TIMEPICKER_CLICK,
                {
                    defaultFn: Y.bind(instance._defFnChangeDate, instance),
                    emitFacade: true
                }
            );
            instance.publish(
                DATETIMEPICKER_CLICK,
                {
                    defaultFn: Y.bind(instance._defFnChangeDate, instance),
                    emitFacade: true
                }
            );

            instance._bindUI();
        },

defFnFocusNext : function() {
    // empty by default --> can be overridden
},

defFnUIChanged : function() {
    // empty by default --> can be overridden
},

defFnUIChanging : function() {
    // empty by default --> can be overridden
},

_defFnDestroy : function() {

},
_defFnEdit : function() {

},
_defFnSubmit : function() {

},
_defFnCancel : function() {

},
_defFnReset : function() {

},
_defFnSave : function() {

},
_defFnChangeDate : function(e) {
    var instance = e.target,
        type = e.type,
        node = e.buttonNode,
        picker = Y.ItsaDateTimePicker,
        promise;
    if (type===DATEPICKER_CLICK) {
        promise = Y.bind(picker.getDate, picker);
    }
    else if (type===TIMEPICKER_CLICK) {
        promise = Y.bind(picker.getTime, picker);
    }
    else if (type===DATETIMEPICKER_CLICK) {
        promise = Y.bind(picker.getDateTime, picker);
    }
    promise(e.value, e.uiElement.config)
    .then(
        function(newdate) {
    //                            var newRenderedElement;
    //                            instance._storeProperty(valuespan, picker, propertyName, newdate, true);
            // because _setProperty setts the attribute with {fromEditModel: true},
            // the view does not re-render. We change the fieldvalue ourselves
            // first ask for ITSAFormElement how the render will look like
            // then axtract the value from within
    //                            newRenderedElement = instance.getElement(propertyName, uiElement, uiElement.value);
    //                            valuespan.setHTML(instance._getDateTimeValueFromRender(newRenderedElement));
        },
        function() {
            return true; // switch rejectstatus to fulfilled by returning a value
        }
    )
    .then(
        function() {
            // should always be called
            // be carefull: button might not exist anymore, when the view is rerendered
            if (node) {
                node.focus();
            }
        }
    );
},

        /**
         *
         * Renderes a formelement-button. In order to be able to take action once the button is clicked, you can use config.value,
         * otherwise 'buttonText' will automaticly be the e.value inside the eventlistener. By specifying 'config',
         * the button can be configured in more detail.
         * <br />Imagebuttons can be set through 'buttonText', f.i.: '<i class="icon-press"></i> press me'
         *
         * @method renderBtn
         * @param buttonText {String} Text on the button (equals buttonName whennot specified).
         * @param [config] {Object} config (which that is passed through to Y.ITSAFormElement)
         * @param [config.value] {Any} returnvalue which is available inside the eventlistener through e.value
         * @param [config.data] when wanting to add extra data to the button, f.i. 'data-someinfo="somedata"'
         * @param [config.disabled]
         * @param [config.hidden]
         * @param [config.classname] for addeing extra classnames to the button
         * @param [config.focusable]
         * @param [config.primary] making it the primary-button
         * @param [config.tooltip] tooltip when Y.Tipsy or Y.Tooltip is used
         * @param [config.tooltipHeader] header of the tooltip, when using Y.Tooltip
         * @param [config.tooltipFooter] footer of the tooltip when using Y.Tooltip
         * @param [config.tooltipPlacement] tooltip's placement when using Y.Tooltip
         * @since 0.2
         *
         */
        renderBtn : function(buttonText, config) {
            Y.log('renderBtn', 'info', 'Itsa-EditModel');
            return this._renderBtn(buttonText, config, BUTTON, true);
        },

        _renderBtn : function(buttonText, config, buttontype, extradata) {
            var instance = this,
                formbutton;

            Y.log('renderBtn', 'info', 'Itsa-EditModel');
/*jshint expr:true */
            config || (config = {});
            buttonText || (buttonText = buttontype);
/*jshint expr:false */
            config.buttonText = buttonText;
/*jshint expr:true */
            config.data || (config.data = '');
            extradata && (config.data += ' '+DATA_BUTTON_SUBTYPE+'="'+buttontype+'"');
/*jshint expr:false */
            formbutton = ITSAFormElement.getElement(buttontype, config);
            instance._UIelements[formbutton.nodeid] = formbutton;
            return formbutton.html;
        },

        /**
         *
         * Renderes a formelement-cancelbutton.
         * By specifying 'config', the button can be configured in more detail.
         * <br />Imagebuttons can be set through 'buttonText', f.i.: '<i class="icon-cancel"></i> cancel'
         *
         * @method renderCancelBtn
         * @param buttonText {String} Text on the button (equals buttonName whennot specified).
         * @param [config] {Object} config (which that is passed through to Y.ITSAFormElement)
         * @param [config.value] {Any} returnvalue which is available inside the eventlistener through e.value
         * @param [config.data] when wanting to add extra data to the button, f.i. 'data-someinfo="somedata"'
         * @param [config.disabled]
         * @param [config.hidden]
         * @param [config.classname] for addeing extra classnames to the button
         * @param [config.focusable]
         * @param [config.primary] making it the primary-button
         * @param [config.tooltip] tooltip when Y.Tipsy or Y.Tooltip is used
         * @param [config.tooltipHeader] header of the tooltip, when using Y.Tooltip
         * @param [config.tooltipFooter] footer of the tooltip when using Y.Tooltip
         * @param [config.tooltipPlacement] tooltip's placement when using Y.Tooltip
         * @since 0.2
         *
         */
        renderCancelBtn : function(buttonText, config) {
            Y.log('renderCancelBtn', 'info', 'Itsa-EditModel');
            return this._renderBtn(buttonText, config, CANCEL, true);
        },

        /**
         *
         * Renderes a formelement-destroybutton.
         * By specifying 'config', the button can be configured in more detail.
         * <br />Imagebuttons can be set through 'buttonText', f.i.: '<i class="icon-destroy"></i> destroy'
         *
         * @method renderDestroyBtn
         * @param buttonText {String} Text on the button (equals buttonName whennot specified).
         * @param [config] {Object} config (which that is passed through to Y.ITSAFormElement)
         * @param [config.value] {Any} returnvalue which is available inside the eventlistener through e.value
         * @param [config.data] when wanting to add extra data to the button, f.i. 'data-someinfo="somedata"'
         * @param [config.disabled]
         * @param [config.hidden]
         * @param [config.classname] for addeing extra classnames to the button
         * @param [config.focusable]
         * @param [config.primary] making it the primary-button
         * @param [config.tooltip] tooltip when Y.Tipsy or Y.Tooltip is used
         * @param [config.tooltipHeader] header of the tooltip, when using Y.Tooltip
         * @param [config.tooltipFooter] footer of the tooltip when using Y.Tooltip
         * @param [config.tooltipPlacement] tooltip's placement when using Y.Tooltip
         * @since 0.2
         *
         */
        renderDestroyBtn : function(buttonText, config) {
            Y.log('renderDestroyBtn', 'info', 'Itsa-EditModel');
            return this._renderBtn(buttonText, config, DESTROY, true);
        },

        /**
         *
         * Renderes a formelement-editbutton.
         * By specifying 'config', the button can be configured in more detail.
         * <br />Imagebuttons can be set through 'buttonText', f.i.: '<i class="icon-edit"></i> edit'
         *
         * @method renderEditBtn
         * @param buttonText {String} Text on the button (equals buttonName whennot specified).
         * @param [config] {Object} config (which that is passed through to Y.ITSAFormElement)
         * @param [config.value] {Any} returnvalue which is available inside the eventlistener through e.value
         * @param [config.data] when wanting to add extra data to the button, f.i. 'data-someinfo="somedata"'
         * @param [config.disabled]
         * @param [config.hidden]
         * @param [config.classname] for addeing extra classnames to the button
         * @param [config.focusable]
         * @param [config.primary] making it the primary-button
         * @param [config.tooltip] tooltip when Y.Tipsy or Y.Tooltip is used
         * @param [config.tooltipHeader] header of the tooltip, when using Y.Tooltip
         * @param [config.tooltipFooter] footer of the tooltip when using Y.Tooltip
         * @param [config.tooltipPlacement] tooltip's placement when using Y.Tooltip
         * @since 0.2
         *
         */
        renderEditBtn : function(buttonText, config) {
            Y.log('renderEditBtn', 'info', 'Itsa-EditModel');
            return this._renderBtn(buttonText, config, EDIT, true);
        },

        /**
         *
         * Renderes a formelement-resetbutton.
         * By specifying 'config', the button can be configured in more detail.
         * <br />Imagebuttons can be set through 'buttonText', f.i.: '<i class="icon-reset"></i> reset'
         *
         * @method renderResetBtn
         * @param buttonText {String} Text on the button (equals buttonName whennot specified).
         * @param [config] {Object} config (which that is passed through to Y.ITSAFormElement)
         * @param [config.value] {Any} returnvalue which is available inside the eventlistener through e.value
         * @param [config.data] when wanting to add extra data to the button, f.i. 'data-someinfo="somedata"'
         * @param [config.disabled]
         * @param [config.hidden]
         * @param [config.classname] for addeing extra classnames to the button
         * @param [config.focusable]
         * @param [config.primary] making it the primary-button
         * @param [config.tooltip] tooltip when Y.Tipsy or Y.Tooltip is used
         * @param [config.tooltipHeader] header of the tooltip, when using Y.Tooltip
         * @param [config.tooltipFooter] footer of the tooltip when using Y.Tooltip
         * @param [config.tooltipPlacement] tooltip's placement when using Y.Tooltip
         * @since 0.2
         *
         */
        renderResetBtn : function(buttonText, config) {
            Y.log('renderResetBtn', 'info', 'Itsa-EditModel');
            return this._renderBtn(buttonText, config, RESET);
        },

        /**
         *
         * Renderes a formelement-savebutton.
         * By specifying 'config', the button can be configured in more detail.
         * <br />Imagebuttons can be set through 'buttonText', f.i.: '<i class="icon-save"></i> save'
         *
         * @method renderSaveBtn
         * @param buttonText {String} Text on the button (equals buttonName whennot specified).
         * @param [config] {Object} config (which that is passed through to Y.ITSAFormElement)
         * @param [config.value] {Any} returnvalue which is available inside the eventlistener through e.value
         * @param [config.data] when wanting to add extra data to the button, f.i. 'data-someinfo="somedata"'
         * @param [config.disabled]
         * @param [config.hidden]
         * @param [config.classname] for addeing extra classnames to the button
         * @param [config.focusable]
         * @param [config.primary] making it the primary-button
         * @param [config.tooltip] tooltip when Y.Tipsy or Y.Tooltip is used
         * @param [config.tooltipHeader] header of the tooltip, when using Y.Tooltip
         * @param [config.tooltipFooter] footer of the tooltip when using Y.Tooltip
         * @param [config.tooltipPlacement] tooltip's placement when using Y.Tooltip
         * @since 0.2
         *
         */
        renderSaveBtn : function(buttonText, config) {
            Y.log('renderSaveBtn', 'info', 'Itsa-EditModel');
            return this._renderBtn(buttonText, config, SAVE, true);
        },

        /**
         *
         * Renderes a formelement-submitbutton.
         * By specifying 'config', the button can be configured in more detail.
         * <br />Imagebuttons can be set through 'buttonText', f.i.: '<i class="icon-press"></i> save'
         *
         * @method renderSubmitBtn
         * @param buttonText {String} Text on the button (equals buttonName whennot specified).
         * @param [config] {Object} config (which that is passed through to Y.ITSAFormElement)
         * @param [config.value] {Any} returnvalue which is available inside the eventlistener through e.value
         * @param [config.data] when wanting to add extra data to the button, f.i. 'data-someinfo="somedata"'
         * @param [config.disabled]
         * @param [config.hidden]
         * @param [config.classname] for addeing extra classnames to the button
         * @param [config.focusable]
         * @param [config.primary] making it the primary-button
         * @param [config.tooltip] tooltip when Y.Tipsy or Y.Tooltip is used
         * @param [config.tooltipHeader] header of the tooltip, when using Y.Tooltip
         * @param [config.tooltipFooter] footer of the tooltip when using Y.Tooltip
         * @param [config.tooltipPlacement] tooltip's placement when using Y.Tooltip
         * @since 0.2
         *
         */
        renderSubmitBtn : function(buttonText, config) {
            Y.log('renderSubmitBtn', 'info', 'Itsa-EditModel');
            return this._renderBtn(buttonText, config, SUBMIT);
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
            if (instance._fireEventTimer) {
                instance._fireEventTimer.cancel();
            }
            instance._clearEventhandlers();
            instance._UIelements = {};
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
                eventhandlers = instance._eventhandlers,
                body = Y.one('body');

            Y.log('_bindUI', 'info', 'Itsa-EditModel');

            // listening for a click on any 'datetimepicker'-button or a click on any 'form-element'-button in the dom
            eventhandlers.push(
                body.delegate(
                    [DATEPICKER_CLICK, TIMEPICKER_CLICK, DATETIMEPICKER_CLICK, BUTTON_CLICK,
                     SAVE_CLICK, DESTROY_CLICK, EDIT_CLICK, CANCEL_CLICK, SUBMIT_CLICK, RESET_CLICK],
                    function(e) {
                        var node = e.target,
                          type = e.type,
                            payload = {
                                target: instance,
                                value: new Date(node.getAttribute(VALUE)),
                                uiElement: instance._UIelements[node.get('id')],
                                buttonNode: node,
                                type: type
                            };
                        // refireing, but now by the instance:
                        instance.fire(type, payload);
                    },
                    function(delegatedNode, e){ // node === e.target
                        // only process if node's id is part of this ITSAEditModel-instance:
                        return instance._UIelements[e.target.get('id')];
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
        }

    }, {
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

//===================================================================
//===================================================================

// Define synthetic events to Y.Event
/**
  * Node-event fired when the normal button is clicked.
  * that is: generated through renderBtn() and not a specified button like 'save', or 'submit'.
  *
  * @event Y.Node.buttonclick
  * @param e {EventFacade} Event Facade including:
  * @param e.target {Y.Node} The ButtonNode that was clicked
  *
**/

/**
  * Node-event fired when the destroy-button is clicked.
  *
  * @event Y.Node.destroyclick
  * @param e {EventFacade} Event Facade including:
  * @param e.target {Y.Node} The ButtonNode that was clicked
  *
**/

/**
  * Node-event fired when the save-button is clicked.
  *
  * @event Y.Node.saveclick
  * @param e {EventFacade} Event Facade including:
  * @param e.target {Y.Node} The ButtonNode that was clicked
  *
**/

/**
  * Node-event fired when the edit-button is clicked.
  *
  * @event Y.Node.editclick
  * @param e {EventFacade} Event Facade including:
  * @param e.target {Y.Node} The ButtonNode that was clicked
  *
**/

/**
  * Node-event fired when the cancel-button is clicked.
  *
  * @event Y.Node.cancelclick
  * @param e {EventFacade} Event Facade including:
  * @param e.target {Y.Node} The ButtonNode that was clicked
  *
**/

YArray.each(
    [BUTTON, SAVE, DESTROY, EDIT, CANCEL],
    function(eventtype) {
        Y.Event.define(eventtype+CLICK, {
            on: function (node, subscription, notifier) {
                // To make detaching easy, a common pattern is to add the subscription
                // for the supporting DOM event to the subscription object passed in.
                // This is then referenced in the detach() method below.
                subscription._handle = node.on(CLICK, function (e) {
                    var targetNode = e.target;
                    if ((targetNode.getAttribute(DATA_BUTTON_TYPE)===BUTTON) && (targetNode.getAttribute(DATA_BUTTON_SUBTYPE)===eventtype)) {
                        // The notifier triggers the subscriptions to be executed.
                        // Pass its fire() method the triggering DOM event facade
                        notifier.fire(e);
                    }
                });
            },
            // The logic executed when the 'tripleclick' subscription is `detach()`ed
            detach: function (node, subscription) {
                // Clean up supporting DOM subscriptions and other external hooks
                // when the synthetic event subscription is detached.
                subscription._handle.detach();
            }
        });
    }
);