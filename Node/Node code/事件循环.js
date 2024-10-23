setTimeout(() => {
  console.log('s1');
})

Promise.resolve().then(() => {
  console.log('p1');
})

console.log('start');

process.nextTick(() => {
  console.log('tick');
})

setImmediate(() => {
  console.log('setImmediate');
})

console.log('end');

// 预测输出：start end tick p1 setImmediate s1
// 实际输出：start end tick p1 s1 setImmediate

// 疑问：不是说一般setImmediate比setTimeout早执行吗？
// 注意：s1和setImmediate输出的先后顺序跟setTimeout的第二个参数有关
// 当第二个参数的值小于8时，都是s1先输出，setImmediate后输出
// 当第二个参数的值大于等于8时，都是setImmediate先出输出，s1后输出