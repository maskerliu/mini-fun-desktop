"use strict";

import path from "path";
import { Configuration, DefinePlugin, NoEmitOnErrorsPlugin } from "webpack";
import { dependencies } from "../package.json";


class MainConfig implements Configuration {
    devtool: Configuration["devtool"] = "source-map";
    target: Configuration["target"] = "electron-main";
    entry: Configuration["entry"] = path.join(__dirname, "../src/main/index.ts");
    externals: Configuration["externals"] = [...Object.keys(dependencies || {})];
    mode: Configuration["mode"] = "production";

    module: Configuration["module"] = {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/
            },
            {
                test: /\.node$/,
                use: "node-loader"
            }
        ]
    };

    node: Configuration["node"] = {
        __dirname: process.env.NODE_ENV !== "production",
        __filename: process.env.NODE_ENV !== "production"
    };

    output: Configuration["output"] = {
        filename: "[name].js",
        libraryTarget: "commonjs2",
        path: path.join(__dirname, "../dist/electron")
    };

    plugins: Configuration["plugins"] = [new NoEmitOnErrorsPlugin()];

    resolve: Configuration["resolve"] = {
        extensions: [".js", ".ts", ".json", ".node"]
    };

    init() :Configuration{
        if (process.env.NODE_ENV !== "production") {
            this.plugins.push(
                new DefinePlugin({
                    "__static": `"${path.join(__dirname, "../static").replace(/\\/g, "\\\\")}"`
                })
            );
        }

        if (process.env.NODE_ENV === "production") {
            this.devtool = false;
            this.plugins.push(new DefinePlugin({ "process.env.NODE_ENV": '"production"' }));
        }

        return this;
    }
}

export default MainConfig;