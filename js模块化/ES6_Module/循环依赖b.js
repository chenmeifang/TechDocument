import { name as aName } from './循环依赖a.js';
console.log('b.mjs loaded');
export const name = 'moduleB';
export const getAName = () => aName;
