import { dirname, resolve } from "path";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import HTMLWebpackPlugin from "html-webpack-plugin";
import { fileURLToPath } from "url";
import { readFile } from "fs/promises";
import webpack from "webpack";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default {
  context: resolve(__dirname, "client/src"),
  entry: {
    app: "./index.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: resolve(__dirname, "dist"),
  },
  module: {
    noParse: [/xlsx.core.min.js/, /xlsx.full.min.js/],
    rules: [
      {
        test: /\.m?js$/,
        type: "javascript/auto",
      },
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        resolve: { extensions: [".js", ".jsx"] },
        use: {
          loader: "babel-loader",
          options: JSON.parse(
            await readFile(new URL("./.babelrc.json", import.meta.url))
          ),
        },
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: "index.html",
    }),
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
  ],
};
