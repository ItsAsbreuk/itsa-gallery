YUI.add('gallery-itsamodulesloadedpromise', function (Y, NAME) {

'use strict';

/**
 * Declaration of Y.usePromise()
 *
 * Equivalent of Y.use(), except that no callback is used, but a Promise
 * example: Y.usePromise('panel').then(...);
 *
 * Caution: this is not a replacement of YUI.use(), which creates a new YUI-sandbox.
 * It is meant as an replacement of Y.use() which is sometimes called within a YUI-instance.
 *
 * @module gallery-itsamodulesloadedpromise
 * @class Y
 * @since 0.1
 *
 * <i>Copyright (c) 2012 Marco Asbreuk - http://theinternetwizard.net</i>
 * YUI BSD License - http://developer.yahoo.com/yui/license.html
 *
*/

var TIMEOUT = 20000, // 20 seconds before loading modules is timed out.
      REJECTMESSAGE = 'Timeout: requested modules not loaded within 20 seconds';

/**
 * Loads modules through Y.use(). Instead of using callbacks, a Promise is returned.<br />
 * If the modules are not loaded within 20 seconds, the Promise will be rejected.
 *
 * @method Y.usePromise
 * @param {String|Array} modules* One or more module names to attach.
 * @return {Y.Promise} --> resolve() - function gets no parameters; reject(reason)
 * @since 0.1
*/
Y.usePromise = function() {
    // store 'arguments' inside 'args' --> because new Promise() has other arguments
    var args = arguments;

    return new Y.Promise(function (resolve, reject) {
        [].push.apply(
            args,
            [
                function() {
                    resolve();
                }
            ]
        );
        Y.use.apply(Y, args);
        Y.later(
            TIMEOUT,
            null,
            reject,
            REJECTMESSAGE
        );
    });
};

}, '@VERSION@', {"requires": ["yui-base", "promise", "yui-later"]});
