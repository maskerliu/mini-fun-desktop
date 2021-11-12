import { defineComponent } from "vue";
import { NavBarState } from "../../../store/modules/interface";

const Common = defineComponent({
  name: "Common",
  data() {
    return {

    }
  },
  mounted() {
    let navBarState: NavBarState = {
      title: "设置",
      showLeft: false,
      showRight: false,
      rightIcon: null,
      rightText: null,
      rightAction: null
    };
    this.$store.dispatch("updateNavBar", navBarState);
  },
  methods: {

  },
});

export default Common;