/**
 * 实现 JavaScript 中 String 的常用方法
 */

String.prototype.myCharAt = function(index) {
    // 判断 this（即调用本方法的对象）是否合法
    'use strict';
    var thisArg = this;
    if (thisArg == null) {
        throw new TypeError('String.prototype.myCharAt called on null or undefined');
    }
    thisArg = String(thisArg);

    index = index || 0;

    return thisArg[index] || '';
}

String.prototype.myConcat = function() {
    // 判断 this（即调用本方法的对象）是否合法
    'use strict';
    var thisArg = this;
    if (thisArg == null) {
        throw new TypeError('String.prototype.myConcat called on null or undefined');
    }
    thisArg = String(thisArg);

    var args = arguments;

    for (var i = 0; i < args.length; i++) {
        thisArg += args[i];
    }

    return thisArg;
}

String.prototype.mySlice = function(fromIndex, toIndex) {
    // 判断 this（即调用本方法的对象）是否合法
    'use strict';
    var thisArg = this;
    if (thisArg == null) {
        throw new TypeError('String.prototype.myConcat called on null or undefined');
    }
    thisArg = String(thisArg);

    var length = thisArg.length;

    fromIndex = +fromIndex || 0;
    if (fromIndex < 0) {
        fromIndex += length;
    }

    if (toIndex == undefined) {
        toIndex = thisArg.length;
    }
    if (toIndex < 0) {
        toIndex += length;
    }

    var result = '';
    for (var i = 0; i < length; i++) {
        if (i >= fromIndex && i < toIndex) {
            result += thisArg[i];
        }
    }

    return result;
}

String.prototype.myEndsWith = function(str, length) {
    // 判断 this（即调用本方法的对象）是否合法
    'use strict';
    var thisArg = this;
    if (thisArg == null) {
        throw new TypeError('String.prototype.endsWith called on null or undefined');
    }
    thisArg = String(thisArg);

    // 处理参数 str 的边界条件
    if (str === undefined) {
        return false;
    }
    str = String(str);

    // 处理参数 length 的边界条件
    if (length === undefined || length > thisArg.length) {
        length = thisArg.length;
    }

    return thisArg.slice(length - str.length, length) === str;
}

String.prototype.myStartsWith = function(str, position) {
    // 判断 this（即调用本方法的对象）是否合法
    'use strict';
    var thisArg = this;
    if (thisArg == null) {
        throw new TypeError('String.prototype.startsWith called on null or undefined');
    }
    thisArg = String(thisArg);

    // 处理参数 str 的边界条件
    if (str === undefined) {
        return false;
    }
    str = String(str);

    // 处理参数 position 的边界条件
    position = +position || 0;

    return thisArg.slice(position, str.length) === str;
}