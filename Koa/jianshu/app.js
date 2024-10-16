require('dotenv').config();
const Koa = require("koa");
const views = require("koa-views");
const json = require("koa-json");
const onerror = require("koa-onerror");
// koa-body曾经是一个流行的中间件，用于处理请求体
// koa-bodyparser:功能类似于koa-body，用于解析JSON，表单数据和文本请求体
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");
const cors = require('koa2-cors');
const http = require('http');
// const etag = require('koa-etag');
const send = require('koa-send');
const path = require('path');

// 创建koa应用
const app = new Koa();

const { MongoConnect } = require("./db");

// 连接数据库
MongoConnect();
// app.use(etag());


// 注意：一定要写在路由的前面
const allowedOrigins = ['http://localhost:8080', 'http://localhost:4000', 'http://localhost:3000', 'http://101.35.254.76:3000'];
app.use(cors({
  origin: (ctx) => {
    const origin = ctx.request.header.origin;
    if (allowedOrigins.includes(origin)) {
      return origin;
    }
    return 'http://localhost:8080'
  }, // 相当于设置'Access-Control-Allow-Origin'
  credentials: true // 允许携带凭据，相当于设置'Access-Control-Allow-Credentials'为true
}));

const index = require("./routes/index");
const users = require("./routes/users");
const file = require("./routes/file");

// error handler
onerror(app);

// middlewares
app.use(
  bodyparser({
    enableTypes: ["json", "form", "text"],
  })
);
app.use(json());
app.use(logger());
app.use(require("koa-static")(__dirname + "/public", {
  maxage: 40000000
}));


app.use(
  views(__dirname + "/views", {
    extension: "pug",
  })
);

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());
app.use(file.routes(), file.allowedMethods());

const staticPath = path.join(__dirname, 'public'); // 假设静态文件在 public 目录
// 处理 React 路由
app.use(async (ctx) => {
  // 如果找不到对应的静态文件...
  // && ctx.method === 'GET'
  if (ctx.status === 404) {
    await send(ctx, 'index.html', {
      root: staticPath,
      setHeaders: (res) => {
        res.setHeader('Cache-Control', 'public,max-age=3600000')
      }
    });
  }
});

// error-handling
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});

module.exports = app;
