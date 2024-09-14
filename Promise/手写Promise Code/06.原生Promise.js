// let p = new Promise((resolve, reject) => {
//     // setTimeout(() => {
//     //     resolve(111);
//     //     // console.log('原生promise-----------');
//     // })
//     // resolve(111);
//     reject(111);
// }).then().then(value => {
//     console.log('原生promise value:', value);
//     // throw 5;
//     return Promise.resolve(222); // 情况2
//     // return Promise.reject(3333); // 情况3
// }, reason => {
//     console.log('原生promise reason:', reason);
// })
// let p = new Promise((resolve, reject) => {
//     reject(111);
// }).then(value => {
//     console.log('原生promise value:', value);
// }).catch(reason => {
//     console.log('原生promise reason:', reason);
// })
let p1 = new Promise(resolve => {
    // resolve(22);
    setTimeout(() => {
        resolve(22);
    }, 2000)
})
let p2 = new Promise(resolve => {
    // resolve(333);
    setTimeout(() => {
        resolve(333);
    }, 1000)
})
// Promise.all([p1, p2]).then(value => {
//     console.log('原生value:', value);
// })
Promise.race([p1, p2]).then(value => {
    console.log('原生value:', value);
})
// console.log('原生promise:', p);
