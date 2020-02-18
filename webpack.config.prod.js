const webpack = require('webpack')
const path = require('path')
const fs = require('fs')
const WebpackShellPlugin = require('webpack-shell-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const nodeModules = {}
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod
  })

module.exports = {
  entry: './src/index.js',
  mode: 'production',
  target: 'node',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'source-map',
  optimization: {
    mangleWasmImports: true,
    removeAvailableModules: true,
    splitChunks: {
      chunks: 'all',
    },
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  plugins: [new WebpackShellPlugin({ onBuildEnd: ['nodemon dist/index.js'] })],
  resolve: {
    extensions: ['.js'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  externals: nodeModules,
}
