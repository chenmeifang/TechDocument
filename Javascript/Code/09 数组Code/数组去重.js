// const arr = [1, 2, 2, 3, 4, 4, 5];
// const arrSet = new Set(arr);
// console.log('arrSet:', arrSet);
// // arrSet: Set(5) { 1, 2, 3, 4, 5 }

// // Set集合如何转数组？
// // 1.使用Array.from
// const uniqueArr = Array.from(arrSet);
// console.log(uniqueArr);

// // 2. 使用扩展运算符
// const uniqueArr2 = [...arrSet];
// console.log(uniqueArr2);







// const arr = [1, 2, 2, 3, 4, 4, 5];
// const uniqueArr = arr.filter((item, index) => {
//   return arr.indexOf(item) === index;
// })
// console.log(uniqueArr);







const arr = [1, 2, 2, 3, 4, 4, 5];
const uniqueArr = arr.reduce((accumulator, item, index) => {
  if (!accumulator.includes(item)) {
    accumulator.push(item)
  }
  return accumulator;
}, [])
console.log(uniqueArr);
