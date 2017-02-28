module.exports = {
  entry: './src/app.ts',
  output: {
    filename: './src/bundle.js'
  },
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
  },
  module: {
    loaders: [
      { test: /\.ts$/, loader: 'ts-loader' }
    ]
  },
  devtool: 'inline-source-map'
}