https://www.kancloud.cn/lixu/interview/925585 面试题集合 可以看一下！

# rem可以解决移动端的适配问题

1. 移动端的适配问题具体是怎样的？

   1. 手机端适配 因为市面上各种分辨率 设备宽度不同的 手机太多 这个时候我们可以采用 将
      根元素 字体大小固定的方式 来实现适配 手机端

   2. 就拿750宽度的设计稿来说吧

      > 这段代码十分重要！！！

      ```javascript
      function setRootFontSize() {
      	var width = document.documentElement.clientWidth, fontSize;
      	if (width > 750) { width = 750 }
      	fontSize = (width / 7.5);//这里除于7.5的意思就是100px等于1rem;
      	// document.html.style.fontSize=fontSize+'px';
      	document.getElementsByTagName('html')[0].style['font-size'] = fontSize + 'px';	
      }	
      setRootFontSize();	
      window.addEventListener('resize', function() {
      	setRootFontSize();
      }, false);
      ```

   这样把 font-size 成固定的一个值

   在 750设计稿 上 200px 就是 2rem

   如果设计的页面到了 650的手机上 为了保证页面的显示效果相同

   `**此时的 2rem 在 650宽度额手机上就是 173px会相对的缩小一点**. 这里没理解！！！！？？？？？懂了

   如果还保持　750中的200px 可能会超出屏幕 给用户体验也不太好

   如果在 650宽度的手机测量出来是 200px的话

   计算方式: 650/7.5=200/x x=200*7.5/650 算出来是 x=2.307rem 明显比750大一点

   

2. rem又是如何解决的？

https://yunchong.blog.csdn.net/article/details/104854398

* rem是相对单位 相对于 html根元素　
* em这块是相对于父元素继承来的。em 虽然指的是当前元素的 字体大小 但是当前元素的字体大小没有设置的话 就是继承它的父元素的 字体大

