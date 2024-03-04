display : block 块级元素

- 处于常规流中，如果width没有设置，会自动填满父容器(宽度缺省是它容器的100%，除非设定一个宽度。)

- margin和padding都有效

- > 常见的block元素：div,dl,form,h1,h2,h3,h4,h5,h6,hr,p,ul,table,menu

display : inline-block 行块级元素

- 如果width没有设置，就不显示
- margin和padding都有效

display：inline 行级元素

- 不能设置width和height属性，宽高由元素内容决定

- margin只在水平方向生效，在垂直方向不生效；padding生效

- 浮动或绝对定位时会转换为block（使用float，该行的display属性会被赋予block属性，且拥有浮动特性；；当行内元素进行定位时，position:absolut,position:fixed，都会使原先的行内元素变成块级元素。）

- > 常见的inline元素：br,em,i,img,input,lable,span,strong

display：none

* 元素不会显示，而且该元素现实的空间也不会保留。但有另外一个 visibility: hidden， 是保留元素的空间的；

display：inherit

* inherit：规定应该从父元素继承 display 属性的值。



vertical-align属性：

只要在父级div元素身上加了下面这两个属性，子级div元素不管是inline，block，inline-block其垂直居中效果都会生效。

vertical-align: middle; display: table-cell;