/**
 *
 * @authors liwb (you@example.org)
 * @date    2017/8/14 14:05
 * @version $ IIFE
 */

/* name module */

export default function debounce(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function () {
        // 据上一次触发时间间隔
        var last = Date.now() - timestamp;

        // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
        if (last < wait && last > 0) {
            timeout = setTimeout(later, wait - last);
        } else {
            timeout = null;
            // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
            if (!immediate) {
                result = func.apply(context, args);
                if (!timeout) context = args = null;
            }
        }
    };

    return function () {
        context = this;
        args = arguments;
        timestamp = Date.now();
        var callNow = immediate && !timeout;
        // 如果延时不存在，重新设定延时
        if (!timeout) timeout = setTimeout(later, wait);
        if (callNow) {
            result = func.apply(context, args);
            context = args = null;
        }

        return result;
    }
}