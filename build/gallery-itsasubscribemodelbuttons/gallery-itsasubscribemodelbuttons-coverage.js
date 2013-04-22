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
_yuitest_coverage["build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js",
    code: []
};
_yuitest_coverage["build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js"].code=["YUI.add('gallery-itsasubscribemodelbuttons', function (Y, NAME) {","","'use strict';","","/**"," * ITSASubscribeModelButtons Plugin"," *"," *"," * Plugin for ITSAViewModelList, ITSAScrollViewModelList and ITSAViewModel"," *"," * The plugin makes that clicking on some elements within the Model causes the <i>Modelinstance</i> fire an event."," *"," * Be aware that -in case of LazyModelList- the objects are revived into Modelinstances and not freed. You may want to use"," * ITSAViewModel.get('modelList').free(model) in the subscriber after handling the event."," * This also means that -within the subscriber- e.target is always a Modelinstance."," *"," * 1. <i>buttons</i> or <i>input[type=button]</i> fire a <b>'model:buttonclick'</b>-event"," * 2. <i>a (anchor)-elements with class '.firemodel'</i> will fire a <b>'model:anchorclick'</b>-event <i>instead of the default behaviour</i>"," * 3. <i>DateTime-buttons</i> fire a <b>'model:datetimeclick'</b>-event <i>determined by the class '.itsa-button-datetime'</i>"," *"," * NS: 'itsamodelbtn'"," *"," * @module gallery-itsasubscribemodelbuttons"," * @class ITSASubscribeModelButtons"," * @extends Plugin.Base"," * @constructor"," * @since 0.1"," *"," * <i>Copyright (c) 2013 Marco Asbreuk - http://itsasbreuk.nl</i>"," * YUI BSD License - http://developer.yahoo.com/yui/license.html"," *","*/","","// -- Public Static Properties -------------------------------------------------","","/**"," * Internal list that holds event-references"," * @property _eventhandlers"," * @private"," * @type Array"," */","","/**"," * The plugin's host"," * @property host"," * @type ScrollView-instance"," */","","var YArray = Y.Array,","    MODEL_CLASS = 'itsa-model',","    FIREMODEL = 'firemodel',","    ANCHOREVENT = 'anchorclick',","    BUTTONEVENT = 'buttonclick',","    DATETIMEEVENT = 'datetimeclick',","    ITSABUTTON_DATETIME_CLASS = 'itsa-button-datetime',","    FORMELEMENT_CLASS = 'yui3-itsaformelement',","    ITSAFORMELEMENT_BUTTONTYPE_CLASS = FORMELEMENT_CLASS + '-inputbutton';","","Y.namespace('Plugin').ITSASubscribeModelButtons = Y.Base.create('itsasubscribemodelbuttons', Y.Plugin.Base, [], {","","        /**","         * Internal list that holds event-references","         * @property _eventhandlers","         * @private","         * @type Array","         */","        _eventhandlers : [],","","        /**","         * The plugin's host, which should be a ScrollView-instance","         * @property host","         * @type Y.ITSAViewModellist|Y.ITSAScrollViewModellist-instance","         */","        host : null,","","        /**","         * Sets up the toolbar during initialisation. Calls render() as soon as the hosts-editorframe is ready","         *","         * @method initializer","         * @protected","         * @since 0.1","         */","        initializer : function() {","            var instance = this;","","            instance.host = instance.get('host');","            instance._bindUI();","        },","","        /**","         * Cleans up bindings and removes plugin","         * @method destructor","         * @protected","         * @since 0.1","        */","        destructor : function() {","            this._clearEventhandlers();","        },","","        //===============================================================================================","        // private methods","        //===============================================================================================","","        /**","         * Binding events","         *","         * @method _bindUI","         * @private","         * @since 0.1","        */","        _bindUI : function() {","            var instance = this,","                host = instance.host,","                boundingBox = host.get('boundingBox');","","            instance._eventhandlers.push(","                boundingBox.delegate(","                    'click',","                    Y.rbind(instance._fireCustomEvent, instance),","                    function() {","                        return this.test('button,input[type=button],a.'+FIREMODEL+","                                         ',.'+ITSABUTTON_DATETIME_CLASS+',.'+ITSAFORMELEMENT_BUTTONTYPE_CLASS);","                    }","                )","            );","        },","","        /**","         * Will make the model fire an event (either model:buttonclick, model:anchorclick or model:datetimeclick).","         *","         * @method _fireCustomEvent","         * @param {EventTarget} e","         * @private","         * @since 0.1","         *","        */","        _fireCustomEvent : function(e) {","            var instance = this,","                host = instance.host,","                model, node, clientId, modelList, tagName, eventtype, isModelInstance;","","            // In case the host is an Y.ITSAViewModel-instance, then the attribute 'model' is available","            // In case the host is an Y.ITSAViewModelList or Y.ITSAScrollViewModelList, look for a node with class 'itsa-model'","            model = host.get('model');","            node = e.currentTarget;","            tagName = node.get('tagName');","","            if ((tagName==='BUTTON') || (tagName==='INPUT')) {","                if (node.hasClass(ITSABUTTON_DATETIME_CLASS)) {","                    eventtype = DATETIMEEVENT;","                }","                else {","                    eventtype = BUTTONEVENT;","                }","            }","            else if (tagName==='A') {","                eventtype = ANCHOREVENT;","                e.preventDefault();","            }","            else {","                eventtype = e.type;","            }","            if (!model) {","                // assume Y.ITSAViewModelList or Y.ITSAScrollViewModelList","                node = node.get('parentNode');","                while (node && !node.hasClass(MODEL_CLASS)) {","                    node = node.get('parentNode');","                }","                if (node && node.hasClass(MODEL_CLASS)) {","                    // found the node-element that holds the model","                    clientId = node.getData('modelClientId');","                    modelList = host.getModelListInUse && host.getModelListInUse();","                    model = modelList && modelList.getByClientId(clientId);","                }","            }","            // now make sure model is a Model and not an object of LazyModelList","            isModelInstance = (model.get && (typeof model.get==='function'));","            if (!isModelInstance) {","                modelList = modelList || (host.getModelListInUse && host.getModelListInUse());","                model = modelList.revive(model);","            }","            if (model) {","                /**","                 * Is fired when the user clicks on a <b>button</b> or a <input[type=button]</b>.","                 *","                 * @event model:buttonclick","                 * @param node {Y.Node} the button - or input[type=button] - that was clicked.","                 * @since 0.1","                **/","","                /**","                 * Is fired when the user clicks on a anchor-element with className 'firemodel'.","                 *","                 * @event model:anchorclick","                 * @param node {Y.Node} the anchor-elementnode that was clicked.","                 * @since 0.1","                **/","","                /**","                 * Is fired when the user clicks on a datetime-icon (see gallery-itsadatetimepicker).","                 *","                 * @event model:datetimeclick","                 * @param node {Y.Node} the node that was clicked.","                 * @since 0.1","                **/","                e.type = eventtype;","                e.node = e.currentTarget;","                model.fire(eventtype, e);","            }","            else {","            }","        },","","        /**","         * Cleaning up all eventlisteners","         *","         * @method _clearEventhandlers","         * @private","         * @since 0.1","         *","        */","        _clearEventhandlers : function() {","            YArray.each(","                this._eventhandlers,","                function(item){","                    item.detach();","                }","            );","        }","","    }, {","        NS : 'itsamodelbtn',","        ATTRS : {","        }","    }",");","","}, '@VERSION@', {","    \"requires\": [","        \"yui-base\",","        \"base-base\",","        \"base-build\",","        \"node-base\",","        \"oop\",","        \"event-custom\",","        \"node-event-delegate\",","        \"plugin\"","    ],","    \"skinnable\": true","});"];
_yuitest_coverage["build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js"].lines = {"1":0,"3":0,"49":0,"59":0,"84":0,"86":0,"87":0,"97":0,"112":0,"116":0,"121":0,"138":0,"144":0,"145":0,"146":0,"148":0,"149":0,"150":0,"153":0,"156":0,"157":0,"158":0,"161":0,"163":0,"165":0,"166":0,"167":0,"169":0,"171":0,"172":0,"173":0,"177":0,"178":0,"179":0,"180":0,"182":0,"206":0,"207":0,"208":0,"223":0,"226":0};
_yuitest_coverage["build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js"].functions = {"initializer:83":0,"destructor:96":0,"(anonymous 2):120":0,"_bindUI:111":0,"_fireCustomEvent:137":0,"(anonymous 3):225":0,"_clearEventhandlers:222":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js"].coveredLines = 41;
_yuitest_coverage["build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js"].coveredFunctions = 8;
_yuitest_coverline("build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js", 1);
YUI.add('gallery-itsasubscribemodelbuttons', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js", 3);
'use strict';

/**
 * ITSASubscribeModelButtons Plugin
 *
 *
 * Plugin for ITSAViewModelList, ITSAScrollViewModelList and ITSAViewModel
 *
 * The plugin makes that clicking on some elements within the Model causes the <i>Modelinstance</i> fire an event.
 *
 * Be aware that -in case of LazyModelList- the objects are revived into Modelinstances and not freed. You may want to use
 * ITSAViewModel.get('modelList').free(model) in the subscriber after handling the event.
 * This also means that -within the subscriber- e.target is always a Modelinstance.
 *
 * 1. <i>buttons</i> or <i>input[type=button]</i> fire a <b>'model:buttonclick'</b>-event
 * 2. <i>a (anchor)-elements with class '.firemodel'</i> will fire a <b>'model:anchorclick'</b>-event <i>instead of the default behaviour</i>
 * 3. <i>DateTime-buttons</i> fire a <b>'model:datetimeclick'</b>-event <i>determined by the class '.itsa-button-datetime'</i>
 *
 * NS: 'itsamodelbtn'
 *
 * @module gallery-itsasubscribemodelbuttons
 * @class ITSASubscribeModelButtons
 * @extends Plugin.Base
 * @constructor
 * @since 0.1
 *
 * <i>Copyright (c) 2013 Marco Asbreuk - http://itsasbreuk.nl</i>
 * YUI BSD License - http://developer.yahoo.com/yui/license.html
 *
*/

// -- Public Static Properties -------------------------------------------------

/**
 * Internal list that holds event-references
 * @property _eventhandlers
 * @private
 * @type Array
 */

/**
 * The plugin's host
 * @property host
 * @type ScrollView-instance
 */

_yuitest_coverline("build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js", 49);
var YArray = Y.Array,
    MODEL_CLASS = 'itsa-model',
    FIREMODEL = 'firemodel',
    ANCHOREVENT = 'anchorclick',
    BUTTONEVENT = 'buttonclick',
    DATETIMEEVENT = 'datetimeclick',
    ITSABUTTON_DATETIME_CLASS = 'itsa-button-datetime',
    FORMELEMENT_CLASS = 'yui3-itsaformelement',
    ITSAFORMELEMENT_BUTTONTYPE_CLASS = FORMELEMENT_CLASS + '-inputbutton';

_yuitest_coverline("build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js", 59);
Y.namespace('Plugin').ITSASubscribeModelButtons = Y.Base.create('itsasubscribemodelbuttons', Y.Plugin.Base, [], {

        /**
         * Internal list that holds event-references
         * @property _eventhandlers
         * @private
         * @type Array
         */
        _eventhandlers : [],

        /**
         * The plugin's host, which should be a ScrollView-instance
         * @property host
         * @type Y.ITSAViewModellist|Y.ITSAScrollViewModellist-instance
         */
        host : null,

        /**
         * Sets up the toolbar during initialisation. Calls render() as soon as the hosts-editorframe is ready
         *
         * @method initializer
         * @protected
         * @since 0.1
         */
        initializer : function() {
            _yuitest_coverfunc("build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js", "initializer", 83);
_yuitest_coverline("build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js", 84);
var instance = this;

            _yuitest_coverline("build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js", 86);
instance.host = instance.get('host');
            _yuitest_coverline("build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js", 87);
instance._bindUI();
        },

        /**
         * Cleans up bindings and removes plugin
         * @method destructor
         * @protected
         * @since 0.1
        */
        destructor : function() {
            _yuitest_coverfunc("build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js", "destructor", 96);
_yuitest_coverline("build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js", 97);
this._clearEventhandlers();
        },

        //===============================================================================================
        // private methods
        //===============================================================================================

        /**
         * Binding events
         *
         * @method _bindUI
         * @private
         * @since 0.1
        */
        _bindUI : function() {
            _yuitest_coverfunc("build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js", "_bindUI", 111);
_yuitest_coverline("build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js", 112);
var instance = this,
                host = instance.host,
                boundingBox = host.get('boundingBox');

            _yuitest_coverline("build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js", 116);
instance._eventhandlers.push(
                boundingBox.delegate(
                    'click',
                    Y.rbind(instance._fireCustomEvent, instance),
                    function() {
                        _yuitest_coverfunc("build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js", "(anonymous 2)", 120);
_yuitest_coverline("build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js", 121);
return this.test('button,input[type=button],a.'+FIREMODEL+
                                         ',.'+ITSABUTTON_DATETIME_CLASS+',.'+ITSAFORMELEMENT_BUTTONTYPE_CLASS);
                    }
                )
            );
        },

        /**
         * Will make the model fire an event (either model:buttonclick, model:anchorclick or model:datetimeclick).
         *
         * @method _fireCustomEvent
         * @param {EventTarget} e
         * @private
         * @since 0.1
         *
        */
        _fireCustomEvent : function(e) {
            _yuitest_coverfunc("build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js", "_fireCustomEvent", 137);
_yuitest_coverline("build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js", 138);
var instance = this,
                host = instance.host,
                model, node, clientId, modelList, tagName, eventtype, isModelInstance;

            // In case the host is an Y.ITSAViewModel-instance, then the attribute 'model' is available
            // In case the host is an Y.ITSAViewModelList or Y.ITSAScrollViewModelList, look for a node with class 'itsa-model'
            _yuitest_coverline("build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js", 144);
model = host.get('model');
            _yuitest_coverline("build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js", 145);
node = e.currentTarget;
            _yuitest_coverline("build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js", 146);
tagName = node.get('tagName');

            _yuitest_coverline("build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js", 148);
if ((tagName==='BUTTON') || (tagName==='INPUT')) {
                _yuitest_coverline("build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js", 149);
if (node.hasClass(ITSABUTTON_DATETIME_CLASS)) {
                    _yuitest_coverline("build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js", 150);
eventtype = DATETIMEEVENT;
                }
                else {
                    _yuitest_coverline("build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js", 153);
eventtype = BUTTONEVENT;
                }
            }
            else {_yuitest_coverline("build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js", 156);
if (tagName==='A') {
                _yuitest_coverline("build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js", 157);
eventtype = ANCHOREVENT;
                _yuitest_coverline("build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js", 158);
e.preventDefault();
            }
            else {
                _yuitest_coverline("build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js", 161);
eventtype = e.type;
            }}
            _yuitest_coverline("build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js", 163);
if (!model) {
                // assume Y.ITSAViewModelList or Y.ITSAScrollViewModelList
                _yuitest_coverline("build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js", 165);
node = node.get('parentNode');
                _yuitest_coverline("build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js", 166);
while (node && !node.hasClass(MODEL_CLASS)) {
                    _yuitest_coverline("build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js", 167);
node = node.get('parentNode');
                }
                _yuitest_coverline("build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js", 169);
if (node && node.hasClass(MODEL_CLASS)) {
                    // found the node-element that holds the model
                    _yuitest_coverline("build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js", 171);
clientId = node.getData('modelClientId');
                    _yuitest_coverline("build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js", 172);
modelList = host.getModelListInUse && host.getModelListInUse();
                    _yuitest_coverline("build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js", 173);
model = modelList && modelList.getByClientId(clientId);
                }
            }
            // now make sure model is a Model and not an object of LazyModelList
            _yuitest_coverline("build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js", 177);
isModelInstance = (model.get && (typeof model.get==='function'));
            _yuitest_coverline("build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js", 178);
if (!isModelInstance) {
                _yuitest_coverline("build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js", 179);
modelList = modelList || (host.getModelListInUse && host.getModelListInUse());
                _yuitest_coverline("build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js", 180);
model = modelList.revive(model);
            }
            _yuitest_coverline("build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js", 182);
if (model) {
                /**
                 * Is fired when the user clicks on a <b>button</b> or a <input[type=button]</b>.
                 *
                 * @event model:buttonclick
                 * @param node {Y.Node} the button - or input[type=button] - that was clicked.
                 * @since 0.1
                **/

                /**
                 * Is fired when the user clicks on a anchor-element with className 'firemodel'.
                 *
                 * @event model:anchorclick
                 * @param node {Y.Node} the anchor-elementnode that was clicked.
                 * @since 0.1
                **/

                /**
                 * Is fired when the user clicks on a datetime-icon (see gallery-itsadatetimepicker).
                 *
                 * @event model:datetimeclick
                 * @param node {Y.Node} the node that was clicked.
                 * @since 0.1
                **/
                _yuitest_coverline("build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js", 206);
e.type = eventtype;
                _yuitest_coverline("build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js", 207);
e.node = e.currentTarget;
                _yuitest_coverline("build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js", 208);
model.fire(eventtype, e);
            }
            else {
            }
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
            _yuitest_coverfunc("build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js", "_clearEventhandlers", 222);
_yuitest_coverline("build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js", 223);
YArray.each(
                this._eventhandlers,
                function(item){
                    _yuitest_coverfunc("build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js", "(anonymous 3)", 225);
_yuitest_coverline("build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js", 226);
item.detach();
                }
            );
        }

    }, {
        NS : 'itsamodelbtn',
        ATTRS : {
        }
    }
);

}, '@VERSION@', {
    "requires": [
        "yui-base",
        "base-base",
        "base-build",
        "node-base",
        "oop",
        "event-custom",
        "node-event-delegate",
        "plugin"
    ],
    "skinnable": true
});
