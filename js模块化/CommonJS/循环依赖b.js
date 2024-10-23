console.log('b.js loaded');
const a = require('./循环依赖a');
module.exports = {
  name: 'moduleB',
  getAName: () => a.name,
};

