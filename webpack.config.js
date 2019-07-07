const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");

module.exports = {
    plugins: [
        new MiniCssExtractPlugin({
            filename: "../css/main.css",
        }),
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,
            server: {
                baseDir: "./"
            }
        })
    ],

    entry: [
        "./src/SnakeGame.ts"
    ],

    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "./dist/js")
    },
    mode: 'production',

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },

    module: {
        rules: [{
            test: /\.scss$/,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader
                },
                {
                    loader: 'css-loader'
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        ident: 'postcss',
                    }
                },
                "sass-loader"
            ]
        },
        {
            test: /\.ts$/,
            loader: 'awesome-typescript-loader'
        }]
    }
}