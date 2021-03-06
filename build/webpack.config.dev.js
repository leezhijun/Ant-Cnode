const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const webpackBaseConfig = require('./webpack.config')
const Webpack = require('webpack')
const path = require('path')
// const opn = require('opn')
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
  mode: 'development', // development ,production
  // 在 webpack 4.x 中，有一个很大的特性，就是 约定大于配置  约定，默认的打包入口路径是 src -> index.js
  entry: [
    path.resolve(__dirname, '../src/index.js'),
    'react-hot-loader/patch',
    // 为webpack-dev-server的环境打包好运行代码
    // 为热替换（HMR）打包好运行代码
    'webpack/hot/only-dev-server'
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/public/'
  },
  plugins: [
    new Webpack.HotModuleReplacementPlugin(),
    htmlPlugin
  ],
  devServer: {
    // 设置服务器访问的基本目录
    contentBase: path.resolve(__dirname, '../dist'), // 最好设置成绝对路径
    // 设置服务器的ip地址,可以是localhost
    host: 'localhost',
    // 设置端口
    port: 8090,
    // 设置自动打开浏览器
    open: true,
    // 设置自动更新
    hot: true,
    inline: true,
    // 报错设置
    overlay: {
      errors: true
    },
    publicPath: '/public',
    historyApiFallback: {
      index: '/public/index.html'
    },
    proxy: {
      '/api': { // api表示当前项目请求的key
        target: 'https://cnodejs.org', // 代理服务器路径
        // pathRewrite: {'^/api' : '/'}, // 重写路径
        changeOrigin: true
      }
    }
  }
})
