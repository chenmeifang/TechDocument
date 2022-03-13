https://www.bilibili.com/video/BV1bk4y1m7zC

https://ke.qq.com/user/index/index.html#/plan/cid=2837895&term_id=102948532 买的课程

# 第1节 服务器搭建与相关操作 21min

wampServer

xampp

14min处

# 第2节 网络初探 URL 客户端与服务端 域名操作 139mins

5min开始

![截屏2021-02-22 上午1.00.11](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-22 上午1.00.11.png)

输入网址，敲回车，发生了什么？

1.DNS解析（将网址转成IP地址）

2.TCP/IP三次握手，建立TCP连接

3.发起HTTP请求

4.浏览器得到HTML代码，并解析HTML代码

5.请求下载HTML中的静态资源，渲染页面

6.四次挥手，中断连接请求

1小时44min处

# 第3节 DNS IP TCP/UDP HTTP/HTTPS 三次握手

## 描述DNS解析过程：

 

## HTTP与HTTPS：

HTML：超文本标记语言 Hyper Text Mark Language

HTTP：超文本传输协议 Hyper Text Transfer Protocol

HTTPS：超文本传输安全协议 Hyper Text Transfer Protocol Secure

HTTP与HTTPS本质上是一样的， HTTPS在HTTP的基础上加了一层安全层。  HTTPS是HTTP的安全版。（安全基础是SSL/TLS）

http不安全的原因是什么？

 是由于http在请求的过程中 很多东西是明文的。 

**SSL**： 安全套接层 Secure Sockets Layer

**TLS**：Transport Layer Security 传输层安全（对SSL进行了升级）

 ![截屏2021-02-22 下午3.22.12](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-22 下午3.22.12.png)

第二点中：客户端和服务器都无法验证对方身份。 只能靠标识位。 但是标识位有可能被篡改。

---

## 建立TCP连接的前奏



![截屏2021-02-22 下午4.02.50](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-22 下午4.02.50.png)

![截屏2021-02-22 下午4.01.48](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-22 下午4.01.48.png)

发送序号是上一次的确认序号

确认序号是上一次发送序号加一

![截屏2021-02-22 下午4.05.40](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-22 下午4.05.40.png)

  

# 第4节 www历史，HTTP报文，请求方式，GET与POST

这里讲了很多跟面试相关的！！！！

30min前

## www 30mins～50mins



## HTTP报文前言 57mins～

报文：客户端和服务端之间的数据传递

一次请求 服务端要知道 你是什么样的请求

![截屏2021-02-22 下午8.37.00](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-22 下午8.37.00.png)

“限制每次连接只处理一个请求”：这是传统的TCP/IP连接。

 背：![截屏2021-02-22 下午8.55.28](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-22 下午8.55.28.png)

一般来说，用post请求的时候，请求体是FormData——表单数据；get请求的时候请求体是查询字符串参数（Query String Parameters）

  ## 请求方式 POST与GET：

![截屏2021-02-22 下午9.10.24](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-22 下午9.10.24.png)

![截屏2021-02-22 下午9.11.34](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-22 下午9.11.34.png) 

背 区别： ![截屏2021-02-22 下午9.44.01](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-22 下午9.44.01.png)

![截屏2021-02-22 下午9.47.52](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-22 下午9.47.52.png)

![截屏2021-02-22 下午9.48.09](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-22 下午9.48.09.png)

![截屏2021-02-22 下午9.51.52](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-22 下午9.51.52.png)

加分项：

![截屏2021-02-22 下午9.55.14](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-22 下午9.55.14.png)

持久化连接 connection: keep-alive

![截屏2021-02-22 下午9.56.53](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-22 下午9.56.53.png)

管道化持久连接：

![截屏2021-02-22 下午9.57.34](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-22 下午9.57.34.png)

# 第5节 http状态码，accept，Content-Type 

1min后

背：

![截屏2021-02-23 上午12.16.32](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-23 上午12.16.32.png)

### 304 资源重定向：

![截屏2021-02-23 下午12.21.15](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-23 下午12.21.15.png)

![截屏2021-02-23 下午12.21.29](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-23 下午12.21.29.png)

### 302重定向：

### 404页面错误：页面不存在（找不到页面或者资源）

### 403服务器拒绝请求forbidden：服务器不给你权限进入

### 500 内部服务器错误

### 503 服务器当前不能处理客户端请求



## Accept 40min  

![截屏2021-02-23 下午12.29.27](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-23 下午12.29.27.png)

逗号分割



# 第6节 浏览器缓存 长短连接 Content-Length

![截屏2021-02-23 下午12.43.33](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-23 下午12.43.33.png)

缓存到底是怎么运行的？

![截屏2021-02-23 下午12.45.34](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-23 下午12.45.34.png)

为什么Cache-Control这个字段在请求头和响应头里面都有？

![截屏2021-02-23 下午12.50.55](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-23 下午12.50.55.png)

![截屏2021-02-23 下午1.04.22](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-23 下午1.04.22.png)

## 缓存机制：

![截屏2021-02-23 下午1.06.30](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-23 下午1.06.30.png)

感觉这个图是错的！！！缓存已经过期了为什么还能304读取缓存呢？？？？？？？？？？？？？？？？？？？？？？？？？？？？

31:10处

## 长短连接：Connection：keep-alive 

在请求头里面

## content-length：

1.GET请求：请求头没有content-length，响应头带content-length。

2.POST请求：请求头与响应头都带content-length

## Referer：来源域名

防盗链！！

# 第7节 http版本，关闭TCP，四次挥手

## HTTP版本 背不住：

### 1.HTTP/0.9

![截屏2021-02-23 下午7.03.58](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-23 下午7.03.58.png)

### 2.HTTP/1.0

![截屏2021-02-23 下午7.04.20](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-23 下午7.04.20.png)

### 3.HTTP/1.1

![截屏2021-02-23 下午7.07.11](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-23 下午7.07.11.png)

### 4.HTTP/2.0

双工模式和管道机制有什么区别？

服务器推送是如何知道要推哪些静态资源的？

![截屏2021-02-23 下午7.12.34](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-23 下午7.12.34.png)



---



![截屏2021-02-22 下午4.02.50](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-22 下午4.02.50.png)

![截屏2021-02-22 下午4.01.48](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-22 下午4.01.48.png)

## 关闭TCP连接的前奏

![截屏2021-02-23 下午7.18.36](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-23 下午7.18.36.png)

SYN：synchronize sequence numbers 同步序列编号

FIN：数据包

![截屏2021-02-23 下午7.43.07](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-23 下午7.43.07.png)

小写ack：确认FIN包的信息，包里面的数据我已经看过了

大写ACK：指发送的数据包

## 同源策略 1小时25min处



















