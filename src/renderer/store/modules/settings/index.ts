import AccountAndSecurity from "./AccountAndSecurity";
import MessageAndNotify from "./MessageAndNotify";
import Common from "./Common";

const state = () => ({

});

const getters = {

};

const actions = {
  async updateAccountAndSecurity(context: any, settings: any) {
    this.commit();
  },
}

const mutations = {


}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: {
    AccountAndSecurity,
    MessageAndNotify,
    Common
  }
};

