const webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  // Options for devtool at:
  // https://webpack.js.org/configuration/devtool/
  devtool: 'source-map',
  entry: __dirname + "/src/index.js",
  output: {
    path: __dirname + "/build",
    filename: "bundle.js"
  },

  // https://blog.sentry.io/2015/10/29/debuggable-javascript-with-source-maps
  // devtool: "source-map",
  // entry: {
  //   "bundle": path.join(__dirname, 'src/index.js')
  // },
  // output: {
  //   path: path.join(__dirname, 'build'),
  //   filename: "[name].js",
  //   sourceMapFilename: "[name].js.map"
  // },

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
      },
      // {
      //   test: /\.css$/,
      //   loader: 'style-loader!css-loader'
      // },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + "/src/index.html"
    }),
    new ExtractTextPlugin("bundle.css"),
    // Descomentar para pasar a produccion
    // new webpack.optimize.UglifyJsPlugin({ sourceMap: true }),
    // new BundleAnalyzerPlugin(),
  ]
}


// solucionado quitando ExtractTextPluginLoader