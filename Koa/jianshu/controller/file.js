const { File } = require('../models')
const addFile = (ctx) => {
    console.log('准备操作数据库:');
    // 写法一：直接调crudUtil
    // 写法二：直接操作数据库
    // todo: docId是用什么生成的？
    File.create({
        docId: '123456',
        title: '第一个文件',
    }).then(res => {
        console.log('res:', res)
    }).catch(err => {
        console.log('err:', err)
    })
}

module.exports = {
    addFile
}