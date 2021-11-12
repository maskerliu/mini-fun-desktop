"use strict";

import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from "html-webpack-plugin";
import path from 'path';
import { VueLoaderPlugin } from 'vue-loader';
import { Configuration, DefinePlugin, HotModuleReplacementPlugin, LoaderOptionsPlugin, NoEmitOnErrorsPlugin } from 'webpack';


class WebConfig implements Configuration {
    devtool: Configuration["devtool"] = "eval-source-map";
    target: Configuration["target"] = "web";
    entry: Configuration["entry"] = { web: path.join(__dirname, '../src/web/main.ts') };
    externals: Configuration["externals"] = {};
    mode: Configuration["mode"] = "production";

    module: Configuration["module"] = {
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
    };

    plugins: Configuration["plugins"] = [
        new VueLoaderPlugin(),
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
        new DefinePlugin({
            'process.env.IS_WEB': 'true',
        }),
        new HotModuleReplacementPlugin(),
        new NoEmitOnErrorsPlugin(),
        new DefinePlugin({
            __VUE_OPTIONS_API__: false,
            __VUE_PROD_DEVTOOLS__: false,
        }),
    ];

    output: Configuration["output"] = {
        filename: '[name].js',
        path: path.join(__dirname, '../dist/web')
    };

    resolve: Configuration["resolve"] = {
        alias: {
            '@': path.join(__dirname, '../src/web'),
            'vue': '@vue/runtime-dom',
            'vuex': 'vuex/dist/vuex.esm-bundler',
        },
        extensions: ['.ts', '.js', '.vue', '.json', '.css']
    };

    init(): WebConfig {
        if (process.env.NODE_ENV == 'production') {
            this.devtool = false;
            this.plugins.push(
                new CopyWebpackPlugin({
                    patterns: [
                        {
                            from: path.join(__dirname, '../static/favicon.ico'),
                            to: path.join(__dirname, '../dist/web/static/favicon.ico'),
                        }
                    ]
                })
            );

            this.plugins.push(new DefinePlugin({ "process.env.NODE_ENV": '"production"' }));
            this.plugins.push(new LoaderOptionsPlugin({ minimize: true }));
        } else {
            this.plugins.push(
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

        return this;
    }
};

export default WebConfig;
