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
_yuitest_coverage["build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js"].code=["YUI.add('gallery-itsamodelsyncpromise', function (Y, NAME) {","","'use strict';","","/**"," *"," * Extention ITSAModelSyncPromise"," *"," *"," * Extends Y.Model with Promised sync-methods. The synclayer can be made just as usual. But instead of calling"," * Model.load and Model.save and Model.destroy, you can use:"," *"," * <b>Model.loadPromise</b>"," * <b>Model.savePromise</b>"," * <b>Model.submitPromise</b>"," * <b>Model.destroyPromise</b>"," *"," * <b>The sync-layer MUST call the callback-function of its related promise-method, otherwise the promises are not resolved.</b>"," *"," * @module gallery-itsamodelsyncpromise"," * @extends Model"," * @class ITSAModelSyncPromise"," * @constructor"," * @since 0.1"," *"," * <i>Copyright (c) 2013 Marco Asbreuk - http://itsasbreuk.nl</i>"," * YUI BSD License - http://developer.yahoo.com/yui/license.html"," *","*/","","   var YArray = Y.Array,","   /**","     * Fired when an error occurs, such as when an attribute (or property) doesn't validate or when","     * the sync layer submit-function returns an error.","     * @event error","     * @param e {EventFacade} Event Facade including:","     * @param e.error {any} Error message.","     * @param e.src {String} Source of the error. May be one of the following (or any","     *                     custom error source defined by a Model subclass):","     *","     * `submit`: An error submitting the model from within a sync layer.","     *","     * `attributevalidation`: An error validating an attribute (or property). The attribute (or objectproperty)","     *                        that failed validation will be provided as the `attribute` property on the event facade.","     *","     * @param e.attribute {String} The attribute/property that failed validation.","     * @param e.validationerror {String} The errormessage in case of attribute-validation error.","    **/","    EVT_ERROR = 'error',","   /**","     * Fired after model is submitted from the sync layer.","     * @event submit","     * @param e {EventFacade} Event Facade including:","     * @param [e.options] {Object} The options=object that was passed to the sync-layer, if there was one.","     * @param [e.parsed] {Object} The parsed version of the sync layer's response to the submit-request, if there was a response.","     * @param [e.response] {any} The sync layer's raw, unparsed response to the submit-request, if there was one.","     * @since 0.1","    **/","    EVT_SUBMIT = 'submit',","   /**","     * Fired after model is read from the sync layer.","     * @event load","     * @param e {EventFacade} Event Facade including:","     * @param [e.options] {Object} The options=object that was passed to the sync-layer, if there was one.","     * @param [e.response] {any} The sync layer's raw, unparsed response to the submit-request, if there was one.","     * @since 0.1","    **/","    EVT_LOAD = 'load',","   /**","     * Fired after model is saved through the sync layer.","     * @event submit","     * @param e {EventFacade} Event Facade including:","     * @param [e.options] {Object} The options=object that was passed to the sync-layer, if there was one.","     * @param [e.parsed] {Object} The parsed version of the sync layer's response to the submit-request, if there was a response.","     * @param [e.response] {any} The sync layer's raw, unparsed response to the submit-request, if there was one.","     * @since 0.1","    **/","    EVT_SAVE = 'save',","","    PARSED = function(value) {","        var parsed;","        try {","            parsed = Y.JSON.parse(value);","        } catch (ex) {}","        return parsed;","    };","","    // -- Mixing extra Methods to Y.Model -----------------------------------","","    function ITSAModelSyncPromise() {}","    Y.mix(ITSAModelSyncPromise.prototype, {","       /**","         * Submits this model to the server.","         *","         * This method delegates to the `sync()` method to perform the actual submit","         * operation, which is Y.Promise. Read the Promise.then() and look for resolve(response, options) OR reject(reason).","         *","         * A successful submit-operation will also fire a `submit` event, while an unsuccessful","         * submit operation will fire an `error` event with the `src` value \"submit\".","         *","         * <b>CAUTION</b> The sync-method MUST call its callback-function to make the promised resolved.","         *","         * @method submitPromise","         * @param {Object} [options] Options to be passed to `sync()`. It's up to the custom sync","         *                 implementation to determine what options it supports or requires, if any.","         * @return {Y.Promise} promised response --> resolve(response, options) OR reject(reason).","        **/","        submitPromise: function(options) {","            var instance = this;","","            options = options || {};","            return new Y.Promise(function (resolve, reject) {","                instance.sync('submit', options, function (err, response) {","                    var facade = {","                            options : options,","                            response: response","                        };","                    if (err) {","                        facade.error = err;","                        facade.src   = 'submit';","                        instance.fire(EVT_ERROR, facade);","                        reject(new Error(err));","                    }","                    else {","                        // Lazy publish.","                        if (!instance._submitEvent) {","                            instance._submitEvent = instance.publish(EVT_SUBMIT, {","                                preventable: false","                            });","                        }","                        instance.fire(EVT_SUBMIT, facade);","                        resolve(response, options);","                    }","                });","            });","        },","","","        /**","         * Loads this model from the server.","         *","         * This method delegates to the `sync()` method to perform the actual load","         * operation, which is an asynchronous action. Specify a _callback_ function to","         * be notified of success or failure.","         *","         * A successful load operation will fire a `load` event, while an unsuccessful","         * load operation will fire an `error` event with the `src` value \"load\".","         *","         * If the load operation succeeds and one or more of the loaded attributes","         * differ from this model's current attributes, a `change` event will be fired.","         * @method loadPromise","         * @param {Object} [options] Options to be passed to `sync()`. It's up to the custom sync","         *                 implementation to determine what options it supports or requires, if any.","         * @return {Y.Promise} promised response --> resolve(response, options) OR reject(reason).","        **/","        loadPromise: function (options) {","            var instance = this;","","            options = options || {};","            return new Y.Promise(function (resolve, reject) {","                instance.sync('read', options, function (err, response) {","                    var parsed,","                        facade = {","                            options : options,","                            response: response","                        };","                    if (err) {","                        facade.error = err;","                        facade.src   = 'load';","                        instance.fire(EVT_ERROR, facade);","                        reject(new Error(err));","                    }","                    else {","                        // Lazy publish.","                        if (!instance._loadEvent) {","                            instance._loadEvent = instance.publish(EVT_LOAD, {","                                preventable: false","                            });","                        }","                        parsed = facade.parsed = PARSED(response);","                        instance.setAttrs(parsed, options);","                        instance.changed = {};","                        instance.fire(EVT_LOAD, facade);","                        resolve(response, options);","                    }","                });","            });","        },","","       /**","        * Saves this model to the server.","        *","        * This method delegates to the `sync()` method to perform the actual save","        * operation, which is an asynchronous action. Specify a _callback_ function to","        * be notified of success or failure.","        *","        * A successful save operation will fire a `save` event, while an unsuccessful","        * save operation will fire an `error` event with the `src` value \"save\".","        *","        * If the save operation succeeds and one or more of the attributes returned in","        * the server's response differ from this model's current attributes, a","        * `change` event will be fired.","        *","        * @method savePromise","         * @param {Object} [options] Options to be passed to `sync()`. It's up to the custom sync","         *                 implementation to determine what options it supports or requires, if any.","         * @return {Y.Promise} promised response --> resolve(response, options) OR reject(reason).","        **/","        savePromise: function (options) {","            var instance = this;","","            options = options || {};","            return new Y.Promise(function (resolve, reject) {","                var facade = {","                        options : options,","                        src     :'save'","                    };","                instance._validate(instance.toJSON(), function (validateErr) {","                    if (validateErr) {","                        facade.error = validateErr;","                        instance.fire(EVT_ERROR, facade);","                        reject(new Error(validateErr));","                    }","                    else {","                        instance.sync(instance.isNew() ? 'create' : 'update', options, function (err, response) {","                            var parsed;","                            facade.response = response;","                            if (err) {","                                facade.error = err;","                                facade.src   = 'save';","                                instance.fire(EVT_ERROR, facade);","                                reject(new Error(err));","                            }","                            else {","                                // Lazy publish.","                                if (!instance._saveEvent) {","                                    instance._saveEvent = instance.publish(EVT_SAVE, {","                                        preventable: false","                                    });","                                }","                                parsed = facade.parsed = PARSED(response);","                                instance.setAttrs(parsed, options);","                                instance.changed = {};","                                instance.fire(EVT_SAVE, facade);","                                resolve(response, options);","                            }","                        });","                    }","                });","            });","        },","","      /**","         * Destroys this model instance and removes it from its containing lists, if any.","         *","         * The _callback_, if one is provided, will be called after the model is","         * destroyed.","         *","         * If `options.remove` is `true`, then this method delegates to the `sync()`","         * method to delete the model from the persistence layer, which is an","         * asynchronous action. In this case, the _callback_ (if provided) will be","         * called after the sync layer indicates success or failure of the delete","         * operation.","         *","         * @method destroyPromise","         * @param {Object} [options] Options to be passed to `sync()`. It's up to the custom sync","         *                 implementation to determine what options it supports or requires, if any.","         * @return {Y.Promise} promised response --> resolve(response, options) OR reject(reason).","        **/","        destroyPromise: function (options) {","            var instance = this;","","            options = options || {};","            return new Y.Promise(function (resolve, reject) {","                instance.onceAfter('destroy', function () {","                    function finish() {","                        YArray.each(instance.lists.concat(), function (list) {","                            list.remove(instance, options);","                        });","                    }","                    if (options.remove || options['delete']) {","                        instance.sync('delete', options, function (err) {","                            if (err) {","                                var facade = {","                                    error   : err,","                                    src     : 'destroy',","                                    options : options","                                };","                                instance.fire(EVT_ERROR, facade);","                                reject(new Error(err));","                            }","                            else {","                                finish();","                                resolve(options);","                            }","                        });","                    } else {","                        finish();","                        resolve(options);","                    }","                });","            }).then(","                function() {","                    // if succeeded, destroy the Model's instance","                    Y.Model.superclass.destroy.call(instance);","                }","            );","        }","","    }, true);","","    Y.ITSAModelSyncPromise = ITSAModelSyncPromise;","","    Y.Base.mix(Y.Model, [ITSAModelSyncPromise]);","","}, '@VERSION@', {\"requires\": [\"yui-base\", \"base-base\", \"base-build\", \"node-base\", \"json-parse\", \"promise\", \"model\"]});"];
_yuitest_coverage["build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js"].lines = {"1":0,"3":0,"31":0,"81":0,"82":0,"83":0,"85":0,"90":0,"91":0,"109":0,"111":0,"112":0,"113":0,"114":0,"118":0,"119":0,"120":0,"121":0,"122":0,"126":0,"127":0,"131":0,"132":0,"157":0,"159":0,"160":0,"161":0,"162":0,"167":0,"168":0,"169":0,"170":0,"171":0,"175":0,"176":0,"180":0,"181":0,"182":0,"183":0,"184":0,"210":0,"212":0,"213":0,"214":0,"218":0,"219":0,"220":0,"221":0,"222":0,"225":0,"226":0,"227":0,"228":0,"229":0,"230":0,"231":0,"232":0,"236":0,"237":0,"241":0,"242":0,"243":0,"244":0,"245":0,"271":0,"273":0,"274":0,"275":0,"276":0,"277":0,"278":0,"281":0,"282":0,"283":0,"284":0,"289":0,"290":0,"293":0,"294":0,"298":0,"299":0,"305":0,"312":0,"314":0};
_yuitest_coverage["build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js"].functions = {"PARSED:80":0,"ITSAModelSyncPromise:90":0,"(anonymous 3):113":0,"(anonymous 2):112":0,"submitPromise:108":0,"(anonymous 5):161":0,"(anonymous 4):160":0,"loadPromise:156":0,"(anonymous 8):225":0,"(anonymous 7):218":0,"(anonymous 6):213":0,"savePromise:209":0,"(anonymous 11):277":0,"finish:276":0,"(anonymous 12):282":0,"(anonymous 10):275":0,"(anonymous 9):274":0,"(anonymous 13):303":0,"destroyPromise:270":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js"].coveredLines = 84;
_yuitest_coverage["build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js"].coveredFunctions = 20;
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
 * @extends Model
 * @class ITSAModelSyncPromise
 * @constructor
 * @since 0.1
 *
 * <i>Copyright (c) 2013 Marco Asbreuk - http://itsasbreuk.nl</i>
 * YUI BSD License - http://developer.yahoo.com/yui/license.html
 *
*/

   _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 31);
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

    _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 90);
function ITSAModelSyncPromise() {}
    _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 91);
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
         * <b>CAUTION</b> The sync-method MUST call its callback-function to make the promised resolved.
         *
         * @method submitPromise
         * @param {Object} [options] Options to be passed to `sync()`. It's up to the custom sync
         *                 implementation to determine what options it supports or requires, if any.
         * @return {Y.Promise} promised response --> resolve(response, options) OR reject(reason).
        **/
        submitPromise: function(options) {
            _yuitest_coverfunc("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", "submitPromise", 108);
_yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 109);
var instance = this;

            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 111);
options = options || {};
            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 112);
return new Y.Promise(function (resolve, reject) {
                _yuitest_coverfunc("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", "(anonymous 2)", 112);
_yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 113);
instance.sync('submit', options, function (err, response) {
                    _yuitest_coverfunc("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", "(anonymous 3)", 113);
_yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 114);
var facade = {
                            options : options,
                            response: response
                        };
                    _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 118);
if (err) {
                        _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 119);
facade.error = err;
                        _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 120);
facade.src   = 'submit';
                        _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 121);
instance.fire(EVT_ERROR, facade);
                        _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 122);
reject(new Error(err));
                    }
                    else {
                        // Lazy publish.
                        _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 126);
if (!instance._submitEvent) {
                            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 127);
instance._submitEvent = instance.publish(EVT_SUBMIT, {
                                preventable: false
                            });
                        }
                        _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 131);
instance.fire(EVT_SUBMIT, facade);
                        _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 132);
resolve(response, options);
                    }
                });
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
         * @return {Y.Promise} promised response --> resolve(response, options) OR reject(reason).
        **/
        loadPromise: function (options) {
            _yuitest_coverfunc("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", "loadPromise", 156);
_yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 157);
var instance = this;

            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 159);
options = options || {};
            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 160);
return new Y.Promise(function (resolve, reject) {
                _yuitest_coverfunc("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", "(anonymous 4)", 160);
_yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 161);
instance.sync('read', options, function (err, response) {
                    _yuitest_coverfunc("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", "(anonymous 5)", 161);
_yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 162);
var parsed,
                        facade = {
                            options : options,
                            response: response
                        };
                    _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 167);
if (err) {
                        _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 168);
facade.error = err;
                        _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 169);
facade.src   = 'load';
                        _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 170);
instance.fire(EVT_ERROR, facade);
                        _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 171);
reject(new Error(err));
                    }
                    else {
                        // Lazy publish.
                        _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 175);
if (!instance._loadEvent) {
                            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 176);
instance._loadEvent = instance.publish(EVT_LOAD, {
                                preventable: false
                            });
                        }
                        _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 180);
parsed = facade.parsed = PARSED(response);
                        _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 181);
instance.setAttrs(parsed, options);
                        _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 182);
instance.changed = {};
                        _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 183);
instance.fire(EVT_LOAD, facade);
                        _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 184);
resolve(response, options);
                    }
                });
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
         * @return {Y.Promise} promised response --> resolve(response, options) OR reject(reason).
        **/
        savePromise: function (options) {
            _yuitest_coverfunc("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", "savePromise", 209);
_yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 210);
var instance = this;

            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 212);
options = options || {};
            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 213);
return new Y.Promise(function (resolve, reject) {
                _yuitest_coverfunc("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", "(anonymous 6)", 213);
_yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 214);
var facade = {
                        options : options,
                        src     :'save'
                    };
                _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 218);
instance._validate(instance.toJSON(), function (validateErr) {
                    _yuitest_coverfunc("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", "(anonymous 7)", 218);
_yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 219);
if (validateErr) {
                        _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 220);
facade.error = validateErr;
                        _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 221);
instance.fire(EVT_ERROR, facade);
                        _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 222);
reject(new Error(validateErr));
                    }
                    else {
                        _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 225);
instance.sync(instance.isNew() ? 'create' : 'update', options, function (err, response) {
                            _yuitest_coverfunc("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", "(anonymous 8)", 225);
_yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 226);
var parsed;
                            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 227);
facade.response = response;
                            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 228);
if (err) {
                                _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 229);
facade.error = err;
                                _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 230);
facade.src   = 'save';
                                _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 231);
instance.fire(EVT_ERROR, facade);
                                _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 232);
reject(new Error(err));
                            }
                            else {
                                // Lazy publish.
                                _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 236);
if (!instance._saveEvent) {
                                    _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 237);
instance._saveEvent = instance.publish(EVT_SAVE, {
                                        preventable: false
                                    });
                                }
                                _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 241);
parsed = facade.parsed = PARSED(response);
                                _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 242);
instance.setAttrs(parsed, options);
                                _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 243);
instance.changed = {};
                                _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 244);
instance.fire(EVT_SAVE, facade);
                                _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 245);
resolve(response, options);
                            }
                        });
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
         * @return {Y.Promise} promised response --> resolve(response, options) OR reject(reason).
        **/
        destroyPromise: function (options) {
            _yuitest_coverfunc("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", "destroyPromise", 270);
_yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 271);
var instance = this;

            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 273);
options = options || {};
            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 274);
return new Y.Promise(function (resolve, reject) {
                _yuitest_coverfunc("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", "(anonymous 9)", 274);
_yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 275);
instance.onceAfter('destroy', function () {
                    _yuitest_coverfunc("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", "(anonymous 10)", 275);
_yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 276);
function finish() {
                        _yuitest_coverfunc("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", "finish", 276);
_yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 277);
YArray.each(instance.lists.concat(), function (list) {
                            _yuitest_coverfunc("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", "(anonymous 11)", 277);
_yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 278);
list.remove(instance, options);
                        });
                    }
                    _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 281);
if (options.remove || options['delete']) {
                        _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 282);
instance.sync('delete', options, function (err) {
                            _yuitest_coverfunc("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", "(anonymous 12)", 282);
_yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 283);
if (err) {
                                _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 284);
var facade = {
                                    error   : err,
                                    src     : 'destroy',
                                    options : options
                                };
                                _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 289);
instance.fire(EVT_ERROR, facade);
                                _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 290);
reject(new Error(err));
                            }
                            else {
                                _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 293);
finish();
                                _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 294);
resolve(options);
                            }
                        });
                    } else {
                        _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 298);
finish();
                        _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 299);
resolve(options);
                    }
                });
            }).then(
                function() {
                    // if succeeded, destroy the Model's instance
                    _yuitest_coverfunc("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", "(anonymous 13)", 303);
_yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 305);
Y.Model.superclass.destroy.call(instance);
                }
            );
        }

    }, true);

    _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 312);
Y.ITSAModelSyncPromise = ITSAModelSyncPromise;

    _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 314);
Y.Base.mix(Y.Model, [ITSAModelSyncPromise]);

}, '@VERSION@', {"requires": ["yui-base", "base-base", "base-build", "node-base", "json-parse", "promise", "model"]});
