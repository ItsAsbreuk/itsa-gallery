'use strict';

/**
 *
 * Widget ITSAViewModelPanel
 *
 *
 * Has the same functionalities as ITSAViewModel, but will come inside a Panel (which floats by default).
 * Also has standard a 'close'-button. Using WidgetButtons functionalyties, more buttons can be added.
 *
 * These buttons are available by the module and will call Model's corresponding methods:
 *
 * close (visible by default)
 * add
 * destroy
 * reset
 * save
 * submit
 *
 *
 * @class ITSAViewModelPanel
 * @constructor
 * @extends ITSAPanel
 * @since 0.2
 */

var ITSAViewModelPanel,
    Lang = Y.Lang,
    CONTAINER = 'container',
    GALLERY = 'gallery-',
    VIEW = 'View',
    BODYVIEW = 'body'+VIEW,
    FOOTER = 'footer',
    FOOTERVIEW = FOOTER+VIEW,
    TEMPLATE = 'template',
    FOOTERTEMPLATE = FOOTER+'Template',
    FOCUSED_CLASS = 'itsa-focused',
    EDITABLE = 'editable',
    MODEL = 'model',
    CHANGE = 'Change',
    CLOSE = 'close',
    CLICK = 'click',
    CLOSE_CLICK = CLOSE+CLICK,
    BUTTON = 'button',
    BOOLEAN = 'boolean',
    STRING = 'string',
    FOCUSMANAGED = 'focusManaged',
    ITSATABKEYMANAGER = 'itsatabkeymanager';

ITSAViewModelPanel = Y.ITSAViewModelPanel = Y.Base.create('itsaviewmodelpanel', Y.ITSAPanel, [], null, {
    ATTRS: {
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
            getter: function() {
                this.get(MODEL).get(EDITABLE);
            }
        },
        /**
         * Determines whether tabbing through the elements is managed by gallery-itsatabkeymanager.
         *
         * @attribute focusManaged
         * @type {Boolean}
         * @default true
         * @since 0.3
         */
        focusManaged: {
            value: true,
            validator: function(v){
                return (typeof v === BOOLEAN);
            }
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
        footerTemplate: {
            value: null,
            validator: function(v) {
                return (typeof v === STRING);
            }
        },

        hideOnBtnFooter: {
            value: true,
            validator: function(v) {
                return (typeof v === BOOLEAN);
            }
        },

        hideOnBtnHeader: {
            value: false,
            validator: function(v) {
                return (typeof v === BOOLEAN);
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
            validator: function(v){ return ((v===null) || Lang.isObject(v) || (typeof v === STRING) || (v instanceof Y.Model)); }
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
            }
        }
    }
});

ITSAViewModelPanel.prototype.initializer = function() {
    var instance = this,
        model = instance.get(MODEL);

    /**
     * Internal list of all eventhandlers bound by this widget.
     * @property _eventhandlers
     * @private
     * @default []
     * @type Array
    */
    instance._eventhandlers = [];

    instance.set(BODYVIEW, new Y.ITSAViewModel({
        model: model,
        template: instance.get(TEMPLATE),
        editable: model.get(EDITABLE),
        focusManaged: false // will be done at the Panel-level
    }));
    instance.set(FOOTERVIEW, new Y.ITSAViewModel({
        model: model,
        template: instance.get(FOOTERTEMPLATE),
        editable: false,
        focusManaged: false // will be done at the Panel-level
    }));
};

ITSAViewModelPanel.prototype.bindUI = function() {
    var instance = this,
        eventhandlers = instance._eventhandlers,
        bodyView = instance.get(BODYVIEW),
        footerView = instance.get(FOOTERVIEW);

    instance._setFocusManager(instance.get(FOCUSMANAGED));

    eventhandlers.push(
        instance.after(EDITABLE+CHANGE, function(e) {
            bodyView.set(EDITABLE, e.newVal);
        })
    );

    eventhandlers.push(
        instance.after(FOOTERTEMPLATE+CHANGE, function(e) {
            footerView.set(TEMPLATE, e.newVal);
        })
    );

    eventhandlers.push(
        instance.after(MODEL+CHANGE, function(e) {
            bodyView.set(MODEL, e.newVal);
            footerView.set(MODEL, e.newVal);
        })
    );

    eventhandlers.push(
        instance.after(TEMPLATE+CHANGE, function(e) {
            bodyView.set(TEMPLATE, e.newVal);
        })
    );

    eventhandlers.push(
        instance.after(
            FOCUSMANAGED+CHANGE,
            function(e) {
                instance._setFocusManager(e.newVal);
            }
        )
    );

    eventhandlers.push(
        instance.after('*:'+CLOSE_CLICK, function() {
            instance.hide();
        })
    );

    eventhandlers.push(
        instance._footer.delegate(
            CLICK,
            function() {
/*jshint expr:true */
                instance.get('hideOnBtnFooter') && instance.hide();
/*jshint expr:false */
            },
            BUTTON
        )
    );

    eventhandlers.push(
        instance._header.delegate(
            CLICK,
            function() {
/*jshint expr:true */
                instance.get('hideOnBtnHeader') && instance.hide();
/*jshint expr:false */
            },
            BUTTON
        )
    );
};

/**
 * Cleans up bindings
 * @method destructor
 * @protected
*/
ITSAViewModelPanel.prototype.destructor = function() {
    var instance = this,
        container = instance.get(CONTAINER);

    Y.log('destructor', 'info', 'ITSA-ViewModel');
    instance._clearEventhandlers();
/*jshint expr:true */
    container.hasPlugin(ITSATABKEYMANAGER) && container.unplug(ITSATABKEYMANAGER);
/*jshint expr:false */
};

ITSAViewModelPanel.prototype._setBodyView = function() {
    // making empty --> do not redefine new views
};
/**
 * Sets or unsets the focusManager (provided by gallery-itsatabkeymanager)
 *
 * @method _setFocusManager
 * @private
 * @param activate {Boolean}
 * @since 0.3
 *
*/
ITSAViewModelPanel.prototype._setFocusManager = function(activate) {
    var instance = this,
        container = instance.get(CONTAINER),
        itsatabkeymanager = container.itsatabkeymanager;

    Y.log('_setFocusManager to '+activate, 'info', 'ITSA-ViewModel');
    if (activate) {
        // If Y.Plugin.ITSATabKeyManager is plugged in, then refocus to the first item
        Y.use(GALLERY+ITSATABKEYMANAGER, function() {
            if (itsatabkeymanager) {
                itsatabkeymanager.refresh(container);
            }
            else {
                container.plug(Y.Plugin.ITSATabKeyManager);
                itsatabkeymanager = container.itsatabkeymanager;
            }
            if (container.hasClass(FOCUSED_CLASS)) {
                itsatabkeymanager.focusInitialItem();
            }
        });
    }
    else {
/*jshint expr:true */
        itsatabkeymanager && container.unplug(ITSATABKEYMANAGER);
/*jshint expr:false */
    }
};
ITSAViewModelPanel.prototype._setFooterView = function() {
    // making empty --> do not redefine new views
};
ITSAViewModelPanel.prototype._setHeaderView = function() {
    // making empty --> do not redefine new views
};
