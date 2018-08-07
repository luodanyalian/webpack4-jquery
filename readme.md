### wepack4 搭建多页面脚手架学习

一些升级到 webpack4 的 tips:

- extract-text-webpack-plugin 必须 4+版本才可以在 webpack4 中用
- webpack4 中必须提供 mode 参数，process.env.NODE_ENV 的值为 production 或 development

该脚手架目前基本可用开发小型多页面。

使用

```
npm install
npm run dev // 开发模式 8000端口
npm run build // 构建
```

## 特性相关

### babel

babel 的强大性不多说了。我们写前端最重要的就是装 x。使用各种高大上的 ES6789 语法来写 js，但是浏览器不兼容就需要 babel 来进行转码了。

- babel 是不转换新的关键字那些语法。需要通过`yarn add babel-plugin-transform-runtime --dev`和`yarn add babel-runtime --save`。再.babelrc 中配置。[参考](http://babeljs.io/docs/plugins/transform-runtime/)

### jquery 全局加载

```javascript
    new webpack.ProvidePlugin({ //加载jq
      $: 'jquery'
    }),
```

### css 样式抽离和热更新

引入 normalize.css 消除浏览器差异

一般都是使用 extract-text-webpack-plugin 来实现 css 样式抽离，但是抽离的样式是不支持热更新的。在 webpack4 的文档中，官方也推荐我们使用 mini-css-extract-plugin 代替 extract-text-webpack-plugin，并且该 plugin 配合 css-hot-loader 可以实现样式抽离和热刷新的。

### postcss

autoprefixer css 自动添加前缀

### 添加类似模板那样的头部、尾部、身部页面拼装

```html
<!DOCTYPE html>
<html lang="en">
<head>
${require('../common/meta.html')}
</head>
<body>
    <div>首页111</div>
</body>
</html>
```

```javascript
 {
      test: /\.html$/,
      use: [{
        loader: 'html-loader',
        options: {
          interpolate: 'require'
        }
      }],
    }
```

### 根据 src 目录下的目录结构自动生成 html 模板和配置 webpack 的入口文件

这样就不需要手动去设置 entry 和 Pugin 中手动生成 html 了
我们约定了目录结构如下

- src\
  - index\ index 页面 - index.js 入口 js 文件 - index.html - index.css - other\
  - index.js - index.html - index.css - other2\
  - index.js - index.html - index.css

每个 src 下的一级子目录都是一个页面，该目录内的 index.html 为 html 文件，index.js 是入口文件

我们在 webpack 构建中要做的操作就是

1、扫描 src 目录下，取得 index other other...这些目录名，然后把目录名作为输入的 HtmlWebpackPlugin 生成 html 的文件名，并且引用对应的 js

2、设置入口的 entry 参数

```javascript
function buildEntriesAndHTML() {
	// 用来构建entery
	const result = glob.sync("src/**/*.js");
	const config = {
		hash: true,
		inject: true
	};
	const entries = {};
	const htmls = [];
	result.forEach(item => {
		const one = path.parse(item);
		entries[one.dir.split("/").slice(-1)[0]] = "./" + item;
		htmls.push(
			new HtmlWebpackPlugin({
				...config,
				template: "./" + one.dir + "/index.html",
				chunks: [item]
			})
		);
	});
	return {
		entries,
		htmls
	};
}
```

### html 热更新（应该说是刷新）

jq 多页面应用肯定是要在页面里面写一堆 html 的，默认情况下 webpack server html 是不会热更新，html-webpack-plugin 是不会触发 HMR 的。
通过 raw-loader 插件，开发模式下在每个页面的入口把页面的 htmlrequire 进去即可,这样就能实现热刷新了

```javascript
if (process.env.NODE_ENV === "development") {
	require("./index.html");
}
```

这样每个文件引入似乎很傻。应该让工具自动化操作，应该要写个 loader 在指定文件开头注入上面那段代码，然后再给 babel 处理。根目录下自己写了个 inject-loader。loader 的原理其实就是接受上次的处理结果，把返回值传给下个 loader 使用。我们在 js 文件 babel 处理前使用该 loader 即可

```javascript
{
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: [{
        loader: 'babel-loader',
        options: {
            cacheDirectory: true // 使用缓存
        }
    }, {
        loader: path.resolve("./inject-loader.js") // 开发模式使用注入代码实现html热更新
    }]
}
```

```javascript
//inject-loader.js
const path = require("path");
module.exports = function(source) {
	if (path.basename(this.resourcePath) === "index.js") {
		// 我们约定好只有index.js才会注入注入加载代码
		return (
			`if (process.env.NODE_ENV === "development") {
        require("./index.html");
    };` + source
		);
	}
	return source;
};
```

这样一个简单的 loader 就完成了，实现了自动化注入 html 热刷新代码

### 开发环境和生产环境两份配置

```bash
webpack -config ./webpack.xxx.js
```

- webpack.base.config.js 公用配置
- webpack.dev.config.js 开发环境配置
- webpack.prod.config.js 生产环境配置
