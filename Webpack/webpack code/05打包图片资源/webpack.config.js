// https://juejin.cn/post/7212548831723487291
const path = require('path');
module.exports = {
    entry: './index.js',
    output: {
        filename: 'bundle.js',
        // __dirname: 当前模块所在文件夹的完整路径
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource'
            }
        ]
    },
    mode: 'development'
}