# 1. 获取输入的文字

```html
<iframe class="inputWrapper" id="inputWrapperFrame" onload="__onLoad()" title="input wrapper" style="position: absolute; border: 0 none; outline-style: none; z-index: 100; overflow: hidden; width: 1000px; height: 50px; right: 10000px; top:-10000px;"></iframe> 
```

为什么这个iframe都偏离页面的可视区域了，但是给其子节点绑定监听事件textInput后，在页面可视区域输入文字，textInput事件居然能被触发，为什么？？？

这个现象可以通过浏览器事件机制和 `iframe` 的行为来解释。以下是详细的原因分析：

------

### 1. **`iframe` 的位置不会影响其内容的事件监听**

- 虽然 `iframe` 的 `style` 属性通过 `top` 和 `right` 将其移出了页面的可视区域，但 `iframe` 的内容仍然是加载在文档树中的一部分，且其子节点（例如表单控件或 `contentEditable` 的元素）可以独立接收用户输入事件。
- 只要用户的输入操作影响了 `iframe` 中的内容，例如通过键盘或脚本修改，绑定在 `iframe` 内部元素上的事件就可以被触发。

------

### 2. **用户输入的文字可能是通过焦点引导到 `iframe` 中的子元素**

即使 `iframe` 偏移到了不可见区域：

- 如果某种机制（例如脚本或其他逻辑）将焦点强制引导到 `iframe` 的子节点（例如一个 `input` 或 `div[contenteditable]`），用户的输入仍然会被重定向到 `iframe` 的子节点中。
- 常见的重定向方式：
  - 使用 JavaScript 的 `focus()` 方法。
  - 用户意外通过键盘导航（例如按下 `Tab` 键）激活了 `iframe` 中的子元素。

------

### 3. **`iframe` 的内容在逻辑上仍然属于同一个文档**

- 浏览器事件模型并不依赖元素是否在可视区域。只要事件的目标节点是可以响应用户交互的（即 `input`、`textarea`、`contenteditable` 等），事件监听器都可以捕获到相应的事件。
- 偏移位置只影响是否能用鼠标直接操作元素，但键盘输入、脚本触发的事件都不受偏移的影响。

------

### 4. **`textInput` 事件被触发的条件**

- `textInput` 事件触发的条件是：用户通过键盘或输入法向可编辑的 HTML 元素（如 `contentEditable` 元素、`input` 或 `textarea`）输入数据。
- 如果输入焦点在 `iframe` 的子节点上，即使 `iframe` 不可见，`textInput` 事件依然会按照规范被触发。

------

### 5. **可能的代码行为分析**

如果你的页面中同时有：

1. 可编辑的区域或表单控件在 `iframe` 内。
2. `iframe` 的内容通过 JavaScript 或用户操作得到了输入焦点。

这时用户的键盘输入将被路由到 `iframe` 的可编辑区域，并触发其上的 `textInput` 事件。

------

### 验证和排查方法

1. 确认焦点是否在 `iframe` 中的子节点上：
   - 打印 `document.activeElement` 看看是否是 `iframe` 或其内容中的元素。
2. 检查脚本中是否有代码主动将焦点移动到 `iframe` 内：
   - 搜索 `focus()` 方法或相关的焦点操作逻辑。
3. 观察用户交互路径：
   - 检查用户在操作过程中是否通过键盘导航意外地切换了焦点。

------

### 解决方案（如果你希望禁止这种行为）

1. **彻底移除 `iframe` 的焦点能力：**

   - 设置 

     ```
     tabindex="-1"
     ```

      禁止 

     ```
     iframe
     ```

      响应键盘导航：

     ```html
     <iframe class="inputWrapper" tabindex="-1"></iframe>
     ```

   - 禁用 

     ```
     iframe
     ```

      的交互能力（如果不需要它监听用户输入）：

     ```html
     <iframe class="inputWrapper" style="pointer-events: none;"></iframe>
     ```

2. **在脚本中明确控制焦点：**

   - 如果不希望焦点进入 `iframe`，在 `document.activeElement` 是 `iframe` 时强制切换回主文档的其他元素。

3. **取消绑定事件：**

   - 如果你确定 `textInput` 事件的绑定行为不符合预期，可以移除绑定，或通过条件逻辑约束它