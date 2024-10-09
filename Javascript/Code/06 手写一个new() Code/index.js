function Person(name) {
    this.name = name;
};
class Person1 {
    name;
    constructor(name) {
        this.name = name
    }
    speak() {
        console.log('speak!!!')
    }
}
var person = new Person('张三');
console.log('person:', person);
var person1 = new Person1('李四');
console.log('person:', person1);
person1.speak();
// new的过程中做了：
//  1.创建了一个新的空对象
//  2.将新对象的this设置成为函数中的this —— 这一步不会实现
//  3.逐步执行Person函数中的代码
//  4.返回创建的新对象
let myNew = function (constructor) {
    let newInstance = {};
    // newInstance要能访问constructor函数上的所有方法————通过修改原型链实现
    Object.setPrototypeOf(newInstance, constructor.prototype);
    constructor.apply(newInstance);
    return newInstance;
}

// todo: 有点搞不清 new Class 和 new Function

var person2 = myNew(Person);