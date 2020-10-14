const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  chainWebpack: config => {
    // 别名
    config.resolve.alias
      .set("@$", resolve("src"))
      .set("views", resolve("src/views"))
      .set("components", resolve("src/components"))
      .set("assets", resolve("src/assets"))
      .set("store", resolve("src/store"))
      .set("request", resolve("src/request"))
      .set("composables", resolve("src/composables"))
      .set("utils", resolve("src/utils"));

    config.plugin("html").tap(args => {
      args[0].title = "本地玩商店";
      return args;
    });
  }
};
