"use strict";

// process.env.BABEL_ENV = 'web';

const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require('vue-loader').VueLoaderPlugin;
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

let webConfig = {
    devtool: 'eval-source-map',
    target: 'web',
    entry: { web: path.join(__dirname, '../src/web/main.ts') },
    externals: {},
    output: {
        filename: '[name].js',
        path: path.join(__dirname, '../dist/web')
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: ['vue-loader']
            },
            {
                test: /\.less$/,
                use: ['vue-style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.css$/,
                use: ['vue-style-loader', 'css-loader']
            },
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/
            },
            {
                test: /\.html$/,
                use: 'vue-html-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'imgs/[name].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'fonts/[name].[ext]'
                }
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({ filename: 'styles.css' }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, '../src/index.ejs'),
            minify: {
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                removeComments: true
            },
            nodeModules: false
        }),
        new webpack.DefinePlugin({
            'process.env.IS_WEB': 'true',
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            __VUE_OPTIONS_API__: false,
            __VUE_PROD_DEVTOOLS__: false,
        }),
    ],
    optimization: {},
    resolve: {
        alias: {
            '@': path.join(__dirname, '../src/web'),
            'vue': '@vue/runtime-dom',
            'vuex': 'vuex/dist/vuex.esm-bundler',
        },
        extensions: ['.ts', '.js', '.vue', '.json', '.css']
    },
}

/**
 * Adjust webConfig for production settings
 */
if (process.env.NODE_ENV == 'production') {
    webConfig.devtool = false;

    let definePluginParams = {
        "process.env.NODE_ENV": '"production"',
    }

    webConfig.plugins.push(
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.join(__dirname, '../static/favicon.ico'),
                    to: path.join(__dirname, '../dist/web/static/favicon.ico'),
                }
            ]
        }),
        new webpack.DefinePlugin(definePluginParams),
        new webpack.LoaderOptionsPlugin({ minimize: true })
    );
} else {
    webConfig.plugins.push(
        new webpack.DefinePlugin({
            'process.env.SERVER_BASE_URL': ``
        }),
        // new BundleAnalyzerPlugin({
        //     analyzerMode: 'server',
        //     analyzerHost: '127.0.0.1',
        //     analyzerPort: 9088,
        //     reportFilename: 'report.html',
        //     defaultSizes: 'parsed',
        //     openAnalyzer: true,
        //     generateStatsFile: false,
        //     statsFilename: 'stats.json',
        //     statsOptions: null,
        //     logLevel: 'info'
        // }),
    );
}

module.exports = webConfig
