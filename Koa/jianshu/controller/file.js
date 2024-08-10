const { File } = require('../models');
const { storeInGridFS } = require("../db");
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

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

const generateETag = (body) => {
    return crypto.createHash('md5').update(body).digest('hex')
}

// 获取文件列表
const myList = async (ctx) => {
    await File.find().then(res => {
        console.log('res:', res);
        // ctx.set('Cache-Control', 'no-store')
        // ctx.set('Cache-Control', 'no-cache')
        // ctx.set('Cache-Control', 'public')
        // ctx.set('Last-Modified', new Date().toUTCString())
        const etag = generateETag('文件列表');
        // const lastModified = new Date().toUTCString(); // For example, using current date

        ctx.set('ETag', etag);
        // ctx.set('Last-Modified', lastModified);
        // ctx.set('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour

        ctx.body = {
            code: 200,
            msg: '查询成功',
            data: res
        }
        // ctx.status = 202;
        // ctx.body = '文件列表'
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

const staticRequest = async (ctx) => {
    const filePath = path.join(__dirname, '../public', '/images/image.png');
    const fileContent = await fs.promises.readFile(filePath);
    const etag = generateETag(fileContent);
    const requestETag = ctx.request.headers['if-none-match'];
    const If_Modified_Since = ctx.request.headers['if-modified-since']
    const lastModified = new Date().toUTCString();
    // console.log('lastModified:', lastModified);

    console.log('requestETag:', requestETag);
    console.log('etag:', etag);
    // todo:使用原生node试一下，排除koa框架的问题！！！
    if (requestETag === etag) {
        console.log('相等');
        // 注意：虽然客户端显示的是200状态码，但304状态码确实生效了
        // 因为前端接收到的内容不是111，而是图片内容
        ctx.status = 304; // Not Modified

        // console.log('相等');
        ctx.body = 111;
        // return;
    } else {
        console.log('不相等');
        ctx.set('ETag', etag);
        // ctx.set('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour
        ctx.set('Cache-Control', 'public, max-age=1'); // Cache for 1 hour
        // ctx.set('Cache-Control', 'no-cache')
        // ctx.set('Last-Modified', lastModified);
        ctx.type = 'image/jpeg';
        ctx.body = fileContent;
        // ctx.status = 201
    }
}

module.exports = {
    addFile,
    myList,
    uploadFiles,
    staticRequest
}