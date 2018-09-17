const webpack = require('webpack');
const merge = require('webpack-merge');
const WebpackHtmlPlugin = require('html-webpack-plugin');
const fs = require('fs');
const path = require('path');
const base = require('./webpack.base.config.js');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

let htmlArr = fs.readdirSync(path.resolve(__dirname, '../src/pages'));

let entrys = {};
let htmlPlugins = [];

for(let item of htmlArr){
	let name = item.split('.html')[0];

    const type = path.parse(item);
    if(type.ext == '.html'){
        htmlPlugins.push(new WebpackHtmlPlugin({
            // filename: item,
            filename: `pages/${item}`,
            template: 'html-withimg-loader!'+path.resolve(__dirname, `../src/pages/${item}`),
            chunks: ['js/common', name],
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
	mode: 'production',
	entry: entrys,
	plugins: [
		...htmlPlugins,
		new webpack.DefinePlugin({
			'process.env': {NODE_ENV: '"production"'}
		}),
		new UglifyJsPlugin({
			uglifyOptions: {
				compress: {
					warnings: false
				}
			},
			//生产环境默认不使用source-map
			//sourceMap: "#source-map",
			parallel: true
		}),
	]
});