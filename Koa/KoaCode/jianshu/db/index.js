const mongoose = require("mongoose");

module.exports = () => {
  mongoose
    .connect("mongodb://localhost:27017/jianshu", { useNewUrlParser: true })
    .then(() => {
      console.log("数据库连接成功");
    })
    .catch((err) => {
      console.err("db connect fail", err);
    });
};
