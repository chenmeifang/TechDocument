const { File } = require('../models');
const { storeInGridFS, storeInGridFS2 } = require("../db");
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const Speedtest = require('fast-speedtest-api');

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
    // maxTime：测试的最大时间（毫秒）
    // const speedtest = new Speedtest({
    //     maxTime: 50000
    // })
    // mbps: Megabits per second 每秒传输的百万比特（bits）数量
    // const result = await speedtest.getResults();
    // console.log('download网速：', result.download.mbps);
    // console.log('upload网速：', result.upload.mbps);
    // console.log('ping网速：', result.ping.mbps);

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
// 上传文件 分片处理
const uploadFiles2 = async (ctx) => {
    const chunkNumber = parseInt(ctx.request.body.chunkNumber);
    const totalChunks = parseInt(ctx.request.body.totalChunks);
    const file = ctx.files[0];

    // 模拟某一个分片上传失败
    if (chunkNumber === 2) {
        ctx.status = 400;
        ctx.body = {
            code: 400,
            msg: '文件分片上传失败，请重新上传'
        }
        return;
    }
    // 实现：文件分片上传时只有在超过最大重试次数后，才清除临时目录
    // 步骤：需要在服务器端记录每个分片的重试次数，并在每次上传失败时检查是否达到了最大重试次数
    // 疑问：不记录重试次数可以吗？每次前端请求的时候多一个参数应该也行把？？

    // 1.确保上传目录存在
    const uploadDir = path.join(__dirname, 'uploads');
    // existsSync是Node.js的fs模块提供的一个同步方法，用于检查指定路径的文件或目录是否存在
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir)
    }

    // 2.保存分块
    const chunkPath = path.join(uploadDir, `${file.originalname}.part${chunkNumber}`)
    fs.renameSync(file.path, chunkPath);

    // 3.检查所有分块是否都已上传
    const chunks = [];
    for (let i = 1; i <= totalChunks; i++) {
        const chunkFilePath = path.join(uploadDir, `${file.originalname}.part${i}`);
        if (fs.existsSync(chunkFilePath)) {
            chunks.push(chunkFilePath);
        }
    }

    // 4.所有分块上传完成，合并文件
    if (chunks.length === totalChunks) {
        const finalFilePath = path.join(uploadDir, file.originalname);
        // createWriteStream: 用于创建一个可写的流(Writable 流)，允许你以流的形式将数据写入文件
        // 使用流可以避免一次性加载大量数据到内存中，从而提高效率和降低内存消耗
        const finalWriteStream = fs.createWriteStream(finalFilePath);

        for (const chunkPath of chunks) {
            // readFileSync的返回值类型是Buffer（如果没有指定编码格式）
            // Buffer是Node.js中用于处理二进制数据的类
            // 如果需要以字符串的形式获取文件内容，可以传递编码格式作为第二个参数，比如‘utf8’
            const chunkData = fs.readFileSync(chunkPath);
            finalWriteStream.write(chunkData);
            fs.unlinkSync(chunkPath); // 上传完成后删除分块文件
        }
        finalWriteStream.end();
        // finalWriteStream是一个Writable流，不是Buffer
        const fileStream = fs.createReadStream(finalFilePath);

        // buffer要写到gridFs openUploadStream创建的流里面去
        await storeInGridFS2(fileStream, finalWriteStream, file.originalname).then(res => {
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
    } else {
        ctx.body = {
            code: 200,
            msg: 'Chunks received, waiting for more chunks'
        }
    }
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
    uploadFiles2,
    staticRequest
}