// 实现 JavaScript 中数组方法，相当于 polyfill
// MDN 上的方法列表: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array

// JavaScript 中并没有方法的概念，只有函数的概念，所以当我们这样调用的时候：[].push(1) 时，
// 其实只是调用 push 函数，至于哪个对象对用的这个函数，则需要在 push 函数中通过 this 来确定

/**
 * 实现 Array.from() 方法
 */
function arrayFrom(obj, mapFn, thisArg) {
    // 将 obj 转化为一个对象
    var sourceObj = Object(obj);

    // 不允许使用 null 和 undefined
    if (obj == null) {
        throw new TypeError('Cannot convert undefined or null to object');
    }

    // 判断 mapFn 是否合法
    if (typeof mapFn !== 'undefined' && typeof mapFn !== 'function') {
        throw new TypeError(mapFn + ' is not a function');
    }

    // 直接调用数组构造函数创建数组（MDN上的 polyfill 还考虑 Array.from.call(Object, {length: 5})） 这种情况，这样返回的就不是数组了
    var arr = new Array(sourceObj.length);

    for (var i = 0; i < sourceObj.length; i++) {
        if (mapFn) {
            arr[i] = mapFn.call(thisArg, sourceObj[i], i, sourceObj);
        } else {
            arr[i] = sourceObj[i];
        }
    }

    return arr;
}

/**
 * 实现 Array.isArray() 方法
 */
function isArray(arr) {
    return Object.prototype.toString.call(arr) === '[object Array]';
}

/**
 * 实现 Array.of() 方法
 */
function arrayOf() {
    return Array.prototype.slice.call(arguments);
}

/************************** 实例方法 ***********************/

Array.prototype.myConcat = function() {
    'use strict';
    var args = arguments;
    var thisArg = this;

    if (thisArg == null) {
        throw new TypeError('Array.prototype.concat called on null or undefined');
    }
    // 转化为对象
    thisArg = Object(thisArg);

    var arr = isArray(thisArg) ? thisArg : [thisArg];

    for (var i = 0; i < args.length; i++) {
        var item = args[i];
        if (isArray(item)) {
            for (var j = 0; j < item.length; j++) {
                arr[arr.length] = item[j];
            }
        } else {
            arr[arr.length] = item;
        }
    }

    return arr;
}

Array.prototype.myPush = function() {
    'use strict';
    var args = arguments;
    var thisArg = this;

    if (thisArg == null) {
        throw new TypeError('Cannot convert undefined or null to object');
    }

    thisArg = Object(thisArg);

    var length = thisArg.length || 0;

    for (var i = 0; i < args.length; i++) {
        thisArg[length] = args[i];
        length++;
    }

    thisArg.length = length;

    return length;
}

Array.prototype.myPop = function() {
    var thisArg = this;

    if (thisArg == null) {
        throw new TypeError('Cannot convert undefined or null to object');
    }

    thisArg = Object(thisArg);

    var length = thisArg.length;

    var target = thisArg[length - 1];

    if (length > 0) {
        thisArg.length = length - 1;
    }
    if (!isArray(thisArg)) {
        delete thisArg[length];
    }

    return target;
}

Array.prototype.myShift = function() {
    var thisArg = this;

    if (thisArg == null) {
        throw new TypeError('Cannot convert undefined or null to object');
    }

    thisArg = Object(thisArg);

    var target = thisArg[0];
    var length = thisArg.length;

    for (var i = 0; i < length; i++) {
        thisArg[i] = thisArg[i + 1];
    }

    delete thisArg[i - 1];

    thisArg.length = length - 1;

    return target;
}

Array.prototype.myUnshift = function() {
    var args = arguments;
    var thisArg = this;

    if (thisArg == null) {
        throw new TypeError('Cannot convert undefined or null to object');
    }

    thisArg = Object(thisArg);

    var length = thisArg.length || 0;
    var argsLength = args.length;

    for (var i = argsLength; i > 0; i--) {
        var targetPosition = length - 1 + i;
        thisArg[targetPosition] = thisArg[targetPosition - argsLength];
    }

    for (var i = 0; i < argsLength; i++) {
        thisArg[i] = args[i];
    }

    var finalLength = length + argsLength;
    thisArg.length = finalLength;

    return finalLength;
}

Array.prototype.mySlice = function() {
    var args = arguments;
    var thisArg = this;

    if (thisArg == null) {
        throw new TypeError('Cannot convert undefined or null to object');
    }

    thisArg = Object(thisArg);

    var length = +thisArg.length || 0;
    if (length == 0) {
        return [];
    }

    var fromIndex = +args[0] || 0;
    fromIndex = (fromIndex + length) % length;
    if (fromIndex < 0) {
        fromIndex = 0;
    }

    var toIndex = args[1];
    if (toIndex == undefined) {
        toIndex = length;
    }
    if (toIndex < 0) {
        toIndex += length;
    }

    var arrayLength = toIndex - fromIndex;

    if (arrayLength > 0) {
        var arr = new Array(arrayLength);

        for (var i = 0; i < toIndex - fromIndex; i++) {
            var targetIndex = i + fromIndex;
            if (targetIndex in thisArg) {
                arr[i] = thisArg[targetIndex];
            }
        }
        return arr;
    }

    return [];
}

Array.prototype.mySplice = function() {
    var thisArg = this;

    if (thisArg == null) {
        throw new TypeError('Cannot convert undefined or null to object');
    }

    thisArg = Object(thisArg);

    var args = arguments;

    var length = +thisArg.length || 0;
    if (length == 0) {
        return [];
    }

    var fromIndex = +args[0] || 0;
    fromIndex = (fromIndex + length) % length;
    if (fromIndex < 0) {
        fromIndex = 0;
    }
    var deleteCount = args[1];
    if (deleteCount == undefined && args[0] != undefined) {
        deleteCount = length;
    }
    var addedItems = [];
    if (args.length > 2) {
        for (var i = 0; i < args.length - 2; i++) {
            addedItems[i] = args[i + 2];
        }
    }

    var slice = Array.prototype.slice;

    var startArray = [];
    for (var i = 0; i < fromIndex; i++) {
        if (i in thisArg) {
            startArray[i] = thisArg[i];
        }
    }

    var deletedArray = deleteCount > 0 ? new Array(deleteCount) : [];
    for (var i = 0; i < deleteCount; i++) {
        var targetIndex = fromIndex + i;
        if (targetIndex in thisArg) {
            deletedArray[i] = thisArg[targetIndex];
        }
    }

    var endArray = [];
    for (var i = 0; i < length - fromIndex - deleteCount; i++) {
        var targetIndex = fromIndex + deleteCount + i;
        if (targetIndex in thisArg) {
            endArray[i] = thisArg[targetIndex];
        }
    }

    thisArg = startArray.concat(addedItems, endArray);

    return deletedArray;
}

Array.prototype.myEvery = function() {
    var thisArg = this;

    if (thisArg == null) {
        throw new TypeError('Cannot convert undefined or null to object');
    }

    thisArg = Object(thisArg);

    var args = arguments;

    var fn = args[0];

    if (typeof fn !== 'function') {
        throw new TypeError(fn + ' is not a function');
    }

    var context = args[1];

    var flag = true;

    for (var i = 0; i < thisArg.length; i++) {
        if (!fn.call(context, thisArg[i], i, thisArg)) {
            flag = false;
            break;
        }
    }

    return flag;
}

Array.prototype.mySome = function() {
    var thisArg = this;

    if (thisArg == null) {
        throw new TypeError('Cannot convert undefined or null to object');
    }

    thisArg = Object(thisArg);

    var args = arguments;

    var fn = args[0];

    if (typeof fn !== 'function') {
        throw new TypeError(fn + ' is not a function');
    }

    var context = args[1];

    var flag = false;

    for (var i = 0; i < thisArg.length; i++) {
        if (fn.call(context, thisArg[i], i, thisArg)) {
            flag = true;
            break;
        }
    }

    return flag;
}

Array.prototype.myForEach = function() {
    var thisArg = this;

    if (thisArg == null) {
        throw new TypeError('Cannot convert undefined or null to object');
    }

    thisArg = Object(thisArg);

    var args = arguments;

    var fn = args[0];

    if (typeof fn !== 'function') {
        throw new TypeError(fn + ' is not a function');
    }

    var context = args[1];

    var flag = false;

    for (var i = 0; i < thisArg.length; i++) {
        fn.call(context, thisArg[i], i, thisArg);
    }
}

Array.prototype.myMap = function() {
    var thisArg = this;

    if (thisArg == null) {
        throw new TypeError('Cannot convert undefined or null to object');
    }

    thisArg = Object(thisArg);

    var args = arguments;

    var fn = args[0];

    if (typeof fn !== 'function') {
        throw new TypeError(fn + ' is not a function');
    }

    var context = args[1];

    var flag = false;

    var targetArr = [];

    for (var i = 0; i < thisArg.length; i++) {
        targetArr[i] = fn.call(context, thisArg[i], i, thisArg);
    }

    return targetArr;
}

Array.prototype.myFill = function() {
    var thisArg = this;

    if (thisArg == null) {
        throw new TypeError('Cannot convert undefined or null to object')
    }

    thisArg = Object(thisArg);

    var length = +thisArg.length || 0;
    if (length == 0) {
        return thisArg;
    }
    var args = arguments;
    var value = args[0];

    var fromIndex = +args[1] || 0;
    fromIndex = (fromIndex + length) % length;
    if (fromIndex < 0) {
        fromIndex = 0;
    }
    var toIndex = args[2];

    if (toIndex == undefined) {
        toIndex = length;
    }

    for (var i = 0; i < length; i++) {
        if (i >= fromIndex && i < toIndex) {
            thisArg[i] = value;
        }
    }

    return thisArg;
}

Array.prototype.myFilter = function() {
    var thisArg = this;

    if (thisArg == null) {
        throw new TypeError('Cannot convert undefined or null to object');
    }

    thisArg = Object(thisArg);

    var args = arguments;

    var fn = args[0];

    if (typeof fn !== 'function') {
        throw new TypeError(fn + ' is not a function');
    }

    var context = arguments[1];

    var arr = [];

    for (var i = 0; i < thisArg.length; i++) {
        if (fn.call(context, thisArg[i], i, thisArg)) {
            arr[arr.length] = thisArg[i];
        }
    }

    return arr;
}

Array.prototype.myFind = function() {
    var thisArg = this;

    if (thisArg == null) {
        throw new TypeError('Cannot convert undefined or null to object');
    }

    thisArg = Object(thisArg);

    var args = arguments;

    var fn = args[0];

    if (typeof fn !== 'function') {
        throw new TypeError(fn + ' is not a function');
    }

    var context = args[1];

    var target;

    for (var i = 0; i < thisArg.length; i++) {
        if (fn.call(context, thisArg[i], i, thisArg)) {
            target = thisArg[i];
            break;
        }
    }

    return target;
}

Array.prototype.myFindIndex = function() {
    var thisArg = this;

    if (thisArg == null) {
        throw new TypeError('Cannot convert undefined or null to object');
    }

    thisArg = Object(thisArg);

    var args = arguments;

    var fn = args[0];

    if (typeof fn !== 'function') {
        throw new TypeError(fn + ' is not a function');
    }

    var context = args[1];

    var index = -1;

    for (var i = 0; i < thisArg.length; i++) {
        if (fn.call(context, thisArg[i], i, thisArg)) {
            index = i;
            break;
        }
    }

    return index;
}

Array.prototype.myIncludes = function() {
    var thisArg = this;

    if (thisArg == null) {
        throw new TypeError('Cannot convert undefined or null to object');
    }

    thisArg = Object(thisArg);

    var args = arguments;
    var length = thisArg.length;
    var value = args[0];
    var fromIndex = +args[1] || 0;
    var flag = false;

    if (length == 0) {
        return flag;
    } else {
        fromIndex = (fromIndex + length) % length;
    }

    if (fromIndex < 0) {
        fromIndex = 0;
    }

    for (var i = 0; i < thisArg.length; i++) {
        if (i >= fromIndex && (value === thisArg[i] || (isNaN(value) && isNaN(thisArg[i])))) {
            flag = true;
        }
    }

    return flag;
}

Array.prototype.myIndexOf = function() {
    var thisArg = this;

    if (thisArg == null) {
        throw new TypeError('Cannot convert undefined or null to object');
    }

    thisArg = Object(thisArg);

    var args = arguments;
    var length = thisArg.length;
    var value = args[0];
    var fromIndex = +args[1] || 0;
    var index = -1;

    if (length == 0) {
        return index;
    } else {
        fromIndex = (fromIndex + length) % length;
    }

    if (fromIndex < 0) {
        fromIndex = 0;
    }

    for (var i = 0; i < thisArg.length; i++) {
        if (i >= fromIndex && value === thisArg[i]) {
            index = i;
        }
    }

    return index;
}

Array.prototype.myLastIndexOf = function() {
    var thisArg = this;

    if (thisArg == null) {
        throw new TypeError('Cannot convert undefined or null to object');
    }

    thisArg = Object(thisArg);

    var args = arguments;
    var length = thisArg.length;
    var value = args[0];
    var fromIndex = +args[1] || 0;
    var index = -1;

    if (length == 0) {
        return index;
    } else {
        fromIndex = (fromIndex + length) % length;
    }

    if (fromIndex < 0) {
        fromIndex = 0;
    }

    for (var i = thisArg.length; i > 0; i--) {
        if (i >= fromIndex && value === thisArg[i]) {
            index = i;
        }
    }

    return index;
}

Array.prototype.myJoin = function() {
    var thisArg = this;
    if (thisArg == null) {
        throw new TypeError('Cannot convert undefined or null to object');
    }
    thisArg = Object(thisArg);

    var args = arguments;
    var seperator = args[0] || ',';
    var length = thisArg.length;
    var str = '';

    for (var i = 0; i < length; i++) {
        if (thisArg[i] == null) {
            str += '';
        } else {
            str += thisArg[i].toString();
        }

        if (i < length - 1) {
            str += seperator;
        }
    }

    return str;
}

Array.prototype.myReduce = function() {
    'use strict';
    var thisArg = this;
    if (thisArg == null) {
        throw new TypeError('Cannot convert undefined or null to object');
    }
    thisArg = Object(thisArg);

    var args = arguments;

    var fn = args[0];
    if (typeof fn !== 'function') {
        throw new TypeError(fn + ' is not a function');
    }

    var initValue = args[1];
    var length = thisArg.length;

    if (length === 0 && initValue === undefined) {
        throw new TypeError('Reduce of empty array with no initial value');
    }
    var acc = initValue;

    var i = 0;

    while (i < length) {
        if (acc === undefined) {
            acc = thisArg[0];
            i++;
        }
        acc = fn.call(thisArg, acc, thisArg[i], i, thisArg);
        i++;
    }

    return acc;
}

Array.prototype.myReverse = function() {
    'use strict';

    var thisArg = this;
    if (thisArg == null) {
        throw new TypeError('Cannot convert undefined or null to object');
    }
    thisArg = Object(thisArg);

    var length = thisArg.length;

    for (var i = 0; i < Math.floor(length / 2); i++) {
        var temp = thisArg[i];
        var targetIndex = length - i - 1;
        thisArg[i] = thisArg[targetIndex];
        thisArg[targetIndex] = temp;
    }

    return thisArg;
}

Array.prototype.mySort = function() {
    'use strict';

    var thisArg = this;
    if (thisArg == null) {
        throw new TypeError('Cannot convert undefined or null to object');
    }
    thisArg = Object(thisArg);

    var fn = arguments[0];
    if (fn !== undefined && typeof fn !== 'function') {
        throw new TypeError(fn + ' is not a function');
    }

    fn = fn || function(a, b) {
        a = a.toString();
        b = b.toString();

        var length = Math.max(a.length, b.length);

        var result = 0;
        for (var i = 0; i < length; i++) {
            var aLetter = a[i];
            var bLetter = b[i];
            if (aLetter === undefined) {
                result = -1;
                break;
            } else if (bLetter === undefined) {
                result = 1;
                break;
            } else {
                var aLetterCode = aLetter.charCodeAt(0);
                var bLetterCode = bLetter.charCodeAt(0);
                if (aLetterCode > bLetterCode) {
                    result = 1;
                    break;
                } else if (aLetterCode < bLetterCode) {
                    result = -1;
                    break;
                }
            }
        }
        return result;
    }

    var length = thisArg.length;

    for (var i = 0; i < length; i++) {
        for (var j = i + 1; j < length; j++) {
            if (fn(thisArg[i], thisArg[j]) > 0) {
                var temp = thisArg[i];
                thisArg[i] = thisArg[j];
                thisArg[j] = temp;
            }
        }
    }

    return thisArg;
}