const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common.js')

module.exports = merge(commonConfig, {
    mode: 'development',
    devServer: {
        writeToDisk: true,
        port: 8003
    }
})