const fs = require('fs');
const vm = require('vm');

let age = 33;
// 不传'utf-8'时，默认返回的是Buffer
let content = fs.readFileSync('test.txt', 'utf-8');
console.log('content1:', content);

// eval：用于将字符串作为代码执行
// eval不合适，因为作用域不独立
// eval(content);
// console.log('content2:', age);

// 使用 new Function 创建的函数不会访问创建它的上下文中的变量
// 所有的变量都必须通过参数传入
// let fn = new Function('age', "return age + 1");
// console.log(fn(age));

vm.runInThisContext(content);
// console.log('age1:', age);

// vm.runInThisContext("age += 10");
// console.log('age2:', age);