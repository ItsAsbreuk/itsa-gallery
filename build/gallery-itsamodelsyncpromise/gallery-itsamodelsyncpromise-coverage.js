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
_yuitest_coverage["build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js"].code=["YUI.add('gallery-itsamodelsyncpromise', function (Y, NAME) {","","'use strict';","","/**"," *"," * Extention ITSAModelSyncPromise"," *"," *"," * Extends Y.Model with Promised sync-methods. The synclayer can be made just as usual. But instead of calling"," * Model.load and Model.save and Model.destroy, you can use:"," *"," * <b>Model.loadPromise</b>"," * <b>Model.savePromise</b>"," * <b>Model.submitPromise</b>"," * <b>Model.destroyPromise</b>"," *"," * <b>The sync-layer MUST call the callback-function of its related promise-method, otherwise the promises are not resolved.</b>"," *"," * @module gallery-itsamodelsyncpromise"," * @extends Model"," * @class ITSAModelSyncPromise"," * @constructor"," * @since 0.1"," *"," * <i>Copyright (c) 2013 Marco Asbreuk - http://itsasbreuk.nl</i>"," * YUI BSD License - http://developer.yahoo.com/yui/license.html"," *","*/","","   var YArray = Y.Array,","   /**","     * Fired when an error occurs, such as when an attribute (or property) doesn't validate or when","     * the sync layer submit-function returns an error.","     * @event error","     * @param e {EventFacade} Event Facade including:","     * @param e.error {any} Error message.","     * @param e.src {String} Source of the error. May be one of the following (or any","     *                     custom error source defined by a Model subclass):","     *","     * `submit`: An error submitting the model from within a sync layer.","     *","     * `attributevalidation`: An error validating an attribute (or property). The attribute (or objectproperty)","     *                        that failed validation will be provided as the `attribute` property on the event facade.","     *","     * @param e.attribute {String} The attribute/property that failed validation.","     * @param e.validationerror {String} The errormessage in case of attribute-validation error.","    **/","    EVT_ERROR = 'error',","   /**","     * Fired after model is submitted from the sync layer.","     * @event submit","     * @param e {EventFacade} Event Facade including:","     * @param [e.options] {Object} The options=object that was passed to the sync-layer, if there was one.","     * @param [e.parsed] {Object} The parsed version of the sync layer's response to the submit-request, if there was a response.","     * @param [e.response] {any} The sync layer's raw, unparsed response to the submit-request, if there was one.","     * @since 0.1","    **/","    EVT_SUBMIT = 'submit',","   /**","     * Fired after model is read from the sync layer.","     * @event load","     * @param e {EventFacade} Event Facade including:","     * @param [e.options] {Object} The options=object that was passed to the sync-layer, if there was one.","     * @param [e.response] {any} The sync layer's raw, unparsed response to the submit-request, if there was one.","     * @since 0.1","    **/","    EVT_LOAD = 'load',","   /**","     * Fired after model is saved through the sync layer.","     * @event submit","     * @param e {EventFacade} Event Facade including:","     * @param [e.options] {Object} The options=object that was passed to the sync-layer, if there was one.","     * @param [e.parsed] {Object} The parsed version of the sync layer's response to the submit-request, if there was a response.","     * @param [e.response] {any} The sync layer's raw, unparsed response to the submit-request, if there was one.","     * @since 0.1","    **/","    EVT_SAVE = 'save',","","    PARSED = function(value) {","        var parsed;","        try {","            parsed = Y.JSON.parse(value);","        } catch (ex) {}","        return parsed;","    };","","    // -- Mixing extra Methods to Y.Model -----------------------------------","    function ITSAModelSyncPromise() {}","    Y.mix(ITSAModelSyncPromise.prototype, {","       /**","         * Submits this model to the server.","         *","         * This method delegates to the `sync()` method to perform the actual submit","         * operation, which is Y.Promise. Read the Promise.then() and look for resolve(response, options) OR reject(reason).","         *","         * A successful submit-operation will also fire a `submit` event, while an unsuccessful","         * submit operation will fire an `error` event with the `src` value \"submit\".","         *","         * <b>CAUTION</b> The sync-method MUST call its callback-function to make the promised resolved.","         *","         * @method submitPromise","         * @param {Object} [options] Options to be passed to `sync()`. It's up to the custom sync","         *                 implementation to determine what options it supports or requires, if any.","         * @return {Y.Promise} promised response --> resolve(response, options) OR reject(reason).","        **/","        submitPromise: function(options) {","            options = options || {};","            var instance = this,","                submitpromise = new Y.Promise(function (resolve, reject) {","                    instance.sync('submit', options, function (err, response) {","                        var facade = {","                                options : options,","                                response: response","                            };","                        if (err) {","                            facade.error = err;","                            facade.src   = 'submit';","                            instance.fire(EVT_ERROR, facade);","                            reject(new Error(err));","                        }","                        else {","                            // Lazy publish.","                            if (!instance._submitEvent) {","                                instance._submitEvent = instance.publish(EVT_SUBMIT, {","                                    preventable: false","                                });","                            }","                            instance.fire(EVT_SUBMIT, facade);","                            resolve(response, options);","                        }","                    });","                });","            return submitpromise;","        },","","","        /**","         * Loads this model from the server.","         *","         * This method delegates to the `sync()` method to perform the actual load","         * operation, which is an asynchronous action. Specify a _callback_ function to","         * be notified of success or failure.","         *","         * A successful load operation will fire a `load` event, while an unsuccessful","         * load operation will fire an `error` event with the `src` value \"load\".","         *","         * If the load operation succeeds and one or more of the loaded attributes","         * differ from this model's current attributes, a `change` event will be fired.","         * @method loadPromise","         * @param {Object} [options] Options to be passed to `sync()`. It's up to the custom sync","         *                 implementation to determine what options it supports or requires, if any.","         * @return {Y.Promise} promised response --> resolve(response, options) OR reject(reason).","        **/","        loadPromise: function (options) {","            options = options || {};","            var instance = this,","                loadpromise = new Y.Promise(function (resolve, reject) {","                    instance.sync('read', options, function (err, response) {","                        var parsed,","                            facade = {","                                options : options,","                                response: response","                            };","                        if (err) {","                            facade.error = err;","                            facade.src   = 'load';","                            instance.fire(EVT_ERROR, facade);","                            reject(new Error(err));","                        }","                        else {","                            // Lazy publish.","                            if (!instance._loadEvent) {","                                instance._loadEvent = instance.publish(EVT_LOAD, {","                                    preventable: false","                                });","                            }","                            parsed = facade.parsed = PARSED(response);","                            instance.setAttrs(parsed, options);","                            instance.changed = {};","                            instance.fire(EVT_LOAD, facade);","                            resolve(response, options);","                        }","                    });","                });","            return loadpromise;","        },","","       /**","        * Saves this model to the server.","        *","        * This method delegates to the `sync()` method to perform the actual save","        * operation, which is an asynchronous action. Specify a _callback_ function to","        * be notified of success or failure.","        *","        * A successful save operation will fire a `save` event, while an unsuccessful","        * save operation will fire an `error` event with the `src` value \"save\".","        *","        * If the save operation succeeds and one or more of the attributes returned in","        * the server's response differ from this model's current attributes, a","        * `change` event will be fired.","        *","        * @method savePromise","         * @param {Object} [options] Options to be passed to `sync()`. It's up to the custom sync","         *                 implementation to determine what options it supports or requires, if any.","         * @return {Y.Promise} promised response --> resolve(response, options) OR reject(reason).","        **/","        savePromise: function (options) {","            options = options || {};","            var instance = this,","                savepromise = new Y.Promise(function (resolve, reject) {","                    var facade = {","                            options : options,","                            src     :'save'","                        };","                    instance._validate(instance.toJSON(), function (validateErr) {","                        if (validateErr) {","                            facade.error = validateErr;","                            instance.fire(EVT_ERROR, facade);","                            reject(new Error(validateErr));","                        }","                        else {","                            instance.sync(instance.isNew() ? 'create' : 'update', options, function (err, response) {","                                var parsed;","                                facade.response = response;","                                if (err) {","                                    facade.error = err;","                                    facade.src   = 'save';","                                    instance.fire(EVT_ERROR, facade);","                                    reject(new Error(err));","                                }","                                else {","                                    // Lazy publish.","                                    if (!instance._saveEvent) {","                                        instance._saveEvent = instance.publish(EVT_SAVE, {","                                            preventable: false","                                        });","                                    }","                                    parsed = facade.parsed = PARSED(response);","                                    instance.setAttrs(parsed, options);","                                    instance.changed = {};","                                    instance.fire(EVT_SAVE, facade);","                                    resolve(response, options);","                                }","                            });","                        }","                    });","                });","            return savepromise;","        },","","      /**","         * Destroys this model instance and removes it from its containing lists, if any.","         *","         * The _callback_, if one is provided, will be called after the model is","         * destroyed.","         *","         * If `options.remove` is `true`, then this method delegates to the `sync()`","         * method to delete the model from the persistence layer, which is an","         * asynchronous action. In this case, the _callback_ (if provided) will be","         * called after the sync layer indicates success or failure of the delete","         * operation.","         *","         * @method destroyPromise","         * @param {Object} [options] Options to be passed to `sync()`. It's up to the custom sync","         *                 implementation to determine what options it supports or requires, if any.","         * @return {Y.Promise} promised response --> resolve(response, options) OR reject(reason).","        **/","        destroyPromise: function (options) {","            options = options || {};","            var instance = this,","                destroypromise = new Y.Promise(function (resolve, reject) {","                    instance.onceAfter('destroy', function () {","                        function finish() {","                            YArray.each(instance.lists.concat(), function (list) {","                                list.remove(instance, options);","                            });","                        }","                        if (options.remove || options['delete']) {","                            instance.sync('delete', options, function (err) {","                                if (err) {","                                    var facade = {","                                        error   : err,","                                        src     : 'destroy',","                                        options : options","                                    };","                                    instance.fire(EVT_ERROR, facade);","                                    reject(new Error(err));","                                }","                                else {","                                    finish();","                                    resolve(options);","                                }","                            });","                        } else {","                            finish();","                            resolve(options);","                        }","                    });","                });","            Y.Model.superclass.destroy.call(instance);","            return destroypromise;","        }","","    }, true);","    Y.ITSAModelSyncPromise = ITSAModelSyncPromise;","    Y.Base.mix(Y.Model, [ITSAModelSyncPromise]);","","    //==============================================================================","","/**"," *"," * Extention ITSAModelSyncPromise"," *"," *"," * Extends Y.ModelList with Promised sync-methods. The synclayer can be made just as usual. But instead of calling"," * Model.loadyou can use:"," *"," * <b>Model.loadPromise</b>"," *"," * @module gallery-itsamodelsyncpromise"," * @extends ModelList"," * @class ITSAModellistSyncPromise"," * @constructor"," * @since 0.1"," *"," * <i>Copyright (c) 2013 Marco Asbreuk - http://itsasbreuk.nl</i>"," * YUI BSD License - http://developer.yahoo.com/yui/license.html"," *","*/","    // -- Mixing extra Methods to Y.Model -----------------------------------","    function ITSAModellistSyncPromise() {}","    Y.mix(ITSAModellistSyncPromise.prototype, {","        /**","         * Loads models from the server and adds them into the ModelList","         *","         * This method delegates to the `sync()` method to perform the actual load","         * operation, which is an asynchronous action. Specify a _callback_ function to","         * be notified of success or failure.","         *","         * A successful load operation will fire a `load` event, while an unsuccessful","         * load operation will fire an `error` event with the `src` value \"load\".","         *","         * If the load operation succeeds and one or more of the loaded attributes","         * differ from this model's current attributes, a `change` event will be fired.","         *","         * @method loadPromise","         * @param {Object} [options] Options to be passed to `sync()`. It's up to the custom sync","         *                 implementation to determine what options it supports or requires, if any.","         * @return {Y.Promise} promised response --> resolve(response, options) OR reject(reason).","        **/","        loadPromise: function (options) {","            options = options || {};","            var instance = this,","                loadpromise = new Y.Promise(function (resolve, reject) {","                    instance.sync('read', options, function (err, response) {","                        var parsed,","                            facade = {","                                options : options,","                                response: response","                            };","                        if (err) {","                            facade.error = err;","                            facade.src   = 'load';","                            instance.fire(EVT_ERROR, facade);","                            reject(new Error(err));","                        }","                        else {","                            // Lazy publish.","                            if (!instance._loadEvent) {","                                instance._loadEvent = instance.publish(EVT_LOAD, {","                                    preventable: false","                                });","                            }","                            parsed = facade.parsed = PARSED(response);","                            instance.reset(parsed, options);","                            instance.fire(EVT_LOAD, facade);","                            resolve(response, options);","                        }","                    });","                });","            return loadpromise;","        }","    }, true);","    Y.ITSAModellistSyncPromise = ITSAModellistSyncPromise;","    Y.Base.mix(Y.ModelList, [ITSAModellistSyncPromise]);","","}, '@VERSION@', {","    \"requires\": [","        \"yui-base\",","        \"base-base\",","        \"base-build\",","        \"node-base\",","        \"json-parse\",","        \"promise\",","        \"model\",","        \"model-list\",","        \"yui-later\"","    ]","});"];
_yuitest_coverage["build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js"].lines = {"1":0,"3":0,"31":0,"81":0,"82":0,"83":0,"85":0,"89":0,"90":0,"108":0,"109":0,"111":0,"112":0,"116":0,"117":0,"118":0,"119":0,"120":0,"124":0,"125":0,"129":0,"130":0,"134":0,"156":0,"157":0,"159":0,"160":0,"165":0,"166":0,"167":0,"168":0,"169":0,"173":0,"174":0,"178":0,"179":0,"180":0,"181":0,"182":0,"186":0,"209":0,"210":0,"212":0,"216":0,"217":0,"218":0,"219":0,"220":0,"223":0,"224":0,"225":0,"226":0,"227":0,"228":0,"229":0,"230":0,"234":0,"235":0,"239":0,"240":0,"241":0,"242":0,"243":0,"249":0,"270":0,"271":0,"273":0,"274":0,"275":0,"276":0,"279":0,"280":0,"281":0,"282":0,"287":0,"288":0,"291":0,"292":0,"296":0,"297":0,"301":0,"302":0,"306":0,"307":0,"332":0,"333":0,"353":0,"354":0,"356":0,"357":0,"362":0,"363":0,"364":0,"365":0,"366":0,"370":0,"371":0,"375":0,"376":0,"377":0,"378":0,"382":0,"385":0,"386":0};
_yuitest_coverage["build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js"].functions = {"PARSED:80":0,"ITSAModelSyncPromise:89":0,"(anonymous 3):111":0,"(anonymous 2):110":0,"submitPromise:107":0,"(anonymous 5):159":0,"(anonymous 4):158":0,"loadPromise:155":0,"(anonymous 8):223":0,"(anonymous 7):216":0,"(anonymous 6):211":0,"savePromise:208":0,"(anonymous 11):275":0,"finish:274":0,"(anonymous 12):280":0,"(anonymous 10):273":0,"(anonymous 9):272":0,"destroyPromise:269":0,"ITSAModellistSyncPromise:332":0,"(anonymous 14):356":0,"(anonymous 13):355":0,"loadPromise:352":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js"].coveredLines = 104;
_yuitest_coverage["build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js"].coveredFunctions = 23;
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
         * <b>CAUTION</b> The sync-method MUST call its callback-function to make the promised resolved.
         *
         * @method submitPromise
         * @param {Object} [options] Options to be passed to `sync()`. It's up to the custom sync
         *                 implementation to determine what options it supports or requires, if any.
         * @return {Y.Promise} promised response --> resolve(response, options) OR reject(reason).
        **/
        submitPromise: function(options) {
            _yuitest_coverfunc("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", "submitPromise", 107);
_yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 108);
options = options || {};
            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 109);
var instance = this,
                submitpromise = new Y.Promise(function (resolve, reject) {
                    _yuitest_coverfunc("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", "(anonymous 2)", 110);
_yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 111);
instance.sync('submit', options, function (err, response) {
                        _yuitest_coverfunc("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", "(anonymous 3)", 111);
_yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 112);
var facade = {
                                options : options,
                                response: response
                            };
                        _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 116);
if (err) {
                            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 117);
facade.error = err;
                            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 118);
facade.src   = 'submit';
                            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 119);
instance.fire(EVT_ERROR, facade);
                            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 120);
reject(new Error(err));
                        }
                        else {
                            // Lazy publish.
                            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 124);
if (!instance._submitEvent) {
                                _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 125);
instance._submitEvent = instance.publish(EVT_SUBMIT, {
                                    preventable: false
                                });
                            }
                            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 129);
instance.fire(EVT_SUBMIT, facade);
                            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 130);
resolve(response, options);
                        }
                    });
                });
            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 134);
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
         * @return {Y.Promise} promised response --> resolve(response, options) OR reject(reason).
        **/
        loadPromise: function (options) {
            _yuitest_coverfunc("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", "loadPromise", 155);
_yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 156);
options = options || {};
            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 157);
var instance = this,
                loadpromise = new Y.Promise(function (resolve, reject) {
                    _yuitest_coverfunc("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", "(anonymous 4)", 158);
_yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 159);
instance.sync('read', options, function (err, response) {
                        _yuitest_coverfunc("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", "(anonymous 5)", 159);
_yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 160);
var parsed,
                            facade = {
                                options : options,
                                response: response
                            };
                        _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 165);
if (err) {
                            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 166);
facade.error = err;
                            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 167);
facade.src   = 'load';
                            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 168);
instance.fire(EVT_ERROR, facade);
                            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 169);
reject(new Error(err));
                        }
                        else {
                            // Lazy publish.
                            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 173);
if (!instance._loadEvent) {
                                _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 174);
instance._loadEvent = instance.publish(EVT_LOAD, {
                                    preventable: false
                                });
                            }
                            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 178);
parsed = facade.parsed = PARSED(response);
                            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 179);
instance.setAttrs(parsed, options);
                            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 180);
instance.changed = {};
                            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 181);
instance.fire(EVT_LOAD, facade);
                            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 182);
resolve(response, options);
                        }
                    });
                });
            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 186);
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
         * @return {Y.Promise} promised response --> resolve(response, options) OR reject(reason).
        **/
        savePromise: function (options) {
            _yuitest_coverfunc("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", "savePromise", 208);
_yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 209);
options = options || {};
            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 210);
var instance = this,
                savepromise = new Y.Promise(function (resolve, reject) {
                    _yuitest_coverfunc("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", "(anonymous 6)", 211);
_yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 212);
var facade = {
                            options : options,
                            src     :'save'
                        };
                    _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 216);
instance._validate(instance.toJSON(), function (validateErr) {
                        _yuitest_coverfunc("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", "(anonymous 7)", 216);
_yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 217);
if (validateErr) {
                            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 218);
facade.error = validateErr;
                            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 219);
instance.fire(EVT_ERROR, facade);
                            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 220);
reject(new Error(validateErr));
                        }
                        else {
                            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 223);
instance.sync(instance.isNew() ? 'create' : 'update', options, function (err, response) {
                                _yuitest_coverfunc("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", "(anonymous 8)", 223);
_yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 224);
var parsed;
                                _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 225);
facade.response = response;
                                _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 226);
if (err) {
                                    _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 227);
facade.error = err;
                                    _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 228);
facade.src   = 'save';
                                    _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 229);
instance.fire(EVT_ERROR, facade);
                                    _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 230);
reject(new Error(err));
                                }
                                else {
                                    // Lazy publish.
                                    _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 234);
if (!instance._saveEvent) {
                                        _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 235);
instance._saveEvent = instance.publish(EVT_SAVE, {
                                            preventable: false
                                        });
                                    }
                                    _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 239);
parsed = facade.parsed = PARSED(response);
                                    _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 240);
instance.setAttrs(parsed, options);
                                    _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 241);
instance.changed = {};
                                    _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 242);
instance.fire(EVT_SAVE, facade);
                                    _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 243);
resolve(response, options);
                                }
                            });
                        }
                    });
                });
            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 249);
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
         * @return {Y.Promise} promised response --> resolve(response, options) OR reject(reason).
        **/
        destroyPromise: function (options) {
            _yuitest_coverfunc("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", "destroyPromise", 269);
_yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 270);
options = options || {};
            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 271);
var instance = this,
                destroypromise = new Y.Promise(function (resolve, reject) {
                    _yuitest_coverfunc("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", "(anonymous 9)", 272);
_yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 273);
instance.onceAfter('destroy', function () {
                        _yuitest_coverfunc("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", "(anonymous 10)", 273);
_yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 274);
function finish() {
                            _yuitest_coverfunc("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", "finish", 274);
_yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 275);
YArray.each(instance.lists.concat(), function (list) {
                                _yuitest_coverfunc("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", "(anonymous 11)", 275);
_yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 276);
list.remove(instance, options);
                            });
                        }
                        _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 279);
if (options.remove || options['delete']) {
                            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 280);
instance.sync('delete', options, function (err) {
                                _yuitest_coverfunc("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", "(anonymous 12)", 280);
_yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 281);
if (err) {
                                    _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 282);
var facade = {
                                        error   : err,
                                        src     : 'destroy',
                                        options : options
                                    };
                                    _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 287);
instance.fire(EVT_ERROR, facade);
                                    _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 288);
reject(new Error(err));
                                }
                                else {
                                    _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 291);
finish();
                                    _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 292);
resolve(options);
                                }
                            });
                        } else {
                            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 296);
finish();
                            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 297);
resolve(options);
                        }
                    });
                });
            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 301);
Y.Model.superclass.destroy.call(instance);
            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 302);
return destroypromise;
        }

    }, true);
    _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 306);
Y.ITSAModelSyncPromise = ITSAModelSyncPromise;
    _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 307);
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
    _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 332);
function ITSAModellistSyncPromise() {}
    _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 333);
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
         * @return {Y.Promise} promised response --> resolve(response, options) OR reject(reason).
        **/
        loadPromise: function (options) {
            _yuitest_coverfunc("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", "loadPromise", 352);
_yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 353);
options = options || {};
            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 354);
var instance = this,
                loadpromise = new Y.Promise(function (resolve, reject) {
                    _yuitest_coverfunc("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", "(anonymous 13)", 355);
_yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 356);
instance.sync('read', options, function (err, response) {
                        _yuitest_coverfunc("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", "(anonymous 14)", 356);
_yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 357);
var parsed,
                            facade = {
                                options : options,
                                response: response
                            };
                        _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 362);
if (err) {
                            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 363);
facade.error = err;
                            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 364);
facade.src   = 'load';
                            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 365);
instance.fire(EVT_ERROR, facade);
                            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 366);
reject(new Error(err));
                        }
                        else {
                            // Lazy publish.
                            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 370);
if (!instance._loadEvent) {
                                _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 371);
instance._loadEvent = instance.publish(EVT_LOAD, {
                                    preventable: false
                                });
                            }
                            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 375);
parsed = facade.parsed = PARSED(response);
                            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 376);
instance.reset(parsed, options);
                            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 377);
instance.fire(EVT_LOAD, facade);
                            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 378);
resolve(response, options);
                        }
                    });
                });
            _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 382);
return loadpromise;
        }
    }, true);
    _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 385);
Y.ITSAModellistSyncPromise = ITSAModellistSyncPromise;
    _yuitest_coverline("build/gallery-itsamodelsyncpromise/gallery-itsamodelsyncpromise.js", 386);
Y.Base.mix(Y.ModelList, [ITSAModellistSyncPromise]);

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
