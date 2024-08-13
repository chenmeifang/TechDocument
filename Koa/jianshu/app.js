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
const socketIo = require('socket.io');
const http = require('http');
// const etag = require('koa-etag');

// 创建koa应用
const app = new Koa();

const server = http.createServer(app.callback());

const { MongoConnect } = require("./db");

// 连接数据库
MongoConnect();
// app.use(etag());


// 注意：一定要写在路由的前面
app.use(cors({
  // origin: '*', // 相当于设置'Access-Control-Allow-Origin'
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
app.use(require("koa-static")(__dirname + "/public"));


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

// error-handling
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});

const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:8080',
    methods: ["GET", "POST"]
  }
});
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('edit', (msg) => {
    console.log('message:', msg);
    // 通知除发送者外的所有连接的客户端
    socket.broadcast.emit('edit', msg);
  })
});

// todo: 为什么这里监听3000端口就不行？？？
server.listen(4000);

module.exports = app;
