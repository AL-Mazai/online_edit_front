import Vue from "vue";
import VueRouter from "vue-router";
import Manage from "@/views/Manage";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        component: Manage,
        redirect: "/home",
        children: [
            {path: "home", name: "主页", component: () => import("../views/Home")},
            {path: "create_doc", name: "我创建的文档", component: () => import("../views/CreatedDoc")},
            {path: "participate_doc", name: "我参与的文档", component: () => import("../views/ParticipateDoc")},
            {path: "user_info", name: "个人信息", component: () => import("../views/UserInfo")},
            {path: "update_password", name: "修改密码", component: () => import("../views/UpdatePassword")},
            {path: "recycle_station", name: "回收站", component: () => import("../views/RecycleStation")},
        ],
    },
    {
        path: "/login",
        name: "login",
        component: () => import("../views/Login"),
    },
    {
        path: "/register",
        name: "register",
        component: () => import("../views/Register"),
    },
];

const router = new VueRouter({
    mode: "history",
    routes,
});

export default router;
