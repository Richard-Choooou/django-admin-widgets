const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common.js')
const path = require("path")
const { rootPath } = require('../define.js')
const htmlWebpackPlugin = require('html-webpack-plugin')


module.exports = merge(commonConfig, {
    mode: 'development',
    output: {
        path: path.resolve(rootPath, './dwc-dev/static/doc'),
        filename: 'js/index.js',
    },
    devServer: {
        writeToDisk: true,
        port: 8003
    },
    plugins: [
        new htmlWebpackPlugin({
            publicPath: "/static/doc/",
            filename: path.resolve(rootPath, "./dwc-dev/templates/doc/base.html"),
            template: path.resolve(rootPath, "./src/doc/base.html")
        })
    ]
})