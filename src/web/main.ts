import vant from 'vant';
import "@vant/touch-emulator";
import { createApp } from "vue";


import App from "./App.vue";
import router from "./router";
import store from "./store";

const app = createApp({
  components: { App },
  router,
  store,
  template: "<App/>",
});
app.use(vant);
app.mount("#app");