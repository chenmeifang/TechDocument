/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
    // 使用滑动窗口
    const tempSet = new Set(); // 哈希集合，记录每个字符是否出现过
    // 右指针
    let right = -1;
    let ans = 0;
    // i++：先置后增
    // ++i：先增后置
    // for循环执行顺序：1.初始化 let i = 0; 2.条件检查 在每次循环迭代开始时执行 3.循环体 4.增量
    for (let i = 0; i < s.length; i++) {
        // 左指针向右移动一格，移除一个字符
        tempSet.delete(s.charAt(i - 1))
        // 什么情况下停止移动右指针：遇到了重复的字符串
        while (right < s.length - 1 && !tempSet.has(s.charAt(right + 1))) {
            // 不断的移动右指针
            // charAt
            tempSet.add(s.charAt(right + 1));
            right++;
        }
        // 第 i 到 right 个字符是一个极长的无重复字符子串
        ans = Math.max(ans, right - i + 1)
        console.log('i:', i)
    }
    console.log('right:', right)
    return ans;
};

let ans = lengthOfLongestSubstring("bbbbbb");
console.log(ans)