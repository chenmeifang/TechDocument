https://segmentfault.com/a/1190000019208626

## 方法一、`props`/`$emit`

### 1.父组件向子组件传值

### 2.子组件向父组件传值

## 方法二、`$emit`/`$on`

https://cn.vuejs.org/v2/api/#%E5%AE%9E%E4%BE%8B%E6%96%B9%E6%B3%95-%E4%BA%8B%E4%BB%B6

### [vm.$on( event, callback )](https://cn.vuejs.org/v2/api/#vm-on)

- **参数**：

  - `{string | Array<string>} event` (数组只在 2.2.0+ 中支持)
  - `{Function} callback`

- **用法**：

  监听当前实例上的自定义事件。事件可以由 `vm.$emit` 触发。回调函数会接收所有传入事件触发函数的额外参数。

- **示例**：

  ```js
  vm.$on('test', function (msg) {
    console.log(msg)
  })
  vm.$emit('test', 'hi')
  // => "hi"
  ```

### [vm.$once( event, callback )](https://cn.vuejs.org/v2/api/#vm-once)

- **参数**：

  - `{string} event`
  - `{Function} callback`

- **用法**：

  监听一个自定义事件，但是只触发一次。一旦触发之后，监听器就会被移除。

### [vm.$off( [event, callback\] )](https://cn.vuejs.org/v2/api/#vm-off)

- **参数**：

  - `{string | Array<string>} event` (只在 2.2.2+ 支持数组)
  - `{Function} [callback]`

- **用法**：

  移除自定义事件监听器。

  - 如果没有提供参数，则移除所有的事件监听器；
  - 如果只提供了事件，则移除该事件所有的监听器；
  - 如果同时提供了事件与回调，则只移除这个回调的监听器。

### [vm.$emit( eventName, […args\] )](https://cn.vuejs.org/v2/api/#vm-emit)

- **参数**：

  - `{string} eventName`
  - `[...args]`

  触发当前实例上的事件。附加参数都会传给监听器回调。

- **示例：**

  只配合一个事件名使用 `$emit`：

  ```js
  Vue.component('welcome-button', {
    template: `
      <button v-on:click="$emit('welcome')">
        Click me to be welcomed
      </button>
    `
  })
  //
  <div id="emit-example-simple">
    <welcome-button v-on:welcome="sayHi"></welcome-button>
  </div>
  //
  new Vue({
    el: '#emit-example-simple',
    methods: {
      sayHi: function () {
        alert('Hi!')
      }
    }
  })
  ```

**$emit/$on这种方法通过一个空的Vue实例作为中央事件总线（事件中心），用它来触发事件和监听事件,巧妙而轻量地实现了任何组件间的通信，包括父子、兄弟、跨级**。

https://www.jianshu.com/p/a544728bf596

on和emit事件必须是在一个公共的实例上才能触发。

子组件说：父组件你听好了，我用$eimt把数据传给你啊，你记得看看有没有拿到啊。

父组件说：好的，不怕，我有$on这个东东，我可以随时监听到你传了啥，你传给我什么，我就变成什么呗，没办法，你传给我的，我是要跟随你的。

旁白：但是你们两必须得在一个世界啊，别一个在二次元，一个在三次元，那样没法传啊。这样吧，你们都必须保证在同一个地方吧。

子组件：好，那我这边有一个bus，父组件那也有一个bus，那我们两都到那吧。

旁白：一定要记住你们可以使用一个空的 Vue 实例作为中央事件总线。毕竟性别不同怎么谈恋爱啊。

## 方法三、vuex



























