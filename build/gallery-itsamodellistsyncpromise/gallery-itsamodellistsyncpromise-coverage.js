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
_yuitest_coverage["build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js"].code=["YUI.add('gallery-itsamodellistsyncpromise', function (Y, NAME) {","","'use strict';","","/**"," *"," * Extention ITSAModellistSyncPromise"," *"," *"," * Extends Y.ModelList with Promised sync-methods. The ModelList's synclayer can be made just as usual, defining these actions:"," * <br /><br />"," * 'create'"," * 'destroy'"," * 'read'"," * 'readappend'"," * 'save'"," * 'submit'"," * 'update'"," * <br /><br />"," * Instead of calling ModelList.load() you should use:"," * <br />"," * <b>ModelList.loadPromise(options)</b> --> to append the read-models --> options = {append: true};"," * <br /><br />"," * Also, there are 3 extra Promises, which -in this current version- <b>all depends</b> on the Model's synclayer, not ModelLists synclayer:"," * <br />"," * <b>ModelList.destroyPromise()</b><br />"," * <b>ModelList.savePromise()</b><br />"," * <b>ModelList.submitPromise()</b>"," *"," * @module gallery-itsamodelsyncpromise"," * @class Y.ModelList"," * @constructor"," * @since 0.1"," *"," * <i>Copyright (c) 2013 Marco Asbreuk - http://itsasbreuk.nl</i>"," * YUI BSD License - http://developer.yahoo.com/yui/license.html"," *","*/","","   /**","     * Fired when an error occurs, such as when an attribute (or property) doesn't validate or when","     * the sync layer submit-function returns an error.","     * @event error","     * @param e {EventFacade} Event Facade including:","     * @param e.error {any} Error message.","     * @param e.src {String} Source of the error. May be one of the following (or any","     *                     custom error source defined by a Model subclass):","     *","     * `submit`: An error submitting the model from within a sync layer.","     *","     * `attributevalidation`: An error validating an attribute (or property). The attribute (or objectproperty)","     *                        that failed validation will be provided as the `attribute` property on the event facade.","     *","     * @param e.attribute {String} The attribute/property that failed validation.","     * @param e.validationerror {String} The errormessage in case of attribute-validation error.","    **/","    var EVT_ERROR = 'error',","","    /**","     * Fired after all changed models of the modellist is saved through the Model-sync layer.","     * @event save","     * @param e {EventFacade} Event Facade including:","     * @param [e.options] {Object} The options=object that was passed to the sync-layer, if there was one.","     * @param [e.parsed] {Object} The parsed version of the sync layer's response to the submit-request, if there was a response.","     * @param [e.response] {any} The sync layer's raw, unparsed response to the submit-request, if there was one.","     * @since 0.1","    **/","    EVT_SAVE = 'save',","","   /**","     * Fired after models are submitted through the Model-sync layer.","     * @event submit","     * @param e {EventFacade} Event Facade including:","     * @param [e.options] {Object} The options=object that was passed to the sync-layer, if there was one.","     * @param [e.parsed] {Object} The parsed version of the sync layer's response to the submit-request, if there was a response.","     * @param [e.response] {any} The sync layer's raw, unparsed response to the submit-request, if there was one.","     * @since 0.1","    **/","    EVT_SUBMIT = 'submit',","","   /**","     * Fired after models are appended to the ModelList by the ModelList-sync layer.","     * @event loadappend","     * @param e {EventFacade} Event Facade including:","     * @param [e.options] {Object} The options=object that was passed to the sync-layer, if there was one.","     * @param [e.response] {any} The sync layer's raw, unparsed response to the submit-request, if there was one.","     * @since 0.1","    **/","    EVT_LOADAPPEND = 'loadappend',","","   /**","     * Fired after models are read from the ModelList-sync layer.","     * @event load","     * @param e {EventFacade} Event Facade including:","     * @param [e.options] {Object} The options=object that was passed to the sync-layer, if there was one.","     * @param [e.response] {any} The sync layer's raw, unparsed response to the submit-request, if there was one.","     * @since 0.1","    **/","    EVT_LOAD = 'load',","","   /**","     * Fired after models are destroyed from the ModelList-sync layer.","     * @event destroy","     * @param e {EventFacade} Event Facade including:","     * @param [e.options] {Object} The options=object that was passed to the sync-layer, if there was one.","     * @param [e.response] {any} The sync layer's raw, unparsed response to the submit-request, if there was one.","     * @since 0.1","    **/","    EVT_DESTROY = 'destroy',","","    PARSED = function(value) {","        var parsed;","        try {","            parsed = Y.JSON.parse(value);","        } catch (ex) {}","        return parsed;","    };","","// -- Mixing extra Methods to Y.ModelList -----------------------------------","","    function ITSAModellistSyncPromise() {}","    Y.mix(ITSAModellistSyncPromise.prototype, {","","       /**","        * Destroys all models within this modellist.","        * <b>Caution:</b> The current version uses the Model's synclayer, NOT ModelList's synclayer.","        *","        * This method delegates to the Model's`sync()` method to perform the actual destroy","        * operation, which is an asynchronous action. Within the Y.Model-class, you <b>must</b> specify a _callback_ function to","         * make the promise work.","        *","        * A successful destroy operation will fire a `destroy` event, while an unsuccessful","        * save operation will fire an `error` event with the `src` value \"destroy\".","        *","        * @method destroyPromise","         * @param {Object} [options] Options to be passed to all Model's`sync()`. It's up to the custom sync","         *                 implementation to determine what options it supports or requires, if any.","         * @return {Y.Promise} promised response --> resolve(response, options) OR reject(reason).","        **/","        destroyPromise: function(options) {","            var instance = this,","                  destroylist = [];","","            instance.each(","                function(model) {","                    destroylist.push(model.destroyPromise(options));","                }","            );","            return Y.batch.apply(Y, destroylist).then(","//            return Y.Promise.every(destroylist).then(","                function(data) {","                    var facade = {","                        options : options,","                        src : 'destroy'","                    };","                    // Lazy publish.","                    if (!instance._destroyEvent) {","                        instance._destroyEvent = instance.publish(EVT_DESTROY, {","                            preventable: false","                        });","                    }","                    instance.fire(EVT_DESTROY, facade);","                    return data;","                },","                function(err) {","                    var facade = {","                        options : options,","                        src : 'Modellist.destroyPromise()',","                        error: err","                    };","                    instance._lazyFireErrorEvent(facade);","                    return err;","                }","            );","        },","","        /**","         * Loads models from the server and adds them into the ModelList. <br />","         * Without options, previous items will be replaced. Use loadPromise({append: true}) to append the items.<br /><br />","         *","         * This method delegates to the `sync()` method, by either using the 'read' or 'readappend' action, depending","         * on the value of parameter options.append.","         * This is an asynchronous action. You <b>must</b> specify a _callback_ function to","         * make the promise work.","         *","         * A successful load operation will fire a `load` event, while an unsuccessful","         * load operation will fire an `error` event with the `src` value \"load\".","         *","         * If the load operation succeeds and one or more of the loaded attributes","         * differ from this model's current attributes, a `change` event will be fired for every Model.","         *","         * @method loadPromise","         * @param {Object} [options] Options to be passed to `sync()`. The custom sync","         *                 implementation can determine what options it supports or requires, if any.","         * @param {Boolean} [options.append] Set true if you want to append items.","         * @return {Y.Promise} promised response --> resolve(response, options) OR reject(reason).","        **/","        loadPromise: function (options) {","            var instance = this,","                 optionsappend, append, eventname;","","            options = options || {};","            optionsappend = options.append;","            append = ((typeof optionsappend === 'boolean') && optionsappend);","            eventname = append ? EVT_LOADAPPEND : EVT_LOAD;","            return new Y.Promise(function (resolve, reject) {","                var errFunc, successFunc,","                    syncmethod = append ? 'readappend' : 'read',","                      facade = {","                          options : options","                      };","                errFunc = function(err) {","                    facade.error = err;","                    facade.src   = 'Modellist.loadPromise() - load' + (append ? 'append' : '');","                    instance._lazyFireErrorEvent(facade);","                    reject(new Error(err));","                };","                successFunc = function(response) {","                    var parsed;","                    // Lazy publish.","                    if (!instance['_'+eventname]) {","                        instance['_'+eventname] = instance.publish(eventname, {","                            preventable: false","                        });","                    }","                    facade.response = response;","                    parsed = facade.parsed = PARSED(response);","                    if (append) {","                        instance.add(parsed, options);","                    }","                    else {","                        instance.reset(parsed, options);","                    }","                    instance.fire(eventname, facade);","                    resolve(response, options);","                };","                if (instance.syncPromise) {","                    // use the syncPromise-layer","                    instance.syncPromise(syncmethod, options).then(","                        successFunc,","                        errFunc","                    );","                }","                else {","                    instance.sync(syncmethod, options, function (err, response) {","                        if (err) {","                            errFunc(err);","                        }","                        else {","                            successFunc(response);","                        }","                    });","                }","            });","        },","","       /**","        * Saves all modified models within this modellist to the server.","        * <b>Caution:</b> within the current version the Model's synclayer is used, NOT ModelList's synclayer.","        * Therefore, you get multiple requests for all modified Models.","        *","        * This method delegates to the Model's`sync()` method to perform the actual save","        * operation, which is an asynchronous action. Within the Y.Model-class, you <b>must</b> specify a _callback_ function to","         * make the promise work.","        *","        * A successful save operation will fire a `save` event, while an unsuccessful","        * save operation will fire an `error` event with the `src` value \"save\".","        *","        * If the save operation succeeds and one or more of the attributes returned in","        * the server's response differ from this model's current attributes, a","        * `change` event will be fired.","        *","        * @method savePromise","         * @param {Object} [options] Options to be passed to all Model's`sync()`. It's up to the custom sync","         *                 implementation to determine what options it supports or requires, if any.","         * @return {Y.Promise} promised response --> resolve(response, options) OR reject(reason).","        **/","        savePromise: function(options) {","            var instance = this,","                  savelist = [];","","            instance.each(","                function(model) {","                    if (model.isModified()) {","                        savelist.push(model.savePromise(options));","                    }","                }","            );","            return Y.batch.apply(Y, savelist).then(","//            return Y.Promise.every(savelist).then(","                function(data) {","                    var facade = {","                        options : options,","                        src : 'save'","                    };","                    // Lazy publish.","                    if (!instance._saveEvent) {","                        instance._saveEvent = instance.publish(EVT_SAVE, {","                            preventable: false","                        });","                    }","                    instance.fire(EVT_SAVE, facade);","                    return data;","                },","                function(err) {","                    var facade = {","                        options : options,","                        src : 'Modellist.savePromise()',","                        error: err","                    };","                    instance._lazyFireErrorEvent(facade);","                    return err;","                }","            );","        },","","       /**","        * Submits all models within this modellist to the server.","        * <b>Caution:</b> within the current version the Model's synclayer is used, NOT ModelList's synclayer.","        * Therefore, you get multiple requests for all Models.","        *","        * This method delegates to the Model's`sync()` method to perform the actual submit","        * operation, which is an asynchronous action. Within the Y.Model-class, you <b>must</b> specify a _callback_ function to","         * make the promise work.","        *","        * A successful save operation will fire a `submit` event, while an unsuccessful","        * save operation will fire an `error` event with the `src` value \"submit\".","        *","        * @method submitPromise","         * @param {Object} [options] Options to be passed to all Model's`sync()`. It's up to the custom sync","         *                 implementation to determine what options it supports or requires, if any.","         * @return {Y.Promise} promised response --> resolve(response, options) OR reject(reason).","        **/","        submitPromise: function(options) {","            var instance = this,","                  submitlist = [];","","            instance.each(","                function(model) {","                    submitlist.push(model.submitPromise(options));","                }","            );","            return Y.batch.apply(Y, submitlist).then(","//            return Y.Promise.every(submitlist).then(","                function(data) {","                    var facade = {","                        options : options,","                        src : 'submit'","                    };","                    // Lazy publish.","                    if (!instance._submitEvent) {","                        instance._submitEvent = instance.publish(EVT_SUBMIT, {","                            preventable: false","                        });","                    }","                    instance.fire(EVT_SUBMIT, facade);","                    return data;","                },","                function(err) {","                    var facade = {","                        options : options,","                        src : 'Modellist.submitPromise()',","                        error: err","                    };","                    instance._lazyFireErrorEvent(facade);","                    return err;","                }","            );","        },","","       /**","        * Fires the 'error'-event and -if not published yet- publish it broadcasted to Y.","        * Because the error-event is broadcasted to Y, it can be catched by gallery-itsaerrorreporter.","        *","        * @method _lazyFireErrorEvent","         * @param {Object} [facade] eventfacade.","         * @private","        **/","        _lazyFireErrorEvent : function(facade) {","            var instance = this;","","            // lazy publish","            if (!instance._errorEvent) {","                instance._errorEvent = instance.publish(EVT_ERROR, {","                    broadcast: 1","                });","            }","            instance.fire(EVT_ERROR, facade);","        }","","    }, true);","","    Y.ITSAModellistSyncPromise = ITSAModellistSyncPromise;","","    Y.Base.mix(Y.ModelList, [ITSAModellistSyncPromise]);","","}, '@VERSION@', {","    \"requires\": [","        \"yui-base\",","        \"base-base\",","        \"base-build\",","        \"node-base\",","        \"json-parse\",","        \"promise\",","        \"model\",","        \"model-list\",","        \"gallery-itsamodelsyncpromise\"","    ]","});"];
_yuitest_coverage["build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js"].lines = {"1":0,"3":0,"57":0,"112":0,"113":0,"114":0,"116":0,"121":0,"122":0,"141":0,"144":0,"146":0,"149":0,"152":0,"157":0,"158":0,"162":0,"163":0,"166":0,"171":0,"172":0,"199":0,"202":0,"203":0,"204":0,"205":0,"206":0,"207":0,"212":0,"213":0,"214":0,"215":0,"216":0,"218":0,"219":0,"221":0,"222":0,"226":0,"227":0,"228":0,"229":0,"232":0,"234":0,"235":0,"237":0,"239":0,"245":0,"246":0,"247":0,"250":0,"279":0,"282":0,"284":0,"285":0,"289":0,"292":0,"297":0,"298":0,"302":0,"303":0,"306":0,"311":0,"312":0,"335":0,"338":0,"340":0,"343":0,"346":0,"351":0,"352":0,"356":0,"357":0,"360":0,"365":0,"366":0,"380":0,"383":0,"384":0,"388":0,"393":0,"395":0};
_yuitest_coverage["build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js"].functions = {"PARSED:111":0,"ITSAModellistSyncPromise:121":0,"(anonymous 2):145":0,"(anonymous 3):151":0,"(anonymous 4):165":0,"destroyPromise:140":0,"errFunc:212":0,"successFunc:218":0,"(anonymous 6):245":0,"(anonymous 5):206":0,"loadPromise:198":0,"(anonymous 7):283":0,"(anonymous 8):291":0,"(anonymous 9):305":0,"savePromise:278":0,"(anonymous 10):339":0,"(anonymous 11):345":0,"(anonymous 12):359":0,"submitPromise:334":0,"_lazyFireErrorEvent:379":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js"].coveredLines = 81;
_yuitest_coverage["build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js"].coveredFunctions = 21;
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
    _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 57);
var EVT_ERROR = 'error',

    /**
     * Fired after all changed models of the modellist is saved through the Model-sync layer.
     * @event save
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
     * Fired after models are appended to the ModelList by the ModelList-sync layer.
     * @event loadappend
     * @param e {EventFacade} Event Facade including:
     * @param [e.options] {Object} The options=object that was passed to the sync-layer, if there was one.
     * @param [e.response] {any} The sync layer's raw, unparsed response to the submit-request, if there was one.
     * @since 0.1
    **/
    EVT_LOADAPPEND = 'loadappend',

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
        _yuitest_coverfunc("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", "PARSED", 111);
_yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 112);
var parsed;
        _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 113);
try {
            _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 114);
parsed = Y.JSON.parse(value);
        } catch (ex) {}
        _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 116);
return parsed;
    };

// -- Mixing extra Methods to Y.ModelList -----------------------------------

    _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 121);
function ITSAModellistSyncPromise() {}
    _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 122);
Y.mix(ITSAModellistSyncPromise.prototype, {

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
        * @method destroyPromise
         * @param {Object} [options] Options to be passed to all Model's`sync()`. It's up to the custom sync
         *                 implementation to determine what options it supports or requires, if any.
         * @return {Y.Promise} promised response --> resolve(response, options) OR reject(reason).
        **/
        destroyPromise: function(options) {
            _yuitest_coverfunc("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", "destroyPromise", 140);
_yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 141);
var instance = this,
                  destroylist = [];

            _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 144);
instance.each(
                function(model) {
                    _yuitest_coverfunc("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", "(anonymous 2)", 145);
_yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 146);
destroylist.push(model.destroyPromise(options));
                }
            );
            _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 149);
return Y.batch.apply(Y, destroylist).then(
//            return Y.Promise.every(destroylist).then(
                function(data) {
                    _yuitest_coverfunc("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", "(anonymous 3)", 151);
_yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 152);
var facade = {
                        options : options,
                        src : 'destroy'
                    };
                    // Lazy publish.
                    _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 157);
if (!instance._destroyEvent) {
                        _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 158);
instance._destroyEvent = instance.publish(EVT_DESTROY, {
                            preventable: false
                        });
                    }
                    _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 162);
instance.fire(EVT_DESTROY, facade);
                    _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 163);
return data;
                },
                function(err) {
                    _yuitest_coverfunc("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", "(anonymous 4)", 165);
_yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 166);
var facade = {
                        options : options,
                        src : 'Modellist.destroyPromise()',
                        error: err
                    };
                    _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 171);
instance._lazyFireErrorEvent(facade);
                    _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 172);
return err;
                }
            );
        },

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
         * @method loadPromise
         * @param {Object} [options] Options to be passed to `sync()`. The custom sync
         *                 implementation can determine what options it supports or requires, if any.
         * @param {Boolean} [options.append] Set true if you want to append items.
         * @return {Y.Promise} promised response --> resolve(response, options) OR reject(reason).
        **/
        loadPromise: function (options) {
            _yuitest_coverfunc("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", "loadPromise", 198);
_yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 199);
var instance = this,
                 optionsappend, append, eventname;

            _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 202);
options = options || {};
            _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 203);
optionsappend = options.append;
            _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 204);
append = ((typeof optionsappend === 'boolean') && optionsappend);
            _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 205);
eventname = append ? EVT_LOADAPPEND : EVT_LOAD;
            _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 206);
return new Y.Promise(function (resolve, reject) {
                _yuitest_coverfunc("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", "(anonymous 5)", 206);
_yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 207);
var errFunc, successFunc,
                    syncmethod = append ? 'readappend' : 'read',
                      facade = {
                          options : options
                      };
                _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 212);
errFunc = function(err) {
                    _yuitest_coverfunc("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", "errFunc", 212);
_yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 213);
facade.error = err;
                    _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 214);
facade.src   = 'Modellist.loadPromise() - load' + (append ? 'append' : '');
                    _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 215);
instance._lazyFireErrorEvent(facade);
                    _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 216);
reject(new Error(err));
                };
                _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 218);
successFunc = function(response) {
                    _yuitest_coverfunc("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", "successFunc", 218);
_yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 219);
var parsed;
                    // Lazy publish.
                    _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 221);
if (!instance['_'+eventname]) {
                        _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 222);
instance['_'+eventname] = instance.publish(eventname, {
                            preventable: false
                        });
                    }
                    _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 226);
facade.response = response;
                    _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 227);
parsed = facade.parsed = PARSED(response);
                    _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 228);
if (append) {
                        _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 229);
instance.add(parsed, options);
                    }
                    else {
                        _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 232);
instance.reset(parsed, options);
                    }
                    _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 234);
instance.fire(eventname, facade);
                    _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 235);
resolve(response, options);
                };
                _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 237);
if (instance.syncPromise) {
                    // use the syncPromise-layer
                    _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 239);
instance.syncPromise(syncmethod, options).then(
                        successFunc,
                        errFunc
                    );
                }
                else {
                    _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 245);
instance.sync(syncmethod, options, function (err, response) {
                        _yuitest_coverfunc("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", "(anonymous 6)", 245);
_yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 246);
if (err) {
                            _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 247);
errFunc(err);
                        }
                        else {
                            _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 250);
successFunc(response);
                        }
                    });
                }
            });
        },

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
        * @method savePromise
         * @param {Object} [options] Options to be passed to all Model's`sync()`. It's up to the custom sync
         *                 implementation to determine what options it supports or requires, if any.
         * @return {Y.Promise} promised response --> resolve(response, options) OR reject(reason).
        **/
        savePromise: function(options) {
            _yuitest_coverfunc("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", "savePromise", 278);
_yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 279);
var instance = this,
                  savelist = [];

            _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 282);
instance.each(
                function(model) {
                    _yuitest_coverfunc("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", "(anonymous 7)", 283);
_yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 284);
if (model.isModified()) {
                        _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 285);
savelist.push(model.savePromise(options));
                    }
                }
            );
            _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 289);
return Y.batch.apply(Y, savelist).then(
//            return Y.Promise.every(savelist).then(
                function(data) {
                    _yuitest_coverfunc("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", "(anonymous 8)", 291);
_yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 292);
var facade = {
                        options : options,
                        src : 'save'
                    };
                    // Lazy publish.
                    _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 297);
if (!instance._saveEvent) {
                        _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 298);
instance._saveEvent = instance.publish(EVT_SAVE, {
                            preventable: false
                        });
                    }
                    _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 302);
instance.fire(EVT_SAVE, facade);
                    _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 303);
return data;
                },
                function(err) {
                    _yuitest_coverfunc("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", "(anonymous 9)", 305);
_yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 306);
var facade = {
                        options : options,
                        src : 'Modellist.savePromise()',
                        error: err
                    };
                    _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 311);
instance._lazyFireErrorEvent(facade);
                    _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 312);
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
        * operation, which is an asynchronous action. Within the Y.Model-class, you <b>must</b> specify a _callback_ function to
         * make the promise work.
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
            _yuitest_coverfunc("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", "submitPromise", 334);
_yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 335);
var instance = this,
                  submitlist = [];

            _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 338);
instance.each(
                function(model) {
                    _yuitest_coverfunc("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", "(anonymous 10)", 339);
_yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 340);
submitlist.push(model.submitPromise(options));
                }
            );
            _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 343);
return Y.batch.apply(Y, submitlist).then(
//            return Y.Promise.every(submitlist).then(
                function(data) {
                    _yuitest_coverfunc("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", "(anonymous 11)", 345);
_yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 346);
var facade = {
                        options : options,
                        src : 'submit'
                    };
                    // Lazy publish.
                    _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 351);
if (!instance._submitEvent) {
                        _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 352);
instance._submitEvent = instance.publish(EVT_SUBMIT, {
                            preventable: false
                        });
                    }
                    _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 356);
instance.fire(EVT_SUBMIT, facade);
                    _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 357);
return data;
                },
                function(err) {
                    _yuitest_coverfunc("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", "(anonymous 12)", 359);
_yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 360);
var facade = {
                        options : options,
                        src : 'Modellist.submitPromise()',
                        error: err
                    };
                    _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 365);
instance._lazyFireErrorEvent(facade);
                    _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 366);
return err;
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
            _yuitest_coverfunc("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", "_lazyFireErrorEvent", 379);
_yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 380);
var instance = this;

            // lazy publish
            _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 383);
if (!instance._errorEvent) {
                _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 384);
instance._errorEvent = instance.publish(EVT_ERROR, {
                    broadcast: 1
                });
            }
            _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 388);
instance.fire(EVT_ERROR, facade);
        }

    }, true);

    _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 393);
Y.ITSAModellistSyncPromise = ITSAModellistSyncPromise;

    _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 395);
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
