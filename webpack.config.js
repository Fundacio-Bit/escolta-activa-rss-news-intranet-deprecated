const webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  devtool: 'source-map',
  entry: __dirname + "/src/index.js",
  output: {
    path: __dirname + "/build",
    filename: "bundle.js"
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-2']
        }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css')
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + "/src/index.html"
    }),
    new ExtractTextPlugin("bundle.css"),
    // Descomentar para pasar a produccion
    new webpack.optimize.UglifyJsPlugin(),
    // new BundleAnalyzerPlugin(),
  ]
}
