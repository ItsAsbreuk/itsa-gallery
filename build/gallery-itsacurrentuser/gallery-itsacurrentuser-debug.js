YUI.add('gallery-itsacurrentuser', function (Y, NAME) {

'use strict';

/*jshint maxlen:200 */

/**
 *
 * @module gallery-itsacurrentuser
 * @extends Model
 * @class ITSACurrentUserClass
 * @constructor
 * @since 0.1
 *
 * <i>Copyright (c) 2013 Marco Asbreuk - http://itsasbreuk.nl</i>
 * YUI BSD License - http://developer.yahoo.com/yui/license.html
 *
*/

var YArray = Y.Array,
    LOGGED = 'logged',
    LOGGEDIN = LOGGED+'in',
    LOGGEDOUT = LOGGED+'out',
    STRING = 'string',
    DEFAULT_EXPIRE_AFTER = 60,
    DEFAULT_EXPIRE_WHEN_REMEMBERED = 256320, // half a year
    CURRENT_USER = 'currentuser',
    dateAddMinutes = function (oDate, numMinutes) {
                         oDate.setTime(oDate.getTime() + 60000*numMinutes);
                     };

function ITSACurrentUserClass() {
    ITSACurrentUserClass.superclass.constructor.apply(this, arguments);
}

ITSACurrentUserClass.NAME = 'itsacurrentuser';

Y.ITSACurrentUserClass = Y.extend(ITSACurrentUserClass, Y.Model);

/**
 * Current username of the logged in user
 * @property username
 * @type String
 * @since 0.1
 */
ITSACurrentUserClass.prototype.username = null;

/**
 * Current password of the logged in user
 * @property password
 * @type String
 * @since 0.1
 */
ITSACurrentUserClass.prototype.password = null;

/**
 * Current value of 'remember' of the logged in user
 * @property remember
 * @type Boolean
 * @since 0.1
 */
ITSACurrentUserClass.prototype.remember = null;

/**
 * Date.getTime() in ms when the loggin should expire
 * @property expire
 * @type Number
 * @private
 * @since 0.1
 */
ITSACurrentUserClass.prototype._expire = 0;

/**
 * Minutes after which a succesfull login should expire. by default is 60 minutes
 * @property expireAfter
 * @default 60
 * @type Number
 * @since 0.1
 */
ITSACurrentUserClass.prototype.expireAfter = DEFAULT_EXPIRE_AFTER;

/**
 * Current displayname of the logged in user
 * @property displayname
 * @type String
 * @since 0.1
 */
ITSACurrentUserClass.prototype.displayname = null;

/**
 * Current messageLoggedin of the logged in user
 * @property messageLoggedin
 * @type String
 * @since 0.1
 */
ITSACurrentUserClass.prototype.messageLoggedin = null;

/**
 * Current logged-in status
 * @property _isLoggedin
 * @type Boolean
 * @private
 * @since 0.1
 */
ITSACurrentUserClass.prototype._isLoggedin = false;

/**
 * @method initializer
 * @protected
 * @since 0.1
*/
ITSACurrentUserClass.prototype.initializer = function() {
    Y.log('initializer', 'info', 'ITSACurrentUser');
    var instance = this,
        eventhandlers = instance._eventhandlers = [];

    eventhandlers.push(
        Y.after(
            LOGGEDIN,
            function(e) {
                var username = e.username,
                    password = e.password,
                    remember = e.remember || false,
                    expireAfter = e.expireAfter,
                    displayname = e.displayname,
                    messageLoggedin = e.messageLoggedin,
                    userdata = e.userdata;
                if ((typeof username === STRING) && (typeof password === STRING) && (username.length>0) && (password.length>0)) {
                    // suppose valid login
                    instance.dologin(username, password, remember, expireAfter, displayname, messageLoggedin, userdata);
                }
                else {
                    instance.dologout(); // wrong login
                }
            }
        )
    );

    eventhandlers.push(
        Y.after(
            LOGGEDOUT,
            Y.bind(instance.dologout, instance)
        )
    );

    instance._isReady = new Y.Promise(function (resolve) {
        instance._loadUser().then(resolve, resolve);
    });
};

/**
 * Registeres the user by setting all internal properties to the logged-in user. If 'remember' is set true, the data is saved by localstorage,
 * otherwise localstorage will be emptied.
 *
 * @method dologin
 * @param login {Boolean} whether to set the submitbuttons to 'login' - or 'logout'
 * @private
 * @protected
 * @return {Y.Promise} resolved when save or cleanup through the localstorage is finished
 * @since 0.1
*/
ITSACurrentUserClass.prototype.dologin = function(username, password, remember, expireAfter, displayname, messageLoggedin, userdata) {
    Y.log('dologin', 'info', 'ITSACurrentUser');
    var instance = this,
        expire;
    instance.username = username;
    instance.password = password;
    instance.remember = remember;
    instance.displayname = displayname;
    instance.messageLoggedin = messageLoggedin;
    instance.setAttrs(userdata);
    instance.expireAfter = expireAfter || (remember ? DEFAULT_EXPIRE_WHEN_REMEMBERED : DEFAULT_EXPIRE_AFTER);
    instance._isLoggedin = true;
    // ALWAYS remember with expire time
    expire = new Date();
    dateAddMinutes(expire, instance.expireAfter);
    instance._expire = expire.getTime();
    instance._saveUser(expire);
};

/**
 * Unregisteres the user by cleaning up all internal user-properties. Localstorage will be emptied.
 *
 * @method dologout
 * @private
 * @protected
 * @return {Y.Promise} resolved when save or cleanup through the localstorage is finished
 * @since 0.1
*/
ITSACurrentUserClass.prototype.dologout = function() {
    Y.log('dologout', 'info', 'ITSACurrentUser');
    var instance = this;
    instance.reset();
    instance.set('id', undefined);
    instance.username = null;
    instance.password = null;
    instance.remember = false;
    instance.displayname = null;
    instance.messageLoggedin = null;
    instance._expire = 0;
    instance.expireAfter = DEFAULT_EXPIRE_AFTER;
    instance._isLoggedin = false;
    return instance._clearUser();
};

/**
 * Returns the current login-state. If resolved (loggedin), the uservalues are available by this object:
 * <ul>
 *    <li>username {String}</li>
 *    <li>password {String}</li>
 *    <li>remember {Boolean}</li>
 *    <li>expire {Date}</li>
 *    <li>displayname {String}</li>
 *    <li>messageLoggedin {String}</li>
 *    <li>userdata {Object}</li>
 * </ul>
 *
 * @method getCurrent
 * @return {Y.Promise} loggedin or not: a resolved promise means: loggedin (response holds the data), rejected means: loggedout
 * @since 0.1
*/
ITSACurrentUserClass.prototype.getCurrent = function() {
    Y.log('getCurrent', 'info', 'ITSACurrentUser');
    var instance = this,
        expire;
    return instance.isReady().then(
        function() {
            if (!instance._isLoggedin) {
                throw new Error('not loggedin');
            }
            else {
                expire = new Date();
                dateAddMinutes(expire, instance.expireAfter);
                instance._expire = expire.getTime();
                instance._saveUser(expire);
                return {
                    username: instance.username,
                    password: instance.password,
                    remember: instance.remember,
                    expire: expire,
                    displayname: instance.displayname,
                    messageLoggedin: instance.messageLoggedin,
                    userdata: instance.toJSON()
                };
            }
        }
    );
};

/**
 * Promise that the instance is ready and has all its properties loaded (from localstorage)
 *
 * @method isReady
 * @return {Y.Promise}
 * @since 0.1
*/
ITSACurrentUserClass.prototype.isReady = function() {
    Y.log('isReady', 'info', 'ITSACurrentUser');
    return this._isReady;
};

/**
 * Cleans up bindings
 *
 * @method destructor
 * @protected
 * @since 0.1
*/
ITSACurrentUserClass.prototype.destructor = function() {
    this._clearEventhandlers();
};

//===============================================================================================
// private methods
//===============================================================================================

/**
 * Cleaning up all eventlisteners
 *
 * @method _clearEventhandlers
 * @private
 * @since 0.1
*/
ITSACurrentUserClass.prototype._clearEventhandlers = function() {
    Y.log('_clearEventhandlers', 'info', 'ITSACurrentUser');
    YArray.each(
        this._eventhandlers,
        function(item){
            item.detach();
        }
    );
};

/**
 * Cleans the localstorage (refences of the currentuser)
 *
 * @method _clearUser
 * @private
 * @protected
 * @return {Y.Promise}
 * @since 0.1
*/
ITSACurrentUserClass.prototype._clearUser = function() {
    Y.log('_clearUser', 'info', 'ITSACurrentUser');
    return Y.ITSAStorage.removeItem(CURRENT_USER);
};

/**
 * Loads the userdata from the localstorage into this model.
 *
 * @method _loadUser
 * @private
 * @protected
 * @return {Y.Promise}
 * @since 0.1
*/
ITSACurrentUserClass.prototype._loadUser = function() {
    Y.log('_loadUser', 'info', 'ITSACurrentUser');
    var instance = this;
    return Y.ITSAStorage.getItem(CURRENT_USER).then(
        function(response) {
            instance.username = response.username;
            instance.password = response.password;
            instance.remember = response.remember;
            instance.displayname = response.displayname;
            instance.messageLoggedin = response.messageLoggedin;
            instance.setAttrs(response.userdata);
            instance._isLoggedin = true;
        },
        function() {
            return instance.dologout();
        }
    );
};

/**
 * Save the userdata of this model to the localstorage.
 *
 * @method _saveUser
 * @private
 * @protected
 * @return {Y.Promise}
 * @since 0.1
*/
ITSACurrentUserClass.prototype._saveUser = function(expire) {

    Y.log('_saveUser', 'info', 'ITSACurrentUser');
    // should save to localstorage, but that has to be done yet
    var instance = this,
        userdata = {
        username: instance.username,
        password: instance.password,
        remember: instance.remember,
        displayname: instance.displayname,
        messageLoggedin: instance.messageLoggedin,
        userdata: instance.toJSON()
    };
    return Y.ITSAStorage.setItem(CURRENT_USER, userdata, expire);
};


Y.ITSACurrentUser = new Y.ITSACurrentUserClass();

}, '@VERSION@', {"requires": ["yui-base", "promise", "gallery-itsastorage"]});
