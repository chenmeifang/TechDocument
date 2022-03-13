```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <button class="btn">按钮</button>
    <script>
        let btn = document.querySelector('.btn')
        console.log('btn:',btn)
        btn.addEventListener('click', (event) => {
            console.log('event:',event)
            console.log('currentTarget:',event.currentTarget)
            console.log('target:',event.target)
        })
    </script>
</body>
</html>
```

上述代码情况下：![截屏2021-03-06 下午5.55.29](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-03-06 下午5.55.29.png)





```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <button class="btn">
        <p class="p" style="margin:20px">pppppp</p>
    </button>
    <script>
        let btn = document.querySelector('.btn')
        console.log('btn:',btn)
        btn.addEventListener('click', (event) => {
            console.log('event:',event)
            console.log('currentTarget:',event.currentTarget)
            console.log('target:',event.target)
        })
    </script>
</body>
</html>
```

上述代码情况下：

* 点击里面的p标签时：![截屏2021-03-06 下午5.58.34](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-03-06 下午5.58.34.png)
* 点击外面的btn时：![截屏2021-03-06 下午5.59.03](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-03-06 下午5.59.03.png)

总结：

* target是事件`触发`的真实元素
* curretTarget是事件`绑定`的元素
* 事件处理函数中的this指向curretTarget































