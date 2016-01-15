/*======================================================
 ************   util   ************
 ======================================================*/

/**
 *  对Date的扩展，将 Date 转化为指定格式的String * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q)
 可以用 1-2 个占位符 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 * @param pattern 格式
 * @param timestamp 时间戳
 * @returns {*} 默认返回当前时间
 * eg:
 * ("yyyy-MM-dd hh:mm:ss.S")==> 2006-07-02 08:09:04.423
 * ("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04
 * ("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04
 * ("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04
 * ("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
 */
function formatDate() {
    var that, pattern, timestamp;

    if (arguments.length === 1) {
        pattern = arguments[0];
    } else {
        pattern = arguments[0];
        timestamp = arguments[1];
    }

    that = timestamp ?
        new Date(parseInt(timestamp) * 1000) :
        new Date();

    var o = {
        "M+": that.getMonth() + 1, //月份
        "d+": that.getDate(), //日
        "h+": that.getHours() % 12 === 0 ? 12 : that.getHours() % 12, //小时
        "H+": that.getHours(), //小时
        "m+": that.getMinutes(), //分
        "s+": that.getSeconds(), //秒
        "q+": Math.floor((that.getMonth() + 3) / 3), //季度
        "S": that.getMilliseconds() //毫秒
    };
    var week = {
        "0": "/u65e5",
        "1": "/u4e00",
        "2": "/u4e8c",
        "3": "/u4e09",
        "4": "/u56db",
        "5": "/u4e94",
        "6": "/u516d"
    };
    if (/(y+)/.test(pattern)) {
        pattern = pattern.replace(RegExp.$1, (that.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(pattern)) {
        pattern = pattern.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[that.getDay() + ""]);
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(pattern)) {
            pattern = pattern.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return pattern;
}

/**
 * 计算字符的长度，中文两个，英文一个，特殊字符除外
 * @param str
 * @returns {*}
 */
function getStringLen(str) {
    if (!isString(str)) {
        return undefined;
    }

    var i = 0,
        len = str.length;

    for ( ; i < len; i++) {
        var c = str.charCodeAt(i);
        if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
            len++;
        } else { // 中文字符
            len += 2;
        }
    }
    return len;
}

/**
 * 获取范围之内的随机数
 * @param min
 * @param max
 * @returns {*}
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * 得到url查询字符串参数
 * 默认当前url，也可以指定url
 * @returns {{}} key value
 */
function getUrlArgs() {
    var url, qs, len, items,
        args = {},
        item = null,
        name = null,
        value = null,
        i = 0;

    if(arguments.length) {
        url = arguments[0];
        qs = url.substring(url.indexOf("?") + 1, url.length);
    } else {
        url = location.search;
        qs = url.substring(1);
    }

    items = qs.split('&');
    len = items.length;

    for( ; i < len; i += 1) {
        item = items[i].split('=');
        name = decodeURIComponent(item[0]);
        value = decodeURIComponent(item[1]);

        if(name.length) {
            args[name] = value;
        }
    }

    return args;
}

var util = {
    formatDate: formatDate,
    getStringLen: getStringLen,
    getRandomInt: getRandomInt,
    getUrlArgs: getUrlArgs
};