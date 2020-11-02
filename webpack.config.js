const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const isDev = process.env.MODE === 'development'

const config = {
    mode: isDev ? 'development' : 'production',
    entry: path.resolve(__dirname, 'index.tsx'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    module: {
        rules: [
            {
                test: /\.[jt]sx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'index.html'),
            wsEndpoint: isDev ? 'ws://192.168.1.121:9001/ws' : 'wss://api.chat.itoken.no/ws',
        }),
    ],
}

if (isDev) {
    config.devServer = {
        port: 9000,
        host: '0.0.0.0',
        open: false,
        hot: true,
        compress: true,
        stats: 'errors-only',
        overlay: true,
        historyApiFallback: true,
    }
}

module.exports = config
