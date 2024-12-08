// https://www.bilibili.com/video/av77292118?spm_id_from=333.788.player.switch&vd_source=a7089a0e007e4167b4a61ef53acc6f7e&p=40
setTimeout(() => {
  console.log('0');
}, 0)
new Promise((resolve, reject) => {
  console.log('1');
  resolve()
}).then(() => {
  console.log('2');
  new Promise((resolve, reject) => {
    console.log('3');
    resolve()
  }).then(() => {
    console.log('4');
  }).then(() => {
    console.log('5');
  })
}).then(() => {
  console.log('6');
})
// 预测：1 7 2 3 8 4 6 5 0
new Promise((resolve, reject) => {
  console.log('7');
  resolve()
}).then(() => {
  console.log('8');
})