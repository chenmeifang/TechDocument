const router = require('koa-router')();
const fileController = require('../controller/file');
router.prefix('/file');
const { authorizeByToken } = require('../auth');

// 新增一个文件
router.post('/addFile', fileController.addFile);
// 查询文件列表
router.get('/myList', authorizeByToken, fileController.myList);

module.exports = router;