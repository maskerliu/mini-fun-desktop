import { defineComponent, PropType } from 'vue';
import { mapGetters, mapMutations } from 'vuex';
import { Message } from "../../../store/modules/message/interface";
import MessageFrom from './MessageFrom.vue';
import MessageSys from './MessageSys.vue';
import MessageTo from './MessageTo.vue';

const MessageDisplay = defineComponent({
  components: {
    MessageTo,
    MessageFrom,
    MessageSys
  },
  props: {
    messages: {
      type: Object as PropType<Message>,
      required: false
    },
    asyncMode: {
      type: Boolean,
      required: false,
      default: false
    },
    loadMoreMessages: {
      type: Function,
      required: false,
      default: null
    },
    /* onImageClicked: {
        type: Function,
        required: false,
        default: null
    }, */
    timestampConfig: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      updateScroll: true,
      lastMessage: null,
      loading: false,
    }
  },
  mounted() {
    this.goToBottom();
    this.$refs.containerMessageDisplay.dispatchEvent(new CustomEvent('scroll'));
  },
  updated() {
    if (this.messages.length &&
      !this.messageCompare(this.messages[this.messages.length - 1], this.lastMessage)) {

      if (this.updateScroll ||
        (this.messages[this.messages.length - 1].participantId == this.myself.id) ||
        (this.messages[this.messages.length - 1].participantId != this.myself.id)) {
        this.goToBottom();
        if (this.messages.length) {
          this.lastMessage = this.messages[this.messages.length - 1]
        }
      }
    }
  },
  computed: {
    ...mapGetters("MsgCenter", [
      'users',
      'myself'
    ]),
  },
  methods: {
    ...mapMutations([

    ]),
    messageCompare(message1: any, message2: any): boolean {
      /**
       * if one of the messages are null, you can safely compare the messages with '==='
       */
      if (!message2 || !message1) {
        return message1 === message2
      }
      /**
       * compare the immutable properties of a message
       */
      let participant_equal = message1.participantId == message2.participantId;
      let content_equal = message1.content == message2.content;
      let timestamp_equal = message1.timestamp.valueOf() === message2.timestamp.valueOf();

      return participant_equal && content_equal && timestamp_equal
    },
    updateScrollState({ target: { scrollTop, clientHeight, scrollHeight } }: { target: { scrollTop: number, clientHeight: number, scrollHeight: number } }) {
      this.updateScroll = scrollTop + clientHeight >= scrollHeight;
      if (typeof this.loadMoreMessages === 'function' && scrollTop < 20) {
        this.loading = true;
        this.loadMoreMessages((messages: any) => {
          this.loading = false;
        });
      }
    },
    goToBottom() {
      let scrollDiv = this.$refs.containerMessageDisplay;
      scrollDiv.scrollTop = scrollDiv.scrollHeight;
      this.updateScroll = false;
    },
    onImageClicked(message: any) {
      this.$emit("onImageClicked", message)
    }
  }
});

export default MessageDisplay;