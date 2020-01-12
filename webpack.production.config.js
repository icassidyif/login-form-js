const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const precss = require('precss');

module.exports = {
  entry: {
    polyfill: 'babel-polyfill',
    app: './js/app.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js',
    publicPath: ""
  },
  mode: 'production',
  context: path.resolve(__dirname, 'src'),
  // This option allows to combine vendors library to one common file.
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 10000,
      automaticNameDelimiter: "_"
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: [
          /node_modules/
        ]
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [precss, autoprefixer],
            },
          },
          {
            loader: "sass-loader" // compiles Sass to CSS
          }
        ]
      },
      {
        test: /\.(css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [precss, autoprefixer],
            },
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns:[
        '**/*'
      ]
    }),
    new MiniCssExtractPlugin({ filename: 'style.[hash].css' }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      inject: 'body'
    }),
    new CleanWebpackPlugin()
  ]
};
