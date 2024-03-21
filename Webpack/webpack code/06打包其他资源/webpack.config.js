const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 1.require和import有什么区别？

module.exports = {
    entry: './index.js',
    output: {
        filename: 'bundle.js',
        // 2.__filename:当前模块的完整路径
        // 3.__dirname:当前模块所在文件夹的完整路径
        path: path.resolve(__dirname, 'dist')
    },
    // 对应loader
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
                // use: 'css-loader'
            },
            // 打包其他资源
            // file-loader: https://webpack.docschina.org/guides/asset-modules/
            // 在webpack5之前，通常使用file-loader将文件发送到输出目录？？
            // 资源模块(asset module)是一种模块类型，它允许使用资源文件（字体，图标）等而无需配置额外loader
            // 'asset/resource'发送一个单独的文件并导出URL。之前通过使用file-loader实现
            // {
            //     exclude: /\.(css|js|html)$/,
            //     loader: 'file-loader'
            // }
            {
                exclude: /\.(css|js|html)$/,
                type: 'asset/resource'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './index.html' })
    ],
    mode: 'development'
}
// 4.怎么执行webpack.config.js?
//   webpack