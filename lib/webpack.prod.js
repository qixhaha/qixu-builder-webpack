/**
  * 生产环境配置
  * 代码压缩
  * 文件指纹
  * tree-shaking
  * scop Hoisting
  * 速度优化 基础包cdn
  * 体积优化  代码分割
  */
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const {merge} = require('webpack-merge');
const baseConfig = require('./webpack.base');

const prodConfig = {
  mode: 'production',
  plugins: [
    new OptimizeCssAssetsWebpackPlugin({
      assetNameRegExp: /\.css$/g,
    }),
    new HtmlWebpackTagsPlugin({
      scripts: [
        {
          path: 'https://11.url.cn/now/lib/16.2.0/react.min.js',
          external: {
            packageName: 'react',
            variableName: 'React',
          },
        },
        {
          path: 'https://11.url.cn/now/lib/16.2.0/react-dom.min.js',
          external: {
            packageName: 'react-dom',
            variableName: 'ReactDOM',
          },
        },
      ],
    }),
  ],
  optimization: {
    splitChunks: {
      minSize: 0,
      cacheGroups: {
        commons: {
          name: 'vendors',
          chunks: 'all',
          minChunks: 2,
        },
      },
    },
  },
};
console.log('merge',merge)
module.exports = merge(baseConfig, prodConfig);
