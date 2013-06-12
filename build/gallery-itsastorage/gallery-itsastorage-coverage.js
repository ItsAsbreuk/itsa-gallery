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
_yuitest_coverage["build/gallery-itsastorage/gallery-itsastorage.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-itsastorage/gallery-itsastorage.js",
    code: []
};
_yuitest_coverage["build/gallery-itsastorage/gallery-itsastorage.js"].code=["YUI.add('gallery-itsastorage', function (Y, NAME) {","","'use strict';","","/**"," * The ItsaStorage module."," *"," * @module itsa-storage"," */","","/**"," * Localstorage with fallback on server. No need to initialize or waiting for ready. Works with multiple sandboxes."," * Values to be stored may consist of the following types: <br>"," * <ul><li>String</li><li>Number</li><li>Boolean</li><li>Array</li><li>Date</li><li>RegExp</li><li>Object</li></ul>"," * This module will automaticly transform the types to String during saving and retransform to the right type during reading."," *"," * When storing Y.Model objects (or descendants), the value you need store is: yourModel.getAttrs()"," * Reading the value will return an object (say 'readObject'), which can be put in the modelinstance like: yourModel.setAttrs(readObject);"," *"," * <b>Always</b> look at the callback's error to find out is saving and reading succeeded. No need for waiting for initialisation: in cases initialisation is needed (IE6, IE7, Safari3),"," * the callback will always return after everything has been initialized."," *"," * @class ITSAStorage"," * @extends Base"," * @constructor"," *"," * <i>Copyright (c) 2012 Marco Asbreuk - http://theinternetwizard.net</i>"," * YUI BSD License - http://developer.yahoo.com/yui/license.html"," *","*/","","/**"," * Y.ItsaStorage can be used straight ahead with all its functions"," * @instance Y.ItsaStorage"," * @static"," *","*/","","Y.ITSASTORAGE = Y.Base.create('itsastorage', Y.Base, [], {","","    // -- Private Constants --------------------------------------------------------","    DB_NAME             : 'itsa_storage',","    DB_DISPLAYNAME      : 'ITSA Storage data',","    DB_MAXSIZE          : 1048576,","    DB_VERSION          : '1.0',","","    EVT_READY           : 'itsastorage:ready',","","    MODE_NOOP           : 0,","    MODE_HTML5          : 1,","    MODE_GECKO          : 2,","    MODE_DB             : 3,","    MODE_USERDATA       : 4,","    MODE_SERVER         : 5,","","    USERDATA_PATH       : 'itsa_storage',","    USERDATA_NAME       : 'itsadata',","","    COOKIE_ID           : 'itsastorageid',","","    TYPE_STRING         : 'A',","    TYPE_INT            : 'B',","    TYPE_FLOAT          : 'C',","    TYPE_BOOLEAN        : 'D',","    TYPE_ARRAY          : 'E',","    TYPE_DATE           : 'F',","    TYPE_REGEXP         : 'G',","    TYPE_OBJECT         : 'H',","","// -- Private Variables --------------------------------------------------------","/**"," * Internal object that stores key-value pairs in case of MODE_DB or MODE_USERDATA"," * @property data"," * @type Object"," * @private"," */","","/**"," * The choosen driver in case of MODE_HTML5 or MODE_GECKO"," * @property storageDriver"," * @type Object"," * @private"," */","","/**"," * The choosen storageDriver based on the browser-capabilities"," * @property storageMode"," * @type Int"," * @private"," */","","/**"," * Flag that will be set to true (in case of MODE_DB or MODE_USERDATA) as soon as everything is initialized and ready to use"," * @property initialised_DB_USER_DATA"," * @type Boolean"," * @private"," */","","/**"," * Reference to the server: should be set by setRemoteStorageServer()"," * @property server"," * @type String"," * @private"," */","","/**"," * Reference to the uri of setItem: should be set by setRemoteStorageServer()"," * @property uriSetItem"," * @type String"," * @private"," */","","/**"," * Reference to the uri of getItem: should be set by setRemoteStorageServer()"," * @property uriGetItem"," * @type String"," * @private"," */","","/**"," * Reference to the uri of getLength: should be set by setRemoteStorageServer()"," * @property uriGetLength"," * @type String"," * @private"," */","","/**"," * Reference to the uri of removeItem: should be set by setRemoteStorageServer()"," * @property uriRemoveItem"," * @type String"," * @private"," */","","/**"," * Reference to the uri of clear: should be set by setRemoteStorageServer()"," * @property uriClear"," * @type String"," * @private"," */","","    data : {},","    storageDriver: null,","    storageMode: null,","    initialised_DB_USER_DATA: false,","    server: null,","    uriSetItem: null,","    uriGetItem: null,","    uriGetLength: null,","    uriRemoveItem: null,","    uriClear: null,","    _serverBkpExists: false,","    _serverStorageCanbemade: false,","    _serverTimeout: 8000,","","    /**","     * Set up the best storageMode based on browser-capabilities. In case of MODE_DB or MODE_USERDATA, there will be done some more initialisation on the browser/dom.","     * As soon as that gets finished, an internal event will be launched, so that the module knows all functions can be used. All functions can be used straight ahead by the user anyway,","     * because internally they will wait until initialization has finished.","     *","     * @method initializer","     * @protected","    */","    initializer: function () {","        var instance = this,","            w = Y.config.win;","        // Determine the best available storage mode.","        try {","            if (w.localStorage) {","                instance.storageMode = instance.MODE_HTML5;","            } else if (w.globalStorage) {","                instance.storageMode = instance.MODE_GECKO;","            } else if (w.openDatabase && Y.UA.userAgent.indexOf('Chrome') === -1) {","                instance.storageMode = instance.MODE_DB;","            } else if (Y.UA.ie >= 5) {","                instance.storageMode = instance.MODE_USERDATA;","            } else {","                instance.storageMode = instance.MODE_SERVER;","            }","        } catch (ex) {","            instance.storageMode = instance.MODE_SERVER;","        }","if ((instance.storageMode === instance.MODE_DB) || (instance.storageMode === instance.MODE_USERDATA)) {","    instance.storageMode = instance.MODE_SERVER;","}","//==================================================================================================","","        if (instance.storageMode === instance.MODE_HTML5) {","            instance.storageDriver = w.localStorage;","        }","        if (instance.storageMode === instance.MODE_GECKO) {","            instance.storageDriver = w.globalStorage[w.location.hostname];","        }","","        if (instance.storageMode === instance.MODE_HTML5) {","            // Mobile Safari in iOS 5 loses track of storageDriver when","            // page is restored from bfcache. This fixes the reference.","            Y.Node.DOM_EVENTS.pageshow = 1;","            Y.on(","                'pageshow',","                function () {","                    instance.storageDriver = w.localStorage;","                },","                w","            );","        }","","        if ((instance.storageMode === instance.MODE_DB) || (instance.storageMode === instance.MODE_USERDATA)) {","            Y.on(","                instance.EVT_READY,","                function() {","                    this.initialised_DB_USER_DATA = true;","                },","                instance","            );","        }","        if (instance.storageMode === instance.MODE_DB) {","            // Database storage methods. Supported by Safari 3.1 and 3.2.","            instance.storageDriver = w.openDatabase(instance.DB_NAME, instance.DB_VERSION, instance.DB_DISPLAYNAME, instance.DB_MAXSIZE);","            instance.storageDriver.transaction(","                Y.bind(","                    function (t) {","                        var instance = this;","                        t.executeSql(\"CREATE TABLE IF NOT EXISTS \" + instance.DB_NAME + \"(name TEXT PRIMARY KEY, value TEXT NOT NULL)\");","                        t.executeSql(","                            \"SELECT value FROM \" + instance.DB_NAME + \" WHERE name = 'data'\",","                            [],","                            Y.bind(","                                function (t, results) {","                                    var instance = this;","                                    if (results.rows.length) {","                                        try {","                                            instance.data = Y.JSON.parse(results.rows.item(0).value);","                                        } catch (ex) {","                                            instance.data = {};","                                        }","                                    }","                                    Y.fire(instance.EVT_READY);","                                },","                                instance","                            )","                        );","                    },","                    instance","                )","            );","        }","        if (instance.storageMode === instance.MODE_USERDATA) {","            // userData storage methods. Supported by IE5, 6, and 7.","            instance.storageDriver = Y.config.doc.createElement('span');","            instance.storageDriver.addBehavior('#default#userData');","            Y.on(","                'domready',","                Y.bind(","                    function () {","                        var instance = this;","                        Y.config.doc.body.appendChild(instance.storageDriver);","                        instance.storageDriver.load(instance.USERDATA_PATH);","                        try {","                            instance.data = Y.JSON.parse(instance.storageDriver.getAttribute(instance.USERDATA_NAME) || '{}');","                        } catch (ex) {","                            instance.data = {};","                        }","                        Y.fire(instance.EVT_READY);","                    },","                    instance","                )","            );","        }","    },","","    /**","     * Removes all items from the data store.","     *","     * @method clear","     * @param {Function} callback will be returned with 1 parameter:<br>","     * <ul><li>err (String) only process the returnvalue when err===null</li></ul>","     * @param {Object} [context] this in the callbackfunction","     * @param {Simpletype|Object|Array} [args] returns as the second parameter of the callback-function","     */","    clear: function (callback, context, args) {","        var instance = this;","        if (instance.storageMode === instance.MODE_SERVER) {","            instance._clearServer(callback, context, args);","        }","        else {","            if (instance.serverStoragePosible()) {","                instance._clearLocal(","                    function(err) {","                        instance._clearServer(callback, context, args, err);","                    },","                    instance","                );","            }","            else {","                instance._clearLocal(callback, context, args);","            }","        }","    },","","    /**","     * Removes all items from the local datastore.","     *","     * @method _clearLocal","     * @param {Function} callback will be returned with 1 parameter:<br>","     * <ul><li>err (String) only process the returnvalue when err===null</li></ul>","     * @param {Object} [context] this in the callbackfunction","     * @param {Simpletype|Object|Array} [args] returns as the second parameter of the callback-function","     * @private","     */","    _clearLocal: function (callback, context, args) {","        var instance = this,","            err = null;","        var key;","        try {","            if (instance.storageMode === instance.MODE_HTML5) {","                instance.storageDriver.clear();","            }","            else if (instance.storageMode === instance.MODE_GECKO) {","                for (key in instance.storageDriver) {","                    if (instance.storageDriver.hasOwnProperty(key)) {","                        instance.storageDriver.removeItem(key);","                        delete instance.storageDriver[key];","                    }","                }","            }","        }","        catch(catcherr) {","            err = catcherr.message;","        }","        if ((instance.storageMode === instance.MODE_DB) || (instance.storageMode === instance.MODE_USERDATA)) {","            if (instance.initialised_DB_USER_DATA) {","                instance.data = {};","                instance._setItemLocal_OldBrowsers(null, null, callback, context, args);","            }","            else {","                Y.on(","                    instance.EVT_READY,","                    function() {","                        instance.data = {};","                        instance._setItemLocal_OldBrowsers(null, null, callback, context, args);","                    },","                    instance","                );","            }","        }","        else {","            if (Y.Lang.isFunction(callback)) {","                Y.rbind(callback, context, err, args)();","            }","        }","    },","","    /**","     * Removes all items from the server datastore.","     *","     * @method _clearServer","     * @param {Function} callback will be returned with 1 parameter:<br>","     * <ul><li>err (String) only process the returnvalue when err===null</li></ul>","     * @param {Object} [context] this in the callbackfunction","     * @param {Simpletype|Object|Array} [args] returns as the second parameter of the callback-function","     * @param {String} [localError] chained error passed by _clearLocal","     * @private","     */","    _clearServer: function (callback, context, args, localError) {","        var instance = this,","            url,","            stringifyItems;","        if (!instance._serverBkpExists) {","            if (Y.Lang.isFunction(callback)) {","                Y.rbind(callback, context, null, args)();","            }","            return;","        }","        if (instance.server) {","            if (instance._storageCookieEnabled()) {","                url = instance.server + '?' + instance.uriClear + '&'+instance.COOKIE_ID+'=' + instance._readCookie() + '&callback={callback}';","                Y.jsonp(","                    url,","                    {","                        on: {","                            success: function(data) {","                                if (Y.Lang.isFunction(callback)) {","                                    Y.rbind(callback, context, localError, args)();","                                    instance._serverBkpExists = false;","                                }","                            },","                            failure: function() {","                                if (Y.Lang.isFunction(callback)) {","                                    Y.rbind(callback, context, (localError ? localError + ' + ' : '') + 'failed to connect to server', args)();","                                }","                            },","                            timeout: function() {","                                if (Y.Lang.isFunction(callback)) {","                                    Y.rbind(callback, context, (localError ? localError + ' + ' : '') + 'connection time-out server', args)();","                                }","                            }","                        },","                        context: instance,","                        timeout: instance._serverTimeout","                    }","                );","            }","            else {","                if (Y.Lang.isFunction(callback)) {","                    Y.rbind(callback, context, (localError ? localError + ' + ' : '') + 'Cookie-errror: You must accept Cookies in order to store data', null, args)();","                }","            }","        }","        else {","            if (Y.Lang.isFunction(callback)) {","                Y.rbind(callback, context, (localError ? localError + ' + ' : '') + 'setRemoteStorageServer is not set in the right way', args)();","            }","        }","    },","","","    /**","     * Returns the item with the specified key, or <code>null</code> if the item","     * was not found.","     *","     * @method getItem","     * @param {String} key","     * @param {Function} callback will be returned with 2 parameters:<br>","     * <ul><li>err (String) only process the returnvalue when err===null</li><li>result (String|Number|Boolean|Array|Date|RegExp|Object)</li></ul>","     * @param {Object} [context] this in the callbackfunction","     * @param {Simpletype|Object|Array} [args] returns as the firth parameter of the callback-function","     * @return {Function} callback(err, result, args) as second parameter","     */","    getItem: function (key, callback, context, args) {","        var instance = this;","        if (instance.storageMode === instance.MODE_SERVER) {","            instance._getItemServer(key, callback, context, args);","        }","        else {","            if (instance.serverStoragePosible()) {","                instance._getItemLocal(","                    key,","                    function(err, data) {","                        if (!err && data) {","                            if (Y.Lang.isFunction(callback)) {","                                Y.rbind(callback, context, null, data, args)();","                            }","                        }","                        else {","                            instance._getItemServer(key, callback, context, args, err);","                        }","                    },","                    instance","                );","            }","            else {","                instance._getItemLocal(key, callback, context, args);","            }","        }","    },","","    /**","     * Returns the item from local-store with the specified key, or <code>null</code> if the item","     * was not found.","     *","     * @method _getItemLocal","     * @param {String} key","     * @param {Function} callback will be returned with 2 parameters:<br>","     * <ul><li>err (String) only process the returnvalue when err===null</li><li>result (String|Number|Boolean|Array|Date|RegExp|Object)</li></ul>","     * @param {Object} [context] this in the callbackfunction","     * @param {Simpletype|Object|Array} [args] returns as the firth parameter of the callback-function","     * @private","     * @return {Function} callback(err, result, args) as second parameter","     */","    _getItemLocal: function (key, callback, context, args) {","        var instance = this,","            returnvalue = null,","            err = null,","            storagevalue;","        if ((instance.storageMode === instance.MODE_HTML5) || (instance.storageMode === instance.MODE_GECKO)) {","            //----------------------------------------------------------","            try {","                if (instance.storageMode === instance.MODE_HTML5) {","                    storagevalue = instance.storageDriver.getItem(key);","                }","                else if (instance.storageMode === instance.MODE_GECKO) {","                    storagevalue = instance.storageDriver[key].value;","                }","                returnvalue = instance._getCorrectItemType(storagevalue);","            }","            catch(catcherr) {","                err = catcherr.message;","            }","            //----------------------------------------------------------","            if (Y.Lang.isFunction(callback)) {","                Y.rbind(callback, context, err, returnvalue, args)();","            }","        }","        else if (instance.storageMode === instance.MODE_DB || instance.storageMode === instance.MODE_USERDATA) {","            if (instance.initialised_DB_USER_DATA) {","                storagevalue = instance.data.hasOwnProperty(key) ? instance.data[key] : null;","                if (Y.Lang.isFunction(callback)) {","                    Y.rbind(callback, context, null, instance._getCorrectItemType(storagevalue), args)();","                }","            }","            else {","                Y.on(","                    instance.EVT_READY,","                    function() {","                        var instance = this,","                            storagevalue = instance.data.hasOwnProperty(key) ? instance.data[key] : null;","                            if (Y.Lang.isFunction(callback)) {","                                Y.rbind(callback, context, null, instance._getCorrectItemType(storagevalue), args)();","                            }","                    },","                    instance","                );","            }","        }","        else if (Y.Lang.isFunction(callback)) {","            Y.rbind(callback, context, 'no appropriate storageMode for _getItemLocal', null, args)();","        }","    },","","    /**","     * Returns the item from server-store with the specified key, or <code>null</code> if the item","     * was not found.","     *","     * @method _getItemServer","     * @param {String} key","     * @param {Function} callback will be returned with 2 parameters:<br>","     * <ul><li>err (String) only process the returnvalue when err===null</li><li>result (String|Number|Boolean|Array|Date|RegExp|Object)</li></ul>","     * @param {Object} [context] this in the callbackfunction","     * @param {Simpletype|Object|Array} [args] returns as the firth parameter of the callback-function","     * @param {String} [localError] chained error passed by _getItemLocal","     * @private","     * @return {Function} callback(err, result, args) as second parameter","     */","    _getItemServer: function (key, callback, context, args, localError) {","        var instance = this,","            url,","            stringifyItems;","        if (!instance._serverBkpExists) {","            if (Y.Lang.isFunction(callback)) {","                Y.rbind(callback, context, null, null, args)();","            }","            return;","        }","        if (instance.server) {","            if (instance._storageCookieEnabled()) {","                url = instance.server + '?' + instance.uriGetItem + '&'+instance.COOKIE_ID+'=' + instance._readCookie() + '&key=' + encodeURIComponent(key) + '&callback={callback}';","                Y.jsonp(","                    url,","                    {","                        on: {","                            success: function(data) {","                                var instance = this,","                                    returnvalue = instance._getCorrectItemType(data);","                                Y.rbind(callback, context, null, returnvalue, args)();","                            },","                            failure: function() {","                                if (Y.Lang.isFunction(callback)) {","                                    Y.rbind(callback, context, (localError ? localError + ' + ' : '') + 'failed to connect to server', null, args)();","                                }","                            },","                            timeout: function() {","                                if (Y.Lang.isFunction(callback)) {","                                    Y.rbind(callback, context, (localError ? localError + ' + ' : '') + 'connection time-out server', null, args)();","                                }","                            }","                        },","                        context: instance,","                        timeout: instance._serverTimeout","                    }","                );","            }","            else {","                if (Y.Lang.isFunction(callback)) {","                    Y.rbind(callback, context, (localError ? localError + ' + ' : '') + 'Cookie-errror: You must accept Cookies in order to store data', null, args)();","                }","            }","        }","        else {","            if (Y.Lang.isFunction(callback)) {","                Y.rbind(callback, context, (localError ? localError + ' + ' : '') + 'setRemoteStorageServer is not set in the right way', null, args)();","            }","        }","    },","","    /**","     * Returns the multiple items, specified by the <b>key</b>-array","     *","     * @method getItems","     * @param {Array} keys String-array containing the keys","     * @param {Function} callback will be returned with 2 parameters:<br>","     * <ul><li>err (String) only process the returnvalue when err===null</li>","     * <li>result (Object) where the fields are specified by <b>key</b> and key-values are types (String|Number|Boolean|Array|Date|RegExp|Object)</li>","     * <li>notfound (Array) containing the fields whose values are not found</li>","     * </ul>","     * @param {Object} [context] this in the callbackfunction","     * @param {Simpletype|Object|Array} [args] returns as the fourth parameter of the callback-function","     * @return {Function} callback(err, result, notfound, args) as second parameter","     */","    getItems: function (keys, callback, context, args) {","        var instance = this;","        if (instance.storageMode === instance.MODE_SERVER) {","            instance._getItemsServer(keys, callback, context, args);","        }","        else {","            if (instance.serverStoragePosible()) {","                instance._getItemsLocal(","                    keys,","                    function(err, data, notfoundkeys) {","                        if (!err && data && !Y.Lang.isValue(notfoundkeys)) {","                            if (Y.Lang.isFunction(callback)) {","                                Y.rbind(callback, context, null, data, args)();","                            }","                        }","                        else {","                            instance._getItemsServer(notfoundkeys, callback, context, args, err, data);","                        }","                    },","                    instance","                );","            }","            else {","                instance._getItemsLocal(keys, callback, context, args);","            }","        }","    },","","    /**","     * Returns the item from local-store with the specified key, or <code>null</code> if the item","     * was not found.","     *","     * @method _getItemsLocal","     * @param {Array} keys String-array containing the keys","     * @param {Function} callback will be returned with 2 parameters:<br>","     * <ul><li>err (String) only process the returnvalue when err===null</li>","     * <li>result (Object) where the fields are specified by <b>key</b> and key-values are types (String|Number|Boolean|Array|Date|RegExp|Object)</li>","     * <li>notfound (Array) containing the fields whose values are not found</li>","     * </ul>","     * @param {Object} [context] this in the callbackfunction","     * @param {Simpletype|Object|Array} [args] returns as the fourth parameter of the callback-function","     * @private","     * @return {Function} callback(err, result, notfound, args) as second parameter","     */","    _getItemsLocal: function (keys, callback, context, args) {","        var instance = this,","            returnvalue = null,","            err = null,","            finalresult = {},","            notfound = [],","            stack = new Y.Parallel(),","            isarray = Y.Lang.isArray(keys);","        if ((instance.storageMode === instance.MODE_NOOP) || (instance.storageMode === instance.MODE_SERVER) || !isarray) {","            if (!isarray) {","            }","            if (Y.Lang.isFunction(callback)) {","                Y.rbind(callback, context, isarray ? 'no appropriate storageMode for _getItemsLocal' : 'Supplied keys is not an array', null, null, args)();","            }","            return;","        }","        Y.Array.each(","            keys,","            function(key, index, keyarray) {","                instance._getItemLocal(","                    key,","                    stack.add(","                        function(geterror, result) {","                            if (!geterror && result) {","                                finalresult[key] = result;","                            }","                            else {","                                if (geterror) {","                                    // save the last error will do","                                    err = geterror;","                                }","                                notfound.push(key);","                            }","                        }","                    ),","                    instance","                );","            },","            instance","        );","        stack.done(","            function() {","                if (Y.Lang.isFunction(callback)) {","                    Y.rbind(callback, context, err, finalresult, notfound, args)();","                }","            }","        );","    },","","    /**","     * Returns the item from server-store with the specified key, or <code>null</code> if the item","     * was not found.","     *","     * @method _getItemsServer","     * @param {Array} keys String-array containing the keys","     * @param {Function} callback will be returned with 2 parameters:<br>","     * <ul><li>err (String) only process the returnvalue when err===null</li>","     * <li>result (Object) where the fields are specified by <b>key</b> and key-values are types (String|Number|Boolean|Array|Date|RegExp|Object)</li>","     * <li>notfound (Array) containing the fields whose values are not found</li>","     * </ul>","     * @param {Object} [context] this in the callbackfunction","     * @param {Simpletype|Object|Array} [args] returns as the fourth parameter of the callback-function","     * @param {String} [localError] chained error passed by _getItemsLocal","     * @localData {Object} [localData] chained data found by _getItemsLocal","     * @private","     * @return {Function} callback(err, result, notfound, args) as second parameter","     */","    _getItemsServer: function (keys, callback, context, args, localError, localData) {","        var instance = this,","            url,","            isarray = Y.Lang.isArray(keys),","            stringifyItems;","        if (!isarray) {","            if (Y.Lang.isFunction(callback)) {","                Y.rbind(callback, context, 'Supplied keys is not an array', null, null, args)();","            }","            return;","        }","        if (!instance._serverBkpExists) {","            if (Y.Lang.isFunction(callback)) {","                Y.rbind(callback, context, null, null, null, args)();","            }","            return;","        }","        if (instance.server) {","            if (instance._storageCookieEnabled()) {","                url = instance.server + '?' + instance.uriGetItem + '&'+instance.COOKIE_ID+'=' + instance._readCookie() + '&keys=' + encodeURIComponent(Y.JSON.stringify(keys)) + '&callback={callback}';","                Y.jsonp(","                    url,","                    {","                        on: {","                            success: function(data) {","                                // data.result is an object with key/value. Only thing is: the values are String (with type-flag) and should be transformed to the right type","                                var instance = this,","                                    returnvalue = data.result,","                                    objectkeyarray = Y.Object.keys(returnvalue);","                                Y.Array.each(","                                    objectkeyarray,","                                    function(key, index, keyarray) {","                                        returnvalue[key] = instance._getCorrectItemType(returnvalue[key]);","                                    },","                                    instance","                                );","                                Y.rbind(callback, context, null, Y.Lang.isObject(localData) ? Y.merge(localData, returnvalue) : returnvalue, data.notfound, args)();","                            },","                            failure: function() {","                                if (Y.Lang.isFunction(callback)) {","                                    Y.rbind(callback, context, (localError ? localError + ' + ' : '') + 'failed to connect to server', localData, keys, args)();","                                }","                            },","                            timeout: function() {","                                if (Y.Lang.isFunction(callback)) {","                                    Y.rbind(callback, context, (localError ? localError + ' + ' : '') + 'connection time-out server', localData, keys, args)();","                                }","                            }","                        },","                        context: instance,","                        timeout: instance._serverTimeout","                    }","                );","            }","            else {","                if (Y.Lang.isFunction(callback)) {","                    Y.rbind(callback, context, (localError ? localError + ' + ' : '') + 'Cookie-errror: You must accept Cookies in order to store data', localData, keys, args)();","                }","            }","        }","        else {","            if (Y.Lang.isFunction(callback)) {","                Y.rbind(callback, context, (localError ? localError + ' + ' : '') + 'setRemoteStorageServer is not set in the right way', localData, keys, args)();","            }","        }","    },","","    /**","     * Returns the number of items in the store.","     *","     * @method length","     * @param {Function} callback will be returned with 2 parameters:<br>","     * <ul><li>err (String) only process the returnvalue when err===null</li><li>result (Number)</li></ul>","     * @param {Object} [context] this in the callbackfunction","     * @param {Simpletype|Object|Array} [args] returns as the firth parameter of the callback-function","     * @return {Function} callback(err, result, args) as the first parameter","     */","    length: function (callback, context, args) {","        var instance = this;","        if (instance.storageMode === instance.MODE_SERVER) {","            instance._lengthServer(callback, context, args, 0);","        }","        else {","            if (instance.serverStoragePosible()) {","                instance._lengthLocal(","                    function(err, data) {","                        instance._lengthServer(callback, context, args, ((data && !err) ? data : 0), err);","                    },","                    instance","                );","            }","            else {","                instance._lengthLocal(callback, context, args);","            }","        }","    },","","    /**","     * Returns the number of items in the store excluded the private ones that are used by this module","     *","     * @method _lengthLocal","     * @param {Function} callback will be returned with 2 parameters:<br>","     * <ul><li>err (String) only process the returnvalue when err===null</li><li>result (Number)</li></ul>","     * @param {Object} [context] this in the callbackfunction","     * @param {Simpletype|Object|Array} [args] returns as the firth parameter of the callback-function","     * @private","     * @return {Function} callback(err, result, args) as the first parameter","     */","    _lengthLocal: function (callback, context, args) {","        var instance = this,","            count = 0,","            err = null,","            key;","        if (instance.storageMode === instance.MODE_HTML5 || instance.storageMode === instance.MODE_GECKO) {","            try {","                count = instance.storageDriver.length;","            }","            catch(catcherr) {","                err = catcherr.message;","            }","            Y.rbind(callback, context, err, count, args)();","        }","        else if (instance.storageMode === instance.MODE_DB || instance.storageMode === instance.MODE_USERDATA) {","            if (instance.initialised_DB_USER_DATA) {","                for (key in instance.data) {","                    if (instance.data.hasOwnProperty(key)) {","                        count += 1;","                    }","                }","                Y.rbind(callback, context, null, count, args)();","            }","            else {","                Y.on(","                    instance.EVT_READY,","                    function() {","                        var key;","                        for (key in instance.data) {","                            if (instance.data.hasOwnProperty(key)) {","                                count += 1;","                            }","                        }","                        Y.rbind(callback, context, null, count, args)();","                    },","                    instance","                );","            }","","        }","        else if (Y.Lang.isFunction(callback)) {","            Y.rbind(callback, context, 'no appropriate storageMode for _lengthLocal', 0, args)();","        }","    },","","    /**","     * Returns the number of items in the store.","     *","     * @method _lengthServer","     * @param {Function} callback will be returned with 2 parameters:<br>","     * <ul><li>err (String) only process the returnvalue when err===null</li><li>result (Number)</li></ul>","     * @param {Object} [context] this in the callbackfunction","     * @param {Simpletype|Object|Array} [args] returns as the firth parameter of the callback-function","     * @param {String} [localLength] length local passed by _lengthLocal","     * @param {String} [localError] chained error passed by _lengthLocal","     * @private","     * @return {Function} callback(err, result, args) as the first parameter","     */","    _lengthServer: function (callback, context, args, localLength, localError) {","        var instance = this,","            url,","            stringifyItems;","        if (!instance._serverBkpExists) {","            if (Y.Lang.isFunction(callback)) {","                Y.rbind(callback, context, null, 0, args)();","            }","            return;","        }","        if (instance.server) {","            if (instance._storageCookieEnabled()) {","                url = instance.server + '?' + instance.uriGetLength + '&'+instance.COOKIE_ID+'=' + instance._readCookie() + '&callback={callback}';","                Y.jsonp(","                    url,","                    {","                        on: {","                            success: function(data) {","                                data = parseInt(data, 10);","                                Y.rbind(callback, context, null, (Y.Lang.isNumber(data) ? data : 0) + (localLength || 0), args)();","                            },","                            failure: function() {","                                if (Y.Lang.isFunction(callback)) {","                                    Y.rbind(callback, context, (localError ? localError + ' + ' : '') + 'failed to connect to server', 0, args)();","                                }","                            },","                            timeout: function() {","                                if (Y.Lang.isFunction(callback)) {","                                    Y.rbind(callback, context, (localError ? localError + ' + ' : '') + 'connection time-out server', 0, args)();","                                }","                            }","                        },","                        context: instance,","                        timeout: instance._serverTimeout","                    }","                );","            }","            else {","                if (Y.Lang.isFunction(callback)) {","                    Y.rbind(callback, context, (localError ? localError + ' + ' : '') + 'Cookie-errror: You must accept Cookies in order to store data', 0, args)();","                }","            }","        }","        else {","            if (Y.Lang.isFunction(callback)) {","                Y.rbind(callback, context, (localError ? localError + ' + ' : '') + 'setRemoteStorageServer is not set in the right way', 0, args)();","            }","        }","    },","","    /**","     * Removes the item with the specified key.","     *","     * @method removeItem","     * @param {String} key","     * @param {Function} callback will be returned with 1 parameters:<br>","     * <ul><li>err (String) only process the returnvalue when err===null</li></ul>","     * @param {Object} [context] this in the callbackfunction","     * @param {Simpletype|Object|Array} [args] returns as the second parameter of the callback-function","     */","    removeItem: function (key, callback, context, args) {","        var instance = this;","        if (instance.storageMode === instance.MODE_SERVER) {","            instance._removeItemServer(key, callback, context, args);","        }","        else {","            if (instance.serverStoragePosible()) {","                instance._removeItemLocal(","                    key,","                    function(err) {","                        instance._removeItemServer(key, callback, context, args, err);","                    },","                    instance","                );","            }","            else {","                instance._removeItemLocal(key, callback, context, args);","            }","        }","    },","","    /**","     * Removes the item with the specified key.","     *","     * @method _removeItemLocal","     * @private","     * @param {String} key","     * @param {Function} callback will be returned with 1 parameter:<br>","     * <ul><li>err (String) only process the returnvalue when err===null</li></ul>","     * @param {Object} [context] this in the callbackfunction","     * @param {Simpletype|Object|Array} [args] returns as the second parameter of the callback-function","     */","    _removeItemLocal: function (key, callback, context, args) {","        var instance = this,","            err = null;","        if (instance.storageMode === instance.MODE_DB || instance.storageMode === instance.MODE_USERDATA) {","            if (instance.initialised_DB_USER_DATA) {","                delete instance.data[key];","                instance._setItemLocal_OldBrowsers(null, null, callback, context, args);","            }","            else {","                Y.on(","                    instance.EVT_READY,","                    function() {","                        delete instance.data[key];","                        instance._setItemLocal_OldBrowsers(null, null, callback, context, args);","                    },","                    instance","                );","            }","        }","        else if (instance.storageMode === instance.MODE_HTML5 || instance.storageMode === instance.MODE_GECKO) {","            try {","                instance.storageDriver.removeItem(key);","            }","            catch(catcherr) {","                err = catcherr.message;","            }","            if (Y.Lang.isFunction(callback)) {","                Y.rbind(callback, context, err, args)();","            }","        }","        else if (Y.Lang.isFunction(callback)) {","            Y.rbind(callback, context, 'no appropriate storageMode for _removeItemLocal', args)();","        }","    },","","    /**","     * Removes the item with the specified key. The remoteserver SHOULD return the remaining length of the storage in the response-data.","     * Also make it possible for the remoteserver to delete multiple array.","     *","     * @method _removeItemServer","     * @private","     * @param {String|Array} key or keys (String-array)","     * @param {Function} callback will be returned with 1 parameter:<br>","     * <ul><li>err (String) only process the returnvalue when err===null</li></ul>","     * @param {Object} [context] this in the callbackfunction","     * @param {Simpletype|Object|Array} [args] returns as the second parameter of the callback-function","     * @param {String} [localError] chained error passed by _setItemLocal","     */","    _removeItemServer: function (key, callback, context, args, localError) {","        var instance = this,","            url,","            isarray = Y.Lang.isArray(key),","            stringifyItems;","        if (!instance._serverBkpExists) {","            if (Y.Lang.isFunction(callback)) {","                Y.rbind(callback, context, null, args)();","            }","            return;","        }","        if (instance.server) {","            if (instance._storageCookieEnabled()) {","                url = instance.server + '?' + instance.uriRemoveItem + '&'+instance.COOKIE_ID+'=' + instance._readCookie() + '&' + (isarray ? 'keys' : 'key') + '=' + encodeURIComponent(isarray ? Y.JSON.stringify(key) : key) + '&callback={callback}';","                Y.jsonp(","                    url,","                    {","                        on: {","                            // data = remaining length","                            success: function(data) {","                                if (Y.Lang.isFunction(callback)) {","                                    Y.rbind(callback, context, localError, args)();","                                }","                                if (data) {","                                    instance._serverBkpExists = (data>0);","                                }","                            },","                            failure: function() {","                                if (Y.Lang.isFunction(callback)) {","                                    Y.rbind(callback, context, (localError ? localError + ' + ' : '') + 'failed to connect to server', args)();","                                }","                            },","                            timeout: function() {","                                if (Y.Lang.isFunction(callback)) {","                                    Y.rbind(callback, context, (localError ? localError + ' + ' : '') + 'connection time-out server', args)();","                                }","                            }","                        },","                        context: instance,","                        timeout: instance._serverTimeout","                    }","                );","            }","            else {","                if (Y.Lang.isFunction(callback)) {","                    Y.rbind(callback, context, (localError ? localError + ' + ' : '') + 'Cookie-errror: You must accept Cookies in order to store data', args)();","                }","            }","        }","        else {","            if (Y.Lang.isFunction(callback)) {","                Y.rbind(callback, context, (localError ? localError + ' + ' : '') + 'setRemoteStorageServer is not set in the right way', args)();","            }","        }","    },","","    /**","     * Removes the item with the specified key.","     *","     * @method removeItems","     * @param {Array} keys (String-array)","     * @param {Function} callback will be returned with 1 parameters:<br>","     * <ul><li>err (String) only process the returnvalue when err===null</li></ul>","     * @param {Object} [context] this in the callbackfunction","     * @param {Simpletype|Object|Array} [args] returns as the second parameter of the callback-function","     */","    removeItems: function (keys, callback, context, args) {","        var instance = this;","        if (instance.storageMode === instance.MODE_SERVER) {","            instance._removeItemsServer(keys, callback, context, args);","        }","        else {","            if (instance.serverStoragePosible()) {","                instance._removeItemsLocal(","                    keys,","                    function(err) {","                        instance._removeItemsServer(keys, callback, context, args, err);","                    },","                    instance","                );","            }","            else {","                instance._removeItemsLocal(keys, callback, context, args);","            }","        }","    },","","    /**","     * Removes the item with the specified key.","     *","     * @method _removeItemsLocal","     * @private","     * @param {Array} keys (String-array)","     * @param {Function} callback will be returned with 1 parameter:<br>","     * <ul><li>err (String) only process the returnvalue when err===null</li></ul>","     * @param {Object} [context] this in the callbackfunction","     * @param {Simpletype|Object|Array} [args] returns as the second parameter of the callback-function","     */","    _removeItemsLocal: function (keys, callback, context, args) {","        var instance = this,","            isarray = Y.Lang.isArray(keys),","            err = null;","        if (!isarray) {","            if (Y.Lang.isFunction(callback)) {","                Y.rbind(callback, context, 'Supplied keys is not an array', args)();","            }","            return;","        }","        if (instance.storageMode === instance.MODE_DB || instance.storageMode === instance.MODE_USERDATA) {","            if (instance.initialised_DB_USER_DATA) {","                Y.Array.each(","                    keys,","                    function(key, index, keysarray) {","                        delete instance.data[key];","                    },","                    instance","                );","                instance._setItemLocal_OldBrowsers(null, null, callback, context, args);","            }","            else {","                Y.on(","                    instance.EVT_READY,","                    function() {","                        Y.Array.each(","                            keys,","                            function(key, index, keysarray) {","                                delete instance.data[key];","                            },","                            instance","                        );","                        instance._setItemLocal_OldBrowsers(null, null, callback, context, args);","                    },","                    instance","                );","            }","        }","        else if (instance.storageMode === instance.MODE_HTML5 || instance.storageMode === instance.MODE_GECKO) {","            try {","                Y.Array.each(","                    keys,","                    function(key, index, keysarray) {","                        instance.storageDriver.removeItem(key);","                    },","                    instance","                );","            }","            catch(catcherr) {","                err = catcherr.message;","            }","            if (Y.Lang.isFunction(callback)) {","                Y.rbind(callback, context, err, args)();","            }","        }","        else if (Y.Lang.isFunction(callback)) {","            Y.rbind(callback, context, 'no appropriate storageMode for _removeItemLocal', args)();","        }","    },","","    /**","     * Removes the item with the specified key. The remoteserver SHOULD return the remaining length of the storage in the response-data","     *","     * @method _removeItemsServer","     * @private","     * @param {Array} keys (String-array)","     * @param {Function} callback will be returned with 1 parameter:<br>","     * <ul><li>err (String) only process the returnvalue when err===null</li></ul>","     * @param {Object} [context] this in the callbackfunction","     * @param {Simpletype|Object|Array} [args] returns as the second parameter of the callback-function","     * @param {String} [localError] chained error passed by _setItemLocal","     */","    _removeItemsServer: function (keys, callback, context, args, localError) {","        if (!Y.Lang.isArray(keys)) {","            if (Y.Lang.isFunction(callback)) {","                Y.rbind(callback, context, 'Supplied keys is not an array', args)();","            }","            return;","        }","        this._removeItemServer(keys, callback, context, args, localError);","    },","","    /**","     * Stores an item under the specified key. If the key already exists in the","     * data store, it will be replaced.","     *","     * @method setItem","     * @param {String} key","     * @param {String|Number|Boolean|Array|Date|RegExp|Object} value","     * @param {Function} callback will be returned with 1 parameter:<br>","     * <ul><li>err (String) only process the returnvalue when err===null</li></ul>","     * @param {Object} [context] this in the callbackfunction","     * @param {Simpletype|Object|Array} [args] returns as the second parameter of the callback-function","     */","    setItem: function (key, value, callback, context, args) {","        var instance = this;","        if (!Y.Lang.isString(key)) {","            if (Y.Lang.isFunction(callback)) {","                Y.rbind(callback, context, 'no valid key(String) is given', args)();","            }","            return;","        }","        if (!Y.Lang.isValue(value)) {","            instance.removeItem(key, callback, context, args);","        }","        else {","            if (instance.storageMode === instance.MODE_SERVER) {","                instance._setItemServer(key, value, callback, context, args);","            }","            else {","                if (instance.serverStoragePosible()) {","                    instance._setItemLocal(","                        key,","                        value,","                        function(err) {","                            if (!err) {","                                // no need to be kept on the server: remove it there","                                instance._removeItemServer(key, callback, context, args);","                            }","                            else {","                                instance._setItemServer(key, value, callback, context, args, err);","                            }","                        },","                        instance","                    );","                }","                else {","                    instance._setItemLocal(key, value, callback, context, args);","                }","            }","        }","    },","","    /**","     * Stores an item under the specified key. If the key already exists in the","     * data store, it will be replaced.","     *","     * @method _setItemLocal","     * @param {String} key","     * @param {String|Number|Boolean|Array|Date|RegExp|Object} value","     * @param {Function} callback will be returned with 1 parameter:<br>","     * <ul><li>err (String) only process the returnvalue when err===null</li></ul>","     * @param {Object} [context] this in the callbackfunction","     * @param {Simpletype|Object|Array} [args] returns as the second parameter of the callback-function","     * @private","     */","    _setItemLocal: function (key, value, callback, context, args) {","        var instance = this,","            err = null,","            transformedValue = instance._transformItemType(value, false);","        if (!transformedValue) {","            if (Y.Lang.isFunction(callback)) {","                Y.rbind(callback, context, 'key: '+key+' --> value is null: key is not stored', args)();","            }","            return;","        }","        if (instance.storageMode === instance.MODE_DB || instance.storageMode === instance.MODE_USERDATA) {","            instance._setItemLocal_OldBrowsers(key, transformedValue, callback, context, args);","        }","        else if (instance.storageMode === instance.MODE_HTML5 || instance.storageMode === instance.MODE_GECKO) {","            try {","                instance.storageDriver.setItem(key, transformedValue);","            }","            catch(catcherr) {","                err = catcherr.message;","            }","            if (Y.Lang.isFunction(callback)) {","                Y.rbind(callback, context, err, args)();","            }","        }","        else if (Y.Lang.isFunction(callback)) {","            Y.rbind(callback, context, 'no appropriate storageMode for _setItemLocal', args)();","        }","    },","","    /**","     * Stores an item under the specified key. If the key already exists in the","     * data store, it will be replaced.","     *","     * @method _setItemServer","     * @param {String} key","     * @param {String|Number|Boolean|Array|Date|RegExp|Object} value","     * @param {Function} callback will be returned with 1 parameter1:<br>","     * <ul><li>err (String) only process the returnvalue when err===null</li></ul>","     * @param {Object} [context] this in the callbackfunction","     * @param {Simpletype|Object|Array} [args] returns as the second parameter of the callback-function","     * @param {String} [localError] chained error passed by _setItemLocal","     * @private","     */","    _setItemServer: function (key, value, callback, context, args, localError) {","        var instance = this,","            url,","            transformedValue = instance._transformItemType(value, true);","        if (!transformedValue) {","            if (Y.Lang.isFunction(callback)) {","                Y.rbind(callback, context, 'key: '+key+' --> value is null: key is not stored', args)();","            }","            return;","        }","        if (instance.server) {","            if (instance._storageCookieEnabled()) {","                url = instance.server + '?' + instance.uriSetItem + '&'+instance.COOKIE_ID+'=' + instance._readCookie() + '&key=' + encodeURIComponent(key) + '&value='+encodeURIComponent(transformedValue)+'&callback={callback}';","                Y.jsonp(","                    url,","                    {","                        on: {","                            success: function(data) {","                                if (Y.Lang.isFunction(callback)) {","                                    Y.rbind(callback, context, localError, args)();","                                }","                                // now update that there is anything in the server","                                instance._serverBkpExists = true;","                            },","                            failure: function() {","                                if (Y.Lang.isFunction(callback)) {","                                    Y.rbind(callback, context, (localError ? localError + ' + ' : '') + 'failed to connect to server', args)();","                                }","                            },","                            timeout: function() {","                                if (Y.Lang.isFunction(callback)) {","                                    Y.rbind(callback, context, (localError ? localError + ' + ' : '') + 'connection time-out server', args)();","                                }","                            }","                        },","                        context: instance,","                        timeout: instance._serverTimeout","                    }","                );","            }","            else {","                if (Y.Lang.isFunction(callback)) {","                    Y.rbind(callback, context, (localError ? localError + ' + ' : '') + 'Cookie-errror: You must accept Cookies in order to store data', args)();","                }","            }","        }","        else {","            if (Y.Lang.isFunction(callback)) {","                Y.rbind(callback, context, (localError ? localError + ' + ' : '') + 'setRemoteStorageServer is not set in the right way', args)();","            }","        }","    },","","    /**","     * Stores an item under the specified key. If the key already exists in the","     * data store, it will be replaced.","     *","     * @method setItems","     * @param {Array} keyvaluepairs is an Array that contains arrays, where the first field is the key-string and the second field a the value.<br>","     * for example: [[\"key1\": \"someitem\"], [\"key2\": 10], [\"key3\": new Date()]]","     * @param {Function} callback will be returned with 3 parameter2:<br>","     * <ul><li>err (String) only process the returnvalue when err===null</li>","     * <li>itemsset (Array) contains Strings with the keys that are successfuly set</li>","     * <li>itemsnotset (Array) contains arrays with the key/value pairs that are failed to set</li></ul>","     * @param {Object} [context] this in the callbackfunction","     * @param {Simpletype|Object|Array} [args] returns as the fourth parameter of the callback-function","     */","    setItems: function (keyvaluepairs, callback, context, args) {","        var instance = this;","        if (instance.storageMode === instance.MODE_SERVER) {","            instance._setItemsServer(keyvaluepairs, callback, context, args);","        }","        else {","            if (instance.serverStoragePosible()) {","                instance._setItemsLocal(","                    keyvaluepairs,","                    function(err, itemsset, itemsnotset) {","                        var notAllDone = (Y.Lang.isArray(itemsnotset) && (itemsnotset.length>0));","                        if (itemsset) {","                            // itemsset is a String-array","                            // no need to be kept on the server: remove it there","                            // it depends on whether there are items to be stored if we want to callback or not","                            instance._removeItemsServer(itemsset, false, context, args);","                            if (!notAllDone && Y.Lang.isFunction(callback)) {","                                Y.rbind(callback, context, err, itemsset, itemsnotset, args)();","                            }","                        }","                        if (notAllDone) {","                            // trying to store the remaining items on the server","                            // itemsset is a keyvaluepairs-array","                            instance._setItemsServer(itemsnotset, callback, context, args, err, itemsset);","                        }","                    },","                    instance","                );","            }","            else {","                instance._setItemsLocal(keyvaluepairs, callback, context, args);","            }","        }","    },","","    /**","     * Stores an item under the specified key. If the key already exists in the","     * data store, it will be replaced.","     *","     * @method _setItemsLocal","     * @param {Array} keyvaluepairs is an Array that contains arrays, where the first field is the key-string and the second field a the value.<br>","     * for example: [[\"key1\": \"someitem\"], [\"key2\": 10], [\"key3\": new Date()]]","     * @param {Function} callback will be returned with 3 parameter2:<br>","     * <ul><li>err (String) only process the returnvalue when err===null</li>","     * <li>itemsset (Array) contains Strings with the keys that are successfuly set</li>","     * <li>itemsnotset (Array) contains arrays with the key/value pairs that are failed to set</li></ul>","     * @param {Object} [context] this in the callbackfunction","     * @param {Simpletype|Object|Array} [args] returns as the fourth parameter of the callback-function","     * @private","     */","    _setItemsLocal: function (keyvaluepairs, callback, context, args) {","        var instance = this,","            err = null,","            itemsset = [],","            itemsnotset = [],","            isarray = Y.Lang.isArray(keyvaluepairs),","            stack = new Y.Parallel();","        if ((instance.storageMode === instance.MODE_NOOP) || (instance.storageMode === instance.MODE_SERVER) || !isarray) {","            if (!isarray) {","            }","            if (Y.Lang.isFunction(callback)) {","                Y.rbind(callback, context, isarray ? 'no appropriate storageMode for _setItemsLocal' : 'Supplied keyvaluepairs is not an array', null, null, args)();","            }","            return;","        }","        Y.Array.each(","            keyvaluepairs,","            function(keyvaluepair, index, keyvaluepairsarray) {","                if (Y.Lang.isArray(keyvaluepair) && (keyvaluepair.length===2)) {","                    instance._setItemLocal(","                        keyvaluepair[0],","                        keyvaluepair[1],","                        stack.add(","                            function(seterror) {","                                if (!seterror) {","                                    itemsset.push(keyvaluepair[0]);","                                }","                                else {","                                    itemsnotset.push(keyvaluepair);","                                }","                            }","                        ),","                        instance","                    );","                }","                else {","                    err = 'keyvaluepairs subitem is not a 2-dim-array';","                }","            },","            instance","        );","        stack.done(","            function() {","                if (Y.Lang.isFunction(callback)) {","                    Y.rbind(callback, context, err, itemsset, itemsnotset, args)();","                }","            }","        );","    },","","    /**","     * Stores an item under the specified key. If the key already exists in the","     * data store, it will be replaced.","     *","     * @method _setItemsServer","     * @param {Array} keyvaluepairs is an Array that contains arrays, where the first field is the key-string and the second field a the value.<br>","     * for example: [[\"key1\": \"someitem\"], [\"key2\": 10], [\"key3\": new Date()]]","     * @param {Function} callback will be returned with 3 parameter2:<br>","     * <ul><li>err (String) only process the returnvalue when err===null</li>","     * <li>itemsset (Array) contains Strings with the keys that are successfuly set</li>","     * <li>itemsnotset (Array) contains arrays with the key/value pairs that are failed to set</li></ul>","     * @param {Object} [context] this in the callbackfunction","     * @param {Simpletype|Object|Array} [args] returns as the fourth parameter of the callback-function","     * @param {String} [localError] chained error passed by _setItemLocal","     * @param {Array} [localSetItems] chained String-array of passed stored keys by _setItemsLocal","     * @private","     */","    _setItemsServer: function (keyvaluepairs, callback, context, args, localError, localSetItems) {","        var instance = this,","            url;","        if (!localSetItems) {","            localSetItems = [];","        }","        if (instance.server) {","            Y.Array.each(","                keyvaluepairs,","                function(keyvaluepair, index, keyvaluepairssarray) {","                    // keyvaluepair[0] should be a String","                    // keyvaluepair[1] can be any type","                    if (Y.Lang.isArray(keyvaluepair) && (keyvaluepair.length===2)) {","                        keyvaluepair[1] = instance._transformItemType(keyvaluepair[1], true);","                    }","                },","                instance","            );","            if (instance._storageCookieEnabled()) {","                url = instance.server + '?' + instance.uriSetItem + '&'+instance.COOKIE_ID+'=' + instance._readCookie() + '&keyvalues='+encodeURIComponent(Y.JSON.stringify(keyvaluepairs))+'&callback={callback}';","                Y.jsonp(","                    url,","                    {","                        on: {","                            success: function(data) {","                                // we may assume all keyvalue pairs are stored","                                if (Y.Lang.isFunction(callback)) {","                                    // add the items that are set","                                    Y.Array.each(","                                        keyvaluepairs,","                                        function(keyvaluepair, index, keyvaluepairsarray) {","                                            if (Y.Lang.isArray(keyvaluepair)) {","                                                localSetItems.push(keyvaluepair[0]);","                                            }","                                        },","                                        instance","                                    );","                                    Y.rbind(callback, context, localError, localSetItems, null, args)();","                                }","                                // now update that there is anything in the server","                                instance._serverBkpExists = true;","                            },","                            failure: function() {","                                if (Y.Lang.isFunction(callback)) {","                                    Y.rbind(callback, context, (localError ? localError + ' + ' : '') + 'failed to connect to server', localSetItems, keyvaluepairs, args)();","                                }","                            },","                            timeout: function() {","                                if (Y.Lang.isFunction(callback)) {","                                    Y.rbind(callback, context, (localError ? localError + ' + ' : '') + 'connection time-out server', localSetItems, keyvaluepairs, args)();","                                }","                            }","                        },","                        context: instance,","                        timeout: instance._serverTimeout","                    }","                );","            }","            else {","                if (Y.Lang.isFunction(callback)) {","                    Y.rbind(callback, context, (localError ? localError + ' + ' : '') + 'Cookie-errror: You must accept Cookies in order to store data', localSetItems, keyvaluepairs, args)();","                }","            }","        }","        else {","            if (Y.Lang.isFunction(callback)) {","                Y.rbind(callback, context, (localError ? localError + ' + ' : '') + 'setRemoteStorageServer is not set in the right way', localSetItems, keyvaluepairs, args)();","            }","        }","    },","","    /**","     * When this is set, storage may happen on a remoteserver. Always (overruling localstorage) when force is set true, or otherwise as fallback when no","     * appropriate storagemechanism is found OR in case the mode is MODE_USERDATA and the DB_size is full.","     * The remoteserver will be called through jsonp, so cross-domain and sll are possible. The remoteserver should generate the respons conform http://yuilibrary.com/yui/docs/jsonp/<br>","     * The requeststring will be generated automaticly, always with a unique sessionparameter <b>itsastorageid</b> which should be used to identify the clientstorage on the server. Furthermore,","     * <b>key</b> and <b>value</b> may also be send as parameters. And always <b>callback</b> is send as a parameter, conform jsonp.","     *","     * @method setRemoteStorageServer","     * @param {String} server serveradres to be called, f.i. <i>https://www.mydomain.com</i>","     * @param {String} uriSetItem the parameters that tells your server to set an item, f.i. <i>action=set</i>","     * @param {String} uriGetItem the parameters that tells your server to get an item, f.i. <i>action=get</i>","     * @param {String} uriGetLength the parameters that tells your server to get the number of items, f.i. <i>action=length</i>","     * @param {String} uriRemoveItem the parameters that tells your server to remove an item, f.i. <i>action=remove</i>","     * @param {String} uriClear the parameters that tells your server to clear an item, f.i. <i>action=clear</i>","     * @param {Boolean} [force] (default=false) whether to use serverstorage no matter what. When set to false, remote-storage will only be used as a fall-back in case appropriate storagemechanism is found OR in case the mode is MODE_USERDATA and the DB_size is full.","     */","    setRemoteStorageServer: function(server, uriSetItem, uriGetItem, uriGetLength, uriRemoveItem, uriClear, force, serverTimeout) {","        var instance = this;","        if (Y.Lang.isString(server) && (server!==instance.server)) {","            instance.server = server;","            instance.uriSetItem = uriSetItem;","            instance.uriGetItem = uriGetItem;","            instance.uriGetLength = uriGetLength;","            instance.uriRemoveItem = uriRemoveItem;","            instance.uriClear = uriClear;","            if (serverTimeout) {","                instance._serverTimeout = serverTimeout;","            }","            if (Y.Lang.isBoolean(force) && force) {","                instance.storageMode = instance.MODE_SERVER;","            }","            instance._serverStorageCanbemade = true;","            // instance._serverBkpExists must be set to true, otherwise _lengthServer() won't excecute","            instance._serverBkpExists = true;","            instance._lengthServer(","                function(err, result) {","                    if (!err && result) {","                        instance._serverBkpExists = (result>0);","                    }","                    else {","                        instance._serverStorageCanbemade = false;","                    }","                },","                instance","            );","        }","        else {","        }","    },","","    /**","     * Will stringify the value with the right type-flag for storage","     *","     * @method _transformItemType","     * @param {String|Number|Boolean|Array|RegExp|Date|Object|null} value","     * @param {Boolean} onServer is needed to escape \" and ' of the value in order to make it possible to store to local database without problems","     * @return (String) stringified value","     * @private","     */","     _transformItemType: function(value, onServer) {","        var instance = this,","            transformedValue;","        if (Y.Lang.isString(value)) {","            transformedValue = instance.TYPE_STRING + value;","        }","        if (Y.Lang.isNumber(value)) {","            transformedValue = (Math.round(value)===value) ? (instance.TYPE_INT + value) : (instance.TYPE_FLOAT + value);","        }","        else if (Y.Lang.isBoolean(value)) {","            // boolean can be stored as one character","            transformedValue = instance.TYPE_BOOLEAN + (value ? '1' : '0');","        }","        else if (Y.Lang.isArray(value)) {","            transformedValue = instance.TYPE_ARRAY + Y.JSON.stringify(value);","        }","        else if (Y.Lang.isDate(value)) {","            transformedValue = instance.TYPE_DATE + value.getTime();","        }","        else if (Y.Lang.type(value)==='regexp') {","            transformedValue = instance.TYPE_REGEXP + '{\"source\":\"'+value.source+'\",\"global\":'+value.global+',\"ignoreCase\":'+value.ignoreCase+',\"lastIndex\":'+value.lastIndex+',\"multiline\":'+value.multiline+'}';","        }","        else if (Y.Lang.isObject(value)) {","            transformedValue = instance.TYPE_OBJECT + Y.JSON.stringify(value);","        }","        transformedValue = transformedValue.replace(/\\\\n/g, '').replace(/\\\\r/g, '');","        // When we store on the server, then we migth want to escape \" and '. Only do this in case you JSONStringyfied\"","        return onServer ? transformedValue.replace(/\"/g, '\\\\\"').replace(/'/g, \"\\\\'\") : transformedValue;","     },","","    /**","     * Will transform the stored item (which is a String-type) to the right type","     *","     * @method _getCorrectItemType","     * @param {String} item","     * @return (String|Number|Boolean|Array|RegExp|Date|Object|null) the item in the right type","     * @private","     */","    _getCorrectItemType: function(item) {","        var instance = this,","            returnvalue,","            itemremain,","            regexpObject,","            type;","        if (!Y.Lang.isString(item)) {return item;}","        type = item.substr(0,1);","        itemremain = item.substr(1);","        if (type === instance.TYPE_STRING) {","            returnvalue = itemremain;","        }","        else if (type === instance.TYPE_INT) {","            returnvalue = parseInt(itemremain, 10);","        }","        else if (type === instance.TYPE_FLOAT) {","            returnvalue = parseFloat(itemremain);","        }","        else if (type === instance.TYPE_BOOLEAN) {","            returnvalue = (itemremain==='1');","        }","        else if (type === instance.TYPE_ARRAY) {","            try {","                returnvalue = Y.JSON.parse(itemremain);","            }","            catch(e) {","                returnvalue = itemremain;","            }","        }","        else if (type === instance.TYPE_DATE) {","            returnvalue = new Date();","            returnvalue.setTime(itemremain);","        }","        else if (type === instance.TYPE_REGEXP) {","            try {","                regexpObject = Y.JSON.parse(itemremain);","                returnvalue = new RegExp(regexpObject.source, (regexpObject.global ? 'g' : '') + (regexpObject.ignoreCase ? 'i' : '') + (regexpObject.multiline ? 'm' : ''));","                returnvalue.lastIndex = regexpObject.lastIndex;","            }","            catch(e2) {","                returnvalue = itemremain;","            }","        }","        else if (type === instance.TYPE_OBJECT) {","            try {","                returnvalue = Y.JSON.parse(itemremain);","            }","            catch(e3) {","                returnvalue = itemremain;","            }","        }","        return returnvalue;","    },","","    /**","     * Private store-method for MODE_DB or MODE_USERDATA.","     * Will call _setItemLocal_OldBrowsers_ReadySafe straight ahead when all is initialized. When not initialized yet, it waits untill all is initialized and will call _setItemLocal_OldBrowsers_ReadySafe by then.","     *","     * @method _setItemLocal_OldBrowsers","     * @param {String} [key]","     * @param {Simpletype|Array|Object} [value]","     * @private","     */","    _setItemLocal_OldBrowsers: function (key, value, callback, context, args) {","        var instance = this;","        if (instance.initialised_DB_USER_DATA) {","            instance._setItemLocal_OldBrowsers_ReadySafe(key, value, callback, context, args);","        }","        else {","            Y.on(","                instance.EVT_READY,","                instance._setItemLocal_OldBrowsers_ReadySafe,","                instance,","                key,","                value,","                callback,","                context,","                args","            );","        }","    },","","    /**","     * Private store-method for MODE_DB or MODE_USERDATA that does the actual saving. Should not be called by hand.","     *","     * @method _setItemLocal_OldBrowsers_ReadySafe","     * @param {String} [key]","     * @param {Simpletype|Array|Object} [value]","     * @private","     */","    _setItemLocal_OldBrowsers_ReadySafe: function (key, value, callback, context, args) {","        var instance = this,","            err = null,","            dataStringified = Y.JSON.stringify(instance.data);","        if (key && value) {","            instance.data[key] = value;","        }","        try {","            if (instance.storageMode === instance.MODE_DB) {","                instance.storageDriver.transaction(function (t) {","                t.executeSql(\"REPLACE INTO \" + instance.DB_NAME + \" (name, value) VALUES ('data', ?)\", [dataStringified]);","                });","            }","            if (instance.storageMode === instance.MODE_USERDATA) {","                instance.storageDriver.setAttribute(instance.USERDATA_NAME, dataStringified);","                instance.storageDriver.save(instance.USERDATA_PATH);","            }","        }","        catch(catcherr) {","            err = catcherr.message;","        }","        if (Y.Lang.isFunction(callback)) {","            Y.rbind(callback, context, err, args)();","        }","    },","","    /**","     * If serverStorage is posible.","     *","     * @method serverStoragePosible","     * @return (Boolean) serverstorage posible or not","     */","    serverStoragePosible: function() {","        var instance = this;","        return (instance.server && instance._serverStorageCanbemade && instance._storageCookieEnabled());","    },","","    /**","     * Checks whether the cookie 'itsastorageid' is set. If not, then it tries to set it.","     *","     * @method _storageCookieEnabled","     * @private","     * @return (Boolean) cookie present or not","     */","    _storageCookieEnabled: function() {","        var instance = this,","            returnvalue = Y.Cookie.exists(instance.COOKIE_ID);","        if (!returnvalue) {","            instance._setCookie();","            returnvalue = Y.Cookie.exists(instance.COOKIE_ID);","        }","        return returnvalue;","    },","","    /**","     * Reads the cookie 'itsastorageid' and returns its value.","     *","     * @method _readCookie","     * @private","     * @return (String|null) the cookievalue","     */","    _readCookie: function() {","        var instance = this,","            returnvalue = Y.Cookie.get(instance.COOKIE_ID);","        return returnvalue;","    },","","    /**","     * Tries to set the cookie 'itsastorageid' with an unique value.","     *","     * @method _setCookie","     * @private","     */","    _setCookie: function() {","        var instance = this,","            current = new Date().getTime(),","            random = Math.random();","        Y.Cookie.set(","            instance.COOKIE_ID,","            current.toString()+Math.round(10000*random).toString(),","            {","                path: \"/\",           //all pages","                expires: new Date(\"January 01, 2099\")","            }","        );","    }","","","});","","if (!Y.Global.ItsaStorage) {","    Y.Global.ItsaStorage = new Y.ITSASTORAGE();","}","Y.ItsaStorage = Y.Global.ItsaStorage;","","}, '@VERSION@', {","    \"requires\": [","        \"yui-base\",","        \"base-build\",","        \"base-base\",","        \"event-base\",","        \"event-custom\",","        \"event-custom-complex\",","        \"json\",","        \"jsonp\",","        \"cookie\",","        \"parallel\"","    ]","});"];
_yuitest_coverage["build/gallery-itsastorage/gallery-itsastorage.js"].lines = {"1":0,"3":0,"39":0,"164":0,"167":0,"168":0,"169":0,"170":0,"171":0,"172":0,"173":0,"174":0,"175":0,"177":0,"180":0,"182":0,"183":0,"187":0,"188":0,"190":0,"191":0,"194":0,"197":0,"198":0,"201":0,"207":0,"208":0,"211":0,"216":0,"218":0,"219":0,"222":0,"223":0,"224":0,"229":0,"230":0,"231":0,"232":0,"234":0,"237":0,"247":0,"249":0,"250":0,"251":0,"255":0,"256":0,"257":0,"258":0,"259":0,"261":0,"263":0,"281":0,"282":0,"283":0,"286":0,"287":0,"289":0,"295":0,"311":0,"313":0,"314":0,"315":0,"316":0,"318":0,"319":0,"320":0,"321":0,"322":0,"328":0,"330":0,"331":0,"332":0,"333":0,"336":0,"339":0,"340":0,"347":0,"348":0,"365":0,"368":0,"369":0,"370":0,"372":0,"374":0,"375":0,"376":0,"377":0,"382":0,"383":0,"384":0,"388":0,"389":0,"393":0,"394":0,"404":0,"405":0,"410":0,"411":0,"430":0,"431":0,"432":0,"435":0,"436":0,"439":0,"440":0,"441":0,"445":0,"452":0,"471":0,"475":0,"477":0,"478":0,"479":0,"481":0,"482":0,"484":0,"487":0,"490":0,"491":0,"494":0,"495":0,"496":0,"497":0,"498":0,"502":0,"505":0,"507":0,"508":0,"515":0,"516":0,"535":0,"538":0,"539":0,"540":0,"542":0,"544":0,"545":0,"546":0,"547":0,"552":0,"554":0,"557":0,"558":0,"562":0,"563":0,"573":0,"574":0,"579":0,"580":0,"600":0,"601":0,"602":0,"605":0,"606":0,"609":0,"610":0,"611":0,"615":0,"622":0,"644":0,"651":0,"652":0,"654":0,"655":0,"657":0,"659":0,"662":0,"666":0,"667":0,"670":0,"672":0,"674":0,"683":0,"685":0,"686":0,"711":0,"715":0,"716":0,"717":0,"719":0,"721":0,"722":0,"723":0,"725":0,"727":0,"728":0,"729":0,"730":0,"736":0,"739":0,"742":0,"746":0,"749":0,"750":0,"754":0,"755":0,"765":0,"766":0,"771":0,"772":0,"788":0,"789":0,"790":0,"793":0,"794":0,"796":0,"802":0,"819":0,"823":0,"824":0,"825":0,"828":0,"830":0,"832":0,"833":0,"834":0,"835":0,"836":0,"839":0,"842":0,"845":0,"846":0,"847":0,"848":0,"851":0,"858":0,"859":0,"877":0,"880":0,"881":0,"882":0,"884":0,"886":0,"887":0,"888":0,"889":0,"894":0,"895":0,"898":0,"899":0,"903":0,"904":0,"914":0,"915":0,"920":0,"921":0,"937":0,"938":0,"939":0,"942":0,"943":0,"946":0,"952":0,"969":0,"971":0,"972":0,"973":0,"974":0,"977":0,"980":0,"981":0,"987":0,"988":0,"989":0,"992":0,"994":0,"995":0,"998":0,"999":0,"1017":0,"1021":0,"1022":0,"1023":0,"1025":0,"1027":0,"1028":0,"1029":0,"1030":0,"1036":0,"1037":0,"1039":0,"1040":0,"1044":0,"1045":0,"1049":0,"1050":0,"1060":0,"1061":0,"1066":0,"1067":0,"1083":0,"1084":0,"1085":0,"1088":0,"1089":0,"1092":0,"1098":0,"1115":0,"1118":0,"1119":0,"1120":0,"1122":0,"1124":0,"1125":0,"1126":0,"1129":0,"1133":0,"1136":0,"1139":0,"1142":0,"1146":0,"1152":0,"1153":0,"1154":0,"1157":0,"1163":0,"1165":0,"1166":0,"1169":0,"1170":0,"1187":0,"1188":0,"1189":0,"1191":0,"1193":0,"1209":0,"1210":0,"1211":0,"1212":0,"1214":0,"1216":0,"1217":0,"1220":0,"1221":0,"1224":0,"1225":0,"1229":0,"1231":0,"1234":0,"1241":0,"1261":0,"1264":0,"1265":0,"1266":0,"1268":0,"1270":0,"1271":0,"1273":0,"1274":0,"1275":0,"1278":0,"1280":0,"1281":0,"1284":0,"1285":0,"1304":0,"1307":0,"1308":0,"1309":0,"1311":0,"1313":0,"1314":0,"1315":0,"1316":0,"1321":0,"1322":0,"1325":0,"1328":0,"1329":0,"1333":0,"1334":0,"1344":0,"1345":0,"1350":0,"1351":0,"1371":0,"1372":0,"1373":0,"1376":0,"1377":0,"1380":0,"1381":0,"1385":0,"1386":0,"1387":0,"1390":0,"1393":0,"1400":0,"1421":0,"1427":0,"1428":0,"1430":0,"1431":0,"1433":0,"1435":0,"1438":0,"1439":0,"1444":0,"1445":0,"1448":0,"1456":0,"1461":0,"1463":0,"1464":0,"1488":0,"1490":0,"1491":0,"1493":0,"1494":0,"1499":0,"1500":0,"1505":0,"1506":0,"1507":0,"1513":0,"1515":0,"1518":0,"1519":0,"1524":0,"1527":0,"1530":0,"1531":0,"1535":0,"1536":0,"1546":0,"1547":0,"1552":0,"1553":0,"1575":0,"1576":0,"1577":0,"1578":0,"1579":0,"1580":0,"1581":0,"1582":0,"1583":0,"1584":0,"1586":0,"1587":0,"1589":0,"1591":0,"1592":0,"1594":0,"1595":0,"1598":0,"1618":0,"1620":0,"1621":0,"1623":0,"1624":0,"1626":0,"1628":0,"1630":0,"1631":0,"1633":0,"1634":0,"1636":0,"1637":0,"1639":0,"1640":0,"1642":0,"1644":0,"1656":0,"1661":0,"1662":0,"1663":0,"1664":0,"1665":0,"1667":0,"1668":0,"1670":0,"1671":0,"1673":0,"1674":0,"1676":0,"1677":0,"1678":0,"1681":0,"1684":0,"1685":0,"1686":0,"1688":0,"1689":0,"1690":0,"1691":0,"1692":0,"1695":0,"1698":0,"1699":0,"1700":0,"1703":0,"1706":0,"1719":0,"1720":0,"1721":0,"1724":0,"1746":0,"1749":0,"1750":0,"1752":0,"1753":0,"1754":0,"1755":0,"1758":0,"1759":0,"1760":0,"1764":0,"1766":0,"1767":0,"1778":0,"1779":0,"1790":0,"1792":0,"1793":0,"1794":0,"1796":0,"1807":0,"1809":0,"1819":0,"1822":0,"1835":0,"1836":0,"1838":0};
_yuitest_coverage["build/gallery-itsastorage/gallery-itsastorage.js"].functions = {"(anonymous 2):200":0,"(anonymous 3):210":0,"(anonymous 5):228":0,"(anonymous 4):221":0,"(anonymous 6):254":0,"initializer:163":0,"(anonymous 7):288":0,"clear:280":0,"(anonymous 8):338":0,"_clearLocal:310":0,"success:381":0,"failure:387":0,"timeout:392":0,"_clearServer:364":0,"(anonymous 9):438":0,"getItem:429":0,"(anonymous 10):504":0,"_getItemLocal:470":0,"success:551":0,"failure:556":0,"timeout:561":0,"_getItemServer:534":0,"(anonymous 11):608":0,"getItems:599":0,"(anonymous 13):665":0,"(anonymous 12):661":0,"(anonymous 14):684":0,"_getItemsLocal:643":0,"(anonymous 15):741":0,"success:734":0,"failure:748":0,"timeout:753":0,"_getItemsServer:710":0,"(anonymous 16):795":0,"length:787":0,"(anonymous 17):844":0,"_lengthLocal:818":0,"success:893":0,"failure:897":0,"timeout:902":0,"_lengthServer:876":0,"(anonymous 18):945":0,"removeItem:936":0,"(anonymous 19):979":0,"_removeItemLocal:968":0,"success:1035":0,"failure:1043":0,"timeout:1048":0,"_removeItemServer:1016":0,"(anonymous 20):1091":0,"removeItems:1082":0,"(anonymous 21):1128":0,"(anonymous 23):1141":0,"(anonymous 22):1138":0,"(anonymous 24):1156":0,"_removeItemsLocal:1114":0,"_removeItemsServer:1186":0,"(anonymous 25):1228":0,"setItem:1208":0,"_setItemLocal:1260":0,"success:1320":0,"failure:1327":0,"timeout:1332":0,"_setItemServer:1303":0,"(anonymous 26):1379":0,"setItems:1370":0,"(anonymous 28):1443":0,"(anonymous 27):1437":0,"(anonymous 29):1462":0,"_setItemsLocal:1420":0,"(anonymous 30):1496":0,"(anonymous 31):1517":0,"success:1511":0,"failure:1529":0,"timeout:1534":0,"_setItemsServer:1487":0,"(anonymous 32):1593":0,"setRemoteStorageServer:1574":0,"_transformItemType:1617":0,"_getCorrectItemType:1655":0,"_setItemLocal_OldBrowsers:1718":0,"(anonymous 33):1754":0,"_setItemLocal_OldBrowsers_ReadySafe:1745":0,"serverStoragePosible:1777":0,"_storageCookieEnabled:1789":0,"_readCookie:1806":0,"_setCookie:1818":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-itsastorage/gallery-itsastorage.js"].coveredLines = 524;
_yuitest_coverage["build/gallery-itsastorage/gallery-itsastorage.js"].coveredFunctions = 88;
_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1);
YUI.add('gallery-itsastorage', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-itsastorage/gallery-itsastorage.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 3);
'use strict';

/**
 * The ItsaStorage module.
 *
 * @module itsa-storage
 */

/**
 * Localstorage with fallback on server. No need to initialize or waiting for ready. Works with multiple sandboxes.
 * Values to be stored may consist of the following types: <br>
 * <ul><li>String</li><li>Number</li><li>Boolean</li><li>Array</li><li>Date</li><li>RegExp</li><li>Object</li></ul>
 * This module will automaticly transform the types to String during saving and retransform to the right type during reading.
 *
 * When storing Y.Model objects (or descendants), the value you need store is: yourModel.getAttrs()
 * Reading the value will return an object (say 'readObject'), which can be put in the modelinstance like: yourModel.setAttrs(readObject);
 *
 * <b>Always</b> look at the callback's error to find out is saving and reading succeeded. No need for waiting for initialisation: in cases initialisation is needed (IE6, IE7, Safari3),
 * the callback will always return after everything has been initialized.
 *
 * @class ITSAStorage
 * @extends Base
 * @constructor
 *
 * <i>Copyright (c) 2012 Marco Asbreuk - http://theinternetwizard.net</i>
 * YUI BSD License - http://developer.yahoo.com/yui/license.html
 *
*/

/**
 * Y.ItsaStorage can be used straight ahead with all its functions
 * @instance Y.ItsaStorage
 * @static
 *
*/

_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 39);
Y.ITSASTORAGE = Y.Base.create('itsastorage', Y.Base, [], {

    // -- Private Constants --------------------------------------------------------
    DB_NAME             : 'itsa_storage',
    DB_DISPLAYNAME      : 'ITSA Storage data',
    DB_MAXSIZE          : 1048576,
    DB_VERSION          : '1.0',

    EVT_READY           : 'itsastorage:ready',

    MODE_NOOP           : 0,
    MODE_HTML5          : 1,
    MODE_GECKO          : 2,
    MODE_DB             : 3,
    MODE_USERDATA       : 4,
    MODE_SERVER         : 5,

    USERDATA_PATH       : 'itsa_storage',
    USERDATA_NAME       : 'itsadata',

    COOKIE_ID           : 'itsastorageid',

    TYPE_STRING         : 'A',
    TYPE_INT            : 'B',
    TYPE_FLOAT          : 'C',
    TYPE_BOOLEAN        : 'D',
    TYPE_ARRAY          : 'E',
    TYPE_DATE           : 'F',
    TYPE_REGEXP         : 'G',
    TYPE_OBJECT         : 'H',

// -- Private Variables --------------------------------------------------------
/**
 * Internal object that stores key-value pairs in case of MODE_DB or MODE_USERDATA
 * @property data
 * @type Object
 * @private
 */

/**
 * The choosen driver in case of MODE_HTML5 or MODE_GECKO
 * @property storageDriver
 * @type Object
 * @private
 */

/**
 * The choosen storageDriver based on the browser-capabilities
 * @property storageMode
 * @type Int
 * @private
 */

/**
 * Flag that will be set to true (in case of MODE_DB or MODE_USERDATA) as soon as everything is initialized and ready to use
 * @property initialised_DB_USER_DATA
 * @type Boolean
 * @private
 */

/**
 * Reference to the server: should be set by setRemoteStorageServer()
 * @property server
 * @type String
 * @private
 */

/**
 * Reference to the uri of setItem: should be set by setRemoteStorageServer()
 * @property uriSetItem
 * @type String
 * @private
 */

/**
 * Reference to the uri of getItem: should be set by setRemoteStorageServer()
 * @property uriGetItem
 * @type String
 * @private
 */

/**
 * Reference to the uri of getLength: should be set by setRemoteStorageServer()
 * @property uriGetLength
 * @type String
 * @private
 */

/**
 * Reference to the uri of removeItem: should be set by setRemoteStorageServer()
 * @property uriRemoveItem
 * @type String
 * @private
 */

/**
 * Reference to the uri of clear: should be set by setRemoteStorageServer()
 * @property uriClear
 * @type String
 * @private
 */

    data : {},
    storageDriver: null,
    storageMode: null,
    initialised_DB_USER_DATA: false,
    server: null,
    uriSetItem: null,
    uriGetItem: null,
    uriGetLength: null,
    uriRemoveItem: null,
    uriClear: null,
    _serverBkpExists: false,
    _serverStorageCanbemade: false,
    _serverTimeout: 8000,

    /**
     * Set up the best storageMode based on browser-capabilities. In case of MODE_DB or MODE_USERDATA, there will be done some more initialisation on the browser/dom.
     * As soon as that gets finished, an internal event will be launched, so that the module knows all functions can be used. All functions can be used straight ahead by the user anyway,
     * because internally they will wait until initialization has finished.
     *
     * @method initializer
     * @protected
    */
    initializer: function () {
        _yuitest_coverfunc("build/gallery-itsastorage/gallery-itsastorage.js", "initializer", 163);
_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 164);
var instance = this,
            w = Y.config.win;
        // Determine the best available storage mode.
        _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 167);
try {
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 168);
if (w.localStorage) {
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 169);
instance.storageMode = instance.MODE_HTML5;
            } else {_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 170);
if (w.globalStorage) {
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 171);
instance.storageMode = instance.MODE_GECKO;
            } else {_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 172);
if (w.openDatabase && Y.UA.userAgent.indexOf('Chrome') === -1) {
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 173);
instance.storageMode = instance.MODE_DB;
            } else {_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 174);
if (Y.UA.ie >= 5) {
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 175);
instance.storageMode = instance.MODE_USERDATA;
            } else {
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 177);
instance.storageMode = instance.MODE_SERVER;
            }}}}
        } catch (ex) {
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 180);
instance.storageMode = instance.MODE_SERVER;
        }
_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 182);
if ((instance.storageMode === instance.MODE_DB) || (instance.storageMode === instance.MODE_USERDATA)) {
    _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 183);
instance.storageMode = instance.MODE_SERVER;
}
//==================================================================================================

        _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 187);
if (instance.storageMode === instance.MODE_HTML5) {
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 188);
instance.storageDriver = w.localStorage;
        }
        _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 190);
if (instance.storageMode === instance.MODE_GECKO) {
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 191);
instance.storageDriver = w.globalStorage[w.location.hostname];
        }

        _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 194);
if (instance.storageMode === instance.MODE_HTML5) {
            // Mobile Safari in iOS 5 loses track of storageDriver when
            // page is restored from bfcache. This fixes the reference.
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 197);
Y.Node.DOM_EVENTS.pageshow = 1;
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 198);
Y.on(
                'pageshow',
                function () {
                    _yuitest_coverfunc("build/gallery-itsastorage/gallery-itsastorage.js", "(anonymous 2)", 200);
_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 201);
instance.storageDriver = w.localStorage;
                },
                w
            );
        }

        _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 207);
if ((instance.storageMode === instance.MODE_DB) || (instance.storageMode === instance.MODE_USERDATA)) {
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 208);
Y.on(
                instance.EVT_READY,
                function() {
                    _yuitest_coverfunc("build/gallery-itsastorage/gallery-itsastorage.js", "(anonymous 3)", 210);
_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 211);
this.initialised_DB_USER_DATA = true;
                },
                instance
            );
        }
        _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 216);
if (instance.storageMode === instance.MODE_DB) {
            // Database storage methods. Supported by Safari 3.1 and 3.2.
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 218);
instance.storageDriver = w.openDatabase(instance.DB_NAME, instance.DB_VERSION, instance.DB_DISPLAYNAME, instance.DB_MAXSIZE);
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 219);
instance.storageDriver.transaction(
                Y.bind(
                    function (t) {
                        _yuitest_coverfunc("build/gallery-itsastorage/gallery-itsastorage.js", "(anonymous 4)", 221);
_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 222);
var instance = this;
                        _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 223);
t.executeSql("CREATE TABLE IF NOT EXISTS " + instance.DB_NAME + "(name TEXT PRIMARY KEY, value TEXT NOT NULL)");
                        _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 224);
t.executeSql(
                            "SELECT value FROM " + instance.DB_NAME + " WHERE name = 'data'",
                            [],
                            Y.bind(
                                function (t, results) {
                                    _yuitest_coverfunc("build/gallery-itsastorage/gallery-itsastorage.js", "(anonymous 5)", 228);
_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 229);
var instance = this;
                                    _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 230);
if (results.rows.length) {
                                        _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 231);
try {
                                            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 232);
instance.data = Y.JSON.parse(results.rows.item(0).value);
                                        } catch (ex) {
                                            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 234);
instance.data = {};
                                        }
                                    }
                                    _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 237);
Y.fire(instance.EVT_READY);
                                },
                                instance
                            )
                        );
                    },
                    instance
                )
            );
        }
        _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 247);
if (instance.storageMode === instance.MODE_USERDATA) {
            // userData storage methods. Supported by IE5, 6, and 7.
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 249);
instance.storageDriver = Y.config.doc.createElement('span');
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 250);
instance.storageDriver.addBehavior('#default#userData');
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 251);
Y.on(
                'domready',
                Y.bind(
                    function () {
                        _yuitest_coverfunc("build/gallery-itsastorage/gallery-itsastorage.js", "(anonymous 6)", 254);
_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 255);
var instance = this;
                        _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 256);
Y.config.doc.body.appendChild(instance.storageDriver);
                        _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 257);
instance.storageDriver.load(instance.USERDATA_PATH);
                        _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 258);
try {
                            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 259);
instance.data = Y.JSON.parse(instance.storageDriver.getAttribute(instance.USERDATA_NAME) || '{}');
                        } catch (ex) {
                            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 261);
instance.data = {};
                        }
                        _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 263);
Y.fire(instance.EVT_READY);
                    },
                    instance
                )
            );
        }
    },

    /**
     * Removes all items from the data store.
     *
     * @method clear
     * @param {Function} callback will be returned with 1 parameter:<br>
     * <ul><li>err (String) only process the returnvalue when err===null</li></ul>
     * @param {Object} [context] this in the callbackfunction
     * @param {Simpletype|Object|Array} [args] returns as the second parameter of the callback-function
     */
    clear: function (callback, context, args) {
        _yuitest_coverfunc("build/gallery-itsastorage/gallery-itsastorage.js", "clear", 280);
_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 281);
var instance = this;
        _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 282);
if (instance.storageMode === instance.MODE_SERVER) {
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 283);
instance._clearServer(callback, context, args);
        }
        else {
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 286);
if (instance.serverStoragePosible()) {
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 287);
instance._clearLocal(
                    function(err) {
                        _yuitest_coverfunc("build/gallery-itsastorage/gallery-itsastorage.js", "(anonymous 7)", 288);
_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 289);
instance._clearServer(callback, context, args, err);
                    },
                    instance
                );
            }
            else {
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 295);
instance._clearLocal(callback, context, args);
            }
        }
    },

    /**
     * Removes all items from the local datastore.
     *
     * @method _clearLocal
     * @param {Function} callback will be returned with 1 parameter:<br>
     * <ul><li>err (String) only process the returnvalue when err===null</li></ul>
     * @param {Object} [context] this in the callbackfunction
     * @param {Simpletype|Object|Array} [args] returns as the second parameter of the callback-function
     * @private
     */
    _clearLocal: function (callback, context, args) {
        _yuitest_coverfunc("build/gallery-itsastorage/gallery-itsastorage.js", "_clearLocal", 310);
_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 311);
var instance = this,
            err = null;
        _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 313);
var key;
        _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 314);
try {
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 315);
if (instance.storageMode === instance.MODE_HTML5) {
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 316);
instance.storageDriver.clear();
            }
            else {_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 318);
if (instance.storageMode === instance.MODE_GECKO) {
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 319);
for (key in instance.storageDriver) {
                    _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 320);
if (instance.storageDriver.hasOwnProperty(key)) {
                        _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 321);
instance.storageDriver.removeItem(key);
                        _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 322);
delete instance.storageDriver[key];
                    }
                }
            }}
        }
        catch(catcherr) {
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 328);
err = catcherr.message;
        }
        _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 330);
if ((instance.storageMode === instance.MODE_DB) || (instance.storageMode === instance.MODE_USERDATA)) {
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 331);
if (instance.initialised_DB_USER_DATA) {
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 332);
instance.data = {};
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 333);
instance._setItemLocal_OldBrowsers(null, null, callback, context, args);
            }
            else {
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 336);
Y.on(
                    instance.EVT_READY,
                    function() {
                        _yuitest_coverfunc("build/gallery-itsastorage/gallery-itsastorage.js", "(anonymous 8)", 338);
_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 339);
instance.data = {};
                        _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 340);
instance._setItemLocal_OldBrowsers(null, null, callback, context, args);
                    },
                    instance
                );
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 347);
if (Y.Lang.isFunction(callback)) {
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 348);
Y.rbind(callback, context, err, args)();
            }
        }
    },

    /**
     * Removes all items from the server datastore.
     *
     * @method _clearServer
     * @param {Function} callback will be returned with 1 parameter:<br>
     * <ul><li>err (String) only process the returnvalue when err===null</li></ul>
     * @param {Object} [context] this in the callbackfunction
     * @param {Simpletype|Object|Array} [args] returns as the second parameter of the callback-function
     * @param {String} [localError] chained error passed by _clearLocal
     * @private
     */
    _clearServer: function (callback, context, args, localError) {
        _yuitest_coverfunc("build/gallery-itsastorage/gallery-itsastorage.js", "_clearServer", 364);
_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 365);
var instance = this,
            url,
            stringifyItems;
        _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 368);
if (!instance._serverBkpExists) {
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 369);
if (Y.Lang.isFunction(callback)) {
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 370);
Y.rbind(callback, context, null, args)();
            }
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 372);
return;
        }
        _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 374);
if (instance.server) {
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 375);
if (instance._storageCookieEnabled()) {
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 376);
url = instance.server + '?' + instance.uriClear + '&'+instance.COOKIE_ID+'=' + instance._readCookie() + '&callback={callback}';
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 377);
Y.jsonp(
                    url,
                    {
                        on: {
                            success: function(data) {
                                _yuitest_coverfunc("build/gallery-itsastorage/gallery-itsastorage.js", "success", 381);
_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 382);
if (Y.Lang.isFunction(callback)) {
                                    _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 383);
Y.rbind(callback, context, localError, args)();
                                    _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 384);
instance._serverBkpExists = false;
                                }
                            },
                            failure: function() {
                                _yuitest_coverfunc("build/gallery-itsastorage/gallery-itsastorage.js", "failure", 387);
_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 388);
if (Y.Lang.isFunction(callback)) {
                                    _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 389);
Y.rbind(callback, context, (localError ? localError + ' + ' : '') + 'failed to connect to server', args)();
                                }
                            },
                            timeout: function() {
                                _yuitest_coverfunc("build/gallery-itsastorage/gallery-itsastorage.js", "timeout", 392);
_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 393);
if (Y.Lang.isFunction(callback)) {
                                    _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 394);
Y.rbind(callback, context, (localError ? localError + ' + ' : '') + 'connection time-out server', args)();
                                }
                            }
                        },
                        context: instance,
                        timeout: instance._serverTimeout
                    }
                );
            }
            else {
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 404);
if (Y.Lang.isFunction(callback)) {
                    _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 405);
Y.rbind(callback, context, (localError ? localError + ' + ' : '') + 'Cookie-errror: You must accept Cookies in order to store data', null, args)();
                }
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 410);
if (Y.Lang.isFunction(callback)) {
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 411);
Y.rbind(callback, context, (localError ? localError + ' + ' : '') + 'setRemoteStorageServer is not set in the right way', args)();
            }
        }
    },


    /**
     * Returns the item with the specified key, or <code>null</code> if the item
     * was not found.
     *
     * @method getItem
     * @param {String} key
     * @param {Function} callback will be returned with 2 parameters:<br>
     * <ul><li>err (String) only process the returnvalue when err===null</li><li>result (String|Number|Boolean|Array|Date|RegExp|Object)</li></ul>
     * @param {Object} [context] this in the callbackfunction
     * @param {Simpletype|Object|Array} [args] returns as the firth parameter of the callback-function
     * @return {Function} callback(err, result, args) as second parameter
     */
    getItem: function (key, callback, context, args) {
        _yuitest_coverfunc("build/gallery-itsastorage/gallery-itsastorage.js", "getItem", 429);
_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 430);
var instance = this;
        _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 431);
if (instance.storageMode === instance.MODE_SERVER) {
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 432);
instance._getItemServer(key, callback, context, args);
        }
        else {
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 435);
if (instance.serverStoragePosible()) {
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 436);
instance._getItemLocal(
                    key,
                    function(err, data) {
                        _yuitest_coverfunc("build/gallery-itsastorage/gallery-itsastorage.js", "(anonymous 9)", 438);
_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 439);
if (!err && data) {
                            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 440);
if (Y.Lang.isFunction(callback)) {
                                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 441);
Y.rbind(callback, context, null, data, args)();
                            }
                        }
                        else {
                            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 445);
instance._getItemServer(key, callback, context, args, err);
                        }
                    },
                    instance
                );
            }
            else {
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 452);
instance._getItemLocal(key, callback, context, args);
            }
        }
    },

    /**
     * Returns the item from local-store with the specified key, or <code>null</code> if the item
     * was not found.
     *
     * @method _getItemLocal
     * @param {String} key
     * @param {Function} callback will be returned with 2 parameters:<br>
     * <ul><li>err (String) only process the returnvalue when err===null</li><li>result (String|Number|Boolean|Array|Date|RegExp|Object)</li></ul>
     * @param {Object} [context] this in the callbackfunction
     * @param {Simpletype|Object|Array} [args] returns as the firth parameter of the callback-function
     * @private
     * @return {Function} callback(err, result, args) as second parameter
     */
    _getItemLocal: function (key, callback, context, args) {
        _yuitest_coverfunc("build/gallery-itsastorage/gallery-itsastorage.js", "_getItemLocal", 470);
_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 471);
var instance = this,
            returnvalue = null,
            err = null,
            storagevalue;
        _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 475);
if ((instance.storageMode === instance.MODE_HTML5) || (instance.storageMode === instance.MODE_GECKO)) {
            //----------------------------------------------------------
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 477);
try {
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 478);
if (instance.storageMode === instance.MODE_HTML5) {
                    _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 479);
storagevalue = instance.storageDriver.getItem(key);
                }
                else {_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 481);
if (instance.storageMode === instance.MODE_GECKO) {
                    _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 482);
storagevalue = instance.storageDriver[key].value;
                }}
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 484);
returnvalue = instance._getCorrectItemType(storagevalue);
            }
            catch(catcherr) {
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 487);
err = catcherr.message;
            }
            //----------------------------------------------------------
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 490);
if (Y.Lang.isFunction(callback)) {
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 491);
Y.rbind(callback, context, err, returnvalue, args)();
            }
        }
        else {_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 494);
if (instance.storageMode === instance.MODE_DB || instance.storageMode === instance.MODE_USERDATA) {
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 495);
if (instance.initialised_DB_USER_DATA) {
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 496);
storagevalue = instance.data.hasOwnProperty(key) ? instance.data[key] : null;
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 497);
if (Y.Lang.isFunction(callback)) {
                    _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 498);
Y.rbind(callback, context, null, instance._getCorrectItemType(storagevalue), args)();
                }
            }
            else {
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 502);
Y.on(
                    instance.EVT_READY,
                    function() {
                        _yuitest_coverfunc("build/gallery-itsastorage/gallery-itsastorage.js", "(anonymous 10)", 504);
_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 505);
var instance = this,
                            storagevalue = instance.data.hasOwnProperty(key) ? instance.data[key] : null;
                            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 507);
if (Y.Lang.isFunction(callback)) {
                                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 508);
Y.rbind(callback, context, null, instance._getCorrectItemType(storagevalue), args)();
                            }
                    },
                    instance
                );
            }
        }
        else {_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 515);
if (Y.Lang.isFunction(callback)) {
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 516);
Y.rbind(callback, context, 'no appropriate storageMode for _getItemLocal', null, args)();
        }}}
    },

    /**
     * Returns the item from server-store with the specified key, or <code>null</code> if the item
     * was not found.
     *
     * @method _getItemServer
     * @param {String} key
     * @param {Function} callback will be returned with 2 parameters:<br>
     * <ul><li>err (String) only process the returnvalue when err===null</li><li>result (String|Number|Boolean|Array|Date|RegExp|Object)</li></ul>
     * @param {Object} [context] this in the callbackfunction
     * @param {Simpletype|Object|Array} [args] returns as the firth parameter of the callback-function
     * @param {String} [localError] chained error passed by _getItemLocal
     * @private
     * @return {Function} callback(err, result, args) as second parameter
     */
    _getItemServer: function (key, callback, context, args, localError) {
        _yuitest_coverfunc("build/gallery-itsastorage/gallery-itsastorage.js", "_getItemServer", 534);
_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 535);
var instance = this,
            url,
            stringifyItems;
        _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 538);
if (!instance._serverBkpExists) {
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 539);
if (Y.Lang.isFunction(callback)) {
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 540);
Y.rbind(callback, context, null, null, args)();
            }
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 542);
return;
        }
        _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 544);
if (instance.server) {
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 545);
if (instance._storageCookieEnabled()) {
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 546);
url = instance.server + '?' + instance.uriGetItem + '&'+instance.COOKIE_ID+'=' + instance._readCookie() + '&key=' + encodeURIComponent(key) + '&callback={callback}';
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 547);
Y.jsonp(
                    url,
                    {
                        on: {
                            success: function(data) {
                                _yuitest_coverfunc("build/gallery-itsastorage/gallery-itsastorage.js", "success", 551);
_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 552);
var instance = this,
                                    returnvalue = instance._getCorrectItemType(data);
                                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 554);
Y.rbind(callback, context, null, returnvalue, args)();
                            },
                            failure: function() {
                                _yuitest_coverfunc("build/gallery-itsastorage/gallery-itsastorage.js", "failure", 556);
_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 557);
if (Y.Lang.isFunction(callback)) {
                                    _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 558);
Y.rbind(callback, context, (localError ? localError + ' + ' : '') + 'failed to connect to server', null, args)();
                                }
                            },
                            timeout: function() {
                                _yuitest_coverfunc("build/gallery-itsastorage/gallery-itsastorage.js", "timeout", 561);
_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 562);
if (Y.Lang.isFunction(callback)) {
                                    _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 563);
Y.rbind(callback, context, (localError ? localError + ' + ' : '') + 'connection time-out server', null, args)();
                                }
                            }
                        },
                        context: instance,
                        timeout: instance._serverTimeout
                    }
                );
            }
            else {
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 573);
if (Y.Lang.isFunction(callback)) {
                    _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 574);
Y.rbind(callback, context, (localError ? localError + ' + ' : '') + 'Cookie-errror: You must accept Cookies in order to store data', null, args)();
                }
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 579);
if (Y.Lang.isFunction(callback)) {
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 580);
Y.rbind(callback, context, (localError ? localError + ' + ' : '') + 'setRemoteStorageServer is not set in the right way', null, args)();
            }
        }
    },

    /**
     * Returns the multiple items, specified by the <b>key</b>-array
     *
     * @method getItems
     * @param {Array} keys String-array containing the keys
     * @param {Function} callback will be returned with 2 parameters:<br>
     * <ul><li>err (String) only process the returnvalue when err===null</li>
     * <li>result (Object) where the fields are specified by <b>key</b> and key-values are types (String|Number|Boolean|Array|Date|RegExp|Object)</li>
     * <li>notfound (Array) containing the fields whose values are not found</li>
     * </ul>
     * @param {Object} [context] this in the callbackfunction
     * @param {Simpletype|Object|Array} [args] returns as the fourth parameter of the callback-function
     * @return {Function} callback(err, result, notfound, args) as second parameter
     */
    getItems: function (keys, callback, context, args) {
        _yuitest_coverfunc("build/gallery-itsastorage/gallery-itsastorage.js", "getItems", 599);
_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 600);
var instance = this;
        _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 601);
if (instance.storageMode === instance.MODE_SERVER) {
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 602);
instance._getItemsServer(keys, callback, context, args);
        }
        else {
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 605);
if (instance.serverStoragePosible()) {
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 606);
instance._getItemsLocal(
                    keys,
                    function(err, data, notfoundkeys) {
                        _yuitest_coverfunc("build/gallery-itsastorage/gallery-itsastorage.js", "(anonymous 11)", 608);
_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 609);
if (!err && data && !Y.Lang.isValue(notfoundkeys)) {
                            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 610);
if (Y.Lang.isFunction(callback)) {
                                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 611);
Y.rbind(callback, context, null, data, args)();
                            }
                        }
                        else {
                            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 615);
instance._getItemsServer(notfoundkeys, callback, context, args, err, data);
                        }
                    },
                    instance
                );
            }
            else {
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 622);
instance._getItemsLocal(keys, callback, context, args);
            }
        }
    },

    /**
     * Returns the item from local-store with the specified key, or <code>null</code> if the item
     * was not found.
     *
     * @method _getItemsLocal
     * @param {Array} keys String-array containing the keys
     * @param {Function} callback will be returned with 2 parameters:<br>
     * <ul><li>err (String) only process the returnvalue when err===null</li>
     * <li>result (Object) where the fields are specified by <b>key</b> and key-values are types (String|Number|Boolean|Array|Date|RegExp|Object)</li>
     * <li>notfound (Array) containing the fields whose values are not found</li>
     * </ul>
     * @param {Object} [context] this in the callbackfunction
     * @param {Simpletype|Object|Array} [args] returns as the fourth parameter of the callback-function
     * @private
     * @return {Function} callback(err, result, notfound, args) as second parameter
     */
    _getItemsLocal: function (keys, callback, context, args) {
        _yuitest_coverfunc("build/gallery-itsastorage/gallery-itsastorage.js", "_getItemsLocal", 643);
_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 644);
var instance = this,
            returnvalue = null,
            err = null,
            finalresult = {},
            notfound = [],
            stack = new Y.Parallel(),
            isarray = Y.Lang.isArray(keys);
        _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 651);
if ((instance.storageMode === instance.MODE_NOOP) || (instance.storageMode === instance.MODE_SERVER) || !isarray) {
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 652);
if (!isarray) {
            }
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 654);
if (Y.Lang.isFunction(callback)) {
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 655);
Y.rbind(callback, context, isarray ? 'no appropriate storageMode for _getItemsLocal' : 'Supplied keys is not an array', null, null, args)();
            }
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 657);
return;
        }
        _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 659);
Y.Array.each(
            keys,
            function(key, index, keyarray) {
                _yuitest_coverfunc("build/gallery-itsastorage/gallery-itsastorage.js", "(anonymous 12)", 661);
_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 662);
instance._getItemLocal(
                    key,
                    stack.add(
                        function(geterror, result) {
                            _yuitest_coverfunc("build/gallery-itsastorage/gallery-itsastorage.js", "(anonymous 13)", 665);
_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 666);
if (!geterror && result) {
                                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 667);
finalresult[key] = result;
                            }
                            else {
                                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 670);
if (geterror) {
                                    // save the last error will do
                                    _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 672);
err = geterror;
                                }
                                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 674);
notfound.push(key);
                            }
                        }
                    ),
                    instance
                );
            },
            instance
        );
        _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 683);
stack.done(
            function() {
                _yuitest_coverfunc("build/gallery-itsastorage/gallery-itsastorage.js", "(anonymous 14)", 684);
_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 685);
if (Y.Lang.isFunction(callback)) {
                    _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 686);
Y.rbind(callback, context, err, finalresult, notfound, args)();
                }
            }
        );
    },

    /**
     * Returns the item from server-store with the specified key, or <code>null</code> if the item
     * was not found.
     *
     * @method _getItemsServer
     * @param {Array} keys String-array containing the keys
     * @param {Function} callback will be returned with 2 parameters:<br>
     * <ul><li>err (String) only process the returnvalue when err===null</li>
     * <li>result (Object) where the fields are specified by <b>key</b> and key-values are types (String|Number|Boolean|Array|Date|RegExp|Object)</li>
     * <li>notfound (Array) containing the fields whose values are not found</li>
     * </ul>
     * @param {Object} [context] this in the callbackfunction
     * @param {Simpletype|Object|Array} [args] returns as the fourth parameter of the callback-function
     * @param {String} [localError] chained error passed by _getItemsLocal
     * @localData {Object} [localData] chained data found by _getItemsLocal
     * @private
     * @return {Function} callback(err, result, notfound, args) as second parameter
     */
    _getItemsServer: function (keys, callback, context, args, localError, localData) {
        _yuitest_coverfunc("build/gallery-itsastorage/gallery-itsastorage.js", "_getItemsServer", 710);
_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 711);
var instance = this,
            url,
            isarray = Y.Lang.isArray(keys),
            stringifyItems;
        _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 715);
if (!isarray) {
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 716);
if (Y.Lang.isFunction(callback)) {
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 717);
Y.rbind(callback, context, 'Supplied keys is not an array', null, null, args)();
            }
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 719);
return;
        }
        _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 721);
if (!instance._serverBkpExists) {
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 722);
if (Y.Lang.isFunction(callback)) {
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 723);
Y.rbind(callback, context, null, null, null, args)();
            }
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 725);
return;
        }
        _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 727);
if (instance.server) {
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 728);
if (instance._storageCookieEnabled()) {
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 729);
url = instance.server + '?' + instance.uriGetItem + '&'+instance.COOKIE_ID+'=' + instance._readCookie() + '&keys=' + encodeURIComponent(Y.JSON.stringify(keys)) + '&callback={callback}';
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 730);
Y.jsonp(
                    url,
                    {
                        on: {
                            success: function(data) {
                                // data.result is an object with key/value. Only thing is: the values are String (with type-flag) and should be transformed to the right type
                                _yuitest_coverfunc("build/gallery-itsastorage/gallery-itsastorage.js", "success", 734);
_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 736);
var instance = this,
                                    returnvalue = data.result,
                                    objectkeyarray = Y.Object.keys(returnvalue);
                                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 739);
Y.Array.each(
                                    objectkeyarray,
                                    function(key, index, keyarray) {
                                        _yuitest_coverfunc("build/gallery-itsastorage/gallery-itsastorage.js", "(anonymous 15)", 741);
_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 742);
returnvalue[key] = instance._getCorrectItemType(returnvalue[key]);
                                    },
                                    instance
                                );
                                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 746);
Y.rbind(callback, context, null, Y.Lang.isObject(localData) ? Y.merge(localData, returnvalue) : returnvalue, data.notfound, args)();
                            },
                            failure: function() {
                                _yuitest_coverfunc("build/gallery-itsastorage/gallery-itsastorage.js", "failure", 748);
_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 749);
if (Y.Lang.isFunction(callback)) {
                                    _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 750);
Y.rbind(callback, context, (localError ? localError + ' + ' : '') + 'failed to connect to server', localData, keys, args)();
                                }
                            },
                            timeout: function() {
                                _yuitest_coverfunc("build/gallery-itsastorage/gallery-itsastorage.js", "timeout", 753);
_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 754);
if (Y.Lang.isFunction(callback)) {
                                    _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 755);
Y.rbind(callback, context, (localError ? localError + ' + ' : '') + 'connection time-out server', localData, keys, args)();
                                }
                            }
                        },
                        context: instance,
                        timeout: instance._serverTimeout
                    }
                );
            }
            else {
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 765);
if (Y.Lang.isFunction(callback)) {
                    _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 766);
Y.rbind(callback, context, (localError ? localError + ' + ' : '') + 'Cookie-errror: You must accept Cookies in order to store data', localData, keys, args)();
                }
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 771);
if (Y.Lang.isFunction(callback)) {
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 772);
Y.rbind(callback, context, (localError ? localError + ' + ' : '') + 'setRemoteStorageServer is not set in the right way', localData, keys, args)();
            }
        }
    },

    /**
     * Returns the number of items in the store.
     *
     * @method length
     * @param {Function} callback will be returned with 2 parameters:<br>
     * <ul><li>err (String) only process the returnvalue when err===null</li><li>result (Number)</li></ul>
     * @param {Object} [context] this in the callbackfunction
     * @param {Simpletype|Object|Array} [args] returns as the firth parameter of the callback-function
     * @return {Function} callback(err, result, args) as the first parameter
     */
    length: function (callback, context, args) {
        _yuitest_coverfunc("build/gallery-itsastorage/gallery-itsastorage.js", "length", 787);
_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 788);
var instance = this;
        _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 789);
if (instance.storageMode === instance.MODE_SERVER) {
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 790);
instance._lengthServer(callback, context, args, 0);
        }
        else {
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 793);
if (instance.serverStoragePosible()) {
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 794);
instance._lengthLocal(
                    function(err, data) {
                        _yuitest_coverfunc("build/gallery-itsastorage/gallery-itsastorage.js", "(anonymous 16)", 795);
_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 796);
instance._lengthServer(callback, context, args, ((data && !err) ? data : 0), err);
                    },
                    instance
                );
            }
            else {
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 802);
instance._lengthLocal(callback, context, args);
            }
        }
    },

    /**
     * Returns the number of items in the store excluded the private ones that are used by this module
     *
     * @method _lengthLocal
     * @param {Function} callback will be returned with 2 parameters:<br>
     * <ul><li>err (String) only process the returnvalue when err===null</li><li>result (Number)</li></ul>
     * @param {Object} [context] this in the callbackfunction
     * @param {Simpletype|Object|Array} [args] returns as the firth parameter of the callback-function
     * @private
     * @return {Function} callback(err, result, args) as the first parameter
     */
    _lengthLocal: function (callback, context, args) {
        _yuitest_coverfunc("build/gallery-itsastorage/gallery-itsastorage.js", "_lengthLocal", 818);
_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 819);
var instance = this,
            count = 0,
            err = null,
            key;
        _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 823);
if (instance.storageMode === instance.MODE_HTML5 || instance.storageMode === instance.MODE_GECKO) {
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 824);
try {
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 825);
count = instance.storageDriver.length;
            }
            catch(catcherr) {
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 828);
err = catcherr.message;
            }
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 830);
Y.rbind(callback, context, err, count, args)();
        }
        else {_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 832);
if (instance.storageMode === instance.MODE_DB || instance.storageMode === instance.MODE_USERDATA) {
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 833);
if (instance.initialised_DB_USER_DATA) {
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 834);
for (key in instance.data) {
                    _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 835);
if (instance.data.hasOwnProperty(key)) {
                        _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 836);
count += 1;
                    }
                }
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 839);
Y.rbind(callback, context, null, count, args)();
            }
            else {
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 842);
Y.on(
                    instance.EVT_READY,
                    function() {
                        _yuitest_coverfunc("build/gallery-itsastorage/gallery-itsastorage.js", "(anonymous 17)", 844);
_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 845);
var key;
                        _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 846);
for (key in instance.data) {
                            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 847);
if (instance.data.hasOwnProperty(key)) {
                                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 848);
count += 1;
                            }
                        }
                        _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 851);
Y.rbind(callback, context, null, count, args)();
                    },
                    instance
                );
            }

        }
        else {_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 858);
if (Y.Lang.isFunction(callback)) {
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 859);
Y.rbind(callback, context, 'no appropriate storageMode for _lengthLocal', 0, args)();
        }}}
    },

    /**
     * Returns the number of items in the store.
     *
     * @method _lengthServer
     * @param {Function} callback will be returned with 2 parameters:<br>
     * <ul><li>err (String) only process the returnvalue when err===null</li><li>result (Number)</li></ul>
     * @param {Object} [context] this in the callbackfunction
     * @param {Simpletype|Object|Array} [args] returns as the firth parameter of the callback-function
     * @param {String} [localLength] length local passed by _lengthLocal
     * @param {String} [localError] chained error passed by _lengthLocal
     * @private
     * @return {Function} callback(err, result, args) as the first parameter
     */
    _lengthServer: function (callback, context, args, localLength, localError) {
        _yuitest_coverfunc("build/gallery-itsastorage/gallery-itsastorage.js", "_lengthServer", 876);
_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 877);
var instance = this,
            url,
            stringifyItems;
        _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 880);
if (!instance._serverBkpExists) {
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 881);
if (Y.Lang.isFunction(callback)) {
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 882);
Y.rbind(callback, context, null, 0, args)();
            }
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 884);
return;
        }
        _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 886);
if (instance.server) {
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 887);
if (instance._storageCookieEnabled()) {
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 888);
url = instance.server + '?' + instance.uriGetLength + '&'+instance.COOKIE_ID+'=' + instance._readCookie() + '&callback={callback}';
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 889);
Y.jsonp(
                    url,
                    {
                        on: {
                            success: function(data) {
                                _yuitest_coverfunc("build/gallery-itsastorage/gallery-itsastorage.js", "success", 893);
_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 894);
data = parseInt(data, 10);
                                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 895);
Y.rbind(callback, context, null, (Y.Lang.isNumber(data) ? data : 0) + (localLength || 0), args)();
                            },
                            failure: function() {
                                _yuitest_coverfunc("build/gallery-itsastorage/gallery-itsastorage.js", "failure", 897);
_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 898);
if (Y.Lang.isFunction(callback)) {
                                    _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 899);
Y.rbind(callback, context, (localError ? localError + ' + ' : '') + 'failed to connect to server', 0, args)();
                                }
                            },
                            timeout: function() {
                                _yuitest_coverfunc("build/gallery-itsastorage/gallery-itsastorage.js", "timeout", 902);
_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 903);
if (Y.Lang.isFunction(callback)) {
                                    _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 904);
Y.rbind(callback, context, (localError ? localError + ' + ' : '') + 'connection time-out server', 0, args)();
                                }
                            }
                        },
                        context: instance,
                        timeout: instance._serverTimeout
                    }
                );
            }
            else {
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 914);
if (Y.Lang.isFunction(callback)) {
                    _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 915);
Y.rbind(callback, context, (localError ? localError + ' + ' : '') + 'Cookie-errror: You must accept Cookies in order to store data', 0, args)();
                }
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 920);
if (Y.Lang.isFunction(callback)) {
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 921);
Y.rbind(callback, context, (localError ? localError + ' + ' : '') + 'setRemoteStorageServer is not set in the right way', 0, args)();
            }
        }
    },

    /**
     * Removes the item with the specified key.
     *
     * @method removeItem
     * @param {String} key
     * @param {Function} callback will be returned with 1 parameters:<br>
     * <ul><li>err (String) only process the returnvalue when err===null</li></ul>
     * @param {Object} [context] this in the callbackfunction
     * @param {Simpletype|Object|Array} [args] returns as the second parameter of the callback-function
     */
    removeItem: function (key, callback, context, args) {
        _yuitest_coverfunc("build/gallery-itsastorage/gallery-itsastorage.js", "removeItem", 936);
_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 937);
var instance = this;
        _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 938);
if (instance.storageMode === instance.MODE_SERVER) {
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 939);
instance._removeItemServer(key, callback, context, args);
        }
        else {
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 942);
if (instance.serverStoragePosible()) {
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 943);
instance._removeItemLocal(
                    key,
                    function(err) {
                        _yuitest_coverfunc("build/gallery-itsastorage/gallery-itsastorage.js", "(anonymous 18)", 945);
_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 946);
instance._removeItemServer(key, callback, context, args, err);
                    },
                    instance
                );
            }
            else {
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 952);
instance._removeItemLocal(key, callback, context, args);
            }
        }
    },

    /**
     * Removes the item with the specified key.
     *
     * @method _removeItemLocal
     * @private
     * @param {String} key
     * @param {Function} callback will be returned with 1 parameter:<br>
     * <ul><li>err (String) only process the returnvalue when err===null</li></ul>
     * @param {Object} [context] this in the callbackfunction
     * @param {Simpletype|Object|Array} [args] returns as the second parameter of the callback-function
     */
    _removeItemLocal: function (key, callback, context, args) {
        _yuitest_coverfunc("build/gallery-itsastorage/gallery-itsastorage.js", "_removeItemLocal", 968);
_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 969);
var instance = this,
            err = null;
        _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 971);
if (instance.storageMode === instance.MODE_DB || instance.storageMode === instance.MODE_USERDATA) {
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 972);
if (instance.initialised_DB_USER_DATA) {
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 973);
delete instance.data[key];
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 974);
instance._setItemLocal_OldBrowsers(null, null, callback, context, args);
            }
            else {
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 977);
Y.on(
                    instance.EVT_READY,
                    function() {
                        _yuitest_coverfunc("build/gallery-itsastorage/gallery-itsastorage.js", "(anonymous 19)", 979);
_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 980);
delete instance.data[key];
                        _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 981);
instance._setItemLocal_OldBrowsers(null, null, callback, context, args);
                    },
                    instance
                );
            }
        }
        else {_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 987);
if (instance.storageMode === instance.MODE_HTML5 || instance.storageMode === instance.MODE_GECKO) {
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 988);
try {
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 989);
instance.storageDriver.removeItem(key);
            }
            catch(catcherr) {
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 992);
err = catcherr.message;
            }
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 994);
if (Y.Lang.isFunction(callback)) {
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 995);
Y.rbind(callback, context, err, args)();
            }
        }
        else {_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 998);
if (Y.Lang.isFunction(callback)) {
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 999);
Y.rbind(callback, context, 'no appropriate storageMode for _removeItemLocal', args)();
        }}}
    },

    /**
     * Removes the item with the specified key. The remoteserver SHOULD return the remaining length of the storage in the response-data.
     * Also make it possible for the remoteserver to delete multiple array.
     *
     * @method _removeItemServer
     * @private
     * @param {String|Array} key or keys (String-array)
     * @param {Function} callback will be returned with 1 parameter:<br>
     * <ul><li>err (String) only process the returnvalue when err===null</li></ul>
     * @param {Object} [context] this in the callbackfunction
     * @param {Simpletype|Object|Array} [args] returns as the second parameter of the callback-function
     * @param {String} [localError] chained error passed by _setItemLocal
     */
    _removeItemServer: function (key, callback, context, args, localError) {
        _yuitest_coverfunc("build/gallery-itsastorage/gallery-itsastorage.js", "_removeItemServer", 1016);
_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1017);
var instance = this,
            url,
            isarray = Y.Lang.isArray(key),
            stringifyItems;
        _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1021);
if (!instance._serverBkpExists) {
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1022);
if (Y.Lang.isFunction(callback)) {
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1023);
Y.rbind(callback, context, null, args)();
            }
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1025);
return;
        }
        _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1027);
if (instance.server) {
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1028);
if (instance._storageCookieEnabled()) {
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1029);
url = instance.server + '?' + instance.uriRemoveItem + '&'+instance.COOKIE_ID+'=' + instance._readCookie() + '&' + (isarray ? 'keys' : 'key') + '=' + encodeURIComponent(isarray ? Y.JSON.stringify(key) : key) + '&callback={callback}';
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1030);
Y.jsonp(
                    url,
                    {
                        on: {
                            // data = remaining length
                            success: function(data) {
                                _yuitest_coverfunc("build/gallery-itsastorage/gallery-itsastorage.js", "success", 1035);
_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1036);
if (Y.Lang.isFunction(callback)) {
                                    _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1037);
Y.rbind(callback, context, localError, args)();
                                }
                                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1039);
if (data) {
                                    _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1040);
instance._serverBkpExists = (data>0);
                                }
                            },
                            failure: function() {
                                _yuitest_coverfunc("build/gallery-itsastorage/gallery-itsastorage.js", "failure", 1043);
_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1044);
if (Y.Lang.isFunction(callback)) {
                                    _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1045);
Y.rbind(callback, context, (localError ? localError + ' + ' : '') + 'failed to connect to server', args)();
                                }
                            },
                            timeout: function() {
                                _yuitest_coverfunc("build/gallery-itsastorage/gallery-itsastorage.js", "timeout", 1048);
_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1049);
if (Y.Lang.isFunction(callback)) {
                                    _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1050);
Y.rbind(callback, context, (localError ? localError + ' + ' : '') + 'connection time-out server', args)();
                                }
                            }
                        },
                        context: instance,
                        timeout: instance._serverTimeout
                    }
                );
            }
            else {
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1060);
if (Y.Lang.isFunction(callback)) {
                    _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1061);
Y.rbind(callback, context, (localError ? localError + ' + ' : '') + 'Cookie-errror: You must accept Cookies in order to store data', args)();
                }
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1066);
if (Y.Lang.isFunction(callback)) {
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1067);
Y.rbind(callback, context, (localError ? localError + ' + ' : '') + 'setRemoteStorageServer is not set in the right way', args)();
            }
        }
    },

    /**
     * Removes the item with the specified key.
     *
     * @method removeItems
     * @param {Array} keys (String-array)
     * @param {Function} callback will be returned with 1 parameters:<br>
     * <ul><li>err (String) only process the returnvalue when err===null</li></ul>
     * @param {Object} [context] this in the callbackfunction
     * @param {Simpletype|Object|Array} [args] returns as the second parameter of the callback-function
     */
    removeItems: function (keys, callback, context, args) {
        _yuitest_coverfunc("build/gallery-itsastorage/gallery-itsastorage.js", "removeItems", 1082);
_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1083);
var instance = this;
        _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1084);
if (instance.storageMode === instance.MODE_SERVER) {
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1085);
instance._removeItemsServer(keys, callback, context, args);
        }
        else {
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1088);
if (instance.serverStoragePosible()) {
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1089);
instance._removeItemsLocal(
                    keys,
                    function(err) {
                        _yuitest_coverfunc("build/gallery-itsastorage/gallery-itsastorage.js", "(anonymous 20)", 1091);
_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1092);
instance._removeItemsServer(keys, callback, context, args, err);
                    },
                    instance
                );
            }
            else {
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1098);
instance._removeItemsLocal(keys, callback, context, args);
            }
        }
    },

    /**
     * Removes the item with the specified key.
     *
     * @method _removeItemsLocal
     * @private
     * @param {Array} keys (String-array)
     * @param {Function} callback will be returned with 1 parameter:<br>
     * <ul><li>err (String) only process the returnvalue when err===null</li></ul>
     * @param {Object} [context] this in the callbackfunction
     * @param {Simpletype|Object|Array} [args] returns as the second parameter of the callback-function
     */
    _removeItemsLocal: function (keys, callback, context, args) {
        _yuitest_coverfunc("build/gallery-itsastorage/gallery-itsastorage.js", "_removeItemsLocal", 1114);
_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1115);
var instance = this,
            isarray = Y.Lang.isArray(keys),
            err = null;
        _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1118);
if (!isarray) {
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1119);
if (Y.Lang.isFunction(callback)) {
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1120);
Y.rbind(callback, context, 'Supplied keys is not an array', args)();
            }
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1122);
return;
        }
        _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1124);
if (instance.storageMode === instance.MODE_DB || instance.storageMode === instance.MODE_USERDATA) {
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1125);
if (instance.initialised_DB_USER_DATA) {
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1126);
Y.Array.each(
                    keys,
                    function(key, index, keysarray) {
                        _yuitest_coverfunc("build/gallery-itsastorage/gallery-itsastorage.js", "(anonymous 21)", 1128);
_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1129);
delete instance.data[key];
                    },
                    instance
                );
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1133);
instance._setItemLocal_OldBrowsers(null, null, callback, context, args);
            }
            else {
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1136);
Y.on(
                    instance.EVT_READY,
                    function() {
                        _yuitest_coverfunc("build/gallery-itsastorage/gallery-itsastorage.js", "(anonymous 22)", 1138);
_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1139);
Y.Array.each(
                            keys,
                            function(key, index, keysarray) {
                                _yuitest_coverfunc("build/gallery-itsastorage/gallery-itsastorage.js", "(anonymous 23)", 1141);
_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1142);
delete instance.data[key];
                            },
                            instance
                        );
                        _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1146);
instance._setItemLocal_OldBrowsers(null, null, callback, context, args);
                    },
                    instance
                );
            }
        }
        else {_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1152);
if (instance.storageMode === instance.MODE_HTML5 || instance.storageMode === instance.MODE_GECKO) {
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1153);
try {
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1154);
Y.Array.each(
                    keys,
                    function(key, index, keysarray) {
                        _yuitest_coverfunc("build/gallery-itsastorage/gallery-itsastorage.js", "(anonymous 24)", 1156);
_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1157);
instance.storageDriver.removeItem(key);
                    },
                    instance
                );
            }
            catch(catcherr) {
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1163);
err = catcherr.message;
            }
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1165);
if (Y.Lang.isFunction(callback)) {
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1166);
Y.rbind(callback, context, err, args)();
            }
        }
        else {_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1169);
if (Y.Lang.isFunction(callback)) {
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1170);
Y.rbind(callback, context, 'no appropriate storageMode for _removeItemLocal', args)();
        }}}
    },

    /**
     * Removes the item with the specified key. The remoteserver SHOULD return the remaining length of the storage in the response-data
     *
     * @method _removeItemsServer
     * @private
     * @param {Array} keys (String-array)
     * @param {Function} callback will be returned with 1 parameter:<br>
     * <ul><li>err (String) only process the returnvalue when err===null</li></ul>
     * @param {Object} [context] this in the callbackfunction
     * @param {Simpletype|Object|Array} [args] returns as the second parameter of the callback-function
     * @param {String} [localError] chained error passed by _setItemLocal
     */
    _removeItemsServer: function (keys, callback, context, args, localError) {
        _yuitest_coverfunc("build/gallery-itsastorage/gallery-itsastorage.js", "_removeItemsServer", 1186);
_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1187);
if (!Y.Lang.isArray(keys)) {
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1188);
if (Y.Lang.isFunction(callback)) {
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1189);
Y.rbind(callback, context, 'Supplied keys is not an array', args)();
            }
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1191);
return;
        }
        _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1193);
this._removeItemServer(keys, callback, context, args, localError);
    },

    /**
     * Stores an item under the specified key. If the key already exists in the
     * data store, it will be replaced.
     *
     * @method setItem
     * @param {String} key
     * @param {String|Number|Boolean|Array|Date|RegExp|Object} value
     * @param {Function} callback will be returned with 1 parameter:<br>
     * <ul><li>err (String) only process the returnvalue when err===null</li></ul>
     * @param {Object} [context] this in the callbackfunction
     * @param {Simpletype|Object|Array} [args] returns as the second parameter of the callback-function
     */
    setItem: function (key, value, callback, context, args) {
        _yuitest_coverfunc("build/gallery-itsastorage/gallery-itsastorage.js", "setItem", 1208);
_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1209);
var instance = this;
        _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1210);
if (!Y.Lang.isString(key)) {
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1211);
if (Y.Lang.isFunction(callback)) {
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1212);
Y.rbind(callback, context, 'no valid key(String) is given', args)();
            }
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1214);
return;
        }
        _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1216);
if (!Y.Lang.isValue(value)) {
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1217);
instance.removeItem(key, callback, context, args);
        }
        else {
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1220);
if (instance.storageMode === instance.MODE_SERVER) {
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1221);
instance._setItemServer(key, value, callback, context, args);
            }
            else {
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1224);
if (instance.serverStoragePosible()) {
                    _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1225);
instance._setItemLocal(
                        key,
                        value,
                        function(err) {
                            _yuitest_coverfunc("build/gallery-itsastorage/gallery-itsastorage.js", "(anonymous 25)", 1228);
_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1229);
if (!err) {
                                // no need to be kept on the server: remove it there
                                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1231);
instance._removeItemServer(key, callback, context, args);
                            }
                            else {
                                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1234);
instance._setItemServer(key, value, callback, context, args, err);
                            }
                        },
                        instance
                    );
                }
                else {
                    _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1241);
instance._setItemLocal(key, value, callback, context, args);
                }
            }
        }
    },

    /**
     * Stores an item under the specified key. If the key already exists in the
     * data store, it will be replaced.
     *
     * @method _setItemLocal
     * @param {String} key
     * @param {String|Number|Boolean|Array|Date|RegExp|Object} value
     * @param {Function} callback will be returned with 1 parameter:<br>
     * <ul><li>err (String) only process the returnvalue when err===null</li></ul>
     * @param {Object} [context] this in the callbackfunction
     * @param {Simpletype|Object|Array} [args] returns as the second parameter of the callback-function
     * @private
     */
    _setItemLocal: function (key, value, callback, context, args) {
        _yuitest_coverfunc("build/gallery-itsastorage/gallery-itsastorage.js", "_setItemLocal", 1260);
_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1261);
var instance = this,
            err = null,
            transformedValue = instance._transformItemType(value, false);
        _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1264);
if (!transformedValue) {
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1265);
if (Y.Lang.isFunction(callback)) {
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1266);
Y.rbind(callback, context, 'key: '+key+' --> value is null: key is not stored', args)();
            }
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1268);
return;
        }
        _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1270);
if (instance.storageMode === instance.MODE_DB || instance.storageMode === instance.MODE_USERDATA) {
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1271);
instance._setItemLocal_OldBrowsers(key, transformedValue, callback, context, args);
        }
        else {_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1273);
if (instance.storageMode === instance.MODE_HTML5 || instance.storageMode === instance.MODE_GECKO) {
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1274);
try {
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1275);
instance.storageDriver.setItem(key, transformedValue);
            }
            catch(catcherr) {
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1278);
err = catcherr.message;
            }
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1280);
if (Y.Lang.isFunction(callback)) {
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1281);
Y.rbind(callback, context, err, args)();
            }
        }
        else {_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1284);
if (Y.Lang.isFunction(callback)) {
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1285);
Y.rbind(callback, context, 'no appropriate storageMode for _setItemLocal', args)();
        }}}
    },

    /**
     * Stores an item under the specified key. If the key already exists in the
     * data store, it will be replaced.
     *
     * @method _setItemServer
     * @param {String} key
     * @param {String|Number|Boolean|Array|Date|RegExp|Object} value
     * @param {Function} callback will be returned with 1 parameter1:<br>
     * <ul><li>err (String) only process the returnvalue when err===null</li></ul>
     * @param {Object} [context] this in the callbackfunction
     * @param {Simpletype|Object|Array} [args] returns as the second parameter of the callback-function
     * @param {String} [localError] chained error passed by _setItemLocal
     * @private
     */
    _setItemServer: function (key, value, callback, context, args, localError) {
        _yuitest_coverfunc("build/gallery-itsastorage/gallery-itsastorage.js", "_setItemServer", 1303);
_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1304);
var instance = this,
            url,
            transformedValue = instance._transformItemType(value, true);
        _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1307);
if (!transformedValue) {
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1308);
if (Y.Lang.isFunction(callback)) {
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1309);
Y.rbind(callback, context, 'key: '+key+' --> value is null: key is not stored', args)();
            }
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1311);
return;
        }
        _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1313);
if (instance.server) {
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1314);
if (instance._storageCookieEnabled()) {
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1315);
url = instance.server + '?' + instance.uriSetItem + '&'+instance.COOKIE_ID+'=' + instance._readCookie() + '&key=' + encodeURIComponent(key) + '&value='+encodeURIComponent(transformedValue)+'&callback={callback}';
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1316);
Y.jsonp(
                    url,
                    {
                        on: {
                            success: function(data) {
                                _yuitest_coverfunc("build/gallery-itsastorage/gallery-itsastorage.js", "success", 1320);
_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1321);
if (Y.Lang.isFunction(callback)) {
                                    _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1322);
Y.rbind(callback, context, localError, args)();
                                }
                                // now update that there is anything in the server
                                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1325);
instance._serverBkpExists = true;
                            },
                            failure: function() {
                                _yuitest_coverfunc("build/gallery-itsastorage/gallery-itsastorage.js", "failure", 1327);
_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1328);
if (Y.Lang.isFunction(callback)) {
                                    _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1329);
Y.rbind(callback, context, (localError ? localError + ' + ' : '') + 'failed to connect to server', args)();
                                }
                            },
                            timeout: function() {
                                _yuitest_coverfunc("build/gallery-itsastorage/gallery-itsastorage.js", "timeout", 1332);
_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1333);
if (Y.Lang.isFunction(callback)) {
                                    _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1334);
Y.rbind(callback, context, (localError ? localError + ' + ' : '') + 'connection time-out server', args)();
                                }
                            }
                        },
                        context: instance,
                        timeout: instance._serverTimeout
                    }
                );
            }
            else {
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1344);
if (Y.Lang.isFunction(callback)) {
                    _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1345);
Y.rbind(callback, context, (localError ? localError + ' + ' : '') + 'Cookie-errror: You must accept Cookies in order to store data', args)();
                }
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1350);
if (Y.Lang.isFunction(callback)) {
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1351);
Y.rbind(callback, context, (localError ? localError + ' + ' : '') + 'setRemoteStorageServer is not set in the right way', args)();
            }
        }
    },

    /**
     * Stores an item under the specified key. If the key already exists in the
     * data store, it will be replaced.
     *
     * @method setItems
     * @param {Array} keyvaluepairs is an Array that contains arrays, where the first field is the key-string and the second field a the value.<br>
     * for example: [["key1": "someitem"], ["key2": 10], ["key3": new Date()]]
     * @param {Function} callback will be returned with 3 parameter2:<br>
     * <ul><li>err (String) only process the returnvalue when err===null</li>
     * <li>itemsset (Array) contains Strings with the keys that are successfuly set</li>
     * <li>itemsnotset (Array) contains arrays with the key/value pairs that are failed to set</li></ul>
     * @param {Object} [context] this in the callbackfunction
     * @param {Simpletype|Object|Array} [args] returns as the fourth parameter of the callback-function
     */
    setItems: function (keyvaluepairs, callback, context, args) {
        _yuitest_coverfunc("build/gallery-itsastorage/gallery-itsastorage.js", "setItems", 1370);
_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1371);
var instance = this;
        _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1372);
if (instance.storageMode === instance.MODE_SERVER) {
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1373);
instance._setItemsServer(keyvaluepairs, callback, context, args);
        }
        else {
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1376);
if (instance.serverStoragePosible()) {
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1377);
instance._setItemsLocal(
                    keyvaluepairs,
                    function(err, itemsset, itemsnotset) {
                        _yuitest_coverfunc("build/gallery-itsastorage/gallery-itsastorage.js", "(anonymous 26)", 1379);
_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1380);
var notAllDone = (Y.Lang.isArray(itemsnotset) && (itemsnotset.length>0));
                        _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1381);
if (itemsset) {
                            // itemsset is a String-array
                            // no need to be kept on the server: remove it there
                            // it depends on whether there are items to be stored if we want to callback or not
                            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1385);
instance._removeItemsServer(itemsset, false, context, args);
                            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1386);
if (!notAllDone && Y.Lang.isFunction(callback)) {
                                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1387);
Y.rbind(callback, context, err, itemsset, itemsnotset, args)();
                            }
                        }
                        _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1390);
if (notAllDone) {
                            // trying to store the remaining items on the server
                            // itemsset is a keyvaluepairs-array
                            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1393);
instance._setItemsServer(itemsnotset, callback, context, args, err, itemsset);
                        }
                    },
                    instance
                );
            }
            else {
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1400);
instance._setItemsLocal(keyvaluepairs, callback, context, args);
            }
        }
    },

    /**
     * Stores an item under the specified key. If the key already exists in the
     * data store, it will be replaced.
     *
     * @method _setItemsLocal
     * @param {Array} keyvaluepairs is an Array that contains arrays, where the first field is the key-string and the second field a the value.<br>
     * for example: [["key1": "someitem"], ["key2": 10], ["key3": new Date()]]
     * @param {Function} callback will be returned with 3 parameter2:<br>
     * <ul><li>err (String) only process the returnvalue when err===null</li>
     * <li>itemsset (Array) contains Strings with the keys that are successfuly set</li>
     * <li>itemsnotset (Array) contains arrays with the key/value pairs that are failed to set</li></ul>
     * @param {Object} [context] this in the callbackfunction
     * @param {Simpletype|Object|Array} [args] returns as the fourth parameter of the callback-function
     * @private
     */
    _setItemsLocal: function (keyvaluepairs, callback, context, args) {
        _yuitest_coverfunc("build/gallery-itsastorage/gallery-itsastorage.js", "_setItemsLocal", 1420);
_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1421);
var instance = this,
            err = null,
            itemsset = [],
            itemsnotset = [],
            isarray = Y.Lang.isArray(keyvaluepairs),
            stack = new Y.Parallel();
        _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1427);
if ((instance.storageMode === instance.MODE_NOOP) || (instance.storageMode === instance.MODE_SERVER) || !isarray) {
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1428);
if (!isarray) {
            }
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1430);
if (Y.Lang.isFunction(callback)) {
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1431);
Y.rbind(callback, context, isarray ? 'no appropriate storageMode for _setItemsLocal' : 'Supplied keyvaluepairs is not an array', null, null, args)();
            }
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1433);
return;
        }
        _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1435);
Y.Array.each(
            keyvaluepairs,
            function(keyvaluepair, index, keyvaluepairsarray) {
                _yuitest_coverfunc("build/gallery-itsastorage/gallery-itsastorage.js", "(anonymous 27)", 1437);
_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1438);
if (Y.Lang.isArray(keyvaluepair) && (keyvaluepair.length===2)) {
                    _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1439);
instance._setItemLocal(
                        keyvaluepair[0],
                        keyvaluepair[1],
                        stack.add(
                            function(seterror) {
                                _yuitest_coverfunc("build/gallery-itsastorage/gallery-itsastorage.js", "(anonymous 28)", 1443);
_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1444);
if (!seterror) {
                                    _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1445);
itemsset.push(keyvaluepair[0]);
                                }
                                else {
                                    _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1448);
itemsnotset.push(keyvaluepair);
                                }
                            }
                        ),
                        instance
                    );
                }
                else {
                    _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1456);
err = 'keyvaluepairs subitem is not a 2-dim-array';
                }
            },
            instance
        );
        _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1461);
stack.done(
            function() {
                _yuitest_coverfunc("build/gallery-itsastorage/gallery-itsastorage.js", "(anonymous 29)", 1462);
_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1463);
if (Y.Lang.isFunction(callback)) {
                    _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1464);
Y.rbind(callback, context, err, itemsset, itemsnotset, args)();
                }
            }
        );
    },

    /**
     * Stores an item under the specified key. If the key already exists in the
     * data store, it will be replaced.
     *
     * @method _setItemsServer
     * @param {Array} keyvaluepairs is an Array that contains arrays, where the first field is the key-string and the second field a the value.<br>
     * for example: [["key1": "someitem"], ["key2": 10], ["key3": new Date()]]
     * @param {Function} callback will be returned with 3 parameter2:<br>
     * <ul><li>err (String) only process the returnvalue when err===null</li>
     * <li>itemsset (Array) contains Strings with the keys that are successfuly set</li>
     * <li>itemsnotset (Array) contains arrays with the key/value pairs that are failed to set</li></ul>
     * @param {Object} [context] this in the callbackfunction
     * @param {Simpletype|Object|Array} [args] returns as the fourth parameter of the callback-function
     * @param {String} [localError] chained error passed by _setItemLocal
     * @param {Array} [localSetItems] chained String-array of passed stored keys by _setItemsLocal
     * @private
     */
    _setItemsServer: function (keyvaluepairs, callback, context, args, localError, localSetItems) {
        _yuitest_coverfunc("build/gallery-itsastorage/gallery-itsastorage.js", "_setItemsServer", 1487);
_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1488);
var instance = this,
            url;
        _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1490);
if (!localSetItems) {
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1491);
localSetItems = [];
        }
        _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1493);
if (instance.server) {
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1494);
Y.Array.each(
                keyvaluepairs,
                function(keyvaluepair, index, keyvaluepairssarray) {
                    // keyvaluepair[0] should be a String
                    // keyvaluepair[1] can be any type
                    _yuitest_coverfunc("build/gallery-itsastorage/gallery-itsastorage.js", "(anonymous 30)", 1496);
_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1499);
if (Y.Lang.isArray(keyvaluepair) && (keyvaluepair.length===2)) {
                        _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1500);
keyvaluepair[1] = instance._transformItemType(keyvaluepair[1], true);
                    }
                },
                instance
            );
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1505);
if (instance._storageCookieEnabled()) {
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1506);
url = instance.server + '?' + instance.uriSetItem + '&'+instance.COOKIE_ID+'=' + instance._readCookie() + '&keyvalues='+encodeURIComponent(Y.JSON.stringify(keyvaluepairs))+'&callback={callback}';
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1507);
Y.jsonp(
                    url,
                    {
                        on: {
                            success: function(data) {
                                // we may assume all keyvalue pairs are stored
                                _yuitest_coverfunc("build/gallery-itsastorage/gallery-itsastorage.js", "success", 1511);
_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1513);
if (Y.Lang.isFunction(callback)) {
                                    // add the items that are set
                                    _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1515);
Y.Array.each(
                                        keyvaluepairs,
                                        function(keyvaluepair, index, keyvaluepairsarray) {
                                            _yuitest_coverfunc("build/gallery-itsastorage/gallery-itsastorage.js", "(anonymous 31)", 1517);
_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1518);
if (Y.Lang.isArray(keyvaluepair)) {
                                                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1519);
localSetItems.push(keyvaluepair[0]);
                                            }
                                        },
                                        instance
                                    );
                                    _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1524);
Y.rbind(callback, context, localError, localSetItems, null, args)();
                                }
                                // now update that there is anything in the server
                                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1527);
instance._serverBkpExists = true;
                            },
                            failure: function() {
                                _yuitest_coverfunc("build/gallery-itsastorage/gallery-itsastorage.js", "failure", 1529);
_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1530);
if (Y.Lang.isFunction(callback)) {
                                    _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1531);
Y.rbind(callback, context, (localError ? localError + ' + ' : '') + 'failed to connect to server', localSetItems, keyvaluepairs, args)();
                                }
                            },
                            timeout: function() {
                                _yuitest_coverfunc("build/gallery-itsastorage/gallery-itsastorage.js", "timeout", 1534);
_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1535);
if (Y.Lang.isFunction(callback)) {
                                    _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1536);
Y.rbind(callback, context, (localError ? localError + ' + ' : '') + 'connection time-out server', localSetItems, keyvaluepairs, args)();
                                }
                            }
                        },
                        context: instance,
                        timeout: instance._serverTimeout
                    }
                );
            }
            else {
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1546);
if (Y.Lang.isFunction(callback)) {
                    _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1547);
Y.rbind(callback, context, (localError ? localError + ' + ' : '') + 'Cookie-errror: You must accept Cookies in order to store data', localSetItems, keyvaluepairs, args)();
                }
            }
        }
        else {
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1552);
if (Y.Lang.isFunction(callback)) {
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1553);
Y.rbind(callback, context, (localError ? localError + ' + ' : '') + 'setRemoteStorageServer is not set in the right way', localSetItems, keyvaluepairs, args)();
            }
        }
    },

    /**
     * When this is set, storage may happen on a remoteserver. Always (overruling localstorage) when force is set true, or otherwise as fallback when no
     * appropriate storagemechanism is found OR in case the mode is MODE_USERDATA and the DB_size is full.
     * The remoteserver will be called through jsonp, so cross-domain and sll are possible. The remoteserver should generate the respons conform http://yuilibrary.com/yui/docs/jsonp/<br>
     * The requeststring will be generated automaticly, always with a unique sessionparameter <b>itsastorageid</b> which should be used to identify the clientstorage on the server. Furthermore,
     * <b>key</b> and <b>value</b> may also be send as parameters. And always <b>callback</b> is send as a parameter, conform jsonp.
     *
     * @method setRemoteStorageServer
     * @param {String} server serveradres to be called, f.i. <i>https://www.mydomain.com</i>
     * @param {String} uriSetItem the parameters that tells your server to set an item, f.i. <i>action=set</i>
     * @param {String} uriGetItem the parameters that tells your server to get an item, f.i. <i>action=get</i>
     * @param {String} uriGetLength the parameters that tells your server to get the number of items, f.i. <i>action=length</i>
     * @param {String} uriRemoveItem the parameters that tells your server to remove an item, f.i. <i>action=remove</i>
     * @param {String} uriClear the parameters that tells your server to clear an item, f.i. <i>action=clear</i>
     * @param {Boolean} [force] (default=false) whether to use serverstorage no matter what. When set to false, remote-storage will only be used as a fall-back in case appropriate storagemechanism is found OR in case the mode is MODE_USERDATA and the DB_size is full.
     */
    setRemoteStorageServer: function(server, uriSetItem, uriGetItem, uriGetLength, uriRemoveItem, uriClear, force, serverTimeout) {
        _yuitest_coverfunc("build/gallery-itsastorage/gallery-itsastorage.js", "setRemoteStorageServer", 1574);
_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1575);
var instance = this;
        _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1576);
if (Y.Lang.isString(server) && (server!==instance.server)) {
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1577);
instance.server = server;
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1578);
instance.uriSetItem = uriSetItem;
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1579);
instance.uriGetItem = uriGetItem;
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1580);
instance.uriGetLength = uriGetLength;
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1581);
instance.uriRemoveItem = uriRemoveItem;
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1582);
instance.uriClear = uriClear;
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1583);
if (serverTimeout) {
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1584);
instance._serverTimeout = serverTimeout;
            }
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1586);
if (Y.Lang.isBoolean(force) && force) {
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1587);
instance.storageMode = instance.MODE_SERVER;
            }
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1589);
instance._serverStorageCanbemade = true;
            // instance._serverBkpExists must be set to true, otherwise _lengthServer() won't excecute
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1591);
instance._serverBkpExists = true;
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1592);
instance._lengthServer(
                function(err, result) {
                    _yuitest_coverfunc("build/gallery-itsastorage/gallery-itsastorage.js", "(anonymous 32)", 1593);
_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1594);
if (!err && result) {
                        _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1595);
instance._serverBkpExists = (result>0);
                    }
                    else {
                        _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1598);
instance._serverStorageCanbemade = false;
                    }
                },
                instance
            );
        }
        else {
        }
    },

    /**
     * Will stringify the value with the right type-flag for storage
     *
     * @method _transformItemType
     * @param {String|Number|Boolean|Array|RegExp|Date|Object|null} value
     * @param {Boolean} onServer is needed to escape " and ' of the value in order to make it possible to store to local database without problems
     * @return (String) stringified value
     * @private
     */
     _transformItemType: function(value, onServer) {
        _yuitest_coverfunc("build/gallery-itsastorage/gallery-itsastorage.js", "_transformItemType", 1617);
_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1618);
var instance = this,
            transformedValue;
        _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1620);
if (Y.Lang.isString(value)) {
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1621);
transformedValue = instance.TYPE_STRING + value;
        }
        _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1623);
if (Y.Lang.isNumber(value)) {
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1624);
transformedValue = (Math.round(value)===value) ? (instance.TYPE_INT + value) : (instance.TYPE_FLOAT + value);
        }
        else {_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1626);
if (Y.Lang.isBoolean(value)) {
            // boolean can be stored as one character
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1628);
transformedValue = instance.TYPE_BOOLEAN + (value ? '1' : '0');
        }
        else {_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1630);
if (Y.Lang.isArray(value)) {
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1631);
transformedValue = instance.TYPE_ARRAY + Y.JSON.stringify(value);
        }
        else {_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1633);
if (Y.Lang.isDate(value)) {
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1634);
transformedValue = instance.TYPE_DATE + value.getTime();
        }
        else {_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1636);
if (Y.Lang.type(value)==='regexp') {
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1637);
transformedValue = instance.TYPE_REGEXP + '{"source":"'+value.source+'","global":'+value.global+',"ignoreCase":'+value.ignoreCase+',"lastIndex":'+value.lastIndex+',"multiline":'+value.multiline+'}';
        }
        else {_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1639);
if (Y.Lang.isObject(value)) {
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1640);
transformedValue = instance.TYPE_OBJECT + Y.JSON.stringify(value);
        }}}}}}
        _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1642);
transformedValue = transformedValue.replace(/\\n/g, '').replace(/\\r/g, '');
        // When we store on the server, then we migth want to escape " and '. Only do this in case you JSONStringyfied"
        _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1644);
return onServer ? transformedValue.replace(/"/g, '\\"').replace(/'/g, "\\'") : transformedValue;
     },

    /**
     * Will transform the stored item (which is a String-type) to the right type
     *
     * @method _getCorrectItemType
     * @param {String} item
     * @return (String|Number|Boolean|Array|RegExp|Date|Object|null) the item in the right type
     * @private
     */
    _getCorrectItemType: function(item) {
        _yuitest_coverfunc("build/gallery-itsastorage/gallery-itsastorage.js", "_getCorrectItemType", 1655);
_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1656);
var instance = this,
            returnvalue,
            itemremain,
            regexpObject,
            type;
        _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1661);
if (!Y.Lang.isString(item)) {return item;}
        _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1662);
type = item.substr(0,1);
        _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1663);
itemremain = item.substr(1);
        _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1664);
if (type === instance.TYPE_STRING) {
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1665);
returnvalue = itemremain;
        }
        else {_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1667);
if (type === instance.TYPE_INT) {
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1668);
returnvalue = parseInt(itemremain, 10);
        }
        else {_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1670);
if (type === instance.TYPE_FLOAT) {
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1671);
returnvalue = parseFloat(itemremain);
        }
        else {_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1673);
if (type === instance.TYPE_BOOLEAN) {
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1674);
returnvalue = (itemremain==='1');
        }
        else {_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1676);
if (type === instance.TYPE_ARRAY) {
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1677);
try {
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1678);
returnvalue = Y.JSON.parse(itemremain);
            }
            catch(e) {
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1681);
returnvalue = itemremain;
            }
        }
        else {_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1684);
if (type === instance.TYPE_DATE) {
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1685);
returnvalue = new Date();
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1686);
returnvalue.setTime(itemremain);
        }
        else {_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1688);
if (type === instance.TYPE_REGEXP) {
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1689);
try {
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1690);
regexpObject = Y.JSON.parse(itemremain);
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1691);
returnvalue = new RegExp(regexpObject.source, (regexpObject.global ? 'g' : '') + (regexpObject.ignoreCase ? 'i' : '') + (regexpObject.multiline ? 'm' : ''));
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1692);
returnvalue.lastIndex = regexpObject.lastIndex;
            }
            catch(e2) {
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1695);
returnvalue = itemremain;
            }
        }
        else {_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1698);
if (type === instance.TYPE_OBJECT) {
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1699);
try {
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1700);
returnvalue = Y.JSON.parse(itemremain);
            }
            catch(e3) {
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1703);
returnvalue = itemremain;
            }
        }}}}}}}}
        _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1706);
return returnvalue;
    },

    /**
     * Private store-method for MODE_DB or MODE_USERDATA.
     * Will call _setItemLocal_OldBrowsers_ReadySafe straight ahead when all is initialized. When not initialized yet, it waits untill all is initialized and will call _setItemLocal_OldBrowsers_ReadySafe by then.
     *
     * @method _setItemLocal_OldBrowsers
     * @param {String} [key]
     * @param {Simpletype|Array|Object} [value]
     * @private
     */
    _setItemLocal_OldBrowsers: function (key, value, callback, context, args) {
        _yuitest_coverfunc("build/gallery-itsastorage/gallery-itsastorage.js", "_setItemLocal_OldBrowsers", 1718);
_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1719);
var instance = this;
        _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1720);
if (instance.initialised_DB_USER_DATA) {
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1721);
instance._setItemLocal_OldBrowsers_ReadySafe(key, value, callback, context, args);
        }
        else {
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1724);
Y.on(
                instance.EVT_READY,
                instance._setItemLocal_OldBrowsers_ReadySafe,
                instance,
                key,
                value,
                callback,
                context,
                args
            );
        }
    },

    /**
     * Private store-method for MODE_DB or MODE_USERDATA that does the actual saving. Should not be called by hand.
     *
     * @method _setItemLocal_OldBrowsers_ReadySafe
     * @param {String} [key]
     * @param {Simpletype|Array|Object} [value]
     * @private
     */
    _setItemLocal_OldBrowsers_ReadySafe: function (key, value, callback, context, args) {
        _yuitest_coverfunc("build/gallery-itsastorage/gallery-itsastorage.js", "_setItemLocal_OldBrowsers_ReadySafe", 1745);
_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1746);
var instance = this,
            err = null,
            dataStringified = Y.JSON.stringify(instance.data);
        _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1749);
if (key && value) {
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1750);
instance.data[key] = value;
        }
        _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1752);
try {
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1753);
if (instance.storageMode === instance.MODE_DB) {
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1754);
instance.storageDriver.transaction(function (t) {
                _yuitest_coverfunc("build/gallery-itsastorage/gallery-itsastorage.js", "(anonymous 33)", 1754);
_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1755);
t.executeSql("REPLACE INTO " + instance.DB_NAME + " (name, value) VALUES ('data', ?)", [dataStringified]);
                });
            }
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1758);
if (instance.storageMode === instance.MODE_USERDATA) {
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1759);
instance.storageDriver.setAttribute(instance.USERDATA_NAME, dataStringified);
                _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1760);
instance.storageDriver.save(instance.USERDATA_PATH);
            }
        }
        catch(catcherr) {
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1764);
err = catcherr.message;
        }
        _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1766);
if (Y.Lang.isFunction(callback)) {
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1767);
Y.rbind(callback, context, err, args)();
        }
    },

    /**
     * If serverStorage is posible.
     *
     * @method serverStoragePosible
     * @return (Boolean) serverstorage posible or not
     */
    serverStoragePosible: function() {
        _yuitest_coverfunc("build/gallery-itsastorage/gallery-itsastorage.js", "serverStoragePosible", 1777);
_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1778);
var instance = this;
        _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1779);
return (instance.server && instance._serverStorageCanbemade && instance._storageCookieEnabled());
    },

    /**
     * Checks whether the cookie 'itsastorageid' is set. If not, then it tries to set it.
     *
     * @method _storageCookieEnabled
     * @private
     * @return (Boolean) cookie present or not
     */
    _storageCookieEnabled: function() {
        _yuitest_coverfunc("build/gallery-itsastorage/gallery-itsastorage.js", "_storageCookieEnabled", 1789);
_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1790);
var instance = this,
            returnvalue = Y.Cookie.exists(instance.COOKIE_ID);
        _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1792);
if (!returnvalue) {
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1793);
instance._setCookie();
            _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1794);
returnvalue = Y.Cookie.exists(instance.COOKIE_ID);
        }
        _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1796);
return returnvalue;
    },

    /**
     * Reads the cookie 'itsastorageid' and returns its value.
     *
     * @method _readCookie
     * @private
     * @return (String|null) the cookievalue
     */
    _readCookie: function() {
        _yuitest_coverfunc("build/gallery-itsastorage/gallery-itsastorage.js", "_readCookie", 1806);
_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1807);
var instance = this,
            returnvalue = Y.Cookie.get(instance.COOKIE_ID);
        _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1809);
return returnvalue;
    },

    /**
     * Tries to set the cookie 'itsastorageid' with an unique value.
     *
     * @method _setCookie
     * @private
     */
    _setCookie: function() {
        _yuitest_coverfunc("build/gallery-itsastorage/gallery-itsastorage.js", "_setCookie", 1818);
_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1819);
var instance = this,
            current = new Date().getTime(),
            random = Math.random();
        _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1822);
Y.Cookie.set(
            instance.COOKIE_ID,
            current.toString()+Math.round(10000*random).toString(),
            {
                path: "/",           //all pages
                expires: new Date("January 01, 2099")
            }
        );
    }


});

_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1835);
if (!Y.Global.ItsaStorage) {
    _yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1836);
Y.Global.ItsaStorage = new Y.ITSASTORAGE();
}
_yuitest_coverline("build/gallery-itsastorage/gallery-itsastorage.js", 1838);
Y.ItsaStorage = Y.Global.ItsaStorage;

}, '@VERSION@', {
    "requires": [
        "yui-base",
        "base-build",
        "base-base",
        "event-base",
        "event-custom",
        "event-custom-complex",
        "json",
        "jsonp",
        "cookie",
        "parallel"
    ]
});
