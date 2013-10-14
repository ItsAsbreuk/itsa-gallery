YUI.add('gallery-itsadialog', function (Y, NAME) {

'use strict';

/*jshint maxlen:200 */

/**
 * This module adds three dialog-promises to YUI:
 *
 * Y.alert()
 * Y.prompt()
 * Y.confirm()
 *
 *
 * @module gallery-itsadialog
 * @class Y
 * @since 0.1
 *
 * <i>Copyright (c) 2013 Marco Asbreuk - http://theinternetwizard.net</i>
 * YUI BSD License - http://developer.yahoo.com/yui/license.html
 *
*/

var YArray = Y.Array,
    Lang = Y.Lang,
    RENDERDELAY = 5000,
    MODEL = 'model',
    TITLE = 'title',
    FOOTER = 'footer',
    INFO = 'info',
    WARN = 'warn',
    ERROR = 'error',
    VALUE = 'value',
    ITSADIALOG = 'itsa-dialog';

function ITSADialog() {
    ITSADialog.superclass.constructor.apply(this, arguments);
}

ITSADialog.NAME = 'itsadialog';

Y.extend(ITSADialog, Y.ITSAMessageViewer);

ITSADialog.prototype.initializer = function() {
    var instance = this;
    instance._eventhandlers = [];
    Y.later(RENDERDELAY, instance, instance.renderPromise);
};

ITSADialog.prototype.renderPromise = function() {
    var instance = this;
    return instance._renderPromise || (instance._renderPromise = Y.usePromise('gallery-itsaviewmodelpanel').then(
                                                                    Y.bind(instance._renderPanels, instance)
                                                                 ));
};

ITSADialog.prototype._renderPanels = function() {
    var instance = this,
        config = {
            visible: false,
            centered: true,
            modal: true,
            editable: true,
            minWidth: 200,
            dragable: true,
            maxWidth: 550,
            className: ITSADIALOG
        },
        eventhandlers = instance._eventhandlers,
        panels;
    panels = instance.panels = {};
    panels[INFO] = new Y.ITSAViewModelPanel(config);
    panels[WARN] = new Y.ITSAViewModelPanel(config);
    panels[ERROR] = new Y.ITSAViewModelPanel(config);

    eventhandlers.push(
        panels[INFO].after('*:hide', function(e) {
            var panel = e.target,
                itsamessage = panel.get(MODEL),
                buttonNode = e.buttonNode,
                buttonValue = buttonNode && buttonNode.get(VALUE),
                rejectButton = itsamessage.get('rejectButton'),
                rejected = (e.type==='escape:hide') || (rejectButton && (new RegExp('btn_'+buttonValue+'$')).test(rejectButton)),
                returnObject = {
                    itsamessage: itsamessage,
                    button: buttonValue
                };
/*jshint expr:true */
            rejected ? itsamessage.rejectPromise(returnObject) : itsamessage.resolvePromise(returnObject);
/*jshint expr:false */
        })
    );
    eventhandlers.push(
        panels[WARN].after('*:hide', function(e) {
            var panel = e.target,
                itsamessage = panel.get(MODEL),
                buttonNode = e.buttonNode,
                buttonValue = buttonNode && buttonNode.get(VALUE),
                rejectButton = itsamessage.get('rejectButton'),
                rejected = rejectButton && (new RegExp('btn_'+buttonValue+'$')).test(rejectButton),
                returnObject = {
                    itsamessage: itsamessage,
                    button: buttonValue
                };
/*jshint expr:true */
            rejected ? itsamessage.rejectPromise(returnObject) : itsamessage.resolvePromise(returnObject);
/*jshint expr:false */
        })
    );
    eventhandlers.push(
        panels[ERROR].after('*:hide', function(e) {
            var panel = e.target,
                itsamessage = panel.get(MODEL),
                buttonNode = e.buttonNode,
                buttonValue = buttonNode && buttonNode.get(VALUE),
                rejectButton = itsamessage.get('rejectButton'),
                rejected = rejectButton && (new RegExp('btn_'+buttonValue+'$')).test(rejectButton),
                returnObject = {
                    itsamessage: itsamessage,
                    button: buttonValue
                };
/*jshint expr:true */
            rejected ? itsamessage.rejectPromise(returnObject) : itsamessage.resolvePromise(returnObject);
/*jshint expr:false */
        })
    );
    panels[INFO].render();
    panels[WARN].render();
    panels[ERROR].render();
};

ITSADialog.prototype.viewMessage = function(itsamessage) {
    var instance = this;
    return instance.renderPromise().then(
        function() {
            return new Y.Promise(function (resolve) {
console.log('******* INSIDE THE viewMessage PROMISE *******');
                var level = itsamessage.get('level'),
                    primarybutton = itsamessage.get('primaryButton'),
                    panels = instance.panels,
                    panel = panels[level],
                    noButtons = itsamessage.get('noButtons'),
                    footer = itsamessage.get(FOOTER),
                    footerHasButtons = /btn_/.test(footer),
                    footerview, removePrimaryButton;
console.log('******* PASSED TROUBLESOME CODE viewMessage PROMISE *******');
                panels[INFO].hide();
                panels[WARN].hide();
                panels[ERROR].hide();
                panel = panels[level];
//                panel.set('closable', !footerHasButtons || !noButtons);
                panel.set(TITLE+'Right', (footerHasButtons || noButtons) ? '' : null); // remove closebutton by setting '', or retreive by setting null
                panel.set('template', itsamessage.get('message'));
                panel.set(FOOTER+'Template', (noButtons ? null : footer));
                if (!noButtons && footer && Lang.isValue(primarybutton)) {
                    footerview = panel.get('footerView');
                    removePrimaryButton = (typeof primarybutton === 'boolean') && !primarybutton;
/*jshint expr:true */
                    removePrimaryButton ? footerview.removePrimaryButton() : footerview.setPrimaryButton(primarybutton);
/*jshint expr:false */
                }
                panel.set(MODEL, itsamessage);
                panel.set(TITLE, itsamessage.get(TITLE));
                // resolve viewMessagePromise when itsamessage.promise gets fulfilled --> so the next message from the queue will rise up
                itsamessage.promise.then(
                    null,
                    function() {
                        return true; // making viewMessage fullfil
                    }
                ).then(
                    function() {
                        itsamessage.UIToModel();
                        resolve(itsamessage);
                    }
                );
                panel.show();
            });
        }
    );
};

ITSADialog.prototype.resurrect = function(level) {
    var instance = this;
    instance.renderPromise().then(
        function() {
            var panel = instance.panels[level];
        /*jshint expr:true */
            panel && panel.show();
        /*jshint expr:false */
        }
    );
};

ITSADialog.prototype.destructor = function() {
    var panels = this.panels;
    this._clearEventhandlers();
    panels[INFO].destroy();
    panels[WARN].destroy();
    panels[ERROR].destroy();
};

/**
 * Cleaning up all eventlisteners
 *
 * @method _clearEventhandlers
 * @private
 * @since 0.3
 *
*/
ITSADialog.prototype._clearEventhandlers = function() {

    var instance = this;
    YArray.each(
        instance._eventhandlers,
        function(item){
            item.detach();
        }
    );
};

// define 1 global messagecontroller
/*jshint expr:true */
Y.Global.ITSADialog || (Y.Global.ITSADialog=new ITSADialog({handleAnonymous: true}));
/*jshint expr:false */
Y.ITSADialog = Y.Global.ITSADialog;

}, '@VERSION@', {
    "requires": [
        "yui-base",
        "promise",
        "event-custom-base",
        "yui-later",
        "oop",
        "gallery-itsaviewmodelpanel",
        "gallery-itsamodulesloadedpromise",
        "gallery-itsamessageviewer"
    ],
    "skinnable": true
});
