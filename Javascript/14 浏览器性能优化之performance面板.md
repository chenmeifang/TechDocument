# 1. performance面板

https://www.bilibili.com/video/BV1SG4y1z78t/?spm_id_from=333.337.search-card.all.click&vd_source=a7089a0e007e4167b4a61ef53acc6f7e

https://blog.csdn.net/qq_35577655/article/details/89674967

<img src="14 浏览器性能优化之performance面板.assets/image-20241020170855982.png" alt="image-20241020170855982" style="zoom:80%;" />

在 Chrome `Performance`（性能）面板中，四条不同颜色的垂直虚线代表了页面加载过程中的关键性能指标。

1. **黄色虚线**：
   
   - **代表：Request Start (请求开始)**
   - 黄色虚线表示浏览器发出第一个网络请求的时间点，即从浏览器发出获取资源请求的那一刻。这个时间点标志着加载开始
   - <img src="14 浏览器性能优化之performance面板.assets/image-20241020181155703.png" alt="image-20241020181155703" style="zoom: 33%;" />
1. **蓝色虚线**：
   - **代表：[DOMContentLoaded 事件](#6.-domcontentloaded事件)**
   - 这条线表示 `DOMContentLoaded` 事件触发的时间点，即浏览器已完成解析 HTML 文档并构建了 DOM 树，但外部资源（如样式表、图片）可能尚未完全加载
2. **绿色虚线**：
   
   - **代表：FP/FCP/LCP**
   
   - **FP：First Paint**。首次绘制。它表示浏览器首次在屏幕上绘制任何内容的时间点，这通常包括背景颜色或页面的框架结构，但不一定包含实际的页面内容
   
   - **FCP：First Contentful Paint**。首次内容绘制。是页面中第一个实际内容(如文本，图片，SVG等)绘制到屏幕上的时间点。比FP更有意义
   
   - 这条线代表FP（首次绘制），表示浏览器第一次绘制任何东西的时间点
   
   - **LCP：Largest Contentful Paint**。LCP记录的是用户在视口中看到的最大内容元素（如图像，视频或文本块）的渲染时间
   
   - LCP 和 FCP 的区别
   
     | 指标         | LCP（Largest Contentful Paint）                | FCP（First Contentful Paint）                        |
     | ------------ | ---------------------------------------------- | ---------------------------------------------------- |
     | **定义**     | 渲染视口中最大的可见内容元素的时间             | 页面首次呈现任何内容的时间                           |
     | **测量内容** | 最大内容元素（如图像、视频或文本块）           | 文本、图像等任何内容（可包括较小的内容）             |
     | **用户感知** | 反映用户看到主要内容的时间，影响用户的整体体验 | 反映页面开始呈现内容的时间，用户第一次感知页面的开始 |
     | **目标值**   | 理想情况下应在 2.5 秒内                        | 理想情况下应在 1 秒内                                |
3. **红色虚线**：
   
   - **代表：L（Onload事件）**
   - 表示页面主要资源的加载完成

# 2. 如何在perfomance面板中查看FCP值

1. **查看 FCP 值**：
   - 在录制结果中，向下滚动，找到名为 **“Timings”**（时间线）的小节。
   - 在这个部分，你可以看到多个关键性能指标的标记，其中包括 **FCP**。
   - `FCP` 通常会标记为 **“First Contentful Paint”**，它表示网页中第一个内容（如文本、图像）绘制到屏幕上的时间点。
2. **FCP 值的位置**：
   - 在“Timings”部分的时间轴上，找到 FCP 的标记，它通常用蓝色小圆点标出。
   - 你可以直接在时间轴上查看 FCP 的具体时间（以毫秒为单位）。鼠标悬停在 FCP 标记上，你可以看到一个提示框显示详细信息，包括具体的 FCP 时间。

提示：

- **FCP（首次内容绘制）** 是衡量网页加载时用户首次能看到有用内容的时间，它是页面体验优化中的重要指标之一。
- 如果你想对这些性能指标进行更深度的分析，结合 `Lighthouse` 或 `Web Vitals` 扩展工具也会提供更详细的 FCP 数据。

# 3. 各种优化

https://web.dev/articles/user-centric-performance-metrics?utm_source=devtools&hl=zh-cn

# 4. 性能文档

https://developer.chrome.com/docs/lighthouse/performance/first-contentful-paint?utm_source=devtools&hl=zh-cn

# 5. load事件

https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event

**The `load` event is fired when the whole page has loaded, including all dependent resources such as stylesheets, scripts, iframes, and images, except those that are [loaded lazily](https://developer.mozilla.org/en-US/docs/Web/Performance/Lazy_loading#images_and_iframes).** This is in contrast to [`DOMContentLoaded`](https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event), which is fired as soon as the page DOM has been loaded, without waiting for resources to finish loading.

# 6. DOMContentLoaded事件

https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event

The **`DOMContentLoaded`** event fires **when the HTML document has been completely parsed**, and all deferred scripts (省略了一些内容，需查看原链接) have downloaded and executed. **It doesn't wait for other things like images, subframes, and async(异步) scripts to finish loading.**

`DOMContentLoaded` does not wait for stylesheets to load, however deferred scripts *do* wait for stylesheets, and the `DOMContentLoaded` event is queued after deferred scripts. Also, scripts which aren't deferred or async (e.g. `<script>`) will wait for already-parsed stylesheets to load.

A different event, [`load`](https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event), should be used only to detect a fully-loaded page. It is a common mistake to use `load` where `DOMContentLoaded` would be more appropriate.



DOMContentLoaded事件：

- 初始的HTML被完全加载和解析完成后触发，而无需等待样式表，图片和子资源的加载
- “当初始的HTML被完全加载和解析完成”**并不意味着DOM已经显示在页面中**。
- DOMContentLoaded事件只表示浏览器已经将HTML解析成了DOM树，JS已经可以安全地访问和操作这些DOM元素。但是浏览器不一定完成了页面的渲染。页面上可能还在加载其他资源（如图片，样式表等），因此页面可能尚未完全显示出来



