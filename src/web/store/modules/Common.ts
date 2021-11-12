import { ActionTree, Commit, GetterTree, MutationTree } from "vuex";
import { CommonState } from "../types";

const state: CommonState = {
    showQrCodeDialog: false,
    registerUrl: "",
    localServerConfig: {
        serverIP: null,
        proxyHttpPort: null,
        proxySocketPort: null,
        apiDefineServer: null,
        statRuleServer: null,
        dataProxyServer: null,
        dataProxyStatus: false
    },
    clientInfos: []
};


export const getters: GetterTree<CommonState, any> = {};

// async
export const actions: ActionTree<CommonState, any> = {
    init(context: { commit: Commit }): void {
        
    },
    unInit(context: { commit: Commit }): void {
        
    },
};

// sync
export const mutations: MutationTree<CommonState> = {
    
};

export default {
    namespaced: false,
    state,
    getters,
    actions,
    mutations,
};
