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
_yuitest_coverage["build/gallery-itsaviewdupmodels/gallery-itsaviewdupmodels.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-itsaviewdupmodels/gallery-itsaviewdupmodels.js",
    code: []
};
_yuitest_coverage["build/gallery-itsaviewdupmodels/gallery-itsaviewdupmodels.js"].code=["YUI.add('gallery-itsaviewdupmodels', function (Y, NAME) {","","'use strict';","","/**"," * ITSAViewDupModels is an Extention to ITSAViewModellist"," *"," * Coorporates with gallery-itsaviewmodellist --> it will load this module when not already loaded"," *"," * Adds the posibility to duplicate items from a ModelList, when these items have an 'endDate' or Interval set."," * See the attribute <b>modelConfig</b> for more info."," *"," *"," * @module gallery-itsaviewdupmodels"," * @extends ITSADupModelViewExtention"," * @constructor"," * @since 0.1"," *"," * <i>Copyright (c) 2013 Marco Asbreuk - http://itsasbreuk.nl</i>"," * YUI BSD License - http://developer.yahoo.com/yui/license.html"," *","*/","","Y.Base.mix(Y.ITSAViewModellist, [Y.ITSADupModelViewExtention]);","","","}, '@VERSION@', {\"requires\": [\"gallery-itsadupmodelviewextention\", \"gallery-itsaviewmodellist\"]});"];
_yuitest_coverage["build/gallery-itsaviewdupmodels/gallery-itsaviewdupmodels.js"].lines = {"1":0,"3":0,"24":0};
_yuitest_coverage["build/gallery-itsaviewdupmodels/gallery-itsaviewdupmodels.js"].functions = {"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-itsaviewdupmodels/gallery-itsaviewdupmodels.js"].coveredLines = 3;
_yuitest_coverage["build/gallery-itsaviewdupmodels/gallery-itsaviewdupmodels.js"].coveredFunctions = 1;
_yuitest_coverline("build/gallery-itsaviewdupmodels/gallery-itsaviewdupmodels.js", 1);
YUI.add('gallery-itsaviewdupmodels', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-itsaviewdupmodels/gallery-itsaviewdupmodels.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-itsaviewdupmodels/gallery-itsaviewdupmodels.js", 3);
'use strict';

/**
 * ITSAViewDupModels is an Extention to ITSAViewModellist
 *
 * Coorporates with gallery-itsaviewmodellist --> it will load this module when not already loaded
 *
 * Adds the posibility to duplicate items from a ModelList, when these items have an 'endDate' or Interval set.
 * See the attribute <b>modelConfig</b> for more info.
 *
 *
 * @module gallery-itsaviewdupmodels
 * @extends ITSADupModelViewExtention
 * @constructor
 * @since 0.1
 *
 * <i>Copyright (c) 2013 Marco Asbreuk - http://itsasbreuk.nl</i>
 * YUI BSD License - http://developer.yahoo.com/yui/license.html
 *
*/

_yuitest_coverline("build/gallery-itsaviewdupmodels/gallery-itsaviewdupmodels.js", 24);
Y.Base.mix(Y.ITSAViewModellist, [Y.ITSADupModelViewExtention]);


}, '@VERSION@', {"requires": ["gallery-itsadupmodelviewextention", "gallery-itsaviewmodellist"]});
