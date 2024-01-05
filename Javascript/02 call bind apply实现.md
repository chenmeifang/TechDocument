https://www.bilibili.com/video/BV1m54y1q7hc?from=search&seid=8833365694111867782

# 实现call:

call的使用：

![image-20231225111025430](02 call bind apply实现.assets/image-20231225111025430.png)

要模仿call首先要思考call是从哪里来的——Function对象

Function对象是构造函数，构造函数是有原型对象（Function.prototype）的

这个原型对象里面就有很多属性可以使用，比如call就是在这个原型对象属性里面来的。

因此我们要模仿就必须在原型对象里面添加新的和call一样的属性

==要把newCall加在函数原型上==

```js
function test(param1, param2) {
    console.log('param1:',param1)
    console.log('param2:',param2)
    console.log('name:',this.name)
}
let obj = {
    name: 'test2'
}
// test.call(obj, 'param1');

Function.prototype.myCall = function(newThis, ...arguments) {
    // console.log('arguments:', ...arguments)
    // 本质：把myCall这个函数变成test函数的属性 错误
    // 本质：把myCall这个函数变成obj对象的属性，然后删除该属性 正确
    let _originThis = this; // test
    let _newThis = newThis; // obj
    _newThis.test = _originThis; // obj = {test: test 函数}；
    _newThis.test(...arguments);
    delete _newThis.test;
}
test.myCall(obj, 'param1', 'param2')
```

![image-20231225123756605](02 call bind apply实现.assets/image-20231225123756605-17034790774551.png)

这样的拼接可以执行是因为：**数组和字符串相加的时候数组会调用toString()方法**

但是这里会有一个问题：

这个数组其实会直接显示参数，数组是下面这样子的

```
newArguments = ['点赞', '收藏', '转发', '充电'];
```

字符串拼接起来就会是这样：

```
"obj.p(点赞，收藏，转发，充电)"
```

这些参数就没有了引号，不符合我们要达到的执行语句

我们需要用字符串的形式先隐藏掉这些参数！！！！！

![image-20231225124410664](02 call bind apply实现.assets/image-20231225124410664.png)

修改for循环里面的语句：

![image-20231225124443479](02 call bind apply实现.assets/image-20231225124443479.png)

数组就会变成这样：

```
newArguments = ['arguments[1]', 'arguments[2]', 'arguments[3]', 'arguments[4]'] 
```

```
"obj.p(" + newArguments + ")"
```

就会变成：

```
"obj.p(arguments[1], arguments[2], arguments[3], arguments[4])"
```

# 实现apply:

```js
function test(param1, param2) {
    console.log('param1:',param1)
    console.log('param2:',param2)
    console.log('name:',this.name)
}
let obj = {
    name: 'test2'
}
// test.call(obj, 'param1');

Function.prototype.myApply = function(newThis, arguments) {
    console.log('arguments:', ...arguments)
    let _originThis = this; // test
    let _newThis = newThis; // obj
    _newThis.test = _originThis; // obj = {test: test 函数}；
    _newThis.test(...arguments);
    delete _newThis.test;
}
test.myApply(obj, ['param1', 'param2'])
```

# 实现bind:

```JS
function test (param1,param2,param3) {
    console.log('this:',this)
    console.log('param1:',param1)
    console.log('param2:',param2)
    console.log('param3:',param3)
    console.log('name:',this.name);
}
let obj = {
    name: 'chenmeifang'
}
// let Fn = test.bind(obj, 'param1', 'param2')
// Fn('param3');
// let fn = new Fn(); // 这样做的话this指向就失效了，就又指向原来的函数了


Function.prototype.myBind = function (obj, ...arguments) {
    let _originThis = this; // test函数
    let _newThis = obj; // obj对象
    _newThis.test = _originThis; // obj:{test: test函数}
    let outerArguments = arguments
    let returnFn = function (...arguments) {
        if (this instanceof returnFn) {
            // 是用new执行的
            _originThis.call(_originThis, ...outerArguments, ...arguments)
        } else {
            _newThis.test(...outerArguments, ...arguments)
        }
    }
    return returnFn;
}
let Fn = test.myBind(obj, 'param1', 'param2')
// Fn('param3');
let fn = new Fn();
```

bind返回的函数接收的第一个参数也是绑定的this

注意：因为函数里面有返回的函数，在执行中很容易造成this的丢失。所以需要提前进行this的保存。

接下来处理参数：切割掉第一个数组元素

注意：arguments其实是对象，不是数组。因此不能直接用数组的切割方法。需要利用call方法把slice切割方法赋给arguments对象。

接下来 把数组放入到下面return的函数里面

把call改为apply

注意：bind实际上是具有科里化特性的。

我们为返回的函数传入一个参数， 而不是在一开始执行的时候传入参数。也就是bind的第二个括号。！

有两个arguments

14min处：

==bind方法有一点很烦人，就是可以**配合new使用**。只不过**this值会失效**。==

this值会失效是指什么？？？？？

先用原始的bind方法展示一下：this.name打印出来是undefined。 可以看出来this值失效了。

可以看出新的bind方法缺少了**实现new的过程**！！！
也就是涉及到原型对象的知识了。

为person函数对象的原型添加collection属性，改为新的bind方法：

因为b.collection是undefined,可以看出这个实例和现在这个原型对象没有关系。

先实现new和bind会使得this失效的效果

对于this的处理有两种情况：

1.不用new，this效果依旧

2.使用new，this失效

**要判断有没有使用new，这里需要用到原型对象的概念。**

因此需要首先**把返回的函数设置为具名函数**

因为有了名字的函数才能进行关系的确认。

---

为什么要串联起来？串联这里弄不懂了！！！！！！！

newf.prototype = that.prototype

使得bibi这个函数的实例可以用到person原型对象的属性。

但是直接修改原型对象会有弊端。

可以用原型式继承的理念来进行继承以避免过多的修改。

（1）首先创建一个空函数o；

（2）把空函数o的原型对象修改为这里的this的原型对象，也就是把空函数o的原型对象修改为函数person的原型对象；

（3）再把新函数newf的原型对象作为空函数o的实例进行串联。
