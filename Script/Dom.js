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
    global.Dom = factory();
}(this, function() {
    'use strict';

    var Dom = {},
        win = window,
        doc = win.document,
        hasOwnProperty = Object.prototype.hasOwnProperty;

    Dom.version = '0.0.1';

    // 选择某个对象最为新对象的原型
    if(typeof Object.beget !== 'function') {
        Object.create = function(o) {
            var F = function() {};
            F.prototype = o;
            return new F();
        }
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

    Dom.each = function (obj, callback) {
        var that = this;
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
    Dom.parseUrlQuery = function (url) {
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

    Dom.serializeObject = function (obj) {
        var that = this;
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

    Dom.getDataByAjax = function(options) {
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

        var _url = options.url || window.location.toString(),
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
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.onerror = function() {
                clearTimeout(abortTimeout);
                if (options.error) options.error();
            };
            script.src = requestURL;

            // Handler
            window[callbackName] = function (data) {
                clearTimeout(abortTimeout);
                if (options.success) options.success(data);
                script.parentNode.removeChild(script);
                script = null;
                delete window[callbackName];
            };
            document.querySelector('head').appendChild(script);

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

