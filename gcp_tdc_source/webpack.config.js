"use strict";
// import config from "./config/config";
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const HotModuleReplacePlgun = require("webpack/lib/HotModuleReplacementPlugin");

const env_config = {
  DEV: "development",
  TEST: "production",
  MASTER: "production"
};
const isEnvDevelopment = env_config[process.env.env] === "development";
const isEnvProduction = env_config[process.env.env] === "production";

console.log(isEnvDevelopment, isEnvProduction, process.argv.pop());
const publicPath = isEnvProduction ? "/" : isEnvDevelopment && "/";

const shouldUseSourceMap = false;
module.exports = {
  // mode: isEnvProduction ? "production" : isEnvDevelopment && "development",
  mode: "development",
  entry: { app: ["react-hot-loader/patch", "./src/app/index.tsx"] },
  output: {
    filename: "bundle.js",
    path: __dirname + "/dist"
  },
  devServer: {
    // redirect
    historyApiFallback: {
      rewrites: [
        {
          from: /^\/$/,
          to: "/index.html"
        }
      ],
      disableDotRule: true
    },
    host: "127.0.0.1",
    hot: true,
    port: 8088,
    publicPath: publicPath,
    contentBase: path.resolve(__dirname, "dist")
  },
  devtool: "inline-scource-map",
  resolve: {
    alias: {},
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  module: {
    // unknownContextCritical : false,
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "awesome-typescript-loader",
        query: {
          presets: ["env", "react"]
          // plugins: [
          //   ["import", { libraryName: "antd", style: "css" }] // antd按需加载
          // ]
        }
      },
      // {
      //   test: /\.(css|less)$/,
      //   exclude: /node_modules/,
      //   loaders: [
      //     MiniCssExtractPlugin.loader,
      //     {
      //       loader: "css-loader",
      //       options: {
      //         sourceMap: true, //资源映射
      //         modules: false, //是否允许模块 // import styles from "./slide-menu.scss"; 以对象的形式展示
      //         importLoaders: 20
      //       }
      //     },
      //     {
      //       loader: "less-loader",
      //       options: {
      //         sourceMap: true,
      //         modules: false
      //       }
      //     }
      //   ]
      // },

      // 针对antd
      // {
      //   test: /\.css$/,
      //   include: /node_modules/,
      //   exclude: path.resolve(__dirname, "src"),
      //   loaders: [
      //     {
      //       loader: "style-loader"
      //     },
      //     {
      //       loader: "css-loader"
      //     },
      //     {
      //       loader: "less-loader"
      //     }
      //   ]
      // },
      {
        test: /\.(css|scss)$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, "src"),
        loaders: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true, //资源映射

              importLoaders: 20
            }
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: [require("autoprefixer")]
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        ///处理html
        test: /\.html?/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, "public"),
        use: {
          loader: "html-loader",
          options: {
            minimize: true //压缩html代码
          }
        }
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              name: "images/[name].[ext]"
            }
          }
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              name: "fonts/[name].[ext]"
            }
          }
        ]
      }
    ]
  },
  externals: {
    // react: "React",
    // "react-dom": "ReactDOM"
  },
  optimization: {
    minimize: isEnvProduction,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          parse: {
            ecma: 8
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,

            inline: 2
          },
          mangle: {
            safari10: true
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true
          }
        },
        parallel: true,
        cache: true,
        sourceMap: shouldUseSourceMap
      })
    ],
    splitChunks: {
      chunks: "async",
      cacheGroups: {
        commons: {
          name: "commons",
          chunks: "initial",
          minChunks: 2
        }
      }
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "styles/[name]_[hash].css",
      chunkFilename: "[id].css"
    }),
    new HotModuleReplacePlgun(),
    // new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html", // 生成的html文件名
      template: "./public/index.html", // 依据的模板
      chunks: ["app", "commons"],
      inject: true, //注入的js文件将会被放在body标签中,当值为'head'时，将被放在head标签中
      minify: {
        //压缩配置
        removeComments: true, //删除html中的注释代码
        collapseWhitespace: true, //删除html中的空白符
        removeAttributeQuotes: true //删除html元素中属性的引号
      },
      // chunksSortMode: "dependency" //按dependency的顺序引入
      chunksSortMode: "none"
    }),
    new ManifestPlugin({
      fileName: "asset-manifest.json",
      publicPath: publicPath,
      generate: (seed, files) => {
        const manifestFiles = files.reduce(function(manifest, file) {
          manifest[file.name] = file.path;
          return manifest;
        }, seed);

        return {
          files: manifestFiles
        };
      }
    })
  ]
};
