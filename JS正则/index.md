# 一 转义符号 与 转义字符 

![截屏2021-02-18 下午6.13.32](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-18 下午6.13.32.png)

 ![截屏2021-02-18 下午6.17.28](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-18 下午6.17.28.png)

![截屏2021-02-18 下午7.03.19](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-18 下午7.03.19.png)

![截屏2021-02-18 下午7.06.58](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-18 下午7.06.58.png)

报错：因为js默认是不允许字符串多行的。

![截屏2021-02-18 下午7.09.23](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-18 下午7.09.23.png)

# 二 正则表达式基础 

50min处

逻辑+公式

match 方法不加g的话只能匹配出来一个。

![截屏2021-02-18 下午8.17.07](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-18 下午8.17.07.png)

**连续的匹配**是什么意思？

![截屏2021-02-18 下午8.31.55](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-18 下午8.31.55.png)

![截屏2021-02-18 下午8.32.22](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-18 下午8.32.22.png)

匹配过的字符不会再去挨了！

```javascript
var reg = /[wx][xy][z]/g,
		str = 'wxyz';
str.match(reg);
// ["xyz"]
```

![截屏2021-02-18 下午8.52.51](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-18 下午8.52.51.png)

# 三 元字符

113min处

![截屏2021-02-18 下午9.03.42](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-18 下午9.03.42.png)































