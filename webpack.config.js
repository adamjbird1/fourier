const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/js/main.js',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Fourier',
      template: './src/index.html'
    }),
  ],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'out'),
  },
};