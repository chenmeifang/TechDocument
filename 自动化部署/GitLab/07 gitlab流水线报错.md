# 1. 报错

描述：cmf是Developer，chenmeifang是Owner，流水线在chenmeifang那里跑不会报错，在cmf这里跑会报错

```js
++ git -c 'http.userAgent=gitlab-runner 17.4.0 linux/amd64' fetch origin --no-recurse-submodules +refs/pipelines/51:refs/pipelines/51 +refs/heads/firstBranch:refs/remotes/origin/firstBranch --depth 20 --prune --quiet
remote: You are not allowed to download code from this project.
fatal: unable to access 'http://101.35.254.76:8989/tuanduione/zizuone/luoshu-server.git/': The requested URL returned error: 403
ERROR: Job failed: exit status 1
```

# 2. 流水线触发时机

由报错1引申出来的问题：开发人员提交代码到自己的远程仓库的时候需要触发流水线吗？还是说只有创建合并请求到远程中心仓库的时候需要触发流水线？

在开发人员提交代码到远程仓库时，是否需要触发流水线，取决于项目的**CI/CD 配置**和团队的**工作流程**。一般来说，有两种常见的触发流水线的场景：

### 1. **提交代码到自己远程仓库时触发流水线**
如果开发人员将代码提交到**自己负责的远程分支**（比如 feature 分支或个人的开发分支），流水线可以根据配置在每次提交时触发。这种方式可以帮助开发人员在每次提交后通过自动化测试和构建，确保代码没有问题。

- **适用场景**：
  - 每次提交代码后，自动触发流水线进行单元测试、静态代码检查、代码质量分析等操作。
  - 开发人员可以尽早发现问题，在提交合并请求前修复。
  
- **常见配置**：
  - 在 `.gitlab-ci.yml` 或其他 CI 配置文件中，通常会设置对特定分支（如 `feature/*`、`develop` 等）的提交触发流水线。
  - 也可以配置仅在特定条件下触发（如标记为 `[ci skip]` 的提交可以跳过流水线）。

- **优点**：
  - 提高代码质量，防止有问题的代码被合并到中心仓库。
  - **及时发现和解决问题，减少在创建合并请求时的冲突或失败**——之前工作中都是流水线在创建合并请求的时候失败，所以提交代码到自己远程仓库时应该没有触发流水线

### 2. **创建合并请求到远程中心仓库时触发流水线**（工作时实际使用）
在更严格的流程中，CI/CD 流水线只会在**合并请求（Merge Request / Pull Request）**时触发。这通常发生在开发人员将自己开发分支的代码合并到主分支或集成分支（如 `develop` 或 `master`）时。

- **适用场景**：
  - 只有在创建合并请求时，流水线才会运行一整套的测试、构建和部署流程。
  - 通常适用于代码审查（Code Review）之前或之后，以确保代码在合并到主要分支之前通过所有质量检查。
  
- **常见配置**：
  - 流水线配置文件（如 `.gitlab-ci.yml`、`.travis.yml` 等）通常设置在合并请求创建或更新时触发。
  - 可以针对 `merge` 操作进行测试，而不是每次提交都触发。

- **优点**：
  - 减少不必要的流水线执行，节省资源和时间。
  - 仅在代码准备好合并到主分支时，才进行详细的自动化检查。

### 3. **综合触发策略**
一些团队会采用**混合触发策略**，例如：
- 在开发人员提交代码到自己的分支时，触发**轻量级的流水线**，比如只运行单元测试或静态代码检查。
- 在创建合并请求时，触发**完整的流水线**，包括集成测试、构建和部署。

这种策略既可以让开发人员在本地提交时获得反馈，又能在合并到主要分支时保证质量。

### 结论
- **提交到个人远程仓库时是否触发流水线**取决于项目的 CI/CD 配置。在很多团队中，**提交代码到开发分支**时可以触发流水线，以便开发人员及时获取反馈。
- **创建合并请求到中心仓库时触发流水线**更为常见，用于在合并之前进行完整的质量检查

# 3. 避免每次提交代码都触发流水线，只在创建合并请求时触发

为了避免每次提交代码都触发 GitLab CI 流水线，只在创建合并请求时触发，你可以通过配置 `.gitlab-ci.yml` 文件中的 `only` 和 `rules` 来控制触发条件。以下是实现这一目标的步骤和示例。

### 方案 1：使用 `only` 指定触发条件

你可以通过 `only` 来控制流水线仅在创建合并请求时触发，而不是每次提交代码时触发。

```yaml
stages:
  - test
  - build
  - deploy

# 示例的测试作业，只在创建合并请求时触发
test_job:
  stage: test
  script:
    - echo "Running tests"
  only:
    - merge_requests  # 仅在创建合并请求时触发

# 示例的构建作业，只在创建合并请求时触发
build_job:
  stage: build
  script:
    - echo "Building the project"
  only:
    - merge_requests  # 仅在创建合并请求时触发

# 示例的部署作业，只在目标分支上执行
deploy_job:
  stage: deploy
  script:
    - echo "Deploying the project"
  only:
    - master  # 仅在合并到 master 分支时触发
```

#### 解释：
- `only: merge_requests`：表示该作业仅在合并请求（Merge Request）创建或更新时触发。
- `only: master`：表示该作业仅在代码被合并到 `master` 分支时触发。可以根据实际需求替换成其他分支名称。

### 方案 2：使用 `rules` 指定触发条件

从 GitLab 12.3 开始，GitLab 引入了 `rules` 语法，它比 `only` 更灵活。你可以使用 `rules` 更详细地控制流水线在何时触发。

```yaml
stages:
  - test
  - build
  - deploy

# 示例的测试作业，只在创建合并请求时触发
test_job:
  stage: test
  script:
    - echo "Running tests"
  rules:
    - if: $CI_MERGE_REQUEST_ID  # 仅在创建或更新合并请求时触发

# 示例的构建作业，只在创建合并请求时触发
build_job:
  stage: build
  script:
    - echo "Building the project"
  rules:
    - if: $CI_MERGE_REQUEST_ID  # 仅在创建或更新合并请求时触发

# 示例的部署作业，只在合并到主分支时触发
deploy_job:
  stage: deploy
  script:
    - echo "Deploying the project"
  rules:
    - if: $CI_COMMIT_BRANCH == "master"  # 仅在 master 分支上触发
```

#### 解释：
- `rules: - if: $CI_MERGE_REQUEST_ID`：表示这个作业只在合并请求创建或更新时触发，`$CI_MERGE_REQUEST_ID` 是一个 GitLab 内置的环境变量，当有合并请求时该变量会被设置。
- `rules: - if: $CI_COMMIT_BRANCH == "master"`：表示这个作业只在 `master` 分支上触发。

### 使用 `except` 或 `rules` 结合跳过某些分支

如果你不希望在某些特定分支上触发流水线，比如在开发者个人的 `feature/*` 分支上，可以通过 `except` 或 `rules` 结合跳过这些分支。

```yaml
stages:
  - test
  - build
  - deploy

test_job:
  stage: test
  script:
    - echo "Running tests"
  rules:
    - if: $CI_MERGE_REQUEST_ID  # 仅在合并请求时触发
    - if: $CI_COMMIT_BRANCH != "master" && $CI_COMMIT_BRANCH != "develop"  # 跳过开发分支

build_job:
  stage: build
  script:
    - echo "Building the project"
  rules:
    - if: $CI_MERGE_REQUEST_ID

deploy_job:
  stage: deploy
  script:
    - echo "Deploying the project"
  rules:
    - if: $CI_COMMIT_BRANCH == "master"
```

#### 解释：
- `rules: - if: $CI_COMMIT_BRANCH != "master" && $CI_COMMIT_BRANCH != "develop"`：表示流水线会跳过 `master` 和 `develop` 以外的其他分支。

### 总结
- 如果你只希望在创建合并请求时触发流水线，可以使用 `only: merge_requests` 或 `rules: - if: $CI_MERGE_REQUEST_ID`。
- 使用 `rules` 更灵活，可以基于不同条件控制作业的触发。
- 结合 `rules` 可以跳过某些特定分支的提交，进一步控制流水线触发条件。 

# 4. 在流水线中，确保**测试环境**和**生产环境**部署到两个不同的主机

在 GitLab CI/CD 流水线中，为了确保**测试环境**和**生产环境**部署到两个不同的主机，可以通过以下几个步骤来实现：

### 1. **定义不同的环境**
在 `.gitlab-ci.yml` 文件中，可以使用 `environment` 来定义**测试**和**生产**环境，分别部署到不同的服务器（主机）。

- **测试环境**：可以配置为一个特定的分支，如 `test` 分支，部署到测试服务器。
- **生产环境**：配置为 `main` 分支，部署到生产服务器。

### 2. **设置部署作业并使用不同的服务器**：
可以通过使用不同的 `SSH`、`Docker` 或 `Kubernetes` 配置文件，将不同的环境部署到不同的服务器。例如，使用 `SSH` 时，可以为不同的环境设置不同的主机名和 SSH 连接信息。

### 3. **使用 `environment` 和 `only`/`rules` 进行区分**：
使用 `only` 或 `rules` 来指定不同的部署条件，比如当 `test` 分支触发时部署到测试服务器，当 `main` 分支触发时部署到生产服务器。

#### 示例 `.gitlab-ci.yml`

```yaml
stages:
  - test
  - deploy

# 测试环境部署
deploy_to_test:
  stage: deploy
  script:
    - echo "Deploying to the test server..."
    - scp -r ./dist/* test_user@test_server:/path/to/deploy  # 通过 SSH 部署到测试服务器
  only:
    - test  # 只在 test 分支运行
  environment:
    name: test  # 环境命名为 test
    url: http://test.example.com  # 测试环境的 URL

# 生产环境部署
deploy_to_production:
  stage: deploy
  script:
    - echo "Deploying to the production server..."
    - scp -r ./dist/* prod_user@prod_server:/path/to/deploy  # 通过 SSH 部署到生产服务器
  only:
    - main  # 只在 main 分支运行
  environment:
    name: production  # 环境命名为 production
    url: http://www.example.com  # 生产环境的 URL
  when: manual  # 需要手动执行，防止意外的自动部署
```

### 4. **配置多主机部署**

在上面的例子中，不同的主机通过 `scp` 命令和 SSH 连接来部署代码。以下是两种常见的配置方法：

#### 1. **通过 SSH 部署到不同的主机**
- 在 GitLab Runner 中配置不同的 SSH 密钥，确保它可以访问到测试服务器和生产服务器。
- `test_user@test_server` 表示测试服务器的登录凭证和主机地址。
- `prod_user@prod_server` 表示生产服务器的登录凭证和主机地址。

#### 2. **通过 Docker 或 Kubernetes 部署**
如果使用 Docker 或 Kubernetes，可以为不同的环境配置不同的 `docker-compose` 文件或 Kubernetes 配置文件。

##### 示例：通过 Docker 部署到不同的主机

```yaml
deploy_to_test:
  stage: deploy
  script:
    - echo "Deploying to test using Docker..."
    - docker login -u $DOCKER_USER -p $DOCKER_PASSWORD test-registry.example.com
    - docker pull test-registry.example.com/test-image:latest
    - docker run -d -p 80:80 test-registry.example.com/test-image:latest
  only:
    - test

deploy_to_production:
  stage: deploy
  script:
    - echo "Deploying to production using Docker..."
    - docker login -u $DOCKER_USER -p $DOCKER_PASSWORD prod-registry.example.com
    - docker pull prod-registry.example.com/prod-image:latest
    - docker run -d -p 80:80 prod-registry.example.com/prod-image:latest
  only:
    - main
  when: manual
```

### 5. **环境变量配置**
为不同的环境设置不同的环境变量，比如 API 密钥、数据库配置等。可以在 GitLab CI/CD 的设置中，为不同的环境添加不同的变量。

#### 示例：通过环境变量区分不同的服务器
```yaml
deploy_to_test:
  stage: deploy
  script:
    - echo "Deploying to test..."
    - ssh $TEST_USER@$TEST_SERVER 'deploy script here'  # 通过环境变量部署到测试服务器
  only:
    - test
  environment:
    name: test

deploy_to_production:
  stage: deploy
  script:
    - echo "Deploying to production..."
    - ssh $PROD_USER@$PROD_SERVER 'deploy script here'  # 通过环境变量部署到生产服务器
  only:
    - main
  when: manual
  environment:
    name: production
```

### 总结

- **测试环境和生产环境**可以通过 `environment` 和 `only`/`rules` 来区分，分别在不同的服务器上部署。
- **部署脚本**可以使用 `SSH` 或 `Docker` 方式连接到不同的主机，确保代码分别部署到测试服务器和生产服务器。
- **环境变量配置**可以确保不同环境使用不同的配置信息，保证测试和生产环境的隔离。
- 对于生产环境，可以设置为 `manual` 手动触发，以防止误操作导致代码意外部署到生产服务器。

# 5. 云服务上和Gitlab流水线上的Node版本不一致

出现这种问题的原因可能是你的云服务器上和 GitLab CI/CD 流水线中使用了不同的 Node.js 版本管理工具或者环境配置。常见原因及解决方法如下：

### 1. **云服务器和 GitLab Runner 使用的 Node.js 版本不同**
   - 云服务器上通过 `nvm`、系统包管理器（如 `apt`）、或手动安装了 Node.js v20.9.0。
   - 但 GitLab Runner 使用的是 Node.js v16.20.2，可能因为：
     - `.gitlab-ci.yml` 文件中明确指定了 Node.js v16。
     - GitLab Runner 的 Docker 镜像或执行环境使用了旧的 Node.js 版本。
     - GitLab Runner 没有使用你在云服务器上安装的 Node.js 版本。

### 2. **如何解决**
   你可以通过以下几种方法来确保 GitLab 流水线和服务器使用相同的 Node.js 版本。

#### 方法一：修改 `.gitlab-ci.yml` 指定 Node.js 版本

确保在 `.gitlab-ci.yml` 文件中使用正确的 Node.js 版本。可以在 `before_script` 或 `script` 中明确安装或指定 Node.js 版本。例如：

```yaml
before_script:
  - 'nvm install 20.9.0'  # 使用 nvm 安装 Node.js 版本
  - 'nvm use 20.9.0'      # 切换到 Node.js 20.9.0
```

#### 方法二：更新 GitLab Runner 的 Node.js 版本

如果你没有使用 Docker 而是本地 GitLab Runner 环境，确保 Runner 环境的 Node.js 版本与服务器一致。可以通过 `nvm` 或重新安装合适的 Node.js 版本来更新：

```bash
nvm install 20.9.0
nvm use 20.9.0
```

# 6. 查看GitLab Runner上的Node版本

```bash
sudo -u gitlab-runner node -v
// 输出：v16.20.2
```

# 7. 云服务器和GitLab Runner的Node版本不一致

http://blog.404mzk.com/yun-wei/linux_quan_bu_yong_hu_an_zhuang_node.html

node -v和sudo -u gitlab-runner node -v输出的node版本不一致

在使用 GitLab Runner 的 Shell executor 时，如果你发现通过 `node -v` 和 `sudo -u gitlab-runner node -v` 输出的 Node.js 版本不一致，**通常是因为 `gitlab-runner` 用户的环境变量没有正确配置**。以下是解决这个问题的步骤：

### 1. 确保 `nvm` 在 `gitlab-runner` 用户中可用

如果你使用了 nvm 来安装 Node.js，**确保 `nvm` 的配置也对 `gitlab-runner` 用户可用!!!**。可以通过以下方式进行设置：

1. **为 `gitlab-runner` 用户设置环境变量**：
   在 `gitlab-runner` 用户的 shell 配置文件中（如 `~/.bashrc` 或 `~/.bash_profile`），添加以下内容：
   
   ```bash
   export NVM_DIR="$HOME/.nvm"
   [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # Load nvm
   ```
   
2. **在 `gitlab-runner` 用户的 CI/CD 脚本中加载 nvm**：
   在 `.gitlab-ci.yml` 中的 `before_script` 部分，确保加载 `nvm`：
   ```yaml
   before_script:
     - export NVM_DIR="$HOME/.nvm"
     - [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # Load nvm
     - nvm use 18  # 使用你需要的 Node.js 版本
   ```

### 2. 通过 `sudo` 启动 GitLab Runner

如果你仍然遇到版本不一致的问题，可以尝试通过 `sudo` 启动 GitLab Runner。这确保了 `gitlab-runner` 用户的环境变量被正确加载。你可以在命令行中执行以下命令：

```bash
sudo -u gitlab-runner -E node -v
```

`-E` 选项会确保环境变量被保留。

### 3. 直接在 CI/CD 中使用全局安装的 Node.js

如果你选择全局安装 Node.js（而不是使用 nvm），确保在 GitLab Runner 的 CI/CD 配置中直接指定 Node.js 的路径。可以通过以下方式检查 Node.js 的全局路径：

```bash
which node
```

然后在 `.gitlab-ci.yml` 中使用该路径：

```yaml
before_script:
  - export PATH="/usr/local/bin:$PATH"  # 替换为 Node.js 的实际安装路径
```

### 4. 确保 GitLab Runner 使用的用户

在 GitLab CI/CD 中，所有脚本都是以 `gitlab-runner` 用户身份运行的。因此，确保任何环境变量或安装都是针对这个用户的。如果你在其他用户下安装了 Node.js，可能会导致版本不一致。

### 总结

这些步骤应该有助于确保在 GitLab Runner 上使用一致的 Node.js 版本。如果你仍然面临问题，可能需要检查具体的 CI/CD 作业日志，以确定在哪里出现了不一致，并确保 `gitlab-runner` 用户的环境设置是正确的。

# 8. 怎么知道nvm的配置对哪些用户可用

要确认 `nvm` (Node Version Manager) 的配置对哪些用户可用，可以按照以下步骤检查和设置：

### 1. 确认 `nvm` 的安装位置

`nvm` 通常会安装在用户的主目录中。你可以通过以下命令查找 `nvm` 的安装路径：

```bash
echo $NVM_DIR
```

输出：`/home/ubuntu/.nvm`

`NVM_DIR`：这个环境变量通常用于指定 nvm（Node Version Manager）安装目录的路径。nvm通过这个变量来确定在哪里查找已安装的Node.js版本和相关的配置文件

`$NVM_DIR`：这是对环境变量 `NVM_DIR` 的引用。通过 `$` 符号，可以获取变量的值。

如果未设置，可以尝试以下默认路径：

```bash
echo "$HOME/.nvm"
```

### 2. 检查用户的 shell 配置文件

每个用户都有自己的 shell 配置文件，这些文件包含用户的环境变量和初始化脚本。通常情况下，`nvm` 的配置应该添加到以下文件之一：

- `~/.bashrc` (对于 bash 用户)
- `~/.bash_profile` (对于登录 bash 用户)
- `~/.zshrc` (对于 zsh 用户)

你可以查看这些文件，确认是否存在 `nvm` 的加载语句：

```bash
cat ~/.bashrc | grep nvm
cat ~/.bash_profile | grep nvm
cat ~/.zshrc | grep nvm
```

如果看到类似以下的内容，说明 `nvm` 的配置已经添加到该用户中：

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # Load nvm
```

### 3. 检查 `gitlab-runner` 用户的配置

如果 GitLab Runner 使用的是 `gitlab-runner` 用户，你需要确保 `nvm` 的配置对该用户有效：

1. **以 `gitlab-runner` 用户身份查看配置**：
   
   ```bash
   # 是一个用于在Linux系统中以特定用户身份启动新的shell会话的命令
   sudo -u gitlab-runner bash
   ```
   
2. **检查 `gitlab-runner` 用户的 shell 配置**：
   ```bash
   cat ~/.bashrc | grep nvm
   cat ~/.bash_profile | grep nvm
   cat ~/.zshrc | grep nvm
   ```

### 4. 全局安装（可选）

如果你希望 `nvm` 对所有用户可用，尽管 `nvm` 设计上是为单个用户安装的，你可以选择使用全局安装的 Node.js（而不是 `nvm`）。全局安装的 Node.js 通常会位于 `/usr/local/bin` 中，可以对所有用户可用。

### 5. 在 CI/CD 中使用 `nvm`

确保在 `.gitlab-ci.yml` 文件中加载 `nvm`，以便在每次 CI/CD 运行时都能使用正确的 Node.js 版本。例如：

```yaml
before_script:
  - export NVM_DIR="$HOME/.nvm"
  - [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # Load nvm
  - nvm install 18  # 安装所需的 Node.js 版本
  - nvm use 18  # 使用所需的 Node.js 版本
```

### 总结

`nvm` 的配置是特定于用户的，因此你需要确保每个需要使用 `nvm` 的用户都在其配置文件中正确设置。如果要在 GitLab Runner 上使用 `nvm`，确保 `gitlab-runner` 用户的配置正确。如果仍有问题，考虑使用全局安装的 Node.js 或在 CI/CD 脚本中显式加载 `nvm`。

# 9. 修改 GitLab Runner中的Node版本

云服务器上安装了nvm管理node版本，云服务器的GitlabRunner用户还需要也安装nvm管理node版本吗？目前两个地方的node版本不一致

在云服务器上安装 nvm 管理 Node.js 版本后，GitLab Runner 用户是否需要单独安装 nvm 取决于你的需求和使用场景。以下是一些考虑因素：

### 1. **使用 GitLab Runner 用户的环境**

- **单独安装 nvm**：如果你希望 GitLab Runner 用户能够独立管理 Node.js 版本，或者需要在 CI/CD 作业中使用不同的 Node.js 版本，建议在 GitLab Runner 用户的环境中也安装 nvm。这样，你可以通过 `nvm` 切换到所需的 Node.js 版本。

- **共用安装**：如果 GitLab Runner 用户可以访问主用户的环境，并且不需要特定的 Node.js 版本，那么可以不单独安装 nvm。不过，你需要确保环境变量（如 `NVM_DIR`）正确设置，以便 GitLab Runner 用户可以使用主用户安装的 nvm。

### 2. **确保环境一致性**

- **设置环境变量**：如果选择共用安装，确保在 GitLab Runner 用户的 shell 环境中设置 `NVM_DIR` 和加载 nvm 的相关命令。例如，可以在 GitLab Runner 用户的 `~/.bashrc` 或 `~/.bash_profile` 中添加：

  ```bash
  export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # Load nvm
  ```

- **使用特定 Node.js 版本**：在 `.gitlab-ci.yml` 中使用 `nvm` 进行 Node.js 版本管理，以确保在 CI/CD 作业中使用一致的版本：

  ```yaml
  before_script:
    - export NVM_DIR="$HOME/.nvm"
    - [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # Load nvm
    - nvm install 18  # 安装并使用特定版本
    - nvm use 18
  ```

### 3. **检查和确认**

- 在 CI/CD 作业中，可以使用 `node -v` 和 `npm -v` 来确认当前使用的 Node.js 版本，确保其与预期版本一致。

### 总结

如果你希望 GitLab Runner 用户能够独立使用不同版本的 Node.js，建议在该用户下单独安装 nvm。如果希望共用主用户的安装，确保设置好相关的环境变量，使 GitLab Runner 用户能够访问 nvm。这样，你可以在 CI/CD 流水线中确保 Node.js 版本的一致性。

# 10. ~/.bashrc和 ~/.bash_profile

### **`~/.bashrc` 和 `~/.bash_profile` 是什么文件？**

这两个文件都是用户的 shell 配置文件，通常用于设置环境变量和自定义 shell 行为。具体作用如下：

- **`~/.bashrc`**：
  - 这是 `bash` shell 的配置文件，主要用于非登录 shell（如在终端中打开新窗口时）。
  - 它会在每次用户打开一个新的 shell 会话（如终端窗口）时自动加载，可以在其中定义别名、环境变量、加载自定义脚本等。
  
- **`~/.bash_profile`**：
  - 这个文件在登录 shell 会话（如通过 SSH 登录）时自动加载，主要用于设置登录环境的变量和行为。
  - 通常用来设置 PATH、加载其他配置文件（如 `~/.bashrc`）。
  - 如果系统中没有 `~/.bash_profile`，`bash` 会查找 `~/.profile`，功能类似。

### **GitLab Runner 用户没有 `~/.bashrc` 或 `~/.bash_profile`**

有时，GitLab Runner 用户的主目录下没有这些文件。这是因为 GitLab Runner 用户可能未配置 shell 环境。如果你想为 GitLab Runner 用户设置 `nvm` 或其他环境变量，你可以手动创建这些文件并添加必要的配置。

### **为 GitLab Runner 用户设置环境变量**

如果你想让 GitLab Runner 用户使用主用户安装的 `nvm`，可以按照以下步骤来手动创建并配置环境变量。

#### 1. **创建 `~/.bashrc` 或 `~/.bash_profile` 文件**
- 首先切换到 GitLab Runner 用户：
  ```bash
  sudo -u gitlab-runner -i
  ```

- 如果 GitLab Runner 用户没有 `~/.bashrc` 或 `~/.bash_profile` 文件，可以手动创建：
  ```bash
  touch ~/.bashrc  # 创建 .bashrc 文件
  touch ~/.bash_profile  # 创建 .bash_profile 文件（如需要）
  ```

#### 2. **编辑这些文件**

- 使用文本编辑器编辑 `~/.bashrc` 或 `~/.bash_profile` 文件：
  ```bash
  nano ~/.bashrc  # 或者 vim ~/.bashrc
  ```

- 在文件中添加以下内容，使 GitLab Runner 用户能够使用主用户的 `nvm`：

  ```bash
  export NVM_DIR="/home/your_main_user/.nvm"  # 将路径替换为主用户的 nvm 安装目录
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # 加载 nvm
  ```

  如果想确保登录 shell 也加载这些环境变量，可以将同样的配置添加到 `~/.bash_profile` 中。

#### 3. **确保 GitLab Runner 作业加载这些文件**

- 确保在 `.gitlab-ci.yml` 的 `before_script` 中，包含以下命令来加载 `nvm`：

  ```yaml
  before_script:
    - source ~/.bashrc  # 确保加载 .bashrc 中的 nvm 配置
    - nvm install 18
    - nvm use 18
  ```

### **确认修改生效**

- 你可以通过以下命令检查 GitLab Runner 用户的环境是否正确加载了 `nvm`：
  ```bash
  sudo -u gitlab-runner bash -c 'source ~/.bashrc && node -v'
  ```

- 运行 GitLab CI/CD 流水线时也可以在作业中加入 `node -v` 来验证当前的 Node.js 版本。

### 总结

- **`~/.bashrc`** 和 **`~/.bash_profile`** 是用户的 shell 配置文件，分别用于非登录和登录 shell 的环境设置。
- 如果 GitLab Runner 用户没有这些文件，可以手动创建并在其中添加 `nvm` 的相关配置。
- 确保在 CI/CD 配置中正确加载 `~/.bashrc`，使 GitLab Runner 用户能够访问主用户安装的 `nvm`。

总结：好像加了配置就生效了！！！！！！！！！！！！！
