// index.ts: react包的入口
import { jsxDEV } from './src/jsx';
// React

// 这里为什么要export，不熟悉rollup
export default {
	version: '0.0.0',
	createElement: jsxDEV
};