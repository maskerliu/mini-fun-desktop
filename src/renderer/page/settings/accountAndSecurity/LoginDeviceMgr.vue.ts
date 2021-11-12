import { defineComponent } from "vue";
import { NavBarState } from "../../../store/modules/interface";

const LoginDeviceMgr = defineComponent({
  name: "LoginDeviceMgr",
  mounted() {
    let navBarState: NavBarState = {
      title: "选择语言",
      showLeft: true,
      showRight: false,
      rightIcon: null,
      rightText: null,
      rightAction: null
    };
    this.$store.dispatch("updateNavBar", navBarState);
  },
  methods: {

  }
});

export default LoginDeviceMgr;