'use strict'

const { appDir, rootDir, srcDir } = require('../../environment')

module.exports = {
  resolve: {
    alias: {
      'prop-types': require.resolve('prop-types'),
      'react': require.resolve('react'),
      'react-dom$': require.resolve('react-dom'),
      'react-router-dom': require.resolve('react-router-dom'),
      'styled-components': require.resolve('styled-components'),
      '@': appDir,
      '~': rootDir,
      '$': srcDir
    },
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json', '.scss', '.sass', '.css']
  }
}
