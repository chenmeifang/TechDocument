// https://juejin.cn/post/7212548831723487291
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
    plugins: [
        new HtmlWebpackPlugin({ template: './index.html' })
    ],
    mode: 'development',
    // https://webpack.docschina.org/configuration/dev-server/#root
    // 特点：只会在内存中编译打包，不会有任何输出
    // 启动devServer指令：webpack-dev-server
    // 因为我们是本地下载，要启动本地的webpack-dev-server，需要通过 npx webpack-dev-server 去启动。
    // 用这个指令就得把这个包下载下来
    devServer: {
        // 代表要运行的项目的目录
        // contentBase: path.resolve(__dirname, 'dist'), // 现在已经没有这个属性了
        static: {
            directory: path.resolve(__dirname, 'dist')
        },
        // 启动gzip压缩
        compress: true,
        // 指定开发服务器的端口号
        port: 3000
    }
}