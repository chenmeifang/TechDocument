const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// 系统用户模型对象
const userSchema = new Schema({
    username: String,
    pwd: String,
});

// 文档对象
const fileSchema = new Schema({
    docId: String,
    title: String,
})

// 对应数据库里面的集合
const User = mongoose.model("users", userSchema);
const File = mongoose.model("files", fileSchema);

module.exports = {
    User,
    File
};
