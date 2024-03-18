https://www.bilibili.com/video/BV1LE411e7HE?p=12

第12节看不来！！！

![截屏2021-02-07 下午10.53.50](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-07 下午10.53.50.png)

# 改写 observe 函数

缺陷:

- 无法处理数组
- 响应式无法在中间集成 Watcher 处理
- 我们实现的 rectify 需要和实例紧紧的绑定在一起, 分离 ( 解耦 )

## 问题

- observe  还没对单独的数组元素做处理吧? 


# 引入 Watcher

问题:

- 模型 ( 图 )
- <img src="/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-27 上午2.13.30.png" alt="截屏2021-02-27 上午2.13.30" style="zoom:80%;" />
- 关于 this 的问题

当前只有一个组件：对应有一个data。这一个data的更新对应就绑定一个watcher。

data发生变化的时候，要通知watcher改变，也就是页面的刷新。

而data在访问的时候，需要通知全局watcher来保存我们的watcher。

![截屏2021-02-27 上午2.15.04](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-27 上午2.15.04.png)

实现:

分成两步:

1. 只考虑修改后刷新 ( 响应式 )
2. 再考虑依赖收集 ( 优化 )



在 Vue 中提供一个构造函数 Watcher
Watcher 会有一些方法: 

- get() 用来进行**计算**或**执行**处理函数
- update() 公共的外部方法, 该方法会触发内部的 run 方法
- run() 运行, 用来判断内部是使用异步运行还是同步运行等, 这个方法最终会调用内部的 get 方法
- cleanupDep() 简单理解为清除队列

我们的页面渲染是上面哪一个方法执行的呢??? **get方法**

我们的 watcher 实例有一个属性 vm, 表示的就是 当前的 vue 实例

而watcher又有一个方法，叫get，很明显，在get里面就可以访问到vue实例。


# 引入 Dep 对象

该对象提供 依赖收集 ( depend ) 的功能, 和 派发更新 ( notify ) 的功能

在 notify 中去调用 watcher 的 update 方法

https://juejin.cn/post/6844903858850758670

## Dep 「依赖管理」

`Dep`究竟是用来做什么的呢？

我们通过`defineReactive`方法将`data`中的数据进行响应式后，虽然可以监听到数据的变化了，那我们怎么处理通知视图就更新呢？

`Dep`就是帮我们收集【究竟要通知到哪里的】。

比如下面的代码案例，我们发现，虽然`data`中有`text`和`message`属性，但是只有`message`被渲染到页面上，至于`text`无论怎么变化都影响不到视图的展示，因此我们仅仅对`message`进行收集即可，可以避免一些无用的工作。

那这个时候`message`的`Dep`就收集到了一个依赖，这个依赖就是用来管理`data`中`message`变化的。

```javascript
<div>
    <p>{{message}}</p>
</div>

data: {
    text: 'hello world',
    message: 'hello vue',
}
```

当使用`watch`属性时，也就是开发者自定义的监听某个data中属性的变化。比如监听`message`的变化，`message`变化时我们就要通知到`watch`这个钩子，让它去执行回调函数。

这个时候`message`的`Dep`就收集到了两个依赖，第二个依赖就是用来管理`watch`中`message`变化的.

```javascript
watch: {
    message: function (val, oldVal) {
        console.log('new: %s, old: %s', val, oldVal)
    },
}        
```

当开发者自定义`computed`计算属性时，如下`messageT`属性，是依赖`message`的变化的。因此`message`变化时我们也要通知到`computed`，让它去执行回调函数。 这个时候`message`的`Dep`就收集到了三个依赖，这个依赖就是用来管理`computed`中`message`变化的。

```javascript
computed: {
    messageT() {
        return this.message + '!';
    }
}
```

图示如下：一个属性可能有多个依赖，每个响应式数据都有一个`Dep`来管理它的依赖。

<img src="/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-27 下午4.04.59.png" alt="截屏2021-02-27 下午4.04.59" style="zoom:55%;" />

### 如何收集依赖

我们如何知道`data`中的某个属性被使用了。

答案就是`Object.defineProperty`，因为读取某个属性就会触发`get`方法。

```javascript
function defineReactive (obj, key, val) {
    let Dep; // 依赖

    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: () => {
            console.log('我被读了，我要不要做点什么好?');
            // 被读取了，将这个依赖收集起来
            Dep.depend(); // 本次新增
            return val;
        },
        set: newVal => {
            if (val === newVal) {
                return;
            }
            val = newVal;
            // 被改变了，通知依赖去更新
            Dep.notify(); // 本次新增
            console.log("数据被改变了，我要把新的值渲染到页面上去!");
        }
    })
}
```

### 什么是依赖

那所谓的依赖究竟是什么呢？上面的图中已经暴露了答案，就是`Watcher`。

<img src="/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-27 下午4.04.59.png" alt="截屏2021-02-27 下午4.04.59" style="zoom:55%;" />

## Watcher 「中介」

`Watcher`就是类似中介的角色，比如`message`就有三个中介，当`message`变化，就通知这三个中介，他们就去执行各自需要做的变化。

`Watcher`能够控制自己属于哪个，是`data`中的属性的还是`watch`，或者是`computed`，`Watcher`自己有统一的更新入口，只要你通知它，就会执行对应的更新方法。

因此我们可以推测出，`Watcher`必须要有的2个方法。一个就是通知变化，另一个就是被收集起来到Dep中去。

```javascript
class Watcher {
    addDep() {
        // 我这个Watcher要被塞到Dep里去了~~
    },
    update() {
        // Dep通知我更新呢~~
    }, 
}
```

## 总结

回顾一下，`Vue`响应式原理的核心就是`Observer`、`Dep`、`Watcher`。

`Observer`中进行响应式的绑定，在数据被读的时候，触发`get`方法，执行`Dep`来收集依赖，也就是收集`Watcher`。

在数据被改的时候，触发`set`方法，通过对应的所有依赖(`Watcher`)，去执行更新。比如`watch`和`computed`就执行开发者自定义的回调方法。





















