const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const PostCompilePlugin = require('webpack-post-compile-plugin')

module.exports = {
    entry: {
        main: './src/main.js',
        vendors: './src/vendors.js'
    },
    output: {
        path: path.resolve(__dirname, '../dist')
    },
    module: {
        rules: [
        {
            test: /\.js$/,
            loader: 'babel-loader',
            include: path.resolve('src'),
            options: {
             presets: ['es2015']
            }

        },
        {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                use: ['css-loader?minimize', 'autoprefixer-loader'],
                fallback: 'style-loader'
            })
        },
        {
            test: /\.less/,
            use: ExtractTextPlugin.extract({
                use: ['css-loader?minimize', 'autoprefixer-loader', 'less-loader'],
                fallback: 'style-loader'
            })
        },
        {
            test: /\.styl|\.stylus/,
            use: ExtractTextPlugin.extract({
                use: ['css-loader?minimize', 'autoprefixer-loader', {
                    loader: 'stylus-loader',
                    options: {
                        'resolve url': true
                    }
                }],
                fallback: 'style-loader'
            })
        },
        {
            test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
            loader: 'url-loader?limit=1024'
        },
        {
            test: /\.(html|tpl)$/,
            loader: 'html-loader'
        }
        ]
    },
    plugins: [
        new PostCompilePlugin()
    ]
}
