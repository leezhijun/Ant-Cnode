const path = require('path')
module.exports = {
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/public/'
  },
  module: { // 所有第三方 模块的配置规则
    rules: [ // 第三方匹配规则
      {
        test: /\.js|jsx$/,
        use: 'babel-loader',
        exclude: path.resolve(__dirname, '../node_modules/')
      }, // 千万别忘记添加 exclude 排除项
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!postcss-loader!less-loader'
      }, // 从右到左执行，所以注意顺序
      // 大家可以在 css-loader 之后，通过 ? 追加参数，
      // 其中，有个固定的参数，叫做 modules , 表示为 普通的 CSS 样式表，启用模块化
      {
        test: /\.(png|jpg|gif|bmp|jpeg)$/,
        use: 'url-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }, // 打包处理 CSS 样式表的第三方loader
      {
        test: /\.ttf|woff|woff2|eot|svg$/,
        use: 'url-loader'
      } // 打包处理 字体文件 的loader
      // { test: /\.scss$/, use: ['style-loader', 'css-loader?modules&localIdentName=[path][name]-[local]-[hash:5]', 'sass-loader'] }
      // 打包处理 scss 文件的 loader
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.vue'], // 表示，这几个文件的后缀名，可以省略不写
    alias: { // 表示别名
      '@': path.join(__dirname, '../src') // 这样，@ 就表示 项目根目录中 src 的这一层路径
    }
  }
}
