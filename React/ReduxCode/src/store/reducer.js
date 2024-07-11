// reducer需要当前的state，所以需要引入state
import { MINUS, PLUS } from './actionType';
import initialState from './state';

// 定义reducer函数
// reducer函数的作用:根据不同的action对象,返回不同的新的state
// 第一个参数: state——管理的数据的初始状态
// 第二个参数: action
export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case PLUS:
            return {
                count: state.count + 1
            }
        case MINUS:
            return {
                count: state.count - 1
            }
        default:
            return state;
    }
}