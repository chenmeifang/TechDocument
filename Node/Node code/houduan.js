const http = require('http');
const crypto = require('crypto');
// crypto 是 Node.js 提供的一个内置模块，用于执行加密操作。
// 它包含了一组用于加密、解密、生成哈希、签名、验证签名、生成随机数等功能的加密工具

const server = http.createServer((req, res) => {
    res.end('Hello, this is a simple Http Server')
})

// 生成 Sec-WebSocket-Accept 的值
function generateAcceptValue(acceptKey) {
    return crypto
        .createHash('sha1')
        .update(acceptKey + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11', 'binary')
        .digest('base64');
}

server.on('upgrade', (req, socket, head) => {
    const key = req.headers['sec-websocket-key'];
    const acceptKey = generateAcceptValue(key);
    const responseHeaders = [
        'HTTP/1.1 101 Switching Protocols',
        'Upgrade: websocket',
        'Connection: Upgrade',
        `Sec-WebSocket-Accept: ${acceptKey}`,
    ];
    socket.write(responseHeaders.join('\r\n') + '\r\n\r\n');
    // 手动关闭连接
    setTimeout(() => {
        console.log('Closing WebSocket connection');
        socket.end(); // 关闭连接
    }, 10000); // 10 秒后关闭连接
})
server.listen(8080, () => {
    console.log('Server is listening on port 8080');
})