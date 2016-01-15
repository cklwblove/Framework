/*======================================================
 ************   client -> device or browser   ************
 ======================================================*/

var client = (function () {
    var ua = navigator.userAgent;
    var ua_lower = ua.toLowerCase();
    var check = function(regex) {
        return regex.test(ua_lower);
    };
    var device = {
        //版本号
        ver: 'unknow'
    };
    var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
    var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
    var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
    var iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);

    device.ios = device.android = device.iphone = device.ipad = device.androidChrome = false;

    // Android
    if (android) {
        device.os = 'android';
        device.ver = android[2];
        device.android = true;
        device.androidChrome = ua.toLowerCase().indexOf('chrome') >= 0;
    }
    if (ipad || iphone || ipod) {
        device.os = 'ios';
        device.ios = true;
    }
    // iOS
    if (iphone && !ipod) {
        device.ver = iphone[2].replace(/_/g, '.');
        device.iphone = true;
    }
    if (ipad) {
        device.ver = ipad[2].replace(/_/g, '.');
        device.ipad = true;
    }
    if (ipod) {
        device.ver = ipod[3] ? ipod[3].replace(/_/g, '.') : null;
        device.iphone = true;
    }
    // iOS 8+ changed UA
    if (device.ios && device.ver && ua.indexOf('Version/') >= 0) {
        if (device.ver.split('.')[0] === '10') {
            device.ver = ua.toLowerCase().split('version/')[1].split(' ')[0];
        }
    }

    // Webview
    device.webView = (iphone || ipad || ipod) && ua.match(/.*AppleWebKit(?!.*Safari)/i);

    var browser = {
        ie: false,
        firefox: false,
        chrome: false,
        safari: false,
        opera: false,
        //版本号
        ver: 'unknow'
    };
    //browser
    //IE
    if (check(/msie/) && !check(/opera/)) {
        browser.ie = true;
        browser.ver = /msie[\/|\s]*([\d+?\.?]+)/.exec(ua_lower);
    }
    //firefox
    else if ((!check(/webkit/) && check(/gecko/) && check(/firefox/)) && !check(/opera/)) {
        browser.firefox = true;
        browser.ver = /firefox[\/|\s]*([\d+?\.?]+)/.exec(ua_lower);
    }
    //chrome
    else if (check(/\bchrome\b/)) {
        browser.chrome = true;
        browser.ver = /chrome[\/|\s]*([\d+?\.?]+)/.exec(ua_lower);
    }
    //safari (!check(/\bchrome\b/) is ensure by non-chrome abodevice.engineVe)
    else if (check(/applewebkit/) && check(/safari/)) {
        browser.safari = true;
        browser.ver = /version[\/|\s]*([\d+?\.?]+)/.exec(ua_lower);
    } else if (check(/opera/)) {
        browser.opera = true;
        browser.ver = /version[\/|\s]*([\d+?.?]+)/.exec(ua_lower) || /opera[\/|\s]*([\d+?.?]+)/.exec(ua);
    }

    browser.ver = (browser.ver && browser.ver[1]) ? browser.ver[1] : 'unknow';

    // Export object
    return {
        device: device,
        browser: browser

    };
})();