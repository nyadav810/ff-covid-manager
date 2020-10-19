const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

function srcPath(subdir) {
  return path.join(__dirname, "src", subdir);
}

module.exports = (env) => {
  const isProduction = env.production;

  const rules = [
    {
      test: /\.ts(x?)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: "ts-loader",
        },
      ],
    },
    {
      test: /\.css$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            // you can specify a publicPath here
            // by default it uses publicPath in webpackOptions.output
            publicPath: "../",
            hmr: !env.production,
          },
        },
        "css-loader",
      ],
      exclude: /node_modules/,
    },
  ];

  if (!isProduction) {
    // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
    const sourceMapLoader = {
      enforce: "pre",
      test: /\.js$/,
      loader: "source-map-loader",
      exclude: [/node_modules\/@aws-sdk|@aws-crypto/],
    };

    rules.push(sourceMapLoader);
  }

  return {
    mode: isProduction ? "production" : "development",
    devtool: isProduction ? false : "source-map",
    devServer: {
      contentBase: path.join(__dirname, "dist"),
      compress: true,
    },
    entry: "./src/index.tsx",
    output: {
      filename: "main.js",
      path: path.resolve(__dirname, "dist"),
    },
    resolve: {
      alias: {
        src: srcPath(""),
      },
      modules: ["src", "node_modules"],
      extensions: [".wasm", ".ts", ".tsx", ".mjs", ".cjs", ".js", ".json"],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: "src/index.html",
      }),
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // all options are optional
        filename: "[name].css",
        chunkFilename: "[id].css",
        ignoreOrder: false, // Enable to remove warnings about conflicting order
      }),
    ],
    module: {
      rules,
    },
  };
};
