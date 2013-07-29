'use strict';
/**
 * This module adds static methods Y.Node.availablePromise() and Y.Node.contentreadyPromise() to the Y.Node class.<br />
 * By using these Promises, you don't need to listen for the Y.on('available') and Y.on('contentready') events,
 * but can use Promises.
 *
 * @module gallery-itsanodepromise
 * @class Y.Node
 * @since 0.1
 *
 * <i>Copyright (c) 2013 Marco Asbreuk - http://theinternetwizard.net</i>
 * YUI BSD License - http://developer.yahoo.com/yui/license.html
 *
*/

var YNode = Y.Node;

// To make these 2 methods static, we must declare their functions first and then add them to the prototype.
// We cannot declare the prototypefunctions directly, for it would become instance-methods instead of static.

/**
 * Promise that will be resolved once a node is available in the DOM.
 * Exactly the same as when listened to Y.on('available'), except you get a Promise in return.
 *
 * @method availablePromise
 * @static
 * @param nodeid {String} Node-selector by id. You must include the #
 * @param [timeout] {int} Timeout in ms, after which the promise will be rejected.
 *         If omitted, the Promise will never be rejected and can only be fulfilled once the node is available.
 * @return {Y.Promise} promised response --> resolve(Y.Node) OR reject(reason).
 * @since 0.1
*/
YNode.availablePromise = function(nodeid, timeout) {
    Y.log('availablePromise', 'info', 'node');
    return new Y.Promise(function (resolve, reject) {
        Y.on(
            'available',
            function() {
                resolve(Y.one(nodeid));
            },
            nodeid
        );
        if (timeout) {
            Y.later(
                timeout,
                null,
                function() {
                    var errormessage = 'node ' + nodeid + ' was not available within ' + timeout + ' ms';
                    reject(new Error(errormessage));
                }
            );
        }
    });
};

/**
 * Promise that will be resolved once a node's content is ready.
 * Exactly the same as when listened to Y.on('contentready'), except you get a Promise in return.
 *
 * @method contentreadyPromise
 * @static
 * @param nodeid {String} Node-selector by id. You must include the #
 * @param [timeout] {int} Timeout in ms, after which the promise will be rejected.
 *         If omitted, the Promise will never be rejected and can only be fulfilled once the node's content is ready.
 * @return {Y.Promise} promised response --> resolve(Y.Node) OR reject(reason).
 * @since 0.1
*/
YNode.contentreadyPromise = function(nodeid, timeout) {
    Y.log('contentreadyPromise', 'info', 'node');
    return new Y.Promise(function (resolve, reject) {
        Y.on(
            'contentready',
            function() {
                resolve(Y.one(nodeid));
            },
            nodeid
        );
        if (timeout) {
            Y.later(
                timeout,
                null,
                function() {
                    var errormessage = 'the content of node ' + nodeid + ' was not ready within ' + timeout + ' ms';
                    reject(new Error(errormessage));
                }
            );
        }
    });
};

Y.Node.prototype.availablePromise = YNode.availablePromise;
Y.Node.prototype.contentreadyPromise = YNode.contentreadyPromise;