# ETag

> ETag（Entity Tag）是HTTP协议中的一种缓存机制，用于验证资源是否已被修改。浏览器和服务器通过ETag来实现高效的缓存管理。
>

### 工作原理

1. **生成ETag：** 服务器为每个资源生成一个唯一的ETag值，这个值通常是基于资源内容或其状态的哈希值。这个ETag值会作为HTTP响应头的一部分返回给浏览器。

   示例：
   ```http
   HTTP/1.1 200 OK
   ETag: "abc123"
   ```

2. **存储ETag：** 浏览器接收到资源和ETag后，会将ETag存储在缓存中，以便在未来的请求中使用。

3. **条件请求：** 当浏览器需要重新请求资源时，它会在请求头中包含一个`If-None-Match`字段，字段的值是之前存储的ETag值。

   示例：
   ```http
   GET /resource HTTP/1.1
   Host: example.com
   If-None-Match: "abc123"
   ```

4. **服务器验证：** 服务器收到带有`If-None-Match`头的请求后，会检查请求中的ETag与当前资源的ETag是否匹配。

   - 如果ETag匹配（即资源未被修改），服务器会返回一个304 Not Modified响应，表示资源未更改，浏览器可以使用缓存中的副本。
   - 如果ETag不匹配（即资源已被修改），服务器会返回新的资源和新的ETag。

   示例：
   ```http
   HTTP/1.1 304 Not Modified
   ```

### 优点

- **节省带宽：** 如果资源没有变化，服务器只需返回304状态码，避免了重复传输相同的数据。
- **提高性能：** 缓存机制减少了数据传输量和服务器处理负担，从而提高了页面加载速度和响应时间。

### 注意事项

- **ETag的生成：** ETag的生成应基于资源内容的唯一标识，以确保准确性。常见的方法包括使用哈希函数生成文件的哈希值。
- **ETag与缓存策略：** ETag可以与其他缓存控制头（如`Cache-Control`）结合使用，来精细控制缓存策略。
- **安全性：** ETag的值可能暴露某些关于资源的信息，因此要注意避免泄露敏感数据。

# 无法在响应头看到ETag的原因

### 1. **服务器未配置ETag**

- **原因：** 服务器可能未启用或未配置ETag功能。ETag是服务器端生成的，必须由服务器明确设置。
- **解决方案：** 确保服务器的配置允许生成ETag，并且资源的ETag值能够正确返回。例如，在使用Nginx或Apache服务器时，可以检查相关配置。

### 2. **资源没有变化**

- **原因：** 有些服务器在资源未被修改时不会返回ETag。特别是在某些缓存策略中，服务器可能仅在资源变更时才返回ETag。
- **解决方案：** 尝试清除缓存或进行资源的实际修改，再次请求资源以检查是否返回ETag。

### 3. **请求头设置问题**

- **原因：** 如果你在请求中包含特定的头部（例如`If-None-Match`），有可能服务器未正确处理该请求并返回ETag。
- **解决方案：** 确保请求头设置正确，或者尝试发送一个普通的GET请求，不带条件头部。

### 4. **资源类型或文件格式**

- **原因：** 一些服务器可能对特定类型的资源（如动态生成的内容或某些API响应）不使用ETag。
- **解决方案：** 检查不同类型的资源，尤其是静态文件（如HTML、CSS、JS文件）和动态内容，看看是否在其中找到ETag字段。

### 5. **代理或负载均衡器**

- **原因：** 在使用代理或负载均衡器的情况下，ETag可能被移除或未传递到客户端。
- **解决方案：** 确保中间层（如代理服务器）允许ETag传递，并且不会修改或删除相关响应头。

### 6. **浏览器缓存**

- **原因：** 浏览器的缓存可能会影响你看到的响应头。可能浏览器直接使用了缓存中的副本，而不是从服务器获取最新的响应。
- **解决方案：** 清除浏览器缓存，或者使用“无痕”模式进行测试，再次查看响应头。

如果你排除了以上所有可能性，但仍然看不到ETag字段，建议检查服务器日志或与服务器管理员联系，以确保ETag功能正常工作。

# ETag匹配，但服务器不返回304，仍返回200状态码的原因

> 实际原因：需要自己处理状态码的返回，设置ctx.status = 304

当ETag匹配但服务器仍然返回200状态码而不是304 Not Modified时，可能有几个原因：

1. **ETag生成和比较问题**：
   - 确保服务器端生成的ETag与客户端请求中的`If-None-Match`头的ETag完全一致。如果ETag生成或比较的逻辑有问题，可能会导致匹配失败。
   
   ```javascript
   const Koa = require('koa');
   const etag = require('koa-etag');
   const app = new Koa();
   
   app.use(etag());
   
   app.use(async ctx => {
     ctx.body = 'Hello World'; // 确保响应体不变以便ETag一致
   });
   
   app.listen(3000);
   ```

2. **ETag是否被修改**：
   - 确保在响应体没有更改的情况下ETag保持不变。如果响应体的内容或其他影响ETag的因素发生变化，即使ETag匹配也会返回200状态码。

3. **中间件顺序**：
   - 确保`koa-etag`中间件位于其他处理响应的中间件之前。这样`koa-etag`才能正确计算ETag并在最终响应中应用它。

   ```javascript
   const Koa = require('koa');
   const etag = require('koa-etag');
   const app = new Koa();
   
   app.use(etag());
   
   app.use(async ctx => {
     ctx.body = 'Hello World';
   });
   
   app.listen(3000);
   ```

4. **客户端请求头**：
   - 检查客户端是否正确发送了`If-None-Match`头。如果客户端请求中没有包含`If-None-Match`头，服务器不会返回304状态码。

   示例请求：

   ```http
   GET / HTTP/1.1
   Host: localhost:3000
   If-None-Match: "etag-value"
   ```

5. **缓存中间件和配置**：
   - 如果使用了其他缓存中间件或代理，检查它们的配置是否影响ETag处理。例如，有些代理可能会改变或忽略ETag头。

6. **Koa版本和中间件版本**：
   - 确保使用的`koa-etag`版本与Koa版本兼容，某些中间件版本可能会有已知的问题或不兼容性。

7. **其他HTTP头**：
   - 检查是否有其他HTTP头（如`Cache-Control`）影响响应的缓存行为。例如，某些`Cache-Control`设置可能会导致服务器忽略ETag的检查。

# [浏览器缓存](https://ke.qq.com/webcourse/2837895/102948532#taid=10038635653713287&vid=5285890788266905342)

304 重定向：用浏览器上的`ETag`和`lastModified `这两个值去对比 服务器上的这两个值。如果相同，证明没有被修改过。

`ETag`：是服务器对资源定义的唯一标识

`lastModified`：看最后的修改时间是否跟服务器中存的最后的修改时间一致。如果一致，服务器返回304，浏览器去缓存中拿数据。如果不一致（ETag和lastModified中有一个不一致，服务端就得返回新的资源）

`请求头`中：

* `Pragma：no-cache`

  * 指示浏览器忽略资源缓存副本（有缓存，只是不用而已）。每次访问需到服务器获取。 
  * `Pragma`是`http1.0`字段，`http1.1`用`Cache-Control`代替(`Cache-Control`字段在请求头和响应头中都有)

* `Cache-Control`

  * `no-cache`：指示浏览器**忽略**资源缓存副本，~~强制到服务器获取资源~~（**浏览器依然缓存**）
    * 注意：应该不是`强制到服务器获取资源`，应该是`发送请求向服务器验证资源的有效性`
  * `no-store`：强制缓存在任何情况下都不要保留任何副本
  * `max-age=31536000`：指示缓存副本的有效时长（单位：秒）
  * `public`：表明响应可以被任何对象（包括：发送请求的客户端，代理服务器等）缓存
  * `private`：表明响应只能被单个用户缓存，不能作为共享缓存（即代理服务器不能缓存它）

* `Expires`：Mon, 15 Aug 2016 03:56:47 GMT(`Cache-Control`更高)

  * GMT：格林威治时间（东加西减）

  * 启用缓存和定义缓存时间。告诉浏览器资源缓存过期时间，如果还没过该时间点则不发请求
  * 从`http1.1`开始，使用`Cache-Control：max-age = 秒`代替

  看到26分钟处停止，那里的图误导人。

  后面又继续看到27min46s处


# [深入理解浏览器的缓存机制](https://www.jianshu.com/p/54cc04190252)

## 一、缓存位置

从缓存位置上说缓存分四种，并各有优先级，当依次查找缓存且都未命中时，才去请求网络

### 1. Service Worker

- `Service Worker`是运行在浏览器背后的独立线程。使用`Service Worker`的话，传输协议必须为 `HTTPS`。因为`Service Worker`中涉及到请求拦截，所以必须用`HTTPS`协议来保障安全。**Service Worker 的缓存与浏览器其他内建的缓存机制不同，它可以让我们自由控制缓存哪些文件、如何匹配缓存、如何读取缓存，并且缓存是持续性的**
- `Service Worker` 实现缓存功能一般分三个步骤：
  - 注册 `Service Worker`
  - 监听到 install 事件以后就可以缓存需要的文件
  - 在下次用户访问时就可通过拦截请求的方式查询是否存在缓存，存在缓存的话就可直接读取缓存文件，否则就去请求数据
- 当 `Service Worker` 未命中缓存时，需要去调用 fetch 函数获取数据。即，若我们没有在 `Service Worker `命中缓存的话，会根据缓存查找优先级去查找数据。但不管我们是从 `Memory Cache` 中还是从网络请求中获取的数据，浏览器都会显示我们是从 `Service Worker `中获取的内容

### 2. Memory Cache

> 内存中的缓存

- 包含页面中已抓取到的资源，例如页面上已下载的样式、脚本、图片等。读取内存中的数据比磁盘快, 内存缓存虽读取高效，但缓存持续性短，会随进程的释放而释放。 **一旦关闭 Tab 页面，内存中的缓存也就被释放了**
- **既然内存缓存这么高效，我们是否能让数据都存放在内存中？**
  - 不可以。内存比硬盘容量小得多，操作系统需精打细算内存的使用，所以能让我们使用的内存必然不多
- 当访问过页面后，再次刷新页面，可发现很多数据都来自于内存缓存
- ![img](05 sessionStorage和localStorage.assets/webp.webp)
- 内存缓存中有一块重要的缓存资源是`preloader`相关指令（例如`<link rel="prefetch">`）下载的资源
  - preloader的相关指令是页面优化的常见手段之一，它可一边解析js/css文件，一边网络请求下一个资源
- 注意：**内存缓存在缓存资源时并不关心返回资源的HTTP缓存头Cache-Control是什么值，同时资源的匹配也并非仅仅是对URL做匹配，还可能会对Content-Type，CORS等其他特征做校验**。??????

### 3. Disk Cache

> 存储在硬盘中的缓存

- 读取速度慢点，但什么都能存储到磁盘中，**比之 Memory Cache 胜在容量和存储时效性上**
- 在所有浏览器缓存中，`Disk Cache` 覆盖面基本是最大的。它会根据 `HTTP Header` 中的字段判断哪些资源需要缓存，哪些资源可不请求直接使用，哪些资源已过期需重新请求。并且即使在跨站点的情况下，相同地址的资源一旦被硬盘缓存下来，就不会再次去请求数据。绝大部分的缓存都来自 `Disk Cache`
- `  ctx.set('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour `
- ![image-20240810232844802](05 sessionStorage和localStorage.assets/image-20240810232844802.png)

### 4. Push Cache

> 推送缓存
>

- 是 `HTTP/2` 中的内容，当以上三种缓存都未命中时，它才会被使用。**它只在会话（Session）中存在，一旦会话结束就被释放，且缓存时间也很短暂**，在Chrome中只有5分钟左右，同时它也并非严格执行HTTP头中的缓存指令
- Push Cache 在国内能查到的资料很少，也是因为` HTTP/2` 在国内不够普及。推荐阅读`Jake Archibald`的 [HTTP/2 push is tougher than I thought](https://links.jianshu.com/go?to=https%3A%2F%2Fjakearchibald.com%2F2017%2Fh2-push-tougher-than-i-thought%2F) 这篇文章，文章中的几个结论：
  - 所有资源都能被推送，且能够被缓存，但  Edge 和 Safari 支持相对较差
  - 可推送 `no-cache` 和` no-store` 的资源
  - 一旦连接被关闭，`Push Cache` 就被释放
  - 多个页面可使用同一个`HTTP/2`的连接，也就可使用同一个`Push Cache`。这主要依赖浏览器的实现而定，出于对性能的考虑，有的浏览器会对相同域名但不同的tab标签使用同一个HTTP连接
  - Push Cache 中的缓存只能被使用一次
  - 浏览器可以拒绝接受已经存在的资源推送
  - 可以给其他域名推送资源

若以上四种缓存都未命中，那只能发起请求来获取资源

为了性能考虑，大部分接口都应选择好缓存策略，**通常浏览器缓存策略分为两种：强缓存和协商缓存，且缓存策略都是通过设置 HTTP Header 来实现**

## 二、缓存过程分析

浏览器与服务器通信的方式为应答模式，即：浏览器发起HTTP请求 – 服务器响应该请求，**那浏览器怎么确定一个资源该不该缓存，如何去缓存呢**？浏览器第一次向服务器发起请求后拿到请求结果后，将请求结果和缓存标识存入浏览器缓存，**浏览器对于缓存的处理是根据第一次请求资源时返回的响应头来确定的**。具体过程如下：

![img](05 sessionStorage和localStorage.assets/webp-17231858452682.webp)

由上图可知：

- 浏览器每次发起请求，都会先在浏览器缓存中查找该请求的结果以及缓存标识
- 浏览器每次拿到返回的请求结果都会将该结果和缓存标识存入浏览器缓存中

以上两点是浏览器缓存机制的关键，它确保了每个请求的缓存存入与读取

根据**是否需向服务器重新发起HTTP请求**将缓存过程分为两个部分——强缓存和协商缓存

## 三、强缓存  

> 不向服务器发请求，直接从缓存中读取资源，在chrome控制台的Network选项中可看到请求返回200状态码，且Size显示`from disk cache`或`from memory cache`
>
> **强缓存可通过设置两种 HTTP Header 实现：`Expires` 和 `Cache-Control`**

### 1. Expires

> 缓存过期时间，用来指定资源到期的时间，是服务器端具体的时间点

Expires=max-age + 请求时间，需和`Last-modified`结合使用。`Expires`是**响应消息头**字段，在响应http请求时告诉浏览器在过期时间前浏览器可直接从浏览器缓存取数据，无需再次请求

`Expires` 是 `HTTP/1.0`的产物，受限于本地时间，若修改了本地时间，可能会造成缓存失效

`Expires: Wed, 22 Oct 2018 08:41:00 GMT`表示资源会在 Wed, 22 Oct 2018 08:41:00 GMT 后过期，需再次请求

### 2. Cache-Control

在`HTTP/1.1`中，`Cache-Control`是最重要的规则

`Cache-Control:max-age=300`，代表在请求正确返回时间（浏览器也会记录下来）的5分钟内再次加载资源，就会命中强缓存

`Cache-Control `可在请求头或者响应头中设置，并可组合使用：

1. `public`：所有内容都将被缓存（客户端和代理服务器都可缓存）

2. `private`：所有内容只有客户端可缓存，`Cache-Control`的默认值

3. `no-cache`：客户端缓存内容，是否使用缓存需经过**协商缓存**来决定

   ​					  表示不使用 `Cache-Control`的缓存控制方式做前置验证，而是用 `Etag` 或者`Last-Modified`控制缓存

   ​					  注意：**设置`no-cache`后，并不是说浏览器就不再缓存数据，只是浏览器在使用缓存数据时，需先确认一下数据是否还跟服务器保持一致**

4. `no-store`：所有内容都不会被缓存，即不使用强制缓存，也不使用协商缓存

5. `max-age`：max-age=xxx (xxx is numeric)表示缓存内容将在xxx秒后失效

6. `s-maxage`（单位为s)：同max-age作用一样，只在代理服务器中生效（比如CDN缓存）。比如当s-maxage=60时，在这60秒中，即使更新了CDN的内容，浏览器也不会进行请求。max-age用于普通缓存，而s-maxage用于代理缓存。**s-maxage的优先级高于max-age**。如果存在s-maxage，则会覆盖掉max-age和Expires header

<img src="05 sessionStorage和localStorage.assets/3174701-3fa81f5e9efac5af.webp" alt="3174701-3fa81f5e9efac5af" style="zoom: 67%;" />

### 3. Expires和Cache-Control对比

- `Expires` 是`http1.0`的产物
- `Cache-Control`是`http1.1`的产物
- 同时存在时，`Cache-Control`优先级高于`Expires`

强缓存判断是否缓存的依据来自于是否超出某个时间或者某个时间段，而不关心服务器端文件是否已更新，这可能导致加载文件不是服务器端最新的内容

如何获知服务器端内容是否已发生了更新呢？此时需用到协商缓存策略

## 四、协商缓存

> 协商缓存就是强制缓存失效后，浏览器携带缓存标识向服务器发起请求，由服务器根据缓存标识决定是否使用缓存的过程

主要有两种情况：

|             协商缓存生效，返回304和Not Modified              |               协商缓存失效，返回200和请求结果                |
| :----------------------------------------------------------: | :----------------------------------------------------------: |
| ![img](05 sessionStorage和localStorage.assets/webp-17231885793006.webp) | ![img](05 sessionStorage和localStorage.assets/webp-17231885874588.webp) |

协商缓存可以通过设置两种 HTTP Header 实现：`Last-Modified` 和 `ETag` 

### 1. Last-Modified和If-Modified-Since

浏览器在第一次访问资源，服务器返回资源的同时，在`response header`中添加` Last-Modified`的`header`，值是这个资源在服务器上的最后修改时间，浏览器接收后缓存文件和`header`；

```css
Last-Modified: Fri, 22 Jul 2016 01:47:00 GMT
```

浏览器下一次请求这个资源，浏览器检测到有` Last-Modified`这个header，于是添加`If-Modified-Since`这个header，值就是`Last-Modified`中的值；

服务器再次收到这个资源请求，会根据 `If-Modified-Since` 中的值与服务器中这个资源的最后修改时间对比，若没有变化，返回304和空的响应体，直接从缓存读取，如果`If-Modified-Since`的时间小于服务器中这个资源的最后修改时间，说明文件有更新，于是返回新的资源文件和200

但 Last-Modified 存在一些弊端：

* 如果本地打开缓存文件，即使没有对文件进行修改，但还是会造成 `Last-Modified` 被修改，服务端不能命中缓存导致发送相同的资源
* 因为 `Last-Modified` 只能以秒计时，如果在不可感知的时间内修改完成文件，那么服务端会认为资源还是命中了，不会返回正确的资源

既然根据文件修改时间来决定是否缓存尚有不足，能否可以直接根据文件内容是否修改来决定缓存策略？所以在 `HTTP / 1.1` 出现了 `ETag` 和`If-None-Match`

### 2. ETag和If-None-Match

> Etag是服务器响应请求时，返回当前资源文件的一个唯一标识(由服务器生成)，只要资源有变化，Etag就会重新生成

浏览器在下一次加载资源向服务器发送请求时，会将上一次返回的`Etag`值放到`request header`里的`If-None-Match`里，服务器只需要比较客户端传来的`If-None-Match`跟自己服务器上该资源的`ETag`是否一致，就能很好地判断资源相对客户端而言是否被修改过了。如果服务器发现ETag匹配不上，那么直接以常规GET 200回包形式将新的资源（当然也包括了新的ETag）发给客户端；如果ETag是一致的，则直接返回304知会客户端直接使用本地缓存即可

### 3. 两者对比：

- 在精确度上，`Etag`要优于`Last-Modified`
  - `Last-Modified`的时间单位是秒，如果某个文件在1秒内改变了多次，那么他们的`Last-Modified`其实并没有体现出来修改，但是`Etag`每次都会改变确保了精度；如果是负载均衡的服务器，各个服务器生成的`Last-Modified`也有可能不一致


- 在性能上，`Etag`要逊于`Last-Modified`，`Last-Modified`只需记录时间，而`Etag`需服务器通过算法来计算出一个hash值
- 在优先级上，服务器校验优先考虑`Etag`

## 五、缓存机制

> 强制缓存优先于协商缓存，若强制缓存(`Expires`和`Cache-Control`)生效则直接使用缓存，若不生效则进行协商缓存(`Last-Modified` /` If-Modified-Since`和`Etag` / `If-None-Match`)，协商缓存由服务器决定是否使用缓存，若协商缓存失效，那么代表该请求的缓存失效，返回200，重新返回资源和缓存标识，再存入浏览器缓存中；生效则返回304，继续使用缓存
>

**注意：是强制缓存不生效，不是缓存不生效没了**

![3174701-9d9e8b52a18ed35a](05 sessionStorage和localStorage.assets/3174701-9d9e8b52a18ed35a.webp)

## 六、实际场景应用缓存策略

### 1. 频繁变动的资源

> Cache-Control: no-cache

对于频繁变动的资源，首先需使用`Cache-Control: no-cache` 使浏览器每次都请求服务器，然后配合 `ETag` 或者 `Last-Modified` 来验证资源是否有效。这样的做法虽不能节省请求数量，但能显著减少响应数据大小

### 2. 不常变化的资源

> Cache-Control: max-age=31536000

通常在处理这类资源时，给 `Cache-Control` 配置一个很大的 `max-age=31536000` (一年)，这样浏览器之后请求相同的 URL 会命中**强制缓存**。而为了解决更新的问题，就需要在文件名(或者路径)中添加 hash， 版本号等动态字符，之后更改动态字符，从而达到更改引用 URL 的目的，让之前的强制缓存失效 (其实并未立即失效，只是不再使用了而已)。

## 七、用户行为对浏览器缓存的影响

所谓用户行为对浏览器缓存的影响，指的就是用户在浏览器如何操作时，会触发怎样的缓存策略。主要有 3 种：

- 打开网页，地址栏输入地址： 查找 `disk cache` 中是否有匹配。如有则使用；如没有则发送网络请求
- 普通刷新 (F5)：因为 TAB 并没有关闭，因此 memory cache 是可用的，会被优先使用(如果匹配的话)。其次才是 disk cache
- 强制刷新 (Ctrl + F5)：浏览器不使用缓存，因此发送的请求头部均带有 `Cache-control: no-cache`(为了兼容，还带了 `Pragma: no-cache`), 服务器直接返回 200 和最新内容

# 浏览器缓存相关的官方文档

### 1. **MDN Web Docs**

MDN Web Docs 提供了详细的浏览器缓存和缓存机制的文档。以下是相关链接：

- **HTTP 缓存**:
  [MDN Web Docs - HTTP 缓存](https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching)
  
  这个文档详细解释了缓存的基本概念，包括缓存的工作原理、相关的 HTTP 头（如 `Cache-Control`、`Expires`、`ETag`、`Last-Modified`）以及如何使用这些头来控制缓存行为。

- **Cache-Control 头**:
  [MDN Web Docs - Cache-Control](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control)
  
  这里介绍了 `Cache-Control` 头的各种指令，如何使用它们来控制缓存策略，以及常见的指令说明。

- **ETag 和 Last-Modified**:
  [MDN Web Docs - ETag](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/ETag)
  
  这个页面详细描述了 `ETag` 的使用和工作原理，以及如何在响应和请求中利用 `ETag` 来实现缓存验证。

### 2. **Google Developers**

Google 的开发者文档也提供了关于缓存的有用信息：

- **Caching best practices**:
  [Google Developers - Caching Best Practices](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching)
  
  这篇文章提供了有关 HTTP 缓存的最佳实践，包括如何使用缓存来提高网站性能和用户体验。

### 3. **RFC 文档**

HTTP 缓存相关的标准由 IETF（互联网工程任务组）发布，以下是相关的 RFC 文档：

- **RFC 7234 - HTTP/1.1: Caching**:
  [RFC 7234 - HTTP/1.1: Caching](https://www.rfc-editor.org/info/rfc7234)

  这个 RFC 文档详细描述了 HTTP/1.1 中缓存的规范，包括缓存的算法、缓存控制指令等。

这些资源涵盖了浏览器缓存的基本概念、控制机制和最佳实践，可以帮助你更深入地理解缓存的工作原理和优化缓存策略。

# 浏览器缓存相关基础

### 1. **缓存控制头**

- **Cache-Control**:
  `Cache-Control` 头用于指定缓存策略，包括缓存的有效期和缓存行为。常见的指令包括：
  
  - `max-age`: 指定资源的最大缓存时间（以秒为单位）。
  - `no-cache`: 指定资源必须在使用前重新验证。
  - `no-store`: 指定资源不应被缓存。
  - `public`: 资源可以被任何缓存存储。
  - `private`: 资源只能被用户的浏览器缓存，不能被共享缓存存储。
  
  示例：
  ```http
  Cache-Control: max-age=3600, public
  ```
  
- **Expires**:
  `Expires` 头指定资源的过期时间。这个时间点之前，缓存的资源被认为是有效的。

  示例：
  ```http
  Expires: Wed, 21 Aug 2024 07:28:00 GMT
  ```

### 2. **缓存验证**

- **ETag**:
  `ETag` 是服务器为特定资源生成的唯一标识符。当客户端请求资源时，可以在请求中包含 `If-None-Match` 头，与服务器上的 `ETag` 比较。如果匹配，服务器返回 `304 Not Modified` 状态，表示资源没有更改。

  示例：
  ```http
  ETag: "abc123"
  ```

  客户端请求：
  ```http
  If-None-Match: "abc123"
  ```

- **Last-Modified**:
  `Last-Modified` 头表示资源的最后修改时间。客户端可以在请求中包含 `If-Modified-Since` 头，服务器会比较该时间与资源的实际修改时间。如果资源没有更改，服务器返回 `304 Not Modified` 状态。

  示例：
  ```http
  Last-Modified: Tue, 20 Aug 2024 07:28:00 GMT
  ```

  客户端请求：
  ```http
  If-Modified-Since: Tue, 20 Aug 2024 07:28:00 GMT
  ```

### 3. **缓存存储机制**

- **浏览器缓存**:
  浏览器缓存通常包括缓存的响应体、缓存的头部信息以及元数据。缓存的资源存储在浏览器的缓存存储中，便于后续请求快速加载。

- **服务工作者缓存**:
  使用服务工作者（Service Worker）可以在浏览器中实现更高级的缓存策略，例如离线缓存和自定义缓存策略。服务工作者通过编程接口控制缓存的行为。

### 4. **缓存策略**

- **强缓存**:
  强缓存策略通过 `Cache-Control` 和 `Expires` 头来控制资源的缓存时间。浏览器在缓存有效期内直接从缓存中加载资源，不发送网络请求。

- **协商缓存**:
  协商缓存策略通过 `ETag` 和 `Last-Modified` 头来验证资源的状态。如果资源未更改，服务器返回 `304 Not Modified` 状态，浏览器继续使用缓存的资源。

### 5. **最佳实践**

- **使用合理的缓存策略**:
  根据资源的变化频率设置合适的缓存时间，确保用户获取到最新的内容，同时减少不必要的网络请求。

- **合理使用缓存头**:
  结合 `Cache-Control`、`Expires`、`ETag` 和 `Last-Modified` 头来实现灵活的缓存控制。

- **清理缓存**:
  定期检查和清理缓存，避免过期或无用的缓存占用空间。

- **避免缓存问题**:
  对于动态内容或频繁变化的资源，可以设置短缓存时间，确保用户获取到最新内容。对于静态资源，可以利用版本号或哈希值来避免缓存问题。

# Cache-Control: no-cache

`Cache-Control` 头部中的 `no-cache` 指令用于控制缓存的行为。尽管其名字中有 "no" 和 "cache" 这两个词，实际上 `no-cache` 并不是完全禁止缓存，而是要求缓存验证机制。在实际使用中，`no-cache` 的作用和细节如下：

### 1. **`no-cache` 的含义**

- **强制验证**：`no-cache` 指令的主要作用是告知缓存（包括浏览器缓存和代理缓存），在使用缓存中的资源之前必须先向服务器验证该资源的有效性。换句话说，即使资源被缓存，客户端也需要向服务器发送请求，以确认资源是否已更改。

- **缓存存储**：即使设置了 `no-cache`，资源仍然会被缓存到本地缓存存储中。只是当客户端再次请求该资源时，它会先向服务器发起请求，并附带 `If-None-Match` 或 `If-Modified-Since` 头部，以检查资源的状态。

### 2. **`no-cache` 与其他指令的关系**

- **与 `max-age` 结合**：如果同时设置了 `no-cache` 和 `max-age`，`max-age` 指令会被忽略。也就是说，缓存的资源会被存储，但每次使用之前都需要重新验证。

  示例：
  ```http
  Cache-Control: no-cache, max-age=3600
  ```
  在这种情况下，即使资源可以被缓存 1 小时（3600 秒），客户端仍然需要每次请求前验证资源的有效性。

- **与 `no-store` 区别**：`no-store` 指令会完全禁止缓存资源，而 `no-cache` 仅要求在使用缓存的资源之前进行验证。`no-store` 适用于对缓存安全性要求很高的场景，例如处理敏感数据时。

  示例：
  ```http
  Cache-Control: no-store
  ```

### 3. **`no-cache` 的使用场景**

- **动态内容**：对频繁变化的动态内容使用 `no-cache` 可以确保客户端始终从服务器获取最新的数据。例如，用户的个人信息页面或实时更新的新闻页面。

- **确保一致性**：在一些需要确保客户端和服务器之间数据一致性的场景下，使用 `no-cache` 可以避免缓存的旧数据导致不一致问题。

### 4. **`no-cache` 的实际效果**

当客户端请求一个设置了 `Cache-Control: no-cache` 的资源时，它会：
1. 从本地缓存中查找资源。
2. 即使资源存在于缓存中，客户端仍然会向服务器发送请求来验证资源的有效性。
3. 服务器根据资源的实际状态决定是否返回 `304 Not Modified` 状态（如果资源未更改）或者返回新的资源和 `200 OK` 状态（如果资源已更改）。

### 5. **示例**

假设你有一个资源（例如 JSON 文件），你希望每次客户端请求时都验证是否有更新，但又允许缓存存储这个资源。你可以这样设置响应头：

```http
Cache-Control: no-cache
```

当客户端请求这个资源时，实际流程如下：
- 客户端从缓存中取出资源，并向服务器发送请求，附带 `If-None-Match` 或 `If-Modified-Since` 头部。
- 服务器检查资源是否已更改，如果没有更改，返回 `304 Not Modified` 状态。如果更改了，返回新的资源和 `200 OK` 状态。

### 总结

`no-cache` 是一个重要的缓存指令，用于确保在使用缓存的资源之前先进行验证，保证客户端获取到的资源是最新的。理解 `no-cache` 的工作原理和适用场景，可以帮助你设计更加有效的缓存策略，提升用户体验和系统性能。

# Cache-Control: no-cache在服务端响应头和客户端请求头中的区别

### 1. 服务端响应头中的 `Cache-Control: no-cache`

当服务端响应头中包含 `Cache-Control: no-cache` 时，这告诉客户端（包括浏览器或其他缓存中介，如代理服务器）：

- **必须验证**：即使响应被缓存，也需要在使用缓存的内容之前，先向服务端验证缓存是否仍然有效。
- **不一定强制缓存失效**：客户端可以缓存内容，但每次使用缓存的内容之前必须进行验证。它并不完全阻止缓存，而是要求对缓存内容的有效性进行确认。

这种设置常用于确保客户端在每次请求时都能获得最新的数据，尤其在数据可能频繁变化时。

### 2. 客户端请求头中的 `Cache-Control: no-cache`

当客户端在请求头中包含 `Cache-Control: no-cache` 时，这告诉服务端：

- **请求不应从缓存中响应**：客户端希望从服务端获取最新的资源，而不是使用缓存的版本
- **强制要求验证**：即使服务端返回了缓存内容，客户端也希望服务器进行验证，以确保响应是最新的

这种设置通常用于确保客户端总是从服务端获取最新的资源，而不是使用可能已过时的缓存内容。

### 总结

- **服务端响应头中的 `Cache-Control: no-cache`**：指示客户端在使用缓存前必须先验证缓存的有效性，允许缓存，但需保证其更新性。
- **客户端请求头中的 `Cache-Control: no-cache`**：请求服务端不使用缓存的响应，要求服务端提供最新的数据，通常用于避免从缓存中获取内容。

# Last-Modified

`Last-Modified` 是一个 HTTP 响应头，用于指示资源最后一次被修改的时间。它的主要作用是让浏览器或其他客户端能够利用缓存来减少不必要的网络请求，从而提升性能和效率。

### `Last-Modified` 头的工作原理

1. **服务器端**：
   - 当服务器响应一个请求时，它会在 HTTP 响应头中包含 `Last-Modified` 头，指明资源的最后修改时间。例如：`Last-Modified: Wed, 09 Aug 2024 15:00:00 GMT`。
   - 这个时间通常是资源的最后修改时间或者创建时间，格式符合 HTTP 标准日期格式。

2. **客户端**：
   - 客户端（如浏览器）在第一次请求资源时，会收到包含 `Last-Modified` 头的响应。
   - 当客户端再次请求相同资源时，它会在请求头中添加 `If-Modified-Since` 头，带上上一次响应中 `Last-Modified` 的时间。

3. **服务器端的缓存验证**：
   - 服务器接收到带有 `If-Modified-Since` 头的请求后，会检查资源的当前状态。
   - 如果资源在 `If-Modified-Since` 提供的时间之后没有被修改，服务器会返回一个 `304 Not Modified` 响应，告知客户端使用缓存的资源，而无需重新传输数据。
   - 如果资源已经被修改，服务器会返回最新的资源和更新后的 `Last-Modified` 头。

### `Last-Modified` 的优缺点

**优点**：
- **提高性能**：通过减少不必要的数据传输，提高了缓存的利用率，从而降低了带宽消耗和响应时间。
- **节省资源**：减少了服务器和客户端的处理负担。

**缺点**：
- **精度限制**：`Last-Modified` 头的时间精度是秒级的。如果资源在秒级别内发生了多次修改，可能会导致客户端无法正确判断资源是否需要更新。
- **文件系统限制**：有些文件系统可能无法提供准确的修改时间，这可能影响 `Last-Modified` 头的准确性。
- **动态内容**：对于动态生成的内容，`Last-Modified` 头的使用可能不适用，因为每次生成的内容可能不同，而时间戳并不能准确反映实际的变化。

### 实际使用中的注意事项

- **与 `ETag` 结合使用**：有时，`Last-Modified` 头会与 `ETag` 头一起使用。`ETag` 是另一种缓存机制，提供了资源的版本标识符。相比 `Last-Modified`，`ETag` 可以提供更细粒度的缓存验证。
- **时间格式**：`Last-Modified` 头使用的是 HTTP-date 格式，通常是 RFC 7231 标准定义的日期和时间格式，如 `Tue, 08 Aug 2024 12:00:00 GMT`。

总的来说，`Last-Modified` 头在缓存策略中扮演了重要角色，但在现代 Web 应用中，它往往与其他缓存控制机制（如 `ETag`）一起使用，以提高缓存的准确性和效率。

# 用koa和react实现浏览器返回304状态码（不使用中间件）

要在 Koa 和 React 应用中实现浏览器返回 304 状态码，而不使用中间件，您可以手动设置 ETag 或 Last-Modified 头。以下是如何手动设置这些头并在 Koa 中处理缓存验证的步骤：

### 1. **设置 Koa 后端**

您需要在 Koa 应用中手动处理 ETag 或 Last-Modified 头部，并根据请求中的头部决定是否返回 304 状态码。

#### 示例代码

以下是一个示例，展示了如何使用 `ETag` 和 `Last-Modified` 头部来处理缓存验证：

```javascript
const Koa = require('koa');
const crypto = require('crypto');
const app = new Koa();

// Helper function to generate ETag
const generateETag = (body) => {
  return crypto.createHash('md5').update(body).digest('hex');
};

app.use(async ctx => {
  // Simulate a React component rendered HTML or any dynamic content
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>My React App</title>
      </head>
      <body>
        <div id="root"></div>
        <script src="/static/bundle.js"></script>
      </body>
    </html>
  `;

  // Generate ETag and Last-Modified header values
  const etag = generateETag(html);
  const lastModified = new Date().toUTCString(); // For example, using current date

  // Check if client sent If-None-Match or If-Modified-Since headers
  if (ctx.headers['if-none-match'] === etag) {
    ctx.status = 304;
    return; // End the response here, no need to send the body
  }

  // Set ETag and Last-Modified headers
  ctx.set('ETag', etag);
  ctx.set('Last-Modified', lastModified);

  // Set Cache-Control header
  ctx.set('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour

  ctx.type = 'text/html';
  ctx.body = html;
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

### 2. **React 构建**

在构建 React 应用时，确保静态资源的文件名包含哈希值，以便浏览器正确缓存这些文件。使用工具（如 Webpack）来自动处理文件名哈希：

```javascript
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.[contenthash].js', // Include hash in filename
  },
  // Other configuration options
};
```

### 3. **如何工作**

- **首次请求**：
  - 客户端请求资源时，服务器返回 `200 OK` 状态码，并设置 `ETag` 和 `Last-Modified` 头。
  
- **后续请求**：
  - 客户端在请求中包含 `If-None-Match` 头（带有之前收到的 ETag 值）。
  - 服务器检查 `If-None-Match` 头与当前的 ETag 值是否匹配。如果匹配，返回 `304 Not Modified` 状态码，不再返回资源内容。
  - 如果不匹配或客户端未发送 `If-None-Match` 头，服务器会返回完整的资源和 `200 OK` 状态码。

### 总结

通过手动设置 ETag 和 Last-Modified 头部，您可以在 Koa 应用中控制缓存和实现 304 状态码，而不使用额外的中间件。这样，您可以确保客户端在缓存资源时能够正确进行验证，从而减少不必要的网络流量，提高性能。

# 请求头中未包括`If-None-Match`的原因

> 已解决

# Koa返回304状态码，但前端React接收到的仍是200状态码，如何解决该问题，为什么会出现该状况？



localStorage 里面存储的数据没有过期时间设置

存储在 sessionStorage 里面的数据在页面会话结束时会被清除

sessionStorage

- 页面会话在浏览器打开期间一直保持，并且重新加载或恢复页面仍会保持原来的页面会话。
- **在新标签或窗口打开一个页面时会复制顶级浏览会话的上下文作为新会话的上下文，**这点和 session cookies 的运行方式不同。
- 打开多个相同的URL的Tabs页面，会创建各自的`sessionStorage`。
- 关闭对应浏览器窗口（Window）/ tab，会清除对应的`sessionStorage`。 

![image-20240809194529590](05 sessionStorage和localStorage.assets/image-20240809194529590.png)









