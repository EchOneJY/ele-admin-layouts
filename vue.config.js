const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  pages: {
    index: {
      entry: 'examples/main.js',
      template: 'examples/public/index.html',
      filename: 'index.html',
    },
  },
  chainWebpack: config => {
    config.resolve.alias.set('@', resolve('examples')) // 调整@指向examples
    config.module
      .rule(/\.jsx|.js$/) // 如果需要解析JXS语法添加解析JSX，如果不需要只写js
      .include.add('/packages') // 添加packags文件夹，解析该文件夹下的组件
      .end()
      .use('babel')
      .loader('babel-loader')
      .tap(options => {
        return options
      })
  },
  css: {
    extract: false, // 绑定css样式
  },
}
