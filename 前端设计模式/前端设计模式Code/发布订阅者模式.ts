// once: emit多次事件，但事件最终只会执行一次
class EventEmitter {
    private events: { [key: string]: Function[] } = {};
    on(event: string, listener: Function) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(listener);
    }
    once(event: string, listener: Function) {
        const onceListener = (...args: any[]) => {
            listener(...args);
            this.off(event, onceListener);
        }
        this.on(event, onceListener)
    }
    emit(event: string, ...args: any[]) {
        if (!this.events[event]) return;
        this.events[event].forEach(listener => {
            listener(...args)
        })
    }
    off(event: string, listener: Function) {
        if (!this.events[event]) return;
        this.events[event] = this.events[event].filter(lis => {
            return lis !== listener
        })
    }
}
// 类中包含的代码在 JavaScript 的严格模式下进行计算，
// 该模式不允许以此方式使用“arguments”。
// 有关详细信息，
// 请参阅 https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Strict_mode。