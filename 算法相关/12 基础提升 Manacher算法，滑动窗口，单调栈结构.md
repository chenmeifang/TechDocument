https://www.bilibili.com/video/BV13g41157hK?p=14&vd_source=a7089a0e007e4167b4a61ef53acc6f7e

![image-20240701113212608](12 基础提升 Manacher算法等.assets/image-20240701113212608.png)

# 1. Manacher算法

重要信息：每一个位置的最长回文半径

# 2. 最长回文子串解法

## 2.1 暴力解法 leetcode O(N^3)

从开头开始循环

https://leetcode.cn/problems/longest-palindromic-substring/?company_slug=bytedanc

```javascript
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
    if (s.length < 2) return s;
    let charArray = Array.from(s)
    let begin = 0;
    let maxLen = 0;
    let validPalindrome = function (charArray, left, right) {
        while (left < right) {
            if (charArray[left] != charArray[right]) {
                return false;
            }
            left++;
            right--
        }
        return true;
    }
    for (let i = 0; i < s.length; i++) {
        for (let j = i; j < s.length; j++) {
            if (j - i + 1 > maxLen && validPalindrome(charArray, i, j)) {
                maxLen = j - i + 1;
                begin = i;
            }
        }
    }
    return s.substring(begin, begin + maxLen)
};
```

## 2.2 中心扩散法 leetcode 经典解法 O(N^2)

leetcode：区分奇数偶数了

b站：扩充字符串

<img src="12 基础提升 Manacher算法等.assets/image-20240701114203419.png" alt="image-20240701114203419" style="zoom: 33%;" />

时间复杂度：O(N*N)

```javascript
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
    if (s.length < 2) return s;
    let charArray = Array.from(s);
    let begin = 0;
    let left = 0;
    let right = 0;
    let tempMaxLen = 1;
    let maxLen = 1;
    let tempS = '#';
    // 中心扩散法
    for (let i = 0; i < s.length; i++) {
        tempS += s[i];
        tempS += '#'
    }
    for (let j = 0; j < tempS.length; j++) {
        left = j - 1;
        right = j + 1;
        while (left >= 0 && right <= tempS.length - 1 && tempS[left] == tempS[right]) {
            tempMaxLen = right - left + 1;
            left--;
            right++;

        }
        if (tempMaxLen > maxLen) {
            begin = left + 1;
            maxLen = tempMaxLen;
        }
    }
    begin = Math.floor(begin / 2);
    maxLen = Math.floor(maxLen / 2);
    console.log(begin, ' ', maxLen);
    return s.substring(begin, begin + maxLen);
};
```

## 2.3 动态规划

## 2.4 Manacher算法 O(N)

时间复杂度：O(N)

和经典解法的处理流程是一样的，只是有**加速**

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







































