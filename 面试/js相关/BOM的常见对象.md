https://www.cnblogs.com/vicky1018/p/7692386.html

BOM（Browser Object Mode）浏览器对象模型，是Javascript的重要组成部分。它提供了一系列对象用于与浏览器窗口进行交互，这些对象通常统称为BOM。

![截屏2021-03-29 下午8.39.36](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-03-29 下午8.39.36.png)

 **1、window 对象——BOM核心**

window，顾名思义，窗口对象。它表示整个浏览器窗口，主要用来操作浏览器窗口。同时， window对象还是 ECMAScript 中的 Global 对象，因而所有全局变量和函数都是它的属性，且所有原生的构造函数及其他函数也都存在于它的命名空间下。

　　弹框类的方法。前面省略window：

* alert('提示信息')
* confirm("确认信息")
* prompt("弹出输入框")
* open("url地址"，“_black或_self”，“新窗口的大小”）
* close()  关闭当前的网页

 **2、document 对象: ==可以用来处理页面文档==**

它是window对象的一个属性

**3、location 对象:==对象用于获得当前页面的地址 (URL)，并把浏览器重定向到新的页面。==**

* location.herf = 'url地址'
* location.hostname 返回 web 主机的域名
* location.pathname 返回当前页面的路径和文件名
* location.port 返回 web 主机的端口 （80 或 443）
* location.portocol 返回页面使用的web协议。 http:或https:

![截屏2021-03-29 下午8.44.12](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-03-29 下午8.44.12.png)

**4、navigator 对象: ==对象提供了与浏览器有关的信息。userAgent是最常用的属性，用来完成浏览器判断==**

![截屏2021-03-29 下午8.45.32](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-03-29 下午8.45.32.png)

**5、screen 对象: ==主要用来获取用户的屏幕信息。==**

* height: 获取整个屏幕的高。
* width : 获取整个屏幕的宽。
* availHeight: 整个屏幕的高减去系统部件的高（ 可用的屏幕宽度 ）
* availWidth : 整个屏幕的宽减去系统部件的宽（可用的屏幕高度 ）

![截屏2021-03-29 下午8.47.40](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-03-29 下午8.47.40.png)

**6、history 对象: ==对象包含浏览器的历史。==**

* back() 返回上一页。
* forward() 返回下一页。
* go(“参数”) -1表示上一页，1表示下一页。

![截屏2021-03-29 下午8.49.10](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-03-29 下午8.49.10.png)





























