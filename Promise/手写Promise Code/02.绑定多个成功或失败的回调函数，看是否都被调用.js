let p = new Promise((resolve, reject) => {
    resolve(1);
})
p.then(value => {
    console.log('value:', value);
})

p.then(value => {
    console.log('value2:', value);
})

let p2 = new Promise((resolve, reject) => {
    reject(2);
})
p2.catch(reason => {
    console.log('reason:', reason);
})

p2.catch(reason => {
    console.log('reason2:', reason);
})