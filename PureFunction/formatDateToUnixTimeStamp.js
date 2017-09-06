/**
 *
 * @authors liwb (you@example.org)
 * @date    2017/9/6 9:50
 * @version $ IIFE
 */

/* name module */

/**
 * 获取unix时间戳
 * @param time
 * '20160126 12:00:00', '2016-01-26 12:00:00', '2016.01.26 12:00:00', '20160126', '2016-05-23 13:58:02.0'
 */
export default function formatDateUnixTimeStamp(time) {
    if (typeof time !== 'string') throw new Error('time数据类型必须是string');

    // 2016-05-23 13:58:02.0
    if (time.length > 19) {
        time = time.substring(0, 19);
    }

    var unix_time;
    var pattern = /-|\./g;
    var year;
    var month;
    var day;

    if (pattern.test(time)) {
        unix_time = time.replace(pattern, '/');
    } else {
        year = time.slice(0, 4);
        month = time.slice(4, 6);
        day = time.slice(6, 8);
        unix_time = year + '/' + month + '/' + day;
    }

    return Math.round(Date.parse(unix_time));
}