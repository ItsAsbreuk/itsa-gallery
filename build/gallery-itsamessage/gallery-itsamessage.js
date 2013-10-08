YUI.add('gallery-itsamessage', function (Y, NAME) {

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

var ITSAMessage,
    INFO = 'info',
    MESSAGELEVELS = {
        info: true,
        warn: true,
        error: true
    };

ITSAMessage = Y.ITSAMessage = Y.Base.create('itsamessage', Y.ITSAFormModel, [], {}, {
    ATTRS: {
        /**
         * Axis upon which the Slider's thumb moves.  &quot;x&quot; for
         * horizontal, &quot;y&quot; for vertical.
         *
         * @attribute handleAnonymous
         * @type {Boolean}
         * @default false
         */
        footer: {
            writeOnce: 'initOnly',
            validator: function(v) {
                return (typeof v==='string');
            }
        },
        level: {
            value: INFO,
            writeOnce: 'initOnly',
            validator: function(v) {
                return (typeof v==='string') && MESSAGELEVELS[v];
            }
        },
        message: {
            writeOnce: 'initOnly',
            validator: function(v) {
                return (typeof v==='string');
            }
        },
        options: {
            readOnly: true,
            validator: function(v) {
                return (typeof v==='object');
            }
        },
        processing: {
            readOnly: true,
            value: false,
            validator: function(v) {
                return (typeof v==='boolean');
            }
        },
        source: {
            writeOnce: 'initOnly',
            validator: function(v) {
                return (typeof v==='string');
            }
        },
        title: {
            writeOnce: 'initOnly',
            validator: function(v) {
                return (typeof v==='string');
            }
        },
        target: {
            writeOnce: 'initOnly',
            validator: function(v) {
                return (typeof v==='string');
            }
        }
    }
});

ITSAMessage.prototype.erase = function() {
    var resolve = this.resolvePromise;
/*jshint expr:true */
    resolve && resolve();
/*jshint expr:false */
};


}, '@VERSION@', {"requires": ["yui-base", "gallery-itsaformmodel"]});
