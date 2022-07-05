const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common.js')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(commonConfig, {
    mode: 'development',
    entry: path.resolve(rootPath, './src/index.ts'),
    output: {
        path: path.resolve(rootPath, './static/dwc'),
        filename: 'js/dwc.min.js',
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/dwc.min.[hash:8].css",
            chunkFilename: "[id].min.css"
        }),
    ],
    devServer: {
        writeToDisk: true,
        port: 8001
    }
}) 