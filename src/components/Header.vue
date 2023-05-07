<!--顶部组件-->
<template>
    <div style="line-height: 60px; display: flex">
        <div style="flex: 1;">
            <span :class="collapseBtnClass" style="cursor: pointer; font-size: 18px" @click="collapse"></span>
            <el-breadcrumb separator="/" style="display: inline-block; margin-left: 10px">
                <el-breadcrumb-item :to="'/'">首页</el-breadcrumb-item>
                <el-breadcrumb-item>xxx</el-breadcrumb-item>
<!--                <el-breadcrumb-item>{{ currentPathName }}</el-breadcrumb-item>-->
            </el-breadcrumb>
        </div>
        <!--个人信息-->
        <el-dropdown style="width: 100px; cursor: pointer">
            <div style="display: inline-block">
                <span>zzw</span><i class="el-icon-arrow-down" style="margin-left: 5px"></i>
            </div>
            <el-dropdown-menu slot="dropdown" style="width: 100px; text-align: center">
                <el-dropdown-item icon="el-icon-user" style="font-size: 14px; padding: 5px 0">
                    <a>个人信息</a>
                </el-dropdown-item>
                <el-dropdown-item icon="el-icon-lock" style="font-size: 14px; padding: 5px 0">
                    <a>修改密码</a>
                </el-dropdown-item>
                <el-dropdown-item icon="el-icon-switch-button" style="font-size: 14px; padding: 5px 0">
                    <span style="text-decoration: none">退出</span>
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
    computed: {
        currentPathName () {
            return this.$store.state.currentPathName; //计算需要监听的数据
        }
    }
}
</script>

<style scoped>

</style>