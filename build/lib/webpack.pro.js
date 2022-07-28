const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common')
const path = require("path")
const { rootPath } = require('../define');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(commonConfig, {
    mode: 'production',
    entry: path.resolve(rootPath, './src/index.ts'),
    output: {
        path: path.resolve(rootPath, './dwc/static/dwc'),
        filename: 'js/dwc.min.js',
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/dwc.min.css",
            chunkFilename: "[id].min.css"
        }),
    ]
})
