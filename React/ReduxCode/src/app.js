import store from './store';
import { MINUS, PLUS } from './store/actionType';

const oPlusBtn = document.getElementById('plusBtn');
const oMinusBtn = document.getElementById('minusBtn');
const oCount = document.getElementById('count');

const init = () => {
    render();
    bindEvent();
}

// 只要每次count一更新，就执行render
// 说明只要count一更新，就需要publish一个事件，使这里的render能正常执行
// 订阅数据变化
store.subscribe(() => {
    render();
})

function render() {
    const state = store.getState();
    oCount.innerText = state.count;
}

function bindEvent() {
    oPlusBtn.addEventListener('click', () => { handleBtnClick(PLUS) }, false);
    oMinusBtn.addEventListener('click', () => { handleBtnClick(MINUS) }, false);
}

function handleBtnClick(type) {
    // 通过store实例的dispatch函数提交action更改状态
    // 即“需要通知reducer去执行实际的加减逻辑”
    store.dispatch({ type });
}

init();