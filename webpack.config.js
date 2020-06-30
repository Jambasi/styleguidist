var path = require('path')
var webpack = require('webpack')
var glob = require('glob');

const pkg = require('./package.json');
console.log(__dirname)
const PATHS = {
  src: path.join(__dirname, './src'),
  dist: path.join(__dirname, './build')
}
var componentsPaths = glob.sync('./src/components/**/*.tsx');
// componentsPaths.push("./src/index.tsx");

module.exports = {
  mode: "development",
  entry: componentsPaths.reduce((entries, entry) => Object.assign(entries, {[entry.split('/').pop().replace('.tsx', '')]: entry}), {})
  ,
  externals : {
    react: 'react'
  },
  output: {
    path: PATHS.dist,
    filename: "[name].js",
    library: "component-test",
    libraryTarget: "umd",
    chunkFilename:'[name].[chunkhash:8].chunk.js',
    globalObject: '(typeof global!=="undefined"?global:window)'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: 'initial',
          test: /node_modules/,
          name: 'vendors',
        },
      },
    },
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader"
      },
      {
        test: /\.tsx$/,
        loader: "ts-loader"
      },
      {
        test: /\.p?css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              url: false
            }
          },
          {
            loader: "postcss-loader"
          }
        ]
      }
    ]
  },
  resolve: {
    // you can now require('file') instead of require('file.js')
    extensions: [".ts", ".js", ".tsx"]
  },
  plugins: [
    new webpack.IgnorePlugin(/test\.ts$/)
  ]
}