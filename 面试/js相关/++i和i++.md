```javascript
var i = 1
var a = i++; // 先赋值，再加1
console.log('i:', i) // 2
var b = ++i; // 先加1，再赋值
console.log('a:', a) // 1
console.log('b:', b) // 3
// i++和++i都会自增，只是i++隐藏了没有表现出来

// 从自身来看，i++和++i都等同于i=i+1
// 但是除此之外，它们还跟赋值联系在一起
// a = i++ 将i的值赋给a，即a=i,之后再执行i=i+1;
// a = ++i 将i+1的值赋给a，即a=i+1,之后再执行i=i+1;++i 与 i++的区别在
```

https://baijiahao.baidu.com/s?id=1667898816717486345&wfr=spider&for=pc

下面的图看不懂

我们经常会被问到i++与++i的区别，一般我们都会这样回答：i++表示，先返回再加1，++i表示，先加1再返回。

但这只是宏观层面的，**那它的底层是怎么样的呢? **

![截屏2021-02-28 下午1.22.02](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-28 下午1.22.02.png)

![截屏2021-02-28 下午1.22.22](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-28 下午1.22.22.png)

---

http://blog.itpub.net/31561266/viewspace-2222093/

i++ 和 ++i 这两个操作，在内部是如何实现的呢？

首先我们先来看看 i++ 的题，主要是为了后面好解释点。

```
int i = 1;
System.out.println(i++);
```

这两行代码的部分汇编指令如下，注意，我只列出了几个重点的汇编语句：

```
ICONST_1 //把常量 1 加载到栈顶
ISTORE 1 //把栈顶的元素弹出，并赋值给局部变量表中位置为“1”的变量，此时指变量i。这两句就相当于 int i = 1;

//接下来执行第二行代码
ILOAD 1  //把局部变量表中位置为“1”的变量加载到栈顶，即把i的值加载到栈顶
IINC 1 1  //直接把局部变量表中位置为“1”的变量加1，即把 i 加1。注意，这条指令并没有修改操作数栈就把 i 加1了。
INVOKEVIRTUAL java/io/PrintStream.println (I)V  //把栈顶的元素打印出来，此时栈顶的元素是 1。所以打印的是 1
```

搞清楚“局部变量表”和“操作数栈”这两个东西！！！

那我们来看看 ++ i 与 i ++ 的汇编指令有什么不同。

```
int i = 1;
System.out.println(++i);
```

对应的部分重点汇编指令如下：

```
//和上面i++差不多，不过IINC 1 1 和ILOAD 1这两句的顺序调换了。
ICONST_1
ISTORE 1
IINC 1 1 //直接把局部变量表中位置为“1”的变量加1
ILOAD 1  //把位置“1”的变量压到栈顶，此时栈顶的元素是 2
INVOKEVIRTUAL java/io/PrintStream.println (I)V //所以打印的是2
```

#### --遇到运算符就在局部变量表进行操作

#### --遇到变量就把变量压入栈



接下来我们来分析这个程序

```
int i = 1;
System.out.println(i+++i++); // 3
System.out.println(i); // 3
```

这里先说一下，按照运算符号的优先顺序，i+++i++等价于 (i++) + (i++)。

对应的部分汇编指令如下：

```
//第一行
ICONST_1
ISTORE 1
//第二行
ILOAD 1
IINC 1 1
ILOAD 1
IINC 1 1
IADD  //把栈顶的两个元素弹出相加之后在把结果放回栈顶
INVOKEVIRTUAL java/io/PrintStream.println (I)V
//第三行
ILOAD 1
INVOKEVIRTUAL java/io/PrintStream.println (I)V
```













































