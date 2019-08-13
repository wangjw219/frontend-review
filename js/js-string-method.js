/**
 * 实现 JavaScript 中 String 的常用方法
 * 实现这些方法的思路：先验证参数的边界情况，然后再实现对应的逻辑
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

String.prototype.myPadStart = function(targetLength, padString) {
    'use strict';
    var thisArg = this;
    if (thisArg == null) {
        throw new TypeError('String.prototype.padStart called on null or undefined');
    }
    thisArg = String(thisArg);

    var length = thisArg.length;

    targetLength = +targetLength || 0;
    if (targetLength < length) {
        return thisArg;
    }

    padString = padString === undefined ? ' ' : String(padString);

    var repeatNum = Math.ceil((targetLength - length) / padString.length);

    for (var i = 0; i < repeatNum; i++) {
        padString += padString;
    }

    padString = padString.slice(0, targetLength - length);

    return padString + thisArg;
}

String.prototype.myPadEnd = function(targetLength, padString) {
    'use strict';
    var thisArg = this;
    if (thisArg == null) {
        throw new TypeError('String.prototype.padStart called on null or undefined');
    }
    thisArg = String(thisArg);

    var length = thisArg.length;

    targetLength = +targetLength || 0;
    if (targetLength < length) {
        return thisArg;
    }

    padString = padString === undefined ? ' ' : String(padString);

    var repeatNum = Math.ceil((targetLength - length) / padString.length);

    for (var i = 0; i < repeatNum; i++) {
        padString += padString;
    }

    padString = padString.slice(0, targetLength - length);

    return  thisArg + padString;
}

// 字符串匹配相关方法
// match、search、matchAll、includes、indexOf、replace、split 等详见 data-structure-and-algorithm 目录字符串匹配与正则表达式