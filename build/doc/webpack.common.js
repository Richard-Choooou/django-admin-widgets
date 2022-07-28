const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const { rootPath } = require('../define.js')
console.log(rootPath)
module.exports = {
    entry: path.resolve(rootPath, './src/doc/index.ts'),
    output: {
        path: path.resolve(rootPath, './dwc/static/doc'),
        filename: 'js/index.js',
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx'],
    },
    module: {
        rules: [
            { test: /\.tsx$/, use: [path.resolve("./stencil-loader.js")]},
            { test: /\.ts$/, use: ['babel-loader']},
            {
                test: /.(sc|c)ss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
        // rules: [{ test: /\.js$/, use: ['babel-loader']}],
    },
    plugins: [
        new htmlWebpackPlugin({
            publicPath: "/static/doc/",
            filename: path.resolve(rootPath, "./dwc/templates/doc/base.html"),
            template: path.resolve(rootPath, "./src/doc/base.html")
        })
    ]
}