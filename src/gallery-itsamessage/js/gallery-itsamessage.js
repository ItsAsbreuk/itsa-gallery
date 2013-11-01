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

var ITSAMessage;

ITSAMessage = Y.ITSAMessage = Y.Base.create('itsamessage', Y.ITSAFormModel, [], {
    initializer: function() {
        var instance = this;
        instance.resolvePromise = null;
        instance.rejectPromise = null;

        instance.icon = '';
        instance.footer = null;
        instance.imageButtons = false;
        instance.level = 'info';
        instance.message = '';
        instance.noButtons = false;
        instance.closeButton = false;
        instance.processing = false;
        instance.primaryButton = null;
        instance.rejectButton = null;
        instance.suspended = false;
        instance.title = null;
        instance.target = null;
        instance.messageType = null;
        instance.source = null;
        instance.buttonLabels = null;
        instance.hotKeys = null;
        instance.customBtns = null;
        instance.noHideOnSubmit = true;
    }
}, {
    ATTRS: {
        /**
         * The button that was pressed (if appopriate). Returnvalue represents the button's-value.
         *
         * @attribute button
         * @type {String}
         * @default null
         */
        button: {
            readOnly: true
        }
    }
});

ITSAMessage.prototype.erase = function() {
    var resolve = this.resolvePromise;
/*jshint expr:true */
    resolve && resolve();
/*jshint expr:false */
};