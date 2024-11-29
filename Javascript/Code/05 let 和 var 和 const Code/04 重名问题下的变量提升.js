// var 和 function 的变量同名 var 会先进行变量提升，
// 但是在变量提升阶段，函数声明的变量会覆盖 var 的变量提升，
// 所以直接结果总是函数先执行优先
console.log(a);
var a = 1;
function a() {
  console.log(2);
}
a()
