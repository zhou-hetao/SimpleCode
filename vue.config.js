const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

const path = require('path')
const resolve = dir => path.join(__dirname, dir)
 
module.exports = {
  configureWebpack: {
    name: 'lowcode',
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
}