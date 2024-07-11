// 轮子
/**
 * 1.reducer函数中：
 *   return {count: state.count + 1}
 *   说明： state变化了，需要执行那些订阅的函数
 * 2.在Redux中，会使用reducer函数生成store实例：const store = Redux.createStore(reducer)
 */
export function createStore(reducer) {
    createReduxState(reducer);
    const getState = createGetter(reducer);
    const dispatch = createDispatch(reducer);
    // 需要把订阅的那些函数保存起来，方便之后state变化的时候去执行
    return {
        subscribe,
        getState,
        dispatch,
    }
}

// todo: 监测state的变化，执行收集的订阅函数
// 使用劫持
const redux = {}
function createReduxState(reducer) {
    let _state = reducer();
    Object.defineProperty(redux, '_state', {
        get() {
            return _state;
        },
        set(newValue) {
            // 这里是什么时候执行？————解：在dispatch的时候执行
            if (_state === newValue) return;
            _state = newValue;
            publish();
        }
    })
}

const callbacks = [];
// 订阅
function subscribe(callbackFn) {
    if (callbacks.includes(callbackFn)) return;
    callbacks.push(callbackFn);
}

// 发布
function publish() {
    callbacks.forEach(callback => callback())
}

// 为什么要用闭包？？？
// 为什么要用返回一个函数的形式？？？
function createGetter(reducer) {
    return function () {
        return reducer(redux._state);
    }
}

function createDispatch(reducer) {
    return function (action) {
        redux._state = reducer(redux._state, action);
    }
}