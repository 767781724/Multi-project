module.exports = {
  // 你可以指定下面提到的所有选项 https://postcss.org/api/#processoptions
  // parser: 'sugarss',
  // ident: 'postcss',
  plugins: () => [
    // require('precss')(), //sass解析
    require('cssnano')({
      preset: 'default',
    }), // 相同css合并
    require('postcss-flexbugs-fixes'),
    require('autoprefixer'),
    require('postcss-preset-env')({
      autoprefixer: false,
      stage: 4,
    }),
  ],
};