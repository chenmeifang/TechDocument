const mongoose = require("mongoose");
const { GridFSBucket } = require('mongodb');

let gridFS;

const MongoConnect = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/jianshu", { useNewUrlParser: true })
    .then(() => {
      // console.log('conn:', conn);
      console.log("Connected!");
      if (!gridFS) {
        gridFS = new GridFSBucket(mongoose.connection);
      }
    })
    .catch((err) => {
      console.error("数据库连接失败", err);
    });
};

const storeInGridFS = (buffer) => {
  return new Promise((resolve, reject) => {
    // openUploadStream(filename, options) 创建一个上传流，用于将文件上传到GridFS
    const writeStream = gridFS.openUploadStream("content");
    writeStream.on('finish', (res) => {
      console.log('res:', res);
      resolve();
    })
    writeStream.on('error', (err) => {
      console.log('err:', err);
      reject()
    })
    if (Buffer.isBuffer(buffer)) {
      writeStream.write(buffer);
      writeStream.end();
    }
  })
}

module.exports = {
  MongoConnect,
  storeInGridFS
}
