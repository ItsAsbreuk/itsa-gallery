'use strict';

/**
 * The ItsaUtils module.
 *
 * @module gallery-itsautils
 */

var DATEPATTERN = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/;

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
    var reviver = function(key, value) {
        return DATEPATTERN.test(value) ? new Date(value) : value;
    };
    try {
        return this.parse(s, reviver);
    }
    catch(err) {
        throw err;
    }
};