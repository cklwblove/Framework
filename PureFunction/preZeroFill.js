/**
 *
 * @authors liwb (you@example.org)
 * @date    2017/8/14 13:52
 * @version $ IIFE
 */

/* name module */

/**
 * 对整数进行前置补0
 * @param num 数组: 12
 * @param size 要补0的位数，比如：3
 * @returns 012
 */
export function preZeroFill (num, size) {
    if (num >= Math.pow(10, size)) {
        return num.toString();
    } else {
        var _str = Array(size + 1).join('0') + num;
        return _str.slice(_str.length - size);
    }
}