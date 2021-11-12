import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';

const CustomEmojiPicker = defineComponent({
  name: "CustomEmojiPicker",
  data() {
    return {

    };
  },
  mounted() {

  },
  computed:{
    ...mapGetters("MsgCenter", [
      "myEmoticons"
    ]),
  },
  methods: {

  }
});

export default CustomEmojiPicker;