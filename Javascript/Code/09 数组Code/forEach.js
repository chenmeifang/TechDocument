// 前端面试：forEach函数的原理是什么？为什么不会无限循环？
let numbersOne = [1, 2, 3];
numbersOne.forEach((number, index) => {
    console.log('this:', this);
    console.log(number);
    numbersOne.push(number + 3)
})
console.log('numbersOne的最终结果：', numbersOne)