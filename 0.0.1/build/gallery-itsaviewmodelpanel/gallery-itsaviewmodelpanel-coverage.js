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
_yuitest_coverage["build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js",
    code: []
};
_yuitest_coverage["build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js"].code=["YUI.add('gallery-itsaviewmodelpanel', function (Y, NAME) {","","'use strict';","","/**"," *"," * Widget ITSAViewModelPanel"," *"," *"," * Has the same functionalities as ITSAViewModel, but will come inside a Panel (which floats by default)."," * Also has standard a 'close'-button. Using WidgetButtons functionalyties, more buttons can be added."," *"," * These buttons are available by the module and will call Model's corresponding methods:"," *"," * close (visible by default)"," * add"," * destroy"," * reset"," * save"," * submit"," *"," *"," * @class ITSAViewModelPanel"," * @constructor"," * @extends ITSAViewModel"," * @uses WidgetAutohide"," * @uses WidgetButtons"," * @uses WidgetModality"," * @uses WidgetPosition"," * @uses WidgetPositionAlign"," * @uses WidgetPositionConstrain"," * @uses WidgetStack"," * @uses WidgetStdMod"," * @since 0.1"," */","","","var getClassName = Y.ClassNameManager.getClassName,","    Lang = Y.Lang,","    FORMELEMENT = 'yui3-itsaformelement',","    FOCUSABLE = 'focusable',","    /**","     * Fired when the 'closebutton' is pressed","     * @event model:closeclick","     * @param e {EventFacade} Event Facade including:","     * @param e.buttonNode {Y.Node} ButtonNode that was clicked","     * @param e.target {Y.Model} the Model that is currently rendered in the panel","     * @since 0.1","    **/","    EVT_CLOSE_CLICK = 'closeclick',","    /**","     * Fired when the 'submitbutton' is pressed","     * @event model:submitclick","     * @param e {EventFacade} Event Facade including:","     * @param e.buttonNode {Y.Node} ButtonNode that was clicked","     * @param e.target {Y.Model} the Model that is currently rendered in the panel","     * @param e.promise {Y.Promise} the Promise that is generated to submit the Model to the server.","     * Is in fact model.submitPromise(). Look for promised response --> resolve(response, options) OR reject(reason).","     * @since 0.1","    **/","    EVT_SUBMIT_CLICK = 'submitclick',","    /**","     * Fired when the 'savebutton' is pressed","     * @event model:saveclick","     * @param e {EventFacade} Event Facade including:","     * @param e.buttonNode {Y.Node} ButtonNode that was clicked","     * @param e.target {Y.Model} the Model that is currently rendered in the panel","     * @param e.promise {Y.Promise} the Promise that is generated to save the Model to the server.","     * Is in fact model.savePromise(). Look for promised response --> resolve(response, options) OR reject(reason).","     * @since 0.1","    **/","    EVT_SAVE_CLICK = 'saveclick',","    /**","     * Fired when the 'resetbutton' is pressed","     * @event model:resetclick","     * @param e {EventFacade} Event Facade including:","     * @param e.buttonNode {Y.Node} ButtonNode that was clicked","     * @param e.target {Y.Model} the Model that is currently rendered in the panel","     * @since 0.1","    **/","    EVT_RESET_CLICK = 'resetclick',","    /**","     * Fired when the 'addbutton' is pressed","     * @event model:addclick","     * @param e {EventFacade} Event Facade including:","     * @param e.buttonNode {Y.Node} ButtonNode that was clicked","     * @param e.target {Y.Model} the Model that is currently rendered in the panel","     * @since 0.1","    **/","    EVT_ADD_CLICK = 'addclick',","    /**","     * Fired when the 'destroybutton' is pressed","     * @event model:destroyclick","     * @param e {EventFacade} Event Facade including:","     * @param e.buttonNode {Y.Node} ButtonNode that was clicked","     * @param e.target {Y.Model} the Model that is currently rendered in the panel","     * @param e.promise {Y.Promise} the Promise that is generated to destroy the Model on the server.","     * Is in fact model.destroyPromise(). Look for promised response --> resolve(response, options) OR reject(reason).","     * @since 0.1","    **/","    EVT_DESTROY_CLICK = 'destroyclick';","","Y.ITSAViewModelPanel = Y.Base.create('itsaviewmodelpanel', Y.ITSAViewModel, [","    // Other Widget extensions depend on these two.","    Y.WidgetPosition,","    Y.WidgetStdMod,","","    Y.WidgetAutohide,","    Y.WidgetButtons,","    Y.WidgetModality,","    Y.WidgetPositionAlign,","    Y.WidgetPositionConstrain,","    Y.WidgetStack","], {","","    initializer : function() {","        var instance = this;","","","        // declare bodyContent: this must be rendered.","        instance.set('bodyContent', '');","    },","","    _bindViewUI : function() {","        var instance = this,","            eventhandlers = instance._eventhandlers,","            staticPosition = instance.get('staticPosition'),","            boundingBox = instance.get('boundingBox'),","            view = instance.view,","            panelheader;","","        if (staticPosition) {","            boundingBox.addClass('itsa-staticposition');","        }","        if (instance.get('dragable') && !staticPosition) {","            panelheader = instance.getStdModNode(Y.WidgetStdMod.HEADER);","            Y.use('dd-plugin', function(Y){","                boundingBox.plug(Y.Plugin.Drag);","                if (panelheader) {","                    boundingBox.dd.addHandle('.yui3-widget-hd');","                }","            });","        }","        instance.constructor.superclass._bindViewUI.apply(instance);","        eventhandlers.push(","            view.after(","                '*:destroy',","                function(e) {","                    if (e.target instanceof Y.Model) {","                        instance.hide();","                    }","                }","            )","        );","        eventhandlers.push(","            instance.after(","                'staticPositionChange',","                function(e) {","                    var staticPosition = e.newVal;","                    boundingBox.toggleClass('itsa-staticposition', staticPosition);","                    // remove style position=relative, which is added by WidgetPosition","                    boundingBox.setStyle('position', '');","                }","            )","        );","        eventhandlers.push(","            instance.after(","                'dragableChange',","                function(e) {","                    var dragable = e.newVal;","                    if (dragable && !instance.get('staticPosition')) {","                        panelheader = instance.getStdModNode(Y.WidgetStdMod.HEADER);","                        Y.use('dd-plugin', function(Y){","                            boundingBox.plug(Y.Plugin.Drag);","                            if (panelheader) {","                                boundingBox.dd.addHandle('.yui3-widget-hd');","                            }","                        });","                    }","                    else {","                        boundingBox.unplug('dd');","                    }","                }","            )","        );","    },","","    /**","     * Function for the addbutton. Adds a new model and fires an event.","     *","     * @method _addModel","     * @private","     * @protected","    */","    _addModel : function(e) {","        var instance = this,","            model = instance.get('model'),","            ModelClass, currentConfig, newModel;","","        if (model) {","            e.buttonNode = e.target;","            e.target = model;","            e.type = EVT_ADD_CLICK;","            ModelClass = instance.get('newModelClass');","            newModel = new ModelClass();","            if (model.hasPlugin('itsaeditmodel')) {","                currentConfig = Y.clone(model.itsaeditmodel.getAttrs());","                Y.use('gallery-itsaeditmodel', function(Y) {","                    newModel.plug(Y.Plugin.ITSAEditModel, currentConfig);","                });","            }","            e.newModel = newModel;","            model.fire(EVT_ADD_CLICK, e);","        }","    },","","    /**","     * Function for the closebutton. Closes the panel the model and fires an event.","     *","     * @method _closeModel","     * @private","     * @protected","    */","    _closeModel : function(e) {","        var instance = this,","            model = instance.get('model');","","        if (model) {","            e.buttonNode = e.target;","            e.target = model;","            e.type = EVT_CLOSE_CLICK;","            instance.hide();","            model.fire(EVT_CLOSE_CLICK, e);","        }","    },","","    /**","     * Function for the destroybutton. Destroys the model and fires an event.","     *","     * @method _destroyModel","     * @private","     * @protected","    */","    _destroyModel : function(e) {","        var instance = this,","            model = instance.get('model'),","            syncOptions, options;","","        if (model) {","            e.buttonNode = e.target;","            e.target = model;","            e.type = EVT_DESTROY_CLICK;","            syncOptions = instance.get('syncOptions');","            options = Y.merge({remove: true}, syncOptions.destroy || {});","            e.promise = model.destroyPromise(options);","            model.fire(EVT_DESTROY_CLICK, e);","        }","    },","","    /**","     * Function for the resetbutton. Resets the model and fires an event.","     *","     * @method _resetModel","     * @private","     * @protected","    */","    _resetModel : function(e) {","        var instance = this,","            model = instance.get('model'),","            button;","","        if (model) {","            button = e.target,","            // set the focus manually. This will cause the View to be focussed as well --> now the focusmanager works for this View-instance","            button.focus();","            e.buttonNode = button;","            e.target = model;","            e.type = EVT_RESET_CLICK;","            model.fire(EVT_RESET_CLICK, e);","        }","    },","","    /**","     * Function for the savebutton. Saves the model and fires an event.","     *","     * @method _saveModel","     * @private","     * @protected","    */","    _saveModel : function(e) {","        var instance = this,","            model = instance.get('model'),","            actionAfterSave = instance.get('actionAfterSave'),","            button, syncOptions, options;","","        if (model) {","            button = e.target,","            // set the focus manually. This will cause the View to be focussed as well --> now the focusmanager works for this View-instance","            button.focus();","            e.buttonNode = button;","            e.target = model;","            e.type = EVT_SAVE_CLICK;","            syncOptions = instance.get('syncOptions');","            options = syncOptions.save || {};","            e.promise = model.savePromise(options);","            model.fire(EVT_SAVE_CLICK, e);","            if (actionAfterSave===1) {","                instance.hide();","            }","            if (actionAfterSave===2) {","                model.unplug('itsaeditmodel');","            }","        }","    },","","    /**","     * Function for the submitbutton. Submits the model and fires an event.","     *","     * @method _submitModel","     * @private","     * @protected","    */","    _submitModel : function(e) {","        var instance = this,","            model = instance.get('model'),","            actionAfterSubmit = instance.get('actionAfterSubmit'),","            button, syncOptions, options;","","        if (model) {","            button = e.target,","            // set the focus manually. This will cause the View to be focussed as well --> now the focusmanager works for this View-instance","            button.focus();","            e.buttonNode = button;","            e.target = model;","            e.type = EVT_SUBMIT_CLICK;","            syncOptions = instance.get('syncOptions');","            options = syncOptions.submit || {};","            e.promise = model.submitPromise(options);","            model.fire(EVT_SUBMIT_CLICK, e);","            if (actionAfterSubmit===1) {","                instance.hide();","            }","            if (actionAfterSubmit===2) {","                model.unplug('itsaeditmodel');","            }","        }","    },","","    /**","     * returns the view-container, which equals this.get('contentBox')","     *","     * @method _getViewContainer","     * @private","    */","    _getViewContainer : function() {","        return this.getStdModNode(Y.WidgetStdMod.BODY);","    },","","    /**","     * Calls the original Y.Widget.renderer. Needs to be overridden, because now we need to go 2 levels up.","     *","     * @method _widgetRenderer","     * @private","     * @protected","    */","    _widgetRenderer : function() {","        var instance = this;","","        instance.constructor.superclass.constructor.superclass.renderer.apply(instance);","    },","","    /**","     * Default setter for zIndex attribute changes. Normalizes zIndex values to","     * numbers, converting non-numerical values to 1.","     *","     * @method _setZIndex","     * @protected","     * @param {String | Number} zIndex","     * @return {Number} Normalized zIndex","     */","    _setZIndex: function(zIndex) {","        if (typeof zIndex === 'string') {","            zIndex = parseInt(zIndex, 10);","        }","        if (typeof zIndex !== 'number') {","            zIndex = 1;","        }","        if (zIndex<1) {","            zIndex = 1;","        }","        return zIndex;","    },","","    _uiSetXY : function(val) {","        var instance = this;","        if (!instance.get('staticPosition')) {","            instance._posNode.setXY(val);","        }","    },","","    // -- Public Properties ----------------------------------------------------","","    /**","     * Collection of predefined buttons mapped from name => config.","     *","     * ITSAViewModelPanel includes \"close\", \"add\", \"destroy\", \"reset\", \"save\" and \"submit\" buttons which can be use by name.","     * When the close button is in the header (which is the default), it will look like: [x].","     *","     * See `addButton()` for a list of possible configuration values.","     *","     * @example","     *     // ITSAViewModelPanel with save-button in footer.","     *     var viewmodelpanel = new Y.ITSAViewModelPanel({","     *         buttons: ['save']","     *     });","     *","     *     // ITSAViewModelPanel with reset- and close-button in footer and 'save-button' in the header.","     *     var otherITSAViewModelPanel = new Y.ITSAViewModelPanel({","     *         buttons: {","     *             header: ['save']","     *             footer: ['reset', close']","     *         }","     *     });","     *","     * @property BUTTONS","     * @type Object","     * @default {close: {}}","     * @since 0.1","     *","    **/","    BUTTONS: {","        add: {","            label  : 'Add',","            action : '_addModel',","","            // Uses `type=\"button\"` so the button's default action can still","            // occur but it won't cause things like a form to submit.","            template  : '<button type=\"button\" />',","            classNames: [FORMELEMENT+'-add', FOCUSABLE]","        },","        close: {","            label  : 'Close',","            action : '_closeModel',","            section: 'header',","","            // Uses `type=\"button\"` so the button's default action can still","            // occur but it won't cause things like a form to submit.","            template  : '<button type=\"button\" />',","            classNames: getClassName('button', 'close')","        },","        destroy: {","            label  : 'Destroy',","            action : '_destroyModel',","","            // Uses `type=\"button\"` so the button's default action can still","            // occur but it won't cause things like a form to submit.","            template  : '<button type=\"button\" />',","            classNames: [FORMELEMENT+'-destroy', FOCUSABLE]","        },","        reset: {","            label  : 'Reset',","            action : '_resetModel',","","            // Uses `type=\"button\"` so the button's default action can still","            // occur but it won't cause things like a form to submit.","            template  : '<button type=\"button\" />',","            classNames: [FORMELEMENT+'-reset', FOCUSABLE]","        },","        save: {","            label  : 'Save',","            action : '_saveModel',","","            // Uses `type=\"button\"` so the button's default action can still","            // occur but it won't cause things like a form to submit.","            template  : '<button type=\"button\" />',","            classNames: [FORMELEMENT+'-save', FOCUSABLE]","        },","        submit: {","            label  : 'Submit',","            action : '_submitModel',","","            // Uses `type=\"button\"` so the button's default action can still","            // occur but it won't cause things like a form to submit.","            template  : '<button type=\"button\" />',","            classNames: [FORMELEMENT+'-submit', FOCUSABLE]","        }","    }","}, {","    ATTRS: {","        /**","         * Change Panel-appearance after save is clicked.<br />","         * 0 = no action<br />","         * 1 = close panel<br />","         * 2 = unplug Y.Plugin.ITSAEditModel, resulting in rendering the original template<br />","         * @attribute actionAfterSave","         * @type Int","         * @default 0","         * @since 0.1","        */","        actionAfterSave : {","            value: 0,","            validator: function(val) {","                return (typeof val === 'number') && (val>=0) && (val<=2);","            }","        },","","        /**","         * Change Panel-appearance after submit is clicked.<br />","         * 0 = no action<br />","         * 1 = close panel<br />","         * 2 = unplug Y.Plugin.ITSAEditModel, resulting in rendering the original template<br />","         * @attribute actionAfterSubmit","         * @type Int","         * @default 0","         * @since 0.1","        */","        actionAfterSubmit : {","            value: 0,","            validator: function(val) {","                return (typeof val === 'number') && (val>=0) && (val<=2);","            }","        },","","        /**","         * Defenitions of the buttons that are on the panel. The buttons you want to show should be passed as an [String],","         * where the names can be looked up into the property BUTTONS. Values to be used are:","         * \"close\", \"add\", \"destroy\", \"reset\", \"save\" and \"submit\" which can be use by name. You can also specify the section","         * where the buttons should be rendered, in case you want it different from the default.","         * @attribute buttons","         * @type [String]","         * @default ['close']","         * @example","         *     // ITSAViewModelPanel with save-button in footer.","         *     var viewmodelpanel = new Y.ITSAViewModelPanel({","         *         buttons: ['save']","         *     });","         *","         *     // ITSAViewModelPanel with reset- and close-button in footer and 'save-button' in the header.","         *     var otherITSAViewModelPanel = new Y.ITSAViewModelPanel({","         *         buttons: {","         *             header: ['save']","         *             footer: ['reset', close']","         *         }","         *     });","         * @since 0.1","        */","        buttons: {","            value: ['close']","        },","","        /**","         * Makes the panel dragable. Only applyable when staticPosition=false.","         * Cautious: if you set dragable and don't have a header, then the panel gets dragable by its container. This will lead","         * text to be unselectable. If there is a header, then the panel is only dragable by its header and bodytext is selectable.","         * @attribute dragable","         * @type Boolean","         * @default false","         * @since 0.1","        */","        dragable : {","            value: false,","            validator: function(val) {","                return (typeof val === 'boolean');","            }","        },","","        /**","         * Title to appear in the header","         * @attribute title","         * @type String","         * @default null","         * @since 0.1","        */","        title : {","            value: null,","            lazyAdd: false,","            validator: function(val) {","                return (typeof val === 'string');","            },","            setter: function(val) {","                this.set('headerContent', val);","            }","        },","","        /**","         * Title to appear in the footer","         * @attribute statusText","         * @type String","         * @default null","         * @since 0.1","        */","        statusText : {","            value: null,","            lazyAdd: false,","            validator: function(val) {","                return (typeof val === 'string');","            },","            setter: function(val) {","                this.set('footerContent', val);","            }","        },","","        /**","         * Specifies the Class of new created Models (that is, when a model:addclick event occurs).","         * @attribute newModelClass","         * @type Model","         * @default Y.Model","         * @since 0.1","        */","        newModelClass : {","            value: Y.Model","        },","","        /**","         * Makes the panel to be static (and able to go inline) instead op foated. When static positioned, you cannot use","         * the methods provided by WidgetPosition, WidgetPositionAlign and WidgetPositionConstrain and you cannot set 'dragable'","         * @attribute staticPosition","         * @type Boolean","         * @default false","         * @since 0.1","        */","        staticPosition : {","            value: false,","            validator: function(val) {","                return (typeof val === 'boolean');","            }","        },","","        /**","         * Object with the properties: <b>destroy</b>, <b>save</b> and <b>submit</b>. For every property you might want to","         * specify the options-object that will be passed through to the sync- or destroy-method. The destroymethod will","         * <i>always</i> be called with 'remove=true', in order to call the sync-method.","         * @attribute syncOptions","         * @type Object","         * @default {}","         * @since 0.1","        */","        syncOptions : {","            value: {},","            validator: function(val) {","                return Lang.isObject(val);","            }","        },","","        /**","         * @attribute zIndex","         * @type number","         * @default 1","         * @description The z-index to apply to the Widgets boundingBox. Non-numerical values for","         * zIndex will be converted to 1. Minumum value = 1.","         */","        zIndex: {","            value : 1,","            setter: '_setZIndex'","        }","","    }","});","","}, '@VERSION@', {","    \"requires\": [","        \"base-build\",","        \"classnamemanager\",","        \"pluginhost-base\",","        \"model\",","        \"gallery-itsaviewmodel\",","        \"widget-autohide\",","        \"widget-buttons\",","        \"widget-modality\",","        \"widget-position\",","        \"widget-position-align\",","        \"widget-position-constrain\",","        \"widget-stack\",","        \"widget-stdmod\"","    ],","    \"skinnable\": true","});"];
_yuitest_coverage["build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js"].lines = {"1":0,"3":0,"38":0,"103":0,"117":0,"121":0,"125":0,"132":0,"133":0,"135":0,"136":0,"137":0,"138":0,"139":0,"140":0,"144":0,"145":0,"149":0,"150":0,"155":0,"159":0,"160":0,"162":0,"166":0,"170":0,"171":0,"172":0,"173":0,"174":0,"175":0,"176":0,"181":0,"196":0,"200":0,"201":0,"202":0,"203":0,"204":0,"205":0,"206":0,"207":0,"208":0,"209":0,"212":0,"213":0,"225":0,"228":0,"229":0,"230":0,"231":0,"232":0,"233":0,"245":0,"249":0,"250":0,"251":0,"252":0,"253":0,"254":0,"255":0,"256":0,"268":0,"272":0,"273":0,"276":0,"277":0,"278":0,"279":0,"291":0,"296":0,"297":0,"300":0,"301":0,"302":0,"303":0,"304":0,"305":0,"306":0,"307":0,"308":0,"310":0,"311":0,"324":0,"329":0,"330":0,"333":0,"334":0,"335":0,"336":0,"337":0,"338":0,"339":0,"340":0,"341":0,"343":0,"344":0,"356":0,"367":0,"369":0,"382":0,"383":0,"385":0,"386":0,"388":0,"389":0,"391":0,"395":0,"396":0,"397":0,"503":0,"520":0,"563":0,"578":0,"581":0,"596":0,"599":0,"625":0,"641":0};
_yuitest_coverage["build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js"].functions = {"initializer:116":0,"(anonymous 2):137":0,"(anonymous 3):148":0,"(anonymous 4):158":0,"(anonymous 6):173":0,"(anonymous 5):169":0,"_bindViewUI:124":0,"(anonymous 7):208":0,"_addModel:195":0,"_closeModel:224":0,"_destroyModel:244":0,"_resetModel:267":0,"_saveModel:290":0,"_submitModel:323":0,"_getViewContainer:355":0,"_widgetRenderer:366":0,"_setZIndex:381":0,"_uiSetXY:394":0,"validator:502":0,"validator:519":0,"validator:562":0,"validator:577":0,"setter:580":0,"validator:595":0,"setter:598":0,"validator:624":0,"validator:640":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js"].coveredLines = 118;
_yuitest_coverage["build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js"].coveredFunctions = 28;
_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 1);
YUI.add('gallery-itsaviewmodelpanel', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 3);
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
 * @extends ITSAViewModel
 * @uses WidgetAutohide
 * @uses WidgetButtons
 * @uses WidgetModality
 * @uses WidgetPosition
 * @uses WidgetPositionAlign
 * @uses WidgetPositionConstrain
 * @uses WidgetStack
 * @uses WidgetStdMod
 * @since 0.1
 */


_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 38);
var getClassName = Y.ClassNameManager.getClassName,
    Lang = Y.Lang,
    FORMELEMENT = 'yui3-itsaformelement',
    FOCUSABLE = 'focusable',
    /**
     * Fired when the 'closebutton' is pressed
     * @event model:closeclick
     * @param e {EventFacade} Event Facade including:
     * @param e.buttonNode {Y.Node} ButtonNode that was clicked
     * @param e.target {Y.Model} the Model that is currently rendered in the panel
     * @since 0.1
    **/
    EVT_CLOSE_CLICK = 'closeclick',
    /**
     * Fired when the 'submitbutton' is pressed
     * @event model:submitclick
     * @param e {EventFacade} Event Facade including:
     * @param e.buttonNode {Y.Node} ButtonNode that was clicked
     * @param e.target {Y.Model} the Model that is currently rendered in the panel
     * @param e.promise {Y.Promise} the Promise that is generated to submit the Model to the server.
     * Is in fact model.submitPromise(). Look for promised response --> resolve(response, options) OR reject(reason).
     * @since 0.1
    **/
    EVT_SUBMIT_CLICK = 'submitclick',
    /**
     * Fired when the 'savebutton' is pressed
     * @event model:saveclick
     * @param e {EventFacade} Event Facade including:
     * @param e.buttonNode {Y.Node} ButtonNode that was clicked
     * @param e.target {Y.Model} the Model that is currently rendered in the panel
     * @param e.promise {Y.Promise} the Promise that is generated to save the Model to the server.
     * Is in fact model.savePromise(). Look for promised response --> resolve(response, options) OR reject(reason).
     * @since 0.1
    **/
    EVT_SAVE_CLICK = 'saveclick',
    /**
     * Fired when the 'resetbutton' is pressed
     * @event model:resetclick
     * @param e {EventFacade} Event Facade including:
     * @param e.buttonNode {Y.Node} ButtonNode that was clicked
     * @param e.target {Y.Model} the Model that is currently rendered in the panel
     * @since 0.1
    **/
    EVT_RESET_CLICK = 'resetclick',
    /**
     * Fired when the 'addbutton' is pressed
     * @event model:addclick
     * @param e {EventFacade} Event Facade including:
     * @param e.buttonNode {Y.Node} ButtonNode that was clicked
     * @param e.target {Y.Model} the Model that is currently rendered in the panel
     * @since 0.1
    **/
    EVT_ADD_CLICK = 'addclick',
    /**
     * Fired when the 'destroybutton' is pressed
     * @event model:destroyclick
     * @param e {EventFacade} Event Facade including:
     * @param e.buttonNode {Y.Node} ButtonNode that was clicked
     * @param e.target {Y.Model} the Model that is currently rendered in the panel
     * @param e.promise {Y.Promise} the Promise that is generated to destroy the Model on the server.
     * Is in fact model.destroyPromise(). Look for promised response --> resolve(response, options) OR reject(reason).
     * @since 0.1
    **/
    EVT_DESTROY_CLICK = 'destroyclick';

_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 103);
Y.ITSAViewModelPanel = Y.Base.create('itsaviewmodelpanel', Y.ITSAViewModel, [
    // Other Widget extensions depend on these two.
    Y.WidgetPosition,
    Y.WidgetStdMod,

    Y.WidgetAutohide,
    Y.WidgetButtons,
    Y.WidgetModality,
    Y.WidgetPositionAlign,
    Y.WidgetPositionConstrain,
    Y.WidgetStack
], {

    initializer : function() {
        _yuitest_coverfunc("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", "initializer", 116);
_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 117);
var instance = this;


        // declare bodyContent: this must be rendered.
        _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 121);
instance.set('bodyContent', '');
    },

    _bindViewUI : function() {
        _yuitest_coverfunc("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", "_bindViewUI", 124);
_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 125);
var instance = this,
            eventhandlers = instance._eventhandlers,
            staticPosition = instance.get('staticPosition'),
            boundingBox = instance.get('boundingBox'),
            view = instance.view,
            panelheader;

        _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 132);
if (staticPosition) {
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 133);
boundingBox.addClass('itsa-staticposition');
        }
        _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 135);
if (instance.get('dragable') && !staticPosition) {
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 136);
panelheader = instance.getStdModNode(Y.WidgetStdMod.HEADER);
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 137);
Y.use('dd-plugin', function(Y){
                _yuitest_coverfunc("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", "(anonymous 2)", 137);
_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 138);
boundingBox.plug(Y.Plugin.Drag);
                _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 139);
if (panelheader) {
                    _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 140);
boundingBox.dd.addHandle('.yui3-widget-hd');
                }
            });
        }
        _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 144);
instance.constructor.superclass._bindViewUI.apply(instance);
        _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 145);
eventhandlers.push(
            view.after(
                '*:destroy',
                function(e) {
                    _yuitest_coverfunc("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", "(anonymous 3)", 148);
_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 149);
if (e.target instanceof Y.Model) {
                        _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 150);
instance.hide();
                    }
                }
            )
        );
        _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 155);
eventhandlers.push(
            instance.after(
                'staticPositionChange',
                function(e) {
                    _yuitest_coverfunc("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", "(anonymous 4)", 158);
_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 159);
var staticPosition = e.newVal;
                    _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 160);
boundingBox.toggleClass('itsa-staticposition', staticPosition);
                    // remove style position=relative, which is added by WidgetPosition
                    _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 162);
boundingBox.setStyle('position', '');
                }
            )
        );
        _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 166);
eventhandlers.push(
            instance.after(
                'dragableChange',
                function(e) {
                    _yuitest_coverfunc("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", "(anonymous 5)", 169);
_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 170);
var dragable = e.newVal;
                    _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 171);
if (dragable && !instance.get('staticPosition')) {
                        _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 172);
panelheader = instance.getStdModNode(Y.WidgetStdMod.HEADER);
                        _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 173);
Y.use('dd-plugin', function(Y){
                            _yuitest_coverfunc("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", "(anonymous 6)", 173);
_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 174);
boundingBox.plug(Y.Plugin.Drag);
                            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 175);
if (panelheader) {
                                _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 176);
boundingBox.dd.addHandle('.yui3-widget-hd');
                            }
                        });
                    }
                    else {
                        _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 181);
boundingBox.unplug('dd');
                    }
                }
            )
        );
    },

    /**
     * Function for the addbutton. Adds a new model and fires an event.
     *
     * @method _addModel
     * @private
     * @protected
    */
    _addModel : function(e) {
        _yuitest_coverfunc("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", "_addModel", 195);
_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 196);
var instance = this,
            model = instance.get('model'),
            ModelClass, currentConfig, newModel;

        _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 200);
if (model) {
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 201);
e.buttonNode = e.target;
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 202);
e.target = model;
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 203);
e.type = EVT_ADD_CLICK;
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 204);
ModelClass = instance.get('newModelClass');
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 205);
newModel = new ModelClass();
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 206);
if (model.hasPlugin('itsaeditmodel')) {
                _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 207);
currentConfig = Y.clone(model.itsaeditmodel.getAttrs());
                _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 208);
Y.use('gallery-itsaeditmodel', function(Y) {
                    _yuitest_coverfunc("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", "(anonymous 7)", 208);
_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 209);
newModel.plug(Y.Plugin.ITSAEditModel, currentConfig);
                });
            }
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 212);
e.newModel = newModel;
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 213);
model.fire(EVT_ADD_CLICK, e);
        }
    },

    /**
     * Function for the closebutton. Closes the panel the model and fires an event.
     *
     * @method _closeModel
     * @private
     * @protected
    */
    _closeModel : function(e) {
        _yuitest_coverfunc("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", "_closeModel", 224);
_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 225);
var instance = this,
            model = instance.get('model');

        _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 228);
if (model) {
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 229);
e.buttonNode = e.target;
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 230);
e.target = model;
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 231);
e.type = EVT_CLOSE_CLICK;
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 232);
instance.hide();
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 233);
model.fire(EVT_CLOSE_CLICK, e);
        }
    },

    /**
     * Function for the destroybutton. Destroys the model and fires an event.
     *
     * @method _destroyModel
     * @private
     * @protected
    */
    _destroyModel : function(e) {
        _yuitest_coverfunc("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", "_destroyModel", 244);
_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 245);
var instance = this,
            model = instance.get('model'),
            syncOptions, options;

        _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 249);
if (model) {
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 250);
e.buttonNode = e.target;
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 251);
e.target = model;
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 252);
e.type = EVT_DESTROY_CLICK;
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 253);
syncOptions = instance.get('syncOptions');
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 254);
options = Y.merge({remove: true}, syncOptions.destroy || {});
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 255);
e.promise = model.destroyPromise(options);
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 256);
model.fire(EVT_DESTROY_CLICK, e);
        }
    },

    /**
     * Function for the resetbutton. Resets the model and fires an event.
     *
     * @method _resetModel
     * @private
     * @protected
    */
    _resetModel : function(e) {
        _yuitest_coverfunc("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", "_resetModel", 267);
_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 268);
var instance = this,
            model = instance.get('model'),
            button;

        _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 272);
if (model) {
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 273);
button = e.target,
            // set the focus manually. This will cause the View to be focussed as well --> now the focusmanager works for this View-instance
            button.focus();
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 276);
e.buttonNode = button;
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 277);
e.target = model;
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 278);
e.type = EVT_RESET_CLICK;
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 279);
model.fire(EVT_RESET_CLICK, e);
        }
    },

    /**
     * Function for the savebutton. Saves the model and fires an event.
     *
     * @method _saveModel
     * @private
     * @protected
    */
    _saveModel : function(e) {
        _yuitest_coverfunc("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", "_saveModel", 290);
_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 291);
var instance = this,
            model = instance.get('model'),
            actionAfterSave = instance.get('actionAfterSave'),
            button, syncOptions, options;

        _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 296);
if (model) {
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 297);
button = e.target,
            // set the focus manually. This will cause the View to be focussed as well --> now the focusmanager works for this View-instance
            button.focus();
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 300);
e.buttonNode = button;
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 301);
e.target = model;
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 302);
e.type = EVT_SAVE_CLICK;
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 303);
syncOptions = instance.get('syncOptions');
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 304);
options = syncOptions.save || {};
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 305);
e.promise = model.savePromise(options);
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 306);
model.fire(EVT_SAVE_CLICK, e);
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 307);
if (actionAfterSave===1) {
                _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 308);
instance.hide();
            }
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 310);
if (actionAfterSave===2) {
                _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 311);
model.unplug('itsaeditmodel');
            }
        }
    },

    /**
     * Function for the submitbutton. Submits the model and fires an event.
     *
     * @method _submitModel
     * @private
     * @protected
    */
    _submitModel : function(e) {
        _yuitest_coverfunc("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", "_submitModel", 323);
_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 324);
var instance = this,
            model = instance.get('model'),
            actionAfterSubmit = instance.get('actionAfterSubmit'),
            button, syncOptions, options;

        _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 329);
if (model) {
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 330);
button = e.target,
            // set the focus manually. This will cause the View to be focussed as well --> now the focusmanager works for this View-instance
            button.focus();
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 333);
e.buttonNode = button;
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 334);
e.target = model;
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 335);
e.type = EVT_SUBMIT_CLICK;
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 336);
syncOptions = instance.get('syncOptions');
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 337);
options = syncOptions.submit || {};
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 338);
e.promise = model.submitPromise(options);
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 339);
model.fire(EVT_SUBMIT_CLICK, e);
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 340);
if (actionAfterSubmit===1) {
                _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 341);
instance.hide();
            }
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 343);
if (actionAfterSubmit===2) {
                _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 344);
model.unplug('itsaeditmodel');
            }
        }
    },

    /**
     * returns the view-container, which equals this.get('contentBox')
     *
     * @method _getViewContainer
     * @private
    */
    _getViewContainer : function() {
        _yuitest_coverfunc("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", "_getViewContainer", 355);
_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 356);
return this.getStdModNode(Y.WidgetStdMod.BODY);
    },

    /**
     * Calls the original Y.Widget.renderer. Needs to be overridden, because now we need to go 2 levels up.
     *
     * @method _widgetRenderer
     * @private
     * @protected
    */
    _widgetRenderer : function() {
        _yuitest_coverfunc("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", "_widgetRenderer", 366);
_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 367);
var instance = this;

        _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 369);
instance.constructor.superclass.constructor.superclass.renderer.apply(instance);
    },

    /**
     * Default setter for zIndex attribute changes. Normalizes zIndex values to
     * numbers, converting non-numerical values to 1.
     *
     * @method _setZIndex
     * @protected
     * @param {String | Number} zIndex
     * @return {Number} Normalized zIndex
     */
    _setZIndex: function(zIndex) {
        _yuitest_coverfunc("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", "_setZIndex", 381);
_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 382);
if (typeof zIndex === 'string') {
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 383);
zIndex = parseInt(zIndex, 10);
        }
        _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 385);
if (typeof zIndex !== 'number') {
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 386);
zIndex = 1;
        }
        _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 388);
if (zIndex<1) {
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 389);
zIndex = 1;
        }
        _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 391);
return zIndex;
    },

    _uiSetXY : function(val) {
        _yuitest_coverfunc("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", "_uiSetXY", 394);
_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 395);
var instance = this;
        _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 396);
if (!instance.get('staticPosition')) {
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 397);
instance._posNode.setXY(val);
        }
    },

    // -- Public Properties ----------------------------------------------------

    /**
     * Collection of predefined buttons mapped from name => config.
     *
     * ITSAViewModelPanel includes "close", "add", "destroy", "reset", "save" and "submit" buttons which can be use by name.
     * When the close button is in the header (which is the default), it will look like: [x].
     *
     * See `addButton()` for a list of possible configuration values.
     *
     * @example
     *     // ITSAViewModelPanel with save-button in footer.
     *     var viewmodelpanel = new Y.ITSAViewModelPanel({
     *         buttons: ['save']
     *     });
     *
     *     // ITSAViewModelPanel with reset- and close-button in footer and 'save-button' in the header.
     *     var otherITSAViewModelPanel = new Y.ITSAViewModelPanel({
     *         buttons: {
     *             header: ['save']
     *             footer: ['reset', close']
     *         }
     *     });
     *
     * @property BUTTONS
     * @type Object
     * @default {close: {}}
     * @since 0.1
     *
    **/
    BUTTONS: {
        add: {
            label  : 'Add',
            action : '_addModel',

            // Uses `type="button"` so the button's default action can still
            // occur but it won't cause things like a form to submit.
            template  : '<button type="button" />',
            classNames: [FORMELEMENT+'-add', FOCUSABLE]
        },
        close: {
            label  : 'Close',
            action : '_closeModel',
            section: 'header',

            // Uses `type="button"` so the button's default action can still
            // occur but it won't cause things like a form to submit.
            template  : '<button type="button" />',
            classNames: getClassName('button', 'close')
        },
        destroy: {
            label  : 'Destroy',
            action : '_destroyModel',

            // Uses `type="button"` so the button's default action can still
            // occur but it won't cause things like a form to submit.
            template  : '<button type="button" />',
            classNames: [FORMELEMENT+'-destroy', FOCUSABLE]
        },
        reset: {
            label  : 'Reset',
            action : '_resetModel',

            // Uses `type="button"` so the button's default action can still
            // occur but it won't cause things like a form to submit.
            template  : '<button type="button" />',
            classNames: [FORMELEMENT+'-reset', FOCUSABLE]
        },
        save: {
            label  : 'Save',
            action : '_saveModel',

            // Uses `type="button"` so the button's default action can still
            // occur but it won't cause things like a form to submit.
            template  : '<button type="button" />',
            classNames: [FORMELEMENT+'-save', FOCUSABLE]
        },
        submit: {
            label  : 'Submit',
            action : '_submitModel',

            // Uses `type="button"` so the button's default action can still
            // occur but it won't cause things like a form to submit.
            template  : '<button type="button" />',
            classNames: [FORMELEMENT+'-submit', FOCUSABLE]
        }
    }
}, {
    ATTRS: {
        /**
         * Change Panel-appearance after save is clicked.<br />
         * 0 = no action<br />
         * 1 = close panel<br />
         * 2 = unplug Y.Plugin.ITSAEditModel, resulting in rendering the original template<br />
         * @attribute actionAfterSave
         * @type Int
         * @default 0
         * @since 0.1
        */
        actionAfterSave : {
            value: 0,
            validator: function(val) {
                _yuitest_coverfunc("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", "validator", 502);
_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 503);
return (typeof val === 'number') && (val>=0) && (val<=2);
            }
        },

        /**
         * Change Panel-appearance after submit is clicked.<br />
         * 0 = no action<br />
         * 1 = close panel<br />
         * 2 = unplug Y.Plugin.ITSAEditModel, resulting in rendering the original template<br />
         * @attribute actionAfterSubmit
         * @type Int
         * @default 0
         * @since 0.1
        */
        actionAfterSubmit : {
            value: 0,
            validator: function(val) {
                _yuitest_coverfunc("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", "validator", 519);
_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 520);
return (typeof val === 'number') && (val>=0) && (val<=2);
            }
        },

        /**
         * Defenitions of the buttons that are on the panel. The buttons you want to show should be passed as an [String],
         * where the names can be looked up into the property BUTTONS. Values to be used are:
         * "close", "add", "destroy", "reset", "save" and "submit" which can be use by name. You can also specify the section
         * where the buttons should be rendered, in case you want it different from the default.
         * @attribute buttons
         * @type [String]
         * @default ['close']
         * @example
         *     // ITSAViewModelPanel with save-button in footer.
         *     var viewmodelpanel = new Y.ITSAViewModelPanel({
         *         buttons: ['save']
         *     });
         *
         *     // ITSAViewModelPanel with reset- and close-button in footer and 'save-button' in the header.
         *     var otherITSAViewModelPanel = new Y.ITSAViewModelPanel({
         *         buttons: {
         *             header: ['save']
         *             footer: ['reset', close']
         *         }
         *     });
         * @since 0.1
        */
        buttons: {
            value: ['close']
        },

        /**
         * Makes the panel dragable. Only applyable when staticPosition=false.
         * Cautious: if you set dragable and don't have a header, then the panel gets dragable by its container. This will lead
         * text to be unselectable. If there is a header, then the panel is only dragable by its header and bodytext is selectable.
         * @attribute dragable
         * @type Boolean
         * @default false
         * @since 0.1
        */
        dragable : {
            value: false,
            validator: function(val) {
                _yuitest_coverfunc("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", "validator", 562);
_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 563);
return (typeof val === 'boolean');
            }
        },

        /**
         * Title to appear in the header
         * @attribute title
         * @type String
         * @default null
         * @since 0.1
        */
        title : {
            value: null,
            lazyAdd: false,
            validator: function(val) {
                _yuitest_coverfunc("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", "validator", 577);
_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 578);
return (typeof val === 'string');
            },
            setter: function(val) {
                _yuitest_coverfunc("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", "setter", 580);
_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 581);
this.set('headerContent', val);
            }
        },

        /**
         * Title to appear in the footer
         * @attribute statusText
         * @type String
         * @default null
         * @since 0.1
        */
        statusText : {
            value: null,
            lazyAdd: false,
            validator: function(val) {
                _yuitest_coverfunc("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", "validator", 595);
_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 596);
return (typeof val === 'string');
            },
            setter: function(val) {
                _yuitest_coverfunc("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", "setter", 598);
_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 599);
this.set('footerContent', val);
            }
        },

        /**
         * Specifies the Class of new created Models (that is, when a model:addclick event occurs).
         * @attribute newModelClass
         * @type Model
         * @default Y.Model
         * @since 0.1
        */
        newModelClass : {
            value: Y.Model
        },

        /**
         * Makes the panel to be static (and able to go inline) instead op foated. When static positioned, you cannot use
         * the methods provided by WidgetPosition, WidgetPositionAlign and WidgetPositionConstrain and you cannot set 'dragable'
         * @attribute staticPosition
         * @type Boolean
         * @default false
         * @since 0.1
        */
        staticPosition : {
            value: false,
            validator: function(val) {
                _yuitest_coverfunc("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", "validator", 624);
_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 625);
return (typeof val === 'boolean');
            }
        },

        /**
         * Object with the properties: <b>destroy</b>, <b>save</b> and <b>submit</b>. For every property you might want to
         * specify the options-object that will be passed through to the sync- or destroy-method. The destroymethod will
         * <i>always</i> be called with 'remove=true', in order to call the sync-method.
         * @attribute syncOptions
         * @type Object
         * @default {}
         * @since 0.1
        */
        syncOptions : {
            value: {},
            validator: function(val) {
                _yuitest_coverfunc("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", "validator", 640);
_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 641);
return Lang.isObject(val);
            }
        },

        /**
         * @attribute zIndex
         * @type number
         * @default 1
         * @description The z-index to apply to the Widgets boundingBox. Non-numerical values for
         * zIndex will be converted to 1. Minumum value = 1.
         */
        zIndex: {
            value : 1,
            setter: '_setZIndex'
        }

    }
});

}, '@VERSION@', {
    "requires": [
        "base-build",
        "classnamemanager",
        "pluginhost-base",
        "model",
        "gallery-itsaviewmodel",
        "widget-autohide",
        "widget-buttons",
        "widget-modality",
        "widget-position",
        "widget-position-align",
        "widget-position-constrain",
        "widget-stack",
        "widget-stdmod"
    ],
    "skinnable": true
});
