const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const { rootPath } = require('../define.js')
console.log(rootPath)
module.exports = {
    entry: path.resolve(rootPath, './_template/index.ts'),
    output: {
        path: path.resolve(rootPath, './static/preview'),
        filename: 'js/template.js',
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
            publicPath: "/static/preview/",
            filename: path.resolve(rootPath, "./templates/preview/base.html"),
            template: path.resolve(rootPath, "./_template/base.html")
        })
    ]
}