const path = require('path');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const webpack = require('webpack');
const { getCopyPlugin, getHtmlPlugin, getEntry, outputPath } = require('./path');

/**
 * 本地环境配置
 * @param {string} project 需要打包的项目名
 * @return {object}
 */
function getDevConfig(project) {
  return merge(commonConfig, {
    entry: getEntry(project),
    mode: 'development',
    devtool: 'source-map',
    devServer: {
      contentBase: '/',
      overlay: true, // 浏览器显示错误
      // noInfo: true,
      hot: true,
      stats: 'errors-only',
      publicPath: '/',
      historyApiFallback: false,
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      ...getHtmlPlugin(project),
      ...getCopyPlugin(project),
    ],
    output: {
      filename: '[name].[contenthash].js',
      publicPath: '/',
      path: path.join(outputPath, project),
    },
  });
}

module.exports = getDevConfig;