行内元素的权重：1000    指在标签里面写style <div style="color:black"></div>

id的权重：0100

class的权重  和 类属性值的权重：0010

标签的权重 和 伪元素的权重：0001

*的权重：0000

# CSS选择器

https://blog.csdn.net/SBTOC/article/details/105946635

* id选择器(#myid)

* 类选择器(.myclassname)

* 标签选择器(div, h1, p)

* ==相邻选择器(h1 + p)== 

  * https://www.w3school.com.cn/css/css_selector_adjacent_sibling.asp

  * 如果需要选择紧接在另一个元素后的元素，而且二者有相同的父元素，可以使用相邻兄弟选择器（Adjacent sibling selector）。

  * 例如，如果要增加紧接在 h1 元素后出现的段落的上边距，可以这样写：

  * ```
    h1 + p {margin-top:50px;}
    ```

  * 这个选择器读作：“选择紧接在 h1 元素后出现的段落，h1 和 p 元素拥有共同的父元素”。

* ==子元素选择器（ul > li）==

* ==后代选择器（li a）==

  * 后代不仅包括子，还包括孙子！

* 通配符选择器（*）

* ==属性选择器（a[rel=”external”]）== 

  * **属性选择器可以根据元素的属性及属性值来选择元素。**

  * ```html
    <html>
    <head>
    <style type="text/css">
    [title] {color:red;}
    </style>
    </head>
    <body>
    <h1>可以应用样式：</h1>
    <h2 title="Hello world">Hello world</h2>
    <a title="W3School" href="http://w3school.com.cn">W3School</a>
    <hr />
    <h1>无法应用样式：</h1>
    <h2>Hello world</h2>
    <a href="http://w3school.com.cn">W3School</a>
    </body>
    </html>
    ```

* ==伪类选择器（a:hover, li:nth-child）==

* ==伪元素选择器（::before, ::after）==































