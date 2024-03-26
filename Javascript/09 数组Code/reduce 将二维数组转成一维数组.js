// const arr = [[1,2], [3,4], [5,6]];
// const newArr = arr.reduce((prev, cur, index, array) => {
//     prev.concat(cur)
// }, [])
// console.log(newArr);

const arr = [[1,2], [3,4], [5,6]];
const newArr = arr.reduce((prev, cur, index, array) => {
    console.log(`prev:${prev}`);
    
    return prev.concat(cur)
}, [])
console.log(newArr);

