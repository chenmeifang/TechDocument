// 谁大谁往右交换
const arr = [3, 2, 5, 4, 3, 6]
// for (let i = arr.length; i > 0; i--) {
//     for (let j = 0; j < i; j++) {
//         if (arr[j] > arr[j + 1]) {
//             swap(j, j + 1);
//         }
//     }
// }

for (let i = arr.length - 1; i > 0; i--) {
    for (let j = 0; j < i; j++) {
        if (arr[j] > arr[j + 1]) {
            swap(arr, j, j + 1);
        }
    }
}

function swap(arr, i, j) {
    arr[i] = arr[i] ^ arr[j];
    arr[j] = arr[i] ^ arr[j];
    arr[i] = arr[i] ^ arr[j];
}