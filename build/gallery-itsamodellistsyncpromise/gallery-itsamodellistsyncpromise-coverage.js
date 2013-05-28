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
_yuitest_coverage["build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js",
    code: []
};
_yuitest_coverage["build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js"].code=["YUI.add('gallery-itsamodellistsyncpromise', function (Y, NAME) {","","'use strict';","","/**"," *"," * Extention ITSAModellistSyncPromise"," *"," *"," * Extends Y.ModelList with Promised sync-methods. The ModelList's synclayer can be made just as usual, defining the 'read' method."," * But instead of calling ModelList.load you can use:"," *"," * <b>ModelList.loadPromise</b>"," *"," * <b>ModelList's sync-layer MUST call the callback-function of its 'read' promise-method, otherwise loadPromise is not resolved.</b>"," *"," *"," * Also, there are 3 extra Promises, which -in this current version- <b>all depends</b> on the Model's synclayer, not ModelLists synclayer:",""," * <b>ModelList.destroyPromise</b>"," * <b>ModelList.savePromise</b>"," * <b>ModelList.submitPromise</b>"," *"," * <b>Model's sync-layer MUST call the callback-function of its related promises-method,"," * otherwise destroyPromise, savePromise and submitPromise are not resolved.</b>"," *"," * @module gallery-itsamodelsyncpromise"," * @extends ModelList"," * @class ITSAModellistSyncPromise"," * @constructor"," * @since 0.1"," *"," * <i>Copyright (c) 2013 Marco Asbreuk - http://itsasbreuk.nl</i>"," * YUI BSD License - http://developer.yahoo.com/yui/license.html"," *","*/","","   /**","     * Fired when an error occurs, such as when an attribute (or property) doesn't validate or when","     * the sync layer submit-function returns an error.","     * @event error","     * @param e {EventFacade} Event Facade including:","     * @param e.error {any} Error message.","     * @param e.src {String} Source of the error. May be one of the following (or any","     *                     custom error source defined by a Model subclass):","     *","     * `submit`: An error submitting the model from within a sync layer.","     *","     * `attributevalidation`: An error validating an attribute (or property). The attribute (or objectproperty)","     *                        that failed validation will be provided as the `attribute` property on the event facade.","     *","     * @param e.attribute {String} The attribute/property that failed validation.","     * @param e.validationerror {String} The errormessage in case of attribute-validation error.","    **/","    var EVT_ERROR = 'error',","","    /**","     * Fired after all changed models of the modellist is saved through the Model-sync layer.","     * @event submit","     * @param e {EventFacade} Event Facade including:","     * @param [e.options] {Object} The options=object that was passed to the sync-layer, if there was one.","     * @param [e.parsed] {Object} The parsed version of the sync layer's response to the submit-request, if there was a response.","     * @param [e.response] {any} The sync layer's raw, unparsed response to the submit-request, if there was one.","     * @since 0.1","    **/","    EVT_SAVE = 'save',","","   /**","     * Fired after models are submitted through the Model-sync layer.","     * @event submit","     * @param e {EventFacade} Event Facade including:","     * @param [e.options] {Object} The options=object that was passed to the sync-layer, if there was one.","     * @param [e.parsed] {Object} The parsed version of the sync layer's response to the submit-request, if there was a response.","     * @param [e.response] {any} The sync layer's raw, unparsed response to the submit-request, if there was one.","     * @since 0.1","    **/","    EVT_SUBMIT = 'submit',","","   /**","     * Fired after models are read from the ModelList-sync layer.","     * @event load","     * @param e {EventFacade} Event Facade including:","     * @param [e.options] {Object} The options=object that was passed to the sync-layer, if there was one.","     * @param [e.response] {any} The sync layer's raw, unparsed response to the submit-request, if there was one.","     * @since 0.1","    **/","    EVT_LOAD = 'load',","","   /**","     * Fired after models are destroyed from the ModelList-sync layer.","     * @event destroy","     * @param e {EventFacade} Event Facade including:","     * @param [e.options] {Object} The options=object that was passed to the sync-layer, if there was one.","     * @param [e.response] {any} The sync layer's raw, unparsed response to the submit-request, if there was one.","     * @since 0.1","    **/","    EVT_DESTROY = 'destroy',","","    PARSED = function(value) {","        var parsed;","        try {","            parsed = Y.JSON.parse(value);","        } catch (ex) {}","        return parsed;","    };","","// -- Mixing extra Methods to Y.ModelList -----------------------------------","","    function ITSAModellistSyncPromise() {}","    Y.mix(ITSAModellistSyncPromise.prototype, {","","       /**","        * Destroys all models within this modellist.","        * <b>Caution:</b> The current version uses the Model's synclayer, NOT ModelList's synclayer.","        *","        * This method delegates to the Model's`sync()` method to perform the actual destroy","        * operation, which is an asynchronous action. Within the Y.Model-class, specify a _callback_ function to","        * be notified of success or failure.","        *","        * A successful destroy operation will fire a `destroy` event, while an unsuccessful","        * save operation will fire an `error` event with the `src` value \"destroy\".","        *","        * @method destroyPromise","         * @param {Object} [options] Options to be passed to all Model's`sync()`. It's up to the custom sync","         *                 implementation to determine what options it supports or requires, if any.","         * @return {Y.Promise} promised response --> resolve(response, options) OR reject(reason).","        **/","        destroyPromise: function(options) {","            var instance = this,","                  destroylist = [];","","            instance.each(","                function(model) {","                    destroylist.push(model.destroyPromise(options));","                }","            );","            return Y.batch.apply(Y, destroylist).then(","//            return Y.Promise.every(destroylist).then(","                function(data) {","                    var facade = {","                        options : options,","                        src : 'destroy'","                    };","                    instance.fire(EVT_DESTROY, facade);","                    return data;","                },","                function(err) {","                    var facade = {","                        options : options,","                        src : 'destroy',","                        error: err","                    };","                    instance.fire(EVT_ERROR, facade);","                    return err;","                }","            );","        },","","        /**","         * Loads models from the server and adds them into the ModelList","         *","         * This method delegates to the `sync()` method to perform the actual load","         * operation, which is an asynchronous action. Specify a _callback_ function to","         * be notified of success or failure.","         *","         * A successful load operation will fire a `load` event, while an unsuccessful","         * load operation will fire an `error` event with the `src` value \"load\".","         *","         * If the load operation succeeds and one or more of the loaded attributes","         * differ from this model's current attributes, a `change` event will be fired for every Model.","         *","         * @method loadPromise","         * @param {Object} [options] Options to be passed to `sync()`. It's up to the custom sync","         *                 implementation to determine what options it supports or requires, if any.","         * @return {Y.Promise} promised response --> resolve(response, options) OR reject(reason).","        **/","        loadPromise: function (options) {","            var instance = this;","","            options = options || {};","            return new Y.Promise(function (resolve, reject) {","                instance.sync('read', options, function (err, response) {","                    var parsed,","                        facade = {","                            options : options,","                            response: response","                        };","                    if (err) {","                        facade.error = err;","                        facade.src   = 'load';","                        instance.fire(EVT_ERROR, facade);","                        reject(new Error(err));","                    }","                    else {","                        // Lazy publish.","                        if (!instance._loadEvent) {","                            instance._loadEvent = instance.publish(EVT_LOAD, {","                                preventable: false","                            });","                        }","                        parsed = facade.parsed = PARSED(response);","                        instance.reset(parsed, options);","                        instance.fire(EVT_LOAD, facade);","                        resolve(response, options);","                    }","                });","            });","        },","","       /**","        * Saves all modified models within this modellist to the server.","        * <b>Caution:</b> within the current version the Model's synclayer is used, NOT ModelList's synclayer.","        * Therefore, you get multiple requests for all modified Models.","        *","        * This method delegates to the Model's`sync()` method to perform the actual save","        * operation, which is an asynchronous action. Within the Y.Model-class, specify a _callback_ function to","        * be notified of success or failure.","        *","        * A successful save operation will fire a `save` event, while an unsuccessful","        * save operation will fire an `error` event with the `src` value \"save\".","        *","        * If the save operation succeeds and one or more of the attributes returned in","        * the server's response differ from this model's current attributes, a","        * `change` event will be fired.","        *","        * @method savePromise","         * @param {Object} [options] Options to be passed to all Model's`sync()`. It's up to the custom sync","         *                 implementation to determine what options it supports or requires, if any.","         * @return {Y.Promise} promised response --> resolve(response, options) OR reject(reason).","        **/","        savePromise: function(options) {","            var instance = this,","                  savelist = [];","","            instance.each(","                function(model) {","                    if (model.isModified()) {","                        savelist.push(model.savePromise(options));","                    }","                }","            );","            return Y.batch.apply(Y, savelist).then(","//            return Y.Promise.every(savelist).then(","                function(data) {","                    var facade = {","                        options : options,","                        src : 'save'","                    };","                    instance.fire(EVT_SAVE, facade);","                    return data;","                },","                function(err) {","                    var facade = {","                        options : options,","                        src : 'save',","                        error: err","                    };","                    instance.fire(EVT_ERROR, facade);","                    return err;","                }","            );","        },","","       /**","        * Submits all models within this modellist to the server.","        * <b>Caution:</b> within the current version the Model's synclayer is used, NOT ModelList's synclayer.","        * Therefore, you get multiple requests for all Models.","        *","        * This method delegates to the Model's`sync()` method to perform the actual submit","        * operation, which is an asynchronous action. Within the Y.Model-class, specify a _callback_ function to","        * be notified of success or failure.","        *","        * A successful save operation will fire a `submit` event, while an unsuccessful","        * save operation will fire an `error` event with the `src` value \"submit\".","        *","        * @method submitPromise","         * @param {Object} [options] Options to be passed to all Model's`sync()`. It's up to the custom sync","         *                 implementation to determine what options it supports or requires, if any.","         * @return {Y.Promise} promised response --> resolve(response, options) OR reject(reason).","        **/","        submitPromise: function(options) {","            var instance = this,","                  submitlist = [];","","            instance.each(","                function(model) {","                    submitlist.push(model.submitPromise(options));","                }","            );","            return Y.batch.apply(Y, submitlist).then(","//            return Y.Promise.every(submitlist).then(","                function(data) {","                    var facade = {","                        options : options,","                        src : 'submit'","                    };","                    instance.fire(EVT_SUBMIT, facade);","                    return data;","                },","                function(err) {","                    var facade = {","                        options : options,","                        src : 'submit',","                        error: err","                    };","                    instance.fire(EVT_ERROR, facade);","                    return err;","                }","            );","        }","","    }, true);","","    Y.ITSAModellistSyncPromise = ITSAModellistSyncPromise;","","    Y.Base.mix(Y.ModelList, [ITSAModellistSyncPromise]);","","}, '@VERSION@', {","    \"requires\": [","        \"yui-base\",","        \"base-base\",","        \"base-build\",","        \"node-base\",","        \"json-parse\",","        \"promise\",","        \"model\",","        \"model-list\",","        \"gallery-itsamodelsyncpromise\"","    ]","});"];
_yuitest_coverage["build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js"].lines = {"1":0,"3":0,"55":0,"100":0,"101":0,"102":0,"104":0,"109":0,"110":0,"129":0,"132":0,"134":0,"137":0,"140":0,"144":0,"145":0,"148":0,"153":0,"154":0,"178":0,"180":0,"181":0,"182":0,"183":0,"188":0,"189":0,"190":0,"191":0,"192":0,"196":0,"197":0,"201":0,"202":0,"203":0,"204":0,"232":0,"235":0,"237":0,"238":0,"242":0,"245":0,"249":0,"250":0,"253":0,"258":0,"259":0,"282":0,"285":0,"287":0,"290":0,"293":0,"297":0,"298":0,"301":0,"306":0,"307":0,"314":0,"316":0};
_yuitest_coverage["build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js"].functions = {"PARSED:99":0,"ITSAModellistSyncPromise:109":0,"(anonymous 2):133":0,"(anonymous 3):139":0,"(anonymous 4):147":0,"destroyPromise:128":0,"(anonymous 6):182":0,"(anonymous 5):181":0,"loadPromise:177":0,"(anonymous 7):236":0,"(anonymous 8):244":0,"(anonymous 9):252":0,"savePromise:231":0,"(anonymous 10):286":0,"(anonymous 11):292":0,"(anonymous 12):300":0,"submitPromise:281":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js"].coveredLines = 58;
_yuitest_coverage["build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js"].coveredFunctions = 18;
_yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 1);
YUI.add('gallery-itsamodellistsyncpromise', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 3);
'use strict';

/**
 *
 * Extention ITSAModellistSyncPromise
 *
 *
 * Extends Y.ModelList with Promised sync-methods. The ModelList's synclayer can be made just as usual, defining the 'read' method.
 * But instead of calling ModelList.load you can use:
 *
 * <b>ModelList.loadPromise</b>
 *
 * <b>ModelList's sync-layer MUST call the callback-function of its 'read' promise-method, otherwise loadPromise is not resolved.</b>
 *
 *
 * Also, there are 3 extra Promises, which -in this current version- <b>all depends</b> on the Model's synclayer, not ModelLists synclayer:

 * <b>ModelList.destroyPromise</b>
 * <b>ModelList.savePromise</b>
 * <b>ModelList.submitPromise</b>
 *
 * <b>Model's sync-layer MUST call the callback-function of its related promises-method,
 * otherwise destroyPromise, savePromise and submitPromise are not resolved.</b>
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
    _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 55);
var EVT_ERROR = 'error',

    /**
     * Fired after all changed models of the modellist is saved through the Model-sync layer.
     * @event submit
     * @param e {EventFacade} Event Facade including:
     * @param [e.options] {Object} The options=object that was passed to the sync-layer, if there was one.
     * @param [e.parsed] {Object} The parsed version of the sync layer's response to the submit-request, if there was a response.
     * @param [e.response] {any} The sync layer's raw, unparsed response to the submit-request, if there was one.
     * @since 0.1
    **/
    EVT_SAVE = 'save',

   /**
     * Fired after models are submitted through the Model-sync layer.
     * @event submit
     * @param e {EventFacade} Event Facade including:
     * @param [e.options] {Object} The options=object that was passed to the sync-layer, if there was one.
     * @param [e.parsed] {Object} The parsed version of the sync layer's response to the submit-request, if there was a response.
     * @param [e.response] {any} The sync layer's raw, unparsed response to the submit-request, if there was one.
     * @since 0.1
    **/
    EVT_SUBMIT = 'submit',

   /**
     * Fired after models are read from the ModelList-sync layer.
     * @event load
     * @param e {EventFacade} Event Facade including:
     * @param [e.options] {Object} The options=object that was passed to the sync-layer, if there was one.
     * @param [e.response] {any} The sync layer's raw, unparsed response to the submit-request, if there was one.
     * @since 0.1
    **/
    EVT_LOAD = 'load',

   /**
     * Fired after models are destroyed from the ModelList-sync layer.
     * @event destroy
     * @param e {EventFacade} Event Facade including:
     * @param [e.options] {Object} The options=object that was passed to the sync-layer, if there was one.
     * @param [e.response] {any} The sync layer's raw, unparsed response to the submit-request, if there was one.
     * @since 0.1
    **/
    EVT_DESTROY = 'destroy',

    PARSED = function(value) {
        _yuitest_coverfunc("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", "PARSED", 99);
_yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 100);
var parsed;
        _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 101);
try {
            _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 102);
parsed = Y.JSON.parse(value);
        } catch (ex) {}
        _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 104);
return parsed;
    };

// -- Mixing extra Methods to Y.ModelList -----------------------------------

    _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 109);
function ITSAModellistSyncPromise() {}
    _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 110);
Y.mix(ITSAModellistSyncPromise.prototype, {

       /**
        * Destroys all models within this modellist.
        * <b>Caution:</b> The current version uses the Model's synclayer, NOT ModelList's synclayer.
        *
        * This method delegates to the Model's`sync()` method to perform the actual destroy
        * operation, which is an asynchronous action. Within the Y.Model-class, specify a _callback_ function to
        * be notified of success or failure.
        *
        * A successful destroy operation will fire a `destroy` event, while an unsuccessful
        * save operation will fire an `error` event with the `src` value "destroy".
        *
        * @method destroyPromise
         * @param {Object} [options] Options to be passed to all Model's`sync()`. It's up to the custom sync
         *                 implementation to determine what options it supports or requires, if any.
         * @return {Y.Promise} promised response --> resolve(response, options) OR reject(reason).
        **/
        destroyPromise: function(options) {
            _yuitest_coverfunc("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", "destroyPromise", 128);
_yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 129);
var instance = this,
                  destroylist = [];

            _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 132);
instance.each(
                function(model) {
                    _yuitest_coverfunc("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", "(anonymous 2)", 133);
_yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 134);
destroylist.push(model.destroyPromise(options));
                }
            );
            _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 137);
return Y.batch.apply(Y, destroylist).then(
//            return Y.Promise.every(destroylist).then(
                function(data) {
                    _yuitest_coverfunc("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", "(anonymous 3)", 139);
_yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 140);
var facade = {
                        options : options,
                        src : 'destroy'
                    };
                    _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 144);
instance.fire(EVT_DESTROY, facade);
                    _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 145);
return data;
                },
                function(err) {
                    _yuitest_coverfunc("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", "(anonymous 4)", 147);
_yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 148);
var facade = {
                        options : options,
                        src : 'destroy',
                        error: err
                    };
                    _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 153);
instance.fire(EVT_ERROR, facade);
                    _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 154);
return err;
                }
            );
        },

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
         * differ from this model's current attributes, a `change` event will be fired for every Model.
         *
         * @method loadPromise
         * @param {Object} [options] Options to be passed to `sync()`. It's up to the custom sync
         *                 implementation to determine what options it supports or requires, if any.
         * @return {Y.Promise} promised response --> resolve(response, options) OR reject(reason).
        **/
        loadPromise: function (options) {
            _yuitest_coverfunc("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", "loadPromise", 177);
_yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 178);
var instance = this;

            _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 180);
options = options || {};
            _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 181);
return new Y.Promise(function (resolve, reject) {
                _yuitest_coverfunc("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", "(anonymous 5)", 181);
_yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 182);
instance.sync('read', options, function (err, response) {
                    _yuitest_coverfunc("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", "(anonymous 6)", 182);
_yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 183);
var parsed,
                        facade = {
                            options : options,
                            response: response
                        };
                    _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 188);
if (err) {
                        _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 189);
facade.error = err;
                        _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 190);
facade.src   = 'load';
                        _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 191);
instance.fire(EVT_ERROR, facade);
                        _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 192);
reject(new Error(err));
                    }
                    else {
                        // Lazy publish.
                        _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 196);
if (!instance._loadEvent) {
                            _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 197);
instance._loadEvent = instance.publish(EVT_LOAD, {
                                preventable: false
                            });
                        }
                        _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 201);
parsed = facade.parsed = PARSED(response);
                        _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 202);
instance.reset(parsed, options);
                        _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 203);
instance.fire(EVT_LOAD, facade);
                        _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 204);
resolve(response, options);
                    }
                });
            });
        },

       /**
        * Saves all modified models within this modellist to the server.
        * <b>Caution:</b> within the current version the Model's synclayer is used, NOT ModelList's synclayer.
        * Therefore, you get multiple requests for all modified Models.
        *
        * This method delegates to the Model's`sync()` method to perform the actual save
        * operation, which is an asynchronous action. Within the Y.Model-class, specify a _callback_ function to
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
         * @param {Object} [options] Options to be passed to all Model's`sync()`. It's up to the custom sync
         *                 implementation to determine what options it supports or requires, if any.
         * @return {Y.Promise} promised response --> resolve(response, options) OR reject(reason).
        **/
        savePromise: function(options) {
            _yuitest_coverfunc("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", "savePromise", 231);
_yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 232);
var instance = this,
                  savelist = [];

            _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 235);
instance.each(
                function(model) {
                    _yuitest_coverfunc("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", "(anonymous 7)", 236);
_yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 237);
if (model.isModified()) {
                        _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 238);
savelist.push(model.savePromise(options));
                    }
                }
            );
            _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 242);
return Y.batch.apply(Y, savelist).then(
//            return Y.Promise.every(savelist).then(
                function(data) {
                    _yuitest_coverfunc("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", "(anonymous 8)", 244);
_yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 245);
var facade = {
                        options : options,
                        src : 'save'
                    };
                    _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 249);
instance.fire(EVT_SAVE, facade);
                    _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 250);
return data;
                },
                function(err) {
                    _yuitest_coverfunc("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", "(anonymous 9)", 252);
_yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 253);
var facade = {
                        options : options,
                        src : 'save',
                        error: err
                    };
                    _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 258);
instance.fire(EVT_ERROR, facade);
                    _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 259);
return err;
                }
            );
        },

       /**
        * Submits all models within this modellist to the server.
        * <b>Caution:</b> within the current version the Model's synclayer is used, NOT ModelList's synclayer.
        * Therefore, you get multiple requests for all Models.
        *
        * This method delegates to the Model's`sync()` method to perform the actual submit
        * operation, which is an asynchronous action. Within the Y.Model-class, specify a _callback_ function to
        * be notified of success or failure.
        *
        * A successful save operation will fire a `submit` event, while an unsuccessful
        * save operation will fire an `error` event with the `src` value "submit".
        *
        * @method submitPromise
         * @param {Object} [options] Options to be passed to all Model's`sync()`. It's up to the custom sync
         *                 implementation to determine what options it supports or requires, if any.
         * @return {Y.Promise} promised response --> resolve(response, options) OR reject(reason).
        **/
        submitPromise: function(options) {
            _yuitest_coverfunc("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", "submitPromise", 281);
_yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 282);
var instance = this,
                  submitlist = [];

            _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 285);
instance.each(
                function(model) {
                    _yuitest_coverfunc("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", "(anonymous 10)", 286);
_yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 287);
submitlist.push(model.submitPromise(options));
                }
            );
            _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 290);
return Y.batch.apply(Y, submitlist).then(
//            return Y.Promise.every(submitlist).then(
                function(data) {
                    _yuitest_coverfunc("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", "(anonymous 11)", 292);
_yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 293);
var facade = {
                        options : options,
                        src : 'submit'
                    };
                    _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 297);
instance.fire(EVT_SUBMIT, facade);
                    _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 298);
return data;
                },
                function(err) {
                    _yuitest_coverfunc("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", "(anonymous 12)", 300);
_yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 301);
var facade = {
                        options : options,
                        src : 'submit',
                        error: err
                    };
                    _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 306);
instance.fire(EVT_ERROR, facade);
                    _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 307);
return err;
                }
            );
        }

    }, true);

    _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 314);
Y.ITSAModellistSyncPromise = ITSAModellistSyncPromise;

    _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 316);
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
        "gallery-itsamodelsyncpromise"
    ]
});
