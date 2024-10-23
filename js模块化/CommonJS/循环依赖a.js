console.log('a.js loaded');
const b = require('./循环依赖b');
module.exports = {
  name: 'moduleA',
  getBName: () => b.name,
};
