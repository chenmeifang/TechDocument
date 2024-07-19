# 1 路由权限项目

https://www.bilibili.com/video/BV11A411J7z5

165min

后端安装处理跨域的依赖：

```javascript
npm i koa2-cors -S // 在生产环境下是需要的 
```

# 2 vue路由hash模式实现原理

https://www.bilibili.com/video/BV13i4y1L7Qn?from=search&seid=15608454528293022094

==url中带#说明使用的是hash模式==

* 首页：http://localhost:8080/#/

* 用户页面：http://localhost:8080/#/user

==hash模式不会触发浏览器刷新我们的页面==，这样子用户就可以在不刷新页面前提下看到新的页面，有更好的用户体验

**为什么hash模式不会触发浏览器刷新页面？**

* https://www.zhihu.com/question/343414547
* hash模式就是加#，可以理解成页面里的锚。切换页面只是进行锚的修改，切换显示的div而已。通过onhashchange来监听hash的改变，没有发生页面跳转行为。

> window.onhashchange  !!!!

简易实现：

https://blog.csdn.net/weixin_46124214/article/details/106118142

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <ul id="menu">
        <li>
            <a href="#index">首页</a>
        </li>
        <li>
            <a href="#news">资讯</a>
        </li>
        <li>
            <a href="#user">个人中心</a>
        </li>
    </ul>
    <div id="app"></div>
</body>
<script>
    window.onhashchange = function (e) {
        let app = document.getElementById('app')
        console.log('location.hash:',location.hash)
        switch (location.hash) {
            case '#index':
                app.innerHTML = '<h1>这是首页内容</h1>'
                break
            case '#news':
                app.innerHTML = '<h1>这是新闻内容</h1>'
                break
            case '#user':
                app.innerHTML = '<h1>这是个人中心内容</h1>'
                break
            default:
                app.innerHTML = '<h1>404</h1>'
        }
    }
</script>
</html>
```

# 3 vue路由history模式实现原理

https://www.bilibili.com/video/BV1ba4y1s7Ra/?spm_id_from=333.788.videocard.0

history模式基于`window.history`对象(包含浏览器的历史)的方法

在**HTML4**中，已经支持`window.history`对象来==控制页面历史记录跳转==，常用的方法包括：

- `history.forward()`：在历史记录中前进一步

- `history.back()`：在历史记录中后退一步

- `history.go(n)`：在历史记录中跳转n步骤，**n=0为刷新本页**,n=-1为后退一页。

在**HTML5**中，`window.history`对象得到了扩展，新增的API包括：

- `history.pushState(data[,title][,url])`：向历史记录中追加一条记录
- `history.replaceState(data[,title][,url])`：替换当前页在历史记录中的信息。（==pushState与replaceState两个神器的作用就是可以将url替换并且不刷新页面，好比挂羊头卖狗肉，http并没有去请求服务器该路径下的资源，一旦刷新就会暴露这个实际不存在的“羊头”，显示404。==）
- `history.state`：是一个属性，可以得到当前页的state信息。
- `window.onpopstate`：是一个事件，在点击浏览器后退按钮或js调用`forward()`、`back()`、`go()`时触发。监听函数中可传入一个event对象，`event.state`即为通过`pushState()`或`replaceState()`方法传入的data参数

history模式原理可以这样理解，首先我们要改造我们的超链接，给每个超链接增加onclick方法，阻止默认的超链接跳转，改用`history.pushState`或`history.replaceState`来更改浏览器中的url，并修改页面内容。由于通过history的api调整，并不会向后端发起请求，所以也就达到了前端路由的目的。？？？？

关键：21行和25行

pushState方法接收三个参数：

​	1.stateObj：跟这个页面相关的状态。当页面的url再变回这个url时，可以通过`event.state`取到这个`state`对象。其实滚动条的位置，阅读进度，组件的开关的这些页面状态都可以存储到state的里面。

​	2.title

​	3.url

---

https://router.vuejs.org/guide/essentials/history-mode.html

hash模式和history模式的区别：

（1）The default mode for `vue-router` is *hash mode* - it uses the URL hash to simulate a full URL so that  **  the page won't be reloaded when the URL changes. **

hash模式下url变化的时候页面不会被加载，**页面不会被加载是指浏览器不会请求服务器**

尽管浏览器没有请求服务器，但是页面状态和url一一关联起来

（2）hash模式背后的原理是`onhashchange`事件,可以在window对象上监听这个事件:

https://www.jianshu.com/p/bfffb4b8c9fa

随着history api的到来，前端路由开始进化了,前面的hashchange，你只能改变#后面的url片段，而history api则给了前端完全的自由

history模式的问题：

通过history api，我们丢掉了丑陋的#，但是它也有个问题：不怕前进，不怕后退，就怕**刷新**，**f5**，（如果后端没有准备的话）,**因为刷新是实实在在地去请求服务器的**,不玩虚的。 

在hash模式下，前端路由修改的是#中的信息，而浏览器请求时是不带它玩的，所以没有问题.（即hash值变化浏览器不会重新发起请求，只是会触发`window.hashChange`事件）。假如我们在hashChange事件中获取当前的hash值，并根据hash值来修改页面内容，则达到了前端路由的目的。

但是在history下，你可以自由的修改path，当刷新时，如果服务器中没有相应的响应或者资源，会分分钟刷出一个404来。(即history 模式需要后端配合将所有访问都指向 index.html，否则用户刷新页面，会导致 404 错误）

https://blog.csdn.net/huang100qi/article/details/80237555?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-12.control&dist_request_id=d530359e-278f-4540-b2ed-b5c280c3563b&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-12.control

两个相同的项目（除route的mode一个是hash，一个是history以外）：

运行之后，浏览器的地址栏的显示信息不一样：

mode——history：

- http://localhost:8082/ 

mode——hash：

- http://localhost:8081/#/



----

https://blog.csdn.net/fifteen718/article/details/82529433



































