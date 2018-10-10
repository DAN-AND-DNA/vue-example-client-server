var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var merge = require('webpack-merge');
var webpackBaseConfig = require('./webpack.config.js');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');

webpackBaseConfig.plugins = [];
module.exports = merge(webpackBaseConfig, {
	output:{
		publicPath: '/dist/',
		filename:'[name].[hash].js'
	},
	
	plugins:[
		new ExtractTextPlugin({
			// 提取css
			filename: '[name].[hash].css',
			allChunks:true
		}),
		
		new webpack.DefinePlugin({
			// 生产环境
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),
	
		new HtmlwebpackPlugin({
			filename: './index.html',
			template: './index.ejs',
			inject: false	
		})
	
	],
		
	optimization:{
                        minimizer:[
                                new UglifyJsPlugin ({
                                        uglifyOptions:{
                                                compress: true
                                        }
                                })
                        ]
	}
});
