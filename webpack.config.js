const path = require('path');
const extract = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    entry: {
        global: {
            import: './src/js/00.global.js',
            // dependOn: 'shared',
        },
        who: {
            import: './src/js/02.who.js',
            // dependOn: 'shared',
        },
        shared: 'jquery',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: extract.loader
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass')
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'images'
                        }
                    }
                ]
            },
            {
                test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 100000,
                            name: '[name].[ext]'
                        }
                    }
                ]
            },

        ]
    },
    plugins: [
        new extract({
            filename: '[name].css'
        }),
        // new BundleAnalyzerPlugin()
    ],
    externals: {
        jquery: 'jQuery'
    },
    mode: 'production'
}