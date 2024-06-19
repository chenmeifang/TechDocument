const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// 系统用户模型对象
const userSchema = new Schema({
    username: String,
    pwd: String,
});

// 对应数据库里面的集合
const User = mongoose.model("users", userSchema);

module.exports = {
    User,
};
