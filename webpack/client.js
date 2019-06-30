'use strict'

const path = require('path')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const { distDir, srcDir } = require('../environment')

module.exports = {
  ...require('./_shared'),
  entry: path.join(srcDir, 'entrypoints', 'client'),
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /[\\/]node_modules[\\/]/,
        use: {
          loader: 'babel-loader',
          options: {
            ...require('../babel.config'),
            babelrc: false
          }
        }
      },
      {
        test: /\.s?[ac]ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        ]
      },
      {
        test: /\.s[ac]ss$/,
        use: {
          loader: 'sass-loader',
          options: {
            implementation: require('sass')
          }
        }
      }
    ]
  },
  output: {
    filename: 'engine.js',
    path: distDir,
    publicPath: '/dist/'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.css'
    })
  ],
  target: 'web'
}
