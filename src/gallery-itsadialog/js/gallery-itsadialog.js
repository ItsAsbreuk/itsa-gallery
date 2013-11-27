'use strict';

/*jshint maxlen:200 */

/**
 *
 * @module gallery-itsadialog
 * @extends ITSAMessageViewer
 * @class ITSADialog
 * @constructor
 * @since 0.2
 *
 * Copyright (c) 2013 Marco Asbreuk - http://theinternetwizard.net
 * YUI BSD License - http://developer.yahoo.com/yui/license.html
 *
*/

var YArray = Y.Array,
    Lang = Y.Lang,
    MINWIDTHPANEL = 335,
    RENDERDELAY = 5000,
    ICON_TEMPLATE = '<i class="itsa-dialogicon {icon}"></i>',
    SUSPENDED = '_suspended',
    BOOLEAN = 'boolean',
    STRING = 'string',
    NUMBER = 'number',
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
    FADEDELAY = 'fadeDelay',
    ITSA = 'itsa',
    DIALOG = 'dialog',
    ITSADIALOG = ITSA+DIALOG,
    ITSA_DIALOG = ITSA+'-'+DIALOG,
    ESCAPE_HIDE_EVENT = 'escape:hide',
    VISIBLE = 'visible',
    ITSA_PANELCLOSEBTN = 'itsa-panelclosebtn',
    CLOSEBUTTON = 'closebutton',
    BTN_ = 'btn_',
    BUTTON = 'button',
    CHANGE = 'Change',
    TRANSFORM = 'Transform',
    BUTTONTRANSFORM = BUTTON+TRANSFORM,
    LABELTRANSFORM = 'label'+TRANSFORM,
    UP = 'up',
    ITSA_DIALOG_INFO_UP = ITSA_DIALOG+INFO+UP,
    ITSA_DIALOG_WARN_UP = ITSA_DIALOG+WARN+UP,
    ITSA_DIALOG_ERROR_UP = ITSA_DIALOG+ERROR+UP;

function ITSADialog() {
    ITSADialog.superclass.constructor.apply(this, arguments);
}

ITSADialog.NAME = 'itsadialog';

Y.ITSADialogClass = Y.extend(ITSADialog, Y.ITSAMessageViewer, {}, {
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
         * Duration of panels popup fading-transition in seconds. Set to zero for no transition.
         *
         * @attribute fadeDelay
         * @type {Boolean}
         * @default 0.1
         */
        fadeDelay : {
            value: 0.1,
            validator: function(val) {
                return (typeof val===NUMBER) && (val>=0);
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

/**
 * @method initializer
 * @protected
 * @since 0.2
*/
ITSADialog.prototype.initializer = function() {
    Y.log('initializer', 'info', 'ITSADialog');
    var instance = this;

    /**
     * Array with internal eventsubscribers.
     * @property _eventhandlers
     * @default []
     * @type Array
     * @private
     */
    instance._eventhandlers = [];

    /**
     * Reference to the body-node.
     * @property _body
     * @default Y.one('body')
     * @type Node
     * @private
     */
    instance._body = Y.one('body');

    /**
     * Objects that holds the 3 Y.ITSAViweModelPanel-instances for the levels 'info', 'warn' and 'error'.
     * @property _panels
     * @default {info: Y.ITSAViewModelPanel, warn: Y.ITSAViewModelPanel, error: Y.ITSAViewModelPanel}
     * @type Object
     * @private
     */
    instance._panels = {};

    // set the viewName to 'itsadialog', to make sure nontargeted messages are targeted to this module.
    instance._viewName = ITSADIALOG;
    Y.later(RENDERDELAY, instance, instance.isRendered);
};

/**
 * Promise that is resolved once all internal dialog-panels are rendered and ready to use.
 *
 * @method isRendered
 * @return {Y.Promise} resolves when everything is rendered.
 * @since 0.2
*/
ITSADialog.prototype.isRendered = function() {
    Y.log('isRendered', 'info', 'ITSADialog');
    var instance = this;
    return instance._renderPromise || (instance._renderPromise = Y.usePromise('gallery-itsaviewmodelpanel', 'gallerycss-itsa-dialog', 'gallerycss-itsa-form').then(
                                                                    Y.bind(instance._renderPanels, instance)
                                                                 ));
};

/**
 * Makes the panel-instance -that belongs to the message- show up again, after it has been suspended.<br>
 * Inherited and overruled from Y.ITSAMessageViewer
 *
 * @method resurrect
 * @param itsamessage {Y.ITSAMessage} the Y.ITSAMessage-instance to be viewed.
 * @since 0.2
*/
ITSADialog.prototype.resurrect = function(itsamessage) {
    Y.log('resurrect', 'info', 'ITSADialog');
    var instance = this;
    instance.isRendered().then(
        function() {
            var panel = instance._panels[itsamessage.level];
        /*jshint expr:true */
            Y.log('viewmessage level '+itsamessage.level+' about to show by resurrect', 'info', 'ITSA-MessageViewer');
            if (panel) {
                panel.set(VISIBLE, true, {transconfig: {duration: instance.get(FADEDELAY)}});
            }
        }
    );
};

/**
 * Makes the panel-instance -that belongs to the message- to hide, in order for a mesage at a higher level to show up.<br>
 * Inherited and overruled from Y.ITSAMessageViewer
 *
 * @method suspend
 * @param itsamessage {Y.ITSAMessage} the Y.ITSAMessage-instance to be viewed.
 * @since 0.2
*/
ITSADialog.prototype.suspend = function(itsamessage) {
    Y.log('suspend', 'info', 'ITSADialog');
    var instance = this;
    instance.isRendered().then(
        function() {
            var panel = instance._panels[itsamessage.level];
            Y.log('viewmessage level '+itsamessage.level+' about to hide by suspend', 'info', 'ITSA-MessageViewer');
        /*jshint expr:true */
            panel && panel.set(VISIBLE, false);
        /*jshint expr:false */
        }
    );
};

/**
 * Views the message<br>
 * Inherited and overruled from Y.ITSAMessageViewer
 *
 * @method viewMessage
 * @param itsamessage {Y.ITSAMessage} the Y.ITSAMessage-instance to be viewed.
 * @return {Y.Promise} will resolve when Y.ITSAMessage._promise gets fulfilled.
 * @since 0.2
*/
ITSADialog.prototype.viewMessage = function(itsamessage) {
    Y.log('viewMessage '+itsamessage.message, 'info', 'ITSADialog');
    var instance = this;
    return instance.isRendered().then(
        function() {
            return new Y.Promise(function (resolve) {
                var panels = instance._panels,
                    panel = panels[itsamessage.level];
                instance._showPanel(panel, itsamessage);
                itsamessage._promise.then(
                    function() {
                        Y.log('viewmessage level '+itsamessage.level+' will hide', 'info', 'ITSA-MessageViewer');
                        return panel.set(VISIBLE, false);
                    },
                    function() {
                        Y.log('viewmessage '+itsamessage.level+' will hide because of rejection', 'info', 'ITSA-MessageViewer');
                        return panel.set(VISIBLE, false);
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

/**
 * Cleans up bindings
 * @method destructor
 * @protected
 * @since 0.2
*/
ITSADialog.prototype.destructor = function() {
    Y.log('destructor', 'info', 'ITSADialog');
    var panels = this._panels;
    this._clearEventhandlers();
    panels[INFO].destroy();
    panels[WARN].destroy();
    panels[ERROR].destroy();
};

//--- private methods ---------------------------------------------------

/**
 * Cleaning up all eventlisteners
 *
 * @method _clearEventhandlers
 * @private
 * @since 0.3
 *
*/
ITSADialog.prototype._clearEventhandlers = function() {
    Y.log('_clearEventhandlers', 'info', 'ITSADialog');
    var instance = this;
    YArray.each(
        instance._eventhandlers,
        function(item){
            item.detach();
        }
    );
};

/**
 * Renderes 3 panels: info-panel, warn-panel and error-panel.
 *
 * @method _renderPanels
 * @private
 * @since 0.2
*/
ITSADialog.prototype._renderPanels = function() {
    Y.log('_renderPanels', 'info', 'ITSADialog');
    var instance = this,
        config = {
            visible:  false,
            centered: true,
            modal:    true,
            editable: true,
            minWidth: MINWIDTHPANEL,
            dragable: true,
            maxWidth: 550,
            buttonTransform: instance.get(BUTTONTRANSFORM),
            labelTransform: instance.get(LABELTRANSFORM),
            className: ITSA_DIALOG
        },
        panels = instance._panels,
        eventhandlers = instance._eventhandlers,
        panelinfo, panelwarn, panelerror;
    panelinfo = panels[INFO] = new Y.ITSAViewModelPanel(config);
    panelwarn = panels[WARN] = new Y.ITSAViewModelPanel(config);
    panelerror = panels[ERROR] = new Y.ITSAViewModelPanel(config);

    YArray.each(
        [INFO, WARN, ERROR],
        function(panellevel) {
            eventhandlers.push(
                panels[panellevel].after('*:hide', function(e) {
                    var panel = e.target,
                        itsamessage = panel.get(MODEL),
                        buttonNode = e.buttonNode,
                        buttonValue = buttonNode && buttonNode.get(VALUE),
                        rejectButton = itsamessage.rejectButton,
                        closedByClosebutton = buttonNode && buttonNode.hasClass(ITSA_PANELCLOSEBTN) && (buttonValue=CLOSEBUTTON),
                        rejected = (e.type===ESCAPE_HIDE_EVENT) || closedByClosebutton || (rejectButton && (new RegExp(BTN_+buttonValue+'$')).test(rejectButton));
                        itsamessage.UIToModel();
                        itsamessage._set(BUTTON, buttonValue);
/*jshint expr:true */
                    rejected ? itsamessage.reject(buttonValue) : (itsamessage.resolve(itsamessage.toJSON()));
/*jshint expr:false */
                })
            );
        }
    );

    eventhandlers.push(
        instance.on(LABELTRANSFORM+CHANGE, function(e) {
            var value = e.newVal;
            panelinfo.set(LABELTRANSFORM, value);
            panelwarn.set(LABELTRANSFORM, value);
            panelerror.set(LABELTRANSFORM, value);
        })
    );
    eventhandlers.push(
        instance.on(BUTTONTRANSFORM+CHANGE, function(e) {
            var value = e.newVal;
            panelinfo.set(BUTTONTRANSFORM, value);
            panelwarn.set(BUTTONTRANSFORM, value);
            panelerror.set(BUTTONTRANSFORM, value);
        })
    );
    eventhandlers.push(
        panelinfo.on(VISIBLE+CHANGE, function(e) {
            instance._body.toggleClass(ITSA_DIALOG_INFO_UP, e.newVal);
        })
    );
    eventhandlers.push(
        panelwarn.on(VISIBLE+CHANGE, function(e) {
            instance._body.toggleClass(ITSA_DIALOG_WARN_UP, e.newVal);
        })
    );
    eventhandlers.push(
        panelerror.on(VISIBLE+CHANGE, function(e) {
            instance._body.toggleClass(ITSA_DIALOG_ERROR_UP, e.newVal);
        })
    );
    panelinfo.render();
    panelwarn.render();
    panelerror.render();
};

/**
 * Sets the right attributes for the panel (fitting the message) and makes the panel-instance visible.
 *
 * @method _showPanel
 * @param panel {ITSAViewModelPanel} the panelinstance to be shown.
 * @param itsamessage {Y.ITSAMessage} the Y.ITSAMessage-instance to be viewed.
 * @private
 * @since 0.2
*/
ITSADialog.prototype._showPanel = function(panel, itsamessage) {
    Y.log('_showPanel', 'info', 'ITSADialog');
    var instance = this,
        primarybutton = itsamessage.primaryButton,
        rejectbutton = itsamessage.rejectButton,
        buttonLabels = itsamessage.buttonLabels,
        hotKeys = itsamessage.hotKeys,
        customBtns = itsamessage.customBtns,
        noButtons = itsamessage.noButtons,
        closeButton = itsamessage.closeButton,
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
    // careful: CLOSEBUTTON === 'closebutton' and NOT 'closeButton'
    panel.set('closeButton', (typeof closeButton === BOOLEAN) ? closeButton : (!footerHasButtons && !noButtons));
    panel.set('closableByEscape', (typeof rejectbutton === STRING));
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
    Y.log(itsamessage[SUSPENDED] ? ('viewmessage level '+itsamessage.level+' not shown: SUSPENDED') : ('viewmessage about to show level '+itsamessage.level), 'info', 'ITSA-MessageViewer');
/*jshint expr:true */
    itsamessage[SUSPENDED] || panel.show({duration: instance.get(FADEDELAY)});
/*jshint expr:false */
};

// define 1 global itsadialog
/*jshint expr:true */
Y.Global.ITSADialog || (Y.Global.ITSADialog=new ITSADialog());
/*jshint expr:false */
Y.ITSADialog = Y.Global.ITSADialog;