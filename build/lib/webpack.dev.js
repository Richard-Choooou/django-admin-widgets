const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common.js')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');
const { rootPath } = require('../define.js');

module.exports = merge(commonConfig, {
    mode: 'development',
    entry: path.resolve(rootPath, './src/index.ts'),
    output: {
        path: path.resolve(rootPath, './dwc-dev/static/dwc'),
        filename: 'js/dwc.min.js',
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/dwc.min.css",
            chunkFilename: "[id].min.css"
        }),
    ],
    devServer: {
        writeToDisk: true,
        port: 8001
    }
}) 