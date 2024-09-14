class nPromise {
    static PENDING = "pending";
    static FUFILLED = "fulfilled";
    static REJECTED = "rejected";

    constructor(executor) {
        this.value = null;
        this.status = nPromise.PENDING;
        this.callbacks = [];
        executor(this.resolve, this.reject);
    }

    resolve = (value) => {
        if (this.status === nPromise.PENDING) {
            this.status = nPromise.FUFILLED;
            this.value = value;
            this.callbacks.map(callback => {
                // 问题一：这里需要加入queueMicrotask吗？营造一个需要的场景！
                // 回答：需要，在setTimeout里的resolve后面加一个语句，看执行顺序
                queueMicrotask(() => {
                    callback.onFulfilled(this.value);
                })
            })
        }
    }

    reject = (reason) => {
        if (this.status === nPromise.PENDING) {
            this.status = nPromise.REJECTED;
            this.value = reason;
            this.callbacks.map(callback => {
                queueMicrotask(() => {
                    callback.onRejected(this.value);
                })
            })
        }
    }

    then(onFulfilled, onRejected) {
        if (typeof onFulfilled !== "function") {
            onFulfilled = () => { return this.value; }
        }
        if (typeof onRejected !== "function") {
            onRejected = () => { throw this.value; }
        }
        return new nPromise((resolveFn, rejectFn) => {
            // 问题：什么时候调用新promise的resolveFn，什么时候调用新promise的rejectFn
            // 回答：在onFulfilled或者onRejected执行完后，就需要调用resolveFn或rejectFn去更改新Promise的状态
            if (this.status === nPromise.FUFILLED) {
                queueMicrotask(() => {
                    try {
                        let res = onFulfilled(this.value);
                        if (res instanceof nPromise) {
                            resolveFn(res.value);
                        } else {
                            resolveFn(res);
                        }
                    } catch (error) {
                        rejectFn(error);
                    }
                })
            } else if (this.status === nPromise.REJECTED) {
                queueMicrotask(() => {
                    try {
                        let res = onRejected(this.value);
                        if (res instanceof nPromise) {
                            resolveFn(res.value);
                        } else {
                            resolveFn(res);
                        }
                    } catch (error) {
                        rejectFn(error);
                    }

                })
            } else if (this.status === nPromise.PENDING) {
                // 把onFulfilled, onRejected暂存起来，等到resolve或者reject调用的时候执行
                this.callbacks.push({
                    onFulfilled: () => {
                        try {
                            let res = onFulfilled(this.value);
                            if (res instanceof nPromise) {
                                resolveFn(res.value);
                            } else {
                                resolveFn(res);
                            }
                        } catch (error) {
                            rejectFn(error);
                        }
                    },
                    onRejected: () => {
                        try {
                            let res = onRejected(this.value);
                            if (res instanceof nPromise) {
                                resolveFn(res.value);
                            } else {
                                resolveFn(res);
                            }
                        } catch (error) {
                            rejectFn(error);
                        }
                    }
                })
            }
        })
    }

    catch(onRejected) {
        return this.then(null, onRejected);
    }

    static resolve(value) {
        return new nPromise((resolveFn, rejectFn) => {
            resolveFn(value);
        });
    }

    static reject(reason) {
        return new nPromise((resolveFn, rejectFn) => {
            rejectFn(reason);
        })
    }

    // 谁快用谁
    static race(promises) {
        return new nPromise((resolve, reject) => {
            promises.map(promise => {
                promise.then(value => {
                    resolve(value);
                }, reason => {
                    reject(reason);
                })
            });
        })
    }

    static all(promises) {
        return new nPromise((resolve, reject) => {
            const values = [];
            promises.forEach(promise => {
                promise.then(value => {
                    values.push(value);
                    if (values.length === promises.length) {
                        resolve(values);
                    }
                }, reason => {
                    reject(reason);
                })
            });
        })
    }
}

let np1 = new nPromise(resolve => {
    setTimeout(() => {
        resolve(22);
    }, 2000)
})
let np2 = new nPromise((resolve, reject) => {
    setTimeout(() => {
        resolve(333);
    }, 1000)
    // reject(333);
})
// nPromise.all([np1, np2]).then(value => {
//     console.log('手写value:', value);
// }, reason => {
//     console.log('手写reason:', reason);
// })
nPromise.race([np1, np2]).then(value => {
    console.log('手写value:', value);
}, reason => {
    console.log('手写reason:', reason);
})
// let p1 = new nPromise((resolve, reject) => {
//     // setTimeout(() => {
//     //     resolve(111);
//     //     // console.log('手写promise-----------');
//     // })
//     // resolve(111);
//     reject(111);
// }).then().then(value => {
//     console.log('手写promise value:', value);
//     // throw 5;
//     return nPromise.resolve(222);
// }, reason => {
//     console.log('手写promise reason:', reason);
// })
// console.log('手写promise:', p1);

// let p1 = new nPromise((resolve, reject) => {
//     reject(111);
// }).then(value => {
//     console.log('手写promise value:', value);
// }).catch(reason => {
//     console.log('手写promise reason:', reason);
// })


// console.log('手写promise:', p1);
