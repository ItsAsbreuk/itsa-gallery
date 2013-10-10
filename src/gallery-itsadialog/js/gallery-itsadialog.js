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
    ERROR = 'error',
    VALUE = 'value';

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
            minWidth: 200,
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
                itsamessage = panel.get(MODEL),
                buttonNode = e.buttonNode,
                buttonValue = buttonNode && buttonNode.get(VALUE);
            itsamessage.resolvePromise(buttonValue);
        })
    );
    eventhandlers.push(
        panels[WARN].on('*:hide', function(e) {
            var panel = e.target,
                itsamessage = panel.get(MODEL),
                buttonNode = e.buttonNode,
                buttonValue = buttonNode && buttonNode.get(VALUE);
            itsamessage.resolvePromise(buttonValue);
        })
    );
    eventhandlers.push(
        panels[ERROR].on('*:hide', function(e) {
            var panel = e.target,
                itsamessage = panel.get(MODEL),
                buttonNode = e.buttonNode,
                buttonValue = buttonNode && buttonNode.get(VALUE);
            itsamessage.resolvePromise(buttonValue);
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
            return new Y.Promise(function (resolve, reject) {
                var level = itsamessage.get('level'),
                    primarybutton = itsamessage.get('primarybutton'),
                    panels = instance.panels,
                    panel = panels[level],
                    footer = itsamessage.get(FOOTER),
                    footerHasButtons = /btn_/.test(footer),
                    footerview;
                panels[INFO].hide();
                panels[WARN].hide();
                panels[ERROR].hide();
                panel = panels[level];
                panel.set(TITLE+'Right', footerHasButtons ? '' : null); // remove closebutton by setting '', or retreive by setting null
                panel.set('template', itsamessage.get('message'));
                panel.set(FOOTER+'Template', footer);
                if (footer && primarybutton) {
                    footerview = panel.get('footerView');
                    footerview.setPrimaryButton(primarybutton);
    //                footerview.render(); // rerender because we have a new primary button
                }
                panel.set(MODEL, itsamessage);
                panel.set(TITLE, itsamessage.get(TITLE));
                panel.once(
                    '*:hide',
                    function() {
                        resolve();
                    }
                );
                panel.show();
            });
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

