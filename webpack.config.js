var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/index.jsx'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      {
      test: /\.jsx?$/,
      loader: 'react-hot',
      include: path.join(__dirname, 'src'),
    },      
    {
      test: /\.jsx?$/,
      loader: 'babel',
      include: path.join(__dirname, 'src'),
      plugins: ['transform-runtime'],
      query: {
        presets: ['react', 'es2015', 'stage-0']
      }
    },
    ]
  }
};
