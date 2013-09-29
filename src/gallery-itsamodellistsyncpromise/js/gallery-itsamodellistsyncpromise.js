'use strict';

/**
 *
 * Extention ITSAModellistSyncPromise
 *
 *
 * Extends Y.ModelList with Promised sync-methods. The ModelList's synclayer can be made just as usual, defining these actions:
 * <br /><br />
 * 'create'
 * 'destroy'
 * 'read'
 * 'readappend'
 * 'save'
 * 'submit'
 * 'update'
 * <br /><br />
 * Instead of calling ModelList.load() you should use:
 * <br />
 * <b>ModelList.loadPromise(options)</b> --> to append the read-models --> options = {append: true};
 * <br /><br />
 * Also, there are 3 extra Promises, which -in this current version- <b>all depends</b> on the Model's synclayer, not ModelLists synclayer:
 * <br />
 * <b>ModelList.destroyPromise()</b><br />
 * <b>ModelList.savePromise()</b><br />
 * <b>ModelList.submitPromise()</b>
 *
 * @module gallery-itsamodelsyncpromise
 * @class Y.ModelList
 * @constructor
 * @since 0.1
 *
 * <i>Copyright (c) 2013 Marco Asbreuk - http://itsasbreuk.nl</i>
 * YUI BSD License - http://developer.yahoo.com/yui/license.html
 *
*/
   var YModelList = Y.ModelList,
       YArray = Y.Array,
       YObject = Y.Object,
       PUBLISHED = '_published',
       READ = 'read',
       APPEND = 'append',
       READAPPEND = READ+APPEND,
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
    ERROR = 'error',

    /**
     * Fired after all changed models of the modellist is saved through the Model-sync layer.
     * @event save
     * @param e {EventFacade} Event Facade including:
     * @param [e.options] {Object} The options=object that was passed to the sync-layer, if there was one.
     * @param [e.parsed] {Object} The parsed version of the sync layer's response to the submit-request, if there was a response.
     * @param [e.response] {any} The sync layer's raw, unparsed response to the submit-request, if there was one.
     * @since 0.1
    **/
    SAVE = 'save',

   /**
     * Fired after models are submitted through the Model-sync layer.
     * @event submit
     * @param e {EventFacade} Event Facade including:
     * @param [e.options] {Object} The options=object that was passed to the sync-layer, if there was one.
     * @param [e.parsed] {Object} The parsed version of the sync layer's response to the submit-request, if there was a response.
     * @param [e.response] {any} The sync layer's raw, unparsed response to the submit-request, if there was one.
     * @since 0.1
    **/
    SUBMIT = 'submit',

   /**
     * Fired after models are appended to the ModelList by the ModelList-sync layer.
     * @event loadappend
     * @param e {EventFacade} Event Facade including:
     * @param [e.options] {Object} The options=object that was passed to the sync-layer, if there was one.
     * @param [e.response] {any} The sync layer's raw, unparsed response to the submit-request, if there was one.
     * @since 0.1
    **/
    LOADAPPEND = 'loadappend',

   /**
     * Fired after models are read from the ModelList-sync layer.
     * @event load
     * @param e {EventFacade} Event Facade including:
     * @param [e.options] {Object} The options=object that was passed to the sync-layer, if there was one.
     * @param [e.response] {any} The sync layer's raw, unparsed response to the submit-request, if there was one.
     * @since 0.1
    **/
    LOAD = 'load',

   /**
     * Fired after models are destroyed from the ModelList-sync layer.
     * @event destroy
     * @param e {EventFacade} Event Facade including:
     * @param [e.options] {Object} The options=object that was passed to the sync-layer, if there was one.
     * @param [e.response] {any} The sync layer's raw, unparsed response to the submit-request, if there was one.
     * @since 0.1
    **/
    DESTROY = 'destroy',
    DESTROYMODELS = DESTROY+'models',
    PROMISE = 'Promise',

    PARSED = function (response) {
        if (typeof response === 'string') {
            try {
                return Y.JSON.parse(response);
            } catch (ex) {
                this.fire(ERROR, {
                    error   : ex,
                    response: response,
                    src     : 'parse'
                });
                return {};
            }
        }
        return response || {};
    };

YArray.each(
    [LOAD, LOADAPPEND, SAVE, SUBMIT, DESTROYMODELS],
    function(Fn) {
        YModelList.prototype[Fn] = function(options, callback) {
            var instance = this,
                promise;

            Y.log(Fn, 'info', 'ITSA-ModelSyncPromise');
            // by overwriting the default 'save'-method we manage to fire 'destroystart'-event.
        /*jshint expr:true */
            (promise=instance[Fn+PROMISE](options)) && callback && promise.then(
                function(response) {
                    callback(null, response);
                },
                function(err) {
                    callback(err);
                }
            );
        /*jshint expr:false */
            return instance;
        };
        YModelList.prototype[Fn+PROMISE] = function (options) {
            Y.log(Fn+PROMISE, 'info', 'ITSA-ModelSyncPromise');
            return this._createPromise(Fn, options);
        };
    }
);

/**
   * Hack with the help of Luke Smith: https://gist.github.com/lsmith/6664382/d688740bb91f9ecfc3c89456a82f30d35c5095cb
   * Variant of publish(), but works with asynchronious defaultFn and preventedFn.
   *
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
  **/
YModelList.prototype.publishAsync = function(type, opts) {
    var instance = this,
        asyncEvent = this.publish(type, opts);

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
        },
        function(reason) {
            var facade = {
                error   : reason,
                src     : 'ModelList.publishAsync()'
            };
            Y.log("Error in publishAsync: " + (reason && (reason.message || reason)), ERROR);
            instance._lazyFireErrorEvent(facade);
        });
    };

    asyncEvent._fire = function (args) {
        return asyncEvent.fire(args[0]);
    };
};

/**
 * DefaultFn for the 'save'-event
 *
 * @method _createPromise
 * @param e {EventTarget}
 * @param e.promise {Y.Promise} promise passed by with the eventobject
 * @param e.promiseReject {Function} handle to the reject-method
 * @param e.promiseResolve {Function} handle to the resolve-method
 * @private
 * @since 0.3
*/
YModelList.prototype._createPromise = function(type, options) {
    var instance = this,
        promise, promiseResolve, promiseReject, extraOptions;

    Y.log('_createPromise', 'info', 'ITSA-ModelSyncPromise');
    promise = new Y.Promise(function (resolve, reject) {
        promiseResolve = resolve;
        promiseReject = reject;
    });
    // we pass the promise, together with the resolve and reject handlers as an option to the event.
    // this way we can fullfill the promise in the defaultFn or prevDefaultFn.
    extraOptions = {
        promise: promise,
        promiseResolve: promiseResolve,
        promiseReject: promiseReject,
        response: '', // making available at the after listener
        parsed: {}, // making available at the after listener
        options: Y.merge(options) // making passing only optins to other events possible
    };
/*jshint expr:true */
    (typeof options==='object') && YObject.each(
        options,
        function(value, key) {
            extraOptions[key] = value;
        }
    );
    // lazy publish the event
    instance[PUBLISHED+type] || (instance[PUBLISHED+type]=instance.publishAsync(type,
                                                                                {
                                                                                  defaultTargetOnly: true,
                                                                                  emitFacade: true,
                                                                                  defaultFn: instance['_defFn_'+type],
                                                                                  preventedFn: instance._prevDefFn
                                                                                }
                                                                               ));
/*jshint expr:false */
    instance.fire(type, extraOptions);
    return promise;
};

/**
 * Fired when all models are destroyed. In case {remove: true} is used, the after-event occurs after the synlayer is finished.
 * @event destroymodels
 * @param e {EventFacade} Event Facade including:
 * @param e.promise {Promise} The promise that is automaticly created during the event. You could examine this instead of listening to both the `after`- and `error`-event.
 * @param [e.options] {Object} The options=object that was passed to the sync-layer, if there was one.
 * @since 0.1
**/

/**
* Destroys all models within this modellist.
* <b>Caution:</b> The current version uses the Model's synclayer, NOT ModelList's synclayer.
*
* This method delegates to the Model's`sync()` method to perform the actual destroy
* operation, which is an asynchronous action. Within the Y.Model-class, you <b>must</b> specify a _callback_ function to
 * make the promise work.
*
* A successful destroy operation will fire a `destroy` event, while an unsuccessful
* save operation will fire an `error` event with the `src` value "destroy".
*
* @method _defFn_destroy
 * @param {Object} [options] Options to be passed to all Model's`sync()`. It's up to the custom sync
 *                 implementation to determine what options it supports or requires, if any.
 * @return {Y.Promise} promised response --> resolve(response, options) OR reject(reason).
**/
YModelList.prototype._defFn_destroy = function(e) {
    var instance = this,
        destroylist = [],
        options = e.options;

    Y.log('_defFn_destroy', 'info', 'Itsa-ModellistSyncPromise');
    instance.each(
        function(model) {
            destroylist.push(model.destroyPromise(options));
        }
    );
    return Y.batch.apply(Y, destroylist).then(
//            return Y.Promise.every(destroylist).then(
        function(data) {
            var facade = {
                options : options,
                src : DESTROY
            };
            // Lazy publish.
            if (!instance._destroyEvent) {
                instance._destroyEvent = instance.publish(DESTROY, {
                    preventable: false
                });
            }
            instance.fire(DESTROY, facade);
            return data;
        },
        function(err) {
            var facade = {
                options : options,
                src : DESTROY,
                error: err
            };
            instance._lazyFireErrorEvent(facade);
            return err;
        }
    );
};

/**
 * Loads models from the server and adds them into the ModelList. <br />
 * Without options, previous items will be replaced. Use loadPromise({append: true}) to append the items.<br /><br />
 *
 * This method delegates to the `sync()` method, by either using the 'read' or 'readappend' action, depending
 * on the value of parameter options.append.
 * This is an asynchronous action. You <b>must</b> specify a _callback_ function to
 * make the promise work.
 *
 * A successful load operation will fire a `load` event, while an unsuccessful
 * load operation will fire an `error` event with the `src` value "load".
 *
 * If the load operation succeeds and one or more of the loaded attributes
 * differ from this model's current attributes, a `change` event will be fired for every Model.
 *
 * @method _defFn_load
 * @param {Object} [options] Options to be passed to `sync()`. The custom sync
 *                 implementation can determine what options it supports or requires, if any.
 * @param {Boolean} [options.append] Set true if you want to append items.
 * @return {Y.Promise} promised response --> resolve(response, options) OR reject(reason).
**/
YArray.each(
    [LOAD, LOADAPPEND],
    function(eventType) {
        YModelList.prototype['_defFn_'+eventType] = function (e) {
            var instance = this,
                readsync = (eventType===LOADAPPEND) ? READAPPEND : READ,
                options = e.options,
                errFunc, successFunc,
                facade = {
                    options : options
                };

            Y.log('_defFn_'+eventType, 'info', 'ITSA-ModelSyncPromise');
            errFunc = function(err) {
                facade.error = err;
                facade.src   = LOAD;
                instance._lazyFireErrorEvent(facade);
                e.promiseReject(new Error(err));
            };
            successFunc = function(response) {
                var parsed;
                e.response = response;
                parsed = PARSED(response);
                if (parsed.responseText) {
                    // XMLHttpRequest
                    parsed = parsed.responseText;
                }
                e.parsed = parsed;
                facade.parsed = parsed;
                if (eventType===LOADAPPEND) {
                    instance.add(parsed, options);
                }
                else {
                    instance.reset(parsed, options);
                }
                e.promiseResolve(response);
            };
            if (instance.syncPromise) {
                // use the syncPromise-layer
                instance._syncTimeoutPromise(readsync, options).then(
                    successFunc,
                    errFunc
                );
            }
            else {
                instance.sync(readsync, options, function (err, response) {
                    if (err) {
                        errFunc(err);
                    }
                    else {
                        successFunc(response);
                    }
                });
            }
            return e.promise;
        }
    }
);

YModelList.prototype._defFn_load = function (options) {
    var instance = this,
         optionsappend, append, eventname;

    Y.log('_defFn_load', 'info', 'Itsa-ModellistSyncPromise');
    options = options || {};
    optionsappend = options.append;
    append = ((typeof optionsappend === 'boolean') && optionsappend);
    eventname = append ? LOADAPPEND : LOAD;
    return new Y.Promise(function (resolve, reject) {
        var errFunc, successFunc,
            syncmethod = append ? READAPPEND : READ,
              facade = {
                  options : options
              };
        errFunc = function(err) {
            facade.error = err;
            facade.src   = append ? LOADAPPEND : LOAD;
            instance._lazyFireErrorEvent(facade);
            reject(new Error(err));
        };
        successFunc = function(response) {
            var parsed;
            // Lazy publish.
            if (!instance['_'+eventname]) {
                instance['_'+eventname] = instance.publish(eventname, {
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
            if (append) {
                instance.add(parsed, options);
            }
            else {
                instance.reset(parsed, options);
            }
            instance.fire(eventname, facade);
            resolve(response);
        };
        if (instance.syncPromise) {
            // use the syncPromise-layer
            instance._syncTimeoutPromise(syncmethod, options).then(
                successFunc,
                errFunc
            );
        }
        else {
            instance.sync(syncmethod, options, function (err, response) {
                if (err) {
                    errFunc(err);
                }
                else {
                    successFunc(response);
                }
            });
        }
    });
};

/**
* Saves all modified models within this modellist to the server.
* <b>Caution:</b> within the current version the Model's synclayer is used, NOT ModelList's synclayer.
* Therefore, you get multiple requests for all modified Models.
*
* This method delegates to the Model's`sync()` method to perform the actual save
* operation, which is an asynchronous action. Within the Y.Model-class, you <b>must</b> specify a _callback_ function to
 * make the promise work.
*
* A successful save operation will fire a `save` event, while an unsuccessful
* save operation will fire an `error` event with the `src` value "save".
*
* If the save operation succeeds and one or more of the attributes returned in
* the server's response differ from this model's current attributes, a
* `change` event will be fired.
*
* @method _defFn_save
 * @param {Object} [options] Options to be passed to all Model's`sync()`. It's up to the custom sync
 *                 implementation to determine what options it supports or requires, if any.
 * @return {Y.Promise} promised response --> resolve(response, options) OR reject(reason).
**/
YModelList.prototype._defFn_save = function(options) {
    var instance = this,
          savelist = [];

    Y.log('_defFn_save', 'info', 'Itsa-ModellistSyncPromise');
    instance.each(
        function(model) {
            if (model.isModified()) {
                savelist.push(model.savePromise(options));
            }
        }
    );
    return Y.batch.apply(Y, savelist).then(
//            return Y.Promise.every(savelist).then(
        function(data) {
            var facade = {
                options : options,
                src : SAVE
            };
            // Lazy publish.
            if (!instance._saveEvent) {
                instance._saveEvent = instance.publish(SAVE, {
                    preventable: false
                });
            }
            instance.fire(SAVE, facade);
            return data;
        },
        function(err) {
            var facade = {
                options : options,
                src : SAVE,
                error: err
            };
            instance._lazyFireErrorEvent(facade);
            return err;
        }
    );
};

/**
* Submits all models within this modellist to the server.
* <b>Caution:</b> within the current version the Model's synclayer is used, NOT ModelList's synclayer.
* Therefore, you get multiple requests for all Models.
*
* This method delegates to the Model's`sync()` method to perform the actual submit
* operation, which is an asynchronous action. Within the Y.Model-class, you <b>must</b> specify a _callback_ function to
 * make the promise work.
*
* A successful save operation will fire a `submit` event, while an unsuccessful
* save operation will fire an `error` event with the `src` value "submit".
*
* @method _defFn_submit
 * @param {Object} [options] Options to be passed to all Model's`sync()`. It's up to the custom sync
 *                 implementation to determine what options it supports or requires, if any.
 * @return {Y.Promise} promised response --> resolve(response, options) OR reject(reason).
**/
YModelList.prototype._defFn_submit = function(options) {
    var instance = this,
          submitlist = [];

    Y.log('_defFn_submit', 'info', 'Itsa-ModellistSyncPromise');
    instance.each(
        function(model) {
            submitlist.push(model.submitPromise(options));
        }
    );
    return Y.batch.apply(Y, submitlist).then(
//            return Y.Promise.every(submitlist).then(
        function(data) {
            var facade = {
                options : options,
                src : SUBMIT
            };
            // Lazy publish.
            if (!instance._submitEvent) {
                instance._submitEvent = instance.publish(SUBMIT, {
                    preventable: false
                });
            }
            instance.fire(SUBMIT, facade);
            return data;
        },
        function(err) {
            var facade = {
                options : options,
                src : SUBMIT,
                error: err
            };
            instance._lazyFireErrorEvent(facade);
            return err;
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
YModelList.prototype._lazyFireErrorEvent = function(facade) {
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
 * @param e.promise {Y.Promise} promise passed by with the eventobject
 * @param e.promiseReject {Function} handle to the reject-method
 * @param e.promiseResolve {Function} handle to the resolve-method
 * @private
 * @since 0.3
*/
YModelList.prototype._prevDefFn = function(e) {
    Y.log('_prevDefFn', 'info', 'ITSA-ModelSyncPromise');
    e.promiseReject(new Error('preventDefaulted'));
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
YModelList.prototype._syncTimeoutPromise = function(action, options) {
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