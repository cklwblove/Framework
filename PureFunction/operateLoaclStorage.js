/**
 *
 * @authors liwb (you@example.org)
 * @date    2017/8/14 13:53
 * @version $ IIFE
 */

/* name module */

//localstore
export function setLocalStorageItem(item_key, item_value) {

    isLocalStorageNameSupported() && localStorage.setItem(item_key, item_value);
}

export function getLocalStorageItem(item_key) {
    if (isLocalStorageNameSupported()) {
        return localStorage.getItem(item_key);
    }
}

export function removeLocalStorageItem(item_key) {
    if (isLocalStorageNameSupported()) {
        return localStorage.removeItem(item_key);
    }
}

function clearLoaclStorage() {
    isLocalStorageNameSupported() && localStorage.clear();
}

function isLocalStorageNameSupported() {
    var win = window,
        localStorageName = 'localStorage';

    try {
        return (localStorageName in win && win[localStorageName]);
    } catch (err) {
        return false;
    }
}