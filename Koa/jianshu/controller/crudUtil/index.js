const { model } = require("mongoose")

/**
 * 用于查询所有数据的公共方法
 * @param {*} model 
 * @param {*} where 
 * @param {*} ctx 
 * @returns 
 */
const find = (model, where, ctx) => {
    return model.find(where).then(rel => {
        ctx.body = {
            result: rel
        }
    }).catch(err => {
        ctx.body = {
            code: 400,
            msg: '查询时出现异常',
        }
        console.log(err)
    })
}

const findOne = (model, where, ctx) => {
    return model.findOne(where).then(rel => {
        ctx.body = {
            result: rel
        }
    }).catch(err => {
        ctx.body = {
            code: 400,
            msg: '查询时出现异常',
        }
        console.log(err)
    })
}

/**
 * 用于添加数据的公共方法
 * @param {*} model 
 * @param {*} params 
 * @param {*} ctx 
 * @returns 
 */
const add = (model, params, ctx) => {
    return model.create(params).then(rel => {
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
}

const update = (model, where, params, ctx) => {
    return model.updateOne(where, params).then(rel => {
        ctx.body = {
            result: rel
        }
    }).catch(err => {
        ctx.body = {
            code: 400,
            msg: '修改时出现异常',
        }
    })
}

const del = (model, where, ctx) => {
    return model.findOneAndDelete(where).then(rel => {
        ctx.body = {
            result: rel
        }
    }).catch(err => {
        ctx.body = {
            code: 400,
            msg: '删除时出现异常',
        }
        console.log(err)
    })
}

module.exports = {
    find,
    add,
    update,
    del,
    findOne
}