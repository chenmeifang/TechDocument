const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { DefinePlugin } = require('webpack');
const dotenv = require('dotenv');

// 注意：Webpack 的 mode 选项（development 或 production）虽然控制了一些默认配置，
// 但不会自动定义 process.env.NODE_ENV

// 1、加载环境变量
const env = dotenv.config({ path: path.resolve(__dirname, `.env.${process.env.NODE_ENV}`) }).parsed;

// 2、将环境变量转换为 Webpack DefinePlugin 所需的格式
const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
}, {});

module.exports = {
    entry: {
        main: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        // filename: 'bundle.js'
        filename: 'js/[name].js',
        // filename: 'js/[name].[contenthash:10].js'
        clean: true, // 清空上一次的打包内容
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: {
                    // Babel通常用于将现代JavaScript代码（如ES6+、JSX）转换为兼容旧版浏览器的代码
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
                    // todo: style-loader好像没有生效？？
                    { loader: MiniCssExtractPlugin.loader }, // 将css提取成单独的文件
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
            // 将CSS提取成单独的文件
            filename: 'css/[name].css' // 输出的CSS文件名
        }),
        new DefinePlugin(envKeys),
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