/**
 *
 * @authors liwb (you@example.org)
 * @date    2015/12/25 10:34
 * @version $ IIFE
 */

/* name module */

;(function(global, factory){
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.Zero = factory();
}(this, function() {
    'use strict';

    var Zero = {},
        win = window,
        doc = win.document,
        hasOwnProperty = Object.prototype.hasOwnProperty;

    Zero.version = '0.0.1';

    // 选择某个对象最为新对象的原型
    if(typeof Object.beget !== 'function') {
        Object.create = function(o) {
            var F = function() {};
            F.prototype = o;
            return new F();
        }
    }

	Object.extend = function(destination, source) {
		for (var property in source) {
			if(source.hasOwnProperty(property)) {
				destination[property] = source[property];
			}
		}

		return destination;
	}
	
    /**
     * Check whether the object has the property.
     *
     * @param {Object} obj
     * @param {String} key
     * @return {Boolean}
     */

    function hasOwn(obj, key) {
        return hasOwnProperty.call(obj, key);
    }


    function isArray(arr) {
        if (Object.prototype.toString.apply(arr) === '[object Array]') return true;
        else return false;
    }

    //增加标签元素的addClass
    Zero.Dom.addClass = function(node,str){
        if(!new RegExp("(^|\\s+)"+str).test(node.className)){
            node.className = node.className + " " + str;
        }
    }

    //去掉标签元素的removeClass
    Zero.Dom.removeClass = function(node,str){
        node.className = node.className.replace(new RegExp("(^|\\s+)"+str),"");
    }

    /*
     * 有关正则表达式
     *
     */
    Zero.Regex = {
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
        //汉字
        regChineseWord: /^[u4E00-u9FA5]$/,
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
    }

    /*
     * 有关Validate操作
     *
     * obj 对象， objValue 值，
     */

    Zero.Validate = {
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
        //是否为空
        isEmpty: function(objValue) {
            return (objValue == null || this.trim(objValue) == "");
        },
        //是否为浮点数（也可以是整数）
        isFloat: function(pattern, objValue) {
            return pattern.test(objValue) ? true: false;
        },
        //布尔类型
        isBoolean: function(objValue) {
            return typeof objValue == "boolean";
        },
        //函数
        isFunction: function(objValue) {
            return typeof objValue == "function";
        },
        //存在
        isNull: function(objValue) {
            return objValue == null;
        },
        //是否没定义
        isUndefined: function(objValue) {
            return typeof objValue == "undefined";
        },
        //数组
        isArray: function(objValue) {
            return objValue instanceof Array;
        },
        //是否为汉字
        isChineseWord: function(objValue) {
            return objValue.match(Zero.Regex.regChineseWord) ? true: false;
        },
        //是否为正确邮编
        isPostalCode: function(objValue) {
            return Zero.Regex.regPostalCode.test(objValue) ? true: false;
        },
        //是否为正确手机号
        isMobile: function(objValue) {
            return Zero.Regex.regMobile.exec(objValue) ? true: false;
        },
        // 是否为正确电话号码
        isTel: function(objValue) {
            return Zero.Regex.regTel.exec(objValue) ? true: false;
        },
        // 是否为时分
        isMinutesSecond: function(objValue) {
            return Zero.Regex.regMS.test(objValue) ? true: false;
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
                        if (c != 0) {
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
                            return false
                        }
                }
            } else {   //15位身份证号
                if (!isInteger(StrNo)) { //alert("身份证号码错误,前15位不能含有英文字母！");
                    return false
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
            return false
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

        /**
         * 是否相等
         */
        isEqual: function(prev, next) {
            return prev == next ? true: false;
        },

        //是否为数字
        isDigit : function (objValue){
            return Zero.Regex.regNum.exec(objValue) ? true:false;
        },
        //是否为正确Href
        isHref : function(objValue){
            return Zero.Regex.regUrl.exec(objValue) ? true:false;
        },
        //是否为正确IP
        isIp : function(objValue){
            return Zero.Regex.regIp.test(objValue) ? true:false;
        },
        //是否为整数
        isInteger : function (pattern, objValue){
            return pattern.test(objValue)?true:false;
        }

    }

    /*
     * 有关浏览器操作
     */
    Zero.Browser = {
        //获取浏览器类型与版本信息
        getBrowserVersion: function(customUa) {
            var UNKNOW = 'unknow';
            var ua = customUa || navigator.userAgent.toLowerCase();
            if (!ua) return {
                type: UNKNOW,
                version: UNKNOW
            }
            var type = UNKNOW,
                version = UNKNOW,
                v;
            var check = function(regex) {
                return regex.test(ua);
            };
            //IE
            if (check(/msie/) && !check(/opera/)) {
                type = 'ie';
                v = /msie[\/|\s]*([\d+?\.?]+)/.exec(ua);
            }
            //firefox
            else if ((!check(/webkit/) && check(/gecko/) && check(/firefox/)) && !check(/opera/)) {
                type = 'firefox';
                v = /firefox[\/|\s]*([\d+?\.?]+)/.exec(ua);
            }
            //chrome
            else if (check(/\bchrome\b/)) {
                type = 'chrome';
                v = /chrome[\/|\s]*([\d+?\.?]+)/.exec(ua);
            }
            //safari (!check(/\bchrome\b/) is ensure by non-chrome above)
            else if (check(/applewebkit/) && check(/safari/)) {
                type = 'safari';
                v = /version[\/|\s]*([\d+?\.?]+)/.exec(ua);
            } else if (check(/opera/)) {
                type = 'opera';
                v = /version[\/|\s]*([\d+?.?]+)/.exec(ua) || /opera[\/|\s]*([\d+?.?]+)/.exec(ua);
            }
            return {
                type: type,
                version: version = (v && v[1]) ? v[1] : UNKNOW
            };
        }
    }

    Zero.each = function (obj, callback) {

        if (typeof obj !== 'object') return;
        if (!callback) return;
        var i, prop;
        if (isArray(obj)) {
            // Array
            for (i = 0; i < obj.length; i++) {
                callback(i, obj[i]);
            }
        }
        else {
            // Object
            for (prop in obj) {
                if (hasOwn(obj, prop)) {
                    callback(prop, obj[prop]);
                }
            }
        }
    }

    // return {key: value, key: value}
    Zero.parseUrlQuery = function (url) {
        var query = {}, i, params, param;
        if (url.indexOf('?') >= 0) url = url.split('?')[1];
        else return query;
        params = url.split('&');
        for (i = 0; i < params.length; i++) {
            param = params[i].split('=');
            query[param[0]] = param[1];
        }
        return query;
    }

    Zero.serializeObject = function (obj) {
        if (typeof obj === 'string') return obj;
        var resultArray = [];
        var separator = '&';
        for (var prop in obj) {
            if (isArray(obj[prop])) {
                var toPush = [];
                for (var i = 0; i < obj[prop].length; i ++) {
                    toPush.push(prop + '=' + obj[prop][i]);
                }
                resultArray.push(toPush.join(separator));
            }
            else {
                // Should be string
                resultArray.push(prop + '=' + obj[prop]);
            }
        }

        return resultArray.join(separator);
    }

    Zero.getDataByAjax = function(options) {
        var defaults = {
            method: 'GET',
            data: false,
            async: true,
            cache: true,
            user: '',
            password: '',
            headers: {},
            xhrFields: {},
            statusCode: {},
            processData: true,
            dataType: 'text',
            contentType: 'application/x-www-form-urlencoded',
            timeout: 0 // 0s JSONp timeout
        };

        // For jquery
        if (options.type) options.method = options.type;

        // Merge options and defaults
        for (var prop in defaults) {
            if (!(prop in options)) options[prop] = defaults[prop];
        }

        var _url = options.url || win.location.toString(),
            _method = options.method ? options.method.toUpperCase() : 'GET';

        options.data = options.data || null;
        options.processData = options.processData || true;
        options.cache = options.cache || false;
        options.dataType = options.dataType || 'json';
        options.contentType = options.contentType || 'text/plain;charset=UTF-8';
        options.async = options.async || true;  // true 默认异步

        // Parameters Prefix
        var paramsPrefix = _url.indexOf('?') >= 0 ? '&' : '?';

        // Cache for GET/HEAD  缓存
        if (_method === 'GET' || _method === 'HEAD') {
            if (options.cache === false) {
                _url += (paramsPrefix + '_nocache=' + Date.now());
            }
        }

        // Data to modify GET URL
        if ((_method === 'GET' || _method === 'HEAD') && options.data) {
            var stringData;
            if (typeof options.data === 'string') {
                // Should be key=value string
                if (options.data.indexOf('?') >= 0) stringData = options.data.split('?')[1];
                else stringData = options.data;
            }
            else {
                // Should be key=value object
                stringData = Dom.serializeObject(options.data);
            }
            _url += paramsPrefix + stringData;
        }

        // JSONP
        if (options.dataType === 'json' && options.url.indexOf('callback=') >= 0) {

            var callbackName = 'jsonp_' + Date.now() + (_jsonpRequests++);
            var requestURL, abortTimeout;
            var callbackSplit = options.url.split('callback=');
            if (callbackSplit[1].indexOf('&') >= 0) {
                var addVars = callbackSplit[1].split('&').filter(function (el) { return el.indexOf('=') > 0; }).join('&');
                requestURL = callbackSplit[0] + 'callback=' + callbackName + (addVars.length > 0 ? '&' + addVars : '');
            }
            else {
                requestURL = callbackSplit[0] + 'callback=' + callbackName;
            }

            // Create script
            var script = doc.createElement('script');
            script.type = 'text/javascript';
            script.onerror = function() {
                clearTimeout(abortTimeout);
                if (options.error) options.error();
            };
            script.src = requestURL;

            // Handler
            win[callbackName] = function (data) {
                clearTimeout(abortTimeout);
                if (options.success) options.success(data);
                script.parentNode.removeChild(script);
                script = null;
                delete win[callbackName];
            };
            doc.querySelector('head').appendChild(script);

            if (options.timeout > 0) {
                abortTimeout = setTimeout(function () {
                    script.parentNode.removeChild(script);
                    script = null;
                    if (options.error) options.error();
                }, options.timeout);
            }

            return;
        }


        // xhr对象
        var xhr = new XMLHttpRequest();

        // onreadystatechange
        xhr.onreadystatechange = function() {
            var response = null,
                httpStatus = null;
            if (xhr.readyState === 4) {
                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) { // 请求状态  http状态
                    httpStatus = xhr.status;
                    if(options.dataType === 'json') {
                        response = JSON.parse(xhr.responseText);
                    } else if(options.dataType === 'text') {
                        response = xhr.responseText;
                    } else {
                        response = xhr.responseXML;
                    }
                    options.success(response, httpStatus);
                }else if(xhr.readyState === 4 && xhr.status != 200){
                    httpStatus = xhr.status;
                    if(options.dataType === 'json') {
                        response = JSON.parse(xhr.responseText);
                    } else if(options.dataType === 'text') {
                        response = xhr.responseText;
                    } else {
                        response = xhr.responseXML;
                    }

                    if(options.error) {
                        options.error(response, httpStatus);
                    }

                }
            }

        }

        // Open XHR
        xhr.open(_method, _url, options.async, options.user, options.password);

        // headers
        if (options.headers) {
            Dom.each(options.headers, function (headerName, headerCallback) {
                xhr.setRequestHeader(headerName, headerCallback);
            });
        } else {
            xhr.setRequestHeader("Content-Type", options.contentType);
        }

        // Create POST Data
        var postData = null;

        if ((_method === 'POST' || _method === 'PUT') && options.data) {
            if (options.processData) {
                var postDataInstances = [ArrayBuffer, Blob, Document, FormData];
                // Post Data
                if (postDataInstances.indexOf(options.data.constructor) !== -1) {
                    postData = options.data;
                }
                else {
                    // POST Headers
                    var boundary = '---------------------------' + Date.now().toString(16);

                    if (options.contentType === 'multipart\/form-data') {
                        xhr.setRequestHeader('Content-Type', 'multipart\/form-data; boundary=' + boundary);
                    }
                    else {
                        xhr.setRequestHeader('Content-Type', options.contentType);
                    }
                    postData = '';
                    var _data = Dom.serializeObject(options.data);
                    if (options.contentType === 'multipart\/form-data') {
                        boundary = '---------------------------' + Date.now().toString(16);
                        _data = _data.split('&');
                        var _newData = [];
                        for (var i = 0; i < _data.length; i++) {
                            _newData.push('Content-Disposition: form-data; name="' + _data[i].split('=')[0] + '"\r\n\r\n' + _data[i].split('=')[1] + '\r\n');
                        }
                        postData = '--' + boundary + '\r\n' + _newData.join('--' + boundary + '\r\n') + '--' + boundary + '--\r\n';
                    }
                    else {
                        postData = options.contentType === 'application/x-www-form-urlencoded' ? _data : _data.replace(/&/g, '\r\n');
                    }
                }
            }
            else {
                postData = options.data;
            }

        }

        xhr.send(postData);

    }


    return Dom;
}));

