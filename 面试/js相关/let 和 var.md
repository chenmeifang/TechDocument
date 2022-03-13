![let and var](/Users/chenmeifang/Desktop/typora/图片/let and var.png)

我选的是D

![截屏2021-03-18 下午12.39.00](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-03-18 下午12.39.00.png)

怎么感觉没有正确选项！！！这是在浏览器执行的结果

在控制台执行的结果：

![截屏2021-03-18 下午12.40.17](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-03-18 下午12.40.17.png)

### var：

1.可以重复声明

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

### let:

1.不能重复声明

```js
let a=12; let a=5; alert(a); // Identifier 'a' has already been declared 
```

2.变量

3.有块级作用域

```js
if (true) {    let a=12; } alert(a) // a is not defined
```

### const:

1. 不能重复声明
2. 常量
3. 有块级作用域