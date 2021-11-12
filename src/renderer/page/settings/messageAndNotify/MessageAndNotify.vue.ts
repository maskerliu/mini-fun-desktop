import { defineComponent } from "vue";
import { Dialog } from "vant";

const MessageAndNotify = defineComponent({
  name: "MessageAndNotify",
  data() {
    return {
      enterSendMsgChecked: false,
      acceptNewMsgNotifyChecked: true,
      acceptVoiceAndVideoChecked: true,
    }
  },
  mounted() {

  },
  methods: {
    clearHistoryMsgConfirm() {
      Dialog.confirm({
        title: '',
        message: '将清空所有个人和群的聊天记录',
      })
        .then(() => {
          // on confirm
        })
        .catch(() => {
          // on cancel
        });
    }
  },
});

export default MessageAndNotify;