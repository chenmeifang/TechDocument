class cPromise {
    // promise核心：就是有状态（准备状态，解决状态，拒绝状态），最终根据状态来改变里面的值
    static PENDING = "pending";
    static FUFILLED = "fulfilled";
    static REJECTED = "rejected";

    constructor(executor) {
        this.status = cPromise.PENDING;
        this.value = null;
        this.callbacks = [];
        try {
            executor(this.resolve, this.reject);
        } catch (error) {
            this.reject(error);
        }
    }

    resolve = (value) => {
        // class类里面默认遵循严格模式
        if (this.status === cPromise.PENDING) {
            this.status = cPromise.FUFILLED;
            this.value = value;
            this.callbacks.map((callback) => {
                queueMicrotask(() => {
                    callback.onFulfilled(this.value);
                });
            });
        }
    };

    reject = (reason) => {
        if (this.status === cPromise.PENDING) {
            this.status = cPromise.REJECTED;
            this.value = reason;
            this.callbacks.map((callback) => {
                queueMicrotask(() => {
                    callback.onRejected(this.value);
                });
            });
        }
    };

    // then方法要返回一个promise
    then(onFulfilled, onRejected) {
        if (typeof onFulfilled !== "function") {
            onFulfilled = () => {
                return this.value;
            };
        }
        if (typeof onRejected !== "function") {
            onRejected = () => {
                return this.value;
            };
        }
        return new cPromise((resolve, reject) => {
            // promise特点：状态改变之后是不能再改了的
            if (this.status === cPromise.FUFILLED) {
                // queueMicrotask 是JS中用于将任务添加到微任务队列的一种方法
                queueMicrotask(() => {
                    try {
                        let result = onFulfilled(this.value);
                        // todo: 这个if else需要更多验证
                        if (result instanceof cPromise) {
                            resolve(result.value);
                        } else {
                            resolve(result);
                        }
                    } catch (error) {
                        reject(error);
                    }
                });
            } else if (this.status === cPromise.REJECTED) {
                queueMicrotask(() => {
                    try {
                        let result = onRejected(this.value);
                        resolve(result);
                    } catch (error) {
                        reject(error);
                    }
                });
            } else if (this.status === cPromise.PENDING) {
                // 场景：不是直接调用resolve，而是在setTimeout中调用resolve
                // 此时不能直接调用onFulfilled或onRejected
                this.callbacks.push({
                    onFulfilled: (value) => {
                        try {
                            let result = onFulfilled(value);
                            resolve(result);
                        } catch (error) {
                            reject(error);
                        }
                    },
                    onRejected: (reason) => {
                        try {
                            let result = onRejected(reason);
                            resolve(result);
                        } catch (error) {
                            reject(error);
                        }
                    },
                });
            }
        });
    }
}
// resolve，reject这两个方法外面是没有的，所以肯定是类内部提供的
let p = new cPromise((resolve, reject) => {
    // setTimeout(() => {
    //     resolve("解决");
    //     console.log("向军大叔");
    // }, 1000);
    resolve("解决");
    // reject(222);
})
    // .then()
    .then(
        (res) => {
            console.log("res:", res);
            // throw new Error('错误');
            return "第二个值";
        },
        (reason) => {
            console.log("reason:", reason);
        }
    )
    .then(
        (res) => {
            console.log("res2:", res);
            return new cPromise((resolve) => {
                resolve("向军大叔");
            });
        },
        (reason) => {
            console.log("reason2:", reason);
        }
    )
    .then((res) => {
        console.log("res3:", res);
    });
// console.log('后盾人');
// .catch((error) => {
//     console.log("error:", error);
// });
// console.log("p:", p);
