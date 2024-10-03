const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/styles/variables.scss";`
      }
    }
  },
  chainWebpack: config => {
    config.plugin('define').tap(args => {
      const env = args[0]
      env.__VUE_OPTIONS_API__ = true
      env.__VUE_PROD_DEVTOOLS__ = false
      env.__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ = false
      return args
    })
  }
})