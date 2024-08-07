console.log('111');

import { bar } from './moduleBBB.js';

console.log('2222');

export function foo() {
    bar();
    console.log('执行完毕');
}

console.log('3333');

foo();
// 注意：ES6在遇到模块加载命令import时，不会去执行模块，
//      而是只生成一个引用，等到真的需要用到时，再到模块里面去取值

// 场景：moduleBBB.js中无第十行foo的调用
// 预测输出：444，5555，111，2222，3333，6666，执行完毕
// 实际输出：444，5555，111，2222，3333，6666，执行完毕

// 场景：moduleBBB.js中有第十行foo的调用
// 预测输出：444,5555，6666，执行完毕，111,2222,3333，6666，执行完毕
// 实际输出：同上