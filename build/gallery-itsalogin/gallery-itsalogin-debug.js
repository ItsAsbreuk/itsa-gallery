YUI.add('gallery-itsalogin', function (Y, NAME) {

'use strict';

/*jshint maxlen:200 */

/**
 * This module adds three dialog-promises to YUI:
 *
 * Y.alert()
 * Y.prompt()
 * Y.confirm()
 *
 *
 * @module gallery-itsadialog
 * @class Y
 * @since 0.1
 *
 * <i>Copyright (c) 2013 Marco Asbreuk - http://theinternetwizard.net</i>
 * YUI BSD License - http://developer.yahoo.com/yui/license.html
 *
*/

var ITSAMessageControllerClass = Y.ITSAMessageControllerClass,
    ITSAMessageControllerInstance,
    Lang = Y.Lang,
    BOOLEAN = 'boolean',
    INFO = 'info',
    UNDERSCORE = '_',
    OGIN = 'ogin',
    LOGIN = 'l'+OGIN,
    GET_LOGIN = 'getL'+OGIN,
    APP = 'application';

ITSAMessageControllerClass.prototype[UNDERSCORE+GET_LOGIN] = function(title, message, config, sync) {
    var instance = this,
        params = instance._retrieveLoginParams(title, message, config, sync),
        required, MyITSAMessage, formconfigUsername, formconfigPassword, formconfigRemember, syncPromise, imageButtons, footer, primaryButton, rejectButton;
    title = params.title;
    message = params.message;
    config = params.config;
    syncPromise = params.syncPromise;

    required = (typeof config.required === BOOLEAN) && config.required;
    footer = (required ? '' : '{btn_cancel}') + '{btn_submit}';
    primaryButton = 'btn_submit';
    rejectButton = (required ? null : 'btn_cancel');
    imageButtons = (typeof config.imageButtons === BOOLEAN) && config.imageButtons;
/*jshint expr:true */
    if (imageButtons) {
        footer = footer.replace(/\{btn_/g,'{imgbtn_');
        primaryButton = primaryButton.replace(/btn_/g,'imgbtn_');
    }
/*jshint expr:false */

    // setting config for username:
    formconfigUsername = config.formconfigUsername || {};
/*jshint expr:true */
    formconfigUsername.label || formconfigUsername.placeholder || (formconfigUsername.label='username');
/*jshint expr:false */
    formconfigUsername.fullselect = true;
    formconfigUsername.primarybtnonenter = false;
    formconfigUsername.classname = 'itsa-login' + (formconfigUsername.classname ? ' '+formconfigUsername.classname : '');
    formconfigUsername.required = true;

    // setting config for password:
    formconfigPassword = config.formconfigPassword || {};
/*jshint expr:true */
    formconfigPassword.label || formconfigPassword.placeholder || (formconfigPassword.label='password');
/*jshint expr:false */
    formconfigPassword.fullselect = true;
    formconfigPassword.primarybtnonenter = true;
    formconfigPassword.classname = 'itsa-login' + (formconfigPassword.classname ? ' '+formconfigPassword.classname : '');
    formconfigPassword.required = true;

    // setting config for remember:
    formconfigRemember = config.formconfigRemember || {};
/*jshint expr:true */
    formconfigUsername.label && !formconfigPassword.label && (formconfigPassword.label = ' ');
    formconfigPassword.label && !formconfigUsername.label && (formconfigUsername.label = ' ');
    formconfigRemember.label || (formconfigRemember.label='remember me');
/*jshint expr:false */
    formconfigRemember.switchlabel = true;


    return instance.readyPromise().then(
        function() {
            MyITSAMessage = Y.Base.create('itsamessageinput', Y.ITSAMessage, [], null, {
                                  ATTRS: {
                                      username: {
                                          value: formconfigUsername.value || '',
                                          formtype: 'text',
                                          formconfig: formconfigUsername,
                                          validator: config.validatorUsername,
                                          validationerror: config.validationerrorUsername
                                      },
                                      password: {
                                          value: formconfigPassword.value || '',
                                          formtype: 'password',
                                          formconfig: formconfigPassword,
                                          validator: config.validatorPassword,
                                          validationerror: config.validationerrorPassword
                                      },
                                      remember: {
                                          value: formconfigRemember.value || false,
                                          formtype: Y.ITSACheckbox,
                                          formconfig: formconfigRemember
                                      }
                                  }
                              });
            message += '<fieldset class="'+'itsa-login'+'">'+
                           '<div class="pure-control-group">{username}</div>'+
                           '<div class="pure-control-group">{password}</div>'+
                           '<div class="itsa-login-checkbox">{remember}</div>'+
                       '</fieldset>';
            var itsamessage = new MyITSAMessage();
            itsamessage.syncPromise = syncPromise;
            itsamessage.target = 'itsadialog'; // widgetname that should handle this message
            itsamessage.title = title;
            itsamessage.message = message;
            itsamessage.footer = footer;
            itsamessage.imageButtons = imageButtons;
            itsamessage.primaryButton = config.primaryButton || primaryButton; // config.primaryButton should overrule primaryButton
            itsamessage.rejectButton = rejectButton;
            itsamessage.target = config.target;
            itsamessage.level = config.level || INFO || config.type; // config.level should overrule the param level; config.type is for backwards compatibility
            itsamessage.source = config.source || APP;
            itsamessage.messageType = GET_LOGIN;
            itsamessage.buttonLabels = [
                {buttonType: 'btn_submit', labelHTML: 'login'},
                {buttonType: 'imgbtn_submit', labelHTML: '<i class="itsaicon-special-key"></i>login'},
                {buttonType: 'imgbtn_cancel', labelHTML: '<i class="itsaicon-special-cancel"></i>cancel'}
            ];
            return instance.queueMessage(itsamessage);
        }
    );
};

ITSAMessageControllerClass.prototype._retrieveLoginParams = function(title, message, config, syncPromise) {
    var withTitle = (typeof message === 'string'),
        withMessage, withConfig;
    if (!withTitle) {
        syncPromise = config;
        config = message;
        message = title;
        title = null;
    }
    withMessage = (typeof message === 'string');
    if (!withMessage) {
        syncPromise = config;
        config = message;
        message = '';
        title = null;
    }
    withConfig = (Lang.isObject(config));
    if (!withConfig) {
        syncPromise = config;
        config = {};
        message = '';
        title = null;
    }
    // when no syncPromise is defined, we need to reject the syncpromise.
/*jshint expr:true */
    (typeof syncPromise === 'function') || (syncPromise=function() {
        return new Y.Promise(function (resolve, reject) {
            reject(new Error('no syncPromise defined'));
        });
    });
/*jshint expr:false */
    return {
        title: title,
        message: message,
        config: config,
        syncPromise: syncPromise
    };
};

ITSAMessageControllerInstance = Y.ITSAMessageController;
Y[LOGIN] = Y.bind(ITSAMessageControllerInstance[UNDERSCORE+GET_LOGIN], ITSAMessageControllerInstance);

}, '@VERSION@', {
    "requires": [
        "yui-base",
        "gallery-itsamessagecontroller",
        "gallery-itsacheckbox",
        "gallery-itsadialog",
        "gallery-itsamessage",
        "gallery-itsaviewmodelpanel",
        "gallerycss-itsa-base",
        "gallerycss-itsa-animatespin",
        "gallerycss-itsa-special"
    ],
    "skinnable": true
});
