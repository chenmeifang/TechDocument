import { name as bName } from './循环依赖b.js';
console.log('a.mjs loaded');
export const name = 'moduleA';
export const getBName = () => bName;
