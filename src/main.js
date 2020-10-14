import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "./assets/scss/global.scss";
createApp(App)
  .use(router)
  .use(store)
  .mount("#app");
