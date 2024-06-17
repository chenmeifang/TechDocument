const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const serve = require('koa-static');
const router = require('./routes/index');

const app = new Koa();

// 中间件：解析请求体
app.use(bodyParser());

// 静态文件服务
app.use(serve('./public'));

// 使用路由中间件
app
  .use(router.routes())
  .use(router.allowedMethods());
  
// 启动服务器
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});