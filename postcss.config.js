module.exports = {
  plugins: [
    ['postcss-pxtorem', {
      propList: ['*'],
      minPixelValue: 1,
    }],
  ],
};
