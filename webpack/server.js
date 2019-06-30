'use strict'

const path = require('path')

const { distDir, srcDir } = require('../environment')

module.exports = {
  ...require('./_shared'),
  entry: path.join(srcDir, 'entrypoints', 'server'),
  externals: {
    'prop-types': require.resolve('prop-types'),
    'react': require.resolve('react'),
    'react-dom/server': require.resolve('react-dom/server'),
    'react-router-dom': require.resolve('react-router-dom'),
    'styled-components': require.resolve('styled-components')
  },
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
            loader: 'css-loader',
            options: {
              onlyLocals: true,
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
    filename: 'server.js',
    libraryTarget: 'commonjs',
    path: distDir
  },
  target: 'node'
}
