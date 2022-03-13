```js
/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number[]}
 */
var getLeastNumbers = function(arr, k) {
    // 可以试一下大顶堆排序 和 快速排序！！！！看一下哪个快！！！！
    
    // 将i结点以下的堆整理成大顶堆
    function shiftDown (arr,i, length) {
        let temp = arr[i] // 当前父结点
        for(let j = 2 * i + 1; j < length; j = 2 * j + 1) {
            // 比较父节点的左右两个结点
            if (j + 1 < length && arr[j] < arr[j+1]) {
                j++
            }
            if (temp < arr[j]) {
                swap(arr, i, j);
                i = j;
            }
        }
    }
    function swap(A, i, j) {
        let temp = A[i];
        A[i] = A[j];
        A[j] = temp;
    }
    for (let i = Math.floor(arr.length/2 - 1); i>=0; i--) {
        shiftDown(arr,i, arr.length)
    }
    for (let i = Math.floor(arr.length - 1); i>0;i--){
        // 根节点与最后一个节点交换
        swap(arr, 0, i);
        shiftDown(arr, 0, i);
        // 最后一个节点已经为当前最大值，不需要再参与比较。所以第三个参数为i。
    }
    console.log('arr：',arr)
    return arr.slice(0,k)
};
```

![截屏2021-03-17 上午12.07.37](/Users/chenmeifang/Library/Application Support/typora-user-images/截屏2021-03-17 上午12.07.37.png)