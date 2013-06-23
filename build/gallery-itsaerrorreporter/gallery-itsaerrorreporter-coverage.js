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
_yuitest_coverage["build/gallery-itsaerrorreporter/gallery-itsaerrorreporter.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-itsaerrorreporter/gallery-itsaerrorreporter.js",
    code: []
};
_yuitest_coverage["build/gallery-itsaerrorreporter/gallery-itsaerrorreporter.js"].code=["YUI.add('gallery-itsaerrorreporter', function (Y, NAME) {","","'use strict';","","/**"," * This module full automaticly reports error-events by poping up an error-dialog."," *"," * By default it listens to window.onerror, broadcasted 'error'-events and error-loggings. All can be (un)set."," *"," *"," * @module gallery-itsaerrorreporter"," * @class Y.ITSAErrorReporter"," * @since 0.1"," *"," * <i>Copyright (c) 2013 Marco Asbreuk - http://theinternetwizard.net</i>"," * YUI BSD License - http://developer.yahoo.com/yui/license.html"," *","*/","","var ERROR = 'error',","      JS_ERROR = 'javascript '+ERROR,","      BOOLEAN = 'boolean',","      UNDEFINED_ERROR = 'undefined error',","      errorReporterInstance;","","function ITSAErrorReporter() {}","","if (!Y.Global.ITSAErrorReporter) {","","    Y.mix(ITSAErrorReporter.prototype, {","","        /**","         * Handler for window.onerror.","         *","         * @method _handleWindowError","         * @param [activate] {boolean} to set or unset the reporter","         * @since 0.2","        */","        _handleWindowError : function(msg, url, line) {","            var instance = this;","","            if (instance._reportWindowErrors) {","                  Y.alert(JS_ERROR, msg+'<br /><br />'+url+' (line '+line+')', {type: ERROR});","            }","        },","","        /**","         * Sets or unsets the reporter for 'error'-events.","         *","         * @method reportErrorEvents","         * @param [activate] {boolean} to set or unset the reporter","         * @since 0.1","        */","        reportErrorEvents : function(activate) {","            var instance = this,","                  active = (typeof activate===BOOLEAN) ? activate : true;","","            if (active && !instance._reportErrorEvents) {","                instance._reportErrorEvents = Y.after(","                    ['*:'+ERROR],","                    function(e) {","                        var err = e.err || e.error || e.msg || e.message || UNDEFINED_ERROR,","                              src = e.src || e.source;","                        Y.alert(src, err, {type: ERROR});","                    }","                );","            }","            else if (!active && instance._reportErrorEvents) {","                instance._reportErrorEvents.detach();","                instance._reportErrorEvents = null;","            }","        },","","        /**","         * Sets or unsets the reporter for 'error'-logs.","         *","         * @method reportErrorLogs","         * @param [activate] {boolean} to set or unset the reporter","         * @since 0.1","        */","        reportErrorLogs : function(activate) {","            var instance = this,","                  active = (typeof activate===BOOLEAN) ? activate : true;","","            if (active && !instance._reportErrorLogs) {","                instance._reportErrorLogs = Y.on(","                    'yui:log',","                    function(e) {","                        var err = e.msg,","                              cat = e.cat,","                              src = e.src;","                        if (cat===ERROR) {","                            Y.alert(src, err, {type: ERROR});","                        }","                    }","                );","            }","            else if (!active && instance._reportErrorLogs) {","                instance._reportErrorLogs.detach();","                instance._reportErrorLogs = null;","            }","        },","","        /**","         * Sets or unsets the reporter for window.onerror.","         *","         * @method reportWindowErrors","         * @param [activate] {boolean} to set or unset the reporter","         * @since 0.2","        */","        reportWindowErrors : function(activate) {","            var active = (typeof activate===BOOLEAN) ? activate : true;","","            this._reportWindowErrors = active;","        }","","    });","","    errorReporterInstance = Y.Global.ITSAErrorReporter = new ITSAErrorReporter();","    window.onerror = Y.bind(errorReporterInstance._handleWindowError, errorReporterInstance);","    errorReporterInstance.reportWindowErrors();","    errorReporterInstance.reportErrorEvents();","    errorReporterInstance.reportErrorLogs();","","}","","Y.ITSAErrorReporter = Y.Global.ITSAErrorReporter;","","}, '@VERSION@', {\"requires\": [\"yui-base\", \"event-base\", \"event-custom-base\", \"gallery-itsadialog\"]});"];
_yuitest_coverage["build/gallery-itsaerrorreporter/gallery-itsaerrorreporter.js"].lines = {"1":0,"3":0,"20":0,"26":0,"28":0,"30":0,"40":0,"42":0,"43":0,"55":0,"58":0,"59":0,"62":0,"64":0,"68":0,"69":0,"70":0,"82":0,"85":0,"86":0,"89":0,"92":0,"93":0,"98":0,"99":0,"100":0,"112":0,"114":0,"119":0,"120":0,"121":0,"122":0,"123":0,"127":0};
_yuitest_coverage["build/gallery-itsaerrorreporter/gallery-itsaerrorreporter.js"].functions = {"ITSAErrorReporter:26":0,"_handleWindowError:39":0,"(anonymous 2):61":0,"reportErrorEvents:54":0,"(anonymous 3):88":0,"reportErrorLogs:81":0,"reportWindowErrors:111":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-itsaerrorreporter/gallery-itsaerrorreporter.js"].coveredLines = 34;
_yuitest_coverage["build/gallery-itsaerrorreporter/gallery-itsaerrorreporter.js"].coveredFunctions = 8;
_yuitest_coverline("build/gallery-itsaerrorreporter/gallery-itsaerrorreporter.js", 1);
YUI.add('gallery-itsaerrorreporter', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-itsaerrorreporter/gallery-itsaerrorreporter.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-itsaerrorreporter/gallery-itsaerrorreporter.js", 3);
'use strict';

/**
 * This module full automaticly reports error-events by poping up an error-dialog.
 *
 * By default it listens to window.onerror, broadcasted 'error'-events and error-loggings. All can be (un)set.
 *
 *
 * @module gallery-itsaerrorreporter
 * @class Y.ITSAErrorReporter
 * @since 0.1
 *
 * <i>Copyright (c) 2013 Marco Asbreuk - http://theinternetwizard.net</i>
 * YUI BSD License - http://developer.yahoo.com/yui/license.html
 *
*/

_yuitest_coverline("build/gallery-itsaerrorreporter/gallery-itsaerrorreporter.js", 20);
var ERROR = 'error',
      JS_ERROR = 'javascript '+ERROR,
      BOOLEAN = 'boolean',
      UNDEFINED_ERROR = 'undefined error',
      errorReporterInstance;

_yuitest_coverline("build/gallery-itsaerrorreporter/gallery-itsaerrorreporter.js", 26);
function ITSAErrorReporter() {}

_yuitest_coverline("build/gallery-itsaerrorreporter/gallery-itsaerrorreporter.js", 28);
if (!Y.Global.ITSAErrorReporter) {

    _yuitest_coverline("build/gallery-itsaerrorreporter/gallery-itsaerrorreporter.js", 30);
Y.mix(ITSAErrorReporter.prototype, {

        /**
         * Handler for window.onerror.
         *
         * @method _handleWindowError
         * @param [activate] {boolean} to set or unset the reporter
         * @since 0.2
        */
        _handleWindowError : function(msg, url, line) {
            _yuitest_coverfunc("build/gallery-itsaerrorreporter/gallery-itsaerrorreporter.js", "_handleWindowError", 39);
_yuitest_coverline("build/gallery-itsaerrorreporter/gallery-itsaerrorreporter.js", 40);
var instance = this;

            _yuitest_coverline("build/gallery-itsaerrorreporter/gallery-itsaerrorreporter.js", 42);
if (instance._reportWindowErrors) {
                  _yuitest_coverline("build/gallery-itsaerrorreporter/gallery-itsaerrorreporter.js", 43);
Y.alert(JS_ERROR, msg+'<br /><br />'+url+' (line '+line+')', {type: ERROR});
            }
        },

        /**
         * Sets or unsets the reporter for 'error'-events.
         *
         * @method reportErrorEvents
         * @param [activate] {boolean} to set or unset the reporter
         * @since 0.1
        */
        reportErrorEvents : function(activate) {
            _yuitest_coverfunc("build/gallery-itsaerrorreporter/gallery-itsaerrorreporter.js", "reportErrorEvents", 54);
_yuitest_coverline("build/gallery-itsaerrorreporter/gallery-itsaerrorreporter.js", 55);
var instance = this,
                  active = (typeof activate===BOOLEAN) ? activate : true;

            _yuitest_coverline("build/gallery-itsaerrorreporter/gallery-itsaerrorreporter.js", 58);
if (active && !instance._reportErrorEvents) {
                _yuitest_coverline("build/gallery-itsaerrorreporter/gallery-itsaerrorreporter.js", 59);
instance._reportErrorEvents = Y.after(
                    ['*:'+ERROR],
                    function(e) {
                        _yuitest_coverfunc("build/gallery-itsaerrorreporter/gallery-itsaerrorreporter.js", "(anonymous 2)", 61);
_yuitest_coverline("build/gallery-itsaerrorreporter/gallery-itsaerrorreporter.js", 62);
var err = e.err || e.error || e.msg || e.message || UNDEFINED_ERROR,
                              src = e.src || e.source;
                        _yuitest_coverline("build/gallery-itsaerrorreporter/gallery-itsaerrorreporter.js", 64);
Y.alert(src, err, {type: ERROR});
                    }
                );
            }
            else {_yuitest_coverline("build/gallery-itsaerrorreporter/gallery-itsaerrorreporter.js", 68);
if (!active && instance._reportErrorEvents) {
                _yuitest_coverline("build/gallery-itsaerrorreporter/gallery-itsaerrorreporter.js", 69);
instance._reportErrorEvents.detach();
                _yuitest_coverline("build/gallery-itsaerrorreporter/gallery-itsaerrorreporter.js", 70);
instance._reportErrorEvents = null;
            }}
        },

        /**
         * Sets or unsets the reporter for 'error'-logs.
         *
         * @method reportErrorLogs
         * @param [activate] {boolean} to set or unset the reporter
         * @since 0.1
        */
        reportErrorLogs : function(activate) {
            _yuitest_coverfunc("build/gallery-itsaerrorreporter/gallery-itsaerrorreporter.js", "reportErrorLogs", 81);
_yuitest_coverline("build/gallery-itsaerrorreporter/gallery-itsaerrorreporter.js", 82);
var instance = this,
                  active = (typeof activate===BOOLEAN) ? activate : true;

            _yuitest_coverline("build/gallery-itsaerrorreporter/gallery-itsaerrorreporter.js", 85);
if (active && !instance._reportErrorLogs) {
                _yuitest_coverline("build/gallery-itsaerrorreporter/gallery-itsaerrorreporter.js", 86);
instance._reportErrorLogs = Y.on(
                    'yui:log',
                    function(e) {
                        _yuitest_coverfunc("build/gallery-itsaerrorreporter/gallery-itsaerrorreporter.js", "(anonymous 3)", 88);
_yuitest_coverline("build/gallery-itsaerrorreporter/gallery-itsaerrorreporter.js", 89);
var err = e.msg,
                              cat = e.cat,
                              src = e.src;
                        _yuitest_coverline("build/gallery-itsaerrorreporter/gallery-itsaerrorreporter.js", 92);
if (cat===ERROR) {
                            _yuitest_coverline("build/gallery-itsaerrorreporter/gallery-itsaerrorreporter.js", 93);
Y.alert(src, err, {type: ERROR});
                        }
                    }
                );
            }
            else {_yuitest_coverline("build/gallery-itsaerrorreporter/gallery-itsaerrorreporter.js", 98);
if (!active && instance._reportErrorLogs) {
                _yuitest_coverline("build/gallery-itsaerrorreporter/gallery-itsaerrorreporter.js", 99);
instance._reportErrorLogs.detach();
                _yuitest_coverline("build/gallery-itsaerrorreporter/gallery-itsaerrorreporter.js", 100);
instance._reportErrorLogs = null;
            }}
        },

        /**
         * Sets or unsets the reporter for window.onerror.
         *
         * @method reportWindowErrors
         * @param [activate] {boolean} to set or unset the reporter
         * @since 0.2
        */
        reportWindowErrors : function(activate) {
            _yuitest_coverfunc("build/gallery-itsaerrorreporter/gallery-itsaerrorreporter.js", "reportWindowErrors", 111);
_yuitest_coverline("build/gallery-itsaerrorreporter/gallery-itsaerrorreporter.js", 112);
var active = (typeof activate===BOOLEAN) ? activate : true;

            _yuitest_coverline("build/gallery-itsaerrorreporter/gallery-itsaerrorreporter.js", 114);
this._reportWindowErrors = active;
        }

    });

    _yuitest_coverline("build/gallery-itsaerrorreporter/gallery-itsaerrorreporter.js", 119);
errorReporterInstance = Y.Global.ITSAErrorReporter = new ITSAErrorReporter();
    _yuitest_coverline("build/gallery-itsaerrorreporter/gallery-itsaerrorreporter.js", 120);
window.onerror = Y.bind(errorReporterInstance._handleWindowError, errorReporterInstance);
    _yuitest_coverline("build/gallery-itsaerrorreporter/gallery-itsaerrorreporter.js", 121);
errorReporterInstance.reportWindowErrors();
    _yuitest_coverline("build/gallery-itsaerrorreporter/gallery-itsaerrorreporter.js", 122);
errorReporterInstance.reportErrorEvents();
    _yuitest_coverline("build/gallery-itsaerrorreporter/gallery-itsaerrorreporter.js", 123);
errorReporterInstance.reportErrorLogs();

}

_yuitest_coverline("build/gallery-itsaerrorreporter/gallery-itsaerrorreporter.js", 127);
Y.ITSAErrorReporter = Y.Global.ITSAErrorReporter;

}, '@VERSION@', {"requires": ["yui-base", "event-base", "event-custom-base", "gallery-itsadialog"]});
