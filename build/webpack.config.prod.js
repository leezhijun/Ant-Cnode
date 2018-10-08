const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const webpackBaseConfig = require('./webpack.config')
const path = require('path')
const ROOT_PATH = path.resolve(__dirname, '../')
const htmlPlugin = new HtmlWebpackPlugin({
  template: path.resolve(__dirname, '../src/index.html'), // 模板路径
  filename: 'index.html', // 生成文件名
  title: '测试webpack', // title
  hash: true, // 哈希值
  chunks: ['main'], // 多页面分别引入自己的js
  minify: {
    collapseWhitespace: false, // 折叠空白区域也就是压缩代码
    removeComments: false // 移除HTML中的注释
  }
})

module.exports = merge(webpackBaseConfig, {
  mode: 'production', // development ,production
  // 在 webpack 4.x 中，有一个很大的特性，就是 约定大于配置  约定，默认的打包入口路径是 src -> index.js
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/public/'
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: ROOT_PATH
    }), // 传入数组,指定要删除的目录
    htmlPlugin
  ]
})
