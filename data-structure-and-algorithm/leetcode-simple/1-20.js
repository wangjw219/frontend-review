// 两数之和
function twoSum(nums, target) {
    for (var i = 0; i < nums.length; i++) {
        for (var j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) {
                return [i, j];
            }
        }
    }
}

// 整数反转
function reverse(x) {
    var isNegative = false;
    if (x < 0) {
        isNegative = true;
        x = Math.abs(x);
    }
    x = +(String(x).split('').reverse().join(''));
    if (isNegative) {
        x = -x;
    }
    if (x > Math.pow(2, 31) - 1 || x < -Math.pow(2, 31)) {
        x = 0;
    }
    return x;
}

// 回文数判断-将数字转化为字符串
function isPalindrome(x) {
    return x === String(x).split('').reverse().join('');
}

// 回文数判断-不转化为字符串
function isPalindrome(x) {
    if (x < 0) return false;

    // 获取 x 的位数
    var div = 1;
    while (x / div >= 10) {
        div *= 10;
    }

    // 获取 x 的头尾数字判断是否相等
    while (x > 0) {
        var leftNum = ~~(x / div);
        var rightNum = x % 10;
        if (leftNum !== rightNum) return false;
        x = ~~(x % div / 10);
        console.log(x)
        div /= 100;
    }

    return true;
}

// 罗马数字转整数
function romanToInt(s) {
    var map = {
        'I': 1,
        'V': 5,
        'X': 10,
        'L': 50,
        'C': 100,
        'D': 500,
        'M': 1000,
    };

    var stringArray = s.split('');
    var result = 0;
    var i = 0;

    while (i < stringArray.length) {
        var letter = stringArray[i];
        var nextLetter = stringArray[i + 1];
        var currentValue = map[letter];
        var nextValue = map[nextLetter];
        if (nextValue && nextValue > currentValue) {
            result += nextValue - currentValue;
            i += 2;
        } else {
            result += currentValue;
            i++;
        }
    }

    return result;
}

function romanToInt(s) {
    var map = {
        'I': 1,
        'V': 5,
        'X': 10,
        'L': 50,
        'C': 100,
        'D': 500,
        'M': 1000,
        'IV': 4,
        'IX': 9,
        'XL': 40,
        'XC': 90,
        'CD': 400,
        'CM': 900,
    };

    var stringArray = s.split('');
    var result = 0;
    var i = 0;

    while (i < stringArray.length) {
        var letter = stringArray[i];
        var nextLetter = stringArray[i + 1];
        var compositeValue = nextLetter ? map[letter + nextLetter] : 0;

        if (compositeValue) {
            result += compositeValue;
            i += 2;
        } else {
            result += map[letter];
            i++;
        }
    }

    return result;
}

// 最长前缀
function longestCommonPrefix(strs) {
    if (strs.length === 0) return '';
    if (strs.length === 1) return strs[0];

    var firstStr = strs[0];
    var subStr = '';
    for (var i = 0; i < firstStr.length; i++) {
        subStr = firstStr.slice(0, i + 1);

        for (var j = 1; j < strs.length; j++) {
            if (!strs[j].startsWith(subStr)) {
                return subStr.slice(0, i);
            }
        }
    }
    return subStr;
}

// 有效的括号
function isValid(s) {
    var stack = [];

    for (var i = 0; i < s.length; i++) {
        var letter = s[i];
        var stackTopLetter = stack[0];
        if ((letter === ')' && stackTopLetter === '(') || (letter === ']' && stackTopLetter === '[') || (letter === '}' && stackTopLetter === '{')) {
            stack.shift();
        } else {
            stack.unshift(letter);
        }
    }

    return stack.length === 0;
}

// 合并两个有序链表
function mergeTwoLists(l1, l2) {
    var target = {};
    var l = target;

    while (l1 && l2) {
        if (l1.value <= l2.value) {
            l.next = l1;
            l1 = l1.next;
        } else {
            l.next = l2;
            l2 = l2.next;
        }
    }
    l.next = l1 ? l1 : l2;

    return target.next;
}

// 删除排序数组中的重复项
function removeDuplicates(nums) {
    if (nums.length == 0) return 0;
    var i = 0;

    for (var j = 1; j < nums.length; j++) {
        if (nums[j] != nums[i]) {
            i++;
            nums[i] = nums[j];
        }
    }

    nums.length = i + 1;

    return i + 1;
}

// 原地移除元素
function removeElement(nums, val) {
    if (nums.length == 0) return 0;

    var i = 0;
    for (var j = 0; j < nums.length; j++) {
        if (nums[j] != val) {
            nums[i] = nums[j];
            i++;
        }
    }

    return i;
};

// 二分搜索
function binarySearch(nums, target) {
    if (target == undefined || nums.length == 0) return -1;
    var start = 0;
    var end = nums.length - 1;
    var center;

    while (end >= start) {
        center = Math.floor((start + end) / 2);

        if (target > nums[center]) {
            start = center + 1;
        } else if (target < nums[center]) {
            end = center - 1;
        } else {
            return center;
        }
    }

    return -1;
}