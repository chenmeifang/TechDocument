const obj = {
    name: 'cnf',
    age: 34,
    career: 'qianduan',
    info: {
        field: ['js', 'css', 'html'],
        framework: ['react', 'vue', 'angular'],
        student: [{
            name: 'zhangsan',
            age: 18
        },
        {
            name: 'lisi',
            age: 20
        }]
    },
    hobby: ['piano', 'travel'],
    student: {
        name: 'wangwu',
        age: 18
    }
}

function deepClone(origin, target) {
    var tar = target || {};
    var toStr = Object.prototype.toString;
    for (var k in origin) {
        console.log('k:', k)
        if (origin.hasOwnProperty(k)) {
            if (typeof origin[k] === 'object' && origin[k] !== null) {
                // 判断origin[key]是数组还是对象
                tar[k] = toStr.call(origin[k]) === '[object Array]' ? [] : {}
                deepClone(origin[k], tar[k]);
            } else {
                // 非引用值，可以直接赋值
                // 数组和对象属于引用值，不可以直接赋值，需要另外的处理
                tar[k] = origin[k]
            }
        }
    }
    return tar;
}

const res = deepClone(obj);
console.log(res)