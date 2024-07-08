/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function (target, nums) {
    let left = 0; // 表示左指针
    let right = -1; // 表示右指针
    let account = nums.length; // 最小子数组长度
    let sum = 0;
    while (right < nums.length) {
        console.log('right:', right)
        while (sum < target) {
            right++;
            sum += nums[right];
        }
        account = Math.min(right - left + 1, account);
        sum -= nums[left];
        left++;
    }
    return account;
};
minSubArrayLen(7, [2, 3, 1, 2, 4, 3])