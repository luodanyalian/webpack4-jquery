const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const fs = require('fs');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const devMode = process.env.NODE_ENV==='development';

function resolve (dir) {
  return path.join(__dirname, '../', dir)
}

const version = '2018090401';
// 赐参数为版本号

module.exports = {
	context: path.resolve(__dirname, '../'),
	output: {
		//publicPath: '../',
		// filename: 'js/[name].[chunkhash].js',
		// chunkFilename: '[name].[chunkhash].js',
        filename: 'js/[name].' + version + '.js',
        chunkFilename: '[name].' + version + '.js',
		path: resolve('dist')
	},
	resolve: {
		alias: {
			'@': resolve('src')
		}
	},

	module: {
		rules: [
			// {
			// 	test: /\.js$/,
			// 	loader: 'babel-loader',
			// 	include: resolve('src/js')
			// },
			// {
			// 	test: /\.(sa|sc|c)ss$/,
			// 	use: [
			// 		devMode?'style-loader':{
			// 			loader:MiniCssExtractPlugin.loader,
			// 			options: {
			// 				publicPath: '../'
			// 			}
			// 		},
			// 		'css-loader',
			// 		'sass-loader',
             //        'postcss-loader'
			// 	]
			// },
            {
				test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        interpolate: 'require',
                        attrs: ['img:src', 'img:data-original']
                    }
                }],
			},
            // {
            //     test: /\.(png|jpg|gif)$/,
            //     use: [{
            //         // loader: 'file-loader?limit=8192&name=./static/img/[hash].[ext]'
            //         // loader: 'file-loader?limit=8192&name=./static/img/[name].'+ version + '.[ext]'
            //         loader: 'url-loader?limit=8192&name=./static/img/[name].'+ version + '.[ext]'
            //     }]
            // },
			{
				test: /\.(png|jpe?g|gif|svg)$/,
				loader: 'file-loader',
				options: {
					// limit: 0,
					name: 'static/img/[name].'+version+'.[ext]',
                    publicPath: '../../'
				}
			},
			 {
                // test:/\.scss$/,
                test: /\.(sa|sc|c)ss$/,
                use: [
                    devMode?'style-loader':{
                        loader:MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../'
                        }
                    },
                    'css-loader?importLoaders=1',
                    'postcss-loader',
                    'sass-loader'
                ]
            },
			// 引入jquery
            {
                test: require.resolve('jquery'),
                use: [{
                    loader: 'expose-loader',
                    options: 'jQuery'
                },{
                    loader: 'expose-loader',
                    options: '$'
                }]
            }
		]
	},
	optimization: {
		//用于分离公共js模块
		splitChunks: {
			chunks: 'all',
			name: 'js/common'
		}
	},
	plugins: [
		new MiniCssExtractPlugin({
			//  编译
			filename: devMode ? 'pages/css/[name].css' : 'pages/css/[name].' + version + '.css',
            chunkFilename: devMode ? 'pages/css/[id].css' : 'pages/css/[id].' + version + '.css',
			//开发环境
            // filename: devMode ? 'css/[name].' + version + '.css':'css/[name].' + version + '.css',
            // chunkFilename: devMode ? 'css/[id].css' : 'css/[id].' + version + '.css',
		}),
		new CleanWebpackPlugin(['dist'],{root: path.resolve(__dirname, '../')}),
		// // 拷贝图片
		// new CopyWebpackPlugin([{
  //           from: resolve('src/static'),
  //           to:resolve('dist/static')
  //       }]),
		// //懒加载
		new CopyWebpackPlugin([{
            from: path.resolve(__dirname, '../src/js/utils/lazyload.js'),
            to:path.resolve(__dirname,  '../dist/js/utils/')
        }]),
        // 版本号
		new CopyWebpackPlugin([{
            from: path.resolve(__dirname, '../src/static/staticversion.txt'),
            to:path.resolve(__dirname,  '../dist/static/')
        }]),
	]
};
