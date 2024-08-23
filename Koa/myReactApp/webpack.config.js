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
    plugins: [new HtmlWebpackPlugin({ 
        template: './public/index.html',
        // filename: 'testIndex.html',
        minify: {
            removeComments: true, // 问题：生产环境会自己移除注释吗？不配置的话——不会
        },
        // hash: true, // 是否在生成的js文件名中添加hash值，而不是给html文件添加hash值
     })],
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