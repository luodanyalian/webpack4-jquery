const webpack = require('webpack');
const merge = require('webpack-merge');
const WebpackHtmlPlugin = require('html-webpack-plugin');
const fs = require('fs');
const path = require('path');
const base = require('./webpack.base.config.js');

let htmlArr = fs.readdirSync(path.resolve(__dirname, '../src/pages'));

let entrys = {};
let htmlPlugins = [];

for(let item of htmlArr){
	//我们只需要.html前面的文件名
	let name = item.split('.html')[0];

    const type = path.parse(item);
    if(type.ext == '.html'){
        htmlPlugins.push(new WebpackHtmlPlugin({
            filename: item,
            template: 'html-withimg-loader!'+path.resolve(__dirname, `../src/pages/${item}`),
            //common代表公共模块，name就是html对应的同名js文件
            //这个配置将会自动在生成的html中插入你指定的js
            // chunks: ['js/common', name]
        }));
        //配置入口
        entrys[name] = `./src/js/${name}.js`;
	}
};


let fileArr = ['index','product','test','service','tactic','brand','network','apps','retailstore','themes','memberCenter']

for(fileItem of fileArr){
    let fileIndex = fs.readdirSync(path.resolve(__dirname, '../src/pages/' + fileItem));
    for(let indexItem of fileIndex){
        let indexName = indexItem.split('.html')[0];
        htmlPlugins.push(new WebpackHtmlPlugin({
            // filename: item,
            filename: `pages/${fileItem}/${indexItem}`,
            template: 'html-withimg-loader!'+path.resolve(__dirname, `../src/pages/${fileItem}/${indexItem}`),
            chunks: ['js/common', indexName],
            // 指定引用那些公众文件
            inject: true,
            // minify: {
            // 	removeComments: true,
            // 	collapseWhitespace: true,
            // 	removeAttributeQuotes: true
            // 	// 更多配置:
            // 	// https://github.com/kangax/html-minifier#options-quick-reference
            // },
        }));
        entrys[indexName] = `./src/js/${fileItem}/${indexName}.js`;
    };

}


module.exports = merge(base, {
	//传入entry配置
	mode: 'development',
	entry: entrys,
	devtool: "cheap-module-eval-source-map",
	devServer: {
		contentBase: path.join(__dirname,'../', "dist"),
		compress: true,
		port: 8080,
		// hot: true,
		index: './pages/index/index.html',
		// index: './pages/themes/spaceExploration.html',
		// index: './pages/memberCenter/memberCenter.html',
        // index: './pages/service/service.html,
        // index: './pages/tactic/tacticList.html',
        // index: './pages/tactic/tacticDetail.html',
        // index: './pages/retailstore/retailstore.html',
        // index: './pages/product/blocksList.html',
        // index: './pages/brand/about.html',
        // index: './pages/brand/contact.html',
        // index: './pages/brand/newsList.html',
        // index: './pages/brand/newsDetail.html',
        // index: './pages/network/nonetwork.html',
        // index: './pages/brand/contact.html',
        // index: './pages/brand/newsList.html',
        // index: './pages/brand/newsDetail.html',
        // index: './pages/brand/cooperation.html',
        // index: './pages/network/nonetwork.html',
        // index: './pages/product/productMain.html',
        // index: './pages/product/blocksList.html',
        // index: './pages/product/toysList.html',
        // index: './pages/product/productMain.html',
        // index: './pages/apps/appList.html',
        // index: './pages/apps/appMain.html',
        // index: './pages/product/products.html',
        open: true
	},
	plugins: [
		//传入html-webpack-plugin配置对象
		...htmlPlugins,
		new webpack.DefinePlugin({
			'process.env': {NODE_ENV: '"development"'}
		}),
	]
});