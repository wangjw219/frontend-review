Function.prototype.myCall = function(context) {
    var thisArg = this;
    if (typeof thisArg !== 'function') {
        throw new TypeError(thisArg + ' is not a function');
    }

    context = context || window;
    context.fn = thisArg;

    var restArgs = [].slice.call(arguments, 1);
    var args = [];
    for (var i = 0; i < restArgs.length; i++) {
        args.push('restArgs[' + i + ']');
    }

    // 使用 eval 不那么安全，因为 eval 能够访问当前词法作用域并改变其中的变量
    var result = eval('context.fn(' + args + ')'); // args toString 之后为：restArgs[0],restArgs[1],restArgs[2]

    delete context.fn;

    return result;
}

Function.prototype.myApply = function(context) {
    var thisArg = this;
    if (typeof thisArg !== 'function') {
        throw new TypeError(thisArg + ' is not a function');
    }

    context = context || window;
    context.fn = thisArg;

    var restArgs = arguments[1];

    var result;
    if (restArgs == undefined) {
        result = context.fn();
    } else {
        if (typeof restArgs !== 'object') {
            throw new Error('CreateListFromArrayLike called on non-object');
        }
        var args = [];
        for (var i = 0; i < restArgs.length; i++) {
            args.push('restArgs[' + i + ']');
        }
        result = eval('context.fn(' + args + ')');
    }

    delete context.fn;

    return result;
}

Function.prototype.myBind = function(context) {
    var thisArg = this;
    if (typeof thisArg !== 'function') {
        throw new TypeError(thisArg + ' is not a function');
    }

    context = context || window;

    var args = [].slice.call(arguments, 1);

    return function F() {
        // 使用 new 操作符调用函数时，会使用新创建的对象替换 bind 时传入的对象作为 this 的指向
        if (this instanceof F) {
            return new thisArg(args.concat(arguments));
        } else {
            return thisArg.apply(context, args.concat(arguments));
        }
    }
}