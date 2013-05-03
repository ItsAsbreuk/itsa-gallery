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
_yuitest_coverage["build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js"].code=["YUI.add('gallery-itsaviewmodelpanel', function (Y, NAME) {","","/**"," *"," * Widget ITSAViewModelPanel"," *"," *"," * Has the same functionalities as ITSAViewModel, but will come inside a Panel (which floats by default)."," * Also has standard a 'close'-button. Using WidgetButtons functionalyties, more buttons can be added."," *"," * These buttons are available by the module and will call Model's corresponding methods:"," *"," * close (visible by default)"," * add"," * destroy"," * reset"," * save"," * submit"," *"," *"," * @class ITSAViewModelPanel"," * @constructor"," * @extends ITSAViewModel"," * @uses WidgetAutohide"," * @uses WidgetButtons"," * @uses WidgetModality"," * @uses WidgetPosition"," * @uses WidgetPositionAlign"," * @uses WidgetPositionConstrain"," * @uses WidgetStack"," * @uses WidgetStdMod"," * @since 0.1"," */","","","var getClassName = Y.ClassNameManager.getClassName,","    Lang = Y.Lang,","    FORMELEMENT = 'yui3-itsaformelement',","    FOCUSABLE = 'focusable',","    /**","     * Fired when the 'closebutton' is pressed","     * @event model:closeclick","     * @param e {EventFacade} Event Facade including:","     * @param e.buttonNode {Y.Node} ButtonNode that was clicked","     * @param e.target {Y.Model} the Model that is currently rendered in the panel","     * @since 0.1","    **/","    EVT_CLOSE_CLICK = 'closeclick',","    /**","     * Fired when the 'submitbutton' is pressed","     * @event model:submitclick","     * @param e {EventFacade} Event Facade including:","     * @param e.buttonNode {Y.Node} ButtonNode that was clicked","     * @param e.target {Y.Model} the Model that is currently rendered in the panel","     * @param e.promise {Y.Promise} the Promise that is generated to submit the Model to the server.","     * Is in fact model.submitPromise(). Look for promised response --> resolve(response, options) OR reject(reason).","     * @since 0.1","    **/","    EVT_SUBMIT_CLICK = 'submitclick',","    /**","     * Fired when the 'savebutton' is pressed","     * @event model:saveclick","     * @param e {EventFacade} Event Facade including:","     * @param e.buttonNode {Y.Node} ButtonNode that was clicked","     * @param e.target {Y.Model} the Model that is currently rendered in the panel","     * @param e.promise {Y.Promise} the Promise that is generated to save the Model to the server.","     * Is in fact model.savePromise(). Look for promised response --> resolve(response, options) OR reject(reason).","     * @since 0.1","    **/","    EVT_SAVE_CLICK = 'saveclick',","    /**","     * Fired when the 'resetbutton' is pressed","     * @event model:resetclick","     * @param e {EventFacade} Event Facade including:","     * @param e.buttonNode {Y.Node} ButtonNode that was clicked","     * @param e.target {Y.Model} the Model that is currently rendered in the panel","     * @since 0.1","    **/","    EVT_RESET_CLICK = 'resetclick',","    /**","     * Fired when the 'addbutton' is pressed","     * @event model:addclick","     * @param e {EventFacade} Event Facade including:","     * @param e.buttonNode {Y.Node} ButtonNode that was clicked","     * @param e.target {Y.Model} the Model that is currently rendered in the panel","     * @since 0.1","    **/","    EVT_ADD_CLICK = 'addclick',","    /**","     * Fired when the 'destroybutton' is pressed","     * @event model:destroyclick","     * @param e {EventFacade} Event Facade including:","     * @param e.buttonNode {Y.Node} ButtonNode that was clicked","     * @param e.target {Y.Model} the Model that is currently rendered in the panel","     * @param e.promise {Y.Promise} the Promise that is generated to destroy the Model on the server.","     * Is in fact model.destroyPromise(). Look for promised response --> resolve(response, options) OR reject(reason).","     * @since 0.1","    **/","    EVT_DESTROY_CLICK = 'destroyclick';","","Y.ITSAViewModelPanel = Y.Base.create('itsaviewmodelpanel', Y.ITSAViewModel, [","    // Other Widget extensions depend on these two.","    Y.WidgetPosition,","    Y.WidgetStdMod,","","    Y.WidgetAutohide,","    Y.WidgetButtons,","    Y.WidgetModality,","    Y.WidgetPositionAlign,","    Y.WidgetPositionConstrain,","    Y.WidgetStack","], {","","    initializer : function() {","        var instance = this,","            title = instance.get('title');","","        if (title) {","            instance.set('headerContent', title);","        }","        // declare bodyContent: this must be rendered.","        instance.set('bodyContent', '');","    },","","    _bindViewUI : function() {","        var instance = this,","            eventhandlers = instance._eventhandlers,","            staticPosition = instance.get('staticPosition'),","            boundingBox = instance.get('boundingBox'),","            view = instance.view,","            panelheader;","","        if (staticPosition) {","            boundingBox.addClass('itsa-staticposition');","            // remove style position=relative, which is added by WidgetPosition","            boundingBox.setStyle('position', '');","        }","        if (instance.get('dragable') && !staticPosition) {","            panelheader = instance.getStdModNode(Y.WidgetStdMod.HEADER);","            Y.use('dd-plugin', function(Y){","                boundingBox.plug(Y.Plugin.Drag);","                if (panelheader) {","                    boundingBox.dd.addHandle('.yui3-widget-hd');","                }","            });","        }","        instance.constructor.superclass._bindViewUI.apply(instance);","        eventhandlers.push(","            view.after(","                'model:destroy',","                function() {","                    instance.hide();","                }","            )","        );","        eventhandlers.push(","            instance.after(","                'staticPositionChange',","                function(e) {","                    var staticPosition = e.newVal;","                    boundingBox.toggleClass('itsa-staticposition', staticPosition);","                    // remove style position=relative, which is added by WidgetPosition","                    boundingBox.setStyle('position', '');","                }","            )","        );","        eventhandlers.push(","            instance.after(","                'dragableChange',","                function(e) {","                    var dragable = e.newVal;","                    if (dragable && !instance.get('staticPosition')) {","                        panelheader = instance.getStdModNode(Y.WidgetStdMod.HEADER);","                        Y.use('dd-plugin', function(Y){","                            boundingBox.plug(Y.Plugin.Drag);","                            if (panelheader) {","                                boundingBox.dd.addHandle('.yui3-widget-hd');","                            }","                        });","                    }","                    else {","                        boundingBox.unplug('dd');","                    }","                }","            )","        );","    },","","    /**","     * Function for the addbutton. Adds a new model and fires an event.","     *","     * @method _addModel","     * @private","     * @protected","    */","    _addModel : function(e) {","        var instance = this,","            model = instance.get('model'),","            ModelClass, modelAttrs, currentConfig, newModel;","","        if (model) {","            e.buttonNode = e.target;","            e.target = model;","            e.type = EVT_ADD_CLICK;","            ModelClass = instance.get('newModelClass');","            modelAttrs = Y.clone(instance.get('newModelDefinition'));","            newModel = new ModelClass(modelAttrs);","            // now reattach the synclayer","            newModel.sync = model.sync;","            if (model.hasPlugin('itsaeditmodel')) {","                currentConfig = Y.clone(model.itsaeditmodel.getAttrs());","                Y.use('gallery-itsaeditmodel', function(Y) {","                    newModel.plug(Y.Plugin.ITSAEditModel, currentConfig);","                });","            }","            e.newModel = newModel;","            model.fire(EVT_ADD_CLICK, e);","        }","    },","","    /**","     * Function for the closebutton. Closes the panel the model and fires an event.","     *","     * @method _closeModel","     * @private","     * @protected","    */","    _closeModel : function(e) {","        var instance = this,","            model = instance.get('model');","","        if (model) {","            e.buttonNode = e.target;","            e.target = model;","            e.type = EVT_CLOSE_CLICK;","            instance.hide();","            model.fire(EVT_CLOSE_CLICK, e);","        }","    },","","    /**","     * Function for the destroybutton. Destroys the model and fires an event.","     *","     * @method _destroyModel","     * @private","     * @protected","    */","    _destroyModel : function(e) {","        var instance = this,","            model = instance.get('model');","","        if (model) {","            e.buttonNode = e.target;","            e.target = model;","            e.type = EVT_DESTROY_CLICK;","            syncOptions = instance.get('syncOptions');","            options = Y.merge({remove: true}, syncOptions.destroy || {});","            e.promise = model.destroyPromise(options);","            model.fire(EVT_DESTROY_CLICK, e);","        }","    },","","    /**","     * Function for the resetbutton. Resets the model and fires an event.","     *","     * @method _resetModel","     * @private","     * @protected","    */","    _resetModel : function(e) {","        var instance = this,","            model = instance.get('model');","","        if (model) {","            button = e.target,","            // set the focus manually. This will cause the View to be focussed as well --> now the focusmanager works for this View-instance","            button.focus();","            e.buttonNode = button;","            e.target = model;","            e.type = EVT_RESET_CLICK;","            model.fire(EVT_RESET_CLICK, e);","        }","    },","","    /**","     * Function for the savebutton. Saves the model and fires an event.","     *","     * @method _saveModel","     * @private","     * @protected","    */","    _saveModel : function(e) {","        var instance = this,","            model = instance.get('model');","","        if (model) {","            button = e.target,","            // set the focus manually. This will cause the View to be focussed as well --> now the focusmanager works for this View-instance","            button.focus();","            e.buttonNode = button;","            e.target = model;","            e.type = EVT_SAVE_CLICK;","            syncOptions = instance.get('syncOptions');","            options = syncOptions.save || {};","            e.promise = model.savePromise(options);","            model.fire(EVT_SAVE_CLICK, e);","        }","    },","","    /**","     * Function for the submitbutton. Submits the model and fires an event.","     *","     * @method _submitModel","     * @private","     * @protected","    */","    _submitModel : function(e) {","        var instance = this,","            model = instance.get('model');","","        if (model) {","            button = e.target,","            // set the focus manually. This will cause the View to be focussed as well --> now the focusmanager works for this View-instance","            button.focus();","            e.buttonNode = button;","            e.target = model;","            e.type = EVT_SUBMIT_CLICK;","            syncOptions = instance.get('syncOptions');","            options = syncOptions.submit || {};","            e.promise = model.submitPromise(options);","            model.fire(EVT_SUBMIT_CLICK, e);","        }","    },","","    /**","     * returns the view-container, which equals this.get('contentBox')","     *","     * @method _getViewContainer","     * @private","    */","    _getViewContainer : function() {","        return this.getStdModNode(Y.WidgetStdMod.BODY);","    },","","    /**","     * Calls the original Y.Widget.renderer. Needs to be overridden, because now we need to go 2 levels up.","     *","     * @method _widgetRenderer","     * @private","     * @protected","    */","    _widgetRenderer : function() {","        var instance = this;","","        instance.constructor.superclass.constructor.superclass.renderer.apply(instance);","    },","","    /**","     * Default setter for zIndex attribute changes. Normalizes zIndex values to","     * numbers, converting non-numerical values to 1.","     *","     * @method _setZIndex","     * @protected","     * @param {String | Number} zIndex","     * @return {Number} Normalized zIndex","     */","    _setZIndex: function(zIndex) {","        if (typeof zIndex === 'string') {","            zIndex = parseInt(zIndex, 10);","        }","        if (typeof zIndex !== 'number') {","            zIndex = 1;","        }","        if (zIndex<1) {","            zIndex = 1;","        }","        return zIndex;","    },","","    // -- Public Properties ----------------------------------------------------","","    /**","     * Collection of predefined buttons mapped from name => config.","     *","     * Panel includes a \"close\" button which can be use by name. When the close","     * button is in the header (which is the default), it will look like: [x].","     *","     * See `addButton()` for a list of possible configuration values.","     *","     * @example","     *     // Panel with close button in header.","     *     var panel = new Y.Panel({","     *         buttons: ['close']","     *     });","     *","     *     // Panel with close button in footer.","     *     var otherPanel = new Y.Panel({","     *         buttons: {","     *             footer: ['close']","     *         }","     *     });","     *","     * @property BUTTONS","     * @type Object","     * @default {close: {}}","     * @since 0.1","     *","    **/","    BUTTONS: {","        add: {","            label  : 'Add',","            action : '_addModel',","","            // Uses `type=\"button\"` so the button's default action can still","            // occur but it won't cause things like a form to submit.","            template  : '<button type=\"button\" />',","            classNames: [FORMELEMENT+'-add', FOCUSABLE]","        },","        close: {","            label  : 'Close',","            action : '_closeModel',","            section: 'header',","","            // Uses `type=\"button\"` so the button's default action can still","            // occur but it won't cause things like a form to submit.","            template  : '<button type=\"button\" />',","            classNames: getClassName('button', 'close')","        },","        destroy: {","            label  : 'Destroy',","            action : '_destroyModel',","","            // Uses `type=\"button\"` so the button's default action can still","            // occur but it won't cause things like a form to submit.","            template  : '<button type=\"button\" />',","            classNames: [FORMELEMENT+'-destroy', FOCUSABLE]","        },","        reset: {","            label  : 'Reset',","            action : '_resetModel',","","            // Uses `type=\"button\"` so the button's default action can still","            // occur but it won't cause things like a form to submit.","            template  : '<button type=\"button\" />',","            classNames: [FORMELEMENT+'-reset', FOCUSABLE]","        },","        save: {","            label  : 'Save',","            action : '_saveModel',","","            // Uses `type=\"button\"` so the button's default action can still","            // occur but it won't cause things like a form to submit.","            template  : '<button type=\"button\" />',","            classNames: [FORMELEMENT+'-save', FOCUSABLE]","        },","        submit: {","            label  : 'Submit',","            action : '_submitModel',","","            // Uses `type=\"button\"` so the button's default action can still","            // occur but it won't cause things like a form to submit.","            template  : '<button type=\"button\" />',","            classNames: [FORMELEMENT+'-submit', FOCUSABLE]","        }","    }","}, {","    ATTRS: {","        // TODO: API Docs.","        buttons: {","            value: ['close']","        },","","        /**","         * Makes the panel dragable. Only applyable when staticPosition=false.","         * Cautious: if you set dragable and don't have a header, then the panel gets dragable by its container. This will lead","         * text to be unselectable. If there is a header, then the panel is only dragable by its header and bodytext is selectable.","         * @attribute dragable","         * @type Boolean","         * @default false","         * @since 0.1","        */","        dragable : {","            value: false,","            validator: function(val) {","                return (typeof val === 'boolean');","            }","        },","","        /**","         * Title to appear in the header","         * @attribute title","         * @type String","         * @default null","         * @since 0.1","        */","        title : {","            value: null,","            validator: function(val) {","                return (typeof val === 'string');","            }","        },","","        /**","         * Specifies how <b>new models</b> will look like. When creating new Models, they get cloned from this object.","         * @attribute newModelDefinition","         * @type Object","         * @default {}","         * @since 0.1","        */","        newModelDefinition : {","            value: {},","            validator: function(val) {","                return (Lang.isObject(val));","            }","        },","","        /**","         * Specifies the Class of new created Models (that is, when a model:addclick event occurs).","         * @attribute newModelClass","         * @type Model","         * @default Y.Model","         * @since 0.1","        */","        newModelClass : {","            value: Y.Model","        },","","        /**","         * Makes the panel to be static (and able to go inline) instead op foated. When static positioned, you cannot use","         * the methods provided by WidgetPosition, WidgetPositionAlign and WidgetPositionConstrain and you cannot set 'dragable'","         * @attribute staticPosition","         * @type Boolean","         * @default false","         * @since 0.1","        */","        staticPosition : {","            value: false,","            validator: function(val) {","                return (typeof val === 'boolean');","            }","        },","","        /**","         * Object with the properties: <b>destroy</b>, <b>save</b> and <b>submit</b>. For every property you might want to","         * specify the options-object that will be passed through to the sync- or destroy-method. The destroymethod will","         * <i>always</i> be called with 'remove=true', in order to call the sync-method.","         * @attribute syncOptions","         * @type Object","         * @default {}","         * @since 0.1","        */","        syncOptions : {","            value: {},","            validator: function(val) {","                return Lang.isObject(val);","            }","        },","","        /**","         * @attribute zIndex","         * @type number","         * @default 1","         * @description The z-index to apply to the Widgets boundingBox. Non-numerical values for","         * zIndex will be converted to 1. Minumum value = 1.","         */","        zIndex: {","            value : 1,","            setter: '_setZIndex'","        }","","    }","});","","","}, '@VERSION@', {","    \"requires\": [","        \"base-build\",","        \"classnamemanager\",","        \"pluginhost-base\",","        \"gallery-itsaviewmodel\",","        \"widget-autohide\",","        \"widget-buttons\",","        \"widget-modality\",","        \"widget-position\",","        \"widget-position-align\",","        \"widget-position-constrain\",","        \"widget-stack\",","        \"widget-stdmod\"","    ],","    \"skinnable\": true","});"];
_yuitest_coverage["build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js"].lines = {"1":0,"36":0,"101":0,"115":0,"118":0,"119":0,"122":0,"126":0,"133":0,"134":0,"136":0,"138":0,"139":0,"140":0,"141":0,"142":0,"143":0,"147":0,"148":0,"152":0,"156":0,"160":0,"161":0,"163":0,"167":0,"171":0,"172":0,"173":0,"174":0,"175":0,"176":0,"177":0,"182":0,"197":0,"201":0,"202":0,"203":0,"204":0,"205":0,"206":0,"207":0,"209":0,"210":0,"211":0,"212":0,"213":0,"216":0,"217":0,"229":0,"232":0,"233":0,"234":0,"235":0,"236":0,"237":0,"249":0,"252":0,"253":0,"254":0,"255":0,"256":0,"257":0,"258":0,"259":0,"271":0,"274":0,"275":0,"278":0,"279":0,"280":0,"281":0,"293":0,"296":0,"297":0,"300":0,"301":0,"302":0,"303":0,"304":0,"305":0,"306":0,"318":0,"321":0,"322":0,"325":0,"326":0,"327":0,"328":0,"329":0,"330":0,"331":0,"342":0,"353":0,"355":0,"368":0,"369":0,"371":0,"372":0,"374":0,"375":0,"377":0,"485":0,"499":0,"513":0,"539":0,"555":0};
_yuitest_coverage["build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js"].functions = {"initializer:114":0,"(anonymous 2):140":0,"(anonymous 3):151":0,"(anonymous 4):159":0,"(anonymous 6):174":0,"(anonymous 5):170":0,"_bindViewUI:125":0,"(anonymous 7):212":0,"_addModel:196":0,"_closeModel:228":0,"_destroyModel:248":0,"_resetModel:270":0,"_saveModel:292":0,"_submitModel:317":0,"_getViewContainer:341":0,"_widgetRenderer:352":0,"_setZIndex:367":0,"validator:484":0,"validator:498":0,"validator:512":0,"validator:538":0,"validator:554":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js"].coveredLines = 106;
_yuitest_coverage["build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js"].coveredFunctions = 23;
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
var instance = this,
            title = instance.get('title');

        _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 118);
if (title) {
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 119);
instance.set('headerContent', title);
        }
        // declare bodyContent: this must be rendered.
        _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 122);
instance.set('bodyContent', '');
    },

    _bindViewUI : function() {
        _yuitest_coverfunc("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", "_bindViewUI", 125);
_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 126);
var instance = this,
            eventhandlers = instance._eventhandlers,
            staticPosition = instance.get('staticPosition'),
            boundingBox = instance.get('boundingBox'),
            view = instance.view,
            panelheader;

        _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 133);
if (staticPosition) {
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 134);
boundingBox.addClass('itsa-staticposition');
            // remove style position=relative, which is added by WidgetPosition
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 136);
boundingBox.setStyle('position', '');
        }
        _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 138);
if (instance.get('dragable') && !staticPosition) {
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 139);
panelheader = instance.getStdModNode(Y.WidgetStdMod.HEADER);
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 140);
Y.use('dd-plugin', function(Y){
                _yuitest_coverfunc("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", "(anonymous 2)", 140);
_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 141);
boundingBox.plug(Y.Plugin.Drag);
                _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 142);
if (panelheader) {
                    _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 143);
boundingBox.dd.addHandle('.yui3-widget-hd');
                }
            });
        }
        _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 147);
instance.constructor.superclass._bindViewUI.apply(instance);
        _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 148);
eventhandlers.push(
            view.after(
                'model:destroy',
                function() {
                    _yuitest_coverfunc("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", "(anonymous 3)", 151);
_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 152);
instance.hide();
                }
            )
        );
        _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 156);
eventhandlers.push(
            instance.after(
                'staticPositionChange',
                function(e) {
                    _yuitest_coverfunc("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", "(anonymous 4)", 159);
_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 160);
var staticPosition = e.newVal;
                    _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 161);
boundingBox.toggleClass('itsa-staticposition', staticPosition);
                    // remove style position=relative, which is added by WidgetPosition
                    _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 163);
boundingBox.setStyle('position', '');
                }
            )
        );
        _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 167);
eventhandlers.push(
            instance.after(
                'dragableChange',
                function(e) {
                    _yuitest_coverfunc("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", "(anonymous 5)", 170);
_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 171);
var dragable = e.newVal;
                    _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 172);
if (dragable && !instance.get('staticPosition')) {
                        _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 173);
panelheader = instance.getStdModNode(Y.WidgetStdMod.HEADER);
                        _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 174);
Y.use('dd-plugin', function(Y){
                            _yuitest_coverfunc("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", "(anonymous 6)", 174);
_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 175);
boundingBox.plug(Y.Plugin.Drag);
                            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 176);
if (panelheader) {
                                _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 177);
boundingBox.dd.addHandle('.yui3-widget-hd');
                            }
                        });
                    }
                    else {
                        _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 182);
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
        _yuitest_coverfunc("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", "_addModel", 196);
_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 197);
var instance = this,
            model = instance.get('model'),
            ModelClass, modelAttrs, currentConfig, newModel;

        _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 201);
if (model) {
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 202);
e.buttonNode = e.target;
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 203);
e.target = model;
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 204);
e.type = EVT_ADD_CLICK;
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 205);
ModelClass = instance.get('newModelClass');
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 206);
modelAttrs = Y.clone(instance.get('newModelDefinition'));
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 207);
newModel = new ModelClass(modelAttrs);
            // now reattach the synclayer
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 209);
newModel.sync = model.sync;
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 210);
if (model.hasPlugin('itsaeditmodel')) {
                _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 211);
currentConfig = Y.clone(model.itsaeditmodel.getAttrs());
                _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 212);
Y.use('gallery-itsaeditmodel', function(Y) {
                    _yuitest_coverfunc("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", "(anonymous 7)", 212);
_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 213);
newModel.plug(Y.Plugin.ITSAEditModel, currentConfig);
                });
            }
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 216);
e.newModel = newModel;
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 217);
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
        _yuitest_coverfunc("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", "_closeModel", 228);
_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 229);
var instance = this,
            model = instance.get('model');

        _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 232);
if (model) {
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 233);
e.buttonNode = e.target;
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 234);
e.target = model;
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 235);
e.type = EVT_CLOSE_CLICK;
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 236);
instance.hide();
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 237);
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
        _yuitest_coverfunc("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", "_destroyModel", 248);
_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 249);
var instance = this,
            model = instance.get('model');

        _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 252);
if (model) {
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 253);
e.buttonNode = e.target;
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 254);
e.target = model;
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 255);
e.type = EVT_DESTROY_CLICK;
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 256);
syncOptions = instance.get('syncOptions');
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 257);
options = Y.merge({remove: true}, syncOptions.destroy || {});
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 258);
e.promise = model.destroyPromise(options);
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 259);
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
        _yuitest_coverfunc("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", "_resetModel", 270);
_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 271);
var instance = this,
            model = instance.get('model');

        _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 274);
if (model) {
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 275);
button = e.target,
            // set the focus manually. This will cause the View to be focussed as well --> now the focusmanager works for this View-instance
            button.focus();
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 278);
e.buttonNode = button;
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 279);
e.target = model;
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 280);
e.type = EVT_RESET_CLICK;
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 281);
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
        _yuitest_coverfunc("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", "_saveModel", 292);
_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 293);
var instance = this,
            model = instance.get('model');

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
        _yuitest_coverfunc("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", "_submitModel", 317);
_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 318);
var instance = this,
            model = instance.get('model');

        _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 321);
if (model) {
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 322);
button = e.target,
            // set the focus manually. This will cause the View to be focussed as well --> now the focusmanager works for this View-instance
            button.focus();
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 325);
e.buttonNode = button;
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 326);
e.target = model;
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 327);
e.type = EVT_SUBMIT_CLICK;
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 328);
syncOptions = instance.get('syncOptions');
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 329);
options = syncOptions.submit || {};
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 330);
e.promise = model.submitPromise(options);
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 331);
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
        _yuitest_coverfunc("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", "_getViewContainer", 341);
_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 342);
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
        _yuitest_coverfunc("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", "_widgetRenderer", 352);
_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 353);
var instance = this;

        _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 355);
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
        _yuitest_coverfunc("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", "_setZIndex", 367);
_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 368);
if (typeof zIndex === 'string') {
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 369);
zIndex = parseInt(zIndex, 10);
        }
        _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 371);
if (typeof zIndex !== 'number') {
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 372);
zIndex = 1;
        }
        _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 374);
if (zIndex<1) {
            _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 375);
zIndex = 1;
        }
        _yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 377);
return zIndex;
    },

    // -- Public Properties ----------------------------------------------------

    /**
     * Collection of predefined buttons mapped from name => config.
     *
     * Panel includes a "close" button which can be use by name. When the close
     * button is in the header (which is the default), it will look like: [x].
     *
     * See `addButton()` for a list of possible configuration values.
     *
     * @example
     *     // Panel with close button in header.
     *     var panel = new Y.Panel({
     *         buttons: ['close']
     *     });
     *
     *     // Panel with close button in footer.
     *     var otherPanel = new Y.Panel({
     *         buttons: {
     *             footer: ['close']
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
        // TODO: API Docs.
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
                _yuitest_coverfunc("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", "validator", 484);
_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 485);
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
            validator: function(val) {
                _yuitest_coverfunc("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", "validator", 498);
_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 499);
return (typeof val === 'string');
            }
        },

        /**
         * Specifies how <b>new models</b> will look like. When creating new Models, they get cloned from this object.
         * @attribute newModelDefinition
         * @type Object
         * @default {}
         * @since 0.1
        */
        newModelDefinition : {
            value: {},
            validator: function(val) {
                _yuitest_coverfunc("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", "validator", 512);
_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 513);
return (Lang.isObject(val));
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
                _yuitest_coverfunc("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", "validator", 538);
_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 539);
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
                _yuitest_coverfunc("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", "validator", 554);
_yuitest_coverline("build/gallery-itsaviewmodelpanel/gallery-itsaviewmodelpanel.js", 555);
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
