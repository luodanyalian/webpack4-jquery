const webpack = require("webpack");
const path = require("path");
const glob = require("glob");
const CleanWebpackPlugin = require('clean-webpack-plugin'); // 清理dist文件夹
const HtmlWebpackPlugin = require("html-webpack-plugin"); // html引擎
//const ExtractTextPlugin = require('extract-text-webpack-plugin'); //抽离css
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PurifyCSSPlugin = require("purifycss-webpack")
const final = buildEntriesAndHTML();
const base = {
  entry: final.entries,
  output: {
    filename: "js/[name].js",
    path: __dirname + "/dist" //必须是绝对路径
  },
  module: {
    rules: [
    {
      test: /\.css$/,
      use: [
        'css-hot-loader', //支持热更新
        MiniCssExtractPlugin.loader,
        "css-loader",
        'postcss-loader'
      ]
    }, 
    {
      test: /\.scss$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'postcss-loader',
        'sass-loader'
      ]
    }, {
      test: /\.(png|jpg|gif)$/,
      use: [{
        loader: 'file-loader'
      }]
    }, {
      test: /\.(png|jpg|gif)$/,
      use: [{
        loader: 'url-loader', // base64
        options: {
          limit: 8192
        }
      }]
    }, {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
        options: {
          cacheDirectory: true // 使用缓存
        }
      }, {
        loader: path.resolve("./inject-loader.js") // 开发模式使用注入代码实现html热更新，注入normalize.css
      }]
    }, {
      test: /\.html$/,
      use: [{
        loader: 'html-loader',
        options: {
          interpolate: 'require'
        }
      }],
    }],
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new webpack.ProvidePlugin({ //加载jq
      $: 'jquery'
    }),
    //new ExtractTextPlugin("[name].css"), // 样式抽离不支持热更新
    new MiniCssExtractPlugin({
      filename: "/css/[name].css",
      chunkFilename: "/css/[id].css"
    }),
    new PurifyCSSPlugin({
        //消除冗余代码
        // 首先保证找路径不是异步的,所以这里用同步的方法
        // path.join()也是path里面的方法,主要用来合并路径的
        // 'src/*.html' 表示扫描每个html的css
        paths: glob.sync(path.join(__dirname, 'src/*/*.html')),
    }), ...final.htmls
  ],
  resolve: {
    extensions: [".js", ".json", ".jsx", ".css", "scss"]
  },
  externals: {} // 用来配置require的返回。一般用于加载cdn
}

function buildEntriesAndHTML() {
  // 用来构建entery
  const result = glob.sync("src/**/*.js");
  const config = {
    hash: true,
    inject: true
  }
  const entries = {};
  const htmls = [];
  result.forEach(item => {
    const one = path.parse(item);
    const outputfile = one.dir.split("/").slice(-1)[0];
    entries[outputfile] = "./" + item;
    htmls.push(new HtmlWebpackPlugin({
      ...config,
      template: "./" + one.dir + "/index.html",
      filename: outputfile === "index" ? "./index.html" : "./" + outputfile + "/index.html", // 输出html文件的路径
      chunks: [outputfile]
    }));
  });
  return {
    entries,
    htmls
  }
}
module.exports = base;
