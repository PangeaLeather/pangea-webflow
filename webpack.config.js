const path = require('path')
const glob = require('glob')
const extract = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TerserPlugin = require('terser-webpack-plugin');
const entries = glob.sync('./src/js/*').reduce((entries, entry) => {
    const entryName = path.parse(entry).name
    entries[entryName] = entry

    return entries
}, {});

module.exports = {
    // entry: {
    //     globalfooter: {
    //         import: './src/js/00.global-footer.js',
    //         // dependOn: 'shared',
    //     },
    //     globalhead: {
    //         import: './src/js/00.global-head.js',
    //         // dependOn: 'shared',
    //     },
    //     who: {
    //         import: './src/js/02.who.js',
    //         // dependOn: 'shared',
    //     },
    //     who: {
    //         import: './src/js/02.who.js',
    //         // dependOn: 'shared',
    //     }
    // },
    entry: entries,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js',
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
                test: /\.(eot|woff|woff2|ttf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'fonts'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new extract({
            filename: 'css/[name].css'
        }),
        // new BundleAnalyzerPlugin()
    ],
    externals: {
        jquery: 'jQuery'
    },
    optimization: {
        minimizer: [new TerserPlugin({
            extractComments: false,
        })],
    },
    mode: 'production'
}