const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const { rootPath } = require('../define.js')

module.exports = {
    entry: path.resolve(rootPath, './src/index.ts'),
    output: {
        path: path.resolve(rootPath, './static/dwc'),
        filename: 'js/library.js',
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx'],
    },
    module: {
        rules: [
            { test: /\.tsx$/, use: [path.resolve(rootPath, "./build/lib/stencil-loader.js")]},
            { test: /\.ts$/, use: ['babel-loader']},
            {
                test: /.(sc|c)ss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            // {
            //     test: /\.(woff|woff2|eot|ttf|otf)$/,
            //     use: [{
            //         loader:'file-loader',
                    
            //         options: {
            //             folder: 'fonts',
            //             name: '[name].[ext]',//path为相对于context的路径
            //         }
            //     }]
            // }
        ]
        // rules: [{ test: /\.js$/, use: ['babel-loader']}],
    },
    plugins: [

    ]
}