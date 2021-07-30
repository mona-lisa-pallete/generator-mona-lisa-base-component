const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    index: path.join(__dirname, 'src', 'index.tsx'),
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        TARO_ENV: JSON.stringify(process.env.type),
      },
    }),
  ],
  resolve: {
    extensions: ['.ts', '.js', '.tsx', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: [path.join(__dirname, 'src')],
        use: {
          loader: 'ts-loader',
        },
      },
    ],
  },
  // devtool: "eval",
  devtool: 'inline-source-map',
  mode: 'development',
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'lib'),
    library: '[name]',
  },
};
