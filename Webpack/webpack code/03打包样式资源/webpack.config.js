// 所有的构建工具都是基于nodejs平台运行的，
// 模块化默认采用commonjs。
// import { resolve } from 'path'; 写法错误
const { resolve } = require('path')
module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'build.js',
        path: resolve(__dirname, 'build')
    },
    // loader: [], 写法错误
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [],
    mode: 'development'
}