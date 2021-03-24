// const path = require('path')

module.exports = {
  devServer: {
    port: 3001,
    proxy: 'http://localhost:3000',
  },
  configureWebpack: {
    devtool: 'source-map',
  }
}