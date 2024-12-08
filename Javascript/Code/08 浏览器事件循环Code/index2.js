console.log('script start');
async function async1() {
  // 关键：调用async2，它是同步代码，立即执行console.log('async2 end')
  // 遇到await,将后续代码（即console.log('async1 end')）作为微任务推入微任务队列
  await async2();
  console.log('async1 end');
}
async function async2() {
  console.log('async2 end');
}
async1();
setTimeout(function () {
  console.log('setTimeout');
}, 0);
new Promise((resolve) => {
  console.log('Promise');
  resolve();
})
  .then(function () {
    console.log('promise1');
  })
  .then(function () {
    console.log('promise2');
  });
console.log('script end');
