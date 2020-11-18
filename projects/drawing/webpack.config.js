const path = require("path");

module.exports = (env) => {
  return {
    mode: env,
    entry: "./src/index.ts",
    output: {
      filename: "./dist/index.js",
      path: path.join(__dirname),
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: "ts-loader",
        },
      ],
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"],
    },
    devtool: "source-map",
  };
};
