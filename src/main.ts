import { createApp } from "vue";
import App from "./App.vue";
import "./index.scss";
import Button from "./button/index";

createApp(App).use(Button).mount("#app");
