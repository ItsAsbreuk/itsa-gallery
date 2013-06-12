YUI.add('gallery-itsastorage', function (Y, NAME) {

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
        var instance = this,
            w = Y.config.win;
        // Determine the best available storage mode.
        try {
            if (w.localStorage) {
                instance.storageMode = instance.MODE_HTML5;
            } else if (w.globalStorage) {
                instance.storageMode = instance.MODE_GECKO;
            } else if (w.openDatabase && Y.UA.userAgent.indexOf('Chrome') === -1) {
                instance.storageMode = instance.MODE_DB;
            } else if (Y.UA.ie >= 5) {
                instance.storageMode = instance.MODE_USERDATA;
            } else {
                instance.storageMode = instance.MODE_SERVER;
            }
        } catch (ex) {
            instance.storageMode = instance.MODE_SERVER;
        }
if ((instance.storageMode === instance.MODE_DB) || (instance.storageMode === instance.MODE_USERDATA)) {
    instance.storageMode = instance.MODE_SERVER;
}
//==================================================================================================

        if (instance.storageMode === instance.MODE_HTML5) {
            instance.storageDriver = w.localStorage;
        }
        if (instance.storageMode === instance.MODE_GECKO) {
            instance.storageDriver = w.globalStorage[w.location.hostname];
        }

        if (instance.storageMode === instance.MODE_HTML5) {
            // Mobile Safari in iOS 5 loses track of storageDriver when
            // page is restored from bfcache. This fixes the reference.
            Y.Node.DOM_EVENTS.pageshow = 1;
            Y.on(
                'pageshow',
                function () {
                    instance.storageDriver = w.localStorage;
                },
                w
            );
        }

        if ((instance.storageMode === instance.MODE_DB) || (instance.storageMode === instance.MODE_USERDATA)) {
            Y.on(
                instance.EVT_READY,
                function() {
                    this.initialised_DB_USER_DATA = true;
                },
                instance
            );
        }
        if (instance.storageMode === instance.MODE_DB) {
            // Database storage methods. Supported by Safari 3.1 and 3.2.
            instance.storageDriver = w.openDatabase(instance.DB_NAME, instance.DB_VERSION, instance.DB_DISPLAYNAME, instance.DB_MAXSIZE);
            instance.storageDriver.transaction(
                Y.bind(
                    function (t) {
                        var instance = this;
                        t.executeSql("CREATE TABLE IF NOT EXISTS " + instance.DB_NAME + "(name TEXT PRIMARY KEY, value TEXT NOT NULL)");
                        t.executeSql(
                            "SELECT value FROM " + instance.DB_NAME + " WHERE name = 'data'",
                            [],
                            Y.bind(
                                function (t, results) {
                                    var instance = this;
                                    if (results.rows.length) {
                                        try {
                                            instance.data = Y.JSON.parse(results.rows.item(0).value);
                                        } catch (ex) {
                                            instance.data = {};
                                        }
                                    }
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
        if (instance.storageMode === instance.MODE_USERDATA) {
            // userData storage methods. Supported by IE5, 6, and 7.
            instance.storageDriver = Y.config.doc.createElement('span');
            instance.storageDriver.addBehavior('#default#userData');
            Y.on(
                'domready',
                Y.bind(
                    function () {
                        var instance = this;
                        Y.config.doc.body.appendChild(instance.storageDriver);
                        instance.storageDriver.load(instance.USERDATA_PATH);
                        try {
                            instance.data = Y.JSON.parse(instance.storageDriver.getAttribute(instance.USERDATA_NAME) || '{}');
                        } catch (ex) {
                            instance.data = {};
                        }
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
        var instance = this;
        if (instance.storageMode === instance.MODE_SERVER) {
            instance._clearServer(callback, context, args);
        }
        else {
            if (instance.serverStoragePosible()) {
                instance._clearLocal(
                    function(err) {
                        instance._clearServer(callback, context, args, err);
                    },
                    instance
                );
            }
            else {
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
        var instance = this,
            err = null;
        var key;
        try {
            if (instance.storageMode === instance.MODE_HTML5) {
                instance.storageDriver.clear();
            }
            else if (instance.storageMode === instance.MODE_GECKO) {
                for (key in instance.storageDriver) {
                    if (instance.storageDriver.hasOwnProperty(key)) {
                        instance.storageDriver.removeItem(key);
                        delete instance.storageDriver[key];
                    }
                }
            }
        }
        catch(catcherr) {
            err = catcherr.message;
        }
        if ((instance.storageMode === instance.MODE_DB) || (instance.storageMode === instance.MODE_USERDATA)) {
            if (instance.initialised_DB_USER_DATA) {
                instance.data = {};
                instance._setItemLocal_OldBrowsers(null, null, callback, context, args);
            }
            else {
                Y.on(
                    instance.EVT_READY,
                    function() {
                        instance.data = {};
                        instance._setItemLocal_OldBrowsers(null, null, callback, context, args);
                    },
                    instance
                );
            }
        }
        else {
            if (Y.Lang.isFunction(callback)) {
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
        var instance = this,
            url,
            stringifyItems;
        if (!instance._serverBkpExists) {
            if (Y.Lang.isFunction(callback)) {
                Y.rbind(callback, context, null, args)();
            }
            return;
        }
        if (instance.server) {
            if (instance._storageCookieEnabled()) {
                url = instance.server + '?' + instance.uriClear + '&'+instance.COOKIE_ID+'=' + instance._readCookie() + '&callback={callback}';
                Y.jsonp(
                    url,
                    {
                        on: {
                            success: function(data) {
                                if (Y.Lang.isFunction(callback)) {
                                    Y.rbind(callback, context, localError, args)();
                                    instance._serverBkpExists = false;
                                }
                            },
                            failure: function() {
                                if (Y.Lang.isFunction(callback)) {
                                    Y.rbind(callback, context, (localError ? localError + ' + ' : '') + 'failed to connect to server', args)();
                                }
                            },
                            timeout: function() {
                                if (Y.Lang.isFunction(callback)) {
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
                if (Y.Lang.isFunction(callback)) {
                    Y.rbind(callback, context, (localError ? localError + ' + ' : '') + 'Cookie-errror: You must accept Cookies in order to store data', null, args)();
                }
            }
        }
        else {
            if (Y.Lang.isFunction(callback)) {
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
        var instance = this;
        if (instance.storageMode === instance.MODE_SERVER) {
            instance._getItemServer(key, callback, context, args);
        }
        else {
            if (instance.serverStoragePosible()) {
                instance._getItemLocal(
                    key,
                    function(err, data) {
                        if (!err && data) {
                            if (Y.Lang.isFunction(callback)) {
                                Y.rbind(callback, context, null, data, args)();
                            }
                        }
                        else {
                            instance._getItemServer(key, callback, context, args, err);
                        }
                    },
                    instance
                );
            }
            else {
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
        var instance = this,
            returnvalue = null,
            err = null,
            storagevalue;
        if ((instance.storageMode === instance.MODE_HTML5) || (instance.storageMode === instance.MODE_GECKO)) {
            //----------------------------------------------------------
            try {
                if (instance.storageMode === instance.MODE_HTML5) {
                    storagevalue = instance.storageDriver.getItem(key);
                }
                else if (instance.storageMode === instance.MODE_GECKO) {
                    storagevalue = instance.storageDriver[key].value;
                }
                returnvalue = instance._getCorrectItemType(storagevalue);
            }
            catch(catcherr) {
                err = catcherr.message;
            }
            //----------------------------------------------------------
            if (Y.Lang.isFunction(callback)) {
                Y.rbind(callback, context, err, returnvalue, args)();
            }
        }
        else if (instance.storageMode === instance.MODE_DB || instance.storageMode === instance.MODE_USERDATA) {
            if (instance.initialised_DB_USER_DATA) {
                storagevalue = instance.data.hasOwnProperty(key) ? instance.data[key] : null;
                if (Y.Lang.isFunction(callback)) {
                    Y.rbind(callback, context, null, instance._getCorrectItemType(storagevalue), args)();
                }
            }
            else {
                Y.on(
                    instance.EVT_READY,
                    function() {
                        var instance = this,
                            storagevalue = instance.data.hasOwnProperty(key) ? instance.data[key] : null;
                            if (Y.Lang.isFunction(callback)) {
                                Y.rbind(callback, context, null, instance._getCorrectItemType(storagevalue), args)();
                            }
                    },
                    instance
                );
            }
        }
        else if (Y.Lang.isFunction(callback)) {
            Y.rbind(callback, context, 'no appropriate storageMode for _getItemLocal', null, args)();
        }
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
        var instance = this,
            url,
            stringifyItems;
        if (!instance._serverBkpExists) {
            if (Y.Lang.isFunction(callback)) {
                Y.rbind(callback, context, null, null, args)();
            }
            return;
        }
        if (instance.server) {
            if (instance._storageCookieEnabled()) {
                url = instance.server + '?' + instance.uriGetItem + '&'+instance.COOKIE_ID+'=' + instance._readCookie() + '&key=' + encodeURIComponent(key) + '&callback={callback}';
                Y.jsonp(
                    url,
                    {
                        on: {
                            success: function(data) {
                                var instance = this,
                                    returnvalue = instance._getCorrectItemType(data);
                                Y.rbind(callback, context, null, returnvalue, args)();
                            },
                            failure: function() {
                                if (Y.Lang.isFunction(callback)) {
                                    Y.rbind(callback, context, (localError ? localError + ' + ' : '') + 'failed to connect to server', null, args)();
                                }
                            },
                            timeout: function() {
                                if (Y.Lang.isFunction(callback)) {
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
                if (Y.Lang.isFunction(callback)) {
                    Y.rbind(callback, context, (localError ? localError + ' + ' : '') + 'Cookie-errror: You must accept Cookies in order to store data', null, args)();
                }
            }
        }
        else {
            if (Y.Lang.isFunction(callback)) {
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
        var instance = this;
        if (instance.storageMode === instance.MODE_SERVER) {
            instance._getItemsServer(keys, callback, context, args);
        }
        else {
            if (instance.serverStoragePosible()) {
                instance._getItemsLocal(
                    keys,
                    function(err, data, notfoundkeys) {
                        if (!err && data && !Y.Lang.isValue(notfoundkeys)) {
                            if (Y.Lang.isFunction(callback)) {
                                Y.rbind(callback, context, null, data, args)();
                            }
                        }
                        else {
                            instance._getItemsServer(notfoundkeys, callback, context, args, err, data);
                        }
                    },
                    instance
                );
            }
            else {
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
        var instance = this,
            returnvalue = null,
            err = null,
            finalresult = {},
            notfound = [],
            stack = new Y.Parallel(),
            isarray = Y.Lang.isArray(keys);
        if ((instance.storageMode === instance.MODE_NOOP) || (instance.storageMode === instance.MODE_SERVER) || !isarray) {
            if (!isarray) {
            }
            if (Y.Lang.isFunction(callback)) {
                Y.rbind(callback, context, isarray ? 'no appropriate storageMode for _getItemsLocal' : 'Supplied keys is not an array', null, null, args)();
            }
            return;
        }
        Y.Array.each(
            keys,
            function(key, index, keyarray) {
                instance._getItemLocal(
                    key,
                    stack.add(
                        function(geterror, result) {
                            if (!geterror && result) {
                                finalresult[key] = result;
                            }
                            else {
                                if (geterror) {
                                    // save the last error will do
                                    err = geterror;
                                }
                                notfound.push(key);
                            }
                        }
                    ),
                    instance
                );
            },
            instance
        );
        stack.done(
            function() {
                if (Y.Lang.isFunction(callback)) {
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
        var instance = this,
            url,
            isarray = Y.Lang.isArray(keys),
            stringifyItems;
        if (!isarray) {
            if (Y.Lang.isFunction(callback)) {
                Y.rbind(callback, context, 'Supplied keys is not an array', null, null, args)();
            }
            return;
        }
        if (!instance._serverBkpExists) {
            if (Y.Lang.isFunction(callback)) {
                Y.rbind(callback, context, null, null, null, args)();
            }
            return;
        }
        if (instance.server) {
            if (instance._storageCookieEnabled()) {
                url = instance.server + '?' + instance.uriGetItem + '&'+instance.COOKIE_ID+'=' + instance._readCookie() + '&keys=' + encodeURIComponent(Y.JSON.stringify(keys)) + '&callback={callback}';
                Y.jsonp(
                    url,
                    {
                        on: {
                            success: function(data) {
                                // data.result is an object with key/value. Only thing is: the values are String (with type-flag) and should be transformed to the right type
                                var instance = this,
                                    returnvalue = data.result,
                                    objectkeyarray = Y.Object.keys(returnvalue);
                                Y.Array.each(
                                    objectkeyarray,
                                    function(key, index, keyarray) {
                                        returnvalue[key] = instance._getCorrectItemType(returnvalue[key]);
                                    },
                                    instance
                                );
                                Y.rbind(callback, context, null, Y.Lang.isObject(localData) ? Y.merge(localData, returnvalue) : returnvalue, data.notfound, args)();
                            },
                            failure: function() {
                                if (Y.Lang.isFunction(callback)) {
                                    Y.rbind(callback, context, (localError ? localError + ' + ' : '') + 'failed to connect to server', localData, keys, args)();
                                }
                            },
                            timeout: function() {
                                if (Y.Lang.isFunction(callback)) {
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
                if (Y.Lang.isFunction(callback)) {
                    Y.rbind(callback, context, (localError ? localError + ' + ' : '') + 'Cookie-errror: You must accept Cookies in order to store data', localData, keys, args)();
                }
            }
        }
        else {
            if (Y.Lang.isFunction(callback)) {
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
        var instance = this;
        if (instance.storageMode === instance.MODE_SERVER) {
            instance._lengthServer(callback, context, args, 0);
        }
        else {
            if (instance.serverStoragePosible()) {
                instance._lengthLocal(
                    function(err, data) {
                        instance._lengthServer(callback, context, args, ((data && !err) ? data : 0), err);
                    },
                    instance
                );
            }
            else {
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
        var instance = this,
            count = 0,
            err = null,
            key;
        if (instance.storageMode === instance.MODE_HTML5 || instance.storageMode === instance.MODE_GECKO) {
            try {
                count = instance.storageDriver.length;
            }
            catch(catcherr) {
                err = catcherr.message;
            }
            Y.rbind(callback, context, err, count, args)();
        }
        else if (instance.storageMode === instance.MODE_DB || instance.storageMode === instance.MODE_USERDATA) {
            if (instance.initialised_DB_USER_DATA) {
                for (key in instance.data) {
                    if (instance.data.hasOwnProperty(key)) {
                        count += 1;
                    }
                }
                Y.rbind(callback, context, null, count, args)();
            }
            else {
                Y.on(
                    instance.EVT_READY,
                    function() {
                        var key;
                        for (key in instance.data) {
                            if (instance.data.hasOwnProperty(key)) {
                                count += 1;
                            }
                        }
                        Y.rbind(callback, context, null, count, args)();
                    },
                    instance
                );
            }

        }
        else if (Y.Lang.isFunction(callback)) {
            Y.rbind(callback, context, 'no appropriate storageMode for _lengthLocal', 0, args)();
        }
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
        var instance = this,
            url,
            stringifyItems;
        if (!instance._serverBkpExists) {
            if (Y.Lang.isFunction(callback)) {
                Y.rbind(callback, context, null, 0, args)();
            }
            return;
        }
        if (instance.server) {
            if (instance._storageCookieEnabled()) {
                url = instance.server + '?' + instance.uriGetLength + '&'+instance.COOKIE_ID+'=' + instance._readCookie() + '&callback={callback}';
                Y.jsonp(
                    url,
                    {
                        on: {
                            success: function(data) {
                                data = parseInt(data, 10);
                                Y.rbind(callback, context, null, (Y.Lang.isNumber(data) ? data : 0) + (localLength || 0), args)();
                            },
                            failure: function() {
                                if (Y.Lang.isFunction(callback)) {
                                    Y.rbind(callback, context, (localError ? localError + ' + ' : '') + 'failed to connect to server', 0, args)();
                                }
                            },
                            timeout: function() {
                                if (Y.Lang.isFunction(callback)) {
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
                if (Y.Lang.isFunction(callback)) {
                    Y.rbind(callback, context, (localError ? localError + ' + ' : '') + 'Cookie-errror: You must accept Cookies in order to store data', 0, args)();
                }
            }
        }
        else {
            if (Y.Lang.isFunction(callback)) {
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
        var instance = this;
        if (instance.storageMode === instance.MODE_SERVER) {
            instance._removeItemServer(key, callback, context, args);
        }
        else {
            if (instance.serverStoragePosible()) {
                instance._removeItemLocal(
                    key,
                    function(err) {
                        instance._removeItemServer(key, callback, context, args, err);
                    },
                    instance
                );
            }
            else {
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
        var instance = this,
            err = null;
        if (instance.storageMode === instance.MODE_DB || instance.storageMode === instance.MODE_USERDATA) {
            if (instance.initialised_DB_USER_DATA) {
                delete instance.data[key];
                instance._setItemLocal_OldBrowsers(null, null, callback, context, args);
            }
            else {
                Y.on(
                    instance.EVT_READY,
                    function() {
                        delete instance.data[key];
                        instance._setItemLocal_OldBrowsers(null, null, callback, context, args);
                    },
                    instance
                );
            }
        }
        else if (instance.storageMode === instance.MODE_HTML5 || instance.storageMode === instance.MODE_GECKO) {
            try {
                instance.storageDriver.removeItem(key);
            }
            catch(catcherr) {
                err = catcherr.message;
            }
            if (Y.Lang.isFunction(callback)) {
                Y.rbind(callback, context, err, args)();
            }
        }
        else if (Y.Lang.isFunction(callback)) {
            Y.rbind(callback, context, 'no appropriate storageMode for _removeItemLocal', args)();
        }
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
        var instance = this,
            url,
            isarray = Y.Lang.isArray(key),
            stringifyItems;
        if (!instance._serverBkpExists) {
            if (Y.Lang.isFunction(callback)) {
                Y.rbind(callback, context, null, args)();
            }
            return;
        }
        if (instance.server) {
            if (instance._storageCookieEnabled()) {
                url = instance.server + '?' + instance.uriRemoveItem + '&'+instance.COOKIE_ID+'=' + instance._readCookie() + '&' + (isarray ? 'keys' : 'key') + '=' + encodeURIComponent(isarray ? Y.JSON.stringify(key) : key) + '&callback={callback}';
                Y.jsonp(
                    url,
                    {
                        on: {
                            // data = remaining length
                            success: function(data) {
                                if (Y.Lang.isFunction(callback)) {
                                    Y.rbind(callback, context, localError, args)();
                                }
                                if (data) {
                                    instance._serverBkpExists = (data>0);
                                }
                            },
                            failure: function() {
                                if (Y.Lang.isFunction(callback)) {
                                    Y.rbind(callback, context, (localError ? localError + ' + ' : '') + 'failed to connect to server', args)();
                                }
                            },
                            timeout: function() {
                                if (Y.Lang.isFunction(callback)) {
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
                if (Y.Lang.isFunction(callback)) {
                    Y.rbind(callback, context, (localError ? localError + ' + ' : '') + 'Cookie-errror: You must accept Cookies in order to store data', args)();
                }
            }
        }
        else {
            if (Y.Lang.isFunction(callback)) {
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
        var instance = this;
        if (instance.storageMode === instance.MODE_SERVER) {
            instance._removeItemsServer(keys, callback, context, args);
        }
        else {
            if (instance.serverStoragePosible()) {
                instance._removeItemsLocal(
                    keys,
                    function(err) {
                        instance._removeItemsServer(keys, callback, context, args, err);
                    },
                    instance
                );
            }
            else {
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
        var instance = this,
            isarray = Y.Lang.isArray(keys),
            err = null;
        if (!isarray) {
            if (Y.Lang.isFunction(callback)) {
                Y.rbind(callback, context, 'Supplied keys is not an array', args)();
            }
            return;
        }
        if (instance.storageMode === instance.MODE_DB || instance.storageMode === instance.MODE_USERDATA) {
            if (instance.initialised_DB_USER_DATA) {
                Y.Array.each(
                    keys,
                    function(key, index, keysarray) {
                        delete instance.data[key];
                    },
                    instance
                );
                instance._setItemLocal_OldBrowsers(null, null, callback, context, args);
            }
            else {
                Y.on(
                    instance.EVT_READY,
                    function() {
                        Y.Array.each(
                            keys,
                            function(key, index, keysarray) {
                                delete instance.data[key];
                            },
                            instance
                        );
                        instance._setItemLocal_OldBrowsers(null, null, callback, context, args);
                    },
                    instance
                );
            }
        }
        else if (instance.storageMode === instance.MODE_HTML5 || instance.storageMode === instance.MODE_GECKO) {
            try {
                Y.Array.each(
                    keys,
                    function(key, index, keysarray) {
                        instance.storageDriver.removeItem(key);
                    },
                    instance
                );
            }
            catch(catcherr) {
                err = catcherr.message;
            }
            if (Y.Lang.isFunction(callback)) {
                Y.rbind(callback, context, err, args)();
            }
        }
        else if (Y.Lang.isFunction(callback)) {
            Y.rbind(callback, context, 'no appropriate storageMode for _removeItemLocal', args)();
        }
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
        if (!Y.Lang.isArray(keys)) {
            if (Y.Lang.isFunction(callback)) {
                Y.rbind(callback, context, 'Supplied keys is not an array', args)();
            }
            return;
        }
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
        var instance = this;
        if (!Y.Lang.isString(key)) {
            if (Y.Lang.isFunction(callback)) {
                Y.rbind(callback, context, 'no valid key(String) is given', args)();
            }
            return;
        }
        if (!Y.Lang.isValue(value)) {
            instance.removeItem(key, callback, context, args);
        }
        else {
            if (instance.storageMode === instance.MODE_SERVER) {
                instance._setItemServer(key, value, callback, context, args);
            }
            else {
                if (instance.serverStoragePosible()) {
                    instance._setItemLocal(
                        key,
                        value,
                        function(err) {
                            if (!err) {
                                // no need to be kept on the server: remove it there
                                instance._removeItemServer(key, callback, context, args);
                            }
                            else {
                                instance._setItemServer(key, value, callback, context, args, err);
                            }
                        },
                        instance
                    );
                }
                else {
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
        var instance = this,
            err = null,
            transformedValue = instance._transformItemType(value, false);
        if (!transformedValue) {
            if (Y.Lang.isFunction(callback)) {
                Y.rbind(callback, context, 'key: '+key+' --> value is null: key is not stored', args)();
            }
            return;
        }
        if (instance.storageMode === instance.MODE_DB || instance.storageMode === instance.MODE_USERDATA) {
            instance._setItemLocal_OldBrowsers(key, transformedValue, callback, context, args);
        }
        else if (instance.storageMode === instance.MODE_HTML5 || instance.storageMode === instance.MODE_GECKO) {
            try {
                instance.storageDriver.setItem(key, transformedValue);
            }
            catch(catcherr) {
                err = catcherr.message;
            }
            if (Y.Lang.isFunction(callback)) {
                Y.rbind(callback, context, err, args)();
            }
        }
        else if (Y.Lang.isFunction(callback)) {
            Y.rbind(callback, context, 'no appropriate storageMode for _setItemLocal', args)();
        }
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
        var instance = this,
            url,
            transformedValue = instance._transformItemType(value, true);
        if (!transformedValue) {
            if (Y.Lang.isFunction(callback)) {
                Y.rbind(callback, context, 'key: '+key+' --> value is null: key is not stored', args)();
            }
            return;
        }
        if (instance.server) {
            if (instance._storageCookieEnabled()) {
                url = instance.server + '?' + instance.uriSetItem + '&'+instance.COOKIE_ID+'=' + instance._readCookie() + '&key=' + encodeURIComponent(key) + '&value='+encodeURIComponent(transformedValue)+'&callback={callback}';
                Y.jsonp(
                    url,
                    {
                        on: {
                            success: function(data) {
                                if (Y.Lang.isFunction(callback)) {
                                    Y.rbind(callback, context, localError, args)();
                                }
                                // now update that there is anything in the server
                                instance._serverBkpExists = true;
                            },
                            failure: function() {
                                if (Y.Lang.isFunction(callback)) {
                                    Y.rbind(callback, context, (localError ? localError + ' + ' : '') + 'failed to connect to server', args)();
                                }
                            },
                            timeout: function() {
                                if (Y.Lang.isFunction(callback)) {
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
                if (Y.Lang.isFunction(callback)) {
                    Y.rbind(callback, context, (localError ? localError + ' + ' : '') + 'Cookie-errror: You must accept Cookies in order to store data', args)();
                }
            }
        }
        else {
            if (Y.Lang.isFunction(callback)) {
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
        var instance = this;
        if (instance.storageMode === instance.MODE_SERVER) {
            instance._setItemsServer(keyvaluepairs, callback, context, args);
        }
        else {
            if (instance.serverStoragePosible()) {
                instance._setItemsLocal(
                    keyvaluepairs,
                    function(err, itemsset, itemsnotset) {
                        var notAllDone = (Y.Lang.isArray(itemsnotset) && (itemsnotset.length>0));
                        if (itemsset) {
                            // itemsset is a String-array
                            // no need to be kept on the server: remove it there
                            // it depends on whether there are items to be stored if we want to callback or not
                            instance._removeItemsServer(itemsset, false, context, args);
                            if (!notAllDone && Y.Lang.isFunction(callback)) {
                                Y.rbind(callback, context, err, itemsset, itemsnotset, args)();
                            }
                        }
                        if (notAllDone) {
                            // trying to store the remaining items on the server
                            // itemsset is a keyvaluepairs-array
                            instance._setItemsServer(itemsnotset, callback, context, args, err, itemsset);
                        }
                    },
                    instance
                );
            }
            else {
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
        var instance = this,
            err = null,
            itemsset = [],
            itemsnotset = [],
            isarray = Y.Lang.isArray(keyvaluepairs),
            stack = new Y.Parallel();
        if ((instance.storageMode === instance.MODE_NOOP) || (instance.storageMode === instance.MODE_SERVER) || !isarray) {
            if (!isarray) {
            }
            if (Y.Lang.isFunction(callback)) {
                Y.rbind(callback, context, isarray ? 'no appropriate storageMode for _setItemsLocal' : 'Supplied keyvaluepairs is not an array', null, null, args)();
            }
            return;
        }
        Y.Array.each(
            keyvaluepairs,
            function(keyvaluepair, index, keyvaluepairsarray) {
                if (Y.Lang.isArray(keyvaluepair) && (keyvaluepair.length===2)) {
                    instance._setItemLocal(
                        keyvaluepair[0],
                        keyvaluepair[1],
                        stack.add(
                            function(seterror) {
                                if (!seterror) {
                                    itemsset.push(keyvaluepair[0]);
                                }
                                else {
                                    itemsnotset.push(keyvaluepair);
                                }
                            }
                        ),
                        instance
                    );
                }
                else {
                    err = 'keyvaluepairs subitem is not a 2-dim-array';
                }
            },
            instance
        );
        stack.done(
            function() {
                if (Y.Lang.isFunction(callback)) {
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
        var instance = this,
            url;
        if (!localSetItems) {
            localSetItems = [];
        }
        if (instance.server) {
            Y.Array.each(
                keyvaluepairs,
                function(keyvaluepair, index, keyvaluepairssarray) {
                    // keyvaluepair[0] should be a String
                    // keyvaluepair[1] can be any type
                    if (Y.Lang.isArray(keyvaluepair) && (keyvaluepair.length===2)) {
                        keyvaluepair[1] = instance._transformItemType(keyvaluepair[1], true);
                    }
                },
                instance
            );
            if (instance._storageCookieEnabled()) {
                url = instance.server + '?' + instance.uriSetItem + '&'+instance.COOKIE_ID+'=' + instance._readCookie() + '&keyvalues='+encodeURIComponent(Y.JSON.stringify(keyvaluepairs))+'&callback={callback}';
                Y.jsonp(
                    url,
                    {
                        on: {
                            success: function(data) {
                                // we may assume all keyvalue pairs are stored
                                if (Y.Lang.isFunction(callback)) {
                                    // add the items that are set
                                    Y.Array.each(
                                        keyvaluepairs,
                                        function(keyvaluepair, index, keyvaluepairsarray) {
                                            if (Y.Lang.isArray(keyvaluepair)) {
                                                localSetItems.push(keyvaluepair[0]);
                                            }
                                        },
                                        instance
                                    );
                                    Y.rbind(callback, context, localError, localSetItems, null, args)();
                                }
                                // now update that there is anything in the server
                                instance._serverBkpExists = true;
                            },
                            failure: function() {
                                if (Y.Lang.isFunction(callback)) {
                                    Y.rbind(callback, context, (localError ? localError + ' + ' : '') + 'failed to connect to server', localSetItems, keyvaluepairs, args)();
                                }
                            },
                            timeout: function() {
                                if (Y.Lang.isFunction(callback)) {
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
                if (Y.Lang.isFunction(callback)) {
                    Y.rbind(callback, context, (localError ? localError + ' + ' : '') + 'Cookie-errror: You must accept Cookies in order to store data', localSetItems, keyvaluepairs, args)();
                }
            }
        }
        else {
            if (Y.Lang.isFunction(callback)) {
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
        var instance = this;
        if (Y.Lang.isString(server) && (server!==instance.server)) {
            instance.server = server;
            instance.uriSetItem = uriSetItem;
            instance.uriGetItem = uriGetItem;
            instance.uriGetLength = uriGetLength;
            instance.uriRemoveItem = uriRemoveItem;
            instance.uriClear = uriClear;
            if (serverTimeout) {
                instance._serverTimeout = serverTimeout;
            }
            if (Y.Lang.isBoolean(force) && force) {
                instance.storageMode = instance.MODE_SERVER;
            }
            instance._serverStorageCanbemade = true;
            // instance._serverBkpExists must be set to true, otherwise _lengthServer() won't excecute
            instance._serverBkpExists = true;
            instance._lengthServer(
                function(err, result) {
                    if (!err && result) {
                        instance._serverBkpExists = (result>0);
                    }
                    else {
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
        var instance = this,
            transformedValue;
        if (Y.Lang.isString(value)) {
            transformedValue = instance.TYPE_STRING + value;
        }
        if (Y.Lang.isNumber(value)) {
            transformedValue = (Math.round(value)===value) ? (instance.TYPE_INT + value) : (instance.TYPE_FLOAT + value);
        }
        else if (Y.Lang.isBoolean(value)) {
            // boolean can be stored as one character
            transformedValue = instance.TYPE_BOOLEAN + (value ? '1' : '0');
        }
        else if (Y.Lang.isArray(value)) {
            transformedValue = instance.TYPE_ARRAY + Y.JSON.stringify(value);
        }
        else if (Y.Lang.isDate(value)) {
            transformedValue = instance.TYPE_DATE + value.getTime();
        }
        else if (Y.Lang.type(value)==='regexp') {
            transformedValue = instance.TYPE_REGEXP + '{"source":"'+value.source+'","global":'+value.global+',"ignoreCase":'+value.ignoreCase+',"lastIndex":'+value.lastIndex+',"multiline":'+value.multiline+'}';
        }
        else if (Y.Lang.isObject(value)) {
            transformedValue = instance.TYPE_OBJECT + Y.JSON.stringify(value);
        }
        transformedValue = transformedValue.replace(/\\n/g, '').replace(/\\r/g, '');
        // When we store on the server, then we migth want to escape " and '. Only do this in case you JSONStringyfied"
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
        var instance = this,
            returnvalue,
            itemremain,
            regexpObject,
            type;
        if (!Y.Lang.isString(item)) {return item;}
        type = item.substr(0,1);
        itemremain = item.substr(1);
        if (type === instance.TYPE_STRING) {
            returnvalue = itemremain;
        }
        else if (type === instance.TYPE_INT) {
            returnvalue = parseInt(itemremain, 10);
        }
        else if (type === instance.TYPE_FLOAT) {
            returnvalue = parseFloat(itemremain);
        }
        else if (type === instance.TYPE_BOOLEAN) {
            returnvalue = (itemremain==='1');
        }
        else if (type === instance.TYPE_ARRAY) {
            try {
                returnvalue = Y.JSON.parse(itemremain);
            }
            catch(e) {
                returnvalue = itemremain;
            }
        }
        else if (type === instance.TYPE_DATE) {
            returnvalue = new Date();
            returnvalue.setTime(itemremain);
        }
        else if (type === instance.TYPE_REGEXP) {
            try {
                regexpObject = Y.JSON.parse(itemremain);
                returnvalue = new RegExp(regexpObject.source, (regexpObject.global ? 'g' : '') + (regexpObject.ignoreCase ? 'i' : '') + (regexpObject.multiline ? 'm' : ''));
                returnvalue.lastIndex = regexpObject.lastIndex;
            }
            catch(e2) {
                returnvalue = itemremain;
            }
        }
        else if (type === instance.TYPE_OBJECT) {
            try {
                returnvalue = Y.JSON.parse(itemremain);
            }
            catch(e3) {
                returnvalue = itemremain;
            }
        }
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
        var instance = this;
        if (instance.initialised_DB_USER_DATA) {
            instance._setItemLocal_OldBrowsers_ReadySafe(key, value, callback, context, args);
        }
        else {
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
        var instance = this,
            err = null,
            dataStringified = Y.JSON.stringify(instance.data);
        if (key && value) {
            instance.data[key] = value;
        }
        try {
            if (instance.storageMode === instance.MODE_DB) {
                instance.storageDriver.transaction(function (t) {
                t.executeSql("REPLACE INTO " + instance.DB_NAME + " (name, value) VALUES ('data', ?)", [dataStringified]);
                });
            }
            if (instance.storageMode === instance.MODE_USERDATA) {
                instance.storageDriver.setAttribute(instance.USERDATA_NAME, dataStringified);
                instance.storageDriver.save(instance.USERDATA_PATH);
            }
        }
        catch(catcherr) {
            err = catcherr.message;
        }
        if (Y.Lang.isFunction(callback)) {
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
        var instance = this;
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
        var instance = this,
            returnvalue = Y.Cookie.exists(instance.COOKIE_ID);
        if (!returnvalue) {
            instance._setCookie();
            returnvalue = Y.Cookie.exists(instance.COOKIE_ID);
        }
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
        var instance = this,
            returnvalue = Y.Cookie.get(instance.COOKIE_ID);
        return returnvalue;
    },

    /**
     * Tries to set the cookie 'itsastorageid' with an unique value.
     *
     * @method _setCookie
     * @private
     */
    _setCookie: function() {
        var instance = this,
            current = new Date().getTime(),
            random = Math.random();
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

if (!Y.Global.ItsaStorage) {
    Y.Global.ItsaStorage = new Y.ITSASTORAGE();
}
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
