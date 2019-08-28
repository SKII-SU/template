// vue.config.js 配置说明
// 这里只列一部分，具体配置惨考文档啊
const path = require("path");
require("babel-polyfill");

function resolve(dir) {
  return path.join(__dirname, dir);
}
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
module.exports = {
  // baseUrl  type:{string} default:'/'
  // 将部署应用程序的基本URL
  // 将部署应用程序的基本URL。
  // 默认情况下，Vue CLI假设您的应用程序将部署在域的根目录下。

  publicPath: "/",

  // outputDir: 在npm run build时 生成文件的目录 type:string, default:'dist'

  // outputDir: 'dist',

  // pages:{ type:Object,Default:undfind }
  /*
构建多页面模式的应用程序.每个“页面”都应该有一个相应的JavaScript条目文件。该值应该是一
个对象，其中键是条目的名称，而该值要么是指定其条目、模板和文件名的对象，要么是指定其条目
的字符串，
注意：请保证pages里配置的路径和文件名 在你的文档目录都存在 否则启动服务会报错的
*/
  // pages: {
  // index: {
  // entry for the page
  // entry: 'src/index/main.js',
  // the source template
  // template: 'public/index.html',
  // output as dist/index.html
  // filename: 'index.html'
  // },
  // when using the entry-only string format,
  // template is inferred to be `public/subpage.html`
  // and falls back to `public/index.html` if not found.
  // Output filename is inferred to be `subpage.html`.
  // subpage: 'src/subpage/main.js'
  // },

  //   lintOnSave：{ type:Boolean default:true } 问你是否使用eslint
  lintOnSave: process.env.NODE_ENV !== "production",
  // productionSourceMap：{ type:Bollean,default:true } 生产源映射
  // 如果您不需要生产时的源映射，那么将此设置为false可以加速生产构建
  productionSourceMap: false,
  // devServer:{type:Object} 3个属性host,port,https
  // 它支持webPack-dev-server的所有选项

  devServer: {
    port: 8085, // 端口号
    host: "0.0.0.0",
    https: false, // https:{type:Boolean}
    // proxy: 'http://localhost:4000' // 配置跨域处理,只有一个代理
    proxy: {
      "/api": {
        target: "<url>",
        ws: true,
        changeOrigin: true
      },
      "/foo": {
        target: "<other_url>"
      }
    }, // 配置多个代理
  },
  configureWebpack: config => {
    // 入口文件
    config.entry.app = ["babel-polyfill", "./src/main.js"];
    // 删除console插件
    let plugins = [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            warnings: false,
            drop_console: true,
            drop_debugger: true
          },
          output: {
            // 去掉注释内容
            comments: true
          }
        },
        sourceMap: false,
        parallel: true
      })
    ];
    // 只有打包生产环境才需要将console删除
    if (process.env.VUE_APP_build_type == "production") {
      config.plugins = [...config.plugins, ...plugins];
    }
  },
  // 允许对内部的 webpack 配置进行更细粒度的修改。
  chainWebpack: config => {
    // 命名

    config.resolve.alias
      .set("@", resolve("src"))
      .set("@assets", resolve("src/assets"))
      .set("@views", resolve("src/views"))
      .set("@components", resolve("src/components"))
      .set("@utils", resolve("src/assets/utils"));
    // 打包文件带hash
    config.output.filename("[name].[hash].js").end();

    // 为了补删除换行而加的配置
    config.module
      .rule("vue")
      .use("vue-loader")
      .loader("vue-loader")
      .tap(options => {
        // modify the options...
        options.compilerOptions.preserveWhitespace = true;
        return options;
      });
  }
};
