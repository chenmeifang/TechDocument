const Router = require('koa-router');
const router = new Router();

// 路由定义
router.get('/', (ctx, next) => {
    ctx.body = 'Hello Koa!';
});

router.post('/data', (ctx, next) => {
    ctx.body = {
      message: 'Data received',
      data: ctx.request.body, // ctx.request.body是啥？
    };
});
module.exports = router;