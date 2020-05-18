"use strict";

const path = require("path");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const StyleLintPlugin = require("stylelint-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const chalk = require("chalk");

const resolve = dir => {
  return path.join(__dirname, "./", dir);
};

const isProd = () => {
  return process.env.NODE_ENV === "production";
};

//额外的配置,配置全局less
function addStyleResource(rule) {
  rule
    .use("style-resource")
    .loader("style-resources-loader")
    .options({
      patterns: [path.resolve(__dirname, "src/assets/less/variable.less")]
    });
}
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
  const plugins = [
    new ProgressBarPlugin({
      format:
        "  build [:bar] " +
        chalk.green.bold(":percent") +
        " (:elapsed seconds)",
      clear: false
    })
  ];
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
    // style-resources-loader
    //如果你想自动化导入文件 (用于颜色、变量、mixin……)，你可以使用 style-resources-loader
    const types = ["vue-modules", "vue", "normal-modules", "normal"];
    types.forEach(type =>
      addStyleResource(config.module.rule("less").oneOf(type))
    );
    //webpack sourcemap 选项多种模式;参考https://segmentfault.com/a/1190000004280859
    config.when(!isProd(), config =>
      config.devtool("cheap-module-eval-source-map")
    );

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

    // webpack-html-plugin
    config.plugin("html").tap(args => {
      args[0].minify = {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      };
      return args;
    });

    // optimization
    config.when(!isProd(), config => {
      config
        .plugin("ScriptExtHtmlWebpackPlugin")
        .use("script-ext-html-webpack-plugin", [
          {
            // `runtime` must same as runtimeChunk name. default is `runtime`
            inline: /runtime\..*\.js$/
          }
        ]);
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
