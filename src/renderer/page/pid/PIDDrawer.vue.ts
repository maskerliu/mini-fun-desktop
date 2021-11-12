import { defineComponent } from "vue";
import DraggableResizable from '../components/draggable/DraggableResizable';


const PIDDrawer = defineComponent({
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
    };
  },
  mounted() {

  },
  methods: {

  },
});

export default PIDDrawer;