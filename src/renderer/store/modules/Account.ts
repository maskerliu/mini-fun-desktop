import { ActionTree, GetterTree, MutationTree } from "vuex";
import { Account, AccountState, BizMainState } from "./interface";

const state: AccountState = {
  account: null,
};

export const getters: GetterTree<AccountState, any> = {
  account() {
    return state.account;
  }
};

// async
export const actions: ActionTree<BizMainState, any> = {
  async login(context: any, loginInfo: { userName: string, pwd: string }) {
    this.commit("login", loginInfo);
  },
};

// sync
export const mutations: MutationTree<BizMainState> = {

};

export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations,
};
