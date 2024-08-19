// async function async1() {
//     console.log('async1 start');
//     await async2();
//     // 重点注意：
//     // await async2()：会暂停async1的执行，并将后续代码放到微任务队列
//     console.log('asnyc1 end');
// }
// async function async2() {
//     console.log('async2');
// }
// console.log('script start');
// setTimeout(() => {
//     console.log('setTimeOut');
// }, 0);
// async1();
// new Promise(function (reslove) {
//     console.log('promise1');
//     reslove();
// }).then(function () {
//     console.log('promise2');
// })
// console.log('script end');

// 预测输出：script start，async1 start，async2，asnyc1 end，promise1，script end，promise2，setTimeOut
// 实际输出：script start，async1 start，async2，promise1，script end，asnyc1 end，promise2，setTimeOut
// 宏任务队列：setTimeOut
// 微任务队列：asnyc1 end，promise2

// 问题：一般.then方法里面的代码什么时候加入到微任务队列里面？？resolve的时候吗？？
// answer: .then()方法内的代码会在对应的Promise被resolved或rejected时，加入到微任务队列中

function log(msg, time) {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(msg)
            resolve()
        }, time)
    })
}

(async () => {
    [1, 2, 3, 4].forEach(async (i) => {
        await log(i, 1000)
    })
})()
// 预测输出：