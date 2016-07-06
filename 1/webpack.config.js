var webpack = require('webpack');

// Add polyfill here so promises can be used throughout the entire application
require('es6-promise').polyfill();

var publicPath = "http://localhost:8080/";
var entry = [
  "./src/js/app.js" // Your appʼs entry point
];

module.exports = {
    entry: entry,
    output: {
        path: "htdocs/",
        publicPath: publicPath,
        filename: "./js/app.js"
    },
    module: {
        loaders: [
          {
            test: /\.css$/,
            loader: "style!css"
          },
          {
            test: /\.scss$/,
            loader: 'style!css!sass'
          },
          {
            test   : /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
            loader : 'file-loader'
          },
          {
            test: /\.(jpe?g|png|gif|svg)$/i,
            loader: 'file-loader'
          },
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loaders: ['react-hot', 'babel?presets[]=es2015,presets[]=stage-2,presets[]=react'],
            include: __dirname
          }
        ]
    },
    plugins:[
      // new webpack.optimize.UglifyJsPlugin({
      //   exclude: /node_modules/,
      //   compress: { warnings: false }
      // })
    ]
};
