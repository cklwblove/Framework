/**
 *
 * @authors liwb (you@example.org)
 * @date    2017/8/14 14:20
 * @version $ IIFE
 */

/* name module */

/**
 * 为数字加上单位：万或亿
 *
 * 例如：
 *      1000.01 => 1000.01
 *      10000 => 1万
 *      99000 => 9.9万
 *      566000 => 56.6万
 *      5660000 => 566万
 *      44440000 => 4444万
 *      11111000 => 1111.1万
 *      444400000 => 4.44亿
 *      40000000,00000000,00000000 => 4000万亿亿
 *      4,00000000,00000000,00000000 => 4亿亿亿
 *
 * @param {number} number 输入数字.
 * @param {number} decimalDigit 小数点后最多位数，默认为2
 * @return {string} 加上单位后的数字
 */
export default function addChineseUnit(number) {
    var isNeedAbs = false;
    if(number < 0) {
        isNeedAbs = true;
        number = Math.abs(number);
    };

    return function (number, decimalDigit) {
        decimalDigit = decimalDigit == null ? 2 : decimalDigit;
        var integer = Math.floor(number);
        var digit = getDigit(integer);
        // ['个', '十', '百', '千', '万', '十万', '百万', '千万'];
        var unit = [];
        if (digit > 3) {
            var multiple = Math.floor(digit / 8);
            if (multiple >= 1) {
                var tmp = Math.floor(integer / Math.pow(10, 8 * multiple));
                unit.push(addWan(tmp, number, 8 * multiple, decimalDigit));
                for (var i = 0; i < multiple; i++) {
                    unit.push('亿');
                }
                if(isNeedAbs) {
                    return  "-"+unit.join('');
                }else {
                    return unit.join('');
                }
            } else {
                if(isNeedAbs) {
                    return "-"+addWan(integer, number, 0, decimalDigit);
                }else {
                    return addWan(integer, number, 0, decimalDigit);
                }
            }
        } else {
            if(isNeedAbs){
                return  "-"+number;
            }else {
                return number;
            }
        }
    }(number);
}

function addWan (integer, number, mutiple, decimalDigit) {
    var digit = getDigit(integer);
    if (digit > 3) {
        var remainder = digit % 8;
        if (remainder >= 5) { // ‘十万’、‘百万’、‘千万’显示为‘万’
            remainder = 4;
        }
        return Math.floor(number / Math.pow(10, remainder + mutiple - decimalDigit)) / Math.pow(10, decimalDigit) + '万';
    } else {
        return Math.floor(number / Math.pow(10, mutiple - decimalDigit)) / Math.pow(10, decimalDigit);
    }
};
function getDigit (integer) {
    var digit = -1;
    while (integer >= 1) {
        digit++;
        integer = integer / 10;
    }
    return digit;
};