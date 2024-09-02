function normalFunction() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('Promise Resolved')
        }, 1000)
    })
}
async function normalFunction2() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('Promise Resolved')
        }, 1000)
    })
}
// normalFunction().then(res => {
//     console.log('res:', res);
// })
// const result = normalFunction();
// const result = normalFunction2();

async function asyncWithAwait() {
    const result = await new Promise((resolve) => {
        setTimeout(() => {
            resolve('Promise Resolved');
        }, 1000);
    });
    console.log('res:', result);
    return result;
}
const res = asyncWithAwait();
console.log('res2:', res);
