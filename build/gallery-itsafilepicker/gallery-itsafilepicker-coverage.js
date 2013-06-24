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
_yuitest_coverage["build/gallery-itsafilepicker/gallery-itsafilepicker.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-itsafilepicker/gallery-itsafilepicker.js",
    code: []
};
_yuitest_coverage["build/gallery-itsafilepicker/gallery-itsafilepicker.js"].code=["YUI.add('gallery-itsafilepicker', function (Y, NAME) {","","'use strict';","","/**"," *"," * Class ITSAFilePicker"," *"," *"," * Class that pickes dates and times using Promises. It can be used as a date-picker, time-picker or both.<br />"," * The Class also can render 3 button-Nodes with calendar-icon, time-icon or both."," *"," * @module gallery-itsafilepicker"," * @extends Base"," * @class ITSAFilePicker"," * @constructor"," * @since 0.1"," *"," * <i>Copyright (c) 2013 Marco Asbreuk - http://itsasbreuk.nl</i>"," * YUI BSD License - http://developer.yahoo.com/yui/license.html"," *","*/","","//===============================================================================================","","Y.ITSAFilePicker = Y.Base.create('itsafilepicker', Y.ITSAFileManager, [], {","","    /**","     * @method initializer","     * @protected","     * @since 0.1","    */","    initializer : function() {","        var instance = this;","","        // instance.readyPromise does not exists at this time, but it does when the widget is rendered:","        instance.renderPromise()","        .then(","            function() {","                return instance.readyPromise;","            }","         )","        .then(","            function() {","                instance.filescrollview.set('dblclickEvents', true);","            }","        );","     },","","    /**","     * @method getFile","     * @param multiple {Boolean} whether to select a single or multiple files","     * @return {Y.Promise} the promised selected file-object.","     * The Fulfilled-function has 1 parameter <b>result</b> which is an object with three properties:<br />","     * result.directory {String}, result.file {Object} and result.files {Array} which only exists when 'multiple' is true.","     * result.file is always the file that has been double clicked, while result.files is an array that contains all files","     * (including the double clicked file)<br />","     * The file-object has a property-structure as specified in ITSAFileManager's 'filestructure'.","     * @since 0.1","    */","    getFile : function(multiple) {","        var instance = this;","","        return instance.dataPromise.then(","            function() {","                var filescrollview = instance.filescrollview,","                      filepromise;","                filescrollview.set('modelsSelectable', (multiple ? 'multi' : 'single'));","                filepromise = new Y.Promise(function (resolve, reject) {","                    var resolvehandler, rejecthandler;","                    resolvehandler = instance.on(","                        'itsascrollviewmodellist:modelDblclick',","                        function(e) {","                            var file = e.model,","                                  files;","                            rejecthandler.detach();","                            if (multiple) {","                                files = filescrollview.getSelectedModels(true);","                                if (Y.Array.indexOf(files, file)===-1) {","                                    // the item that was clicked on is not yet part of the selection: add it","                                    files.push(file);","                                }","                            }","                            resolve({","                                directory: instance.getCurrentDir(),","                                file: file,","                                files: files","                            });","                            instance.hide();","                        }","                    );","                    rejecthandler = instance.on(","                        '*:visibleChange',","                        function(e) {","                            var target = e.target,","                                  hidden = (e.newVal === false);","                            if (hidden && (target instanceof Y.ITSAFilePicker)) {","                                resolvehandler.detach();","                                reject(new Error('Fileselector closed without selecting a file'));","                            }","                        }","                    );","                });","                instance.show();","                return filepromise;","            }","        );","     }","","});","","if (!Y.Global.ItsaFilePicker) {","    var winHeight, winWidth, defaultWidth, defaultHeight, config;","    winHeight = parseInt(Y.one('window').get('winHeight'), 10);","    winWidth = parseInt(Y.one('window').get('winWidth'), 10);","    defaultHeight = Math.round(winHeight*0.9);","    defaultWidth = Math.min(Math.round(defaultHeight*1.3), Math.round(winWidth*0.9));","    config = {","        width: defaultWidth,","        height: defaultHeight,","        zIndex: 15000,","        centered: true,","        modal: true,","        visible: false,","        plugins: [Y.Plugin.Drag, Y.Plugin.Resize]","    };","    Y.Global.ItsaFilePicker = new Y.ITSAFilePicker(config).render();","}","","Y.ItsaFilePicker = Y.Global.ItsaFilePicker;","","}, '@VERSION@', {","    \"requires\": [","        \"yui-base\",","        \"promise\",","        \"dd-plugin\",","        \"resize-plugin\",","        \"gallery-itsawidgetrenderpromise\",","        \"gallery-itsafilemanager\"","    ]","});"];
_yuitest_coverage["build/gallery-itsafilepicker/gallery-itsafilepicker.js"].lines = {"1":0,"3":0,"26":0,"34":0,"37":0,"40":0,"45":0,"62":0,"64":0,"66":0,"68":0,"69":0,"70":0,"71":0,"74":0,"76":0,"77":0,"78":0,"79":0,"81":0,"84":0,"89":0,"92":0,"95":0,"97":0,"98":0,"99":0,"104":0,"105":0,"112":0,"113":0,"114":0,"115":0,"116":0,"117":0,"118":0,"127":0,"130":0};
_yuitest_coverage["build/gallery-itsafilepicker/gallery-itsafilepicker.js"].functions = {"(anonymous 2):39":0,"(anonymous 3):44":0,"initializer:33":0,"(anonymous 6):73":0,"(anonymous 7):94":0,"(anonymous 5):69":0,"(anonymous 4):65":0,"getFile:61":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-itsafilepicker/gallery-itsafilepicker.js"].coveredLines = 38;
_yuitest_coverage["build/gallery-itsafilepicker/gallery-itsafilepicker.js"].coveredFunctions = 9;
_yuitest_coverline("build/gallery-itsafilepicker/gallery-itsafilepicker.js", 1);
YUI.add('gallery-itsafilepicker', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-itsafilepicker/gallery-itsafilepicker.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-itsafilepicker/gallery-itsafilepicker.js", 3);
'use strict';

/**
 *
 * Class ITSAFilePicker
 *
 *
 * Class that pickes dates and times using Promises. It can be used as a date-picker, time-picker or both.<br />
 * The Class also can render 3 button-Nodes with calendar-icon, time-icon or both.
 *
 * @module gallery-itsafilepicker
 * @extends Base
 * @class ITSAFilePicker
 * @constructor
 * @since 0.1
 *
 * <i>Copyright (c) 2013 Marco Asbreuk - http://itsasbreuk.nl</i>
 * YUI BSD License - http://developer.yahoo.com/yui/license.html
 *
*/

//===============================================================================================

_yuitest_coverline("build/gallery-itsafilepicker/gallery-itsafilepicker.js", 26);
Y.ITSAFilePicker = Y.Base.create('itsafilepicker', Y.ITSAFileManager, [], {

    /**
     * @method initializer
     * @protected
     * @since 0.1
    */
    initializer : function() {
        _yuitest_coverfunc("build/gallery-itsafilepicker/gallery-itsafilepicker.js", "initializer", 33);
_yuitest_coverline("build/gallery-itsafilepicker/gallery-itsafilepicker.js", 34);
var instance = this;

        // instance.readyPromise does not exists at this time, but it does when the widget is rendered:
        _yuitest_coverline("build/gallery-itsafilepicker/gallery-itsafilepicker.js", 37);
instance.renderPromise()
        .then(
            function() {
                _yuitest_coverfunc("build/gallery-itsafilepicker/gallery-itsafilepicker.js", "(anonymous 2)", 39);
_yuitest_coverline("build/gallery-itsafilepicker/gallery-itsafilepicker.js", 40);
return instance.readyPromise;
            }
         )
        .then(
            function() {
                _yuitest_coverfunc("build/gallery-itsafilepicker/gallery-itsafilepicker.js", "(anonymous 3)", 44);
_yuitest_coverline("build/gallery-itsafilepicker/gallery-itsafilepicker.js", 45);
instance.filescrollview.set('dblclickEvents', true);
            }
        );
     },

    /**
     * @method getFile
     * @param multiple {Boolean} whether to select a single or multiple files
     * @return {Y.Promise} the promised selected file-object.
     * The Fulfilled-function has 1 parameter <b>result</b> which is an object with three properties:<br />
     * result.directory {String}, result.file {Object} and result.files {Array} which only exists when 'multiple' is true.
     * result.file is always the file that has been double clicked, while result.files is an array that contains all files
     * (including the double clicked file)<br />
     * The file-object has a property-structure as specified in ITSAFileManager's 'filestructure'.
     * @since 0.1
    */
    getFile : function(multiple) {
        _yuitest_coverfunc("build/gallery-itsafilepicker/gallery-itsafilepicker.js", "getFile", 61);
_yuitest_coverline("build/gallery-itsafilepicker/gallery-itsafilepicker.js", 62);
var instance = this;

        _yuitest_coverline("build/gallery-itsafilepicker/gallery-itsafilepicker.js", 64);
return instance.dataPromise.then(
            function() {
                _yuitest_coverfunc("build/gallery-itsafilepicker/gallery-itsafilepicker.js", "(anonymous 4)", 65);
_yuitest_coverline("build/gallery-itsafilepicker/gallery-itsafilepicker.js", 66);
var filescrollview = instance.filescrollview,
                      filepromise;
                _yuitest_coverline("build/gallery-itsafilepicker/gallery-itsafilepicker.js", 68);
filescrollview.set('modelsSelectable', (multiple ? 'multi' : 'single'));
                _yuitest_coverline("build/gallery-itsafilepicker/gallery-itsafilepicker.js", 69);
filepromise = new Y.Promise(function (resolve, reject) {
                    _yuitest_coverfunc("build/gallery-itsafilepicker/gallery-itsafilepicker.js", "(anonymous 5)", 69);
_yuitest_coverline("build/gallery-itsafilepicker/gallery-itsafilepicker.js", 70);
var resolvehandler, rejecthandler;
                    _yuitest_coverline("build/gallery-itsafilepicker/gallery-itsafilepicker.js", 71);
resolvehandler = instance.on(
                        'itsascrollviewmodellist:modelDblclick',
                        function(e) {
                            _yuitest_coverfunc("build/gallery-itsafilepicker/gallery-itsafilepicker.js", "(anonymous 6)", 73);
_yuitest_coverline("build/gallery-itsafilepicker/gallery-itsafilepicker.js", 74);
var file = e.model,
                                  files;
                            _yuitest_coverline("build/gallery-itsafilepicker/gallery-itsafilepicker.js", 76);
rejecthandler.detach();
                            _yuitest_coverline("build/gallery-itsafilepicker/gallery-itsafilepicker.js", 77);
if (multiple) {
                                _yuitest_coverline("build/gallery-itsafilepicker/gallery-itsafilepicker.js", 78);
files = filescrollview.getSelectedModels(true);
                                _yuitest_coverline("build/gallery-itsafilepicker/gallery-itsafilepicker.js", 79);
if (Y.Array.indexOf(files, file)===-1) {
                                    // the item that was clicked on is not yet part of the selection: add it
                                    _yuitest_coverline("build/gallery-itsafilepicker/gallery-itsafilepicker.js", 81);
files.push(file);
                                }
                            }
                            _yuitest_coverline("build/gallery-itsafilepicker/gallery-itsafilepicker.js", 84);
resolve({
                                directory: instance.getCurrentDir(),
                                file: file,
                                files: files
                            });
                            _yuitest_coverline("build/gallery-itsafilepicker/gallery-itsafilepicker.js", 89);
instance.hide();
                        }
                    );
                    _yuitest_coverline("build/gallery-itsafilepicker/gallery-itsafilepicker.js", 92);
rejecthandler = instance.on(
                        '*:visibleChange',
                        function(e) {
                            _yuitest_coverfunc("build/gallery-itsafilepicker/gallery-itsafilepicker.js", "(anonymous 7)", 94);
_yuitest_coverline("build/gallery-itsafilepicker/gallery-itsafilepicker.js", 95);
var target = e.target,
                                  hidden = (e.newVal === false);
                            _yuitest_coverline("build/gallery-itsafilepicker/gallery-itsafilepicker.js", 97);
if (hidden && (target instanceof Y.ITSAFilePicker)) {
                                _yuitest_coverline("build/gallery-itsafilepicker/gallery-itsafilepicker.js", 98);
resolvehandler.detach();
                                _yuitest_coverline("build/gallery-itsafilepicker/gallery-itsafilepicker.js", 99);
reject(new Error('Fileselector closed without selecting a file'));
                            }
                        }
                    );
                });
                _yuitest_coverline("build/gallery-itsafilepicker/gallery-itsafilepicker.js", 104);
instance.show();
                _yuitest_coverline("build/gallery-itsafilepicker/gallery-itsafilepicker.js", 105);
return filepromise;
            }
        );
     }

});

_yuitest_coverline("build/gallery-itsafilepicker/gallery-itsafilepicker.js", 112);
if (!Y.Global.ItsaFilePicker) {
    _yuitest_coverline("build/gallery-itsafilepicker/gallery-itsafilepicker.js", 113);
var winHeight, winWidth, defaultWidth, defaultHeight, config;
    _yuitest_coverline("build/gallery-itsafilepicker/gallery-itsafilepicker.js", 114);
winHeight = parseInt(Y.one('window').get('winHeight'), 10);
    _yuitest_coverline("build/gallery-itsafilepicker/gallery-itsafilepicker.js", 115);
winWidth = parseInt(Y.one('window').get('winWidth'), 10);
    _yuitest_coverline("build/gallery-itsafilepicker/gallery-itsafilepicker.js", 116);
defaultHeight = Math.round(winHeight*0.9);
    _yuitest_coverline("build/gallery-itsafilepicker/gallery-itsafilepicker.js", 117);
defaultWidth = Math.min(Math.round(defaultHeight*1.3), Math.round(winWidth*0.9));
    _yuitest_coverline("build/gallery-itsafilepicker/gallery-itsafilepicker.js", 118);
config = {
        width: defaultWidth,
        height: defaultHeight,
        zIndex: 15000,
        centered: true,
        modal: true,
        visible: false,
        plugins: [Y.Plugin.Drag, Y.Plugin.Resize]
    };
    _yuitest_coverline("build/gallery-itsafilepicker/gallery-itsafilepicker.js", 127);
Y.Global.ItsaFilePicker = new Y.ITSAFilePicker(config).render();
}

_yuitest_coverline("build/gallery-itsafilepicker/gallery-itsafilepicker.js", 130);
Y.ItsaFilePicker = Y.Global.ItsaFilePicker;

}, '@VERSION@', {
    "requires": [
        "yui-base",
        "promise",
        "dd-plugin",
        "resize-plugin",
        "gallery-itsawidgetrenderpromise",
        "gallery-itsafilemanager"
    ]
});
