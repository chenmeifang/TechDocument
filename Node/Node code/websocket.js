// npm install -g typescript
var websocket = new WebSocket("ws://localhost:8080");
const heartbeatInterval = 30000; // 心跳间隔，单位为毫秒

// 监听连接打开事件
websocket.onopen = function (event) {
    console.log('websocket连接已建立');
    // 连接建立后启动心跳检测
    startHeartbeat()
};

function startHeartbeat() {
    setInterval(()=>{
        websocket.send(JSON.stringify({type: 'ping'}))
    }, heartbeatInterval)
}

websocket.onerror = function (event) {
    console.log('websocket连接报错')
}

websocket.onclose = function (event) {
    console.log('websocket连接已关闭')
}
