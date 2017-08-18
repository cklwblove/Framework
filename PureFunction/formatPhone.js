/**
 *
 * @authors liwb (you@example.org)
 * @date    2017/8/18 21:33
 * @version $ IIFE
 */

/* name module */

/**
 * 手机号码中间部分替换成星号
 * @param phone
 * @returns {string|XML|*|void}
 */
export default function formatPhone(phone) {
    return phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
}