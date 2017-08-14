/**
 *
 * @authors liwb (you@example.org)
 * @date    2017/8/14 13:53
 * @version $ IIFE
 */

/* name module */

export function setSessionStorageItem(item_key, item_value) {
    isSeesionStorageNameSupported() && sessionStorage.setItem(item_key, item_value);
}

export function getSessionStorageItem(item_key) {
    if (isSeesionStorageNameSupported()) {
        return sessionStorage.getItem(item_key);
    }
}

export function removeSessionStorageItem(item_key) {
    if (isSeesionStorageNameSupported()) {
        return sessionStorage.removeItem(item_key);
    }
}

export function clearSessionStorage() {
    isSeesionStorageNameSupported() && sessionStorage.clear();
}

function isSeesionStorageNameSupported() {
    var win = window,
        sessionStorageName = 'sessionStorage';

    try {
        return (sessionStorageName in win && win[sessionStorageName]);
    } catch (err) {
        return false;
    }
}