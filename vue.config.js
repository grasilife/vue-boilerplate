"use strict";

const path = require("path");
const StyleLintPlugin = require("stylelint-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const resolve = dir => {
  return path.join(__dirname, "./", dir);
};

const isProd = () => {
  return process.env.NODE_ENV === "production";
};
const setOptimization = () => {
  if (isProd()) {
    return {
      minimizer: [
        new TerserPlugin({
          terserOptions: { compress: { drop_console: true } }
        })
      ]
    };
  }
};
const genPlugins = () => {
  const plugins = [];
  if (!isProd()) {
    plugins.push(
      //stylelint 支持在 Vue 单文件组件的样式部分的代码校验
      new StyleLintPlugin({
        lintDirtyModulesOnly: true,
        files: ["**/*.{vue,htm,html,css,sss,less,scss,sass}"]
      })
    );
  }
  return plugins;
};
// vue cli 配置
module.exports = {
  publicPath: "./",
  assetsDir: "static",
  lintOnSave: !isProd(),
  productionSourceMap: false,
  // webpack-dev-server 相关配置
  // --platform=<platform>： 打包的系统(darwin、win32、linux)
  devServer: {
    open: true,
    host: "0.0.0.0",
    port: 3000,
    https: false,
    hotOnly: false,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      // "/rest": {
      //   target: "http://0.0.0.0:10080/rest/",
      //   changeOrigin: true,
      //   pathRewrite: {
      //     "^/rest": ""
      //   },
      //   cookiePathRewrite: {
      //     "/iov/subject": "/"
      //   },
      //   cookieDomainRewrite: {}
      // },
      "/mock": {
        target: "http://0.0.0.0:10080/rest/",
        changeOrigin: true,
        ws: false,
        pathRewrite: {
          "^/mock": ""
        }
      }
    }
  },

  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: isProd() ? true : false,
    // 开启 CSS source maps?
    sourceMap: isProd() ? true : false,
    // css预设器配置项
    loaderOptions: {},
    // 启用 CSS modules for all css / pre-processor files.
    requireModuleExtension: true
  },
  parallel: require("os").cpus().length > 1,
  configureWebpack: () => ({
    name: "vue-cli3-template",
    optimization: setOptimization(),
    resolve: {
      alias: {
        "@": resolve("src")
      }
    },
    plugins: genPlugins()
  }),
  // webpack配置
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  chainWebpack: config => {
    // plugin
    config.module
      .rule("svg")
      .exclude.add(resolve("src/icons"))
      .end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      })
      .end();
    // preload

    // runtime.js 内联的形式嵌入
    config.plugin("preload").tap(args => {
      args[0].fileBlacklist.push(/runtime\./);
      return args;
    });

    // optimization
    config.when(!isProd(), config => {
      config.optimization.splitChunks({
        chunks: "all",
        cacheGroups: {
          vendors: {
            name: "chunk-vendors",
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: "initial" // 只打包初始时依赖的第三方
          },
          commons: {
            name: "chunk-commons",
            test: resolve("src/components"), // 可自定义拓展你的规则
            minChunks: 3, // 最小公用次数
            priority: 5,
            reuseExistingChunk: true
          }
        }
      });
      config.optimization.runtimeChunk("single");
    });
  },
  pluginOptions: {
    lintStyleOnBuild: true,
    stylelint: {}
  }
};
