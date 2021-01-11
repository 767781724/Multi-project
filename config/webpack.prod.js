const { merge } = require('webpack-merge');
const path = require('path');
const commonConfig = require('./webpack.common');
// const ManifestPlugin = require('webpack-manifest-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


const { outputPath, getCopyPlugin, getHtmlPlugin, getEntry } = require('./path');

const webpack = require('webpack');

/**
 * 生产环境配置
 * @param {string} project 需要打包的项目名
 * @return {object}
 */
function getProdConfig(project) {
  return merge(commonConfig, {
    entry: getEntry(project),
    mode: 'production',
    module: {
      rules: [],
    },
    plugins: [
      new webpack.ids.HashedModuleIdsPlugin(),
      ...getHtmlPlugin(project),
      ...getCopyPlugin(project),
      // new BundleAnalyzerPlugin(),
      // new ManifestPlugin({
      //   fileName: 'asset-manifest.json',
      //   generate: (seed, files, entrypoints) => {
      //     const manifestFiles = files.reduce((manifest, file) => {
      //       manifest[file.name] = file.path;
      //       return manifest;
      //     }, seed);
      //     const entrypointFiles = entrypoints[project].filter(
      //         (fileName) => !fileName.endsWith('.map'));
      //     return {
      //       files: manifestFiles,
      //       entrypoints: entrypointFiles,
      //     };
      //   },
      // }),
    ],
    output: {
      filename: 'js/[name].[contenthash].js',
      chunkFilename: 'js/[name].[contenthash].chunk.js',
      // publicPath: `/[name]/`,
      path: path.join(outputPath, project),
    },
  });
};


module.exports = getProdConfig;
