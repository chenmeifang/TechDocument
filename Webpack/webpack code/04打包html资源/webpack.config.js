const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: './index.js',
    output: {
        path: resolve(__dirname, 'dist'),
        filename: 'bundle1.js'
    },
    plugins: [new HtmlWebpackPlugin()],
    mode: 'development'
}   