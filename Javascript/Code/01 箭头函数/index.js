"use strict";

function Normal() { }
const normal = new Normal()

// const Arrow = () => { }
// const arrow = new Arrow();

const example = () => {
  console.log('箭头函数：', arguments); // 报错，arguments 在箭头函数中不可用
};

const exampleRest = (...args) => {
  console.log(args); // 使用 rest 参数代替 arguments
};

example(1, 2, 3)
exampleRest(1, 2, 3)

const example2 = function () {
  console.log('普通函数：', arguments); // 报错，arguments 在箭头函数中不可用
};

example2(1, 2, 3)
