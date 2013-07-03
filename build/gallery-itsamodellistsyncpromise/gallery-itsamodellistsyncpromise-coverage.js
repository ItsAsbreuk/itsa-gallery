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
_yuitest_coverage["build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js"].code=["YUI.add('gallery-itsamodellistsyncpromise', function (Y, NAME) {","","'use strict';","","/**"," *"," * Extention ITSAModellistSyncPromise"," *"," *"," * Extends Y.ModelList with Promised sync-methods. The ModelList's synclayer can be made just as usual, defining these actions:"," * <br /><br />"," * 'create'"," * 'destroy'"," * 'read'"," * 'readappend'"," * 'save'"," * 'submit'"," * 'update'"," * <br /><br />"," * Instead of calling ModelList.load() you should use:"," * <br />"," * <b>ModelList.loadPromise(options)</b> --> to append the read-models --> options = {append: true};"," * <br /><br />"," * Also, there are 3 extra Promises, which -in this current version- <b>all depends</b> on the Model's synclayer, not ModelLists synclayer:"," * <br />"," * <b>ModelList.destroyPromise()</b><br />"," * <b>ModelList.savePromise()</b><br />"," * <b>ModelList.submitPromise()</b>"," *"," * @module gallery-itsamodelsyncpromise"," * @class Y.ModelList"," * @constructor"," * @since 0.1"," *"," * <i>Copyright (c) 2013 Marco Asbreuk - http://itsasbreuk.nl</i>"," * YUI BSD License - http://developer.yahoo.com/yui/license.html"," *","*/","","   /**","     * Fired when an error occurs, such as when an attribute (or property) doesn't validate or when","     * the sync layer submit-function returns an error.","     * @event error","     * @param e {EventFacade} Event Facade including:","     * @param e.error {any} Error message.","     * @param e.src {String} Source of the error. May be one of the following (or any","     *                     custom error source defined by a Model subclass):","     *","     * `submit`: An error submitting the model from within a sync layer.","     *","     * `attributevalidation`: An error validating an attribute (or property). The attribute (or objectproperty)","     *                        that failed validation will be provided as the `attribute` property on the event facade.","     *","     * @param e.attribute {String} The attribute/property that failed validation.","     * @param e.validationerror {String} The errormessage in case of attribute-validation error.","    **/","    var EVT_ERROR = 'error',","","    /**","     * Fired after all changed models of the modellist is saved through the Model-sync layer.","     * @event save","     * @param e {EventFacade} Event Facade including:","     * @param [e.options] {Object} The options=object that was passed to the sync-layer, if there was one.","     * @param [e.parsed] {Object} The parsed version of the sync layer's response to the submit-request, if there was a response.","     * @param [e.response] {any} The sync layer's raw, unparsed response to the submit-request, if there was one.","     * @since 0.1","    **/","    EVT_SAVE = 'save',","","   /**","     * Fired after models are submitted through the Model-sync layer.","     * @event submit","     * @param e {EventFacade} Event Facade including:","     * @param [e.options] {Object} The options=object that was passed to the sync-layer, if there was one.","     * @param [e.parsed] {Object} The parsed version of the sync layer's response to the submit-request, if there was a response.","     * @param [e.response] {any} The sync layer's raw, unparsed response to the submit-request, if there was one.","     * @since 0.1","    **/","    EVT_SUBMIT = 'submit',","","   /**","     * Fired after models are appended to the ModelList by the ModelList-sync layer.","     * @event loadappend","     * @param e {EventFacade} Event Facade including:","     * @param [e.options] {Object} The options=object that was passed to the sync-layer, if there was one.","     * @param [e.response] {any} The sync layer's raw, unparsed response to the submit-request, if there was one.","     * @since 0.1","    **/","    EVT_LOADAPPEND = 'loadappend',","","   /**","     * Fired after models are read from the ModelList-sync layer.","     * @event load","     * @param e {EventFacade} Event Facade including:","     * @param [e.options] {Object} The options=object that was passed to the sync-layer, if there was one.","     * @param [e.response] {any} The sync layer's raw, unparsed response to the submit-request, if there was one.","     * @since 0.1","    **/","    EVT_LOAD = 'load',","","   /**","     * Fired after models are destroyed from the ModelList-sync layer.","     * @event destroy","     * @param e {EventFacade} Event Facade including:","     * @param [e.options] {Object} The options=object that was passed to the sync-layer, if there was one.","     * @param [e.response] {any} The sync layer's raw, unparsed response to the submit-request, if there was one.","     * @since 0.1","    **/","    EVT_DESTROY = 'destroy',","","    PARSED = function (response) {","        if (typeof response === 'string') {","            try {","                return Y.JSON.parse(response);","            } catch (ex) {","                this.fire(EVT_ERROR, {","                    error   : ex,","                    response: response,","                    src     : 'parse'","                });","                return null;","            }","        }","        return response;","    };","","// -- Mixing extra Methods to Y.ModelList -----------------------------------","","    function ITSAModellistSyncPromise() {}","    Y.mix(ITSAModellistSyncPromise.prototype, {","","       /**","         * This method can be defined in descendend classes.<br />","         * If syncPromise is defined, then the syncPromise() definition will be used instead of sync() definition.<br />","         * In case an invalid 'action' is defined, the promise will be rejected.","         *","         * @method syncPromise","         * @param action {String} The sync-action to perform.","         * @param [options] {Object} Sync options. The custom synclayer should pass through all options-properties to the server.","         * @return {Y.Promise} returned response for each 'action' --> response --> resolve(dataobject) OR reject(reason).","         * The returned 'dataobject' might be an object or a string that can be turned into a json-object","        */","","        /**","         * This method is used internally and returns syncPromise() that is called with 'action'.","         * If 'action' is not handled as a Promise -inside syncPromise- then this method will reject the promisi.","         *","         * @method _syncTimeoutPromise","         * @param action {String} The sync-action to perform.","         * @param [options] {Object} Sync options. The custom synclayer should pass through all options-properties to the server.","         * @return {Y.Promise} returned response for each 'action' --> response --> resolve(dataobject) OR reject(reason).","         * The returned 'dataobject' might be an object or a string that can be turned into a json-object","         * @private","         * @since 0.2","        */","        _syncTimeoutPromise : function(action, options) {","            var instance = this,","                  syncpromise;","","            syncpromise = instance.syncPromise(action, options);","            if (!(syncpromise instanceof Y.Promise)) {","                syncpromise = new Y.Promise(function (resolve, reject) {","                    var errormessage = 'syncPromise is rejected --> '+action+' not defined as a Promise inside syncPromise()';","                    reject(new Error(errormessage));","                });","            }","            return syncpromise;","        },","","       /**","        * Destroys all models within this modellist.","        * <b>Caution:</b> The current version uses the Model's synclayer, NOT ModelList's synclayer.","        *","        * This method delegates to the Model's`sync()` method to perform the actual destroy","        * operation, which is an asynchronous action. Within the Y.Model-class, you <b>must</b> specify a _callback_ function to","         * make the promise work.","        *","        * A successful destroy operation will fire a `destroy` event, while an unsuccessful","        * save operation will fire an `error` event with the `src` value \"destroy\".","        *","        * @method destroyPromise","         * @param {Object} [options] Options to be passed to all Model's`sync()`. It's up to the custom sync","         *                 implementation to determine what options it supports or requires, if any.","         * @return {Y.Promise} promised response --> resolve(response, options) OR reject(reason).","        **/","        destroyPromise: function(options) {","            var instance = this,","                  destroylist = [];","","            instance.each(","                function(model) {","                    destroylist.push(model.destroyPromise(options));","                }","            );","            return Y.batch.apply(Y, destroylist).then(","//            return Y.Promise.every(destroylist).then(","                function(data) {","                    var facade = {","                        options : options,","                        src : 'destroy'","                    };","                    // Lazy publish.","                    if (!instance._destroyEvent) {","                        instance._destroyEvent = instance.publish(EVT_DESTROY, {","                            preventable: false","                        });","                    }","                    instance.fire(EVT_DESTROY, facade);","                    return data;","                },","                function(err) {","                    var facade = {","                        options : options,","                        src : 'Modellist.destroyPromise()',","                        error: err","                    };","                    instance._lazyFireErrorEvent(facade);","                    return err;","                }","            );","        },","","        /**","         * Loads models from the server and adds them into the ModelList. <br />","         * Without options, previous items will be replaced. Use loadPromise({append: true}) to append the items.<br /><br />","         *","         * This method delegates to the `sync()` method, by either using the 'read' or 'readappend' action, depending","         * on the value of parameter options.append.","         * This is an asynchronous action. You <b>must</b> specify a _callback_ function to","         * make the promise work.","         *","         * A successful load operation will fire a `load` event, while an unsuccessful","         * load operation will fire an `error` event with the `src` value \"load\".","         *","         * If the load operation succeeds and one or more of the loaded attributes","         * differ from this model's current attributes, a `change` event will be fired for every Model.","         *","         * @method loadPromise","         * @param {Object} [options] Options to be passed to `sync()`. The custom sync","         *                 implementation can determine what options it supports or requires, if any.","         * @param {Boolean} [options.append] Set true if you want to append items.","         * @return {Y.Promise} promised response --> resolve(response, options) OR reject(reason).","        **/","        loadPromise: function (options) {","            var instance = this,","                 optionsappend, append, eventname;","","            options = options || {};","            optionsappend = options.append;","            append = ((typeof optionsappend === 'boolean') && optionsappend);","            eventname = append ? EVT_LOADAPPEND : EVT_LOAD;","            return new Y.Promise(function (resolve, reject) {","                var errFunc, successFunc,","                    syncmethod = append ? 'readappend' : 'read',","                      facade = {","                          options : options","                      };","                errFunc = function(err) {","                    facade.error = err;","                    facade.src   = 'Modellist.loadPromise() - load' + (append ? 'append' : '');","                    instance._lazyFireErrorEvent(facade);","                    reject(new Error(err));","                };","                successFunc = function(response) {","                    var parsed;","                    // Lazy publish.","                    if (!instance['_'+eventname]) {","                        instance['_'+eventname] = instance.publish(eventname, {","                            preventable: false","                        });","                    }","                    facade.response = response;","                    parsed = PARSED(response);","                    if (parsed.responseText) {","                        // XMLHttpRequest","                        parsed = parsed.responseText;","                    }","                    facade.parsed = parsed;","                    if (append) {","                        instance.add(parsed, options);","                    }","                    else {","                        instance.reset(parsed, options);","                    }","                    instance.fire(eventname, facade);","                    resolve(response);","                };","                if (instance.syncPromise) {","                    // use the syncPromise-layer","                    instance._syncTimeoutPromise(syncmethod, options).then(","                        successFunc,","                        errFunc","                    );","                }","                else {","                    instance.sync(syncmethod, options, function (err, response) {","                        if (err) {","                            errFunc(err);","                        }","                        else {","                            successFunc(response);","                        }","                    });","                }","            });","        },","","       /**","        * Saves all modified models within this modellist to the server.","        * <b>Caution:</b> within the current version the Model's synclayer is used, NOT ModelList's synclayer.","        * Therefore, you get multiple requests for all modified Models.","        *","        * This method delegates to the Model's`sync()` method to perform the actual save","        * operation, which is an asynchronous action. Within the Y.Model-class, you <b>must</b> specify a _callback_ function to","         * make the promise work.","        *","        * A successful save operation will fire a `save` event, while an unsuccessful","        * save operation will fire an `error` event with the `src` value \"save\".","        *","        * If the save operation succeeds and one or more of the attributes returned in","        * the server's response differ from this model's current attributes, a","        * `change` event will be fired.","        *","        * @method savePromise","         * @param {Object} [options] Options to be passed to all Model's`sync()`. It's up to the custom sync","         *                 implementation to determine what options it supports or requires, if any.","         * @return {Y.Promise} promised response --> resolve(response, options) OR reject(reason).","        **/","        savePromise: function(options) {","            var instance = this,","                  savelist = [];","","            instance.each(","                function(model) {","                    if (model.isModified()) {","                        savelist.push(model.savePromise(options));","                    }","                }","            );","            return Y.batch.apply(Y, savelist).then(","//            return Y.Promise.every(savelist).then(","                function(data) {","                    var facade = {","                        options : options,","                        src : 'save'","                    };","                    // Lazy publish.","                    if (!instance._saveEvent) {","                        instance._saveEvent = instance.publish(EVT_SAVE, {","                            preventable: false","                        });","                    }","                    instance.fire(EVT_SAVE, facade);","                    return data;","                },","                function(err) {","                    var facade = {","                        options : options,","                        src : 'Modellist.savePromise()',","                        error: err","                    };","                    instance._lazyFireErrorEvent(facade);","                    return err;","                }","            );","        },","","       /**","        * Submits all models within this modellist to the server.","        * <b>Caution:</b> within the current version the Model's synclayer is used, NOT ModelList's synclayer.","        * Therefore, you get multiple requests for all Models.","        *","        * This method delegates to the Model's`sync()` method to perform the actual submit","        * operation, which is an asynchronous action. Within the Y.Model-class, you <b>must</b> specify a _callback_ function to","         * make the promise work.","        *","        * A successful save operation will fire a `submit` event, while an unsuccessful","        * save operation will fire an `error` event with the `src` value \"submit\".","        *","        * @method submitPromise","         * @param {Object} [options] Options to be passed to all Model's`sync()`. It's up to the custom sync","         *                 implementation to determine what options it supports or requires, if any.","         * @return {Y.Promise} promised response --> resolve(response, options) OR reject(reason).","        **/","        submitPromise: function(options) {","            var instance = this,","                  submitlist = [];","","            instance.each(","                function(model) {","                    submitlist.push(model.submitPromise(options));","                }","            );","            return Y.batch.apply(Y, submitlist).then(","//            return Y.Promise.every(submitlist).then(","                function(data) {","                    var facade = {","                        options : options,","                        src : 'submit'","                    };","                    // Lazy publish.","                    if (!instance._submitEvent) {","                        instance._submitEvent = instance.publish(EVT_SUBMIT, {","                            preventable: false","                        });","                    }","                    instance.fire(EVT_SUBMIT, facade);","                    return data;","                },","                function(err) {","                    var facade = {","                        options : options,","                        src : 'Modellist.submitPromise()',","                        error: err","                    };","                    instance._lazyFireErrorEvent(facade);","                    return err;","                }","            );","        },","","       /**","        * Fires the 'error'-event and -if not published yet- publish it broadcasted to Y.","        * Because the error-event is broadcasted to Y, it can be catched by gallery-itsaerrorreporter.","        *","        * @method _lazyFireErrorEvent","         * @param {Object} [facade] eventfacade.","         * @private","        **/","        _lazyFireErrorEvent : function(facade) {","            var instance = this;","","            // lazy publish","            if (!instance._errorEvent) {","                instance._errorEvent = instance.publish(EVT_ERROR, {","                    broadcast: 1","                });","            }","            instance.fire(EVT_ERROR, facade);","        }","","    }, true);","","    Y.ITSAModellistSyncPromise = ITSAModellistSyncPromise;","","    Y.Base.mix(Y.ModelList, [ITSAModellistSyncPromise]);","","}, '@VERSION@', {","    \"requires\": [","        \"yui-base\",","        \"base-base\",","        \"base-build\",","        \"node-base\",","        \"json-parse\",","        \"promise\",","        \"model\",","        \"model-list\",","        \"gallery-itsamodelsyncpromise\"","    ]","});"];
_yuitest_coverage["build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js"].lines = {"1":0,"3":0,"57":0,"112":0,"113":0,"114":0,"116":0,"121":0,"124":0,"129":0,"130":0,"157":0,"160":0,"161":0,"162":0,"163":0,"164":0,"167":0,"187":0,"190":0,"192":0,"195":0,"198":0,"203":0,"204":0,"208":0,"209":0,"212":0,"217":0,"218":0,"245":0,"248":0,"249":0,"250":0,"251":0,"252":0,"253":0,"258":0,"259":0,"260":0,"261":0,"262":0,"264":0,"265":0,"267":0,"268":0,"272":0,"273":0,"274":0,"276":0,"278":0,"279":0,"280":0,"283":0,"285":0,"286":0,"288":0,"290":0,"296":0,"297":0,"298":0,"301":0,"330":0,"333":0,"335":0,"336":0,"340":0,"343":0,"348":0,"349":0,"353":0,"354":0,"357":0,"362":0,"363":0,"386":0,"389":0,"391":0,"394":0,"397":0,"402":0,"403":0,"407":0,"408":0,"411":0,"416":0,"417":0,"431":0,"434":0,"435":0,"439":0,"444":0,"446":0};
_yuitest_coverage["build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js"].functions = {"PARSED:111":0,"ITSAModellistSyncPromise:129":0,"(anonymous 2):162":0,"_syncTimeoutPromise:156":0,"(anonymous 3):191":0,"(anonymous 4):197":0,"(anonymous 5):211":0,"destroyPromise:186":0,"errFunc:258":0,"successFunc:264":0,"(anonymous 7):296":0,"(anonymous 6):252":0,"loadPromise:244":0,"(anonymous 8):334":0,"(anonymous 9):342":0,"(anonymous 10):356":0,"savePromise:329":0,"(anonymous 11):390":0,"(anonymous 12):396":0,"(anonymous 13):410":0,"submitPromise:385":0,"_lazyFireErrorEvent:430":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js"].coveredLines = 93;
_yuitest_coverage["build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js"].coveredFunctions = 23;
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

    PARSED = function (response) {
        _yuitest_coverfunc("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", "PARSED", 111);
_yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 112);
if (typeof response === 'string') {
            _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 113);
try {
                _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 114);
return Y.JSON.parse(response);
            } catch (ex) {
                _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 116);
this.fire(EVT_ERROR, {
                    error   : ex,
                    response: response,
                    src     : 'parse'
                });
                _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 121);
return null;
            }
        }
        _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 124);
return response;
    };

// -- Mixing extra Methods to Y.ModelList -----------------------------------

    _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 129);
function ITSAModellistSyncPromise() {}
    _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 130);
Y.mix(ITSAModellistSyncPromise.prototype, {

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
            _yuitest_coverfunc("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", "_syncTimeoutPromise", 156);
_yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 157);
var instance = this,
                  syncpromise;

            _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 160);
syncpromise = instance.syncPromise(action, options);
            _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 161);
if (!(syncpromise instanceof Y.Promise)) {
                _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 162);
syncpromise = new Y.Promise(function (resolve, reject) {
                    _yuitest_coverfunc("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", "(anonymous 2)", 162);
_yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 163);
var errormessage = 'syncPromise is rejected --> '+action+' not defined as a Promise inside syncPromise()';
                    _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 164);
reject(new Error(errormessage));
                });
            }
            _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 167);
return syncpromise;
        },

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
            _yuitest_coverfunc("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", "destroyPromise", 186);
_yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 187);
var instance = this,
                  destroylist = [];

            _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 190);
instance.each(
                function(model) {
                    _yuitest_coverfunc("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", "(anonymous 3)", 191);
_yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 192);
destroylist.push(model.destroyPromise(options));
                }
            );
            _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 195);
return Y.batch.apply(Y, destroylist).then(
//            return Y.Promise.every(destroylist).then(
                function(data) {
                    _yuitest_coverfunc("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", "(anonymous 4)", 197);
_yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 198);
var facade = {
                        options : options,
                        src : 'destroy'
                    };
                    // Lazy publish.
                    _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 203);
if (!instance._destroyEvent) {
                        _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 204);
instance._destroyEvent = instance.publish(EVT_DESTROY, {
                            preventable: false
                        });
                    }
                    _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 208);
instance.fire(EVT_DESTROY, facade);
                    _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 209);
return data;
                },
                function(err) {
                    _yuitest_coverfunc("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", "(anonymous 5)", 211);
_yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 212);
var facade = {
                        options : options,
                        src : 'Modellist.destroyPromise()',
                        error: err
                    };
                    _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 217);
instance._lazyFireErrorEvent(facade);
                    _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 218);
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
            _yuitest_coverfunc("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", "loadPromise", 244);
_yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 245);
var instance = this,
                 optionsappend, append, eventname;

            _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 248);
options = options || {};
            _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 249);
optionsappend = options.append;
            _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 250);
append = ((typeof optionsappend === 'boolean') && optionsappend);
            _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 251);
eventname = append ? EVT_LOADAPPEND : EVT_LOAD;
            _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 252);
return new Y.Promise(function (resolve, reject) {
                _yuitest_coverfunc("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", "(anonymous 6)", 252);
_yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 253);
var errFunc, successFunc,
                    syncmethod = append ? 'readappend' : 'read',
                      facade = {
                          options : options
                      };
                _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 258);
errFunc = function(err) {
                    _yuitest_coverfunc("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", "errFunc", 258);
_yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 259);
facade.error = err;
                    _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 260);
facade.src   = 'Modellist.loadPromise() - load' + (append ? 'append' : '');
                    _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 261);
instance._lazyFireErrorEvent(facade);
                    _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 262);
reject(new Error(err));
                };
                _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 264);
successFunc = function(response) {
                    _yuitest_coverfunc("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", "successFunc", 264);
_yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 265);
var parsed;
                    // Lazy publish.
                    _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 267);
if (!instance['_'+eventname]) {
                        _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 268);
instance['_'+eventname] = instance.publish(eventname, {
                            preventable: false
                        });
                    }
                    _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 272);
facade.response = response;
                    _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 273);
parsed = PARSED(response);
                    _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 274);
if (parsed.responseText) {
                        // XMLHttpRequest
                        _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 276);
parsed = parsed.responseText;
                    }
                    _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 278);
facade.parsed = parsed;
                    _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 279);
if (append) {
                        _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 280);
instance.add(parsed, options);
                    }
                    else {
                        _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 283);
instance.reset(parsed, options);
                    }
                    _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 285);
instance.fire(eventname, facade);
                    _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 286);
resolve(response);
                };
                _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 288);
if (instance.syncPromise) {
                    // use the syncPromise-layer
                    _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 290);
instance._syncTimeoutPromise(syncmethod, options).then(
                        successFunc,
                        errFunc
                    );
                }
                else {
                    _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 296);
instance.sync(syncmethod, options, function (err, response) {
                        _yuitest_coverfunc("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", "(anonymous 7)", 296);
_yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 297);
if (err) {
                            _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 298);
errFunc(err);
                        }
                        else {
                            _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 301);
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
            _yuitest_coverfunc("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", "savePromise", 329);
_yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 330);
var instance = this,
                  savelist = [];

            _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 333);
instance.each(
                function(model) {
                    _yuitest_coverfunc("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", "(anonymous 8)", 334);
_yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 335);
if (model.isModified()) {
                        _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 336);
savelist.push(model.savePromise(options));
                    }
                }
            );
            _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 340);
return Y.batch.apply(Y, savelist).then(
//            return Y.Promise.every(savelist).then(
                function(data) {
                    _yuitest_coverfunc("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", "(anonymous 9)", 342);
_yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 343);
var facade = {
                        options : options,
                        src : 'save'
                    };
                    // Lazy publish.
                    _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 348);
if (!instance._saveEvent) {
                        _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 349);
instance._saveEvent = instance.publish(EVT_SAVE, {
                            preventable: false
                        });
                    }
                    _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 353);
instance.fire(EVT_SAVE, facade);
                    _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 354);
return data;
                },
                function(err) {
                    _yuitest_coverfunc("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", "(anonymous 10)", 356);
_yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 357);
var facade = {
                        options : options,
                        src : 'Modellist.savePromise()',
                        error: err
                    };
                    _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 362);
instance._lazyFireErrorEvent(facade);
                    _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 363);
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
            _yuitest_coverfunc("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", "submitPromise", 385);
_yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 386);
var instance = this,
                  submitlist = [];

            _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 389);
instance.each(
                function(model) {
                    _yuitest_coverfunc("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", "(anonymous 11)", 390);
_yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 391);
submitlist.push(model.submitPromise(options));
                }
            );
            _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 394);
return Y.batch.apply(Y, submitlist).then(
//            return Y.Promise.every(submitlist).then(
                function(data) {
                    _yuitest_coverfunc("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", "(anonymous 12)", 396);
_yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 397);
var facade = {
                        options : options,
                        src : 'submit'
                    };
                    // Lazy publish.
                    _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 402);
if (!instance._submitEvent) {
                        _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 403);
instance._submitEvent = instance.publish(EVT_SUBMIT, {
                            preventable: false
                        });
                    }
                    _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 407);
instance.fire(EVT_SUBMIT, facade);
                    _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 408);
return data;
                },
                function(err) {
                    _yuitest_coverfunc("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", "(anonymous 13)", 410);
_yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 411);
var facade = {
                        options : options,
                        src : 'Modellist.submitPromise()',
                        error: err
                    };
                    _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 416);
instance._lazyFireErrorEvent(facade);
                    _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 417);
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
            _yuitest_coverfunc("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", "_lazyFireErrorEvent", 430);
_yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 431);
var instance = this;

            // lazy publish
            _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 434);
if (!instance._errorEvent) {
                _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 435);
instance._errorEvent = instance.publish(EVT_ERROR, {
                    broadcast: 1
                });
            }
            _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 439);
instance.fire(EVT_ERROR, facade);
        }

    }, true);

    _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 444);
Y.ITSAModellistSyncPromise = ITSAModellistSyncPromise;

    _yuitest_coverline("build/gallery-itsamodellistsyncpromise/gallery-itsamodellistsyncpromise.js", 446);
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
