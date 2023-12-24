# 一 arr[L..R]范围上求最大值

![image-20230903133800858](02 认识O(NlogN)的排序.assets/image-20230903133800858-16937194822711.png)

### 取L R中点：

```java
int mid = (L + R) / 2; // 这样写其实是有问题的，如果数组长度比较大，L+R可能会溢出
int mid = (L + R) / 2 = L + (R - L) / 2
int mid = L + ((R - L) >> 1) // 右移一位，右移一位比除2要快
```

# 二 归并排序

**归并排序的时间复杂度==O(NlogN)==**

**双指针**

![image-20231224200747597](02 认识O(NlogN)的排序.assets/image-20231224200747597.png)

![image-20231224110335714](02 认识O(NlogN)的排序.assets/image-20231224110335714.png)

![image-20231224202936100](02 认识O(NlogN)的排序.assets/image-20231224202936100.png)

P1：左侧部分的下标

P2：右侧部分的下标

考虑P1怎么样算越界？

![image-20231224204627946](02 认识O(NlogN)的排序.assets/image-20231224204627946.png)

# 三 Master定理

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











