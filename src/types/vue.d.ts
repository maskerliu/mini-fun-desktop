import { Router } from "vue-router";
import Vue from "vue"
import { Store } from "vuex"

declare module "*.vue" {
  export default Vue;
}

declare module "vue/types/vue" {
  interface Vue {
    $eventbus: any;
    $router: Router;
    $socket: any;
    $connect: any;
    $disconnect: any;
  }
}

declare module '@vue/runtime-core' {
  // 声明自己的 store state
  interface State {
    count: number
  }

  // 为 `this.$store` 提供类型声明
  interface ComponentCustomProperties {
    $store: Store<State>
  }
}