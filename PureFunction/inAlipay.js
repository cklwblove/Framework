/**
 *
 * @authors liwb (you@example.org)
 * @date    2017/8/14 14:27
 * @version $ IIFE
 */

/* name module */

export default function inAlipay () {
    if (typeof navigator === 'undefined') {
        return false;
    }
    var ua = navigator.userAgent.toLowerCase();
    return ua.indexOf('alipayclient') !== -1;
}