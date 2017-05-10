const path = require('path');
const webpack = require('webpack');
const root = require('../utils/helpers').root;
const AotPlugin =  require('@ngtools/webpack').AotPlugin;

module.exports = {
  entry: './index.ts',
  output: {
    path: path.resolve(__dirname, '..', '..', 'dist', 'bundles'),
    filename: 'main.js'
  },
  resolve: {
    extensions: ['.js', '.ts']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'awesome-typescript-loader'
          },
          {
            loader: 'angular2-template-loader'
          }
        ]
      },
      {
        test: /\.s?css$/,
        use: [
          'raw-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.html$/,
        loader: 'raw-loader'
      }
    ]
  },
  plugins: [
    // The (\\|\/) piece accounts for path separators in *nix and Windows
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      root('src'), // location of your src
      {} // a map of your routes
    ),

    new AotPlugin({
      tsConfigPath: root('tsconfig.json'),
      entryModule: root('src/app/shared/my-module/index.ts#MyModule')
    })
  ]
};
