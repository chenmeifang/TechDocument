function A() { }
A.prototype.x = 1;
var a1 = new A();
A.prototype = { x: 2, y: 3 }
// A.prototype.x = 2;
// A.prototype.y = 3;
var a2 = new A();
console.log(a1.x); // 1
console.log(a1.y); // undefined
console.log(a2.x); // 2
console.log(a2.y); // 3
// 已经存在的实例a1的原型链不受影响，仍然指向原来的A.prototype
// 说明：
// 当修改A.prototype时，修改的只是构造函数A的原型对象
// JS中，原型链是实例和原型之间的链接关系，它是由实例在创建时确定的

// 当通过new A()创建一个实例时，实例的[[prototype]](即原型链)会指向当时的A.prototype对象
// 即使后续修改了A.prototype，实例a1的原型链已经固定，并不会自动跟随构造函数的原型修改


