const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const glob = require('glob');

const publicPath = path.resolve(__dirname, '../src/project');
const outputPath = path.resolve(__dirname, '../dist');

/**
 * @param {string[]} projects
 * @return {Array<HtmlWebpackPlugin>} Array<HtmlWebpackPlugin>
 * @throws html does not exist
 */
function getHtmlPlugin(projects) {
  const htmlPlugins = [];
  const files=glob.sync(`${publicPath}/${projects}/**/index.html`);
  files.forEach((val)=>{
    const rst=val.match(/\/(.*)\/public\/index.html$/);
    if (rst) {
      const key=rst[1].split('/').pop();
      const item=val.match(/project\/(.*)\/public\/index\.html$/)[1];
      htmlPlugins.push(new HtmlWebpackPlugin({
        filename: item===projects?'index.html':`${item.split('/').pop()}/index.html`,
        template: val,
        chunks: [key, 'common', 'vendors', 'manifest'],
        templateParameters: {
          'PUBLIC_URL': process.env.NODE_ENV==='development'?'':'.',
        },
      }));
    }
  });
  if (htmlPlugins.length===0) {
    throw new Error(`html does not exist`);
  }
  return htmlPlugins;
}
/**
 * 获取入口文件
 * @param {string[]} projects
 * @return {object}
 * @throws no entry file
 */
function getEntry(projects) {
  const entrys = {};
  const files=glob.sync(`${publicPath}/${projects}/**/index.*(ts|tsx)`);
  files.forEach((val)=>{
    const rst=val.match(/\/(.*)\/src\/index.(ts|tsx)$/);
    if (rst) {
      const key=rst[1].split('/').pop();
      entrys[key]=val;
    }
  });
  if (Object.keys(entrys).length===0) {
    throw new Error('no entry file');
  }
  return entrys;
}
/**
 * 复制静态文件如 html json
 * @param {string[]} projects
 * @return {Array}
 */
function getCopyPlugin(projects) {
  const copyPlugin = [];
  const files=glob.sync(`${publicPath}/${projects}/**/public`);
  files.forEach((val)=>{
    const item=val.match(/project\/(.*)\/public$/)[1];

    copyPlugin.push(new CopyPlugin({
      patterns: [{
        from: val,
        globOptions: {
          ignore: ['**/index.html'],
        },
        to: path.join(outputPath, item),
      }],
    }));
  });
  return copyPlugin;
}
module.exports = {
  publicPath,
  outputPath,
  getHtmlPlugin,
  getEntry,
  getCopyPlugin,
};
