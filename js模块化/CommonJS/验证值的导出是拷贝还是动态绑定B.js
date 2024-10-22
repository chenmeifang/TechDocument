const A = require('./验证值的导出是拷贝还是动态绑定A.js');
console.log('A.count:', A.count);
A.increment()
console.log('A.count:', A.count);
// 上面代码输出0，说明是值的拷贝
// 导出的值不会随模块内的变量变化而更新


A.count += 10;
console.log('A.count:', A.count);

const A2 = require('./验证值的导出是拷贝还是动态绑定A.js');
console.log('A2.count:', A2.count); // 此处输出10，为什么？？？懂了

// 运行流程
// 导入 A.js：当 const A = require('./A'); 执行时，A.js 中的代码被执行，count 被初始化为 0，然后导出一个对象 { count: 0, increment: function() {...} }。
// 调用 increment：A.increment(); 会将 count 增加到 1。此时，count 变量在 A.js 中仍然是 1，但是在导出对象中，count 仍然是 0（因为是值的拷贝）。
// 修改 count：A.count += 10; 这行代码实际上在修改的是 A 对象中的 count 属性，而不是 A.js 内部的 count 变量。由于导出的是一个对象的拷贝，A.count 现在的值是 10。
// 再次导入 A.js：const A2 = require('./A'); 这行代码会再次导入 A.js。由于 require 会检查缓存，实际上并不会重新执行 A.js 的代码，而是直接返回之前缓存的对象。

