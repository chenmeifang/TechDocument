# [1. Jest在react项目中的使用](https://jestjs.io/zh-Hans/docs/getting-started)

**Jest** 是一个由 Facebook 开发的 JavaScript 测试框架，专门为 React 项目优化，但也可以用于测试任何 JavaScript 应用程序。它的特点包括：

- **零配置**：开箱即用，无需复杂的配置。
- **快照测试**：自动生成和验证组件输出的快照。
- **内置模拟**：内置 Mock 功能，支持模拟模块、函数和定时器。
- **异步测试支持**：非常方便地处理异步代码测试。
- **性能优化**：支持并行执行测试，并能智能地找到受影响的测试，提高执行速度。

### **Jest 的主要功能**
1. **断言和匹配器**：用于验证代码的行为，类似于 Jasmine 提供的断言。
2. **Mocking（模拟）**：可以模拟函数调用、模块以及定时器等。
3. **快照测试**：对组件的输出进行快照保存，比较之后的输出与快照是否一致。
4. **覆盖率报告**：可以生成代码测试覆盖率报告，确保关键代码路径被测试到。

### **React 项目中使用 Jest 的步骤**

1. **安装 Jest**

   React 项目通常已经包含 Jest（如果是使用 Create React App 初始化的项目）。如果你的项目没有 Jest，可以安装：
   ```bash
   npm install --save-dev jest
   ```

   如果你使用 TypeScript 或 Babel 进行转译，可以安装这些额外的依赖：
   ```bash
   npm install --save-dev babel-jest @babel/preset-env @babel/preset-react
   ```

2. **配置 Jest（可选）**

   创建 `jest.config.js` 文件，可以在其中配置 Jest 的选项。默认情况下，Jest 会自动找到 `src` 目录下的测试文件（以 `.test.js` 或 `.spec.js` 结尾），并执行它们。

   示例 `jest.config.js`：
   ```javascript
   module.exports = {
     setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
     testEnvironment: 'jsdom',
     transform: {
       '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
     },
     moduleNameMapper: {
       '\\.(css|less)$': 'identity-obj-proxy',
     },
   };
   ```

3. **编写 React 测试**

   例如，有一个简单的 React 组件 `Button.js`：

   ```javascript
   import React from 'react';

   const Button = ({ onClick, label }) => (
     <button onClick={onClick}>
       {label}
     </button>
   );

   export default Button;
   ```

   可以为这个组件编写测试文件 `Button.test.js`，使用 Jest 和 React Testing Library：
   
   ```bash
   npm install --save-dev @testing-library/react @testing-library/jest-dom
   ```

   ```javascript
   import React from 'react';
   import { render, fireEvent } from '@testing-library/react';
   import '@testing-library/jest-dom/extend-expect';
   import Button from './Button';

   test('it renders with the correct label', () => {
     const { getByText } = render(<Button label="Click me" />);
     expect(getByText('Click me')).toBeInTheDocument();
   });

   test('it calls onClick when clicked', () => {
     const handleClick = jest.fn();
     const { getByText } = render(<Button label="Click me" onClick={handleClick} />);
     fireEvent.click(getByText('Click me'));
     expect(handleClick).toHaveBeenCalled();
   });
   ```

   - **`render`**：渲染 React 组件并返回测试工具。
   - **`fireEvent`**：模拟 DOM 事件（如按钮点击）。
   - **`jest.fn()`**：创建一个 Jest 模拟函数，用于验证 `onClick` 回调是否被调用。
   - **`expect`**：Jest 的断言方法，结合 `@testing-library/jest-dom` 提供的匹配器，如 `toBeInTheDocument`。

4. **运行测试**

   运行测试可以直接使用 npm 脚本，通常 `package.json` 中已经有了 `test` 脚本：
   ```bash
   npm test
   ```

   这会自动运行所有测试文件。Jest 会监控文件变化并重新运行相关测试。

5. **快照测试**

   Jest 的快照测试功能用于验证 React 组件的输出。假设你有一个 `Header` 组件：
   ```javascript
   import React from 'react';

   const Header = () => <h1>Welcome to the App</h1>;

   export default Header;
   ```

   为其编写快照测试：
   ```javascript
   import React from 'react';
   import { render } from '@testing-library/react';
   import Header from './Header';

   test('it matches the snapshot', () => {
     const { container } = render(<Header />);
     expect(container).toMatchSnapshot();
   });
   ```

   初次运行时，Jest 会生成一个快照文件（通常位于 `__snapshots__` 文件夹中）。之后每次测试都会比较组件输出与快照，如果不同，测试将失败。

6. **测试覆盖率**

   Jest 提供了生成测试覆盖率报告的功能，使用 `--coverage` 参数运行测试：
   ```bash
   npm test -- --coverage
   ```

   这将生成 HTML 格式的覆盖率报告，展示代码中哪些部分没有被测试到。

### **Jest 在 React 中的优势**
- **与 React 测试工具深度集成**：React Testing Library 是官方推荐的工具，与 Jest 结合能够高效进行组件测试。
- **快照测试**：特别适合 React 的组件输出验证，可以轻松比较组件渲染的变化。
- **Mock 功能**：内置 Mock 功能，适合测试组件之间的依赖和交互。
- **异步代码支持**：非常容易测试异步行为，支持 `async/await` 和 Promises。

### **总结**
Jest 是 React 项目中的主流测试框架，其优点包括易于配置、快照测试和模拟功能。结合 React Testing Library，Jest 可以让你编写出强大而高效的单元测试，确保组件在开发和修改过程中保持预期行为。

# [1. 认识前端自动化测试和课程介绍](https://www.bilibili.com/video/BV1yA411b7EV/?spm_id_from=333.337.search-card.all.click&vd_source=a7089a0e007e4167b4a61ef53acc6f7e)

# [2. Jest简介和基本环境搭建](https://www.bilibili.com/video/BV1yA411b7EV/?p=2&spm_id_from=pageDriver&vd_source=a7089a0e007e4167b4a61ef53acc6f7e)

# [3. Jest敲个简单实例](https://www.bilibili.com/video/BV1yA411b7EV/?p=3&spm_id_from=pageDriver&vd_source=a7089a0e007e4167b4a61ef53acc6f7e)

```js
test('Jest-TypeScript demo case', () => {
  expect(1 + 1).toBe(2);
});
```

# [4. 基本配置和测试覆盖率生成](https://www.bilibili.com/video/BV1yA411b7EV/?p=4&spm_id_from=pageDriver&vd_source=a7089a0e007e4167b4a61ef53acc6f7e)

```
 npx jest --coverage
```

会生成一个网页版的测试覆盖率报告



单元测试和集成测试的区别：

**单元测试**和**集成测试**是两种常见的测试类型，主要区别在于它们测试的范围、目的以及测试的对象。

### 1. 单元测试 (Unit Testing)

**定义**：单元测试是针对应用程序中最小的功能单元（通常是一个函数、方法或类）的测试。它的主要目的是确保每个独立的单元按照预期工作。

#### 特点：
- **测试范围小**：单元测试只测试一个功能或方法，关注其逻辑的正确性。
- **测试对象独立**：每个单元测试通常是独立的，不依赖其他部分。通过模拟（mock）依赖项，如数据库、外部 API 或其他模块，来确保测试的隔离性。
- **速度快**：因为单元测试只验证单个功能单元，并且不涉及外部资源（如数据库、文件系统等），所以执行速度非常快。
- **开发频率高**：单元测试通常由开发者编写，并在开发的过程中频繁执行，确保代码的稳定性。
- **示例**：在一个 JavaScript/TypeScript 项目中，单元测试可能会验证单个函数是否返回正确的结果，例如：

  ```javascript
  function add(a, b) {
    return a + b;
  }
  
  test('adds 1 + 2 to equal 3', () => {
    expect(add(1, 2)).toBe(3);
  });
  ```

#### 适用场景：
- 验证个别函数、方法、类的行为。
- 测试逻辑复杂的算法、数学运算等。
- 确保在不依赖外部服务的情况下，模块内部的行为是正确的。

### 2. 集成测试 (Integration Testing)

**定义**：集成测试是验证不同模块或组件之间的交互是否按照预期工作。它的主要目的是确保各个模块或子系统之间的接口和交互正确。

#### 特点：
- **测试范围较大**：集成测试关注多个模块或子系统之间的交互，而不仅仅是单个功能。
- **测试对象之间有依赖**：集成测试通常涉及到多个组件，它们可能依赖外部服务或资源，比如数据库、网络服务、文件系统等。可能需要使用真实的或模拟的环境来测试它们的交互。
- **速度相对慢**：因为集成测试通常涉及多个模块和外部依赖，执行时间相对较长。
- **主要由测试团队编写**：集成测试通常由测试工程师或 QA 团队编写，目的是在代码集成之后验证系统的行为。
- **示例**：在一个包含多个服务的系统中，集成测试可能会测试服务 A 调用服务 B 并返回正确的结果：

  ```javascript
  // 假设我们有两个服务，分别是 getUser 和 getOrders
  async function getUserOrders(userId) {
    const user = await getUser(userId);
    const orders = await getOrders(userId);
    return {
      user,
      orders
    };
  }
  
  test('should return user and orders', async () => {
    const result = await getUserOrders(1);
    expect(result.user.name).toBe('John Doe');
    expect(result.orders.length).toBe(5);
  });
  ```

#### 适用场景：
- 测试模块之间的交互，比如服务间调用、依赖数据库的逻辑。
- 验证系统中多个子系统的集成效果。
- 测试实际环境中可能出现的外部依赖（如 API、数据库、文件系统等）。

### 主要区别：

| 特性             | 单元测试 (Unit Testing)                | 集成测试 (Integration Testing)                 |
| ---------------- | -------------------------------------- | ---------------------------------------------- |
| **测试范围**     | 单个模块或功能单元（函数、方法、类）   | 多个模块或组件之间的交互                       |
| **关注点**       | 功能单元的逻辑正确性                   | 模块/组件间的接口、交互和依赖的正确性          |
| **测试对象**     | 独立的代码单元，不依赖其他模块         | 有依赖的多个模块或外部系统（如数据库、API 等） |
| **依赖模拟**     | 经常通过 Mock 对外部依赖进行模拟       | 可能需要部分使用真实环境或使用复杂的模拟       |
| **执行速度**     | 非常快                                 | 相对较慢                                       |
| **编写者**       | 通常由开发者编写                       | 通常由测试工程师或开发者编写                   |
| **失败时的定位** | 容易定位问题，因为测试的是单个功能单元 | 比较难定位问题，因为涉及多个模块或外部依赖     |
| **测试频率**     | 开发过程中经常执行，开发者可以频繁运行 | 通常在集成阶段执行，执行频率相对较低           |

### 总结

- **单元测试**：用于验证每个代码单元的功能是否正确，通常是无依赖的、快速执行的测试，帮助开发者确保模块的正确性。
- **集成测试**：用于验证多个模块或组件之间的交互，确保它们在集成时能够协同工作，通常涉及外部依赖或多个模块之间的真实交互。

在一个完整的测试策略中，单元测试和集成测试通常相辅相成，共同确保代码和系统的质量。

# [5. Jest中的匹配器-上](https://www.bilibili.com/video/BV1yA411b7EV?p=5&vd_source=a7089a0e007e4167b4a61ef53acc6f7e)

toBe

toEqual

toBeNull

toBeUndefined

toBeDefined

toBeTruthy

toBeFalsy

# [6. Jest中的匹配器-中](https://www.bilibili.com/video/BV1yA411b7EV?p=6&spm_id_from=pageDriver&vd_source=a7089a0e007e4167b4a61ef53acc6f7e)

```
jest --watchAll
```

toBeGreaterThan

toBeLessThan

toBeGreaterThanOrEqual

toBeLessThanOrEqual

toBeCloseTo

# [7. Jest中的匹配器-下](https://www.bilibili.com/video/BV1yA411b7EV/?p=7&spm_id_from=pageDriver&vd_source=a7089a0e007e4167b4a61ef53acc6f7e)

toMatch

toContain

toThrow

<img src="03 Jest视频学习.assets/image-20241021233120220.png" alt="image-20241021233120220" style="zoom:50%;" />

# [8. 让Jest支持import和ES6语法](https://www.bilibili.com/video/BV1yA411b7EV?spm_id_from=333.788.player.switch&vd_source=a7089a0e007e4167b4a61ef53acc6f7e&p=8)

直接用好像也没什么问题

# [9. 异步代码测试方法-1回调函数式](https://www.bilibili.com/video/BV1yA411b7EV?spm_id_from=333.788.player.switch&vd_source=a7089a0e007e4167b4a61ef53acc6f7e&p=9)

报错信息：

```bash
 PASS  test/sum.test.js      
(node:20924) [DEP0066] DeprecationWarning: OutgoingMessage.prototype._headers is deprecated
(Use `node --trace-deprecation ...` to show where the warning was created)
 FAIL  test/fetchData.test.js      
  ● Test suite failed to run

    TypeError: Converting circular structure to JSON
        --> starting at object with constructor 'ClientRequest'
        |     property 'socket' -> object with constructor 'TLSSocket'
        --- property '_httpMessage' closes the circle
        at stringify (<anonymous>)

      at messageParent (node_modules/jest-runner/node_modules/jest-worker/build/workers/messageParent.js:29:19)9:19)

Test Suites: 1 failed, 1 passed, 2 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        6.534 s
Ran all test suites.
```

# 10. 异步代码测试方法-2直接返回promise

# 11. 异步代码测试方法-3接口不存在测试用例编写

# 12. 异步代码测试方法-3async...await

# 13. Jest中的四个钩子函数

# 14. Jest中对测试用例的分组

# 15. Jest中钩子函数的作用域三规则

































