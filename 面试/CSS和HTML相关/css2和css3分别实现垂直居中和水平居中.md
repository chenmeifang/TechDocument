* 哪写方法属于css2，哪些方法属于css3？
* https://blog.csdn.net/qq_36742720/article/details/96507307

方法一：css3

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .outer{
            width: 400px;
            height: 400px;
            background: #000;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .inner{
            width: 100px;
            height: 100px;
            background: pink;
        }
    </style>
</head>
<body>
    <div class="outer">
        <div class="inner"></div>
    </div>
</body>
</html>
```

方法二：css2

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .outer{
            width: 400px;
            height: 400px;
            background: #000;
            position: relative;
        }
        .inner{
            width: 100px;
            height: 100px;
            background: pink;
            position: absolute;
            top:50%;
            left:50%;
            margin-left: -50px;
            margin-top: -50px;
        }
    </style>
</head>
<body>
    <div class="outer">
        <div class="inner"></div>
    </div>
</body>
</html>
```

方法三：css2

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .outer{
            width: 400px;
            height: 400px;
            background: #000;
            position: relative;
        }
        .inner{
            width: 100px;
            height: 100px;
            background: pink;
            position: absolute;
            top:50%;
            left:50%;
            transform: translate(-50%, -50%);
        }
    </style>
</head>
<body>
    <div class="outer">
        <div class="inner"></div>
    </div>
</body>
</html>
```

方法四：css2

https://segmentfault.com/q/1010000013545080?utm_source=sf-similar-question

https://www.w3.org/TR/CSS21/visudet.html#abs-non-replaced-width

```
left + 
margin-left + 
border-left + 
padding-left + 
width + 
padding-right +
border-right +
margin-right +
right = 
包含块

margin-left + 
width + 
margin-right = 
包含块

width为定值，padding, border默认为0/none，left、right为0，那么margin-left和margin-right为auto，则平分剩余空间，居中。

```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .outer{
            width: 400px;
            height: 400px;
            background: #000;
            position: relative;
        }
        .inner{
            width: 100px;
            height: 100px;
            background: pink;
            position: absolute;
            top:0;
            bottom: 0;
            left:0;
            right: 0;
            margin: auto;
        }
    </style>
</head>
<body>
    <div class="outer">
        <div class="inner"></div>
    </div>
</body>
</html>
```

方法五： **转换属性为表格单元格**

1. 父元素 设置 table-cell 子元素设置 行内块

2. 父元素 行居中 垂直居中*
3. https://www.css88.com/archives/6308
4. https://www.cnblogs.com/yangshifu/p/6954364.html

```
table    { display: table } // 指定对象作为块元素级的表格
tr       { display: table-row }
thead    { display: table-header-group }
tbody    { display: table-row-group }
tfoot    { display: table-footer-group }
col      { display: table-column }
colgroup { display: table-column-group }
td, th   { display: table-cell } // 指定对象作为表格单元格
caption  { display: table-caption } // 指定对象作为表格标题
```



```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .outer{
            width: 400px;
            height: 400px;
            background: #000;
            display: table-cell;
            vertical-align: middle;
            text-align: center;
        }
        .inner{
            width: 100px;
            height: 100px;
            background: pink;
            display: inline-block;
        }
    </style>
</head>
<body>
    <div class="outer">
        <div class="inner"></div>
    </div>
</body>
</html>
```





































