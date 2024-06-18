const mongoose = require("mongoose");

module.exports = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/jianshu", { useNewUrlParser: true })
    .then(() => console.log("Connected!"))
    .catch((err) => {
      console.error("数据库连接失败", err);
    });
};
