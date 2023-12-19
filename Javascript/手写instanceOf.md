instanceOf和typeof的区别：

* typeof 一般只能返回如下几个结果：number,boolean,string, undefined,object,function

* typeof 运算符总是会返回一个字符串：

* typeof没有办法去判断null，Array，Object， RegExp，Date这几个类型。因为均返回object。

* 但是貌似instanceof貌似也没办法判断Array和Object！！！(instanceof 不能判断不是new出来的Array和Object)

* ```js
  var a = [34,4,3,54],
      b = 34,
      c = 'adsfas',
      d = function(){console.log('我是函数')},
      e = true,
      f = null,
      g,
  		h = {a: 1},
      i = new Date()
  
  console.log(typeof(a));//object
  console.log(typeof(b));//number
  console.log(typeof(c));//string
  console.log(typeof(d));//function
  console.log(typeof(e));//boolean
  console.log(typeof(f));//object
  console.log(typeof(g));//undefined
  console.log(typeof(h));//object
  console.log(typeof(i));//object
  ```

https://www.bilibili.com/video/BV1if4y1v7nk?from=search&seid=5413649168285046364

![截屏2021-03-16 下午7.21.50](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-03-16 下午7.21.50.png)

![截屏2021-03-16 下午7.24.02](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-03-16 下午7.24.02.png)

![截屏2021-03-16 下午7.25.13](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-03-16 下午7.25.13.png)

前面三个结果都是false！！！！

![截屏2021-03-16 下午7.26.10](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-03-16 下午7.26.10.png)

问题：==简单数据类型==如果申明方式不是构造函数声明方式，instanceof失败。

引用数据类型不会有上面的问题。

![截屏2021-03-16 下午7.27.17](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-03-16 下午7.27.17.png)

![截屏2021-03-16 下午7.30.31](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-03-16 下午7.30.31.png)  

==由于原型链最后都是Object，所以instanceof判断模糊，是指下面的情况：==

![截屏2021-03-17 下午6.38.05](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-03-17 下午6.38.05.png)

手动封装instanceof：

  ![截屏2021-03-16 下午7.33.50](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-03-16 下午7.33.50.png)

优化：上面原型链短了！！！！！

![截屏2021-03-16 下午7.37.50](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-03-16 下午7.37.50.png)

注意：while的用法。

只要while中return了 整个while就终止了。并且return的值是while所在函数的返回值。

因为Object才有toString方法，数组和字符串是没有toString方法，需要通过call借调

![ ](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-03-16 下午7.42.49.png)

   





























