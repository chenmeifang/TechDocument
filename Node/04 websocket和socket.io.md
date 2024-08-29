# 0. websocket在网络层面的连接过程

WebSocket 是一种网络通信协议，旨在通过单个 TCP 连接提供**全双工通信**。它主要用于在客户端和服务器之间建立持久连接，以便进行实时数据传输。下面详细描述 WebSocket 的网络层面连接过程：

### 1. **TCP 连接建立**
   - **客户端发起连接**: WebSocket 连接建立之前，客户端首先通过标准 HTTP 协议向服务器发起一个请求，这个请求实际上是一个 HTTP 升级请求（HTTP Upgrade）。
   - **三次握手**: 在发送 HTTP 请求之前，客户端与服务器之间会先进行 TCP 三次握手，确保 TCP 连接已经建立。

### 2. **HTTP 升级请求**
   - **发出 Upgrade 请求**: 客户端通过 HTTP GET 请求中的 `Upgrade` 头部发起 WebSocket 连接请求。请求头包含以下关键字段：
     - `Upgrade: websocket`: 表示请求升级为 WebSocket 协议。
     - `Connection: Upgrade`: 指定请求是一次协议升级请求。
     - `Sec-WebSocket-Key`: 一个 Base64 编码的随机字符串，用于服务器生成 `Sec-WebSocket-Accept`，确保连接是从可信任的客户端发起的。
     - `Sec-WebSocket-Version`: 客户端支持的 WebSocket 协议版本（通常是 13）。
     
   ```http
   GET /chat HTTP/1.1
   Host: server.example.com
   Upgrade: websocket
   Connection: Upgrade
   Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
   Sec-WebSocket-Version: 13
   ```

### 3. **服务器响应**
   - **协议升级**: 服务器接收到升级请求后，会验证请求头中的 `Sec-WebSocket-Key`，然后返回一个 101 Switching Protocols 的响应，表示协议切换成功。响应头包含以下关键字段：
     - `Upgrade: websocket`: 确认协议升级为 WebSocket。
     - `Connection: Upgrade`: 确认连接协议的升级。
     - `Sec-WebSocket-Accept`: 服务器根据客户端的 `Sec-WebSocket-Key` 生成的一个加密字符串，用于校验连接请求。

   ```http
   HTTP/1.1 101 Switching Protocols
   Upgrade: websocket
   Connection: Upgrade
   Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
   ```

### 4. **WebSocket 连接建立**
   - **全双工通信**: 经过上述步骤，WebSocket 连接成功建立，客户端和服务器之间的通信切换为 WebSocket 协议，允许双方在这个连接上发送和接收数据包。
   - **持续连接**: 连接建立后，双方可以在不需要重建连接的情况下，持续发送消息，直到连接被显式关闭。WebSocket 支持全双工通信，因此服务器可以随时主动向客户端推送消息，而客户端也可以随时向服务器发送数据。

### 5. **数据帧传输**
   - **数据分帧**: WebSocket 通过数据帧的形式在客户端与服务器之间传输消息。每个数据帧包含数据类型（如文本、二进制数据、关闭帧、ping/pong 帧等）和实际数据。
   - **帧结构**:
     - **帧头**: 包含操作码、数据长度、掩码标志等。
     - **有效载荷**: 实际传输的数据内容。

   - **掩码处理**: 在 WebSocket 中，所有从客户端发送到服务器的数据帧都必须进行掩码处理，以增强数据的安全性。服务器响应的数据则不需要掩码处理。

### 6. **连接关闭**
   - **发送关闭帧**: 客户端或服务器可以通过发送关闭帧来终止连接。关闭帧中包含关闭状态码和可选的关闭原因。
   - **TCP 四次挥手**: 关闭帧发送后，底层的 TCP 连接将进入四次挥手的过程，彻底关闭连接。

### 总结
WebSocket 连接从建立到关闭，经历了 TCP 握手、HTTP 升级请求、协议切换、数据帧传输等多个步骤。通过 WebSocket，客户端与服务器之间可以实现实时、低延迟的双向通信，非常适合需要频繁数据交换的应用场景，比如在线聊天、实时更新等。

# 1. Socket.IO和WebSocket的关系和区别

Socket.IO和WebSocket都是用于实现实时通信的技术，但它们有不同的实现方式和特点。下面是它们之间的关系和主要区别：

### WebSocket

**WebSocket** 是一种网络通信协议，提供了在客户端和服务器之间进行全双工、持久连接的能力。WebSocket协议在客户端和服务器之间建立了一个持久的连接，允许数据在双方之间双向传输，而不需要重新建立连接。WebSocket 是HTML5标准的一部分，并且在现代浏览器中广泛支持。

#### 特点
- **持久连接**：WebSocket连接一旦建立，直到关闭之前都会保持打开状态，允许双方实时地发送数据。
- **低延迟**：由于使用了持久连接，WebSocket可以减少网络延迟，相比HTTP请求/响应更高效。
- **双向通信**：可以在客户端和服务器之间进行双向通信，而不仅仅是客户端发起请求，服务器也可以主动推送消息。

#### 使用场景
- 实时聊天应用
- 实时数据推送（如股票价格、体育比分）
- 多人在线游戏

### Socket.IO

**Socket.IO** 是一个JavaScript库，用于在客户端和服务器之间进行实时通信。它在内部使用WebSocket作为底层传输协议，但它也可以使用其他传输协议（如轮询、长轮询等）来保证在所有环境中都能工作。Socket.IO提供了一些额外的功能，比如事件驱动的通信、自动重连、房间和命名空间等。

#### 特点
- **兼容性**：Socket.IO会在WebSocket不可用时自动回退到其他传输方式，如轮询。这使得它在各种网络条件下都能工作。
- **事件驱动**：支持事件驱动的编程模型，使得发送和接收消息更为直观。
- **自动重连**：当连接丢失时，Socket.IO可以自动尝试重新连接。
- **命名空间和房间**：提供了命名空间和房间的概念，可以方便地组织和管理客户端之间的通信。

#### 使用场景
- 实时聊天应用
- 实时通知
- 在线协作工具
- 需要支持各种网络环境的应用

### 关系和区别

- **底层协议**：WebSocket是底层的协议，而Socket.IO是一个库，它可以使用WebSocket，但也可以回退到其他传输方式。
- **功能集成**：Socket.IO提供了更高层次的功能，比如自动重连、事件处理、房间和命名空间，而WebSocket只提供基本的连接和消息传输功能。
- **兼容性**：WebSocket在一些老旧的浏览器和环境中可能不被支持，而Socket.IO通过回退机制可以在这些环境中提供类似功能。
- **开销和性能**：WebSocket可能在性能上略优于Socket.IO，因为Socket.IO有额外的开销（如重连机制、事件处理）。

### 简单示例

#### 使用 WebSocket

```javascript
// 客户端
const socket = new WebSocket('ws://example.com/socketserver');

// 监听消息
socket.onmessage = (event) => {
  console.log('Message from server:', event.data);
};

// 发送消息
socket.send('Hello Server');
```

#### 使用 Socket.IO

```javascript
// 客户端
import io from 'socket.io-client';
const socket = io('http://example.com');

// 监听消息
socket.on('message', (data) => {
  console.log('Message from server:', data);
});

// 发送消息
socket.emit('message', 'Hello Server');
```

### 总结

- **WebSocket** 是一种协议，提供持久的双向通信连接。
- **Socket.IO** 是一个库，基于WebSocket实现，并提供额外的功能和兼容性保障。

以下是一些关于WebSocket和Socket.IO的面试题，涵盖了基本概念、应用场景、实现细节和最佳实践。这些问题可以帮助你在面试中展示对这两种技术的理解和应用能力。



# 2. 什么是WebSocket

- **答案**：WebSocket是一种网络通信协议，提供了在客户端和服务器之间进行全双工、持久连接的能力。它允许在客户端和服务器之间实时、双向传输数据，而不需要重新建立连接。

# [3. WebSocket的工作原理](https://www.bilibili.com/video/BV1FM4m1D7Vs/?spm_id_from=333.337.search-card.all.click&vd_source=a7089a0e007e4167b4a61ef53acc6f7e)

5min处 感觉听着不好

# 4. WebSocket的优点和缺点是什么

- **优点**：
  - 实时双向通信
  - 低延迟
  - 减少了网络开销（与HTTP相比，避免了频繁的请求/响应头部）
- **缺点**：
  - 不支持所有的网络环境（如某些代理或防火墙可能会阻挡WebSocket连接）
  - 需要手动处理连接重试和错误恢复

# 5. 如何在Node.js中创建一个WebSocket服务器

```javascript
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    console.log('Received:', message);
    ws.send('Hello from server');
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});
```

# 6. 如何在浏览器中使用WebSocket

```javascript
const socket = new WebSocket('ws://localhost:8080');

socket.addEventListener('open', (event) => {
  console.log('Connection opened');
  socket.send('Hello Server');
});

socket.addEventListener('message', (event) => {
  console.log('Message from server:', event.data);
});

socket.addEventListener('close', (event) => {
  console.log('Connection closed');
});
```

# 7. 什么是Socket.IO

- **答案**：Socket.IO是一个JavaScript库，用于在客户端和服务器之间实现实时通信。它在内部使用WebSocket，但也可以使用其他传输协议（如轮询）以确保在所有网络环境中都能工作。

# 8. Socket.IO如何处理WebSocket的兼容性？

- **答案**：Socket.IO会自动选择合适的传输方式。如果WebSocket不可用，它会回退到其他传输方式，如轮询、长轮询等，确保在各种环境下都能正常工作。

# 9. 如何在Socket.IO中处理连接和断开连接事件

```javascript
const io = require('socket.io')(3000);

io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });

  socket.on('message', (data) => {
    console.log('Received:', data);
    socket.emit('response', 'Hello from server');
  });
});
```

# 10. Socket.IO的命名空间和房间是什么

- **命名空间**：命名空间允许你将Socket.IO连接划分到不同的逻辑区域，使得不同的连接可以在不同的命名空间下进行隔离。可以通过 `io.of('/namespace')` 来创建和使用命名空间。
- **房间**：房间是Socket.IO提供的一个机制，用于将客户端分组，以便于在同一个房间的客户端之间进行消息广播。可以通过 `socket.join('room')` 和 `io.to('room').emit('event', data)` 来使用房间。

# 11. 如何在Socket.IO中实现消息广播

```javascript
// 广播消息给所有客户端
io.emit('broadcast', 'Hello everyone');

// 广播消息给同一房间的所有客户端
io.to('room').emit('roomMessage', 'Hello room members');

// 仅广播消息给所有连接的客户端，排除当前客户端
socket.broadcast.emit('broadcast', 'Hello other clients');
```

# [12. WebSocket的心跳机制和断线重连](https://www.bilibili.com/video/BV17y411Y7aB/?spm_id_from=333.999.0.0&vd_source=a7089a0e007e4167b4a61ef53acc6f7e)

```js
class Socket {
    wsUrl;
    constructor(wsUrl) {
        this.wsUrl = wsUrl;
    }

    ModeCode = {
        // websocket消息类型
        MSG: "message",
        HEART_BEAT: 'heart_beat'
    }

    ws: any = null;
    webSocketState: boolean = false;
    heartBeat = {
        // 心跳连接的时间设置
        time: 5 * 1000, // 心跳时间间隔
        timeout: 3 * 1000, // timeout: 心跳超时间隔
        reconnect: 10 * 1000 // 断线重连时间
    }
    reconnectTimer: any = null; // 断线重连时间器

    // 链接ws
    connectWebSocket() {
        this.ws = new WebSocket(this.wsUrl);
        this.init();
    }
    // 心跳初始函数
    startHeartBeat(time: Number) {
        setTimeout(() => {
            this.ws.send(JSON.stringify({
                ModeCode: this.ModeCode.HEART_BEAT,
                msg: new Date()
            }))
            this.waitingServer()
        }, time)
    }

    // 延时等待服务端响应，通过webSocketState判断是否连线成功
    waitingServer() {
        this.webSocketState = false;
        setTimeout(() => {
            if (this.webSocketState) {
                this.startHeartBeat(this.heartBeat.time);
                return;
            }
            console.log('心跳无响应，已断线')
            try {
                this.ws.close();
            } catch (error) {
                console.log('连接已关闭，无需关闭');
            }
            this.reconnectWebSocket();
        }, this.heartBeat.reconnect)
    }

    init() {
        // 监听连接打开事件
        this.ws.addEventListener('open', () => {
            // 连接已打开，可以发送数据
            // socket状态设置为连接，作为后面的断线重连的拦截器
            this.webSocketState = true;
            // 是否启动心跳机制
            this.heartBeat && this.heartBeat.time ? startHeartBeat(this.heartBeat.time) : '';
            console.log('开启');
        })
        this.ws.addEventListener('message', (event) => {
            console.log('eee:', event.data);
            const data = JSON.parse(event.data);
            switch (data.ModeCode) {
                case this.ModeCode.MSG: // 普通消息
                    console.log('收到消息：', data.msg);
                    break;
                case this.ModeCode.HEART_BEAT:
                    console.log('收到心跳响应：', data.msg);
                    this.webSocketState = true;
                    break;
            }
        })
        this.ws.addEventListener('close', (event) => {
            this.webSocketState = false;
            console.log('断开了连接');
        })
        this.ws.addEventListener('error', () => {
            console.log('连接发生了错误');
            this.webSocketState = fal1;
            this.reconnectWebSocket();
        })
    }

    // 重连操作
    reconnectWebSocket() {
        this.reconnectTimer = setTimeout(() => {
            this.reconnectWs();
        }, this.heartBeat.reconnect)
    }

    reconnectWs() {
        if (!this.ws) {
            // 第一次执行，初始化
            this.connectWebSocket();
        }
        if (this.ws && this.reconnectTimer) {
            // 防止多个websocket同时执行
            clearTimeout(this.reconnectTimer);
            this.ws.reconnectTimer = null;
            this.connectWebSocket();
        }
    }

    // 在其他需要socket地方主动关闭socket
    closeWebSocket() {
        this.ws.close();
        clearTimeout(this.reconnectTimer)
        this.webSocketState = false
    }
}
```

# 13. websocket的心跳机制和断线重连是为了解决什么问题

WebSocket 的心跳机制和断线重连是为了解决两个主要问题而设计的：

1. **保持连接活跃**：
   - **心跳机制**：WebSocket 连接是持久的，但由于网络不稳定、设备休眠或其他原因，连接可能会变得不活跃或被中断。心跳机制（通常是通过定期发送 ping/pong 消息）用于确保连接的持续活跃，并在连接出现问题时及时检测到。

2. **恢复连接**：
   - **断线重连**：即使在心跳机制存在的情况下，网络中断或其他问题可能导致 WebSocket 连接丢失。断线重连机制允许客户端在连接断开后自动尝试重新连接，从而提高应用的鲁棒性和用户体验。

这些机制共同确保了 WebSocket 连接的稳定性和可靠性，使得实时应用（如在线聊天、实时数据流、多人游戏等）能够在不稳定的网络环境中更好地运行。