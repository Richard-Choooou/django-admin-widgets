const path = require('path')
const { rootPath } = require('../define.js')
console.log(rootPath)
module.exports = {
    entry: path.resolve(rootPath, './src/doc/index.ts'),
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
    }
}