'use strict';

/*jshint maxlen:200 */

/**
 *
 * Extends Y.Model by adding methods through which they can create editable form-elements, which represent and are bound to the propery-value.
 * This model is for defining the UI-structure for all Model's properties and for firing model-events for
 * Y.ITSAFormModel does not rendering to the dom itself. That needs to be done by an Y.View-instance, like Y.ITSAViewModel.
 *
 * @module gallery-itsamessage
 * @extends ITSAFormModel
 * @class ITSAMessage
 * @constructor
 * @since 0.1
 *
 * <i>Copyright (c) 2013 Marco Asbreuk - http://itsasbreuk.nl</i>
 * YUI BSD License - http://developer.yahoo.com/yui/license.html
 *
*/

var ITSAMessage,
    MESSAGE = 'message',
    MESSAGEREJECT = MESSAGE+'reject',
    MESSAGERESOLVE = MESSAGE+'resolve',
    MIN_TIMEOUT = 1000;

ITSAMessage = Y.ITSAMessage = Y.Base.create('itsamessage', Y.ITSAFormModel, [], {
    initializer: function() {
        var instance = this;

        /**
         * Array of objects with properties buttons.buttonType and buttonConfig.labelHTML, that passes through to Y.ITSAViewModelPanel.setButtonLabels
         * and overrules the labels of the specified buttons.
         * @property buttonLabels
         * @default null
         * @type Array
         */
        /**
         * Whether the closebutton should be visible.
         * @property closeButton
         * @default true
         * @type Boolean
         */
        /**
         * Array of objects with properties buttons.buttonId, buttons.labelHTML and optionally buttonConfig.config, that passes through to Y.ITSAViewModelPanel.addCustomBtns.
         * Is used to define custom buttons.
         * @property customBtns
         * @default null
         * @type Array
         */
        /**
         * Footertemplate
         * @property footer
         * @default null
         * @type String
         */
        /**
         * Array of objects with properties buttons.buttonType and buttonConfig.hotkey, that passes through to Y.ITSAViewModelPanel.setHotkeys.
         * Is used to define custom hotkeys.
         * @property hotKeys
         * @default null
         * @type Node
         */
        /**
         * The icon that should be used left-next to the message.
         * @property icon
         * @default null
         * @type String
         */
        /**
         * Whether to use imagebuttons.
         * @property imageButtons
         * @default false
         * @type Boolean
         */
        /**
         * The level of the message. Either 'info', 'warn' or 'error'.
         * @property level
         * @default 'info'
         * @type String
         */
        /**
         * The message to be appeared.
         * @property message
         * @default ''
         * @type String
         */
        /**
         * Identification of the messagetype. This might be useful for Y.ITSAMessageViewer decsendants to determine if they should handle the message.
         * @property messageType
         * @default null
         * @type String
         */
        /**
         * Whether to completely ignore any button. Using this, you need to fulfill the Y.ITSAMessage-instance by timer, or by calling resolve() or reject().
         * @property noButtons
         * @default false
         * @type Boolean
         */
        /**
         * Flag that tells to remain the message when submitted. Using this, you need to fulfill the Y.ITSAMessage-instance by timer, or by calling resolve() or reject().
         * @property noHideOnSubmit
         * @default true
         * @type Boolean
         */
        /**
         * Definition of the primary button.
         * @property primaryButton
         * @default null
         * @type String
         */
        /**
         * Flag that gives the message high-priority in the messagequeque.
         * @property priority
         * @default false
         * @type Boolean
         */
        /**
         * Definition of the reject-button. A userclick on this button should make itsamessage._promise to reject.
         * @property rejectButton
         * @default null
         * @type String
         */
        /**
         * Soundfile that should be playes when the message is shown.
         * @property soundfile
         * @default null
         * @type String
         */
        /**
         * Definition of the sender of the message.
         * @property source
         * @default 'application'
         * @type String
         */
        /**
         * Target to NAME-property of the widget that should handle the message.
         * @property target
         * @default null
         * @type String
         */
        /**
         * Number of ms after which the Y.ITSAMessage-instance should be rejected. Measured to the actual display-time.
         * @property timeoutReject
         * @default null
         * @type Number
         */
        /**
         * Number of ms after which the Y.ITSAMessage-instance should be resolved. Measured to the actual display-time.
         * @property timeoutResolve
         * @default null
         * @type Number
         */
        /**
         * The title of the message.
         * @property title
         * @default null
         * @type String
         */

        //--- private properties ---------------------------------------------------

        /**
         * Copy of the config that was passed through by a parent-method.
         * @property _config
         * @default {}
         * @type Object
         * @private
         */
        /**
         * Flag that tells whether the instance is currently processed by an Y.ITSAMessageViewer.
         * @property _processing
         * @default false
         * @type Boolean
         * @private
         */
        /**
         * Internal Promise that holds the state of being processed.
         * @property _promise
         * @default null
         * @type Y.Promise
         * @private
         */
        /**
         * Reference to the reject-callback of this._promise.
         * @property _rejectPromise
         * @default null
         * @type Function
         * @private
         */
        /**
         * Reference to the resolve-callback of this._promise.
         * @property _resolvePromise
         * @default null
         * @type Function
         * @private
         */
        /**
         * Internal backup of the submit-button that was pressed - if appropriate.
         * @property _submitBtn
         * @default null
         * @type String
         * @private
         */
        /**
         * Internal flag that tells whether the instance is a simplemessage that can be proccessed without title, buttons and as simple text.
         * @property _simpleMessage
         * @default false
         * @type Boolean
         * @private
         */
        /**
         * Internal flag that tells whether the instance is a statusmessage that needs to be removed manually.
         * @property _statusMessage
         * @default false
         * @type Boolean
         * @private
         */
        /**
         * Internal flag that tells whether the instance is suspended.
         * @property _suspended
         * @default false
         * @type Boolean
         * @private
         */
        /**
         * Internal timer that hold the numer of ms that a timeout has been executed.
         * @property _timerProcessed
         * @default 0
         * @type Number
         * @private
         */
        /**
         * Time-stamp when the timer was started.
         * @property _timerStart
         * @default null
         * @type Number
         * @private
         */
        /**
         * Internal flag that tells whether the timer is running.
         * @property _timerStopped
         * @default true
         * @type Boolean
         * @private
         */

        instance.closeButton = true;
        instance.imageButtons = false;
        instance.level = 'info';
        instance.message = '';
        instance.noButtons = false;
        instance.noHideOnSubmit = true;
        instance.priority = false; // messages with priority===true appear before messages with priority===false
        instance.source = 'application';

        instance._config = {}; // orriginal config passed trhough
        instance._processing = false;
        instance._simpleMessage = false;
        instance._statusMessage = false;
        instance._suspended = false;
        instance._timerProcessed = 0;
        instance._timerStopped = true;

        // publishing event 'messagereject'
        instance.publish(
            MESSAGEREJECT,
            {
                defaultFn: Y.bind(instance._defRejectFn, instance),
                emitFacade: true
            }
        );
        // publishing event 'messageresolve'
        instance.publish(
            MESSAGERESOLVE,
            {
                defaultFn: Y.bind(instance._defResolveFn, instance),
                emitFacade: true
            }
        );

    },
    destructor: function() {
        Y.log('destructor', 'info', 'ITSAMessageController');
        var instance = this;
        instance.config = {}; // orriginal config passed trhough
/*jshint expr:true */
        instance._timer && instance._timer.cancel();
/*jshint expr:false */
    }
}, {
    ATTRS: {
        /**
         * The button that was pressed (if appropriate). Returnvalue represents the button's-value.
         *
         * @attribute button
         * @type {String}
         * @default null
         */
        button: {
            writeOnce: 'initOnly'
        }
    }
});

/**
 * Makes the message to target the specified messageViewer.
 *
 * @method addTarget
 * @param itsamessageviewer {Y.ITSAMessageViewer}
 * @since 0.1
*/
ITSAMessage.prototype.addTarget = function(itsamessageviewer) {
    Y.log('reject', 'info', 'ITSAMessage');
    this.target = itsamessageviewer;
};

/**
 * Rejects the Y.ITSAMessage. Therefore it will removed from the Y.ITSAMessageController-queue with a Promise-reject callback.
 * Rejects event-driven by firing a 'm'essagereject'-event, which can be listen to and prevented.
 *
 * @method reject
 * @param [reason] {String|Error}
 * @since 0.1
*/
ITSAMessage.prototype.reject = function(reason) {
    Y.log('reject', 'info', 'ITSAMessage');
    this.fire(MESSAGEREJECT, {reason: reason});
};

/**
 * Resolves the Y.ITSAMessage. Therefore it will removed from the Y.ITSAMessageController-queue with a Promise-resolve callback.<br>
 * Resolves event-driven by firing a 'messageresolve'-event, which can be listen to and prevented.
 *
 * @method resolve
 * @param [attrs] {Object} Any properties to be passed through to the resolve-callback. When not set, this.toJSON() will be passed through.
 * @since 0.1
*/
ITSAMessage.prototype.resolve = function(attrs) {
    Y.log('resolve', 'info', 'ITSAMessage');
    this.fire(MESSAGERESOLVE, {attrs: attrs || this.toJSON()});
};

//--- private methods ---------------------------------------------------

/**
 * Default Func for the 'messagereject'-event, which rejects the internal Y.ITSAMessage._promise.
 *
 * @method _defRejectFn
 * @param e {Object} eventfacade
 * @private
 * @since 0.1
*/
ITSAMessage.prototype._defRejectFn = function(e) {
    Y.log('_defRejectFn', 'info', 'ITSAMessage');
    var reject = this._rejectPromise;
/*jshint expr:true */
    reject && reject(e.reason);
/*jshint expr:false */
};

/**
 * Default Func for the 'messageresolve'-event, which resolves the internal Y.ITSAMessage._promise.
 *
 * @method _defRejectFn
 * @param e {Object} eventfacade
 * @private
 * @since 0.1
*/
ITSAMessage.prototype._defResolveFn = function(e) {
    Y.log('_defResolveFn', 'info', 'ITSAMessage');
    var resolve = this._resolvePromise;
/*jshint expr:true */
    resolve && resolve(e.attrs);
/*jshint expr:false */
};

/**
 * Starts the timer that can make the internal Y.ITSAMessage.promise to fulfill. When the timer already had some time -which was interupted by this._stopTimer()-
 * then the previous amount is added to the the timer.
 *
 * @method _startTimer
 * @private
 * @since 0.1
*/
ITSAMessage.prototype._startTimer = function() {
    var instance = this,
        resolveTime = instance.timeoutResolve,
        rejectTime = instance.timeoutReject,
        timeout, doResolve;

    if (typeof resolveTime==='number') {
        timeout = (typeof rejectTime==='number') ? Math.min(resolveTime, rejectTime) : resolveTime;
        doResolve = (timeout===resolveTime);
    }
    else if (typeof rejectTime==='number') {
        timeout = rejectTime;
        doResolve = false;
    }
/*jshint expr:true */
    if (timeout) {
        Y.log('_startTimer', 'info', 'ITSAMessage');
        timeout -= instance._timerProcessed;
        instance._timerStart = (new Date()).getTime();
        instance._timerStopped = false;
        instance._timer = Y.later(Math.max(timeout, MIN_TIMEOUT), instance, (doResolve ? instance.resolve : instance.reject));
    }
/*jshint expr:false */
};

/**
 * Interupts the timer that can make the internal Y.ITSAMessage._promise to fulfill. Can be reinitiated with this._startTimer().
 *
 * @method _stopTimer
 * @private
 * @since 0.1
*/
ITSAMessage.prototype._stopTimer = function() {
    var instance = this;

    if (!instance._timerStopped) {
        Y.log('_stopTimer', 'info', 'ITSAMessage');
        instance._timerProcessed += (new Date()).getTime() - instance._timerStart;
        instance._timerStopped = true;
/*jshint expr:true */
        instance._timer && instance._timer.cancel();
/*jshint expr:false */
    }
};


