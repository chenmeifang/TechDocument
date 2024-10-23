import { getBName } from './循环依赖a.js';
import { getAName } from './循环依赖b.js';
console.log('a:', getBName());
console.log('b:', getAName());