const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const merge = require('webpack-merge')
const webpackBaseConfig = require('./webpack.base.config.js')

// process.noDeprecation = trues
module.exports = merge(webpackBaseConfig, {
    output: {
        publicPath: './',
        filename: 'jquery.selectscroll.js',
        chunkFilename: 'jquery.selectscroll.chunk.js'
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true
            }
        }),
        new HtmlWebpackPlugin({
            filename: './index.html',
            template: 'index_pro.ejs',
            inject: false
        })
    ]
})
