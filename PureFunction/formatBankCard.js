/**
 *
 * @authors liwb (you@example.org)
 * @date    2017/8/25 19:39
 * @version $ IIFE
 */

/* name module */

/**
 * 格式化银行卡
 * 用户在输入银行卡号时，需要以4位4位的形式显示，就是每隔4位加个空格，方便用户校对输入的银行卡是否正确
 * @param val
 * @returns {*}
 */
export default function formatBankCard(val) {
    if (typeof str === 'string') {
        var len = str.length,
            reg = /(\d{4})(?=\d)/g;

        if (len < 4) {
            return str;
        } else {
            return str.replace(/(\d{4})(?=\d)/g, "$1 ");
        }
    }
}