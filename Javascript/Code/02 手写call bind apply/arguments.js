function example() {
  console.log(arguments);
  const args = [...arguments];
  console.log(args);  // 输出: [1, 2, 3]
}
example(1, 2, 3);
// 输出：[Arguments] { '0': 1, '1': 2, '2': 3 }