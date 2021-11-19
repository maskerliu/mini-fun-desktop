import { createRouter, createWebHashHistory } from 'vue-router'


export default createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/feeds',
            name: 'Feeds',
            component: require('@/page/feeds/RecommendFeeds').default,
        },
        {
            path: '/discover',
            name: 'Discover',
            component: require('@/page/discover/GameHome').default,
            children:[
                
            ]
        },
        {
            path: '/discover/AStarDemo',
            name: 'AStarDemo',
            component: require('@/page/discover/cmdwar/AStarDemo').default,
        },
        {
            path: '/message',
            name: 'Message',
            component: require('@/page/message/MessageCenter').default,
            children: []
        },
        {
            path: '/pid',
            name: 'PIDHome',
            component: require('@/page/pid/PIDHome').default,
            children: []
        },
        {
            path: '/contactList',
            name: 'ContactList',
            component: require('@/page/message/ContactList').default,
            children: []
        },
        {
            path: '/session/:sid',
            name: 'session',
            component: require('@/page/message/Session').default,
            props: true,
            children: []
        },
        {
            path: '/settings',
            name: "Settings",
            component: require('@/page/settings/Settings').default,
            children: [{
                path: "accountAndSecurity",
                name: "AccountAndSecurity",
                component: require("@/page/settings/accountAndSecurity/AccountAndSecurity").default,
            },
            {
                path: "accountAndSecurity/loginDeviceMgr",
                name: "LoginDeviceMgr",
                component: require("@/page/settings/accountAndSecurity/LoginDeviceMgr").default,
            },
            {
                path: "messageAndNotify",
                name: "MessageAndNotify",
                component: require("@/page/settings/messageAndNotify/MessageAndNotify").default,
            },
            {
                path: "common",
                name: "Common",
                component: require("@/page/settings/common/Common").default,
            },
            {
                path: "common/selectLang",
                name: "SelectLang",
                component: require("@/page/settings/common/SelectLang").default,
            },
            {
                path: "common/fontSize",
                name: "FontSize",
                component: require("@/page/settings/common/FontSize").default,
            },
            {
                path: "common/gameEngineMgr",
                name: "GameEngineMgr",
                component: require("@/page/settings/common/GameEngineMgr").default,
            },
            {
                path: "helpAndFeedback",
                name: "HelpAndFeedback",
                component: require("@/page/settings/helpAndFeedback/HelpAndFeedback").default,
            },
            {
                path: "about",
                name: "About",
                component: require("@/page/settings/About").default,
            },
            ]
        }
    ]
})
