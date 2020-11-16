const path = require("path");

module.exports = (env) => {
  return {
    mode: env,
    entry: "./src/index.tsx",
    output: {
      filename: "./dist/index.js",
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
  };
};
