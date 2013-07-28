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
 * @class Y.Pugin.Host
 * @since 0.1
 *
 * <i>Copyright (c) 2012 Marco Asbreuk - http://theinternetwizard.net</i>
 * YUI BSD License - http://developer.yahoo.com/yui/license.html
 *
*/

function ITSAPluginPromise() {}

Y.mix(ITSAPluginPromise.prototype, {
    /**
      * Determines if a plugin has plugged into this host, but checks <b>after the host is ready</b> (rendered in case of widgets).
      * This means you are sure any plugins at declaration (declared by Base config.plugins) are really there.
      * <br /><br />The promise will be resolved if the plugin is plugged in, otherwise rejected.
      *
      * @method hasPluginPromise
      * @param {String} ns The plugin's namespace
      * @return {Y.Promise} --> resolve(status) - status=Host-object;
      * reject(reason) --> reject will only happen if a host-widget is not rendered before timeout of 20 seconds.
      * @since 0.1
      * @return {Promise} --> resolve(host) or reject(reason) where 'reason' is that ns is not plugged in.
    */
    hasPluginPromise : function(ns) {
        var host = this;

        return host.hostReadyPromise().then(
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
      * Resolves when the host is ready. In case of a widget, this will be after rendered: widget.renderPromise(), otherwise immediatly.
      *
      * @method hostReadyPromise
      * @since 0.1
      * @return {Promise} --> resolve() or reject(reason) can only be rejected when a widget didn't render within 20 seconds.
    */
    hostReadyPromise : function() {
        var host = this;

        if (!host._hostreadypromise) {
            if (host instanceof Y.Base) {
                host._hostreadypromise = host.renderPromise();
            }
            else {
                host._hostreadypromise = new Y.Promise(function (resolve) {
                    resolve();
                });
            }
        }
        return host._hostreadypromise;
    },

    /**
      * Adds a plugin to the host object, just as 'plug()' would do.  The difference is that plugPromise will wait until the host is rendered.
      * <br />In case the host is a Widget, you can be sure the widget is ready (rendered). In case the host is not a widget, then the plugin
      * <br />will happen instantly. You get a 'promise' that the plugin will be possible.
      *
      * @method plugPromise
      * @param plugin {Function | Object |Array} Accepts the plugin class, or an
      * object with a "fn" property specifying the plugin class and
      * a "cfg" property specifying the configuration for the Plugin.
      * <p>
      * Additionally an Array can also be passed in, with the above function or
      * object values, allowing the user to add multiple plugins in a single call.
      * </p>
      * @param config (Optional) If the first argument is the plugin class, the second argument
      * can be the configuration for the plugin.
      * @since 0.1
      * @return {Promise} --> resolve(host) or reject(reason) can only be rejected when a widget didn't render within 20 seconds.
    */
    plugPromise : function() {
        // store 'arguments' inside 'args' --> because new Promise() has other arguments
        var host = this,
              args = arguments;

        return host.hostReadyPromise().then(
            function() {
                host.plug.apply(host, args);
                return host;
            }
        );
    }

});

Y.Plugin.Host.ITSAPluginPromise = ITSAPluginPromise;

Y.Base.mix(Y.Plugin.Host, [ITSAPluginPromise]);

}, '@VERSION@', {
    "requires": [
        "yui-base",
        "base-base",
        "base-build",
        "pluginhost-base",
        "event-delegate",
        "promise",
        "gallery-itsawidgetrenderpromise"
    ]
});
