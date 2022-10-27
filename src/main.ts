import { createApp } from "vue";
import App from "./App.vue";
import "./index.scss";
import Button from "./button/index";

import yiwwhlUI from "../build";

createApp(App).use(yiwwhlUI).mount("#app");
