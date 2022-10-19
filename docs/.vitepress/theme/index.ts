import DefaultTheme from "vitepress/theme";
import Button from "../../../src/button/src/Button";
import "vitepress-theme-demoblock/theme/styles/index.css";
import Demo from "vitepress-theme-demoblock/components/Demo.vue";
import DemoBlock from "vitepress-theme-demoblock/components/DemoBlock.vue";

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    // register global components
    app.component("y-button", Button);
    app.component("Demo", Demo);
    app.component("DemoBlock", DemoBlock);
  },
};
