YUI.add('gallery-itsapluginpromise', function (Y, NAME) {

'use strict';

/**
 * Declaration of three methods added to Y.Plugin.Host:
 *
 *
 * Y.Plugin.Host.hasPluginPromise();
 * Y.Plugin.Host.hostReadyPromise();
 * Y.Plugin.Host.plugPromise();
 *
 * These methods all return Promises which resolve as soon as the Host is ready, which is asynchronious delayed in case of a Widget.
 * In case of a widget, hostReadyPromise() is fulfilled as soon as the widget is rendered (===widget.renderPromise()).
 *
 * These methods might be needed with some widgets where a Plugin can only be plugged-in when the widget is ready rendering.
 *
 *
 * @module gallery-itsapluginpromise
 * @extends Plugin.Host
 * @class Y.Plugin.Host
 * @since 0.1
 *
 * <i>Copyright (c) 2012 Marco Asbreuk - http://theinternetwizard.net</i>
 * YUI BSD License - http://developer.yahoo.com/yui/license.html
 *
*/

var DEFAULTTIMEOUT = 20000; // default timeout for Y.Plugin.Base.readyPromise

function ITSAPluginPromise() {}

Y.mix(ITSAPluginPromise.prototype, {
    /**
      * Determines if a plugin has plugged into this host, but checks <b>after the host is ready</b>.
      * This means you are sure any plugins at declaration (declared by Base config.plugins) are really there.
      * <br /><br />The promise will be resolved if the plugin is plugged in, otherwise rejected.
      *
      * @method hasPluginPromise
      * @param ns {String} The plugin's namespace
      * @param [options] {object}
      * @param [options.timeout] {int} Timeout in ms, after which the promise will be rejected. Set to 0 to de-activate.<br />
      *                                If omitted, a timeout of 20 seconds (20000ms) will be used.<br />
      *                                The timeout-value can only be set at the first time the Promise is called.
      * @param [options.checkafterrender=false] {boolean} In case of a widget, you can set this 'true' to check plugin's availability
      *                                                   After render, instead of ready. (see gallery-itsawidgetrenderpromise for
      *                                                   widget.readyPromise() and widget.readyPromise()).
      *                                                   NOTE: only applyable in case og widgets.
      * @return {Y.Promise} --> resolve(status) - status=Host-object;
      * reject(reason) --> reject will only happen if a host-widget is not rendered before timeout of 20 seconds.
      * @since 0.1
      * @return {Promise} --> resolve(host) or reject(reason) where 'reason' is that ns is not plugged in.
    */
    hasPluginPromise : function(ns, options) {
        var host = this,
            promise = Y.bind(((options && options.checkafterrender) ? host._hostRenderPromise : host._hostReadyPromise), host);

        return promise(options && options.timeout).then(
            function() {
                return new Y.Promise(function (resolve, reject) {
                    if (host.hasPlugin(ns)) {
                        resolve(host);
                    }
                    else {
                        reject(new Error(ns + ' not plugged in'));
                    }
                });
            }
        );
    },

    /**
      * Adds a plugin to the host object, just as 'plug()' would do.  The difference is that plugAfterReadyPromise will wait until the host is ready.
      * <br />In case the host is a Widget, you can be sure the widget is ready (see gallery-itsawidgetrenderpromise for widget.readyPromise()).
      * <br />In case the host is not a widget, then the plugin
      * will happen instantly. The promise fulfills when both the host and the plugin are ready.
      *
      * @method plugAfterReadyPromise
      * @param plugin {Function | Object |Array} Accepts the plugin class, or an
      * object with a "fn" property specifying the plugin class and
      * a "cfg" property specifying the configuration for the Plugin.
      * <p>
      * Additionally an Array can also be passed in, with the above function or
      * object values, allowing the user to add multiple plugins in a single call.
      * </p>
      * @param [config] {object} If the first argument is the plugin class, the second argument
      * can be the configuration for the plugin.
      * @param [timeout] {int} Timeout in ms, after which the promise will be rejected. Set to 0 to de-activate.<br />
      *                                      If omitted, a timeout of 20 seconds (20000ms) will be used.<br />
      *                                      The timeout-value can only be set at the first time the Promise is called.
      * @since 0.1
      * @return {Promise} --> resolve(plugin-instance) or reject(reason) can only be rejected when a widget didn't render within ready-timeout.
    */
    plugAfterReadyPromise : function() {
        // store 'arguments' inside 'args' --> because new Promise() has other arguments
        var host = this,
            args = arguments,
            plugin = args[0];

        return host._hostReadyPromise(args[2])
                .then(
                    function() {
                        host.plug.apply(host, args);
                    }
                )
                .then(
                   function() {
                       return (plugin && plugin.readyPromise && plugin.readyPromise(args[2])) || true;
                   }
                )
                .then (
                    function() {
                        return plugin && host[plugin.ns];
                    }
                );
    },

    /**
      * Adds a plugin to the host object, just as 'plug()' would do.  The difference is that plugAfterRenderPromise
      * will wait until the host is rendered.<br />
      * Only applyable in case the host is a Widget (see gallery-itsawidgetrenderpromise for widget.renderPromise()).
      * The promise fulfills when both the host is rendered and the plugin is ready.
      *
      * @method plugAfterRenderPromise
      * @param plugin {Function | Object |Array} Accepts the plugin class, or an
      * object with a "fn" property specifying the plugin class and
      * a "cfg" property specifying the configuration for the Plugin.
      * <p>
      * Additionally an Array can also be passed in, with the above function or
      * object values, allowing the user to add multiple plugins in a single call.
      * </p>
      * @param [config] {object} If the first argument is the plugin class, the second argument
      * can be the configuration for the plugin.
      * @param [timeout] {int} Timeout in ms, after which the promise will be rejected. Set to 0 to de-activate.<br />
      *                                      If omitted, a timeout of 20 seconds (20000ms) will be used.<br />
      *                                      The timeout-value can only be set at the first time the Promise is called.
      * @since 0.1
      * @return {Promise} --> resolve(plugin-instance) or reject(reason) can only be rejected when a widget didn't render within ready-timeout.
    */
    plugAfterRenderPromise : function() {
        // store 'arguments' inside 'args' --> because new Promise() has other arguments
        var host = this,
            args = arguments,
            plugin = args[0];

        return host._hostRenderPromise(args[2])
                .then(
                    function() {
                        host.plug.apply(host, args);
                    }
                )
                .then(
                   function() {
                       return (plugin && plugin.readyPromise && plugin.readyPromise(args[2])) || true;
                   }
                )
                .then (
                    function() {
                        return plugin && host[plugin.ns];
                    }
                );
    },

    /**
      * Adds a plugin to the host object, just as 'plug()' would do --> the plugin happens directly.
      * The returned promise fulfills when the plugin is 'ready' (using Y.Plugin.Base.readyPromise).
      *
      * @method plugPromise
      * @param plugin {Function | Object |Array} Accepts the plugin class, or an
      * object with a "fn" property specifying the plugin class and
      * a "cfg" property specifying the configuration for the Plugin.
      * <p>
      * Additionally an Array can also be passed in, with the above function or
      * object values, allowing the user to add multiple plugins in a single call.
      * </p>
      * @param [config] {object} If the first argument is the plugin class, the second argument
      * can be the configuration for the plugin.
      * @param [timeout] {int} Timeout in ms, after which the promise will be rejected. Set to 0 to de-activate.<br />
      *                                      If omitted, a timeout of 20 seconds (20000ms) will be used.<br />
      *                                      The timeout-value can only be set at the first time the Promise is called.
      * @since 0.1
      * @return {Promise} --> resolve(plugin-instance) or reject(reason) can only be rejected when a widget didn't render within ready-timeout.
    */
    plugPromise : function() {
        // store 'arguments' inside 'args' --> because new Promise() has other arguments
        var host = this,
            args = arguments,
            plugin = args[0],
            readypromise = plugin && plugin.readyPromise;

        return new Y.Promise(function (resolve, reject) {
            host.plug.apply(host, args);
            if (readypromise) {
                readypromise(args[2]).then(
                    function() {
                        resolve(plugin && host[plugin.ns]);
                    },
                    reject
                );
            }
            else {
               resolve(plugin && host[plugin.ns]);
            }
        });
    },

    //--- private declarations

    /**
      * Resolves when the host is ready. In case of a widget, this will be after rendered: widget.renderPromise(), otherwise immediatly.
      *
      * @method _hostReadyPromise
      * @param [timeout] {int} Timeout in ms, after which the promise will be rejected. Set to 0 to de-activate.<br />
      *                                      If omitted, a timeout of 20 seconds (20000ms) will be used.<br />
      *                                      The timeout-value can only be set at the first time the Promise is called.
      * @private
      * @since 0.1
      * @return {Promise} --> resolve() or reject(reason) can only be rejected when a widget didn't render within 20 seconds.
    */
    _hostReadyPromise : function(timeout) {
        var host = this;

        if (!host._hostreadypromise) {
            host._hostreadypromise = new Y.Promise(function (resolve, reject) {
              if (Y.Widget && (host instanceof Y.Widget)) {
                  Y.use('gallery-itsawidgetrenderpromise', function() {
                      host.readyPromise(timeout).then(
                          resolve,
                          reject
                      );
                  });
              }
              else {
                  resolve();
              }
            });
        }
        return host._hostreadypromise;
    },

    /**
      * Resolves when the host is ready. In case of a widget, this will be after rendered: widget.renderPromise(), otherwise immediatly.
      *
      * @method _hostRenderPromise
      * @param [timeout] {int} Timeout in ms, after which the promise will be rejected. Set to 0 to de-activate.<br />
      *                                      If omitted, a timeout of 20 seconds (20000ms) will be used.<br />
      *                                      The timeout-value can only be set at the first time the Promise is called.
      * @private
      * @since 0.1
      * @return {Promise} --> resolve() or reject(reason) can only be rejected when a widget didn't render within 20 seconds.
    */
    _hostRenderPromise : function(timeout) {
        var host = this;

        if (!host._hostrenderpromise) {
            host._hostrenderpromise = new Y.Promise(function (resolve, reject) {
              if (Y.Widget && (host instanceof Y.Widget)) {
                  Y.use('gallery-itsawidgetrenderpromise', function() {
                      host.renderPromise(timeout).then(
                          resolve,
                          reject
                      );
                  });
              }
              else {
                  reject(new Error('Host is no widget'));
              }
            });
        }
        return host._hostrenderpromise;
    }

});

// mix it in Y.Plugin.Host:
Y.Plugin.Host.ITSAPluginPromise = ITSAPluginPromise;
Y.Base.mix(Y.Plugin.Host, [ITSAPluginPromise]);


/**
 * Declaration of Y.Plugin.Base.readyPromise()
 *
 * This method returns a Promise once a Plugin is ready. It depends on the developer of the plugin to notify the 'readystate'
 * by firing the readyevent by this.fire('ready').
 *
 *
 * @module gallery-itsapluginpromise
 * @extends Plugin.Base
 * @class Y.Plugin.Base
 * @since 0.1

 * <i>Copyright (c) 2012 Marco Asbreuk - http://theinternetwizard.net</i>
 * YUI BSD License - http://developer.yahoo.com/yui/license.html
 *
*/

/**
 * Promise that holds any stuff that should be done before the plugin is defined as 'ready'.
 * By default this promise is resolved right away. The intention is that it can be overridden in Plugin.Base extentions.<br /><br />
 * <b>Notion</b>It is not the intention to make a dircet call an promiseBeforeReady --> use readyPromise () instead,
 * because that promise if more efficient.
 *
 * @method promiseBeforeReady
 * @param [timeout] {int} Timeout in ms, after which the promise will be rejected. Set to 0 to de-activate.<br />
 *                                      If omitted, a timeout of 20 seconds (20000ms) will be used.<br />
 *                                      The timeout-value can only be set at the first time the Promise is called.
 * @return {Y.Promise} promised response --> resolve() OR reject(reason).
 * @since 0.2
*/
Y.Plugin.Base.prototype.promiseBeforeReady = function() {
    return new Y.Promise(function (resolve) {
        resolve();
    });
};

/**
 * Promise that will be resolved once the plugin is defined as 'ready'.
 * It depends on the developer of the plugin to notify the 'readystate' by firing the readyevent by this.fire('ready').
 *
 * @method readyPromise
 * @param [timeout] {int} Timeout in ms, after which the promise will be rejected. Set to 0 to de-activate.<br />
 *                                      If omitted, a timeout of 20 seconds (20000ms) will be used.<br />
 *                                      The timeout-value can only be set at the first time the Promise is called.
 * @return {Y.Promise} promised response --> resolve() OR reject(reason).
 * @since 0.2
*/
Y.Plugin.Base.prototype.readyPromise = function(timeout) {
    var instance = this;
    if (!instance._readypromise) {
        instance._readypromise = new Y.Promise(function (resolve, reject) {
            instance.promiseBeforeReady().then(
                resolve,
                reject
            );
            if (timeout !== 0) {
                Y.later(
                    timeout || DEFAULTTIMEOUT,
                    null,
                    function() {
                        var errormessage = 'readyPromise is rejected by timeout of '+(timeout || DEFAULTTIMEOUT)+ ' ms';
                        reject(new Error(errormessage));
                    }
                );
            }
        });
    }
    return instance._readypromise;
};

}, '@VERSION@', {
    "requires": [
        "yui-base",
        "base-base",
        "base-build",
        "pluginhost-base",
        "plugin",
        "event-delegate",
        "promise"
    ]
});
