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

    var APP = 'application',
        ERROR = 'error',
        INFO = 'info',
        WARN = 'warn',
        ESSAGE = 'essage',
        MESSAGE = 'm'+ESSAGE,
        LOADDELAY = 5000,
        PUBLISHED = '_pub_',
        NEWMESSAGE = 'new' + MESSAGE,
        PUBLISHED_NEWMESSAGE = PUBLISHED+NEWMESSAGE,
        NEWMESSAGE_ADDED = NEWMESSAGE+'_added',
        PUBLISHED_NEWMESSAGE_ADDED = PUBLISHED+NEWMESSAGE_ADDED,
        MODELLIST = 'model-list',
        GALLERY_ITSAMESSAGE = 'gallery-itsamessage',
        GET = 'get',
        SHOW = 'show',
        DATE = 'Date',
        TIME = 'Time',
        CONFIRMATION = 'Confirmation',
        GET_RETRY_CONFIRMATION = GET+'Retry'+CONFIRMATION,
        GET_CONFIRMATION = GET+CONFIRMATION,
        GET_INPUT = GET+'Input',
        GET_NUMBER = GET+'Number',
        GET_DATE = GET+DATE,
        GET_TIME = GET+TIME,
        GET_DATE_TIME = GET_DATE+TIME,
        SHOW_MESSAGE = SHOW+'M'+ESSAGE,
        SHOW_WARNING = SHOW+'Warning',
        SHOW_ERROR = SHOW+'Error',
        GET_LOGIN = GET+'Login',
        levelValue = {
            error: 0,
            warn: 1,
            info: 2
        };


function ITSAMessageController() {
    ITSAMessageController.superclass.constructor.apply(this, arguments);
}

ITSAMessageController.NAME = 'itsamessagecontroller';

Y.extend(ITSAMessageController, Y.Base);

ITSAMessageController.prototype.initializer = function() {
    var instance = this;
    Y.later(LOADDELAY, instance, instance.readyPromise);
};

ITSAMessageController.prototype.readyPromise = function() {
    var instance = this;
    return instance._readyPromise || (instance._readyPromise=Y.usePromise(MODELLIST, GALLERY_ITSAMESSAGE).then(
        Y.bind(instance._initQueue, instance)
    ));
};

ITSAMessageController.prototype._initQueue = function() {
    var instance = this,
        queue;
    queue = instance.queue = new Y.ModelList();
    queue.comparator = function (model) {
      return levelValue[model.get('level')];
    };


Y.later(2000, null, function(){console.log(instance.queue.size());}, null, true);


};

ITSAMessageController.prototype[GET_RETRY_CONFIRMATION] = function(title, message, config) {
    return this._queueMessage(title, message, config, '{btn_abort}{btn_ignore}{btn_retry}', GET_RETRY_CONFIRMATION, INFO);
};

ITSAMessageController.prototype[GET_CONFIRMATION] = function(title, message, config) {
    return this._queueMessage(title, message, config, '{btn_no}{btn_yes}', GET_CONFIRMATION, INFO);
};

ITSAMessageController.prototype[GET_INPUT] = function(title, message, config) {
    return this._queueMessage(title, message, config, '{btn_cancel}{btn_ok}', GET_INPUT, INFO);
};

ITSAMessageController.prototype[GET_NUMBER] = function(title, message, config) {
    return this._queueMessage(title, message, config, '{btn_cancel}{btn_ok}', GET_NUMBER, INFO);
};

ITSAMessageController.prototype[GET_DATE] = function(title, message, config) {
    return this._queueMessage(title, message, config, '{btn_cancel}{btn_ok}', GET_DATE, INFO);
};

ITSAMessageController.prototype[GET_TIME] = function(title, message, config) {
    return this._queueMessage(title, message, config, '{btn_cancel}{btn_ok}', GET_TIME, INFO);
};

ITSAMessageController.prototype[GET_DATE_TIME] = function(title, message, config) {
    return this._queueMessage(title, message, config, '{btn_cancel}{btn_ok}', GET_DATE_TIME, INFO);
};

ITSAMessageController.prototype[SHOW_MESSAGE] = function(title, message, config) {
    return this._queueMessage(title, message, config, '{btn_ok}', SHOW_MESSAGE, INFO);
};

ITSAMessageController.prototype[SHOW_WARNING] = function(title, message, config) {
    return this._queueMessage(title, message, config, '{btn_ok}', SHOW_WARNING, WARN);
};

ITSAMessageController.prototype[SHOW_ERROR] = function(title, message, config) {
    return this._queueMessage(title, message, config, '{btn_ok}', SHOW_ERROR, ERROR);
};

ITSAMessageController.prototype[GET_LOGIN] = function(title, message, config) {
    return this._queueMessage(title, message, config, '{btn_cancel}{btn_ok}', GET_LOGIN, INFO);
};

ITSAMessageController.prototype.queueMessage = function(itsamessage) {
console.log('queueMessage '+itsamessage.get('message'));
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
    instance[PUBLISHED_NEWMESSAGE] || (instance[PUBLISHED_NEWMESSAGE]=instance._publishAsync(NEWMESSAGE,
                                                                                {
                                                                                  defaultTargetOnly: true,
                                                                                  emitFacade: true,
                                                                                  defaultFn: Y.rbind(instance._defQueueFn, instance),
                                                                                  preventedFn: instance._prevDefFn
                                                                                }
                                                                               ));
    instance.readyPromise().then(
        function() {
console.log('fireing '+NEWMESSAGE);
            instance.fire(NEWMESSAGE, {model: itsamessage});
            (itsamessage instanceof Y.ITSAMessage) || itsamessage.rejectPromise(new Error('Param added to queueMessage is no instance of Y.ITSAMessage'));
        }
    );
/*jshint expr:false */
    return promise;
};

ITSAMessageController.prototype.destructor = function() {
    var queue = this.queue;
/*jshint expr:true */
    queue && queue.destroy();
/*jshint expr:false */
};

/**
 * Prevented defaultFn as a Promise. Makes internal e.promise to be rejected.
 *
 * @method _prevDefFn
 * @param e {EventTarget}
 * @param e.promise {Y.Promise} promise passed by with the eventobject
 * @param e.promiseReject {Function} handle to the reject-method
 * @param e.promiseResolve {Function} handle to the resolve-method
 * @private
 * @since 0.3
*/
ITSAMessageController.prototype._prevDefFn = function(e) {
    Y.log('_prevDefFn', 'info', 'ITSA-ModelSyncPromise');
    e.message.promiseReject(new Error('preventDefaulted'));
};


ITSAMessageController.prototype._defQueueFn = function(e) {
console.log('_defQueueFn '+e.model.get('message'));
    var instance = this,
        itsamessage = e.model,
        queue = instance.queue;
    queue.add(itsamessage);
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
    instance[PUBLISHED_NEWMESSAGE_ADDED] || (instance[PUBLISHED_NEWMESSAGE_ADDED]=instance.publish(NEWMESSAGE_ADDED,
                                                                                {
                                                                                  defaultTargetOnly: true,
                                                                                  emitFacade: true
                                                                                }
                                                                               ));
/*jshint expr:false */
console.log('fireing '+NEWMESSAGE_ADDED);
    instance.fire(NEWMESSAGE_ADDED, {model: itsamessage});
    return itsamessage.promise.then(
                function() {
                    queue.remove(itsamessage);
                },
                function() {
                    queue.remove(itsamessage);
                }
            );
};

ITSAMessageController.prototype._queueMessage = function(title, message, config, footer, messageType, level) {
console.log('_queueMessage '+title);
    var instance = this,
        withTitle = (typeof message === 'string'),
        newconfig, imagebuttons;
    if (!withTitle) {
        config = message;
        message = title;
        title = null;
    }
    imagebuttons = config && (typeof config.imagebuttons === 'boolean') && config.imagebuttons;
/*jshint expr:true */
    imagebuttons && (footer=footer.replace(/\{btn_/g,'{imgbtn_'));
/*jshint expr:false */
    newconfig = Y.merge(config, {
        title: title,
        message: message,
        footer: footer,
        source: APP,
        type: messageType,
        level: level
    });
/*jshint expr:true */
    config.level && (newconfig.level=config.level); // config.level should overrule the param level
    newconfig.level || (newconfig.level=config.type); // config.type is for backwards compatibility
/*jshint expr:false */
    return instance.readyPromise().then(
        function() {
            return instance.queueMessage(new Y.ITSAMessage(newconfig));
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
ITSAMessageController.prototype._publishAsync = function(type, opts) {
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
                    Y.log("Error in defaultFn or after subscriber: " + (reason && (reason.message || reason)), ERROR);
                    return false;
                });
        });
    };

    asyncEvent._fire = function (args) {
        return asyncEvent.fire(args[0]);
    };
};

// define 1 global messagecontroller
YUI.Env.ITSAMessageController = new ITSAMessageController();

