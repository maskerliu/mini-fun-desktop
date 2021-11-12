import { defineComponent } from "vue";


const Demo = defineComponent({

    data() {
        return {
            perferences: [
                { tooltip: "代理Http服务端口", key: "proxyHttpPort", },
                { tooltip: "代理长连服务端口", key: "proxySocketPort", },
                { tooltip: "API定义服务地址", key: "apiDefineServer", },
                { tooltip: "埋点规则服务地址", key: "statRuleServer", },
                { tooltip: "代理数据服务地址", key: "dataProxyServer", hasStatus: true, statusKey: "dataProxyStatus" },
            ] as Array<{ tooltip: string, key: string }>
        }
    },


    mounted() {

    },

    destroyed(): void {

    },

    onDataProxySwitchChanged() {

    },

    sendBroadcastMsg(): void {

    },

    showOpMenu(client: any): void {
    },

    sendMsg(): void {

    },
});

export default Demo;