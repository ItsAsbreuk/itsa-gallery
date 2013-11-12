YUI.add('gallery-itsamessageviewer', function (Y, NAME) {

'use strict';

/*jshint maxlen:215 */

/**
 *
 * Extends Y.Model by adding methods through which they can create editable form-elements, which represent and are bound to the propery-value.
 * This model is for defining the UI-structure for all Model's properties and for firing model-events for
 * Y.ITSAFormModel does not rendering to the dom itself. That needs to be done by an Y.View-instance, like Y.ITSAViewModel.
 *
 * @module gallery-itsamessageviewer
 * @extends Base
 * @class ITSAMessageViewer
 * @constructor
 * @since 0.1
 *
 * <i>Copyright (c) 2013 Marco Asbreuk - http://itsasbreuk.nl</i>
 * YUI BSD License - http://developer.yahoo.com/yui/license.html
 *
*/
var YArray = Y.Array,
    ITSAMessageControllerInstance = Y.ITSAMessageController,
    ESSAGE = 'essage',
    MESSAGE = 'm'+ESSAGE,
    MAIL = 'mail',
    LOADICONSDELAY = 5000, // for gallerycss-itsa-form
    PROCESSING = '_processing',
    ERROR = 'error',
    WARN = 'warn',
    INFO = 'info',
    LEVEL = 'level',
    TARGET = 'target',
    SUSPENDED = '_suspended',
    NEWMESSAGE = 'new'+MESSAGE,
    DESTROYED = 'destroyed',
    PRIORITY = 'priority',
    EVT_LEVELCLEAR = 'levelclear',
    TIMEOUTRESOLVE = 'timeoutResolve',
    TIMEOUTREJECT = 'timeoutReject',
    GET = 'get',
    SHOW = 'show',
    CONFIRMATION = 'Confirmation',
    GET_RETRY_CONFIRMATION = GET+'Retry'+CONFIRMATION,
    GET_CONFIRMATION = GET+CONFIRMATION,
    GET_INPUT = GET+'Input',
    GET_NUMBER = GET+'Number',
    GET_EMAIL = GET+'E'+MAIL,
    GET_URL = GET+'URL',
    SHOW_MESSAGE = SHOW+'M'+ESSAGE,
    SHOW_WARNING = SHOW+'Warning',
    SHOW_ERROR = SHOW+'Error',
    SHOW_STATUS = SHOW+'Status',
    UNDERSCORE = '_',
    AVAILABLE_LEVELS = {
        info: true,
        warn: true,
        error: true
    };

function ITSAMessageViewer() {
    ITSAMessageViewer.superclass.constructor.apply(this, arguments);
}

ITSAMessageViewer.NAME = 'itsamessageviewer';

Y.extend(ITSAMessageViewer, Y.Base);


/**
 * @method initializer
 * @protected
 * @since 0.1
*/
ITSAMessageViewer.prototype.initializer = function() {
    Y.log('initializer', 'info', 'ITSAMessageViewer');
    var instance = this;

    /**
     * Flag that tells whether the MessageViewer can only handle simple messages: Y.showMessage(), showWarning()/Y.alert() and Y.showError().
     * @property simpleMessages
     * @default false
     * @type Boolean
     */
    instance.simpleMessages = false;

    /**
     * Holds the currently viewed message of all levels.
     * @property _lastMessage
     * @default {}
     * @private
     * @type Object
     */
    instance._lastMessage = {};
    Y.ITSAMessageController.addTarget(instance);
    // now loading formicons with a delay --> should anyonde need it, then is nice to have the icons already available
    Y.later(LOADICONSDELAY, Y, Y.usePromise, ['gallerycss-itsa-base', 'gallerycss-itsa-animatespin', 'gallerycss-itsa-form']);
    instance._processQueue(INFO);
    instance._processQueue(WARN);
    instance._processQueue(ERROR);
};

/**
 * Makes this instance handle 'untargeted' messages of the specified level.
 * If this.simpleMessage is set true, then only Y.showMessage, Y.showWarning, Y.alert and Y.showError messages are handled.
 *
 * @method handleLevel
 * @param level {String} queue-level, should be either 'info', 'warn' or 'error'
 * @since 0.1
*/
ITSAMessageViewer.prototype.handleLevel = function(level) {
    Y.log('handleLevel', 'info', 'ITSAMessageViewer');
/*jshint expr:true */
    AVAILABLE_LEVELS[level] && (Y.ITSAMessageController._targets[level]=this.constructor.NAME);
console.log(this.constructor.NAME);
/*jshint expr:false */
};

/**
 * Makes the panel-instance -that belongs to the message- show up again, after it has been suspended.<br>
 * Should be overruled by a descendant-Class.
 *
 * @method resurrect
 * @param itsamessage {Y.ITSAMessage} the Y.ITSAMessage-instance to be viewed.
 * @since 0.1
*/
ITSAMessageViewer.prototype.resurrect = function(/* itsamessage */) {
    // should be overridden --> method that renderes the message in the dom
    Y.log('Y.ITSAMessageViewer.resurrect() is not overridden', 'warn', 'ITSAMessageViewer');
};

/**
 * Makes the panel-instance -that belongs to the message- to hide, in order for a mesage at a higher level to show up.<br>
 * Should be overruled by a descendant-Class.
 *
 * @method suspend
 * @param itsamessage {Y.ITSAMessage} the Y.ITSAMessage-instance to be viewed.
 * @since 0.1
*/
ITSAMessageViewer.prototype.suspend = function(/* itsamessage */) {
    // could be overridden --> method that renderes the message in the dom
    Y.log('Y.ITSAMessageViewer.suspend() is not overridden', 'warn', 'ITSAMessageViewer');
};

/**
 * Views the message<br>
 * Should be overruled by a descendant-Class.<br>
 * <b>Note:</b> Make sure to return a Promise that fulfills when the message is read! otherwise all messsages are eaten up at once.
 *
 * @method viewMessage
 * @param itsamessage {Y.ITSAMessage} the Y.ITSAMessage-instance to be viewed.
 * @return {Y.Promise} will resolve when Y.ITSAMessage._promise gets fulfilled.
 * @since 0.1
*/
ITSAMessageViewer.prototype.viewMessage = function(/* itsamessage */) {
    // should be overridden --> method that renderes the message in the dom
    Y.log('Y.ITSAMessageViewer.viewMessage() is not overridden', 'warn', 'ITSAMessageViewer');
};

/**
 * Cleans up bindings
 * @method destructor
 * @protected
 * @since 0.1
*/
ITSAMessageViewer.prototype.destructor = function() {
    Y.log('destructor', 'info', 'ITSAMessageViewer');
    var instance = this;
    Y.ITSAMessageController.removeTarget(instance);
    instance._lastMessage = {};
};

//--- private methods ---------------------------------------------------

/**
 * Returns the next Y.ITSAMessage from the queue.
 *
 * @method _nextMessagePromise
 * @param level {String} queue-level, should be either 'info', 'warn' or 'error'
 * @private
 * @return {Y.Promise} always returns a resolved Promise returning a Y.ITSAMessage-instance --> resolve(itsamessage)
 * @since 0.1
*/
ITSAMessageViewer.prototype._nextMessagePromise = function(level) {
    Y.log('_nextMessagePromise', 'info', 'ITSAMessageViewer');
    var instance = this,
        messageController = Y.ITSAMessageController;
    return messageController.isReady().then(
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
                instance.get(DESTROYED) && reject();
/*jshint expr:false */
                // first try to retrieve message with priority
                YArray.some(
                    queue,
                    function(itsamessage) {
                        isTargeted = (itsamessage[TARGET]===name) || (!itsamessage[TARGET] && handleAnonymous);
                        nextMessage = isTargeted && (itsamessage[LEVEL]===level) && (!instance.simpleMessages || itsamessage._simpleMessage) && itsamessage[PRIORITY] && !itsamessage[PROCESSING] && itsamessage;
                        return nextMessage;
                    }
                );
                // if no prioritymessage, then try to retrieve message without priority
/*jshint expr:true */
                nextMessage || YArray.some(
                    queue,
                    function(itsamessage) {
                        isTargeted = (itsamessage[TARGET]===name) || (!itsamessage[TARGET] && handleAnonymous);
                        nextMessage = isTargeted && (itsamessage[LEVEL]===level) && (!instance.simpleMessages || itsamessage._simpleMessage) && !itsamessage[PRIORITY] && !itsamessage[PROCESSING] && itsamessage;
                        return nextMessage;
                    }
                );
/*jshint expr:false */
                if (nextMessage) {
                    instance._lastMessage[level] = nextMessage;
                    // first: is level=warn or level=error then we might need to pauze previous levels
/*jshint expr:true */
                    // check if 'info' needs to be suspended:
                    (otherLevelMessage=instance._lastMessage[INFO]) && ((level!==INFO) || instance._lastMessage[WARN] || instance._lastMessage[ERROR]) &&
                        (otherLevelMessage[SUSPENDED]=true) && instance._suspend(otherLevelMessage);
                    // check if 'warn' needs to be suspended:
                    (otherLevelMessage=instance._lastMessage[WARN]) && ((level===ERROR) || instance._lastMessage[ERROR]) && (otherLevelMessage[SUSPENDED]=true) &&
                        instance._suspend(otherLevelMessage);
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
                        instance._resurrect(otherLevelMessage);
                    }
                    instance._lastMessage[level] = null;
                    // fire the levelclear-event to make 'waiting at other levels' at the first promise of _nextMessagePromise resolve:
                    (level!==INFO) && instance.fire(EVT_LEVELCLEAR);
/*jshint expr:false */
                    destroylistener = instance.once('destroy', reject);
                    listener=Y.on(NEWMESSAGE, function(e) {
                        var itsamessage = e.itsamessage,
                            isTargeted = (itsamessage[TARGET]===name) || (!itsamessage[TARGET] && handleAnonymous);
                        if (isTargeted && (itsamessage[LEVEL]===level)) {
                            listener.detach();
                            destroylistener.detach();
                            instance._lastMessage[level] = itsamessage;
                    // next: is level=warn or level=error then we might need to pauze previous levels
/*jshint expr:true */
                            // check if 'info' needs to be suspended:
                            (otherLevelMessage=instance._lastMessage[INFO]) && ((level!==INFO) || instance._lastMessage[WARN] || instance._lastMessage[ERROR]) &&
                                (otherLevelMessage[SUSPENDED]=true) && instance._suspend(otherLevelMessage);
                            // check if 'warn' needs to be suspended:
                            (otherLevelMessage=instance._lastMessage[WARN]) && ((level===ERROR) || instance._lastMessage[ERROR]) && (otherLevelMessage[SUSPENDED]=true) &&
                                instance._suspend(otherLevelMessage);
/*jshint expr:false */
                            Y.log('_nextMessagePromise about to return a NEW message from eventlistener QUEUEDMESSAGE '+itsamessage.level+' check '+instance._lastMessage[level], 'info', 'ITSA-MessageViewer');
                            resolve(itsamessage);
                        }
                    });
                }
            });
        }
    );
};

/**
 * Starts processing a queue-level. This will make messages (Y.ITSAMessage-instances) to be taken from Y.ITSAMessageController's queue and
 * to be handled by a descendant messageviewer, f.i. like Y.ITSADialog.
 *
 * @method _processQueue
 * @param level {String} queue-level, should be either 'info', 'warn' or 'error'
 * @private
 * @since 0.1
*/
ITSAMessageViewer.prototype._processQueue = function(level) {
    Y.log('_processQueue', 'info', 'ITSAMessageViewer');
    var instance = this,
        handlePromise, handlePromiseLoop;
    handlePromise = function() {
        return instance._nextMessagePromise(level).then(
            function(itsamessage) {
                Y.log('handlePromise has a new message '+itsamessage.level, 'info', 'ITSA-MessageViewer');
                itsamessage[PROCESSING] = true;
/*jshint expr:true */
                (itsamessage[TIMEOUTRESOLVE] || itsamessage[TIMEOUTREJECT]) && itsamessage._startTimer();
/*jshint expr:false */
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
        return instance.get(DESTROYED) || handlePromise().then(handlePromiseLoop, handlePromiseLoop);
    };
    handlePromiseLoop();
};

/**
 * Calls resurrect() and also starts Y.ITSAMessage.timer - if appropriate.
 *
 * @method _resurrect
 * @param itsamessage {Y.ITSAMessage} the Y.ITSAMessage-instance to be viewed.
 * @private
 * @since 0.1
*/
ITSAMessageViewer.prototype._resurrect = function(itsamessage) {
    var instance = this;
    // should be overridden --> method that renderes the message in the dom
    Y.log('_resurrect', 'info', 'ITSAMessageViewer');
    if (!itsamessage.get(DESTROYED)) {
    /*jshint expr:true */
        (itsamessage[TIMEOUTRESOLVE] || itsamessage[TIMEOUTREJECT]) && itsamessage._startTimer();
    /*jshint expr:false */
        // first: play sound again:
        Y.ITSAMessageController.sound(itsamessage);
        instance.resurrect(itsamessage);
    }
};

/**
 * Calls suspend() and also interrupts Y.ITSAMessage.timer - if appropriate.
 *
 * @method _suspend
 * @param itsamessage {Y.ITSAMessage} the Y.ITSAMessage-instance to be viewed.
 * @private
 * @since 0.1
*/
ITSAMessageViewer.prototype._suspend = function(itsamessage) {
    var instance = this;
    Y.log('_suspend', 'info', 'ITSAMessageViewer');
/*jshint expr:true */
    (itsamessage[TIMEOUTRESOLVE] || itsamessage[TIMEOUTREJECT]) && itsamessage._stopTimer();
/*jshint expr:false */
    instance.suspend(itsamessage);
};

/**
 * Views the message through viewMessage(), but also makes the Y.ITSAMessage-instance create sound<br>
 *
 * @method _viewMessage
 * @param itsamessage {Y.ITSAMessage} the Y.ITSAMessage-instance to be viewed.
 * @private
 * @return {Y.Promise}
 * @since 0.1
*/
ITSAMessageViewer.prototype._viewMessage = function(itsamessage) {
    // should be overridden --> method that renderes the message in the dom
    Y.log('Y.ITSAMessageViewer._viewMessage()', 'info', 'ITSAMessageViewer');
    Y.ITSAMessageController.sound(itsamessage);
    return this.viewMessage(itsamessage);
};

Y.ITSAMessageViewer = ITSAMessageViewer;

// define public methods:

/**
 * Informs the user with a message and three buttons: 'abort', 'ignore', 'retry'.<br>
 * The promise can resolve by either 'ignore' or 'retry' and will reject by 'abort'. Once resolved, look for result.button
 * to find out which button the user pressed.<br>
 * <b>Note:</b> You need a descendant of Y.ITSAMessageViewer (f.i. Y.ITSADialog) to make the message be displayed!
 *
 * @method Y.getRetryConfirmation
 * @param [title] {String} The title of the message
 * @param [message] {String} The message
 * @param [config] {Object} Config passed through to the Y.ITSAMessage instance and the next additional properties:
     * @param [config.closeButton] {Boolean} whether the closebutton should be visible.
     *                               By setting this, you the default setting of closeButton is overruled.
     * @param [config.icon] {String} Classname of the iconfont, for instance 'itsaicon-dialog-info' --> see gallerycss-itsa-base for more info about iconfonts.
     *                               By setting this, you the default icon is overruled.
     * @param [config.imageButtons] {Boolean} Whether to display imagebuttons.
     * @param [config.level] {String} The message-level, should be either 'info', warn' or 'error'.
     * @param [config.priority] {boolean} By setting this, the message will be positioned in the queue above messages that have no priority.
     * @param [config.primaryButton] {String} Name of the primary button, f.i. 'btn_ok'.
     *                               By setting this, you the default primaryButton ('btn_retry') is overruled.
     * @param [config.source] {String} Identification of the source (sender) of the message, which is 'application' by default.
     * @param [config.target] {String} Classname of the Y.ITSAMessageViewer that is targeted and should hanlde the message.
     * @param [config.timeoutReject] {Number} Timeout after which the message's visiblilty should be rejected
     * @param [config.timeoutResolve] {Number} Timeout after which the message's visiblilty should be resolved
 * @return {Y.Promise} Promise that holds the user-response. Check 'button' to find out what button was pressed.
 *                     resolve(result) --> result.button==='ignore' || 'retry' OR reject(reason) --> reason==='abort' or error
 * @since 0.1
*/
Y[GET_RETRY_CONFIRMATION] = Y.bind(ITSAMessageControllerInstance[UNDERSCORE+GET_RETRY_CONFIRMATION], ITSAMessageControllerInstance);

/**
 * Alias for Y.getConfirmation.<br>
 * Informs the user with a message and two buttons: 'no' and 'yes'.<br>
 * The promise can resolve by 'yes and will reject by 'no'.
 * <b>Note:</b> You need a descendant of Y.ITSAMessageViewer (f.i. Y.ITSADialog) to make the message be displayed!
 *
 * @method Y.confirm
 * @param [title] {String} The title of the message
 * @param [message] {String} The message
 * @param [config] {Object} Config passed through to the Y.ITSAMessage instance and the next additional properties:
     * @param [config.closeButton] {Boolean} whether the closebutton should be visible.
     *                               By setting this, you the default setting of closeButton is overruled.
     * @param [config.icon] {String} Classname of the iconfont, for instance 'itsaicon-dialog-info' --> see gallerycss-itsa-base for more info about iconfonts.
     *                               By setting this, you the default icon is overruled.
     * @param [config.imageButtons] {Boolean} Whether to display imagebuttons.
     * @param [config.level] {String} The message-level, should be either 'info', warn' or 'error'.
     * @param [config.priority] {boolean} By setting this, the message will be positioned in the queue above messages that have no priority.
     * @param [config.primaryButton] {String} Name of the primary button, f.i. 'btn_ok'.
     *                               By setting this, you the default primaryButton 'btn_yes' is overruled.
     * @param [config.source] {String} Identification of the source (sender) of the message, which is 'application' by default.
     * @param [config.target] {String} Classname of the Y.ITSAMessageViewer that is targeted and should hanlde the message.
     * @param [config.timeoutReject] {Number} Timeout after which the message's visiblilty should be rejected
     * @param [config.timeoutResolve] {Number} Timeout after which the message's visiblilty should be resolved
 * @return {Y.Promise} Promise that holds the user-response. Resolves by 'ok' and rejects by 'no'.
 * @since 0.1
*/

/**
 * Informs the user with a message and two buttons: 'no' and 'yes'.<br>
 * The promise can resolve by 'yes and will reject by 'no'.
 * <b>Note:</b> You need a descendant of Y.ITSAMessageViewer (f.i. Y.ITSADialog) to make the message be displayed!
 *
 * @method Y.getConfirmation
 * @param [title] {String} The title of the message
 * @param [message] {String} The message
 * @param [config] {Object} Config passed through to the Y.ITSAMessage instance and the next additional properties:
     * @param [config.closeButton] {Boolean} whether the closebutton should be visible.
     *                               By setting this, you the default setting of closeButton is overruled.
     * @param [config.icon] {String} Classname of the iconfont, for instance 'itsaicon-dialog-info' --> see gallerycss-itsa-base for more info about iconfonts.
     *                               By setting this, you the default icon is overruled.
     * @param [config.imageButtons] {Boolean} Whether to display imagebuttons.
     * @param [config.level] {String} The message-level, should be either 'info', warn' or 'error'.
     * @param [config.priority] {boolean} By setting this, the message will be positioned in the queue above messages that have no priority.
     * @param [config.primaryButton] {String} Name of the primary button, f.i. 'btn_ok'.
     *                               By setting this, you the default primaryButton 'btn_yes' is overruled.
     * @param [config.source] {String} Identification of the source (sender) of the message, which is 'application' by default.
     * @param [config.target] {String} Classname of the Y.ITSAMessageViewer that is targeted and should hanlde the message.
     * @param [config.timeoutReject] {Number} Timeout after which the message's visiblilty should be rejected
     * @param [config.timeoutResolve] {Number} Timeout after which the message's visiblilty should be resolved
 * @return {Y.Promise} Promise that holds the user-response. Resolves by 'ok' and rejects by 'no'.
 * @since 0.1
*/
Y.confirm = Y[GET_CONFIRMATION] = Y.bind(ITSAMessageControllerInstance[UNDERSCORE+GET_CONFIRMATION], ITSAMessageControllerInstance);

/**
 * Asks the user for an url.<br>
 * <b>Note:</b> You need a descendant of Y.ITSAMessageViewer (f.i. Y.ITSADialog) to make the message be displayed!
 *
 * @method Y.getURL
 * @param [title] {String} The title of the message
 * @param [message] {String} The message
 * @param [config] {Object} Config passed through to the Y.ITSAMessage instance and the next additional properties:
     * @param [config.closeButton] {Boolean} whether the closebutton should be visible.
     *                               By setting this, you the default setting of closeButton is overruled.
     * @param [config.formconfig] {Object} Config that passes through to the UI-element. See Y.ITSAFormModel for usage of formconfig.
     * @param [config.icon] {String} Classname of the iconfont, for instance 'itsaicon-dialog-info' --> see gallerycss-itsa-base for more info about iconfonts.
     *                               By setting this, you the default icon is overruled.
     * @param [config.imageButtons] {Boolean} Whether to display imagebuttons.
     * @param [config.level] {String} The message-level, should be either 'info', warn' or 'error'.
     * @param [config.priority] {boolean} By setting this, the message will be positioned in the queue above messages that have no priority.
     * @param [config.primaryButton] {String} Name of the primary button, f.i. 'btn_ok'.
     *                               By setting this, you the default primaryButton is overruled.
     * @param [config.required] {Boolean} Makes the input required: the promise cannot be rejected, there is no cancel or close-button.
     * @param [config.source] {String} Identification of the source (sender) of the message, which is 'application' by default.
     * @param [config.target] {String} Classname of the Y.ITSAMessageViewer that is targeted and should hanlde the message.
     * @param [config.timeoutReject] {Number} Timeout after which the message's visiblilty should be rejected
     * @param [config.timeoutResolve] {Number} Timeout after which the message's visiblilty should be resolved
     * @param [config.validationerror] {String} Message that Y.Tipsy uses when validation fails.
     * @param [config.validator] {Function} Validator function for the UI-element
     * @param [config.value] {Any} Initial value that passes through to the UI-element.
 * @return {Y.Promise} Promise that holds the user-response.
 *                     resolve(result) --> result.input===the url OR reject(reason) --> reason==='cancel' or error
 * @since 0.1
*/
Y[GET_URL] = Y.bind(ITSAMessageControllerInstance[UNDERSCORE+GET_URL], ITSAMessageControllerInstance);

/**
 * Asks the user for an emailaddress.<br>
 * <b>Note:</b> You need a descendant of Y.ITSAMessageViewer (f.i. Y.ITSADialog) to make the message be displayed!
 *
 * @method Y.getEmail
 * @param [title] {String} The title of the message
 * @param [message] {String} The message
 * @param [config] {Object} Config passed through to the Y.ITSAMessage instance and the next additional properties:
     * @param [config.closeButton] {Boolean} whether the closebutton should be visible.
     *                               By setting this, you the default setting of closeButton is overruled.
     * @param [config.formconfig] {Object} Config that passes through to the UI-element. See Y.ITSAFormModel for usage of formconfig.
     * @param [config.icon] {String} Classname of the iconfont, for instance 'itsaicon-dialog-info' --> see gallerycss-itsa-base for more info about iconfonts.
     *                               By setting this, you the default icon is overruled.
     * @param [config.imageButtons] {Boolean} Whether to display imagebuttons.
     * @param [config.level] {String} The message-level, should be either 'info', warn' or 'error'.
     * @param [config.priority] {boolean} By setting this, the message will be positioned in the queue above messages that have no priority.
     * @param [config.primaryButton] {String} Name of the primary button, f.i. 'btn_ok'.
     *                               By setting this, you the default primaryButton is overruled.
     * @param [config.required] {Boolean} Makes the input required: the promise cannot be rejected, there is no cancel or close-button.
     * @param [config.source] {String} Identification of the source (sender) of the message, which is 'application' by default.
     * @param [config.target] {String} Classname of the Y.ITSAMessageViewer that is targeted and should hanlde the message.
     * @param [config.timeoutReject] {Number} Timeout after which the message's visiblilty should be rejected
     * @param [config.timeoutResolve] {Number} Timeout after which the message's visiblilty should be resolved
     * @param [config.validationerror] {String} Message that Y.Tipsy uses when validation fails.
     * @param [config.validator] {Function} Validator function for the UI-element
     * @param [config.value] {Any} Initial value that passes through to the UI-element.
 * @return {Y.Promise} Promise that holds the user-response.
 *                     resolve(result) --> result.input===the emailaddress OR reject(reason) --> reason==='cancel' or error
 * @since 0.1
*/
Y[GET_EMAIL] = Y.bind(ITSAMessageControllerInstance[UNDERSCORE+GET_EMAIL], ITSAMessageControllerInstance);

/**
 * Alias for Y.getInput.<br>
 * Asks the user for any input.<br>
 * <b>Note:</b> You need a descendant of Y.ITSAMessageViewer (f.i. Y.ITSADialog) to make the message be displayed!
 *
 * @method Y.prompt
 * @param [title] {String} The title of the message
 * @param [message] {String} The message
 * @param [config] {Object} Config passed through to the Y.ITSAMessage instance and the next additional properties:
     * @param [config.closeButton] {Boolean} whether the closebutton should be visible.
     *                               By setting this, you the default setting of closeButton is overruled.
     * @param [config.formconfig] {Object} Config that passes through to the UI-element. See Y.ITSAFormModel for usage of formconfig.
     * @param [config.icon] {String} Classname of the iconfont, for instance 'itsaicon-dialog-info' --> see gallerycss-itsa-base for more info about iconfonts.
     *                               By setting this, you the default icon is overruled.
     * @param [config.imageButtons] {Boolean} Whether to display imagebuttons.
     * @param [config.level] {String} The message-level, should be either 'info', warn' or 'error'.
     * @param [config.priority] {boolean} By setting this, the message will be positioned in the queue above messages that have no priority.
     * @param [config.primaryButton] {String} Name of the primary button, f.i. 'btn_ok'.
     *                               By setting this, you the default primaryButton is overruled.
     * @param [config.required] {Boolean} Makes the input required: the promise cannot be rejected, there is no cancel or close-button.
     * @param [config.source] {String} Identification of the source (sender) of the message, which is 'application' by default.
     * @param [config.target] {String} Classname of the Y.ITSAMessageViewer that is targeted and should hanlde the message.
     * @param [config.textarea] {Boolean} Render a textarea instead of an input-element.
     * @param [config.timeoutReject] {Number} Timeout after which the message's visiblilty should be rejected
     * @param [config.timeoutResolve] {Number} Timeout after which the message's visiblilty should be resolved
     * @param [config.validationerror] {String} Message that Y.Tipsy uses when validation fails.
     * @param [config.validator] {Function} Validator function for the UI-element
     * @param [config.value] {Any} Initial value that passes through to the UI-element.
 * @return {Y.Promise} Promise that holds the user-response.
 *                     resolve(result) --> result.input===the input OR reject(reason) --> reason==='cancel' or error
 * @since 0.1
*/

/**
 * Asks the user for any input.<br>
 * <b>Note:</b> You need a descendant of Y.ITSAMessageViewer (f.i. Y.ITSADialog) to make the message be displayed!
 *
 * @method Y.getInput
 * @param [title] {String} The title of the message
 * @param [message] {String} The message
 * @param [config] {Object} Config passed through to the Y.ITSAMessage instance and the next additional properties:
     * @param [config.closeButton] {Boolean} whether the closebutton should be visible.
     *                               By setting this, you the default setting of closeButton is overruled.
     * @param [config.formconfig] {Object} Config that passes through to the UI-element. See Y.ITSAFormModel for usage of formconfig.
     * @param [config.icon] {String} Classname of the iconfont, for instance 'itsaicon-dialog-info' --> see gallerycss-itsa-base for more info about iconfonts.
     *                               By setting this, you the default icon is overruled.
     * @param [config.imageButtons] {Boolean} Whether to display imagebuttons.
     * @param [config.level] {String} The message-level, should be either 'info', warn' or 'error'.
     * @param [config.priority] {boolean} By setting this, the message will be positioned in the queue above messages that have no priority.
     * @param [config.primaryButton] {String} Name of the primary button, f.i. 'btn_ok'.
     *                               By setting this, you the default primaryButton is overruled.
     * @param [config.required] {Boolean} Makes the input required: the promise cannot be rejected, there is no cancel or close-button.
     * @param [config.source] {String} Identification of the source (sender) of the message, which is 'application' by default.
     * @param [config.target] {String} Classname of the Y.ITSAMessageViewer that is targeted and should hanlde the message.
     * @param [config.textarea] {Boolean} Render a textarea instead of an input-element.
     * @param [config.timeoutReject] {Number} Timeout after which the message's visiblilty should be rejected
     * @param [config.timeoutResolve] {Number} Timeout after which the message's visiblilty should be resolved
     * @param [config.validationerror] {String} Message that Y.Tipsy uses when validation fails.
     * @param [config.validator] {Function} Validator function for the UI-element
     * @param [config.value] {Any} Initial value that passes through to the UI-element.
 * @return {Y.Promise} Promise that holds the user-response.
 *                     resolve(result) --> result.input===the input OR reject(reason) --> reason==='cancel' or error
 * @since 0.1
*/
Y.prompt = Y[GET_INPUT] = Y.bind(ITSAMessageControllerInstance[UNDERSCORE+GET_INPUT], ITSAMessageControllerInstance);

/**
 * Asks the user for a number.<br>
 * <b>Note:</b> You need a descendant of Y.ITSAMessageViewer (f.i. Y.ITSADialog) to make the message be displayed!
 *
 * @method Y.getNumber
 * @param [title] {String} The title of the message
 * @param [message] {String} The message
 * @param [config] {Object} Config passed through to the Y.ITSAMessage instance and the next additional properties:
     * @param [config.closeButton] {Boolean} whether the closebutton should be visible.
     *                               By setting this, you the default setting of closeButton is overruled.
     * @param [config.formconfig] {Object} Config that passes through to the UI-element. See Y.ITSAFormModel for usage of formconfig.
     * @param [config.icon] {String} Classname of the iconfont, for instance 'itsaicon-dialog-info' --> see gallerycss-itsa-base for more info about iconfonts.
     *                               By setting this, you the default icon is overruled.
     * @param [config.imageButtons] {Boolean} Whether to display imagebuttons.
     * @param [config.level] {String} The message-level, should be either 'info', warn' or 'error'.
     * @param [config.priority] {boolean} By setting this, the message will be positioned in the queue above messages that have no priority.
     * @param [config.primaryButton] {String} Name of the primary button, f.i. 'btn_ok'.
     *                               By setting this, you the default primaryButton is overruled.
     * @param [config.required] {Boolean} Makes the input required: the promise cannot be rejected, there is no cancel or close-button.
     * @param [config.source] {String} Identification of the source (sender) of the message, which is 'application' by default.
     * @param [config.target] {String} Classname of the Y.ITSAMessageViewer that is targeted and should hanlde the message.
     * @param [config.timeoutReject] {Number} Timeout after which the message's visiblilty should be rejected
     * @param [config.timeoutResolve] {Number} Timeout after which the message's visiblilty should be resolved
     * @param [config.validationerror] {String} Message that Y.Tipsy uses when validation fails.
     * @param [config.validator] {Function} Validator function for the UI-element
     * @param [config.value] {Any} Initial value that passes through to the UI-element.
 * @return {Y.Promise} Promise that holds the user-response.
 *                     resolve(result) --> result.number===the number OR reject(reason) --> reason==='cancel' or error
 * @since 0.1
*/
Y[GET_NUMBER] = Y.bind(ITSAMessageControllerInstance[UNDERSCORE+GET_NUMBER], ITSAMessageControllerInstance);

/**
 * Shows a message.<br>
 * <b>Note:</b> You need a descendant of Y.ITSAMessageViewer (f.i. Y.ITSADialog) to make the message be displayed!
 *
 * @method Y.showMessage
 * @param [title] {String} The title of the message
 * @param [message] {String} The message
 * @param [config] {Object} Config passed through to the Y.ITSAMessage instance and the next additional properties:
     * @param [config.closeButton] {Boolean} whether the closebutton should be visible.
     *                               By setting this, you the default setting of closeButton is overruled.
     * @param [config.icon] {String} Classname of the iconfont, for instance 'itsaicon-dialog-info' --> see gallerycss-itsa-base for more info about iconfonts.
     *                               By setting this, you the default icon is overruled.
     * @param [config.imageButtons] {Boolean} Whether to display imagebuttons.
     * @param [config.level] {String} The message-level, should be either 'info', warn' or 'error'.
     * @param [config.priority] {boolean} By setting this, the message will be positioned in the queue above messages that have no priority.
     * @param [config.primaryButton] {String} Name of the primary button, f.i. 'btn_ok'.
     *                               By setting this, you the default primaryButton is overruled.
     * @param [config.source] {String} Identification of the source (sender) of the message, which is 'application' by default.
     * @param [config.target] {String} Classname of the Y.ITSAMessageViewer that is targeted and should hanlde the message.
     * @param [config.timeoutReject] {Number} Timeout after which the message's visiblilty should be rejected
     * @param [config.timeoutResolve] {Number} Timeout after which the message's visiblilty should be resolved
 * @return {Y.Promise} Promise that holds the user-response. Resolved once the user presses the 'ok'-button.
 * @since 0.1
*/
Y[SHOW_MESSAGE] = Y.bind(ITSAMessageControllerInstance[UNDERSCORE+SHOW_MESSAGE], ITSAMessageControllerInstance);

/**
 * Alias for Y.showWarning.<br>
 * Shows a warning. Because the level will be 'warn', the message has precedence above normal messages.<br>
 * <b>Note:</b> You need a descendant of Y.ITSAMessageViewer (f.i. Y.ITSADialog) to make the message be displayed!
 *
 * @method Y.alert
 * @param [title] {String} The title of the message
 * @param [message] {String} The message
 * @param [config] {Object} Config passed through to the Y.ITSAMessage instance and the next additional properties:
     * @param [config.closeButton] {Boolean} whether the closebutton should be visible.
     *                               By setting this, you the default setting of closeButton is overruled.
     * @param [config.icon] {String} Classname of the iconfont, for instance 'itsaicon-dialog-info' --> see gallerycss-itsa-base for more info about iconfonts.
     *                               By setting this, you the default icon is overruled.
     * @param [config.imageButtons] {Boolean} Whether to display imagebuttons.
     * @param [config.level] {String} The message-level, should be either 'info', warn' or 'error'.
     * @param [config.priority] {boolean} By setting this, the message will be positioned in the queue above messages that have no priority.
     * @param [config.primaryButton] {String} Name of the primary button, f.i. 'btn_ok'.
     *                               By setting this, you the default primaryButton is overruled.
     * @param [config.source] {String} Identification of the source (sender) of the message, which is 'application' by default.
     * @param [config.target] {String} Classname of the Y.ITSAMessageViewer that is targeted and should hanlde the message.
     * @param [config.timeoutReject] {Number} Timeout after which the message's visiblilty should be rejected
     * @param [config.timeoutResolve] {Number} Timeout after which the message's visiblilty should be resolved
 * @return {Y.Promise} Promise that holds the user-response. Resolved once the user presses the 'ok'-button.
 * @since 0.1
*/

/**
 * Shows a warning. Because the level will be 'warn', the message has precedence above normal messages.<br>
 * <b>Note:</b> You need a descendant of Y.ITSAMessageViewer (f.i. Y.ITSADialog) to make the message be displayed!
 *
 * @method Y.showWarning
 * @param [title] {String} The title of the message
 * @param [message] {String} The message
 * @param [config] {Object} Config passed through to the Y.ITSAMessage instance and the next additional properties:
     * @param [config.closeButton] {Boolean} whether the closebutton should be visible.
     *                               By setting this, you the default setting of closeButton is overruled.
     * @param [config.icon] {String} Classname of the iconfont, for instance 'itsaicon-dialog-info' --> see gallerycss-itsa-base for more info about iconfonts.
     *                               By setting this, you the default icon is overruled.
     * @param [config.imageButtons] {Boolean} Whether to display imagebuttons.
     * @param [config.level] {String} The message-level, should be either 'info', warn' or 'error'.
     * @param [config.priority] {boolean} By setting this, the message will be positioned in the queue above messages that have no priority.
     * @param [config.primaryButton] {String} Name of the primary button, f.i. 'btn_ok'.
     *                               By setting this, you the default primaryButton is overruled.
     * @param [config.source] {String} Identification of the source (sender) of the message, which is 'application' by default.
     * @param [config.target] {String} Classname of the Y.ITSAMessageViewer that is targeted and should hanlde the message.
     * @param [config.timeoutReject] {Number} Timeout after which the message's visiblilty should be rejected
     * @param [config.timeoutResolve] {Number} Timeout after which the message's visiblilty should be resolved
 * @return {Y.Promise} Promise that holds the user-response. Resolved once the user presses the 'ok'-button.
 * @since 0.1
*/
Y.alert = Y[SHOW_WARNING] = Y.bind(ITSAMessageControllerInstance[UNDERSCORE+SHOW_WARNING], ITSAMessageControllerInstance);

/**
 * Shows an error. Because the level will be 'error', the message has precedence above warnings and normal messages.<br>
 * <b>Note:</b> You need a descendant of Y.ITSAMessageViewer (f.i. Y.ITSADialog) to make the message be displayed!
 *
 * @method Y.showError
 * @param [title] {String} The title of the message
 * @param [message] {String} The message
 * @param [config] {Object} Config passed through to the Y.ITSAMessage instance and the next additional properties:
     * @param [config.closeButton] {Boolean} whether the closebutton should be visible.
     *                               By setting this, you the default setting of closeButton is overruled.
     * @param [config.icon] {String} Classname of the iconfont, for instance 'itsaicon-dialog-info' --> see gallerycss-itsa-base for more info about iconfonts.
     *                               By setting this, you the default icon is overruled.
     * @param [config.imageButtons] {Boolean} Whether to display imagebuttons.
     * @param [config.level] {String} The message-level, should be either 'info', warn' or 'error'.
     * @param [config.priority] {boolean} By setting this, the message will be positioned in the queue above messages that have no priority.
     * @param [config.primaryButton] {String} Name of the primary button, f.i. 'btn_ok'.
     *                               By setting this, you the default primaryButton is overruled.
     * @param [config.source] {String} Identification of the source (sender) of the message, which is 'application' by default.
     * @param [config.target] {String} Classname of the Y.ITSAMessageViewer that is targeted and should hanlde the message.
     * @param [config.timeoutReject] {Number} Timeout after which the message's visiblilty should be rejected
     * @param [config.timeoutResolve] {Number} Timeout after which the message's visiblilty should be resolved
 * @return {Y.Promise} Promise that holds the user-response. Resolved once the user presses the 'ok'-button.
 * @since 0.1
*/
Y[SHOW_ERROR] = Y.bind(ITSAMessageControllerInstance[UNDERSCORE+SHOW_ERROR], ITSAMessageControllerInstance);

/**
 * Returns a promise with reference to the ITSAMessage-instance. The message itself is NOT fullfilled yet!<br>
 * Because there are no buttons to make it fullfilled, you must fullfil the message through itsamessage.resolve() or itsamessage.reject()<br>
 * <b>Note:</b> You need a descendant of Y.ITSAMessageViewer (f.i. Y.ITSADialog) to make the message be displayed!
 *
 * @method Y.showStatus
 * @param [title] {String} The title of the message
 * @param [message] {String} The message
 * @param [config] {Object} Config passed through to the Y.ITSAMessage instance and the next additional properties:
     * @param [config.closeButton] {Boolean} whether the closebutton should be visible.
     *                               By setting this, you the default setting of closeButton is overruled.
     * @param [config.icon] {String} Classname of the iconfont, for instance 'itsaicon-dialog-info' --> see gallerycss-itsa-base for more info about iconfonts.
     *                               By setting this, you the default icon is overruled.
     * @param [config.imageButtons] {Boolean} Whether to display imagebuttons.
     * @param [config.level] {String} The message-level, should be either 'info', warn' or 'error'.
     * @param [config.priority] {boolean} By setting this, the message will be positioned in the queue above messages that have no priority.
     * @param [config.primaryButton] {String} Name of the primary button, f.i. 'btn_ok'.
     *                               By setting this, you the default primaryButton is overruled.
     * @param [config.source] {String} Identification of the source (sender) of the message, which is 'application' by default.
     * @param [config.target] {String} Classname of the Y.ITSAMessageViewer that is targeted and should hanlde the message.
     * @param [config.timeoutReject] {Number} Timeout after which the message's visiblilty should be rejected
     * @param [config.timeoutResolve] {Number} Timeout after which the message's visiblilty should be resolved
 * @return {Y.Promise} Promise that holds the user-response. Resolves or rejects manually.
 * @since 0.1
*/
Y[SHOW_STATUS] = Y.bind(ITSAMessageControllerInstance[UNDERSCORE+SHOW_STATUS], ITSAMessageControllerInstance);

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
