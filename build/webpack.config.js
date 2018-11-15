var path = require('path')
var webpack = require('webpack')
var ROOT_PATH = path.resolve(__dirname)
var BUILD_PATH = path.resolve(ROOT_PATH, '../dist')
// var htmlWebpackPlugin =  require('html-webpack-plugin');

module.exports = {
  entry: [
    'webpack/hot/only-dev-server',
    path.resolve(ROOT_PATH, '../main.js')
  ],
  output: {
    path: BUILD_PATH,
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    },
    {
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader']
    }, {
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
    inline: true
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
}
