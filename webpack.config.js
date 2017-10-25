const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: {
        app: [
            'babel-polyfill',
            path.resolve(__dirname, 'src/index.js')
        ]
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'server.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    target: 'node',
    externals: [new nodeExternals()]
};
