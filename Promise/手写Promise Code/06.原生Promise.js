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
// let p1 = new Promise(resolve => {
//     // resolve(22);
//     setTimeout(() => {
//         resolve(22);
//     }, 2000)
// })
// let p2 = new Promise(resolve => {
//     // resolve(333);
//     setTimeout(() => {
//         resolve(333);
//     }, 1000)
// })
// Promise.all([p1, p2]).then(value => {
//     console.log('原生value:', value);
// })
// Promise.race([p1, p2]).then(value => {
//     console.log('原生value:', value);
// })
// console.log('原生promise:', p);

Promise.all = function (lists) {
    return new Promise((resolve, reject) => {
        let results = [];
        lists.forEach((promise) => {
            if (promise instanceof Promise) {
                promise.then(v => {
                    results.push(v);
                    if (results.length === lists.length) {
                        resolve(results);
                    }
                }).catch(err => {
                    reject(err);
                })
            } else {
                Promise.resolve(promise).then(v => {
                    results.push(v);
                    if (results.length === lists.length) {
                        resolve(results);
                    }
                }).catch(err => {
                    reject(err)
                })
            }
        })
        // resolve(results);
    })
}

// const arr = [Promise.resolve(1), 2];
// const arr = [Promise.resolve(1)];
// Promise.all(arr).then(v => console.log('test:', v)); // 输出 [1, 2]
// arr.push(3);
Promise.all([Promise.reject(3)])
    .then(v => console.log('111:', v))
    .catch(v => console.log('err:', v)); // 输出 3
// Promise.all([Promise.reject(3)]).catch(v => console.log('err:', v)); // 输出 3
// Promise.all([1, Promise.resolve(2), Promise.reject(3)]).then(v => console.log(v)).catch(v => console.log('err:',v)); // 输出 3
//Promise.all([new Promise((res) => setTimeout(() => res(1), 500)), 2, Promise.resolve(3)]).then(v => console.log(v)); // 输出 [1, 2, 3]
