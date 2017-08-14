/**
 *
 * @authors liwb (you@example.org)
 * @date    2017/8/14 14:25
 * @version $ IIFE
 */

/* name module */

/**
 * convert bytes into friendly format
 * @param bytes
 * @returns {*}
 */
export default function bytesToSize(bytes) {
    var sizes = ['Bytes', 'KB', 'MB'];
    if (bytes === 0) return 'n/a';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
}