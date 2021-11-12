import linkifyElement from 'linkifyjs/element';
import { ImagePreview } from 'vant';
import { defineComponent, PropType } from "vue";
import { mapGetters } from 'vuex';
import { Message } from "../../../store/modules/message/interface";

const MessageTo = defineComponent({
  setup() {

  },
  props: {
    message: {
      type: Object as PropType<Message>,
      required: true
    },
    asyncMode: {
      type: Boolean,
      required: false,
      default: false
    },
    timestampConfig: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      linkOptions: {
        className: "link-class",
        events: {
          click(e: any) {
            alert('Link clicked!');
          },
          mouseover(e: any) {
            // alert('Link hovered!');
          }
        },
        format(value: any, type: string) {
          if (type === 'url' && value.length > 50) {
            value = value.slice(0, 50) + '…';
          }
          return value;
        }
      }
    }
  },
  mounted() {
    if (this.$refs['message-content']) {
      linkifyElement(this.$refs['message-content'], this.linkOptions, document)
    }
  },
  computed: {
    ...mapGetters("MsgCenter", [
      "myself"
    ])
  },
  methods: {
    onImageClicked() {
      ImagePreview([this.message.content]);
    },
    onAudioClicked() {
      console.log(this.message.content);
    }
  }
});

export default MessageTo;