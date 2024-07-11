/**
 * 1.store里面需要一个getState方法
 * 2.store里面需要一个subscribe方法
 * 3.store里面需要一个dispatch方法
 * 4.在Redux中，会使用reducer函数生成store实例：const store = Redux.createStore(reducer)
 */

import reducer from "./reducer";
import { createStore } from './redux';

export default createStore(reducer);