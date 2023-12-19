

构造函数的执行流程：

```js
function Person () {

};
var person = new Person();
```

new的过程：

1. 立即创建一个新的对象
2. 将新建的对象设置成为函数中的this
3. 逐行执行函数中的代码
4. 将新建的对象作为返回值返回