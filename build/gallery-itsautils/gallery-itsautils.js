YUI.add('gallery-itsautils', function (Y, NAME) {

'use strict';
/**
 * The ItsaUtils module.
 *
 * @module gallery-itsautils
 */

var DATEPATTERN = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/,
    REVIVER = function(key, value) {
        return DATEPATTERN.test(value) ? new Date(value) : value;
    },
    Lang = Y.Lang,
    YPromise = Y.Promise,
    MIME_JSON = 'application/json';



//============================================================================
// remove this temporarely function of cast as soo as it is availabe in Y.Promise
//============================================================================
YPromise.cast = function (value) {
    return Y.Promise.isPromise(value) && value.constructor === this ? value :
        /*jshint newcap: false */
        new this(function (resolve) {
        /*jshint newcap: true */
            resolve(value);
        });
};
YPromise.prototype.cast = YPromise.cast;
//============================================================================


/*
Returns a promise that is resolved or rejected when all values are resolved or
any is rejected. This is useful for waiting for the resolution of multiple
promises, such as reading multiple files in Node.js or making multiple XHR
requests in the browser.

@method all
@param {Any[]} values An array of any kind of values, promises or not. If a value is not
@return [Promise] A promise for an array of all the fulfillment values
@static
*/
YPromise.allFulfilled = function (values) {
    var Promise = this;
    return new Promise(function (resolve, reject) {
        if (!Lang.isArray(values)) {
            reject(new TypeError('Promise.all expects an array of values or promises'));
            return;
        }

        var remaining       = values.length,
            i               = 0,
            length          = values.length,
            resolvedresults = [],
            rejectedresults = [];

        function oneDone(index, resolved) {
            return function (value) {
                resolvedresults[index] = resolved ? value : null;
                rejectedresults[index] = resolved ? null : value;

                remaining--;

                if (!remaining) {
                    resolve({
                        resolved: resolvedresults,
                        rejected: rejectedresults
                    });
                }
            };
        }

        if (length < 1) {
            return resolve({
                        resolved: resolvedresults,
                        rejected: rejectedresults
                    });
        }

        for (; i < length; i++) {
            Promise.cast(values[i]).then(oneDone(i, true), oneDone(i, false));
        }
    });
};

YPromise.prototype.allFulfilled = YPromise.allFulfilled;


/**
 * Parse a JSON string, returning the native JavaScript representation.
 *
 * @param s {string} JSON string data
 * @return {MIXED} the native JavaScript representation of the JSON string
 * @throws SyntaxError
 * @method parse
 * @static
 */
// JavaScript implementation in lieu of native browser support.  Based on
// the json2.js library from http://json.org
Y.JSON.fullparse = function (s) {
    try {
        return this.parse(s, REVIVER);
    }
    catch(err) {
        throw err;
    }
};

// now overrule Y.io.json (which comes from gallery-io-utils) and pass in the REVIVER

/**
Performs an AJAX request and parses the response as JSON notation.
Requires the JSON module.

@method json
@for io
@static
@param {String} uri Qualified path to transaction resource.
@param {Object} [options] Same configuration options as Y.io.xhr()
@return {Promise} Promise for the response object. Contains an extra
    `abort()` method to cancel the request.
**/
Y.io.json = function (uri, options) {
    options = options || {};

    // Force the use of the correct headers
    // Since a JSON response is expected, ask for it with the Accept header
    if (!options.headers) {
        options.headers = {};
    }
    options.headers.Accept = MIME_JSON;

    var promise = Y.io.xhr(uri, options);

    return Y.mix(promise.then(function (xhr) {
        return Y.JSON.parse(xhr.responseText, REVIVER);
    }), {
        // pass around the abort function
        abort: promise.abort
    }, true);
};

Y.JSONPRequest.prototype.send = function () {
        var self   = this,
            args   = Y.Array(arguments, 0, true),
            config = self._config,
            proxy  = self._proxy || Y.guid(),
            url;

        // TODO: support allowCache as time value
        if (config.allowCache) {
            self._proxy = proxy;
        }

        if (self._requests[proxy] === undefined) {
            self._requests[proxy] = 0;
        }
        if (self._timeouts[proxy] === undefined) {
            self._timeouts[proxy] = 0;
        }
        self._requests[proxy]++;


        args.unshift(self.url, 'YUI.Env.JSONP.' + proxy);
        url = config.format.apply(self, args);

        if (!config.on.success) {
            return self;
        }

        function wrap(fn, isTimeout) {
            return (typeof fn==='function') ?
                function (data) {
                    var execute = true,
                        counter = '_requests',
                        stringifiedData;

// ADDED BY Its Asbreuk ==========================================
// at this point, data is already is an object
// don't know when json.parse got into, we stringify and parse
// for a second time:
//================================================================
if (typeof data === 'object') {
    stringifiedData = Y.JSON.stringify(data);
    try {
        data = Y.JSON.fullparse(stringifiedData);
    }
    catch (err) {
    }
}
//================================================================

                    //if (config.allowCache) {
                        // A lot of wrangling to make sure timeouts result in
                        // fewer success callbacks, but the proxy is properly
                        // cleaned up.
                        if (isTimeout) {
                            ++self._timeouts[proxy];
                            --self._requests[proxy];
                        } else {
                            if (!self._requests[proxy]) {
                                execute = false;
                                counter = '_timeouts';
                            }
                            --self[counter][proxy];
                        }
                    //}

                    if (!self._requests[proxy] && !self._timeouts[proxy]) {
                        delete YUI.Env.JSONP[proxy];
                    }

                    if (execute) {
                        fn.apply(config.context, [data].concat(config.args));
                    }
                } :
                null;
        }

        // Temporary un-sandboxed function alias
        // TODO: queuing
        YUI.Env.JSONP[proxy] = wrap(config.on.success);

        // Y.Get transactions block each other by design, but can easily
        //  be made non-blocking by just calling execute() on the transaction.
        // https://github.com/yui/yui3/pull/393#issuecomment-11961608
        Y.Get.js(url, {
            onFailure : wrap(config.on.failure),
            onTimeout : wrap(config.on.timeout, true),
            timeout   : config.timeout,
            charset   : config.charset,
            attributes: config.attributes,
            async     : config.async
        }).execute();

        return self;
    };

}, '@VERSION@', {"requires": ["yui-base", "json", "jsonp", "promise", "gallery-io-utils"]});
