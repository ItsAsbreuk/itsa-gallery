YUI.add('gallery-itsaviewmodel', function (Y, NAME) {

'use strict';

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
 * Attaching Y.Model-instances or objects?
 * Both can be attached. Whenever widgetattribute change, the widget will be re-rendered is needed (template- or model-attribute). This also
 * counts for attached objects. However, changes inside an object itself (updated property-value) cannot be caught by the widget, so you need
 * to call syncUI() yourself after an object-change. Y.Model-instances -on the other hand- do fire a *:change-event which is caught by the widget.
 * This makes the widget re-render after a Model-instance changes some of its attributes.
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
    MODELVIEW_STYLED = 'itsa-modelview-styled';

//===============================================================================================
//
// First: extend Y.Node with the method cleanup()
//
//===============================================================================================

function ITSANodeCleanup() {}

Y.mix(ITSANodeCleanup.prototype, {

    //
    // Cleansup the node by calling destroy(true) on all its children, as well as destroying all widgets that lie
    // within the node by calling widget.destroy(true);
    //
    // @method cleanup
    // @since 0.1
    //
    //
    cleanup: function() {
        var node = this,
            YWidget = Y.Widget;

        Y.log('cleanup', 'info', 'Itsa-NodeCleanup');
        if (YWidget) {
            node.all('.yui3-widget').each(
                function(widgetNode) {
                    if (node.one('#'+widgetNode.get('id'))) {
                        var widgetInstance = YWidget.getByNode(widgetNode);
                        if (widgetInstance) {
                            widgetInstance.destroy(true);
                        }
                    }
                }
            );
        }
        node.all('children').destroy(true);
    }

}, true);

Y.Node.ITSANodeCleanup = ITSANodeCleanup;

Y.Base.mix(Y.Node, [ITSANodeCleanup]);

//===============================================================================================
//
// Next we create the widget
//
//===============================================================================================

Y.ITSAViewModel = Y.Base.create('itsaviewmodel', Y.Widget, [], {

        /**
         * Internally generated Y.View-instance that has its 'container' bound to the 'contentBox'
         * @property view
         * @type Y.View
        */
        view : null,

        /**
         * Internal flag that tells wheter a Template.Micro is being used.
         * @property _isMicroTemplate
         * @private
         * @default null
         * @type Boolean
        */
        _isMicroTemplate : null,

        /**
         * Internal Function that is generated to automaticly make use of the template.
         * The function has the structure of: _modelTemplate = function(model) {return {String}};
         * @property _modelTemplate
         * @private
         * @default function(model) {return ''};
         * @type Function
        */
        _modelTemplate : null,

        /**
         * Internal list of all eventhandlers bound by this widget.
         * @property _eventhandlers
         * @private
         * @default []
         * @type Array
        */
        _eventhandlers : [],

        /**
         * @method initializer
         * @protected
        */
        initializer : function() {
            var instance = this,
                boundingBox = instance.get('boundingBox'),
                contentBox = instance.get('contentBox'),
                events = instance.get('events'),
                model = instance.get('model'),
                template = instance.get('template'),
                styled = instance.get('styled'),
                view;

            Y.log('initializer', 'info', 'Itsa-ViewModel');
            if (styled) {
                boundingBox.addClass(MODELVIEW_STYLED);
            }
            view = instance.view = new Y.View({
                container: contentBox,
                model: model
            });
            view.events = events;
            view.template = template;
            instance._setTemplateRenderer(template);
            view.render = Y.rbind(instance._viewRenderer, instance);
            if (model && model.addTarget) {
                model.addTarget(view);
            }
         },

        /**
         * Sets up DOM and CustomEvent listeners for the widget.
         *
         * @method bindUI
         * @protected
         */
        bindUI: function() {
            var instance = this,
                boundingBox = instance.get('boundingBox'),
                eventhandlers = instance._eventhandlers,
                view = instance.view;

            Y.log('bindUI', 'info', 'Itsa-ViewModel');
            eventhandlers.push(
                instance.after(
                    'modelChange',
                    function(e) {
                        var prevVal = e.prevVal,
                            newVal = e.newVal;
                        if (prevVal && prevVal.removeTarget) {
                            prevVal.removeTarget(view);
                        }
                        if (newVal && newVal.addTarget) {
                            newVal.addTarget(view);
                        }
                        view.set('model', newVal);
                        view.render();
                    }
                )
            );
            eventhandlers.push(
                instance.after(
                    'templateChange',
                    function(e) {
                        var newTemplate = e.newVal;
                        view.template = newTemplate;
                        instance._setTemplateRenderer(newTemplate);
                        view.render();
                    }
                )
            );
            eventhandlers.push(
                instance.after(
                    'eventsChange',
                    function(e) {
                        view.events = e.newVal;
                    }
                )
            );
            eventhandlers.push(
                instance.after(
                    'styledChange',
                    function(e) {
                        boundingBox.toggleClass(MODELVIEW_STYLED, e.newVal);
                    }
                )
            );
            eventhandlers.push(
                view.after('*:change', Y.bind(view.render, view, false))
            );
            eventhandlers.push(
                view.after('model:destroy', Y.bind(view.render, view, true))
            );
        },

        /**
         * Returns the Model as an object. Regardless whether it is a Model-instance, or an item of a LazyModelList
         * which might be an Object or a Model. Caution: If it is a Model-instance, than you get a Clone. If not
         * -in case of an object from a LazyModelList- than you get the reference to the original object.
         *
         * @method getModelToJSON
         * @param {Y.Model} model Model or Object
         * @return {Object} Object or model.toJSON()
         * @since 0.1
         *
        */
        getModelToJSON : function(model) {
            Y.log('getModelToJSON', 'info', 'Itsa-ViewModel');
            return (model.get && (Lang.type(model.get) === 'function')) ? model.toJSON() : model;
        },

        /**
         * Updates the widget-content by calling view.render();
         *
         * @method syncUI
         * @protected
         */
        syncUI: function() {
            this.view.render();
        },

        /**
         * Cleans up bindings
         * @method destructor
         * @protected
        */
        destructor: function() {
            var instance = this;

            Y.log('destructor', 'info', 'Itsa-ViewModel');
            instance._clearEventhandlers();
            instance.view.destroy();
        },

        //===============================================================================================
        // private methods
        //===============================================================================================

        /**
         * Function-factory that binds a function to the property '_modelTemplate'. '_modelTemplate' will be defined like
         * _modelTemplate = function(model) {return {String}};
         * which means: it will return a rendered String that is modified by the attribute 'template'. The rendering
         * is done either by Y.Lang.sub or by Y.Template.Micro, depending on the value of 'template'.
         *
         * @method _viewRenderer
         * @private
         * @chainable
         * @since 0.1
         *
        */
        _setTemplateRenderer : function(template) {
            var instance = this,
                isMicroTemplate, ismicrotemplate, compiledModelEngine;

            Y.log('_clearEventhandlers', 'info', 'Itsa-ViewModel');
            isMicroTemplate = function() {
                var microTemplateRegExp = /<%(.+)%>/;
                return microTemplateRegExp.test(template);
            };
            ismicrotemplate = instance._isMicroTemplate = isMicroTemplate();
            if (ismicrotemplate) {
                compiledModelEngine = YTemplateMicro.compile(template);
                instance._modelTemplate = function(model) {
                    return compiledModelEngine(instance.getModelToJSON(model));
                };
            }
            else {
                instance._modelTemplate = function(model) {
                    return Lang.sub(template, instance.getModelToJSON(model));
                };
            }
        },

        /**
         * Method that is responsible for rendering the Model into the view.
         *
         * @method _viewRenderer
         * @param {Boolean} [clear] whether to clear the view. normally you don't want this: leaving empty means the Model is drawn.
         * @private
         * @chainable
         * @since 0.1
         *
        */
        _viewRenderer : function (clear) {
          var instance = this,
              view = instance.view,
              container = view.get('container'),
              model = view.get('model'),
              html = clear ? '' : instance._modelTemplate(model);

          Y.log('_viewRenderer', 'info', 'Itsa-ViewModel');
          // Render this view's HTML into the container element.
          // Because Y.Node.setHTML DOES NOT destroy its nodes (!) but only remove(), we destroy them ourselves first
          if (instance._isMicroTemplate) {
              container.cleanup();
          }
          container.setHTML(html);
          return instance;
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
            Y.log('_clearEventhandlers', 'info', 'Itsa-ViewModel');
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
             * The Y.Model that will be rendered in the view. May also be an Object, which is handy in case the source is an
             * item of a Y.LazyModelList
             *
             * @attribute model
             * @type {Y.Model|Object}
             * @default {}
             * @since 0.1
             */
            model: {
                value: null,
                validator: function(v){ return ((v instanceof Y.Model) || Lang.isObject(v) || (v===null)); }
            },

           /**
            * Whether the View is styled using the css of this module.
            * In fact, just the classname 'itsa-modelview-styled' is added to the boundingBox
            * and the css-rules do all the rest. The developer may override these rules, or set this value to false
            * while creatiung their own css. In the latter case it is advisable to take a look at all the css-rules
            * that are supplied by this module.
            *
            * @default true
            * @attribute styled
            * @type {Boolean}
            * @since 0.1
            */
            styled: {
                value: true,
                validator:  function(v) {
                    return Lang.isBoolean(v);
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
         * @default '{clientId}'
         * @since 0.1
         */
            template: {
                value: '{clientId}',
                validator: function(v){ return Lang.isString(v); }
            }

        }
    }
);

}, '@VERSION@', {"requires": ["base-build", "widget", "view", "template-micro", "model"], "skinnable": true});