const packageJson = require('./package.json'),
  path = require('path'),
  DevopsWebpackPlugin = require('devops-webpack-plugin');

/**
 * @param dir {String}
 * @returns {String}
 * */
function resolve (dir) {
  return path.join(__dirname, './', dir);
}

// 设置mock
process.env.VUE_APP_MOCK = process.argv.includes('--mock');
module.exports = {
  publicPath: '/ui/temp-test',
  outputDir: `dist/${packageJson.name}-${packageJson.version}`,
  lintOnSave: false,
  chainWebpack: config => {
    if (process.argv.includes('--mock')) {
      config.devServer.proxy({});
    } else {
      // 对接后端代理配置
      config.devServer.proxy({});
    }
  },
  // webpack配置
  configureWebpack: {
    // 配置模块解析
    resolve: {
      alias: {
        '@': resolve('src'),
        '@assets': resolve('src/assets')
      }
    },
    // 配置devops插件
    plugins: [new DevopsWebpackPlugin()]
  }
};
