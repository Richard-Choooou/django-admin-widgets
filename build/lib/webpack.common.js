const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const { rootPath } = require('../define.js')
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const config = {
    resolve: {
        extensions: ['.js', '.ts', '.tsx'],
    },
    optimization: {
        minimizer: [
            // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
            // `...`,
            `...`,
            new CssMinimizerPlugin(),
        ],
    },
    module: {
        rules: [
            { test: /\.tsx$/, use: ['babel-loader', path.resolve(rootPath, "./build/lib/loaders/stencil-loader.js")] },
            { test: /\.ts$/, use: ['babel-loader'] },
            {
                test: /.(sc|c)ss$/,
                oneOf: [{
                    resourceQuery: /tag=/,
                    use: [path.resolve(rootPath, "./build/lib/loaders/stencil-css-loader.js"), 'sass-loader']
                }, {
                    resourceQuery: /.*/,
                    use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
                }]
            }
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
        new CleanWebpackPlugin()
    ]
}

module.exports = config