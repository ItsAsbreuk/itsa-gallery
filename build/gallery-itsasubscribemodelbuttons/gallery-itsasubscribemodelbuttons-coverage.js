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
_yuitest_coverage["build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js"].code=["YUI.add('gallery-itsasubscribemodelbuttons', function (Y, NAME) {","","'use strict';","","/**"," * ITSASubscribeModelButtons Plugin"," *"," *"," * Plugin for ITSAViewModelList, ITSAScrollViewModelList and ITSAViewModel"," *"," * The plugin makes that clicking on Buttons fire a <b>'buttonclick'</b>-event with e.model as an extra property."," * Also, anchor-elements can be transformed to firing a <b>'anchorclick'</b>-event with e.model instead of the default behaviour."," * You just need to add the className <b>'firemodel'</b> to the anchor-element to get this behaviour."," *"," * e.model can be a Model-instance OR an object. This depends on the type that was rendered (using LazyModelList or ITSAViewModel with an object)."," *"," *"," * @module gallery-itsasubscribemodelbuttons"," * @class ITSASubscribeModelButtons"," * @extends Plugin.Base"," * @constructor"," * @since 0.1"," *"," * <i>Copyright (c) 2013 Marco Asbreuk - http://itsasbreuk.nl</i>"," * YUI BSD License - http://developer.yahoo.com/yui/license.html"," *","*/","","// -- Public Static Properties -------------------------------------------------","","/**"," * Internal list that holds event-references"," * @property _eventhandlers"," * @private"," * @type Array"," */","","/**"," * The plugin's host"," * @property host"," * @type ScrollView-instance"," */","","var YArray = Y.Array,","    MODEL_CLASS = 'itsa-model',","    FIREMODEL = 'firemodel',","    ANCHOREVENT = 'anchorclick',","    BUTTONEVENT = 'buttonclick';","","Y.namespace('Plugin').ITSASubscribeModelButtons = Y.Base.create('itsasubscribemodelbuttons', Y.Plugin.Base, [], {","","        _eventhandlers : [],","        host : null,","","        /**","         * Sets up the toolbar during initialisation. Calls render() as soon as the hosts-editorframe is ready","         *","         * @method initializer","         * @protected","         * @since 0.1","         */","        initializer : function() {","            var instance = this;","","            instance.host = instance.get('host');","            instance._bindUI();","        },","","        /**","         * Cleans up bindings and removes plugin","         * @method destructor","         * @protected","         * @since 0.1","        */","        destructor : function() {","            this._clearEventhandlers();","        },","","        //===============================================================================================","        // private methods","        //===============================================================================================","","        /**","         * Binding events","         *","         * @method _bindUI","         * @private","         * @since 0.1","        */","        _bindUI : function() {","            var instance = this,","                host = instance.host,","                contentBox = host.get('contentBox');","","            instance._eventhandlers.push(","                contentBox.delegate(","                    'click',","                    Y.rbind(instance._fireEvent, instance, BUTTONEVENT),","                    function() {","                        var node = this,","                            tagName = node.get('tagName'),","                            lastScrolledAmt = host.lastScrolledAmt,","                            scrollingInAction = lastScrolledAmt && (Math.abs(host.lastScrolledAmt) > host.get('clickSensivity'));","                        return (!scrollingInAction && (tagName==='BUTTON'));","                    }","                )","            );","            instance._eventhandlers.push(","                contentBox.delegate(","                    'click',","                    Y.rbind(instance._fireEvent, instance, ANCHOREVENT),","                    function() {","                        var node = this,","                            tagName = node.get('tagName'),","                            lastScrolledAmt = host.lastScrolledAmt,","                            scrollingInAction = lastScrolledAmt && (Math.abs(host.lastScrolledAmt) > host.get('clickSensivity'));","                        return (!scrollingInAction && ((tagName==='A') && node.hasClass(FIREMODEL)));","                    }","                )","            );","        },","","        /**","         * Handles the keydown-events. Can perform several things: scolling and (multi)-selecting.","         *","         * @method _fireEvent","         * @param {EventTarget} e","         * @private","         * @since 0.1","         *","        */","        _fireEvent : function(e, eventname) {","            var instance = this,","                host = instance.host,","                model, node, clientId, modelList;","","            // In case the host is an Y.ITSAViewModel-instance, then the attribute 'model' is available","            // In case the host is an Y.ITSAViewModelList or Y.ITSAScrollViewModelList, look for a node with class 'itsa-model'","            model = host.get('model');","            if (!model) {","                // assume Y.ITSAViewModelList or Y.ITSAScrollViewModelList","                node = e.currentTarget.get('parentNode');","                while (node && !node.hasClass(MODEL_CLASS)) {","                    node = node.get('parentNode');","                }","                if (node && node.hasClass(MODEL_CLASS)) {","                    // found the node-element that holds the model","                    clientId = node.getData('modelClientId');","                    modelList = host.getModelListInUse && host.getModelListInUse();","                    model = modelList && modelList.getByClientId(clientId);","                }","","            }","            if (model) {","                /**","                 * Is fired when the user clicks on a Button.","                 *","                 * @event buttonclick","                 * @param {Y.Node} currentTarget the node that was clicked.","                 * @param {Y.Model|Object} model the rendered-model and holds the button as a childnode. In case of LazyModelList: type is an object.","                 * @since 0.1","                **/","","                /**","                 * Is fired when the user clicks on a anchor-element with className 'firemodel'.","                 *","                 * @event anchorclick","                 * @param {Y.Node} currentTarget the node that was clicked.","                 * @param {Y.Model|Object} model the rendered-model and holds the button as a childnode. In case of LazyModelList: type is an object.","                 * @since 0.1","                **/","                e.model = model;","                if (eventname===ANCHOREVENT) {","                    e.preventDefault();","                }","                host.fire(eventname, e);","            }","            else {","","            }","        },","","        /**","         * Cleaning up all eventlisteners","         *","         * @method _clearEventhandlers","         * @private","         * @since 0.1","         *","        */","        _clearEventhandlers : function() {","            YArray.each(","                this._eventhandlers,","                function(item){","                    item.detach();","                }","            );","        }","","    }, {","        NS : 'itsamodelbtn',","        ATTRS : {","        }","    }",");","","}, '@VERSION@', {\"requires\": [\"base-build\", \"node-base\", \"event-custom\", \"node-event-delegate\", \"plugin\"]});"];
_yuitest_coverage["build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js"].lines = {"1":0,"3":0,"44":0,"50":0,"63":0,"65":0,"66":0,"76":0,"91":0,"95":0,"100":0,"104":0,"108":0,"113":0,"117":0,"133":0,"139":0,"140":0,"142":0,"143":0,"144":0,"146":0,"148":0,"149":0,"150":0,"154":0,"172":0,"173":0,"174":0,"176":0,"192":0,"195":0};
_yuitest_coverage["build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js"].functions = {"initializer:62":0,"destructor:75":0,"(anonymous 2):99":0,"(anonymous 3):112":0,"_bindUI:90":0,"_fireEvent:132":0,"(anonymous 4):194":0,"_clearEventhandlers:191":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js"].coveredLines = 32;
_yuitest_coverage["build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js"].coveredFunctions = 9;
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
 * The plugin makes that clicking on Buttons fire a <b>'buttonclick'</b>-event with e.model as an extra property.
 * Also, anchor-elements can be transformed to firing a <b>'anchorclick'</b>-event with e.model instead of the default behaviour.
 * You just need to add the className <b>'firemodel'</b> to the anchor-element to get this behaviour.
 *
 * e.model can be a Model-instance OR an object. This depends on the type that was rendered (using LazyModelList or ITSAViewModel with an object).
 *
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

_yuitest_coverline("build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js", 44);
var YArray = Y.Array,
    MODEL_CLASS = 'itsa-model',
    FIREMODEL = 'firemodel',
    ANCHOREVENT = 'anchorclick',
    BUTTONEVENT = 'buttonclick';

_yuitest_coverline("build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js", 50);
Y.namespace('Plugin').ITSASubscribeModelButtons = Y.Base.create('itsasubscribemodelbuttons', Y.Plugin.Base, [], {

        _eventhandlers : [],
        host : null,

        /**
         * Sets up the toolbar during initialisation. Calls render() as soon as the hosts-editorframe is ready
         *
         * @method initializer
         * @protected
         * @since 0.1
         */
        initializer : function() {
            _yuitest_coverfunc("build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js", "initializer", 62);
_yuitest_coverline("build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js", 63);
var instance = this;

            _yuitest_coverline("build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js", 65);
instance.host = instance.get('host');
            _yuitest_coverline("build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js", 66);
instance._bindUI();
        },

        /**
         * Cleans up bindings and removes plugin
         * @method destructor
         * @protected
         * @since 0.1
        */
        destructor : function() {
            _yuitest_coverfunc("build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js", "destructor", 75);
_yuitest_coverline("build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js", 76);
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
            _yuitest_coverfunc("build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js", "_bindUI", 90);
_yuitest_coverline("build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js", 91);
var instance = this,
                host = instance.host,
                contentBox = host.get('contentBox');

            _yuitest_coverline("build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js", 95);
instance._eventhandlers.push(
                contentBox.delegate(
                    'click',
                    Y.rbind(instance._fireEvent, instance, BUTTONEVENT),
                    function() {
                        _yuitest_coverfunc("build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js", "(anonymous 2)", 99);
_yuitest_coverline("build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js", 100);
var node = this,
                            tagName = node.get('tagName'),
                            lastScrolledAmt = host.lastScrolledAmt,
                            scrollingInAction = lastScrolledAmt && (Math.abs(host.lastScrolledAmt) > host.get('clickSensivity'));
                        _yuitest_coverline("build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js", 104);
return (!scrollingInAction && (tagName==='BUTTON'));
                    }
                )
            );
            _yuitest_coverline("build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js", 108);
instance._eventhandlers.push(
                contentBox.delegate(
                    'click',
                    Y.rbind(instance._fireEvent, instance, ANCHOREVENT),
                    function() {
                        _yuitest_coverfunc("build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js", "(anonymous 3)", 112);
_yuitest_coverline("build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js", 113);
var node = this,
                            tagName = node.get('tagName'),
                            lastScrolledAmt = host.lastScrolledAmt,
                            scrollingInAction = lastScrolledAmt && (Math.abs(host.lastScrolledAmt) > host.get('clickSensivity'));
                        _yuitest_coverline("build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js", 117);
return (!scrollingInAction && ((tagName==='A') && node.hasClass(FIREMODEL)));
                    }
                )
            );
        },

        /**
         * Handles the keydown-events. Can perform several things: scolling and (multi)-selecting.
         *
         * @method _fireEvent
         * @param {EventTarget} e
         * @private
         * @since 0.1
         *
        */
        _fireEvent : function(e, eventname) {
            _yuitest_coverfunc("build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js", "_fireEvent", 132);
_yuitest_coverline("build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js", 133);
var instance = this,
                host = instance.host,
                model, node, clientId, modelList;

            // In case the host is an Y.ITSAViewModel-instance, then the attribute 'model' is available
            // In case the host is an Y.ITSAViewModelList or Y.ITSAScrollViewModelList, look for a node with class 'itsa-model'
            _yuitest_coverline("build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js", 139);
model = host.get('model');
            _yuitest_coverline("build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js", 140);
if (!model) {
                // assume Y.ITSAViewModelList or Y.ITSAScrollViewModelList
                _yuitest_coverline("build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js", 142);
node = e.currentTarget.get('parentNode');
                _yuitest_coverline("build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js", 143);
while (node && !node.hasClass(MODEL_CLASS)) {
                    _yuitest_coverline("build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js", 144);
node = node.get('parentNode');
                }
                _yuitest_coverline("build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js", 146);
if (node && node.hasClass(MODEL_CLASS)) {
                    // found the node-element that holds the model
                    _yuitest_coverline("build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js", 148);
clientId = node.getData('modelClientId');
                    _yuitest_coverline("build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js", 149);
modelList = host.getModelListInUse && host.getModelListInUse();
                    _yuitest_coverline("build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js", 150);
model = modelList && modelList.getByClientId(clientId);
                }

            }
            _yuitest_coverline("build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js", 154);
if (model) {
                /**
                 * Is fired when the user clicks on a Button.
                 *
                 * @event buttonclick
                 * @param {Y.Node} currentTarget the node that was clicked.
                 * @param {Y.Model|Object} model the rendered-model and holds the button as a childnode. In case of LazyModelList: type is an object.
                 * @since 0.1
                **/

                /**
                 * Is fired when the user clicks on a anchor-element with className 'firemodel'.
                 *
                 * @event anchorclick
                 * @param {Y.Node} currentTarget the node that was clicked.
                 * @param {Y.Model|Object} model the rendered-model and holds the button as a childnode. In case of LazyModelList: type is an object.
                 * @since 0.1
                **/
                _yuitest_coverline("build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js", 172);
e.model = model;
                _yuitest_coverline("build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js", 173);
if (eventname===ANCHOREVENT) {
                    _yuitest_coverline("build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js", 174);
e.preventDefault();
                }
                _yuitest_coverline("build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js", 176);
host.fire(eventname, e);
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
            _yuitest_coverfunc("build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js", "_clearEventhandlers", 191);
_yuitest_coverline("build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js", 192);
YArray.each(
                this._eventhandlers,
                function(item){
                    _yuitest_coverfunc("build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js", "(anonymous 4)", 194);
_yuitest_coverline("build/gallery-itsasubscribemodelbuttons/gallery-itsasubscribemodelbuttons.js", 195);
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

}, '@VERSION@', {"requires": ["base-build", "node-base", "event-custom", "node-event-delegate", "plugin"]});
