console.log('111');

import { foo } from './moduleAA.js';

console.log('222');

console.log('foo:', foo);
setTimeout(() => {
    console.log('foo2:', foo);
}, 500)
setTimeout(() => {
    console.log('foo3:', foo);
}, 400)

// 输出：
// 验证AA模块是什么时候开始执行的
// 333
// 444
// 111
// 222
// foo: bar
// foo3: bar
// 555
// foo2: baz