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
_yuitest_coverage["build/gallery-itsamodulesloadedpromise/gallery-itsamodulesloadedpromise.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-itsamodulesloadedpromise/gallery-itsamodulesloadedpromise.js",
    code: []
};
_yuitest_coverage["build/gallery-itsamodulesloadedpromise/gallery-itsamodulesloadedpromise.js"].code=["YUI.add('gallery-itsamodulesloadedpromise', function (Y, NAME) {","","'use strict';","","/**"," * Declaration of Y.usePromise()"," *"," * Equivalent of Y.use(), except that no callback is used, but a Promise"," * example: Y.usePromise('panel').then(...);"," *"," * Caution: this is not a replacement of YUI.use(), which creates a new YUI-sandbox."," * It is meant as an replacement of Y.use() which is sometimes called within a YUI-instance."," *"," * @module gallery-itsamodulesloadedpromise"," * @class Y"," * @since 0.1"," *"," * <i>Copyright (c) 2012 Marco Asbreuk - http://theinternetwizard.net</i>"," * YUI BSD License - http://developer.yahoo.com/yui/license.html"," *","*/","","var TIMEOUT = 20000; // 20 seconds before loading modules is timed out.","","/**"," * Loads modules through Y.use(). Instead of using callbacks, a Promise is returned.<br />"," * If the modules are not loaded within 20 seconds, the Promise will be rejected."," *"," * @method Y.usePromise"," * @param {String|Array} modules* One or more module names to attach."," * @since 0.1","*/","Y.usePromise = function() {","    // store 'arguments' inside 'args' --> because new Promise() has other arguments","    var args = arguments;","    return new Y.Promise(function (resolve, reject) {","        [].push.apply(","            args,","            [","                function() {","                    resolve();","                }","            ]","        );","        Y.use.apply(Y, args);","        Y.later(","            TIMEOUT,","            null,","            reject","        );","    });","};","","}, '@VERSION@', {\"requires\": [\"yui-base\", \"promise\", \"yui-later\"]});"];
_yuitest_coverage["build/gallery-itsamodulesloadedpromise/gallery-itsamodulesloadedpromise.js"].lines = {"1":0,"3":0,"23":0,"33":0,"35":0,"36":0,"37":0,"41":0,"45":0,"46":0};
_yuitest_coverage["build/gallery-itsamodulesloadedpromise/gallery-itsamodulesloadedpromise.js"].functions = {"(anonymous 3):40":0,"(anonymous 2):36":0,"usePromise:33":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-itsamodulesloadedpromise/gallery-itsamodulesloadedpromise.js"].coveredLines = 10;
_yuitest_coverage["build/gallery-itsamodulesloadedpromise/gallery-itsamodulesloadedpromise.js"].coveredFunctions = 4;
_yuitest_coverline("build/gallery-itsamodulesloadedpromise/gallery-itsamodulesloadedpromise.js", 1);
YUI.add('gallery-itsamodulesloadedpromise', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-itsamodulesloadedpromise/gallery-itsamodulesloadedpromise.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-itsamodulesloadedpromise/gallery-itsamodulesloadedpromise.js", 3);
'use strict';

/**
 * Declaration of Y.usePromise()
 *
 * Equivalent of Y.use(), except that no callback is used, but a Promise
 * example: Y.usePromise('panel').then(...);
 *
 * Caution: this is not a replacement of YUI.use(), which creates a new YUI-sandbox.
 * It is meant as an replacement of Y.use() which is sometimes called within a YUI-instance.
 *
 * @module gallery-itsamodulesloadedpromise
 * @class Y
 * @since 0.1
 *
 * <i>Copyright (c) 2012 Marco Asbreuk - http://theinternetwizard.net</i>
 * YUI BSD License - http://developer.yahoo.com/yui/license.html
 *
*/

_yuitest_coverline("build/gallery-itsamodulesloadedpromise/gallery-itsamodulesloadedpromise.js", 23);
var TIMEOUT = 20000; // 20 seconds before loading modules is timed out.

/**
 * Loads modules through Y.use(). Instead of using callbacks, a Promise is returned.<br />
 * If the modules are not loaded within 20 seconds, the Promise will be rejected.
 *
 * @method Y.usePromise
 * @param {String|Array} modules* One or more module names to attach.
 * @since 0.1
*/
_yuitest_coverline("build/gallery-itsamodulesloadedpromise/gallery-itsamodulesloadedpromise.js", 33);
Y.usePromise = function() {
    // store 'arguments' inside 'args' --> because new Promise() has other arguments
    _yuitest_coverfunc("build/gallery-itsamodulesloadedpromise/gallery-itsamodulesloadedpromise.js", "usePromise", 33);
_yuitest_coverline("build/gallery-itsamodulesloadedpromise/gallery-itsamodulesloadedpromise.js", 35);
var args = arguments;
    _yuitest_coverline("build/gallery-itsamodulesloadedpromise/gallery-itsamodulesloadedpromise.js", 36);
return new Y.Promise(function (resolve, reject) {
        _yuitest_coverfunc("build/gallery-itsamodulesloadedpromise/gallery-itsamodulesloadedpromise.js", "(anonymous 2)", 36);
_yuitest_coverline("build/gallery-itsamodulesloadedpromise/gallery-itsamodulesloadedpromise.js", 37);
[].push.apply(
            args,
            [
                function() {
                    _yuitest_coverfunc("build/gallery-itsamodulesloadedpromise/gallery-itsamodulesloadedpromise.js", "(anonymous 3)", 40);
_yuitest_coverline("build/gallery-itsamodulesloadedpromise/gallery-itsamodulesloadedpromise.js", 41);
resolve();
                }
            ]
        );
        _yuitest_coverline("build/gallery-itsamodulesloadedpromise/gallery-itsamodulesloadedpromise.js", 45);
Y.use.apply(Y, args);
        _yuitest_coverline("build/gallery-itsamodulesloadedpromise/gallery-itsamodulesloadedpromise.js", 46);
Y.later(
            TIMEOUT,
            null,
            reject
        );
    });
};

}, '@VERSION@', {"requires": ["yui-base", "promise", "yui-later"]});
