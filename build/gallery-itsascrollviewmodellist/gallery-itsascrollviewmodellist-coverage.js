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
_yuitest_coverage["build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js"].code=["YUI.add('gallery-itsascrollviewmodellist', function (Y, NAME) {","","'use strict';","","/**"," * ScrollView ModelList Extention"," *"," *"," * Adds an Y.ModelList to a ScrollView instance, where the Models are rendered inside an unsorted-list"," * lies within the scrollview's-contentBox. This results in an ul-list with Models."," *"," * Caution: you MUST set the axis-atribute before rendering! Because the content is empty at start, scrollview"," * would otherwise fail autofind the value of axis."," *"," * @module gallery-itsascrollviewmodellist"," * @class ITSAScrollViewModelList"," * @constructor"," * @since 0.1"," *"," * <i>Copyright (c) 2013 Marco Asbreuk - http://itsasbreuk.nl</i>"," * YUI BSD License - http://developer.yahoo.com/yui/license.html"," *","*/","","Y.Base.mix(Y.ScrollView, [Y.ITSAModellistViewExtention]);","","}, '@VERSION@', {\"requires\": [\"gallery-itsamodellistviewextention\"], \"skinnable\": true});"];
_yuitest_coverage["build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js"].lines = {"1":0,"3":0,"25":0};
_yuitest_coverage["build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js"].functions = {"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js"].coveredLines = 3;
_yuitest_coverage["build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js"].coveredFunctions = 1;
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 1);
YUI.add('gallery-itsascrollviewmodellist', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 3);
'use strict';

/**
 * ScrollView ModelList Extention
 *
 *
 * Adds an Y.ModelList to a ScrollView instance, where the Models are rendered inside an unsorted-list
 * lies within the scrollview's-contentBox. This results in an ul-list with Models.
 *
 * Caution: you MUST set the axis-atribute before rendering! Because the content is empty at start, scrollview
 * would otherwise fail autofind the value of axis.
 *
 * @module gallery-itsascrollviewmodellist
 * @class ITSAScrollViewModelList
 * @constructor
 * @since 0.1
 *
 * <i>Copyright (c) 2013 Marco Asbreuk - http://itsasbreuk.nl</i>
 * YUI BSD License - http://developer.yahoo.com/yui/license.html
 *
*/

_yuitest_coverline("build/gallery-itsascrollviewmodellist/gallery-itsascrollviewmodellist.js", 25);
Y.Base.mix(Y.ScrollView, [Y.ITSAModellistViewExtention]);

}, '@VERSION@', {"requires": ["gallery-itsamodellistviewextention"], "skinnable": true});
