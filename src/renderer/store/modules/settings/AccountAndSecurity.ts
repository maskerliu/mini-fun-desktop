import { AccountAndSecurityState } from "./interface"


const state = () => ({
  test: "hello"
});

const getters = {
  accountAndSecurity(state: AccountAndSecurityState, getters: any, rootState: any) {

  }
};

const actions = {
  async updateAccountAndSecurity(context: any, settings: AccountAndSecurityState) {
    this.commit("setAccountAndSecurity", settings);
  },
}

const mutations = {
  setAccountAndSecurity(state: AccountAndSecurityState, setttings: AccountAndSecurityState) {
    console.log("update account&security settings");
  }
}

export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
};

