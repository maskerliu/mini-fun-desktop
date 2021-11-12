import { defineComponent } from "vue";
import { NavBarState } from "../../../store/modules/interface";

const SelectLang = defineComponent({
  data() {
    return {
      supportedCountries: [],
      selectedLang: 1,
    }
  },
  mounted() {
    this.supportedCountries = ["简体中文", "繁体中文（台湾）", "繁体中文（香港）", "English"];

    let navBarState: NavBarState = {
      title: "选择语言",
      showLeft: true,
      showRight: false,
      rightIcon:null,
      rightText:null,
      rightAction: null
    };
    this.$store.dispatch("updateNavBar", navBarState);
  },
  methods: {

  },
  beforeRouteEnter(to: any, from: any) {
    
  },
});

export default SelectLang;