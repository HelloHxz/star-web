/* eslint-disable */
const path = require('path');
const webpack = require('webpack');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

const rmdirSync = (function () {
  function iterator(url, dirs) {
    const stat = fs.statSync(url);
    if (stat.isDirectory()) {
      dirs.unshift(url); // 收集目录
      inner(url, dirs);
    } else if (stat.isFile()) {
      fs.unlinkSync(url); // 直接删除文件
    }
  }
  function inner(path, dirs) {
    const arr = fs.readdirSync(path);
    for (var i = 0,
      el; el = arr[i++];) {
      iterator(`${path}/${el}`, dirs);
    }
  }
  return function (dir, cb) {
    cb = cb
    || function () {};
    const dirs = [];

    try {
      iterator(dir, dirs);
      for (var i = 0,
        el; el = dirs[i++];) {
        fs.rmdirSync(el); // 一次性删除所有收集到的目录
      }
      cb();
    } catch (e) { // 如果文件或目录本来就不存在，fs.statSync会报错，不过我们还是当成没有异常发生
      e.code === 'ENOENT' ? cb() : cb(e);
    }
  };
}());

module.exports = function start(env) {
  const appList = ['home'];
  const nodeEnv = env.env || 'development';
  const action = env.action || 'start';
  // new webpack.DefinePlugin(defineValue),
  const isBuild = action === 'build';
  const entryAndHtmlPlugin = getEntryAndHtmlPlugin(appList, isBuild);
  let plugins = [];
  plugins = plugins.concat(entryAndHtmlPlugin.htmlplugins);

  if (isBuild) {
    rmdirSync('./dist');
  } else {
    const openurl = env.openurl || '';
    if (openurl.length > 0) {
      plugins.push(new OpenBrowserPlugin({ url: openurl }));
    }
    plugins.push(new webpack.HotModuleReplacementPlugin());
  }

  // DefinePlugin的一种开发变量注入的替代方案 编译时不同环境加在不同代码文件的方案
  const extensions =  ['.js', `.${nodeEnv}.js`, '.json'];

  return {
    context: path.resolve(__dirname, 'demo'),
    mode: ['development', 'production', 'none'].indexOf(nodeEnv) < 0 ? 'development' : nodeEnv,
    entry: entryAndHtmlPlugin.entry,
    output: {
      filename: '[name].[hash:8].js',
      chunkFilename: !isBuild ? '[name].bundle.js' : '[name].[chunkhash:8].min.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: './',
    },

    performance: {
      hints: !isBuild ? false : 'warning'
    },

    watchOptions: {
      poll: true,
    },
    devtool: isBuild ? 'cheap-module-source-map' : '#source-map',
    devServer: {
      hot: true,
      contentBase: path.resolve(__dirname, 'dist'),
      publicPath: '/',
      // 支持historyState
      // historyApiFallback:true ???
      // historyApiFallback: {
      //   index: isBuild ? './': '/' + appList[0] + '.html',
      // },
    },
    resolve: {
      extensions: extensions,
      modules: [path.resolve(__dirname, 'demo'), path.resolve(__dirname, 'src'), 'node_modules'],
    },
    module: {
      rules: [{
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['transform-class-properties'],
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


function getEntryAndHtmlPlugin(siteArr) {
  const re = {
    entry: {},
    htmlplugins: [],
  };
  for (let i = 0, j = siteArr.length; i < j; i += 1) {
    const siteName = siteArr[i];
    re.entry[siteName] = ['babel-polyfill', `./${siteName}/index.js`]; // js多入口字典对象
    re.htmlplugins.push(new HtmlWebpackPlugin({
      filename: `${siteName}.html`,
      template: `./${siteName}/index.html`,
      inject: 'body',
      chunks: [siteName],
      hash: true,
    }));
  }
  return re;
}

