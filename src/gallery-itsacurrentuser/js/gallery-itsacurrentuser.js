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

ITSACurrentUserClass.prototype.username = null;
ITSACurrentUserClass.prototype.password = null;
ITSACurrentUserClass.prototype.remember = null;
ITSACurrentUserClass.prototype._isLoggedin = false;
ITSACurrentUserClass.prototype.displayname = null;
ITSACurrentUserClass.prototype.messageLoggedin = null;

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
 * Re-sets the submitbuttons of the form to the right buttons.
 *
 * @method dologin
 * @param login {Boolean} whether to set the submitbuttons to 'login' - or 'logout'
 * @private
 * @protected
 * @since 0.1
*/
ITSACurrentUserClass.prototype.dologin = function(username, password, remember, displayname, messageLoggedin, userdata) {
    Y.log('dologin', 'info', 'ITSACurrentUser');
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
 * Re-sets the submitbuttons of the form to the right buttons.
 *
 * @method dologout
 * @param login {Boolean} whether to set the submitbuttons to 'login' - or 'logout'
 * @private
 * @protected
 * @since 0.1
*/
ITSACurrentUserClass.prototype.dologout = function() {
    Y.log('dologout', 'info', 'ITSACurrentUser');
    var instance = this;
    instance.reset();
    instance.set('id', undefined);
    instance._isLoggedin = false;
    return instance._clearUser();
};

/**
 * Re-sets the submitbuttons of the form to the right buttons.
 *
 * @method isLoggedin
 * @return {Y.Promise} loggedin or not: a resolved promise means: loggedin, rejected means: loggedout
 * @since 0.1
*/
ITSACurrentUserClass.prototype.isLoggedin = function() {
    Y.log('isLoggedin', 'info', 'ITSACurrentUser');
    var instance = this;
    return instance.isReady().then(
        function() {
            if (!instance._isLoggedin) {
                throw new Error('not loggedin');
            }
        }
    );
};

/**
 * Re-sets the submitbuttons of the form to the right buttons.
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
 * @method destructor
 * @protected
 * @since 0.3
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
 * @since 0.3
 *
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
 * Re-sets the submitbuttons of the form to the right buttons.
 *
 * @method _clearUser
 * @param login {Boolean} whether to set the submitbuttons to 'login' - or 'logout'
 * @private
 * @protected
 * @return {Y.Promise}
 * @since 0.1
*/
ITSACurrentUserClass.prototype._clearUser = function() {
    Y.log('_clearUser', 'info', 'ITSACurrentUser');
    // should load through localstorage, but that has to be done yet
    return new Y.Promise(function (resolve) {
        // also is responsible for setting the login-status
        resolve();
    });
};

/**
 * Re-sets the submitbuttons of the form to the right buttons.
 *
 * @method _loadUser
 * @param login {Boolean} whether to set the submitbuttons to 'login' - or 'logout'
 * @private
 * @protected
 * @return {Y.Promise}
 * @since 0.1
*/
ITSACurrentUserClass.prototype._loadUser = function() {
    Y.log('_loadUser', 'info', 'ITSACurrentUser');
    var instance = this;
    // should load through localstorage, but that has to be done yet
    return new Y.Promise(function (resolve) {
        // also is responsible for setting the login-status
        instance._isLoggedin = true;
instance.displayname = 'this is the displayname';
instance.messageLoggedin = 'Logged in as {displayname}';
        resolve();
    });
};

/**
 * Re-sets the submitbuttons of the form to the right buttons.
 *
 * @method _saveUser
 * @param login {Boolean} whether to set the submitbuttons to 'login' - or 'logout'
 * @private
 * @protected
 * @return {Y.Promise}
 * @since 0.1
*/
ITSACurrentUserClass.prototype._saveUser = function() {
    Y.log('_loadUser', 'info', 'ITSACurrentUser');
    // should load through localstorage, but that has to be done yet
    return new Y.Promise(function (resolve) {
        resolve();
    });
};


Y.ITSACurrentUser = new Y.ITSACurrentUserClass();