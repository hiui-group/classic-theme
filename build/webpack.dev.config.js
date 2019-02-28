const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ROOT_PATH = path.resolve(__dirname)
const BUILD_PATH = path.resolve(ROOT_PATH, '../dist')

module.exports = {
  entry: [
    'webpack/hot/only-dev-server',
    path.resolve(ROOT_PATH, '../examples/main.js')
  ],
  output: {
    path: BUILD_PATH,
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      loader: 'babel-loader'
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    },
    {
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader']
    },
    {
      test: /\.(png|jpg|gif|svg)$/,
      loader: 'url-loader',
      options: {
        limit: 1000,
        name: './static/img/[name].[ext]?[hash]'
      }
    }
    ]
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx']
  },
  devServer: {
    hot: true,
    inline: true,
    quiet: false,
    host: '0.0.0.0',
    disableHostCheck: true,
    historyApiFallback: true,
    stats: {
      chunks: false,
      children: false
    }
  },
  devtool: 'source-map',
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'examples/index.html',
      inject: false
    })
  ]
}
