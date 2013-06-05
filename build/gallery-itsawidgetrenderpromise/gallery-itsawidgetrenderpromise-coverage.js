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
_yuitest_coverage["build/gallery-itsawidgetrenderpromise/gallery-itsawidgetrenderpromise.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-itsawidgetrenderpromise/gallery-itsawidgetrenderpromise.js",
    code: []
};
_yuitest_coverage["build/gallery-itsawidgetrenderpromise/gallery-itsawidgetrenderpromise.js"].code=["YUI.add('gallery-itsawidgetrenderpromise', function (Y, NAME) {","","'use strict';","/**"," * ITSAWidgetRenderPromise"," *"," *"," * This module adds Widget.renderPromise() to the Y.Widget class."," * By using this Promise, you don't need to listen for the 'render'-event, neither look for the value of the attribute 'rendered'."," *"," *"," * @module gallery-itsawidgetrenderpromise"," * @class Y.Widget"," * @since 0.1"," *"," * <i>Copyright (c) 2013 Marco Asbreuk - http://theinternetwizard.net</i>"," * Special thanks to Jeff Pinach - http://http://fromanegg.com :)"," * YUI BSD License - http://developer.yahoo.com/yui/license.html"," *","*/","","var DEFAULTTIMEOUT = 20000;","","/**"," * Promise that will be resolved once the widget is rendered."," * By using this Promise, you don't need to listen for the 'render'-event, neither look for the value of the attribute 'rendered'."," *"," * @method renderPromise"," * @param [timeout] {int} Timeout in ms, after which the promise will be rejected. Set to 0 to de-activate.<br />"," *                                      If omitted, a timeout of 20 seconds (20000ms) wil be used.<br />"," *                                      The timeout-value can only be set at the first time the Promise is called."," * @return {Y.Promise} promised response --> resolve(e) OR reject(reason)."," * @since 0.1","*/","Y.Widget.prototype.renderPromise = function(timeout) {","    var instance = this;","    if (!instance._renderPromise) {","        instance._renderPromise = new Y.Promise(function (resolve, reject) {","            instance.after(","                'render',","                function(e) {","                    resolve(e);","                }","            );","            if (instance.get('rendered')) {","                resolve();","            }","            if (timeout !== 0) {","                Y.later(","                    timeout || DEFAULTTIMEOUT,","                    null,","                    function() {","                        var errormessage = 'renderPromise is rejected by timeout of '+(timeout || DEFAULTTIMEOUT)+ ' ms';","                        reject(new Error(errormessage));","                    }","                );","            }","        });","    }","    return instance._renderPromise;","};","","}, '@VERSION@', {\"requires\": [\"yui-base\", \"widget\", \"promise\"]});"];
_yuitest_coverage["build/gallery-itsawidgetrenderpromise/gallery-itsawidgetrenderpromise.js"].lines = {"1":0,"3":0,"22":0,"35":0,"36":0,"37":0,"38":0,"39":0,"42":0,"45":0,"46":0,"48":0,"49":0,"53":0,"54":0,"60":0};
_yuitest_coverage["build/gallery-itsawidgetrenderpromise/gallery-itsawidgetrenderpromise.js"].functions = {"(anonymous 3):41":0,"(anonymous 4):52":0,"(anonymous 2):38":0,"renderPromise:35":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-itsawidgetrenderpromise/gallery-itsawidgetrenderpromise.js"].coveredLines = 16;
_yuitest_coverage["build/gallery-itsawidgetrenderpromise/gallery-itsawidgetrenderpromise.js"].coveredFunctions = 5;
_yuitest_coverline("build/gallery-itsawidgetrenderpromise/gallery-itsawidgetrenderpromise.js", 1);
YUI.add('gallery-itsawidgetrenderpromise', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-itsawidgetrenderpromise/gallery-itsawidgetrenderpromise.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-itsawidgetrenderpromise/gallery-itsawidgetrenderpromise.js", 3);
'use strict';
/**
 * ITSAWidgetRenderPromise
 *
 *
 * This module adds Widget.renderPromise() to the Y.Widget class.
 * By using this Promise, you don't need to listen for the 'render'-event, neither look for the value of the attribute 'rendered'.
 *
 *
 * @module gallery-itsawidgetrenderpromise
 * @class Y.Widget
 * @since 0.1
 *
 * <i>Copyright (c) 2013 Marco Asbreuk - http://theinternetwizard.net</i>
 * Special thanks to Jeff Pinach - http://http://fromanegg.com :)
 * YUI BSD License - http://developer.yahoo.com/yui/license.html
 *
*/

_yuitest_coverline("build/gallery-itsawidgetrenderpromise/gallery-itsawidgetrenderpromise.js", 22);
var DEFAULTTIMEOUT = 20000;

/**
 * Promise that will be resolved once the widget is rendered.
 * By using this Promise, you don't need to listen for the 'render'-event, neither look for the value of the attribute 'rendered'.
 *
 * @method renderPromise
 * @param [timeout] {int} Timeout in ms, after which the promise will be rejected. Set to 0 to de-activate.<br />
 *                                      If omitted, a timeout of 20 seconds (20000ms) wil be used.<br />
 *                                      The timeout-value can only be set at the first time the Promise is called.
 * @return {Y.Promise} promised response --> resolve(e) OR reject(reason).
 * @since 0.1
*/
_yuitest_coverline("build/gallery-itsawidgetrenderpromise/gallery-itsawidgetrenderpromise.js", 35);
Y.Widget.prototype.renderPromise = function(timeout) {
    _yuitest_coverfunc("build/gallery-itsawidgetrenderpromise/gallery-itsawidgetrenderpromise.js", "renderPromise", 35);
_yuitest_coverline("build/gallery-itsawidgetrenderpromise/gallery-itsawidgetrenderpromise.js", 36);
var instance = this;
    _yuitest_coverline("build/gallery-itsawidgetrenderpromise/gallery-itsawidgetrenderpromise.js", 37);
if (!instance._renderPromise) {
        _yuitest_coverline("build/gallery-itsawidgetrenderpromise/gallery-itsawidgetrenderpromise.js", 38);
instance._renderPromise = new Y.Promise(function (resolve, reject) {
            _yuitest_coverfunc("build/gallery-itsawidgetrenderpromise/gallery-itsawidgetrenderpromise.js", "(anonymous 2)", 38);
_yuitest_coverline("build/gallery-itsawidgetrenderpromise/gallery-itsawidgetrenderpromise.js", 39);
instance.after(
                'render',
                function(e) {
                    _yuitest_coverfunc("build/gallery-itsawidgetrenderpromise/gallery-itsawidgetrenderpromise.js", "(anonymous 3)", 41);
_yuitest_coverline("build/gallery-itsawidgetrenderpromise/gallery-itsawidgetrenderpromise.js", 42);
resolve(e);
                }
            );
            _yuitest_coverline("build/gallery-itsawidgetrenderpromise/gallery-itsawidgetrenderpromise.js", 45);
if (instance.get('rendered')) {
                _yuitest_coverline("build/gallery-itsawidgetrenderpromise/gallery-itsawidgetrenderpromise.js", 46);
resolve();
            }
            _yuitest_coverline("build/gallery-itsawidgetrenderpromise/gallery-itsawidgetrenderpromise.js", 48);
if (timeout !== 0) {
                _yuitest_coverline("build/gallery-itsawidgetrenderpromise/gallery-itsawidgetrenderpromise.js", 49);
Y.later(
                    timeout || DEFAULTTIMEOUT,
                    null,
                    function() {
                        _yuitest_coverfunc("build/gallery-itsawidgetrenderpromise/gallery-itsawidgetrenderpromise.js", "(anonymous 4)", 52);
_yuitest_coverline("build/gallery-itsawidgetrenderpromise/gallery-itsawidgetrenderpromise.js", 53);
var errormessage = 'renderPromise is rejected by timeout of '+(timeout || DEFAULTTIMEOUT)+ ' ms';
                        _yuitest_coverline("build/gallery-itsawidgetrenderpromise/gallery-itsawidgetrenderpromise.js", 54);
reject(new Error(errormessage));
                    }
                );
            }
        });
    }
    _yuitest_coverline("build/gallery-itsawidgetrenderpromise/gallery-itsawidgetrenderpromise.js", 60);
return instance._renderPromise;
};

}, '@VERSION@', {"requires": ["yui-base", "widget", "promise"]});
