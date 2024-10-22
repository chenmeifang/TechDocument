// moduleA.js
export const name = 'Module A';

export function greet() {
  console.log('Hello from Module A');
}

// 模拟耗时操作
export function delayGreeting() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Delayed greeting from Module A');
      resolve();
    }, 2000); // 2秒延迟
  });
}
