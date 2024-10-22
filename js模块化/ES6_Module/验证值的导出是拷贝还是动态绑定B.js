import { count, increment } from './验证值的导出是拷贝还是动态绑定A.js'
console.log('count:', count)
increment();
console.log('count:', count)
// 上面代码输出1，说明导出的值是动态绑定
// 导出的值会随着模块内的变量变化而更新

// count++;
// console.log('count:', count)
