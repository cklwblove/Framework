/**
 *
 * @authors liwb (you@example.org)
 * @date    2017/8/3 16:59
 * @version $ IIFE
 */

/* name module */

/**
 * html字符编码转义
 * @param str
 * @returns {string}
 */
export default function htmlEncode(str) {
    let s = '';

    if (typeof str === 'string' && str.length === 0) return;

    s = str.replace(/&/g, '&amp;');

    return s.replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\'/g, '&#39;')
        .replace(/ /g, '&nbsp;')
        .replace(/\"/g, '&quot;')
        .replace(/\n/g, '<br>');
}