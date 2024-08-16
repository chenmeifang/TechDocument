const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { default: test } = require('node:test');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        // filename: 'bundle.js'
        filename: 'js/[name].[contenthash:10].js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: 'babel-loader'
                }
            },
            // ts-loader: 是一个用于将TypeScript文件(.ts和.tsx文件)编译成JavaScript文件的Webpack加载器
            //            主要作用是将TS代码编译为兼容的JS代码，并将编译结果传递给Webpack进行进一步的处理
            {
                test: /\.tsx?$/,
                use: 'ts-loader'
            },
            // css-loader：是一个用于处理和解析CSS文件的Webpack加载器
            //             主要作用是让你能够在JS中import或require CSS文件
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({ template: './public/index.html' })],
    // mode: 'development',
    mode: 'production',
    devServer: {
        open: true,
        historyApiFallback: true,
    },
    devtool: 'source-map',
    // devtool: 'inline-source-map',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    }
};