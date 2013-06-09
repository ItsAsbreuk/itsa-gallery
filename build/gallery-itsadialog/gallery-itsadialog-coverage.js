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
_yuitest_coverage["build/gallery-itsadialog/gallery-itsadialog.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-itsadialog/gallery-itsadialog.js",
    code: []
};
_yuitest_coverage["build/gallery-itsadialog/gallery-itsadialog.js"].code=["YUI.add('gallery-itsadialog', function (Y, NAME) {","","'use strict';","","/**"," * The Itsa Selectlist module."," *"," * @module gallery-itsaselectlist"," */","","","/**"," *"," * @class ITSASelectlist"," * @extends Widget"," * @constructor"," *"," * <i>Copyright (c) 2012 Marco Asbreuk - http://theinternetwizard.net</i>"," * YUI BSD License - http://developer.yahoo.com/yui/license.html"," *","*/","","var LOADDELAY = 5000; // lazy load 'gallery-itsadialogbox' after 5 seconds","","function ITSADialog() {}","","if (!Y.Global.ITSADialog) {","alert('init');","    Y.mix(ITSADialog.prototype, {","        check: 10,","        itsadialogboxLoaded : function() {","            var instance = this;","            if (!instance.moduleLoaded) {","                instance.moduleLoaded = new Y.Promise(function (resolve) {","                    Y.use('gallery-itsadialogbox', function() {","                        resolve();","                    });","                });","            }","            return instance.moduleLoaded;","        },","        alert : function(title, message) {","            var instance = this;","            return instance.itsadialogboxLoaded().then(","                function() {","                    return new Y.Promise(function (resolve) {","                        // Caution: Y.Global.ItsaDialog is NOT the same as Y.Global.ITSADialog:","                        // Y.Global.ItsaDialog is the dialog-widget that comes from gallery-itsadialogbox and uses callback-funcs.","                        Y.Global.ItsaDialog.showMessage(","                            title,","                            message,","                            function() {","                                resolve();","                            }","                        );","                    });","                }","            );","        },","        prompt : function(title, message, defaultmessage) {","            var instance = this;","            return instance.itsadialogboxLoaded().then(","                function() {","                    return new Y.Promise(function (resolve, reject) {","                        // Caution: Y.Global.ItsaDialog is NOT the same as Y.Global.ITSADialog:","                        // Y.Global.ItsaDialog is the dialog-widget that comes from gallery-itsadialogbox and uses callback-funcs.","                        Y.Global.ITSADialog.getInput(","                            title,","                            message,","                            defaultmessage,","                            function(e) {","                                // callback function","                                var value = e.value,","                                      promiseReject = (e.buttonName === 'cancel');","                                if (promiseReject) {","                                    reject(new Error('input cancelled'));","                                }","                                else {","                                    resolve(value);","                                }","                            }","                        );","                    });","                }","            );","        },","        confirm : function(title, question) {","            var instance = this;","            return instance.itsadialogboxLoaded().then(","                function() {","                    return new Y.Promise(function (resolve, reject) {","                        // Caution: Y.Global.ItsaDialog is NOT the same as Y.Global.ITSADialog:","                        // Y.Global.ItsaDialog is the dialog-widget that comes from gallery-itsadialogbox and uses callback-funcs.","                        Y.Global.ITSADialog.getConfirmation(","                            title,","                            question,","                            function(e) {","                                // callback function","                                var promiseReject = (e.buttonName === 'no');","                                if (promiseReject) {","                                    reject(new Error('not confirmed'));","                                }","                                else {","                                    resolve();","                                }","                            }","                        );","                    });","                }","            );","        }","    });","","    Y.Global.ITSADialog = ITSADialog;","    // now lazyload 'gallery-itsadialogbox'","    Y.later(","        LOADDELAY,","        null,","        Y.Global.ITSADialog.itsadialogboxLoaded","    );","}","","if (!Y.alert) {","    Y.alert = Y.Global.ITSADialog.alert;","}","","if (!Y.prompt) {","    Y.prompt = Y.Global.ITSADialog.prompt;","}","","if (!Y.confirm) {","    Y.confirm = Y.Global.ITSADialog.confirm;","}","","","","}, '@VERSION@', {\"requires\": [\"yui-base\", \"promise\", \"gallery-itsadialogbox\"]});"];
_yuitest_coverage["build/gallery-itsadialog/gallery-itsadialog.js"].lines = {"1":0,"3":0,"23":0,"25":0,"27":0,"28":0,"29":0,"32":0,"33":0,"34":0,"35":0,"36":0,"40":0,"43":0,"44":0,"46":0,"49":0,"53":0,"61":0,"62":0,"64":0,"67":0,"73":0,"75":0,"76":0,"79":0,"88":0,"89":0,"91":0,"94":0,"99":0,"100":0,"101":0,"104":0,"114":0,"116":0,"123":0,"124":0,"127":0,"128":0,"131":0,"132":0};
_yuitest_coverage["build/gallery-itsadialog/gallery-itsadialog.js"].functions = {"ITSADialog:25":0,"(anonymous 3):35":0,"(anonymous 2):34":0,"itsadialogboxLoaded:31":0,"(anonymous 6):52":0,"(anonymous 5):46":0,"(anonymous 4):45":0,"alert:42":0,"(anonymous 9):71":0,"(anonymous 8):64":0,"(anonymous 7):63":0,"prompt:60":0,"(anonymous 12):97":0,"(anonymous 11):91":0,"(anonymous 10):90":0,"confirm:87":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-itsadialog/gallery-itsadialog.js"].coveredLines = 42;
_yuitest_coverage["build/gallery-itsadialog/gallery-itsadialog.js"].coveredFunctions = 17;
_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 1);
YUI.add('gallery-itsadialog', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-itsadialog/gallery-itsadialog.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 3);
'use strict';

/**
 * The Itsa Selectlist module.
 *
 * @module gallery-itsaselectlist
 */


/**
 *
 * @class ITSASelectlist
 * @extends Widget
 * @constructor
 *
 * <i>Copyright (c) 2012 Marco Asbreuk - http://theinternetwizard.net</i>
 * YUI BSD License - http://developer.yahoo.com/yui/license.html
 *
*/

_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 23);
var LOADDELAY = 5000; // lazy load 'gallery-itsadialogbox' after 5 seconds

_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 25);
function ITSADialog() {}

_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 27);
if (!Y.Global.ITSADialog) {
_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 28);
alert('init');
    _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 29);
Y.mix(ITSADialog.prototype, {
        check: 10,
        itsadialogboxLoaded : function() {
            _yuitest_coverfunc("build/gallery-itsadialog/gallery-itsadialog.js", "itsadialogboxLoaded", 31);
_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 32);
var instance = this;
            _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 33);
if (!instance.moduleLoaded) {
                _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 34);
instance.moduleLoaded = new Y.Promise(function (resolve) {
                    _yuitest_coverfunc("build/gallery-itsadialog/gallery-itsadialog.js", "(anonymous 2)", 34);
_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 35);
Y.use('gallery-itsadialogbox', function() {
                        _yuitest_coverfunc("build/gallery-itsadialog/gallery-itsadialog.js", "(anonymous 3)", 35);
_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 36);
resolve();
                    });
                });
            }
            _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 40);
return instance.moduleLoaded;
        },
        alert : function(title, message) {
            _yuitest_coverfunc("build/gallery-itsadialog/gallery-itsadialog.js", "alert", 42);
_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 43);
var instance = this;
            _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 44);
return instance.itsadialogboxLoaded().then(
                function() {
                    _yuitest_coverfunc("build/gallery-itsadialog/gallery-itsadialog.js", "(anonymous 4)", 45);
_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 46);
return new Y.Promise(function (resolve) {
                        // Caution: Y.Global.ItsaDialog is NOT the same as Y.Global.ITSADialog:
                        // Y.Global.ItsaDialog is the dialog-widget that comes from gallery-itsadialogbox and uses callback-funcs.
                        _yuitest_coverfunc("build/gallery-itsadialog/gallery-itsadialog.js", "(anonymous 5)", 46);
_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 49);
Y.Global.ItsaDialog.showMessage(
                            title,
                            message,
                            function() {
                                _yuitest_coverfunc("build/gallery-itsadialog/gallery-itsadialog.js", "(anonymous 6)", 52);
_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 53);
resolve();
                            }
                        );
                    });
                }
            );
        },
        prompt : function(title, message, defaultmessage) {
            _yuitest_coverfunc("build/gallery-itsadialog/gallery-itsadialog.js", "prompt", 60);
_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 61);
var instance = this;
            _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 62);
return instance.itsadialogboxLoaded().then(
                function() {
                    _yuitest_coverfunc("build/gallery-itsadialog/gallery-itsadialog.js", "(anonymous 7)", 63);
_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 64);
return new Y.Promise(function (resolve, reject) {
                        // Caution: Y.Global.ItsaDialog is NOT the same as Y.Global.ITSADialog:
                        // Y.Global.ItsaDialog is the dialog-widget that comes from gallery-itsadialogbox and uses callback-funcs.
                        _yuitest_coverfunc("build/gallery-itsadialog/gallery-itsadialog.js", "(anonymous 8)", 64);
_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 67);
Y.Global.ITSADialog.getInput(
                            title,
                            message,
                            defaultmessage,
                            function(e) {
                                // callback function
                                _yuitest_coverfunc("build/gallery-itsadialog/gallery-itsadialog.js", "(anonymous 9)", 71);
_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 73);
var value = e.value,
                                      promiseReject = (e.buttonName === 'cancel');
                                _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 75);
if (promiseReject) {
                                    _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 76);
reject(new Error('input cancelled'));
                                }
                                else {
                                    _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 79);
resolve(value);
                                }
                            }
                        );
                    });
                }
            );
        },
        confirm : function(title, question) {
            _yuitest_coverfunc("build/gallery-itsadialog/gallery-itsadialog.js", "confirm", 87);
_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 88);
var instance = this;
            _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 89);
return instance.itsadialogboxLoaded().then(
                function() {
                    _yuitest_coverfunc("build/gallery-itsadialog/gallery-itsadialog.js", "(anonymous 10)", 90);
_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 91);
return new Y.Promise(function (resolve, reject) {
                        // Caution: Y.Global.ItsaDialog is NOT the same as Y.Global.ITSADialog:
                        // Y.Global.ItsaDialog is the dialog-widget that comes from gallery-itsadialogbox and uses callback-funcs.
                        _yuitest_coverfunc("build/gallery-itsadialog/gallery-itsadialog.js", "(anonymous 11)", 91);
_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 94);
Y.Global.ITSADialog.getConfirmation(
                            title,
                            question,
                            function(e) {
                                // callback function
                                _yuitest_coverfunc("build/gallery-itsadialog/gallery-itsadialog.js", "(anonymous 12)", 97);
_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 99);
var promiseReject = (e.buttonName === 'no');
                                _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 100);
if (promiseReject) {
                                    _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 101);
reject(new Error('not confirmed'));
                                }
                                else {
                                    _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 104);
resolve();
                                }
                            }
                        );
                    });
                }
            );
        }
    });

    _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 114);
Y.Global.ITSADialog = ITSADialog;
    // now lazyload 'gallery-itsadialogbox'
    _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 116);
Y.later(
        LOADDELAY,
        null,
        Y.Global.ITSADialog.itsadialogboxLoaded
    );
}

_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 123);
if (!Y.alert) {
    _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 124);
Y.alert = Y.Global.ITSADialog.alert;
}

_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 127);
if (!Y.prompt) {
    _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 128);
Y.prompt = Y.Global.ITSADialog.prompt;
}

_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 131);
if (!Y.confirm) {
    _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 132);
Y.confirm = Y.Global.ITSADialog.confirm;
}



}, '@VERSION@', {"requires": ["yui-base", "promise", "gallery-itsadialogbox"]});
