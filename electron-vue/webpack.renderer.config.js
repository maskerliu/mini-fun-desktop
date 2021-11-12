"use strict";

const path = require("path");
const { dependencies } = require("../package.json");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");

let whiteListedModules = ["vue"];

let rendererConfig = {
    devtool: "eval-source-map",
    target: "web",
    entry: { renderer: path.join(__dirname, "../src/renderer/main.ts") },
    externals: [...Object.keys(dependencies || {}).filter(d => !whiteListedModules.includes(d)),],
    output: {
        filename: "[name].js",
        path: path.join(__dirname, "../dist/electron")
    },
    module: {
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
    },
    node: {
        global: false,
        __dirname: process.env.NODE_ENV !== "production",
        __filename: process.env.NODE_ENV !== "production"
    },
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({ filename: "styles.css" }),
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
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            __VUE_OPTIONS_API__: true,
            __VUE_PROD_DEVTOOLS__: true,
        }),
    ],
    resolve: {
        alias: {
            "@": path.join(__dirname, "../src/renderer"),
            'vue': '@vue/runtime-dom',
            'vuex': 'vuex/dist/vuex.esm-bundler',
        },
        extensions: [".js", ".ts", ".vue", ".json", ".css", ".node"]
    },
};

/**
 * Adjust rendererConfig for development settings
 */
if (process.env.NODE_ENV !== "production") {
    rendererConfig.plugins.push(
        new webpack.DefinePlugin({
            "__static": `"${path.join(__dirname, "../static").replace(/\\/g, "\\\\")}"`
        })
    );
}

/**
 * Adjust rendererConfig for production settings
 */
if (process.env.NODE_ENV === "production") {
    rendererConfig.devtool = false;

    let definePluginParams = {
        "process.env.NODE_ENV": '"production"',
    }

    rendererConfig.plugins.push(
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.join(__dirname, "../static/icon.ico"),
                    to: path.join(__dirname, "../dist/electron/static/icon.ico")
                },
                {
                    from: path.join(__dirname, "../static/icon_*.png"),
                    to: path.join(__dirname, "../dist/electron/")
                }
            ]
        }),
        new webpack.DefinePlugin(definePluginParams),
        new webpack.LoaderOptionsPlugin({ minimize: true })
    );
} else {
    rendererConfig.plugins.push(
        new webpack.DefinePlugin({
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

module.exports = rendererConfig;