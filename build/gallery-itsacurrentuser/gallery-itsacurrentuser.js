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
                    userdata = e.userdata;
                if ((typeof username === STRING) && (typeof password === STRING) && (username.length>0) && (password.length>0)) {
                    // suppose valid login
                    instance.dologin(username, password, remember, userdata);
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
ITSACurrentUserClass.prototype.dologin = function(username, password, remember, userdata) {
    var instance = this;
    instance.username = username;
    instance.password = password;
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
    var instance = this;
    // should load through localstorage, but that has to be done yet
    return new Y.Promise(function (resolve) {
        // also is responsible for setting the login-status
        instance._isLoggedin = false;
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
    // should load through localstorage, but that has to be done yet
    return new Y.Promise(function (resolve) {
        resolve();
    });
};


Y.ITSACurrentUser = new Y.ITSACurrentUserClass();

}, '@VERSION@', {"requires": ["yui-base", "promise"]});
