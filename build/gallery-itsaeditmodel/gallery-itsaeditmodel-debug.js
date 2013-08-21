YUI.add('gallery-itsaeditmodel', function (Y, NAME) {

'use strict';

/*jshint maxlen:200 */

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
    YObject = Y.Object,
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
      * Event fired after an input-element or textarea-value is changed.
      * The defaultfunction: _defFnUIChanged() is empty by default, but can be overridden.
      * This function always will be executed, unless the event is preventDefaulted or halted.
      *
      * @event uichanged
      * @param e {EventFacade} Event Facade including:
      * @param e.target {Y.ITSAEditModel} The ITSAEditModel-instance
      * @param e.value {Date} current value of the property
      * @param e.node {Y.Node} reference to the element-node
      * @param e.formElement {Object} reference to the form-element
      *
    **/
    UI_CHANGED = 'uichanged',

    /**
      * Fired when a button -rendered by this modelinstance using renderBtn()- is clicked.
      * No defaultFunction, so listen to the 'on' and 'after' event are the same.
      *
      * @event buttonclick
      * @param e {EventFacade} Event Facade including:
      * @param e.target {Y.ITSAEditModel} The ITSAEditModel-instance
      * @param e.buttonNode {Y.Node} reference to the buttonnode
      * @param e.formElement {Object} reference to the form-element
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
      * @param e.formElement {Object} reference to the form-element
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
      * @param e.formElement {Object} reference to the form-element
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
      * @param e.formElement {Object} reference to the form-element
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
      * @param e.formElement {Object} reference to the form-element
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
      * @param e.formElement {Object} reference to the form-element
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
      * @param e.formElement {Object} reference to the form-element
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
      * @param e.formElement {Object} reference to the form-element
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
      * @param e.formElement {Object} reference to the form-element
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
      * @param e.formElement {Object} reference to the form-element
      *
    **/
    DATETIMEPICKER_CLICK = DATE+TIME+PICKER+CLICK;

Y.ITSAEditModel = Y.Base.create('itsaeditmodel', Y.Model, [], {

        /**
         * Sets up the toolbar during initialisation. Calls render() as soon as the hosts-editorframe is ready
         *
         * @method initializer
         * @protected
         * @since 0.1
         */
        initializer : function() {
            var instance = this;

            Y.log('initializer', 'info', 'ITSAEditModel');
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
            * internal backup of all created formelements: both attribute and buttons, referenced by nodeid's
            * @property _FORMelements
            * @default {}
            * @private
            * @type Object
            */
            instance._FORMelements = {};


           /**
            * internal backup of which attribute generated what all nodeid's, referenced by attribute-name's
            * @property _ATTRS_nodes
            * @default {}
            * @private
            * @type Object
            */
            instance._ATTRS_nodes = {},

           /**
            * internal flag that tells whether updates on a UI-element should be stored at once.
            * @property _lifeUpdate
            * @default false
            * @private
            * @type Boolean
            */
            instance._lifeUpdate = false;

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
                    defaultFn: Y.bind(instance._defFnUIChanged, instance),
                    emitFacade: true
                }
            );
            instance.publish(
                DESTROY_CLICK,
                {
                    defaultFn: Y.bind(instance._defFnDestroy, instance),
                    emitFacade: true
                }
            );
            instance.publish(
                SUBMIT_CLICK,
                {
                    defaultFn: Y.bind(instance._defFnSubmit, instance),
                    emitFacade: true
                }
            );
            instance.publish(
                CANCEL_CLICK,
                {
                    defaultFn: Y.bind(instance._defFnCancel, instance),
                    emitFacade: true
                }
            );
            instance.publish(
                RESET_CLICK,
                {
                    defaultFn: Y.bind(instance._defFnReset, instance),
                    emitFacade: true
                }
            );
            instance.publish(
                SAVE_CLICK,
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
         * @return {String} stringified version of the button which can be inserted in the dom.
         * @since 0.2
         *
         */
        renderBtn : function(buttonText, config) {
            Y.log('renderBtn', 'info', 'ITSAEditModel');
            return this._renderBtn(buttonText, config, BUTTON, true);
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
         * @return {String} stringified version of the button which can be inserted in the dom.
         * @since 0.2
         *
         */
        renderCancelBtn : function(buttonText, config) {
            Y.log('renderCancelBtn', 'info', 'ITSAEditModel');
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
         * @return {String} stringified version of the button which can be inserted in the dom.
         * @since 0.2
         *
         */
        renderDestroyBtn : function(buttonText, config) {
            Y.log('renderDestroyBtn', 'info', 'ITSAEditModel');
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
         * @return {String} stringified version of the button which can be inserted in the dom.
         * @since 0.2
         *
         */
        renderEditBtn : function(buttonText, config) {
            Y.log('renderEditBtn', 'info', 'ITSAEditModel');
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
         * @return {String} stringified version of the button which can be inserted in the dom.
         * @since 0.2
         *
         */
        renderResetBtn : function(buttonText, config) {
            Y.log('renderResetBtn', 'info', 'ITSAEditModel');
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
         * @return {String} stringified version of the button which can be inserted in the dom.
         * @since 0.2
         *
         */
        renderSaveBtn : function(buttonText, config) {
            Y.log('renderSaveBtn', 'info', 'ITSAEditModel');
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
         * @return {String} stringified version of the button which can be inserted in the dom.
         * @since 0.2
         *
         */
        renderSubmitBtn : function(buttonText, config) {
            Y.log('renderSubmitBtn', 'info', 'ITSAEditModel');
            return this._renderBtn(buttonText, config, SUBMIT);
        },

        /**
         *
         * Renderes an attribute into its formelement.
         *
         * @method renderFormElement
         * @param attribute {String} attribute that needs to be rendered.
         * @return {String} stringified version of the element which can be inserted in the dom.
         * @since 0.2
         *
        */
        renderFormElement : function(attribute) {
            var instance = this,
                formelements, attributenodes, attr, attrconfig, formelement, element, formtype, formconfig, valuefield, nodeid, widget;
            Y.log('renderFormElement', 'info', 'ITSAEditModel');
            formelements = instance._FORMelements;
            attributenodes = instance._ATTRS_nodes;
            attr = instance.get(attribute);
            if (attr) {
                attrconfig = instance._getAttrCfg(attribute);
                formtype = attrconfig.formtype || 'text';
                formconfig = attrconfig.formconfig || {};
                valuefield = instance._getWidgetValueField(formtype);
                formconfig[valuefield] = attr;
                formconfig.modelattribute = true;
                formconfig.name = attribute;
                formelement = ITSAFormElement.getElement(formtype, formconfig);
                // store in instance._FORMelements
                nodeid = formelement.nodeid;
                formelements[nodeid] = formelement;
                // store in instance._ATTRS_nodes
/*jshint expr:true */
                attributenodes[attribute] || (attributenodes[attribute]=[]);
/*jshint expr:false */
                attributenodes[attribute].push(nodeid);
                // if widget, then we need to add an eventlistener for valuechanges:
                widget = formelement.widget;
                if (widget) {
                    instance._eventhandlers.push(
                        widget.after(
                            valuefield+'Change',
                            Y.rbind(instance._updateSimularWidgetUI, instance, nodeid, attribute, valuefield)
                        )
                    );
                }
                element = formelement.html;
                if (formelement.widget) {
                    formelement.widget.addTarget(instance);
                }
            }
            return element;
        },

        /**
         * Cleans up bindings and removes plugin
         * @method destructor
         * @protected
         * @since 0.1
        */
        destructor : function() {
            var instance = this;
            Y.log('destructor', 'info', 'ITSAEditModel');
            if (instance._autoSaveTimer) {
                instance._autoSaveTimer.cancel();
            }
            if (instance._fireEventTimer) {
                instance._fireEventTimer.cancel();
            }
            instance._clearEventhandlers();
            instance._removeTargets();
            instance._FORMelements = {};
            instance._ATTRS_nodes = {};
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

            Y.log('_bindUI', 'info', 'ITSAEditModel');

            // listening for a click on any 'datetimepicker'-button or a click on any 'form-element'-button in the dom
            eventhandlers.push(
                body.delegate(
                    [DATEPICKER_CLICK, TIMEPICKER_CLICK, DATETIMEPICKER_CLICK, BUTTON_CLICK,
                     SAVE_CLICK, DESTROY_CLICK, EDIT_CLICK, CANCEL_CLICK, SUBMIT_CLICK, RESET_CLICK],
                    function(e) {
                        var node = e.target,
                            type = e.type,
                            value = node.getAttribute(VALUE),
                            payload = {
                                target: instance,
                                value: ((type===DATEPICKER_CLICK) || (type===TIMEPICKER_CLICK) || (type===DATETIMEPICKER_CLICK)) ? (new Date().setTime(parseInt(value, 10))) : value,
                                formElement: instance._FORMelements[node.get('id')],
                                buttonNode: node,
                                type: type
                            };
                        // refireing, but now by the instance:
                        instance.fire(type, payload);
                    },
                    function(delegatedNode, e){ // node === e.target
                        // only process if node's id is part of this ITSAEditModel-instance:
                        return instance._FORMelements[e.target.get('id')];
                    }
                )
            );

            // listening life for valuechanges
            eventhandlers.push(
                body.delegate(
                    'valuechange',
                    function(e) {
                        var node = e.target,
                            type = UI_CHANGED,
                            payload = {
                                target: instance,
                                value: node.get(VALUE),
                                formElement: instance._FORMelements[node.get('id')],
                                node: node,
                                type: type
                            };
                        // refireing, but now by the instance:
                        instance.fire(type, payload);
                    },
                    function(delegatedNode, e){ // node === e.target
                        // only process if node's id is part of this ITSAEditModel-instance:
                        return instance._FORMelements[e.target.get('id')];
                    }
                )
            );

            // listening life for changes outside the UI --> do we need to update the UI?
            eventhandlers.push(
                instance.after(
                    '*:change',
                    function(e) {
                        Y.confirm('Data has been changed from another source. Load it into the formelements?').then(
                            Y.bind(instance._modelToUI, instance)
                        );
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
            Y.log('_clearEventhandlers', 'info', 'ITSAEditModel');
            YArray.each(
                this._eventhandlers,
                function(item){
                    item.detach();
                }
            );
        },

        /**
         *
         * Default function for the 'uichanged'-event which counts for non-widgets formelements.
         *
         * @method _defFnUIChanged
         * @param e {EventTarget}
         * @private
         * @since 0.2
         *
        */
        _defFnUIChanged : function(e) {
            // should not be called by widgets
            var instance = this,
                attribute = e.formElement.name,
                node = e.node;

            Y.log('_defFnUIChanged, attribute  '+e.formElement.name, 'info', 'ITSAEditModel');
            instance._updateSimularUI(node, attribute, e.value);
            if (instance._lifeUpdate) {
                instance._UItoModel(e.node);
            }
        },

        /**
         *
         * Default function for the 'destroyclick'-event
         *
         * @method _defFnDestroy
         * @param e {EventTarget}
         * @private
         * @since 0.2
         *
        */
        _defFnDestroy : function() {
            var instance = this;

            Y.log('_defFnDestroy', 'info', 'ITSAEditModel');
            instance.destroyPromise();
        },

        /**
         *
         * Default function for the 'editclick'-event
         *
         * @method _defFnEdit
         * @param e {EventTarget}
         * @private
         * @since 0.2
         *
        */
        _defFnEdit : function() {
            Y.log('_defFnEdit', 'info', 'ITSAEditModel');
            // may be overridden
        },

        /**
         *
         * Default function for the 'submitclick'-event
         *
         * @method _defFnSubmit
         * @param e {EventTarget}
         * @private
         * @since 0.2
         *
        */
        _defFnSubmit : function() {
            var instance = this;

            Y.log('_defFnSubmit', 'info', 'ITSAEditModel');
            instance.submitPromise();
        },

        /**
         *
         * Default function for the 'cancelclick'-event
         *
         * @method _defFnCancel
         * @param e {EventTarget}
         * @private
         * @since 0.2
         *
        */
        _defFnCancel : function() {
            Y.log('_defFnCancel', 'info', 'ITSAEditModel');
        },

        /**
         *
         * Default function for the 'resetclick'-event
         *
         * @method _defFnReset
         * @param e {EventTarget}
         * @private
         * @since 0.2
         *
        */
        _defFnReset : function() {
            Y.log('_defFnReset', 'info', 'ITSAEditModel');
        },

        /**
         *
         * Default function for the 'saveclick'-event
         *
         * @method _defFnSave
         * @param e {EventTarget}
         * @private
         * @since 0.2
         *
        */
        _defFnSave : function() {
            var instance = this;

            Y.log('_defFnSave', 'info', 'ITSAEditModel');
            instance._UItoModel();
            instance.savePromise();
        },

        /**
         *
         * Default function for the 'datepickerclick'-, 'timepickerclick'- and 'datetimepickerclick'-event
         *
         * @method _defFnChangeDate
         * @param e {EventTarget}
         * @private
         * @since 0.2
         *
        */
        _defFnChangeDate : function(e) {
            Y.log('_defFnChangeDate', 'info', 'ITSAEditModel');

            Y.use('gallery-itsadatetimepicker', function() {
                var instance = e.target,
                    type = e.type,
                    node = e.buttonNode,
                    picker = Y.ItsaDateTimePicker,
                    formElement = e.formElement,
                    promise, dateformat;
                if (type===DATEPICKER_CLICK) {
                    promise = Y.bind(picker.getDate, picker);
                }
                else if (type===TIMEPICKER_CLICK) {
                    promise = Y.bind(picker.getTime, picker);
                }
                else if (type===DATETIMEPICKER_CLICK) {
                    promise = Y.bind(picker.getDateTime, picker);
                }
                promise(new Date(e.value), formElement.config)
                .then(
                    function(newdate) {
                      // first we need to use the new datevalue and reflect it (update) to the UI-element
                      node.setAttribute('value', newdate.getTime());
                      dateformat = formElement.config.format;
                      instance._updateDateTimeUI(formElement.name, newdate, type, dateformat);
                      if (instance._lifeUpdate) {
                          instance._UItoModel(node.get('id'));
                      }
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
            });
        },

        /**
         * Returns the widgets value. That is, the getter of tha attribute that represents the 'value' (determined by _getWidgetValueField).
         *
         * @method _getWidgetValue
         * @param widget {Widget} the widgetinstance
         * @param type {String|widgetClass} the elementtype to be created. Can also be a widgetclass.
         *                                         --> see ItsaFormElement for the attribute 'type' for further information.
         * @return {String} the valuefield (attribute-name in case of widget).
         * @private
         * @since 0.2
         */
        _getWidgetValue : function(widget, type) {
            Y.log('_getWidgetValue', 'info', 'ITSAEditModel');
            return (widget && widget.get(this._getWidgetValueField(type)));
        },

        /**
         * Renderes the field or attribute that holds the value. With ordinary form-elements this will be 'value',
         * but widgets might have a value-property with another name.
         *
         * @method _getWidgetValueField
         * @param type {String|widgetClass} the elementtype to be created. Can also be a widgetclass.
         *                                         --> see ItsaFormElement for the attribute 'type' for further information.
         * @return {String} the valuefield (attribute-name in case of widget).
         * @private
         * @since 0.2
         */
        _getWidgetValueField : function(type) {
            Y.log('_getWidgetValueField', 'info', 'ITSAEditModel');
            var iswidget = ((typeof type === 'function') && type.prototype.BOUNDING_TEMPLATE),
                classname, value;
            if (iswidget) {
                classname = type.NAME;
                if (classname==='itsacheckbox') {
                    value = 'checked';
                }
            }
            return value || 'value';
        },

        _modelToUI : function() {
            console.log('_modelToUI');
        },

        /**
         * Cleaning up all widgettargets
         *
         * @method _removeTargets
         * @private
         * @since 0.2
         *
        */
        _removeTargets : function() {
            var instance = this;

            Y.log('_removeTargets', 'info', 'ITSAEditModel');
            YObject.each(
                instance._FORMelements,
                function(formElement) {
                    var widget = formElement.widget;
                    if (widget) {
                        widget.removeTarget(instance);
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
         * @method _renderBtn
         * @private
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
         * @param [buttontype] {String} type of button that needs to be rendered
         * @param [extradata] {Boolean} whether 'data-buttonsubtype="buttontype"' should be added as a node-attribute
         * @return {String} stringified version of the button which can be inserted in the dom.
         * @since 0.2
         *
         */
        _renderBtn : function(buttonText, config, buttontype, extradata) {
            var instance = this,
                buttonelements = instance._BUTTONelements,
                formbutton, indexvalue;

            Y.log('renderBtn', 'info', 'ITSAEditModel');
/*jshint expr:true */
            config || (config = {});
            buttontype || (buttontype = BUTTON);
            buttonText || (buttonText = buttontype);
/*jshint expr:false */
            indexvalue = config.value || buttonText;
            if (!buttonelements[indexvalue]) {
                // create new
                config.buttonText = buttonText;
/*jshint expr:true */
                config.data || (config.data = '');
                extradata && (config.data += ' '+DATA_BUTTON_SUBTYPE+'="'+buttontype+'"');
/*jshint expr:false */
                formbutton = ITSAFormElement.getElement((((buttontype===SUBMIT) || (buttontype===RESET)) ? buttontype : BUTTON), config);
                // store in both instance._FORMelements and instance._BUTTONelements
                buttonelements[indexvalue] = instance._FORMelements[formbutton.nodeid] = formbutton;
            }
            return buttonelements[indexvalue].html;
        },

        /**
         * Sets the UI-value of a formelement to its Model-attribute.
         *
         * @method _UItoModel
         * @param [nodeid] {String} nodeid of the formelement (without '#'), when left empty, all formelement-properties are set.
         * @private
         * @since 0.1
         *
        */
        _UItoModel: function(nodeid) {
            var instance = this,
                formElement, formElements, options, node, value, attribute, widget;

            Y.log('UItoModel', 'info', 'ITSAEditModel');
            formElements = instance._FORMelements;
            formElement = nodeid && formElements[nodeid];
            if (formElement && (node=Y.one('#'+nodeid)) && node.getData('modelattribute')) {
                widget = formElement.widget;
                value = widget ? instance._getWidgetValue(widget, formElement.type) : node.getAttribute(VALUE);
                attribute = node.get('name');
                if (value) {
                    options = {formelement: true}; // set Attribute with option: '{formelement: true}' --> Form-Views might not want to re-render.
                    instance.set(attribute, value, options);
                }
            }
            else if (!nodeid) {
                // save all attributes
                YObject.each(
                    instance._FORMelements,
                    function(formelement, nodeid) {
                        instance._UItoModel(nodeid);
                    }
                );
            }
        },

        /**
         *
         * Updates all Date-Time UI-elements (its time-value on the span-element that represent the time) when a datetime-picker changes its value.
         * Has only effect on the label --> the pickervalue is not stored in the modelsattribute by this function.
         *
         * @method _updateDateTimeUI
         * @param attribute {String} attribute that is changed by a UI-element
         * @param newdate {Date} the new date-time
         * @param type {String} which type ('date', 'time', or 'datetime')
         * @param dateformat {String} the format on the span-element that represent the time
         * @private
         * @since 0.2
         *
        */
        _updateDateTimeUI : function(attribute, newdate, type, dateformat) {
            var instance = this,
                attributenodes = instance._ATTRS_nodes[attribute];
            if (attributenodes) {
                if (!dateformat) {
                    if (type==='date') {
                        dateformat = '%x';
                    }
                    else if (type==='time') {
                        dateformat = '%X';
                    }
                    else {
                        dateformat = '%x %X';
                    }
                }
                YArray.each(
                    attributenodes,
                    function(nodeid) {
                        var labelnode = Y.one('label[for="'+nodeid+'"]');
                        labelnode = labelnode && labelnode.one('span.formatvalue');
        /*jshint expr:true */
                        labelnode && labelnode.set('text', Y.Date.format(newdate, {format: dateformat}));
        /*jshint expr:false */
                    }
                );
            }
        },

        /**
         *
         * Updates all simular non-widget UI-elements when one of its value changes.
         *
         * @method _updateSimularUI
         * @param changedNode {Node} the formelement-node that changed value
         * @param attribute {String} attribute that is changed by a UI-element
         * @param newvalue {String} the new value
         * @private
         * @since 0.2
         *
        */
        _updateSimularUI : function(changedNode, attribute, newvalue) {
            var instance = this,
                attributenodes = instance._ATTRS_nodes[attribute];

            Y.log('_updateSimularWidgetUI changedNode '+changedNode+' attribute: '+attribute+' newvalue:'+newvalue, 'info', 'ITSAEditModel');
            if (attributenodes) {
              YArray.each(
                  attributenodes,
                  function(nodeid) {
                    var node = Y.one('#'+nodeid);
        /*jshint expr:true */
                        node && (node!==changedNode) && node.set('value', newvalue);
        /*jshint expr:false */
                  }
              );
            }
        },

        /**
         *
         * Updates all Widget UI-elements when a widget changes its value.
         *
         * @method _updateSimularWidgetUI
         * @param e {eventtarget}
         * @param changedNodeId {String} the nodeid (without '#') of the widget's container that caused the change
         * @param attribute {String} attribute that is changed by a UI-element
         * @param valueattribute {String} the widgets value-attribute
         * @private
         * @since 0.2
         *
        */
        _updateSimularWidgetUI : function(e, changedNodeId, attribute, valueattribute) {
            var instance = this,
                attributenodes = instance._ATTRS_nodes[attribute],
                value = e.newVal,
                formelement, widget;

            Y.log('_updateSimularWidgetUI changedNodeId '+changedNodeId+' attribute: '+attribute+' valueattribute:'+valueattribute+' newvalue:'+value, 'info', 'ITSAEditModel');
            if (attributenodes) {
              YArray.each(
                  attributenodes,
                  function(nodeid) {
                      // update widgetvalue
                      formelement = instance._FORMelements[nodeid];
                      widget = formelement && formelement.widget;
                      if (nodeid!==changedNodeId) {
        /*jshint expr:true */
                          widget && widget.set(valueattribute, value);
        /*jshint expr:false */
                      }
                      // in case of slider: update valueattribute --> do this for ALL sliders
        //console.log(widget.getDefaultLocale());
                      if (widget && (widget.getClassName()==='yui3-slider')) {
                          var labelnode = Y.one('span[for="'+nodeid+'"]');
        /*jshint expr:true */
                          labelnode && labelnode.set('text', value);
        /*jshint expr:false */
                      }
                  }
              );
            }
        }

    }, {
        _ATTR_CFG: ['formtype', 'formconfig']
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
            },
            delegate: function (node, subscription, notifier, filter) {
                subscription._delegatehandle = node.on(CLICK, function (e) {
                    var targetNode = e.target;
                    if (filter && (targetNode.getAttribute(DATA_BUTTON_TYPE)===BUTTON) && (targetNode.getAttribute(DATA_BUTTON_SUBTYPE)===eventtype)) {
                        // The notifier triggers the subscriptions to be executed.
                        // Pass its fire() method the triggering DOM event facade
                        notifier.fire(e);
                    }
                }, filter); // filter is passed on to the underlying `delegate()` call
            },
            detachDelegate: function (node, subscription) {
                subscription._delegatehandle.detach();
            }
        });
    }
);

}, '@VERSION@', {
    "requires": [
        "yui-base",
        "attribute-base",
        "base-build",
        "node-base",
        "node-event-delegate",
        "event-synthetic",
        "event-valuechange",
        "gallery-itsamodelsyncpromise",
        "gallery-itsaformelement",
        "gallery-itsadialog"
    ]
});
