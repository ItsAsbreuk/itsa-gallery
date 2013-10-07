'use strict';

/*jshint maxlen:200 */

/**
 *
 * Extends Y.Model by adding methods through which they can create editable form-elements, which represent and are bound to the propery-value.
 * This model is for defining the UI-structure for all Model's properties and for firing model-events for
 * Y.ITSAFormModel does not rendering to the dom itself. That needs to be done by an Y.View-instance, like Y.ITSAViewModel.
 *
 * @module gallery-itsaformmodel
 * @extends Model
 * @uses gallery-itsamodelsyncpromise
 * @class ITSAFormModel
 * @constructor
 * @since 0.1
 *
 * <i>Copyright (c) 2013 Marco Asbreuk - http://itsasbreuk.nl</i>
 * YUI BSD License - http://developer.yahoo.com/yui/license.html
 *
*/

    var APP = 'application',
        WARNING = 'warning',
        DIALOG = 'dialog',
        INPUT = 'input',
        MESSAGE = 'message',
        LOADDELAY = 5000,
        MODELLIST = 'Y.ModelList',
        GALLERY_ITSAMESSAGE = 'gallery-itsamessage';

function ITSAMessageController() {
    this.init.apply(this, arguments);
}

Y.extend(ITSAMessageController, Y.Base);

ITSAMessageController.prototype.initializer = function() {
    var instance = this;
    Y.later(LOADDELAY, instance, instance.readyPromise);
};

ITSAMessageController.prototype.readyPromise = function() {
    var instance = this;
    return instance._readyPromise || (instance._readyPromise=Y.usePromise(MODELLIST, GALLERY_ITSAMESSAGE).then(
        Y.bind(instance._initQueue, instance)
    ));
};

ITSAMessageController.prototype._initQueue = function() {
    var instance = this;
    instance.queue = new Y.ModelList();
};

ITSAMessageController.prototype.getMessage = function(title, message, options) {
    var instance = this,
        imagebuttons = options && (typeof options.imagebuttons === 'boolean') && options.imagebuttons,
        footer = imagebuttons ? '{imgbtn_ok}' : '{btn_ok}',
        withTitle = (typeof message === 'string');
    if (!withTitle) {
        options = message;
        message = title;
        title = null;
    }
    instance.addMessage(title, message, footer, APP, WARNING, options);
};

ITSAMessageController.prototype.getConfirmation = function(title, message, options) {
    var instance = this,
        imagebuttons = options && (typeof options.imagebuttons === 'boolean') && options.imagebuttons,
        footer = imagebuttons ? '{imgbtn_no}{imgbtn_yes}' : '{btn_no}{btn_yes}',
        withTitle = (typeof message === 'string');
    if (!withTitle) {
        options = message;
        message = title;
        title = null;
    }
    instance.addMessage(title, message, footer, APP, DIALOG, options);
};

ITSAMessageController.prototype.getInput = function(title, message, options) {
    var instance = this,
        imagebuttons = options && (typeof options.imagebuttons === 'boolean') && options.imagebuttons,
        footer = imagebuttons ? '{imgbtn_cancel}{imgbtn_ok}' : '{btn_cancel}{btn_ok}',
        withTitle = (typeof message === 'string');
    if (!withTitle) {
        options = message;
        message = title;
        title = null;
    }
    instance.addMessage(title, message, footer, APP, INPUT, options);
};

ITSAMessageController.prototype.showMessage = function(title, message, options) {
    var instance = this,
        imagebuttons = options && (typeof options.imagebuttons === 'boolean') && options.imagebuttons,
        footer = imagebuttons ? '{imgbtn_ok}' : '{btn_ok}',
        withTitle = (typeof message === 'string');
    if (!withTitle) {
        options = message;
        message = title;
        title = null;
    }
    instance.addMessage(title, message, footer, APP, MESSAGE, options);
};

ITSAMessageController.prototype.addMessage = function(title, message, footer, source, type, options, MessageClass) {
    var instance = this,
        config;
/*jshint expr:true */
    options || (options = {});
/*jshint expr:false */
    config = {
        title: title,
        message: message,
        footer: footer,
        source: source,
        type: type,
        options: options
    };
    instance.readyPromise().then(
        function() {
            var message = (MessageClass instanceof Y.ITSAMessage) ? new MessageClass(config) : new Y.ITSAMessage(config);
            instance.queue.add(message);
        }
    );
};

Y.MessageController = new ITSAMessageController();