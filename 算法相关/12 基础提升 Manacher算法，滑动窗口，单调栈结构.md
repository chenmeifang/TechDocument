https://www.bilibili.com/video/BV13g41157hK?p=14&vd_source=a7089a0e007e4167b4a61ef53acc6f7e

![image-20240701113212608](12 基础提升 Manacher算法等.assets/image-20240701113212608.png)

https://www.bilibili.com/video/BV13g41157hK/?p=14&vd_source=a7089a0e007e4167b4a61ef53acc6f7e

# 1. 最长回文子串经典解法

![image-20240701114203419](12 基础提升 Manacher算法等.assets/image-20240701114203419.png)

时间复杂度：O(n*n)

# 2. 相关重要概念

- 回文直径
- 回文半径
- 之前扩的所有位置中，所到达的最右回文右边界





- 第一种情况：当来到某一个中心点的时候，这个点没有在‘最右回文右边界’里。此时，暴力扩
- 第二种情况：当来到某一个中心点的时候，这个点在‘最右回文右边界’里。此时，有下图所示关系：

- <img src="12 基础提升 Manacher算法等.assets/image-20240701163741718.png" alt="image-20240701163741718" style="zoom:25%;" />
  - 2.1 i的回文区域在LR范围内 <img src="12 基础提升 Manacher算法等.assets/image-20240701164524933.png" alt="image-20240701164524933" style="zoom:25%;" />
  - 
  - 2.2 i的回文区域不在LR范围内 <img src="12 基础提升 Manacher算法等.assets/image-20240701170310072.png" alt="image-20240701170310072" style="zoom:25%;" />
  - 
  - 2.3 i的回文区域跟L压线 <img src="12 基础提升 Manacher算法等.assets/image-20240701183039902.png" alt="image-20240701183039902" style="zoom:25%;" />



用来分析时间复杂度的伪代码：

 <img src="12 基础提升 Manacher算法等.assets/image-20240701183846649.png" alt="image-20240701183846649" style="zoom:50%;" />

<img src="12 基础提升 Manacher算法等.assets/image-20240701190222771.png" alt="image-20240701190222771" style="zoom:33%;" />



<img src="12 基础提升 Manacher算法等.assets/image-20240701190522583.png" alt="image-20240701190522583" style="zoom:50%;" />

<img src="12 基础提升 Manacher算法等.assets/image-20240701190743395.png" alt="image-20240701190743395" style="zoom:50%;" />

# 3. 滑动窗口

1小时40min处

<img src="12 基础提升 Manacher算法等.assets/image-20240701204330167.png" alt="image-20240701204330167" style="zoom: 50%;" />

双端队列

<img src="12 基础提升 Manacher算法等.assets/image-20240701211446359.png" alt="image-20240701211446359" style="zoom: 33%;" />

<img src="12 基础提升 Manacher算法等.assets/image-20240701212559064.png" alt="image-20240701212559064" style="zoom: 50%;" />



# 4. 单调栈结构

2小时11min处

<img src="12 基础提升 Manacher算法等.assets/image-20240701212807305.png" alt="image-20240701212807305" style="zoom: 33%;" />



<img src="12 基础提升 Manacher算法等.assets/image-20240701213135222.png" alt="image-20240701213135222" style="zoom: 33%;" />



![image-20240701214634487](12 基础提升 Manacher算法等.assets/image-20240701214634487.png)







































