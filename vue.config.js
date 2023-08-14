const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

const path = require('path')
const resolve = dir => path.join(__dirname, dir)
 
module.exports = {
  configureWebpack: {
    name: 'vue Element Admin',
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
}