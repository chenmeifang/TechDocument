https://segmentfault.com/q/1010000000640869

当浏览器碰到 `script` 脚本的时候：

1. <script src="script.js"></script>

   1. 没有 `defer` 或 `async`，浏览器会立即加载并执行指定的脚本，“立即”指的是在渲染该 `script` 标签之下的文档元素之前，也就是说不等待后续载入的文档元素，读到就加载并执行。

      

2. <script async src="script.js"></script>

   1. 有 `async`，加载和渲染后续文档元素的过程将和 `script.js` 的加载与执行并行进行（异步）。

      

3. <script defer src="myscript.js"></script>

   1. 有 `defer`，加载后续文档元素的过程将和 `script.js` 的加载并行进行（异步），但是 `script.js` 的执行要在所有元素解析完成之后，`DOMContentLoaded` 事件触发之前完成。

读完之后并没有理解！！！

![截屏2021-03-29 下午9.35.38](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-03-29 下午9.35.38.png)

绿色线：HTML解析

蓝色线：代表网络读取（针对脚本）

红色线：代表执行时间（针对脚本）

看完这个图还是没懂

----

![截屏2021-03-29 下午9.39.27](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-03-29 下午9.39.27.png)

1.The HTML file will be parsed until the script file is hit，at that point parsing will stop and a request will be made to fetch the file(if it's external). The script will then be executed before parsing is resumed.

2.async: downloads the file during HTML parsing and will pause the HTML parser to execute it when it has finished downloading

3.defer: downloads the file during HTML parsing and will only execute it after the parser has completed. Defer scripts are also guarenteed to execute in the order that they appear in the document.

虽然图很清晰，但是看了之后仍然记不住。

==因为不清楚为什么HTML parsing和Script download可以同时进行，但是HTML parsing和Script execution不可以同时进行？==

* 理解HTML parsing和Script execution不可以同时进行，因为这两个动作都是在==渲染器进程的主线程==执行！！
* 但是依旧不清楚为什么HTML parsing和Script download可以同时进行？即为什么HTML解析和js文件下载可以同时进行
  * 猜测：js文件的下载是在浏览器进程的UI线程，然后UI线程唤醒浏览器进程的网络线程，网络线程去服务器请求js文件，然后传回浏览器的UI线程。接着从浏览器进程通过IPC管道将js文件传送到渲染器进程。最后在渲染器进程的主线程执行该js文件。
* 为什么推荐script标签写在body里面？

https://www.bilibili.com/video/av330795664/

当浏览器加载HTML的时候一旦遇到了script标签，就会停下来先把script标签里面的内容给执行掉。如果script标签里面有外部文件，那就必须等待下载和执行的步骤。这样浏览器才会继续往下加载。如果外部文件刚好是在一个网络情况比较差的服务器上，这样整个页面的加载都会受到很大的影响。

以上就是同步带来的阻塞弊端。

async和defer都可以解决这个问题

async：浏览器加载页面的时候如果遇到了async属性，浏览器就会立即进行下载，与此同时继续加载页面。这样就解决了阻塞的问题。  虽然没有阻塞的情况，但是async下的脚本具体什么时候执行就说不定了。？？？？有时页面还没加载完就执行了， 也有可能页面加载后才会执行。因为这种不确定性。如果脚本是需要修改DOM的，那么就有可能出错了。==因此async比较适合一些第三方脚本==。那么使用defer来进行推迟执行就很有必要了。

==为什么async会有这种不确定性？？？？==

defer：浏览器加载页面的时候如果遇到了defer属性，浏览器就会立即进行下载，与此同时继续加载页面。但是不管脚本是否下载完了，都会等到浏览器解析完html后再执行脚本。==因此defer比较适合与DOM有关联的脚本==

`注意：`不管是async还是defer，两者都只适用于外部脚本。而且还要注意兼容性的问题，如果浏览器不能识别这两个属性，那还是把script内容放在页面底部比较好

---

https://www.growingwiththeweb.com/2014/02/async-vs-defer-attributes.html

## When should I use what?[#](https://www.growingwiththeweb.com/2014/02/async-vs-defer-attributes.html#when-should-i-use-what)

Typically you want to use `async` where possible, then `defer` then no attribute. Here are some general rules to follow:

- If the script is modular and does not rely on any scripts then use `async`.
- If the script relies upon or is relied upon by another script then use `defer`.？？？？？？
- If the script is small and is relied upon by an `async` script then use an inline `script` with no attributes placed *above* the `async` scripts.？？？？？？





























































