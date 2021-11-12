import { DateTime } from "luxon";
import { defineComponent, ref } from 'vue';
import { mapActions, mapGetters } from 'vuex';
import { Message, MessageType } from "../../../store/modules/message/interface";
import EmojiPicker from "./EmojiPicker.vue";


const MessageBar = defineComponent({
  components: {
    EmojiPicker
  },
  props: {
    acceptImageTypes: {
      type: String,
      required: true
    }
  },
  setup() {
    const showEmojiPanel = ref(false);
    return { showEmojiPanel };
  },
  data() {
    return {
      showMorePanel: false,
      voiceCallShow: false,
      input: '',
      search: '',
      activeTab: null,
      textInput: "",
      placeholder: "type the message here",
    }
  },
  mounted() {
    // console.log(this.$refs.inputBar);
  },
  computed: {
    ...mapGetters("MsgCenter", [
      "myself"
    ]),
  },
  methods: {
    ...mapActions("MsgCenter/Session", [
      "sendMessage"
    ]),
    insert(emoji: any) {
      this.$refs.userInput.textContent += emoji;
    },
    sendMsg() {
      this.onCloseMojiPanel();
      this.textInput = this.$refs.userInput.textContent;
      this.$refs.userInput.textContent = '';
      const matchNotEmpty = /[^\s]+/i;
      const contentMatch = this.textInput.match(/^\s*((.|\n)+?)\s*$/i)
      if (this.textInput && matchNotEmpty.test(this.textInput) && contentMatch) {
        let msg = new Message(this.myself.uid, MessageType.TEXT,
          contentMatch[1], DateTime.local(), false, false);
        this.$emit("onMessageSubmit", msg);
        this.sendMessage(msg)
      }
    },
    handleType(e: any) {
      this.$emit("onType", e);
    },
    pickImage() {
      this.$refs.inputImage.click()
    },
    onOpenEmojiPanel() {
      this.showEmojiPanel = true;
      // this.$refs.inputBar.style.marginBottom = 225 + "px";
    },
    onCloseMojiPanel() {
      this.showEmojiPanel = false;
      this.$refs.inputBar.style.marginBottom = 0;
    },
    onOpenMorePanel() {
      this.showMorePanel = true;
      this.$refs.inputBar.style.marginBottom = 225 + "px";
    },
    onCloseMorePanel() {
      this.showMorePanel = false;
      this.$refs.inputBar.style.marginBottom = 0;
    },
    onCall() {
      this.voiceCallShow = true;
    },
    async handleImageChange(e: any) {
      const files = e.target.files
      let msg = new Message(this.myself.uid, MessageType.IMAGE,
        URL.createObjectURL(files[0]), DateTime.local(), true, false);
      this.$emit("onImageSelected", { file: files[0], msg });
      this.sendMessage(msg)
    }
  }
});

export default MessageBar;