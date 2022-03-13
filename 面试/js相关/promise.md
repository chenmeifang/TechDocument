# 1.Promise如何实现串行和并行？

https://blog.csdn.net/qq_36356218/article/details/87694366

promise是针对异步请求的，这里也针对异步请求来展开。

==并行：==多个异步请求同时进行

==串行：==一个异步请求完了之后在进行下一个请求

```js
// 并行：      
var promises = function () {
        return [1000, 2000, 3000].map(current => {
          return new Promise(function (resolve, reject) {
            setTimeout(() => {
              console.log(current)
            }, current)
          })
        })
      }
 
      Promise.all(promises()).then(() => {
        console.log('end')
      })
```

```js
// 串行      
var p = function () {
        return new Promise(function (resolve, reject) {
          setTimeout(() => {
            console.log('1000')
            resolve()
          }, 1000)
        })
      }
      var p1 = function () {
        return new Promise(function (resolve, reject) {
          setTimeout(() => {
            console.log('2000')
            resolve()
          }, 2000)
        })
      }
      var p2 = function () {
        return new Promise(function (resolve, reject) {
          setTimeout(() => {
            console.log('3000')
            resolve()
          }, 3000)
        })
      }
 
 
      p().then(() => {
        return p1()
      }).then(() => {
        return p2()
      }).then(() => {
        console.log('end')
      })
```

-----

https://www.jianshu.com/p/dbda3053da20

##### 1.Promise.all 并行执行promise

> getA和getB并行执行，然后输出结果。如果有一个错误，就抛出错误

---

promise并行的应用：

有三个接口同时去请求数据，需要等到这三个接口拿到全部数据后刷新页面，取消loading效果。

# 2.promise如何限制并发数？

https://www.bilibili.com/video/BV11f4y117qp?from=search&seid=6125908412523921170

```js
class Scheduler {
    // 需要一个列表来保存添加进来的promise
    list = [];
    maxNum = 2;
    workingNum = 0;
    add(promiseCreator) {
        this.list.push(promiseCreator)
    }
    start () {
        // requestAnimationFrame
        for(let i = 0; i < this.maxNum; i++) {
            this.doNext()
        }
    }
    doNext () {
        if (this.list.length && this.workingNum < this.maxNum) {
            this.workingNum++
            this.list.shift()().then(() => {
                this.workingNum--;
                this.doNext()
            })
        }
    }
}

// 生成promise
const timeout = time => {
    return new Promise(resolve => {
        setTimeout(resolve,time)
    })
}

const scheduler = new Scheduler()

const addTask = (time, order) => {
    scheduler.add(() => timeout(time).then(() => console.log(order)))
}

addTask(1000,1)
addTask(500,2)
addTask(300,3)
addTask(400,4)
scheduler.start()
```

https://segmentfault.com/a/1190000016389127

另一种说法：

我们知道，==promise并不是因为调用`Promise.all`才执行，而是在实例化promise对象的时候就执行了，在理解这一点的基础上，要实现并发限制，只能从promise实例化上下手。==

换句话说，就是**==把生成`promises`数组的控制权，交给并发控制逻辑。==**！！！！！！



























