let path = require('path')

module.exports = {
  entry: "./demo/index.js",
	output: {
		path: path.resolve(__dirname,'./demo'),
		filename: "main.js"
  },
	module: {
		loaders: [
			{
				test: /\.js|\.jsx$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015','react']
				}
			}
		]
	}
}
