const oPlusBtn = document.getElementById('plusBtn');
const oMinusBtn = document.getElementById('minusBtn');
const oCount = document.getElementById('count')

const EventEnum = {
    PLUS: 'PLUS',
    MINUS: 'MINUS'
}

const state = {
    count: 5
}
const init = () => {
    render();
    bindEvent();
}

function render() {
    oCount.innerText = state.count;
}

function bindEvent() {
    oPlusBtn.addEventListener('click', () => { handleBtnClick(EventEnum.PLUS) }, false);
    oMinusBtn.addEventListener('click', () => { handleBtnClick(EventEnum.MINUS) }, false);
}

function handleBtnClick(type) {
    switch (type) {
        case EventEnum.PLUS:
            // 1.修改count
            state.count += 1;
            // 2.render
            render();
            break;
        case EventEnum.MINUS:
            state.count -= 1;
            render();
            break;
        default:
            break;
    }
}

init();