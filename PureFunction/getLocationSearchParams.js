/**
 *
 * @authors liwb (you@example.org)
 * @date    2017/8/23 18:38
 * @version $ IIFE
 */

/* name module */

/**
 * 获取浏览器search参数
 * @param name
 * @returns {*}
 */
export default function getLocationSearchParams(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
  var r = window.location.search.substr(1).match(reg);  //匹配目标参数

  if (r !== null) return decodeURIComponent(r[2]);

  return null;
}

