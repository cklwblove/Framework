'use strict';

var
    win = window,

    doc = win.document,

    hasOwnProperty = Object.prototype.hasOwnProperty,

    version = '0.0.1';

/**
 * Check whether the object has the property.
 *
 * @param {Object} obj
 * @param {String} key
 * @return {Boolean}
 */

function hasOwn(obj, key) {
    return hasOwnProperty.call(obj, key);
}

function isArray(arr) {
    if (Object.prototype.toString.apply(arr) === '[object Array]') return true;
    else return false;
}

function isString(str) {
    return Object.prototype.toString.call(str) === "[object String]";
}