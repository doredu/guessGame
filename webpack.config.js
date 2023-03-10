const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/Index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    allowedHosts: "all",
  },
  module: {
    rules: [
      { test: /\.(js|ts)x?$/, exclude: /node_modules/, use: "babel-loader" },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".css"],
  },
};
