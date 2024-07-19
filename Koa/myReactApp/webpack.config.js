const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                // use: 'css-loader'
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({ template: './public/index.html' })],
    mode: 'development',
    devServer: {
        open: true,
        historyApiFallback: true,
    },
    devtool: 'source-map'
    // devtool: 'inline-source-map',
};