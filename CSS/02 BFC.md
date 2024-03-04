https://www.bilibili.com/video/BV18L4y1N7g3/?spm_id_from=333.880.my_history.page.click&vd_source=a7089a0e007e4167b4a61ef53acc6f7e

 视频2min处正式开始

# 1. **FC——格式化上下文**

![image-20240303235300519](02 BFC.assets/image-20240303235300519.png)

![image-20240303234851548](02 BFC.assets/image-20240303234851548.png)

# 2. BFC——块级格式化上下文

> [官方文档](https://www.w3.org/TR/CSS2/visuren.html#normal-flow)
>
> [字节跳动前端面试题](https://www.cnblogs.com/yaya-003/p/12652177.html)

2.1 BFC是什么？——块级元素所在的布局就叫BFC



<img src="02 BFC.assets/image-20240304000107837.png" alt="image-20240304000107837" style="zoom:150%;" />



![image-20240304000825243](02 BFC.assets/image-20240304000825243.png)



![image-20240304001057024](02 BFC.assets/image-20240304001057024.png)



# 3. BFC有什么作用，能解决什么问题？

## 3.1 解决margin的折叠问题

![image-20240304201824000](02 BFC.assets/image-20240304201824000.png)

## 3.2 解决浮动高度塌陷问题

![image-20240201232505662](02 BFC.assets/image-20240201232505662.png)



![image-20240201232532048](02 BFC.assets/image-20240201232532048.png)



### 3.2.1 现象

看不见父元素的背景色，因为**浮动元素脱离标准流**，就不会将高度汇报给父元素。所以最终父元素没有高度。

怎么解决高度塌陷的问题？

### 3.2.2 方案一：清除浮动

![image-20240201233427743](02 BFC.assets/image-20240201233427743.png)

![image-20240201233540994](02 BFC.assets/image-20240201233540994.png)

为什么伪元素这个有用？？？

### 3.2.3 方案二： 给container加’overflow：auto‘

加’overflow：auto‘后会形成一个新的BFC

![image-20240304203416798](02 BFC.assets/image-20240304203416798.png)

https://www.w3.org/TR/CSS2/visudet.html#root-height

![image-20240304205229829](02 BFC.assets/image-20240304205229829.png)









