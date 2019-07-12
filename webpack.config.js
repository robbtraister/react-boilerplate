'use strict'

const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

const {
  appDir,
  distDir,
  fileLimit,
  isProd,
  resourcesDir,
  rootDir,
  srcDir
} = require('./environment')

const { id, title } = require(path.join(srcDir, 'entrypoints', 'data'))

const devtool = (isProd)
  ? 'hidden-source-map'
  : 'eval-source-map'

const mode = (isProd)
  ? 'production'
  : 'development'

const optimization = {
  minimizer: [
    new TerserWebpackPlugin({
      sourceMap: true
    }),
    new OptimizeCSSAssetsWebpackPlugin({
    })
  ]
}

const getAbsoluteRequire = (mod) =>
  require.resolve(mod).replace(new RegExp(`(/node_modules/${mod})/.*`), (_, m) => m)

const resolve = {
  alias: {
    'prop-types': getAbsoluteRequire('prop-types'),
    'react': getAbsoluteRequire('react'),
    'react-dom': getAbsoluteRequire('react-dom'),
    'react-router-dom': getAbsoluteRequire('react-router-dom'),
    'styled-components': getAbsoluteRequire('styled-components'),
    '~': rootDir,
    '&': resourcesDir,
    '$': srcDir,
    '@': appDir
  },
  extensions: [
    '.tsx',
    '.ts',
    '.mjsx',
    '.mjs',
    '.jsx',
    '.js',
    '.yaml',
    '.yml',
    '.json',
    '.scss',
    '.sass',
    '.css'
  ]
}

const rules = (server) => [
  {
    test: /\.(eot|gif|jpe?g|otf|png|svg|ttf|woff2?)$/,
    use: {
      loader: 'url-loader',
      options: {
        fallback: 'file-loader',
        limit: fileLimit,
        name: (isProd)
          ? 'assets/[hash].[ext]'
          : 'assets/[path][name].[ext]',
        publicPath: '/dist/'
      }
    }
  },
  {
    test: /\.s?[ac]ss$/,
    use: (
      (server)
        ? []
        : [{ loader: MiniCssExtractPlugin.loader }]
    ).concat(
      {
        loader: 'css-loader',
        options: {
          modules: {
            mode: 'local'
          },
          onlyLocals: server,
          sourceMap: true
        }
      }
    )
  },
  {
    test: /\.s[ac]ss$/,
    use: {
      loader: 'sass-loader',
      options: {
        implementation: require('sass')
      }
    }
  },
  {
    test: /\.ya?ml$/,
    use: [ 'json-loader', 'yaml-loader' ]
  },
  {
    test: /\.m?[jt]sx?$/,
    exclude: /[\\/]node_modules[\\/]/,
    use: {
      loader: 'babel-loader',
      options: {
        ...require('./babel.config'),
        babelrc: false
      }
    }
  }
]

module.exports = [
  {
    devtool,
    entry: {
      app: path.join(srcDir, 'entrypoints', 'browser'),
      login: path.join(srcDir, 'entrypoints', 'login')
    },
    mode,
    module: {
      rules: rules()
    },
    optimization: {
      ...optimization,
      splitChunks: {
        chunks: 'all',
        minSize: 0,
        name (mod, chunks, cacheGroupKey) {
          return (chunks.length > 1)
            ? 'common'
            : chunks[0].name
        }
      }
    },
    output: {
      filename: 'browser/[name].js',
      chunkFilename: 'browser/[name].js',
      path: distDir,
      publicPath: '/dist/'
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'browser/[name].css',
        chunkFilename: 'browser/[name].css'
      }),
      new HtmlWebpackPlugin({
        excludeChunks: ['login'],
        filename: 'index.html',
        id,
        inject: 'head',
        template: path.join(srcDir, 'entrypoints', 'browser.html'),
        title
      }),
      new HtmlWebpackPlugin({
        excludeChunks: ['app'],
        filename: 'login.html',
        id,
        inject: 'head',
        template: path.join(srcDir, 'entrypoints', 'login.html'),
        title
      }),
      new ScriptExtHtmlWebpackPlugin({
        defaultAttribute: 'defer'
      })
    ],
    resolve,
    target: 'web'
  },
  {
    devtool,
    entry: {
      desktop: path.join(srcDir, 'entrypoints', 'desktop')
    },
    mode,
    module: {
      rules: rules()
    },
    optimization,
    output: {
      filename: '[name]/main.js',
      chunkFilename: 'chunks/[name].js',
      path: distDir,
      publicPath: '/dist/'
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name]/styles.css'
      }),
      new HtmlWebpackPlugin({
        filename: 'desktop.html',
        id,
        inject: 'head',
        template: path.join(srcDir, 'entrypoints', 'desktop.html'),
        title
      }),
      new ScriptExtHtmlWebpackPlugin({
        defaultAttribute: 'defer'
      })
    ],
    resolve,
    target: 'web'
  },
  {
    devtool,
    entry: {
      server: path.join(srcDir, 'entrypoints', 'server')
    },
    externals: {
      'prop-types': require.resolve('prop-types'),
      'react': require.resolve('react'),
      'react-dom/server': require.resolve('react-dom/server'),
      'react-router-dom': require.resolve('react-router-dom'),
      'styled-components': require.resolve('styled-components')
    },
    mode,
    module: {
      rules: rules(true)
    },
    output: {
      filename: '[name]/index.js',
      libraryTarget: 'commonjs2',
      path: distDir
    },
    resolve,
    target: 'node'
  }
]
