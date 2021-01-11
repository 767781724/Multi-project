const argv = require('minimist')(process.argv.slice(2));


const NODE_ENV = process.env.NODE_ENV;
if (!NODE_ENV) {
  throw new Error('The NODE_ENV environment variable is required but was not specified.');
}
const env = {
  NODE_ENV: process.env.NODE_ENV,
};
for (const key in argv) {
  if (argv.hasOwnProperty(key)) {
    env[key] = JSON.stringify(argv[key]);
  }
}

module.exports = env;
