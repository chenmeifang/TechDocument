 https://juejin.cn/post/7033688858134839309

`git stash` 命令的作用是将当前的工作目录和暂存区的改动保存到一个临时栈中，并恢复工作目录和暂存区到最近一次提交的干净状态。这使得你可以在不提交当前工作的情况下切换到其他分支或执行其他操作。

### 1. **git stash 的原理**

#### 1.1 **保存当前改动**

- 当你运行 `git stash` 时，Git 会将当前工作目录中的未提交改动（包括暂存区和未暂存的改动）打包成一个存档，并存储在一个称为 "stash" 的栈结构中。
- 每个 `stash` 是一个独立的记录，包含了被保存的改动、当时的分支信息，以及被保存的文件快照。

#### 1.2 **栈的概念**

- **栈结构**：Git 使用栈（LIFO，后进先出）的方式来管理多个 `stash`。每次 `git stash` 都会把改动推入栈顶，而 `git stash pop` 会从栈顶弹出最近的改动并应用到工作目录中。
- **索引**：每个 `stash` 都有一个唯一的索引标识，如 `stash@{0}` 表示最近一次的 `stash`，`stash@{1}` 表示前一次的 `stash`。

#### 1.3 **stash 的内部实现**

- **三棵树**：`git stash` 实际上创建了一个提交对象（commit）和一个 `index` 文件。这个提交对象保存了当前分支的状态，以及未暂存文件的内容。
  - **Commit 树**：存储了当前工作目录的快照。
  - **Index 树**：存储了暂存区的快照。
  - **Untracked 树**（可选）：如果指定 `git stash -u` 或 `git stash --include-untracked`，还会包含未追踪的文件。

- **特殊的引用**：Git 将这两个快照存储在一个特殊的引用（ref）中，这个引用指向一个由 `stash` 命令创建的隐藏提交，存储在 `.git/refs/stash` 中。

#### 1.4 **恢复改动**

- **git stash apply**：应用栈顶的 `stash`，但不删除该 `stash`。它会将 `stash` 中保存的改动重新应用到当前的工作目录。
- **git stash pop**：应用栈顶的 `stash`，并从栈中删除该 `stash`。操作完成后，工作目录将恢复到 `stash` 的状态，栈顶的 `stash` 被移除。

#### 1.5 **清理 stash**

- **git stash drop**：删除指定的 `stash`，但不影响工作目录或其他 `stash`。
- **git stash clear**：删除所有的 `stash`，清空栈结构。

### 2. **git stash 命令常见用法及其效果**

```bash
# 保存当前工作目录和暂存区的改动到栈中
git stash

# 恢复最近一次的stash，但保留该stash记录
git stash apply

# 恢复最近一次的stash，并删除该stash记录
git stash pop

# 查看所有保存的stash记录
git stash list

# 删除指定的stash记录（如 stash@{0}）
git stash drop stash@{0}

# 清空所有stash记录
git stash clear
```

### 3. **总结**

`git stash` 是一个非常有用的命令，允许你在不提交当前改动的情况下临时保存工作状态，以便在需要时恢复。其实现基于 Git 的三棵树模型，并使用栈结构来管理多个 `stash`。理解 `git stash` 的内部工作原理有助于你在复杂的开发场景中更有效地管理代码改动。