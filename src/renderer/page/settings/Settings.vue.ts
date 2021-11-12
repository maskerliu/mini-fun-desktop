import { defineComponent } from "vue";
import { NavBarState } from "../../store/modules/interface";

const Settings = defineComponent({
  name: "Settings",
  data() {
    return {
      activeKey: 0,
    }
  },
  created(): void {
    this.$router.replace("/settings/accountAndSecurity");

    let navBarState: NavBarState = {
      title: "设置",
      showLeft: false,
      showRight: false,
      rightIcon:null,
      rightText:null,
      rightAction: null
    };
    this.$store.dispatch("updateNavBar", navBarState);
  },
  destroyed(): void {

  },
});

export default Settings