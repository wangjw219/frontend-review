// 字符串匹配算法

// 朴素匹配算法：逐个字母比对，无预处理，匹配时间为 O((n - m + 1) * m)
function basicSearch(string, pattern) {
    var index = -1;
    for (var i = 0; i <= string.length - pattern.length; i++) {
        var flag = true;
        for (var j = 0; j < pattern.length; j++) {
            if (string[i + j] !== pattern[j]) {
                flag = false;
                break;
            }
        }
        if (flag) {
            index = i;
            break;
        }
    }
    return index;
}

// Rabin-Karp 算法，预处理时间为 O(m)，最坏匹配时间为 O((n - m + 1) * m)
function rkSearch(string, pattern) {
    var stringLength = string.length;
    var patternLength = pattern.length;
    var index = -1;
    var stringValue = 0;
    var patternValue = 0;

    // 对目标字符串预处理
    for (var i = 0; i < patternLength; i++) {
        patternValue += pattern[i].charCodeAt();
    }

    for (var i = 0; i <= stringLength - patternLength; i++) {
        stringValue = 0;
        for (var j = 0; j < patternLength; j++) {
            stringValue += string[i + j].charCodeAt();
        }
        if (patternValue === stringValue) {
            var flag = true;
            for (var k = 0; k < patternLength; k++) {
                if (string[i + k] !== pattern[k]) {
                    flag = false;
                    break;
                }
            }
            if (flag) {
                index = i;
                break;
            }
        }
    }

    return index;
}

// 获取 KMP 算法中 "部分匹配表"
function getPartMatchArray(str) {
    var partMatchArray = [];

    for (var i = 0; i < str.length; i++) {
        var newStr = str.slice(0, i + 1);
        var prefix = '';
        var suffix = '';
        if (newStr.length <= 1) {
            partMatchArray[i] = 0;
        } else {
            for (var j = 0; j < i; j++) {
                prefix = newStr.slice(0, j + 1);
                suffix = newStr.slice(-(j + 1));
                // 前后缀相同
                if (prefix === suffix) {
                    partMatchArray[i] = prefix.length;
                }
            }
            // 前后缀中没有相同的字符串
            partMatchArray[i] = partMatchArray[i] || 0;
        }
    }

    return partMatchArray;
}

// KMP 字符串匹配算法
function kmpSearch(string, pattern) {
    var partMatchArray = getPartMatchArray(pattern);
    var index = -1;

    var i = 0;
    while (i < string.length) {
        for (var j = 0; j < pattern.length; j++) {
            if (string[i + j] !== pattern[j]) {
                break;
            }
        }
        // 匹配到
        if (j === pattern.length) {
            index = i;
            break;
        } else {
            if (j === 0) {
                i++;
            } else {
                // 根据部分匹配表移动位数
                // 移动位数 = 已匹配的字符数 - 对应的部分匹配值
                i += (j - partMatchArray[j - 1]);
            }
        }
    }

    return index;
}