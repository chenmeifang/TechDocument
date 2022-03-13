

https://www.bilibili.com/video/BV1Dk4y127Ha  19min处开始

# 1 面试题

## 1.1 Vue双向绑定的原理是什么？简单描述

***\*Vue的双向数据绑定是通过数据劫持结合发布者订阅者模式来实现的**

在new Vue的时候，在Observer中通过Object.defineProperty()达到数据劫持，代理所有数据的getter和setter属性，在每次触发setter的时候，都会通过Dep来通知Watcher（派发更新），Watcher作为Observer数据监听器与Compile模板解析器之间的桥梁，当Observer监听到数据发生改变的时候，通过Updater来通知Compile更新视图。

而Compile通过Watcher订阅对应数据，绑定更新函数，通过Dep来添加订阅者，达到双向绑定

## 1.2 Vue双向绑定为什么还要用proxy去改写，而不是原来的object.defineProperty?

https://www.mk2048.com/blog/blog_hi11cia1jhk1j.html

# 2 Object.defineProperty( )——数据劫持

<img src="/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-20 下午8.46.49.png" alt="截屏2021-02-20 下午8.46.49" style="zoom:80%;" />

<img src="/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-20 下午8.48.42.png" alt="截屏2021-02-20 下午8.48.42" style="zoom:80%;" />

#### 属性值不可修改——writable（默认为false）；属性不可枚举——enumerable（默认为false）；属性不可删除——configurable（可配置的；可操作[删除]的。默认为false）；

<img src="/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-20 下午8.51.09.png" alt="截屏2021-02-20 下午8.51.09" style="zoom:90%;" />

<img src="/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-20 下午8.54.42.png" alt="截屏2021-02-20 下午8.54.42" style="zoom:85%;" />



注释掉第四行，改成第10行 行不行？

<img src="/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-20 下午9.33.20.png" alt="截屏2021-02-20 下午9.33.20" style="zoom:80%;" />

![截屏2021-02-20 下午9.34.13](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-20 下午9.34.13.png)

**value 和 writable 出现了任意一个，get和set就不能用。**

相关：响应式编程

defineProperty本身是不具备对数组进行操作的能力的！！！

那能不能有一个办法能够真正的利用这个东西去设置我的数组呢？可以

vue最牛逼的地方并不是双向绑定，最难的地方是节点和虚拟dom。虚拟dom的算法导致你在defineProperty里的get 方法和set方法里面的逻辑很长

![截屏2021-02-20 下午9.49.37](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-20 下午9.49.37.png)

77min处

后面的计算器例子要再看一遍！！！！！！！！！

底下的逻辑没有操作过dom！！！！！

![截屏2021-03-21 下午11.36.28](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-03-21 下午11.36.28.png)

![截屏2021-03-21 下午11.39.29](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-03-21 下午11.39.29.png)

![截屏2021-03-21 下午11.40.32](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-03-21 下午11.40.32.png)

![截屏2021-03-22 上午8.55.28](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-03-22 上午8.55.28.png)

![截屏2021-03-22 上午9.00.47](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-03-22 上午9.00.47.png)

![截屏2021-03-22 上午9.04.00](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-03-22 上午9.04.00.png)

![截屏2021-03-22 上午9.10.32](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-03-22 上午9.10.32.png)

![截屏2021-03-22 上午9.31.46](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-03-22 上午9.31.46.png)

![截屏2021-03-22 上午9.33.19](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-03-22 上午9.33.19.png)

同一个事件处理函数绑定给两个元素合理吗？
![截屏2021-03-22 上午9.35.22](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-03-22 上午9.35.22.png)

![截屏2021-03-22 上午9.36.25](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-03-22 上午9.36.25.png)

![截屏2021-03-22 上午9.37.24](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-03-22 上午9.37.24.png)

# 3 Proxy

4min30s处开始

一个是代理，一个是定义属性。

如果不是vue，这俩东西一辈子都没有交集。

defineProperty：劫持数据--》给对象进行扩展--》属性进行设置

Proxy：可以实现同样的功能，但是它不是直接用劫持的方法。proxy是返回一个代理的对象。  

![截屏2021-02-21 上午10.00.04](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-21 上午10.00.04.png)

Proxy：ES6的构造函数

![截屏2021-03-22 上午9.59.12](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-03-22 上午9.59.12.png) 



![截屏2021-02-21 上午10.24.03](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-21 上午10.24.03.png)

因为proxy是target的代理，proxy改了，target肯定会跟着改了。

#### 这个东西是给对象用的，它能用在数组里面吗？**能**

![截屏2021-02-21 上午10.31.20](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-21 上午10.31.20.png)

它能处理函数吗？能

![截屏2021-02-21 上午10.33.52](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-21 上午10.33.52.png)

### 对象操作的14种方法：背下来！！！！！！！！

#### 1. 获取原型

![截屏2021-02-21 上午10.39.56](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-21 上午10.39.56.png) 

#### 2.设置原型

![截屏2021-02-21 上午10.42.04](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-21 上午10.42.04.png) 

#### 3.获取对象的可扩展性（追加，删除，修改，枚举等）

<img src="/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-21 上午10.43.19.png" alt="截屏2021-02-21 上午10.43.19" style="zoom:90%;" />

#### seal：封闭对象——不可修改对象；不可删除对象属性；可更改属性值；可枚举  

<img src="/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-21 上午10.45.11.png" alt="截屏2021-02-21 上午10.45.11" style="zoom:90%;" />

#### freeze：冻结对象——不可修改对象；不可删除对象属性；不可更改属性值；可枚举 

<img src="/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-21 上午10.45.58.png" alt="截屏2021-02-21 上午10.45.58" style="zoom:90%;" />

#### 4.获取自有属性

<img src="/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-21 上午10.51.26.png" alt="截屏2021-02-21 上午10.51.26" style="zoom:90%;" />

#### 5.禁止扩展对象

<img src="/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-21 上午10.54.53.png" alt="截屏2021-02-21 上午10.54.53" style="zoom:90%;" />

#### 6.拦截对象操作

![截屏2021-02-21 上午10.55.20](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-21 上午10.55.20.png) 

#### 7.判断是否是自身属性（深拷贝的时候要用到这个东西！！！）

![截屏2021-02-21 上午10.56.14](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-21 上午10.56.14.png) 

#### 8.[[GET]]——不是你所理解的获取值，而是判断某个属性是不是在对象里面

<img src="/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-21 上午10.57.47.png" alt="截屏2021-02-21 上午10.57.47" style="zoom:90%;" />

#### 9.[[set]]

![截屏2021-02-21 上午10.58.27](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-21 上午10.58.27.png)

#### 10.[[delete]]

![截屏2021-02-21 上午10.58.43](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-21 上午10.58.43.png)

#### 11.枚举

![截屏2021-02-21 上午10.59.17](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-21 上午10.59.17.png)

#### 12.获取键集合

![截屏2021-02-21 上午10.59.51](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-21 上午10.59.51.png)

在ES6的标准中，任何的语法和对象相关的内建函数方法都是基于这上面13种内部方法构建出来的

### 重写Proxy，实现下图的功能：defineProperty + 深拷贝

![截屏2021-02-21 上午11.24.35](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-21 上午11.24.35.png)

要用什么东西实现呢？
肯定避免不了要用defineProperty  ？？？？？？？不是说proxy和defineProperty没关系吗？？？？咋又扯上关系了！！！！！

![截屏2021-02-21 上午11.27.21](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-21 上午11.27.21.png)

```javascript
function MyProxy (target, handler) {
  // 这里面涉及深拷贝， 深拷贝怎么写？
  function deepClone (org, tar) {
    var tar = tar || {};
    		toStr = Object.prototype.toString;
    		arrType = '[object Array]'
    for (var key in org) {
      if (org.hasOwnProperty(key)) {
        if (typeof(org[key]) === 'object' && org[key] !== null) {
          tar[key] = toStr.call(org[key]) == arrType ? [] : {};
          deepClone(org[key], tar[key])
        } else {
          tar[key] = org[key];
        }
      }
    }
    return tar;
  }
  let _target = deepClone(target);
  Object.keys(_target).forEach(key => {
    Object.defineProperty(_target, key, {
      get () {
        return handler.get && handler.get(target, key);
      },
      set (newVal) {
        handler.set && handler.set(target, key, newVal);
      }
    })
  })
  return _target;
}
```

68min处～74min处！！！！！！！！！！！！！！！！！！！---80mins

![截屏2021-03-22 上午11.34.55](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-03-22 上午11.34.55.png)

为什么265行会打印出一个false？？？明明proxy里面有a属性！！！

![截屏2021-03-22 上午11.37.13](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-03-22 上午11.37.13.png)

* defineProperty原则上 是给对象增加属性用的。它在修改数组的长度，用索引去设置元素的值，数组的push，pop等这些方法是无法触发defineProperty的set方法的。
* vue2.0 中所以跟数组相关的方法都是重写的。
* vue3.0中没有这个问题！对数组的下标操作完全可以触发set。 

### Reflect 反射 方法集合的容器

reflect是es6直接定义的一个==内置对象==

ES6把对象的十四种方法都放到了Reflect上面！！！

为什么要放到Reflect上面？？？
	因为我们很多对象的方法都是直接放在Object上面的，但是实际上很多方法并不是直接操作Object的。有可能操作函数，有可能操作数组。这种情况下 方法 放在Object下面就不合理！
	往往Object的返回值结果都会抛出异常。

![截屏2021-02-21 下午2.38.25](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-21 下午2.38.25.png)

第251行的处理不太好，因为是一个直接取值的操作。而并不是函数式的。

希望用函数式的东西去操作对象。

![截屏2021-02-21 下午3.06.01](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-21 下午3.06.01.png)

























