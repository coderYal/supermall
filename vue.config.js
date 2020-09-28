module.exports = {
  configureWebpack: {
    resolve: {
      //  配置别名, @是脚手架3已经配置好的
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views'
      }
    }
  }
}
