console.log(a, b); // undefinded undefined
var a = 12, b = '林一一';
function foo() {
  console.log(a, b) // 12 林一一 （错误）这里不太确定是用函数内部的还是外部的a,b？？
  // 注意：带var的是私有变量，不带var的是会向上级作用域查找
  var a = b = 13;
  console.log(a, b) // 13 13
}
foo()
console.log(a, b) // 12 林一一 （错误）
