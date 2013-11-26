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
    STRING = 'string';

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
    var instance = this,
        eventhandlers = instance._eventhandlers = [];

    eventhandlers.push(
        Y.after(
            LOGGEDIN,
            function(e) {
                var username = e.username,
                    password = e.password,
                    remember = e.remember || false,
                    displayname = e.displayname,
                    messageLoggedin = e.messageLoggedin,
                    userdata = e.userdata;
                if ((typeof username === STRING) && (typeof password === STRING) && (username.length>0) && (password.length>0)) {
                    // suppose valid login
                    instance.dologin(username, password, remember, displayname, messageLoggedin, userdata);
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
ITSACurrentUserClass.prototype.dologin = function(username, password, remember, displayname, messageLoggedin, userdata) {
    var instance = this;
    instance.username = username;
    instance.password = password;
    instance.remember = remember;
    instance.displayname = displayname;
    instance.messageLoggedin = messageLoggedin;
    instance.setAttrs(userdata);
    instance._isLoggedin = true;
    return remember ? instance._saveUser() : instance._clearUser();
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
    var instance = this;
    instance.reset();
    instance.set('id', undefined);
    instance._isLoggedin = false;
    return instance._clearUser();
};

/**
 * Returns the current login-state. If resolved (loggedin), the uservalues are available by this object:
 * <ul>
 *    <li>username</li>
 *    <li>password</li>
 *    <li>remember</li>
 *    <li>displayname</li>
 *    <li>messageLoggedin</li>
 *    <li>userdata</li>
 * </ul>
 *
 * @method isLoggedin
 * @return {Y.Promise} loggedin or not: a resolved promise means: loggedin (response holds the data), rejected means: loggedout
 * @since 0.1
*/
ITSACurrentUserClass.prototype.isLoggedin = function() {
    var instance = this;
    return instance.isReady().then(
        function() {
            if (!instance._isLoggedin) {
                throw new Error('not loggedin');
            }
            else {
                return {
                    username: instance.username,
                    password: instance.password,
                    remember: instance.remember,
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
    // should cleanup localstorage, but that has to be done yet
    return new Y.Promise(function (resolve) {
        // also is responsible for setting the login-status
        resolve();
    });
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
    var instance = this;
    // should load through localstorage, but that has to be done yet
    return new Y.Promise(function (resolve) {
        // also is responsible for setting the login-status
        instance._isLoggedin = false;
        resolve();
    });
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
ITSACurrentUserClass.prototype._saveUser = function() {
    // should save to localstorage, but that has to be done yet
    return new Y.Promise(function (resolve) {
        resolve();
    });
};


Y.ITSACurrentUser = new Y.ITSACurrentUserClass();

}, '@VERSION@', {"requires": ["yui-base", "promise"]});
