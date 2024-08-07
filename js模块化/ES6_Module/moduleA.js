import { b } from '../moduleB.js';
export const a = '我是在A模块定义的变量'
console.log('这是在A模块执行的代码，输出从B模块引入的b：', b);

// 报错如下：
// SyntaxError: Cannot use import statement outside a module
// 错误说明：表示在不支持import语法的环境下使用了import语句
// import是ES6的模块语法
// 但某些环境（如Node.js的CommonJS模块）默认不支持这种语法

// 问题解决：启用ES6模块支持
// 方法一：在Node.js中，确保你的package.json文件中包含"type": "module"
// 方法二：文件使用.mjs扩展名，NodeJS会自动将其视为ES6模块