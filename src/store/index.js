import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: sessionStorage.getItem("token"),
        user: JSON.parse(sessionStorage.getItem("user"))
    },
    mutations: {

    },
    getters: {

    },
    actions: {
    },
    modules: {
    }
})
