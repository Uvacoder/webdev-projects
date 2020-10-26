module.exports = (env) => {
  return {
    mode: env,
    entry: "./src/index.tsx",
    output: {
      filename: "index.js",
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
