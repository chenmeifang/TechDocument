# [1. HTTPS](https://www.bilibili.com/video/BV1KY411x7Jp/?spm_id_from=333.337.search-card.all.click&vd_source=a7089a0e007e4167b4a61ef53acc6f7e)

- http协议的请求和响应的报文都是明文的
- https：在http的基础上用TLS/SSL进行加密，这样通信就不容易受到拦截和攻击

## 1.1 TLS/SSL

- SSL是TLS的前身，都是加密安全协议

## 1.2 对称加密

## 1.3 非对称加密

<img src="02 https.assets/image-20240731191158604.png" alt="image-20240731191158604" style="zoom: 33%;" />

> 数据经过公钥加密就只能被私钥解密
>
> 数据经过私钥加密就只能被公钥解密

## 1.4. SSL证书

> SSL证书是保存在源服务器的数据文件
>
> 要让SSl证书生效，需要向CA（Certificate Authority 证书授权中心）申请
>
> CA是第三方的机构，这样大家都来信任这个机构颁发的证书
>
> 这个证书处理表明域名是属于谁的，日期等等信息以外，重要的是这个证书里面还包括了特定的公钥和私钥
>
> 简单来说，就是服务器安装了SSL证书以后，用户就可以通过HTTPS来访问服务器了。当然浏览器也会把HTTP的默认端口80改成HTTPS的默认端口443
>
> certificate：n 证明，证明书，文凭，结业证书，合格证书
>
> authority：

9min处

# 3. 申请15年SSL免费证书

https://www.bilibili.com/video/BV13X4y127gL/?spm_id_from=333.337.search-card.all.click&vd_source=a7089a0e007e4167b4a61ef53acc6f7e

cloudflare.com

# 4. SSL连接过程

https://www.bilibili.com/video/BV1Jp4y1T7NQ/?spm_id_from=333.337.search-card.all.click&vd_source=a7089a0e007e4167b4a61ef53acc6f7e

<img src="02 https.assets/image-20240328230353013.png" alt="image-20240328230353013" style="zoom: 67%;" />

<img src="02 https.assets/image-20240328230522974.png" alt="image-20240328230522974" style="zoom: 67%;" />

# [5. 浏览器是如何验证https证书合法性的](https://blog.csdn.net/WoTrusCA/article/details/108253548)

# 6. 数字签名和CA数字证书的核心原理和作用

https://www.bilibili.com/video/BV1mj421d7VE/?spm_id_from=333.788&vd_source=a7089a0e007e4167b4a61ef53acc6f7e



[https的加密原理](https://zhuanlan.zhihu.com/p/43789231)

Q: HTTPS 为什么安全？ 

* HTTPS 保证了传输安全，防止传输过程被监听、防止数据被窃取
* 可以确认网站的真实性

Q: 为什么需要证书？ 

*  防止”中间人“攻击，同时可以为网站提供身份证明。

Q: 使用 HTTPS 会被抓包吗？ 

* 会被抓包，HTTPS 只防止用户在不知情的情况下通信被监听，如果用户主动授信，是可以构建“中间人”网络，代理软件可以对传输内容进行解密。

Q: 什么是“中间人”攻击？

* https://www.sohu.com/a/441390545_185201

中间人攻击分为五种类型：

* Wi-Fi欺骗：攻击者可以创建与本地免费Wi-Fi同名的虚假Wi-Fi接入点(AP)。例如，在上例的咖啡馆中，攻击者会模仿创建一个和墙上贴着Wi-Fi信息同名“Guest Wi-Fi”。一旦您连接上去，您的一切在线网络行为，将尽在攻击者的监控和掌握之中。
* HTTPS欺骗：攻击者通过欺骗您的浏览器，使您认为自己访问的是可信任站点。当您输入与该站点相关的登录凭据时，您的流量将被重定向到攻击者自建的非安全站点处。
* SSL劫持：通常，当您尝试连接或访问不安全的HTTP://站点时，您的浏览器会自己将您重定向到安全的HTTPS://处。此时，攻击者则可以劫持该重定向的过程，将指向其自建服务器的链接植入其中，进而窃取您的敏感数据、以及输入的所有信任凭据。
* DNS欺骗：为了准确地浏览到目标网站，域名系统会将地址栏中的URL，从人类易于识别的文本格式，转换为计算机易于识别的IP地址。然而，DNS欺骗则会迫使您的浏览器，在攻击者的控制下，发生转换异常，而去访问那些被伪造的地址。
* 电子邮件劫持：如果攻击者获得了受信任机构(例如银行)的邮箱、甚至是邮件服务器的访问权限，那么他们就能够拦截包含敏感信息的客户电子邮件，甚至以该机构的身份发送各种电子邮件。

