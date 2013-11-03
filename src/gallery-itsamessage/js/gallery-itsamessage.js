'use strict';

/*jshint maxlen:200 */

/**
 *
 * Extends Y.Model by adding methods through which they can create editable form-elements, which represent and are bound to the propery-value.
 * This model is for defining the UI-structure for all Model's properties and for firing model-events for
 * Y.ITSAFormModel does not rendering to the dom itself. That needs to be done by an Y.View-instance, like Y.ITSAViewModel.
 *
 * @module gallery-itsaformmodel
 * @extends Model
 * @uses gallery-itsamodelsyncpromise
 * @class ITSAFormModel
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
        instance.resolvePromise = null;
        instance.rejectPromise = null;

        instance.icon = '';
        instance.footer = null;
        instance.imageButtons = false;
        instance.level = 'info';
        instance.message = '';
        instance.noButtons = false;
        instance.closeButton = false;
        instance.processing = false;
        instance.primaryButton = null;
        instance.rejectButton = null;
        instance.suspended = false;
        instance.title = null;
        instance.target = null;
        instance.messageType = null;
        instance.source = null;
        instance.buttonLabels = null;
        instance.hotKeys = null;
        instance.customBtns = null;
        instance.noHideOnSubmit = true;
        instance.timeoutResolve = null;
        instance.timeoutReject = null;
        instance._timerstart = null;
        instance._timerProcessed = 0;
        instance._timerStopped = true;
        instance.forgotMessage = null;
        instance.config = {}; // orriginal config passed trhough

        // publishing event 'messagereject'
        instance.publish(
            MESSAGEREJECT,
            {
                defaultFn: Y.bind(instance._reject, instance),
                emitFacade: true
            }
        );
        // publishing event 'messageresolve'
        instance.publish(
            MESSAGERESOLVE,
            {
                defaultFn: Y.bind(instance._resolve, instance),
                emitFacade: true
            }
        );

    },
    destructor: function() {
/*jshint expr:true */
        this._timer && this._timer.cancel();
/*jshint expr:false */
    }
}, {
    ATTRS: {
        /**
         * The button that was pressed (if appopriate). Returnvalue represents the button's-value.
         *
         * @attribute button
         * @type {String}
         * @default null
         */
        button: {
            readOnly: true
        }
    }
});

ITSAMessage.prototype.reject = function(message) {
    this.fire(MESSAGEREJECT, {message: message});
};

ITSAMessage.prototype.resolve = function(attrs) {
    this.fire(MESSAGERESOLVE, {attrs: attrs});
};


ITSAMessage.prototype._reject = function(e) {
    var reject = this.rejectPromise;
/*jshint expr:true */
    reject && reject(e.message);
/*jshint expr:false */
};

ITSAMessage.prototype._resolve = function(e) {
    var resolve = this.resolvePromise;
/*jshint expr:true */
    resolve && resolve(e.attrs);
/*jshint expr:false */
};

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
        timeout -= instance._timerProcessed;
        instance._timerStart = (new Date()).getTime();
        instance._timerStopped = false;
        instance._timer = Y.later(Math.max(timeout, MIN_TIMEOUT), instance, (doResolve ? instance.resolve : instance.reject));
    }
/*jshint expr:false */
};

ITSAMessage.prototype._stopTimer = function() {
    var instance = this;

    if (!instance._timerStopped) {
        instance._timerProcessed += (new Date()).getTime() - instance._timerStart;
        instance._timerStopped = true;
/*jshint expr:true */
        instance._timer && instance._timer.cancel();
/*jshint expr:false */
    }
};


