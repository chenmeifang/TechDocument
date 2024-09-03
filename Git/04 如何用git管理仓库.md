https://www.bilibili.com/video/BV1mP4y1L7eR/?spm_id_from=333.999.0.0&vd_source=a7089a0e007e4167b4a61ef53acc6f7e

如何去做Git子仓库的管理

# git submodule

`git submodule` 是 Git 提供的一种功能，允许你在一个 Git 仓库（称为父仓库）中包含另一个 Git 仓库（称为子模块）。这对于管理依赖性、共享代码库、或者将大型项目分成多个独立的代码库非常有用。

### 基本概念

- **父仓库**：主要的 Git 仓库，包含子模块的引用。
- **子模块**：被包含在父仓库中的另一个 Git 仓库。子模块有独立的历史记录和提交。

### 基本使用流程

#### 1. 添加子模块

你可以将一个现有的 Git 仓库作为子模块添加到当前的 Git 仓库中：

```bash
git submodule add <repository-url> <path>
```

- `<repository-url>`：子模块仓库的 URL。
- `<path>`：子模块在父仓库中的保存路径。

例如：

```bash
git submodule add https://github.com/example/example-submodule.git submodule-directory
```

#### 2. 初始化和更新子模块

如果你克隆了一个包含子模块的仓库，你需要初始化并更新这些子模块：

```bash
git submodule init
git submodule update
```

- `git submodule init`：将子模块的配置信息从 `.gitmodules` 文件复制到本地的 Git 配置中。
- `git submodule update`：从远程获取子模块的代码并检出。

你也可以使用以下命令一步完成初始化和更新：

```bash
git submodule update --init --recursive
```

- `--recursive`：如果子模块本身也有子模块，则递归更新。

#### 3. 克隆包含子模块的仓库

当你克隆一个包含子模块的仓库时，需要使用 `--recurse-submodules` 参数来自动初始化和更新所有子模块：

```bash
git clone --recurse-submodules <repository-url>
```

如果你已经克隆了仓库但没有子模块，你可以手动初始化和更新子模块：

```bash
git submodule update --init --recursive
```

#### 4. 更新子模块

如果你想更新子模块到最新的提交，可以使用以下命令：

```bash
git submodule update --remote
```

这会将子模块更新到它们的远程仓库的最新提交。

#### 5. 提交子模块的更改

如果你在子模块中进行了更改，并且希望在父仓库中记录这些更改，你需要：

1. **进入子模块目录**，然后添加并提交更改：

   ```bash
   cd submodule-directory
   git add .
   git commit -m "Updated submodule"
   ```

2. **回到父仓库目录**，添加子模块的更新：

   ```bash
   cd ..
   git add submodule-directory
   git commit -m "Updated submodule reference"
   ```

#### 6. 删除子模块

删除子模块涉及几个步骤：

1. **删除子模块的相关条目**：

   ```bash
   git submodule deinit -f -- <path-to-submodule>
   git rm -f <path-to-submodule>
   rm -rf .git/modules/<path-to-submodule>
   ```

2. **手动移除 `.gitmodules` 文件中的相关条目**：

   打开 `.gitmodules` 文件，删除与子模块相关的配置。

### 常见问题

- **子模块的锁定版本**：子模块引用的是一个特定的提交，而不是分支的最新状态。当你更新子模块时，必须手动指定想要的提交或使用 `--remote` 来拉取最新提交。
  
- **子模块的独立性**：子模块有自己的独立版本控制，你可以在不影响父仓库的情况下更新和提交子模块的代码。

### 总结

Git 的子模块功能是管理复杂项目和代码依赖的强大工具，但它也引入了一定的复杂性。理解和正确使用子模块可以让你在管理大型项目时更加灵活和高效。

# git repo

# 如何拆分一个已有的仓库

