https://cn.vuejs.org/v2/guide/computed.html

# computed计算属性：

**计算属性是基于它们的响应式依赖进行缓存的**

==只在相关响应式依赖发生改变时==它们才会重新求值。这就意味着只要 `message` 还没有发生改变，多次访问 `reversedMessage` 计算属性会立即返回之前的计算结果，而不必再次执行函数。

我们为什么需要缓存？

假设我们有一个性能开销比较大的计算属性 **A**，它需要遍历一个巨大的数组并做大量的计算。然后我们可能有其他的计算属性依赖于 **A**。如果没有缓存，我们将不可避免的多次执行 **A** 的 getter！没懂！！！！！！！



# watch侦听属性

Vue 提供了一种更通用的方式来观察和响应 Vue 实例上的数据变动：**侦听属性**。当你有一些数据需要随着其它数据变动而变动时，你很容易滥用 `watch`——特别是如果你之前使用过 AngularJS。然而，通常更好的做法是使用计算属性而不是命令式的 `watch` 回调。细想一下这个例子：

```javascript
<div id="demo">{{ fullName }}</div>
var vm = new Vue({
  el: '#demo',
  data: {
    firstName: 'Foo',
    lastName: 'Bar',
    fullName: 'Foo Bar'
  },
  watch: {
    firstName: function (val) {
      this.fullName = val + ' ' + this.lastName
    },
    lastName: function (val) {
      this.fullName = this.firstName + ' ' + val
    }
  }
})

// 上面代码是命令式且重复的。将它与计算属性的版本进行比较：

var vm = new Vue({
  el: '#demo',
  data: {
    firstName: 'Foo',
    lastName: 'Bar'
  },
  computed: {
    fullName: function () {
      return this.firstName + ' ' + this.lastName
    }
  }
})
```



# 异同

（1）computed：计算属性不能在data中重复定义

​		  watch：侦听属性可以在data中定义

（2）computed：不可以在数据变化时执行异步操作

​		 watch：可以在数据变化时执行异步操作

（3）computed：

​	      watch： watch默认情况下无法监听对象的改变，如果需要进行监听则需要进行深度监听 深度监听需要配置handler函数以及deep为true。(因为它只会监听对象的地址是否发生了改变，而值是不会监听的)

























































