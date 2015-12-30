(function(global, factory){
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.zero = factory();
}(this, function() {
    'use strict';
    
    var zero = {},
        win = window,
        doc = win.document,
        hasOwnProperty = Object.prototype.hasOwnProperty;
    
    zero.version = '0.0.1';
    // Default Parameters
    zero.params = {
        // Modals
        modalButtonOk: 'OK',
        modalButtonCancel: 'Cancel',
        modalTitle: 'Framework7',
        modalCloseByOutside: false,
        actionsCloseByOutside: true,
        popupCloseByOutside: true,
        modalStack: true,
    
    }

    /*======================================================
     ************   Dom   ************
     ======================================================*/
    
    var Dom = (function() {
        var Dom = function (arr) {
            var _this = this, i = 0;
            // Create array-like object
            for (i = 0; i < arr.length; i++) {
                _this[i] = arr[i];
            }
            _this.length = arr.length;
            // Return collection with methods
            return this;
        };
        var $ = function (selector, context) {
            var arr = [], i = 0;
            if (selector && !context) {
                if (selector instanceof Dom) {
                    return selector;
                }
            }
            if (selector) {
                // String
                if (typeof selector === 'string') {
                    var els, tempParent, html = selector.trim();
                    if (html.indexOf('<') >= 0 && html.indexOf('>') >= 0) {
                        var toCreate = 'div';
                        if (html.indexOf('<li') === 0) toCreate = 'ul';
                        if (html.indexOf('<tr') === 0) toCreate = 'tbody';
                        if (html.indexOf('<td') === 0 || html.indexOf('<th') === 0) toCreate = 'tr';
                        if (html.indexOf('<tbody') === 0) toCreate = 'table';
                        if (html.indexOf('<option') === 0) toCreate = 'select';
                        tempParent = doc.createElement(toCreate);
                        tempParent.innerHTML = selector;
                        for (i = 0; i < tempParent.childNodes.length; i++) {
                            arr.push(tempParent.childNodes[i]);
                        }
                    }
                    else {
                        if (!context && selector[0] === '#' && !selector.match(/[ .<>:~]/)) {
                            // Pure ID selector
                            els = [doc.getElementById(selector.split('#')[1])];
                        }
                        else {
                            // Other selectors
                            els = (context || doc).querySelectorAll(selector);
                        }
                        for (i = 0; i < els.length; i++) {
                            if (els[i]) arr.push(els[i]);
                        }
                    }
                }
                // Node/element
                else if (selector.nodeType || selector === win || selector === doc) {
                    arr.push(selector);
                }
                //Array of elements or instance of Dom
                else if (selector.length > 0 && selector[0].nodeType) {
                    for (i = 0; i < selector.length; i++) {
                        arr.push(selector[i]);
                    }
                }
            }
            return new Dom(arr);
        };
    
        Dom.prototype = {
            // Classes and attriutes
            addClass: function (className) {
                if (typeof className === 'undefined') {
                    return this;
                }
                var classes = className.split(' ');
                for (var i = 0; i < classes.length; i++) {
                    for (var j = 0; j < this.length; j++) {
                        if (typeof this[j].classList !== 'undefined') this[j].classList.add(classes[i]);
                    }
                }
                return this;
            },
            removeClass: function (className) {
                var classes = className.split(' ');
                for (var i = 0; i < classes.length; i++) {
                    for (var j = 0; j < this.length; j++) {
                        if (typeof this[j].classList !== 'undefined') this[j].classList.remove(classes[i]);
                    }
                }
                return this;
            },
            hasClass: function (className) {
                if (!this[0]) return false;
                else return this[0].classList.contains(className);
            },
            toggleClass: function (className) {
                var classes = className.split(' ');
                for (var i = 0; i < classes.length; i++) {
                    for (var j = 0; j < this.length; j++) {
                        if (typeof this[j].classList !== 'undefined') this[j].classList.toggle(classes[i]);
                    }
                }
                return this;
            },
            attr: function (attrs, value) {
                if (arguments.length === 1 && typeof attrs === 'string') {
                    // Get attr
                    if (this[0]) return this[0].getAttribute(attrs);
                    else return undefined;
                }
                else {
                    // Set attrs
                    for (var i = 0; i < this.length; i++) {
                        if (arguments.length === 2) {
                            // String
                            this[i].setAttribute(attrs, value);
                        }
                        else {
                            // Object
                            for (var attrName in attrs) {
                                this[i][attrName] = attrs[attrName];
                                this[i].setAttribute(attrName, attrs[attrName]);
                            }
                        }
                    }
                    return this;
                }
            },
            removeAttr: function (attr) {
                for (var i = 0; i < this.length; i++) {
                    this[i].removeAttribute(attr);
                }
                return this;
            },
            prop: function (props, value) {
                if (arguments.length === 1 && typeof props === 'string') {
                    // Get prop
                    if (this[0]) return this[0][props];
                    else return undefined;
                }
                else {
                    // Set props
                    for (var i = 0; i < this.length; i++) {
                        if (arguments.length === 2) {
                            // String
                            this[i][props] = value;
                        }
                        else {
                            // Object
                            for (var propName in props) {
                                this[i][propName] = props[propName];
                            }
                        }
                    }
                    return this;
                }
            },
            data: function (key, value) {
                if (typeof value === 'undefined') {
                    // Get value
                    if (this[0]) {
                        if (this[0].dom7ElementDataStorage && (key in this[0].dom7ElementDataStorage)) {
                            return this[0].dom7ElementDataStorage[key];
                        }
                        else {
                            var dataKey = this[0].getAttribute('data-' + key);
                            if (dataKey) {
                                return dataKey;
                            }
                            else return undefined;
                        }
                    }
                    else return undefined;
                }
                else {
                    // Set value
                    for (var i = 0; i < this.length; i++) {
                        var el = this[i];
                        if (!el.dom7ElementDataStorage) el.dom7ElementDataStorage = {};
                        el.dom7ElementDataStorage[key] = value;
                    }
                    return this;
                }
            },
            removeData: function(key) {
                for (var i = 0; i < this.length; i++) {
                    var el = this[i];
                    if (el.dom7ElementDataStorage && el.dom7ElementDataStorage[key]) {
                        el.dom7ElementDataStorage[key] = null;
                        delete el.dom7ElementDataStorage[key];
                    }
                }
            },
            dataset: function () {
                var el = this[0];
                if (el) {
                    var dataset = {};
                    if (el.dataset) {
                        for (var dataKey in el.dataset) {
                            dataset[dataKey] = el.dataset[dataKey];
                        }
                    }
                    else {
                        for (var i = 0; i < el.attributes.length; i++) {
                            var attr = el.attributes[i];
                            if (attr.name.indexOf('data-') >= 0) {
                                dataset[$.toCamelCase(attr.name.split('data-')[1])] = attr.value;
                            }
                        }
                    }
                    for (var key in dataset) {
                        if (dataset[key] === 'false') dataset[key] = false;
                        else if (dataset[key] === 'true') dataset[key] = true;
                        else if (parseFloat(dataset[key]) === dataset[key] * 1) dataset[key] = dataset[key] * 1;
                    }
                    return dataset;
                }
                else return undefined;
            },
            val: function (value) {
                if (typeof value === 'undefined') {
                    if (this[0]) return this[0].value;
                    else return undefined;
                }
                else {
                    for (var i = 0; i < this.length; i++) {
                        this[i].value = value;
                    }
                    return this;
                }
            },
            // Transforms
            transform : function (transform) {
                for (var i = 0; i < this.length; i++) {
                    var elStyle = this[i].style;
                    elStyle.webkitTransform = elStyle.MsTransform = elStyle.msTransform = elStyle.MozTransform = elStyle.OTransform = elStyle.transform = transform;
                }
                return this;
            },
            transition: function (duration) {
                if (typeof duration !== 'string') {
                    duration = duration + 'ms';
                }
                for (var i = 0; i < this.length; i++) {
                    var elStyle = this[i].style;
                    elStyle.webkitTransitionDuration = elStyle.MsTransitionDuration = elStyle.msTransitionDuration = elStyle.MozTransitionDuration = elStyle.OTransitionDuration = elStyle.transitionDuration = duration;
                }
                return this;
            },
            //Events
            on: function (eventName, targetSelector, listener, capture) {
                function handleLiveEvent(e) {
                    var target = e.target;
                    if ($(target).is(targetSelector)) listener.call(target, e);
                    else {
                        var parents = $(target).parents();
                        for (var k = 0; k < parents.length; k++) {
                            if ($(parents[k]).is(targetSelector)) listener.call(parents[k], e);
                        }
                    }
                }
                var events = eventName.split(' ');
                var i, j;
                for (i = 0; i < this.length; i++) {
                    if (typeof targetSelector === 'function' || targetSelector === false) {
                        // Usual events
                        if (typeof targetSelector === 'function') {
                            listener = arguments[1];
                            capture = arguments[2] || false;
                        }
                        for (j = 0; j < events.length; j++) {
                            this[i].addEventListener(events[j], listener, capture);
                        }
                    }
                    else {
                        //Live events
                        for (j = 0; j < events.length; j++) {
                            if (!this[i].dom7LiveListeners) this[i].dom7LiveListeners = [];
                            this[i].dom7LiveListeners.push({listener: listener, liveListener: handleLiveEvent});
                            this[i].addEventListener(events[j], handleLiveEvent, capture);
                        }
                    }
                }
    
                return this;
            },
            off: function (eventName, targetSelector, listener, capture) {
                var events = eventName.split(' ');
                for (var i = 0; i < events.length; i++) {
                    for (var j = 0; j < this.length; j++) {
                        if (typeof targetSelector === 'function' || targetSelector === false) {
                            // Usual events
                            if (typeof targetSelector === 'function') {
                                listener = arguments[1];
                                capture = arguments[2] || false;
                            }
                            this[j].removeEventListener(events[i], listener, capture);
                        }
                        else {
                            // Live event
                            if (this[j].dom7LiveListeners) {
                                for (var k = 0; k < this[j].dom7LiveListeners.length; k++) {
                                    if (this[j].dom7LiveListeners[k].listener === listener) {
                                        this[j].removeEventListener(events[i], this[j].dom7LiveListeners[k].liveListener, capture);
                                    }
                                }
                            }
                        }
                    }
                }
                return this;
            },
            once: function (eventName, targetSelector, listener, capture) {
                var dom = this;
                if (typeof targetSelector === 'function') {
                    listener = arguments[1];
                    capture = arguments[2];
                    targetSelector = false;
                }
                function proxy(e) {
                    listener.call(e.target, e);
                    dom.off(eventName, targetSelector, proxy, capture);
                }
                return dom.on(eventName, targetSelector, proxy, capture);
            },
            trigger: function (eventName, eventData) {
                var events = eventName.split(' ');
                for (var i = 0; i < events.length; i++) {
                    for (var j = 0; j < this.length; j++) {
                        var evt;
                        try {
                            evt = new CustomEvent(events[i], {detail: eventData, bubbles: true, cancelable: true});
                        }
                        catch (e) {
                            evt = doc.createEvent('Event');
                            evt.initEvent(events[i], true, true);
                            evt.detail = eventData;
                        }
                        this[j].dispatchEvent(evt);
                    }
                }
                return this;
            },
            transitionEnd: function (callback) {
                var events = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'],
                    i, j, dom = this;
                function fireCallBack(e) {
                    /*jshint validthis:true */
                    if (e.target !== this) return;
                    callback.call(this, e);
                    for (i = 0; i < events.length; i++) {
                        dom.off(events[i], fireCallBack);
                    }
                }
                if (callback) {
                    for (i = 0; i < events.length; i++) {
                        dom.on(events[i], fireCallBack);
                    }
                }
                return this;
            },
            animationEnd: function (callback) {
                var events = ['webkitAnimationEnd', 'OAnimationEnd', 'MSAnimationEnd', 'animationend'],
                    i, j, dom = this;
                function fireCallBack(e) {
                    callback(e);
                    for (i = 0; i < events.length; i++) {
                        dom.off(events[i], fireCallBack);
                    }
                }
                if (callback) {
                    for (i = 0; i < events.length; i++) {
                        dom.on(events[i], fireCallBack);
                    }
                }
                return this;
            },
            // Sizing/Styles
            width: function () {
                if (this[0] === win) {
                    return win.innerWidth;
                }
                else {
                    if (this.length > 0) {
                        return parseFloat(this.css('width'));
                    }
                    else {
                        return null;
                    }
                }
            },
            outerWidth: function (includeMargins) {
                if (this.length > 0) {
                    if (includeMargins) {
                        var styles = this.styles();
                        return this[0].offsetWidth + parseFloat(styles.getPropertyValue('margin-right')) + parseFloat(styles.getPropertyValue('margin-left'));
                    }
                    else
                        return this[0].offsetWidth;
                }
                else return null;
            },
            height: function () {
                if (this[0] === win) {
                    return win.innerHeight;
                }
                else {
                    if (this.length > 0) {
                        return parseFloat(this.css('height'));
                    }
                    else {
                        return null;
                    }
                }
            },
            outerHeight: function (includeMargins) {
                if (this.length > 0) {
                    if (includeMargins) {
                        var styles = this.styles();
                        return this[0].offsetHeight + parseFloat(styles.getPropertyValue('margin-top')) + parseFloat(styles.getPropertyValue('margin-bottom'));
                    }
                    else
                        return this[0].offsetHeight;
                }
                else return null;
            },
            offset: function () {
                if (this.length > 0) {
                    var el = this[0];
                    var box = el.getBoundingClientRect();
                    var body = doc.body;
                    var clientTop  = el.clientTop  || body.clientTop  || 0;
                    var clientLeft = el.clientLeft || body.clientLeft || 0;
                    var scrollTop  = win.pageYOffset || el.scrollTop;
                    var scrollLeft = win.pageXOffset || el.scrollLeft;
                    return {
                        top: box.top  + scrollTop  - clientTop,
                        left: box.left + scrollLeft - clientLeft
                    };
                }
                else {
                    return null;
                }
            },
            hide: function () {
                for (var i = 0; i < this.length; i++) {
                    this[i].style.display = 'none';
                }
                return this;
            },
            show: function () {
                for (var i = 0; i < this.length; i++) {
                    this[i].style.display = 'block';
                }
                return this;
            },
            styles: function () {
                var i, styles;
                if (this[0]) return win.getComputedStyle(this[0], null);
                else return undefined;
            },
            css: function (props, value) {
                var i;
                if (arguments.length === 1) {
                    if (typeof props === 'string') {
                        if (this[0]) return win.getComputedStyle(this[0], null).getPropertyValue(props);
                    }
                    else {
                        for (i = 0; i < this.length; i++) {
                            for (var prop in props) {
                                this[i].style[prop] = props[prop];
                            }
                        }
                        return this;
                    }
                }
                if (arguments.length === 2 && typeof props === 'string') {
                    for (i = 0; i < this.length; i++) {
                        this[i].style[props] = value;
                    }
                    return this;
                }
                return this;
            },
    
            //Dom manipulation
            each: function (callback) {
                for (var i = 0; i < this.length; i++) {
                    callback.call(this[i], i, this[i]);
                }
                return this;
            },
            filter: function (callback) {
                var matchedItems = [];
                var dom = this;
                for (var i = 0; i < dom.length; i++) {
                    if (callback.call(dom[i], i, dom[i])) matchedItems.push(dom[i]);
                }
                return new Dom(matchedItems);
            },
            html: function (html) {
                if (typeof html === 'undefined') {
                    return this[0] ? this[0].innerHTML : undefined;
                }
                else {
                    for (var i = 0; i < this.length; i++) {
                        this[i].innerHTML = html;
                    }
                    return this;
                }
            },
            text: function (text) {
                if (typeof text === 'undefined') {
                    if (this[0]) {
                        return this[0].textContent.trim();
                    }
                    else return null;
                }
                else {
                    for (var i = 0; i < this.length; i++) {
                        this[i].textContent = text;
                    }
                }
            },
            is: function (selector) {
                if (!this[0] || typeof selector === 'undefined') return false;
                var compareWith, i;
                if (typeof selector === 'string') {
                    var el = this[0];
                    if (el === doc) return selector === doc;
                    if (el === win) return selector === win;
    
                    if (el.matches) return el.matches(selector);
                    else if (el.webkitMatchesSelector) return el.webkitMatchesSelector(selector);
                    else if (el.mozMatchesSelector) return el.mozMatchesSelector(selector);
                    else if (el.msMatchesSelector) return el.msMatchesSelector(selector);
                    else {
                        compareWith = $(selector);
                        for (i = 0; i < compareWith.length; i++) {
                            if (compareWith[i] === this[0]) return true;
                        }
                        return false;
                    }
                }
                else if (selector === doc) return this[0] === doc;
                else if (selector === win) return this[0] === win;
                else {
                    if (selector.nodeType || selector instanceof Dom) {
                        compareWith = selector.nodeType ? [selector] : selector;
                        for (i = 0; i < compareWith.length; i++) {
                            if (compareWith[i] === this[0]) return true;
                        }
                        return false;
                    }
                    return false;
                }
    
            },
            indexOf: function (el) {
                for (var i = 0; i < this.length; i++) {
                    if (this[i] === el) return i;
                }
            },
            index: function () {
                if (this[0]) {
                    var child = this[0];
                    var i = 0;
                    while ((child = child.previousSibling) !== null) {
                        if (child.nodeType === 1) i++;
                    }
                    return i;
                }
                else return undefined;
            },
            eq: function (index) {
                if (typeof index === 'undefined') return this;
                var length = this.length;
                var returnIndex;
                if (index > length - 1) {
                    return new Dom([]);
                }
                if (index < 0) {
                    returnIndex = length + index;
                    if (returnIndex < 0) return new Dom([]);
                    else return new Dom([this[returnIndex]]);
                }
                return new Dom([this[index]]);
            },
            append: function (newChild) {
                var i, j;
                for (i = 0; i < this.length; i++) {
                    if (typeof newChild === 'string') {
                        var tempDiv = doc.createElement('div');
                        tempDiv.innerHTML = newChild;
                        while (tempDiv.firstChild) {
                            this[i].appendChild(tempDiv.firstChild);
                        }
                    }
                    else if (newChild instanceof Dom) {
                        for (j = 0; j < newChild.length; j++) {
                            this[i].appendChild(newChild[j]);
                        }
                    }
                    else {
                        this[i].appendChild(newChild);
                    }
                }
                return this;
            },
            appendTo: function (parent) {
                $(parent).append(this);
                return this;
            },
            prepend: function (newChild) {
                var i, j;
                for (i = 0; i < this.length; i++) {
                    if (typeof newChild === 'string') {
                        var tempDiv = doc.createElement('div');
                        tempDiv.innerHTML = newChild;
                        for (j = tempDiv.childNodes.length - 1; j >= 0; j--) {
                            this[i].insertBefore(tempDiv.childNodes[j], this[i].childNodes[0]);
                        }
                        // this[i].insertAdjacentHTML('afterbegin', newChild);
                    }
                    else if (newChild instanceof Dom) {
                        for (j = 0; j < newChild.length; j++) {
                            this[i].insertBefore(newChild[j], this[i].childNodes[0]);
                        }
                    }
                    else {
                        this[i].insertBefore(newChild, this[i].childNodes[0]);
                    }
                }
                return this;
            },
            prependTo: function (parent) {
                $(parent).prepend(this);
                return this;
            },
            insertBefore: function (selector) {
                var before = $(selector);
                for (var i = 0; i < this.length; i++) {
                    if (before.length === 1) {
                        before[0].parentNode.insertBefore(this[i], before[0]);
                    }
                    else if (before.length > 1) {
                        for (var j = 0; j < before.length; j++) {
                            before[j].parentNode.insertBefore(this[i].cloneNode(true), before[j]);
                        }
                    }
                }
            },
            insertAfter: function (selector) {
                var after = $(selector);
                for (var i = 0; i < this.length; i++) {
                    if (after.length === 1) {
                        after[0].parentNode.insertBefore(this[i], after[0].nextSibling);
                    }
                    else if (after.length > 1) {
                        for (var j = 0; j < after.length; j++) {
                            after[j].parentNode.insertBefore(this[i].cloneNode(true), after[j].nextSibling);
                        }
                    }
                }
            },
            next: function (selector) {
                if (this.length > 0) {
                    if (selector) {
                        if (this[0].nextElementSibling && $(this[0].nextElementSibling).is(selector)) return new Dom([this[0].nextElementSibling]);
                        else return new Dom([]);
                    }
                    else {
                        if (this[0].nextElementSibling) return new Dom([this[0].nextElementSibling]);
                        else return new Dom([]);
                    }
                }
                else return new Dom([]);
            },
            nextAll: function (selector) {
                var nextEls = [];
                var el = this[0];
                if (!el) return new Dom([]);
                while (el.nextElementSibling) {
                    var next = el.nextElementSibling;
                    if (selector) {
                        if($(next).is(selector)) nextEls.push(next);
                    }
                    else nextEls.push(next);
                    el = next;
                }
                return new Dom(nextEls);
            },
            prev: function (selector) {
                if (this.length > 0) {
                    if (selector) {
                        if (this[0].previousElementSibling && $(this[0].previousElementSibling).is(selector)) return new Dom([this[0].previousElementSibling]);
                        else return new Dom([]);
                    }
                    else {
                        if (this[0].previousElementSibling) return new Dom([this[0].previousElementSibling]);
                        else return new Dom([]);
                    }
                }
                else return new Dom([]);
            },
            prevAll: function (selector) {
                var prevEls = [];
                var el = this[0];
                if (!el) return new Dom([]);
                while (el.previousElementSibling) {
                    var prev = el.previousElementSibling;
                    if (selector) {
                        if($(prev).is(selector)) prevEls.push(prev);
                    }
                    else prevEls.push(prev);
                    el = prev;
                }
                return new Dom(prevEls);
            },
            parent: function (selector) {
                var parents = [];
                for (var i = 0; i < this.length; i++) {
                    if (this[i].parentNode !== null) {
                        if (selector) {
                            if ($(this[i].parentNode).is(selector)) parents.push(this[i].parentNode);
                        }
                        else {
                            parents.push(this[i].parentNode);
                        }
                    }
                }
                return $($.unique(parents));
            },
            parents: function (selector) {
                var parents = [];
                for (var i = 0; i < this.length; i++) {
                    var parent = this[i].parentNode;
                    while (parent) {
                        if (selector) {
                            if ($(parent).is(selector)) parents.push(parent);
                        }
                        else {
                            parents.push(parent);
                        }
                        parent = parent.parentNode;
                    }
                }
                return $($.unique(parents));
            },
            find : function (selector) {
                var foundElements = [];
                for (var i = 0; i < this.length; i++) {
                    var found = this[i].querySelectorAll(selector);
                    for (var j = 0; j < found.length; j++) {
                        foundElements.push(found[j]);
                    }
                }
                return new Dom(foundElements);
            },
            children: function (selector) {
                var children = [];
                for (var i = 0; i < this.length; i++) {
                    var childNodes = this[i].childNodes;
    
                    for (var j = 0; j < childNodes.length; j++) {
                        if (!selector) {
                            if (childNodes[j].nodeType === 1) children.push(childNodes[j]);
                        }
                        else {
                            if (childNodes[j].nodeType === 1 && $(childNodes[j]).is(selector)) children.push(childNodes[j]);
                        }
                    }
                }
                return new Dom($.unique(children));
            },
            remove: function () {
                for (var i = 0; i < this.length; i++) {
                    if (this[i].parentNode) this[i].parentNode.removeChild(this[i]);
                }
                return this;
            },
            detach: function () {
                return this.remove();
            },
            add: function () {
                var dom = this;
                var i, j;
                for (i = 0; i < arguments.length; i++) {
                    var toAdd = $(arguments[i]);
                    for (j = 0; j < toAdd.length; j++) {
                        dom[dom.length] = toAdd[j];
                        dom.length++;
                    }
                }
                return dom;
            }
        };
    
        $.each = function (obj, callback) {
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
        $.unique = function (arr) {
            var unique = [];
            for (var i = 0; i < arr.length; i++) {
                if (unique.indexOf(arr[i]) === -1) unique.push(arr[i]);
            }
            return unique;
        };
        // return {key: value, key: value}
        $.parseUrlQuery = function (url) {
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
    
        $.serializeObject = function (obj) {
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
    
        // Global Ajax Setup
        var globalAjaxOptions = {};
    
        // Ajax
        var _jsonpRequests = 0;
        $.ajax = function (options) {
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
                timeout: 0
            };
            var callbacks = ['beforeSend', 'error', 'complete', 'success', 'statusCode'];
    
    
            //For jQuery guys
            if (options.type) options.method = options.type;
    
            // Merge global and defaults
            $.each(globalAjaxOptions, function (globalOptionName, globalOptionValue) {
                if (callbacks.indexOf(globalOptionName) < 0) defaults[globalOptionName] = globalOptionValue;
            });
    
            // Function to run XHR callbacks and events
            function fireAjaxCallback (eventName, eventData, callbackName) {
                var a = arguments;
                if (eventName) $(doc).trigger(eventName, eventData);
                if (callbackName) {
                    // Global callback
                    if (callbackName in globalAjaxOptions) globalAjaxOptions[callbackName](a[3], a[4], a[5], a[6]);
                    // Options callback
                    if (options[callbackName]) options[callbackName](a[3], a[4], a[5], a[6]);
                }
            }
    
            // Merge options and defaults
            $.each(defaults, function (prop, defaultValue) {
                if (!(prop in options)) options[prop] = defaultValue;
            });
    
            // Default URL
            if (!options.url) {
                options.url = win.location.toString();
            }
            // Parameters Prefix
            var paramsPrefix = options.url.indexOf('?') >= 0 ? '&' : '?';
    
            // UC method
            var _method = options.method.toUpperCase();
            // Data to modify GET URL
            if ((_method === 'GET' || _method === 'HEAD' || _method === 'OPTIONS' || _method === 'DELETE') && options.data) {
                var stringData;
                if (typeof options.data === 'string') {
                    // Should be key=value string
                    if (options.data.indexOf('?') >= 0) stringData = options.data.split('?')[1];
                    else stringData = options.data;
                }
                else {
                    // Should be key=value object
                    stringData = $.serializeObject(options.data);
                }
                if (stringData.length) {
                    options.url += paramsPrefix + stringData;
                    if (paramsPrefix === '?') paramsPrefix = '&';
                }
            }
            // JSONP
            if (options.dataType === 'json' && options.url.indexOf('callback=') >= 0) {
    
                var callbackName = 'f7jsonp_' + Date.now() + (_jsonpRequests++);
                var abortTimeout;
                var callbackSplit = options.url.split('callback=');
                var requestUrl = callbackSplit[0] + 'callback=' + callbackName;
                if (callbackSplit[1].indexOf('&') >= 0) {
                    var addVars = callbackSplit[1].split('&').filter(function (el) { return el.indexOf('=') > 0; }).join('&');
                    if (addVars.length > 0) requestUrl += '&' + addVars;
                }
    
                // Create script
                var script = doc.createElement('script');
                script.type = 'text/javascript';
                script.onerror = function() {
                    clearTimeout(abortTimeout);
                    fireAjaxCallback(undefined, undefined, 'error', null, 'scripterror');
                };
                script.src = requestUrl;
    
                // Handler
                win[callbackName] = function (data) {
                    clearTimeout(abortTimeout);
                    fireAjaxCallback(undefined, undefined, 'success', data);
                    script.parentNode.removeChild(script);
                    script = null;
                    delete win[callbackName];
                };
                doc.querySelector('head').appendChild(script);
    
                if (options.timeout > 0) {
                    abortTimeout = setTimeout(function () {
                        script.parentNode.removeChild(script);
                        script = null;
                        fireAjaxCallback(undefined, undefined, 'error', null, 'timeout');
                    }, options.timeout);
                }
    
                return;
            }
    
            // Cache for GET/HEAD requests
            if (_method === 'GET' || _method === 'HEAD' || _method === 'OPTIONS' || _method === 'DELETE') {
                if (options.cache === false) {
                    options.url += (paramsPrefix + '_nocache=' + Date.now());
                }
            }
    
            // Create XHR
            var xhr = new XMLHttpRequest();
    
            // Save Request URL
            xhr.requestUrl = options.url;
            xhr.requestParameters = options;
    
            // Open XHR
            xhr.open(_method, options.url, options.async, options.user, options.password);
    
            // Create POST Data
            var postData = null;
    
            if ((_method === 'POST' || _method === 'PUT' || _method === 'PATCH') && options.data) {
                if (options.processData) {
                    var postDataInstances = [ArrayBuffer, Blob, Document, FormData];
                    // Post Data
                    if (postDataInstances.indexOf(options.data.constructor) >= 0) {
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
                        var _data = $.serializeObject(options.data);
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
    
            // Additional headers
            if (options.headers) {
                $.each(options.headers, function (headerName, headerCallback) {
                    xhr.setRequestHeader(headerName, headerCallback);
                });
            }
    
            // Check for crossDomain
            if (typeof options.crossDomain === 'undefined') {
                options.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(options.url) && RegExp.$2 !== win.location.host;
            }
    
            if (!options.crossDomain) {
                xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            }
    
            if (options.xhrFields) {
                $.each(options.xhrFields, function (fieldName, fieldValue) {
                    xhr[fieldName] = fieldValue;
                });
            }
    
            var xhrTimeout;
            // Handle XHR
            xhr.onload = function (e) {
                if (xhrTimeout) clearTimeout(xhrTimeout);
                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 0) {
                    var responseData;
                    if (options.dataType === 'json') {
                        try {
                            responseData = JSON.parse(xhr.responseText);
                            fireAjaxCallback('ajaxSuccess', {xhr: xhr}, 'success', responseData, xhr.status, xhr);
                        }
                        catch (err) {
                            fireAjaxCallback('ajaxError', {xhr: xhr, parseerror: true}, 'error', xhr, 'parseerror');
                        }
                    }
                    else {
                        responseData = xhr.responseType === 'text' || xhr.responseType === '' ? xhr.responseText : xhr.response;
                        fireAjaxCallback('ajaxSuccess', {xhr: xhr}, 'success', responseData, xhr.status, xhr);
                    }
                }
                else {
                    fireAjaxCallback('ajaxError', {xhr: xhr}, 'error', xhr, xhr.status);
                }
                if (options.statusCode) {
                    if (globalAjaxOptions.statusCode && globalAjaxOptions.statusCode[xhr.status]) globalAjaxOptions.statusCode[xhr.status](xhr);
                    if (options.statusCode[xhr.status]) options.statusCode[xhr.status](xhr);
                }
                fireAjaxCallback('ajaxComplete', {xhr: xhr}, 'complete', xhr, xhr.status);
            };
    
            xhr.onerror = function (e) {
                if (xhrTimeout) clearTimeout(xhrTimeout);
                fireAjaxCallback('ajaxError', {xhr: xhr}, 'error', xhr, xhr.status);
            };
    
            // Ajax start callback
            fireAjaxCallback('ajaxStart', {xhr: xhr}, 'start', xhr);
            fireAjaxCallback(undefined, undefined, 'beforeSend', xhr);
    
    
            // Send XHR
            xhr.send(postData);
    
            // Timeout
            if (options.timeout > 0) {
                xhr.onabort = function () {
                    if (xhrTimeout) clearTimeout(xhrTimeout);
                };
                xhrTimeout = setTimeout(function () {
                    xhr.abort();
                    fireAjaxCallback('ajaxError', {xhr: xhr, timeout: true}, 'error', xhr, 'timeout');
                    fireAjaxCallback('ajaxComplete', {xhr: xhr, timeout: true}, 'complete', xhr, 'timeout');
                }, options.timeout);
            }
    
            // Return XHR object
            return xhr;
        };
    
        return $;
    
    }());
    
    // Export Dom to zero
    zero.$$ = Dom;
    
    // Export to local scope
    var $$ = Dom;
    
    // Export to Window
    window.$$ = Dom;

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

    //Return instance
    return zero;

}));
//# sourceMappingURL=zero.js.map
