https://www.bilibili.com/video/BV1m54y1q7hc?from=search&seid=8833365694111867782

实现call:

==要把newCall加在函数原型上！！！！==这是自己在实现的时候忽略的一点

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
    // 本质：把myCall这个函数变成test函数的属性????????！！?错误
    // 本质：把myCall这个函数变成obj对象的属性，然后删除该属性 正确
    let _originThis = this; // test
    let _newThis = newThis; // obj
    _newThis.test = _originThis; // obj = {test: test 函数}；
    _newThis.test(...arguments);
    delete _newThis.test;
}
test.myCall(obj, 'param1', 'param2')
```



![截屏2021-01-27 下午2.19.47](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-01-27 下午2.19.47.png)

--->相当于下图：

![截屏2021-01-27 下午2.20.41](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-01-27 下午2.20.41.png)

第一个问题：this绑定谁？

![截屏2021-01-27 下午2.48.01](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-01-27 下午2.48.01.png)

接下来处理参数：参数的处理其实可以用 ... 实现

![截屏2021-01-27 下午2.54.40](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-01-27 下午2.54.40.png)

只显示一个参数，需要把这些参数拆分开来显示！

![截屏2021-01-27 下午2.58.39](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-01-27 下午2.58.39.png)

**数组和字符串相加的时候数组会调用toString()方法**

但是这里会有一个问题：

这个数组其实回直接显示参数，数组是下面这样子的

```
newArguments = ['点赞', '收藏', '转发', '充电'];
```

字符串拼接起来就会是这样：

```
"obj.p(点赞，收藏，转发，充电)"
```

这些参数就没有了引号，不符合我们要达到的执行语句

我们需要用字符串的形式先隐藏掉这些参数！！！！！

修改for循环里面的语句：

![截屏2021-01-27 下午3.00.54](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-01-27 下午3.00.54.png)

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



![截屏2021-01-27 下午3.01.52](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-01-27 下午3.01.52.png)



## 实现apply

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



![截屏2021-01-27 下午3.04.32](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-01-27 下午3.04.32.png)

## 实现bind

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

![截屏2021-02-20 下午1.43.43](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-20 下午1.43.43.png)

接下来处理参数：切割掉第一个数组元素

注意：arguments其实是对象，不是数组。因此不能直接用数组的切割方法。需要利用call方法把slice切割方法赋给arguments对象。

![截屏2021-02-20 下午1.45.59](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-20 下午1.45.59.png)

![截屏2021-02-20 下午1.46.49](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-20 下午1.46.49.png)

接下来 把数组放入到下面return的函数里面

把call改为apply

注意：bind实际上是具有科里化特性的。

我们为返回的函数传入一个参数， 而不是在一开始执行的时候传入参数。也就是bind的第二个括号。！

![截屏2021-02-20 下午1.51.04](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-20 下午1.51.04.png)

有两个arguments

![截屏2021-02-20 下午1.52.40](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-20 下午1.52.40.png)

14min处：

==bind方法有一点很烦人，就是可以**配合new使用**。只不过**this值会失效**。==

this值会失效是指什么？？？？？

先用原始的bind方法展示一下：this.name打印出来是undefined。 可以看出来this值失效了。

![截屏2021-02-20 下午1.54.05](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-20 下午1.54.05.png)

可以看出新的bind方法缺少了**实现new的过程**！！！
也就是涉及到原型对象的知识了。

为person函数对象的原型添加collection属性，改为新的bind方法：

![截屏2021-02-20 下午1.55.59](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-20 下午1.55.59.png)

因为b.collection是undefined,可以看出这个实例和现在这个原型对象没有关系。

先实现new和bind会使得this失效的效果

对于this的处理有两种情况：

1.不用new，this效果依旧

2.使用new，this失效

**要判断有没有使用new，这里需要用到原型对象的概念。**

因此需要首先**把返回的函数设置为具名函数**

因为有了名字的函数才能进行关系的确认。

![截屏2021-02-20 下午2.01.12](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-20 下午2.01.12.png)

---

为什么要串联起来？串联这里弄不懂了！！！！！！！

newf.prototype = that.prototype

![截屏2021-02-20 下午2.02.07](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-20 下午2.02.07.png)

使得bibi这个函数的实例可以用到person原型对象的属性。

但是直接修改原型对象会有弊端。

可以用原型式继承的理念来进行继承以避免过多的修改。

（1）首先创建一个空函数o；

（2）把空函数o的原型对象修改为这里的this的原型对象，也就是把空函数o的原型对象修改为函数person的原型对象；

（3）再把新函数newf的原型对象作为空函数o的实例进行串联。

![截屏2021-02-20 下午2.02.45](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-20 下午2.02.45.png)



































