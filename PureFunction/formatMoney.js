/**
 *
 * @authors liwb (you@example.org)
 * @date    2017/8/21 9:27
 * @version $ IIFE
 */

/* name module */

export default function formatMoney(val) {

   return val.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * usage
 * var test1 = formatMoney('1234567890');
 *
 * console.log(format) // 1,234,567,890
 */
