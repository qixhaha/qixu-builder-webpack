/**
 * ssr配置
 * output的libraryTarget设置
 * css解析ignore
 */

const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');

const prodConfig = {
  mode: 'production',
  output: {
    // 此配置的作用是控制 webpack 打包的内容是如何暴露的。
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: 'ignore-loader',
      },
      {
        test: /\.less$/,
        use: 'ignore-loader',
      },
      {
        test: /\.scss$/,
        use: 'ignore-loader',
      },
    ],
  },
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

module.exports = merge(baseConfig, prodConfig);
