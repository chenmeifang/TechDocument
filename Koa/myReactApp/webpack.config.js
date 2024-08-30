const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        main: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist10'),
        // filename: 'bundle.js'
        filename: 'js/[name].js'
        // filename: 'js/[name].[contenthash:10].js'
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
            // style-loader: 将CSS插入到HTML的<style>标签中
            // css-loader: 解析CSS文件，处理@import和url()
            // css-loader：是一个用于处理和解析CSS文件的Webpack加载器
            //             主要作用是让你能够在JS中import或require CSS文件
            {
                test: /\.css$/,
                use: [
                    // 'style-loader', 
                    { loader: MiniCssExtractPlugin.loader },
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            // filename: 'testIndex.html',
            minify: {
                removeComments: true, // 问题：生产环境会自己移除注释吗？不配置的话——不会
            },
            // hash: true, // 是否在生成的js文件名中添加hash值，而不是给html文件添加hash值
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css' // 输出的CSS文件名
        })
    ],
    // mode: 'development',
    mode: 'production',
    devServer: {
        open: true,
        historyApiFallback: true,
    },
    devtool: 'source-map', // 'inline-source-map'
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    optimization: {
        // 1. 可以将node_modules中的代码单独打包成一个chunk最终输出
        // 2. 自动分析多入口chunk中，有没有公共的文件。如果有会打包成单独一个chunk。
        splitChunks: {
            chunks: 'all'
        }
    }
};