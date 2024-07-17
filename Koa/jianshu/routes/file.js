const router = require('koa-router')();
const fileController = require('../controller/file');
router.prefix('/file');

// 新增一个文件
router.post('/addFile', fileController.addFile);
// 查询文件列表
router.get('/myList', fileController.myList);


module.exports = router;