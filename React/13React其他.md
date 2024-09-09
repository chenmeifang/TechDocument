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