/**
 *
 * @authors liwb (you@example.org)
 * @date    2017/8/14 14:03
 * @version $ IIFE
 */

/* name module */
/**
 * 计算光标的位置，并插入str
 * @param obj
 * @param str
 */

export default function insertText(obj, str) {
    if (document.selection) { // IE
        var sel = document.selection.createRange();
        sel.text = str;
    } else if (typeof obj.selectionStart === 'number' && typeof obj.selectionEnd === 'number') {
        var startPos = obj.selectionStart,
            endPos = obj.selectionEnd,
            cursorPos = startPos,
            tmpStr = obj.value;
        obj.value = tmpStr.substring(0, startPos) + str + tmpStr.substring(endPos, tmpStr.length);
        cursorPos += str.length;
        obj.selectionStart = obj.selectionEnd = cursorPos;
    } else {
        obj.value += str;
    }
}