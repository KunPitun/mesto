const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'production',
  entry: './src/scripts/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    publicPath: '',
    clean: true,
  },
  plugins: [new HtmlWebpackPlugin({
    template: './src/index.html',
  }),
  new CleanWebpackPlugin(),
  new MiniCssExtractPlugin({
    filename: '[name].[contenthash].css',
  })
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'build'),
    },
    port: 8080,
    open: true,
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: 'babel-loader'
    },
    {
      test: /\.css$/i,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: { importLoaders: 1 }
        },
        'postcss-loader'
      ],
    }, 
    {
      test: /\.(png|svg|jpg|woff(2)?)$/,
      type: 'asset/resource',
      generator: {
        filename: 'img/[name].[hash][ext][query]'
      }
    }]
  }
};