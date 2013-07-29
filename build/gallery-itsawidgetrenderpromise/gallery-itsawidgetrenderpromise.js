YUI.add('gallery-itsawidgetrenderpromise', function (Y, NAME) {

'use strict';
/**
 * This module adds some renderPromises to the Y.Widget class.
 * By using this Promise, you don't need to listen for the 'render'-event, neither look for the value of the attribute 'rendered'.
 * It also adds the Promise renderOnAvailablePromise() by which the render-code can be run even if the Node has yet to be inserted in the DOM.
 *
 * @module gallery-itsawidgetrenderpromise
 * @class Y.Widget
 * @since 0.1
 *
 * <i>Copyright (c) 2013 Marco Asbreuk - http://theinternetwizard.net</i>
 * YUI BSD License - http://developer.yahoo.com/yui/license.html
 *
*/

var DEFAULTTIMEOUT = 20000, // default timeout for renderPromise and readyPromise
    DEFAULT_STAYALIVE_TIMER = 1000; // default repeat-timer for renderOnAvailablePromise when stayalive=true
/**
 * Promise which will render the widget only when the sourceNode (or boundingBox) gets available in the DOM.
 * This way you can execute the render-statement even if the sourceNode has yet to be declared.
 * The returned Promise will be resolved once the sourceNode is available in the DOM, but this can be changed by the 'promisetype' argument.
 *
 * @method renderOnAvailablePromises
 * @param [srcNodeId] {String} Node-selector by id. You must include the '#'. If not defined, then the widget will be rendered at once
 * with its own generated node-id.
 * <p>
 * NOTE: This argument is in fact the boundingBox, but will also be passed into the 'srcNode' attribute for progressive enhancement.
 * </p>
 * @param [options] {Object}
 * @param [options.timeout] {int} Timeout in ms, after which the promise will be rejected.<br />
 *                                      If omitted, <b>no timeout</b> will be used.<br />
 * @param [options.promisetype] {String} To make the promise fulfilled at another stage. Possible values are:
 *  null (==onAvailable), 'afterrender' and 'afterready'.
 * @param [options.stayalive=false] {Boolean} when set true, everytime the node is removed from the DOM, the Promise will be resetted.<br />
 * this is handy for pages that gets loaded and unloaded. However, it has a performancehit, so don't use it when not needed.<br />
 * in fact a new promise is created and bound to the returnfunction
 * (because Promises can't be transitioned to another state once they arefulfilled or rejected).<br />
 * only applyable if 'srcNodeId' is defined.
 * --> timerbased a dom-search takes place to see if the node is still there.
 * @param [options.stayalivetimer=1000] {Int} periodic-time in ms to check if the node has disapear and thus reset the Promise.<br />
 * only applyable if options.stayalive=true. Set to higher value leads improved performance, but could lead to renderdelay when
 * the node disappears and appears soon again (within this timespan).
 * @return {Y.Promise} Promise that is resolved once srcNode is available in the DOM.
 * If both srcNode and timeout are set, the Promise can be rejected in case of a timeout. Promised response --> resolve() OR reject(reason).
 * @since 0.2
*/
Y.Widget.prototype.renderOnAvailablePromise = function(srcNodeId, options) {
    var instance = this,
        checktimer,
        timeout = options && options.timeout,
        promisetype = options && options.promisetype,
        stayalive = options && options.stayalive && (typeof options.stayalive==='boolean') && options.stayalive,
        stayalivetimer = (options && options.stayalivetimer) || DEFAULT_STAYALIVE_TIMER,
        nodeAvailablePromise = new Y.Promise(function (resolve) {
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
                    else if (promisetype==='afterready') {
                        return instance.readyPromise(timeout);
                    }
                    else {
                        return true;
                    }
                }
            );
        });
        if (stayalive) {
            checktimer = Y.later(
                stayalivetimer,
                null,
                function() {
                    if ((nodeAvailablePromise.getStatus()!=='pending') && !Y.one(srcNodeId)) {
                        // Promise was ready, but the node isn't there anymore - or never was
                        // first stop this timer, because we don't want multiple timers running
                        checktimer.clear();
                        // now create a new Promise
                        nodeAvailablePromise = instance.renderOnAvailablePromise(srcNodeId, options);
                    }
                },
                null,
                true
            );
        }
    }
    return nodeAvailablePromise;
};

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
