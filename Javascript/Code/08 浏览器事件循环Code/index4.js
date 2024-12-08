var Func = () => console.log('a');
setTimeout(Func, 0);
console.log('change');
Func = () => console.log('another a');
