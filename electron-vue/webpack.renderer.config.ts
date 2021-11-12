"use strict";

import CopyWebpackPlugin from "copy-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import { VueLoaderPlugin } from "vue-loader";
import { Configuration, DefinePlugin, HotModuleReplacementPlugin, LoaderOptionsPlugin, NoEmitOnErrorsPlugin } from "webpack";
import { dependencies } from "../package.json";

let whiteListedModules = ["vue"];

class RendererConfig implements Configuration {
    devtool: Configuration["devtool"] = "eval-source-map";
    target: Configuration["target"] = "electron-renderer";
    entry: Configuration["entry"] = { renderer: path.join(__dirname, "../src/renderer/main.ts") };
    externals: Configuration["externals"] = [...Object.keys(dependencies || {}).filter(d => !whiteListedModules.includes(d)),];
    mode: Configuration["mode"] = "production";

    module: Configuration["module"] = {
        rules: [
            {
                test: /\.vue$/,
                use: ["vue-loader"],
            },
            {
                test: /\.scss$/,
                use: ["vue-style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.sass$/,
                use: ["vue-style-loader", "css-loader", "sass-loader?indentedSyntax"]
            },
            {
                test: /\.less$/,
                use: ["vue-style-loader", "css-loader", "less-loader"]
            },
            {
                test: /\.css$/,
                use: ["vue-style-loader", "css-loader"]
            },
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/
            },
            {
                test: /\.node$/,
                use: "node-loader"
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: "url-loader",
                options: {
                    limit: 10000,
                    name: "imgs/[name]--[folder].[ext]"
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: "url-loader",
                options: {
                    limit: 10000,
                    name: "media/[name]--[folder].[ext]"
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: "url-loader",
                options: {
                    limit: 10000,
                    name: "fonts/[name]--[folder].[ext]"
                }
            }
        ]
    };


    // node: Configuration["node"] = {
    //     __dirname: process.env.NODE_ENV !== "production",
    //     __filename: process.env.NODE_ENV !== "production"
    // };

    plugins: Configuration["plugins"] = [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: path.resolve(__dirname, "../src/index.ejs"),
            minify: {
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                removeComments: true
            },
            nodeModules: process.env.NODE_ENV !== "production" ? path.resolve(__dirname, "../node_modules") : false
        }),
        new HotModuleReplacementPlugin(),
        new NoEmitOnErrorsPlugin(),
        new DefinePlugin({
            __VUE_OPTIONS_API__: true,
            __VUE_PROD_DEVTOOLS__: true,
        }),
    ];

    output: Configuration["output"] = {
        filename: "[name].js",
        libraryTarget: "commonjs2",
        path: path.join(__dirname, "../dist/electron")
    };

    resolve: Configuration["resolve"] = {
        alias: {
            "@": path.join(__dirname, "../src/renderer"),
            'vue': '@vue/runtime-dom',
            'vuex': 'vuex/dist/vuex.esm-bundler',
        },
        extensions: [".js", ".ts", ".vue", ".json", ".css", ".node"]
    };

    init(): RendererConfig {
        if (process.env.NODE_ENV !== "production") {
            this.plugins.push(
                new DefinePlugin({
                    "__static": `"${path.join(__dirname, "../static").replace(/\\/g, "\\\\")}"`
                })
            );
        }

        if (process.env.NODE_ENV === "production") {
            this.devtool = false;

            this.plugins.push(new LoaderOptionsPlugin({ minimize: true }));

            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: path.join(__dirname, "../static/icon.ico"),
                        to: path.join(__dirname, "../dist/electron/static/icon.ico"),
                    },
                    {
                        from: path.join(__dirname, "../static/icon_*.png"),
                        to: path.join(__dirname, "../dist/electron/"),
                    }
                ],
            });

            this.plugins.push(new CopyWebpackPlugin({
                patterns: [
                    {
                        from: path.join(__dirname, "../static/icon.ico"),
                        to: path.join(__dirname, "../dist/electron/static/icon.ico"),
                    },
                    {
                        from: path.join(__dirname, "../static/icon_*.png"),
                        to: path.join(__dirname, "../dist/electron/"),
                    }
                ],
            }));
        } else {
            this.plugins.push(
                new DefinePlugin({
                    'process.env.SERVER_BASE_URL': ``
                }),
                // new BundleAnalyzerPlugin({
                //     analyzerMode: 'server',
                //     analyzerHost: '127.0.0.1',
                //     analyzerPort: 9089,
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

export default RendererConfig;