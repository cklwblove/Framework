/**
 *
 * @authors liwb (you@example.org)
 * @date    2017/8/14 14:10
 * @version $ 验证库
 */

/* name module */

/**
 * 是否为有效的车牌号码
 * @param val
 * @returns {boolean}
 */
export function isLicenseNo(val) {
    const reg = /(^[\u4E00-\u9FA5]{1}[A-Z0-9]{6}$)|(^[A-Z]{2}[A-Z0-9]{2}[A-Z0-9\u4E00-\u9FA5]{1}[A-Z0-9]{4}$)|(^[\u4E00-\u9FA5]{1}[A-Z0-9]{5}[挂学警军港澳]{1}$)|(^[A-Z]{2}[0-9]{5}$)|(^(08|38){1}[A-Z0-9]{4}[A-Z0-9挂学警军港澳]{1}$)/;

    return reg.test(val);
}

/**
 * 是否为有效的手机号
 * @param val
 * @returns {boolean}
 */
export function isMobile(val) {
    const reg = /^[1][34578]\d{9}$/;

    return reg.test(val);
}

/**
 *  是否为有效的身份证号
 * @param val
 * @returns {boolean}
 */
export function isCardId(val) {
    const reg = /^\d{6}(19|2\d)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)?$/;

    return reg.test(val);
}

/**
 * 是否为数字
 * @param val
 * @returns {boolean}
 */
export function isNumeric(val) {
    const reg = /^[0-9]*$/;

    return reg.test(val);
}

/**
 * 是否为字母
 * @param val
 * @returns {boolean}
 */
export function isLetters(val) {
    const reg = /^[a-z]+$/i;

    return reg.test(val);
}

/**
 * 是否为有效的金额
 * @param val
 * @returns {boolean}
 */
export function isValidMoney(val) {
    const reg = /^([1-9]\\d*(\\.\\d{1,2})?|0\\.[1-9]\\d?|0\\.0[1-9]|0|0.0)$/;

    return reg.test(val);
}

/**
 * 是否为有效的日期，格式为yyyy-mm-dd
 * @param val
 * @returns {boolean}
 */
export function isValidDate(val) {
    const reg = /^\d{4}-\d{2}-\d{2}$/;

    return reg.test(val);
}

/**
 * 是否为有效的邮箱
 * @param val
 * @returns {boolean}
 */
export function isValidEmail(val) {
    const reg = /^[\w\+\-]+(\.[\w\+\-]+)*@[a-z\d\-]+(\.[a-z\d\-]+)*\.([a-z]{2,4})$/i;

    return reg.test(val);
}

/**
 * 是否为有效的url
 * @param val
 * @returns {boolean}
 */
export function isValidURI(val) {
    const reg = /^(https?|s?ftp):\/\/\S+$/i;

    return reg.test(val);
}

/**
 * 是否为有效的qq
 * @param val
 * @returns {boolean}
 */
export function isValidQQ(val) {
    const reg = /^[1-9]\d{4,}$/;

    return reg.test(val);
}

/**
 * 是否为有效的邮政编码
 * @param val
 * @returns {boolean}
 */
export function isValidZipcode(val) {
    const reg = /^\d{6}$/;

    return reg.test(val);
}

/**
 * 是否为有效的密码
 * 6-16位字母加数字组合，不能包含空格
 * @param val
 * @returns {boolean}
 */
export function isValidPassword(val) {
    const reg = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{8,20}$/;

    return reg.test(val);
}

/**
 * 是否为闰年
 * @param val
 * @returns {boolean}
 */
export function isLeapYear(val) {
    if (val % 4 == 0 && val % 100 != 0) {
        return true;
    } else {
        return val % 400 == 0;
    }
}


