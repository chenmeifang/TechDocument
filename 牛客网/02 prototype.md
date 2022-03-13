```javascript
var A = {n: 4399};
var B = function(){this.n = 9999};
var C = function(){var n = 8888};
B.prototye = A;
C.prototype = A;
var b = new B();
var c = new C();
A.n++
console.log(b.n) 
console.log(c.n)
```

console.log(b.n) 在找b.n是首先查找b对象自身有没有n属性，如果没有会去prototype上查找

## new运算的具体执行过程：

​	1.创建一个空对象

​	2.把这个空对象的__ proto___指向构造函数的prototype

​	3.把这个空对象赋值给this

​	4.执行构造函数内的代码

问题：js中function放在哪？

结果：b.n:9999    c.n:4400 是吗？

# 这里记得找一下答案啊！！

3