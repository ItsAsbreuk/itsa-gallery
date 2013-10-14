YUI.add('gallery-itsamessageviewer', function (Y, NAME) {

'use strict';

/*jshint maxlen:210 */

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
    SUSPENDED = 'suspended',
    NEWMESSAGE_ADDED = NEWMESSAGE+'_added';


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
         * @attribute handleAnonymous
         * @type {Boolean}
         * @default false
         */
        handleAnonymous : {
            value     : false,
            validator: function(v) {
                return (typeof v==='boolean');
            }
        },

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
    Y.ITSAMessageController.addTarget(instance);
    // now loading formicons with a delay --> should anyonde need it, then is nice to have the icons already available
    Y.later(LOADICONSDELAY, Y, Y.usePromise, 'gallerycss-itsa-form');
    Y.soon(Y.bind(instance._processQueue, instance));
/*jshint expr:true */
    instance.get('interrupt') && (instance.interruptHandler=Y.on(NEWMESSAGE_ADDED, function(e) {
        var itsamessage = e.model,
            lastMessage = instance._lastMessage,
            level = itsamessage.get(LEVEL),
            lastLevel = lastMessage && lastMessage.get(LEVEL);
        if (lastLevel && (lastLevel!==level) && ((level===ERROR) || (lastLevel===INFO))) {
            // need to interrupt with new message
console.log('going to interupt '+lastLevel);
            lastMessage._set(SUSPENDED, true);



            // OOK (eerst) de loop paezeren igd promise automatisch resolved!
            instance.suspend(lastLevel);



            // need to reset _lastMessage here: cannot wait for _nextMessagePromise because this leads to a timing issue.
            instance._lastMessage = itsamessage;
            // restart new queue which will make the interupt-message the next message
            instance._processQueue();
        }
    }));
/*jshint expr:false */
};

ITSAMessageViewer.prototype._processQueue = function(startMessage) {
    var instance = this,
        handlePromise, handlePromiseLoop, handlePromiseLoopStartMessage;
console.log('_processQueue started');
    handlePromise = function() {
console.log('handlePromise');
        return instance._nextMessagePromise().then(
            function(itsamessage) {
console.log('handlePromise of message '+itsamessage.get('message'));
                if (itsamessage.get(SUSPENDED)) {
                    itsamessage._set(SUSPENDED, false);
                    instance.resurrect(itsamessage.get(LEVEL));
                    throw new Error("promiseloop ended because of resurrection");
                }
                else {
                    itsamessage._set(PROCESSING, true);
                    return instance.viewMessage(itsamessage);
                }
            }
        );
    };
    handlePromiseLoop = function() {
        // will loop until rejected, which is at destruction of the class
        return handlePromise().then(handlePromiseLoop);
    };
    handlePromiseLoopStartMessage = function(itsamessage) {
        // will loop until rejected, which is at destruction of the class
        var startMessagePromise = new Y.Promise(function (resolve) { resolve(itsamessage); });
        return startMessagePromise.then(handlePromiseLoop);
    };
/*jshint expr:true */
    startMessage ? handlePromiseLoopStartMessage(startMessage) : handlePromiseLoop(startMessage);
/*jshint expr:false */
};

// be sure to return a promise, otherwise all messsages are eaten up at once!
ITSAMessageViewer.prototype.viewMessage = function(/* itsamessage */) {
    // should be overridden --> method that renderes the message in the dom
console.log('viewMessage itsamessageviewer');
};

ITSAMessageViewer.prototype.suspend = function(/* level */) {
    // could be overridden --> method that renderes the message in the dom
};

ITSAMessageViewer.prototype.resurrect = function(/* level */) {
    // should be overridden --> method that renderes the message in the dom
};

ITSAMessageViewer.prototype._nextMessagePromise = function() {
    var instance = this,
        messageController = Y.ITSAMessageController;
    return messageController.readyPromise().then(
        function() {
            return new Y.Promise(function (resolve, reject) {
/*jshint expr:true */
                instance.get('destroyed') && reject();
/*jshint expr:false */
                instance.once('destroy', reject);
                var queue = messageController.queue,
                    handleAnonymous = instance.get('handleAnonymous'),
                    name = instance.constructor.NAME,
                    nextMessage, listener;
                // first find messages with level=error
                YArray.some(
                    queue,
                    function(itsamessage) {
                        nextMessage = (handleAnonymous || (itsamessage.target===name)) && (itsamessage.get(LEVEL)===ERROR) && (!itsamessage.get(PROCESSING) || itsamessage.get(SUSPENDED)) && itsamessage;
                        return nextMessage;
                    }
                );
                // next find messages with level=warn
/*jshint expr:true */
                nextMessage || YArray.some(
                    queue,
                    function(itsamessage) {
                        nextMessage = (handleAnonymous || (itsamessage.target===name)) && (itsamessage.get(LEVEL)===WARN) && (!itsamessage.get(PROCESSING) || itsamessage.get(SUSPENDED)) && itsamessage;
                        return nextMessage;
                    }
                );
                // next find other messages
                nextMessage || YArray.some(
                    queue,
                    function(itsamessage) {
                        nextMessage = (handleAnonymous || (itsamessage.target===name)) && (!itsamessage.get(PROCESSING) || itsamessage.get(SUSPENDED)) && itsamessage;
                        return nextMessage;
                    }
                );
                nextMessage ? ((instance._lastMessage=nextMessage) && resolve(nextMessage)) : (listener=Y.on(NEWMESSAGE_ADDED, function(e) {
console.log('event caught: '+e.type);
                                                            var itsamessage = e.model;
                                                            if (handleAnonymous || (itsamessage.target===name)) {
console.log('event HANDLED!');
                                                                instance._lastMessage = itsamessage;
                                                                resolve(itsamessage);
                                                                listener.detach();
                                                            }
                                                       })
                );
/*jshint expr:false */
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
