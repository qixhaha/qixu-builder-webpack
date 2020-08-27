/**
 * 生产阶段配置：webpack.prod.js
 * 代码热更新---css热更新  js热更新
 * sourcemap
 */
const merge = require('webpack-merge');
const webpack = require('webpack');
const baseConfig = require('./webpack.base');

const devConfig = {
  mode: 'development',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    // 热跟新的服务的基础目录 （监听的变化的目录）,
    contentBase: './dist',
    hot: true,
    stats: 'errors-only',
  },
  devtool: 'cheap-source-map',
};

module.exports = merge(baseConfig, devConfig);
