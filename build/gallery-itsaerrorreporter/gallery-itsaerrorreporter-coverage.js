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
_yuitest_coverage["build/gallery-itsaerrorreporter/gallery-itsaerrorreporter.js"].code=["YUI.add('gallery-itsaerrorreporter', function (Y, NAME) {","","'use strict';","","/**"," * This module full automaticly reports error-events by poping up an error-dialog."," *"," * By default it listens to both error-events and error-loggings. Both can be (un)set."," *"," *"," * @module gallery-itsaerrorreporter"," * @class Y.ErrorReporter"," * @since 0.1"," *"," * <i>Copyright (c) 2013 Marco Asbreuk - http://theinternetwizard.net</i>"," * YUI BSD License - http://developer.yahoo.com/yui/license.html"," *","*/","","var ERROR = 'error',","      BOOLEAN = 'boolean',","      UNDEFINED_ERROR = 'undefined error',","      errorReporterInstance;","","function ITSAErrorReporter() {}","","if (!Y.Global.ITSAErrorReporter) {","","    Y.mix(ITSAErrorReporter.prototype, {","","        /**","         * Sets or unsets the reporter for 'error'-events.","         *","         * @method reportErrorEvents","         * @param [activate] {boolean} to set or unset the reporter","         * @since 0.1","        */","        reportErrorEvents : function(activate) {","            var instance = this,","                  active = (typeof activate===BOOLEAN) ? activate : true;","            if (active && !instance._reportErrorEvents) {","                instance._reportErrorEvents = Y.after(","                    [ERROR, '*:'+ERROR],","                    function(e) {","                        var err = e.err || e.error || e.msg || e.message || UNDEFINED_ERROR,","                              src = e.src || e.source;","                        Y.alert(src, err, {type: ERROR});","                    }","                );","            }","            else if (!active && instance._reportErrorEvents) {","                instance._reportErrorEvents.detach();","                instance._reportErrorEvents = null;","            }","        },","","        /**","         * Sets or unsets the reporter for 'error'-logs.","         *","         * @method reportErrorLogs","         * @param [activate] {boolean} to set or unset the reporter","         * @since 0.1","        */","        reportErrorLogs : function(activate) {","            var instance = this,","                  active = (typeof activate===BOOLEAN) ? activate : true;","            if (active && !instance._reportErrorLogs) {","                instance._reportErrorLogs = Y.on(","                    'yui:log',","                    function(e) {","                        var err = e.msg,","                              cat = e.cat,","                              src = e.src;","                        if (cat===ERROR) {","                            Y.alert(src, err, {type: ERROR});","                        }","                    }","                );","            }","            else if (!active && instance._reportErrorLogs) {","                instance._reportErrorLogs.detach();","                instance._reportErrorLogs = null;","            }","        }","","    });","","    errorReporterInstance = Y.Global.ITSAErrorReporter = new ITSAErrorReporter();","    errorReporterInstance.reportErrorEvents();","    errorReporterInstance.reportErrorLogs();","","}","","Y.ErrorReporter = Y.Global.ITSAErrorReporter;","","}, '@VERSION@', {\"requires\": [\"yui-base\", \"event-base\", \"event-custom-base\", \"gallery-itsadialog\"]});"];
_yuitest_coverage["build/gallery-itsaerrorreporter/gallery-itsaerrorreporter.js"].lines = {"1":0,"3":0,"20":0,"25":0,"27":0,"29":0,"39":0,"41":0,"42":0,"45":0,"47":0,"51":0,"52":0,"53":0,"65":0,"67":0,"68":0,"71":0,"74":0,"75":0,"80":0,"81":0,"82":0,"88":0,"89":0,"90":0,"94":0};
_yuitest_coverage["build/gallery-itsaerrorreporter/gallery-itsaerrorreporter.js"].functions = {"ITSAErrorReporter:25":0,"(anonymous 2):44":0,"reportErrorEvents:38":0,"(anonymous 3):70":0,"reportErrorLogs:64":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-itsaerrorreporter/gallery-itsaerrorreporter.js"].coveredLines = 27;
_yuitest_coverage["build/gallery-itsaerrorreporter/gallery-itsaerrorreporter.js"].coveredFunctions = 6;
_yuitest_coverline("build/gallery-itsaerrorreporter/gallery-itsaerrorreporter.js", 1);
YUI.add('gallery-itsaerrorreporter', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-itsaerrorreporter/gallery-itsaerrorreporter.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-itsaerrorreporter/gallery-itsaerrorreporter.js", 3);
'use strict';

/**
 * This module full automaticly reports error-events by poping up an error-dialog.
 *
 * By default it listens to both error-events and error-loggings. Both can be (un)set.
 *
 *
 * @module gallery-itsaerrorreporter
 * @class Y.ErrorReporter
 * @since 0.1
 *
 * <i>Copyright (c) 2013 Marco Asbreuk - http://theinternetwizard.net</i>
 * YUI BSD License - http://developer.yahoo.com/yui/license.html
 *
*/

_yuitest_coverline("build/gallery-itsaerrorreporter/gallery-itsaerrorreporter.js", 20);
var ERROR = 'error',
      BOOLEAN = 'boolean',
      UNDEFINED_ERROR = 'undefined error',
      errorReporterInstance;

_yuitest_coverline("build/gallery-itsaerrorreporter/gallery-itsaerrorreporter.js", 25);
function ITSAErrorReporter() {}

_yuitest_coverline("build/gallery-itsaerrorreporter/gallery-itsaerrorreporter.js", 27);
if (!Y.Global.ITSAErrorReporter) {

    _yuitest_coverline("build/gallery-itsaerrorreporter/gallery-itsaerrorreporter.js", 29);
Y.mix(ITSAErrorReporter.prototype, {

        /**
         * Sets or unsets the reporter for 'error'-events.
         *
         * @method reportErrorEvents
         * @param [activate] {boolean} to set or unset the reporter
         * @since 0.1
        */
        reportErrorEvents : function(activate) {
            _yuitest_coverfunc("build/gallery-itsaerrorreporter/gallery-itsaerrorreporter.js", "reportErrorEvents", 38);
_yuitest_coverline("build/gallery-itsaerrorreporter/gallery-itsaerrorreporter.js", 39);
var instance = this,
                  active = (typeof activate===BOOLEAN) ? activate : true;
            _yuitest_coverline("build/gallery-itsaerrorreporter/gallery-itsaerrorreporter.js", 41);
if (active && !instance._reportErrorEvents) {
                _yuitest_coverline("build/gallery-itsaerrorreporter/gallery-itsaerrorreporter.js", 42);
instance._reportErrorEvents = Y.after(
                    [ERROR, '*:'+ERROR],
                    function(e) {
                        _yuitest_coverfunc("build/gallery-itsaerrorreporter/gallery-itsaerrorreporter.js", "(anonymous 2)", 44);
_yuitest_coverline("build/gallery-itsaerrorreporter/gallery-itsaerrorreporter.js", 45);
var err = e.err || e.error || e.msg || e.message || UNDEFINED_ERROR,
                              src = e.src || e.source;
                        _yuitest_coverline("build/gallery-itsaerrorreporter/gallery-itsaerrorreporter.js", 47);
Y.alert(src, err, {type: ERROR});
                    }
                );
            }
            else {_yuitest_coverline("build/gallery-itsaerrorreporter/gallery-itsaerrorreporter.js", 51);
if (!active && instance._reportErrorEvents) {
                _yuitest_coverline("build/gallery-itsaerrorreporter/gallery-itsaerrorreporter.js", 52);
instance._reportErrorEvents.detach();
                _yuitest_coverline("build/gallery-itsaerrorreporter/gallery-itsaerrorreporter.js", 53);
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
            _yuitest_coverfunc("build/gallery-itsaerrorreporter/gallery-itsaerrorreporter.js", "reportErrorLogs", 64);
_yuitest_coverline("build/gallery-itsaerrorreporter/gallery-itsaerrorreporter.js", 65);
var instance = this,
                  active = (typeof activate===BOOLEAN) ? activate : true;
            _yuitest_coverline("build/gallery-itsaerrorreporter/gallery-itsaerrorreporter.js", 67);
if (active && !instance._reportErrorLogs) {
                _yuitest_coverline("build/gallery-itsaerrorreporter/gallery-itsaerrorreporter.js", 68);
instance._reportErrorLogs = Y.on(
                    'yui:log',
                    function(e) {
                        _yuitest_coverfunc("build/gallery-itsaerrorreporter/gallery-itsaerrorreporter.js", "(anonymous 3)", 70);
_yuitest_coverline("build/gallery-itsaerrorreporter/gallery-itsaerrorreporter.js", 71);
var err = e.msg,
                              cat = e.cat,
                              src = e.src;
                        _yuitest_coverline("build/gallery-itsaerrorreporter/gallery-itsaerrorreporter.js", 74);
if (cat===ERROR) {
                            _yuitest_coverline("build/gallery-itsaerrorreporter/gallery-itsaerrorreporter.js", 75);
Y.alert(src, err, {type: ERROR});
                        }
                    }
                );
            }
            else {_yuitest_coverline("build/gallery-itsaerrorreporter/gallery-itsaerrorreporter.js", 80);
if (!active && instance._reportErrorLogs) {
                _yuitest_coverline("build/gallery-itsaerrorreporter/gallery-itsaerrorreporter.js", 81);
instance._reportErrorLogs.detach();
                _yuitest_coverline("build/gallery-itsaerrorreporter/gallery-itsaerrorreporter.js", 82);
instance._reportErrorLogs = null;
            }}
        }

    });

    _yuitest_coverline("build/gallery-itsaerrorreporter/gallery-itsaerrorreporter.js", 88);
errorReporterInstance = Y.Global.ITSAErrorReporter = new ITSAErrorReporter();
    _yuitest_coverline("build/gallery-itsaerrorreporter/gallery-itsaerrorreporter.js", 89);
errorReporterInstance.reportErrorEvents();
    _yuitest_coverline("build/gallery-itsaerrorreporter/gallery-itsaerrorreporter.js", 90);
errorReporterInstance.reportErrorLogs();

}

_yuitest_coverline("build/gallery-itsaerrorreporter/gallery-itsaerrorreporter.js", 94);
Y.ErrorReporter = Y.Global.ITSAErrorReporter;

}, '@VERSION@', {"requires": ["yui-base", "event-base", "event-custom-base", "gallery-itsadialog"]});
