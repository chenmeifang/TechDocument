let nums2 = [1, 2, 34, 55, 1]
const newNums2 = nums2.filter((n, i) => {
    console.log(`${n}---${i}`)
    return nums2.indexOf(n) === i;
})
console.log('nums2：', nums2) // => nums： [ 1, 2, 34, 55, 1 ]
console.log('newNums2:', newNums2) // => newNums2: [ 1, 2, 34, 55 ]