// 实现一个`getIncludeStrings` 函数，函数的作用是输出字符串中所有被"()"包裹的字符串
// 尝试用栈
function getIncludeStrings(str) {
  let stack = [];
  let leftK = 0;
  let res = [];
  let includeStr = '';
  for (let char of str) {
    if (char === '(') {
      // 左括号,进栈
      stack.push(char);
      leftK++;
    } else if (char === ')') {
      // 右括号，开始收集，开始出栈
      let tempStr = stack.pop();
      while (tempStr !== '(') {
        includeStr = tempStr + includeStr;
        tempStr = stack.pop();
      }
      leftK--;
      res.push(includeStr);
      if (leftK > 0) {
        // 处理括号嵌套的场景：要把之前pop出来的字符串重新push进去
        stack.push('(' + includeStr + ')');
      }
      includeStr = '';
    } else {
      // 其他，进栈
      stack.push(char);
    }
  }
  return res;
}
// const res = getIncludeStrings('(a+b)*c+(c*(d-e)+f)')
const res = getIncludeStrings('(a+b)*c+(c*(d-e)+f*(g+h))')
console.log('res:', res) // 输出 ['a+b', 'd-e', 'c*(d-e)+f']

// function getIncludeStrings(str) {
//   let stack = [];
//   let leftK = 0;
//   let i = 0;
//   let res = [];
//   let includeStr = '';
//   while (i < str.length) {
//     if (str[i] === '(') {
//       // 左括号
//       stack.push(str[i]);
//       leftK++;
//     } else if (str[i] === ')') {
//       // 右括号
//       // 开始收集，开始出栈
//       let tempStr = stack.pop();
//       while (tempStr !== '(') {
//         includeStr = tempStr + includeStr;
//         tempStr = stack.pop();
//       }
//       leftK--;
//       res.push(includeStr);
//       if (leftK > 0) {
//         // 处理括号嵌套的场景：要把之前pop出来的字符串重新push进去
//         stack.push('(' + includeStr + ')');
//       }
//       includeStr = '';
//     } else {
//       stack.push(str[i]);
//     }
//     i++;
//   }
//   return res;
// }