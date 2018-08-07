const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // html引擎
//const ExtractTextPlugin = require('extract-text-webpack-plugin'); //抽离css
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const base = require("./webpack.base.config");
base.devServer = {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 8000,
    hot: true
};
base.devtool = "inline-source-map";
base.plugins.push(new webpack.HotModuleReplacementPlugin(), new webpack.NamedModulesPlugin());
const config = {
    ...base
};
module.exports = config;