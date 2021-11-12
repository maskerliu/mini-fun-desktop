import { defineComponent, PropType } from "vue";
import { Message } from "../../../store/modules/message/interface";

const MessageSys = defineComponent({

  props: {
    message: {
      type: Object as PropType<Message>,
      required: true
    },
    timestampConfig: {
      type: Object,
      required: true
    }
  },
});

export default MessageSys;