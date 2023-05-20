import Vue from "vue";
import VueRouter from "vue-router";
import Manage from "@/views/Manage";
import store from "@/store";

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
    //添加登录页面路由
    {
        path: "/login",
        name: "login",
        component: () => import("../views/Login"),
    },
    //添加注册页面路由
    {
        path: "/register",
        name: "register",
        component: () => import("../views/Register"),
    },
    {
        path: "/onlyOffice",
        name: "onlyOffice",
        component: () => import("../views/only-office/test")
    }
];

const router = new VueRouter({
    mode: "history",
    routes,
});

// 路由守卫
router.beforeEach((to, from, next) => {
    localStorage.setItem("currentPathName", to.name)  // 设置当前的路由名称，为了在Header组件中去使用
    store.commit("setPath")  // 触发store的数据更新
    /***************检测是否有token，若无则返回登录页*****************/
    let user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null
    const isLogin = !!user
    //放行登录页和注册页
    if (to.path === '/login' || to.path === '/register') {
        next()
    }else {
        isLogin ? next() : next('/login')
    }
})

export default router;
