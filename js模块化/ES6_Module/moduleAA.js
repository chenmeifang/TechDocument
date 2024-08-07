console.log('验证AA模块是什么时候开始执行的');
export var foo = 'bar';
console.log('333');

setTimeout(() => {
    foo = 'baz';
    console.log('555');
}, 500)
console.log('444');


// https://es6.ruanyifeng.com/#docs/module
// ES6模块的设计思想是尽量的静态化
// 使得编译时就能确定模块的依赖关系，以及输入和输出的变量