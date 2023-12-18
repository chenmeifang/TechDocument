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

# ==AST可以做什么？==

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

![截屏2021-03-29 下午6.31.11](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-03-29 下午6.31.11.png)

1. 拿到入口文件的内容——==fs模块==
   1. ![截屏2021-03-29 下午6.38.19](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-03-29 下午6.38.19.png)
2. 将ES6 Code ==用babel parser解析成AST==
   1. 安装babel/parser
   2. ![截屏2021-03-29 下午6.39.42](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-03-29 下午6.39.42.png)
   3. ![截屏2021-03-29 下午6.41.34](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-03-29 下午6.41.34.png) 
   4. ![截屏2021-03-29 下午6.41.09](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-03-29 下午6.41.09.png)
3. 通过操作AST去分析出依赖文件——==使用babel/traverse==
   1. ![截屏2021-03-29 下午6.46.34](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-03-29 下午6.46.34.png)
   2. ![截屏2021-03-29 下午6.50.02](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-03-29 下午6.50.02.png)
4. 用==babel/core==库把ES6代码转成ES5（其实是从AST到ES5）
   1. ![截屏2021-03-29 下午6.51.59](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-03-29 下午6.51.59.png)
   2. ![截屏2021-03-29 下午6.54.21](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-03-29 下午6.54.21.png)
   3. ![截屏2021-03-29 下午6.56.58](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-03-29 下午6.56.58.png)
5. 得到文件依赖图
6. 实现CMD api，整合代码，打包到bundle.js

55min处开始看不懂了！！





















