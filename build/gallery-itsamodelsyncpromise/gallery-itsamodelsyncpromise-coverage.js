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
_yuitest_coverage["build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js"].code=["YUI.add('gallery-itsamodelsyncpromise', function (Y, NAME) {","","'use strict';","","/**"," *"," * Extention ITSAModelSyncPromise"," *"," *"," * Extends Y.Model with Promised sync-methods. The synclayer can be made just as usual. But instead of calling"," * Model.load and Model.save and Model.destroy, you can use:"," *"," * <b>Model.loadPromise</b>"," * <b>Model.savePromise</b>"," * <b>Model.submitPromise</b>"," * <b>Model.destroyPromise</b>"," *"," * @module gallery-itsamodelsyncpromise"," * @extends Model"," * @class ITSAModelSyncPromise"," * @constructor"," * @since 0.1"," *"," * <i>Copyright (c) 2013 Marco Asbreuk - http://itsasbreuk.nl</i>"," * YUI BSD License - http://developer.yahoo.com/yui/license.html"," *","*/","","   var YArray = Y.Array,","       DEFAULT_TIMEOUT = 60000,","       TIMEOUT_MESSAGE = 'Model sync-method did not return a callback in time. Please read the Docs how to setup the sync-method.',","   /**","     * Fired when an error occurs, such as when an attribute (or property) doesn't validate or when","     * the sync layer submit-function returns an error.","     * @event error","     * @param e {EventFacade} Event Facade including:","     * @param e.error {any} Error message.","     * @param e.src {String} Source of the error. May be one of the following (or any","     *                     custom error source defined by a Model subclass):","     *","     * `submit`: An error submitting the model from within a sync layer.","     *","     * `attributevalidation`: An error validating an attribute (or property). The attribute (or objectproperty)","     *                        that failed validation will be provided as the `attribute` property on the event facade.","     *","     * @param e.attribute {String} The attribute/property that failed validation.","     * @param e.validationerror {String} The errormessage in case of attribute-validation error.","    **/","    EVT_ERROR = 'error',","   /**","     * Fired after model is submitted from the sync layer.","     * @event submit","     * @param e {EventFacade} Event Facade including:","     * @param [e.options] {Object} The options=object that was passed to the sync-layer, if there was one.","     * @param [e.parsed] {Object} The parsed version of the sync layer's response to the submit-request, if there was a response.","     * @param [e.response] {any} The sync layer's raw, unparsed response to the submit-request, if there was one.","     * @since 0.1","    **/","    EVT_SUBMIT = 'submit',","   /**","     * Fired after model is read from the sync layer.","     * @event load","     * @param e {EventFacade} Event Facade including:","     * @param [e.options] {Object} The options=object that was passed to the sync-layer, if there was one.","     * @param [e.response] {any} The sync layer's raw, unparsed response to the submit-request, if there was one.","     * @since 0.1","    **/","    EVT_LOAD = 'load',","   /**","     * Fired after model is saved through the sync layer.","     * @event submit","     * @param e {EventFacade} Event Facade including:","     * @param [e.options] {Object} The options=object that was passed to the sync-layer, if there was one.","     * @param [e.parsed] {Object} The parsed version of the sync layer's response to the submit-request, if there was a response.","     * @param [e.response] {any} The sync layer's raw, unparsed response to the submit-request, if there was one.","     * @since 0.1","    **/","    EVT_SAVE = 'save',","","    PARSED = function(value) {","        var parsed;","        try {","            parsed = Y.JSON.parse(value);","        } catch (ex) {}","        return parsed;","    };","","    // -- Mixing extra Methods to Y.Model -----------------------------------","    function ITSAModelSyncPromise() {}","    Y.mix(ITSAModelSyncPromise.prototype, {","       /**","         * Submits this model to the server.","         *","         * This method delegates to the `sync()` method to perform the actual submit","         * operation, which is Y.Promise. Read the Promise.then() and look for resolve(response, options) OR reject(reason).","         *","         * A successful submit-operation will also fire a `submit` event, while an unsuccessful","         * submit operation will fire an `error` event with the `src` value \"submit\".","         *","         * <b>CAUTION</b> The sync-method MUST call its callback-function to make the promised resolved. If there is no callback-function","         * then the promise will be rejected after a timeout. When timeout is not specified,","         * @method submitPromise","         * @param {Object} [options] Options to be passed to `sync()`. It's up to the custom sync","         *                 implementation to determine what options it supports or requires, if any.","         * @param {Int} [timeout] when no response within this timesetting, then the Promise will be rejected. When not specified,","         *              a timeout of 60000 (1 minute) is taken. We need this, because we need to be sure the sync-functions has a callback.","         *              without a callback the promise would never be resolved. This is now caught with the timeout.","         * @return {Y.Promise} promised response --> resolve(response, options) OR reject(reason).","        **/","        submitPromise: function(options, timeout) {","            options = options || {};","            var instance = this,","                submitpromise = new Y.Promise(function (resolve, reject) {","                    var timeoutHandler = Y.later(","                        timeout || DEFAULT_TIMEOUT,","                        instance,","                        function() {","                            var facade = {","                                    src     : 'submit',","                                    options : options,","                                    error   : TIMEOUT_MESSAGE","                                };","                            instance.fire(EVT_ERROR, facade);","                            reject(new Error(TIMEOUT_MESSAGE));","                        }","                    );","                    instance.sync('submit', options, function (err, response) {","                        if (timeoutHandler) {","                            timeoutHandler.cancel();","                        }","                        if (submitpromise.getStatus()==='pending') {","                            var facade = {","                                    options : options,","                                    response: response","                                };","                            if (err) {","                                facade.error = err;","                                facade.src   = 'submit';","                                instance.fire(EVT_ERROR, facade);","                                reject(new Error(err));","                            }","                            else {","                                // Lazy publish.","                                if (!instance._submitEvent) {","                                    instance._submitEvent = instance.publish(EVT_SUBMIT, {","                                        preventable: false","                                    });","                                }","                                instance.fire(EVT_SUBMIT, facade);","                                resolve(response, options);","                            }","                        }","                    });","                });","            return submitpromise;","        },","","","        /**","         * Loads this model from the server.","         *","         * This method delegates to the `sync()` method to perform the actual load","         * operation, which is an asynchronous action. Specify a _callback_ function to","         * be notified of success or failure.","         *","         * A successful load operation will fire a `load` event, while an unsuccessful","         * load operation will fire an `error` event with the `src` value \"load\".","         *","         * If the load operation succeeds and one or more of the loaded attributes","         * differ from this model's current attributes, a `change` event will be fired.","         * @method loadPromise","         * @param {Object} [options] Options to be passed to `sync()`. It's up to the custom sync","         *                 implementation to determine what options it supports or requires, if any.","         * @param {Int} [timeout] when no response within this timesetting, then the Promise will be rejected. When not specified,","         *              a timeout of 60000 (1 minute) is taken. We need this, because we need to be sure the sync-functions has a callback.","         *              without a callback the promise would never be resolved. This is now caught with the timeout.","         * @return {Y.Promise} promised response --> resolve(response, options) OR reject(reason).","        **/","        loadPromise: function (options, timeout) {","            options = options || {};","            var instance = this,","                loadpromise = new Y.Promise(function (resolve, reject) {","                    var timeoutHandler = Y.later(","                        timeout || DEFAULT_TIMEOUT,","                        instance,","                        function() {","                            var facade = {","                                    src     : 'load',","                                    options : options,","                                    error   : TIMEOUT_MESSAGE","                                };","                            instance.fire(EVT_ERROR, facade);","                            reject(new Error(TIMEOUT_MESSAGE));","                        }","                    );","                    instance.sync('read', options, function (err, response) {","                        if (timeoutHandler) {","                            timeoutHandler.cancel();","                        }","                        if (loadpromise.getStatus()==='pending') {","                            var parsed,","                                facade = {","                                    options : options,","                                    response: response","                                };","                            if (err) {","                                facade.error = err;","                                facade.src   = 'load';","                                instance.fire(EVT_ERROR, facade);","                                reject(new Error(err));","                            }","                            else {","                                // Lazy publish.","                                if (!instance._loadEvent) {","                                    instance._loadEvent = instance.publish(EVT_LOAD, {","                                        preventable: false","                                    });","                                }","                                parsed = facade.parsed = PARSED(response);","                                instance.setAttrs(parsed, options);","                                instance.changed = {};","                                instance.fire(EVT_LOAD, facade);","                                resolve(response, options);","                            }","                        }","                    });","                });","            return loadpromise;","        },","","       /**","        * Saves this model to the server.","        *","        * This method delegates to the `sync()` method to perform the actual save","        * operation, which is an asynchronous action. Specify a _callback_ function to","        * be notified of success or failure.","        *","        * A successful save operation will fire a `save` event, while an unsuccessful","        * save operation will fire an `error` event with the `src` value \"save\".","        *","        * If the save operation succeeds and one or more of the attributes returned in","        * the server's response differ from this model's current attributes, a","        * `change` event will be fired.","        *","        * @method savePromise","         * @param {Object} [options] Options to be passed to `sync()`. It's up to the custom sync","         *                 implementation to determine what options it supports or requires, if any.","         * @param {Int} [timeout] when no response within this timesetting, then the Promise will be rejected. When not specified,","         *              a timeout of 60000 (1 minute) is taken. We need this, because we need to be sure the sync-functions has a callback.","         *              without a callback the promise would never be resolved. This is now caught with the timeout.","         * @return {Y.Promise} promised response --> resolve(response, options) OR reject(reason).","        **/","        savePromise: function (options, timeout) {","            options = options || {};","            var instance = this,","                savepromise = new Y.Promise(function (resolve, reject) {","                    var facade = {","                            options : options,","                            src     :'save'","                        },","                        timeoutHandler;","                    instance._validate(instance.toJSON(), function (validateErr) {","                        if (validateErr) {","                            facade.error = validateErr;","                            instance.fire(EVT_ERROR, facade);","                            reject(new Error(validateErr));","                        }","                        else {","                            timeoutHandler = Y.later(","                                timeout || DEFAULT_TIMEOUT,","                                instance,","                                function() {","                                    var facade = {","                                            error   : TIMEOUT_MESSAGE","                                        };","                                    instance.fire(EVT_ERROR, facade);","                                    reject(new Error(TIMEOUT_MESSAGE));","                                }","                            );","                            instance.sync(instance.isNew() ? 'create' : 'update', options, function (err, response) {","                                if (timeoutHandler) {","                                    timeoutHandler.cancel();","                                }","                                if (savepromise.getStatus()==='pending') {","                                    var parsed;","                                    facade.response = response;","                                    if (err) {","                                        facade.error = err;","                                        facade.src   = 'save';","                                        instance.fire(EVT_ERROR, facade);","                                        reject(new Error(err));","                                    }","                                    else {","                                        // Lazy publish.","                                        if (!instance._saveEvent) {","                                            instance._saveEvent = instance.publish(EVT_SAVE, {","                                                preventable: false","                                            });","                                        }","                                        parsed = facade.parsed = PARSED(response);","                                        instance.setAttrs(parsed, options);","                                        instance.changed = {};","                                        instance.fire(EVT_SAVE, facade);","                                        resolve(response, options);","                                    }","                                }","                            });","                        }","                    });","                });","            return savepromise;","        },","","      /**","         * Destroys this model instance and removes it from its containing lists, if any.","         *","         * The _callback_, if one is provided, will be called after the model is","         * destroyed.","         *","         * If `options.remove` is `true`, then this method delegates to the `sync()`","         * method to delete the model from the persistence layer, which is an","         * asynchronous action. In this case, the _callback_ (if provided) will be","         * called after the sync layer indicates success or failure of the delete","         * operation.","         *","         * @method destroyPromise","         * @param {Object} [options] Options to be passed to `sync()`. It's up to the custom sync","         *                 implementation to determine what options it supports or requires, if any.","         * @param {Int} [timeout] when no response within this timesetting, then the Promise will be rejected. When not specified,","         *              a timeout of 60000 (1 minute) is taken. We need this, because we need to be sure the sync-functions has a callback.","         *              without a callback the promise would never be resolved. This is now caught with the timeout.","         * @return {Y.Promise} promised response --> resolve(response, options) OR reject(reason).","        **/","        destroyPromise: function (options, timeout) {","            options = options || {};","            var instance = this,","                destroypromise = new Y.Promise(function (resolve, reject) {","                    var timeoutHandler = Y.later(","                            timeout || DEFAULT_TIMEOUT,","                            instance,","                            function() {","                                var facade = {","                                        error   : TIMEOUT_MESSAGE","                                    };","                                instance.fire(EVT_ERROR, facade);","                                reject(new Error(TIMEOUT_MESSAGE));","                            }","                        );","                    instance.onceAfter('destroy', function () {","                        function finish() {","                            YArray.each(instance.lists.concat(), function (list) {","                                list.remove(instance, options);","                            });","                        }","                        if (options.remove || options['delete']) {","                            instance.sync('delete', options, function (err) {","                                if (timeoutHandler) {","                                    timeoutHandler.cancel();","                                }","                                if (destroypromise.getStatus()==='pending') {","                                    if (err) {","                                        var facade = {","                                            error   : err,","                                            src     : 'destroy',","                                            options : options","                                        };","                                        instance.fire(EVT_ERROR, facade);","                                        reject(new Error(err));","                                    }","                                    else {","                                        finish();","                                        resolve(options);","                                    }","                                }","                            });","                        } else {","                            if (timeoutHandler) {","                                timeoutHandler.cancel();","                            }","                            if (destroypromise.getStatus()==='pending') {","                                finish();","                                resolve(options);","                            }","                        }","                    });","                });","            Y.Model.superclass.destroy.call(instance);","            return destroypromise;","        }","","    }, true);","    Y.ITSAModelSyncPromise = ITSAModelSyncPromise;","    Y.Base.mix(Y.Model, [ITSAModelSyncPromise]);","","    //==============================================================================","","/**"," *"," * Extention ITSAModelSyncPromise"," *"," *"," * Extends Y.ModelList with Promised sync-methods. The synclayer can be made just as usual. But instead of calling"," * Model.loadyou can use:"," *"," * <b>Model.loadPromise</b>"," *"," * @module gallery-itsamodelsyncpromise"," * @extends ModelList"," * @class ITSAModellistSyncPromise"," * @constructor"," * @since 0.1"," *"," * <i>Copyright (c) 2013 Marco Asbreuk - http://itsasbreuk.nl</i>"," * YUI BSD License - http://developer.yahoo.com/yui/license.html"," *","*/","    // -- Mixing extra Methods to Y.Model -----------------------------------","    function ITSAModellistSyncPromise() {}","    Y.mix(ITSAModellistSyncPromise.prototype, {","        /**","         * Loads models from the server and adds them into the ModelList","         *","         * This method delegates to the `sync()` method to perform the actual load","         * operation, which is an asynchronous action. Specify a _callback_ function to","         * be notified of success or failure.","         *","         * A successful load operation will fire a `load` event, while an unsuccessful","         * load operation will fire an `error` event with the `src` value \"load\".","         *","         * If the load operation succeeds and one or more of the loaded attributes","         * differ from this model's current attributes, a `change` event will be fired.","         *","         * @method loadPromise","         * @param {Object} [options] Options to be passed to `sync()`. It's up to the custom sync","         *                 implementation to determine what options it supports or requires, if any.","         * @param {Int} [timeout] when no response within this timesetting, then the Promise will be rejected. When not specified,","         *              a timeout of 60000 (1 minute) is taken. We need this, because we need to be sure the sync-functions has a callback.","         *              without a callback the promise would never be resolved. This is now caught with the timeout.","         * @return {Y.Promise} promised response --> resolve(response, options) OR reject(reason).","        **/","        loadPromise: function (options, timeout) {","            options = options || {};","            var instance = this,","                loadpromise = new Y.Promise(function (resolve, reject) {","                    var timeoutHandler = Y.later(","                        timeout || DEFAULT_TIMEOUT,","                        instance,","                        function() {","                            var facade = {","                                    src     : 'load',","                                    options : options,","                                    error   : TIMEOUT_MESSAGE","                                };","                            instance.fire(EVT_ERROR, facade);","                            reject(new Error(TIMEOUT_MESSAGE));","                        }","                    );","                    instance.sync('read', options, function (err, response) {","                        if (timeoutHandler) {","                            timeoutHandler.cancel();","                        }","                        if (loadpromise.getStatus()==='pending') {","                            var parsed,","                                facade = {","                                    options : options,","                                    response: response","                                };","                            if (err) {","                                facade.error = err;","                                facade.src   = 'load';","                                instance.fire(EVT_ERROR, facade);","                                reject(new Error(err));","                            }","                            else {","                                // Lazy publish.","                                if (!instance._loadEvent) {","                                    instance._loadEvent = instance.publish(EVT_LOAD, {","                                        preventable: false","                                    });","                                }","                                parsed = facade.parsed = PARSED(response);","                                instance.reset(parsed, options);","                                instance.fire(EVT_LOAD, facade);","                                resolve(response, options);","                            }","                        }","                    });","                });","            return loadpromise;","        }","    }, true);","    Y.ITSAModellistSyncPromise = ITSAModellistSyncPromise;","    Y.Base.mix(Y.ModelList, [ITSAModellistSyncPromise]);","","    //==============================================================================","","}, '@VERSION@', {","    \"requires\": [","        \"yui-base\",","        \"base-base\",","        \"base-build\",","        \"node-base\",","        \"json-parse\",","        \"promise\",","        \"model\",","        \"model-list\",","        \"yui-later\"","    ]","});"];
_yuitest_coverage["build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js"].lines = {"1":0,"3":0,"29":0,"81":0,"82":0,"83":0,"85":0,"89":0,"90":0,"111":0,"112":0,"114":0,"118":0,"123":0,"124":0,"127":0,"128":0,"129":0,"131":0,"132":0,"136":0,"137":0,"138":0,"139":0,"140":0,"144":0,"145":0,"149":0,"150":0,"155":0,"180":0,"181":0,"183":0,"187":0,"192":0,"193":0,"196":0,"197":0,"198":0,"200":0,"201":0,"206":0,"207":0,"208":0,"209":0,"210":0,"214":0,"215":0,"219":0,"220":0,"221":0,"222":0,"223":0,"228":0,"254":0,"255":0,"257":0,"262":0,"263":0,"264":0,"265":0,"266":0,"269":0,"273":0,"276":0,"277":0,"280":0,"281":0,"282":0,"284":0,"285":0,"286":0,"287":0,"288":0,"289":0,"290":0,"291":0,"295":0,"296":0,"300":0,"301":0,"302":0,"303":0,"304":0,"311":0,"335":0,"336":0,"338":0,"342":0,"345":0,"346":0,"349":0,"350":0,"351":0,"352":0,"355":0,"356":0,"357":0,"358":0,"360":0,"361":0,"362":0,"367":0,"368":0,"371":0,"372":0,"377":0,"378":0,"380":0,"381":0,"382":0,"387":0,"388":0,"392":0,"393":0,"418":0,"419":0,"442":0,"443":0,"445":0,"449":0,"454":0,"455":0,"458":0,"459":0,"460":0,"462":0,"463":0,"468":0,"469":0,"470":0,"471":0,"472":0,"476":0,"477":0,"481":0,"482":0,"483":0,"484":0,"489":0,"492":0,"493":0};
_yuitest_coverage["build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js"].functions = {"PARSED:80":0,"ITSAModelSyncPromise:89":0,"(anonymous 3):117":0,"(anonymous 4):127":0,"(anonymous 2):113":0,"submitPromise:110":0,"(anonymous 6):186":0,"(anonymous 7):196":0,"(anonymous 5):182":0,"loadPromise:179":0,"(anonymous 10):272":0,"(anonymous 11):280":0,"(anonymous 9):262":0,"(anonymous 8):256":0,"savePromise:253":0,"(anonymous 13):341":0,"(anonymous 15):351":0,"finish:350":0,"(anonymous 16):356":0,"(anonymous 14):349":0,"(anonymous 12):337":0,"destroyPromise:334":0,"ITSAModellistSyncPromise:418":0,"(anonymous 18):448":0,"(anonymous 19):458":0,"(anonymous 17):444":0,"loadPromise:441":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js"].coveredLines = 142;
_yuitest_coverage["build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js"].coveredFunctions = 28;
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
 * @module gallery-itsamodelsyncpromise
 * @extends Model
 * @class ITSAModelSyncPromise
 * @constructor
 * @since 0.1
 *
 * <i>Copyright (c) 2013 Marco Asbreuk - http://itsasbreuk.nl</i>
 * YUI BSD License - http://developer.yahoo.com/yui/license.html
 *
*/

   _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 29);
var YArray = Y.Array,
       DEFAULT_TIMEOUT = 60000,
       TIMEOUT_MESSAGE = 'Model sync-method did not return a callback in time. Please read the Docs how to setup the sync-method.',
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

    PARSED = function(value) {
        _yuitest_coverfunc("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", "PARSED", 80);
_yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 81);
var parsed;
        _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 82);
try {
            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 83);
parsed = Y.JSON.parse(value);
        } catch (ex) {}
        _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 85);
return parsed;
    };

    // -- Mixing extra Methods to Y.Model -----------------------------------
    _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 89);
function ITSAModelSyncPromise() {}
    _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 90);
Y.mix(ITSAModelSyncPromise.prototype, {
       /**
         * Submits this model to the server.
         *
         * This method delegates to the `sync()` method to perform the actual submit
         * operation, which is Y.Promise. Read the Promise.then() and look for resolve(response, options) OR reject(reason).
         *
         * A successful submit-operation will also fire a `submit` event, while an unsuccessful
         * submit operation will fire an `error` event with the `src` value "submit".
         *
         * <b>CAUTION</b> The sync-method MUST call its callback-function to make the promised resolved. If there is no callback-function
         * then the promise will be rejected after a timeout. When timeout is not specified,
         * @method submitPromise
         * @param {Object} [options] Options to be passed to `sync()`. It's up to the custom sync
         *                 implementation to determine what options it supports or requires, if any.
         * @param {Int} [timeout] when no response within this timesetting, then the Promise will be rejected. When not specified,
         *              a timeout of 60000 (1 minute) is taken. We need this, because we need to be sure the sync-functions has a callback.
         *              without a callback the promise would never be resolved. This is now caught with the timeout.
         * @return {Y.Promise} promised response --> resolve(response, options) OR reject(reason).
        **/
        submitPromise: function(options, timeout) {
            _yuitest_coverfunc("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", "submitPromise", 110);
_yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 111);
options = options || {};
            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 112);
var instance = this,
                submitpromise = new Y.Promise(function (resolve, reject) {
                    _yuitest_coverfunc("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", "(anonymous 2)", 113);
_yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 114);
var timeoutHandler = Y.later(
                        timeout || DEFAULT_TIMEOUT,
                        instance,
                        function() {
                            _yuitest_coverfunc("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", "(anonymous 3)", 117);
_yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 118);
var facade = {
                                    src     : 'submit',
                                    options : options,
                                    error   : TIMEOUT_MESSAGE
                                };
                            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 123);
instance.fire(EVT_ERROR, facade);
                            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 124);
reject(new Error(TIMEOUT_MESSAGE));
                        }
                    );
                    _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 127);
instance.sync('submit', options, function (err, response) {
                        _yuitest_coverfunc("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", "(anonymous 4)", 127);
_yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 128);
if (timeoutHandler) {
                            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 129);
timeoutHandler.cancel();
                        }
                        _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 131);
if (submitpromise.getStatus()==='pending') {
                            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 132);
var facade = {
                                    options : options,
                                    response: response
                                };
                            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 136);
if (err) {
                                _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 137);
facade.error = err;
                                _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 138);
facade.src   = 'submit';
                                _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 139);
instance.fire(EVT_ERROR, facade);
                                _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 140);
reject(new Error(err));
                            }
                            else {
                                // Lazy publish.
                                _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 144);
if (!instance._submitEvent) {
                                    _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 145);
instance._submitEvent = instance.publish(EVT_SUBMIT, {
                                        preventable: false
                                    });
                                }
                                _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 149);
instance.fire(EVT_SUBMIT, facade);
                                _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 150);
resolve(response, options);
                            }
                        }
                    });
                });
            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 155);
return submitpromise;
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
         * @param {Int} [timeout] when no response within this timesetting, then the Promise will be rejected. When not specified,
         *              a timeout of 60000 (1 minute) is taken. We need this, because we need to be sure the sync-functions has a callback.
         *              without a callback the promise would never be resolved. This is now caught with the timeout.
         * @return {Y.Promise} promised response --> resolve(response, options) OR reject(reason).
        **/
        loadPromise: function (options, timeout) {
            _yuitest_coverfunc("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", "loadPromise", 179);
_yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 180);
options = options || {};
            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 181);
var instance = this,
                loadpromise = new Y.Promise(function (resolve, reject) {
                    _yuitest_coverfunc("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", "(anonymous 5)", 182);
_yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 183);
var timeoutHandler = Y.later(
                        timeout || DEFAULT_TIMEOUT,
                        instance,
                        function() {
                            _yuitest_coverfunc("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", "(anonymous 6)", 186);
_yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 187);
var facade = {
                                    src     : 'load',
                                    options : options,
                                    error   : TIMEOUT_MESSAGE
                                };
                            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 192);
instance.fire(EVT_ERROR, facade);
                            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 193);
reject(new Error(TIMEOUT_MESSAGE));
                        }
                    );
                    _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 196);
instance.sync('read', options, function (err, response) {
                        _yuitest_coverfunc("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", "(anonymous 7)", 196);
_yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 197);
if (timeoutHandler) {
                            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 198);
timeoutHandler.cancel();
                        }
                        _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 200);
if (loadpromise.getStatus()==='pending') {
                            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 201);
var parsed,
                                facade = {
                                    options : options,
                                    response: response
                                };
                            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 206);
if (err) {
                                _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 207);
facade.error = err;
                                _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 208);
facade.src   = 'load';
                                _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 209);
instance.fire(EVT_ERROR, facade);
                                _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 210);
reject(new Error(err));
                            }
                            else {
                                // Lazy publish.
                                _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 214);
if (!instance._loadEvent) {
                                    _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 215);
instance._loadEvent = instance.publish(EVT_LOAD, {
                                        preventable: false
                                    });
                                }
                                _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 219);
parsed = facade.parsed = PARSED(response);
                                _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 220);
instance.setAttrs(parsed, options);
                                _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 221);
instance.changed = {};
                                _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 222);
instance.fire(EVT_LOAD, facade);
                                _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 223);
resolve(response, options);
                            }
                        }
                    });
                });
            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 228);
return loadpromise;
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
         * @param {Int} [timeout] when no response within this timesetting, then the Promise will be rejected. When not specified,
         *              a timeout of 60000 (1 minute) is taken. We need this, because we need to be sure the sync-functions has a callback.
         *              without a callback the promise would never be resolved. This is now caught with the timeout.
         * @return {Y.Promise} promised response --> resolve(response, options) OR reject(reason).
        **/
        savePromise: function (options, timeout) {
            _yuitest_coverfunc("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", "savePromise", 253);
_yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 254);
options = options || {};
            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 255);
var instance = this,
                savepromise = new Y.Promise(function (resolve, reject) {
                    _yuitest_coverfunc("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", "(anonymous 8)", 256);
_yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 257);
var facade = {
                            options : options,
                            src     :'save'
                        },
                        timeoutHandler;
                    _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 262);
instance._validate(instance.toJSON(), function (validateErr) {
                        _yuitest_coverfunc("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", "(anonymous 9)", 262);
_yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 263);
if (validateErr) {
                            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 264);
facade.error = validateErr;
                            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 265);
instance.fire(EVT_ERROR, facade);
                            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 266);
reject(new Error(validateErr));
                        }
                        else {
                            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 269);
timeoutHandler = Y.later(
                                timeout || DEFAULT_TIMEOUT,
                                instance,
                                function() {
                                    _yuitest_coverfunc("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", "(anonymous 10)", 272);
_yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 273);
var facade = {
                                            error   : TIMEOUT_MESSAGE
                                        };
                                    _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 276);
instance.fire(EVT_ERROR, facade);
                                    _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 277);
reject(new Error(TIMEOUT_MESSAGE));
                                }
                            );
                            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 280);
instance.sync(instance.isNew() ? 'create' : 'update', options, function (err, response) {
                                _yuitest_coverfunc("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", "(anonymous 11)", 280);
_yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 281);
if (timeoutHandler) {
                                    _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 282);
timeoutHandler.cancel();
                                }
                                _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 284);
if (savepromise.getStatus()==='pending') {
                                    _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 285);
var parsed;
                                    _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 286);
facade.response = response;
                                    _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 287);
if (err) {
                                        _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 288);
facade.error = err;
                                        _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 289);
facade.src   = 'save';
                                        _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 290);
instance.fire(EVT_ERROR, facade);
                                        _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 291);
reject(new Error(err));
                                    }
                                    else {
                                        // Lazy publish.
                                        _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 295);
if (!instance._saveEvent) {
                                            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 296);
instance._saveEvent = instance.publish(EVT_SAVE, {
                                                preventable: false
                                            });
                                        }
                                        _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 300);
parsed = facade.parsed = PARSED(response);
                                        _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 301);
instance.setAttrs(parsed, options);
                                        _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 302);
instance.changed = {};
                                        _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 303);
instance.fire(EVT_SAVE, facade);
                                        _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 304);
resolve(response, options);
                                    }
                                }
                            });
                        }
                    });
                });
            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 311);
return savepromise;
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
         * @param {Int} [timeout] when no response within this timesetting, then the Promise will be rejected. When not specified,
         *              a timeout of 60000 (1 minute) is taken. We need this, because we need to be sure the sync-functions has a callback.
         *              without a callback the promise would never be resolved. This is now caught with the timeout.
         * @return {Y.Promise} promised response --> resolve(response, options) OR reject(reason).
        **/
        destroyPromise: function (options, timeout) {
            _yuitest_coverfunc("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", "destroyPromise", 334);
_yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 335);
options = options || {};
            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 336);
var instance = this,
                destroypromise = new Y.Promise(function (resolve, reject) {
                    _yuitest_coverfunc("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", "(anonymous 12)", 337);
_yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 338);
var timeoutHandler = Y.later(
                            timeout || DEFAULT_TIMEOUT,
                            instance,
                            function() {
                                _yuitest_coverfunc("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", "(anonymous 13)", 341);
_yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 342);
var facade = {
                                        error   : TIMEOUT_MESSAGE
                                    };
                                _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 345);
instance.fire(EVT_ERROR, facade);
                                _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 346);
reject(new Error(TIMEOUT_MESSAGE));
                            }
                        );
                    _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 349);
instance.onceAfter('destroy', function () {
                        _yuitest_coverfunc("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", "(anonymous 14)", 349);
_yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 350);
function finish() {
                            _yuitest_coverfunc("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", "finish", 350);
_yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 351);
YArray.each(instance.lists.concat(), function (list) {
                                _yuitest_coverfunc("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", "(anonymous 15)", 351);
_yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 352);
list.remove(instance, options);
                            });
                        }
                        _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 355);
if (options.remove || options['delete']) {
                            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 356);
instance.sync('delete', options, function (err) {
                                _yuitest_coverfunc("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", "(anonymous 16)", 356);
_yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 357);
if (timeoutHandler) {
                                    _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 358);
timeoutHandler.cancel();
                                }
                                _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 360);
if (destroypromise.getStatus()==='pending') {
                                    _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 361);
if (err) {
                                        _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 362);
var facade = {
                                            error   : err,
                                            src     : 'destroy',
                                            options : options
                                        };
                                        _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 367);
instance.fire(EVT_ERROR, facade);
                                        _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 368);
reject(new Error(err));
                                    }
                                    else {
                                        _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 371);
finish();
                                        _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 372);
resolve(options);
                                    }
                                }
                            });
                        } else {
                            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 377);
if (timeoutHandler) {
                                _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 378);
timeoutHandler.cancel();
                            }
                            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 380);
if (destroypromise.getStatus()==='pending') {
                                _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 381);
finish();
                                _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 382);
resolve(options);
                            }
                        }
                    });
                });
            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 387);
Y.Model.superclass.destroy.call(instance);
            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 388);
return destroypromise;
        }

    }, true);
    _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 392);
Y.ITSAModelSyncPromise = ITSAModelSyncPromise;
    _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 393);
Y.Base.mix(Y.Model, [ITSAModelSyncPromise]);

    //==============================================================================

/**
 *
 * Extention ITSAModelSyncPromise
 *
 *
 * Extends Y.ModelList with Promised sync-methods. The synclayer can be made just as usual. But instead of calling
 * Model.loadyou can use:
 *
 * <b>Model.loadPromise</b>
 *
 * @module gallery-itsamodelsyncpromise
 * @extends ModelList
 * @class ITSAModellistSyncPromise
 * @constructor
 * @since 0.1
 *
 * <i>Copyright (c) 2013 Marco Asbreuk - http://itsasbreuk.nl</i>
 * YUI BSD License - http://developer.yahoo.com/yui/license.html
 *
*/
    // -- Mixing extra Methods to Y.Model -----------------------------------
    _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 418);
function ITSAModellistSyncPromise() {}
    _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 419);
Y.mix(ITSAModellistSyncPromise.prototype, {
        /**
         * Loads models from the server and adds them into the ModelList
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
         *
         * @method loadPromise
         * @param {Object} [options] Options to be passed to `sync()`. It's up to the custom sync
         *                 implementation to determine what options it supports or requires, if any.
         * @param {Int} [timeout] when no response within this timesetting, then the Promise will be rejected. When not specified,
         *              a timeout of 60000 (1 minute) is taken. We need this, because we need to be sure the sync-functions has a callback.
         *              without a callback the promise would never be resolved. This is now caught with the timeout.
         * @return {Y.Promise} promised response --> resolve(response, options) OR reject(reason).
        **/
        loadPromise: function (options, timeout) {
            _yuitest_coverfunc("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", "loadPromise", 441);
_yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 442);
options = options || {};
            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 443);
var instance = this,
                loadpromise = new Y.Promise(function (resolve, reject) {
                    _yuitest_coverfunc("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", "(anonymous 17)", 444);
_yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 445);
var timeoutHandler = Y.later(
                        timeout || DEFAULT_TIMEOUT,
                        instance,
                        function() {
                            _yuitest_coverfunc("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", "(anonymous 18)", 448);
_yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 449);
var facade = {
                                    src     : 'load',
                                    options : options,
                                    error   : TIMEOUT_MESSAGE
                                };
                            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 454);
instance.fire(EVT_ERROR, facade);
                            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 455);
reject(new Error(TIMEOUT_MESSAGE));
                        }
                    );
                    _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 458);
instance.sync('read', options, function (err, response) {
                        _yuitest_coverfunc("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", "(anonymous 19)", 458);
_yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 459);
if (timeoutHandler) {
                            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 460);
timeoutHandler.cancel();
                        }
                        _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 462);
if (loadpromise.getStatus()==='pending') {
                            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 463);
var parsed,
                                facade = {
                                    options : options,
                                    response: response
                                };
                            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 468);
if (err) {
                                _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 469);
facade.error = err;
                                _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 470);
facade.src   = 'load';
                                _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 471);
instance.fire(EVT_ERROR, facade);
                                _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 472);
reject(new Error(err));
                            }
                            else {
                                // Lazy publish.
                                _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 476);
if (!instance._loadEvent) {
                                    _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 477);
instance._loadEvent = instance.publish(EVT_LOAD, {
                                        preventable: false
                                    });
                                }
                                _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 481);
parsed = facade.parsed = PARSED(response);
                                _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 482);
instance.reset(parsed, options);
                                _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 483);
instance.fire(EVT_LOAD, facade);
                                _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 484);
resolve(response, options);
                            }
                        }
                    });
                });
            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 489);
return loadpromise;
        }
    }, true);
    _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 492);
Y.ITSAModellistSyncPromise = ITSAModellistSyncPromise;
    _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 493);
Y.Base.mix(Y.ModelList, [ITSAModellistSyncPromise]);

    //==============================================================================

}, '@VERSION@', {
    "requires": [
        "yui-base",
        "base-base",
        "base-build",
        "node-base",
        "json-parse",
        "promise",
        "model",
        "model-list",
        "yui-later"
    ]
});
