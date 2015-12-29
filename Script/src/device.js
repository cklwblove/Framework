/*======================================================
 ************   device or browser   ************
 ======================================================*/

zero.device = (function () {
    var device = {};
    var ua = navigator.userAgent;

    var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
    var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
    var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
    var iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);

    device.ios = device.android = device.iphone = device.ipad = device.androidChrome = false;

    // Android
    if (android) {
        device.os = 'android';
        device.osVersion = android[2];
        device.android = true;
        device.androidChrome = ua.toLowerCase().indexOf('chrome') >= 0;
    }
    if (ipad || iphone || ipod) {
        device.os = 'ios';
        device.ios = true;
    }
    // iOS
    if (iphone && !ipod) {
        device.osVersion = iphone[2].replace(/_/g, '.');
        device.iphone = true;
    }
    if (ipad) {
        device.osVersion = ipad[2].replace(/_/g, '.');
        device.ipad = true;
    }
    if (ipod) {
        device.osVersion = ipod[3] ? ipod[3].replace(/_/g, '.') : null;
        device.iphone = true;
    }
    // iOS 8+ changed UA
    if (device.ios && device.osVersion && ua.indexOf('Version/') >= 0) {
        if (device.osVersion.split('.')[0] === '10') {
            device.osVersion = ua.toLowerCase().split('version/')[1].split(' ')[0];
        }
    }

    // Webview
    device.webView = (iphone || ipad || ipod) && ua.match(/.*AppleWebKit(?!.*Safari)/i);

    //browser
    device.browser = function() {
        ua = ua.toLowerCase();
        var type = 'UNKNOW',
            version = 'UNKNOW',
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
            version: version = (v && v[1]) ? v[1] : 'UNKNOW'
        };

    };
    // Export object
    return device;
})();