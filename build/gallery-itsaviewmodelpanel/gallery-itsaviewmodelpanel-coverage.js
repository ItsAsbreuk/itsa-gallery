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
_yuitest_coverage["build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js"].code=["YUI.add('gallery-itsaviewmodelpanel', function (Y, NAME) {","","'use strict';","","/**"," *"," * Widget ITSAViewModelPanel"," *"," *"," * Has the same functionalities as ITSAViewModel, but will come inside a Panel (which floats by default)."," * Also has standard a 'close'-button. Using WidgetButtons functionalyties, more buttons can be added."," *"," * These buttons are available by the module and will call Model's corresponding methods:"," *"," * close (visible by default)"," * add"," * destroy"," * reset"," * save"," * submit"," *"," *"," * @class ITSAViewModelPanel"," * @constructor"," * @extends ITSAViewModel"," * @uses WidgetAutohide"," * @uses WidgetButtons"," * @uses WidgetModality"," * @uses WidgetPosition"," * @uses WidgetPositionAlign"," * @uses WidgetPositionConstrain"," * @uses WidgetStack"," * @uses WidgetStdMod"," * @since 0.1"," */","","","var getClassName = Y.ClassNameManager.getClassName,","    Lang = Y.Lang,","    FORMELEMENT = 'yui3-itsaformelement',","    FOCUSABLE = 'focusable',","    /**","     * Fired when the 'closebutton' is pressed","     * @event model:closeclick","     * @param e {EventFacade} Event Facade including:","     * @param e.buttonNode {Y.Node} ButtonNode that was clicked","     * @param e.target {Y.Model} the Model that is currently rendered in the panel","     * @since 0.1","    **/","    EVT_CLOSE_CLICK = 'closeclick',","    /**","     * Fired when the 'submitbutton' is pressed","     * @event model:submitclick","     * @param e {EventFacade} Event Facade including:","     * @param e.buttonNode {Y.Node} ButtonNode that was clicked","     * @param e.target {Y.Model} the Model that is currently rendered in the panel","     * @param e.promise {Y.Promise} the Promise that is generated to submit the Model to the server.","     * Is in fact model.submitPromise(). Look for promised response --> resolve(response, options) OR reject(reason).","     * @since 0.1","    **/","    EVT_SUBMIT_CLICK = 'submitclick',","    /**","     * Fired when the 'savebutton' is pressed","     * @event model:saveclick","     * @param e {EventFacade} Event Facade including:","     * @param e.buttonNode {Y.Node} ButtonNode that was clicked","     * @param e.target {Y.Model} the Model that is currently rendered in the panel","     * @param e.promise {Y.Promise} the Promise that is generated to save the Model to the server.","     * Is in fact model.savePromise(). Look for promised response --> resolve(response, options) OR reject(reason).","     * @since 0.1","    **/","    EVT_SAVE_CLICK = 'saveclick',","    /**","     * Fired when the 'resetbutton' is pressed","     * @event model:resetclick","     * @param e {EventFacade} Event Facade including:","     * @param e.buttonNode {Y.Node} ButtonNode that was clicked","     * @param e.target {Y.Model} the Model that is currently rendered in the panel","     * @since 0.1","    **/","    EVT_RESET_CLICK = 'resetclick',","    /**","     * Fired when the 'addbutton' is pressed","     * @event model:addclick","     * @param e {EventFacade} Event Facade including:","     * @param e.buttonNode {Y.Node} ButtonNode that was clicked","     * @param e.target {Y.Model} the Model that is currently rendered in the panel","     * @since 0.1","    **/","    EVT_ADD_CLICK = 'addclick',","    /**","     * Fired when the 'destroybutton' is pressed","     * @event model:destroyclick","     * @param e {EventFacade} Event Facade including:","     * @param e.buttonNode {Y.Node} ButtonNode that was clicked","     * @param e.target {Y.Model} the Model that is currently rendered in the panel","     * @param e.promise {Y.Promise} the Promise that is generated to destroy the Model on the server.","     * Is in fact model.destroyPromise(). Look for promised response --> resolve(response, options) OR reject(reason).","     * @since 0.1","    **/","    EVT_DESTROY_CLICK = 'destroyclick';","","Y.ITSAViewModelPanel = Y.Base.create('itsaviewmodelpanel', Y.ITSAViewModel, [","    // Other Widget extensions depend on these two.","    Y.WidgetPosition,","    Y.WidgetStdMod,","","    Y.WidgetAutohide,","    Y.WidgetButtons,","    Y.WidgetModality,","    Y.WidgetPositionAlign,","    Y.WidgetPositionConstrain,","    Y.WidgetStack","], {","","    initializer : function() {","        var instance = this;","","","        // declare bodyContent: this must be rendered.","        instance.set('bodyContent', '');","    },","","    _bindViewUI : function() {","        var instance = this,","            eventhandlers = instance._eventhandlers,","            staticPosition = instance.get('staticPosition'),","            boundingBox = instance.get('boundingBox'),","            view = instance.view,","            panelheader;","","        if (staticPosition) {","            boundingBox.addClass('itsa-staticposition');","        }","        if (instance.get('dragable') && !staticPosition) {","            panelheader = instance.getStdModNode(Y.WidgetStdMod.HEADER);","            Y.use('dd-plugin', function(Y){","                boundingBox.plug(Y.Plugin.Drag);","                if (panelheader) {","                    boundingBox.dd.addHandle('.yui3-widget-hd');","                }","            });","        }","        instance.constructor.superclass._bindViewUI.apply(instance);","        eventhandlers.push(","            view.after(","                '*:destroy',","                function(e) {","                    if (e.target instanceof Y.Model) {","                        instance.hide();","                    }","                }","            )","        );","        eventhandlers.push(","            instance.after(","                'staticPositionChange',","                function(e) {","                    var staticPosition = e.newVal;","                    boundingBox.toggleClass('itsa-staticposition', staticPosition);","                    // remove style position=relative, which is added by WidgetPosition","                    boundingBox.setStyle('position', '');","                }","            )","        );","        eventhandlers.push(","            instance.after(","                'dragableChange',","                function(e) {","                    var dragable = e.newVal;","                    if (dragable && !instance.get('staticPosition')) {","                        panelheader = instance.getStdModNode(Y.WidgetStdMod.HEADER);","                        Y.use('dd-plugin', function(Y){","                            boundingBox.plug(Y.Plugin.Drag);","                            if (panelheader) {","                                boundingBox.dd.addHandle('.yui3-widget-hd');","                            }","                        });","                    }","                    else {","                        boundingBox.unplug('dd');","                    }","                }","            )","        );","    },","","    /**","     * Function for the addbutton. Adds a new model and fires an event.","     *","     * @method _addModel","     * @private","     * @protected","    */","    _addModel : function(e) {","        var instance = this,","            model = instance.get('model'),","            ModelClass, currentConfig, newModel;","","        if (model) {","            e.buttonNode = e.target;","            e.target = model;","            e.type = EVT_ADD_CLICK;","            ModelClass = instance.get('newModelClass');","            newModel = new ModelClass();","            if (model.hasPlugin('itsaeditmodel')) {","                currentConfig = Y.clone(model.itsaeditmodel.getAttrs());","                Y.use('gallery-itsaeditmodel', function(Y) {","                    newModel.plug(Y.Plugin.ITSAEditModel, currentConfig);","                });","            }","            e.newModel = newModel;","            model.fire(EVT_ADD_CLICK, e);","        }","    },","","    /**","     * Function for the closebutton. Closes the panel the model and fires an event.","     *","     * @method _closeModel","     * @private","     * @protected","    */","    _closeModel : function(e) {","        var instance = this,","            model = instance.get('model');","","        if (model) {","            e.buttonNode = e.target;","            e.target = model;","            e.type = EVT_CLOSE_CLICK;","            instance.hide();","            model.fire(EVT_CLOSE_CLICK, e);","        }","    },","","    /**","     * Function for the destroybutton. Destroys the model and fires an event.","     *","     * @method _destroyModel","     * @private","     * @protected","    */","    _destroyModel : function(e) {","        var instance = this,","            model = instance.get('model');","","        if (model) {","            e.buttonNode = e.target;","            e.target = model;","            e.type = EVT_DESTROY_CLICK;","            syncOptions = instance.get('syncOptions');","            options = Y.merge({remove: true}, syncOptions.destroy || {});","            e.promise = model.destroyPromise(options);","            model.fire(EVT_DESTROY_CLICK, e);","        }","    },","","    /**","     * Function for the resetbutton. Resets the model and fires an event.","     *","     * @method _resetModel","     * @private","     * @protected","    */","    _resetModel : function(e) {","        var instance = this,","            model = instance.get('model');","","        if (model) {","            button = e.target,","            // set the focus manually. This will cause the View to be focussed as well --> now the focusmanager works for this View-instance","            button.focus();","            e.buttonNode = button;","            e.target = model;","            e.type = EVT_RESET_CLICK;","            model.fire(EVT_RESET_CLICK, e);","        }","    },","","    /**","     * Function for the savebutton. Saves the model and fires an event.","     *","     * @method _saveModel","     * @private","     * @protected","    */","    _saveModel : function(e) {","        var instance = this,","            model = instance.get('model'),","            actionAfterSave = instance.get('actionAfterSave');","","        if (model) {","            button = e.target,","            // set the focus manually. This will cause the View to be focussed as well --> now the focusmanager works for this View-instance","            button.focus();","            e.buttonNode = button;","            e.target = model;","            e.type = EVT_SAVE_CLICK;","            syncOptions = instance.get('syncOptions');","            options = syncOptions.save || {};","            e.promise = model.savePromise(options);","            model.fire(EVT_SAVE_CLICK, e);","            if (actionAfterSave===1) {","                instance.hide();","            }","            if (actionAfterSave===2) {","                model.unplug('itsaeditmodel');","            }","        }","    },","","    /**","     * Function for the submitbutton. Submits the model and fires an event.","     *","     * @method _submitModel","     * @private","     * @protected","    */","    _submitModel : function(e) {","        var instance = this,","            model = instance.get('model'),","            actionAfterSubmit = instance.get('actionAfterSubmit');","","        if (model) {","            button = e.target,","            // set the focus manually. This will cause the View to be focussed as well --> now the focusmanager works for this View-instance","            button.focus();","            e.buttonNode = button;","            e.target = model;","            e.type = EVT_SUBMIT_CLICK;","            syncOptions = instance.get('syncOptions');","            options = syncOptions.submit || {};","            e.promise = model.submitPromise(options);","            model.fire(EVT_SUBMIT_CLICK, e);","            if (actionAfterSubmit===1) {","                instance.hide();","            }","            if (actionAfterSubmit===2) {","                model.unplug('itsaeditmodel');","            }","        }","    },","","    /**","     * returns the view-container, which equals this.get('contentBox')","     *","     * @method _getViewContainer","     * @private","    */","    _getViewContainer : function() {","        return this.getStdModNode(Y.WidgetStdMod.BODY);","    },","","    /**","     * Calls the original Y.Widget.renderer. Needs to be overridden, because now we need to go 2 levels up.","     *","     * @method _widgetRenderer","     * @private","     * @protected","    */","    _widgetRenderer : function() {","        var instance = this;","","        instance.constructor.superclass.constructor.superclass.renderer.apply(instance);","    },","","    /**","     * Default setter for zIndex attribute changes. Normalizes zIndex values to","     * numbers, converting non-numerical values to 1.","     *","     * @method _setZIndex","     * @protected","     * @param {String | Number} zIndex","     * @return {Number} Normalized zIndex","     */","    _setZIndex: function(zIndex) {","        if (typeof zIndex === 'string') {","            zIndex = parseInt(zIndex, 10);","        }","        if (typeof zIndex !== 'number') {","            zIndex = 1;","        }","        if (zIndex<1) {","            zIndex = 1;","        }","        return zIndex;","    },","","    _uiSetXY : function(val) {","        var instance = this;","        if (!instance.get('staticPosition')) {","            instance._posNode.setXY(val);","        }","    },","","    // -- Public Properties ----------------------------------------------------","","    /**","     * Collection of predefined buttons mapped from name => config.","     *","     * ITSAViewModelPanel includes \"close\", \"add\", \"destroy\", \"reset\", \"save\" and \"submit\" buttons which can be use by name.","     * When the close button is in the header (which is the default), it will look like: [x].","     *","     * See `addButton()` for a list of possible configuration values.","     *","     * @example","     *     // ITSAViewModelPanel with save-button in footer.","     *     var viewmodelpanel = new Y.ITSAViewModelPanel({","     *         buttons: ['save']","     *     });","     *","     *     // ITSAViewModelPanel with reset- and close-button in footer and 'save-button' in the header.","     *     var otherITSAViewModelPanel = new Y.ITSAViewModelPanel({","     *         buttons: {","     *             header: ['save']","     *             footer: ['reset', close']","     *         }","     *     });","     *","     * @property BUTTONS","     * @type Object","     * @default {close: {}}","     * @since 0.1","     *","    **/","    BUTTONS: {","        add: {","            label  : 'Add',","            action : '_addModel',","","            // Uses `type=\"button\"` so the button's default action can still","            // occur but it won't cause things like a form to submit.","            template  : '<button type=\"button\" />',","            classNames: [FORMELEMENT+'-add', FOCUSABLE]","        },","        close: {","            label  : 'Close',","            action : '_closeModel',","            section: 'header',","","            // Uses `type=\"button\"` so the button's default action can still","            // occur but it won't cause things like a form to submit.","            template  : '<button type=\"button\" />',","            classNames: getClassName('button', 'close')","        },","        destroy: {","            label  : 'Destroy',","            action : '_destroyModel',","","            // Uses `type=\"button\"` so the button's default action can still","            // occur but it won't cause things like a form to submit.","            template  : '<button type=\"button\" />',","            classNames: [FORMELEMENT+'-destroy', FOCUSABLE]","        },","        reset: {","            label  : 'Reset',","            action : '_resetModel',","","            // Uses `type=\"button\"` so the button's default action can still","            // occur but it won't cause things like a form to submit.","            template  : '<button type=\"button\" />',","            classNames: [FORMELEMENT+'-reset', FOCUSABLE]","        },","        save: {","            label  : 'Save',","            action : '_saveModel',","","            // Uses `type=\"button\"` so the button's default action can still","            // occur but it won't cause things like a form to submit.","            template  : '<button type=\"button\" />',","            classNames: [FORMELEMENT+'-save', FOCUSABLE]","        },","        submit: {","            label  : 'Submit',","            action : '_submitModel',","","            // Uses `type=\"button\"` so the button's default action can still","            // occur but it won't cause things like a form to submit.","            template  : '<button type=\"button\" />',","            classNames: [FORMELEMENT+'-submit', FOCUSABLE]","        }","    }","}, {","    ATTRS: {","        /**","         * Change Panel-appearance after save is clicked.<br />","         * 0 = no action<br />","         * 1 = close panel<br />","         * 2 = unplug Y.Plugin.ITSAEditModel, resulting in rendering the original template<br />","         * @attribute actionAfterSave","         * @type Int","         * @default 0","         * @since 0.1","        */","        actionAfterSave : {","            value: 0,","            validator: function(val) {","                return (typeof val === 'number') && (val>=0) && (val<=2);","            }","        },","","        /**","         * Change Panel-appearance after submit is clicked.<br />","         * 0 = no action<br />","         * 1 = close panel<br />","         * 2 = unplug Y.Plugin.ITSAEditModel, resulting in rendering the original template<br />","         * @attribute actionAfterSubmit","         * @type Int","         * @default 0","         * @since 0.1","        */","        actionAfterSubmit : {","            value: 0,","            validator: function(val) {","                return (typeof val === 'number') && (val>=0) && (val<=2);","            }","        },","","        /**","         * Defenitions of the buttons that are on the panel. The buttons you want to show should be passed as an [String],","         * where the names can be looked up into the property BUTTONS. Values to be used are:","         * \"close\", \"add\", \"destroy\", \"reset\", \"save\" and \"submit\" which can be use by name. You can also specify the section","         * where the buttons should be rendered, in case you want it different from the default.","         * @attribute buttons","         * @type [String]","         * @default ['close']","         * @example","         *     // ITSAViewModelPanel with save-button in footer.","         *     var viewmodelpanel = new Y.ITSAViewModelPanel({","         *         buttons: ['save']","         *     });","         *","         *     // ITSAViewModelPanel with reset- and close-button in footer and 'save-button' in the header.","         *     var otherITSAViewModelPanel = new Y.ITSAViewModelPanel({","         *         buttons: {","         *             header: ['save']","         *             footer: ['reset', close']","         *         }","         *     });","         * @since 0.1","        */","        buttons: {","            value: ['close']","        },","","        /**","         * Makes the panel dragable. Only applyable when staticPosition=false.","         * Cautious: if you set dragable and don't have a header, then the panel gets dragable by its container. This will lead","         * text to be unselectable. If there is a header, then the panel is only dragable by its header and bodytext is selectable.","         * @attribute dragable","         * @type Boolean","         * @default false","         * @since 0.1","        */","        dragable : {","            value: false,","            validator: function(val) {","                return (typeof val === 'boolean');","            }","        },","","        /**","         * Title to appear in the header","         * @attribute title","         * @type String","         * @default null","         * @since 0.1","        */","        title : {","            value: null,","            lazyAdd: false,","            validator: function(val) {","                return (typeof val === 'string');","            },","            setter: function(val) {","                this.set('headerContent', val);","            }","        },","","        /**","         * Title to appear in the footer","         * @attribute statusText","         * @type String","         * @default null","         * @since 0.1","        */","        statusText : {","            value: null,","            lazyAdd: false,","            validator: function(val) {","                return (typeof val === 'string');","            },","            setter: function(val) {","                this.set('footerContent', val);","            }","        },","","        /**","         * Specifies the Class of new created Models (that is, when a model:addclick event occurs).","         * @attribute newModelClass","         * @type Model","         * @default Y.Model","         * @since 0.1","        */","        newModelClass : {","            value: Y.Model","        },","","        /**","         * Makes the panel to be static (and able to go inline) instead op foated. When static positioned, you cannot use","         * the methods provided by WidgetPosition, WidgetPositionAlign and WidgetPositionConstrain and you cannot set 'dragable'","         * @attribute staticPosition","         * @type Boolean","         * @default false","         * @since 0.1","        */","        staticPosition : {","            value: false,","            validator: function(val) {","                return (typeof val === 'boolean');","            }","        },","","        /**","         * Object with the properties: <b>destroy</b>, <b>save</b> and <b>submit</b>. For every property you might want to","         * specify the options-object that will be passed through to the sync- or destroy-method. The destroymethod will","         * <i>always</i> be called with 'remove=true', in order to call the sync-method.","         * @attribute syncOptions","         * @type Object","         * @default {}","         * @since 0.1","        */","        syncOptions : {","            value: {},","            validator: function(val) {","                return Lang.isObject(val);","            }","        },","","        /**","         * @attribute zIndex","         * @type number","         * @default 1","         * @description The z-index to apply to the Widgets boundingBox. Non-numerical values for","         * zIndex will be converted to 1. Minumum value = 1.","         */","        zIndex: {","            value : 1,","            setter: '_setZIndex'","        }","","    }","});","","}, '@VERSION@', {","    \"requires\": [","        \"base-build\",","        \"classnamemanager\",","        \"pluginhost-base\",","        \"model\",","        \"gallery-itsaviewmodel\",","        \"widget-autohide\",","        \"widget-buttons\",","        \"widget-modality\",","        \"widget-position\",","        \"widget-position-align\",","        \"widget-position-constrain\",","        \"widget-stack\",","        \"widget-stdmod\"","    ],","    \"skinnable\": true","});"];
_yuitest_coverage["build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js"].lines = {"1":0,"3":0,"38":0,"103":0,"117":0,"121":0,"125":0,"132":0,"133":0,"135":0,"136":0,"137":0,"138":0,"139":0,"140":0,"144":0,"145":0,"149":0,"150":0,"155":0,"159":0,"160":0,"162":0,"166":0,"170":0,"171":0,"172":0,"173":0,"174":0,"175":0,"176":0,"181":0,"196":0,"200":0,"201":0,"202":0,"203":0,"204":0,"205":0,"206":0,"207":0,"208":0,"209":0,"212":0,"213":0,"225":0,"228":0,"229":0,"230":0,"231":0,"232":0,"233":0,"245":0,"248":0,"249":0,"250":0,"251":0,"252":0,"253":0,"254":0,"255":0,"267":0,"270":0,"271":0,"274":0,"275":0,"276":0,"277":0,"289":0,"293":0,"294":0,"297":0,"298":0,"299":0,"300":0,"301":0,"302":0,"303":0,"304":0,"305":0,"307":0,"308":0,"321":0,"325":0,"326":0,"329":0,"330":0,"331":0,"332":0,"333":0,"334":0,"335":0,"336":0,"337":0,"339":0,"340":0,"352":0,"363":0,"365":0,"378":0,"379":0,"381":0,"382":0,"384":0,"385":0,"387":0,"391":0,"392":0,"393":0,"499":0,"516":0,"559":0,"574":0,"577":0,"592":0,"595":0,"621":0,"637":0};
_yuitest_coverage["build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js"].functions = {"initializer:116":0,"(anonymous 2):137":0,"(anonymous 3):148":0,"(anonymous 4):158":0,"(anonymous 6):173":0,"(anonymous 5):169":0,"_bindViewUI:124":0,"(anonymous 7):208":0,"_addModel:195":0,"_closeModel:224":0,"_destroyModel:244":0,"_resetModel:266":0,"_saveModel:288":0,"_submitModel:320":0,"_getViewContainer:351":0,"_widgetRenderer:362":0,"_setZIndex:377":0,"_uiSetXY:390":0,"validator:498":0,"validator:515":0,"validator:558":0,"validator:573":0,"setter:576":0,"validator:591":0,"setter:594":0,"validator:620":0,"validator:636":0,"(anonymous 1):1":0};
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
            model = instance.get('model');

        _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 248);
if (model) {
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 249);
e.buttonNode = e.target;
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 250);
e.target = model;
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 251);
e.type = EVT_DESTROY_CLICK;
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 252);
syncOptions = instance.get('syncOptions');
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 253);
options = Y.merge({remove: true}, syncOptions.destroy || {});
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 254);
e.promise = model.destroyPromise(options);
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 255);
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
        _yuitest_coverfunc("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", "_resetModel", 266);
_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 267);
var instance = this,
            model = instance.get('model');

        _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 270);
if (model) {
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 271);
button = e.target,
            // set the focus manually. This will cause the View to be focussed as well --> now the focusmanager works for this View-instance
            button.focus();
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 274);
e.buttonNode = button;
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 275);
e.target = model;
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 276);
e.type = EVT_RESET_CLICK;
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 277);
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
        _yuitest_coverfunc("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", "_saveModel", 288);
_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 289);
var instance = this,
            model = instance.get('model'),
            actionAfterSave = instance.get('actionAfterSave');

        _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 293);
if (model) {
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 294);
button = e.target,
            // set the focus manually. This will cause the View to be focussed as well --> now the focusmanager works for this View-instance
            button.focus();
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 297);
e.buttonNode = button;
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 298);
e.target = model;
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 299);
e.type = EVT_SAVE_CLICK;
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 300);
syncOptions = instance.get('syncOptions');
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 301);
options = syncOptions.save || {};
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 302);
e.promise = model.savePromise(options);
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 303);
model.fire(EVT_SAVE_CLICK, e);
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 304);
if (actionAfterSave===1) {
                _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 305);
instance.hide();
            }
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 307);
if (actionAfterSave===2) {
                _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 308);
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
        _yuitest_coverfunc("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", "_submitModel", 320);
_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 321);
var instance = this,
            model = instance.get('model'),
            actionAfterSubmit = instance.get('actionAfterSubmit');

        _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 325);
if (model) {
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 326);
button = e.target,
            // set the focus manually. This will cause the View to be focussed as well --> now the focusmanager works for this View-instance
            button.focus();
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 329);
e.buttonNode = button;
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 330);
e.target = model;
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 331);
e.type = EVT_SUBMIT_CLICK;
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 332);
syncOptions = instance.get('syncOptions');
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 333);
options = syncOptions.submit || {};
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 334);
e.promise = model.submitPromise(options);
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 335);
model.fire(EVT_SUBMIT_CLICK, e);
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 336);
if (actionAfterSubmit===1) {
                _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 337);
instance.hide();
            }
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 339);
if (actionAfterSubmit===2) {
                _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 340);
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
        _yuitest_coverfunc("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", "_getViewContainer", 351);
_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 352);
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
        _yuitest_coverfunc("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", "_widgetRenderer", 362);
_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 363);
var instance = this;

        _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 365);
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
        _yuitest_coverfunc("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", "_setZIndex", 377);
_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 378);
if (typeof zIndex === 'string') {
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 379);
zIndex = parseInt(zIndex, 10);
        }
        _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 381);
if (typeof zIndex !== 'number') {
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 382);
zIndex = 1;
        }
        _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 384);
if (zIndex<1) {
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 385);
zIndex = 1;
        }
        _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 387);
return zIndex;
    },

    _uiSetXY : function(val) {
        _yuitest_coverfunc("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", "_uiSetXY", 390);
_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 391);
var instance = this;
        _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 392);
if (!instance.get('staticPosition')) {
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 393);
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
                _yuitest_coverfunc("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", "validator", 498);
_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 499);
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
                _yuitest_coverfunc("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", "validator", 515);
_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 516);
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
                _yuitest_coverfunc("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", "validator", 558);
_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 559);
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
                _yuitest_coverfunc("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", "validator", 573);
_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 574);
return (typeof val === 'string');
            },
            setter: function(val) {
                _yuitest_coverfunc("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", "setter", 576);
_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 577);
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
                _yuitest_coverfunc("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", "validator", 591);
_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 592);
return (typeof val === 'string');
            },
            setter: function(val) {
                _yuitest_coverfunc("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", "setter", 594);
_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 595);
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
                _yuitest_coverfunc("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", "validator", 620);
_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 621);
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
                _yuitest_coverfunc("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", "validator", 636);
_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 637);
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
