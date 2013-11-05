YUI.add('gallery-itsalogin', function (Y, NAME) {

'use strict';

/*jshint maxlen:200 */


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
    MAIL = 'mail',
    EMAIL = 'e'+MAIL,
    USERNAME_OR_PASSWORD = USERNAME+'or'+PASSWORD,
    FORGOT_USERNAME = FORGOT+USERNAME,
    FORGOT_PASSWORD = FORGOT+PASSWORD,
    FORGOT_USERNAME_OR_PASSWORD = FORGOT+USERNAME_OR_PASSWORD,
    CREATE_ACCOUNT = 'createaccount',
    SEND = 'send',
    RESET = 'reset',
    SEND_USERNAME = SEND+USERNAME,
    CHANGE = 'change',
    RESET_PASSWORD = RESET+PASSWORD,
    CHANGE_PASSWORD = CHANGE+PASSWORD,
    SHOW_PASSWORD = 'show'+PASSWORD,
    PASSWORD_CHANGE = PASSWORD+CHANGE,
    PASSWORD_CHANGED = PASSWORD_CHANGE+'d',
    VERIFY = 'verify',
    VERIFY_PASSWORD = VERIFY+PASSWORD,
    VERIFICATIONERROR = 'verification'+ERROR,
    CHANGE_YOUR_PASSWORD = CHANGE+'your'+PASSWORD,
    VERIFYNEWPASSWORD = 'verifyNewPassword',
    MESSAGE = 'message',
    MESSAGERESOLVE = MESSAGE+'resolve',
    STAYLOGGEDIN = 'stayloggedin',
    GALLERYITSALOGIN = 'gallery-itsalogin',
    CHECK = 'check',
    RECIEVEDMAILWITHINSTRUCTIONS = 'recievedmailwithinstructions',
    CHECKSPAMBOX = CHECK+'spambox',
    CHECKMAIL = CHECK+'mail',
    CLASSNAME = 'classname',
    PRIMARYBTNONENTER = 'primarybtnonenter',
    FULLSELECT = 'fullselect',
    LABEL = 'label',
    PLACEHOLDER = 'placeholder',
    REQUIRED = 'required',
    ITSA = 'itsa',
    ITSA_LOGIN = ITSA+'-'+LOGIN,
    DIALOG = 'dialog',
    ITSADIALOG = ITSA+DIALOG,
    SPANWRAPPER = '<span class="itsa-messagewrapper">',
    FIELDSET_START = '<fieldset class="'+ITSA_LOGIN+'">',
    ENDSPAN = '</span>',
    DIVCLASS_PURECONTROLGROUP = '<div class="pure-control-group">',
    ENDDIV = '</div>',
    DIVCLASS_ITSA = '<div class="itsa-',
    ENDFIELDSET = '</fieldset>',
    IMG = 'img',
    SUBMIT = 'submit',
    BTN_ = 'btn_',
    BTNSUBMIT = BTN_+SUBMIT,
    CONTENTBOX = 'contentBox',
    IMGBTN_ = IMG+BTN_,
    BUTTON = 'button',
    DIALOG_FORGOTBUTTON = DIALOG+'-'+FORGOT+BUTTON,
    INPUTNAMEIS = 'input[name="',
    ITSABUTTON_ICONLEFT = 'itsabutton-iconleft',
    I_CLASS_ITSADIALOG = '<i class="itsaicon-dialog',
    LOGGEDIN = 'loggedin',
    STRING = 'string',
    ADDRESS = 'address',
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
 *
 * @module gallery-itsalogin
 * @class Y.ITSADialog
 * @since 0.1
 *
 * <i>Copyright (c) 2013 Marco Asbreuk - http://theinternetwizard.net</i>
 * YUI BSD License - http://developer.yahoo.com/yui/license.html
 *
*/

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
    Y.log('translate', 'info', 'ITSA-Login');
    return this._intl[text] || text;
};

//*********************************************************************************************

changePwFn = function(itsamessage) {
    var config = itsamessage.config,
        verifyNewPassword = ((typeof config[VERIFYNEWPASSWORD] === BOOLEAN) && config[VERIFYNEWPASSWORD]) || true,
        intl = ITSADialogInstance._intl,
        changePassword, formconfigPassword, formconfigVerifyPassword, formconfigShowPassword, MyChangePassword, message, imageButtons;
    // setting config for username:
    formconfigPassword = config.formconfigPassword || {};
/*jshint expr:true */
    formconfigPassword[LABEL] || formconfigPassword[PLACEHOLDER] || (formconfigPassword[LABEL]=intl[PASSWORD]);
/*jshint expr:false */
    formconfigPassword[FULLSELECT] = true;
    formconfigPassword[PRIMARYBTNONENTER] = !verifyNewPassword;
    formconfigPassword[CLASSNAME] = ITSA_LOGIN + (formconfigPassword[CLASSNAME] ? ' '+formconfigPassword[CLASSNAME] : '');
    formconfigPassword[REQUIRED] = true;

    if (verifyNewPassword) {
        formconfigVerifyPassword = config.formconfigVerifyPassword || {};
    /*jshint expr:true */
        formconfigVerifyPassword[LABEL] || formconfigVerifyPassword[PLACEHOLDER] || (formconfigVerifyPassword[LABEL]=intl[VERIFY]);
    /*jshint expr:false */
        formconfigVerifyPassword[FULLSELECT] = true;
        formconfigVerifyPassword[PRIMARYBTNONENTER] = true;
        formconfigVerifyPassword[CLASSNAME] = ITSA_LOGIN + (formconfigPassword[CLASSNAME] ? ' '+formconfigPassword[CLASSNAME] : '');
        formconfigVerifyPassword[REQUIRED] = true;
    }

    formconfigShowPassword = config.formconfigShowPassword || {};
/*jshint expr:true */
    formconfigShowPassword[LABEL] || formconfigShowPassword[PLACEHOLDER] || (formconfigShowPassword[LABEL]=intl[SHOW_PASSWORD]);
/*jshint expr:false */
    formconfigShowPassword.switchlabel = true;
    MyChangePassword = Y.Base.create('itsamessagechangepw', Y.ITSAMessage, [], {
                          crossValidation: function() {
                              var instance = this,
                                  errorattrs = [];
                              if (verifyNewPassword && (instance.get(PASSWORD) !== instance.get(VERIFY_PASSWORD))) {
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
    message = SPANWRAPPER + (config.messageChangePassword || intl.needchangepassword) + ENDSPAN+
              FIELDSET_START+
                   DIVCLASS_PURECONTROLGROUP+'{'+PASSWORD+'}'+ENDDIV+
                   (verifyNewPassword ? DIVCLASS_PURECONTROLGROUP+'{'+VERIFY_PASSWORD+'}'+ENDDIV+DIVCLASS_ITSA+'login-checkbox">{'+SHOW_PASSWORD+'}'+ENDDIV : '')+
              ENDFIELDSET;
    changePassword = new MyChangePassword();
    changePassword.syncPromise = itsamessage.syncPromise;
    imageButtons = (typeof config.imageButtons === BOOLEAN) && config.imageButtons;
    changePassword.icon = config.iconquestion || ICON_INFO;
    changePassword.title = config.titleChangePassword || intl[CHANGE_YOUR_PASSWORD];
    changePassword.message = message;
    changePassword.level = WARN;
    changePassword.config = config;
    changePassword.target = ITSADIALOG; // widgetname that should handle this message
    changePassword.source = config.source || APP;
    changePassword.messageType = CHANGE_PASSWORD;
    changePassword.closeButton = itsamessage.config.closeButton || true;
    changePassword.footer = '{'+(imageButtons ? IMG : '')+BTNSUBMIT+'}';
    changePassword.primaryButton = (imageButtons ? IMG : '')+BTNSUBMIT;
    changePassword._submitBtn = CHANGE_PASSWORD;
    changePassword.buttonLabels = [
        {buttonType: (imageButtons ? IMG : '')+BTNSUBMIT, labelHTML: (imageButtons ? I_CLASS_ITSADIALOG+'-switch"></i>' : '')+intl[CHANGE_PASSWORD]}
    ];
    if (verifyNewPassword) {
        changePassword.setLifeUpdate(true);
        changePassword.after('showpasswordChange', function(e) {
            var panelwarn = ITSADialogInstance.panels[WARN],
                inputpassword = panelwarn.get(CONTENTBOX).one(INPUTNAMEIS+PASSWORD+'"]'),
                inputverifypassword = panelwarn.get(CONTENTBOX).one(INPUTNAMEIS+VERIFY_PASSWORD+'"]'),
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
                  DIVCLASS_ITSA+DIALOG_FORGOTBUTTON+' '+ITSADIALOG+'-firstbutton">{'+(imageButtons ? IMG : '')+BTN_+FORGOT_USERNAME+'}'+ENDDIV+
                  DIVCLASS_ITSA+DIALOG_FORGOTBUTTON+'">{'+(imageButtons ? IMG : '')+BTN_+FORGOT_PASSWORD+'}'+ENDDIV+
                  '</form>',
        forgotMessage = new Y.ITSAMessage();
    forgotMessage.icon = config.iconquestion || ICON_QUESTION;
    forgotMessage.title = config.titleForgotUsernameOrPassword || intl[FORGOT_USERNAME_OR_PASSWORD];
    forgotMessage.level = WARN;
    forgotMessage.config = config;
    forgotMessage.target = ITSADIALOG; // widgetname that should handle this message
    forgotMessage.source = config.source || APP;
    forgotMessage.messageType = FORGOT_USERNAME_OR_PASSWORD;
    forgotMessage.message = message;
    forgotMessage.closeButton = true;
    if (imageButtons) {
        forgotMessage.customBtns=[
            {
                buttonId: IMGBTN_+FORGOT_USERNAME,
                labelHTML: I_CLASS_ITSADIALOG+'-user"></i>'+intl[FORGOT_USERNAME],
                config: {
                    value: FORGOT_USERNAME,
                    classname: ITSABUTTON_ICONLEFT
                }
            },
            {
                buttonId: IMGBTN_+FORGOT_PASSWORD,
                labelHTML: I_CLASS_ITSADIALOG+'-key"></i>'+intl[FORGOT_PASSWORD],
                config: {
                    value: FORGOT_PASSWORD,
                    classname: ITSABUTTON_ICONLEFT
                }
            }
        ];
    }
    else {
        forgotMessage.customBtns=[
            {
                buttonId: BTN_+FORGOT_USERNAME,
                labelHTML: intl[FORGOT_USERNAME],
                config: {
                    value: FORGOT_USERNAME
                }
            },
            {
                buttonId: BTN_+FORGOT_PASSWORD,
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
    formconfigForgotUsername[LABEL] || formconfigForgotUsername[PLACEHOLDER] || (formconfigForgotUsername[LABEL]=intl[EMAIL]);
/*jshint expr:false */
    formconfigForgotUsername[FULLSELECT] = true;
    formconfigForgotUsername[PRIMARYBTNONENTER] = true;
    formconfigForgotUsername[CLASSNAME] = ITSA_LOGIN + (formconfigForgotUsername[CLASSNAME] ? ' '+formconfigForgotUsername[CLASSNAME] : '');
    formconfigForgotUsername[REQUIRED] = true;

    MyForgotUsername = Y.Base.create('itsamessageforgotun', Y.ITSAMessage, [], null, {
                           ATTRS: {
                               emailaddress: {
                                   formtype: EMAIL,
                                   formconfig: formconfigForgotUsername,
                                   validator: config.validatorForgotUsername,
                                   validationerror: config.validationerrorForgotUsername
                               }
                           }
                       });
    message = SPANWRAPPER + (config.messageForgotUsername || intl.entersignupaddress) + ENDSPAN+
              FIELDSET_START+
                   DIVCLASS_PURECONTROLGROUP+'{'+EMAIL+ADDRESS+'}'+ENDDIV+
              ENDFIELDSET;
    forgotUsername = new MyForgotUsername();
    forgotUsername.syncPromise = syncPromise;
    imageButtons = (typeof config.imageButtons === BOOLEAN) && config.imageButtons;
    forgotUsername.icon = config.iconquestion || ICON_QUESTION;
    forgotUsername.title = config.titleForgotUsername || intl[FORGOT_USERNAME];
    forgotUsername.message = message;
    forgotUsername.level = WARN;
    forgotUsername.config = config;
    forgotUsername.target = ITSADIALOG; // widgetname that should handle this message
    forgotUsername.source = config.source || APP;
    forgotUsername.messageType = FORGOT_USERNAME;
    forgotUsername._submitBtn = FORGOT_USERNAME;
    forgotUsername.closeButton = true;
    forgotUsername.primaryButton = (imageButtons ? IMG : '')+BTNSUBMIT;
    forgotUsername.footer = '{'+(imageButtons ? IMG : '')+BTNSUBMIT+'}';
    forgotUsername.buttonLabels = [
        {buttonType: (imageButtons ? IMG : '')+BTNSUBMIT, labelHTML: (imageButtons ? I_CLASS_ITSADIALOG+'-mail"></i>' : '')+intl[SEND_USERNAME]}
    ];
    return ITSAMessageControllerInstance.queueMessage(forgotUsername);
};

regainFn_Pw = function(config, syncPromise) {
    var formconfigForgotPassword, MyForgotPassword, message, forgotPassword, imageButtons, intl;
    intl = ITSADialogInstance._intl;
    // setting config for username:
    formconfigForgotPassword = config.formconfigForgotPassword || {};
/*jshint expr:true */
    formconfigForgotPassword.label || formconfigForgotPassword[PLACEHOLDER] || (formconfigForgotPassword.label=intl[USERNAME]);
/*jshint expr:false */
    formconfigForgotPassword[FULLSELECT] = true;
    formconfigForgotPassword[PRIMARYBTNONENTER] = true;
    formconfigForgotPassword[CLASSNAME] = ITSA_LOGIN + (formconfigForgotPassword[CLASSNAME] ? ' '+formconfigForgotPassword[CLASSNAME] : '');
    formconfigForgotPassword[REQUIRED] = true;

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
    message = SPANWRAPPER + (config.messageForgotPassword || intl.retrievepasswordinstructions) + ENDSPAN+
              FIELDSET_START+
                   DIVCLASS_PURECONTROLGROUP+'{'+USERNAME+'}'+ENDDIV+
              ENDFIELDSET;
    forgotPassword = new MyForgotPassword();
    forgotPassword.syncPromise = syncPromise;
    imageButtons = (typeof config.imageButtons === BOOLEAN) && config.imageButtons;
    forgotPassword.icon = config.iconquestion || ICON_QUESTION;
    forgotPassword.title = config.titleForgotPassword || intl[FORGOT_PASSWORD];
    forgotPassword.message = message;
    forgotPassword.level = WARN;
    forgotPassword.config = config;
    forgotPassword.target = ITSADIALOG; // widgetname that should handle this message
    forgotPassword.source = config.source || APP;
    forgotPassword.messageType = FORGOT_PASSWORD;
    forgotPassword._submitBtn = FORGOT_PASSWORD;
    forgotPassword.closeButton = true;
    forgotPassword.primaryButton = (imageButtons ? IMG : '')+BTNSUBMIT;
    forgotPassword.footer = '{'+(imageButtons ? IMG : '')+BTNSUBMIT+'}';
    forgotPassword.buttonLabels = [
        {buttonType: (imageButtons ? IMG : '')+BTNSUBMIT, labelHTML: (imageButtons ? I_CLASS_ITSADIALOG+'-mail"></i>' : '')+intl[RESET_PASSWORD]}
    ];
    return ITSAMessageControllerInstance.queueMessage(forgotPassword);
};

ITSADialogInstance.renderPromise().then(
    function() {
        YArray.each(
            [INFO, WARN],
            function(level) {
                var panel = ITSADialogInstance.panels[level];
                ITSADialogInstance._eventhandlers.push(
                    panel.on('*:submit', function(e) {
                        var itsamessage = e.target,
                            messageType = itsamessage.messageType;
                        if ((messageType===GET_LOGIN) || (messageType=== CHANGE_PASSWORD) || (messageType=== FORGOT_USERNAME) || (messageType=== FORGOT_PASSWORD)) {
                            itsamessage._set(BUTTON, itsamessage._submitBtn);
                        }
                    })
                );
                ITSADialogInstance._eventhandlers.push(
                    panel.after('*:submit', function(e) {
                        var itsamessage = e.target;
                        // Cautious: e.response is NOT available in the after-bubble chain --> see Y.ITSAFormModel - know issues
                        e.promise.then(
                            function(response) {
                                var responseObj = PARSED(response),
                                    intl = ITSADialogInstance._intl,
                                    messageType = itsamessage.messageType,
                                    contentBox, message, facade, config, itsamessageconfig;
                                if (responseObj && responseObj.status) {
                                    if (responseObj.status==='ERROR') {
                                        message = responseObj.message || intl.unspecifiederror;
                                        // production-errors will be shown through the messagecontroller
                                        Y.showError(responseObj.title || intl[ERROR], message);
                                        itsamessage.reject(message);
                                    }
                                    if (responseObj.status==='OK') {
                                        facade = itsamessage.toJSON();
                                        itsamessage.resolve(facade);
                                        // fire the login-event in case messageType===GET_LOGIN
                                        if (messageType===GET_LOGIN) {
                                            facade.loginlevels = responseObj.loginlevels;
                                            ITSADialogInstance.fire(LOGGEDIN, facade);
                                        }
                                        else if ((messageType===FORGOT_USERNAME) || (messageType===FORGOT_PASSWORD)) {
                                            itsamessageconfig = itsamessage.config;
                                            message = itsamessageconfig.instructionMessage || (intl[RECIEVEDMAILWITHINSTRUCTIONS] + ', ' + intl[CHECKSPAMBOX]);
                                            config = {
                                                level: WARN,
                                                target: ITSADIALOG, // widgetname that should handle this message
                                                source: itsamessageconfig.source || APP,
                                                messageType: 'instructions'
                                            };
                                            // show message at warn-level, to be sure it overrules the current loginpanel
                                            Y.showMessage(config.instructionTitle || intl[CHECKMAIL], message, config);
                                        }
                                        else if (messageType===PASSWORD_CHANGE) {
                                              itsamessageconfig = itsamessage.config;
                                              message = itsamessageconfig.passwordChangedMessage || (intl[PASSWORD_CHANGED]);
                                              config = {
                                                  level: WARN,
                                                  target: ITSADIALOG, // widgetname that should handle this message
                                                  source: itsamessageconfig.source || APP,
                                                  messageType: PASSWORD_CHANGED
                                              };
                                              // show message at warn-level, to be sure it overrules the current loginpanel
                                              Y.showMessage(config.passwordChangeTitle || intl[PASSWORD_CHANGE], message, config);
                                              itsamessage.resolve(itsamessage.get(PASSWORD));
                                        }
                                    }
                                    else if ((messageType===GET_LOGIN) && (responseObj.status==='NOACCESS')) {
                                        message = responseObj.message || intl.loginblocked;
                                        // production-errors will be shown through the messagecontroller
                                        Y.showError(responseObj.title || intl[ERROR], message);
                                        itsamessage.reject(message);
                                    }
                                    else if ((responseObj.status==='RETRY') &&
                                             ((messageType===GET_LOGIN) || (messageType===FORGOT_USERNAME) || (messageType===FORGOT_PASSWORD) || (messageType===CHANGE_PASSWORD))) {
                        /*jshint expr:true */
                                        responseObj.title && panel.set('title', responseObj.title);
                                        (messageType===GET_LOGIN) && (message = responseObj.message || intl.unknownlogin);
                                        (messageType===CHANGE_PASSWORD) && (message = responseObj.message || intl.passwordnotaccepted);
                                        (messageType===FORGOT_PASSWORD) && (message = responseObj.message || intl.unknownusername);
                                        (messageType===FORGOT_USERNAME) && (message = responseObj.message || intl.unknownemail);
                        /*jshint expr:false */
                                        if (message) {
                                            contentBox = panel.get(CONTENTBOX);
                                            contentBox.one('.itsa-messagewrapper').setHTML(message);
                                        }
                                    }
                                    else if ((messageType===GET_LOGIN) && (responseObj.status==='CHANGEPASSWORD')) {
                                        itsamessage._resurrectable = false;
                                        changePwFn(itsamessage).then(
                                            function(response) {
                                                // itsamessage is the original getLogin-message with level===INFO
                                                // the message that came from 'changePwFn' is submitted and is shown with status==='OK'
                                                facade = itsamessage.toJSON();
                                                facade[PASSWORD] = response.password;
                                                itsamessage.resolve(facade);
                                                // fire the login-event in case messageType===GET_LOGIN
                                                facade.loginlevels = responseObj.loginlevels;
                                                ITSADialogInstance.fire(LOGGEDIN, facade);
                                            },
                                            function() {
                                                message = intl.passwordnotchanged;
                                                // production-errors will be shown through the messagecontroller
                                                Y.showError(intl[ERROR], message);
                                            }
                                        );
                                    }
                                    else {
                                        // program-errors will be shown by fireing events. They can be seen by using Y.ITSAErrorReporter
                                        message = 'Wrong response.status found: '+responseObj.status;
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

/**
 *
 * @module gallery-itsalogin
 * @class Y.ITSAMessageController
 * @since 0.1
 *
 * <i>Copyright (c) 2013 Marco Asbreuk - http://theinternetwizard.net</i>
 * YUI BSD License - http://developer.yahoo.com/yui/license.html
 *
*/

ITSAMessageControllerClass.prototype[UNDERSCORE+GET_LOGIN] = function(title, message, config, sync) {
    var instance = this,
        intl = ITSADialogInstance._intl,
        params = instance._retrieveLoginParams(title, message, config, sync),
        MyITSAMessage, formconfigUsername, formconfigPassword, formconfigRemember, syncPromise, regain, rememberValue,
        imageButtons, footer, primaryButton, forgotButton, regainFn, createAccountPromise, required, stayLoggedin;
    title = params.title;
    message = params.message;
    config = params.config;
    syncPromise = params.syncPromise;

    createAccountPromise = (config.createAccount instanceof Y.LazyPromise) && config.createAccount;
    primaryButton = BTNSUBMIT;
    required = ((typeof config.required === BOOLEAN) && config.required) || false;
    stayLoggedin = ((typeof config.stayLoggedin === BOOLEAN) && config.stayLoggedin) || false;
    imageButtons = (typeof config.imageButtons === BOOLEAN) && config.imageButtons;
    regain = config.regain;
    forgotButton = ((typeof config.forgotButton === BOOLEAN) && config.forgotButton) || regain;



    footer = (forgotButton ? '{'+BTN_+FORGOT+'}' : '');
/*jshint expr:true */
    createAccountPromise && (footer += '{'+BTN_+CREATE_ACCOUNT+'}');
/*jshint expr:false */
    footer += '{'+BTNSUBMIT+'}';

    if (imageButtons) {
        footer = footer.replace(/\{btn_/g, '{'+IMGBTN_);
        primaryButton = primaryButton.replace(/btn_/g, IMGBTN_);
    }

    // setting config for username:
    formconfigUsername = config.formconfigUsername || {};
/*jshint expr:true */
    formconfigUsername[LABEL] || formconfigUsername[PLACEHOLDER] || (formconfigUsername[LABEL]=intl[USERNAME]);
/*jshint expr:false */
    formconfigUsername[FULLSELECT] = true;
    formconfigUsername[PRIMARYBTNONENTER] = false;
    formconfigUsername[CLASSNAME] = ITSA_LOGIN + (formconfigUsername[CLASSNAME] ? ' '+formconfigUsername[CLASSNAME] : '');
    formconfigUsername[REQUIRED] = true;

    // setting config for password:
    formconfigPassword = config.formconfigPassword || {};
/*jshint expr:true */
    formconfigPassword[LABEL] || formconfigPassword[PLACEHOLDER] || (formconfigPassword[LABEL]=intl[PASSWORD]);
/*jshint expr:false */
    formconfigPassword[FULLSELECT] = true;
    formconfigPassword[PRIMARYBTNONENTER] = true;
    formconfigPassword[CLASSNAME] = ITSA_LOGIN + (formconfigPassword[CLASSNAME] ? ' '+formconfigPassword[CLASSNAME] : '');
    formconfigPassword[REQUIRED] = true;

    // setting config for remember:
    formconfigRemember = config.formconfigRemember || {};
/*jshint expr:true */
    formconfigUsername[LABEL] && !formconfigPassword[LABEL] && (formconfigPassword[LABEL] = ' ');
    formconfigPassword[LABEL] && !formconfigUsername[LABEL] && (formconfigUsername[LABEL] = ' ');
    formconfigRemember[LABEL] || (formconfigRemember[LABEL]=intl[STAYLOGGEDIN]);
/*jshint expr:false */
    formconfigRemember.switchlabel = true;
    rememberValue = ((typeof formconfigRemember.value === BOOLEAN) && formconfigRemember.value) || false;

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
                                          value: (stayLoggedin && rememberValue) || false,
                                          formtype: Y.ITSACheckbox,
                                          formconfig: formconfigRemember
                                      }
                                  }
                              });
            message = SPANWRAPPER + message + ENDSPAN+
                      FIELDSET_START+
                           DIVCLASS_PURECONTROLGROUP+'{'+USERNAME+'}'+ENDDIV+
                           DIVCLASS_PURECONTROLGROUP+'{'+PASSWORD+'}'+ENDDIV+
                           (stayLoggedin ? DIVCLASS_ITSA+'login-checkbox">'+'{remember}'+ENDDIV : '')+
                      ENDFIELDSET;
            itsamessage = new MyITSAMessage();
            itsamessage.syncPromise = syncPromise;
            itsamessage.config = config;
            itsamessage.icon = config.icon || ICON_INFO;
            itsamessage.target = ITSADIALOG; // widgetname that should handle this message
            itsamessage.title = title;
            itsamessage.message = message;
            itsamessage.footer = footer;
            itsamessage.imageButtons = imageButtons;
            itsamessage.closeButton = !required;
            itsamessage.priority = config.priority;
            itsamessage.primaryButton = config.primaryButton || primaryButton; // config.primaryButton should overrule primaryButton
            itsamessage.timeoutReject = config.timeoutReject;
            itsamessage.level = INFO; // always needs no be at infolevel, because forgot-username/password will show at warn-level
            itsamessage.source = config.source || APP;
            itsamessage.messageType = GET_LOGIN;
            itsamessage._submitBtn = GET+LOGIN; // NOT GET_LOGIN --> that would be 'getLogin', while GET+LOGIN === 'getlogin'
            itsamessage.buttonLabels = [
                {buttonType: BTNSUBMIT, labelHTML: intl[LOGIN]},
                {buttonType: IMG+BTNSUBMIT, labelHTML: I_CLASS_ITSADIALOG+'-login"></i>'+intl[LOGIN]}
            ];
            itsamessage.customBtns = [];
/*jshint expr:true */
            createAccountPromise && itsamessage.customBtns.push(
                imageButtons ?
                {
                    buttonId: IMGBTN_+CREATE_ACCOUNT,
                    labelHTML: I_CLASS_ITSADIALOG+'-user"></i>'+intl[CREATE_ACCOUNT],
                    config: {
                        value: CREATE_ACCOUNT,
                        classname: ITSABUTTON_ICONLEFT
                    }
                } :
                {
                    buttonId: BTN_+CREATE_ACCOUNT,
                    labelHTML: intl[CREATE_ACCOUNT],
                    config: {
                        value: CREATE_ACCOUNT
                    }
                }
            );
/*jshint expr:false */
            // Next: if the user want a 'forgot-button' then set it up
            if (forgotButton) {
                // first an extra button for itsamessage on the first dialog:
                itsamessage.customBtns.push(
                    imageButtons ?
                    {
                        buttonId: IMGBTN_+FORGOT,
                        labelHTML: I_CLASS_ITSADIALOG+'-question"></i>'+intl[FORGOT],
                        config: {
                            value: FORGOT,
                            classname: ITSABUTTON_ICONLEFT
                        }
                    } :
                    {
                        buttonId: BTN_+FORGOT,
                        labelHTML: intl[FORGOT],
                        config: {
                            value: FORGOT
                        }
                    }
                );
                itsamessage.on(MESSAGERESOLVE, function(e) {
                    if (e.attrs && (e.attrs.button===FORGOT)) {
                        e.preventDefault(); // prevents the panel from resolving
                        regainFn = (regain===USERNAME_OR_PASSWORD) ? regainFn_UnPw(config) : regainFn_Pw(config, syncPromise);
                        ITSADialogInstance.panels[INFO].focusInitialItem()
                        .then(
                            null,
                            function() {
                                return true; // fulfill the chain
                            }
                        )
                        .then(
                            function() {
                                return regainFn;
                            }
                        )
                        .then(
                            function(result) {
                                if (result.button===FORGOT_USERNAME) {
                                    return regainFn_Un(config, syncPromise);
                                }
                                else if (result.button===FORGOT_PASSWORD) {
                                    return regainFn_Pw(config, syncPromise);
                                }
                            },
                            function(reason) {
/*jshint expr:true */
                                (reason instanceof Error) && Y.showError(reason);
/*jshint expr:false */
                            }
                        );
                    }
                });
            }
            // accountPromise MUST end with an empty then(), because that will make sure to execute the LazyPromise!!
            return createAccountPromise ? instance.queueMessage(itsamessage).then(
                function(response) {
                    // NEED to put an empty .then() to be sure the lazypromise always gets executed!
                    return (response.button===CREATE_ACCOUNT) ? createAccountPromise.then() : response;
                }
            ) : instance.queueMessage(itsamessage);
        }
    );
};

ITSAMessageControllerClass.prototype._retrieveLoginParams = function(title, message, config, syncPromise) {
    var withTitle = (typeof message === STRING),
        withMessage, withConfig;
    if (!withTitle) {
        syncPromise = config;
        config = message;
        message = title;
        title = null;
    }
    withMessage = (typeof message === STRING);
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
        "promise",
        "gallery-lazy-promise",
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
