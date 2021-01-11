const fs = require('fs');
const path = require('path');

const config = {
  webpackConfig: {
    buildNodeModules: false,
    https: false,
  },
  builds: [],
  start: null,
};
const getFile = (file) => {
  try {
    fs.accessSync(file, fs.constants.F_OK);
    const data = JSON.parse(fs.readFileSync(file, 'utf-8'));
    for (const key in data) {
      if (config.hasOwnProperty(key)) {
        if (typeof(data[key]) === 'string') {
          config[key] = data[key];
        } else {
          config[key] = Object.assign(config[key], data[key]);
        }
      }
    }
  } catch (error) {
    throw new Error(error);
  }
};
getFile(path.resolve(__dirname, '../build.config.json'));

module.exports = config;
