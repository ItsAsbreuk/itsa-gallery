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
_yuitest_coverage["build/gallery-itsadialog/gallery-itsadialog.js"].code=["YUI.add('gallery-itsadialog', function (Y, NAME) {","","'use strict';","","/**"," * The Itsa Selectlist module."," *"," * @module gallery-itsaselectlist"," */","","","/**"," *"," * @class ITSASelectlist"," * @extends Widget"," * @constructor"," *"," * <i>Copyright (c) 2012 Marco Asbreuk - http://theinternetwizard.net</i>"," * YUI BSD License - http://developer.yahoo.com/yui/license.html"," *","*/","","var LOADDELAY = 5000, // lazy load 'gallery-itsadialogbox' after 5 seconds","      GALLERY_ITSADIALOGBOX = 'gallery-itsadialogbox',","      ACTION_HIDE = '_actionHide',","      ABORT = 'abort',","      IGNORE = 'ignore',","      YES = 'yes',","      NO = 'no',","      CANCEL = 'cancel',","      ERROR = 'error',","      YESNO = 'yesno',","      RETRY = 'retry',","      INPUT = 'input',","      NUMBER = 'number',","      LOGIN = 'login',","      WARNING = 'warning',","      OBJECT = 'object',","      CONFIRMATION_BUTTONS = {","          footer: [","              {name: NO, label: 'No', action: ACTION_HIDE, isDefault: true},","              {name: YES, label: 'Yes', action: ACTION_HIDE}","          ]","      },","      CONFIRMATION_RETRY_BUTTONS = {","          footer: [","              {name: ABORT, label:'Abort', action: ACTION_HIDE},","              {name: IGNORE, label:'Ignore', action: ACTION_HIDE},","              {name: RETRY, label:'Retry', action: ACTION_HIDE, isDefault: true}","          ]","      },","      ITSADialogInstance;","","function ITSADialog() {}","","if (!Y.Global.ITSADialog) {","    Y.mix(ITSADialog.prototype, {","        _getFunction : function(options) {","            // Caution: Y.Global.ItsaDialog is NOT the same as Y.Global.ITSADialog:","            // Y.Global.ItsaDialog is the dialog-widget that comes from gallery-itsadialogbox and uses callback-funcs.","            var useFunction,","                  type = options && options.type,","                  ItsaDialog = Y.Global.ItsaDialog;","            if (type===WARNING) {","                useFunction = Y.bind(ItsaDialog.showWarning, ItsaDialog);","            }","            else if (type===ERROR) {","                useFunction = Y.bind(ItsaDialog.showErrorMessage, ItsaDialog);","            }","            else if (type===YESNO) {","                useFunction = Y.bind(ItsaDialog.getConfirmation, ItsaDialog);","            }","            else if (type===RETRY) {","                useFunction = Y.bind(ItsaDialog.getRetryConfirmation, ItsaDialog);","            }","            else if (type===INPUT) {","                useFunction = Y.bind(ItsaDialog.getInput, ItsaDialog);","            }","            else if (type===NUMBER) {","                useFunction = Y.bind(ItsaDialog.getNumber, ItsaDialog);","            }","            else if (type===LOGIN) {","                useFunction = Y.bind(ItsaDialog.getLogin, ItsaDialog);","            }","            else {","                // default","                useFunction = Y.bind(ItsaDialog.showMessage, ItsaDialog);","            }","            return useFunction;","        },","        // options.type: {String} null|'message'|'warning'|'error' (default='message')","        alert : function(title, message, options) {","            var instance = this;","            // make it possible to pass 'options' as second argument:","            if (typeof message === OBJECT) {","                options = message;","                message = title;","                title = '';","            }","            options = options || {};","            return Y.usePromise(GALLERY_ITSADIALOGBOX).then(","                function() {","                    return new Y.Promise(function (resolve) {","                        // We cannot use Y.Global.ItsaDialog here, because at render-time, it does not exist","                        // therefore we call an internal function that does exist, which can call Y.Global.ItsaDialog itself.","                        instance._getFunction(options)(","                            title,","                            message,","                            function() {","                                resolve();","                            }","                        );","                    });","                }","            );","        },","        // options.type: {String} 'input'|'number'|'login' (default==='input')","        // options.value: {String|number} (in case of options.type==='number' or 'input')","","        // options.min: {String|Number} (in case of options.type==='number')","        // options.max: {Number} (in case of options.type==='number')","","        // options.labelUsername: {String} (in case of options.type==='login')","        // options.labelPassword: {String} (in case of options.type==='login')","        // options.defaultUsername: {String} (in case of options.type==='login')","        // options.defaultPassword: {String} (in case of options.type==='login')","","","        // resolve(response) --> response.value || response.username+response.password","        prompt : function(title, message, options) {","            var instance = this;","            // make it possible to pass 'options' as second argument:","            if (typeof message === OBJECT) {","                options = message;","                message = title;","                title = '';","            }","            options = options || {};","            options.type = options.type || INPUT;","            return Y.usePromise(GALLERY_ITSADIALOGBOX).then(","                function() {","                    return new Y.Promise(function (resolve, reject) {","                        // We cannot use Y.Global.ItsaDialog here, because at render-time, it does not exist","                        // therefore we call an internal function that does exist, which can call Y.Global.ItsaDialog itself.","                        if (options.type===NUMBER) {","                            instance._getFunction(options)(","                                title,","                                message,","                                options.value || '',","                                options.min,","                                options.max,","                                function(e) {","                                    // callback function","                                    var promiseReject = (e.buttonName === CANCEL);","                                    if (promiseReject) {","                                        reject(new Error('input cancelled'));","                                    }","                                    else {","                                        resolve(e);","                                    }","                                }","                            );","                        }","                        else {","                            instance._getFunction(options)(","                                title,","                                message,","                                (options.type===INPUT) ? (options.value || '') : options,","                                function(e) {","                                    // callback function.","                                    // In case of 'input' --> only e.value is present","                                    // In case of 'login' --> e.username, e.password and e.savechecked are present","                                    var promiseReject = (e.buttonName === CANCEL);","                                    if (promiseReject) {","                                        reject(new Error('input cancelled'));","                                    }","                                    else {","                                        resolve(e);","                                    }","                                }","                            );","                        }","                    });","                }","            );","        },","        // options.type: {String} null|'yesno'|'retry'  (default='yesno')","        // options.defaultBtn: {String} 'yes'|'no'|'abort'|'ignore'|'retry'  (default='no'|'retry')","        // resolve(button) --> button === 'buttonname'","        confirm : function(title, question, options) {","            var instance = this,","                  buttons, rejectmessage;","            // make it possible to pass 'options' as second argument:","            if (typeof message === OBJECT) {","                options = question;","                question = title;","                title = '';","            }","            options = options || {};","            options.type = options.type || YESNO;","            if (options.type===RETRY) {","                buttons = CONFIRMATION_RETRY_BUTTONS;","                rejectmessage = 'aborted';","                if (options.defaultBtn===ABORT) {","                    buttons.footer[0].isDefault = true;","                    buttons.footer[2].isDefault = false;","                }","                else if (options.defaultBtn==='ignore') {","                    buttons.footer[1].isDefault = true;","                    buttons.footer[2].isDefault = false;","                }","            }","            else {","                // 'yesno'","                buttons =  CONFIRMATION_BUTTONS;","                rejectmessage = 'not confirmed';","                if (options.defaultBtn===YES) {","                    buttons.footer[0].isDefault = false;","                    buttons.footer[1].isDefault = true;","                }","            }","            return Y.usePromise(GALLERY_ITSADIALOGBOX).then(","                function() {","                    return new Y.Promise(function (resolve, reject) {","                        // We cannot use Y.Global.ItsaDialog here, because at render-time, it does not exist","                        // therefore we call an internal function that does exist, which can call Y.Global.ItsaDialog itself.","                        instance._getFunction(options)(","                            title,","                            question,","                            function(e) {","                                // callback function","                                var button = e.buttonName,","                                      promiseReject = ((button === NO) || (button === ABORT));","                                if (promiseReject) {","                                    reject(new Error(rejectmessage));","                                }","                                else {","                                    resolve(button);","                                }","                            },","                            null,","                            null,","                            buttons","                        );","                    });","                }","            );","        }","    });","","    ITSADialogInstance = Y.Global.ITSADialog = new ITSADialog();","    // now lazyload 'gallery-itsadialogbox'","    Y.later(","        LOADDELAY,","        Y,","        Y.use,","        GALLERY_ITSADIALOGBOX","    );","}","","Y.alert = Y.rbind(ITSADialogInstance.alert, ITSADialogInstance);","Y.prompt = Y.rbind(ITSADialogInstance.prompt, ITSADialogInstance);","Y.confirm = Y.rbind(ITSADialogInstance.confirm, ITSADialogInstance);","","}, '@VERSION@', {","    \"requires\": [","        \"yui-base\",","        \"promise\",","        \"event-custom-base\",","        \"yui-later\",","        \"oop\",","        \"gallery-itsamodulesloadedpromise\"","    ]","});"];
_yuitest_coverage["build/gallery-itsadialog/gallery-itsadialog.js"].lines = {"1":0,"3":0,"23":0,"54":0,"56":0,"57":0,"61":0,"64":0,"65":0,"67":0,"68":0,"70":0,"71":0,"73":0,"74":0,"76":0,"77":0,"79":0,"80":0,"82":0,"83":0,"87":0,"89":0,"93":0,"95":0,"96":0,"97":0,"98":0,"100":0,"101":0,"103":0,"106":0,"110":0,"131":0,"133":0,"134":0,"135":0,"136":0,"138":0,"139":0,"140":0,"142":0,"145":0,"146":0,"154":0,"155":0,"156":0,"159":0,"165":0,"173":0,"174":0,"175":0,"178":0,"191":0,"194":0,"195":0,"196":0,"197":0,"199":0,"200":0,"201":0,"202":0,"203":0,"204":0,"205":0,"206":0,"208":0,"209":0,"210":0,"215":0,"216":0,"217":0,"218":0,"219":0,"222":0,"224":0,"227":0,"232":0,"234":0,"235":0,"238":0,"251":0,"253":0,"261":0,"262":0,"263":0};
_yuitest_coverage["build/gallery-itsadialog/gallery-itsadialog.js"].functions = {"ITSADialog:54":0,"_getFunction:58":0,"(anonymous 4):109":0,"(anonymous 3):103":0,"(anonymous 2):102":0,"alert:92":0,"(anonymous 7):152":0,"(anonymous 8):169":0,"(anonymous 6):142":0,"(anonymous 5):141":0,"prompt:130":0,"(anonymous 11):230":0,"(anonymous 10):224":0,"(anonymous 9):223":0,"confirm:190":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-itsadialog/gallery-itsadialog.js"].coveredLines = 86;
_yuitest_coverage["build/gallery-itsadialog/gallery-itsadialog.js"].coveredFunctions = 16;
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
      GALLERY_ITSADIALOGBOX = 'gallery-itsadialogbox',
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

_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 54);
function ITSADialog() {}

_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 56);
if (!Y.Global.ITSADialog) {
    _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 57);
Y.mix(ITSADialog.prototype, {
        _getFunction : function(options) {
            // Caution: Y.Global.ItsaDialog is NOT the same as Y.Global.ITSADialog:
            // Y.Global.ItsaDialog is the dialog-widget that comes from gallery-itsadialogbox and uses callback-funcs.
            _yuitest_coverfunc("build/gallery-itsadialog/gallery-itsadialog.js", "_getFunction", 58);
_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 61);
var useFunction,
                  type = options && options.type,
                  ItsaDialog = Y.Global.ItsaDialog;
            _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 64);
if (type===WARNING) {
                _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 65);
useFunction = Y.bind(ItsaDialog.showWarning, ItsaDialog);
            }
            else {_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 67);
if (type===ERROR) {
                _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 68);
useFunction = Y.bind(ItsaDialog.showErrorMessage, ItsaDialog);
            }
            else {_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 70);
if (type===YESNO) {
                _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 71);
useFunction = Y.bind(ItsaDialog.getConfirmation, ItsaDialog);
            }
            else {_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 73);
if (type===RETRY) {
                _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 74);
useFunction = Y.bind(ItsaDialog.getRetryConfirmation, ItsaDialog);
            }
            else {_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 76);
if (type===INPUT) {
                _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 77);
useFunction = Y.bind(ItsaDialog.getInput, ItsaDialog);
            }
            else {_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 79);
if (type===NUMBER) {
                _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 80);
useFunction = Y.bind(ItsaDialog.getNumber, ItsaDialog);
            }
            else {_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 82);
if (type===LOGIN) {
                _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 83);
useFunction = Y.bind(ItsaDialog.getLogin, ItsaDialog);
            }
            else {
                // default
                _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 87);
useFunction = Y.bind(ItsaDialog.showMessage, ItsaDialog);
            }}}}}}}
            _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 89);
return useFunction;
        },
        // options.type: {String} null|'message'|'warning'|'error' (default='message')
        alert : function(title, message, options) {
            _yuitest_coverfunc("build/gallery-itsadialog/gallery-itsadialog.js", "alert", 92);
_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 93);
var instance = this;
            // make it possible to pass 'options' as second argument:
            _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 95);
if (typeof message === OBJECT) {
                _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 96);
options = message;
                _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 97);
message = title;
                _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 98);
title = '';
            }
            _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 100);
options = options || {};
            _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 101);
return Y.usePromise(GALLERY_ITSADIALOGBOX).then(
                function() {
                    _yuitest_coverfunc("build/gallery-itsadialog/gallery-itsadialog.js", "(anonymous 2)", 102);
_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 103);
return new Y.Promise(function (resolve) {
                        // We cannot use Y.Global.ItsaDialog here, because at render-time, it does not exist
                        // therefore we call an internal function that does exist, which can call Y.Global.ItsaDialog itself.
                        _yuitest_coverfunc("build/gallery-itsadialog/gallery-itsadialog.js", "(anonymous 3)", 103);
_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 106);
instance._getFunction(options)(
                            title,
                            message,
                            function() {
                                _yuitest_coverfunc("build/gallery-itsadialog/gallery-itsadialog.js", "(anonymous 4)", 109);
_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 110);
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
            _yuitest_coverfunc("build/gallery-itsadialog/gallery-itsadialog.js", "prompt", 130);
_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 131);
var instance = this;
            // make it possible to pass 'options' as second argument:
            _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 133);
if (typeof message === OBJECT) {
                _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 134);
options = message;
                _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 135);
message = title;
                _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 136);
title = '';
            }
            _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 138);
options = options || {};
            _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 139);
options.type = options.type || INPUT;
            _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 140);
return Y.usePromise(GALLERY_ITSADIALOGBOX).then(
                function() {
                    _yuitest_coverfunc("build/gallery-itsadialog/gallery-itsadialog.js", "(anonymous 5)", 141);
_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 142);
return new Y.Promise(function (resolve, reject) {
                        // We cannot use Y.Global.ItsaDialog here, because at render-time, it does not exist
                        // therefore we call an internal function that does exist, which can call Y.Global.ItsaDialog itself.
                        _yuitest_coverfunc("build/gallery-itsadialog/gallery-itsadialog.js", "(anonymous 6)", 142);
_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 145);
if (options.type===NUMBER) {
                            _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 146);
instance._getFunction(options)(
                                title,
                                message,
                                options.value || '',
                                options.min,
                                options.max,
                                function(e) {
                                    // callback function
                                    _yuitest_coverfunc("build/gallery-itsadialog/gallery-itsadialog.js", "(anonymous 7)", 152);
_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 154);
var promiseReject = (e.buttonName === CANCEL);
                                    _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 155);
if (promiseReject) {
                                        _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 156);
reject(new Error('input cancelled'));
                                    }
                                    else {
                                        _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 159);
resolve(e);
                                    }
                                }
                            );
                        }
                        else {
                            _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 165);
instance._getFunction(options)(
                                title,
                                message,
                                (options.type===INPUT) ? (options.value || '') : options,
                                function(e) {
                                    // callback function.
                                    // In case of 'input' --> only e.value is present
                                    // In case of 'login' --> e.username, e.password and e.savechecked are present
                                    _yuitest_coverfunc("build/gallery-itsadialog/gallery-itsadialog.js", "(anonymous 8)", 169);
_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 173);
var promiseReject = (e.buttonName === CANCEL);
                                    _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 174);
if (promiseReject) {
                                        _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 175);
reject(new Error('input cancelled'));
                                    }
                                    else {
                                        _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 178);
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
            _yuitest_coverfunc("build/gallery-itsadialog/gallery-itsadialog.js", "confirm", 190);
_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 191);
var instance = this,
                  buttons, rejectmessage;
            // make it possible to pass 'options' as second argument:
            _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 194);
if (typeof message === OBJECT) {
                _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 195);
options = question;
                _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 196);
question = title;
                _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 197);
title = '';
            }
            _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 199);
options = options || {};
            _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 200);
options.type = options.type || YESNO;
            _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 201);
if (options.type===RETRY) {
                _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 202);
buttons = CONFIRMATION_RETRY_BUTTONS;
                _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 203);
rejectmessage = 'aborted';
                _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 204);
if (options.defaultBtn===ABORT) {
                    _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 205);
buttons.footer[0].isDefault = true;
                    _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 206);
buttons.footer[2].isDefault = false;
                }
                else {_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 208);
if (options.defaultBtn==='ignore') {
                    _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 209);
buttons.footer[1].isDefault = true;
                    _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 210);
buttons.footer[2].isDefault = false;
                }}
            }
            else {
                // 'yesno'
                _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 215);
buttons =  CONFIRMATION_BUTTONS;
                _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 216);
rejectmessage = 'not confirmed';
                _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 217);
if (options.defaultBtn===YES) {
                    _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 218);
buttons.footer[0].isDefault = false;
                    _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 219);
buttons.footer[1].isDefault = true;
                }
            }
            _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 222);
return Y.usePromise(GALLERY_ITSADIALOGBOX).then(
                function() {
                    _yuitest_coverfunc("build/gallery-itsadialog/gallery-itsadialog.js", "(anonymous 9)", 223);
_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 224);
return new Y.Promise(function (resolve, reject) {
                        // We cannot use Y.Global.ItsaDialog here, because at render-time, it does not exist
                        // therefore we call an internal function that does exist, which can call Y.Global.ItsaDialog itself.
                        _yuitest_coverfunc("build/gallery-itsadialog/gallery-itsadialog.js", "(anonymous 10)", 224);
_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 227);
instance._getFunction(options)(
                            title,
                            question,
                            function(e) {
                                // callback function
                                _yuitest_coverfunc("build/gallery-itsadialog/gallery-itsadialog.js", "(anonymous 11)", 230);
_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 232);
var button = e.buttonName,
                                      promiseReject = ((button === NO) || (button === ABORT));
                                _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 234);
if (promiseReject) {
                                    _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 235);
reject(new Error(rejectmessage));
                                }
                                else {
                                    _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 238);
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

    _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 251);
ITSADialogInstance = Y.Global.ITSADialog = new ITSADialog();
    // now lazyload 'gallery-itsadialogbox'
    _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 253);
Y.later(
        LOADDELAY,
        Y,
        Y.use,
        GALLERY_ITSADIALOGBOX
    );
}

_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 261);
Y.alert = Y.rbind(ITSADialogInstance.alert, ITSADialogInstance);
_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 262);
Y.prompt = Y.rbind(ITSADialogInstance.prompt, ITSADialogInstance);
_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 263);
Y.confirm = Y.rbind(ITSADialogInstance.confirm, ITSADialogInstance);

}, '@VERSION@', {
    "requires": [
        "yui-base",
        "promise",
        "event-custom-base",
        "yui-later",
        "oop",
        "gallery-itsamodulesloadedpromise"
    ]
});
