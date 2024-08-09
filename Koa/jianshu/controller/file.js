const { File } = require('../models');
const { storeInGridFS } = require("../db");

// 新建文件
const addFile = async (ctx) => {
    console.log('准备操作数据库:');
    // 写法一：直接调crudUtil
    // 写法二：直接操作数据库
    // todo: docId是用什么生成的？
    // todo：文件名是怎么生成的？
    await File.create({
        docId: '123456',
        title: '第一个文件',
    }).then(res => {
        console.log('res:', res);
        ctx.body = {
            code: 200,
            msg: '添加成功',
            data: res
        }
    }).catch(err => {
        console.log('err:', err);
        ctx.body = {
            code: 400,
            msg: '添加时出现异常'
        }
    })
}

// 获取文件列表
const myList = async (ctx) => {
    await File.find().then(res => {
        console.log('res:', res);
        // ctx.set('Cache-Control', 'no-store')
        // ctx.set('Cache-Control', 'no-cache')
        // ctx.body = {
        //     code: 200,
        //     msg: '查询成功',
        //     data: '文件列表'
        // }
        ctx.body = '文件列表'
    }).catch(err => {
        console.log('err:', err);
        ctx.body = {
            code: 400,
            msg: '查询时出现异常'
        }
    })
}

// 上传文件
const uploadFiles = async (ctx) => {
    const file = ctx.files[0];
    // buffer要写到gridFs openUploadStream创建的流里面去
    await storeInGridFS(file.buffer).then(res => {
        ctx.body = {
            code: 200,
            msg: '上传文件成功',
        }
    }).catch(err => {
        ctx.body = {
            code: 400,
            msg: '上传文件失败'
        }
    })
}

module.exports = {
    addFile,
    myList,
    uploadFiles
}