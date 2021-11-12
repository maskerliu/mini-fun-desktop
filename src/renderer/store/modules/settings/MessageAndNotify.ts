import { MessageAndNotifyState } from "./interface"

const state = (): MessageAndNotifyState => ({
  
});

const getters = {
  messageAndNotifySettings(state: any, getters: any, rootState: any) {

  }
};

const actions = {
  async updateMessageAndNofity(context: any, settings: MessageAndNotifyState) {
    this.commit();
  },
}

const mutations = {

}

export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
};

