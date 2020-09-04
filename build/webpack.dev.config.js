const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ROOT_PATH = path.resolve(__dirname, '../')
const BUILD_PATH = path.resolve(ROOT_PATH, '../dist')

module.exports = {
  mode: 'development',
  entry: {
    main: ['@babel/polyfill', path.resolve(ROOT_PATH, 'examples/main.js')],
    // 列出第三方库
    vendor: ['react', 'react-dom']
  },
  output: {
    path: BUILD_PATH,
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.web.js', '.js', '.jsx', '.json']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /(fontawesome-webfont)\.(svg)$/,
        loader: 'file-loader',
        options: {
          name: './static/fonts/[name].[ext]?[hash]'
        }
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: './static/img/[name].[ext]?[hash]'
        }
      },
      {
        test: /\.(eot|ttf|woff|woff2|otf)/,
        loader: 'file-loader',
        options: {
          name: './static/fonts/[name].[ext]?[hash]'
        }
      },
      {
        test: /\.md$/,
        loader: 'raw-loader'
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    host: '0.0.0.0'
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
