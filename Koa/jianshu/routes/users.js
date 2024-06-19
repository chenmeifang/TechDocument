const router = require('koa-router')()
const UserController = require('../controller/user')
router.prefix('/users')

// 添加系统用户
router.post('/add', UserController.userAdd)

// 修改系统用户
router.post('/update', UserController.userUpdate)

// 删除系统用户
router.post('/del', UserController.userDel)

// 查询所有系统用户
router.get('/find', UserController.userFind)

// 查询单个系统用户
router.get('/find:id', UserController.userFindOne)

module.exports = router
