var webpack = require('webpack');
var path = require('path');
var nodeExternals = require('webpack-node-externals');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var cssModulesValues = require('postcss-modules-values');

const root = path.resolve(__dirname);

module.exports = {
	entry: './src/index.js',
	target: 'node',
	externals: [nodeExternals()],
	output: {
		path: path.resolve(root, 'lib'),
		filename: "index.js",
		library: "controls",
		libraryTarget: "umd"
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: [
								['es2015', {loose: true, modules: false}],
								'stage-1',
								'react'
							]
						}
					}
				],
			},
			{
				test: /.css$/,
				exclude: /node_modules/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					loader: [
						{
							loader: 'css-loader',
							query: {
								modules:true,
								importLoaders: 1,
								localIdentName: '[name]_[local]_[hash:base64:5]'
							}
						},
						{
							loader: 'postcss-loader'
						}
					],
				}),
			}
		]
	},
	plugins: [
		new webpack.LoaderOptionsPlugin({
			options: {
				postcss: [cssModulesValues]
			}
		}),
		new ExtractTextPlugin('[name].css'),
	// 	new webpack.optimize.UglifyJsPlugin({
	// 		compress: {
	// 			warnings: false,
	// 		},
	// 	}),
	],
	resolve: {
		alias: {
			'inputmask.dependencyLib': path.join(root, 'node_modules/jquery.inputmask/dist/inputmask/inputmask.dependencyLib.js'),
			'inputmask.extensions': path.join(root, 'node_modules/jquery.inputmask/dist/inputmask/inputmask.extensions.js'),
			'inputmask.numeric.extensions': path.join(root, 'node_modules/jquery.inputmask/dist/inputmask/inputmask.numeric.extensions.js'),
			'inputmask': path.join(root, 'node_modules/jquery.inputmask/dist/inputmask/inputmask.js')
		},
	},
};
