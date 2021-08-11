import * as path from "path";
import * as webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ExtractCSS from "mini-css-extract-plugin";
import ReactRefreshPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import CSSMinimizerPlugin from "css-minimizer-webpack-plugin";
import ft from "fork-ts-checker-webpack-plugin";

const PRODUCTION = process.env.NODE_ENV === "production";
const DEVELOPMENT = !PRODUCTION;

const SOURCE_DIR = path.join(__dirname, "src");

const MODE = PRODUCTION ? "production" : "development";

const commonPlugins = [
  new HtmlWebpackPlugin({
    template: path.join(SOURCE_DIR, "index.html"),
    minify: {
      collapseWhitespace: true,
      removeComments: true,
    },
    // favicon: path.resolve("./static/favicon.png")
  }),
  new ft({ typescript: {} }),
];

const prodPlugins = [
  new CSSMinimizerPlugin(),
  new ExtractCSS({
    filename: "styles-[contenthash].css",
  }),
];

const devPlugins = [
  new ExtractCSS({
    filename: "styles.css",
  }),
  new ReactRefreshPlugin(),
];

const plugins: webpack.Plugin[] = [
  ...(PRODUCTION ? prodPlugins : devPlugins),
  ...commonPlugins,
];

const styleLoaders = DEVELOPMENT
  ? [
      "style-loader",
      {
        loader: "css-loader",
        options: {
          sourceMap: DEVELOPMENT,
        },
      },
      // "@teamsupercell/typings-for-css-modules-loader",
    ]
  : [
      {
        loader: ExtractCSS.loader,
        options: {
          hmr: DEVELOPMENT,
        },
      },
      {
        loader: "css-loader",
        options: {
          sourceMap: DEVELOPMENT,
        },
      },
    ];

const config: webpack.Configuration = {
  mode: MODE,
  devtool: DEVELOPMENT ? "source-map" : undefined,
  entry: SOURCE_DIR,
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "/",
    filename: "[name].[hash].js",
  },
  plugins,
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [...styleLoaders],
      },
      {
        test: /\.less$/,
        use: [
          ...styleLoaders,
          {
            loader: "less-loader", // compiles Less to CSS
            options: {
              lessOptions: {
                modifyVars: {
                  "primary-color": "#1853db",
                  "font-size-base": "16px",
                },
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.html$/,
        loader: "html-loader",
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "[hash].[ext]",
              limit: 10000,
            },
          },
        ],
      },
      {
        test: /\.tsx?$/,
        use: [
          "babel-loader",
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".styl"],
    modules: [SOURCE_DIR, "node_modules"],
    alias: {
      static: path.resolve("static"),
    },
  },
  devServer: {
    historyApiFallback: {
      index: "/",
    },
    hot: true,
    port: 3000,
    host: "0.0.0.0",
  },
  stats: "errors-only",
};

export default config;
