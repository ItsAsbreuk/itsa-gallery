YUI.add('gallery-itsawidgetrenderpromise', function (Y, NAME) {

'use strict';
/**
 * ITSAWidgetRenderPromise
 *
 *
 * This module adds Widget.renderPromise() to the Y.Widget class.
 * By using this Promise, you don't need to listen for the 'render'-event, neither look for the value of the attribute 'rendered'.
 *
 *
 * @module gallery-itsawidgetrenderpromise
 * @class Y.Widget
 * @since 0.1
 *
 * <i>Copyright (c) 2013 Marco Asbreuk - http://theinternetwizard.net</i>
 * Special thanks to Jeff Pinach - http://http://fromanegg.com :)
 * YUI BSD License - http://developer.yahoo.com/yui/license.html
 *
*/

var DEFAULTTIMEOUT = 20000;
/**
 * Promise which will render the widget only when the sourceNode (or boundingBox) gets available in the DOM.
 * This way you can execute the render-statement even if the sourceNode has yet to be declared.
 * The returned Promise will be resolved once the sourceNode is available in the DOM, but this can be changed by the 'promisetype' argument.
 *
 * @method renderOnAvailablePromise
 * @param srcNodeId {String} Node-selector by id. You must include the #
 * <p>
 * NOTE: This argument is in fact the boundingBox, but will also be passed into the 'srcNode' attribute for progressive enhancement.
 * </p>
 * @param [timeout] {int} Timeout in ms, after which the promise will be rejected.<br />
 *                                      If omitted, <b>no timeout</b> will be used.<br />
 * @param [promisetype] {String} To make the promise fulfilled at another stage. Possible values are: 'afterrender' and 'afterready'.
 * @return {Y.Promise} Promise that is resolved once srcNode is available in the DOM.
 * If both srcNode and timeout are set, the Promise can be rejected in case of a timeout. Promised response --> resolve() OR reject(reason).
 * @since 0.1
*/
Y.Widget.prototype.renderOnAvailablePromise = function(srcNodeId, timeout, promisetype) {
    var instance = this,
        nodeAvailablePromise = new Y.Promise(function (resolve, reject) {
            if (!srcNodeId) {
                // widget can be rendered immediately because it renderes with inside a new boundingBox
                instance.render();
                resolve();
            }
        });
    if (srcNodeId) {
        Y.use('gallery-itsanodepromise', function() {
            nodeAvailablePromise = Y.Node.availablePromise(srcNodeId, timeout);
            nodeAvailablePromise
            .then(
                Y.bind(instance.render, instance, srcNodeId)
            )
            .then(
                function() {
                    // return a promise or just true, to chain the result
                    // Because renderPromise and readyPromise use DEFAULTTIMEOUT when timeout is undefined, we might need to set timeout to zero.
                    timeout = timeout || 0;
                    if (promisetype==='afterrender') {
                        return instance.renderPromise(timeout);
                    }
                    else if ((promisetype==='afterready') {
                        return instance.readyPromise(timeout);
                    }
                    else {
                        return true;
                    }
                }
            );
        });
    }
    return nodeAvailablePromise;
}

/**
 * Promise that will be resolved once the widget is rendered.
 * By using this Promise, you don't need to listen for the 'render'-event, neither look for the value of the attribute 'rendered'.
 *
 * @method renderPromise
 * @param [timeout] {int} Timeout in ms, after which the promise will be rejected. Set to 0 to de-activate.<br />
 *                                      If omitted, a timeout of 20 seconds (20000ms) will be used.<br />
 *                                      The timeout-value can only be set at the first time the Promise is called.
 * @return {Y.Promise} promised response --> resolve(e) OR reject(reason).
 * @since 0.1
*/
Y.Widget.prototype.renderPromise = function(timeout) {
    var instance = this;
    if (!instance._renderPromise) {
        instance._renderPromise = new Y.Promise(function (resolve, reject) {
            instance.after(
                'render',
                function(e) {
                    resolve(e);
                }
            );
            if (instance.get('rendered')) {
                resolve();
            }
            if (timeout !== 0) {
                Y.later(
                    timeout || DEFAULTTIMEOUT,
                    null,
                    function() {
                        var errormessage = 'renderPromise is rejected by timeout of '+(timeout || DEFAULTTIMEOUT)+ ' ms';
                        reject(new Error(errormessage));
                    }
                );
            }
        });
    }
    return instance._renderPromise;
};

/**
 * Promise that holds any stuff that should be done before the widget is defined as 'ready'.
 * By default this promise is resolved right away. The intention is that it can be overridden in widget's extentions.<br /><br />
 * <b>Notion</b>It is not the intention to make a dircet call an promiseBeforeReady --> use readyPromise () instead,
 * because that promise will be fulfilled when both this promise as well as renderPromise() are fulfilled.
 *
 * @method promiseBeforeReady
 * @param [timeout] {int} Timeout in ms, after which the promise will be rejected. Set to 0 to de-activate.<br />
 *                                      If omitted, a timeout of 20 seconds (20000ms) will be used.<br />
 *                                      The timeout-value can only be set at the first time the Promise is called.
 * @return {Y.Promise} promised response --> resolve(e) OR reject(reason).
 * @since 0.2
*/
Y.Widget.prototype.promiseBeforeReady = function() {
    return new Y.Promise(function (resolve) {
        resolve();
    });
};

/**
 * Promise that will be resolved once the widget is defined as 'ready'.
 * 'ready' means, that the widget fulfills both renderPromise() and promiseBeforeReady().
 * The latter can be overridden in the extended widgetclass with
 * any stuff the widget needs to de before you declare its state as 'ready'.
 *
 * @method readyPromise
 * @param [timeout] {int} Timeout in ms, after which the promise will be rejected. Set to 0 to de-activate.<br />
 *                                      If omitted, a timeout of 20 seconds (20000ms) will be used.<br />
 *                                      The timeout-value can only be set at the first time the Promise is called.
 * @return {Y.Promise} promised response --> resolve(e) OR reject(reason).
 * @since 0.2
*/
Y.Widget.prototype.readyPromise = function(timeout) {
    var instance = this,
          promiseslist;
    if (!instance._readyPromise) {
        promiseslist = [];
        promiseslist.push(instance.renderPromise(timeout));
        promiseslist.push(instance.promiseBeforeReady(timeout));
        instance._readyPromise = Y.batch.apply(Y, promiseslist);
    }
    return instance._readyPromise;
};

}, '@VERSION@', {"requires": ["yui-base", "yui-later", "widget", "promise"]});
