// www.baidu.com
// com.baidu.www
function test (str) {
    let strArray = str.split('.');
    console.log('strArray:', strArray);
    let tempArray = []
    strArray.forEach(element => {
        tempArray.unshift(element)
    });
    console.log('tempArray:',tempArray)
    return tempArray.join('.')
}
console.log(test('www.baidu.com'))
/**
 * 分析：
 * 当前的实现通过 split 将字符串转换为数组，
 * 然后使用 forEach 和 unshift 反转数组，
 * 最后通过 join 重新组合成字符串。
 * 这个过程的时间复杂度为 O(n^2)，
 * 因为 unshift 操作在最坏情况下需要移动整个数组。？？？为什么？？？
 */

/**
 * 我们可以通过更高效的方式来优化时间复杂度，将其降低到 O(n)。
 * 以下是优化后的代码：
 */

function test(str) {
    return str.split('.').reverse().join('.');
}

console.log(test('www.baidu.com'));

/**
 * 分析：
 * split('.'): 将字符串按 . 分割成数组，时间复杂度为 O(n)，其中 n 是字符串的长度。
 * reverse(): 反转数组，时间复杂度为 O(n)。????
 * join('.'): 将数组重新拼接成字符串，时间复杂度为 O(n)。
 * 优化后的代码整体时间复杂度为 O(n)，比原代码更高效。
 * 通过使用 reverse() 方法，我们避免了 unshift 的开销，从而提升了代码的性能
 */