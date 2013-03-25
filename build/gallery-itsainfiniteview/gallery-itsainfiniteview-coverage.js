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
_yuitest_coverage["build/gallery-itsainfiniteview/gallery-itsainfiniteview.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-itsainfiniteview/gallery-itsainfiniteview.js",
    code: []
};
_yuitest_coverage["build/gallery-itsainfiniteview/gallery-itsainfiniteview.js"].code=["YUI.add('gallery-itsainfiniteview', function (Y, NAME) {","","'use strict';","","/**"," * ScrollView KeyNav Plugin"," *"," *"," * Plugin that enables infinite-scroll with Y.DataTable, Y.ITSAViewModellist and Y.ITSAScrollViewModellist."," *"," * <u>Behaviour Y.DataTable</u>"," * Y.DataTable will render all the Models that are within the attribute 'data'. This plugin will extend these by calling"," * the ModelList's sync-method with 'readMore'. Thus Y.DataTable will always only expand with external data."," *"," * <u>Behaviour Y.ITSAViewModellist and Y.ITSAScrollViewModellist</u>"," * These widgets have the capability of rendering just the 'batchSize' (attribute), even if there are more items within the (Lazy)ModelList."," * <b>Caution:</b> Be sure to plug-in <u>before</u> you render the ScrollView-instance. If you don't then all innitial available items will"," * be rendered, regardsless of the 'batchSize'. Although you can overcome this, if you use also limit the items by using the attribute 'limitItems'."," *"," *"," * To trigger external data (Models) to be loaded, this plugin enables the scrollview to call the ModelList's sync method with action='readMore'"," * and options = {lastItem: 'lastModel.getAttrs()', loadSize: loadSize}. These values can be used by the remote to determine which and how many"," * items to load."," *"," * When the ScrollView-instance is expanded, it will expand with 'batchSize' items (Models). Any already available in the (Lazy)ModelList"," * will be used, if not enaough available, the plugin will call the (Lazy)ModelList's 'sync' method to retreive more. The number of external items"," * to be retreived is managed with the attribute 'loadSize'."," *"," * Best practice is to make 'loadSize' higher than 'batchSize' --> each sync-call means an extra http-request. And a too high value of 'batchSize'"," * will mean a prefomancehit due to the expansion-rendering of the scrollview-instance."," *"," * @module gallery-itsascrollviewinfinitescroll"," * @class ITSAScrollViewInfiniteScroll"," * @extends Plugin.Base"," * @constructor"," * @since 0.1"," *"," * <i>Copyright (c) 2013 Marco Asbreuk - http://itsasbreuk.nl</i>"," * YUI BSD License - http://developer.yahoo.com/yui/license.html"," *","*/","","// -- Public Static Properties -------------------------------------------------","","/**"," * Internal list that holds event-references"," * @property _eventhandlers"," * @private"," * @type Array"," */","","","var Lang = Y.Lang,","    YArray = Y.Array,","    PARSTEINT = function(value) {","        return parseInt(value, 10);","    };","","Y.namespace('Plugin').ITSAInifiniteView = Y.Base.create('itsainfiniteview', Y.Plugin.Base, [], {","","        _eventhandlers : [],","        _window : null,","        host : null,","","        /**","         * Sets up the toolbar during initialisation. Calls render() as soon as the hosts-editorframe is ready","         *","         * @method initializer","         * @protected","         * @since 0.1","         */","        initializer : function() {","            var instance = this,","                host;","","            instance.host = host = instance.get('host');","            host._itmsAvail = true;","            instance._window = Y.one('window');","            instance._bindUI();","        },","","        /**","         * Tries to expand the scrollview-list.","         *","         * @method expandList","         * @return {Boolean} Whether the scrollviewlist was expanded. Only when external data is requested and returns empty, there actually","         * was no extra data, while this method will return true.","         * @since 0.1","         */","        expandList : function() {","//=============================================================================================================================","//","// NEED SOME WORK HERE: MIGHT BE ASYNCHROUS --> WE NEED TO RETURN A PROMISE","//","//=============================================================================================================================","            var instance = this,","                host = instance.host,","                modelList = (host.getModelListInUse && host.getModelListInUse()) || host.get('data'),","                batchSize = instance.get('batchSize'),","                prevLastModelIndex = host._prevLastModelIndex || -1,","                needExpansion = host._itmsAvail,","                askExternalData;","","            if (modelList && needExpansion) {","                instance._fireExpansion(false);","                // Need to distinquish between a need to call for external data, or expand from within the current modellist","                // The data MIGHT be available in the current modellist, but not rendered in the viewnode yet","                askExternalData = (prevLastModelIndex >= (modelList.size() - 1));","                if (askExternalData) {","                    modelList.sync(","                        'readMore',","                        {","                            lastItem: prevLastModelIndex,","                            batchSize: batchSize","                        },","                        Y.rbind(instance._expansionFinished, instance)","                    );","                }","                else if (host._renderView) {","                    host._renderView(null, {rebuild: false});","                    instance._fireExpansion(true);","                }","            }","            else {","                if (!modelList) {","                }","                if (!host._itmsAvail) {","                }","            }","            return needExpansion;","        },","","        /**","         * Check if expansion of the modelList is needed. If so, it will take action (expand the list by calling 'expandList').","         *","         * @method checkExpansion","         * @since 0.1","         *","        */","        checkExpansion : function() {","//=============================================================================================================================","//","// NEED SOME WORK HERE: MIGHT BE ASYNCHROUS --> WE NEED TO RETURN A PROMISE","//","//=============================================================================================================================","            var instance = this,","                host = instance.host,","                window = instance._window,","                boundingBox = host.get('boundingBox'),","                modelList = (host.getModelListInUse && host.getModelListInUse()) || host.get('data'),","                viewNode = host._viewNode,","                expansionArea = instance.get('expansionArea'),","                axis = host.get('axis'),","                xAxis = axis && axis.x,","                yAxis = axis && axis.y,","                boundingBoxEdge, viewNodeEdge, buffer, docHeight, winHeight, currentScroll;","            if (modelList && host._itmsAvail) {","                if (yAxis) {","                    // ITSAScrollViewModelList with xAxis","                    boundingBoxEdge = boundingBox.getY() + boundingBox.get('offsetHeight');","                    viewNodeEdge = viewNode.getY() + viewNode.get('offsetHeight');","                    buffer = (viewNodeEdge-boundingBoxEdge);","                }","                else if (xAxis) {","                    // ITSAScrollViewModelList with xAxis","                    boundingBoxEdge = boundingBox.getX() + boundingBox.get('offsetWidth');","                    viewNodeEdge = viewNode.getX() + viewNode.get('offsetWidth');","                    buffer = (viewNodeEdge-boundingBoxEdge);","                }","                else {","                    // no ITSAScrollViewModelList, but ITSAViewModelList","                    if (window) {","                        winHeight = PARSTEINT(window.get('winHeight'));","                        docHeight = PARSTEINT(window.get('docHeight')); // --> in Safari this returns the winHeight instead of docheight !!!","                        currentScroll = PARSTEINT(window.get('docScrollY'));","                        buffer = docHeight-winHeight-currentScroll;","                    }","                }","                if (buffer<expansionArea) {","                    instance.expandList();","                }","                else {","                }","            }","            else {","                if (!modelList) {","                }","                if (!host._itmsAvail) {","                }","            }","        },","","        /**","         * Forces to load all items into the scrollview-instance.","         *","         * @method loadAllItems","         * @param {Int} [maxExpansions] Only needed when you use the plugin <b>ITSAInifiniteView</b>. Use this value to limit","         * expansion data-calls. It will prevent you from falling into endless expansion when the list is infinite. If not set this method will expand","         * at the <b>max of ITSAInifiniteView.get('maxExpansions') times by default</b>. If you are responsible for the external data and","         * that data is limited, you might choose to set this value that high to make sure all data is rendered in the scrollview.","         * @since 0.1","        */","        loadAllItems : function(maxExpansions) {","//=============================================================================================================================","//","// NEED SOME WORK HERE: MIGHT BE ASYNCHROUS --> WE NEED TO RETURN A PROMISE","//","//=============================================================================================================================","            var host = this.host,","                modelList = host.getModelListInUse();","","            host._getNodeFromModelOrIndex(null, modelList.size()-1, maxExpansions);","        },","","        /**","         * Cleans up bindings and removes plugin","         * @method destructor","         * @protected","         * @since 0.1","        */","        destructor : function() {","            this._clearEventhandlers();","        },","","        //===============================================================================================","        // private methods","        //===============================================================================================","","        /**","         * Binding events","         *","         * @method _bindUI","         * @private","         * @since 0.1","        */","        _bindUI : function() {","            var instance = this,","                host = instance.host,","                hostIsScrollView = host.get('axis');","","            if (hostIsScrollView) {","                instance._eventhandlers.push(","                    host.after(","                        'scrollEnd',","                        Y.rbind(instance.checkExpansion, instance)","                    )","                );","            }","            else {","                instance._eventhandlers.push(","                    Y.after(","                        'scroll',","                        Y.rbind(instance.checkExpansion, instance)","                    )","                );","            }","        },","","        /**","         *","         *","         * @method _expansionFinished","         * @private","         * @param {Object} transaction Transaction object.","         * @param {Object} load event.","         * @since 0.1","         */","        _expansionFinished : function (transaction, load) {","            var instance = this,","                host = instance.host,","                modelList = host.get('modelList'),","                lastItemOnTop = host.get('lastItemOnTop'),","                newItems, responseData;","","            try {","                responseData = Y.JSON.parse(load.responseText);","                newItems = (Lang.isArray(responseData) && (responseData.length>0));","                if (!newItems) {","                    host._itmsAvail = false;","                }","                if (newItems) {","                    // host._renderView(); will be called when new Models are added","                    modelList.add(newItems);","                }","            }","            catch (e) {","                host._itmsAvail = false;","            }","            // now tricky one: you might need to add the last empty item","            // when itemsOnTop>0","            if ((lastItemOnTop>0) && !host._itmsAvail) {","                // need to add an extra empty LI-element that has the size of the view minus the last element","                host._addEmptyItem(null, lastItemOnTop);","                host.syncUI();","            }","            instance._fireExpansion(true);","        },","","        /**","         * A utility method that fires events at the start and end of an modellist-expansion.","         *","         * @method _fireExpansion","         * @param {Boolean} finished whether it is the 'start'-event or the 'end'-event that should be fired.","         * @private","         * @since 0.1","         */","        _fireExpansion : function (finished) {","            var instance = this;","","            /**","             * Is fired before a 'scrollview-expansion' takes place.","             *","             * @event modelExpansion:start","             * @since 0.1","            **/","            /**","             * Is fired when a 'scrollview-expansion' is finished.","             *","             * @event modelExpansion:end","             * @since 0.1","            **/","            instance.fire('modelExpansion:' + (finished ? 'end' : 'start'));","        },","","        /**","         * Cleaning up all eventlisteners","         *","         * @method _clearEventhandlers","         * @private","         * @since 0.1","         *","        */","        _clearEventhandlers : function() {","            YArray.each(","                this._eventhandlers,","                function(item){","                    item.detach();","                }","            );","        }","","    }, {","        NS : 'itsainfiniteview',","        ATTRS : {","","            /**","             * @description The amount of items that are added to the ModelList after every 'expansion'.","             * The optimal value of this attribute is just how many LI-elements fit into the attribute 'expansionArea'. But it might be set","             * higher to decrease the number of expansioncalls.","             *","             * @default 100","             * @attribute batchSize","             * @type Boolean","             * @since 0.1","            */","            batchSize: {","                value: 100,","                validator:  function(v) {","                    return Lang.isNumber(v);","                }","            },","","            /**","             * @description The amount of items that are requested when external data is needed (called through the (Lazy)ModelList's sync-method).","             * Best practice is to make 'loadSize' higher than 'batchSize' (suggested is 10x batchSize) because each sync-call means an extra","             * http-request.","             *","             * @default 1000","             * @attribute loadSize","             * @type Boolean","             * @since 0.1","            */","            loadSize: {","                value: 1000,","                validator:  function(v) {","                    return Lang.isNumber(v);","                }","            },","","            /**","             * @description Limit expansion data-calls by setting this attribute. It will prevent you from falling into endless expansion when the","             * list is infinite. If you are responsible for the external data and that data is limited, you might choose to set this value that","             * high to make sure all data is rendered in the scrollview. The choosen value represents the number of expansion calls. The true number","             * of added items = maxExpansions * batchSize","             *","             * @default 50","             * @attribute maxExpansions","             * @type Boolean","             * @since 0.1","            */","            maxExpansions: {","                value: 50,","                validator:  function(v) {","                    return Lang.isNumber(v);","                }","            },","","            /**","             * @description The offset-area in <i>pixels</i> that should be minimal available. The offset-area is defined as the area outside","             * the view but with all the remaining scrollview-elements.","             * When the offset-area is less than 'expansionArea', a checkExpansion will be excecuted (after a scroll:end-event).","             *","             * If you encounter faltering scrollbehaviour -due to new loading items- then increase this number. If you do, consider to","             * re-optimize the value of the attribute 'batchSize'.","             *","             * @default 2000","             * @attribute expansionArea","             * @type Boolean","             * @since 0.1","            */","            expansionArea: {","                value: 2000,","                validator:  function(v) {","                    return Lang.isNumber(v);","                }","            }","","        }","    }",");","","}, '@VERSION@', {\"requires\": [\"base-build\", \"plugin\", \"node-base\", \"json-parse\"]});"];
_yuitest_coverage["build/gallery-itsainfiniteview/gallery-itsainfiniteview.js"].lines = {"1":0,"3":0,"53":0,"56":0,"59":0,"73":0,"76":0,"77":0,"78":0,"79":0,"96":0,"104":0,"105":0,"108":0,"109":0,"110":0,"119":0,"120":0,"121":0,"125":0,"127":0,"130":0,"146":0,"157":0,"158":0,"160":0,"161":0,"162":0,"164":0,"166":0,"167":0,"168":0,"172":0,"173":0,"174":0,"175":0,"176":0,"179":0,"180":0,"186":0,"188":0,"209":0,"212":0,"222":0,"237":0,"241":0,"242":0,"250":0,"269":0,"275":0,"276":0,"277":0,"278":0,"279":0,"281":0,"283":0,"287":0,"291":0,"293":0,"294":0,"296":0,"308":0,"322":0,"334":0,"337":0,"359":0,"376":0,"394":0,"414":0};
_yuitest_coverage["build/gallery-itsainfiniteview/gallery-itsainfiniteview.js"].functions = {"PARSTEINT:55":0,"initializer:72":0,"expandList:90":0,"checkExpansion:140":0,"loadAllItems:203":0,"destructor:221":0,"_bindUI:236":0,"_expansionFinished:268":0,"_fireExpansion:307":0,"(anonymous 2):336":0,"_clearEventhandlers:333":0,"validator:358":0,"validator:375":0,"validator:393":0,"validator:413":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-itsainfiniteview/gallery-itsainfiniteview.js"].coveredLines = 69;
_yuitest_coverage["build/gallery-itsainfiniteview/gallery-itsainfiniteview.js"].coveredFunctions = 16;
_yuitest_coverline("build/gallery-itsainfiniteview/gallery-itsainfiniteview.js", 1);
YUI.add('gallery-itsainfiniteview', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-itsainfiniteview/gallery-itsainfiniteview.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-itsainfiniteview/gallery-itsainfiniteview.js", 3);
'use strict';

/**
 * ScrollView KeyNav Plugin
 *
 *
 * Plugin that enables infinite-scroll with Y.DataTable, Y.ITSAViewModellist and Y.ITSAScrollViewModellist.
 *
 * <u>Behaviour Y.DataTable</u>
 * Y.DataTable will render all the Models that are within the attribute 'data'. This plugin will extend these by calling
 * the ModelList's sync-method with 'readMore'. Thus Y.DataTable will always only expand with external data.
 *
 * <u>Behaviour Y.ITSAViewModellist and Y.ITSAScrollViewModellist</u>
 * These widgets have the capability of rendering just the 'batchSize' (attribute), even if there are more items within the (Lazy)ModelList.
 * <b>Caution:</b> Be sure to plug-in <u>before</u> you render the ScrollView-instance. If you don't then all innitial available items will
 * be rendered, regardsless of the 'batchSize'. Although you can overcome this, if you use also limit the items by using the attribute 'limitItems'.
 *
 *
 * To trigger external data (Models) to be loaded, this plugin enables the scrollview to call the ModelList's sync method with action='readMore'
 * and options = {lastItem: 'lastModel.getAttrs()', loadSize: loadSize}. These values can be used by the remote to determine which and how many
 * items to load.
 *
 * When the ScrollView-instance is expanded, it will expand with 'batchSize' items (Models). Any already available in the (Lazy)ModelList
 * will be used, if not enaough available, the plugin will call the (Lazy)ModelList's 'sync' method to retreive more. The number of external items
 * to be retreived is managed with the attribute 'loadSize'.
 *
 * Best practice is to make 'loadSize' higher than 'batchSize' --> each sync-call means an extra http-request. And a too high value of 'batchSize'
 * will mean a prefomancehit due to the expansion-rendering of the scrollview-instance.
 *
 * @module gallery-itsascrollviewinfinitescroll
 * @class ITSAScrollViewInfiniteScroll
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


_yuitest_coverline("build/gallery-itsainfiniteview/gallery-itsainfiniteview.js", 53);
var Lang = Y.Lang,
    YArray = Y.Array,
    PARSTEINT = function(value) {
        _yuitest_coverfunc("build/gallery-itsainfiniteview/gallery-itsainfiniteview.js", "PARSTEINT", 55);
_yuitest_coverline("build/gallery-itsainfiniteview/gallery-itsainfiniteview.js", 56);
return parseInt(value, 10);
    };

_yuitest_coverline("build/gallery-itsainfiniteview/gallery-itsainfiniteview.js", 59);
Y.namespace('Plugin').ITSAInifiniteView = Y.Base.create('itsainfiniteview', Y.Plugin.Base, [], {

        _eventhandlers : [],
        _window : null,
        host : null,

        /**
         * Sets up the toolbar during initialisation. Calls render() as soon as the hosts-editorframe is ready
         *
         * @method initializer
         * @protected
         * @since 0.1
         */
        initializer : function() {
            _yuitest_coverfunc("build/gallery-itsainfiniteview/gallery-itsainfiniteview.js", "initializer", 72);
_yuitest_coverline("build/gallery-itsainfiniteview/gallery-itsainfiniteview.js", 73);
var instance = this,
                host;

            _yuitest_coverline("build/gallery-itsainfiniteview/gallery-itsainfiniteview.js", 76);
instance.host = host = instance.get('host');
            _yuitest_coverline("build/gallery-itsainfiniteview/gallery-itsainfiniteview.js", 77);
host._itmsAvail = true;
            _yuitest_coverline("build/gallery-itsainfiniteview/gallery-itsainfiniteview.js", 78);
instance._window = Y.one('window');
            _yuitest_coverline("build/gallery-itsainfiniteview/gallery-itsainfiniteview.js", 79);
instance._bindUI();
        },

        /**
         * Tries to expand the scrollview-list.
         *
         * @method expandList
         * @return {Boolean} Whether the scrollviewlist was expanded. Only when external data is requested and returns empty, there actually
         * was no extra data, while this method will return true.
         * @since 0.1
         */
        expandList : function() {
//=============================================================================================================================
//
// NEED SOME WORK HERE: MIGHT BE ASYNCHROUS --> WE NEED TO RETURN A PROMISE
//
//=============================================================================================================================
            _yuitest_coverfunc("build/gallery-itsainfiniteview/gallery-itsainfiniteview.js", "expandList", 90);
_yuitest_coverline("build/gallery-itsainfiniteview/gallery-itsainfiniteview.js", 96);
var instance = this,
                host = instance.host,
                modelList = (host.getModelListInUse && host.getModelListInUse()) || host.get('data'),
                batchSize = instance.get('batchSize'),
                prevLastModelIndex = host._prevLastModelIndex || -1,
                needExpansion = host._itmsAvail,
                askExternalData;

            _yuitest_coverline("build/gallery-itsainfiniteview/gallery-itsainfiniteview.js", 104);
if (modelList && needExpansion) {
                _yuitest_coverline("build/gallery-itsainfiniteview/gallery-itsainfiniteview.js", 105);
instance._fireExpansion(false);
                // Need to distinquish between a need to call for external data, or expand from within the current modellist
                // The data MIGHT be available in the current modellist, but not rendered in the viewnode yet
                _yuitest_coverline("build/gallery-itsainfiniteview/gallery-itsainfiniteview.js", 108);
askExternalData = (prevLastModelIndex >= (modelList.size() - 1));
                _yuitest_coverline("build/gallery-itsainfiniteview/gallery-itsainfiniteview.js", 109);
if (askExternalData) {
                    _yuitest_coverline("build/gallery-itsainfiniteview/gallery-itsainfiniteview.js", 110);
modelList.sync(
                        'readMore',
                        {
                            lastItem: prevLastModelIndex,
                            batchSize: batchSize
                        },
                        Y.rbind(instance._expansionFinished, instance)
                    );
                }
                else {_yuitest_coverline("build/gallery-itsainfiniteview/gallery-itsainfiniteview.js", 119);
if (host._renderView) {
                    _yuitest_coverline("build/gallery-itsainfiniteview/gallery-itsainfiniteview.js", 120);
host._renderView(null, {rebuild: false});
                    _yuitest_coverline("build/gallery-itsainfiniteview/gallery-itsainfiniteview.js", 121);
instance._fireExpansion(true);
                }}
            }
            else {
                _yuitest_coverline("build/gallery-itsainfiniteview/gallery-itsainfiniteview.js", 125);
if (!modelList) {
                }
                _yuitest_coverline("build/gallery-itsainfiniteview/gallery-itsainfiniteview.js", 127);
if (!host._itmsAvail) {
                }
            }
            _yuitest_coverline("build/gallery-itsainfiniteview/gallery-itsainfiniteview.js", 130);
return needExpansion;
        },

        /**
         * Check if expansion of the modelList is needed. If so, it will take action (expand the list by calling 'expandList').
         *
         * @method checkExpansion
         * @since 0.1
         *
        */
        checkExpansion : function() {
//=============================================================================================================================
//
// NEED SOME WORK HERE: MIGHT BE ASYNCHROUS --> WE NEED TO RETURN A PROMISE
//
//=============================================================================================================================
            _yuitest_coverfunc("build/gallery-itsainfiniteview/gallery-itsainfiniteview.js", "checkExpansion", 140);
_yuitest_coverline("build/gallery-itsainfiniteview/gallery-itsainfiniteview.js", 146);
var instance = this,
                host = instance.host,
                window = instance._window,
                boundingBox = host.get('boundingBox'),
                modelList = (host.getModelListInUse && host.getModelListInUse()) || host.get('data'),
                viewNode = host._viewNode,
                expansionArea = instance.get('expansionArea'),
                axis = host.get('axis'),
                xAxis = axis && axis.x,
                yAxis = axis && axis.y,
                boundingBoxEdge, viewNodeEdge, buffer, docHeight, winHeight, currentScroll;
            _yuitest_coverline("build/gallery-itsainfiniteview/gallery-itsainfiniteview.js", 157);
if (modelList && host._itmsAvail) {
                _yuitest_coverline("build/gallery-itsainfiniteview/gallery-itsainfiniteview.js", 158);
if (yAxis) {
                    // ITSAScrollViewModelList with xAxis
                    _yuitest_coverline("build/gallery-itsainfiniteview/gallery-itsainfiniteview.js", 160);
boundingBoxEdge = boundingBox.getY() + boundingBox.get('offsetHeight');
                    _yuitest_coverline("build/gallery-itsainfiniteview/gallery-itsainfiniteview.js", 161);
viewNodeEdge = viewNode.getY() + viewNode.get('offsetHeight');
                    _yuitest_coverline("build/gallery-itsainfiniteview/gallery-itsainfiniteview.js", 162);
buffer = (viewNodeEdge-boundingBoxEdge);
                }
                else {_yuitest_coverline("build/gallery-itsainfiniteview/gallery-itsainfiniteview.js", 164);
if (xAxis) {
                    // ITSAScrollViewModelList with xAxis
                    _yuitest_coverline("build/gallery-itsainfiniteview/gallery-itsainfiniteview.js", 166);
boundingBoxEdge = boundingBox.getX() + boundingBox.get('offsetWidth');
                    _yuitest_coverline("build/gallery-itsainfiniteview/gallery-itsainfiniteview.js", 167);
viewNodeEdge = viewNode.getX() + viewNode.get('offsetWidth');
                    _yuitest_coverline("build/gallery-itsainfiniteview/gallery-itsainfiniteview.js", 168);
buffer = (viewNodeEdge-boundingBoxEdge);
                }
                else {
                    // no ITSAScrollViewModelList, but ITSAViewModelList
                    _yuitest_coverline("build/gallery-itsainfiniteview/gallery-itsainfiniteview.js", 172);
if (window) {
                        _yuitest_coverline("build/gallery-itsainfiniteview/gallery-itsainfiniteview.js", 173);
winHeight = PARSTEINT(window.get('winHeight'));
                        _yuitest_coverline("build/gallery-itsainfiniteview/gallery-itsainfiniteview.js", 174);
docHeight = PARSTEINT(window.get('docHeight')); // --> in Safari this returns the winHeight instead of docheight !!!
                        _yuitest_coverline("build/gallery-itsainfiniteview/gallery-itsainfiniteview.js", 175);
currentScroll = PARSTEINT(window.get('docScrollY'));
                        _yuitest_coverline("build/gallery-itsainfiniteview/gallery-itsainfiniteview.js", 176);
buffer = docHeight-winHeight-currentScroll;
                    }
                }}
                _yuitest_coverline("build/gallery-itsainfiniteview/gallery-itsainfiniteview.js", 179);
if (buffer<expansionArea) {
                    _yuitest_coverline("build/gallery-itsainfiniteview/gallery-itsainfiniteview.js", 180);
instance.expandList();
                }
                else {
                }
            }
            else {
                _yuitest_coverline("build/gallery-itsainfiniteview/gallery-itsainfiniteview.js", 186);
if (!modelList) {
                }
                _yuitest_coverline("build/gallery-itsainfiniteview/gallery-itsainfiniteview.js", 188);
if (!host._itmsAvail) {
                }
            }
        },

        /**
         * Forces to load all items into the scrollview-instance.
         *
         * @method loadAllItems
         * @param {Int} [maxExpansions] Only needed when you use the plugin <b>ITSAInifiniteView</b>. Use this value to limit
         * expansion data-calls. It will prevent you from falling into endless expansion when the list is infinite. If not set this method will expand
         * at the <b>max of ITSAInifiniteView.get('maxExpansions') times by default</b>. If you are responsible for the external data and
         * that data is limited, you might choose to set this value that high to make sure all data is rendered in the scrollview.
         * @since 0.1
        */
        loadAllItems : function(maxExpansions) {
//=============================================================================================================================
//
// NEED SOME WORK HERE: MIGHT BE ASYNCHROUS --> WE NEED TO RETURN A PROMISE
//
//=============================================================================================================================
            _yuitest_coverfunc("build/gallery-itsainfiniteview/gallery-itsainfiniteview.js", "loadAllItems", 203);
_yuitest_coverline("build/gallery-itsainfiniteview/gallery-itsainfiniteview.js", 209);
var host = this.host,
                modelList = host.getModelListInUse();

            _yuitest_coverline("build/gallery-itsainfiniteview/gallery-itsainfiniteview.js", 212);
host._getNodeFromModelOrIndex(null, modelList.size()-1, maxExpansions);
        },

        /**
         * Cleans up bindings and removes plugin
         * @method destructor
         * @protected
         * @since 0.1
        */
        destructor : function() {
            _yuitest_coverfunc("build/gallery-itsainfiniteview/gallery-itsainfiniteview.js", "destructor", 221);
_yuitest_coverline("build/gallery-itsainfiniteview/gallery-itsainfiniteview.js", 222);
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
            _yuitest_coverfunc("build/gallery-itsainfiniteview/gallery-itsainfiniteview.js", "_bindUI", 236);
_yuitest_coverline("build/gallery-itsainfiniteview/gallery-itsainfiniteview.js", 237);
var instance = this,
                host = instance.host,
                hostIsScrollView = host.get('axis');

            _yuitest_coverline("build/gallery-itsainfiniteview/gallery-itsainfiniteview.js", 241);
if (hostIsScrollView) {
                _yuitest_coverline("build/gallery-itsainfiniteview/gallery-itsainfiniteview.js", 242);
instance._eventhandlers.push(
                    host.after(
                        'scrollEnd',
                        Y.rbind(instance.checkExpansion, instance)
                    )
                );
            }
            else {
                _yuitest_coverline("build/gallery-itsainfiniteview/gallery-itsainfiniteview.js", 250);
instance._eventhandlers.push(
                    Y.after(
                        'scroll',
                        Y.rbind(instance.checkExpansion, instance)
                    )
                );
            }
        },

        /**
         *
         *
         * @method _expansionFinished
         * @private
         * @param {Object} transaction Transaction object.
         * @param {Object} load event.
         * @since 0.1
         */
        _expansionFinished : function (transaction, load) {
            _yuitest_coverfunc("build/gallery-itsainfiniteview/gallery-itsainfiniteview.js", "_expansionFinished", 268);
_yuitest_coverline("build/gallery-itsainfiniteview/gallery-itsainfiniteview.js", 269);
var instance = this,
                host = instance.host,
                modelList = host.get('modelList'),
                lastItemOnTop = host.get('lastItemOnTop'),
                newItems, responseData;

            _yuitest_coverline("build/gallery-itsainfiniteview/gallery-itsainfiniteview.js", 275);
try {
                _yuitest_coverline("build/gallery-itsainfiniteview/gallery-itsainfiniteview.js", 276);
responseData = Y.JSON.parse(load.responseText);
                _yuitest_coverline("build/gallery-itsainfiniteview/gallery-itsainfiniteview.js", 277);
newItems = (Lang.isArray(responseData) && (responseData.length>0));
                _yuitest_coverline("build/gallery-itsainfiniteview/gallery-itsainfiniteview.js", 278);
if (!newItems) {
                    _yuitest_coverline("build/gallery-itsainfiniteview/gallery-itsainfiniteview.js", 279);
host._itmsAvail = false;
                }
                _yuitest_coverline("build/gallery-itsainfiniteview/gallery-itsainfiniteview.js", 281);
if (newItems) {
                    // host._renderView(); will be called when new Models are added
                    _yuitest_coverline("build/gallery-itsainfiniteview/gallery-itsainfiniteview.js", 283);
modelList.add(newItems);
                }
            }
            catch (e) {
                _yuitest_coverline("build/gallery-itsainfiniteview/gallery-itsainfiniteview.js", 287);
host._itmsAvail = false;
            }
            // now tricky one: you might need to add the last empty item
            // when itemsOnTop>0
            _yuitest_coverline("build/gallery-itsainfiniteview/gallery-itsainfiniteview.js", 291);
if ((lastItemOnTop>0) && !host._itmsAvail) {
                // need to add an extra empty LI-element that has the size of the view minus the last element
                _yuitest_coverline("build/gallery-itsainfiniteview/gallery-itsainfiniteview.js", 293);
host._addEmptyItem(null, lastItemOnTop);
                _yuitest_coverline("build/gallery-itsainfiniteview/gallery-itsainfiniteview.js", 294);
host.syncUI();
            }
            _yuitest_coverline("build/gallery-itsainfiniteview/gallery-itsainfiniteview.js", 296);
instance._fireExpansion(true);
        },

        /**
         * A utility method that fires events at the start and end of an modellist-expansion.
         *
         * @method _fireExpansion
         * @param {Boolean} finished whether it is the 'start'-event or the 'end'-event that should be fired.
         * @private
         * @since 0.1
         */
        _fireExpansion : function (finished) {
            _yuitest_coverfunc("build/gallery-itsainfiniteview/gallery-itsainfiniteview.js", "_fireExpansion", 307);
_yuitest_coverline("build/gallery-itsainfiniteview/gallery-itsainfiniteview.js", 308);
var instance = this;

            /**
             * Is fired before a 'scrollview-expansion' takes place.
             *
             * @event modelExpansion:start
             * @since 0.1
            **/
            /**
             * Is fired when a 'scrollview-expansion' is finished.
             *
             * @event modelExpansion:end
             * @since 0.1
            **/
            _yuitest_coverline("build/gallery-itsainfiniteview/gallery-itsainfiniteview.js", 322);
instance.fire('modelExpansion:' + (finished ? 'end' : 'start'));
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
            _yuitest_coverfunc("build/gallery-itsainfiniteview/gallery-itsainfiniteview.js", "_clearEventhandlers", 333);
_yuitest_coverline("build/gallery-itsainfiniteview/gallery-itsainfiniteview.js", 334);
YArray.each(
                this._eventhandlers,
                function(item){
                    _yuitest_coverfunc("build/gallery-itsainfiniteview/gallery-itsainfiniteview.js", "(anonymous 2)", 336);
_yuitest_coverline("build/gallery-itsainfiniteview/gallery-itsainfiniteview.js", 337);
item.detach();
                }
            );
        }

    }, {
        NS : 'itsainfiniteview',
        ATTRS : {

            /**
             * @description The amount of items that are added to the ModelList after every 'expansion'.
             * The optimal value of this attribute is just how many LI-elements fit into the attribute 'expansionArea'. But it might be set
             * higher to decrease the number of expansioncalls.
             *
             * @default 100
             * @attribute batchSize
             * @type Boolean
             * @since 0.1
            */
            batchSize: {
                value: 100,
                validator:  function(v) {
                    _yuitest_coverfunc("build/gallery-itsainfiniteview/gallery-itsainfiniteview.js", "validator", 358);
_yuitest_coverline("build/gallery-itsainfiniteview/gallery-itsainfiniteview.js", 359);
return Lang.isNumber(v);
                }
            },

            /**
             * @description The amount of items that are requested when external data is needed (called through the (Lazy)ModelList's sync-method).
             * Best practice is to make 'loadSize' higher than 'batchSize' (suggested is 10x batchSize) because each sync-call means an extra
             * http-request.
             *
             * @default 1000
             * @attribute loadSize
             * @type Boolean
             * @since 0.1
            */
            loadSize: {
                value: 1000,
                validator:  function(v) {
                    _yuitest_coverfunc("build/gallery-itsainfiniteview/gallery-itsainfiniteview.js", "validator", 375);
_yuitest_coverline("build/gallery-itsainfiniteview/gallery-itsainfiniteview.js", 376);
return Lang.isNumber(v);
                }
            },

            /**
             * @description Limit expansion data-calls by setting this attribute. It will prevent you from falling into endless expansion when the
             * list is infinite. If you are responsible for the external data and that data is limited, you might choose to set this value that
             * high to make sure all data is rendered in the scrollview. The choosen value represents the number of expansion calls. The true number
             * of added items = maxExpansions * batchSize
             *
             * @default 50
             * @attribute maxExpansions
             * @type Boolean
             * @since 0.1
            */
            maxExpansions: {
                value: 50,
                validator:  function(v) {
                    _yuitest_coverfunc("build/gallery-itsainfiniteview/gallery-itsainfiniteview.js", "validator", 393);
_yuitest_coverline("build/gallery-itsainfiniteview/gallery-itsainfiniteview.js", 394);
return Lang.isNumber(v);
                }
            },

            /**
             * @description The offset-area in <i>pixels</i> that should be minimal available. The offset-area is defined as the area outside
             * the view but with all the remaining scrollview-elements.
             * When the offset-area is less than 'expansionArea', a checkExpansion will be excecuted (after a scroll:end-event).
             *
             * If you encounter faltering scrollbehaviour -due to new loading items- then increase this number. If you do, consider to
             * re-optimize the value of the attribute 'batchSize'.
             *
             * @default 2000
             * @attribute expansionArea
             * @type Boolean
             * @since 0.1
            */
            expansionArea: {
                value: 2000,
                validator:  function(v) {
                    _yuitest_coverfunc("build/gallery-itsainfiniteview/gallery-itsainfiniteview.js", "validator", 413);
_yuitest_coverline("build/gallery-itsainfiniteview/gallery-itsainfiniteview.js", 414);
return Lang.isNumber(v);
                }
            }

        }
    }
);

}, '@VERSION@', {"requires": ["base-build", "plugin", "node-base", "json-parse"]});
