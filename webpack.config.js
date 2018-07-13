var path = require('path');
var webpack = require('webpack');
require("babel-polyfill");
module.exports = {
    mode: 'development',
    entry: ["babel-polyfill", './src/index.js'],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'app.bundle.js',
        publicPath: './build/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015'],
                    plugins: ["transform-object-rest-spread"]
                }
            },
            {
                test: require.resolve('jquery'),
                use: [{
                    loader: 'expose-loader',
                    options: 'jQuery'
                },{
                    loader: 'expose-loader',
                    options: '$'
                }]                
            },
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            { test: /\.png$/, use: 'file-loader' },
            { test: /\.gif$/, use: 'file-loader' }
        ]
    },
    stats: {
        colors: true
    },
    devtool: 'source-map'
};
