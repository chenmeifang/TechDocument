# 1.生命周期

## Vue：

<img src="/Users/chenmeifang/Desktop/typora/图片/lifecycle.png" alt="lifecycle" style="zoom: 48%;" />

1. new Vue（）：表示开始创建一个Vue的实例对象
2. Init Events & Lifecycle ：表示刚初始化了一个Vue空的实例对象，这个对象身上只有默认的一些生命周期函数和默认的事件，其他的东西都未创建
3. beforeCreate：表示实例完全被创建出来之前会执行它  注意：在beforeCreate生命周期函数执行的时候，data和methods中的数据还没有被初始化
4. init injections & reactivity
5. created：在created中，data和methods都已经被初始化好了，如果要调用methods中的方法或者操作data中的数据，最早只能在created中操作
6. Vue开始编译模版，把Vue代码中的那些指令进行执行，最终在内存中生成一个编译好的最终模版字符串（==？？？==），然后把这个模版字符串渲染为内存中的DOM，此时只是在内存中，渲染好了模版，并没有把模版挂载到真正的页面中去
7. beforeMount：表示模版已经在内存中编辑好了，但是尚未把模版渲染到页面中  在beforeMount执行的时候，页面中的元素还没有被真正替换过来，只是之前写的一些模版字符串
8. mounted：表示内存中的模版已经真实的挂载到了页面中，用户已经可以看到渲染好的页面了 mounted是实例创建期间的最后一个生命周期函数，当执行完mounted就表示实例已经完全被创建好了，此时如果没有其他操作的话，这个实例就静静的躺在我们的内存中一动不动【如果要通过某些插件操作页面上的DOM节点了，最早要在mounted中进行】
9. beforeUpdate：表示界面还没有被更新【但数据已经被更新了】当执行beforeUpdate的时候，页面中的显示的数据还是旧的，此时data数据是最新的，页面尚未和最新的数据保持同步
10. Virtual DOM re-render and patch：（内存中的DOM树重新渲染挂载） 当我们执行完beforeUpdate会把data中的数据先在内存里面先更新出一份最新的虚拟DOM，然后再把内存中的DOM应用到页面中去【这一步执行的是：先根据data中最新的数据在内存中重新渲染出一份最新的内存DOM树，当内存中DOM树被更新之后，会把最新的内存DOM树重新渲染到真实的页面中去，这时候就完成了数据从data(Model层)-->view(视图层)的更新】

## 小程序： 

1. onLoad：页面创建时执行
2. onShow：页面出现在前台时执行
3. onReady：页面首次渲染完毕时执行

![page-lifecycle.2e646c86](/Users/chenmeifang/Desktop/typora/图片/page-lifecycle.2e646c86.png)

4. onHide：页面从前台变为后台时执行
5. onUnload：页面销毁时执行

# 2.数据绑定

vue：vue动态绑定一个变量的值为元素的某个属性的时候，会在变量前面加上冒号：，例：

```html
<img :src="imgSrc"/>
```

小程序：绑定某个变量的值为元素属性时，会用两个大括号括起来，如果不加括号，为被认为是字符串。例：

```html
<image src="{{imgSrc}}"></image>
```

# 3.渲染层和逻辑层

1. 网页开发==渲染线程==和==脚本线程==是互斥的，这也是为什么长时间的脚本运行可能会导致页面失去响应。
2. 而在小程序中，==渲染线程==和==脚本线程==是分开的，分别运行在不同的线程中。
3. 网页开发者可以使用到各种浏览器暴露出来的 DOM API，进行 DOM 选中和操作。
4. 而如上文所述，小程序的逻辑层和渲染层是分开的，逻辑层运行在 JSCore 中，并没有一个完整浏览器对象，因而缺少相关的DOM API和BOM API。这一区别导致了前端开发非常熟悉的一些库，例如 jQuery、 Zepto 等，在小程序中是无法运行的。同时 JSCore 的环境同 NodeJS 环境也是不尽相同，所以一些 NPM 的包在小程序中也是无法运行的。
5. 网页开发者需要面对的环境是各式各样的浏览器，PC 端需要面对 IE、Chrome、QQ浏览器等，在移动端需要面对Safari、Chrome以及 iOS、Android 系统中的各式 WebView 。而小程序开发过程中需要面对的是两大操作系统 iOS 和 Android 的微信客户端，以及用于辅助开发的小程序开发者工具，小程序中三大运行环境也是有所区别的

| **运行环境**     | **逻辑层**     | **渲染层**       |
| :--------------- | :------------- | :--------------- |
| iOS              | JavaScriptCore | WKWebView        |
| 安卓             | V8             | chromium定制内核 |
| 小程序开发者工具 | NWJS           | Chrome WebView   |

* 小程序的运行环境分成渲染层和逻辑层，其中 WXML 模板和 WXSS 样式工作在渲染层，JS 脚本工作在逻辑层。
* 小程序的渲染层和逻辑层分别由2个线程管理：渲染层的界面使用了WebView 进行渲染；逻辑层采用JsCore线程运行JS脚本。一个小程序存在多个界面，所以渲染层存在多个WebView线程，==这两个线程的通信会经由微信客户端（下文中也会采用Native来代指微信客户端）做中转==，逻辑层发送网络请求也经由Native转发，小程序的通信模型下图所示。
* ![4-1.ad156d1c](/Users/chenmeifang/Desktop/typora/图片/4-1.ad156d1c.png)
* 整个小程序框架系统分为两部分：**[逻辑层](https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/)**（App Service）和 **[视图层](https://developers.weixin.qq.com/miniprogram/dev/framework/view/)**（View）。小程序提供了自己的视图层描述语言 `WXML` 和 `WXSS`，以及基于 `JavaScript` 的逻辑层框架，并在视图层与逻辑层间提供了数据传输和事件系统，让开发者能够专注于数据与逻辑。
* 小程序开发框架的逻辑层使用 `JavaScript` 引擎为小程序提供开发者 `JavaScript` 代码的运行环境以及微信小程序的特有功能。
* 逻辑层将数据进行处理后发送给视图层，同时接受视图层的事件反馈。
* 开发者写的所有代码最终将会打包成一份 `JavaScript` 文件，并在小程序启动的时候运行，直到小程序销毁。这一行为类似 [ServiceWorker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)，所以逻辑层也称之为 App Service。
* **小程序框架的逻辑层并非运行在浏览器中，因此 `JavaScript` 在 web 中一些能力都无法使用，如 `window`，`document` 等。**















