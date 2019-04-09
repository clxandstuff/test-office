const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
    'babel-polyfill',
    'whatwg-fetch',
    './src/lib/gui/styles/main.scss',
    './src/lib/gui/main.js'
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.css/,
        use: ['css-loader']
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: 'file-loader'
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg|jpg|png|ico)(\?.+)?$/,
        use: 'file-loader'
      },
      {
        test: /\.json/,
        use: 'json-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/lib/gui/index.html',
      chunksSortMode: 'dependency',
      filename: 'index.html'
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  output: {
    path: path.join(__dirname, 'dist/lib/gui/static'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  devServer: {
    hot: true,
    historyApiFallback: true
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['node_modules']
  }
};
