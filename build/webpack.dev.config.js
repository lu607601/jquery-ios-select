const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const merge = require('webpack-merge')
const webpackBaseConfig = require('./webpack.base.config.js')
const { networkInterfaces } = require('os')

const getIpAddress = () => (networkInterfaces().en0 || networkInterfaces().en4).filter(({ family }) => family === 'IPv4')[0].address

// process.noDeprecation = true
module.exports = merge(webpackBaseConfig, {
    devtool: 'eval-source-map',
    devServer: {
        clientLogLevel: 'warning',
        contentBase: __dirname,
        host: getIpAddress(),
        compress: true,
        historyApiFallback: true,
        open: true,
        disableHostCheck: true
    },
    output: {
        publicPath: '/',
        filename: '[name].js',
        chunkFilename: '[name].chunk.js'
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
            filename: 'vendors.js'
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
})
