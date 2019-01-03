const webpack = require('webpack');
const path = require('path');
const resolve = require('resolve');

module.exports = {
	module: {
		rules: [
			{
				test: /\.js$/,
				include: [path.resolve(__dirname, 'src')],
				loader: 'babel-loader',
				options: {
					presets: [ '@babel/preset-env' ]
				}
			}
		]
	},

	mode: 'development',

	devServer: {
		publicPath: '/assets/'
	},

	optimization: {
		splitChunks: {
			cacheGroups: {
				vendors: {
					priority: -10,
					test: /[\\/]node_modules[\\/]/
				}
			},

			chunks: 'async',
			minChunks: 1,
			minSize: 30000,
			name: false
		}
	}
};
