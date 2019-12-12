const webpack = require("webpack");
const dotenv = require("dotenv");
const fs = require("fs"); // to check if the file exists
const path = require("path"); // to get the current path
module.exports = env => {
  const currentPath = path.join(__dirname);

  let basePath = currentPath + "/.env";

  if (env) {
    const envPath = basePath + "." + env.ENVIRONMENT;
    if (fs.existsSync(envPath)) {
      basePath = envPath;
    }
  }

  // Set the path parameter in the dotenv config
  const fileEnv = dotenv.config({ path: basePath }).parsed;

  // reduce it to a nice object, the same as before (but with the variables from the file)
  const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
    return prev;
  }, {});

  return {
    mode: "development",
    watch: false,
    entry: ["@babel/polyfill", "./src/index.tsx"],
    plugins: [new webpack.DefinePlugin(envKeys)],
    output: {
      filename: "bundle.js",
      path: __dirname + "/public"
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".json"]
    },
    devtool: "source-map",
    devServer: {
      contentBase: path.join(__dirname, "public"),
      historyApiFallback: true
    },
    module: {
      rules: [
        { test: /\.scss$/, use: ["style-loader", "css-loader", "sass-loader"] },
        { test: /\.css$/, use: ["style-loader", "css-loader"] },
        { test: /\.tsx?$/, loader: "babel-loader" },
        { test: /\.tsx?$/, loader: "ts-loader" },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          use: [
            {
              loader: "file-loader"
            }
          ]
        },
        { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
      ]
    }
  };
};
