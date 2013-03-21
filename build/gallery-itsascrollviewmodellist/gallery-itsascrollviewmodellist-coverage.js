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
_yuitest_coverage["build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js"].code=["YUI.add('gallery-itsascrollviewmodellist', function (Y, NAME) {","","'use strict';","","/**"," * ScrollView ModelList Extention"," *"," *"," * Adds an Y.ModelList  or Y.LazyModelList to a ScrollView instance, where the Models are rendered inside an ul-element"," * which lies within the scrollview's-contentBox. This results in an ul-list with rendered Models. The Models are rendered"," * through a template (Y.Lang.sub or Y.Template.Micro) which needs to be defined aith the <b>'renderModel'-attribute</b>."," *"," * Caution: you MUST set the axis-atribute before rendering! Because the content is empty at start, scrollview"," * would otherwise fail autofind the value of axis."," *"," * @module gallery-itsascrollviewmodellist"," * @extends ITSAModellistViewExtention"," * @class ITSAScrollViewModelList"," * @constructor"," * @since 0.1"," *"," * <i>Copyright (c) 2013 Marco Asbreuk - http://itsasbreuk.nl</i>"," * YUI BSD License - http://developer.yahoo.com/yui/license.html"," *","*/","","var Lang = Y.Lang,","    MODEL_CLASS = 'itsa-scrollviewmodel',","    SVML_CLASS = 'itsa-scrollviewmodellist',","    GROUPHEADER_CLASS = SVML_CLASS + '-groupheader',","    GETSTYLE = function(node, style) {","        return parseInt(node.getStyle(style), 10);","    };","","function ITSAScrollviewModellist() {}","","ITSAScrollviewModellist.ATTRS = {","","    /**","     * Can make the last element be fixed to the bottom/right edge, but to the top/left edge.","     * 0 = not active (normal behaviour, bottom/right)","     * 1 = active: on top/left edge","     * 2 = active: on top/left edge <b>but with headerdefinition</b> if the definition was just before the last item","     *","     * @attribute lastItemOnTop","     * @type {Int}","     * @default 0","     * @since 0.1","     */","    lastItemOnTop: {","        value: 0,","        validator: function(v){ return (Lang.isNumber(v) && (v>-1) && (v<3));},","        setter: '_setLastItemOnTop'","    }","","};","","Y.mix(ITSAScrollviewModellist.prototype, {","","    /**","     * Internal flag to tell whether the attribute 'lastItemOnTop' is initiated.","     * @property _lastItemTopInit","     * @private","     * @default false","     * @type Boolean","    */","    _lastItemTopInit : false,","","","    /**","     * Equals scrollview.scrollTo, but makes sure we keep between the correct boundaries.","     *","     * @method saveScrollTo","     * @param x {Int} The x-position to scroll to. (null for no movement)","     * @param y {Int} The y-position to scroll to. (null for no movement)","     * @since 0.1","     *","    */","    saveScrollTo : function(x, y) {","        var instance = this,","            boundingBox = instance.get('boundingBox'),","            viewNode = instance._viewNode,","            max;","","        if (x) {","            x = Math.max(0, x);","            max = viewNode.get('offsetWidth') - boundingBox.get('offsetWidth');","            x = Math.min(x, max);","        }","        if (y) {","            y = Math.max(0, y);","            max = viewNode.get('offsetHeight') - boundingBox.get('offsetHeight');","            y = Math.min(y, max);","        }","        instance.scrollTo(x, y);","    },","","    /**","     * Makes the Model scroll into the View. Items that are already in the view: no scroll appears. Items that are above: will appear","     * on top. Items that are after the view: will appear on bottom.","     * <u>Be careful if you use the plugin ITSAInifiniteView:</u> to get the Node, there might be a lot of","     * list-expansions triggered. Be sure that expansions from external data does end, otherwise it will overload the browser.","     * That's why the third param is needed.","     * Preferable is to use an index or Node instead of Model --> Modelsearch is slower","     *","     * @method scrollIntoView","     * @param {Y.Node|Y.Model|Int} item Y.Node or Y.Model or index that should be into view.","     * Preferable is to use an index or Node instead of Model --> Modelsearch is slower","     * @param {Object} [options] To force the 'scrollIntoView' to scroll on top or on bottom of the view.","     *     @param {Boolean} [options.forceTop=false] if 'true', the (first) selected item will always be positioned on top.","     *     @param {Boolean} [options.forceBottom=false] if 'true', the (first) selected item will always be positioned on bottom.","     *     @param {Boolean} [options.noFocus=false] if 'true', then the listitem won't get focussed.","     *     @param {Boolean} [options.showHeaders=false] if 'true', when the model is succeeded by headers, the headers will also get into view.","     * @param {Int} [maxExpansions] Only needed when you use the plugin <b>ITSAInifiniteView</b>. Use this value to limit","     * external data-calls. It will prevent you from falling into endless expansion when the list is infinite. If not set this method will expand","     * from external data at the <b>max of 25 times by default</b> (which is quite a lot). If you are responsible for the external data and","     * it is limited, then you might choose to set this value that high to make sure all data is rendered in the scrollview.","     * @since 0.1","    */","    scrollIntoView : function(item, options, maxExpansions) {","//=============================================================================================================================","//","// NEED SOME WORK HERE: MIGHT BE ASYNCHROUS --> WE NEED TO RETURN A PROMISE","//","//=============================================================================================================================","        var instance = this,","            boundingBox = instance.get('boundingBox'),","            axis = instance.get('axis'),","            yAxis = axis.y,","            boundingBoxSize = yAxis ? boundingBox.get('offsetHeight') : boundingBox.get('offsetWidth'),","            boundingBoxEdge = yAxis ? boundingBox.getY() : boundingBox.getX(),","            viewNode = instance._viewNode,","            infiniteView = instance.itsainfiniteview,","            paginatorPlugin = instance.pages,","            modelNodeEdge, currentOffset, maxOffset, newOffset, modelNode, liElements, getNodePosition,","            onTop, nodePosition, modelNodeSize, corrected, prevNode;","","        getNodePosition = function(node) {","            // returns -1 if (partial) before viewNode","            // returns 0 if inside viewNode","            // returns 1 if (partial) after viewNode","            var nodeLowerEdge = yAxis ? node.getY() : node.getX(),","                nodeUpperEdge;","            if (yAxis) {","                nodeUpperEdge = nodeLowerEdge + node.get('offsetHeight') + GETSTYLE(node, 'marginTop') + GETSTYLE(node, 'marginBottom');","            }","            else {","                nodeUpperEdge = nodeLowerEdge + node.get('offsetWidth') + GETSTYLE(node, 'marginLeft') + GETSTYLE(node, 'marginRight');","            }","","            if ((nodeLowerEdge<boundingBoxEdge) || (options && Lang.isBoolean(options.forceTop) && options.forceTop)) {","                return -1;","            }","            else if ((nodeUpperEdge>(boundingBoxEdge+boundingBoxSize)) || (options && Lang.isBoolean(options.forceBottom) && options.forceBottom)) {","                return 1;","            }","            else {","                return 0;","            }","        };","        if (item instanceof Y.Node) {","            // we passed a Node","            modelNode = item;","        }","        if (modelNode || Lang.isNumber(item)) {","            modelNode = modelNode || instance.getNodeFromIndex(item, maxExpansions);","            nodePosition = getNodePosition(modelNode);","            if (paginatorPlugin && (nodePosition!==0)) {","                // increase the modelIndex --> paginator is pased on all LI's, not just the Models","                liElements = viewNode.all('>li');","                liElements.some(","                    function(node, index) {","                        if (!node.hasClass(MODEL_CLASS)) {","                            item++;","                        }","                        return index===item;","                    }","                );","            }","        }","        else {","            modelNode = item && instance.getNodeFromModel(item, maxExpansions);","            nodePosition = getNodePosition(modelNode);","            if (paginatorPlugin && (nodePosition!==0)) {","                // transform model to an index","                liElements = viewNode.all('>li');","                item = 0;","                liElements.some(","                    function(node, index) {","                        var found = (node===modelNode);","                        if (found) {","                            item = index;","                        }","                        return found;","                    }","                );","            }","        }","        if (!options || !Lang.isBoolean(options.noFocus) || !options.noFocus) {","            instance._focusModelNode(modelNode);","        }","        if ((modelNode) && (nodePosition!==0)) {","            onTop = (nodePosition===-1);","            if (onTop && options && Lang.isBoolean(options.showHeaders) && options.showHeaders) {","                // we need to bring into view the headernode","                prevNode = modelNode.previous();","                while (prevNode && prevNode.hasClass(GROUPHEADER_CLASS)) {","                    modelNode = prevNode;","                    prevNode = prevNode.previous();","                }","            }","            if (yAxis) {","                modelNodeEdge = modelNode.getY();","                currentOffset = instance.get('scrollY');","                modelNodeSize = modelNode.get('offsetHeight') + GETSTYLE(modelNode, 'marginTop') + GETSTYLE(modelNode, 'marginBottom');","                maxOffset = viewNode.get('offsetHeight') - boundingBoxSize;","            }","            else {","                modelNodeEdge = modelNode.getX();","                currentOffset = instance.get('scrollX');","                modelNodeSize = modelNode.get('offsetWidth') + GETSTYLE(modelNode, 'marginLeft') + GETSTYLE(modelNode, 'marginRight');","                maxOffset = viewNode.get('offsetWidth') - boundingBoxSize;","            }","            // You might need to expand the list in case ITSAInifiniteView is pluged-in AND maxOffset<newOffset","            // Only 1 time is needed: getNodeFromModel already has expanded a number of times to make the Node available","            if (infiniteView && !onTop) {","//=============================================================================================================================","//","// NEED SOME WORK HERE: infiniteScrollPlugin.expandList IS ASYNCHROUS --> WE NEED PROMISES TO BE SURE IT HAS FINISHED HIS JOB","//","//=============================================================================================================================","                infiniteView.checkExpansion();","            }","            if (paginatorPlugin) {","                if (!onTop) {","                    while ((modelNodeSize<boundingBoxSize) && (item>0)) {","                        corrected = true;","                        item--;","                        modelNode = modelNode.previous('li');","                        if (yAxis) {","                            modelNodeSize += modelNode.get('offsetHeight') + GETSTYLE(modelNode, 'marginTop') + GETSTYLE(modelNode, 'marginBottom');","                        }","                        else {","                            modelNodeSize += modelNode.get('offsetWidth') + GETSTYLE(modelNode, 'marginLeft') + GETSTYLE(modelNode, 'marginRight');","                        }","                    }","                    if (corrected) {","                        item++;","                    }","                    item = Math.min(item, instance._getMaxPaginatorGotoIndex(item, maxExpansions));","                }","                paginatorPlugin.scrollToIndex(item);","            }","            else {","                newOffset = Math.round(currentOffset + modelNodeEdge - boundingBoxEdge - (onTop ? 0 : (boundingBoxSize-modelNodeSize)));","                if (yAxis) {","                    instance.saveScrollTo(null, newOffset);","                }","                else {","                    instance.saveScrollTo(newOffset, null);","                }","            }","        }","        else {","            if (!modelNode) {","            }","            else {","            }","        }","    },","","    /**","     * Setter for attribute lastItemOnTop. Will re-render the view when changed UNLESS it is called from setWithoutRerender().","     *","     * @method _setLastItemOnTop","     * @param {Boolean} val the new set value for this attribute","     * @private","     * @since 0.1","     *","    */","    _setLastItemOnTop : function(val) {","        var instance = this;","","        if (instance._lastItemTopInit) {","            if (val) {","                instance._addEmptyItem(null, val);","                instance.syncUI();","            }","            else {","                instance._removeEmptyItem();","                instance.syncUI();","            }","        }","        else {","            instance._lastItemTopInit = true;","        }","    }","","}, true);","","Y.ScrollView.ITSAScrollviewModellist = ITSAScrollviewModellist;","","// first mix in ITSAModellistViewExtention, then mix in ITSAScrollviewModellist","Y.Base.mix(Y.ScrollView, [Y.ITSAModellistViewExtention]);","Y.Base.mix(Y.ScrollView, [ITSAScrollviewModellist]);","","}, '@VERSION@', {\"requires\": [\"gallery-itsamodellistviewextention\"], \"skinnable\": true});"];
_yuitest_coverage["build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js"].lines = {"1":0,"3":0,"27":0,"32":0,"35":0,"37":0,"52":0,"58":0,"80":0,"85":0,"86":0,"87":0,"88":0,"90":0,"91":0,"92":0,"93":0,"95":0,"126":0,"138":0,"142":0,"144":0,"145":0,"148":0,"151":0,"152":0,"154":0,"155":0,"158":0,"161":0,"163":0,"165":0,"166":0,"167":0,"168":0,"170":0,"171":0,"173":0,"174":0,"176":0,"182":0,"183":0,"184":0,"186":0,"187":0,"188":0,"190":0,"191":0,"192":0,"194":0,"199":0,"200":0,"202":0,"203":0,"204":0,"206":0,"207":0,"208":0,"209":0,"212":0,"213":0,"214":0,"215":0,"216":0,"219":0,"220":0,"221":0,"222":0,"226":0,"232":0,"234":0,"235":0,"236":0,"237":0,"238":0,"239":0,"240":0,"241":0,"244":0,"247":0,"248":0,"250":0,"252":0,"255":0,"256":0,"257":0,"260":0,"265":0,"282":0,"284":0,"285":0,"286":0,"287":0,"290":0,"291":0,"295":0,"301":0,"304":0,"305":0};
_yuitest_coverage["build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js"].functions = {"GETSTYLE:31":0,"ITSAScrollviewModellist:35":0,"validator:52":0,"saveScrollTo:79":0,"getNodePosition:138":0,"(anonymous 2):172":0,"(anonymous 3):189":0,"scrollIntoView:120":0,"_setLastItemOnTop:281":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js"].coveredLines = 99;
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
 * through a template (Y.Lang.sub or Y.Template.Micro) which needs to be defined aith the <b>'renderModel'-attribute</b>.
 *
 * Caution: you MUST set the axis-atribute before rendering! Because the content is empty at start, scrollview
 * would otherwise fail autofind the value of axis.
 *
 * @module gallery-itsascrollviewmodellist
 * @extends ITSAModellistViewExtention
 * @class ITSAScrollViewModelList
 * @constructor
 * @since 0.1
 *
 * <i>Copyright (c) 2013 Marco Asbreuk - http://itsasbreuk.nl</i>
 * YUI BSD License - http://developer.yahoo.com/yui/license.html
 *
*/

_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 27);
var Lang = Y.Lang,
    MODEL_CLASS = 'itsa-scrollviewmodel',
    SVML_CLASS = 'itsa-scrollviewmodellist',
    GROUPHEADER_CLASS = SVML_CLASS + '-groupheader',
    GETSTYLE = function(node, style) {
        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "GETSTYLE", 31);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 32);
return parseInt(node.getStyle(style), 10);
    };

_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 35);
function ITSAScrollviewModellist() {}

_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 37);
ITSAScrollviewModellist.ATTRS = {

    /**
     * Can make the last element be fixed to the bottom/right edge, but to the top/left edge.
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
        validator: function(v){ _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "validator", 52);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 52);
return (Lang.isNumber(v) && (v>-1) && (v<3));},
        setter: '_setLastItemOnTop'
    }

};

_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 58);
Y.mix(ITSAScrollviewModellist.prototype, {

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
        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "saveScrollTo", 79);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 80);
var instance = this,
            boundingBox = instance.get('boundingBox'),
            viewNode = instance._viewNode,
            max;

        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 85);
if (x) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 86);
x = Math.max(0, x);
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 87);
max = viewNode.get('offsetWidth') - boundingBox.get('offsetWidth');
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 88);
x = Math.min(x, max);
        }
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 90);
if (y) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 91);
y = Math.max(0, y);
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 92);
max = viewNode.get('offsetHeight') - boundingBox.get('offsetHeight');
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 93);
y = Math.min(y, max);
        }
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 95);
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
        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "scrollIntoView", 120);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 126);
var instance = this,
            boundingBox = instance.get('boundingBox'),
            axis = instance.get('axis'),
            yAxis = axis.y,
            boundingBoxSize = yAxis ? boundingBox.get('offsetHeight') : boundingBox.get('offsetWidth'),
            boundingBoxEdge = yAxis ? boundingBox.getY() : boundingBox.getX(),
            viewNode = instance._viewNode,
            infiniteView = instance.itsainfiniteview,
            paginatorPlugin = instance.pages,
            modelNodeEdge, currentOffset, maxOffset, newOffset, modelNode, liElements, getNodePosition,
            onTop, nodePosition, modelNodeSize, corrected, prevNode;

        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 138);
getNodePosition = function(node) {
            // returns -1 if (partial) before viewNode
            // returns 0 if inside viewNode
            // returns 1 if (partial) after viewNode
            _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "getNodePosition", 138);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 142);
var nodeLowerEdge = yAxis ? node.getY() : node.getX(),
                nodeUpperEdge;
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 144);
if (yAxis) {
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 145);
nodeUpperEdge = nodeLowerEdge + node.get('offsetHeight') + GETSTYLE(node, 'marginTop') + GETSTYLE(node, 'marginBottom');
            }
            else {
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 148);
nodeUpperEdge = nodeLowerEdge + node.get('offsetWidth') + GETSTYLE(node, 'marginLeft') + GETSTYLE(node, 'marginRight');
            }

            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 151);
if ((nodeLowerEdge<boundingBoxEdge) || (options && Lang.isBoolean(options.forceTop) && options.forceTop)) {
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 152);
return -1;
            }
            else {_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 154);
if ((nodeUpperEdge>(boundingBoxEdge+boundingBoxSize)) || (options && Lang.isBoolean(options.forceBottom) && options.forceBottom)) {
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 155);
return 1;
            }
            else {
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 158);
return 0;
            }}
        };
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 161);
if (item instanceof Y.Node) {
            // we passed a Node
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 163);
modelNode = item;
        }
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 165);
if (modelNode || Lang.isNumber(item)) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 166);
modelNode = modelNode || instance.getNodeFromIndex(item, maxExpansions);
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 167);
nodePosition = getNodePosition(modelNode);
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 168);
if (paginatorPlugin && (nodePosition!==0)) {
                // increase the modelIndex --> paginator is pased on all LI's, not just the Models
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 170);
liElements = viewNode.all('>li');
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 171);
liElements.some(
                    function(node, index) {
                        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "(anonymous 2)", 172);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 173);
if (!node.hasClass(MODEL_CLASS)) {
                            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 174);
item++;
                        }
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 176);
return index===item;
                    }
                );
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 182);
modelNode = item && instance.getNodeFromModel(item, maxExpansions);
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 183);
nodePosition = getNodePosition(modelNode);
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 184);
if (paginatorPlugin && (nodePosition!==0)) {
                // transform model to an index
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 186);
liElements = viewNode.all('>li');
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 187);
item = 0;
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 188);
liElements.some(
                    function(node, index) {
                        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "(anonymous 3)", 189);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 190);
var found = (node===modelNode);
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 191);
if (found) {
                            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 192);
item = index;
                        }
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 194);
return found;
                    }
                );
            }
        }
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 199);
if (!options || !Lang.isBoolean(options.noFocus) || !options.noFocus) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 200);
instance._focusModelNode(modelNode);
        }
        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 202);
if ((modelNode) && (nodePosition!==0)) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 203);
onTop = (nodePosition===-1);
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 204);
if (onTop && options && Lang.isBoolean(options.showHeaders) && options.showHeaders) {
                // we need to bring into view the headernode
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 206);
prevNode = modelNode.previous();
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 207);
while (prevNode && prevNode.hasClass(GROUPHEADER_CLASS)) {
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 208);
modelNode = prevNode;
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 209);
prevNode = prevNode.previous();
                }
            }
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 212);
if (yAxis) {
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 213);
modelNodeEdge = modelNode.getY();
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 214);
currentOffset = instance.get('scrollY');
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 215);
modelNodeSize = modelNode.get('offsetHeight') + GETSTYLE(modelNode, 'marginTop') + GETSTYLE(modelNode, 'marginBottom');
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 216);
maxOffset = viewNode.get('offsetHeight') - boundingBoxSize;
            }
            else {
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 219);
modelNodeEdge = modelNode.getX();
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 220);
currentOffset = instance.get('scrollX');
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 221);
modelNodeSize = modelNode.get('offsetWidth') + GETSTYLE(modelNode, 'marginLeft') + GETSTYLE(modelNode, 'marginRight');
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 222);
maxOffset = viewNode.get('offsetWidth') - boundingBoxSize;
            }
            // You might need to expand the list in case ITSAInifiniteView is pluged-in AND maxOffset<newOffset
            // Only 1 time is needed: getNodeFromModel already has expanded a number of times to make the Node available
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 226);
if (infiniteView && !onTop) {
//=============================================================================================================================
//
// NEED SOME WORK HERE: infiniteScrollPlugin.expandList IS ASYNCHROUS --> WE NEED PROMISES TO BE SURE IT HAS FINISHED HIS JOB
//
//=============================================================================================================================
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 232);
infiniteView.checkExpansion();
            }
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 234);
if (paginatorPlugin) {
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 235);
if (!onTop) {
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 236);
while ((modelNodeSize<boundingBoxSize) && (item>0)) {
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 237);
corrected = true;
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 238);
item--;
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 239);
modelNode = modelNode.previous('li');
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 240);
if (yAxis) {
                            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 241);
modelNodeSize += modelNode.get('offsetHeight') + GETSTYLE(modelNode, 'marginTop') + GETSTYLE(modelNode, 'marginBottom');
                        }
                        else {
                            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 244);
modelNodeSize += modelNode.get('offsetWidth') + GETSTYLE(modelNode, 'marginLeft') + GETSTYLE(modelNode, 'marginRight');
                        }
                    }
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 247);
if (corrected) {
                        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 248);
item++;
                    }
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 250);
item = Math.min(item, instance._getMaxPaginatorGotoIndex(item, maxExpansions));
                }
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 252);
paginatorPlugin.scrollToIndex(item);
            }
            else {
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 255);
newOffset = Math.round(currentOffset + modelNodeEdge - boundingBoxEdge - (onTop ? 0 : (boundingBoxSize-modelNodeSize)));
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 256);
if (yAxis) {
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 257);
instance.saveScrollTo(null, newOffset);
                }
                else {
                    _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 260);
instance.saveScrollTo(newOffset, null);
                }
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 265);
if (!modelNode) {
            }
            else {
            }
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
        _yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "_setLastItemOnTop", 281);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 282);
var instance = this;

        _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 284);
if (instance._lastItemTopInit) {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 285);
if (val) {
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 286);
instance._addEmptyItem(null, val);
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 287);
instance.syncUI();
            }
            else {
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 290);
instance._removeEmptyItem();
                _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 291);
instance.syncUI();
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 295);
instance._lastItemTopInit = true;
        }
    }

}, true);

_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 301);
Y.ScrollView.ITSAScrollviewModellist = ITSAScrollviewModellist;

// first mix in ITSAModellistViewExtention, then mix in ITSAScrollviewModellist
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 304);
Y.Base.mix(Y.ScrollView, [Y.ITSAModellistViewExtention]);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 305);
Y.Base.mix(Y.ScrollView, [ITSAScrollviewModellist]);

}, '@VERSION@', {"requires": ["gallery-itsamodellistviewextention"], "skinnable": true});
