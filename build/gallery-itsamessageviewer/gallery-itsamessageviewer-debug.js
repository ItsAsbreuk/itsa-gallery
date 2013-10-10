YUI.add('gallery-itsamessageviewer', function (Y, NAME) {

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
var MESSAGE = 'message',
    LOADICONSDELAY = 5000, // for gallerycss-itsa-form
    NEWMESSAGE = 'new' + MESSAGE,
    PROCESSING = 'processing',
    ERROR = 'error',
    INFO = 'info',
    LEVEL = 'level',
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
console.log('initializer itsamessageviewer');
    var instance = this;
    YUI.Env.ITSAMessageController.addTarget(instance);
    // now loading formicons with a delay --> should anyonde need it, then is nice to have the icons already available
    Y.later(LOADICONSDELAY, Y, Y.usePromise, 'gallerycss-itsa-form');
    Y.soon(Y.bind(instance._processQueue, instance));
/*jshint expr:true */
    instance.get('interrupt') && (instance.interruptHandler=instance.on('*:'+NEWMESSAGE_ADDED, function(e) {
        var itsamessage = e.model,
            lastLevel = instance._lastLevel,
            level = itsamessage.get(LEVEL);
        if (lastLevel && (lastLevel!==level) && ((level===ERROR) || (lastLevel===INFO))) {
            // need to interrupt with new message
            instance._rejectQueuePromise();
            // restart queue which will make the interupt-message the next message
            instance._processQueue();
        }
    }));
/*jshint expr:false */
};

ITSAMessageViewer.prototype._processQueue = function() {
    var instance = this,
        handlePromise, handlePromiseLoop;

    handlePromise = function() {
console.log('handlePromise');
        return instance._nextMessagePromise().then(
            Y.rbind(instance.viewMessage, instance)
        );
    };
    handlePromiseLoop = function() {
        // will loop until rejected, which is at destruction of the class
        return handlePromise().then(handlePromiseLoop);
    };
    handlePromiseLoop();
};

// be sure to return a promise, otherwise all messsages are eaten up at once!
ITSAMessageViewer.prototype.viewMessage = function(/* itsamessage */) {
    // should be overridden --> method that renderes the message in the dom
console.log('viewMessage itsamessageviewer');
    Y.log('viewMessage() is not overridden', 'warn', 'ITSAMessageViewer');
};

ITSAMessageViewer.prototype._nextMessagePromise = function() {
    var instance = this,
        messageController = YUI.Env.ITSAMessageController;
    return messageController.readyPromise().then(
        function() {
            return new Y.Promise(function (resolve, reject) {
                instance._rejectQueuePromise = reject;
/*jshint expr:true */
                instance.get('destroyed') && reject();
/*jshint expr:false */
                instance.once('destroy', reject);
                var queue = messageController.queue,
                    handleAnonymous = instance.get('handleAnonymous'),
                    name = instance.constructor.NAME,
                    nextMessage, listener;
                queue.some(
                    function(itsamessage) {
                        nextMessage = (handleAnonymous || (itsamessage.target===name)) && !itsamessage.get(PROCESSING) && itsamessage;
                        return nextMessage;
                    }
                );
/*jshint expr:true */
                nextMessage ? resolve(instance._lastLevel=nextMessage.get(LEVEL) && nextMessage._set(PROCESSING, true) && nextMessage) : (listener=instance.on('*:'+NEWMESSAGE_ADDED, function(e) {
console.log('event caught: '+e.type);
                                                                                var itsamessage = e.model;
                                                                                if (handleAnonymous || (itsamessage.target===name)) {
console.log('event HANDLED!');
                                                                                    instance._lastLevel = itsamessage.get(LEVEL);
                                                                                    resolve(itsamessage._set(PROCESSING, true) && itsamessage);
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
    YUI.Env.ITSAMessageController.removeTarget(instance);
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
        "gallery-itsamodulesloadedpromise",
        "gallery-itsamessagecontroller"
    ]
});
