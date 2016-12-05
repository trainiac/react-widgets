const resolve = require('path').resolve
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const distPath = resolve(__dirname, 'dist')
const srcPath = resolve(__dirname, 'src')
const publicPath = '/'


module.exports = {
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    'styles/css/index.js',
    'babel-polyfill',
    'index.js'
  ],
  output: {
    filename: 'bundle.js',
    path: distPath,
    publicPath
  },
  context: srcPath,
  resolve: {
    modules: [
      'node_modules',
      srcPath
    ]
  },
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    contentBase: distPath,
    outputPath: distPath,
    publicPath,
    historyApiFallback: true,
    stats: {
      colors: true
    }
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
    new CopyWebpackPlugin([
      { from: 'assets', to: resolve(distPath, 'assets') },
      { from: resolve(srcPath, 'index.html'), to: resolve(distPath, 'index.html') }
    ]),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('css-loader')
    }]
  }
}
