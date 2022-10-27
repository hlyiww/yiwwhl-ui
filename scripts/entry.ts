// 入口文件

// 1. 引入实现的组件批量导出
import type { App } from "vue";
import ButtonPlugin, { Button } from "../src/button/index";
export { Button };
// 2. 导出 vue 插件
const plugins = [ButtonPlugin];

export default {
  install(app: App) {
    plugins.forEach(plugin => app.use(plugin));
  },
};
