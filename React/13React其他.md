# 1. React FC

在 React 中，`FC`（全称为 `FunctionComponent`）是 TypeScript 提供的一个类型，用于定义函数式组件。

### `FC` 的定义

`FC` 是 React 内置的一种类型，主要用于为函数式组件添加类型约束。它对函数组件的 props 进行类型推断，并包括了默认的 `children` 属性。具体定义如下：

```typescript
import { FC } from 'react';

const MyComponent: FC<{ message: string }> = ({ message }) => {
  return <div>{message}</div>;
};
```

在上面的例子中：
- `MyComponent` 是一个函数式组件，接收一个 `message` 字符串作为 props。
- `FC<{ message: string }>` 指定了该组件的 props 类型，其中 `{ message: string }` 表示该组件必须接收一个 `message` 的属性。

### `FC` 的特点
1. **包含 `children`**：`FC` 默认包含了 `children` 属性，因此你无需手动定义 `children`。如果组件需要接收 `children`，`FC` 处理得非常方便。
2. **类型推断**：使用 `FC` 后，TypeScript 可以自动推断 props 的类型，并在编写组件时提供类型检查和智能提示。
3. **返回类型为 `JSX.Element`**：`FC` 自动推断函数组件的返回类型为 `JSX.Element`，不需要显式声明返回值类型。

### 不使用 `FC` 的方式

尽管 `FC` 提供了便利，但有时你可能不希望组件自动包含 `children`，或者不需要它的其他特性。在这种情况下，可以显式定义 props 类型，而不使用 `FC`：

```typescript
type MyComponentProps = {
  message: string;
};

const MyComponent = ({ message }: MyComponentProps) => {
  return <div>{message}</div>;
};
```

这样做的好处是你可以完全控制组件的 props，而不受 `FC` 的默认行为（如 `children`）的影响。

### 是否使用 `FC`

在实际开发中，是否使用 `FC` 是个人选择。对于简单的组件，使用 `FC` 提供了简洁的定义方式；但在一些场景中，手动定义类型能提供更多灵活性。

# 2. React Portals

如何实现随便放一个组件在react页面中的任意位置，有相关api吗?

在 React 中，你可以通过使用 **React Portals** 实现将组件渲染到页面的任意位置。Portals 是 React 提供的一个 API，允许你将组件渲染到 DOM 树的指定位置，而不仅限于父组件的 DOM 层级。

------

### **实现步骤**

#### **1. 创建一个容器用于渲染组件**

在 HTML 文件中，创建一个 DOM 节点作为目标容器。例如：

```html
<div id="custom-container"></div>
```

#### **2. 使用 React Portals**

React 提供了 `ReactDOM.createPortal` API，可以将子节点渲染到指定的 DOM 节点中，而不是渲染到组件的默认父节点中。

```javascript
import React from 'react';
import ReactDOM from 'react-dom';

const MyComponent = () => {
  return ReactDOM.createPortal(
    <div style={{ backgroundColor: 'lightblue', padding: '10px' }}>
      This is rendered anywhere in the DOM!
    </div>,
    document.getElementById('custom-container') // 指定的容器
  );
};

export default MyComponent;
```

#### **3. 在页面中使用组件**

将 `MyComponent` 引入到任何页面中：

```javascript
import React from 'react';
import MyComponent from './MyComponent';

const App = () => {
  return (
    <div>
      <h1>Main App</h1>
      <MyComponent />
    </div>
  );
};

export default App;
```

即使 `MyComponent` 在 React 组件树中嵌套在 `App` 中，但其 DOM 元素将被插入到 `#custom-container` 中。

------

### **动态插入位置**

如果希望动态控制组件渲染到不同位置，可以将目标容器作为参数传递：

```javascript
const MyComponent = ({ targetId }) => {
  const target = document.getElementById(targetId);

  if (!target) {
    console.warn(`Target with id "${targetId}" not found!`);
    return null;
  }

  return ReactDOM.createPortal(
    <div style={{ backgroundColor: 'lightblue', padding: '10px' }}>
      This is dynamically rendered!
    </div>,
    target
  );
};

// 使用时
<MyComponent targetId="another-container" />
```

------

### **场景应用**

1. **弹窗组件**： 通常弹窗需要脱离父级 DOM 树独立渲染，以避免 `overflow: hidden` 等 CSS 属性的限制。
2. **全屏组件**： 比如模态框、通知框，直接插入到 `body` 中。
3. **动态组件**： 将组件渲染到不同的 DOM 节点中。

------

### **注意事项**

1. **样式隔离问题**： 如果组件样式受到全局样式影响，可以使用 CSS Modules 或 `styled-components` 等工具进行样式隔离。
2. **生命周期管理**： Portals 只影响渲染位置，不影响组件的生命周期。组件的 `componentDidMount`、`useEffect` 等仍然按照组件树结构触发。
3. **渲染性能**： 使用 Portals 本质上只是改变了渲染位置，对性能没有显著影响。

React Portals 是解决组件渲染到指定位置的核心工具，可以灵活地满足复杂 UI 的需求。

# 3. 父组件阻止子组件更新

在 React 中，父组件可以通过以下方式阻止子组件的更新：

------

### **1. 使用 `React.memo`**

`React.memo` 是一个高阶组件，用于对函数组件进行性能优化。它会对组件的 props 进行浅比较，当 props 没有变化时，阻止重新渲染。

#### 示例代码：

```jsx
import React, { useState } from 'react';

const Child = React.memo(({ value }) => {
  console.log('Child rendered');
  return <div>Child Value: {value}</div>;
});

const Parent = () => {
  const [parentValue, setParentValue] = useState(0);
  const [childValue, setChildValue] = useState(0);

  return (
    <div>
      <button onClick={() => setParentValue(parentValue + 1)}>
        Update Parent
      </button>
      <button onClick={() => setChildValue(childValue + 1)}>
        Update Child
      </button>
      <div>Parent Value: {parentValue}</div>
      <Child value={childValue} />
    </div>
  );
};

export default Parent;
```

#### 分析：

- `React.memo` 会阻止 `Child` 组件在 `childValue` 未变化时重新渲染。
- 点击 "Update Parent" 按钮时，只更新父组件，不触发子组件渲染。

------

### **2. 使用 `shouldComponentUpdate` (Class 组件)**

对于类组件，可以通过重写 `shouldComponentUpdate` 方法来自定义更新条件。

#### 示例代码：

```jsx
import React, { Component } from 'react';

class Child extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.value !== this.props.value; // 仅当 props 改变时更新
  }

  render() {
    console.log('Child rendered');
    return <div>Child Value: {this.props.value}</div>;
  }
}

class Parent extends Component {
  state = { parentValue: 0, childValue: 0 };

  render() {
    const { parentValue, childValue } = this.state;

    return (
      <div>
        <button onClick={() => this.setState({ parentValue: parentValue + 1 })}>
          Update Parent
        </button>
        <button onClick={() => this.setState({ childValue: childValue + 1 })}>
          Update Child
        </button>
        <div>Parent Value: {parentValue}</div>
        <Child value={childValue} />
      </div>
    );
  }
}

export default Parent;
```

#### 分析：

- `shouldComponentUpdate` 会在更新前被调用，返回 `false` 时阻止组件更新。
- 当父组件更新但 `childValue` 没有变化时，`Child` 组件不会重新渲染。

------

### **3. 使用 `useMemo` 或 `useCallback` 缓存子组件的 props**

在函数组件中，通过 `useMemo` 缓存传递给子组件的值或 `useCallback` 缓存函数，可以避免不必要的渲染。

#### 示例代码：

```jsx
import React, { useState, useMemo } from 'react';

const Child = React.memo(({ value }) => {
  console.log('Child rendered');
  return <div>Child Value: {value}</div>;
});

const Parent = () => {
  const [parentValue, setParentValue] = useState(0);
  const [childValue, setChildValue] = useState(0);

  const memoizedValue = useMemo(() => childValue, [childValue]);

  return (
    <div>
      <button onClick={() => setParentValue(parentValue + 1)}>
        Update Parent
      </button>
      <button onClick={() => setChildValue(childValue + 1)}>
        Update Child
      </button>
      <div>Parent Value: {parentValue}</div>
      <Child value={memoizedValue} />
    </div>
  );
};

export default Parent;
```

#### 分析：

- 通过 `useMemo` 缓存 `childValue`，使得 `Child` 组件只在 `childValue` 变化时重新渲染。

------

### **4. 从渲染树中移除子组件**

当子组件不需要参与更新时，可以通过条件渲染完全移除子组件。

#### 示例代码：

```jsx
const Parent = () => {
  const [showChild, setShowChild] = useState(true);

  return (
    <div>
      <button onClick={() => setShowChild(!showChild)}>Toggle Child</button>
      {showChild && <Child />}
    </div>
  );
};

const Child = () => {
  console.log('Child rendered');
  return <div>Child Component</div>;
};
```

#### 分析：

- 当 `showChild` 为 `false` 时，`Child` 被完全移除，不参与任何更新。

------

### **总结**

父组件可以通过以下方式阻止子组件更新：

1. **`React.memo`**：对函数组件进行性能优化。
2. **`shouldComponentUpdate`**：对类组件进行更新控制。
3. **`useMemo` / `useCallback`**：缓存传递给子组件的值或函数。
4. **条件渲染**：在需要时从渲染树中移除子组件。

选择具体方式时，应根据项目需求、组件结构以及性能要求决定。