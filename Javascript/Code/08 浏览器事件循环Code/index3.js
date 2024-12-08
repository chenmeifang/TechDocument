async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}
// 上面的代码等价于 ==>
async function async1() {
  console.log('async1 start');
  Promise.resolve(async2()).then(() => {
    console.log('async1 end')
  })
}
// https://juejin.cn/post/6950786264941461541