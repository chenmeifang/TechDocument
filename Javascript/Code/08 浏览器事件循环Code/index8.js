// https://juejin.cn/post/6950786264941461541
// 链接中的第11题
new Promise((resolve, reject) => {
  console.log('B');
  resolve(); // 1
}).then(() => {   // 第一个 then 
  console.log('C')
  new Promise((resolve, reject) => {
    resolve()   // 2 
  }).then(() => {
    console.log('D')
  }).then(() => {   // 3
    console.log('E')
  })
}).then(() => {   // 第二个 then 加入
  console.log('F')
});
// 预测：B C xxx