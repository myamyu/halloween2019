const path = require('path');

module.exports = () => {
  const config = {
    mode: 'development',
    target: 'web',
    entry: path.resolve(__dirname, 'src', 'index.js'),
    output: {
      filename: 'myamyu-halloween2019.min.js',
      path: path.resolve(__dirname, 'public', 'js'),
    },
  };

  config.module = {
    rules: [
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader',
      },
    ],
  };
  return config;
};
