import { defineComponent } from "vue";
import { NavBarState } from "../../../store/modules/interface";

const GameEngineMgr = defineComponent({
  data() {
    return {
      engines: [
        {name: "cc-js3", version: "3.2.1", url:"http://localhost:8000/cc-js-3.zip"},
        {name: "cc-js2", version: "2.4.3", url:"http://localhost:8000/cc-js-2.zip"},
      ]
    }
  },
  mounted() {
    let navBarState: NavBarState = {
      title: "游戏引擎管理",
      showLeft: true,
      showRight: false,
      rightIcon:null,
      rightText:null,
      rightAction: null
    };
    this.$store.dispatch("updateNavBar", navBarState);
  },
  methods: {

  }
});

export default GameEngineMgr;