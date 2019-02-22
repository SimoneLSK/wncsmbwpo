

const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');
const fs = require('fs')

const appRoot = path.resolve(__dirname, '../');

const babelLoader = {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    include: [
        path.resolve(appRoot, 'index.js'),
        path.resolve(appRoot, 'App.js'),
        path.resolve(appRoot, 'src'),
        path.resolve(appRoot, '../shares'),
    ],
    use: {
      loader: "babel-loader",
      options: {
        babelrc: false,
        presets: ["@babel/preset-env", "@babel/preset-react"]
      }
    }
}

const htmlLoader = {
    test: /\.html$/,
    use: [{
        loader: "html-loader",
        options: { minimize: true }
    }]
}

const htmlPlugin = new HtmlWebPackPlugin({
    template: path.resolve(appRoot, 'public/index.html'),
    filename: path.resolve(appRoot, 'public/index.html'),
})

const devServerConfig = {
    port: 4037,
    historyApiFallback: true,
    hot: true,
    contentBase: path.resolve(appRoot, 'public'),
    inline: true,
    open: true
}

module.exports = {
        entry: path.resolve(appRoot, 'index.js'),
        output: {
            filename: 'bundle.js',
            path: path.resolve(appRoot, 'public'),
        },
        module: {
            rules: [babelLoader, htmlLoader],
        },
        resolve: {
            modules: ['node_modules'],
            alias: {
                shares: path.resolve(appRoot, '../shares'),
                src: path.resolve(appRoot, 'src')
            }
        },
        node: { fs: 'empty' },
        plugins: [htmlPlugin],
        devServer: devServerConfig,
        //node: { fs: 'empty' },
};