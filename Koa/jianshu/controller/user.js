const { User } = require('../models')
const crud = require('./crudUtil');
let jwt = require('jsonwebtoken');

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
    // ctx.request.body.username
    // ctx.request.body.pwd

    // let user = {
    //     username: 'admin',
    //     pwd: '1234'
    // }

    // 第二个参数应该是自定义密钥
    let token = jwt.sign({
        username: ctx.request.body.username,
    }, 'zidingyimiyao')
    ctx.body = {
        token
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