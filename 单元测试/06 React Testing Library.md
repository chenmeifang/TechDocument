https://www.npmjs.com/package/@testing-library/react

# 1. React Testing Library

React 官方推荐的测试工具主要是 **React Testing Library**（RTL），这是一个轻量级的工具，旨在帮助开发者更好地测试 React 组件，**重点是模拟用户行为，而非直接测试实现细节**。

### 主要特性：

1. **用户驱动的测试**：
   - React Testing Library 强调测试组件在实际应用中的行为和交互，而非实现细节。它的设计理念是“**测试应该模拟真实的用户操作，而不是测试具体的实现方式**”。
   - 这意味着，测试应尽量避免直接操作 DOM 元素的属性或方法，而是通过模拟用户交互（如点击按钮、填写表单等）来检查组件的行为。
2. **简单的 API**：
   - RTL 提供了简洁且易用的 API，例如 `render`、`fireEvent` 和 `waitFor`，使得编写测试代码更加简单直观。
   - 通过 `render` 函数将 React 组件渲染到虚拟 DOM 中，之后你可以查询 DOM 元素并模拟用户交互。
3. **鼓励通过查询用户可见内容来定位元素**：
   - 推荐使用 `getByText`、`getByLabelText` 等查询方法来查找元素，这些方法模拟了用户如何查找页面内容（例如通过按钮的文本或表单标签）。
   - 避免直接使用像 `getByTestId` 这样的查询方式，除非确实需要通过 `data-testid` 来查找元素。
4. **支持异步行为测试**：
   - RTL 提供了对异步代码的支持，可以通过 `waitFor` 等方法等待元素在 DOM 中渲染或更新。
   - 例如，在测试异步数据加载或动画时，可以确保测试代码等待结果完成再进行断言。
5. **与 Jest 集成良好**：
   - RTL 与 Jest 配合使用非常顺畅，Jest 的测试框架提供了 `expect` 断言和模拟函数等功能，而 RTL 提供了测试组件的工具，两者搭配非常适合进行 React 组件的单元测试。

### 示例代码：

```javascript
// 组件：Button.js
import React from 'react';

const Button = ({ onClick, label }) => (
  <button onClick={onClick}>
    {label}
  </button>
);

export default Button;
// 测试：Button.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

test('calls the onClick prop when clicked', () => {
  const handleClick = jest.fn();
  render(<Button label="Click me" onClick={handleClick} />);

  // 查找按钮并模拟点击
  fireEvent.click(screen.getByText(/Click me/i));

  // 断言：点击时调用了 onClick 函数
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

### 核心工具：

1. **`render`**：渲染 React 组件并返回一个包含组件 DOM 元素的对象，可以用来查询组件内的元素。
2. **`fireEvent`**：模拟用户交互事件，如点击、输入、提交等。
3. **`screen`**：用于查询组件渲染后生成的 DOM 元素。
4. **`waitFor`**：等待异步行为完成后再进行断言，适用于等待 DOM 更新。

### 为什么使用 React Testing Library？

- **更接近用户行为**：测试从用户的角度出发，而不是从技术实现出发，更符合实际应用场景。
- **避免测试实现细节**：通过查询用户界面内容（如按钮文本）来定位元素，而不是依赖组件的内部结构或实现细节。
- **鼓励良好的测试实践**：测试的重点放在组件的行为和交互上，而非测试 DOM 结构或组件的内部状态。

### 总结：

React Testing Library 提供了一套简单、功能完备的工具，帮助开发者编写易于维护和理解的 React 组件测试。它鼓励通过模拟用户行为进行测试，强调组件在实际使用中的表现，而非其内部实现细节。这种方法使得测试更具可维护性，且与应用的实际用户体验更为一致。

# 2. react-dom && react-dom/test-utils

`react-dom` 和 `react-dom/test-utils` 都是 React 生态系统中的两个重要模块，但它们的用途和功能不同：

### 1. **`react-dom`**

`react-dom` 是 React 的核心库之一，负责将 React 组件渲染到 DOM（浏览器的文档对象模型）中。它提供了与浏览器环境的交互接口。

主要功能：

- **渲染组件**：`react-dom` 包含 `ReactDOM.render` 方法（在 React 18 中变为 `ReactDOM.createRoot`）用于将 React 组件渲染到浏览器的 DOM 中。
- **更新组件**：它还负责对比当前组件树与新的组件树，智能地更新 DOM，确保 UI 与状态保持同步。
- **浏览器相关的功能**：它还提供了与 DOM 相关的其他 API，比如 `ReactDOM.hydrate` 用于服务端渲染。

常用的 API：

```javascript
import ReactDOM from 'react-dom';

// 渲染 React 组件到指定的 DOM 节点
ReactDOM.render(<App />, document.getElementById('root'));
```

在 React 18 中，推荐使用 `createRoot` 来替代 `render`：

```javascript
import ReactDOM from 'react-dom/client';

// React 18 引入的 API，推荐用来渲染组件
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
```

### 2. **`react-dom/test-utils`**

`react-dom/test-utils` 是一个专门为测试 React 组件而设计的工具集，提供了多个帮助函数来模拟用户交互、触发事件以及测试组件的行为。

它是 React 测试中的一个重要工具，尤其用于测试中进行 DOM 操作和事件模拟。你可以用它来测试你的组件是否按预期行为工作。

常见功能：

- **模拟用户交互**：通过 `act` 等 API 模拟用户的交互操作（例如点击、输入文本等）。
- **查找元素**：可以查找组件内部的元素，并进行断言。
- **触发事件**：模拟 DOM 事件（如 `click`, `change` 等）来测试组件的响应。

常用的 API：

```javascript
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import MyComponent from './MyComponent';

let container = null;

beforeEach(() => {
  // 设置 DOM 元素作为测试容器
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // 清理 DOM
  unmountComponentAtNode(container);
});

it('should increment counter on button click', () => {
  act(() => {
    render(<MyComponent />, container);
  });

  // 通过 act 包裹异步代码来确保渲染完成
  const button = container.querySelector('button');
  act(() => {
    button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });

  // 检查组件是否按照预期更新
  expect(container.textContent).toBe('Counter: 1');
});
```

### 总结：

- `react-dom` 是 React 中用于与浏览器 DOM 进行交互的核心库，提供渲染组件等功能。
- `react-dom/test-utils` 是一个专门为测试 React 组件提供的工具集，帮助模拟用户交互和事件，测试组件行为。

你通常会在开发应用时使用 `react-dom`，而在编写单元测试时使用 `react-dom/test-utils`。

# 3. peerDependencies

在 JavaScript 项目中，`peerDependencies` 是指库或工具包所依赖的另一个库，但这个库并不会被自动安装，而是要求使用该库的项目来自己安装它。这通常用于库之间的版本兼容性要求。

### 解释：

这段描述的意思是，**React Testing Library (RTL)** 这个库有以下几个依赖：

1. **`react`** — 需要安装 React 库。
2. **`react-dom`** — 需要安装 React DOM 库。
3. **`@testing-library/dom`** — 从 RTL 版本 16 开始，除了 `react` 和 `react-dom`，还需要安装这个库。

换句话说，当你使用 **React Testing Library** 时，项目中必须已经安装了这些依赖，尤其是 `react` 和 `react-dom`，而从 RTL 版本 16 开始，还需要安装 `@testing-library/dom`。

### 例子：

假设你正在使用 React 和 React Testing Library 进行开发，在安装 React Testing Library 时，RTL 会在其文档中说明哪些库是 `peerDependencies`，你需要手动确保这些库版本兼容并一起安装。如果你不安装这些库，项目可能会出现问题。

# 4. @testing-library/jest-dom

让我更详细地解释一下：

`@testing-library/jest-dom` 是一个 Jest 的扩展库，它为 Jest 提供了一些自定义的匹配器（matchers），这些匹配器让你在编写测试时能使用更加语义化、易读的断言。

### 解释：

在使用 Jest 进行测试时，你可以使用默认的匹配器（比如 `toBe()`、`toEqual()` 等）来进行断言。然而，这些默认的匹配器有时不够直观，尤其是在测试 DOM 元素时。

**`@testing-library/jest-dom`** 提供了一些专门为测试 DOM 元素而设计的匹配器。比如：

- `toBeInTheDocument()` — 判断元素是否出现在文档中。
- `toHaveTextContent()` — 判断元素的文本内容是否符合预期。
- `toHaveAttribute()` — 判断元素是否拥有某个属性。

### 举个例子：

假设你正在测试一个按钮是否存在，并且它的文本内容是 "Click Me"。

如果你使用默认的 Jest 匹配器，你的断言可能是这样的：

```js
expect(button).toBeDefined();
expect(button.textContent).toBe('Click Me');
```

如果你安装了 `@testing-library/jest-dom`，你就可以使用更直观的匹配器：

```js
import '@testing-library/jest-dom'; // 引入 jest-dom

expect(button).toBeInTheDocument(); // 判断元素是否在文档中
expect(button).toHaveTextContent('Click Me'); // 判断文本内容
```

### 总结：

- **`@testing-library/jest-dom`** 提供了更多语义化的 DOM 测试匹配器。
- 安装它后，你可以写出更加简洁和易读的断言。

所以，**"你可能还会对安装 `@testing-library/jest-dom` 感兴趣"** 这句话的意思是，如果你希望在测试中使用这些更易读的匹配器，可以考虑安装这个库。