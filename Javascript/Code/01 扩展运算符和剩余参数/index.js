// const arr = [1, 2, 3]
// console.log(...arr);

// arr.push(4, 5)
// console.log(...arr);

function f(x, y, z) {
  console.log(x, y, z);
}
const args = [1, 2, 3]
f.apply(null, args)