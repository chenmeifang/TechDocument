new Promise((resolve, reject) => {
    resolve(111);
}).then(value => {
    console.log('resolved:', value);
    // return 222; // 情况1
    // return Promise.resolve(222); // 情况2
    // return Promise.reject(3333); // 情况3
    throw 5; // 情况4
}).then(value => {
    console.log('resolved2:', value);
}, reason => {
    console.log('rejected:', reason);
})