# 1. 集成

在 GitLab CI 中集成 **Jest**，可以在 CI/CD 流水线中自动执行单元测试，并生成测试报告和代码覆盖率报告。具体步骤如下：

### 1. 配置 `.gitlab-ci.yml`

在你的项目根目录下，创建或修改 `.gitlab-ci.yml` 文件，添加运行 Jest 测试的配置。

#### 基本配置示例
```yaml
stages:
  - test

test:
  stage: test
  script:
    - npm test # 运行 Jest 测试
  artifacts:
    paths:
      - coverage # 保存代码覆盖率报告
    reports:
      junit: coverage/junit.xml # 配置测试报告路径
  coverage: '/All files[^|]*\|[^|]*\s+([\d.]+)/' # GitLab 将从 Jest 输出中获取覆盖率信息
```

### 2. 配置 `package.json` 中的 `test` 脚本

```json
{
  "scripts": {
    "test": "jest --ci --coverage"
  }
}
```

`--ci` 参数是为 CI 环境优化 Jest 的执行，`--coverage` 会生成代码覆盖率报告。

### 3. 生成代码覆盖率报告

Jest 会自动在 `coverage/` 目录下生成代码覆盖率报告。GitLab CI 可以捕获并展示这些报告。

#### 覆盖率报告输出配置
在 Jest 中，覆盖率报告默认存储在 `coverage` 目录下。你可以通过 `jest.config.js` 或 `package.json` 文件来配置覆盖率报告格式，例如生成 HTML 和 JUnit 格式的报告：

```javascript
// jest.config.js
module.exports = {
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['html', 'text-summary', 'cobertura'], // 生成 HTML 和 Cobertura 格式的覆盖率报告
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: 'coverage',
        outputName: 'junit.xml', // 输出 JUnit 格式的测试报告
      },
    ],
  ],
};
```

### 4. 查看测试报告和覆盖率

在 GitLab CI 中，配置 `artifacts` 来保存测试和覆盖率报告。配置完成后，在 GitLab 的 **CI/CD Pipeline** 页面可以看到测试执行结果。通过 `artifacts` 配置保存的文件，还可以在 **Job artifacts** 中查看生成的覆盖率报告。

GitLab 还支持直接展示测试报告。在 `.gitlab-ci.yml` 文件中，你可以将 `junit.xml` 文件作为测试报告，让 GitLab 在页面上展示测试结果：

```yaml
artifacts:
  paths:
    - coverage # 保存覆盖率报告
  reports:
    junit: coverage/junit.xml # 将 JUnit 格式的测试报告集成到 GitLab
```

#### 测试报告显示：
GitLab 会在 **CI/CD > Pipelines** 页面显示测试报告的可视化结果，展示哪些测试通过或失败。

### 5. 代码覆盖率报告

GitLab 可以显示代码覆盖率的百分比，可以通过 `.gitlab-ci.yml` 的 `coverage` 选项来捕获 Jest 的覆盖率信息。Jest 会输出类似以下的覆盖率信息：

```
All files | 80.00%
```

你可以在 `.gitlab-ci.yml` 中添加以下配置，GitLab 将从 Jest 输出中捕获覆盖率数据：
```yaml
coverage: '/All files[^|]*\|[^|]*\s+([\d.]+)/'
```

这样，GitLab 会自动显示代码覆盖率信息。

# 2. junit: coverage/junit.xml

在 `gitlab-ci.yml` 文件中，`reports` 部分用于指定 CI/CD 流水线中生成的报告类型及其存储路径。特别是 `junit` 用于生成 JUnit 格式的测试报告，这种格式被许多 CI/CD 工具和测试框架广泛支持，GitLab 也可以用来展示这些报告的结果。

### 1. **`reports: junit: coverage/junit.xml` 的含义**
- `reports` 是一个指令，定义了需要在 GitLab CI 中处理的报告类型。
- `junit` 指定了报告的类型为 JUnit 格式。
- `coverage/junit.xml` 是存储 JUnit 报告的路径，这个路径应该是相对于 CI/CD Job 的工作目录。

### 2. **如果不配置 `reports: junit`，会出现的问题**
如果你不在 `gitlab-ci.yml` 中配置 `reports` 字段，特别是没有配置 `junit` 报告，可能会导致以下问题：

#### a. **测试结果不被记录**
- 没有生成 JUnit 报告，GitLab 将无法获取到测试的结果和状态。这意味着 CI/CD 流水线将不会有关于测试成功或失败的详细信息。

#### b. **缺乏可视化结果**
- GitLab CI 界面中将无法显示测试报告的图形化结果，像是通过 JUnit 报告生成的详细测试用例结果（成功、失败、跳过等），从而影响开发团队对代码质量的监控。

#### c. **CI/CD 流水线的失败不易追踪**
- 如果测试失败且没有报告，开发者在查看流水线结果时将很难定位问题所在，增加了故障排查的难度。

#### d. **缺少集成工具的支持**
- 很多 CI/CD 工具和测试框架都依赖 JUnit 格式的报告来分析测试覆盖率、执行时间和失败的测试用例。如果不生成这些报告，你将失去集成和使用这些工具的机会。

### 3. **总结**
- 在 `gitlab-ci.yml` 中配置 `reports: junit` 是非常重要的，它能够确保 CI/CD 流水线能够有效捕捉和展示测试结果。
- 如果省略了这个配置，可能导致测试结果无法在 GitLab 中查看，从而影响团队对代码质量的反馈与改进。

### 4. **如何配置**
确保在 CI/CD 流水线的 Job 中生成 JUnit 格式的测试报告，并在 `gitlab-ci.yml` 中添加类似如下配置：

```yaml
test_job:
  script:
    - npm run test -- --reporter junit --output coverage/junit.xml
  reports:
    junit: coverage/junit.xml
```

在这个示例中，`npm run test` 命令会生成 JUnit 格式的测试报告，`reports` 指令则确保 GitLab 能正确处理并展示这个报告。
