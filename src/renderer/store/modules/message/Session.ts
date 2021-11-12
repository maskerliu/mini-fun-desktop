import { DateTime } from "luxon";
import { reactive } from "vue";
import { ActionTree, GetterTree, MutationTree } from "vuex";
import { Message, MessageType, Session, SessionState, SessionType } from "./interface";


const state: SessionState = reactive({
  curSid: null,
  sessions: new Map<string, Session>(),
});

const getters: GetterTree<SessionState, any> = {
  curSid(): string {
    return state.curSid;
  },
  sessions(): Map<string, Session> {
    return state.sessions;
  },
  session: (context) => (sid: string) => {
    return state.sessions.get(sid);
  },
  messages: (context) => (sid: any) => {
    return state.sessions.get(sid).messages;
  }
};

const actions: ActionTree<SessionState, any> = {
  async init(context: any) {
    let session = new Session("1111", SessionType.P2P, ["1", "3"], "hello world",
      "https://pic3.zhimg.com/80/v2-d7597ec30712c6d34208e6b8159f3318_720w.jpg?source=1940ef5c");
    session.snapshot = "Really?! I don't care! Haha";
    session.addMessage(new Message("1", MessageType.TEXT,
      "Really?! I don't care! Haha",
      DateTime.local(2016, 3, 5, 10, 10, 3, 123), true, true));
    session.addMessage(
      new Message("1", MessageType.TEXT,
        "Really?! I don't care! HahaReally?! I don't care! HahaReally?! I don't care! HahaReally?! I don't care! Haha",
        DateTime.local(2016, 3, 5, 10, 10, 3, 123), true, true));
    session.addMessage(
      new Message("1", MessageType.TEXT,
        "Really?! I don't care! Haha",
        DateTime.local(2016, 3, 5, 10, 10, 3, 123), true, true));
    session.addMessage(
      new Message("1", MessageType.TEXT,
        "Hey, Jhon Doe! How are you today",
        DateTime.local(2016, 3, 5, 10, 10, 3, 123), true, true));
    session.addMessage(
      new Message("3", MessageType.TEXT,
        "Hey, Adam! I'm felling really fine this evening.",
        DateTime.local(2016, 3, 5, 10, 10, 3, 123), true, true));
    session.addMessage(
      new Message("1", MessageType.AUDIO,
        "Really?! I don't care! Haha www.google.com",
        DateTime.local(2016, 3, 5, 10, 10, 3, 123), true, true));
    session.addMessage(
      new Message("2", MessageType.TEXT,
        "Really?! I don't care! Haha www.google.com",
        DateTime.local(2016, 3, 5, 10, 10, 3, 123), true, true));
    session.addMessage(
      new Message("2", MessageType.IMAGE,
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.artdesign.org.cn%2FUpload%2Farticle%2F20210823%2F53752-d7e963290d9ada7393c92f5de9092e90.jpeg&refer=http%3A%2F%2Fwww.artdesign.org.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1635054331&t=77b760dd0b700fcb755e67d3d84f25b8",
        DateTime.local(2016, 3, 5, 10, 10, 3, 123), true, true));
    session.addMessage(
      new Message("2", MessageType.IMAGE,
        "https://img.alicdn.com/imgextra/i2/2123920712/O1CN01mnNuse1H88et65qNg_!!2123920712.jpg_400x400.jpg",
        DateTime.local(2016, 3, 5, 10, 10, 3, 123), true, true));
    session.addMessage(
      new Message("3", MessageType.AUDIO,
        "https://img.alicdn.com/imgextra/i2/2123920712/O1CN01mnNuse1H88et65qNg_!!2123920712.jpg_400x400.jpg",
        DateTime.local(2016, 3, 5, 10, 10, 3, 123), true, true));
    session.addMessage(
      new Message("3", MessageType.IMAGE,
        "https://img.alicdn.com/imgextra/i2/2123920712/O1CN01mnNuse1H88et65qNg_!!2123920712.jpg_400x400.jpg",
        DateTime.local(2016, 3, 5, 10, 10, 3, 123), true, true));
    session.addMessage(
      new Message("3", MessageType.TEXT,
        "Really?! I don't care! Haha www.google.com",
        DateTime.local(2016, 3, 5, 9, 1, 3, 123), true, false));
    this.commit("MsgCenter/Session/addSession", session);

    session = new Session("2222", SessionType.P2P, ["2", "3"], "带土",
      "https://pic1.zhimg.com/80/v2-08ab55ac08e4f556b5dabdf0c4bbc3e5_720w.jpg?source=1940ef5c");
    session.snapshot = "Hey, Adam! I'm felling really fine this evening.";
    session.addMessage(new Message("1", MessageType.TEXT,
      "Really?! I don't care! Haha",
      DateTime.local(2016, 3, 5, 10, 10, 3, 123), true, true));
    session.addMessage(
      new Message("1", MessageType.TEXT,
        "Really?! I don't care! Haha",
        DateTime.local(2016, 3, 5, 10, 10, 3, 123), true, true));
    session.addMessage(
      new Message("1", MessageType.TEXT,
        "Hey, Jhon Doe! How are you today",
        DateTime.local(2016, 3, 5, 10, 10, 3, 123), true, true));
    session.addMessage(
      new Message("3", MessageType.TEXT,
        "Hey, Adam! I'm felling really fine this evening.",
        DateTime.local(2016, 3, 5, 10, 10, 3, 123), true, true));
    session.addMessage(
      new Message("1", MessageType.TEXT,
        "Really?! I don't care! Haha www.google.com",
        DateTime.local(2016, 3, 5, 10, 10, 3, 123), true, true));
    session.addMessage(
      new Message("2", MessageType.TEXT,
        "Really?! I don't care! Haha www.google.com",
        DateTime.local(2016, 3, 5, 10, 10, 3, 123), true, true));
    session.addMessage(
      new Message("3", MessageType.TEXT,
        "Really?! I don't care! Haha www.google.com",
        DateTime.local(2016, 3, 5, 18, 41, 3, 123), true, true));
    this.commit("MsgCenter/Session/addSession", session);

    session = new Session("6666", SessionType.SYSTEM, [], "系统通知", "notification");
    session.snapshot = "坚决打击一切骚扰用户贺扰乱广场的行为";
    session.addMessage(new Message("1", MessageType.SYSTEM, "Really?! I don't care! Haha",
      DateTime.local(2016, 3, 5, 10, 10, 3, 123), true, true));
    session.addMessage(
      new Message("1", MessageType.SYSTEM, "Really?! I don't care! Haha",
        DateTime.local(2016, 3, 5, 15, 17, 3, 123), true, true));
    this.commit("MsgCenter/Session/addSession", session);

    session = new Session("3333", SessionType.P2P, ["4", "3"], "鸣人",
      "https://pic1.zhimg.com/80/v2-08ab55ac08e4f556b5dabdf0c4bbc3e5_720w.jpg?source=1940ef5c");
    session.snapshot = "[图片]";
    session.addMessage(new Message("1", MessageType.TEXT, "Really?! I don't care! Haha",
      DateTime.local(2016, 3, 5, 24, 0, 3, 123), true, true));
    session.addMessage(
      new Message("1", MessageType.TEXT, "Really?! I don't care! Haha",
        DateTime.local(2016, 3, 5, 22, 51, 3, 123), true, true));
    this.commit("MsgCenter/Session/addSession", session);

    session = new Session("4444", SessionType.P2P, ["5", "3"], "宇智波",
      "https://pic1.zhimg.com/80/v2-7f96e5f9997c665cfaab89a42370a221_720w.jpg?source=1940ef5c");
    session.snapshot = "[语音]";
    session.addMessage(new Message("1", MessageType.TEXT, "Really?! I don't care! Haha",
      DateTime.local(2016, 3, 5, 11, 11, 3, 123), true, true));
    session.addMessage(
      new Message("1", MessageType.TEXT, "Really?! I don't care! Haha",
        DateTime.local(2016, 3, 5, 10, 10, 3, 123), true, true));
    this.commit("MsgCenter/Session/addSession", session);

    session = new Session("5555", SessionType.P2P, ["6", "3"], "卡卡西",
      "https://pic3.zhimg.com/80/v2-979d11d6ce4d6d958ff157ac8826bfdb_720w.jpg?source=1940ef5c");
    session.snapshot = "下班了撸串儿去？";
    session.addMessage(new Message("1", MessageType.TEXT, "Really?! I don't care! Haha",
      DateTime.local(2016, 3, 5, 17, 37, 3, 123), true, true));
    session.addMessage(
      new Message("1", MessageType.TEXT, "Really?! I don't care! Haha",
        DateTime.local(2016, 3, 5, 12, 42, 3, 123), true, true));
    this.commit("MsgCenter/Session/addSession", session);

    session = new Session("7777", SessionType.SYSTEM, [], "互动消息", "notification-1");
    session.snapshot = "张三点赞了你的动态";
    session.addMessage(new Message(null, MessageType.SYSTEM, "Really?! I don't care! Haha",
      DateTime.local(2016, 3, 5, 18, 3, 3, 123), true, true));
    session.addMessage(
      new Message(null, MessageType.SYSTEM, "Really?! I don't care! Haha",
        DateTime.local(2016, 3, 5, 10, 23, 3, 123), true, true));
    this.commit("MsgCenter/Session/addSession", session);

    session = new Session("8888", SessionType.GROUP, ["1", "2", "3", "4", "5", "6", "7", "8"],
      "娱乐小分队", "https://gd4.alicdn.com/imgextra/i4/50189892/O1CN01cIp9nQ2MwaZ694xR1_!!50189892.jpg");
    session.snapshot = "[狗头]";
    session.addMessage(new Message("1", MessageType.TEXT, "Really?! I don't care! Haha",
      DateTime.local(2016, 3, 5, 9, 10, 3, 123), true, true));
    session.addMessage(
      new Message("1", MessageType.TEXT, "Really?! I don't care! Haha",
        DateTime.local(2016, 3, 5, 23, 22, 3, 123), true, true));
    session.addMessage(
      new Message("2", MessageType.TEXT, "Really?! I don't care! Haha",
        DateTime.local(2016, 3, 5, 23, 22, 3, 123), true, true));
    session.addMessage(
      new Message("3", MessageType.TEXT, "Really?! I don't care! Haha",
        DateTime.local(2016, 3, 5, 23, 22, 3, 123), true, true));
    session.addMessage(
      new Message("4", MessageType.TEXT, "Really?! I don't care! Haha",
        DateTime.local(2016, 3, 5, 23, 22, 3, 123), true, true));
    session.addMessage(
      new Message("4", MessageType.TEXT, "Really?! I don't care! Haha",
        DateTime.local(2016, 3, 5, 23, 22, 3, 123), true, true));
    session.addMessage(
      new Message("5", MessageType.TEXT, "Really?! I don't care! Haha",
        DateTime.local(2016, 3, 5, 23, 22, 3, 123), true, true));
    session.addMessage(
      new Message("6", MessageType.TEXT, "Really?! I don't care! Haha",
        DateTime.local(2016, 3, 5, 23, 22, 3, 123), true, true));
    session.addMessage(
      new Message("7", MessageType.TEXT, "Really?! I don't care! Haha",
        DateTime.local(2016, 3, 5, 23, 22, 3, 123), true, true));
    session.addMessage(
      new Message("1", MessageType.TEXT, "Really?! I don't care! Haha",
        DateTime.local(2016, 3, 5, 23, 22, 3, 123), true, true));
    session.addMessage(
      new Message("8", MessageType.TEXT, "Really?! I don't care! Haha",
        DateTime.local(2016, 3, 5, 23, 22, 3, 123), true, true));
    this.commit("MsgCenter/Session/addSession", session);


    

    session = new Session("8880", SessionType.GROUP, ["1", "2", "3", "4", "5", "6", "7", "8"],
      "娱乐小分队", "https://gd4.alicdn.com/imgextra/i4/50189892/O1CN01cIp9nQ2MwaZ694xR1_!!50189892.jpg");
    session.snapshot = "[狗头]";
    session.addMessage(new Message("1", MessageType.TEXT, "Really?! I don't care! Haha",
      DateTime.local(2016, 3, 5, 9, 10, 3, 123), true, true));
    this.commit("MsgCenter/Session/addSession", session);

    session = new Session("8881", SessionType.GROUP, ["1", "2", "3", "4", "5", "6", "7", "8"],
      "娱乐小分队", "https://gd4.alicdn.com/imgextra/i4/50189892/O1CN01cIp9nQ2MwaZ694xR1_!!50189892.jpg");
    session.snapshot = "[狗头]";
    session.addMessage(new Message("1", MessageType.TEXT, "Really?! I don't care! Haha",
      DateTime.local(2016, 3, 5, 9, 10, 3, 123), true, true));
    this.commit("MsgCenter/Session/addSession", session);

    session = new Session("8882", SessionType.GROUP, ["1", "2", "3", "4", "5", "6", "7", "8"],
      "娱乐小分队", "https://gd4.alicdn.com/imgextra/i4/50189892/O1CN01cIp9nQ2MwaZ694xR1_!!50189892.jpg");
    session.snapshot = "[狗头]";
    session.addMessage(new Message("1", MessageType.TEXT, "Really?! I don't care! Haha",
      DateTime.local(2016, 3, 5, 9, 10, 3, 123), true, true));
    this.commit("MsgCenter/Session/addSession", session);
    session = new Session("8883", SessionType.GROUP, ["1", "2", "3", "4", "5", "6", "7", "8"],
      "娱乐小分队", "https://gd4.alicdn.com/imgextra/i4/50189892/O1CN01cIp9nQ2MwaZ694xR1_!!50189892.jpg");
    session.snapshot = "[狗头]";
    session.addMessage(new Message("1", MessageType.TEXT, "Really?! I don't care! Haha",
      DateTime.local(2016, 3, 5, 9, 10, 3, 123), true, true));
    this.commit("MsgCenter/Session/addSession", session);

  },
  async addSession(context: any, session: Session) {
    state.sessions.set(session.sid, session);
  },
  async sendMessage(context: any, message: Message) {
    this.commit("MsgCenter/Session/addMessage", message);
  }
};

const mutations: MutationTree<any> = {
  updateSid(context: any, sid: string) {
    state.curSid = sid;
  },
  addSession(context: any, session: Session) {
    state.sessions.set(session.sid, session);
  },
  addMessage(context: any, message: Message) {
    state.sessions.get(state.curSid).messages.push(message);
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
