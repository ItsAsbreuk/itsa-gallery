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
_yuitest_coverage["build/gallery-itsaviewmodellist/gallery-itsaviewmodellist.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-itsaviewmodellist/gallery-itsaviewmodellist.js",
    code: []
};
_yuitest_coverage["build/gallery-itsaviewmodellist/gallery-itsaviewmodellist.js"].code=["YUI.add('gallery-itsaviewmodellist', function (Y, NAME) {","","'use strict';","","/**"," * View ModelList Extention"," *"," *"," * Adds an Y.ModelList  or Y.LazyModelList to a View instance, where the Models are rendered inside an ul-element"," * which acts as the 'container'-attribute. This results in an ul-list with rendered Models. The Models are rendered"," * through a template (Y.Lang.sub or Y.Template.Micro) which needs to be defined with the <b>'template'-attribute</b>."," *"," * @module gallery-itsaviewmodellist"," * @extends Widget"," * @uses ITSAModellistViewExtention"," * @class ITSAViewModelList"," * @constructor"," * @since 0.1"," *"," * <i>Copyright (c) 2013 Marco Asbreuk - http://itsasbreuk.nl</i>"," * YUI BSD License - http://developer.yahoo.com/yui/license.html"," *","*/","var Lang = Y.Lang,","    MODELLIST_CLASS = 'itsa-modellistview',","    GROUPHEADER_CLASS = MODELLIST_CLASS + '-groupheader';","","Y.ITSAViewModellist = Y.Base.create('itsaviewmodellist', Y.Widget, [Y.ITSAModellistViewExtention], {","","        /**","         * Makes the Model scroll into the View. Items that are already in the view: no scroll appears. Items that are above: will appear","         * on top. Items that are after the view: will appear on bottom.","         * <u>Be careful if you use the plugin ITSAInifiniteView:</u> to get the Node, there might be a lot of","         * list-expansions triggered. Be sure that expansions from external data does end, otherwise it will overload the browser.","         * That's why the third param is needed.","         * Preferable is to use an index or Node instead of Model --> Modelsearch is slower","         *","         * @method scrollIntoView","         * @param {Y.Node|Y.Model|Int} item Y.Node or Y.Model or index that should be into view.","         * Preferable is to use an index or Node instead of Model --> Modelsearch is slower","         * @param {Object} [options] To force the 'scrollIntoView' to scroll on top or on bottom of the view.","         *     @param {Boolean} [options.forceTop=false] if 'true', the (first) selected item will always be positioned on top.","         *     @param {Boolean} [options.forceBottom=false] if 'true', the (first) selected item will always be positioned on bottom.","         *     @param {Boolean} [options.noFocus=false] if 'true', then the listitem won't get focussed.","         *     @param {Boolean} [options.showHeaders=false] if 'true', when the model is succeeded by headers, the headers will also get into view.","         * @param {Int} [maxExpansions] Only needed when you use the plugin <b>ITSAInifiniteView</b>. Use this value to limit","         * external data-calls. It will prevent you from falling into endless expansion when the list is infinite. If not set this method will expand","         * from external data at the <b>max of 25 times by default</b> (which is quite a lot). If you are responsible for the external data and","         * it is limited, then you might choose to set this value that high to make sure all data is rendered in the scrollview.","         * @since 0.1","        */","        scrollIntoView : function(item, options, maxExpansions) {","            var instance = this,","                showHeaders = options && Lang.isBoolean(options.showHeaders) && options.showHeaders,","                modelNode, firstHeaderNodeNode, prevNode;","","            if (!(item instanceof Y.Node)) {","                if (Lang.isNumber(item)) {","                    modelNode = instance.getNodeFromIndex(item, maxExpansions);","                }","                else {","                    modelNode = item && instance.getNodeFromModel(item, maxExpansions);","                }","            }","            if (modelNode) {","                if (!options || !Lang.isBoolean(options.noFocus) || !options.noFocus) {","                    instance._focusModelNode(modelNode);","                }","                if (showHeaders) {","                    prevNode = modelNode.previous();","                    while (prevNode && prevNode.hasClass(GROUPHEADER_CLASS)) {","                        firstHeaderNodeNode = prevNode;","                        prevNode = prevNode.previous();","                    }","                    if (firstHeaderNodeNode) {","                        firstHeaderNodeNode.scrollIntoView();","                    }","                }","                modelNode.scrollIntoView();","            }","            else {","            }","        }","","    }, {","        ATTRS : {","        }","    }",");","","}, '@VERSION@', {","    \"requires\": [","        \"yui-base\",","        \"node-style\",","        \"base-base\",","        \"base-build\",","        \"widget\",","        \"gallery-itsamodellistviewextention\"","    ],","    \"skinnable\": true","});"];
_yuitest_coverage["build/gallery-itsaviewmodellist/gallery-itsaviewmodellist.js"].lines = {"1":0,"3":0,"24":0,"28":0,"53":0,"57":0,"58":0,"59":0,"62":0,"65":0,"66":0,"67":0,"69":0,"70":0,"71":0,"72":0,"73":0,"75":0,"76":0,"79":0};
_yuitest_coverage["build/gallery-itsaviewmodellist/gallery-itsaviewmodellist.js"].functions = {"scrollIntoView:52":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-itsaviewmodellist/gallery-itsaviewmodellist.js"].coveredLines = 20;
_yuitest_coverage["build/gallery-itsaviewmodellist/gallery-itsaviewmodellist.js"].coveredFunctions = 2;
_yuitest_coverline("build/gallery-itsaviewmodellist/gallery-itsaviewmodellist.js", 1);
YUI.add('gallery-itsaviewmodellist', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-itsaviewmodellist/gallery-itsaviewmodellist.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-itsaviewmodellist/gallery-itsaviewmodellist.js", 3);
'use strict';

/**
 * View ModelList Extention
 *
 *
 * Adds an Y.ModelList  or Y.LazyModelList to a View instance, where the Models are rendered inside an ul-element
 * which acts as the 'container'-attribute. This results in an ul-list with rendered Models. The Models are rendered
 * through a template (Y.Lang.sub or Y.Template.Micro) which needs to be defined with the <b>'template'-attribute</b>.
 *
 * @module gallery-itsaviewmodellist
 * @extends Widget
 * @uses ITSAModellistViewExtention
 * @class ITSAViewModelList
 * @constructor
 * @since 0.1
 *
 * <i>Copyright (c) 2013 Marco Asbreuk - http://itsasbreuk.nl</i>
 * YUI BSD License - http://developer.yahoo.com/yui/license.html
 *
*/
_yuitest_coverline("build/gallery-itsaviewmodellist/gallery-itsaviewmodellist.js", 24);
var Lang = Y.Lang,
    MODELLIST_CLASS = 'itsa-modellistview',
    GROUPHEADER_CLASS = MODELLIST_CLASS + '-groupheader';

_yuitest_coverline("build/gallery-itsaviewmodellist/gallery-itsaviewmodellist.js", 28);
Y.ITSAViewModellist = Y.Base.create('itsaviewmodellist', Y.Widget, [Y.ITSAModellistViewExtention], {

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
            _yuitest_coverfunc("build/gallery-itsaviewmodellist/gallery-itsaviewmodellist.js", "scrollIntoView", 52);
_yuitest_coverline("build/gallery-itsaviewmodellist/gallery-itsaviewmodellist.js", 53);
var instance = this,
                showHeaders = options && Lang.isBoolean(options.showHeaders) && options.showHeaders,
                modelNode, firstHeaderNodeNode, prevNode;

            _yuitest_coverline("build/gallery-itsaviewmodellist/gallery-itsaviewmodellist.js", 57);
if (!(item instanceof Y.Node)) {
                _yuitest_coverline("build/gallery-itsaviewmodellist/gallery-itsaviewmodellist.js", 58);
if (Lang.isNumber(item)) {
                    _yuitest_coverline("build/gallery-itsaviewmodellist/gallery-itsaviewmodellist.js", 59);
modelNode = instance.getNodeFromIndex(item, maxExpansions);
                }
                else {
                    _yuitest_coverline("build/gallery-itsaviewmodellist/gallery-itsaviewmodellist.js", 62);
modelNode = item && instance.getNodeFromModel(item, maxExpansions);
                }
            }
            _yuitest_coverline("build/gallery-itsaviewmodellist/gallery-itsaviewmodellist.js", 65);
if (modelNode) {
                _yuitest_coverline("build/gallery-itsaviewmodellist/gallery-itsaviewmodellist.js", 66);
if (!options || !Lang.isBoolean(options.noFocus) || !options.noFocus) {
                    _yuitest_coverline("build/gallery-itsaviewmodellist/gallery-itsaviewmodellist.js", 67);
instance._focusModelNode(modelNode);
                }
                _yuitest_coverline("build/gallery-itsaviewmodellist/gallery-itsaviewmodellist.js", 69);
if (showHeaders) {
                    _yuitest_coverline("build/gallery-itsaviewmodellist/gallery-itsaviewmodellist.js", 70);
prevNode = modelNode.previous();
                    _yuitest_coverline("build/gallery-itsaviewmodellist/gallery-itsaviewmodellist.js", 71);
while (prevNode && prevNode.hasClass(GROUPHEADER_CLASS)) {
                        _yuitest_coverline("build/gallery-itsaviewmodellist/gallery-itsaviewmodellist.js", 72);
firstHeaderNodeNode = prevNode;
                        _yuitest_coverline("build/gallery-itsaviewmodellist/gallery-itsaviewmodellist.js", 73);
prevNode = prevNode.previous();
                    }
                    _yuitest_coverline("build/gallery-itsaviewmodellist/gallery-itsaviewmodellist.js", 75);
if (firstHeaderNodeNode) {
                        _yuitest_coverline("build/gallery-itsaviewmodellist/gallery-itsaviewmodellist.js", 76);
firstHeaderNodeNode.scrollIntoView();
                    }
                }
                _yuitest_coverline("build/gallery-itsaviewmodellist/gallery-itsaviewmodellist.js", 79);
modelNode.scrollIntoView();
            }
            else {
            }
        }

    }, {
        ATTRS : {
        }
    }
);

}, '@VERSION@', {
    "requires": [
        "yui-base",
        "node-style",
        "base-base",
        "base-build",
        "widget",
        "gallery-itsamodellistviewextention"
    ],
    "skinnable": true
});
