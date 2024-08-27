// 函数重载
function hello(name: string): string;
function hello(age: number): string
// 上面两行是函数的重载声明,告诉TS编译器hello函数可以接受两种不同的类型参数
// 函数重载的主要意义是提供更好的类型检查和代码的自解释能力

function hello (value: string | number): string {
    if (typeof value === 'string') {
        return '1111'
    } else if (typeof value === 'number') {
        return '222'
    }
    return '3333'
}
hello('111');
hello(222);