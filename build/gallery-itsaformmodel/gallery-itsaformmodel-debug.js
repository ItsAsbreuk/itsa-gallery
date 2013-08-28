YUI.add('gallery-itsaformmodel', function (Y, NAME) {

'use strict';

/*jshint maxlen:200 */

/**
 *
 * Extends Y.Model by adding methods through which they can create editable form-elements, which represent and are bound to the propery-value.
 * This model is for defining the UI-structure for all Model's properties and for firing model-events for
 * Y.ITSAFormModel does not rendering to the dom itself. That needs to be done by an Y.View-instance, like Y.ITSAViewModel.
 *
 * @module gallery-itsaformmodel
 * @extends Model
 * @class ITSAFormModel
 * @constructor
 * @since 0.1
 *
 * <i>Copyright (c) 2013 Marco Asbreuk - http://itsasbreuk.nl</i>
 * YUI BSD License - http://developer.yahoo.com/yui/license.html
 *
*/

var YArray = Y.Array,
    YObject = Y.Object,
    YNode = Y.Node,
    Lang = Y.Lang,
    ITSAFormElement = Y.ITSAFormElement,
    MSG_MODELCHANGED_OUTSIDEFORM_RESETORLOAD = 'Data has been changed outside the form. Load it into the formelements? (if not, then the data will be reset to the current form-values)',
    MSG_MODELCHANGED_OUTSIDEFORM = 'Data has been changed outside the form. Load it into the formelements?',
    UNDEFINED_ELEMENT = 'UNDEFINED FORM-ELEMENT',

    CLICK = 'click',
    SAVE = 'save',
    DESTROY = 'destroy',
    REMOVE = 'remove',
    CANCEL = 'cancel',
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
      * @param e.target {Y.Node} The node that fired the event.
      * @since 0.1
    **/
    FOCUS_NEXT = 'focusnext',

    /**
      * Fired by the modelinstance when validation fails.
      *
      * @event validationerror
      * @param e {EventFacade} Event Facade including:
      * @param e.target {Y.ITSAFormModel} The ITSAFormModel-instance
      * @param e.nodelist {Y.NodeList} reference to the element-nodes that are validated wrongly
      * @since 0.1
    **/
    VALIDATION_ERROR = 'validationerror',

    /**
      * Event fired after a UI-formelement changes its value.
      * defaultfunction: _defFnUIChanged() always will be executed, unless the event is preventDefaulted or halted.
      *
      * @event uichanged
      * @param e {EventFacade} Event Facade including:
      * @param e.target {Y.ITSAFormModel} The ITSAFormModel-instance
      * @param e.value {Date} current value of the property
      * @param e.node {Y.Node} reference to the element-node
      * @param e.nodeid {String} id of the element-node (without '#')
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
      * @param e.target {Y.ITSAFormModel} The ITSAFormModel-instance
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
      * @param e.target {Y.ITSAFormModel} The ITSAFormModel-instance
      * @param e.value {Any} Should be used to identify the button --> defined during rendering: is either config.value or buttonText
      * @param e.buttonNode {Y.Node} reference to the buttonnode
      * @param e.formElement {Object} reference to the form-element
      *
    **/
    DESTROY_CLICK = DESTROY+CLICK,

    /**
      * Fired when a button -rendered by this modelinstance using renderRemoveBtn()- is clicked.
      * The defaultfunction: _defFnRemove() always will be executed, unless the event is preventDefaulted or halted.
      *
      * @event removeclick
      * @param e {EventFacade} Event Facade including:
      * @param e.target {Y.ITSAFormModel} The ITSAFormModel-instance
      * @param e.value {Any} Should be used to identify the button --> defined during rendering: is either config.value or buttonText
      * @param e.buttonNode {Y.Node} reference to the buttonnode
      * @param e.formElement {Object} reference to the form-element
      *
    **/
    REMOVE_CLICK = REMOVE+CLICK,

    /**
      * Fired when a button -rendered by this modelinstance using renderSubmitBtn()- is clicked.
      * The defaultfunction: _defFnSubmit() always will be executed, unless the event is preventDefaulted or halted.
      *
      * @event submitclick
      * @param e {EventFacade} Event Facade including:
      * @param e.target {Y.ITSAFormModel} The ITSAFormModel-instance
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
      * @param e.target {Y.ITSAFormModel} The ITSAFormModel-instance
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
      * @param e.target {Y.ITSAFormModel} The ITSAFormModel-instance
      * @param e.value {Any} Could be used to identify the button --> defined during rendering by config.value
      * @param e.buttonNode {Y.Node} reference to the buttonnode
      * @param e.formElement {Object} reference to the form-element
      *
    **/
    RESET_CLICK = RESET+CLICK,

    /**
      * Fired when a button -rendered by this modelinstance using renderSaveBtn()- is clicked.
      * The defaultfunction: _defFnSave() always will be executed, unless the event is preventDefaulted or halted.
      *
      * @event saveclick
      * @param e {EventFacade} Event Facade including:
      * @param e.target {Y.ITSAFormModel} The ITSAFormModel-instance
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
      * @param e.target {Y.ITSAFormModel} The ITSAFormModel-instance
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
      * @param e.target {Y.ITSAFormModel} The ITSAFormModel-instance
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
      * @param e.target {Y.ITSAFormModel} The ITSAFormModel-instance
      * @param e.value {Date} current value of the property
      * @param e.buttonNode {Y.Node} reference to the buttonnode
      * @param e.formElement {Object} reference to the form-element
      *
    **/
    DATETIMEPICKER_CLICK = DATE+TIME+PICKER+CLICK;

Y.ITSAFormModel = Y.Base.create('itsaformmodel', Y.Model, [], {

        _widgetValueFields : {}, // private prototypeobject can be filled by setWidgetValueField()

        _allowedFormTypes : { // allowed string-formelement types
            text: true,
            number: true,
            password: true,
            textarea: true,
            checkbox: true,
            date: true,
            time: true,
            datetime: true,
            email: true,
            url: true,
            plain: true
        },

        /**
         * Sets up the toolbar during initialisation. Calls render() as soon as the hosts-editorframe is ready
         *
         * @method initializer
         * @protected
         * @since 0.1
         */
        initializer : function() {
            var instance = this;

            Y.log('initializer', 'info', 'ITSAFormModel');
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
            * @property _FORM_elements
            * @default {}
            * @private
            * @type Object
            */
            instance._FORM_elements = {};

           /**
            * internal backup of which attribute generated what all nodeid's, referenced by attribute-name's
            * @property _ATTRS_nodes
            * @default {}
            * @private
            * @type Object
            */
            instance._ATTRS_nodes = {},

           /**
            * internal hash that holds the attribute-values which sould be used during a resetclick- or cancelclick-event.
            * @property _bkpAttrs
            * @default getAttrs at initialization
            * @private
            * @type Boolean
            */
            instance._bkpAttrs = instance.getAttrs();

           /**
            * internal flag that tells whether updates on a UI-element should be stored at once.
            * @property _lifeUpdate
            * @default false
            * @private
            * @type Boolean
            */
            instance._lifeUpdate = false;

           /**
            * internal hash that tells which forrmelements are listening for the enter-key to refocus.
            * @property _focusNextElements
            * @private
            * @type Object
            */
            instance._focusNextElements = {
                text: true,
                number: true,
                password: true,
                textarea: true,
                email: true,
                url: true
            };

           /**
            * internal hash with references to the renderBtn-functions, referenced by type ('button', 'cancel', 'destroy', 'remove', 'reset', 'save', 'submit').
            * @property _renderBtnFns
            * @private
            * @type Object
            */
            instance._renderBtnFns = {
                button: instance.renderBtn,
                cancel: instance.renderCancelBtn,
                destroy: instance.renderDestroyBtn,
                remove: instance.renderRemoveBtn,
                reset: instance.renderResetBtn,
                save: instance.renderSaveBtn,
                submit: instance.renderSubmitBtn
            };

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
                REMOVE_CLICK,
                {
                    defaultFn: Y.bind(instance._defFnRemove, instance),
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

        /**
         * Validates accross attributevalues interactive. F.i: you might have 2 password-fields, one for confirmation.
         * In that case both need to be the same.
         * <br />
         * <br />
         * Return an array with all the attributenames+validationerrormessages that are invalid. To do this, you should create an array
         * and fill it with objects with the properties: 'attribute' and 'validationerror' (both String-type).
         * <br />
         * <br />
         * This method needs to be overridden if needed, by default it is empty.
         * <br />
         * <b>Caution</b> don't read attribute-values with formmodel.get(), but read UI-values with formmodel.getUI() because you need to compare the values
         * as they exist in the UI-elements.
         *
         * @method crossValidation
         * @return {Array|null} array with objects that failed crossValidation. The objects have the properties 'attribute' and 'validationerror'
         * @since 0.1
        */
        crossValidation : function() {
            Y.log('crossValidation is not overruled --> return empty', 'info', 'ITSAFormModel');
            // empty by default --> can be overridden.
            // should return an array with objects, where the objects have the fields: o.node {Y.Node} and a.validationerror {String}
        },

        /**
         * Cleans up bindings and removes plugin
         * @method defFnFocusNext
         * @param e {EventTarget}
         * @param e.target {Y.Node} The node that fired the event.
         * @since 0.1
        */
        defFnFocusNext : function() {
            Y.log('defFnFocusNext is not overruled --> return empty', 'info', 'ITSAFormModel');
            // empty by default --> can be overridden
        },

        /**
         * Returns an array with arrribute's current UI-elements {object} that are present in the DOM.
         * Mostly this will hold one item, but there might be cases where an attribute has multiple UI's in the dom.
         * If 'attribute' can be a model-attribute or a buttons 'name'.
         *
         * @method getCurrentFormElements
         * @param attribute {String} name of the attribute or buttonname which FormElements need to be returned.
         * @return {Array} Returnvalue is an array of ITSAFormElement-objects. These objects are as specified
         * by gallery-itsaformelement, extended with the property 'node'<ul>
         *                  <li>config --> {object} reference to the original configobject</li>
         *                  <li>html   --> {String} rendered Node which is NOT part of the DOM! Must be inserted manually, or using Y.ITSAFormModel</li>
         *                  <li>name   --> {String} convenience-property===config.name</li>
         *                  <li>node   --> {Y.Node}</li>
         *                  <li>nodeid --> {String} created node's id (without #)</li>
         *                  <li>type   --> {String|WidgetClass} the created type
         *                  <li>widget --> {Widget-instance}handle to the created widgetinstance</li></ul>

         * @since 0.1
         *
        */
        getCurrentFormElements : function(attribute) {
          var instance = this,
              attributenodes = instance._ATTRS_nodes[attribute],
              currentElements = [],
              formelement;

            Y.log('getCurrentFormElements', 'info', 'ITSAFormModel');
            if (attributenodes) {
                // attribute is an attribute --> looking this way is quicker then iterating through instance._FORM_elements
                YArray.each(
                    attributenodes,
                    function(nodeid) {
                        var node = Y.one('#'+nodeid);
                        if (node) {
                            formelement = instance._FORM_elements[nodeid];
                            formelement.node = node;
                            currentElements.push(formelement);
                        }
                    }
                );
            }
            else {
                // looking for the buttons by iterating through instance._FORM_elements
                YObject.each(
                    instance._FORM_elements,
                    function(formelement) {
                        var node = Y.one('#'+formelement.nodeid);
                        if (node && node.getAttribute('name')===attribute) {
                            formelement.node = node;
                            currentElements.push(formelement);
                        }
                    }
                );
            }
            return currentElements;
        },

        /**
         * Returns the UI-value of a formelement into its Model-attribute. This might differ from the attribute-value as it resides in the Model-instance.
         * If the attribute has multiple UI in the dom, then it returns the value of the first UI-element. Which should be equal to all other UI-elements
         * byt moduledesign.
         *
         * @method getUI
         * @param attribute {String} name of the attribute which UI-value is to be returned.
         * @return {Any} value of the UI-element that correspons with the attribute.
         * @since 0.1
         *
        */
        getUI: function(attribute) {
            var instance = this,
                formElement, formElements, nodeid, nodeids, node, value, widget, type;

            Y.log('getUI', 'info', 'ITSAFormModel');
            nodeids = instance._ATTRS_nodes[attribute];
            nodeid = nodeids && (nodeids.length>0) && nodeids[0];
            formElements = instance._FORM_elements;
            formElement = nodeid && formElements[nodeid];
            if (formElement && (node=Y.one('#'+nodeid)) && node.getData('modelattribute')) {
                widget = formElement.widget;
                type = formElement.type;
                value = widget ? instance._getWidgetValue(widget, type) : node.get(VALUE);
                if (Lang.isValue(value)) {
/*jshint expr:true */
                    ((type==='date') || (type==='time') || (type==='date')) && (value = new Date(parseInt(value, 10)));
                    (type==='number') && (value = formElement.config.digits ? parseFloat(value) : parseInt(value, 10));
/*jshint expr:false */
                }
            }
            return value;
        },

        /**
         * Finds the unvalidated UI-values that belongs to this modelinstance.
         *
         * @method getUnvalidatedUI
         * @return {Y.NodeList} the found Nodes which validation failed
         * @since 0.1
         */
        getUnvalidatedUI : function () {
            var instance = this,
                node, valid, crossvalidation, unvalidNodes = [];

            Y.log('getUnvalidatedUI', 'info', 'ITSAFormModel');
            YObject.each(
                this._FORM_elements,
                function(formelement) {
                    if (!formelement.widget) {
                        node = Y.one('#'+formelement.nodeid);
                        if (node) {
                            valid = instance._validValue(node, formelement, formelement.name, node.get('value'));
                            instance._setNodeValidation(node, valid);
/*jshint expr:true */
                            valid || unvalidNodes.push(node);
/*jshint expr:false */
                        }
                    }
                }
            );
            // next we check 'crossValidation', this is done second, because the first step (validate per attribute) might set validation valid
            crossvalidation = instance.crossValidation();
            if (Lang.isArray(crossvalidation) && (crossvalidation.length>0)) {
                YArray.each(
                    crossvalidation,
                    function(item) {
                        var attribute = item.attribute,
                            attributenodes = attribute && instance._ATTRS_nodes[attribute];
                        if (attributenodes) {
                            YArray.each(
                                attributenodes,
                                function(nodeid) {
                                    var node = Y.one('#'+nodeid),
                                        validationerror = item.validationerror,
                                        error;
                                    if (node) {
                                        error = ((typeof validationerror === 'string') ? validationerror : null);
                                        instance._setNodeValidation(node, false, error);
                                        unvalidNodes.push(node);
                                    }
                                }
                            );
                        }
                    }
                );
            }
            Y.log('getUnvalidatedUI found '+unvalidNodes.length+' wrong validated formelement', 'info', 'ITSAFormModel');
            return new Y.NodeList(unvalidNodes);
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
         * @param [config.value] {String} returnvalue which is available inside the eventlistener through e.value
         * @param [config.data] when wanting to add extra data to the button, f.i. 'data-someinfo="somedata"'
         * @param [config.disabled]
         * @param [config.hidden]
         * @param [config.classname] for addeing extra classnames to the button
         * @param [config.focusable]
         * @param [config.primary] making it the primary-button
         * @param [config.tooltip] tooltip when Y.Tipsy or Y.Tipsy is used
         * @return {String} stringified version of the button which can be inserted in the dom.
         * @since 0.1
         *
         */
        renderBtn : function(buttonText, config) {
            Y.log('renderBtn', 'info', 'ITSAFormModel');
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
         * @param [config.value] {String} returnvalue which is available inside the eventlistener through e.value
         * @param [config.data] when wanting to add extra data to the button, f.i. 'data-someinfo="somedata"'
         * @param [config.disabled]
         * @param [config.hidden]
         * @param [config.classname] for addeing extra classnames to the button
         * @param [config.focusable]
         * @param [config.primary] making it the primary-button
         * @param [config.tooltip] tooltip when Y.Tipsy or Y.Tipsy is used
         * @return {String} stringified version of the button which can be inserted in the dom.
         * @since 0.1
         *
         */
        renderCancelBtn : function(buttonText, config) {
            Y.log('renderCancelBtn', 'info', 'ITSAFormModel');
            return this._renderBtn(buttonText, config, CANCEL, true);
        },

        /**
         *
         * Renderes a formelement-destroybutton. 'destroy' differs from 'remove' by NOT calling the destroy-method from the persistence layer (no syncing destroy).
         * By specifying 'config', the button can be configured in more detail.
         * <br />Imagebuttons can be set through 'buttonText', f.i.: '<i class="icon-destroy"></i> destroy'
         *
         * @method renderDestroyBtn
         * @param buttonText {String} Text on the button (equals buttonName whennot specified).
         * @param [config] {Object} config (which that is passed through to Y.ITSAFormElement)
         * @param [config.value] {String} returnvalue which is available inside the eventlistener through e.value
         * @param [config.data] when wanting to add extra data to the button, f.i. 'data-someinfo="somedata"'
         * @param [config.disabled]
         * @param [config.hidden]
         * @param [config.classname] for addeing extra classnames to the button
         * @param [config.focusable]
         * @param [config.primary] making it the primary-button
         * @param [config.tooltip] tooltip when Y.Tipsy or Y.Tipsy is used
         * @return {String} stringified version of the button which can be inserted in the dom.
         * @since 0.1
         *
         */
        renderDestroyBtn : function(buttonText, config) {
            Y.log('renderDestroyBtn', 'info', 'ITSAFormModel');
            return this._renderBtn(buttonText, config, DESTROY, true);
        },

        /**
         *
         * Renderes a formelement-removebutton. 'remove' differs from 'destroy' by calling the destroy-method from the persistence layer (syncing destroy).
         * By specifying 'config', the button can be configured in more detail.
         * <br />Imagebuttons can be set through 'buttonText', f.i.: '<i class="icon-remove"></i> remove'
         *
         * @method renderRemoveBtn
         * @param buttonText {String} Text on the button (equals buttonName whennot specified).
         * @param [config] {Object} config (which that is passed through to Y.ITSAFormElement)
         * @param [config.value] {String} returnvalue which is available inside the eventlistener through e.value
         * @param [config.data] when wanting to add extra data to the button, f.i. 'data-someinfo="somedata"'
         * @param [config.disabled]
         * @param [config.hidden]
         * @param [config.classname] for addeing extra classnames to the button
         * @param [config.focusable]
         * @param [config.primary] making it the primary-button
         * @param [config.tooltip] tooltip when Y.Tipsy or Y.Tipsy is used
         * @return {String} stringified version of the button which can be inserted in the dom.
         * @since 0.1
         *
         */
        renderRemoveBtn : function(buttonText, config) {
            Y.log('renderRemoveBtn', 'info', 'ITSAFormModel');
            return this._renderBtn(buttonText, config, REMOVE, true);
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
         * @param [config.value] {String} returnvalue which is available inside the eventlistener through e.value
         * @param [config.data] when wanting to add extra data to the button, f.i. 'data-someinfo="somedata"'
         * @param [config.disabled]
         * @param [config.hidden]
         * @param [config.classname] for adding extra classnames to the button
         * @param [config.focusable]
         * @param [config.primary] making it the primary-button
         * @param [config.tooltip] tooltip when Y.Tipsy or Y.Tipsy is used
         * @return {String} stringified version of the button which can be inserted in the dom.
         * @since 0.1
         *
         */
        renderResetBtn : function(buttonText, config) {
            Y.log('renderResetBtn', 'info', 'ITSAFormModel');
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
         * @param [config.value] {String} returnvalue which is available inside the eventlistener through e.value
         * @param [config.data] when wanting to add extra data to the button, f.i. 'data-someinfo="somedata"'
         * @param [config.disabled]
         * @param [config.hidden]
         * @param [config.classname] for addeing extra classnames to the button
         * @param [config.focusable]
         * @param [config.primary] making it the primary-button
         * @param [config.tooltip] tooltip when Y.Tipsy or Y.Tipsy is used
         * @return {String} stringified version of the button which can be inserted in the dom.
         * @since 0.1
         *
         */
        renderSaveBtn : function(buttonText, config) {
            Y.log('renderSaveBtn', 'info', 'ITSAFormModel');
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
         * @param [config.value] {String} returnvalue which is available inside the eventlistener through e.value
         * @param [config.data] when wanting to add extra data to the button, f.i. 'data-someinfo="somedata"'
         * @param [config.disabled]
         * @param [config.hidden]
         * @param [config.classname] for addeing extra classnames to the button
         * @param [config.focusable]
         * @param [config.primary] making it the primary-button
         * @param [config.tooltip] tooltip when Y.Tipsy or Y.Tipsy is used
         * @return {String} stringified version of the button which can be inserted in the dom.
         * @since 0.1
         *
         */
        renderSubmitBtn : function(buttonText, config) {
            Y.log('renderSubmitBtn', 'info', 'ITSAFormModel');
            return this._renderBtn(buttonText, config, SUBMIT);
        },

        /**
         *
         * Renderes an attribute into its formelement.
         *
         * @method renderFormElement
         * @param attribute {String} attribute that needs to be rendered.
         * @return {String} stringified version of the element which can be inserted in the dom.
         * @since 0.1
         *
        */
        renderFormElement : function(attribute) {
            var instance = this,
                formelements, attributenodes, attr, attrconfig, formelement, element, formtype, formconfig, valuefield,
                nodeid, widget, iswidget, widgetValuefieldIsarray;
            Y.log('renderFormElement', 'info', 'ITSAFormModel');
            formelements = instance._FORM_elements;
            attributenodes = instance._ATTRS_nodes;
            attr = instance.get(attribute);
            attrconfig = instance._getAttrCfg(attribute);
            formtype = attrconfig.formtype || 'text';
            iswidget = ((typeof formtype === 'function') && formtype.NAME);
            if (iswidget || instance._allowedFormTypes[formtype]) {
                formconfig = attrconfig.formconfig || {};
                formconfig.value = attr;
                // in case of a widget, also set its value property
                if (iswidget) {
                    valuefield = instance._getWidgetValueField(formtype);
/*jshint expr:true */
                    formconfig.widgetconfig || (formconfig.widgetconfig = {});
/*jshint expr:false */
                    // some widgets like Y.ToggleButton can have different valuefields. We need to check them all.
                    // In those cases, valuefield is an array.
                    widgetValuefieldIsarray = (typeof valuefield !== 'string');
                    if (widgetValuefieldIsarray) {
                        YArray.each(
                            valuefield,
                            function(field) {
                                formconfig.widgetconfig[field] = attr;
                            }
                        );
                    }
                    else {
                        formconfig.widgetconfig[valuefield] = attr;
                    }
                }
                formconfig.modelattribute = true;
                formconfig.name = attribute;
                formconfig.tooltipinvalid = attrconfig.validationerror;
                formconfig.required = false; // disable by setting false
                formconfig.removepattern = true; // specify to remove the pattern property
                formelement = ITSAFormElement.getElement(formtype, formconfig);
                // store in instance._FORM_elements
                nodeid = formelement.nodeid;
                formelements[nodeid] = formelement;
                // store in instance._ATTRS_nodes
/*jshint expr:true */
                attributenodes[attribute] || (attributenodes[attribute]=[]);
/*jshint expr:false */
                attributenodes[attribute].push(nodeid);
                // make sure elements gets removed from instance._ATTRS_nodes and instance._FORM_elements
                // when the element is inserted in the dom and gets removed from the dom again
                YNode.unavailablePromise('#'+nodeid, {afteravailable: true}).then(
                    function() {
                        var attributenodeids = attributenodes[attribute],
                            index = attributenodeids && YArray.indexOf(attributenodeids, nodeid);
                        delete formelements[nodeid];
                        if (index>0) {
alert('removing attribute '+attribute+' at index '+index);
                            attributenodeids.splice(index, 1);
                        }
alert('removing attribute '+attribute+'from formelements');
                    }
                );
                // if widget, then we need to add an eventlistener for valuechanges:
                widget = formelement.widget;
                if (widget) {
                    if (widgetValuefieldIsarray) {
                        YArray.each(
                            valuefield,
                            function(field) {
                                instance._eventhandlers.push(
                                    widget.after(
                                        field+'Change',
                                        function(e) {
                                            var type = UI_CHANGED,
                                                payload = {
                                                    target: instance,
                                                    value: e.newVal,
                                                    formElement: formelement,
                                                    node: Y.one('#'+nodeid),
                                                    nodeid: nodeid,
                                                    type: type
                                                };
                                            // refireing, but now by the instance:
                                            instance.fire(type, payload);
                                        }
                                    )
                                );
                            }
                        );
                    }
                    else {
                        instance._eventhandlers.push(
                            widget.after(
                                valuefield+'Change',
                                function(e) {
                                    var type = UI_CHANGED,
                                        payload = {
                                            target: instance,
                                            value: e.newVal,
                                            formElement: formelement,
                                            node: Y.one('#'+nodeid),
                                            nodeid: nodeid,
                                            type: type
                                        };
                                    // refireing, but now by the instance:
                                    instance.fire(type, payload);
                                }
                            )
                        );
                    }
                }
                element = formelement.html;
                if (formelement.widget) {
                    formelement.widget.addTarget(instance);
                }
            }
            else {
                element = UNDEFINED_ELEMENT;
            }
            return element;
        },

        /**
         * Sets the 'life-update'-status to true or false
         *
         * @method setLifeUpdate
         * @chainable;
         * @since 0.1
        */
        setLifeUpdate : function(value) {
            var instance = this;

            Y.log('setLifeUpdate '+value, 'info', 'ITSAFormModel');
/*jshint expr:true */
            (typeof value === 'boolean') && (instance._lifeUpdate = value);
/*jshint expr:false */
            return instance;
        },

        /**
         * Creates the hash that holds the attribute-values which sould be used during a resetclick- or cancelclick-event.
         * Call this method to freese the state that possibly needs to be restored.
         * <u>note:</u> if not called, than the hash holds the inititial model-attributes during creation.
         *
         * @method setResetAttrs
         * @since 0.1
        */
        setResetAttrs : function() {
            var instance = this;

            Y.log('renderBtn', 'info', 'ITSAFormModel');
            instance._bkpAttrs = instance.getAttrs();
        },

        /**
         * Defines the valuefield for widget that hold the valu in an attribute other than 'value'.
         * You must specify EVERY widget with a different valuefield that you want as a formmodel.
         * The values are stored in the prototype, so you need to declare them only once. Y.ITSACheckbo and Y.ITSASelectList
         * are already declared.
         *
         * @method setWidgetValueField
         * @param widgetClassname {String} the widgets classname
         * @param valueField {String|Array} the widgets valuefield. In case the Widget can have more than one valuefield (Y.ToggleButton does), you can supply an array of Strings
         * @since 0.1
         */
        setWidgetValueField : function(widgetClassname, valueField) {
            Y.log('_getWidgetValueField', 'info', 'ITSAFormModel');
            this._widgetValueFields[widgetClassname] = valueField;
        },

        /**
         * Returns a this model's attributes rendered as UI-elements, that can be passed to Y.JSON.stringify() or used for other nefarious purposes.
         * <br /><br />
         * By specifying 'buttons', you can declare extra keys that represent the buttons. 'buttons' needs to be an array that holds objects with the next properties:
         *
         * <ul>
         * <li>key --> reference-key which will be part (key) of the result</li>
         * <li>type --> 'button', 'cancel', 'destroy', 'remove', 'reset', 'save' or 'submit'</li>
         * <li>buttonText --> text rendered on the button</li>
         * <li>config</li> config-object that is passed through the renderBtn-function</li>
         *
         * @method toJSONUI
         * @param buttons {Array} the widgets classname
         * @param valueField {String|Array} the widgets valuefield. In case the Widget can have more than one valuefield (Y.ToggleButton does), you can supply an array of Strings
         * @since 0.1
         */
        toJSONUI : function(buttons) {
            var instance = this,
                UIattrs = {};

            Y.log('toJSONUI', 'info', 'ITSAFormModel');
            YObject.each(
                instance.getAttrs(),
                function(value, key) {
                    UIattrs[key] = instance.renderFormElement(key);
                }
            );
            if (Lang.isArray(buttons)) {
                YArray.each(
                    buttons,
                    function(buttonobject) {
                        var key = buttonobject.key,
                            type = buttonobject.type,
                            buttonText = buttonobject.buttonText,
                            config = buttonobject.config,
                            renderBtnFns = instance._renderBtnFns;
/*jshint expr:true */
                        key && type && renderBtnFns[type] && (UIattrs[key]=Y.bind(renderBtnFns[type], instance, buttonText, config)());
/*jshint expr:false */
                    }
                );
            }
            return UIattrs;
        },

        /**
         * Copies the UI-value of a formelement into its Model-attribute.
         *
         * @method UIToModel
         * @param [nodeid] {String} nodeid of the formelement (without '#'), when left empty, all formelement-properties are set.
         * @since 0.1
         *
        */
        UIToModel: function(nodeid) {
            var instance = this,
                formElement, formElements, options, node, value, attribute, widget, type;

            Y.log('UItoModel', 'info', 'ITSAFormModel');
            formElements = instance._FORM_elements;
            formElement = nodeid && formElements[nodeid];
            if (formElement && (node=Y.one('#'+nodeid)) && node.getData('modelattribute')) {
                widget = formElement.widget;
                type = formElement.type;
                value = widget ? instance._getWidgetValue(widget, type) : node.get(VALUE);
                attribute = formElement.name;
                if (Lang.isValue(value)) {
                    options = {formelement: true}; // set Attribute with option: '{formelement: true}' --> Form-Views might not want to re-render.
/*jshint expr:true */
                    ((type==='date') || (type==='time') || (type==='date')) && (value = new Date(parseInt(value, 10)));
                    (type==='number') && (value = formElement.config.digits ? parseFloat(value) : parseInt(value, 10));
/*jshint expr:false */
                    instance.set(attribute, value, options);
                }
            }
            else if (!nodeid) {
                // save all attributes
                YObject.each(
                    instance._FORM_elements,
                    function(formelement, nodeid) {
                        instance.UIToModel(nodeid);
                    }
                );
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
            Y.log('destructor', 'info', 'ITSAFormModel');
            if (instance._autoSaveTimer) {
                instance._autoSaveTimer.cancel();
            }
            if (instance._fireEventTimer) {
                instance._fireEventTimer.cancel();
            }
            instance._clearEventhandlers();
            instance._removeTargets();
            instance._FORM_elements = {};
            instance._ATTRS_nodes = {};
            instance._focusNextElements = {};
            // DO NOT EMPTY _widgetValueFields --> that is a prototype object
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

            Y.log('_bindUI', 'info', 'ITSAFormModel');

            // listening for a click on any 'datetimepicker'-button or a click on any 'form-element'-button in the dom
            eventhandlers.push(
                body.delegate(
                    [DATEPICKER_CLICK, TIMEPICKER_CLICK, DATETIMEPICKER_CLICK, BUTTON_CLICK,
                     SAVE_CLICK, DESTROY_CLICK, REMOVE_CLICK, CANCEL_CLICK, SUBMIT_CLICK, RESET_CLICK],
                    function(e) {
                        e.preventDefault(); // prevent the form to be submitted
                        var node = e.target,
                            type = e.type,
                            value = node.getAttribute(VALUE),
                            payload = {
                                target: instance,
                                value: ((type===DATEPICKER_CLICK) || (type===TIMEPICKER_CLICK) || (type===DATETIMEPICKER_CLICK)) ? (new Date().setTime(parseInt(value, 10))) : value,
                                formElement: instance._FORM_elements[node.get('id')],
                                buttonNode: node,
                                type: type
                            };
                        // refireing, but now by the instance:
                        instance.fire(type, payload);
                    },
                    function(delegatedNode, e){ // node === e.target
                        // only process if node's id is part of this ITSAFormModel-instance:
                        return instance._FORM_elements[e.target.get('id')];
                    }
                )
            );

            // listening for a click on any widget-element's parentnode and prevent the buttonclick form sending forms
            eventhandlers.push(
                body.delegate(
                    'click',
                    function(e) {
                        e.preventDefault(); // prevent the form to be submitted
                    },
                    '.itsa-widget-parent'
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
                                formElement: instance._FORM_elements[node.get('id')],
                                node: node,
                                nodeid: node.get('id'),
                                type: type
                            };
                        // refireing, but now by the instance:
                        instance.fire(type, payload);
                    },
                    function(delegatedNode, e){ // node === e.target
                        // only process if node's id is part of this ITSAFormModel-instance:
                        return instance._FORM_elements[e.target.get('id')];
                    }
                )
            );

            // listening life for changes outside the UI --> do we need to update the UI?
            eventhandlers.push(
                instance.after(
                    '*:change',
                    function(e) {
                        // if e.formelement, then the changes came from the UI
                        if (!e.formelement) {
                            Y.use('gallery-itsadialog', function() {
                                if (instance._lifeUpdate) {
                                    // the first parameter in the response needs to be 'null' and not the promise result
                                    Y.confirm(MSG_MODELCHANGED_OUTSIDEFORM_RESETORLOAD).then(
                                        Y.bind(instance._modelToUI, instance, null),
                                        Y.bind(instance.UIToModel, instance, null)
                                    );
                                }
                                else {
                                    // the first parameter in the response needs to be 'null' and not the promise result
                                    Y.confirm(MSG_MODELCHANGED_OUTSIDEFORM).then(
                                        Y.bind(instance._modelToUI, instance, null)
                                    );
                                }
                            });
                        }
                    }
                )
            );

            // listening life for valuechanges
            eventhandlers.push(
                body.delegate(
                    'keypress',
                    function(e) {
                        e.preventDefault();
                        var type = FOCUS_NEXT,
                            payload = {
                                target: e.target,
                                type: type
                            };
                        // refireing, but now by the instance:
                        instance.fire(type, payload);
                    },
                    function(delegatedNode, e){ // node === e.target
                        // only process if node's id is part of this ITSAFormModel-instance and if enterkey is pressed
                        var formelement = instance._FORM_elements[e.target.get('id')];
                        return (formelement && (e.keyCode===13) && instance._focusNextElements[formelement.type]);
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
            Y.log('_clearEventhandlers', 'info', 'ITSAFormModel');
            YArray.each(
                this._eventhandlers,
                function(item){
                    item.detach();
                }
            );
        },

        /**
         *
         * Default function for the 'cancelclick'-event
         *
         * @method _defFnCancel
         * @param e {EventFacade} Event Facade including:
         * @param e.target {Y.ITSAFormModel} The ITSAFormModel-instance
         * @param e.value {Any} Should be used to identify the button --> defined during rendering: is either config.value or buttonText
         * @param e.buttonNode {Y.Node} reference to the buttonnode
         * @param e.formElement {Object} reference to the form-element
         * @private
         * @since 0.1
         *
        */
        _defFnCancel : function() {
            var instance = this;

            Y.log('_defFnCancel', 'info', 'ITSAFormModel');
            instance.setAttrs(instance._bkpAttrs);
        },

        /**
         *
         * Default function for the 'destroyclick'-event
         *
         * @method _defFnDestroy
         * @param e {EventFacade} Event Facade including:
         * @param e.target {Y.ITSAFormModel} The ITSAFormModel-instance
         * @param e.value {Any} Should be used to identify the button --> defined during rendering: is either config.value or buttonText
         * @param e.buttonNode {Y.Node} reference to the buttonnode
         * @param e.formElement {Object} reference to the form-element
         * @private
         * @since 0.1
         *
        */
        _defFnDestroy : function() {
            Y.log('_defFnDestroy', 'info', 'ITSAFormModel');
            this.destroyPromise();
        },

        /**
         *
         * Default function for the 'datepickerclick'-, 'timepickerclick'- and 'datetimepickerclick'-event
         *
         * @method _defFnChangeDate
         * @param e {EventFacade} Event Facade including:
         * @param e.target {Y.ITSAFormModel} The ITSAFormModel-instance
         * @param e.value {Any} Should be used to identify the button --> defined during rendering: is either config.value or buttonText
         * @param e.buttonNode {Y.Node} reference to the buttonnode
         * @param e.formElement {Object} reference to the form-element
         * @private
         * @since 0.1
         *
        */
        _defFnChangeDate : function(e) {
            Y.log('_defFnChangeDate', 'info', 'ITSAFormModel');

            Y.use('gallery-itsadatetimepicker', function() {
                var instance = e.target,
                    type = e.type,
                    node = e.buttonNode,
                    picker = Y.ItsaDateTimePicker,
                    formElement = e.formElement,
                    date = Lang.isDate(e.value) ? e.value : (new Date()),
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
                promise(new Date(date), formElement.config)
                .then(
                    function(newdate) {
                      // first we need to use the new datevalue and reflect it (update) to the UI-element
                      dateformat = formElement.config.format;
                      instance._updateDateTimeUI(formElement.name, newdate, type, dateformat);
                      if (instance._lifeUpdate) {
                          instance.UIToModel(node.get('id'));
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
         *
         * Default function for the 'destroyclick'-event
         *
         * @method _defFnRemove
         * @param e {EventFacade} Event Facade including:
         * @param e.target {Y.ITSAFormModel} The ITSAFormModel-instance
         * @param e.value {Any} Should be used to identify the button --> defined during rendering: is either config.value or buttonText
         * @param e.buttonNode {Y.Node} reference to the buttonnode
         * @param e.formElement {Object} reference to the form-element
         * @private
         * @since 0.1
         *
        */
        _defFnRemove : function() {
            Y.log('_defFnRemove', 'info', 'ITSAFormModel');
            this.destroyPromise({remove: true});
        },

        /**
         *
         * Default function for the 'resetclick'-event
         *
         * @method _defFnReset
         * @param e {EventFacade} Event Facade including:
         * @param e.target {Y.ITSAFormModel} The ITSAFormModel-instance
         * @param e.value {Any} Should be used to identify the button --> defined during rendering: is either config.value or buttonText
         * @param e.buttonNode {Y.Node} reference to the buttonnode
         * @param e.formElement {Object} reference to the form-element
         * @private
         * @since 0.1
         *
        */
        _defFnReset : function() {
            var instance = this;

            Y.log('_defFnReset', 'info', 'ITSAFormModel');
            instance.setAttrs(instance._bkpAttrs);
            instance._modelToUI();
            instance._removeValidation();
        },

        /**
         *
         * Default function for the 'submitclick'-event. When there is a validate-error, no submit will be done, but a 'validationerror'-event will be fired.
         *
         * @method _defFnSubmit
         * @param e {EventFacade} Event Facade including:
         * @param e.target {Y.ITSAFormModel} The ITSAFormModel-instance
         * @param e.value {Any} Should be used to identify the button --> defined during rendering: is either config.value or buttonText
         * @param e.buttonNode {Y.Node} reference to the buttonnode
         * @param e.formElement {Object} reference to the form-element
         * @private
         * @since 0.1
         *
        */
        _defFnSubmit : function() {
            var instance = this,
                prevAttrs, unvalidNodes;

            Y.log('_defFnSubmit', 'info', 'ITSAFormModel');
            unvalidNodes = instance.getUnvalidatedUI();
            if (unvalidNodes.isEmpty()) {
                prevAttrs = instance.getAttrs();
                instance.UIToModel();
                instance.submitPromise().then(
                     null,
                     function() {
                          // reset to previous values
                         instance.setAttrs(prevAttrs);
                         instance._modelToUI();
                     }
                );
            }
            else {
                instance.fire(VALIDATION_ERROR, {nodelist: unvalidNodes});
            }
        },

        /**
         *
         * Default function for the 'saveclick'-event. When there is a validate-error, no submit will be done, but a 'validationerror'-event will be fired.
         *
         * @method _defFnSave
         * @param e {EventFacade} Event Facade including:
         * @param e.target {Y.ITSAFormModel} The ITSAFormModel-instance
         * @param e.value {Any} Should be used to identify the button --> defined during rendering: is either config.value or buttonText
         * @param e.buttonNode {Y.Node} reference to the buttonnode
         * @param e.formElement {Object} reference to the form-element
         * @private
         * @since 0.1
         *
        */
        _defFnSave : function() {
            var instance = this,
                prevAttrs, unvalidNodes;

            Y.log('_defFnSave', 'info', 'ITSAFormModel');
            unvalidNodes = instance.getUnvalidatedUI();
            if (unvalidNodes.isEmpty()) {
                prevAttrs = instance.getAttrs();
                instance.UIToModel();
                instance.savePromise().then(
                     null,
                     function() {
                          // reset to previous values
                         instance.setAttrs(prevAttrs);
                         instance._modelToUI();
                     }
                );
            }
            else {
                instance.fire(VALIDATION_ERROR, {nodelist: unvalidNodes});
            }
        },

        /**
         *
         * Default function for the 'uichanged'-event which counts for every UI-formelements (meaning no buttons).
         *
         * @method _defFnUIChanged
         * @param e {EventFacade} Event Facade including:
         * @param e.target {Y.ITSAFormModel} The ITSAFormModel-instance
         * @param e.value {Date} current value of the property
         * @param e.node {Y.Node} reference to the element-node
         * @param e.nodeid {String} id of the element-node (without '#')
         * @param e.formElement {Object} reference to the form-element
         * @private
         * @since 0.1
         *
        */
        _defFnUIChanged : function(e) {
            // should not be called by widgets
            var instance = this,
                formelement = e.formElement,
                attribute = formelement.name,
                type = formelement.type,
                value = e.value,
                node, valid, field;

            Y.log('_defFnUIChanged, attribute  '+formelement.name, 'info', 'ITSAFormModel');
            if (formelement.widget) {
                field = this._getWidgetValueField(type);
                if (typeof field === 'string') {
                    instance._updateSimularWidgetUI(e.nodeid, attribute, field, value);
                }
                else {
                    YArray.each(
                        field,
                        function(onefield) {
                            instance._updateSimularWidgetUI(e.nodeid, attribute, onefield, value, true);
                        }
                    );
                }
            }
            else {
                node = e.node;
                valid = instance._validValue(node, formelement, attribute, value);
                instance._updateSimularUI(node, attribute, value, valid);
                if (instance._lifeUpdate && valid) {
                    instance.UIToModel(node.get('id'));
                }
            }
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
         * @since 0.1
         */
        _getWidgetValue : function(widget, type) {
            Y.log('_getWidgetValue', 'info', 'ITSAFormModel');
            var field = this._getWidgetValueField(type);
            // In case of multiple fields, they all should be thes same, so we can take the first item of the array.
            return (widget && widget.get((typeof field === 'string') ? field : field[0]));
        },

        /**
         * Renderes the field or attribute that holds the value. With ordinary form-elements this will be 'value',
         * but widgets might have a value-property with another name.
         *
         * @method _getWidgetValueField
         * @param type {String|widgetClass} the elementtype to be created. Can also be a widgetclass.
         *                                         --> see ItsaFormElement for the attribute 'type' for further information.
         * @return {String|Array} the valuefield (attribute-name in case of widget). Some Widgets -like ToggleButton- can have different
         * valuefiels: in that case an array is returned.
         * @private
         * @since 0.1
         */
        _getWidgetValueField : function(type) {
            Y.log('_getWidgetValueField', 'info', 'ITSAFormModel');
            var iswidget = ((typeof type === 'function') && type.NAME);
            return (iswidget && this._widgetValueFields[type.NAME]) || 'value';
        },

        /**
         * Copies the Model-attribute-value into the UI-formelement.
         *
         * @method _modelToUI
         * @param [nodeid] {String} nodeid of the formelement (without '#'), when left empty, all formelement-properties are set.
         * @private
         * @since 0.1
         *
        */
        _modelToUI : function(nodeid) {
            var instance = this,
                formElement, formElements, node, value, attribute, widget, datetime, type, dateformat, field;

            Y.log('UItoModel', 'info', 'ITSAFormModel');
            formElements = instance._FORM_elements;
            formElement = nodeid && formElements[nodeid];
            if (formElement && (node=Y.one('#'+nodeid)) && node.getData('modelattribute')) {
                widget = formElement.widget;
                attribute = formElement.name;
                value = instance.get(attribute, value);
                if (widget) {
                    field = this._getWidgetValueField(formElement.type);
                    widget.set(((typeof field === 'string') ? field : field[0]), value);
                }
                else {
                    type = formElement.type;
                    datetime = ((type==='date') || (type==='time') || (type==='datetime'));
                    if (datetime) {
                        dateformat = formElement.config.format;
                        instance._updateDateTimeUI(formElement.name, value, type, dateformat);
                    }
                    else {
                        node.set('value', value);
                    }
                }
            }
            else if (!nodeid) {
                // save all attributes
                YObject.each(
                    instance._FORM_elements,
                    function(formelement, nodeid) {
                        instance._modelToUI(nodeid);
                    }
                );
            }
        },

        /**
         * Cleaning up all widgettargets
         *
         * @method _removeTargets
         * @private
         * @since 0.1
         *
        */
        _removeTargets : function() {
            var instance = this;

            Y.log('_removeTargets', 'info', 'ITSAFormModel');
            YObject.each(
                instance._FORM_elements,
                function(formElement) {
                    var widget = formElement.widget;
                    if (widget) {
                        widget.removeTarget(instance);
                    }
                }
            );
        },

        /**
         * Removes the node-attribute 'data-valid' from all UI-elements that belong to this modelinstance.
         *
         * @method _removeValidation
         * @private
         * @since 0.1
         */
        _removeValidation : function () {
            var instance = this;

            Y.log('_removeValidation', 'info', 'ITSAFormModel');
            YObject.each(
                instance._FORM_elements,
                function(formelement) {
                    var node = Y.one('#'+formelement.nodeid);
/*jshint expr:true */
                    node && instance._setNodeValidation(node, false);
/*jshint expr:false */
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
         * @param [config.value] {String} returnvalue which is available inside the eventlistener through e.value
         * @param [config.data] when wanting to add extra data to the button, f.i. 'data-someinfo="somedata"'
         * @param [config.disabled]
         * @param [config.hidden]
         * @param [config.classname] for addeing extra classnames to the button
         * @param [config.focusable]
         * @param [config.primary] making it the primary-button
         * @param [config.tooltip] tooltip when Y.Tipsy or Y.Tipsy is used
         * @param [buttontype] {String} type of button that needs to be rendered
         * @param [extradata] {Boolean} whether 'data-buttonsubtype="buttontype"' should be added as a node-attribute
         * @return {String} stringified version of the button which can be inserted in the dom.
         * @since 0.1
         *
         */
        _renderBtn : function(buttonText, config, buttontype, extradata) {
            var instance = this,
                formbutton, nodeid;

            Y.log('renderBtn', 'info', 'ITSAFormModel');
/*jshint expr:true */
            config || (config = {});
            buttontype || (buttontype = BUTTON);
            buttonText || (buttonText = buttontype);
/*jshint expr:false */
            config.buttonText = buttonText;
            if (extradata) {
/*jshint expr:true */
                config.data || (config.data = '');
/*jshint expr:false */
                config.data += ' '+DATA_BUTTON_SUBTYPE+'="'+buttontype+'"';
            }
            config.buttontype = buttontype;
            formbutton = ITSAFormElement.getElement(BUTTON, config);
            nodeid = formbutton.nodeid;
            // store in instance._FORM_elements
            instance._FORM_elements[nodeid] = formbutton;

            // make sure elements gets removed from instance._FORM_elements
            // when the element is inserted in the dom and gets removed from the dom again
            YNode.unavailablePromise('#'+nodeid, {afteravailable: true}).then(
                function() {
alert('removing button '+attribute+'from formelements');
                    delete formelements[nodeid];
                }
            );

            return formbutton.html;
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
         * @since 0.1
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
                        var labelnode = Y.one('span[data-for="'+nodeid+'"]');
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
         * @param valid {Boolean|null} whether the new value is validated
         * @private
         * @since 0.1
         *
        */
        _updateSimularUI : function(changedNode, attribute, newvalue, valid) {
            var instance = this,
                attributenodes = instance._ATTRS_nodes[attribute];

            Y.log('_updateSimularUI changedNode '+changedNode+' attribute: '+attribute+' newvalue:'+newvalue, 'info', 'ITSAFormModel');
            if (attributenodes) {
              YArray.each(
                  attributenodes,
                  function(nodeid) {
                      var node = Y.one('#'+nodeid);
                      if (node) {
/*jshint expr:true */
                          (node!==changedNode) && node.set('value', newvalue);
/*jshint expr:false */
                         instance._setNodeValidation(node, valid);
                      }
                  }
              );
            }
            if (instance._lifeUpdate) {
                instance.UIToModel(changedNode.get('id'));
            }
        },

        /**
         * Sets node validation-state by specifying 'data-valid' true or false. Also sets valid- or invalid-tooltip.
         *
         * @method _setNodeValidation
         * @param node {Y.Node} node which validation should be set
         * @param value {Boolean} validated or not
         * @param [tooltip] {String} to force a specific tooltip-message
         * @private
         * @since 0.1
        */
        _setNodeValidation : function (node, value, tooltip) {
            var newContent;

            Y.log('_setNodeValidation node '+node.get("id")+' --> '+value, 'info', 'ITSAFormModel');
            node.setAttribute('data-valid', value);
            newContent = tooltip || node.getAttribute('data-content' + (value ? 'valid' : 'invalid'));
            if (newContent) {
                node.setAttribute('data-content', newContent);
            }
            else {
                node.removeAttribute('data-content');
            }
        },

        /**
         *
         * Updates all Widget UI-elements when a widget changes its value.
         *
         * @method _updateSimularWidgetUI
         * @param changedNodeId {String} the nodeid (without '#') of the widget's container that caused the change
         * @param attribute {String} attribute that is changed by a UI-element
         * @param valueattribute {String} the widgets value-attribute
         * @param value {Any} widgets new value
         * @private
         * @since 0.1
         *
        */
        _updateSimularWidgetUI : function(changedNodeId, attribute, valueattribute, value, multiplefields) {
            var instance = this,
                attributenodes = instance._ATTRS_nodes[attribute],
                formelement, widget;
            Y.log('_updateSimularWidgetUI changedNodeId '+changedNodeId+' attribute: '+attribute+' valueattribute:'+valueattribute+' newvalue:'+value, 'info', 'ITSAFormModel');
            if (attributenodes) {
                YArray.each(
                    attributenodes,
                    function(nodeid) {
                        // update widgetvalue
                        formelement = instance._FORM_elements[nodeid];
                        widget = formelement && formelement.widget;
                        if ((nodeid!==changedNodeId) || multiplefields) { // in case of multiplefields always set the attribute, to make sure are fields are set
/*jshint expr:true */
                            widget && widget.set(valueattribute, value);
/*jshint expr:false */
                        }
                        // in case of slider: update valueattribute --> do this for ALL sliders
                        if (widget && (widget.getClassName()==='yui3-slider')) {
                            var labelnode = Y.one('span[data-for="'+nodeid+'"]');
/*jshint expr:true */
                            labelnode && labelnode.set('text', value);
/*jshint expr:false */
                        }
                    }
                );
            }
            if (instance._lifeUpdate) {
                instance.UIToModel(changedNodeId);
            }
        },

        /**
         * Checks whether the UI-value of a formelement has validated value. Not meant for widgets
         *
         * @method _validValue
         * @param node {Y.Node} node of the formelement
         * @param formelement {Object} item from the internal list instance._FORM_elements
         * @param attribute {String} name of the attribute
         * @param value {String} value of formelement
         * @private
         * @return {Boolean} true when valid
         * @since 0.1
         */
        _validValue : function(node, formelement, attribute, value) {
            var instance = this,
                type = formelement.type,
                typeok = ((type==='date') || (type==='time') || (type==='datetime') || (type==='checkbox')),
                attrconfig, attrValidationFunc, nodePattern, validByAttrFunc, validByPattern;

            Y.log('_validValue attribute  '+attribute, 'info', 'ITSAFormModel');
            if (!typeok) { // typeok are types that are always is ok, for it was created by the datetimepicker, or a checkbox
                attrconfig = instance._getAttrCfg(attribute);
                attrValidationFunc = attrconfig.validator;
                nodePattern = node.getAttribute('data-pattern');
                validByAttrFunc = !attrValidationFunc || attrValidationFunc((type==='number' ? (formelement.config.digits ? parseFloat(value) : parseInt(value, 10)) : value));
                validByPattern = !nodePattern || new RegExp(nodePattern, "i").test(value);
            }
            return typeok || (validByAttrFunc && validByPattern);
        }

    }, {
        _ATTR_CFG: ['formtype', 'formconfig', 'validationerror']
    }
);

Y.ITSAFormModel.prototype._widgetValueFields.itsacheckbox = 'checked';
Y.ITSAFormModel.prototype._widgetValueFields.itsaselectlist = 'index';
Y.ITSAFormModel.prototype._widgetValueFields.toggleButton = ['checked','pressed'];
Y.ITSAFormModel.prototype._widgetValueFields.editorBase = 'content';

//===================================================================
//===================================================================

// Define synthetic events to Y.Event. Choosing not to document these by altering the commentcode
/*
  * Node-event fired when the normal button is clicked.
  * that is: generated through renderBtn() and not a specified button like 'save', or 'submit'.
  *
  * @event node:buttonclick
  * @param e {EventFacade} Event Facade including:
  * @param e.target {Y.Node} The ButtonNode that was clicked
  *
*/

/*
  * Node-event fired when the destroy-button is clicked.
  *
  * @event node:destroyclick
  * @param e {EventFacade} Event Facade including:
  * @param e.target {Y.Node} The ButtonNode that was clicked
  *
*/

/*
  * Node-event fired when the save-button is clicked.
  *
  * @event node:saveclick
  * @param e {EventFacade} Event Facade including:
  * @param e.target {Y.Node} The ButtonNode that was clicked
  *
*/

/*
  * Node-event fired when the cancel-button is clicked.
  *
  * @event node:cancelclick
  * @param e {EventFacade} Event Facade including:
  * @param e.target {Y.Node} The ButtonNode that was clicked
  *
*/

YArray.each(
    [BUTTON, SAVE, DESTROY, REMOVE, CANCEL],
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
        "base-base",
        "attribute-base",
        "base-build",
        "model",
        "datatype-date-format",
        "node-base",
        "node-core",
        "oop",
        "node-event-delegate",
        "event-synthetic",
        "event-valuechange",
        "event-base",
        "gallery-itsanodepromise",
        "gallery-itsamodelsyncpromise",
        "gallery-itsaformelement"
    ]
});
