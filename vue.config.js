module.exports = {
    publicPath:'./',
      devServer: {
        proxy: {
          '/api': {
            target: 'http://192.168.124.61:8888/api/private/v1',//API服务器的地址
            changeOrigin: true,// 是否跨域
            pathRewrite: {
              '^/api': '' //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
            }
          }
        }
      }
    }