import { defineComponent } from "vue";
import { NavBarState } from "../../store/modules/interface";
import DraggableResizable from '../components/draggable/DraggableResizable';


const PIDHome = defineComponent({
  name: "PIDDrawer",
  components: {
    DraggableResizable
  },
  data() {
    return {
      x: 100,
      y: 100,
      h: 100,
      w: 100,
      active: false
    }
  },
  mounted() {
    let navBarState: NavBarState = {
      title: "P&ID",
      showLeft: false,
      showRight: false,
      rightAction: this.openContactList
    };
    this.$store.dispatch("updateNavBar", navBarState);
  },
  methods: {
    print(msg: any) {
      console.log(msg);
    }
  },
});

export default PIDHome;