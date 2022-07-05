const { merge } = require('webpack-merge')
const webpack = require('webpack')
const commonConfig = require('./webpack.common')
const path = require("path")
const globby = require('globby')
const { rootPath } = require('../define')
const { getComponents } = require('../utils')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackTemplatePlugin = require("./plugins/template-plugin")

function genEntry() {
    const components = getComponents()
    const paths = components.reduce((prev, val) => {
        prev[val] = path.resolve(rootPath, `./packages/${val}/${val}.tsx`)
        return prev
    }, {})
    return paths
}

function genTemplatePlugins() {
    const components = getComponents()
    return components.map((val) => {
        return new WebpackTemplatePlugin({
            template: path.resolve(rootPath, `./packages/${val}/${val}.py`),
            filename: `../../widgets/${val}.py`,
            publicPath: "./dwc-components",
            chunks: [`${val}`]
        })
    })
}

module.exports = merge(commonConfig, {
    mode: "production",
    entry: genEntry(),
    output: {
        path: path.join(rootPath, "/static/dwc-components"),
        filename: 'js/[name].[hash:8].js',
        module: false,
        // libraryTarget: 'umd',
        // libraryExport: 'default'
    },
    optimization: {
        splitChunks: {
            name: "dwc.chunks.min",
            chunks: "all",
            minChunks: 1
        },
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/dwc.min.[hash:8].css",
            chunkFilename: "[id].min.css"
        }),
        ...genTemplatePlugins()
    ]
})
