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
_yuitest_coverage["build/gallery-itsawidgetrenderpromise/gallery-itsawidgetrenderpromise.js"].code=["YUI.add('gallery-itsawidgetrenderpromise', function (Y, NAME) {","","'use strict';","/**"," * ITSAWidgetRenderPromise"," *"," *"," * This module adds Widget.renderPromise() to the Y.Widget class."," * By using this Promise, you don't need to listen for the 'render'-event, neither look for the value of the attribute 'rendered'."," *"," *"," * @module gallery-itsawidgetrenderpromise"," * @class Y.Widget"," * @since 0.1"," *"," * <i>Copyright (c) 2013 Marco Asbreuk - http://theinternetwizard.net</i>"," * Special thanks to Jeff Pinach - http://http://fromanegg.com :)"," * YUI BSD License - http://developer.yahoo.com/yui/license.html"," *","*/","","var DEFAULTTIMEOUT = 20000;","","/**"," * Promise that will be resolved once the widget is rendered."," * By using this Promise, you don't need to listen for the 'render'-event, neither look for the value of the attribute 'rendered'."," *"," * @method renderPromise"," * @param [timeout] {int} Timeout in ms, after which the promise will be rejected. Set to 0 to de-activate.<br />"," *                                      If omitted, a timeout of 20 seconds (20000ms) wil be used."," * @return {Y.Promise} promised response --> resolve(e) OR reject(reason)."," * @since 0.1","*/","Y.Widget.prototype.renderPromise = function(timeout) {","    var instance = this;","    return new Y.Promise(function (resolve, reject) {","        instance.after(","            'render',","            function(e) {","                resolve(e);","            }","        );","        if (instance.get('rendered')) {","            resolve();","        }","        if (timeout !== 0) {","            Y.later(","                timeout || DEFAULTTIMEOUT,","                null,","                function() {","                    var errormessage = 'renderPromise is rejected by timeout of '+(timeout || DEFAULTTIMEOUT)+ ' ms';","                    reject(new Error(errormessage));","                }","            );","        }","    });","};","","}, '@VERSION@', {\"requires\": [\"yui-base\", \"widget\", \"promise\"]});"];
_yuitest_coverage["build/gallery-itsawidgetrenderpromise/gallery-itsawidgetrenderpromise.js"].lines = {"1":0,"3":0,"22":0,"34":0,"35":0,"36":0,"37":0,"40":0,"43":0,"44":0,"46":0,"47":0,"51":0,"52":0};
_yuitest_coverage["build/gallery-itsawidgetrenderpromise/gallery-itsawidgetrenderpromise.js"].functions = {"(anonymous 3):39":0,"(anonymous 4):50":0,"(anonymous 2):36":0,"renderPromise:34":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-itsawidgetrenderpromise/gallery-itsawidgetrenderpromise.js"].coveredLines = 14;
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
 *                                      If omitted, a timeout of 20 seconds (20000ms) wil be used.
 * @return {Y.Promise} promised response --> resolve(e) OR reject(reason).
 * @since 0.1
*/
_yuitest_coverline("build/gallery-itsawidgetrenderpromise/gallery-itsawidgetrenderpromise.js", 34);
Y.Widget.prototype.renderPromise = function(timeout) {
    _yuitest_coverfunc("build/gallery-itsawidgetrenderpromise/gallery-itsawidgetrenderpromise.js", "renderPromise", 34);
_yuitest_coverline("build/gallery-itsawidgetrenderpromise/gallery-itsawidgetrenderpromise.js", 35);
var instance = this;
    _yuitest_coverline("build/gallery-itsawidgetrenderpromise/gallery-itsawidgetrenderpromise.js", 36);
return new Y.Promise(function (resolve, reject) {
        _yuitest_coverfunc("build/gallery-itsawidgetrenderpromise/gallery-itsawidgetrenderpromise.js", "(anonymous 2)", 36);
_yuitest_coverline("build/gallery-itsawidgetrenderpromise/gallery-itsawidgetrenderpromise.js", 37);
instance.after(
            'render',
            function(e) {
                _yuitest_coverfunc("build/gallery-itsawidgetrenderpromise/gallery-itsawidgetrenderpromise.js", "(anonymous 3)", 39);
_yuitest_coverline("build/gallery-itsawidgetrenderpromise/gallery-itsawidgetrenderpromise.js", 40);
resolve(e);
            }
        );
        _yuitest_coverline("build/gallery-itsawidgetrenderpromise/gallery-itsawidgetrenderpromise.js", 43);
if (instance.get('rendered')) {
            _yuitest_coverline("build/gallery-itsawidgetrenderpromise/gallery-itsawidgetrenderpromise.js", 44);
resolve();
        }
        _yuitest_coverline("build/gallery-itsawidgetrenderpromise/gallery-itsawidgetrenderpromise.js", 46);
if (timeout !== 0) {
            _yuitest_coverline("build/gallery-itsawidgetrenderpromise/gallery-itsawidgetrenderpromise.js", 47);
Y.later(
                timeout || DEFAULTTIMEOUT,
                null,
                function() {
                    _yuitest_coverfunc("build/gallery-itsawidgetrenderpromise/gallery-itsawidgetrenderpromise.js", "(anonymous 4)", 50);
_yuitest_coverline("build/gallery-itsawidgetrenderpromise/gallery-itsawidgetrenderpromise.js", 51);
var errormessage = 'renderPromise is rejected by timeout of '+(timeout || DEFAULTTIMEOUT)+ ' ms';
                    _yuitest_coverline("build/gallery-itsawidgetrenderpromise/gallery-itsawidgetrenderpromise.js", 52);
reject(new Error(errormessage));
                }
            );
        }
    });
};

}, '@VERSION@', {"requires": ["yui-base", "widget", "promise"]});
