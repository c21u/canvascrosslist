import { merge } from "webpack-merge";
import common from "./webpack.common.js";

export default merge(common, {
  mode: "development",
  devtool: "source-map",
  devServer: {
    contentBase: "./dist",
    port: 3001,
    proxy: {
      "/": {
        target: "http://localhost:3000",
      },
    },
  },
});
