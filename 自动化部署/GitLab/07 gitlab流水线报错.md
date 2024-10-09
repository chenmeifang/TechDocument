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