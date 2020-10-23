module.exports = (env) => {
  return {
    mode: env,
    entry: "./src/index.ts",
    output: {
      filename: "index.js",
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: "ts-loader",
        },
      ],
    },
    resolve: {
      extensions: [".ts", ".js"],
    },
    devServer: {
      liveReload: true,
    },
  };
};
