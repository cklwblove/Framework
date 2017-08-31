/**
 *
 * @authors liwb (you@example.org)
 * @date    2017/8/31 17:33
 * @version $ IIFE
 */

/* name module */

/**
 * 获取浏览器href参数
 * @param name
 * @returns {*}
 */
export default function getLocationHrefParams() {
  var r = new RegExp("(\\?|#|&)" + name + "=([^&#]*)(&|#|$)");
  var m = window.location.href.match(r);

  if (r !== null) return decodeURIComponent(!m ? "" : m[2]);
  return null;
}
