<!--侧边栏组件-->
<template>
  <el-menu
    :default-openeds="['1', '2']"
    style="min-height: 100%; overflow-x: hidden"
    background-color="rgb(48, 65, 86)"
    text-color="#fff"
    active-text-color="#ffd04b"
    :default-active="$route.path"
    :collapse-transition="false"
    :collapse="isCollapse"
    router
  >
    <!--系统名称-->
    <div style="height: 60px; line-height: 60px; text-align: center">
      <img
        src="../assets/logo.png"
        alt=""
        style="width: 20px; position: relative; top: 5px; right: 5px"
      />
      <b style="color: white" v-show="logoTextShow">在线文档编辑平台</b>
    </div>

    <!--主页-->
    <el-menu-item index="/home">
      <template slot="title">
        <i class="el-icon-house"></i>
        <span slot="title">主页</span>
      </template>
    </el-menu-item>

    <!--导航栏一：我的文档-->
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-document"></i>
        <span slot="title">我的文档</span>
      </template>
      <!--我创建的-->
      <el-menu-item index="/create_doc">
        <i class="el-icon-circle-plus-outline"></i>
        <span slot="title">我创建的</span>
      </el-menu-item>
      <!--我参与的-->
      <el-menu-item index="/participate_doc">
        <i class="el-icon-plus"></i>
        <span slot="title">我参与的</span>
      </el-menu-item>
    </el-submenu>
    <!--导航栏二：账户管理-->
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-user"></i>
        <span slot="title">账户管理</span>
      </template>
      <!--我创建的-->
      <el-menu-item index="/user_info">
        <i class="el-icon-view"></i>
        <span slot="title">个人信息</span>
      </el-menu-item>
      <!--我参与的-->
      <el-menu-item index="/update_password">
        <i class="el-icon-edit"></i>
        <span slot="title">修改密码</span>
      </el-menu-item>
    </el-submenu>
    <!--导航栏三：回收站-->
    <el-menu-item index="/recycle_station">
      <i class="el-icon-delete"></i>
      <span slot="title">回收站</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Aside",
  props: {
    isCollapse: Boolean,
    logoTextShow: Boolean,
  },
};
</script>

<style scoped>
</style>