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
_yuitest_coverage["build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js"].code=["YUI.add('gallery-itsaviewmodelpanel', function (Y, NAME) {","","/**"," *"," * Widget ITSAViewModelPanel"," *"," *"," * Has the same functionalities as ITSAViewModel, but will come inside a Panel (which floats by default)."," * Also has standard a 'close'-button. Using WidgetButtons functionalyties, more buttons can be added."," *"," * These buttons are available by the module and will call Model's corresponding methods:"," *"," * close (visible by default)"," * add"," * destroy"," * reset"," * save"," * submit"," *"," *"," * @class ITSAViewModelPanel"," * @constructor"," * @extends ITSAViewModel"," * @uses WidgetAutohide"," * @uses WidgetButtons"," * @uses WidgetModality"," * @uses WidgetPosition"," * @uses WidgetPositionAlign"," * @uses WidgetPositionConstrain"," * @uses WidgetStack"," * @uses WidgetStdMod"," * @since 0.1"," */","","","var getClassName = Y.ClassNameManager.getClassName,","    Lang = Y.Lang,","    FORMELEMENT = 'yui3-itsaformelement',","    FOCUSABLE = 'focusable',","    /**","     * Fired when the 'closebutton' is pressed","     * @event model:closeclick","     * @param e {EventFacade} Event Facade including:","     * @param e.buttonNode {Y.Node} ButtonNode that was clicked","     * @param e.target {Y.Model} the Model that is currently rendered in the panel","     * @since 0.1","    **/","    EVT_CLOSE_CLICK = 'closeclick',","    /**","     * Fired when the 'submitbutton' is pressed","     * @event model:submitclick","     * @param e {EventFacade} Event Facade including:","     * @param e.buttonNode {Y.Node} ButtonNode that was clicked","     * @param e.target {Y.Model} the Model that is currently rendered in the panel","     * @param e.promise {Y.Promise} the Promise that is generated to submit the Model to the server.","     * Is in fact model.submitPromise(). Look for promised response --> resolve(response, options) OR reject(reason).","     * @since 0.1","    **/","    EVT_SUBMIT_CLICK = 'submitclick',","    /**","     * Fired when the 'savebutton' is pressed","     * @event model:saveclick","     * @param e {EventFacade} Event Facade including:","     * @param e.buttonNode {Y.Node} ButtonNode that was clicked","     * @param e.target {Y.Model} the Model that is currently rendered in the panel","     * @param e.promise {Y.Promise} the Promise that is generated to save the Model to the server.","     * Is in fact model.savePromise(). Look for promised response --> resolve(response, options) OR reject(reason).","     * @since 0.1","    **/","    EVT_SAVE_CLICK = 'saveclick',","    /**","     * Fired when the 'resetbutton' is pressed","     * @event model:resetclick","     * @param e {EventFacade} Event Facade including:","     * @param e.buttonNode {Y.Node} ButtonNode that was clicked","     * @param e.target {Y.Model} the Model that is currently rendered in the panel","     * @since 0.1","    **/","    EVT_RESET_CLICK = 'resetclick',","    /**","     * Fired when the 'addbutton' is pressed","     * @event model:addclick","     * @param e {EventFacade} Event Facade including:","     * @param e.buttonNode {Y.Node} ButtonNode that was clicked","     * @param e.target {Y.Model} the Model that is currently rendered in the panel","     * @since 0.1","    **/","    EVT_ADD_CLICK = 'addclick',","    /**","     * Fired when the 'destroybutton' is pressed","     * @event model:destroyclick","     * @param e {EventFacade} Event Facade including:","     * @param e.buttonNode {Y.Node} ButtonNode that was clicked","     * @param e.target {Y.Model} the Model that is currently rendered in the panel","     * @param e.promise {Y.Promise} the Promise that is generated to destroy the Model on the server.","     * Is in fact model.destroyPromise(). Look for promised response --> resolve(response, options) OR reject(reason).","     * @since 0.1","    **/","    EVT_DESTROY_CLICK = 'destroyclick';","","Y.ITSAViewModelPanel = Y.Base.create('itsaviewmodelpanel', Y.ITSAViewModel, [","    // Other Widget extensions depend on these two.","    Y.WidgetPosition,","    Y.WidgetStdMod,","","    Y.WidgetAutohide,","    Y.WidgetButtons,","    Y.WidgetModality,","    Y.WidgetPositionAlign,","    Y.WidgetPositionConstrain,","    Y.WidgetStack","], {","","    initializer : function() {","        var instance = this;","","","        // declare bodyContent: this must be rendered.","        instance.set('bodyContent', '');","    },","","    _bindViewUI : function() {","        var instance = this,","            eventhandlers = instance._eventhandlers,","            staticPosition = instance.get('staticPosition'),","            boundingBox = instance.get('boundingBox'),","            view = instance.view,","            panelheader;","","        if (staticPosition) {","            boundingBox.addClass('itsa-staticposition');","        }","        if (instance.get('dragable') && !staticPosition) {","            panelheader = instance.getStdModNode(Y.WidgetStdMod.HEADER);","            Y.use('dd-plugin', function(Y){","                boundingBox.plug(Y.Plugin.Drag);","                if (panelheader) {","                    boundingBox.dd.addHandle('.yui3-widget-hd');","                }","            });","        }","        instance.constructor.superclass._bindViewUI.apply(instance);","        eventhandlers.push(","            view.after(","                '*:destroy',","                function(e) {","                    if (e.target instanceof Y.Model) {","                        instance.hide();","                    }","                }","            )","        );","        eventhandlers.push(","            instance.after(","                'staticPositionChange',","                function(e) {","                    var staticPosition = e.newVal;","                    boundingBox.toggleClass('itsa-staticposition', staticPosition);","                    // remove style position=relative, which is added by WidgetPosition","                    boundingBox.setStyle('position', '');","                }","            )","        );","        eventhandlers.push(","            instance.after(","                'dragableChange',","                function(e) {","                    var dragable = e.newVal;","                    if (dragable && !instance.get('staticPosition')) {","                        panelheader = instance.getStdModNode(Y.WidgetStdMod.HEADER);","                        Y.use('dd-plugin', function(Y){","                            boundingBox.plug(Y.Plugin.Drag);","                            if (panelheader) {","                                boundingBox.dd.addHandle('.yui3-widget-hd');","                            }","                        });","                    }","                    else {","                        boundingBox.unplug('dd');","                    }","                }","            )","        );","    },","","    /**","     * Function for the addbutton. Adds a new model and fires an event.","     *","     * @method _addModel","     * @private","     * @protected","    */","    _addModel : function(e) {","        var instance = this,","            model = instance.get('model'),","            ModelClass, currentConfig, newModel;","","        if (model) {","            e.buttonNode = e.target;","            e.target = model;","            e.type = EVT_ADD_CLICK;","            ModelClass = instance.get('newModelClass');","            newModel = new ModelClass();","            if (model.hasPlugin('itsaeditmodel')) {","                currentConfig = Y.clone(model.itsaeditmodel.getAttrs());","                Y.use('gallery-itsaeditmodel', function(Y) {","                    newModel.plug(Y.Plugin.ITSAEditModel, currentConfig);","                });","            }","            e.newModel = newModel;","            model.fire(EVT_ADD_CLICK, e);","        }","    },","","    /**","     * Function for the closebutton. Closes the panel the model and fires an event.","     *","     * @method _closeModel","     * @private","     * @protected","    */","    _closeModel : function(e) {","        var instance = this,","            model = instance.get('model');","","        if (model) {","            e.buttonNode = e.target;","            e.target = model;","            e.type = EVT_CLOSE_CLICK;","            instance.hide();","            model.fire(EVT_CLOSE_CLICK, e);","        }","    },","","    /**","     * Function for the destroybutton. Destroys the model and fires an event.","     *","     * @method _destroyModel","     * @private","     * @protected","    */","    _destroyModel : function(e) {","        var instance = this,","            model = instance.get('model');","","        if (model) {","            e.buttonNode = e.target;","            e.target = model;","            e.type = EVT_DESTROY_CLICK;","            syncOptions = instance.get('syncOptions');","            options = Y.merge({remove: true}, syncOptions.destroy || {});","            e.promise = model.destroyPromise(options);","            model.fire(EVT_DESTROY_CLICK, e);","        }","    },","","    /**","     * Function for the resetbutton. Resets the model and fires an event.","     *","     * @method _resetModel","     * @private","     * @protected","    */","    _resetModel : function(e) {","        var instance = this,","            model = instance.get('model');","","        if (model) {","            button = e.target,","            // set the focus manually. This will cause the View to be focussed as well --> now the focusmanager works for this View-instance","            button.focus();","            e.buttonNode = button;","            e.target = model;","            e.type = EVT_RESET_CLICK;","            model.fire(EVT_RESET_CLICK, e);","        }","    },","","    /**","     * Function for the savebutton. Saves the model and fires an event.","     *","     * @method _saveModel","     * @private","     * @protected","    */","    _saveModel : function(e) {","        var instance = this,","            model = instance.get('model');","","        if (model) {","            button = e.target,","            // set the focus manually. This will cause the View to be focussed as well --> now the focusmanager works for this View-instance","            button.focus();","            e.buttonNode = button;","            e.target = model;","            e.type = EVT_SAVE_CLICK;","            syncOptions = instance.get('syncOptions');","            options = syncOptions.save || {};","            e.promise = model.savePromise(options);","            model.fire(EVT_SAVE_CLICK, e);","        }","    },","","    /**","     * Function for the submitbutton. Submits the model and fires an event.","     *","     * @method _submitModel","     * @private","     * @protected","    */","    _submitModel : function(e) {","        var instance = this,","            model = instance.get('model');","","        if (model) {","            button = e.target,","            // set the focus manually. This will cause the View to be focussed as well --> now the focusmanager works for this View-instance","            button.focus();","            e.buttonNode = button;","            e.target = model;","            e.type = EVT_SUBMIT_CLICK;","            syncOptions = instance.get('syncOptions');","            options = syncOptions.submit || {};","            e.promise = model.submitPromise(options);","            model.fire(EVT_SUBMIT_CLICK, e);","        }","    },","","    /**","     * returns the view-container, which equals this.get('contentBox')","     *","     * @method _getViewContainer","     * @private","    */","    _getViewContainer : function() {","        return this.getStdModNode(Y.WidgetStdMod.BODY);","    },","","    /**","     * Calls the original Y.Widget.renderer. Needs to be overridden, because now we need to go 2 levels up.","     *","     * @method _widgetRenderer","     * @private","     * @protected","    */","    _widgetRenderer : function() {","        var instance = this;","","        instance.constructor.superclass.constructor.superclass.renderer.apply(instance);","    },","","    /**","     * Default setter for zIndex attribute changes. Normalizes zIndex values to","     * numbers, converting non-numerical values to 1.","     *","     * @method _setZIndex","     * @protected","     * @param {String | Number} zIndex","     * @return {Number} Normalized zIndex","     */","    _setZIndex: function(zIndex) {","        if (typeof zIndex === 'string') {","            zIndex = parseInt(zIndex, 10);","        }","        if (typeof zIndex !== 'number') {","            zIndex = 1;","        }","        if (zIndex<1) {","            zIndex = 1;","        }","        return zIndex;","    },","","    _uiSetXY : function(val) {","        var instance = this;","        if (!instance.get('staticPosition')) {","            instance._posNode.setXY(val);","        }","    },","","    // -- Public Properties ----------------------------------------------------","","    /**","     * Collection of predefined buttons mapped from name => config.","     *","     * ITSAViewModelPanel includes \"close\", \"add\", \"destroy\", \"reset\", \"save\" and \"submit\" buttons which can be use by name.","     * When the close button is in the header (which is the default), it will look like: [x].","     *","     * See `addButton()` for a list of possible configuration values.","     *","     * @example","     *     // ITSAViewModelPanel with save-button in footer.","     *     var viewmodelpanel = new Y.ITSAViewModelPanel({","     *         buttons: ['save']","     *     });","     *","     *     // ITSAViewModelPanel with reset- and close-button in footer and 'save-button' in the header.","     *     var otherITSAViewModelPanel = new Y.ITSAViewModelPanel({","     *         buttons: {","     *             header: ['save']","     *             footer: ['reset', close']","     *         }","     *     });","     *","     * @property BUTTONS","     * @type Object","     * @default {close: {}}","     * @since 0.1","     *","    **/","    BUTTONS: {","        add: {","            label  : 'Add',","            action : '_addModel',","","            // Uses `type=\"button\"` so the button's default action can still","            // occur but it won't cause things like a form to submit.","            template  : '<button type=\"button\" />',","            classNames: [FORMELEMENT+'-add', FOCUSABLE]","        },","        close: {","            label  : 'Close',","            action : '_closeModel',","            section: 'header',","","            // Uses `type=\"button\"` so the button's default action can still","            // occur but it won't cause things like a form to submit.","            template  : '<button type=\"button\" />',","            classNames: getClassName('button', 'close')","        },","        destroy: {","            label  : 'Destroy',","            action : '_destroyModel',","","            // Uses `type=\"button\"` so the button's default action can still","            // occur but it won't cause things like a form to submit.","            template  : '<button type=\"button\" />',","            classNames: [FORMELEMENT+'-destroy', FOCUSABLE]","        },","        reset: {","            label  : 'Reset',","            action : '_resetModel',","","            // Uses `type=\"button\"` so the button's default action can still","            // occur but it won't cause things like a form to submit.","            template  : '<button type=\"button\" />',","            classNames: [FORMELEMENT+'-reset', FOCUSABLE]","        },","        save: {","            label  : 'Save',","            action : '_saveModel',","","            // Uses `type=\"button\"` so the button's default action can still","            // occur but it won't cause things like a form to submit.","            template  : '<button type=\"button\" />',","            classNames: [FORMELEMENT+'-save', FOCUSABLE]","        },","        submit: {","            label  : 'Submit',","            action : '_submitModel',","","            // Uses `type=\"button\"` so the button's default action can still","            // occur but it won't cause things like a form to submit.","            template  : '<button type=\"button\" />',","            classNames: [FORMELEMENT+'-submit', FOCUSABLE]","        }","    }","}, {","    ATTRS: {","        /**","         * Defenitions of the buttons that are on the panel. The buttons you want to show should be passed as an [String],","         * where the names can be looked up into the property BUTTONS. Values to be used are:","         * \"close\", \"add\", \"destroy\", \"reset\", \"save\" and \"submit\" which can be use by name. You can also specify the section","         * where the buttons should be rendered, in case you want it different from the default.","         * @attribute buttons","         * @type [String]","         * @default ['close']","         * @example","         *     // ITSAViewModelPanel with save-button in footer.","         *     var viewmodelpanel = new Y.ITSAViewModelPanel({","         *         buttons: ['save']","         *     });","         *","         *     // ITSAViewModelPanel with reset- and close-button in footer and 'save-button' in the header.","         *     var otherITSAViewModelPanel = new Y.ITSAViewModelPanel({","         *         buttons: {","         *             header: ['save']","         *             footer: ['reset', close']","         *         }","         *     });","         * @since 0.1","        */","        buttons: {","            value: ['close']","        },","","        /**","         * Makes the panel dragable. Only applyable when staticPosition=false.","         * Cautious: if you set dragable and don't have a header, then the panel gets dragable by its container. This will lead","         * text to be unselectable. If there is a header, then the panel is only dragable by its header and bodytext is selectable.","         * @attribute dragable","         * @type Boolean","         * @default false","         * @since 0.1","        */","        dragable : {","            value: false,","            validator: function(val) {","                return (typeof val === 'boolean');","            }","        },","","        /**","         * Title to appear in the header","         * @attribute title","         * @type String","         * @default null","         * @since 0.1","        */","        title : {","            value: null,","            lazyAdd: false,","            validator: function(val) {","                return (typeof val === 'string');","            },","            setter: function(val) {","                this.set('headerContent', val);","            }","        },","","        /**","         * Title to appear in the footer","         * @attribute statusText","         * @type String","         * @default null","         * @since 0.1","        */","        statusText : {","            value: null,","            lazyAdd: false,","            validator: function(val) {","                return (typeof val === 'string');","            },","            setter: function(val) {","                this.set('footerContent', val);","            }","        },","","        /**","         * Specifies the Class of new created Models (that is, when a model:addclick event occurs).","         * @attribute newModelClass","         * @type Model","         * @default Y.Model","         * @since 0.1","        */","        newModelClass : {","            value: Y.Model","        },","","        /**","         * Makes the panel to be static (and able to go inline) instead op foated. When static positioned, you cannot use","         * the methods provided by WidgetPosition, WidgetPositionAlign and WidgetPositionConstrain and you cannot set 'dragable'","         * @attribute staticPosition","         * @type Boolean","         * @default false","         * @since 0.1","        */","        staticPosition : {","            value: false,","            validator: function(val) {","                return (typeof val === 'boolean');","            }","        },","","        /**","         * Object with the properties: <b>destroy</b>, <b>save</b> and <b>submit</b>. For every property you might want to","         * specify the options-object that will be passed through to the sync- or destroy-method. The destroymethod will","         * <i>always</i> be called with 'remove=true', in order to call the sync-method.","         * @attribute syncOptions","         * @type Object","         * @default {}","         * @since 0.1","        */","        syncOptions : {","            value: {},","            validator: function(val) {","                return Lang.isObject(val);","            }","        },","","        /**","         * @attribute zIndex","         * @type number","         * @default 1","         * @description The z-index to apply to the Widgets boundingBox. Non-numerical values for","         * zIndex will be converted to 1. Minumum value = 1.","         */","        zIndex: {","            value : 1,","            setter: '_setZIndex'","        }","","    }","});","","}, '@VERSION@', {","    \"requires\": [","        \"base-build\",","        \"classnamemanager\",","        \"pluginhost-base\",","        \"model\",","        \"gallery-itsaviewmodel\",","        \"widget-autohide\",","        \"widget-buttons\",","        \"widget-modality\",","        \"widget-position\",","        \"widget-position-align\",","        \"widget-position-constrain\",","        \"widget-stack\",","        \"widget-stdmod\"","    ],","    \"skinnable\": true","});"];
_yuitest_coverage["build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js"].lines = {"1":0,"36":0,"101":0,"115":0,"119":0,"123":0,"130":0,"131":0,"133":0,"134":0,"135":0,"136":0,"137":0,"138":0,"142":0,"143":0,"147":0,"148":0,"153":0,"157":0,"158":0,"160":0,"164":0,"168":0,"169":0,"170":0,"171":0,"172":0,"173":0,"174":0,"179":0,"194":0,"198":0,"199":0,"200":0,"201":0,"202":0,"203":0,"204":0,"205":0,"206":0,"207":0,"210":0,"211":0,"223":0,"226":0,"227":0,"228":0,"229":0,"230":0,"231":0,"243":0,"246":0,"247":0,"248":0,"249":0,"250":0,"251":0,"252":0,"253":0,"265":0,"268":0,"269":0,"272":0,"273":0,"274":0,"275":0,"287":0,"290":0,"291":0,"294":0,"295":0,"296":0,"297":0,"298":0,"299":0,"300":0,"312":0,"315":0,"316":0,"319":0,"320":0,"321":0,"322":0,"323":0,"324":0,"325":0,"336":0,"347":0,"349":0,"362":0,"363":0,"365":0,"366":0,"368":0,"369":0,"371":0,"375":0,"376":0,"377":0,"509":0,"524":0,"527":0,"542":0,"545":0,"571":0,"587":0};
_yuitest_coverage["build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js"].functions = {"initializer:114":0,"(anonymous 2):135":0,"(anonymous 3):146":0,"(anonymous 4):156":0,"(anonymous 6):171":0,"(anonymous 5):167":0,"_bindViewUI:122":0,"(anonymous 7):206":0,"_addModel:193":0,"_closeModel:222":0,"_destroyModel:242":0,"_resetModel:264":0,"_saveModel:286":0,"_submitModel:311":0,"_getViewContainer:335":0,"_widgetRenderer:346":0,"_setZIndex:361":0,"_uiSetXY:374":0,"validator:508":0,"validator:523":0,"setter:526":0,"validator:541":0,"setter:544":0,"validator:570":0,"validator:586":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js"].coveredLines = 107;
_yuitest_coverage["build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js"].coveredFunctions = 26;
_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 1);
YUI.add('gallery-itsaviewmodelpanel', function (Y, NAME) {

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


_yuitest_coverfunc("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 36);
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

_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 101);
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
        _yuitest_coverfunc("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", "initializer", 114);
_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 115);
var instance = this;


        // declare bodyContent: this must be rendered.
        _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 119);
instance.set('bodyContent', '');
    },

    _bindViewUI : function() {
        _yuitest_coverfunc("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", "_bindViewUI", 122);
_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 123);
var instance = this,
            eventhandlers = instance._eventhandlers,
            staticPosition = instance.get('staticPosition'),
            boundingBox = instance.get('boundingBox'),
            view = instance.view,
            panelheader;

        _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 130);
if (staticPosition) {
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 131);
boundingBox.addClass('itsa-staticposition');
        }
        _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 133);
if (instance.get('dragable') && !staticPosition) {
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 134);
panelheader = instance.getStdModNode(Y.WidgetStdMod.HEADER);
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 135);
Y.use('dd-plugin', function(Y){
                _yuitest_coverfunc("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", "(anonymous 2)", 135);
_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 136);
boundingBox.plug(Y.Plugin.Drag);
                _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 137);
if (panelheader) {
                    _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 138);
boundingBox.dd.addHandle('.yui3-widget-hd');
                }
            });
        }
        _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 142);
instance.constructor.superclass._bindViewUI.apply(instance);
        _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 143);
eventhandlers.push(
            view.after(
                '*:destroy',
                function(e) {
                    _yuitest_coverfunc("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", "(anonymous 3)", 146);
_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 147);
if (e.target instanceof Y.Model) {
                        _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 148);
instance.hide();
                    }
                }
            )
        );
        _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 153);
eventhandlers.push(
            instance.after(
                'staticPositionChange',
                function(e) {
                    _yuitest_coverfunc("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", "(anonymous 4)", 156);
_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 157);
var staticPosition = e.newVal;
                    _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 158);
boundingBox.toggleClass('itsa-staticposition', staticPosition);
                    // remove style position=relative, which is added by WidgetPosition
                    _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 160);
boundingBox.setStyle('position', '');
                }
            )
        );
        _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 164);
eventhandlers.push(
            instance.after(
                'dragableChange',
                function(e) {
                    _yuitest_coverfunc("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", "(anonymous 5)", 167);
_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 168);
var dragable = e.newVal;
                    _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 169);
if (dragable && !instance.get('staticPosition')) {
                        _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 170);
panelheader = instance.getStdModNode(Y.WidgetStdMod.HEADER);
                        _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 171);
Y.use('dd-plugin', function(Y){
                            _yuitest_coverfunc("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", "(anonymous 6)", 171);
_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 172);
boundingBox.plug(Y.Plugin.Drag);
                            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 173);
if (panelheader) {
                                _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 174);
boundingBox.dd.addHandle('.yui3-widget-hd');
                            }
                        });
                    }
                    else {
                        _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 179);
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
        _yuitest_coverfunc("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", "_addModel", 193);
_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 194);
var instance = this,
            model = instance.get('model'),
            ModelClass, currentConfig, newModel;

        _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 198);
if (model) {
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 199);
e.buttonNode = e.target;
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 200);
e.target = model;
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 201);
e.type = EVT_ADD_CLICK;
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 202);
ModelClass = instance.get('newModelClass');
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 203);
newModel = new ModelClass();
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 204);
if (model.hasPlugin('itsaeditmodel')) {
                _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 205);
currentConfig = Y.clone(model.itsaeditmodel.getAttrs());
                _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 206);
Y.use('gallery-itsaeditmodel', function(Y) {
                    _yuitest_coverfunc("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", "(anonymous 7)", 206);
_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 207);
newModel.plug(Y.Plugin.ITSAEditModel, currentConfig);
                });
            }
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 210);
e.newModel = newModel;
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 211);
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
        _yuitest_coverfunc("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", "_closeModel", 222);
_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 223);
var instance = this,
            model = instance.get('model');

        _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 226);
if (model) {
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 227);
e.buttonNode = e.target;
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 228);
e.target = model;
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 229);
e.type = EVT_CLOSE_CLICK;
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 230);
instance.hide();
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 231);
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
        _yuitest_coverfunc("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", "_destroyModel", 242);
_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 243);
var instance = this,
            model = instance.get('model');

        _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 246);
if (model) {
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 247);
e.buttonNode = e.target;
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 248);
e.target = model;
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 249);
e.type = EVT_DESTROY_CLICK;
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 250);
syncOptions = instance.get('syncOptions');
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 251);
options = Y.merge({remove: true}, syncOptions.destroy || {});
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 252);
e.promise = model.destroyPromise(options);
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 253);
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
        _yuitest_coverfunc("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", "_resetModel", 264);
_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 265);
var instance = this,
            model = instance.get('model');

        _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 268);
if (model) {
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 269);
button = e.target,
            // set the focus manually. This will cause the View to be focussed as well --> now the focusmanager works for this View-instance
            button.focus();
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 272);
e.buttonNode = button;
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 273);
e.target = model;
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 274);
e.type = EVT_RESET_CLICK;
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 275);
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
        _yuitest_coverfunc("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", "_saveModel", 286);
_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 287);
var instance = this,
            model = instance.get('model');

        _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 290);
if (model) {
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 291);
button = e.target,
            // set the focus manually. This will cause the View to be focussed as well --> now the focusmanager works for this View-instance
            button.focus();
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 294);
e.buttonNode = button;
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 295);
e.target = model;
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 296);
e.type = EVT_SAVE_CLICK;
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 297);
syncOptions = instance.get('syncOptions');
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 298);
options = syncOptions.save || {};
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 299);
e.promise = model.savePromise(options);
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 300);
model.fire(EVT_SAVE_CLICK, e);
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
        _yuitest_coverfunc("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", "_submitModel", 311);
_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 312);
var instance = this,
            model = instance.get('model');

        _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 315);
if (model) {
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 316);
button = e.target,
            // set the focus manually. This will cause the View to be focussed as well --> now the focusmanager works for this View-instance
            button.focus();
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 319);
e.buttonNode = button;
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 320);
e.target = model;
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 321);
e.type = EVT_SUBMIT_CLICK;
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 322);
syncOptions = instance.get('syncOptions');
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 323);
options = syncOptions.submit || {};
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 324);
e.promise = model.submitPromise(options);
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 325);
model.fire(EVT_SUBMIT_CLICK, e);
        }
    },

    /**
     * returns the view-container, which equals this.get('contentBox')
     *
     * @method _getViewContainer
     * @private
    */
    _getViewContainer : function() {
        _yuitest_coverfunc("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", "_getViewContainer", 335);
_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 336);
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
        _yuitest_coverfunc("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", "_widgetRenderer", 346);
_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 347);
var instance = this;

        _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 349);
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
        _yuitest_coverfunc("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", "_setZIndex", 361);
_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 362);
if (typeof zIndex === 'string') {
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 363);
zIndex = parseInt(zIndex, 10);
        }
        _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 365);
if (typeof zIndex !== 'number') {
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 366);
zIndex = 1;
        }
        _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 368);
if (zIndex<1) {
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 369);
zIndex = 1;
        }
        _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 371);
return zIndex;
    },

    _uiSetXY : function(val) {
        _yuitest_coverfunc("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", "_uiSetXY", 374);
_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 375);
var instance = this;
        _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 376);
if (!instance.get('staticPosition')) {
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 377);
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
                _yuitest_coverfunc("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", "validator", 508);
_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 509);
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
                _yuitest_coverfunc("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", "validator", 523);
_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 524);
return (typeof val === 'string');
            },
            setter: function(val) {
                _yuitest_coverfunc("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", "setter", 526);
_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 527);
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
                _yuitest_coverfunc("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", "validator", 541);
_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 542);
return (typeof val === 'string');
            },
            setter: function(val) {
                _yuitest_coverfunc("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", "setter", 544);
_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 545);
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
                _yuitest_coverfunc("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", "validator", 570);
_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 571);
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
                _yuitest_coverfunc("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", "validator", 586);
_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 587);
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
