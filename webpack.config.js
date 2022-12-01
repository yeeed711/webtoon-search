const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: ['./src/main.ts', './src/scss/index.scss'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].bundle.js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\\.(png|jpg|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name][ext]',
        },
      },
    ],
  },
  devtool: 'inline-source-map',
  devServer: {
    client: {
      logging: 'none',
    },
  },
  plugins: [
    new HtmlPlugin({
      template: './public/index.html',
      favicon: path.resolve(__dirname, 'public/favicon.ico'),
    }),
    new CopyPlugin({
      patterns: [{ from: 'public/favicon.ico' }],
    }),
  ],
};
