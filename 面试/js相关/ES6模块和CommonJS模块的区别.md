AMD推崇依赖前置  对

CMD推崇依赖就近 对

Sea.js遵循AMD规范，RequireJS遵循CMD规范  错

主流的模块化包括CommonJS，AMD，CMD

### 1.commonjs是用在==服务器端==，==同步==的 如nodejs

* 根据CommonJS规范，一个单独的文件就是一个模块。加载模块使用require方法，该方法读取一个文件并执行，最终返回文件内部的exports对象
* CommonJS加载模块是同步的，所以只有加载完成才能执行后面的操作
* NodeJS主要用于服务器的编程，加载的模块文件一般都已经存在于本地硬盘，所以加载起来快，不用考虑异步加载的方式，所以CommonJS规范比较适用
* 但如果是浏览器环境，要从服务器加载模块，这就必须采用异步加载模式，所以就有了AMD，CMD解决方案

### 2.amd，cmd是用在浏览器端，异步的，如requirejs和seajs

​	AMD是RequireJS在推广过程中对模块定义的规范化产出。

---

# ES6模块和CommonJS模块的区别：

https://blog.csdn.net/qq_36772866/article/details/88757140

## ES6模块：

* Import
* export
* ES6模块中的值属于”动态只读引用“
  * 对于只读来说，即不允许修改引入变量的值，import的变量是只读的，不论是基本数据类型还是复杂数据类型
  * 对于动态来说，原始值发生变化，import加载的值也会发生变化。不论是基本数据类型还是复杂数据类型
* 当模块遇到import命令时，就会生成一个只读引用.等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。
* 循环加载时，ES6模块是动态引用。只要

## CommonJS模块：

* require：
  * 当使用require命令加载某个模块时，就会运行整个模块的代码
  * 当市容require命令加载同一模块时，不会再执行该模块，而是取到缓存之中的值。也就是说，CommonJS模块无论加载多少次，都只会在第一次加载时运行一次，以后再加载，就返回第一次运行的结果，除非手动清除系统缓存。
  * ？？？？？？？？循环加载时？？？，属于加载时执行。即脚本代码在require的时候，就会全部执行。一旦出现某个模块被”循环加载“，就只输出已经执行的部分？？？？？还未执行的部分不会输出。？？？？？
* module.exports，
* 对于基本数据类型属于复制；对于复杂数组数据类型，属于浅拷贝





---



https://www.bilibili.com/video/BV18s411E7Tj?from=search&seid=5492010810231329086

# 1 模块化入门介绍

## 1.1理解

### 1.1.1 什么是模块/模块化？

### 1.1.2 为什么要模块化？

### 1.1.3 模块化的好处

* 避免命名冲突（减少命名空间污染）
* 更好的分离，按需加载
* 更高复用性
* 高可维护性

### 1.1.4 页面引入加载script

模块化带来的问题：

* 请求过多
* 依赖模糊
* 难以维护

## 1.2 模块化规范

## 1.3 扩展阅读

# 2 模块进化史

2.1 全局function模式：

![截屏2021-03-25 下午12.59.20](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-03-25 下午12.59.20.png)

2.2 namespace模式： ![截屏2021-03-25 下午1.00.41](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-03-25 下午1.00.41.png)

2.3 IIFE

![截屏2021-03-25 下午1.03.44](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-03-25 下午1.03.44.png)

 ![截屏2021-03-25 下午1.05.52](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-03-25 下午1.05.52.png)

2.4 IIFE模式增强——引入依赖

![截屏2021-03-25 下午1.07.50](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-03-25 下午1.07.50.png)

![截屏2021-03-25 下午1.10.33](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-03-25 下午1.10.33.png)

# 第三节： CommonJs基于服务器端（node）应用

node就是基于CommonJS这种模块化来编写的！！

## 3.1 规范

### 3.1.1 说明：

* 每个js文件都可当做一个模块
* 在服务器端：模块的加载时运行时同步加载的（加载的模块文件一般都已经存在于本地硬盘，所以加载起来快，不用考虑异步加载的方式，）
* 在浏览器端：模块需要提前编译打包处理

在浏览器端使用commonJS会有问题

commonjs中有require语法，浏览器引擎不认识。

所以如果要在浏览器端使用commonjs规范，需要提前编译打包处理。

### 3.1.2 基本语法

module.exports = value

exports.xxx = value

![截屏2021-03-25 下午1.44.25](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-03-25 下午1.44.25.png)

## 3.2 实现

# 第四节：CommonJS基于浏览器端应用

**browserify**

# 第五节： AMD规范 看到6min处

专门用于浏览器端，模块的加载是异步的！！！

AMD规范其实是比CommonJS浏览器端的实现要早。 

![截屏2021-03-25 下午2.41.35](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-03-25 下午2.41.35.png) 

![截屏2021-03-25 下午2.43.52](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-03-25 下午2.43.52.png)  

![截屏2021-03-25 下午2.44.13](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-03-25 下午2.44.13.png)



































