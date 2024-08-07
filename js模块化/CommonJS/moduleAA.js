console.log('333');

var foo = 'bar';
setTimeout(() => {
    console.log('444');
    foo = 'baz';
}, 500)
console.log('5555');
module.exports = {
    foo
}
console.log('666');
