# 0. 如何用cookie保持登录状态

# 1. 如何用session保持登录状态

# ---------------------------------

# [0. Cookie，Session，Token的区别](https://www.bilibili.com/video/BV1ob4y1Y7Ep/?spm_id_from=333.880.my_history.page.click&vd_source=a7089a0e007e4167b4a61ef53acc6f7e)

# ---------------------------------

# [0. Cookie，Session，Token的区别](https://www.bilibili.com/video/BV1at421G7YC/?spm_id_from=333.880.my_history.page.click&vd_source=a7089a0e007e4167b4a61ef53acc6f7e)

![image-20240620224743413](03 session和cookie和JWT.assets/image-20240620224743413.png)

![image-20240620225056253](03 session和cookie和JWT.assets/image-20240620225056253.png)

# ---------------------------------

# 0.cookie

在http协议中有这样一项规则：

- 客户端和服务器端的沟通是无状态性的

- 即：服务器端不关心客户端是谁，服务器端只关心请求，只要请求来了，服务器端就会对请求作出响应，响应一旦结束，这次沟通也就随之结束了。当同一个客户端再向服务器端发送请求时，服务端并不知道客户端已经来过一次了，这就是无状态性。

- 这种特性在早期的网站应用中是没有问题的，因为早期的网站应用只是在页面当中展示一些文字，图片等数据，浏览网站的人并不会和网站发生交互

- 但是现代网站应用的需求是五花八门的：比如用户在电商网站中购物时，需要用户进行登录才能购买商品，如果用户不进行登录，是不能购买商品的。这个需求很合理。

- 在http协议中规定客户端和服务器端的沟通是无状态性的，谁也不认识谁，既然这样的话，如何才能实现登录功能呢？如何才能让服务端识别客户端的身份呢？

- - cookie：用来实现服务器端与客户端身份识别的一种技术

- 如何进行身份识别呢？

- - 点那个客户端第一次访问服务器端的时候，服务器端检测到当前这个客户端我并不认识，这个时候服务端在对客户端作出响应的同时还可以给客户端发一个小卡片（可以理解为服务端发给客户端的身份证，有了这个身份证，客户端就能证明是谁）
  - 此时在客户端的浏览器中就有了这个身份证了
  - 当客户端再一次访问服务器端，这个身份证（也就是cookie）会随着请求被自动发送到服务器端，服务器端拿到这个身份证，服务器端就知道客户端是谁了

https://www.bilibili.com/video/BV1s4411z7zq?from=search&seid=8082226497218378131

# [1.Cookie简介](https://www.bilibili.com/video/BV1s4411z7zq/?from=search&seid=8082226497218378131&vd_source=a7089a0e007e4167b4a61ef53acc6f7e)

`情景`：没有登录，但是购物车里面有东西

- **关掉当前页面**， 然后重新打开京东，这时购物车里有没有东西？
  - 有

- **重启电脑**，再打开京东， 购物车里有没有东西？
  - 有
  - **说明这个数据不仅存放在客户端，而且是存放在客户端的硬盘上 ，不是放在内存里面的**。因为内存里面的数据一关机就没了

- 如果换一台电脑，再打开京东，这时购物车里有没有东西？

  - 没有
  - **说明这种没登陆的场景下，数据是存放在客户端的，没有存放在服务端**

  

- cookie: 是1993年由网景公司前雇员发明的一种**进行网络会话状态跟踪的技术**

* 会话：由**一组**请求与响应组成，这些请求与响应是围绕一件事情的，是需要进行会话状态跟踪的
* 然而HTTP协议是一种无状态协议（就是这一次的请求响应与下一次的请求响应之间没有任何关系）
  * 比如在淘宝的某个页面中，你进行了登录操作。当你跳转到商品页时，服务端如何知道你是已经登陆的状态？
* 于是就出现了Cookie（弥补HTTP协议的无状态缺陷），**cookie是http协议的一部分**



* Cookie：是由服务器生成，保存在客户端的一种信息载体
* Cookie中存放着用户访问该站点的会话状态信息
* Cookie由若干键值对构成



- 用户在提交第一次请求后，由服务器生成Cookie，并将其封装到响应头中，以响应的形式发送给客户端
- 客户端收到这个响应后，将Cookie保存到客户端
- 当客户端再次发送同类请求时，请求中会携带保存在客户端的Cookie数据，发送到服务端，由服务器对会话进行跟踪

* 同类请求：资源路径相同的请求，资源名称可以不一样

# [2.火狐浏览器下查看和操作Cookie](https://www.bilibili.com/video/BV1s4411z7zq/?p=2&spm_id_from=pageDriver&vd_source=a7089a0e007e4167b4a61ef53acc6f7e)

不同的浏览器，其Cookie的保存位置以及查看方式是不同的，删除了某一浏览器下的Cookie，不会影响到其他浏览器中的Cookie

# 3.chrome浏览器下查看Cookie

# [4.服务端生成Cookie](https://www.bilibili.com/video/BV1s4411z7zq/?p=3&spm_id_from=pageDriver&vd_source=a7089a0e007e4167b4a61ef53acc6f7e)

- Node怎么生成Cookie？——https://zhuanlan.zhihu.com/p/537637117

## 4.1 node设置简单的cookie

```js
const http = require('http')

const server = http.createServer((req, res) => {
  res.setHeader('Set-Cookie', 'msg=hello;')
  res.end('hello')
})
// 使用 res.setHeader 方法，第一个参数是 Set-Cookie，第二个参数是 cookie 的值
server.listen(8000)
```

## 4.2 限制前端修改和访问cookie

可以设置 `httpOnly`

```js
res.setHeader('Set-Cookie', 'msg=hello; httpOnly;')
```

## 4.3 设置过期时间

如果你需要给 `cookie` 某个值设置过期时间，可以设置 `expires`

比如我想设置1天后过期

```js
const cookieExpires = () => {
  const d = new Date() // 获取当前时间
  d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
  return d.toGMTString()
}

// 省略部分代码
res.setHeader('Set-Cookie', `msg=hello; expires=${cookieExpires()};`)
```

## 4.4 登录信息

如果是登录信息，通常会这样写：

```js
const http = require('http')

const cookieExpires = () => {
  const d = new Date() // 获取当前时间
  d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
  return d.toGMTString()
}

const server = http.createServer((req, res) => {
  res.setHeader('Set-Cookie', `token=xxxx; path=/; httpOnly; expires=${cookieExpires()}`)
  res.end('hello')
})

server.listen(8000)
```

~~上述情景，cookie写到了浏览器的缓存，为什么没写到硬盘呢？怎么写到硬盘呢？~~

~~==setMaxAge==~~

~~回答：设置Cookie的有效期。这个值为一个整型值，单位为秒。~~

* ~~该值大于0，表示将Cookie存放到客户端的硬盘~~
* ~~该值小于0，与不设置效果相同，会将Cookie存放到浏览器的缓存。~~
* ~~该值等于0，表示Cookie一生成，马上失效。~~

~~cookie有哪些属性：~~

* ~~setMaxAge有效期~~
* ~~setComment：specifies a comment that describes a cookie's purpose~~
* ~~setDomain: specifies the domain within which this cookie should be presented~~
* ~~setPath: specifies a path for the cookie to which the client should return the cookie~~
* ~~setSecure: indicates to the browser whether the cookie should only be sent using a secure protocol,such as HTTPS or SSL(向浏览器指示cookie是否应该仅使用安全协议发送，如HTTPS或SSL)~~ 
* ~~名称~~
* ~~setValue: 内容~~
* ~~setVersion:~~

# 5.服务端获取并解析Cookie

## [5.1 获取Cookie](https://zhuanlan.zhihu.com/p/537637117)

```js
const http = require('http')

const server = http.createServer((req, res) => {

  const cookieStr = req.headers.cookie // 获取 cookie
  console.log(cookieStr) // 在控制台输出 cookie
})

server.listen(8000)
```

## [5.2 解析Cookie](https://zhuanlan.zhihu.com/p/537637117)

通过上面的方法获取到的 `cookie` 是一个格式为 `key1=value1; key2=value2; key3=value3` 的字符串

```js
// 解析 cookie
let cookie = {}
const cookieStr = req.headers.cookie || ''
cookieStr.split(';').forEach(item => {
  if (!item) {
    return
  }
  const arr = item.split('=')
  const key = arr[0].trim()
  const val = arr[1].trim()
  cookie[key] = val

  res.end()
})

server.listen(8000)
```

# 6.Cookie的禁用

# 7.Session——三个域属性空间的对比

# [8.Session的基本用法 ](https://www.bilibili.com/video/BV1s4411z7zq/?p=8&spm_id_from=pageDriver&vd_source=a7089a0e007e4167b4a61ef53acc6f7e)

- Session和Cookie都是**会话**跟踪技术


- **会话：**当用户打开浏览器，从发出第一次请求开始，一直到最终关闭浏览器，就表示一次会话的完成。（作为用户来说能感知到的）

- **Session和Cookie的区别：**

  * Session：将会话状态保存在了服务器端

  * Cookie：将会话状态保存在了客户端


- **Session和Cookie的相同点：**
  * 两者都是由服务器生成


# [9.Session的工作原理](https://www.bilibili.com/video/BV1s4411z7zq/?p=9&spm_id_from=pageDriver&vd_source=a7089a0e007e4167b4a61ef53acc6f7e)

- 在服务器中系统会为每个会话维护一个Session

- 不同的会话，对应不同的Session
- ==那么系统是如何识别各个Session对象的？==
- ==即是如何做到在同一会话过程中，一直使用的是同一个Session对象呢？==

- 两个浏览器，是两个窗口，是两次会话，所以session对象不一样。

- 在创建session时，服务器在底层会创建一个key为jsessionid的cookie对象。

- 在前面学习cookie的时候，没记得里面有jsessionid这个东西呀？？？？

- ==jsessionid这个东西有个前提，就是我们要使用getSession（）方法。才能生成32位长度的字符串和session对象。==

# 10.Session的失效

# 11.Cookie禁用后的Session

从用户角度来说，什么叫一次会话？

打开浏览器，在里面操作，然后关闭浏览器。

但是对于服务器来说，

客户端第一次访问我（服务端），会话开始了，Session失效的时候会话才结束。并不是说客户端把浏览器关了，会话就结束了。

# 12.Cookie禁用后重定向跳转时Session的跟踪

# 13.Cookie禁用后非重定向跳转时Session的跟踪

# ---------------------------------

# 1.JWT——JSON Web Token

https://www.bilibili.com/video/BV1134y1g7VC/?spm_id_from=333.337.search-card.all.click&vd_source=a7089a0e007e4167b4a61ef53acc6f7e

## 1.1 什么是JWT及其特点

<img src="03 session和cookie和JWT.assets/image-20240325221127729.png" alt="image-20240325221127729" style="zoom:50%;" />

- JWT是一种用于在网络应用之间安全传递信息的开放标准，通常JWT用于身份验证和非敏感数据的传递
- 设计JWT的主要目标：在不需要服务器端存储状态的情况下，安全地传递**非敏感信息**给受信任的实体
- ![image-20240325222909629](03 session和cookie和JWT.assets/image-20240325222909629.png)‘
- 解码后：<img src="03 session和cookie和JWT.assets/image-20240325223209714.png" alt="image-20240325223209714" style="zoom:50%;" />
- <img src="03 session和cookie和JWT.assets/image-20240325223229215.png" alt="image-20240325223229215" style="zoom:50%;" />

## 1.2 JWT的应用场景

## 1.3 与其他认证方式的对比

- API Key
- cookie session

# [2. JWT——JSON Web Token](https://www.bilibili.com/video/BV1tJ411B7yJ?p=1&vd_source=a7089a0e007e4167b4a61ef53acc6f7e)

一般用于用户认证（前后端分离的项目）

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

<img src="03 session和cookie和JWT.assets/image-20240329214334435.png" alt="image-20240329214334435" style="zoom: 50%;" />

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

<img src="03 session和cookie和JWT.assets/image-20240620211647939.png" alt="image-20240620211647939" style="zoom: 67%;" />

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

- eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
- eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ==
- eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ==

- HS256加密——HMAC-SHA256
- SHA——Secure Hash Algorithm
- 

<img src="03 session和cookie和JWT.assets/image-20240329215002971.png" alt="image-20240329215002971" style="zoom:55%;" />

- 以后用户再来访问的时候，需要携带token，后端需要对token进行校验
  - 获取token
  - <img src="03 session和cookie和JWT.assets/image-20240329215444152.png" alt="image-20240329215444152" style="zoom:67%;" />
  - 22min处

# 3. HS256加密——HMAC-SHA256

- signing algorithm——签名算法
- signature——签名
- encryption——加密
- signatures are not encryptions
- signing jwt doesn't make the data unreadable, signatures only allow verification that the content of the jwt hasn't changed 
- what are jwt signatures?
  - <img src="03 session和cookie和JWT.assets/image-20240620215246400.png" alt="image-20240620215246400" style="zoom: 33%;" />
  - <img src="03 session和cookie和JWT.assets/image-20240620215318718.png" alt="image-20240620215318718" style="zoom: 50%;" />
- HMAC-SHA256：a symmetric keyed hashing algorithm(对称密钥哈希算法) that uses one secret key
- symmetric means two parties share the secret key
- the key is used for both generating the signature and validating the signatur

# 4. 代码实践

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

# ---------------------------------

# [0.预备知识](https://app.pluralsight.com/ilx/video-courses/ae8db6a7-8781-4022-8fe5-3af32fa0caf0/db2d63cb-f9c9-4b29-b96a-e3c3497dc385/6ce4d3af-095c-4635-bdb2-44a94dc2f68e)













































































