import { DateTime } from "luxon";
import { Dialog } from "vant";
import { defineComponent } from "vue";
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { NavBarState } from "../../store/modules/interface";
import { Message, MessageType } from "../../store/modules/message/interface";
import MessageBar from '../components/message/MessageBar.vue';
import MessageDisplay from '../components/message/MessageDisplay.vue';

const Session = defineComponent({
  name: "Session",
  components: {
    MessageDisplay,
    MessageBar
  },
  props: {
  },
  data() {
    return {
      show: false,
      mute: false,
      messages: [],
      timestampConfig: {
        format: "HH:mm",
        relative: false
      },
      toLoad: [
        new Message("2", MessageType.TEXT, 'Hey, John Doe! How are you today?',
          DateTime.local(2016, 3, 5, 10, 10, 3, 123), true),
        new Message("3", MessageType.TEXT, "Hey, Adam! I'm feeling really fine this evening.",
          DateTime.local(2016, 3, 5, 10, 10, 3, 123), true),
      ],
    };
  },
  created() {

  },
  mounted() {
    if (this.session(this.curSid)) {
      this.updateSid(this.curSid);
      this.init();
    }
  },
  unmounted() {
    this.updateSid(null);
  },
  computed: {
    ...mapGetters("MsgCenter", [
      "users",
      "user",
      "myself",
    ]),
    ...mapGetters("MsgCenter/Session", [
      "curSid",
      "sessions",
      "session",
    ])
  },
  watch: {
    curSid(val) {
      this.init();
    }
  },
  methods: {
    ...mapActions("MsgCenter/Session", [
      "sendMessage"
    ]),
    ...mapMutations("MsgCenter/Session", [
      "updateSid"
    ]),
    init() {

      if (this.curSid == null) return;

      let session = this.session(this.curSid);

      let navBarState: NavBarState = {
        title: session.title,
        showLeft: false,
        showRight: true,
        rightIcon: "profile",
        rightAction: this.onOpenSessionInfoPanel
      };
      this.$store.dispatch("updateNavBar", navBarState);

      this.messages = session.messages;
    },
    onType(e: any) {
      // this.$emit("onType", e);
    },
    onMessageSubmit(message: any) {
      // this.messages.push(message);
      setTimeout(() => {
        message.read = true
        message.sent = true
      }, 1000);
    },
    onImageSelected(data: any) {
      this.$emit("onImageSelected", data)
    },
    onImageClicked(message: any) {
      console.log('Image clicked', message.src)
    },
    loadMoreMessages(resolve: Function) {
      setTimeout(() => {
        resolve(this.toLoad);
        if (this.message == null) this.message = [];
        // this.messages.unshift(...this.toLoad);
        this.toLoad = [];
      }, 500);
    },
    onOpenSessionInfoPanel() {
      this.show = true;
    },
    onClearGroupMessage() {
      Dialog.confirm({
        message: "确定清空聊天记录吗？",
      }).then(() => {
        // on close
      }).catch(() => { });
    },
    onLeaveGroup() {
      Dialog.confirm({
        message: "确定要退出该群聊？",
      }).then(() => {
        // on close
      }).catch(() => { });
    }
  }
});

export default Session;

