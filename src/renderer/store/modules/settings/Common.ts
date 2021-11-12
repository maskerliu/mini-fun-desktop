import { CommonState } from "./interface"


const state = (): CommonState => ({

});

const getters = {
  commonSettings(state: any, getters: any, rootState: any) {

  },
};

const actions = {
  async updateAccountAndSecurity(context: any, settings: CommonState) {
    this.commit("setCommonSettings", settings);
  },
}

const mutations = {
  setCommonSettings(state: any, settings: CommonState) {
    console.log("set common settings");
  }
}

export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
};

