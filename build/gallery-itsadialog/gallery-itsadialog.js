YUI.add('gallery-itsadialog', function (Y, NAME) {

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

var LOADDELAY = 5000; // lazy load 'gallery-itsadialogbox' after 5 seconds

function ITSADialog() {}

if (!Y.Global.ITSADialog) {
alert('init');
    Y.mix(ITSADialog.prototype, {
        check: 10,
        itsadialogboxLoaded : function() {
            var instance = this;
            if (!instance.moduleLoaded) {
                instance.moduleLoaded = new Y.Promise(function (resolve) {
                    Y.use('gallery-itsadialogbox', function() {
                        resolve();
                    });
                });
            }
            return instance.moduleLoaded;
        },
        alert : function(title, message) {
            var instance = this;
            return instance.itsadialogboxLoaded().then(
                function() {
                    return new Y.Promise(function (resolve) {
                        // Caution: Y.Global.ItsaDialog is NOT the same as Y.Global.ITSADialog:
                        // Y.Global.ItsaDialog is the dialog-widget that comes from gallery-itsadialogbox and uses callback-funcs.
                        Y.Global.ItsaDialog.showMessage(
                            title,
                            message,
                            function() {
                                resolve();
                            }
                        );
                    });
                }
            );
        },
        prompt : function(title, message, defaultmessage) {
            var instance = this;
            return instance.itsadialogboxLoaded().then(
                function() {
                    return new Y.Promise(function (resolve, reject) {
                        // Caution: Y.Global.ItsaDialog is NOT the same as Y.Global.ITSADialog:
                        // Y.Global.ItsaDialog is the dialog-widget that comes from gallery-itsadialogbox and uses callback-funcs.
                        Y.Global.ITSADialog.getInput(
                            title,
                            message,
                            defaultmessage,
                            function(e) {
                                // callback function
                                var value = e.value,
                                      promiseReject = (e.buttonName === 'cancel');
                                if (promiseReject) {
                                    reject(new Error('input cancelled'));
                                }
                                else {
                                    resolve(value);
                                }
                            }
                        );
                    });
                }
            );
        },
        confirm : function(title, question) {
            var instance = this;
            return instance.itsadialogboxLoaded().then(
                function() {
                    return new Y.Promise(function (resolve, reject) {
                        // Caution: Y.Global.ItsaDialog is NOT the same as Y.Global.ITSADialog:
                        // Y.Global.ItsaDialog is the dialog-widget that comes from gallery-itsadialogbox and uses callback-funcs.
                        Y.Global.ITSADialog.getConfirmation(
                            title,
                            question,
                            function(e) {
                                // callback function
                                var promiseReject = (e.buttonName === 'no');
                                if (promiseReject) {
                                    reject(new Error('not confirmed'));
                                }
                                else {
                                    resolve();
                                }
                            }
                        );
                    });
                }
            );
        }
    });

    Y.Global.ITSADialog = ITSADialog;
    // now lazyload 'gallery-itsadialogbox'
    Y.later(
        LOADDELAY,
        null,
        Y.Global.ITSADialog.itsadialogboxLoaded
    );
}

if (!Y.alert) {
    Y.alert = Y.Global.ITSADialog.alert;
}

if (!Y.prompt) {
    Y.prompt = Y.Global.ITSADialog.prompt;
}

if (!Y.confirm) {
    Y.confirm = Y.Global.ITSADialog.confirm;
}



}, '@VERSION@', {"requires": ["yui-base", "promise", "gallery-itsadialogbox"]});
