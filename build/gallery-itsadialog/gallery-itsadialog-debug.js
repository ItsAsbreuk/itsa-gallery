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
    ICON_TEMPLATE = '<i class="itsa-dialogicon {icon}"></i>',
    SUSPENDED = 'suspended',
    BOOLEAN = 'boolean',
    MODEL = 'model',
    TITLE = 'title',
    FOOTER = 'footer',
    INFO = 'info',
    WARN = 'warn',
    ERROR = 'error',
    VALUE = 'value',
    UPPERCASE = 'uppercase',
    LOWERCASE = 'lowercase',
    CAPITALIZE = 'capitalize',
    ITSADIALOG = 'itsa-dialog',
    ESCAPE_HIDE_EVENT = 'escape:hide',
    VISIBLE = 'visible',
    TRANSFORM = 'Transform',
    BUTTONTRANSFORM = 'button'+TRANSFORM,
    LABELTRANSFORM = 'label'+TRANSFORM,

PARSED = function (response) {
    if (typeof response === 'string') {
        try {
            return Y.JSON.parse(response);
        } catch (ex) {
            this.fire(ERROR, {
                error   : ex,
                response: response,
                src     : 'parse'
            });
            return {};
        }
    }
    return response || {};
};

function ITSADialog() {
    ITSADialog.superclass.constructor.apply(this, arguments);
}

ITSADialog.NAME = 'itsadialog';

Y.extend(ITSADialog, Y.ITSAMessageViewer, {}, {
    ATTRS: {
        /**
         * CSS text-transform of all buttons. Should be:
         * <ul>
         *   <li>null --> leave as it is</li>
         *   <li>uppercase</li>
         *   <li>lowercase</li>
         *   <li>capitalize --> First character uppercase, the rest lowercase</li>
         * </ul>
         *
         * @attribute buttonTransform
         * @default null
         * @type {String}
         */
        buttonTransform: {
            value: null,
            validator: function(val) {
                return (val===null) || (val===UPPERCASE) || (val===LOWERCASE) || (val===CAPITALIZE);
            }
        },
        /**
         * CSS text-transform of all label-elements. Should be:
         * <ul>
         *   <li>null --> leave as it is</li>
         *   <li>uppercase</li>
         *   <li>lowercase</li>
         *   <li>capitalize --> First character uppercase, the rest lowercase</li>
         * </ul>
         *
         * @attribute labelTransform
         * @default null
         * @type {String}
         */
        labelTransform: {
            value: null,
            validator: function(val) {
                return (val===null) || (val===UPPERCASE) || (val===LOWERCASE) || (val===CAPITALIZE);
            }
        },
        /**
         * Whether to show large icons on the panels (before the message).<br>
         * Can be overruled per message.
         *
         * @attribute showIcon
         * @type {Boolean}
         * @default true
         */
        showIcon : {
            value: true,
            validator: function(val) {
                return (typeof val===BOOLEAN);
            }
        }
    }
});

ITSADialog.prototype.initializer = function() {
    var instance = this;
    instance._eventhandlers = [];
    Y.later(RENDERDELAY, instance, instance.renderPromise);
};

ITSADialog.prototype.renderPromise = function() {
    var instance = this;
    return instance._renderPromise || (instance._renderPromise = Y.usePromise('gallery-itsaviewmodelpanel', 'gallerycss-itsa-dialog').then(
                                                                    Y.bind(instance._renderPanels, instance)
                                                                 ));
};

ITSADialog.prototype._renderPanels = function() {
    var instance = this,
        config = {
            visible:  false,
            centered: true,
            modal:    true,
            editable: true,
            minWidth: 200,
            dragable: true,
            maxWidth: 550,
            buttonTransform: instance.get(BUTTONTRANSFORM),
            labelTransform: instance.get(LABELTRANSFORM),
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
                rejectButton = itsamessage.rejectButton,
                closedByClosebutton = buttonNode.hasClass('itsa-panelclosebtn'),
                closebuttonForgot = closedByClosebutton && (buttonNode.getAttribute('data-itsaforgot')==='true'),
                rejected = (e.type===ESCAPE_HIDE_EVENT) || (closedByClosebutton && !closebuttonForgot) || (rejectButton && (new RegExp('btn_'+buttonValue+'$')).test(rejectButton)),
                forgotMessage;
            if (rejected) {
                itsamessage.rejectPromise(buttonValue);
            }
            else {
                // should it be the 'forgot-button', then we need to show the forgot-panel
                if (buttonNode && (buttonNode.getAttribute('data-itsalogin')==='forgotbutton')) {
console.log('forgotbutton');
                    forgotMessage = itsamessage.forgotMessage;
/*jshint expr:true */
                    forgotMessage ? instance._showPanel(panel, forgotMessage) : itsamessage.rejectPromise(buttonValue);
/*jshint expr:false */
                }
                else if (buttonValue==='forgotusername') {
console.log('forgot username');
                    forgotMessage = itsamessage.forgotMessage;
/*jshint expr:true */
                    forgotMessage ? instance._showPanel(panel, forgotMessage) : itsamessage.rejectPromise(buttonValue);
/*jshint expr:false */
                }
                else if (buttonValue==='forgotpassword') {
console.log('forgot password');
                    forgotMessage = itsamessage.forgotMessage;
/*jshint expr:true */
                    forgotMessage ? instance._showPanel(panel, forgotMessage) : itsamessage.rejectPromise(buttonValue);
/*jshint expr:false */
                }
                else if (closebuttonForgot) {
console.log('close forgot');
                    forgotMessage = itsamessage.forgotMessage;
/*jshint expr:true */
                    forgotMessage ? instance._showPanel(panel, forgotMessage) : itsamessage.rejectPromise(buttonValue);
/*jshint expr:false */
                }
                else if (buttonValue==='sendusername') {
console.log('send username');
                    forgotMessage = itsamessage.forgotMessage;
/*jshint expr:true */
                    forgotMessage ? instance._showPanel(panel, forgotMessage) : itsamessage.rejectPromise(buttonValue);
/*jshint expr:false */
                }
                else if (buttonValue==='resetpassword') {
console.log('reset password');
                    forgotMessage = itsamessage.forgotMessage;
/*jshint expr:true */
                    forgotMessage ? instance._showPanel(panel, forgotMessage) : itsamessage.rejectPromise(buttonValue);
/*jshint expr:false */
                }
                else {
                    // moste cases: resolve dialog
                    itsamessage.UIToModel();
                    itsamessage._set('button', buttonValue);
                    itsamessage.resolvePromise(itsamessage.toJSON());
                }
            }
        })
    );

    eventhandlers.push(
        panels[INFO].after('*:submit', function(e) {
            var itsamessage = e.target;
            // Cautious: e.response is NOT available in the after-bubble chain --> see Y.ITSAFormModel - know issues
            e.promise.then(
                function(response) {
                    var responseObj = PARSED(response),
                        panel = panels[INFO],
                        contentBox, message, facade;
                    if (responseObj && responseObj.status) {
                        if (responseObj.status==='OK') {
                            itsamessage._set('button', 'submit');
                            itsamessage.resolvePromise(itsamessage.toJSON());
                        }
                        else if (responseObj.status==='BLOCKED') {
                            message = responseObj.message || 'Login is blocked';
                            // production-errors will be shown through the messagecontroller
                            Y.showError(responseObj.title || 'error', message);
                            itsamessage.rejectPromise(message);
                        }
                        else if (responseObj.status==='RETRY') {
            /*jshint expr:true */
                            responseObj.title && panel.set('title', responseObj.title);
            /*jshint expr:false */
                            if (responseObj.message) {
                                contentBox = panel.get('contentBox');
                                contentBox.one('#itsa-messagewrapper').setHTML(responseObj.message);
                            }
                        }
                        else {
                            // program-errors will be shown by fireing events. They can be seen by using Y.ITSAErrorReporter
                            message = 'Wrong response.status found: '+responseObj.status+'. You should return one of these: OK | RETRY | BLOCKED';
                            facade = {src: 'Y.ITSADialog.submit()', msg: message};
                            panel.fire('warn', facade);
                            itsamessage.rejectPromise(message);
                        }
                    }
                    else {
                        // program-errors will be shown by fireing events. They can be seen by using Y.ITSAErrorReporter
                        message = 'Response returned without response.status';
                        facade = {src: 'Y.ITSADialog.submit()', msg: message};
                        panel.fire('warn', facade);
                        itsamessage.rejectPromise(message);
                    }
                }
            ).then(
                null,
                function(catchErr) {
                    var message = (catchErr && (catchErr.message || catchErr)) || 'Undefined error during submission';
                    // production-errors will be shown through the messagecontroller
                    Y.showWarning(message);
                }
            );
        })
    );

    eventhandlers.push(
        panels[WARN].after('*:hide', function(e) {
            var panel = e.target,
                itsamessage = panel.get(MODEL),
                buttonNode = e.buttonNode,
                buttonValue = buttonNode && buttonNode.get(VALUE),
                rejectButton = itsamessage.rejectButton,
                closedByClosebutton = buttonNode.hasClass('itsa-panelclosebtn'),
                rejected = (e.type===ESCAPE_HIDE_EVENT) || closedByClosebutton || (rejectButton && (new RegExp('btn_'+buttonValue+'$')).test(rejectButton));
/*jshint expr:true */
            rejected ? itsamessage.rejectPromise(buttonValue) : (itsamessage.UIToModel() && itsamessage._set('button', buttonValue) && itsamessage.resolvePromise(itsamessage.toJSON()));
/*jshint expr:false */
        })
    );
    eventhandlers.push(
        panels[ERROR].after('*:hide', function(e) {
            var panel = e.target,
                itsamessage = panel.get(MODEL),
                buttonNode = e.buttonNode,
                buttonValue = buttonNode && buttonNode.get(VALUE),
                rejectButton = itsamessage.rejectButton,
                closedByClosebutton = buttonNode.hasClass('itsa-panelclosebtn'),
                rejected = (e.type===ESCAPE_HIDE_EVENT) || closedByClosebutton || (rejectButton && (new RegExp('btn_'+buttonValue+'$')).test(rejectButton));
/*jshint expr:true */
            rejected ? itsamessage.rejectPromise(buttonValue) : (itsamessage.UIToModel() && itsamessage._set('button', buttonValue) && itsamessage.resolvePromise(itsamessage.toJSON()));
/*jshint expr:false */
        })
    );
    eventhandlers.push(
        instance.on(LABELTRANSFORM+'Change', function(e) {
            var value = e.newVal;
            panels[INFO].set(LABELTRANSFORM, value);
            panels[WARN].set(LABELTRANSFORM, value);
            panels[ERROR].set(LABELTRANSFORM, value);
        })
    );
    eventhandlers.push(
        instance.on(BUTTONTRANSFORM+'Change', function(e) {
            var value = e.newVal;
            panels[INFO].set(BUTTONTRANSFORM, value);
            panels[WARN].set(BUTTONTRANSFORM, value);
            panels[ERROR].set(BUTTONTRANSFORM, value);
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
                var panels = instance.panels,
                    panel = panels[itsamessage.level];
                instance._showPanel(panel, itsamessage);
                itsamessage.promise.then(
                    function() {
                        Y.log('viewmessage level '+itsamessage.level+' will hide', 'info', 'ITSA-MessageViewer');
                        return panel.set(VISIBLE, false, {silent: true});
                    },
                    function() {
                        Y.log('viewmessage '+itsamessage.level+' will hide because of rejection', 'info', 'ITSA-MessageViewer');
                        return panel.set(VISIBLE, false, {silent: true});
                    }
                ).then(
                    resolve
                ).then(
                    null,
                    function(err) {
                        Y.soon(function () {
                            throw err;
                        });
                    }
                );
            });
        }
    );
};

ITSADialog.prototype._showPanel = function(panel, itsamessage) {
    var instance = this,
        primarybutton = itsamessage.primaryButton,
        rejectbutton = itsamessage.rejectButton,
        buttonLabels = itsamessage.buttonLabels,
        hotKeys = itsamessage.hotKeys,
        customBtns = itsamessage.customBtns,
        noButtons = itsamessage.noButtons,
        noHideOnSubmit = (typeof itsamessage.noHideOnSubmit === BOOLEAN) ? itsamessage.noHideOnSubmit : false,
        footer = itsamessage[FOOTER],
        footerHasButtons = /btn_/.test(footer),
        messageIcon = itsamessage.icon,
        showIcon = messageIcon && instance.get('showIcon'),
        footerview, removePrimaryButton;
        Y.log('start viewmessage '+itsamessage.level, 'info', 'ITSA-MessageViewer');
    panel.set('noHideOnSubmit', noHideOnSubmit);
    panel.removeButtonLabel();
    panel.removeCustomBtn();
    panel.removeHotKey();
    panel.set('closeButton', itsamessage.closeButton || (!footerHasButtons && !noButtons));
    panel.set('closableByEscape', (typeof rejectbutton === 'string'));
    panel.set(FOOTER+'Template', (noButtons ? null : footer));
    // next statemenst AFTER defining the footerview!
/*jshint expr:true */
    buttonLabels && panel.setButtonLabels(buttonLabels);
    hotKeys && panel.setHotKeys(hotKeys);
    customBtns && panel.addCustomBtns(customBtns);
/*jshint expr:false */
    if (!noButtons && footer && Lang.isValue(primarybutton)) {
        footerview = panel.get('footerView');
        removePrimaryButton = (typeof primarybutton === 'boolean') && !primarybutton;
/*jshint expr:true */
        removePrimaryButton ? footerview.removePrimaryButton() : footerview.setPrimaryButton(primarybutton);
/*jshint expr:false */
    }
    panel.set(TITLE, itsamessage[TITLE]);
    // set the model BEFORE setting the template --> Y.Slider would go wrong otherwise
    panel.set(MODEL, itsamessage);
    panel._body.toggleClass('itsa-hasicon', showIcon);
    panel.set('template', (showIcon ? Lang.sub(ICON_TEMPLATE, {icon: messageIcon}) : '')+itsamessage.message);
    // resolve viewMessagePromise when itsamessage.promise gets fulfilled --> so the next message from the queue will rise up
    // also: hide the panel --> this might have been done by the *:hide - event, but one might also have fulfilled the promise directly
    // in which case the panel needs to be hidden manually
    Y.log(itsamessage[SUSPENDED] ? ('viewmessage level '+itsamessage.level+' not shown: SUSPENDED') : ('viewmessage about to show level '+itsamessage.level), 'info', 'ITSA-MessageViewer');
/*jshint expr:true */
    itsamessage[SUSPENDED] || panel.show();
/*jshint expr:false */
};

ITSADialog.prototype.resurrect = function(itsamessage) {
    var instance = this;
    instance.renderPromise().then(
        function() {
            var panel = instance.panels[itsamessage.level];
        /*jshint expr:true */
            Y.log('viewmessage level '+itsamessage.level+' about to show by resurrect', 'info', 'ITSA-MessageViewer');
            panel && panel.set(VISIBLE, true, {silent: true});
        /*jshint expr:false */
        }
    );
};

ITSADialog.prototype.suspend = function(itsamessage) {
    var instance = this;
    instance.renderPromise().then(
        function() {
            var panel = instance.panels[itsamessage.level];
            Y.log('viewmessage level '+itsamessage.level+' about to hide by suspend', 'info', 'ITSA-MessageViewer');
        /*jshint expr:true */
            panel && panel.set(VISIBLE, false, {silent: true});
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
    Y.log('_clearEventhandlers', 'info', 'ITSA-ViewModelPanel');

    var instance = this;
    YArray.each(
        instance._eventhandlers,
        function(item){
            item.detach();
        }
    );
};

// define 1 global itsadialog
/*jshint expr:true */
Y.Global.ITSADialog || (Y.Global.ITSADialog=new ITSADialog());
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
