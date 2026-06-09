const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");

const appPageFirstUrl = process.env.APP_PAGE_FIRST_URL || "http://localhost:3001/remoteEntry.js";
const appPageSecondUrl = process.env.APP_PAGE_SECOND_URL || "http://localhost:3002/remoteEntry.js";
const publicPath = process.env.HOST_PUBLIC_URL || "auto";

module.exports = {
  entry: "./src/index.js",
  output: {
    publicPath,
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "Host",
      remotes: {
        // Points to each remote app's Module Federation entry file
        AppPageFirst: `AppPageFirst@${appPageFirstUrl}`,
        AppPageSecond: `AppPageSecond@${appPageSecondUrl}`,
      },
      shared: {
        react: { singleton: true, eager: false, requiredVersion: "^18.2.0" },
        "react-dom": { singleton: true, eager: false, requiredVersion: "^18.2.0" },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
  devServer: {
    port: 3000,
    hot: true,
    historyApiFallback: true,
  },
};
