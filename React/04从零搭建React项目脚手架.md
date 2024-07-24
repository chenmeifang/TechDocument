要从零搭建一个 React 项目脚手架，可以通过以下步骤进行。这包括设置 Node.js 环境、安装必要的包、配置 Webpack、配置 Babel 等。

# 1. 设置 Node.js 环境
首先，确保你已经安装了 Node.js 和 npm。你可以从 [Node.js 官方网站](https://nodejs.org/) 下载并安装最新版本。

# 2. 创建项目目录
创建一个新的项目目录，并进入该目录：
```bash
mkdir my-react-app
cd my-react-app
```

# 3. 初始化项目
使用 npm 初始化项目，这将创建一个 `package.json` 文件：
```bash
npm init -y
```

# 4. 安装 React 和 ReactDOM
安装 React 和 ReactDOM：
```bash
npm install react react-dom
```

# 5. 安装 Webpack 和相关依赖
安装 Webpack 及其 CLI 和开发服务器：
```bash
npm install --save-dev webpack webpack-cli webpack-dev-server
// --save--dev等同于-D
```

安装 Babel 及其 Loader：
```bash
npm install --save-dev @babel/core babel-loader @babel/preset-env @babel/preset-react
```

# 6. 创建项目结构
在项目目录下创建以下文件和文件夹：
```
my-react-app/
│
├── public/
│   └── index.html
│
├── src/
│   └── index.js
│
├── .babelrc
├── package.json
└── webpack.config.js
```

# 7. 配置 Babel
在项目根目录下创建 `.babelrc` 文件，并添加以下内容：
```json
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

`.babelrc` 文件是 Babel 的配置文件，用于指定 Babel 在转译 JavaScript 代码时使用的插件和预设。通过配置 `.babelrc` 文件，你可以控制 Babel 如何将现代 JavaScript 代码（如 ES6/ES7 代码）转译为兼容性更好的 ES5 代码，以便在旧版本的浏览器中运行。

- `@babel/preset-env`：转译 ES6+ 语法。
- `@babel/preset-react`：转译 React 的 JSX 语法。

### 主要作用

- **定义转译规则**：指定需要使用的 Babel 插件和预设。
- **提高代码兼容性**：确保代码能够在各种浏览器和环境中运行。
- **简化开发流程**：自动处理现代 JavaScript 特性和语法。

通过使用 `.babelrc` 文件，你可以轻松地配置 Babel，使其根据你的项目需求进行代码转译。

# 8. 配置 Webpack

在项目根目录下创建 `webpack.config.js` 文件，并添加以下内容：
```javascript
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    port: 9000
  }
};
```

# 9. 创建 HTML 文件
在 `public` 目录下创建 `index.html` 文件，并添加以下内容：
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My React App</title>
</head>
<body>
  <div id="root"></div>
  <script src="/bundle.js"></script>
</body>
</html>
```

# 10. 创建 React 入口文件
在 `src` 目录下创建 `index.js` 文件，并添加以下内容：
```javascript
import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  return (
    <div>
      <h1>Hello, React!</h1>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

> Warning: ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot

# 11. 更新 `package.json`

在 `package.json` 中添加 `scripts` 字段，以便更方便地运行开发服务器和构建项目：
```json
"scripts": {
  "start": "webpack serve --mode development --open",
  "build": "webpack --mode production"
}
```

# 12. 启动开发服务器
现在你可以启动开发服务器来查看你的 React 应用：
```bash
npm start
```

这将启动 Webpack 开发服务器，并在浏览器中自动打开你的 React 应用。你可以在 `http://localhost:9000` 查看应用。

# 总结
通过以上步骤，你已经从零开始搭建了一个 React 项目脚手架。这个项目包括基本的 React 结构、Webpack 配置、Babel 转译以及开发服务器设置。你可以根据需要进一步扩展和自定义这个脚手架。

# 遇到的问题

## 为什么自己从零搭建的react项目，访问路由链接会请求对应的路由url

你提到从零搭建的 React 项目在访问路由连接时会请求对应的路由 URL，这通常是因为服务器没有正确配置来处理客户端路由。React Router 使用的是客户端路由，这意味着所有的路由逻辑都在前端进行处理。如果服务器没有正确配置，那么在刷新页面或直接访问非根路径时，服务器会尝试查找该路径的资源，而不是将请求交由前端路由处理。

为了解决这个问题，需要在服务器配置中添加对所有路由的处理，使其指向你的主 HTML 文件（通常是 `index.html`），从而让前端路由处理所有路径。下面是一些常见的服务器配置示例：

### 使用 Webpack Dev Server

如果你使用的是 Webpack Dev Server，可以在 `webpack.config.js` 中进行配置：

```javascript
devServer: {
  historyApiFallback: true,
}
```

**这将确保所有路由请求都返回 `index.html`，并由前端的 React Router 处理**。

### 使用 Express.js 作为服务器

如果你使用的是 Node.js 和 Express.js 作为服务器，可以在服务器代码中添加一个通配符路由来处理所有请求：

```javascript
const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

// 静态文件服务
app.use(express.static(path.join(__dirname, 'build')));

// 处理所有其他请求，将其指向 index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

### 使用 Nginx 作为服务器

如果你使用的是 Nginx，可以在 Nginx 配置文件中添加以下配置：

```nginx
server {
    listen 80;
    server_name your_domain.com;

    root /path/to/your/build;

    location / {
        try_files $uri /index.html;
    }
}
```

这将确保所有请求都被重定向到 `index.html`，从而由前端路由处理。

### 总结

当使用 React Router 时，需要确保服务器能够正确地处理客户端路由。这通常意味着配置服务器，使其能够将所有未匹配的路由重定向到 `index.html`，从而由前端的 React Router 进行处理。不同的服务器有不同的配置方法，但基本思路都是相同的，即确保所有请求都能正确地返回主 HTML 文件。

## historyApiFallback

`historyApiFallback: true` 是 Webpack Dev Server 中的一个配置选项，用于支持 HTML5 的 History API 路由。在使用 React Router 或其他前端路由库时，这个配置选项非常有用，因为它确保在刷新页面或直接访问非根路径时，服务器会正确处理请求并返回你的 `index.html` 文件，而不是尝试查找具体的文件或资源。

### 作用
1. **处理单页应用程序的路由**：
   - 在单页应用程序（SPA）中，前端路由由 JavaScript 控制，所有的路径实际上都应该指向同一个 HTML 文件（通常是 `index.html`）。当用户直接访问一个深层次的路径（例如 `/app/admin`）或刷新页面时，浏览器会向服务器请求该路径。
   - 如果没有 `historyApiFallback` 配置，服务器会尝试查找 `/app/admin` 对应的文件或资源，但通常这不是你想要的行为。你希望服务器始终返回 `index.html`，以便前端路由逻辑可以处理该路径并渲染正确的组件。

2. **避免 404 错误**：
   - 没有这个配置，当用户直接访问一个使用 React Router 定义的路径时，服务器会返回 404 错误，因为它找不到对应的资源。通过启用 `historyApiFallback`，Webpack Dev Server 会将所有未找到的请求重定向到 `index.html`，从而避免 404 错误。

### 示例

在你的 `webpack.config.js` 文件中，配置 `devServer` 部分，启用 `historyApiFallback`：

```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    historyApiFallback: true, // 启用 historyApiFallback
  },
};
```

### 如何工作
当你在浏览器中访问 `http://localhost:9000/app/admin`，而服务器上没有 `/app/admin` 目录或文件时，Webpack Dev Server 会将请求重定向到 `index.html`。这允许 React Router 或其他前端路由库接管并渲染相应的组件。

### 总结
`historyApiFallback: true` 使得单页应用程序能够处理前端路由的刷新和直接访问路径问题，通过将所有未匹配的请求重定向到 `index.html` 来确保应用程序能够正确地加载和渲染。