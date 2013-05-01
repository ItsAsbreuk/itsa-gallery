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
_yuitest_coverage["build/gallery-itsaviewmodel/gallery-itsaviewmodel.js"].code=["YUI.add('gallery-itsaviewmodel', function (Y, NAME) {","","'use strict';","","/**"," *"," * Widget ITSAViewModel"," *"," *"," * This widget renderes Y.Model-instances -or just plain objects- inside the widgets contentBox."," * It uses Y.View under the hood, where Y.View.container is bound to the 'contentBox'. The render-method must be defined"," * by the widget's attribute 'template'. The Model (or object) must be set through the attribute 'model'."," *"," * Events can be set through the attribute 'events' and follow the same pattern as Y.View does. As a matter of fact, all attributes"," * (template, model, events) are passed through to the widgets Y.View instance (which has the property 'view')."," *"," *"," * Using this widget is great to render Model on the page, where the widget keeps synced with the model. Whenever a new Model-instance"," * is attached to the widget, or another template is used, the wodget will be re-rendered automaticly."," *"," * Attaching Y.Model-instances or objects?"," * Both can be attached. Whenever widgetattribute change, the widget will be re-rendered is needed (template- or model-attribute). This also"," * counts for attached objects. However, changes inside an object itself (updated property-value) cannot be caught by the widget, so you need"," * to call syncUI() yourself after an object-change. Y.Model-instances -on the other hand- do fire a *:change-event which is caught by the widget."," * This makes the widget re-render after a Model-instance changes some of its attributes."," *"," *"," * By default, the widget comes with its own style. You can disable this by setting the attribute 'styled' to false."," *"," * @module gallery-itsaviewmodel"," * @extends Widget"," * @class ITSAViewModel"," * @constructor"," * @since 0.1"," *"," * <i>Copyright (c) 2013 Marco Asbreuk - http://itsasbreuk.nl</i>"," * YUI BSD License - http://developer.yahoo.com/yui/license.html"," *","*/","","var Lang = Y.Lang,","    YArray = Y.Array,","    YTemplateMicro = Y.Template.Micro,","    MODELVIEW_STYLED = 'itsa-modelview-styled',","    MODELVIEW_STYLED_FORM = 'yui3-form',","    FORMELEMENT_CLASS = 'yui3-itsaformelement',","    ITSAFORMELEMENT_CHANGED_CLASS = FORMELEMENT_CLASS + '-changed';","","","//===============================================================================================","//","// First: extend Y.Node with the method cleanup()","//","//===============================================================================================","","function ITSANodeCleanup() {}","","Y.mix(ITSANodeCleanup.prototype, {","","    //","    // Destroys all widgets inside the node by calling widget.destroy(true);","    //","    // @method cleanup","    // @param destroyAllNodes {Boolean} If true, all nodes contained within the Widget are removed and destroyed.","    //                        Defaults to false due to potentially high run-time cost.","    // @since 0.1","    //","    //","    cleanupWidgets: function(destroyAllNodes) {","        var node = this,","            YWidget = Y.Widget;","","        if (YWidget) {","            node.all('.yui3-widget').each(","                function(widgetNode) {","                    if (node.one('#'+widgetNode.get('id'))) {","                        var widgetInstance = YWidget.getByNode(widgetNode);","                        if (widgetInstance) {","                            widgetInstance.destroy(destroyAllNodes);","                        }","                    }","                }","            );","        }","    },","","    //","    // Cleansup the node by calling node.empty(), as well as destroying all widgets that lie","    // within the node by calling widget.destroy(true);","    //","    // @method cleanup","    // @since 0.1","    //","    //","    cleanup: function() {","        var node = this;","","        node.cleanupWidgets(true);","        node.empty();","    }","","}, true);","","Y.Node.ITSANodeCleanup = ITSANodeCleanup;","","Y.Base.mix(Y.Node, [ITSANodeCleanup]);","","//===============================================================================================","//","// Next we create the widget","//","//===============================================================================================","","Y.ITSAViewModel = Y.Base.create('itsaviewmodel', Y.Widget, [], {","","","","","        /**","         * @method initializer","         * @protected","        */","        initializer : function() {","            var instance = this;","            /**","             * Internally generated Y.View-instance that has its 'container' bound to the 'contentBox'","             * @property view","             * @type Y.View","            */","            instance.view = null;","","            /**","             * Internal flag that tells wheter a Template.Micro is being used.","             * @property _isMicroTemplate","             * @private","             * @default null","             * @type Boolean","            */","            instance._isMicroTemplate = null;","","            /**","             * Internal Function that is generated to automaticly make use of the template.","             * The function has the structure of: _modelRenderer = function(model) {return {String}};","             * @property _modelRenderer","             * @private","             * @default function(model) {return ''};","             * @type Function","            */","            instance._modelRenderer = null;","","            /**","             * Internal list of all eventhandlers bound by this widget.","             * @property _eventhandlers","             * @private","             * @default []","             * @type Array","            */","            instance._eventhandlers = [];","","            /**","             * Backup of the original state of the attribute-values. Needed to make reset posible in case","             * Y.Plugin.ITSAEditModel is plugged in","             *","             * @property _initialEditAttrs","             * @private","             * @default null","             * @type Object","            */","            instance._initialEditAttrs = null;","        },","","       /**","         * Overruled renderer-method, to make sure rendering is done after asynchronious initialisation.","         *","         * @method renderer","         * @protected","        */","        renderer : function() {","            var instance = this,","                boundingBox = instance.get('boundingBox'),","                model = instance.get('model'),","                modelEditable = instance.get('modelEditable'),","                itsaeditmodel = (modelEditable && model.itsaeditmodel),","                panelwidgetbd = boundingBox.one('.yui3-widget-bd');","","            if ((itsaeditmodel || panelwidgetbd) && !boundingBox.itsatabkeymanager) {","                Y.use('gallery-itsatabkeymanager', function(Y) {","                    boundingBox.plug(Y.Plugin.ITSATabKeyManager);","                    instance._renderFurther(boundingBox, model, itsaeditmodel);","                });","            }","            else {","                instance._renderFurther(boundingBox, model, itsaeditmodel);","            }","        },","","        /**","         * More renderer, but we are always sure itsatabkeymanager is loaded (when needed)","         *","         * @method renderFurther","         * @param boundingBox {Y.Node}","         * @param model {Y.Model}","         * @param itsaeditmodel {Y.Plugin.ITSAEditModel}","         * @private","         * @protected","        */","        _renderFurther : function(boundingBox, model, itsaeditmodel) {","            var instance = this,","                events = instance.get('events'),","                template = itsaeditmodel ? model.itsaeditmodel.get('template') : instance.get('template'),","                styled = instance.get('styled'),","                view;","","            if (styled) {","                boundingBox.addClass(MODELVIEW_STYLED).addClass(MODELVIEW_STYLED_FORM);","            }","            instance._widgetRenderer();","            view = instance.view = new Y.View({","                container: instance._getViewContainer(),","                model: model","            });","            view.events = events;","            view.template = template;","            instance._setTemplateRenderer(template, itsaeditmodel);","            view.render = Y.rbind(instance._viewRenderer, instance);","            if (model && model.addTarget) {","                model.addTarget(view);","            }","            instance._bindViewUI();","            instance.view.render();","        },","","        /**","         * returns the view-container, which equals this.get('contentBox')","         *","         * @method _getViewContainer","         * @private","        */","        _getViewContainer : function() {","            return this.get('contentBox');","        },","","        /**","         * Calls the original Y.Widget.renderer","         *","         * @method _widgetRenderer","         * @private","         * @protected","        */","        _widgetRenderer : function() {","            var instance = this;","","            instance.constructor.superclass.renderer.apply(instance);","        },","","        /**","         * Sets up DOM and CustomEvent listeners for the widget.","         *","         * @method bindUI","         * @protected","         */","        bindUI: function() {","            // Only declare listeners here that have no relationship with this.view, because this.view does not exists here.","            var instance = this,","                eventhandlers = instance._eventhandlers,","                boundingBox = instance.get('boundingBox');","","            eventhandlers.push(","                instance.after(","                    'styledChange',","                    function(e) {","                        boundingBox.toggleClass(MODELVIEW_STYLED, e.newVal).toggleClass(MODELVIEW_STYLED_FORM, e.newVal);","                    }","                )","            );","        },","","        /**","         * Sets up extra DOM and CustomEvent listeners for the widget which are bound to this.view","         *","         * @method _bindViewUI","         * @private","         * @protected","         */","        _bindViewUI: function() {","            // Only declare listeners here that have relationship with this.view, because this.view only exists from this point.","            var instance = this,","                boundingBox = instance.get('boundingBox'),","                model = instance.get('model'),","                eventhandlers = instance._eventhandlers,","                itsatabkeymanager = boundingBox.itsatabkeymanager,","                view = instance.view;","","            eventhandlers.push(","                instance.after(","                    'modelChange',","                    function(e) {","                        var prevVal = e.prevVal,","                            newVal = e.newVal;","                        if (prevVal && prevVal.removeTarget) {","                            prevVal.removeTarget(view);","                        }","                        if (newVal && newVal.addTarget) {","                            newVal.addTarget(view);","                        }","                        view.set('model', newVal);","                        model = instance.get('model');","                        view.render();","                    }","                )","            );","            eventhandlers.push(","                instance.after(","                    'templateChange',","                    function(e) {","                        var newTemplate = e.newVal,","                            modelEditable = instance.get('modelEditable');","                        if (!modelEditable || !model.itsaeditmodel) {","                            view.template = newTemplate;","                            instance._setTemplateRenderer(newTemplate, false);","                            view.render();","                        }","                    }","                )","            );","            eventhandlers.push(","                view.after(","                    'itsaeditmodel:templateChange',","                    function(e) {","                        var newTemplate = e.newVal,","                            modelEditable = instance.get('modelEditable');","                        if (modelEditable && model.itsaeditmodel) {","                            view.template = newTemplate;","                            instance._setTemplateRenderer(newTemplate, true);","                            view.render();","                        }","                    }","                )","            );","            eventhandlers.push(","                view.after(","                    'model:resetclick',","                    function(e) {","                        var model = e.target, // NOT e.currentTarget: that is the (scroll)View-instance (?)","                            options = {fromEditModel: true}; // set Attribute with option: '{fromEditModel: true}'","                                                             // --> now the view knows it must not re-render.","                        model.setAttrs(instance._initialEditAttrs, options);","                        view.render();","                        if (itsatabkeymanager) {","                            itsatabkeymanager.focusInitialItem();","                        }","                    }","                )","            );","            eventhandlers.push(","                instance.after(","                    'modelEditableChange',","                    function(e) {","                        var newEditable = e.newVal,","                            template;","                        // if model.itsaeditmodel exists, then we need to rerender","                        if (model.itsaeditmodel) {","                            template = newEditable ? model.itsaeditmodel.get('template') : instance.get('template');","                            view.template = template;","                            instance._setTemplateRenderer(template, newEditable);","                            view.render();","                        }","                    }","                )","            );","            eventhandlers.push(","                instance.after(","                    'itsaeditmodel:editmodelConfigAttrsChange',","                    function() {","                        if (model.itsaeditmodel && instance.get('modelEditable')) {","                            view.render();","                        }","                    }","                )","            );","            eventhandlers.push(","                view.after(","                    'itsaeditmodel:destroy',","                    function() {","                        if (instance.get('modelEditable')) {","                            var template = instance.get('template');","                            view.template = template;","                            instance._setTemplateRenderer(template, false);","                            view.render();","                        }","                    }","                )","            );","            eventhandlers.push(","                view.after(","                    'itsaeditmodel:pluggedin',","                    function() {","                        Y.use('gallery-itsatabkeymanager', function(Y) {","                            if (!boundingBox.itsatabkeymanager) {","                                boundingBox.plug(Y.Plugin.ITSATabKeyManager);","                            }","                            if (instance.get('modelEditable')) {","                                var template = model.itsaeditmodel.get('template');","                                view.template = template;","                                instance._setTemplateRenderer(template, true);","                                view.render();","                            }","                        });","                    }","                )","            );","            eventhandlers.push(","                view.after(","                    'itsaeditmodel:focusnext',","                    function() {","                        var itsatabkeymanager = boundingBox.itsatabkeymanager;","                        if (itsatabkeymanager && instance.get('focused')) {","                            itsatabkeymanager.next();","                        }","                        else {","                        }","                    }","                )","            );","            eventhandlers.push(","                instance.after(","                    'eventsChange',","                    function(e) {","                        view.events = e.newVal;","                    }","                )","            );","            eventhandlers.push(","                view.after(","                    'model:change',","                    function() {","                        if (!instance.get('modelEditable') || !model.itsaeditmodel) {","                            view.render(false);","                        }","                        else {","                            view.get('container').all('.'+ITSAFORMELEMENT_CHANGED_CLASS).removeClass(ITSAFORMELEMENT_CHANGED_CLASS);","                        }","                    }","                )","            );","            eventhandlers.push(","                view.after(","                    'model:destroy',","                    function() {","                        view.render(true);","                    }","                )","            );","        },","","        /**","         * Returns the Model as an object. Regardless whether it is a Model-instance, or an item of a LazyModelList","         * which might be an Object or a Model. Caution: If it is a Model-instance, than you get a Clone. If not","         * -in case of an object from a LazyModelList- than you get the reference to the original object.","         *","         * @method getModelToJSON","         * @param {Y.Model} model Model or Object","         * @return {Object} Object or model.toJSON()","         * @since 0.1","         *","        */","        getModelToJSON : function(model) {","            return (model.get && (Lang.type(model.get) === 'function')) ? model.toJSON() : model;","        },","","        /**","         * Cleans up bindings","         * @method destructor","         * @protected","        */","        destructor: function() {","            var instance = this,","                boundingBox = instance.get('boundingBox');","","            instance._clearEventhandlers();","            instance.view.destroy();","            if (boundingBox.hasPlugin('itsatabkeymanager')) {","                boundingBox.unplug('itsatabkeymanager');","            }","        },","","        //===============================================================================================","        // private methods","        //===============================================================================================","","        /**","         * Function-factory that binds a function to the property '_modelRenderer'. '_modelRenderer' will be defined like","         * _modelRenderer = function(model) {return {String}};","         * which means: it will return a rendered String that is modified by the attribute 'template'. The rendering","         * is done either by Y.Lang.sub or by Y.Template.Micro, depending on the value of 'template'.","         *","         * @method _viewRenderer","         * @param template {String} template to be rendered","         * @param editTemplate {Boolean} whether or not the template is an 'editTemplate' from Y.Plugin.ITSAEditModel","         * @private","         * @chainable","         * @since 0.1","         *","        */","        _setTemplateRenderer : function(template, editTemplate) {","            var instance = this,","                isMicroTemplate, ismicrotemplate, compiledModelEngine;","","            isMicroTemplate = function() {","                var microTemplateRegExp = /<%(.+)%>/;","                return microTemplateRegExp.test(template);","            };","            ismicrotemplate = instance._isMicroTemplate = isMicroTemplate();","            if (ismicrotemplate) {","                compiledModelEngine = YTemplateMicro.compile(template);","                instance._modelRenderer = function(model) {","                    var jsondata = editTemplate ? model.itsaeditmodel.toJSON(model.itsaeditmodel.get('editmodelConfigAttrs'))","                                   : instance.getModelToJSON(model);","                    return compiledModelEngine(jsondata);","                };","            }","            else {","                instance._modelRenderer = function(model) {","                    var jsondata = editTemplate ? model.itsaeditmodel.toJSON(model.itsaeditmodel.get('editmodelConfigAttrs'))","                                   : instance.getModelToJSON(model);","                    return Lang.sub(template, jsondata);","                };","            }","        },","","        /**","         * Method that is responsible for rendering the Model into the view.","         *","         * @method _viewRenderer","         * @param {Boolean} [clear] whether to clear the view. normally you don't want this: leaving empty means the Model is drawn.","         * @private","         * @chainable","         * @since 0.1","         *","        */","        _viewRenderer : function (clear) {","            var instance = this,","                boundingBox = instance.get('boundingBox'),","                itsatabkeymanager = boundingBox.itsatabkeymanager,","                view = instance.view,","                container = view.get('container'),","                model = view.get('model'),","                editMode = model.itsaeditmodel && instance.get('modelEditable'),","                itsaDateTimePicker = Y.Global.ItsaDateTimePicker,","                html = clear ? '' : instance._modelRenderer(model);","","            // Render this view's HTML into the container element.","            // Because Y.Node.setHTML DOES NOT destroy its nodes (!) but only remove(), we destroy them ourselves first","            if (editMode || instance._isMicroTemplate) {","                if (editMode) {","                    instance._initialEditAttrs = model.getAttrs();","                }","                container.cleanupWidgets(true);","            }","","            container.setHTML(html);","            // If Y.Plugin.ITSATabKeyManager is plugged in, then refocus to the first item","            if (itsatabkeymanager) {","                itsatabkeymanager.refresh(boundingBox);","                if (instance.get('focused')) {","                    itsatabkeymanager.focusInitialItem();","                }","            }","            if (itsaDateTimePicker && itsaDateTimePicker.panel.get('visible')) {","                itsaDateTimePicker.hide(true);","            }","            return instance;","        },","","        /**","         * Cleaning up all eventlisteners","         *","         * @method _clearEventhandlers","         * @private","         * @since 0.1","         *","        */","        _clearEventhandlers : function() {","            YArray.each(","                this._eventhandlers,","                function(item){","                    item.detach();","                }","            );","        }","","    }, {","        ATTRS : {","            /**","             * Hash of CSS selectors mapped to events to delegate to elements matching","             * those selectors.","             *","             * CSS selectors are relative to the `contentBox` element, which is in fact","             * the view-container. Events are attached to this container (contentBox), and","             * delegation is used so that subscribers are only notified of events that occur on","             * elements inside the container that match the specified selectors. This allows the","             * contentBox to be re-rendered as needed without losing event subscriptions.","             *","             * Event handlers can be specified either as functions or as strings that map","             * to function names. IN the latter case, you must declare the functions as part","             * of the 'view'-property (which is a Y.View instance).","             *","             * The `this` object in event handlers will refer to the 'view'-property (which is a","             * Y.View instance, created during initialisation of this widget. If you'd prefer `this`","             * to be something else, use `Y.bind()` to bind a custom `this` object.","             *","             * @example","             *     var viewModel = new Y.ViewITSAViewModel({","             *         events: {","             *             // Call `this.toggle()` whenever the element with the id","             *             // \"toggle-button\" is clicked.","             *             '#toggle-button': {click: 'toggle'},","             *","             *             // Call `this.hoverOn()` when the mouse moves over any element","             *             // with the \"hoverable\" class, and `this.hoverOff()` when the","             *             // mouse moves out of any element with the \"hoverable\" class.","             *             '.hoverable': {","             *                 mouseover: 'hoverOn',","             *                 mouseout : 'hoverOff'","             *             }","             *         }","             *     });","             *","             * @attribute events","             * @type {object}","             * @default {}","             * @since 0.1","             */","            events: {","                value: {},","                validator: function(v){ return Lang.isObject(v);}","            },","","            /**","             * Makes the View to render the editable-version of the Model. Only when the Model has <b>Y.Plugin.ITSAEditModel</b> plugged in.","             *","             * @attribute modelEditable","             * @type {Boolean}","             * @default false","             * @since 0.1","             */","            modelEditable: {","                value: false,","                lazyAdd: false,","                validator: function(v){","                    return Lang.isBoolean(v);","                }","            },","","            /**","             * The Y.Model that will be rendered in the view. May also be an Object, which is handy in case the source is an","             * item of a Y.LazyModelList","             *","             * @attribute model","             * @type {Y.Model|Object}","             * @default {}","             * @since 0.1","             */","            model: {","                value: null,","                validator: function(v){ return ((v instanceof Y.Model) || Lang.isObject(v) || (v===null)); }","            },","","           /**","            * Whether the View is styled using the css of this module.","            * In fact, just the classname 'itsa-modelview-styled' is added to the boundingBox","            * and the css-rules do all the rest. The developer may override these rules, or set this value to false","            * while creatiung their own css. In the latter case it is advisable to take a look at all the css-rules","            * that are supplied by this module.","            *","            * @default true","            * @attribute styled","            * @type {Boolean}","            * @since 0.1","            */","            styled: {","                value: true,","                validator:  function(v) {","                    return Lang.isBoolean(v);","                }","            },","","        /**","         * Template to render the Model. The attribute MUST be a template that can be processed by either <i>Y.Lang.sub or Y.Template.Micro</i>,","         * where Y.Lang.sub is more lightweight.","         *","         * <b>Example with Y.Lang.sub:</b> '{slices} slice(s) of {type} pie remaining. <button class=\"eat\">Eat a Slice!</button>'","         * <b>Example with Y.Template.Micro:</b>","         * '<%= data.slices %> slice(s) of <%= data.type %> pie remaining <button class=\"eat\">Eat a Slice!</button>'","         * <b>Example 2 with Y.Template.Micro:</b>","         * '<%= data.slices %> slice(s) of <%= data.type %> pie remaining<% if (data.slices>0) {%> <button class=\"eat\">Eat a Slice!</button><% } %>'","         *","         * <u>If you set this attribute after the view is rendered, the view will be re-rendered.</u>","         *","         * @attribute template","         * @type {String}","         * @default '{clientId}'","         * @since 0.1","         */","            template: {","                value: '{clientId}',","                validator: function(v){ return Lang.isString(v); }","            }","","        }","    }",");","","}, '@VERSION@', {","    \"requires\": [","        \"base-build\",","        \"widget\",","        \"view\",","        \"template-micro\",","        \"model\",","        \"pluginhost-base\"","    ],","    \"skinnable\": true","});"];
_yuitest_coverage["build/gallery-itsaviewmodel/gallery-itsaviewmodel.js"].lines = {"1":0,"3":0,"41":0,"56":0,"58":0,"70":0,"73":0,"74":0,"76":0,"77":0,"78":0,"79":0,"96":0,"98":0,"99":0,"104":0,"106":0,"114":0,"124":0,"130":0,"139":0,"149":0,"158":0,"169":0,"179":0,"186":0,"187":0,"188":0,"189":0,"193":0,"208":0,"214":0,"215":0,"217":0,"218":0,"222":0,"223":0,"224":0,"225":0,"226":0,"227":0,"229":0,"230":0,"240":0,"251":0,"253":0,"264":0,"268":0,"272":0,"287":0,"294":0,"298":0,"300":0,"301":0,"303":0,"304":0,"306":0,"307":0,"308":0,"312":0,"316":0,"318":0,"319":0,"320":0,"321":0,"326":0,"330":0,"332":0,"333":0,"334":0,"335":0,"340":0,"344":0,"347":0,"348":0,"349":0,"350":0,"355":0,"359":0,"362":0,"363":0,"364":0,"365":0,"366":0,"371":0,"375":0,"376":0,"381":0,"385":0,"386":0,"387":0,"388":0,"389":0,"394":0,"398":0,"399":0,"400":0,"402":0,"403":0,"404":0,"405":0,"406":0,"412":0,"416":0,"417":0,"418":0,"425":0,"429":0,"433":0,"437":0,"438":0,"441":0,"446":0,"450":0,"468":0,"477":0,"480":0,"481":0,"482":0,"483":0,"506":0,"509":0,"510":0,"511":0,"513":0,"514":0,"515":0,"516":0,"517":0,"519":0,"523":0,"524":0,"526":0,"542":0,"554":0,"555":0,"556":0,"558":0,"561":0,"563":0,"564":0,"565":0,"566":0,"569":0,"570":0,"572":0,"584":0,"587":0,"636":0,"651":0,"666":0,"684":0,"707":0};
_yuitest_coverage["build/gallery-itsaviewmodel/gallery-itsaviewmodel.js"].functions = {"ITSANodeCleanup:56":0,"(anonymous 2):75":0,"cleanupWidgets:69":0,"cleanup:95":0,"initializer:123":0,"(anonymous 3):187":0,"renderer:178":0,"_renderFurther:207":0,"_getViewContainer:239":0,"_widgetRenderer:250":0,"(anonymous 4):271":0,"bindUI:262":0,"(anonymous 5):297":0,"(anonymous 6):315":0,"(anonymous 7):329":0,"(anonymous 8):343":0,"(anonymous 9):358":0,"(anonymous 10):374":0,"(anonymous 11):384":0,"(anonymous 13):398":0,"(anonymous 12):397":0,"(anonymous 14):415":0,"(anonymous 15):428":0,"(anonymous 16):436":0,"(anonymous 17):449":0,"_bindViewUI:285":0,"getModelToJSON:467":0,"destructor:476":0,"isMicroTemplate:509":0,"_modelRenderer:516":0,"_modelRenderer:523":0,"_setTemplateRenderer:505":0,"_viewRenderer:541":0,"(anonymous 18):586":0,"_clearEventhandlers:583":0,"validator:636":0,"validator:650":0,"validator:666":0,"validator:683":0,"validator:707":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-itsaviewmodel/gallery-itsaviewmodel.js"].coveredLines = 153;
_yuitest_coverage["build/gallery-itsaviewmodel/gallery-itsaviewmodel.js"].coveredFunctions = 41;
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

_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 41);
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

_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 56);
function ITSANodeCleanup() {}

_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 58);
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
        _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "cleanupWidgets", 69);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 70);
var node = this,
            YWidget = Y.Widget;

        _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 73);
if (YWidget) {
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 74);
node.all('.yui3-widget').each(
                function(widgetNode) {
                    _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "(anonymous 2)", 75);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 76);
if (node.one('#'+widgetNode.get('id'))) {
                        _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 77);
var widgetInstance = YWidget.getByNode(widgetNode);
                        _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 78);
if (widgetInstance) {
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 79);
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
        _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "cleanup", 95);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 96);
var node = this;

        _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 98);
node.cleanupWidgets(true);
        _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 99);
node.empty();
    }

}, true);

_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 104);
Y.Node.ITSANodeCleanup = ITSANodeCleanup;

_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 106);
Y.Base.mix(Y.Node, [ITSANodeCleanup]);

//===============================================================================================
//
// Next we create the widget
//
//===============================================================================================

_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 114);
Y.ITSAViewModel = Y.Base.create('itsaviewmodel', Y.Widget, [], {




        /**
         * @method initializer
         * @protected
        */
        initializer : function() {
            _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "initializer", 123);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 124);
var instance = this;
            /**
             * Internally generated Y.View-instance that has its 'container' bound to the 'contentBox'
             * @property view
             * @type Y.View
            */
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 130);
instance.view = null;

            /**
             * Internal flag that tells wheter a Template.Micro is being used.
             * @property _isMicroTemplate
             * @private
             * @default null
             * @type Boolean
            */
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 139);
instance._isMicroTemplate = null;

            /**
             * Internal Function that is generated to automaticly make use of the template.
             * The function has the structure of: _modelRenderer = function(model) {return {String}};
             * @property _modelRenderer
             * @private
             * @default function(model) {return ''};
             * @type Function
            */
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 149);
instance._modelRenderer = null;

            /**
             * Internal list of all eventhandlers bound by this widget.
             * @property _eventhandlers
             * @private
             * @default []
             * @type Array
            */
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 158);
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
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 169);
instance._initialEditAttrs = null;
        },

       /**
         * Overruled renderer-method, to make sure rendering is done after asynchronious initialisation.
         *
         * @method renderer
         * @protected
        */
        renderer : function() {
            _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "renderer", 178);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 179);
var instance = this,
                boundingBox = instance.get('boundingBox'),
                model = instance.get('model'),
                modelEditable = instance.get('modelEditable'),
                itsaeditmodel = (modelEditable && model.itsaeditmodel),
                panelwidgetbd = boundingBox.one('.yui3-widget-bd');

            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 186);
if ((itsaeditmodel || panelwidgetbd) && !boundingBox.itsatabkeymanager) {
                _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 187);
Y.use('gallery-itsatabkeymanager', function(Y) {
                    _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "(anonymous 3)", 187);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 188);
boundingBox.plug(Y.Plugin.ITSATabKeyManager);
                    _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 189);
instance._renderFurther(boundingBox, model, itsaeditmodel);
                });
            }
            else {
                _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 193);
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
            _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "_renderFurther", 207);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 208);
var instance = this,
                events = instance.get('events'),
                template = itsaeditmodel ? model.itsaeditmodel.get('template') : instance.get('template'),
                styled = instance.get('styled'),
                view;

            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 214);
if (styled) {
                _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 215);
boundingBox.addClass(MODELVIEW_STYLED).addClass(MODELVIEW_STYLED_FORM);
            }
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 217);
instance._widgetRenderer();
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 218);
view = instance.view = new Y.View({
                container: instance._getViewContainer(),
                model: model
            });
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 222);
view.events = events;
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 223);
view.template = template;
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 224);
instance._setTemplateRenderer(template, itsaeditmodel);
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 225);
view.render = Y.rbind(instance._viewRenderer, instance);
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 226);
if (model && model.addTarget) {
                _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 227);
model.addTarget(view);
            }
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 229);
instance._bindViewUI();
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 230);
instance.view.render();
        },

        /**
         * returns the view-container, which equals this.get('contentBox')
         *
         * @method _getViewContainer
         * @private
        */
        _getViewContainer : function() {
            _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "_getViewContainer", 239);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 240);
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
            _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "_widgetRenderer", 250);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 251);
var instance = this;

            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 253);
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
            _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "bindUI", 262);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 264);
var instance = this,
                eventhandlers = instance._eventhandlers,
                boundingBox = instance.get('boundingBox');

            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 268);
eventhandlers.push(
                instance.after(
                    'styledChange',
                    function(e) {
                        _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "(anonymous 4)", 271);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 272);
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
            _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "_bindViewUI", 285);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 287);
var instance = this,
                boundingBox = instance.get('boundingBox'),
                model = instance.get('model'),
                eventhandlers = instance._eventhandlers,
                itsatabkeymanager = boundingBox.itsatabkeymanager,
                view = instance.view;

            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 294);
eventhandlers.push(
                instance.after(
                    'modelChange',
                    function(e) {
                        _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "(anonymous 5)", 297);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 298);
var prevVal = e.prevVal,
                            newVal = e.newVal;
                        _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 300);
if (prevVal && prevVal.removeTarget) {
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 301);
prevVal.removeTarget(view);
                        }
                        _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 303);
if (newVal && newVal.addTarget) {
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 304);
newVal.addTarget(view);
                        }
                        _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 306);
view.set('model', newVal);
                        _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 307);
model = instance.get('model');
                        _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 308);
view.render();
                    }
                )
            );
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 312);
eventhandlers.push(
                instance.after(
                    'templateChange',
                    function(e) {
                        _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "(anonymous 6)", 315);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 316);
var newTemplate = e.newVal,
                            modelEditable = instance.get('modelEditable');
                        _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 318);
if (!modelEditable || !model.itsaeditmodel) {
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 319);
view.template = newTemplate;
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 320);
instance._setTemplateRenderer(newTemplate, false);
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 321);
view.render();
                        }
                    }
                )
            );
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 326);
eventhandlers.push(
                view.after(
                    'itsaeditmodel:templateChange',
                    function(e) {
                        _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "(anonymous 7)", 329);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 330);
var newTemplate = e.newVal,
                            modelEditable = instance.get('modelEditable');
                        _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 332);
if (modelEditable && model.itsaeditmodel) {
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 333);
view.template = newTemplate;
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 334);
instance._setTemplateRenderer(newTemplate, true);
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 335);
view.render();
                        }
                    }
                )
            );
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 340);
eventhandlers.push(
                view.after(
                    'model:resetclick',
                    function(e) {
                        _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "(anonymous 8)", 343);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 344);
var model = e.target, // NOT e.currentTarget: that is the (scroll)View-instance (?)
                            options = {fromEditModel: true}; // set Attribute with option: '{fromEditModel: true}'
                                                             // --> now the view knows it must not re-render.
                        _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 347);
model.setAttrs(instance._initialEditAttrs, options);
                        _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 348);
view.render();
                        _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 349);
if (itsatabkeymanager) {
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 350);
itsatabkeymanager.focusInitialItem();
                        }
                    }
                )
            );
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 355);
eventhandlers.push(
                instance.after(
                    'modelEditableChange',
                    function(e) {
                        _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "(anonymous 9)", 358);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 359);
var newEditable = e.newVal,
                            template;
                        // if model.itsaeditmodel exists, then we need to rerender
                        _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 362);
if (model.itsaeditmodel) {
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 363);
template = newEditable ? model.itsaeditmodel.get('template') : instance.get('template');
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 364);
view.template = template;
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 365);
instance._setTemplateRenderer(template, newEditable);
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 366);
view.render();
                        }
                    }
                )
            );
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 371);
eventhandlers.push(
                instance.after(
                    'itsaeditmodel:editmodelConfigAttrsChange',
                    function() {
                        _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "(anonymous 10)", 374);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 375);
if (model.itsaeditmodel && instance.get('modelEditable')) {
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 376);
view.render();
                        }
                    }
                )
            );
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 381);
eventhandlers.push(
                view.after(
                    'itsaeditmodel:destroy',
                    function() {
                        _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "(anonymous 11)", 384);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 385);
if (instance.get('modelEditable')) {
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 386);
var template = instance.get('template');
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 387);
view.template = template;
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 388);
instance._setTemplateRenderer(template, false);
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 389);
view.render();
                        }
                    }
                )
            );
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 394);
eventhandlers.push(
                view.after(
                    'itsaeditmodel:pluggedin',
                    function() {
                        _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "(anonymous 12)", 397);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 398);
Y.use('gallery-itsatabkeymanager', function(Y) {
                            _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "(anonymous 13)", 398);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 399);
if (!boundingBox.itsatabkeymanager) {
                                _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 400);
boundingBox.plug(Y.Plugin.ITSATabKeyManager);
                            }
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 402);
if (instance.get('modelEditable')) {
                                _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 403);
var template = model.itsaeditmodel.get('template');
                                _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 404);
view.template = template;
                                _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 405);
instance._setTemplateRenderer(template, true);
                                _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 406);
view.render();
                            }
                        });
                    }
                )
            );
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 412);
eventhandlers.push(
                view.after(
                    'itsaeditmodel:focusnext',
                    function() {
                        _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "(anonymous 14)", 415);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 416);
var itsatabkeymanager = boundingBox.itsatabkeymanager;
                        _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 417);
if (itsatabkeymanager && instance.get('focused')) {
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 418);
itsatabkeymanager.next();
                        }
                        else {
                        }
                    }
                )
            );
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 425);
eventhandlers.push(
                instance.after(
                    'eventsChange',
                    function(e) {
                        _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "(anonymous 15)", 428);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 429);
view.events = e.newVal;
                    }
                )
            );
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 433);
eventhandlers.push(
                view.after(
                    'model:change',
                    function() {
                        _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "(anonymous 16)", 436);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 437);
if (!instance.get('modelEditable') || !model.itsaeditmodel) {
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 438);
view.render(false);
                        }
                        else {
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 441);
view.get('container').all('.'+ITSAFORMELEMENT_CHANGED_CLASS).removeClass(ITSAFORMELEMENT_CHANGED_CLASS);
                        }
                    }
                )
            );
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 446);
eventhandlers.push(
                view.after(
                    'model:destroy',
                    function() {
                        _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "(anonymous 17)", 449);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 450);
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
            _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "getModelToJSON", 467);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 468);
return (model.get && (Lang.type(model.get) === 'function')) ? model.toJSON() : model;
        },

        /**
         * Cleans up bindings
         * @method destructor
         * @protected
        */
        destructor: function() {
            _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "destructor", 476);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 477);
var instance = this,
                boundingBox = instance.get('boundingBox');

            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 480);
instance._clearEventhandlers();
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 481);
instance.view.destroy();
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 482);
if (boundingBox.hasPlugin('itsatabkeymanager')) {
                _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 483);
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
            _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "_setTemplateRenderer", 505);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 506);
var instance = this,
                isMicroTemplate, ismicrotemplate, compiledModelEngine;

            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 509);
isMicroTemplate = function() {
                _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "isMicroTemplate", 509);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 510);
var microTemplateRegExp = /<%(.+)%>/;
                _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 511);
return microTemplateRegExp.test(template);
            };
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 513);
ismicrotemplate = instance._isMicroTemplate = isMicroTemplate();
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 514);
if (ismicrotemplate) {
                _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 515);
compiledModelEngine = YTemplateMicro.compile(template);
                _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 516);
instance._modelRenderer = function(model) {
                    _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "_modelRenderer", 516);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 517);
var jsondata = editTemplate ? model.itsaeditmodel.toJSON(model.itsaeditmodel.get('editmodelConfigAttrs'))
                                   : instance.getModelToJSON(model);
                    _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 519);
return compiledModelEngine(jsondata);
                };
            }
            else {
                _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 523);
instance._modelRenderer = function(model) {
                    _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "_modelRenderer", 523);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 524);
var jsondata = editTemplate ? model.itsaeditmodel.toJSON(model.itsaeditmodel.get('editmodelConfigAttrs'))
                                   : instance.getModelToJSON(model);
                    _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 526);
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
            _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "_viewRenderer", 541);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 542);
var instance = this,
                boundingBox = instance.get('boundingBox'),
                itsatabkeymanager = boundingBox.itsatabkeymanager,
                view = instance.view,
                container = view.get('container'),
                model = view.get('model'),
                editMode = model.itsaeditmodel && instance.get('modelEditable'),
                itsaDateTimePicker = Y.Global.ItsaDateTimePicker,
                html = clear ? '' : instance._modelRenderer(model);

            // Render this view's HTML into the container element.
            // Because Y.Node.setHTML DOES NOT destroy its nodes (!) but only remove(), we destroy them ourselves first
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 554);
if (editMode || instance._isMicroTemplate) {
                _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 555);
if (editMode) {
                    _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 556);
instance._initialEditAttrs = model.getAttrs();
                }
                _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 558);
container.cleanupWidgets(true);
            }

            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 561);
container.setHTML(html);
            // If Y.Plugin.ITSATabKeyManager is plugged in, then refocus to the first item
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 563);
if (itsatabkeymanager) {
                _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 564);
itsatabkeymanager.refresh(boundingBox);
                _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 565);
if (instance.get('focused')) {
                    _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 566);
itsatabkeymanager.focusInitialItem();
                }
            }
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 569);
if (itsaDateTimePicker && itsaDateTimePicker.panel.get('visible')) {
                _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 570);
itsaDateTimePicker.hide(true);
            }
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 572);
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
            _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "_clearEventhandlers", 583);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 584);
YArray.each(
                this._eventhandlers,
                function(item){
                    _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "(anonymous 18)", 586);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 587);
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
                validator: function(v){ _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "validator", 636);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 636);
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
                    _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "validator", 650);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 651);
return Lang.isBoolean(v);
                }
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
                validator: function(v){ _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "validator", 666);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 666);
return ((v instanceof Y.Model) || Lang.isObject(v) || (v===null)); }
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
                    _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "validator", 683);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 684);
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
                validator: function(v){ _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "validator", 707);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 707);
return Lang.isString(v); }
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
