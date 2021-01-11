process.env.NODE_ENV = 'production';
require('../config/env');
const webpack = require('webpack');
const getProdConfig = require('../config/webpack.prod');
const _process = require('process');

const startBuildServer = (_config) => {
  webpack(_config, (err, stats) => {
    if (err) {
      console.error(err.stack || err);
      if (err.details) {
        console.error(err.details);
      }
      _process.exit();
      return;
    }
    const info = stats.toJson();
    if (stats.hasErrors()) {
      console.error(info.errors);
      _process.exit();
      return;
    }
    if (stats.hasWarnings()) {
      // console.warn(info.warnings);
    }
    _process.exit();
  });
};
_process.on('message', (val)=>{
  const config=getProdConfig(val.name);
  startBuildServer(config);
});
_process.on('exit', (code)=>{
  _process.send('子进程结束了');
});
