const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { webpackConfig } = require('./file');
const webpack = require('webpack');
const env=require('./env');

module.exports = {
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        use: 'babel-loader',
        exclude: webpackConfig.buildNodeModules ? [] : /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          process.env.NODE_ENV==='development'?'style-loader':MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  // require('precss')(), //sass解析
                  require('cssnano')(), // 相同css合并
                  require('postcss-flexbugs-fixes'),
                  require('postcss-preset-env')({
                    autoprefixer: {
                      grid: true,
                    },
                    browsers: [
                      '>0.2%',
                      'not dead',
                      'not op_mini all',
                    ],
                    stage: 3,
                  }),
                ],
              },
              sourceMap: false,
            },
          },
          'resolve-url-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(gif|png|jpe?g|eot|woff|ttf|pdf)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'assets/images/[name].[ext]',
            esModule: false,
          },
        }],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {},
          },
          {
            loader: 'svgo-loader',
            options: {
              plugins: [{
                removeAttrs: {
                  attrs: 'fill',
                },
              }],
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimize: true,
    emitOnErrors: true,
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin(),
    ],
    splitChunks: {
      chunks: 'all',
      name: false,
    },
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/bundle.[contenthash].css',
      chunkFilename: 'css/chunk.[contenthash].css',
    }),
    new webpack.DefinePlugin(env),
  ],
};
