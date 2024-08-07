console.log('111');
const moduleAA = require('./moduleAA.js');
console.log('moduleAA:', moduleAA.foo);
setTimeout(() => {
    console.log('moduleAA2:', moduleAA.foo);
}, 500)
console.log('222');

// 为什么不会输出'baz'???
// 输出：
// 111
// 333
// 5555
// 666
// moduleAA: bar
// 222
// 444
// moduleAA2: bar