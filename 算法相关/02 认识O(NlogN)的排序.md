https://www.bilibili.com/video/BV13g41157hK?p=4&spm_id_from=pageDriver&vd_source=a7089a0e007e4167b4a61ef53acc6f7e

# 1. arr[L..R]范围上求最大值

可以数组从左往右遍历一遍，记录最大值就行了

为了讲递归，写一个递归版本的：

![image-20230903133800858](02 认识O(NlogN)的排序.assets/image-20230903133800858-16937194822711.png)

### 取L R中点 

```java
int mid = (L + R) / 2; // 这样写其实是有问题的，如果数组长度比较大，L+R可能会溢出
int mid = (L + R) / 2 = L + (R - L) / 2
int mid = L + ((R - L) >> 1) // 右移一位，右移一位比除2要快
```

<img src="算法相关图片/image-20240705134149617.png" alt="image-20240705134149617" style="zoom: 30%;" />



# 2. master公式

17min处

<img src="算法相关图片/image-20240705134451065.png" alt="image-20240705134451065" style="zoom:40%;" />

- T(N)：母问题的数据量是N级别的
- T(N/b)：子问题的规模是N/b
- a: 子问题的调用次数
- N^b：除去子问题调用之外剩下的过程

<img src="算法相关图片/image-20240705142054758.png" alt="image-20240705142054758" style="zoom:25%;" />                  <img src="算法相关图片/image-20240705142551704.png" alt="image-20240705142551704" style="zoom: 25%;" />

# 3. 归并排序 O(N * logN)

<img src="算法相关图片/image-20240705142809138.png" alt="image-20240705142809138" style="zoom: 50%;" /> 

**双指针**

<img src="算法相关图片/image-20240705143033371.png" alt="image-20240705143033371" style="zoom: 33%;" />

<img src="02 认识O(NlogN)的排序.assets/image-20231224110335714.png" alt="image-20231224110335714" style="zoom:50%;" />

<img src="02 认识O(NlogN)的排序.assets/image-20231224202936100.png" alt="image-20231224202936100" style="zoom:50%;" />

P1：左侧部分的下标

P2：右侧部分的下标

<img src="02 认识O(NlogN)的排序.assets/image-20231224204627946.png" alt="image-20231224204627946" style="zoom:33%;" />

# 4. 归并排序的扩展——小和问题

1h01min处

<img src="算法相关图片/image-20240705163940762.png" alt="image-20240705163940762" style="zoom:40%;" />

<img src="算法相关图片/image-20240705164418132.png" alt="image-20240705164418132" style="zoom: 33%;" />

<img src="算法相关图片/image-20240705165905422.png" alt="image-20240705165905422" style="zoom:50%;" />

<img src="算法相关图片/image-20240705165935646.png" alt="image-20240705165935646" style="zoom:50%;" />

# 5. 归并排序的扩展——逆序对问题

1h28min处

![image-20240705170140622](算法相关图片/image-20240705170140622.png)

# 6. 荷兰国旗问题

1h40min处

![image-20240705170540744](算法相关图片/image-20240705170540744.png)<img src="算法相关图片/image-20240705173348923.png" alt="image-20240705173348923" style="zoom: 25%;" />



  <img src="算法相关图片/image-20240705173650692.png" alt="image-20240705173650692" style="zoom:33%;" />

# 7. 快速排序 O(N*N)

2h02min处

<img src="算法相关图片/image-20240705174415175.png" alt="image-20240705174415175" style="zoom: 33%;" />

<img src="算法相关图片/image-20240705174534728.png" alt="image-20240705174534728" style="zoom:33%;" />

<img src="算法相关图片/image-20240705180503452.png" alt="image-20240705180503452" style="zoom: 33%;" />

<img src="算法相关图片/image-20240705181514030.png" alt="image-20240705181514030" style="zoom:33%;" />

<img src="算法相关图片/image-20240705181546845.png" alt="image-20240705181546845" style="zoom:50%;" />

<img src="算法相关图片/image-20240705181610607.png" alt="image-20240705181610607" style="zoom: 50%;" />

# Master定理

https://blog.gocalf.com/algorithm-complexity-and-master-theorem

https://www.bilibili.com/video/BV1oq4y167oR/?spm_id_from=333.337.search-card.all.click&vd_source=a7089a0e007e4167b4a61ef53acc6f7e

用n表示问题的规模，T(n)表示某个给定算法的复杂度。

![image-20231224210203957](02 认识O(NlogN)的排序.assets/image-20231224210203957.png)

![image-20231224205445342](02 认识O(NlogN)的排序.assets/image-20231224205445342.png)

![image-20231224210217937](02 认识O(NlogN)的排序.assets/image-20231224210217937.png)

![image-20231224210542541](02 认识O(NlogN)的排序.assets/image-20231224210542541.png)

![image-20231224210937979](02 认识O(NlogN)的排序.assets/image-20231224210937979.png)

![image-20231224211614637](02 认识O(NlogN)的排序.assets/image-20231224211614637.png)

































​	











