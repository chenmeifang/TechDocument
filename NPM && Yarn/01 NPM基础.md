# 1. Npm查看源配置

要查看当前 npm 的源配置（即 registry），你可以使用以下方法：

### 1. **查看当前 npm 源**
运行以下命令，查看 npm 当前使用的 registry 源：
```bash
npm config get registry
```

官方源：`https://registry.npmjs.org/`

切换到淘宝镜像源：`npm config set registry https://registry.npmmirror.com/`

### 2. **查看所有 npm 配置**

如果你想查看 npm 的所有配置（包括 registry 和其他配置信息），可以使用以下命令：
```bash
npm config list
```

输出中会显示当前的配置，包括 `registry` 设置。

### 3. **查看 `.npmrc` 文件**
npm 的配置通常保存在 `.npmrc` 文件中，你可以直接查看该文件来确认配置的源：

- **全局配置文件**：通常位于 `/etc/npmrc`。
- **用户配置文件**：位于 `~/.npmrc`。

查看用户级别配置文件：
```bash
cat ~/.npmrc
```

通过这些方法，你可以查看 npm 当前使用的源配置。

# 2. .npmrc文件

`.npmrc` 文件是 `npm`（Node Package Manager）的配置文件，用于控制 `npm` 命令的行为和配置。它允许开发者自定义 `npm` 的全局或项目级别的配置，指定例如注册表源、缓存位置、代理设置、认证信息等。

### 1. `.npmrc` 文件的作用
`.npmrc` 文件可以配置以下内容：
- **注册表源**：指定 `npm` 使用哪个注册表来下载包（例如，可以配置为使用国内的 npm 镜像源，如 `https://registry.npmmirror.com`）。
- **缓存路径**：修改 `npm` 的本地缓存路径。
- **代理设置**：设置 HTTP 或 HTTPS 代理，以便在受限网络环境下安装依赖包。
- **认证信息**：可以存储身份验证的 token，访问私有 npm 注册表时使用。
- **包发布配置**：例如是否允许包发布、发布前需要执行的检查等。
- **安装行为**：例如是否允许使用 `package-lock.json` 文件、设置全局安装路径等。

### 2. `.npmrc` 文件的存储位置
`.npmrc` 文件可以存在于多个位置，优先级由高到低如下：
- **项目级 `.npmrc`**：位于项目的根目录下。该文件仅影响当前项目的 `npm` 配置。
- **用户级 `.npmrc`**：位于用户主目录下（一般在 `~/.npmrc` 或 Windows 下的 `C:\Users\<用户名>\.npmrc`）。该文件对用户所有项目生效。
- **全局配置 `.npmrc`**：用于全局 `npm` 配置，可通过 `npm config set` 命令修改。例如 `C:\Program Files\nodejs\node_modules\npm\npmrc`（Windows 下），或 `/etc/npmrc`（Linux 下）。
- **环境变量**：可以通过环境变量设置来覆盖 `.npmrc` 文件的配置。例如，`NPM_CONFIG_REGISTRY=https://registry.npmjs.org`。

### 3. `.npmrc` 文件的常见配置项
```ini
registry=https://registry.npmjs.org/         # 指定 npm 使用的注册表源
cache=~/.npm-cache                           # 设置缓存路径
proxy=http://proxy.example.com:8080          # 设置 HTTP 代理
https-proxy=https://proxy.example.com:8080   # 设置 HTTPS 代理
strict-ssl=false                             # 是否严格验证 SSL 证书
always-auth=true                             # 每次安装时都进行身份验证
```

### 4. 创建和修改 `.npmrc` 文件
可以通过手动创建或编辑 `.npmrc` 文件，也可以使用以下命令配置：
```bash
npm config set registry https://registry.npmmirror.com  # 修改注册表源
npm config get registry                                # 获取当前注册表源
npm config delete registry                             # 删除注册表配置
```

### 总结
`.npmrc` 文件是 `npm` 的配置文件，用于自定义 `npm` 的行为。它可以存储在项目级、用户级、全局级等多个位置，允许设置 npm 包安装、代理、认证等信息。通过 `.npmrc` 文件，你可以根据需求调整 `npm` 的各种设置，优化包管理流程。