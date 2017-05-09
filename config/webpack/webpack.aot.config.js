const path = require('path');
const webpack = require('webpack');
const root = require('../utils/helpers').root;

module.exports = {
  entry: './index.ts',
  output: {
    path: path.resolve(__dirname, '..', '..', 'dist', 'bundles'),
    filename: 'my-module.umd.js',
    library: 'MyModule',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              // Ignore the "Cannot find module" error that occurs when referencing
              // an aliased file.  Webpack will still throw an error when a module
              // cannot be resolved via a file path or alias.
              ignoreDiagnostics: [2307]
            }
          },
          {
            loader: 'angular2-template-loader'
          }
        ],
        exclude: [
          /node_modules/,
          /\.(spec|e2e|d)\.ts$/
        ]
      },
      {
        test: /\.html$/,
        use: [
          { loader: 'raw-loader' }
        ]
      }
    ]
  },
  plugins: [
    // The (\\|\/) piece accounts for path separators in *nix and Windows
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      root('./src'), // location of your src
      {} // a map of your routes
    )
  ]
};
