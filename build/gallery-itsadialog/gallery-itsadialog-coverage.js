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
_yuitest_coverage["build/gallery-itsadialog/gallery-itsadialog.js"].code=["YUI.add('gallery-itsadialog', function (Y, NAME) {","","'use strict';","","/**"," * The Itsa Selectlist module."," *"," * @module gallery-itsaselectlist"," */","","","/**"," *"," * @class ITSASelectlist"," * @extends Widget"," * @constructor"," *"," * <i>Copyright (c) 2012 Marco Asbreuk - http://theinternetwizard.net</i>"," * YUI BSD License - http://developer.yahoo.com/yui/license.html"," *","*/","","var LOADDELAY = 5000, // lazy load 'gallery-itsadialogbox' after 5 seconds","      ITSADialogInstance;","","function ITSADialog() {}","","if (!Y.Global.ITSADialog) {","    Y.mix(ITSADialog.prototype, {","        itsadialogboxLoaded : function() {","            var instance = this;","            if (!instance.moduleLoaded) {","                instance.moduleLoaded = new Y.Promise(function (resolve) {","                    Y.use('gallery-itsadialogbox', function() {","                        resolve();","                    });","                });","            }","            return instance.moduleLoaded;","        },","        alert : function(title, message) {","            var instance = this;","            return instance.itsadialogboxLoaded().then(","                function() {","                    return new Y.Promise(function (resolve) {","                        // Caution: Y.Global.ItsaDialog is NOT the same as Y.Global.ITSADialog:","                        // Y.Global.ItsaDialog is the dialog-widget that comes from gallery-itsadialogbox and uses callback-funcs.","                        Y.Global.ItsaDialog.showMessage(","                            title,","                            message,","                            function() {","                                resolve();","                            }","                        );","                    });","                }","            );","        },","        prompt : function(title, message, defaultmessage) {","            var instance = this;","            return instance.itsadialogboxLoaded().then(","                function() {","                    return new Y.Promise(function (resolve, reject) {","                        // Caution: Y.Global.ItsaDialog is NOT the same as Y.Global.ITSADialog:","                        // Y.Global.ItsaDialog is the dialog-widget that comes from gallery-itsadialogbox and uses callback-funcs.","                        Y.Global.ItsaDialog.getInput(","                            title,","                            message,","                            defaultmessage,","                            function(e) {","                                // callback function","                                var value = e.value,","                                      promiseReject = (e.buttonName === 'cancel');","                                if (promiseReject) {","                                    reject(new Error('input cancelled'));","                                }","                                else {","                                    resolve(value);","                                }","                            }","                        );","                    });","                }","            );","        },","        confirm : function(title, question) {","            var instance = this;","            return instance.itsadialogboxLoaded().then(","                function() {","                    return new Y.Promise(function (resolve, reject) {","                        // Caution: Y.Global.ItsaDialog is NOT the same as Y.Global.ITSADialog:","                        // Y.Global.ItsaDialog is the dialog-widget that comes from gallery-itsadialogbox and uses callback-funcs.","                        Y.Global.ItsaDialog.getConfirmation(","                            title,","                            question,","                            function(e) {","                                // callback function","                                var promiseReject = (e.buttonName === 'no');","                                if (promiseReject) {","                                    reject(new Error('not confirmed'));","                                }","                                else {","                                    resolve();","                                }","                            }","                        );","                    });","                }","            );","        }","    });","","    ITSADialogInstance = Y.Global.ITSADialog = new ITSADialog();","    // now lazyload 'gallery-itsadialogbox'","    Y.later(","        LOADDELAY,","        ITSADialogInstance,","        ITSADialogInstance.itsadialogboxLoaded","    );","}","","if (!Y.alert) {","    Y.alert = Y.bind(ITSADialogInstance.alert, ITSADialogInstance);","}","","if (!Y.prompt) {","    Y.prompt = Y.bind(ITSADialogInstance.prompt, ITSADialogInstance);","}","","if (!Y.confirm) {","    Y.confirm = Y.bind(ITSADialogInstance.confirm, ITSADialogInstance);","}","","","","}, '@VERSION@', {\"requires\": [\"yui-base\", \"promise\", \"gallery-itsadialogbox\"]});"];
_yuitest_coverage["build/gallery-itsadialog/gallery-itsadialog.js"].lines = {"1":0,"3":0,"23":0,"26":0,"28":0,"29":0,"31":0,"32":0,"33":0,"34":0,"35":0,"39":0,"42":0,"43":0,"45":0,"48":0,"52":0,"60":0,"61":0,"63":0,"66":0,"72":0,"74":0,"75":0,"78":0,"87":0,"88":0,"90":0,"93":0,"98":0,"99":0,"100":0,"103":0,"113":0,"115":0,"122":0,"123":0,"126":0,"127":0,"130":0,"131":0};
_yuitest_coverage["build/gallery-itsadialog/gallery-itsadialog.js"].functions = {"ITSADialog:26":0,"(anonymous 3):34":0,"(anonymous 2):33":0,"itsadialogboxLoaded:30":0,"(anonymous 6):51":0,"(anonymous 5):45":0,"(anonymous 4):44":0,"alert:41":0,"(anonymous 9):70":0,"(anonymous 8):63":0,"(anonymous 7):62":0,"prompt:59":0,"(anonymous 12):96":0,"(anonymous 11):90":0,"(anonymous 10):89":0,"confirm:86":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-itsadialog/gallery-itsadialog.js"].coveredLines = 41;
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
var LOADDELAY = 5000, // lazy load 'gallery-itsadialogbox' after 5 seconds
      ITSADialogInstance;

_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 26);
function ITSADialog() {}

_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 28);
if (!Y.Global.ITSADialog) {
    _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 29);
Y.mix(ITSADialog.prototype, {
        itsadialogboxLoaded : function() {
            _yuitest_coverfunc("build/gallery-itsadialog/gallery-itsadialog.js", "itsadialogboxLoaded", 30);
_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 31);
var instance = this;
            _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 32);
if (!instance.moduleLoaded) {
                _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 33);
instance.moduleLoaded = new Y.Promise(function (resolve) {
                    _yuitest_coverfunc("build/gallery-itsadialog/gallery-itsadialog.js", "(anonymous 2)", 33);
_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 34);
Y.use('gallery-itsadialogbox', function() {
                        _yuitest_coverfunc("build/gallery-itsadialog/gallery-itsadialog.js", "(anonymous 3)", 34);
_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 35);
resolve();
                    });
                });
            }
            _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 39);
return instance.moduleLoaded;
        },
        alert : function(title, message) {
            _yuitest_coverfunc("build/gallery-itsadialog/gallery-itsadialog.js", "alert", 41);
_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 42);
var instance = this;
            _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 43);
return instance.itsadialogboxLoaded().then(
                function() {
                    _yuitest_coverfunc("build/gallery-itsadialog/gallery-itsadialog.js", "(anonymous 4)", 44);
_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 45);
return new Y.Promise(function (resolve) {
                        // Caution: Y.Global.ItsaDialog is NOT the same as Y.Global.ITSADialog:
                        // Y.Global.ItsaDialog is the dialog-widget that comes from gallery-itsadialogbox and uses callback-funcs.
                        _yuitest_coverfunc("build/gallery-itsadialog/gallery-itsadialog.js", "(anonymous 5)", 45);
_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 48);
Y.Global.ItsaDialog.showMessage(
                            title,
                            message,
                            function() {
                                _yuitest_coverfunc("build/gallery-itsadialog/gallery-itsadialog.js", "(anonymous 6)", 51);
_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 52);
resolve();
                            }
                        );
                    });
                }
            );
        },
        prompt : function(title, message, defaultmessage) {
            _yuitest_coverfunc("build/gallery-itsadialog/gallery-itsadialog.js", "prompt", 59);
_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 60);
var instance = this;
            _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 61);
return instance.itsadialogboxLoaded().then(
                function() {
                    _yuitest_coverfunc("build/gallery-itsadialog/gallery-itsadialog.js", "(anonymous 7)", 62);
_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 63);
return new Y.Promise(function (resolve, reject) {
                        // Caution: Y.Global.ItsaDialog is NOT the same as Y.Global.ITSADialog:
                        // Y.Global.ItsaDialog is the dialog-widget that comes from gallery-itsadialogbox and uses callback-funcs.
                        _yuitest_coverfunc("build/gallery-itsadialog/gallery-itsadialog.js", "(anonymous 8)", 63);
_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 66);
Y.Global.ItsaDialog.getInput(
                            title,
                            message,
                            defaultmessage,
                            function(e) {
                                // callback function
                                _yuitest_coverfunc("build/gallery-itsadialog/gallery-itsadialog.js", "(anonymous 9)", 70);
_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 72);
var value = e.value,
                                      promiseReject = (e.buttonName === 'cancel');
                                _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 74);
if (promiseReject) {
                                    _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 75);
reject(new Error('input cancelled'));
                                }
                                else {
                                    _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 78);
resolve(value);
                                }
                            }
                        );
                    });
                }
            );
        },
        confirm : function(title, question) {
            _yuitest_coverfunc("build/gallery-itsadialog/gallery-itsadialog.js", "confirm", 86);
_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 87);
var instance = this;
            _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 88);
return instance.itsadialogboxLoaded().then(
                function() {
                    _yuitest_coverfunc("build/gallery-itsadialog/gallery-itsadialog.js", "(anonymous 10)", 89);
_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 90);
return new Y.Promise(function (resolve, reject) {
                        // Caution: Y.Global.ItsaDialog is NOT the same as Y.Global.ITSADialog:
                        // Y.Global.ItsaDialog is the dialog-widget that comes from gallery-itsadialogbox and uses callback-funcs.
                        _yuitest_coverfunc("build/gallery-itsadialog/gallery-itsadialog.js", "(anonymous 11)", 90);
_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 93);
Y.Global.ItsaDialog.getConfirmation(
                            title,
                            question,
                            function(e) {
                                // callback function
                                _yuitest_coverfunc("build/gallery-itsadialog/gallery-itsadialog.js", "(anonymous 12)", 96);
_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 98);
var promiseReject = (e.buttonName === 'no');
                                _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 99);
if (promiseReject) {
                                    _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 100);
reject(new Error('not confirmed'));
                                }
                                else {
                                    _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 103);
resolve();
                                }
                            }
                        );
                    });
                }
            );
        }
    });

    _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 113);
ITSADialogInstance = Y.Global.ITSADialog = new ITSADialog();
    // now lazyload 'gallery-itsadialogbox'
    _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 115);
Y.later(
        LOADDELAY,
        ITSADialogInstance,
        ITSADialogInstance.itsadialogboxLoaded
    );
}

_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 122);
if (!Y.alert) {
    _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 123);
Y.alert = Y.bind(ITSADialogInstance.alert, ITSADialogInstance);
}

_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 126);
if (!Y.prompt) {
    _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 127);
Y.prompt = Y.bind(ITSADialogInstance.prompt, ITSADialogInstance);
}

_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 130);
if (!Y.confirm) {
    _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 131);
Y.confirm = Y.bind(ITSADialogInstance.confirm, ITSADialogInstance);
}



}, '@VERSION@', {"requires": ["yui-base", "promise", "gallery-itsadialogbox"]});
