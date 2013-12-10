'use strict';

/**
 * The ItsaStorage module.
 *
 * @module gallery-itsastorage
 */

/**
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

var YStorageLite = Y.StorageLite;

function ITSAStorageClass() {
    ITSAStorageClass.superclass.constructor.apply(this, arguments);
}

ITSAStorageClass.NAME = 'itsastorage';

Y.ITSAStorageClass = Y.extend(ITSAStorageClass, Y.Base);

/**
 * @method initializer
 * @protected
 * @since 0.1
*/
ITSAStorageClass.prototype.initializer = function() {
    Y.log('initializer', 'info', 'ITSAStorage');
    var instance = this;
    instance._ready = new Y.Promise(function (resolve, reject) {
        Y.StorageLite.on('storage-lite:ready', function() {
            var localstorageClearFn = Y.StorageLite.clear.toString(),
                noop = (localstorageClearFn.replace(/\s/g, '')==='function(){}');
/*jshint expr:true */
            noop ? reject('noop') : resolve();
/*jshint expr:false */
        });
    });
};

 // -- Public Methods -------------------------------------------------------

/**
 * Removes all items from the data store.
 *
 * @method clear
 */
ITSAStorageClass.prototype.clear = function () {
    var instance = this;
    return instance._ready.then(
        function() {
            // can throw an error (not likely, because the db will decrease)
            // thrown errors will make the returned promise reject
            YStorageLite.clear();
        }
    );
};

/**
 * Returns the item with the specified key, or <code>null</code> if the item
 * was not found.
 *
 * @method getItem
 * @param {String} key
 * @return {Object|null} item or <code>null</code> if not found
 */
ITSAStorageClass.prototype.getItem = function (key) {
    var instance = this;
    return instance._ready.then(
        function() {
            var item = YStorageLite.getItem(key, true),
                now;
            if (item && item.expire) {
                now = (new Date()).getTime();
                if (item.expire<now) {
                    YStorageLite.removeItem(key); // synchronous remove
                    item = null;
                }
            }
            if (!item) {
                throw new Error('item not found');
            }
            else {
                return item.value;
            }
        }
    );
};

/**
 * Returns the number of items in the data store.
 *
 * @method length
 * @return {Number} number of items in the data store
 */
ITSAStorageClass.prototype.length = function () {
    var instance = this;
    return instance._ready.then(
        function() {
            return YStorageLite.length();
        }
    );
};

/**
 * Removes the item with the specified key.
 *
 * @method removeItem
 * @param {String} key
 */
ITSAStorageClass.prototype.removeItem = function (key) {
    var instance = this;
    return instance._ready.then(
        function() {
            // can throw an error (not likely, because the db will decrease)
            // thrown errors will make the returned promise reject
            YStorageLite.removeItem(key);
        }
    );
}; // can throw an error

/**
 * Stores an item under the specified key. If the key already exists in the
 * data store, it will be replaced.
 *
 * @method setItem
 * @param {String} key
 * @param {Object} value
 * @param {bool} json (optional) <code>true</code> if the item should be
 *     serialized to a JSON string before being stored
 */
ITSAStorageClass.prototype.setItem = function (key, value, expire) {
    var instance = this;
    return instance._ready.then(
        function() {
            // can throw an error (not likely, because the db will decrease)
            // thrown errors will make the returned promise reject
            var storevalue = {
                value: value
            };
/*jshint expr:true */
            expire && (storevalue.expire=expire.getTime());
/*jshint expr:false */
            YStorageLite.setItem(key, storevalue, true);
        }
    );
}; // can throw an error

// define 1 global messagecontroller
/*jshint expr:true */
Y.Global.ITSAStorage || (Y.Global.ITSAStorage=new ITSAStorageClass());
/*jshint expr:false */
Y.ITSAStorage = Y.Global.ITSAStorage;