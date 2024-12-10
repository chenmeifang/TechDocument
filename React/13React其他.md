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

# 4. React旧值问题

```js
const ComB = ({onClick}) => {
    return <div onClick={onClick} />
}

const ComA =  () => {
    const [a, setA] = useState(0)
    // 关键：useCallback创建了一个带有闭包的回调函数onClick
    //      
    const onClick = useCallback(() => {
        console.log(a)
    }, [])
    useEffect(()=>{
        setTimeout(()=>{
            setA(1);
        }, 3000)
    }, [])
    return (
        <ComB onClick={onClick} />
    )
}
```

是的，这段代码存在 **React 旧值问题**。

### 问题原因：

在 `ComA` 组件中，`onClick` 使用了 `useCallback`，而它的依赖数组是空的 `[]`，**这意味着 `onClick` 的引用只在组件首次渲染时创建且永远不会更新**

由于 `onClick` 闭包捕获了 `useCallback` 创建时的 `a` 值（即初始值 `0`），在后续 `setA` 更新状态时，`onClick` 中的 `a` 不会同步更新，仍然是 `0`。

因此，**无论 `a` 变成什么值，`onClick` 中的 `console.log(a)` 都始终打印 `0`**。

### 触发过程：

1. 组件渲染时，`a` 的初始值为 `0`。
2. 在 `useEffect` 中，`setTimeout` 在 3 秒后调用 `setA(1)`，更新状态 `a`。
3. 状态更新后，组件重新渲染，`a` 的值变为 `1`，但由于 `onClick` 的依赖数组是空的，它仍然是绑定了旧的 `a` 值 `0`。
4. 当 `ComB` 的 `onClick` 被触发时，`onClick` 中的 `console.log(a)` 打印的仍然是捕获时的旧值 `0`。

------

### 解决方案：

为了让 `onClick` 始终访问最新的 `a` 值，可以将 `a` 添加到 `useCallback` 的依赖数组中：

```javascript
const onClick = useCallback(() => {
    console.log(a);
}, [a]);
```

这样，`onClick` 每次依赖 `a` 的值变化时都会更新，闭包捕获的就是最新的 `a` 值。

------

### 改进后的完整代码：

```javascript
const ComB = ({ onClick }) => {
    return <div onClick={onClick} />;
};

const ComA = () => {
    const [a, setA] = useState(0);

    const onClick = useCallback(() => {
        console.log(a);
    }, [a]);

    useEffect(() => {
        setTimeout(() => {
            setA(1);
        }, 3000);
    }, []);

    return <ComB onClick={onClick} />;
};
```

### 改进后的行为：

1. 初始时，`a` 为 `0`，`onClick` 捕获的值为 `0`。
2. 3 秒后，`a` 更新为 `1`，`onClick` 也更新，捕获最新的 `a` 值。
3. 在触发 `ComB` 的 `onClick` 时，会正确打印 `1`。

# 5. React旧值问题

好的，我们来详细分析这个 React 组件在执行过程中的具体行为，逐步拆解代码的运行机制，深入探讨 React 的闭包特性和状态更新原理。

------

### 1. **代码分析：初始状态**

在初次渲染时，以下代码依次被执行：

#### 初次执行：

```jsx
const [a, setA] = useState(0);
```

- `useState(0)` 创建了一个状态变量 `a`，初始值为 `0`，并返回一个更新函数 `setA`。
- 此时，`a = 0`。

------

```jsx
const onClick = useCallback(() => {
    console.log(a);
}, []);
```

- `useCallback` 创建了一个带有闭包的回调函数 `onClick`。
- 因为依赖数组是空的 `[]`，所以 `onClick` 在 `ComA` 组件的整个生命周期中只会创建一次，且其闭包捕获了当前上下文中的变量 `a`。
  - 捕获时，`a = 0`，所以 `onClick` 内部的 `console.log(a)` 始终访问这个初始值 `0`。

------

```jsx
useEffect(() => {
    setTimeout(() => {
        setA(1);
    }, 3000);
}, []);
```

- `useEffect` 的依赖数组为空，表示该副作用只在组件挂载（`mount`）时执行一次。
- 通过 `setTimeout`，在 3 秒后调用 `setA(1)`，更新 `a` 的值。

------

### 2. **第一次渲染时的状态**

#### 初次渲染的情况：

- `a = 0`。

- `onClick` 是通过 `useCallback` 创建的，闭包捕获了初始状态 `a`，此时 `onClick` 的内容是：

  ```jsx
  const onClick = () => {
      console.log(0);
  };
  ```

- `ComB` 组件接收到的 `onClick` 回调是这个被闭包捕获的 `onClick`。

------

### 3. **3 秒后的状态更新**

#### `setTimeout` 触发：

- 3 秒后，`setA(1)` 被调用。
- `setA` 是 React 的状态更新函数，更新状态 `a` 的值为 `1`。

------

#### 状态更新引发重新渲染：

- React 检测到 `a` 的值发生变化后，会触发组件重新渲染。
- 在重新渲染时：
  1. `useState(0)` 读取最新的状态值 `a = 1`。
  2. `useCallback` 的依赖数组没有改变（仍为空 `[]`），所以 `onClick` 不会重新创建，仍然是初次渲染时的闭包函数，捕获的 `a` 仍然是 `0`。

------

### 4. **3.1 秒后触发 `ComB` 的 `onClick`**

假设用户在 3.1 秒后点击了 `ComB`：

- 点击事件触发 `onClick`。

- 由于 `onClick` 是初次渲染时的闭包，它始终引用的是初始值 `a = 0`，所以：

  ```jsx
  console.log(a); // 打印 0
  ```

------

### 5. **总结 React 的闭包问题**

根本原因是 `useCallback` 的依赖数组为空，导致 `onClick` 的闭包始终捕获的是 `a` 的初始值 `0`，而不是最新值。

在 React 中，每次组件渲染时都会重新计算状态和变量，但 `onClick` 因为被 `useCallback` 缓存住了，导致它的内容不会随状态变化而更新。

------

### 6. **如何解决旧值问题**

要解决这个问题，关键在于让 `onClick` 始终捕获最新的 `a` 值。我们需要让 `useCallback` 的依赖数组包含 `a`：

#### 改进代码：

```jsx
const onClick = useCallback(() => {
    console.log(a);
}, [a]); // 将 a 添加到依赖数组
```

#### 改进后效果：

- 每次 `a` 的值变化时，`onClick` 都会重新计算，捕获最新的 `a` 值。
- 用户点击 `ComB` 时，`console.log(a)` 会打印最新的值。

------

### 7. **状态更新过程的完整分析（改进后）**

#### 改进后的执行流程：

1. 初次渲染：
   - `a = 0`。
   - `onClick` 捕获了初始值 `a = 0`。
2. 3 秒后：
   - `setA(1)` 更新状态。
   - React 触发组件重新渲染。
   - `a = 1`。
   - `useCallback` 的依赖数组 `[a]` 变化，重新计算 `onClick`，此时捕获最新的 `a = 1`。
3. 3.1 秒后点击 `ComB`：
   - `onClick` 打印最新值 `a = 1`。

------

### 8. **进一步优化建议**

如果 `onClick` 的逻辑较复杂，或者不希望因为状态频繁更新而导致 `onClick` 重新创建，可以引入 `useRef` 来存储最新状态：

#### 使用 `useRef` 优化：

```jsx
const aRef = useRef(0);
useEffect(() => {
    aRef.current = a;
}, [a]);

const onClick = useCallback(() => {
    console.log(aRef.current); // 始终访问最新的 a
}, []);
```

#### 优势：

- `onClick` 的引用不会频繁变化。
- 始终可以访问到最新的 `a` 值。

------

### 总结

这段代码的问题核心在于 **React 的闭包特性**。当状态更新时，旧的闭包不会自动同步到最新状态。通过正确设置依赖数组或使用 `useRef`，可以确保捕获最新的状态，避免旧值问题。

# 6. React旧值问题

React 中的“旧值问题”通常指组件在渲染和更新过程中使用了已经过时的状态或 props，导致逻辑错误或显示不符合预期。这种问题在以下几种场景中比较常见：

------

### 1. **闭包陷阱（Closure Trap）**

当组件内的函数捕获了某次渲染时的状态或 props，由于 React 的状态和 props 是不可变的，更新状态或 props 并不会改变已捕获的值，导致函数使用了“旧值”。

#### 示例：

```jsx
function Counter() {
  const [count, setCount] = React.useState(0);

  function handleClick() {
    setTimeout(() => {
      alert(`Count is: ${count}`); // 这里的 count 是捕获的旧值
    }, 1000);
  }

  return <button onClick={handleClick}>Count: {count}</button>;
}
```

#### 解决方案：

使用最新值，可以通过 `useRef` 或直接获取更新后的状态：

**方法 1**：使用 `useRef`

```jsx
function Counter() {
  const [count, setCount] = React.useState(0);
  const countRef = React.useRef(count);

  React.useEffect(() => {
    countRef.current = count;
  }, [count]);

  function handleClick() {
    setTimeout(() => {
      alert(`Count is: ${countRef.current}`);
    }, 1000);
  }

  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}
```

**方法 2**：直接使用函数更新

```jsx
function Counter() {
  const [count, setCount] = React.useState(0);

  function handleClick() {
    setTimeout(() => {
      setCount(prevCount => {
        alert(`Count is: ${prevCount}`);
        return prevCount;
      });
    }, 1000);
  }

  return <button onClick={handleClick}>Count: {count}</button>;
}
```

------

### 2. **依赖数组中的旧值问题**

在 `useEffect` 或其他 Hooks 的依赖数组中，如果忘记添加依赖项，会导致依赖的值始终是 Hook 初始化时的值，进而引发旧值问题。

#### 示例：

```jsx
function App() {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      console.log(`Count: ${count}`); // 这里的 count 是旧值
    }, 1000);

    return () => clearInterval(interval);
  }, []); // 忘记添加 count 作为依赖
}
```

#### 解决方案：

将所有依赖的状态或 props 添加到依赖数组中：

```jsx
React.useEffect(() => {
  const interval = setInterval(() => {
    console.log(`Count: ${count}`); // 现在 count 是最新的值
  }, 1000);

  return () => clearInterval(interval);
}, [count]);
```

------

### 3. **异步更新导致的旧值**

React 的状态更新是异步的，在同一个渲染周期中连续调用多次 `setState`，后续的 `setState` 无法立刻获取最新状态，导致逻辑出错。

#### 示例：

```jsx
function Counter() {
  const [count, setCount] = React.useState(0);

  function incrementTwice() {
    setCount(count + 1); // 第一次更新
    setCount(count + 1); // 第二次仍然基于旧的 count
  }

  return <button onClick={incrementTwice}>Count: {count}</button>;
}
```

#### 解决方案：

使用函数式更新，确保每次 `setState` 都基于最新值：

```jsx
function Counter() {
  const [count, setCount] = React.useState(0);

  function incrementTwice() {
    setCount(prevCount => prevCount + 1); // 基于最新值更新
    setCount(prevCount => prevCount + 1);
  }

  return <button onClick={incrementTwice}>Count: {count}</button>;
}
```

------

### 总结

React 的“旧值问题”主要是由于状态或 props 的快照机制以及依赖数组中的值未同步导致的。解决问题的关键在于：

1. 理解 React 的状态和生命周期机制。
2. 在异步或延迟逻辑中，确保使用最新的状态。
3. 使用 `useRef`、函数式更新、正确设置依赖数组等技术避免旧值问题。

# 7. React的闭包特性

在 React 中，闭包特性是一种经常需要理解并小心处理的 JavaScript 特性。闭包可以导致一些不易察觉的问题，也为开发提供了许多强大的工具。以下是详细的介绍和相关示例：

------

### **什么是闭包？**

闭包是 JavaScript 的基本特性，定义为**函数可以访问其词法作用域外部的变量，即使这个函数在作用域之外执行**。

**特点**：

1. 函数“记住”了它定义时的上下文。
2. 当某个变量被闭包捕获后，函数仍然可以访问它的最新状态。

------

### **React 中的闭包特性**

React 的状态管理和事件处理经常会用到闭包。当我们在组件中定义函数时，它会“捕获”当时的状态或 props。

这种特性可能会导致以下两种现象：

1. **闭包捕获旧值问题**。
2. **闭包使状态值不丢失**。

------

### **闭包的常见问题及解决方法**

#### **1. 闭包捕获旧状态**

React 的函数组件每次渲染都会生成一个新的上下文（包括新的状态和 props）。如果某个函数捕获了旧的状态值，在随后的更新中可能会产生问题。

**示例：**

```tsx
import React, { useState } from 'react';
function Counter() {
  const [count, setCount] = useState(0);
  const handleClick = () => {
    setTimeout(() => {
      // 这里的 count 是函数定义时的快照，不是最新的值
      console.log(count); // 始终打印的是点击按钮时的 count
      setCount(count + 1);
    }, 1000);
  };
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleClick}>Increment</button>
    </div>
  );
}
```

**问题**：

- `setTimeout` 中的 `count` 是 `handleClick` 定义时的值，而不是最新的值。
- 问题的本质是闭包捕获了旧的状态值。

**解决方法**：

1. **使用状态更新函数**：`setState` 支持传入一个函数，可以获取最新的状态。

   ```tsx
   const handleClick = () => {
     setTimeout(() => {
       setCount(prevCount => prevCount + 1); // 获取最新的 count
     }, 1000);
   };
   ```

2. **使用 `useRef` 存储最新的状态值**：

   ```tsx
   import React, { useState, useRef } from 'react';
   
   function Counter() {
     const [count, setCount] = useState(0);
     const countRef = useRef(count);
   
     countRef.current = count; // 同步更新最新值
   
     const handleClick = () => {
       setTimeout(() => {
         console.log(countRef.current); // 总是最新的 count 值
         setCount(countRef.current + 1);
       }, 1000);
     };
   
     return (
       <div>
         <p>Count: {count}</p>
         <button onClick={handleClick}>Increment</button>
       </div>
     );
   }
   ```

------

#### **2. 闭包使状态值不丢失**

React 的闭包特性也可以帮助我们保存状态。以下是一个常见场景：需要在组件卸载时仍然记住某些值。

**示例：**

```tsx
import React, { useState, useEffect } from 'react';

function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prevCount => prevCount + 1); // 每秒更新一次
    }, 1000);

    return () => clearInterval(interval); // 清理定时器
  }, []); // 空依赖数组确保只运行一次

  return <p>Timer: {count}</p>;
}
```

在这里，React 的闭包特性确保了 `setCount` 的状态更新始终使用最新值。

------

### **闭包的最佳实践**

1. **优先使用状态更新函数**：
   - React 提供的状态更新函数（如 `setState`）能有效解决闭包捕获旧状态的问题。
2. **尽量避免在异步操作中直接使用状态**：
   - 异步操作（如 `setTimeout`, `Promise`, `fetch`）容易导致闭包问题。
3. **合理使用 `useRef`**：
   - `useRef` 可以存储组件中不会导致重新渲染的变量，非常适合用于存储最新状态或防止闭包捕获旧值。
4. **避免冗余依赖**：
   - 在 `useEffect` 等 Hook 中，注意确保依赖项列表（`[]`）完整，以避免无意的闭包问题。

------

### **总结**

React 中的闭包特性既是优势也是挑战：

- 它可以确保函数定义时的状态不丢失。
- 同时也可能捕获旧值，导致不可预料的问题。

通过理解闭包的工作机制，以及使用正确的编程方式（如状态更新函数或 `useRef`），可以有效避免闭包带来的问题，并充分利用其优势。

# [8. useEffect引起的闭包陷阱](https://www.bilibili.com/video/BV1nj411r7rt/?spm_id_from=333.337.search-card.all.click&vd_source=a7089a0e007e4167b4a61ef53acc6f7e)

 用闭包的方式解释react为什么推荐在useEffect添加依赖项

 闭包的重要特性：**保持变量不被释放**

# [9. React的闭包陷阱](https://juejin.cn/post/6844904193044512782)



