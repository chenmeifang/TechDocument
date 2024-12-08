// https://juejin.cn/post/6950786264941461541
// 链接中的第10题
async function async1() {
  console.log('async1 start');
  await async2();
  setTimeout(function () {
    console.log('setTimeout1') // 6-8行加入了微任务队列
  }, 0)
}
async function async2() {
  setTimeout(function () {
    console.log('setTimeout2') // 12行加入了宏任务队列
  }, 0)
}
console.log('script start');
setTimeout(function () {
  console.log('setTimeout3');
}, 0)
async1();
new Promise(function (resolve) {
  console.log('promise1');
  resolve();
}).then(function () {
  console.log('promise2');
});
console.log('script end');
// 预期：script start，async1 start，promise1，script end，promise2
// setTimeout3，setTimeout2，setTimeout1