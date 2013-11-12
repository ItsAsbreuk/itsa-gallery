'use strict';

/*jshint maxlen:215 */

/**
 *
 * Extends Y.Model by adding methods through which they can create editable form-elements, which represent and are bound to the propery-value.
 * This model is for defining the UI-structure for all Model's properties and for firing model-events for
 * Y.ITSAFormModel does not rendering to the dom itself. That needs to be done by an Y.View-instance, like Y.ITSAViewModel.
 *
 * @module gallery-itsamessagecontroller
 * @extends Base
 * @class ITSAMessageController
 * @constructor
 * @since 0.1
 *
 * <i>Copyright (c) 2013 Marco Asbreuk - http://itsasbreuk.nl</i>
 * YUI BSD License - http://developer.yahoo.com/yui/license.html
 *
*/

    var YArray = Y.Array,
        APP = 'application',
        BOOLEAN = 'boolean',
        ERROR = 'error',
        INFO = 'info',
        WARN = 'warn',
        ESSAGE = 'essage',
        MESSAGE = 'm'+ESSAGE,
        MAIL = 'mail',
        EMAIL = 'e'+MAIL,
        URL = 'url',
        LOADDELAY = 5000,
        PUBLISHED = '_pub_',
        QUEUEDMESSAGE = 'queued' + MESSAGE,
        PUBLISHED_QUEUEDMESSAGE = PUBLISHED+QUEUEDMESSAGE,
        NEWMESSAGE = 'new'+MESSAGE,
        PUBLISHED_NEWMESSAGE = PUBLISHED+NEWMESSAGE,
        GALLERY_ITSAMESSAGE = 'gallery-itsamessage',
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
        BASE_BUILD = 'base-build',
        TEXTAREA = 'textarea',
        QUESTION = 'question',
        INFORM = INFO+'rm',
        ITSAICON_DIALOG = 'itsaicon-dialog-',
        ICON_INFORM = ITSAICON_DIALOG+INFORM,
        ICON_ERROR = ITSAICON_DIALOG+ERROR,
        ICON_INFO = ITSAICON_DIALOG+INFO,
        ICON_QUESTION = ITSAICON_DIALOG+QUESTION,
        ICON_WARN = ITSAICON_DIALOG+WARN,
        ITSADIALOG = 'itsadialog';

function ITSAMessageControllerClass() {
    ITSAMessageControllerClass.superclass.constructor.apply(this, arguments);
}

ITSAMessageControllerClass.NAME = 'ITSAMessageControllerClass';

Y.ITSAMessageControllerClass = Y.extend(ITSAMessageControllerClass, Y.Base);

/**
 * @method initializer
 * @protected
 * @since 0.1
*/
ITSAMessageControllerClass.prototype.initializer = function() {
    Y.log('initializer', 'info', 'ITSAMessageController');
    var instance = this;

    /**
     * Array with all the messages that needs to be shown.
     * @property queue
     * @default []
     * @type Array
     */
    instance.queue = [];

    /**
     * Reference to which MessageViewer wil handle untargeted messages.
     * @property _targets
     * @default {info: 'itsadialog', warn: 'itsadialog', error: 'itsadialog'}
     * @type Object
     * @private
     */
    instance._targets = {
        info: ITSADIALOG,
        warn: ITSADIALOG,
        error: ITSADIALOG
    };

    /**
     * Reference to which MessageViewer wil handle untargeted 'simple'-messages.
     * @property _simpleTargets
     * @default {info: 'itsadialog', warn: 'itsadialog', error: 'itsadialog'}
     * @type Object
     * @private
     */
    instance._simpleTargets = {
        info: ITSADIALOG,
        warn: ITSADIALOG,
        error: ITSADIALOG
    };

    /**
     * The sound that is generated when a message at level-error occurs. Sound only happens when the property soundError is set true.<br>
     * @property errorMidi
     * @default 'xxxxx.midi'
     * @type String
     */
    instance.errorMidi = 'error.midi';

    /**
     * Whether the webapp should sound when a message at level-error appears<br>
     * The messagesound is defined by a midi-file, which is defined by the property: warnMidi
     * @property soundWarning
     * @default true
     * @type Boolean
     */
    instance.soundWarning = true;

    /**
     * Whether the webapp should sound when a message at level-error appears<br>
     * The messagesound is defined by a midi-file, which is defined by the property: errorMidi
     * @property soundError
     * @default true
     * @type Boolean
     */
    instance.soundError = true;

    /**
     * The sound that is generated when a message at warb-error occurs. Sound only happens when the property soundWarning is set true.<br>
     * @property errorMidi
     * @default 'xxxxx.midi'
     * @type String
     */
    instance.warnMidi = 'warn.midi';

    Y.later(LOADDELAY, instance, instance.isReady);
};

/**
 * Adds the Y.ITSAMessage-instance to the queue.<br>
 * This method is meant for creating custom messages. Read Y.ITSAMessage for how to setup a new Y.ITSAMessage-instance.<br>
 * <b>Note:</b> itsamessage needs to be initiated. Destruction takes place automaticly when it gets out of the queue (Y.ITSAMessageController takes care of this)
 *
 * @method queueMessage
 * @param itsamessage {Y.ITSAMessage} the Y.ITSAMessage-instance to be viewed.
 * @since 0.1
*/
ITSAMessageControllerClass.prototype.queueMessage = function(itsamessage) {
    Y.log('queueMessage', 'info', 'ITSAMessageController');
    var instance = this,
        promise, promiseResolve, promiseReject;
    promise = new Y.Promise(function (resolve, reject) {
        promiseResolve = resolve;
        promiseReject = reject;
    });
    // we pass the promise, together with the resolve and reject handlers as an option to the event.
    // this way we can fullfill the promise in the messageviewer or prevDefaultFn.
/*jshint expr:true */
    itsamessage || (itsamessage = {});
    itsamessage._promise = promise;
    itsamessage._resolvePromise = promiseResolve;
    itsamessage._rejectPromise = promiseReject;
    // lazy publish the event
    /**
      * Event fired when a new Y.ITSAMessage-instance gets in the queue. Aftersubscribers will execute once it gets out (handled by a ITSAMessageViewer)
      * @preventable
      * @event queuedmessage
      * @param e {EventFacade} Event Facade including:
      * @param e.itsamessage {Y.ITSAMessage} Y.ITSAMessage-instance.
    **/
    instance[PUBLISHED_QUEUEDMESSAGE] || (instance[PUBLISHED_QUEUEDMESSAGE]=Y._publishAsync(QUEUEDMESSAGE,
                                                                        {
                                                                          defaultTargetOnly: true,
                                                                          emitFacade: true,
                                                                          broadcast: 2,
                                                                          defaultFn: Y.rbind(instance._defQueueFn, instance),
                                                                          preventedFn: instance._prevDefFn
                                                                        }
                                                                       ));
    Y.fire(QUEUEDMESSAGE, {itsamessage: itsamessage});
/*jshint expr:false */
    return promise;
};

/**
 * Promise that is resolved once all dependencies are loaded and ITSAMessageController is ready to use.<br>
 * To speed up initial loading of the webpage, several modules are loaded by delay, or when needed. this.isReady() holds the promise
 * that everything is loaded.
 *
 * @method isReady
 * @return {Y.Promise} resolves when everything is loaded.
 * @since 0.1
*/
ITSAMessageControllerClass.prototype.isReady = function() {
    Y.log('isReady', 'info', 'ITSAMessageController');
    var instance = this;
    return instance._readyPromise || (instance._readyPromise=Y.usePromise(BASE_BUILD, GALLERY_ITSAMESSAGE).then(
                                                                 function() {
                                                                     instance._intlMessageObj = new Y.ITSAMessage(); // used for synchronous translations
                                                                 },
                                                                 function(reason) {
                                                                    var facade = {
                                                                        error   : reason && (reason.message || reason),
                                                                        src     : 'ITSAMessageViewer._processQueue'
                                                                    };
                                                                    instance._lazyFireErrorEvent(facade);
                                                                 }
                                                             ));
};

/**
 * Creates a sound, if appropriate. Plays itsamessage.soundfile if found. Otherwise this.warnMidi or this.errorMidi might be played, but only if
 * itsamessage.level has the 'warn'-level or 'error'-level and the corresponding this.soundWarning/this.soundError is true.
 * @method sound
 * @param itsamessage {Y.ITSAMessage} The Y.ITSAMessage-instance which should be sounded.
 * @since 0.1
*/
ITSAMessageControllerClass.prototype.sound = function(itsamessage) {
    Y.log('sound', 'info', 'ITSAMessage');
    var instance = this;
    instance.isReady().then(
        function() {
            var soundfile,
                itsamessageSoundfile = itsamessage.soundfile;
/*jshint expr:true */
            if (itsamessageSoundfile) {
                soundfile = itsamessageSoundfile;
            }
            else if (itsamessage.level===WARN) {
                instance.soundWarning && (soundfile=instance.warnMidi);
            }
            else if (itsamessage.level===ERROR)  {
                instance.soundError && (soundfile=instance.errorMidi);
            }
            soundfile && instance._playMidi(soundfile);
/*jshint expr:false */
        }
    );
};

/**
 * Cleans up bindings
 * @method destructor
 * @protected
 * @since 0.1
*/
ITSAMessageControllerClass.prototype.destructor = function() {
    Y.log('destructor', 'info', 'ITSAMessageController');
    var instance = this,
        queue = instance.queue,
        intlMessageObj = instance._intlMessageObj;
    instance.removeTarget(Y);
    YArray.each(
        queue,
        function(itsamessage) {
            itsamessage.detachAll();
            itsamessage.destroy();
            itsamessage = null;
        }
    );
    queue.length = 0;
/*jshint expr:true */
    intlMessageObj && intlMessageObj.destroy() && (instance._intlMessageObj=null);
/*jshint expr:false */
    instance._targets = {};
    instance._simpleTargets = {};
};

//--- private methods ---------------------------------------------------

/**
 * Plays a midi-file.
 * @method _playMidi
 * @param soundfile {String} The soundfile to be played.
 * @private
 * @since 0.1
*/
ITSAMessageControllerClass.prototype._playMidi = function(soundfile) {
    Y.log('_playMidi', 'info', 'ITSAMessage');
    // TODO: create JS to play a midi-file
    console.log('playing '+soundfile);
};

/**
  * Rearanges the 3 parameters that are passed through to many methods. Because some of the are optional.<br>
  * Returns an object where you are sure that all properties are indeed those that the developer send through.
  *
  * @method _retrieveParams
  * @param title {String} 1st parameter
  * @param message {String} 2nd parameter
  * @param config {Object} 3th parameter
  * @private
  * @return {Object} with properties: title, message and config
  * @since 0.1
*/
ITSAMessageControllerClass.prototype._retrieveParams = function(title, message, config) {
    Y.log('_retrieveParams', 'info', 'ITSAMessageController');
    var withTitle = (typeof message === 'string'),
        withMessage;
    if (!withTitle) {
        config = message;
        message = title;
        title = null;
    }
    withMessage = (typeof message === 'string');
    if (!withMessage) {
        config = message;
        message = '';
        title = null;
    }
/*jshint expr:true */
    config || (config={});
/*jshint expr:false */
    return {
        title: title,
        message: message,
        config: config
    };
};

/**
 * Informs the user with a message and three buttons: 'abort', 'ignore', 'retry'.<br>
 * The promise can resolve by either 'ignore' or 'retry' and will reject by 'abort'. Once resolved, look for result.button
 * to find out which button the user pressed.<br>
 * <b>Note:</b> You need a descendant of Y.ITSAMessageViewer (f.i. Y.ITSADialog) to make the message be displayed!
 *
 * @method _getRetryConfirmation
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
 * @private
 * @return {Y.Promise} Promise that holds the user-response. Check 'button' to find out what button was pressed.
 *                     resolve(result) --> result.button==='ignore' || 'retry' OR reject(reason) --> reason==='abort' or error
 * @since 0.1
*/
ITSAMessageControllerClass.prototype[UNDERSCORE+GET_RETRY_CONFIRMATION] = function(title, message, config) {
    Y.log('_getRetryConfirmation', 'info', 'ITSAMessageController');
    return this._queueMessage(title, message, config, '{btn_abort}{btn_ignore}{btn_retry}', 'btn_retry', 'btn_abort', GET_RETRY_CONFIRMATION, WARN, ICON_WARN);
};

/**
 * Informs the user with a message and two buttons: 'no' and 'yes'.<br>
 * The promise can resolve by 'yes and will reject by 'no'.
 * <b>Note:</b> You need a descendant of Y.ITSAMessageViewer (f.i. Y.ITSADialog) to make the message be displayed!
 *
 * @method _getConfirmation
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
 * @private
 * @return {Y.Promise} Promise that holds the user-response. Resolves by 'ok' and rejects by 'no'.
 * @since 0.1
*/
ITSAMessageControllerClass.prototype[UNDERSCORE+GET_CONFIRMATION] = function(title, message, config) {
    Y.log('_getConfirmation', 'info', 'ITSAMessageController');
    return this._queueMessage(title, message, config, '{btn_no}{btn_yes}', 'btn_yes', 'btn_no', GET_CONFIRMATION, INFO, ICON_QUESTION);
};

/**
 * Asks the user for an url.<br>
 * <b>Note:</b> You need a descendant of Y.ITSAMessageViewer (f.i. Y.ITSADialog) to make the message be displayed!
 *
 * @method _getURL
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
 * @private
 * @return {Y.Promise} Promise that holds the user-response.
 *                     resolve(result) --> result.input===the url OR reject(reason) --> reason==='cancel' or error
 * @since 0.1
*/
ITSAMessageControllerClass.prototype[UNDERSCORE+GET_URL] = function(title, message, config) {
    Y.log('_getURL', 'info', 'ITSAMessageController');
    var instance = this,
        params = instance._retrieveParams(title, message, config),
        newconfig = params.config;
    newconfig.url = true;
    return instance[UNDERSCORE+GET_INPUT](params.title, params.message, newconfig);
};

/**
 * Asks the user for an emailaddress.<br>
 * <b>Note:</b> You need a descendant of Y.ITSAMessageViewer (f.i. Y.ITSADialog) to make the message be displayed!
 *
 * @method _getEmail
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
 * @private
 * @return {Y.Promise} Promise that holds the user-response.
 *                     resolve(result) --> result.input===the emailaddress OR reject(reason) --> reason==='cancel' or error
 * @since 0.1
*/
ITSAMessageControllerClass.prototype[UNDERSCORE+GET_EMAIL] = function(title, message, config) {
    Y.log('_getEmail', 'info', 'ITSAMessageController');
    var instance = this,
        params = instance._retrieveParams(title, message, config),
        newconfig = params.config;
    newconfig.email = true;
    return instance[UNDERSCORE+GET_INPUT](params.title, params.message, newconfig);
};

/**
 * Asks the user for any input.<br>
 * <b>Note:</b> You need a descendant of Y.ITSAMessageViewer (f.i. Y.ITSADialog) to make the message be displayed!
 *
 * @method _getInput
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
 * @private
 * @return {Y.Promise} Promise that holds the user-response.
 *                     resolve(result) --> result.input===the input OR reject(reason) --> reason==='cancel' or error
 * @since 0.1
*/
ITSAMessageControllerClass.prototype[UNDERSCORE+GET_INPUT] = function(title, message, config) {
    Y.log('_getInput', 'info', 'ITSAMessageController');
    var instance = this,
        params = instance._retrieveParams(title, message, config),
        required, MyITSAMessage, email, url, formtype, formconfig;
    title = params.title;
    message = params.message;
    config = params.config;
    formconfig = config.formconfig || {};
    formconfig.fullselect = true;
    email = (typeof config.email === BOOLEAN) && config.email;
    url = (typeof config.url === BOOLEAN) && config.url;
    formconfig.primarybtnonenter = !config[TEXTAREA] || email || url;
    formtype = email ? EMAIL : (url ?  URL : (config[TEXTAREA] ? TEXTAREA : 'text'));
    formconfig.classname = 'itsa-'+formtype + (formconfig.classname ? ' '+formconfig.classname : '');
    required = (typeof config.required === BOOLEAN) && config.required;
    formconfig.required = required;
    return instance.isReady().then(
        function() {
/*jshint expr:true */
            (config.email || config.url) && (config.validationerror || (config.validationerror=instance._intlMessageObj.translate('enterrightformat')));
/*jshint expr:false */
            MyITSAMessage = Y.Base.create('itsamessageinput', Y.ITSAMessage, [], null, {
                                  ATTRS: {
                                      input: {
                                          value: config.value,
                                          formtype: formtype,
                                          formconfig: formconfig,
                                          validator: config.validator,
                                          validationerror: config.validationerror
                                      }
                                  }
                              });
            message += '<fieldset class="'+'itsa-input'+'">'+
                           '<div class="pure-control-group">{input}</div>'+
                       '</fieldset>';
            return instance._queueMessage(title, message, config, (required ? '' : '{btn_cancel}') + '{btn_ok}', 'btn_ok', (required ? null : 'btn_cancel'), GET_INPUT, INFO, ICON_INFO, null, null, MyITSAMessage);
        }
    );
};

/**
 * Asks the user for a number.<br>
 * <b>Note:</b> You need a descendant of Y.ITSAMessageViewer (f.i. Y.ITSADialog) to make the message be displayed!
 *
 * @method _getNumber
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
 * @private
 * @return {Y.Promise} Promise that holds the user-response.
 *                     resolve(result) --> result.number===the number OR reject(reason) --> reason==='cancel' or error
 * @since 0.1
*/
ITSAMessageControllerClass.prototype[UNDERSCORE+GET_NUMBER] = function(title, message, config) {
    Y.log('_getNumber', 'info', 'ITSAMessageController');
    var instance = this,
        params = instance._retrieveParams(title, message, config),
        required, MyITSAMessage, formconfig;
    title = params.title;
    message = params.message;
    config = params.config;
    formconfig = config.formconfig || {};
    formconfig.fullselect = true;
    formconfig.primarybtnonenter = true;
    formconfig.classname = 'itsa-number' + (formconfig.classname ? ' '+formconfig.classname : '');
    formconfig.required = true;
    required = (typeof config.required === BOOLEAN) && config.required;
    return instance.isReady().then(
        function() {
/*jshint expr:true */
            config.validationerror || (config.validationerror=instance._intlMessageObj.translate('entervalidnumber'));
/*jshint expr:false */
            MyITSAMessage = Y.Base.create('itsamessagenumber', Y.ITSAMessage, [], null, {
                                  ATTRS: {
                                      number: {
                                          value: config.value,
                                          formtype: 'number',
                                          formconfig: formconfig,
                                          validator: config.validator,
                                          validationerror: config.validationerror
                                      }
                                  }
                              });
            message += '<fieldset class="'+'itsa-number'+'">'+
                           '<div class="pure-control-group">{number}</div>'+
                       '</fieldset>';
            return instance._queueMessage(title, message, config, (required ? '' : '{btn_cancel}') + '{btn_ok}', 'btn_ok', (required ? null : 'btn_cancel'), GET_NUMBER, INFO, ICON_INFO, null, null, MyITSAMessage);
        }
    );
};

/**
 * Shows a message.<br>
 * <b>Note:</b> You need a descendant of Y.ITSAMessageViewer (f.i. Y.ITSADialog) to make the message be displayed!
 *
 * @method _showMessage
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
 * @private
 * @return {Y.Promise} Promise that holds the user-response. Resolved once the user presses the 'ok'-button.
 * @since 0.1
*/
ITSAMessageControllerClass.prototype[UNDERSCORE+SHOW_MESSAGE] = function(title, message, config) {
    Y.log('_showMessage', 'info', 'ITSAMessageController');
    return this._queueMessage(title, message, config, '{btn_ok}', 'btn_ok', null, SHOW_MESSAGE, INFO, ICON_INFORM, false, true);
};

/**
 * Shows a warning. Because the level will be 'warn', the message has precedence above normal messages.<br>
 * <b>Note:</b> You need a descendant of Y.ITSAMessageViewer (f.i. Y.ITSADialog) to make the message be displayed!
 *
 * @method _showWarning
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
 * @private
 * @return {Y.Promise} Promise that holds the user-response. Resolved once the user presses the 'ok'-button.
 * @since 0.1
*/
ITSAMessageControllerClass.prototype[UNDERSCORE+SHOW_WARNING] = function(title, message, config) {
    Y.log('_showWarning', 'info', 'ITSAMessageController');
    return this._queueMessage(title, message, config, '{btn_ok}', 'btn_ok', null, SHOW_WARNING, WARN, ICON_WARN, false, true);
};

/**
 * Shows an error. Because the level will be 'error', the message has precedence above warnings and normal messages.<br>
 * <b>Note:</b> You need a descendant of Y.ITSAMessageViewer (f.i. Y.ITSADialog) to make the message be displayed!
 *
 * @method _showError
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
 * @private
 * @return {Y.Promise} Promise that holds the user-response. Resolved once the user presses the 'ok'-button.
 * @since 0.1
*/
ITSAMessageControllerClass.prototype[UNDERSCORE+SHOW_ERROR] = function(title, message, config) {
    Y.log('_showError', 'info', 'ITSAMessageController');
    return this._queueMessage(title, message, config, '{btn_ok}', 'btn_ok', null, SHOW_ERROR, ERROR, ICON_ERROR, false, true);
};

/**
 * Returns a promise with reference to the ITSAMessage-instance. The message itself is NOT fullfilled yet!<br>
 * Because there are no buttons to make it fullfilled, you must fullfil the message through itsamessage.resolve() or itsamessage.reject()<br>
 * <b>Note:</b> You need a descendant of Y.ITSAMessageViewer (f.i. Y.ITSADialog) to make the message be displayed!
 *
 * @method _showStatus
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
 * @private
 * @return {Y.Promise} Promise that holds the user-response. Resolves or rejects manually.
 * @since 0.1
*/
ITSAMessageControllerClass.prototype[UNDERSCORE+SHOW_STATUS] = function(title, message, config) {
    Y.log('_showStatus', 'info', 'ITSAMessageController');
    var instance = this,
        params = instance._retrieveParams(title, message, config);
    title = params.title;
    message = params.message;
    config = params.config;
    return instance.isReady().then(
        function() {
            var itsamessage = new Y.ITSAMessage();
            itsamessage.title = title;
            itsamessage.message = message;
            itsamessage._simpleMessage = true;
            itsamessage.type = SHOW_STATUS;
            itsamessage.level = INFO;
            itsamessage.noButtons = true;
            itsamessage.priority = config.priority;
            itsamessage.timeoutResolve = config.timeoutResolve;
            itsamessage.timeoutReject = config.timeoutReject;
            itsamessage.target = config.target;
            itsamessage.source = config.source || APP;
            itsamessage.messageType = SHOW_STATUS;
            instance.queueMessage(itsamessage);
            return itsamessage;
        }
    );
};

/**
 * Fires the ERROR-event and -if not published yet- publish it broadcasted to Y.
 * Because the error-event is broadcasted to Y, it can be catched by gallery-itsaerrorreporter.
 *
 * @method _lazyFireErrorEvent
 * @param {Object} [facade] eventfacade.
 * @private
**/
ITSAMessageControllerClass.prototype._lazyFireErrorEvent = function(facade) {
    var instance = this;

    Y.log('_lazyFireErrorEvent', 'info', 'ITSAMessageController');
    // lazy publish
    if (!instance._errorEvent) {
        instance._errorEvent = instance.publish(ERROR, {
            broadcast: 1
        });
    }
    instance.fire(ERROR, facade);
};

/**
 * Prevented defaultFn as a Promise. Cleans up the Y.ITSAMessage-instance and will not add it to the queue.
 *
 * @method _prevDefFn
 * @param e {EventTarget}
 * @param e.itsamessage {Y.ITSAMessage} Y.ITSAMessage-instance
 * @private
 * @return {Y.Promise} resolve promise
 * @since 0.1
*/
ITSAMessageControllerClass.prototype._prevDefFn = function(e) {
    Y.log('_prevDefFn', 'info', 'ITSAMessageController');
    var itsamessage = e.itsamessage;
    // need to return a Promise
    return new Y.Promise(function (resolve) {
        itsamessage.detachAll();
        itsamessage.destroy();
        itsamessage = null;
        resolve();
    });
};


/**
 * Prevented defaultFn as a Promise. Adds the Y.ITSAMessage-instane to the queue.
 *
 * @method _defQueueFn
 * @param e {EventTarget}
 * @param e.itsamessage {Y.ITSAMessage} Y.ITSAMessage-instance
 * @private
 * @since 0.1
*/
ITSAMessageControllerClass.prototype._defQueueFn = function(e) {
    Y.log('_defQueueFn', 'info', 'ITSAMessageController');
    var instance = this,
        itsamessage = e.itsamessage,
        queue = instance.queue;
    queue.push(itsamessage);

// lazy publish event PUBLISHED_NEWMESSAGE

/**
  * Fired when a new Y.ITSAMessage-instance is added in the pool, that is when the defaultFn of the 'queuemessage'-event executes.
  * @event newmessage
  * @param e {EventFacade} Event Facade including:
  * @param e.itsamessage {Y.ITSAMessage} The new Y.ITSAMessage-instance.
**/

/*jshint expr:true */
    instance[PUBLISHED_NEWMESSAGE] || (instance[PUBLISHED_NEWMESSAGE]=Y.publish(NEWMESSAGE,
                                                                                {
                                                                                  defaultTargetOnly: true,
                                                                                  broadcast: 2,
                                                                                  emitFacade: true
                                                                                }
                                                                               ));
/*jshint expr:false */
    Y.fire(NEWMESSAGE, {itsamessage: itsamessage});
    return itsamessage._promise.then(
                null,
                function() {return true;} // fullfil promise
            ).then(
                function() {
                    var index = queue.indexOf(itsamessage);
/*jshint expr:true */
                    (index>-1) && queue.splice(index, 1);
/*jshint expr:false */
                    itsamessage.detachAll();
                    itsamessage.destroy();
                    itsamessage = null;
                }
            );
};

// define public methods:

/**
 * Creates an Y.ITSAMessage-instance and adds it to the queue.<br>
 *
 * @method _queueMessage
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
 * @param [footer] {String} Footertemplate, typically something like: '{btn_cancel}{btn_ok}' be aware to use <u>brackets</u> to identify the UI-elements!
 * @param [primaryButton] {String} Name of the primary button, f.i. 'btn_ok'.
 * @param [rejectButton] {String} Name of the button that rejects the itsamessage-promie, f.i. 'btn_cancel'.
 * @param [messageType] {String} Identification of the messagetype, which could be used by a Y.ITSAMessageViewer-instance.
 * @param [level] {String} The message-level, should be either 'info', warn' or 'error'.
 * @param [icon] {String} Classname of the iconfont, for instance 'itsaicon-dialog-info' --> see gallerycss-itsa-base for more info about iconfonts.
 * @param [closeButton] {Boolean} whether the closebutton should be visible.
 * @param [simpleMessage] {Boolean} whether the message is a simplemessage with only title+message.
 * @param [ITSAMessageClass] {Y.ITSAMessage-Class} the class that is created, defaults to Y.ITSAMessage, but could be a descendant.
 * @private
 * @since 0.1
*/
ITSAMessageControllerClass.prototype._queueMessage = function(title, message, config, footer, primaryButton, rejectButton, messageType, level, icon, closeButton, simpleMessage, ITSAMessageClass) {
    Y.log('_queueMessage', 'info', 'ITSAMessageController');
    var instance = this,
        params = instance._retrieveParams(title, message, config),
        imageButtons, required, simpleMsg;
    title = params.title;
    message = params.message;
    config = params.config;
    imageButtons = (typeof config.imageButtons === BOOLEAN) && config.imageButtons;
    simpleMsg = ((typeof config.simpleMessage === BOOLEAN) && config.simpleMessage) || ((typeof simpleMessage === BOOLEAN) && simpleMessage) || false;
    required = ((typeof config.required === BOOLEAN) && config.required) || false;
/*jshint expr:true */
    if (imageButtons) {
        footer = footer.replace(/\{btn_/g,'{imgbtn_');
        primaryButton && (primaryButton=primaryButton.replace(/btn_/g,'imgbtn_'));
    }
/*jshint expr:false */
    return instance.isReady().then(
        function() {
            var itsamessage = ITSAMessageClass ? (new ITSAMessageClass()) : (new Y.ITSAMessage());
            itsamessage.title = title;
            itsamessage.message = message;
            itsamessage._config = config;
            itsamessage._simpleMessage = simpleMsg;
            itsamessage.footer = footer;
            itsamessage.icon = config.icon || icon;
            itsamessage.closeButton = required ? false : (config.closeButton || closeButton);
            itsamessage.priority = config.priority;
            itsamessage.imageButtons = imageButtons;
            itsamessage.primaryButton = config.primaryButton || primaryButton; // config.primaryButton should overrule primaryButton
            itsamessage.rejectButton = rejectButton;
            itsamessage.timeoutResolve = config.timeoutResolve;
            itsamessage.timeoutReject = config.timeoutReject;
            itsamessage.target = config.target;
            itsamessage.level = config.level || level; // config.level should overrule the param level;
            itsamessage.source = config.source || APP;
            itsamessage.messageType = messageType;
            return instance.queueMessage(itsamessage);
        }
    );
};

 /**
   * Hack with the help of Luke Smith: https://gist.github.com/lsmith/6664382/d688740bb91f9ecfc3c89456a82f30d35c5095cb
   * Variant of publish(), but works with asynchronious defaultFn and preventedFn.
   *
   * Creates a new custom event of the specified type.  If a custom event
   * by that name already exists, it will not be re-created.  In either
   * case the custom event is returned.
   *
   * @method _publishAsync
   *
   * @param type {String} the type, or name of the event
   * @param opts {object} optional config params.  Valid properties are:
   *
   *  <ul>
   *    <li>
   *   'broadcast': whether or not the YUI instance and YUI global are notified when the event is fired (false)
   *    </li>
   *    <li>
   *   'bubbles': whether or not this event bubbles (true)
   *              Events can only bubble if emitFacade is true.
   *    </li>
   *    <li>
   *   'context': the default execution context for the listeners (this)
   *    </li>
   *    <li>
   *   'defaultFn': the default function to execute when this event fires if preventDefault was not called
   *    </li>
   *    <li>
   *   'emitFacade': whether or not this event emits a facade (false)
   *    </li>
   *    <li>
   *   'prefix': the prefix for this targets events, e.g., 'menu' in 'menu:click'
   *    </li>
   *    <li>
   *   'fireOnce': if an event is configured to fire once, new subscribers after
   *   the fire will be notified immediately.
   *    </li>
   *    <li>
   *   'async': fireOnce event listeners will fire synchronously if the event has already
   *    fired unless async is true.
   *    </li>
   *    <li>
   *   'preventable': whether or not preventDefault() has an effect (true)
   *    </li>
   *    <li>
   *   'preventedFn': a function that is executed when preventDefault is called
   *    </li>
   *    <li>
   *   'queuable': whether or not this event can be queued during bubbling (false)
   *    </li>
   *    <li>
   *   'silent': if silent is true, debug messages are not provided for this event.
   *    </li>
   *    <li>
   *   'stoppedFn': a function that is executed when stopPropagation is called
   *    </li>
   *
   *    <li>
   *   'monitored': specifies whether or not this event should send notifications about
   *   when the event has been attached, detached, or published.
   *    </li>
   *    <li>
   *   'type': the event type (valid option if not provided as the first parameter to publish)
   *    </li>
   *  </ul>
   *
   *  @return {CustomEvent} the custom event
   *  @private
   *
  **/
Y._publishAsync = function(type, opts) {
    var instance = this,
        asyncEvent = this.publish(type, opts);

    Y.log('_publishAsync', 'info', 'ITSAMessageController');
    asyncEvent._firing = new Y.Promise(function (resolve) { resolve(); });

    asyncEvent.fire = function (data) {
        var args  = Y.Array(arguments, 0, true),
            stack = {
                id: asyncEvent.id,
                next: asyncEvent,
                silent: asyncEvent.silent,
                stopped: 0,
                prevented: 0,
                bubbling: null,
                type: asyncEvent.type,
                defaultTargetOnly: asyncEvent.defaultTargetOnly
            }, next;

        asyncEvent._firing = asyncEvent._firing.then(function () {
            asyncEvent.details = args;
            // Execute on() subscribers
            var subs = asyncEvent._subscribers,
                args2 = [],
                e, i, len;

                args2.push.apply(args2, data);
                e = asyncEvent._createFacade(args2);

            e.target = e.target || instance;
            if (subs) {
                for (i = 0, len = subs.length; i < len; ++i) {
                    try {
                        subs[i].fn.call(subs[i].context, e);
                    }
                    catch (catchErr) {
                        Y.log("Error in defaultFn or after subscriber: " + (catchErr && (catchErr.message || catchErr)), ERROR);
                    }
                }
            }
            // Execute on() subscribers for each bubble target and their respective targets:
            if (asyncEvent.bubbles && !asyncEvent.stopped) {
                instance.bubble(asyncEvent, args, null, stack);
                e.prevented = Math.max(e.prevented, stack.prevented);
            }

            // Resolve the _firing promise with either prefentedFn promise if it was prevented, or with a promise for
            // the result of the defaultFn followed by the execution of the after subs.
            return e.prevented ?
                asyncEvent.preventedFn.call(instance, e).then(null, function (reason) {
                    Y.log("Error in preventedFn: " + (reason && (reason.message || reason)), ERROR);
                    return false;
                }) :
                asyncEvent.defaultFn.call(instance, e).then(function () {
                    // no need to handle 'response' it is merged into 'e' within the defaultfunction
                    // Execute after() subscribers

                    subs = asyncEvent._afters;
                    if (subs) {
                        for (i = 0, len = subs.length; i < len; ++i) {
                            try {
                                subs[i].fn.call(subs[i].context, e);
                            }
                            catch (catchErr) {
                                Y.log("Error in defaultFn or after subscriber: " + (catchErr && (catchErr.message || catchErr)), ERROR);
                            }
                        }
                    }
                    // Execute after() subscribers for each bubble target and their respective targets:
                    if (stack.afterQueue) {
                        while ((next = stack.afterQueue.last())) {
                            next();
                        }
                    }

                // Catch errors/preventions and reset the promise state to fulfilled for
                // the next call to fire();
                }).then(null, function (reason) {
                    var facade = {
                        error   : reason && (reason.message || reason),
                        src     : 'ITSAMessageViewer._processQueue'
                    };
                    instance._lazyFireErrorEvent(facade);
                    return false;
                });
        });
    };

    asyncEvent._fire = function (args) {
        return asyncEvent.fire(args[0]);
    };
};

// define 1 global messagecontroller
/*jshint expr:true */
Y.Global.ITSAMessageController || (Y.Global.ITSAMessageController=new ITSAMessageControllerClass());
/*jshint expr:false */
Y.ITSAMessageController = Y.Global.ITSAMessageController;