/**
 *
 * @authors liwb (you@example.org)
 * @date    2017/8/3 17:12
 * @version $ IIFE
 */

/* name module */

/**
 * Date 转化为指定格式的String
 * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q)
 * 可以用 1-2 个占位符
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 * eg:
 * (Date.now(), 'yyyy-MM-dd hh:mm:ss.S') ==> 2006-07-02 08:09:04.423
 * (Date.now(), 'yyyy-MM-dd E HH:mm:ss') ==> 2009-03-10 二 20:09:04
 * (Date.now(), 'yyyy-MM-dd EE hh:mm:ss') ==> 2009-03-10 周二 08:09:04
 * (Date.now(), 'yyyy-MM-dd EEE hh:mm:ss') ==> 2009-03-10 星期二 08:09:04
 * (Date.now(), 'yyyy-M-d h:m:s.S') ==> 2006-7-2 8:9:4.18
 */
export function formatDate(date, fmt = 'yyyy-MM-dd HH:mm:ss') {
    date = date == undefined ? new Date() : date;
    date = (typeof date == 'number' || typeof date == 'string') ? new Date(date) : date;
    
    var o = {
        'M+': date.getMonth() + 1, //月份
        'd+': date.getDate(), //日
        'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12, //小时
        'H+': date.getHours(), //小时
        'm+': date.getMinutes(), //分
        's+': date.getSeconds(), //秒
        'q+': Math.floor((date.getMonth() + 3) / 3), //季度
        'S': date.getMilliseconds() //毫秒
    };
    var week = {
        '0': '\u65e5',
        '1': '\u4e00',
        '2': '\u4e8c',
        '3': '\u4e09',
        '4': '\u56db',
        '5': '\u4e94',
        '6': '\u516d'
    };

    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }

    if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '\u661f\u671f' : '\u5468') : '') + week[date.getDay() + '']);
    }

    for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
        }
    }

    return fmt;
}

/**
 * 时间转化为几天前,几小时前，几分钟前
 * @param ms
 * @returns {*}
 */
export function formatTime(ms) {
    ms = parseInt(ms);

    var d_second, d_minutes, d_hours, d_days;
    var timeNow = new Date().getTime();
    var d = (timeNow - ms) / 1000;
    var s = new Date();

    d_days = Math.round(d / (24 * 60 * 60));
    d_hours = Math.round(d / (60 * 60));
    d_minutes = Math.round(d / 60);
    d_second = Math.round(d);

    if (d_days > 0 && d_days < 2) {
        return d_days + '天前';
    } else if (d_days <= 0 && d_hours > 0) {
        return d_hours + '小时前';
    } else if (d_hours <= 0 && d_minutes > 0) {
        return d_minutes + '分钟前';
    } else if (d_minutes <= 0 && d_second >= 0) {
        return '刚刚';
    } else {
        s.setTime(ms);

        return (s.getFullYear() + '-' + f(s.getMonth() + 1) + '-' + f(s.getDate()) + ' ' + f(s.getHours()) + ':' + f(s.getMinutes()));
    }

    function f(n) {
        return (n < 10) ? '0' + n : n;
    }
}