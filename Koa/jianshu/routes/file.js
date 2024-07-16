const router = require('koa-router')();
const fileController = require('../controller/file');
router.prefix('/file');

// 新增一个文件
router.post('/addFile', fileController.addFile);

module.exports = router;