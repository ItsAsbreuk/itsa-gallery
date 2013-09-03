'use strict';

/*jshint maxlen:200 */

/**
 *
 * Widget ITSAViewModel
 *
 *
 * This widget renderes Y.Model-instances -or just plain objects- inside the widgets contentBox.
 * It uses Y.View under the hood, where Y.View.container is bound to the 'contentBox'. The render-method must be defined
 * by the widget's attribute 'template'. The Model (or object) must be set through the attribute 'model'.
 *
 * Events can be set through the attribute 'events' and follow the same pattern as Y.View does. As a matter of fact, all attributes
 * (template, model, events) are passed through to the widgets Y.View instance (which has the property 'view').
 *
 *
 * Using this widget is great to render Model on the page, where the widget keeps synced with the model. Whenever a new Model-instance
 * is attached to the widget, or another template is used, the wodget will be re-rendered automaticly.
 *
 * Attaching 'model' with Y.Model-instances or objects?
 * Both can be attached. Whenever widgetattribute change, the widget will be re-rendered is needed (template- or model-attribute). This also
 * counts for attached objects. However, changes inside an object itself (updated property-value) cannot be caught by the widget, so you need
 * to call syncUI() yourself after an object-change. Y.Model-instances -on the other hand- do fire a *:change-event which is caught by the widget.
 * This makes the widget re-render after a Model-instance changes some of its attributes. In fact, you can attach 'string'-values as well, which will
 * lead to 'just rendering' the text without property-fields.
 *
 *
 * By default, the widget comes with its own style. You can disable this by setting the attribute 'styled' to false.
 *
 * @module gallery-itsaviewmodel
 * @extends Widget
 * @class ITSAViewModel
 * @constructor
 * @since 0.1
 *
 * <i>Copyright (c) 2013 Marco Asbreuk - http://itsasbreuk.nl</i>
 * YUI BSD License - http://developer.yahoo.com/yui/license.html
 *
*/

var Lang = Y.Lang,
    YArray = Y.Array,
    YTemplateMicro = Y.Template.Micro,
    ERROR_MESSAGE_NOTEMPLATE = 'Error: template is undefined';


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
    // @since 0.1
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
    // @since 0.1
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

Y.ITSAViewModel = Y.Base.create('itsaviewmodel', Y.View, [], {




        /**
         * @method initializer
         * @protected
        */
        initializer : function() {
            var instance = this,
                model = instance.get('model');


            Y.log('initializer', 'info', 'ITSA-ViewModel');

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
             * Internal template to be used when 'model' is no model but just clear text.
             *
             * @property _textTemplate
             * @private
             * @default null
             * @type String
            */
            instance._textTemplate = null;

            instance._setTemplateRenderer(instance.get('editable'));
/*jshint expr:true */
            model && model.addTarget && model.addTarget(instance);
/*jshint expr:false */
        },

        /**
         * Sets up DOM and CustomEvent listeners for the view.
         *
         * @method _bindUI
         * @private
         * @protected
         */
        _bindUI: function() {
            var instance = this,
                container = instance.get('container'),
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
                        (prevFormModel !== newFormModel) && instance._setTemplateRenderer(instance.get('template'), newFormModel && instance.get('editable'));
/*jshint expr:false */
                        instance.render();
                    }
                )
            );
            eventhandlers.push(
                instance.after(
                    'templateChange',
                    function() {
                        instance._setTemplateRenderer(instance.get('editable'));
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
                            model = instance.get('model');
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
                    '*:focusnext',
                    function() {
                        var itsatabkeymanager = container.itsatabkeymanager;
                        if (itsatabkeymanager && instance.get('focused')) {
                            Y.log('focus to next field', 'info', 'ITSA-ViewModel');
                            itsatabkeymanager.next();
                        }
                        else {
                            Y.log('No focus to next field: Y.Plugin.ITSATabKeyManager not plugged in', 'info', 'ITSA-ViewModel');
                        }
                    }
                )
            );
            eventhandlers.push(
                instance.after(
                    '*:change',
                    function(e) {
                        if ((e.target instanceof Y.Model) && !instance.get('editable')) {
                            instance.render();
                        }
                    }
                )
            );
            eventhandlers.push(
                instance.after(
                    '*:destroy',
                    function(e) {
                        if (e.target instanceof Y.Model) {
                            instance.render(true);
                        }
                    }
                )
            );
        },

        /**
         * Returns the Model as an object. Regardless whether it is a Model-instance, or an item of a LazyModelList.
         * Caution: If it is a Model-instance, than you get a Clone. If not
         * -in case of an object from a LazyModelList- than you get the reference to the original object.
         *
         * @method getModelToJSON
         * @param {Y.Model|Object} model
         * @return {Object} Object or model.toJSON()
         * @since 0.1
         *
        */
        getModelToJSON : function(model) {
            Y.log('getModelToJSON', 'info', 'ITSA-ViewModel');
            return (model.get && (Lang.type(model.get) === 'function')) ? model.toJSON() : model;
        },

        /**
         * Method that is responsible for rendering the Model into the view.
         *
         * @method render
         * @param [clear] {Boolean} whether to clear the view = making it empty without the template.
         * normally you don't want this: leaving empty means the Model is drawn.
         * @private
         * @chainable
         * @since 0.1
         *
        */
        render : function (clear) {
            var instance = this,
                container = instance.get('container'),
                itsatabkeymanager = container.itsatabkeymanager,
                model = instance.get('model'),
                editMode = instance.get('editable'),
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
                container.addClass('itsa-viewmodel');
/*jshint expr:false */
                instance._bindUI();
            }
            instance._rendered = true;
            container.setHTML(html);
            // If Y.Plugin.ITSATabKeyManager is plugged in, then refocus to the first item
            if (editMode) {
                Y.use('gallery-itsatabkeymanager', function() {
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
            * @since 0.2
            */
            instance.fire('viewrendered', {target: instance});
            return instance;
        },

        /**
         * Cleans up bindings
         * @method destructor
         * @protected
        */
        destructor: function() {
            var instance = this,
                model = instance.get('model'),
                container = instance.get('container');

            Y.log('destructor', 'info', 'ITSA-ViewModel');
/*jshint expr:true */
            model && model.removeTarget && model.removeTarget(instance);
/*jshint expr:false */
            instance._clearEventhandlers();
/*jshint expr:true */
            container.hasPlugin('itsatabkeymanager') && container.unplug('itsatabkeymanager');
/*jshint expr:false */
        },

        //===============================================================================================
        // private methods
        //===============================================================================================

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
         * @since 0.1
         *
        */
        _setTemplateRenderer : function(editTemplate) {
            var instance = this,
                template = instance.get('template'),
                isMicroTemplate, ismicrotemplate, compiledModelEngine;

            Y.log('_clearEventhandlers', 'info', 'ITSA-ViewModel');
            isMicroTemplate = function() {
                var microTemplateRegExp = /<%(.+)%>/;
                return microTemplateRegExp.test(template);
            };
            ismicrotemplate = instance._isMicroTemplate = isMicroTemplate();
            if (ismicrotemplate) {
                compiledModelEngine = YTemplateMicro.compile(template);
                instance._modelRenderer = function(model) {
                    var jsondata = editTemplate ? model.toJSONUI() : instance.getModelToJSON(model);
                    return compiledModelEngine(jsondata);
                };
            }
            else {
                instance._modelRenderer = function(model) {
                    var jsondata = editTemplate ? model.toJSONUI() : instance.getModelToJSON(model);
                    return Lang.sub(template, jsondata);
                };
            }
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
            Y.log('_clearEventhandlers', 'info', 'ITSA-ViewModel');
            YArray.each(
                this._eventhandlers,
                function(item){
                    item.detach();
                }
            );
        },

        /**
         * Setter for attribute 'model'
         *
         * @method _setModel
         * @private
         * @param v {String|Object|Model}
         * @since 0.1
         *
        */
        _setModel: function(v) {
            var instance = this;
            // in case model is a string --> not a real model is set: we just need to render clear text.
            // to achieve this, we create a new model-object with no properties and we define this._textTemplate
            // which will be used as the template (= text without properties)
            if (typeof v === 'string') {
                instance._textTemplate = v;
                v = {};
            }
            else {
                instance._textTemplate = null;
            }
            return v;
        }

    }, {
        ATTRS : {
            /**
             * Hash of CSS selectors mapped to events to delegate to elements matching
             * those selectors.
             *
             * CSS selectors are relative to the `contentBox` element, which is in fact
             * the view-container. Events are attached to this container (contentBox), and
             * delegation is used so that subscribers are only notified of events that occur on
             * elements inside the container that match the specified selectors. This allows the
             * contentBox to be re-rendered as needed without losing event subscriptions.
             *
             * Event handlers can be specified either as functions or as strings that map
             * to function names. IN the latter case, you must declare the functions as part
             * of the 'view'-property (which is a Y.View instance).
             *
             * The `this` object in event handlers will refer to the 'view'-property (which is a
             * Y.View instance, created during initialisation of this widget. If you'd prefer `this`
             * to be something else, use `Y.bind()` to bind a custom `this` object.
             *
             * @example
             *     var viewModel = new Y.ViewITSAViewModel({
             *         events: {
             *             // Call `this.toggle()` whenever the element with the id
             *             // "toggle-button" is clicked.
             *             '#toggle-button': {click: 'toggle'},
             *
             *             // Call `this.hoverOn()` when the mouse moves over any element
             *             // with the "hoverable" class, and `this.hoverOff()` when the
             *             // mouse moves out of any element with the "hoverable" class.
             *             '.hoverable': {
             *                 mouseover: 'hoverOn',
             *                 mouseout : 'hoverOff'
             *             }
             *         }
             *     });
             *
             * @attribute events
             * @type {object}
             * @default {}
             * @since 0.1
             */
            events: {
                value: {},
                validator: function(v){ return Lang.isObject(v);}
            },

            /**
             * Makes the View to render the editable-version of the Model. Only when the Model has <b>Y.Plugin.ITSAEditModel</b> plugged in.
             *
             * @attribute editable
             * @type {Boolean}
             * @default false
             * @since 0.1
             */
            editable: {
                value: false,
                lazyAdd: false,
                validator: function(v){
                    return (typeof v === 'boolean');
                },
                getter: function(v) {
                    var model = this.get('model');
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
             * @since 0.1
             */
            model: {
                value: null,
                validator: function(v){ return ((v===null) || Lang.isObject(v) || (typeof v === 'string') ||
                                                (v.get && (typeof v.get === 'function') && v.get('clientId'))); },
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
             * @default '{clientId}'
             * @since 0.1
             */
            template: {
                value: ERROR_MESSAGE_NOTEMPLATE,
                validator: function(v) {
                    return (typeof v === 'string');
                },
                getter: function(v) {
                    // Because _textTemplate might exists in case of clear text instead of a model, we need to return the right template.
                    return this._textTemplate || v;
                }
            }

        }
    }
);