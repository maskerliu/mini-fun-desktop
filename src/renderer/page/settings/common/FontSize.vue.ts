import { defineComponent } from "vue";
import { NavBarState } from "../../../store/modules/interface";

const FontSize = defineComponent({
  data() {
    return {

    }
  },
  mounted() {
    let navBarState: NavBarState = {
      title: "字体设置",
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

export default FontSize;