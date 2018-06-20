var path = require('path');
module.exports = {
    entry: './src/index.ts',
    devtool: 'inline-source-map',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: './build/'
    },
    module: {
        rules: [
            {
                use: 'ts-loader',
                test: /\.ts?$/
            },
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            { test: /\.png$/, use: 'file-loader' },
            { test: /\.gif$/, use: 'file-loader' }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js', '.json']
    }
}