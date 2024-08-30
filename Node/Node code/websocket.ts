// npm install -g typescript
const websocket = new WebSocket("http://localhost:4000");
// 监听连接打开事件
websocket.onopen = function (event) {
    console.log('websocket连接已建立')
}