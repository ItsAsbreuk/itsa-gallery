YUI.add('gallery-itsa-app', function (Y, NAME) {

'use strict';

/*jshint maxlen:200 */

/**
 *
 * View ITSAViewLogin
 *
 *
 * @module gallery-itsa-app
 * @extends App
 * @class ITSA_App
 * @constructor
 * @since 0.1
 *
 * <i>Copyright (c) 2013 Marco Asbreuk - http://itsasbreuk.nl</i>
 * YUI BSD License - http://developer.yahoo.com/yui/license.html
 *
*/

function ITSA_App() {
    ITSA_App.superclass.constructor.apply(this, arguments);
}

ITSA_App.NAME = 'itsa-app';

Y.ITSA_App = Y.extend(ITSA_App, Y.App, {}, {
    ATTRS: {
        /**
         * Whether the panel should have a statusbar (Y.ITSAStatusbar). Targeting should be done directly at the panel-instance. See gallery-itsastatusbar.
         *
         * @attribute statusBar
         * @type Y.ITSAStatusbar
         * @since 0.1
        */
        statusBar : {
            readOnly: true
        }
    }
});

/**
 * @method initializer
 * @protected
 * @since 0.1
*/
ITSA_App.prototype.initializer = function() {
    var instance = this,
        statusbar;

    statusbar = new Y.ITSAStatusbar();
    statusbar.handleLevel('info');
    statusbar.handleLevel('warn');
    statusbar.handleLevel('error');
    statusbar.handleStatus();
    statusbar.handleModelSync();
    instance._set('statusBar', statusbar);
};

}, '@VERSION@', {
    "requires": [
        "yui-base",
        "app",
        "gallery-itsagarbagecollector-node",
        "gallery-itsagarbagecollector-widget",
        "gallery-itsaerrorreporter",
        "gallery-itsacurrentuser",
        "gallery-itsadialog",
        "gallery-itsastatusbar"
    ]
});
