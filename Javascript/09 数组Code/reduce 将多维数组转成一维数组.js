const arr = [[1,2], [3,4], [5,6], [7, [8, 9, 10]]];
const newArr = function (arr) {
    return arr.reduce((prev, cur) => {
        // return prev.concat(cur);
        return prev.concat(Array.isArray(cur) ? newArr(cur) : cur);
    },[])
}
newArr(arr);
// const newArr = arr.reduce((prev, cur, index, array) => {
//     console.log(`prev:${prev}`);
//     return prev.concat(cur);
// }, [])
console.log(newArr(arr));