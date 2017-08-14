/**
 *
 * @authors liwb (you@example.org)
 * @date    2017/8/14 14:27
 * @version $ IIFE
 */

/* name module */

export default function inWeixin() {
    if (typeof navigator === 'undefined') {
        return false;
    }
    var ua = navigator.userAgent.toLowerCase();

    return ua.indexOf('micromessenger') !== -1;
}