# 1. websocket在网络层面的连接过程

WebSocket 是一种**网络通信协议**，旨在通过**单个 TCP 连接**提供**[全双工通信](#14.-全双工通信)**。它主要用于在客户端和服务器之间**建立持久连接**，以便进行实时数据传输

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

# 2. Socket.IO && WebSocket

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

# [3. WebSocket的工作原理](https://www.bilibili.com/video/BV1FM4m1D7Vs/?spm_id_from=333.337.search-card.all.click&vd_source=a7089a0e007e4167b4a61ef53acc6f7e)

5min处 感觉听着不好

**WebSocket** 是一种全双工、持久化的通信协议，允许客户端与服务器之间建立一个长时间保持的连接，双方可以在该连接上进行实时的双向数据传输。它是在标准的 HTTP 协议之上，通过一次 HTTP 握手后升级为 WebSocket 连接，随后切换到 WebSocket 协议进行通信。

### WebSocket 的工作原理

1. **连接建立（握手过程）**
   - 客户端发送一个 HTTP 请求到服务器，要求升级到 WebSocket 协议。这个请求包含以下头信息：
     - **`Upgrade: websocket`**：表明客户端希望将连接升级为 WebSocket。
     - **`Connection: Upgrade`**：表示这是一个协议升级请求。
     - **`Sec-WebSocket-Key`**：客户端生成的一个 Base64 编码的随机密钥，服务器将用它来验证请求。
     - **`Sec-WebSocket-Version`**：表示 WebSocket 协议的版本。

   - 服务器收到请求后，若支持 WebSocket，将响应以下头信息，表示同意升级协议：
     - **`Upgrade: websocket`**：确认协议升级为 WebSocket。
     - **`Connection: Upgrade`**：确认协议已升级。
     - **`Sec-WebSocket-Accept`**：服务器基于客户端提供的 `Sec-WebSocket-Key` 计算并返回一个值，用来验证握手的合法性。这个值是通过将 `Sec-WebSocket-Key` 加上一个固定的字符串进行 SHA-1 哈希运算后再进行 Base64 编码得到的。
   
   - 握手成功后，HTTP 连接会被升级为 WebSocket 连接，双方可以通过这个持久化的连接进行双向通信。

2. **数据传输**
   - **全双工通信**：在 WebSocket 连接建立后，客户端和服务器可以随时发送数据，而不需要等待对方的响应。不同于 HTTP 请求-响应模式，WebSocket 支持双向通信，数据可以在连接存续期间实时传输。
   
   - **帧结构**：WebSocket 通过数据帧（Frame）进行通信，每一个消息分成若干帧进行传输。帧包括：
     - **FIN** 位：表示是否是消息的最后一帧。
     - **Opcode**：表示帧的类型（如文本帧、二进制帧、关闭连接等）。
     - **Mask**：客户端发送的数据帧必须掩码，服务器可以选择是否掩码。
     - **Payload Data**：实际传输的数据。

   - WebSocket 支持传输 **文本数据** 和 **二进制数据**，其中文本数据采用 UTF-8 编码，二进制数据可以是任何格式，如图片、音频等。

3. **连接保持与心跳检测**
   - WebSocket 连接一旦建立，除非手动关闭或发生网络故障，它将一直保持开放状态。为了确保连接的有效性，通常会实现 **心跳检测**。客户端或服务器可以定期发送 **Ping** 消息，另一方则回应 **Pong** 消息，以检测连接是否正常。
   
   - 心跳机制可以防止由于网络中断或其他问题导致的连接假死。

4. **关闭连接**
   - WebSocket 连接可以由客户端或服务器主动关闭。关闭时，发送一个 **关闭帧（Close Frame）**，它包含关闭状态码和关闭原因。
   - 收到关闭帧的一方可以响应相应的关闭帧，随后连接被关闭。

### WebSocket 与 HTTP 的区别

1. **连接类型**：
   - HTTP 是 **半双工**（客户端发出请求，服务器返回响应），每次请求后连接就关闭。
   - WebSocket 是 **全双工**，建立连接后，客户端和服务器可以实时地相互发送数据，连接在长时间内保持。

2. **通信模式**：
   - HTTP 是 **请求-响应** 模式，客户端必须发起请求，服务器才会响应。
   - WebSocket 是 **事件驱动** 模式，双方可以独立地发送消息，而无需等待对方的请求。

3. **性能**：
   - HTTP 在每次请求时需要经过 TCP 三次握手和 HTTP 头的开销。
   - WebSocket 只需要一次握手，后续的所有通信都是基于已建立的 TCP 连接，减少了开销，适合实时应用场景。

### WebSocket 使用场景

由于 WebSocket 具备实时双向通信的能力，它特别适用于以下场景：

1. **实时聊天应用**：例如即时通讯、在线客服等场景，客户端和服务器之间需要实时交换信息。
2. **在线游戏**：实时交互的游戏场景，服务器和客户端之间需要频繁交换状态数据。
3. **实时数据推送**：如股票行情、运动赛事直播等，服务器需要向客户端实时推送数据。
4. **协作应用**：如在线协作编辑工具，多个用户需要实时同步彼此的操作。
5. **物联网（IoT）**：实时控制设备和监控数据的场景，服务器和客户端之间需要高效的双向通信。

### WebSocket 工作原理图示

```plaintext
Client                      Server
  |                            |
  |--------HTTP Handshake------>|
  |                            |
  |<------Switch Protocol-------|
  |                            |
  |--------WebSocket Frame----->|
  |<-------WebSocket Frame------|
  |                            |
  |---Ping---|                 |
  |<--Pong---|                 |
  |                            |
  |--------Close Frame--------->|
  |                            |
  |<-------Close Frame----------|
```

### 总结
WebSocket 通过一次 HTTP 握手建立连接后，允许客户端和服务器在该连接上进行实时、双向的通信。它特别适合需要低延迟、高实时性数据传输的应用场景。相比于传统的 HTTP 请求-响应模型，WebSocket 显著减少了延迟和开销。

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

WebSocket 的心跳机制和断线重连是为了解决两个主要问题而设计的：

1. **保持连接活跃**：
   - **心跳机制**：WebSocket 连接是持久的，但由于网络不稳定、设备休眠或其他原因，连接可能会变得不活跃或被中断。心跳机制（通常是通过定期发送 ping/pong 消息）用于确保连接的持续活跃，并在连接出现问题时及时检测到。

2. **恢复连接**：
   - **断线重连**：即使在心跳机制存在的情况下，网络中断或其他问题可能导致 WebSocket 连接丢失。断线重连机制允许客户端在连接断开后自动尝试重新连接，从而提高应用的鲁棒性和用户体验。

这些机制共同确保了 WebSocket 连接的稳定性和可靠性，使得实时应用（如在线聊天、实时数据流、多人游戏等）能够在不稳定的网络环境中更好地运行。

在前端 JavaScript 中实现 WebSocket 的心跳机制，可以确保连接在长时间空闲时仍然保持活跃，并检测连接是否仍然有效。心跳机制通常包括定期发送“ping”消息到服务器，以检查连接的状态。如果服务器没有响应或连接断开，可以采取适当的措施，例如重连。

下面是一个基本的示例代码，展示了如何实现 WebSocket 的心跳机制：

### 实现 WebSocket 心跳机制

```javascript
class WebSocketManager {
    constructor(url) {
        this.url = url;
        this.ws = null;
        this.heartbeatInterval = 30000; // 心跳间隔，单位为毫秒
        this.pingMessage = 'ping';       // 心跳消息内容
        this.pongTimeout = 10000;        // 超时等待 pong 消息的时间，单位为毫秒
        this.heartbeatTimer = null;
        this.pongReceived = true;

        this.connect();
    }

    // 连接到 WebSocket 服务器
    connect() {
        this.ws = new WebSocket(this.url);

        this.ws.onopen = () => {
            console.log('WebSocket connection opened');
            this.startHeartbeat();
        };

        this.ws.onmessage = (event) => {
            if (event.data === 'pong') {
                this.pongReceived = true;
            } else {
                console.log('Message from server:', event.data);
            }
        };

        this.ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        this.ws.onclose = () => {
            console.log('WebSocket connection closed');
            this.stopHeartbeat();
            // 重新连接可以在这里处理
            setTimeout(() => this.connect(), 5000); // 尝试重新连接
        };
    }

    // 启动心跳检测
    startHeartbeat() {
        this.heartbeatTimer = setInterval(() => {
            if (this.ws.readyState === WebSocket.OPEN) {
                console.log('Sending heartbeat');
                this.pongReceived = false; // 在发送 ping 后设置为 false
                this.ws.send(this.pingMessage);
                
                // 设置一个定时器来等待 pong 响应
                setTimeout(() => {
                    if (!this.pongReceived) {
                        console.warn('No pong received, reconnecting...');
                        this.ws.close(); // 关闭连接并触发 onclose 事件
                    }
                }, this.pongTimeout);
            }
        }, this.heartbeatInterval);
    }

    // 停止心跳检测
    stopHeartbeat() {
        if (this.heartbeatTimer) {
            clearInterval(this.heartbeatTimer);
            this.heartbeatTimer = null;
        }
    }

    // 发送消息
    send(message) {
        if (this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(message);
        } else {
            console.error('WebSocket is not open. Message not sent.');
        }
    }
}

// 使用示例
const wsManager = new WebSocketManager('ws://example.com/socket');

// 发送消息
wsManager.send('Hello, WebSocket!');
```

### 代码解释

1. **构造函数**：`WebSocketManager` 类在实例化时接受 WebSocket 服务器的 URL，并初始化连接。

2. **`connect` 方法**：创建 WebSocket 连接，并设置 `onopen`、`onmessage`、`onerror` 和 `onclose` 事件处理函数。连接打开时启动心跳机制；连接关闭时停止心跳并尝试重连。

3. **心跳检测**：
   - **`startHeartbeat`**：定期发送心跳消息（例如 `ping`），并设置定时器等待服务器的 `pong` 响应。如果超时未收到 `pong` 消息，则认为连接不可用，并关闭连接以触发重连。
   - **`stopHeartbeat`**：停止心跳检测。

4. **`onmessage` 事件处理**：如果收到 `pong` 消息，则更新 `pongReceived` 状态为 `true`。

5. **重连机制**：在连接关闭时，设置一个定时器尝试重新连接。

### 注意事项

- **心跳消息格式**：心跳消息的内容（`ping` 和 `pong`）可以根据你的实际需求进行调整。如果服务器需要不同的格式或消息，你需要相应地调整代码。
- **重连策略**：在实际应用中，你可能需要实现更复杂的重连策略，例如指数退避（逐渐增加重连间隔）等，以提高连接的可靠性和稳定性。

这个实现可以帮助你在前端管理 WebSocket 连接，确保在连接中断时能够自动恢复。

# 13. Koa中使用socket.io

# 14. 全双工通信

**全双工通信**（Full-Duplex Communication）指的是在通信系统中，双方可以同时发送和接收数据。换句话说，通信的双方可以在同一时间内进行数据的双向传输，彼此互不干扰。

在全双工通信中：
- **双方都可以同时进行传输**，不需要等待对方完成发送。
- 这意味着发送和接收是同时进行的，这种模式提高了通信的效率。

### 全双工的现实类比
- **电话通信**：当你打电话时，你和对方可以同时说话和听话。这就是全双工通信的例子。你不需要等对方说完，才能开始说话。
  

相比之下：
- **半双工通信**（Half-Duplex Communication）：通信双方不能同时发送和接收数据，只能一方发送，另一方接收。双方需要轮流发送数据。例如，对讲机通信就是半双工通信，你必须按下按钮说话，对方才能听到，而不能同时说话。
  
- **单工通信**（Simplex Communication）：数据只能单向传输，即一方只能发送，另一方只能接收。广播就是单工通信的例子，电视台发出信号，观众只能接收，不能回应。

### WebSocket 的全双工特性
在 WebSocket 中，客户端和服务器一旦建立连接后，双方都可以随时向对方发送消息，而不需要等待对方的响应。这与 HTTP 的请求-响应模型（半双工）不同，HTTP 中客户端必须先发起请求，服务器才能做出回应。

总结：全双工通信提升了系统在实时数据传输和交互式应用中的效率，是 WebSocket 能够实现实时双向通信的基础。

# 15. 请求头中Connection字段的取值

HTTP 请求头中的 **`Connection`** 字段用于控制是否在完成当前请求/响应事务后，保持连接打开或关闭，以及在某些场景下用于升级协议。它可以有多种取值，常见的取值包括：

### 1. **`Connection: keep-alive`**
   - 表示客户端希望服务器在响应后 **保持连接打开**，以便进行后续的请求而无需重新建立连接。
   - 在 HTTP/1.1 中，默认情况下，连接是保持活跃的，所以即使没有明确指定 `keep-alive`，HTTP/1.1 连接默认也是持久连接。
   - 使用 `keep-alive` 可以减少因为频繁建立和断开连接而造成的开销，提升性能。

   **示例**：
   ```http
   Connection: keep-alive
   ```

### 2. **`Connection: close`**
   - 表示客户端或服务器希望在完成当前请求/响应后 **关闭连接**。
   - 在 HTTP/1.0 中，默认行为是每次请求完成后关闭连接。如果不希望关闭连接，客户端必须明确发送 `keep-alive`。
   - 在一些 HTTP/1.1 的响应中，服务器也可以发送 `Connection: close`，通知客户端在响应结束后关闭连接。

   **示例**：
   ```http
   Connection: close
   ```

### 3. **`Connection: Upgrade`**
   - 表示客户端希望将当前的 HTTP 连接升级为其他协议，例如 WebSocket。
   - 通常和 `Upgrade` 头一起使用，指定要升级到的协议类型。在 WebSocket 握手中，客户端发送 `Connection: Upgrade` 请求，表示希望升级协议。

   **示例**（WebSocket 升级请求）：
   ```http
   Connection: Upgrade
   Upgrade: websocket
   ```

### 其他不常见的取值：
   - **`Connection: keep-alive, Upgrade`**：可以同时指定保持连接和升级协议，但这种情况比较少见，通常是用在需要先保持 HTTP 连接再进行某些操作之后升级协议的场景。

### 小结：
- `Connection: keep-alive` 用于保持连接打开。
- `Connection: close` 用于通知关闭连接。
- `Connection: Upgrade` 用于协议升级（如升级到 WebSocket）。

这些取值影响客户端和服务器之间的连接管理方式，在性能优化（如减少频繁的连接建立和断开）或特殊协议升级场景中尤为重要。





> https://segmentfault.com/a/1190000011450538  文档学习



> https://www.bilibili.com/video/BV1yi4y1t7yD?from=search&seid=4783580291640157481   视频学习

# 一：传统的http能不能实现聊天的效果？

# 二： 什么是websocket？

为什么在http请求下， 服务器无法给浏览器主动发送数据？

### websocket允许服务器给浏览器发送消息

http协议三次握手！

每次请求响应都有一次三次握手！很耗费时间和性能

 # 2 在h5中，如何使用websocket

websocket维基百科：https://zh.wikipedia.org/wiki/WebSocket

编写websocket客户端应用：https://developer.mozilla.org/zh-CN/docs/Web/API/WebSockets_API/Writing_WebSocket_client_applications

编写websocket服务端应用：https://developer.mozilla.org/zh-CN/docs/Web/API/WebSockets_API/Writing_WebSocket_servers

https://developer.mozilla.org/zh-cn/docs/Web/API/WebSocket

# 3 nodejs开发自己的websocket服务

第三方包：https://github.com/sitegui/nodejs-websocket#readme



