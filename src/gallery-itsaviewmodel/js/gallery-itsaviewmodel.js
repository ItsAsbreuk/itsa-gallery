'use strict';

/*jshint maxlen:200 */

/**
 *
 * Widget ITSAViewModel
 *
 *
 * This widget renderes Y.Model-instances -or just plain objects- inside the widgets contentBox.
 * It uses Y.View under the hood, where Y.View.container is bound to the 'contentBox'. The render-method must be defined
 * by the widget's attribute 'template'. The Model (or object) must be set through the attribute MODEL.
 *
 * Events can be set through the attribute 'events' and follow the same pattern as Y.View does. As a matter of fact, all attributes
 * (template, model, events) are passed through to the widgets Y.View instance (which has the property 'view').
 *
 *
 * Using this widget is great to render Model on the page, where the widget keeps synced with the model. Whenever a new Model-instance
 * is attached to the widget, or another template is used, the wodget will be re-rendered automaticly
 *
 * Attaching MODEL with Y.Model-instances or objects?
 * Both can be attached. Whenever widgetattribute change, the widget will be re-rendered is needed (template- or model-attribute). This also
 * counts for attached objects. However, changes inside an object itself (updated property-value) cannot be caught by the widget, so you need
 * to call syncUI() yourself after an object-change. Y.Model-instances -on the other hand- do fire a *:change-event which is caught by the widget.
 * This makes the widget re-render after a Model-instance changes some of its attributes. In fact, you can attach STRING-values as well, which will
 * lead to 'just rendering' the text without property-fields.
 *
 *
 * By default, the widget comes with its own style. You can disable this by setting the attribute 'styled' to false.
 *
 * @module gallery-itsaviewmodel
 * @extends View
 * @class ITSAViewModel
 * @constructor
 * @since 0.3
 *
 * <i>Copyright (c) 2013 Marco Asbreuk - http://itsasbreuk.nl</i>
 * YUI BSD License - http://developer.yahoo.com/yui/license.html
 *
*/

var ITSAViewModel,
    Lang = Y.Lang,
    YArray = Y.Array,
    YIntl = Y.Intl,
    IMAGE_BUTTON_TEMPLATE = '<i class="itsaicon-form-{type}"></i>',
    YTemplateMicro = Y.Template.Micro,
    GALLERY = 'gallery-',
    ITSAVIEWMODEL = 'itsaviewmodel',
    BUTTON = 'button',
    MODEL = 'model',
    SAVE_FIRSTCAP = 'Save',
    SUBMIT_FIRSTCAP = 'Submit',
    LOAD_FIRSTCAP = 'Load',
    DESTROY_FIRSTCAP = 'Destroy',
    RESET_FIRSTCAP = 'Reset',
    PROMISE = 'Promise',
    DESTROYED = 'destroyed',
    DEF_FN = '_defFn_',
    BOOLEAN = 'boolean',
    STRING = 'string',
    FUNCTION = 'function',
    EDITABLE = 'editable',
    CONTAINER = 'container',
    // hidden prototype property for internal use:
    VALID_BUTTON_TYPES = {
        destroy: true,
        remove: true,
        reset: true,
        save: true,
        submit: true,
        load: true
    },

    /**
      * Fired when view's model is destroyed.
      * No defaultFunction, so listen to the 'on' and 'after' event are the same.
      *
      * @event modeldestroy
      * @param e {EventFacade} Event Facade including:
      * @param e.target {Y.ITSAFormModel} The ITSAFormModel-instance
      * @param e.model {Y.Model} modelinstance bound to the view
      * @param e.modelEventFacade {EventFacade} eventfacade that was passed through by the model that activated this event
      *
    **/
    DESTROY = 'destroy',

    /**
      * Fired when view's model is removed, that is destroyed and removed thfought the synclayer.
      * No defaultFunction, so listen to the 'on' and 'after' event are the same.
      *
      * @event modelremove
      * @param e {EventFacade} Event Facade including:
      * @param e.target {Y.ITSAFormModel} The ITSAFormModel-instance
      * @param e.model {Y.Model} modelinstance bound to the view
      * @param e.modelEventFacade {EventFacade} eventfacade that was passed through by the model that activated this event
      *
    **/
    REMOVE = 'remove',

    /**
      * Fired when view's model is loaded.
      * No defaultFunction, so listen to the 'on' and 'after' event are the same.
      *
      * @event modelload
      * @param e {EventFacade} Event Facade including:
      * @param e.target {Y.ITSAFormModel} The ITSAFormModel-instance
      * @param e.model {Y.Model} modelinstance bound to the view
      * @param e.modelEventFacade {EventFacade} eventfacade that was passed through by the model that activated this event
      *
    **/
    LOAD = 'load',

    /**
      * Fired when view's model is reset.
      * No defaultFunction, so listen to the 'on' and 'after' event are the same.
      *
      * @event modelreset
      * @param e {EventFacade} Event Facade including:
      * @param e.target {Y.ITSAFormModel} The ITSAFormModel-instance
      * @param e.model {Y.Model} modelinstance bound to the view
      * @param e.modelEventFacade {EventFacade} eventfacade that was passed through by the model that activated this event
      *
    **/
    RESET = 'reset',

    /**
      * Fired when view's model is saved.
      * No defaultFunction, so listen to the 'on' and 'after' event are the same.
      *
      * @event modelsave
      * @param e {EventFacade} Event Facade including:
      * @param e.target {Y.ITSAFormModel} The ITSAFormModel-instance
      * @param e.model {Y.Model} modelinstance bound to the view
      * @param e.modelEventFacade {EventFacade} eventfacade that was passed through by the model that activated this event
      *
    **/
    SAVE = 'save',

    /**
      * Fired when view's model is submitted, either by clicking on a submit-button or by calling formmodel.submit();
      * No defaultFunction, so listen to the 'on' and 'after' event are the same.
      *
      * @event modelsubmit
      * @param e {EventFacade} Event Facade including:
      * @param e.target {Y.ITSAFormModel} The ITSAFormModel-instance
      * @param e.model {Y.Model} modelinstance bound to the view
      * @param e.modelEventFacade {EventFacade} eventfacade that was passed through by the model that activated this event
      *
    **/
    SUBMIT = 'submit',

    CLICK = 'click',
    ABORT = 'abort',
    CANCEL = 'cancel',
    IGNORE = 'ignore',
    NO = 'no',
    OK = 'ok',
    RETRY = 'retry',
    YES = 'yes',
    BTN = 'btn_',
    BTN_ABORT = BTN+ABORT,
    BTN_CANCEL = BTN+CANCEL,
    BTN_DESTROY = BTN+DESTROY,
    BTN_IGNORE = BTN+IGNORE,
    BTN_LOAD = BTN+LOAD,
    BTN_NO = BTN+NO,
    BTN_OK = BTN+OK,
    BTN_REMOVE = BTN+REMOVE,
    BTN_RESET = BTN+RESET,
    BTN_RETRY = BTN+RETRY,
    BTN_SAVE = BTN+SAVE,
    BTN_SUBMIT = BTN+SUBMIT,
    BTN_YES = BTN+YES,
    IMG = 'img',
    IMGBTN_ABORT = IMG+BTN_ABORT,
    IMGBTN_CANCEL = IMG+BTN_CANCEL,
    IMGBTN_DESTROY = IMG+BTN_DESTROY,
    IMGBTN_IGNORE = IMG+BTN_IGNORE,
    IMGBTN_LOAD = IMG+BTN_LOAD,
    IMGBTN_NO = IMG+BTN_NO,
    IMGBTN_OK = IMG+BTN_OK,
    IMGBTN_REMOVE = IMG+BTN_REMOVE,
    IMGBTN_RESET = IMG+BTN_RESET,
    IMGBTN_RETRY = IMG+BTN_RETRY,
    IMGBTN_SAVE = IMG+BTN_SAVE,
    IMGBTN_SUBMIT = IMG+BTN_SUBMIT,
    IMGBTN_YES = IMG+BTN_YES,
    SPIN = 'spin',
    SPINBTN_LOAD = SPIN+BTN_LOAD,
    SPINBTN_REMOVE = SPIN+BTN_REMOVE,
    SPINBTN_SAVE = SPIN+BTN_SAVE,
    SPINBTN_SUBMIT = SPIN+BTN_SUBMIT,

    /**
      * Fired when a UI-elemnt needs to ficuds to the next element (in case of editable view).
      * The defaultFunc will refocus to the next field (when the view has focus).
      * Convenience-event which takes place together with the underlying models-event.
      *
      * @event focusnext
      * @param e {EventFacade} Event Facade including:
      * @param e.target {Y.Node} The node that fired the event.
      * @param e.model {Y.Model} modelinstance bound to the view
      * @param e.modelEventFacade {EventFacade} eventfacade that was passed through by the model that activated this event
      * @since 0.1
    **/
    FOCUS_NEXT = 'focusnext',

    /**
      * Fired when validation fails.
      * Convenience-event which takes place together with the underlying models-event.
      *
      * @event validationerror
      * @param e {EventFacade} Event Facade including:
      * @param e.target {Y.ITSAFormModel} The ITSAFormModel-instance
      * @param e.nodelist {Y.NodeList} reference to the element-nodes that are validated wrongly
      * @param e.model {Y.Model} modelinstance bound to the view
      * @param e.modelEventFacade {EventFacade} eventfacade that was passed through by the model that activated this event
      * @since 0.1
    **/
    VALIDATION_ERROR = 'validationerror',

    /**
      * Fired after a UI-formelement changes its value from a userinput (not when updated internally).
      * Convenience-event which takes place together with the underlying models-event.
      *
      * @event uichanged
      * @param e {EventFacade} Event Facade including:
      * @param e.target {Y.ITSAFormModel} The ITSAFormModel-instance
      * @param e.value {Date} current value of the property
      * @param e.node {Y.Node} reference to the element-node
      * @param e.nodeid {String} id of the element-node (without '#')
      * @param e.formElement {Object} reference to the form-element
      * @param e.model {Y.Model} modelinstance bound to the view
      * @param e.modelEventFacade {EventFacade} eventfacade that was passed through by the model that activated this event
      *
    **/
    UI_CHANGED = 'uichanged',

    /**
      * Fired when a template-button {btn_button}, {imgbtn_button} or {spinbtn_button} is clicked.
      * Convenience-event which takes place together with the underlying models-event.
      *
      * @event buttonclick
      * @param e {EventFacade} Event Facade including:
      * @param e.target {Y.ITSAFormModel} The ITSAFormModel-instance
      * @param e.value {Any} Should be used to identify the button --> defined during rendering: is either config.value or labelHTML
      * @param e.buttonNode {Y.Node} reference to the buttonnode
      * @param e.formElement {Object} reference to the form-element
      * @param e.model {Y.Model} modelinstance bound to the view
      * @param e.modelEventFacade {EventFacade} eventfacade that was passed through by the model that activated this event
      *
    **/
    BUTTON_CLICK = BUTTON+CLICK,

    /**
      * Fired when a template-button {btn_destroy} or {imgbtn_destroy} is clicked.
      * Convenience-event which takes place together with the underlying models-event.
      *
      * @event destroyclick
      * @param e {EventFacade} Event Facade including:
      * @param e.target {Y.ITSAFormModel} The ITSAFormModel-instance
      * @param e.value {Any} Should be used to identify the button --> defined during rendering: is either config.value or labelHTML
      * @param e.buttonNode {Y.Node} reference to the buttonnode
      * @param e.formElement {Object} reference to the form-element
      * @param e.model {Y.Model} modelinstance bound to the view
      * @param e.modelEventFacade {EventFacade} eventfacade that was passed through by the model that activated this event
      *
    **/
    DESTROY_CLICK = DESTROY+CLICK,

    /**
      * Fired when a template-button {btn_remove}, {imgbtn_remove} or {spinbtn_remove} is clicked.
      * Convenience-event which takes place together with the underlying models-event.
      *
      * @event removeclick
      * @param e {EventFacade} Event Facade including:
      * @param e.target {Y.ITSAFormModel} The ITSAFormModel-instance
      * @param e.value {Any} Should be used to identify the button --> defined during rendering: is either config.value or labelHTML
      * @param e.buttonNode {Y.Node} reference to the buttonnode
      * @param e.formElement {Object} reference to the form-element
      * @param e.model {Y.Model} modelinstance bound to the view
      * @param e.modelEventFacade {EventFacade} eventfacade that was passed through by the model that activated this event
      *
    **/
    REMOVE_CLICK = REMOVE+CLICK,

    /**
      * Fired when a template-button {btn_load}, {imgbtn_load} or {spinbtn_load} is clicked.
      * Convenience-event which takes place together with the underlying models-event.
      *
      * @event loadclick
      * @param e {EventFacade} Event Facade including:
      * @param e.target {Y.ITSAFormModel} The ITSAFormModel-instance
      * @param e.value {Any} Buttonvalue: could be used to identify the button --> defined during rendering by config.value
      * @param e.buttonNode {Y.Node} reference to the buttonnode
      * @param e.formElement {Object} reference to the form-element
      * @param e.model {Y.Model} modelinstance bound to the view
      * @param e.modelEventFacade {EventFacade} eventfacade that was passed through by the model that activated this event
      *
    **/
    LOAD_CLICK = LOAD+CLICK,

    /**
      * Fired when a template-button {btn_submit}, {imgbtn_submit} or {spinbtn_submit} is clicked.
      * Convenience-event which takes place together with the underlying models-event.
      *
      * @event submitclick
      * @param e {EventFacade} Event Facade including:
      * @param e.target {Y.ITSAFormModel} The ITSAFormModel-instance
      * @param e.value {Any} Buttonvalue: could be used to identify the button --> defined during rendering by config.value
      * @param e.buttonNode {Y.Node} reference to the buttonnode
      * @param e.formElement {Object} reference to the form-element
      * @param e.model {Y.Model} modelinstance bound to the view
      * @param e.modelEventFacade {EventFacade} eventfacade that was passed through by the model that activated this event
      *
    **/
    SUBMIT_CLICK = SUBMIT+CLICK,

    /**
      * Fired when a template-button {btn_reset} or {imgbtn_reset} is clicked.
      * Convenience-event which takes place together with the underlying models-event.
      *
      * @event resetclick
      * @param e {EventFacade} Event Facade including:
      * @param e.target {Y.ITSAFormModel} The ITSAFormModel-instance
      * @param e.value {Any} Buttonvalue: could be used to identify the button --> defined during rendering by config.value
      * @param e.buttonNode {Y.Node} reference to the buttonnode
      * @param e.formElement {Object} reference to the form-element
      * @param e.model {Y.Model} modelinstance bound to the view
      * @param e.modelEventFacade {EventFacade} eventfacade that was passed through by the model that activated this event
      *
    **/
    RESET_CLICK = RESET+CLICK,

    /**
      * Fired when a template-button {btn_save}, {imgbtn_save} or {spinbtn_save} is clicked.
      * Convenience-event which takes place together with the underlying models-event.
      *
      * @event saveclick
      * @param e {EventFacade} Event Facade including:
      * @param e.target {Y.ITSAFormModel} The ITSAFormModel-instance
      * @param e.value {Any} Buttonvalue: could be used to identify the button --> defined during rendering by config.value
      * @param e.buttonNode {Y.Node} reference to the buttonnode
      * @param e.formElement {Object} reference to the form-element
      * @param e.model {Y.Model} modelinstance bound to the view
      * @param e.modelEventFacade {EventFacade} eventfacade that was passed through by the model that activated this event
      *
    **/
    SAVE_CLICK = SAVE+CLICK;


//===============================================================================================
//
// First: extend Y.Node with the method cleanup()
//
//===============================================================================================

function ITSANodeCleanup() {}

Y.mix(ITSANodeCleanup.prototype, {

    //
    // Destroys all widgets inside the node by calling widget.destroy(true);
    //
    // @method cleanup
    // @param destroyAllNodes {Boolean} If true, all nodes contained within the Widget are removed and destroyed.
    //                        Defaults to false due to potentially high run-time cost.
    // @since 0.3
    //
    //
    cleanupWidgets: function(destroyAllNodes) {
        var node = this,
            YWidget = Y.Widget;

        Y.log('cleanup', 'info', 'Itsa-NodeCleanup');
        if (YWidget) {
            node.all('.yui3-widget').each(
                function(widgetNode) {
                    if (node.one('#'+widgetNode.get('id'))) {
                        var widgetInstance = YWidget.getByNode(widgetNode);
                        if (widgetInstance) {
                            widgetInstance.destroy(destroyAllNodes);
                        }
                    }
                }
            );
        }
    },

    //
    // Cleansup the node by calling node.empty(), as well as destroying all widgets that lie
    // within the node by calling widget.destroy(true);
    //
    // @method cleanup
    // @since 0.3
    //
    //
    cleanup: function() {
        var node = this;

        Y.log('cleanup', 'info', 'Itsa-NodeCleanup');
        node.cleanupWidgets(true);
        node.empty();
    }

}, true);

Y.Node.ITSANodeCleanup = ITSANodeCleanup;

Y.Base.mix(Y.Node, [ITSANodeCleanup]);

//===============================================================================================
//
// Next we create the widget
//
//===============================================================================================

ITSAViewModel = Y.ITSAViewModel = Y.Base.create(ITSAVIEWMODEL, Y.View, [], {},
    {
        ATTRS : {
            /**
             * Makes the View to render the editable-version of the Model. Only when the Model has <b>Y.Plugin.ITSAEditModel</b> plugged in.
             *
             * @attribute editable
             * @type {Boolean}
             * @default false
             * @since 0.3
             */
            editable: {
                value: false,
                validator: function(v){
                    return (typeof v === BOOLEAN);
                },
                getter: function(v) {
                    var model = this.get(MODEL);
                    return (v && model && model.toJSONUI);
                }
            },

            /**
             * The Y.Model that will be rendered in the view. May also be an Object, which is handy in case the source is an
             * item of a Y.LazyModelList. If you pass a String-value, then the text is rendered as it is, assuming no model-instance.
             *
             * @attribute model
             * @type {Y.Model|Object|String}
             * @default {}
             * @since 0.3
             */
            model: {
                value: {},
                validator: function(v){ return ((v===null) || Lang.isObject(v) || (typeof v === STRING) ||
                                                (v.get && (typeof v.get === FUNCTION) && v.get('clientId'))); },
                setter: '_setModel'
            },

            /**
             * Template to render the Model. The attribute MUST be a template that can be processed by either <i>Y.Lang.sub or Y.Template.Micro</i>,
             * where Y.Lang.sub is more lightweight.
             *
             * <b>Example with Y.Lang.sub:</b> '{slices} slice(s) of {type} pie remaining. <button class="eat">Eat a Slice!</button>'
             * <b>Example with Y.Template.Micro:</b>
             * '<%= data.slices %> slice(s) of <%= data.type %> pie remaining <button class="eat">Eat a Slice!</button>'
             * <b>Example 2 with Y.Template.Micro:</b>
             * '<%= data.slices %> slice(s) of <%= data.type %> pie remaining<% if (data.slices>0) {%> <button class="eat">Eat a Slice!</button><% } %>'
             *
             * <u>If you set this attribute after the view is rendered, the view will be re-rendered.</u>
             *
             * @attribute template
             * @type {String}
             * @default null
             * @since 0.3
             */
            template: {
                value: null,
                validator: function(v) {
                    return (typeof v === STRING);
                },
                getter: function(v) {
                    var instance = this;
                    // Because _textTemplate might exists in case of clear text instead of a model, we need to return the right template.
                    return instance._textTemplate || v || instance._intl.undefined_template;
                }
            }

        }
    }
);

/**
 * @method initializer
 * @protected
*/
ITSAViewModel.prototype.initializer = function() {
    var instance = this,
        model = instance.get(MODEL);

    Y.log('initializer', 'info', 'ITSA-ViewModel');

    /**
     * PreventDefault function of destroyclick-event.
     * Will pass the 'preventDefault'-method through to the underlying model
     *
     * @method _defPrevFn_destroyclick
     * @private
     * @protected
    */

    /**
     * PreventDefault function of removeclick-event.
     * Will pass the 'preventDefault'-method through to the underlying model
     *
     * @method _defPrevFn_removeclick
     * @private
     * @protected
    */

    /**
     * PreventDefault function of resetclick-event.
     * Will pass the 'preventDefault'-method through to the underlying model
     *
     * @method _defPrevFn_resetclick
     * @private
     * @protected
    */

    /**
     * PreventDefault function of saveclick-event.
     * Will pass the 'preventDefault'-method through to the underlying model
     *
     * @method _defPrevFn_saveclick
     * @private
     * @protected
    */

    /**
     * PreventDefault function of submitclick-event.
     * Will pass the 'preventDefault'-method through to the underlying model
     *
     * @method _defPrevFn_submitclick
     * @private
     * @protected
    */

    /**
     * PreventDefault function of validationerror-event.
     * Will pass the 'preventDefault'-method through to the underlying model
     *
     * @method _defPrevFn_validationerror
     * @private
     * @protected
    */

    /**
     * PreventDefault function of buttonclick-event.
     * Will pass the 'preventDefault'-method through to the underlying model
     *
     * @method _defPrevFn_buttonclick
     * @private
     * @protected
    */

    /**
     * PreventDefault function of loadclick-event.
     * Will pass the 'preventDefault'-method through to the underlying model
     *
     * @method _defPrevFn_loadclick
     * @private
     * @protected
    */

    /**
     * PreventDefault function of uichanged-event.
     * Will pass the 'preventDefault'-method through to the underlying model
     *
     * @method _defPrevFn_uichanged
     * @private
     * @protected
    */
    YArray.each(
        [DESTROY_CLICK, REMOVE_CLICK, RESET_CLICK, SAVE_CLICK, SUBMIT_CLICK, BUTTON_CLICK, LOAD_CLICK, VALIDATION_ERROR, UI_CHANGED],
        function(event) {
            instance['_defPrevFn_'+event] = function(e) {
                Y.log('preventDefaultFn of '+event, 'info', 'ITSA-ViewModel');
                e.modelEventFacade.preventDefault();
            };
            // publishing event
            instance.publish(
                event,
                {
                    preventedFn: Y.bind(instance['_defPrevFn_'+event], instance),
                    emitFacade: true
                }
            );
        }
    );

    // publishing event 'focusnext'
    instance.publish(
        FOCUS_NEXT,
        {
            defaultFn: Y.bind(instance[DEF_FN+FOCUS_NEXT], instance),
            emitFacade: true
        }
    );

    /**
     * Internal flag that tells wheter a Template.Micro is being used.
     * @property _isMicroTemplate
     * @private
     * @default null
     * @type Boolean
    */
    instance._isMicroTemplate = null;

    /**
     * Internal Function that is generated to automaticly make use of the template.
     * The function has the structure of: _modelRenderer = function(model) {return {String}};
     * @property _modelRenderer
     * @private
     * @default function(model) {return ''};
     * @type Function
    */
    instance._modelRenderer = null;

    /**
     * Internal list of all eventhandlers bound by this widget.
     * @property _eventhandlers
     * @private
     * @default []
     * @type Array
    */
    instance._eventhandlers = [];

    /**
     * Internal template to be used when MODEL is no model but just clear text.
     *
     * @property _textTemplate
     * @private
     * @default null
     * @type String
    */
    instance._textTemplate = null;

    instance._setTemplateRenderer(instance.get(EDITABLE));
/*jshint expr:true */
    model && model.addTarget && model.addTarget(instance);
/*jshint expr:false */

    /**
     * Internal objects with internationalized buttonlabels
     *
     * @property _intl
     * @private
     * @type Object
    */
    instance._intl = YIntl.get(GALLERY+ITSAVIEWMODEL);

    /**
     * Internal hash with custom buttnlabels
     *
     * @property _customBtnLabels
     * @private
     * @default {}
     * @type Object
    */
    instance._customBtnLabels = {};
    instance._createButtons();
};

/**
 * Use toJSON() instead
 *
 * @method getModelToJSON
 * @deprecated
 * @param {Y.Model|Object} model
 * @return {Object} Object or model.toJSON()
 * @since 0.1
 *
*/

/**
 * Removes custom buttonlabels defined with setButtonLabel().
 *
 * @method removeButtonLabel
 * @param buttonType {String} the buttontype which text should be replaced, either: 'cancel', 'abort', 'retry', 'ok', 'ignore', 'yes', 'no', 'destroy', 'remove', 'reset', 'save', 'load' or 'submit'
 * @since 0.3
 *
*/
ITSAViewModel.prototype.removeButtonLabel = function(buttonType) {
    delete this._customBtnLabels[buttonType];
};

/**
 * Method that is responsible for rendering the Model into the view.
 *
 * @method render
 * @param [clear] {Boolean} whether to clear the view = making it empty without the template.
 * normally you don't want this: leaving empty means the Model is drawn.
 * @private
 * @chainable
 * @since 0.3
 *
*/
ITSAViewModel.prototype.render = function (clear) {
    var instance = this,
        container = instance.get(CONTAINER),
        itsatabkeymanager = container.itsatabkeymanager,
        model = instance.get(MODEL),
        editMode = instance.get(EDITABLE),
        itsaDateTimePicker = Y.Global.ItsaDateTimePicker,
        html = (clear || !model) ? '' : instance._modelRenderer(model);

    Y.log('render', 'info', 'ITSA-ViewModel');
    // Render this view's HTML into the container element.
    // Because Y.Node.setHTML DOES NOT destroy its nodes (!) but only remove(), we destroy them ourselves first
    if (editMode || instance._isMicroTemplate) {
        if (editMode) {
            instance._initialEditAttrs = model.getAttrs();
        }
        container.cleanupWidgets(true);
    }
    // Append the container element to the DOM if it's not on the page already.
    if (!instance._rendered) {
/*jshint expr:true */
        container.inDoc() || Y.one('body').append(container);
        container.addClass(ITSAVIEWMODEL);
/*jshint expr:false */
        instance._bindUI();
    }
    instance._rendered = true;
    container.setHTML(html);
    // If Y.Plugin.ITSATabKeyManager is plugged in, then refocus to the first item
    if (editMode) {
        Y.use(GALLERY+'itsatabkeymanager', function() {
            if (itsatabkeymanager) {
                itsatabkeymanager.refresh(container);
            }
            else {
                container.plug(Y.Plugin.ITSATabKeyManager);
                itsatabkeymanager = container.itsatabkeymanager;
            }
            if (instance.get('focused')) {
                itsatabkeymanager.focusInitialItem();
            }
        });
    }
    if (itsaDateTimePicker && itsaDateTimePicker.panel.get('visible')) {
        itsaDateTimePicker.hide(true);
    }
    /**
    * Fired when the view is rendered
    *
    * @event viewrendered
    * @param e {EventFacade} Event Facade including:
    * @param e.target {Y.ITSAViewModel} This instance.
    * @since 0.3
    */
    instance.fire('viewrendered', {target: instance});
    return instance;
};

/**
 * Creates a custom label for the buttons that are referenced by one of the folowing buttonTypes:
 * <ul>
 *   <li>btn_abort</li>
 *   <li>btn_cancel</li>
 *   <li>btn_destroy</li>
 *   <li>btn_ignore</li>
 *   <li>btn_load</li>
 *   <li>btn_no</li>
 *   <li>btn_ok</li>
 *   <li>btn_remove</li>
 *   <li>btn_reset</li>
 *   <li>btn_retry</li>
 *   <li>btn_save</li>
 *   <li>btn_submit</li>
 *   <li>btn_yes</li>
 *   <li>imgbtn_abort</li>
 *   <li>imgbtn_cancel</li>
 *   <li>imgbtn_destroy</li>
 *   <li>imgbtn_ignore</li>
 *   <li>imgbtn_load</li>
 *   <li>imgbtn_no</li>
 *   <li>imgbtn_ok</li>
 *   <li>imgbtn_remove</li>
 *   <li>imgbtn_reset</li>
 *   <li>imgbtn_retry</li>
 *   <li>imgbtn_save</li>
 *   <li>imgbtn_submit</li>
 *   <li>imgbtn_yes</li>
 *   <li>spinbtn_load</li>
 *   <li>spinbtn_remove</li>
 *   <li>spinbtn_save</li>
 *   <li>spinbtn_submit</li>
 *   <li>spinbtn_yes</li>
 * </ul>
 * 'labelHTML' may consist <u>{label}</u> which will be replaced by the default internationalized labelHTML. This way you can create imagebuttons that still hold the default label.
 * <b>Note</b> The default buttonLabels are internationalized, this feature will be lost when using this method (unless you use <u>{label}</u> in the new labelHTML).
 *
 * @method setButtonLabel
 * @param buttonType {String} the buttontype which text should be replaced, either: 'cancel', 'abort', 'retry', 'ok', 'ignore', 'yes', 'no', 'destroy', 'remove', 'reset', 'save', 'load' or 'submit'
 * @param labelHTML {String} new button-label
 * @since 0.3
 *
*/
ITSAViewModel.prototype.setButtonLabel = function(buttonType, labelHTML) {
    var instance = this;
/*jshint expr:true */
    VALID_BUTTON_TYPES[buttonType] && (typeof labelHTML === STRING) && (labelHTML.length>0) && (instance._customBtnLabel[buttonType]=labelHTML);
/*jshint expr:false */
};

/**
  * Returns the view's model-attributes by calling its model.toJSON(). If model is an object
  * then the object will return as it is.
  * @method toJSON
  * @return {Object} Copy of this model's attributes.
 **/
ITSAViewModel.prototype.toJSON = function() {
    var model = this.get(MODEL);

    Y.log('toJSON', 'info', 'ITSA-ViewModel');
    return (model instanceof Y.Model) ? model.toJSON() : model;
};

/**
 * Cleans up bindings
 * @method destructor
 * @protected
*/
ITSAViewModel.prototype.destructor = function() {
    var instance = this,
        model = instance.get(MODEL),
        container = instance.get(CONTAINER);

    Y.log('destructor', 'info', 'ITSA-ViewModel');
/*jshint expr:true */
    model && model.removeTarget && model.removeTarget(instance);
/*jshint expr:false */
    instance._clearEventhandlers();
/*jshint expr:true */
    container.hasPlugin('itsatabkeymanager') && container.unplug('itsatabkeymanager');
/*jshint expr:false */
};

//===============================================================================================
// private methods
//===============================================================================================

/**
 * Sets up DOM and CustomEvent listeners for the view.
 *
 * @method _bindUI
 * @private
 * @protected
 */
ITSAViewModel.prototype._bindUI = function() {
    var instance = this,
        container = instance.get(CONTAINER),
        eventhandlers = instance._eventhandlers;

    Y.log('bindUI', 'info', 'ITSA-ViewModel');
    eventhandlers.push(
        instance.after(
            'modelChange',
            function(e) {
                var prevVal = e.prevVal,
                    newVal = e.newVal,
                    prevFormModel = prevVal && prevVal.toJSONUI,
                    newFormModel = newVal && newVal.toJSONUI;
                if (prevVal) {
/*jshint expr:true */
                    prevVal.removeTarget && prevVal.removeTarget(instance);
                }
                newVal && newVal.addTarget && newVal.addTarget(instance);
                (prevFormModel !== newFormModel) && instance._setTemplateRenderer(instance.get('template'), newFormModel && instance.get(EDITABLE));
/*jshint expr:false */
                instance.render();
            }
        )
    );
    eventhandlers.push(
        instance.after(
            'templateChange',
            function() {
                instance._setTemplateRenderer(instance.get(EDITABLE));
                instance.render();
            }
        )
    );
    eventhandlers.push(
        instance.after(
            '*:resetclick',
            function() {
                var itsatabkeymanager = container.itsatabkeymanager;
                if (instance._isMicroTemplate) {
                    // need to re-render because the code might have made items visible/invisible based on their value
                    instance.render();
                }
                if (itsatabkeymanager) {
                    itsatabkeymanager.focusInitialItem();
                }
            }
        )
    );
    eventhandlers.push(
        instance.after(
            'editableChange',
            function(e) {
                var newEditable = e.newVal,
                    model = instance.get(MODEL);
                // if model.toJSONUI exists, then we need to rerender
                if (model && model.toJSONUI) {
                    instance._setTemplateRenderer(newEditable);
                    instance.render();
                }
            }
        )
    );
    eventhandlers.push(
        instance.after(
            '*:change',
            function(e) {
                if ((e.target instanceof Y.Model) && !instance.get(EDITABLE)) {
                    instance.render();
                }
            }
        )
    );
    eventhandlers.push(
        instance.after(
            '*:destroy',
            function(e) {
                if (e.target!==instance) {
                    instance.render(true);
                }
            }
        )
    );
    eventhandlers.push(
        Y.Intl.after(
            'intl:langChange',
            function() {
                instance._intl = Y.Intl.get(GALLERY+ITSAVIEWMODEL);
            }
        )
    );
    YArray.each(
        [DESTROY, REMOVE, RESET, SAVE, SUBMIT, LOAD,
         DESTROY_CLICK, REMOVE_CLICK, RESET_CLICK, SAVE_CLICK, SUBMIT_CLICK, BUTTON_CLICK, LOAD_CLICK,
         VALIDATION_ERROR, UI_CHANGED, FOCUS_NEXT],
        function(event) {
            eventhandlers.push(
                instance.on(
                    '*:'+event,
                    function(e) {
                        var payload;
                        // check if e.target===instance, because it checks by *: and will recurse
                        if (e.target!==instance) {
                            if (VALID_BUTTON_TYPES[event]) {
                                event = MODEL+event;
                            }
                            payload = {
                                type: event,
                                model: instance.get(MODEL),
                                modelEventFacade: e,
                                target: instance,
                                value: e.value,
                                node: e.node,
                                nodeid: e.nodeid,
                                formElement: e.formElement
                            };
                            Y.log('refiring model-event '+event+' by itsaviewmodel', 'info', 'ITSA-ViewModel');
                            instance.fire(event, payload);
                        }
                    }
                )
            );
        }
    );
};

/**
 * Saves the view's model-instance.
 *
 * @method modelSave
 * @since 0.3
 *
*/

/**
 * Destroys the view's model-instance.
 *
 * @method modelDestroy
 * @since 0.3
 *
*/

/**
 * Loads the view's model-instance.
 *
 * @method modelLoad
 * @since 0.3
 *
*/

/**
 * Resets the view's model-instance: which causes UI-elements to reset (in case of a editable form)
 *
 * @method modelReset
 * @since 0.3
 *
*/

/**
 * Submits the view's model-instance.
 *
 * @method modelSubmit
 * @since 0.3
 *
*/

/**
 * Destroys the view's model-instance.
 *
 * @method modelDestroy
 * @since 0.3
 *
*/
YArray.each(
    [SAVE_FIRSTCAP, SUBMIT_FIRSTCAP, LOAD_FIRSTCAP, DESTROY_FIRSTCAP, RESET_FIRSTCAP],
    function(fn) {
        ITSAViewModel.prototype[MODEL+fn] = function() {
            var instance = this,
                model = instance.get(MODEL);

            Y.log(MODEL+fn, 'info', 'ITSA-ViewModel');
/*jshint expr:true */
            (model instanceof Y.Model) && !model.get(DESTROYED) && model[DEF_FN+fn] && model[DEF_FN+fn]();
/*jshint expr:false */
        };
    }
);

/**
 * Saves the view's model-instance using model.savePromise().
 *
 * @method modelSavePromise
 * @param {Object} [options] Options to be passed to `sync()`. It's up to the custom sync
 *                 implementation to determine what options it supports or requires, if any.
 * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).
 * @since 0.3
 *
*/

/**
 * Destroys the view's model-instance using model.destroyPromise().
 *
 * @method modelDestroyPromise
 * @param {Object} [options] Options to be passed to `sync()`. It's up to the custom sync
 *                 implementation to determine what options it supports or requires, if any.
 * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).
 * @since 0.3
 *
*/

/**
 * Loads the view's model-instance using model.loadPromise().
 *
 * @method modelLoadPromise
 * @param {Object} [options] Options to be passed to `sync()`. It's up to the custom sync
 *                 implementation to determine what options it supports or requires, if any.
 * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).
 * @since 0.3
 *
*/

/**
 * Submits the view's model-instance using model.submitPromise().
 *
 * @method modelSubmitPromise
 * @param {Object} [options] Options to be passed to `sync()`. It's up to the custom sync
 *                 implementation to determine what options it supports or requires, if any.
 * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).
 * @since 0.3
 *
*/

/**
 * Destroys the view's model-instance. using model.destroyPromise().
 *
 * @method modelDestroyPromise
 * @since 0.3
 * @param {Object} [options] Options to be passed to `sync()`. It's up to the custom sync
 *                 implementation to determine what options it supports or requires, if any.
 * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).
 * @return
 *
*/
YArray.each(
    [SAVE_FIRSTCAP, SUBMIT_FIRSTCAP, LOAD_FIRSTCAP, DESTROY_FIRSTCAP],
    function(fn) {
        ITSAViewModel.prototype[MODEL+fn+PROMISE] = function() {
            var instance = this,
                model = instance.get(MODEL),
                fnLower = fn.toLowerCase();

            Y.log(MODEL+fn+PROMISE, 'info', 'ITSA-ViewModel');
/*jshint expr:true */
            return ((model instanceof Y.Model) && !model.get(DESTROYED) && model[fnLower+PROMISE]) || null;
        };
/*jshint expr:false */
    }
);

/**
 * Cleaning up all eventlisteners
 *
 * @method _clearEventhandlers
 * @private
 * @since 0.3
 *
*/
ITSAViewModel.prototype._clearEventhandlers = function() {
    Y.log('_clearEventhandlers', 'info', 'ITSA-ViewModel');
    YArray.each(
        this._eventhandlers,
        function(item){
            item.detach();
        }
    );
};

/**
 * Creates button-properties so that the templates can refer them. The next button-properties are defined:
 * <ul>
 *   <li>btn_abort</li>
 *   <li>btn_cancel</li>
 *   <li>btn_destroy</li>
 *   <li>btn_ignore</li>
 *   <li>btn_load</li>
 *   <li>btn_no</li>
 *   <li>btn_ok</li>
 *   <li>btn_remove</li>
 *   <li>btn_reset</li>
 *   <li>btn_retry</li>
 *   <li>btn_save</li>
 *   <li>btn_submit</li>
 *   <li>btn_yes</li>
 *   <li>imgbtn_abort</li>
 *   <li>imgbtn_cancel</li>
 *   <li>imgbtn_destroy</li>
 *   <li>imgbtn_ignore</li>
 *   <li>imgbtn_load</li>
 *   <li>imgbtn_no</li>
 *   <li>imgbtn_ok</li>
 *   <li>imgbtn_remove</li>
 *   <li>imgbtn_reset</li>
 *   <li>imgbtn_retry</li>
 *   <li>imgbtn_save</li>
 *   <li>imgbtn_submit</li>
 *   <li>imgbtn_yes</li>
 *   <li>spinbtn_load</li>
 *   <li>spinbtn_remove</li>
 *   <li>spinbtn_save</li>
 *   <li>spinbtn_submit</li>
 *   <li>spinbtn_yes</li>
 * </ul>
 *
 * @method _createButtons
 * @private
 * @protected
 * @since 0.3
 *
*/
ITSAViewModel.prototype._createButtons = function() {
    var instance = this,
        customBtnLabels = instance._customBtnLabels;

    Y.log('_createButtons', 'info', 'ITSA-ViewModel');
    instance._buttons = [
        {
            propertykey: BTN_ABORT,
            type: BUTTON,
            value: ABORT,
            labelHTML: customBtnLabels[ABORT] ? Lang.sub(customBtnLabels[ABORT], {label: instance._intl[ABORT]}) : instance._intl[ABORT]
        },
        {
            propertykey: BTN_CANCEL,
            type: BUTTON,
            value: CANCEL,
            labelHTML: customBtnLabels[CANCEL] ? Lang.sub(customBtnLabels[CANCEL], {label: instance._intl[CANCEL]}) : instance._intl[CANCEL]
        },
        {
            propertykey: BTN_DESTROY,
            type: DESTROY,
            value: DESTROY,
            labelHTML: customBtnLabels[DESTROY] ? Lang.sub(customBtnLabels[DESTROY], {label: instance._intl[DESTROY]}) : instance._intl[DESTROY]
        },
        {
            propertykey: BTN_IGNORE,
            type: BUTTON,
            value: IGNORE,
            labelHTML: customBtnLabels[IGNORE] ? Lang.sub(customBtnLabels[IGNORE], {label: instance._intl[IGNORE]}) : instance._intl[IGNORE]
        },
        {
            propertykey: BTN_LOAD,
            type: LOAD,
            value: LOAD,
            labelHTML: customBtnLabels[LOAD] ? Lang.sub(customBtnLabels[LOAD], {label: instance._intl[LOAD]}) : instance._intl[LOAD]
        },
        {
            propertykey: BTN_NO,
            type: BUTTON,
            value: NO,
            labelHTML: customBtnLabels[NO] ? Lang.sub(customBtnLabels[NO], {label: instance._intl[NO]}) : instance._intl[NO]
        },
        {
            propertykey: BTN_OK,
            type: BUTTON,
            value: OK,
            labelHTML: customBtnLabels[OK] ? Lang.sub(customBtnLabels[OK], {label: instance._intl[OK]}) : instance._intl[OK]
        },
        {
            propertykey: BTN_REMOVE,
            type: REMOVE,
            value: REMOVE,
            labelHTML: customBtnLabels[REMOVE] ? Lang.sub(customBtnLabels[REMOVE], {label: instance._intl[REMOVE]}) : instance._intl[REMOVE]
        },
        {
            propertykey: BTN_RESET,
            type: RESET,
            value: RESET,
            labelHTML: customBtnLabels[RESET] ? Lang.sub(customBtnLabels[RESET], {label: instance._intl[RESET]}) : instance._intl[RESET]
        },
        {
            propertykey: BTN_RETRY,
            type: BUTTON,
            value: RETRY,
            labelHTML: customBtnLabels[RETRY] ? Lang.sub(customBtnLabels[RETRY], {label: instance._intl[RETRY]}) : instance._intl[RETRY]
        },
        {
            propertykey: BTN_SAVE,
            type: SAVE,
            value: SAVE,
            labelHTML: customBtnLabels[SAVE] ? Lang.sub(customBtnLabels[SAVE], {label: instance._intl[SAVE]}) : instance._intl[SAVE]
        },
        {
            propertykey: BTN_SUBMIT,
            type: SUBMIT,
            value: SUBMIT,
            labelHTML: customBtnLabels[SUBMIT] ? Lang.sub(customBtnLabels[SUBMIT], {label: instance._intl[SUBMIT]}) : instance._intl[SUBMIT]
        },
        {
            propertykey: BTN_YES,
            type: BUTTON,
            value: YES,
            labelHTML: customBtnLabels[YES] ? Lang.sub(customBtnLabels[YES], {label: instance._intl[YES]}) : instance._intl[YES]
        },
        {
            propertykey: IMGBTN_ABORT,
            type: BUTTON,
            value: ABORT,
            labelHTML: customBtnLabels[ABORT] ? Lang.sub(customBtnLabels[ABORT], {label: instance._intl[ABORT]}) : (Lang.sub(IMAGE_BUTTON_TEMPLATE, {type: ABORT})+instance._intl[ABORT])
        },
        {
            propertykey: IMGBTN_CANCEL,
            type: BUTTON,
            value: CANCEL,
            labelHTML: customBtnLabels[CANCEL] ? Lang.sub(customBtnLabels[CANCEL], {label: instance._intl[CANCEL]}) : (Lang.sub(IMAGE_BUTTON_TEMPLATE, {type: CANCEL})+instance._intl[CANCEL])
        },
        {
            propertykey: IMGBTN_DESTROY,
            type: DESTROY,
            value: DESTROY,
            labelHTML: customBtnLabels[DESTROY] ? Lang.sub(customBtnLabels[DESTROY], {label: instance._intl[DESTROY]}) : (Lang.sub(IMAGE_BUTTON_TEMPLATE, {type: DESTROY})+instance._intl[DESTROY])
        },
        {
            propertykey: IMGBTN_IGNORE,
            type: BUTTON,
            value: IGNORE,
            labelHTML: customBtnLabels[IGNORE] ? Lang.sub(customBtnLabels[IGNORE], {label: instance._intl[IGNORE]}) : (Lang.sub(IMAGE_BUTTON_TEMPLATE, {type: IGNORE})+instance._intl[IGNORE])
        },
        {
            propertykey: IMGBTN_LOAD,
            type: LOAD,
            value: LOAD,
            labelHTML: customBtnLabels[LOAD] ? Lang.sub(customBtnLabels[LOAD], {label: instance._intl[LOAD]}) : (Lang.sub(IMAGE_BUTTON_TEMPLATE, {type: LOAD})+instance._intl[LOAD])
        },
        {
            propertykey: IMGBTN_NO,
            type: BUTTON,
            value: NO,
            labelHTML: customBtnLabels[NO] ? Lang.sub(customBtnLabels[NO], {label: instance._intl[NO]}) : (Lang.sub(IMAGE_BUTTON_TEMPLATE, {type: NO})+instance._intl[NO])
        },
        {
            propertykey: IMGBTN_OK,
            type: BUTTON,
            value: OK,
            labelHTML: customBtnLabels[OK] ? Lang.sub(customBtnLabels[OK], {label: instance._intl[OK]}) : (Lang.sub(IMAGE_BUTTON_TEMPLATE, {type: OK})+instance._intl[OK])
        },
        {
            propertykey: IMGBTN_REMOVE,
            type: REMOVE,
            value: REMOVE,
            labelHTML: customBtnLabels[REMOVE] ? Lang.sub(customBtnLabels[REMOVE], {label: instance._intl[REMOVE]}) : (Lang.sub(IMAGE_BUTTON_TEMPLATE, {type: REMOVE})+instance._intl[REMOVE])
        },
        {
            propertykey: IMGBTN_RESET,
            type: RESET,
            value: RESET,
            labelHTML: customBtnLabels[RESET] ? Lang.sub(customBtnLabels[RESET], {label: instance._intl[RESET]}) : (Lang.sub(IMAGE_BUTTON_TEMPLATE, {type: RESET})+instance._intl[RESET])
        },
        {
            propertykey: IMGBTN_RETRY,
            type: BUTTON,
            value: RETRY,
            labelHTML: customBtnLabels[RETRY] ? Lang.sub(customBtnLabels[RETRY], {label: instance._intl[RETRY]}) : (Lang.sub(IMAGE_BUTTON_TEMPLATE, {type: RETRY})+instance._intl[RETRY])
        },
        {
            propertykey: IMGBTN_SAVE,
            type: SAVE,
            value: SAVE,
            labelHTML: customBtnLabels[SAVE] ? Lang.sub(customBtnLabels[SAVE], {label: instance._intl[SAVE]}) : (Lang.sub(IMAGE_BUTTON_TEMPLATE, {type: SAVE})+instance._intl[SAVE])
        },
        {
            propertykey: IMGBTN_SUBMIT,
            type: SUBMIT,
            value: SUBMIT,
            labelHTML: customBtnLabels[SUBMIT] ? Lang.sub(customBtnLabels[SUBMIT], {label: instance._intl[SUBMIT]}) : (Lang.sub(IMAGE_BUTTON_TEMPLATE, {type: SUBMIT})+instance._intl[SUBMIT])
        },
        {
            propertykey: IMGBTN_YES,
            type: BUTTON,
            value: YES,
            labelHTML: customBtnLabels[YES] ? Lang.sub(customBtnLabels[YES], {label: instance._intl[YES]}) : (Lang.sub(IMAGE_BUTTON_TEMPLATE, {type: YES})+instance._intl[YES])
        },
        {
            propertykey: SPINBTN_LOAD,
            type: LOAD,
            value: LOAD,
            config: {spinbusy: true},
            labelHTML: customBtnLabels[LOAD] ? Lang.sub(customBtnLabels[LOAD], {label: instance._intl[LOAD]}) : (Lang.sub(IMAGE_BUTTON_TEMPLATE, {type: LOAD})+instance._intl[LOAD])
        },
        {
            propertykey: SPINBTN_REMOVE,
            type: REMOVE,
            value: REMOVE,
            config: {spinbusy: true},
            labelHTML: customBtnLabels[REMOVE] ? Lang.sub(customBtnLabels[REMOVE], {label: instance._intl[REMOVE]}) : (Lang.sub(IMAGE_BUTTON_TEMPLATE, {type: REMOVE})+instance._intl[REMOVE])
        },
        {
            propertykey: SPINBTN_SAVE,
            type: SAVE,
            value: SAVE,
            config: {spinbusy: true},
            labelHTML: customBtnLabels[SAVE] ? Lang.sub(customBtnLabels[SAVE], {label: instance._intl[SAVE]}) : (Lang.sub(IMAGE_BUTTON_TEMPLATE, {type: SAVE})+instance._intl[SAVE])
        },
        {
            propertykey: SPINBTN_SUBMIT,
            type: SUBMIT,
            value: SUBMIT,
            config: {spinbusy: true},
            labelHTML: customBtnLabels[SUBMIT] ? Lang.sub(customBtnLabels[SUBMIT], {label: instance._intl[SUBMIT]}) : (Lang.sub(IMAGE_BUTTON_TEMPLATE, {type: SUBMIT})+instance._intl[SUBMIT])
        }
    ];
};

/**
 * default function of focusnext-event.
 * Will refocus to the next focusable UI-element.
 *
 * @method _defFn_focusnext
 * @private
*/
ITSAViewModel.prototype[DEF_FN+FOCUS_NEXT] = function() {
    Y.log('defaultFn of '+FOCUS_NEXT, 'info', 'ITSA-ViewModel');
    var instance = this,
        container = instance.get(CONTAINER),
        itsatabkeymanager = container && container.itsatabkeymanager;
    if (itsatabkeymanager) {
        Y.log('focus to next field', 'info', 'ITSA-ViewModel');
        itsatabkeymanager.next();
    }
    else {
        Y.log('No focus to next field: Y.Plugin.ITSATabKeyManager not plugged in', 'info', 'ITSA-ViewModel');
    }
};

/**
 * Setter for attribute MODEL
 *
 * @method _setModel
 * @private
 * @param v {String|Object|Model}
 * @since 0.3
 *
*/
ITSAViewModel.prototype._setModel = function(v) {
    var instance = this;
    // in case model is a string --> not a real model is set: we just need to render clear text.
    // to achieve this, we create a new model-object with no properties and we define this._textTemplate
    // which will be used as the template (= text without properties)
    if (typeof v === STRING) {
        instance._textTemplate = v;
        v = {};
    }
    else {
        instance._textTemplate = null;
    }
    return v;
};

/**
 * Function-factory that binds a function to the property '_modelRenderer'. '_modelRenderer' will be defined like
 * _modelRenderer = function(model) {return {String}};
 * which means: it will return a rendered String that is modified by the attribute 'template'. The rendering
 * is done either by Y.Lang.sub or by Y.Template.Micro, depending on the value of 'template'.
 *
 * @method _setTemplateRenderer
 * @param editTemplate {Boolean} whether or not the template should use UI-elements - from Y.ITSAFormElement
 * @private
 * @chainable
 * @since 0.3
 *
*/
ITSAViewModel.prototype._setTemplateRenderer = function(editTemplate) {
    var instance = this,
        template = instance.get('template'),
        isMicroTemplate, ismicrotemplate, compiledModelEngine, buttonsToJSON;

    Y.log('_clearEventhandlers', 'info', 'ITSA-ViewModel');
    isMicroTemplate = function() {
        var microTemplateRegExp = /<%(.+)%>/;
        return microTemplateRegExp.test(template);
    };
    buttonsToJSON = function(jsondata, model) {
        var propertykey, type, labelHTML, config;
        YArray.each(
            instance._buttons,
            function(buttonobject) {
                propertykey = buttonobject.propertykey;
                type = buttonobject.type;
                labelHTML = buttonobject.labelHTML;
                config = buttonobject.config;
            jsondata[propertykey] = Y.bind(model._renderBtnFns[type], model, labelHTML, config)();
            }
        );
    };
    ismicrotemplate = instance._isMicroTemplate = isMicroTemplate();
    if (ismicrotemplate) {
        compiledModelEngine = YTemplateMicro.compile(template);
        instance._modelRenderer = function(model) {
            var jsondata = editTemplate ? model.toJSONUI() : instance.toJSON();
            // if model is instance of Y.ITSAFormModel, then add the btn_buttontype-properties:
/*jshint expr:true */
            model.toJSONUI && buttonsToJSON(jsondata, model);
/*jshint expr:false */
            return compiledModelEngine(jsondata);
        };
    }
    else {
        instance._modelRenderer = function(model) {
            var jsondata = editTemplate ? model.toJSONUI() : instance.toJSON();
/*jshint expr:true */
            model.toJSONUI && buttonsToJSON(jsondata, model);
/*jshint expr:false */
            return Lang.sub(template, jsondata);
        };
    }
};