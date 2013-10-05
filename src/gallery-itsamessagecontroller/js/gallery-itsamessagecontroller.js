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
        ITSAMessageController;

ITSAMessageController = Y.ITSAMessageController = Y.Base.create('itsamessagecontroller', Y.LazyModelList, [], {}, {
    ATTRS: {

    }
});

ITSAMessageController.prototype.alert = function(title, message, options) {
    var instance = this,
        imagebuttons = options && (typeof options.imagebuttons === 'boolean') && options.imagebuttons,
        footer = imagebuttons ? '{imgbtn_ok}' : '{btn_ok}',
        withTitle = (typeof message === 'string');
    if (!withTitle) {
        options = message;
        message = title;
        title = null;
    }
    instance._addMessage(title, message, footer, APP, WARNING, options);
};

ITSAMessageController.prototype.confirm = function(title, message, options) {
    var instance = this,
        imagebuttons = options && (typeof options.imagebuttons === 'boolean') && options.imagebuttons,
        footer = imagebuttons ? '{imgbtn_no}{imgbtn_yes}' : '{btn_no}{btn_yes}',
        withTitle = (typeof message === 'string');
    if (!withTitle) {
        options = message;
        message = title;
        title = null;
    }
    instance._addMessage(title, message, footer, APP, DIALOG, options);
};

ITSAMessageController.prototype.prompt = function(title, message, options) {
    var instance = this,
        imagebuttons = options && (typeof options.imagebuttons === 'boolean') && options.imagebuttons,
        footer = imagebuttons ? '{imgbtn_cancel}{imgbtn_ok}' : '{btn_cancel}{btn_ok}',
        withTitle = (typeof message === 'string');
    if (!withTitle) {
        options = message;
        message = title;
        title = null;
    }
    instance._addMessage(title, message, footer, APP, INPUT, options);
};

ITSAMessageController.prototype.inform = function(title, message, options) {
    var instance = this,
        imagebuttons = options && (typeof options.imagebuttons === 'boolean') && options.imagebuttons,
        footer = imagebuttons ? '{imgbtn_ok}' : '{btn_ok}',
        withTitle = (typeof message === 'string');
    if (!withTitle) {
        options = message;
        message = title;
        title = null;
    }
    instance._addMessage(title, message, footer, APP, MESSAGE, options);
};

ITSAMessageController.prototype._addMessage = function(title, message, footer, source, type, options) {
    var message = new Y.ITSAMessage({
            title: title,
            message: message,
            footer: footer,
            source: source,
            type: type,
            options: options
        });
    this.add(message);
};

Y.MessageController = new ITSAMessageController();