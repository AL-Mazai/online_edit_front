<!--顶部组件-->
<template>
    <div style="line-height: 60px; display: flex">
        <div style="flex: 1;">
            <span :class="collapseBtnClass" style="cursor: pointer; font-size: 18px" @click="collapse"></span>
            <el-breadcrumb separator="/" style="display: inline-block; margin-left: 10px">
                <el-breadcrumb-item :to="'/'">首页</el-breadcrumb-item>
                <el-breadcrumb-item>{{ currentPathName }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <!--账户-->
        <el-dropdown style="width: 100px; cursor: pointer">
            <div style="display: inline-block">
                <span>{{ user.userName }}</span><i class="el-icon-arrow-down" style="margin-left: 5px"></i>
            </div>
            <el-dropdown-menu slot="dropdown" style="width: 100px; text-align: center">
                <el-dropdown-item style="font-size: 14px; padding: 5px 0" icon="el-icon-user">
                    <a @click="jump('/user_info')">个人信息</a>
                </el-dropdown-item>
                <el-dropdown-item style="font-size: 14px; padding: 5px 0" icon="el-icon-lock">
                    <a @click="jump('/update_password')">修改密码</a>
                </el-dropdown-item>
                <el-dropdown-item style="font-size: 14px; padding: 5px 0" icon="el-icon-switch-button">
                    <span style="text-decoration: none" @click="logout">退出</span>
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Header",
    props: {
        collapseBtnClass: String,
        collapse: {}
    },
    data(){
        return{
            user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
        }
    },
    methods:{
        //跳转
        jump(url){
            this.$router.push(url)
        },
        //退出登录
        logout(){
            //跳转到登录页面
            this.$router.push("/login")
            //从本地存储中删除用户数据
            localStorage.removeItem("user")
            localStorage.removeItem("token")
            this.$message.success("退出登录")
        },
    },
    computed: {
        currentPathName () {
            // console.log(this.$store.state.currentPathName)
            return this.$store.state.currentPathName; //计算需要监听的数据
        }
    },
}
</script>

<style scoped>

</style>