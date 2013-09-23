YUI.add('gallery-itsamodelsyncpromise', function (Y, NAME) {

'use strict';

/*jshint maxlen:170 */

/**
 *
 * Extention ITSAModelSyncPromise
 *
 *
 * Extends Y.Model with Promised sync-methods. The synclayer can be made just as usual. But instead of calling
 * Model.load and Model.save and Model.destroy, you can use:
 *
 * <b>Model.loadPromise</b>
 * <b>Model.savePromise</b>
 * <b>Model.submitPromise</b>
 * <b>Model.destroyPromise</b>
 *
 * <b>The sync-layer MUST call the callback-function of its related promise-method, otherwise the promises are not resolved.</b>
 *
 * @module gallery-itsamodelsyncpromise
 * @class Y.Model
 * @constructor
 * @since 0.1
 *
 * <i>Copyright (c) 2013 Marco Asbreuk - http://itsasbreuk.nl</i>
 * YUI BSD License - http://developer.yahoo.com/yui/license.html
 *
*/

var YModel = Y.Model,
    YObject = Y.Object,
    YArray = Y.Array,
    START = 'start',
    DESTROY = 'destroy',
/**
 * Fired when an error occurs, such as when an attribute (or property) doesn't validate or when
 * the sync layer submit-function returns an error.
 * @event error
 * @param e {EventFacade} Event Facade including:
 * @param e.error {any} Error message.
 * @param e.src {String} Source of the error. May be one of the following (or any
 *                     custom error source defined by a Model subclass):
 *
 * `submit`: An error submitting the model from within a sync layer.
 *
 * `attributevalidation`: An error validating an attribute (or property). The attribute (or objectproperty)
 *                        that failed validation will be provided as the `attribute` property on the event facade.
 *
 * @param e.attribute {String} The attribute/property that failed validation.
 * @param e.validationerror {String} The errormessage in case of attribute-validation error.
**/
EVT_ERROR = 'error',

/**
 * Fired after model is read from the sync layer.
 * @event load
 * @param e {EventFacade} Event Facade including:
 * @param [e.options] {Object} The options=object that was passed to the sync-layer, if there was one.
 * @param [e.response] {any} The sync layer's raw, unparsed response to the submit-request, if there was one.
 * @since 0.1
**/
EVT_LOAD = 'load',

/**
 * Fired after model is saved through the sync layer.
 * @event save
 * @param e {EventFacade} Event Facade including:
 * @param [e.options] {Object} The options=object that was passed to the sync-layer, if there was one.
 * @param [e.parsed] {Object} The parsed version of the sync layer's response to the save-request, if there was a response.
 * @param [e.response] {any} The sync layer's raw, unparsed response to the save-request, if there was one.
 * @since 0.1
**/
EVT_SAVE = 'save',

/**
 * Fired before the model is read from the sync layer, right after a user calls 'load' or 'loadPromise'.
 * If you want to keep track when the load is finished, you should examine e.promise. This is the prefered way above listening to the 'load'-event,
 * because subscribing to the load-event doesn't hold reference to this particular load-call.
 *
 * @event loadstart
 * @param e {EventFacade} Event Facade including:
 * @param e.target {Y.Model} instance that fired the event.
 * @param e.promise {Y.Promise} returned response --> resolve(response) OR reject(reason). (examine reason.message).
 * @param [e.options] {Object} The options=object that was passed to the sync-layer, if there was one.
 * @since 0.2
**/
EVT_LOAD_START = EVT_LOAD+START,

/**
 * Fired before the model is saved through the sync layer, right after a user calls 'save' or 'savePromise'.
 * If you want to keep track when saving is finished, you should examine e.promise. This is the prefered way above listening to the 'save'-event,
 * because subscribing to the save-event doesn't hold reference to this particular save-call.
 *
 * @event savestart
 * @param e {EventFacade} Event Facade including:
 * @param e.target {Y.Model} instance that fired the event.
 * @param e.promise {Y.Promise} returned response --> resolve(response) OR reject(reason). (examine reason.message).
 * @param e.method {String} either 'create' or 'update', depending on the state of the Model-instance ('create' when isNew())
 * @param [e.options] {Object} The options=object that was passed to the sync-layer, if there was one.
 * @since 0.2
**/
EVT_SAVE_START = EVT_SAVE+START,

PARSED = function (response) {
    if (typeof response === 'string') {
        try {
            return Y.JSON.parse(response);
        } catch (ex) {
            this.fire(EVT_ERROR, {
                error   : ex,
                response: response,
                src     : 'parse'
            });
            return {};
        }
    }
    return response || {};
};

// -- Mixing extra Methods to Y.Model -----------------------------------

/**
  * Destroys this model instance and removes it from its containing lists, if any. The 'callback', if one is provided,
  * will be called after the model is destroyed.<br /><br />
  * If `options.remove` is `true`, then this method delegates to the `sync()` method to delete the model from the persistence layer, which is an
  * asynchronous action. In this case, the 'callback' (if provided) will be called after the sync layer indicates success or failure of the delete operation.
  * <br /><br />
  * To keep track of the proccess, it is preferable to use <b>destroyPromise()</b>.<br />
  * This method will fire 2 events: 'destroystart' before syncing and 'destroy' or 'error' after syncing.
  * <br /><br />
  * <b>CAUTION</b> The sync-method with action 'destroy' <b>must call its callback-function</b> in order to work as espected!
  *
  * @method destroy
  * @param {Object} [options] Sync options. It's up to the custom sync implementation to determine what options it supports or requires, if any.
  *   @param {Boolean} [options.remove=false] If `true`, the model will be deleted via the sync layer in addition to the instance being destroyed.
  * @param {callback} [callback] Called after the model has been destroyed (and deleted via the sync layer if `options.remove` is `true`).
  *   @param {Error|null} callback.err If an error occurred, this parameter will contain the error. Otherwise 'err' will be null.
  *   @param {Any} callback.response The server's response. This value will be passed to the `parse()` method, which is expected to parse it and return an attribute hash.
  * @chainable
*/
YModel.prototype.destroy = function(options, callback) {
    var instance = this;
    Y.log('destroy', 'info', 'ITSA-ModelSyncPromise');
    // by overwriting the default 'save'-method we manage to fire 'destroystart'-event.
    instance.destroyPromise(options).then(
        function(response) {
/*jshint expr:true */
            callback && callback.apply(null, response);
/*jshint expr:false */
        },
        function(err) {
/*jshint expr:true */
            callback && callback.apply(null, err);
/*jshint expr:false */
        }
    );
    return instance;
};

YModel.prototype._prevDefFnDestroy = function(e) {
console.log('model destroy preventdefaultFunc');
    e.promiseReject(new Error('preventDefaulted'));
};

//_defDestroyFn is overridden from Y.Base
YModel.prototype._defDestroyFn = function(e) {
    // first the destruction through Base needs to be done
    this._baseDestroy();

    // now the code typically for Model:
    var instance = this,
        promiseResolve = e.promiseResolve,
        promiseReject = e.promiseReject,
        options = e.options,
        remove = e.remove || e['delete'],
        errFunc, successFunc, finish;

    finish = function() {
        YArray.each(instance.lists.concat(), function (list) {
            list.remove(instance, options);
        });
    };
    // next the typical Model-destroy-code:
    if (remove) {
        errFunc = function(err) {
            var facade = {
                error   : err,
                src     : 'Model.destroyPromise()',
                options : options
            };
            instance._lazyFireErrorEvent(facade);
console.log('model destroy error..');
            promiseReject(new Error(err));
        };
        successFunc = function(response) {
            finish();
console.log('resoving model destroy...');
            promiseResolve(response);
        };
        if (instance.syncPromise) {
            // use the syncPromise-layer
            instance._syncTimeoutPromise('delete', options).then(
                successFunc,
                errFunc
            );
        }
        else {
            instance.sync('delete', options, function (err, response) {
console.log('callback delete');
                if (err) {
                    errFunc(err);
                }
                else {
                    successFunc(response);
                }
            });
        }
    } else {
        finish();
console.log('model destroy about to resolve without remove..');
        promiseResolve();
    }
    return e.promise;
};

/**
 * Destroys this model instance and removes it from its containing lists, if any.
 * <br /><br />
 * If `options.remove` is `true`, then this method delegates to the `sync()`
 * method to delete the model from the persistence layer, which is an
 * asynchronous action.
 * <br /><br />
 * This method will also fire 2 events: 'destroystart' before syncing and 'destroy' or 'error' after syncing.<br />
 * <br /><br />
 * <b>CAUTION</b> The sync-method with action 'destroy' <b>must call its callback-function</b> in order to work as espected!
 *
 * @method destroyPromise
 * @param {Object} [options] Options to be passed to `sync()`. It's up to the custom sync
 *                 implementation to determine what options it supports or requires, if any.
 * @return {Y.Promise} promised response --> resolve(response) OR reject(reason). (examine reason.message).
**/
YModel.prototype.destroyPromise = function (options) {
    var instance = this,
        promise, promiseResolve, promiseReject, extraOptions;

    Y.log('destroyPromise', 'info', 'ITSA-ModelSyncPromise');
    promise = new Y.Promise(function (resolve, reject) {
        promiseResolve = resolve;
        promiseReject = reject;
    });
    extraOptions = {
        promise: promise,
        promiseResolve: promiseResolve,
        promiseReject: promiseReject
    };
/*jshint expr:true */
    options && YObject.each(
        options,
        function(value, key) {
            extraOptions[key] = value;
        }
    );
/*jshint expr:false */
    // lazy publish the destroy-event
    instance.publishAsync(DESTROY, {
        defaultTargetOnly: true,
        emitFacade: true,
        defaultFn: instance._defDestroyFn,
        preventedFn: instance._prevDefFnDestroy
    });
    instance.fire(DESTROY, extraOptions);
    return promise;
};

/**
  * Loads this model from the server.<br />
  * This method delegates to the `sync()` method to perform the actual load
  * operation, which is an asynchronous action. Specify a 'callback' function to
  * be notified of success or failure.
  * <br /><br />
  * A successful load operation will fire a `load` event, while an unsuccessful
  * load operation will fire an `error` event with the `src` value "load".
  * <br /><br />
  * If the load operation succeeds and one or more of the loaded attributes
  * differ from this model's current attributes, a `change` event will be fired.
  * <br /><br />
  * To keep track of the proccess, it is preferable to use <b>loadPromise()</b>.<br />
  * This method will fire 2 events: 'loadstart' before syncing and 'load' or 'error' after syncing.
  * <br /><br />
  * <b>CAUTION</b> The sync-method with action 'load' <b>must call its callback-function</b> in order to work as espected!
  *
  * @method load
  * @param {Object} [options] Options to be passed to `sync()` and to `set()` when setting the loaded attributes.
  *                           It's up to the custom sync implementation to determine what options it supports or requires, if any.
  * @param {callback} [callback] Called when the sync operation finishes.
  *   @param {Error|null} callback.err If an error occurred, this parameter will contain the error. If the sync operation succeeded, 'err' will be null.
  *   @param {Any} callback.response The server's response. This value will be passed to the `parse()` method, which is expected to parse it and return an attribute hash.
  * @chainable
 */
YModel.prototype.load = function(options, callback) {
    var instance = this;

    Y.log('load', 'info', 'ITSA-ModelSyncPromise');
    // by overwriting the default 'save'-method we manage to fire 'loadstart'-event.
    instance.loadPromise(options).then(
        function(response) {
/*jshint expr:true */
            callback && callback.apply(null, response);
/*jshint expr:false */
        },
        function(err) {
/*jshint expr:true */
            callback && callback.apply(null, err);
/*jshint expr:false */
        }
    );
    return instance;
};

/**
 * Loads this model from the server.
 * <br /><br />
 * This method delegates to the `sync()` method to perform the actual load
 * operation, which is an asynchronous action.
 * <br /><br />
 * This method will also fire 2 events: 'loadstart' before syncing and 'load' or 'error' after syncing.<br />
 * A successful load operation will alsoe fire a `load` event, while an unsuccessful
 * load operation will fire an `error` event with the `src` value "load".
 * <br /><br />
 * If the load operation succeeds and one or more of the loaded attributes
 * differ from this model's current attributes, a `change` event will be fired.
 * <br /><br />
 * <b>CAUTION</b> The sync-method with action 'load' <b>must call its callback-function</b> in order to work as espected!
 *
 * @method loadPromise
 * @param {Object} [options] Options to be passed to `sync()`. It's up to the custom sync
 *                 implementation to determine what options it supports or requires, if any.
 * @return {Y.Promise} promised response --> resolve(response) OR reject(reason) (examine reason.message).
**/
YModel.prototype.loadPromise = function (options) {
    var instance = this,
        promise;

    Y.log('loadPromise', 'info', 'ITSA-ModelSyncPromise');
    options = options || {};
    promise = new Y.Promise(function (resolve, reject) {
        var errFunc, successFunc,
              facade = {
                  options : options
              };
        errFunc = function(err) {
            facade.error = err;
            facade.src   = 'Model.loadPromise()';
            instance._lazyFireErrorEvent(facade);
            reject(new Error(err));
        };
        successFunc = function(response) {
            var parsed;
            // Lazy publish.
            if (!instance._loadEvent) {
                instance._loadEvent = instance.publish(EVT_LOAD, {
                    preventable: false
                });
            }
            facade.response = response;
            parsed = PARSED(response);
            if (parsed.responseText) {
                // XMLHttpRequest
                parsed = parsed.responseText;
            }
            facade.parsed = parsed;
            instance.setAttrs(parsed, options);
            instance.changed = {};
            instance.fire(EVT_LOAD, facade);
            resolve(response);
        };
        if (instance.syncPromise) {
            // use the syncPromise-layer
            instance._syncTimeoutPromise('read', options).then(
                successFunc,
                errFunc
            );
        }
        else {
            instance.sync('read', options, function (err, response) {
                if (err) {
                    errFunc(err);
                }
                else {
                    successFunc(response);
                }
            });
        }
    });
    instance.fire(EVT_LOAD_START, {target: instance, promise: promise, options: options});
    return promise;
};

/**
     * Creates a new custom event of the specified type.  If a custom event
     * by that name already exists, it will not be re-created.  In either
     * case the custom event is returned.
     *
     * @method publishAsync
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
     *
     */
YModel.prototype.publishAsync = function(type, opts) {
    var instance = this,
        asyncEvent = this.publish(type, opts);

    asyncEvent._firing = new Y.Promise(function (resolve) { resolve(); });

    asyncEvent.fire = function (data) {
        var args  = Y.Array(arguments, 0, true);

        asyncEvent._firing = asyncEvent._firing.then(function () {
            asyncEvent.details = args;
            // Execute on() subscribers
            var subs = asyncEvent._subscribers,
                args2 = [],
                e,
                i, len;

                args2.push.apply(args2, data);
                e = asyncEvent._createFacade(args2);

            if (subs) {
                for (i = 0, len = subs.length; i < len; ++i) {
                    // TODO: try/catch?
                    subs[i].fn.call(subs[i].context, e);
                }
            }
            // Doesn't support preventedFn
            // Resolve the _firing promise with either false if it was prevented, or with a promise for
            // the result of the defaultFn followed by the execution of the after subs.
            return e.prevented ?
                Y.bind(asyncEvent.preventedFn, instance, e)().then(null, function (err) {
                    Y.log("Error in preventedFn: " + (err && (err.message || err)), 'error');
                    return false;
                })
                :
                Y.bind(asyncEvent.defaultFn, instance, e)().then(function (e) {
                    // Execute after() subscribers
                    subs = asyncEvent._afters;

                    for (i = 0, len = subs.length; i < len; ++i) {
                        subs[i].fn.call(subs[i].context, e);
                    }
                // Catch errors/preventions and reset the promise state to fulfilled for
                // the next call to fire();
                }).then(null, function (err) {
                    Y.log("Error in defaultFn or after subscriber: " + (err && (err.message || err)), 'error');
                    return false;
                });
        },
        function(reason) {
            var facade = {
                error   : reason,
                src     : 'Model.publishAsync()'
            };
            Y.log("Error in publishAsync: " + (err && (err.message || err)), 'error');
            instance._lazyFireErrorEvent(facade);
        });
    };

    asyncEvent._fire = function (args) {
        return asyncEvent.fire(args[0]);
    };
};

/**
 * Saves this model to the server.
 *
 * This method delegates to the `sync()` method to perform the actual save operation, which is an asynchronous action.
 * Specify a 'callback' function to be notified of success or failure.
 * <br /><br />
 * A successful save operation will fire a `save` event, while an unsuccessful save operation will fire an `error` event with the `src` value "save".
 * If the save operation succeeds and one or more of the attributes returned in the server's response differ from this model's current attributes,
 * a `change` event will be fired.
 * <br /><br />
 * To keep track of the proccess, it is preferable to use <b>savePromise()</b>.<br />
 * This method will fire 2 events: 'savestart' before syncing and 'save' or 'error' after syncing.
 * <br /><br />
 * <b>CAUTION</b> The sync-method with action 'save' <b>must call its callback-function</b> in order to work as espected!
 *
 * @method save
 * @param {Object} [options] Options to be passed to `sync()` and to `set()` when setting synced attributes.
 *                           It's up to the custom sync implementation to determine what options it supports or requires, if any.
 * @param {Function} [callback] Called when the sync operation finishes.
 *   @param {Error|null} callback.err If an error occurred or validation failed, this parameter will contain the error.
 *                                    If the sync operation succeeded, 'err' will be null.
 *   @param {Any} callback.response The server's response. This value will be passed to the `parse()` method,
 *                                  which is expected to parse it and return an attribute hash.
 * @chainable
*/
YModel.prototype.save = function(options, callback) {
    var instance = this;

    Y.log('save', 'info', 'ITSA-ModelSyncPromise');
    // by overwriting the default 'save'-method we manage to fire 'savestart'-event.
    instance.savePromise(options).then(
        function(response) {
/*jshint expr:true */
            callback && callback.apply(null, response);
/*jshint expr:false */
        },
        function(err) {
/*jshint expr:true */
            callback && callback.apply(null, err);
/*jshint expr:false */
        }
    );
    return instance;
};

/**
 * Saves this model to the server.
 * <br /><br />
 * This method delegates to the `sync()` method to perform the actual save
 * operation, which is an asynchronous action.
 * <br /><br />
 * This method will also fire 2 events: 'savestart' before syncing and 'save' or 'error' after syncing.<br />
 * A successful save operation will fire a `save` event, while an unsuccessful
 * save operation will fire an `error` event with the `src` value "save".
 * <br /><br />
 * If the save operation succeeds and one or more of the attributes returned in
 * the server's response differ from this model's current attributes, a
 * `change` event will be fired.
 * <br /><br />
 * <b>CAUTION</b> The sync-method with action 'save' <b>must call its callback-function</b> in order to work as espected!
 *
 * @method savePromise
 * @param {Object} [options] Options to be passed to `sync()`. It's up to the custom sync
 *                 implementation to determine what options it supports or requires, if any.
 * @return {Y.Promise} promised response --> resolve(response) OR reject(reason). (examine reason.message).
**/
YModel.prototype.savePromise = function (options) {
    var instance = this,
        usedmethod = instance.isNew() ? 'create' : 'update',
        promise;

    Y.log('savePromise', 'info', 'ITSA-ModelSyncPromise');
    options = options || {};
    promise = new Y.Promise(function (resolve, reject) {
        var errFunc, successFunc,
              facade = {
                  options : options,
                  method: usedmethod
              };
        instance._validate(instance.toJSON(), function (validateErr) {
            if (validateErr) {
                facade.error = validateErr;
                facade.src = 'Model.savePromise() - validate';
                instance._lazyFireErrorEvent(facade);
                reject(new Error(validateErr));
            }
            else {
                errFunc = function(err) {
                    facade.error = err;
                    facade.src   = 'Model.savePromise()';
                    instance._lazyFireErrorEvent(facade);
                    reject(new Error(err));
                };
                successFunc = function(response) {
                    var parsed;
                    // Lazy publish.
                    if (!instance._saveEvent) {
                        instance._saveEvent = instance.publish(EVT_SAVE, {
                            preventable: false
                        });
                    }
                    facade.response = response;
                    parsed = PARSED(response);
                    if (parsed.responseText) {
                        // XMLHttpRequest
                        parsed = parsed.responseText;
                    }
                    facade.parsed = parsed;
                    instance.setAttrs(parsed, options);
                    instance.changed = {};
                    instance.fire(EVT_SAVE, facade);
                    resolve(response);
                };
                if (instance.syncPromise) {
                    // use the syncPromise-layer
                    instance._syncTimeoutPromise(usedmethod, options).then(
                        successFunc,
                        errFunc
                    );
                }
                else {
                    instance.sync(usedmethod, options, function (err, response) {
                        if (err) {
                            errFunc(err);
                        }
                        else {
                            successFunc(response);
                        }
                    });
                }
            }
        });
    });
    instance.fire(EVT_SAVE_START, {target: instance, promise: promise, options: options, method: usedmethod});
    return promise;
};

//===============================================================================================
/**
 * This method can be defined in descendend classes.<br />
 * If syncPromise is defined, then the syncPromise() definition will be used instead of sync() definition.<br />
 * In case an invalid 'action' is defined, the promise will be rejected.
 *
 * @method syncPromise
 * @param action {String} The sync-action to perform.
 * @param [options] {Object} Sync options. The custom synclayer should pass through all options-properties to the server.
 * @return {Y.Promise} returned response for each 'action' --> response --> resolve(dataobject) OR reject(reason).
 * The returned 'dataobject' might be an object or a string that can be turned into a json-object
*/
//===============================================================================================

/**
* Fires the 'error'-event and -if not published yet- publish it broadcasted to Y.
* Because the error-event is broadcasted to Y, it can be catched by gallery-itsaerrorreporter.
*
* @method _lazyFireErrorEvent
 * @param {Object} [facade] eventfacade.
 * @private
**/
YModel.prototype._lazyFireErrorEvent = function(facade) {
    var instance = this;

    Y.log('_lazyFireErrorEvent', 'info', 'ITSA-ModelSyncPromise');
    // lazy publish
    if (!instance._errorEvent) {
        instance._errorEvent = instance.publish(EVT_ERROR, {
            broadcast: 1
        });
    }
    instance.fire(EVT_ERROR, facade);
};

/**
 * This method is used internally and returns syncPromise() that is called with 'action'.
 * If 'action' is not handled as a Promise -inside syncPromise- then this method will reject the promisi.
 *
 * @method _syncTimeoutPromise
 * @param action {String} The sync-action to perform.
 * @param [options] {Object} Sync options. The custom synclayer should pass through all options-properties to the server.
 * @return {Y.Promise} returned response for each 'action' --> response --> resolve(dataobject) OR reject(reason).
 * The returned 'dataobject' might be an object or a string that can be turned into a json-object
 * @private
 * @since 0.2
*/
YModel.prototype._syncTimeoutPromise = function(action, options) {
    var instance = this,
          syncpromise;

    Y.log('_syncTimeoutPromise', 'info', 'widget');
    syncpromise = instance.syncPromise(action, options);
    if (!(syncpromise instanceof Y.Promise)) {
        syncpromise = new Y.Promise(function (resolve, reject) {
            var errormessage = 'syncPromise is rejected --> '+action+' not defined as a Promise inside syncPromise()';
            Y.log('_syncTimeoutPromise: '+errormessage, 'warn', 'widget');
            reject(new Error(errormessage));
        });
    }
    return syncpromise;
};

}, '@VERSION@', {"requires": ["yui-base", "base-base", "base-build", "node-base", "json-parse", "promise", "model"]});
