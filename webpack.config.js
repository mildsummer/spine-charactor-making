var path = require("path");

module.exports = {
  context: __dirname + "/source",
  entry: {
    javascript: "./javascripts/main.js"
    //html: "./index.html",
    //css: "./index.css"
  },
  output: {
    path: path.join(__dirname, 'build', 'javascripts'),
    //publicPath: path.resolve(__dirname, "build"),
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
};