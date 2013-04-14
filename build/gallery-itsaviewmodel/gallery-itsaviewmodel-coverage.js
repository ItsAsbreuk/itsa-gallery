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
_yuitest_coverage["build/gallery-itsaviewmodel/gallery-itsaviewmodel.js"].code=["YUI.add('gallery-itsaviewmodel', function (Y, NAME) {","","'use strict';","","/**"," *"," * Widget ITSAViewModel"," *"," *"," * This widget renderes Y.Model-instances -or just plain objects- inside the widgets contentBox."," * It uses Y.View under the hood, where Y.View.container is bound to the 'contentBox'. The render-method must be defined"," * by the widget's attribute 'template'. The Model (or object) must be set through the attribute 'model'."," *"," * Events can be set through the attribute 'events' and follow the same pattern as Y.View does. As a matter of fact, all attributes"," * (template, model, events) are passed through to the widgets Y.View instance (which has the property 'view')."," *"," *"," * Using this widget is great to render Model on the page, where the widget keeps synced with the model. Whenever a new Model-instance"," * is attached to the widget, or another template is used, the wodget will be re-rendered automaticly."," *"," * Attaching Y.Model-instances or objects?"," * Both can be attached. Whenever widgetattribute change, the widget will be re-rendered is needed (template- or model-attribute). This also"," * counts for attached objects. However, changes inside an object itself (updated property-value) cannot be caught by the widget, so you need"," * to call syncUI() yourself after an object-change. Y.Model-instances -on the other hand- do fire a *:change-event which is caught by the widget."," * This makes the widget re-render after a Model-instance changes some of its attributes."," *"," *"," * By default, the widget comes with its own style. You can disable this by setting the attribute 'styled' to false."," *"," * @module gallery-itsaviewmodel"," * @extends Widget"," * @class ITSAViewModel"," * @constructor"," * @since 0.1"," *"," * <i>Copyright (c) 2013 Marco Asbreuk - http://itsasbreuk.nl</i>"," * YUI BSD License - http://developer.yahoo.com/yui/license.html"," *","*/","","var Lang = Y.Lang,","    YArray = Y.Array,","    YTemplateMicro = Y.Template.Micro,","    MODELVIEW_STYLED = 'itsa-modelview-styled',","    MODELVIEW_STYLED_FORM = 'yui3-form',","    FORMELEMENT_CLASS = 'yui3-itsaformelement',","    ITSAFORMELEMENT_CHANGED_CLASS = FORMELEMENT_CLASS + '-changed';","","//===============================================================================================","//","// First: extend Y.Node with the method cleanup()","//","//===============================================================================================","","function ITSANodeCleanup() {}","","Y.mix(ITSANodeCleanup.prototype, {","","    //","    // Cleansup the node by calling node.empty(), as well as destroying all widgets that lie","    // within the node by calling widget.destroy(true);","    //","    // @method cleanup","    // @since 0.1","    //","    //","    cleanup: function() {","        var node = this,","            YWidget = Y.Widget;","","        if (YWidget) {","            node.all('.yui3-widget').each(","                function(widgetNode) {","                    if (node.one('#'+widgetNode.get('id'))) {","                        var widgetInstance = YWidget.getByNode(widgetNode);","                        if (widgetInstance) {","                            widgetInstance.destroy();","                        }","                    }","                }","            );","        }","        node.empty();","    }","","}, true);","","Y.Node.ITSANodeCleanup = ITSANodeCleanup;","","Y.Base.mix(Y.Node, [ITSANodeCleanup]);","","//===============================================================================================","//","// Next we create the widget","//","//===============================================================================================","","Y.ITSAViewModel = Y.Base.create('itsaviewmodel', Y.Widget, [], {","","        /**","         * Internally generated Y.View-instance that has its 'container' bound to the 'contentBox'","         * @property view","         * @type Y.View","        */","        view : null,","","        /**","         * Internal flag that tells wheter a Template.Micro is being used.","         * @property _isMicroTemplate","         * @private","         * @default null","         * @type Boolean","        */","        _isMicroTemplate : null,","","        /**","         * Internal Function that is generated to automaticly make use of the template.","         * The function has the structure of: _modelRenderer = function(model) {return {String}};","         * @property _modelRenderer","         * @private","         * @default function(model) {return ''};","         * @type Function","        */","        _modelRenderer : null,","","        /**","         * Internal list of all eventhandlers bound by this widget.","         * @property _eventhandlers","         * @private","         * @default []","         * @type Array","        */","        _eventhandlers : [],","","        /**","         * @method initializer","         * @protected","        */","        initializer : function() {","            var instance = this,","                boundingBox = instance.get('boundingBox'),","                contentBox = instance.get('contentBox'),","                events = instance.get('events'),","                model = instance.get('model'),","                modelEditable = instance.get('modelEditable'),","                itsaeditmodel = (modelEditable && model.itsaeditmodel),","                template = itsaeditmodel ? model.itsaeditmodel.get('template') : instance.get('template'),","                styled = instance.get('styled'),","                view;","","            if (styled) {","                boundingBox.addClass(MODELVIEW_STYLED).addClass(MODELVIEW_STYLED_FORM);","            }","            view = instance.view = new Y.View({","                container: contentBox,","                model: model","            });","            view.events = events;","            view.template = template;","            instance._setTemplateRenderer(template, itsaeditmodel);","            view.render = Y.rbind(instance._viewRenderer, instance);","            if (model && model.addTarget) {","                model.addTarget(view);","            }","         },","","        /**","         * Sets up DOM and CustomEvent listeners for the widget.","         *","         * @method bindUI","         * @protected","         */","        bindUI: function() {","            var instance = this,","                boundingBox = instance.get('boundingBox'),","                model = instance.get('model'),","                eventhandlers = instance._eventhandlers,","                view = instance.view;","","            eventhandlers.push(","                instance.after(","                    'modelChange',","                    function(e) {","                        var prevVal = e.prevVal,","                            newVal = e.newVal;","                        if (prevVal && prevVal.removeTarget) {","                            prevVal.removeTarget(view);","                        }","                        if (newVal && newVal.addTarget) {","                            newVal.addTarget(view);","                        }","                        view.set('model', newVal);","                        view.render();","                    }","                )","            );","            eventhandlers.push(","                model.after(","                    'templateChange',","                    function(e) {","                        var newTemplate = e.newVal,","                            modelEditable = instance.get('modelEditable');","                        if (!modelEditable || !model.itsaeditmodel) {","                            view.template = newTemplate;","                            instance._setTemplateRenderer(newTemplate, false);","                            view.render();","                        }","                    }","                )","            );","            eventhandlers.push(","                instance.after(","                    'modelEditableChange',","                    function(e) {","                        var newEditable = e.newVal,","                            template;","                        // if model.itsaeditmodel exists, then we need to rerender","                        if (model.itsaeditmodel) {","                            template = newEditable ? model.itsaeditmodel.get('template') : instance.get('template');","                            view.template = template;","                            instance._setTemplateRenderer(template, newEditable);","                            view.render();","                        }","                    }","                )","            );","            eventhandlers.push(","                instance.after(","                    'editmodelConfigAttrsChange',","                    function() {","                        if (model.itsaeditmodel && instance.get('modelEditable')) {","                            view.render();","                        }","                    }","                )","            );","            eventhandlers.push(","                view.after(","                    'itsaeditmodel:destroy',","                    function() {","                        if (instance.get('modelEditable')) {","                            var template = instance.get('template');","                            view.template = template;","                            instance._setTemplateRenderer(template, false);","                            view.render();","                        }","                    }","                )","            );","            eventhandlers.push(","                view.after(","                    'itsaeditmodel:pluggedin',","                    function() {","                        if (instance.get('modelEditable')) {","                            var template = model.itsaeditmodel.get('template');","                            view.template = template;","                            instance._setTemplateRenderer(template, true);","                            view.render();","                        }","                    }","                )","            );","            eventhandlers.push(","                instance.after(","                    'eventsChange',","                    function(e) {","                        view.events = e.newVal;","                    }","                )","            );","            eventhandlers.push(","                instance.after(","                    'styledChange',","                    function(e) {","                        boundingBox.toggleClass(MODELVIEW_STYLED, e.newVal).toggleClass(MODELVIEW_STYLED_FORM, e.newVal);","                    }","                )","            );","            eventhandlers.push(","                view.after(","                    '*:change',","                    function() {","                        if (!instance.get('modelEditable') || !model.itsaeditmodel) {","                            view.render(false);","                        }","                        else {","                            view.get('container').all('.'+ITSAFORMELEMENT_CHANGED_CLASS).removeClass(ITSAFORMELEMENT_CHANGED_CLASS);","                        }","                    }","                )","            );","            eventhandlers.push(","                view.after(","                    'model:destroy',","                    function() {","                        view.render(true);","                    }","                )","            );","            eventhandlers.push(","                boundingBox.after(","                    'click',","                    function() {","                        var itsafocusmanager = boundingBox.itsafocusmanager;","                        if (itsafocusmanager) {","                            itsafocusmanager.retreiveFocus();","                            // this will automaticly focus the host=view-instance","                        }","                        else {","                            instance.focus();","                        }","                    }","                )","            );","        },","","        /**","         * Returns the Model as an object. Regardless whether it is a Model-instance, or an item of a LazyModelList","         * which might be an Object or a Model. Caution: If it is a Model-instance, than you get a Clone. If not","         * -in case of an object from a LazyModelList- than you get the reference to the original object.","         *","         * @method getModelToJSON","         * @param {Y.Model} model Model or Object","         * @return {Object} Object or model.toJSON()","         * @since 0.1","         *","        */","        getModelToJSON : function(model) {","            return (model.get && (Lang.type(model.get) === 'function')) ? model.toJSON() : model;","        },","","        /**","         * Updates the widget-content by calling view.render();","         *","         * @method syncUI","         * @protected","         */","        syncUI: function() {","            this.view.render();","        },","","        /**","         * Cleans up bindings","         * @method destructor","         * @protected","        */","        destructor: function() {","            var instance = this;","","            instance._clearEventhandlers();","            instance.view.destroy();","        },","","        //===============================================================================================","        // private methods","        //===============================================================================================","","        /**","         * Function-factory that binds a function to the property '_modelRenderer'. '_modelRenderer' will be defined like","         * _modelRenderer = function(model) {return {String}};","         * which means: it will return a rendered String that is modified by the attribute 'template'. The rendering","         * is done either by Y.Lang.sub or by Y.Template.Micro, depending on the value of 'template'.","         *","         * @method _viewRenderer","         * @param template {String} template to be rendered","         * @param editTemplate {Boolean} whether or not the template is an 'editTemplate' from Y.Plugin.ITSAEditModel","         * @private","         * @chainable","         * @since 0.1","         *","        */","        _setTemplateRenderer : function(template, editTemplate) {","            var instance = this,","                isMicroTemplate, ismicrotemplate, compiledModelEngine;","","            isMicroTemplate = function() {","                var microTemplateRegExp = /<%(.+)%>/;","                return microTemplateRegExp.test(template);","            };","            ismicrotemplate = instance._isMicroTemplate = isMicroTemplate();","            if (ismicrotemplate) {","                compiledModelEngine = YTemplateMicro.compile(template);","                instance._modelRenderer = function(model) {","                    var jsondata = editTemplate ? model.itsaeditmodel.toJSON(instance.get('editmodelConfigAttrs'))","                                   : instance.getModelToJSON(model);","                    return compiledModelEngine(jsondata);","                };","            }","            else {","                instance._modelRenderer = function(model) {","                    var jsondata = editTemplate ? model.itsaeditmodel.toJSON(instance.get('editmodelConfigAttrs'))","                                   : instance.getModelToJSON(model);","                    return Lang.sub(template, jsondata);","                };","            }","        },","","        /**","         * Method that is responsible for rendering the Model into the view.","         *","         * @method _viewRenderer","         * @param {Boolean} [clear] whether to clear the view. normally you don't want this: leaving empty means the Model is drawn.","         * @private","         * @chainable","         * @since 0.1","         *","        */","        _viewRenderer : function (clear) {","          var instance = this,","              boundingBox = instance.get('boundingBox'),","              view = instance.view,","              container = view.get('container'),","              model = view.get('model'),","              html = clear ? '' : instance._modelRenderer(model);","","          // Render this view's HTML into the container element.","          // Because Y.Node.setHTML DOES NOT destroy its nodes (!) but only remove(), we destroy them ourselves first","          if (instance._isMicroTemplate || (model.itsaeditmodel && instance.get('modelEditable'))) {","              container.cleanup();","          }","          container.setHTML(html);","          // If Y.Plugin.ITSATabKeyManager is plugged in, then refocus to the first item","          if (boundingBox.get('focused') && boundingBox.itsafocusmanager) {","              boundingBox.itsafocusmanager.focusInitialItem();","          }","          return instance;","        },","","        /**","         * Cleaning up all eventlisteners","         *","         * @method _clearEventhandlers","         * @private","         * @since 0.1","         *","        */","        _clearEventhandlers : function() {","            YArray.each(","                this._eventhandlers,","                function(item){","                    item.detach();","                }","            );","        }","","    }, {","        ATTRS : {","            /**","             * Every property of the object/model can be defined as a property of configAttrs as well.","             * The value should also be an object: the config of the property that is passed to the ITSAFormElement.<br />","             * Example: <br />","             * editmodelConfigAttrs.property1 = {Object} config of property1 (as example, you should use a real property here)<br />","             * editmodelConfigAttrs.property2 = {Object} config of property2 (as example, you should use a real property here)<br />","             * editmodelConfigAttrs.property3 = {Object} config of property3 (as example, you should use a real property here)<br />","             *","             * @attribute editmodelConfigAttrs","             * @type {Object}","             * @default false","             * @since 0.1","             */","            editmodelConfigAttrs: {","                value: {},","                validator: function(v){","                    return Lang.isObject(v);","                }","            },","","            /**","             * Hash of CSS selectors mapped to events to delegate to elements matching","             * those selectors.","             *","             * CSS selectors are relative to the `contentBox` element, which is in fact","             * the view-container. Events are attached to this container (contentBox), and","             * delegation is used so that subscribers are only notified of events that occur on","             * elements inside the container that match the specified selectors. This allows the","             * contentBox to be re-rendered as needed without losing event subscriptions.","             *","             * Event handlers can be specified either as functions or as strings that map","             * to function names. IN the latter case, you must declare the functions as part","             * of the 'view'-property (which is a Y.View instance).","             *","             * The `this` object in event handlers will refer to the 'view'-property (which is a","             * Y.View instance, created during initialisation of this widget. If you'd prefer `this`","             * to be something else, use `Y.bind()` to bind a custom `this` object.","             *","             * @example","             *     var viewModel = new Y.ViewITSAViewModel({","             *         events: {","             *             // Call `this.toggle()` whenever the element with the id","             *             // \"toggle-button\" is clicked.","             *             '#toggle-button': {click: 'toggle'},","             *","             *             // Call `this.hoverOn()` when the mouse moves over any element","             *             // with the \"hoverable\" class, and `this.hoverOff()` when the","             *             // mouse moves out of any element with the \"hoverable\" class.","             *             '.hoverable': {","             *                 mouseover: 'hoverOn',","             *                 mouseout : 'hoverOff'","             *             }","             *         }","             *     });","             *","             * @attribute events","             * @type {object}","             * @default {}","             * @since 0.1","             */","            events: {","                value: {},","                validator: function(v){ return Lang.isObject(v);}","            },","","            /**","             * Makes the View to render the editable-version of the Model. Only when the Model has <b>Y.Plugin.ITSAEditModel</b> plugged in.","             *","             * @attribute modelEditable","             * @type {Boolean}","             * @default false","             * @since 0.1","             */","            modelEditable: {","                value: false,","                lazyAdd: false,","                validator: function(v){","                    return Lang.isBoolean(v);","                }","            },","","            /**","             * The Y.Model that will be rendered in the view. May also be an Object, which is handy in case the source is an","             * item of a Y.LazyModelList","             *","             * @attribute model","             * @type {Y.Model|Object}","             * @default {}","             * @since 0.1","             */","            model: {","                value: null,","                validator: function(v){ return ((v instanceof Y.Model) || Lang.isObject(v) || (v===null)); }","            },","","           /**","            * Whether the View is styled using the css of this module.","            * In fact, just the classname 'itsa-modelview-styled' is added to the boundingBox","            * and the css-rules do all the rest. The developer may override these rules, or set this value to false","            * while creatiung their own css. In the latter case it is advisable to take a look at all the css-rules","            * that are supplied by this module.","            *","            * @default true","            * @attribute styled","            * @type {Boolean}","            * @since 0.1","            */","            styled: {","                value: true,","                validator:  function(v) {","                    return Lang.isBoolean(v);","                }","            },","","        /**","         * Template to render the Model. The attribute MUST be a template that can be processed by either <i>Y.Lang.sub or Y.Template.Micro</i>,","         * where Y.Lang.sub is more lightweight.","         *","         * <b>Example with Y.Lang.sub:</b> '{slices} slice(s) of {type} pie remaining. <button class=\"eat\">Eat a Slice!</button>'","         * <b>Example with Y.Template.Micro:</b>","         * '<%= data.slices %> slice(s) of <%= data.type %> pie remaining <button class=\"eat\">Eat a Slice!</button>'","         * <b>Example 2 with Y.Template.Micro:</b>","         * '<%= data.slices %> slice(s) of <%= data.type %> pie remaining<% if (data.slices>0) {%> <button class=\"eat\">Eat a Slice!</button><% } %>'","         *","         * <u>If you set this attribute after the view is rendered, the view will be re-rendered.</u>","         *","         * @attribute template","         * @type {String}","         * @default '{clientId}'","         * @since 0.1","         */","            template: {","                value: '{clientId}',","                validator: function(v){ return Lang.isString(v); }","            }","","        }","    }",");","","}, '@VERSION@', {","    \"requires\": [","        \"base-build\",","        \"widget\",","        \"view\",","        \"template-micro\",","        \"model\",","        \"pluginhost-base\"","    ],","    \"skinnable\": true","});"];
_yuitest_coverage["build/gallery-itsaviewmodel/gallery-itsaviewmodel.js"].lines = {"1":0,"3":0,"41":0,"55":0,"57":0,"68":0,"71":0,"72":0,"74":0,"75":0,"76":0,"77":0,"83":0,"88":0,"90":0,"98":0,"140":0,"151":0,"152":0,"154":0,"158":0,"159":0,"160":0,"161":0,"162":0,"163":0,"174":0,"180":0,"184":0,"186":0,"187":0,"189":0,"190":0,"192":0,"193":0,"197":0,"201":0,"203":0,"204":0,"205":0,"206":0,"211":0,"215":0,"218":0,"219":0,"220":0,"221":0,"222":0,"227":0,"231":0,"232":0,"237":0,"241":0,"242":0,"243":0,"244":0,"245":0,"250":0,"254":0,"255":0,"256":0,"257":0,"258":0,"263":0,"267":0,"271":0,"275":0,"279":0,"283":0,"284":0,"287":0,"292":0,"296":0,"300":0,"304":0,"305":0,"306":0,"310":0,"329":0,"339":0,"348":0,"350":0,"351":0,"373":0,"376":0,"377":0,"378":0,"380":0,"381":0,"382":0,"383":0,"384":0,"386":0,"390":0,"391":0,"393":0,"409":0,"418":0,"419":0,"421":0,"423":0,"424":0,"426":0,"438":0,"441":0,"464":0,"510":0,"525":0,"540":0,"558":0,"581":0};
_yuitest_coverage["build/gallery-itsaviewmodel/gallery-itsaviewmodel.js"].functions = {"ITSANodeCleanup:55":0,"(anonymous 2):73":0,"cleanup:67":0,"initializer:139":0,"(anonymous 3):183":0,"(anonymous 4):200":0,"(anonymous 5):214":0,"(anonymous 6):230":0,"(anonymous 7):240":0,"(anonymous 8):253":0,"(anonymous 9):266":0,"(anonymous 10):274":0,"(anonymous 11):282":0,"(anonymous 12):295":0,"(anonymous 13):303":0,"bindUI:173":0,"getModelToJSON:328":0,"syncUI:338":0,"destructor:347":0,"isMicroTemplate:376":0,"_modelRenderer:383":0,"_modelRenderer:390":0,"_setTemplateRenderer:372":0,"_viewRenderer:408":0,"(anonymous 14):440":0,"_clearEventhandlers:437":0,"validator:463":0,"validator:510":0,"validator:524":0,"validator:540":0,"validator:557":0,"validator:581":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-itsaviewmodel/gallery-itsaviewmodel.js"].coveredLines = 111;
_yuitest_coverage["build/gallery-itsaviewmodel/gallery-itsaviewmodel.js"].coveredFunctions = 33;
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

_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 55);
function ITSANodeCleanup() {}

_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 57);
Y.mix(ITSANodeCleanup.prototype, {

    //
    // Cleansup the node by calling node.empty(), as well as destroying all widgets that lie
    // within the node by calling widget.destroy(true);
    //
    // @method cleanup
    // @since 0.1
    //
    //
    cleanup: function() {
        _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "cleanup", 67);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 68);
var node = this,
            YWidget = Y.Widget;

        _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 71);
if (YWidget) {
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 72);
node.all('.yui3-widget').each(
                function(widgetNode) {
                    _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "(anonymous 2)", 73);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 74);
if (node.one('#'+widgetNode.get('id'))) {
                        _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 75);
var widgetInstance = YWidget.getByNode(widgetNode);
                        _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 76);
if (widgetInstance) {
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 77);
widgetInstance.destroy();
                        }
                    }
                }
            );
        }
        _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 83);
node.empty();
    }

}, true);

_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 88);
Y.Node.ITSANodeCleanup = ITSANodeCleanup;

_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 90);
Y.Base.mix(Y.Node, [ITSANodeCleanup]);

//===============================================================================================
//
// Next we create the widget
//
//===============================================================================================

_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 98);
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
         * The function has the structure of: _modelRenderer = function(model) {return {String}};
         * @property _modelRenderer
         * @private
         * @default function(model) {return ''};
         * @type Function
        */
        _modelRenderer : null,

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
            _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "initializer", 139);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 140);
var instance = this,
                boundingBox = instance.get('boundingBox'),
                contentBox = instance.get('contentBox'),
                events = instance.get('events'),
                model = instance.get('model'),
                modelEditable = instance.get('modelEditable'),
                itsaeditmodel = (modelEditable && model.itsaeditmodel),
                template = itsaeditmodel ? model.itsaeditmodel.get('template') : instance.get('template'),
                styled = instance.get('styled'),
                view;

            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 151);
if (styled) {
                _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 152);
boundingBox.addClass(MODELVIEW_STYLED).addClass(MODELVIEW_STYLED_FORM);
            }
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 154);
view = instance.view = new Y.View({
                container: contentBox,
                model: model
            });
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 158);
view.events = events;
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 159);
view.template = template;
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 160);
instance._setTemplateRenderer(template, itsaeditmodel);
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 161);
view.render = Y.rbind(instance._viewRenderer, instance);
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 162);
if (model && model.addTarget) {
                _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 163);
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
            _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "bindUI", 173);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 174);
var instance = this,
                boundingBox = instance.get('boundingBox'),
                model = instance.get('model'),
                eventhandlers = instance._eventhandlers,
                view = instance.view;

            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 180);
eventhandlers.push(
                instance.after(
                    'modelChange',
                    function(e) {
                        _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "(anonymous 3)", 183);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 184);
var prevVal = e.prevVal,
                            newVal = e.newVal;
                        _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 186);
if (prevVal && prevVal.removeTarget) {
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 187);
prevVal.removeTarget(view);
                        }
                        _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 189);
if (newVal && newVal.addTarget) {
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 190);
newVal.addTarget(view);
                        }
                        _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 192);
view.set('model', newVal);
                        _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 193);
view.render();
                    }
                )
            );
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 197);
eventhandlers.push(
                model.after(
                    'templateChange',
                    function(e) {
                        _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "(anonymous 4)", 200);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 201);
var newTemplate = e.newVal,
                            modelEditable = instance.get('modelEditable');
                        _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 203);
if (!modelEditable || !model.itsaeditmodel) {
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 204);
view.template = newTemplate;
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 205);
instance._setTemplateRenderer(newTemplate, false);
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 206);
view.render();
                        }
                    }
                )
            );
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 211);
eventhandlers.push(
                instance.after(
                    'modelEditableChange',
                    function(e) {
                        _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "(anonymous 5)", 214);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 215);
var newEditable = e.newVal,
                            template;
                        // if model.itsaeditmodel exists, then we need to rerender
                        _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 218);
if (model.itsaeditmodel) {
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 219);
template = newEditable ? model.itsaeditmodel.get('template') : instance.get('template');
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 220);
view.template = template;
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 221);
instance._setTemplateRenderer(template, newEditable);
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 222);
view.render();
                        }
                    }
                )
            );
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 227);
eventhandlers.push(
                instance.after(
                    'editmodelConfigAttrsChange',
                    function() {
                        _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "(anonymous 6)", 230);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 231);
if (model.itsaeditmodel && instance.get('modelEditable')) {
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 232);
view.render();
                        }
                    }
                )
            );
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 237);
eventhandlers.push(
                view.after(
                    'itsaeditmodel:destroy',
                    function() {
                        _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "(anonymous 7)", 240);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 241);
if (instance.get('modelEditable')) {
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 242);
var template = instance.get('template');
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 243);
view.template = template;
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 244);
instance._setTemplateRenderer(template, false);
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 245);
view.render();
                        }
                    }
                )
            );
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 250);
eventhandlers.push(
                view.after(
                    'itsaeditmodel:pluggedin',
                    function() {
                        _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "(anonymous 8)", 253);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 254);
if (instance.get('modelEditable')) {
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 255);
var template = model.itsaeditmodel.get('template');
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 256);
view.template = template;
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 257);
instance._setTemplateRenderer(template, true);
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 258);
view.render();
                        }
                    }
                )
            );
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 263);
eventhandlers.push(
                instance.after(
                    'eventsChange',
                    function(e) {
                        _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "(anonymous 9)", 266);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 267);
view.events = e.newVal;
                    }
                )
            );
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 271);
eventhandlers.push(
                instance.after(
                    'styledChange',
                    function(e) {
                        _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "(anonymous 10)", 274);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 275);
boundingBox.toggleClass(MODELVIEW_STYLED, e.newVal).toggleClass(MODELVIEW_STYLED_FORM, e.newVal);
                    }
                )
            );
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 279);
eventhandlers.push(
                view.after(
                    '*:change',
                    function() {
                        _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "(anonymous 11)", 282);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 283);
if (!instance.get('modelEditable') || !model.itsaeditmodel) {
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 284);
view.render(false);
                        }
                        else {
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 287);
view.get('container').all('.'+ITSAFORMELEMENT_CHANGED_CLASS).removeClass(ITSAFORMELEMENT_CHANGED_CLASS);
                        }
                    }
                )
            );
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 292);
eventhandlers.push(
                view.after(
                    'model:destroy',
                    function() {
                        _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "(anonymous 12)", 295);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 296);
view.render(true);
                    }
                )
            );
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 300);
eventhandlers.push(
                boundingBox.after(
                    'click',
                    function() {
                        _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "(anonymous 13)", 303);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 304);
var itsafocusmanager = boundingBox.itsafocusmanager;
                        _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 305);
if (itsafocusmanager) {
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 306);
itsafocusmanager.retreiveFocus();
                            // this will automaticly focus the host=view-instance
                        }
                        else {
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 310);
instance.focus();
                        }
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
            _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "getModelToJSON", 328);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 329);
return (model.get && (Lang.type(model.get) === 'function')) ? model.toJSON() : model;
        },

        /**
         * Updates the widget-content by calling view.render();
         *
         * @method syncUI
         * @protected
         */
        syncUI: function() {
            _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "syncUI", 338);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 339);
this.view.render();
        },

        /**
         * Cleans up bindings
         * @method destructor
         * @protected
        */
        destructor: function() {
            _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "destructor", 347);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 348);
var instance = this;

            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 350);
instance._clearEventhandlers();
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 351);
instance.view.destroy();
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
            _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "_setTemplateRenderer", 372);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 373);
var instance = this,
                isMicroTemplate, ismicrotemplate, compiledModelEngine;

            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 376);
isMicroTemplate = function() {
                _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "isMicroTemplate", 376);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 377);
var microTemplateRegExp = /<%(.+)%>/;
                _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 378);
return microTemplateRegExp.test(template);
            };
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 380);
ismicrotemplate = instance._isMicroTemplate = isMicroTemplate();
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 381);
if (ismicrotemplate) {
                _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 382);
compiledModelEngine = YTemplateMicro.compile(template);
                _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 383);
instance._modelRenderer = function(model) {
                    _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "_modelRenderer", 383);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 384);
var jsondata = editTemplate ? model.itsaeditmodel.toJSON(instance.get('editmodelConfigAttrs'))
                                   : instance.getModelToJSON(model);
                    _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 386);
return compiledModelEngine(jsondata);
                };
            }
            else {
                _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 390);
instance._modelRenderer = function(model) {
                    _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "_modelRenderer", 390);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 391);
var jsondata = editTemplate ? model.itsaeditmodel.toJSON(instance.get('editmodelConfigAttrs'))
                                   : instance.getModelToJSON(model);
                    _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 393);
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
          _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "_viewRenderer", 408);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 409);
var instance = this,
              boundingBox = instance.get('boundingBox'),
              view = instance.view,
              container = view.get('container'),
              model = view.get('model'),
              html = clear ? '' : instance._modelRenderer(model);

          // Render this view's HTML into the container element.
          // Because Y.Node.setHTML DOES NOT destroy its nodes (!) but only remove(), we destroy them ourselves first
          _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 418);
if (instance._isMicroTemplate || (model.itsaeditmodel && instance.get('modelEditable'))) {
              _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 419);
container.cleanup();
          }
          _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 421);
container.setHTML(html);
          // If Y.Plugin.ITSATabKeyManager is plugged in, then refocus to the first item
          _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 423);
if (boundingBox.get('focused') && boundingBox.itsafocusmanager) {
              _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 424);
boundingBox.itsafocusmanager.focusInitialItem();
          }
          _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 426);
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
            _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "_clearEventhandlers", 437);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 438);
YArray.each(
                this._eventhandlers,
                function(item){
                    _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "(anonymous 14)", 440);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 441);
item.detach();
                }
            );
        }

    }, {
        ATTRS : {
            /**
             * Every property of the object/model can be defined as a property of configAttrs as well.
             * The value should also be an object: the config of the property that is passed to the ITSAFormElement.<br />
             * Example: <br />
             * editmodelConfigAttrs.property1 = {Object} config of property1 (as example, you should use a real property here)<br />
             * editmodelConfigAttrs.property2 = {Object} config of property2 (as example, you should use a real property here)<br />
             * editmodelConfigAttrs.property3 = {Object} config of property3 (as example, you should use a real property here)<br />
             *
             * @attribute editmodelConfigAttrs
             * @type {Object}
             * @default false
             * @since 0.1
             */
            editmodelConfigAttrs: {
                value: {},
                validator: function(v){
                    _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "validator", 463);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 464);
return Lang.isObject(v);
                }
            },

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
                validator: function(v){ _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "validator", 510);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 510);
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
                    _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "validator", 524);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 525);
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
                validator: function(v){ _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "validator", 540);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 540);
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
                    _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "validator", 557);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 558);
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
                validator: function(v){ _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "validator", 581);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 581);
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
