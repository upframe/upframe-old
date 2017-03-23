import webpack from 'webpack'
import path from 'path'
export default {
  module: {
    rules: [{
      test: /\.((png)|(eot)|(woff)|(woff2)|(ttf)|(svg)|(gif))(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'file?name=/[hash].[ext]'
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }, {
      loader: 'babel-loader',
      test: /\.js?$/,
      exclude: /node_modules/,
      query: {
        cacheDirectory: true
      }
    }]
  },
  resolve: {
    modules: ['node_modules']
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: true,
      sourceMap: true
    }),
    new webpack.ProvidePlugin({
      'Promise': 'exports-loader?global.Promise!es6-promise',
      'fetch': 'exports-loader?self.fetch!whatwg-fetch'
    })
  ],
  context: path.join(__dirname, 'src'),
  entry: {
    app: ['./js/app']
  },
  output: {
    path: path.join(__dirname, 'site/static/js'),
    publicPath: '/',
    filename: '[name].js'
  },
  externals: [/^vendor\/.+\.js$/]
}
