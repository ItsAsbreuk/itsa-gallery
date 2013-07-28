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
_yuitest_coverage["build/gallery-itsaviewmodellistpanel/gallery-itsaviewmodellistpanel.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-itsaviewmodellistpanel/gallery-itsaviewmodellistpanel.js",
    code: []
};
_yuitest_coverage["build/gallery-itsaviewmodellistpanel/gallery-itsaviewmodellistpanel.js"].code=["YUI.add('gallery-itsaviewmodellistpanel', function (Y, NAME) {","","'use strict';","","/**"," *"," * Widget ITSAViewModellistPanel"," *"," *"," * Has the same functionalities as ITSAViewModel, but will come inside a Panel (which floats by default)."," * Also has standard a 'close'-button. Using WidgetButtons functionalyties, more buttons can be added."," *"," * These buttons are available by the module and will call Model's corresponding methods:"," *"," * close (visible by default)"," * add (for adding new Models to the list)"," *"," *"," * @class ITSAViewModellistPanel"," * @constructor"," * @extends ITSAViewModellist"," * @uses WidgetAutohide"," * @uses WidgetButtons"," * @uses WidgetModality"," * @uses WidgetPosition"," * @uses WidgetPositionAlign"," * @uses WidgetPositionConstrain"," * @uses WidgetStack"," * @uses WidgetStdMod"," * @since 0.1"," */","","","var getClassName = Y.ClassNameManager.getClassName,","    FORMELEMENT = 'yui3-itsaformelement',","    FOCUSABLE = 'focusable',","    /**","     * Fired when the 'closebutton' is pressed","     * @event closeclick","     * @param e {EventFacade} Event Facade including:","     * @param e.target {Y.ITSAViewModellistPanel} This instance","     * @since 0.1","    **/","    EVT_CLOSE_CLICK = 'closeclick',","    /**","     * Fired when the 'addbutton' is pressed","     * @event modellist:addclick","     * @param e {EventFacade} Event Facade including:","     * @param e.model {Y.Model} New model-instance","     * @param e.target {Y.ModelList} The modellist","     * @since 0.1","    **/","    EVT_ADD_CLICK = 'addclick';","","Y.ITSAViewModellistPanel = Y.Base.create('itsaviewmodellistpanel', Y.ITSAViewModellist, [","    // Other Widget extensions depend on these two.","    Y.WidgetPosition,","    Y.WidgetStdMod,","","    Y.WidgetAutohide,","    Y.WidgetButtons,","    Y.WidgetModality,","    Y.WidgetPositionAlign,","    Y.WidgetPositionConstrain,","    Y.WidgetStack","], {","","    initializer : function() {","        var instance = this;","","        // declare bodyContent: this must be rendered.","        instance.set('bodyContent', '');","    },","","   /**","     * Overruling _extraBindUI","     *","     * @method renderer","     * @private","    */","    _extraBindUI : function() {","        var instance = this,","            eventhandlers = instance._handlers,","            staticPosition = instance.get('staticPosition'),","            boundingBox = instance.get('boundingBox'),","            panelheader;","","        instance.constructor.superclass._extraBindUI.call(instance);","        if (staticPosition) {","            boundingBox.addClass('itsa-staticposition');","        }","        if (instance.get('dragable') && !staticPosition) {","            panelheader = instance.getStdModNode(Y.WidgetStdMod.HEADER);","            Y.use('dd-plugin', function(Y){","                boundingBox.plug(Y.Plugin.Drag);","                if (panelheader) {","                    boundingBox.dd.addHandle('.yui3-widget-hd');","                }","            });","        }","        eventhandlers.push(","            instance.after(","                'staticPositionChange',","                function(e) {","                    var staticPosition = e.newVal;","                    boundingBox.toggleClass('itsa-staticposition', staticPosition);","                }","            )","        );","        eventhandlers.push(","            instance.after(","                'dragableChange',","                function(e) {","                    var dragable = e.newVal;","                    if (dragable && !instance.get('staticPosition')) {","                        panelheader = instance.getStdModNode(Y.WidgetStdMod.HEADER);","                        Y.use('dd-plugin', function(Y){","                            boundingBox.plug(Y.Plugin.Drag);","                            if (panelheader) {","                                boundingBox.dd.addHandle('.yui3-widget-hd');","                            }","                        });","                    }","                    else {","                        boundingBox.unplug('dd');","                    }","                }","            )","        );","    },","","    /**","     * Function for the addbutton. Adds a new model and fires an event.","     *","     * @method _addModel","     * @private","     * @protected","    */","    _addModel : function() {","        var instance = this,","            modellist = instance.get('modelList'),","            ModelClass, newModel, e;","","        if (modellist) {","            ModelClass = instance.model;","            newModel = new ModelClass();","            e = {","                model: newModel","            };","            modellist.add(newModel);","            modellist.fire(EVT_ADD_CLICK, e);","        }","    },","","    /**","     * Function for the closebutton. Closes the panel the model and fires an event.","     *","     * @method _closeList","     * @private","     * @protected","    */","    _closeList : function() {","        var instance = this;","","        instance.hide();","        instance.fire(EVT_CLOSE_CLICK);","    },","","    /**","     * returns the view-container, which equals this.get('contentBox')","     *","     * @method _getViewContainer","     * @private","    */","    _getViewContainer : function() {","        return this.getStdModNode(Y.WidgetStdMod.BODY);","    },","","    /**","     * Calls the original Y.Widget.renderer. Needs to be overridden, because now we need to go 2 levels up.","     *","     * @method _widgetRenderer","     * @private","     * @protected","    */","    _widgetRenderer : function() {","        var instance = this;","","        instance.constructor.superclass.constructor.superclass.renderer.apply(instance);","    },","","    /**","     * Default setter for zIndex attribute changes. Normalizes zIndex values to","     * numbers, converting non-numerical values to 1.","     *","     * @method _setZIndex","     * @protected","     * @param {String | Number} zIndex","     * @return {Number} Normalized zIndex","     */","    _setZIndex: function(zIndex) {","        if (typeof zIndex === 'string') {","            zIndex = parseInt(zIndex, 10);","        }","        if (typeof zIndex !== 'number') {","            zIndex = 1;","        }","        if (zIndex<1) {","            zIndex = 1;","        }","        return zIndex;","    },","","    _uiSetXY : function(val) {","        var instance = this;","","        if (!instance.get('staticPosition')) {","            instance._posNode.setXY(val);","        }","    },","    // -- Public Properties ----------------------------------------------------","","    /**","     * Collection of predefined buttons mapped from name => config.","     *","     * ITSAViewModelPanel includes a \"close\" and \"add\" button which can be use by name. When the close","     * button is in the header (which is the default), it will look like: [x].","     *","     * See `addButton()` for a list of possible configuration values.","     *","     * @example","     *     // ITSAViewModelPanel with close-button in header and add-button in the footer.","     *     var viewmodelpanel = new Y.ITSAViewModelPanel({","     *         buttons: ['add', 'close']","     *     });","     *","     *     // ITSAViewModelPanel with close-button in header and add-button in the footer.","     *     var otherITSAViewModelPanel = new Y.ITSAViewModelPanel({","     *         buttons: {","     *             header: ['add', close']","     *         }","     *     });","     *","     * @property BUTTONS","     * @type Object","     * @default {close: {}}","     * @since 0.1","     *","    **/","    BUTTONS: {","        add: {","            label  : 'Add',","            action : '_addModel',","            section: 'header',","","            // Uses `type=\"button\"` so the button's default action can still","            // occur but it won't cause things like a form to submit.","            template  : '<button type=\"button\" />',","            classNames: [FORMELEMENT+'-add', FOCUSABLE]","        },","        close: {","            label  : 'Close',","            action : '_closeList',","            section: 'header',","","            // Uses `type=\"button\"` so the button's default action can still","            // occur but it won't cause things like a form to submit.","            template  : '<button type=\"button\" />',","            classNames: getClassName('button', 'close')","        }","    }","}, {","    ATTRS: {","        /**","         * Defenitions of the buttons that are on the panel. The buttons you want to show should be passed as an [String],","         * where the names can be looked up into the property BUTTONS. Values to be used are:","         * \"close\" and \"add\" which can be use by name. You can also specify the section","         * where the buttons should be rendered, in case you want it different from the default.","         * @attribute buttons","         * @type [String]","         * @default ['close']","         * @example","         *     // ITSAViewModelPanel with close-button in header and add-button in the footer.","         *     var viewmodelpanel = new Y.ITSAViewModelPanel({","         *         buttons: ['add', 'close']","         *     });","         *","         *     // ITSAViewModelPanel with close-button in header and add-button in the footer.","         *     var otherITSAViewModelPanel = new Y.ITSAViewModelPanel({","         *         buttons: {","         *             header: ['add', close']","         *         }","         *     });","         * @since 0.1","        */","        buttons: {","            value: ['close']","        },","","        /**","         * Makes the panel dragable. Only applyable when staticPosition=false.","         * Cautious: if you set dragable and don't have a header, then the panel gets dragable by its container. This will lead","         * text to be unselectable. If there is a header, then the panel is only dragable by its header and bodytext is selectable.","         * @attribute dragable","         * @type Boolean","         * @default false","         * @since 0.1","        */","        dragable : {","            value: false,","            validator: function(val) {","                return (typeof val === 'boolean');","            }","        },","","        /**","         * Title to appear in the header","         * @attribute title","         * @type String","         * @default null","         * @since 0.1","        */","        title : {","            value: null,","            lazyAdd: false,","            validator: function(val) {","                return (typeof val === 'string');","            },","            setter: function(val) {","                this.set('headerContent', val);","            }","        },","","        /**","         * Title to appear in the footer","         * @attribute title","         * @type String","         * @default null","         * @since 0.1","        */","        statusText : {","            value: null,","            lazyAdd: false,","            validator: function(val) {","                return (typeof val === 'string');","            },","            setter: function(val) {","                this.set('footerContent', val);","            }","        },","","        /**","         * Makes the panel to be static (and able to go inline) instead op foated. When static positioned, you cannot use","         * the methods provided by WidgetPosition, WidgetPositionAlign and WidgetPositionConstrain and you cannot set 'dragable'","         * @attribute staticPosition","         * @type Boolean","         * @default false","         * @since 0.1","        */","        staticPosition : {","            value: false,","            validator: function(val) {","                return (typeof val === 'boolean');","            }","        },","","        /**","         * @attribute zIndex","         * @type number","         * @default 1","         * @description The z-index to apply to the Widgets boundingBox. Non-numerical values for","         * zIndex will be converted to 1. Minumum value = 1.","         */","        zIndex: {","            value : 1,","            setter: '_setZIndex'","        }","","    }","});","","","}, '@VERSION@', {","    \"requires\": [","        \"base-build\",","        \"classnamemanager\",","        \"gallery-itsaviewmodellist\",","        \"widget-autohide\",","        \"widget-buttons\",","        \"widget-modality\",","        \"widget-position\",","        \"widget-position-align\",","        \"widget-position-constrain\",","        \"widget-stack\",","        \"widget-stdmod\"","    ],","    \"skinnable\": true","});"];
_yuitest_coverage["build/gallery-itsaviewmodellistpanel/gallery-itsaviewmodellistpanel.js"].lines = {"1":0,"3":0,"34":0,"55":0,"69":0,"72":0,"82":0,"88":0,"89":0,"90":0,"92":0,"93":0,"94":0,"95":0,"96":0,"97":0,"101":0,"105":0,"106":0,"110":0,"114":0,"115":0,"116":0,"117":0,"118":0,"119":0,"120":0,"125":0,"140":0,"144":0,"145":0,"146":0,"147":0,"150":0,"151":0,"163":0,"165":0,"166":0,"176":0,"187":0,"189":0,"202":0,"203":0,"205":0,"206":0,"208":0,"209":0,"211":0,"215":0,"217":0,"218":0,"312":0,"327":0,"330":0,"345":0,"348":0,"363":0};
_yuitest_coverage["build/gallery-itsaviewmodellistpanel/gallery-itsaviewmodellistpanel.js"].functions = {"initializer:68":0,"(anonymous 2):94":0,"(anonymous 3):104":0,"(anonymous 5):117":0,"(anonymous 4):113":0,"_extraBindUI:81":0,"_addModel:139":0,"_closeList:162":0,"_getViewContainer:175":0,"_widgetRenderer:186":0,"_setZIndex:201":0,"_uiSetXY:214":0,"validator:311":0,"validator:326":0,"setter:329":0,"validator:344":0,"setter:347":0,"validator:362":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-itsaviewmodellistpanel/gallery-itsaviewmodellistpanel.js"].coveredLines = 57;
_yuitest_coverage["build/gallery-itsaviewmodellistpanel/gallery-itsaviewmodellistpanel.js"].coveredFunctions = 19;
_yuitest_coverline("build/gallery-itsaviewmodellistpanel/gallery-itsaviewmodellistpanel.js", 1);
YUI.add('gallery-itsaviewmodellistpanel', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-itsaviewmodellistpanel/gallery-itsaviewmodellistpanel.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-itsaviewmodellistpanel/gallery-itsaviewmodellistpanel.js", 3);
'use strict';

/**
 *
 * Widget ITSAViewModellistPanel
 *
 *
 * Has the same functionalities as ITSAViewModel, but will come inside a Panel (which floats by default).
 * Also has standard a 'close'-button. Using WidgetButtons functionalyties, more buttons can be added.
 *
 * These buttons are available by the module and will call Model's corresponding methods:
 *
 * close (visible by default)
 * add (for adding new Models to the list)
 *
 *
 * @class ITSAViewModellistPanel
 * @constructor
 * @extends ITSAViewModellist
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


_yuitest_coverline("build/gallery-itsaviewmodellistpanel/gallery-itsaviewmodellistpanel.js", 34);
var getClassName = Y.ClassNameManager.getClassName,
    FORMELEMENT = 'yui3-itsaformelement',
    FOCUSABLE = 'focusable',
    /**
     * Fired when the 'closebutton' is pressed
     * @event closeclick
     * @param e {EventFacade} Event Facade including:
     * @param e.target {Y.ITSAViewModellistPanel} This instance
     * @since 0.1
    **/
    EVT_CLOSE_CLICK = 'closeclick',
    /**
     * Fired when the 'addbutton' is pressed
     * @event modellist:addclick
     * @param e {EventFacade} Event Facade including:
     * @param e.model {Y.Model} New model-instance
     * @param e.target {Y.ModelList} The modellist
     * @since 0.1
    **/
    EVT_ADD_CLICK = 'addclick';

_yuitest_coverline("build/gallery-itsaviewmodellistpanel/gallery-itsaviewmodellistpanel.js", 55);
Y.ITSAViewModellistPanel = Y.Base.create('itsaviewmodellistpanel', Y.ITSAViewModellist, [
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
        _yuitest_coverfunc("build/gallery-itsaviewmodellistpanel/gallery-itsaviewmodellistpanel.js", "initializer", 68);
_yuitest_coverline("build/gallery-itsaviewmodellistpanel/gallery-itsaviewmodellistpanel.js", 69);
var instance = this;

        // declare bodyContent: this must be rendered.
        _yuitest_coverline("build/gallery-itsaviewmodellistpanel/gallery-itsaviewmodellistpanel.js", 72);
instance.set('bodyContent', '');
    },

   /**
     * Overruling _extraBindUI
     *
     * @method renderer
     * @private
    */
    _extraBindUI : function() {
        _yuitest_coverfunc("build/gallery-itsaviewmodellistpanel/gallery-itsaviewmodellistpanel.js", "_extraBindUI", 81);
_yuitest_coverline("build/gallery-itsaviewmodellistpanel/gallery-itsaviewmodellistpanel.js", 82);
var instance = this,
            eventhandlers = instance._handlers,
            staticPosition = instance.get('staticPosition'),
            boundingBox = instance.get('boundingBox'),
            panelheader;

        _yuitest_coverline("build/gallery-itsaviewmodellistpanel/gallery-itsaviewmodellistpanel.js", 88);
instance.constructor.superclass._extraBindUI.call(instance);
        _yuitest_coverline("build/gallery-itsaviewmodellistpanel/gallery-itsaviewmodellistpanel.js", 89);
if (staticPosition) {
            _yuitest_coverline("build/gallery-itsaviewmodellistpanel/gallery-itsaviewmodellistpanel.js", 90);
boundingBox.addClass('itsa-staticposition');
        }
        _yuitest_coverline("build/gallery-itsaviewmodellistpanel/gallery-itsaviewmodellistpanel.js", 92);
if (instance.get('dragable') && !staticPosition) {
            _yuitest_coverline("build/gallery-itsaviewmodellistpanel/gallery-itsaviewmodellistpanel.js", 93);
panelheader = instance.getStdModNode(Y.WidgetStdMod.HEADER);
            _yuitest_coverline("build/gallery-itsaviewmodellistpanel/gallery-itsaviewmodellistpanel.js", 94);
Y.use('dd-plugin', function(Y){
                _yuitest_coverfunc("build/gallery-itsaviewmodellistpanel/gallery-itsaviewmodellistpanel.js", "(anonymous 2)", 94);
_yuitest_coverline("build/gallery-itsaviewmodellistpanel/gallery-itsaviewmodellistpanel.js", 95);
boundingBox.plug(Y.Plugin.Drag);
                _yuitest_coverline("build/gallery-itsaviewmodellistpanel/gallery-itsaviewmodellistpanel.js", 96);
if (panelheader) {
                    _yuitest_coverline("build/gallery-itsaviewmodellistpanel/gallery-itsaviewmodellistpanel.js", 97);
boundingBox.dd.addHandle('.yui3-widget-hd');
                }
            });
        }
        _yuitest_coverline("build/gallery-itsaviewmodellistpanel/gallery-itsaviewmodellistpanel.js", 101);
eventhandlers.push(
            instance.after(
                'staticPositionChange',
                function(e) {
                    _yuitest_coverfunc("build/gallery-itsaviewmodellistpanel/gallery-itsaviewmodellistpanel.js", "(anonymous 3)", 104);
_yuitest_coverline("build/gallery-itsaviewmodellistpanel/gallery-itsaviewmodellistpanel.js", 105);
var staticPosition = e.newVal;
                    _yuitest_coverline("build/gallery-itsaviewmodellistpanel/gallery-itsaviewmodellistpanel.js", 106);
boundingBox.toggleClass('itsa-staticposition', staticPosition);
                }
            )
        );
        _yuitest_coverline("build/gallery-itsaviewmodellistpanel/gallery-itsaviewmodellistpanel.js", 110);
eventhandlers.push(
            instance.after(
                'dragableChange',
                function(e) {
                    _yuitest_coverfunc("build/gallery-itsaviewmodellistpanel/gallery-itsaviewmodellistpanel.js", "(anonymous 4)", 113);
_yuitest_coverline("build/gallery-itsaviewmodellistpanel/gallery-itsaviewmodellistpanel.js", 114);
var dragable = e.newVal;
                    _yuitest_coverline("build/gallery-itsaviewmodellistpanel/gallery-itsaviewmodellistpanel.js", 115);
if (dragable && !instance.get('staticPosition')) {
                        _yuitest_coverline("build/gallery-itsaviewmodellistpanel/gallery-itsaviewmodellistpanel.js", 116);
panelheader = instance.getStdModNode(Y.WidgetStdMod.HEADER);
                        _yuitest_coverline("build/gallery-itsaviewmodellistpanel/gallery-itsaviewmodellistpanel.js", 117);
Y.use('dd-plugin', function(Y){
                            _yuitest_coverfunc("build/gallery-itsaviewmodellistpanel/gallery-itsaviewmodellistpanel.js", "(anonymous 5)", 117);
_yuitest_coverline("build/gallery-itsaviewmodellistpanel/gallery-itsaviewmodellistpanel.js", 118);
boundingBox.plug(Y.Plugin.Drag);
                            _yuitest_coverline("build/gallery-itsaviewmodellistpanel/gallery-itsaviewmodellistpanel.js", 119);
if (panelheader) {
                                _yuitest_coverline("build/gallery-itsaviewmodellistpanel/gallery-itsaviewmodellistpanel.js", 120);
boundingBox.dd.addHandle('.yui3-widget-hd');
                            }
                        });
                    }
                    else {
                        _yuitest_coverline("build/gallery-itsaviewmodellistpanel/gallery-itsaviewmodellistpanel.js", 125);
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
    _addModel : function() {
        _yuitest_coverfunc("build/gallery-itsaviewmodellistpanel/gallery-itsaviewmodellistpanel.js", "_addModel", 139);
_yuitest_coverline("build/gallery-itsaviewmodellistpanel/gallery-itsaviewmodellistpanel.js", 140);
var instance = this,
            modellist = instance.get('modelList'),
            ModelClass, newModel, e;

        _yuitest_coverline("build/gallery-itsaviewmodellistpanel/gallery-itsaviewmodellistpanel.js", 144);
if (modellist) {
            _yuitest_coverline("build/gallery-itsaviewmodellistpanel/gallery-itsaviewmodellistpanel.js", 145);
ModelClass = instance.model;
            _yuitest_coverline("build/gallery-itsaviewmodellistpanel/gallery-itsaviewmodellistpanel.js", 146);
newModel = new ModelClass();
            _yuitest_coverline("build/gallery-itsaviewmodellistpanel/gallery-itsaviewmodellistpanel.js", 147);
e = {
                model: newModel
            };
            _yuitest_coverline("build/gallery-itsaviewmodellistpanel/gallery-itsaviewmodellistpanel.js", 150);
modellist.add(newModel);
            _yuitest_coverline("build/gallery-itsaviewmodellistpanel/gallery-itsaviewmodellistpanel.js", 151);
modellist.fire(EVT_ADD_CLICK, e);
        }
    },

    /**
     * Function for the closebutton. Closes the panel the model and fires an event.
     *
     * @method _closeList
     * @private
     * @protected
    */
    _closeList : function() {
        _yuitest_coverfunc("build/gallery-itsaviewmodellistpanel/gallery-itsaviewmodellistpanel.js", "_closeList", 162);
_yuitest_coverline("build/gallery-itsaviewmodellistpanel/gallery-itsaviewmodellistpanel.js", 163);
var instance = this;

        _yuitest_coverline("build/gallery-itsaviewmodellistpanel/gallery-itsaviewmodellistpanel.js", 165);
instance.hide();
        _yuitest_coverline("build/gallery-itsaviewmodellistpanel/gallery-itsaviewmodellistpanel.js", 166);
instance.fire(EVT_CLOSE_CLICK);
    },

    /**
     * returns the view-container, which equals this.get('contentBox')
     *
     * @method _getViewContainer
     * @private
    */
    _getViewContainer : function() {
        _yuitest_coverfunc("build/gallery-itsaviewmodellistpanel/gallery-itsaviewmodellistpanel.js", "_getViewContainer", 175);
_yuitest_coverline("build/gallery-itsaviewmodellistpanel/gallery-itsaviewmodellistpanel.js", 176);
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
        _yuitest_coverfunc("build/gallery-itsaviewmodellistpanel/gallery-itsaviewmodellistpanel.js", "_widgetRenderer", 186);
_yuitest_coverline("build/gallery-itsaviewmodellistpanel/gallery-itsaviewmodellistpanel.js", 187);
var instance = this;

        _yuitest_coverline("build/gallery-itsaviewmodellistpanel/gallery-itsaviewmodellistpanel.js", 189);
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
        _yuitest_coverfunc("build/gallery-itsaviewmodellistpanel/gallery-itsaviewmodellistpanel.js", "_setZIndex", 201);
_yuitest_coverline("build/gallery-itsaviewmodellistpanel/gallery-itsaviewmodellistpanel.js", 202);
if (typeof zIndex === 'string') {
            _yuitest_coverline("build/gallery-itsaviewmodellistpanel/gallery-itsaviewmodellistpanel.js", 203);
zIndex = parseInt(zIndex, 10);
        }
        _yuitest_coverline("build/gallery-itsaviewmodellistpanel/gallery-itsaviewmodellistpanel.js", 205);
if (typeof zIndex !== 'number') {
            _yuitest_coverline("build/gallery-itsaviewmodellistpanel/gallery-itsaviewmodellistpanel.js", 206);
zIndex = 1;
        }
        _yuitest_coverline("build/gallery-itsaviewmodellistpanel/gallery-itsaviewmodellistpanel.js", 208);
if (zIndex<1) {
            _yuitest_coverline("build/gallery-itsaviewmodellistpanel/gallery-itsaviewmodellistpanel.js", 209);
zIndex = 1;
        }
        _yuitest_coverline("build/gallery-itsaviewmodellistpanel/gallery-itsaviewmodellistpanel.js", 211);
return zIndex;
    },

    _uiSetXY : function(val) {
        _yuitest_coverfunc("build/gallery-itsaviewmodellistpanel/gallery-itsaviewmodellistpanel.js", "_uiSetXY", 214);
_yuitest_coverline("build/gallery-itsaviewmodellistpanel/gallery-itsaviewmodellistpanel.js", 215);
var instance = this;

        _yuitest_coverline("build/gallery-itsaviewmodellistpanel/gallery-itsaviewmodellistpanel.js", 217);
if (!instance.get('staticPosition')) {
            _yuitest_coverline("build/gallery-itsaviewmodellistpanel/gallery-itsaviewmodellistpanel.js", 218);
instance._posNode.setXY(val);
        }
    },
    // -- Public Properties ----------------------------------------------------

    /**
     * Collection of predefined buttons mapped from name => config.
     *
     * ITSAViewModelPanel includes a "close" and "add" button which can be use by name. When the close
     * button is in the header (which is the default), it will look like: [x].
     *
     * See `addButton()` for a list of possible configuration values.
     *
     * @example
     *     // ITSAViewModelPanel with close-button in header and add-button in the footer.
     *     var viewmodelpanel = new Y.ITSAViewModelPanel({
     *         buttons: ['add', 'close']
     *     });
     *
     *     // ITSAViewModelPanel with close-button in header and add-button in the footer.
     *     var otherITSAViewModelPanel = new Y.ITSAViewModelPanel({
     *         buttons: {
     *             header: ['add', close']
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
            section: 'header',

            // Uses `type="button"` so the button's default action can still
            // occur but it won't cause things like a form to submit.
            template  : '<button type="button" />',
            classNames: [FORMELEMENT+'-add', FOCUSABLE]
        },
        close: {
            label  : 'Close',
            action : '_closeList',
            section: 'header',

            // Uses `type="button"` so the button's default action can still
            // occur but it won't cause things like a form to submit.
            template  : '<button type="button" />',
            classNames: getClassName('button', 'close')
        }
    }
}, {
    ATTRS: {
        /**
         * Defenitions of the buttons that are on the panel. The buttons you want to show should be passed as an [String],
         * where the names can be looked up into the property BUTTONS. Values to be used are:
         * "close" and "add" which can be use by name. You can also specify the section
         * where the buttons should be rendered, in case you want it different from the default.
         * @attribute buttons
         * @type [String]
         * @default ['close']
         * @example
         *     // ITSAViewModelPanel with close-button in header and add-button in the footer.
         *     var viewmodelpanel = new Y.ITSAViewModelPanel({
         *         buttons: ['add', 'close']
         *     });
         *
         *     // ITSAViewModelPanel with close-button in header and add-button in the footer.
         *     var otherITSAViewModelPanel = new Y.ITSAViewModelPanel({
         *         buttons: {
         *             header: ['add', close']
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
                _yuitest_coverfunc("build/gallery-itsaviewmodellistpanel/gallery-itsaviewmodellistpanel.js", "validator", 311);
_yuitest_coverline("build/gallery-itsaviewmodellistpanel/gallery-itsaviewmodellistpanel.js", 312);
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
                _yuitest_coverfunc("build/gallery-itsaviewmodellistpanel/gallery-itsaviewmodellistpanel.js", "validator", 326);
_yuitest_coverline("build/gallery-itsaviewmodellistpanel/gallery-itsaviewmodellistpanel.js", 327);
return (typeof val === 'string');
            },
            setter: function(val) {
                _yuitest_coverfunc("build/gallery-itsaviewmodellistpanel/gallery-itsaviewmodellistpanel.js", "setter", 329);
_yuitest_coverline("build/gallery-itsaviewmodellistpanel/gallery-itsaviewmodellistpanel.js", 330);
this.set('headerContent', val);
            }
        },

        /**
         * Title to appear in the footer
         * @attribute title
         * @type String
         * @default null
         * @since 0.1
        */
        statusText : {
            value: null,
            lazyAdd: false,
            validator: function(val) {
                _yuitest_coverfunc("build/gallery-itsaviewmodellistpanel/gallery-itsaviewmodellistpanel.js", "validator", 344);
_yuitest_coverline("build/gallery-itsaviewmodellistpanel/gallery-itsaviewmodellistpanel.js", 345);
return (typeof val === 'string');
            },
            setter: function(val) {
                _yuitest_coverfunc("build/gallery-itsaviewmodellistpanel/gallery-itsaviewmodellistpanel.js", "setter", 347);
_yuitest_coverline("build/gallery-itsaviewmodellistpanel/gallery-itsaviewmodellistpanel.js", 348);
this.set('footerContent', val);
            }
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
                _yuitest_coverfunc("build/gallery-itsaviewmodellistpanel/gallery-itsaviewmodellistpanel.js", "validator", 362);
_yuitest_coverline("build/gallery-itsaviewmodellistpanel/gallery-itsaviewmodellistpanel.js", 363);
return (typeof val === 'boolean');
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
        "gallery-itsaviewmodellist",
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
