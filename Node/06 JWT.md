# [1. JWT——JSON Web Token](https://www.bilibili.com/video/BV1134y1g7VC/?spm_id_from=333.337.search-card.all.click&vd_source=a7089a0e007e4167b4a61ef53acc6f7e)

> 这是定义JWT的标准文档，详细描述了JWT的结构、编码、解码以及使用方法。你可以通过以下链接查看RFC 7519的正式文档：
>
> - [RFC 7519: JSON Web Token (JWT)](https://tools.ietf.org/html/rfc7519)
>
> 在这份文档中，你将找到关于JWT的规范和详细描述，包括它的头部、有效负载和签名部分的结构和格式。

## 1.1 什么是JWT及其特点

<img src="06 JWT.assets/image-20240325221127729.png" alt="image-20240325221127729" style="zoom: 67%;" />

- JWT是一种用于在网络应用之间安全传递信息的开放标准，通常JWT用于身份验证和非敏感数据的传递
- 设计JWT的主要目标：在不需要服务器端存储状态的情况下，安全地传递**非敏感信息**给受信任的实体
  - 为什么强调非敏感的信息？
    - 因为我们常用的JWT中传递的信息并没有加密，这意味着任何人截取JWT之后，都能读取其中的内容
    - **注意：常见的JWT实现，它的头部和载荷是没有加密的，所以它的目的并不是想隐藏数据，它的目的是防止数据被篡改。这点是通过第三部分签名来实现的。**

![image-20240325222909629](06 JWT.assets/image-20240325222909629.png)‘

- 解码后：<img src="06 JWT.assets/image-20240325223209714.png" alt="image-20240325223209714"  />

- alg：algorithm

- | <img src="06 JWT.assets/image-20240325223229215.png" alt="image-20240325223229215"  /> | <img src="06 JWT.assets/image-20240730114854496.png" alt="image-20240730114854496" style="zoom:70%;" /> |
  | ------------------------------------------------------------ | ------------------------------------------------------------ |

## [1.2 JWT的应用场景](https://www.bilibili.com/video/BV1UQ4y1W7MC/?spm_id_from=pageDriver&vd_source=a7089a0e007e4167b4a61ef53acc6f7e)

- 用户身份认证
- 密码重置和电子邮件验证

## 1.3 与其他认证方式的对比

- API Key？？
- cookie session
- <img src="06 JWT.assets/image-20240730115527967.png" alt="image-20240730115527967" style="zoom:50%;" />

# [2. JWT——JSON Web Token](https://www.bilibili.com/video/BV1tJ411B7yJ?p=1&vd_source=a7089a0e007e4167b4a61ef53acc6f7e)

- 一般用于用户认证（前后端分离的项目）


## [2.1 基于传统Token实现用户认证](https://www.bilibili.com/video/BV1tJ411B7yJ?p=2&spm_id_from=pageDriver&vd_source=a7089a0e007e4167b4a61ef53acc6f7e)

- 用户登录，服务端给客户端返回token，并将token保存在服务端（该token可使用uuid生成）
- 以后用户再来访问时，需要携带token，服务端获取token后，再去数据库中获取token进行校验

## [2.2 基于JWT实现用户认证](https://www.bilibili.com/video/BV1tJ411B7yJ?p=2&spm_id_from=pageDriver&vd_source=a7089a0e007e4167b4a61ef53acc6f7e)

- 用户登录，服务端给客户端返回token，服务端不保存token
- 以后用户再来访问时，需要携带token，服务端获取token后，再对token进行校验

- 优势：相较于传统的token，无需在服务端保存token

## [2.3 JWT实现原理](https://www.bilibili.com/video/BV1tJ411B7yJ?p=3&spm_id_from=pageDriver&vd_source=a7089a0e007e4167b4a61ef53acc6f7e)

https://jwt.io/

- 用户提交用户名和密码给服务端，如果登录成功，使用jwt创建一个token，并给用户返回

<img src="06 JWT.assets/image-20240329214334435.png" alt="image-20240329214334435" style="zoom: 67%;" />

### 2.3.1 JWT第一段字符串

```javascript
let temp = JSON.stringify({
  "alg": "HS256",
  "typ": "JWT"
})
// temp: '{"alg":"HS256","typ":"JWT"}'
// 注意：btoa函数只能处理ASCII字符串，如果你需要编码的字符串包含非ASCII字符，需要先将字符串转换为UTF-8编码的字节，再进行Base64编码
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
```

https://base64.us/

<img src="06 JWT.assets/image-20240620211647939.png" alt="image-20240620211647939" style="zoom: 67%;" />

### 2.3.2 JWT第二段字符串

```javascript
let temp = JSON.stringify({
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022
})
// temp: '{"sub":"1234567890","name":"John Doe","iat":1516239022}'
// eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ==
```

### 2.3.3 JWT第三段字符串

- 第一段：eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
- 第二段：eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ==
- 第一段和第二段拼接：
  - eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ==

- HS256加密——HMAC-SHA256
- SHA——Secure Hash Algorithm

<img src="06 JWT.assets/image-20240329215002971.png" alt="image-20240329215002971" style="zoom: 80%;" />

- 以后用户再来访问的时候，需要携带token，后端需要对token进行校验
  - 获取token
  - <img src="06 JWT.assets/image-20240329215444152.png" alt="image-20240329215444152" style="zoom: 80%;" />

> 注意：HS256不能反解。（即第三段不能反解）

- 22min处

# 3. 代码实践

在JavaScript中，可以使用`crypto-js`库来对一段字符串进行HS256加密（实际上是进行HMAC-SHA256签名）。以下是具体步骤：

1. **安装`crypto-js`库**：

如果你使用Node.js环境，请先安装`crypto-js`库：

```bash
npm install crypto-js
```

2. **使用`crypto-js`进行HS256加密**：

以下是一个示例代码，展示如何使用`crypto-js`库对一段字符串进行HS256加密：

```javascript
// 引入crypto-js库
const CryptoJS = require('crypto-js');

// 要签名的字符串
const message = "Hello, world!";

// 签名密钥
const secretKey = 'your-256-bit-secret';

// 进行HMAC-SHA256签名
const hash = CryptoJS.HmacSHA256(message, secretKey);

// 转换为Base64字符串
const hashInBase64 = CryptoJS.enc.Base64.stringify(hash);

console.log('HMAC-SHA256加密后的Base64字符串:', hashInBase64);
```

### 解释

- `CryptoJS.HmacSHA256`：使用HMAC-SHA256算法对消息进行签名。
- `CryptoJS.enc.Base64.stringify`：将签名结果转换为Base64编码的字符串。

### 浏览器环境使用

如果你在浏览器环境中使用，可以直接引入`crypto-js`库：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>HS256 Encryption</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js"></script>
</head>
<body>
    <script>
        // 要签名的字符串
        const message = "Hello, world!";

        // 签名密钥
        const secretKey = 'your-256-bit-secret';

        // 进行HMAC-SHA256签名
        const hash = CryptoJS.HmacSHA256(message, secretKey);

        // 转换为Base64字符串
        const hashInBase64 = CryptoJS.enc.Base64.stringify(hash);

        console.log('HMAC-SHA256加密后的Base64字符串:', hashInBase64);
    </script>
</body>
</html>
```

通过以上代码，你可以在Node.js和浏览器环境中对字符串进行HS256加密（签名），并得到Base64编码的结果。

# [4. 预备知识](https://app.pluralsight.com/ilx/video-courses/ae8db6a7-8781-4022-8fe5-3af32fa0caf0/db2d63cb-f9c9-4b29-b96a-e3c3497dc385/6ce4d3af-095c-4635-bdb2-44a94dc2f68e)

> courses on OAuth
>
> courses on OpenID Connect
>
> cources on API seucurity

- fundamental 基本原理
- affectionately 亲切地 挚爱地

# 5. token在koa中一般是作为body传给前端还是放在响应头传给前端

在Koa中，处理令牌（token）时，可以选择将其作为响应体的一部分或作为响应头传给前端。这两种方法各有优缺点，通常取决于你的应用需求和安全考虑。

### 1. **作为响应体（Body）传递**

将令牌作为响应体的一部分返回给前端是一种常见的做法。前端在收到响应后，从响应体中提取令牌并存储在本地存储（localStorage）或 cookie 中。

#### 示例：将令牌作为响应体的一部分返回

```javascript
const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const router = new Router();

router.post('/login', async (ctx) => {
  // 模拟生成令牌
  const token = 'generated-token';

  // 将令牌作为响应体的一部分返回
  ctx.body = {
    message: 'Login successful',
    token: token
  };
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

**优点**：
- 简单明了，前端可以很容易地解析响应体中的数据。
- 适用于无需额外安全措施的简单应用。

**缺点**：
- 令牌在本地存储（如 `localStorage`）中存储时可能面临 XSS 攻击的风险。
- 需要确保前端代码正确处理令牌存储和发送。

### 2. **作为响应头传递**

将令牌放在响应头中是另一种常见做法。前端在收到响应后，从响应头中提取令牌并存储在适当的位置。

#### 示例：将令牌作为响应头的一部分返回

```javascript
const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const router = new Router();

router.post('/login', async (ctx) => {
  // 模拟生成令牌
  const token = 'generated-token';

  // 将令牌作为响应头的一部分返回
  ctx.set('Authorization', `Bearer ${token}`);
  ctx.body = { message: 'Login successful' };
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

**优点**：
- 提高安全性，因为令牌不会暴露在响应体中，且浏览器的安全策略可能会限制对响应头的访问。
- 可以利用标准的 `Authorization` 头部格式，符合许多现有的身份验证标准。

**缺点**：
- 需要前端从响应头中提取令牌，并确保正确处理。
- 可能需要额外的处理来存储和管理令牌。

### 总结

- **作为响应体**：适用于简单应用或不需要额外安全措施的场景。前端需要从响应体中提取和存储令牌。
- **作为响应头**：适用于需要更高安全性和符合标准身份验证的场景。前端需要从响应头中提取令牌，并进行存储和管理。

无论选择哪种方法，都需要在前端代码中妥善处理令牌存储和使用，确保应用的安全性。