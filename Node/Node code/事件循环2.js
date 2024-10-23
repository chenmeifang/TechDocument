setTimeout(() => {
  console.log('s1');
  Promise.resolve().then(() => {
    console.log('p1')
  })
  process.nextTick(() => {
    console.log('t1')
  })
})
// 宏 20-26行
// 微：
// 预测输出：start，end，p2，s1, t1 p1, s2,t2, p3
Promise.resolve().then(() => {
  console.log('p2');
})

console.log('start');

setTimeout(() => {
  console.log('s2')
  Promise.resolve().then(() => {
    console.log('p3')
  })
  process.nextTick(() => {
    console.log('t2');
  })
})

console.log('end');
