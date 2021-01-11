process.env.NODE_ENV = 'development';
require('../config/env');

const buildConfig = require('../config/file');
const { execSync } = require('child_process');
const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const os = require('os');
const net = require('net');
const openBrowser = require('react-dev-utils/openBrowser');
const getDevConfig = require('../config/webpack.dev');

/**
 * 获取IP地址
 * @return {void}
 */
function getIPAdress() {
  const interfaces = os.networkInterfaces();
  for (const devName in interfaces) {
    if (interfaces.hasOwnProperty(devName)) {
      const iface = interfaces[devName];
      for (let i = 0; i < iface.length; i++) {
        const alias = iface[i];
        if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
          return alias.address;
        }
      }
    }
  }
}
/**
 * 监听服务
 * @param {any} port
 * @return {Promise}
 */
function portInUse(port) {
  return new Promise((resolve, reject) => {
    const server = net.createServer().listen(port, '0.0.0.0');
    server.on('listening', function() {
      server.close();
      resolve(port);
    });
    server.on('error', function(err) {
      if (err.code == 'EADDRINUSE') {
        port++;
        reject(err);
      }
    });
  });
}
/**
 * 检查和获取端口号
 * @param {number} port
 * @param {Promise} _portAvailableCallback
 */
function tryUsePort(port, _portAvailableCallback) {
  portInUse(port).then((port) => {
    _portAvailableCallback(port);
  }).catch((err) => {
    console.log(port + ' ====被占用====：\n');
    port++;
    tryUsePort(port, _portAvailableCallback);
  });
}
if (buildConfig.start) {
  const item = buildConfig.builds.find((e) => e.name === buildConfig.start);
  if (item) {
    if (item.type === 'webpack') {
      const config=getDevConfig(item.name);
      WebpackDevServer.addDevServerEntrypoints(config, config.devServer);
      const compiler = webpack(config);
      const server = new WebpackDevServer(compiler, config.devServer);
      tryUsePort(3010, (_port) => {
        server.listen(_port, '0.0.0.0', (err) => {
          const myHost = getIPAdress();
          openBrowser(`http://localhost:${_port}`);
          console.log(`本地：http://localhost:${_port}\n本机IP：http://${myHost}:${_port}`);
        });
      });
    } else if (item.type === 'gulp') {
      execSync(`gulp server -f script/gulpfile.js --project ${item.name}`);
    }
  } else {
    throw new Error('Item does not exist');
  }
}