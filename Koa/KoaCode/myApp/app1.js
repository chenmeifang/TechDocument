// app.js
const Koa = require('koa');
// const router = require('koa-route');
// const router = require('koa-router')()
const index = require('./routes/index')

const app = new Koa();

const main = ctx => {
  ctx.response.body = 'Hello World';
};

const welcome = (ctx, name) => {
  ctx.response.body = 'Hello ' + name;
};

// app.use(router.get('/', main));
app.use(index.routes(), index.allowedMethods())
// app.use(router.get('/:name', welcome));

// router.get('/', async (ctx, next) => {
//     await ctx.render('index', {
//       title: 'Hello Koa 22!'
//     })
//   })

app.listen(3000);
console.log('listening on port 3000');