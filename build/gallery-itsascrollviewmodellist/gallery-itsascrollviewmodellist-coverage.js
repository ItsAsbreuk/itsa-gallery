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
_yuitest_coverage["build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js",
    code: []
};
_yuitest_coverage["build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js"].code=["YUI.add('gallery-itsascrollviewmodellist', function (Y, NAME) {","","'use strict';","","/**"," * ScrollView ModelList Extention"," *"," *"," * Adds an Y.ModelList  or Y.LazyModelList to a ScrollView instance, where the Models are rendered inside an ul-element"," * which lies within the scrollview's-contentBox. This results in an ul-list with rendered Models. The Models are rendered"," * through a template (Y.Lang.sub or Y.Template.Micro) which needs to be defined with the <b>'modelTemplate'-attribute</b>."," *"," * Caution: you MUST set the axis-atribute before rendering! Because the content is empty at start, scrollview"," * would otherwise fail autofind the value of axis."," *"," * @module gallery-itsascrollviewmodellist"," * @extends ScrollView"," * @uses ITSAModellistViewExtention"," * @class ITSAScrollViewModellist"," * @constructor"," * @since 0.1"," *"," * <i>Copyright (c) 2013 Marco Asbreuk - http://itsasbreuk.nl</i>"," * YUI BSD License - http://developer.yahoo.com/yui/license.html"," *","*/","","var Lang = Y.Lang,","    MODEL_CLASS = 'itsa-model',","    MODELLIST_CLASS = 'itsa-modellistview',","    GROUPHEADER_CLASS = MODELLIST_CLASS + '-groupheader',","    GETSTYLE = function(node, style) {","        return parseInt(node.getStyle(style), 10);","    };","","Y.ITSAScrollViewModellist = Y.Base.create('itsascrollviewmodellist', Y.ScrollView, [Y.ITSAModellistViewExtention], {","","        /**","         * Internal flag to tell whether the attribute 'lastItemOnTop' is initiated.","         * @property _lastItemTopInit","         * @private","         * @default false","         * @type Boolean","        */","        _lastItemTopInit : false,","","        /**","         * Equals scrollview.scrollTo, but makes sure we keep between the correct boundaries.","         *","         * @method saveScrollTo","         * @param x {Int} The x-position to scroll to. (null for no movement)","         * @param y {Int} The y-position to scroll to. (null for no movement)","         * @since 0.1","         *","        */","        saveScrollTo : function(x, y) {","            var instance = this,","                boundingBox = instance.get('boundingBox'),","                viewNode = instance._viewNode,","                max;","","            if (x) {","                x = Math.max(0, x);","                max = viewNode.get('offsetWidth') - boundingBox.get('offsetWidth');","                x = Math.min(x, max);","            }","            if (y) {","                y = Math.max(0, y);","                max = viewNode.get('offsetHeight') - boundingBox.get('offsetHeight');","                y = Math.min(y, max);","            }","            instance.scrollTo(x, y);","        },","","        /**","         * Makes the Model scroll into the View. Items that are already in the view: no scroll appears. Items that are above: will appear","         * on top. Items that are after the view: will appear on bottom.","         * <u>Be careful if you use the plugin ITSAInifiniteView:</u> to get the Node, there might be a lot of","         * list-expansions triggered. Be sure that expansions from external data does end, otherwise it will overload the browser.","         * That's why the third param is needed.","         * Preferable is to use an index or Node instead of Model --> Modelsearch is slower","         *","         * @method scrollIntoView","         * @param {Y.Node|Y.Model|Int} item Y.Node or Y.Model or index that should be into view.","         * Preferable is to use an index or Node instead of Model --> Modelsearch is slower","         * @param {Object} [options] To force the 'scrollIntoView' to scroll on top or on bottom of the view.","         *     @param {Boolean} [options.forceTop=false] if 'true', the (first) selected item will always be positioned on top.","         *     @param {Boolean} [options.forceBottom=false] if 'true', the (first) selected item will always be positioned on bottom.","         *     @param {Boolean} [options.noFocus=false] if 'true', then the listitem won't get focussed.","         *     @param {Boolean} [options.showHeaders=false] if 'true', when the model is succeeded by headers, the headers will also get into view.","         *     @param {Boolean} [options.editMode=false] if 'true', then Y.Plugin.ITSATabKeyManager will be used to ficus the first item.","                                (only if noFocis=false)","         * @param {Int} [maxExpansions] Only needed when you use the plugin <b>ITSAInifiniteView</b>. Use this value to limit","         * external data-calls. It will prevent you from falling into endless expansion when the list is infinite. If not set this method will expand","         * from external data at the <b>max of 25 times by default</b> (which is quite a lot). If you are responsible for the external data and","         * it is limited, then you might choose to set this value that high to make sure all data is rendered in the scrollview.","         * @since 0.1","        */","        scrollIntoView : function(item, options, maxExpansions) {","    //=============================================================================================================================","    //","    // NEED SOME WORK HERE: MIGHT BE ASYNCHROUS --> WE NEED TO RETURN A PROMISE","    //","    //=============================================================================================================================","            var instance = this,","                boundingBox = instance.get('boundingBox'),","                axis = instance.get('axis'),","                yAxis = axis.y,","                boundingBoxSize = yAxis ? boundingBox.get('offsetHeight') : boundingBox.get('offsetWidth'),","                boundingBoxEdge = yAxis ? boundingBox.getY() : boundingBox.getX(),","                viewNode = instance._viewNode,","                infiniteView = instance.itsainfiniteview,","                paginatorPlugin = instance.pages,","                showHeaders = options && Lang.isBoolean(options.showHeaders) && options.showHeaders,","                noFocus = options && Lang.isBoolean(options.noFocus) && options.noFocus,","                editMode = options && Lang.isBoolean(options.editMode) && options.editMode,","                modelNodeEdge, currentOffset, newOffset, modelNode, liElements, getNodePosition,","                onTop, nodePosition, modelNodeSize, corrected, prevNode, focusNode;","","            getNodePosition = function(node) {","                // returns -1 if (partial) before viewNode","                // returns 0 if inside viewNode","                // returns 1 if (partial) after viewNode","                var nodeLowerEdge = yAxis ? node.getY() : node.getX(),","                    nodeUpperEdge;","                if (yAxis) {","                    nodeUpperEdge = nodeLowerEdge + node.get('offsetHeight') + GETSTYLE(node, 'marginTop') + GETSTYLE(node, 'marginBottom');","                }","                else {","                    nodeUpperEdge = nodeLowerEdge + node.get('offsetWidth') + GETSTYLE(node, 'marginLeft') + GETSTYLE(node, 'marginRight');","                }","","                if ((nodeLowerEdge<boundingBoxEdge) || (options && Lang.isBoolean(options.forceTop) && options.forceTop)) {","                    return -1;","                }","                else if ((nodeUpperEdge>(boundingBoxEdge+boundingBoxSize))","                         || (options && Lang.isBoolean(options.forceBottom) && options.forceBottom)) {","                    return 1;","                }","                else {","                    return 0;","                }","            };","            if (item instanceof Y.Node) {","                // we passed a Node","                modelNode = item;","            }","            if (modelNode || Lang.isNumber(item)) {","                modelNode = modelNode || instance.getNodeFromIndex(item, maxExpansions);","                if (modelNode) {","                    nodePosition = getNodePosition(modelNode);","                    if (paginatorPlugin && (nodePosition!==0)) {","                        // increase the modelIndex --> paginator is pased on all LI's, not just the Models","                        liElements = viewNode.get('children');","                        liElements.some(","                            function(node, index) {","                                if (!node.hasClass(MODEL_CLASS)) {","                                    item++;","                                }","                                return index===item;","                            }","                        );","                    }","                }","            }","            else {","                modelNode = item && instance.getNodeFromModel(item, maxExpansions);","                nodePosition = getNodePosition(modelNode);","                if (modelNode) {","                    if (paginatorPlugin && (nodePosition!==0)) {","                        // transform model to an index","                        liElements = viewNode.all('>li');","                        item = 0;","                        liElements.some(","                            function(node, index) {","                                var found = (node===modelNode);","                                if (found) {","                                    item = index;","                                }","                                return found;","                            }","                        );","                    }","                }","            }","            if (modelNode) {","                if (!noFocus) {","                    // because modelNode might be going to change (due to headers), we need to backup its reference","                    focusNode = modelNode;","                    instance._focusModelNode(focusNode);","                    if (editMode) {","                        Y.use('gallery-itsatabkeymanager', function(Y) {","                            if (!focusNode.itsatabkeymanager) {","                                focusNode.plug(Y.Plugin.ITSATabKeyManager);","                            }","                            focusNode.itsatabkeymanager.focusInitialItem();","                        });","                    }","                }","                if ((nodePosition===0) && showHeaders){","                    // might be in view, while the header is not","                    // therefore check if headers are within view","                    prevNode = modelNode.previous();","                    while (prevNode && prevNode.hasClass(GROUPHEADER_CLASS)) {","                        modelNode = prevNode;","                        prevNode = prevNode.previous();","                    }","                    nodePosition = getNodePosition(modelNode);","                }","                if (nodePosition!==0) {","                    onTop = (nodePosition===-1);","                    if (onTop && showHeaders) {","                        // we need to bring into view the headernode","                        prevNode = modelNode.previous();","                        while (prevNode && prevNode.hasClass(GROUPHEADER_CLASS)) {","                            item--;","                            modelNode = prevNode;","                            prevNode = prevNode.previous();","                        }","                    }","                    if (yAxis) {","                        modelNodeEdge = modelNode.getY();","                        currentOffset = instance.get('scrollY');","                        modelNodeSize = modelNode.get('offsetHeight') + GETSTYLE(modelNode, 'marginTop') + GETSTYLE(modelNode, 'marginBottom');","                    }","                    else {","                        modelNodeEdge = modelNode.getX();","                        currentOffset = instance.get('scrollX');","                        modelNodeSize = modelNode.get('offsetWidth') + GETSTYLE(modelNode, 'marginLeft') + GETSTYLE(modelNode, 'marginRight');","                    }","                    // You might need to expand the list in case ITSAInifiniteView is pluged-in","                    // Only 1 time is needed: getNodeFromModel already has expanded a number of times to make the Node available","                    if (paginatorPlugin) {","                        if (!onTop) {","                            while ((modelNodeSize<boundingBoxSize) && (item>0)) {","                                corrected = true;","                                item--;","                                modelNode = modelNode.previous('li');","                                if (yAxis) {","                                    modelNodeSize += modelNode.get('offsetHeight') +","                                                     GETSTYLE(modelNode, 'marginTop') + GETSTYLE(modelNode, 'marginBottom');","                                }","                                else {","                                    modelNodeSize += modelNode.get('offsetWidth') +","                                                     GETSTYLE(modelNode, 'marginLeft') + GETSTYLE(modelNode, 'marginRight');","                                }","                            }","                            if (corrected) {","                                item++;","                            }","                            item = Math.min(item, instance._getMaxPaginatorGotoIndex(item, maxExpansions));","                        }","                        paginatorPlugin.scrollToIndex(item);","                    }","                    else {","                        newOffset = Math.round(currentOffset + modelNodeEdge - boundingBoxEdge - (onTop ? 0 : (boundingBoxSize-modelNodeSize)));","                        if (yAxis) {","                            instance.saveScrollTo(null, newOffset);","                        }","                        else {","                            instance.saveScrollTo(newOffset, null);","                        }","                    }","                    if (infiniteView && !onTop) {","        //=============================================================================================================================","        //","        // NEED SOME WORK HERE: infiniteScrollPlugin.expandList IS ASYNCHROUS --> WE NEED PROMISES TO BE SURE IT HAS FINISHED HIS JOB","        //","        //=============================================================================================================================","                        infiniteView.checkExpansion();","                    }","                }","                else {","                }","            }","            else {","            }","        },","","        /**","         * Setter for attribute lastItemOnTop. Will re-render the view when changed UNLESS it is called from setWithoutRerender().","         *","         * @method _setLastItemOnTop","         * @param {Boolean} val the new set value for this attribute","         * @private","         * @since 0.1","         *","        */","        _setLastItemOnTop : function(val) {","            var instance = this;","","            if (instance._lastItemTopInit) {","                if (val) {","                    instance._addEmptyItem(null, val);","                    instance.syncUI();","                }","                else {","                    instance._removeEmptyItem();","                    instance.syncUI();","                }","            }","            else {","                instance._lastItemTopInit = true;","            }","        }","","    }, {","        ATTRS : {","            /**","             * Can make the last element in the scrollview be fixed to the bottom/right edge, but to the top/left edge.","             * 0 = not active (normal behaviour, bottom/right)","             * 1 = active: on top/left edge","             * 2 = active: on top/left edge <b>but with headerdefinition</b> if the definition was just before the last item","             *","             * @attribute lastItemOnTop","             * @type {Int}","             * @default 0","             * @since 0.1","             */","            lastItemOnTop: {","                value: 0,","                validator: function(v){ return (Lang.isNumber(v) && (v>-1) && (v<3));},","                setter: '_setLastItemOnTop'","            }","        }","    }",");","","}, '@VERSION@', {","    \"requires\": [","        \"yui-base\",","        \"node-style\",","        \"base-base\",","        \"base-build\",","        \"scrollview\",","        \"gallery-itsamodellistviewextention\"","    ],","    \"skinnable\": true","});"];
_yuitest_coverage["build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js"].lines = {"1":0,"3":0,"28":0,"33":0,"36":0,"57":0,"62":0,"63":0,"64":0,"65":0,"67":0,"68":0,"69":0,"70":0,"72":0,"105":0,"120":0,"124":0,"126":0,"127":0,"130":0,"133":0,"134":0,"136":0,"138":0,"141":0,"144":0,"146":0,"148":0,"149":0,"150":0,"151":0,"152":0,"154":0,"155":0,"157":0,"158":0,"160":0,"167":0,"168":0,"169":0,"170":0,"172":0,"173":0,"174":0,"176":0,"177":0,"178":0,"180":0,"186":0,"187":0,"189":0,"190":0,"191":0,"192":0,"193":0,"194":0,"196":0,"200":0,"203":0,"204":0,"205":0,"206":0,"208":0,"210":0,"211":0,"212":0,"214":0,"215":0,"216":0,"217":0,"218":0,"221":0,"222":0,"223":0,"224":0,"227":0,"228":0,"229":0,"233":0,"234":0,"235":0,"236":0,"237":0,"238":0,"239":0,"240":0,"244":0,"248":0,"249":0,"251":0,"253":0,"256":0,"257":0,"258":0,"261":0,"264":0,"270":0,"290":0,"292":0,"293":0,"294":0,"295":0,"298":0,"299":0,"303":0,"322":0};
_yuitest_coverage["build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js"].functions = {"GETSTYLE:32":0,"saveScrollTo:56":0,"getNodePosition:120":0,"(anonymous 2):156":0,"(anonymous 3):175":0,"(anonymous 4):192":0,"scrollIntoView:99":0,"_setLastItemOnTop:289":0,"validator:322":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js"].coveredLines = 107;
_yuitest_coverage["build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js"].coveredFunctions = 10;
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1);
YUI.add('gallery-itsascrollviewmodellist', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 3);
'use strict';

/**
 * ScrollView ModelList Extention
 *
 *
 * Adds an Y.ModelList  or Y.LazyModelList to a ScrollView instance, where the Models are rendered inside an ul-element
 * which lies within the scrollview's-contentBox. This results in an ul-list with rendered Models. The Models are rendered
 * through a template (Y.Lang.sub or Y.Template.Micro) which needs to be defined with the <b>'modelTemplate'-attribute</b>.
 *
 * Caution: you MUST set the axis-atribute before rendering! Because the content is empty at start, scrollview
 * would otherwise fail autofind the value of axis.
 *
 * @module gallery-itsascrollviewmodellist
 * @extends ScrollView
 * @uses ITSAModellistViewExtention
 * @class ITSAScrollViewModellist
 * @constructor
 * @since 0.1
 *
 * <i>Copyright (c) 2013 Marco Asbreuk - http://itsasbreuk.nl</i>
 * YUI BSD License - http://developer.yahoo.com/yui/license.html
 *
*/

_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 28);
var Lang = Y.Lang,
    MODEL_CLASS = 'itsa-model',
    MODELLIST_CLASS = 'itsa-modellistview',
    GROUPHEADER_CLASS = MODELLIST_CLASS + '-groupheader',
    GETSTYLE = function(node, style) {
        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "GETSTYLE", 32);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 33);
return parseInt(node.getStyle(style), 10);
    };

_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 36);
Y.ITSAScrollViewModellist = Y.Base.create('itsascrollviewmodellist', Y.ScrollView, [Y.ITSAModellistViewExtention], {

        /**
         * Internal flag to tell whether the attribute 'lastItemOnTop' is initiated.
         * @property _lastItemTopInit
         * @private
         * @default false
         * @type Boolean
        */
        _lastItemTopInit : false,

        /**
         * Equals scrollview.scrollTo, but makes sure we keep between the correct boundaries.
         *
         * @method saveScrollTo
         * @param x {Int} The x-position to scroll to. (null for no movement)
         * @param y {Int} The y-position to scroll to. (null for no movement)
         * @since 0.1
         *
        */
        saveScrollTo : function(x, y) {
            _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "saveScrollTo", 56);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 57);
var instance = this,
                boundingBox = instance.get('boundingBox'),
                viewNode = instance._viewNode,
                max;

            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 62);
if (x) {
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 63);
x = Math.max(0, x);
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 64);
max = viewNode.get('offsetWidth') - boundingBox.get('offsetWidth');
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 65);
x = Math.min(x, max);
            }
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 67);
if (y) {
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 68);
y = Math.max(0, y);
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 69);
max = viewNode.get('offsetHeight') - boundingBox.get('offsetHeight');
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 70);
y = Math.min(y, max);
            }
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 72);
instance.scrollTo(x, y);
        },

        /**
         * Makes the Model scroll into the View. Items that are already in the view: no scroll appears. Items that are above: will appear
         * on top. Items that are after the view: will appear on bottom.
         * <u>Be careful if you use the plugin ITSAInifiniteView:</u> to get the Node, there might be a lot of
         * list-expansions triggered. Be sure that expansions from external data does end, otherwise it will overload the browser.
         * That's why the third param is needed.
         * Preferable is to use an index or Node instead of Model --> Modelsearch is slower
         *
         * @method scrollIntoView
         * @param {Y.Node|Y.Model|Int} item Y.Node or Y.Model or index that should be into view.
         * Preferable is to use an index or Node instead of Model --> Modelsearch is slower
         * @param {Object} [options] To force the 'scrollIntoView' to scroll on top or on bottom of the view.
         *     @param {Boolean} [options.forceTop=false] if 'true', the (first) selected item will always be positioned on top.
         *     @param {Boolean} [options.forceBottom=false] if 'true', the (first) selected item will always be positioned on bottom.
         *     @param {Boolean} [options.noFocus=false] if 'true', then the listitem won't get focussed.
         *     @param {Boolean} [options.showHeaders=false] if 'true', when the model is succeeded by headers, the headers will also get into view.
         *     @param {Boolean} [options.editMode=false] if 'true', then Y.Plugin.ITSATabKeyManager will be used to ficus the first item.
                                (only if noFocis=false)
         * @param {Int} [maxExpansions] Only needed when you use the plugin <b>ITSAInifiniteView</b>. Use this value to limit
         * external data-calls. It will prevent you from falling into endless expansion when the list is infinite. If not set this method will expand
         * from external data at the <b>max of 25 times by default</b> (which is quite a lot). If you are responsible for the external data and
         * it is limited, then you might choose to set this value that high to make sure all data is rendered in the scrollview.
         * @since 0.1
        */
        scrollIntoView : function(item, options, maxExpansions) {
    //=============================================================================================================================
    //
    // NEED SOME WORK HERE: MIGHT BE ASYNCHROUS --> WE NEED TO RETURN A PROMISE
    //
    //=============================================================================================================================
            _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "scrollIntoView", 99);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 105);
var instance = this,
                boundingBox = instance.get('boundingBox'),
                axis = instance.get('axis'),
                yAxis = axis.y,
                boundingBoxSize = yAxis ? boundingBox.get('offsetHeight') : boundingBox.get('offsetWidth'),
                boundingBoxEdge = yAxis ? boundingBox.getY() : boundingBox.getX(),
                viewNode = instance._viewNode,
                infiniteView = instance.itsainfiniteview,
                paginatorPlugin = instance.pages,
                showHeaders = options && Lang.isBoolean(options.showHeaders) && options.showHeaders,
                noFocus = options && Lang.isBoolean(options.noFocus) && options.noFocus,
                editMode = options && Lang.isBoolean(options.editMode) && options.editMode,
                modelNodeEdge, currentOffset, newOffset, modelNode, liElements, getNodePosition,
                onTop, nodePosition, modelNodeSize, corrected, prevNode, focusNode;

            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 120);
getNodePosition = function(node) {
                // returns -1 if (partial) before viewNode
                // returns 0 if inside viewNode
                // returns 1 if (partial) after viewNode
                _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "getNodePosition", 120);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 124);
var nodeLowerEdge = yAxis ? node.getY() : node.getX(),
                    nodeUpperEdge;
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 126);
if (yAxis) {
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 127);
nodeUpperEdge = nodeLowerEdge + node.get('offsetHeight') + GETSTYLE(node, 'marginTop') + GETSTYLE(node, 'marginBottom');
                }
                else {
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 130);
nodeUpperEdge = nodeLowerEdge + node.get('offsetWidth') + GETSTYLE(node, 'marginLeft') + GETSTYLE(node, 'marginRight');
                }

                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 133);
if ((nodeLowerEdge<boundingBoxEdge) || (options && Lang.isBoolean(options.forceTop) && options.forceTop)) {
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 134);
return -1;
                }
                else {_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 136);
if ((nodeUpperEdge>(boundingBoxEdge+boundingBoxSize))
                         || (options && Lang.isBoolean(options.forceBottom) && options.forceBottom)) {
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 138);
return 1;
                }
                else {
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 141);
return 0;
                }}
            };
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 144);
if (item instanceof Y.Node) {
                // we passed a Node
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 146);
modelNode = item;
            }
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 148);
if (modelNode || Lang.isNumber(item)) {
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 149);
modelNode = modelNode || instance.getNodeFromIndex(item, maxExpansions);
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 150);
if (modelNode) {
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 151);
nodePosition = getNodePosition(modelNode);
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 152);
if (paginatorPlugin && (nodePosition!==0)) {
                        // increase the modelIndex --> paginator is pased on all LI's, not just the Models
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 154);
liElements = viewNode.get('children');
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 155);
liElements.some(
                            function(node, index) {
                                _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "(anonymous 2)", 156);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 157);
if (!node.hasClass(MODEL_CLASS)) {
                                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 158);
item++;
                                }
                                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 160);
return index===item;
                            }
                        );
                    }
                }
            }
            else {
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 167);
modelNode = item && instance.getNodeFromModel(item, maxExpansions);
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 168);
nodePosition = getNodePosition(modelNode);
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 169);
if (modelNode) {
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 170);
if (paginatorPlugin && (nodePosition!==0)) {
                        // transform model to an index
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 172);
liElements = viewNode.all('>li');
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 173);
item = 0;
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 174);
liElements.some(
                            function(node, index) {
                                _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "(anonymous 3)", 175);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 176);
var found = (node===modelNode);
                                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 177);
if (found) {
                                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 178);
item = index;
                                }
                                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 180);
return found;
                            }
                        );
                    }
                }
            }
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 186);
if (modelNode) {
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 187);
if (!noFocus) {
                    // because modelNode might be going to change (due to headers), we need to backup its reference
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 189);
focusNode = modelNode;
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 190);
instance._focusModelNode(focusNode);
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 191);
if (editMode) {
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 192);
Y.use('gallery-itsatabkeymanager', function(Y) {
                            _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "(anonymous 4)", 192);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 193);
if (!focusNode.itsatabkeymanager) {
                                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 194);
focusNode.plug(Y.Plugin.ITSATabKeyManager);
                            }
                            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 196);
focusNode.itsatabkeymanager.focusInitialItem();
                        });
                    }
                }
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 200);
if ((nodePosition===0) && showHeaders){
                    // might be in view, while the header is not
                    // therefore check if headers are within view
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 203);
prevNode = modelNode.previous();
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 204);
while (prevNode && prevNode.hasClass(GROUPHEADER_CLASS)) {
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 205);
modelNode = prevNode;
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 206);
prevNode = prevNode.previous();
                    }
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 208);
nodePosition = getNodePosition(modelNode);
                }
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 210);
if (nodePosition!==0) {
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 211);
onTop = (nodePosition===-1);
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 212);
if (onTop && showHeaders) {
                        // we need to bring into view the headernode
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 214);
prevNode = modelNode.previous();
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 215);
while (prevNode && prevNode.hasClass(GROUPHEADER_CLASS)) {
                            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 216);
item--;
                            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 217);
modelNode = prevNode;
                            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 218);
prevNode = prevNode.previous();
                        }
                    }
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 221);
if (yAxis) {
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 222);
modelNodeEdge = modelNode.getY();
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 223);
currentOffset = instance.get('scrollY');
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 224);
modelNodeSize = modelNode.get('offsetHeight') + GETSTYLE(modelNode, 'marginTop') + GETSTYLE(modelNode, 'marginBottom');
                    }
                    else {
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 227);
modelNodeEdge = modelNode.getX();
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 228);
currentOffset = instance.get('scrollX');
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 229);
modelNodeSize = modelNode.get('offsetWidth') + GETSTYLE(modelNode, 'marginLeft') + GETSTYLE(modelNode, 'marginRight');
                    }
                    // You might need to expand the list in case ITSAInifiniteView is pluged-in
                    // Only 1 time is needed: getNodeFromModel already has expanded a number of times to make the Node available
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 233);
if (paginatorPlugin) {
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 234);
if (!onTop) {
                            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 235);
while ((modelNodeSize<boundingBoxSize) && (item>0)) {
                                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 236);
corrected = true;
                                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 237);
item--;
                                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 238);
modelNode = modelNode.previous('li');
                                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 239);
if (yAxis) {
                                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 240);
modelNodeSize += modelNode.get('offsetHeight') +
                                                     GETSTYLE(modelNode, 'marginTop') + GETSTYLE(modelNode, 'marginBottom');
                                }
                                else {
                                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 244);
modelNodeSize += modelNode.get('offsetWidth') +
                                                     GETSTYLE(modelNode, 'marginLeft') + GETSTYLE(modelNode, 'marginRight');
                                }
                            }
                            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 248);
if (corrected) {
                                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 249);
item++;
                            }
                            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 251);
item = Math.min(item, instance._getMaxPaginatorGotoIndex(item, maxExpansions));
                        }
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 253);
paginatorPlugin.scrollToIndex(item);
                    }
                    else {
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 256);
newOffset = Math.round(currentOffset + modelNodeEdge - boundingBoxEdge - (onTop ? 0 : (boundingBoxSize-modelNodeSize)));
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 257);
if (yAxis) {
                            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 258);
instance.saveScrollTo(null, newOffset);
                        }
                        else {
                            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 261);
instance.saveScrollTo(newOffset, null);
                        }
                    }
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 264);
if (infiniteView && !onTop) {
        //=============================================================================================================================
        //
        // NEED SOME WORK HERE: infiniteScrollPlugin.expandList IS ASYNCHROUS --> WE NEED PROMISES TO BE SURE IT HAS FINISHED HIS JOB
        //
        //=============================================================================================================================
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 270);
infiniteView.checkExpansion();
                    }
                }
                else {
                }
            }
            else {
            }
        },

        /**
         * Setter for attribute lastItemOnTop. Will re-render the view when changed UNLESS it is called from setWithoutRerender().
         *
         * @method _setLastItemOnTop
         * @param {Boolean} val the new set value for this attribute
         * @private
         * @since 0.1
         *
        */
        _setLastItemOnTop : function(val) {
            _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "_setLastItemOnTop", 289);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 290);
var instance = this;

            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 292);
if (instance._lastItemTopInit) {
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 293);
if (val) {
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 294);
instance._addEmptyItem(null, val);
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 295);
instance.syncUI();
                }
                else {
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 298);
instance._removeEmptyItem();
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 299);
instance.syncUI();
                }
            }
            else {
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 303);
instance._lastItemTopInit = true;
            }
        }

    }, {
        ATTRS : {
            /**
             * Can make the last element in the scrollview be fixed to the bottom/right edge, but to the top/left edge.
             * 0 = not active (normal behaviour, bottom/right)
             * 1 = active: on top/left edge
             * 2 = active: on top/left edge <b>but with headerdefinition</b> if the definition was just before the last item
             *
             * @attribute lastItemOnTop
             * @type {Int}
             * @default 0
             * @since 0.1
             */
            lastItemOnTop: {
                value: 0,
                validator: function(v){ _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "validator", 322);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 322);
return (Lang.isNumber(v) && (v>-1) && (v<3));},
                setter: '_setLastItemOnTop'
            }
        }
    }
);

}, '@VERSION@', {
    "requires": [
        "yui-base",
        "node-style",
        "base-base",
        "base-build",
        "scrollview",
        "gallery-itsamodellistviewextention"
    ],
    "skinnable": true
});
