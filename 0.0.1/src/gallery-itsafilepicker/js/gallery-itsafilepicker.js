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

Y.ITSAFilePicker = Y.Base.create('itsafilepicker', Y.ITSAFileManager, [], {

    /**
     * @method initializer
     * @protected
     * @since 0.1
    */
    initializer : function() {
        var instance = this;

        Y.log('initializer', 'info', 'Itsa-FilePicker');
        // instance.readyPromise does not exists at this time, but it does when the widget is rendered:
        instance.renderPromise()
        .then(
            function() {
                return instance.readyPromise;
            }
         )
        .then(
            function() {
                instance.filescrollview.set('dblclickEvents', true);
            }
        );
     },

    /**
     * @method getFile
     * @param multiple {Boolean} whether to select a single or multiple files
     * @return {Y.Promise} the promised selected file-object.
     * The Fulfilled-function has 1 parameter <b>response</b> which is an object with three properties:<br />
     * response.directory {String}, response.file {Object} and response.files {Array} which only exists when 'multiple' is true.
     * response.file is always the file that has been double clicked, while response.files is an array that contains all files
     * (including the double clicked file)<br />
     * The file-object has a property-structure as specified in ITSAFileManager's 'filestructure'.
     * @since 0.1
    */
    getFile : function(multiple) {
        var instance = this;

        Y.log('getFile', 'info', 'Itsa-FilePicker');
        return instance.dataPromise.then(
            function() {
                var filescrollview = instance.filescrollview,
                      filepromise;
                filescrollview.set('modelsSelectable', (multiple ? 'multi' : 'single'));
                filepromise = new Y.Promise(function (resolve, reject) {
                    var resolvehandler, rejecthandler;
                    resolvehandler = instance.once(
                        'itsascrollviewmodellist:modelDblclick',
                        function(e) {
                            var file = e.model,
                                  files;
                            rejecthandler.detach();
                            if (multiple) {
                                files = filescrollview.getSelectedModels(true);
                                if (Y.Array.indexOf(files, file)===-1) {
                                    // the item that was clicked on is not yet part of the selection: add it
                                    files.push(file);
                                }
                            }
                            resolve({
                                directory: instance.getCurrentDir(),
                                file: file,
                                files: files
                            });
                            instance.hide();
                        }
                    );
                    rejecthandler = instance.once(
                        '*:visibleChange',
                        function(e) {
                            var target = e.target,
                                  hidden = (e.newVal === false);
                            if (hidden && (target instanceof Y.ITSAFilePicker)) {
                                resolvehandler.detach();
                                reject(new Error('Fileselector closed without selecting a file'));
                            }
                        }
                    );
                });
                instance.show();
                return filepromise;
            }
        );
     }

});

if (!Y.Global.ItsaFilePicker) {
    var winHeight, winWidth, defaultWidth, defaultHeight, config;
    winHeight = parseInt(Y.one('window').get('winHeight'), 10);
    winWidth = parseInt(Y.one('window').get('winWidth'), 10);
    defaultHeight = Math.round(winHeight*0.9);
    defaultWidth = Math.min(Math.round(defaultHeight*1.3), Math.round(winWidth*0.9));
    config = {
        width: defaultWidth,
        height: defaultHeight,
        zIndex: 15000,
        centered: true,
        modal: true,
        visible: false,
        plugins: [Y.Plugin.Drag, Y.Plugin.Resize]
    };
    Y.Global.ItsaFilePicker = new Y.ITSAFilePicker(config).render();
}

Y.ItsaFilePicker = Y.Global.ItsaFilePicker;