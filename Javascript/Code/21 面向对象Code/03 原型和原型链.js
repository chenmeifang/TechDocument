function Fn(){
  var n = 10 // 局部变量n，函数外无法访问
  this.m = 20 // 给实例对象添加属性m
  this.aa = function() {
      console.log(this.m) // 输出实例对象的m属性
  }
}
Fn.prototype.bb = function () {
  console.log(this.n)
}
var f1 = new Fn // 可以不带括号，但如果构造函数需要参数，括号不可省略
// 等价于：var f1 = new Fn();  // 标准写法

Fn.prototype = {
  aa: function(){
      console.log(this.m + 10)
  }
}
var f2 = new Fn();
console.log('f1:',f1)    
console.log('f1.constructor:',f1.constructor)     // ==> function Fn(){...}
console.log('f2:',f2) 
console.log('f2.constructor:',f2.constructor)     // ==> Object() { [native code] }
// f1.bb() 
// f1.aa()  
// f2.aa()  
// console.log('f2:',f2);
// console.log('f2.__proto__:',f2.__proto__);
// f2.__proto__.aa()   
// f2.bb()     
