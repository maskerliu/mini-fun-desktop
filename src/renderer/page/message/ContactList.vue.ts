import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import { NavBarState } from "../../store/modules/interface";

const ContactList = defineComponent({

  data() {
    return {

    }
  },
  mounted(): void {
    let navBarState: NavBarState = {
      title: "通讯录",
      showLeft: true,
      leftIcon: "back",
      leftText: null,
      leftAction: null,
      showRight: true,
      rightIcon: 'search',
      rightText: null,
      rightAction: this.search
    };
    this.$store.dispatch("updateNavBar", navBarState);
  },
  computed: {
    ...mapGetters("MsgCenter", [
      "users",
      "friends"
    ])
  },
  methods: {

    search() {

    }
  }
});

export default ContactList;