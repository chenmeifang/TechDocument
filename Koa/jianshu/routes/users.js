const router = require('koa-router')()
const { User } = require('../models')
router.prefix('/users')

// 添加系统用户
router.post('/add', async (ctx) => {
  // let { username, pwd } = ctx.request.query;
  // post请求不能用query接收参数，要用body接收参数
  let { username, pwd } = ctx.request.body;
  // User.create是一个异步的操作
  // 注意：不加await的话，请求会出现Not Found的结果
  await User.create({ username, pwd }).then(rel => {
    if (rel) {
      ctx.body = {
        code: 200,
        msg: '添加成功',
        data: rel
      }
    } else {
      ctx.body = {
        code: 300,
        msg: '添加失败',
      }
    }
  }).catch(err => {
    ctx.body = {
      code: 400,
      msg: '添加时出现异常',
    }
    console.log(err)
  })
})

// 修改系统用户
router.post('/update', async (ctx) => {
  User.create()
})

// 删除系统用户
router.post('/del', async (ctx) => {
  User.create()
})

// 查询系统用户
router.get('/find', async (ctx) => {
  User.create()
})

// router.get('/', function (ctx, next) {
//   ctx.body = 'this is a users response!'
// })

// router.get('/bar', function (ctx, next) {
//   ctx.body = 'this is a users/bar response'
// })

module.exports = router
