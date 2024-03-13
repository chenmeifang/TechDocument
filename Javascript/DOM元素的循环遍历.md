 https://www.cnblogs.com/ainyi/p/13086349.html

https://www.jianshu.com/p/f6ff5ebe45fd

https://stackoverflow.com/questions/15763358/difference-between-htmlcollection-nodelists-and-arrays-of-objects

```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div>22</div>
    <div>44</div>
    <div>33</div>
    <script>
        let res = document.getElementsByTagName('div')
        console.log('res:',res)
        res.forEach(ele => {
            console.log('ele:',ele)
        })
    </script>
</body>
</html>
```

Uncaught TypeError: res.forEach is not a function at closure.html:15

```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div>22</div>
    <div>44</div>
    <div>33</div>
    <script>
        document.querySelectorAll('div').forEach(ele => {
            console.log('ele:',ele)
        })
    </script>
</body>
</html>
```

用forEach可以正常遍历

获取 DOM 元素的几种方式：

**get 方式：**get 方式获取的 dom 元素，仅可使用for-in、for-of、for循环

1. getElementById
2. getElementsByTagName
3. getElementsByClassName
4. getElementsByName

返回类型 **HTMLCollection[]**

------

**query 方式：**query 方式获取的 dom 元素，可使用forEach、for-in、for-of、for循环

1. querySelector
2. querySelectorAll

返回类型 NodeList[]

***HTMLCollection和NodeList*本质上的不同：**

Both interfaces are *collections* of DOM nodes. They differ in the methods they provide and in the type of nodes they can contain. 

While a `NodeList` can contain any node type, an `HTMLCollection` is supposed to only contain Element nodes.

常用JS节点类型有哪些？

1. **元素节点（标签）** nodetype=1 

   1. 元素节点获取方法：Document.getElementById()
   2. Document.getElementsByClassName()
   3. Document.getElementsByTagName()
   4. Document.querySelector()
   5. Document.querySelectorAll()

2. **文本节点** nodetype=3  没有获取的方法

3. 属性节点（标签里的属性）nodetype=2

   1. 属性节点获取方法：元素.attributes 获取元素身上所有属性构成的集合
   2. 元素.setAttribute（“属性名”，“属性值”）给元素设置属性和属性值
   3. 元素.getAttribute（“属性名”）获取属性值的方法
   4. 元素.removerAttribute("属性")删除属性


**1.HTMLCollection有namedItem方法，NodeList没有namedItem方法**

```html
<body>
    <div name="test">22</div>
    <script>
        let res = document.getElementsByTagName('div')
        console.log('res:',res)
        let res1 = document.querySelectorAll('div')
        console.log('res1:',res1)
    </script>
</body>
```

**2.包含节点类型不同**：`NodeList`可以包含任何节点类型，`HTMLCollection`只包含元素节点（ElementNode)

```javascript
<body>
    <div id="ct">
        <p>jjj</p>
        kkkk
    </div>
    <script>
        var res = document.getElementById("ct");
        console.log('res:',res.children)
        console.log('res:',res.childNodes)
    </script>
</body>
```

---



**get 方式：**get 方式获取的 dom 元素，仅可使用for-in、for-of、for循环

**query 方式：**query 方式获取的 dom 元素，可使用forEach、for-in、for-of、for循环

# ES6将集合 转换成 普通数组：

根据__proto__可以看出HTMLCollection不是数组，是类数组——类数组对象，最基本的要求就是具有length属性的对象。

（1）ES6 提供了 Array.from() 方法可将这些集合转换成普通数组，这样就可以享用数组的各种方法了

```js
let array = Array.from(a)
// 　　Array.from()方法就是将一个类数组对象或者可遍历对象转换成一个真正的数组。
```

（2）

```javascript
Array.prototype.slice.call（elems);
```

(3)用[ ...elems ]方法转化为数组
