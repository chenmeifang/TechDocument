const a = require('./循环依赖a');
const b = require('./循环依赖b');
console.log('a:', a.getBName());
console.log('b:', b.getAName());
