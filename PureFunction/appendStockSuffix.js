/**
 *
 * @authors liwb (you@example.org)
 * @date    2017/8/14 13:49
 * @version $ IIFE
 */

/* name module */

/**
 * 自动添加股票代码后缀
 * @param stock
 * @returns {string|*}
 */
export default function appendStockSuffix(keywordStock) {
    var regSS = /^(((700|730|900|600|601|580)[\d]{3})|60[\d]{4})$/;
    var regSZ = /^(((000|002|200|300|080|031)[\d]{3}|00[\d]{4}))$/;

    if (regSS.test(keywordStock)) {
        keywordStock = keywordStock + ".SS";
    } else if (regSZ.test(keywordStock)) {
        keywordStock = keywordStock + ".SZ";
    }
    return keywordStock;
}