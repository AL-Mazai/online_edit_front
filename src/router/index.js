import Vue from 'vue'
import VueRouter from 'vue-router'
import Manage from "@/views/Manage";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: Manage,
        redirect: "/home",
        children: [
            { path: 'home',name:"主页", component: () => import('../views/Home')},
            { path: 'create_doc',name:"我创建的文档", component: () => import('../views/CreatedDoc')},
            { path: 'participate_doc',name:"我参与的文档", component: () => import('../views/ParticipateDoc')},
            { path: 'create_team',name:"我创建的团队", component: () => import('../views/CreateTeam')},
            { path: 'participate_team',name:"我参与的团队", component: () => import('../views/ParticipateTeam')},
            { path: 'recycle_station',name:"回收站", component: () => import('../views/RecycleStation')},
        ]
    },
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
