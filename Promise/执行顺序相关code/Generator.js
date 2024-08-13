// function* foo() {
//     yield 1;
//     yield 2;
//     yield 3;
//     yield 4;
//     yield 5;
//     return 6;
// }
// for (let v of foo()) {
//     console.log(v)
// }

function* gen(x) {
    var y = yield x + 2;
    console.log('y:', y);
    return y;
}
var g = gen(1);
let res = g.next();
console.log('res:', res);
res = g.next();
console.log('res:', res);

// function* helloWorldGenerator() {
//     yield 'hello';
//     yield 'world';
//     return 'ending';
// }

// var hw = helloWorldGenerator();
// console.log(hw.next());
// console.log(hw.next());
// console.log(hw.next());


