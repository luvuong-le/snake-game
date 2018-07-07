const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    plugins: [
        new MiniCssExtractPlugin({
            filename: "../css/main.css",
        })
    ],

    entry: [
        "./src/SnakeGame.ts"
    ],

    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "./dist/js")
    },
    mode: 'development',

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
                    loader: 'css-loader',
                    options: {
                        minimize: false
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