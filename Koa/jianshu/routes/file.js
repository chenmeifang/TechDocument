const router = require('koa-router')();
const multer = require('@koa/multer');
const fileController = require('../controller/file');
const { authorizeByToken } = require('../auth');

router.prefix('/file');

// 用于配置multer的文件存储方式，multer支持多种存储引擎，
// menStorage是其中的一种，它将上传的文件存储在内存中的Buffer对象中，而不是直接保存在磁盘
const memStorage = multer.memoryStorage();
const upload = multer({ storage: memStorage })

// 新增一个文件
router.post('/addFile', fileController.addFile);
// 查询文件列表
router.get('/myList', authorizeByToken, fileController.myList);
// 上传一个文件
router.post('/upload', authorizeByToken, upload.array('file'), fileController.uploadFiles);

module.exports = router;