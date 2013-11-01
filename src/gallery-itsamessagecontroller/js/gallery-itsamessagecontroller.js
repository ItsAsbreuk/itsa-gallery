'use strict';

/*jshint maxlen:205 */

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

    var ITSAMessageControllerInstance,
        YArray = Y.Array,
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
        NEWMESSAGE = 'new' + MESSAGE,
        PUBLISHED_NEWMESSAGE = PUBLISHED+NEWMESSAGE,
        NEWMESSAGE_ADDED = NEWMESSAGE+'_added',
        PUBLISHED_NEWMESSAGE_ADDED = PUBLISHED+NEWMESSAGE_ADDED,
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

ITSAMessageControllerClass.prototype.initializer = function() {
    var instance = this;
    instance.queue = [];
    instance._targets = {
        info: ITSADIALOG,
        warn: ITSADIALOG,
        error: ITSADIALOG
    };
    Y.later(LOADDELAY, instance, instance.readyPromise);
};

ITSAMessageControllerClass.prototype._retrieveParams = function(title, message, config) {
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

ITSAMessageControllerClass.prototype.readyPromise = function() {
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

ITSAMessageControllerClass.prototype[UNDERSCORE+GET_RETRY_CONFIRMATION] = function(title, message, config) {
    return this._queueMessage(title, message, config, '{btn_abort}{btn_ignore}{btn_retry}', 'btn_retry', 'btn_abort', GET_RETRY_CONFIRMATION, INFO, ICON_WARN);
};

ITSAMessageControllerClass.prototype[UNDERSCORE+GET_CONFIRMATION] = function(title, message, config) {
    return this._queueMessage(title, message, config, '{btn_no}{btn_yes}', 'btn_yes', 'btn_no', GET_CONFIRMATION, INFO, ICON_QUESTION);
};

ITSAMessageControllerClass.prototype[UNDERSCORE+GET_URL] = function(title, message, config) {
    var instance = this,
        params = instance._retrieveParams(title, message, config),
        newconfig = params.config;
    newconfig.url = true;
    return instance[UNDERSCORE+GET_INPUT](params.title, params.message, newconfig);
};

ITSAMessageControllerClass.prototype[UNDERSCORE+GET_EMAIL] = function(title, message, config) {
    var instance = this,
        params = instance._retrieveParams(title, message, config),
        newconfig = params.config;
    newconfig.email = true;
    return instance[UNDERSCORE+GET_INPUT](params.title, params.message, newconfig);
};

ITSAMessageControllerClass.prototype[UNDERSCORE+GET_INPUT] = function(title, message, config) {
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

    formconfig.required = true;
    required = (typeof config.required === BOOLEAN) && config.required;
    return instance.readyPromise().then(
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
            return instance._queueMessage(title, message, config, (required ? '' : '{btn_cancel}') + '{btn_ok}', 'btn_ok', (required ? null : 'btn_cancel'), GET_INPUT, INFO, ICON_INFO, MyITSAMessage);
        }
    );
};

ITSAMessageControllerClass.prototype[UNDERSCORE+GET_NUMBER] = function(title, message, config) {
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
    return instance.readyPromise().then(
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
            return instance._queueMessage(title, message, config, (required ? '' : '{btn_cancel}') + '{btn_ok}', 'btn_ok', (required ? null : 'btn_cancel'), GET_NUMBER, INFO, ICON_INFO, MyITSAMessage);
        }
    );
};

ITSAMessageControllerClass.prototype[UNDERSCORE+SHOW_MESSAGE] = function(title, message, config) {
    return this._queueMessage(title, message, config, '{btn_ok}', 'btn_ok', null, SHOW_MESSAGE, INFO, ICON_INFORM);
};

ITSAMessageControllerClass.prototype[UNDERSCORE+SHOW_WARNING] = function(title, message, config) {
    return this._queueMessage(title, message, config, '{btn_ok}', 'btn_ok', null, SHOW_WARNING, WARN, ICON_WARN);
};

ITSAMessageControllerClass.prototype[UNDERSCORE+SHOW_ERROR] = function(title, message, config) {
    return this._queueMessage(title, message, config, '{btn_ok}', 'btn_ok', null, SHOW_ERROR, ERROR, ICON_ERROR);
};

// returns a promise whith reference to the ITSAMessage-instance. The message itself is NOT fullfilled yet!
// Because there are no buttons to make it fullfilled, you must fullfil the message through itsamessage.resolvePromise() or itsamessage.rejectPromise()
ITSAMessageControllerClass.prototype[UNDERSCORE+SHOW_STATUS] = function(title, message, config) {
    var instance = this;
    return instance.readyPromise().then(
        function() {
            var itsamessage = new Y.ITSAMessage();
            itsamessage.title = title;
            itsamessage.message = message;
            itsamessage.type = SHOW_STATUS;
            itsamessage.level = INFO;
            itsamessage.noButtons = true;
            itsamessage.target = config.target;
            itsamessage.source = config.source || APP;
            itsamessage.messageType = SHOW_STATUS;
            instance.queueMessage(itsamessage);
            return itsamessage;
        }
    );
};

ITSAMessageControllerClass.prototype.queueMessage = function(itsamessage) {
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
    itsamessage.promise = promise;
    itsamessage.resolvePromise = promiseResolve;
    itsamessage.rejectPromise = promiseReject;
    // always keep itsamessageinstance life synced:
    itsamessage.after(
        'submit',
        function() {
            itsamessage.resolve();
        }
    );
    // lazy publish the event
    /**
      * Event fired when the add-button is clicked.
      * defaultFunction = _defPluginAddFn
      * @event addclick
      * @param e {EventFacade} Event Facade including:
      * @param e.newModel {Y.Model} The new model-instance.
      * @param e.currentTarget {Y.Node} The Button-Node that was clicked
      * @param e.property {String} The property-name of the Object (or the Model's attribute-name)
    **/
    instance[PUBLISHED_NEWMESSAGE] || (instance[PUBLISHED_NEWMESSAGE]=Y._publishAsync(NEWMESSAGE,
                                                                        {
                                                                          defaultTargetOnly: true,
                                                                          emitFacade: true,
                                                                          broadcast: 2,
                                                                          defaultFn: Y.rbind(instance._defQueueFn, instance),
                                                                          preventedFn: instance._prevDefFn
                                                                        }
                                                                       ));
    Y.fire(NEWMESSAGE, {model: itsamessage});
/*jshint expr:false */
    return promise;
};

ITSAMessageControllerClass.prototype.destructor = function() {
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

    Y.log('_lazyFireErrorEvent', 'info', 'ITSA-ModelSyncPromise');
    // lazy publish
    if (!instance._errorEvent) {
        instance._errorEvent = instance.publish(ERROR, {
            broadcast: 1
        });
    }
    instance.fire(ERROR, facade);
};

/**
 * Prevented defaultFn as a Promise. Makes internal e.promise to be rejected.
 *
 * @method _prevDefFn
 * @param e {EventTarget}
 * @param e.model {Y.ITSAMessage} message-instance
 * @private
 * @since 0.3
*/
ITSAMessageControllerClass.prototype._prevDefFn = function(e) {
    Y.log('_prevDefFn', 'info', 'ITSA-ModelSyncPromise');
    var itsamessage = e.model;
    itsamessage.detachAll();
    itsamessage.destroy();
    itsamessage = null;
};


ITSAMessageControllerClass.prototype._defQueueFn = function(e) {
    var instance = this,
        itsamessage = e.model,
        queue = instance.queue;
    queue.push(itsamessage);
    // lazy publish event PUBLISHED_NEWMESSAGE_ADDED
    /**
      * Event fired when the add-button is clicked.
      * defaultFunction = _defPluginAddFn
      * @event addclick
      * @param e {EventFacade} Event Facade including:
      * @param e.newModel {Y.Model} The new model-instance.
      * @param e.currentTarget {Y.Node} The Button-Node that was clicked
      * @param e.property {String} The property-name of the Object (or the Model's attribute-name)
    **/
/*jshint expr:true */
    instance[PUBLISHED_NEWMESSAGE_ADDED] || (instance[PUBLISHED_NEWMESSAGE_ADDED]=Y.publish(NEWMESSAGE_ADDED,
                                                                                {
                                                                                  defaultTargetOnly: true,
                                                                                  broadcast: 2,
                                                                                  emitFacade: true
                                                                                }
                                                                               ));
/*jshint expr:false */
    Y.fire(NEWMESSAGE_ADDED, {model: itsamessage});
    return itsamessage.promise.then(
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

ITSAMessageControllerClass.prototype._queueMessage = function(title, message, config, footer, primaryButton, rejectButton, messageType, level, icon, ITSAMessageClass) {
    var instance = this,
        params = instance._retrieveParams(title, message, config),
        imageButtons;
    title = params.title;
    message = params.message;
    config = params.config;
    imageButtons = (typeof config.imageButtons === BOOLEAN) && config.imageButtons;
/*jshint expr:true */
    if (imageButtons) {
        footer = footer.replace(/\{btn_/g,'{imgbtn_');
        primaryButton && (primaryButton=primaryButton.replace(/btn_/g,'imgbtn_'));
    }
/*jshint expr:false */
    return instance.readyPromise().then(
        function() {
            var itsamessage = ITSAMessageClass ? (new ITSAMessageClass()) : (new Y.ITSAMessage());
            itsamessage.title = title || config.title;
            itsamessage.message = message || config.message;
            itsamessage.footer = footer || config.footer;
            itsamessage.icon = config.icon || icon;
            itsamessage.imageButtons = imageButtons;
            itsamessage.primaryButton = config.primaryButton || primaryButton; // config.primaryButton should overrule primaryButton
            itsamessage.rejectButton = rejectButton || config.rejectButton;
            itsamessage.target = config.target;
            itsamessage.level = config.level || level || config.type; // config.level should overrule the param level; config.type is for backwards compatibility
            itsamessage.source = config.source || APP;
            itsamessage.messageType = messageType || config.type;
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

    Y.log('_publishAsync', 'info', 'ITSA-ModelSyncPromise');
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
ITSAMessageControllerInstance = Y.ITSAMessageController = Y.Global.ITSAMessageController;

// now generate public methods:
Y[GET_RETRY_CONFIRMATION] = Y.bind(ITSAMessageControllerInstance[UNDERSCORE+GET_RETRY_CONFIRMATION], ITSAMessageControllerInstance);
Y.confirm = Y[GET_CONFIRMATION] = Y.bind(ITSAMessageControllerInstance[UNDERSCORE+GET_CONFIRMATION], ITSAMessageControllerInstance);
Y.prompt = Y[GET_INPUT] = Y.bind(ITSAMessageControllerInstance[UNDERSCORE+GET_INPUT], ITSAMessageControllerInstance);
Y[GET_NUMBER] = Y.bind(ITSAMessageControllerInstance[UNDERSCORE+GET_NUMBER], ITSAMessageControllerInstance);
Y[GET_EMAIL] = Y.bind(ITSAMessageControllerInstance[UNDERSCORE+GET_EMAIL], ITSAMessageControllerInstance);
Y[GET_URL] = Y.bind(ITSAMessageControllerInstance[UNDERSCORE+GET_URL], ITSAMessageControllerInstance);
Y[SHOW_MESSAGE] = Y.bind(ITSAMessageControllerInstance[UNDERSCORE+SHOW_MESSAGE], ITSAMessageControllerInstance);
Y.alert = Y[SHOW_WARNING] = Y.bind(ITSAMessageControllerInstance[UNDERSCORE+SHOW_WARNING], ITSAMessageControllerInstance);
Y[SHOW_ERROR] = Y.bind(ITSAMessageControllerInstance[UNDERSCORE+SHOW_ERROR], ITSAMessageControllerInstance);
Y[SHOW_STATUS] = Y.bind(ITSAMessageControllerInstance[UNDERSCORE+SHOW_STATUS], ITSAMessageControllerInstance);