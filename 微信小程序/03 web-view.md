# 1. 示例

**小程序页面 `wxml`**：

```xml
<web-view id="webView" src="https://example.com" bindmessage="onWebMessage"></web-view>
```

**小程序逻辑文件 `js`**：

```javascript
Page({
  onLoad: function () {
    const webView = this.selectComponent('#webView'); // 获取 web-view 实例
    // 发送消息给嵌入网页
    webView.postMessage({
      data: {
        action: 'init',
        info: 'Hello from WeChat Mini Program'
      }
    });
  },

  // 使用 bindmessage 接收 web-view 的消息
  onWebMessage: function (e) {
    console.log('Received message from web:', e.detail);
    // 你可以在这里处理消息并执行相应操作
  }
});
```

**嵌入的网页内容**：

```html
<script type="text/javascript">
  window.addEventListener('message', (event) => {
    // 接收到来自小程序的消息
    console.log('Message from Mini Program:', event.data);
    // 可以在这里处理并回复小程序
    window.postMessage({ type: 'response', data: 'Received message' }, '*');
  });
</script>
```