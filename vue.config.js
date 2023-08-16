const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

const path = require('path')
const resolve = dir => path.join(__dirname, dir)
 
module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  // lintOnSave: process.env.NODE_ENV === 'development',
  lintOnSave: false,
  filenameHashing: false,
  productionSourceMap: false,
  configureWebpack: {
    name: 'lowcode',
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
}