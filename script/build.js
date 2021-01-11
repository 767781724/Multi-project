const path = require('path');
const { execSync } = require('child_process');

try {
  fs.accessSync(path(__dirname, '../node_modules'), fs.constants.F_OK);
} catch (error) {
  execSync('npm install');
}

process.env.NODE_ENV = 'production';
require('../config/env');
const { builds } = require('../config/file');
const childProcess = require('child_process');
const fs = require('fs');
const { publicPath } = require('../config/path');
const _process = require('process');


// 打包
for (let index = 0; index < builds.length; index++) {
  const item = builds[index];
  const _project = path.join(publicPath, item.name);
  try {
    fs.accessSync(_project, fs.constants.F_OK);
    if (!item.build) {
      continue;
    }
    if (item.type === 'webpack') {
      const cp=childProcess.fork(path.resolve(__dirname, './build_webpack.js'));
      cp.send(item);
    } else if (item.type === 'gulp') {
      execSync(`gulp -f script/gulpfile.js --project ${item.name}`);
    }
  } catch (error) {
    throw new Error(error);
  }
};
_process.on('exit', (code)=>{
  console.log('退出码'+code);
});
