/**
 * 基础配置：webpack.base.js
 * 资源解析：{
 *  1.解析es6
 *  2.解析react
 *  3.解析css
 *  4.解析less
 *  5.解析图片
 *  6.解析字体
 * }
 * 样式增强：css前缀补齐，css px转成rem
 * 目录清理
 * 多页面打包
 * 命令行信息显示优化
 * 错误捕获和处理
 * css提取成一个单独的文件
 */
const path = require('path');
const glob = require('glob');
const HTMLWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLInlineCSSWebpackPlugin = require('html-inline-css-webpack-plugin').default;
// 获取当前node命令执行的所在的文件目录 
const projectRoot = process.cwd();
console.log('projectRoot',projectRoot)
const setMPA = () => {
  const entry = {};
  const htmlWebpackPlugin = [];
  const entryFiles = glob.sync(path.join(projectRoot, './src/*/index.js'));
  Object.keys(entryFiles).map((index) => {
    const entryFile = entryFiles[index];
    const match = entryFile.match(/src\/(.*)\/index\.js/);
    const pageName = match && match[1];
    entry[pageName] = entryFile;
    return htmlWebpackPlugin.push(new HTMLWebPackPlugin({
      filename: `${pageName}.html`,
      template: path.join(projectRoot, `src/${pageName}/index.html`),
      chunks: [pageName],
      inject: true,
      minify: {
        html5: true,
        collapseWhitespace: true,
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: false,
      },
    }));
  });
  return {
    entry,
    htmlWebpackPlugin,
  };
};
const { entry, htmlWebpackPlugin } = setMPA();
module.exports = {
  entry,
  output: {
    path: path.resolve(projectRoot, './dist'),
    filename: '[name]_[chunkhash:8].js',
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        use: [{
          loader: 'file-loader',
          options: {
            esModule: false,
            name: '[name]_[contenthash].[ext]',
          },
        }],
      },
      {
        test: /.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]_[hash:8][ext]',
            },
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
      }, {
        test: /\.css$/,
        loader: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      }, {
        test: /\.less$/,
        loader: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
        ],
      }, {
        test: /\.scss/,
        loader: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'px2rem-loader',
            options: {
              remUnit: 75,
              remPrecision: 8,
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css',
    }),
    new HTMLInlineCSSWebpackPlugin(),
    new CleanWebpackPlugin(),
    function errorPlugin() {
      this.hooks.done.tap('done', (stats) => {
        if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('--watch') === -1) {
          process.exit(1);
        }
      });
    },
  ].concat(htmlWebpackPlugin),
  stats: 'errors-only',
};
