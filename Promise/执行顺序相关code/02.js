// (async () => {
//     console.log('1');
//     setTimeout(() => {
//         console.log('2')
//     }, 0)
//     await new Promise((resolve, reject) => {
//         console.log('3');
//     }).then(() => {
//         console.log('4')
//     });
//     console.log('5')
// })()
// 预测输出：1，3,2
// 宏任务：setTimeout的2
// 注意：5是不会输出的

function log(msg, time) {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(msg)
            resolve()
        }, time)
    })
}
// (async () => {
//     for (let i = 0; i < 5; i++) {
//         log(i, 1000);
//         // 每次调用log函数，都会创建一个新的Promise，并启动一个setTimeout定时器
//         // 重点注意：log(i,1000)返回的是promise，但是这里没有await或.then来等待promise的解决，循环会立即执行所有log调用
//     }
// })()
// 预测输出：
// 实际输出：隔1s后同时输出1，2，3，4

(async () => {
    for (let i = 0; i < 5; i++) {
        await log(i, 1000)
    }
})()