/**
 *
 * @authors liwb (you@example.org)
 * @date    2017/8/3 16:59
 * @version $ IIFE
 */

/* name module */

/**
 * html字符转义解码
 * @param str
 * @returns {string}
 */
export default function (str) {
    let s = '';

    if (typeof str === 'string' && str.length === 0) return;

    s = str.replace(/&amp;/g, '&');

    return s.replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&#39;/g, '\'')
        .replace(/&nbsp;/g, ' ')
        .replace(/&quot;/g, '\"')
        .replace(/<br>/g, '\\n');
}