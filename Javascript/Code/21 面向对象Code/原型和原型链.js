// 这个代码示例涉及到 JavaScript 中函数声明、变量提升、作用域、原型链和构造函数的概念。
function Foo() {
    getName = function () {
        console.log(1);
    };
    console.log('this:', this)
    return this;
}
Foo.getName = function () {
    console.log(2);
};
Foo.prototype.getName = function () {
    console.log(3);
};
var getName = function () {
    console.log(4);
};
function getName() {
    console.log(5);
}
// 2
// 这一个没有太多争议
Foo.getName();

// 变量提升吧 4
// 函数申明function getName() { console.log(5); }会被提升
// 随后被var重新赋值
// 这一个也没有太多争议
getName();

// 3 ??? 预测错误
// 调用Foo()函数时，会重新定义全局的getName函数，将其赋值为function () { console.log(1); }
// 调用Foo()函数时，函数返回this，在全局环境中this指向window
// 所以输出1
// 这里我认为输出3是以为Foo()执行后返回的this是Foo实例对象
Foo().getName();

// 1
getName();

// 2 ???
// 涉及到运算符优先级，首先调用的是Foo.getName()
// Foo.getName是function () { console.log(2); }
new Foo.getName();

// ?????
// new Foo() 创建了 Foo 的一个新实例，这时 this 指向新实例。
// Foo() 函数中并没有返回任何特定的内容，因此返回的是新创建的对象
// new Foo().getName()将调用Foo的实例方法getName，即Foo.prototype.getName
// 所以输出3
new Foo().getName();// ???

// new Foo() 首先创建一个 Foo 的新实例，并返回该实例
// 对这个实例调用 .getName()，返回的是 Foo.prototype.getName 方法
// 最外层的new运算符等价于new (Foo.prototype.getName)()，这将会调用getName作为构造函数。
new new Foo().getName();//???