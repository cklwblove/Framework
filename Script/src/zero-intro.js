'use strict';

var zero = {},
    win = window,
    doc = win.document,
    hasOwnProperty = Object.prototype.hasOwnProperty;

zero.version = '0.0.1';
// Default Parameters
zero.params = {
    // Modals
    modalButtonOk: 'OK',
    modalButtonCancel: 'Cancel',
    modalTitle: 'Framework7',
    modalCloseByOutside: false,
    actionsCloseByOutside: true,
    popupCloseByOutside: true,
    modalStack: true
}

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