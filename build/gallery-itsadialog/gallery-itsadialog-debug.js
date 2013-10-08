YUI.add('gallery-itsadialog', function (Y, NAME) {

'use strict';

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
    RENDERDELAY = 5000,
    MODEL = 'model',
    TITLE = 'title',
    FOOTER = 'footer',
    INFO = 'info',
    WARN = 'warn',
    ERROR = 'error';

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
            dragable: true
        },
        eventhandlers = instance._eventhandlers,
        panels;
    panels = instance.panels = {};
    panels[INFO] = new Y.ITSAViewModelPanel(config);
    panels[WARN] = new Y.ITSAViewModelPanel(config);
    panels[ERROR] = new Y.ITSAViewModelPanel(config);
    eventhandlers.push(
        panels[INFO].on('*:hide', function(e) {
            var panel = e.target,
                itsamessage = panel.get(MODEL);
            itsamessage.resolvePromise();
        })
    );
    eventhandlers.push(
        panels[WARN].on('*:hide', function(e) {
            var panel = e.target,
                itsamessage = panel.get(MODEL);
            itsamessage.resolvePromise();
        })
    );
    eventhandlers.push(
        panels[ERROR].on('*:hide', function(e) {
            var panel = e.target,
                itsamessage = panel.get(MODEL);
            itsamessage.resolvePromise();
        })
    );
    panels[INFO].render();
    panels[WARN].render();
    panels[ERROR].render();
};

ITSADialog.prototype.viewMessage = function(itsamessage) {
    var instance = this;
    instance.renderPromise().then(
        function() {
           // var level = itsamessage.get('level'),
            var level = INFO,
                panels = instance.panels,
                panel = panels[level];
            panels[INFO].hide();
            panels[WARN].hide();
            panels[ERROR].hide();
            panel = panels[level];
            panel.set(TITLE, itsamessage.get(TITLE));
            panel.set('template', itsamessage.get('message'));
            panel.set(FOOTER+'Template', itsamessage.get(FOOTER));
            panel.set(MODEL, itsamessage);
            panel.show();
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
    Y.log('_clearEventhandlers', 'info', 'ITSA-ViewModelPanel');

    var instance = this;
    YArray.each(
        instance._eventhandlers,
        function(item){
            item.detach();
        }
    );
};

// define 1 global messagecontroller
YUI.Env.ITSADialog = new ITSADialog({handleAnonymous: true});



}, '@VERSION@', {
    "requires": [
        "yui-base",
        "promise",
        "event-custom-base",
        "yui-later",
        "oop",
        "gallery-itsamodulesloadedpromise",
        "gallery-itsamessageviewer"
    ]
});
