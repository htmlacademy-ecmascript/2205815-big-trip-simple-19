const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  resolve: {
    alias: {
      presenter: path.resolve(__dirname, 'src\presenter'),
      view: path.resolve(__dirname, 'src\view'),
    },
  },
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
    clean: true,
  },
  devtool: 'source-map',
  plugins: [
    new CopyPlugin({
      patterns: [{ from: 'public' }],
    }),
  ],
  module: {
    rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: ['babel-loader']
        }
    ]
  }
};
