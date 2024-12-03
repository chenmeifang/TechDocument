// Promise.all = function (lists) {
//   return new Promise((resolve, reject) => {
//     let results = [];
//     lists.forEach((promise) => {
//       if (promise instanceof Promise) {
//         promise.then(v => {
//           results.push(v);
//           if (results.length === lists.length) {
//             resolve(results);
//           }
//         }).catch(err => {
//           reject(err);
//         })
//       } else {
//         Promise.resolve(promise).then(v => {
//           results.push(v);
//           if (results.length === lists.length) {
//             resolve(results);
//           }
//         }).catch(err => {
//           reject(err)
//         })
//       }
//     })
//     // resolve(results);
//   })
// }

Promise.all = function (lists) {
  let res = [];
  let count = 0;
  return new Promise((resolve, reject) => {
    lists.forEach((list, index) => {
      if (list instanceof Promise) {
        list.then(value => {
          res[index] = value;
          count++;
          if (count === lists.length) {
            resolve(res)
          }
        }).catch(err => {
          reject(err)
        })
      } else {
        Promise.resolve(list).then(value => {
          res[index] = value;
          count++;
          if (res.length === lists.length) {
            resolve(res)
          }
        })
      }
    });
  })
}

// const arr = [Promise.resolve(1), 2];
// Promise.all(arr).then(v => console.log('test:', v)); // 输出 [1, 2]

// Promise.all() 接受一个包含多个 Promise 的 可迭代对象（例如数组）
// 它返回一个新的 Promise，
// 这个新的 Promise 会根据传入的所有 Promise 的状态来决定最终的结果
// 1. 如果数组中的所有 Promise 都成功（fulfilled），
//    Promise.all 返回的 Promise 也会成功，
//    返回一个包含每个 Promise 成功值的数组
// 2. 如果任何一个 Promise 被拒绝（rejected），
//    Promise.all 返回的 Promise 会被拒绝，
//    且拒绝的原因是第一个被拒绝的 Promise 的 reason
// Promise.all([Promise.reject(3)])
//   .then(v => {
//     console.log('111:', v)
//   })
//   .catch(v => {
//     console.log('err1:', v)
//   });
// Promise.all([Promise.reject(3)])
//   .catch(v => {
//     console.log('err2:', v)
//   });
// Promise.all([1, Promise.resolve(2), Promise.reject(3)])
//   .then(v => console.log(v))
//   .catch(v => console.log('err3:', v)); // 输出 err3: 3
Promise.all([
  new Promise((resolve) => {
    setTimeout(() => resolve(1), 500)
  }),
  2,
  Promise.resolve(3)
]).then(v => console.log(v)); // 输出 [1, 2, 3]
