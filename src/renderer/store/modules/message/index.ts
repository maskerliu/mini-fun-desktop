import { ActionTree, GetterTree, MutationTree } from "vuex";
import { MessageCenterState, CustomEmoji, User } from "./interface";
import Session from "./Session";

const state: MessageCenterState = {
  users: new Map<string, User>(),
  myEmoticons: new Map<string, CustomEmoji>(),
};

const getters: GetterTree<MessageCenterState, any> = {
  users(context: any): Map<string, User> {
    return state.users;
  },
  user: (state) => (id: string) => {
    return state.users.get(id);
  },
  myself(context: any): User {
    return state.users.get("3");
  },
  friends(context: any): Array<string> {
    return ["1", "2", "4", "5", "6", "7", "8"];
  },
  myEmoticons(context: any): Map<string, CustomEmoji> {
    return state.myEmoticons;
  }
};

const actions: ActionTree<any, any> = {
  async login(context: any, loginInfo: { userName: string, pwd: string }) {
    this.commit("login", loginInfo);
    this.dispatch("init");
  },
  async init(context: any) {
    // init load user cache
    state.users.set("1", new User("1", 'Arnaldo',
      "https://pic1.zhimg.com/80/v2-b993ae99ca51d5b9f6fd84870fe3621e_720w.jpg?source=1940ef5c"));
    state.users.set("2", new User("2", "Adam",
      "https://pic2.zhimg.com/80/v2-0397dc903068bdac89a1e19ea143aed8_720w.jpg?source=1940ef5c"));
    state.users.set("3", new User("3", "John Doe",
      "https://pic2.zhimg.com/80/v2-273772df2f7eec4e623e974ab0502b3b_720w.jpg?source=1940ef5c"));
    state.users.set("4", new User("4", "真嗣碇",
      "https://pic1.zhimg.com/80/v2-08ab55ac08e4f556b5dabdf0c4bbc3e5_720w.jpg?source=1940ef5c"));
    state.users.set("5", new User("5", "带土",
      "https://pica.zhimg.com/80/v2-5ee6b9b5aac763326466f2816a31c207_720w.jpg?source=1940ef5c"));
    state.users.set("6", new User("6", "鸣人",
      "https://pic2.zhimg.com/80/v2-0da878de3e39ba9f2f535657863987c8_720w.jpg?source=1940ef5c"));
    state.users.set("7", new User("7", "somebody",
      "https://pic1.zhimg.com/80/v2-01029508138cd0783faec7394530e947_720w.jpg?source=1940ef5c"));
    state.users.set("8", new User("8", "宇智波",
      "https://pic1.zhimg.com/80/v2-7f96e5f9997c665cfaab89a42370a221_720w.jpg?source=1940ef5c"));
    state.users.set("9", new User("9", "卡卡西",
      "https://pic3.zhimg.com/80/v2-979d11d6ce4d6d958ff157ac8826bfdb_720w.jpg?source=1940ef5c"));


    var customEmoji = new CustomEmoji("ce-91lafh-1i411", "http://localhost:8000/", "http://localhost:8000/73d32e3f4f726de3b525c3539f16e4b7bda201a24f99b.gif");
    state.myEmoticons.set(customEmoji.eid, customEmoji);
    customEmoji = new CustomEmoji("ce-91lafh-1i412", "http://localhost:8000/", "http://localhost:8000/231e98cab830441e90c70c7358304953.gif");
    state.myEmoticons.set(customEmoji.eid, customEmoji);
    customEmoji = new CustomEmoji("ce-91lafh-1i413", "http://localhost:8000/", "http://localhost:8000/082465df9b142df89c19c698bc1360962909.gif");
    state.myEmoticons.set(customEmoji.eid, customEmoji);
    customEmoji = new CustomEmoji("ce-91lafh-1i414", "http://localhost:8000/game_snap_fish.png", "http://localhost:8000/201582a24t68p405981993.gif");
    state.myEmoticons.set(customEmoji.eid, customEmoji);
    customEmoji = new CustomEmoji("ce-91lafh-1i415", "http://localhost:8000/game_snap_fish.png", "http://localhost:8000/201907_10_20190710002119_iqaja.thumb.400_0.gif");
    state.myEmoticons.set(customEmoji.eid, customEmoji);
    customEmoji = new CustomEmoji("ce-91lafh-1i416", "http://localhost:8000/", "http://localhost:8000/202002_11_20200211212531_FfSPH.thumb.400_0.gif");
    state.myEmoticons.set(customEmoji.eid, customEmoji);
    customEmoji = new CustomEmoji("ce-91lafh-1i417", "http://localhost:8000/", "http://localhost:8000/202004_03_20200403105703_bvjmg.thumb.1000_0.gif");
    state.myEmoticons.set(customEmoji.eid, customEmoji);
    customEmoji = new CustomEmoji("ce-91lafh-1i418", "http://localhost:8000/", "http://localhost:8000/219038d3p239898247.gif");
    state.myEmoticons.set(customEmoji.eid, customEmoji);
    customEmoji = new CustomEmoji("ce-91lafh-1i419", "http://localhost:8000/", "http://localhost:8000/1578374c32b59201f86db7a3d4e7bf41db002a4f5feb.gif");
    state.myEmoticons.set(customEmoji.eid, customEmoji);
    customEmoji = new CustomEmoji("ce-91lafh-1i420", "http://localhost:8000/", "http://localhost:8000/2192317002o4l23l9205.gif");
    state.myEmoticons.set(customEmoji.eid, customEmoji);
    customEmoji = new CustomEmoji("ce-91lafh-1i421", "http://localhost:8000/", "http://localhost:8000/20180827223802utgxx.thumb.400_0.gif");
    state.myEmoticons.set(customEmoji.eid, customEmoji);
    customEmoji = new CustomEmoji("ce-91lafh-1i422", "http://localhost:8000/", "http://localhost:8000/20190628174848_tYmkX.thumb.400_0.gif");
    state.myEmoticons.set(customEmoji.eid, customEmoji);
    customEmoji = new CustomEmoji("ce-91lafh-1i423", "http://localhost:8000/", "http://localhost:8000/d2492182029b6a407a3322ebc888f5813370371513314a.gif");
    state.myEmoticons.set(customEmoji.eid, customEmoji);
    customEmoji = new CustomEmoji("ce-91lafh-1i424", "http://localhost:8000/", "http://localhost:8000/e863941c06f24ff78f6f832eb499a866.gif");
    state.myEmoticons.set(customEmoji.eid, customEmoji);
    // init local session cache data
    this.dispatch("MsgCenter/Session/init");
  },
};

const mutations: MutationTree<any> = {

  sessionMessages(context: any, settings: any) {

  }
}


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: {
    Session,
  }
};
