// https://juejin.cn/post/6950786264941461541
// 链接中的第七题
console.log("start");
setTimeout(() => {
  console.log("children2")
  Promise.resolve().then(() => {
    console.log("children3")
  })
}, 0)

new Promise(function (resolve, reject) {
  console.log("children4")
  setTimeout(function () {
    console.log("children5")
    resolve("children6")
  }, 0)
}).then(res => {         // flag
  console.log("children7")
  setTimeout(() => {
    console.log(res)
  }, 0)
})

// 预期：start children4 children2 children3 children5 children7 children6












// 预期：start children4 children7 children2 children3 children5 children6
// 实际：start children4 children2 children3 children5 children7 children6
