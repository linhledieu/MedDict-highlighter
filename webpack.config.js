const path = require('path');

module.exports = {
  mode: 'development',
  entry: './main/highlighter.js', // Replace with the path to your main content script
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: 'content-script-bundle.js' // Output file
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};
