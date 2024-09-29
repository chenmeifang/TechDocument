const path = require('path');

module.exports = {
    cache: false, // 禁用缓存
    mode: 'development',
    // "resolve './src/index.js' in 'E:\\TechDocument'\n  No description file found in E:\\TechDocument or above\n  No description file found in E:\\TechDocument\\src or above\n  no extension\n    E:\\TechDocument\\src\\index.js doesn't exist\n  .js\n    E:\\TechDocument\\src\\index.js.js doesn't exist\n  .json\n    E:\\TechDocument\\src\\index.js.json doesn't exist\n  .wasm\n    E:\\TechDocument\\src\\index.js.wasm doesn't exist\n  as directory\n    E:\\TechDocument\\src\\index.js doesn't exist"
    entry: './src/index.js',
    context: path.resolve(__dirname), // 设置 context 为 'src' 目录
    output: {
        filename: 'main.js',
        path: path.resolve('dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader'
            }
        ]
    }
}