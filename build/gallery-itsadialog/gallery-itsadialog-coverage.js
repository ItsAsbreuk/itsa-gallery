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
_yuitest_coverage["build/gallery-itsadialog/gallery-itsadialog.js"].code=["YUI.add('gallery-itsadialog', function (Y, NAME) {","","'use strict';","","/**"," * The Itsa Selectlist module."," *"," * @module gallery-itsaselectlist"," */","","","/**"," *"," * @class ITSASelectlist"," * @extends Widget"," * @constructor"," *"," * <i>Copyright (c) 2012 Marco Asbreuk - http://theinternetwizard.net</i>"," * YUI BSD License - http://developer.yahoo.com/yui/license.html"," *","*/","","var LOADDELAY = 5000, // lazy load 'gallery-itsadialogbox' after 5 seconds","      ACTION_HIDE = '_actionHide',","      ABORT = 'abort',","      IGNORE = 'ignore',","      YES = 'yes',","      NO = 'no',","      CANCEL = 'cancel',","      ERROR = 'error',","      YESNO = 'yesno',","      RETRY = 'retry',","      INPUT = 'input',","      NUMBER = 'number',","      LOGIN = 'login',","      WARNING = 'warning',","      OBJECT = 'object',","      CONFIRMATION_BUTTONS = {","          footer: [","              {name: NO, label: 'No', action: ACTION_HIDE, isDefault: true},","              {name: YES, label: 'Yes', action: ACTION_HIDE}","          ]","      },","      CONFIRMATION_RETRY_BUTTONS = {","          footer: [","              {name: ABORT, label:'Abort', action: ACTION_HIDE},","              {name: IGNORE, label:'Ignore', action: ACTION_HIDE},","              {name: RETRY, label:'Retry', action: ACTION_HIDE, isDefault: true}","          ]","      },","      ITSADialogInstance;","","function ITSADialog() {}","","if (!Y.Global.ITSADialog) {","    Y.mix(ITSADialog.prototype, {","        itsadialogboxLoaded : function() {","            var instance = this;","            if (!instance.moduleLoaded) {","                instance.moduleLoaded = new Y.Promise(function (resolve) {","                    Y.use('gallery-itsadialogbox', function() {","                        resolve();","                    });","                });","            }","            return instance.moduleLoaded;","        },","        _getFunction : function(options) {","            // Caution: Y.Global.ItsaDialog is NOT the same as Y.Global.ITSADialog:","            // Y.Global.ItsaDialog is the dialog-widget that comes from gallery-itsadialogbox and uses callback-funcs.","            var useFunction,","                  type = options && options.type,","                  ItsaDialog = Y.Global.ItsaDialog;","            if (type===WARNING) {","                useFunction = Y.bind(ItsaDialog.showWarning, ItsaDialog);","            }","            else if (type===ERROR) {","                useFunction = Y.bind(ItsaDialog.showErrorMessage, ItsaDialog);","            }","            else if (type===YESNO) {","                useFunction = Y.bind(ItsaDialog.getConfirmation, ItsaDialog);","            }","            else if (type===RETRY) {","                useFunction = Y.bind(ItsaDialog.getRetryConfirmation, ItsaDialog);","            }","            else if (type===INPUT) {","                useFunction = Y.bind(ItsaDialog.getInput, ItsaDialog);","            }","            else if (type===NUMBER) {","                useFunction = Y.bind(ItsaDialog.getNumber, ItsaDialog);","            }","            else if (type===LOGIN) {","                useFunction = Y.bind(ItsaDialog.getLogin, ItsaDialog);","            }","            else {","                // default","                useFunction = Y.bind(ItsaDialog.showMessage, ItsaDialog);","            }","            return useFunction;","        },","        // options.type: {String} null|'message'|'warning'|'error' (default='message')","        alert : function(title, message, options) {","            var instance = this;","            // make it possible to pass 'options' as second argument:","            if (typeof message === OBJECT) {","                options = message;","                message = title;","                title = '';","            }","            options = options || {};","            return instance.itsadialogboxLoaded().then(","                function() {","                    return new Y.Promise(function (resolve) {","                        // We cannot use Y.Global.ItsaDialog here, because at render-time, it does not exist","                        // therefore we call an internal function that does exist, which can call Y.Global.ItsaDialog itself.","                        instance._getFunction(options)(","                            title,","                            message,","                            function() {","                                resolve();","                            }","                        );","                    });","                }","            );","        },","        // options.type: {String} 'input'|'number'|'login' (default==='input')","        // options.value: {String|number} (in case of options.type==='number' or 'input')","","        // options.min: {String|Number} (in case of options.type==='number')","        // options.max: {Number} (in case of options.type==='number')","","        // options.labelUsername: {String} (in case of options.type==='login')","        // options.labelPassword: {String} (in case of options.type==='login')","        // options.defaultUsername: {String} (in case of options.type==='login')","        // options.defaultPassword: {String} (in case of options.type==='login')","","","        // resolve(response) --> response.value || response.username+response.password","        prompt : function(title, message, options) {","            var instance = this;","            // make it possible to pass 'options' as second argument:","            if (typeof message === OBJECT) {","                options = message;","                message = title;","                title = '';","            }","            options = options || {};","            options.type = options.type || INPUT;","            return instance.itsadialogboxLoaded().then(","                function() {","                    return new Y.Promise(function (resolve, reject) {","                        // We cannot use Y.Global.ItsaDialog here, because at render-time, it does not exist","                        // therefore we call an internal function that does exist, which can call Y.Global.ItsaDialog itself.","                        if (options.type===NUMBER) {","                            instance._getFunction(options)(","                                title,","                                message,","                                options.value || '',","                                options.min,","                                options.max,","                                function(e) {","                                    // callback function","                                    var promiseReject = (e.buttonName === CANCEL);","                                    if (promiseReject) {","                                        reject(new Error('input cancelled'));","                                    }","                                    else {","                                        resolve(e);","                                    }","                                }","                            );","                        }","                        else {","                            instance._getFunction(options)(","                                title,","                                message,","                                (options.type===INPUT) ? (options.value || '') : options,","                                function(e) {","                                    // callback function.","                                    // In case of 'input' --> only e.value is present","                                    // In case of 'login' --> e.username, e.password and e.savechecked are present","                                    var promiseReject = (e.buttonName === CANCEL);","                                    if (promiseReject) {","                                        reject(new Error('input cancelled'));","                                    }","                                    else {","                                        resolve(e);","                                    }","                                }","                            );","                        }","                    });","                }","            );","        },","        // options.type: {String} null|'yesno'|'retry'  (default='yesno')","        // options.defaultBtn: {String} 'yes'|'no'|'abort'|'ignore'|'retry'  (default='no'|'retry')","        // resolve(button) --> button === 'buttonname'","        confirm : function(title, question, options) {","            var instance = this,","                  buttons, rejectmessage;","            // make it possible to pass 'options' as second argument:","            if (typeof message === OBJECT) {","                options = question;","                question = title;","                title = '';","            }","            options = options || {};","            options.type = options.type || YESNO;","            if (options.type===RETRY) {","                buttons = CONFIRMATION_RETRY_BUTTONS;","                rejectmessage = 'aborted';","                if (options.defaultBtn===ABORT) {","                    buttons.footer[0].isDefault = true;","                    buttons.footer[2].isDefault = false;","                }","                else if (options.defaultBtn==='ignore') {","                    buttons.footer[1].isDefault = true;","                    buttons.footer[2].isDefault = false;","                }","            }","            else {","                // 'yesno'","                buttons =  CONFIRMATION_BUTTONS;","                rejectmessage = 'not confirmed';","                if (options.defaultBtn===YES) {","                    buttons.footer[0].isDefault = false;","                    buttons.footer[1].isDefault = true;","                }","            }","            return instance.itsadialogboxLoaded().then(","                function() {","                    return new Y.Promise(function (resolve, reject) {","                        // We cannot use Y.Global.ItsaDialog here, because at render-time, it does not exist","                        // therefore we call an internal function that does exist, which can call Y.Global.ItsaDialog itself.","                        instance._getFunction(options)(","                            title,","                            question,","                            function(e) {","                                // callback function","                                var button = e.buttonName,","                                      promiseReject = ((button === NO) || (button === ABORT));","                                if (promiseReject) {","                                    reject(new Error(rejectmessage));","                                }","                                else {","                                    resolve(button);","                                }","                            },","                            null,","                            null,","                            buttons","                        );","                    });","                }","            );","        }","    });","","    ITSADialogInstance = Y.Global.ITSADialog = new ITSADialog();","    // now lazyload 'gallery-itsadialogbox'","    Y.later(","        LOADDELAY,","        ITSADialogInstance,","        ITSADialogInstance.itsadialogboxLoaded","    );","}","","Y.alert = Y.rbind(ITSADialogInstance.alert, ITSADialogInstance);","Y.prompt = Y.rbind(ITSADialogInstance.prompt, ITSADialogInstance);","Y.confirm = Y.rbind(ITSADialogInstance.confirm, ITSADialogInstance);","","}, '@VERSION@', {\"requires\": [\"yui-base\", \"promise\", \"event-custom-base\", \"yui-later\", \"oop\", \"gallery-itsadialogbox\"]});"];
_yuitest_coverage["build/gallery-itsadialog/gallery-itsadialog.js"].lines = {"1":0,"3":0,"23":0,"53":0,"55":0,"56":0,"58":0,"59":0,"60":0,"61":0,"62":0,"66":0,"71":0,"74":0,"75":0,"77":0,"78":0,"80":0,"81":0,"83":0,"84":0,"86":0,"87":0,"89":0,"90":0,"92":0,"93":0,"97":0,"99":0,"103":0,"105":0,"106":0,"107":0,"108":0,"110":0,"111":0,"113":0,"116":0,"120":0,"141":0,"143":0,"144":0,"145":0,"146":0,"148":0,"149":0,"150":0,"152":0,"155":0,"156":0,"164":0,"165":0,"166":0,"169":0,"175":0,"183":0,"184":0,"185":0,"188":0,"201":0,"204":0,"205":0,"206":0,"207":0,"209":0,"210":0,"211":0,"212":0,"213":0,"214":0,"215":0,"216":0,"218":0,"219":0,"220":0,"225":0,"226":0,"227":0,"228":0,"229":0,"232":0,"234":0,"237":0,"242":0,"244":0,"245":0,"248":0,"261":0,"263":0,"270":0,"271":0,"272":0};
_yuitest_coverage["build/gallery-itsadialog/gallery-itsadialog.js"].functions = {"ITSADialog:53":0,"(anonymous 3):61":0,"(anonymous 2):60":0,"itsadialogboxLoaded:57":0,"_getFunction:68":0,"(anonymous 6):119":0,"(anonymous 5):113":0,"(anonymous 4):112":0,"alert:102":0,"(anonymous 9):162":0,"(anonymous 10):179":0,"(anonymous 8):152":0,"(anonymous 7):151":0,"prompt:140":0,"(anonymous 13):240":0,"(anonymous 12):234":0,"(anonymous 11):233":0,"confirm:200":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-itsadialog/gallery-itsadialog.js"].coveredLines = 92;
_yuitest_coverage["build/gallery-itsadialog/gallery-itsadialog.js"].coveredFunctions = 19;
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
      ACTION_HIDE = '_actionHide',
      ABORT = 'abort',
      IGNORE = 'ignore',
      YES = 'yes',
      NO = 'no',
      CANCEL = 'cancel',
      ERROR = 'error',
      YESNO = 'yesno',
      RETRY = 'retry',
      INPUT = 'input',
      NUMBER = 'number',
      LOGIN = 'login',
      WARNING = 'warning',
      OBJECT = 'object',
      CONFIRMATION_BUTTONS = {
          footer: [
              {name: NO, label: 'No', action: ACTION_HIDE, isDefault: true},
              {name: YES, label: 'Yes', action: ACTION_HIDE}
          ]
      },
      CONFIRMATION_RETRY_BUTTONS = {
          footer: [
              {name: ABORT, label:'Abort', action: ACTION_HIDE},
              {name: IGNORE, label:'Ignore', action: ACTION_HIDE},
              {name: RETRY, label:'Retry', action: ACTION_HIDE, isDefault: true}
          ]
      },
      ITSADialogInstance;

_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 53);
function ITSADialog() {}

_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 55);
if (!Y.Global.ITSADialog) {
    _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 56);
Y.mix(ITSADialog.prototype, {
        itsadialogboxLoaded : function() {
            _yuitest_coverfunc("build/gallery-itsadialog/gallery-itsadialog.js", "itsadialogboxLoaded", 57);
_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 58);
var instance = this;
            _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 59);
if (!instance.moduleLoaded) {
                _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 60);
instance.moduleLoaded = new Y.Promise(function (resolve) {
                    _yuitest_coverfunc("build/gallery-itsadialog/gallery-itsadialog.js", "(anonymous 2)", 60);
_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 61);
Y.use('gallery-itsadialogbox', function() {
                        _yuitest_coverfunc("build/gallery-itsadialog/gallery-itsadialog.js", "(anonymous 3)", 61);
_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 62);
resolve();
                    });
                });
            }
            _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 66);
return instance.moduleLoaded;
        },
        _getFunction : function(options) {
            // Caution: Y.Global.ItsaDialog is NOT the same as Y.Global.ITSADialog:
            // Y.Global.ItsaDialog is the dialog-widget that comes from gallery-itsadialogbox and uses callback-funcs.
            _yuitest_coverfunc("build/gallery-itsadialog/gallery-itsadialog.js", "_getFunction", 68);
_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 71);
var useFunction,
                  type = options && options.type,
                  ItsaDialog = Y.Global.ItsaDialog;
            _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 74);
if (type===WARNING) {
                _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 75);
useFunction = Y.bind(ItsaDialog.showWarning, ItsaDialog);
            }
            else {_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 77);
if (type===ERROR) {
                _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 78);
useFunction = Y.bind(ItsaDialog.showErrorMessage, ItsaDialog);
            }
            else {_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 80);
if (type===YESNO) {
                _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 81);
useFunction = Y.bind(ItsaDialog.getConfirmation, ItsaDialog);
            }
            else {_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 83);
if (type===RETRY) {
                _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 84);
useFunction = Y.bind(ItsaDialog.getRetryConfirmation, ItsaDialog);
            }
            else {_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 86);
if (type===INPUT) {
                _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 87);
useFunction = Y.bind(ItsaDialog.getInput, ItsaDialog);
            }
            else {_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 89);
if (type===NUMBER) {
                _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 90);
useFunction = Y.bind(ItsaDialog.getNumber, ItsaDialog);
            }
            else {_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 92);
if (type===LOGIN) {
                _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 93);
useFunction = Y.bind(ItsaDialog.getLogin, ItsaDialog);
            }
            else {
                // default
                _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 97);
useFunction = Y.bind(ItsaDialog.showMessage, ItsaDialog);
            }}}}}}}
            _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 99);
return useFunction;
        },
        // options.type: {String} null|'message'|'warning'|'error' (default='message')
        alert : function(title, message, options) {
            _yuitest_coverfunc("build/gallery-itsadialog/gallery-itsadialog.js", "alert", 102);
_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 103);
var instance = this;
            // make it possible to pass 'options' as second argument:
            _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 105);
if (typeof message === OBJECT) {
                _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 106);
options = message;
                _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 107);
message = title;
                _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 108);
title = '';
            }
            _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 110);
options = options || {};
            _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 111);
return instance.itsadialogboxLoaded().then(
                function() {
                    _yuitest_coverfunc("build/gallery-itsadialog/gallery-itsadialog.js", "(anonymous 4)", 112);
_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 113);
return new Y.Promise(function (resolve) {
                        // We cannot use Y.Global.ItsaDialog here, because at render-time, it does not exist
                        // therefore we call an internal function that does exist, which can call Y.Global.ItsaDialog itself.
                        _yuitest_coverfunc("build/gallery-itsadialog/gallery-itsadialog.js", "(anonymous 5)", 113);
_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 116);
instance._getFunction(options)(
                            title,
                            message,
                            function() {
                                _yuitest_coverfunc("build/gallery-itsadialog/gallery-itsadialog.js", "(anonymous 6)", 119);
_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 120);
resolve();
                            }
                        );
                    });
                }
            );
        },
        // options.type: {String} 'input'|'number'|'login' (default==='input')
        // options.value: {String|number} (in case of options.type==='number' or 'input')

        // options.min: {String|Number} (in case of options.type==='number')
        // options.max: {Number} (in case of options.type==='number')

        // options.labelUsername: {String} (in case of options.type==='login')
        // options.labelPassword: {String} (in case of options.type==='login')
        // options.defaultUsername: {String} (in case of options.type==='login')
        // options.defaultPassword: {String} (in case of options.type==='login')


        // resolve(response) --> response.value || response.username+response.password
        prompt : function(title, message, options) {
            _yuitest_coverfunc("build/gallery-itsadialog/gallery-itsadialog.js", "prompt", 140);
_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 141);
var instance = this;
            // make it possible to pass 'options' as second argument:
            _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 143);
if (typeof message === OBJECT) {
                _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 144);
options = message;
                _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 145);
message = title;
                _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 146);
title = '';
            }
            _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 148);
options = options || {};
            _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 149);
options.type = options.type || INPUT;
            _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 150);
return instance.itsadialogboxLoaded().then(
                function() {
                    _yuitest_coverfunc("build/gallery-itsadialog/gallery-itsadialog.js", "(anonymous 7)", 151);
_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 152);
return new Y.Promise(function (resolve, reject) {
                        // We cannot use Y.Global.ItsaDialog here, because at render-time, it does not exist
                        // therefore we call an internal function that does exist, which can call Y.Global.ItsaDialog itself.
                        _yuitest_coverfunc("build/gallery-itsadialog/gallery-itsadialog.js", "(anonymous 8)", 152);
_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 155);
if (options.type===NUMBER) {
                            _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 156);
instance._getFunction(options)(
                                title,
                                message,
                                options.value || '',
                                options.min,
                                options.max,
                                function(e) {
                                    // callback function
                                    _yuitest_coverfunc("build/gallery-itsadialog/gallery-itsadialog.js", "(anonymous 9)", 162);
_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 164);
var promiseReject = (e.buttonName === CANCEL);
                                    _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 165);
if (promiseReject) {
                                        _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 166);
reject(new Error('input cancelled'));
                                    }
                                    else {
                                        _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 169);
resolve(e);
                                    }
                                }
                            );
                        }
                        else {
                            _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 175);
instance._getFunction(options)(
                                title,
                                message,
                                (options.type===INPUT) ? (options.value || '') : options,
                                function(e) {
                                    // callback function.
                                    // In case of 'input' --> only e.value is present
                                    // In case of 'login' --> e.username, e.password and e.savechecked are present
                                    _yuitest_coverfunc("build/gallery-itsadialog/gallery-itsadialog.js", "(anonymous 10)", 179);
_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 183);
var promiseReject = (e.buttonName === CANCEL);
                                    _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 184);
if (promiseReject) {
                                        _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 185);
reject(new Error('input cancelled'));
                                    }
                                    else {
                                        _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 188);
resolve(e);
                                    }
                                }
                            );
                        }
                    });
                }
            );
        },
        // options.type: {String} null|'yesno'|'retry'  (default='yesno')
        // options.defaultBtn: {String} 'yes'|'no'|'abort'|'ignore'|'retry'  (default='no'|'retry')
        // resolve(button) --> button === 'buttonname'
        confirm : function(title, question, options) {
            _yuitest_coverfunc("build/gallery-itsadialog/gallery-itsadialog.js", "confirm", 200);
_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 201);
var instance = this,
                  buttons, rejectmessage;
            // make it possible to pass 'options' as second argument:
            _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 204);
if (typeof message === OBJECT) {
                _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 205);
options = question;
                _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 206);
question = title;
                _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 207);
title = '';
            }
            _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 209);
options = options || {};
            _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 210);
options.type = options.type || YESNO;
            _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 211);
if (options.type===RETRY) {
                _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 212);
buttons = CONFIRMATION_RETRY_BUTTONS;
                _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 213);
rejectmessage = 'aborted';
                _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 214);
if (options.defaultBtn===ABORT) {
                    _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 215);
buttons.footer[0].isDefault = true;
                    _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 216);
buttons.footer[2].isDefault = false;
                }
                else {_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 218);
if (options.defaultBtn==='ignore') {
                    _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 219);
buttons.footer[1].isDefault = true;
                    _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 220);
buttons.footer[2].isDefault = false;
                }}
            }
            else {
                // 'yesno'
                _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 225);
buttons =  CONFIRMATION_BUTTONS;
                _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 226);
rejectmessage = 'not confirmed';
                _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 227);
if (options.defaultBtn===YES) {
                    _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 228);
buttons.footer[0].isDefault = false;
                    _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 229);
buttons.footer[1].isDefault = true;
                }
            }
            _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 232);
return instance.itsadialogboxLoaded().then(
                function() {
                    _yuitest_coverfunc("build/gallery-itsadialog/gallery-itsadialog.js", "(anonymous 11)", 233);
_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 234);
return new Y.Promise(function (resolve, reject) {
                        // We cannot use Y.Global.ItsaDialog here, because at render-time, it does not exist
                        // therefore we call an internal function that does exist, which can call Y.Global.ItsaDialog itself.
                        _yuitest_coverfunc("build/gallery-itsadialog/gallery-itsadialog.js", "(anonymous 12)", 234);
_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 237);
instance._getFunction(options)(
                            title,
                            question,
                            function(e) {
                                // callback function
                                _yuitest_coverfunc("build/gallery-itsadialog/gallery-itsadialog.js", "(anonymous 13)", 240);
_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 242);
var button = e.buttonName,
                                      promiseReject = ((button === NO) || (button === ABORT));
                                _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 244);
if (promiseReject) {
                                    _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 245);
reject(new Error(rejectmessage));
                                }
                                else {
                                    _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 248);
resolve(button);
                                }
                            },
                            null,
                            null,
                            buttons
                        );
                    });
                }
            );
        }
    });

    _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 261);
ITSADialogInstance = Y.Global.ITSADialog = new ITSADialog();
    // now lazyload 'gallery-itsadialogbox'
    _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 263);
Y.later(
        LOADDELAY,
        ITSADialogInstance,
        ITSADialogInstance.itsadialogboxLoaded
    );
}

_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 270);
Y.alert = Y.rbind(ITSADialogInstance.alert, ITSADialogInstance);
_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 271);
Y.prompt = Y.rbind(ITSADialogInstance.prompt, ITSADialogInstance);
_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 272);
Y.confirm = Y.rbind(ITSADialogInstance.confirm, ITSADialogInstance);

}, '@VERSION@', {"requires": ["yui-base", "promise", "event-custom-base", "yui-later", "oop", "gallery-itsadialogbox"]});
