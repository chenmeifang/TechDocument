# [Generator对象](https://es6.ruanyifeng.com/#docs/generator)

Async函数是Generator函数的语法糖。

相较于 Generator，Async函数的改进在于下面几点：

1. Generator 函数的执行必须依靠执行器，而 `Async（）` 函数自带执行器，调用方式跟普通函数的调用同样。？
2. `Async` 和 await相较于 `*` 和 `yield` 更加语义化
3. `async` 函数返回值是 Promise 对象，比 Generator函数返回的 Iterator 对象方便，能够直接使用 `then（）`方法进行调用。

## 1. Generator基本概念：

1. Generator 函数是 ==ES6 提供的一种异步编程解决方案==，语法行为与传统函数完全不同。

2. Generator 函数是一个状态机，封装了多个内部状态。

3. 执行 Generator 函数会返回一个[遍历器对象](https://es6.ruanyifeng.com/#docs/async-iterator)。

4. 形式上，Generator 函数是一个普通函数，但是有两个特征

   1. 一是，`function`关键字与函数名之间有一个星号；

   2. 二是，函数体内部使用`yield`表达式，定义不同的内部状态

   3. ```javascript
      function* helloWorldGenerator() {
        yield 'hello';
        yield 'world';
        return 'ending';
      }
      
      var hw = helloWorldGenerator();
      ```

      上面代码定义了一个 Generator 函数`helloWorldGenerator`，它内部有两个`yield`表达式（`hello`和`world`），即该函数有三个状态：hello，world 和 return 语句（结束执行）。

5. Generator 函数的调用方法与普通函数一样，也是在函数名后面加上一对圆括号。

6. ==调用 Generator 函数后，该函数并不执行==，返回的也不是函数运行结果，而是一个指向内部状态的指针对象，也就是[遍历器对象（Iterator Object）](https://es6.ruanyifeng.com/#docs/iterator)。

7. 下一步，必须调用遍历器对象的`next`方法，使得指针移向下一个状态。也就是说，每次调用`next`方法，内部指针就从函数头部或上一次停下来的地方开始执行，直到遇到下一个`yield`表达式（或`return`语句）为止。换言之，Generator 函数是分段执行的，`yield`表达式是暂停执行的标记，而`next`方法可以恢复执行。

8. Generator 函数可以不用`yield`表达式，这时就变成了一个==单纯的暂缓执行函数==。

#### 2. yield表达式：

1. `yield`表达式只能用在 Generator 函数里面，用在其他地方都会报错。

2. `yield`表达式如果用在另一个表达式之中，必须放在圆括号里面。

   ```js
   function* demo() {
     console.log('Hello' + yield); // SyntaxError
     console.log('Hello' + yield 123); // SyntaxError
   
     console.log('Hello' + (yield)); // OK
     console.log('Hello' + (yield 123)); // OK
   }
   ```

3. `yield`表达式用作函数参数或放在赋值表达式的右边，可以不加括号。??????

#### 3. 与Iterator接口的关系：==???????==

任意一个对象的`Symbol.iterator`方法，等于该对象的遍历器生成函数，调用该函数会返回该对象的一个遍历器对象.

#### 4. next方法的参数：

1. `yield`表达式本身没有返回值，或者说总是返回`undefined`。`next`方法可以带一个参数，该参数就会被当作上一个`yield`表达式的返回值。

# Generator 函数的异步应用:

 https://es6.ruanyifeng.com/#docs/generator-async



# 面试题：

#### async和await用过吗？是做了什么呢？async的返回值是啥？

1. ==async函数的返回值为promise对象==
2. promise对象的结果由async函数执行的返回值决定
3. await右侧的表达式一般为promise对象，但也可以是其他的值
   1. 如果表达式是promise对象，await返回的是promise成功的值。
   2. 如果表达式是其他值，直接将此值作为await的返回值。
4. 注意：
   1. await必须写在async函数中，但async函数中可以没有await
   2. 如果await的promise失败了，就会抛出异常，需要通过try...catch来捕获处理
5. 使用async和await可以彻底的摆脱回调地狱

# 百度笔试题：

```js
(async () => {
    console.log('1');
    setTimeout(() => {
        console.log('2')
    }, 0)
    await new Promise ((resolve,reject) => {
        console.log('3');
    }).then(() => {
        console.log('4')
    });
    console.log('5')
})()
```

不确定5到底会不会打印出来！！
await到底是wait多少不确定！！！！！！！

！！！！！！5不会打印，只会打印1，3，2！！！！！！！！！！！！！！



我选的是c 错了！！！！

```js
function log(msg, time) {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(msg)
            resolve()
        },time)
    })
}
(async () => {
    for(let i = 0; i < 5; i++) {
        log(i, 1000)
    }
})()
// =>  隔1s后同时输出1，2，3，4

function log(msg, time) {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(msg)
            resolve()
        },time)
    })
}
(async () => {
    for(let i = 0; i < 5; i++) {
        await log(i, 1000)
    }
})()
// => 每隔一秒输出1，2，3，4
```

```js
function log(msg, time) {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(msg)
            resolve()
        },time)
    })
}

(async () => {
    [1,2,3,4].forEach(async (i) => {
        await log(i, 1000)
    })
})()
// => 隔1s后同时输出1，2，3，4
// ???? 同步的执行了四个异步函数
```

只是使用的遍历方式不一样，为什么会出现这样的情况？？？

```js
Array.prototype.forEach = function (callback) {
  // this represents our array
  for (let index = 0; index < this.length; index++) {
    // We call the callback for each entry
    callback(this[index], index, this);
  };
};

(async () => {
    [1,2,3,4].forEach(async (i) => {
        await log(i, 1000)
    })
})()
// 相当于下面的代码：
(async () => {
    for (let index = 0; index < this.length; index++) {
    	// We call the callback for each entry
      // callback(this[index], index, this);
      (async (i) => {
        await log(i, 1000)
      })()
      // forEach方法内部调用 回调函数 时，并没有使用await修饰，所以回调方法并不会等待上一个回调执行完毕。
    };
})()
```

```js
function log(msg, time) {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(msg)
            resolve()
        },time)
    })
}

// 第三段代码
(async () => {
    for(const i of [1,2,3,4]) {
        await log(i, 1000)
    }
})()
// => 每隔一秒输出1，2，3，4
```

# async 和 await视频

https://www.bilibili.com/video/BV1xW411J7K6?from=search&seid=10512449033732187172

## 第一节：

==async和await让我们把异步的代码写的更加简洁==



把上面的异步代码改的更加扁平一些：



第6行代码也要加await吗？？？？？？

getZhihuColumn函数的函数体读起来更像是同步的代码，但是==await关键字接收一个promise==。

==在promise resolve的时候可以把resolve的值 赋给赋值表达式左边的变量==

在promise reject的时候，会抛出一个错误。

还是没有把await的左边和右边弄清楚！！！

> await右侧的表达式一般为promise对象，但也可以是其他的值
>
> 如果await右侧的表达式是promise对象，await返回的是promise成功的值
>
> 如果await右侧的表达式是其他值，直接将此值作为await的返回值
>
> 如果await的promise失败了，就会抛出异常，需要通过try...catch来捕获处理

## 第二节：将async函数用在promise chain中

**因为==所有async函数都会返回一个promise对象==，那么我们可以像使用promise一样来使用async函数的返回值**

````js
async function fn1 () {
  return 1;
}
const result = fn1();
console.log(result);
// 控制台输出结果：Promise {1}
// 浏览器输出结果：
// Promise
//   __proto__: Promise
//   [[PromiseStatus]]: "resolved"
//   [[PromiseValue]]: 1		
````

getZhiuColumn函数返回一个promise。也就意味着我们可以利用promisechain把多个async函数串起来。也可以调用promise的catch方法。

进一步简化：

## 第三节：把任意类型的函数转成async风格

async关键字理论上可以适用于js中所有的函数形态。

* 把async用到函数声明上面
* 用到函数表达式
* 用到箭头函数
* 用到方法上面

函数表达式：

箭头函数：

==无论是在nodejs还是在浏览器里面，在全局作用域下面，代码的顶级作用域下面，使用async关键字是非法的？？？？==

我们需要声明一个匿名的函数表达式，并且把它设置成async的。



在类的函数上面使用async和await：

## 第四节： 处理async函数中的错误



# 第五节：正确处理多个await操作的并行串行

第10行和第11行这两个请求是串行的：等待第一个请求完成之后，然后发起第二个请求。



如何使用async和await，但同时保证这两个请求是并行的呢？？



# 第六节：使用Promise.all( )让多个await操作==并行==



# 第七节：结合await和任意兼容.then()的代码

await操作符后面通常会跟一个promise

如果后面跟的不是promise，会怎么样？？？

![截屏2021-03-15 上午10.02.14](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-03-15 上午10.02.14.png)

==**await有一个隐式的调用！！！**==

如果await右边跟的是promise，它就会用这个promise。

如果不是，它就会把后面跟的值包在Promise.resolve( )里面。

![截屏2021-03-15 上午10.03.09](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-03-15 上午10.03.09.png)

# 第八节：在for循环中正确使用await



上面这种写法是串行的！！！！！

如何把循环里面的串行改成并行，让代码运行的更快？？？

思路：先触发所有的请求，然后拿到一个promise的数组，然后遍历这个数组，等待里面的结果。



















