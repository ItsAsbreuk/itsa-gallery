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
_yuitest_coverage["build/gallery-itsaviewmodel/gallery-itsaviewmodel.js"].code=["YUI.add('gallery-itsaviewmodel', function (Y, NAME) {","","'use strict';","","/**"," *"," * Widget ITSAViewModel"," *"," *"," * This widget renderes Y.Model-instances -or just plain objects- inside the widgets contentBox."," * It uses Y.View under the hood, where Y.View.container is bound to the 'contentBox'. The render-method must be defined"," * by the widget's attribute 'template'. The Model (or object) must be set through the attribute 'model'."," *"," * Events can be set through the attribute 'events' and follow the same pattern as Y.View does. As a matter of fact, all attributes"," * (template, model, events) are passed through to the widgets Y.View instance (which has the property 'view')."," *"," *"," * Using this widget is great to render Model on the page, where the widget keeps synced with the model. Whenever a new Model-instance"," * is attached to the widget, or another template is used, the wodget will be re-rendered automaticly."," *"," * Attaching Y.Model-instances or objects?"," * Both can be attached. Whenever widgetattribute change, the widget will be re-rendered is needed (template- or model-attribute). This also"," * counts for attached objects. However, changes inside an object itself (updated property-value) cannot be caught by the widget, so you need"," * to call syncUI() yourself after an object-change. Y.Model-instances -on the other hand- do fire a *:change-event which is caught by the widget."," * This makes the widget re-render after a Model-instance changes some of its attributes."," *"," *"," * By default, the widget comes with its own style. You can disable this by setting the attribute 'styled' to false."," *"," * @module gallery-itsaviewmodel"," * @extends Widget"," * @class ITSAViewModel"," * @constructor"," * @since 0.1"," *"," * <i>Copyright (c) 2013 Marco Asbreuk - http://itsasbreuk.nl</i>"," * YUI BSD License - http://developer.yahoo.com/yui/license.html"," *","*/","","var Lang = Y.Lang,","    YArray = Y.Array,","    YTemplateMicro = Y.Template.Micro,","    MODELVIEW_STYLED = 'itsa-modelview-styled',","    MODELVIEW_STYLED_FORM = 'yui3-form',","    FORMELEMENT_CLASS = 'yui3-itsaformelement',","    ITSAFORMELEMENT_CHANGED_CLASS = FORMELEMENT_CLASS + '-changed';","","","//===============================================================================================","//","// First: extend Y.Node with the method cleanup()","//","//===============================================================================================","","function ITSANodeCleanup() {}","","Y.mix(ITSANodeCleanup.prototype, {","","    //","    // Destroys all widgets inside the node by calling widget.destroy(true);","    //","    // @method cleanup","    // @param destroyAllNodes {Boolean} If true, all nodes contained within the Widget are removed and destroyed.","    //                        Defaults to false due to potentially high run-time cost.","    // @since 0.1","    //","    //","    cleanupWidgets: function(destroyAllNodes) {","        var node = this,","            YWidget = Y.Widget;","","        if (YWidget) {","            node.all('.yui3-widget').each(","                function(widgetNode) {","                    if (node.one('#'+widgetNode.get('id'))) {","                        var widgetInstance = YWidget.getByNode(widgetNode);","                        if (widgetInstance) {","                            widgetInstance.destroy(destroyAllNodes);","                        }","                    }","                }","            );","        }","    },","","    //","    // Cleansup the node by calling node.empty(), as well as destroying all widgets that lie","    // within the node by calling widget.destroy(true);","    //","    // @method cleanup","    // @since 0.1","    //","    //","    cleanup: function() {","        var node = this;","","        node.cleanupWidgets(true);","        node.empty();","    }","","}, true);","","Y.Node.ITSANodeCleanup = ITSANodeCleanup;","","Y.Base.mix(Y.Node, [ITSANodeCleanup]);","","//===============================================================================================","//","// Next we create the widget","//","//===============================================================================================","","Y.ITSAViewModel = Y.Base.create('itsaviewmodel', Y.Widget, [], {","","","","","        /**","         * @method initializer","         * @protected","        */","        initializer : function() {","            var instance = this;","            /**","             * Internally generated Y.View-instance that has its 'container' bound to the 'contentBox'","             * @property view","             * @type Y.View","            */","            instance.view = null;","","            /**","             * Internal flag that tells wheter a Template.Micro is being used.","             * @property _isMicroTemplate","             * @private","             * @default null","             * @type Boolean","            */","            instance._isMicroTemplate = null;","","            /**","             * Internal Function that is generated to automaticly make use of the template.","             * The function has the structure of: _modelRenderer = function(model) {return {String}};","             * @property _modelRenderer","             * @private","             * @default function(model) {return ''};","             * @type Function","            */","            instance._modelRenderer = null;","","            /**","             * Internal list of all eventhandlers bound by this widget.","             * @property _eventhandlers","             * @private","             * @default []","             * @type Array","            */","            instance._eventhandlers = [];","","            /**","             * Backup of the original state of the attribute-values. Needed to make reset posible in case","             * Y.Plugin.ITSAEditModel is plugged in","             *","             * @property _initialEditAttrs","             * @private","             * @default null","             * @type Object","            */","            instance._initialEditAttrs = null;","        },","","       /**","         * Overruled renderer-method, to make sure rendering is done after asynchronious initialisation.","         *","         * @method renderer","         * @protected","        */","        renderer : function() {","            var instance = this,","                boundingBox = instance.get('boundingBox'),","                model = instance.get('model'),","                modelEditable = instance.get('modelEditable'),","                itsaeditmodel = (modelEditable && model.itsaeditmodel);","","            if (itsaeditmodel && !boundingBox.itsatabkeymanager) {","                Y.use('gallery-itsatabkeymanager', function(Y) {","                    boundingBox.plug(Y.Plugin.ITSATabKeyManager);","                    instance._renderFurther(boundingBox, model, itsaeditmodel);","                });","            }","            else {","                instance._renderFurther(boundingBox, model, itsaeditmodel);","            }","        },","","        /**","         * More renderer, but we are always sure itsatabkeymanager is loaded (when needed)","         *","         * @method renderFurther","         * @param boundingBox {Y.Node}","         * @param model {Y.Model}","         * @param itsaeditmodel {Y.Plugin.ITSAEditModel}","         * @private","         * @protected","        */","        _renderFurther : function(boundingBox, model, itsaeditmodel) {","            var instance = this,","                events = instance.get('events'),","                template = itsaeditmodel ? model.itsaeditmodel.get('template') : instance.get('template'),","                styled = instance.get('styled'),","                view;","","            if (styled) {","                boundingBox.addClass(MODELVIEW_STYLED).addClass(MODELVIEW_STYLED_FORM);","            }","            view = instance.view = new Y.View({","                container: instance._getViewContainer(),","                model: model","            });","            view.events = events;","            view.template = template;","            instance._setTemplateRenderer(template, itsaeditmodel);","            view.render = Y.rbind(instance._viewRenderer, instance);","            if (model && model.addTarget) {","                model.addTarget(view);","            }","            instance._widgetRenderer();","        },","","        /**","         * returns the view-container, which equals this.get('contentBox')","         *","         * @method _getViewContainer","         * @private","        */","        _getViewContainer : function() {","            return this.get('contentBox');","        },","","        /**","         * Calls the original Y.Widget.renderer","         *","         * @method _widgetRenderer","         * @private","         * @protected","        */","        _widgetRenderer : function() {","            var instance = this;","","            instance.constructor.superclass.renderer.apply(instance);","        },","","        /**","         * Sets up DOM and CustomEvent listeners for the widget.","         *","         * @method bindUI","         * @protected","         */","        bindUI: function() {","            var instance = this,","                boundingBox = instance.get('boundingBox'),","                model = instance.get('model'),","                eventhandlers = instance._eventhandlers,","                itsatabkeymanager = boundingBox.itsatabkeymanager,","                view = instance.view;","","            eventhandlers.push(","                instance.after(","                    'modelChange',","                    function(e) {","                        var prevVal = e.prevVal,","                            newVal = e.newVal;","                        if (prevVal && prevVal.removeTarget) {","                            prevVal.removeTarget(view);","                        }","                        if (newVal && newVal.addTarget) {","                            newVal.addTarget(view);","                        }","                        view.set('model', newVal);","                        model = instance.get('model');","                        view.render();","                    }","                )","            );","            eventhandlers.push(","                instance.after(","                    'templateChange',","                    function(e) {","                        var newTemplate = e.newVal,","                            modelEditable = instance.get('modelEditable');","                        if (!modelEditable || !model.itsaeditmodel) {","                            view.template = newTemplate;","                            instance._setTemplateRenderer(newTemplate, false);","                            view.render();","                        }","                    }","                )","            );","            eventhandlers.push(","                view.after(","                    'itsaeditmodel:templateChange',","                    function(e) {","                        var newTemplate = e.newVal,","                            modelEditable = instance.get('modelEditable');","                        if (modelEditable && model.itsaeditmodel) {","                            view.template = newTemplate;","                            instance._setTemplateRenderer(newTemplate, true);","                            view.render();","                        }","                    }","                )","            );","            eventhandlers.push(","                view.after(","                    'model:resetclick',","                    function(e) {","                        var model = e.target, // NOT e.currentTarget: that is the (scroll)View-instance (?)","                            options = {fromEditModel: true}; // set Attribute with option: '{fromEditModel: true}'","                                                             // --> now the view knows it must not re-render.","                        model.setAttrs(instance._initialEditAttrs, options);","                        view.render();","                        if (itsatabkeymanager) {","                            itsatabkeymanager.focusInitialItem();","                        }","                    }","                )","            );","            eventhandlers.push(","                instance.after(","                    'modelEditableChange',","                    function(e) {","                        var newEditable = e.newVal,","                            template;","                        // if model.itsaeditmodel exists, then we need to rerender","                        if (model.itsaeditmodel) {","                            template = newEditable ? model.itsaeditmodel.get('template') : instance.get('template');","                            view.template = template;","                            instance._setTemplateRenderer(template, newEditable);","                            view.render();","                        }","                    }","                )","            );","            eventhandlers.push(","                instance.after(","                    'itsaeditmodel:editmodelConfigAttrsChange',","                    function() {","                        if (model.itsaeditmodel && instance.get('modelEditable')) {","                            view.render();","                        }","                    }","                )","            );","            eventhandlers.push(","                view.after(","                    'itsaeditmodel:destroy',","                    function() {","                        if (instance.get('modelEditable')) {","                            var template = instance.get('template');","                            view.template = template;","                            instance._setTemplateRenderer(template, false);","                            view.render();","                        }","                    }","                )","            );","            eventhandlers.push(","                view.after(","                    'itsaeditmodel:pluggedin',","                    function() {","                        Y.use('gallery-itsatabkeymanager', function(Y) {","                            if (!boundingBox.itsatabkeymanager) {","                                boundingBox.plug(Y.Plugin.ITSATabKeyManager);","                            }","                            if (instance.get('modelEditable')) {","                                var template = model.itsaeditmodel.get('template');","                                view.template = template;","                                instance._setTemplateRenderer(template, true);","                                view.render();","                            }","                        });","                    }","                )","            );","            eventhandlers.push(","                view.after(","                    'itsaeditmodel:focusnext',","                    function() {","                        var itsatabkeymanager = boundingBox.itsatabkeymanager;","                        if (itsatabkeymanager && instance.get('focused')) {","                            itsatabkeymanager.next();","                        }","                        else {","                        }","                    }","                )","            );","            eventhandlers.push(","                instance.after(","                    'eventsChange',","                    function(e) {","                        view.events = e.newVal;","                    }","                )","            );","            eventhandlers.push(","                instance.after(","                    'styledChange',","                    function(e) {","                        boundingBox.toggleClass(MODELVIEW_STYLED, e.newVal).toggleClass(MODELVIEW_STYLED_FORM, e.newVal);","                    }","                )","            );","            eventhandlers.push(","                view.after(","                    'model:change',","                    function() {","                        if (!instance.get('modelEditable') || !model.itsaeditmodel) {","                            view.render(false);","                        }","                        else {","                            view.get('container').all('.'+ITSAFORMELEMENT_CHANGED_CLASS).removeClass(ITSAFORMELEMENT_CHANGED_CLASS);","                        }","                    }","                )","            );","            eventhandlers.push(","                view.after(","                    'model:destroy',","                    function() {","                        view.render(true);","                    }","                )","            );","        },","","        /**","         * Returns the Model as an object. Regardless whether it is a Model-instance, or an item of a LazyModelList","         * which might be an Object or a Model. Caution: If it is a Model-instance, than you get a Clone. If not","         * -in case of an object from a LazyModelList- than you get the reference to the original object.","         *","         * @method getModelToJSON","         * @param {Y.Model} model Model or Object","         * @return {Object} Object or model.toJSON()","         * @since 0.1","         *","        */","        getModelToJSON : function(model) {","            return (model.get && (Lang.type(model.get) === 'function')) ? model.toJSON() : model;","        },","","        /**","         * Updates the widget-content by calling view.render();","         *","         * @method syncUI","         * @protected","         */","        syncUI: function() {","            this.view.render();","        },","","        /**","         * Cleans up bindings","         * @method destructor","         * @protected","        */","        destructor: function() {","            var instance = this,","                boundingBox = instance.get('boundingBox');","","            instance._clearEventhandlers();","            instance.view.destroy();","            if (boundingBox.hasPlugin('itsatabkeymanager')) {","                boundingBox.unplug('itsatabkeymanager');","            }","        },","","        //===============================================================================================","        // private methods","        //===============================================================================================","","        /**","         * Function-factory that binds a function to the property '_modelRenderer'. '_modelRenderer' will be defined like","         * _modelRenderer = function(model) {return {String}};","         * which means: it will return a rendered String that is modified by the attribute 'template'. The rendering","         * is done either by Y.Lang.sub or by Y.Template.Micro, depending on the value of 'template'.","         *","         * @method _viewRenderer","         * @param template {String} template to be rendered","         * @param editTemplate {Boolean} whether or not the template is an 'editTemplate' from Y.Plugin.ITSAEditModel","         * @private","         * @chainable","         * @since 0.1","         *","        */","        _setTemplateRenderer : function(template, editTemplate) {","            var instance = this,","                isMicroTemplate, ismicrotemplate, compiledModelEngine;","","            isMicroTemplate = function() {","                var microTemplateRegExp = /<%(.+)%>/;","                return microTemplateRegExp.test(template);","            };","            ismicrotemplate = instance._isMicroTemplate = isMicroTemplate();","            if (ismicrotemplate) {","                compiledModelEngine = YTemplateMicro.compile(template);","                instance._modelRenderer = function(model) {","                    var jsondata = editTemplate ? model.itsaeditmodel.toJSON(model.itsaeditmodel.get('editmodelConfigAttrs'))","                                   : instance.getModelToJSON(model);","                    return compiledModelEngine(jsondata);","                };","            }","            else {","                instance._modelRenderer = function(model) {","                    var jsondata = editTemplate ? model.itsaeditmodel.toJSON(model.itsaeditmodel.get('editmodelConfigAttrs'))","                                   : instance.getModelToJSON(model);","                    return Lang.sub(template, jsondata);","                };","            }","        },","","        /**","         * Method that is responsible for rendering the Model into the view.","         *","         * @method _viewRenderer","         * @param {Boolean} [clear] whether to clear the view. normally you don't want this: leaving empty means the Model is drawn.","         * @private","         * @chainable","         * @since 0.1","         *","        */","        _viewRenderer : function (clear) {","            var instance = this,","                boundingBox = instance.get('boundingBox'),","                itsatabkeymanager = boundingBox.itsatabkeymanager,","                view = instance.view,","                container = view.get('container'),","                model = view.get('model'),","                editMode = model.itsaeditmodel && instance.get('modelEditable'),","                itsaDateTimePicker = Y.Global.ItsaDateTimePicker,","                html = clear ? '' : instance._modelRenderer(model);","","            // Render this view's HTML into the container element.","            // Because Y.Node.setHTML DOES NOT destroy its nodes (!) but only remove(), we destroy them ourselves first","            if (editMode || instance._isMicroTemplate) {","                if (editMode) {","                    instance._initialEditAttrs = model.getAttrs();","                }","                container.cleanupWidgets(true);","            }","","            container.setHTML(html);","            // If Y.Plugin.ITSATabKeyManager is plugged in, then refocus to the first item","            if (itsatabkeymanager) {","                itsatabkeymanager.refresh(boundingBox);","                if (instance.get('focused')) {","                    itsatabkeymanager.focusInitialItem();","                }","            }","            if (itsaDateTimePicker && itsaDateTimePicker.panel.get('visible')) {","                itsaDateTimePicker.hide(true);","            }","            return instance;","        },","","        /**","         * Cleaning up all eventlisteners","         *","         * @method _clearEventhandlers","         * @private","         * @since 0.1","         *","        */","        _clearEventhandlers : function() {","            YArray.each(","                this._eventhandlers,","                function(item){","                    item.detach();","                }","            );","        }","","    }, {","        ATTRS : {","            /**","             * Hash of CSS selectors mapped to events to delegate to elements matching","             * those selectors.","             *","             * CSS selectors are relative to the `contentBox` element, which is in fact","             * the view-container. Events are attached to this container (contentBox), and","             * delegation is used so that subscribers are only notified of events that occur on","             * elements inside the container that match the specified selectors. This allows the","             * contentBox to be re-rendered as needed without losing event subscriptions.","             *","             * Event handlers can be specified either as functions or as strings that map","             * to function names. IN the latter case, you must declare the functions as part","             * of the 'view'-property (which is a Y.View instance).","             *","             * The `this` object in event handlers will refer to the 'view'-property (which is a","             * Y.View instance, created during initialisation of this widget. If you'd prefer `this`","             * to be something else, use `Y.bind()` to bind a custom `this` object.","             *","             * @example","             *     var viewModel = new Y.ViewITSAViewModel({","             *         events: {","             *             // Call `this.toggle()` whenever the element with the id","             *             // \"toggle-button\" is clicked.","             *             '#toggle-button': {click: 'toggle'},","             *","             *             // Call `this.hoverOn()` when the mouse moves over any element","             *             // with the \"hoverable\" class, and `this.hoverOff()` when the","             *             // mouse moves out of any element with the \"hoverable\" class.","             *             '.hoverable': {","             *                 mouseover: 'hoverOn',","             *                 mouseout : 'hoverOff'","             *             }","             *         }","             *     });","             *","             * @attribute events","             * @type {object}","             * @default {}","             * @since 0.1","             */","            events: {","                value: {},","                validator: function(v){ return Lang.isObject(v);}","            },","","            /**","             * Makes the View to render the editable-version of the Model. Only when the Model has <b>Y.Plugin.ITSAEditModel</b> plugged in.","             *","             * @attribute modelEditable","             * @type {Boolean}","             * @default false","             * @since 0.1","             */","            modelEditable: {","                value: false,","                lazyAdd: false,","                validator: function(v){","                    return Lang.isBoolean(v);","                }","            },","","            /**","             * The Y.Model that will be rendered in the view. May also be an Object, which is handy in case the source is an","             * item of a Y.LazyModelList","             *","             * @attribute model","             * @type {Y.Model|Object}","             * @default {}","             * @since 0.1","             */","            model: {","                value: null,","                validator: function(v){ return ((v instanceof Y.Model) || Lang.isObject(v) || (v===null)); }","            },","","           /**","            * Whether the View is styled using the css of this module.","            * In fact, just the classname 'itsa-modelview-styled' is added to the boundingBox","            * and the css-rules do all the rest. The developer may override these rules, or set this value to false","            * while creatiung their own css. In the latter case it is advisable to take a look at all the css-rules","            * that are supplied by this module.","            *","            * @default true","            * @attribute styled","            * @type {Boolean}","            * @since 0.1","            */","            styled: {","                value: true,","                validator:  function(v) {","                    return Lang.isBoolean(v);","                }","            },","","        /**","         * Template to render the Model. The attribute MUST be a template that can be processed by either <i>Y.Lang.sub or Y.Template.Micro</i>,","         * where Y.Lang.sub is more lightweight.","         *","         * <b>Example with Y.Lang.sub:</b> '{slices} slice(s) of {type} pie remaining. <button class=\"eat\">Eat a Slice!</button>'","         * <b>Example with Y.Template.Micro:</b>","         * '<%= data.slices %> slice(s) of <%= data.type %> pie remaining <button class=\"eat\">Eat a Slice!</button>'","         * <b>Example 2 with Y.Template.Micro:</b>","         * '<%= data.slices %> slice(s) of <%= data.type %> pie remaining<% if (data.slices>0) {%> <button class=\"eat\">Eat a Slice!</button><% } %>'","         *","         * <u>If you set this attribute after the view is rendered, the view will be re-rendered.</u>","         *","         * @attribute template","         * @type {String}","         * @default '{clientId}'","         * @since 0.1","         */","            template: {","                value: '{clientId}',","                validator: function(v){ return Lang.isString(v); }","            }","","        }","    }",");","","}, '@VERSION@', {","    \"requires\": [","        \"base-build\",","        \"widget\",","        \"view\",","        \"template-micro\",","        \"model\",","        \"pluginhost-base\"","    ],","    \"skinnable\": true","});"];
_yuitest_coverage["build/gallery-itsaviewmodel/gallery-itsaviewmodel.js"].lines = {"1":0,"3":0,"41":0,"56":0,"58":0,"70":0,"73":0,"74":0,"76":0,"77":0,"78":0,"79":0,"96":0,"98":0,"99":0,"104":0,"106":0,"114":0,"124":0,"130":0,"139":0,"149":0,"158":0,"169":0,"179":0,"185":0,"186":0,"187":0,"188":0,"192":0,"207":0,"213":0,"214":0,"216":0,"220":0,"221":0,"222":0,"223":0,"224":0,"225":0,"227":0,"237":0,"248":0,"250":0,"260":0,"267":0,"271":0,"273":0,"274":0,"276":0,"277":0,"279":0,"280":0,"281":0,"285":0,"289":0,"291":0,"292":0,"293":0,"294":0,"299":0,"303":0,"305":0,"306":0,"307":0,"308":0,"313":0,"317":0,"320":0,"321":0,"322":0,"323":0,"328":0,"332":0,"335":0,"336":0,"337":0,"338":0,"339":0,"344":0,"348":0,"349":0,"354":0,"358":0,"359":0,"360":0,"361":0,"362":0,"367":0,"371":0,"372":0,"373":0,"375":0,"376":0,"377":0,"378":0,"379":0,"385":0,"389":0,"390":0,"391":0,"398":0,"402":0,"406":0,"410":0,"414":0,"418":0,"419":0,"422":0,"427":0,"431":0,"449":0,"459":0,"468":0,"471":0,"472":0,"473":0,"474":0,"497":0,"500":0,"501":0,"502":0,"504":0,"505":0,"506":0,"507":0,"508":0,"510":0,"514":0,"515":0,"517":0,"533":0,"545":0,"546":0,"547":0,"549":0,"552":0,"554":0,"555":0,"556":0,"557":0,"560":0,"561":0,"563":0,"575":0,"578":0,"627":0,"642":0,"657":0,"675":0,"698":0};
_yuitest_coverage["build/gallery-itsaviewmodel/gallery-itsaviewmodel.js"].functions = {"ITSANodeCleanup:56":0,"(anonymous 2):75":0,"cleanupWidgets:69":0,"cleanup:95":0,"initializer:123":0,"(anonymous 3):186":0,"renderer:178":0,"_renderFurther:206":0,"_getViewContainer:236":0,"_widgetRenderer:247":0,"(anonymous 4):270":0,"(anonymous 5):288":0,"(anonymous 6):302":0,"(anonymous 7):316":0,"(anonymous 8):331":0,"(anonymous 9):347":0,"(anonymous 10):357":0,"(anonymous 12):371":0,"(anonymous 11):370":0,"(anonymous 13):388":0,"(anonymous 14):401":0,"(anonymous 15):409":0,"(anonymous 16):417":0,"(anonymous 17):430":0,"bindUI:259":0,"getModelToJSON:448":0,"syncUI:458":0,"destructor:467":0,"isMicroTemplate:500":0,"_modelRenderer:507":0,"_modelRenderer:514":0,"_setTemplateRenderer:496":0,"_viewRenderer:532":0,"(anonymous 18):577":0,"_clearEventhandlers:574":0,"validator:627":0,"validator:641":0,"validator:657":0,"validator:674":0,"validator:698":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-itsaviewmodel/gallery-itsaviewmodel.js"].coveredLines = 151;
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
                itsaeditmodel = (modelEditable && model.itsaeditmodel);

            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 185);
if (itsaeditmodel && !boundingBox.itsatabkeymanager) {
                _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 186);
Y.use('gallery-itsatabkeymanager', function(Y) {
                    _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "(anonymous 3)", 186);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 187);
boundingBox.plug(Y.Plugin.ITSATabKeyManager);
                    _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 188);
instance._renderFurther(boundingBox, model, itsaeditmodel);
                });
            }
            else {
                _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 192);
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
            _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "_renderFurther", 206);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 207);
var instance = this,
                events = instance.get('events'),
                template = itsaeditmodel ? model.itsaeditmodel.get('template') : instance.get('template'),
                styled = instance.get('styled'),
                view;

            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 213);
if (styled) {
                _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 214);
boundingBox.addClass(MODELVIEW_STYLED).addClass(MODELVIEW_STYLED_FORM);
            }
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 216);
view = instance.view = new Y.View({
                container: instance._getViewContainer(),
                model: model
            });
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 220);
view.events = events;
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 221);
view.template = template;
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 222);
instance._setTemplateRenderer(template, itsaeditmodel);
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 223);
view.render = Y.rbind(instance._viewRenderer, instance);
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 224);
if (model && model.addTarget) {
                _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 225);
model.addTarget(view);
            }
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 227);
instance._widgetRenderer();
        },

        /**
         * returns the view-container, which equals this.get('contentBox')
         *
         * @method _getViewContainer
         * @private
        */
        _getViewContainer : function() {
            _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "_getViewContainer", 236);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 237);
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
            _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "_widgetRenderer", 247);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 248);
var instance = this;

            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 250);
instance.constructor.superclass.renderer.apply(instance);
        },

        /**
         * Sets up DOM and CustomEvent listeners for the widget.
         *
         * @method bindUI
         * @protected
         */
        bindUI: function() {
            _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "bindUI", 259);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 260);
var instance = this,
                boundingBox = instance.get('boundingBox'),
                model = instance.get('model'),
                eventhandlers = instance._eventhandlers,
                itsatabkeymanager = boundingBox.itsatabkeymanager,
                view = instance.view;

            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 267);
eventhandlers.push(
                instance.after(
                    'modelChange',
                    function(e) {
                        _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "(anonymous 4)", 270);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 271);
var prevVal = e.prevVal,
                            newVal = e.newVal;
                        _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 273);
if (prevVal && prevVal.removeTarget) {
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 274);
prevVal.removeTarget(view);
                        }
                        _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 276);
if (newVal && newVal.addTarget) {
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 277);
newVal.addTarget(view);
                        }
                        _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 279);
view.set('model', newVal);
                        _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 280);
model = instance.get('model');
                        _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 281);
view.render();
                    }
                )
            );
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 285);
eventhandlers.push(
                instance.after(
                    'templateChange',
                    function(e) {
                        _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "(anonymous 5)", 288);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 289);
var newTemplate = e.newVal,
                            modelEditable = instance.get('modelEditable');
                        _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 291);
if (!modelEditable || !model.itsaeditmodel) {
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 292);
view.template = newTemplate;
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 293);
instance._setTemplateRenderer(newTemplate, false);
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 294);
view.render();
                        }
                    }
                )
            );
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 299);
eventhandlers.push(
                view.after(
                    'itsaeditmodel:templateChange',
                    function(e) {
                        _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "(anonymous 6)", 302);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 303);
var newTemplate = e.newVal,
                            modelEditable = instance.get('modelEditable');
                        _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 305);
if (modelEditable && model.itsaeditmodel) {
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 306);
view.template = newTemplate;
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 307);
instance._setTemplateRenderer(newTemplate, true);
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 308);
view.render();
                        }
                    }
                )
            );
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 313);
eventhandlers.push(
                view.after(
                    'model:resetclick',
                    function(e) {
                        _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "(anonymous 7)", 316);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 317);
var model = e.target, // NOT e.currentTarget: that is the (scroll)View-instance (?)
                            options = {fromEditModel: true}; // set Attribute with option: '{fromEditModel: true}'
                                                             // --> now the view knows it must not re-render.
                        _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 320);
model.setAttrs(instance._initialEditAttrs, options);
                        _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 321);
view.render();
                        _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 322);
if (itsatabkeymanager) {
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 323);
itsatabkeymanager.focusInitialItem();
                        }
                    }
                )
            );
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 328);
eventhandlers.push(
                instance.after(
                    'modelEditableChange',
                    function(e) {
                        _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "(anonymous 8)", 331);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 332);
var newEditable = e.newVal,
                            template;
                        // if model.itsaeditmodel exists, then we need to rerender
                        _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 335);
if (model.itsaeditmodel) {
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 336);
template = newEditable ? model.itsaeditmodel.get('template') : instance.get('template');
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 337);
view.template = template;
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 338);
instance._setTemplateRenderer(template, newEditable);
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 339);
view.render();
                        }
                    }
                )
            );
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 344);
eventhandlers.push(
                instance.after(
                    'itsaeditmodel:editmodelConfigAttrsChange',
                    function() {
                        _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "(anonymous 9)", 347);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 348);
if (model.itsaeditmodel && instance.get('modelEditable')) {
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 349);
view.render();
                        }
                    }
                )
            );
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 354);
eventhandlers.push(
                view.after(
                    'itsaeditmodel:destroy',
                    function() {
                        _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "(anonymous 10)", 357);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 358);
if (instance.get('modelEditable')) {
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 359);
var template = instance.get('template');
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 360);
view.template = template;
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 361);
instance._setTemplateRenderer(template, false);
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 362);
view.render();
                        }
                    }
                )
            );
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 367);
eventhandlers.push(
                view.after(
                    'itsaeditmodel:pluggedin',
                    function() {
                        _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "(anonymous 11)", 370);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 371);
Y.use('gallery-itsatabkeymanager', function(Y) {
                            _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "(anonymous 12)", 371);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 372);
if (!boundingBox.itsatabkeymanager) {
                                _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 373);
boundingBox.plug(Y.Plugin.ITSATabKeyManager);
                            }
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 375);
if (instance.get('modelEditable')) {
                                _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 376);
var template = model.itsaeditmodel.get('template');
                                _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 377);
view.template = template;
                                _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 378);
instance._setTemplateRenderer(template, true);
                                _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 379);
view.render();
                            }
                        });
                    }
                )
            );
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 385);
eventhandlers.push(
                view.after(
                    'itsaeditmodel:focusnext',
                    function() {
                        _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "(anonymous 13)", 388);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 389);
var itsatabkeymanager = boundingBox.itsatabkeymanager;
                        _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 390);
if (itsatabkeymanager && instance.get('focused')) {
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 391);
itsatabkeymanager.next();
                        }
                        else {
                        }
                    }
                )
            );
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 398);
eventhandlers.push(
                instance.after(
                    'eventsChange',
                    function(e) {
                        _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "(anonymous 14)", 401);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 402);
view.events = e.newVal;
                    }
                )
            );
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 406);
eventhandlers.push(
                instance.after(
                    'styledChange',
                    function(e) {
                        _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "(anonymous 15)", 409);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 410);
boundingBox.toggleClass(MODELVIEW_STYLED, e.newVal).toggleClass(MODELVIEW_STYLED_FORM, e.newVal);
                    }
                )
            );
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 414);
eventhandlers.push(
                view.after(
                    'model:change',
                    function() {
                        _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "(anonymous 16)", 417);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 418);
if (!instance.get('modelEditable') || !model.itsaeditmodel) {
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 419);
view.render(false);
                        }
                        else {
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 422);
view.get('container').all('.'+ITSAFORMELEMENT_CHANGED_CLASS).removeClass(ITSAFORMELEMENT_CHANGED_CLASS);
                        }
                    }
                )
            );
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 427);
eventhandlers.push(
                view.after(
                    'model:destroy',
                    function() {
                        _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "(anonymous 17)", 430);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 431);
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
            _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "getModelToJSON", 448);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 449);
return (model.get && (Lang.type(model.get) === 'function')) ? model.toJSON() : model;
        },

        /**
         * Updates the widget-content by calling view.render();
         *
         * @method syncUI
         * @protected
         */
        syncUI: function() {
            _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "syncUI", 458);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 459);
this.view.render();
        },

        /**
         * Cleans up bindings
         * @method destructor
         * @protected
        */
        destructor: function() {
            _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "destructor", 467);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 468);
var instance = this,
                boundingBox = instance.get('boundingBox');

            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 471);
instance._clearEventhandlers();
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 472);
instance.view.destroy();
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 473);
if (boundingBox.hasPlugin('itsatabkeymanager')) {
                _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 474);
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
            _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "_setTemplateRenderer", 496);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 497);
var instance = this,
                isMicroTemplate, ismicrotemplate, compiledModelEngine;

            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 500);
isMicroTemplate = function() {
                _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "isMicroTemplate", 500);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 501);
var microTemplateRegExp = /<%(.+)%>/;
                _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 502);
return microTemplateRegExp.test(template);
            };
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 504);
ismicrotemplate = instance._isMicroTemplate = isMicroTemplate();
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 505);
if (ismicrotemplate) {
                _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 506);
compiledModelEngine = YTemplateMicro.compile(template);
                _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 507);
instance._modelRenderer = function(model) {
                    _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "_modelRenderer", 507);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 508);
var jsondata = editTemplate ? model.itsaeditmodel.toJSON(model.itsaeditmodel.get('editmodelConfigAttrs'))
                                   : instance.getModelToJSON(model);
                    _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 510);
return compiledModelEngine(jsondata);
                };
            }
            else {
                _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 514);
instance._modelRenderer = function(model) {
                    _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "_modelRenderer", 514);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 515);
var jsondata = editTemplate ? model.itsaeditmodel.toJSON(model.itsaeditmodel.get('editmodelConfigAttrs'))
                                   : instance.getModelToJSON(model);
                    _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 517);
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
            _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "_viewRenderer", 532);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 533);
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
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 545);
if (editMode || instance._isMicroTemplate) {
                _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 546);
if (editMode) {
                    _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 547);
instance._initialEditAttrs = model.getAttrs();
                }
                _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 549);
container.cleanupWidgets(true);
            }

            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 552);
container.setHTML(html);
            // If Y.Plugin.ITSATabKeyManager is plugged in, then refocus to the first item
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 554);
if (itsatabkeymanager) {
                _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 555);
itsatabkeymanager.refresh(boundingBox);
                _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 556);
if (instance.get('focused')) {
                    _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 557);
itsatabkeymanager.focusInitialItem();
                }
            }
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 560);
if (itsaDateTimePicker && itsaDateTimePicker.panel.get('visible')) {
                _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 561);
itsaDateTimePicker.hide(true);
            }
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 563);
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
            _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "_clearEventhandlers", 574);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 575);
YArray.each(
                this._eventhandlers,
                function(item){
                    _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "(anonymous 18)", 577);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 578);
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
                validator: function(v){ _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "validator", 627);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 627);
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
                    _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "validator", 641);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 642);
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
                validator: function(v){ _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "validator", 657);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 657);
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
                    _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "validator", 674);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 675);
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
                validator: function(v){ _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "validator", 698);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 698);
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
