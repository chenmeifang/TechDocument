# [1. var/let/const的基本使用](https://www.bilibili.com/video/BV1zd4y1X7ky?p=3&vd_source=a7089a0e007e4167b4a61ef53acc6f7e)

<img src="05 let 和 var 和 const.assets/image-20240221215634103.png" alt="image-20240221215634103" style="zoom: 75%;" />

# [2. let/const的作用域提升](https://www.bilibili.com/video/BV1zd4y1X7ky/?p=4&spm_id_from=pageDriver&vd_source=a7089a0e007e4167b4a61ef53acc6f7e)

```javascript
console.log(foo); // undefined
var foo = "foo";
```

用var声明一个变量，这个变量是会进行**作用域提升**的

所以在第二行执行之前，在第一行是可以访问到foo的

因为在对代码进行解析的时候，就已经知道有foo了

-------------------



```javascript
console.log(foo);
let foo = "foo";
```

会报错：

![image-20240221224712248](05 let 和 var 和 const.assets/image-20240221224712248.png)

## 2.1 结论：let/const是没有作用域提升的



<img src="05 let 和 var 和 const.assets/image-20240221225237317.png" alt="image-20240221225237317" style="zoom: 50%;" />



- [ ] 词法环境（LexicalEnvironment）是指啥？

  如果一份代码准备运行，它会先在我们的调用栈中给我们创建一个**执行上下文**，

  在执行上下文里面，有一个东西叫词法环境（在创建执行上下文的时候，其实会创建一个词法环境）
  
  

<img src="05 let 和 var 和 const.assets/image-20240221230547079.png" alt="image-20240221230547079" style="zoom:60%;" />

# [3. let/const和window的关系](https://www.bilibili.com/video/BV1zd4y1X7ky?p=5&vd_source=a7089a0e007e4167b4a61ef53acc6f7e)

<img src="05 let 和 var 和 const.assets/image-20240223222941925.png" alt="image-20240223222941925" style="zoom:80%;" />



<img src="05 let 和 var 和 const.assets/image-20240223224258995.png" alt="image-20240223224258995" style="zoom: 80%;" />

# [4. ES6新增的块级作用域](https://www.bilibili.com/video/BV1zd4y1X7ky?p=6&vd_source=a7089a0e007e4167b4a61ef53acc6f7e)

## 4.1 块级作用域的理解

- 在ES5及之前，在JS中压根没有块级作用域

- ```javascript
  // 块代码
  {
      var foo = 'foo'
  }
  // 在很多语言里面，在块代码的外面是不能访问foo变量的
  // 因为块有自己的作用域，自己的作用域就意味着在自己里面声明的东西只能在自己内部被访问
  ```

- 但是在早期的js里面，没有块级作用域

- 在es5里面，只有两个东西会形成作用域：

  - 全局作用域
  - 函数作用域

- es6中开始有块级作用域

- 但是**块级作用域针对var声明的变量是无效的**

- 只对let/const/function/class声明的类型有效

  - ![image-20240313204639879](05 let 和 var 和 const.assets/image-20240313204639879.png)


## 4.2 块级作用域的应用场景

页面中有四个按钮，监听四个按钮的点击，并且输出现在点击的是第几个按钮



# 3.var：

**1.可以重复声明**

```js
var a=12; var a=5; alert(a); // 5 
```

2.无法限制修改

```js
PI=3.1415926
```

3.没有块级作用域

```js
{    // 块级作用域是指在这里面定义一个变量，在外面用不了 } 
  if (true) {    var a=12; } alert(a) // 12
```

# 4.let:

**1.不能重复声明**

```js
let a=12; let a=5; alert(a); // Identifier 'a' has already been declared 
```

2.变量

3.有块级作用域

```js
if (true) {    let a=12; } alert(a) // a is not defined
```

# 5.const:

1. **不能重复声明**
2. 常量
3. 有块级作用域



# 字面量的增强

https://www.bilibili.com/video/BV1zd4y1X7ky?p=1

