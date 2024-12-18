https://www.bilibili.com/video/BV13A411v7co/?spm_id_from=333.337.search-card.all.click&vd_source=a7089a0e007e4167b4a61ef53acc6f7e（这个视频有点啰嗦）

# 1. 什么情况下使用vuex/redux

#  2. react-redux Provider

| <img src="03Redux.assets/image-20240711153239161.png" alt="image-20240711153239161" style="zoom:50%;" /> | <img src="03Redux.assets/image-20240711153441039.png" alt="image-20240711153441039" style="zoom:50%;" /> |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| ![image-20240711153631056](03Redux.assets/image-20240711153631056.png) | ![image-20240711153656516](03Redux.assets/image-20240711153656516.png) |

# 3. reducer是什么

<img src="02React核心与项目实战.assets/3.png" alt="1" style="zoom: 40%;" />

为了职责清晰，Redux代码被分为三个核心的概念，学redux，其实就是学这三个核心概念之间的配合：

1. **state**:  一个对象 存放着我们管理的数据
2. **action**:  一个对象 用来描述你想怎么改数据
3. **reducer**:  一个函数 根据action的描述更新state

# 4. reducer为什么叫做reducer

Redux 中的 reducer 命名为 reducer 是因为它源于函数式编程中的 `reduce` 函数。`reduce` 函数是一种高阶函数，用于累积或归纳集合中的值，最终生成一个结果。Redux 中的 reducer 具有类似的功能，它接收当前的状态和一个 action，返回一个新的状态。这个过程就像 `reduce` 函数累积值一样，reducer 累积状态变化。

具体来说，Redux 中的 reducer 函数签名通常如下：

```javascript
function reducer(state, action) {
    // 根据 action 类型和 payload 处理 state 并返回新的 state
}
```

这个函数接收两个参数：
1. `state`：当前的应用状态。
2. `action`：一个描述状态变化的对象，通常包含一个 `type` 字段和一个 `payload` 字段。

reducer 函数通过检查 action 的类型，决定如何更新状态并返回新的状态。这个过程类似于 `Array.prototype.reduce` 中的回调函数，它接收累积器和当前值，并返回新的累积结果。

例如，在 JavaScript 中的 `reduce` 函数可以这样使用：

```javascript
const numbers = [1, 2, 3, 4];
const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
console.log(sum); // 输出 10
```

在这个例子中，`reduce` 函数通过一个回调函数累积数组中的值，并最终返回总和。Redux 中的 reducer 也是通过一个函数累积状态变化，并最终返回新的状态。这种命名方式使得开发者能够直观地理解 reducer 的作用和工作原理。

1h17min处

# [1. 数据传递的概念和核心思想](https://www.bilibili.com/video/BV1La4y1S7qY?p=1&vd_source=a7089a0e007e4167b4a61ef53acc6f7e)

<img src="03Redux.assets/image-20240819111903265.png" alt="image-20240819111903265" style="zoom:80%;" />

# [2. 用普通思想和方法完成案例](https://www.bilibili.com/video/BV1La4y1S7qY?p=2&vd_source=a7089a0e007e4167b4a61ef53acc6f7e)

| <img src="03Redux.assets/image-20240819114345200.png" alt="image-20240819114345200"  /> | <img src="03Redux.assets/image-20240711172006940.png" alt="image-20240711172006940" style="zoom:80%;" /> |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| <img src="03Redux.assets/image-20240711172046808.png" alt="image-20240711172046808"  /> | <img src="03Redux.assets/image-20240819115035526.png" alt="image-20240819115035526" style="zoom: 67%;" /> |

问题分析：

- handleBtnClick 完成了两个任务：修改 && render。而这两个任务实际上是没有相关性的
- 希望handleBtnClick仅仅是修改数据，修改数据后去触发一次render

<img src="03Redux.assets/image-20240711173345704.png" alt="image-20240711173345704" style="zoom: 50%;" />

# [3. 用redux的思想和方案完成案例](https://www.bilibili.com/video/BV1La4y1S7qY/?p=3&spm_id_from=pageDriver&vd_source=a7089a0e007e4167b4a61ef53acc6f7e)

1. 需要一个store，存放state

| <img src="03Redux.assets/image-20240711113020705.png" alt="image-20240711113020705" style="zoom: 67%;" /> | <img src="03Redux.assets/image-20240711113427461.png" alt="image-20240711113427461" style="zoom: 67%;" /> |
| ------------------------------------------------------------ | ------------------------------------------------------------ |

<img src="03Redux.assets/image-20240711113632626.png" alt="image-20240711113632626" style="zoom: 80%;" />

# Redux

Redux 是一个用于管理 JavaScript 应用状态的库，主要与 React 配合使用，但也可以与其他库或框架结合。Redux 的设计旨在简化复杂应用中的状态管理，提供可预测的状态管理和调试能力。下面是对 Redux 的详细分析：

### 核心概念

1. **Store（存储）**
   - **定义**: Redux 应用只有一个 store，它是一个 JavaScript 对象，用于存储整个应用的状态。
   - **功能**: 提供一个集中式的状态管理点，保证应用中的状态可以被所有组件访问。
2. **Action（动作）**
   - **定义**: 描述发生了什么的普通 JavaScript 对象。它们是改变应用状态的唯一来源。
   - **结构**: 一个 action 至少要有一个 `type` 字段，用来表示发生了什么事件，通常还会包含其他数据（payload）。
3. **Reducer（简化器）**
   - **定义**: 一个纯函数，接收当前的状态和一个 action，返回一个新的状态。
   - **功能**: Reducer 用于处理 state 的更新逻辑。它将旧的状态和 action 合并，产生新的状态。
4. **Dispatch（分发）**
   - **定义**: 用于发送 action 的方法。
   - **功能**: 通过调用 `store.dispatch(action)`，可以触发 reducer 执行，更新状态。
5. **Selector（选择器）**
   - **定义**: 从 store 中提取和计算数据的函数。
   - **功能**: 提供了一种从状态中提取数据的标准化方式。

<img src="02React核心与项目实战.assets/3.png" alt="1" style="zoom: 33%;" />

### 工作流程

1. **创建 Store**: 使用 `createStore(reducer)` 创建一个 store，传入一个 reducer 函数。
   
2. **Dispatch Action**: 使用 `store.dispatch(action)` 发送 action，通知 store 有状态需要更新。

3. **Reducer 处理 Action**: store 内部调用 reducer，根据 action 的类型决定如何更新状态。

4. **更新 State**: Reducer 返回新的状态，store 更新其内部状态。

5. **通知组件**: 如果使用 React-Redux，组件会通过 `connect` 函数自动接收到新的状态和更新。

### 使用示例

```javascript
import { createStore } from 'redux';

// 定义初始状态
const initialState = {
  count: 0
};

// 定义 reducer
function counterReducer(state = initialState, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    default:
      return state;
  }
}

// 创建 store
const store = createStore(counterReducer);

// 订阅 store 变化
store.subscribe(() => console.log(store.getState()));

// 分发 actions
store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'DECREMENT' });
```

### 中间件

Redux 中间件是一种扩展 Redux 功能的方式。它可以在 action 被 dispatch 后，reducer 处理前执行。常用中间件包括：

- **Redux Thunk**: 允许 action 创建函数返回一个函数，而不是一个 action 对象。这对于处理异步操作非常有用。
- **Redux Saga**: 用于处理副作用的中间件，通过生成器函数控制异步流程。

### 优缺点

**优点:**

- **可预测性**: 单一的 store 和纯函数 reducer 确保状态更新的可预测性。
- **调试能力**: Redux DevTools 提供强大的调试功能。
- **中间件支持**: 可以轻松集成异步操作和其他功能。

**缺点:**

- **样板代码**: 需要编写较多的样板代码，如 actions、reducers 和 types。
- **学习曲线**: 对新手来说，理解 Redux 的概念和最佳实践可能需要时间。

Redux 适用于需要复杂状态管理和调试的应用，但对于简单应用来说，可能会觉得过于复杂。

# Redux基础视频学习

## [97 redux简介](https://www.bilibili.com/video/BV1wy4y1D7JT?p=97&vd_source=a7089a0e007e4167b4a61ef53acc6f7e)

<img src="03Redux.assets/image-20240311200214782.png" alt="image-20240311200214782" style="zoom:67%;" />

## [98 redux工作流程](https://www.bilibili.com/video/BV1wy4y1D7JT?p=98&spm_id_from=pageDriver&vd_source=a7089a0e007e4167b4a61ef53acc6f7e)

| ![image-20240815115817980](03Redux.assets/image-20240815115817980.png) | <img src="03Redux.assets/image-20240311202152313.png" alt="image-20240311202152313"  /> |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| <img src="03Redux.assets/image-20240311200325757.png" alt="image-20240311200325757"  /> | <img src="03Redux.assets/3.png" alt="1" style="zoom: 40%;" /> |
| 疑问1：action指向的到底是Store还是Reducer？是谁在接收处理操作action？？ | 疑问2：状态的初始化是谁处理的？——Reducer                     |
|                                                              |                                                              |
| 疑问3：dispatch是谁身上的方法？                              |                                                              |

## [99 求和案例 纯react版](https://www.bilibili.com/video/BV1wy4y1D7JT?p=99&spm_id_from=pageDriver&vd_source=a7089a0e007e4167b4a61ef53acc6f7e)

| ![image-20240815120652858](03Redux.assets/image-20240815120652858.png) | <img src="03Redux.assets/image-20240311215718557.png" alt="image-20240311215718557"  /> |
| ------------------------------------------------------------ | ------------------------------------------------------------ |

## [100 求和案例 redux精简版](https://www.bilibili.com/video/BV1wy4y1D7JT?p=100&spm_id_from=pageDriver&vd_source=a7089a0e007e4167b4a61ef53acc6f7e)

安装redux

| 目录结构                                                     | ![image-20240815123700583](03Redux.assets/image-20240815123700583.png) |
| ------------------------------------------------------------ | :----------------------------------------------------------: |
| ![image-20240815132429242](03Redux.assets/image-20240815132429242.png) | <img src="03Redux.assets/image-20240815133738288.png" alt="image-20240815133738288" style="zoom:80%;" /><br>第六行加上export default |
| **初始化时 store会帮我们调用一次reducer**。其preState和action值见右图。后几个字符是随机字符 | ![image-20240815140220506](03Redux.assets/image-20240815140220506.png) |
| <img src="03Redux.assets/image-20240815134513565.png" alt="image-20240815134513565" style="zoom:80%;" /> | ![image-20240815141352580](03Redux.assets/image-20240815141352580.png) |
|                                                              | subscribe执行时机优化：<br>![image-20240815141655635](03Redux.assets/image-20240815141655635.png) |

## [101 求和案例 redux完整版](https://www.bilibili.com/video/BV1wy4y1D7JT?p=101&spm_id_from=pageDriver&vd_source=a7089a0e007e4167b4a61ef53acc6f7e)

| <img src="03Redux.assets/image-20240311221256582.png" alt="image-20240311221256582" style="zoom: 67%;" /> | <img src="03Redux.assets/image-20240815143613194.png" alt="image-20240815143613194" style="zoom: 67%;" /> |
| ------------------------------------------------------------ | ------------------------------------------------------------ |

<img src="03Redux.assets/image-20240311221943457.png" alt="image-20240311221943457" style="zoom: 67%;" />

## [102 求和案例 异步action版](https://www.bilibili.com/video/BV1wy4y1D7JT?p=102&spm_id_from=pageDriver&vd_source=a7089a0e007e4167b4a61ef53acc6f7e)

| action除了是对象，还可以是函数<br>一般对象action是同步action<br>函数类型action是异步action | <img src="03Redux.assets/image-20240815144211954.png" alt="image-20240815144211954" style="zoom:50%;" /> |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| ![image-20240815144754724](03Redux.assets/image-20240815144754724.png) | ![image-20240815145011728](03Redux.assets/image-20240815145011728.png) |
| <img src="03Redux.assets/image-20240815150133816.png" alt="image-20240815150133816" style="zoom:90%;" /><br>有问题，会报右图的错 | ![image-20240815150547316](03Redux.assets/image-20240815150547316.png) |
| ![image-20240815152625427](03Redux.assets/image-20240815152625427.png) | ![image-20240815152300241](03Redux.assets/image-20240815152300241.png) |



**store如果收到了函数类型的action，不要把action给reducer，直接自己执行就行**

异步action中一般都回调用同步action



<img src="03Redux.assets/image-20240311225059849.png" alt="image-20240311225059849" style="zoom:80%;" />

## [103 对react-redux的理解](https://www.bilibili.com/video/BV1wy4y1D7JT/?p=103&spm_id_from=pageDriver&vd_source=a7089a0e007e4167b4a61ef53acc6f7e)

> redux和react-redux是两个东西

<img src="03Redux.assets/image-20240311225626258.png" alt="image-20240311225626258" style="zoom: 67%;" />

## [104 连接容器组件与UI组件](https://www.bilibili.com/video/BV1wy4y1D7JT/?p=104&spm_id_from=pageDriver&vd_source=a7089a0e007e4167b4a61ef53acc6f7e)

| ![image-20240815160949208](03Redux.assets/image-20240815160949208.png)<br>第四行要删掉，否则报错 | ![image-20240815163540632](03Redux.assets/image-20240815163540632.png) |
| ------------------------------------------------------------ | ------------------------------------------------------------ |

## [105 react-redux基本使用](https://www.bilibili.com/video/BV1wy4y1D7JT/?p=105&spm_id_from=pageDriver&vd_source=a7089a0e007e4167b4a61ef53acc6f7e)

<img src="03Redux.assets/image-20240815174033212.png" alt="image-20240815174033212" style="zoom: 67%;" />



<img src="03Redux.assets/image-20240815174711510.png" alt="image-20240815174711510" style="zoom: 67%;" />



<img src="03Redux.assets/image-20240815175640751.png" alt="image-20240815175640751" style="zoom:67%;" />

  

<img src="03Redux.assets/image-20240815180229894.png" alt="image-20240815180229894" style="zoom:67%;" />



![image-20240815180526121](03Redux.assets/image-20240815180526121.png)



![image-20240815180638813](03Redux.assets/image-20240815180638813.png)



<img src="03Redux.assets/image-20240815182027329.png" alt="image-20240815182027329" style="zoom:67%;" />

## [106 优化1——简写mapDispatch](https://www.bilibili.com/video/BV1wy4y1D7JT/?p=106&spm_id_from=pageDriver&vd_source=a7089a0e007e4167b4a61ef53acc6f7e)

<img src="03Redux.assets/image-20240816144528378.png" alt="image-20240816144528378" style="zoom:67%;" />



<img src="03Redux.assets/image-20240816143418446.png" alt="image-20240816143418446" style="zoom:80%;" />



<img src="03Redux.assets/image-20240816144038511.png" alt="image-20240816144038511" style="zoom: 67%;" />

> 不需要写dispatch了，react-redux会帮忙去做自动分发（即dispatch）

## [107 优化2——Provider组件的使用](https://www.bilibili.com/video/BV1wy4y1D7JT/?p=107&spm_id_from=pageDriver&vd_source=a7089a0e007e4167b4a61ef53acc6f7e)

|                            优化前                            |                            优化后                            |
| :----------------------------------------------------------: | :----------------------------------------------------------: |
| <img src="03Redux.assets/image-20240816192058798.png" alt="image-20240816192058798" style="zoom: 67%;" /> | <img src="03Redux.assets/image-20240816192654786.png" alt="image-20240816192654786" style="zoom: 67%;" /> |

## [108 整合UI组件与容器组件](https://www.bilibili.com/video/BV1wy4y1D7JT/?p=108&spm_id_from=pageDriver&vd_source=a7089a0e007e4167b4a61ef53acc6f7e)

<img src="03Redux.assets/image-20240311225626258.png" alt="image-20240311225626258" style="zoom: 67%;" />

| <img src="03Redux.assets/image-20240816193923183.png" alt="image-20240816193923183" style="zoom:67%;" /> | ![image-20240816194158004](03Redux.assets/image-20240816194158004.png) |
| ------------------------------------------------------------ | ------------------------------------------------------------ |

## [109 数据共享——编写Person组件](https://www.bilibili.com/video/BV1wy4y1D7JT?p=109&vd_source=a7089a0e007e4167b4a61ef53acc6f7e)

## [110 数据共享——编写Person的Reducer](https://www.bilibili.com/video/BV1wy4y1D7JT?p=110&spm_id_from=pageDriver&vd_source=a7089a0e007e4167b4a61ef53acc6f7e)

## [111 数据共享——完成数据共享](https://www.bilibili.com/video/BV1wy4y1D7JT?p=111&spm_id_from=pageDriver&vd_source=a7089a0e007e4167b4a61ef53acc6f7e)

| ![image-20240818231106753](03Redux.assets/image-20240818231106753.png) | ![image-20240818232743999](03Redux.assets/image-20240818232743999.png) |
| ------------------------------------------------------------ | ------------------------------------------------------------ |

![image-20240819094538785](03Redux.assets/image-20240819094538785.png)

## [112 纯函数](https://www.bilibili.com/video/BV1wy4y1D7JT?p=112&spm_id_from=pageDriver&vd_source=a7089a0e007e4167b4a61ef53acc6f7e)

<img src="03Redux.assets/image-20240819100139446.png" alt="image-20240819100139446" style="zoom: 80%;" />

## 113 redux开发者工具

<img src="03Redux.assets/image-20240819104124563.png" alt="image-20240819104124563" style="zoom:67%;" />

# 其他状态管理库

常见的状态管理库，除了Redux还有什么

除了 **Redux** 之外，还有许多常见的状态管理库，根据项目需求和技术栈的不同，可以选择适合的工具。以下是一些常见的状态管理库及其特点：

------

### **1. MobX**

- 特点：
  - 响应式状态管理：使用可观察（observable）对象，状态变化时自动触发视图更新。
  - 简单易用：不需要像 Redux 那样设计大量的 boilerplate（模板代码）。
  - 灵活：适合小型项目，也能扩展到大型应用。
- 适用场景：
  - 需要简单直接的状态管理。
  - 注重性能优化和灵活性的小型到中型项目。
- **官网**：[https://mobx.js.org](https://mobx.js.org/)

------

### **2. Zustand**

- 特点：
  - 轻量化：只有几 KB，无需繁琐的配置。
  - React-friendly：基于 Hooks API，简洁直观。
  - 支持中间件和持久化扩展。
- 适用场景：
  - 小型或中型 React 项目。
  - 需要快速上手、代码量少的项目。
- **官网**：https://github.com/pmndrs/zustand

------

### **3. Recoil**

- 特点：
  - 官方推荐：由 Facebook 开发，专为 React 应用设计。
  - Fine-grained Updates（精细更新）：支持独立状态更新，无需刷新整个组件树。
  - 支持状态派生：可以通过 `selectors` 轻松创建派生状态。
- 适用场景：
  - 使用 React 且需要强大状态管理的项目。
  - 注重状态派生和依赖关系的应用。
- **官网**：[https://recoiljs.org](https://recoiljs.org/)

------

### **4. Vuex (适用于 Vue 项目)**

- 特点：
  - Vue 官方推荐状态管理工具。
  - 集成度高：与 Vue 生态（如 Vue Devtools）无缝结合。
  - 单向数据流：与 Redux 的设计理念类似。
- 适用场景：
  - Vue.js 项目（Vue 2 和 Vue 3）。
  - 需要集中式状态管理的大型应用。
- **官网**：[https://vuex.vuejs.org](https://vuex.vuejs.org/)

------

### **5. Pinia (适用于 Vue 项目)**

- 特点：
  - Vue 3 官方推荐状态管理工具（代替 Vuex）。
  - 易于集成：使用 Composition API，语法简单直观。
  - 支持模块化和持久化。
- 适用场景：
  - Vue 3 项目，尤其是追求简单状态管理的开发者。
- **官网**：[https://pinia.vuejs.org](https://pinia.vuejs.org/)

------

### **6. Jotai**

- 特点：
  - 基于原子（atoms）的状态管理，轻量且灵活。
  - React-friendly：支持 React Hooks，API 设计直观。
  - 小型化：比 Redux 或 MobX 更加轻量，且配置简单。
- 适用场景：
  - 小型到中型的 React 项目。
  - 偏向灵活、原子化状态管理。
- **官网**：[https://jotai.org](https://jotai.org/)

------

### **7. XState**

- 特点：
  - 状态机和状态图管理工具。
  - 具有事件驱动的状态管理：适合管理复杂的状态逻辑。
  - 可视化工具：支持状态图生成。
- 适用场景：
  - 复杂状态逻辑的项目（如多步骤表单、流程管理）。
  - 注重状态可视化和健壮性的应用。
- **官网**：[https://xstate.js.org](https://xstate.js.org/)

------

### **8. Context API (React 自带)**

- 特点：
  - React 原生解决方案：不需要额外安装。
  - 简单直观：适合小型应用或局部状态共享。
  - 性能瓶颈：频繁更新可能影响性能（可配合 Memoization 优化）。
- 适用场景：
  - 局部状态共享的小型项目。
  - 不想引入第三方状态管理工具。
- **官网**：[React 官方文档](https://react.dev/)

------

### **9. Effector**

- 特点：
  - 函数式状态管理：声明式和简洁的 API。
  - 高性能：优化了更新流程。
  - 支持 TypeScript。
- 适用场景：
  - 追求性能和函数式开发的项目。
- **官网**：[https://effector.dev](https://effector.dev/)

------

### **10. Akita**

- 特点：
  - 面向实体状态管理，类似于 Redux，但更易用。
  - 支持 Angular 和其他框架。
  - 强调模块化和可扩展性。
- 适用场景：
  - Angular 项目。
  - 需要模块化状态管理的应用。
- **官网**：https://datorama.github.io/akita/

------

### **选择状态管理工具时的建议**

- **小型项目**：优先选择轻量化工具，如 Context API、Zustand、Jotai。
- **中型项目**：MobX、Recoil、Pinia 是较优的选择。
- **大型项目**：Redux、Vuex、XState 提供更强大的工具链支持。
- **特定框架**：Vue 项目用 Vuex 或 Pinia；Angular 项目用 Akita；React 项目可以选 Redux、Recoil、MobX 或 Zustand。

# [MobX](https://www.bilibili.com/video/BV1rB4y1j7fL/?spm_id_from=333.337.search-card.all.click&vd_source=a7089a0e007e4167b4a61ef53acc6f7e)

## 怎么使用MobX

使用 **MobX** 进行状态管理非常简单，它通过响应式编程实现自动更新。以下是一个简单的示例，展示了如何在 React 中使用 MobX 进行状态管理。

### **步骤：**

1. **安装 MobX 相关依赖** 首先，需要安装 MobX 和 MobX 的 React 绑定库：

   ```bash
   npm install mobx mobx-react
   ```

2. **创建 MobX Store** 使用 `makeObservable` 或 `observable` 来声明响应式的状态，使用 `action` 来修改状态，使用 `computed` 来定义派生状态。

3. **在 React 组件中使用 MobX** 使用 `observer` 高阶组件来让组件在状态变化时重新渲染。

------

### **示例代码：**

#### 1. 创建 Store

```javascript
// store.js
import { makeAutoObservable } from "mobx";
class CounterStore {
  count = 0;
  constructor() {
    makeAutoObservable(this); // 使该类的属性和方法变为响应式
  }
  increment() {
    this.count++;
  }
  decrement() {
    this.count--;
  }
}
const counterStore = new CounterStore();
export default counterStore;
```

#### 2. 使用 MobX Store 在 React 组件中

```javascript
// App.js
import React from 'react';
import { observer } from 'mobx-react';
import counterStore from './store';
const App = observer(() => {
  return (
    <div>
      <h1>Count: {counterStore.count}</h1>
      <button onClick={() => counterStore.increment()}>Increment</button>
      <button onClick={() => counterStore.decrement()}>Decrement</button>
    </div>
  );
});
export default App;
```

------

### **解释：**

- **`makeAutoObservable(this)`**：
  - 在 `CounterStore` 中，`count` 被定义为响应式的变量，`increment` 和 `decrement` 方法被定义为 `action`，可以修改状态。
  - `makeAutoObservable(this)` 会自动为 `CounterStore` 类中的属性和方法创建 `observable` 和 `action`，从而使得该类的实例变得响应式。
- **`observer`**：
  - `observer` 是 MobX 提供的高阶组件，用来包装 React 组件。
  - 它确保每当 MobX 中的可观察状态发生变化时，React 组件会自动重新渲染。
- **`counterStore.count`**：
  - 在 React 组件中，通过 `counterStore.count` 获取响应式数据，并在 UI 中显示。
  - 每次点击 "Increment" 或 "Decrement" 按钮时，`count` 状态会更新，React 会自动重新渲染组件。

------

### **总结：**

- MobX 的核心思想是通过响应式编程来自动管理和更新状态。
- 使用 `observable` 来声明状态，使用 `action` 来修改状态，使用 `computed` 来定义派生状态。
- 在 React 中，使用 `observer` 包装组件，使其自动响应状态变化并重新渲染。

## MobX的原理

**MobX** 是一个用于状态管理的库，**基于响应式编程思想**，它通过透明的依赖追踪和自动化的视图更新来管理应用状态。MobX 的核心原理可以分为以下几个方面：

### **1. 响应式编程**

响应式编程是 MobX 的核心思想，**它通过观察对象的变化来自动更新依赖它的地方**。当某个状态改变时，MobX 会自动重新计算依赖它的内容，并触发视图的更新，而无需手动调用更新方法。

### **2. 核心概念**

MobX 主要通过以下几个核心概念来实现响应式状态管理：

- **Observable（可观察的）**：
  - `observable` 是 MobX 中用于表示状态的概念。任何被标记为 `observable` 的对象或者值，MobX 都会自动追踪其依赖关系。当这些值发生变化时，所有依赖它的地方都会自动更新。
  - 在 MobX 中，可以使用 `makeObservable` 或 `makeAutoObservable` 将类、对象、数组等标记为响应式。
- **Action（动作）**：
  - `action` 用于修改 `observable` 的状态。它是 MobX 中的“副作用”操作，用来改变数据。当你改变 `observable` 中的数据时，MobX 会自动记录哪些地方依赖于该数据，并在数据变化时自动更新这些地方。
- **Computed（计算属性）**：
  - `computed` 用于创建派生数据或计算值。`computed` 会缓存它的值，直到其依赖的 `observable` 状态发生变化时才会重新计算。它是 MobX 的“优化”机制，用于避免不必要的计算。
- **Observer（观察者）**：
  - `observer` 是 MobX 提供的 React 高阶组件，用来包裹 React 组件，使组件能够自动订阅状态的变化。当状态变化时，`observer` 会让组件重新渲染，反映最新的状态。

### **3. MobX 工作原理**

#### **1. 数据的响应式：**

- 当我们用 `observable` 声明一个对象或类属性时，MobX 会通过代理（Proxy）来追踪这些属性的变化。
- 对于对象的每一个属性，MobX 会添加 getter 和 setter，getter 会触发依赖追踪，setter 会触发依赖更新。

#### **2. 依赖追踪：**

- 当组件或 `computed` 属性访问一个 `observable` 时，MobX 会记录这次访问的依赖关系（即，记录哪个组件或 `computed` 依赖这个 `observable`）。这种依赖关系是自动维护的，无需手动管理。
- 例如，当组件使用 `counterStore.count` 时，MobX 会追踪该组件依赖了 `count` 这个 `observable`。

#### **3. 更新触发：**

- 一旦 `observable` 中的数据发生变化，MobX 会自动知道哪些地方依赖于它，并更新它们。例如，`count` 值变化时，所有依赖于 `count` 的 `computed` 属性和 `observer` 包裹的组件都会被触发更新。

#### **4. 最小化渲染：**

- MobX 会通过 `computed` 缓存派生的值，只有当 `observable` 发生变化时才会重新计算，从而减少不必要的重新渲染和计算。
- 这种优化机制确保了即使状态较为复杂，性能也能得到保证。

#### **5. 自动化视图更新：**

- MobX 在 React 中使用 `observer` 来实现自动更新视图。当 `observable` 数据发生变化时，`observer` 会自动触发组件的重新渲染，而无需手动管理每个状态的更新和视图的刷新。

### **4. MobX 的工作流程**

1. **创建状态（Observable）**：
   - 使用 `makeObservable` 或 `makeAutoObservable` 创建响应式状态。
   - 例如：`count = observable(0);`
2. **定义修改状态的方法（Actions）**：
   - 使用 `action` 来定义修改状态的方法。
   - 例如：`increment() { this.count++; }`
3. **访问状态并建立依赖关系**：
   - 组件或 `computed` 属性访问 `observable` 状态时，MobX 会记录这些访问，以便在状态变化时自动触发更新。
   - 例如：`@observer class Counter extends React.Component {...}`
4. **状态变化后更新视图**：
   - 当 `observable` 中的状态变化时，MobX 会重新计算依赖于该状态的 `computed` 和 `observer` 组件，自动触发视图更新。

### **5. 性能优化**

- `computed`：
  - 计算属性（`computed`）会缓存其值，直到它依赖的 `observable` 改变时才重新计算。它避免了每次访问都进行计算，提高了性能。
  
- 自动追踪：

  - MobX 会自动追踪依赖关系，并在状态发生变化时仅更新受影响的组件。这样避免了手动管理和更新，提升了开发效率和性能。

### **6. 总结**

- **透明的依赖追踪**：MobX 自动追踪哪些部分依赖于哪些数据，并根据数据变化自动更新依赖的部分。
- **响应式数据**：MobX 通过 `observable` 使数据变得响应式，任何对数据的读取和修改都会自动通知相关的视图进行更新。
- **自动视图更新**：通过 `observer` 和 `computed`，MobX 自动更新与状态相关的视图组件，并且优化了计算过程，避免不必要的渲染。
- **简单易用**：MobX 简化了状态管理，不需要繁琐的 reducer 或 action 类型，使用起来非常直观且高效。

通过这种方式，MobX 提供了一种高效且易于维护的响应式状态管理方案，尤其适合需要高度自动化和性能优化的应用。

## MobX与Redux的区别

**MobX** 和 **Redux** 都是流行的 JavaScript 状态管理库，它们都帮助管理应用中的全局状态，但它们的设计思想、使用方式和实现机制有很大的不同。下面是两者的主要区别：

### 1. **设计思想**

- MobX：

  - **响应式编程**：MobX 基于响应式编程的思想。它通过“透明的依赖追踪”来自动管理状态和视图之间的关系。**当状态改变时，所有依赖该状态的地方会自动更新**。
  - **自动化更新**：**MobX 可以自动追踪状态的变化，并自动更新依赖的部分。你不需要手动去触发视图更新**。
  
- Redux：

  - **不可变状态**：Redux 强调不可变状态的原则。状态是不可修改的，所有的状态变化都是通过派发一个 **action** 来完成的，而状态本身不会直接被修改。
- **单向数据流**：Redux 使用**严格的单向数据流**，所有的状态更新都通过 dispatching actions → reducers → 新的 state 这个流程来进行。

### 2. **核心概念**

- **MobX**：
  - **Observable（可观察的）**：数据（对象、数组、类等）是响应式的，MobX 会自动追踪哪些地方依赖于这些数据。
  - **Action（动作）**：修改状态的操作，必须在 action 内部进行，以便 MobX 能清楚地知道什么时候状态发生了变化。
  - **Computed（计算属性）**：基于现有状态计算出的派生值，MobX 会缓存它们，只有依赖的 observable 状态发生变化时才重新计算。
- **Redux**：
  - **State（状态）**：Redux 中的状态是不可变的，通常保存在一个巨大的对象中，并通过 reducers 来更新。
  - **Actions（动作）**：定义了“事件”，表示状态变更的意图。每个 action 都是一个简单的 JavaScript 对象，通常会包含 `type` 字段和可能的额外数据。
  - **Reducers（简化器）**：纯函数，接收当前的 state 和 action，然后返回新的 state。每个 reducer 只负责更新 state 中的一部分。

### 3. **数据管理**

- MobX：

  - 使用 **observable** 数据来标记需要响应式的状态。
  - 通过 **computed** 属性来衍生计算属性，减少不必要的计算。
  - 数据的变化自动触发更新，无需显式地通知组件或视图。
  
- Redux：

  - 数据是存储在一个全局的 **store** 中，并且是不可变的。
  - 每次更新都必须通过 **action** 来触发，通过 **dispatch** 调用 action，然后通过 **reducers** 更新状态。
  - 组件使用 **connect** 或 **useSelector** 来订阅 store 中的状态。

### 4. **状态更新**

- MobX：

  - **自动更新**：当数据发生变化时，所有依赖这些数据的地方会自动更新，无需显式地触发更新。
  - **动作（Action）**：对于修改状态的操作，MobX 通过 `action` 来明确标记哪些是状态修改，保证状态更新是可追踪的。
  
- Redux：

  - **手动更新**：所有的状态更新都必须通过 **dispatch** 一个 action 来触发。
- 每个 action 会通过 reducer 函数来创建新的 state，保证状态的不可变性。

### 5. **代码复杂度**

- MobX：

  - **简洁且直观**：由于 MobX 基于响应式编程，通常代码更简洁、易于理解。你不需要显式地描述状态如何变化。
  - 使用 `observable`、`computed` 和 `action` 可以非常自然地管理状态。
  
- Redux：

  - **较为复杂**：由于 Redux 强调不可变性和严格的单向数据流，管理状态的代码较为冗长，尤其是在需要多个 reducer 和复杂的 action 时。
- 需要定义大量的 **actions** 和 **reducers** 来处理状态的变化，适合大型应用。

### 6. **性能**

- MobX：

  - **高效的性能**：MobX 通过依赖追踪只更新受影响的部分，避免了不必要的重新计算和渲染。
  - `computed` 会缓存计算值，只有在依赖项发生变化时才会重新计算。
  
- Redux：

  - **性能开销**：在 Redux 中，每次 state 变化都会触发组件重新渲染，尤其是当 state 结构较大时，这可能会带来性能开销。
- **优化**：虽然可以使用像 `reselect` 这样的工具来优化，但通常需要更多的手动优化。

### 7. **调试和开发工具**

- MobX：

  - MobX 提供了简单的开发工具，但相比 Redux，调试时的可见性和工具集可能不如 Redux 丰富。
  - 也有一些工具可以帮助可视化依赖关系和跟踪状态变化（如 `mobx-react-devtools`）。
  
- Redux：

  - **Redux DevTools** 是一个非常强大的调试工具，它可以显示所有的 state 变更历史，甚至可以回溯或重新执行操作。
- Redux 的调试工具对于调试和开发是非常有帮助的，尤其在大型项目中。

### 8. **学习曲线**

- MobX：

  - **较低的学习曲线**：由于 MobX 的 API 简单、直观，学习起来相对容易。
  - 适合开发小到中型应用，尤其是需要快速实现响应式数据绑定的场景。
  
- Redux：

  - **较高的学习曲线**：由于 Redux 强调不可变性和函数式编程，涉及到的概念较多（actions, reducers, middleware 等），学习曲线相对较陡。
- 适合大规模的应用程序，尤其是需要严格控制状态变化和可维护性的场景。

------

### **总结**

| 特性         | **MobX**                                 | **Redux**                                                    |
| ------------ | ---------------------------------------- | ------------------------------------------------------------ |
| **设计哲学** | 响应式编程，透明依赖追踪，自动更新       | 单向数据流，使用不可变状态                                   |
| **状态管理** | 使用 `observable` 标记状态，自动追踪依赖 | 状态存储在一个全局 store 中，状态不可变，必须通过 action 更新 |
| **更新机制** | 自动触发更新，依赖的组件自动重新渲染     | 需要通过 dispatch action 和 reducer 更新状态                 |
| **学习曲线** | 较低，简洁直观                           | 较高，较为复杂，需要定义 actions 和 reducers                 |
| **性能**     | 高效，自动优化计算和渲染                 | 性能较差，可能需要手动优化                                   |
| **调试工具** | 简单的开发工具，功能不如 Redux 丰富      | Redux DevTools 强大，适合大规模应用                          |
| **适用场景** | 小到中型应用，快速实现响应式数据绑定     | 大型应用，复杂的状态管理和严格的流程控制                     |

总的来说，**MobX** 更适合轻量级、响应式的状态管理，学习曲线较低，适合快速开发。而 **Redux** 适用于大型应用，尤其是对状态变化有更严格要求的场景。Redux 提供了更强的可维护性和可扩展性，但也需要更多的 boilerplate 代码。

## MobX的响应式编程思想是不是和Vue原理有点像

是的，**MobX** 和 **Vue** 的响应式编程思想在某些方面确实有相似之处。它们都通过“响应式”来自动管理数据和视图的更新，但实现方式有所不同。以下是它们的共同点和不同点：

### **相似之处**

1. **响应式数据**：
   - **MobX**：通过 `observable` 将数据变成可观察对象，任何依赖于这些数据的地方都会自动更新。当数据发生变化时，相关的视图会自动重新渲染。
   - **Vue**：通过 `reactive` 或 `ref` 创建响应式数据，Vue 会追踪这些数据的依赖，当数据变化时，自动更新相关的 DOM。
2. **依赖追踪**：
   - **MobX**：MobX 采用“透明的依赖追踪”机制，即自动追踪哪些组件或计算属性依赖于某些数据，当这些数据发生变化时，相关依赖会自动更新。
   - **Vue**：Vue 也会追踪哪些组件依赖于哪些数据，这个追踪机制是通过 Vue 的 **响应式系统** 实现的，基于 **getter** 和 **setter** 来动态收集依赖。
3. **自动更新**：
   - **MobX**：当被观察的状态发生变化时，MobX 会自动更新视图，而无需显式地通知组件。
   - **Vue**：当响应式数据发生变化时，Vue 会自动触发视图更新，无需手动调用更新方法。

### **不同之处**

1. **实现机制**：
   - **MobX**：MobX 使用 **proxy** 或 **decorators**（在一些情况下）来处理对象的响应式。在 MobX 中，状态和视图之间的关系是隐式的，开发者通常不需要手动绑定视图。
   - **Vue**：Vue 使用 **getter/setter** 通过 `Object.defineProperty` 或 **Proxy**（Vue 3）来劫持数据的读写操作，并在数据变化时触发视图更新。Vue 也通过模板语法自动绑定数据和视图。
2. **数据变更的方式**：
   - **MobX**：数据变化是通过 `action` 显式触发的，修改数据时需要包裹在 `action` 内部，从而使状态变更变得可追踪。
   - **Vue**：Vue 的数据变化通常是直接通过赋值操作来触发，Vue 会自动检测变化并更新视图。
3. **计算属性**：
   - **MobX**：MobX 使用 **computed** 来创建衍生状态或计算属性，只有在依赖的数据变化时才会重新计算，避免不必要的重复计算。
   - **Vue**：Vue 通过 **computed** 计算属性和 **watcher** 来衍生出新的数据。Vue 会自动缓存计算属性的值，只有依赖的响应式数据发生变化时才重新计算。
4. **依赖管理的显式性**：
   - **MobX**：MobX 是隐式的，依赖是自动追踪的。开发者无需手动声明依赖关系，MobX 会根据使用的 `observable` 数据自动追踪哪些组件或计算属性依赖于哪些数据。
   - **Vue**：Vue 的依赖追踪相对显式，尤其在 Vue 2 中，通过 `watch` 或 `computed` 明确声明依赖，而在 Vue 3 中，`reactive` 和 `ref` 会隐式地管理依赖关系，但整体上依赖的管理还是较为显式。

### **总结**

- **MobX** 和 **Vue** 都采用了响应式编程的思想，使得状态的变化能够自动驱动视图更新。两者的核心理念是相似的，即通过跟踪数据的变化自动更新视图。
- 主要区别在于：**MobX** 更加灵活和自动化，追踪和更新的过程是隐式的，数据变更通过 `action` 显式触发；而 **Vue** 的响应式系统则在某些方面更加显式，依赖关系和更新机制可以通过模板、计算属性或 `watch` 显式声明。

如果你熟悉 Vue 的响应式原理，转而使用 MobX 时会感到它有很多相似之处，但也需要注意它们在实现细节上的差异。

# Zustand

`Zustand` 是一个非常轻量级的状态管理库，适用于 React 应用，它的 API 简洁且高效。`Zustand` 可以让你在 React 中轻松地创建全局状态，并且不需要像 Redux 那样的复杂设置。以下是如何使用 `Zustand` 的基本步骤和示例：

### 安装 `Zustand`

首先，你需要安装 `zustand`：

```bash
npm install zustand
```

### 创建状态管理

`Zustand` 使用一个 `create` 函数来创建一个 store，store 是一个 JavaScript 对象，里面包含应用的状态以及更新状态的方法。

#### 基本使用

```js
import create from 'zustand';

// 创建 store
const useStore = create((set) => ({
  count: 0, // 状态
  increment: () => set((state) => ({ count: state.count + 1 })), // 修改状态的方法
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));

function Counter() {
  const { count, increment, decrement } = useStore(); // 获取状态和方法

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
}

export default Counter;
```

在上面的代码中：

- 使用 `create` 创建一个 store，并在其中定义了一个 `count` 状态和两个更新 `count` 的方法：`increment` 和 `decrement`。
- 在组件中，通过 `useStore` hook 获取 `count` 和两个方法 `increment`、`decrement`，并且将这些方法绑定到按钮的点击事件上。

### 进阶用法

#### 1. 多个 store

你可以创建多个 store 来管理不同部分的状态。例如：

```js
// store.js
import create from 'zustand';

export const useCounterStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));

export const useUserStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
```

然后在组件中可以分别使用它们：

```js
import React from 'react';
import { useCounterStore } from './store';
import { useUserStore } from './store';

function App() {
  const { count, increment } = useCounterStore();
  const { user, setUser } = useUserStore();

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={increment}>Increment</button>
      <h2>User: {user ? user.name : 'No user'}</h2>
      <button onClick={() => setUser({ name: 'John Doe' })}>Set User</button>
    </div>
  );
}

export default App;
```

#### 2. 使用 `persist` 插件持久化数据

你还可以使用 `zustand` 的插件 `zustand/middleware` 来将状态持久化到本地存储中。

```js
import create from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set) => ({
      count: 0,
      increment: () => set((state) => ({ count: state.count + 1 })),
    }),
    {
      name: 'counter-storage', // 本地存储的名字
    }
  )
);

function App() {
  const { count, increment } = useStore();

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={increment}>Increment</button>
    </div>
  );
}

export default App;
```

这段代码会将 `count` 的值保存在浏览器的本地存储中，当页面重新加载时，`count` 会自动恢复。

### 3. 订阅状态变化

`Zustand` 允许你直接订阅状态变化，而不是每次组件重新渲染时都取状态。你可以使用 `useStore.subscribe` 来实现。

```js
import create from 'zustand';

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));

// 订阅 count 状态变化
useStore.subscribe(
  (state) => state.count,
  (count) => {
    console.log('Count changed:', count);
  }
);

function App() {
  const { count, increment } = useStore();

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={increment}>Increment</button>
    </div>
  );
}

export default App;
```

每当 `count` 状态发生变化时，订阅的回调都会被触发。

### 总结

`Zustand` 是一个非常简洁和高效的状态管理工具，适用于需要少量依赖或较小项目的 React 应用。它的主要特点是：

- **简单 API**：创建 store 和更新状态非常简单。
- **轻量级**：没有像 Redux 那样复杂的概念和配置。
- **响应式**：通过 hook 直接获取和更新状态。
- **持久化支持**：通过中间件，可以方便地将状态持久化到浏览器的本地存储。

通过 `Zustand`，你可以轻松实现全局状态管理并且不需要为它引入太多的复杂性。

## 怎么使用Zustand

## Zustand的原理

## Zustand与Redux的区别

