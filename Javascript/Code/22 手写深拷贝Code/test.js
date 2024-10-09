let obj = {
  name: 'aaa',
  age: 23,
  // tag: true,
  // fun: function () { },
  nums: [2, 3, 4, 5],
  // undefine: undefined,
  // nul: null,
  info: {
    hobby: ['travel', 'piano'],
    career: {
      teacher: 4,
      engineer: 9
    }
  }
}
function deepClone(origin) {
  let target = Array.isArray(origin) ? [] : {};
  // for..of：用于遍历可迭代对象（数组，字符串，Map，Set等），是“值”的循环
  // for..in: 用于遍历对象的可枚举属性，是“键”的循环
  for (let key in origin) {
    // console.log('key:', key);
    // console.log('typeof origin[key]:', typeof origin[key]);
    // target[key] = origin[key]; // 直接这样不能实现深拷贝，源对象和新对象之间还存在引用关系
    // typeof origin[key]可能的值：number，string，boolean，object，function, undefined，
    // 注意：typeof null也会返回“object”，但是null实际上并不是一个对象
    if (typeof origin[key] === 'object' && origin[key] !== null) {
      // value是数组或者对象
      target[key] = deepClone(origin[key]);
    } else {
      // value是简单的值
      target[key] = origin[key];
    }
  }
  return target;
}


function deepClone2(origin, tar) {
  let target = tar || {};
  for (let key in origin) {
    if (typeof origin[key] === 'object' && origin[key] !== null) {
      // value是数组或者对象
      target[key] = Array.isArray(origin[key]) ? [] : {}
      deepClone2(origin[key], target[key]);
    } else {
      // value是简单的值
      target[key] = origin[key];
    }
  }
  return target;
}

// let newObj = deepClone2(obj);
// console.log('newObj:', newObj);
// newObj.nums.push(6);
// // newObj.info.career.teacher = 5;
// console.log('newObj:', newObj);
// console.log('Obj:', obj);

// 验证深拷贝纯数组的场景
let obj2 = [1, 2, 3, 4, 5, 6]
let newObj = deepClone2(obj2);
console.log('newObj:', newObj);
newObj.push(8);
console.log('newObj:', newObj);
console.log('Obj:', obj2);
// 经验证：deepClone比deepClone2完善


