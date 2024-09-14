let p = new Promise((resolve, reject) => {
    reject(222)
})

p.then(null, reason => {
    console.log('p reason:', reason);
})
p.catch(reason => {
    console.log('p reason2:', reason);
})

let p2 = new Promise((resolve, reject) => {
    reject(333)
})

p2.catch(reason => {
    console.log('p2 reason:', reason);
})
p2.then(null, reason => {
    console.log('p2 reason2:', reason);
})

let p3 = new Promise((resolve, reject) => {
    reject(444)
}).then(null, reason => {
    console.log('p3 reason:', reason);
}).catch(reason => {
    console.log('p3 reason2:', reason);
})

