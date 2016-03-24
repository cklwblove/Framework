/*======================================================
 ************   Validate   ************
 ======================================================*/

var Regex = {
    //时分,11:30
    regMS: /^([0-1]\d|2[0-3]):[0-5]\d$/,
    //字母或数字
    regWordOrNum: /^[0-9a-zA-Z]*$/,
    //邮箱(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/)
    regEmail: /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/,
    //url地址(/^[a-zA-z]+:\/\/([a-zA-Z0-9\-\.]+)([-\w .\/?%&=:]*)$/)
    regUrl: /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/,
    //url替代var urlRegex = "^((https|http|ftp|rtsp|mms)://)?[a-z0-9A-Z]{3}\.[a-z0-9A-Z][a-z0-9A-Z]{0,61}?[a-z0-9A-Z]\.com|net|cn|cc (:s[0-9]{1-4})?/$";var rUrl = new RegExp(urlRegex)
    //ip地址
    regIp:/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/,
    //手机号码
    regMobile: /^1[3|5][0-9]\d{4,8}$/,
    //传真(XXX-12345678或XXXX-1234567或XXXX-12345678)
    regFax: /^(\d{3,4}-)?\d{7,8}$/,
    //中文
    regChineseWord: /^([\u4E00-\u9FA5])+$/,
    //邮政编码
    regPostalCode: /^[0-9]{6}$/,
    //电话
    regTel: /^((0\d{2,3}))(\d{7,8})((\d{3,}))?$/,
    //数字
    regNum: /^[0-9]{1,20}$/,
    //正整数+0
    regPosInt: /^\d+$/,
    //非正整数（负整数 + 0）
    regNotPosInt:     /^((-\\d+)|(0+))$/,
    //负整数
    regNegInt: /^-[0-9]*[1-9][0-9]*$/,
    //非负整数（正整数 + 0）
    regNotNegInt: /^[1-9]\d*|0$/,
    //整数
    regInt: /^-?\d+$/,
    //正浮点数 + 整数(pass)
    regPosFl:/^((\d+\.\d*[1-9]\d*)|(\d*[1-9]\d*\.\d+)|(\d*[1-9]\d*))$/,
    //非正浮点数（负浮点数 + 0） (pass)
    regNotPosFl: /^((-\d+(.\d+)?)|(0+(\.0+)?))$/,
    //负浮点数(pass)
    regNegFl: /^(-((\d+\.\d*[1-9]\d*)|(\d*[1-9]\d*\.\d+)|(\d*[1-9]\d*)))$/,
    //非负浮点数（正浮点数 + 0 + 整数）(pass)
    regNotNegFl: /^\d+(.\d+)?$/,
    //浮点数，整数，0(pass)
    regFl: /^(-?\d+)(\.\d+)?$/
};

zero.validate = (function(){
    var validate = {
        //去掉左右空格
        trim: function(objValue) {
            return objValue.replace(/(^\s*)|(\s*$)/g, "");
        },
        //去掉左空格
        lTrim: function(objValue) {
            return objValue.replace(/(^\s*)/g, "");
        },
        //去掉右空格
        rTrim: function(objValue) {
            return objValue.replace(/(\s*$)/g, "");
        },

        //是否为浮点数（也可以是整数）
        isFloat: function(pattern, objValue) {
            return pattern.test(objValue) ? true: false;
        },
        //是否为汉字
        isChineseWord: function(objValue) {
            return objValue.match(Regex.regChineseWord) ? true: false;
        },
        //是否为正确邮编
        isPostalCode: function(objValue) {
            return Regex.regPostalCode.test(objValue) ? true: false;
        },
        //是否为正确手机号
        isMobile: function(objValue) {
            return Regex.regMobile.exec(objValue) ? true: false;
        },
        // 是否为正确电话号码
        isTel: function(objValue) {
            return Regex.regTel.exec(objValue) ? true: false;
        },
        // 是否为时分
        isMinutesSecond: function(objValue) {
            return Regex.regMS.test(objValue) ? true: false;
        },
        // 是否为日期
        isValidDate: function(iY, iM, iD) {
            var a = new Date(iY, iM - 1, iD);
            var y = a.getFullYear();
            var m = a.getMonth() + 1;
            var d = a.getDate();
            return (y != iY || m != iM || d != iD) ? false: true;
        },
        //身份证验证
        isChinaIDCard: function(StrNo) {
            if (StrNo.length == 18) {
                var a, b, c
                if (!isInteger(StrNo.substr(0, 17))) {
                    return false
                }
                a = parseInt(StrNo.substr(0, 1)) * 7 + parseInt(StrNo.substr(1, 1)) * 9 + parseInt(StrNo.substr(2, 1)) * 10;
                a = a + parseInt(StrNo.substr(3, 1)) * 5 + parseInt(StrNo.substr(4, 1)) * 8 + parseInt(StrNo.substr(5, 1)) * 4;
                a = a + parseInt(StrNo.substr(6, 1)) * 2 + parseInt(StrNo.substr(7, 1)) * 1 + parseInt(StrNo.substr(8, 1)) * 6;
                a = a + parseInt(StrNo.substr(9, 1)) * 3 + parseInt(StrNo.substr(10, 1)) * 7 + parseInt(StrNo.substr(11, 1)) * 9;
                a = a + parseInt(StrNo.substr(12, 1)) * 10 + parseInt(StrNo.substr(13, 1)) * 5 + parseInt(StrNo.substr(14, 1)) * 8;
                a = a + parseInt(StrNo.substr(15, 1)) * 4 + parseInt(StrNo.substr(16, 1)) * 2;
                b = a % 11;

                if (b == 2) //最后一位为校验位
                {
                    c = StrNo.substr(17, 1).toUpperCase(); //转为大写X
                } else {
                    c = parseInt(StrNo.substr(17, 1));
                }

                switch (b) {
                    case 0:
                        if (c != 1) {
                            //alert("身份证好号码校验位错:最后一位应该为:1");
                            return false;
                        }
                        break;
                    case 1:
                        if (c !== 0) {
                            //alert("身份证好号码校验位错:最后一位应该为:0");
                            return false;
                        }
                        break;
                    case 2:
                        if (c != "X") {
                            //alert("身份证好号码校验位错:最后一位应该为:X");
                            return false;
                        }
                        break;
                    case 3:
                        if (c != 9) { //alert("身份证好号码校验位错:最后一位应该为:9");
                            return false;
                        }
                        break;
                    case 4:
                        if (c != 8) { //alert("身份证好号码校验位错:最后一位应该为:8");
                            return false;
                        }
                        break;
                    case 5:
                        if (c != 7) { //alert("身份证好号码校验位错:最后一位应该为:7");
                            return false;
                        }
                        break;
                    case 6:
                        if (c != 6) { //alert("身份证好号码校验位错:最后一位应该为:6");
                            return false;
                        }
                        break;
                    case 7:
                        if (c != 5) { //alert("身份证好号码校验位错:最后一位应该为:5");
                            return false;
                        }
                        break;
                    case 8:
                        if (c != 4) { //alert("身份证好号码校验位错:最后一位应该为:4");
                            return false;
                        }
                        break;
                    case 9:
                        if (c != 3) { //alert("身份证好号码校验位错:最后一位应该为:3");
                            return false;
                        }
                        break;
                    case 10:
                        if (c != 2) { //alert("身份证好号码校验位错:最后一位应该为:2");
                            return false;
                        }
                        break;
                }
            } else {   //15位身份证号
                if (!isInteger(StrNo)) { //alert("身份证号码错误,前15位不能含有英文字母！");
                    return false;
                }
            }
            switch (StrNo.length) {
                case 15:
                    if (this.isValidDate("19" + StrNo.substr(6, 2), StrNo.substr(8, 2), StrNo.substr(10, 2))) {
                        return true;
                    } else {
                        return false;
                    }
                case 18:
                    if (this.isValidDate(StrNo.substr(6, 4), StrNo.substr(10, 2), StrNo.substr(12, 2))) {
                        return true;
                    } else {
                        return false;
                    }
            }
            //alert("输入的身份证号码必须为15位或者18位！");
            return false;
        },
        /**
         * 用时间戳来验证时间(开始和结束时间)(不含有时分秒)
         * @param startTime,endTime
         */
        isValidTime: function(startTime, endTime, pattern) {
            pattern = pattern || '-';
            var startstrs = startTime.split(pattern);
            var startyear = startstrs[0];
            var startmonth = startstrs[1];
            var startday = startstrs[2];
            var startDate = new Date(startyear, startmonth, startday);
            var starttime = startDate.getTime() / 1000;

            var endstrs = endTime.split("-");
            var endyear = endstrs[0];
            var endmonth = endstrs[1];
            var endday = endstrs[2];
            var endDate = new Date(endyear, endmonth, endday);
            var endtime = endDate.getTime() / 1000;

            return starttime >= endtime ? false: true;
        },

        /**
         * 用时间戳来验证时间(开始和结束时间)(含有时分秒)
         * @param startTime,startHour,startM,startS,endTime,endH,endM,endS
         */
        isValidDateTMS: function(startTime, startH, startM, startS, endTime, endH, endM, endS) {
            var startstrs = startTime.split("-");
            var startyear = startstrs[0];
            var startmonth = startstrs[1];
            var startday = startstrs[2];
            var startDate = new Date(startyear, startmonth, startday, startH, startM, startS);
            var starttime = startDate.getTime() / 1000;

            var endstrs = endTime.split("-");
            var endyear = endstrs[0];
            var endmonth = endstrs[1];
            var endday = endstrs[2];
            var endDate = new Date(endyear, endmonth, endday, endH, endM, endS);
            var endtime = endDate.getTime() / 1000;

            return starttime >= endtime ? false: true;
        },

        //是否为数字
        isDigit : function (objValue){
            return Regex.regNum.exec(objValue) ? true:false;
        },
        //是否为正确Href
        isHref : function(objValue){
            return Regex.regUrl.exec(objValue) ? true:false;
        },
        //是否为正确IP
        isIp : function(objValue){
            return Regex.regIp.test(objValue) ? true:false;
        },
        //是否为整数
        isInteger : function (pattern, objValue){
            return pattern.test(objValue)?true:false;
        }

    };

    return validate;
}());
