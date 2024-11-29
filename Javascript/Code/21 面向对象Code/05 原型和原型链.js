function Foo() {
  getName = function () {
    console.log(1)
  }
  return this
}
Foo.getName = function () {
  console.log(2)
}
Foo.prototype.getName = function () {
  console.log(3)
}
var getName = function () {
  console.log(4) // 后面25行执行的时候也被覆盖了
}
// 这里被“同名+变量提升”覆盖了
function getName() {
  console.log(5)
}
// 1
Foo.getName() // 2 
//2
getName() // 4
//3
Foo().getName(); // 3 错误
//4
getName(); // 1
//5
new Foo.getName() // 3 错误
// ??这个是前面的new先执行还是后面的getName先执行？
// 在表达式new Foo.getName()中，.(属性访问运算符)的优先级高于new运算符
// 因此getName方法先被访问，再应用new运算符
// new（无括号时调用时），优先级低于.

//6
new Foo().getName() // 3
//7
new new Foo().getName()