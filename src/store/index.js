import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        currentPathName: '',//存储当前路径名
    },
    mutations: {
        setPath (state) {
            state.currentPathName = localStorage.getItem("currentPathName") // 从本地存储中获取当前路径名并保存到状态中
        },
    },
    actions: {
    },
    modules: {
    }
})
