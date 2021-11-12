import { defineComponent, PropType } from "vue";

import BizMain from "./page/BizMain.vue";
import DebugPanel from "./page/DebugPanel.vue";

const App = defineComponent({
  components: {
    [BizMain.name]: BizMain,
    [DebugPanel.name]: DebugPanel
  },
  props: {
    success: { type: String },
    callback: {
      type: Function as PropType<() => void>
    }
  },
  data() {
    return {
      canRender: false as boolean,
    }
  },
  computed: {

  },
  created() {
    this.canRender = true;
  },
  destroyed() {

  }
});

export default App;