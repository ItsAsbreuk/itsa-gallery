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
_yuitest_coverage["build/gallery-itsaviewmodel/gallery-itsaviewmodel.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-itsaviewmodel/gallery-itsaviewmodel.js",
    code: []
};
_yuitest_coverage["build/gallery-itsaviewmodel/gallery-itsaviewmodel.js"].code=["YUI.add('gallery-itsaviewmodel', function (Y, NAME) {","","'use strict';","","/**"," *"," * Widget ITSAViewModel"," *"," *"," * This widget renderes Y.Model-instances -or just plain objects- inside the widgets contentBox."," * It uses Y.View under the hood, where Y.View.container is bound to the 'contentBox'. The render-method must be defined"," * by the widget's attribute 'template'. The Model (or object) must be set through the attribute 'model'."," *"," * Events can be set through the attribute 'events' and follow the same pattern as Y.View does. As a matter of fact, all attributes"," * (template, model, events) are passed through to the widgets Y.View instance (which has the property 'view')."," *"," *"," * Using this widget is great to render Model on the page, where the widget keeps synced with the model. Whenever a new Model-instance"," * is attached to the widget, or another template is used, the wodget will be re-rendered automaticly."," *"," * Attaching 'model' with Y.Model-instances or objects?"," * Both can be attached. Whenever widgetattribute change, the widget will be re-rendered is needed (template- or model-attribute). This also"," * counts for attached objects. However, changes inside an object itself (updated property-value) cannot be caught by the widget, so you need"," * to call syncUI() yourself after an object-change. Y.Model-instances -on the other hand- do fire a *:change-event which is caught by the widget."," * This makes the widget re-render after a Model-instance changes some of its attributes. In fact, you can attach 'string'-values as well, which will"," * lead to 'just rendering' the text without property-fields."," *"," *"," * By default, the widget comes with its own style. You can disable this by setting the attribute 'styled' to false."," *"," * @module gallery-itsaviewmodel"," * @extends Widget"," * @class ITSAViewModel"," * @constructor"," * @since 0.1"," *"," * <i>Copyright (c) 2013 Marco Asbreuk - http://itsasbreuk.nl</i>"," * YUI BSD License - http://developer.yahoo.com/yui/license.html"," *","*/","","var Lang = Y.Lang,","    YArray = Y.Array,","    YTemplateMicro = Y.Template.Micro,","    MODELVIEW_STYLED = 'itsa-modelview-styled',","    MODELVIEW_STYLED_FORM = 'yui3-form',","    FORMELEMENT_CLASS = 'yui3-itsaformelement',","    ITSAFORMELEMENT_CHANGED_CLASS = FORMELEMENT_CLASS + '-changed';","","","//===============================================================================================","//","// First: extend Y.Node with the method cleanup()","//","//===============================================================================================","","function ITSANodeCleanup() {}","","Y.mix(ITSANodeCleanup.prototype, {","","    //","    // Destroys all widgets inside the node by calling widget.destroy(true);","    //","    // @method cleanup","    // @param destroyAllNodes {Boolean} If true, all nodes contained within the Widget are removed and destroyed.","    //                        Defaults to false due to potentially high run-time cost.","    // @since 0.1","    //","    //","    cleanupWidgets: function(destroyAllNodes) {","        var node = this,","            YWidget = Y.Widget;","","        if (YWidget) {","            node.all('.yui3-widget').each(","                function(widgetNode) {","                    if (node.one('#'+widgetNode.get('id'))) {","                        var widgetInstance = YWidget.getByNode(widgetNode);","                        if (widgetInstance) {","                            widgetInstance.destroy(destroyAllNodes);","                        }","                    }","                }","            );","        }","    },","","    //","    // Cleansup the node by calling node.empty(), as well as destroying all widgets that lie","    // within the node by calling widget.destroy(true);","    //","    // @method cleanup","    // @since 0.1","    //","    //","    cleanup: function() {","        var node = this;","","        node.cleanupWidgets(true);","        node.empty();","    }","","}, true);","","Y.Node.ITSANodeCleanup = ITSANodeCleanup;","","Y.Base.mix(Y.Node, [ITSANodeCleanup]);","","//===============================================================================================","//","// Next we create the widget","//","//===============================================================================================","","Y.ITSAViewModel = Y.Base.create('itsaviewmodel', Y.Widget, [], {","","","","","        /**","         * @method initializer","         * @protected","        */","        initializer : function() {","            var instance = this;","            /**","             * Internally generated Y.View-instance that has its 'container' bound to the 'contentBox'","             * @property view","             * @type Y.View","            */","            instance.view = null;","","            /**","             * Internal flag that tells wheter a Template.Micro is being used.","             * @property _isMicroTemplate","             * @private","             * @default null","             * @type Boolean","            */","            instance._isMicroTemplate = null;","","            /**","             * Internal Function that is generated to automaticly make use of the template.","             * The function has the structure of: _modelRenderer = function(model) {return {String}};","             * @property _modelRenderer","             * @private","             * @default function(model) {return ''};","             * @type Function","            */","            instance._modelRenderer = null;","","            /**","             * Internal list of all eventhandlers bound by this widget.","             * @property _eventhandlers","             * @private","             * @default []","             * @type Array","            */","            instance._eventhandlers = [];","","            /**","             * Backup of the original state of the attribute-values. Needed to make reset posible in case","             * Y.Plugin.ITSAEditModel is plugged in","             *","             * @property _initialEditAttrs","             * @private","             * @default null","             * @type Object","            */","            instance._initialEditAttrs = null;","","            /**","             * Internal template to be used when 'model' is no model but just clear text.","             *","             * @property _textTemplate","             * @private","             * @default null","             * @type String","            */","            instance._textTemplate = null;","        },","","       /**","         * Overruled renderer-method, to make sure rendering is done after asynchronious initialisation.","         *","         * @method renderer","         * @protected","        */","        renderer : function() {","            var instance = this,","                boundingBox = instance.get('boundingBox'),","                model = instance.get('model'),","                modelEditable = instance.get('modelEditable'),","                itsaeditmodel = (modelEditable && model.itsaeditmodel),","                panelwidgetbd = boundingBox.one('.yui3-widget-bd');","","            if ((itsaeditmodel || panelwidgetbd) && !boundingBox.itsatabkeymanager) {","                Y.use('gallery-itsatabkeymanager', function(Y) {","                    boundingBox.plug(Y.Plugin.ITSATabKeyManager);","                    instance._renderFurther(boundingBox, model, itsaeditmodel);","                });","            }","            else {","                instance._renderFurther(boundingBox, model, itsaeditmodel);","            }","        },","","        /**","         * More renderer, but we are always sure itsatabkeymanager is loaded (when needed)","         *","         * @method renderFurther","         * @param boundingBox {Y.Node}","         * @param model {Y.Model}","         * @param itsaeditmodel {Y.Plugin.ITSAEditModel}","         * @private","         * @protected","        */","        _renderFurther : function(boundingBox, model, itsaeditmodel) {","            var instance = this,","                events = instance.get('events'),","                template = itsaeditmodel ? model.itsaeditmodel.get('template') : instance.get('template'),","                styled = instance.get('styled'),","                view;","","            if (styled) {","                boundingBox.addClass(MODELVIEW_STYLED).addClass(MODELVIEW_STYLED_FORM);","            }","            instance._widgetRenderer();","            view = instance.view = new Y.View({","                container: instance._getViewContainer(),","                model: model","            });","            view.events = events;","            view.template = template;","            instance._setTemplateRenderer(template, itsaeditmodel);","            view.render = Y.rbind(instance._viewRenderer, instance);","            if (model && model.addTarget) {","                model.addTarget(view);","            }","            instance._bindViewUI();","            instance.view.render();","        },","","        /**","         * returns the view-container, which equals this.get('contentBox')","         *","         * @method _getViewContainer","         * @private","        */","        _getViewContainer : function() {","            return this.get('contentBox');","        },","","        /**","         * Calls the original Y.Widget.renderer","         *","         * @method _widgetRenderer","         * @private","         * @protected","        */","        _widgetRenderer : function() {","            var instance = this;","","            instance.constructor.superclass.renderer.apply(instance);","        },","","        /**","         * Sets up DOM and CustomEvent listeners for the widget.","         *","         * @method bindUI","         * @protected","         */","        bindUI: function() {","            // Only declare listeners here that have no relationship with this.view, because this.view does not exists here.","            var instance = this,","                eventhandlers = instance._eventhandlers,","                boundingBox = instance.get('boundingBox');","","            eventhandlers.push(","                instance.after(","                    'styledChange',","                    function(e) {","                        boundingBox.toggleClass(MODELVIEW_STYLED, e.newVal).toggleClass(MODELVIEW_STYLED_FORM, e.newVal);","                    }","                )","            );","        },","","        /**","         * Sets up extra DOM and CustomEvent listeners for the widget which are bound to this.view","         *","         * @method _bindViewUI","         * @private","         * @protected","         */","        _bindViewUI: function() {","            // Only declare listeners here that have relationship with this.view, because this.view only exists from this point.","            var instance = this,","                boundingBox = instance.get('boundingBox'),","                model = instance.get('model'),","                eventhandlers = instance._eventhandlers,","                itsatabkeymanager = boundingBox.itsatabkeymanager,","                view = instance.view;","","            eventhandlers.push(","                instance.after(","                    'modelChange',","                    function(e) {","                        var prevVal = e.prevVal,","                            newVal = e.newVal;","                        if (prevVal && prevVal.removeTarget) {","                            prevVal.removeTarget(view);","                        }","                        if (newVal && newVal.addTarget) {","                            newVal.addTarget(view);","                        }","                        view.set('model', newVal);","                        model = instance.get('model');","                        view.render();","                    }","                )","            );","            eventhandlers.push(","                instance.after(","                    'templateChange',","                    function(e) {","                        var newTemplate = e.newVal,","                            modelEditable = instance.get('modelEditable');","                        if (!modelEditable || (model && !model.itsaeditmodel)) {","                            view.template = newTemplate;","                            instance._setTemplateRenderer(newTemplate, false);","                            view.render();","                        }","                    }","                )","            );","            eventhandlers.push(","                view.after(","                    'itsaeditmodel:templateChange',","                    function(e) {","                        var newTemplate = e.newVal,","                            modelEditable = instance.get('modelEditable');","                        if (modelEditable && model && model.itsaeditmodel) {","                            view.template = newTemplate;","                            instance._setTemplateRenderer(newTemplate, true);","                            view.render();","                        }","                    }","                )","            );","            eventhandlers.push(","                view.after(","                    'model:resetclick',","                    function(e) {","                        var model = e.target, // NOT e.currentTarget: that is the (scroll)View-instance (?)","                            options = {fromEditModel: true}; // set Attribute with option: '{fromEditModel: true}'","                                                             // --> now the view knows it must not re-render.","                        model.setAttrs(instance._initialEditAttrs, options);","                        view.render();","                        if (itsatabkeymanager) {","                            itsatabkeymanager.focusInitialItem();","                        }","                    }","                )","            );","            eventhandlers.push(","                instance.after(","                    'modelEditableChange',","                    function(e) {","                        var newEditable = e.newVal,","                            template;","                        // if model.itsaeditmodel exists, then we need to rerender","                        if (model && model.itsaeditmodel) {","                            template = newEditable ? model.itsaeditmodel.get('template') : instance.get('template');","                            view.template = template;","                            instance._setTemplateRenderer(template, newEditable);","                            view.render();","                        }","                    }","                )","            );","            eventhandlers.push(","                instance.after(","                    'itsaeditmodel:editmodelConfigAttrsChange',","                    function() {","                        if (model.itsaeditmodel && instance.get('modelEditable')) {","                            view.render();","                        }","                    }","                )","            );","            eventhandlers.push(","                view.after(","                    'itsaeditmodel:destroy',","                    function() {","                        if (instance.get('modelEditable')) {","                            var template = instance.get('template');","                            view.template = template;","                            instance._setTemplateRenderer(template, false);","                            view.render();","                        }","                    }","                )","            );","            eventhandlers.push(","                view.after(","                    'itsaeditmodel:pluggedin',","                    function() {","                        Y.use('gallery-itsatabkeymanager', function(Y) {","                            if (!boundingBox.itsatabkeymanager) {","                                boundingBox.plug(Y.Plugin.ITSATabKeyManager);","                            }","                            if (instance.get('modelEditable')) {","                                var template = model.itsaeditmodel.get('template');","                                view.template = template;","                                instance._setTemplateRenderer(template, true);","                                view.render();","                            }","                        });","                    }","                )","            );","            eventhandlers.push(","                view.after(","                    'itsaeditmodel:focusnext',","                    function() {","                        var itsatabkeymanager = boundingBox.itsatabkeymanager;","                        if (itsatabkeymanager && instance.get('focused')) {","                            itsatabkeymanager.next();","                        }","                        else {","                        }","                    }","                )","            );","            eventhandlers.push(","                instance.after(","                    'eventsChange',","                    function(e) {","                        view.events = e.newVal;","                    }","                )","            );","            eventhandlers.push(","                view.after(","                    'model:change',","                    function() {","                        if (!instance.get('modelEditable') || !model.itsaeditmodel) {","                            view.render(false);","                        }","                        else {","                            view.get('container').all('.'+ITSAFORMELEMENT_CHANGED_CLASS).removeClass(ITSAFORMELEMENT_CHANGED_CLASS);","                        }","                    }","                )","            );","            eventhandlers.push(","                view.after(","                    'model:destroy',","                    function() {","                        view.render(true);","                    }","                )","            );","        },","","        /**","         * Returns the Model as an object. Regardless whether it is a Model-instance, or an item of a LazyModelList","         * which might be an Object or a Model. Caution: If it is a Model-instance, than you get a Clone. If not","         * -in case of an object from a LazyModelList- than you get the reference to the original object.","         *","         * @method getModelToJSON","         * @param {Y.Model} model Model or Object","         * @return {Object} Object or model.toJSON()","         * @since 0.1","         *","        */","        getModelToJSON : function(model) {","            return (model.get && (Lang.type(model.get) === 'function')) ? model.toJSON() : model;","        },","","        /**","         * Cleans up bindings","         * @method destructor","         * @protected","        */","        destructor: function() {","            var instance = this,","                boundingBox = instance.get('boundingBox');","","            instance._clearEventhandlers();","            instance.view.destroy();","            if (boundingBox.hasPlugin('itsatabkeymanager')) {","                boundingBox.unplug('itsatabkeymanager');","            }","        },","","        //===============================================================================================","        // private methods","        //===============================================================================================","","        /**","         * Function-factory that binds a function to the property '_modelRenderer'. '_modelRenderer' will be defined like","         * _modelRenderer = function(model) {return {String}};","         * which means: it will return a rendered String that is modified by the attribute 'template'. The rendering","         * is done either by Y.Lang.sub or by Y.Template.Micro, depending on the value of 'template'.","         *","         * @method _viewRenderer","         * @param template {String} template to be rendered","         * @param editTemplate {Boolean} whether or not the template is an 'editTemplate' from Y.Plugin.ITSAEditModel","         * @private","         * @chainable","         * @since 0.1","         *","        */","        _setTemplateRenderer : function(template, editTemplate) {","            var instance = this,","                isMicroTemplate, ismicrotemplate, compiledModelEngine;","","            isMicroTemplate = function() {","                var microTemplateRegExp = /<%(.+)%>/;","                return microTemplateRegExp.test(template);","            };","            ismicrotemplate = instance._isMicroTemplate = isMicroTemplate();","            if (ismicrotemplate) {","                compiledModelEngine = YTemplateMicro.compile(template);","                instance._modelRenderer = function(model) {","                    var jsondata = editTemplate ? model.itsaeditmodel.toJSON(model.itsaeditmodel.get('editmodelConfigAttrs'))","                                   : instance.getModelToJSON(model);","                    return compiledModelEngine(jsondata);","                };","            }","            else {","                instance._modelRenderer = function(model) {","                    var jsondata = editTemplate ? model.itsaeditmodel.toJSON(model.itsaeditmodel.get('editmodelConfigAttrs'))","                                   : instance.getModelToJSON(model);","                    return Lang.sub(template, jsondata);","                };","            }","        },","","        /**","         * Method that is responsible for rendering the Model into the view.","         *","         * @method _viewRenderer","         * @param {Boolean} [clear] whether to clear the view. normally you don't want this: leaving empty means the Model is drawn.","         * @private","         * @chainable","         * @since 0.1","         *","        */","        _viewRenderer : function (clear) {","            var instance = this,","                boundingBox = instance.get('boundingBox'),","                itsatabkeymanager = boundingBox.itsatabkeymanager,","                view = instance.view,","                container = view.get('container'),","                model = view.get('model'),","                editMode = model && model.itsaeditmodel && instance.get('modelEditable'),","                itsaDateTimePicker = Y.Global.ItsaDateTimePicker,","                html = (clear || !model) ? '' : instance._modelRenderer(model);","","            // Render this view's HTML into the container element.","            // Because Y.Node.setHTML DOES NOT destroy its nodes (!) but only remove(), we destroy them ourselves first","            if (editMode || instance._isMicroTemplate) {","                if (editMode) {","                    instance._initialEditAttrs = model.getAttrs();","                }","                container.cleanupWidgets(true);","            }","","            container.setHTML(html);","            // If Y.Plugin.ITSATabKeyManager is plugged in, then refocus to the first item","            if (itsatabkeymanager) {","                itsatabkeymanager.refresh(boundingBox);","                if (instance.get('focused')) {","                    itsatabkeymanager.focusInitialItem();","                }","            }","            if (itsaDateTimePicker && itsaDateTimePicker.panel.get('visible')) {","                itsaDateTimePicker.hide(true);","            }","            return instance;","        },","","        /**","         * Cleaning up all eventlisteners","         *","         * @method _clearEventhandlers","         * @private","         * @since 0.1","         *","        */","        _clearEventhandlers : function() {","            YArray.each(","                this._eventhandlers,","                function(item){","                    item.detach();","                }","            );","        },","","        /**","         * Setter for attribute 'model'","         *","         * @method _setModel","         * @private","         * @param v {String|Object|Model}","         * @since 0.1","         *","        */","        _setModel: function(v) {","            var instance = this,","                view = instance.view,","                templatechange, modelEditable, newTemplate;","            // in case model is a string --> not a real model is set: we just need to render clear text.","            // to achieve this, we create a new model-object with no properties and we define this._textTemplate","            // which can be used as the template (= text without properties)","            if (typeof v === 'string') {","                templatechange = !instance._textTemplate;","                instance._textTemplate = v;","                v = {};","            }","            else {","                templatechange = instance._textTemplate;","                instance._textTemplate = null;","            }","            if (templatechange && view) {","                modelEditable = instance.get('modelEditable');","                if (!modelEditable || (v && !v.itsaeditmodel)) {","                    newTemplate = instance.get('template');","                    view.template = newTemplate;","                    instance._setTemplateRenderer(newTemplate, false);","                }","            }","            return v;","        }","","    }, {","        ATTRS : {","            /**","             * Hash of CSS selectors mapped to events to delegate to elements matching","             * those selectors.","             *","             * CSS selectors are relative to the `contentBox` element, which is in fact","             * the view-container. Events are attached to this container (contentBox), and","             * delegation is used so that subscribers are only notified of events that occur on","             * elements inside the container that match the specified selectors. This allows the","             * contentBox to be re-rendered as needed without losing event subscriptions.","             *","             * Event handlers can be specified either as functions or as strings that map","             * to function names. IN the latter case, you must declare the functions as part","             * of the 'view'-property (which is a Y.View instance).","             *","             * The `this` object in event handlers will refer to the 'view'-property (which is a","             * Y.View instance, created during initialisation of this widget. If you'd prefer `this`","             * to be something else, use `Y.bind()` to bind a custom `this` object.","             *","             * @example","             *     var viewModel = new Y.ViewITSAViewModel({","             *         events: {","             *             // Call `this.toggle()` whenever the element with the id","             *             // \"toggle-button\" is clicked.","             *             '#toggle-button': {click: 'toggle'},","             *","             *             // Call `this.hoverOn()` when the mouse moves over any element","             *             // with the \"hoverable\" class, and `this.hoverOff()` when the","             *             // mouse moves out of any element with the \"hoverable\" class.","             *             '.hoverable': {","             *                 mouseover: 'hoverOn',","             *                 mouseout : 'hoverOff'","             *             }","             *         }","             *     });","             *","             * @attribute events","             * @type {object}","             * @default {}","             * @since 0.1","             */","            events: {","                value: {},","                validator: function(v){ return Lang.isObject(v);}","            },","","            /**","             * Makes the View to render the editable-version of the Model. Only when the Model has <b>Y.Plugin.ITSAEditModel</b> plugged in.","             *","             * @attribute modelEditable","             * @type {Boolean}","             * @default false","             * @since 0.1","             */","            modelEditable: {","                value: false,","                lazyAdd: false,","                validator: function(v){","                    return Lang.isBoolean(v);","                }","            },","","            /**","             * The Y.Model that will be rendered in the view. May also be an Object, which is handy in case the source is an","             * item of a Y.LazyModelList. If you pass a String-value, then the text is rendered as it is, assuming no model-instance.","             *","             * @attribute model","             * @type {Y.Model|Object|String}","             * @default {}","             * @since 0.1","             */","            model: {","                value: null,","                validator: function(v){ return ((v===null) || Lang.isObject(v) || (typeof v === 'string')","                                                || (v.get && (typeof v.get === 'function') && v.get('clientId'))); },","                setter: '_setModel'","            },","","           /**","            * Whether the View is styled using the css of this module.","            * In fact, just the classname 'itsa-modelview-styled' is added to the boundingBox","            * and the css-rules do all the rest. The developer may override these rules, or set this value to false","            * while creatiung their own css. In the latter case it is advisable to take a look at all the css-rules","            * that are supplied by this module.","            *","            * @default true","            * @attribute styled","            * @type {Boolean}","            * @since 0.1","            */","            styled: {","                value: true,","                validator:  function(v) {","                    return Lang.isBoolean(v);","                }","            },","","        /**","         * Template to render the Model. The attribute MUST be a template that can be processed by either <i>Y.Lang.sub or Y.Template.Micro</i>,","         * where Y.Lang.sub is more lightweight.","         *","         * <b>Example with Y.Lang.sub:</b> '{slices} slice(s) of {type} pie remaining. <button class=\"eat\">Eat a Slice!</button>'","         * <b>Example with Y.Template.Micro:</b>","         * '<%= data.slices %> slice(s) of <%= data.type %> pie remaining <button class=\"eat\">Eat a Slice!</button>'","         * <b>Example 2 with Y.Template.Micro:</b>","         * '<%= data.slices %> slice(s) of <%= data.type %> pie remaining<% if (data.slices>0) {%> <button class=\"eat\">Eat a Slice!</button><% } %>'","         *","         * <u>If you set this attribute after the view is rendered, the view will be re-rendered.</u>","         *","         * @attribute template","         * @type {String}","         * @default '{clientId}'","         * @since 0.1","         */","            template: {","                value: '{clientId}',","                validator: function(v){ return Lang.isString(v); },","                getter: function(v) {","                    // Because _textTemplate might exists in case of clear text instead of a model, we need to return the right template.","                    return this._textTemplate || v;","                }","            }","","        }","    }",");","","}, '@VERSION@', {","    \"requires\": [","        \"base-build\",","        \"widget\",","        \"view\",","        \"template-micro\",","        \"model\",","        \"pluginhost-base\"","    ],","    \"skinnable\": true","});"];
_yuitest_coverage["build/gallery-itsaviewmodel/gallery-itsaviewmodel.js"].lines = {"1":0,"3":0,"42":0,"57":0,"59":0,"71":0,"74":0,"75":0,"77":0,"78":0,"79":0,"80":0,"97":0,"99":0,"100":0,"105":0,"107":0,"115":0,"125":0,"131":0,"140":0,"150":0,"159":0,"170":0,"180":0,"190":0,"197":0,"198":0,"199":0,"200":0,"204":0,"219":0,"225":0,"226":0,"228":0,"229":0,"233":0,"234":0,"235":0,"236":0,"237":0,"238":0,"240":0,"241":0,"251":0,"262":0,"264":0,"275":0,"279":0,"283":0,"298":0,"305":0,"309":0,"311":0,"312":0,"314":0,"315":0,"317":0,"318":0,"319":0,"323":0,"327":0,"329":0,"330":0,"331":0,"332":0,"337":0,"341":0,"343":0,"344":0,"345":0,"346":0,"351":0,"355":0,"358":0,"359":0,"360":0,"361":0,"366":0,"370":0,"373":0,"374":0,"375":0,"376":0,"377":0,"382":0,"386":0,"387":0,"392":0,"396":0,"397":0,"398":0,"399":0,"400":0,"405":0,"409":0,"410":0,"411":0,"413":0,"414":0,"415":0,"416":0,"417":0,"423":0,"427":0,"428":0,"429":0,"436":0,"440":0,"444":0,"448":0,"449":0,"452":0,"457":0,"461":0,"479":0,"488":0,"491":0,"492":0,"493":0,"494":0,"517":0,"520":0,"521":0,"522":0,"524":0,"525":0,"526":0,"527":0,"528":0,"530":0,"534":0,"535":0,"537":0,"553":0,"565":0,"566":0,"567":0,"569":0,"572":0,"574":0,"575":0,"576":0,"577":0,"580":0,"581":0,"583":0,"595":0,"598":0,"613":0,"619":0,"620":0,"621":0,"622":0,"625":0,"626":0,"628":0,"629":0,"630":0,"631":0,"632":0,"633":0,"636":0,"683":0,"698":0,"713":0,"733":0,"756":0,"759":0};
_yuitest_coverage["build/gallery-itsaviewmodel/gallery-itsaviewmodel.js"].functions = {"ITSANodeCleanup:57":0,"(anonymous 2):76":0,"cleanupWidgets:70":0,"cleanup:96":0,"initializer:124":0,"(anonymous 3):198":0,"renderer:189":0,"_renderFurther:218":0,"_getViewContainer:250":0,"_widgetRenderer:261":0,"(anonymous 4):282":0,"bindUI:273":0,"(anonymous 5):308":0,"(anonymous 6):326":0,"(anonymous 7):340":0,"(anonymous 8):354":0,"(anonymous 9):369":0,"(anonymous 10):385":0,"(anonymous 11):395":0,"(anonymous 13):409":0,"(anonymous 12):408":0,"(anonymous 14):426":0,"(anonymous 15):439":0,"(anonymous 16):447":0,"(anonymous 17):460":0,"_bindViewUI:296":0,"getModelToJSON:478":0,"destructor:487":0,"isMicroTemplate:520":0,"_modelRenderer:527":0,"_modelRenderer:534":0,"_setTemplateRenderer:516":0,"_viewRenderer:552":0,"(anonymous 18):597":0,"_clearEventhandlers:594":0,"_setModel:612":0,"validator:683":0,"validator:697":0,"validator:713":0,"validator:732":0,"validator:756":0,"getter:757":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-itsaviewmodel/gallery-itsaviewmodel.js"].coveredLines = 169;
_yuitest_coverage["build/gallery-itsaviewmodel/gallery-itsaviewmodel.js"].coveredFunctions = 43;
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 1);
YUI.add('gallery-itsaviewmodel', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 3);
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

_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 42);
var Lang = Y.Lang,
    YArray = Y.Array,
    YTemplateMicro = Y.Template.Micro,
    MODELVIEW_STYLED = 'itsa-modelview-styled',
    MODELVIEW_STYLED_FORM = 'yui3-form',
    FORMELEMENT_CLASS = 'yui3-itsaformelement',
    ITSAFORMELEMENT_CHANGED_CLASS = FORMELEMENT_CLASS + '-changed';


//===============================================================================================
//
// First: extend Y.Node with the method cleanup()
//
//===============================================================================================

_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 57);
function ITSANodeCleanup() {}

_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 59);
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
        _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "cleanupWidgets", 70);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 71);
var node = this,
            YWidget = Y.Widget;

        _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 74);
if (YWidget) {
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 75);
node.all('.yui3-widget').each(
                function(widgetNode) {
                    _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "(anonymous 2)", 76);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 77);
if (node.one('#'+widgetNode.get('id'))) {
                        _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 78);
var widgetInstance = YWidget.getByNode(widgetNode);
                        _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 79);
if (widgetInstance) {
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 80);
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
        _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "cleanup", 96);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 97);
var node = this;

        _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 99);
node.cleanupWidgets(true);
        _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 100);
node.empty();
    }

}, true);

_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 105);
Y.Node.ITSANodeCleanup = ITSANodeCleanup;

_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 107);
Y.Base.mix(Y.Node, [ITSANodeCleanup]);

//===============================================================================================
//
// Next we create the widget
//
//===============================================================================================

_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 115);
Y.ITSAViewModel = Y.Base.create('itsaviewmodel', Y.Widget, [], {




        /**
         * @method initializer
         * @protected
        */
        initializer : function() {
            _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "initializer", 124);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 125);
var instance = this;
            /**
             * Internally generated Y.View-instance that has its 'container' bound to the 'contentBox'
             * @property view
             * @type Y.View
            */
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 131);
instance.view = null;

            /**
             * Internal flag that tells wheter a Template.Micro is being used.
             * @property _isMicroTemplate
             * @private
             * @default null
             * @type Boolean
            */
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 140);
instance._isMicroTemplate = null;

            /**
             * Internal Function that is generated to automaticly make use of the template.
             * The function has the structure of: _modelRenderer = function(model) {return {String}};
             * @property _modelRenderer
             * @private
             * @default function(model) {return ''};
             * @type Function
            */
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 150);
instance._modelRenderer = null;

            /**
             * Internal list of all eventhandlers bound by this widget.
             * @property _eventhandlers
             * @private
             * @default []
             * @type Array
            */
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 159);
instance._eventhandlers = [];

            /**
             * Backup of the original state of the attribute-values. Needed to make reset posible in case
             * Y.Plugin.ITSAEditModel is plugged in
             *
             * @property _initialEditAttrs
             * @private
             * @default null
             * @type Object
            */
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 170);
instance._initialEditAttrs = null;

            /**
             * Internal template to be used when 'model' is no model but just clear text.
             *
             * @property _textTemplate
             * @private
             * @default null
             * @type String
            */
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 180);
instance._textTemplate = null;
        },

       /**
         * Overruled renderer-method, to make sure rendering is done after asynchronious initialisation.
         *
         * @method renderer
         * @protected
        */
        renderer : function() {
            _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "renderer", 189);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 190);
var instance = this,
                boundingBox = instance.get('boundingBox'),
                model = instance.get('model'),
                modelEditable = instance.get('modelEditable'),
                itsaeditmodel = (modelEditable && model.itsaeditmodel),
                panelwidgetbd = boundingBox.one('.yui3-widget-bd');

            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 197);
if ((itsaeditmodel || panelwidgetbd) && !boundingBox.itsatabkeymanager) {
                _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 198);
Y.use('gallery-itsatabkeymanager', function(Y) {
                    _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "(anonymous 3)", 198);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 199);
boundingBox.plug(Y.Plugin.ITSATabKeyManager);
                    _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 200);
instance._renderFurther(boundingBox, model, itsaeditmodel);
                });
            }
            else {
                _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 204);
instance._renderFurther(boundingBox, model, itsaeditmodel);
            }
        },

        /**
         * More renderer, but we are always sure itsatabkeymanager is loaded (when needed)
         *
         * @method renderFurther
         * @param boundingBox {Y.Node}
         * @param model {Y.Model}
         * @param itsaeditmodel {Y.Plugin.ITSAEditModel}
         * @private
         * @protected
        */
        _renderFurther : function(boundingBox, model, itsaeditmodel) {
            _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "_renderFurther", 218);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 219);
var instance = this,
                events = instance.get('events'),
                template = itsaeditmodel ? model.itsaeditmodel.get('template') : instance.get('template'),
                styled = instance.get('styled'),
                view;

            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 225);
if (styled) {
                _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 226);
boundingBox.addClass(MODELVIEW_STYLED).addClass(MODELVIEW_STYLED_FORM);
            }
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 228);
instance._widgetRenderer();
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 229);
view = instance.view = new Y.View({
                container: instance._getViewContainer(),
                model: model
            });
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 233);
view.events = events;
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 234);
view.template = template;
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 235);
instance._setTemplateRenderer(template, itsaeditmodel);
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 236);
view.render = Y.rbind(instance._viewRenderer, instance);
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 237);
if (model && model.addTarget) {
                _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 238);
model.addTarget(view);
            }
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 240);
instance._bindViewUI();
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 241);
instance.view.render();
        },

        /**
         * returns the view-container, which equals this.get('contentBox')
         *
         * @method _getViewContainer
         * @private
        */
        _getViewContainer : function() {
            _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "_getViewContainer", 250);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 251);
return this.get('contentBox');
        },

        /**
         * Calls the original Y.Widget.renderer
         *
         * @method _widgetRenderer
         * @private
         * @protected
        */
        _widgetRenderer : function() {
            _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "_widgetRenderer", 261);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 262);
var instance = this;

            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 264);
instance.constructor.superclass.renderer.apply(instance);
        },

        /**
         * Sets up DOM and CustomEvent listeners for the widget.
         *
         * @method bindUI
         * @protected
         */
        bindUI: function() {
            // Only declare listeners here that have no relationship with this.view, because this.view does not exists here.
            _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "bindUI", 273);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 275);
var instance = this,
                eventhandlers = instance._eventhandlers,
                boundingBox = instance.get('boundingBox');

            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 279);
eventhandlers.push(
                instance.after(
                    'styledChange',
                    function(e) {
                        _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "(anonymous 4)", 282);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 283);
boundingBox.toggleClass(MODELVIEW_STYLED, e.newVal).toggleClass(MODELVIEW_STYLED_FORM, e.newVal);
                    }
                )
            );
        },

        /**
         * Sets up extra DOM and CustomEvent listeners for the widget which are bound to this.view
         *
         * @method _bindViewUI
         * @private
         * @protected
         */
        _bindViewUI: function() {
            // Only declare listeners here that have relationship with this.view, because this.view only exists from this point.
            _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "_bindViewUI", 296);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 298);
var instance = this,
                boundingBox = instance.get('boundingBox'),
                model = instance.get('model'),
                eventhandlers = instance._eventhandlers,
                itsatabkeymanager = boundingBox.itsatabkeymanager,
                view = instance.view;

            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 305);
eventhandlers.push(
                instance.after(
                    'modelChange',
                    function(e) {
                        _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "(anonymous 5)", 308);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 309);
var prevVal = e.prevVal,
                            newVal = e.newVal;
                        _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 311);
if (prevVal && prevVal.removeTarget) {
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 312);
prevVal.removeTarget(view);
                        }
                        _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 314);
if (newVal && newVal.addTarget) {
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 315);
newVal.addTarget(view);
                        }
                        _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 317);
view.set('model', newVal);
                        _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 318);
model = instance.get('model');
                        _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 319);
view.render();
                    }
                )
            );
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 323);
eventhandlers.push(
                instance.after(
                    'templateChange',
                    function(e) {
                        _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "(anonymous 6)", 326);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 327);
var newTemplate = e.newVal,
                            modelEditable = instance.get('modelEditable');
                        _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 329);
if (!modelEditable || (model && !model.itsaeditmodel)) {
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 330);
view.template = newTemplate;
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 331);
instance._setTemplateRenderer(newTemplate, false);
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 332);
view.render();
                        }
                    }
                )
            );
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 337);
eventhandlers.push(
                view.after(
                    'itsaeditmodel:templateChange',
                    function(e) {
                        _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "(anonymous 7)", 340);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 341);
var newTemplate = e.newVal,
                            modelEditable = instance.get('modelEditable');
                        _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 343);
if (modelEditable && model && model.itsaeditmodel) {
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 344);
view.template = newTemplate;
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 345);
instance._setTemplateRenderer(newTemplate, true);
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 346);
view.render();
                        }
                    }
                )
            );
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 351);
eventhandlers.push(
                view.after(
                    'model:resetclick',
                    function(e) {
                        _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "(anonymous 8)", 354);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 355);
var model = e.target, // NOT e.currentTarget: that is the (scroll)View-instance (?)
                            options = {fromEditModel: true}; // set Attribute with option: '{fromEditModel: true}'
                                                             // --> now the view knows it must not re-render.
                        _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 358);
model.setAttrs(instance._initialEditAttrs, options);
                        _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 359);
view.render();
                        _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 360);
if (itsatabkeymanager) {
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 361);
itsatabkeymanager.focusInitialItem();
                        }
                    }
                )
            );
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 366);
eventhandlers.push(
                instance.after(
                    'modelEditableChange',
                    function(e) {
                        _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "(anonymous 9)", 369);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 370);
var newEditable = e.newVal,
                            template;
                        // if model.itsaeditmodel exists, then we need to rerender
                        _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 373);
if (model && model.itsaeditmodel) {
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 374);
template = newEditable ? model.itsaeditmodel.get('template') : instance.get('template');
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 375);
view.template = template;
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 376);
instance._setTemplateRenderer(template, newEditable);
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 377);
view.render();
                        }
                    }
                )
            );
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 382);
eventhandlers.push(
                instance.after(
                    'itsaeditmodel:editmodelConfigAttrsChange',
                    function() {
                        _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "(anonymous 10)", 385);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 386);
if (model.itsaeditmodel && instance.get('modelEditable')) {
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 387);
view.render();
                        }
                    }
                )
            );
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 392);
eventhandlers.push(
                view.after(
                    'itsaeditmodel:destroy',
                    function() {
                        _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "(anonymous 11)", 395);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 396);
if (instance.get('modelEditable')) {
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 397);
var template = instance.get('template');
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 398);
view.template = template;
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 399);
instance._setTemplateRenderer(template, false);
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 400);
view.render();
                        }
                    }
                )
            );
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 405);
eventhandlers.push(
                view.after(
                    'itsaeditmodel:pluggedin',
                    function() {
                        _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "(anonymous 12)", 408);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 409);
Y.use('gallery-itsatabkeymanager', function(Y) {
                            _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "(anonymous 13)", 409);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 410);
if (!boundingBox.itsatabkeymanager) {
                                _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 411);
boundingBox.plug(Y.Plugin.ITSATabKeyManager);
                            }
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 413);
if (instance.get('modelEditable')) {
                                _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 414);
var template = model.itsaeditmodel.get('template');
                                _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 415);
view.template = template;
                                _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 416);
instance._setTemplateRenderer(template, true);
                                _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 417);
view.render();
                            }
                        });
                    }
                )
            );
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 423);
eventhandlers.push(
                view.after(
                    'itsaeditmodel:focusnext',
                    function() {
                        _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "(anonymous 14)", 426);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 427);
var itsatabkeymanager = boundingBox.itsatabkeymanager;
                        _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 428);
if (itsatabkeymanager && instance.get('focused')) {
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 429);
itsatabkeymanager.next();
                        }
                        else {
                        }
                    }
                )
            );
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 436);
eventhandlers.push(
                instance.after(
                    'eventsChange',
                    function(e) {
                        _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "(anonymous 15)", 439);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 440);
view.events = e.newVal;
                    }
                )
            );
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 444);
eventhandlers.push(
                view.after(
                    'model:change',
                    function() {
                        _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "(anonymous 16)", 447);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 448);
if (!instance.get('modelEditable') || !model.itsaeditmodel) {
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 449);
view.render(false);
                        }
                        else {
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 452);
view.get('container').all('.'+ITSAFORMELEMENT_CHANGED_CLASS).removeClass(ITSAFORMELEMENT_CHANGED_CLASS);
                        }
                    }
                )
            );
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 457);
eventhandlers.push(
                view.after(
                    'model:destroy',
                    function() {
                        _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "(anonymous 17)", 460);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 461);
view.render(true);
                    }
                )
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
            _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "getModelToJSON", 478);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 479);
return (model.get && (Lang.type(model.get) === 'function')) ? model.toJSON() : model;
        },

        /**
         * Cleans up bindings
         * @method destructor
         * @protected
        */
        destructor: function() {
            _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "destructor", 487);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 488);
var instance = this,
                boundingBox = instance.get('boundingBox');

            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 491);
instance._clearEventhandlers();
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 492);
instance.view.destroy();
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 493);
if (boundingBox.hasPlugin('itsatabkeymanager')) {
                _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 494);
boundingBox.unplug('itsatabkeymanager');
            }
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
         * @method _viewRenderer
         * @param template {String} template to be rendered
         * @param editTemplate {Boolean} whether or not the template is an 'editTemplate' from Y.Plugin.ITSAEditModel
         * @private
         * @chainable
         * @since 0.1
         *
        */
        _setTemplateRenderer : function(template, editTemplate) {
            _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "_setTemplateRenderer", 516);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 517);
var instance = this,
                isMicroTemplate, ismicrotemplate, compiledModelEngine;

            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 520);
isMicroTemplate = function() {
                _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "isMicroTemplate", 520);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 521);
var microTemplateRegExp = /<%(.+)%>/;
                _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 522);
return microTemplateRegExp.test(template);
            };
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 524);
ismicrotemplate = instance._isMicroTemplate = isMicroTemplate();
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 525);
if (ismicrotemplate) {
                _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 526);
compiledModelEngine = YTemplateMicro.compile(template);
                _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 527);
instance._modelRenderer = function(model) {
                    _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "_modelRenderer", 527);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 528);
var jsondata = editTemplate ? model.itsaeditmodel.toJSON(model.itsaeditmodel.get('editmodelConfigAttrs'))
                                   : instance.getModelToJSON(model);
                    _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 530);
return compiledModelEngine(jsondata);
                };
            }
            else {
                _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 534);
instance._modelRenderer = function(model) {
                    _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "_modelRenderer", 534);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 535);
var jsondata = editTemplate ? model.itsaeditmodel.toJSON(model.itsaeditmodel.get('editmodelConfigAttrs'))
                                   : instance.getModelToJSON(model);
                    _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 537);
return Lang.sub(template, jsondata);
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
            _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "_viewRenderer", 552);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 553);
var instance = this,
                boundingBox = instance.get('boundingBox'),
                itsatabkeymanager = boundingBox.itsatabkeymanager,
                view = instance.view,
                container = view.get('container'),
                model = view.get('model'),
                editMode = model && model.itsaeditmodel && instance.get('modelEditable'),
                itsaDateTimePicker = Y.Global.ItsaDateTimePicker,
                html = (clear || !model) ? '' : instance._modelRenderer(model);

            // Render this view's HTML into the container element.
            // Because Y.Node.setHTML DOES NOT destroy its nodes (!) but only remove(), we destroy them ourselves first
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 565);
if (editMode || instance._isMicroTemplate) {
                _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 566);
if (editMode) {
                    _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 567);
instance._initialEditAttrs = model.getAttrs();
                }
                _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 569);
container.cleanupWidgets(true);
            }

            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 572);
container.setHTML(html);
            // If Y.Plugin.ITSATabKeyManager is plugged in, then refocus to the first item
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 574);
if (itsatabkeymanager) {
                _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 575);
itsatabkeymanager.refresh(boundingBox);
                _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 576);
if (instance.get('focused')) {
                    _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 577);
itsatabkeymanager.focusInitialItem();
                }
            }
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 580);
if (itsaDateTimePicker && itsaDateTimePicker.panel.get('visible')) {
                _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 581);
itsaDateTimePicker.hide(true);
            }
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 583);
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
            _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "_clearEventhandlers", 594);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 595);
YArray.each(
                this._eventhandlers,
                function(item){
                    _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "(anonymous 18)", 597);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 598);
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
            _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "_setModel", 612);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 613);
var instance = this,
                view = instance.view,
                templatechange, modelEditable, newTemplate;
            // in case model is a string --> not a real model is set: we just need to render clear text.
            // to achieve this, we create a new model-object with no properties and we define this._textTemplate
            // which can be used as the template (= text without properties)
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 619);
if (typeof v === 'string') {
                _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 620);
templatechange = !instance._textTemplate;
                _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 621);
instance._textTemplate = v;
                _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 622);
v = {};
            }
            else {
                _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 625);
templatechange = instance._textTemplate;
                _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 626);
instance._textTemplate = null;
            }
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 628);
if (templatechange && view) {
                _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 629);
modelEditable = instance.get('modelEditable');
                _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 630);
if (!modelEditable || (v && !v.itsaeditmodel)) {
                    _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 631);
newTemplate = instance.get('template');
                    _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 632);
view.template = newTemplate;
                    _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 633);
instance._setTemplateRenderer(newTemplate, false);
                }
            }
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 636);
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
                validator: function(v){ _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "validator", 683);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 683);
return Lang.isObject(v);}
            },

            /**
             * Makes the View to render the editable-version of the Model. Only when the Model has <b>Y.Plugin.ITSAEditModel</b> plugged in.
             *
             * @attribute modelEditable
             * @type {Boolean}
             * @default false
             * @since 0.1
             */
            modelEditable: {
                value: false,
                lazyAdd: false,
                validator: function(v){
                    _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "validator", 697);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 698);
return Lang.isBoolean(v);
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
                validator: function(v){ _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "validator", 713);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 713);
return ((v===null) || Lang.isObject(v) || (typeof v === 'string')
                                                || (v.get && (typeof v.get === 'function') && v.get('clientId'))); },
                setter: '_setModel'
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
                    _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "validator", 732);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 733);
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
                validator: function(v){ _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "validator", 756);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 756);
return Lang.isString(v); },
                getter: function(v) {
                    // Because _textTemplate might exists in case of clear text instead of a model, we need to return the right template.
                    _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "getter", 757);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 759);
return this._textTemplate || v;
                }
            }

        }
    }
);

}, '@VERSION@', {
    "requires": [
        "base-build",
        "widget",
        "view",
        "template-micro",
        "model",
        "pluginhost-base"
    ],
    "skinnable": true
});
