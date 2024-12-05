function Person(name) {
  this.name = name;
}
Person.prototype.speak = function () {
  console.log('hello:', this.name);
}
let person1 = new Person('张三');
console.log('persons1:', person1);
person1.speak()

// new的过程中发生的事情：
// 1.new会创建一个空对象obj，这个对象会作为新实例
// 2.将新对象的__proto__设置为构造函数的prototype属性
// 3.调用构造函数，并将新创建的对象设置为构造函数中的this
// 4.返回新对象
let myNew = function (constructor, ...args) {
  let newInstance = {};
  Object.setPrototypeOf(newInstance, constructor.prototype);
  // 等效于：
  // newInstance.__proto__ = constructor.prototype
  constructor.apply(newInstance, [...args]);
  return newInstance;
}
let person2 = myNew(Person, '李四')
console.log('person2:', person2);
person2.speak();
