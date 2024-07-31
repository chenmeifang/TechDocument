# 1. React函数组件和类组件的区别

|      | 函数组件            | 类组件       |
| ---- | ------------------- | ------------ |
|      | 没有生命周期        | 有生命周期   |
|      | 没有this上下文      | 有this上下文 |
|      | 使用Hooks来管理状态 |              |

# [2. Hooks](https://www.bilibili.com/video/BV1iV411b7L1/?spm_id_from=333.337.search-card.all.click&vd_source=a7089a0e007e4167b4a61ef53acc6f7e)

## 2.1 Hooks的理念

## 2.2 Hooks的实现

## 2.3 Hooks的源码

# [3. React性能优化上](https://www.bilibili.com/video/BV1Yr4y1J7oc/?spm_id_from=333.999.0.0&vd_source=a7089a0e007e4167b4a61ef53acc6f7e)

## 1. 为什么React需要性能优化API

<img src="09React面试题.assets/image-20240731103439334.png" alt="image-20240731103439334" style="zoom:50%;" />

## 2. React性能优化应该遵循的法则

> 将**变的部分**与**不变的部分**分离

重看吧！

## 3. 性能优化背后的源码运行机制

# 4. 如何捕获React全局的报错

在React中，全局捕获报错可以通过以下几种方式实现：

### 1. 使用 Error Boundaries

在React中，最常见的方法是使用 **Error Boundaries**（错误边界）。Error Boundaries 是一种React组件，用于捕获其子组件树中的JavaScript错误，记录这些错误，并展示一个回退UI。它们只会捕获其子组件树中的错误，不会捕获自身的错误。

#### 创建 Error Boundary 组件

首先，你需要创建一个 Error Boundary 组件。这个组件需要实现 `componentDidCatch` 生命周期方法来捕获错误，并且实现 `static getDerivedStateFromError` 方法来更新状态以显示备用UI。

```javascript
import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // 更新 state，使下一个渲染可以显示降级 UI
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // 你可以将错误日志上报到服务器
    console.error("Uncaught error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      // 可以渲染任何自定义的降级 UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```

#### 使用 Error Boundary

将 `ErrorBoundary` 组件包裹在需要捕获错误的组件树周围：

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ErrorBoundary from './ErrorBoundary';

ReactDOM.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
  document.getElementById('root')
);
```

### 2. 使用 `window.onerror` 和 `window.addEventListener('error')`

对于全局错误，尤其是那些不在 React 组件内部的错误，你可以使用 `window.onerror` 和 `window.addEventListener('error')` 来捕获它们。

#### 使用 `window.onerror`

`window.onerror` 是一个全局事件处理程序，它可以捕获未处理的错误。

```javascript
window.onerror = function(message, source, lineno, colno, error) {
  console.error(`Error: ${message} at ${source}:${lineno}:${colno}`);
  // 你可以将错误日志发送到服务器
  return true; // 阻止浏览器默认的错误处理
};
```

#### 使用 `window.addEventListener('error')`

`window.addEventListener('error')` 也可以用来捕获错误事件：

```javascript
window.addEventListener('error', function(event) {
  console.error(`Error: ${event.message} at ${event.filename}:${event.lineno}:${event.colno}`);
  // 你可以将错误日志发送到服务器
});
```

### 3. 使用 `window.addEventListener('unhandledrejection')`

为了捕获未处理的Promise拒绝（如async/await中的错误），你可以使用 `window.addEventListener('unhandledrejection')`：

```javascript
window.addEventListener('unhandledrejection', function(event) {
  console.error('Unhandled promise rejection:', event.reason);
  // 你可以将错误日志发送到服务器
});
```

### 总结

- **Error Boundaries** 用于捕获 React 组件树中的错误。
- **`window.onerror` 和 `window.addEventListener('error')`** 用于捕获全局错误。
- **`window.addEventListener('unhandledrejection')`** 用于捕获未处理的Promise拒绝。

这些方法可以帮助你全局捕获并处理React应用中的错误，确保应用在遇到错误时能够优雅地降级或记录错误信息。如果你有其他问题或需要更详细的示例，随时告诉我！
