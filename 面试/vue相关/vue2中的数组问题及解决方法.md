https://cn.vuejs.org/v2/guide/reactivity.html#%E5%AF%B9%E4%BA%8E%E6%95%B0%E7%BB%84

要深入响应式原理

<img src="/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-02-27 下午4.04.59.png" alt="截屏2021-02-27 下午4.04.59" style="zoom:55%;" />

由于 JavaScript 的限制，Vue **不能检测**数组和对象的变化。尽管如此我们还是有一些办法来回避这些限制并保证它们的响应性。

Vue 不能检测以下数组的变动：

1. **当你利用索引直接设置一个数组项时**，例如：`vm.items[indexOfItem] = newValue`
2. **当你修改数组的长度时**，例如：`vm.items.length = newLength`

```javascript
var vm = new Vue({
  data: {
    items: ['a', 'b', 'c']
  }
})
vm.items[1] = 'x' // 不是响应性的
vm.items.length = 2 // 不是响应性的
```

为了解决第一类问题，以下两种方式都可以实现和 `vm.items[indexOfItem] = newValue` 相同的效果，同时也将在响应式系统内触发状态更新：

```javascript
// Vue.set
// Vue.set(object, key, value)
Vue.set(vm.items, indexOfItem, newValue)
// 也可以使用 vm.$set 实例方法，该方法是全局方法 Vue.set 的一个别名：
vm.$set(vm.items, indexOfItem, newValue)


// Array.prototype.splice。因为splice是经过vue改写的，能够监听到数据的变化
vm.items.splice(indexOfItem, 1, newValue)
```

为了解决第二类问题(当你修改数组的长度时,vue检测不到变化)，你可以使用 `splice`：

```javascript
vm.items.splice(newLength); 
```



splice的用法：

splice() 方法向/从数组中添加/删除项目，然后返回被删除的项目。

**注释：**该方法会改变原始数组。

```
arrayObject.splice(index,howmany,item1,.....,itemX)
```

index：必需。整数，规定添加/删除项目的位置，使用负数可从数组结尾处规定位置

howmany：必需。要删除的项目数量。如果设置为 0，则不会删除项目。

item1, ..., itemX：可选。向数组添加的新项目。

### 返回值：包含被删除项目的新数组，如果有的话。

















