const array1 = [1, 3, 2];
console.log(Math.max(...array1));
// ...表示啥？———— 扩展运算符 spread operator
// end =============================================================

function sum(...args) {
    return args.reduce((acc, curr) => acc + curr, 0);
}
console.log(sum(1, 2, 3, 4)); // 输出：10
// end =============================================================

const arr = [1, 2, 3];
const max = arr.reduce((a, b) => Math.max(a, b), -Infinity);
console.log(`max:${max}`)
// end =============================================================

const arr2 = [1, 2, 3, 9, 1];
// apply(thisArg, argsArray)
const max2 = Math.max.apply(null, arr2)
console.log(`max2:${max2}`)

