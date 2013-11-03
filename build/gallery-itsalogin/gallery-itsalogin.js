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
    ITSAMessageControllerInstance = Y.ITSAMessageController,
    ITSADialogClass = Y.ITSADialogClass,
    ITSADialogInstance = Y.ITSADialog,
    Lang = Y.Lang,
    YArray = Y.Array,
    YIntl = Y.Intl,
    BOOLEAN = 'boolean',
    INFO = 'info',
    WARN = 'warn',
    ERROR = 'error',
    UNDERSCORE = '_',
    OGIN = 'ogin',
    LOGIN = 'l'+OGIN,
    TEXT = 'text',
    GET = 'get',
    GET_LOGIN = GET+'L'+OGIN,
    APP = 'application',
    TYPE = 'type',
    ICONDIALOG = 'itsaicon-dialog-',
    ICON_INFO = ICONDIALOG+INFO,
    ICON_QUESTION = ICONDIALOG+'question',
    USERNAME = 'username',
    PASSWORD = 'password',
    FORGOT = 'forgot',
    EMAIL = 'email',
    USERNAME_OR_PASSWORD = USERNAME+'or'+PASSWORD,
    FORGOT_USERNAME = FORGOT+USERNAME,
    FORGOT_PASSWORD = FORGOT+PASSWORD,
    FORGOT_USERNAME_OR_PASSWORD = FORGOT+USERNAME_OR_PASSWORD,
    SEND = 'send',
    RESET = 'reset',
    SEND_USERNAME = SEND+USERNAME,
    CHANGE = 'change',
    RESET_PASSWORD = RESET+PASSWORD,
    CHANGE_PASSWORD = CHANGE+PASSWORD,
    PASSWORD_CHANGE = PASSWORD+CHANGE,
    SHOW_PASSWORD = 'show'+PASSWORD,
    VERIFY = 'verify',
    VERIFY_PASSWORD = VERIFY+PASSWORD,
    VERIFICATIONERROR = 'verification'+ERROR,
    CHANGE_YOUR_PASSWORD = CHANGE+'your'+PASSWORD,
    MESSAGE = 'message',
    MESSAGERESOLVE = MESSAGE+'resolve',
    STAYLOGGEDIN = 'stayloggedin',
    GALLERYITSALOGIN = 'gallery-itsalogin',
    CHECK = 'check',
    RECIEVEDMAILWITHINSTRUCTIONS = 'recievedmailwithinstructions',
    CHECKSPAMBOX = CHECK+'spambox',
    CHECKMAIL = CHECK+'mail',
    regainFn_Un,
    regainFn_Pw,
    regainFn_UnPw,
    changePwFn,

    PARSED = function (response) {
        if (typeof response === 'string') {
            try {
                return Y.JSON.parse(response);
            } catch (ex) {
                this.fire(ERROR, {
                    error   : ex,
                    response: response,
                    src     : 'parse'
                });
                return {};
            }
        }
        return response || {};
    };

/**
 * Internal objects with internationalized buttonlabels
 *
 * @property _intl
 * @private
 * @type Object
*/
ITSADialogClass.prototype._intl = YIntl.get(GALLERYITSALOGIN);

/**
  * Translates the given 'text; through Y.Int of this module. Possible text's that can be translated are:
  * <ul>
  *   <li>login</li>
  *   <li>enterlogin</li>
  *   <li>forgot</li>
  *   <li>stayloggedin</li>
  *   <li>remember</li>
  *   <li>rememberme</li>
  *   <li>username</li>
  *   <li>password</li>
  *   <li>forgotlogin</li>
  *   <li>forgotusernameorpassword</li>
  *   <li>forgotusername</li>
  *   <li>forgotpassword</li>
  *   <li>resetpassword</li>
  *   <li>forgotwhat</li>
  *   <li>entersignupaddress</li>
  *   <li>retrievepasswordinstructions</li>
  * </ul>
  *
  * @method translate
  * @param text {String} the text to be translated
  * @return {String} --> Translated text or the original text (if no translattion was possible)
  * @since 0.1
**/
ITSADialogClass.prototype.translate = function(text) {
    return this._intl[text] || text;
};

/**
  * Translates the given 'text; through Y.Int of this module. Possible text's that can be translated are:
  * <ul>
  *   <li>login</li>
  *   <li>enterlogin</li>
  *   <li>forgot</li>
  *   <li>stayloggedin</li>
  *   <li>remember</li>
  *   <li>rememberme</li>
  *   <li>username</li>
  *   <li>password</li>
  *   <li>forgotlogin</li>
  *   <li>forgotusernameorpassword</li>
  *   <li>forgotusername</li>
  *   <li>forgotpassword</li>
  *   <li>resetpassword</li>
  *   <li>forgotwhat</li>
  *   <li>entersignupaddress</li>
  *   <li>retrievepasswordinstructions</li>
  * </ul>
  *
  * @method translatePromise
  * @static
  * @param text {String} the text to be translated
  * @return {Y.Promise} resolve(translated) --> Translated text or the original text (if no translattion was possible)
  * @since 0.1
**/
ITSADialogClass.translatePromise = function(text) {
    return Y.usePromise('intl').then(
        function() {
            var intl = YIntl.get(GALLERYITSALOGIN);
            return intl[text] || text;
        },
        function() {
            return text;
        }
    );
};
ITSAMessageControllerClass.prototype.translatePromise = ITSAMessageControllerClass.translatePromise;

changePwFn = function(itsamessage) {
    var config = itsamessage.config,
        verifyNewPassword = ((typeof config.verifyNewPassword === BOOLEAN) && config.verifyNewPassword) || true,
        intl = ITSADialogInstance._intl,
        changePassword, formconfigPassword, formconfigVerifyPassword, formconfigShowPassword, MyChangePassword, message, imageButtons;
    // setting config for username:
    formconfigPassword = config.formconfigPassword || {};
/*jshint expr:true */
    formconfigPassword.label || formconfigPassword.placeholder || (formconfigPassword.label=intl[PASSWORD]);
/*jshint expr:false */
    formconfigPassword.fullselect = true;
    formconfigPassword.primarybtnonenter = !verifyNewPassword;
    formconfigPassword.classname = 'itsa-login' + (formconfigPassword.classname ? ' '+formconfigPassword.classname : '');
    formconfigPassword.required = true;

    if (verifyNewPassword) {
        formconfigVerifyPassword = config.formconfigVerifyPassword || {};
    /*jshint expr:true */
        formconfigVerifyPassword.label || formconfigVerifyPassword.placeholder || (formconfigVerifyPassword.label=intl[VERIFY]);
    /*jshint expr:false */
        formconfigVerifyPassword.fullselect = true;
        formconfigVerifyPassword.primarybtnonenter = true;
        formconfigVerifyPassword.classname = 'itsa-login' + (formconfigPassword.classname ? ' '+formconfigPassword.classname : '');
        formconfigVerifyPassword.required = true;
    }

    formconfigShowPassword = config.formconfigShowPassword || {};
/*jshint expr:true */
    formconfigShowPassword.label || formconfigShowPassword.placeholder || (formconfigShowPassword.label=intl[SHOW_PASSWORD]);
/*jshint expr:false */
    formconfigShowPassword.switchlabel = true;
    MyChangePassword = Y.Base.create('itsamessagechangepw', Y.ITSAMessage, [], {
                          crossValidation: function() {
                              var instance = this,
                                  errorattrs = [];
                              if (verifyNewPassword && (instance.getUI(VERIFY_PASSWORD) !== instance.getUI(VERIFY_PASSWORD))) {
                                  errorattrs.push({
                                      attribute: PASSWORD,
                                      validationerror: intl[VERIFICATIONERROR]
                                  });
                                  errorattrs.push({
                                      attribute: VERIFY_PASSWORD,
                                      validationerror: intl[VERIFICATIONERROR]
                                  });
                              }
                              return errorattrs;
                          }
                       }, {
                           ATTRS: {
                                password: {
                                    formtype: PASSWORD,
                                    formconfig: formconfigPassword,
                                    validator: config.validatorPassword,
                                    validationerror: config.validationerrorPassword
                                },
                                verifypassword: {
                                    formtype: PASSWORD,
                                    formconfig: formconfigVerifyPassword,
                                    validator: config.validatorPassword,
                                    validationerror: config.validationerrorPassword
                                },
                                showpassword: {
                                    value: false,
                                    formtype: Y.ITSACheckbox,
                                    formconfig: formconfigShowPassword
                                }
                           }
                       });
    message = (config.messageChangePassword || intl.needchangepassword) +
              '<fieldset class="'+'itsa-login'+'">'+
                   '<div class="pure-control-group">{password}</div>'+
                   (verifyNewPassword ? '<div class="pure-control-group">{verifypassword}</div><div class="itsa-login-checkbox">{showpassword}</div>' : '')+
              '</fieldset>';
    changePassword = new MyChangePassword();
    changePassword.syncPromise = itsamessage.syncPromise;
    imageButtons = (typeof config.imageButtons === BOOLEAN) && config.imageButtons;
    changePassword.icon = config.iconquestion || ICON_INFO;
    changePassword.title = config.titleChangePassword || intl[CHANGE_YOUR_PASSWORD];
    changePassword.message = message;
    changePassword.level = WARN;
    changePassword.target = 'itsadialog'; // widgetname that should handle this message
    changePassword.source = config.source || APP;
    changePassword.messageType = CHANGE_PASSWORD;
    changePassword.closeButton = itsamessage.config.closeButton || true;
    changePassword.footer = '{'+(imageButtons ? 'img' : '')+'btn_submit}';
    changePassword.buttonLabels = [
        {buttonType: (imageButtons ? 'img' : '')+'btn_submit', labelHTML: (imageButtons ? '<i class="itsaicon-dialog-switch"></i>' : '')+intl[CHANGE_PASSWORD]}
    ];
    if (verifyNewPassword) {
        changePassword.setLifeUpdate(true);
        changePassword.after('showpasswordChange', function(e) {
            var panelwarn = ITSADialogInstance.panels[WARN],
                inputpassword = panelwarn.get('contentBox').one('input[name="password"]'),
                inputverifypassword = panelwarn.get('contentBox').one('input[name="verifypassword"]'),
                checked = e.newVal;
            inputpassword.setAttribute(TYPE, (checked ? TEXT : PASSWORD));
            inputverifypassword.setAttribute(TYPE, (checked ? TEXT : PASSWORD));
        });
    }
    return ITSAMessageControllerInstance.queueMessage(changePassword);
};

regainFn_UnPw = function(config) {
    var intl = ITSADialogInstance._intl,
        imageButtons = (typeof config.imageButtons === BOOLEAN) && config.imageButtons,
        message = '<form>'+
                  (config.messageForgotUsernameOrPassword || intl[FORGOT+'what']) +
                  '<div class="itsa-dialog-forgotbutton itsadialog-firstbutton">{'+(imageButtons ? 'img' : '')+'btn_'+FORGOT_USERNAME+'}</div>'+
                  '<div class="itsa-dialog-forgotbutton">{'+(imageButtons ? 'img' : '')+'btn_'+FORGOT_PASSWORD+'}</div>'+
                  '</form>',
        forgotMessage = new Y.ITSAMessage();
    forgotMessage.icon = config.iconquestion || ICON_QUESTION;
    forgotMessage.title = config.titleForgotUsernameOrPassword || intl[FORGOT_USERNAME_OR_PASSWORD];
    forgotMessage.level = WARN;
    forgotMessage.target = 'itsadialog'; // widgetname that should handle this message
    forgotMessage.source = config.source || APP;
    forgotMessage.messageType = FORGOT_USERNAME_OR_PASSWORD;
    forgotMessage.message = message;
    forgotMessage.closeButton = true;
    if (imageButtons) {
        forgotMessage.customBtns=[
            {
                buttonId: 'imgbtn_'+FORGOT_USERNAME,
                labelHTML: '<i class="itsaicon-dialog-user"></i>'+intl[FORGOT_USERNAME],
                config: {
                    value: FORGOT_USERNAME,
                    classname: 'itsabutton-iconleft'
                }
            },
            {
                buttonId: 'imgbtn_'+FORGOT_PASSWORD,
                labelHTML: '<i class="itsaicon-dialog-key"></i>'+intl[FORGOT_PASSWORD],
                config: {
                    value: FORGOT_PASSWORD,
                    classname: 'itsabutton-iconleft'
                }
            }
        ];
    }
    else {
        forgotMessage.customBtns=[
            {
                buttonId: 'btn_'+FORGOT_USERNAME,
                labelHTML: intl[FORGOT_USERNAME],
                config: {
                    value: FORGOT_USERNAME
                }
            },
            {
                buttonId: 'btn_'+FORGOT_PASSWORD,
                labelHTML: intl[FORGOT_PASSWORD],
                config: {
                    value: FORGOT_PASSWORD
                }
            }
        ];
    }
    return ITSAMessageControllerInstance.queueMessage(forgotMessage);
};

regainFn_Un = function(config, syncPromise) {
    var formconfigForgotUsername, MyForgotUsername, message, forgotUsername, imageButtons, intl;
    intl = ITSADialogInstance._intl;
    // setting config for username:
    formconfigForgotUsername = config.formconfigForgotUsername || {};
/*jshint expr:true */
    formconfigForgotUsername.label || formconfigForgotUsername.placeholder || (formconfigForgotUsername.label=intl[EMAIL]);
/*jshint expr:false */
    formconfigForgotUsername.fullselect = true;
    formconfigForgotUsername.primarybtnonenter = true;
    formconfigForgotUsername.classname = 'itsa-login' + (formconfigForgotUsername.classname ? ' '+formconfigForgotUsername.classname : '');
    formconfigForgotUsername.required = true;

    MyForgotUsername = Y.Base.create('itsamessageforgotun', Y.ITSAMessage, [], null, {
                           ATTRS: {
                               emailaddress: {
                                   formtype: 'email',
                                   formconfig: formconfigForgotUsername,
                                   validator: config.validatorForgotUsername,
                                   validationerror: config.validationerrorForgotUsername
                               }
                           }
                       });
    message = (config.messageForgotUsername || intl.entersignupaddress) +
              '<fieldset class="'+'itsa-login'+'">'+
                   '<div class="pure-control-group">{emailaddress}</div>'+
              '</fieldset>';
    forgotUsername = new MyForgotUsername();
    forgotUsername.syncPromise = syncPromise;
    imageButtons = (typeof config.imageButtons === BOOLEAN) && config.imageButtons;
    forgotUsername.icon = config.iconquestion || ICON_QUESTION;
    forgotUsername.title = config.titleForgotUsername || intl[FORGOT_USERNAME];
    forgotUsername.message = message;
    forgotUsername.level = WARN;
    forgotUsername.target = 'itsadialog'; // widgetname that should handle this message
    forgotUsername.source = config.source || APP;
    forgotUsername.messageType = FORGOT_USERNAME;
    forgotUsername.closeButton = true;
    forgotUsername.footer = '{'+(imageButtons ? 'img' : '')+'btn_submit}';
    forgotUsername.buttonLabels = [
        {buttonType: (imageButtons ? 'img' : '')+'btn_submit', labelHTML: (imageButtons ? '<i class="itsaicon-dialog-mail"></i>' : '')+intl[SEND_USERNAME]}
    ];
    return ITSAMessageControllerInstance.queueMessage(forgotUsername).then(
        function() {
            forgotUsername.resolve(); // because it was 'submitted' the panelinstance didn't resolve. We do this manually
        }
    );
};

regainFn_Pw = function(config, syncPromise) {
    var formconfigForgotPassword, MyForgotPassword, message, forgotPassword, imageButtons, intl;
    intl = ITSADialogInstance._intl;
    // setting config for username:
    formconfigForgotPassword = config.formconfigForgotPassword || {};
/*jshint expr:true */
    formconfigForgotPassword.label || formconfigForgotPassword.placeholder || (formconfigForgotPassword.label=intl[USERNAME]);
/*jshint expr:false */
    formconfigForgotPassword.fullselect = true;
    formconfigForgotPassword.primarybtnonenter = true;
    formconfigForgotPassword.classname = 'itsa-login' + (formconfigForgotPassword.classname ? ' '+formconfigForgotPassword.classname : '');
    formconfigForgotPassword.required = true;

    MyForgotPassword = Y.Base.create('itsamessageforgotpw', Y.ITSAMessage, [], null, {
                           ATTRS: {
                               username: {
                                   formtype: 'text',
                                   formconfig: formconfigForgotPassword,
                                   validator: config.validatorUsername,
                                   validationerror: config.validationerrorUsername
                               }
                           }
                       });
    message = (config.messageForgotPassword || intl.retrievepasswordinstructions) +
              '<fieldset class="'+'itsa-login'+'">'+
                   '<div class="pure-control-group">{username}</div>'+
              '</fieldset>';
    forgotPassword = new MyForgotPassword();
    forgotPassword.syncPromise = syncPromise;
    imageButtons = (typeof config.imageButtons === BOOLEAN) && config.imageButtons;
    forgotPassword.icon = config.iconquestion || ICON_QUESTION;
    forgotPassword.title = config.titleForgotPassword || intl[FORGOT_PASSWORD];
    forgotPassword.message = message;
    forgotPassword.level = WARN;
    forgotPassword.target = 'itsadialog'; // widgetname that should handle this message
    forgotPassword.source = config.source || APP;
    forgotPassword.messageType = FORGOT_PASSWORD;
    forgotPassword.closeButton = true;
    forgotPassword.footer = '{'+(imageButtons ? 'img' : '')+'btn_submit}';
    forgotPassword.buttonLabels = [
        {buttonType: (imageButtons ? 'img' : '')+'btn_submit', labelHTML: (imageButtons ? '<i class="itsaicon-dialog-mail"></i>' : '')+intl[RESET_PASSWORD]}
    ];
    return ITSAMessageControllerInstance.queueMessage(forgotPassword).then(
        function() {
            forgotPassword.resolve(); // because it was 'submitted' the panelinstance didn't resolve. We do this manually
        }
    );
};

ITSADialogInstance.renderPromise().then(
    function() {
        YArray.each(
            [INFO, WARN],
            function(level) {
                var panel = ITSADialogInstance.panels[level];
                ITSADialogInstance._eventhandlers.push(
                    panel.after('*:submit', function(e) {
                        var itsamessage = e.target;
                        // Cautious: e.response is NOT available in the after-bubble chain --> see Y.ITSAFormModel - know issues
                        e.promise.then(
                            function(response) {
                                var responseObj = PARSED(response),
                                    intl = ITSADialogInstance._intl,
                                    contentBox, message, facade, config;
                                if (responseObj && responseObj.status) {
                                    if (responseObj.status==='OK') {
                                        itsamessage._set('button', 'submit');
                                        itsamessage.resolve(itsamessage.toJSON());
                                        // fire the login-event in case level===INFO, because the warn level was for handling forgotten username/password
                                        if (level===INFO) {
                                            facade = itsamessage.toJSON();
                                            facade.loginlevels = responseObj.loginlevels;
                                            ITSADialogInstance.fire('loggedin', facade);
                                        }
                                    }
                                    else if (responseObj.status==='NOACCESS') {
                                        message = responseObj.message || intl.loginblocked;
                                        // production-errors will be shown through the messagecontroller
                                        Y.showError(responseObj.title || intl[ERROR], message);
                                        itsamessage.reject(message);
                                    }
                                    else if (responseObj.status==='RETRY') {
                        /*jshint expr:true */
                                        responseObj.title && panel.set('title', responseObj.title);
                        /*jshint expr:false */
                                        message = responseObj.message || intl.unknownlogin;
                                        if (responseObj.message) {
                                            contentBox = panel.get('contentBox');
                                            contentBox.one('#itsa-messagewrapper').setHTML(responseObj.message);
                                        }
                                    }
                                    else if (responseObj.status==='REINIT') {
                                        message = responseObj.message || (intl[RECIEVEDMAILWITHINSTRUCTIONS] + ', ' + intl[CHECKSPAMBOX]);
                                        config = {
                                            level: WARN,
                                            target: 'itsadialog', // widgetname that should handle this message
                                            source: config.source || APP,
                                            messageType: 'reinitialization'
                                          };
                                        // show message at warn-level, to be sure it overrules the current loginpanel
                                        Y.showMessage(responseObj.title || intl[CHECKMAIL], message, config);
                                    }
                                    else if (responseObj.status==='CHANGEPASSWORD') {
                                        changePwFn(itsamessage).then(
                                            Y.showMessage(intl[PASSWORD_CHANGE], intl.passwordchanged, {
                                                level: WARN
                                            })
                                        );
                                    }
                                    else {
                                        // program-errors will be shown by fireing events. They can be seen by using Y.ITSAErrorReporter
                                        message = 'Wrong response.status found: '+responseObj.status+'. You should return one of these: OK | RETRY | NOACCESS | REINIT | CHANGEPASSWORD';
                                        facade = {src: 'Y.ITSALogin.submit()', msg: message};
                                        panel.fire('warn', facade);
                                        itsamessage.reject(message);
                                    }
                                }
                                else {
                                    // program-errors will be shown by fireing events. They can be seen by using Y.ITSAErrorReporter
                                    message = 'Response returned without response.status';
                                    facade = {src: 'Y.ITSALogin.submit()', msg: message};
                                    panel.fire('warn', facade);
                                    itsamessage.reject(message);
                                }
                            }
                        ).then(
                            null,
                            function(catchErr) {
                                var message = (catchErr && (catchErr.message || catchErr)) || 'Undefined error during submission';
                                // production-errors will be shown through the messagecontroller
                                Y.showWarning(message);
                            }
                        );
                    })
                );
            }
        );
    }
);

ITSAMessageControllerClass.prototype[UNDERSCORE+GET_LOGIN] = function(title, message, config, sync) {
    var instance = this,
        intl = ITSADialogInstance._intl,
        params = instance._retrieveLoginParams(title, message, config, sync),
        MyITSAMessage, formconfigUsername, formconfigPassword, formconfigRemember, syncPromise, regain,
        imageButtons, footer, primaryButton, forgotButton, regainFn;
    title = params.title;
    message = params.message;
    config = params.config;
    syncPromise = params.syncPromise;

    primaryButton = 'btn_submit';
    imageButtons = (typeof config.imageButtons === BOOLEAN) && config.imageButtons;
    regain = config.regain;
    forgotButton = ((typeof config.forgotButton === BOOLEAN) && config.forgotButton) || regain;
    footer = (forgotButton ? '{btn_forgot}' : '') + '{btn_submit}';
    if (imageButtons) {
        footer = footer.replace(/\{btn_/g,'{imgbtn_');
        primaryButton = primaryButton.replace(/btn_/g,'imgbtn_');
    }

    // setting config for username:
    formconfigUsername = config.formconfigUsername || {};
/*jshint expr:true */
    formconfigUsername.label || formconfigUsername.placeholder || (formconfigUsername.label=intl[USERNAME]);
/*jshint expr:false */
    formconfigUsername.fullselect = true;
    formconfigUsername.primarybtnonenter = false;
    formconfigUsername.classname = 'itsa-login' + (formconfigUsername.classname ? ' '+formconfigUsername.classname : '');
    formconfigUsername.required = true;

    // setting config for password:
    formconfigPassword = config.formconfigPassword || {};
/*jshint expr:true */
    formconfigPassword.label || formconfigPassword.placeholder || (formconfigPassword.label=intl[PASSWORD]);
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
    formconfigRemember.label || (formconfigRemember.label=intl[STAYLOGGEDIN]);
/*jshint expr:false */
    formconfigRemember.switchlabel = true;


    return instance.readyPromise().then(
        function() {
            var itsamessage;
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
                                          formtype: PASSWORD,
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
            message = '<span id="itsa-messagewrapper">' + message + '</span>'+
                      '<fieldset class="'+'itsa-login'+'">'+
                           '<div class="pure-control-group">{'+USERNAME+'}</div>'+
                           '<div class="pure-control-group">{'+PASSWORD+'}</div>'+
                           '<div class="itsa-login-checkbox">{remember}</div>'+
                      '</fieldset>';
            itsamessage = new MyITSAMessage();
            itsamessage.syncPromise = syncPromise;
            itsamessage.config = config;
            itsamessage.icon = config.icon || ICON_INFO;
            itsamessage.target = 'itsadialog'; // widgetname that should handle this message
            itsamessage.title = title;
            itsamessage.message = message;
            itsamessage.footer = footer;
            itsamessage.imageButtons = imageButtons;
            itsamessage.closeButton = config.closeButton || true;
            itsamessage.primaryButton = config.primaryButton || primaryButton; // config.primaryButton should overrule primaryButton
            itsamessage.timeoutReject = config.timeoutReject;
            itsamessage.level = INFO; // always needs no be at infolevel, because forgot-username/password will show at warn-level
            itsamessage.source = config.source || APP;
            itsamessage.messageType = GET_LOGIN;
            itsamessage.buttonLabels = [
                {buttonType: 'btn_submit', labelHTML: intl[LOGIN]},
                {buttonType: 'imgbtn_submit', labelHTML: '<i class="itsaicon-dialog-login"></i>'+intl[LOGIN]}
            ];
            // Next: if the user want a 'forgot-button' then set it up
            if (forgotButton) {
                // first an extra button for itsamessage on the first dialog:
                itsamessage.customBtns=[
                    {
                        buttonId: 'btn_forgot',
                        labelHTML: intl[FORGOT],
                        config: {
                            value: 'forgot'
                        }
                    },
                    {
                        buttonId: 'imgbtn_forgot',
                        labelHTML: '<i class="itsaicon-dialog-question"></i>'+intl[FORGOT],
                        config: {
                            value: 'forgot',
                            classname: 'itsabutton-iconleft'
                        }
                    }
                ];
                itsamessage.on(MESSAGERESOLVE, function(e) {
                    if (e.attrs && (e.attrs.button==='forgot')) {
                        e.preventDefault();
                        regainFn = (regain===USERNAME_OR_PASSWORD) ? regainFn_UnPw(config) : regainFn_Pw(config, syncPromise);
                        regainFn.then(
                            function(result) {
                                if (result.button===FORGOT_USERNAME) {
                                    return regainFn_Un(config, syncPromise);
                                }
                                else if (result.button===FORGOT_PASSWORD) {
                                    return regainFn_Pw(config, syncPromise);
                                }
                            }
                        ).then(
                            function() {
                                var message = config.instructionMessage || (intl[RECIEVEDMAILWITHINSTRUCTIONS] + ', ' + intl[CHECKSPAMBOX]),
                                    newconfig = {
                                        level: WARN,
                                        target: 'itsadialog', // widgetname that should handle this message
                                        source: config.source || APP,
                                        messageType: 'instructions'
                                    };
                                // show message at warn-level, to be sure it overrules the current loginpanel
                                Y.showMessage(config.instructionTitle || intl[CHECKMAIL], message, newconfig);
                            },
                            function() {
                                Y.ITSADialogInstance.resurrect(itsamessage);
                            }
                        );
                    }
                });
            }
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

Y[LOGIN] = Y.bind(ITSAMessageControllerInstance[UNDERSCORE+GET_LOGIN], ITSAMessageControllerInstance);

}, '@VERSION@', {
    "requires": [
        "yui-base",
        "intl",
        "gallery-itsamessagecontroller",
        "gallery-itsacheckbox",
        "gallery-itsadialog",
        "gallery-itsamessage",
        "gallery-itsaviewmodelpanel",
        "gallerycss-itsa-base",
        "gallerycss-itsa-animatespin",
        "gallerycss-itsa-dialog"
    ],
    "lang": [
        "ar",
        "bg",
        "bs",
        "cs",
        "da",
        "de",
        "en",
        "es",
        "fa",
        "fi",
        "fr",
        "he",
        "hi",
        "hr",
        "hu",
        "it",
        "ja",
        "nb",
        "nl",
        "pl",
        "pt",
        "ru",
        "sk",
        "sr",
        "sv",
        "uk",
        "zh"
    ],
    "skinnable": true
});
