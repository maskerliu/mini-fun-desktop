import { createRouter, createWebHashHistory } from 'vue-router'

export default createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/proxy',
            name: 'Proxy',
            component: require('@/page/Demo').default,
        },
        {
            path: '/mockRuleMgr',
            name: 'MockRuleMgr',
            component: require('@/page/Demo').default,
        },
        {
            path: '/demo',
            name: 'Demo',
            component: require('@/page/Demo').default,
        }
    ]
})
