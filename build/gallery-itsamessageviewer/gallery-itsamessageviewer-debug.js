YUI.add('gallery-itsamessageviewer', function (Y, NAME) {

'use strict';

/*jshint maxlen:215 */

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
var YArray = Y.Array,
    MESSAGE = 'message',
    LOADICONSDELAY = 5000, // for gallerycss-itsa-form
    NEWMESSAGE = 'new' + MESSAGE,
    PROCESSING = 'processing',
    ERROR = 'error',
    WARN = 'warn',
    INFO = 'info',
    LEVEL = 'level',
    TARGET = 'target',
    SUSPENDED = 'suspended',
    NEWMESSAGE_ADDED = NEWMESSAGE+'_added',
    EVT_LEVELCLEAR = 'levelclear',
    AVAILABLE_LEVELS = {
        info: true,
        warn: true,
        error: true
    };

function ITSAMessageViewer() {
    ITSAMessageViewer.superclass.constructor.apply(this, arguments);
}

ITSAMessageViewer.NAME = 'itsamessageviewer';

Y.extend(ITSAMessageViewer, Y.Base, {}, {
    /**
     * The identity of the widget.
     *
     * @property NAME
     * @type String
     * @default 'sliderBase'
     * @readOnly
     * @protected
     * @static
     */
    NAME : 'itsamessageviewer',

    ATTRS : {

        /**
         * Axis upon which the Slider's thumb moves.  &quot;x&quot; for
         * horizontal, &quot;y&quot; for vertical.
         *
         * @attribute interrupt
         * @type {Boolean}
         * @default false
         */
        interrupt : {
            value     : true,
            validator: function(v) {
                return (typeof v==='boolean');
            }
        }
    }
});

ITSAMessageViewer.prototype.initializer = function() {
    var instance = this;
    instance._lastMessage = {};
    Y.ITSAMessageController.addTarget(instance);
    // now loading formicons with a delay --> should anyonde need it, then is nice to have the icons already available
    Y.later(LOADICONSDELAY, Y, Y.usePromise, ['gallerycss-itsa-base', 'gallerycss-itsa-animatespin', 'gallerycss-itsa-form']);
    instance._processQueue(INFO);
    instance._processQueue(WARN);
    instance._processQueue(ERROR);
};

ITSAMessageViewer.prototype._processQueue = function(level) {
    var instance = this,
        handlePromise, handlePromiseLoop;
    handlePromise = function() {
        return instance._nextMessagePromise(level).then(
            function(itsamessage) {
                Y.log('handlePromise has a new message '+itsamessage.level, 'info', 'ITSA-MessageViewer');
                itsamessage[PROCESSING] = true;
                return instance.viewMessage(itsamessage);
            }
        ).then(
            null,
            function(err) {
                // unfortunatly we cannot fire or log an error, because that could be caught by Y.ITSADialog and become a loop in the messageview
                // MUST log 'info'
                Y.log('***** ITSAMessageViewer._processQueue HALTED because of error: '+err+' *****', 'info', 'ITSAMessageViewer');
            }
        );
    };
    handlePromiseLoop = function() {
        // will loop until rejected, which is at destruction of the class
        return instance.get('destroyed') || handlePromise().then(handlePromiseLoop);
    };
    handlePromiseLoop();
};

// be sure to return a promise, otherwise all messsages are eaten up at once!
ITSAMessageViewer.prototype.handleLevel = function(level) {
/*jshint expr:true */
    AVAILABLE_LEVELS[level] && (Y.ITSAMessageController._targets[level]=this.constructor.NAME);
/*jshint expr:false */
};

// be sure to return a promise, otherwise all messsages are eaten up at once!
ITSAMessageViewer.prototype.viewMessage = function(/* itsamessage */) {
    // should be overridden --> method that renderes the message in the dom
    Y.log('Y.ITSAMessageViewer.viewMessage() is not overridden', 'warn', 'ITSAMessageViewer');
};

ITSAMessageViewer.prototype.suspend = function(/* itsamessage */) {
    // could be overridden --> method that renderes the message in the dom
    Y.log('Y.ITSAMessageViewer.suspend() is not overridden', 'warn', 'ITSAMessageViewer');
};

ITSAMessageViewer.prototype.resurrect = function(/* itsamessage */) {
    // should be overridden --> method that renderes the message in the dom
    Y.log('Y.ITSAMessageViewer.resurrect() is not overridden', 'warn', 'ITSAMessageViewer');
};

/**
* Fires the ERROR-event and -if not published yet- publish it broadcasted to Y.
* Because the error-event is broadcasted to Y, it can be catched by gallery-itsaerrorreporter.
*
* @method _lazyFireErrorEvent
 * @param {Object} [facade] eventfacade.
 * @private
**/
ITSAMessageViewer.prototype._lazyFireErrorEvent = function(facade) {
    var instance = this;
    Y.log('_lazyFireErrorEvent', 'info', 'ITSA-ModelSyncPromise');
    // lazy publish
    if (!instance._errorEvent) {
        instance._errorEvent = instance.publish(ERROR, {
            broadcast: 1
        });
    }
    instance.fire(ERROR, facade);
};

ITSAMessageViewer.prototype._nextMessagePromise = function(level) {
    var instance = this,
        messageController = Y.ITSAMessageController;
    return messageController.readyPromise().then(
        function() {
            // if higher level is 'busy' then we need to wait until all those messages are cleaned up
            var proceed = (level===ERROR) || (!instance._lastMessage[ERROR] && ((level===WARN) || !instance._lastMessage[WARN]));
            Y.log('_nextMessagePromise first promise-stage '+level+' proceed: '+proceed, 'info', 'ITSA-MessageViewer');
            return proceed || new Y.Promise(function (resolve) {
                var listener = instance.on(EVT_LEVELCLEAR, function() {
                    proceed = (!instance._lastMessage[ERROR] && ((level===WARN) || !instance._lastMessage[WARN]));
                    Y.log('_nextMessagePromise first promise-stage '+level+' INSIDE EVT_LEVELCLEAR proceed: '+proceed, 'info', 'ITSA-MessageViewer');
/*jshint expr:true */
                    proceed && listener.detach() && resolve();
/*jshint expr:false */
                });
            });
        }
    ).then (
        function() {
            return new Y.Promise(function (resolve, reject) {
                var queue = messageController.queue,
                    name = instance.constructor.NAME,
                    handleAnonymous = (messageController._targets[level]===name),
                    nextMessage, listener, otherLevelMessage, destroylistener, isTargeted;
/*jshint expr:true */
                instance.get('destroyed') && reject();
/*jshint expr:false */
                YArray.some(
                    queue,
                    function(itsamessage) {
                        isTargeted = (itsamessage[TARGET]===name) || (!itsamessage[TARGET] && handleAnonymous);
                        nextMessage = isTargeted && (itsamessage[LEVEL]===level) && !itsamessage[PROCESSING] && itsamessage;
                        return nextMessage;
                    }
                );
                if (nextMessage) {
                    instance._lastMessage[level] = nextMessage;
                    // first: is level=warn or level=error then we might need to pauze previous levels
/*jshint expr:true */
                    // check if 'info' needs to be suspended:
                    (otherLevelMessage=instance._lastMessage[INFO]) && ((level!==INFO) || instance._lastMessage[WARN] || instance._lastMessage[ERROR]) &&
                        (otherLevelMessage[SUSPENDED]=true) && instance.suspend(otherLevelMessage);
                    // check if 'warn' needs to be suspended:
                    (otherLevelMessage=instance._lastMessage[WARN]) && ((level===ERROR) || instance._lastMessage[ERROR]) && (otherLevelMessage[SUSPENDED]=true) &&
                        instance.suspend(otherLevelMessage);
/*jshint expr:false */
                    resolve(nextMessage);
                    Y.log('_nextMessagePromise about to return a message from queue '+nextMessage.level+' check '+instance._lastMessage[level], 'info', 'ITSA-MessageViewer');
                }
                else {
                    Y.log('_nextMessagePromise will setup a listener for '+level, 'info', 'ITSA-MessageViewer');
                    // No message in the queue: wait for new messages to be added.
                    // first: is level=warn or level=error then we might need to reactivate previous levels
/*jshint expr:true */
                    if (level===ERROR) {
                        otherLevelMessage = instance._lastMessage[WARN] || instance._lastMessage[INFO];
                    }
                    else if ((level===WARN) && (!instance._lastMessage[ERROR])) {
                        otherLevelMessage = instance._lastMessage[INFO];
                    }
                    if (otherLevelMessage && otherLevelMessage[SUSPENDED]) {
                        otherLevelMessage[SUSPENDED] = false;
                        instance.resurrect(otherLevelMessage);
                    }
                    instance._lastMessage[level] = null;
                    // fire the levelclear-event to make 'waiting at other levels' at the first promise of _nextMessagePromise resolve:
                    (level!==INFO) && instance.fire(EVT_LEVELCLEAR);
/*jshint expr:false */
                    destroylistener = instance.once('destroy', reject);
                    listener=Y.on(NEWMESSAGE_ADDED, function(e) {
                        var itsamessage = e.model,
                            isTargeted = (itsamessage[TARGET]===name) || (!itsamessage[TARGET] && handleAnonymous);
                        if (isTargeted && (itsamessage[LEVEL]===level)) {
                            listener.detach();
                            destroylistener.detach();
                            instance._lastMessage[level] = itsamessage;
                    // next: is level=warn or level=error then we might need to pauze previous levels
/*jshint expr:true */
                            // check if 'info' needs to be suspended:
                            (otherLevelMessage=instance._lastMessage[INFO]) && ((level!==INFO) || instance._lastMessage[WARN] || instance._lastMessage[ERROR]) &&
                                (otherLevelMessage[SUSPENDED]=true) && instance.suspend(otherLevelMessage);
                            // check if 'warn' needs to be suspended:
                            (otherLevelMessage=instance._lastMessage[WARN]) && ((level===ERROR) || instance._lastMessage[ERROR]) && (otherLevelMessage[SUSPENDED]=true) &&
                                instance.suspend(otherLevelMessage);
/*jshint expr:false */
                            Y.log('_nextMessagePromise about to return a NEW message from eventlistener NEWMESSAGE '+itsamessage.level+' check '+instance._lastMessage[level], 'info', 'ITSA-MessageViewer');
                            resolve(itsamessage);
                        }
                    });
                }
            });
        }
    );
};

ITSAMessageViewer.prototype.destructor = function() {
    var instance = this;
    Y.ITSAMessageController.removeTarget(instance);
/*jshint expr:true */
    instance.interruptHandler && instance.interruptHandler.detach();
/*jshint expr:false */
    instance._lastMessage = {};
};


Y.ITSAMessageViewer = ITSAMessageViewer;

}, '@VERSION@', {
    "requires": [
        "yui-base",
        "yui-later",
        "timers",
        "promise",
        "gallery-itsamodulesloadedpromise",
        "gallery-itsamessagecontroller"
    ]
});
