# Webpack中babel相关的配置

在Webpack项目中，Babel通常用于将现代JavaScript代码（如ES6+、JSX）转换为兼容旧版浏览器的代码。为了在Webpack中使用Babel，通常需要进行以下配置步骤：

### 1. 安装必要的依赖

首先，确保你已经安装了Webpack和Babel相关的依赖：

```bash
npm install --save-dev babel-loader @babel/core @babel/preset-env
```

如果你使用React，还需要安装`@babel/preset-react`：

```bash
npm install --save-dev @babel/preset-react
```

### 2. Babel 配置文件

Babel 的配置通常放在一个名为 `.babelrc` 或 `babel.config.js` 的文件中。一个简单的配置可能如下：

#### `.babelrc` 示例

```json
{
  "presets": ["@babel/preset-env"]
}
```

如果你在使用React，还需要添加`@babel/preset-react`：

```json
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

#### `babel.config.js` 示例

你也可以使用`babel.config.js`来进行配置：

```javascript
module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-react' // 如果你使用React
  ],
};
```

### 3. Webpack 配置文件

接下来，在Webpack配置文件（`webpack.config.js`）中，使用`babel-loader`来处理JavaScript文件：

```javascript
const path = require('path');

module.exports = {
    mode: 'development', // 或 'production'
    entry: './src/index.js', // 你的应用入口文件
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/, // 匹配所有 .js 文件
                exclude: /node_modules/, // 排除 node_modules 目录
                use: {
                    loader: 'babel-loader',
                }
            }
        ]
    }
};
```

### 4. 常见的 Babel 插件和配置

根据项目的需求，你可能需要安装和配置其他Babel插件。例如：

- **@babel/plugin-transform-runtime**：减少Babel编译后的代码量，避免全局污染。

```bash
npm install --save-dev @babel/plugin-transform-runtime
```

在Babel配置文件中使用：

```json
{
  "presets": ["@babel/preset-env"],
  "plugins": ["@babel/plugin-transform-runtime"]
}
```

- **@babel/preset-typescript**：如果你使用TypeScript，可以安装并配置这个预设。

```bash
npm install --save-dev @babel/preset-typescript
```

在Babel配置文件中使用：

```json
{
  "presets": ["@babel/preset-env", "@babel/preset-typescript"]
}
```

### 5. 处理 JSX 和 ES6+ 语法

如果你的项目使用了React和JSX语法，确保你的Babel配置中包含`@babel/preset-react`，这样Babel可以正确编译JSX语法。此外，`@babel/preset-env`将确保ES6+语法被编译为兼容的ES5代码。

### 总结

通过Webpack与Babel的结合，你可以轻松地将现代JavaScript代码转换为兼容旧版浏览器的代码。关键步骤包括安装`babel-loader`、配置Babel预设和插件，以及在Webpack中设置相应的加载器。根据项目需求，Babel配置可以进一步定制，以满足不同的JavaScript语法和功能需求。

https://www.bilibili.com/video/BV1LD4y1X7FB

https://www.bilibili.com/video/BV1CJ411T7k5?from=search&seid=13961602534363452532 手写webpack 共70分钟

# http://astexplorer.net/

```js
class Pig {
  constructor () {
    this.name = '佩奇'
  }
  eat () {
    console.log('吃时')
  }
}
```

```json
{
  "type": "Program",
  "start": 0,
  "end": 94,
  "body": [
    {
      "type": "ClassDeclaration",
      "start": 0,
      "end": 94,
      "id": {
        "type": "Identifier",
        "start": 6,
        "end": 9,
        "name": "Pig"
      },
      "superClass": null,
      "body": {
        "type": "ClassBody",
        "start": 10,
        "end": 94,
        "body": [
          {
            "type": "MethodDefinition",
            "start": 14,
            "end": 55,
            "kind": "constructor",
            "static": false,
            "computed": false,
            "key": {
              "type": "Identifier",
              "start": 14,
              "end": 25,
              "name": "constructor"
            },
            "value": {
              "type": "FunctionExpression",
              "start": 26,
              "end": 55,
              "id": null,
              "expression": false,
              "generator": false,
              "async": false,
              "params": [],
              "body": {
                "type": "BlockStatement",
                "start": 29,
                "end": 55,
                "body": [
                  {
                    "type": "ExpressionStatement",
                    "start": 35,
                    "end": 51,
                    "expression": {
                      "type": "AssignmentExpression",
                      "start": 35,
                      "end": 51,
                      "operator": "=",
                      "left": {
                        "type": "MemberExpression",
                        "start": 35,
                        "end": 44,
                        "object": {
                          "type": "ThisExpression",
                          "start": 35,
                          "end": 39
                        },
                        "property": {
                          "type": "Identifier",
                          "start": 40,
                          "end": 44,
                          "name": "name"
                        },
                        "computed": false,
                        "optional": false
                      },
                      "right": {
                        "type": "Literal",
                        "start": 47,
                        "end": 51,
                        "value": "佩奇",
                        "raw": "'佩奇'"
                      }
                    }
                  }
                ]
              }
            }
          },
          {
            "type": "MethodDefinition",
            "start": 58,
            "end": 92,
            "kind": "method",
            "static": false,
            "computed": false,
            "key": {
              "type": "Identifier",
              "start": 58,
              "end": 61,
              "name": "eat"
            },
            "value": {
              "type": "FunctionExpression",
              "start": 62,
              "end": 92,
              "id": null,
              "expression": false,
              "generator": false,
              "async": false,
              "params": [],
              "body": {
                "type": "BlockStatement",
                "start": 65,
                "end": 92,
                "body": [
                  {
                    "type": "ExpressionStatement",
                    "start": 71,
                    "end": 88,
                    "expression": {
                      "type": "CallExpression",
                      "start": 71,
                      "end": 88,
                      "callee": {
                        "type": "MemberExpression",
                        "start": 71,
                        "end": 82,
                        "object": {
                          "type": "Identifier",
                          "start": 71,
                          "end": 78,
                          "name": "console"
                        },
                        "property": {
                          "type": "Identifier",
                          "start": 79,
                          "end": 82,
                          "name": "log"
                        },
                        "computed": false,
                        "optional": false
                      },
                      "arguments": [
                        {
                          "type": "Literal",
                          "start": 83,
                          "end": 87,
                          "value": "吃时",
                          "raw": "'吃时'"
                        }
                      ],
                      "optional": false
                    }
                  }
                ]
              }
            }
          }
        ]
      }
    }
  ],
  "sourceType": "module"
}
```

# AST可以做什么

1. BABEL(将ES6的代码转译成ES5或ES3的代码)——依赖于BABEL
2. Sass——把写的Sass语法通过语法树转译成CSS
3. Less
4. ESLint
5. TypeScript

都依赖于AST



==Chrome的V8引擎怎么去运行JS代码呢？==

* 先把js代码解析成AST然后再去运行



Webpack是分析文件的依赖，然后把所有文件打包到一个文件里面。

==那Webpack是怎么去分析文件的依赖呢？==

1. 拿到入口文件的内容——==fs模块==
2. 将ES6 Code ==用babel parser解析成AST==
   1. 安装babel/parser
   2. 
   3. 
   4. 
3. 通过操作AST去分析出依赖文件——==使用babel/traverse==
   1. 
   2. 
4. 用==babel/core==库把ES6代码转成ES5（其实是从AST到ES5）
   1. 
   2. 
   3. 
5. 得到文件依赖图
6. 实现CMD api，整合代码，打包到bundle.js

55min处开始看不懂了！！





















