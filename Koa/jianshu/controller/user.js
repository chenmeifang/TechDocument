const { User } = require('../models')
const crud = require('./crudUtil');
const { generateToken } = require('../auth');

// 添加系统用户
const userAdd = async (ctx) => {
    // let { username, pwd } = ctx.request.query;
    // post请求不能用query接收参数，要用body接收参数
    // User.create是一个异步的操作
    // 注意：不加await的话，请求会出现Not Found的结果
    let { username, pwd } = ctx.request.body;
    await crud.add(User, { username, pwd }, ctx)
}

// 修改系统用户
const userUpdate = async (ctx) => {
    let params = ctx.request.body;
    await crud.update(User, { _id: params._id }, {
        username: params.username,
        pwd: params.pwd
    }, ctx)
}

// 删除系统用户
const userDel = async (ctx) => {
    let { _id } = ctx.request.body;
    await crud.del(User, { _id }, ctx)
}

// 查询所有系统用户
const userFind = async (ctx) => {
    await crud.find(User, null, ctx)
}

// 查询单个系统用户
const userFindOne = async (ctx) => {
    await crud.findOne(User, {
        _id: ctx.params.id
    }, ctx)
}

// 具体的登录相关的业务逻辑
const login = async (ctx) => {
    // post请求不能用query接收参数，要用body接收参数
    const { username, pwd } = ctx.request.body;
    const user = await User.findOne({ username });
    if (user && user.pwd === pwd) {
        // 第二个参数应该是自定义密钥
        // todo: 封装成generateToken方法
        let token = generateToken({
            username,
            pwd
        })
        // ctx.cookies.set('sessionId', 'sessionId123', {
        //     httpOnly: false, // 使cookie只能通过http请求访问
        // })
        // ctx.cookies.set('sessionId', 'sessionId123')
        ctx.body = {
            code: 200,
            token
        }
    } else {
        ctx.body = {
            code: 401,
            message: 'Invalid username or password'
        }
    }
}

module.exports = {
    userAdd,
    userUpdate,
    userDel,
    userFind,
    userFindOne,
    login
}