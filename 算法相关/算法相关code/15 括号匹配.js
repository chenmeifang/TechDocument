function isValid(s) {
  const stack = [];
  const map = {
    ')': '(',
    '}': '{',
    ']': '['
  }
  // 遍历s，第一想法是用普通的for循环加length
  // 实际有更简洁的循环方式for of
  for (let char of s) {
    if (char === '(' || char === '[' || char === '{') {
      // 如果是左括号，直接入栈
      stack.push(char);
    } else if (char === ')' || char === ']' || char === '}') {
      // 如果是右括号,检验栈里面是否有值
      // 1.如果没有值，说明不匹配
      // 2.如果有值，检验是否能match
      if (!stack.length) {
        return false;
      } else {
        let leftChar = stack.pop();
        if (leftChar !== map[char]) {
          return false;
        }
      }
    }
  }
  return stack.length === 0;
}
console.log(isValid("()"));        // true
console.log(isValid("()[]{}"));    // true
console.log(isValid("(]"));        // false
console.log(isValid("([)]"));      // false
console.log(isValid("{[]}"));      // true
console.log(isValid("(()[]{)}"));  // false