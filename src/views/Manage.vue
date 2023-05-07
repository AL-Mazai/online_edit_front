<!--根视图，管理所有视图和组件-->
<template>
  <el-container style="min-height: 100vh">
    <!--侧边栏-->
    <el-aside
      :width="sideWidth + 'px'"
      style="box-shadow: 2px 0 6px rgb(0 21 41 / 35%)"
    >
      <Aside :isCollapse="isCollapse" :logoTextShow="logoTextShow"></Aside>
    </el-aside>

    <el-container>
      <!--顶部-->
      <el-header>
        <Header
          :collapseBtnClass="collapseBtnClass"
          :collapse="collapse"
        ></Header>
      </el-header>
      <!--主体部分-->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Aside from "@/components/Aside";
import Header from "@/components/Header";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  components: { Header, Aside },
  /*  beforeRouteEnter(){
        if(!localStorage.getItem('token')){
            this.$router
        }
    }, */ //权限判定  获取token
  data() {
    return {
      collapseBtnClass: "el-icon-s-fold",
      isCollapse: false,
      sideWidth: 200,
      logoTextShow: true,
      headerBg: "headerBg",
    };
  },
  methods: {
    collapse() {
      // 点击收缩按钮触发
      this.isCollapse = !this.isCollapse;
      if (this.isCollapse) {
        // 收缩
        this.sideWidth = 64;
        this.collapseBtnClass = "el-icon-s-unfold";
        this.logoTextShow = false;
      } else {
        // 展开
        this.sideWidth = 200;
        this.collapseBtnClass = "el-icon-s-fold";
        this.logoTextShow = true;
      }
    },
  },
};
</script>
