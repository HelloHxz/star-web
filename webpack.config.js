/* eslint-disable */
const path = require('path');
const webpack = require('webpack');
const utils = require('./scripts/utils');
const createTheme = require('./scripts/theme');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = function start(env) {
  createTheme();
  const nodeEnv = env.env || 'development';
  const distOutPutPath = path.resolve(__dirname, `dist/${nodeEnv}`);
  const action = env.action || 'start';
  const routerType = env.routertype || 'hash'; // hash || history
  const isBuild = action === 'build';
  // DefinePlugin的一种开发变量注入的替代方案 编译时不同环境加在不同代码文件的方案
  const extensions =  [`.${nodeEnv}.js`, `.${routerType}.js`, '.js'];

  let plugins = [new HtmlWebpackPlugin({
    filename: `index.html`,
    template: `./index.html`,
    inject: 'body',
    chunks: ['index'],
    hash: true,
  })];

  if (isBuild) {
    utils.rmdirSync(distOutPutPath);
  } else {
    const openurl = env.openurl || '';
    if (openurl.length > 0) {
      plugins.push(new OpenBrowserPlugin({ url: openurl }));
    }
    plugins.push(new webpack.HotModuleReplacementPlugin());
  }

  return {
    context: path.resolve(__dirname, 'demo'),
    mode: ['development', 'production', 'none'].indexOf(nodeEnv) < 0 ? 'development' : nodeEnv,
    entry: {
      index: ['babel-polyfill', './index.js'],
    },
    output: {
      filename: '[name].[hash:8].js',
      chunkFilename: !isBuild ? '[name].bundle.js' : '[name].[chunkhash:8].min.js',
      path: distOutPutPath,
      publicPath: routerType === 'history' ? '/' : './',
    },

    performance: {
      hints: !isBuild ? false : 'warning'
    },

    watchOptions: {
      poll: true,
      ignored: /node_modules/,
    },
    devtool: isBuild ? 'cheap-module-source-map' : '#source-map',
    devServer: {
      hot: true,
      publicPath: '/',
      historyApiFallback: true,
    },
    resolve: {
      extensions: extensions,
      alias: {
        "star-web": path.resolve(__dirname, './'),
      },
    },
    module: {
      rules: [{
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
              'transform-class-properties',
              'syntax-dynamic-import',
              ["import", { "libraryName": "star-web", "libraryDirectory": "src/components"}]
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: loader => [
                require('postcss-import')({ root: loader.resourcePath }),
                require('autoprefixer')({
                  browsers: [
                    '> 0.01%',
                  ],
                }),
              ],
            },
          }],
      },
      {
        test: /\.(png|jpg|jpeg|gif|woff)$/,
        loader: 'url-loader?limit=6144&name=imgs/[path][name].[ext]',
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader?name=fonts/[name].[ext]',
      },
      {
        test: /\.less$/,
        use: [{
          loader: 'style-loader',
        },
        {
          loader: 'css-loader',
        },
        {
          loader: 'postcss-loader',
          options: {
            plugins: loader => [
              require('postcss-import')({ root: loader.resourcePath }),
              require('autoprefixer')({
                browsers: [
                  '> 0.01%',
                ],
              }),
            ],
          },
        },
        {
          loader: 'less-loader',
          options: {
            javascriptEnabled: true,
          },
        }],
      }],
    },

    plugins,
  };
};
