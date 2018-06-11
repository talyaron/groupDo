var path = require("path");
var webpack = require("webpack");
var merge = require("webpack-merge");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var autoprefixer = require("autoprefixer");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");
var entryPath = path.join(__dirname, "src/bootstrap.js");
var outputPath = path.join(__dirname, "public/groupDo");

console.log("WEBPACK GO!");

// determine build env
var TARGET_ENV = process.env.npm_lifecycle_event === "build" ? "production" : "development";
var outputFilename = TARGET_ENV === "production" ? "[name]-[hash].js" : "[name].js";

// common webpack config
var commonConfig = {

  output: {
    path: outputPath,
    filename: `static/js/${outputFilename}`
  },

  resolve: {
    extensions: ["", ".js"]
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.(eot|ttf|woff|woff2|svg)$/,
        loader: "file-loader"
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "src/static/index.html",
      inject: "body",
      filename: "index.html"
    }),
    new webpack.ProvidePlugin({
      "m": "mithril"
    }),

    // Going to use momentjs? Then you might want to uncomment this line
    // https://webpack.js.org/plugins/ignore-plugin/#ignore-moment-locales
    // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ],

  postcss: [autoprefixer({ browsers: ["last 2 versions"] })]
};

// additional webpack settings for local env (when invoked by "npm start")
if (TARGET_ENV === "development") {
  console.log("Serving locally...");

  module.exports = merge(commonConfig, {

    entry: [
      "webpack-dev-server/client?http://localhost:8080",
      entryPath
    ],

    devServer: {
      // serve index.html in place of 404 responses
      historyApiFallback: true,
      contentBase: "./src"
    },

    module: {
      loaders: [
        {
          test: /\.(css|scss)$/,
          loaders: [
            "style-loader",
            "css-loader",
            "postcss-loader",
            "sass-loader"
          ]
        }
      ]
    }

  });
}

// additional webpack settings for prod env (when invoked via "npm run build")
if (TARGET_ENV === "production") {
  console.log("Building for production...");

  module.exports = merge(commonConfig, {
    entry: entryPath,

    module: {
      loaders: [
        {
          test: /\.(css|scss)$/,
          loader: ExtractTextPlugin.extract("style-loader", [
            "css-loader",
            "postcss-loader",
            "sass-loader"
          ])
        }
      ]
    },

    plugins: [
      new CopyWebpackPlugin([
        {
          from: "src/static/img/",
          to: "static/img/"
        },
        {
          from: "src/favicon.ico"
        }
      ]),

      new webpack.optimize.OccurenceOrderPlugin(),

      // extract CSS into a separate file
      new ExtractTextPlugin("static/css/[name]-[hash].css", { allChunks: true }),

      // minify & mangle JS/CSS
      new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        compressor: { warnings: false },
        mangle: true
      })
    ]

  });
}
