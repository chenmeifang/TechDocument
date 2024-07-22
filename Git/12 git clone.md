`git clone` 命令用于从远程仓库克隆一个新的 Git 仓库。它的基本语法如下：

```bash
git clone [options] <repository> [<directory>]
```

其中，`<repository>` 是远程仓库的地址，而 `<directory>` 是你希望将仓库克隆到的本地目录（如果省略，将使用默认名称，即仓库的名称）。

### 常用参数

1. **`<repository>`**: 
   - 远程仓库的 URL。例如：`https://github.com/username/repo.git`、`git@github.com:username/repo.git`、`file:///path/to/repo`。

2. **`<directory>`**:
   - 可选参数。如果省略，将使用默认名称，即从仓库 URL 中提取的最后部分（通常是仓库名称）。

3. **`--branch` 或 `-b`**:
   - 用于指定要克隆的分支。例如：`--branch develop` 或 `-b develop`。如果不指定，将克隆默认分支（通常是 `main` 或 `master`）。

   ```bash
   git clone -b develop https://github.com/username/repo.git
   ```

4. **`--depth <depth>`**:
   - 用于进行浅克隆，只克隆最近的 `<depth>` 次提交。例如：`--depth 1` 只克隆最新的提交。适用于需要快速获取最近状态而不需要历史记录的情况。

   ```bash
   git clone --depth 1 https://github.com/username/repo.git
   ```

5. **`--single-branch`**:
   - 只克隆指定的分支，不克隆所有的分支。

   ```bash
   git clone --branch develop --single-branch https://github.com/username/repo.git
   ```

6. **`--recurse-submodules`**:
   - 克隆子模块。如果仓库包含子模块，使用此选项可以同时克隆子模块。

   ```bash
   git clone --recurse-submodules https://github.com/username/repo.git
   ```

7. **`--config <key>=<value>`**:
   - 在克隆时设置配置项。例如：`--config user.name="Your Name"`。

   ```bash
   git clone --config user.name="Your Name" https://github.com/username/repo.git
   ```

8. **`--mirror`**:
   - 克隆一个镜像，包含所有分支、标签和历史记录。这个选项适用于需要完整的仓库副本时。

   ```bash
   git clone --mirror https://github.com/username/repo.git
   ```

### 示例

1. 克隆一个仓库到当前目录：

   ```bash
   git clone https://github.com/username/repo.git
   ```

2. 克隆到指定目录，并克隆 `develop` 分支：

   ```bash
   git clone -b develop https://github.com/username/repo.git my-directory
   ```

3. 进行浅克隆，只克隆最近的 5 次提交：

   ```bash
   git clone --depth 5 https://github.com/username/repo.git
   ```

这些选项可以根据需求组合使用，以满足不同的克隆需求。