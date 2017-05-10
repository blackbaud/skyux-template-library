const path = require('path');
const webpack = require('webpack');
const helpers = require('./config/utils/helpers');
const ngcWebpack = require('ngc-webpack');

module.exports = {
  entry: './index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    libraryTarget: 'umd'
  },
  externals: [
    /^@angular\//,
    /^rxjs\//
  ],
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['awesome-typescript-loader','angular2-template-loader'],
        exclude: [/\.(spec|e2e)\.ts$/]
      },
      {
        test: /\.html$/,
        use: 'raw-loader'
      },
      {
        test: /\.scss$/,
        use: ['raw-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    // The (\\|\/) piece accounts for path separators in *nix and Windows
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      helpers.root('src'), // location of your src
      {} // a map of your routes
    ),

    new ngcWebpack.NgcWebpackPlugin({
      tsConfig: helpers.root('tsconfig-aot.json')
    }),

    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      comments: false,
      mangle: { screw_ie8: true, keep_fnames: true },
      sourceMap: true
    })
  ]
};
