import { Client } from "colyseus.js";
import { Toast } from "vant";
import { defineComponent } from "vue";
import { mapActions, mapGetters, mapMutations } from "vuex";
import { State } from "../../../common/GameStates";
import { NavBarState } from "../../store/modules/interface";
import Session from "./Session.vue";


const MessageCenter = defineComponent({
  name: "MessageList",
  components: {
    Session
  },
  data() {
    return {
      count: 0,
      isLoading: false,
      finished: false,
      curSid: null,
    }
  },
  created(): void {
    this.init();
  },
  async mounted(): Promise<void> {

    let navBarState: NavBarState = {
      title: "消息",
      showLeft: false,
      showRight: true,
      rightIcon: 'contacts',
      rightAction: this.openContactList
    };
    this.$store.dispatch("updateNavBar", navBarState);

    // this.onRefresh();
    var client = new Client("ws://localhost:2567");

    try {
      const room = await client.joinOrCreate<State>("state_handler");

      room.state.players.onAdd = (item, sessionId) => {
        console.log(`client[${sessionId}] add`)
      }

      room.state.players.onChange = (item, sessionId) => {
        console.log(`client[${sessionId}] changed`)
      }

      room.state.players.onRemove = (item, sessionId) => {
        console.log(`client[${sessionId}] removed`);
      }

      room.onMessage("hello", (message: any) => {
        console.log(message);
      })

    } catch (err) {
      console.log("join error", err);
    }
  },
  computed: {
    ...mapGetters("MsgCenter/Session", [
      "sessions"
    ]),
  },
  methods: {
    ...mapActions("MsgCenter", [
      "init",
    ]),
    ...mapActions("MsgCenter/Session", [
      "addSession"
    ]),
    ...mapMutations("MsgCenter/Session", [
      "updateSid"
    ]),
    onRefresh() {
      setTimeout(() => {
        Toast('刷新成功');
        // 加载状态结束
        this.isLoading = false;

        // 数据全部加载完成
        if (this.sessions.length >= 40) {
          this.finished = true;
        }
      }, 100);
    },
    openContactList() {
      this.$router.push("/contactList")
    },
    openSession(sid: string) {
      this.updateSid(sid);
    }
  },

});

export default MessageCenter