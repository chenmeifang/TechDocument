var length = 10;

function fn() {
    // this的值取决于函数调用时的上下文
    return this.length + 1;
}

var obj1 = {
    length: 5,
    test1: function () {
        // 这里fn是在全局上下文中调用的，其this指向全局对象
        return fn();
    },
    test2: function () {
        return this.length + 1;
    }
};

// 此处call没有传入参数，因此test1方法里面的this默认指向全局对象
const a = obj1.test1.call();
console.log("a:" + a);
const b = obj1.test1();
console.log("b:" + b);

obj1.test2 = fn;
const c = obj1.test2.call();
console.log("c:" + c);
const d = obj1.test2();
console.log("d:" + d);