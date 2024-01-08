https://developer.mozilla.org/zh-CN/docs/Web/CSS/box-sizing

在 [CSS 盒子模型](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Model/Introduction_to_the_CSS_box_model)的默认定义里，你对一个元素所设置的 [`width`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/width) 与 [`height`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/height) 只会应用到这个元素的内容区。如果这个元素有任何的 [`border`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border) 或 [`padding`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/padding) ，绘制到屏幕上时的盒子宽度和高度会加上设置的边框和内边距值。这意味着当你调整一个元素的宽度和高度时需要时刻注意到这个元素的边框和内边距。当我们实现响应式布局时，这个特点尤其烦人。

- 元素默认应用了box-sizing: content-box。如果你设置一个元素的宽为100px，那么这个元素的内容区会有100px 宽，并且任何边框和内边距的宽度都会被增加到最后绘制出来的元素宽度中。
- box-sizing: border-box改变计算元素width和height的方式，border和padding的大小也将计算在内（不包括margin）。
  - 如果你将一个元素的width设为100px，那么这100px会包含它的border和padding，内容区的实际宽度是width减去(border + padding)的值





content-box：默认值，标准盒子模型。 [`width`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/width) 与 [`height`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/height) 只包括内容的宽和高， 不包括边框（border），内边距（padding），外边距（margin）。注意: 内边距、边框和外边距都在这个盒子的外部。 比如说，`.box {width: 350px; border: 10px solid black;}` 在浏览器中的渲染的实际宽度将是 370px。

尺寸计算公式：

`width` = 内容的宽度

`height` = 内容的高度

宽度和高度的计算值都不包含内容的边框（border）和内边距（padding）。



 border-box： [`width`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/width) 和 [`height`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/height) 属性包括内容，内边距和边框，但不包括外边距。这是当文档处于 Quirks模式 时Internet Explorer使用的[盒模型](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Model/Introduction_to_the_CSS_box_model)。注意，填充和边框将在盒子内 , 例如, `.box {width: 350px; border: 10px solid black;}` 导致在浏览器中呈现的宽度为350px的盒子。内容框不能为负，并且被分配到0，使得不可能使用border-box使元素消失。

尺寸计算公式：

*`width` = border + padding + 内容的宽度*

*`height` = border + padding + 内容的高度*

```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        body{ 
            padding:0;
            margin:0; 
        }
        #my-deﬁned{ 
            width:100px; 
            height:100px; 
            padding:0 100px; 
            margin:10px 20px 30px 40px; 
            border:1px solid red; 
            background:orange;
            /* box-sizing: content-box; */
            /* 302 * 102 */

            box-sizing: border-box; 
            /* 202 * 100  */
        }
    </style>
</head>
<body>
    <div id="my-deﬁned"></div>
</body>
</html>
```

