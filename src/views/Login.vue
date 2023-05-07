<template>
  <div class="login-wrap">
    <el-form class="login-container">
      <h1 class="title">用户登录：</h1>
      <el-form-item>
        <el-input type="text" placeholder="用户账号" v-model="email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input type="password" placeholder="用户密码" v-model="password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="doLogin" style="width: 100%;">登录</el-button>
      </el-form-item>
      <el-row style="text-align: center;margin-top: -10px;">
        <el-link type="primary" @click="toRegister">用户注册</el-link>
        <el-link type="primary">忘记密码</el-link>
      </el-row>
    </el-form>
  </div>

</template>

<script>

import axios from 'axios'
export default {
  name: 'Login',
  data: function () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    doLogin: function () {
      let email = this.email
      let password = this.password

      let url = 'http://localhost:8088/user/login'

      let params = {
        email: email,
        password: password,
        methodName: 'userLogin'
      }
      console.log(params)

      axios.get(url, {
        params: params
      }).then(resp => {
        console.log(resp)
        let data = resp.data
        console.log(data)
        this.$message({
          message: data.msg,
          type: data.code === 1 ? 'success' : 'error'
        })
      }).catch(err => {
        console.log(err)
      })
    },
    toRegister: function () {
      this.$router.push('/Register')
    }

  }
}
</script>

<style>
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
