/**
 *
 * @authors liwb (you@example.org)
 * @date    2017/8/4 9:22
 * @version $ IIFE
 */

/* name module */

/**
 * 获取浏览器参数
 * @param name
 * @returns {*}
 */
export default function getUrlParams(name) {
    //构造一个含有目标参数的正则表达式对象
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    //匹配目标参数
    var r = window.location.search.substr(1).match(reg);
    if (r !== null) return decodeURIComponent(r[2]);

    return null;
}