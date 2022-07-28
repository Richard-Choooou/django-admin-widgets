const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common.js')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(commonConfig, {
    mode: 'production',
    output: {
        path: path.resolve(rootPath, './dwc/static/doc'),
        filename: 'js/index.js',
    },
    plugins: [
        new htmlWebpackPlugin({
            publicPath: "/static/doc/",
            filename: path.resolve(rootPath, "./dwc/templates/doc/base.html"),
            template: path.resolve(rootPath, "./src/doc/base.html")
        })
    ]
})