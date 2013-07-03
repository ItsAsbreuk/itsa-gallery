if (typeof _yuitest_coverage == "undefined"){
    _yuitest_coverage = {};
    _yuitest_coverline = function(src, line){
        var coverage = _yuitest_coverage[src];
        if (!coverage.lines[line]){
            coverage.calledLines++;
        }
        coverage.lines[line]++;
    };
    _yuitest_coverfunc = function(src, name, line){
        var coverage = _yuitest_coverage[src],
            funcId = name + ":" + line;
        if (!coverage.functions[funcId]){
            coverage.calledFunctions++;
        }
        coverage.functions[funcId]++;
    };
}
_yuitest_coverage["build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js",
    code: []
};
_yuitest_coverage["build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js"].code=["YUI.add('gallery-itsamodelsyncpromise', function (Y, NAME) {","","'use strict';","","/**"," *"," * Extention ITSAModelSyncPromise"," *"," *"," * Extends Y.Model with Promised sync-methods. The synclayer can be made just as usual. But instead of calling"," * Model.load and Model.save and Model.destroy, you can use:"," *"," * <b>Model.loadPromise</b>"," * <b>Model.savePromise</b>"," * <b>Model.submitPromise</b>"," * <b>Model.destroyPromise</b>"," *"," * <b>The sync-layer MUST call the callback-function of its related promise-method, otherwise the promises are not resolved.</b>"," *"," * @module gallery-itsamodelsyncpromise"," * @class Y.Model"," * @constructor"," * @since 0.1"," *"," * <i>Copyright (c) 2013 Marco Asbreuk - http://itsasbreuk.nl</i>"," * YUI BSD License - http://developer.yahoo.com/yui/license.html"," *","*/","","   var YArray = Y.Array,","","   /**","     * Fired when an error occurs, such as when an attribute (or property) doesn't validate or when","     * the sync layer submit-function returns an error.","     * @event error","     * @param e {EventFacade} Event Facade including:","     * @param e.error {any} Error message.","     * @param e.src {String} Source of the error. May be one of the following (or any","     *                     custom error source defined by a Model subclass):","     *","     * `submit`: An error submitting the model from within a sync layer.","     *","     * `attributevalidation`: An error validating an attribute (or property). The attribute (or objectproperty)","     *                        that failed validation will be provided as the `attribute` property on the event facade.","     *","     * @param e.attribute {String} The attribute/property that failed validation.","     * @param e.validationerror {String} The errormessage in case of attribute-validation error.","    **/","    EVT_ERROR = 'error',","   /**","     * Fired after model is submitted from the sync layer.","     * @event submit","     * @param e {EventFacade} Event Facade including:","     * @param [e.options] {Object} The options=object that was passed to the sync-layer, if there was one.","     * @param [e.parsed] {Object} The parsed version of the sync layer's response to the submit-request, if there was a response.","     * @param [e.response] {any} The sync layer's raw, unparsed response to the submit-request, if there was one.","     * @since 0.1","    **/","    EVT_SUBMIT = 'submit',","   /**","     * Fired after model is read from the sync layer.","     * @event load","     * @param e {EventFacade} Event Facade including:","     * @param [e.options] {Object} The options=object that was passed to the sync-layer, if there was one.","     * @param [e.response] {any} The sync layer's raw, unparsed response to the submit-request, if there was one.","     * @since 0.1","    **/","    EVT_LOAD = 'load',","   /**","     * Fired after model is saved through the sync layer.","     * @event submit","     * @param e {EventFacade} Event Facade including:","     * @param [e.options] {Object} The options=object that was passed to the sync-layer, if there was one.","     * @param [e.parsed] {Object} The parsed version of the sync layer's response to the submit-request, if there was a response.","     * @param [e.response] {any} The sync layer's raw, unparsed response to the submit-request, if there was one.","     * @since 0.1","    **/","    EVT_SAVE = 'save',","","    PARSED = function (response) {","        if (typeof response === 'string') {","            try {","                return Y.JSON.parse(response);","            } catch (ex) {","                this.fire(EVT_ERROR, {","                    error   : ex,","                    response: response,","                    src     : 'parse'","                });","                return null;","            }","        }","        return response;","    };","","    // -- Mixing extra Methods to Y.Model -----------------------------------","","    function ITSAModelSyncPromise() {}","    Y.mix(ITSAModelSyncPromise.prototype, {","","       /**","         * This method can be defined in descendend classes.<br />","         * If syncPromise is defined, then the syncPromise() definition will be used instead of sync() definition.<br />","         * In case an invalid 'action' is defined, the promise will be rejected.","         *","         * @method syncPromise","         * @param action {String} The sync-action to perform.","         * @param [options] {Object} Sync options. The custom synclayer should pass through all options-properties to the server.","         * @return {Y.Promise} returned response for each 'action' --> response --> resolve(dataobject) OR reject(reason).","         * The returned 'dataobject' might be an object or a string that can be turned into a json-object","        */","","        /**","         * This method is used internally and returns syncPromise() that is called with 'action'.","         * If 'action' is not handled as a Promise -inside syncPromise- then this method will reject the promisi.","         *","         * @method _syncTimeoutPromise","         * @param action {String} The sync-action to perform.","         * @param [options] {Object} Sync options. The custom synclayer should pass through all options-properties to the server.","         * @return {Y.Promise} returned response for each 'action' --> response --> resolve(dataobject) OR reject(reason).","         * The returned 'dataobject' might be an object or a string that can be turned into a json-object","         * @private","         * @since 0.2","        */","        _syncTimeoutPromise : function(action, options) {","            var instance = this,","                  syncpromise;","","            syncpromise = instance.syncPromise(action, options);","            if (!(syncpromise instanceof Y.Promise)) {","                syncpromise = new Y.Promise(function (resolve, reject) {","                    var errormessage = 'syncPromise is rejected --> '+action+' not defined as a Promise inside syncPromise()';","                    reject(new Error(errormessage));","                });","            }","            return syncpromise;","        },","","       /**","         * Submits this model to the server.","         *","         * This method delegates to the `sync()` method to perform the actual submit","         * operation, which is Y.Promise. Read the Promise.then() and look for resolve(response) OR reject(reason).","         *","         * A successful submit-operation will also fire a `submit` event, while an unsuccessful","         * submit operation will fire an `error` event with the `src` value \"submit\".","         *","         * <b>CAUTION</b> The sync-method MUST call its callback-function to make the promised resolved.","         *","         * @method submitPromise","         * @param {Object} [options] Options to be passed to `sync()`. It's up to the custom sync","         *                 implementation to determine what options it supports or requires, if any.","         * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).","        **/","        submitPromise: function(options) {","            var instance = this;","","            options = options || {};","            return new Y.Promise(function (resolve, reject) {","                var errFunc, successFunc,","                      facade = {","                          options : options","                      };","                errFunc = function(err) {","                    facade.error = err;","                    facade.src   = 'Model.submitPromise()';","                    instance._lazyFireErrorEvent(facade);","                    reject(new Error(err));","                };","                successFunc = function(response) {","                    // Lazy publish.","                    if (!instance._submitEvent) {","                        instance._submitEvent = instance.publish(EVT_SUBMIT, {","                            preventable: false","                        });","                    }","                    facade.response = response;","                    instance.fire(EVT_SUBMIT, facade);","                    resolve(response);","                };","                if (instance.syncPromise) {","                    // use the syncPromise-layer","                    instance._syncTimeoutPromise('submit', options).then(","                        successFunc,","                        errFunc","                    );","                }","                else {","                    // use the sync-layer","                    instance.sync('submit', options, function (err, response) {","                        if (err) {","                            errFunc(err);","                        }","                        else {","                            successFunc(response);","                        }","                    });","                }","            });","        },","","","        /**","         * Loads this model from the server.","         *","         * This method delegates to the `sync()` method to perform the actual load","         * operation, which is an asynchronous action. Specify a _callback_ function to","         * be notified of success or failure.","         *","         * A successful load operation will fire a `load` event, while an unsuccessful","         * load operation will fire an `error` event with the `src` value \"load\".","         *","         * If the load operation succeeds and one or more of the loaded attributes","         * differ from this model's current attributes, a `change` event will be fired.","         * @method loadPromise","         * @param {Object} [options] Options to be passed to `sync()`. It's up to the custom sync","         *                 implementation to determine what options it supports or requires, if any.","         * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).","        **/","        loadPromise: function (options) {","            var instance = this;","","            options = options || {};","            return new Y.Promise(function (resolve, reject) {","                var errFunc, successFunc,","                      facade = {","                          options : options","                      };","                errFunc = function(err) {","                    facade.error = err;","                    facade.src   = 'Model.loadPromise()';","                    instance._lazyFireErrorEvent(facade);","                    reject(new Error(err));","                };","                successFunc = function(response) {","                    var parsed;","                    // Lazy publish.","                    if (!instance._loadEvent) {","                        instance._loadEvent = instance.publish(EVT_LOAD, {","                            preventable: false","                        });","                    }","                    facade.response = response;","                    parsed = PARSED(response);","                    if (parsed.responseText) {","                        // XMLHttpRequest","                        parsed = parsed.responseText;","                    }","                    facade.parsed = parsed;","                    instance.setAttrs(parsed, options);","                    instance.changed = {};","                    instance.fire(EVT_LOAD, facade);","                    resolve(response);","                };","                if (instance.syncPromise) {","                    // use the syncPromise-layer","                    instance._syncTimeoutPromise('read', options).then(","                        successFunc,","                        errFunc","                    );","                }","                else {","                    instance.sync('read', options, function (err, response) {","                        if (err) {","                            errFunc(err);","                        }","                        else {","                            successFunc(response);","                        }","                    });","                }","            });","        },","","       /**","        * Saves this model to the server.","        *","        * This method delegates to the `sync()` method to perform the actual save","        * operation, which is an asynchronous action. Specify a _callback_ function to","        * be notified of success or failure.","        *","        * A successful save operation will fire a `save` event, while an unsuccessful","        * save operation will fire an `error` event with the `src` value \"save\".","        *","        * If the save operation succeeds and one or more of the attributes returned in","        * the server's response differ from this model's current attributes, a","        * `change` event will be fired.","        *","        * @method savePromise","         * @param {Object} [options] Options to be passed to `sync()`. It's up to the custom sync","         *                 implementation to determine what options it supports or requires, if any.","         * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).","        **/","        savePromise: function (options) {","            var instance = this;","","            options = options || {};","            return new Y.Promise(function (resolve, reject) {","                var errFunc, successFunc, usedmethod,","                      facade = {","                          options : options","                      };","                instance._validate(instance.toJSON(), function (validateErr) {","                    if (validateErr) {","                        facade.error = validateErr;","                        facade.src = 'Model.savePromise() - validate';","                        instance._lazyFireErrorEvent(facade);","                        reject(new Error(validateErr));","                    }","                    else {","                        errFunc = function(err) {","                            facade.error = err;","                            facade.src   = 'Model.savePromise()';","                            instance._lazyFireErrorEvent(facade);","                            reject(new Error(err));","                        };","                        successFunc = function(response) {","                            var parsed;","                            // Lazy publish.","                            if (!instance._saveEvent) {","                                instance._saveEvent = instance.publish(EVT_SAVE, {","                                    preventable: false","                                });","                            }","                            facade.response = response;","                            parsed = PARSED(response);","                            if (parsed.responseText) {","                                // XMLHttpRequest","                                parsed = parsed.responseText;","                            }","                            facade.parsed = parsed;","                            instance.setAttrs(parsed, options);","                            instance.changed = {};","                            instance.fire(EVT_SAVE, facade);","                            resolve(response);","                        };","                        usedmethod = instance.isNew() ? 'create' : 'update';","                        if (instance.syncPromise) {","                            // use the syncPromise-layer","                            instance._syncTimeoutPromise(usedmethod, options).then(","                                successFunc,","                                errFunc","                            );","                        }","                        else {","                            instance.sync(usedmethod, options, function (err, response) {","                                if (err) {","                                    errFunc(err);","                                }","                                else {","                                    successFunc(response);","                                }","                            });","                        }","                    }","                });","            });","        },","","      /**","         * Destroys this model instance and removes it from its containing lists, if any.","         *","         * The _callback_, if one is provided, will be called after the model is","         * destroyed.","         *","         * If `options.remove` is `true`, then this method delegates to the `sync()`","         * method to delete the model from the persistence layer, which is an","         * asynchronous action. In this case, the _callback_ (if provided) will be","         * called after the sync layer indicates success or failure of the delete","         * operation.","         *","         * @method destroyPromise","         * @param {Object} [options] Options to be passed to `sync()`. It's up to the custom sync","         *                 implementation to determine what options it supports or requires, if any.","         * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).","        **/","        destroyPromise: function (options) {","            var instance = this;","","            options = options || {};","            return new Y.Promise(function (resolve, reject) {","                var errFunc, successFunc, finish;","                finish = function() {","                    YArray.each(instance.lists.concat(), function (list) {","                        list.remove(instance, options);","                    });","                };","                if (options.remove || options['delete']) {","                    errFunc = function(err) {","                        var facade = {","                            error   : err,","                            src     : 'Model.destroyPromise()',","                            options : options","                        };","                        instance._lazyFireErrorEvent(facade);","                        reject(new Error(err));","                    };","                    successFunc = function(response) {","                        finish();","                        resolve(response);","                    };","                    if (instance.syncPromise) {","                        // use the syncPromise-layer","                        instance._syncTimeoutPromise('delete', options).then(","                            successFunc,","                            errFunc","                        );","                    }","                    else {","                        instance.sync('delete', options, function (err, response) {","                            if (err) {","                                errFunc(err);","                            }","                            else {","                                successFunc(response);","                            }","                        });","                    }","                } else {","                    finish();","                    resolve();","                }","            }).then(","                function() {","                    // if succeeded, destroy the Model's instance","                    Y.Model.superclass.destroy.call(instance);","                }","            );","        },","","       /**","        * Fires the 'error'-event and -if not published yet- publish it broadcasted to Y.","        * Because the error-event is broadcasted to Y, it can be catched by gallery-itsaerrorreporter.","        *","        * @method _lazyFireErrorEvent","         * @param {Object} [facade] eventfacade.","         * @private","        **/","        _lazyFireErrorEvent : function(facade) {","            var instance = this;","","            // lazy publish","            if (!instance._errorEvent) {","                instance._errorEvent = instance.publish(EVT_ERROR, {","                    broadcast: 1","                });","            }","            instance.fire(EVT_ERROR, facade);","        }","","    }, true);","","    Y.ITSAModelSyncPromise = ITSAModelSyncPromise;","","    Y.Base.mix(Y.Model, [ITSAModelSyncPromise]);","","}, '@VERSION@', {\"requires\": [\"yui-base\", \"base-base\", \"base-build\", \"node-base\", \"json-parse\", \"promise\", \"model\"]});"];
_yuitest_coverage["build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js"].lines = {"1":0,"3":0,"30":0,"81":0,"82":0,"83":0,"85":0,"90":0,"93":0,"98":0,"99":0,"126":0,"129":0,"130":0,"131":0,"132":0,"133":0,"136":0,"156":0,"158":0,"159":0,"160":0,"164":0,"165":0,"166":0,"167":0,"168":0,"170":0,"172":0,"173":0,"177":0,"178":0,"179":0,"181":0,"183":0,"190":0,"191":0,"192":0,"195":0,"221":0,"223":0,"224":0,"225":0,"229":0,"230":0,"231":0,"232":0,"233":0,"235":0,"236":0,"238":0,"239":0,"243":0,"244":0,"245":0,"247":0,"249":0,"250":0,"251":0,"252":0,"253":0,"255":0,"257":0,"263":0,"264":0,"265":0,"268":0,"295":0,"297":0,"298":0,"299":0,"303":0,"304":0,"305":0,"306":0,"307":0,"308":0,"311":0,"312":0,"313":0,"314":0,"315":0,"317":0,"318":0,"320":0,"321":0,"325":0,"326":0,"327":0,"329":0,"331":0,"332":0,"333":0,"334":0,"335":0,"337":0,"338":0,"340":0,"346":0,"347":0,"348":0,"351":0,"378":0,"380":0,"381":0,"382":0,"383":0,"384":0,"385":0,"388":0,"389":0,"390":0,"395":0,"396":0,"398":0,"399":0,"400":0,"402":0,"404":0,"410":0,"411":0,"412":0,"415":0,"420":0,"421":0,"426":0,"440":0,"443":0,"444":0,"448":0,"453":0,"455":0};
_yuitest_coverage["build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js"].functions = {"PARSED:80":0,"ITSAModelSyncPromise:98":0,"(anonymous 2):131":0,"_syncTimeoutPromise:125":0,"errFunc:164":0,"successFunc:170":0,"(anonymous 4):190":0,"(anonymous 3):159":0,"submitPromise:155":0,"errFunc:229":0,"successFunc:235":0,"(anonymous 6):263":0,"(anonymous 5):224":0,"loadPromise:220":0,"errFunc:311":0,"successFunc:317":0,"(anonymous 9):346":0,"(anonymous 8):303":0,"(anonymous 7):298":0,"savePromise:294":0,"(anonymous 11):384":0,"finish:383":0,"errFunc:389":0,"successFunc:398":0,"(anonymous 12):410":0,"(anonymous 10):381":0,"(anonymous 13):424":0,"destroyPromise:377":0,"_lazyFireErrorEvent:439":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js"].coveredLines = 132;
_yuitest_coverage["build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js"].coveredFunctions = 30;
_yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 1);
YUI.add('gallery-itsamodelsyncpromise', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 3);
'use strict';

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

   _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 30);
var YArray = Y.Array,

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
     * Fired after model is submitted from the sync layer.
     * @event submit
     * @param e {EventFacade} Event Facade including:
     * @param [e.options] {Object} The options=object that was passed to the sync-layer, if there was one.
     * @param [e.parsed] {Object} The parsed version of the sync layer's response to the submit-request, if there was a response.
     * @param [e.response] {any} The sync layer's raw, unparsed response to the submit-request, if there was one.
     * @since 0.1
    **/
    EVT_SUBMIT = 'submit',
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
     * @event submit
     * @param e {EventFacade} Event Facade including:
     * @param [e.options] {Object} The options=object that was passed to the sync-layer, if there was one.
     * @param [e.parsed] {Object} The parsed version of the sync layer's response to the submit-request, if there was a response.
     * @param [e.response] {any} The sync layer's raw, unparsed response to the submit-request, if there was one.
     * @since 0.1
    **/
    EVT_SAVE = 'save',

    PARSED = function (response) {
        _yuitest_coverfunc("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", "PARSED", 80);
_yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 81);
if (typeof response === 'string') {
            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 82);
try {
                _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 83);
return Y.JSON.parse(response);
            } catch (ex) {
                _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 85);
this.fire(EVT_ERROR, {
                    error   : ex,
                    response: response,
                    src     : 'parse'
                });
                _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 90);
return null;
            }
        }
        _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 93);
return response;
    };

    // -- Mixing extra Methods to Y.Model -----------------------------------

    _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 98);
function ITSAModelSyncPromise() {}
    _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 99);
Y.mix(ITSAModelSyncPromise.prototype, {

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
        _syncTimeoutPromise : function(action, options) {
            _yuitest_coverfunc("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", "_syncTimeoutPromise", 125);
_yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 126);
var instance = this,
                  syncpromise;

            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 129);
syncpromise = instance.syncPromise(action, options);
            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 130);
if (!(syncpromise instanceof Y.Promise)) {
                _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 131);
syncpromise = new Y.Promise(function (resolve, reject) {
                    _yuitest_coverfunc("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", "(anonymous 2)", 131);
_yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 132);
var errormessage = 'syncPromise is rejected --> '+action+' not defined as a Promise inside syncPromise()';
                    _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 133);
reject(new Error(errormessage));
                });
            }
            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 136);
return syncpromise;
        },

       /**
         * Submits this model to the server.
         *
         * This method delegates to the `sync()` method to perform the actual submit
         * operation, which is Y.Promise. Read the Promise.then() and look for resolve(response) OR reject(reason).
         *
         * A successful submit-operation will also fire a `submit` event, while an unsuccessful
         * submit operation will fire an `error` event with the `src` value "submit".
         *
         * <b>CAUTION</b> The sync-method MUST call its callback-function to make the promised resolved.
         *
         * @method submitPromise
         * @param {Object} [options] Options to be passed to `sync()`. It's up to the custom sync
         *                 implementation to determine what options it supports or requires, if any.
         * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).
        **/
        submitPromise: function(options) {
            _yuitest_coverfunc("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", "submitPromise", 155);
_yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 156);
var instance = this;

            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 158);
options = options || {};
            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 159);
return new Y.Promise(function (resolve, reject) {
                _yuitest_coverfunc("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", "(anonymous 3)", 159);
_yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 160);
var errFunc, successFunc,
                      facade = {
                          options : options
                      };
                _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 164);
errFunc = function(err) {
                    _yuitest_coverfunc("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", "errFunc", 164);
_yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 165);
facade.error = err;
                    _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 166);
facade.src   = 'Model.submitPromise()';
                    _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 167);
instance._lazyFireErrorEvent(facade);
                    _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 168);
reject(new Error(err));
                };
                _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 170);
successFunc = function(response) {
                    // Lazy publish.
                    _yuitest_coverfunc("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", "successFunc", 170);
_yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 172);
if (!instance._submitEvent) {
                        _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 173);
instance._submitEvent = instance.publish(EVT_SUBMIT, {
                            preventable: false
                        });
                    }
                    _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 177);
facade.response = response;
                    _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 178);
instance.fire(EVT_SUBMIT, facade);
                    _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 179);
resolve(response);
                };
                _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 181);
if (instance.syncPromise) {
                    // use the syncPromise-layer
                    _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 183);
instance._syncTimeoutPromise('submit', options).then(
                        successFunc,
                        errFunc
                    );
                }
                else {
                    // use the sync-layer
                    _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 190);
instance.sync('submit', options, function (err, response) {
                        _yuitest_coverfunc("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", "(anonymous 4)", 190);
_yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 191);
if (err) {
                            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 192);
errFunc(err);
                        }
                        else {
                            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 195);
successFunc(response);
                        }
                    });
                }
            });
        },


        /**
         * Loads this model from the server.
         *
         * This method delegates to the `sync()` method to perform the actual load
         * operation, which is an asynchronous action. Specify a _callback_ function to
         * be notified of success or failure.
         *
         * A successful load operation will fire a `load` event, while an unsuccessful
         * load operation will fire an `error` event with the `src` value "load".
         *
         * If the load operation succeeds and one or more of the loaded attributes
         * differ from this model's current attributes, a `change` event will be fired.
         * @method loadPromise
         * @param {Object} [options] Options to be passed to `sync()`. It's up to the custom sync
         *                 implementation to determine what options it supports or requires, if any.
         * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).
        **/
        loadPromise: function (options) {
            _yuitest_coverfunc("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", "loadPromise", 220);
_yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 221);
var instance = this;

            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 223);
options = options || {};
            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 224);
return new Y.Promise(function (resolve, reject) {
                _yuitest_coverfunc("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", "(anonymous 5)", 224);
_yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 225);
var errFunc, successFunc,
                      facade = {
                          options : options
                      };
                _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 229);
errFunc = function(err) {
                    _yuitest_coverfunc("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", "errFunc", 229);
_yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 230);
facade.error = err;
                    _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 231);
facade.src   = 'Model.loadPromise()';
                    _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 232);
instance._lazyFireErrorEvent(facade);
                    _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 233);
reject(new Error(err));
                };
                _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 235);
successFunc = function(response) {
                    _yuitest_coverfunc("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", "successFunc", 235);
_yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 236);
var parsed;
                    // Lazy publish.
                    _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 238);
if (!instance._loadEvent) {
                        _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 239);
instance._loadEvent = instance.publish(EVT_LOAD, {
                            preventable: false
                        });
                    }
                    _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 243);
facade.response = response;
                    _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 244);
parsed = PARSED(response);
                    _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 245);
if (parsed.responseText) {
                        // XMLHttpRequest
                        _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 247);
parsed = parsed.responseText;
                    }
                    _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 249);
facade.parsed = parsed;
                    _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 250);
instance.setAttrs(parsed, options);
                    _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 251);
instance.changed = {};
                    _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 252);
instance.fire(EVT_LOAD, facade);
                    _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 253);
resolve(response);
                };
                _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 255);
if (instance.syncPromise) {
                    // use the syncPromise-layer
                    _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 257);
instance._syncTimeoutPromise('read', options).then(
                        successFunc,
                        errFunc
                    );
                }
                else {
                    _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 263);
instance.sync('read', options, function (err, response) {
                        _yuitest_coverfunc("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", "(anonymous 6)", 263);
_yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 264);
if (err) {
                            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 265);
errFunc(err);
                        }
                        else {
                            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 268);
successFunc(response);
                        }
                    });
                }
            });
        },

       /**
        * Saves this model to the server.
        *
        * This method delegates to the `sync()` method to perform the actual save
        * operation, which is an asynchronous action. Specify a _callback_ function to
        * be notified of success or failure.
        *
        * A successful save operation will fire a `save` event, while an unsuccessful
        * save operation will fire an `error` event with the `src` value "save".
        *
        * If the save operation succeeds and one or more of the attributes returned in
        * the server's response differ from this model's current attributes, a
        * `change` event will be fired.
        *
        * @method savePromise
         * @param {Object} [options] Options to be passed to `sync()`. It's up to the custom sync
         *                 implementation to determine what options it supports or requires, if any.
         * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).
        **/
        savePromise: function (options) {
            _yuitest_coverfunc("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", "savePromise", 294);
_yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 295);
var instance = this;

            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 297);
options = options || {};
            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 298);
return new Y.Promise(function (resolve, reject) {
                _yuitest_coverfunc("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", "(anonymous 7)", 298);
_yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 299);
var errFunc, successFunc, usedmethod,
                      facade = {
                          options : options
                      };
                _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 303);
instance._validate(instance.toJSON(), function (validateErr) {
                    _yuitest_coverfunc("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", "(anonymous 8)", 303);
_yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 304);
if (validateErr) {
                        _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 305);
facade.error = validateErr;
                        _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 306);
facade.src = 'Model.savePromise() - validate';
                        _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 307);
instance._lazyFireErrorEvent(facade);
                        _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 308);
reject(new Error(validateErr));
                    }
                    else {
                        _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 311);
errFunc = function(err) {
                            _yuitest_coverfunc("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", "errFunc", 311);
_yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 312);
facade.error = err;
                            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 313);
facade.src   = 'Model.savePromise()';
                            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 314);
instance._lazyFireErrorEvent(facade);
                            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 315);
reject(new Error(err));
                        };
                        _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 317);
successFunc = function(response) {
                            _yuitest_coverfunc("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", "successFunc", 317);
_yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 318);
var parsed;
                            // Lazy publish.
                            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 320);
if (!instance._saveEvent) {
                                _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 321);
instance._saveEvent = instance.publish(EVT_SAVE, {
                                    preventable: false
                                });
                            }
                            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 325);
facade.response = response;
                            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 326);
parsed = PARSED(response);
                            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 327);
if (parsed.responseText) {
                                // XMLHttpRequest
                                _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 329);
parsed = parsed.responseText;
                            }
                            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 331);
facade.parsed = parsed;
                            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 332);
instance.setAttrs(parsed, options);
                            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 333);
instance.changed = {};
                            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 334);
instance.fire(EVT_SAVE, facade);
                            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 335);
resolve(response);
                        };
                        _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 337);
usedmethod = instance.isNew() ? 'create' : 'update';
                        _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 338);
if (instance.syncPromise) {
                            // use the syncPromise-layer
                            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 340);
instance._syncTimeoutPromise(usedmethod, options).then(
                                successFunc,
                                errFunc
                            );
                        }
                        else {
                            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 346);
instance.sync(usedmethod, options, function (err, response) {
                                _yuitest_coverfunc("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", "(anonymous 9)", 346);
_yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 347);
if (err) {
                                    _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 348);
errFunc(err);
                                }
                                else {
                                    _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 351);
successFunc(response);
                                }
                            });
                        }
                    }
                });
            });
        },

      /**
         * Destroys this model instance and removes it from its containing lists, if any.
         *
         * The _callback_, if one is provided, will be called after the model is
         * destroyed.
         *
         * If `options.remove` is `true`, then this method delegates to the `sync()`
         * method to delete the model from the persistence layer, which is an
         * asynchronous action. In this case, the _callback_ (if provided) will be
         * called after the sync layer indicates success or failure of the delete
         * operation.
         *
         * @method destroyPromise
         * @param {Object} [options] Options to be passed to `sync()`. It's up to the custom sync
         *                 implementation to determine what options it supports or requires, if any.
         * @return {Y.Promise} promised response --> resolve(response) OR reject(reason).
        **/
        destroyPromise: function (options) {
            _yuitest_coverfunc("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", "destroyPromise", 377);
_yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 378);
var instance = this;

            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 380);
options = options || {};
            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 381);
return new Y.Promise(function (resolve, reject) {
                _yuitest_coverfunc("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", "(anonymous 10)", 381);
_yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 382);
var errFunc, successFunc, finish;
                _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 383);
finish = function() {
                    _yuitest_coverfunc("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", "finish", 383);
_yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 384);
YArray.each(instance.lists.concat(), function (list) {
                        _yuitest_coverfunc("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", "(anonymous 11)", 384);
_yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 385);
list.remove(instance, options);
                    });
                };
                _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 388);
if (options.remove || options['delete']) {
                    _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 389);
errFunc = function(err) {
                        _yuitest_coverfunc("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", "errFunc", 389);
_yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 390);
var facade = {
                            error   : err,
                            src     : 'Model.destroyPromise()',
                            options : options
                        };
                        _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 395);
instance._lazyFireErrorEvent(facade);
                        _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 396);
reject(new Error(err));
                    };
                    _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 398);
successFunc = function(response) {
                        _yuitest_coverfunc("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", "successFunc", 398);
_yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 399);
finish();
                        _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 400);
resolve(response);
                    };
                    _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 402);
if (instance.syncPromise) {
                        // use the syncPromise-layer
                        _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 404);
instance._syncTimeoutPromise('delete', options).then(
                            successFunc,
                            errFunc
                        );
                    }
                    else {
                        _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 410);
instance.sync('delete', options, function (err, response) {
                            _yuitest_coverfunc("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", "(anonymous 12)", 410);
_yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 411);
if (err) {
                                _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 412);
errFunc(err);
                            }
                            else {
                                _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 415);
successFunc(response);
                            }
                        });
                    }
                } else {
                    _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 420);
finish();
                    _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 421);
resolve();
                }
            }).then(
                function() {
                    // if succeeded, destroy the Model's instance
                    _yuitest_coverfunc("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", "(anonymous 13)", 424);
_yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 426);
Y.Model.superclass.destroy.call(instance);
                }
            );
        },

       /**
        * Fires the 'error'-event and -if not published yet- publish it broadcasted to Y.
        * Because the error-event is broadcasted to Y, it can be catched by gallery-itsaerrorreporter.
        *
        * @method _lazyFireErrorEvent
         * @param {Object} [facade] eventfacade.
         * @private
        **/
        _lazyFireErrorEvent : function(facade) {
            _yuitest_coverfunc("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", "_lazyFireErrorEvent", 439);
_yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 440);
var instance = this;

            // lazy publish
            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 443);
if (!instance._errorEvent) {
                _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 444);
instance._errorEvent = instance.publish(EVT_ERROR, {
                    broadcast: 1
                });
            }
            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 448);
instance.fire(EVT_ERROR, facade);
        }

    }, true);

    _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 453);
Y.ITSAModelSyncPromise = ITSAModelSyncPromise;

    _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 455);
Y.Base.mix(Y.Model, [ITSAModelSyncPromise]);

}, '@VERSION@', {"requires": ["yui-base", "base-base", "base-build", "node-base", "json-parse", "promise", "model"]});
