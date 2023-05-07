<!--注册-->

<template>
  <div class="login-wrap">
    <el-form class="login-container">
      <h1 class="title">用户注册</h1>
      <el-form-item>
        <el-input
          type="text"
          placeholder="注册邮箱"
          v-model="form.email"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          type="text"
          placeholder="用户名"
          v-model="form.name"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          type="text"
          placeholder="用户id"
          v-model="form.id"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          type="password"
          placeholder="注册密码"
          v-model="form.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="doRegister" style="width: 100%"
          >注册</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      form: {
        email: "",
        name: "",
        id: "",
        password: "",
      },
    };
  },
  methods: {
    doRegister() {
      console.log(this.form);
      let url = "http://localhost:8088/user/login";
      let params = {
        email: this.form.email, //邮箱
        name: this.form.name, //用户名
        id: this.form.id, // 用户id
        password: this.form.password, //用户密码
        //后端需要传递的参数
      };
      console.log(this.form);
      axios
        .get(url, { //post or get
          params: params,
        })
        .then((res) => {
          console.log(res);
          // this.$router.push("/Login"); //注册成功得回调
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped >
.login-wrap {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding-top: 10%;
  background-repeat: no-repeat;
  background-position: center right;
  background-size: 100%;
}

.login-container {
  border-radius: 10px;
  margin: 0px auto;
  width: 350px;
  padding: 30px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  text-align: left;
  box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.1);
}

.title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
</style>